"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Label = function Label(_ref) {
  var value = _ref.value;
  return _react.default.createElement("label", {
    className: "label"
  }, value);
};

var _default = Label;
exports.default = _default;