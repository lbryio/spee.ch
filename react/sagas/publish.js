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
  console.log('publishing file');
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
  const publishFormData = createPublishFormData(file, publishMetadata);
  // make the publish request
  const publishChannel = yield call(makePublishRequestChannel, publishFormData);
  let publishInProgress = true;
  while (publishInProgress) {
    const {loadStart, progress, load, success, error} = yield take(publishChannel);
    if (error) {
      yield put(updatePublishStatus(publishStates.FAILED, error.message));
      publishInProgress = false;
    }
    if (success) {
      yield put(clearFile());
      history.push(`/${success.data.claimId}/${success.data.name}`);
      publishInProgress = false;
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
  // publish thumbnail
  if (thumbnail) {
    // create form data for thumbnail publish
    const thumbnailMetadata = {
      name        : `${claim}-thumb`,
      title       : `${claim} thumbnail`,
      description : `a thumbnail for ${claim}`,
      license     : publishMetadata.license,
      nsfw        : publishMetadata.nsfw,
      type        : 'image/png',
      channel_name: thumbnailChannel,
      channel_id  : thumbnailChannelId,
    };
    const thumbnailFormData = createPublishFormData(thumbnail, thumbnailMetadata);
    // make the publish reqeust
    const thumbnailPublishChannel = yield call(makePublishRequestChannel, thumbnailFormData);
    while (true) {
      const {loadStart, progress, load, success, error} = yield take(thumbnailPublishChannel);
      if (error) {
        return console.log('thumbnail error:', error.message);
      }
      if (success) {
        return console.log('thumbnail success:', success.data);
      }
      if (loadStart) {
        console.log('thumbnail load started.');
      }
      if (progress) {
        console.log('thumbnail progress:', `${progress}%`);
      }
      if (load) {
        console.log('thumbnail load completed.');
      }
    }
  }
};

export function * watchPublishStart () {
  yield takeLatest(actions.PUBLISH_START, publishFile);
};
