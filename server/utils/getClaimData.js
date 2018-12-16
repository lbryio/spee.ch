const { details: { host } } = require('@config/siteConfig');
const chainquery = require('chainquery').default;
const { getClaim } = require('server/lbrynet');

module.exports = async (data) => {
  // TODO: Refactor getching the channel name out; requires invasive changes.
  const certificateId = data.publisher_id || data.certificateId;
  const lbrynetUri = `${data.name}#${data.claim_id}`;

  let channelName = data.channelName;

  if (certificateId && !channelName) {
    channelName = await chainquery.claim.queries.getClaimChannelName(certificateId).catch(() => {});
  }

  let channelShortId = null;
  if (certificateId && channelName) {
    channelShortId = await chainquery.claim.queries.getShortClaimIdFromLongClaimId(certificateId, channelName).catch(() => null);
  }

  let lbrynetClaimResult = null;
  let lbrynetFileExt = null;
  if (!data.fileExt) {
    lbrynetClaimResult = await getClaim(lbrynetUri).catch(() => { return 'invalid URI' });
    lbrynetFileExt = lbrynetClaimResult && lbrynetClaimResult.file_name.split('.').slice(-1).pop();
  }

  // TODO verify that "generated_x" does anything at all
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
    outpoint   : data.transaction_hash_id || data.outpoint,
    host,
    pending    : Boolean(data.height === 0),
  });
};
