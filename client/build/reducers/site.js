"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  description: 'default description',
  googleAnalyticsId: 'default google id',
  host: 'default host',
  title: 'default title',
  twitter: 'default twitter',
  defaultDescription: 'default description',
  defaultThumbnail: 'default thumbnail'
};

if (_siteConfig.default) {
  var googleAnalyticsId = _siteConfig.default.analytics.googleId,
      _siteConfig$assetDefa = _siteConfig.default.assetDefaults,
      defaultThumbnail = _siteConfig$assetDefa.thumbnail,
      defaultDescription = _siteConfig$assetDefa.description,
      _siteConfig$details = _siteConfig.default.details,
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
}

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    default:
      return state;
  }
}

;