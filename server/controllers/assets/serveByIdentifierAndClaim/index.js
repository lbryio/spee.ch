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
  // parse request
  let hasFileExtension;
  try {
    ({ hasFileExtension } = lbryUri.parseModifier(params.claim));
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
  // determine request type
  let requestType = determineRequestType(hasFileExtension, headers);
  if (requestType === SHOW) {
    return handleShowRender(req, res);
  }
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
  // send google analytics
  sendGAServeEvent(headers, ip, originalUrl);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(channelName, channelClaimId, claimName, claimId, originalUrl, ip, res);
};

module.exports = serverByIdentifierAndClaim;
