import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from 'constants/publish_action_types';
import { updateError } from 'actions/publish';
// import { publish } from 'api/fileApi';
import { selectPublishState } from '../selectors/publish';
import { selectChannelState } from '../selectors/channel';
import * as publishStates from '../constants/publish_claim_states';

const validateChannelSelection = (publishInChannel, selectedChannel, loggedInChannel) => {
  console.log('validating channel selection');
  // make sure all required data is provided
  return new Promise((resolve, reject) => {
    // if publishInChannel is true, is a channel selected & logged in?
    if (publishInChannel && (selectedChannel !== loggedInChannel.name)) {
      return reject('Log in to a channel or select Anonymous');
    }
    resolve();
  });
}

const validatePublishParams = (file, claim, urlError) => {
  console.log('validating publish params');
  // make sure all required data is provided
  return new Promise((resolve, reject) => {
    // is there a file?
    if (!file) {
      return reject('Please choose a file');
    }
    // is there a claim chosen?
    if (!claim) {
      return reject('Please enter a URL');
    }
    if (urlError) {
      return reject('Fix the url');
    }
    resolve();
  });
}

const createPublishMetadata = (claim, { type }, { title, thumbnail, description, license, nsfw }, publishInChannel, selectedChannel) => {
  let metadata = {
    name: claim,
    title,
    thumbnail,
    description,
    license,
    nsfw,
    type,
  };
  if (publishInChannel) {
    metadata['channelName'] = selectedChannel;
  }
  return metadata;
}

const createPublishFormData = (file, metadata) => {
  var fd = new FormData();
  // append file
  fd.append('file', file);
  // append metadata
  for (var key in metadata) {
    if (metadata.hasOwnProperty(key)) {
      fd.append(key, metadata[key]);
    }
  }
  return fd;
}

const makePublishRequest = (fd) => {
  console.log('making publish request');
  return new Promise((resolve, reject) => {
    const uri = '/api/claim/publish';
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('loadstart', () => {
      this.props.onPublishStatusChange(publishStates.LOAD_START, 'upload started');
    });
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded * 100) / e.total);
        console.log('progress:', percentage);
        this.props.onPublishStatusChange(publishStates.LOADING, `${percentage}%`);
      }
    }, false);
    xhr.upload.addEventListener('load', () => {
      console.log('loaded 100%');
      this.props.onPublishStatusChange(publishStates.PUBLISHING, null);
    }, false);
    xhr.open('POST', uri, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const response = JSON.parse(xhr.response);
        console.log('publish response:', response);
        if ((xhr.status === 200) && response.success) {
          this.props.history.push(`/${response.data.claimId}/${response.data.name}`);
          this.props.onFileClear();
        } else {
          this.props.onPublishStatusChange(publishStates.FAILED, response.message);
        }
      }
    };
    // Initiate a multipart/form-data upload
    xhr.send(fd);
  });
}

function * publishFile () {
  console.log('publishing file');
  const { publishInChannel, selectedChannel, file, claim, metadata, error: { url: urlError } } = yield select(selectPublishState);
  const { loggedInChannel } = yield select(selectChannelState);
  // validate the channel selection
  try {
    yield call(validateChannelSelection, publishInChannel, selectedChannel, loggedInChannel);
  } catch (error) {
    return yield put(updateError('channel', error));
  };
  // validate publish parameters
  try {
    yield call(validatePublishParams, file, claim, urlError);
  } catch (error) {
    return yield put(updateError('publishSubmit', error));
  }
  // create metadata
  const publishMetadata = createPublishMetadata(claim, file, metadata, publishInChannel, selectedChannel);
  // create form data
  const publishFormData = createPublishFormData(file, publishMetadata);
  // make the publish request
  try {
    yield call(makePublishRequest, publishFormData);
  } catch (error) {
    return yield put(updateError('publishSubmit', error));
  }
};

export function * watchPublishStart () {
  yield takeLatest(actions.PUBLISH_START, publishFile);
};
