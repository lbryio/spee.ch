import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { updateShowChannel, addNewChannelToChannelList } from 'actions/show';
import { getChannelClaims } from 'api/channelApi';

function* getNewChannelDataAndShowChannel (action) {
  const { id, channelData: {name, shortId, longId} } = action.data;
  let success, message, claimsData;
  try {
    ({ success, message, data: claimsData } = yield call(getChannelClaims, name, longId, 1));
  } catch (error) {
    return yield put(updateShowChannel(error.message, null));
  }
  if (!success) {
    return yield put(updateShowChannel(message, null));
  }
  const channelData = {name, shortId, longId};
  yield put(addNewChannelToChannelList(id, null, channelData, claimsData));
  yield put(updateShowChannel(null, id));
}

export function* watchShowNewChannel () {
  yield takeLatest(actions.SHOW_CHANNEL_NEW, getNewChannelDataAndShowChannel);
};
