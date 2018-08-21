import * as actions from '../constants/publish_action_types';

// export action creators
export function selectFile (file) {
  return {
    type: actions.FILE_SELECTED,
    data: file,
  };
}

export function clearFile () {
  return {
    type: actions.FILE_CLEAR,
  };
}

export function setUpdateTrue () {
  return {
    type: actions.SET_UPDATE_TRUE,
  };
}

export function updateMetadata (name, value) {
  return {
    type: actions.METADATA_UPDATE,
    data: {
      name,
      value,
    },
  };
}

export function updateClaim (value) {
  return {
    type: actions.CLAIM_UPDATE,
    data: value,
  };
};

export function abandonClaim (data) {
  return {
    type: actions.ABANDON_CLAIM,
    data,
  };
};

export function setPublishInChannel (channel) {
  return {
    type: actions.SET_PUBLISH_IN_CHANNEL,
    channel,
  };
}

export function updatePublishStatus (status, message) {
  return {
    type: actions.PUBLISH_STATUS_UPDATE,
    data: {
      status,
      message,
    },
  };
}

export function updateError (name, value) {
  return {
    type: actions.ERROR_UPDATE,
    data: {
      name,
      value,
    },
  };
}

export function updateSelectedChannel (channelName) {
  return {
    type: actions.SELECTED_CHANNEL_UPDATE,
    data: channelName,
  };
}

export function toggleMetadataInputs (showMetadataInputs) {
  return {
    type: actions.TOGGLE_METADATA_INPUTS,
    data: showMetadataInputs,
  };
}

export function onNewThumbnail (file) {
  return {
    type: actions.THUMBNAIL_NEW,
    data: file,
  };
}

export function startPublish (history) {
  return {
    type: actions.PUBLISH_START,
    data: { history },
  };
}

export function validateClaim (claim) {
  return {
    type: actions.CLAIM_AVAILABILITY,
    data: claim,
  };
}
