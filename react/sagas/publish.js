import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/publish_action_types';
import * as publishStates from 'constants/publish_claim_states';
import { updateError, updatePublishStatus, clearFile } from 'actions/publish';
import { selectPublishState } from 'selectors/publish';
import { selectChannelState } from 'selectors/channel';
import { selectSiteState } from 'selectors/site';
import { validateChannelSelection, validatePublishParams } from 'utils/validate';
import { createPublishMetadata, createPublishFormData, createThumbnailUrl } from 'utils/publish';
import { makePublishRequestChannel } from 'channels/publish';

function * publishFile (action) {
  const { history } = action.data;
  const { publishInChannel, selectedChannel, file, claim, metadata, thumbnailChannel, thumbnailChannelId, thumbnail, error: { url: urlError } } = yield select(selectPublishState);
  const { loggedInChannel } = yield select(selectChannelState);
  const { host } = yield select(selectSiteState);
  // validate the channel selection
  try {
    validateChannelSelection(publishInChannel, selectedChannel, loggedInChannel);
  } catch (error) {
    return yield put(updateError('channel', error.message));
  };
  // validate publish parameters
  try {
    validatePublishParams(file, claim, urlError);
  } catch (error) {
    return yield put(updateError('publishSubmit', error.message));
  }
  // create metadata
  let publishMetadata = createPublishMetadata(claim, file, metadata, publishInChannel, selectedChannel);
  if (thumbnail) {
    // add thumbnail to publish metadata
    publishMetadata['thumbnail'] = createThumbnailUrl(thumbnailChannel, thumbnailChannelId,  claim, host);
  }
  // create form data for main publish
  const publishFormData = createPublishFormData(file, thumbnail, publishMetadata);
  // make the publish request
  const publishChannel = yield call(makePublishRequestChannel, publishFormData);
  while (true) {
    const {loadStart, progress, load, success, error} = yield take(publishChannel);
    if (error) {
      return yield put(updatePublishStatus(publishStates.FAILED, error.message));
    }
    if (success) {
      yield put(clearFile());
      return history.push(`/${success.data.claimId}/${success.data.name}`);
    }
    if (loadStart) {
      yield put(updatePublishStatus(publishStates.LOAD_START, null));
    }
    if (progress) {
      yield put(updatePublishStatus(publishStates.LOADING, `${progress}%`));
    }
    if (load) {
      yield put(updatePublishStatus(publishStates.PUBLISHING, null));
    }
  }
};

export function * watchPublishStart () {
  yield takeLatest(actions.PUBLISH_START, publishFile);
};
