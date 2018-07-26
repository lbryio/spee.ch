const addGetResultsToFileData = (fileInfo, getResult) => {
  fileInfo.fileName = getResult.file_name;
  fileInfo.filePath = getResult.download_path;
  return fileInfo;
};

module.exports = addGetResultsToFileData;
