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
