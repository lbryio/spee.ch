const { details: { host }, assetDefaults: { thumbnail: defaultThumbnail } } = require('../../config/siteConfig.js');

const initialState = {
  host,
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
