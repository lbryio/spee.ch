"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pageTitle = require("../../utils/pageTitle");

var _metaTags = require("../../utils/metaTags");

var _canonicalLink = require("../../utils/canonicalLink");

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

var SEO =
/*#__PURE__*/
function (_React$Component) {
  function SEO() {
    _classCallCheck(this, SEO);

    return _possibleConstructorReturn(this, _getPrototypeOf(SEO).apply(this, arguments));
  }

  _createClass(SEO, [{
    key: "render",
    value: function render() {
      // props from state
      var _this$props = this.props,
          defaultDescription = _this$props.defaultDescription,
          defaultThumbnail = _this$props.defaultThumbnail,
          siteDescription = _this$props.siteDescription,
          siteHost = _this$props.siteHost,
          siteTitle = _this$props.siteTitle,
          siteTwitter = _this$props.siteTwitter; // props from parent

      var _this$props2 = this.props,
          asset = _this$props2.asset,
          channel = _this$props2.channel,
          pageUri = _this$props2.pageUri;
      var pageTitle = this.props.pageTitle; // create page title, tags, and canonical link

      pageTitle = (0, _pageTitle.createPageTitle)(siteTitle, pageTitle);
      var metaTags = (0, _metaTags.createMetaTags)(siteDescription, siteHost, siteTitle, siteTwitter, asset, channel, defaultDescription, defaultThumbnail);
      var canonicalLink = (0, _canonicalLink.createCanonicalLink)(asset, channel, pageUri, siteHost); // render results

      return _react.default.createElement(_reactHelmet.default, {
        title: pageTitle,
        meta: metaTags,
        link: [{
          rel: 'canonical',
          href: canonicalLink
        }]
      });
    }
  }]);

  _inherits(SEO, _React$Component);

  return SEO;
}(_react.default.Component);

;
SEO.propTypes = {
  pageTitle: _propTypes.default.string,
  pageUri: _propTypes.default.string,
  channel: _propTypes.default.object,
  asset: _propTypes.default.object
};
var _default = SEO;
exports.default = _default;