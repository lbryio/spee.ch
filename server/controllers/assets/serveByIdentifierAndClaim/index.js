import logger from 'winston';

import { sendGAServeEvent } from 'server/utils/googleAnalytics';
import handleShowRender from 'server/render/handleShowRender';

import lbryUri from '@globalutils/lbryUri.js';

import determineRequestType from '../utils/determineRequestType.js';
import getClaimIdAndServeAsset from '../utils/getClaimIdAndServeAsset.js';
import flipClaimNameAndId from '../utils/flipClaimNameAndId.js';

import { SHOW } from '../constants/request_types.js';

/*

  route to serve an asset or the react app via the claim name and an identifier

*/

const serverByIdentifierAndClaim = (req, res) => {
  const { headers, ip, originalUrl, params } = req;

  try {
    let hasFileExtension, claimName, isChannel, channelName, channelClaimId, claimId;

    ({ hasFileExtension } = lbryUri.parseModifier(params.claim));
    if (determineRequestType(hasFileExtension, headers) === SHOW) {
      logger.debug('show request:', { headers, ip, originalUrl, params });
      return handleShowRender(req, res);
    }

    ({ claimName } = lbryUri.parseClaim(params.claim));
    ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(
      params.identifier
    ));

    if (!isChannel) {
      [claimId, claimName] = flipClaimNameAndId(claimId, claimName);
    }

    logger.debug('serve request:', {
      headers,
      ip,
      originalUrl,
      params,
      channelName,
      channelClaimId,
      claimName,
      claimId,
    });

    getClaimIdAndServeAsset(
      channelName,
      channelClaimId,
      claimName,
      claimId,
      originalUrl,
      ip,
      res,
      headers
    );

    sendGAServeEvent(headers, ip, originalUrl);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default serverByIdentifierAndClaim;
