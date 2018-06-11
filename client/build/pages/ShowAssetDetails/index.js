"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;
  // select request info
  var requestId = show.request.id; // select asset info

  var asset;
  var request = show.requestList[requestId] || null;
  var assetList = show.assetList;

  if (request && assetList) {
    var assetKey = request.key; // note: just store this in the request

    asset = assetList[assetKey] || null;
  }

  ; // return props

  return {
    asset: asset
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(_view.default);

exports.default = _default;