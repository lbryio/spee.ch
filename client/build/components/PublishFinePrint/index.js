"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PublishFinePrint = function PublishFinePrint() {
  return _react.default.createElement("p", {
    className: "extra-small secondary"
  }, "By clicking 'Publish', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. ", _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "https://lbry.io/learn"
  }, "Read more."));
};

var _default = PublishFinePrint;
exports.default = _default;