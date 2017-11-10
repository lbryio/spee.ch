const config = require('./speechConfig.js');
const winstonSlackWebHook = require('winston-slack-webhook').SlackWebHook;

module.exports = (winston) => {
  if (config.logging.slackWebHook) {
    // add a transport for errors to slack
    winston.add(winstonSlackWebHook, {
      name      : 'slack-errors-transport',
      level     : 'warn',
      webhookUrl: config.logging.slackWebHook,
      channel   : config.logging.slackErrorChannel,
      username  : 'spee.ch',
      iconEmoji : ':face_with_head_bandage:',
    });
    winston.add(winstonSlackWebHook, {
      name      : 'slack-info-transport',
      level     : 'info',
      webhookUrl: config.logging.slackWebHook,
      channel   : config.logging.slackInfoChannel,
      username  : 'spee.ch',
      iconEmoji : ':nerd_face:',
    });
    // send test message
    winston.error('Slack "error" logging is online.');
    winston.warn('Slack "warning" logging is online.');
    winston.info('Slack "info" logging is online.');
  } else {
    winston.warn('Slack logging is not enabled because no SLACK_WEB_HOOK env var provided.');
  }
};
