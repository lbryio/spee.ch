const fs = require('fs');
const logger = require('winston');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const config = require('config');
const walledAddress = config.get('WalletConfig.lbryAddress');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');

function createPublishParams (claim, filePath, license, nsfw) {
  logger.debug(`Creating Publish Parameters for "${claim}"`);
  if (typeof nsfw === 'string') {
    nsfw = (nsfw.toLowerCase() === 'on');
  }
  const publishParams = {
    name     : claim,
    file_path: filePath,
    bid      : 0.01,
    metadata : {
      description: `${claim} published via spee.ch`,
      title      : claim,
      author     : 'spee.ch',
      language   : 'en',
      license,
      nsfw,
    },
    claim_address : walledAddress,
    change_address: walledAddress,
  };
  logger.debug('publishParams:', publishParams);
  return publishParams;
}

function deleteTemporaryFile (filePath) {
  fs.unlink(filePath, err => {
    if (err) throw err;
    logger.debug(`successfully deleted ${filePath}`);
  });
}

module.exports = {
  publish (claim, fileName, filePath, fileType, license, nsfw, socket, visitor) {
    // update the client
    socket.emit('publish-status', 'Your image is being published (this might take a second)...');
    // send to analytics
    visitor.event('Publish Route', 'Publish Request', filePath).send();
    // create the publish object
    const publishParams = createPublishParams(claim, filePath, license, nsfw);
    // get a promise to publish
    lbryApi
      .publishClaim(publishParams, fileName, fileType)
      .then(result => {
        logger.info(`Successfully published ${fileName}`);
        visitor.event('Publish Route', 'Publish Success', filePath).send();
        socket.emit('publish-complete', { name: claim, result });
      })
      .catch(error => {
        logger.error(`Error publishing ${fileName}`, error);
        visitor.event('Publish Route', 'Publish Failure', filePath).send();
        socket.emit('publish-failure', errorHandlers.handlePublishError(error));
        deleteTemporaryFile(filePath);
      });
  },
};
