const { sendGAServeEvent } = require('../../../utils/googleAnalytics');
const getClaimIdAndServeAsset = require('../utils/getClaimIdAndServeAsset.js');

/*

  route to serve an asset directly

*/

const serveAsset = ({ headers, ip, originalUrl, params: { claimName, claimId } }, res) => {
  // send google analytics
  sendGAServeEvent(headers, ip, originalUrl);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(null, null, claimName, claimId, originalUrl, ip, res);
};

module.exports = serveAsset;
