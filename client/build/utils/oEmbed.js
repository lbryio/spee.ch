"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var rel = 'alternate';
var title = 'spee.ch oEmbed profile';

var formatUrlForQuery = function formatUrlForQuery(url) {
  return url.replace(/\//g, '%2F').replace(/:/g, '%3A');
};

var createJsonLinkData = function createJsonLinkData(host, canonicalUrl) {
  return {
    rel: rel,
    type: 'application/json+oembed',
    href: "".concat(host, "/api/oembed?url=").concat(formatUrlForQuery(canonicalUrl), "%2F&format=json"),
    title: title
  };
};

var createXmlLinkData = function createXmlLinkData(host, canonicalUrl) {
  return {
    rel: rel,
    type: 'application/xml+oembed',
    href: "".concat(host, "/api/oembed?url=").concat(formatUrlForQuery(canonicalUrl), "%2F&format=xml"),
    title: title
  };
};

var _default = {
  json: createJsonLinkData,
  xml: createXmlLinkData
};
exports.default = _default;