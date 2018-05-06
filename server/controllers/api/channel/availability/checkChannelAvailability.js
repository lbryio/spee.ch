const db = require('../../../../models');

const checkChannelAvailability = (name) => {
  return db.Channel
    .findAll({
      where: {
        channelName: name,
      },
    })
    .then(result => {
      return (result.length <= 0);
    })
    .catch(error => {
      throw error;
    });
};

module.exports = checkChannelAvailability;
