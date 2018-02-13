import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { updateRequestError, addAssetToAssetList } from 'actions/show';
import { getShortId, getClaimData } from 'api/assetApi';

function* getAssetDataAndShowAsset (action) {
  const {id, name, claimId} = action.data;
  // get short Id
  console.log('getting short id');
  let shortId;
  try {
    ({data: shortId} = yield call(getShortId, name, claimId));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  // if no error, get claim data
  console.log('getting claim data');
  let claimData;
  try {
    ({data: claimData} = yield call(getClaimData, name, claimId));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  yield put(addAssetToAssetList(id, null, name, claimId, shortId, claimData));
  yield put(updateRequestError(null));
}

export function* watchShowNewAsset () {
  yield takeLatest(actions.ASSET_NEW_ASYNC, getAssetDataAndShowAsset);
};
