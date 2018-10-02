const logger = require('winston');

const parseSpeechUrl = (url) => {
  const componentsRegex = new RegExp(
    '([^:/?#]+://)' +
    '([^/?#]*)' +
    '(/)' +
    '([^/?#]*)' +
    '(/)' +
    '([^/?#]*)'
  );
  const [, , , , paramOne, , paramTwo] = componentsRegex
    .exec(url)
    .map(match => match || null);

  logger.debug(`params from speech url: ${paramOne} ${paramTwo}`);

  return {
    paramOne,
    paramTwo,
  };
};

module.exports = parseSpeechUrl;
