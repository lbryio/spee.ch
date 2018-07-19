const determineContentTypeFromExtension = require('./determineContentTypeFromExtension.js');

const createBasicMetaTags = ({siteHost, siteDescription, siteTitle, siteTwitter, defaultThumbnail}) => {
  return [
    // page details
    {property: 'og:title', content: siteTitle},
    {property: 'twitter:title', content: siteTitle},
    {property: 'og:description', content: siteDescription},
    {property: 'twitter:description', content: siteDescription},
    // url
    {property: 'og:url', content: siteHost},
    // site id
    {property: 'og:site_name', content: siteTitle},
    {property: 'twitter:site', content: siteTwitter},
    {property: 'fb:app_id', content: '1371961932852223'},
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

module.exports = createBasicMetaTags;
