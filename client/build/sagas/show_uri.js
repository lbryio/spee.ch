"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = require("redux-saga/effects");

var actions = _interopRequireWildcard(require("../constants/show_action_types"));

var _show = require("../actions/show");

var _show_asset = require("../sagas/show_asset");

var _show_channel = require("../sagas/show_channel");

var _lbryUri = _interopRequireDefault(require("../utils/lbryUri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(parseAndUpdateIdentifierAndClaim),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(parseAndUpdateClaimOnly),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(handleShowPageUri),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(watchHandleShowPageUri);

function parseAndUpdateIdentifierAndClaim(modifier, claim) {
  var isChannel, channelName, channelClaimId, claimId, claimName, extension, _lbryUri$parseIdentif, _lbryUri$parseClaim;

  return regeneratorRuntime.wrap(function parseAndUpdateIdentifierAndClaim$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _lbryUri$parseIdentif = _lbryUri.default.parseIdentifier(modifier);
          isChannel = _lbryUri$parseIdentif.isChannel;
          channelName = _lbryUri$parseIdentif.channelName;
          channelClaimId = _lbryUri$parseIdentif.channelClaimId;
          claimId = _lbryUri$parseIdentif.claimId;
          _lbryUri$parseClaim = _lbryUri.default.parseClaim(claim);
          claimName = _lbryUri$parseClaim.claimName;
          extension = _lbryUri$parseClaim.extension;
          _context.next = 16;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          _context.next = 15;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t0.message));

        case 15:
          return _context.abrupt("return", _context.sent);

        case 16:
          if (!isChannel) {
            _context.next = 20;
            break;
          }

          _context.next = 19;
          return (0, _effects.call)(_show_asset.newAssetRequest, (0, _show.onNewAssetRequest)(claimName, null, channelName, channelClaimId, extension));

        case 19:
          return _context.abrupt("return", _context.sent);

        case 20:
          ;
          _context.next = 23;
          return (0, _effects.call)(_show_asset.newAssetRequest, (0, _show.onNewAssetRequest)(claimName, claimId, null, null, extension));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 11]]);
}

function parseAndUpdateClaimOnly(claim) {
  var isChannel, channelName, channelClaimId, _lbryUri$parseIdentif2, claimName, extension, _lbryUri$parseClaim2;

  return regeneratorRuntime.wrap(function parseAndUpdateClaimOnly$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _lbryUri$parseIdentif2 = _lbryUri.default.parseIdentifier(claim);
          isChannel = _lbryUri$parseIdentif2.isChannel;
          channelName = _lbryUri$parseIdentif2.channelName;
          channelClaimId = _lbryUri$parseIdentif2.channelClaimId;
          _context2.next = 12;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 11;
          return (0, _effects.put)((0, _show.onRequestError)(_context2.t0.message));

        case 11:
          return _context2.abrupt("return", _context2.sent);

        case 12:
          if (!isChannel) {
            _context2.next = 16;
            break;
          }

          _context2.next = 15;
          return (0, _effects.call)(_show_channel.newChannelRequest, (0, _show.onNewChannelRequest)(channelName, channelClaimId));

        case 15:
          return _context2.abrupt("return", _context2.sent);

        case 16:
          _context2.prev = 16;
          _lbryUri$parseClaim2 = _lbryUri.default.parseClaim(claim);
          claimName = _lbryUri$parseClaim2.claimName;
          extension = _lbryUri$parseClaim2.extension;
          _context2.next = 27;
          break;

        case 22:
          _context2.prev = 22;
          _context2.t1 = _context2["catch"](16);
          _context2.next = 26;
          return (0, _effects.put)((0, _show.onRequestError)(_context2.t1.message));

        case 26:
          return _context2.abrupt("return", _context2.sent);

        case 27:
          _context2.next = 29;
          return (0, _effects.call)(_show_asset.newAssetRequest, (0, _show.onNewAssetRequest)(claimName, null, null, null, extension));

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 7], [16, 22]]);
}

function handleShowPageUri(action) {
  var _action$data, identifier, claim;

  return regeneratorRuntime.wrap(function handleShowPageUri$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _action$data = action.data, identifier = _action$data.identifier, claim = _action$data.claim;

          if (!identifier) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return (0, _effects.call)(parseAndUpdateIdentifierAndClaim, identifier, claim);

        case 4:
          return _context3.abrupt("return", _context3.sent);

        case 5:
          _context3.next = 7;
          return (0, _effects.call)(parseAndUpdateClaimOnly, claim);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

;

function watchHandleShowPageUri() {
  return regeneratorRuntime.wrap(function watchHandleShowPageUri$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeLatest)(actions.HANDLE_SHOW_URI, handleShowPageUri);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

;