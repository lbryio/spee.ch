"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _publish = _interopRequireDefault(require("./publish"));

var _channel = _interopRequireDefault(require("./channel"));

var _show = _interopRequireDefault(require("./show"));

var _site = _interopRequireDefault(require("./site"));

var _channelCreate = _interopRequireDefault(require("./channelCreate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// modules
// local modules
var _default = (0, _redux.combineReducers)({
  channel: _channel.default,
  channelCreate: _channelCreate.default,
  publish: _publish.default,
  show: _show.default,
  site: _site.default
});

exports.default = _default;