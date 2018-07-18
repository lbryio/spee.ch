const logger = require('winston');

const { sendGAServeEvent } = require('../../../utils/googleAnalytics');
const handleShowRender = require('../../../render/build/handleShowRender.js');

const lbryUri = require('../utils/lbryUri.js');

const determineRequestType = require('../utils/determineRequestType.js');
const getClaimIdAndServeAsset = require('../utils/getClaimIdAndServeAsset.js');

const { SHOW } = require('../constants/request_types.js');

/*

  route to serve an asset or the react app via the claim name only

*/

const serveByClaim = (req, res) => {
  const { headers, ip, originalUrl, params } = req;

  try {
    // return early if channel request
    const { isChannel } = lbryUri.parseIdentifier(params.claim);
    if (isChannel) {
      logger.info('channel request:', { headers, ip, originalUrl, params });
      return handleShowRender(req, res);
    }

    // decide if this is a show request
    const { hasFileExtension } = lbryUri.parseModifier(params.claim);
    if (determineRequestType(hasFileExtension, headers) === SHOW) {
      logger.info('show request:', { headers, ip, originalUrl, params });
      return handleShowRender(req, res);
    }

    // parse the claim
    const { claimName } = lbryUri.parseClaim(params.claim);

    // send google analytics
    sendGAServeEvent(headers, ip, originalUrl);

    // get the claim Id and then serve the asset
    logger.info('serve request:', { headers, ip, originalUrl, params });
    getClaimIdAndServeAsset(null, null, claimName, null, originalUrl, ip, res);

  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }

};

module.exports = serveByClaim;
