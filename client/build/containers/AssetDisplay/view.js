"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ProgressBar = _interopRequireDefault(require("@components/ProgressBar"));

var _asset_display_states = require("../../constants/asset_display_states");

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

var AssetDisplay =
/*#__PURE__*/
function (_React$Component) {
  function AssetDisplay() {
    _classCallCheck(this, AssetDisplay);

    return _possibleConstructorReturn(this, _getPrototypeOf(AssetDisplay).apply(this, arguments));
  }

  _createClass(AssetDisplay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props$asset$cla = this.props.asset.claimData,
          name = _this$props$asset$cla.name,
          claimId = _this$props$asset$cla.claimId;
      this.props.onFileRequest(name, claimId);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          status = _this$props.status,
          error = _this$props.error,
          _this$props$asset$cla2 = _this$props.asset.claimData,
          name = _this$props$asset$cla2.name,
          claimId = _this$props$asset$cla2.claimId,
          contentType = _this$props$asset$cla2.contentType,
          fileExt = _this$props$asset$cla2.fileExt,
          thumbnail = _this$props$asset$cla2.thumbnail;
      return _react.default.createElement("div", {
        className: 'asset-display'
      }, status === _asset_display_states.LOCAL_CHECK && _react.default.createElement("div", null, _react.default.createElement("p", null, "Checking to see if Spee.ch has your asset locally...")), status === _asset_display_states.UNAVAILABLE && _react.default.createElement("div", null, _react.default.createElement("p", null, "Sit tight, we're searching the LBRY blockchain for your asset!"), _react.default.createElement(_ProgressBar.default, {
        size: 12
      }), _react.default.createElement("p", null, "Curious what magic is happening here? ", _react.default.createElement("a", {
        className: "link--primary",
        target: "blank",
        href: "https://lbry.io/faq/what-is-lbry"
      }, "Learn more."))), status === _asset_display_states.ERROR && _react.default.createElement("div", null, _react.default.createElement("p", null, "Unfortunately, we couldn't download your asset from LBRY.  You can help us out by sharing the below error message in the ", _react.default.createElement("a", {
        className: "link--primary",
        href: "https://chat.lbry.io",
        target: "_blank"
      }, "LBRY discord"), "."), _react.default.createElement("i", null, _react.default.createElement("p", {
        id: "error-message"
      }, error))), status === _asset_display_states.AVAILABLE && function () {
        switch (contentType) {
          case 'image/jpeg':
          case 'image/jpg':
          case 'image/png':
          case 'image/gif':
            return _react.default.createElement("img", {
              className: "asset-image",
              src: "/asset/".concat(name, "/").concat(claimId),
              alt: name
            });

          case 'video/mp4':
            return _react.default.createElement("video", {
              className: "asset-video",
              controls: true,
              poster: thumbnail
            }, _react.default.createElement("source", {
              src: "/asset/".concat(name, "/").concat(claimId)
            }), _react.default.createElement("p", null, "Your browser does not support the ", _react.default.createElement("code", null, "video"), " element."));

          default:
            return _react.default.createElement("p", null, "Unsupported file type");
        }
      }());
    }
  }]);

  _inherits(AssetDisplay, _React$Component);

  return AssetDisplay;
}(_react.default.Component);

;
var _default = AssetDisplay;
exports.default = _default;