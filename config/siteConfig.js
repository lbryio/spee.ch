const logger = require('winston');

function SiteConfig () {
  this.analytics = {
    googleId: 'default',
  };
  this.assetDefaults = {
    title      : 'Spee.ch',
    thumbnail  : 'https://spee.ch/assets/img/video_thumb_default.png',
    description: 'Open-source, decentralized image and video sharing.',
  };
  this.auth = {
    sessionKey: 'default',
  };
  this.details = {
    title      : 'Spee.h Dev1',
    host       : 'https://dev1.spee.ch',
    description: 'Open-source, decentralized image and video sharing.',
  };
  this.publishing = {
    additionalClaimAddresses: [],  // optional
    disabled                : false,
    primaryClaimAddress     : 'default',
    thumbnailChannel        : 'default',
    thumbnailChannelId      : 'default',
    uploadDirectory         : '/home/lbry/Uploads',
  };
  this.configure = (config) => {
    if (!config) {
      return logger.warn('No site config received.');
    }
    const {analytics, publishing, details, assetDefaults, auth} = config;
    this.analytics = analytics;
    this.publishing = publishing;
    this.details = details;
    this.assetDefaults = assetDefaults;
    this.auth = auth;
  };
};

module.exports = new SiteConfig();
