import * as actions from 'constants/show_action_types';

// basic request parsing
export function updateRequestError (error) {
  return {
    type: actions.REQUEST_UPDATE_ERROR,
    data: error,
  };
}

export function updateRequestWithChannelRequest (name, id) {
  const requestId = `cr#${name}#${id}`;
  return {
    type: actions.REQUEST_UPDATE_CHANNEL,
    data: { requestId, name, id },
  };
};

export function updateRequestWithAssetRequest (name, id, channelName, channelId, extension) {
  const requestId = `ar#${name}#${id}#${channelName}#${channelId}`;
  return {
    type: actions.REQUEST_UPDATE_ASSET,
    data: {
      requestId,
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

// asset actions

export function newAssetRequest (id, name, modifier) {
  return {
    type: actions.ASSET_REQUEST_NEW,
    data: { id, name, modifier },
  };
};

export function addRequestToAssetRequests (id, error, name, claimId) {
  return {
    type: actions.ASSET_REQUEST_SUCCESS,
    data: { id, error, name, claimId },
  };
};

export function addAssetToAssetList (id, error, name, claimId, shortId, claimData) {
  return {
    type: actions.ASSET_ADD,
    data: { id, error, name, claimId, shortId, claimData },
  };
}

// channel actions

export function newChannelRequest (id, name, channelId) {
  return {
    type: actions.CHANNEL_REQUEST_NEW,
    data: {id, name, channelId},
  };
};

export function addRequestToChannelRequests (id, error, name, longId, shortId) {
  return {
    type: actions.CHANNEL_REQUEST_ADD,
    data: { id, error, name, longId, shortId },
  };
};

export function addNewChannelToChannelList (id, name, shortId, longId, claimsData) {
  return {
    type: actions.CHANNEL_ADD,
    data: { id, name, shortId, longId, claimsData },
  };
};

//  update channel data

export function updateChannelClaimsAsync (channelKey, name, longId, page) {
  return {
    type: actions.CHANNEL_CLAIMS_UPDATE_ASYNC,
    data: {channelKey, name, longId, page},
  };
};

export function updateChannelClaims (channelListId, claimsData) {
  return {
    type: actions.CHANNEL_CLAIMS_UPDATE_SUCCESS,
    data: {channelListId, claimsData},
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
