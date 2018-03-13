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
    port       : 3000,
    title      : 'Spee.ch',
    host       : 'default',
    description: 'Open-source, decentralized image and video sharing.',
  };
  this.publishing = {
    additionalClaimAddresses: [],
    disabled                : false,
    disabledMessage         : 'Please check back soon.',
    primaryClaimAddress     : 'default',
    thumbnailChannel        : 'default',
    thumbnailChannelId      : 'default',
    uploadDirectory         : '/home/lbry/Uploads',
  };
  this.configure = (config) => {
    if (!config) {
      return console.log('No site config received.');
    }
    const { analytics, assetDefaults, auth, details, publishing } = config;
    this.analytics = analytics;
    this.assetDefaults = assetDefaults;
    this.auth = auth;
    this.details = details;
    this.publishing = publishing;
  };
};

module.exports = new SiteConfig();
