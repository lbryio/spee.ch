const logger = require('winston');
// const { details: { host } } = require('siteConfig.js');
// const { db } = require('mysqlConfig.js');
const { handleErrorResponse } = require('helpers/errorHandlers.js');

/*

route to get a short channel id from long channel Id

*/

const channelShortIdRoute = (db, host) => {
  return ({ ip, originalUrl, params }, res) => {
    console.log('hello from channelShortIdRoute');
    logger.debug('host:', host);
    db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name)
      .then(shortId => {
        res.status(200).json(shortId);
      })
      .catch(error => {
        handleErrorResponse(originalUrl, ip, error, res);
      });
  };
};

module.exports = channelShortIdRoute;
