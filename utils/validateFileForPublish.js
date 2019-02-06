import { publishing } from '@config/siteConfig.json';

const {
  fileSizeLimits: {
    image: maxSizeImage = 10000000,
    video: maxSizeVideo = 50000000,
    audio: maxSizeAudio = 50000000,
    text: maxSizeText = 50000000,
    model: maxSizeModel = 50000000,
    application: maxSizeApplication = 50000000,
    customByContentType,
  },
} = publishing;

const SIZE_MB = 1000000;

export const validateFileForPublish = file => {
  let contentType = file.type;
  let mediaType = contentType ? contentType.substr(0, contentType.indexOf('/')) : '';

  if (!file) {
    throw new Error('no file provided');
  }

  if (/'/.test(file.name)) {
    throw new Error('apostrophes are not allowed in the file name');
  }

  if (Object.keys(customByContentType).includes(contentType)) {
    if (file.size > customByContentType[contentType]) {
      throw new Error(
        `Sorry, type ${contentType} is limited to ${customByContentType[contentType] / SIZE_MB} MB.`
      );
    }
  } else {
    switch (mediaType) {
      case 'image':
        if (file.size > maxSizeImage) {
          throw new Error(`Sorry, type ${mediaType} is limited to ${maxSizeImage / SIZE_MB} MB.`);
        }
        break;
      case 'audio':
        if (file.size > maxSizeAudio) {
          throw new Error(`Sorry, type ${mediaType} is limited to ${maxSizeAudio / SIZE_MB} MB.`);
        }
        break;
      case 'video':
        if (file.size > maxSizeVideo) {
          throw new Error(`Sorry, type ${mediaType} is limited to ${maxSizeVideo / SIZE_MB} MB.`);
        }
        break;
      case 'text':
        if (file.size > maxSizeText) {
          throw new Error(`Sorry, type ${mediaType} is limited to ${maxSizeText / SIZE_MB} MB.`);
        }
        break;
      case 'model':
        if (file.size > maxSizeModel) {
          throw new Error(`Sorry, type ${mediaType} is limited to ${maxSizeModel / SIZE_MB} MB.`);
        }
        break;
      case 'application':
        if (file.size > maxSizeApplication) {
          throw new Error(
            `Sorry, type ${mediaType} is limited to ${maxSizeApplication / SIZE_MB} MB.`
          );
        }
        break;
      default:
        throw new Error(`Missing or unrecognized file type`);
    }
    return false;
  }
  return file;
};
