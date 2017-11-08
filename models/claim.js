const logger = require('winston');
const NO_CLAIM = 'NO_CLAIM';

function sortResult (result, longId) {
  let claimIndex;
  let shortId = longId.substring(0, 1); // default sort id is the first letter
  let shortIdLength = 0;
  // find the index of this certificate
  claimIndex = result.findIndex(element => {
    return element.claimId === longId;
  });
  if (claimIndex < 0) { throw new Error('claimid not found in possible sorted list') }
  // get an array of all certificates with lower height
  let possibleMatches = result.slice(0, claimIndex);
  // remove certificates with the same prefixes until none are left.
  while (possibleMatches.length > 0) {
    shortIdLength += 1;
    shortId = longId.substring(0, shortIdLength);
    possibleMatches = possibleMatches.filter(element => {
      return (element.claimId.substring(0, shortIdLength) === shortId);
    });
  }
  // return the short Id
  logger.debug('short claim id ===', shortId);
  return shortId;
}

module.exports = (sequelize, { STRING, BOOLEAN, INTEGER, TEXT, DECIMAL }) => {
  const Claim = sequelize.define(
    'Claim',
    {
      address: {
        type   : STRING,
        default: null,
      },
      amount: {
        type   : DECIMAL(19, 8),
        default: null,
      },
      claimId: {
        type   : STRING,
        default: null,
      },
      claimSequence: {
        type   : INTEGER,
        default: null,
      },
      decodedClaim: {
        type   : BOOLEAN,
        default: null,
      },
      depth: {
        type   : INTEGER,
        default: null,
      },
      effectiveAmount: {
        type   : DECIMAL(19, 8),
        default: null,
      },
      hasSignature: {
        type   : BOOLEAN,
        default: null,
      },
      height: {
        type   : INTEGER,
        default: null,
      },
      hex: {
        type   : TEXT('long'),
        default: null,
      },
      name: {
        type   : STRING,
        default: null,
      },
      nout: {
        type   : INTEGER,
        default: null,
      },
      txid: {
        type   : STRING,
        default: null,
      },
      validAtHeight: {
        type   : INTEGER,
        default: null,
      },
      outpoint: {
        type   : STRING,
        default: null,
      },
      claimType: {
        type   : STRING,
        default: null,
      },
      certificateId: {
        type   : STRING,
        default: null,
      },
      author: {
        type   : STRING,
        default: null,
      },
      description: {
        type   : TEXT('long'),
        default: null,
      },
      language: {
        type   : STRING,
        default: null,
      },
      license: {
        type   : STRING,
        default: null,
      },
      licenseUrl: {
        type   : STRING,
        default: null,
      },
      nsfw: {
        type   : BOOLEAN,
        default: null,
      },
      preview: {
        type   : STRING,
        default: null,
      },
      thumbnail: {
        type   : STRING,
        default: null,
      },
      title: {
        type   : STRING,
        default: null,
      },
      metadataVersion: {
        type   : STRING,
        default: null,
      },
      contentType: {
        type   : STRING,
        default: null,
      },
      source: {
        type   : STRING,
        default: null,
      },
      sourceType: {
        type   : STRING,
        default: null,
      },
      sourceVersion: {
        type   : STRING,
        default: null,
      },
      streamVersion: {
        type   : STRING,
        default: null,
      },
      valueVersion: {
        type   : STRING,
        default: null,
      },
      channelName: {
        type     : STRING,
        allowNull: true,
        default  : null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Claim.associate = db => {
    Claim.belongsTo(db.File, {
      onDelete  : 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
  };

  Claim.getShortClaimIdFromLongClaimId = function (claimId, claimName) {
    logger.debug(`Claim.getShortClaimIdFromLongClaimId for ${claimId}#${claimId}`);
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: { name: claimName },
          order: [['height', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              throw new Error('That is an invalid claim name');
            default:
              resolve(sortResult(result, claimId));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.getAllChannelClaims = function (channelId) {
    logger.debug(`Claim.getAllChannelClaims for ${channelId}`);
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: { certificateId: channelId },
          order: [['height', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(null);
            default:
              return resolve(result);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.getClaimIdByLongChannelId = function (channelId, claimName) {
    logger.debug(`finding claim id for claim ${claimName} from channel ${channelId}`);
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: { name: claimName, certificateId: channelId },
          order: [['id', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(NO_CLAIM);
            case 1:
              return resolve(result[0].claimId);
            default:
              logger.error(`${result.length} records found for ${claimName} from channel ${claimName}`);
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.getLongClaimIdFromShortClaimId = function (name, shortId) {
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: {
            name,
            claimId: {
              [sequelize.Op.like]: `${shortId}%`,
            }},
          order: [['height', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(NO_CLAIM);
            default: // note results must be sorted
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.getTopFreeClaimIdByClaimName = function (name) {
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: { name },
          order: [['effectiveAmount', 'DESC'], ['height', 'ASC']],  // note: maybe height and effective amount need to switch?
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(NO_CLAIM);
            default:
              logger.debug('getTopFreeClaimIdByClaimName result:', result.dataValues);
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.getLongClaimId = function (claimName, claimId) {
    logger.debug(`getLongClaimId(${claimName}, ${claimId})`);
    if (claimId && (claimId.length === 40)) {  // if a full claim id is provided
      return new Promise((resolve, reject) => resolve(claimId));
    } else if (claimId && claimId.length < 40) {
      return this.getLongClaimIdFromShortClaimId(claimName, claimId);  // if a short claim id is provided
    } else {
      return this.getTopFreeClaimIdByClaimName(claimName);  // if no claim id is provided
    }
  };

  Claim.resolveClaim = function (name, claimId) {
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: { name, claimId },
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(null);
            case 1:
              return resolve(result[0]);
            default:
              logger.warn(`more than one entry matches that name (${name}) and claimID (${claimId})`);
              return resolve(result[0]);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return Claim;
};
