"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _AboutSpeechOne = _interopRequireDefault(require("@components/AboutSpeechOne"));

var _AboutSpeechTwo = _interopRequireDefault(require("@components/AboutSpeechTwo"));

var _HorizontalSplit = _interopRequireDefault(require("@components/HorizontalSplit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AboutPageContent = function AboutPageContent() {
  return _react.default.createElement(_HorizontalSplit.default, {
    leftSide: _react.default.createElement(_AboutSpeechOne.default, null),
    rightSide: _react.default.createElement(_AboutSpeechTwo.default, null)
  });
};

var _default = AboutPageContent;
exports.default = _default;