/**
 * Calculations on file format derived from here: https://en.wikipedia.org/wiki/STL_%28file_format%29
 * Parts of module derived from: https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/STLLoader.js
 */
module.exports = {
  MAX_FACE_COUNT: 1000000,

  init (data) {
    this.numFaces = 0;
    this.reader = new DataView(data);
    this.valid = (this.isBinary() || this.isAscii());

    return this;
  },

  isBinary () {
    const minSize = 84; // Minimum STL size (empty) is 84 bytes;
    const faceSize = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8);
    const numFaces = this.reader.getUint32(80, true);
    const expectedByteLength = 80 + (32 / 8) + (numFaces * faceSize);

    if (this.reader.byteLength <= minSize) {
      return false;
    }

    this.numFaces = numFaces;
    return this.reader.byteLength === expectedByteLength;
  },

  isAscii () {
    const buffer = new Uint8Array(this.reader.buffer);
    const str = String.fromCharCode.apply(null, buffer);

    // In ascii the face count is just the number of "facets" in the file
    this.numFaces = str.match(/endfacet/g).length;

    // Ascii STL files *MUST* begin with 'solid'
    const regEx = /^solid/;
    return regEx.test(str);
  },
};
