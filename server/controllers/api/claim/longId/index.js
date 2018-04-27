const getClaimId = require('../../../utils/getClaimId.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';

/*

  route to get a long claim id

*/

const claimLongId = ({ ip, originalUrl, body, params }, res) => {
  const channelName = body.channelName;
  const channelClaimId = body.channelClaimId;
  const claimName = body.claimName;
  const claimId = body.claimId;
  getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(result => {
      if (result === NO_CHANNEL) {
        return res.status(404).json({success: false, message: 'No matching channel could be found'});
      }
      if (result === NO_CLAIM) {
        return res.status(404).json({success: false, message: 'No matching claim id could be found'});
      }
      res.status(200).json({success: true, data: result});
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimLongId;
