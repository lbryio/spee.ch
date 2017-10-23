const logger = require('winston');
const { publish } = require('../controllers/publishController.js');
const { createPublishParams } = require('../helpers/publishHelpers.js');
const { useObjectPropertiesIfNoKeys } = require('../helpers/errorHandlers.js');
const { postToStats } = require('../controllers/statsController.js');

module.exports = (app, siofu, hostedContentPath) => {
  const http = require('http');
  const server = http.Server(app);
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    logger.silly('a user connected via sockets');
    // attach upload listeners
    const uploader = new siofu();
    uploader.dir = hostedContentPath;
    uploader.listen(socket);
    // listener for when file upload starts
    uploader.on('start', ({ file }) => {
      // log
      logger.info('client started an upload:', file.name);
      // server side test to make sure file is not a bad file type
      if (/\.exe$/.test(file.name)) {
        uploader.abort(file.id, socket);
      }
    });
    // listener for when file upload encounters an error
    uploader.on('error', ({ error }) => {
      logger.error('an error occured while uploading', error);
      postToStats('PUBLISH', '/', null, null, null, error);
      socket.emit('publish-status', error);
    });
    // listener for when file has been uploaded
    uploader.on('saved', ({ file }) => {
      if (file.success) {
        logger.debug(`Client successfully uploaded ${file.name}`);
        socket.emit('publish-update', 'File upload successfully completed. Your image is being published to LBRY (this might take a second)...');
        // /*
        // NOTE: need to validate that client has the credentials to the channel they chose
        // otherwise they could circumvent security.
        //  */
        let thumbnail;
        if (file.meta.thumbnail) {
          thumbnail = file.meta.thumbnail;
        } else {
          thumbnail = null;
        }
        let channelName;
        if (file.meta.channel) {
          channelName = file.meta.channel;
        } else {
          channelName = null;
        }
        // prepare the publish parameters
        const publishParams = createPublishParams(file.pathName, file.meta.name, file.meta.title, file.meta.description, file.meta.license, file.meta.nsfw, thumbnail, channelName);
        logger.debug('publish parameters:', publishParams);
        // publish the file
        publish(publishParams, file.name, file.meta.type)
        .then(result => {
          socket.emit('publish-complete', { name: publishParams.name, result });
        })
        .catch(error => {
          logger.error('Publish Error:', useObjectPropertiesIfNoKeys(error));
          socket.emit('publish-failure', error.message);
        });
      } else {
        socket.emit('publish-failure', 'File uploaded, but with errors');
        logger.error(`An error occurred in uploading the client's file`);
        // to-do: remove the file, if not done automatically
      }
    });
    // handle disconnect
    socket.on('disconnect', () => {
      logger.silly('a user disconnected via sockets');
    });
  });

  return server;
};
