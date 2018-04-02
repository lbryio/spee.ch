function SiteConfig () {
  this.analytics = {
    googleId: 'default',
  };
  this.assetDefaults = {
    description: 'An asset published on Spee.ch',
    thumbnail  : 'https://spee.ch/assets/img/video_thumb_default.png',
    title      : 'A Spee.ch Implementation',
  };
  this.auth = {
    sessionKey: 'default',
  };
  this.customComponents = {};
  this.customContainers = {};
  this.customPages = {};
  this.details = {
    description: 'Welcome to my decentralized image and video sharing site.',
    host       : 'http://localhost:3000',
    port       : 3000,
    title      : 'My Spee.ch Site',
    twitter    : '@exampleTwitterHandle',
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
    const { analytics, assetDefaults, auth, customComponents, customContainers, customPages, details, publishing, routes } = config;
    console.log('Configuring site details...');
    this.analytics = analytics;
    this.assetDefaults = assetDefaults;
    this.auth = auth;
    this.details = details;
    this.publishing = publishing;
    this.customComponents = customComponents;
    this.customContainers = customContainers;
    this.customPages = customPages;
    this.routes = routes;
  };
};

module.exports = new SiteConfig();
