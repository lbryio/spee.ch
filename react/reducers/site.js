const siteConfig = require('../../config/siteConfig.js');

const {
  details: { title, host },
  assetDefaults: { thumbnail: defaultThumbnail },
} = siteConfig;

const initialState = {
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
