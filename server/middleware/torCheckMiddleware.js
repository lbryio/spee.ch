const logger = require('winston');

function ipIsInTorList (ip) {
  return true;
}

const torCheck = ({ ip, headers, body }, res, next) => {
  logger.debug(`tor check for:`, {
    ip,
    headers,
    body,
  });
  // check the tor node list
  if (ipIsInTorList(ip)) {
    return res.status('400').json({
      success: 'false',
      message: 'Unfortunately this api route is not currently available for tor users.  We are working on a solution that will allow tor users to use this endpoint in the future.',
    });
  }
  return next();
};

module.exports = torCheck;
