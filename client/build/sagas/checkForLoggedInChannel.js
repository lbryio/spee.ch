"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchChannelLoginCheck = watchChannelLoginCheck;

var _effects = require("redux-saga/effects");

var _channel_action_types = require("../constants/channel_action_types");

var _authApi = require("../api/authApi.js");

var _publish = require("../actions/publish");

var _channel = require("../actions/channel");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(checkForLoggedInChannelSaga),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchChannelLoginCheck);

function checkForLoggedInChannelSaga() {
  var response, _response, _response$data, channelName, shortChannelId, channelClaimId;

  return regeneratorRuntime.wrap(function checkForLoggedInChannelSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(_authApi.checkForLoggedInChannelApi);

        case 3:
          response = _context.sent;
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", console.log(_context.t0));

        case 9:
          if (!response.data) {
            _context.next = 15;
            break;
          }

          _response = response, _response$data = _response.data, channelName = _response$data.channelName, shortChannelId = _response$data.shortChannelId, channelClaimId = _response$data.channelClaimId;
          _context.next = 13;
          return (0, _effects.put)((0, _publish.updateSelectedChannel)(channelName));

        case 13:
          _context.next = 15;
          return (0, _effects.put)((0, _channel.updateLoggedInChannel)(channelName, shortChannelId, channelClaimId));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 6]]);
}

function watchChannelLoginCheck() {
  return regeneratorRuntime.wrap(function watchChannelLoginCheck$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(_channel_action_types.CHANNEL_LOGIN_CHECK, checkForLoggedInChannelSaga);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}