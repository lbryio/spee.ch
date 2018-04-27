const db = require('../../../../models');

const checkChannelAvailability = (name) => {
  return db.Channel
    .findAll({
      where: { channelName: name },
    })
    .then(result => {
      if (result.length >= 1) {
        throw new Error('That channel has already been claimed');
      }
      return name;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = checkChannelAvailability;
