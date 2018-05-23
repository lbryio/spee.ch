"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCreateChannelPasswordInput = exports.validateCreateChannelNameInput = exports.validateNoPublishErrors = exports.validateChannelSelection = void 0;

var validateChannelSelection = function validateChannelSelection(publishInChannel, selectedChannel, loggedInChannel) {
  if (publishInChannel && selectedChannel !== loggedInChannel.name) {
    throw new Error('Log in to a channel or select Anonymous');
  }
};

exports.validateChannelSelection = validateChannelSelection;

var validateNoPublishErrors = function validateNoPublishErrors(_ref) {
  var file = _ref.file,
      url = _ref.url,
      channel = _ref.channel;

  if (file || url || channel) {
    throw new Error('Fix the errors identified in red');
  }
};

exports.validateNoPublishErrors = validateNoPublishErrors;

var validateCreateChannelNameInput = function validateCreateChannelNameInput(_ref2) {
  var value = _ref2.value,
      error = _ref2.error;

  if (!value) {
    throw new Error('Please enter a channel name');
  }

  if (error) {
    throw new Error(error);
  }
};

exports.validateCreateChannelNameInput = validateCreateChannelNameInput;

var validateCreateChannelPasswordInput = function validateCreateChannelPasswordInput(_ref3) {
  var value = _ref3.value,
      error = _ref3.error;

  if (!value) {
    throw new Error('Please enter a password');
  }

  if (error) {
    throw new Error(error);
  }
};

exports.validateCreateChannelPasswordInput = validateCreateChannelPasswordInput;