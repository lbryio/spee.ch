"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Label = _interopRequireDefault(require("@components/Label"));

var _RowLabeled = _interopRequireDefault(require("@components/RowLabeled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelCreatePasswordInput = function ChannelCreatePasswordInput(_ref) {
  var value = _ref.value,
      handlePasswordInput = _ref.handlePasswordInput;
  return _react.default.createElement(_RowLabeled.default, {
    label: _react.default.createElement(_Label.default, {
      value: 'Password:'
    }),
    content: _react.default.createElement("div", {
      className: "input-area"
    }, _react.default.createElement("input", {
      type: "password",
      name: "password",
      className: "input-text",
      placeholder: "",
      value: value,
      onChange: handlePasswordInput
    }))
  });
};

var _default = ChannelCreatePasswordInput;
exports.default = _default;