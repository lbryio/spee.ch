export const buildURI = asset => {
  let channelName, certificateId, name, claimId;
  if (asset.claimData) {
    ({ channelName, certificateId, name, claimId } = asset.claimData);
  }
  if (channelName) {
    return `${channelName}:${certificateId}/${name}`;
  }
  return `${claimId}/${name}`;
};
