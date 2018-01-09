// export action types
export const FILE_SELECTED = 'FILE_SELECTED';
export const FILE_CLEAR = 'FILE_CLEAR';

// export action creators
export function selectFile (file) {
  return {
    type   : FILE_SELECTED,
    payload: file,
  };
};

export function clearFile () {
  return {
    type: FILE_CLEAR,
  };
};
