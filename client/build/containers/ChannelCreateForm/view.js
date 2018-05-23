"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ProgressBar = _interopRequireDefault(require("@components/ProgressBar"));

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

var ChannelCreateForm =
/*#__PURE__*/
function (_React$Component) {
  function ChannelCreateForm(props) {
    var _this;

    _classCallCheck(this, ChannelCreateForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelCreateForm).call(this, props));
    _this.handleNameInput = _this.handleNameInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePasswordInput = _this.handlePasswordInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ChannelCreateForm, [{
    key: "cleanseNameInput",
    value: function cleanseNameInput(input) {
      input = input.replace(/\s+/g, '-'); // replace spaces with dashes

      input = input.replace(/[^A-Za-z0-9-]/g, ''); // remove all characters that are not A-Z, a-z, 0-9, or '-'

      return input;
    }
  }, {
    key: "cleansePasswordInput",
    value: function cleansePasswordInput(input) {
      input = input.replace(/\s+/g, ''); // replace spaces

      return input;
    }
  }, {
    key: "handleNameInput",
    value: function handleNameInput(event) {
      var value = this.cleanseNameInput(event.target.value);

      if (!value) {
        this.props.updateChannelCreateName('error', 'Please enter a channel name');
      } else {
        this.props.updateChannelAvailability(value);
      }

      this.props.updateChannelCreateName('value', value);
    }
  }, {
    key: "handlePasswordInput",
    value: function handlePasswordInput(event) {
      var value = this.cleansePasswordInput(event.target.value);

      if (!value) {
        this.props.updateChannelCreatePassword('error', 'Please enter a password');
      } else {
        this.props.updateChannelCreatePassword('error', null);
      }

      this.props.updateChannelCreatePassword('value', value);
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      console.log('handling submit');
      event.preventDefault();
      this.props.createChannel();
    }
  }, {
    key: "returnErrors",
    value: function returnErrors() {
      if (this.props.name.error) {
        return this.props.name.error;
      }

      if (this.props.password.error) {
        return this.props.password.error;
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          password = _this$props.password,
          status = _this$props.status;
      var formError = this.returnErrors();
      return _react.default.createElement("div", null, !status ? _react.default.createElement("form", {
        id: "publish-channel-form"
      }, _react.default.createElement("div", {
        className: "row row--wide row--short"
      }, _react.default.createElement("div", {
        className: "column column--3 column--sml-10"
      }, _react.default.createElement("label", {
        className: "label",
        htmlFor: "new-channel-name"
      }, "Name:")), _react.default.createElement("div", {
        className: "column column--6 column--sml-10"
      }, _react.default.createElement("div", {
        className: "input-text--primary flex-container--row flex-container--left-bottom span--relative"
      }, _react.default.createElement("span", null, "@"), _react.default.createElement("input", {
        type: "text",
        name: "channel",
        id: "new-channel-name",
        className: "input-text",
        placeholder: "exampleChannelName",
        value: name.value,
        onChange: this.handleNameInput
      }), name.value && !name.error && _react.default.createElement("span", {
        id: "input-success-channel-name",
        className: "info-message--success span--absolute"
      }, "\u2713"), name.error && _react.default.createElement("span", {
        id: "input-success-channel-name",
        className: "info-message--failure span--absolute"
      }, "\u2716")))), _react.default.createElement("div", {
        className: "row row--wide row--short"
      }, _react.default.createElement("div", {
        className: "column column--3 column--sml-10"
      }, _react.default.createElement("label", {
        className: "label",
        htmlFor: "new-channel-password"
      }, "Password:")), _react.default.createElement("div", {
        className: "column column--6 column--sml-10"
      }, _react.default.createElement("div", {
        className: "input-text--primary"
      }, _react.default.createElement("input", {
        type: "password",
        name: "password",
        id: "new-channel-password",
        className: "input-text",
        placeholder: "",
        value: password.value,
        onChange: this.handlePasswordInput
      })))), formError ? _react.default.createElement("p", {
        className: "info-message--failure"
      }, formError) : _react.default.createElement("p", {
        className: "info-message"
      }, "Choose a name and password for your channel"), _react.default.createElement("div", {
        className: "row row--wide"
      }, _react.default.createElement("button", {
        className: "button--primary",
        onClick: this.handleSubmit
      }, "Create Channel"))) : _react.default.createElement("div", null, _react.default.createElement("p", {
        className: "fine-print"
      }, status), _react.default.createElement(_ProgressBar.default, {
        size: 12
      })));
    }
  }]);

  _inherits(ChannelCreateForm, _React$Component);

  return ChannelCreateForm;
}(_react.default.Component);

var _default = ChannelCreateForm;
exports.default = _default;