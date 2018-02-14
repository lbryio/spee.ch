import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addNewChannelToChannelList, addRequestToChannelRequests, updateRequestError, updateChannelClaims } from 'actions/show';
import { getChannelClaims, getChannelData } from 'api/channelApi';

function* newChannelRequest (action) {
  const { id, name, channelId } = action.data;
  // get channel long id
  console.log('getting channel long id and short id');
  let longId, shortId;
  try {
    ({ data: {longChannelClaimId: longId, shortChannelClaimId: shortId} } = yield call(getChannelData, name, channelId));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  // store the request in the channel requests list
  yield put(addRequestToChannelRequests(id, null, name, longId, shortId));
  // get channel claims data
  console.log('getting channel claims data');
  let claimsData;
  try {
    ({ data: claimsData } = yield call(getChannelClaims, name, longId, 1));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  // store the channel data in the channel list
  const channelKey = `c#${name}#${longId}`;
  yield put(addNewChannelToChannelList(channelKey, name, shortId, longId, claimsData));
  // clear any request errors
  yield put(updateRequestError(null));
}

export function* watchNewChannelRequest () {
  yield takeLatest(actions.CHANNEL_REQUEST_NEW, newChannelRequest);
};

function* getNewClaimsAndUpdateChannel (action) {
  const { channelKey, name, longId, page } = action.data;
  let claimsData;
  try {
    ({ data: claimsData } = yield call(getChannelClaims, name, longId, page));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  yield put(updateChannelClaims(channelKey, claimsData));
}

export function* watchUpdateChannelClaims () {
  yield takeLatest(actions.CHANNEL_CLAIMS_UPDATE_ASYNC, getNewClaimsAndUpdateChannel);
}
