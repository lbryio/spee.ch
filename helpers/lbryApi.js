const axios = require('axios');
const logger = require('winston');

module.exports = {
  getWalletList () {
    logger.debug('lbryApi >> getting wallet list');
    return new Promise((resolve, reject) => {
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
          const result = response.data.result;
          resolve(result);
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
        .then(({ data }) => {
          resolve(data.result);
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
          console.log('error with resolve', error);
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
            // reject(new Error('Successfully connected to lbry daemon, but unable to retrieve the download directory.'));
            return new Error('Successfully connected to lbry daemon, but unable to retrieve the download directory.');
          }
        })
        .catch(error => {
          logger.error('Lbrynet Error:', error);
          resolve('/home/lbry/Downloads/');
        });
    });
  },
  createChannel (channelName) {
    return new Promise((resolve, reject) => {
      resolve({
        tx      : 'test',
        txid    : 'test',
        nout    : 'test',
        fee     : 'test',
        claim_id: 'xxxxxxxxxxxxxxxxxx',
      });
    });
  },
};
