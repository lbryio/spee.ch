const logger = require('winston');
const db = require('../../../models');

const lbryUri = require('../../utils/lbryUri');
const getClaimId = require('../../utils/getClaimId');

const parseSpeechUrl = (url) => {
  // parse the request url
  const componentsRegex = new RegExp(
    '([^:/?#]+:\/\/)'+
    '([^/?#]*)' +
    '(\/)' +
    '([^/?#]*)' +
    '(\/)' +
    '([^/?#]*)'
  );
  const [proto, protocol, domain, slashOne, paramOne, slashTwo, paramTwo] = componentsRegex
    .exec(url)
    .map(match => match || null);

  logger.debug(`${protocol}, ${domain}, ${slashOne}, ${paramOne}, ${slashTwo}, ${paramTwo}`);

  return {
    paramOne,
    paramTwo,
  }
};

const getOEmbedData = (req, res) => {

  const { query: { url, format } } = req;
  logger.debug('req url', url);
  logger.debug('req format', format);

  let data = {
    version: 1.0 ,
    author_name: 'Spee.ch',
    author_url: 'https://spee.ch',
    provider_name: 'Spee.ch',
    provider_url: 'https://spee.ch',
    cache_age: 86400, // one day in seconds
  };

  const { paramOne, paramTwo } = parseSpeechUrl(url);
  let fileData, claimData;
  let claimName, isChannel, channelName, channelClaimId, claimId;

  if (paramTwo) {
    ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(paramOne));
    ({ claimName } = lbryUri.parseClaim(paramTwo));
  } else {
    ({ isChannel } = lbryUri.parseIdentifier(paramOne));
    if (!isChannel ) {
      ({ claimName } = lbryUri.parseClaim(paramOne));
    }
  }

  logger.debug('ischannel:', isChannel);

  if (isChannel && !paramTwo) {
    data['title'] = paramOne;
    data['thumbnail_url'] = 'test';
    data['thumbnail_width'] = 'test';
    data['thumbnail_height'] = 'test';

    return res.status(200).json({
      success: true,
      message: 'hello',
      data,
    });

  } else {
    // return claim info
    getClaimId(channelName, channelClaimId, claimName, claimId)
      .then(fullClaimId => {
        claimId = fullClaimId;
        return db.Claim.findOne({
          where: {
            name   : claimName,
            claimId: fullClaimId
          }
        });
      })
      .then(claimRecord => {
        claimData = claimRecord.dataValues;
        return db.Blocked.isNotBlocked(claimData.outpoint);
      })
      .then(() => {
        return db.File.findOne({
          where: {
            name: claimName,
            claimId,
          },
        });
      })
      .then(fileRecord => {
        fileData = fileRecord.dataValues;
        logger.debug('file data:', fileData);
        // get channel data
        data['title'] = claimData.title;
        data['thumbnail_url'] = `https://dev1.spee.ch/${claimId}/${claimName}.ext`;
        data['thumbnail_width'] = fileData.width || 600;
        data['thumbnail_height'] = fileData.height || 400;
        // send response
        return res.status(200).json({
          success: true,
          message: 'hello',
          data,
        });
      })
  }
};

module.exports = getOEmbedData;
