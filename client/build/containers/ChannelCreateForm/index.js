"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _view = _interopRequireDefault(require("./view"));

var _channelCreate = require("../../actions/channelCreate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var _ref$channelCreate = _ref.channelCreate,
      name = _ref$channelCreate.name,
      password = _ref$channelCreate.password,
      error = _ref$channelCreate.error,
      status = _ref$channelCreate.status;
  return {
    name: name,
    password: password,
    error: error,
    status: status
  };
};

var mapDispatchToProps = {
  updateChannelAvailability: _channelCreate.updateChannelAvailability,
  updateChannelCreateName: _channelCreate.updateChannelCreateName,
  updateChannelCreatePassword: _channelCreate.updateChannelCreatePassword,
  createChannel: _channelCreate.createChannel
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view.default);

exports.default = _default;