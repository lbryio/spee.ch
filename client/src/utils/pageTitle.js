export const createPageTitle = (siteTitle, pageTitle) => {
  if (!pageTitle) {
    return `${siteTitle}`;
  }
  return `${siteTitle} - ${pageTitle}`;
};
