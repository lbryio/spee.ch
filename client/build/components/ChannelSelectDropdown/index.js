"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _publish_channel_select_states = require("../../constants/publish_channel_select_states");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelSelectDropdown = function ChannelSelectDropdown(_ref) {
  var selectedChannel = _ref.selectedChannel,
      handleSelection = _ref.handleSelection,
      loggedInChannelName = _ref.loggedInChannelName;
  return _react.default.createElement("select", {
    id: "channel-name-select",
    className: "select select--arrow",
    value: selectedChannel,
    onChange: handleSelection
  }, loggedInChannelName && _react.default.createElement("option", {
    value: loggedInChannelName
  }, loggedInChannelName), _react.default.createElement("option", {
    value: _publish_channel_select_states.LOGIN
  }, "Existing"), _react.default.createElement("option", {
    value: _publish_channel_select_states.CREATE
  }, "New"));
};

var _default = ChannelSelectDropdown;
exports.default = _default;