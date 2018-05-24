"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchChannelCreate = watchChannelCreate;

var _effects = require("redux-saga/effects");

var _channel_create_action_types = require("../constants/channel_create_action_types");

var _channelCreate = require("../selectors/channelCreate");

var _validate = require("../utils/validate");

var _channelCreate2 = require("../actions/channelCreate");

var _channelApi = require("../api/channelApi");

var _channel = require("../actions/channel");

var _publish = require("../actions/publish");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(createChannel),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchChannelCreate);

function createChannel() {
  var _ref, name, password, channelName, shortChannelId, channelClaimId, _ref2;

  return regeneratorRuntime.wrap(function createChannel$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(_channelCreate.selectChannelCreateState);

        case 2:
          _ref = _context.sent;
          name = _ref.name;
          password = _ref.password;
          _context.prev = 5;
          (0, _validate.validateCreateChannelNameInput)(name);
          _context.next = 14;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](5);
          _context.next = 13;
          return (0, _effects.put)((0, _channelCreate2.updateChannelCreateName)('error', _context.t0.message));

        case 13:
          return _context.abrupt("return", _context.sent);

        case 14:
          _context.prev = 14;
          (0, _validate.validateCreateChannelPasswordInput)(password);
          _context.next = 23;
          break;

        case 18:
          _context.prev = 18;
          _context.t1 = _context["catch"](14);
          _context.next = 22;
          return (0, _effects.put)((0, _channelCreate2.updateChannelCreatePassword)('error', _context.t1.message));

        case 22:
          return _context.abrupt("return", _context.sent);

        case 23:
          _context.next = 25;
          return (0, _effects.put)((0, _channelCreate2.updateChannelCreateStatus)('We are publishing your new channel.  Sit tight...'));

        case 25:
          _context.prev = 25;
          _context.next = 28;
          return (0, _effects.call)(_channelApi.makeCreateChannelRequest, name.value, password.value);

        case 28:
          _ref2 = _context.sent;
          channelName = _ref2.channelName;
          shortChannelId = _ref2.shortChannelId;
          channelClaimId = _ref2.channelClaimId;
          _context.next = 39;
          break;

        case 34:
          _context.prev = 34;
          _context.t2 = _context["catch"](25);
          _context.next = 38;
          return (0, _effects.put)((0, _channelCreate2.updateChannelCreateStatus)(_context.t2.message));

        case 38:
          return _context.abrupt("return", _context.sent);

        case 39:
          _context.next = 41;
          return (0, _effects.put)((0, _channelCreate2.updateChannelCreateStatus)(null));

        case 41:
          _context.next = 43;
          return (0, _effects.put)((0, _channel.updateLoggedInChannel)(channelName, shortChannelId, channelClaimId));

        case 43:
          _context.next = 45;
          return (0, _effects.put)((0, _publish.updateSelectedChannel)(channelName));

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[5, 9], [14, 18], [25, 34]]);
}

function watchChannelCreate() {
  return regeneratorRuntime.wrap(function watchChannelCreate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(_channel_create_action_types.CHANNEL_CREATE, createChannel);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}