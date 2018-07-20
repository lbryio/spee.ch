"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var determineContentTypeFromExtension = function determineContentTypeFromExtension(thumbnail) {
  if (thumbnail) {
    var fileExt = thumbnail.substring(thumbnail.lastIndexOf('.'));

    switch (fileExt) {
      case 'jpeg':
      case 'jpg':
        return 'image/jpg';

      case 'png':
        return 'image/png';

      case 'gif':
        return 'image/gif';

      case 'mp4':
        return 'video/mp4';

      default:
        return '';
    }
  }

  return '';
};

var _default = determineContentTypeFromExtension;
exports.default = _default;