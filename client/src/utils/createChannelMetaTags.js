import siteConfig from '@config/siteConfig.json';
import determineContentTypeFromExtension from './determineContentTypeFromExtension';

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
  const { name, longId } = channel;
  return [
    // page detail tags
    {property: 'og:title', content: `${name} on ${siteTitle}`},
    {property: 'twitter:title', content: `${name} on ${siteTitle}`},
    {property: 'og:description', content: `${name}, a channel on ${siteTitle}`},
    {property: 'twitter:description', content: `${name}, a channel on ${siteTitle}`},
    // url
    {property: 'og:url', content: `${host}/${name}:${longId}`},
    // site info
    {property: 'og:site_name', content: siteTitle},
    {property: 'twitter:site', content: twitter},
    {property: 'fb:app_id', content: '1371961932852223'},
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

export default createChannelMetaTags;
