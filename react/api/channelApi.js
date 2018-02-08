import Request from 'utils/request';

export function getLongChannelClaimId (name, modifier) {
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
  // crate url
  const url = `/api/claim/long-id`;
  // return the request promise
  return Request(url, params);
};

export function getShortChannelId (name, claimId) {
  const url = `/api/claim/short-id/${claimId}/${name}`;
  return Request(url);
};

export function getChannelData (name, claimId) {
  const url = `/api/claim/data/${name}/${claimId}`;
  return Request(url);
};
