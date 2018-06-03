"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _channel = require("../../actions/channel");

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var _ref$channel$loggedIn = _ref.channel.loggedInChannel,
      name = _ref$channel$loggedIn.name,
      shortId = _ref$channel$loggedIn.shortId,
      longId = _ref$channel$loggedIn.longId;
  return {
    channelName: name,
    channelShortId: shortId,
    channelLongId: longId
  };
};

var mapDispatchToProps = {
  checkForLoggedInChannel: _channel.checkForLoggedInChannel,
  logOutChannel: _channel.logOutChannel
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view.default);

exports.default = _default;