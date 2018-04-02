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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Certificate = __webpack_require__(44);
var Channel = __webpack_require__(45);
var Claim = __webpack_require__(46);
var File = __webpack_require__(47);
var Request = __webpack_require__(48);
var User = __webpack_require__(49);

var Sequelize = __webpack_require__(13);
var logger = __webpack_require__(0);

var _require = __webpack_require__(10),
    database = _require.database,
    username = _require.username,
    password = _require.password;

// set sequelize options


var sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: { decimalNumbers: true },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 10000
  }
});

// establish mysql connection
sequelize.authenticate().then(function () {
  logger.info('Sequelize has established mysql connection successfully.');
}).catch(function (err) {
  logger.error('Sequelize was unable to connect to the database:', err);
});

// manually add each model to the db object (note: make this dynamic)
var db = {};
db['Certificate'] = sequelize.import('Certificate', Certificate);
db['Channel'] = sequelize.import('Channel', Channel);
db['Claim'] = sequelize.import('Claim', Claim);
db['File'] = sequelize.import('File', File);
db['Request'] = sequelize.import('Request', Request);
db['User'] = sequelize.import('User', User);

// run model.association for each model in the db object that has an association
logger.info('associating db models...');
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    logger.info('Associating model:', modelName);
    db[modelName].associate(db);
  }
});

// add sequelize/Sequelize to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// add an 'upsert' method to the db object
db.upsert = function (Model, values, condition, tableName) {
  return Model.findOne({
    where: condition
  }).then(function (obj) {
    if (obj) {
      // update
      logger.debug('updating record in db.' + tableName);
      return obj.update(values);
    } else {
      // insert
      logger.debug('creating record in db.' + tableName);
      return Model.create(values);
    }
  }).catch(function (error) {
    logger.error(tableName + '.upsert error', error);
    throw error;
  });
};

module.exports = db;

/***/ }),
/* 3 */
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
    title: 'A Spee.ch Implementation'
  };
  this.auth = {
    sessionKey: 'default'
  };
  this.customComponents = {};
  this.customContainers = {};
  this.customPages = {};
  this.details = {
    description: 'Welcome to my decentralized image and video sharing site.',
    host: 'http://localhost:3000',
    port: 3000,
    title: 'My Spee.ch Site',
    twitter: '@exampleTwitterHandle'
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
  this.routes = {};
  this.update = function (config) {
    if (!config) {
      return console.log('No site config received.');
    }
    var analytics = config.analytics,
        assetDefaults = config.assetDefaults,
        auth = config.auth,
        customComponents = config.customComponents,
        customContainers = config.customContainers,
        customPages = config.customPages,
        details = config.details,
        publishing = config.publishing,
        routes = config.routes;

    console.log('Configuring site details...');
    _this.analytics = analytics;
    _this.assetDefaults = assetDefaults;
    _this.auth = auth;
    _this.details = details;
    _this.publishing = publishing;
    _this.customComponents = customComponents;
    _this.customContainers = customContainers;
    _this.customPages = customPages;
    _this.routes = routes;
  };
};

module.exports = new SiteConfig();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var ua = __webpack_require__(54);

var _require = __webpack_require__(3),
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(52);
var logger = __webpack_require__(0);

var _require = __webpack_require__(53),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(4),
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(2);
var logger = __webpack_require__(0);

var _require = __webpack_require__(65),
    returnPaginatedChannelClaims = _require.returnPaginatedChannelClaims;

var NO_CHANNEL = 'NO_CHANNEL';
var NO_CLAIM = 'NO_CLAIM';
var NO_FILE = 'NO_FILE';

