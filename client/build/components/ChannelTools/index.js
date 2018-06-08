"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ChannelLoginForm = _interopRequireDefault(require("@containers/ChannelLoginForm"));

var _ChannelCreateForm = _interopRequireDefault(require("@containers/ChannelCreateForm"));

var _Row = _interopRequireDefault(require("@components/Row"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelTools = function ChannelTools() {
  return _react.default.createElement("div", null, _react.default.createElement(_Row.default, null, _react.default.createElement("h3", null, "Log in to an existing channel:"), _react.default.createElement(_ChannelLoginForm.default, null)), _react.default.createElement(_Row.default, null, _react.default.createElement("h3", null, "Create a brand new channel:"), _react.default.createElement(_ChannelCreateForm.default, null)));
};

var _default = ChannelTools;
exports.default = _default;