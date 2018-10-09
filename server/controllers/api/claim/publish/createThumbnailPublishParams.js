const logger = require('winston');
const { details, publishing } = require('@config/siteConfig');

const createThumbnailPublishParams = (thumbnailFilePath, claimName, license, nsfw) => {
  if (!thumbnailFilePath) {
    return;
  }
  logger.debug(`Creating Thumbnail Publish Parameters`);
  // create the publish params
  return {
    name     : `${claimName}-thumb`,
    file_path: thumbnailFilePath,
    bid      : '0.01',
    metadata : {
      title      : `${claimName} thumbnail`,
      description: `a thumbnail for ${claimName}`,
      author     : details.title,
      language   : 'en',
      license,
      nsfw,
    },
    claim_address: publishing.primaryClaimAddress,
    channel_name : publishing.thumbnailChannel,
    channel_id   : publishing.thumbnailChannelId,
  };
};

module.exports = createThumbnailPublishParams;
