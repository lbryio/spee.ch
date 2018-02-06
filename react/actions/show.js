import * as actions from 'constants/show_action_types';

export function updateRequestWithChannelRequest (name, id) {
  return {
    type: actions.REQUEST_UPDATE_CHANNEL,
    data: {
      name,
      id,
    },
  };
};

export function updateRequestWithAssetRequest (name, id, channelName, channelId, extension) {
  return {
    type: actions.REQUEST_UPDATE_CLAIM,
    data: {
      name,
      modifier: {
        id,
        channel: {
          name: channelName,
          id  : channelId,
        },
      },
      extension,
    },
  };
};

export function updateChannelData (name, longId, shortId) {
  return {
    type: actions.CHANNEL_DATA_UPDATE,
    data: {
      name,
      longId,
      shortId,
    },
  };
};

export function updateChannelClaimsData (claims, currentPage, totalPages, totalClaims) {
  return {
    type: actions.CHANNEL_CLAIMS_DATA_UPDATE,
    data: {
      claims,
      currentPage,
      totalPages,
      totalClaims,
    },
  };
};

export function updateAssetClaimData (data, shortId) {
  return {
    type: actions.ASSET_CLAIM_DATA_UPDATE,
    data: {
      data,
      shortId,
    },
  };
};
