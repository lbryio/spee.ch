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

var customizedReducers = function customizedReducers(siteConfig) {
  return (0, _redux.combineReducers)({
    channel: _channel.default,
    channelCreate: _channelCreate.default,
    publish: (0, _publish.default)(siteConfig),
    show: _show.default,
    site: (0, _site.default)(siteConfig)
  });
};

var _default = customizedReducers;
exports.default = _default;