module.exports = {
  REGEXP_INVALID_CLAIM  : /[^A-Za-z0-9-]/g,
  REGEXP_INVALID_CHANNEL: /[^A-Za-z0-9-@]/g,
  REGEXP_ADDRESS        : /^b(?=[^0OIl]{32,33})[0-9A-Za-z]{32,33}$/,
  CHANNEL_CHAR          : '@',
  parseIdentifier       : function (identifier) {
    const componentsRegex = new RegExp(
      '([^:$#/]*)' + // value (stops at the first separator or end)
      '([:$#]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );
    const [, value, modifierSeperator, modifier] = componentsRegex
      .exec(identifier)
      .map(match => match || null);

    // Validate and process name
    if (!value) {
      throw new Error(`Check your url.  No channel name provided before "${modifierSeperator}"`);
    }
    const isChannel = value.startsWith(module.exports.CHANNEL_CHAR);
    const channelName = isChannel ? value : null;
    let claimId;
    if (isChannel) {
      if (!channelName) {
        throw new Error('No channel name after @.');
      }
      const nameBadChars = (channelName).match(module.exports.REGEXP_INVALID_CHANNEL);
      if (nameBadChars) {
        throw new Error(`Invalid characters in channel name: ${nameBadChars.join(', ')}.`);
      }
    } else {
      claimId = value;
    }

    // Validate and process modifier
    let channelClaimId;
    if (modifierSeperator) {
      if (!modifier) {
        throw new Error(`No modifier provided after separator "${modifierSeperator}"`);
      }

      if (modifierSeperator === ':') {
        channelClaimId = modifier;
      } else {
        throw new Error(`The "${modifierSeperator}" modifier is not currently supported`);
      }
    }
    return {
      isChannel,
      channelName,
      channelClaimId,
      claimId,
    };
  },
  parseClaim: function (claim) {
    const componentsRegex = new RegExp(
      '([^:$#/.]*)' + // name (stops at the first modifier)
      '([:$#.]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );
    const [, claimName, modifierSeperator, modifier] = componentsRegex
      .exec(claim)
      .map(match => match || null);

    // Validate and process name
    if (!claimName) {
      throw new Error('No claim name provided before .');
    }
    const nameBadChars = (claimName).match(module.exports.REGEXP_INVALID_CLAIM);
    if (nameBadChars) {
      throw new Error(`Invalid characters in claim name: ${nameBadChars.join(', ')}.`);
    }
    // Validate and process modifier
    if (modifierSeperator) {
      if (!modifier) {
        throw new Error(`No file extension provided after separator ${modifierSeperator}.`);
      }
      if (modifierSeperator !== '.') {
        throw new Error(`The ${modifierSeperator} modifier is not supported in the claim name`);
      }
    }
    // return results
    return {
      claimName,
      extension: modifier || null,
    };
  },
  parseModifier: function (claim) {
    const componentsRegex = new RegExp(
      '([^:$#/.]*)' + // name (stops at the first modifier)
      '([:$#.]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );
    const [ , , modifierSeperator ] = componentsRegex
      .exec(claim)
      .map(match => match || null);

    // Validate and process modifier
    let hasFileExtension = false;
    if (modifierSeperator) {
      hasFileExtension = true;
    }
    return {
      hasFileExtension,
    };
  },
};
