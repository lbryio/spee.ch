import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CHANNEL_CREATE } from '../constants/channel_create_action_types';
import { selectChannelCreateState } from '../selectors/channelCreate';
import {
  validateCreateChannelNameInput,
  validateCreateChannelPasswordInput,
} from '../utils/validate';
import {
  updateChannelCreateName,
  updateChannelCreatePassword,
  updateChannelCreateStatus,
} from '../actions/channelCreate';
import { makeCreateChannelRequest } from '../api/channelApi';
import { updateLoggedInChannel } from '../actions/channel';
import {updateSelectedChannel} from '../actions/publish';

function * createChannel () {
  const { name, password } = yield select(selectChannelCreateState);
  // validate the name
  try {
    validateCreateChannelNameInput(name);
  } catch (error) {
    return yield put(updateChannelCreateName('error', error.message));
  }
  // validate the password
  try {
    validateCreateChannelPasswordInput(password);
  } catch (error) {
    return yield put(updateChannelCreatePassword('error', error.message));
  }
  // update status
  yield put(updateChannelCreateStatus('We are publishing your new channel.  Sit tight...'));
  // make the create channel request
  let channelName, shortChannelId, channelClaimId;
  try {
    ({ channelName, shortChannelId, channelClaimId } = yield call(makeCreateChannelRequest, name.value, password.value));
  } catch (error) {
    return yield put(updateChannelCreateStatus(error.message));
  }
  yield put(updateChannelCreateStatus(null));
  yield put(updateLoggedInChannel(channelName, shortChannelId, channelClaimId));
  yield put(updateSelectedChannel(channelName));
}

export function * watchChannelCreate () {
  yield takeLatest(CHANNEL_CREATE, createChannel);
}
