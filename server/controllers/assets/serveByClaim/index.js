const { sendGAServeEvent } = require('../../../utils/googleAnalytics');
const handleShowRender = require('../../../render/build/handleShowRender.js');

const lbryUri = require('../utils/lbryUri.js');

const determineRequestType = require('../utils/determineRequestType.js');
const getClaimIdAndServeAsset = require('../utils/getClaimIdAndServeAsset.js');

const { EMBED } = require('../constants/request_types.js');

/*

  route to serve an asset or the react app via the claim name only

*/

const serveByClaim = (req, res) => {
  const { headers, ip, originalUrl, params } = req;
  // decide if this is a show request
  let hasFileExtension;
  try {
    ({ hasFileExtension } = lbryUri.parseModifier(params.claim));
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
  // determine request type
  let requestType = determineRequestType(hasFileExtension, headers);
  if (requestType !== EMBED) {
    return handleShowRender(req, res);
  }
  // parse the claim
  let claimName;
  try {
    ({claimName} = lbryUri.parseClaim(params.claim));
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
  // send google analytics
  sendGAServeEvent(headers, ip, originalUrl);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(null, null, claimName, null, originalUrl, ip, res);
};

module.exports = serveByClaim;
