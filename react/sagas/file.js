import {call, put, select, takeLatest} from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { updateFileAvailability, updateDisplayAssetError } from 'actions/show';
import { UNAVAILABLE, AVAILABLE } from 'constants/asset_display_states';
import { checkFileAvailability, triggerClaimGet } from 'api/fileApi';
import { selectSiteHost } from 'selectors/site';

function * retrieveFile (action) {
  const name = action.data.name;
  const claimId = action.data.claimId;
  const host = yield select(selectSiteHost);
  // see if the file is available
  let isAvailable;
  try {
    ({ data: isAvailable } = yield call(checkFileAvailability, claimId, host, name));
  } catch (error) {
    return yield put(updateDisplayAssetError(error.message));
  };
  if (isAvailable) {
    yield put(updateDisplayAssetError(null));
    return yield put(updateFileAvailability(AVAILABLE));
  }
  yield put(updateFileAvailability(UNAVAILABLE));
  // initiate get request for the file
  try {
    yield call(triggerClaimGet, claimId, host, name);
  } catch (error) {
    return yield put(updateDisplayAssetError(error.message));
  };
  yield put(updateFileAvailability(AVAILABLE));
};

export function * watchFileIsRequested () {
  yield takeLatest(actions.FILE_REQUESTED, retrieveFile);
};
