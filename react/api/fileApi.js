import Request from 'utils/request';

export function checkFileAvailability (name, claimId) {
  const url = `/api/file/availability/${name}/${claimId}`;
  return Request(url);
}

export function triggerClaimGet (name, claimId) {
  const url = `/api/claim/get/${name}/${claimId}`;
  return Request(url);
}
