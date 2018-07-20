"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

var _determineContentTypeFromExtension = _interopRequireDefault(require("./determineContentTypeFromExtension.js"));

var _createMetaTagsArray = _interopRequireDefault(require("./createMetaTagsArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _siteConfig$details = _siteConfig.default.details,
    description = _siteConfig$details.description,
    host = _siteConfig$details.host,
    title = _siteConfig$details.title,
    twitter = _siteConfig$details.twitter,
    thumbnail = _siteConfig.default.assetDefaults.thumbnail;

var createBasicMetaTags = function createBasicMetaTags() {
  var metaTags = {
    // page details
    'og:title': title,
    'twitter:title': title,
    'og:description': description,
    'twitter:description': description,
    // url
    'og:url': host,
    // site id
    'og:site_name': title,
    'twitter:site': twitter,
    'fb:app_id': '1371961932852223',
    // card type
    'og:type': 'article',
    'twitter:card': 'summary_large_image',
    // image
    'og:image': thumbnail,
    'og:image:width': 600,
    'og:image:height': 315,
    'og:image:type': (0, _determineContentTypeFromExtension.default)(thumbnail),
    'twitter:image': thumbnail,
    'twitter:image:alt': 'Spee.ch Logo'
  };
  return (0, _createMetaTagsArray.default)(metaTags);
};

var _default = createBasicMetaTags;
exports.default = _default;