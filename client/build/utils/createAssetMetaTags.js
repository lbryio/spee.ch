"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

var _determineContentTypeFromExtension = _interopRequireDefault(require("./determineContentTypeFromExtension"));

var _createMetaTagsArray = _interopRequireDefault(require("./createMetaTagsArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _siteConfig$details = _siteConfig.default.details,
    host = _siteConfig$details.host,
    siteTitle = _siteConfig$details.title,
    twitter = _siteConfig$details.twitter,
    _siteConfig$assetDefa = _siteConfig.default.assetDefaults,
    defaultDescription = _siteConfig$assetDefa.description,
    defaultThumbnail = _siteConfig$assetDefa.thumbnail;
var VIDEO = 'VIDEO';
var IMAGE = 'IMAGE';
var GIF = 'GIF';

var determineMediaType = function determineMediaType(contentType) {
  switch (contentType) {
    case 'image/jpg':
    case 'image/jpeg':
    case 'image/png':
      return IMAGE;

    case 'image/gif':
      return GIF;

    case 'video/mp4':
    case 'video/webm':
      return VIDEO;

    default:
      return '';
  }
};

var createAssetMetaTags = function createAssetMetaTags(asset) {
  var claimData = asset.claimData;
  var contentType = claimData.contentType;
  var showUrl = "".concat(host, "/").concat(claimData.claimId, "/").concat(claimData.name);
  var serveUrl = "".concat(host, "/").concat(claimData.claimId, "/").concat(claimData.name, ".").concat(claimData.fileExt);
  var ogTitle = claimData.title || claimData.name;
  var ogDescription = claimData.description || defaultDescription;
  var ogThumbnailContentType = (0, _determineContentTypeFromExtension.default)(claimData.thumbnail);
  var ogThumbnail = claimData.thumbnail || defaultThumbnail; // {property: 'og:title'] = ogTitle},

  var metaTags = {
    'og:title': ogTitle,
    'twitter:title': ogTitle,
    'og:description': ogDescription,
    'twitter:description': ogDescription,
    'og:url': showUrl,
    'og:site_name': siteTitle,
    'twitter:site': twitter,
    'fb:app_id': '1371961932852223'
  };

  if (determineMediaType(contentType) === VIDEO) {
    var videoEmbedUrl = "".concat(host, "/video-embed/").concat(claimData.name, "/").concat(claimData.claimId); // card type tags

    metaTags['og:type'] = 'video.other';
    metaTags['twitter:card'] = 'player';
    metaTags['twitter:player'] = videoEmbedUrl;
    metaTags['twitter:player:width'] = 600;
    metaTags['twitter:text:player_width'] = 600;
    metaTags['twitter:player:height'] = 350;
    metaTags['twitter:player:stream'] = serveUrl;
    metaTags['twitter:player:stream:content_type'] = contentType; // video tags

    metaTags['og:video'] = serveUrl;
    metaTags['og:video:secure_url'] = serveUrl;
    metaTags['og:video:type'] = contentType; // image tags

    metaTags['og:image'] = ogThumbnail;
    metaTags['og:image:width'] = 600;
    metaTags['og:image:height'] = 315;
    metaTags['og:image:type'] = ogThumbnailContentType;
    metaTags['twitter:image'] = ogThumbnail;
  } else {
    // card type tags
    metaTags['og:type'] = 'article';
    metaTags['twitter:card'] = 'summary_large_image'; // image tags

    metaTags['og:image'] = serveUrl;
    metaTags['og:image'] = serveUrl;
    metaTags['og:image:width'] = 600;
    metaTags['og:image:height'] = 315;
    metaTags['og:image:type'] = contentType;
    metaTags['twitter:image'] = serveUrl;
  }

  return (0, _createMetaTagsArray.default)(metaTags);
};

var _default = createAssetMetaTags;
exports.default = _default;