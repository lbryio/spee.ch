import Request from 'utils/request';

export function getLongClaimId (name, modifier) {
  // console.log('getting long claim id for asset:', name, modifier);
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
    method : 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }
  // create url
  const url = `/api/claim/long-id`;
  // return the request promise
  return Request(url, params);
};

export function getShortId (name, claimId) {
  // console.log('getting short id for asset:', name, claimId);
  const url = `/api/claim/short-id/${claimId}/${name}`;
  return Request(url);
};

export function getClaimData (name, claimId) {
  // console.log('getting claim data for asset:', name, claimId);
  const url = `/api/claim/data/${name}/${claimId}`;
  return Request(url);
};
