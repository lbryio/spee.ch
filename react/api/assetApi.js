import Request from 'utils/request';
const { details: { host } } = require('../../config/siteConfig.js');

export function getLongClaimId (name, modifier) {
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
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(body),
  };
  // create url
  const url = `${host}/api/claim/long-id`;
  // return the request promise
  return Request(url, params);
};

export function getShortId (name, claimId) {
  const url = `${host}/api/claim/short-id/${claimId}/${name}`;
  return Request(url);
};

export function getClaimData (name, claimId) {
  const url = `${host}/api/claim/data/${name}/${claimId}`;
  return Request(url);
};
