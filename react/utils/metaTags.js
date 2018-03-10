const { details: { title, host, description }, assetDefaults: { thumbnail: defaultThumbnail, description: defaultDescription } } = require('../../config/siteConfig.js');

const determineOgThumbnailContentType = (thumbnail) => {
  if (thumbnail) {
    const fileExt = thumbnail.substring(thumbnail.lastIndexOf('.'));
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

const createBasicMetaTags = () => {
  return [
    {property: 'og:title', content: title},
    {property: 'og:url', content: host},
    {property: 'og:site_name', content: title},
    {property: 'og:description', content: description},
    {property: 'twitter:site', content: '@spee_ch'},
    {property: 'twitter:card', content: 'summary'},
  ];
};

const createChannelMetaTags = (channel) => {
  const { name, longId } = channel;
  return [
    {property: 'og:title', content: `${name} on ${title}`},
    {property: 'og:url', content: `${host}/${name}:${longId}`},
    {property: 'og:site_name', content: title},
    {property: 'og:description', content: `${name}, a channel on ${title}`},
    {property: 'twitter:site', content: '@spee_ch'},
    {property: 'twitter:card', content: 'summary'},
  ];
};

const createAssetMetaTags = (asset) => {
  const { claimData } = asset;
  const { contentType } = claimData;
  const embedUrl = `${host}/${claimData.claimId}/${claimData.name}`;
  const showUrl = `${host}/${claimData.claimId}/${claimData.name}`;
  const source = `${host}/${claimData.claimId}/${claimData.name}.${claimData.fileExt}`;
  const ogTitle = claimData.title || claimData.name;
  const ogDescription = claimData.description || defaultDescription;
  const ogThumbnailContentType = determineOgThumbnailContentType(claimData.thumbnail);
  const ogThumbnail = claimData.thumbnail || defaultThumbnail;
  const metaTags = [
    {property: 'og:title', content: ogTitle},
    {property: 'og:url', content: showUrl},
    {property: 'og:site_name', content: title},
    {property: 'og:description', content: ogDescription},
    {property: 'og:image:width', content: 600},
    {property: 'og:image:height', content: 315},
    {property: 'twitter:site', content: '@spee_ch'},
  ];
  if (contentType === 'video/mp4' || contentType === 'video/webm') {
    metaTags.push({property: 'og:video', content: source});
    metaTags.push({property: 'og:video:secure_url', content: source});
    metaTags.push({property: 'og:video:type', content: contentType});
    metaTags.push({property: 'og:image', content: ogThumbnail});
    metaTags.push({property: 'og:image:type', content: ogThumbnailContentType});
    metaTags.push({property: 'og:type', content: 'video'});
    metaTags.push({property: 'twitter:card', content: 'player'});
    metaTags.push({property: 'twitter:player', content: embedUrl});
    metaTags.push({property: 'twitter:player:width', content: 600});
    metaTags.push({property: 'twitter:text:player_width', content: 600});
    metaTags.push({property: 'twitter:player:height', content: 337});
    metaTags.push({property: 'twitter:player:stream', content: source});
    metaTags.push({property: 'twitter:player:stream:content_type', content: contentType});
  } else {
    metaTags.push({property: 'og:image', content: source});
    metaTags.push({property: 'og:image:type', content: contentType});
    metaTags.push({property: 'og:type', content: 'article'});
    metaTags.push({property: 'twitter:card', content: 'summary_large_image'});
  }
  return metaTags;
};

export const createMetaTags = (asset, channel) => {
  if (asset) {
    return createAssetMetaTags(asset);
  };
  if (channel) {
    return createChannelMetaTags(channel);
  };
  return createBasicMetaTags();
};
