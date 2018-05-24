"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ChannelLoginForm = _interopRequireDefault(require("@containers/ChannelLoginForm"));

var _ChannelCreateForm = _interopRequireDefault(require("@containers/ChannelCreateForm"));

var states = _interopRequireWildcard(require("../../constants/publish_channel_select_states"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var ChannelSelect =
/*#__PURE__*/
function (_React$Component) {
  function ChannelSelect(props) {
    var _this;

    _classCallCheck(this, ChannelSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelSelect).call(this, props));
    _this.toggleAnonymousPublish = _this.toggleAnonymousPublish.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSelection = _this.handleSelection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ChannelSelect, [{
    key: "toggleAnonymousPublish",
    value: function toggleAnonymousPublish(event) {
      var value = event.target.value;

      if (value === 'anonymous') {
        this.props.onPublishInChannelChange(false);
      } else {
        this.props.onPublishInChannelChange(true);
      }
    }
  }, {
    key: "handleSelection",
    value: function handleSelection(event) {
      var selectedOption = event.target.selectedOptions[0].value;
      this.props.onChannelSelect(selectedOption);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("form", null, _react.default.createElement("div", {
        className: "column column--3 column--med-10"
      }, _react.default.createElement("input", {
        type: "radio",
        name: "anonymous-or-channel",
        id: "anonymous-radio",
        className: "input-radio",
        value: "anonymous",
        checked: !this.props.publishInChannel,
        onChange: this.toggleAnonymousPublish
      }), _react.default.createElement("label", {
        className: "label label--pointer",
        htmlFor: "anonymous-radio"
      }, "Anonymous")), _react.default.createElement("div", {
        className: "column column--7 column--med-10"
      }, _react.default.createElement("input", {
        type: "radio",
        name: "anonymous-or-channel",
        id: "channel-radio",
        className: "input-radio",
        value: "in a channel",
        checked: this.props.publishInChannel,
        onChange: this.toggleAnonymousPublish
      }), _react.default.createElement("label", {
        className: "label label--pointer",
        htmlFor: "channel-radio"
      }, "In a channel")), this.props.channelError ? _react.default.createElement("p", {
        className: "info-message--failure"
      }, this.props.channelError) : _react.default.createElement("p", {
        className: "info-message"
      }, "Publish anonymously or in a channel")), this.props.publishInChannel && _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "column column--3"
      }, _react.default.createElement("label", {
        className: "label",
        htmlFor: "channel-name-select"
      }, "Channel:")), _react.default.createElement("div", {
        className: "column column--7"
      }, _react.default.createElement("select", {
        type: "text",
        id: "channel-name-select",
        className: "select select--arrow",
        value: this.props.selectedChannel,
        onChange: this.handleSelection
      }, this.props.loggedInChannelName && _react.default.createElement("option", {
        value: this.props.loggedInChannelName,
        id: "publish-channel-select-channel-option"
      }, this.props.loggedInChannelName), _react.default.createElement("option", {
        value: states.LOGIN
      }, "Existing"), _react.default.createElement("option", {
        value: states.CREATE
      }, "New"))), this.props.selectedChannel === states.LOGIN && _react.default.createElement(_ChannelLoginForm.default, null), this.props.selectedChannel === states.CREATE && _react.default.createElement(_ChannelCreateForm.default, null)));
    }
  }]);

  _inherits(ChannelSelect, _React$Component);

  return ChannelSelect;
}(_react.default.Component);

var _default = ChannelSelect;
exports.default = _default;