module.exports = {
  REGEXP_INVALID_CLAIM  : /[^A-Za-z0-9-]/g,
  REGEXP_INVALID_CHANNEL: /[^A-Za-z0-9-@]/g,
  REGEXP_ADDRESS        : /^b(?=[^0OIl]{32,33})[0-9A-Za-z]{32,33}$/,
  CHANNEL_CHAR          : '@',
  parseIdentifier       : function (identifier) {
    console.log('parsing identifier:', identifier);
    const componentsRegex = new RegExp(
      '([^:$#/]*)' + // value (stops at the first separator or end)
      '([:$#]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );
    const [proto, value, modifierSeperator, modifier] = componentsRegex
      .exec(identifier)
      .map(match => match || null);
    console.log(`${proto}, ${value}, ${modifierSeperator}, ${modifier}`);

    // Validate and process name
    if (!value) {
      throw new Error(`Check your URL.  No channel name provided before "${modifierSeperator}"`);
    }
    const isChannel = value.startsWith(module.exports.CHANNEL_CHAR);
    const channelName = isChannel ? value : null;
    let claimId;
    if (isChannel) {
      if (!channelName) {
        throw new Error('Check your URL.  No channel name after "@".');
      }
      const nameBadChars = (channelName).match(module.exports.REGEXP_INVALID_CHANNEL);
      if (nameBadChars) {
        throw new Error(`Check your URL.  Invalid characters in channel name: "${nameBadChars.join(', ')}".`);
      }
    } else {
      claimId = value;
    }

    // Validate and process modifier
    let channelClaimId;
    if (modifierSeperator) {
      if (!modifier) {
        throw new Error(`Check your URL.  No modifier provided after separator "${modifierSeperator}"`);
      }

      if (modifierSeperator === ':') {
        channelClaimId = modifier;
      } else {
        throw new Error(`Check your URL.  The "${modifierSeperator}" modifier is not currently supported`);
      }
    }
    return {
      isChannel,
      channelName,
      channelClaimId,
      claimId,
    };
  },
  parseClaim: function (name) {
    console.log('parsing name:', name);
    const componentsRegex = new RegExp(
      '([^:$#/.]*)' + // name (stops at the first modifier)
      '([:$#.]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );
    const [proto, claimName, modifierSeperator, modifier] = componentsRegex
      .exec(name)
      .map(match => match || null);
    console.log(`${proto}, ${claimName}, ${modifierSeperator}, ${modifier}`);

    // Validate and process name
    if (!claimName) {
      throw new Error('Check your URL.  No claim name provided before "."');
    }
    const nameBadChars = (claimName).match(module.exports.REGEXP_INVALID_CLAIM);
    if (nameBadChars) {
      throw new Error(`Check your URL.  Invalid characters in claim name: "${nameBadChars.join(', ')}".`);
    }
    // Validate and process modifier
    let isServeRequest = false;
    if (modifierSeperator) {
      if (!modifier) {
        throw new Error(`Check your URL.  No file extension provided after separator "${modifierSeperator}".`);
      }
      if (modifierSeperator !== '.') {
        throw new Error(`Check your URL.  The "${modifierSeperator}" modifier is not supported in the claim name.`);
      }
      isServeRequest = true;
    }
    return {
      claimName,
      isServeRequest,
    };
  },
};
