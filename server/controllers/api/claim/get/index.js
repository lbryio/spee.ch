const { getClaim } = require('server/lbrynet');
const { createFileRecordDataAfterGet } = require('server/models/utils/createFileRecordData.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const getClaimData = require('server/utils/getClaimData');
const chainquery = require('chainquery').default;
const db = require('server/models');
const logger = require('winston');
const awaitFileSize = require('server/utils/awaitFileSize');

/*

  route to get a claim

*/

const claimGet = async ({ ip, originalUrl, params }, res) => {
  const name = params.name;
  const claimId = params.claimId;

  try {
    let claimInfo = await chainquery.claim.queries.resolveClaim(name, claimId).catch(() => {});
    if (claimInfo) {
      logger.info('claim/get: claim resolved in chainquery');
    }
    if (!claimInfo) {
      claimInfo = await db.Claim.resolveClaim(name, claimId);
    }
    if (!claimInfo) {
      throw new Error('claim/get: resolveClaim: No matching uri found in Claim table');
    }
    let lbrynetResult = await getClaim(`${name}#${claimId}`);
    if (!lbrynetResult) {
      throw new Error(`claim/get: getClaim Unable to Get ${name}#${claimId}`);
    }
    const claimData = await getClaimData(claimInfo);
    if (!claimData) {
      throw new Error('claim/get: getClaimData failed to get file blobs');
    }
    const fileReady = await awaitFileSize(lbrynetResult.outpoint, 2000000, 10000, 250);

    if (fileReady !== 'ready') {
      throw new Error('claim/get: failed to get file after 10 seconds');
    }
    const fileData = await createFileRecordDataAfterGet(claimData, lbrynetResult);
    if (!fileData) {
      throw new Error('claim/get: createFileRecordDataAfterGet failed to create file in time');
    }
    const upsertCriteria = { name, claimId };
    await db.upsert(db.File, fileData, upsertCriteria, 'File');
    const { message, completed } = lbrynetResult;
    res.status(200).json({
      success: true,
      message,
      completed,
    });
  } catch (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  }
};
module.exports = claimGet;
