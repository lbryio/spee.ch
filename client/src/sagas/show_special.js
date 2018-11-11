import {call, put, select, takeLatest} from 'redux-saga/effects';
import * as actions from '../constants/show_action_types';
import { addNewChannelToChannelList, addRequestToRequestList, onRequestError, onRequestUpdate, updateChannelClaims } from '../actions/show';
// import { getChannelClaims, getChannelData } from '../api/channelApi';
import { getSpecialAssetClaims } from '../api/specialAssetApi';
import { selectShowState } from '../selectors/show';
import { selectSiteHost } from '../selectors/site';

export function * newSpecialAssetRequest (action) {
  const { requestType, requestId, name } = action.data;
  let claimsData;
  // put an action to update the request in redux
  yield put(onRequestUpdate(requestType, requestId));
  // is this an existing request?
  // If this uri is in the request list, it's already been fetched
  const state = yield select(selectShowState);
  const host = yield select(selectSiteHost);
  if (state.requestList[requestId]) {
    return null;
  }

  // store the request in the channel requests list
  const channelKey = `sar#${name}`;
  yield put(addRequestToRequestList(requestId, null, channelKey));

  // If this channel is in the channel list, it's already been fetched
  if (state.channelList[channelKey]) {
    return null;
  }
  // get channel claims data
  try {
    ({ data: claimsData } = yield call(getSpecialAssetClaims, host, name, 1));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }

  // store the channel data in the channel list
  yield put(addNewChannelToChannelList(channelKey, name, null, null, claimsData));

  // clear any request errors
  yield put(onRequestError(null));
}

export function * watchNewSpecialAssetRequest () {
  yield takeLatest(actions.SPECIAL_ASSET_REQUEST_NEW, newSpecialAssetRequest);
}
