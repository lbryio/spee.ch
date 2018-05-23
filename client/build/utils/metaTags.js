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

var createBasicMetaTags = function createBasicMetaTags(siteHost, siteDescription, siteTitle, siteTwitter) {
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
    content: 'summary'
  }];
};

var createChannelMetaTags = function createChannelMetaTags(siteTitle, siteHost, siteTwitter, channel) {
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

var createAssetMetaTags = function createAssetMetaTags(siteHost, siteTitle, siteTwitter, asset, defaultDescription, defaultThumbnail) {
  var claimData = asset.claimData;
  var contentType = claimData.contentType;
  var embedUrl = "".concat(siteHost, "/").concat(claimData.claimId, "/").concat(claimData.name);
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
      content: 'video'
    });
    metaTags.push({
      property: 'twitter:card',
      content: 'player'
    });
    metaTags.push({
      property: 'twitter:player',
      content: embedUrl
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

var createMetaTags = function createMetaTags(siteDescription, siteHost, siteTitle, siteTwitter, asset, channel, defaultDescription, defaultThumbnail) {
  if (asset) {
    return createAssetMetaTags(siteHost, siteTitle, siteTwitter, asset, defaultDescription, defaultThumbnail);
  }

  ;

  if (channel) {
    return createChannelMetaTags(siteHost, siteTitle, siteTwitter, channel);
  }

  ;
  return createBasicMetaTags(siteDescription, siteHost, siteTitle, siteTwitter);
};

exports.createMetaTags = createMetaTags;