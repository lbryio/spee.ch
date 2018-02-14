import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addNewChannelToChannelList, addRequestToRequestList, onRequestError, updateChannelClaims } from 'actions/show';
import { getChannelClaims, getChannelData } from 'api/channelApi';

function* getNewChannelAndUpdateChannelList (action) {
  const { requestId, channelName, channelId } = action.data;
  // get channel long id
  console.log('getting channel long id and short id');
  let longId, shortId;
  try {
    ({ data: {longChannelClaimId: longId, shortChannelClaimId: shortId} } = yield call(getChannelData, channelName, channelId));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // store the request in the channel requests list
  const channelKey = `c#${channelName}#${longId}`;
  yield put(addRequestToRequestList(requestId, null, channelKey));
  // get channel claims data
  console.log('getting channel claims data');
  let claimsData;
  try {
    ({ data: claimsData } = yield call(getChannelClaims, channelName, longId, 1));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // store the channel data in the channel list
  yield put(addNewChannelToChannelList(channelKey, channelName, shortId, longId, claimsData));
  // clear any request errors
  yield put(onRequestError(null));
}

export function* watchNewChannelRequest () {
  yield takeLatest(actions.CHANNEL_REQUEST_NEW, getNewChannelAndUpdateChannelList);
};

function* getNewClaimsAndUpdateChannel (action) {
  const { channelKey, name, longId, page } = action.data;
  let claimsData;
  try {
    ({ data: claimsData } = yield call(getChannelClaims, name, longId, page));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  yield put(updateChannelClaims(channelKey, claimsData));
}

export function* watchUpdateChannelClaims () {
  yield takeLatest(actions.CHANNEL_CLAIMS_UPDATE_ASYNC, getNewClaimsAndUpdateChannel);
}
