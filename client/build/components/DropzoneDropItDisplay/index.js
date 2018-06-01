"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropzoneDropItDisplay = function DropzoneDropItDisplay() {
  return _react.default.createElement("div", {
    className: "dropzone-dropit-display"
  }, _react.default.createElement("p", {
    className: "blue"
  }, "Drop it."));
};

var _default = DropzoneDropItDisplay;
exports.default = _default;