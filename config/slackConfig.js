function SlackConfig () {
  this.slackWebHook      = 'default';
  this.slackErrorChannel = 'default';
  this.slackInfoChannel  = 'default';
  this.configure = (config) => {
    if (!config) {
      return console.log('No slack config received.');
    }
    const {slackWebHook, slackErrorChannel, slackInfoChannel} = config;
    this.slackWebHook = slackWebHook;
    this.slackErrorChannel = slackErrorChannel;
    this.slackInfoChannel = slackInfoChannel;
  };
};

module.exports = new SlackConfig();
