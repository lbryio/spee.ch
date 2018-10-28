const chainquery = require('chainquery');
const db = require('server/models');

const fetchClaimData = async (params) => {
  const name = params.claimName;
  let claimId = params.claimId;
  if (claimId === 'none') claimId = null;

  const [cq, local] = await Promise.all([
    chainquery.claim.queries.resolveClaim(name, claimId).then(res => res.dataValues).catch(() => {}),
    db.Claim.resolveClaim(name, claimId).catch(() => {}),
  ]);

  if (!cq && !local) return null;
  if (cq.name === name && !local) return cq;
  if (local.name === name && !cq) return local;
  return local.updatedAt > cq.modified_at ? local : cq;
};

module.exports = fetchClaimData;
