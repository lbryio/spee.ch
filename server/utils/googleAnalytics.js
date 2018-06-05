const logger = require('winston');
const ua = require('universal-analytics');
const { analytics : { googleId }, details: { title } } = require('../../config/siteConfig.js');

const createServeEventParams = (headers, ip, originalUrl) => {
  return {
    eventCategory    : 'client requests',
    eventAction      : 'serve request',
    eventLabel       : originalUrl,
    ipOverride       : ip,
    userAgentOverride: headers['user-agent'],
    documentReferrer : headers['referer'],
  };
};

const createPublishTimingEventParams = (category, variable, label, startTime, endTime) => {
  const duration = endTime - startTime;
  return {
    userTimingCategory    : category,
    userTimingVariableName: variable,
    userTimingTime        : duration,
    userTimingLabel       : label,
  };
};

const sendGoogleAnalyticsEvent = (ip, params) => {
  const visitorId = ip.replace(/\./g, '-');
  const visitor = ua(googleId, visitorId, { strictCidFormat: false, https: true });
  visitor.event(params, (err) => {
    if (err) {
      return logger.error('Google Analytics Event Error >>', err);
    }
    logger.debug(`Event successfully sent to google analytics`);
  });
};

const sendGoogleAnalyticsTiming = (visitorId, params) => {
  const visitor = ua(googleId, visitorId, { strictCidFormat: false, https: true });
  visitor.timing(params, (err) => {
    if (err) {
      return logger.error('Google Analytics Event Error >>', err);
    }
    logger.debug(`Timing event successfully sent to google analytics`);
  });
};

const sendGAServeEvent = (headers, ip, originalUrl) => {
  const params = createServeEventParams(headers, ip, originalUrl);
  sendGoogleAnalyticsEvent(ip, params);
};

const sendGATimingEvent = (category, variable, label, startTime, endTime) => {
  const params = createPublishTimingEventParams(category, variable, label, startTime, endTime);
  sendGoogleAnalyticsTiming(title, params);
};

const chooseGaLbrynetPublishLabel = ({ channel_name: channelName, channel_id: channelId }) => {
  return (channelName || channelId ? 'PUBLISH_IN_CHANNEL_CLAIM' : 'PUBLISH_ANONYMOUS_CLAIM');
};

module.exports = {
  sendGAServeEvent,
  sendGATimingEvent,
  chooseGaLbrynetPublishLabel,
};
