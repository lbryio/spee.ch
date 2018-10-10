const db = require('../../../../models');
const chainquery = require('chainquery');

const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

const getClaimId = require('../../../utils/getClaimId.js');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const BLOCKED_CLAIM = 'BLOCKED_CLAIM';

/*

  route to get a long claim id

*/

const claimLongId = ({ ip, originalUrl, body, params }, res) => {
  const channelName = body.channelName;
  const channelClaimId = body.channelClaimId;
  const claimName = body.claimName;
  let claimId = body.claimId;

  getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      claimId = fullClaimId;
      return chainquery.claim.queries.getOutpoint(claimName, fullClaimId).catch(() => {});
    })
    .then(outpointResult => {
      if (!outpointResult) {
        return db.Claim.getOutpoint(claimName, claimId);
      }
      return outpointResult;
    })
    .then(outpoint => {
      return db.Blocked.isNotBlocked(outpoint);
    })
    .then(() => {
      res.status(200).json({success: true, data: claimId});
    })
    .catch(error => {
      if (error === NO_CLAIM) {
        return res.status(404).json({
          success: false,
          message: 'No matching claim id could be found for that url',
        });
      }
      if (error === NO_CHANNEL) {
        return res.status(404).json({
          success: false,
          message: 'No matching channel id could be found for that url',
        });
      }
      if (error === BLOCKED_CLAIM) {
        return res.status(410).json({
          success: false,
          message: 'In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content from our applications. For more details, see https://lbry.io/faq/dmca',
        });
      }
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimLongId;
