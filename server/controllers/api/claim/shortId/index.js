import { handleErrorResponse } from '../../../utils/errorHandlers.js';
import chainquery from 'chainquery';

/*

  route to get a short claim id from long claim Id

*/

const claimShortId = async ({ ip, originalUrl, body, params }, res) => {
  // TODO: use new sdk partialId features when available
  try {
    let shortId = await chainquery.claim.queries
      .getShortClaimIdFromLongClaimId(params.longId, params.name)
      .catch(() => {
        return params.longId;
      });

    res.status(200).json({ success: true, data: shortId });
  } catch (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

export default claimShortId;
