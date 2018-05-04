const winstonSlackWebHook = require('winston-slack-webhook').SlackWebHook;
const winston = require('winston');

function SlackConfig () {
  this.slackWebHook      = 'default';
  this.slackErrorChannel = 'default';
  this.slackInfoChannel  = 'default';
  this.update = (config) => {
    if (!config) {
      return winston.warn('No slack config received');
    }
    // update variables
    winston.info('configuring slack logger...');
    const {slackWebHook, slackErrorChannel, slackInfoChannel} = config;
    this.slackWebHook = slackWebHook;
    this.slackErrorChannel = slackErrorChannel;
    this.slackInfoChannel = slackInfoChannel;
    // update slack webhook settings
    if (this.slackWebHook) {
      // add a transport for errors to slack
      if (this.slackErrorChannel) {
        winston.add(winstonSlackWebHook, {
          name      : 'slack-errors-transport',
          level     : 'warn',
          webhookUrl: this.slackWebHook,
          channel   : this.slackErrorChannel,
          username  : 'spee.ch',
          iconEmoji : ':face_with_head_bandage:',
        });
      };
      if (this.slackInfoChannel) {
        winston.add(winstonSlackWebHook, {
          name      : 'slack-info-transport',
          level     : 'info',
          webhookUrl: this.slackWebHook,
          channel   : this.slackInfoChannel,
          username  : 'spee.ch',
          iconEmoji : ':nerd_face:',
        });
      };
      // send test messages
      winston.info('testing slack logger...');
      winston.error('Slack "error" logging is online.');
      winston.info('Slack "info" logging is online.');
    } else {
      winston.warn('Slack logging is not enabled because no slackWebHook config var provided.');
    }
  };
};

module.exports = new SlackConfig();
