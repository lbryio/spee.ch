"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PublishUrlMiddleDisplay = _interopRequireDefault(require("@components/PublishUrlMiddleDisplay"));

var _FormFeedbackDisplay = _interopRequireDefault(require("@components/FormFeedbackDisplay"));

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

var PublishUrlInput =
/*#__PURE__*/
function (_React$Component) {
  function PublishUrlInput(props) {
    var _this;

    _classCallCheck(this, PublishUrlInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PublishUrlInput).call(this, props));
    _this.handleInput = _this.handleInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PublishUrlInput, [{
    key: "cleanseInput",
    value: function cleanseInput(input) {
      input = input.replace(/\s+/g, '-');
      input = input.replace(/[^A-Za-z0-9-]/g, '');
      return input;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          claim = _this$props.claim,
          fileName = _this$props.fileName;

      if (!claim) {
        this.setInitialClaimName(fileName);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var claim = _ref.claim,
          fileName = _ref.fileName;

      // if a new file was chosen, update the claim name
      if (fileName !== this.props.fileName) {
        return this.setInitialClaimName(fileName);
      }
    }
  }, {
    key: "setInitialClaimName",
    value: function setInitialClaimName(fileName) {
      var fileNameWithoutEnding = fileName.substring(0, fileName.lastIndexOf('.'));
      var cleanFileName = this.cleanseInput(fileNameWithoutEnding);
      this.updateAndValidateClaimInput(cleanFileName);
    }
  }, {
    key: "handleInput",
    value: function handleInput(event) {
      var value = event.target.value;
      value = this.cleanseInput(value);
      this.updateAndValidateClaimInput(value);
    }
  }, {
    key: "updateAndValidateClaimInput",
    value: function updateAndValidateClaimInput(value) {
      if (value) {
        this.props.validateClaim(value);
      } else {
        this.props.updateError('url', 'Choose a custom url');
      }

      this.props.updateClaim(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          claim = _this$props2.claim,
          loggedInChannelName = _this$props2.loggedInChannelName,
          loggedInChannelShortId = _this$props2.loggedInChannelShortId,
          publishInChannel = _this$props2.publishInChannel,
          selectedChannel = _this$props2.selectedChannel,
          urlError = _this$props2.urlError;
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: 'publish-url-input'
      }, _react.default.createElement("div", {
        className: 'align-left'
      }, _react.default.createElement("span", {
        className: "publish-url-text"
      }, "spee.ch\xA0/\xA0")), _react.default.createElement("div", {
        className: 'shrink'
      }, _react.default.createElement(_PublishUrlMiddleDisplay.default, {
        publishInChannel: publishInChannel,
        selectedChannel: selectedChannel,
        loggedInChannelName: loggedInChannelName,
        loggedInChannelShortId: loggedInChannelShortId
      })), _react.default.createElement("div", {
        className: 'fill'
      }, _react.default.createElement("input", {
        type: "text",
        className: "input-text input-text--full-width",
        name: "claim",
        placeholder: "your-url-here",
        onChange: this.handleInput,
        value: claim
      }))), _react.default.createElement(_FormFeedbackDisplay.default, {
        errorMessage: urlError,
        defaultMessage: 'Choose a custom url'
      }));
    }
  }]);

  _inherits(PublishUrlInput, _React$Component);

  return PublishUrlInput;
}(_react.default.Component);

var _default = PublishUrlInput;
exports.default = _default;