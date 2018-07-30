const logger = require('winston');
const db = require('../../../models');

const getOEmbedData = (req, res) => {

  const CHANNEL_CHAR = '@';
  const { query: { url, format } } = req;
  logger.debug('req url', url);
  logger.debug('req format', format);

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

  // parse the request url's pieces
  // is there an identifier?

    // if there is an identifier, is it a channel or a claim_id?
      // if it is a channel, does it have a channel id?
    // if no identifier, is the claim a channel?

  // get the data

  const data = {
    version: 1.0 ,
    author_name: 'Spee.ch',
    author_url: 'https://spee.ch',
    provider_name: 'Spee.ch',
    provider_url: 'https://spee.ch',
    cache_age: 86400, // one day in seconds
  };

  // set type
  // if (fileType.substring(0, fileType.indexOf('/') === 'video')) {
  //   data['type'] = 'video';
  // } else {
  //   data['type'] = 'picture';
  // }

  data['title'] = '';
  data['thumbnail_url'] = '';
  data['thumbnail_width'] = '';
  data['thumbnail_height'] = '';

  res.status(200).json({
    success: true,
    message: 'hello',
    data,
  });
};

module.exports = getOEmbedData;
