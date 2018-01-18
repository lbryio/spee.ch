import * as actions from 'constants/action_types';

// export action creators

export function updateLoggedInChannel (name, shortId, longId) {
  return {
    type: actions.CHANNEL_UPDATE,
    name,
    shortId,
    longId,
  };
};
