import Request from '../utils/request';

export function getLongClaimId(host, name, modifier) {
  let body = {};
  // create request params
  if (modifier) {
    if (modifier.id) {
      body['claimId'] = modifier.id;
    } else {
      body['channelName'] = modifier.channel.name;
      body['channelClaimId'] = modifier.channel.id;
    }
  }
  body['claimName'] = name;
  const params = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  // create url
  const url = `${host}/api/claim/long-id`;
  // return the request promise
  return Request(url, params);
}

export function getShortId(host, name, claimId) {
  const url = `${host}/api/claim/short-id/${claimId}/${name}`;
  return Request(url);
}

export function getClaimData(host, name, claimId) {
  const url = `${host}/api/claim/data/${name}/${claimId}`;
  return Request(url);
}

export function checkClaimAvailability(claim) {
  const url = `/api/claim/availability/${claim}`;
  return Request(url);
}

export function getClaimViews(claimId) {
  const url = `/api/claim/views/${claimId}`;
  return Request(url);
}

export function doAbandonClaim(outpoint) {
  const params = {
    method: 'POST',
    body: JSON.stringify({ outpoint }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
  };
  return Request('/api/claim/abandon', params);
}
