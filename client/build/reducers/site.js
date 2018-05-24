"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var customizedSiteReducer = function customizedSiteReducer(siteConfig) {
  var initialState = {};

  if (siteConfig) {
    var googleAnalyticsId = siteConfig.analytics.googleId,
        _siteConfig$assetDefa = siteConfig.assetDefaults,
        defaultThumbnail = _siteConfig$assetDefa.thumbnail,
        defaultDescription = _siteConfig$assetDefa.description,
        _siteConfig$details = siteConfig.details,
        description = _siteConfig$details.description,
        host = _siteConfig$details.host,
        title = _siteConfig$details.title,
        twitter = _siteConfig$details.twitter;
    initialState = {
      description: description,
      googleAnalyticsId: googleAnalyticsId,
      host: host,
      title: title,
      twitter: twitter,
      defaultDescription: defaultDescription,
      defaultThumbnail: defaultThumbnail
    };
  } else {
    initialState = {
      description: 'default description',
      googleAnalyticsId: 'default google id',
      host: 'default host',
      title: 'default title',
      twitter: 'default twitter',
      defaultDescription: 'default description',
      defaultThumbnail: 'default thumbnail'
    };
  }

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      default:
        return state;
    }
  };
};

var _default = customizedSiteReducer;
exports.default = _default;