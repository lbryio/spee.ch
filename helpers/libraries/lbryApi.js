const axios = require('axios');
const logger = require('winston');

module.exports = {
  getWalletList () {
    logger.debug('getting wallet list');
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'wallet_list',
        })
        .then(response => {
          const result = response.data.result;
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },
  publishClaim (publishParams) {
    logger.debug(`Publishing claim to "${publishParams.name}"`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'publish',
          params: publishParams,
        })
        .then(response => {
          const result = response.data.result;
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },
  getClaim (uri) {
    logger.debug(`Getting Claim for "${uri}"`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'get',
          params: { uri, timeout: 20 },
        })
        .then(({ data }) => {
          // check to make sure the daemon didn't just time out
          if (!data.result) {
            reject(JSON.stringify(data));
          }
          if (data.result.error) {
            reject(data.result.error);
          }
          /*
            note: put in a check to make sure we do not resolve until the download is actually complete (response.data.completed === true)?
          */
          resolve(data.result);
        })
        .catch(error => {
          logger.debug("axios.post 'get' error");
          reject(error);
        });
    });
    return deferred;
  },
  getClaimsList (claimName) {
    logger.debug(`Getting Claim List for "${claimName}"`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'claim_list',
          params: { name: claimName },
        })
        .then(({ data }) => {
          resolve(data.result);
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },
  resolveUri (uri) {
    logger.debug(`Resolving URI for "${uri}"`);
    const deferred = new Promise((resolve, reject) => {
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
    return deferred;
  },
  getDownloadDirectory () {
    logger.debug('Retrieving the download directory path from lbry daemon...');
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'settings_get',
        })
        .then(({ data }) => {
          if (data.result) {
            resolve(data.result.download_directory);
          } else {
            reject(new Error('Successfully connected to lbry daemon, but unable to retrieve the download directory.'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return deferred;
  },
};
