const VIDEO = 'VIDEO';
const IMAGE = 'IMAGE';
const GIF = 'GIF';

const determineContentTypeFromExtension = (thumbnail) => {
  if (thumbnail) {
    const fileExt = thumbnail.substring(thumbnail.lastIndexOf('.'));
    switch (fileExt) {
      case 'jpeg':
      case 'jpg':
        return 'image/jpg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'mp4':
        return 'video/mp4';
      default:
        return '';
    }
  }
  return '';
};

const determineMediaType = (contentType) => {
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

const createBasicMetaTags = ({siteHost, siteDescription, siteTitle, siteTwitter, defaultThumbnail}) => {
  return [
    // page details
    {property: 'og:title', content: siteTitle},
    {property: 'twitter:title', content: siteTitle},
    {property: 'og:url', content: siteHost},
    {property: 'og:site_name', content: siteTitle},
    {property: 'og:description', content: siteDescription},
    {property: 'twitter:description', content: siteDescription},
    {property: 'twitter:site', content: siteTwitter},
    // card type
    {property: 'og:type', content: 'article'},
    {property: 'twitter:card', content: 'summary_large_image'},
    // image
    {property: 'og:image', content: defaultThumbnail},
    {property: 'og:image:width', content: 600},
    {property: 'og:image:height', content: 315},
    {property: 'og:image:type', content: determineContentTypeFromExtension(defaultThumbnail)},
    {property: 'twitter:image', content: defaultThumbnail},
    {property: 'twitter:image:alt', content: 'Spee.ch Logo'},
  ];
};

const createChannelMetaTags = ({siteHost, siteTitle, siteTwitter, channel, defaultThumbnail}) => {
  const { name, longId } = channel;
  return [
    // page detail tags
    {property: 'og:title', content: `${name} on ${siteTitle}`},
    {property: 'twitter:title', content: `${name} on ${siteTitle}`},
    {property: 'og:url', content: `${siteHost}/${name}:${longId}`},
    {property: 'og:site_name', content: siteTitle},
    {property: 'og:description', content: `${name}, a channel on ${siteTitle}`},
    {property: 'twitter:site', content: siteTwitter},
    // card type tags
    {property: 'og:type', content: 'article'},
    {property: 'twitter:card', content: 'summary_large_image'},
    // image tags
    {property: 'og:image', content: defaultThumbnail},
    {property: 'og:image:width', content: 600},
    {property: 'og:image:height', content: 315},
    {property: 'og:image:type', content: determineContentTypeFromExtension(defaultThumbnail)},
    {property: 'twitter:image', content: defaultThumbnail},
    {property: 'twitter:image:alt', content: 'Spee.ch Logo'},
  ];
};

const createAssetMetaTags = ({siteHost, siteTitle, siteTwitter, asset, defaultDescription, defaultThumbnail}) => {
  const { claimData } = asset;
  const { contentType } = claimData;
  const videoEmbedUrl = `${siteHost}/video-embed/${claimData.name}/${claimData.claimId}`;
  const showUrl = `${siteHost}/${claimData.claimId}/${claimData.name}`;
  const source = `${siteHost}/${claimData.claimId}/${claimData.name}.${claimData.fileExt}`;
  const ogTitle = claimData.title || claimData.name;
  const ogDescription = claimData.description || defaultDescription;
  const ogThumbnailContentType = determineContentTypeFromExtension(claimData.thumbnail);
  const ogThumbnail = claimData.thumbnail || defaultThumbnail;
  // page details
  const metaTags = [
    {property: 'og:title', content: ogTitle},
    {property: 'twitter:title', content: ogTitle},
    {property: 'og:url', content: showUrl},
    {property: 'og:site_name', content: siteTitle},
    {property: 'twitter:site', content: siteTwitter},
    {property: 'og:description', content: ogDescription},
    {property: 'twitter:description', content: ogDescription},
  ];
  if (determineMediaType(contentType) === VIDEO) {
    // card type tags
    metaTags.push({property: 'og:type', content: 'video.other'});
    metaTags.push({property: 'twitter:card', content: 'player'});
    metaTags.push({property: 'twitter:player', content: videoEmbedUrl});
    metaTags.push({property: 'twitter:player:width', content: 600});
    metaTags.push({property: 'twitter:text:player_width', content: 600});
    metaTags.push({property: 'twitter:player:height', content: 350});
    metaTags.push({property: 'twitter:player:stream', content: source});
    metaTags.push({property: 'twitter:player:stream:content_type', content: contentType});
    // video tags
    metaTags.push({property: 'og:video', content: source});
    metaTags.push({property: 'og:video:secure_url', content: source});
    metaTags.push({property: 'og:video:type', content: contentType});
    // image tags
    metaTags.push({property: 'og:image', content: ogThumbnail});
    metaTags.push({property: 'og:image:width', content: 600});
    metaTags.push({property: 'og:image:height', content: 315});
    metaTags.push({property: 'og:image:type', content: ogThumbnailContentType});
    metaTags.push({property: 'twitter:image', content: ogThumbnail});
  } else {
    // card type tags
    metaTags.push({property: 'og:type', content: 'article'});
    metaTags.push({property: 'twitter:card', content: 'summary_large_image'});
    // image tags
    metaTags.push({property: 'og:image', content: source});
    metaTags.push({property: 'og:image', content: source});
    metaTags.push({property: 'og:image:width', content: 600});
    metaTags.push({property: 'og:image:height', content: 315});
    metaTags.push({property: 'og:image:type', content: contentType});
    metaTags.push({property: 'twitter:image', content: source});
  }
  return metaTags;
};

export const createMetaTags = ({ siteDescription, siteHost, siteTitle, siteTwitter, asset, channel, defaultDescription, defaultThumbnail }) => {
  if (asset) {
    return createAssetMetaTags({
      siteHost,
      siteTitle,
      siteTwitter,
      asset,
      defaultDescription,
      defaultThumbnail,
    });
  }
  if (channel) {
    return createChannelMetaTags({
      siteHost,
      siteTitle,
      siteTwitter,
      channel,
      defaultThumbnail,
    });
  }
  return createBasicMetaTags({
    siteDescription,
    siteHost,
    siteTitle,
    siteTwitter,
    defaultThumbnail,
  });
};
