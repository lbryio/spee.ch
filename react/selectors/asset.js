const selectAsset = (show) => {
  const request = show.requestList[show.request.id];
  const assetKey = request.key;
  return show.assetList[assetKey];
};

export default selectAsset;
