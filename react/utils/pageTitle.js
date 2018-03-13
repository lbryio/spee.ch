const { details: { title } } = require('../../config/siteConfig.js');

export const createPageTitle = (pageTitle) => {
  if (!pageTitle) {
    return `${title}`;
  }
  return `${title} - ${pageTitle}`;
};
