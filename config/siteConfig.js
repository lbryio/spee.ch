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
  this.customComponents = {
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
  this.routes = {};
  this.update = (config) => {
    if (!config) {
      return console.log('No site config received.');
    }
    const { analytics, assetDefaults, auth, customComponents, details, publishing, routes } = config;
    console.log('Configuring site details...');
    this.analytics = analytics;
    this.assetDefaults = assetDefaults;
    this.auth = auth;
    this.details = details;
    this.publishing = publishing;
    this.customComponents = customComponents;
    this.routes = routes;
  };
};

module.exports = new SiteConfig();
