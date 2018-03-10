const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { details: { host } } = require('../../config/siteConfig.js');
const { testChannel, testChannelId, testChannelPassword } = require('../../devConfig/testingConfig.js');
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

  describe('channel data request from client', function () {
    const url = '/@test';
    const urlWithShortClaimId = '/@test:3';
    const urlWithMediumClaimId = '/@test:3b5bc6b6819172c6';
    const urlWithLongClaimId = '/@test:3b5bc6b6819172c6e2f3f90aa855b14a956b4a82';

    describe(url, function () {
      it('should pass the tests I write here');
    });
    describe(urlWithShortClaimId, function () {
      it('should pass the tests I write here');
    });
    describe(urlWithMediumClaimId, function () {
      it('should pass the tests I write here');
    });
    describe(urlWithLongClaimId, function () {
      it('should pass the tests I write here');
    });
  });

  describe('publish requests', function () {
    const publishUrl = '/api/claim/publish';
    const filePath = './test/mock-data/bird.jpeg';
    const fileName = 'byrd.jpeg';
    const channelName = testChannel;
    const channelId = testChannelId;
    const channelPassword = testChannelPassword;
    const date = new Date();
    const name = `test-publish-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getTime()}`;

    describe('api/claim/publish', function () {

      it(`should receive a status code 400 if username does not exist`, function (done) {
        chai.request(host)
          .post(publishUrl)
          .type('form')
          .attach('file', fs.readFileSync(filePath), fileName)
          .field('name', name)
          .field('channelName', `@${name}`)
          .field('channelPassword', channelPassword)
          .end(function (err, res) {
            expect(res).to.have.status(400);
            done();
          });
      }).timeout(publishTimeout);

      it(`should receive a status code 400 if the wrong password is used with the channel name`, function (done) {
        chai.request(host)
          .post(publishUrl)
          .type('form')
          .attach('file', fs.readFileSync(filePath), fileName)
          .field('name', name)
          .field('channelName', channelName)
          .field('channelPassword', 'xxxxx')
          .end(function (err, res) {
            expect(res).to.have.status(400);
            done();
          });
      }).timeout(publishTimeout);

      it(`should receive a status code 400 if the wrong password is used with the channel id`, function (done) {
        chai.request(host)
          .post(publishUrl)
          .type('form')
          .attach('file', fs.readFileSync(filePath), fileName)
          .field('name', name)
          .field('channelName', channelName)
          .field('channelPassword', 'xxxxx')
          .end(function (err, res) {
            expect(res).to.have.status(400);
            done();
          });
      }).timeout(publishTimeout);
    });

    describe('anonymous publishes', function () {
      it(`should receive a status code 200 within ${publishTimeout}ms @usesLbc`, function (done) {
        chai.request(host)
          .post(publishUrl)
          .type('form')
          .attach('file', fs.readFileSync(filePath), fileName)
          .field('name', `${name}-anonymous`)
          .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
          });
      }).timeout(publishTimeout);
    });

    describe('in-channel publishes', function () {
      it(`should receive a status code 200 within ${publishTimeout}ms @usesLbc`, function (done) {
        chai.request(host)
          .post(publishUrl)
          .type('form')
          .attach('file', fs.readFileSync(filePath), fileName)
          .field('name', `${name}-channel`)
          .field('channelName', channelName)
          .field('channelPassword', channelPassword)
          .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
          });
      }).timeout(publishTimeout);
    });

  });


});
