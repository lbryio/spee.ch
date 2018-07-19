const determineContentTypeFromExtension = require('determineContentTypeFromExtension.js');

const VIDEO = 'VIDEO';
const IMAGE = 'IMAGE';
const GIF = 'GIF';

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
  const metaTags = [
    // page details
    {property: 'og:title', content: ogTitle},
    {property: 'twitter:title', content: ogTitle},
    {property: 'og:description', content: ogDescription},
    {property: 'twitter:description', content: ogDescription},
    // url
    {property: 'og:url', content: showUrl},
    // site info
    {property: 'og:site_name', content: siteTitle},
    {property: 'twitter:site', content: siteTwitter},
    {property: 'fb:app_id', content: '1371961932852223'},
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

module.exports = createAssetMetaTags;
