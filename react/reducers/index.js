import {
  CHANNEL_UPDATE, CLAIM_UPDATE, FILE_CLEAR, FILE_SELECTED, METADATA_UPDATE,
  SET_PUBLISH_IN_CHANNEL,
} from '../actions';

const initialState = {
  loggedInChannel: {
    name   : null,
    shortId: null,
    longId : null,
  },
  publishInChannel: false,
  publishStatus   : null,
  error           : null,
  file            : null,
  claim           : '',
  metadata        : {
    title      : '',
    thumbnail  : '',
    description: '',
    license    : '',
    nsfw       : '',
  },
};

/*
Reducers describe how the application's state changes in response to actions
*/

export default function (state = initialState, action) {
  switch (action.type) {
    case FILE_SELECTED:
      return Object.assign({}, state, {
        file: action.file,
      });
    case FILE_CLEAR:
      return initialState;
    case METADATA_UPDATE:
      console.log(`reducer for ${action.name} ${action.value}`);
      return Object.assign({}, state, {
        metadata: {
          [action.name]: action.value,
        },
      });
    case CLAIM_UPDATE:
      return Object.assign({}, state, {
        claim: action.value,
      });
    case CHANNEL_UPDATE:
      return Object.assign({}, state, {
        loggedInChannel: {
          name   : action.name,
          shortId: action.shortId,
          longId : action.longId,
        },
      });
    case SET_PUBLISH_IN_CHANNEL:
      return Object.assign({}, state, {
        publishInChannel: action.value,
      });
    default:
      return state;
  }
}
