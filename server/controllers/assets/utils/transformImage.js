import gm from 'gm';
import logger from 'winston';
import { getImageHeightAndWidth } from '@serverutils/imageProcessing';
const imageMagick = gm.subClass({ imageMagick: true });

export default function transformImage(path, queryObj) {
  return new Promise((resolve, reject) => {
    let { h: cHeight = null } = queryObj;
    let { w: cWidth = null } = queryObj;
    let { t: transform = null } = queryObj;
    let { x: xOrigin = null } = queryObj;
    let { y: yOrigin = null } = queryObj;
    let oHeight,
      oWidth = null;
    try {
      getImageHeightAndWidth(path).then(hwarr => {
        oHeight = hwarr[0];
        oWidth = hwarr[1];
        // conditional logic here
        if (transform === 'crop') {
          resolve(_cropCenter(path, cWidth, cHeight, oWidth, oHeight));
        } else if (transform === 'stretch') {
          imageMagick(path)
            .resize(cWidth, cHeight, '!')
            .toBuffer(null, (err, buf) => {
              resolve(buf);
            });
        } else {
          // resize scaled
          imageMagick(path)
            .resize(cWidth, cHeight)
            .toBuffer(null, (err, buf) => {
              resolve(buf);
            });
        }
      });
    } catch (e) {
      logger.error(e);
      reject(e);
    }
  });
}

function _cropCenter(path, cropWidth, cropHeight, originalWidth, originalHeight) {
  let oAspect = originalWidth / originalHeight;
  let cAspect = cropWidth / cropHeight;
  let resizeX,
    resizeY,
    xpoint,
    ypoint = null;

  if (oAspect >= cAspect) {
    // if crop is narrower aspect than original
    resizeY = cropHeight;
    xpoint = (oAspect * cropHeight) / 2 - cropWidth / 2;
    ypoint = 0;
  } else {
    // if crop is wider aspect than original
    resizeX = cropWidth;
    xpoint = 0;
    ypoint = cropWidth / oAspect / 2 - cropHeight / 2;
  }
  return new Promise((resolve, reject) => {
    try {
      imageMagick(path)
        .resize(resizeX, resizeY)
        .crop(cropWidth, cropHeight, xpoint, ypoint)
        .toBuffer(null, (err, buf) => {
          resolve(buf);
        });
    } catch (e) {
      logger.error(e);
      reject(e);
    }
  });
}
