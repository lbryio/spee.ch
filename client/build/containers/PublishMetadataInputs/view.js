"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PublishDescriptionInput = _interopRequireDefault(require("@components/PublishDescriptionInput"));

var _PublishLicenseInput = _interopRequireDefault(require("@components/PublishLicenseInput"));

var _PublishNsfwInput = _interopRequireDefault(require("@components/PublishNsfwInput"));

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

var PublishMetadataInputs =
/*#__PURE__*/
function (_React$Component) {
  function PublishMetadataInputs(props) {
    var _this;

    _classCallCheck(this, PublishMetadataInputs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PublishMetadataInputs).call(this, props));
    _this.toggleShowInputs = _this.toggleShowInputs.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleInput = _this.handleInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PublishMetadataInputs, [{
    key: "toggleShowInputs",
    value: function toggleShowInputs() {
      this.props.onToggleMetadataInputs(!this.props.showMetadataInputs);
    }
  }, {
    key: "handleInput",
    value: function handleInput(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      this.props.onMetadataChange(name, value);
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(event) {
      var name = event.target.name;
      var selectedOption = event.target.selectedOptions[0].value;
      this.props.onMetadataChange(name, selectedOption);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, this.props.showMetadataInputs && _react.default.createElement("div", null, _react.default.createElement(_PublishDescriptionInput.default, {
        description: this.props.description,
        handleInput: this.handleInput
      }), _react.default.createElement(_PublishLicenseInput.default, {
        handleSelect: this.handleSelect
      }), _react.default.createElement(_PublishNsfwInput.default, {
        nsfw: this.props.nsfw,
        handleInput: this.handleInput
      })), _react.default.createElement("button", {
        className: "button--secondary",
        onClick: this.toggleShowInputs
      }, this.props.showMetadataInputs ? 'less' : 'more'));
    }
  }]);

  _inherits(PublishMetadataInputs, _React$Component);

  return PublishMetadataInputs;
}(_react.default.Component);

var _default = PublishMetadataInputs;
exports.default = _default;