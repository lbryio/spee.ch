"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _PageLayout = _interopRequireDefault(require("@components/PageLayout"));

var _HorizontalSplit = _interopRequireDefault(require("@components/HorizontalSplit"));

var _ChannelAbout = _interopRequireDefault(require("@components/ChannelAbout"));

var _ChannelTools = _interopRequireDefault(require("@components/ChannelTools"));

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

var LoginPage =
/*#__PURE__*/
function (_React$Component) {
  function LoginPage() {
    _classCallCheck(this, LoginPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginPage).apply(this, arguments));
  }

  _createClass(LoginPage, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      // re-route the user to the homepage if the user is logged in
      if (newProps.loggedInChannelName !== this.props.loggedInChannelName) {
        this.props.history.push("/");
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_PageLayout.default, {
        pageTitle: 'Login',
        pageUri: 'login'
      }, _react.default.createElement(_HorizontalSplit.default, {
        leftSide: _react.default.createElement(_ChannelAbout.default, null),
        rightSide: _react.default.createElement(_ChannelTools.default, null)
      }));
    }
  }]);

  _inherits(LoginPage, _React$Component);

  return LoginPage;
}(_react.default.Component);

;

var _default = (0, _reactRouterDom.withRouter)(LoginPage);

exports.default = _default;