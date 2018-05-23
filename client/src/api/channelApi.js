import Request from '../utils/request';

export function getChannelData (host, name, id) {
  if (!id) id = 'none';
  const url = `${host}/api/channel/data/${name}/${id}`;
  return Request(url);
}

export function getChannelClaims (host, name, longId, page) {
  if (!page) page = 1;
  const url = `${host}/api/channel/claims/${name}/${longId}/${page}`;
  return Request(url);
}

export function checkChannelAvailability (channel) {
  const url = `/api/channel/availability/${channel}`;
  return Request(url);
}

export function makeCreateChannelRequest (username, password) {
  const params = {
    method : 'POST',
    body   : JSON.stringify({username, password}),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
  };
  return Request('/signup', params);
}
