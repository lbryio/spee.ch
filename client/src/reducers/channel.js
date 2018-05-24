import * as actions from '../constants/channel_action_types';

const initialState = {
  loggedInChannel: {
    name   : null,
    shortId: null,
    longId : null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.CHANNEL_UPDATE:
      return Object.assign({}, state, {
        loggedInChannel: action.data,
      });
    default:
      return state;
  }
}
