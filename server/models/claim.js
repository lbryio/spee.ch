import logger from 'winston';
import returnShortId from './utils/returnShortId.js';
import isApprovedChannel from '@globalutils/isApprovedChannel';
import { assetDefaults, details, publishing } from '@config/siteConfig';
const { thumbnail: defaultThumbnail } = assetDefaults;
const { host } = details;
const { serveOnlyApproved, approvedChannels } = publishing;

const NO_CLAIM = 'NO_CLAIM';

function determineFileExtensionFromContentType(contentType) {
  switch (contentType) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'video/mp4':
      return 'mp4';
    case 'image/svg+xml':
      return 'svg';
    default:
      logger.debug('setting unknown file type as file extension jpg');
      return 'jpg';
  }
}

function determineThumbnail(storedThumbnail, defaultThumbnail) {
  if (storedThumbnail === '') {
    return defaultThumbnail;
  }
  return storedThumbnail;
}

function prepareClaimData(claim) {
  // logger.debug('preparing claim data based on resolved data:', claim);
  claim['thumbnail'] = determineThumbnail(claim.thumbnail, defaultThumbnail);
  claim['fileExt'] = determineFileExtensionFromContentType(claim.contentType);
  claim['host'] = host;
  return claim;
}

function isLongClaimId(claimId) {
  return claimId && claimId.length === 40;
}

function isShortClaimId(claimId) {
  return claimId && claimId.length < 40;
}

