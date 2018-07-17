"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetaTags = void 0;

var determineOgThumbnailContentType = function determineOgThumbnailContentType(thumbnail) {
  if (thumbnail) {
    var fileExt = thumbnail.substring(thumbnail.lastIndexOf('.'));

    switch (fileExt) {
      case 'jpeg':
      case 'jpg':
        return 'image/jpeg';

      case 'png':
        return 'image/png';

      case 'gif':
        return 'image/gif';

      case 'mp4':
        return 'video/mp4';

      default:
        return 'image/jpeg';
    }
  }

  return '';
};

var createBasicMetaTags = function createBasicMetaTags(_ref) {
  var siteHost = _ref.siteHost,
      siteDescription = _ref.siteDescription,
      siteTitle = _ref.siteTitle,
      siteTwitter = _ref.siteTwitter,
      defaultThumbnail = _ref.defaultThumbnail;
  return [{
    property: 'og:title',
    content: siteTitle
  }, {
    property: 'og:url',
    content: siteHost
  }, {
    property: 'og:site_name',
    content: siteTitle
  }, {
    property: 'og:description',
    content: siteDescription
  }, {
    property: 'twitter:site',
    content: siteTwitter
  }, {
    property: 'twitter:card',
    content: 'summary_large_image'
  }, {
    property: 'og:image',
    content: defaultThumbnail
  }, {
    property: 'og:image:type',
    content: 'image/jpeg'
  }];
};

var createChannelMetaTags = function createChannelMetaTags(_ref2) {
  var siteHost = _ref2.siteHost,
      siteTitle = _ref2.siteTitle,
      siteTwitter = _ref2.siteTwitter,
      channel = _ref2.channel;
  var name = channel.name,
      longId = channel.longId;
  return [{
    property: 'og:title',
    content: "".concat(name, " on ").concat(siteTitle)
  }, {
    property: 'og:url',
    content: "".concat(siteHost, "/").concat(name, ":").concat(longId)
  }, {
    property: 'og:site_name',
    content: siteTitle
  }, {
    property: 'og:description',
    content: "".concat(name, ", a channel on ").concat(siteTitle)
  }, {
    property: 'twitter:site',
    content: siteTwitter
  }, {
    property: 'twitter:card',
    content: 'summary'
  }];
};

var createAssetMetaTags = function createAssetMetaTags(_ref3) {
  var siteHost = _ref3.siteHost,
      siteTitle = _ref3.siteTitle,
      siteTwitter = _ref3.siteTwitter,
      asset = _ref3.asset,
      defaultDescription = _ref3.defaultDescription,
      defaultThumbnail = _ref3.defaultThumbnail;
  var claimData = asset.claimData;
  var contentType = claimData.contentType;
  var videoEmbedUrl = "".concat(siteHost, "/video-embed/").concat(claimData.name, "/").concat(claimData.claimId);
  var showUrl = "".concat(siteHost, "/").concat(claimData.claimId, "/").concat(claimData.name);
  var source = "".concat(siteHost, "/").concat(claimData.claimId, "/").concat(claimData.name, ".").concat(claimData.fileExt);
  var ogTitle = claimData.title || claimData.name;
  var ogDescription = claimData.description || defaultDescription;
  var ogThumbnailContentType = determineOgThumbnailContentType(claimData.thumbnail);
  var ogThumbnail = claimData.thumbnail || defaultThumbnail;
  var metaTags = [{
    property: 'og:title',
    content: ogTitle
  }, {
    property: 'og:url',
    content: showUrl
  }, {
    property: 'og:site_name',
    content: siteTitle
  }, {
    property: 'og:description',
    content: ogDescription
  }, {
    property: 'og:image:width',
    content: 600
  }, {
    property: 'og:image:height',
    content: 315
  }, {
    property: 'twitter:site',
    content: siteTwitter
  }];

  if (contentType === 'video/mp4' || contentType === 'video/webm') {
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
    });
    metaTags.push({
      property: 'og:image',
      content: ogThumbnail
    });
    metaTags.push({
      property: 'og:image:type',
      content: ogThumbnailContentType
    });
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
      content: 337
    });
    metaTags.push({
      property: 'twitter:player:stream',
      content: source
    });
    metaTags.push({
      property: 'twitter:player:stream:content_type',
      content: contentType
    });
  } else {
    metaTags.push({
      property: 'og:image',
      content: source
    });
    metaTags.push({
      property: 'og:image:type',
      content: contentType
    });
    metaTags.push({
      property: 'og:type',
      content: 'article'
    });
    metaTags.push({
      property: 'twitter:card',
      content: 'summary_large_image'
    });
  }

  return metaTags;
};

var createMetaTags = function createMetaTags(_ref4) {
  var siteDescription = _ref4.siteDescription,
      siteHost = _ref4.siteHost,
      siteTitle = _ref4.siteTitle,
      siteTwitter = _ref4.siteTwitter,
      asset = _ref4.asset,
      channel = _ref4.channel,
      defaultDescription = _ref4.defaultDescription,
      defaultThumbnail = _ref4.defaultThumbnail;

  if (asset) {
    return createAssetMetaTags({
      siteHost: siteHost,
      siteTitle: siteTitle,
      siteTwitter: siteTwitter,
      asset: asset,
      defaultDescription: defaultDescription,
      defaultThumbnail: defaultThumbnail
    });
  }

  if (channel) {
    return createChannelMetaTags({
      siteHost: siteHost,
      siteTitle: siteTitle,
      siteTwitter: siteTwitter,
      channel: channel
    });
  }

  return createBasicMetaTags({
    siteDescription: siteDescription,
    siteHost: siteHost,
    siteTitle: siteTitle,
    siteTwitter: siteTwitter,
    defaultThumbnail: defaultThumbnail
  });
};

exports.createMetaTags = createMetaTags;