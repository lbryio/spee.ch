"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _Dropzone = _interopRequireDefault(require("@containers/Dropzone"));

var _PublishTitleInput = _interopRequireDefault(require("@containers/PublishTitleInput"));

var _PublishUrlInput = _interopRequireDefault(require("@containers/PublishUrlInput"));

var _PublishThumbnailInput = _interopRequireDefault(require("@containers/PublishThumbnailInput"));

var _PublishMetadataInputs = _interopRequireDefault(require("@containers/PublishMetadataInputs"));

var _ChannelSelect = _interopRequireDefault(require("@containers/ChannelSelect"));

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

var PublishDetails =
/*#__PURE__*/
function (_React$Component) {
  function PublishDetails(props) {
    var _this;

    _classCallCheck(this, PublishDetails);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PublishDetails).call(this, props));
    _this.onPublishSubmit = _this.onPublishSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PublishDetails, [{
    key: "onPublishSubmit",
    value: function onPublishSubmit() {
      this.props.startPublish(this.props.history);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "row row--no-bottom"
      }, _react.default.createElement("div", {
        className: "column column--10"
      }, _react.default.createElement(_PublishTitleInput.default, null)), _react.default.createElement("div", {
        className: "column column--5 column--sml-10"
      }, _react.default.createElement("div", {
        className: "row row--padded"
      }, _react.default.createElement(_Dropzone.default, null))), _react.default.createElement("div", {
        className: "column column--5 column--sml-10 align-content-top"
      }, _react.default.createElement("div", {
        id: "publish-active-area",
        className: "row row--padded"
      }, _react.default.createElement("div", {
        className: "row row--padded row--no-top row--wide"
      }, _react.default.createElement(_PublishUrlInput.default, null)), _react.default.createElement("div", {
        className: "row row--padded row--no-top row--wide"
      }, _react.default.createElement(_ChannelSelect.default, null)), this.props.file.type === 'video/mp4' && _react.default.createElement("div", {
        className: "row row--padded row--no-top row--wide "
      }, _react.default.createElement(_PublishThumbnailInput.default, null)), _react.default.createElement("div", {
        className: "row row--padded row--no-top row--no-bottom row--wide"
      }, _react.default.createElement(_PublishMetadataInputs.default, null)), _react.default.createElement("div", {
        className: "row row--wide align-content-center"
      }, _react.default.createElement("button", {
        id: "publish-submit",
        className: "button--primary button--large",
        onClick: this.onPublishSubmit
      }, "Publish")), _react.default.createElement("div", {
        className: "row row--padded row--no-bottom align-content-center"
      }, _react.default.createElement("button", {
        className: "button--cancel",
        onClick: this.props.clearFile
      }, "Cancel")), _react.default.createElement("div", {
        className: "row row--short align-content-center"
      }, _react.default.createElement("p", {
        className: "fine-print"
      }, "By clicking 'Publish', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. ", _react.default.createElement("a", {
        className: "link--primary",
        target: "_blank",
        href: "https://lbry.io/learn"
      }, "Read more."))))));
    }
  }]);

  _inherits(PublishDetails, _React$Component);

  return PublishDetails;
}(_react.default.Component);

;

var _default = (0, _reactRouterDom.withRouter)(PublishDetails);

exports.default = _default;