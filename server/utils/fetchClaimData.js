import chainquery from 'chainquery';
import { getFileListFileByOutpoint } from 'server/lbrynet';
import publishCache from 'server/utils/publishCache';

const fetchClaimData = async params => {
  let { claimId } = params;

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

export default fetchClaimData;
