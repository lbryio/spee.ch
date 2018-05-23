"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UrlMiddle(_ref) {
  var publishInChannel = _ref.publishInChannel,
      selectedChannel = _ref.selectedChannel,
      loggedInChannelName = _ref.loggedInChannelName,
      loggedInChannelShortId = _ref.loggedInChannelShortId;

  if (publishInChannel) {
    if (selectedChannel === loggedInChannelName) {
      return _react.default.createElement("span", {
        id: "url-channel",
        className: "url-text--secondary"
      }, loggedInChannelName, ":", loggedInChannelShortId, " /");
    }

    return _react.default.createElement("span", {
      id: "url-channel-placeholder",
      className: "url-text--secondary tooltip"
    }, "@channel", _react.default.createElement("span", {
      className: "tooltip-text"
    }, "Select a channel below"), " /");
  }

  return _react.default.createElement("span", {
    id: "url-no-channel-placeholder",
    className: "url-text--secondary tooltip"
  }, "xyz", _react.default.createElement("span", {
    className: "tooltip-text"
  }, "This will be a random id"), " /");
}

UrlMiddle.propTypes = {
  publishInChannel: _propTypes.default.bool.isRequired,
  loggedInChannelName: _propTypes.default.string,
  loggedInChannelShortId: _propTypes.default.string
};
var _default = UrlMiddle;
exports.default = _default;