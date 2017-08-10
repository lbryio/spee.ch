const logger = require('winston');
const db = require('../models');

module.exports = {
  getLocalClaimsList (name) {
    logger.debug(`db.Claim >> Getting claim_list for "${name}"`);
    return db.Claim.findAll({ name })
    .then(result => {
      logger.debug('db.claim result length', result.length);
      if (result.length >= 1) {
        console.log('there was a result');
        result = result.map(claim => {
          return claim.dataValues;
        });
        return result;
      } else {
        return null;
      }
    })
    .catch(error => {
      return error;
    });
  },
  resolveLocalUri (name, claimId) {
    logger.debug(`db.Claim >> Resolving "${name}#${claimId}"`);
    db.Claim.findAll({ name, claimId })
    .then(result => {
      if (result) {
        if (result.length > 1) {
          result = result.sort((a, b) => {
            return (a.dataValues.height < b.dataValues.height);
          });
        }
        return result[0].dataValues;
      } else {
        return null;
      }
    })
    .catch(error => {
      return error;
    });
  },
  createClaimEntryFromLbryResolve (claim) {
    logger.debug('db.Claim >> creating claim entry from lbry resolve');
    // parse the resolved data
    let claimData = {};
    claimData['address'] = claim.address;
    claimData['amount'] = claim.amount;
    claimData['claimId'] = claim.claim_id;
    claimData['claimSequence'] = claim.claim_sequence;
    claimData['decodedClaim'] = claim.decoded_claim;
    claimData['depth'] = claim.depth;
    claimData['effectiveAmount'] = claim.effective_amount;
    claimData['hasSignature'] = claim.has_signature;
    claimData['height'] = claim.height;
    claimData['hex'] = claim.hex;
    claimData['name'] = claim.name;
    claimData['nout'] = claim.nout;
    claimData['txid'] = claim.txid;
    claimData['validAtHeight'] = claim.valid_at_height;
    claimData['outpoint'] = `${claim.txid}:${claim.nout}`;
    if (claim.value) {
      claimData['claimType'] = claim.value.claimType;
      if (claim.value.stream) {
        if (claim.value.stream.metadata) {
          claimData['author'] = claim.value.stream.metadata.author;
          claimData['description'] = claim.value.stream.metadata.description;
          claimData['language'] = claim.value.stream.metadata.language;
          claimData['licenseUrl'] = claim.value.stream.metadata.licenseUrl;
          claimData['nsfw'] = claim.value.stream.metadata.nsfw;
          claimData['preview'] = claim.value.stream.metadata.preview;
          claimData['thumbnail'] = claim.value.stream.metadata.thumbnail;
          claimData['title'] = claim.value.stream.metadata.title;
          claimData['metadataVersion'] = claim.value.stream.metadata.version;
        }
        if (claim.value.stream.source) {
          claimData['contentType'] = claim.value.stream.source.contentType;
          claimData['source'] = claim.value.stream.source.source;
          claimData['sourceType'] = claim.value.stream.source.sourceType;
          claimData['sourceVersion'] = claim.value.stream.source.version;
        }
        claimData['streamVersion'] = claim.value.stream.version;
      }
      claimData['valueVersion'] = claim.value.version;
    }
    // create search criteria
    const searchCriteria = { name: claimData.name, claimId: claimData.claimId };
    // create entry in db
    db.upsert(db.Claim, claimData, searchCriteria)
    .then(() => {
      logger.debug('successfully added data to db.Claim');
    })
    .catch(error => {
      logger.error('Sequelize findOne error', error);
    });
  },
};
