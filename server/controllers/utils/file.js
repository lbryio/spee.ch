module.exports = {
  addGetResultsToFileData (fileInfo, getResult) {
    fileInfo.fileName = getResult.file_name;
    fileInfo.filePath = getResult.download_path;
    return fileInfo;
  },
  createFileData ({ name, claimId, outpoint, height, address, nsfw, contentType }) {
    return {
      name,
      claimId,
      outpoint,
      height,
      address,
      fileName: '',
      filePath: '',
      fileType: contentType,
      nsfw,
    };
  },
};
