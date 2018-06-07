const channelAvailability = require('../../controllers/api/channel/availability');
const channelClaims = require('../../controllers/api/channel/claims');
const channelData = require('../../controllers/api/channel/data');
const channelShortId = require('../../controllers/api/channel/shortId');
const claimAvailability = require('../../controllers/api/claim/availability');
const claimBlockedList = require('../../controllers/api/claim/blockedList');
const claimData = require('../../controllers/api/claim/data/');
const claimGet = require('../../controllers/api/claim/get');
const claimList = require('../../controllers/api/claim/list');
const claimLongId = require('../../controllers/api/claim/longId');
const claimPublish = require('../../controllers/api/claim/publish');
const claimResolve = require('../../controllers/api/claim/resolve');
const claimShortId = require('../../controllers/api/claim/shortId');
const fileAvailability = require('../../controllers/api/file/availability');
const userPassword = require('../../controllers/api/user/password');

const multipartMiddleware = require('../utils/multipartMiddleware');

module.exports = (app) => {
  // channel routes
  app.get('/api/channel/availability/:name', channelAvailability);
  app.get('/api/channel/short-id/:longId/:name', channelShortId);
  app.get('/api/channel/data/:channelName/:channelClaimId', channelData);
  app.get('/api/channel/claims/:channelName/:channelClaimId/:page', channelClaims);
  // claim routes
  app.get('/api/claim/availability/:name', claimAvailability);
  app.get('/api/claim/blocked-list/', claimBlockedList);
  app.get('/api/claim/data/:claimName/:claimId', claimData);
  app.get('/api/claim/get/:name/:claimId', claimGet);
  app.get('/api/claim/list/:name', claimList);
  app.post('/api/claim/long-id', claimLongId);
  app.post('/api/claim/publish', multipartMiddleware, claimPublish);
  app.get('/api/claim/resolve/:name/:claimId', claimResolve);
  app.get('/api/claim/short-id/:longId/:name', claimShortId);
  // file routes
  app.get('/api/file/availability/:name/:claimId', fileAvailability);
  // user routes
  app.put('/api/user/password/', userPassword);
};
