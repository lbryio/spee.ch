export const selectAsset = show => {
  const requestId = show.request.id;
  let asset;
  const request = show.requestList[requestId] || null;
  const assetList = show.assetList;
  if (request && assetList) {
    const assetKey = request.key;  // note: just store this in the request
    asset = assetList[assetKey] || null;
  }
  return asset;
};

export const selectShowState = (state) => {
  return state.show;
};
