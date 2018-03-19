const axios = require('axios');
const logger = require('winston');
const { api: { apiHost, apiPort } } = require('../../devConfig/lbryConfig.js');
const lbryApiUri = 'http://' + apiHost + ':' + apiPort;
const { chooseGaLbrynetPublishLabel, sendGATimingEvent } = require('./googleAnalytics.js');

const handleLbrynetResponse = ({ data }, resolve, reject) => {
  logger.debug('lbry api data:', data);
  if (data.result) {
    // check for an error
    if (data.result.error) {
      logger.debug('Lbrynet api error:', data.result.error);
      reject(new Error(data.result.error));
      return;
    };
    resolve(data.result);
    return;
  }
  // fallback in case it just timed out
  reject(JSON.stringify(data));
};

module.exports = {
  publishClaim (publishParams) {
    logger.debug(`lbryApi >> Publishing claim to "${publishParams.name}"`);
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbryApiUri, {
          method: 'publish',
          params: publishParams,
        })
        .then(response => {
          sendGATimingEvent('lbrynet', 'publish', chooseGaLbrynetPublishLabel(publishParams), gaStartTime, Date.now());
          handleLbrynetResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getClaim (uri) {
    logger.debug(`lbryApi >> Getting Claim for "${uri}"`);
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbryApiUri, {
          method: 'get',
          params: { uri, timeout: 20 },
        })
        .then(response => {
          sendGATimingEvent('lbrynet', 'getClaim', 'GET', gaStartTime, Date.now());
          handleLbrynetResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getClaimList (claimName) {
    logger.debug(`lbryApi >> Getting claim_list for "${claimName}"`);
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbryApiUri, {
          method: 'claim_list',
          params: { name: claimName },
        })
        .then(response => {
          sendGATimingEvent('lbrynet', 'getClaimList', 'CLAIM_LIST', gaStartTime, Date.now());
          handleLbrynetResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  resolveUri (uri) {
    logger.debug(`lbryApi >> Resolving URI for "${uri}"`);
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbryApiUri, {
          method: 'resolve',
          params: { uri },
        })
        .then(({ data }) => {
          sendGATimingEvent('lbrynet', 'resolveUri', 'RESOLVE', gaStartTime, Date.now());
          if (data.result[uri].error) {  // check for errors
            reject(data.result[uri].error);
          } else {  // if no errors, resolve
            resolve(data.result[uri]);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getDownloadDirectory () {
    logger.debug('lbryApi >> Retrieving the download directory path from lbry daemon...');
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbryApiUri, {
          method: 'settings_get',
        })
        .then(({ data }) => {
          sendGATimingEvent('lbrynet', 'getDownloadDirectory', 'SETTINGS_GET', gaStartTime, Date.now());
          if (data.result) {
            resolve(data.result.download_directory);
          } else {
            return new Error('Successfully connected to lbry daemon, but unable to retrieve the download directory.');
          }
        })
        .catch(error => {
          logger.error('Lbrynet Error:', error);
          resolve('/home/lbry/Downloads/');
        });
    });
  },
  createChannel (name) {
    logger.debug(`lbryApi >> Creating channel for ${name}...`);
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbryApiUri, {
          method: 'channel_new',
          params: {
            channel_name: name,
            amount      : 0.1,
          },
        })
        .then(response => {
          sendGATimingEvent('lbrynet', 'createChannel', 'CHANNEL_NEW', gaStartTime, Date.now());
          handleLbrynetResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
