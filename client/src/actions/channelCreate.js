import * as actions from '../constants/channel_create_action_types';

// export action creators

export function updateChannelCreateName (name, value) {
  return {
    type: actions.CHANNEL_CREATE_UPDATE_NAME,
    data: {
      name,
      value,
    },
  };
}

export function updateChannelCreatePassword (name, value) {
  return {
    type: actions.CHANNEL_CREATE_UPDATE_PASSWORD,
    data: {
      name,
      value,
    },
  };
}

export function updateChannelCreateStatus (status) {
  return {
    type: actions.CHANNEL_CREATE_UPDATE_STATUS,
    data: status,
  };
}

export function updateChannelAvailability (channel) {
  return {
    type: actions.CHANNEL_AVAILABILITY,
    data: channel,
  };
}

export function createChannel () {
  return {
    type: actions.CHANNEL_CREATE,
  };
}
