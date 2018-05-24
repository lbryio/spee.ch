"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetPreview = function AssetPreview(_ref) {
  var defaultThumbnail = _ref.defaultThumbnail,
      _ref$claimData = _ref.claimData,
      name = _ref$claimData.name,
      claimId = _ref$claimData.claimId,
      fileExt = _ref$claimData.fileExt,
      contentType = _ref$claimData.contentType,
      thumbnail = _ref$claimData.thumbnail;
  var directSourceLink = "".concat(claimId, "/").concat(name, ".").concat(fileExt);
  var showUrlLink = "/".concat(claimId, "/").concat(name);
  return _react.default.createElement("div", {
    className: "asset-holder"
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: showUrlLink
  }, function () {
    switch (contentType) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
      case 'image/gif':
        return _react.default.createElement("img", {
          className: 'asset-preview',
          src: directSourceLink,
          alt: name
        });

      case 'video/mp4':
        return _react.default.createElement("img", {
          className: 'asset-preview video',
          src: thumbnail || defaultThumbnail,
          alt: name
        });

      default:
        return _react.default.createElement("p", null, "unsupported file type");
    }
  }()));
};

var _default = AssetPreview;
exports.default = _default;