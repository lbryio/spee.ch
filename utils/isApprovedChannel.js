function isApprovedChannel (channel, channels) {
  const { name, shortId: short, longId: long } = channel;
  return Boolean(
    (long && channels.find(chan => chan.longId === long)) ||
    (name && short && channels.find(chan => chan.name === name && chan.shortId === short))
  );
}

module.exports = isApprovedChannel;
