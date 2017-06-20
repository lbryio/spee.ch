const publishController = require('../controllers/publishController.js');
const logger = require('winston');

module.exports = (app, siofu, hostedContentPath, ua, googleAnalyticsId) => {
  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  io.on('connection', socket => {
    logger.silly('a user connected via sockets');
    // create visitor record
    const visitor = ua(googleAnalyticsId, { https: true });
    // attach upload listeners
    const uploader = new siofu();
    uploader.dir = hostedContentPath;
    uploader.listen(socket);
    uploader.on('start', ({ file }) => {
      logger.info('client started an upload:', file.name);
      // server side test to make sure file is not a bad file type
      if (/\.exe$/.test(file.name)) {
        uploader.abort(file.id, socket);
      }
    });
    uploader.on('error', ({ error }) => {
      logger.error('an error occured while uploading', error);
      socket.emit('publish-status', error);
    });
    uploader.on('saved', ({ file }) => {
      if (file.success) {
        logger.debug(`Client successfully uploaded ${file.name}`);
        socket.emit('publish-status', 'file upload successfully completed');
        publishController.publish(file.meta.name, file.name, file.pathName, file.meta.type, file.meta.license, file.meta.nsfw, socket, visitor);
      } else {
        logger.error(`An error occurred in uploading the client's file`);
        socket.emit('publish-failure', 'file uploaded, but with errors');
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
