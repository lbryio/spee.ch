"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ProgressBar = _interopRequireDefault(require("@components/ProgressBar"));

var publishStates = _interopRequireWildcard(require("../../constants/publish_claim_states"));

var _ButtonSecondary = _interopRequireDefault(require("@components/ButtonSecondary"));

var _Row = _interopRequireDefault(require("@components/Row"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var PublishStatus =
/*#__PURE__*/
function (_React$Component) {
  function PublishStatus() {
    _classCallCheck(this, PublishStatus);

    return _possibleConstructorReturn(this, _getPrototypeOf(PublishStatus).apply(this, arguments));
  }

  _createClass(PublishStatus, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          status = _this$props.status,
          message = _this$props.message,
          clearFile = _this$props.clearFile;
      return _react.default.createElement("div", {
        className: 'publish-status'
      }, status === publishStates.LOAD_START && _react.default.createElement("div", {
        className: 'status'
      }, _react.default.createElement(_Row.default, null, _react.default.createElement("p", null, "le is loading to server")), _react.default.createElement(_Row.default, null, _react.default.createElement("p", {
        className: 'text--secondary'
      }, "0%"))), status === publishStates.LOADING && _react.default.createElement("div", {
        className: 'status'
      }, _react.default.createElement(_Row.default, null, _react.default.createElement("p", null, "File is loading to server")), _react.default.createElement(_Row.default, null, _react.default.createElement("p", {
        className: 'text--secondary'
      }, message))), status === publishStates.PUBLISHING && _react.default.createElement("div", {
        className: 'status'
      }, _react.default.createElement(_Row.default, null, _react.default.createElement("p", null, "Upload complete.  Your file is now being published on the blockchain...")), _react.default.createElement(_Row.default, null, _react.default.createElement(_ProgressBar.default, {
        size: 12
      })), _react.default.createElement(_Row.default, null, _react.default.createElement("p", null, "Curious what magic is happening here? ", _react.default.createElement("a", {
        className: "link--primary",
        target: "blank",
        href: "https://lbry.io/faq/what-is-lbry"
      }, "Learn more.")))), status === publishStates.SUCCESS && _react.default.createElement("div", {
        className: 'status'
      }, _react.default.createElement(_Row.default, null, _react.default.createElement("p", null, "Your publish is complete! You are being redirected to it now.")), _react.default.createElement(_Row.default, null, _react.default.createElement("p", null, "If you are not automatically redirected, ", _react.default.createElement("a", {
        className: "link--primary",
        target: "_blank",
        href: message
      }, "click here.")))), status === publishStates.FAILED && _react.default.createElement("div", {
        className: 'status'
      }, _react.default.createElement(_Row.default, null, _react.default.createElement("p", null, "Something went wrong...")), _react.default.createElement(_Row.default, null, _react.default.createElement("p", {
        className: 'text--strong'
      }, message)), _react.default.createElement(_Row.default, null, _react.default.createElement("p", null, "For help, post the above error text in the #speech channel on the ", _react.default.createElement("a", {
        className: "link--primary",
        href: "https://chat.lbry.io",
        target: "_blank"
      }, "lbry discord"))), _react.default.createElement(_Row.default, null, _react.default.createElement(_ButtonSecondary.default, {
        value: 'Reset',
        onClickHandler: clearFile
      }))));
    }
  }]);

  _inherits(PublishStatus, _React$Component);

  return PublishStatus;
}(_react.default.Component);

;
var _default = PublishStatus;
exports.default = _default;