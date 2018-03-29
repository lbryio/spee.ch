const siteConfig = require('siteConfig.js');

const {
  analytics: {
    googleId: googleAnalyticsId,
  },
  assetDefaults: {
    thumbnail: defaultThumbnail,
    description: defaultDescription,
  },
  details: {
    description,
    host,
    title,
    twitter,
  },
} = siteConfig;

const initialState = {
  description,
  googleAnalyticsId,
  host,
  title,
  twitter,
  defaultDescription,
  defaultThumbnail,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
