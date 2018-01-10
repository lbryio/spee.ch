// export action types
export const FILE_SELECTED = 'FILE_SELECTED';
export const FILE_CLEAR = 'FILE_CLEAR';
export const METADATA_UPDATE = 'METADATA_UPDATE';
export const CLAIM_UPDATE = 'CLAIM_UPDATE';
export const CHANNEL_UPDATE = 'CHANNEL_UPDATE';
export const SET_PUBLISH_IN_CHANNEL = 'SET_PUBLISH_IN_CHANNEL';

// export action creators
export function selectFile (file) {
  return {
    type: FILE_SELECTED,
    file: file,
  };
};

export function clearFile () {
  return {
    type: FILE_CLEAR,
  };
};

export function updateMetadata (name, value) {
  return {
    type: METADATA_UPDATE,
    name,
    value,
  };
};

export function updateClaim (value) {
  return {
    type: CLAIM_UPDATE,
    value,
  };
};

export function updateLoggedInChannel (name, shortId, longId) {
  return {
    type: CHANNEL_UPDATE,
    name,
    shortId,
    longId,
  };
};

export function setPublishInChannel (value) {
  return {
    type: SET_PUBLISH_IN_CHANNEL,
    value,
  };
}