"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchUpdateClaimAvailability = watchUpdateClaimAvailability;

var _effects = require("redux-saga/effects");

var actions = _interopRequireWildcard(require("../constants/publish_action_types"));

var _publish = require("../actions/publish");

var _assetApi = require("../api/assetApi");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(updateClaimAvailability),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUpdateClaimAvailability);

function updateClaimAvailability(_ref) {
  var data, isAvailable, message, _ref2;

  return regeneratorRuntime.wrap(function updateClaimAvailability$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = _ref.data;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_assetApi.checkClaimAvailability, data);

        case 4:
          _ref2 = _context.sent;
          isAvailable = _ref2.data;
          message = _ref2.message;
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", console.log(_context.t0));

        case 12:
          if (isAvailable) {
            _context.next = 16;
            break;
          }

          _context.next = 15;
          return (0, _effects.put)((0, _publish.updateError)('url', message));

        case 15:
          return _context.abrupt("return", _context.sent);

        case 16:
          _context.next = 18;
          return (0, _effects.put)((0, _publish.updateError)('url', null));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[1, 9]]);
}

function watchUpdateClaimAvailability() {
  return regeneratorRuntime.wrap(function watchUpdateClaimAvailability$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(actions.CLAIM_AVAILABILITY, updateClaimAvailability);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}