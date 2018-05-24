"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetTitle = function AssetTitle(_ref) {
  var title = _ref.title;
  return _react.default.createElement("div", null, _react.default.createElement("span", {
    className: "text--large"
  }, title));
};

var _default = AssetTitle;
exports.default = _default;