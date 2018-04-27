const channelAvailability = require('../../controllers/api/channelAvailability');
const channelClaims = require('../../controllers/api/channelClaims');
const channelData = require('../../controllers/api/channelData');
const channelShortId = require('../../controllers/api/channelShortId');
const claimAvailability = require('../../controllers/api/claimAvailability');
const claimData = require('../../controllers/api/claimData');
const claimGet = require('../../controllers/api/claimGet');
const claimLongId = require('../../controllers/api/claimLongId');
const claimPublish = require('../../controllers/api/claimPublish');
const claimResolve = require('../../controllers/api/claimResolve');
const claimShortId = require('../../controllers/api/claimShortId');
const claimList = require('../../controllers/api/claimList');
const fileAvailability = require('../../controllers/api/fileAvailability');

const multipartMiddleware = require('../utils/multipartMiddleware');

module.exports = (app) => {
  // channel routes
  app.get('/api/channel/availability/:name', channelAvailability);
  app.get('/api/channel/short-id/:longId/:name', channelShortId);
  app.get('/api/channel/data/:channelName/:channelClaimId', channelData);
  app.get('/api/channel/claims/:channelName/:channelClaimId/:page', channelClaims);
  // claim routes
  app.get('/api/claim/list/:name', claimList);
  app.get('/api/claim/get/:name/:claimId', claimGet);
  app.get('/api/claim/availability/:name', claimAvailability);
  app.get('/api/claim/resolve/:name/:claimId', claimResolve);
  app.post('/api/claim/publish', multipartMiddleware, claimPublish);
  app.get('/api/claim/short-id/:longId/:name', claimShortId);
  app.post('/api/claim/long-id', claimLongId);
  app.get('/api/claim/data/:claimName/:claimId', claimData);
  // file routes
  app.get('/api/file/availability/:name/:claimId', fileAvailability);
};
