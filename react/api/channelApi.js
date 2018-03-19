import Request from 'utils/request';

export function getChannelData (host, id, name) {
  if (!id) id = 'none';
  const url = `${host}/api/channel/data/${name}/${id}`;
  return Request(url);
};

export function getChannelClaims (host, longId, name, page) {
  if (!page) page = 1;
  const url = `${host}/api/channel/claims/${name}/${longId}/${page}`;
  return Request(url);
};
