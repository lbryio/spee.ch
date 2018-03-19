const createBasicCanonicalLink = (page, siteHost) => {
  return `${siteHost}/${page}`;
};

const createAssetCanonicalLink = (asset, siteHost) => {
  let channelName, certificateId, name, claimId;
  if (asset.claimData) {
    ({ channelName, certificateId, name, claimId } = asset.claimData);
  };
  if (channelName) {
    return `${siteHost}/${channelName}:${certificateId}/${name}`;
  };
  return `${siteHost}/${claimId}/${name}`;
};

const createChannelCanonicalLink = (channel, siteHost) => {
  const { name, longId } = channel;
  return `${siteHost}/${name}:${longId}`;
};

export const createCanonicalLink = (asset, channel, page, siteHost) => {
  if (asset) {
    return createAssetCanonicalLink(asset, siteHost);
  }
  if (channel) {
    return createChannelCanonicalLink(channel, siteHost);
  }
  return createBasicCanonicalLink(page, siteHost);
};