module.exports = {
  getClaimId: function getClaimId(channelName, channelClaimId, name, claimId) {
    if (channelName) {
      return module.exports.getClaimIdByChannel(channelName, channelClaimId, name);
    } else {
      return module.exports.getClaimIdByClaim(name, claimId);
    }
  },
  getClaimIdByClaim: function getClaimIdByClaim(claimName, claimId) {
    logger.debug('getClaimIdByClaim(' + claimName + ', ' + claimId + ')');
    return new Promise(function (resolve, reject) {
      db.Claim.getLongClaimId(claimName, claimId).then(function (longClaimId) {
        if (!longClaimId) {
          resolve(NO_CLAIM);
        }
        resolve(longClaimId);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getClaimIdByChannel: function getClaimIdByChannel(channelName, channelClaimId, claimName) {
    logger.debug('getClaimIdByChannel(' + channelName + ', ' + channelClaimId + ', ' + claimName + ')');
    return new Promise(function (resolve, reject) {
      db.Certificate.getLongChannelId(channelName, channelClaimId) // 1. get the long channel id
      .then(function (longChannelId) {
        if (!longChannelId) {
          return [null, null];
        }
        return Promise.all([longChannelId, db.Claim.getClaimIdByLongChannelId(longChannelId, claimName)]); // 2. get the long claim id
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            longChannelId = _ref2[0],
            longClaimId = _ref2[1];

        if (!longChannelId) {
          return resolve(NO_CHANNEL);
        }
        if (!longClaimId) {
          return resolve(NO_CLAIM);
        }
        resolve(longClaimId);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getChannelData: function getChannelData(channelName, channelClaimId, page) {
    return new Promise(function (resolve, reject) {
      // 1. get the long channel Id (make sure channel exists)
      db.Certificate.getLongChannelId(channelName, channelClaimId).then(function (longChannelClaimId) {
        if (!longChannelClaimId) {
          return [null, null, null];
        }
        // 2. get the short ID and all claims for that channel
        return Promise.all([longChannelClaimId, db.Certificate.getShortChannelIdFromLongChannelId(longChannelClaimId, channelName)]);
      }).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            longChannelClaimId = _ref4[0],
            shortChannelClaimId = _ref4[1];

        if (!longChannelClaimId) {
          return resolve(NO_CHANNEL);
        }
        // 3. return all the channel information
        resolve({
          channelName: channelName,
          longChannelClaimId: longChannelClaimId,
          shortChannelClaimId: shortChannelClaimId
        });
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getChannelClaims: function getChannelClaims(channelName, channelClaimId, page) {
    return new Promise(function (resolve, reject) {
      // 1. get the long channel Id (make sure channel exists)
      db.Certificate.getLongChannelId(channelName, channelClaimId).then(function (longChannelClaimId) {
        if (!longChannelClaimId) {
          return [null, null, null];
        }
        // 2. get the short ID and all claims for that channel
        return Promise.all([longChannelClaimId, db.Claim.getAllChannelClaims(longChannelClaimId)]);
      }).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            longChannelClaimId = _ref6[0],
            channelClaimsArray = _ref6[1];

        if (!longChannelClaimId) {
          return resolve(NO_CHANNEL);
        }
        // 3. format the data for the view, including pagination
        var paginatedChannelViewData = returnPaginatedChannelClaims(channelName, longChannelClaimId, channelClaimsArray, page);
        // 4. return all the channel information and contents
        resolve(paginatedChannelViewData);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getLocalFileRecord: function getLocalFileRecord(claimId, name) {
    return db.File.findOne({ where: { claimId: claimId, name: name } }).then(function (file) {
      if (!file) {
        return NO_FILE;
      }
      return file.dataValues;
    });
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(42);
var localLoginStrategy = __webpack_require__(43);
var localSignupStrategy = __webpack_require__(51);

var _require = __webpack_require__(55),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

passport.deserializeUser(deserializeSpeechUser);
passport.serializeUser(serializeSpeechUser);
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

module.exports = passport;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(0);
var db = __webpack_require__(2);
var lbryApi = __webpack_require__(5);
var publishHelpers = __webpack_require__(9);

var _require = __webpack_require__(3),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(13);
var Op = Sequelize.Op;

module.exports = {
  publish: function publish(publishParams, fileName, fileType) {
    return new Promise(function (resolve, reject) {
      var publishResults = void 0,
          certificateId = void 0,
          channelName = void 0;
      // publish the file
      return lbryApi.publishClaim(publishParams).then(function (tx) {
        logger.info('Successfully published ' + publishParams.name + ' ' + fileName, tx);
        publishResults = tx;
        // get the channel information
        if (publishParams.channel_name) {
          logger.debug('this claim was published in channel: ' + publishParams.channel_name);
          return db.Channel.findOne({
            where: {
              channelName: publishParams.channel_name
            }
          });
        } else {
          logger.debug('this claim was not published in a channel');
          return null;
        }
      }).then(function (channel) {
        // set channel information
        certificateId = null;
        channelName = null;
        if (channel) {
          certificateId = channel.channelClaimId;
          channelName = channel.channelName;
        }
        logger.debug('certificateId: ' + certificateId);
      }).then(function () {
        // create the File record
        var fileRecord = {
          name: publishParams.name,
          claimId: publishResults.claim_id,
          title: publishParams.metadata.title,
          description: publishParams.metadata.description,
          address: publishParams.claim_address,
          outpoint: publishResults.txid + ':' + publishResults.nout,
          height: 0,
          fileName: fileName,
          filePath: publishParams.file_path,
          fileType: fileType,
          nsfw: publishParams.metadata.nsfw
        };
        // create the Claim record
        var claimRecord = {
          name: publishParams.name,
          claimId: publishResults.claim_id,
          title: publishParams.metadata.title,
          description: publishParams.metadata.description,
          address: publishParams.claim_address,
          thumbnail: publishParams.metadata.thumbnail,
          outpoint: publishResults.txid + ':' + publishResults.nout,
          height: 0,
          contentType: fileType,
          nsfw: publishParams.metadata.nsfw,
          amount: publishParams.bid,
          certificateId: certificateId,
          channelName: channelName
        };
        // upsert criteria
        var upsertCriteria = {
          name: publishParams.name,
          claimId: publishResults.claim_id
        };
        // upsert the records
        return Promise.all([db.upsert(db.File, fileRecord, upsertCriteria, 'File'), db.upsert(db.Claim, claimRecord, upsertCriteria, 'Claim')]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            file = _ref2[0],
            claim = _ref2[1];

        logger.debug('File and Claim records successfully created');
        return Promise.all([file.setClaim(claim), claim.setFile(file)]);
      }).then(function () {
        logger.debug('File and Claim records successfully associated');
        resolve(publishResults); // resolve the promise with the result from lbryApi.publishClaim;
      }).catch(function (error) {
        logger.error('PUBLISH ERROR', error);
        publishHelpers.deleteTemporaryFile(publishParams.file_path); // delete the local file
        reject(error);
      });
    });
  },
  claimNameIsAvailable: function claimNameIsAvailable(name) {
    var claimAddresses = additionalClaimAddresses || [];
    claimAddresses.push(primaryClaimAddress);
    // find any records where the name is used
    return db.Claim.findAll({
      attributes: ['address'],
      where: {
        name: name,
        address: _defineProperty({}, Op.or, claimAddresses)
      }
    }).then(function (result) {
      if (result.length >= 1) {
        throw new Error('That claim is already in use');
      };
      return name;
    }).catch(function (error) {
      throw error;
    });
  },
  checkChannelAvailability: function checkChannelAvailability(name) {
    return db.Channel.findAll({
      where: { channelName: name }
    }).then(function (result) {
      if (result.length >= 1) {
        throw new Error('That channel has already been claimed');
      }
      return name;
    }).catch(function (error) {
      throw error;
    });
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var fs = __webpack_require__(63);

var _require = __webpack_require__(3),
    details = _require.details,
    publishing = _require.publishing;

module.exports = {
  parsePublishApiRequestBody: function parsePublishApiRequestBody(_ref) {
    var name = _ref.name,
        nsfw = _ref.nsfw,
        license = _ref.license,
        title = _ref.title,
        description = _ref.description,
        thumbnail = _ref.thumbnail;

    // validate name
    if (!name) {
      throw new Error('no name field found in request');
    }
    var invalidNameCharacters = /[^A-Za-z0-9,-]/.exec(name);
    if (invalidNameCharacters) {
      throw new Error('The claim name you provided is not allowed.  Only the following characters are allowed: A-Z, a-z, 0-9, and "-"');
    }
    // optional parameters
    nsfw = nsfw === 'true';
    license = license || null;
    title = title || null;
    description = description || null;
    thumbnail = thumbnail || null;
    // return results
    return {
      name: name,
      nsfw: nsfw,
      license: license,
      title: title,
      description: description,
      thumbnail: thumbnail
    };
  },
  parsePublishApiRequestFiles: function parsePublishApiRequestFiles(_ref2) {
    var file = _ref2.file,
        thumbnail = _ref2.thumbnail;

    // make sure a file was provided
    if (!file) {
      throw new Error('no file with key of [file] found in request');
    }
    if (!file.path) {
      throw new Error('no file path found');
    }
    if (!file.type) {
      throw new Error('no file type found');
    }
    if (!file.size) {
      throw new Error('no file type found');
    }
    // validate the file name
    if (/'/.test(file.name)) {
      throw new Error('apostrophes are not allowed in the file name');
    }
    // validate the file
    module.exports.validateFileTypeAndSize(file);
    // return results
    return {
      fileName: file.name,
      filePath: file.path,
      fileType: file.type,
      thumbnailFileName: thumbnail ? thumbnail.name : null,
      thumbnailFilePath: thumbnail ? thumbnail.path : null,
      thumbnailFileType: thumbnail ? thumbnail.type : null
    };
  },
  validateFileTypeAndSize: function validateFileTypeAndSize(file) {
    // check file type and size
    switch (file.type) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        if (file.size > 10000000) {
          logger.debug('publish > file validation > .jpeg/.jpg/.png was too big');
          throw new Error('Sorry, images are limited to 10 megabytes.');
        }
        break;
      case 'image/gif':
        if (file.size > 50000000) {
          logger.debug('publish > file validation > .gif was too big');
          throw new Error('Sorry, .gifs are limited to 50 megabytes.');
        }
        break;
      case 'video/mp4':
        if (file.size > 50000000) {
          logger.debug('publish > file validation > .mp4 was too big');
          throw new Error('Sorry, videos are limited to 50 megabytes.');
        }
        break;
      default:
        logger.debug('publish > file validation > unrecognized file type');
        throw new Error('The ' + file.type + ' content type is not supported.  Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
    }
    return file;
  },
  createBasicPublishParams: function createBasicPublishParams(filePath, name, title, description, license, nsfw, thumbnail) {
    logger.debug('Creating Publish Parameters');
    // provide defaults for title
    if (title === null || title.trim() === '') {
      title = name;
    }
    // provide default for description
    if (description === null || description.trim() === '') {
      description = '';
    }
    // provide default for license
    if (license === null || license.trim() === '') {
      license = ' '; // default to empty string
    }
    // create the publish params
    var publishParams = {
      name: name,
      file_path: filePath,
      bid: 0.01,
      metadata: {
        description: description,
        title: title,
        author: details.title,
        language: 'en',
        license: license,
        nsfw: nsfw
      },
      claim_address: publishing.primaryClaimAddress
    };
    // add thumbnail to channel if video
    if (thumbnail) {
      publishParams['metadata']['thumbnail'] = thumbnail;
    }
    return publishParams;
  },
  createThumbnailPublishParams: function createThumbnailPublishParams(thumbnailFilePath, claimName, license, nsfw) {
    if (!thumbnailFilePath) {
      return;
    }
    logger.debug('Creating Thumbnail Publish Parameters');
    // create the publish params
    return {
      name: claimName + '-thumb',
      file_path: thumbnailFilePath,
      bid: 0.01,
      metadata: {
        title: claimName + ' thumbnail',
        description: 'a thumbnail for ' + claimName,
        author: details.title,
        language: 'en',
        license: license,
        nsfw: nsfw
      },
      claim_address: publishing.primaryClaimAddress,
      channel_name: publishing.thumbnailChannel,
      channel_id: publishing.thumbnailChannelId
    };
  },
  deleteTemporaryFile: function deleteTemporaryFile(filePath) {
    fs.unlink(filePath, function (err) {
      if (err) {
        logger.error('error deleting temporary file ' + filePath);
        throw err;
      }
      logger.debug('successfully deleted ' + filePath);
    });
  },
  addGetResultsToFileData: function addGetResultsToFileData(fileInfo, getResult) {
    fileInfo.fileName = getResult.file_name;
    fileInfo.filePath = getResult.download_path;
    return fileInfo;
  },
  createFileData: function createFileData(_ref3) {
    var name = _ref3.name,
        claimId = _ref3.claimId,
        outpoint = _ref3.outpoint,
        height = _ref3.height,
        address = _ref3.address,
        nsfw = _ref3.nsfw,
        contentType = _ref3.contentType;

    return {
      name: name,
      claimId: claimId,
      outpoint: outpoint,
      height: height,
      address: address,
      fileName: '',
      filePath: '',
      fileType: contentType,
      nsfw: nsfw
    };
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

function mysql() {
  var _this = this;

  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.update = function (config) {
    if (!config) {
      return logger.warn('No MySQL config received.');
    }
    // configure credentials
    logger.info('configuring mysql...');
    var database = config.database,
        username = config.username,
        password = config.password;

    _this.database = database;
    _this.username = username;
    _this.password = password;
  };
};

module.exports = new mysql();

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(16);

var _redux = __webpack_require__(17);

var _reactRedux = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(19);

var _spee = __webpack_require__(20);

var _renderFullPage = __webpack_require__(21);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(22);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  ^ note: to do this right, maybe
  these should be passed in from the implementation (www.spee.ch) itself,
  so that there are no conflicts between the SSR here and
  the bundle sent to the server?
  there might also be issues if this package uses a different version of spee.ch-components than www.spee.ch does?
*/
var siteConfig = __webpack_require__(3);

module.exports = function (req, res) {
  var context = {};

  // customize the reducer by passing in intial state configs
  var MyReducers = (0, _spee.Reducers)(siteConfig);
  var MyApp = (0, _spee.App)(siteConfig);
  var MyGAListener = (0, _spee.GAListener)(siteConfig);

  // create a new Redux store instance
  var store = (0, _redux.createStore)(MyReducers);

  // render component to a string
  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(
        MyGAListener,
        null,
        _react2.default.createElement(MyApp, null)
      )
    )
  ));

  // get head tags from helmet
  var helmet = _reactHelmet2.default.renderStatic();

  // check for a redirect
  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url);
  } else {}
  // we're good, send the response


  // get the initial state from our Redux store
  var preloadedState = store.getState();

  // send the rendered page back to the client
  res.send((0, _renderFullPage2.default)(helmet, html, preloadedState));

  console.log('hello from spee.ch handlePageRender.jsx');
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("spee.ch-components");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helmet, html, preloadedState) {
    // take the html and preloadedState and return the full page
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(6),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(1),
    handleErrorResponse = _require2.handleErrorResponse;

var SERVE = 'SERVE';
var SHOW = 'SHOW';
var NO_FILE = 'NO_FILE';
var NO_CHANNEL = 'NO_CHANNEL';
var NO_CLAIM = 'NO_CLAIM';

function clientAcceptsHtml(_ref) {
  var accept = _ref.accept;

  return accept && accept.match(/text\/html/);
};

function requestIsFromBrowser(headers) {
  return headers['user-agent'] && headers['user-agent'].match(/Mozilla/);
};

function clientWantsAsset(_ref2) {
  var accept = _ref2.accept,
      range = _ref2.range;

  var imageIsWanted = accept && accept.match(/image\/.*/) && !accept.match(/text\/html/) && !accept.match(/text\/\*/);
  var videoIsWanted = accept && range;
  return imageIsWanted || videoIsWanted;
};

function isValidClaimId(claimId) {
  return claimId.length === 40 && !/[^A-Za-z0-9]/g.test(claimId);
};

function isValidShortId(claimId) {
  return claimId.length === 1; // it should really evaluate the short url itself
};

function isValidShortIdOrClaimId(input) {
  return isValidClaimId(input) || isValidShortId(input);
};

function serveAssetToClient(claimId, name, res) {
  return getLocalFileRecord(claimId, name).then(function (fileRecord) {
    // check that a local record was found
    if (fileRecord === NO_FILE) {
      return res.status(307).redirect('/api/claim/get/' + name + '/' + claimId);
    }
    // serve the file
    var filePath = fileRecord.filePath,
        fileType = fileRecord.fileType;

    logger.verbose('serving file: ' + filePath);
    var sendFileOptions = {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Content-Type': fileType || 'image/jpeg'
      }
    };
    res.status(200).sendFile(filePath, sendFileOptions);
  }).catch(function (error) {
    throw error;
  });
};

module.exports = {
  getClaimIdAndServeAsset: function getClaimIdAndServeAsset(channelName, channelClaimId, claimName, claimId, originalUrl, ip, res) {
    // get the claim Id and then serve the asset
    getClaimId(channelName, channelClaimId, claimName, claimId).then(function (fullClaimId) {
      if (fullClaimId === NO_CLAIM) {
        return res.status(404).json({ success: false, message: 'no claim id could be found' });
      } else if (fullClaimId === NO_CHANNEL) {
        return res.status(404).json({ success: false, message: 'no channel id could be found' });
      }
      serveAssetToClient(fullClaimId, claimName, res);
      // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'success');
    }).catch(function (error) {
      handleErrorResponse(originalUrl, ip, error, res);
      // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'fail');
    });
  },
  determineResponseType: function determineResponseType(hasFileExtension, headers) {
    var responseType = void 0;
    if (hasFileExtension) {
      responseType = SERVE; // assume a serve request if file extension is present
      if (clientAcceptsHtml(headers)) {
        // if the request comes from a browser, change it to a show request
        responseType = SHOW;
      }
    } else {
      responseType = SHOW;
      if (clientWantsAsset(headers) && requestIsFromBrowser(headers)) {
        // this is in case someone embeds a show url
        logger.debug('Show request came from browser but wants an image/video. Changing response to serve...');
        responseType = SERVE;
      }
    }
    return responseType;
  },
  flipClaimNameAndIdForBackwardsCompatibility: function flipClaimNameAndIdForBackwardsCompatibility(identifier, name) {
    // this is a patch for backwards compatability with '/name/claim_id' url format
    if (isValidShortIdOrClaimId(name) && !isValidShortIdOrClaimId(identifier)) {
      var tempName = name;
      name = identifier;
      identifier = tempName;
    }
    return [identifier, name];
  },
  logRequestData: function logRequestData(responseType, claimName, channelName, claimId) {
    logger.debug('responseType ===', responseType);
    logger.debug('claim name === ', claimName);
    logger.debug('channel name ===', channelName);
    logger.debug('claim id ===', claimId);
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(0);

module.exports = {
  REGEXP_INVALID_CLAIM: /[^A-Za-z0-9-]/g,
  REGEXP_INVALID_CHANNEL: /[^A-Za-z0-9-@]/g,
  REGEXP_ADDRESS: /^b(?=[^0OIl]{32,33})[0-9A-Za-z]{32,33}$/,
  CHANNEL_CHAR: '@',
  parseIdentifier: function parseIdentifier(identifier) {
    logger.debug('parsing identifier:', identifier);
    var componentsRegex = new RegExp('([^:$#/]*)' + // value (stops at the first separator or end)
    '([:$#]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );

    var _componentsRegex$exec = componentsRegex.exec(identifier).map(function (match) {
      return match || null;
    }),
        _componentsRegex$exec2 = _slicedToArray(_componentsRegex$exec, 4),
        proto = _componentsRegex$exec2[0],
        value = _componentsRegex$exec2[1],
        modifierSeperator = _componentsRegex$exec2[2],
        modifier = _componentsRegex$exec2[3];

    logger.debug(proto + ', ' + value + ', ' + modifierSeperator + ', ' + modifier);

    // Validate and process name
    if (!value) {
      throw new Error('Check your url.  No channel name provided before "' + modifierSeperator + '"');
    }
    var isChannel = value.startsWith(module.exports.CHANNEL_CHAR);
    var channelName = isChannel ? value : null;
    var claimId = void 0;
    if (isChannel) {
      if (!channelName) {
        throw new Error('No channel name after @.');
      }
      var nameBadChars = channelName.match(module.exports.REGEXP_INVALID_CHANNEL);
      if (nameBadChars) {
        throw new Error('Invalid characters in channel name: ' + nameBadChars.join(', ') + '.');
      }
    } else {
      claimId = value;
    }

    // Validate and process modifier
    var channelClaimId = void 0;
    if (modifierSeperator) {
      if (!modifier) {
        throw new Error('No modifier provided after separator "' + modifierSeperator + '"');
      }

      if (modifierSeperator === ':') {
        channelClaimId = modifier;
      } else {
        throw new Error('The "' + modifierSeperator + '" modifier is not currently supported');
      }
    }
    return {
      isChannel: isChannel,
      channelName: channelName,
      channelClaimId: channelClaimId,
      claimId: claimId
    };
  },
  parseClaim: function parseClaim(claim) {
    logger.debug('parsing name:', claim);
    var componentsRegex = new RegExp('([^:$#/.]*)' + // name (stops at the first modifier)
    '([:$#.]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );

    var _componentsRegex$exec3 = componentsRegex.exec(claim).map(function (match) {
      return match || null;
    }),
        _componentsRegex$exec4 = _slicedToArray(_componentsRegex$exec3, 4),
        proto = _componentsRegex$exec4[0],
        claimName = _componentsRegex$exec4[1],
        modifierSeperator = _componentsRegex$exec4[2],
        modifier = _componentsRegex$exec4[3];

    logger.debug(proto + ', ' + claimName + ', ' + modifierSeperator + ', ' + modifier);

    // Validate and process name
    if (!claimName) {
      throw new Error('No claim name provided before .');
    }
    var nameBadChars = claimName.match(module.exports.REGEXP_INVALID_CLAIM);
    if (nameBadChars) {
      throw new Error('Invalid characters in claim name: ' + nameBadChars.join(', ') + '.');
    }
    // Validate and process modifier
    if (modifierSeperator) {
      if (!modifier) {
        throw new Error('No file extension provided after separator ' + modifierSeperator + '.');
      }
      if (modifierSeperator !== '.') {
        throw new Error('The ' + modifierSeperator + ' modifier is not supported in the claim name');
      }
    }
    // return results
    return {
      claimName: claimName
    };
  },
  parseModifier: function parseModifier(claim) {
    logger.debug('parsing modifier:', claim);
    var componentsRegex = new RegExp('([^:$#/.]*)' + // name (stops at the first modifier)
    '([:$#.]?)([^/]*)' // modifier separator, modifier (stops at the first path separator or end)
    );

    var _componentsRegex$exec5 = componentsRegex.exec(claim).map(function (match) {
      return match || null;
    }),
        _componentsRegex$exec6 = _slicedToArray(_componentsRegex$exec5, 4),
        proto = _componentsRegex$exec6[0],
        claimName = _componentsRegex$exec6[1],
        modifierSeperator = _componentsRegex$exec6[2],
        modifier = _componentsRegex$exec6[3];

    logger.debug(proto + ', ' + claimName + ', ' + modifierSeperator + ', ' + modifier);
    // Validate and process modifier
    var hasFileExtension = false;
    if (modifierSeperator) {
      hasFileExtension = true;
    }
    return {
      hasFileExtension: hasFileExtension
    };
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(16);

var _redux = __webpack_require__(17);

var _reactRedux = __webpack_require__(18);

var _reactRouterDom = __webpack_require__(19);

var _renderFullPage = __webpack_require__(21);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(86);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(87);

var _spee = __webpack_require__(20);

var _reactHelmet = __webpack_require__(22);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var siteConfig = __webpack_require__(3);
/*
  ^ note: to do this right, maybe
  these should be passed in from the implementation (www.spee.ch) itself,
  so that there are no conflicts between the SSR here and
  the bundle sent to the server?
  there might also be issues if this package uses a different version of spee.ch-components than www.spee.ch does?
*/


var returnSagaWithParams = function returnSagaWithParams(saga, params) {
  return (/*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _effects.call)(saga, params);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })
  );
};

module.exports = function (req, res) {
  var context = {};

  // configure the reducers by passing initial state configs
  var MyReducers = (0, _spee.Reducers)(siteConfig);
  var MyApp = (0, _spee.App)(siteConfig);
  var MyGAListener = (0, _spee.GAListener)(siteConfig);

  // create and apply middleware
  var sagaMiddleware = (0, _reduxSaga2.default)();
  var middleware = (0, _redux.applyMiddleware)(sagaMiddleware);

  // create a new Redux store instance
  var store = (0, _redux.createStore)(MyReducers, middleware);

  // create saga
  var action = _spee.Actions.onHandleShowPageUri(req.params);
  var saga = returnSagaWithParams(_spee.Sagas.handleShowPageUri, action);

  // run the saga middleware
  sagaMiddleware.run(saga).done.then(function () {
    // render component to a string
    var html = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: req.url, context: context },
        _react2.default.createElement(
          MyGAListener,
          null,
          _react2.default.createElement(MyApp, null)
        )
      )
    ));

    // get head tags from helmet
    var helmet = _reactHelmet2.default.renderStatic();

    // check for a redirect
    if (context.url) {
      return res.redirect(301, context.url);
    }

    // get the initial state from our Redux store
    var preloadedState = store.getState();

    // send the rendered page back to the client
    res.send((0, _renderFullPage2.default)(helmet, html, preloadedState));
  });

  console.log('hello from spee.ch handleShowRender.jsx');
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(28);
module.exports = __webpack_require__(29);


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(30);
var bodyParser = __webpack_require__(31);
var expressHandlebars = __webpack_require__(32);
var Handlebars = __webpack_require__(33);
var helmet = __webpack_require__(34);
var cookieSession = __webpack_require__(35);
var http = __webpack_require__(36);
var logger = __webpack_require__(0);
var requestLogger = __webpack_require__(37);
var Path = __webpack_require__(38);
var loggerConfig = __webpack_require__(39);
var mysqlConfig = __webpack_require__(10);
var siteConfig = __webpack_require__(3);
var slackConfig = __webpack_require__(40);

function Server() {
  var _this = this;

  this.configureLogger = function (userConfig) {
    loggerConfig.update(userConfig);
  };
  this.configureMysql = function (userConfig) {
    mysqlConfig.update(userConfig);
  };
  this.configureSite = function (userConfig) {
    siteConfig.update(userConfig);
  };
  this.configureSlack = function (userConfig) {
    slackConfig.update(userConfig);
  };
  this.configureModels = function () {
    logger.debug('here is where you could add/overwrite the default models');
  };
  this.configureRoutes = function () {
    logger.debug('here is where you could add/overwrite the default routes');
  };
  this.createApp = function () {
    // create an Express application
    var app = express();

    // trust the proxy to get ip address for us
    app.enable('trust proxy');

    /* add middleware */
    // set HTTP headers to protect against well-known web vulnerabilties
    app.use(helmet());
    // 'express.static' to serve static files from public directory
    if (siteConfig.routes.publicFolder) {
      // take in a different public folder, so it can serve it's own bundle if needed
      var publicFolder = Path.resolve(process.cwd(), siteConfig.routes.publicFolder);
      app.use(express.static(publicFolder));
      logger.info('serving static files from custom path:', publicFolder);
    } else {
      var publicPath = Path.resolve(process.cwd(), 'public');
      app.use(express.static(publicPath));
      logger.warn('serving static files from default static path at ' + publicPath + '.  Please specify a path in your config/siteConfig.js file');
    };
    // 'body parser' for parsing application/json
    app.use(bodyParser.json());
    // 'body parser' for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // add custom middleware (note: build out to accept dynamically use what is in server/middleware/
    app.use(requestLogger);

    // configure passport
    var speechPassport = __webpack_require__(7);
    // initialize passport
    var sessionKey = siteConfig.auth.sessionKey;
    app.use(cookieSession({
      name: 'session',
      keys: [sessionKey],
      maxAge: 24 * 60 * 60 * 1000 // i.e. 24 hours
    }));
    app.use(speechPassport.initialize());
    app.use(speechPassport.session());

    // configure handlebars & register it with express app
    var hbs = expressHandlebars.create({
      defaultLayout: 'embed',
      handlebars: Handlebars
    });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // set the routes on the app
    __webpack_require__(56)(app);
    __webpack_require__(61)(app);
    __webpack_require__(80)(app);
    __webpack_require__(84)(app);
    __webpack_require__(89)(app);

    _this.app = app;
  };
  this.initialize = function () {
    _this.createApp();
    _this.server = http.Server(_this.app);
  };
  this.start = function () {
    var db = __webpack_require__(2);
    var PORT = siteConfig.details.port;
    // sync sequelize
    db.sequelize.sync()
    // start the server
    .then(function () {
      _this.server.listen(PORT, function () {
        logger.info('Server is listening on PORT ' + PORT);
      });
    }).catch(function (error) {
      logger.error('Startup Error:', error);
    });
  };
};

module.exports = Server;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var requestLogger = function requestLogger(req, res, next) {
  // custom logging middleware to log all incoming http requests
  logger.verbose('Request on ' + req.originalUrl + ' from ' + req.ip);
  next();
};

module.exports = requestLogger;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

function LoggerConfig() {
  var _this = this;

  this.logLevel = 'debug';
  this.update = function (config) {
    if (!config) {
      return logger.warn('No logger config received.');
    }
    logger.info('configuring winston logger...');
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
    logger.info('testing winston log levels...');
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(41).SlackWebHook;
var winston = __webpack_require__(0);

function SlackConfig() {
  var _this = this;

  this.slackWebHook = 'default';
  this.slackErrorChannel = 'default';
  this.slackInfoChannel = 'default';
  this.update = function (config) {
    if (!config) {
      return winston.warn('No slack config received');
    }
    // update variables
    winston.info('configuring slack logger...');
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
      winston.info('testing slack logger...');
      winston.error('Slack "error" logging is online.');
      winston.info('Slack "info" logging is online.');
    } else {
      winston.warn('Slack logging is not enabled because no slackWebHook config var provided.');
    }
  };
};

module.exports = new SlackConfig();

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(11).Strategy;
var logger = __webpack_require__(0);
var db = __webpack_require__(2);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(12),
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
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(12),
    returnShortId = _require.returnShortId;

var _require2 = __webpack_require__(3),
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
/* 47 */
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
/* 48 */
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(50);
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
/* 50 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(11).Strategy;
var lbryApi = __webpack_require__(5);
var logger = __webpack_require__(0);
var db = __webpack_require__(2);

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
/* 52 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 53 */
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
/* 54 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 55 */
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(7);
var handleSignupRequest = __webpack_require__(57);
var handleLoginRequest = __webpack_require__(58);
var handleLogoutRequest = __webpack_require__(59);
var handleUserRequest = __webpack_require__(60);

module.exports = function (app) {
  app.post('/signup', speechPassport.authenticate('local-signup'), handleSignupRequest);
  app.post('/login', handleLoginRequest);
  app.get('/logout', handleLogoutRequest);
  app.get('/user', handleUserRequest);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var signup = function signup(req, res) {
  res.status(200).json({
    success: true,
    channelName: req.user.channelName,
    channelClaimId: req.user.channelClaimId,
    shortChannelId: req.user.shortChannelId
  });
};

module.exports = signup;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(7);

var login = function login(req, res, next) {
  speechPassport.authenticate('local-login', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        channelName: req.user.channelName,
        channelClaimId: req.user.channelClaimId,
        shortChannelId: req.user.shortChannelId
      });
    });
  })(req, res, next);
};

module.exports = login;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logout = function logout(req, res) {
  req.logout();
  res.status(200).json({ success: true, message: 'you successfully logged out' });
};

module.exports = logout;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var user = function user(req, res) {
  if (req.user) {
    res.status(200).json({ success: true, data: req.user });
  } else {
    res.status(401).json({ success: false, message: 'user is not logged in' });
  }
};

module.exports = user;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var channelAvailability = __webpack_require__(62);
var channelClaims = __webpack_require__(64);
var channelData = __webpack_require__(66);
var channelShortId = __webpack_require__(67);
var claimAvailability = __webpack_require__(68);
var claimData = __webpack_require__(69);
var claimGet = __webpack_require__(70);
var claimLongId = __webpack_require__(71);
var claimPublish = __webpack_require__(72);
var claimResolve = __webpack_require__(74);
var claimShortId = __webpack_require__(75);
var claimList = __webpack_require__(76);
var fileAvailability = __webpack_require__(77);

var multipartMiddleware = __webpack_require__(78);

module.exports = function (app) {
  // channel routes
  app.get('/api/channel/availability/:name', channelAvailability);
  app.get('/api/channel/short-id/:longId/:name', channelShortId);
  app.get('/api/channel/data/:channelName/:channelClaimId', channelData);
  app.get('/api/channel/claims/:channelName/:channelClaimId/:page', channelClaims);
  // claim routes
  app.get('/api/claim/list/:name', claimList);
  app.get('/api/claim/get/:name/:claimId', claimGet);
  app.get('/api/claim/availability/:name', claimAvailability);
  app.get('/api/claim/resolve/:name/:claimId', claimResolve);
  app.post('/api/claim/publish', multipartMiddleware, claimPublish);
  app.get('/api/claim/short-id/:longId/:name', claimShortId);
  app.post('/api/claim/long-id', claimLongId);
  app.get('/api/claim/data/:claimName/:claimId', claimData);
  // file routes
  app.get('/api/file/availability/:name/:claimId', fileAvailability);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    checkChannelAvailability = _require.checkChannelAvailability;

var _require2 = __webpack_require__(4),
    sendGATimingEvent = _require2.sendGATimingEvent;

var _require3 = __webpack_require__(1),
    handleErrorResponse = _require3.handleErrorResponse;

/*

  route to check whether site has published to a channel

*/

var channelAvailability = function channelAvailability(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      name = _ref.params.name;

  var gaStartTime = Date.now();
  checkChannelAvailability(name).then(function (availableName) {
    res.status(200).json(availableName);
    sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = channelAvailability;

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(6),
    getChannelClaims = _require.getChannelClaims;

var _require2 = __webpack_require__(1),
    handleErrorResponse = _require2.handleErrorResponse;

var NO_CHANNEL = 'NO_CHANNEL';

/*

  route to get all claims for channel

*/

var channelClaims = function channelClaims(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

  var channelName = params.channelName;
  var channelClaimId = params.channelClaimId;
  if (channelClaimId === 'none') channelClaimId = null;
  var page = params.page;
  getChannelClaims(channelName, channelClaimId, page).then(function (data) {
    if (data === NO_CHANNEL) {
      return res.status(404).json({ success: false, message: 'No matching channel was found' });
    }
    res.status(200).json({ success: true, data: data });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = channelClaims;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CLAIMS_PER_PAGE = 12;

module.exports = {
  returnPaginatedChannelClaims: function returnPaginatedChannelClaims(channelName, longChannelClaimId, claims, page) {
    var totalPages = module.exports.determineTotalPages(claims);
    var paginationPage = module.exports.getPageFromQuery(page);
    var viewData = {
      channelName: channelName,
      longChannelClaimId: longChannelClaimId,
      claims: module.exports.extractPageFromClaims(claims, paginationPage),
      previousPage: module.exports.determinePreviousPage(paginationPage),
      currentPage: paginationPage,
      nextPage: module.exports.determineNextPage(totalPages, paginationPage),
      totalPages: totalPages,
      totalResults: module.exports.determineTotalClaims(claims)
    };
    return viewData;
  },
  getPageFromQuery: function getPageFromQuery(page) {
    if (page) {
      return parseInt(page);
    }
    return 1;
  },
  extractPageFromClaims: function extractPageFromClaims(claims, pageNumber) {
    if (!claims) {
      return []; // if no claims, return this default
    }
    // logger.debug('claims is array?', Array.isArray(claims));
    // logger.debug(`pageNumber ${pageNumber} is number?`, Number.isInteger(pageNumber));
    var claimStartIndex = (pageNumber - 1) * CLAIMS_PER_PAGE;
    var claimEndIndex = claimStartIndex + CLAIMS_PER_PAGE;
    var pageOfClaims = claims.slice(claimStartIndex, claimEndIndex);
    return pageOfClaims;
  },
  determineTotalPages: function determineTotalPages(claims) {
    if (!claims) {
      return 0;
    } else {
      var totalClaims = claims.length;
      if (totalClaims < CLAIMS_PER_PAGE) {
        return 1;
      }
      var fullPages = Math.floor(totalClaims / CLAIMS_PER_PAGE);
      var remainder = totalClaims % CLAIMS_PER_PAGE;
      if (remainder === 0) {
        return fullPages;
      }
      return fullPages + 1;
    }
  },
  determinePreviousPage: function determinePreviousPage(currentPage) {
    if (currentPage === 1) {
      return null;
    }
    return currentPage - 1;
  },
  determineNextPage: function determineNextPage(totalPages, currentPage) {
    if (currentPage === totalPages) {
      return null;
    }
    return currentPage + 1;
  },
  determineTotalClaims: function determineTotalClaims(claims) {
    if (!claims) {
      return 0;
    }
    return claims.length;
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(6),
    getChannelData = _require.getChannelData;

var _require2 = __webpack_require__(1),
    handleErrorResponse = _require2.handleErrorResponse;

var NO_CHANNEL = 'NO_CHANNEL';

/*

  route to get data for a channel

*/

var channelData = function channelData(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

  var channelName = params.channelName;
  var channelClaimId = params.channelClaimId;
  if (channelClaimId === 'none') channelClaimId = null;
  getChannelData(channelName, channelClaimId, 0).then(function (data) {
    if (data === NO_CHANNEL) {
      return res.status(404).json({ success: false, message: 'No matching channel was found' });
    }
    res.status(200).json({ success: true, data: data });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = channelData;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(2);

/*

route to get a short channel id from long channel Id

*/

var channelShortIdRoute = function channelShortIdRoute(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name).then(function (shortId) {
    res.status(200).json(shortId);
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = channelShortIdRoute;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    claimNameIsAvailable = _require.claimNameIsAvailable;

var _require2 = __webpack_require__(4),
    sendGATimingEvent = _require2.sendGATimingEvent;

var _require3 = __webpack_require__(1),
    handleErrorResponse = _require3.handleErrorResponse;

/*

  route to check whether this site published to a claim

*/

var claimAvailability = function claimAvailability(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      name = _ref.params.name;

  var gaStartTime = Date.now();
  claimNameIsAvailable(name).then(function (result) {
    res.status(200).json(result);
    sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimAvailability;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(2);

/*

  route to return data for a claim

*/

var claimData = function claimData(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

  var claimName = params.claimName;
  var claimId = params.claimId;
  if (claimId === 'none') claimId = null;
  db.Claim.resolveClaim(claimName, claimId).then(function (claimInfo) {
    if (!claimInfo) {
      return res.status(404).json({ success: false, message: 'No claim could be found' });
    }
    res.status(200).json({ success: true, data: claimInfo });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimData;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(5),
    getClaim = _require.getClaim;

var _require2 = __webpack_require__(9),
    addGetResultsToFileData = _require2.addGetResultsToFileData,
    createFileData = _require2.createFileData;

var _require3 = __webpack_require__(1),
    handleErrorResponse = _require3.handleErrorResponse;

var db = __webpack_require__(2);

/*

  route to get a claim

*/

var claimGet = function claimGet(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  var name = params.name;
  var claimId = params.claimId;
  // resolve the claim
  db.Claim.resolveClaim(name, claimId).then(function (resolveResult) {
    // make sure a claim actually exists at that uri
    if (!resolveResult) {
      throw new Error('No matching uri found in Claim table');
    }
    var fileData = createFileData(resolveResult);
    // get the claim
    return Promise.all([fileData, getClaim(name + '#' + claimId)]);
  }).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        fileData = _ref3[0],
        getResult = _ref3[1];

    fileData = addGetResultsToFileData(fileData, getResult);
    return Promise.all([db.upsert(db.File, fileData, { name: name, claimId: claimId }, 'File'), getResult]);
  }).then(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        fileRecord = _ref5[0],
        _ref5$ = _ref5[1],
        message = _ref5$.message,
        completed = _ref5$.completed;

    res.status(200).json({ success: true, message: message, completed: completed });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimGet;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(6),
    getClaimId = _require.getClaimId;

var _require2 = __webpack_require__(1),
    handleErrorResponse = _require2.handleErrorResponse;

var NO_CHANNEL = 'NO_CHANNEL';
var NO_CLAIM = 'NO_CLAIM';

/*

  route to get a long claim id

*/

var claimLongId = function claimLongId(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

  var channelName = body.channelName;
  var channelClaimId = body.channelClaimId;
  var claimName = body.claimName;
  var claimId = body.claimId;
  getClaimId(channelName, channelClaimId, claimName, claimId).then(function (result) {
    if (result === NO_CHANNEL) {
      return res.status(404).json({ success: false, message: 'No matching channel could be found' });
    }
    if (result === NO_CLAIM) {
      return res.status(404).json({ success: false, message: 'No matching claim id could be found' });
    }
    res.status(200).json({ success: true, data: result });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimLongId;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(9),
    createBasicPublishParams = _require.createBasicPublishParams,
    createThumbnailPublishParams = _require.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require.parsePublishApiRequestFiles;

var _require2 = __webpack_require__(8),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    publish = _require2.publish;

var _require3 = __webpack_require__(73),
    authenticateUser = _require3.authenticateUser;

var _require4 = __webpack_require__(4),
    sendGATimingEvent = _require4.sendGATimingEvent;

var _require5 = __webpack_require__(1),
    handleErrorResponse = _require5.handleErrorResponse;

var _require6 = __webpack_require__(3),
    host = _require6.details.host;

/*

  route to publish a claim through the daemon

*/

var claimPublish = function claimPublish(_ref, res) {
  var body = _ref.body,
      files = _ref.files,
      headers = _ref.headers,
      ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      user = _ref.user;

  // define variables
  var channelName = void 0,
      channelId = void 0,
      channelPassword = void 0,
      description = void 0,
      fileName = void 0,
      filePath = void 0,
      fileType = void 0,
      gaStartTime = void 0,
      license = void 0,
      name = void 0,
      nsfw = void 0,
      thumbnail = void 0,
      thumbnailFileName = void 0,
      thumbnailFilePath = void 0,
      thumbnailFileType = void 0,
      title = void 0;
  // record the start time of the request
  gaStartTime = Date.now();
  // validate the body and files of the request
  try {
    var _parsePublishApiReque = parsePublishApiRequestBody(body);
    // validateApiPublishRequest(body, files);


    name = _parsePublishApiReque.name;
    nsfw = _parsePublishApiReque.nsfw;
    license = _parsePublishApiReque.license;
    title = _parsePublishApiReque.title;
    description = _parsePublishApiReque.description;
    thumbnail = _parsePublishApiReque.thumbnail;

    var _parsePublishApiReque2 = parsePublishApiRequestFiles(files);

    fileName = _parsePublishApiReque2.fileName;
    filePath = _parsePublishApiReque2.filePath;
    fileType = _parsePublishApiReque2.fileType;
    thumbnailFileName = _parsePublishApiReque2.thumbnailFileName;
    thumbnailFilePath = _parsePublishApiReque2.thumbnailFilePath;
    thumbnailFileType = _parsePublishApiReque2.thumbnailFileType;
    channelName = body.channelName;
    channelId = body.channelId;
    channelPassword = body.channelPassword;
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  // check channel authorization
  Promise.all([authenticateUser(channelName, channelId, channelPassword, user), claimNameIsAvailable(name), createBasicPublishParams(filePath, name, title, description, license, nsfw, thumbnail), createThumbnailPublishParams(thumbnailFilePath, name, license, nsfw)]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 4),
        _ref3$ = _ref3[0],
        channelName = _ref3$.channelName,
        channelClaimId = _ref3$.channelClaimId,
        validatedClaimName = _ref3[1],
        publishParams = _ref3[2],
        thumbnailPublishParams = _ref3[3];

    // add channel details to the publish params
    if (channelName && channelClaimId) {
      publishParams['channel_name'] = channelName;
      publishParams['channel_id'] = channelClaimId;
    }
    // publish the thumbnail
    if (thumbnailPublishParams) {
      publish(thumbnailPublishParams, thumbnailFileName, thumbnailFileType);
    }
    // publish the asset
    return publish(publishParams, fileName, fileType);
  }).then(function (result) {
    res.status(200).json({
      success: true,
      message: 'publish completed successfully',
      data: {
        name: name,
        claimId: result.claim_id,
        url: host + '/' + result.claim_id + '/' + name,
        lbryTx: result
      }
    });
    // record the publish end time and send to google analytics
    sendGATimingEvent('end-to-end', 'publish', fileType, gaStartTime, Date.now());
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimPublish;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(2);
var logger = __webpack_require__(0);

module.exports = {
  authenticateUser: function authenticateUser(channelName, channelId, channelPassword, user) {
    // case: no channelName or channel Id are provided (anonymous), regardless of whether user token is provided
    if (!channelName && !channelId) {
      return {
        channelName: null,
        channelClaimId: null
      };
    }
    // case: channelName or channel Id are provided with user token
    if (user) {
      if (channelName && channelName !== user.channelName) {
        throw new Error('the provided channel name does not match user credentials');
      }
      if (channelId && channelId !== user.channelClaimId) {
        throw new Error('the provided channel id does not match user credentials');
      }
      return {
        channelName: user.channelName,
        channelClaimId: user.channelClaimId
      };
    }
    // case: channelName or channel Id are provided with password instead of user token
    if (!channelPassword) throw new Error('no channel password provided');
    return module.exports.authenticateChannelCredentials(channelName, channelId, channelPassword);
  },
  authenticateChannelCredentials: function authenticateChannelCredentials(channelName, channelId, userPassword) {
    return new Promise(function (resolve, reject) {
      // hoisted variables
      var channelData = void 0;
      // build the params for finding the channel
      var channelFindParams = {};
      if (channelName) channelFindParams['channelName'] = channelName;
      if (channelId) channelFindParams['channelClaimId'] = channelId;
      // find the channel
      db.Channel.findOne({
        where: channelFindParams
      }).then(function (channel) {
        if (!channel) {
          logger.debug('no channel found');
          throw new Error('Authentication failed, you do not have access to that channel');
        }
        channelData = channel.get();
        logger.debug('channel data:', channelData);
        return db.User.findOne({
          where: { userName: channelData.channelName.substring(1) }
        });
      }).then(function (user) {
        if (!user) {
          logger.debug('no user found');
          throw new Error('Authentication failed, you do not have access to that channel');
        }
        return user.comparePassword(userPassword);
      }).then(function (isMatch) {
        if (!isMatch) {
          logger.debug('incorrect password');
          throw new Error('Authentication failed, you do not have access to that channel');
        }
        logger.debug('...password was a match...');
        resolve(channelData);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(5),
    resolveUri = _require.resolveUri;

var _require2 = __webpack_require__(1),
    handleErrorResponse = _require2.handleErrorResponse;

/*

  route to run a resolve request on the daemon

*/

var claimResolve = function claimResolve(_ref, res) {
  var headers = _ref.headers,
      ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  resolveUri(params.name + '#' + params.claimId).then(function (resolvedUri) {
    res.status(200).json(resolvedUri);
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimResolve;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(2);

/*

  route to get a short claim id from long claim Id

*/

var claimShortId = function claimShortId(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

  db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name).then(function (shortId) {
    res.status(200).json({ success: true, data: shortId });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimShortId;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(5),
    getClaimList = _require.getClaimList;

var _require2 = __webpack_require__(1),
    handleErrorResponse = _require2.handleErrorResponse;

/*

  route to get list of claims

*/

var claimList = function claimList(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  getClaimList(params.name).then(function (claimsList) {
    res.status(200).json(claimsList);
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimList;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(2);

/*

  route to see if asset is available locally

*/

var fileAvailability = function fileAvailability(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  var name = params.name;
  var claimId = params.claimId;
  db.File.findOne({
    where: {
      name: name,
      claimId: claimId
    }
  }).then(function (result) {
    if (result) {
      return res.status(200).json({ success: true, data: true });
    }
    res.status(200).json({ success: true, data: false });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = fileAvailability;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var multipart = __webpack_require__(79);

var _require = __webpack_require__(3),
    uploadDirectory = _require.publishing.uploadDirectory;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });

module.exports = multipartMiddleware;

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(81);
var handleEmbedRequest = __webpack_require__(82);
var redirect = __webpack_require__(83);

module.exports = function (app) {
  app.get('/', handlePageRequest);
  app.get('/login', handlePageRequest);
  app.get('/about', handlePageRequest);
  app.get('/trending', redirect('/popular'));
  app.get('/popular', handlePageRequest);
  app.get('/new', handlePageRequest);
  app.get('/embed/:claimId/:name', handleEmbedRequest); // route to send embedable video player (for twitter)
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(14);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    host = _require.details.host;

var sendEmbedPage = function sendEmbedPage(_ref, res) {
  var params = _ref.params;

  var claimId = params.claimId;
  var name = params.name;
  // get and render the content
  res.status(200).render('embed', { layout: 'embed', host: host, claimId: claimId, name: name });
};

module.exports = sendEmbedPage;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redirect = function redirect(route) {
  return function (req, res) {
    res.status(301).redirect(route);
  };
};

module.exports = redirect;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var serveAssetByClaim = __webpack_require__(85);
var serveAssetByIdentifierAndClaim = __webpack_require__(88);

module.exports = function (app, db) {
  app.get('/:identifier/:claim', serveAssetByIdentifierAndClaim);
  app.get('/:claim', serveAssetByClaim);
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(4),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(23),
    determineResponseType = _require2.determineResponseType,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(24);
var handleShowRender = __webpack_require__(25);
var SERVE = 'SERVE';

/*

  route to serve an asset or the react app via the claim name only

*/

var serverAssetByClaim = function serverAssetByClaim(req, res) {
  var headers = req.headers,
      ip = req.ip,
      originalUrl = req.originalUrl,
      params = req.params;
  // decide if this is a show request

  var hasFileExtension = void 0;
  try {
    var _lbryUri$parseModifie = lbryUri.parseModifier(params.claim);

    hasFileExtension = _lbryUri$parseModifie.hasFileExtension;
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  var responseType = determineResponseType(hasFileExtension, headers);
  if (responseType !== SERVE) {
    return handleShowRender(req, res);
  }
  // handle serve request
  // send google analytics
  sendGAServeEvent(headers, ip, originalUrl);
  // parse the claim
  var claimName = void 0;
  try {
    var _lbryUri$parseClaim = lbryUri.parseClaim(params.claim);

    claimName = _lbryUri$parseClaim.claimName;
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  // log the request data for debugging
  logRequestData(responseType, claimName, null, null);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(null, null, claimName, null, originalUrl, ip, res);
};

module.exports = serverAssetByClaim;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(4),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(23),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(24);
var handleShowRender = __webpack_require__(25);

var SERVE = 'SERVE';

/*

  route to serve an asset or the react app via the claim name and an identifier

*/

var serverAssetByIdentifierAndClaim = function serverAssetByIdentifierAndClaim(req, res) {
  var headers = req.headers,
      ip = req.ip,
      originalUrl = req.originalUrl,
      params = req.params;
  // decide if this is a show request

  var hasFileExtension = void 0;
  try {
    var _lbryUri$parseModifie = lbryUri.parseModifier(params.claim);

    hasFileExtension = _lbryUri$parseModifie.hasFileExtension;
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  var responseType = determineResponseType(hasFileExtension, headers);
  if (responseType !== SERVE) {
    return handleShowRender(req, res);
  }
  // handle serve request
  // send google analytics
  sendGAServeEvent(headers, ip, originalUrl);
  // parse the claim
  var claimName = void 0;
  try {
    var _lbryUri$parseClaim = lbryUri.parseClaim(params.claim);

    claimName = _lbryUri$parseClaim.claimName;
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  // parse the identifier
  var isChannel = void 0,
      channelName = void 0,
      channelClaimId = void 0,
      claimId = void 0;
  try {
    var _lbryUri$parseIdentif = lbryUri.parseIdentifier(params.identifier);

    isChannel = _lbryUri$parseIdentif.isChannel;
    channelName = _lbryUri$parseIdentif.channelName;
    channelClaimId = _lbryUri$parseIdentif.channelClaimId;
    claimId = _lbryUri$parseIdentif.claimId;
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  if (!isChannel) {
    var _flipClaimNameAndIdFo = flipClaimNameAndIdForBackwardsCompatibility(claimId, claimName);

    var _flipClaimNameAndIdFo2 = _slicedToArray(_flipClaimNameAndIdFo, 2);

    claimId = _flipClaimNameAndIdFo2[0];
    claimName = _flipClaimNameAndIdFo2[1];
  }
  // log the request data for debugging
  logRequestData(responseType, claimName, channelName, claimId);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(channelName, channelClaimId, claimName, claimId, originalUrl, ip, res);
};

module.exports = serverAssetByIdentifierAndClaim;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(90);

module.exports = function (app) {
  app.get('*', handlePageRequest);
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(14);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWJlOTIyZDMzNDNkYjE4YmI3N2EiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3RvblwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNwZWUuY2gtY29tcG9uZW50c1wiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2hhdHdnLWZldGNoXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbWlkZGxld2FyZS9yZXF1ZXN0TG9nZ2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9zaWdudXAuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbEF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxDbGFpbXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbFNob3J0SWQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1BdmFpbGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1EYXRhLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltR2V0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTG9uZ0lkLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvYXV0aC9hdXRoZW50aWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1TaG9ydElkLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9maWxlQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRSZWFjdEFwcC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRFbWJlZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9yZWRpcmVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlDbGFpbS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9zZW5kUmVhY3RBcHAuanMiXSwibmFtZXMiOlsibG9nZ2VyIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJoYW5kbGVFcnJvclJlc3BvbnNlIiwib3JpZ2luYWxVcmwiLCJpcCIsImVycm9yIiwicmVzIiwidXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzIiwicmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzIiwic3RhdHVzIiwibWVzc2FnZSIsImpzb24iLCJjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCIsImNvZGUiLCJlcnIiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwibmV3RXJyb3JPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZm9yRWFjaCIsImtleSIsInN1Y2Nlc3MiLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsIlNlcXVlbGl6ZSIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInNlcXVlbGl6ZSIsImhvc3QiLCJkaWFsZWN0IiwiZGlhbGVjdE9wdGlvbnMiLCJkZWNpbWFsTnVtYmVycyIsImxvZ2dpbmciLCJwb29sIiwibWF4IiwibWluIiwiaWRsZSIsImFjcXVpcmUiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwiaW5mbyIsImNhdGNoIiwiZGIiLCJpbXBvcnQiLCJtb2RlbE5hbWUiLCJhc3NvY2lhdGUiLCJ1cHNlcnQiLCJNb2RlbCIsInZhbHVlcyIsImNvbmRpdGlvbiIsInRhYmxlTmFtZSIsImZpbmRPbmUiLCJ3aGVyZSIsIm9iaiIsImRlYnVnIiwidXBkYXRlIiwiY3JlYXRlIiwiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjdXN0b21Db250YWluZXJzIiwiY3VzdG9tUGFnZXMiLCJkZXRhaWxzIiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsInJvdXRlcyIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiZXZlbnRDYXRlZ29yeSIsImV2ZW50QWN0aW9uIiwiZXZlbnRMYWJlbCIsImlwT3ZlcnJpZGUiLCJ1c2VyQWdlbnRPdmVycmlkZSIsImNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyIsImNhdGVnb3J5IiwidmFyaWFibGUiLCJsYWJlbCIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkdXJhdGlvbiIsInVzZXJUaW1pbmdDYXRlZ29yeSIsInVzZXJUaW1pbmdWYXJpYWJsZU5hbWUiLCJ1c2VyVGltaW5nVGltZSIsInVzZXJUaW1pbmdMYWJlbCIsInNlbmRHb29nbGVBbmFseXRpY3NFdmVudCIsInBhcmFtcyIsInZpc2l0b3JJZCIsInJlcGxhY2UiLCJ2aXNpdG9yIiwic3RyaWN0Q2lkRm9ybWF0IiwiaHR0cHMiLCJldmVudCIsInNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmciLCJ0aW1pbmciLCJzZW5kR0FTZXJ2ZUV2ZW50Iiwic2VuZEdBVGltaW5nRXZlbnQiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJjaGFubmVsTmFtZSIsImNoYW5uZWxfbmFtZSIsImNoYW5uZWxJZCIsImNoYW5uZWxfaWQiLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJkYXRhIiwicmVzdWx0IiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwicHVibGlzaENsYWltIiwicHVibGlzaFBhcmFtcyIsIm5hbWUiLCJnYVN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJQcm9taXNlIiwicG9zdCIsIm1ldGhvZCIsInJlc3BvbnNlIiwiZ2V0Q2xhaW0iLCJ1cmkiLCJ0aW1lb3V0IiwiZ2V0Q2xhaW1MaXN0IiwiY2xhaW1OYW1lIiwicmVzb2x2ZVVyaSIsImdldERvd25sb2FkRGlyZWN0b3J5IiwiZG93bmxvYWRfZGlyZWN0b3J5IiwiY3JlYXRlQ2hhbm5lbCIsImFtb3VudCIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImNoYW5uZWxDbGFpbUlkIiwiY2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImFsbCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsInBhZ2UiLCJsb25nQ2hhbm5lbENsYWltSWQiLCJnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkIiwic2hvcnRDaGFubmVsQ2xhaW1JZCIsImdldENoYW5uZWxDbGFpbXMiLCJnZXRBbGxDaGFubmVsQ2xhaW1zIiwiY2hhbm5lbENsYWltc0FycmF5IiwicGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhIiwiZ2V0TG9jYWxGaWxlUmVjb3JkIiwiZmlsZSIsImRhdGFWYWx1ZXMiLCJwYXNzcG9ydCIsImxvY2FsTG9naW5TdHJhdGVneSIsImxvY2FsU2lnbnVwU3RyYXRlZ3kiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVVc2VyIiwic2VyaWFsaXplVXNlciIsInVzZSIsImxicnlBcGkiLCJwdWJsaXNoSGVscGVycyIsIk9wIiwicHVibGlzaCIsImZpbGVOYW1lIiwiZmlsZVR5cGUiLCJwdWJsaXNoUmVzdWx0cyIsImNlcnRpZmljYXRlSWQiLCJ0eCIsImNoYW5uZWwiLCJmaWxlUmVjb3JkIiwiY2xhaW1faWQiLCJtZXRhZGF0YSIsImFkZHJlc3MiLCJjbGFpbV9hZGRyZXNzIiwib3V0cG9pbnQiLCJ0eGlkIiwibm91dCIsImhlaWdodCIsImZpbGVQYXRoIiwiZmlsZV9wYXRoIiwibnNmdyIsImNsYWltUmVjb3JkIiwiY29udGVudFR5cGUiLCJiaWQiLCJ1cHNlcnRDcml0ZXJpYSIsImNsYWltIiwic2V0Q2xhaW0iLCJzZXRGaWxlIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2xhaW1BZGRyZXNzZXMiLCJwdXNoIiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJvciIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsImZzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkiLCJsaWNlbnNlIiwiaW52YWxpZE5hbWVDaGFyYWN0ZXJzIiwiZXhlYyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyIsInBhdGgiLCJ0eXBlIiwic2l6ZSIsInRlc3QiLCJ2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSIsInRodW1ibmFpbEZpbGVOYW1lIiwidGh1bWJuYWlsRmlsZVBhdGgiLCJ0aHVtYm5haWxGaWxlVHlwZSIsImNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyIsInRyaW0iLCJhdXRob3IiLCJsYW5ndWFnZSIsImNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJ1bmxpbmsiLCJhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSIsImZpbGVJbmZvIiwiZ2V0UmVzdWx0IiwiZmlsZV9uYW1lIiwiZG93bmxvYWRfcGF0aCIsImNyZWF0ZUZpbGVEYXRhIiwibXlzcWwiLCJ3YXJuIiwicmV0dXJuU2hvcnRJZCIsImNsYWltc0FycmF5IiwibG9uZ0lkIiwiY2xhaW1JbmRleCIsInNob3J0SWQiLCJzdWJzdHJpbmciLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwiZWxlbWVudCIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwiZmlsdGVyIiwic2l0ZUNvbmZpZyIsInJlcSIsImNvbnRleHQiLCJNeVJlZHVjZXJzIiwiTXlBcHAiLCJNeUdBTGlzdGVuZXIiLCJzdG9yZSIsImh0bWwiLCJ1cmwiLCJoZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJyZWRpcmVjdCIsInByZWxvYWRlZFN0YXRlIiwiZ2V0U3RhdGUiLCJzZW5kIiwidG9TdHJpbmciLCJtZXRhIiwibGluayIsIlNFUlZFIiwiU0hPVyIsImNsaWVudEFjY2VwdHNIdG1sIiwiYWNjZXB0IiwibWF0Y2giLCJyZXF1ZXN0SXNGcm9tQnJvd3NlciIsImNsaWVudFdhbnRzQXNzZXQiLCJyYW5nZSIsImltYWdlSXNXYW50ZWQiLCJ2aWRlb0lzV2FudGVkIiwiaXNWYWxpZENsYWltSWQiLCJpc1ZhbGlkU2hvcnRJZCIsImlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIiwiaW5wdXQiLCJzZXJ2ZUFzc2V0VG9DbGllbnQiLCJ2ZXJib3NlIiwic2VuZEZpbGVPcHRpb25zIiwic2VuZEZpbGUiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImZ1bGxDbGFpbUlkIiwiZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIiwiaGFzRmlsZUV4dGVuc2lvbiIsInJlc3BvbnNlVHlwZSIsImZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkiLCJpZGVudGlmaWVyIiwidGVtcE5hbWUiLCJsb2dSZXF1ZXN0RGF0YSIsIlJFR0VYUF9JTlZBTElEX0NMQUlNIiwiUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCIsIlJFR0VYUF9BRERSRVNTIiwiQ0hBTk5FTF9DSEFSIiwicGFyc2VJZGVudGlmaWVyIiwiY29tcG9uZW50c1JlZ2V4IiwiUmVnRXhwIiwibWFwIiwicHJvdG8iLCJ2YWx1ZSIsIm1vZGlmaWVyU2VwZXJhdG9yIiwibW9kaWZpZXIiLCJpc0NoYW5uZWwiLCJzdGFydHNXaXRoIiwibmFtZUJhZENoYXJzIiwiam9pbiIsInBhcnNlQ2xhaW0iLCJwYXJzZU1vZGlmaWVyIiwicmV0dXJuU2FnYVdpdGhQYXJhbXMiLCJzYWdhIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlIiwiYWN0aW9uIiwib25IYW5kbGVTaG93UGFnZVVyaSIsImhhbmRsZVNob3dQYWdlVXJpIiwicnVuIiwiZG9uZSIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJyZXF1ZXN0TG9nZ2VyIiwiUGF0aCIsImxvZ2dlckNvbmZpZyIsIm15c3FsQ29uZmlnIiwic2xhY2tDb25maWciLCJTZXJ2ZXIiLCJjb25maWd1cmVMb2dnZXIiLCJ1c2VyQ29uZmlnIiwiY29uZmlndXJlTXlzcWwiLCJjb25maWd1cmVTaXRlIiwiY29uZmlndXJlU2xhY2siLCJjb25maWd1cmVNb2RlbHMiLCJjb25maWd1cmVSb3V0ZXMiLCJjcmVhdGVBcHAiLCJhcHAiLCJlbmFibGUiLCJwdWJsaWNGb2xkZXIiLCJwcm9jZXNzIiwiY3dkIiwic3RhdGljIiwicHVibGljUGF0aCIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNwZWVjaFBhc3Nwb3J0IiwibWF4QWdlIiwiaW5pdGlhbGl6ZSIsInNlc3Npb24iLCJoYnMiLCJkZWZhdWx0TGF5b3V0IiwiaGFuZGxlYmFycyIsImVuZ2luZSIsInNldCIsInNlcnZlciIsInN0YXJ0IiwiUE9SVCIsInN5bmMiLCJsaXN0ZW4iLCJuZXh0IiwiTG9nZ2VyQ29uZmlnIiwibG9nTGV2ZWwiLCJjb25maWd1cmUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwidXNlckluZm8iLCJpZCIsInVzZXJOYW1lIiwiZ2V0Q2hhbm5lbCIsInNob3J0Q2hhbm5lbElkIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VyIiwiY29tcGFyZVBhc3N3b3JkIiwiaXNNYXRjaCIsIlNUUklORyIsIkJPT0xFQU4iLCJJTlRFR0VSIiwiVEVYVCIsIkRFQ0lNQUwiLCJkZWZpbmUiLCJkZWZhdWx0IiwiY2xhaW1TZXF1ZW5jZSIsImRlY29kZWRDbGFpbSIsImRlcHRoIiwiZWZmZWN0aXZlQW1vdW50IiwiaGFzU2lnbmF0dXJlIiwiaGV4IiwidmFsaWRBdEhlaWdodCIsInZhbHVlVmVyc2lvbiIsImNsYWltVHlwZSIsImNlcnRpZmljYXRlVmVyc2lvbiIsImtleVR5cGUiLCJwdWJsaWNLZXkiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJmb3JlaWduS2V5IiwiYWxsb3dOdWxsIiwib3JkZXIiLCJnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkIiwiJGxpa2UiLCJnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lIiwidmFsaWRhdGVMb25nQ2hhbm5lbElkIiwiaGFzT25lIiwiZGVmYXVsdFRodW1ibmFpbCIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2UiLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwib3B0aW9ucyIsInVzZXJEYXRhIiwiY2hhbm5lbERhdGEiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiaGFuZGxlU2lnbnVwUmVxdWVzdCIsImhhbmRsZUxvZ2luUmVxdWVzdCIsImhhbmRsZUxvZ291dFJlcXVlc3QiLCJoYW5kbGVVc2VyUmVxdWVzdCIsImdldCIsInNpZ251cCIsImxvZ2luIiwibG9nSW4iLCJsb2dvdXQiLCJjaGFubmVsQXZhaWxhYmlsaXR5IiwiY2hhbm5lbENsYWltcyIsImNoYW5uZWxTaG9ydElkIiwiY2xhaW1BdmFpbGFiaWxpdHkiLCJjbGFpbURhdGEiLCJjbGFpbUdldCIsImNsYWltTG9uZ0lkIiwiY2xhaW1QdWJsaXNoIiwiY2xhaW1SZXNvbHZlIiwiY2xhaW1TaG9ydElkIiwiY2xhaW1MaXN0IiwiZmlsZUF2YWlsYWJpbGl0eSIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJhdmFpbGFibGVOYW1lIiwiYm9keSIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsImNoYW5uZWxTaG9ydElkUm91dGUiLCJjbGFpbUluZm8iLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJjb21wbGV0ZWQiLCJhdXRoZW50aWNhdGVVc2VyIiwiZmlsZXMiLCJjaGFubmVsUGFzc3dvcmQiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJyZXNvbHZlZFVyaSIsImNsYWltc0xpc3QiLCJtdWx0aXBhcnQiLCJ1cGxvYWREaXIiLCJoYW5kbGVQYWdlUmVxdWVzdCIsImhhbmRsZUVtYmVkUmVxdWVzdCIsImhhbmRsZVBhZ2VSZW5kZXIiLCJzZW5kUmVhY3RBcHAiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwic2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxJQUFNQSxTQUFTLG1CQUFBQyxDQUFRLENBQVIsQ0FBZjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyx1QkFBcUIsNkJBQVVDLFdBQVYsRUFBdUJDLEVBQXZCLEVBQTJCQyxLQUEzQixFQUFrQ0MsR0FBbEMsRUFBdUM7QUFDMURSLFdBQU9PLEtBQVAsZUFBeUJGLFdBQXpCLEVBQXdDSCxPQUFPQyxPQUFQLENB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QVAsR0FBaUJ1akIsWUFBakIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWJlOTIyZDMzNDNkYjE4YmI3N2EiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3RvblwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhbmRsZUVycm9yUmVzcG9uc2U6IGZ1bmN0aW9uIChvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpIHtcbiAgICBsb2dnZXIuZXJyb3IoYEVycm9yIG9uICR7b3JpZ2luYWxVcmx9YCwgbW9kdWxlLmV4cG9ydHMudXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzKGVycm9yKSk7XG4gICAgY29uc3QgW3N0YXR1cywgbWVzc2FnZV0gPSBtb2R1bGUuZXhwb3J0cy5yZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMoZXJyb3IpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyhzdGF0dXMpXG4gICAgICAuanNvbihtb2R1bGUuZXhwb3J0cy5jcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZChzdGF0dXMsIG1lc3NhZ2UpKTtcbiAgfSxcbiAgcmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBsZXQgc3RhdHVzLCBtZXNzYWdlO1xuICAgIC8vIGNoZWNrIGZvciBkYWVtb24gYmVpbmcgdHVybmVkIG9mZlxuICAgIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJykge1xuICAgICAgc3RhdHVzID0gNTAzO1xuICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHJlZnVzZWQuICBUaGUgZGFlbW9uIG1heSBub3QgYmUgcnVubmluZy4nO1xuICAgICAgLy8gZmFsbGJhY2sgZm9yIGV2ZXJ5dGhpbmcgZWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXMgPSA0MDA7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gW3N0YXR1cywgbWVzc2FnZV07XG4gIH0sXG4gIHVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5czogZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGV0IG5ld0Vycm9yT2JqZWN0ID0ge307XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBuZXdFcnJvck9iamVjdFtrZXldID0gZXJyW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdFcnJvck9iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfSxcbiAgY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQgKHN0YXR1cywgbWVzc2FnZSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCdtb2RlbHMvY2VydGlmaWNhdGUuanMnKTtcbmNvbnN0IENoYW5uZWwgPSByZXF1aXJlKCdtb2RlbHMvY2hhbm5lbC5qcycpO1xuY29uc3QgQ2xhaW0gPSByZXF1aXJlKCdtb2RlbHMvY2xhaW0uanMnKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCdtb2RlbHMvZmlsZS5qcycpO1xuY29uc3QgUmVxdWVzdCA9IHJlcXVpcmUoJ21vZGVscy9yZXF1ZXN0LmpzJyk7XG5jb25zdCBVc2VyID0gcmVxdWlyZSgnbW9kZWxzL3VzZXIuanMnKTtcblxuY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnN0IHtkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnLmpzJyk7XG5cbi8vIHNldCBzZXF1ZWxpemUgb3B0aW9uc1xuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkLCB7XG4gIGhvc3QgICAgICAgICAgOiAnbG9jYWxob3N0JyxcbiAgZGlhbGVjdCAgICAgICA6ICdteXNxbCcsXG4gIGRpYWxlY3RPcHRpb25zOiB7ZGVjaW1hbE51bWJlcnM6IHRydWV9LFxuICBsb2dnaW5nICAgICAgIDogZmFsc2UsXG4gIHBvb2wgICAgICAgICAgOiB7XG4gICAgbWF4ICAgIDogNSxcbiAgICBtaW4gICAgOiAwLFxuICAgIGlkbGUgICA6IDEwMDAwLFxuICAgIGFjcXVpcmU6IDEwMDAwLFxuICB9LFxufSk7XG5cbi8vIGVzdGFibGlzaCBteXNxbCBjb25uZWN0aW9uXG5zZXF1ZWxpemVcbiAgLmF1dGhlbnRpY2F0ZSgpXG4gIC50aGVuKCgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VxdWVsaXplIGhhcyBlc3RhYmxpc2hlZCBteXNxbCBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKCdTZXF1ZWxpemUgd2FzIHVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZTonLCBlcnIpO1xuICB9KTtcblxuLy8gbWFudWFsbHkgYWRkIGVhY2ggbW9kZWwgdG8gdGhlIGRiIG9iamVjdCAobm90ZTogbWFrZSB0aGlzIGR5bmFtaWMpXG5jb25zdCBkYiA9IHt9O1xuZGJbJ0NlcnRpZmljYXRlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDZXJ0aWZpY2F0ZScsIENlcnRpZmljYXRlKTtcbmRiWydDaGFubmVsJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDaGFubmVsJywgQ2hhbm5lbCk7XG5kYlsnQ2xhaW0nXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NsYWltJywgQ2xhaW0pO1xuZGJbJ0ZpbGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0ZpbGUnLCBGaWxlKTtcbmRiWydSZXF1ZXN0J10gPSBzZXF1ZWxpemUuaW1wb3J0KCdSZXF1ZXN0JywgUmVxdWVzdCk7XG5kYlsnVXNlciddID0gc2VxdWVsaXplLmltcG9ydCgnVXNlcicsIFVzZXIpO1xuXG4vLyBydW4gbW9kZWwuYXNzb2NpYXRpb24gZm9yIGVhY2ggbW9kZWwgaW4gdGhlIGRiIG9iamVjdCB0aGF0IGhhcyBhbiBhc3NvY2lhdGlvblxubG9nZ2VyLmluZm8oJ2Fzc29jaWF0aW5nIGRiIG1vZGVscy4uLicpO1xuT2JqZWN0LmtleXMoZGIpLmZvckVhY2gobW9kZWxOYW1lID0+IHtcbiAgaWYgKGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKSB7XG4gICAgbG9nZ2VyLmluZm8oJ0Fzc29jaWF0aW5nIG1vZGVsOicsIG1vZGVsTmFtZSk7XG4gICAgZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUoZGIpO1xuICB9XG59KTtcblxuLy8gYWRkIHNlcXVlbGl6ZS9TZXF1ZWxpemUgdG8gZGJcbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcbi8vIGFkZCBhbiAndXBzZXJ0JyBtZXRob2QgdG8gdGhlIGRiIG9iamVjdFxuZGIudXBzZXJ0ID0gKE1vZGVsLCB2YWx1ZXMsIGNvbmRpdGlvbiwgdGFibGVOYW1lKSA9PiB7XG4gIHJldHVybiBNb2RlbFxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiBjb25kaXRpb24sXG4gICAgfSlcbiAgICAudGhlbihvYmogPT4ge1xuICAgICAgaWYgKG9iaikgeyAgLy8gdXBkYXRlXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgdXBkYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gb2JqLnVwZGF0ZSh2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHsgIC8vIGluc2VydFxuICAgICAgICBsb2dnZXIuZGVidWcoYGNyZWF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIE1vZGVsLmNyZWF0ZSh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGAke3RhYmxlTmFtZX0udXBzZXJ0IGVycm9yYCwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsImZ1bmN0aW9uIFNpdGVDb25maWcgKCkge1xuICB0aGlzLmFuYWx5dGljcyA9IHtcbiAgICBnb29nbGVJZDogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmFzc2V0RGVmYXVsdHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdBbiBhc3NldCBwdWJsaXNoZWQgb24gU3BlZS5jaCcsXG4gICAgdGh1bWJuYWlsICA6ICdodHRwczovL3NwZWUuY2gvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgdGl0bGUgICAgICA6ICdBIFNwZWUuY2ggSW1wbGVtZW50YXRpb24nLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7fTtcbiAgdGhpcy5jdXN0b21Db250YWluZXJzID0ge307XG4gIHRoaXMuY3VzdG9tUGFnZXMgPSB7fTtcbiAgdGhpcy5kZXRhaWxzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnV2VsY29tZSB0byBteSBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nIHNpdGUuJyxcbiAgICBob3N0ICAgICAgIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgcG9ydCAgICAgICA6IDMwMDAsXG4gICAgdGl0bGUgICAgICA6ICdNeSBTcGVlLmNoIFNpdGUnLFxuICAgIHR3aXR0ZXIgICAgOiAnQGV4YW1wbGVUd2l0dGVySGFuZGxlJyxcbiAgfTtcbiAgdGhpcy5wdWJsaXNoaW5nID0ge1xuICAgIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlczogW10sXG4gICAgZGlzYWJsZWQgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICBkaXNhYmxlZE1lc3NhZ2UgICAgICAgICA6ICdQbGVhc2UgY2hlY2sgYmFjayBzb29uLicsXG4gICAgcHJpbWFyeUNsYWltQWRkcmVzcyAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbCAgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbElkICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdXBsb2FkRGlyZWN0b3J5ICAgICAgICAgOiAnL2hvbWUvbGJyeS9VcGxvYWRzJyxcbiAgfTtcbiAgdGhpcy5yb3V0ZXMgPSB7fTtcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gc2l0ZSBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgYW5hbHl0aWNzLCBhc3NldERlZmF1bHRzLCBhdXRoLCBjdXN0b21Db21wb25lbnRzLCBjdXN0b21Db250YWluZXJzLCBjdXN0b21QYWdlcywgZGV0YWlscywgcHVibGlzaGluZywgcm91dGVzIH0gPSBjb25maWc7XG4gICAgY29uc29sZS5sb2coJ0NvbmZpZ3VyaW5nIHNpdGUgZGV0YWlscy4uLicpO1xuICAgIHRoaXMuYW5hbHl0aWNzID0gYW5hbHl0aWNzO1xuICAgIHRoaXMuYXNzZXREZWZhdWx0cyA9IGFzc2V0RGVmYXVsdHM7XG4gICAgdGhpcy5hdXRoID0gYXV0aDtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIHRoaXMucHVibGlzaGluZyA9IHB1Ymxpc2hpbmc7XG4gICAgdGhpcy5jdXN0b21Db21wb25lbnRzID0gY3VzdG9tQ29tcG9uZW50cztcbiAgICB0aGlzLmN1c3RvbUNvbnRhaW5lcnMgPSBjdXN0b21Db250YWluZXJzO1xuICAgIHRoaXMuY3VzdG9tUGFnZXMgPSBjdXN0b21QYWdlcztcbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNpdGVDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgdWEgPSByZXF1aXJlKCd1bml2ZXJzYWwtYW5hbHl0aWNzJyk7XG5jb25zdCB7IGFuYWx5dGljcyA6IHsgZ29vZ2xlSWQgfSwgZGV0YWlsczogeyB0aXRsZSB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICBldmVudENhdGVnb3J5ICAgIDogJ2NsaWVudCByZXF1ZXN0cycsXG4gICAgZXZlbnRBY3Rpb24gICAgICA6ICdzZXJ2ZSByZXF1ZXN0JyxcbiAgICBldmVudExhYmVsICAgICAgIDogb3JpZ2luYWxVcmwsXG4gICAgaXBPdmVycmlkZSAgICAgICA6IGlwLFxuICAgIHVzZXJBZ2VudE92ZXJyaWRlOiBoZWFkZXJzWyd1c2VyLWFnZW50J10sXG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICBjb25zdCBkdXJhdGlvbiA9IGVuZFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiB7XG4gICAgdXNlclRpbWluZ0NhdGVnb3J5ICAgIDogY2F0ZWdvcnksXG4gICAgdXNlclRpbWluZ1ZhcmlhYmxlTmFtZTogdmFyaWFibGUsXG4gICAgdXNlclRpbWluZ1RpbWUgICAgICAgIDogZHVyYXRpb24sXG4gICAgdXNlclRpbWluZ0xhYmVsICAgICAgIDogbGFiZWwsXG4gIH07XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQgKGlwLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvcklkID0gaXAucmVwbGFjZSgvXFwuL2csICctJyk7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLmV2ZW50KHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcgKHZpc2l0b3JJZCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLnRpbWluZyhwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYFRpbWluZyBldmVudCBzdWNjZXNzZnVsbHkgc2VudCB0byBnb29nbGUgYW5hbHl0aWNzYCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlbmRHQVNlcnZlRXZlbnQgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQoaXAsIHBhcmFtcyk7XG4gIH0sXG4gIHNlbmRHQVRpbWluZ0V2ZW50IChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nKHRpdGxlLCBwYXJhbXMpO1xuICB9LFxuICBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwgKHsgY2hhbm5lbF9uYW1lOiBjaGFubmVsTmFtZSwgY2hhbm5lbF9pZDogY2hhbm5lbElkIH0pIHtcbiAgICByZXR1cm4gKGNoYW5uZWxOYW1lIHx8IGNoYW5uZWxJZCA/ICdQVUJMSVNIX0lOX0NIQU5ORUxfQ0xBSU0nIDogJ1BVQkxJU0hfQU5PTllNT1VTX0NMQUlNJyk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsImNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcbmNvbnN0IGxvY2FsTG9naW5TdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtbG9naW4uanMnKTtcbmNvbnN0IGxvY2FsU2lnbnVwU3RyYXRlZ3kgPSByZXF1aXJlKCcuL2xvY2FsLXNpZ251cC5qcycpO1xuY29uc3QgeyBzZXJpYWxpemVTcGVlY2hVc2VyLCBkZXNlcmlhbGl6ZVNwZWVjaFVzZXIgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvYXV0aEhlbHBlcnMuanMnKTtcblxucGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGRlc2VyaWFsaXplU3BlZWNoVXNlcik7XG5wYXNzcG9ydC5zZXJpYWxpemVVc2VyKHNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xucGFzc3BvcnQudXNlKCdsb2NhbC1sb2dpbicsIGxvY2FsTG9naW5TdHJhdGVneSk7XG5wYXNzcG9ydC51c2UoJ2xvY2FsLXNpZ251cCcsIGxvY2FsU2lnbnVwU3RyYXRlZ3kpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhc3Nwb3J0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2luZGV4LmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHB1Ymxpc2hIZWxwZXJzID0gcmVxdWlyZSgnaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHByaW1hcnlDbGFpbUFkZHJlc3MsIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe1xuICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lOiBwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gbXlzcWwgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIC8vIGNvbmZpZ3VyZSBjcmVkZW50aWFsc1xuICAgIGxvZ2dlci5pbmZvKCdjb25maWd1cmluZyBteXNxbC4uLicpO1xuICAgIGNvbnN0IHsgZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gY29uZmlnO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgbXlzcWwoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblNob3J0SWQ6IGZ1bmN0aW9uIChjbGFpbXNBcnJheSwgbG9uZ0lkKSB7XG4gICAgbGV0IGNsYWltSW5kZXg7XG4gICAgbGV0IHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIDEpOyAvLyBkZWZhdWx0IHNob3J0IGlkIGlzIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICBsZXQgc2hvcnRJZExlbmd0aCA9IDA7XG4gICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhpcyBjbGFpbSBpZFxuICAgIGNsYWltSW5kZXggPSBjbGFpbXNBcnJheS5maW5kSW5kZXgoZWxlbWVudCA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFpbUlkID09PSBsb25nSWQ7XG4gICAgfSk7XG4gICAgaWYgKGNsYWltSW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsYWltIGlkIG5vdCBmb3VuZCBpbiBjbGFpbXMgbGlzdCcpO1xuICAgIH1cbiAgICAvLyBnZXQgYW4gYXJyYXkgb2YgYWxsIGNsYWltcyB3aXRoIGxvd2VyIGhlaWdodFxuICAgIGxldCBwb3NzaWJsZU1hdGNoZXMgPSBjbGFpbXNBcnJheS5zbGljZSgwLCBjbGFpbUluZGV4KTtcbiAgICAvLyByZW1vdmUgY2VydGlmaWNhdGVzIHdpdGggdGhlIHNhbWUgcHJlZml4ZXMgdW50aWwgbm9uZSBhcmUgbGVmdC5cbiAgICB3aGlsZSAocG9zc2libGVNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNob3J0SWRMZW5ndGggKz0gMTtcbiAgICAgIHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpO1xuICAgICAgcG9zc2libGVNYXRjaGVzID0gcG9zc2libGVNYXRjaGVzLmZpbHRlcihlbGVtZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50LmNsYWltSWQgJiYgKGVsZW1lbnQuY2xhaW1JZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCkgPT09IHNob3J0SWQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hvcnRJZDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgUmVkdWNlcnMsIEdBTGlzdGVuZXIsIEFwcCB9IGZyb20gJ3NwZWUuY2gtY29tcG9uZW50cyc7XG4vKlxuICBeIG5vdGU6IHRvIGRvIHRoaXMgcmlnaHQsIG1heWJlXG4gIHRoZXNlIHNob3VsZCBiZSBwYXNzZWQgaW4gZnJvbSB0aGUgaW1wbGVtZW50YXRpb24gKHd3dy5zcGVlLmNoKSBpdHNlbGYsXG4gIHNvIHRoYXQgdGhlcmUgYXJlIG5vIGNvbmZsaWN0cyBiZXR3ZWVuIHRoZSBTU1IgaGVyZSBhbmRcbiAgdGhlIGJ1bmRsZSBzZW50IHRvIHRoZSBzZXJ2ZXI/XG4gIHRoZXJlIG1pZ2h0IGFsc28gYmUgaXNzdWVzIGlmIHRoaXMgcGFja2FnZSB1c2VzIGEgZGlmZmVyZW50IHZlcnNpb24gb2Ygc3BlZS5jaC1jb21wb25lbnRzIHRoYW4gd3d3LnNwZWUuY2ggZG9lcz9cbiovXG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZS5qcyc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3VzdG9taXplIHRoZSByZWR1Y2VyIGJ5IHBhc3NpbmcgaW4gaW50aWFsIHN0YXRlIGNvbmZpZ3NcbiAgY29uc3QgTXlSZWR1Y2VycyA9IFJlZHVjZXJzKHNpdGVDb25maWcpO1xuICBjb25zdCBNeUFwcCA9IEFwcChzaXRlQ29uZmlnKTtcbiAgY29uc3QgTXlHQUxpc3RlbmVyID0gR0FMaXN0ZW5lcihzaXRlQ29uZmlnKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShNeVJlZHVjZXJzKTtcblxuICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICA8TXlHQUxpc3RlbmVyPlxuICAgICAgICAgIDxNeUFwcCAvPlxuICAgICAgICA8L015R0FMaXN0ZW5lcj5cbiAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG5cbiAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgLy8gU29tZXdoZXJlIGEgYDxSZWRpcmVjdD5gIHdhcyByZW5kZXJlZFxuICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UncmUgZ29vZCwgc2VuZCB0aGUgcmVzcG9uc2VcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xuXG4gIGNvbnNvbGUubG9nKCdoZWxsbyBmcm9tIHNwZWUuY2ggaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNwZWUuY2gtY29tcG9uZW50c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNwZWUuY2gtY29tcG9uZW50c1wiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL2dlbmVyYWwuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvYnVuZGxlL2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICBgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZ2V0Q2xhaW1JZCwgZ2V0TG9jYWxGaWxlUmVjb3JkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnLi9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcbmNvbnN0IFNIT1cgPSAnU0hPVyc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxuZnVuY3Rpb24gY2xpZW50QWNjZXB0c0h0bWwgKHthY2NlcHR9KSB7XG4gIHJldHVybiBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdElzRnJvbUJyb3dzZXIgKGhlYWRlcnMpIHtcbiAgcmV0dXJuIGhlYWRlcnNbJ3VzZXItYWdlbnQnXSAmJiBoZWFkZXJzWyd1c2VyLWFnZW50J10ubWF0Y2goL01vemlsbGEvKTtcbn07XG5cbmZ1bmN0aW9uIGNsaWVudFdhbnRzQXNzZXQgKHthY2NlcHQsIHJhbmdlfSkge1xuICBjb25zdCBpbWFnZUlzV2FudGVkID0gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvaW1hZ2VcXC8uKi8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL1xcKi8pO1xuICBjb25zdCB2aWRlb0lzV2FudGVkID0gYWNjZXB0ICYmIHJhbmdlO1xuICByZXR1cm4gaW1hZ2VJc1dhbnRlZCB8fCB2aWRlb0lzV2FudGVkO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZENsYWltSWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuICgoY2xhaW1JZC5sZW5ndGggPT09IDQwKSAmJiAhL1teQS1aYS16MC05XS9nLnRlc3QoY2xhaW1JZCkpO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuIGNsYWltSWQubGVuZ3RoID09PSAxOyAgLy8gaXQgc2hvdWxkIHJlYWxseSBldmFsdWF0ZSB0aGUgc2hvcnQgdXJsIGl0c2VsZlxufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWRPckNsYWltSWQgKGlucHV0KSB7XG4gIHJldHVybiAoaXNWYWxpZENsYWltSWQoaW5wdXQpIHx8IGlzVmFsaWRTaG9ydElkKGlucHV0KSk7XG59O1xuXG5mdW5jdGlvbiBzZXJ2ZUFzc2V0VG9DbGllbnQgKGNsYWltSWQsIG5hbWUsIHJlcykge1xuICByZXR1cm4gZ2V0TG9jYWxGaWxlUmVjb3JkKGNsYWltSWQsIG5hbWUpXG4gICAgLnRoZW4oZmlsZVJlY29yZCA9PiB7XG4gICAgICAvLyBjaGVjayB0aGF0IGEgbG9jYWwgcmVjb3JkIHdhcyBmb3VuZFxuICAgICAgaWYgKGZpbGVSZWNvcmQgPT09IE5PX0ZJTEUpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMzA3KS5yZWRpcmVjdChgL2FwaS9jbGFpbS9nZXQvJHtuYW1lfS8ke2NsYWltSWR9YCk7XG4gICAgICB9XG4gICAgICAvLyBzZXJ2ZSB0aGUgZmlsZVxuICAgICAgY29uc3Qge2ZpbGVQYXRoLCBmaWxlVHlwZX0gPSBmaWxlUmVjb3JkO1xuICAgICAgbG9nZ2VyLnZlcmJvc2UoYHNlcnZpbmcgZmlsZTogJHtmaWxlUGF0aH1gKTtcbiAgICAgIGNvbnN0IHNlbmRGaWxlT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnICAgICAgICAgIDogZmlsZVR5cGUgfHwgJ2ltYWdlL2pwZWcnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kRmlsZShmaWxlUGF0aCwgc2VuZEZpbGVPcHRpb25zKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKSB7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oZnVsbENsYWltSWQgPT4ge1xuICAgICAgICBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9IGVsc2UgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNoYW5uZWwgaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmVBc3NldFRvQ2xpZW50KGZ1bGxDbGFpbUlkLCBjbGFpbU5hbWUsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnc3VjY2VzcycpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdmYWlsJyk7XG4gICAgICB9KTtcbiAgfSxcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIChoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlVHlwZTtcbiAgICBpZiAoaGFzRmlsZUV4dGVuc2lvbikge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7ICAvLyBhc3N1bWUgYSBzZXJ2ZSByZXF1ZXN0IGlmIGZpbGUgZXh0ZW5zaW9uIGlzIHByZXNlbnRcbiAgICAgIGlmIChjbGllbnRBY2NlcHRzSHRtbChoZWFkZXJzKSkgeyAgLy8gaWYgdGhlIHJlcXVlc3QgY29tZXMgZnJvbSBhIGJyb3dzZXIsIGNoYW5nZSBpdCB0byBhIHNob3cgcmVxdWVzdFxuICAgICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgaWYgKGNsaWVudFdhbnRzQXNzZXQoaGVhZGVycykgJiYgcmVxdWVzdElzRnJvbUJyb3dzZXIoaGVhZGVycykpIHsgIC8vIHRoaXMgaXMgaW4gY2FzZSBzb21lb25lIGVtYmVkcyBhIHNob3cgdXJsXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnU2hvdyByZXF1ZXN0IGNhbWUgZnJvbSBicm93c2VyIGJ1dCB3YW50cyBhbiBpbWFnZS92aWRlby4gQ2hhbmdpbmcgcmVzcG9uc2UgdG8gc2VydmUuLi4nKTtcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZVR5cGU7XG4gIH0sXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkgKGlkZW50aWZpZXIsIG5hbWUpIHtcbiAgICAvLyB0aGlzIGlzIGEgcGF0Y2ggZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5IHdpdGggJy9uYW1lL2NsYWltX2lkJyB1cmwgZm9ybWF0XG4gICAgaWYgKGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKG5hbWUpICYmICFpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChpZGVudGlmaWVyKSkge1xuICAgICAgY29uc3QgdGVtcE5hbWUgPSBuYW1lO1xuICAgICAgbmFtZSA9IGlkZW50aWZpZXI7XG4gICAgICBpZGVudGlmaWVyID0gdGVtcE5hbWU7XG4gICAgfVxuICAgIHJldHVybiBbaWRlbnRpZmllciwgbmFtZV07XG4gIH0sXG4gIGxvZ1JlcXVlc3REYXRhIChyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3Jlc3BvbnNlVHlwZSA9PT0nLCByZXNwb25zZVR5cGUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gbmFtZSA9PT0gJywgY2xhaW1OYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgbmFtZSA9PT0nLCBjaGFubmVsTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBpZCA9PT0nLCBjbGFpbUlkKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgaWRlbnRpZmllcjonLCBpZGVudGlmaWVyKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7dmFsdWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgdXJsLiAgTm8gY2hhbm5lbCBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgaXNDaGFubmVsID0gdmFsdWUuc3RhcnRzV2l0aChtb2R1bGUuZXhwb3J0cy5DSEFOTkVMX0NIQVIpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gaXNDaGFubmVsID8gdmFsdWUgOiBudWxsO1xuICAgIGxldCBjbGFpbUlkO1xuICAgIGlmIChpc0NoYW5uZWwpIHtcbiAgICAgIGlmICghY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsIG5hbWUgYWZ0ZXIgQC4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjaGFubmVsTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCk7XG4gICAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYWltSWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBjaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbUlkLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBuYW1lOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghY2xhaW1OYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIC4nKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNsYWltTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0xBSU0pO1xuICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciAke21vZGlmaWVyU2VwZXJhdG9yfS5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7bW9kaWZpZXJTZXBlcmF0b3J9IG1vZGlmaWVyIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWVgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgY2xhaW1OYW1lLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlTW9kaWZpZXI6IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBtb2RpZmllcjonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uID0gZmFsc2U7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24sXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgUmVkdWNlcnMsIEdBTGlzdGVuZXIsIEFwcCwgU2FnYXMsIEFjdGlvbnMgfSBmcm9tICdzcGVlLmNoLWNvbXBvbmVudHMnO1xuLypcbiAgXiBub3RlOiB0byBkbyB0aGlzIHJpZ2h0LCBtYXliZVxuICB0aGVzZSBzaG91bGQgYmUgcGFzc2VkIGluIGZyb20gdGhlIGltcGxlbWVudGF0aW9uICh3d3cuc3BlZS5jaCkgaXRzZWxmLFxuICBzbyB0aGF0IHRoZXJlIGFyZSBubyBjb25mbGljdHMgYmV0d2VlbiB0aGUgU1NSIGhlcmUgYW5kXG4gIHRoZSBidW5kbGUgc2VudCB0byB0aGUgc2VydmVyP1xuICB0aGVyZSBtaWdodCBhbHNvIGJlIGlzc3VlcyBpZiB0aGlzIHBhY2thZ2UgdXNlcyBhIGRpZmZlcmVudCB2ZXJzaW9uIG9mIHNwZWUuY2gtY29tcG9uZW50cyB0aGFuIHd3dy5zcGVlLmNoIGRvZXM/XG4qL1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCByZXR1cm5TYWdhV2l0aFBhcmFtcyA9IChzYWdhLCBwYXJhbXMpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uICogKCkge1xuICAgIHlpZWxkIGNhbGwoc2FnYSwgcGFyYW1zKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY29uZmlndXJlIHRoZSByZWR1Y2VycyBieSBwYXNzaW5nIGluaXRpYWwgc3RhdGUgY29uZmlnc1xuICBjb25zdCBNeVJlZHVjZXJzID0gUmVkdWNlcnMoc2l0ZUNvbmZpZyk7XG4gIGNvbnN0IE15QXBwID0gQXBwKHNpdGVDb25maWcpO1xuICBjb25zdCBNeUdBTGlzdGVuZXIgPSBHQUxpc3RlbmVyKHNpdGVDb25maWcpO1xuXG4gIC8vIGNyZWF0ZSBhbmQgYXBwbHkgbWlkZGxld2FyZVxuICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XG4gIGNvbnN0IG1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUoc2FnYU1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKE15UmVkdWNlcnMsIG1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBzYWdhXG4gIGNvbnN0IGFjdGlvbiA9IEFjdGlvbnMub25IYW5kbGVTaG93UGFnZVVyaShyZXEucGFyYW1zKTtcbiAgY29uc3Qgc2FnYSA9IHJldHVyblNhZ2FXaXRoUGFyYW1zKFNhZ2FzLmhhbmRsZVNob3dQYWdlVXJpLCBhY3Rpb24pO1xuXG4gIC8vIHJ1biB0aGUgc2FnYSBtaWRkbGV3YXJlXG4gIHNhZ2FNaWRkbGV3YXJlXG4gICAgLnJ1bihzYWdhKVxuICAgIC5kb25lXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICAgICAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgICAgIDxNeUdBTGlzdGVuZXI+XG4gICAgICAgICAgICAgIDxNeUFwcCAvPlxuICAgICAgICAgICAgPC9NeUdBTGlzdGVuZXI+XG4gICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICApO1xuXG4gICAgICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gICAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgICAgIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gICAgICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gICAgICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICAgIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gICAgICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG4gICAgfSk7XG5cbiAgY29uc29sZS5sb2coJ2hlbGxvIGZyb20gc3BlZS5jaCBoYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IGNvb2tpZVNlc3Npb24gPSByZXF1aXJlKCdjb29raWUtc2Vzc2lvbicpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSByZXF1aXJlKCdtaWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMnKTtcbmNvbnN0IFBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBsb2dnZXJDb25maWcgPSByZXF1aXJlKCdsb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsQ29uZmlnID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcbmNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJ3NsYWNrQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIFNlcnZlciAoKSB7XG4gIHRoaXMuY29uZmlndXJlTG9nZ2VyID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBsb2dnZXJDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBteXNxbENvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2l0ZSA9ICh1c2VyQ29uZmlnKSA9PiB7XG4gICAgc2l0ZUNvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2xhY2sgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNsYWNrQ29uZmlnLnVwZGF0ZSh1c2VyQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVNb2RlbHMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdoZXJlIGlzIHdoZXJlIHlvdSBjb3VsZCBhZGQvb3ZlcndyaXRlIHRoZSBkZWZhdWx0IG1vZGVscycpXG4gIH07XG4gIHRoaXMuY29uZmlndXJlUm91dGVzID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCByb3V0ZXMnKVxuICB9O1xuICB0aGlzLmNyZWF0ZUFwcCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgYW4gRXhwcmVzcyBhcHBsaWNhdGlvblxuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuICAgIC8vIHRydXN0IHRoZSBwcm94eSB0byBnZXQgaXAgYWRkcmVzcyBmb3IgdXNcbiAgICBhcHAuZW5hYmxlKCd0cnVzdCBwcm94eScpO1xuXG4gICAgLyogYWRkIG1pZGRsZXdhcmUgKi9cbiAgICAvLyBzZXQgSFRUUCBoZWFkZXJzIHRvIHByb3RlY3QgYWdhaW5zdCB3ZWxsLWtub3duIHdlYiB2dWxuZXJhYmlsdGllc1xuICAgIGFwcC51c2UoaGVsbWV0KCkpO1xuICAgIC8vICdleHByZXNzLnN0YXRpYycgdG8gc2VydmUgc3RhdGljIGZpbGVzIGZyb20gcHVibGljIGRpcmVjdG9yeVxuICAgIGlmIChzaXRlQ29uZmlnLnJvdXRlcy5wdWJsaWNGb2xkZXIpIHtcbiAgICAgIC8vIHRha2UgaW4gYSBkaWZmZXJlbnQgcHVibGljIGZvbGRlciwgc28gaXQgY2FuIHNlcnZlIGl0J3Mgb3duIGJ1bmRsZSBpZiBuZWVkZWRcbiAgICAgIGNvbnN0IHB1YmxpY0ZvbGRlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBzaXRlQ29uZmlnLnJvdXRlcy5wdWJsaWNGb2xkZXIpO1xuICAgICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhwdWJsaWNGb2xkZXIpKTtcbiAgICAgIGxvZ2dlci5pbmZvKCdzZXJ2aW5nIHN0YXRpYyBmaWxlcyBmcm9tIGN1c3RvbSBwYXRoOicsIHB1YmxpY0ZvbGRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHB1YmxpY1BhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3B1YmxpYycpO1xuICAgICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhwdWJsaWNQYXRoKSk7XG4gICAgICBsb2dnZXIud2Fybihgc2VydmluZyBzdGF0aWMgZmlsZXMgZnJvbSBkZWZhdWx0IHN0YXRpYyBwYXRoIGF0ICR7cHVibGljUGF0aH0uICBQbGVhc2Ugc3BlY2lmeSBhIHBhdGggaW4geW91ciBjb25maWcvc2l0ZUNvbmZpZy5qcyBmaWxlYCwgKTtcbiAgICB9O1xuICAgIC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24vanNvblxuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgIC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5cbiAgICAvLyBhZGQgY3VzdG9tIG1pZGRsZXdhcmUgKG5vdGU6IGJ1aWxkIG91dCB0byBhY2NlcHQgZHluYW1pY2FsbHkgdXNlIHdoYXQgaXMgaW4gc2VydmVyL21pZGRsZXdhcmUvXG4gICAgYXBwLnVzZShyZXF1ZXN0TG9nZ2VyKTtcblxuICAgIC8vIGNvbmZpZ3VyZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbiAgICAvLyBpbml0aWFsaXplIHBhc3Nwb3J0XG4gICAgY29uc3Qgc2Vzc2lvbktleSA9IHNpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5O1xuICAgIGFwcC51c2UoY29va2llU2Vzc2lvbih7XG4gICAgICBuYW1lICA6ICdzZXNzaW9uJyxcbiAgICAgIGtleXMgIDogW3Nlc3Npb25LZXldLFxuICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBpLmUuIDI0IGhvdXJzXG4gICAgfSkpO1xuICAgIGFwcC51c2Uoc3BlZWNoUGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgICAvLyBjb25maWd1cmUgaGFuZGxlYmFycyAmIHJlZ2lzdGVyIGl0IHdpdGggZXhwcmVzcyBhcHBcbiAgICBjb25zdCBoYnMgPSBleHByZXNzSGFuZGxlYmFycy5jcmVhdGUoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2VtYmVkJyxcbiAgICAgIGhhbmRsZWJhcnMgICA6IEhhbmRsZWJhcnMsXG4gICAgfSk7XG4gICAgYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGhicy5lbmdpbmUpO1xuICAgIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuICAgIC8vIHNldCB0aGUgcm91dGVzIG9uIHRoZSBhcHBcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hdXRoLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXBpLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvcGFnZXMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldHMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9mYWxsYmFjay8nKShhcHApO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gIH07XG4gIHRoaXMuaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmNyZWF0ZUFwcCgpO1xuICAgIHRoaXMuc2VydmVyID0gaHR0cC5TZXJ2ZXIodGhpcy5hcHApO1xuICB9O1xuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG4gICAgY29uc3QgUE9SVCA9IHNpdGVDb25maWcuZGV0YWlscy5wb3J0O1xuICAgIC8vIHN5bmMgc2VxdWVsaXplXG4gICAgZGIuc2VxdWVsaXplLnN5bmMoKVxuICAgIC8vIHN0YXJ0IHRoZSBzZXJ2ZXJcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBQT1JUICR7UE9SVH1gKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFN0YXJ0dXAgRXJyb3I6YCwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3QgcmVxdWVzdExvZ2dlciA9IChyZXEsIHJlcywgbmV4dCkgPT4geyAgLy8gY3VzdG9tIGxvZ2dpbmcgbWlkZGxld2FyZSB0byBsb2cgYWxsIGluY29taW5nIGh0dHAgcmVxdWVzdHNcbiAgbG9nZ2VyLnZlcmJvc2UoYFJlcXVlc3Qgb24gJHtyZXEub3JpZ2luYWxVcmx9IGZyb20gJHtyZXEuaXB9YCk7XG4gIG5leHQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWVzdExvZ2dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIExvZ2dlckNvbmZpZyAoKSB7XG4gIHRoaXMubG9nTGV2ZWwgPSAnZGVidWcnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBsb2dnZXIgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBsb2dnZXIuaW5mbygnY29uZmlndXJpbmcgd2luc3RvbiBsb2dnZXIuLi4nKTtcbiAgICAvLyB1cGRhdGUgdmFsdWVzIHdpdGggbG9jYWwgY29uZmlnIHBhcmFtc1xuICAgIGNvbnN0IHtsb2dMZXZlbH0gPSBjb25maWc7XG4gICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xuICAgIC8vIGNvbmZpZ3VyZSB0aGUgd2luc3RvbiBsb2dnZXJcbiAgICBsb2dnZXIuY29uZmlndXJlKHtcbiAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IChsb2dnZXIudHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgICAgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5sb2dMZXZlbCxcbiAgICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICBjb2xvcml6ZSAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIHByZXR0eVByaW50ICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgLy8gdGVzdCBhbGwgdGhlIGxvZyBsZXZlbHNcbiAgICBsb2dnZXIuaW5mbygndGVzdGluZyB3aW5zdG9uIGxvZyBsZXZlbHMuLi4nKTtcbiAgICBsb2dnZXIuZXJyb3IoJ0xldmVsIDAnKTtcbiAgICBsb2dnZXIud2FybignTGV2ZWwgMScpO1xuICAgIGxvZ2dlci5pbmZvKCdMZXZlbCAyJyk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoJ0xldmVsIDMnKTtcbiAgICBsb2dnZXIuZGVidWcoJ0xldmVsIDQnKTtcbiAgICBsb2dnZXIuc2lsbHkoJ0xldmVsIDUnKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IExvZ2dlckNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCB3aW5zdG9uID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gd2luc3Rvbi53YXJuKCdObyBzbGFjayBjb25maWcgcmVjZWl2ZWQnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlc1xuICAgIHdpbnN0b24uaW5mbygnY29uZmlndXJpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICAgIC8vIHVwZGF0ZSBzbGFjayB3ZWJob29rIHNldHRpbmdzXG4gICAgaWYgKHRoaXMuc2xhY2tXZWJIb29rKSB7XG4gICAgICAvLyBhZGQgYSB0cmFuc3BvcnQgZm9yIGVycm9ycyB0byBzbGFja1xuICAgICAgaWYgKHRoaXMuc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1lcnJvcnMtdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2staW5mby10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrSW5mb0NoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlc1xuICAgICAgd2luc3Rvbi5pbmZvKCd0ZXN0aW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgICAgd2luc3Rvbi5pbmZvKCdTbGFjayBcImluZm9cIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tc2xhY2std2ViaG9va1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG5jb25zdCByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8gPSAodXNlckluc3RhbmNlKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgdXNlckluZm9bJ2lkJ10gPSB1c2VySW5zdGFuY2UuaWQ7XG4gICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSB1c2VySW5zdGFuY2UudXNlck5hbWU7XG4gICAgdXNlckluc3RhbmNlXG4gICAgICAuZ2V0Q2hhbm5lbCgpXG4gICAgICAudGhlbigoe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0pID0+IHtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQoY2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJlc29sdmUodXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICByZXR1cm4gZGIuVXNlclxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge3VzZXJOYW1lOiB1c2VybmFtZX0sXG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQocGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdQYXNzd29yZCB3YXMgYSBtYXRjaCwgcmV0dXJuaW5nIFVzZXInKTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8odXNlcilcbiAgICAgICAgICAgICAgLnRoZW4odXNlckluZm8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfSxcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgQ2hhbm5lbCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NoYW5uZWwnLFxuICAgIHtcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2hhbm5lbC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2hhbm5lbC5iZWxvbmdzVG8oZGIuVXNlcik7XG4gICAgQ2hhbm5lbC5oYXNPbmUoZGIuQ2VydGlmaWNhdGUpO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVsO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGFzc2V0RGVmYXVsdHM6IHsgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsIH0sIGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIChjb250ZW50VHlwZSkge1xuICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIHJldHVybiAnanBlZyc7XG4gICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgIHJldHVybiAncG5nJztcbiAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgcmV0dXJuICdnaWYnO1xuICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICByZXR1cm4gJ21wNCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5kZWJ1Zygnc2V0dGluZyB1bmtub3duIGZpbGUgdHlwZSBhcyBmaWxlIGV4dGVuc2lvbiBqcGVnJyk7XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUaHVtYm5haWwgKHN0b3JlZFRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCkge1xuICBpZiAoc3RvcmVkVGh1bWJuYWlsID09PSAnJykge1xuICAgIHJldHVybiBkZWZhdWx0VGh1bWJuYWlsO1xuICB9XG4gIHJldHVybiBzdG9yZWRUaHVtYm5haWw7XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhaW1EYXRhIChjbGFpbSkge1xuICAvLyBsb2dnZXIuZGVidWcoJ3ByZXBhcmluZyBjbGFpbSBkYXRhIGJhc2VkIG9uIHJlc29sdmVkIGRhdGE6JywgY2xhaW0pO1xuICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICBjbGFpbVsnaG9zdCddID0gaG9zdDtcbiAgcmV0dXJuIGNsYWltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENsYWltID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2xhaW0nLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlVXJsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbWV0YWRhdGFWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjb250ZW50VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzdHJlYW1WZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENsYWltLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDbGFpbS5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCBmb3IgJHtjbGFpbU5hbWV9IyR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0ocykgZm91bmQgd2l0aCB0aGF0IGNsYWltIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGNsYWltSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyBmb3IgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgICByYXcgIDogdHJ1ZSwgIC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb25seSBkYXRhLCBub3QgYW4gYXJyYXkgb2YgaW5zdGFuY2VzXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWxDbGFpbXNBcnJheSA9PiB7XG4gICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdjaGFubmVsY2xhaW1zYXJyYXkgbGVuZ3RoOicsIGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGNoYW5uZWxDbGFpbXNBcnJheS5mb3JFYWNoKGNsYWltID0+IHtcbiAgICAgICAgICAgICAgICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoY2hhbm5lbENsYWltc0FycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBmaW5kaW5nIGNsYWltIGlkIGZvciBjbGFpbSAke2NsYWltTmFtZX0gZnJvbSBjaGFubmVsICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSwgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaWQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGAke3Jlc3VsdC5sZW5ndGh9IHJlY29yZHMgZm91bmQgZm9yIFwiJHtjbGFpbU5hbWV9XCIgaW4gY2hhbm5lbCBcIiR7Y2hhbm5lbENsYWltSWR9XCJgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgc2hvcnRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke3Nob3J0SWR9JWAsXG4gICAgICAgICAgICB9fSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sICAvLyBub3RlOiBtYXliZSBoZWlnaHQgYW5kIGVmZmVjdGl2ZSBhbW91bnQgbmVlZCB0byBzd2l0Y2g/XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdsZW5ndGggb2YgcmVzdWx0JywgcmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmRhdGFWYWx1ZXMuY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLnZhbGlkYXRlTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NsYWltSWQoJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIGlmIChjbGFpbUlkICYmIChjbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNsYWltSWQgJiYgY2xhaW1JZC5sZW5ndGggPCA0MCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7ICAvLyBpZiBhIHNob3J0IGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUoY2xhaW1OYW1lKTsgIC8vIGlmIG5vIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIENsYWltLnJlc29sdmVDbGFpbSA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5yZXNvbHZlQ2xhaW06ICR7bmFtZX0gJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsYWltQXJyYXkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY2xhaW1BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYG1vcmUgdGhhbiBvbmUgcmVjb3JkIG1hdGNoZXMgJHtuYW1lfSMke2NsYWltSWR9IGluIGRiLkNsYWltYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDbGFpbTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBURVhUIH0pID0+IHtcbiAgY29uc3QgUmVxdWVzdCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1JlcXVlc3QnLFxuICAgIHtcbiAgICAgIGFjdGlvbjoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB1cmw6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaXBBZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIHR5cGUgICAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFJlcXVlc3QuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFJlcXVlc3QuYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUmVxdWVzdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IFVzZXIgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdVc2VyJyxcbiAgICB7XG4gICAgICB1c2VyTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFVzZXIuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFVzZXIuaGFzT25lKGRiLkNoYW5uZWwpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNvbXBhcmVQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAobmV3UGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaChuZXdQYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBjdXJyZW50IHBhc3N3b3JkIHdpdGggdGhlIG5ldyBoYXNoXG4gICAgICAgICAgdGhpc1xuICAgICAgICAgICAgLnVwZGF0ZSh7cGFzc3dvcmQ6IGhhc2h9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIHByZS1zYXZlIGhvb2sgbWV0aG9kIHRvIGhhc2ggdGhlIHVzZXIncyBwYXNzd29yZCBiZWZvcmUgdGhlIHVzZXIncyBpbmZvIGlzIHNhdmVkIHRvIHRoZSBkYi5cbiAgVXNlci5ob29rKCdiZWZvcmVDcmVhdGUnLCAodXNlciwgb3B0aW9ucykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnVXNlci5iZWZvcmVDcmVhdGUgaG9vay4uLicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgcGFzc3dvcmQgc3RyaW5nIHdpdGggdGhlIGhhc2ggcGFzc3dvcmQgdmFsdWVcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaDtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBVc2VyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYG5ldyBjaGFubmVsIHNpZ251cCByZXF1ZXN0LiB1c2VyOiAke3VzZXJuYW1lfSBwYXNzOiAke3Bhc3N3b3JkfSAuYCk7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgLy8gc2VydmVyLXNpZGUgdmFsaWRhdG9uIG9mIGlucHV0cyAodXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFubmVsIGFuZCByZXRyaWV2ZSB0aGUgbWV0YWRhdGFcbiAgICByZXR1cm4gbGJyeUFwaS5jcmVhdGVDaGFubmVsKGBAJHt1c2VybmFtZX1gKVxuICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgdXNlck5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXJEYXRhID4nLCB1c2VyRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCBjaGFubmVsRGF0YSA9IHtcbiAgICAgICAgICBjaGFubmVsTmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgY2hhbm5lbENsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2hhbm5lbERhdGEgPicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIGNlcnRpZmljYXRlIHJlY29yZFxuICAgICAgICBjb25zdCBjZXJ0aWZpY2F0ZURhdGEgPSB7XG4gICAgICAgICAgY2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgICAgbmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgLy8gYWRkcmVzcyxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NlcnRpZmljYXRlRGF0YSA+JywgY2VydGlmaWNhdGVEYXRhKTtcbiAgICAgICAgLy8gc2F2ZSB1c2VyIGFuZCBjZXJ0aWZpY2F0ZSB0byBkYlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLlVzZXIuY3JlYXRlKHVzZXJEYXRhKSwgZGIuQ2hhbm5lbC5jcmVhdGUoY2hhbm5lbERhdGEpLCBkYi5DZXJ0aWZpY2F0ZS5jcmVhdGUoY2VydGlmaWNhdGVEYXRhKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbbmV3VXNlciwgbmV3Q2hhbm5lbCwgbmV3Q2VydGlmaWNhdGVdKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAvLyBzdG9yZSB0aGUgcmVsZXZhbnQgbmV3VXNlciBpbmZvIHRvIGJlIHBhc3NlZCBiYWNrIGZvciByZXEuVXNlclxuICAgICAgICB1c2VySW5mb1snaWQnXSA9IG5ld1VzZXIuaWQ7XG4gICAgICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gbmV3VXNlci51c2VyTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIC8vIGFzc29jaWF0ZSB0aGUgaW5zdGFuY2VzXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbmV3Q2VydGlmaWNhdGUuc2V0Q2hhbm5lbChuZXdDaGFubmVsKSwgbmV3Q2hhbm5lbC5zZXRVc2VyKG5ld1VzZXIpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQodXNlckluZm8uY2hhbm5lbENsYWltSWQsIHVzZXJJbmZvLmNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ3NpZ251cCBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGNvbnNvbGUubG9nKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGNvbnNvbGUubG9nKCdkZXNlcmlhbGl6aW5nIHVzZXInKTtcbiAgICBkb25lKG51bGwsIHVzZXIpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwiY29uc3Qgc3BlZWNoUGFzc3BvcnQgPSByZXF1aXJlKCdzcGVlY2hQYXNzcG9ydCcpO1xuY29uc3QgaGFuZGxlU2lnbnVwUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2lnbnVwJyk7XG5jb25zdCBoYW5kbGVMb2dpblJlcXVlc3QgPSByZXF1aXJlKCcuL2xvZ2luJyk7XG5jb25zdCBoYW5kbGVMb2dvdXRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dvdXQnKTtcbmNvbnN0IGhhbmRsZVVzZXJSZXF1ZXN0ID0gcmVxdWlyZSgnLi91c2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAucG9zdCgnL3NpZ251cCcsIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtc2lnbnVwJyksIGhhbmRsZVNpZ251cFJlcXVlc3QpO1xuICBhcHAucG9zdCgnL2xvZ2luJywgaGFuZGxlTG9naW5SZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2xvZ291dCcsIGhhbmRsZUxvZ291dFJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvdXNlcicsIGhhbmRsZVVzZXJSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJjb25zdCBzaWdudXAgPSAocmVxLCByZXMpID0+IHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2lnbnVwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcblxuY29uc3QgbG9naW4gPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgc3BlZWNoUGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1sb2dpbicsIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgIH1cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxLmxvZ0luKHVzZXIsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pKHJlcSwgcmVzLCBuZXh0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJjb25zdCBsb2dvdXQgPSAocmVxLCByZXMpID0+IHtcbiAgcmVxLmxvZ291dCgpO1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3lvdSBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCd9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsImNvbnN0IHVzZXIgPSAocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS51c2VyKSB7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS51c2VyfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAndXNlciBpcyBub3QgbG9nZ2VkIGluJ30pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsImNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NoYW5uZWxBdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSByZXF1aXJlKCcuL2NoYW5uZWxDbGFpbXMnKTtcbmNvbnN0IGNoYW5uZWxEYXRhID0gcmVxdWlyZSgnLi9jaGFubmVsRGF0YScpO1xuY29uc3QgY2hhbm5lbFNob3J0SWQgPSByZXF1aXJlKCcuL2NoYW5uZWxTaG9ydElkJyk7XG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9IHJlcXVpcmUoJy4vY2xhaW1BdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNsYWltRGF0YSA9IHJlcXVpcmUoJy4vY2xhaW1EYXRhJyk7XG5jb25zdCBjbGFpbUdldCA9IHJlcXVpcmUoJy4vY2xhaW1HZXQnKTtcbmNvbnN0IGNsYWltTG9uZ0lkID0gcmVxdWlyZSgnLi9jbGFpbUxvbmdJZCcpO1xuY29uc3QgY2xhaW1QdWJsaXNoID0gcmVxdWlyZSgnLi9jbGFpbVB1Ymxpc2gnKTtcbmNvbnN0IGNsYWltUmVzb2x2ZSA9IHJlcXVpcmUoJy4vY2xhaW1SZXNvbHZlJyk7XG5jb25zdCBjbGFpbVNob3J0SWQgPSByZXF1aXJlKCcuL2NsYWltU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1MaXN0ID0gcmVxdWlyZSgnLi9jbGFpbUxpc3QnKTtcbmNvbnN0IGZpbGVBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2ZpbGVBdmFpbGFiaWxpdHknKTtcblxuY29uc3QgbXVsdGlwYXJ0TWlkZGxld2FyZSA9IHJlcXVpcmUoJ2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gY2hhbm5lbCByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS86bmFtZScsIGNoYW5uZWxBdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsIGNoYW5uZWxTaG9ydElkKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2RhdGEvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZCcsIGNoYW5uZWxEYXRhKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2NsYWltcy86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkLzpwYWdlJywgY2hhbm5lbENsYWltcyk7XG4gIC8vIGNsYWltIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCBjbGFpbUxpc3QpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsIGNsYWltR2V0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjbGFpbUF2YWlsYWJpbGl0eSk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vcmVzb2x2ZS86bmFtZS86Y2xhaW1JZCcsIGNsYWltUmVzb2x2ZSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCBjbGFpbVB1Ymxpc2gpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjbGFpbVNob3J0SWQpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9sb25nLWlkJywgY2xhaW1Mb25nSWQpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsIGNsYWltRGF0YSk7XG4gIC8vIGZpbGUgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvZmlsZS9hdmFpbGFiaWxpdHkvOm5hbWUvOmNsYWltSWQnLCBmaWxlQXZhaWxhYmlsaXR5KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsImNvbnN0IHsgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5KG5hbWUpXG4gICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbEF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxBdmFpbGFiaWxpdHkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgZ2V0Q2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhbGwgY2xhaW1zIGZvciBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlO1xuICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsQ2xhaW1zO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsImNvbnN0IENMQUlNU19QRVJfUEFHRSA9IDEyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2xhaW1zLCBwYWdlKSB7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsUGFnZXMoY2xhaW1zKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uUGFnZSA9IG1vZHVsZS5leHBvcnRzLmdldFBhZ2VGcm9tUXVlcnkocGFnZSk7XG4gICAgY29uc3Qgdmlld0RhdGEgPSB7XG4gICAgICBjaGFubmVsTmFtZSAgICAgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbXMgICAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmV4dHJhY3RQYWdlRnJvbUNsYWltcyhjbGFpbXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHByZXZpb3VzUGFnZSAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lUHJldmlvdXNQYWdlKHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlICAgICAgIDogcGFnaW5hdGlvblBhZ2UsXG4gICAgICBuZXh0UGFnZSAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZU5leHRQYWdlKHRvdGFsUGFnZXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHRvdGFsUGFnZXMgICAgICAgIDogdG90YWxQYWdlcyxcbiAgICAgIHRvdGFsUmVzdWx0cyAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxDbGFpbXMoY2xhaW1zKSxcbiAgICB9O1xuICAgIHJldHVybiB2aWV3RGF0YTtcbiAgfSxcbiAgZ2V0UGFnZUZyb21RdWVyeSAocGFnZSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFnZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9LFxuICBleHRyYWN0UGFnZUZyb21DbGFpbXMgKGNsYWltcywgcGFnZU51bWJlcikge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gW107ICAvLyBpZiBubyBjbGFpbXMsIHJldHVybiB0aGlzIGRlZmF1bHRcbiAgICB9XG4gICAgLy8gbG9nZ2VyLmRlYnVnKCdjbGFpbXMgaXMgYXJyYXk/JywgQXJyYXkuaXNBcnJheShjbGFpbXMpKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoYHBhZ2VOdW1iZXIgJHtwYWdlTnVtYmVyfSBpcyBudW1iZXI/YCwgTnVtYmVyLmlzSW50ZWdlcihwYWdlTnVtYmVyKSk7XG4gICAgY29uc3QgY2xhaW1TdGFydEluZGV4ID0gKHBhZ2VOdW1iZXIgLSAxKSAqIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBjbGFpbUVuZEluZGV4ID0gY2xhaW1TdGFydEluZGV4ICsgQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IHBhZ2VPZkNsYWltcyA9IGNsYWltcy5zbGljZShjbGFpbVN0YXJ0SW5kZXgsIGNsYWltRW5kSW5kZXgpO1xuICAgIHJldHVybiBwYWdlT2ZDbGFpbXM7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsUGFnZXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG90YWxDbGFpbXMgPSBjbGFpbXMubGVuZ3RoO1xuICAgICAgaWYgKHRvdGFsQ2xhaW1zIDwgQ0xBSU1TX1BFUl9QQUdFKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgY29uc3QgZnVsbFBhZ2VzID0gTWF0aC5mbG9vcih0b3RhbENsYWltcyAvIENMQUlNU19QRVJfUEFHRSk7XG4gICAgICBjb25zdCByZW1haW5kZXIgPSB0b3RhbENsYWltcyAlIENMQUlNU19QRVJfUEFHRTtcbiAgICAgIGlmIChyZW1haW5kZXIgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZ1bGxQYWdlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdWxsUGFnZXMgKyAxO1xuICAgIH1cbiAgfSxcbiAgZGV0ZXJtaW5lUHJldmlvdXNQYWdlIChjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSAtIDE7XG4gIH0sXG4gIGRldGVybWluZU5leHRQYWdlICh0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gdG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSArIDE7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsQ2xhaW1zIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBjbGFpbXMubGVuZ3RoO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwiY29uc3QgeyBnZXRDaGFubmVsRGF0YSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBkYXRhIGZvciBhIGNoYW5uZWxcblxuKi9cblxuY29uc3QgY2hhbm5lbERhdGEgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxEYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbERhdGEuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxucm91dGUgdG8gZ2V0IGEgc2hvcnQgY2hhbm5lbCBpZCBmcm9tIGxvbmcgY2hhbm5lbCBJZFxuXG4qL1xuXG5jb25zdCBjaGFubmVsU2hvcnRJZFJvdXRlID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihzaG9ydElkKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxTaG9ydElkUm91dGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsImNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHRoaXMgc2l0ZSBwdWJsaXNoZWQgdG8gYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcmV0dXJuIGRhdGEgZm9yIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1EYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gIGxldCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGlmIChjbGFpbUlkID09PSAnbm9uZScpIGNsYWltSWQgPSBudWxsO1xuICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKGNsYWltSW5mbyA9PiB7XG4gICAgICBpZiAoIWNsYWltSW5mbykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogY2xhaW1JbmZvfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbURhdGE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbURhdGEuanMiLCJjb25zdCB7IGdldENsYWltIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUdldCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKG5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzb2x2ZVJlc3VsdCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgIGlmICghcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHVyaSBmb3VuZCBpbiBDbGFpbSB0YWJsZScpO1xuICAgICAgfVxuICAgICAgbGV0IGZpbGVEYXRhID0gY3JlYXRlRmlsZURhdGEocmVzb2x2ZVJlc3VsdCk7XG4gICAgICAvLyBnZXQgdGhlIGNsYWltXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVEYXRhLCBnZXRSZXN1bHQgXSkgPT4ge1xuICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVEYXRhLCB7bmFtZSwgY2xhaW1JZH0sICdGaWxlJyksIGdldFJlc3VsdF0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlLCBjb21wbGV0ZWQgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltR2V0LmpzIiwiY29uc3QgeyBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgbG9uZyBjbGFpbSBpZFxuXG4qL1xuXG5jb25zdCBjbGFpbUxvbmdJZCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IGJvZHkuY2hhbm5lbE5hbWU7XG4gIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgY29uc3QgY2xhaW1OYW1lID0gYm9keS5jbGFpbU5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBib2R5LmNsYWltSWQ7XG4gIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DTEFJTSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0fSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxvbmdJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTG9uZ0lkLmpzIiwiY29uc3QgeyBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIHB1Ymxpc2ggfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGF1dGhlbnRpY2F0ZVVzZXIgfSA9IHJlcXVpcmUoJ2F1dGgvYXV0aGVudGljYXRpb24uanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHB1Ymxpc2ggYSBjbGFpbSB0aHJvdWdoIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1QdWJsaXNoID0gKHsgYm9keSwgZmlsZXMsIGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgdXNlciB9LCByZXMpID0+IHtcbiAgLy8gZGVmaW5lIHZhcmlhYmxlc1xuICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAvLyByZWNvcmQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlcXVlc3RcbiAgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICAvLyB2YWxpZGF0ZUFwaVB1Ymxpc2hSZXF1ZXN0KGJvZHksIGZpbGVzKTtcbiAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAoe2ZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGV9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzKGZpbGVzKSk7XG4gICAgKHtjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmR9ID0gYm9keSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICBQcm9taXNlXG4gICAgLmFsbChbXG4gICAgICBhdXRoZW50aWNhdGVVc2VyKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlciksXG4gICAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKSxcbiAgICAgIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyhmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpLFxuICAgICAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyh0aHVtYm5haWxGaWxlUGF0aCwgbmFtZSwgbGljZW5zZSwgbnNmdyksXG4gICAgXSlcbiAgICAudGhlbigoW3tjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9LCB2YWxpZGF0ZWRDbGFpbU5hbWUsIHB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbFB1Ymxpc2hQYXJhbXNdKSA9PiB7XG4gICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfbmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgdGh1bWJuYWlsXG4gICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICBwdWJsaXNoKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlVHlwZSk7XG4gICAgICB9XG4gICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgcmV0dXJuIHB1Ymxpc2gocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKTtcbiAgICB9KVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICBkYXRhICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgdXJsICAgIDogYCR7aG9zdH0vJHtyZXN1bHQuY2xhaW1faWR9LyR7bmFtZX1gLFxuICAgICAgICAgIGxicnlUeCA6IHJlc3VsdCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgLy8gcmVjb3JkIHRoZSBwdWJsaXNoIGVuZCB0aW1lIGFuZCBzZW5kIHRvIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1QdWJsaXNoO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1QdWJsaXNoLmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhlbnRpY2F0ZVVzZXIgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlcikge1xuICAgIC8vIGNhc2U6IG5vIGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIChhbm9ueW1vdXMpLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXNlciB0b2tlbiBpcyBwcm92aWRlZFxuICAgIGlmICghY2hhbm5lbE5hbWUgJiYgIWNoYW5uZWxJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IG51bGwsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCB1c2VyIHRva2VuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsTmFtZSAhPT0gdXNlci5jaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIG5hbWUgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWxJZCAmJiBjaGFubmVsSWQgIT09IHVzZXIuY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBpZCBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogdXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHBhc3N3b3JkIGluc3RlYWQgb2YgdXNlciB0b2tlblxuICAgIGlmICghY2hhbm5lbFBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ25vIGNoYW5uZWwgcGFzc3dvcmQgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCk7XG4gIH0sXG4gIGF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgdXNlclBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGhvaXN0ZWQgdmFyaWFibGVzXG4gICAgICBsZXQgY2hhbm5lbERhdGE7XG4gICAgICAvLyBidWlsZCB0aGUgcGFyYW1zIGZvciBmaW5kaW5nIHRoZSBjaGFubmVsXG4gICAgICBsZXQgY2hhbm5lbEZpbmRQYXJhbXMgPSB7fTtcbiAgICAgIGlmIChjaGFubmVsTmFtZSkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgIGlmIChjaGFubmVsSWQpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbElkO1xuICAgICAgLy8gZmluZCB0aGUgY2hhbm5lbFxuICAgICAgZGIuQ2hhbm5lbFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IGNoYW5uZWxGaW5kUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gY2hhbm5lbCBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5uZWxEYXRhID0gY2hhbm5lbC5nZXQoKTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgZGF0YTonLCBjaGFubmVsRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRiLlVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyB1c2VyTmFtZTogY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDEpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHVzZXJQYXNzd29yZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoJy4uLnBhc3N3b3JkIHdhcyBhIG1hdGNoLi4uJyk7XG4gICAgICAgICAgcmVzb2x2ZShjaGFubmVsRGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJjb25zdCB7IHJlc29sdmVVcmkgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBydW4gYSByZXNvbHZlIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuXG4qL1xuXG5jb25zdCBjbGFpbVJlc29sdmUgPSAoeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgIC50aGVuKHJlc29sdmVkVXJpID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc29sdmVkVXJpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUmVzb2x2ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUmVzb2x2ZS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIHNob3J0IGNsYWltIGlkIGZyb20gbG9uZyBjbGFpbSBJZFxuXG4qL1xuXG5jb25zdCBjbGFpbVNob3J0SWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHNob3J0SWR9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltU2hvcnRJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1MaXN0IH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGxpc3Qgb2YgY2xhaW1zXG5cbiovXG5cbmNvbnN0IGNsYWltTGlzdCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oY2xhaW1zTGlzdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjbGFpbXNMaXN0KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltTGlzdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTGlzdC5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlZSBpZiBhc3NldCBpcyBhdmFpbGFibGUgbG9jYWxseVxuXG4qL1xuXG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBkYi5GaWxlXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY2xhaW1JZCxcbiAgICAgIH0sXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBmYWxzZX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsZUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2ZpbGVBdmFpbGFiaWxpdHkuanMiLCJjb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyB1cGxvYWREaXJlY3RvcnkgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgbXVsdGlwYXJ0TWlkZGxld2FyZSA9IG11bHRpcGFydCh7dXBsb2FkRGlyOiB1cGxvYWREaXJlY3Rvcnl9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBhcnRNaWRkbGV3YXJlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbXVsdGlwYXJ0eVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBoYW5kbGVQYWdlUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZFJlYWN0QXBwJyk7XG5jb25zdCBoYW5kbGVFbWJlZFJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRFbWJlZFBhZ2UnKTtcbmNvbnN0IHJlZGlyZWN0ID0gcmVxdWlyZSgnLi9yZWRpcmVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLmdldCgnLycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2xvZ2luJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvYWJvdXQnLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy90cmVuZGluZycsIHJlZGlyZWN0KCcvcG9wdWxhcicpKTtcbiAgYXBwLmdldCgnL3BvcHVsYXInLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9uZXcnLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9lbWJlZC86Y2xhaW1JZC86bmFtZScsIGhhbmRsZUVtYmVkUmVxdWVzdCk7ICAvLyByb3V0ZSB0byBzZW5kIGVtYmVkYWJsZSB2aWRlbyBwbGF5ZXIgKGZvciB0d2l0dGVyKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJjb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5jb25zdCBzZW5kUmVhY3RBcHAgPSAocmVxLCByZXMpID0+IHtcbiAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRSZWFjdEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZFJlYWN0QXBwLmpzIiwiY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCBzZW5kRW1iZWRQYWdlID0gKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgLy8gZ2V0IGFuZCByZW5kZXIgdGhlIGNvbnRlbnRcbiAgcmVzLnN0YXR1cygyMDApLnJlbmRlcignZW1iZWQnLCB7IGxheW91dDogJ2VtYmVkJywgaG9zdCwgY2xhaW1JZCwgbmFtZSB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZEVtYmVkUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZEVtYmVkUGFnZS5qcyIsImNvbnN0IHJlZGlyZWN0ID0gKHJvdXRlKSA9PiB7XG4gIHJldHVybiAocmVxLCByZXMpID0+IHtcbiAgICByZXMuc3RhdHVzKDMwMSkucmVkaXJlY3Qocm91dGUpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZWRpcmVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJjb25zdCBzZXJ2ZUFzc2V0QnlDbGFpbSA9IHJlcXVpcmUoJy4vc2VydmVBc3NldEJ5Q2xhaW0nKTtcbmNvbnN0IHNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSA9IHJlcXVpcmUoJy4vc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCwgZGIpID0+IHtcbiAgYXBwLmdldCgnLzppZGVudGlmaWVyLzpjbGFpbScsIHNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSk7XG4gIGFwcC5nZXQoJy86Y2xhaW0nLCBzZXJ2ZUFzc2V0QnlDbGFpbSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7IGRldGVybWluZVJlc3BvbnNlVHlwZSwgbG9nUmVxdWVzdERhdGEsIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IH0gPSByZXF1aXJlKCdoZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxuLypcblxuICByb3V0ZSB0byBzZXJ2ZSBhbiBhc3NldCBvciB0aGUgcmVhY3QgYXBwIHZpYSB0aGUgY2xhaW0gbmFtZSBvbmx5XG5cbiovXG5cbmNvbnN0IHNlcnZlckFzc2V0QnlDbGFpbSA9IChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gIH1cbiAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgLy8gcGFyc2UgdGhlIGNsYWltXG4gIGxldCBjbGFpbU5hbWU7XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWV9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBudWxsLCBudWxsKTtcbiAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQobnVsbCwgbnVsbCwgY2xhaW1OYW1lLCBudWxsLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZlckFzc2V0QnlDbGFpbTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUNsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2FcIlxuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYS9lZmZlY3RzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCJcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgc2VuZEdBU2VydmVFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MnKTtcbmNvbnN0IHtcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlLFxuICBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5LFxuICBsb2dSZXF1ZXN0RGF0YSxcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQsXG59ID0gcmVxdWlyZSgnaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxuLypcblxuICByb3V0ZSB0byBzZXJ2ZSBhbiBhc3NldCBvciB0aGUgcmVhY3QgYXBwIHZpYSB0aGUgY2xhaW0gbmFtZSBhbmQgYW4gaWRlbnRpZmllclxuXG4qL1xuXG5jb25zdCBzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltID0gKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgfVxuICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgbGV0IGNsYWltTmFtZTtcbiAgdHJ5IHtcbiAgICAoeyBjbGFpbU5hbWUgfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gcGFyc2UgdGhlIGlkZW50aWZpZXJcbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihwYXJhbXMuaWRlbnRpZmllcikpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBpZiAoIWlzQ2hhbm5lbCkge1xuICAgIFtjbGFpbUlkLCBjbGFpbU5hbWVdID0gZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eShjbGFpbUlkLCBjbGFpbU5hbWUpO1xuICB9XG4gIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKTtcbiAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIGFwcC5nZXQoJyonLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9zZW5kUmVhY3RBcHAuanMiXSwic291cmNlUm9vdCI6IiJ9