import { createFileRecordDataAfterGet } from 'server/models/utils/createFileRecordData.js';
import { handleErrorResponse } from '../../../utils/errorHandlers.js';
import getClaimData from 'server/utils/getClaimData';
import chainquery from 'chainquery';
import db from 'server/models';
import logger from 'winston';
import awaitFileSize from 'server/utils/awaitFileSize';
import isBot from 'isbot';
import publishCache from 'server/utils/publishCache';
const { getClaim, resolveUri } = require('server/lbrynet');

const RETRY_MS = 250;
const TIMEOUT_MS = 15000;
const MIN_BYTES = 15000000;

/*

  route to get a claim

*/

const claimGet = async ({ ip, originalUrl, params, headers }, res) => {
  logger.debug(`claim/get params`, params);
  const name = params.name;
  const claimId = params.claimId;

  try {
    let claimDataFromChainquery = await chainquery.claim.queries
      .resolveClaim(claimId)
      .catch(() => null);

    if (!claimDataFromChainquery) {
      throw new Error('claim/get: resolveClaim: No matching uri found in Claim table');
    }

    if (headers && headers['user-agent'] && isBot(headers['user-agent'])) {
      let lbrynetResolveResult = await resolveUri(`${name}#${claimId}`);
      const { message, completed } = lbrynetResolveResult;
      res.status(200).json({
        success: true,
        message,
        completed: false,
      });
      return true;
    }

    let lbrynetResult = await getClaim(`${name}#${claimId}`);

    if (!lbrynetResult) {
      throw new Error(`claim/get: getClaim Unable to Get ${name}#${claimId}`);
    }

    const claimData = await getClaimData(claimDataFromChainquery);
    const fileReady = await awaitFileSize(lbrynetResult.outpoint, MIN_BYTES, RETRY_MS, TIMEOUT_MS);

    if (fileReady !== 'ready') {
      throw new Error('claim/get: failed to get file after 10 seconds');
    }

    const fileData = await createFileRecordDataAfterGet(claimData, lbrynetResult).catch(() => null);
    if (!fileData) {
      logger.info(
        'claim/get: createFileRecordDataAfterGet failed to create file dimensions in time'
      );
    }

    const upsertCriteria = { name, claimId };
    const upsertResult = await db
      .upsert(db.File, fileData, upsertCriteria, 'File')
      .catch(() => null);

    if (!upsertResult) {
      logger.info('claim/get: DB file upsert failed');
    }

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
export default claimGet;
