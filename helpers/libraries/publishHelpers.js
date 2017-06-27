const logger = require('winston');

const config = require('config');
const walletAddress = config.get('WalletConfig.LbryAddress');

module.exports = {
  createPublishParams (name, filePath, license, nsfw) {
    logger.debug(`Creating Publish Parameters for "${name}"`);
    // ensure nsfw is a boolean
    if (nsfw.toLowerCase === 'true') {
      nsfw = true;
    } else if (nsfw.toLowerCase === 'on') {
      nsfw = true;
    } else {
      nsfw = false;
    }
    const publishParams = {
      name,
      file_path: filePath,
      bid      : 0.01,
      metadata : {
        description: `${name} published via spee.ch`,
        title      : name,
        author     : 'spee.ch',
        language   : 'en',
        license,
        nsfw,
      },
      claim_address : walletAddress,
      change_address: walletAddress,
    };
    logger.debug('publishParams:', publishParams);
    return publishParams;
  },
};
