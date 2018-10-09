import Request from '../utils/request';

export function getHomepageChannelsData (host, name, id) {
  const url = `${host}/api/homepage/data/channels`;
  return Request(url);
}
