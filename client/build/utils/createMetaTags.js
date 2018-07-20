"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssetMetaTags = _interopRequireDefault(require("./createAssetMetaTags"));

var _createChannelMetaTags = _interopRequireDefault(require("./createChannelMetaTags.js"));

var _createBasicMetaTags = _interopRequireDefault(require("./createBasicMetaTags.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMetaTags = function createMetaTags(_ref) {
  var asset = _ref.asset,
      channel = _ref.channel;

  if (asset) {
    return (0, _createAssetMetaTags.default)(asset);
  }

  if (channel) {
    return (0, _createChannelMetaTags.default)(channel);
  }

  return (0, _createBasicMetaTags.default)();
};

var _default = createMetaTags;
exports.default = _default;