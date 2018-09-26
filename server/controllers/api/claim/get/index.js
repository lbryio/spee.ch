const { getClaim } = require('../../../../lbrynet');
const { createFileRecordDataAfterGet } = require('../../../../models/utils/createFileRecordData.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const getClaimData = require('server/utils/getClaimData');
const chainquery = require('chainquery');
const db = require('../../../../models');

/*

  route to get a claim

*/

const claimGet = ({ ip, originalUrl, params }, res) => {
  const name = params.name;
  const claimId = params.claimId;
  let resolveResult;
  let getResult;



  chainquery.claim.queries.resolveClaim(name, claimId)
    .then(result => {
      if (!result) {
        // could not find remote, return false to try local
        return false;
      }
      return resolveResult = result;
    })
    .then(result => {
      if (result === false) {
        // Could not find remote, try local
        return db.Claim.resolveClaim(name, claimId);
      }
      return result;
    })
    .then(result => {
      if (!result) {
        throw new Error('No matching uri found in Claim table');
      }
      return resolveResult = result;
    })
    .then(result => getClaim(`${name}#${claimId}`))
    .then(result => {
      if (!result) {
        throw new Error(`Unable to Get ${name}#${claimId}`);
      }
      getResult = result;
      if (result.completed) {
        return createFileRecordDataAfterGet(getClaimData(resolveResult), getResult)
          .then(fileData => {
            const upsertCriteria = {name, claimId};
            return db.upsert(db.File, fileData, upsertCriteria, 'File');
          });
      }
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
