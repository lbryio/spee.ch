import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addRequestToRequestList, onRequestError, onRequestUpdate, addAssetToAssetList } from 'actions/show';
import { getLongClaimId, getShortId, getClaimData } from 'api/assetApi';
import { selectShowState } from 'selectors/show';

export function * newAssetRequest (action) {
  const { requestType, requestId, name, modifier } = action.data;
  // put an action to update the request in redux
  yield put(onRequestUpdate(requestType, requestId));
  // is this an existing request?
  // If this uri is in the request list, it's already been fetched
  const state = yield select(selectShowState);
  if (state.requestList[requestId]) {
    console.log('that request already exists in the request list!');
    return null;
  }
  // get long id && add request to request list
  console.log(`getting asset long id ${name}`);
  let longId;
  try {
    ({data: longId} = yield call(getLongClaimId, name, modifier));
  } catch (error) {
    console.log('error:', error);
    return yield put(onRequestError(error.message));
  }
  const assetKey = `a#${name}#${longId}`;
  yield put(addRequestToRequestList(requestId, null, assetKey));
  // is this an existing asset?
  // If this asset is in the asset list, it's already been fetched
  if (state.assetList[assetKey]) {
    console.log('that asset already exists in the asset list!');
    return null;
  }
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
  // add asset to asset list
  yield put(addAssetToAssetList(assetKey, null, name, longId, shortId, claimData));
  // clear any errors in request error
  yield put(onRequestError(null));
};

export function * watchNewAssetRequest () {
  yield takeLatest(actions.ASSET_REQUEST_NEW, newAssetRequest);
};
