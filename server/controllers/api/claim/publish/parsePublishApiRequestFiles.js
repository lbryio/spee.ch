const path = require('path');
const validateFileTypeAndSize = require('./validateFileTypeAndSize.js');

const parsePublishApiRequestFiles = ({ file, thumbnail }, isUpdate) => {
  // make sure a file was provided
  if (!file) {
    if (isUpdate) {
      if (thumbnail) {
        const obj = {};
        obj.thumbnailFileName = thumbnail.name;
        obj.thumbnailFilePath = thumbnail.path;
        obj.thumbnailFileType = thumbnail.type;
        return obj;
      }
      return {};
    }
    throw new Error('No file with key of [file] found in request');
  }
  if (!file.path) {
    throw new Error('No file path found');
  }
  if (!file.type) {
    throw new Error('No file type found');
  }
  if (!file.size) {
    throw new Error('No file size found');
  }
  // validate the file name
  if (!file.name) {
    throw new Error('No file name found');
  }
  if (file.name.indexOf('.') < 0) {
    throw new Error('No file extension found in file name');
  }
  if (file.name.indexOf('.') === 0) {
    throw new Error('File name cannot start with "."');
  }
  if (/'/.test(file.name)) {
    throw new Error('Apostrophes are not allowed in the file name');
  }

  // validate the file
  if (file) validateFileTypeAndSize(file);
  // return results
  const obj = {
    fileName: file.name,
    filePath: file.path,
    fileExtension: path.extname(file.path),
    fileType: file.type,
  };

  if (thumbnail) {
    obj.thumbnailFileName = thumbnail.name;
    obj.thumbnailFilePath = thumbnail.path;
    obj.thumbnailFileType = thumbnail.type;
  }

  return obj;
};

module.exports = parsePublishApiRequestFiles;
