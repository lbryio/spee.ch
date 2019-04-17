import { handleErrorResponse } from '../../../utils/errorHandlers.js';
import db from 'server/models';

/*

  route to return data for a claim

*/

const claimViews = async ({ ip, originalUrl, body, params }, res) => {
  let claimId = params.claimId;
  if (claimId === 'none') claimId = null;

  try {
    const viewCount = await db.Views.getGetUniqueViewsbByClaimId(claimId);

    res.status(200).json({
      success: true,
      data: {
        [claimId]: viewCount,
      },
    });
  } catch (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

export default claimViews;
