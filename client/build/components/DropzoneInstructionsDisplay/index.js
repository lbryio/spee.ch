"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormFeedbackDisplay = _interopRequireDefault(require("@components/FormFeedbackDisplay"));

var _Row = _interopRequireDefault(require("@components/Row"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropzoneInstructionsDisplay = function DropzoneInstructionsDisplay(_ref) {
  var fileError = _ref.fileError;
  return _react.default.createElement("div", {
    className: 'dropzone-instructions-display'
  }, _react.default.createElement(_Row.default, null, _react.default.createElement("p", {
    className: 'text--large'
  }, "Drag & drop image or video here to publish")), _react.default.createElement(_Row.default, null, _react.default.createElement("p", {
    className: 'text--small'
  }, "OR")), fileError ? _react.default.createElement("div", null, _react.default.createElement(_Row.default, null, _react.default.createElement("p", {
    className: 'text--large text--underline'
  }, "CHOOSE FILE")), _react.default.createElement(_FormFeedbackDisplay.default, {
    errorMessage: fileError,
    defaultMessage: false
  })) : _react.default.createElement("p", {
    className: 'text--large text--underline'
  }, "CHOOSE FILE"));
};

var _default = DropzoneInstructionsDisplay;
exports.default = _default;