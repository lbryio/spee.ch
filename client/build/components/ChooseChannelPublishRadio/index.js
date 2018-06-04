"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChooseChannelPublishRadio = function ChooseChannelPublishRadio(_ref) {
  var publishInChannel = _ref.publishInChannel,
      toggleAnonymousPublish = _ref.toggleAnonymousPublish;
  return _react.default.createElement("div", null, _react.default.createElement("input", {
    type: "radio",
    name: "anonymous-or-channel",
    id: "channel-radio",
    className: "input-radio",
    value: "in a channel",
    checked: publishInChannel,
    onChange: toggleAnonymousPublish
  }), _react.default.createElement("label", {
    className: "label label--pointer",
    htmlFor: "channel-radio"
  }, "In a channel"));
};

var _default = ChooseChannelPublishRadio;
exports.default = _default;