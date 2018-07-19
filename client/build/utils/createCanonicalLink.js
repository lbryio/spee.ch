"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var host = _siteConfig.default.details.host;

var createBasicCanonicalLink = function createBasicCanonicalLink(page) {
  return "".concat(host, "/").concat(page);
};

var createAssetCanonicalLink = function createAssetCanonicalLink(asset) {
  var channelName, certificateId, name, claimId;

  if (asset.claimData) {
    var _asset$claimData = asset.claimData;
    channelName = _asset$claimData.channelName;
    certificateId = _asset$claimData.certificateId;
    name = _asset$claimData.name;
    claimId = _asset$claimData.claimId;
  }

  if (channelName) {
    return "".concat(host, "/").concat(channelName, ":").concat(certificateId, "/").concat(name);
  }

  return "".concat(host, "/").concat(claimId, "/").concat(name);
};

var createChannelCanonicalLink = function createChannelCanonicalLink(channel) {
  var name = channel.name,
      longId = channel.longId;
  return "".concat(host, "/").concat(name, ":").concat(longId);
};

var createCanonicalLink = function createCanonicalLink(asset, channel, page) {
  if (asset) {
    return createAssetCanonicalLink(asset);
  }

  if (channel) {
    return createChannelCanonicalLink(channel);
  }

  return createBasicCanonicalLink(page);
};

var _default = createCanonicalLink;
exports.default = _default;