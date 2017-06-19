const publishController = require('../controllers/publishController.js');

module.exports = (app, siofu, hostedContentPath, ua, googleAnalyticsId) => {
  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  io.on('connection', socket => {
    console.log('a user connected via sockets');
    // create visitor record
    const visitor = ua(googleAnalyticsId, { https: true });
    // attach upload listeners
    const uploader = new siofu();
    uploader.dir = hostedContentPath;
    uploader.listen(socket);
    uploader.on('start', ({ file }) => {
      // server side test to make sure file is not a bad file type
      if (/\.exe$/.test(file.name)) {
        uploader.abort(file.id, socket);
      }
    });
    uploader.on('error', ({ error }) => {
      console.log('an error occured while uploading', error);
      socket.emit('publish-status', error);
    });
    uploader.on('saved', ({ file }) => {
      console.log('uploaded ', file.name);
      if (file.success) {
        socket.emit('publish-status', 'file upload successfully completed');
        publishController.publish(file.meta.name, file.name, file.pathName, file.meta.type, file.meta.license, file.meta.nsfw, socket, visitor);
      } else {
        socket.emit('publish-failure', 'file uploaded, but with errors');
        // to-do: remove the file
      }
    });
    // handle disconnect
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return http;
};
