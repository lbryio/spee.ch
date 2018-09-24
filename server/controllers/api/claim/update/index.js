const logger = require('winston');
const db = require('../../../../models');
const { details, publishing: { disabled, disabledMessage, primaryClaimAddress } } = require('@config/siteConfig');
const { resolveUri } = require('../../../../lbrynet');
const { sendGATimingEvent } = require('../../../../utils/googleAnalytics.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const publish = require('../publish/publish.js');
const parsePublishApiRequestBody = require('../publish/parsePublishApiRequestBody');
const {parsePublishApiRequestFiles, parsePublishApiRequestThumbnail} = require('../publish/parsePublishApiRequestFiles.js');
const authenticateUser = require('../publish/authentication.js');
const createThumbnailPublishParams = require('../publish/createThumbnailPublishParams.js');

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
  let channelName;
  let channelId;
  let channelPassword;
  let description;
  let fileName;
  let filePath;
  let fileType;
  let gaStartTime;
  let thumbnail;
  let fileExtension;
  let license;
  let name;
  let nsfw;
  let thumbnailFileName;
  let thumbnailFilePath;
  let thumbnailFileType;
  let title;
  let claimRecord;
  let metadata;
  // record the start time of the request
  gaStartTime = Date.now();

  try {
    ({name, nsfw, license, title, description, thumbnail} = parsePublishApiRequestBody(body));
    if (files.file) {
      ({fileName, filePath, fileExtension, fileType} = parsePublishApiRequestFiles(files));
      if (files.thumbnail) {
        ({thumbnailFileName, thumbnailFilePath, thumbnailFileType} = parsePublishApiRequestThumbnail(files));
      }
    }
    ({channelName, channelId, channelPassword} = body);
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }

  // check channel authorization
  authenticateUser(channelName, channelId, channelPassword, user)
    .then(({ channelName, channelClaimId }) => {
      return db.Claim.findOne({
        where: {
          name,
          channelName,
        },
      });
    })
    .then(claim => {
      return resolveUri(`${claim.name}#${claim.claimId}`);
    })
    .then(fullClaim => {
      claimRecord = fullClaim;
      logger.info('fullClaim', fullClaim);
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
        bid          : 0.01,
        claim_address: primaryClaimAddress,
        channel_name : channelName,
        channel_id   : channelId,
        metadata,
      };
      if (files.file) {
        publishParams['file_path'] = filePath;
      } else {
        fileName = fullClaim.file_name;
        fileType = fullClaim.mime_type;
        publishParams['sources'] = fullClaim.claim.value.stream.source;
      }
      // publish the thumbnail, if one exists
      if (thumbnailFileName) {
        const thumbnailPublishParams = createThumbnailPublishParams(thumbnailFilePath, name, license, nsfw);
        publish(thumbnailPublishParams, thumbnailFileName, thumbnailFileType);
        publishParams['thumbnail'] = `${details.host}/${channelName}:${channelId}/${name}-thumb.jpg`;
      }

      return publish(publishParams, fileName, fileType);
    })
    .then(claimData => {
      const {claimId} = claimData;
      res.status(200).json({
        success: true,
        message: 'update successful',
        data   : {
          name,
          channelName,
          channelId: claimData.certificateId,
          claimId,
          url      : `${details.host}/${claimId}/${name}`, // for backwards compatability with app
          showUrl  : `${details.host}/${claimId}/${name}`,
          claimData,
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
