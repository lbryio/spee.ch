"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchUpdateChannelAvailability = watchUpdateChannelAvailability;

var _effects = require("redux-saga/effects");

var actions = _interopRequireWildcard(require("../constants/channel_create_action_types"));

var _channelApi = require("../api/channelApi");

var _channelCreate = require("../actions/channelCreate");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(updateChannelAvailability),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUpdateChannelAvailability);

function updateChannelAvailability(_ref) {
  var data, isAvailable, message, _ref2;

  return regeneratorRuntime.wrap(function updateChannelAvailability$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = _ref.data;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_channelApi.checkChannelAvailability, data);

        case 4:
          _ref2 = _context.sent;
          isAvailable = _ref2.data;
          message = _ref2.message;
          console.log('isAvailable:', isAvailable, 'message:', message);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.log('updateClaimAvailability error');

        case 13:
          if (isAvailable) {
            _context.next = 17;
            break;
          }

          _context.next = 16;
          return (0, _effects.put)((0, _channelCreate.updateChannelCreateName)('error', message));

        case 16:
          return _context.abrupt("return", _context.sent);

        case 17:
          _context.next = 19;
          return (0, _effects.put)((0, _channelCreate.updateChannelCreateName)('error', null));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[1, 10]]);
}

function watchUpdateChannelAvailability() {
  return regeneratorRuntime.wrap(function watchUpdateChannelAvailability$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(actions.CHANNEL_AVAILABILITY, updateChannelAvailability);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}