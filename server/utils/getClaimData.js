import chainquery from 'chainquery';
import mime from 'mime-types';
import { isBlocked } from './blockList';
import publishCache from 'server/utils/publishCache';
import logger from 'winston';

import { details, assetDefaults } from '@config/siteConfig';
const { host } = details;
const { thumbnail } = assetDefaults;

export default async (data, chName = null, chShortId = null) => {
  // TODO: Refactor getching the channel name out; requires invasive changes.

  let dataFromFileList, dataFromChainquery, outpoint, certificateId;

  if (data && data.dataValues) {
    dataFromChainquery = data.dataValues;
    outpoint = data.generated_outpoint;
    certificateId = dataFromChainquery.publisher_id;
  } else if (data && data[0] && data[0].outpoint) {
    dataFromFileList = data[0];
    logger.debug('USE CACHE: claimid:', dataFromFileList.claim_id);
    outpoint = dataFromFileList.outpoint;

    let publishResult = dataFromFileList.claim_id && publishCache.get(dataFromFileList.claim_id);
    logger.debug(`getClaimData: publishResult:`, publishResult);
    certificateId = publishResult.certificateId;
  } else {
    throw new Error(`NO DATA, CLYDE`);
  }

  let channelShortId = chShortId;
  let channelName = chName;
  // TODO: Factor blocked out
  let blocked;

  if (isBlocked(outpoint)) {
    blocked = true;
  }

  if (!chName && certificateId && !channelName) {
    channelName = await chainquery.claim.queries.getClaimChannelName(certificateId).catch(() => {});
  }

  if (!chShortId && certificateId && channelName) {
    channelShortId = await chainquery.claim.queries
      .getShortClaimIdFromLongClaimId(certificateId, channelName)
      .catch(() => null);
  }
  if (dataFromFileList && dataFromFileList.outpoint) {
    // file_list values due to recent publish
    console.log('ClaimName', dataFromFileList.claim_name);
    return {
      name: dataFromFileList.claim_name,
      title: dataFromFileList.metadata.title,
      certificateId,
      channelName,
      channelShortId,
      contentType: dataFromFileList.mime_type || dataFromFileList.media_type,
      claimId: dataFromFileList.claim_id,
      fileExt: mime.extension(dataFromFileList.mime_type),
      description: dataFromFileList.metadata.description,
      nsfw: dataFromFileList.metadata.nsfw,
      thumbnail: dataFromFileList.metadata.thumbnail,
      outpoint,
      host,
      pending: false,
      blocked: blocked,
      license: dataFromFileList.metadata.license,
      licenseUrl: dataFromFileList.metadata.license_url,
      transactionTime: 0,
    };
  } else {
    // chainquery result values
    console.log('ClaimName', dataFromChainquery.name);
    return {
      name: dataFromChainquery.name,
      title: dataFromChainquery.title,
      certificateId,
      channelName,
      channelShortId,
      contentType: dataFromChainquery.content_type,
      claimId: dataFromChainquery.claim_id,
      fileExt: data.generated_extension,
      description: dataFromChainquery.description,
      nsfw: dataFromChainquery.is_nsfw,
      thumbnail: dataFromChainquery.thumbnail_url,
      outpoint,
      host,
      pending: Boolean(dataFromChainquery.height === 0),
      blocked: blocked,
      license: dataFromChainquery.license,
      licenseUrl: dataFromChainquery.license_url,
      transactionTime: dataFromChainquery.transaction_time,
    };
  }
};
