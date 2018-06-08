"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropzoneInstructionsDisplay = function DropzoneInstructionsDisplay(_ref) {
  var fileError = _ref.fileError;
  return _react.default.createElement("div", {
    className: "dropzone-instructions-display"
  }, _react.default.createElement("p", {
    className: 'large'
  }, "Drag & drop image or video here to publish"), _react.default.createElement("p", {
    className: "small"
  }, "OR"), _react.default.createElement("p", {
    className: "large underline"
  }, "CHOOSE FILE"), _react.default.createElement("p", {
    className: "small form-feedback--failure"
  }, fileError));
};

var _default = DropzoneInstructionsDisplay;
exports.default = _default;