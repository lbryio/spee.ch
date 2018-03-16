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

const createBasicMetaTags = (siteHost, siteDescription, siteTitle, siteTwitter) => {
  return [
    {property: 'og:title', content: siteTitle},
    {property: 'og:url', content: siteHost},
    {property: 'og:site_name', content: siteTitle},
    {property: 'og:description', content: siteDescription},
    {property: 'twitter:site', content: siteTwitter},
    {property: 'twitter:card', content: 'summary'},
  ];
};

const createChannelMetaTags = (siteTitle, siteHost, siteTwitter, channel) => {
  const { name, longId } = channel;
  return [
    {property: 'og:title', content: `${name} on ${siteTitle}`},
    {property: 'og:url', content: `${siteHost}/${name}:${longId}`},
    {property: 'og:site_name', content: siteTitle},
    {property: 'og:description', content: `${name}, a channel on ${siteTitle}`},
    {property: 'twitter:site', content: siteTwitter},
    {property: 'twitter:card', content: 'summary'},
  ];
};

const createAssetMetaTags = (siteHost, siteTitle, siteTwitter, asset, defaultDescription, defaultThumbnail) => {
  const { claimData } = asset;
  const { contentType } = claimData;
  const embedUrl = `${siteHost}/${claimData.claimId}/${claimData.name}`;
  const showUrl = `${siteHost}/${claimData.claimId}/${claimData.name}`;
  const source = `${siteHost}/${claimData.claimId}/${claimData.name}.${claimData.fileExt}`;
  const ogTitle = claimData.title || claimData.name;
  const ogDescription = claimData.description || defaultDescription;
  const ogThumbnailContentType = determineOgThumbnailContentType(claimData.thumbnail);
  const ogThumbnail = claimData.thumbnail || defaultThumbnail;
  const metaTags = [
    {property: 'og:title', content: ogTitle},
    {property: 'og:url', content: showUrl},
    {property: 'og:site_name', content: siteTitle},
    {property: 'og:description', content: ogDescription},
    {property: 'og:image:width', content: 600},
    {property: 'og:image:height', content: 315},
    {property: 'twitter:site', content: siteTwitter},
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

export const createMetaTags = (siteDescription, siteHost, siteTitle, siteTwitter, asset, channel, defaultDescription, defaultThumbnail) => {
  if (asset) {
    return createAssetMetaTags(siteHost, siteTitle, siteTwitter, asset, defaultDescription, defaultThumbnail);
  };
  if (channel) {
    return createChannelMetaTags(siteHost, siteTitle, siteTwitter, channel);
  };
  return createBasicMetaTags(siteDescription, siteHost, siteTitle, siteTwitter);
};
