const logger = require('winston');
const publishController = require('../controllers/publishController.js');
const publishHelpers = require('../helpers/libraries/publishHelpers.js');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const { postPublishAnalytics } = require('../helpers/libraries/analytics');

module.exports = (app, siofu, hostedContentPath, ua, googleAnalyticsId) => {
  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  io.on('connection', socket => {
    logger.silly('a user connected via sockets');
    // attach upload listeners
    const uploader = new siofu();
    uploader.dir = hostedContentPath;
    uploader.listen(socket);
    // listener for when file upload starts
    uploader.on('start', ({ file }) => {
      logger.info('client started an upload:', file.name);
      // server side test to make sure file is not a bad file type
      if (/\.exe$/.test(file.name)) {
        uploader.abort(file.id, socket);
      }
    });
    // listener for when file upload encounters an error
    uploader.on('error', ({ error }) => {
      logger.error('an error occured while uploading', error);
      postPublishAnalytics('spee.ch/', null, error);
      socket.emit('publish-status', error);
    });
    // listener for when file has been uploaded
    uploader.on('saved', ({ file }) => {
      if (file.success) {
        logger.debug(`Client successfully uploaded ${file.name}`);
        socket.emit('publish-status', 'file upload successfully completed. Your image is being published (this might take a second)...');
        // prepare the publish parameters
        const publishParams = publishHelpers.createPublishParams(file.meta.name, file.pathName, file.meta.license, file.meta.nsfw);
        // publish the file
        publishController
          .publish(publishParams, file.name, file.meta.type)
          .then(result => {
            postPublishAnalytics('spee.ch/', null, 'success');
            socket.emit('publish-complete', { name: publishParams.name, result });
          })
          .catch(error => {
            postPublishAnalytics('spee.ch/', null, error);
            socket.emit('publish-failure', errorHandlers.handlePublishError(error));
          });
      } else {
        logger.error(`An error occurred in uploading the client's file`);
        socket.emit('publish-failure', 'file uploaded, but with errors');
        postPublishAnalytics('spee.ch/', null, 'file uploaded, but with errors');
        // to-do: remove the file if not done automatically
      }
    });
    // handle disconnect
    socket.on('disconnect', () => {
      logger.silly('a user disconnected via sockets');
    });
  });

  return http;
};
