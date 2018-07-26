const { getClaim } = require('../../../../lbrynet');
const addGetResultsToFileData = require('./addGetResultsToFileData.js');
const createFileData = require('./createFileData.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const db = require('../../../../models');

/*

  route to get a claim

*/

const claimGet = ({ ip, originalUrl, params }, res) => {
  const name = params.name;
  const claimId = params.claimId;
  let fileData;
  let resolveResult;
  let getResult;
  let message;
  let completed;
  // resolve the claim
  db.Claim.resolveClaim(name, claimId)
    .then(result => {
      // make sure a claim actually exists at that uri
      if (!result) {
        throw new Error('No matching uri found in Claim table');
      }
      resolveResult = result;
      return getClaim(`${name}#${claimId}`);
    })
    .then(result => {
      getResult = result;
      fileData = createFileData(resolveResult);
      fileData = addGetResultsToFileData(fileData, getResult);
      const upsertCriteria = { name, claimId};
      return db.upsert(db.File, fileData, upsertCriteria, 'File');
    })
    .then(() => {
      ({ message, completed } = getResult);
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
