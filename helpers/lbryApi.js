const axios = require('axios');
const logger = require('winston');

function handleResponse ({ data }, resolve, reject) {
  logger.debug('handling lbry api response');
  if (data.result) {
    // check for an error
    if (data.result.error) {
      reject(data.result.error);
      return;
    };
    logger.debug('data.result', data.result);
    resolve(data.result);
    return;
  }
  // fallback in case the just timed out
  reject(JSON.stringify(data));
}

module.exports = {
  getWalletList () {
    logger.debug('lbryApi >> getting wallet list');
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'wallet_list',
        })
        .then(response => {
          handleResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  publishClaim (publishParams) {
    logger.debug(`lbryApi >> Publishing claim to "${publishParams.name}"`);
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'publish',
          params: publishParams,
        })
        .then(response => {
          handleResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getClaim (uri) {
    logger.debug(`lbryApi >> Getting Claim for "${uri}"`);
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'get',
          params: { uri, timeout: 20 },
        })
        .then(response => {
          handleResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getClaimList (claimName) {
    logger.debug(`lbryApi >> Getting claim_list for "${claimName}"`);
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'claim_list',
          params: { name: claimName },
        })
        .then(response => {
          handleResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  resolveUri (uri) {
    logger.debug(`lbryApi >> Resolving URI for "${uri}"`);
    // console.log('resolving uri', uri);
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'resolve',
          params: { uri },
        })
        .then(({ data }) => {
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
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'settings_get',
        })
        .then(({ data }) => {
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
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'channel_new',
          params: {
            channel_name: name,
            amount      : 0.1,
          },
        })
        .then(response => {
          handleResponse(response, resolve, reject);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
