const logger = require('winston');
const NO_CHANNEL = 'NO_CHANNEL';

function sortResult (result, longId) {
  let claimIndex;
  let shortId = longId.substring(0, 1); // default sort id is the first letter
  let shortIdLength = 0;
  // find the index of this certificate
  claimIndex = result.findIndex(element => {
    return element.claimId === longId;
  });
  if (claimIndex < 0) { throw new Error('channelId not found in possible sorted list') }
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
  logger.debug('short channel id ===', shortId);
  return shortId;
}

module.exports = (sequelize, { STRING, BOOLEAN, INTEGER, TEXT, ARRAY, DECIMAL, DOUBLE, Op }) => {
  const Certificate = sequelize.define(
    'Certificate',
    {
      address: {
        type   : STRING,
        default: null,
      },
      amount: {
        type   : DOUBLE,
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
        type   : DOUBLE,
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
      valueVersion: {
        type   : STRING,
        default: null,
      },
      claimType: {
        type   : STRING,
        default: null,
      },
      certificateVersion: {
        type   : STRING,
        default: null,
      },
      keyType: {
        type   : STRING,
        default: null,
      },
      publicKey: {
        type   : TEXT('long'),
        default: null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Certificate.associate = db => {
    Certificate.belongsTo(db.Channel, {
      onDelete  : 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
  };

  Certificate.getShortChannelIdFromLongChannelId = function (longChannelId, channelName) {
    logger.debug(`finding short channel id for ${channelName}:${longChannelId}`);
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: {name: channelName},
          order: [['height', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              throw new Error('That is an invalid channel name');
            default:
              return resolve(sortResult(result, longChannelId));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Certificate.getLongChannelIdFromShortChannelId = function (channelName, channelId) {
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: {
            name   : channelName,
            claimId: {
              [sequelize.Op.like]: `${channelId}%`,
            },
          },
          order: [['height', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(NO_CHANNEL);
            default: // note results must be sorted
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Certificate.getLongChannelIdFromChannelName = function (channelName) {
    logger.debug(`getLongChannelIdFromChannelName(${channelName})`);
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: { name: channelName },
          order: [['effectiveAmount', 'DESC'], ['height', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(NO_CHANNEL);
            default:
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Certificate.getLongChannelId = function (channelName, channelId) {
    logger.debug(`getLongChannelId(${channelName}, ${channelId})`);
    if (channelId && (channelId.length === 40)) {  // if a full channel id is provided
      return new Promise((resolve, reject) => resolve(channelId));
    } else if (channelId && channelId.length < 40) {  // if a short channel id is provided
      return this.getLongChannelIdFromShortChannelId(channelName, channelId);
    } else {
      return this.getLongChannelIdFromChannelName(channelName);  // if no channel id provided
    }
  };

  return Certificate;
};
