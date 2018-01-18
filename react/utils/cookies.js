const CHANNEL_NAME = 'CHANNEL_NAME';
const CHANNEL_SHORT_ID = 'CHANNEL_SHORT_ID';
const CHANNEL_LONG_ID = 'CHANNEL_LONG_ID';

module.exports = {
  setCookie (key, value) {
    document.cookie = `${key}=${value}`;
  },
  getCookie (cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },
  clearCookie (name) {
    document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;`;
  },
  setUserCookies (channelName, shortChannelId, channelClaimId) {
    module.exports.setCookie('CHANNEL_NAME', channelName);
    module.exports.setCookie('CHANNEL_SHORT_ID', shortChannelId);
    module.exports.setCookie('CHANNEL_LONG_ID', channelClaimId);
  },
  clearUserCookies () {
    module.exports.clearCookie('CHANNEL_NAME');
    module.exports.clearCookie('CHANNEL_SHORT_ID');
    module.exports.clearCookie('CHANNEL_LONG_ID');
  },
  getUserCookies () {
    return {
      channelName   : module.exports.getCookie('CHANNEL_NAME'),
      channelShortId: module.exports.getCookie('CHANNEL_SHORT_ID'),
      channelLongId : module.exports.getCookie('CHANNEL_LONG_ID'),
    };
  },
};
