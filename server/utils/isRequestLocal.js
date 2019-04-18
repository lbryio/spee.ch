module.exports = function (req) {
  let reqIp = req.connection.remoteAddress;
  let host = req.get('host');

  return reqIp === '127.0.0.1' || reqIp === '::ffff:127.0.0.1' || reqIp === '::1' || host.indexOf('localhost') !== -1;
};
