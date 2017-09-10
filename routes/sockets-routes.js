const logger = require('winston');
const publishController = require('../controllers/publishController.js');
const publishHelpers = require('../helpers/publishHelpers.js');
const errorHandlers = require('../helpers/errorHandlers.js');
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
        socket.emit('publish-status', 'File upload successfully completed. Your image is being published to LBRY (this might take a second)...');
        // prepare the publish parameters
        const publishParams = publishHelpers.createPublishParams(file.meta.name, file.pathName, file.meta.title, file.meta.description, file.meta.license, file.meta.nsfw);
        // publish the file
        publishController.publish(publishParams, file.name, file.meta.type)
        .then(result => {
          postToStats('PUBLISH', '/', null, null, null, 'success');
          socket.emit('publish-complete', { name: publishParams.name, result });
        })
        .catch(error => {
          error = errorHandlers.handlePublishError(error);
          postToStats('PUBLISH', '/', null, null, null, error);
          socket.emit('publish-failure', error);
        });
      } else {
        logger.error(`An error occurred in uploading the client's file`);
        socket.emit('publish-failure', 'File uploaded, but with errors');
        postToStats('PUBLISH', '/', null, null, null, 'File uploaded, but with errors');
        // to-do: remove the file if not done automatically
      }
    });
    // handle disconnect
    socket.on('disconnect', () => {
      logger.silly('a user disconnected via sockets');
    });
  });

  return server;
};
