import Request from '../utils/request';

export function checkFileAvailability (claimId, host, name) {
  const url = `${host}/api/file/availability/${name}/${claimId}`;
  return Request(url);
}

export function triggerClaimGet (claimId, host, name) {
  const url = `${host}/api/claim/get/${name}/${claimId}`;
  return Request(url);
}
