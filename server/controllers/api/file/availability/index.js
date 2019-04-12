import logger from 'winston';

import { handleErrorResponse } from '../../../utils/errorHandlers.js';
import { getFileListFileByOutpoint } from 'server/lbrynet';

import chainquery from 'chainquery';
import publishCache from 'server/utils/publishCache';

/*

  route to see if asset is available locally

*/

const fileAvailability = async ({ ip, originalUrl, params }, res) => {
  const name = params.name;
  const claimId = params.claimId;

  let outpoint;

  logger.debug(`fileAvailability params: name:${name} claimId:${claimId}`);
  try {
    if (publishCache.get(claimId)) {
      return res.status(200).json({ success: true, data: true });
    } else {
      outpoint = await chainquery.claim.queries.resolveClaim(claimId).generated_outpoint;
    }
    logger.debug(`fileAvailability: outpoint: ${outpoint}`);
    let fileData = getFileListFileByOutpoint(outpoint);
    if (fileData && fileData[0]) {
      return res.status(200).json({ success: true, data: true });
    } else {
      res.status(200).json({ success: true, data: false });
    }
  } catch (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

export default fileAvailability;
