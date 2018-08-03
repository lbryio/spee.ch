const chai = require('chai');
const expect = chai.expect;

describe('#parsePublishApiRequestBody()', function () {
  const parsePublishApiRequestBody = require('./parsePublishApiRequestBody.js');

  it('should throw an error if no body', function () {
    expect(parsePublishApiRequestBody.bind(this, null)).to.throw();
  });

  it('should throw an error if no body.name', function () {
    const bodyNoName = {};
    expect(parsePublishApiRequestBody.bind(this, bodyNoName)).to.throw();
  });
});
