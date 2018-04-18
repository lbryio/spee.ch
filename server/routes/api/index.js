const channelAvailability = require('./channelAvailability');
const channelClaims = require('./channelClaims');
const channelData = require('./channelData');
const channelShortId = require('./channelShortId');
const claimAvailability = require('./claimAvailability');
const claimData = require('./claimData');
const claimGet = require('./claimGet');
const claimLongId = require('./claimLongId');
const claimPublish = require('./claimPublish');
const claimResolve = require('./claimResolve');
const claimShortId = require('./claimShortId');
const claimList = require('./claimList');
const fileAvailability = require('./fileAvailability');

const multipartMiddleware = require('../../helpers/multipartMiddleware');

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
