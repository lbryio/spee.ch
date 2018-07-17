const serveByClaim = require('../../controllers/assets/serveByClaim');
const serveByIdentifierAndClaim = require('../../controllers/assets/serveByIdentifierAndClaim');

module.exports = (app) => {
  app.get('/:identifier/:claim', serveByIdentifierAndClaim);
  app.get('/:claim', serveByClaim);
};
