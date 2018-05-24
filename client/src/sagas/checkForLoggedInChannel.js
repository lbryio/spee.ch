import { call, put, takeLatest } from 'redux-saga/effects';
import { CHANNEL_LOGIN_CHECK } from '../constants/channel_action_types';
import { checkForLoggedInChannelApi } from '../api/authApi.js';
import { updateSelectedChannel } from '../actions/publish';
import { updateLoggedInChannel } from '../actions/channel';

function * checkForLoggedInChannelSaga () {
  let response;
  try {
    response = yield call(checkForLoggedInChannelApi);
  } catch (error) {
    return console.log(error);
  }
  if (response.data) {
    const { data: { channelName, shortChannelId, channelClaimId } } = response;
    yield put(updateSelectedChannel(channelName));
    yield put(updateLoggedInChannel(channelName, shortChannelId, channelClaimId));
  }
}

export function * watchChannelLoginCheck () {
  yield takeLatest(CHANNEL_LOGIN_CHECK, checkForLoggedInChannelSaga);
}
