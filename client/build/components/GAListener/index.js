"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var _reactRouterDom = require("react-router-dom");

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

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

var googleId = null;

if (!_siteConfig.default) {
  console.log('no site config found for GAListener');
}

if (_siteConfig.default.analytics) {
  googleId = _siteConfig.default.analytics.googleId;
}

_reactGa.default.initialize(googleId);

var GAListener =
/*#__PURE__*/
function (_React$Component) {
  function GAListener() {
    _classCallCheck(this, GAListener);

    return _possibleConstructorReturn(this, _getPrototypeOf(GAListener).apply(this, arguments));
  }

  _createClass(GAListener, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.sendPageView(this.props.history.location);
      this.props.history.listen(this.sendPageView);
    }
  }, {
    key: "sendPageView",
    value: function sendPageView(location) {
      _reactGa.default.set({
        page: location.pathname
      });

      _reactGa.default.pageview(location.pathname);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  _inherits(GAListener, _React$Component);

  return GAListener;
}(_react.default.Component);

var _default = (0, _reactRouterDom.withRouter)(GAListener);

exports.default = _default;