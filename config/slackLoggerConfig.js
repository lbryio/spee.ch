const config = require('config');
const SLACK_WEB_HOOK = config.get('Logging.SlackWebHook');

const winstonSlackWebHook = require('winston-slack-webhook').SlackWebHook;

module.exports = (winston) => {
  // add a transport for errors
  winston.add(winstonSlackWebHook, {
    name      : 'slack-errors-transport',
    level     : 'error',
    webhookUrl: SLACK_WEB_HOOK,
    channel   : '#speech-errors',
    username  : 'errorBot',
    iconEmoji : ':face_with_head_bandage:',
  });
  winston.add(winstonSlackWebHook, {
    name      : 'slack-info-transport',
    level     : 'info',
    webhookUrl: SLACK_WEB_HOOK,
    channel   : '#speech-logs',
    username  : 'infoBot',
    iconEmoji : ':nerd_face:',
  });
  // send test message
  winston.error('Testing slack logging... slack logging is online.');
};
