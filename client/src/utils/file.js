import STL from './stl.js';

module.exports = {
  validateFile (file) {
    if (!file) {
      throw new Error('no file provided');
    }
    if (/'/.test(file.name)) {
      throw new Error('apostrophes are not allowed in the file name');
    }

    // validate size and type
    switch (file.type) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        if (file.size > 10000000) {
          throw new Error('Sorry, images are limited to 10 megabytes.');
        }
        break;
      case 'image/gif':
        if (file.size > 50000000) {
          throw new Error('Sorry, GIFs are limited to 50 megabytes.');
        }
        break;
      case 'video/mp4':
        if (file.size > 50000000) {
          throw new Error('Sorry, videos are limited to 50 megabytes.');
        }
        break;
      default:
        // Handle STL check (file.type is empty for STLs and file.type cannot be reassigned)
        file.isStl = false;
        return new Promise((resolve, reject) => {
          const loader = new FileReader();
          loader.onloadend = (e) => {
            const stl = STL.init(e.target.result);
            if (stl.valid) {
              file.isStl = true; // this allows us to keep track of the type since file.type == ''
              resolve();
            }
            reject();
          };
          loader.readAsArrayBuffer(file);
        })
          .catch(() => {
            throw new Error(file.type + ' is not a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
          });
    }
  },
};
