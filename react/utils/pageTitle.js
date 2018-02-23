const { site: { title: siteTitle } } = require('../../config/speechConfig.js');

export const createPageTitle = (pageTitle) => {
  if (!pageTitle) {
    return `${siteTitle}`;
  }
  return `${siteTitle} - ${pageTitle}`;
};
