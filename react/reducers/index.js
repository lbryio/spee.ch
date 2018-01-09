import {FILE_CLEAR, FILE_SELECTED, METADATA_UPDATE} from '../actions';

const initialState = {
  loggedInChannelName   : null,
  loggedInChannelShortId: null,
  publishToChannel      : false,
  publishStatus         : null,
  error                 : null,
  file                  : null,
  metadata              : {
    title      : '',
    claim      : '',
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
      })
    default:
      return state;
  }
}
