const rel = 'alternate';
const title = 'spee.ch oEmbed profile';

const formatUrlForQuery = (url) => {
  return url.replace(/\/+/, '%2F').replace(/:/, '%3A');
};

const createJsonLinkData = (host, canonicalUrl) => {
  return {
    rel,
    type: 'application/json+oembed',
    href: `${host}/api/oembed?url=${formatUrlForQuery(canonicalUrl)}%2F&format=json`,
    title,
  };
};

const createXmlLinkData = (host, canonicalUrl) => {
  return {
    rel,
    type: 'application/xml+oembed',
    href: `${host}/api/oembed?${formatUrlForQuery(canonicalUrl)}%2F&format=xml`,
    title,
  };
};

export default {
  json: createJsonLinkData,
  xml : createXmlLinkData,
};
