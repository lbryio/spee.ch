"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Label = _interopRequireDefault(require("@components/Label"));

var _PublishDetailsRow = _interopRequireDefault(require("@components/PublishDetailsRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelCreateNameInput = function ChannelCreateNameInput(_ref) {
  var value = _ref.value,
      error = _ref.error,
      handleNameInput = _ref.handleNameInput;
  return _react.default.createElement(_PublishDetailsRow.default, {
    label: _react.default.createElement(_Label.default, {
      value: 'Name:'
    }),
    content: _react.default.createElement("div", {
      className: "input-area--primary"
    }, _react.default.createElement("span", null, "@"), _react.default.createElement("input", {
      type: "text",
      name: "channel",
      className: "input-text",
      placeholder: "exampleChannelName",
      value: value,
      onChange: handleNameInput
    }), value && !error && _react.default.createElement("span", {
      className: "info-message--success span--absolute"
    }, "\u2713"), error && _react.default.createElement("span", {
      className: "info-message--failure span--absolute"
    }, "\u2716"))
  });
};

var _default = ChannelCreateNameInput;
exports.default = _default;