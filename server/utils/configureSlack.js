const winstonSlackWebHook = require('winston-slack-webhook').SlackWebHook;
const logger = require('winston');

const config = require('@config/slackConfig');
const {slackWebHook, slackErrorChannel, slackInfoChannel} = config;

function configureSlack () {
  logger.info('configuring slack logger...');
  if (!config) {
    return logger.warn('No slack config found');
  }
  // update slack webhook settings
  if (!slackWebHook) {
    return logger.info('Slack logging is not enabled because no slackWebHook config var provided.');
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
  } else {
    logger.warn('No slack error channel logging set up');
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
  } else {
    logger.warn('No slack info channel logging set up');
  }
  // send test messages
  logger.info('Slack logging is online.');
}

module.exports = configureSlack;
