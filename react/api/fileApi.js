import Request from 'utils/request';
const { details: { host } } = require('../../config/siteConfig.js');

export function checkFileAvailability (name, claimId) {
  const url = `${host}/api/file/availability/${name}/${claimId}`;
  return Request(url);
}

export function triggerClaimGet (name, claimId) {
  const url = `${host}/api/claim/get/${name}/${claimId}`;
  return Request(url);
}
