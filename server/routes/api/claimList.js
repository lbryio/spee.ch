const { getClaimList } = require('../../helpers/lbryApi.js');
const { handleErrorResponse } = require('../../helpers/errorHandlers.js');

/*

  route to get list of claims

*/

const claimList = ({ ip, originalUrl, params }, res) => {
  getClaimList(params.name)
    .then(claimsList => {
      res.status(200).json(claimsList);
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimList;
