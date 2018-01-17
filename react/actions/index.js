import * as actions from 'constants/action_types';

// export action creators
export function selectFile (file) {
  return {
    type: actions.FILE_SELECTED,
    file: file,
  };
};

export function clearFile () {
  return {
    type: actions.FILE_CLEAR,
  };
};

export function updateMetadata (name, value) {
  return {
    type: actions.METADATA_UPDATE,
    name,
    value,
  };
};

export function updateClaim (value) {
  return {
    type: actions.CLAIM_UPDATE,
    value,
  };
};

export function updateLoggedInChannel (name, shortId, longId) {
  return {
    type: actions.CHANNEL_UPDATE,
    name,
    shortId,
    longId,
  };
};

export function setPublishInChannel (channel) {
  return {
    type: actions.SET_PUBLISH_IN_CHANNEL,
    channel,
  };
};

export function updatePublishStatus (status, message) {
  return {
    type: actions.PUBLISH_STATUS_UPDATE,
    status,
    message,
  };
};

export function updateError (name, value) {
  return {
    type: actions.ERROR_UPDATE,
    name,
    value,
  };
};
