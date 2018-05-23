"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelData = getChannelData;
exports.getChannelClaims = getChannelClaims;
exports.checkChannelAvailability = checkChannelAvailability;
exports.makeCreateChannelRequest = makeCreateChannelRequest;

var _request = _interopRequireDefault(require("../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChannelData(host, name, id) {
  if (!id) id = 'none';
  var url = "".concat(host, "/api/channel/data/").concat(name, "/").concat(id);
  return (0, _request.default)(url);
}

function getChannelClaims(host, name, longId, page) {
  if (!page) page = 1;
  var url = "".concat(host, "/api/channel/claims/").concat(name, "/").concat(longId, "/").concat(page);
  return (0, _request.default)(url);
}

function checkChannelAvailability(channel) {
  var url = "/api/channel/availability/".concat(channel);
  return (0, _request.default)(url);
}

function makeCreateChannelRequest(username, password) {
  var params = {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  };
  return (0, _request.default)('/signup', params);
}