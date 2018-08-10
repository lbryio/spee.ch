import siteConfig from '@config/siteConfig.json';

const {
  details: {
    host,
  },
} = siteConfig;

const createBasicCanonicalLink = (page) => {
  return `${host}/${page}`;
};

const createAssetCanonicalLink = (asset) => {
  let channelName, certificateId, name, claimId;
  if (asset.claimData) {
    ({ channelName, certificateId, name, claimId } = asset.claimData);
  }
  if (channelName) {
    return `${host}/${channelName}:${certificateId}/${name}`;
  }
  return `${host}/${claimId}/${name}`;
};

const createChannelCanonicalLink = (channel) => {
  const { name, longId } = channel;
  return `${host}/${name}:${longId}`;
};

const createCanonicalLink = (asset, channel, page) => {
  if (asset) {
    return createAssetCanonicalLink(asset);
  }
  if (channel) {
    return createChannelCanonicalLink(channel);
  }
  return createBasicCanonicalLink(page);
};

export default createCanonicalLink;
