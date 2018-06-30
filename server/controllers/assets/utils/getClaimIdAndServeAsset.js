const logger = require('winston');

const db = require('../../../models');

const getClaimId = require('../../api/claim/longId/getClaimId.js');
const { handleErrorResponse } = require('../../utils/errorHandlers.js');

const getLocalFileRecord = require('./getLocalFileRecord.js');
const serveFile = require('./serveFile.js');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const BLOCKED_CLAIM = 'BLOCKED_CLAIM';
const NO_FILE = 'NO_FILE';

const getClaimIdAndServeAsset = (channelName, channelClaimId, claimName, claimId, originalUrl, ip, res) => {
  getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      claimId = fullClaimId;
      logger.debug('Full claim id:', fullClaimId);
      return db.Claim.getOutpoint(claimName, fullClaimId);
    })
    .then(outpoint => {
      logger.debug('Outpoint:', outpoint);
      return db.Blocked.isNotBlocked(outpoint);
    })
    .then(() => {
      return getLocalFileRecord(claimId, claimName);
    })
    .then(fileRecord => {
      serveFile(fileRecord, res);
    })
    .catch(error => {
      if (error === NO_CLAIM) {
        logger.debug('no claim found');
        return res.status(404).json({
          success: false,
          message: 'No matching claim id could be found for that url',
        });
      }
      if (error === NO_CHANNEL) {
        logger.debug('no channel found');
        return res.status(404).json({
          success: false,
          message: 'No matching channel id could be found for that url',
        });
      }
      if (error === BLOCKED_CLAIM) {
        logger.debug('claim was blocked');
        return res.status(451).json({
          success: false,
          message: 'In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content from our applications. For more details, see https://lbry.io/faq/dmca',
        });
      }
      if (error === NO_FILE) {
        logger.debug('claim was blocked');
        return res.status(307).redirect(`/api/claim/get/${name}/${claimId}`);
      }
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = getClaimIdAndServeAsset;
