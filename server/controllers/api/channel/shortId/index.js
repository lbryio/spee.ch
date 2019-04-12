import { handleErrorResponse } from 'server/controllers/utils/errorHandlers.js';
import db from 'server/models';
import chainquery from 'chainquery';

/*

route to get a short channel id from long channel Id

*/

const channelShortIdRoute = async ({ ip, originalUrl, params }, res) => {
  try {
    let shortId = await chainquery.claim.queries
      .getShortClaimIdFromLongClaimId(params.longId, params.name)
      .catch(() => false);

    if (!shortId) {
      shortId = await db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name);
    }

    res.status(200).json(shortId);
  } catch (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

export default channelShortIdRoute;
