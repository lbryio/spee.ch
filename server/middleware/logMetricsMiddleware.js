const logger = require('winston');
const db = require('../models');
const httpContext = require('express-http-context');

function logMetricsMiddleware(req, res, next) {
  res.on('finish', () => {
    const userAgent = req.get('user-agent');
    const routePath = httpContext.get('routePath');

    let referrer = req.get('referrer');

    if(referrer && referrer.length > 255) {
      // Attempt to "safely" clamp long URLs
      referrer = /(.*?)#.*/.exec(referrer)[1];

      if(referrer.length > 255) {
        logger.warn('Request refferer exceeds 255 characters:', referrer);
        referrer = referrer.substring(0, 255);
      }
    }

    db.Metrics.create({
      time: Date.now(),
      isInternal: /node\-fetch/.test(userAgent),
      isChannel: res.isChannel,
      claimId: res.claimId,
      routePath: httpContext.get('routePath'),
      params: JSON.stringify(req.params),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      request: req.url,
      routeData: JSON.stringify(httpContext.get('routeData')),
      referrer,
      userAgent,
    });
  });

  next();
}

function setRouteDataInContextMiddleware(routePath, routeData) {
  return function (req, res, next) {
    httpContext.set('routePath', routePath);
    httpContext.set('routeData', routeData);
    next();
  };
}

module.exports = {
  logMetricsMiddleware,
  setRouteDataInContextMiddleware,
};
