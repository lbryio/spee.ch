const logger = require('winston');

const returnShortId = (claimsArray, longId) => {
  let claimIndex;
  let shortId = longId.substring(0, 1); // default short id is the first letter
  let shortIdLength = 0;
  // find the index of this claim id
  claimIndex = claimsArray.findIndex(element => {
    return element.claim_id === longId;
  });
  if (claimIndex < 0) {
    throw new Error('claim id not found in claims list');
  }
  // get an array of all claims with lower height
  let possibleMatches = claimsArray.slice(0, claimIndex);
  // remove certificates with the same prefixes until none are left.
  while (possibleMatches.length > 0) {
    shortIdLength += 1;
    shortId = longId.substring(0, shortIdLength);
    possibleMatches = possibleMatches.filter(element => {
      return element.claim_id && element.claim_id.substring(0, shortIdLength) === shortId;
    });
  }
  return shortId;
};

const isLongClaimId = claimId => {
  return claimId && claimId.length === 40;
};

const isShortClaimId = claimId => {
  return claimId && claimId.length < 40;
};

export default (db, table, sequelize) => ({
  getClaimChannelName: async publisher_id => {
    return await table
      .findAll({
        where: { claim_id: publisher_id },
        attributes: ['name'],
      })
      .then(result => {
        if (result.length === 0) {
          throw new Error(`no record found for ${claimId}`);
        } else if (result.length !== 1) {
          logger.warn(`more than one record matches ${claimId} in db.Claim`);
        }

        return result[0].name;
      });
  },

  getShortClaimIdFromLongClaimId: async (claimId, claimName, pendingClaim) => {
    logger.debug(`claim.getShortClaimIdFromLongClaimId for ${claimName}#${claimId}`);
    return await table
      .findAll({
        where: { name: claimName },
        order: [['height', 'ASC']],
      })
      .then(result => {
        if (result.length === 0) {
          throw new Error('No claim(s) found with that claim name');
        }

        let list = result.map(claim => claim.dataValues);
        if (pendingClaim) {
          list = list.concat(pendingClaim);
        }

        return returnShortId(list, claimId);
      });
  },

  getAllChannelClaims: async (channelClaimId, bidState) => {
    logger.debug(`claim.getAllChannelClaims for ${channelClaimId}`);
    const whereClause = bidState || {
      [sequelize.Op.or]: [
        { bid_state: 'Controlling' },
        { bid_state: 'Active' },
        { bid_state: 'Accepted' },
      ],
    };
    const selectWhere = {
      ...whereClause,
      publisher_id: channelClaimId,
    };
    return await table
      .findAll({
        where: selectWhere,
        order: [['height', 'DESC'], ['claim_id', 'ASC']],
      })
      .then(channelClaimsArray => {
        if (channelClaimsArray.length === 0) {
          return null;
        }
        return channelClaimsArray;
      });
  },

  getClaimIdByLongChannelId: async (channelClaimId, claimName) => {
    logger.debug(`finding claim id for claim ${claimName} from channel ${channelClaimId}`);
    return await table
      .findAll({
        where: {
          name: claimName,
          publisher_id: channelClaimId,
          bid_state: { [sequelize.Op.or]: ['Controlling', 'Active', 'Accepted'] },
        },
        order: [['id', 'ASC']],
      })
      .then(result => {
        switch (result.length) {
          case 0:
            return null;
          case 1:
            return result[0].claim_id;
          default:
            // Does this actually happen??? (from converted code)
            logger.warn(
              `${result.length} records found for "${claimName}" in channel "${channelClaimId}"`
            );
            return result[0].claim_id;
        }
      });
  },

  validateLongClaimId: async (name, claimId) => {
    return await table
      .findOne({
        where: {
          name,
          claim_id: claimId,
        },
      })
      .then(result => {
        if (!result) {
          return false;
        }
        return claimId;
      });
  },

  getLongClaimIdFromShortClaimId: async (name, shortId) => {
    return await table
      .findAll({
        where: {
          name,
          claim_id: {
            [sequelize.Op.like]: `${shortId}%`,
          },
        },
        order: [['height', 'ASC']],
      })
      .then(result => {
        if (result.length === 0) {
          return null;
        }

        return result[0].claim_id;
      });
  },

  getTopFreeClaimIdByClaimName: async name => {
    return await table
      .findAll({
        // TODO: Limit 1
        where: { name, bid_state: { [sequelize.Op.or]: ['Controlling', 'Active', 'Accepted'] } },
        order: [['effective_amount', 'DESC'], ['height', 'ASC']],
      })
      .then(result => {
        if (result.length === 0) {
          return null;
        }
        return result[0].claim_id;
      });
  },

  getLongClaimId: async (claimName, claimId) => {
    // TODO: Add failure case
    logger.debug(`getLongClaimId(${claimName}, ${claimId})`);
    if (isLongClaimId(claimId)) {
      return table.queries.validateLongClaimId(claimName, claimId);
    } else if (isShortClaimId(claimId)) {
      return table.queries.getLongClaimIdFromShortClaimId(claimName, claimId);
    } else {
      return table.queries.getTopFreeClaimIdByClaimName(claimName);
    }
  },

  resolveClaim: async (name, claimId) => {
    logger.debug(`Claim.resolveClaim: ${name} ${claimId}`);
    return table
      .findAll({
        where: { name, claim_id: claimId },
      })
      .then(claimArray => {
        if (claimArray.length === 0) {
          return null;
        } else if (claimArray.length !== 1) {
          logger.warn(`more than one record matches ${name}#${claimId} in db.Claim`);
        }

        return claimArray[0];
      })
      .catch(error => {
        logger.verbose(`resolveClaim failed: ${error}`)
        reject(error);
      });
  },

  resolveClaimInChannel: async (claimName, channelId) => {
    logger.debug(`Claim.resolveClaimByNames: ${claimName} in ${channelId}`);
    return table
      .findAll({
        where: {
          name: claimName,
          publisher_id: channelId,
        },
      })
      .then(claimArray => {
        if (claimArray.length === 0) {
          return null;
        } else if (claimArray.length !== 1) {
          logger.warn(`more than one record matches ${claimName} in ${channelId}`);
        }

        return claimArray[0];
      });
  },

  getOutpoint: async (name, claimId) => {
    logger.debug(`finding outpoint for ${name}#${claimId}`);

    return await table
      .findAll({
        where: { name, claim_id: claimId },
        attributes: ['transaction_hash_id'],
      })
      .then(result => {
        if (result.length === 0) {
          throw new Error(`no record found for ${name}#${claimId}`);
        } else if (result.length !== 1) {
          logger.warn(`more than one record matches ${name}#${claimId} in db.Claim`);
        }

        return result[0].transaction_hash_id;
      });
  },

  getCurrentHeight: async () => {
    return await table.max('height').then(result => {
      return result || 100000;
    });
  },
});
