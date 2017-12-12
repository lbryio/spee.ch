const logger = require('winston');
const { returnShortId } = require('../helpers/sequelizeHelpers.js');
const DEFAULT_THUMBNAIL = 'https://spee.ch/assets/img/video_thumb_default.png';
const DEFAULT_TITLE = 'Spee<ch';
const DEFAULT_DESCRIPTION = 'Decentralized video and content hosting.';

function determineFileExtensionFromContentType (contentType) {
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
    default:
      logger.debug('setting unknown file type as file extension jpg');
      return 'jpg';
  }
};

function determineContentTypeFromFileExtension (fileExtension) {
  switch (fileExtension) {
    case 'jpeg':
    case 'jpg':
      return 'image/jpg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'mp4':
      return 'video/mp4';
    default:
      logger.debug('setting unknown file type as type image/jpg');
      return 'image/jpg';
  }
};

function ifEmptyReturnOther (value, replacement) {
  if (value === '') {
    return replacement;
  }
  return value;
}

function determineThumbnail (storedThumbnail, defaultThumbnail) {
  return ifEmptyReturnOther(storedThumbnail, defaultThumbnail);
};

function determineOgTitle (storedTitle, defaultTitle) {
  return ifEmptyReturnOther(storedTitle, defaultTitle);
};

function determineOgDescription (storedDescription, defaultDescription) {
  return ifEmptyReturnOther(storedDescription, defaultDescription);
};

function determineOgThumbnailContentType (thumbnail) {
  if (thumbnail) {
    if (thumbnail.lastIndexOf('.') !== -1) {
      return determineContentTypeFromFileExtension(thumbnail.substring(thumbnail.lastIndexOf('.')));
    }
  }
  return '';
}

function addOpengraphDataToClaim (claim) {
  claim['embedUrl'] = `https://spee.ch/embed/${claim.claimId}/${claim.name}`;
  claim['showUrl'] = `https://spee.ch/${claim.claimId}/${claim.name}`;
  claim['source'] = `https://spee.ch/${claim.claimId}/${claim.name}.${claim.fileExt}`;
  claim['directFileUrl'] = `https://spee.ch/${claim.claimId}/${claim.name}.${claim.fileExt}`;
  claim['ogTitle'] = determineOgTitle(claim.title, DEFAULT_TITLE);
  claim['ogDescription'] = determineOgDescription(claim.description, DEFAULT_DESCRIPTION);
  claim['ogThumbnailContentType'] = determineOgThumbnailContentType(claim.thumbnail);
  return claim;
};

function prepareClaimData (claim) {
  // logger.debug('preparing claim data based on resolved data:', claim);
  claim['thumbnail'] = determineThumbnail(claim.thumbnail, DEFAULT_THUMBNAIL);
  claim['fileExt'] = determineFileExtensionFromContentType(claim.contentType);
  claim = addOpengraphDataToClaim(claim);
  return claim;
};

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
      foreignKey: {
        allowNull: true,
      },
    });
  };

  Claim.getShortClaimIdFromLongClaimId = function (claimId, claimName) {
    logger.debug(`Claim.getShortClaimIdFromLongClaimId for ${claimName}#${claimId}`);
    return new Promise((resolve, reject) => {
      this
        .findAll({
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

  Claim.getAllChannelClaims = function (channelClaimId) {
    logger.debug(`Claim.getAllChannelClaims for ${channelClaimId}`);
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: { certificateId: channelClaimId },
          order: [['height', 'ASC']],
          raw  : true,  // returns an array of only data, not an array of instances
        })
        .then(channelClaimsArray => {
          // logger.debug('channelclaimsarray length:', channelClaimsArray.length);
          switch (channelClaimsArray.length) {
            case 0:
              return resolve(null);
            default:
              channelClaimsArray.forEach(claim => {
                claim['fileExt'] = determineFileExtensionFromContentType(claim.contentType);
                claim['thumbnail'] = determineThumbnail(claim.thumbnail, DEFAULT_THUMBNAIL);
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

  Claim.getClaimIdByLongChannelId = function (channelClaimId, claimName) {
    logger.debug(`finding claim id for claim ${claimName} from channel ${channelClaimId}`);
    return new Promise((resolve, reject) => {
      this
        .findAll({
          where: { name: claimName, certificateId: channelClaimId },
          order: [['id', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(null);
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
              $like: `${shortId}%`,
            }},
          order: [['height', 'ASC']],
        })
        .then(result => {
          switch (result.length) {
            case 0:
              return resolve(null);
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
          logger.debug('length of result', result.length);
          switch (result.length) {
            case 0:
              return resolve(null);
            default:
              return resolve(result[0].dataValues.claimId);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  Claim.validateLongClaimId = function (name, claimId) {
    return new Promise((resolve, reject) => {
      this.findOne({
        where: {name, claimId},
      })
      .then(result => {
        if (!result) {
          return resolve(null);
        };
        resolve(claimId);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  Claim.getLongClaimId = function (claimName, claimId) {
    logger.debug(`getLongClaimId(${claimName}, ${claimId})`);
    if (claimId && (claimId.length === 40)) {  // if a full claim id is provided
      return this.validateLongClaimId(claimName, claimId);
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
        .then(claimArray => {
          logger.debug('claims found on resolve:', claimArray.length);
          switch (claimArray.length) {
            case 0:
              return resolve(null);
            case 1:
              return resolve(prepareClaimData(claimArray[0].dataValues));
            default:
              logger.error(`more than one entry matches that name (${name}) and claimID (${claimId})`);
              return resolve(prepareClaimData(claimArray[0].dataValues));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return Claim;
};
