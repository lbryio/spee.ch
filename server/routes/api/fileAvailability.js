const { handleErrorResponse } = require('helpers/errorHandlers.js');
const db = require('models');

/*

  route to see if asset is available locally

*/

const fileAvailability = ({ ip, originalUrl, params }, res) => {
  const name = params.name;
  const claimId = params.claimId;
  db.File
    .findOne({
      where: {
        name,
        claimId,
      },
    })
    .then(result => {
      if (result) {
        return res.status(200).json({success: true, data: true});
      }
      res.status(200).json({success: true, data: false});
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = fileAvailability;
