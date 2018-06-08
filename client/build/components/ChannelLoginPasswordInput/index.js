"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _RowLabeled = _interopRequireDefault(require("@components/RowLabeled"));

var _Label = _interopRequireDefault(require("@components/Label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelLoginPasswordInput = function ChannelLoginPasswordInput(_ref) {
  var channelPassword = _ref.channelPassword,
      handleInput = _ref.handleInput;
  return _react.default.createElement(_RowLabeled.default, {
    label: _react.default.createElement(_Label.default, {
      value: 'Password:'
    }),
    content: _react.default.createElement("div", {
      className: "input-area--primary"
    }, _react.default.createElement("input", {
      type: "password",
      id: "channel-login-password-input",
      name: "password",
      className: "input-text",
      placeholder: "",
      value: channelPassword,
      onChange: handleInput
    }))
  });
};

var _default = ChannelLoginPasswordInput;
exports.default = _default;