const createFileData = ({ name, claimId, outpoint, contentType: fileType }, { file_name: fileName, download_path: filePath }) => {
  return {
    name,
    claimId,
    outpoint,
    fileName,
    filePath,
    fileType,
  };
};

module.exports = createFileData;
