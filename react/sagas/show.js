import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addAssetRequest, updateFileAvailability, updateDisplayAssetError } from 'actions/show';
import { UNAVAILABLE, AVAILABLE } from 'constants/asset_display_states';
import { checkFileAvailability, triggerClaimGet } from 'api/fileApi';
import { getLongClaimId } from 'api/AssetApi';
import request from '../utils/request';

function* newAssetRequest (action) {
  const { id, name, modifier } = action.data;
  // get the long claim id
  let success, message, longId;
  try {
    ({success, message, data: longId} = yield call(getLongClaimId, name, modifier));
  } catch (error) {
    console.log('error making getLongClaimId call', error);
    yield put(addAssetRequest(id, error.message, null));
  }
  // put a new action to update the store with result
  if (success) {
    return yield put(addAssetRequest(id, null, longId));
  }
  yield put(addAssetRequest(id, message, null));
};

function* getShortId (action) {
  const { longId, name } = action.data;
  const url = `/api/claim/short-id/${longId}/${name}`;
  return new Promise((resolve, reject) => {
    request(url)
      .then(({ success, message, data }) => {
        console.log('get short claim id response:', data);
        if (!success) {
          reject(message);
        }
        resolve(data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function* getClaimData (action) {
  const { claimName, claimId } = action.data;
  return new Promise((resolve, reject) => {
    const url = `/api/claim/data/${claimName}/${claimId}`;
    return request(url)
      .then(({ success, message }) => {
        console.log('get claim data response:', message);
        if (!success) {
          reject(message);
        }
        resolve(message);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
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

export function* watchFileIsRequested () {
  yield takeLatest(actions.FILE_REQUESTED, retriveFile);
};
