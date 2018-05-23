"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChannelCreateName = updateChannelCreateName;
exports.updateChannelCreatePassword = updateChannelCreatePassword;
exports.updateChannelCreateStatus = updateChannelCreateStatus;
exports.updateChannelAvailability = updateChannelAvailability;
exports.createChannel = createChannel;

var actions = _interopRequireWildcard(require("../constants/channel_create_action_types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// export action creators
function updateChannelCreateName(name, value) {
  return {
    type: actions.CHANNEL_CREATE_UPDATE_NAME,
    data: {
      name: name,
      value: value
    }
  };
}

function updateChannelCreatePassword(name, value) {
  return {
    type: actions.CHANNEL_CREATE_UPDATE_PASSWORD,
    data: {
      name: name,
      value: value
    }
  };
}

function updateChannelCreateStatus(status) {
  return {
    type: actions.CHANNEL_CREATE_UPDATE_STATUS,
    data: status
  };
}

function updateChannelAvailability(channel) {
  return {
    type: actions.CHANNEL_AVAILABILITY,
    data: channel
  };
}

function createChannel() {
  return {
    type: actions.CHANNEL_CREATE
  };
}