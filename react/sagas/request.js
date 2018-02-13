import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addRequestToAssetRequests, updateRequestError, addRequestToChannelRequests, showNewChannel, addAssetToAssetList } from 'actions/show';
import { getLongClaimId, getShortId, getClaimData } from 'api/assetApi';
import { getChannelData } from 'api/channelApi';

function* newAssetRequest (action) {
  const { id, name, modifier } = action.data;
  // get long id
  console.log(`getting asset long id ${name}`);
  let longId;
  try {
    ({data: longId} = yield call(getLongClaimId, name, modifier));
  } catch (error) {
    console.log('error:', error);
    return yield put(updateRequestError(error.message));
  }
  // put action to add request to asset request list
  yield put(addRequestToAssetRequests(id, null, name, longId));
  // get short Id
  console.log(`getting asset short id ${name} ${longId}`);
  let shortId;
  try {
    ({data: shortId} = yield call(getShortId, name, longId));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  // get claim data
  console.log(`getting asset claim data ${name} ${longId}`);
  let claimData;
  try {
    ({data: claimData} = yield call(getClaimData, name, longId));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  // put action to add asset to asset list
  const assetKey = `a#${name}#${longId}`;
  yield put(addAssetToAssetList(assetKey, null, name, longId, shortId, claimData));
  // clear any errors in request error
  yield put(updateRequestError(null));
};

function* newChannelRequest (action) {
  const { id, name, channelId } = action.data;
  console.log('getting channel long id');
  let data;
  try {
    ({data} = yield call(getChannelData, name, channelId));
  } catch (error) {
    return yield put(updateRequestError(error.message));
  }
  const { longChannelClaimId: longId, shortChannelClaimId: shortId } = data;
  yield put(addRequestToChannelRequests(id, null, name, longId, shortId));
  yield put(showNewChannel(name, shortId, longId));
}

export function* watchNewAssetRequest () {
  yield takeLatest(actions.ASSET_REQUEST_NEW, newAssetRequest);
};

export function* watchNewChannelRequest () {
  yield takeLatest(actions.CHANNEL_REQUEST_ASYNC, newChannelRequest);
};
