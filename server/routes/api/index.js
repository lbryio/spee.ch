// middleware
const { autoblockPublishMiddleware, autoblockPublishBodyMiddleware } = require('../../middleware/autoblockPublishMiddleware');
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
const claimAbandon = require('../../controllers/api/claim/abandon');
const claimUpdate = require('../../controllers/api/claim/update');
const claimResolve = require('../../controllers/api/claim/resolve');
const claimShortId = require('../../controllers/api/claim/shortId');
const claimViews = require('../../controllers/api/claim/views');
const fileAvailability = require('../../controllers/api/file/availability');
const specialClaims = require('../../controllers/api/special/claims');
const userPassword = require('../../controllers/api/user/password');
const publishingConfig = require('../../controllers/api/config/site/publishing');
const getTorList = require('../../controllers/api/tor');
const getBlockedList = require('../../controllers/api/blocked');
const getOEmbedData = require('../../controllers/api/oEmbed');
const cors = require('cors');

export default {
  // homepage routes
  '/api/homepage/data/channels'                           : { controller: [ torCheckMiddleware, channelData ] },
  // channel routes
  '/api/channel/availability/:name'                       : { controller: [ torCheckMiddleware, channelAvailability ] },
  '/api/channel/short-id/:longId/:name'                   : { controller: [ torCheckMiddleware, channelShortId ] },
  '/api/channel/data/:channelName/:channelClaimId'        : { controller: [ torCheckMiddleware, channelData ] },
  '/api/channel/claims/:channelName/:channelClaimId/:page': { controller: [ torCheckMiddleware, channelClaims ] },

  // sepcial routes
  '/api/special/:name/:page': { controller: [ torCheckMiddleware, specialClaims ] },

  // claim routes
  '/api/claim/availability/:name'        : { controller: [ torCheckMiddleware, claimAvailability ] },
  '/api/claim/data/:claimName/:claimId'  : { controller: [ torCheckMiddleware, claimData ] },
  '/api/claim/get/:name/:claimId'        : { controller: [ torCheckMiddleware, claimGet ] },
  '/api/claim/list/:name'                : { controller: [ torCheckMiddleware, claimList ] },
  '/api/claim/long-id'                   : { method: 'post', controller: [ cors(), torCheckMiddleware, claimLongId ] }, // note: should be a 'get'
  '/api/claim/publish'                   : { method: 'post', controller: [ cors(), torCheckMiddleware, autoblockPublishMiddleware, multipartMiddleware, autoblockPublishBodyMiddleware, claimPublish ] },
  '/api/claim/update'                    : { method: 'post', controller: [ cors(), torCheckMiddleware, multipartMiddleware, claimUpdate ] },
  '/api/claim/abandon'                   : { method: 'post', controller: [ cors(), torCheckMiddleware, multipartMiddleware, claimAbandon ] },
  '/api/claim/resolve/:name/:claimId'    : { controller: [ torCheckMiddleware, claimResolve ] },
  '/api/claim/short-id/:longId/:name'    : { controller: [ torCheckMiddleware, claimShortId ] },
  '/api/claim/views/:claimId'            : { controller: [ torCheckMiddleware, claimViews ] },
  // file routes
  '/api/file/availability/:name/:claimId': { controller: [ torCheckMiddleware, fileAvailability ] },
  // user routes
  '/api/user/password/'                  : { method: 'put', controller: [ torCheckMiddleware, userPassword ] },
  // configs
  '/api/config/site/publishing'          : { controller: [ cors(), torCheckMiddleware, publishingConfig ] },
  // tor
  '/api/tor'                             : { controller: [ torCheckMiddleware, getTorList ] },
  // blocked
  '/api/blocked'                         : { controller: [ torCheckMiddleware, getBlockedList ] },
  // open embed
  '/api/oembed'                          : { controller: [ torCheckMiddleware, getOEmbedData ] },
};
