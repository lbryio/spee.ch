import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import * as actions from '../constants/publish_action_types';
import * as publishStates from '../constants/publish_claim_states';
import { updateError, updatePublishStatus, clearFile } from '../actions/publish';
import { selectPublishState } from '../selectors/publish';
import { selectChannelState } from '../selectors/channel';
import { selectSiteState } from '../selectors/site';
import { selectShowState, selectAsset } from '../selectors/show';
import { validateChannelSelection, validateNoPublishErrors } from '../utils/validate';
import { createPublishMetadata, createPublishFormData, createThumbnailUrl } from '../utils/publish';
import { makePublishRequestChannel } from '../channels/publish';

function * publishFile (action) {
  const { history } = action.data;
  const publishState = yield select(selectPublishState);
  const { publishInChannel, selectedChannel, file, claim, metadata, thumbnailChannel, thumbnailChannelId, thumbnail, isUpdate, error: publishToolErrors } = publishState;
  const { loggedInChannel } = yield select(selectChannelState);
  const { host } = yield select(selectSiteState);

  let show, asset;
  if (isUpdate) {
    show = yield select(selectShowState);
    asset = selectAsset(show);
  }
  // validate the channel selection
  try {
    validateChannelSelection(publishInChannel, selectedChannel, loggedInChannel);
  } catch (error) {
    return yield put(updateError('channel', error.message));
  }
  // validate publish parameters
  try {
    validateNoPublishErrors(publishToolErrors);
  } catch (error) {
    return console.log('publish error:', error.message);
  }

  let publishMetadata, publishFormData, publishChannel;
  // create metadata
  publishMetadata = createPublishMetadata(
    isUpdate ? asset.name : claim,
    isUpdate ? {type: asset.claimData.contentType} : file,
    metadata,
    publishInChannel,
    selectedChannel
  );
  if (isUpdate) {
    publishMetadata['channelName'] = asset.claimData.channelName;
  }
  if (thumbnail) {
    // add thumbnail to publish metadata
    publishMetadata['thumbnail'] = createThumbnailUrl(thumbnailChannel, thumbnailChannelId, claim, host);
  }
  // create form data for main publish
  publishFormData = createPublishFormData(file, thumbnail, publishMetadata);
  // make the publish request
  publishChannel = yield call(makePublishRequestChannel, publishFormData, isUpdate);

  while (true) {
    const {loadStart, progress, load, success, error: publishError} = yield take(publishChannel);
    if (publishError) {
      return yield put(updatePublishStatus(publishStates.FAILED, publishError.message));
    }
    if (success) {
      yield put(clearFile());
      if (isUpdate) {
        yield put({
          type: 'ASSET_UPDATE_CLAIMDATA',
          data: {
            id       : `a#${success.data.name}#${success.data.claimId}`,
            claimData: success.data.claimData,
          },
        });
      }
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
}

export function * watchPublishStart () {
  yield takeLatest(actions.PUBLISH_START, publishFile);
};
