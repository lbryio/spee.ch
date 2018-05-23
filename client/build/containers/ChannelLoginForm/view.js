"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _request = _interopRequireDefault(require("../../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ChannelLoginForm =
/*#__PURE__*/
function (_React$Component) {
  function ChannelLoginForm(props) {
    var _this;

    _classCallCheck(this, ChannelLoginForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelLoginForm).call(this, props));
    _this.state = {
      error: null,
      name: '',
      password: ''
    };
    _this.handleInput = _this.handleInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.loginToChannel = _this.loginToChannel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ChannelLoginForm, [{
    key: "handleInput",
    value: function handleInput(event) {
      var name = event.target.name;
      var value = event.target.value;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "loginToChannel",
    value: function loginToChannel(event) {
      var _this2 = this;

      event.preventDefault();
      var params = {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.name,
          password: this.state.password
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        credentials: 'include'
      };
      (0, _request.default)('login', params).then(function (_ref) {
        var success = _ref.success,
            channelName = _ref.channelName,
            shortChannelId = _ref.shortChannelId,
            channelClaimId = _ref.channelClaimId,
            message = _ref.message;

        if (success) {
          _this2.props.onChannelLogin(channelName, shortChannelId, channelClaimId);
        } else {
          _this2.setState({
            'error': message
          });
        }

        ;
      }).catch(function (error) {
        if (error.message) {
          _this2.setState({
            'error': error.message
          });
        } else {
          _this2.setState({
            'error': error
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("form", {
        id: "channel-login-form"
      }, _react.default.createElement("div", {
        className: "row row--wide row--short"
      }, _react.default.createElement("div", {
        className: "column column--3 column--sml-10"
      }, _react.default.createElement("label", {
        className: "label",
        htmlFor: "channel-login-name-input"
      }, "Name:")), _react.default.createElement("div", {
        className: "column column--6 column--sml-10"
      }, _react.default.createElement("div", {
        className: "input-text--primary flex-container--row flex-container--left-bottom"
      }, _react.default.createElement("span", null, "@"), _react.default.createElement("input", {
        type: "text",
        id: "channel-login-name-input",
        className: "input-text",
        name: "name",
        placeholder: "Your Channel Name",
        value: this.state.channelName,
        onChange: this.handleInput
      })))), _react.default.createElement("div", {
        className: "row row--wide row--short"
      }, _react.default.createElement("div", {
        className: "column column--3 column--sml-10"
      }, _react.default.createElement("label", {
        className: "label",
        htmlFor: "channel-login-password-input"
      }, "Password:")), _react.default.createElement("div", {
        className: "column column--6 column--sml-10"
      }, _react.default.createElement("div", {
        className: "input-text--primary"
      }, _react.default.createElement("input", {
        type: "password",
        id: "channel-login-password-input",
        name: "password",
        className: "input-text",
        placeholder: "",
        value: this.state.channelPassword,
        onChange: this.handleInput
      })))), this.state.error ? _react.default.createElement("p", {
        className: "info-message--failure"
      }, this.state.error) : _react.default.createElement("p", {
        className: "info-message"
      }, "Enter the name and password for your channel"), _react.default.createElement("div", {
        className: "row row--wide"
      }, _react.default.createElement("button", {
        className: "button--primary",
        onClick: this.loginToChannel
      }, "Authenticate")));
    }
  }]);

  _inherits(ChannelLoginForm, _React$Component);

  return ChannelLoginForm;
}(_react.default.Component);

var _default = ChannelLoginForm;
exports.default = _default;