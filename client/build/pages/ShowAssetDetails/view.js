"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PageLayout = _interopRequireDefault(require("@components/PageLayout"));

var _HorizontalSplit = _interopRequireDefault(require("@components/HorizontalSplit"));

var _AssetTitle = _interopRequireDefault(require("@containers/AssetTitle"));

var _AssetDisplay = _interopRequireDefault(require("@containers/AssetDisplay"));

var _AssetInfo = _interopRequireDefault(require("@containers/AssetInfo"));

var _ErrorPage = _interopRequireDefault(require("@pages/ErrorPage"));

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

var ShowAssetDetails =
/*#__PURE__*/
function (_React$Component) {
  function ShowAssetDetails() {
    _classCallCheck(this, ShowAssetDetails);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShowAssetDetails).apply(this, arguments));
  }

  _createClass(ShowAssetDetails, [{
    key: "render",
    value: function render() {
      var asset = this.props.asset;

      if (asset) {
        var name = asset.claimData.name;
        return _react.default.createElement(_PageLayout.default, {
          pageTitle: "".concat(name, " - details"),
          asset: asset
        }, _react.default.createElement(_AssetTitle.default, null), _react.default.createElement(_HorizontalSplit.default, {
          leftSide: _react.default.createElement(_AssetDisplay.default, null),
          rightSide: _react.default.createElement(_AssetInfo.default, null)
        }));
      }

      return _react.default.createElement(_ErrorPage.default, {
        error: 'loading asset data...'
      });
    }
  }]);

  _inherits(ShowAssetDetails, _React$Component);

  return ShowAssetDetails;
}(_react.default.Component);

;
var _default = ShowAssetDetails;
exports.default = _default;