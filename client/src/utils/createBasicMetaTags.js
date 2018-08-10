import siteConfig from '@config/siteConfig.json';
import determineContentTypeFromExtension from './determineContentTypeFromExtension.js';
import createMetaTagsArray from './createMetaTagsArray';

const {
  details: {
    description,
    host,
    title,
    twitter,
  },
  assetDefaults: {
    thumbnail,
  },
} = siteConfig;

const createBasicMetaTags = () => {
  const metaTags = {
    // page details
    'og:title'           : title,
    'twitter:title'      : title,
    'og:description'     : description,
    'twitter:description': description,
    // url
    'og:url'             : host,
    // site id
    'og:site_name'       : title,
    'twitter:site'       : twitter,
    'fb:app_id'          : '1371961932852223',
    // card type
    'og:type'            : 'article',
    'twitter:card'       : 'summary_large_image',
    // image
    'og:image'           : thumbnail,
    'og:image:width'     : 600,
    'og:image:height'    : 315,
    'og:image:type'      : determineContentTypeFromExtension(thumbnail),
    'twitter:image'      : thumbnail,
    'twitter:image:alt'  : 'Spee.ch Logo',
  };
  return createMetaTagsArray(metaTags);
};

export default createBasicMetaTags;
