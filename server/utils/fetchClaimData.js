const chainquery = require('chainquery').default;
const { getFileListFileByOutpoint } = require('server/lbrynet');
const publishCache = require('server/utils/publishCache');
const logger = require('winston');

const fetchClaimData = async params => {
  let { claimId } = params;
  logger.debug('fetchClaimData params:', params);

  if (claimId === 'none') {
    claimId = null;
  }

  const publishData = publishCache.get(claimId);
  const outpoint = publishData && publishData.outpoint;

  if (outpoint) {
    return getFileListFileByOutpoint(outpoint);
  } else {
    return chainquery.claim.queries.resolveClaim(claimId).catch(() => null);
  }
};

module.exports = fetchClaimData;
