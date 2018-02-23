const { site: { host } } = require('../../config/speechConfig.js');

export const createBasicCanonicalLink = (page) => {
  if (!page) {
    return `${host}`;
  };
  return `${host}/${page}`;
};

export const createAssetCanonicalLink = (asset) => {
  let channelName, certificateId, name, claimId;
  if (asset.claimData) {
    ({ channelName, certificateId, name, claimId } = asset.claimData);
  };
  if (channelName) {
    return `${host}/${channelName}:${certificateId}/${name}`;
  };
  return `${host}/${claimId}/${name}`;
};

export const createChannelCanonicalLink = (channel) => {
  const { name, longId } = channel;
  return `${host}/${name}:${longId}`;
};
