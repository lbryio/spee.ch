import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { updateFileAvailability, updateDisplayAssetError } from 'actions/show';
import { UNAVAILABLE, AVAILABLE } from 'constants/asset_display_states';
import { checkFileAvailability, triggerClaimGet } from 'api/fileApi';

function* retrieveFile (action) {
  const name = action.data.name;
  const claimId = action.data.claimId;
  // see if the file is available
  let success, message, isAvailable;
  try {
    ({ success, message, data: isAvailable } = yield call(checkFileAvailability, name, claimId));
  } catch (error) {
    return yield put(updateDisplayAssetError(error.message));
  };
  if (!success) {
    return yield put(updateDisplayAssetError(message));
  }
  if (isAvailable) {
    return yield put(updateFileAvailability(AVAILABLE));
  }
  yield put(updateFileAvailability(UNAVAILABLE));
  // initiate get request for the file
  try {
    ({ success, message } = yield call(triggerClaimGet, name, claimId));
  } catch (error) {
    return yield put(updateDisplayAssetError(error.message));
  };
  if (!success) {
    return yield put(updateDisplayAssetError(message));
  }
  yield put(updateFileAvailability(AVAILABLE));
};

export function* watchFileIsRequested () {
  yield takeLatest(actions.FILE_REQUESTED, retrieveFile);
};
