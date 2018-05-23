import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../constants/channel_create_action_types';
import { checkChannelAvailability } from '../api/channelApi';
import { updateChannelCreateName } from '../actions/channelCreate';

function * updateChannelAvailability ({data}) {
  let isAvailable, message;
  try {
    ({ data: isAvailable, message } = yield call(checkChannelAvailability, data));
    console.log('isAvailable:', isAvailable, 'message:', message);
  } catch (error) {
    console.log('updateClaimAvailability error');
  }
  if (!isAvailable) {
    return yield put(updateChannelCreateName('error', message));
  }
  yield put(updateChannelCreateName('error', null));
}

export function * watchUpdateChannelAvailability () {
  yield takeLatest(actions.CHANNEL_AVAILABILITY, updateChannelAvailability);
}
