"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelInfoDisplay = function ChannelInfoDisplay(_ref) {
  var name = _ref.name,
      longId = _ref.longId,
      shortId = _ref.shortId;
  return _react.default.createElement("div", null, _react.default.createElement("h2", null, "channel name: ", name), _react.default.createElement("p", {
    className: 'text--secondary'
  }, "full channel id: ", longId), _react.default.createElement("p", {
    className: 'text--secondary'
  }, "short channel id: ", shortId));
};

var _default = ChannelInfoDisplay;
exports.default = _default;