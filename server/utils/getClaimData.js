const { details: { host } } = require('@config/siteConfig');

module.exports =  (data) => ({
  name: data.name,
  title: data.title,
  contentType: data.content_type || data.contentType,
  claimId: data.claim_id || data.claimId,
  fileExt: data.generated_extension || data.fileExt,
  description: data.description,
  thumbnail: data.generated_thumbnail || data.thumbnail,
  outpoint: data.transaction_hash_id || data.outpoint,
  host,
})
