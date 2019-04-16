import db from 'server/models';

const checkChannelAvailability = name => {
  return db.Channel.findAll({
    where: {
      channelName: name,
    },
  })
    .then(result => {
      return result.length <= 0;
    })
    .catch(error => {
      throw error;
    });
};

export default checkChannelAvailability;
