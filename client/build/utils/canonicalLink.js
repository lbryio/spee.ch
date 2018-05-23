"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCanonicalLink = void 0;

var createBasicCanonicalLink = function createBasicCanonicalLink(page, siteHost) {
  return "".concat(siteHost, "/").concat(page);
};

var createAssetCanonicalLink = function createAssetCanonicalLink(asset, siteHost) {
  var channelName, certificateId, name, claimId;

  if (asset.claimData) {
    var _asset$claimData = asset.claimData;
    channelName = _asset$claimData.channelName;
    certificateId = _asset$claimData.certificateId;
    name = _asset$claimData.name;
    claimId = _asset$claimData.claimId;
  }

  ;

  if (channelName) {
    return "".concat(siteHost, "/").concat(channelName, ":").concat(certificateId, "/").concat(name);
  }

  ;
  return "".concat(siteHost, "/").concat(claimId, "/").concat(name);
};

var createChannelCanonicalLink = function createChannelCanonicalLink(channel, siteHost) {
  var name = channel.name,
      longId = channel.longId;
  return "".concat(siteHost, "/").concat(name, ":").concat(longId);
};

var createCanonicalLink = function createCanonicalLink(asset, channel, page, siteHost) {
  if (asset) {
    return createAssetCanonicalLink(asset, siteHost);
  }

  if (channel) {
    return createChannelCanonicalLink(channel, siteHost);
  }

  return createBasicCanonicalLink(page, siteHost);
};

exports.createCanonicalLink = createCanonicalLink;