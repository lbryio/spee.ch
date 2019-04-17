import checkChannelAvailability from './checkChannelAvailability.js';
import { sendGATimingEvent } from '@serverutils/googleAnalytics.js';
import { handleErrorResponse } from '../../../utils/errorHandlers.js';

/*

  route to check whether site has published to a channel

*/

function addAtSymbolIfNecessary(name) {
  if (name.substring(0, 1) !== '@') {
    return `@${name}`;
  }
  return name;
}

const channelAvailability = ({ ip, originalUrl, params: { name } }, res) => {
  const gaStartTime = Date.now();
  name = addAtSymbolIfNecessary(name);
  checkChannelAvailability(name)
    .then(isAvailable => {
      let responseObject = {
        success: true,
        data: isAvailable,
      };
      if (isAvailable) {
        responseObject['message'] = `${name} is available`;
      } else {
        responseObject['message'] = `${name} is already in use`;
      }
      res.status(200).json(responseObject);
      sendGATimingEvent('end-to-end', 'channel name availability', name, gaStartTime, Date.now());
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

export default channelAvailability;
