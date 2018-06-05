"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Label = _interopRequireDefault(require("@components/Label"));

var _PublishDetailsRow = _interopRequireDefault(require("@components/PublishDetailsRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelCreatePasswordInput = function ChannelCreatePasswordInput(_ref) {
  var value = _ref.value,
      handlePasswordInput = _ref.handlePasswordInput;
  return _react.default.createElement(_PublishDetailsRow.default, {
    label: _react.default.createElement(_Label.default, {
      value: 'Password:'
    }),
    content: _react.default.createElement("div", {
      className: "input-area--primary"
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