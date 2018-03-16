import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { addRequestToRequestList, onRequestError, onRequestUpdate, addAssetToAssetList } from 'actions/show';
import { getLongClaimId, getShortId, getClaimData } from 'api/assetApi';
import { selectShowState } from 'selectors/show';
import { selectSiteHost } from 'selectors/site';

export function * newAssetRequest (action) {
  const { requestType, requestId, name, modifier } = action.data;
  // put an action to update the request in redux
  yield put(onRequestUpdate(requestType, requestId));
  // is this an existing request?
  // If this uri is in the request list, it's already been fetched
  const state = yield select(selectShowState);
  const host = yield select(selectSiteHost);
  if (state.requestList[requestId]) {
    return null;
  }
  // get long id && add request to request list
  let longId;
  try {
    ({data: longId} = yield call(getLongClaimId, host, name, modifier));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  const assetKey = `a#${name}#${longId}`;
  yield put(addRequestToRequestList(requestId, null, assetKey));
  // is this an existing asset?
  // If this asset is in the asset list, it's already been fetched
  if (state.assetList[assetKey]) {
    return null;
  }
  // get short Id
  let shortId;
  try {
    ({data: shortId} = yield call(getShortId, host, name, longId));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // get asset claim data
  let claimData;
  try {
    ({data: claimData} = yield call(getClaimData, host, name, longId));
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
