"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = {
  REGEXP_INVALID_CLAIM: /[^A-Za-z0-9-]/g,
  REGEXP_INVALID_CHANNEL: /[^A-Za-z0-9-@]/g,
  REGEXP_ADDRESS: /^b(?=[^0OIl]{32,33})[0-9A-Za-z]{32,33}$/,
  CHANNEL_CHAR: '@',
  parseIdentifier: function parseIdentifier(identifier) {
    var componentsRegex = new RegExp('([^:$#/]*)' + // value (stops at the first separator or end)
    '([:$#]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );

    var _componentsRegex$exec = componentsRegex // eslint-disable-line no-unused-vars
    .exec(identifier).map(function (match) {
      return match || null;
    }),
        _componentsRegex$exec2 = _slicedToArray(_componentsRegex$exec, 4),
        proto = _componentsRegex$exec2[0],
        value = _componentsRegex$exec2[1],
        modifierSeperator = _componentsRegex$exec2[2],
        modifier = _componentsRegex$exec2[3]; // Validate and process name


    if (!value) {
      throw new Error("Check your URL.  No channel name provided before \"".concat(modifierSeperator, "\""));
    }

    var isChannel = value.startsWith(module.exports.CHANNEL_CHAR);
    var channelName = isChannel ? value : null;
    var claimId;

    if (isChannel) {
      if (!channelName) {
        throw new Error('Check your URL.  No channel name after "@".');
      }

      var nameBadChars = channelName.match(module.exports.REGEXP_INVALID_CHANNEL);

      if (nameBadChars) {
        throw new Error("Check your URL.  Invalid characters in channel name: \"".concat(nameBadChars.join(', '), "\"."));
      }
    } else {
      claimId = value;
    } // Validate and process modifier


    var channelClaimId;

    if (modifierSeperator) {
      if (!modifier) {
        throw new Error("Check your URL.  No modifier provided after separator \"".concat(modifierSeperator, "\""));
      }

      if (modifierSeperator === ':') {
        channelClaimId = modifier;
      } else {
        throw new Error("Check your URL.  The \"".concat(modifierSeperator, "\" modifier is not currently supported"));
      }
    }

    return {
      isChannel: isChannel,
      channelName: channelName,
      channelClaimId: channelClaimId || null,
      claimId: claimId || null
    };
  },
  parseClaim: function parseClaim(name) {
    var componentsRegex = new RegExp('([^:$#/.]*)' + // name (stops at the first extension)
    '([:$#.]?)([^/]*)' // extension separator, extension (stops at the first path separator or end)
    );

    var _componentsRegex$exec3 = componentsRegex // eslint-disable-line no-unused-vars
    .exec(name).map(function (match) {
      return match || null;
    }),
        _componentsRegex$exec4 = _slicedToArray(_componentsRegex$exec3, 4),
        proto = _componentsRegex$exec4[0],
        claimName = _componentsRegex$exec4[1],
        extensionSeperator = _componentsRegex$exec4[2],
        extension = _componentsRegex$exec4[3]; // Validate and process name


    if (!claimName) {
      throw new Error('Check your URL.  No claim name provided before "."');
    }

    var nameBadChars = claimName.match(module.exports.REGEXP_INVALID_CLAIM);

    if (nameBadChars) {
      throw new Error("Check your URL.  Invalid characters in claim name: \"".concat(nameBadChars.join(', '), "\"."));
    } // Validate and process extension


    if (extensionSeperator) {
      if (!extension) {
        throw new Error("Check your URL.  No file extension provided after separator \"".concat(extensionSeperator, "\"."));
      }

      if (extensionSeperator !== '.') {
        throw new Error("Check your URL.  The \"".concat(extensionSeperator, "\" separator is not supported in the claim name."));
      }
    }

    return {
      claimName: claimName,
      extension: extension || null
    };
  }
};