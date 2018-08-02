const { getClaim } = require('../../../../lbrynet');
const { createFileRecordDataAfterGet } = require('../../../../models/utils/createFileRecordData.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const db = require('../../../../models');

/*

  route to get a claim

*/

const claimGet = ({ ip, originalUrl, params }, res) => {
  const name = params.name;
  const claimId = params.claimId;
  let resolveResult;
  let getResult;
  // resolve the claim
  db.Claim.resolveClaim(name, claimId)
    .then(result => {
      if (!result) {
        throw new Error('No matching uri found in Claim table');
      }
      resolveResult = result;
      return getClaim(`${name}#${claimId}`);
    })
    .then(result => {
      getResult = result;
    })
    .then(() => {
      const fileData = createFileRecordDataAfterGet(resolveResult, getResult);
      const upsertCriteria = { name, claimId };
      return db.upsert(db.File, fileData, upsertCriteria, 'File');
    })
    .then(() => {
      const { message, completed } = getResult;
      res.status(200).json({
        success: true,
        message,
        completed,
      });
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimGet;
