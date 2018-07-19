const createAssetMetaTags = require('createAssetMetaTags.js');
const createChannelMetaTags = require('createChannelMetaTags.js');
const createBasicMetaTags = require('createBasicMetaTags.js');

export const createMetaTags = ({ siteDescription, siteHost, siteTitle, siteTwitter, asset, channel, defaultDescription, defaultThumbnail }) => {
  if (asset) {
    return createAssetMetaTags({
      siteHost,
      siteTitle,
      siteTwitter,
      asset,
      defaultDescription,
      defaultThumbnail,
    });
  }
  if (channel) {
    return createChannelMetaTags({
      siteHost,
      siteTitle,
      siteTwitter,
      channel,
      defaultThumbnail,
    });
  }
  return createBasicMetaTags({
    siteDescription,
    siteHost,
    siteTitle,
    siteTwitter,
    defaultThumbnail,
  });
};
