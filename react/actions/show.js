import * as actions from 'constants/show_action_types';
// export action creators

export function updateRequestWithChannelRequest (name, id) {
  return {
    type: actions.REQUEST_UPDATE_CHANNEL,
    name,
    id,
  };
};

export function updateRequestWithAssetRequest (name, id, channelName, channelId, extension) {
  return {
    type       : actions.REQUEST_UPDATE_CLAIM,
    name,
    id,
    channelName: null,
    channelId  : null,
    extension,
  };
};

export function updateChannelData (name, longId, shortId) {
  return {
    type: actions.CHANNEL_DATA_UPDATE,
    name,
    longId,
    shortId,
  };
};

export function updateChannelClaimsData (claims, currentPage, totalPages, totalClaims) {
  return {
    type: actions.CHANNEL_CLAIMS_DATA_UPDATE,
    claims,
    currentPage,
    totalPages,
    totalClaims,
  };
};

export function updateAssetData (data) {
  return {
    type: actions.ASSET_DATA_UPDATE,
    data,
  };
};
