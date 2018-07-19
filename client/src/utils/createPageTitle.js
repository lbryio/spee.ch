import siteConfig from '@config/siteConfig.json';

const {
  details: {
    title: siteTitle,
  },
} = siteConfig;

const createPageTitle = (pageTitle) => {
  if (!pageTitle) {
    return `${siteTitle}`;
  }
  return `${siteTitle} - ${pageTitle}`;
};

export default createPageTitle;
