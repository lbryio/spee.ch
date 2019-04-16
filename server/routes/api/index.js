// middleware
import multipartMiddleware from 'server/middleware/multipartMiddleware';
import torCheckMiddleware from 'server/middleware/torCheckMiddleware';
// route handlers
import channelAvailability from 'server/controllers/api/channel/availability';
import channelClaims from 'server/controllers/api/channel/claims';
import channelData from 'server/controllers/api/channel/data';
import channelShortId from 'server/controllers/api/channel/shortId';
import claimAvailability from 'server/controllers/api/claim/availability';
import claimData from 'server/controllers/api/claim/data/';
import claimGet from 'server/controllers/api/claim/get';
import claimList from 'server/controllers/api/claim/list';
import claimLongId from 'server/controllers/api/claim/longId';
import claimPublish from 'server/controllers/api/claim/publish';
import claimAbandon from 'server/controllers/api/claim/abandon';
import claimUpdate from 'server/controllers/api/claim/update';
import claimResolve from 'server/controllers/api/claim/resolve';
import claimShortId from 'server/controllers/api/claim/shortId';
import claimViews from 'server/controllers/api/claim/views';
import fileAvailability from 'server/controllers/api/file/availability';
import specialClaims from 'server/controllers/api/special/claims';
import userPassword from 'server/controllers/api/user/password';
import publishingConfig from 'server/controllers/api/config/site/publishing';
import getTorList from 'server/controllers/api/tor';
import getBlockedList from 'server/controllers/api/blocked';
import getOEmbedData from 'server/controllers/api/oEmbed';
const {
  autoblockPublishMiddleware,
  autoblockPublishBodyMiddleware,
} = require('server/middleware/autoblockPublishMiddleware');

export default {
  // homepage routes
  '/api/homepage/data/channels': { controller: [torCheckMiddleware, channelData] },
  // channel routes
  '/api/channel/availability/:name': { controller: [torCheckMiddleware, channelAvailability] },
  '/api/channel/short-id/:longId/:name': { controller: [torCheckMiddleware, channelShortId] },
  '/api/channel/data/:channelName/:channelClaimId': {
    controller: [torCheckMiddleware, channelData],
  },
  '/api/channel/claims/:channelName/:channelClaimId/:page': {
    controller: [torCheckMiddleware, channelClaims],
  },

  // sepcial routes
  '/api/special/:name/:page': { controller: [torCheckMiddleware, specialClaims] },

  // claim routes
  '/api/claim/availability/:name': { controller: [torCheckMiddleware, claimAvailability] },
  '/api/claim/data/:claimName/:claimId': { controller: [torCheckMiddleware, claimData] },
  '/api/claim/get/:name/:claimId': { controller: [torCheckMiddleware, claimGet] },
  '/api/claim/list/:name': { controller: [torCheckMiddleware, claimList] },
  '/api/claim/long-id': { method: 'post', controller: [torCheckMiddleware, claimLongId] }, // note: should be a 'get'
  '/api/claim/publish': {
    method: 'post',
    controller: [
      torCheckMiddleware,
      autoblockPublishMiddleware,
      multipartMiddleware,
      autoblockPublishBodyMiddleware,
      claimPublish,
    ],
  },
  '/api/claim/update': {
    method: 'post',
    controller: [torCheckMiddleware, multipartMiddleware, claimUpdate],
  },
  '/api/claim/abandon': {
    method: 'post',
    controller: [torCheckMiddleware, multipartMiddleware, claimAbandon],
  },
  '/api/claim/resolve/:name/:claimId': { controller: [torCheckMiddleware, claimResolve] },
  '/api/claim/short-id/:longId/:name': { controller: [torCheckMiddleware, claimShortId] },
  '/api/claim/views/:claimId': { controller: [torCheckMiddleware, claimViews] },
  // file routes
  '/api/file/availability/:name/:claimId': { controller: [torCheckMiddleware, fileAvailability] },
  // user routes
  '/api/user/password/': { method: 'put', controller: [torCheckMiddleware, userPassword] },
  // configs
  '/api/config/site/publishing': { controller: [torCheckMiddleware, publishingConfig] },
  // tor
  '/api/tor': { controller: [torCheckMiddleware, getTorList] },
  // blocked
  '/api/blocked': { controller: [torCheckMiddleware, getBlockedList] },
  // open embed
  '/api/oembed': { controller: [torCheckMiddleware, getOEmbedData] },
};
