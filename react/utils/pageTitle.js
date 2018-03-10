const { details: { title: siteTitle } } = require('../../config/siteConfig.js');

export const createPageTitle = (pageTitle) => {
  if (!pageTitle) {
    return `${siteTitle}`;
  }
  return `${siteTitle} - ${pageTitle}`;
};
