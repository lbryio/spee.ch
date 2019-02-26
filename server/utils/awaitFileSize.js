const fs = require('fs');
const { promisify } = require('util');

const fsstat = promisify(fs.stat);
const awaitFileSize = (path, sizeInBytes, timeout, interval) => {
  return new Promise((resolve, reject) => {
    let totalTime = 0;
    let timer = setInterval(() => {
      totalTime = totalTime + interval;
      fsstat(path)
        .then(stats => {
          if (stats.size > sizeInBytes) {
            clearInterval(interval);
            resolve('ready');
          }
          if (totalTime > timeout) {
            const error = new Error('File did not arrive in time');
            error.name = 'FILE_NOT_ARRIVED';
            reject(error);
          }
        })
        .catch();
    }, interval);
  });
};

module.exports = awaitFileSize;
