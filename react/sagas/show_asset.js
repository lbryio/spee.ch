import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { updateRequestError, addAssetToAssetList } from 'actions/show';
import { getShortId, getClaimData } from 'api/assetApi';

function* getAssetDataAndShowAsset (action) {
  const {id, name, claimId} = action.data;
  // get short Id
  let success, message, shortId;
  try {
    ({success, message, data: shortId} = yield call(getShortId, name, claimId));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  if (!success) {
    return yield put(updateRequestError(message));
  }
  // if no error, get claim data
  success = null;
  let claimData;
  try {
    ({success, message, data: claimData} = yield call(getClaimData, name, claimId));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  if (!success) {
    return yield put(updateRequestError(message));
  }
  yield put(addAssetToAssetList(id, null, name, claimId, shortId, claimData));
  yield put(updateRequestError(null));
}

export function* watchShowNewAsset () {
  yield takeLatest(actions.SHOW_ASSET_NEW, getAssetDataAndShowAsset);
};
