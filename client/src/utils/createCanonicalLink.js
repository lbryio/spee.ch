import siteConfig from '@config/siteConfig.json';

const {
  details: {
    host,
  },
} = siteConfig;

const createBasicCanonicalLink = (absolute, page) => {
  return `${absolute ? host : ''}/${page}`;
};

const createAssetCanonicalLink = (absolute, asset) => {
  let channelName, channelShortId, name, claimId;
  if (asset.claimData) {
    ({ channelName, channelShortId, name, claimId } = asset.claimData);
  }
  if (channelName) {
    return `${absolute ? host : ''}/${channelName}:${channelShortId}/${name}`;
  }
  return `${absolute ? host : ''}/${claimId}/${name}`;
};

const createChannelCanonicalLink = (absolute, channel) => {
  const { name, longId, shortId } = channel;
  return `${absolute ? host : ''}/${name}:${shortId ? shortId : longId}`;
};

const createCanonicalLink = ({asset, channel, page, absolute = false}) => {
  if (asset) {
    return createAssetCanonicalLink(absolute, asset);
  }
  if (channel) {
    return createChannelCanonicalLink(absolute, channel);
  }
  return createBasicCanonicalLink(absolute, page);
};

export default createCanonicalLink;
