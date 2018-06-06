const winstonSlackWebHook = require('winston-slack-webhook').SlackWebHook;
const logger = require('winston');

const config = require('@config/loggerConfig');

function configureSlack () {
  if (!config) {
    return logger.warn('No slack config found');
  }
  const {slackWebHook, slackErrorChannel, slackInfoChannel} = config;
  // update variables
  logger.info('configuring slack logger...');

  // update slack webhook settings
  if (!slackWebHook) {
    return logger.warn('Slack logging is not enabled because no slackWebHook config var provided.');
  }
  // add a transport for errors to slack
  if (slackErrorChannel) {
    logger.add(winstonSlackWebHook, {
      name      : 'slack-errors-transport',
      level     : 'warn',
      webhookUrl: slackWebHook,
      channel   : slackErrorChannel,
      username  : 'spee.ch',
      iconEmoji : ':face_with_head_bandage:',
    });
  }
  // add a transport for info in slack
  if (slackInfoChannel) {
    logger.add(winstonSlackWebHook, {
      name      : 'slack-info-transport',
      level     : 'info',
      webhookUrl: slackWebHook,
      channel   : slackInfoChannel,
      username  : 'spee.ch',
      iconEmoji : ':nerd_face:',
    });
  }
  // send test messages
  logger.info('Slack logging is online.');
}

module.exports = configureSlack;
