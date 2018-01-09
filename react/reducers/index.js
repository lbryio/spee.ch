import {FILE_CLEAR, FILE_SELECTED} from '../actions';

const DROPZONE = 'DROPZONE';

const initialState = {
  showComponent         : DROPZONE,
  loggedInChannelName   : null,
  loggedInChannelShortId: null,
  publishToChannel      : false,
  publishStatus         : null,
  error                 : null,
  file                  : null,
  title                 : '',
  claim                 : '',
  thumbnail             : '',
  description           : '',
  license               : '',
  nsfw                  : '',
};

/*
Reducers describe how the application's state changes in response to actions
*/

export default function (state = initialState, action) {
  switch (action.type) {
    case FILE_SELECTED:
      return Object.assign({}, state, {
        file: action.payload,
      });
    case FILE_CLEAR:
      return initialState;
    default:
      return state;
  }
}
