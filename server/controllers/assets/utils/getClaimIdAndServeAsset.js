import logger from 'winston';

import db from 'server/models';
import chainquery from 'chainquery';
import { getFileListFileByOutpoint, getClaim } from 'server/lbrynet';
import getClaimId from '../../utils/getClaimId.js';
import { handleErrorResponse } from '../../utils/errorHandlers.js';
import awaitFileSize from 'server/utils/awaitFileSize';
import serveFile from './serveFile.js';
import parseQueryString from 'server/utils/parseQuerystring';
import publishCache from 'server/utils/publishCache';
import isBot from 'isbot';
import isApprovedChannel from '@globalutils/isApprovedChannel';

import { publishing } from '@config/siteConfig';

const { serveOnlyApproved, approvedChannels } = publishing;

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const BLOCKED_CLAIM = 'BLOCKED_CLAIM';
const NO_FILE = 'NO_FILE';
const CONTENT_UNAVAILABLE = 'CONTENT_UNAVAILABLE';

const RETRY_MS = 250;
const TIMEOUT_MS = 15000;
const MIN_BYTES = 15000000;

const getClaimIdAndServeAsset = async (
  channelName,
  channelClaimId,
  claimName,
  partialClaimId,
  originalUrl,
  ip,
  res,
  headers
) => {
  let outpoint;
  let channelId;
  let cqResult;
  let claimId = '';
  try {
    const queryObject = parseQueryString(originalUrl);
    claimId = await getClaimId(channelName, channelClaimId, claimName, partialClaimId);

    if (publishCache.get(claimId)) {
      outpoint = publishCache.get(claimId).outpoint;
      channelId = publishCache.get(claimId).certificateId;
    } else {
      cqResult = await chainquery.claim.queries.resolveClaim(claimId);
      if (!cqResult || !cqResult.dataValues) {
        throw new Error(NO_CLAIM);
      }
      outpoint = cqResult.generated_outpoint;
      channelId = channelClaimId || cqResult.dataValues.publisher_id;
    }
    if (serveOnlyApproved && !isApprovedChannel({ longId: channelId }, approvedChannels)) {
      throw new Error(CONTENT_UNAVAILABLE);
    }
    // This throws "BLOCKED_CLAIM" on error
    await db.Blocked.isNotBlocked(outpoint);

    let fileListResult = await getFileListFileByOutpoint(outpoint);
    if (fileListResult && fileListResult[0]) {
      serveFile(fileListResult[0], res, originalUrl);
    } else if (!isBot(headers['user-agent'])) {
      let lbrynetResult = await getClaim(`${claimName}#${claimId}`);
      if (!lbrynetResult || !lbrynetResult.claim_id) {
        throw new Error('LBRYNET_NO_GET');
      }
      let fileReady = await awaitFileSize(lbrynetResult.outpoint, MIN_BYTES, RETRY_MS, TIMEOUT_MS);
      if (fileReady !== 'ready') {
        throw new Error('claim/get: failed to get file after 15 seconds');
      }
      serveFile(lbrynetResult, res, originalUrl);
    }
    if (
      (headers && headers['user-agent'] && /LBRY/.test(headers['user-agent']) === false) ||
      (queryObject && !queryObject.hasOwnProperty('thumbnail'))
    ) {
      db.Views.create({
        time: Date.now(),
        isChannel: false,
        claimId: claimId,
        publisherId: channelId,
        ip,
      });
    }
  } catch (error) {
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
        message:
          'In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content from our applications. For more details, see https://lbry.io/faq/dmca',
      });
    }
    if (error === NO_FILE) {
      logger.debug('no file available');
      return res.status(307).redirect(`/api/claim/get/${claimName}/${claimId}`);
    }
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

export default getClaimIdAndServeAsset;
