const { handleErrorResponse } = require('helpers/errorHandlers.js');

/*

route to get a short channel id from long channel Id

*/

const channelShortIdRoute = (db) => {
  return ({ ip, originalUrl, params }, res) => {
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
