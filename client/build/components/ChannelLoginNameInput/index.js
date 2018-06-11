"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _RowLabeled = _interopRequireDefault(require("@components/RowLabeled"));

var _Label = _interopRequireDefault(require("@components/Label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelLoginNameInput = function ChannelLoginNameInput(_ref) {
  var channelName = _ref.channelName,
      handleInput = _ref.handleInput;
  return _react.default.createElement(_RowLabeled.default, {
    label: _react.default.createElement(_Label.default, {
      value: 'Name:'
    }),
    content: _react.default.createElement("div", {
      className: "input-area"
    }, _react.default.createElement("span", null, "@"), _react.default.createElement("input", {
      type: "text",
      id: "channel-login-name-input",
      className: "input-text",
      name: "name",
      placeholder: "Your Channel Name",
      value: channelName,
      onChange: handleInput
    }))
  });
};

var _default = ChannelLoginNameInput;
exports.default = _default;