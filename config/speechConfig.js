module.exports = {
  analytics: {
    googleId: 'UA-60403362-6', // google id for analytics tracking; leave `null` if not applicable
  },
  logging: {
    logLevel         : 'debug',  // options: silly, debug, verbose, info
    slackWebHook     : 'https://hooks.slack.com/services/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',  // enter a webhook if you wish to push logs to slack; otherwise leave as `null`
    slackErrorChannel: null,  // enter a slack channel (#example) for errors to be sent to; otherwise leave null
    slackInfoChannel : '#speech-dev1-errors',  // enter a slack channel (#info) for info level logs to be sent to otherwise leave null
  },
  session: {
    sessionKey: 'nans$#kfjanwe234rydns',  // enter a secret key to be used for session encryption
  },
  files: {
    uploadDirectory: '/home/lbry/Uploads',  // enter file path to where uploads/publishes should be stored
  },
  site: {
    title      : 'dev1.Spee.ch',
    name       : 'dev1.Spee.ch',
    host       : 'https://dev1.spee.ch',
    description: 'Open-source, decentralized image and video sharing.',
  },
  publish: {
    primaryClaimAddress     : 'bDZ2wPwtULUGxT7GXuNLpQhXmdPRUTUkcL',
    additionalClaimAddresses: ['banpwixPosfVDWnGvXqU2af36Qpsd7buGd'],
    thumbnailChannel        : '@dev1thumbs',  // create a channel to use for thumbnail images
    thumbnailChannelId      : 'aeb625ff6f66c3eeeb42885070f4e53876033626',  // the channel_id (claim id) for the channel above
  },
  claim: {
    defaultTitle      : 'dev1 Spee.ch',
    defaultThumbnail  : 'https://spee.ch/assets/img/video_thumb_default.png',
    defaultDescription: 'Open-source, decentralized image and video sharing.',
  },
  testing: {
    testChannel        : '@test', // a channel to make test publishes in
    testChannelId      : '3b5bc6b6819172c6e2f3f90aa855b14a956b4a82', // the claim id for the test channel
    testChannelPassword: '1234',  // password for the test channel
  },
  api: {
    apiHost: 'localhost',
    apiPort: '5279',
  },
};
