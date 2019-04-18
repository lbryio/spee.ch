const db = require('server/models');
const chainquery = require('chainquery').default;
const logger = require('winston');
const publishCache = require('server/utils/publishCache');
const { handleErrorResponse } = require('server/controllers/utils/errorHandlers.js');

const getClaimId = require('server/controllers/utils/getClaimId.js');

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
      if (!fullClaimId) {
        throw new Error('Unable to get fullClaimId');
      }
      return chainquery.claim.queries.getOutpoint(fullClaimId).catch(() => {
        logger.debug(`failed to get claimId from chainQuery given ${claimName} and ${fullClaimId}`);
      });
    })
    // Remove this, replace with file_list
    // In the event that we need the longId of a claim just published
    // check to see if shortClaimId matches cache, then verify
    // Should we also verify
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
      res.status(200).json({ success: true, data: claimId });
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
        return res.status(451).json({
          success: false,
          message:
            'In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content from our applications. For more details, see https://lbry.io/faq/dmca',
        });
      }
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimLongId;
