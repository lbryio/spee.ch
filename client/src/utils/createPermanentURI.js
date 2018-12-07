/*
{ channelName, certificateId, name, claimId } = { claimData } = asset

permanentUrl for a channel
@channelName#certificateId

permanentUrl for an asset in a channel
@channelName#certificateId/name

permanentUrl for an asset published anonymously
name#claimId
*/

export const createPermanentURI = asset => {
  let channelName, certificateId, name, claimId;
  if (asset.claimData) {
    ({ channelName, certificateId, name, claimId } = asset.claimData);
  }
  else return 'Error: unknown asset at createPermanentURI.js';
  if (channelName) {
    return `${channelName}#${certificateId}/${name}`;
  }
  return `${name}#${claimId}`;
};
