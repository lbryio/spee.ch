import logger from 'winston';
import returnShortId from './utils/returnShortId';

const NO_CHANNEL = 'NO_CHANNEL';

function isLongChannelId(channelId) {
  return channelId && channelId.length === 40;
}

function isShortChannelId(channelId) {
  return channelId && channelId.length < 40;
}

export default (sequelize, { STRING, BOOLEAN, INTEGER, TEXT, DECIMAL }) => {
  const Certificate = sequelize.define(
    'Certificate',
    {
      address: {
        type: STRING,
        default: null,
      },
      amount: {
        type: DECIMAL(19, 8),
        default: null,
      },
      claimId: {
        type: STRING,
        default: null,
      },
      claimSequence: {
        type: INTEGER,
        default: null,
      },
      decodedClaim: {
        type: BOOLEAN,
        default: null,
      },
      depth: {
        type: INTEGER,
        default: null,
      },
      effectiveAmount: {
        type: DECIMAL(19, 8),
        default: null,
      },
      hasSignature: {
        type: BOOLEAN,
        default: null,
      },
      height: {
        type: INTEGER,
        default: null,
      },
      hex: {
        type: TEXT('long'),
        default: null,
      },
      name: {
        type: STRING,
        default: null,
      },
      nout: {
        type: INTEGER,
        default: null,
      },
      txid: {
        type: STRING,
        default: null,
      },
      validAtHeight: {
        type: INTEGER,
        default: null,
      },
      outpoint: {
        type: STRING,
        default: null,
      },
      valueVersion: {
        type: STRING,
        default: null,
      },
      claimType: {
        type: STRING,
        default: null,
      },
      certificateVersion: {
        type: STRING,
        default: null,
      },
      keyType: {
        type: STRING,
        default: null,
      },
      publicKey: {
        type: TEXT('long'),
        default: null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Certificate.associate = db => {
    Certificate.belongsTo(db.Channel, {
      foreignKey: {
        allowNull: true,
      },
    });
  };

  Certificate.getShortChannelIdFromLongChannelId = function(longChannelId, channelName) {
    logger.debug(`getShortChannelIdFromLongChannelId ${channelName}:${longChannelId}`);
    return new Promise((resolve, reject) => {
      this.findAll({
        where: { name: channelName },
        order: [['height', 'ASC']],
      })
        .then(result => {
          switch (result.length) {
            case 0:
              return reject(NO_CHANNEL);
            default:
              return resolve(returnShortId(result, longChannelId));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Certificate.validateLongChannelId = function(name, claimId) {
    logger.debug(`validateLongChannelId(${name}, ${claimId})`);
    return new Promise((resolve, reject) => {
      this.findOne({
        where: { name, claimId },
      })
        .then(result => {
          if (!result) {
            return reject(NO_CHANNEL);
          }
          resolve(claimId);
        })
        .catch(error => {
          logger.error(error);
          reject(NO_CHANNEL);
        });
    });
  };

  Certificate.getLongChannelIdFromShortChannelId = function(channelName, channelClaimId) {
    logger.debug(`getLongChannelIdFromShortChannelId(${channelName}, ${channelClaimId})`);
    return new Promise((resolve, reject) => {
      this.findAll({
        where: {
          name: channelName,
          claimId: {
            [sequelize.Op.like]: `${channelClaimId}%`,
          },
        },
        order: [['height', 'ASC']],
      })
        .then(result => {
          switch (result.length) {
            case 0:
              return reject(NO_CHANNEL);
            default:
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          logger.error(error);
          reject(NO_CHANNEL);
        });
    });
  };

  Certificate.getLongChannelIdFromChannelName = function(channelName) {
    logger.debug(`getLongChannelIdFromChannelName(${channelName})`);
    return new Promise((resolve, reject) => {
      this.findAll({
        where: { name: channelName },
        order: [['effectiveAmount', 'DESC'], ['height', 'ASC']],
      })
        .then(result => {
          switch (result.length) {
            case 0:
              return reject(NO_CHANNEL);
            default:
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          logger.error(error);
          reject(NO_CHANNEL);
        });
    });
  };

  Certificate.getLongChannelId = function(channelName, channelClaimId) {
    logger.debug(`getLongChannelId(${channelName}, ${channelClaimId})`);
    if (isLongChannelId(channelClaimId)) {
      return this.validateLongChannelId(channelName, channelClaimId);
    } else if (isShortChannelId(channelClaimId)) {
      return this.getLongChannelIdFromShortChannelId(channelName, channelClaimId);
    } else {
      return this.getLongChannelIdFromChannelName(channelName);
    }
  };

  return Certificate;
};
