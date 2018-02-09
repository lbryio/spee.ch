import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { updateShowAsset, upsertAssetToAssetList } from 'actions/show';
import { getShortId, getClaimData } from 'api/assetApi';

function* getAssetDataAndShowAsset (action) {
  const {id, name, claimId} = action.data;
  // get short Id
  let success, message, shortId;
  try {
    ({success, message, data: shortId} = yield call(getShortId, name, claimId));
  } catch (error) {
    return yield put(updateShowAsset(error.message, null));
  }
  if (!success) {
    return yield put(updateShowAsset(message, null));
  }
  // if no error, get claim data
  success = null;
  let claimData;
  try {
    ({success, message, data: claimData} = yield call(getClaimData, name, claimId));
  } catch (error) {
    return yield put(updateShowAsset(error.message, null));
  }
  if (!success) {
    return yield put(updateShowAsset(message, null));
  }
  yield put(updateShowAsset(null, id));
  yield put(upsertAssetToAssetList(id, null, name, claimId, shortId, claimData));
}

export function* watchShowNewAsset () {
  yield takeLatest(actions.SHOW_ASSET_NEW, getAssetDataAndShowAsset);
};
