"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createChannelMetaTags = void 0;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

var _determineContentTypeFromExtension = _interopRequireDefault(require("./determineContentTypeFromExtension"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _siteConfig$details = _siteConfig.default.details,
    host = _siteConfig$details.host,
    siteTitle = _siteConfig$details.title,
    twitter = _siteConfig$details.twitter,
    defaultThumbnail = _siteConfig.default.assetDefaults.thumbnail;

var createChannelMetaTags = function createChannelMetaTags(channel) {
  var name = channel.name,
      longId = channel.longId;
  return [// page detail tags
  {
    property: 'og:title',
    content: "".concat(name, " on ").concat(siteTitle)
  }, {
    property: 'twitter:title',
    content: "".concat(name, " on ").concat(siteTitle)
  }, {
    property: 'og:description',
    content: "".concat(name, ", a channel on ").concat(siteTitle)
  }, {
    property: 'twitter:description',
    content: "".concat(name, ", a channel on ").concat(siteTitle)
  }, // url
  {
    property: 'og:url',
    content: "".concat(host, "/").concat(name, ":").concat(longId)
  }, // site info
  {
    property: 'og:site_name',
    content: siteTitle
  }, {
    property: 'twitter:site',
    content: twitter
  }, {
    property: 'fb:app_id',
    content: '1371961932852223'
  }, // card type tags
  {
    property: 'og:type',
    content: 'article'
  }, {
    property: 'twitter:card',
    content: 'summary_large_image'
  }, // image tags
  {
    property: 'og:image',
    content: defaultThumbnail
  }, {
    property: 'og:image:width',
    content: 600
  }, {
    property: 'og:image:height',
    content: 315
  }, {
    property: 'og:image:type',
    content: (0, _determineContentTypeFromExtension.default)(defaultThumbnail)
  }, {
    property: 'twitter:image',
    content: defaultThumbnail
  }, {
    property: 'twitter:image:alt',
    content: 'Spee.ch Logo'
  }];
};

exports.createChannelMetaTags = createChannelMetaTags;
var _default = createChannelMetaTags;
exports.default = _default;