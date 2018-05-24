"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavBarChannelDropdown(_ref) {
  var channelName = _ref.channelName,
      handleSelection = _ref.handleSelection,
      defaultSelection = _ref.defaultSelection,
      VIEW = _ref.VIEW,
      LOGOUT = _ref.LOGOUT;
  return _react.default.createElement("select", {
    type: "text",
    id: "nav-bar-channel-select",
    className: "select select--arrow link--nav",
    onChange: handleSelection,
    value: defaultSelection
  }, _react.default.createElement("option", {
    id: "nav-bar-channel-select-channel-option"
  }, channelName), _react.default.createElement("option", {
    value: VIEW
  }, "View"), _react.default.createElement("option", {
    value: LOGOUT
  }, "Logout"));
}

;
var _default = NavBarChannelDropdown;
exports.default = _default;