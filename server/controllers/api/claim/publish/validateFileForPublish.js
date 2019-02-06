const logger = require('winston');

const { publishing } = require('@config/siteConfig.json');

const { fileSizeLimits } = publishing;

const SIZE_MB = 1000000;

const validateFileForPublish = file => {
  let contentType = file.type;
  let mediaType = contentType ? contentType.substr(0, contentType.indexOf('/')) : '';
  let mediaTypeLimit = fileSizeLimits[mediaType] || false;
  let customLimits = fileSizeLimits['customByContentType'];

  if (!file) {
    throw new Error('no file provided');
  }

  if (/'/.test(file.name)) {
    throw new Error('apostrophes are not allowed in the file name');
  }

  if (Object.keys(customLimits).includes(contentType)) {
    if (file.size > customLimits[contentType]) {
      throw new Error(
        `Sorry, type ${contentType} is limited to ${customLimits[contentType] / SIZE_MB} MB.`
      );
    }
  }
  if (mediaTypeLimit) {
    if (file.size > mediaTypeLimit) {
      throw new Error(`Sorry, type ${mediaType} is limited to ${mediaTypeLimit / SIZE_MB} MB.`);
    }
  }
  return file;
};

module.exports = validateFileForPublish;
