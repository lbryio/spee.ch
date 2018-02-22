const { sendGAServeEvent } = require('../helpers/googleAnalytics');
const { determineResponseType, flipClaimNameAndIdForBackwardsCompatibility, logRequestData, getClaimIdAndServeAsset } = require('../helpers/serveHelpers.js');
const lbryUri = require('../helpers/lbryUri.js');
const handleShowRender = require('../helpers/handleShowRender.jsx');
const SERVE = 'SERVE';

module.exports = (app) => {
  // route to serve a specific asset using the channel or claim id
  app.get('/:identifier/:claim', (req, res) => {
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
      // return res.status(200).render('index');
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
  });
  // route to serve the winning asset at a claim or a channel page
  app.get('/:claim', ({ headers, ip, originalUrl, params, query }, res) => {
    // decide if this is a show request
    let hasFileExtension;
    try {
      ({ hasFileExtension } = lbryUri.parseModifier(params.claim));
    } catch (error) {
      return res.status(400).json({success: false, message: error.message});
    }
    let responseType = determineResponseType(hasFileExtension, headers);
    if (responseType !== SERVE) {
      return res.status(200).render('index');
    }
    // handle serve request
    // send google analytics
    sendGAServeEvent(headers, ip, originalUrl);
    // parse the claim
    let claimName;
    try {
      ({claimName} = lbryUri.parseClaim(params.claim));
    } catch (error) {
      return res.status(400).json({success: false, message: error.message});
    }
    // log the request data for debugging
    logRequestData(responseType, claimName, null, null);
    // get the claim Id and then serve the asset
    getClaimIdAndServeAsset(null, null, claimName, null, originalUrl, ip, res);
  });
};
