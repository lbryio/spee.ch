import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addRequestToPreviousRequests, onRequestError, addAssetToAssetList } from 'actions/show';
import { getLongClaimId, getShortId, getClaimData } from 'api/assetApi';

function* newAssetRequest (action) {
  const { requestId, name, modifier } = action.data;
  // get long id
  console.log(`getting asset long id ${name}`);
  let longId;
  try {
    ({data: longId} = yield call(getLongClaimId, name, modifier));
  } catch (error) {
    console.log('error:', error);
    return yield put(onRequestError(error.message));
  }
  // put action to add request to asset request list
  const assetKey = `a#${name}#${longId}`;
  yield put(addRequestToPreviousRequests(requestId, null, assetKey));
  // get short Id
  console.log(`getting asset short id ${name} ${longId}`);
  let shortId;
  try {
    ({data: shortId} = yield call(getShortId, name, longId));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // get asset claim data
  console.log(`getting asset claim data ${name} ${longId}`);
  let claimData;
  try {
    ({data: claimData} = yield call(getClaimData, name, longId));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // put action to add asset to asset list
  yield put(addAssetToAssetList(assetKey, null, name, longId, shortId, claimData));
  // clear any errors in request error
  yield put(onRequestError(null));
};

export function* watchNewAssetRequest () {
  yield takeLatest(actions.ASSET_REQUEST_NEW, newAssetRequest);
};
