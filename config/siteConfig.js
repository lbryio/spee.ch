function SiteConfig () {
  this.analytics = {
    googleId: 'default',
  };
  this.assetDefaults = {
    description: 'An asset published on Spee.ch',
    thumbnail  : 'https://spee.ch/assets/img/video_thumb_default.png',
    title      : 'Spee.ch',
  };
  this.auth = {
    sessionKey: 'default',
  };
  this.componentsConfig = {
    components: {},
    containers: {},
    pages     : {},
  };
  this.details = {
    description: 'Open-source, decentralized image and video sharing.',
    host       : 'default',
    port       : 3000,
    title      : 'Spee.ch',
    twitter    : '@spee_ch',
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
    const { analytics, assetDefaults, auth, componentsConfig, details, publishing } = config;
    this.analytics = analytics;
    this.assetDefaults = assetDefaults;
    this.auth = auth;
    this.details = details;
    this.publishing = publishing;
    this.componentsConfig = componentsConfig;
  };
};

module.exports = new SiteConfig();
