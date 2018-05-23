import * as actions from '../constants/channel_action_types';

// export action creators

export function updateLoggedInChannel (name, shortId, longId) {
  return {
    type: actions.CHANNEL_UPDATE,
    data: {
      name,
      shortId,
      longId,
    },
  };
}

export function checkForLoggedInChannel () {
  return {
    type: actions.CHANNEL_LOGIN_CHECK,
  };
}

export function logOutChannel () {
  return {
    type: actions.CHANNEL_LOGOUT,
  };
}
