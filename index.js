module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function SiteConfig() {
  var _this = this;

  this.analytics = {
    googleId: 'default'
  };
  this.assetDefaults = {
    description: 'An asset published on Spee.ch',
    thumbnail: 'https://spee.ch/assets/img/video_thumb_default.png',
    title: 'Spee.ch'
  };
  this.auth = {
    sessionKey: 'default'
  };
  this.customComponents = {
    components: {},
    containers: {},
    pages: {}
  };
  this.details = {
    description: 'Open-source, decentralized image and video sharing.',
    host: 'default',
    port: 3000,
    title: 'Spee.ch',
    twitter: '@spee_ch'
  };
  this.publishing = {
    additionalClaimAddresses: [],
    disabled: false,
    disabledMessage: 'Please check back soon.',
    primaryClaimAddress: 'default',
    thumbnailChannel: 'default',
    thumbnailChannelId: 'default',
    uploadDirectory: '/home/lbry/Uploads'
  };
  this.configure = function (config) {
    if (!config) {
      return console.log('No site config received.');
    }
    var analytics = config.analytics,
        assetDefaults = config.assetDefaults,
        auth = config.auth,
        customComponents = config.customComponents,
        details = config.details,
        publishing = config.publishing;

    _this.analytics = analytics;
    _this.assetDefaults = assetDefaults;
    _this.auth = auth;
    _this.details = details;
    _this.publishing = publishing;
    _this.customComponents = customComponents;
  };
};

module.exports = new SiteConfig();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function mysql() {
  var _this = this;

  this.db = {};
  this.configure = function (db) {
    if (!db) {
      return console.log('No MySQL config received.');
    }
    // configure credentials
    console.log('configuring mysql...');
    _this.db = db;
  };
};

