const logger = require('winston');

const { details: { host }, publishing: { disabled, disabledMessage } } = require('@config/siteConfig');

const { sendGATimingEvent } = require('../../../../utils/googleAnalytics.js');

const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

const checkClaimAvailability = require('../availability/checkClaimAvailability.js');

const publish = require('./publish.js');
const createBasicPublishParams = require('./createBasicPublishParams.js');
const createThumbnailPublishParams = require('./createThumbnailPublishParams.js');
const parsePublishApiRequestBody = require('./parsePublishApiRequestBody.js');
const parsePublishApiRequestFiles = require('./parsePublishApiRequestFiles.js');
const authenticateUser = require('./authentication.js');

/*

  route to publish a claim through the daemon

*/

const claimPublish = ({ body, files, headers, ip, originalUrl, user, tor }, res) => {
  // check for disabled publishing
  if (disabled) {
    return res.status(503).json({
      success: false,
      message: disabledMessage
    });
  }
  // check for tor
  logger.debug('tor:', tor);
  if (tor) {
    logger.info('Tor publish request blocked:', ip);
    const failureResponse = {
      success: 'false',
      message: 'Unfortunately this api route is not currently available for tor users.  We are working on a solution that will allow tor users to use this endpoint in the future.',
    };
    return res.status(403).json(failureResponse);
  }

  // define variables
  let  channelName, channelId, channelPassword, description, fileName, filePath, fileType, gaStartTime, license, name, nsfw, thumbnail, thumbnailFileName, thumbnailFilePath, thumbnailFileType, title;
  // record the start time of the request
  gaStartTime = Date.now();
  // validate the body and files of the request
  try {
    // validateApiPublishRequest(body, files);
    ({name, nsfw, license, title, description, thumbnail} = parsePublishApiRequestBody(body));
    ({fileName, filePath, fileType, thumbnailFileName, thumbnailFilePath, thumbnailFileType} = parsePublishApiRequestFiles(files));
    ({channelName, channelId, channelPassword} = body);
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
  // check channel authorization
  Promise
    .all([
      authenticateUser(channelName, channelId, channelPassword, user),
      checkClaimAvailability(name),
      createBasicPublishParams(filePath, name, title, description, license, nsfw, thumbnail),
      createThumbnailPublishParams(thumbnailFilePath, name, license, nsfw),
    ])
    .then(([{channelName, channelClaimId}, validatedClaimName, publishParams, thumbnailPublishParams]) => {
      // add channel details to the publish params
      if (channelName && channelClaimId) {
        publishParams['channel_name'] = channelName;
        publishParams['channel_id'] = channelClaimId;
      }
      // publish the thumbnail, if one exists
      if (thumbnailPublishParams) {
        publish(thumbnailPublishParams, thumbnailFileName, thumbnailFileType);
      }
      // publish the asset
      return publish(publishParams, fileName, fileType);
    })
    .then(result => {
      res.status(200).json({
        success: true,
        message: 'publish completed successfully',
        data   : {
          name,
          claimId: result.claim_id,
          url    : `${host}/${result.claim_id}/${name}`,
          lbryTx : result,
        },
      });
      // record the publish end time and send to google analytics
      sendGATimingEvent('end-to-end', 'publish', fileType, gaStartTime, Date.now());
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimPublish;
