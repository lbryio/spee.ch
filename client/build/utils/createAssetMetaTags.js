"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

var _determineContentTypeFromExtension = _interopRequireDefault(require("./determineContentTypeFromExtension"));

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
  var videoEmbedUrl = "".concat(host, "/video-embed/").concat(claimData.name, "/").concat(claimData.claimId);
  var showUrl = "".concat(host, "/").concat(claimData.claimId, "/").concat(claimData.name);
  var source = "".concat(host, "/").concat(claimData.claimId, "/").concat(claimData.name, ".").concat(claimData.fileExt);
  var ogTitle = claimData.title || claimData.name;
  var ogDescription = claimData.description || defaultDescription;
  var ogThumbnailContentType = (0, _determineContentTypeFromExtension.default)(claimData.thumbnail);
  var ogThumbnail = claimData.thumbnail || defaultThumbnail;
  var metaTags = [// page details
  {
    property: 'og:title',
    content: ogTitle
  }, {
    property: 'twitter:title',
    content: ogTitle
  }, {
    property: 'og:description',
    content: ogDescription
  }, {
    property: 'twitter:description',
    content: ogDescription
  }, // url
  {
    property: 'og:url',
    content: showUrl
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
  }];

  if (determineMediaType(contentType) === VIDEO) {
    // card type tags
    metaTags.push({
      property: 'og:type',
      content: 'video.other'
    });
    metaTags.push({
      property: 'twitter:card',
      content: 'player'
    });
    metaTags.push({
      property: 'twitter:player',
      content: videoEmbedUrl
    });
    metaTags.push({
      property: 'twitter:player:width',
      content: 600
    });
    metaTags.push({
      property: 'twitter:text:player_width',
      content: 600
    });
    metaTags.push({
      property: 'twitter:player:height',
      content: 350
    });
    metaTags.push({
      property: 'twitter:player:stream',
      content: source
    });
    metaTags.push({
      property: 'twitter:player:stream:content_type',
      content: contentType
    }); // video tags

    metaTags.push({
      property: 'og:video',
      content: source
    });
    metaTags.push({
      property: 'og:video:secure_url',
      content: source
    });
    metaTags.push({
      property: 'og:video:type',
      content: contentType
    }); // image tags

    metaTags.push({
      property: 'og:image',
      content: ogThumbnail
    });
    metaTags.push({
      property: 'og:image:width',
      content: 600
    });
    metaTags.push({
      property: 'og:image:height',
      content: 315
    });
    metaTags.push({
      property: 'og:image:type',
      content: ogThumbnailContentType
    });
    metaTags.push({
      property: 'twitter:image',
      content: ogThumbnail
    });
  } else {
    // card type tags
    metaTags.push({
      property: 'og:type',
      content: 'article'
    });
    metaTags.push({
      property: 'twitter:card',
      content: 'summary_large_image'
    }); // image tags

    metaTags.push({
      property: 'og:image',
      content: source
    });
    metaTags.push({
      property: 'og:image',
      content: source
    });
    metaTags.push({
      property: 'og:image:width',
      content: 600
    });
    metaTags.push({
      property: 'og:image:height',
      content: 315
    });
    metaTags.push({
      property: 'og:image:type',
      content: contentType
    });
    metaTags.push({
      property: 'twitter:image',
      content: source
    });
  }

  return metaTags;
};

var _default = createAssetMetaTags;
exports.default = _default;