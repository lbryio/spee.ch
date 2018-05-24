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
  var requestId = show.request.id; // select request

  var previousRequest = show.requestList[requestId] || null; // select channel

  var channel;

  if (previousRequest) {
    var channelKey = previousRequest.key;
    channel = show.channelList[channelKey] || null;
  }

  return {
    channel: channel
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, null)(_view.default);

exports.default = _default;