import * as actions from 'constants/publish_action_types';
import { LOGIN } from 'constants/publish_channel_select_states';
const { publish } = require('../../config/speechConfig.js');

const initialState = {
  publishInChannel  : false,
  selectedChannel   : LOGIN,
  showMetadataInputs: false,
  status            : {
    status : null,
    message: null,
  },
  error: {
    file         : null,
    url          : null,
    channel      : null,
    publishSubmit: null,
  },
  file    : null,
  claim   : '',
  metadata: {
    title      : '',
    thumbnail  : '',
    description: '',
    license    : '',
    nsfw       : false,
  },
  thumbnail: {
    channel       : publish.thumbnailChannel,
    claim         : null,
    url           : null,
    potentialFiles: [],  // should be named 'thumbnailFiles' or something
    selectedFile  : null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.FILE_SELECTED:
      return Object.assign({}, state, {
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
    case actions.THUMBNAIL_CLAIM_UPDATE:
      return Object.assign({}, state, {
        thumbnail: Object.assign({}, state.thumbnail, {
          claim: action.claim,
          url  : action.url,
        }),
      });
    case actions.THUMBNAIL_FILES_UPDATE:
      return Object.assign({}, state, {
        thumbnail: Object.assign({}, state.thumbnail, {
          potentialFiles: [action.fileOne, action.fileTwo, action.fileThree],
        }),
      });
    case actions.THUMBNAIL_FILE_SELECT:
      return Object.assign({}, state, {
        thumbnail: Object.assign({}, state.thumbnail, {
          selectedFile: action.file,
        }),
      });
    default:
      return state;
  }
}
