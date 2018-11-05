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
    thumbnail: defaultThumbnail,
  },
} = siteConfig;

export const createChannelMetaTags = (channel) => {
  const { name, shortId } = channel;
  const metaTags = {
    // page detail tags
    'og:title'           : `${name} on ${siteTitle}`,
    'twitter:title'      : `${name} on ${siteTitle}`,
    'og:description'     : `${name}, a channel on ${siteTitle}`,
    'twitter:description': `${name}, a channel on ${siteTitle}`,
    // url
    'og:url'             : `${host}/${createCanonicalLink({ channel })}`,
    // site info
    'og:site_name'       : siteTitle,
    'twitter:site'       : twitter,
    'fb:app_id'          : '1371961932852223',
    // card type tags
    'og:type'            : 'article',
    'twitter:card'       : 'summary_large_image',
    // image tags
    'og:image'           : defaultThumbnail,
    'og:image:width'     : 600,
    'og:image:height'    : 315,
    'og:image:type'      : determineContentTypeFromExtension(defaultThumbnail),
    'twitter:image'      : defaultThumbnail,
    'twitter:image:alt'  : 'Spee.ch Logo',
  };
  return createMetaTagsArray(metaTags);
};

export default createChannelMetaTags;
