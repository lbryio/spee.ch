"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AboutSpeechTwo = function AboutSpeechTwo() {
  return _react.default.createElement("div", null, _react.default.createElement("p", null, "Spee.ch is a media-hosting site that reads from and publishes content to the ", _react.default.createElement("a", {
    className: "link--primary",
    href: "https://lbry.io"
  }, "LBRY"), " blockchain."), _react.default.createElement("p", null, "Spee.ch is a hosting service, but with the added benefit that it stores your content on a decentralized network of computers -- the ", _react.default.createElement("a", {
    className: "link--primary",
    href: "https://lbry.io/get"
  }, "LBRY"), " network.  This means that your images are stored in multiple locations without a single point of failure."), _react.default.createElement("h3", null, "Contribute"), _react.default.createElement("p", null, "If you have an idea for your own spee.ch-like site on top of LBRY, fork our ", _react.default.createElement("a", {
    className: "link--primary",
    href: "https://github.com/lbryio/spee.ch"
  }, "github repo"), " and go to town!"), _react.default.createElement("p", null, "If you want to improve spee.ch, join our ", _react.default.createElement("a", {
    className: "link--primary",
    href: "https://chat.lbry.io"
  }, "discord channel"), " or solve one of our ", _react.default.createElement("a", {
    className: "link--primary",
    href: "https://github.com/lbryio/spee.ch/issues"
  }, "github issues"), "."));
};

var _default = AboutSpeechTwo;
exports.default = _default;