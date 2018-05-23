"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createThumbnailUrl = exports.createPublishFormData = exports.createPublishMetadata = void 0;

var createPublishMetadata = function createPublishMetadata(claim, _ref, _ref2, publishInChannel, selectedChannel) {
  var type = _ref.type;
  var title = _ref2.title,
      description = _ref2.description,
      license = _ref2.license,
      nsfw = _ref2.nsfw;
  var metadata = {
    name: claim,
    title: title,
    description: description,
    license: license,
    nsfw: nsfw,
    type: type
  };

  if (publishInChannel) {
    metadata['channelName'] = selectedChannel;
  }

  return metadata;
};

exports.createPublishMetadata = createPublishMetadata;

var createPublishFormData = function createPublishFormData(file, thumbnail, metadata) {
  var fd = new FormData(); // append file

  fd.append('file', file); // append thumbnail

  if (thumbnail) {
    fd.append('thumbnail', thumbnail);
  } // append metadata


  for (var key in metadata) {
    if (metadata.hasOwnProperty(key)) {
      fd.append(key, metadata[key]);
    }
  }

  return fd;
};

exports.createPublishFormData = createPublishFormData;

var createThumbnailUrl = function createThumbnailUrl(channel, channelId, claim, host) {
  return "".concat(host, "/").concat(channel, ":").concat(channelId, "/").concat(claim, "-thumb.png");
};

exports.createThumbnailUrl = createThumbnailUrl;