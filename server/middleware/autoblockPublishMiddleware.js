const fs = require('fs');

const logger = require('winston');
const {
  publishing: { publishingChannelWhitelist },
} = require('@config/siteConfig');
const ipBanFile = './site/config/ipBan.txt';
const ipWhitelist = './site/config/ipWhitelist.txt';
const forbiddenMessage =
  '<h1>Forbidden</h1>If you are seeing this by mistake, please contact us using <a href="https://chat.lbry.com/">https://chat.lbry.com/</a>';
const maxPublishesInTenMinutes = 20;
let ipCounts = {};
let blockedAddresses = [];
let whitelistedAddresses = [];

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

// If a file called ipWhitelist.txt exists
// Please comment above each whitelisted IP why/who/when etc
// # Jim because he's awesome - January 2018
if (fs.existsSync(ipWhitelist)) {
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(ipWhitelist),
  });

  lineReader.on('line', line => {
    if (line && line !== '' && line[0] !== '#') {
      whitelistedAddresses.push(line);
    }
  });
}

const autoblockPublishMiddleware = (req, res, next) => {
  let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(/,\s?/)[0];

  if (whitelistedAddresses.indexOf(ip) !== -1) {
    next();
    return;
  }
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

  if (count === maxPublishesInTenMinutes) {
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
