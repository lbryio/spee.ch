const logger = require('winston');

const db = require('../../../models');
const isApprovedChannel = require('../../../utils/isApprovedChannel');

const getClaimId = require('../../utils/getClaimId.js');
const { handleErrorResponse } = require('../../utils/errorHandlers.js');

const serveFile = require('./serveFile.js');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const BLOCKED_CLAIM = 'BLOCKED_CLAIM';
const NO_FILE = 'NO_FILE';
const CONTENT_UNAVAILABLE = 'CONTENT_UNAVAILABLE';

const { publishing: { serveOnlyApproved } } = require('@config/siteConfig');

const getClaimIdAndServeAsset = (channelName, channelClaimId, claimName, claimId, originalUrl, ip, res) => {
  getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      claimId = fullClaimId;
      logger.debug('Full claim id:', fullClaimId);
      return db.Claim.findOne({
        where: {
          name   : claimName,
          claimId: fullClaimId,
        },
      });
    })
    .then(claim => {
      if (serveOnlyApproved && !isApprovedChannel({ longId: claim.dataValues.certificateId })) {
        throw new Error(CONTENT_UNAVAILABLE);
      }
      logger.debug('Outpoint:', claim.dataValues.outpoint);
      return db.Blocked.isNotBlocked(claim.dataValues.outpoint);
    })
    .then(() => {
      return db.File.findOne({
        where: {
          claimId,
          name: claimName,
        },
      });
    })
    .then(fileRecord => {
      if (!fileRecord) {
        throw NO_FILE;
      }
      serveFile(fileRecord.dataValues, res);
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
      if (error === CONTENT_UNAVAILABLE) {
        logger.debug('unapproved channel');
        return res.status(400).json({
          success: false,
          message: 'This content is unavailable',
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
        logger.debug('no file available');
        return res.status(307).redirect(`/api/claim/get/${claimName}/${claimId}`);
      }
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = getClaimIdAndServeAsset;
