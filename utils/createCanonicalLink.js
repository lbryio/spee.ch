const createBasicCanonicalLink = (page) => {
  return `/${page}`;
};

const createAssetCanonicalLink = (asset) => {
  let channelName, channelShortId, name, claimId;
  if (asset.claimData) {
    ({ channelName, channelShortId, name, claimId } = asset.claimData);
  }
  if (channelName) {
    return `/${channelName}:${channelShortId}/${name}`;
  }
  return `/${claimId}/${name}`;
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
