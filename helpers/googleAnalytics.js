const logger = require('winston');
const ua = require('universal-analytics');
const config = require('../config/speechConfig.js');
const googleApiKey = config.analytics.googleId;

function createServeEventParams (headers, ip, originalUrl) {
  return {
    eventCategory    : 'client requests',
    eventAction      : 'serve request',
    eventLabel       : originalUrl,
    ipOverride       : ip,
    userAgentOverride: headers['user-agent'],
  };
};

function createPublishTimingEventParams (label, startTime, endTime, ip, headers) {
  const durration = endTime - startTime;
  return {
    userTimingCategory    : 'lbrynet',
    userTimingVariableName: 'publish',
    userTimingTime        : durration,
    userTimingLabel       : label,
    uip                   : ip,
    userAgentOverride     : headers['user-agent'],
  };
};

function sendGoogleAnalyticsEvent (ip, params) {
  const visitorId = ip.replace(/\./g, '-');
  const visitor = ua(googleApiKey, visitorId, { strictCidFormat: false, https: true });
  visitor.event(params, (err) => {
    if (err) {
      logger.error('Google Analytics Event Error >>', err);
    }
  });
};

function sendGoogleAnalyticsTiming (ip, params) {
  const visitorId = ip.replace(/\./g, '-');
  const visitor = ua(googleApiKey, visitorId, { strictCidFormat: false, https: true });
  visitor.timing(params, (err) => {
    if (err) {
      logger.error('Google Analytics Event Error >>', err);
    }
    logger.debug(`Timing event successfully sent to google analytics`);
  });
};

module.exports = {
  sendGAServeEvent (headers, ip, originalUrl) {
    const params = createServeEventParams(headers, ip, originalUrl);
    sendGoogleAnalyticsEvent(ip, params);
  },
  sendGAAnonymousPublishTiming (headers, ip, originalUrl, startTime, endTime) {
    const params = createPublishTimingEventParams('PUBLISH_ANONYMOUS_CLAIM', startTime, endTime, ip, headers);
    sendGoogleAnalyticsTiming(ip, params);
  },
  sendGAChannelPublishTiming (headers, ip, originalUrl, startTime, endTime) {
    const params = createPublishTimingEventParams('PUBLISH_IN_CHANNEL_CLAIM', startTime, endTime, ip, headers);
    sendGoogleAnalyticsTiming(ip, params);
  },
};
