"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSiteHost = exports.selectSiteState = void 0;

var selectSiteState = function selectSiteState(state) {
  return state.site;
};

exports.selectSiteState = selectSiteState;

var selectSiteHost = function selectSiteHost(state) {
  return state.site.host;
};

exports.selectSiteHost = selectSiteHost;