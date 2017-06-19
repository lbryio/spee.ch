const axios = require('axios');
const db = require('../../models');

module.exports = {
  publishClaim (publishParams, fileName, fileType) {
    const deferred = new Promise((resolve, reject) => {
      console.log('>> lbryApi >> publishClaim:', publishParams);
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'publish',
          params: publishParams,
        })
        .then(response => {
          console.log(">> 'publish' success", response);
          const result = response.data.result;
          db.File
            .create({
              name     : publishParams.name,
              claim_id : result.claim_id,
              outpoint : `${result.txid}:${result.nout}`,
              file_name: fileName,
              file_path: publishParams.file_path,
              file_type: fileType,
              nsfw     : publishParams.metadata.nsfw,
            })
            .catch(error => {
              console.log('An error occurred when writing to the MySQL database:', error);
            });
          resolve(result);
        })
        .catch(error => {
          console.log(">> 'publish' error");
          reject(error);
        });
    });
    return deferred;
  },
  getClaim (uri) {
    const deferred = new Promise((resolve, reject) => {
      console.log('>> lbryApi >> getClaim:', uri);
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'get',
          params: { uri, timeout: 20 },
        })
        .then(({ data }) => {
          console.log(">> 'get' success");
          // check to make sure the daemon didn't just time out
          if (data.result.error) {
            reject(data.result.error);
          }
          /*
            note: put in a check to make sure we do not resolve until the download is actually complete (response.data.completed === true)
          */
          // save a record of the file to the Files table
          const result = data.result;
          db.File
            .create({
              name     : result.name,
              claim_id : result.claim_id,
              outpoint : result.outpoint,
              file_name: result.file_name,
              file_path: result.download_path,
              file_type: result.mime_type,
              nsfw     : result.metadata.stream.metadata.nsfw,
            })
            .catch(error => {
              console.log('An error occurred when writing to the MySQL database:', error);
            });
          resolve(result);
        })
        .catch(error => {
          console.log(">> 'get' error");
          reject(error);
        });
    });
    return deferred;
  },
  getClaimsList (claimName) {
    const deferred = new Promise((resolve, reject) => {
      console.log('>> lbryApi >> getClaimList:', claimName);
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'claim_list',
          params: { name: claimName },
        })
        .then(({ data }) => {
          console.log(">> 'claim_list' success");
          resolve(data.result);
        })
        .catch(error => {
          console.log(">> 'claim_list' error");
          reject(error);
        });
    });
    return deferred;
  },
  resolveUri (uri) {
    const deferred = new Promise((resolve, reject) => {
      console.log('>> lbryApi >> resolveUri:', uri);
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'resolve',
          params: { uri },
        })
        .then(({ data }) => {
          console.log(">> 'resolve' success");
          resolve(data.result);
        })
        .catch(error => {
          console.log(">> 'resolve' error");
          reject(error);
        });
    });
    return deferred;
  },
};
