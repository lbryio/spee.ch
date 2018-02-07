import { call, put, all, takeLatest } from 'redux-saga/effects';
import Request from 'utils/request';
import * as actions from 'constants/show_action_types';
import { updateFileIsAvailable, updateShowAssetError } from 'actions/show';
import { UNAVAILABLE, AVAILABLE } from 'constants/asset_display_states';

function* helloSaga () {
  console.log('Hello Sagas!');
}

function* retriveFile (action) {
  const name = action.data.name;
  const claimId = action.data.claimId;
  // see if the file is available
  console.log(`checking if file is available for ${name}#${claimId}`);
  let url = `/api/file-is-available/${name}/${claimId}`;
  let success, message, isAvailable;
  try {
    ({ success, message, data: isAvailable } = yield call(Request, url));
  } catch (error) {
    return yield put(updateShowAssetError(error.message));
  };
  if (success) {
    console.log('/api/file-is-available response:', isAvailable);
    if (isAvailable) {
      return yield put(updateFileIsAvailable(AVAILABLE));
    }
    yield put(updateFileIsAvailable(UNAVAILABLE));
  } else {
    yield put(updateShowAssetError(message));
  }
  // initiate get request for the file
  console.log(`getting claim for ${name}#${claimId}`);
  url = `/api/claim-get/${name}/${claimId}`;
  try {
    ({ success, message } = yield call(Request, url));
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

function* watchUpdateFileIsAvailable () {
  yield takeLatest(actions.FILE_REQUESTED, retriveFile);
}

export default function* rootSaga () {
  yield all([
    helloSaga(),
    watchUpdateFileIsAvailable(),
  ]);
}
