const logger = require('winston');
const refreshBlockedList = require('../../../models/utils/refreshBlockedList.js');

const updateBlockedList = (req, res) => {
  refreshBlockedList()
    .then(data => {
      logger.info('finished updating blocked content list');
      res.status(200).json({
        success: true,
        data,
      });
    })
    .catch(error => {
      logger.error(error);
      res.status(500).json({
        success: false,
        error,
      });
    });
};

module.exports = updateBlockedList;
