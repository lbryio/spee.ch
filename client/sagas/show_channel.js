import {call, put, select, takeLatest} from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addNewChannelToChannelList, addRequestToRequestList, onRequestError, onRequestUpdate, updateChannelClaims } from 'actions/show';
import { getChannelClaims, getChannelData } from 'api/channelApi';
import { selectShowState } from 'selectors/show';
import { selectSiteHost } from 'selectors/site';

export function * newChannelRequest (action) {
  const { requestType, requestId, channelName, channelId } = action.data;
  // put an action to update the request in redux
  yield put(onRequestUpdate(requestType, requestId));
  // is this an existing request?
  // If this uri is in the request list, it's already been fetched
  const state = yield select(selectShowState);
  const host = yield select(selectSiteHost);
  if (state.requestList[requestId]) {
    return null;
  }
  // get channel long id
  let longId, shortId;
  try {
    ({ data: {longChannelClaimId: longId, shortChannelClaimId: shortId} } = yield call(getChannelData, host, channelName, channelId));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // store the request in the channel requests list
  const channelKey = `c#${channelName}#${longId}`;
  yield put(addRequestToRequestList(requestId, null, channelKey));
  // is this an existing channel?
  // If this channel is in the channel list, it's already been fetched
  if (state.channelList[channelKey]) {
    return null;
  }
  // get channel claims data
  let claimsData;
  try {
    ({ data: claimsData } = yield call(getChannelClaims, host, longId, channelName, 1));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // store the channel data in the channel list
  yield put(addNewChannelToChannelList(channelKey, channelName, shortId, longId, claimsData));
  // clear any request errors
  yield put(onRequestError(null));
}

export function * watchNewChannelRequest () {
  yield takeLatest(actions.CHANNEL_REQUEST_NEW, newChannelRequest);
};

function * getNewClaimsAndUpdateChannel (action) {
  const { channelKey, name, longId, page } = action.data;
  const host = yield select(selectSiteHost);
  let claimsData;
  try {
    ({ data: claimsData } = yield call(getChannelClaims, host, longId, name, page));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  yield put(updateChannelClaims(channelKey, claimsData));
}

export function * watchUpdateChannelClaims () {
  yield takeLatest(actions.CHANNEL_CLAIMS_UPDATE_ASYNC, getNewClaimsAndUpdateChannel);
}
