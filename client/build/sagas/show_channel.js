"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = require("redux-saga/effects");

var actions = _interopRequireWildcard(require("../constants/show_action_types"));

var _show = require("../actions/show");

var _channelApi = require("../api/channelApi");

var _show2 = require("../selectors/show");

var _site = require("../selectors/site");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(newChannelRequest),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchNewChannelRequest),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(getNewClaimsAndUpdateChannel),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUpdateChannelClaims);

function newChannelRequest(action) {
  var _action$data, requestType, requestId, channelName, channelId, state, host, longId, shortId, _ref, _ref$data, channelKey, claimsData, _ref2;

  return regeneratorRuntime.wrap(function newChannelRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _action$data = action.data, requestType = _action$data.requestType, requestId = _action$data.requestId, channelName = _action$data.channelName, channelId = _action$data.channelId; // put an action to update the request in redux

          _context.next = 3;
          return (0, _effects.put)((0, _show.onRequestUpdate)(requestType, requestId));

        case 3:
          _context.next = 5;
          return (0, _effects.select)(_show2.selectShowState);

        case 5:
          state = _context.sent;
          _context.next = 8;
          return (0, _effects.select)(_site.selectSiteHost);

        case 8:
          host = _context.sent;

          if (!state.requestList[requestId]) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", null);

        case 11:
          _context.prev = 11;
          _context.next = 14;
          return (0, _effects.call)(_channelApi.getChannelData, host, channelName, channelId);

        case 14:
          _ref = _context.sent;
          _ref$data = _ref.data;
          longId = _ref$data.longChannelClaimId;
          shortId = _ref$data.shortChannelClaimId;
          _context.next = 25;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](11);
          _context.next = 24;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t0.message));

        case 24:
          return _context.abrupt("return", _context.sent);

        case 25:
          // store the request in the channel requests list
          channelKey = "c#".concat(channelName, "#").concat(longId);
          _context.next = 28;
          return (0, _effects.put)((0, _show.addRequestToRequestList)(requestId, null, channelKey));

        case 28:
          if (!state.channelList[channelKey]) {
            _context.next = 30;
            break;
          }

          return _context.abrupt("return", null);

        case 30:
          _context.prev = 30;
          _context.next = 33;
          return (0, _effects.call)(_channelApi.getChannelClaims, host, channelName, longId, 1);

        case 33:
          _ref2 = _context.sent;
          claimsData = _ref2.data;
          _context.next = 42;
          break;

        case 37:
          _context.prev = 37;
          _context.t1 = _context["catch"](30);
          _context.next = 41;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t1.message));

        case 41:
          return _context.abrupt("return", _context.sent);

        case 42:
          _context.next = 44;
          return (0, _effects.put)((0, _show.addNewChannelToChannelList)(channelKey, channelName, shortId, longId, claimsData));

        case 44:
          _context.next = 46;
          return (0, _effects.put)((0, _show.onRequestError)(null));

        case 46:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[11, 20], [30, 37]]);
}

function watchNewChannelRequest() {
  return regeneratorRuntime.wrap(function watchNewChannelRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(actions.CHANNEL_REQUEST_NEW, newChannelRequest);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

;

function getNewClaimsAndUpdateChannel(action) {
  var _action$data2, channelKey, name, longId, page, host, claimsData, _ref3;

  return regeneratorRuntime.wrap(function getNewClaimsAndUpdateChannel$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _action$data2 = action.data, channelKey = _action$data2.channelKey, name = _action$data2.name, longId = _action$data2.longId, page = _action$data2.page;
          _context3.next = 3;
          return (0, _effects.select)(_site.selectSiteHost);

        case 3:
          host = _context3.sent;
          _context3.prev = 4;
          _context3.next = 7;
          return (0, _effects.call)(_channelApi.getChannelClaims, host, name, longId, page);

        case 7:
          _ref3 = _context3.sent;
          claimsData = _ref3.data;
          _context3.next = 16;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](4);
          _context3.next = 15;
          return (0, _effects.put)((0, _show.onRequestError)(_context3.t0.message));

        case 15:
          return _context3.abrupt("return", _context3.sent);

        case 16:
          _context3.next = 18;
          return (0, _effects.put)((0, _show.updateChannelClaims)(channelKey, claimsData));

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[4, 11]]);
}

function watchUpdateChannelClaims() {
  return regeneratorRuntime.wrap(function watchUpdateChannelClaims$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeLatest)(actions.CHANNEL_CLAIMS_UPDATE_ASYNC, getNewClaimsAndUpdateChannel);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}