const chai = require('chai');
const expect = chai.expect;

describe('publish utils', function () {

  describe('#parsePublishApiRequestBody()', function () {
    const parsePublishApiRequestBody = require('../../../server/controllers/api/claim/publish/parsePublishApiRequestBody.js');

    it('should throw an error if no body', function () {
      expect(parsePublishApiRequestBody.bind(this, null)).to.throw();
    });

    it('should throw an error if no body.name', function () {
      const bodyNoName = {};
      expect(parsePublishApiRequestBody.bind(this, bodyNoName)).to.throw();
    });

  });

  describe('#parsePublishApiRequestFiles()', function () {
    const parsePublishApiRequestFiles = require('../../../server/controllers/api/claim/publish/parsePublishApiRequestFiles.js');

    it('should throw an error if no files', function () {
      expect(parsePublishApiRequestFiles.bind(this, null)).to.throw();
    });

    it('should throw an error if no files.file', function () {
      const filesNoFile = {};
      expect(parsePublishApiRequestFiles.bind(this, filesNoFile)).to.throw();
    });

    it('should throw an error if file.size is too large', function () {
      const filesTooBig = {
        file: {
          name: 'file.jpg',
          path: '/path/to/file.jpg',
          type: 'image/jpg',
          size: 10000001,
        },
      };
      expect(parsePublishApiRequestFiles.bind(this, filesTooBig)).to.throw();
    });

    it('should throw error if not an accepted file type', function () {
      const filesWrongType = {
        file: {
          name: 'file.jpg',
          path: '/path/to/file.jpg',
          type: 'someType/ext',
          size: 10000000,
        },
      };
      expect(parsePublishApiRequestFiles.bind(this, filesWrongType)).to.throw();
    });

    it('should throw NO error if no problems', function () {
      const filesNoProblems = {
        file: {
          name: 'file.jpg',
          path: '/path/to/file.jpg',
          type: 'image/jpg',
          size: 10000000,
        },
      };
      expect(parsePublishApiRequestFiles.bind(this, filesNoProblems)).to.not.throw();
    });
  });

  describe('#parsePublishApiChannel()', function () {
    it('should pass the tests I write here');
  });
});
