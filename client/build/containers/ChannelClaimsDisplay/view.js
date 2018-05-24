"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _AssetPreview = _interopRequireDefault(require("@components/AssetPreview"));

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

var ChannelClaimsDisplay =
/*#__PURE__*/
function (_React$Component) {
  function ChannelClaimsDisplay(props) {
    var _this;

    _classCallCheck(this, ChannelClaimsDisplay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelClaimsDisplay).call(this, props));
    _this.showNextResultsPage = _this.showNextResultsPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.showPreviousResultsPage = _this.showPreviousResultsPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ChannelClaimsDisplay, [{
    key: "showPreviousResultsPage",
    value: function showPreviousResultsPage() {
      var currentPage = this.props.channel.claimsData.currentPage;
      var previousPage = parseInt(currentPage) - 1;
      this.showNewPage(previousPage);
    }
  }, {
    key: "showNextResultsPage",
    value: function showNextResultsPage() {
      var currentPage = this.props.channel.claimsData.currentPage;
      var nextPage = parseInt(currentPage) + 1;
      this.showNewPage(nextPage);
    }
  }, {
    key: "showNewPage",
    value: function showNewPage(page) {
      var _this$props = this.props,
          channelKey = _this$props.channelKey,
          _this$props$channel = _this$props.channel,
          name = _this$props$channel.name,
          longId = _this$props$channel.longId;
      this.props.onUpdateChannelClaims(channelKey, name, longId, page);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$channel$c = this.props.channel.claimsData,
          claims = _this$props$channel$c.claims,
          currentPage = _this$props$channel$c.currentPage,
          totalPages = _this$props$channel$c.totalPages;
      return _react.default.createElement("div", {
        className: "row row--tall"
      }, claims.length > 0 ? _react.default.createElement("div", null, claims.map(function (claim, index) {
        return _react.default.createElement(_AssetPreview.default, {
          claimData: claim,
          key: "".concat(claim.name, "-").concat(index)
        });
      }), _react.default.createElement("div", null, currentPage > 1 && _react.default.createElement("button", {
        className: 'button--secondary',
        onClick: this.showPreviousResultsPage
      }, "Previous Page"), currentPage < totalPages && _react.default.createElement("button", {
        className: 'button--secondary',
        onClick: this.showNextResultsPage
      }, "Next Page"))) : _react.default.createElement("p", null, "There are no claims in this channel"));
    }
  }]);

  _inherits(ChannelClaimsDisplay, _React$Component);

  return ChannelClaimsDisplay;
}(_react.default.Component);

;
var _default = ChannelClaimsDisplay;
exports.default = _default;