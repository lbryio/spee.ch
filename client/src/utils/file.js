const STL = require('./stl.js');

const FileUtil = {
  async validateFile (file) {
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
        await FileUtil.readUploadedFile(file);
        break;
    }
  },

  /**
   * Reads an uploaded file. Resolves successfully if the file is a valid STL file - rejects otherwise.
   *
   * @param {} file
   */
  readUploadedFile (file) {
    const fileErrorMsg = file.type + ' is not a supported file type. Only .jpeg, .png, .gif, .mp4, and .stl files are currently supported';
    const tmpFileReader = new FileReader();
    return new Promise((resolve, reject) => {
      tmpFileReader.onerror = () => {
        tmpFileReader.abort();
        reject(new DOMException(fileErrorMsg));
      };

      tmpFileReader.onloadend = (e) => {
        const stl = STL.init(e.target.result);
        if (stl.valid) {
          if (file.size > 10000000) {
            reject(new DOMException('Sorry, STL files are limited to 10 megabytes.'));
          } else if (stl.numFaces > stl.MAX_FACE_COUNT) {
            reject(new DOMException('Sorry, STL files are limited to a polygon count of 1,000,000.'));
          } else if (stl.numFaces === 0) {
            reject(new DOMException('Sorry, the STL file uploaded has a polygon count of 0.'));
          }

          resolve();
        } else {
          reject(new DOMException(fileErrorMsg));
        }
      };

      tmpFileReader.readAsArrayBuffer(file);
    });
  },
};

module.exports = FileUtil;
