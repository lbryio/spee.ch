"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AboutChannels = function AboutChannels() {
  return _react.default.createElement("div", null, _react.default.createElement("p", null, "Channels allow you to publish and group content under an identity. You can create a channel for yourself, or share one with like-minded friends.  You can create 1 channel, or 100, so whether you're ", _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "/@catalonia2017:43dcf47163caa21d8404d9fe9b30f78ef3e146a8"
  }, "documenting important events"), ", or making a public repository for ", _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "/@catGifs"
  }, "cat gifs"), " (password: '1234'), try creating a channel for it!"));
};

var _default = AboutChannels;
exports.default = _default;