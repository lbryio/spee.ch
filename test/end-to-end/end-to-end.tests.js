const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const host = 'http://dev1.spee.ch';

chai.use(chaiHttp);

function testFor200StatusResponse (host, url, timeout) {
  return it(`should receive a status code 200 within ${timeout}ms`, function (done) {
    chai.request(host)
      .get(url)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  }).timeout(timeout);
}

function testShowRequestFor200StatusResponse (host, url, timeout) {
  return it(`should receive a status code 200 within ${timeout}ms`, function (done) {
    chai.request(host)
      .get(url)
      .set('accept', 'text/html')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  }).timeout(timeout);
}

describe('end-to-end', function () {
  describe('serve requests not from browser', function () {
    const claimUrl = '/doitlive.jpg';
    const claimUrlWithShortClaimId = '/d/doitlive.jpg';
    const claimUrlWithLongClaimId = '/ca3023187e901df9e9aabd95d6ae09b6cc69b3f0/doitlive.jpg';

    describe(claimUrl, function () {
      testFor200StatusResponse(host, claimUrl, 10000);
    });
    describe(claimUrlWithShortClaimId, function () {
      testFor200StatusResponse(host, claimUrlWithShortClaimId, 10000);
    });
    describe(claimUrlWithLongClaimId, function () {
      testFor200StatusResponse(host, claimUrlWithShortClaimId, 10000);
    });
  });

  describe('show requests from browser', function () {
    const claimUrl = '/doitlive';
    const claimUrlWithShortClaimId = '/d/doitlive';
    const claimUrlWithLongClaimId = '/ca3023187e901df9e9aabd95d6ae09b6cc69b3f0/doitlive';

    describe(claimUrl, function () {
      testShowRequestFor200StatusResponse(host, claimUrl, 10000);
    });
    describe(claimUrlWithShortClaimId, function () {
      testShowRequestFor200StatusResponse(host, claimUrlWithShortClaimId, 10000);
    });
    describe(claimUrlWithLongClaimId, function () {
      testShowRequestFor200StatusResponse(host, claimUrlWithShortClaimId, 10000);
    });
  });

  describe('serve requests browser (show lite)', function () {
    const claimUrl = '/doitlive.jpg';
    const claimUrlWithShortClaimId = '/d/doitlive.jpg';
    const claimUrlWithLongClaimId = '/ca3023187e901df9e9aabd95d6ae09b6cc69b3f0/doitlive.jpg';

    describe(claimUrl, function () {
      testShowRequestFor200StatusResponse(host, claimUrl, 10000);
    });
    describe(claimUrlWithShortClaimId, function () {
      testShowRequestFor200StatusResponse(host, claimUrlWithShortClaimId, 10000);
    });
    describe(claimUrlWithLongClaimId, function () {
      testShowRequestFor200StatusResponse(host, claimUrlWithShortClaimId, 10000);
    });
  });
});