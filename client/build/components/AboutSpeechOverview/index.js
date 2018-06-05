"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AboutSpeechOverview = function AboutSpeechOverview() {
  return _react.default.createElement("div", null, _react.default.createElement("p", {
    className: "text--pull-quote"
  }, "Spee.ch is an open-source project.  Please contribute to the existing site, or fork it and make your own."), _react.default.createElement("p", null, _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "https://twitter.com/spee_ch"
  }, "TWITTER")), _react.default.createElement("p", null, _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "https://github.com/lbryio/spee.ch"
  }, "GITHUB")), _react.default.createElement("p", null, _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "https://discord.gg/YjYbwhS"
  }, "DISCORD CHANNEL")), _react.default.createElement("p", null, _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "https://github.com/lbryio/spee.ch/blob/master/README.md"
  }, "DOCUMENTATION")));
};

var _default = AboutSpeechOverview;
exports.default = _default;