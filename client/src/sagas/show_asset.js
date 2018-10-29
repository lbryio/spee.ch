import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../constants/show_action_types';
import * as channelActions from '../constants/channel_action_types';
import {
  addRequestToRequestList,
  onRequestError,
  onRequestUpdate,
  addAssetToAssetList,
  updateAssetViewsInList,
} from '../actions/show';
import { getLongClaimId, getShortId, getClaimData, getClaimViews } from '../api/assetApi';
import { selectChannelState } from '../selectors/channel';
import { selectShowState } from '../selectors/show';
import { selectSiteHost } from '../selectors/site';

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
  let claimViews = null;

  try {
    ({data: claimData} = yield call(getClaimData, host, name, longId));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }

  try {
    const { loggedInChannel } = yield select(selectChannelState);

    if(loggedInChannel && loggedInChannel.longId) {
      const {
        data: claimViewData
      } = yield call(getClaimViews, longId);

      claimViews = claimViewData[longId] || 0;
    }
  } catch (error) { }

  // add asset to asset list
  yield put(addAssetToAssetList(assetKey, null, name, longId, shortId, claimData, claimViews));
  // clear any errors in request error
  yield put(onRequestError(null));
};

export function * updateAssetViews (action) {
  // update each loaded claim that's in the loggedInChannel
  try {
    const showState = yield select(selectShowState);
    const { data: loggedInChannel } = action;

    const channelId = loggedInChannel.longId;

    for(let key in showState.assetList) {
      let asset = showState.assetList[key];

      if(asset.claimData && asset.claimData.certificateId === channelId) {
        const longId = asset.claimId;
        const assetKey = `a#${asset.name}#${longId}`;

        let claimViews = null;

        if(longId) {
          const {
            data: claimViewData
          } = yield call(getClaimViews, longId);

          claimViews = claimViewData[longId] || 0;
        }

        yield put(updateAssetViewsInList(assetKey, longId, claimViews));
      }
    }
  } catch (error) {
    console.log(error)
  }
};

export function * watchUpdateAssetViews (action) {
  yield takeLatest(channelActions.CHANNEL_UPDATE, updateAssetViews)
};

export function * watchNewAssetRequest () {
  yield takeLatest(actions.ASSET_REQUEST_NEW, newAssetRequest);
};
