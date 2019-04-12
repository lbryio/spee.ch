import { sendGAServeEvent } from '@serverutils/googleAnalytics';
import getClaimIdAndServeAsset from '../utils/getClaimIdAndServeAsset.js';

/*

  route to serve an asset directly

*/

const serveAsset = ({ headers, ip, originalUrl, params: { claimName, claimId } }, res) => {
  // send google analytics
  sendGAServeEvent(headers, ip, originalUrl);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(null, null, claimName, claimId, originalUrl, ip, res, headers);
};

export default serveAsset;
