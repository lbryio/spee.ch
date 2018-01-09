// export action types
export const FILE_SELECTED = 'FILE_SELECTED';
export const FILE_CLEAR = 'FILE_CLEAR';
export const METADATA_UPDATE = 'TITLE_UPDATE';

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
