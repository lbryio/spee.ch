const assert = require('assert');

describe('Array', function () {
  describe('indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe('controllers', function () {
  describe('api/publish', function () {
    describe('publishHelpers.js', function () {
      const publishHelpers = require('../helpers/publishHelpers.js');

      describe('#parsePublishApiRequestBody()', function () {
        it('should throw an error if no body', function () {
          assert.throws(publishHelpers.parsePublishApiRequestBody.bind(this, null), Error);
        });
        it('should throw an error if no body.name', function () {
          const bodyNoName = {};
          assert.throws(publishHelpers.parsePublishApiRequestBody.bind(this, bodyNoName), Error);
        });
        it('should throw an error if no body.name', function () {
          const body = {
            name: 'bob',
          };
          assert.doesNotThrow(publishHelpers.parsePublishApiRequestBody.bind(this, body), Error);
        });
      });

      describe('#parsePublishApiRequestFiles()', function () {
        it('should throw an error if no files', function () {
          assert.throws(publishHelpers.parsePublishApiRequestFiles.bind(this, null), Error);
        });
        it('should throw an error if no files.file', function () {
          const filesNoFile = {};
          assert.throws(publishHelpers.parsePublishApiRequestFiles.bind(this, filesNoFile), Error);
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
          assert.throws(publishHelpers.parsePublishApiRequestFiles.bind(this, filesTooBig), Error);
        });
        it('should throw error if not an accepted file type', function () {
          const filesNoProblems = {
            file: {
              name: 'file.jpg',
              path: '/path/to/file.jpg',
              type: 'someType/ext',
              size: 10000000,
            },
          };
          assert.throws(publishHelpers.parsePublishApiRequestFiles.bind(this, filesNoProblems), Error);
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
          assert.doesNotThrow(publishHelpers.parsePublishApiRequestFiles.bind(this, filesNoProblems), Error);
        });
      });
    });
  });
});
