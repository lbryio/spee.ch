const { details: { host } } = require('@config/siteConfig');
const chainquery = require('chainquery').default;
const { getClaim } = require('server/lbrynet');

module.exports = async (data, chName = null, chShortId = null) => {
  // TODO: Refactor getching the channel name out; requires invasive changes.
  const certificateId = data.publisher_id || data.certificateId;
  let lbrynetClaimResult = null;
  let lbrynetFileExt = null;
  let channelShortId = chShortId;
  let channelName = chName;

  if (!chName && certificateId && !channelName) {
    channelName = await chainquery.claim.queries.getClaimChannelName(certificateId).catch(() => {
    });
  }

  if (!chShortId && certificateId && channelName) {
    channelShortId = await chainquery.claim.queries.getShortClaimIdFromLongClaimId(certificateId, channelName).catch(() => null);
  }

  if (!chName && !chShortId && !data.fileExt) {
    const lbrynetUri = `${data.name}#${data.claim_id}`;
    lbrynetClaimResult = await getClaim(lbrynetUri).catch(() => {
      return 'invalid URI';
    });
    lbrynetFileExt = lbrynetClaimResult && lbrynetClaimResult.file_name && lbrynetClaimResult.file_name.includes('.') && lbrynetClaimResult.file_name.split('.').slice(-1).pop();
  }

  return ({
    name       : data.name,
    title      : data.title,
    certificateId,
    channelName,
    channelShortId,
    contentType: data.content_type || data.contentType,
    claimId    : data.claim_id || data.claimId,
    fileExt    : data.generated_extension || data.fileExt || lbrynetFileExt,
    description: data.description,
    thumbnail  : data.generated_thumbnail || data.thumbnail_url || data.thumbnail,
    outpoint   : `${data.transaction_hash_id}:${data.vout}` || data.outpoint,
    host,
    pending    : Boolean(data.height === 0),
  });
};
