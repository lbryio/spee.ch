import STL from './stl.js';

module.exports = {
  validateFile (file) {
    if (!file) {
      throw new Error('no file provided');
    }
    if (/'/.test(file.name)) {
      throw new Error('apostrophes are not allowed in the file name');
    }

    // Check if the file is valid prior to upload. Perform all checks inside of the loader
    // onloadend function for readability/sanity.
    const loader = new FileReader();
    loader.onloadend = (e) => {
      // For image files we can rely upon the file blob info derived from FileInfo
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
      }

      // If we're here then the uploaded file isn't an image. Check if it's a valid STL file and proceed accordingly.
      const stl = new STL(e.target.result);
      if (!stl.valid) {
        throw new Error(file.type + ' is not a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
      }
    };
    loader.readAsArrayBuffer(file);
  },
};
