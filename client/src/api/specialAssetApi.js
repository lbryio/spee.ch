import Request from '../utils/request';

export function getSpecialAssetClaims (host, name, page) {
  if (!page) page = 1;
  const url = `${host}/api/special/${name}/${page}`;
  return Request(url);
}
