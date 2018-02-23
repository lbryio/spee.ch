import Request from 'utils/request';
const { site: { host } } = require('../../config/speechConfig.js');

export function getChannelData (name, id) {
  console.log('getting channel data for channel:', name, id);
  if (!id) id = 'none';
  const url = `${host}/api/channel/data/${name}/${id}`;
  return Request(url);
};

export function getChannelClaims (name, longId, page) {
  console.log('getting channel claims for channel:', name, longId);
  if (!page) page = 1;
  const url = `/api/channel/claims/${name}/${longId}/${page}`;
  return Request(url);
};
