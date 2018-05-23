"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveStatusBar = function ActiveStatusBar() {
  return _react.default.createElement("span", {
    className: "progress-bar progress-bar--active"
  }, "| ");
};

var _default = ActiveStatusBar;
exports.default = _default;