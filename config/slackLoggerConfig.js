const config = require('config');
const SLACK_WEB_HOOK = config.get('Logging.SlackWebHook');
const SLACK_ERROR_CHANNEL = config.get('Logging.SlackErrorChannel');
const SLACK_INFO_CHANNEL = config.get('Logging.SlackInfoChannel');
const winstonSlackWebHook = require('winston-slack-webhook').SlackWebHook;

module.exports = (winston) => {
  if (SLACK_WEB_HOOK) {
      // add a transport for errors to slack
    winston.add(winstonSlackWebHook, {
      name      : 'slack-errors-transport',
      level     : 'error',
      webhookUrl: SLACK_WEB_HOOK,
      channel   : SLACK_ERROR_CHANNEL,
      username  : 'spee.ch',
      iconEmoji : ':face_with_head_bandage:',
    });
    winston.add(winstonSlackWebHook, {
      name      : 'slack-info-transport',
      level     : 'info',
      webhookUrl: SLACK_WEB_HOOK,
      channel   : SLACK_INFO_CHANNEL,
      username  : 'spee.ch',
      iconEmoji : ':nerd_face:',
    });
      // send test message
    winston.error('Slack error logging is online.');
    winston.info('Slack info logging is online.');
  } else {
    winston.error('Slack logging is not enabled because no SLACK_WEB_HOOK env var provided.');
  }
};
