"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SEO = _interopRequireDefault(require("@components/SEO"));

var _NavBar = _interopRequireDefault(require("@containers/NavBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var AboutPage =
/*#__PURE__*/
function (_React$Component) {
  function AboutPage() {
    _classCallCheck(this, AboutPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(AboutPage).apply(this, arguments));
  }

  _createClass(AboutPage, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_SEO.default, {
        pageTitle: 'About',
        pageUri: 'about'
      }), _react.default.createElement(_NavBar.default, null), _react.default.createElement("div", {
        className: "row row--padded"
      }, _react.default.createElement("div", {
        className: "column column--5 column--med-10 align-content-top"
      }, _react.default.createElement("div", {
        className: "column column--8 column--med-10"
      }, _react.default.createElement("p", {
        className: "pull-quote"
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
      }, "DOCUMENTATION")))), _react.default.createElement("div", {
        className: "column column--5 column--med-10 align-content-top"
      }, _react.default.createElement("div", {
        className: "column column--8 column--med-10"
      }, _react.default.createElement("p", null, "Spee.ch is a media-hosting site that reads from and publishes content to the ", _react.default.createElement("a", {
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
      }, "github issues"), ".")))));
    }
  }]);

  _inherits(AboutPage, _React$Component);

  return AboutPage;
}(_react.default.Component);

;
var _default = AboutPage;
exports.default = _default;