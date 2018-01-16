import * as actions from '../constants/action_types';

const initialState = {
  loggedInChannel: {
    name   : null,
    shortId: null,
    longId : null,
  },
  publishInChannel: false,
  status          : {
    status : null,
    message: null,
  },
  error: {
    file         : null,
    url          : null,
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
};

/*
Reducers describe how the application's state changes in response to actions
*/

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.FILE_SELECTED:
      return Object.assign({}, state, {
        file: action.file,
      });
    case actions.FILE_CLEAR:
      return initialState;
    case actions.METADATA_UPDATE:
      return Object.assign({}, state, {
        metadata: Object.assign({}, state.metadata, {
          [action.name]: action.value,
        }),
      });
    case actions.CLAIM_UPDATE:
      return Object.assign({}, state, {
        claim: action.value,
      });
    case actions.CHANNEL_UPDATE:
      return Object.assign({}, state, {
        loggedInChannel: {
          name   : action.name,
          shortId: action.shortId,
          longId : action.longId,
        },
      });
    case actions.SET_PUBLISH_IN_CHANNEL:
      return Object.assign({}, state, {
        publishInChannel: action.channel,
      });
    case actions.PUBLISH_STATUS_UPDATE:
      return Object.assign({}, state, {
        status: Object.assign({}, state.status, {
          status : action.status,
          message: action.message,
        }),
      });
    case actions.ERROR_UPDATE:
      return Object.assign({}, state, {
        error: Object.assign({}, state.error, {
          [action.name]: action.value,
        }),
      });
    default:
      return state;
  }
}
