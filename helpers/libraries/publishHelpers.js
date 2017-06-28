const logger = require('winston');
const config = require('config');
const walletAddress = config.get('WalletConfig.LbryAddress');
const fs = require('fs');

module.exports = {
  createPublishParams: (name, filePath, license, nsfw) => {
    logger.debug(`Creating Publish Parameters for "${name}"`);
    // ensure nsfw is a boolean
    if (nsfw === false) {
      nsfw = false;
    } else if (nsfw.toLowerCase === 'false') {
      nsfw = false;
    } else if (nsfw.toLowerCase === 'off') {
      nsfw = false;
    } else if (nsfw === 0) {
      nsfw = false;
    } else if (nsfw === '0') {
      nsfw = false;
    } else {
      nsfw = true;
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
  deleteTemporaryFile: (filePath) => {
    fs.unlink(filePath, err => {
      if (err) throw err;
      logger.debug(`successfully deleted ${filePath}`);
    });
  },
};
