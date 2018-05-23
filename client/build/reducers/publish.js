"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var actions = _interopRequireWildcard(require("../constants/publish_action_types"));

var _publish_channel_select_states = require("../constants/publish_channel_select_states");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var customizedPublishReducer = function customizedPublishReducer(siteConfig) {
  // parse inputs
  var disabledConfig = false;
  var disabledMessageConfig = 'none';
  var thumbnailChannel = '';
  var thumbnailChannelId = '';

  if (siteConfig) {
    if (siteConfig.publishing) {
      disabledConfig = siteConfig.publishing.disabled;
      disabledMessageConfig = siteConfig.publishing.disabledMessage;
      thumbnailChannel = siteConfig.publishing.thumbnailChannel;
      thumbnailChannelId = siteConfig.publishing.thumbnailChannelId;
    }
  } // create initial state


  var initialState = {
    disabled: disabledConfig,
    disabledMessage: disabledMessageConfig,
    publishInChannel: false,
    selectedChannel: _publish_channel_select_states.LOGIN,
    showMetadataInputs: false,
    status: {
      status: null,
      message: null
    },
    error: {
      file: null,
      url: null,
      channel: null
    },
    file: null,
    claim: '',
    metadata: {
      title: '',
      description: '',
      license: '',
      nsfw: false
    },
    thumbnail: null,
    thumbnailChannel: thumbnailChannel,
    thumbnailChannelId: thumbnailChannelId
  };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case actions.FILE_SELECTED:
        return Object.assign({}, initialState, {
          // note: clears to initial state
          file: action.data
        });

      case actions.FILE_CLEAR:
        return initialState;

      case actions.METADATA_UPDATE:
        return Object.assign({}, state, {
          metadata: Object.assign({}, state.metadata, _defineProperty({}, action.data.name, action.data.value))
        });

      case actions.CLAIM_UPDATE:
        return Object.assign({}, state, {
          claim: action.data
        });

      case actions.SET_PUBLISH_IN_CHANNEL:
        return Object.assign({}, state, {
          publishInChannel: action.channel
        });

      case actions.PUBLISH_STATUS_UPDATE:
        return Object.assign({}, state, {
          status: action.data
        });

      case actions.ERROR_UPDATE:
        return Object.assign({}, state, {
          error: Object.assign({}, state.error, _defineProperty({}, action.data.name, action.data.value))
        });

      case actions.SELECTED_CHANNEL_UPDATE:
        return Object.assign({}, state, {
          selectedChannel: action.data
        });

      case actions.TOGGLE_METADATA_INPUTS:
        return Object.assign({}, state, {
          showMetadataInputs: action.data
        });

      case actions.THUMBNAIL_NEW:
        return Object.assign({}, state, {
          thumbnail: action.data
        });

      default:
        return state;
    }
  };
};

var _default = customizedPublishReducer;
exports.default = _default;