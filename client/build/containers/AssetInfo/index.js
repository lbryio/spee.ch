"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _view = _interopRequireDefault(require("./view"));

var _show = require("../../selectors/show");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;
  // select asset
  var asset = (0, _show.selectAsset)(show); //  return props

  return {
    asset: asset
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(_view.default);

exports.default = _default;