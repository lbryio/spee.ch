const axios = require('axios');
const logger = require('winston');
const { apiHost, apiPort, getTimeout } = require('@config/lbryConfig');
const lbrynetUri = 'http://' + apiHost + ':' + apiPort;
const { chooseGaLbrynetPublishLabel, sendGATimingEvent } = require('../utils/googleAnalytics.js');
const handleLbrynetResponse = require('./utils/handleLbrynetResponse.js');
const { publishing } = require('@config/siteConfig');

module.exports = {
  publishClaim (publishParams) {
    logger.debug(`lbryApi >> Publishing claim to "${publishParams.name}"`);
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbrynetUri, {
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
        .post(lbrynetUri, {
          method: 'get',
          params: {
            uri,
            timeout: getTimeout || 30,
          },
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
  async abandonClaim ({claimId}) {
    logger.debug(`lbryApi >> Abandon claim "${claimId}"`);
    const gaStartTime = Date.now();
    try {
      const abandon = await axios.post(lbrynetUri, {
        method: 'claim_abandon',
        params: { claim_id: claimId },
      });
      sendGATimingEvent('lbrynet', 'abandonClaim', 'ABANDON_CLAIM', gaStartTime, Date.now());
      return abandon.data;
    } catch (error) {
      logger.error(error);
      return error;
    }
  },
  getClaimList (claimName) {
    logger.debug(`lbryApi >> Getting claim_list for "${claimName}"`);
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbrynetUri, {
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
        .post(lbrynetUri, {
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
        .post(lbrynetUri, {
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
        .post(lbrynetUri, {
          method: 'channel_new',
          params: {
            channel_name: name,
            amount      : publishing.channelClaimBidAmount,
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
  getWalletBalance () {
    const gaStartTime = Date.now();
    return new Promise((resolve, reject) => {
      axios
        .post(lbrynetUri, {
          method: 'wallet_balance',
        })
        .then(response => {
          sendGATimingEvent('lbrynet', 'getWalletBalance', 'SETTINGS_GET', gaStartTime, Date.now());
          handleLbrynetResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
