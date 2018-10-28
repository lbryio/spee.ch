const chainquery = require('chainquery');
const db = require('server/models');

const fetchClaimData = async (params) => {
  let { claimId, claimName: name } = params;
  if (claimId === 'none') claimId = null;

  const [cq, local] = await Promise.all([
    chainquery.claim.queries.resolveClaim(name, claimId).then(res => res.dataValues).catch(() => {}),
    db.Claim.resolveClaim(name, claimId).catch(() => {}),
  ]);

  if (!cq && !local) return null;
  if (cq && cq.name === name && !local) return cq;
  if (local && local.name === name && !cq) return local;
  return local.updatedAt > cq.modified_at ? local : cq;
};

module.exports = fetchClaimData;
