"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var AssetInfo =
/*#__PURE__*/
function (_React$Component) {
  function AssetInfo(props) {
    var _this;

    _classCallCheck(this, AssetInfo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AssetInfo).call(this, props));
    _this.copyToClipboard = _this.copyToClipboard.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AssetInfo, [{
    key: "copyToClipboard",
    value: function copyToClipboard(event) {
      var elementToCopy = event.target.dataset.elementtocopy;
      var element = document.getElementById(elementToCopy);
      element.select();

      try {
        document.execCommand('copy');
      } catch (err) {
        this.setState({
          error: 'Oops, unable to copy'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$asset = this.props.asset,
          shortId = _this$props$asset.shortId,
          _this$props$asset$cla = _this$props$asset.claimData,
          channelName = _this$props$asset$cla.channelName,
          certificateId = _this$props$asset$cla.certificateId,
          description = _this$props$asset$cla.description,
          name = _this$props$asset$cla.name,
          claimId = _this$props$asset$cla.claimId,
          fileExt = _this$props$asset$cla.fileExt,
          contentType = _this$props$asset$cla.contentType,
          thumbnail = _this$props$asset$cla.thumbnail,
          host = _this$props$asset$cla.host;
      return _react.default.createElement("div", null, channelName && _react.default.createElement("div", {
        className: "row row--padded row--wide row--no-top"
      }, _react.default.createElement("div", {
        className: "column column--2 column--med-10"
      }, _react.default.createElement("span", {
        className: "text"
      }, "Channel:")), _react.default.createElement("div", {
        className: "column column--8 column--med-10"
      }, _react.default.createElement("span", {
        className: "text"
      }, _react.default.createElement(_reactRouterDom.Link, {
        to: "/".concat(channelName, ":").concat(certificateId)
      }, channelName)))), description && _react.default.createElement("div", {
        className: "row row--padded row--wide row--no-top"
      }, _react.default.createElement("span", {
        className: "text"
      }, description)), _react.default.createElement("div", {
        id: "show-share-buttons"
      }, _react.default.createElement("div", {
        className: "row row--padded row--wide row--no-top"
      }, _react.default.createElement("div", {
        className: "column column--2 column--med-10"
      }, _react.default.createElement("span", {
        className: "text"
      }, "Share:")), _react.default.createElement("div", {
        className: "column column--8 column--med-10"
      }, _react.default.createElement("div", {
        className: "row row--short row--wide flex-container--row flex-container--space-between-bottom flex-container--wrap"
      }, _react.default.createElement("a", {
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
      }, "reddit"))))), _react.default.createElement("div", {
        className: "row row--padded row--wide row--no-top"
      }, _react.default.createElement("div", {
        id: "show-short-link"
      }, _react.default.createElement("div", {
        className: "column column--2 column--med-10"
      }, _react.default.createElement("span", {
        className: "text"
      }, "Link:")), _react.default.createElement("div", {
        className: "column column--8 column--med-10"
      }, _react.default.createElement("div", {
        className: "row row--short row--wide"
      }, _react.default.createElement("div", {
        className: "column column--7"
      }, _react.default.createElement("div", {
        className: "input-error",
        id: "input-error-copy-short-link",
        hidden: "true"
      }, "error here"), _react.default.createElement("input", {
        type: "text",
        id: "short-link",
        className: "input-disabled input-text--full-width",
        readOnly: true,
        spellCheck: "false",
        value: "".concat(host, "/").concat(shortId, "/").concat(name, ".").concat(fileExt),
        onClick: this.select
      })), _react.default.createElement("div", {
        className: "column column--1"
      }), _react.default.createElement("div", {
        className: "column column--2"
      }, _react.default.createElement("button", {
        className: "button--primary button--wide",
        "data-elementtocopy": "short-link",
        onClick: this.copyToClipboard
      }, "copy"))))), _react.default.createElement("div", {
        id: "show-embed-code"
      }, _react.default.createElement("div", {
        className: "column column--2 column--med-10"
      }, _react.default.createElement("span", {
        className: "text"
      }, "Embed:")), _react.default.createElement("div", {
        className: "column column--8 column--med-10"
      }, _react.default.createElement("div", {
        className: "row row--short row--wide"
      }, _react.default.createElement("div", {
        className: "column column--7"
      }, _react.default.createElement("div", {
        className: "input-error",
        id: "input-error-copy-embed-text",
        hidden: "true"
      }, "error here"), contentType === 'video/mp4' ? _react.default.createElement("input", {
        type: "text",
        id: "embed-text",
        className: "input-disabled input-text--full-width",
        readOnly: true,
        onClick: this.select,
        spellCheck: "false",
        value: "<video width=\"100%\" controls poster=\"".concat(thumbnail, "\" src=\"").concat(host, "/").concat(claimId, "/").concat(name, ".").concat(fileExt, "\"/></video>")
      }) : _react.default.createElement("input", {
        type: "text",
        id: "embed-text",
        className: "input-disabled input-text--full-width",
        readOnly: true,
        onClick: this.select,
        spellCheck: "false",
        value: "<img src=\"".concat(host, "/").concat(claimId, "/").concat(name, ".").concat(fileExt, "\"/>")
      })), _react.default.createElement("div", {
        className: "column column--1"
      }), _react.default.createElement("div", {
        className: "column column--2"
      }, _react.default.createElement("button", {
        className: "button--primary button--wide",
        "data-elementtocopy": "embed-text",
        onClick: this.copyToClipboard
      }, "copy")))))), _react.default.createElement("div", {
        className: "flex-container--row flex-container--space-between-bottom"
      }, _react.default.createElement(_reactRouterDom.Link, {
        className: "link--primary",
        to: "/".concat(shortId, "/").concat(name, ".").concat(fileExt)
      }, _react.default.createElement("span", {
        className: "text"
      }, "Direct Link")), _react.default.createElement("a", {
        className: "link--primary",
        href: "".concat(host, "/").concat(claimId, "/").concat(name, ".").concat(fileExt),
        download: name
      }, "Download"), _react.default.createElement("a", {
        className: "link--primary",
        target: "_blank",
        href: "https://lbry.io/dmca"
      }, "Report")));
    }
  }]);

  _inherits(AssetInfo, _React$Component);

  return AssetInfo;
}(_react.default.Component);

;
var _default = AssetInfo;
exports.default = _default;