"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForLoggedInChannelApi = checkForLoggedInChannelApi;
exports.channelLogoutApi = channelLogoutApi;

var _request = _interopRequireDefault(require("../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkForLoggedInChannelApi() {
  var url = "/user";
  var params = {
    credentials: 'include'
  };
  return (0, _request.default)(url, params);
}

function channelLogoutApi() {
  var url = "/logout";
  var params = {
    credentials: 'include'
  };
  return (0, _request.default)(url, params);
}