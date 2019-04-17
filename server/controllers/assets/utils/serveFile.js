import logger from 'winston';
import transformImage from './transformImage';
import parseQueryString from 'server/utils/parseQuerystring';
import isValidQueryObject from 'server/utils/isValidQueryObj';
import { serving } from '@config/siteConfig';
const { dynamicFileSizing } = serving;

const { enabled: dynamicEnabled } = dynamicFileSizing;

const serveFile = async (
  { download_path: filePath, mime_type: fileType, total_bytes: totalBytes },
  res,
  originalUrl
) => {
  const queryObject = parseQueryString(originalUrl) || {};

  if (!fileType) {
    logger.error(`no fileType provided for ${filePath}`);
  }

  let mediaType = fileType ? fileType.substr(0, fileType.indexOf('/')) : '';
  const transform =
    mediaType === 'image' &&
    queryObject.hasOwnProperty('h') &&
    queryObject.hasOwnProperty('w') &&
    dynamicEnabled;

  const sendFileOptions = {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Content-Type': fileType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  };
  logger.debug(`fileOptions for ${filePath}:`, sendFileOptions);
  try {
    if (transform) {
      if (!isValidQueryObject(queryObject)) {
        logger.debug(`Unacceptable querystring`, { queryObject });
        res.status(400).json({
          success: false,
          message: 'Querystring may not have dimensions greater than 2000',
        });
        res.end();
      }
      logger.debug(`transforming and sending file`);

      let xformed = await transformImage(filePath, queryObject);
      res.status(200).set(sendFileOptions.headers);
      res.end(xformed, 'binary');
    } else {
      res.status(200).sendFile(filePath, sendFileOptions);
    }
  } catch (e) {
    logger.debug(e);
  }
};

export default serveFile;
