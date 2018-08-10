const getVideoDimensions = require('get-video-dimensions');

async function getVideoHeightAndWidth (filePath) {
  const videoDimensions = await getVideoDimensions(filePath);
  const { height, width } = videoDimensions;
  return [ height, width ];
}

module.exports = {
  getVideoHeightAndWidth,
};
