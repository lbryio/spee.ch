"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchChannelLogout = watchChannelLogout;

var _effects = require("redux-saga/effects");

var _channel_action_types = require("../constants/channel_action_types");

var _authApi = require("../api/authApi.js");

var _channel = require("../actions/channel");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(logoutChannelSaga),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchChannelLogout);

function logoutChannelSaga() {
  return regeneratorRuntime.wrap(function logoutChannelSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(_authApi.channelLogoutApi);

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", console.log(_context.t0));

        case 8:
          _context.next = 10;
          return (0, _effects.put)((0, _channel.updateLoggedInChannel)(null, null, null));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 5]]);
}

function watchChannelLogout() {
  return regeneratorRuntime.wrap(function watchChannelLogout$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(_channel_action_types.CHANNEL_LOGOUT, logoutChannelSaga);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}