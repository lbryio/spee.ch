"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createChannelMetaTags = void 0;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

var _determineContentTypeFromExtension = _interopRequireDefault(require("./determineContentTypeFromExtension"));

var _createMetaTagsArray = _interopRequireDefault(require("./createMetaTagsArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _siteConfig$details = _siteConfig.default.details,
    host = _siteConfig$details.host,
    siteTitle = _siteConfig$details.title,
    twitter = _siteConfig$details.twitter,
    defaultThumbnail = _siteConfig.default.assetDefaults.thumbnail;

var createChannelMetaTags = function createChannelMetaTags(channel) {
  var name = channel.name,
      longId = channel.longId;
  var metaTags = {
    // page detail tags
    'og:title': "".concat(name, " on ").concat(siteTitle),
    'twitter:title': "".concat(name, " on ").concat(siteTitle),
    'og:description': "".concat(name, ", a channel on ").concat(siteTitle),
    'twitter:description': "".concat(name, ", a channel on ").concat(siteTitle),
    // url
    'og:url': "".concat(host, "/").concat(name, ":").concat(longId),
    // site info
    'og:site_name': siteTitle,
    'twitter:site': twitter,
    'fb:app_id': '1371961932852223',
    // card type tags
    'og:type': 'article',
    'twitter:card': 'summary_large_image',
    // image tags
    'og:image': defaultThumbnail,
    'og:image:width': 600,
    'og:image:height': 315,
    'og:image:type': (0, _determineContentTypeFromExtension.default)(defaultThumbnail),
    'twitter:image': defaultThumbnail,
    'twitter:image:alt': 'Spee.ch Logo'
  };
  return (0, _createMetaTagsArray.default)(metaTags);
};

exports.createChannelMetaTags = createChannelMetaTags;
var _default = createChannelMetaTags;
exports.default = _default;