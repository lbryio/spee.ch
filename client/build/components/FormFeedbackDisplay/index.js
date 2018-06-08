"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormFeedbackDisplay = function FormFeedbackDisplay(_ref) {
  var errorMessage = _ref.errorMessage,
      defaultMessage = _ref.defaultMessage;
  return _react.default.createElement("div", null, errorMessage ? _react.default.createElement("div", {
    className: 'form-feedback--failure'
  }, _react.default.createElement("p", {
    className: "small"
  }, errorMessage)) : _react.default.createElement("div", {
    className: 'form-feedback'
  }, _react.default.createElement("p", {
    className: "small"
  }, defaultMessage)));
};

var _default = FormFeedbackDisplay;
exports.default = _default;