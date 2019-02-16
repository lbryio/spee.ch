const NodeCache = require('node-cache');
module.exports = new NodeCache({ stdTTL: 180, checkperiod: 60 });
