const { sendGAServeEvent } = require('../../../utils/googleAnalytics');
const handleShowRender = require('../../../render/build/handleShowRender.js');

const lbryUri = require('../utils/lbryUri.js');

const determineRequestType = require('../utils/determineRequestType.js');
const getClaimIdAndServeAsset = require('../utils/getClaimIdAndServeAsset.js');
const flipClaimNameAndId = require('../utils/flipClaimNameAndId.js');
const logRequestData = require('../utils/logRequestData.js');

const { BROWSER, SOCIAL } = require('../constants/request_types.js');

/*

  route to serve an asset or the react app via the claim name and an identifier

*/

const serverAssetByIdentifierAndClaim = (req, res) => {
  const { headers, ip, originalUrl, params } = req;
  // decide if this is a show request
  let hasFileExtension;
  try {
    ({ hasFileExtension } = lbryUri.parseModifier(params.claim));
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
  let requestType = determineRequestType(hasFileExtension, headers);
  if (requestType == BROWSER) {
    return handleShowRender(req, res);
  }
  if (requestType == SOCIAL) {
    return handleSocialRequest(req, res);
  }
  // handle serve request
  // send google analytics
  sendGAServeEvent(headers, ip, originalUrl);
  // parse the claim
  let claimName;
  try {
    ({ claimName } = lbryUri.parseClaim(params.claim));
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
  // parse the identifier
  let isChannel, channelName, channelClaimId, claimId;
  try {
    ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(params.identifier));
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
  // for backwards compatability, flip claim name and claim id if necessary
  if (!isChannel) {
    [claimId, claimName] = flipClaimNameAndId(claimId, claimName);
  }
  // log the request data for debugging
  logRequestData(requestType, claimName, channelName, claimId);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(channelName, channelClaimId, claimName, claimId, originalUrl, ip, res);
};

module.exports = serverAssetByIdentifierAndClaim;
