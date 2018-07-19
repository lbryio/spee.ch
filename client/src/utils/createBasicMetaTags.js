import siteConfig from '@config/siteConfig.json';
import determineContentTypeFromExtension from './determineContentTypeFromExtension.js';

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
  return [
    // page details
    {property: 'og:title', content: title},
    {property: 'twitter:title', content: title},
    {property: 'og:description', content: description},
    {property: 'twitter:description', content: description},
    // url
    {property: 'og:url', content: host},
    // site id
    {property: 'og:site_name', content: title},
    {property: 'twitter:site', content: twitter},
    {property: 'fb:app_id', content: '1371961932852223'},
    // card type
    {property: 'og:type', content: 'article'},
    {property: 'twitter:card', content: 'summary_large_image'},
    // image
    {property: 'og:image', content: thumbnail},
    {property: 'og:image:width', content: 600},
    {property: 'og:image:height', content: 315},
    {property: 'og:image:type', content: determineContentTypeFromExtension(thumbnail)},
    {property: 'twitter:image', content: thumbnail},
    {property: 'twitter:image:alt', content: 'Spee.ch Logo'},
  ];
};

export default createBasicMetaTags;