export default (sequelize, { STRING, BOOLEAN, INTEGER, TEXT, DECIMAL }) => {
  const Claim = sequelize.define(
    'Claim',
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
      claimType: {
        type: STRING,
        default: null,
      },
      certificateId: {
        type: STRING,
        default: null,
      },
      author: {
        type: STRING,
        default: null,
      },
      description: {
        type: TEXT('long'),
        default: null,
      },
      language: {
        type: STRING,
        default: null,
      },
      license: {
        type: STRING,
        default: null,
      },
      licenseUrl: {
        type: STRING,
        default: null,
      },
      nsfw: {
        type: BOOLEAN,
        default: null,
      },
      preview: {
        type: STRING,
        default: null,
      },
      thumbnail: {
        type: STRING,
        default: null,
      },
      title: {
        type: STRING,
        default: null,
      },
      metadataVersion: {
        type: STRING,
        default: null,
      },
      contentType: {
        type: STRING,
        default: null,
      },
      source: {
        type: STRING,
        default: null,
      },
      sourceType: {
        type: STRING,
        default: null,
      },
      sourceVersion: {
        type: STRING,
        default: null,
      },
      streamVersion: {
        type: STRING,
        default: null,
      },
      valueVersion: {
        type: STRING,
        default: null,
      },
      channelName: {
        type: STRING,
        allowNull: true,
        default: null,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Claim.associate = db => {
    Claim.belongsTo(db.File, {
      foreignKey: {
        allowNull: true,
      },
    });
  };

  Claim.getShortClaimIdFromLongClaimId = function(claimId, claimName) {
    logger.debug(`Claim.getShortClaimIdFromLongClaimId for ${claimName}#${claimId}`);
    return new Promise((resolve, reject) => {
      this.findAll({
        where: { name: claimName },
        order: [['height', 'ASC']],
      })
        .then(result => {
          switch (result.length) {
            case 0:
              throw new Error('No claim(s) found with that claim name');
            default:
              resolve(returnShortId(result, claimId));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.getAllChannelClaims = function(channelClaimId) {
    logger.debug(`Claim.getAllChannelClaims for ${channelClaimId}`);
    return new Promise((resolve, reject) => {
      this.findAll({
        where: { certificateId: channelClaimId },
        order: [['height', 'DESC']],
        raw: true, // returns an array of only data, not an array of instances
      })
        .then(channelClaimsArray => {
          switch (channelClaimsArray.length) {
            case 0:
              return resolve(null);
            default:
              channelClaimsArray.forEach(claim => {
                claim['fileExt'] = determineFileExtensionFromContentType(claim.contentType);
                claim['thumbnail'] = determineThumbnail(claim.thumbnail, defaultThumbnail);
                return claim;
              });
              return resolve(channelClaimsArray);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.getClaimIdByLongChannelId = function(channelClaimId, claimName) {
    logger.debug(`finding claim id for claim ${claimName} from channel ${channelClaimId}`);
    return new Promise((resolve, reject) => {
      this.findAll({
        where: { name: claimName, certificateId: channelClaimId },
        order: [['id', 'ASC']],
      })
        .then(result => {
          switch (result.length) {
            case 0:
              return reject(NO_CLAIM);
            case 1:
              return resolve(result[0].claimId);
            default:
              logger.warn(
                `${result.length} records found for "${claimName}" in channel "${channelClaimId}"`
              );
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.validateLongClaimId = function(name, claimId) {
    return new Promise((resolve, reject) => {
      this.findOne({
        where: {
          name,
          claimId,
        },
      })
        .then(result => {
          if (!result) {
            return reject(NO_CLAIM);
          }
          resolve(claimId);
        })
        .catch(error => {
          logger.error(error);
          reject(NO_CLAIM);
        });
    });
  };

  Claim.getLongClaimIdFromShortClaimId = function(name, shortId) {
    return new Promise((resolve, reject) => {
      this.findAll({
        where: {
          name,
          claimId: {
            [sequelize.Op.like]: `${shortId}%`,
          },
        },
        order: [['height', 'ASC']],
      })
        .then(result => {
          switch (result.length) {
            case 0:
              return reject(NO_CLAIM);
            default:
              return resolve(result[0].claimId);
          }
        })
        .catch(error => {
          logger.error(error);
          reject(NO_CLAIM);
        });
    });
  };

  Claim.getTopFreeClaimIdByClaimName = function(name) {
    return new Promise((resolve, reject) => {
      this.findAll({
        where: { name },
        order: [['effectiveAmount', 'DESC'], ['height', 'ASC']],
      })
        .then(result => {
          switch (result.length) {
            case 0:
              return reject(NO_CLAIM);
            default:
              return resolve(result[0].dataValues.claimId);
          }
        })
        .catch(error => {
          logger.error(error);
          reject(NO_CLAIM);
        });
    });
  };

  Claim.getLongClaimId = function(claimName, claimId) {
    logger.debug(`getLongClaimId(${claimName}, ${claimId})`);
    if (isLongClaimId(claimId)) {
      return this.validateLongClaimId(claimName, claimId);
    } else if (isShortClaimId(claimId)) {
      return this.getLongClaimIdFromShortClaimId(claimName, claimId);
    } else {
      return this.getTopFreeClaimIdByClaimName(claimName);
    }
  };

  Claim.fetchClaim = function(name, claimId) {
    logger.debug(`Claim.resolveClaim: ${name} ${claimId}`);
    return new Promise((resolve, reject) => {
      this.findAll({
        where: { name, claimId },
      })
        .then(claimArray => {
          switch (claimArray.length) {
            case 0:
              return resolve(null);
            case 1:
              return resolve(prepareClaimData(claimArray[0].dataValues));
            default:
              logger.warn(`more than one record matches ${name}#${claimId} in db.Claim`);
              return resolve(prepareClaimData(claimArray[0].dataValues));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.resolveClaim = function(name, claimId) {
    return new Promise((resolve, reject) => {
      this.fetchClaim(name, claimId)
        .then(claim => {
          logger.info('resolveClaim claims:', claim);
          if (
            serveOnlyApproved &&
            !isApprovedChannel({ longId: claim.certificateId }, approvedChannels)
          ) {
            throw new Error('This content is unavailable');
          }
          return resolve(claim);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.getOutpoint = function(name, claimId) {
    logger.debug(`finding outpoint for ${name}#${claimId}`);
    return this.findAll({
      where: { name, claimId },
      attributes: ['outpoint'],
    })
      .then(result => {
        logger.debug('outpoint result');
        switch (result.length) {
          case 0:
            throw new Error(`no record found for ${name}#${claimId}`);
          case 1:
            return result[0].dataValues.outpoint;
          default:
            logger.warn(`more than one record matches ${name}#${claimId} in db.Claim`);
            return result[0].dataValues.outpoint;
        }
      })
      .catch(error => {
        throw error;
      });
  };

  Claim.getCurrentHeight = function() {
    return new Promise((resolve, reject) => {
      return this.max('height')
        .then(result => {
          if (result) {
            return resolve(result);
          }
          return resolve(100000);
        })
        .catch(error => {
          return reject(error);
        });
    });
  };

  return Claim;
};
