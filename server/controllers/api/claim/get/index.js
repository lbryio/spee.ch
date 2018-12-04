const { getClaim } = require('../../../../lbrynet');
const { createFileRecordDataAfterGet } = require('../../../../models/utils/createFileRecordData.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const getClaimData = require('server/utils/getClaimData');
const chainquery = require('chainquery');
const db = require('../../../../models');
const waitOn = require('wait-on');

/*

  route to get a claim

*/

const claimGet = async ({ ip, originalUrl, params }, res) => {
  const name = params.name;
  const claimId = params.claimId;

  try {
    let claimData = await chainquery.claim.queries.resolveClaim(name, claimId).catch(() => {});
    if (!claimData) {
      claimData = await db.Claim.resolveClaim(name, claimId);
    }

    if (!claimData) {
      throw new Error('No matching uri found in Claim table');
    }

    let lbrynetResult = await getClaim(`${name}#${claimId}`);
    if (!lbrynetResult) {
      throw new Error(`Unable to Get ${name}#${claimId}`);
    }

    let fileData = await createFileRecordDataAfterGet(await getClaimData(claimData), lbrynetResult);
    const upsertCriteria = { name, claimId };
    await db.upsert(db.File, fileData, upsertCriteria, 'File');

    try {
      await waitOn({
        resources: [ lbrynetResult.file_name ],
        delay    : 500,
        timeout  : 10000, // 10 seconds
      });
    } catch (e) {}

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
