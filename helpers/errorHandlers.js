const logger = require('winston');
const { postToStats } = require('../controllers/statsController.js');

module.exports = {
  returnErrorMessageAndStatus: function (error) {
    let status;
    let message;
    if (error.code === 'ECONNREFUSED') {
      status = 503;
      message = 'Connection refused.  The daemon may not be running.';
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
    } else {
      message = error;
    }
    return [status, message];
  },
  handleRequestError: function (action, originalUrl, ip, error, res) {
    logger.error(`Request Error on ${originalUrl}`, module.exports.useObjectPropertiesIfNoKeys(error));
    postToStats(action, originalUrl, ip, null, null, error);
    const errorStatusAndMessage = this.returnErrorMessageAndStatus(error);
    res
        .status(errorStatusAndMessage[0])
        .render('requestError', {
          status : errorStatusAndMessage[0],
          message: errorStatusAndMessage[1],
        });
  },
  handleApiError: function (action, originalUrl, ip, error, res) {
    logger.error(`Api ${action} Error on ${originalUrl}`, module.exports.useObjectPropertiesIfNoKeys(error));
    postToStats(action, originalUrl, ip, null, null, error);
    const errorStatusAndMessage = this.returnErrorMessageAndStatus(error);
    res
        .status(errorStatusAndMessage[0])
        .json({
          success: false,
          message: errorStatusAndMessage[1],
        });
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
};
