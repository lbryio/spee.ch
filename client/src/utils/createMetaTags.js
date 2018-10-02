import createAssetMetaTags from './createAssetMetaTags';
import createChannelMetaTags from './createChannelMetaTags.js';
import createBasicMetaTags from './createBasicMetaTags.js';

const createMetaTags = ({ asset, channel }) => {
  if (asset) {
    return createAssetMetaTags(asset);
  }
  if (channel) {
    return createChannelMetaTags(channel);
  }
  return createBasicMetaTags();
};

export default createMetaTags;
