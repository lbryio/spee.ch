const { details: { host } } = require('@config/siteConfig');
const chainquery = require('chainquery');

module.exports = async (data) => {
  // TODO: Refactor getching the channel name out; requires invasive changes.
  const certificateId = data.publisher_id || data.certificateId;
  let channelName = data.channelName;

  if(certificateId && !channelName) {
    channelName = await chainquery.claim.queries.getClaimChannelName(certificateId).catch(()=>{});
  }

  let channelShortId = null;
  if (certificateId && channelName) {
    channelShortId = await chainquery.claim.queries.getShortClaimIdFromLongClaimId(certificateId, channelName).catch(() => null);
  }

  return ({
    name: data.name,
    title: data.title,
    certificateId,
    channelName,
    channelShortId,
    contentType: data.content_type || data.contentType,
    claimId: data.claim_id || data.claimId,
    fileExt: data.generated_extension || data.fileExt,
    description: data.description,
    thumbnail: data.generated_thumbnail || data.thumbnail,
    outpoint: data.transaction_hash_id || data.outpoint,
    host,
  })
}
