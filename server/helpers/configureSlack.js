const winstonSlackWebHook = require('winston-slack-webhook').SlackWebHook;
const slackConfig = require('../../devConfig/slackConfig.js');

module.exports = (winston) => {
  const {slackWebHook, slackErrorChannel, slackInfoChannel} = slackConfig;
  if (slackWebHook) {
    // add a transport for errors to slack
    if (slackErrorChannel) {
      winston.add(winstonSlackWebHook, {
        name      : 'slack-errors-transport',
        level     : 'warn',
        webhookUrl: slackWebHook,
        channel   : slackErrorChannel,
        username  : 'spee.ch',
        iconEmoji : ':face_with_head_bandage:',
      });
    };
    if (slackInfoChannel) {
      winston.add(winstonSlackWebHook, {
        name      : 'slack-info-transport',
        level     : 'info',
        webhookUrl: slackWebHook,
        channel   : slackInfoChannel,
        username  : 'spee.ch',
        iconEmoji : ':nerd_face:',
      });
    };
    // send test message
    winston.error('Slack "error" logging is online.');
    winston.info('Slack "info" logging is online.');
  } else {
    winston.warn('Slack logging is not enabled because no slackWebHook config var provided.');
  }
};
