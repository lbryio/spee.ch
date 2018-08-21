import * as actions from '../constants/publish_action_types';
import { LOGIN } from '../constants/publish_channel_select_states';

import siteConfig from '@config/siteConfig.json';

// parse inputs
let disabledConfig = false;
let disabledMessageConfig = 'none';
let thumbnailChannel = '';
let thumbnailChannelId = '';
if (siteConfig) {
  if (siteConfig.publishing) {
    disabledConfig = siteConfig.publishing.disabled;
    disabledMessageConfig = siteConfig.publishing.disabledMessage;
    thumbnailChannel = siteConfig.publishing.thumbnailChannel;
    thumbnailChannelId = siteConfig.publishing.thumbnailChannelId;
  }
}

// create initial state
const initialState = {
  disabled          : disabledConfig,
  disabledMessage   : disabledMessageConfig,
  publishInChannel  : false,
  selectedChannel   : LOGIN,
  showMetadataInputs: false,
  status            : {
    status : null,
    message: null,
  },
  error: {
    file   : null,
    url    : null,
    channel: null,
  },
  file    : null,
  claim   : '',
  metadata: {
    title      : '',
    description: '',
    license    : '',
    nsfw       : false,
  },
  isUpdate : false,
  thumbnail: null,
  thumbnailChannel,
  thumbnailChannelId,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.FILE_SELECTED:
      return Object.assign({}, state.isUpdate ? state : initialState, {  // note: clears to initial state
        file: action.data,
      });
    case actions.FILE_CLEAR:
      return initialState;
    case actions.METADATA_UPDATE:
      return Object.assign({}, state, {
        metadata: Object.assign({}, state.metadata, {
          [action.data.name]: action.data.value,
        }),
      });
    case actions.CLAIM_UPDATE:
      return Object.assign({}, state, {
        claim: action.data,
      });
    case actions.SET_PUBLISH_IN_CHANNEL:
      return Object.assign({}, state, {
        publishInChannel: action.channel,
      });
    case actions.PUBLISH_STATUS_UPDATE:
      return Object.assign({}, state, {
        status: action.data,
      });
    case actions.ERROR_UPDATE:
      return Object.assign({}, state, {
        error: Object.assign({}, state.error, {
          [action.data.name]: action.data.value,
        }),
      });
    case actions.SELECTED_CHANNEL_UPDATE:
      return Object.assign({}, state, {
        selectedChannel: action.data,
      });
    case actions.TOGGLE_METADATA_INPUTS:
      return Object.assign({}, state, {
        showMetadataInputs: action.data,
      });
    case actions.THUMBNAIL_NEW:
      return Object.assign({}, state, {
        thumbnail: action.data,
      });
    case actions.SET_UPDATE_TRUE:
      return Object.assign({}, state, {
        isUpdate: true,
      });
    default:
      return state;
  }
};
