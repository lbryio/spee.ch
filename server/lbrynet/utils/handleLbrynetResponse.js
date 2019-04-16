import logger from 'winston';

export const handleLbrynetResponse = ({ data }, resolve, reject) => {
  logger.debug('lbry api data:', data);
  if (data) {
    // check for an error
    if (data.error) {
      logger.debug('Lbrynet api error:', data.error);
      reject(new Error(data.error.message));
      return;
    }
    resolve(data.result);
    return;
  }
  // fallback in case it just timed out
  reject(JSON.stringify(data));
};
