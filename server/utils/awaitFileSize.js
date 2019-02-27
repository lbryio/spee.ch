const { getFileListFileByOutpoint } = require('server/lbrynet');
const logger = require('winston');

function delay(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t);
  });
}

const awaitFileSize = (outpoint, size, interval, timeout) => {
  logger.debug('awaitFileSize');
  let start = Date.now();
  function checkFileList() {
    logger.debug('checkFileList');
    return getFileListFileByOutpoint(outpoint).then(result => {
      logger.debug('File List Result', result);
      if (result[0]['completed'] === true || result[0]['written_bytes'] > size) {
        logger.debug('FILE READY');
        return 'ready';
      } else if (timeout !== 0 && Date.now() - start > timeout) {
        throw new Error('Timeout on awaitFileSize');
      } else {
        return delay(interval).then(checkFileList);
      }
    });
  }
  return checkFileList();
};

module.exports = awaitFileSize;
