import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/publish_action_types';
import * as publishStates from 'constants/publish_claim_states';
import { updateError, updatePublishStatus, clearFile } from 'actions/publish';
import { selectPublishState } from 'selectors/publish';
import { selectChannelState } from 'selectors/channel';
import { validateChannelSelection, validatePublishParams } from 'utils/validate';
import { createPublishMetadata, createPublishFormData } from 'utils/publish';

const makePublishRequest = (fd) => {
  console.log('making publish request');
  return new Promise((resolve, reject) => {
    const uri = '/api/claim/publish';
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('loadstart', () => {
      put(updatePublishStatus(publishStates.LOAD_START, 'upload started'));
    });
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded * 100) / e.total);
        console.log('progress:', percentage);
        put(updatePublishStatus(publishStates.LOADING, `${percentage}%`));
      }
    }, false);
    xhr.upload.addEventListener('load', () => {
      console.log('loaded 100%');
      put(updatePublishStatus(publishStates.PUBLISHING, null));
    }, false);
    xhr.open('POST', uri, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const response = JSON.parse(xhr.response);
        // console.log('publish response:', response);
        if ((xhr.status === 200) && response.success) {
          resolve(response);
        } else {
          reject(new Error(response.message));
        }
      }
    };
    // Initiate a multipart/form-data upload
    xhr.send(fd);
  });
};

function * publishFile (action) {
  const { history } = action.data;
  console.log('publishing file');
  const { publishInChannel, selectedChannel, file, claim, metadata, error: { url: urlError } } = yield select(selectPublishState);
  const { loggedInChannel } = yield select(selectChannelState);
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
  const publishMetadata = createPublishMetadata(claim, file, metadata, publishInChannel, selectedChannel);
  // create form data
  const publishFormData = createPublishFormData(file, publishMetadata);
  // make the publish request
  let response;
  try {
    response = yield call(makePublishRequest, publishFormData);
    yield put(clearFile());
    history.push(`/${response.data.claimId}/${response.data.name}`);
  } catch (error) {
    return yield put(updatePublishStatus(publishStates.FAILED, error.message));
  }
};

export function * watchPublishStart () {
  yield takeLatest(actions.PUBLISH_START, publishFile);
};
