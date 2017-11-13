const logger = require('winston');
const { postToStats } = require('../controllers/statsController.js');

module.exports = {
  returnErrorMessageAndStatus: function (error) {
    let status, message;
    // check for daemon being turned off
    if (error.code === 'ECONNREFUSED') {
      status = 503;
      message = 'Connection refused.  The daemon may not be running.';
    // check for errors from the deamon
    } else if (error.response) {
      status = error.response.status || 500;
      if (error.response.data) {
        if (error.response.data.message) {
          message = error.response.data.message;
        } else if (error.response.data.error) {
          message = error.response.data.error.message;
        } else {
          message = error.response.data;
        }
      } else {
        message = error.response;
      }
    // check for spee.ch thrown errors
    } else if (error.message) {
      status = 400;
      message = error.message;
    // fallback for everything else
    } else {
      status = 400;
      message = error;
    }
    return [status, message];
  },
  handleRequestError: function (action, originalUrl, ip, error, res) {
    logger.error(`Request Error on ${originalUrl}`, module.exports.useObjectPropertiesIfNoKeys(error));
    postToStats(action, originalUrl, ip, null, null, error);
    const [status, message] = this.returnErrorMessageAndStatus(error);
    res
      .status(status)
      .render('requestError', this.createErrorResponsePayload(status, message));
  },
  handleApiError: function (action, originalUrl, ip, error, res) {
    logger.error(`Api ${action} Error on ${originalUrl}`, module.exports.useObjectPropertiesIfNoKeys(error));
    postToStats(action, originalUrl, ip, null, null, error);
    const [status, message] = this.returnErrorMessageAndStatus(error);
    res
      .status(status)
      .json(this.createErrorResponsePayload(status, message));
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
