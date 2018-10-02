// middleware
const multipartMiddleware = require('../../middleware/multipartMiddleware');
const torCheckMiddleware = require('../../middleware/torCheckMiddleware');
// route handlers
const channelAvailability = require('../../controllers/api/channel/availability');
const channelClaims = require('../../controllers/api/channel/claims');
const channelData = require('../../controllers/api/channel/data');
const channelShortId = require('../../controllers/api/channel/shortId');
const claimAvailability = require('../../controllers/api/claim/availability');
const claimData = require('../../controllers/api/claim/data/');
const claimGet = require('../../controllers/api/claim/get');
const claimList = require('../../controllers/api/claim/list');
const claimLongId = require('../../controllers/api/claim/longId');
const claimPublish = require('../../controllers/api/claim/publish');
const claimResolve = require('../../controllers/api/claim/resolve');
const claimShortId = require('../../controllers/api/claim/shortId');
const fileAvailability = require('../../controllers/api/file/availability');
const userPassword = require('../../controllers/api/user/password');
const publishingConfig = require('../../controllers/api/config/site/publishing');
const getTorList = require('../../controllers/api/tor');
const getBlockedList = require('../../controllers/api/blocked');
const getOEmbedData = require('../../controllers/api/oEmbed');

module.exports = (app) => {
  // channel routes
  app.get('/api/channel/availability/:name', torCheckMiddleware, channelAvailability);
  app.get('/api/channel/short-id/:longId/:name', torCheckMiddleware, channelShortId);
  app.get('/api/channel/data/:channelName/:channelClaimId', torCheckMiddleware, channelData);
  app.get('/api/channel/claims/:channelName/:channelClaimId/:page', torCheckMiddleware, channelClaims);
  // claim routes
  app.get('/api/claim/availability/:name', torCheckMiddleware, claimAvailability);
  app.get('/api/claim/data/:claimName/:claimId', torCheckMiddleware, claimData);
  app.get('/api/claim/get/:name/:claimId', torCheckMiddleware, claimGet);
  app.get('/api/claim/list/:name', torCheckMiddleware, claimList);
  app.post('/api/claim/long-id', torCheckMiddleware, claimLongId); // note: should be a 'get'
  app.post('/api/claim/publish', torCheckMiddleware, multipartMiddleware, claimPublish);
  app.get('/api/claim/resolve/:name/:claimId', torCheckMiddleware, claimResolve);
  app.get('/api/claim/short-id/:longId/:name', torCheckMiddleware, claimShortId);
  // file routes
  app.get('/api/file/availability/:name/:claimId', torCheckMiddleware, fileAvailability);
  // user routes
  app.put('/api/user/password/', torCheckMiddleware, userPassword);
  // configs
  app.get('/api/config/site/publishing', torCheckMiddleware, publishingConfig);
  // tor
  app.get('/api/tor', torCheckMiddleware, getTorList);
  // blocked
  app.get('/api/blocked', torCheckMiddleware, getBlockedList);
  // open embed
  app.get('/api/oembed', torCheckMiddleware, getOEmbedData);
};
