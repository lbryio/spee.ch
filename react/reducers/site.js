const siteConfig = require('../../config/siteConfig.js');

const {
  analytics: { googleId: googleAnalyticsId },
  assetDefaults: { thumbnail: defaultThumbnail },
  details: { title, host },
} = siteConfig;

const initialState = {
  googleAnalyticsId,
  host,
  title,
  defaults: {
    defaultThumbnail,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
