import { call, put, takeLatest } from 'redux-saga/effects';
import { CHANNEL_LOGOUT } from '../constants/channel_action_types';
import { channelLogoutApi } from '../api/authApi.js';
import { updateLoggedInChannel } from '../actions/channel';

function * logoutChannelSaga () {
  try {
    yield call(channelLogoutApi);
  } catch (error) {
    return console.log(error);
  }
  yield put(updateLoggedInChannel(null, null, null));
}

export function * watchChannelLogout () {
  yield takeLatest(CHANNEL_LOGOUT, logoutChannelSaga);
}
