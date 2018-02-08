import Request from 'utils/request';
import request from '../utils/request';

export function getChannelData (name, id) {
  console.log('getting and storing channel data for channel:', name, id);
  if (!id) id = 'none';
  const url = `/api/channel/data/${name}/${id}`;
  return request(url)
};

export function getChannelClaims (name, claimId) {

  return Request(url);
};
