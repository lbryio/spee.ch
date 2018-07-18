const logger = require('winston');

const { sendGAServeEvent } = require('../../../utils/googleAnalytics');
const handleShowRender = require('../../../render/build/handleShowRender.js');

const lbryUri = require('../utils/lbryUri.js');

const determineRequestType = require('../utils/determineRequestType.js');
const getClaimIdAndServeAsset = require('../utils/getClaimIdAndServeAsset.js');
const flipClaimNameAndId = require('../utils/flipClaimNameAndId.js');

const { SHOW } = require('../constants/request_types.js');

/*

  route to serve an asset or the react app via the claim name and an identifier

*/

const serverByIdentifierAndClaim = (req, res) => {
  const { headers, ip, originalUrl, params } = req;

  try {
    // decide if this is a show request
    const { hasFileExtension } = lbryUri.parseModifier(params.claim);
    if (determineRequestType(hasFileExtension, headers) === SHOW) {
      logger.info('show request:', { headers, ip, originalUrl, params });
      return handleShowRender(req, res);
    }

    // parse the indentifier and claim
    let { claimName } = lbryUri.parseClaim(params.claim);
    let { isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(params.identifier);

    // for backwards compatability, flip claim name and claim id if necessary
    if (!isChannel) {
      [claimId, claimName] = flipClaimNameAndId(claimId, claimName);
    }

    // send google analytics
    sendGAServeEvent(headers, ip, originalUrl);

    // get the claim Id and then serve the asset
    logger.info('serve request:', { headers, ip, originalUrl, params });
    getClaimIdAndServeAsset(channelName, channelClaimId, claimName, claimId, originalUrl, ip, res);

  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }

};

module.exports = serverByIdentifierAndClaim;
