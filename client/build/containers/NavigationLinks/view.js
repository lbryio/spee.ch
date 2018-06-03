"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _NavBarChannelOptionsDropdown = _interopRequireDefault(require("@components/NavBarChannelOptionsDropdown"));

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

var VIEW = 'VIEW';
var LOGOUT = 'LOGOUT';

var NavigationLinks =
/*#__PURE__*/
function (_React$Component) {
  function NavigationLinks(props) {
    var _this;

    _classCallCheck(this, NavigationLinks);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavigationLinks).call(this, props));
    _this.handleSelection = _this.handleSelection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(NavigationLinks, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.checkForLoggedInChannel();
    }
  }, {
    key: "handleSelection",
    value: function handleSelection(event) {
      var value = event.target.selectedOptions[0].value;

      switch (value) {
        case LOGOUT:
          this.props.logOutChannel();
          break;

        case VIEW:
          // redirect to channel page
          this.props.history.push("/".concat(this.props.channelName, ":").concat(this.props.channelLongId));
          break;

        default:
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "navigation-links"
      }, _react.default.createElement(_reactRouterDom.NavLink, {
        className: "nav-bar-link link--nav",
        activeClassName: "link--nav-active",
        to: "/",
        exact: true
      }, "Publish"), _react.default.createElement(_reactRouterDom.NavLink, {
        className: "nav-bar-link link--nav",
        activeClassName: "link--nav-active",
        to: "/about"
      }, "About"), this.props.channelName ? _react.default.createElement(_NavBarChannelOptionsDropdown.default, {
        channelName: this.props.channelName,
        handleSelection: this.handleSelection,
        defaultSelection: this.props.channelName,
        VIEW: VIEW,
        LOGOUT: LOGOUT
      }) : _react.default.createElement(_reactRouterDom.NavLink, {
        id: "nav-bar-login-link",
        className: "nav-bar-link link--nav",
        activeClassName: "link--nav-active",
        to: "/login"
      }, "Channel"));
    }
  }]);

  _inherits(NavigationLinks, _React$Component);

  return NavigationLinks;
}(_react.default.Component);

var _default = (0, _reactRouterDom.withRouter)(NavigationLinks);

exports.default = _default;