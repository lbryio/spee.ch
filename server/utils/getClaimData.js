const {
  details: { host },
  assetDefaults: { thumbnail },
} = require('@config/siteConfig');
const chainquery = require('chainquery').default;
// const { getClaim } = require('server/lbrynet');
const { isBlocked } = require('./blockList');

module.exports = async (data, chName = null, chShortId = null) => {
  // TODO: Refactor getching the channel name out; requires invasive changes.
  const dataVals = data.dataValues ? data.dataValues : data;
  const txid = dataVals.transaction_hash_id || dataVals.txid;
  let nout;

  if (typeof dataVals.vout === 'number') {
    nout = dataVals.vout;
  } else {
    nout = dataVals.nout;
  }

  const outpoint = `${txid}:${nout}`;
  const certificateId = dataVals.publisher_id || dataVals.certificateId;
  const fileExt = data.generated_extension || dataVals.fileExt;

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

  // Find a solution for the legacy application/octet-stream file extensions

  return {
    name: dataVals.name,
    title: dataVals.title,
    certificateId,
    channelName,
    channelShortId,
    contentType: dataVals.content_type || data.contentType,
    claimId: dataVals.claim_id || data.claimId,
    fileExt: fileExt,
    description: dataVals.description,
    nsfw: dataVals.is_nsfw,
    thumbnail: dataVals.thumbnail_url || data.thumbnail || thumbnail,
    outpoint,
    host,
    pending: Boolean(dataVals.height === 0),
    blocked: blocked,
    license: dataVals.license,
    licenseUrl: dataVals.license_url,
    transactionTime: dataVals.transaction_time,
  };
};
