module.exports = ({ name, claimId, outpoint, height, address, nsfw, contentType }) => {
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
};
