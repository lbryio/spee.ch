const logger = require('winston');
const lbryUri = require('../../utils/lbryUri');

const getOEmbedDataForChannel = require('./getOEmbedDataForChannel');
const getOEmbedDataForAsset = require('./getOEmbedDataForAsset');
const parseSpeechUrl = require('./parseSpeechUrl');

const getOEmbedData = (req, res) => {
  const { query: { url, format } } = req;
  logger.debug('req url', url);
  logger.debug('req format', format);

  const { paramOne, paramTwo } = parseSpeechUrl(url);

  let claimName, isChannel, channelName, channelClaimId, claimId;

  if (paramTwo) {
    ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(paramOne));
    ({ claimName } = lbryUri.parseClaim(paramTwo));
  } else {
    ({ isChannel, channelName, channelClaimId } = lbryUri.parseIdentifier(paramOne));
    if (!isChannel) {
      ({ claimName } = lbryUri.parseClaim(paramOne));
    }
  }

  if (isChannel && !paramTwo) {
    getOEmbedDataForChannel(channelName, channelClaimId)
      .then(data => {
        if (format === 'xml') {
          return res.status(503).json({
            success: false,
            message: 'xml format is not implemented yet',
          });
        } else {
          return res.status(200).json(data);
        }
      })
      .catch((error) => {
        return res.status(404).json({
          success: false,
          message: error,
        });
      });
  } else {
    getOEmbedDataForAsset(channelName, channelClaimId, claimName, claimId)
      .then(data => {
        if (format === 'xml') {
          return res.status(503).json({
            success: false,
            message: 'xml format is not implemented yet',
          });
        } else {
          return res.status(200).json(data);
        }
      })
      .catch((error) => {
        return res.status(404).json({
          success: false,
          message: error,
        });
      });
  }
};

module.exports = getOEmbedData;
