"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetaTags = void 0;

var createAssetMetaTags = require('createAssetMetaTags.js');

var createChannelMetaTags = require('createChannelMetaTags.js');

var createBasicMetaTags = require('createBasicMetaTags.js');

var createMetaTags = function createMetaTags(_ref) {
  var asset = _ref.asset,
      channel = _ref.channel;

  if (asset) {
    return createAssetMetaTags(asset);
  }

  if (channel) {
    return createChannelMetaTags(channel);
  }

  return createBasicMetaTags();
};

exports.createMetaTags = createMetaTags;