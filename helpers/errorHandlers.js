const logger = require('winston');

module.exports = {
  returnErrorMessageAndStatus: function (error) {
    let status, message;
    // check for daemon being turned off
    if (error.code === 'ECONNREFUSED') {
      status = 200;
      message = 'Connection refused.  The daemon may not be running.';
    // check for thrown errors
    } else if (error.message) {
      status = 200;
      message = error.message;
    // fallback for everything else
    } else {
      status = 400;
      message = error;
    }
    return [status, message];
  },
  handleRequestError: function (originalUrl, ip, error, res) {
    logger.error(`Request Error on ${originalUrl}`, module.exports.useObjectPropertiesIfNoKeys(error));
    const [status, message] = module.exports.returnErrorMessageAndStatus(error);
    res
      .status(status)
      .render('requestError', module.exports.createErrorResponsePayload(status, message));
  },
  handleApiError: function (originalUrl, ip, error, res) {
    logger.error(`Api Error on ${originalUrl}`, module.exports.useObjectPropertiesIfNoKeys(error));
    const [status, message] = module.exports.returnErrorMessageAndStatus(error);
    res
      .status(status)
      .json(module.exports.createErrorResponsePayload(status, message));
  },
  useObjectPropertiesIfNoKeys: function (err) {
    if (Object.keys(err).length === 0) {
      let newErrorObject = {};
      Object.getOwnPropertyNames(err).forEach((key) => {
        newErrorObject[key] = err[key];
      });
      return newErrorObject;
    }
    return err;
  },
  createErrorResponsePayload (status, message) {
    return {
      status,
      success: false,
      message,
    };
  },
};
