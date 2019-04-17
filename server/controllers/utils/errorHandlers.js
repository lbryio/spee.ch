import logger from 'winston';

export function handleErrorResponse(originalUrl, ip, error, res) {
  logger.error(`Error on ${originalUrl}`, useObjectPropertiesIfNoKeys(error));
  const [status, message] = returnErrorMessageAndStatus(error);
  res.status(status).json(createErrorResponsePayload(status, message));
}

export function returnErrorMessageAndStatus(error) {
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
    }
  }
  return [status, message];
}

export function useObjectPropertiesIfNoKeys(err) {
  if (Object.keys(err).length === 0) {
    let newErrorObject = {};
    Object.getOwnPropertyNames(err).forEach(key => {
      newErrorObject[key] = err[key];
    });
    return newErrorObject;
  }
  return err;
}

function createErrorResponsePayload(status, message) {
  return {
    status,
    success: false,
    message,
  };
}
