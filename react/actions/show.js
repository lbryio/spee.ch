import * as actions from 'constants/show_action_types';

// basic request parsing
export function updateRequestError (error) {
  return {
    type: actions.REQUEST_ERROR_UPDATE,
    data: error,
  };
}

export function updateRequestWithChannelRequest (name, id) {
  return {
    type: actions.REQUEST_CHANNEL_UPDATE,
    data: { name, id },
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

// request for an asset

export function newAssetRequest (id, name, modifier) {
  return {
    type: actions.NEW_ASSET_REQUEST,
    data: { id, name, modifier },
  };
};

export function addAssetRequest (id, error, name, claimId) {
  return {
    type: actions.ASSET_REQUEST_ADD,
    data: { id, error, name, claimId },
  };
};

// show an asset

export function showNewAsset (id, name, claimId) {
  return {
    type: actions.SHOW_NEW_ASSET,
    data: { id, name, claimId },
  };
};

export function updateShowAsset (id, error, name, claimId, shortId, claimData) {
  return {
    type: actions.SHOW_ASSET_UPDATE,
    data: { id, error, name, claimId, shortId, claimData },
  };
};

export function clearShowAsset () {
  return {
    type: actions.SHOW_ASSET_CLEAR,
  };
};

// request for a channel


// show a channel

export function updateShowChannelError (error) {
  return {
    type: actions.SHOW_CHANNEL_ERROR,
    data: error,
  };
};

export function updateChannelData (name, longId, shortId) {
  return {
    type: actions.CHANNEL_DATA_UPDATE,
    data: { name, longId, shortId },
  };
};

export function updateChannelClaimsData (claims, currentPage, totalPages, totalClaims) {
  return {
    type: actions.CHANNEL_CLAIMS_DATA_UPDATE,
    data: { claims, currentPage, totalPages, totalClaims },
  };
};

// display a file

export function fileRequested (name, claimId) {
  return {
    type: actions.FILE_REQUESTED,
    data: { name, claimId },
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
