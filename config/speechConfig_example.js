module.exports = {
  wallet: {
    lbryClaimAddress: null,  // choose an address from your lbry wallet
  },
  analytics: {
    googleId: null, // google id for analytics tracking; leave `null` if not applicable
  },
  sql: {
    database: null,  // name of mysql database
    username: null,  // username for mysql
    password: null,  // password for mysql
  },
  logging: {
    logLevel         : null,  // options: silly, debug, verbose, info
    slackWebHook     : null,  // enter a webhook if you wish to push logs to slack; otherwise leave as `null`
    slackErrorChannel: null,  // enter a slack channel (#example) for errors to be sent to; otherwise leave null
    slackInfoChannel : null,  // enter a slack channel (#info) for info level logs to be sent to otherwise leave null
  },
  session: {
    sessionKey: null,  // enter a secret key to be used for session encryption
  },
};
