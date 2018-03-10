function SlackConfig () {
  this.slackWebHook      = 'default';
  this.slackErrorChannel = 'default';
  this.slackInfoChannel  = 'default';
  this.configure = ({slackWebHook, slackErrorChannel, slackInfoChannel}) => {
    if (slackWebHook) this.slackWebHook = slackWebHook;
    if (slackErrorChannel) this.slackErrorChannel = slackErrorChannel;
    if (slackInfoChannel) this.slackInfoChannel = slackInfoChannel;
  };
};

module.exports = new SlackConfig();
