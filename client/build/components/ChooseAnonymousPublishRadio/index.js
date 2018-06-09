"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChooseAnonymousPublishRadio = function ChooseAnonymousPublishRadio(_ref) {
  var publishInChannel = _ref.publishInChannel,
      toggleAnonymousPublish = _ref.toggleAnonymousPublish;
  return _react.default.createElement("div", null, _react.default.createElement("input", {
    type: "radio",
    name: "anonymous-or-channel",
    id: "anonymous-radio",
    className: "input-radio",
    value: "anonymous",
    checked: !publishInChannel,
    onChange: toggleAnonymousPublish
  }), _react.default.createElement("label", {
    className: "label-radio",
    htmlFor: "anonymous-radio"
  }, "Anonymous"));
};

var _default = ChooseAnonymousPublishRadio;
exports.default = _default;