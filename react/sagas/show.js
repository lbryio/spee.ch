import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { updateFileIsAvailable, updateShowAssetError } from 'actions/show';
import { UNAVAILABLE, AVAILABLE } from 'constants/asset_display_states';
import { checkFileAvailability, triggerClaimGet } from 'api/fileApi';

function* retriveFile (action) {
  const name = action.data.name;
  const claimId = action.data.claimId;
  // see if the file is available
  let success, message, isAvailable;
  try {
    ({ success, message, data: isAvailable } = yield call(checkFileAvailability, name, claimId));
  } catch (error) {
    return yield put(updateShowAssetError(error.message));
  };
  if (success) {
    if (isAvailable) {
      return yield put(updateFileIsAvailable(AVAILABLE));
    }
    yield put(updateFileIsAvailable(UNAVAILABLE));
  } else {
    yield put(updateShowAssetError(message));
  }
  // initiate get request for the file
  try {
    ({ success, message } = yield call(triggerClaimGet, name, claimId));
  } catch (error) {
    return yield put(updateShowAssetError(error.message));
  };
  if (success) {
    console.log('/api/glaim-get response:', message);
    yield put(updateFileIsAvailable(AVAILABLE));
  } else {
    yield put(updateShowAssetError(message));
  }
}

export function* watchFileIsRequested () {
  yield takeLatest(actions.FILE_REQUESTED, retriveFile);
}
