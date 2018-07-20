"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createMetaTagsArray = function createMetaTagsArray(metaTagsObject) {
  var metaTagsArray = [];

  for (var key in metaTagsObject) {
    if (metaTagsObject.hasOwnProperty(key)) {
      metaTagsArray.push({
        property: key,
        content: metaTagsObject[key]
      });
    }
  }

  return metaTagsArray;
};

var _default = createMetaTagsArray;
exports.default = _default;