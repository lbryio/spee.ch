import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addAssetRequest, updateShowAsset, updateFileAvailability, updateDisplayAssetError } from 'actions/show';
import { UNAVAILABLE, AVAILABLE } from 'constants/asset_display_states';
import { checkFileAvailability, triggerClaimGet } from 'api/fileApi';
import { getLongClaimId, getShortId, getClaimData } from 'api/AssetApi';

function* newAssetRequest (action) {
  const { id, name, modifier } = action.data;
  let success, message, longId;
  try {
    ({success, message, data: longId} = yield call(getLongClaimId, name, modifier));
  } catch (error) {
    console.log('error making getLongClaimId call', error);
    yield put(addAssetRequest(id, error.message, name, null));
  }
  if (success) {
    return yield put(addAssetRequest(id, null, name, longId));
  }
  yield put(addAssetRequest(id, message, name, null));
};

function* getAssetDataAndShowAsset (action) {
  const {id, name, claimId} = action.data;
  // if no error, get short Id
  let success, message, shortId;
  try {
    ({success, message, data: shortId} = yield call(getShortId, name, claimId));
  } catch (error) {
    return yield put(updateShowAsset(id, error.message, null, null, null)); // add with error
  }
  if (!success) {
    return yield put(updateShowAsset(id, message, null, null, null)); // add with error
  }
  // if no error, get claim data
  success = null;
  let claimData;
  try {
    ({success, message, data: claimData} = yield call(getClaimData, name, claimId));
  } catch (error) {
    return yield put(updateShowAsset(id, error.message, null, null, null)); // add with error
  }
  if (!success) {
    return yield put(updateShowAsset(id, message, null, null, null)); // add with error
  }
  // if both are successfull, add to asset list and select for showing
  yield put(updateShowAsset(id, null, name, claimId, shortId, claimData));
}

function* retriveFile (action) {
  const name = action.data.name;
  const claimId = action.data.claimId;
  // see if the file is available
  let success, message, isAvailable;
  try {
    ({ success, message, data: isAvailable } = yield call(checkFileAvailability, name, claimId));
  } catch (error) {
    return yield put(updateDisplayAssetError(error.message));
  };
  if (success) {
    if (isAvailable) {
      return yield put(updateFileAvailability(AVAILABLE));
    }
    yield put(updateFileAvailability(UNAVAILABLE));
  } else {
    yield put(updateDisplayAssetError(message));
  }
  // initiate get request for the file
  try {
    ({ success, message } = yield call(triggerClaimGet, name, claimId));
  } catch (error) {
    return yield put(updateDisplayAssetError(error.message));
  };
  if (success) {
    console.log('/api/glaim-get response:', message);
    yield put(updateFileAvailability(AVAILABLE));
  } else {
    yield put(updateDisplayAssetError(message));
  }
};

export function* watchNewAssetRequest () {
  yield takeLatest(actions.NEW_ASSET_REQUEST, newAssetRequest);
};

export function* watchShowNewAsset () {
  yield takeLatest(actions.SHOW_NEW_ASSET, getAssetDataAndShowAsset);
};

export function* watchFileIsRequested () {
  yield takeLatest(actions.FILE_REQUESTED, retriveFile);
};
