const logger = require('winston');
const db = require('../../../../models');
const { details, publishing: { disabled, disabledMessage, primaryClaimAddress } } = require('@config/siteConfig');
const { resolveUri } = require('../../../../lbrynet');
const { sendGATimingEvent } = require('../../../../utils/googleAnalytics.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const publish = require('../publish/publish.js');
const parsePublishApiRequestBody = require('../publish/parsePublishApiRequestBody');
const parsePublishApiRequestFiles = require('../publish/parsePublishApiRequestFiles.js');
const authenticateUser = require('../publish/authentication.js');
const createThumbnailPublishParams = require('../publish/createThumbnailPublishParams.js');
const chainquery = require('chainquery');
const createCanonicalLink = require('../../../../../utils/createCanonicalLink');

/*
  route to update a claim through the daemon
*/

const updateMetadata = ({nsfw, license, title, description}) => {
  const update = {};
  if (nsfw) update['nsfw'] = nsfw;
  if (license) update['license'] = license;
  if (title) update['title'] = title;
  if (description) update['description'] = description;
  return update;
};

const claimUpdate = ({ body, files, headers, ip, originalUrl, user, tor }, res) => {
  // logging
  logger.info('Claim update request:', {
    ip,
    headers,
    body,
    files,
    user,
  });

  // check for disabled publishing
  if (disabled) {
    return res.status(503).json({
      success: false,
      message: disabledMessage,
    });
  }

  // define variables
  let channelName, channelId, channelPassword, description, fileName, filePath, fileType, gaStartTime, thumbnail, fileExtension, license, name, nsfw, thumbnailFileName, thumbnailFilePath, thumbnailFileType, title, claimRecord, metadata, publishResult;
  // record the start time of the request
  gaStartTime = Date.now();

  try {
    ({name, nsfw, license, title, description, thumbnail} = parsePublishApiRequestBody(body));
    ({fileName, filePath, fileExtension, fileType, thumbnailFileName, thumbnailFilePath, thumbnailFileType} = parsePublishApiRequestFiles(files, true));
    ({channelName, channelId, channelPassword} = body);
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }

  // check channel authorization
  authenticateUser(channelName, channelId, channelPassword, user)
    .then(({ channelName, channelClaimId }) => {
      return chainquery.claim.queries.resolveClaimInChannel(name, channelClaimId).then(claim => claim.dataValues);
    })
    .then(claim => {
      claimRecord = claim;

      if (!files.file) {
        return Promise.all([
          db.File.findOne({ where: { name, claimId: claim.claim_id } }),
          resolveUri(`${claim.name}#${claim.claim_id}`),
        ]);
      }

      return [null, null];
    })
    .then(([fileResult, resolution]) => {

      metadata = Object.assign({}, {
        title      : claimRecord.title,
        description: claimRecord.description,
        nsfw       : claimRecord.nsfw,
        license    : claimRecord.license,
        language   : 'en',
        author     : details.title,
      }, updateMetadata({title, description, nsfw, license}));
      const publishParams = {
        name,
        bid          : '0.01',
        claim_address: primaryClaimAddress,
        channel_name : channelName,
        channel_id   : channelId,
        metadata,
      };
      if (files.file) {
        publishParams['file_path'] = filePath;
      } else {
        fileName = fileResult.fileName;
        fileType = fileResult.fileType;
        publishParams['sources'] = resolution.claim.value.stream.source;
      }
      // publish the thumbnail, if one exists
      if (thumbnailFileName) {
        const thumbnailPublishParams = createThumbnailPublishParams(thumbnailFilePath, name, license, nsfw);
        publish(thumbnailPublishParams, thumbnailFileName, thumbnailFileType);
        publishParams['thumbnail'] = `${details.host}/${channelName}:${channelId}/${name}-thumb.jpg`;
      }

      const fp = files && files.file && files.file.path ? files.file.path : undefined;
      return publish(publishParams, fileName, fileType, fp);
    })
    .then(result => {
      publishResult = result;

      if (channelName) {
        return chainquery.claim.queries.getShortClaimIdFromLongClaimId(result.certificateId, channelName);
      } else {
        return chainquery.claim.queries.getShortClaimIdFromLongClaimId(result.claimId, name, result).catch(error => {
          return result.claimId.slice(0, 1);
        });
      }
    })
    .then(shortId => {
      let canonicalUrl;
      if (channelName) {
        canonicalUrl = createCanonicalLink({ asset: { ...publishResult, channelShortId: shortId } });
      } else {
        canonicalUrl = createCanonicalLink({ asset: { ...publishResult, shortId } })
      }

      if (publishResult.error) {
        res.status(400).json({
          success: false,
          message: publishResult.message,
        });
      }

      const {claimId} = publishResult;
      res.status(200).json({
        success: true,
        message: 'update successful',
        data   : {
          name,
          claimId,
          url     : `${details.host}${canonicalUrl}`, // for backwards compatability with app
          showUrl : `${details.host}${canonicalUrl}`,
          serveUrl: `${details.host}${canonicalUrl}${fileExtension}`,
          pushTo  : canonicalUrl,
          claimData: publishResult,
        },
      });
      // record the publish end time and send to google analytics
      sendGATimingEvent('end-to-end', 'update', fileType, gaStartTime, Date.now());
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimUpdate;
