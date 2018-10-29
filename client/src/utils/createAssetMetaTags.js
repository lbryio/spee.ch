import siteConfig from '@config/siteConfig.json';
import determineContentTypeFromExtension from './determineContentTypeFromExtension';
import createMetaTagsArray from './createMetaTagsArray';
import createCanonicalLink from '../../../utils/createCanonicalLink';

const {
  details: {
    host,
    title: siteTitle,
    twitter,
  },
  assetDefaults: {
    description: defaultDescription,
    thumbnail: defaultThumbnail,
  },
} = siteConfig;

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

const createAssetMetaTags = (asset) => {
  const { claimData } = asset;
  const { contentType } = claimData;
  const canonicalLink = createCanonicalLink({asset});
  const showUrl = `${host}${canonicalLink}`;
  const serveUrl = `${showUrl}.${claimData.fileExt}`;

  const ogTitle = claimData.title || claimData.name;
  const ogDescription = claimData.description || defaultDescription;
  const ogThumbnailContentType = determineContentTypeFromExtension(claimData.thumbnail);
  const ogThumbnail = claimData.thumbnail || defaultThumbnail;
  // {property: 'og:title'] = ogTitle},
  const metaTags = {
    'og:title'           : ogTitle,
    'twitter:title'      : ogTitle,
    'og:description'     : ogDescription,
    'twitter:description': ogDescription,
    'og:url'             : showUrl,
    'og:site_name'       : siteTitle,
    'twitter:site'       : twitter,
    'fb:app_id'          : '1371961932852223',
  };
  if (determineMediaType(contentType) === VIDEO) {
    const videoEmbedUrl = `${host}/video-embed/${canonicalLink}`;
    // card type tags
    metaTags['og:type'] = 'video.other';
    metaTags['twitter:card'] = 'player';
    metaTags['twitter:player'] = videoEmbedUrl;
    metaTags['twitter:player:width'] = 600;
    metaTags['twitter:text:player_width'] = 600;
    metaTags['twitter:player:height'] = 350;
    metaTags['twitter:player:stream'] = serveUrl;
    metaTags['twitter:player:stream:content_type'] = contentType;
    // video tags
    metaTags['og:video'] = serveUrl;
    metaTags['og:video:secure_url'] = serveUrl;
    metaTags['og:video:type'] = contentType;
    // image tags
    metaTags['og:image'] = ogThumbnail;
    metaTags['og:image:width'] = 600;
    metaTags['og:image:height'] = 315;
    metaTags['og:image:type'] = ogThumbnailContentType;
    metaTags['twitter:image'] = ogThumbnail;
  } else {
    // card type tags
    metaTags['og:type'] = 'article';
    metaTags['twitter:card'] = 'summary_large_image';
    // image tags
    metaTags['og:image'] = serveUrl;
    metaTags['og:image'] = serveUrl;
    metaTags['og:image:width'] = 600;
    metaTags['og:image:height'] = 315;
    metaTags['og:image:type'] = contentType;
    metaTags['twitter:image'] = serveUrl;
  }
  return createMetaTagsArray(metaTags);
};

export default createAssetMetaTags;
