"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Row = _interopRequireDefault(require("@components/Row"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetTitle = function AssetTitle(_ref) {
  var title = _ref.title;
  return _react.default.createElement(_Row.default, null, _react.default.createElement("h3", null, title));
};

var _default = AssetTitle;
exports.default = _default;