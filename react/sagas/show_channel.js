import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { updateRequestError, addNewChannelToChannelList, updateChannelClaims } from 'actions/show';
import { getChannelClaims } from 'api/channelApi';

function* getChannelClaimsAndShowChannel (action) {
  const { id, name, shortId, longId } = action.data;
  let success, message, claimsData;
  try {
    ({ success, message, data: claimsData } = yield call(getChannelClaims, name, longId, 1));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  if (!success) {
    return yield put(updateRequestError(message));
  }
  yield put(addNewChannelToChannelList(id, name, shortId, longId, claimsData));
  yield put(updateRequestError(null));
}

export function* watchShowNewChannel () {
  yield takeLatest(actions.CHANNEL_NEW_ASYNC, getChannelClaimsAndShowChannel);
};

function* getNewClaimsAndUpdateClaimsList (action) {
  const { channelKey, name, longId, page } = action.data;
  let success, message, claimsData;
  try {
    ({ success, message, data: claimsData } = yield call(getChannelClaims, name, longId, page));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  if (!success) {
    return yield put(updateRequestError(message));
  }
  yield put(updateChannelClaims(channelKey, claimsData));
}

export function* watchShowNewChannelClaimsRequest () {
  yield takeLatest(actions.CHANNEL_CLAIMS_UPDATE_ASYNC, getNewClaimsAndUpdateClaimsList);
}
