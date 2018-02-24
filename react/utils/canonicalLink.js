const { site: { host } } = require('../../config/speechConfig.js');

const createBasicCanonicalLink = (page) => {
  if (!page) {
    return `${host}`;
  };
  return `${host}/${page}`;
};

const createAssetCanonicalLink = (asset) => {
  let channelName, certificateId, name, claimId;
  if (asset.claimData) {
    ({ channelName, certificateId, name, claimId } = asset.claimData);
  };
  if (channelName) {
    return `${host}/${channelName}:${certificateId}/${name}`;
  };
  return `${host}/${claimId}/${name}`;
};

const createChannelCanonicalLink = (channel) => {
  const { name, longId } = channel;
  return `${host}/${name}:${longId}`;
};

export const createCanonicalLink = (asset, channel, page) => {
  if (asset) {
    return createAssetCanonicalLink(asset);
  }
  if (channel) {
    return createChannelCanonicalLink(channel);
  }
  if (page) {
    return createBasicCanonicalLink(page);
  }
  return createBasicCanonicalLink();
};
