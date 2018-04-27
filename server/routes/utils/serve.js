const logger = require('winston');
const { getClaimId, getLocalFileRecord } = require('../../controllers/serveController.js');
const { handleErrorResponse } = require('./errorHandlers.js');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const NO_FILE = 'NO_FILE';
const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';

function clientAcceptsHtml ({accept}) {
  return accept && accept.match(/text\/html/);
};

function requestIsFromBrowser (headers) {
  return headers['user-agent'] && headers['user-agent'].match(/Mozilla/);
};

function clientWantsAsset ({accept, range}) {
  const imageIsWanted = accept && accept.match(/image\/.*/) && !accept.match(/text\/html/) && !accept.match(/text\/\*/);
  const videoIsWanted = accept && range;
  return imageIsWanted || videoIsWanted;
};

function isValidClaimId (claimId) {
  return ((claimId.length === 40) && !/[^A-Za-z0-9]/g.test(claimId));
};

function isValidShortId (claimId) {
  return claimId.length === 1;  // it should really evaluate the short url itself
};

function isValidShortIdOrClaimId (input) {
  return (isValidClaimId(input) || isValidShortId(input));
};

function serveAssetToClient (claimId, name, res) {
  return getLocalFileRecord(claimId, name)
    .then(fileRecord => {
      // check that a local record was found
      if (fileRecord === NO_FILE) {
        return res.status(307).redirect(`/api/claim/get/${name}/${claimId}`);
      }
      // serve the file
      const {filePath, fileType} = fileRecord;
      logger.verbose(`serving file: ${filePath}`);
      const sendFileOptions = {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Content-Type'          : fileType || 'image/jpeg',
        },
      };
      res.status(200).sendFile(filePath, sendFileOptions);
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getClaimIdAndServeAsset (channelName, channelClaimId, claimName, claimId, originalUrl, ip, res) {
    // get the claim Id and then serve the asset
    getClaimId(channelName, channelClaimId, claimName, claimId)
      .then(fullClaimId => {
        if (fullClaimId === NO_CLAIM) {
          return res.status(404).json({success: false, message: 'no claim id could be found'});
        } else if (fullClaimId === NO_CHANNEL) {
          return res.status(404).json({success: false, message: 'no channel id could be found'});
        }
        serveAssetToClient(fullClaimId, claimName, res);
        // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'success');
      })
      .catch(error => {
        handleErrorResponse(originalUrl, ip, error, res);
        // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'fail');
      });
  },
  determineResponseType (hasFileExtension, headers) {
    let responseType;
    if (hasFileExtension) {
      responseType = SERVE;  // assume a serve request if file extension is present
      if (clientAcceptsHtml(headers)) {  // if the request comes from a browser, change it to a show request
        responseType = SHOW;
      }
    } else {
      responseType = SHOW;
      if (clientWantsAsset(headers) && requestIsFromBrowser(headers)) {  // this is in case someone embeds a show url
        logger.debug('Show request came from browser but wants an image/video. Changing response to serve...');
        responseType = SERVE;
      }
    }
    return responseType;
  },
  flipClaimNameAndIdForBackwardsCompatibility (identifier, name) {
    // this is a patch for backwards compatability with '/name/claim_id' url format
    if (isValidShortIdOrClaimId(name) && !isValidShortIdOrClaimId(identifier)) {
      const tempName = name;
      name = identifier;
      identifier = tempName;
    }
    return [identifier, name];
  },
  logRequestData (responseType, claimName, channelName, claimId) {
    logger.debug('responseType ===', responseType);
    logger.debug('claim name === ', claimName);
    logger.debug('channel name ===', channelName);
    logger.debug('claim id ===', claimId);
  },
};
