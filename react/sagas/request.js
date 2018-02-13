import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addAssetRequest, updateRequestError, showNewAsset, addChannelRequest, showNewChannel } from 'actions/show';
import { getLongClaimId } from 'api/assetApi';
import { getChannelData } from 'api/channelApi';

function* newAssetRequest (action) {
  const { id, name, modifier } = action.data;
  console.log('getting asset long id');
  let longId;
  try {
    ({data: longId} = yield call(getLongClaimId, name, modifier));
  } catch (error) {
    console.log('error:', error);
    return yield put(updateRequestError(error.message));
  }
  yield put(addAssetRequest(id, null, name, longId));
  yield put(showNewAsset(name, longId));
};

function* newChannelRequest (action) {
  const { id, name, channelId } = action.data;
  console.log('getting channel long id');
  let data;
  try {
    ({data} = yield call(getChannelData, name, channelId));
  } catch (error) {
    // return yield put(addChannelRequest(id, error.message, null, null, null));
    return yield put(updateRequestError(error.message));
  }
  const { longChannelClaimId: longId, shortChannelClaimId: shortId } = data;
  yield put(addChannelRequest(id, null, name, longId, shortId));
  yield put(showNewChannel(name, shortId, longId));
}

export function* watchNewAssetRequest () {
  yield takeLatest(actions.ASSET_REQUEST_ASYNC, newAssetRequest);
};

export function* watchNewChannelRequest () {
  yield takeLatest(actions.CHANNEL_REQUEST_ASYNC, newChannelRequest);
};
