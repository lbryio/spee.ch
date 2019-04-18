const fs = require('fs');

const logger = require('winston');
const {
  publishing: { publishingChannelWhitelist },
} = require('@config/siteConfig');
const ipBanFile = './site/config/ipBan.txt';
const forbiddenMessage =
  '<h1>Forbidden</h1>If you are seeing this by mistake, please contact us using <a href="https://chat.lbry.com/">https://chat.lbry.com/</a>';

let ipCounts = {};
let blockedAddresses = [];

if (fs.existsSync(ipBanFile)) {
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(ipBanFile),
  });

  lineReader.on('line', line => {
    if (line && line !== '') {
      blockedAddresses.push(line);
    }
  });
}

const autoblockPublishMiddleware = (req, res, next) => {
  let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(/,\s?/)[0];

  if (blockedAddresses.indexOf(ip) !== -1) {
    res.status(403).send(forbiddenMessage);
    res.end();

    return;
  }

  let count = (ipCounts[ip] = (ipCounts[ip] || 0) + 1);

  setTimeout(() => {
    if (ipCounts[ip]) {
      ipCounts[ip]--;
      if (ipCounts[ip] === 0) {
        delete ipCounts[ip];
      }
    }
  }, 600000 /* 10 minute retainer */);

  if (count === 10) {
    logger.error(`Banning IP: ${ip}`);
    blockedAddresses.push(ip);
    res.status(403).send(forbiddenMessage);
    res.end();

    fs.appendFile(ipBanFile, ip + '\n', () => {});
  } else {
    next();
  }
};

const autoblockPublishBodyMiddleware = (req, res, next) => {
  if (req.body && publishingChannelWhitelist) {
    let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(/,\s?/)[0];
    const { channelName } = req.body;

    if (channelName && publishingChannelWhitelist.indexOf(channelName.toLowerCase()) !== -1) {
      delete ipCounts[ip];
    }
  }
  next();
};

module.exports = {
  autoblockPublishMiddleware,
  autoblockPublishBodyMiddleware,
};
