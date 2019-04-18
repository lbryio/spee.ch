const logger = require('winston');

const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const { getFileListFileByOutpoint } = require('server/lbrynet');

const chainquery = require('chainquery').default;

/*

  route to see if asset is available locally

*/

const fileAvailability = ({ ip, originalUrl, params }, res) => {
  const name = params.name;
  const claimId = params.claimId;
  logger.debug(`fileAvailability params: name:${name} claimId:${claimId}`);
  // TODO: we probably eventually want to check the publishCache for the claimId too,
  //  and shop the outpoint to file_list.
  return chainquery.claim.queries
    .resolveClaim(name, claimId)
    .then(result => {
      return `${result.dataValues.transaction_hash_id}:${result.dataValues.vout}`;
    })
    .then(outpoint => {
      logger.debug(`fileAvailability: outpoint: ${outpoint}`);
      return getFileListFileByOutpoint(outpoint);
    })
    .then(result => {
      if (result && result[0]) {
        return res.status(200).json({ success: true, data: true });
      } else {
        res.status(200).json({ success: true, data: false });
      }
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = fileAvailability;
