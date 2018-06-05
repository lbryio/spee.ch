"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonPrimaryJumbo = function ButtonPrimaryJumbo(_ref) {
  var value = _ref.value,
      onClickHandler = _ref.onClickHandler;
  return _react.default.createElement("button", {
    className: 'button button-primary button-primary--jumbo',
    onClick: onClickHandler
  }, value);
};

var _default = ButtonPrimaryJumbo;
exports.default = _default;