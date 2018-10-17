const logger = require('winston');

const { details: { host }, publishing: { disabled, disabledMessage } } = require('@config/siteConfig');

const { sendGATimingEvent } = require('../../../../utils/googleAnalytics.js');
const isApprovedChannel = require('../../../../../utils/isApprovedChannel');
const { publishing: { publishOnlyApproved, approvedChannels } } = require('@config/siteConfig');

const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

const checkClaimAvailability = require('../availability/checkClaimAvailability.js');

const publish = require('./publish.js');
const createPublishParams = require('./createPublishParams.js');
const createThumbnailPublishParams = require('./createThumbnailPublishParams.js');
const parsePublishApiRequestBody = require('./parsePublishApiRequestBody.js');
const parsePublishApiRequestFiles = require('./parsePublishApiRequestFiles.js');
const authenticateUser = require('./authentication.js');

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
  let  channelName, channelId, channelPassword, description, fileName, filePath, fileExtension, fileType, gaStartTime, license, name, nsfw, thumbnail, thumbnailFileName, thumbnailFilePath, thumbnailFileType, title;
  // record the start time of the request
  gaStartTime = Date.now();
  // validate the body and files of the request
  try {
    // validateApiPublishRequest(body, files);
    ({name, nsfw, license, title, description, thumbnail} = parsePublishApiRequestBody(body));
    ({fileName, filePath, fileExtension, fileType, thumbnailFileName, thumbnailFilePath, thumbnailFileType} = parsePublishApiRequestFiles(files));
    ({channelName, channelId, channelPassword} = body);
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
  // check channel authorization
  authenticateUser(channelName, channelId, channelPassword, user)
    .then(({ channelName, channelClaimId }) => {
      if (publishOnlyApproved && !isApprovedChannel({ longId: channelClaimId }, approvedChannels)) {
        const error = {
          name   : UNAPPROVED_CHANNEL,
          message: 'This spee.ch instance only allows publishing to approved channels',
        };
        throw error;
      }
      return Promise.all([
        checkClaimAvailability(name),
        createPublishParams(filePath, name, title, description, license, nsfw, thumbnail, channelName, channelClaimId),
        createThumbnailPublishParams(thumbnailFilePath, name, license, nsfw),
      ]);
    })
    .then(([ claimAvailable, publishParams, thumbnailPublishParams ]) => {
      if (!claimAvailable) {
        const error = {
          name   : CLAIM_TAKEN,
          message: 'That claim name is already taken',
        };
        throw error;
      }
      // publish the thumbnail, if one exists
      if (thumbnailPublishParams) {
        publish(thumbnailPublishParams, thumbnailFileName, thumbnailFileType);
      }
      // publish the asset
      return publish(publishParams, fileName, fileType, filePath);
    })
    .then(claimData => {
      logger.debug('Publish success >', claimData);
      res.status(200).json({
        success: true,
        message: 'publish completed successfully',
        data   : {
          name,
          claimId : claimData.claimId,
          url     : `${host}/${claimData.claimId}/${name}`, // for backwards compatability with app
          showUrl : `${host}/${claimData.claimId}/${name}`,
          serveUrl: `${host}/${claimData.claimId}/${name}${fileExtension}`,
          claimData,
        },
      });
      // record the publish end time and send to google analytics
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

module.exports = claimPublish;
