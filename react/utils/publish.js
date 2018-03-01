export const createPublishMetadata = (claim, { type }, { title, thumbnail, description, license, nsfw }, publishInChannel, selectedChannel) => {
  let metadata = {
    name: claim,
    title,
    thumbnail,
    description,
    license,
    nsfw,
    type,
  };
  if (publishInChannel) {
    metadata['channelName'] = selectedChannel;
  }
  return metadata;
};

export const createPublishFormData = (file, metadata) => {
  let fd = new FormData();
  // append file
  fd.append('file', file);
  // append metadata
  for (let key in metadata) {
    if (metadata.hasOwnProperty(key)) {
      fd.append(key, metadata[key]);
    }
  }
  return fd;
};
