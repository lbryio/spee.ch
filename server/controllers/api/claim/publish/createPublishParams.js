const logger = require('winston');
const { details, publishing } = require('@config/siteConfig');

const createPublishParams = (filePath, name, title, description, license, nsfw, thumbnail, channelName, channelClaimId) => {
  // provide defaults for title
  if (title === null || title.trim() === '') {
    title = name;
  }
  // provide default for description
  if (description === null || description.trim() === '') {
    description = '';
  }
  // provide default for license
  if (license === null || license.trim() === '') {
    license = ' ';  // default to empty string
  }
  // create the basic publish params
  const publishParams = {
    name,
    file_path: filePath,
    bid      : '0.01',
    metadata : {
      description,
      title,
      author  : details.title,
      language: 'en',
      license,
      nsfw,
    },
    claim_address: publishing.primaryClaimAddress,
  };
  // add thumbnail to channel if video
  if (thumbnail) {
    publishParams['metadata']['thumbnail'] = thumbnail;
  }
  // add channel details if publishing to a channel
  if (channelName && channelClaimId) {
    publishParams['channel_name'] = channelName;
    publishParams['channel_id'] = channelClaimId;
  }
  // log params
  logger.debug('publish params:', publishParams);
  // return
  return publishParams;
};

module.exports = createPublishParams;
