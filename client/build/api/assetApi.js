"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongClaimId = getLongClaimId;
exports.getShortId = getShortId;
exports.getClaimData = getClaimData;
exports.checkClaimAvailability = checkClaimAvailability;

var _request = _interopRequireDefault(require("../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLongClaimId(host, name, modifier) {
  var body = {}; // create request params

  if (modifier) {
    if (modifier.id) {
      body['claimId'] = modifier.id;
    } else {
      body['channelName'] = modifier.channel.name;
      body['channelClaimId'] = modifier.channel.id;
    }
  }

  body['claimName'] = name;
  var params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }; // create url

  var url = "".concat(host, "/api/claim/long-id"); // return the request promise

  return (0, _request.default)(url, params);
}

;

function getShortId(host, name, claimId) {
  var url = "".concat(host, "/api/claim/short-id/").concat(claimId, "/").concat(name);
  return (0, _request.default)(url);
}

;

function getClaimData(host, name, claimId) {
  var url = "".concat(host, "/api/claim/data/").concat(name, "/").concat(claimId);
  return (0, _request.default)(url);
}

;

function checkClaimAvailability(claim) {
  var url = "/api/claim/availability/".concat(claim);
  return (0, _request.default)(url);
}