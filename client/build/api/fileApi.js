"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkFileAvailability = checkFileAvailability;
exports.triggerClaimGet = triggerClaimGet;

var _request = _interopRequireDefault(require("../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkFileAvailability(claimId, host, name) {
  var url = "".concat(host, "/api/file/availability/").concat(name, "/").concat(claimId);
  return (0, _request.default)(url);
}

function triggerClaimGet(claimId, host, name) {
  var url = "".concat(host, "/api/claim/get/").concat(name, "/").concat(claimId);
  return (0, _request.default)(url);
}