const logger = require('winston');
const db = require('../../../models');

const getOEmbedData = (req, res) => {
  logger.debug('req', req.query);
  res.status(200).json({
    success: true,
    message: 'hello',
    data: req.query,
  });
  // db.Blocked.refreshTable()
  //   .then(data => {
  //     logger.info('finished updating blocked content list');
  //     res.status(200).json({
  //       success: true,
  //       data,
  //     });
  //   })
  //   .catch(error => {
  //     logger.error(error);
  //     res.status(500).json({
  //       success: false,
  //       error,
  //     });
  //   });
};

module.exports = getOEmbedData;
