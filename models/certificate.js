const logger = require('winston');
const { returnShortId } = require('../helpers/sequelizeHelpers.js');
const NO_CHANNEL = 'NO_CHANNEL';

module.exports = (sequelize, { STRING, BOOLEAN, INTEGER, TEXT, DECIMAL }) => {
  const Certificate = sequelize.define(
    'Certificate',
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
              throw new Error('No channel(s) found with that channel name');
            default:
              return resolve(returnShortId(result, longChannelId));
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
              $like: `${channelId}%`,
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

  Certificate.validateLongChannelId = function (name, claimId) {
    return new Promise((resolve, reject) => {
      this.findOne({
        where: {name, claimId},
      })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(NO_CHANNEL);
          case 1:
            return resolve(result[0]);
          default:
            logger.warn(`more than one entry matches that name (${name}) and certificate Id (${claimId})`);
            return resolve(result[0]);
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
      return this.validateLongChannelId(channelName, channelId);
    } else if (channelId && channelId.length < 40) {  // if a short channel id is provided
      return this.getLongChannelIdFromShortChannelId(channelName, channelId);
    } else {
      return this.getLongChannelIdFromChannelName(channelName);  // if no channel id provided
    }
  };

  return Certificate;
};
