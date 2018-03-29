const { getClaim } = require('../../helpers/lbryApi.js');
const { addGetResultsToFileData, createFileData } = require('../../helpers/publishHelpers.js');
const { handleErrorResponse } = require('helpers/errorHandlers.js');

/*

  route to get a claim

*/

const claimGet = (db) => {
  return ({ ip, originalUrl, params }, res) => {
    const name = params.name;
    const claimId = params.claimId;
    // resolve the claim
    db.Claim.resolveClaim(name, claimId)
      .then(resolveResult => {
        // make sure a claim actually exists at that uri
        if (!resolveResult) {
          throw new Error('No matching uri found in Claim table');
        }
        let fileData = createFileData(resolveResult);
        // get the claim
        return Promise.all([fileData, getClaim(`${name}#${claimId}`)]);
      })
      .then(([ fileData, getResult ]) => {
        fileData = addGetResultsToFileData(fileData, getResult);
        return Promise.all([db.upsert(db.File, fileData, {name, claimId}, 'File'), getResult]);
      })
      .then(([ fileRecord, {message, completed} ]) => {
        res.status(200).json({ success: true, message, completed });
      })
      .catch(error => {
        handleErrorResponse(originalUrl, ip, error, res);
      });
  };
};

module.exports = claimGet;
