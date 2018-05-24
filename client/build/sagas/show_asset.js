"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = require("redux-saga/effects");

var actions = _interopRequireWildcard(require("../constants/show_action_types"));

var _show = require("../actions/show");

var _assetApi = require("../api/assetApi");

var _show2 = require("../selectors/show");

var _site = require("../selectors/site");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(newAssetRequest),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchNewAssetRequest);

function newAssetRequest(action) {
  var _action$data, requestType, requestId, name, modifier, state, host, longId, _ref, assetKey, shortId, _ref2, claimData, _ref3;

  return regeneratorRuntime.wrap(function newAssetRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _action$data = action.data, requestType = _action$data.requestType, requestId = _action$data.requestId, name = _action$data.name, modifier = _action$data.modifier; // put an action to update the request in redux

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
          return (0, _effects.call)(_assetApi.getLongClaimId, host, name, modifier);

        case 14:
          _ref = _context.sent;
          longId = _ref.data;
          _context.next = 23;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](11);
          _context.next = 22;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t0.message));

        case 22:
          return _context.abrupt("return", _context.sent);

        case 23:
          assetKey = "a#".concat(name, "#").concat(longId);
          _context.next = 26;
          return (0, _effects.put)((0, _show.addRequestToRequestList)(requestId, null, assetKey));

        case 26:
          if (!state.assetList[assetKey]) {
            _context.next = 28;
            break;
          }

          return _context.abrupt("return", null);

        case 28:
          _context.prev = 28;
          _context.next = 31;
          return (0, _effects.call)(_assetApi.getShortId, host, name, longId);

        case 31:
          _ref2 = _context.sent;
          shortId = _ref2.data;
          _context.next = 40;
          break;

        case 35:
          _context.prev = 35;
          _context.t1 = _context["catch"](28);
          _context.next = 39;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t1.message));

        case 39:
          return _context.abrupt("return", _context.sent);

        case 40:
          _context.prev = 40;
          _context.next = 43;
          return (0, _effects.call)(_assetApi.getClaimData, host, name, longId);

        case 43:
          _ref3 = _context.sent;
          claimData = _ref3.data;
          _context.next = 52;
          break;

        case 47:
          _context.prev = 47;
          _context.t2 = _context["catch"](40);
          _context.next = 51;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t2.message));

        case 51:
          return _context.abrupt("return", _context.sent);

        case 52:
          _context.next = 54;
          return (0, _effects.put)((0, _show.addAssetToAssetList)(assetKey, null, name, longId, shortId, claimData));

        case 54:
          _context.next = 56;
          return (0, _effects.put)((0, _show.onRequestError)(null));

        case 56:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[11, 18], [28, 35], [40, 47]]);
}

;

function watchNewAssetRequest() {
  return regeneratorRuntime.wrap(function watchNewAssetRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(actions.ASSET_REQUEST_NEW, newAssetRequest);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

;