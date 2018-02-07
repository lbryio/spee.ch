import * as actions from 'constants/show_action_types';

export function updateRequestError (error) {
  return {
    type: actions.REQUEST_ERROR_UPDATE,
    data: error,
  };
}

export function updateRequestWithChannelRequest (name, id) {
  return {
    type: actions.REQUEST_CHANNEL_UPDATE,
    data: {
      name,
      id,
    },
  };
};

export function updateRequestWithAssetRequest (name, id, channelName, channelId, extension) {
  return {
    type: actions.REQUEST_CLAIM_UPDATE,
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

export function updateShowChannelError (error) {
  return {
    type: actions.SHOW_CHANNEL_ERROR,
    data: error,
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

export function updateShowAssetError (error) {
  return {
    type: actions.SHOW_ASSET_ERROR,
    data: error,
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

export function fileRequested (name, claimId) {
  return {
    type: actions.FILE_REQUESTED,
    data: {
      name,
      claimId,
    },
  };
};

export function updateFileAvailability (status) {
  return {
    type: actions.FILE_AVAILABILITY_UPDATE,
    data: status,
  };
};

export function updateDisplayAssetError (error) {
  return {
    type: actions.DISPLAY_ASSET_ERROR,
    data: error,
  };
};

// new

export function newAssetRequest (id, name, modifier) {
  return {
    type: actions.NEW_ASSET_REQUEST,
    data: { id, name, modifier },
  };
};

export function addAssetRequest (id, error, claimId) {
  return {
    type: actions.ASSET_REQUEST_ADD,
    data: { id, error, claimId },
  };
};

// export function addAsset (error, name, claimId, claimData, shortId, display) {
//   return {
//     type: actions.ASSET_ADD,
//     data: { error, name, claimId, claimData, shortId, display },
//   };
// };
