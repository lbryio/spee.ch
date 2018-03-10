function SiteConfig () {
  this.analytics = {
    googleId: 'default',
  };
  this.publishing = {
    primaryClaimAddress     : 'default',
    additionalClaimAddresses: [],
    thumbnailChannel        : 'default',
    thumbnailChannelId      : 'default',
    uploadDirectory         : '/home/lbry/Uploads',
  };
  this.details = {
    title      : 'Spee<h',
    name       : 'Spee.ch',
    host       : 'https://dev1.spee.ch',
    description: 'Open-source, decentralized image and video sharing.',
  };
  this.assetDefaults = {
    title      : 'dev1 Spee.ch',
    thumbnail  : 'https://spee.ch/assets/img/video_thumb_default.png',
    description: 'Open-source, decentralized image and video sharing.',
  };
  this.session = {
    sessionKey: 'default',
  };
  this.configure = ({analytics, publishing, details, assetDefaults, session}) => {
    if (analytics) this.analytics = analytics;
    if (publishing) this.publishing = publishing;
    if (details) this.details = details;
    if (assetDefaults) this.assetDefaults = assetDefaults;
    if (session) this.session = session;
  };
};

module.exports = new SiteConfig();
