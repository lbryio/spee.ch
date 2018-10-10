const serveByClaim = require('../../controllers/assets/serveByClaim');
const serveByIdentifierAndClaim = require('../../controllers/assets/serveByIdentifierAndClaim');

// TODO: Adjust build & sources to use import/export everywhere
const Actions = require('@actions').default;
const Sagas = require('@sagas').default;

module.exports = {
  '/:identifier/:claim': { controller: serveByIdentifierAndClaim, action: Actions.onHandleShowPageUri, saga: Sagas.handleShowPageUri },
  '/:claim': { controller: serveByClaim, action: Actions.onHandleShowPageUri, saga: Sagas.handleShowPageUri },
};
