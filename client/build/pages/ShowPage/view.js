"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ErrorPage = _interopRequireDefault(require("@pages/ErrorPage"));

var _ShowAssetLite = _interopRequireDefault(require("@containers/ShowAssetLite"));

var _ShowAssetDetails = _interopRequireDefault(require("@containers/ShowAssetDetails"));

var _ShowChannel = _interopRequireDefault(require("@containers/ShowChannel"));

var _show_request_types = require("../../constants/show_request_types");

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

var ShowPage =
/*#__PURE__*/
function (_React$Component) {
  function ShowPage() {
    _classCallCheck(this, ShowPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowPage).apply(this, arguments));
  }

  _createClass(ShowPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onHandleShowPageUri(this.props.match.params);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.match.params !== this.props.match.params) {
        this.props.onHandleShowPageUri(nextProps.match.params);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          error = _this$props.error,
          requestType = _this$props.requestType;

      if (error) {
        return _react.default.createElement(_ErrorPage.default, {
          error: error
        });
      }

      switch (requestType) {
        case _show_request_types.CHANNEL:
          return _react.default.createElement(_ShowChannel.default, null);

        case _show_request_types.ASSET_LITE:
          return _react.default.createElement(_ShowAssetLite.default, null);

        case _show_request_types.ASSET_DETAILS:
          return _react.default.createElement(_ShowAssetDetails.default, null);

        default:
          return _react.default.createElement("p", null, "loading...");
      }
    }
  }]);

  _inherits(ShowPage, _React$Component);

  return ShowPage;
}(_react.default.Component);

;
var _default = ShowPage;
exports.default = _default;