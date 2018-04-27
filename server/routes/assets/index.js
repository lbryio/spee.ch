const serveAssetByClaim = require('../../controllers/assets/serveAssetByClaim');
const serveAssetByIdentifierAndClaim = require('../../controllers/assets/serveAssetByIdentifierAndClaim');

module.exports = (app, db) => {
  app.get('/:identifier/:claim', serveAssetByIdentifierAndClaim);
  app.get('/:claim', serveAssetByClaim);
};
