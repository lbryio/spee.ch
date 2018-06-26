const serveByClaim = require('../../controllers/assets/serveByClaim');
const serveByIdentifierAndClaim = require('../../controllers/assets/serveByIdentifierAndClaim');
const serveAsset = require('../../controllers/assets/serveAsset');

module.exports = (app) => {
  app.get('/asset/:claimName/:claimId/', serveAsset);
  app.get('/:identifier/:claim', serveByIdentifierAndClaim);
  app.get('/:claim', serveByClaim);
};
