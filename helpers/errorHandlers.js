const logger = require('winston');

module.exports = {
  handleErrorResponse: function (originalUrl, ip, error, res) {
    logger.error(`Error on ${originalUrl}`, module.exports.useObjectPropertiesIfNoKeys(error));
    const [status, message] = module.exports.returnErrorMessageAndStatus(error);
    res
      .status(status)
      .json(module.exports.createErrorResponsePayload(status, message));
  },
  returnErrorMessageAndStatus: function (error) {
    let status, message;
    // check for daemon being turned off
    if (error.code === 'ECONNREFUSED') {
      status = 503;
      message = 'Connection refused.  The daemon may not be running.';
      // fallback for everything else
    } else {
      status = 400;
      if (error.message) {
        message = error.message;
      } else {
        message = error;
      };
    };
    return [status, message];
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
