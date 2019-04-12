import logger from 'winston';

import { sendGATimingEvent } from 'server/utils/googleAnalytics.js';

import { handleErrorResponse } from '../../../utils/errorHandlers.js';

import checkClaimAvailability from '../availability/checkClaimAvailability.js';

import publish from './publish.js';
import createPublishParams from './createPublishParams.js';
import createThumbnailPublishParams from './createThumbnailPublishParams.js';
import parsePublishApiRequestBody from './parsePublishApiRequestBody.js';
import parsePublishApiRequestFiles from './parsePublishApiRequestFiles.js';
import authenticateUser from './authentication.js';

import chainquery from 'chainquery';
import publishCache from 'server/utils/publishCache';
import isApprovedChannel from '@globalutils/isApprovedChannel';
import { details, publishing } from '@config/siteConfig';

import createCanonicalLink from '@globalutils/createCanonicalLink';
const { host } = details;
const {
  disabled,
  disabledMessage,
  publishOnlyApproved,
  approvedChannels,
  thumbnailChannel,
  thumbnailChannelId,
} = publishing;
const CLAIM_TAKEN = 'CLAIM_TAKEN';
const UNAPPROVED_CHANNEL = 'UNAPPROVED_CHANNEL';

/*

  route to publish a claim through the daemon

*/

const claimPublish = ({ body, files, headers, ip, originalUrl, user, tor }, res) => {
  // logging
  logger.info('Publish request:', {
    ip,
    headers,
    body,
    files,
  });
  // check for disabled publishing
  if (disabled) {
    return res.status(503).json({
      success: false,
      message: disabledMessage,
    });
  }
  // define variables
  let channelName,
    channelId,
    channelPassword,
    description,
    fileName,
    filePath,
    fileExtension,
    fileType,
    gaStartTime,
    license,
    licenseUrl,
    name,
    nsfw,
    thumbnail,
    thumbnailFileName,
    thumbnailFilePath,
    thumbnailFileType,
    title,
    claimData,
    thumbData,
    claimId;
  // record the start time of the request
  gaStartTime = Date.now();
  // validate the body and files of the request
  try {
    // validateApiPublishRequest(body, files);
    ({
      name,
      nsfw,
      license,
      licenseUrl,
      title,
      description,
      thumbnail,
    } = parsePublishApiRequestBody(body));
    ({
      fileName,
      filePath,
      fileExtension,
      fileType,
      thumbnailFileName,
      thumbnailFilePath,
      thumbnailFileType,
    } = parsePublishApiRequestFiles(files));
    ({ channelName, channelId, channelPassword } = body);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  // check channel authorization
  authenticateUser(channelName, channelId, channelPassword, user)
    .then(({ channelName, channelClaimId }) => {
      if (publishOnlyApproved && !isApprovedChannel({ longId: channelClaimId }, approvedChannels)) {
        const error = {
          name: UNAPPROVED_CHANNEL,
          message: 'This spee.ch instance only allows publishing to approved channels',
        };
        throw error;
      }

      return Promise.all([
        checkClaimAvailability(name),
        createPublishParams(
          filePath,
          name,
          title,
          description,
          license,
          licenseUrl,
          nsfw,
          thumbnail,
          channelName,
          channelClaimId
        ),
        createThumbnailPublishParams(thumbnailFilePath, name, license, licenseUrl, nsfw),
      ]);
    })
    .then(([claimAvailable, publishParams, thumbnailPublishParams]) => {
      if (!claimAvailable) {
        const error = {
          name: CLAIM_TAKEN,
          message: 'That claim name is already taken',
        };
        throw error;
      }
      let promises = [];
      promises.push(publish(publishParams, fileName, fileType, filePath));
      // publish the thumbnail, if one exists
      if (thumbnailPublishParams) {
        promises.push(publish(thumbnailPublishParams, thumbnailFileName, thumbnailFileType));
      }
      // publish the asset
      return Promise.all(promises);
    })
    .then(publishResults => {
      logger.debug('Publish success >', publishResults[0]);
      if (publishResults[1]) {
        logger.debug('Thumb Publish success >', publishResults[1]);
        thumbData = publishResults[1];
      }
      claimData = publishResults[0];

      ({ claimId } = claimData);

      if (channelName) {
        logger.verbose(`api/claim/publish: claimData.certificateId ${claimData.certificateId}`);
        return chainquery.claim.queries.getShortClaimIdFromLongClaimId(
          claimData.certificateId,
          channelName
        );
      } else {
        return chainquery.claim.queries
          .getShortClaimIdFromLongClaimId(claimId, name, claimData)
          .catch(() => {
            return claimId.slice(0, 1);
          });
      }
    })
    .then(shortId => {
      let canonicalUrl;
      if (channelName) {
        canonicalUrl = createCanonicalLink({ asset: { ...claimData, channelShortId: shortId } });
      } else {
        canonicalUrl = createCanonicalLink({ asset: { ...claimData, shortId } });
      }

      // make sure we can look up the claimId until chainquery has it

      let canonicalThumbUrl;
      if (thumbData) {
        canonicalThumbUrl = createCanonicalLink({
          asset: {
            channelName: thumbnailChannel,
            channelShortId: thumbnailChannelId,
            name: thumbData.name,
          },
        });
        logger.verbose('canonicalThumbUrl', canonicalThumbUrl);
        publishCache.set(canonicalThumbUrl, thumbData.claimId);
        publishCache.set(thumbData.claimId, thumbData);
      }
      publishCache.set(canonicalUrl, claimData.claimId);
      publishCache.set(claimData.claimId, claimData);
      res.status(200).json({
        success: true,
        message: 'publish completed successfully',
        data: {
          name,
          claimId,
          url: `${host}${canonicalUrl}`, // for backwards compatability with app
          showUrl: `${host}${canonicalUrl}`,
          serveUrl: `${host}${canonicalUrl}${fileExtension}`,
          pushTo: canonicalUrl,
          claimData,
        },
      });
      sendGATimingEvent('end-to-end', 'publish', fileType, gaStartTime, Date.now());
    })
    .catch(error => {
      if ([CLAIM_TAKEN, UNAPPROVED_CHANNEL].includes(error.name)) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

export default claimPublish;
