const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { site, testing } = require('../../config/speechConfig.js');
const { host } = site;
const { testChannel, testChannelPassword } = testing;
const requestTimeout = 20000;
const publishTimeout = 120000;
const fs = require('fs');

chai.use(chaiHttp);

function testFor200StatusResponse (host, url) {
  return it(`should receive a status code 200 within ${requestTimeout}ms`, function (done) {
    chai.request(host)
      .get(url)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  }).timeout(requestTimeout);
}

function testShowRequestFor200StatusResponse (host, url) {
  return it(`should receive a status code 200 within ${requestTimeout}ms`, function (done) {
    chai.request(host)
      .get(url)
      .set('accept', 'text/html')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  }).timeout(requestTimeout);
}

describe('end-to-end', function () {
  describe('serve requests not from browser', function () {
    const claimUrl = '/doitlive.jpg';
    const claimUrlWithShortClaimId = '/d/doitlive.jpg';
    const claimUrlWithLongClaimId = '/ca3023187e901df9e9aabd95d6ae09b6cc69b3f0/doitlive.jpg';

    describe(claimUrl, function () {
      testFor200StatusResponse(host, claimUrl);
    });
    describe(claimUrlWithShortClaimId, function () {
      testFor200StatusResponse(host, claimUrlWithShortClaimId);
    });
    describe(claimUrlWithLongClaimId, function () {
      testFor200StatusResponse(host, claimUrlWithShortClaimId);
    });
  });

  describe('show requests from browser', function () {
    const claimUrl = '/doitlive';
    const claimUrlWithShortClaimId = '/d/doitlive';
    const claimUrlWithLongClaimId = '/ca3023187e901df9e9aabd95d6ae09b6cc69b3f0/doitlive';

    describe(claimUrl, function () {
      testShowRequestFor200StatusResponse(host, claimUrl);
    });
    describe(claimUrlWithShortClaimId, function () {
      testShowRequestFor200StatusResponse(host, claimUrlWithShortClaimId);
    });
    describe(claimUrlWithLongClaimId, function () {
      testShowRequestFor200StatusResponse(host, claimUrlWithShortClaimId);
    });
  });

  describe('serve requests browser (show lite)', function () {
    const claimUrl = '/doitlive.jpg';
    const claimUrlWithShortClaimId = '/d/doitlive.jpg';
    const claimUrlWithLongClaimId = '/ca3023187e901df9e9aabd95d6ae09b6cc69b3f0/doitlive.jpg';

    describe(claimUrl, function () {
      testShowRequestFor200StatusResponse(host, claimUrl);
    });
    describe(claimUrlWithShortClaimId, function () {
      testShowRequestFor200StatusResponse(host, claimUrlWithShortClaimId);
    });
    describe(claimUrlWithLongClaimId, function () {
      testShowRequestFor200StatusResponse(host, claimUrlWithShortClaimId);
    });
  });

  describe('publish', function () {
    const publishUrl = '/api/claim-publish';
    const date = new Date();
    const name = `test-publish-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getTime()}`;
    const filePath = './test/mock-data/bird.jpeg';
    const fileName = 'byrd.jpeg';
    const channelName = testChannel;
    const channelPassword = testChannelPassword;

    describe(publishUrl, function () {
      it(`non-channel publishes should receive a status code 200 within ${publishTimeout}ms @usesLbc`, function (done) {
        chai.request(host)
          .post(publishUrl)
          .type('form')
          .attach('file', fs.readFileSync(filePath), fileName)
          .field('name', name)
          .end(function (err, res) {
            // expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      }).timeout(publishTimeout);
    });

    describe(publishUrl, function () {
      it(`channel publishes should receive a status code 200 within ${publishTimeout}ms @usesLbc`, function (done) {
        chai.request(host)
          .post(publishUrl)
          .type('form')
          .attach('file', fs.readFileSync(filePath), fileName)
          .field('name', name)
          .field('channelName', channelName)
          .field('channelPassword', channelPassword)
          .end(function (err, res) {
            // expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      }).timeout(publishTimeout);
    });

  });


});
