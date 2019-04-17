import logger from 'winston';

import { sendGAServeEvent } from '@serverutils/googleAnalytics';
import handleShowRender from 'server/render/handleShowRender';

import lbryUri from '@globalutils/lbryUri.js';

import determineRequestType from '../utils/determineRequestType.js';
import getClaimIdAndServeAsset from '../utils/getClaimIdAndServeAsset.js';

import { SHOW } from '../constants/request_types.js';

/*

  route to serve an asset or the react app via the claim name only

*/

const serveByClaim = (req, res) => {
  const { headers, ip, originalUrl, params } = req;

  try {
    let isChannel, hasFileExtension, claimName;

    ({ isChannel } = lbryUri.parseIdentifier(params.claim));
    if (isChannel) {
      logger.debug('channel request:', { headers, ip, originalUrl, params });
      return handleShowRender(req, res);
    }

    ({ hasFileExtension } = lbryUri.parseModifier(params.claim));
    if (determineRequestType(hasFileExtension, headers) === SHOW) {
      logger.debug('show request:', { headers, ip, originalUrl, params });
      return handleShowRender(req, res);
    }

    ({ claimName } = lbryUri.parseClaim(params.claim));
    logger.debug('serve request:', { headers, ip, originalUrl, params });

    getClaimIdAndServeAsset(null, null, claimName, null, originalUrl, ip, res, headers);

    sendGAServeEvent(headers, ip, originalUrl);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default serveByClaim;
