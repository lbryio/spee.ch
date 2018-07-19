"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

var _determineContentTypeFromExtension = _interopRequireDefault(require("./determineContentTypeFromExtension.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _siteConfig$details = _siteConfig.default.details,
    description = _siteConfig$details.description,
    host = _siteConfig$details.host,
    title = _siteConfig$details.title,
    twitter = _siteConfig$details.twitter,
    thumbnail = _siteConfig.default.assetDefaults.thumbnail;

var createBasicMetaTags = function createBasicMetaTags() {
  return [// page details
  {
    property: 'og:title',
    content: title
  }, {
    property: 'twitter:title',
    content: title
  }, {
    property: 'og:description',
    content: description
  }, {
    property: 'twitter:description',
    content: description
  }, // url
  {
    property: 'og:url',
    content: host
  }, // site id
  {
    property: 'og:site_name',
    content: title
  }, {
    property: 'twitter:site',
    content: twitter
  }, {
    property: 'fb:app_id',
    content: '1371961932852223'
  }, // card type
  {
    property: 'og:type',
    content: 'article'
  }, {
    property: 'twitter:card',
    content: 'summary_large_image'
  }, // image
  {
    property: 'og:image',
    content: thumbnail
  }, {
    property: 'og:image:width',
    content: 600
  }, {
    property: 'og:image:height',
    content: 315
  }, {
    property: 'og:image:type',
    content: (0, _determineContentTypeFromExtension.default)(thumbnail)
  }, {
    property: 'twitter:image',
    content: thumbnail
  }, {
    property: 'twitter:image:alt',
    content: 'Spee.ch Logo'
  }];
};

var _default = createBasicMetaTags;
exports.default = _default;