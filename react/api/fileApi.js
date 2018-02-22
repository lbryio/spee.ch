import Request from 'utils/request';
const { site: { host } } = require('../../config/speechConfig.js');

export function checkFileAvailability (name, claimId) {
  const url = `${host}/api/file/availability/${name}/${claimId}`;
  return Request(url);
}

export function triggerClaimGet (name, claimId) {
  const url = `${host}/api/claim/get/${name}/${claimId}`;
  return Request(url);
}
