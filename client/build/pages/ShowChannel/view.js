"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PageLayout = _interopRequireDefault(require("@components/PageLayout"));

var _ErrorPage = _interopRequireDefault(require("@pages/ErrorPage"));

var _ChannelInfoDisplay = _interopRequireDefault(require("@components/ChannelInfoDisplay"));

var _ChannelClaimsDisplay = _interopRequireDefault(require("@containers/ChannelClaimsDisplay"));

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

var ShowChannel =
/*#__PURE__*/
function (_React$Component) {
  function ShowChannel() {
    _classCallCheck(this, ShowChannel);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowChannel).apply(this, arguments));
  }

  _createClass(ShowChannel, [{
    key: "render",
    value: function render() {
      var channel = this.props.channel;

      if (channel) {
        var name = channel.name,
            longId = channel.longId,
            shortId = channel.shortId;
        return _react.default.createElement(_PageLayout.default, {
          pageTitle: name,
          channel: channel,
          content: _react.default.createElement("div", null, _react.default.createElement(_ChannelInfoDisplay.default, {
            name: name,
            longId: longId,
            shortId: shortId
          }), _react.default.createElement(_ChannelClaimsDisplay.default, null))
        });
      }

      return _react.default.createElement(_ErrorPage.default, {
        error: 'loading channel data...'
      });
    }
  }]);

  _inherits(ShowChannel, _React$Component);

  return ShowChannel;
}(_react.default.Component);

;
var _default = ShowChannel;
exports.default = _default;