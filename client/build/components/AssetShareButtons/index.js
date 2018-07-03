"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetShareButtons = function AssetShareButtons(_ref) {
  var host = _ref.host,
      name = _ref.name,
      shortId = _ref.shortId;
  return _react.default.createElement(SpaceBetween, null, _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "https://twitter.com/intent/tweet?text=".concat(host, "/").concat(shortId, "/").concat(name)
  }, "twitter"), _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "https://www.facebook.com/sharer/sharer.php?u=".concat(host, "/").concat(shortId, "/").concat(name)
  }, "facebook"), _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "http://tumblr.com/widgets/share/tool?canonicalUrl=".concat(host, "/").concat(shortId, "/").concat(name)
  }, "tumblr"), _react.default.createElement("a", {
    className: "link--primary",
    target: "_blank",
    href: "https://www.reddit.com/submit?url=".concat(host, "/").concat(shortId, "/").concat(name, "&title=").concat(name)
  }, "reddit"));
};

var _default = AssetShareButtons;
exports.default = _default;