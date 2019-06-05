const httpContext = require('express-http-context');

function setRouteDataInContextMiddleware(routePath, routeData) {
  return function(req, res, next) {
    httpContext.set('routePath', routePath);
    httpContext.set('routeData', routeData);
    next();
  };
}

module.exports = {
  setRouteDataInContextMiddleware,
};
