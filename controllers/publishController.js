const fs = require('fs');
const logger = require('winston');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const config = require('config');
const walledAddress = config.get('WalletConfig.lbryAddress');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const db = require('../models');

function createPublishParams (claim, filePath, license, nsfw) {
  logger.debug(`Creating Publish Parameters for "${claim}"`);
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

function upsert (Model, values, condition) {
  return Model
    .findOne({ where: condition })
    .then(function (obj) {
      if (obj) {  // update
        return obj.update(values);
      } else {  // insert
        return Model.create(values);
      }
    }).catch(function (error) {
      logger.error('Sequelize findOne error', error);
    });
}

module.exports = {
  publish (name, fileName, filePath, fileType, license, nsfw, socket, visitor) {
    // validate nsfw
    if (typeof nsfw === 'string') {
      nsfw = (nsfw.toLowerCase() === 'on');
    }
    // update the client
    socket.emit('publish-status', 'Your image is being published (this might take a second)...');
    // send to analytics
    visitor.event('Publish Route', 'Publish Request', filePath).send();
    // create the publish object
    const publishParams = createPublishParams(name, filePath, license, nsfw);
    // get a promise to publish
    lbryApi
      .publishClaim(publishParams, fileName, fileType)
      .then(result => {
        logger.info(`Successfully published ${fileName}`, result);
        // google analytics
        visitor.event('Publish Route', 'Publish Success', filePath).send();
        // update old record of create new one
        upsert(
          db.File,
          {
            name,
            claimId : result.claim_id,
            outpoint: `${result.txid}:${result.nout}`,
            fileName,
            filePath,
            fileType,
            nsfw,
          },
          { name, claimId: result.claim_id }
        ).catch(error => {
          logger.error('Sequelize findOne error', error);
        });
        // update client
        socket.emit('publish-complete', { name, result });
      })
      .catch(error => {
        logger.error(`Error publishing ${fileName}`, error);
        // google analytics
        visitor.event('Publish Route', 'Publish Failure', filePath).send();
        socket.emit('publish-failure', errorHandlers.handlePublishError(error));
        deleteTemporaryFile(filePath);
      });
  },
};
