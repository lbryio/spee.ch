const chai = require('chai');
const expect = chai.expect;

describe('#parsePublishApiRequestBody()', function () {
  const returnShortId = require('./returnShortId.js');
  let dummyClaimsArray;
  let dummyLongId;

  it('should thow an error if the claimId is not in the claim list', function () {
    dummyClaimsArray = [
      {claimId: 'a123456789'},
      {claimId: 'b123456789'},
      {claimId: 'c123456789'},
    ];
    dummyLongId = 'xxxxxxxxxx';
    expect(returnShortId.bind(this, dummyClaimsArray, dummyLongId)).to.throw();
  });

  it('should return the shortest unique claim id', function () {
    dummyClaimsArray = [
      {claimId: 'a123456789'},
      {claimId: 'b123456789'},
      {claimId: 'c123456789'},
    ];
    dummyLongId = 'c123456789';
    expect(returnShortId(dummyClaimsArray, dummyLongId)).to.equal('c');
  });

  it('if there is a conflict between unqiue ids, it should give preference to the one with the lowest height', function () {
    dummyClaimsArray = [
      {claimId: 'a123456789', height: 10},
      {claimId: 'ab12345678', height: 11},
      {claimId: 'ab12341111', height: 12},
    ];
    dummyLongId = 'a123456789';
    expect(returnShortId(dummyClaimsArray, dummyLongId)).to.equal('a');
    dummyLongId = 'ab12345678';
    expect(returnShortId(dummyClaimsArray, dummyLongId)).to.equal('ab');
    dummyLongId = 'ab12341111';
    expect(returnShortId(dummyClaimsArray, dummyLongId)).to.equal('ab12341');
  });
});
