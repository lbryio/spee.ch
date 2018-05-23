"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchFileIsRequested = watchFileIsRequested;

var _effects = require("redux-saga/effects");

var actions = _interopRequireWildcard(require("../constants/show_action_types"));

var _show = require("../actions/show");

var _asset_display_states = require("../constants/asset_display_states");

var _fileApi = require("../api/fileApi");

var _site = require("../selectors/site");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(retrieveFile),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFileIsRequested);

function retrieveFile(action) {
  var name, claimId, host, isAvailable, _ref;

  return regeneratorRuntime.wrap(function retrieveFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = action.data.name;
          claimId = action.data.claimId;
          _context.next = 4;
          return (0, _effects.select)(_site.selectSiteHost);

        case 4:
          host = _context.sent;
          _context.prev = 5;
          _context.next = 8;
          return (0, _effects.call)(_fileApi.checkFileAvailability, claimId, host, name);

        case 8:
          _ref = _context.sent;
          isAvailable = _ref.data;
          _context.next = 17;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          _context.next = 16;
          return (0, _effects.put)((0, _show.updateDisplayAssetError)(_context.t0.message));

        case 16:
          return _context.abrupt("return", _context.sent);

        case 17:
          ;

          if (!isAvailable) {
            _context.next = 24;
            break;
          }

          _context.next = 21;
          return (0, _effects.put)((0, _show.updateDisplayAssetError)(null));

        case 21:
          _context.next = 23;
          return (0, _effects.put)((0, _show.updateFileAvailability)(_asset_display_states.AVAILABLE));

        case 23:
          return _context.abrupt("return", _context.sent);

        case 24:
          _context.next = 26;
          return (0, _effects.put)((0, _show.updateFileAvailability)(_asset_display_states.UNAVAILABLE));

        case 26:
          _context.prev = 26;
          _context.next = 29;
          return (0, _effects.call)(_fileApi.triggerClaimGet, claimId, host, name);

        case 29:
          _context.next = 36;
          break;

        case 31:
          _context.prev = 31;
          _context.t1 = _context["catch"](26);
          _context.next = 35;
          return (0, _effects.put)((0, _show.updateDisplayAssetError)(_context.t1.message));

        case 35:
          return _context.abrupt("return", _context.sent);

        case 36:
          ;
          _context.next = 39;
          return (0, _effects.put)((0, _show.updateFileAvailability)(_asset_display_states.AVAILABLE));

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[5, 12], [26, 31]]);
}

;

function watchFileIsRequested() {
  return regeneratorRuntime.wrap(function watchFileIsRequested$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(actions.FILE_REQUESTED, retrieveFile);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

;