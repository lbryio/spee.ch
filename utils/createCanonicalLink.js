const createBasicCanonicalLink = (page) => {
  return `/${page}`;
};

const createAssetCanonicalLink = (asset) => {
  const { channelName, channelShortId, name, claimId, shortId } = asset;
  return channelName ? `/${channelName}:${channelShortId}/${name}` : `/${shortId || claimId}/${name}`;
};

const createChannelCanonicalLink = (channel) => {
  const { name, shortId } = channel;
  return `/${name}:${shortId}`;
};

const createCanonicalLink = ({asset, channel, page}) => {
  if (asset) {
    return createAssetCanonicalLink(asset);
  }
  if (channel) {
    return createChannelCanonicalLink(channel);
  }
  return createBasicCanonicalLink(page);
};

module.exports = createCanonicalLink;
