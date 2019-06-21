import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../constants/publish_action_types';
import * as publishStates from '../constants/publish_claim_states';
import { updatePublishStatus, clearFile } from '../actions/publish';
import { removeAsset } from '../actions/show';
import { doAbandonClaim } from '../api/assetApi';

function* abandonClaim(action) {
  const { claimData, history } = action.data;
  const { outpoint } = claimData;

  const confirm = window.confirm(
    'Are you sure you want to abandon this claim? This action cannot be undone.'
  );
  if (!confirm) return;

  yield put(updatePublishStatus(publishStates.ABANDONING, 'Your claim is being abandoned...'));

  try {
    yield call(doAbandonClaim, outpoint);
  } catch (error) {
    return console.log('abandon error:', error.message);
  }

  yield put(clearFile());
  yield put(removeAsset(claimData));
  return history.push('/');
}

export function* watchAbandonClaim() {
  yield takeLatest(actions.ABANDON_CLAIM, abandonClaim);
}
