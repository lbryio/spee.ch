import serveByClaim from 'server/controllers/assets/serveByClaim';
import serveByIdentifierAndClaim from 'server/controllers/assets/serveByIdentifierAndClaim';

// TODO: Adjust build & sources to use import/export everywhere
const Actions = require('@actions').default;
const Sagas = require('@sagas').default;

export default {
  '/:identifier/:claim': {
    controller: serveByIdentifierAndClaim,
    action: Actions.onHandleShowPageUri,
    saga: Sagas.handleShowPageUri,
  },
  '/:claim': {
    controller: serveByClaim,
    action: Actions.onHandleShowPageUri,
    saga: Sagas.handleShowPageUri,
  },
};
