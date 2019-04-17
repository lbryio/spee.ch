import getVideoDimensions from 'get-video-dimensions';

export async function getVideoHeightAndWidth(filePath) {
  const videoDimensions = await getVideoDimensions(filePath);
  const { height, width } = videoDimensions;
  return [height, width];
}
