import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/show_action_types';
import { onRequestError, onNewChannelRequest, onNewAssetRequest } from 'actions/show';
import { newAssetRequest } from 'sagas/show_asset';
import { newChannelRequest } from 'sagas/show_channel';
import lbryUri from 'utils/lbryUri';

function * parseAndUpdateIdentifierAndClaim (modifier, claim) {
  // this is a request for an asset
  // claim will be an asset claim
  // the identifier could be a channel or a claim id
  let isChannel, channelName, channelClaimId, claimId, claimName, extension;
  try {
    ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(modifier));
    ({ claimName, extension } = lbryUri.parseClaim(claim));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // trigger an new action to update the store
  if (isChannel) {
    return yield call(newAssetRequest, onNewAssetRequest(claimName, null, channelName, channelClaimId, extension));
  };
  yield call(newAssetRequest, onNewAssetRequest(claimName, claimId, null, null, extension));
}
function * parseAndUpdateClaimOnly (claim) {
  // this could be a request for an asset or a channel page
  // claim could be an asset claim or a channel claim
  let isChannel, channelName, channelClaimId;
  try {
    ({ isChannel, channelName, channelClaimId } = lbryUri.parseIdentifier(claim));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  // trigger an new action to update the store
  // return early if this request is for a channel
  if (isChannel) {
    return yield call(newChannelRequest, onNewChannelRequest(channelName, channelClaimId));
  }
  // if not for a channel, parse the claim request
  let claimName, extension;
  try {
    ({claimName, extension} = lbryUri.parseClaim(claim));
  } catch (error) {
    return yield put(onRequestError(error.message));
  }
  yield call(newAssetRequest, onNewAssetRequest(claimName, null, null, null, extension));
}

export function * handleShowPageUri (action) {
  const { identifier, claim } = action.data;
  if (identifier) {
    return yield call(parseAndUpdateIdentifierAndClaim, identifier, claim);
  }
  yield call(parseAndUpdateClaimOnly, claim);
};

export function * watchHandleShowPageUri () {
  yield takeLatest(actions.HANDLE_SHOW_URI, handleShowPageUri);
};
