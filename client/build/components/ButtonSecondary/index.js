"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonPrimary = function ButtonPrimary(_ref) {
  var value = _ref.value,
      onClickHandler = _ref.onClickHandler;
  return _react.default.createElement("button", {
    className: 'button button--secondary',
    onClick: onClickHandler
  }, value);
};

var _default = ButtonPrimary;
exports.default = _default;