const validateFileTypeAndSize = require('./validateFileTypeAndSize.js');

const parsePublishApiRequestFiles = ({file, thumbnail}) => {
  // make sure a file was provided
  if (!file) {
    throw new Error('no file with key of [file] found in request');
  }
  if (!file.path) {
    throw new Error('no file path found');
  }
  if (!file.type) {
    throw new Error('no file type found');
  }
  if (!file.size) {
    throw new Error('no file type found');
  }
  // validate the file name
  if (/'/.test(file.name)) {
    throw new Error('apostrophes are not allowed in the file name');
  }
  // validate the file
  validateFileTypeAndSize(file);
  // return results
  return {
    fileName         : file.name,
    filePath         : file.path,
    fileType         : file.type,
    thumbnailFileName: (thumbnail ? thumbnail.name : null),
    thumbnailFilePath: (thumbnail ? thumbnail.path : null),
    thumbnailFileType: (thumbnail ? thumbnail.type : null),
  };
};

module.exports = parsePublishApiRequestFiles;
