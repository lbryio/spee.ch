const logger = require('winston');

const db = require('../../../models');
const chainquery = require('chainquery');
const isApprovedChannel = require('../../../../utils/isApprovedChannel');

const getClaimId = require('../../utils/getClaimId.js');
const { handleErrorResponse } = require('../../utils/errorHandlers.js');

const serveFile = require('./serveFile.js');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const BLOCKED_CLAIM = 'BLOCKED_CLAIM';
const NO_FILE = 'NO_FILE';
const CONTENT_UNAVAILABLE = 'CONTENT_UNAVAILABLE';

const { publishing: { serveOnlyApproved, approvedChannels } } = require('@config/siteConfig');

const getClaimIdAndServeAsset = async (channelName, channelClaimId, name, _claimId, originalUrl, ip, res) => {
  try {
    const claimId = await getClaimId(channelName, channelClaimId, name, _claimId);

    let _claim = await chainquery.claim.queries.resolveClaim(name, claimId);
    if (!_claim) {
      _claim = await db.Claim.findOne({ where: { name, claimId } });
    }
    const claim = _claim.dataValues;

    if (serveOnlyApproved && !isApprovedChannel({ longId: claim.publisher_id }, approvedChannels)) {
      throw new Error(CONTENT_UNAVAILABLE);
    }
    await db.Blocked.isNotBlocked(claim.outpoint);

    const fileRecord = await db.File.findOne({ where: { name, claimId } });
    if (!fileRecord) {
      throw NO_FILE;
    }

    serveFile(fileRecord.dataValues, res);
  } catch (error) {
    switch (error) {
      case NO_CLAIM:
        logger.debug('no matching claim');
        return res.status(404).json({
          success: false,
          message: 'No matching claim id could be found for that url',
        });
      case NO_CHANNEL:
        logger.debug('no channel found');
        return res.status(404).json({
          success: false,
          message: 'No matching channel id could be found for that url',
        });
      case CONTENT_UNAVAILABLE:
        logger.debug('unapproved channel');
        return res.status(400).json({
          success: false,
          message: 'This content is unavailable',
        });
      case BLOCKED_CLAIM:
        logger.debug('claim was blocked');
        return res.status(451).json({
          success: false,
          message: 'In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content from our applications. For more details, see https://lbry.io/faq/dmca',
        });
      case NO_FILE:
        logger.debug('no file available');
        return res.status(307).redirect(`/api/claim/get/${name}/${_claimId}`);
    }
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

module.exports = getClaimIdAndServeAsset;