module.exports = new mysql();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  returnShortId: function returnShortId(claimsArray, longId) {
    var claimIndex = void 0;
    var shortId = longId.substring(0, 1); // default short id is the first letter
    var shortIdLength = 0;
    // find the index of this claim id
    claimIndex = claimsArray.findIndex(function (element) {
      return element.claimId === longId;
    });
    if (claimIndex < 0) {
      throw new Error('claim id not found in claims list');
    }
    // get an array of all claims with lower height
    var possibleMatches = claimsArray.slice(0, claimIndex);
    // remove certificates with the same prefixes until none are left.
    while (possibleMatches.length > 0) {
      shortIdLength += 1;
      shortId = longId.substring(0, shortIdLength);
      possibleMatches = possibleMatches.filter(function (element) {
        return element.claimId && element.claimId.substring(0, shortIdLength) === shortId;
      });
    }
    return shortId;
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apiRoutes = __webpack_require__(9);
var logger = __webpack_require__(12);
var mysql = __webpack_require__(2);
var site = __webpack_require__(1);
var slack = __webpack_require__(13);
var passport = __webpack_require__(15);
var models = __webpack_require__(25);
// const Components = require('./client/components');

var _exports = {
  apiRoutes: apiRoutes,
  logger: logger,
  mysql: mysql,
  site: site,
  slack: slack,
  passport: passport,
  models: models
  // Components,
};

module.exports = _exports;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var channelShortId = __webpack_require__(10);

module.exports = {
  channelShortId: channelShortId
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
// const { details: { host } } = require('siteConfig.js');
// const { db } = require('mysqlConfig.js');

var _require = __webpack_require__(11),
    handleErrorResponse = _require.handleErrorResponse;

/*

route to get a short channel id from long channel Id

*/

var channelShortIdRoute = function channelShortIdRoute(db, host) {
  return function (_ref, res) {
    var ip = _ref.ip,
        originalUrl = _ref.originalUrl,
        params = _ref.params;

    console.log('hello from channelShortIdRoute');
    logger.debug('host:', host);
    db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name).then(function (shortId) {
      res.status(200).json(shortId);
    }).catch(function (error) {
      handleErrorResponse(originalUrl, ip, error, res);
    });
  };
};

module.exports = channelShortIdRoute;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(0);

module.exports = {
  handleErrorResponse: function handleErrorResponse(originalUrl, ip, error, res) {
    logger.error('Error on ' + originalUrl, module.exports.useObjectPropertiesIfNoKeys(error));

    var _module$exports$retur = module.exports.returnErrorMessageAndStatus(error),
        _module$exports$retur2 = _slicedToArray(_module$exports$retur, 2),
        status = _module$exports$retur2[0],
        message = _module$exports$retur2[1];

    res.status(status).json(module.exports.createErrorResponsePayload(status, message));
  },
  returnErrorMessageAndStatus: function returnErrorMessageAndStatus(error) {
    var status = void 0,
        message = void 0;
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
  useObjectPropertiesIfNoKeys: function useObjectPropertiesIfNoKeys(err) {
    if (Object.keys(err).length === 0) {
      var newErrorObject = {};
      Object.getOwnPropertyNames(err).forEach(function (key) {
        newErrorObject[key] = err[key];
      });
      return newErrorObject;
    }
    return err;
  },
  createErrorResponsePayload: function createErrorResponsePayload(status, message) {
    return {
      status: status,
      success: false,
      message: message
    };
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

function LoggerConfig() {
  var _this = this;

  this.logLevel = 'debug';
  this.configure = function (config) {
    if (!config) {
      return console.log('No logger config received.');
    }
    console.log('configuring winston logger...');
    // update values with local config params
    var logLevel = config.logLevel;

    _this.logLevel = logLevel;
    // configure the winston logger
    logger.configure({
      transports: [new logger.transports.Console({
        level: _this.logLevel,
        timestamp: false,
        colorize: true,
        prettyPrint: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
      })]
    });
    // test all the log levels
    console.log('testing winston log levels...');
    logger.error('Level 0');
    logger.warn('Level 1');
    logger.info('Level 2');
    logger.verbose('Level 3');
    logger.debug('Level 4');
    logger.silly('Level 5');
  };
};

module.exports = new LoggerConfig();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(14).SlackWebHook;
var winston = __webpack_require__(0);

function SlackConfig() {
  var _this = this;

  this.slackWebHook = 'default';
  this.slackErrorChannel = 'default';
  this.slackInfoChannel = 'default';
  this.configure = function (config) {
    if (!config) {
      return console.log('no slack config received');
    }
    // update variables
    console.log('configuring slack logger...');
    var slackWebHook = config.slackWebHook,
        slackErrorChannel = config.slackErrorChannel,
        slackInfoChannel = config.slackInfoChannel;

    _this.slackWebHook = slackWebHook;
    _this.slackErrorChannel = slackErrorChannel;
    _this.slackInfoChannel = slackInfoChannel;
    // update slack webhook settings
    if (_this.slackWebHook) {
      // add a transport for errors to slack
      if (_this.slackErrorChannel) {
        winston.add(winstonSlackWebHook, {
          name: 'slack-errors-transport',
          level: 'warn',
          webhookUrl: _this.slackWebHook,
          channel: _this.slackErrorChannel,
          username: 'spee.ch',
          iconEmoji: ':face_with_head_bandage:'
        });
      };
      if (slackInfoChannel) {
        winston.add(winstonSlackWebHook, {
          name: 'slack-info-transport',
          level: 'info',
          webhookUrl: _this.slackWebHook,
          channel: _this.slackInfoChannel,
          username: 'spee.ch',
          iconEmoji: ':nerd_face:'
        });
      };
      // send test messages
      console.log('testing slack logger...');
      winston.error('Slack "error" logging is online.');
      winston.info('Slack "info" logging is online.');
    } else {
      winston.warn('Slack logging is not enabled because no slackWebHook config var provided.');
    }
  };
};

module.exports = new SlackConfig();

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(16);
var localLoginStrategy = __webpack_require__(17);
var localSignupStrategy = __webpack_require__(18);

var _require = __webpack_require__(24),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

passport.deserializeUser(deserializeSpeechUser);
passport.serializeUser(serializeSpeechUser);
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

module.exports = passport;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(3).Strategy;
var logger = __webpack_require__(0);

var _require = __webpack_require__(2),
    db = _require.db;

var returnUserAndChannelInfo = function returnUserAndChannelInfo(userInstance) {
  return new Promise(function (resolve, reject) {
    var userInfo = {};
    userInfo['id'] = userInstance.id;
    userInfo['userName'] = userInstance.userName;
    userInstance.getChannel().then(function (_ref) {
      var channelName = _ref.channelName,
          channelClaimId = _ref.channelClaimId;

      userInfo['channelName'] = channelName;
      userInfo['channelClaimId'] = channelClaimId;
      return db.Certificate.getShortChannelIdFromLongChannelId(channelClaimId, channelName);
    }).then(function (shortChannelId) {
      userInfo['shortChannelId'] = shortChannelId;
      resolve(userInfo);
    }).catch(function (error) {
      reject(error);
    });
  });
};

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, done) {
  return db.User.findOne({
    where: { userName: username }
  }).then(function (user) {
    if (!user) {
      logger.debug('no user found');
      return done(null, false, { message: 'Incorrect username or password' });
    }
    return user.comparePassword(password).then(function (isMatch) {
      if (!isMatch) {
        logger.debug('incorrect password');
        return done(null, false, { message: 'Incorrect username or password' });
      }
      logger.debug('Password was a match, returning User');
      return returnUserAndChannelInfo(user).then(function (userInfo) {
        return done(null, userInfo);
      }).catch(function (error) {
        return error;
      });
    }).catch(function (error) {
      return error;
    });
  }).catch(function (error) {
    return done(error);
  });
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(3).Strategy;
var lbryApi = __webpack_require__(19);
var logger = __webpack_require__(0);

var _require = __webpack_require__(2),
    db = _require.db;

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, done) {
  logger.verbose('new channel signup request. user: ' + username + ' pass: ' + password + ' .');
  var userInfo = {};
  // server-side validaton of inputs (username, password)

  // create the channel and retrieve the metadata
  return lbryApi.createChannel('@' + username).then(function (tx) {
    // create user record
    var userData = {
      userName: username,
      password: password
    };
    logger.verbose('userData >', userData);
    // create user record
    var channelData = {
      channelName: '@' + username,
      channelClaimId: tx.claim_id
    };
    logger.verbose('channelData >', channelData);
    // create certificate record
    var certificateData = {
      claimId: tx.claim_id,
      name: '@' + username
      // address,
    };
    logger.verbose('certificateData >', certificateData);
    // save user and certificate to db
    return Promise.all([db.User.create(userData), db.Channel.create(channelData), db.Certificate.create(certificateData)]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        newUser = _ref2[0],
        newChannel = _ref2[1],
        newCertificate = _ref2[2];

    logger.verbose('user and certificate successfully created');
    // store the relevant newUser info to be passed back for req.User
    userInfo['id'] = newUser.id;
    userInfo['userName'] = newUser.userName;
    userInfo['channelName'] = newChannel.channelName;
    userInfo['channelClaimId'] = newChannel.channelClaimId;
    // associate the instances
    return Promise.all([newCertificate.setChannel(newChannel), newChannel.setUser(newUser)]);
  }).then(function () {
    logger.verbose('user and certificate successfully associated');
    return db.Certificate.getShortChannelIdFromLongChannelId(userInfo.channelClaimId, userInfo.channelName);
  }).then(function (shortChannelId) {
    userInfo['shortChannelId'] = shortChannelId;
    return done(null, userInfo);
  }).catch(function (error) {
    logger.error('signup error', error);
    return done(error);
  });
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(20);
var logger = __webpack_require__(0);

var _require = __webpack_require__(21),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(22),
    chooseGaLbrynetPublishLabel = _require2.chooseGaLbrynetPublishLabel,
    sendGATimingEvent = _require2.sendGATimingEvent;

var handleLbrynetResponse = function handleLbrynetResponse(_ref, resolve, reject) {
  var data = _ref.data;

  logger.debug('lbry api data:', data);
  if (data.result) {
    // check for an error
    if (data.result.error) {
      logger.debug('Lbrynet api error:', data.result.error);
      reject(new Error(data.result.error));
      return;
    };
    resolve(data.result);
    return;
  }
  // fallback in case it just timed out
  reject(JSON.stringify(data));
};

module.exports = {
  publishClaim: function publishClaim(publishParams) {
    logger.debug('lbryApi >> Publishing claim to "' + publishParams.name + '"');
    var gaStartTime = Date.now();
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'publish',
        params: publishParams
      }).then(function (response) {
        sendGATimingEvent('lbrynet', 'publish', chooseGaLbrynetPublishLabel(publishParams), gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getClaim: function getClaim(uri) {
    logger.debug('lbryApi >> Getting Claim for "' + uri + '"');
    var gaStartTime = Date.now();
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'get',
        params: { uri: uri, timeout: 20 }
      }).then(function (response) {
        sendGATimingEvent('lbrynet', 'getClaim', 'GET', gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getClaimList: function getClaimList(claimName) {
    logger.debug('lbryApi >> Getting claim_list for "' + claimName + '"');
    var gaStartTime = Date.now();
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'claim_list',
        params: { name: claimName }
      }).then(function (response) {
        sendGATimingEvent('lbrynet', 'getClaimList', 'CLAIM_LIST', gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  resolveUri: function resolveUri(uri) {
    logger.debug('lbryApi >> Resolving URI for "' + uri + '"');
    var gaStartTime = Date.now();
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'resolve',
        params: { uri: uri }
      }).then(function (_ref2) {
        var data = _ref2.data;

        sendGATimingEvent('lbrynet', 'resolveUri', 'RESOLVE', gaStartTime, Date.now());
        if (data.result[uri].error) {
          // check for errors
          reject(data.result[uri].error);
        } else {
          // if no errors, resolve
          resolve(data.result[uri]);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getDownloadDirectory: function getDownloadDirectory() {
    logger.debug('lbryApi >> Retrieving the download directory path from lbry daemon...');
    var gaStartTime = Date.now();
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'settings_get'
      }).then(function (_ref3) {
        var data = _ref3.data;

        sendGATimingEvent('lbrynet', 'getDownloadDirectory', 'SETTINGS_GET', gaStartTime, Date.now());
        if (data.result) {
          resolve(data.result.download_directory);
        } else {
          return new Error('Successfully connected to lbry daemon, but unable to retrieve the download directory.');
        }
      }).catch(function (error) {
        logger.error('Lbrynet Error:', error);
        resolve('/home/lbry/Downloads/');
      });
    });
  },
  createChannel: function createChannel(name) {
    logger.debug('lbryApi >> Creating channel for ' + name + '...');
    var gaStartTime = Date.now();
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'channel_new',
        params: {
          channel_name: name,
          amount: 0.1
        }
      }).then(function (response) {
        sendGATimingEvent('lbrynet', 'createChannel', 'CHANNEL_NEW', gaStartTime, Date.now());
        handleLbrynetResponse(response, resolve, reject);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lbryConfig = {
  api: {
    apiHost: 'localhost',
    apiPort: '5279'
  }
};

module.exports = lbryConfig;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var ua = __webpack_require__(23);

var _require = __webpack_require__(1),
    googleId = _require.analytics.googleId,
    title = _require.details.title;

function createServeEventParams(headers, ip, originalUrl) {
  return {
    eventCategory: 'client requests',
    eventAction: 'serve request',
    eventLabel: originalUrl,
    ipOverride: ip,
    userAgentOverride: headers['user-agent']
  };
};

function createPublishTimingEventParams(category, variable, label, startTime, endTime) {
  var duration = endTime - startTime;
  return {
    userTimingCategory: category,
    userTimingVariableName: variable,
    userTimingTime: duration,
    userTimingLabel: label
  };
};

function sendGoogleAnalyticsEvent(ip, params) {
  var visitorId = ip.replace(/\./g, '-');
  var visitor = ua(googleId, visitorId, { strictCidFormat: false, https: true });
  visitor.event(params, function (err) {
    if (err) {
      logger.error('Google Analytics Event Error >>', err);
    }
  });
};

function sendGoogleAnalyticsTiming(visitorId, params) {
  var visitor = ua(googleId, visitorId, { strictCidFormat: false, https: true });
  visitor.timing(params, function (err) {
    if (err) {
      logger.error('Google Analytics Event Error >>', err);
    }
    logger.debug('Timing event successfully sent to google analytics');
  });
};

module.exports = {
  sendGAServeEvent: function sendGAServeEvent(headers, ip, originalUrl) {
    var params = createServeEventParams(headers, ip, originalUrl);
    sendGoogleAnalyticsEvent(ip, params);
  },
  sendGATimingEvent: function sendGATimingEvent(category, variable, label, startTime, endTime) {
    var params = createPublishTimingEventParams(category, variable, label, startTime, endTime);
    sendGoogleAnalyticsTiming(title, params);
  },
  chooseGaLbrynetPublishLabel: function chooseGaLbrynetPublishLabel(_ref) {
    var channelName = _ref.channel_name,
        channelId = _ref.channel_id;

    return channelName || channelId ? 'PUBLISH_IN_CHANNEL_CLAIM' : 'PUBLISH_ANONYMOUS_CLAIM';
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  serializeSpeechUser: function serializeSpeechUser(user, done) {
    // returns user data to be serialized into session
    console.log('serializing user');
    done(null, user);
  },
  deserializeSpeechUser: function deserializeSpeechUser(user, done) {
    // deserializes session and populates additional info to req.user
    console.log('deserializing user');
    done(null, user);
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Certificate = __webpack_require__(26);
var Channel = __webpack_require__(27);
var Claim = __webpack_require__(28);
var File = __webpack_require__(29);
var Request = __webpack_require__(30);
var User = __webpack_require__(31);

module.exports = {
  Certificate: Certificate,
  Channel: Channel,
  Claim: Claim,
  File: File,
  Request: Request,
  User: User
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(4),
    returnShortId = _require.returnShortId;

module.exports = function (sequelize, _ref) {
  var STRING = _ref.STRING,
      BOOLEAN = _ref.BOOLEAN,
      INTEGER = _ref.INTEGER,
      TEXT = _ref.TEXT,
      DECIMAL = _ref.DECIMAL;

  var Certificate = sequelize.define('Certificate', {
    address: {
      type: STRING,
      default: null
    },
    amount: {
      type: DECIMAL(19, 8),
      default: null
    },
    claimId: {
      type: STRING,
      default: null
    },
    claimSequence: {
      type: INTEGER,
      default: null
    },
    decodedClaim: {
      type: BOOLEAN,
      default: null
    },
    depth: {
      type: INTEGER,
      default: null
    },
    effectiveAmount: {
      type: DECIMAL(19, 8),
      default: null
    },
    hasSignature: {
      type: BOOLEAN,
      default: null
    },
    height: {
      type: INTEGER,
      default: null
    },
    hex: {
      type: TEXT('long'),
      default: null
    },
    name: {
      type: STRING,
      default: null
    },
    nout: {
      type: INTEGER,
      default: null
    },
    txid: {
      type: STRING,
      default: null
    },
    validAtHeight: {
      type: INTEGER,
      default: null
    },
    outpoint: {
      type: STRING,
      default: null
    },
    valueVersion: {
      type: STRING,
      default: null
    },
    claimType: {
      type: STRING,
      default: null
    },
    certificateVersion: {
      type: STRING,
      default: null
    },
    keyType: {
      type: STRING,
      default: null
    },
    publicKey: {
      type: TEXT('long'),
      default: null
    }
  }, {
    freezeTableName: true
  });

  Certificate.associate = function (db) {
    Certificate.belongsTo(db.Channel, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  Certificate.getShortChannelIdFromLongChannelId = function (longChannelId, channelName) {
    var _this = this;

    logger.debug('getShortChannelIdFromLongChannelId ' + channelName + ':' + longChannelId);
    return new Promise(function (resolve, reject) {
      _this.findAll({
        where: { name: channelName },
        order: [['height', 'ASC']]
      }).then(function (result) {
        switch (result.length) {
          case 0:
            throw new Error('No channel(s) found with that channel name');
          default:
            return resolve(returnShortId(result, longChannelId));
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Certificate.getLongChannelIdFromShortChannelId = function (channelName, channelClaimId) {
    var _this2 = this;

    logger.debug('getLongChannelIdFromShortChannelId(' + channelName + ', ' + channelClaimId + ')');
    return new Promise(function (resolve, reject) {
      _this2.findAll({
        where: {
          name: channelName,
          claimId: {
            $like: channelClaimId + '%'
          }
        },
        order: [['height', 'ASC']]
      }).then(function (result) {
        switch (result.length) {
          case 0:
            return resolve(null);
          default:
            // note results must be sorted
            return resolve(result[0].claimId);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Certificate.getLongChannelIdFromChannelName = function (channelName) {
    var _this3 = this;

    logger.debug('getLongChannelIdFromChannelName(' + channelName + ')');
    return new Promise(function (resolve, reject) {
      _this3.findAll({
        where: { name: channelName },
        order: [['effectiveAmount', 'DESC'], ['height', 'ASC']]
      }).then(function (result) {
        switch (result.length) {
          case 0:
            return resolve(null);
          default:
            return resolve(result[0].claimId);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Certificate.validateLongChannelId = function (name, claimId) {
    var _this4 = this;

    logger.debug('validateLongChannelId(' + name + ', ' + claimId + ')');
    return new Promise(function (resolve, reject) {
      _this4.findOne({
        where: { name: name, claimId: claimId }
      }).then(function (result) {
        if (!result) {
          return resolve(null);
        };
        resolve(claimId);
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Certificate.getLongChannelId = function (channelName, channelClaimId) {
    logger.debug('getLongChannelId(' + channelName + ', ' + channelClaimId + ')');
    if (channelClaimId && channelClaimId.length === 40) {
      // if a full channel id is provided
      return this.validateLongChannelId(channelName, channelClaimId);
    } else if (channelClaimId && channelClaimId.length < 40) {
      // if a short channel id is provided
      return this.getLongChannelIdFromShortChannelId(channelName, channelClaimId);
    } else {
      return this.getLongChannelIdFromChannelName(channelName); // if no channel id provided
    }
  };

  return Certificate;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (sequelize, _ref) {
  var STRING = _ref.STRING;

  var Channel = sequelize.define('Channel', {
    channelName: {
      type: STRING,
      allowNull: false
    },
    channelClaimId: {
      type: STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  Channel.associate = function (db) {
    Channel.belongsTo(db.User);
    Channel.hasOne(db.Certificate);
  };

  return Channel;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(4),
    returnShortId = _require.returnShortId;

var _require2 = __webpack_require__(1),
    defaultThumbnail = _require2.assetDefaults.thumbnail,
    host = _require2.details.host;

function determineFileExtensionFromContentType(contentType) {
  switch (contentType) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpeg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'video/mp4':
      return 'mp4';
    default:
      logger.debug('setting unknown file type as file extension jpeg');
      return 'jpeg';
  }
};

function determineThumbnail(storedThumbnail, defaultThumbnail) {
  if (storedThumbnail === '') {
    return defaultThumbnail;
  }
  return storedThumbnail;
};

function prepareClaimData(claim) {
  // logger.debug('preparing claim data based on resolved data:', claim);
  claim['thumbnail'] = determineThumbnail(claim.thumbnail, defaultThumbnail);
  claim['fileExt'] = determineFileExtensionFromContentType(claim.contentType);
  claim['host'] = host;
  return claim;
};

module.exports = function (sequelize, _ref) {
  var STRING = _ref.STRING,
      BOOLEAN = _ref.BOOLEAN,
      INTEGER = _ref.INTEGER,
      TEXT = _ref.TEXT,
      DECIMAL = _ref.DECIMAL;

  var Claim = sequelize.define('Claim', {
    address: {
      type: STRING,
      default: null
    },
    amount: {
      type: DECIMAL(19, 8),
      default: null
    },
    claimId: {
      type: STRING,
      default: null
    },
    claimSequence: {
      type: INTEGER,
      default: null
    },
    decodedClaim: {
      type: BOOLEAN,
      default: null
    },
    depth: {
      type: INTEGER,
      default: null
    },
    effectiveAmount: {
      type: DECIMAL(19, 8),
      default: null
    },
    hasSignature: {
      type: BOOLEAN,
      default: null
    },
    height: {
      type: INTEGER,
      default: null
    },
    hex: {
      type: TEXT('long'),
      default: null
    },
    name: {
      type: STRING,
      default: null
    },
    nout: {
      type: INTEGER,
      default: null
    },
    txid: {
      type: STRING,
      default: null
    },
    validAtHeight: {
      type: INTEGER,
      default: null
    },
    outpoint: {
      type: STRING,
      default: null
    },
    claimType: {
      type: STRING,
      default: null
    },
    certificateId: {
      type: STRING,
      default: null
    },
    author: {
      type: STRING,
      default: null
    },
    description: {
      type: TEXT('long'),
      default: null
    },
    language: {
      type: STRING,
      default: null
    },
    license: {
      type: STRING,
      default: null
    },
    licenseUrl: {
      type: STRING,
      default: null
    },
    nsfw: {
      type: BOOLEAN,
      default: null
    },
    preview: {
      type: STRING,
      default: null
    },
    thumbnail: {
      type: STRING,
      default: null
    },
    title: {
      type: STRING,
      default: null
    },
    metadataVersion: {
      type: STRING,
      default: null
    },
    contentType: {
      type: STRING,
      default: null
    },
    source: {
      type: STRING,
      default: null
    },
    sourceType: {
      type: STRING,
      default: null
    },
    sourceVersion: {
      type: STRING,
      default: null
    },
    streamVersion: {
      type: STRING,
      default: null
    },
    valueVersion: {
      type: STRING,
      default: null
    },
    channelName: {
      type: STRING,
      allowNull: true,
      default: null
    }
  }, {
    freezeTableName: true
  });

  Claim.associate = function (db) {
    Claim.belongsTo(db.File, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  Claim.getShortClaimIdFromLongClaimId = function (claimId, claimName) {
    var _this = this;

    logger.debug('Claim.getShortClaimIdFromLongClaimId for ' + claimName + '#' + claimId);
    return new Promise(function (resolve, reject) {
      _this.findAll({
        where: { name: claimName },
        order: [['height', 'ASC']]
      }).then(function (result) {
        switch (result.length) {
          case 0:
            throw new Error('No claim(s) found with that claim name');
          default:
            resolve(returnShortId(result, claimId));
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Claim.getAllChannelClaims = function (channelClaimId) {
    var _this2 = this;

    logger.debug('Claim.getAllChannelClaims for ' + channelClaimId);
    return new Promise(function (resolve, reject) {
      _this2.findAll({
        where: { certificateId: channelClaimId },
        order: [['height', 'ASC']],
        raw: true // returns an array of only data, not an array of instances
      }).then(function (channelClaimsArray) {
        // logger.debug('channelclaimsarray length:', channelClaimsArray.length);
        switch (channelClaimsArray.length) {
          case 0:
            return resolve(null);
          default:
            channelClaimsArray.forEach(function (claim) {
              claim['fileExt'] = determineFileExtensionFromContentType(claim.contentType);
              claim['thumbnail'] = determineThumbnail(claim.thumbnail, defaultThumbnail);
              return claim;
            });
            return resolve(channelClaimsArray);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Claim.getClaimIdByLongChannelId = function (channelClaimId, claimName) {
    var _this3 = this;

    logger.debug('finding claim id for claim ' + claimName + ' from channel ' + channelClaimId);
    return new Promise(function (resolve, reject) {
      _this3.findAll({
        where: { name: claimName, certificateId: channelClaimId },
        order: [['id', 'ASC']]
      }).then(function (result) {
        switch (result.length) {
          case 0:
            return resolve(null);
          case 1:
            return resolve(result[0].claimId);
          default:
            logger.error(result.length + ' records found for "' + claimName + '" in channel "' + channelClaimId + '"');
            return resolve(result[0].claimId);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Claim.getLongClaimIdFromShortClaimId = function (name, shortId) {
    var _this4 = this;

    return new Promise(function (resolve, reject) {
      _this4.findAll({
        where: {
          name: name,
          claimId: {
            $like: shortId + '%'
          } },
        order: [['height', 'ASC']]
      }).then(function (result) {
        switch (result.length) {
          case 0:
            return resolve(null);
          default:
            // note results must be sorted
            return resolve(result[0].claimId);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Claim.getTopFreeClaimIdByClaimName = function (name) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      _this5.findAll({
        where: { name: name },
        order: [['effectiveAmount', 'DESC'], ['height', 'ASC']] // note: maybe height and effective amount need to switch?
      }).then(function (result) {
        logger.debug('length of result', result.length);
        switch (result.length) {
          case 0:
            return resolve(null);
          default:
            return resolve(result[0].dataValues.claimId);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Claim.validateLongClaimId = function (name, claimId) {
    var _this6 = this;

    return new Promise(function (resolve, reject) {
      _this6.findOne({
        where: { name: name, claimId: claimId }
      }).then(function (result) {
        if (!result) {
          return resolve(null);
        };
        resolve(claimId);
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  Claim.getLongClaimId = function (claimName, claimId) {
    logger.debug('getLongClaimId(' + claimName + ', ' + claimId + ')');
    if (claimId && claimId.length === 40) {
      // if a full claim id is provided
      return this.validateLongClaimId(claimName, claimId);
    } else if (claimId && claimId.length < 40) {
      return this.getLongClaimIdFromShortClaimId(claimName, claimId); // if a short claim id is provided
    } else {
      return this.getTopFreeClaimIdByClaimName(claimName); // if no claim id is provided
    }
  };

  Claim.resolveClaim = function (name, claimId) {
    var _this7 = this;

    logger.debug('Claim.resolveClaim: ' + name + ' ' + claimId);
    return new Promise(function (resolve, reject) {
      _this7.findAll({
        where: { name: name, claimId: claimId }
      }).then(function (claimArray) {
        switch (claimArray.length) {
          case 0:
            return resolve(null);
          case 1:
            return resolve(prepareClaimData(claimArray[0].dataValues));
          default:
            logger.error('more than one record matches ' + name + '#' + claimId + ' in db.Claim');
            return resolve(prepareClaimData(claimArray[0].dataValues));
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  return Claim;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (sequelize, _ref) {
  var STRING = _ref.STRING,
      BOOLEAN = _ref.BOOLEAN,
      INTEGER = _ref.INTEGER;

  var File = sequelize.define('File', {
    name: {
      type: STRING,
      allowNull: false
    },
    claimId: {
      type: STRING,
      allowNull: false
    },
    address: {
      type: STRING,
      allowNull: false
    },
    outpoint: {
      type: STRING,
      allowNull: false
    },
    height: {
      type: INTEGER,
      allowNull: false,
      default: 0
    },
    fileName: {
      type: STRING,
      allowNull: false
    },
    filePath: {
      type: STRING,
      allowNull: false
    },
    fileType: {
      type: STRING
    },
    nsfw: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    trendingEligible: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  File.associate = function (db) {
    File.hasMany(db.Request);
    File.hasOne(db.Claim);
  };

  File.getRecentClaims = function () {
    return this.findAll({
      where: { nsfw: false, trendingEligible: true },
      order: [['createdAt', 'DESC']],
      limit: 25
    });
  };

  return File;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (sequelize, _ref) {
  var STRING = _ref.STRING,
      BOOLEAN = _ref.BOOLEAN,
      TEXT = _ref.TEXT;

  var Request = sequelize.define('Request', {
    action: {
      type: STRING,
      allowNull: false
    },
    url: {
      type: STRING,
      allowNull: false
    },
    ipAddress: {
      type: STRING,
      allowNull: true
    },
    result: {
      type: TEXT('long'),
      allowNull: true,
      default: null
    }
  }, {
    freezeTableName: true
  });

  Request.associate = function (db) {
    Request.belongsTo(db.File, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Request;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(32);
var logger = __webpack_require__(0);

module.exports = function (sequelize, _ref) {
  var STRING = _ref.STRING;

  var User = sequelize.define('User', {
    userName: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  User.associate = function (db) {
    User.hasOne(db.Channel);
  };

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.changePassword = function (newPassword) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      // generate a salt string to use for hashing
      bcrypt.genSalt(function (saltError, salt) {
        if (saltError) {
          logger.error('salt error', saltError);
          reject(saltError);
          return;
        }
        // generate a hashed version of the user's password
        bcrypt.hash(newPassword, salt, function (hashError, hash) {
          // if there is an error with the hash generation return the error
          if (hashError) {
            logger.error('hash error', hashError);
            reject(hashError);
            return;
          }
          // replace the current password with the new hash
          _this.update({ password: hash }).then(function () {
            resolve();
          }).catch(function (error) {
            reject(error);
          });
        });
      });
    });
  };

  // pre-save hook method to hash the user's password before the user's info is saved to the db.
  User.hook('beforeCreate', function (user, options) {
    logger.debug('User.beforeCreate hook...');
    return new Promise(function (resolve, reject) {
      // generate a salt string to use for hashing
      bcrypt.genSalt(function (saltError, salt) {
        if (saltError) {
          logger.error('salt error', saltError);
          reject(saltError);
          return;
        }
        // generate a hashed version of the user's password
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          // if there is an error with the hash generation return the error
          if (hashError) {
            logger.error('hash error', hashError);
            reject(hashError);
            return;
          }
          // replace the password string with the hash password value
          user.password = hash;
          resolve();
        });
      });
    });
  });

  return User;
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzlmMmI2Yjg1ZDk4OGM3YjllNzIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3RvblwiIiwid2VicGFjazovLy8uL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIiIsIndlYnBhY2s6Ly8vLi9zcGVlY2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGlSb3V0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGlSb3V0ZXMvY2hhbm5lbFNob3J0SWQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcGFzc3BvcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xicnlDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9maWxlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiXSwibmFtZXMiOlsiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiY29udGFpbmVycyIsInBhZ2VzIiwiZGV0YWlscyIsImhvc3QiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwiY29uZmlndXJlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJteXNxbCIsImRiIiwicmV0dXJuU2hvcnRJZCIsImNsYWltc0FycmF5IiwibG9uZ0lkIiwiY2xhaW1JbmRleCIsInNob3J0SWQiLCJzdWJzdHJpbmciLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwiZWxlbWVudCIsImNsYWltSWQiLCJFcnJvciIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwibGVuZ3RoIiwiZmlsdGVyIiwiYXBpUm91dGVzIiwicmVxdWlyZSIsImxvZ2dlciIsInNpdGUiLCJzbGFjayIsInBhc3Nwb3J0IiwibW9kZWxzIiwiY2hhbm5lbFNob3J0SWQiLCJoYW5kbGVFcnJvclJlc3BvbnNlIiwiY2hhbm5lbFNob3J0SWRSb3V0ZSIsInJlcyIsImlwIiwib3JpZ2luYWxVcmwiLCJwYXJhbXMiLCJkZWJ1ZyIsIkNlcnRpZmljYXRlIiwiZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCIsIm5hbWUiLCJ0aGVuIiwic3RhdHVzIiwianNvbiIsImNhdGNoIiwiZXJyb3IiLCJ1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMiLCJyZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMiLCJtZXNzYWdlIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwiZXJyIiwiT2JqZWN0Iiwia2V5cyIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJrZXkiLCJzdWNjZXNzIiwiTG9nZ2VyQ29uZmlnIiwibG9nTGV2ZWwiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwid2FybiIsImluZm8iLCJ2ZXJib3NlIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImNoYW5uZWwiLCJ1c2VybmFtZSIsImljb25FbW9qaSIsImxvY2FsTG9naW5TdHJhdGVneSIsImxvY2FsU2lnbnVwU3RyYXRlZ3kiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVVc2VyIiwic2VyaWFsaXplVXNlciIsInVzZSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ1c2VySW5mbyIsImlkIiwidXNlck5hbWUiLCJnZXRDaGFubmVsIiwiY2hhbm5lbE5hbWUiLCJjaGFubmVsQ2xhaW1JZCIsInNob3J0Q2hhbm5lbElkIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJwYXNzd29yZCIsImRvbmUiLCJVc2VyIiwiZmluZE9uZSIsIndoZXJlIiwidXNlciIsImNvbXBhcmVQYXNzd29yZCIsImlzTWF0Y2giLCJsYnJ5QXBpIiwiY3JlYXRlQ2hhbm5lbCIsInVzZXJEYXRhIiwiY2hhbm5lbERhdGEiLCJ0eCIsImNsYWltX2lkIiwiY2VydGlmaWNhdGVEYXRhIiwiYWxsIiwiY3JlYXRlIiwiQ2hhbm5lbCIsIm5ld1VzZXIiLCJuZXdDaGFubmVsIiwibmV3Q2VydGlmaWNhdGUiLCJzZXRDaGFubmVsIiwic2V0VXNlciIsImF4aW9zIiwiYXBpIiwiYXBpSG9zdCIsImFwaVBvcnQiLCJsYnJ5QXBpVXJpIiwiY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsIiwic2VuZEdBVGltaW5nRXZlbnQiLCJoYW5kbGVMYnJ5bmV0UmVzcG9uc2UiLCJkYXRhIiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInB1Ymxpc2hDbGFpbSIsInB1Ymxpc2hQYXJhbXMiLCJnYVN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJwb3N0IiwibWV0aG9kIiwicmVzcG9uc2UiLCJnZXRDbGFpbSIsInVyaSIsInRpbWVvdXQiLCJnZXRDbGFpbUxpc3QiLCJjbGFpbU5hbWUiLCJyZXNvbHZlVXJpIiwiZ2V0RG93bmxvYWREaXJlY3RvcnkiLCJkb3dubG9hZF9kaXJlY3RvcnkiLCJjaGFubmVsX25hbWUiLCJhbW91bnQiLCJsYnJ5Q29uZmlnIiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsImNoYW5uZWxJZCIsImNoYW5uZWxfaWQiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0Iiwic2VxdWVsaXplIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImFkZHJlc3MiLCJ0eXBlIiwiZGVmYXVsdCIsImNsYWltU2VxdWVuY2UiLCJkZWNvZGVkQ2xhaW0iLCJkZXB0aCIsImVmZmVjdGl2ZUFtb3VudCIsImhhc1NpZ25hdHVyZSIsImhlaWdodCIsImhleCIsIm5vdXQiLCJ0eGlkIiwidmFsaWRBdEhlaWdodCIsIm91dHBvaW50IiwidmFsdWVWZXJzaW9uIiwiY2xhaW1UeXBlIiwiY2VydGlmaWNhdGVWZXJzaW9uIiwia2V5VHlwZSIsInB1YmxpY0tleSIsImZyZWV6ZVRhYmxlTmFtZSIsImFzc29jaWF0ZSIsImJlbG9uZ3NUbyIsImZvcmVpZ25LZXkiLCJhbGxvd051bGwiLCJsb25nQ2hhbm5lbElkIiwiZmluZEFsbCIsIm9yZGVyIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCIsIiRsaWtlIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSIsInZhbGlkYXRlTG9uZ0NoYW5uZWxJZCIsImdldExvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZWZhdWx0VGh1bWJuYWlsIiwiZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSIsImNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImNsYWltIiwiY2VydGlmaWNhdGVJZCIsImF1dGhvciIsImxhbmd1YWdlIiwibGljZW5zZSIsImxpY2Vuc2VVcmwiLCJuc2Z3IiwicHJldmlldyIsIm1ldGFkYXRhVmVyc2lvbiIsInNvdXJjZSIsInNvdXJjZVR5cGUiLCJzb3VyY2VWZXJzaW9uIiwic3RyZWFtVmVyc2lvbiIsImdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJyYXciLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJnZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkIiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsImRhdGFWYWx1ZXMiLCJ2YWxpZGF0ZUxvbmdDbGFpbUlkIiwiZ2V0TG9uZ0NsYWltSWQiLCJyZXNvbHZlQ2xhaW0iLCJjbGFpbUFycmF5IiwiZmlsZU5hbWUiLCJmaWxlUGF0aCIsImZpbGVUeXBlIiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImFjdGlvbiIsInVybCIsImlwQWRkcmVzcyIsImJjcnlwdCIsInByb3RvdHlwZSIsImNvbXBhcmUiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwiZ2VuU2FsdCIsInNhbHRFcnJvciIsInNhbHQiLCJoYXNoIiwiaGFzaEVycm9yIiwidXBkYXRlIiwiaG9vayIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsb0M7Ozs7Ozs7OztBQ0FBLFNBQVNBLFVBQVQsR0FBdUI7QUFBQTs7QUFDckIsT0FBS0MsU0FBTCxHQUFpQjtBQUNmQyxjQUFVO0FBREssR0FBakI7QUFHQSxPQUFLQyxhQUFMLEdBQXFCO0FBQ25CQyxpQkFBYSwrQkFETTtBQUVuQkMsZUFBYSxvREFGTTtBQUduQkMsV0FBYTtBQUhNLEdBQXJCO0FBS0EsT0FBS0MsSUFBTCxHQUFZO0FBQ1ZDLGdCQUFZO0FBREYsR0FBWjtBQUdBLE9BQUtDLGdCQUFMLEdBQXdCO0FBQ3RCQyxnQkFBWSxFQURVO0FBRXRCQyxnQkFBWSxFQUZVO0FBR3RCQyxXQUFZO0FBSFUsR0FBeEI7QUFLQSxPQUFLQyxPQUFMLEdBQWU7QUFDYlQsaUJBQWEscURBREE7QUFFYlUsVUFBYSxTQUZBO0FBR2JDLFVBQWEsSUFIQTtBQUli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OlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM5ZjJiNmI4NWQ5ODhjN2I5ZTcyIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTaXRlQ29uZmlnICgpIHtcbiAgdGhpcy5hbmFseXRpY3MgPSB7XG4gICAgZ29vZ2xlSWQ6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5hc3NldERlZmF1bHRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQW4gYXNzZXQgcHVibGlzaGVkIG9uIFNwZWUuY2gnLFxuICAgIHRodW1ibmFpbCAgOiAnaHR0cHM6Ly9zcGVlLmNoL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gIH07XG4gIHRoaXMuYXV0aCA9IHtcbiAgICBzZXNzaW9uS2V5OiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IHtcbiAgICBjb21wb25lbnRzOiB7fSxcbiAgICBjb250YWluZXJzOiB7fSxcbiAgICBwYWdlcyAgICAgOiB7fSxcbiAgfTtcbiAgdGhpcy5kZXRhaWxzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT3Blbi1zb3VyY2UsIGRlY2VudHJhbGl6ZWQgaW1hZ2UgYW5kIHZpZGVvIHNoYXJpbmcuJyxcbiAgICBob3N0ICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHBvcnQgICAgICAgOiAzMDAwLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gICAgdHdpdHRlciAgICA6ICdAc3BlZV9jaCcsXG4gIH07XG4gIHRoaXMucHVibGlzaGluZyA9IHtcbiAgICBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXM6IFtdLFxuICAgIGRpc2FibGVkICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgZGlzYWJsZWRNZXNzYWdlICAgICAgICAgOiAnUGxlYXNlIGNoZWNrIGJhY2sgc29vbi4nLFxuICAgIHByaW1hcnlDbGFpbUFkZHJlc3MgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWwgICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWxJZCAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHVwbG9hZERpcmVjdG9yeSAgICAgICAgIDogJy9ob21lL2xicnkvVXBsb2FkcycsXG4gIH07XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNpdGUgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7IGFuYWx5dGljcywgYXNzZXREZWZhdWx0cywgYXV0aCwgY3VzdG9tQ29tcG9uZW50cywgZGV0YWlscywgcHVibGlzaGluZyB9ID0gY29uZmlnO1xuICAgIHRoaXMuYW5hbHl0aWNzID0gYW5hbHl0aWNzO1xuICAgIHRoaXMuYXNzZXREZWZhdWx0cyA9IGFzc2V0RGVmYXVsdHM7XG4gICAgdGhpcy5hdXRoID0gYXV0aDtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIHRoaXMucHVibGlzaGluZyA9IHB1Ymxpc2hpbmc7XG4gICAgdGhpcy5jdXN0b21Db21wb25lbnRzID0gY3VzdG9tQ29tcG9uZW50cztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNpdGVDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwiZnVuY3Rpb24gbXlzcWwgKCkge1xuICB0aGlzLmRiID0ge307XG4gIHRoaXMuY29uZmlndXJlID0gKGRiKSA9PiB7XG4gICAgaWYgKCFkYikge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIC8vIGNvbmZpZ3VyZSBjcmVkZW50aWFsc1xuICAgIGNvbnNvbGUubG9nKCdjb25maWd1cmluZyBteXNxbC4uLicpO1xuICAgIHRoaXMuZGIgPSBkYjtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IG15c3FsKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1sb2NhbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblNob3J0SWQ6IGZ1bmN0aW9uIChjbGFpbXNBcnJheSwgbG9uZ0lkKSB7XG4gICAgbGV0IGNsYWltSW5kZXg7XG4gICAgbGV0IHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIDEpOyAvLyBkZWZhdWx0IHNob3J0IGlkIGlzIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICBsZXQgc2hvcnRJZExlbmd0aCA9IDA7XG4gICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhpcyBjbGFpbSBpZFxuICAgIGNsYWltSW5kZXggPSBjbGFpbXNBcnJheS5maW5kSW5kZXgoZWxlbWVudCA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFpbUlkID09PSBsb25nSWQ7XG4gICAgfSk7XG4gICAgaWYgKGNsYWltSW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsYWltIGlkIG5vdCBmb3VuZCBpbiBjbGFpbXMgbGlzdCcpO1xuICAgIH1cbiAgICAvLyBnZXQgYW4gYXJyYXkgb2YgYWxsIGNsYWltcyB3aXRoIGxvd2VyIGhlaWdodFxuICAgIGxldCBwb3NzaWJsZU1hdGNoZXMgPSBjbGFpbXNBcnJheS5zbGljZSgwLCBjbGFpbUluZGV4KTtcbiAgICAvLyByZW1vdmUgY2VydGlmaWNhdGVzIHdpdGggdGhlIHNhbWUgcHJlZml4ZXMgdW50aWwgbm9uZSBhcmUgbGVmdC5cbiAgICB3aGlsZSAocG9zc2libGVNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNob3J0SWRMZW5ndGggKz0gMTtcbiAgICAgIHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpO1xuICAgICAgcG9zc2libGVNYXRjaGVzID0gcG9zc2libGVNYXRjaGVzLmZpbHRlcihlbGVtZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50LmNsYWltSWQgJiYgKGVsZW1lbnQuY2xhaW1JZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCkgPT09IHNob3J0SWQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hvcnRJZDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoYXR3Zy1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGFwaVJvdXRlcyA9IHJlcXVpcmUoJy4vc2VydmVyL3JvdXRlcy9hcGlSb3V0ZXMvJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCcuL2NvbmZpZy9sb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsID0gcmVxdWlyZSgnLi9jb25maWcvbXlzcWxDb25maWcnKTtcbmNvbnN0IHNpdGUgPSByZXF1aXJlKCcuL2NvbmZpZy9zaXRlQ29uZmlnJyk7XG5jb25zdCBzbGFjayA9IHJlcXVpcmUoJy4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJy4vc2VydmVyL3Bhc3Nwb3J0LycpO1xuY29uc3QgbW9kZWxzID0gcmVxdWlyZSgnLi9zZXJ2ZXIvbW9kZWxzLycpO1xuLy8gY29uc3QgQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY2xpZW50L2NvbXBvbmVudHMnKTtcblxuY29uc3QgZXhwb3J0cyA9IHtcbiAgYXBpUm91dGVzLFxuICBsb2dnZXIsXG4gIG15c3FsLFxuICBzaXRlLFxuICBzbGFjayxcbiAgcGFzc3BvcnQsXG4gIG1vZGVscyxcbiAgLy8gQ29tcG9uZW50cyxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NwZWVjaC5qcyIsImNvbnN0IGNoYW5uZWxTaG9ydElkID0gcmVxdWlyZSgnLi9jaGFubmVsU2hvcnRJZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgY2hhbm5lbFNob3J0SWQsXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGlSb3V0ZXMvaW5kZXguanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XHJcbi8vIGNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcclxuLy8gY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcclxuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcclxuXHJcbi8qXHJcblxyXG5yb3V0ZSB0byBnZXQgYSBzaG9ydCBjaGFubmVsIGlkIGZyb20gbG9uZyBjaGFubmVsIElkXHJcblxyXG4qL1xyXG5cclxuY29uc3QgY2hhbm5lbFNob3J0SWRSb3V0ZSA9IChkYiwgaG9zdCkgPT4ge1xyXG4gIHJldHVybiAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdoZWxsbyBmcm9tIGNoYW5uZWxTaG9ydElkUm91dGUnKTtcclxuICAgIGxvZ2dlci5kZWJ1ZygnaG9zdDonLCBob3N0KTtcclxuICAgIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXHJcbiAgICAgIC50aGVuKHNob3J0SWQgPT4ge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNob3J0SWQpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcclxuICAgICAgfSk7XHJcbiAgfTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbFNob3J0SWRSb3V0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGlSb3V0ZXMvY2hhbm5lbFNob3J0SWQuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVFcnJvclJlc3BvbnNlOiBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBvbiAke29yaWdpbmFsVXJsfWAsIG1vZHVsZS5leHBvcnRzLnVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyhlcnJvcikpO1xuICAgIGNvbnN0IFtzdGF0dXMsIG1lc3NhZ2VdID0gbW9kdWxlLmV4cG9ydHMucmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoc3RhdHVzKVxuICAgICAgLmpzb24obW9kdWxlLmV4cG9ydHMuY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQoc3RhdHVzLCBtZXNzYWdlKSk7XG4gIH0sXG4gIHJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1czogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgbGV0IHN0YXR1cywgbWVzc2FnZTtcbiAgICAvLyBjaGVjayBmb3IgZGFlbW9uIGJlaW5nIHR1cm5lZCBvZmZcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHN0YXR1cyA9IDUwMztcbiAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiByZWZ1c2VkLiAgVGhlIGRhZW1vbiBtYXkgbm90IGJlIHJ1bm5pbmcuJztcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gNDAwO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFtzdGF0dXMsIG1lc3NhZ2VdO1xuICB9LFxuICB1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXM6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBuZXdFcnJvck9iamVjdCA9IHt9O1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbmV3RXJyb3JPYmplY3Rba2V5XSA9IGVycltrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3RXJyb3JPYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH0sXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gTG9nZ2VyQ29uZmlnICgpIHtcbiAgdGhpcy5sb2dMZXZlbCA9ICdkZWJ1Zyc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIGxvZ2dlciBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdjb25maWd1cmluZyB3aW5zdG9uIGxvZ2dlci4uLicpO1xuICAgIC8vIHVwZGF0ZSB2YWx1ZXMgd2l0aCBsb2NhbCBjb25maWcgcGFyYW1zXG4gICAgY29uc3Qge2xvZ0xldmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLmxvZ0xldmVsID0gbG9nTGV2ZWw7XG4gICAgLy8gY29uZmlndXJlIHRoZSB3aW5zdG9uIGxvZ2dlclxuICAgIGxvZ2dlci5jb25maWd1cmUoe1xuICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICBuZXcgKGxvZ2dlci50cmFuc3BvcnRzLkNvbnNvbGUpKHtcbiAgICAgICAgICBsZXZlbCAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmxvZ0xldmVsLFxuICAgICAgICAgIHRpbWVzdGFtcCAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgIGNvbG9yaXplICAgICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgcHJldHR5UHJpbnQgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBoYW5kbGVFeGNlcHRpb25zICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb246IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KTtcbiAgICAvLyB0ZXN0IGFsbCB0aGUgbG9nIGxldmVsc1xuICAgIGNvbnNvbGUubG9nKCd0ZXN0aW5nIHdpbnN0b24gbG9nIGxldmVscy4uLicpO1xuICAgIGxvZ2dlci5lcnJvcignTGV2ZWwgMCcpO1xuICAgIGxvZ2dlci53YXJuKCdMZXZlbCAxJyk7XG4gICAgbG9nZ2VyLmluZm8oJ0xldmVsIDInKTtcbiAgICBsb2dnZXIudmVyYm9zZSgnTGV2ZWwgMycpO1xuICAgIGxvZ2dlci5kZWJ1ZygnTGV2ZWwgNCcpO1xuICAgIGxvZ2dlci5zaWxseSgnTGV2ZWwgNScpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTG9nZ2VyQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwiY29uc3Qgd2luc3RvblNsYWNrV2ViSG9vayA9IHJlcXVpcmUoJ3dpbnN0b24tc2xhY2std2ViaG9vaycpLlNsYWNrV2ViSG9vaztcbmNvbnN0IHdpbnN0b24gPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIFNsYWNrQ29uZmlnICgpIHtcbiAgdGhpcy5zbGFja1dlYkhvb2sgICAgICA9ICdkZWZhdWx0JztcbiAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9ICdkZWZhdWx0JztcbiAgdGhpcy5zbGFja0luZm9DaGFubmVsICA9ICdkZWZhdWx0JztcbiAgdGhpcy5jb25maWd1cmUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnbm8gc2xhY2sgY29uZmlnIHJlY2VpdmVkJyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB2YXJpYWJsZXNcbiAgICBjb25zb2xlLmxvZygnY29uZmlndXJpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICAgIC8vIHVwZGF0ZSBzbGFjayB3ZWJob29rIHNldHRpbmdzXG4gICAgaWYgKHRoaXMuc2xhY2tXZWJIb29rKSB7XG4gICAgICAvLyBhZGQgYSB0cmFuc3BvcnQgZm9yIGVycm9ycyB0byBzbGFja1xuICAgICAgaWYgKHRoaXMuc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1lcnJvcnMtdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2staW5mby10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrSW5mb0NoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlc1xuICAgICAgY29uc29sZS5sb2coJ3Rlc3Rpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgICB3aW5zdG9uLmVycm9yKCdTbGFjayBcImVycm9yXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgICB3aW5zdG9uLmluZm8oJ1NsYWNrIFwiaW5mb1wiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5zdG9uLndhcm4oJ1NsYWNrIGxvZ2dpbmcgaXMgbm90IGVuYWJsZWQgYmVjYXVzZSBubyBzbGFja1dlYkhvb2sgY29uZmlnIHZhciBwcm92aWRlZC4nKTtcbiAgICB9XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTbGFja0NvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NsYWNrQ29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCJcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcclxuY29uc3QgbG9jYWxMb2dpblN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1sb2dpbi5qcycpO1xyXG5jb25zdCBsb2NhbFNpZ251cFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1zaWdudXAuanMnKTtcclxuY29uc3QgeyBzZXJpYWxpemVTcGVlY2hVc2VyLCBkZXNlcmlhbGl6ZVNwZWVjaFVzZXIgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMnKTtcclxuXHJcbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihkZXNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xyXG5wYXNzcG9ydC5zZXJpYWxpemVVc2VyKHNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xyXG5wYXNzcG9ydC51c2UoJ2xvY2FsLWxvZ2luJywgbG9jYWxMb2dpblN0cmF0ZWd5KTtcclxucGFzc3BvcnQudXNlKCdsb2NhbC1zaWdudXAnLCBsb2NhbFNpZ251cFN0cmF0ZWd5KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGFzc3BvcnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnRcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZGIgfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnJyk7XG5cbmNvbnN0IHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyA9ICh1c2VySW5zdGFuY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICB1c2VySW5mb1snaWQnXSA9IHVzZXJJbnN0YW5jZS5pZDtcbiAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IHVzZXJJbnN0YW5jZS51c2VyTmFtZTtcbiAgICB1c2VySW5zdGFuY2VcbiAgICAgIC5nZXRDaGFubmVsKClcbiAgICAgIC50aGVuKCh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSkgPT4ge1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChjaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIHJldHVybiBkYi5Vc2VyXG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7dXNlck5hbWU6IHVzZXJuYW1lfSxcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZChwYXNzd29yZClcbiAgICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1Bhc3N3b3JkIHdhcyBhIG1hdGNoLCByZXR1cm5pbmcgVXNlcicpO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyh1c2VyKVxuICAgICAgICAgICAgICAudGhlbih1c2VySW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9LFxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGRiIH0gPSByZXF1aXJlKCdteXNxbENvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGFwaTogeyBhcGlIb3N0LCBhcGlQb3J0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzJyk7XG5jb25zdCBsYnJ5QXBpVXJpID0gJ2h0dHA6Ly8nICsgYXBpSG9zdCArICc6JyArIGFwaVBvcnQ7XG5jb25zdCB7IGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCwgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4vZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5cbmNvbnN0IGhhbmRsZUxicnluZXRSZXNwb25zZSA9ICh7IGRhdGEgfSwgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGxvZ2dlci5kZWJ1ZygnbGJyeSBhcGkgZGF0YTonLCBkYXRhKTtcbiAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgLy8gY2hlY2sgZm9yIGFuIGVycm9yXG4gICAgaWYgKGRhdGEucmVzdWx0LmVycm9yKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0xicnluZXQgYXBpIGVycm9yOicsIGRhdGEucmVzdWx0LmVycm9yKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoZGF0YS5yZXN1bHQuZXJyb3IpKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIHJlc29sdmUoZGF0YS5yZXN1bHQpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBmYWxsYmFjayBpbiBjYXNlIGl0IGp1c3QgdGltZWQgb3V0XG4gIHJlamVjdChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaENsYWltIChwdWJsaXNoUGFyYW1zKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFB1Ymxpc2hpbmcgY2xhaW0gdG8gXCIke3B1Ymxpc2hQYXJhbXMubmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3B1Ymxpc2gnLFxuICAgICAgICAgIHBhcmFtczogcHVibGlzaFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3B1Ymxpc2gnLCBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwocHVibGlzaFBhcmFtcyksIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBDbGFpbSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSwgdGltZW91dDogMjAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltJywgJ0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltTGlzdCAoY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgY2xhaW1fbGlzdCBmb3IgXCIke2NsYWltTmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NsYWltX2xpc3QnLFxuICAgICAgICAgIHBhcmFtczogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltTGlzdCcsICdDTEFJTV9MSVNUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVzb2x2ZVVyaSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFJlc29sdmluZyBVUkkgZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdyZXNvbHZlJyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3Jlc29sdmVVcmknLCAnUkVTT0xWRScsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcikgeyAgLy8gY2hlY2sgZm9yIGVycm9yc1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7ICAvLyBpZiBubyBlcnJvcnMsIHJlc29sdmVcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHRbdXJpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXREb3dubG9hZERpcmVjdG9yeSAoKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdsYnJ5QXBpID4+IFJldHJpZXZpbmcgdGhlIGRvd25sb2FkIGRpcmVjdG9yeSBwYXRoIGZyb20gbGJyeSBkYWVtb24uLi4nKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdzZXR0aW5nc19nZXQnLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXREb3dubG9hZERpcmVjdG9yeScsICdTRVRUSU5HU19HRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0LmRvd25sb2FkX2RpcmVjdG9yeSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gbGJyeSBkYWVtb24sIGJ1dCB1bmFibGUgdG8gcmV0cmlldmUgdGhlIGRvd25sb2FkIGRpcmVjdG9yeS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdMYnJ5bmV0IEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKCcvaG9tZS9sYnJ5L0Rvd25sb2Fkcy8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZUNoYW5uZWwgKG5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gQ3JlYXRpbmcgY2hhbm5lbCBmb3IgJHtuYW1lfS4uLmApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NoYW5uZWxfbmV3JyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGNoYW5uZWxfbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGFtb3VudCAgICAgIDogMC4xLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdjcmVhdGVDaGFubmVsJywgJ0NIQU5ORUxfTkVXJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGNvbnNvbGUubG9nKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGNvbnNvbGUubG9nKCdkZXNlcmlhbGl6aW5nIHVzZXInKTtcbiAgICBkb25lKG51bGwsIHVzZXIpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwiY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCdtb2RlbHMvY2VydGlmaWNhdGUuanMnKTtcclxuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJ21vZGVscy9jaGFubmVsLmpzJyk7XHJcbmNvbnN0IENsYWltID0gcmVxdWlyZSgnbW9kZWxzL2NsYWltLmpzJyk7XHJcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCdtb2RlbHMvZmlsZS5qcycpO1xyXG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnbW9kZWxzL3JlcXVlc3QuanMnKTtcclxuY29uc3QgVXNlciA9IHJlcXVpcmUoJ21vZGVscy91c2VyLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBDZXJ0aWZpY2F0ZSxcclxuICBDaGFubmVsLFxyXG4gIENsYWltLFxyXG4gIEZpbGUsXHJcbiAgUmVxdWVzdCxcclxuICBVc2VyLFxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgQ2hhbm5lbCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NoYW5uZWwnLFxuICAgIHtcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2hhbm5lbC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2hhbm5lbC5iZWxvbmdzVG8oZGIuVXNlcik7XG4gICAgQ2hhbm5lbC5oYXNPbmUoZGIuQ2VydGlmaWNhdGUpO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVsO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGFzc2V0RGVmYXVsdHM6IHsgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsIH0sIGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIChjb250ZW50VHlwZSkge1xuICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIHJldHVybiAnanBlZyc7XG4gICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgIHJldHVybiAncG5nJztcbiAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgcmV0dXJuICdnaWYnO1xuICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICByZXR1cm4gJ21wNCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5kZWJ1Zygnc2V0dGluZyB1bmtub3duIGZpbGUgdHlwZSBhcyBmaWxlIGV4dGVuc2lvbiBqcGVnJyk7XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUaHVtYm5haWwgKHN0b3JlZFRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCkge1xuICBpZiAoc3RvcmVkVGh1bWJuYWlsID09PSAnJykge1xuICAgIHJldHVybiBkZWZhdWx0VGh1bWJuYWlsO1xuICB9XG4gIHJldHVybiBzdG9yZWRUaHVtYm5haWw7XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhaW1EYXRhIChjbGFpbSkge1xuICAvLyBsb2dnZXIuZGVidWcoJ3ByZXBhcmluZyBjbGFpbSBkYXRhIGJhc2VkIG9uIHJlc29sdmVkIGRhdGE6JywgY2xhaW0pO1xuICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICBjbGFpbVsnaG9zdCddID0gaG9zdDtcbiAgcmV0dXJuIGNsYWltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENsYWltID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2xhaW0nLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlVXJsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbWV0YWRhdGFWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjb250ZW50VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzdHJlYW1WZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENsYWltLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDbGFpbS5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCBmb3IgJHtjbGFpbU5hbWV9IyR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0ocykgZm91bmQgd2l0aCB0aGF0IGNsYWltIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGNsYWltSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyBmb3IgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgICByYXcgIDogdHJ1ZSwgIC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb25seSBkYXRhLCBub3QgYW4gYXJyYXkgb2YgaW5zdGFuY2VzXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWxDbGFpbXNBcnJheSA9PiB7XG4gICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdjaGFubmVsY2xhaW1zYXJyYXkgbGVuZ3RoOicsIGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGNoYW5uZWxDbGFpbXNBcnJheS5mb3JFYWNoKGNsYWltID0+IHtcbiAgICAgICAgICAgICAgICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoY2hhbm5lbENsYWltc0FycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBmaW5kaW5nIGNsYWltIGlkIGZvciBjbGFpbSAke2NsYWltTmFtZX0gZnJvbSBjaGFubmVsICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSwgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaWQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGAke3Jlc3VsdC5sZW5ndGh9IHJlY29yZHMgZm91bmQgZm9yIFwiJHtjbGFpbU5hbWV9XCIgaW4gY2hhbm5lbCBcIiR7Y2hhbm5lbENsYWltSWR9XCJgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgc2hvcnRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke3Nob3J0SWR9JWAsXG4gICAgICAgICAgICB9fSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sICAvLyBub3RlOiBtYXliZSBoZWlnaHQgYW5kIGVmZmVjdGl2ZSBhbW91bnQgbmVlZCB0byBzd2l0Y2g/XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdsZW5ndGggb2YgcmVzdWx0JywgcmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmRhdGFWYWx1ZXMuY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLnZhbGlkYXRlTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NsYWltSWQoJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIGlmIChjbGFpbUlkICYmIChjbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNsYWltSWQgJiYgY2xhaW1JZC5sZW5ndGggPCA0MCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7ICAvLyBpZiBhIHNob3J0IGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUoY2xhaW1OYW1lKTsgIC8vIGlmIG5vIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIENsYWltLnJlc29sdmVDbGFpbSA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5yZXNvbHZlQ2xhaW06ICR7bmFtZX0gJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsYWltQXJyYXkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY2xhaW1BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYG1vcmUgdGhhbiBvbmUgcmVjb3JkIG1hdGNoZXMgJHtuYW1lfSMke2NsYWltSWR9IGluIGRiLkNsYWltYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDbGFpbTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBURVhUIH0pID0+IHtcbiAgY29uc3QgUmVxdWVzdCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1JlcXVlc3QnLFxuICAgIHtcbiAgICAgIGFjdGlvbjoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB1cmw6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaXBBZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIHR5cGUgICAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFJlcXVlc3QuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFJlcXVlc3QuYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUmVxdWVzdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IFVzZXIgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdVc2VyJyxcbiAgICB7XG4gICAgICB1c2VyTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFVzZXIuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFVzZXIuaGFzT25lKGRiLkNoYW5uZWwpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNvbXBhcmVQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAobmV3UGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaChuZXdQYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBjdXJyZW50IHBhc3N3b3JkIHdpdGggdGhlIG5ldyBoYXNoXG4gICAgICAgICAgdGhpc1xuICAgICAgICAgICAgLnVwZGF0ZSh7cGFzc3dvcmQ6IGhhc2h9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIHByZS1zYXZlIGhvb2sgbWV0aG9kIHRvIGhhc2ggdGhlIHVzZXIncyBwYXNzd29yZCBiZWZvcmUgdGhlIHVzZXIncyBpbmZvIGlzIHNhdmVkIHRvIHRoZSBkYi5cbiAgVXNlci5ob29rKCdiZWZvcmVDcmVhdGUnLCAodXNlciwgb3B0aW9ucykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnVXNlci5iZWZvcmVDcmVhdGUgaG9vay4uLicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgcGFzc3dvcmQgc3RyaW5nIHdpdGggdGhlIGhhc2ggcGFzc3dvcmQgdmFsdWVcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaDtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBVc2VyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9