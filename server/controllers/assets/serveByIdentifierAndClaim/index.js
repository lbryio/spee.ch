const { sendGAServeEvent } = require('../../../utils/googleAnalytics');
const handleShowRender = require('../../../render/build/handleShowRender.js');

const lbryUri = require('../utils/lbryUri.js');

const determineResponseType = require('../utils/determineResponseType.js');
const getClaimIdAndServeAsset = require('../utils/getClaimIdAndServeAsset.js');
const flipClaimNameAndIdForBackwardsCompatibility = require('../utils/flipClaimNameAndIdForBackwardsCompatibility.js');
const logRequestData = require('../utils/logRequestData.js');

const SERVE = 'SERVE';

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
  let responseType = determineResponseType(hasFileExtension, headers);
  if (responseType !== SERVE) {
    return handleShowRender(req, res);
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
  if (!isChannel) {
    [claimId, claimName] = flipClaimNameAndIdForBackwardsCompatibility(claimId, claimName);
  }
  // log the request data for debugging
  logRequestData(responseType, claimName, channelName, claimId);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(channelName, channelClaimId, claimName, claimId, originalUrl, ip, res);
};

module.exports = serverAssetByIdentifierAndClaim;
