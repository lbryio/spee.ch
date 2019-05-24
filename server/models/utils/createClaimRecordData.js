const db = require('../index.js');

const createClaimRecordDataAfterPublish = (
  certificateId,
  channelName,
  fileName,
  fileType,
  publishParams,
  publishResults
) => {
  const {
    name,
    metadata: { title, description, thumbnail, nsfw },
    claim_address: address,
    bid: amount,
  } = publishParams;

  const { claim_id: claimId, txid, nout } = publishResults;

  return db.Claim.getCurrentHeight().then(height => {
    return {
      name,
      claimId,
      title,
      description,
      address,
      thumbnail,
      outpoint: `${txid}:${nout}`,
      height,
      contentType: fileType,
      nsfw,
      amount,
      certificateId,
      channelName,
    };
  });
};

module.exports = {
  createClaimRecordDataAfterPublish,
};
