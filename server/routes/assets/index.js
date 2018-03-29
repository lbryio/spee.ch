const serveAssetByClaim = require('./serveAssetByClaim');
const serveAssetByIdentifierAndClaim = require('./serveAssetByIdentifierAndClaim');

module.exports = (app, db) => {
  app.get('/:identifier/:claim', serveAssetByIdentifierAndClaim);
  app.get('/:claim', serveAssetByClaim);
};
