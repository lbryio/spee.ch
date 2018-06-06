const logger = require('winston');
const { details, publishing } = require('@config/siteConfig');

const createBasicPublishParams = (filePath, name, title, description, license, nsfw, thumbnail) => {
  logger.debug(`Creating Publish Parameters`);
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
  // create the publish params
  const publishParams = {
    name,
    file_path: filePath,
    bid      : 0.01,
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
  logger.debug('publish params:', publishParams);
  return publishParams;
};

module.exports = createBasicPublishParams;
