import logger from 'winston';
import ua from 'universal-analytics';
import { analytics, details } from '@config/siteConfig';

const { googleId } = analytics;
const { title } = details;

const createServeEventParams = (headers, ip, originalUrl) => {
  return {
    eventCategory: 'client requests',
    eventAction: 'serve request',
    eventLabel: originalUrl,
    ipOverride: ip,
    userAgentOverride: headers['user-agent'],
    documentReferrer: headers['referer'],
  };
};

const createTimingEventParams = (category, variable, label, startTime, endTime) => {
  const duration = endTime - startTime;
  return {
    userTimingCategory: category,
    userTimingVariableName: variable,
    userTimingTime: duration,
    userTimingLabel: label,
  };
};

const sendGoogleAnalyticsEvent = (ip, params) => {
  if (!googleId) {
    return logger.debug('Skipping analytics event because no GoogleId present in configs');
  }
  const visitorId = ip.replace(/\./g, '-');
  const visitor = ua(googleId, visitorId, { strictCidFormat: false, https: true });
  visitor.event(params, err => {
    if (err) {
      return logger.error('Google Analytics Event Error >>', err);
    }
    logger.debug(`Event successfully sent to google analytics`, params);
  });
};

const sendGoogleAnalyticsTiming = (siteTitle, params) => {
  if (!googleId) {
    return logger.debug('Skipping analytics timing because no GoogleId present in configs');
  }
  const visitor = ua(googleId, siteTitle, { strictCidFormat: false, https: true });
  visitor.timing(params, err => {
    if (err) {
      return logger.error('Google Analytics Event Error >>', err);
    }
    logger.debug(`Event successfully sent to google analytics`, params);
  });
};

export const sendGAServeEvent = (headers, ip, originalUrl) => {
  const params = createServeEventParams(headers, ip, originalUrl);
  sendGoogleAnalyticsEvent(ip, params);
};

export const sendGATimingEvent = (category, variable, label, startTime, endTime) => {
  const params = createTimingEventParams(category, variable, label, startTime, endTime);
  sendGoogleAnalyticsTiming(title, params);
};

export const chooseGaLbrynetPublishLabel = ({
  channel_name: channelName,
  channel_id: channelId,
}) => {
  return channelName || channelId ? 'PUBLISH_IN_CHANNEL_CLAIM' : 'PUBLISH_ANONYMOUS_CLAIM';
};
