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
    title: 'Spee.ch'
  };
  this.auth = {
    sessionKey: 'default'
  };
  this.customComponents = {};
  this.customContainers = {};
  this.customPages = {};
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
      var publicPath = Path.resolve(__dirname, 'public');
      app.use(express.static(publicPath));
      logger.info('serving static files from default path:', publicPath);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTk3NzMzM2JkMmZhNjcwZDUzYTMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3RvblwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNwZWUuY2gtY29tcG9uZW50c1wiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2hhdHdnLWZldGNoXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbWlkZGxld2FyZS9yZXF1ZXN0TG9nZ2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9zaWdudXAuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbEF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxDbGFpbXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbERhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbFNob3J0SWQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1BdmFpbGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1EYXRhLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltR2V0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTG9uZ0lkLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvYXV0aC9hdXRoZW50aWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1TaG9ydElkLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9maWxlQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRSZWFjdEFwcC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRFbWJlZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9yZWRpcmVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlDbGFpbS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9zZW5kUmVhY3RBcHAuanMiXSwibmFtZXMiOlsibG9nZ2VyIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJoYW5kbGVFcnJvclJlc3BvbnNlIiwib3JpZ2luYWxVcmwiLCJpcCIsImVycm9yIiwicmVzIiwidXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzIiwicmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzIiwic3RhdHVzIiwibWVzc2FnZSIsImpzb24iLCJjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCIsImNvZGUiLCJlcnIiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwibmV3RXJyb3JPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZm9yRWFjaCIsImtleSIsInN1Y2Nlc3MiLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsIlNlcXVlbGl6ZSIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInNlcXVlbGl6ZSIsImhvc3QiLCJkaWFsZWN0IiwiZGlhbGVjdE9wdGlvbnMiLCJkZWNpbWFsTnVtYmVycyIsImxvZ2dpbmciLCJwb29sIiwibWF4IiwibWluIiwiaWRsZSIsImFjcXVpcmUiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwiaW5mbyIsImNhdGNoIiwiZGIiLCJpbXBvcnQiLCJtb2RlbE5hbWUiLCJhc3NvY2lhdGUiLCJ1cHNlcnQiLCJNb2RlbCIsInZhbHVlcyIsImNvbmRpdGlvbiIsInRhYmxlTmFtZSIsImZpbmRPbmUiLCJ3aGVyZSIsIm9iaiIsImRlYnVnIiwidXBkYXRlIiwiY3JlYXRlIiwiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjdXN0b21Db250YWluZXJzIiwiY3VzdG9tUGFnZXMiLCJkZXRhaWxzIiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsInJvdXRlcyIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiZXZlbnRDYXRlZ29yeSIsImV2ZW50QWN0aW9uIiwiZXZlbnRMYWJlbCIsImlwT3ZlcnJpZGUiLCJ1c2VyQWdlbnRPdmVycmlkZSIsImNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyIsImNhdGVnb3J5IiwidmFyaWFibGUiLCJsYWJlbCIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkdXJhdGlvbiIsInVzZXJUaW1pbmdDYXRlZ29yeSIsInVzZXJUaW1pbmdWYXJpYWJsZU5hbWUiLCJ1c2VyVGltaW5nVGltZSIsInVzZXJUaW1pbmdMYWJlbCIsInNlbmRHb29nbGVBbmFseXRpY3NFdmVudCIsInBhcmFtcyIsInZpc2l0b3JJZCIsInJlcGxhY2UiLCJ2aXNpdG9yIiwic3RyaWN0Q2lkRm9ybWF0IiwiaHR0cHMiLCJldmVudCIsInNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmciLCJ0aW1pbmciLCJzZW5kR0FTZXJ2ZUV2ZW50Iiwic2VuZEdBVGltaW5nRXZlbnQiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJjaGFubmVsTmFtZSIsImNoYW5uZWxfbmFtZSIsImNoYW5uZWxJZCIsImNoYW5uZWxfaWQiLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJkYXRhIiwicmVzdWx0IiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwicHVibGlzaENsYWltIiwicHVibGlzaFBhcmFtcyIsIm5hbWUiLCJnYVN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJQcm9taXNlIiwicG9zdCIsIm1ldGhvZCIsInJlc3BvbnNlIiwiZ2V0Q2xhaW0iLCJ1cmkiLCJ0aW1lb3V0IiwiZ2V0Q2xhaW1MaXN0IiwiY2xhaW1OYW1lIiwicmVzb2x2ZVVyaSIsImdldERvd25sb2FkRGlyZWN0b3J5IiwiZG93bmxvYWRfZGlyZWN0b3J5IiwiY3JlYXRlQ2hhbm5lbCIsImFtb3VudCIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImNoYW5uZWxDbGFpbUlkIiwiY2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImFsbCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsInBhZ2UiLCJsb25nQ2hhbm5lbENsYWltSWQiLCJnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkIiwic2hvcnRDaGFubmVsQ2xhaW1JZCIsImdldENoYW5uZWxDbGFpbXMiLCJnZXRBbGxDaGFubmVsQ2xhaW1zIiwiY2hhbm5lbENsYWltc0FycmF5IiwicGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhIiwiZ2V0TG9jYWxGaWxlUmVjb3JkIiwiZmlsZSIsImRhdGFWYWx1ZXMiLCJwYXNzcG9ydCIsImxvY2FsTG9naW5TdHJhdGVneSIsImxvY2FsU2lnbnVwU3RyYXRlZ3kiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVVc2VyIiwic2VyaWFsaXplVXNlciIsInVzZSIsImxicnlBcGkiLCJwdWJsaXNoSGVscGVycyIsIk9wIiwicHVibGlzaCIsImZpbGVOYW1lIiwiZmlsZVR5cGUiLCJwdWJsaXNoUmVzdWx0cyIsImNlcnRpZmljYXRlSWQiLCJ0eCIsImNoYW5uZWwiLCJmaWxlUmVjb3JkIiwiY2xhaW1faWQiLCJtZXRhZGF0YSIsImFkZHJlc3MiLCJjbGFpbV9hZGRyZXNzIiwib3V0cG9pbnQiLCJ0eGlkIiwibm91dCIsImhlaWdodCIsImZpbGVQYXRoIiwiZmlsZV9wYXRoIiwibnNmdyIsImNsYWltUmVjb3JkIiwiY29udGVudFR5cGUiLCJiaWQiLCJ1cHNlcnRDcml0ZXJpYSIsImNsYWltIiwic2V0Q2xhaW0iLCJzZXRGaWxlIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2xhaW1BZGRyZXNzZXMiLCJwdXNoIiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJvciIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsImZzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkiLCJsaWNlbnNlIiwiaW52YWxpZE5hbWVDaGFyYWN0ZXJzIiwiZXhlYyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyIsInBhdGgiLCJ0eXBlIiwic2l6ZSIsInRlc3QiLCJ2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSIsInRodW1ibmFpbEZpbGVOYW1lIiwidGh1bWJuYWlsRmlsZVBhdGgiLCJ0aHVtYm5haWxGaWxlVHlwZSIsImNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyIsInRyaW0iLCJhdXRob3IiLCJsYW5ndWFnZSIsImNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJ1bmxpbmsiLCJhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSIsImZpbGVJbmZvIiwiZ2V0UmVzdWx0IiwiZmlsZV9uYW1lIiwiZG93bmxvYWRfcGF0aCIsImNyZWF0ZUZpbGVEYXRhIiwibXlzcWwiLCJ3YXJuIiwicmV0dXJuU2hvcnRJZCIsImNsYWltc0FycmF5IiwibG9uZ0lkIiwiY2xhaW1JbmRleCIsInNob3J0SWQiLCJzdWJzdHJpbmciLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwiZWxlbWVudCIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwiZmlsdGVyIiwic2l0ZUNvbmZpZyIsInJlcSIsImNvbnRleHQiLCJNeVJlZHVjZXJzIiwiTXlBcHAiLCJNeUdBTGlzdGVuZXIiLCJzdG9yZSIsImh0bWwiLCJ1cmwiLCJoZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJyZWRpcmVjdCIsInByZWxvYWRlZFN0YXRlIiwiZ2V0U3RhdGUiLCJzZW5kIiwidG9TdHJpbmciLCJtZXRhIiwibGluayIsIlNFUlZFIiwiU0hPVyIsImNsaWVudEFjY2VwdHNIdG1sIiwiYWNjZXB0IiwibWF0Y2giLCJyZXF1ZXN0SXNGcm9tQnJvd3NlciIsImNsaWVudFdhbnRzQXNzZXQiLCJyYW5nZSIsImltYWdlSXNXYW50ZWQiLCJ2aWRlb0lzV2FudGVkIiwiaXNWYWxpZENsYWltSWQiLCJpc1ZhbGlkU2hvcnRJZCIsImlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIiwiaW5wdXQiLCJzZXJ2ZUFzc2V0VG9DbGllbnQiLCJ2ZXJib3NlIiwic2VuZEZpbGVPcHRpb25zIiwic2VuZEZpbGUiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImZ1bGxDbGFpbUlkIiwiZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIiwiaGFzRmlsZUV4dGVuc2lvbiIsInJlc3BvbnNlVHlwZSIsImZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkiLCJpZGVudGlmaWVyIiwidGVtcE5hbWUiLCJsb2dSZXF1ZXN0RGF0YSIsIlJFR0VYUF9JTlZBTElEX0NMQUlNIiwiUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCIsIlJFR0VYUF9BRERSRVNTIiwiQ0hBTk5FTF9DSEFSIiwicGFyc2VJZGVudGlmaWVyIiwiY29tcG9uZW50c1JlZ2V4IiwiUmVnRXhwIiwibWFwIiwicHJvdG8iLCJ2YWx1ZSIsIm1vZGlmaWVyU2VwZXJhdG9yIiwibW9kaWZpZXIiLCJpc0NoYW5uZWwiLCJzdGFydHNXaXRoIiwibmFtZUJhZENoYXJzIiwiam9pbiIsInBhcnNlQ2xhaW0iLCJwYXJzZU1vZGlmaWVyIiwicmV0dXJuU2FnYVdpdGhQYXJhbXMiLCJzYWdhIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlIiwiYWN0aW9uIiwib25IYW5kbGVTaG93UGFnZVVyaSIsImhhbmRsZVNob3dQYWdlVXJpIiwicnVuIiwiZG9uZSIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJyZXF1ZXN0TG9nZ2VyIiwiUGF0aCIsImxvZ2dlckNvbmZpZyIsIm15c3FsQ29uZmlnIiwic2xhY2tDb25maWciLCJTZXJ2ZXIiLCJjb25maWd1cmVMb2dnZXIiLCJ1c2VyQ29uZmlnIiwiY29uZmlndXJlTXlzcWwiLCJjb25maWd1cmVTaXRlIiwiY29uZmlndXJlU2xhY2siLCJjb25maWd1cmVNb2RlbHMiLCJjb25maWd1cmVSb3V0ZXMiLCJjcmVhdGVBcHAiLCJhcHAiLCJlbmFibGUiLCJwdWJsaWNGb2xkZXIiLCJwcm9jZXNzIiwiY3dkIiwic3RhdGljIiwicHVibGljUGF0aCIsIl9fZGlybmFtZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNwZWVjaFBhc3Nwb3J0IiwibWF4QWdlIiwiaW5pdGlhbGl6ZSIsInNlc3Npb24iLCJoYnMiLCJkZWZhdWx0TGF5b3V0IiwiaGFuZGxlYmFycyIsImVuZ2luZSIsInNldCIsInNlcnZlciIsInN0YXJ0IiwiUE9SVCIsInN5bmMiLCJsaXN0ZW4iLCJuZXh0IiwiTG9nZ2VyQ29uZmlnIiwibG9nTGV2ZWwiLCJjb25maWd1cmUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwidXNlckluZm8iLCJpZCIsInVzZXJOYW1lIiwiZ2V0Q2hhbm5lbCIsInNob3J0Q2hhbm5lbElkIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VyIiwiY29tcGFyZVBhc3N3b3JkIiwiaXNNYXRjaCIsIlNUUklORyIsIkJPT0xFQU4iLCJJTlRFR0VSIiwiVEVYVCIsIkRFQ0lNQUwiLCJkZWZpbmUiLCJkZWZhdWx0IiwiY2xhaW1TZXF1ZW5jZSIsImRlY29kZWRDbGFpbSIsImRlcHRoIiwiZWZmZWN0aXZlQW1vdW50IiwiaGFzU2lnbmF0dXJlIiwiaGV4IiwidmFsaWRBdEhlaWdodCIsInZhbHVlVmVyc2lvbiIsImNsYWltVHlwZSIsImNlcnRpZmljYXRlVmVyc2lvbiIsImtleVR5cGUiLCJwdWJsaWNLZXkiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJmb3JlaWduS2V5IiwiYWxsb3dOdWxsIiwib3JkZXIiLCJnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkIiwiJGxpa2UiLCJnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lIiwidmFsaWRhdGVMb25nQ2hhbm5lbElkIiwiaGFzT25lIiwiZGVmYXVsdFRodW1ibmFpbCIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2UiLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwib3B0aW9ucyIsInVzZXJEYXRhIiwiY2hhbm5lbERhdGEiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiaGFuZGxlU2lnbnVwUmVxdWVzdCIsImhhbmRsZUxvZ2luUmVxdWVzdCIsImhhbmRsZUxvZ291dFJlcXVlc3QiLCJoYW5kbGVVc2VyUmVxdWVzdCIsImdldCIsInNpZ251cCIsImxvZ2luIiwibG9nSW4iLCJsb2dvdXQiLCJjaGFubmVsQXZhaWxhYmlsaXR5IiwiY2hhbm5lbENsYWltcyIsImNoYW5uZWxTaG9ydElkIiwiY2xhaW1BdmFpbGFiaWxpdHkiLCJjbGFpbURhdGEiLCJjbGFpbUdldCIsImNsYWltTG9uZ0lkIiwiY2xhaW1QdWJsaXNoIiwiY2xhaW1SZXNvbHZlIiwiY2xhaW1TaG9ydElkIiwiY2xhaW1MaXN0IiwiZmlsZUF2YWlsYWJpbGl0eSIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJhdmFpbGFibGVOYW1lIiwiYm9keSIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsImNoYW5uZWxTaG9ydElkUm91dGUiLCJjbGFpbUluZm8iLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJjb21wbGV0ZWQiLCJhdXRoZW50aWNhdGVVc2VyIiwiZmlsZXMiLCJjaGFubmVsUGFzc3dvcmQiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJyZXNvbHZlZFVyaSIsImNsYWltc0xpc3QiLCJtdWx0aXBhcnQiLCJ1cGxvYWREaXIiLCJoYW5kbGVQYWdlUmVxdWVzdCIsImhhbmRsZUVtYmVkUmVxdWVzdCIsImhhbmRsZVBhZ2VSZW5kZXIiLCJzZW5kUmVhY3RBcHAiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwic2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxJQUFNQSxTQUFTLG1CQUFBQyxDQUFRLENBQVIsQ0FBZjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyx1QkFBcUIsNkJBQVVDLFdBQVYsRUFBdUJDLEVBQXZCLEVBQTJCQyxLQUEzQixFQUFrQ0MsR0FBbEMsRUFBdUM7QUFDMURSLFdBQU9PLEtBQVAsZUFBeUJGLFdBQXpCLEVBQXdDSCxP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QUFJQU4sT0FBT0MsT0FBUCxHQUFpQndqQixZQUFqQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxOTc3MzMzYmQyZmE2NzBkNTNhMyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFuZGxlRXJyb3JSZXNwb25zZTogZnVuY3Rpb24gKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcykge1xuICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igb24gJHtvcmlnaW5hbFVybH1gLCBtb2R1bGUuZXhwb3J0cy51c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMoZXJyb3IpKTtcbiAgICBjb25zdCBbc3RhdHVzLCBtZXNzYWdlXSA9IG1vZHVsZS5leHBvcnRzLnJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyhlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKHN0YXR1cylcbiAgICAgIC5qc29uKG1vZHVsZS5leHBvcnRzLmNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkKHN0YXR1cywgbWVzc2FnZSkpO1xuICB9LFxuICByZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGxldCBzdGF0dXMsIG1lc3NhZ2U7XG4gICAgLy8gY2hlY2sgZm9yIGRhZW1vbiBiZWluZyB0dXJuZWQgb2ZmXG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICBzdGF0dXMgPSA1MDM7XG4gICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gcmVmdXNlZC4gIFRoZSBkYWVtb24gbWF5IG5vdCBiZSBydW5uaW5nLic7XG4gICAgICAvLyBmYWxsYmFjayBmb3IgZXZlcnl0aGluZyBlbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IDQwMDtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBbc3RhdHVzLCBtZXNzYWdlXTtcbiAgfSxcbiAgdXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID09PSAwKSB7XG4gICAgICBsZXQgbmV3RXJyb3JPYmplY3QgPSB7fTtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIG5ld0Vycm9yT2JqZWN0W2tleV0gPSBlcnJba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0Vycm9yT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9LFxuICBjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJjb25zdCBDZXJ0aWZpY2F0ZSA9IHJlcXVpcmUoJ21vZGVscy9jZXJ0aWZpY2F0ZS5qcycpO1xuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJ21vZGVscy9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJ21vZGVscy9jbGFpbS5qcycpO1xuY29uc3QgRmlsZSA9IHJlcXVpcmUoJ21vZGVscy9maWxlLmpzJyk7XG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnbW9kZWxzL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCdtb2RlbHMvdXNlci5qcycpO1xuXG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3Qge2RhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmR9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcblxuLy8gc2V0IHNlcXVlbGl6ZSBvcHRpb25zXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcbiAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0ICAgICAgIDogJ215c3FsJyxcbiAgZGlhbGVjdE9wdGlvbnM6IHtkZWNpbWFsTnVtYmVyczogdHJ1ZX0sXG4gIGxvZ2dpbmcgICAgICAgOiBmYWxzZSxcbiAgcG9vbCAgICAgICAgICA6IHtcbiAgICBtYXggICAgOiA1LFxuICAgIG1pbiAgICA6IDAsXG4gICAgaWRsZSAgIDogMTAwMDAsXG4gICAgYWNxdWlyZTogMTAwMDAsXG4gIH0sXG59KTtcblxuLy8gZXN0YWJsaXNoIG15c3FsIGNvbm5lY3Rpb25cbnNlcXVlbGl6ZVxuICAuYXV0aGVudGljYXRlKClcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKCdTZXF1ZWxpemUgaGFzIGVzdGFibGlzaGVkIG15c3FsIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5LicpO1xuICB9KVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICBsb2dnZXIuZXJyb3IoJ1NlcXVlbGl6ZSB3YXMgdW5hYmxlIHRvIGNvbm5lY3QgdG8gdGhlIGRhdGFiYXNlOicsIGVycik7XG4gIH0pO1xuXG4vLyBtYW51YWxseSBhZGQgZWFjaCBtb2RlbCB0byB0aGUgZGIgb2JqZWN0IChub3RlOiBtYWtlIHRoaXMgZHluYW1pYylcbmNvbnN0IGRiID0ge307XG5kYlsnQ2VydGlmaWNhdGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NlcnRpZmljYXRlJywgQ2VydGlmaWNhdGUpO1xuZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbmRiWydDbGFpbSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2xhaW0nLCBDbGFpbSk7XG5kYlsnRmlsZSddID0gc2VxdWVsaXplLmltcG9ydCgnRmlsZScsIEZpbGUpO1xuZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbmRiWydVc2VyJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdVc2VyJywgVXNlcik7XG5cbi8vIHJ1biBtb2RlbC5hc3NvY2lhdGlvbiBmb3IgZWFjaCBtb2RlbCBpbiB0aGUgZGIgb2JqZWN0IHRoYXQgaGFzIGFuIGFzc29jaWF0aW9uXG5sb2dnZXIuaW5mbygnYXNzb2NpYXRpbmcgZGIgbW9kZWxzLi4uJyk7XG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChtb2RlbE5hbWUgPT4ge1xuICBpZiAoZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUpIHtcbiAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICBkYlttb2RlbE5hbWVdLmFzc29jaWF0ZShkYik7XG4gIH1cbn0pO1xuXG4vLyBhZGQgc2VxdWVsaXplL1NlcXVlbGl6ZSB0byBkYlxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplO1xuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwiZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7fTtcbiAgdGhpcy5jdXN0b21Db250YWluZXJzID0ge307XG4gIHRoaXMuY3VzdG9tUGFnZXMgPSB7fTtcbiAgdGhpcy5kZXRhaWxzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT3Blbi1zb3VyY2UsIGRlY2VudHJhbGl6ZWQgaW1hZ2UgYW5kIHZpZGVvIHNoYXJpbmcuJyxcbiAgICBob3N0ICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHBvcnQgICAgICAgOiAzMDAwLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gICAgdHdpdHRlciAgICA6ICdAc3BlZV9jaCcsXG4gIH07XG4gIHRoaXMucHVibGlzaGluZyA9IHtcbiAgICBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXM6IFtdLFxuICAgIGRpc2FibGVkICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgZGlzYWJsZWRNZXNzYWdlICAgICAgICAgOiAnUGxlYXNlIGNoZWNrIGJhY2sgc29vbi4nLFxuICAgIHByaW1hcnlDbGFpbUFkZHJlc3MgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWwgICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWxJZCAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHVwbG9hZERpcmVjdG9yeSAgICAgICAgIDogJy9ob21lL2xicnkvVXBsb2FkcycsXG4gIH07XG4gIHRoaXMucm91dGVzID0ge307XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNpdGUgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7IGFuYWx5dGljcywgYXNzZXREZWZhdWx0cywgYXV0aCwgY3VzdG9tQ29tcG9uZW50cywgY3VzdG9tQ29udGFpbmVycywgY3VzdG9tUGFnZXMsIGRldGFpbHMsIHB1Ymxpc2hpbmcsIHJvdXRlcyB9ID0gY29uZmlnO1xuICAgIGNvbnNvbGUubG9nKCdDb25maWd1cmluZyBzaXRlIGRldGFpbHMuLi4nKTtcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gICAgdGhpcy5jdXN0b21Db250YWluZXJzID0gY3VzdG9tQ29udGFpbmVycztcbiAgICB0aGlzLmN1c3RvbVBhZ2VzID0gY3VzdG9tUGFnZXM7XG4gICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgYXBpOiB7IGFwaUhvc3QsIGFwaVBvcnQgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL2xicnlDb25maWcuanMnKTtcbmNvbnN0IGxicnlBcGlVcmkgPSAnaHR0cDovLycgKyBhcGlIb3N0ICsgJzonICsgYXBpUG9ydDtcbmNvbnN0IHsgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsLCBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi9nb29nbGVBbmFseXRpY3MuanMnKTtcblxuY29uc3QgaGFuZGxlTGJyeW5ldFJlc3BvbnNlID0gKHsgZGF0YSB9LCByZXNvbHZlLCByZWplY3QpID0+IHtcbiAgbG9nZ2VyLmRlYnVnKCdsYnJ5IGFwaSBkYXRhOicsIGRhdGEpO1xuICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAvLyBjaGVjayBmb3IgYW4gZXJyb3JcbiAgICBpZiAoZGF0YS5yZXN1bHQuZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnTGJyeW5ldCBhcGkgZXJyb3I6JywgZGF0YS5yZXN1bHQuZXJyb3IpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihkYXRhLnJlc3VsdC5lcnJvcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGZhbGxiYWNrIGluIGNhc2UgaXQganVzdCB0aW1lZCBvdXRcbiAgcmVqZWN0KEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoQ2xhaW0gKHB1Ymxpc2hQYXJhbXMpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUHVibGlzaGluZyBjbGFpbSB0byBcIiR7cHVibGlzaFBhcmFtcy5uYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncHVibGlzaCcsXG4gICAgICAgICAgcGFyYW1zOiBwdWJsaXNoUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncHVibGlzaCcsIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbChwdWJsaXNoUGFyYW1zKSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW0gKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIENsYWltIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpLCB0aW1lb3V0OiAyMCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW0nLCAnR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1MaXN0IChjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBjbGFpbV9saXN0IGZvciBcIiR7Y2xhaW1OYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2xhaW1fbGlzdCcsXG4gICAgICAgICAgcGFyYW1zOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW1MaXN0JywgJ0NMQUlNX0xJU1QnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZXNvbHZlVXJpICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUmVzb2x2aW5nIFVSSSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3Jlc29sdmUnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncmVzb2x2ZVVyaScsICdSRVNPTFZFJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdFt1cmldLmVycm9yKSB7ICAvLyBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgICAgICByZWplY3QoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHsgIC8vIGlmIG5vIGVycm9ycywgcmVzb2x2ZVxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdFt1cmldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldERvd25sb2FkRGlyZWN0b3J5ICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ2xicnlBcGkgPj4gUmV0cmlldmluZyB0aGUgZG93bmxvYWQgZGlyZWN0b3J5IHBhdGggZnJvbSBsYnJ5IGRhZW1vbi4uLicpO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3NldHRpbmdzX2dldCcsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldERvd25sb2FkRGlyZWN0b3J5JywgJ1NFVFRJTkdTX0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQuZG93bmxvYWRfZGlyZWN0b3J5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byBsYnJ5IGRhZW1vbiwgYnV0IHVuYWJsZSB0byByZXRyaWV2ZSB0aGUgZG93bmxvYWQgZGlyZWN0b3J5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0xicnluZXQgRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUoJy9ob21lL2xicnkvRG93bmxvYWRzLycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlQ2hhbm5lbCAobmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBDcmVhdGluZyBjaGFubmVsIGZvciAke25hbWV9Li4uYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2hhbm5lbF9uZXcnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgY2hhbm5lbF9uYW1lOiBuYW1lLFxuICAgICAgICAgICAgYW1vdW50ICAgICAgOiAwLjEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2NyZWF0ZUNoYW5uZWwnLCAnQ0hBTk5FTF9ORVcnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJjb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIH0gPSByZXF1aXJlKCdoZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lLCBjbGFpbUlkKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2hhbm5lbChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2xhaW0obmFtZSwgY2xhaW1JZCk7XG4gICAgfVxuICB9LFxuICBnZXRDbGFpbUlkQnlDbGFpbSAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDbGFpbSgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNsYWltLmdldExvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNoYW5uZWwoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9LCAke2NsYWltTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBpZFxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbElkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxJZCwgZGIuQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbElkLCBjbGFpbU5hbWUpXSk7ICAvLyAyLiBnZXQgdGhlIGxvbmcgY2xhaW0gaWRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbElkLCBsb25nQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsRGF0YSAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIHNob3J0Q2hhbm5lbENsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICAgIHNob3J0Q2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zKGxvbmdDaGFubmVsQ2xhaW1JZCldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheV0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIGZvcm1hdCB0aGUgZGF0YSBmb3IgdGhlIHZpZXcsIGluY2x1ZGluZyBwYWdpbmF0aW9uXG4gICAgICAgICAgbGV0IHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSA9IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5LCBwYWdlKTtcbiAgICAgICAgICAvLyA0LiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uIGFuZCBjb250ZW50c1xuICAgICAgICAgIHJlc29sdmUocGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0TG9jYWxGaWxlUmVjb3JkIChjbGFpbUlkLCBuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkZpbGUuZmluZE9uZSh7d2hlcmU6IHtjbGFpbUlkLCBuYW1lfX0pXG4gICAgICAudGhlbihmaWxlID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIE5PX0ZJTEU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGUuZGF0YVZhbHVlcztcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJjb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5jb25zdCBsb2NhbExvZ2luU3RyYXRlZ3kgPSByZXF1aXJlKCcuL2xvY2FsLWxvZ2luLmpzJyk7XG5jb25zdCBsb2NhbFNpZ251cFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1zaWdudXAuanMnKTtcbmNvbnN0IHsgc2VyaWFsaXplU3BlZWNoVXNlciwgZGVzZXJpYWxpemVTcGVlY2hVc2VyIH0gPSByZXF1aXJlKCdoZWxwZXJzL2F1dGhIZWxwZXJzLmpzJyk7XG5cbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihkZXNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xucGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVTcGVlY2hVc2VyKTtcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtbG9naW4nLCBsb2NhbExvZ2luU3RyYXRlZ3kpO1xucGFzc3BvcnQudXNlKCdsb2NhbC1zaWdudXAnLCBsb2NhbFNpZ251cFN0cmF0ZWd5KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXNzcG9ydDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBwdWJsaXNoSGVscGVycyA9IHJlcXVpcmUoJ2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyBwcmltYXJ5Q2xhaW1BZGRyZXNzLCBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBPcCA9IFNlcXVlbGl6ZS5PcDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2ggKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgcHVibGlzaFJlc3VsdHMsIGNlcnRpZmljYXRlSWQsIGNoYW5uZWxOYW1lO1xuICAgICAgLy8gcHVibGlzaCB0aGUgZmlsZVxuICAgICAgcmV0dXJuIGxicnlBcGkucHVibGlzaENsYWltKHB1Ymxpc2hQYXJhbXMpXG4gICAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU3VjY2Vzc2Z1bGx5IHB1Ymxpc2hlZCAke3B1Ymxpc2hQYXJhbXMubmFtZX0gJHtmaWxlTmFtZX1gLCB0eCk7XG4gICAgICAgICAgcHVibGlzaFJlc3VsdHMgPSB0eDtcbiAgICAgICAgICAvLyBnZXQgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBpZiAocHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgdGhpcyBjbGFpbSB3YXMgcHVibGlzaGVkIGluIGNoYW5uZWw6ICR7cHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gZGIuQ2hhbm5lbC5maW5kT25lKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBjaGFubmVsTmFtZTogcHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCd0aGlzIGNsYWltIHdhcyBub3QgcHVibGlzaGVkIGluIGEgY2hhbm5lbCcpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgLy8gc2V0IGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gbnVsbDtcbiAgICAgICAgICBjaGFubmVsTmFtZSA9IG51bGw7XG4gICAgICAgICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBjaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUgPSBjaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoYGNlcnRpZmljYXRlSWQ6ICR7Y2VydGlmaWNhdGVJZH1gKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIEZpbGUgcmVjb3JkXG4gICAgICAgICAgY29uc3QgZmlsZVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICBmaWxlUGF0aCAgIDogcHVibGlzaFBhcmFtcy5maWxlX3BhdGgsXG4gICAgICAgICAgICBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyBjcmVhdGUgdGhlIENsYWltIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGNsYWltUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgdGh1bWJuYWlsICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGh1bWJuYWlsLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgICAgYW1vdW50ICAgICA6IHB1Ymxpc2hQYXJhbXMuYmlkLFxuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCxcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IGNyaXRlcmlhXG4gICAgICAgICAgY29uc3QgdXBzZXJ0Q3JpdGVyaWEgPSB7XG4gICAgICAgICAgICBuYW1lICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCB0aGUgcmVjb3Jkc1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVSZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnRmlsZScpLCBkYi51cHNlcnQoZGIuQ2xhaW0sIGNsYWltUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0NsYWltJyldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtmaWxlLCBjbGFpbV0pID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGUuc2V0Q2xhaW0oY2xhaW0pLCBjbGFpbS5zZXRGaWxlKGZpbGUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgICByZXNvbHZlKHB1Ymxpc2hSZXN1bHRzKTsgLy8gcmVzb2x2ZSB0aGUgcHJvbWlzZSB3aXRoIHRoZSByZXN1bHQgZnJvbSBsYnJ5QXBpLnB1Ymxpc2hDbGFpbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ1BVQkxJU0ggRVJST1InLCBlcnJvcik7XG4gICAgICAgICAgcHVibGlzaEhlbHBlcnMuZGVsZXRlVGVtcG9yYXJ5RmlsZShwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCk7IC8vIGRlbGV0ZSB0aGUgbG9jYWwgZmlsZVxuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjbGFpbU5hbWVJc0F2YWlsYWJsZSAobmFtZSkge1xuICAgIGNvbnN0IGNsYWltQWRkcmVzc2VzID0gYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIHx8IFtdO1xuICAgIGNsYWltQWRkcmVzc2VzLnB1c2gocHJpbWFyeUNsYWltQWRkcmVzcyk7XG4gICAgLy8gZmluZCBhbnkgcmVjb3JkcyB3aGVyZSB0aGUgbmFtZSBpcyB1c2VkXG4gICAgcmV0dXJuIGRiLkNsYWltXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFsnYWRkcmVzcyddLFxuICAgICAgICB3aGVyZSAgICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICBbT3Aub3JdOiBjbGFpbUFkZHJlc3NlcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2xhaW0gaXMgYWxyZWFkeSBpbiB1c2UnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IChuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkNoYW5uZWxcbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgY2hhbm5lbE5hbWU6IG5hbWUgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNoYW5uZWwgaGFzIGFscmVhZHkgYmVlbiBjbGFpbWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHsgZGV0YWlscywgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5ICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gdmFsaWRhdGUgbmFtZVxuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBuYW1lIGZpZWxkIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgY29uc3QgaW52YWxpZE5hbWVDaGFyYWN0ZXJzID0gL1teQS1aYS16MC05LC1dLy5leGVjKG5hbWUpO1xuICAgIGlmIChpbnZhbGlkTmFtZUNoYXJhY3RlcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNsYWltIG5hbWUgeW91IHByb3ZpZGVkIGlzIG5vdCBhbGxvd2VkLiAgT25seSB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnMgYXJlIGFsbG93ZWQ6IEEtWiwgYS16LCAwLTksIGFuZCBcIi1cIicpO1xuICAgIH1cbiAgICAvLyBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgbnNmdyA9IChuc2Z3ID09PSAndHJ1ZScpO1xuICAgIGxpY2Vuc2UgPSBsaWNlbnNlIHx8IG51bGw7XG4gICAgdGl0bGUgPSB0aXRsZSB8fCBudWxsO1xuICAgIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gfHwgbnVsbDtcbiAgICB0aHVtYm5haWwgPSB0aHVtYm5haWwgfHwgbnVsbDtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgbnNmdyxcbiAgICAgIGxpY2Vuc2UsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgdGh1bWJuYWlsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyAoe2ZpbGUsIHRodW1ibmFpbH0pIHtcbiAgICAvLyBtYWtlIHN1cmUgYSBmaWxlIHdhcyBwcm92aWRlZFxuICAgIGlmICghZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHdpdGgga2V5IG9mIFtmaWxlXSBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5wYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcGF0aCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlIG5hbWVcbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZVxuICAgIG1vZHVsZS5leHBvcnRzLnZhbGlkYXRlRmlsZVR5cGVBbmRTaXplKGZpbGUpO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVOYW1lICAgICAgICAgOiBmaWxlLm5hbWUsXG4gICAgICBmaWxlUGF0aCAgICAgICAgIDogZmlsZS5wYXRoLFxuICAgICAgZmlsZVR5cGUgICAgICAgICA6IGZpbGUudHlwZSxcbiAgICAgIHRodW1ibmFpbEZpbGVOYW1lOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLm5hbWUgOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVQYXRoOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnBhdGggOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVUeXBlOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnR5cGUgOiBudWxsKSxcbiAgICB9O1xuICB9LFxuICB2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSAoZmlsZSkge1xuICAgIC8vIGNoZWNrIGZpbGUgdHlwZSBhbmQgc2l6ZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuanBlZy8uanBnLy5wbmcgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmdpZiB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIC5naWZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5tcDQgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gdW5yZWNvZ25pemVkIGZpbGUgdHlwZScpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSAnICsgZmlsZS50eXBlICsgJyBjb250ZW50IHR5cGUgaXMgbm90IHN1cHBvcnRlZC4gIE9ubHksIC5qcGVnLCAucG5nLCAuZ2lmLCBhbmQgLm1wNCBmaWxlcyBhcmUgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGU7XG4gIH0sXG4gIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyAoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBwcm92aWRlIGRlZmF1bHRzIGZvciB0aXRsZVxuICAgIGlmICh0aXRsZSA9PT0gbnVsbCB8fCB0aXRsZS50cmltKCkgPT09ICcnKSB7XG4gICAgICB0aXRsZSA9IG5hbWU7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgZGVzY3JpcHRpb25cbiAgICBpZiAoZGVzY3JpcHRpb24gPT09IG51bGwgfHwgZGVzY3JpcHRpb24udHJpbSgpID09PSAnJykge1xuICAgICAgZGVzY3JpcHRpb24gPSAnJztcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBsaWNlbnNlXG4gICAgaWYgKGxpY2Vuc2UgPT09IG51bGwgfHwgbGljZW5zZS50cmltKCkgPT09ICcnKSB7XG4gICAgICBsaWNlbnNlID0gJyAnOyAgLy8gZGVmYXVsdCB0byBlbXB0eSBzdHJpbmdcbiAgICB9XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIGNvbnN0IHB1Ymxpc2hQYXJhbXMgPSB7XG4gICAgICBuYW1lLFxuICAgICAgZmlsZV9wYXRoOiBmaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvciAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgfTtcbiAgICAvLyBhZGQgdGh1bWJuYWlsIHRvIGNoYW5uZWwgaWYgdmlkZW9cbiAgICBpZiAodGh1bWJuYWlsKSB7XG4gICAgICBwdWJsaXNoUGFyYW1zWydtZXRhZGF0YSddWyd0aHVtYm5haWwnXSA9IHRodW1ibmFpbDtcbiAgICB9XG4gICAgcmV0dXJuIHB1Ymxpc2hQYXJhbXM7XG4gIH0sXG4gIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMgKHRodW1ibmFpbEZpbGVQYXRoLCBjbGFpbU5hbWUsIGxpY2Vuc2UsIG5zZncpIHtcbiAgICBpZiAoIXRodW1ibmFpbEZpbGVQYXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgVGh1bWJuYWlsIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSAgICAgOiBgJHtjbGFpbU5hbWV9LXRodW1iYCxcbiAgICAgIGZpbGVfcGF0aDogdGh1bWJuYWlsRmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgdGl0bGUgICAgICA6IGAke2NsYWltTmFtZX0gdGh1bWJuYWlsYCxcbiAgICAgICAgZGVzY3JpcHRpb246IGBhIHRodW1ibmFpbCBmb3IgJHtjbGFpbU5hbWV9YCxcbiAgICAgICAgYXV0aG9yICAgICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlICAgOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICAgIGNoYW5uZWxfbmFtZSA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxfaWQgICA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbElkLFxuICAgIH07XG4gIH0sXG4gIGRlbGV0ZVRlbXBvcmFyeUZpbGUgKGZpbGVQYXRoKSB7XG4gICAgZnMudW5saW5rKGZpbGVQYXRoLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYGVycm9yIGRlbGV0aW5nIHRlbXBvcmFyeSBmaWxlICR7ZmlsZVBhdGh9YCk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1Zyhgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQgJHtmaWxlUGF0aH1gKTtcbiAgICB9KTtcbiAgfSxcbiAgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEgKGZpbGVJbmZvLCBnZXRSZXN1bHQpIHtcbiAgICBmaWxlSW5mby5maWxlTmFtZSA9IGdldFJlc3VsdC5maWxlX25hbWU7XG4gICAgZmlsZUluZm8uZmlsZVBhdGggPSBnZXRSZXN1bHQuZG93bmxvYWRfcGF0aDtcbiAgICByZXR1cm4gZmlsZUluZm87XG4gIH0sXG4gIGNyZWF0ZUZpbGVEYXRhICh7IG5hbWUsIGNsYWltSWQsIG91dHBvaW50LCBoZWlnaHQsIGFkZHJlc3MsIG5zZncsIGNvbnRlbnRUeXBlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGNsYWltSWQsXG4gICAgICBvdXRwb2ludCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGFkZHJlc3MsXG4gICAgICBmaWxlTmFtZTogJycsXG4gICAgICBmaWxlUGF0aDogJycsXG4gICAgICBmaWxlVHlwZTogY29udGVudFR5cGUsXG4gICAgICBuc2Z3LFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIG15c3FsICgpIHtcbiAgdGhpcy5kYXRhYmFzZSA9ICdkZWZhdWx0JztcbiAgdGhpcy51c2VybmFtZSA9ICdkZWZhdWx0JztcbiAgdGhpcy5wYXNzd29yZCA9ICdkZWZhdWx0JztcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBsb2dnZXIud2FybignTm8gTXlTUUwgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICAvLyBjb25maWd1cmUgY3JlZGVudGlhbHNcbiAgICBsb2dnZXIuaW5mbygnY29uZmlndXJpbmcgbXlzcWwuLi4nKTtcbiAgICBjb25zdCB7IGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IGNvbmZpZztcbiAgICB0aGlzLmRhdGFiYXNlID0gZGF0YWJhc2U7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IG15c3FsKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1sb2NhbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlcXVlbGl6ZVwiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IFJlZHVjZXJzLCBHQUxpc3RlbmVyLCBBcHAgfSBmcm9tICdzcGVlLmNoLWNvbXBvbmVudHMnO1xuLypcbiAgXiBub3RlOiB0byBkbyB0aGlzIHJpZ2h0LCBtYXliZVxuICB0aGVzZSBzaG91bGQgYmUgcGFzc2VkIGluIGZyb20gdGhlIGltcGxlbWVudGF0aW9uICh3d3cuc3BlZS5jaCkgaXRzZWxmLFxuICBzbyB0aGF0IHRoZXJlIGFyZSBubyBjb25mbGljdHMgYmV0d2VlbiB0aGUgU1NSIGhlcmUgYW5kXG4gIHRoZSBidW5kbGUgc2VudCB0byB0aGUgc2VydmVyP1xuICB0aGVyZSBtaWdodCBhbHNvIGJlIGlzc3VlcyBpZiB0aGlzIHBhY2thZ2UgdXNlcyBhIGRpZmZlcmVudCB2ZXJzaW9uIG9mIHNwZWUuY2gtY29tcG9uZW50cyB0aGFuIHd3dy5zcGVlLmNoIGRvZXM/XG4qL1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UuanMnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGN1c3RvbWl6ZSB0aGUgcmVkdWNlciBieSBwYXNzaW5nIGluIGludGlhbCBzdGF0ZSBjb25maWdzXG4gIGNvbnN0IE15UmVkdWNlcnMgPSBSZWR1Y2VycyhzaXRlQ29uZmlnKTtcbiAgY29uc3QgTXlBcHAgPSBBcHAoc2l0ZUNvbmZpZyk7XG4gIGNvbnN0IE15R0FMaXN0ZW5lciA9IEdBTGlzdGVuZXIoc2l0ZUNvbmZpZyk7XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoTXlSZWR1Y2Vycyk7XG5cbiAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgPE15R0FMaXN0ZW5lcj5cbiAgICAgICAgICA8TXlBcHAgLz5cbiAgICAgICAgPC9NeUdBTGlzdGVuZXI+XG4gICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xuXG4gIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gIGlmIChjb250ZXh0LnVybCkge1xuICAgIC8vIFNvbWV3aGVyZSBhIGA8UmVkaXJlY3Q+YCB3YXMgcmVuZGVyZWRcbiAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICB9IGVsc2Uge1xuICAgIC8vIHdlJ3JlIGdvb2QsIHNlbmQgdGhlIHJlc3BvbnNlXG4gIH1cblxuICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcblxuICBjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBzcGVlLmNoIGhhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCJcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzcGVlLmNoLWNvbXBvbmVudHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzcGVlLmNoLWNvbXBvbmVudHNcIlxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkgPT4ge1xuICAvLyB0YWtlIHRoZSBodG1sIGFuZCBwcmVsb2FkZWRTdGF0ZSBhbmQgcmV0dXJuIHRoZSBmdWxsIHBhZ2VcbiAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIiBwcmVmaXg9XCJvZzogaHR0cDovL29ncC5tZS9ucyMgZmI6IGh0dHA6Ly9vZ3AubWUvbnMvZmIjXCI+XG4gICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vXCI+XG4gICAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIj5cbiAgICAgICAgICAgIDwhLS1oZWxtZXQtLT5cbiAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5saW5rLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICA8IS0tc3R5bGUgc2hlZXRzLS0+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL3Jlc2V0LmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9nZW5lcmFsLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9tZWRpYVF1ZXJpZXMuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8IS0tZ29vZ2xlIGZvbnQtLT5cbiAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMFwiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keSBpZD1cIm1haW4tYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyZWFjdC1hcHBcIiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPiR7aHRtbH08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNjcmlwdD5cbiAgICAgICAgICAgICAgICB3aW5kb3cuX19QUkVMT0FERURfU1RBVEVfXyA9ICR7SlNPTi5zdHJpbmdpZnkocHJlbG9hZGVkU3RhdGUpLnJlcGxhY2UoLzwvZywgJ1xcXFxcXHUwMDNjJyl9XG4gICAgICAgICAgICA8L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL2J1bmRsZS9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGdldENsYWltSWQsIGdldExvY2FsRmlsZVJlY29yZCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJy4vZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5jb25zdCBTSE9XID0gJ1NIT1cnO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbmZ1bmN0aW9uIGNsaWVudEFjY2VwdHNIdG1sICh7YWNjZXB0fSkge1xuICByZXR1cm4gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKTtcbn07XG5cbmZ1bmN0aW9uIHJlcXVlc3RJc0Zyb21Ccm93c2VyIChoZWFkZXJzKSB7XG4gIHJldHVybiBoZWFkZXJzWyd1c2VyLWFnZW50J10gJiYgaGVhZGVyc1sndXNlci1hZ2VudCddLm1hdGNoKC9Nb3ppbGxhLyk7XG59O1xuXG5mdW5jdGlvbiBjbGllbnRXYW50c0Fzc2V0ICh7YWNjZXB0LCByYW5nZX0pIHtcbiAgY29uc3QgaW1hZ2VJc1dhbnRlZCA9IGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL2ltYWdlXFwvLiovKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9cXCovKTtcbiAgY29uc3QgdmlkZW9Jc1dhbnRlZCA9IGFjY2VwdCAmJiByYW5nZTtcbiAgcmV0dXJuIGltYWdlSXNXYW50ZWQgfHwgdmlkZW9Jc1dhbnRlZDtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRDbGFpbUlkIChjbGFpbUlkKSB7XG4gIHJldHVybiAoKGNsYWltSWQubGVuZ3RoID09PSA0MCkgJiYgIS9bXkEtWmEtejAtOV0vZy50ZXN0KGNsYWltSWQpKTtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkIChjbGFpbUlkKSB7XG4gIHJldHVybiBjbGFpbUlkLmxlbmd0aCA9PT0gMTsgIC8vIGl0IHNob3VsZCByZWFsbHkgZXZhbHVhdGUgdGhlIHNob3J0IHVybCBpdHNlbGZcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIChpbnB1dCkge1xuICByZXR1cm4gKGlzVmFsaWRDbGFpbUlkKGlucHV0KSB8fCBpc1ZhbGlkU2hvcnRJZChpbnB1dCkpO1xufTtcblxuZnVuY3Rpb24gc2VydmVBc3NldFRvQ2xpZW50IChjbGFpbUlkLCBuYW1lLCByZXMpIHtcbiAgcmV0dXJuIGdldExvY2FsRmlsZVJlY29yZChjbGFpbUlkLCBuYW1lKVxuICAgIC50aGVuKGZpbGVSZWNvcmQgPT4ge1xuICAgICAgLy8gY2hlY2sgdGhhdCBhIGxvY2FsIHJlY29yZCB3YXMgZm91bmRcbiAgICAgIGlmIChmaWxlUmVjb3JkID09PSBOT19GSUxFKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDMwNykucmVkaXJlY3QoYC9hcGkvY2xhaW0vZ2V0LyR7bmFtZX0vJHtjbGFpbUlkfWApO1xuICAgICAgfVxuICAgICAgLy8gc2VydmUgdGhlIGZpbGVcbiAgICAgIGNvbnN0IHtmaWxlUGF0aCwgZmlsZVR5cGV9ID0gZmlsZVJlY29yZDtcbiAgICAgIGxvZ2dlci52ZXJib3NlKGBzZXJ2aW5nIGZpbGU6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICBjb25zdCBzZW5kRmlsZU9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICAgICAgICA6IGZpbGVUeXBlIHx8ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZEZpbGUoZmlsZVBhdGgsIHNlbmRGaWxlT3B0aW9ucyk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcykge1xuICAgIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gICAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKGZ1bGxDbGFpbUlkID0+IHtcbiAgICAgICAgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DTEFJTSkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjaGFubmVsIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZlQXNzZXRUb0NsaWVudChmdWxsQ2xhaW1JZCwgY2xhaW1OYW1lLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ3N1Y2Nlc3MnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnZmFpbCcpO1xuICAgICAgfSk7XG4gIH0sXG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSAoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZVR5cGU7XG4gICAgaWYgKGhhc0ZpbGVFeHRlbnNpb24pIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFOyAgLy8gYXNzdW1lIGEgc2VydmUgcmVxdWVzdCBpZiBmaWxlIGV4dGVuc2lvbiBpcyBwcmVzZW50XG4gICAgICBpZiAoY2xpZW50QWNjZXB0c0h0bWwoaGVhZGVycykpIHsgIC8vIGlmIHRoZSByZXF1ZXN0IGNvbWVzIGZyb20gYSBicm93c2VyLCBjaGFuZ2UgaXQgdG8gYSBzaG93IHJlcXVlc3RcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIGlmIChjbGllbnRXYW50c0Fzc2V0KGhlYWRlcnMpICYmIHJlcXVlc3RJc0Zyb21Ccm93c2VyKGhlYWRlcnMpKSB7ICAvLyB0aGlzIGlzIGluIGNhc2Ugc29tZW9uZSBlbWJlZHMgYSBzaG93IHVybFxuICAgICAgICBsb2dnZXIuZGVidWcoJ1Nob3cgcmVxdWVzdCBjYW1lIGZyb20gYnJvd3NlciBidXQgd2FudHMgYW4gaW1hZ2UvdmlkZW8uIENoYW5naW5nIHJlc3BvbnNlIHRvIHNlcnZlLi4uJyk7XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VUeXBlO1xuICB9LFxuICBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IChpZGVudGlmaWVyLCBuYW1lKSB7XG4gICAgLy8gdGhpcyBpcyBhIHBhdGNoIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSB3aXRoICcvbmFtZS9jbGFpbV9pZCcgdXJsIGZvcm1hdFxuICAgIGlmIChpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChuYW1lKSAmJiAhaXNWYWxpZFNob3J0SWRPckNsYWltSWQoaWRlbnRpZmllcikpIHtcbiAgICAgIGNvbnN0IHRlbXBOYW1lID0gbmFtZTtcbiAgICAgIG5hbWUgPSBpZGVudGlmaWVyO1xuICAgICAgaWRlbnRpZmllciA9IHRlbXBOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gW2lkZW50aWZpZXIsIG5hbWVdO1xuICB9LFxuICBsb2dSZXF1ZXN0RGF0YSAocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdyZXNwb25zZVR5cGUgPT09JywgcmVzcG9uc2VUeXBlKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIG5hbWUgPT09ICcsIGNsYWltTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIG5hbWUgPT09JywgY2hhbm5lbE5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gaWQgPT09JywgY2xhaW1JZCk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIGlkZW50aWZpZXI6JywgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke3ZhbHVlfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIHVybC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbCBuYW1lIGFmdGVyIEAuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1JZCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbmFtZTonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSAuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgJHttb2RpZmllclNlcGVyYXRvcn0uYCk7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke21vZGlmaWVyU2VwZXJhdG9yfSBtb2RpZmllciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lYCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICB9O1xuICB9LFxuICBwYXJzZU1vZGlmaWVyOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbW9kaWZpZXI6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeVVyaS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZSc7XG5pbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUgZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBjYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7IFJlZHVjZXJzLCBHQUxpc3RlbmVyLCBBcHAsIFNhZ2FzLCBBY3Rpb25zIH0gZnJvbSAnc3BlZS5jaC1jb21wb25lbnRzJztcbi8qXG4gIF4gbm90ZTogdG8gZG8gdGhpcyByaWdodCwgbWF5YmVcbiAgdGhlc2Ugc2hvdWxkIGJlIHBhc3NlZCBpbiBmcm9tIHRoZSBpbXBsZW1lbnRhdGlvbiAod3d3LnNwZWUuY2gpIGl0c2VsZixcbiAgc28gdGhhdCB0aGVyZSBhcmUgbm8gY29uZmxpY3RzIGJldHdlZW4gdGhlIFNTUiBoZXJlIGFuZFxuICB0aGUgYnVuZGxlIHNlbnQgdG8gdGhlIHNlcnZlcj9cbiAgdGhlcmUgbWlnaHQgYWxzbyBiZSBpc3N1ZXMgaWYgdGhpcyBwYWNrYWdlIHVzZXMgYSBkaWZmZXJlbnQgdmVyc2lvbiBvZiBzcGVlLmNoLWNvbXBvbmVudHMgdGhhbiB3d3cuc3BlZS5jaCBkb2VzP1xuKi9cbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY29uc3Qgc2l0ZUNvbmZpZyA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuY29uc3QgcmV0dXJuU2FnYVdpdGhQYXJhbXMgPSAoc2FnYSwgcGFyYW1zKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAqICgpIHtcbiAgICB5aWVsZCBjYWxsKHNhZ2EsIHBhcmFtcyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNvbmZpZ3VyZSB0aGUgcmVkdWNlcnMgYnkgcGFzc2luZyBpbml0aWFsIHN0YXRlIGNvbmZpZ3NcbiAgY29uc3QgTXlSZWR1Y2VycyA9IFJlZHVjZXJzKHNpdGVDb25maWcpO1xuICBjb25zdCBNeUFwcCA9IEFwcChzaXRlQ29uZmlnKTtcbiAgY29uc3QgTXlHQUxpc3RlbmVyID0gR0FMaXN0ZW5lcihzaXRlQ29uZmlnKTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShNeVJlZHVjZXJzLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBBY3Rpb25zLm9uSGFuZGxlU2hvd1BhZ2VVcmkocmVxLnBhcmFtcyk7XG4gIGNvbnN0IHNhZ2EgPSByZXR1cm5TYWdhV2l0aFBhcmFtcyhTYWdhcy5oYW5kbGVTaG93UGFnZVVyaSwgYWN0aW9uKTtcblxuICAvLyBydW4gdGhlIHNhZ2EgbWlkZGxld2FyZVxuICBzYWdhTWlkZGxld2FyZVxuICAgIC5ydW4oc2FnYSlcbiAgICAuZG9uZVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgICA8TXlHQUxpc3RlbmVyPlxuICAgICAgICAgICAgICA8TXlBcHAgLz5cbiAgICAgICAgICAgIDwvTXlHQUxpc3RlbmVyPlxuICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgKTtcblxuICAgICAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICAgICAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gICAgICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICAgICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICAgICAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gICAgICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICAgICAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xuICAgIH0pO1xuXG4gIGNvbnNvbGUubG9nKCdoZWxsbyBmcm9tIHNwZWUuY2ggaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hhdHdnLWZldGNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2hhdHdnLWZldGNoXCJcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGFwcCBkZXBlbmRlbmNpZXNcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IGV4cHJlc3NIYW5kbGViYXJzID0gcmVxdWlyZSgnZXhwcmVzcy1oYW5kbGViYXJzJyk7XG5jb25zdCBIYW5kbGViYXJzID0gcmVxdWlyZSgnaGFuZGxlYmFycycpO1xuY29uc3QgaGVsbWV0ID0gcmVxdWlyZSgnaGVsbWV0Jyk7XG5jb25zdCBjb29raWVTZXNzaW9uID0gcmVxdWlyZSgnY29va2llLXNlc3Npb24nKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCByZXF1ZXN0TG9nZ2VyID0gcmVxdWlyZSgnbWlkZGxld2FyZS9yZXF1ZXN0TG9nZ2VyLmpzJyk7XG5jb25zdCBQYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgbG9nZ2VyQ29uZmlnID0gcmVxdWlyZSgnbG9nZ2VyQ29uZmlnLmpzJyk7XG5jb25zdCBteXNxbENvbmZpZyA9IHJlcXVpcmUoJ215c3FsQ29uZmlnLmpzJyk7XG5jb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuY29uc3Qgc2xhY2tDb25maWcgPSByZXF1aXJlKCdzbGFja0NvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBTZXJ2ZXIgKCkge1xuICB0aGlzLmNvbmZpZ3VyZUxvZ2dlciA9ICh1c2VyQ29uZmlnKSA9PiB7XG4gICAgbG9nZ2VyQ29uZmlnLnVwZGF0ZSh1c2VyQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVNeXNxbCA9ICh1c2VyQ29uZmlnKSA9PiB7XG4gICAgbXlzcWxDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNpdGUgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNpdGVDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNsYWNrID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBzbGFja0NvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlTW9kZWxzID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCBtb2RlbHMnKVxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVJvdXRlcyA9ICgpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2hlcmUgaXMgd2hlcmUgeW91IGNvdWxkIGFkZC9vdmVyd3JpdGUgdGhlIGRlZmF1bHQgcm91dGVzJylcbiAgfTtcbiAgdGhpcy5jcmVhdGVBcHAgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGFuIEV4cHJlc3MgYXBwbGljYXRpb25cbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbiAgICAvLyB0cnVzdCB0aGUgcHJveHkgdG8gZ2V0IGlwIGFkZHJlc3MgZm9yIHVzXG4gICAgYXBwLmVuYWJsZSgndHJ1c3QgcHJveHknKTtcblxuICAgIC8qIGFkZCBtaWRkbGV3YXJlICovXG4gICAgLy8gc2V0IEhUVFAgaGVhZGVycyB0byBwcm90ZWN0IGFnYWluc3Qgd2VsbC1rbm93biB3ZWIgdnVsbmVyYWJpbHRpZXNcbiAgICBhcHAudXNlKGhlbG1ldCgpKTtcbiAgICAvLyAnZXhwcmVzcy5zdGF0aWMnIHRvIHNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIHB1YmxpYyBkaXJlY3RvcnlcbiAgICBpZiAoc2l0ZUNvbmZpZy5yb3V0ZXMucHVibGljRm9sZGVyKSB7XG4gICAgICAvLyB0YWtlIGluIGEgZGlmZmVyZW50IHB1YmxpYyBmb2xkZXIsIHNvIGl0IGNhbiBzZXJ2ZSBpdCdzIG93biBidW5kbGUgaWYgbmVlZGVkXG4gICAgICBjb25zdCBwdWJsaWNGb2xkZXIgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgc2l0ZUNvbmZpZy5yb3V0ZXMucHVibGljRm9sZGVyKTtcbiAgICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocHVibGljRm9sZGVyKSk7XG4gICAgICBsb2dnZXIuaW5mbygnc2VydmluZyBzdGF0aWMgZmlsZXMgZnJvbSBjdXN0b20gcGF0aDonLCBwdWJsaWNGb2xkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwdWJsaWNQYXRoID0gUGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xuICAgICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhwdWJsaWNQYXRoKSk7XG4gICAgICBsb2dnZXIuaW5mbygnc2VydmluZyBzdGF0aWMgZmlsZXMgZnJvbSBkZWZhdWx0IHBhdGg6JywgcHVibGljUGF0aCk7XG4gICAgfTtcbiAgICAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL2pzb25cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuXG4gICAgLy8gYWRkIGN1c3RvbSBtaWRkbGV3YXJlIChub3RlOiBidWlsZCBvdXQgdG8gYWNjZXB0IGR5bmFtaWNhbGx5IHVzZSB3aGF0IGlzIGluIHNlcnZlci9taWRkbGV3YXJlL1xuICAgIGFwcC51c2UocmVxdWVzdExvZ2dlcik7XG5cbiAgICAvLyBjb25maWd1cmUgcGFzc3BvcnRcbiAgICBjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG4gICAgLy8gaW5pdGlhbGl6ZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNlc3Npb25LZXkgPSBzaXRlQ29uZmlnLmF1dGguc2Vzc2lvbktleTtcbiAgICBhcHAudXNlKGNvb2tpZVNlc3Npb24oe1xuICAgICAgbmFtZSAgOiAnc2Vzc2lvbicsXG4gICAgICBrZXlzICA6IFtzZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShzcGVlY2hQYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2VzLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXNzZXRzLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvZmFsbGJhY2svJykoYXBwKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9O1xuICB0aGlzLmluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgdGhpcy5jcmVhdGVBcHAoKTtcbiAgICB0aGlzLnNlcnZlciA9IGh0dHAuU2VydmVyKHRoaXMuYXBwKTtcbiAgfTtcbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuICAgIGNvbnN0IFBPUlQgPSBzaXRlQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgICAvLyBzeW5jIHNlcXVlbGl6ZVxuICAgIGRiLnNlcXVlbGl6ZS5zeW5jKClcbiAgICAvLyBzdGFydCB0aGUgc2VydmVyXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VydmVyLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZlciBpcyBsaXN0ZW5pbmcgb24gUE9SVCAke1BPUlR9YCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBTdGFydHVwIEVycm9yOmAsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtaGFuZGxlYmFyc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXNlc3Npb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cFwiXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSAocmVxLCByZXMsIG5leHQpID0+IHsgIC8vIGN1c3RvbSBsb2dnaW5nIG1pZGRsZXdhcmUgdG8gbG9nIGFsbCBpbmNvbWluZyBodHRwIHJlcXVlc3RzXG4gIGxvZ2dlci52ZXJib3NlKGBSZXF1ZXN0IG9uICR7cmVxLm9yaWdpbmFsVXJsfSBmcm9tICR7cmVxLmlwfWApO1xuICBuZXh0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3RMb2dnZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbWlkZGxld2FyZS9yZXF1ZXN0TG9nZ2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBMb2dnZXJDb25maWcgKCkge1xuICB0aGlzLmxvZ0xldmVsID0gJ2RlYnVnJztcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBsb2dnZXIud2FybignTm8gbG9nZ2VyIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIHdpbnN0b24gbG9nZ2VyLi4uJyk7XG4gICAgLy8gdXBkYXRlIHZhbHVlcyB3aXRoIGxvY2FsIGNvbmZpZyBwYXJhbXNcbiAgICBjb25zdCB7bG9nTGV2ZWx9ID0gY29uZmlnO1xuICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcbiAgICAvLyBjb25maWd1cmUgdGhlIHdpbnN0b24gbG9nZ2VyXG4gICAgbG9nZ2VyLmNvbmZpZ3VyZSh7XG4gICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgIG5ldyAobG9nZ2VyLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubG9nTGV2ZWwsXG4gICAgICAgICAgdGltZXN0YW1wICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBwcmV0dHlQcmludCAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnMgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIC8vIHRlc3QgYWxsIHRoZSBsb2cgbGV2ZWxzXG4gICAgbG9nZ2VyLmluZm8oJ3Rlc3Rpbmcgd2luc3RvbiBsb2cgbGV2ZWxzLi4uJyk7XG4gICAgbG9nZ2VyLmVycm9yKCdMZXZlbCAwJyk7XG4gICAgbG9nZ2VyLndhcm4oJ0xldmVsIDEnKTtcbiAgICBsb2dnZXIuaW5mbygnTGV2ZWwgMicpO1xuICAgIGxvZ2dlci52ZXJib3NlKCdMZXZlbCAzJyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdMZXZlbCA0Jyk7XG4gICAgbG9nZ2VyLnNpbGx5KCdMZXZlbCA1Jyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb2dnZXJDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJjb25zdCB3aW5zdG9uU2xhY2tXZWJIb29rID0gcmVxdWlyZSgnd2luc3Rvbi1zbGFjay13ZWJob29rJykuU2xhY2tXZWJIb29rO1xuY29uc3Qgd2luc3RvbiA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU2xhY2tDb25maWcgKCkge1xuICB0aGlzLnNsYWNrV2ViSG9vayAgICAgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIHdpbnN0b24ud2FybignTm8gc2xhY2sgY29uZmlnIHJlY2VpdmVkJyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB2YXJpYWJsZXNcbiAgICB3aW5zdG9uLmluZm8oJ2NvbmZpZ3VyaW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLnNsYWNrV2ViSG9vayA9IHNsYWNrV2ViSG9vaztcbiAgICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gc2xhY2tFcnJvckNoYW5uZWw7XG4gICAgdGhpcy5zbGFja0luZm9DaGFubmVsID0gc2xhY2tJbmZvQ2hhbm5lbDtcbiAgICAvLyB1cGRhdGUgc2xhY2sgd2ViaG9vayBzZXR0aW5nc1xuICAgIGlmICh0aGlzLnNsYWNrV2ViSG9vaykge1xuICAgICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICAgIGlmICh0aGlzLnNsYWNrRXJyb3JDaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2stZXJyb3JzLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ3dhcm4nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6ZmFjZV93aXRoX2hlYWRfYmFuZGFnZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBpZiAoc2xhY2tJbmZvQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWluZm8tdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnaW5mbycsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0luZm9DaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOm5lcmRfZmFjZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICAvLyBzZW5kIHRlc3QgbWVzc2FnZXNcbiAgICAgIHdpbnN0b24uaW5mbygndGVzdGluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICAgIHdpbnN0b24uZXJyb3IoJ1NsYWNrIFwiZXJyb3JcIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbnN0b24ud2FybignU2xhY2sgbG9nZ2luZyBpcyBub3QgZW5hYmxlZCBiZWNhdXNlIG5vIHNsYWNrV2ViSG9vayBjb25maWcgdmFyIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNsYWNrQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIlxuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydFwiXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENlcnRpZmljYXRlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2VydGlmaWNhdGUnLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBrZXlUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwdWJsaWNLZXk6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2VydGlmaWNhdGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENlcnRpZmljYXRlLmJlbG9uZ3NUbyhkYi5DaGFubmVsLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChsb25nQ2hhbm5lbElkLCBjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCAke2NoYW5uZWxOYW1lfToke2xvbmdDaGFubmVsSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7bmFtZTogY2hhbm5lbE5hbWV9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwocykgZm91bmQgd2l0aCB0aGF0IGNoYW5uZWwgbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGxvbmdDaGFubmVsSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSAgIDogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtjaGFubmVsQ2xhaW1JZH0lYCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKCR7Y2hhbm5lbE5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjaGFubmVsTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS52YWxpZGF0ZUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgdmFsaWRhdGVMb25nQ2hhbm5lbElkKCR7bmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCAmJiAoY2hhbm5lbENsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDbGFpbUlkICYmIGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA8IDQwKSB7ICAvLyBpZiBhIHNob3J0IGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZShjaGFubmVsTmFtZSk7ICAvLyBpZiBubyBjaGFubmVsIGlkIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDZXJ0aWZpY2F0ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IENoYW5uZWwgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDaGFubmVsJyxcbiAgICB7XG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsQ2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENoYW5uZWwuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENoYW5uZWwuYmVsb25nc1RvKGRiLlVzZXIpO1xuICAgIENoYW5uZWwuaGFzT25lKGRiLkNlcnRpZmljYXRlKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIgfSkgPT4ge1xuICBjb25zdCBGaWxlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnRmlsZScsXG4gICAge1xuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICAgIDogSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdCAgOiAwLFxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVQYXRoOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVUeXBlOiB7XG4gICAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB0cmVuZGluZ0VsaWdpYmxlOiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgRmlsZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgRmlsZS5oYXNNYW55KGRiLlJlcXVlc3QpO1xuICAgIEZpbGUuaGFzT25lKGRiLkNsYWltKTtcbiAgfTtcblxuICBGaWxlLmdldFJlY2VudENsYWltcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWxsKHtcbiAgICAgIHdoZXJlOiB7IG5zZnc6IGZhbHNlLCB0cmVuZGluZ0VsaWdpYmxlOiB0cnVlIH0sXG4gICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICBsaW1pdDogMjUsXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEZpbGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9maWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgVEVYVCB9KSA9PiB7XG4gIGNvbnN0IFJlcXVlc3QgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdSZXF1ZXN0JyxcbiAgICB7XG4gICAgICBhY3Rpb246IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdXJsOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGlwQWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICB0eXBlICAgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBSZXF1ZXN0LmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBSZXF1ZXN0LmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJlcXVlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiY3J5cHRcIlxuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBuZXcgY2hhbm5lbCBzaWdudXAgcmVxdWVzdC4gdXNlcjogJHt1c2VybmFtZX0gcGFzczogJHtwYXNzd29yZH0gLmApO1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIC8vIHNlcnZlci1zaWRlIHZhbGlkYXRvbiBvZiBpbnB1dHMgKHVzZXJuYW1lLCBwYXNzd29yZClcblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhbm5lbCBhbmQgcmV0cmlldmUgdGhlIG1ldGFkYXRhXG4gICAgcmV0dXJuIGxicnlBcGkuY3JlYXRlQ2hhbm5lbChgQCR7dXNlcm5hbWV9YClcbiAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgIHVzZXJOYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyRGF0YSA+JywgdXNlckRhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgY2hhbm5lbERhdGEgPSB7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIGNoYW5uZWxDbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NoYW5uZWxEYXRhID4nLCBjaGFubmVsRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSBjZXJ0aWZpY2F0ZSByZWNvcmRcbiAgICAgICAgY29uc3QgY2VydGlmaWNhdGVEYXRhID0ge1xuICAgICAgICAgIGNsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICAgIG5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIC8vIGFkZHJlc3MsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjZXJ0aWZpY2F0ZURhdGEgPicsIGNlcnRpZmljYXRlRGF0YSk7XG4gICAgICAgIC8vIHNhdmUgdXNlciBhbmQgY2VydGlmaWNhdGUgdG8gZGJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi5Vc2VyLmNyZWF0ZSh1c2VyRGF0YSksIGRiLkNoYW5uZWwuY3JlYXRlKGNoYW5uZWxEYXRhKSwgZGIuQ2VydGlmaWNhdGUuY3JlYXRlKGNlcnRpZmljYXRlRGF0YSldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoW25ld1VzZXIsIG5ld0NoYW5uZWwsIG5ld0NlcnRpZmljYXRlXSkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgLy8gc3RvcmUgdGhlIHJlbGV2YW50IG5ld1VzZXIgaW5mbyB0byBiZSBwYXNzZWQgYmFjayBmb3IgcmVxLlVzZXJcbiAgICAgICAgdXNlckluZm9bJ2lkJ10gPSBuZXdVc2VyLmlkO1xuICAgICAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IG5ld1VzZXIudXNlck5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gbmV3Q2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAvLyBhc3NvY2lhdGUgdGhlIGluc3RhbmNlc1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld0NlcnRpZmljYXRlLnNldENoYW5uZWwobmV3Q2hhbm5lbCksIG5ld0NoYW5uZWwuc2V0VXNlcihuZXdVc2VyKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHVzZXJJbmZvLmNoYW5uZWxDbGFpbUlkLCB1c2VySW5mby5jaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdzaWdudXAgZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gcmV0dXJucyB1c2VyIGRhdGEgdG8gYmUgc2VyaWFsaXplZCBpbnRvIHNlc3Npb25cbiAgICBjb25zb2xlLmxvZygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBjb25zb2xlLmxvZygnZGVzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbmNvbnN0IGhhbmRsZVNpZ251cFJlcXVlc3QgPSByZXF1aXJlKCcuL3NpZ251cCcpO1xuY29uc3QgaGFuZGxlTG9naW5SZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dpbicpO1xuY29uc3QgaGFuZGxlTG9nb3V0UmVxdWVzdCA9IHJlcXVpcmUoJy4vbG9nb3V0Jyk7XG5jb25zdCBoYW5kbGVVc2VyUmVxdWVzdCA9IHJlcXVpcmUoJy4vdXNlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLnBvc3QoJy9zaWdudXAnLCBzcGVlY2hQYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLXNpZ251cCcpLCBoYW5kbGVTaWdudXBSZXF1ZXN0KTtcbiAgYXBwLnBvc3QoJy9sb2dpbicsIGhhbmRsZUxvZ2luUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9sb2dvdXQnLCBoYW5kbGVMb2dvdXRSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3VzZXInLCBoYW5kbGVVc2VyUmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2luZGV4LmpzIiwiY29uc3Qgc2lnbnVwID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZ251cDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9zaWdudXAuanMiLCJjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG5cbmNvbnN0IGxvZ2luID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtbG9naW4nLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICB9XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcS5sb2dJbih1c2VyLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KShyZXEsIHJlcywgbmV4dCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ2luLmpzIiwiY29uc3QgbG9nb3V0ID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcS5sb2dvdXQoKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICd5b3Ugc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dvdXQuanMiLCJjb25zdCB1c2VyID0gKHJlcSwgcmVzKSA9PiB7XG4gIGlmIChyZXEudXNlcikge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEudXNlcn0pO1xuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbid9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1c2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3VzZXIuanMiLCJjb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9jaGFubmVsQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjaGFubmVsQ2xhaW1zID0gcmVxdWlyZSgnLi9jaGFubmVsQ2xhaW1zJyk7XG5jb25zdCBjaGFubmVsRGF0YSA9IHJlcXVpcmUoJy4vY2hhbm5lbERhdGEnKTtcbmNvbnN0IGNoYW5uZWxTaG9ydElkID0gcmVxdWlyZSgnLi9jaGFubmVsU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NsYWltQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjbGFpbURhdGEgPSByZXF1aXJlKCcuL2NsYWltRGF0YScpO1xuY29uc3QgY2xhaW1HZXQgPSByZXF1aXJlKCcuL2NsYWltR2V0Jyk7XG5jb25zdCBjbGFpbUxvbmdJZCA9IHJlcXVpcmUoJy4vY2xhaW1Mb25nSWQnKTtcbmNvbnN0IGNsYWltUHVibGlzaCA9IHJlcXVpcmUoJy4vY2xhaW1QdWJsaXNoJyk7XG5jb25zdCBjbGFpbVJlc29sdmUgPSByZXF1aXJlKCcuL2NsYWltUmVzb2x2ZScpO1xuY29uc3QgY2xhaW1TaG9ydElkID0gcmVxdWlyZSgnLi9jbGFpbVNob3J0SWQnKTtcbmNvbnN0IGNsYWltTGlzdCA9IHJlcXVpcmUoJy4vY2xhaW1MaXN0Jyk7XG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9maWxlQXZhaWxhYmlsaXR5Jyk7XG5cbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSByZXF1aXJlKCdoZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIGNoYW5uZWwgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjaGFubmVsQXZhaWxhYmlsaXR5KTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjaGFubmVsU2hvcnRJZCk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9kYXRhLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQnLCBjaGFubmVsRGF0YSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsIGNoYW5uZWxDbGFpbXMpO1xuICAvLyBjbGFpbSByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9saXN0LzpuYW1lJywgY2xhaW1MaXN0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9nZXQvOm5hbWUvOmNsYWltSWQnLCBjbGFpbUdldCk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LzpuYW1lJywgY2xhaW1BdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Jlc29sdmUvOm5hbWUvOmNsYWltSWQnLCBjbGFpbVJlc29sdmUpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9wdWJsaXNoJywgbXVsdGlwYXJ0TWlkZGxld2FyZSwgY2xhaW1QdWJsaXNoKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgY2xhaW1TaG9ydElkKTtcbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vbG9uZy1pZCcsIGNsYWltTG9uZ0lkKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9kYXRhLzpjbGFpbU5hbWUvOmNsYWltSWQnLCBjbGFpbURhdGEpO1xuICAvLyBmaWxlIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2ZpbGUvYXZhaWxhYmlsaXR5LzpuYW1lLzpjbGFpbUlkJywgZmlsZUF2YWlsYWJpbGl0eSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvaW5kZXguanMiLCJjb25zdCB7IGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYXZhaWxhYmxlTmFtZSk7XG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IGdldENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgYWxsIGNsYWltcyBmb3IgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQ2xhaW1zID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgZ2V0Q2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbENsYWltcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxDbGFpbXMuanMiLCJjb25zdCBDTEFJTVNfUEVSX1BBR0UgPSAxMjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNsYWltcywgcGFnZSkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbFBhZ2VzKGNsYWltcyk7XG4gICAgY29uc3QgcGFnaW5hdGlvblBhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRQYWdlRnJvbVF1ZXJ5KHBhZ2UpO1xuICAgIGNvbnN0IHZpZXdEYXRhID0ge1xuICAgICAgY2hhbm5lbE5hbWUgICAgICAgOiBjaGFubmVsTmFtZSxcbiAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1zICAgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5leHRyYWN0UGFnZUZyb21DbGFpbXMoY2xhaW1zLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICBwcmV2aW91c1BhZ2UgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVByZXZpb3VzUGFnZShwYWdpbmF0aW9uUGFnZSksXG4gICAgICBjdXJyZW50UGFnZSAgICAgICA6IHBhZ2luYXRpb25QYWdlLFxuICAgICAgbmV4dFBhZ2UgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVOZXh0UGFnZSh0b3RhbFBhZ2VzLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICB0b3RhbFBhZ2VzICAgICAgICA6IHRvdGFsUGFnZXMsXG4gICAgICB0b3RhbFJlc3VsdHMgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsQ2xhaW1zKGNsYWltcyksXG4gICAgfTtcbiAgICByZXR1cm4gdmlld0RhdGE7XG4gIH0sXG4gIGdldFBhZ2VGcm9tUXVlcnkgKHBhZ2UpIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIChjbGFpbXMsIHBhZ2VOdW1iZXIpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIFtdOyAgLy8gaWYgbm8gY2xhaW1zLCByZXR1cm4gdGhpcyBkZWZhdWx0XG4gICAgfVxuICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2xhaW1zIGlzIGFycmF5PycsIEFycmF5LmlzQXJyYXkoY2xhaW1zKSk7XG4gICAgLy8gbG9nZ2VyLmRlYnVnKGBwYWdlTnVtYmVyICR7cGFnZU51bWJlcn0gaXMgbnVtYmVyP2AsIE51bWJlci5pc0ludGVnZXIocGFnZU51bWJlcikpO1xuICAgIGNvbnN0IGNsYWltU3RhcnRJbmRleCA9IChwYWdlTnVtYmVyIC0gMSkgKiBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgY2xhaW1FbmRJbmRleCA9IGNsYWltU3RhcnRJbmRleCArIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBwYWdlT2ZDbGFpbXMgPSBjbGFpbXMuc2xpY2UoY2xhaW1TdGFydEluZGV4LCBjbGFpbUVuZEluZGV4KTtcbiAgICByZXR1cm4gcGFnZU9mQ2xhaW1zO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbFBhZ2VzIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvdGFsQ2xhaW1zID0gY2xhaW1zLmxlbmd0aDtcbiAgICAgIGlmICh0b3RhbENsYWltcyA8IENMQUlNU19QRVJfUEFHRSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZ1bGxQYWdlcyA9IE1hdGguZmxvb3IodG90YWxDbGFpbXMgLyBDTEFJTVNfUEVSX1BBR0UpO1xuICAgICAgY29uc3QgcmVtYWluZGVyID0gdG90YWxDbGFpbXMgJSBDTEFJTVNfUEVSX1BBR0U7XG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmdWxsUGFnZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVsbFBhZ2VzICsgMTtcbiAgICB9XG4gIH0sXG4gIGRldGVybWluZVByZXZpb3VzUGFnZSAoY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgLSAxO1xuICB9LFxuICBkZXRlcm1pbmVOZXh0UGFnZSAodG90YWxQYWdlcywgY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgKyAxO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbENsYWltcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY2xhaW1zLmxlbmd0aDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IHsgZ2V0Q2hhbm5lbERhdGEgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgZGF0YSBmb3IgYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxEYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gIGdldENoYW5uZWxEYXRhKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgMClcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsRGF0YTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxEYXRhLmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbnJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcblxuKi9cblxuY29uc3QgY2hhbm5lbFNob3J0SWRSb3V0ZSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oc2hvcnRJZCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsU2hvcnRJZFJvdXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbFNob3J0SWQuanMiLCJjb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1BdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUF2YWlsYWJpbGl0eS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHJldHVybiBkYXRhIGZvciBhIGNsYWltXG5cbiovXG5cbmNvbnN0IGNsYWltRGF0YSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjbGFpbU5hbWUgPSBwYXJhbXMuY2xhaW1OYW1lO1xuICBsZXQgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAudGhlbihjbGFpbUluZm8gPT4ge1xuICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIGNsYWltIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1EYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1EYXRhLmpzIiwiY29uc3QgeyBnZXRDbGFpbSB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhLCBjcmVhdGVGaWxlRGF0YSB9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1HZXQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIC8vIHJlc29sdmUgdGhlIGNsYWltXG4gIGRiLkNsYWltLnJlc29sdmVDbGFpbShuYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgLy8gbWFrZSBzdXJlIGEgY2xhaW0gYWN0dWFsbHkgZXhpc3RzIGF0IHRoYXQgdXJpXG4gICAgICBpZiAoIXJlc29sdmVSZXN1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgIH1cbiAgICAgIGxldCBmaWxlRGF0YSA9IGNyZWF0ZUZpbGVEYXRhKHJlc29sdmVSZXN1bHQpO1xuICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlRGF0YSwgZ2V0Q2xhaW0oYCR7bmFtZX0jJHtjbGFpbUlkfWApXSk7XG4gICAgfSlcbiAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgIGZpbGVEYXRhID0gYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEoZmlsZURhdGEsIGdldFJlc3VsdCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlRGF0YSwge25hbWUsIGNsYWltSWR9LCAnRmlsZScpLCBnZXRSZXN1bHRdKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVSZWNvcmQsIHttZXNzYWdlLCBjb21wbGV0ZWR9IF0pID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZSwgY29tcGxldGVkIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1HZXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1JZCB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIGxvbmcgY2xhaW0gaWRcblxuKi9cblxuY29uc3QgY2xhaW1Mb25nSWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICBjb25zdCBjaGFubmVsQ2xhaW1JZCA9IGJvZHkuY2hhbm5lbENsYWltSWQ7XG4gIGNvbnN0IGNsYWltTmFtZSA9IGJvZHkuY2xhaW1OYW1lO1xuICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1Mb25nSWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsImNvbnN0IHsgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zLCBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zLCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSwgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIH0gPSByZXF1aXJlKCdoZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlLCBwdWJsaXNoIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCdhdXRoL2F1dGhlbnRpY2F0aW9uLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBwdWJsaXNoIGEgY2xhaW0gdGhyb3VnaCB0aGUgZGFlbW9uXG5cbiovXG5cbmNvbnN0IGNsYWltUHVibGlzaCA9ICh7IGJvZHksIGZpbGVzLCBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHVzZXIgfSwgcmVzKSA9PiB7XG4gIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgbGV0ICBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIGRlc2NyaXB0aW9uLCBmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgbGljZW5zZSwgbmFtZSwgbnNmdywgdGh1bWJuYWlsLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlLCB0aXRsZTtcbiAgLy8gcmVjb3JkIHRoZSBzdGFydCB0aW1lIG9mIHRoZSByZXF1ZXN0XG4gIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgLy8gdmFsaWRhdGUgdGhlIGJvZHkgYW5kIGZpbGVzIG9mIHRoZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keShib2R5KSk7XG4gICAgKHtmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyhmaWxlcykpO1xuICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBjaGVjayBjaGFubmVsIGF1dGhvcml6YXRpb25cbiAgUHJvbWlzZVxuICAgIC5hbGwoW1xuICAgICAgYXV0aGVudGljYXRlVXNlcihjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpLFxuICAgICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSksXG4gICAgICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSxcbiAgICAgIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXModGh1bWJuYWlsRmlsZVBhdGgsIG5hbWUsIGxpY2Vuc2UsIG5zZncpLFxuICAgIF0pXG4gICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgLy8gYWRkIGNoYW5uZWwgZGV0YWlscyB0byB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX2lkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgIH1cbiAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgaWYgKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMpIHtcbiAgICAgICAgcHVibGlzaCh0aHVtYm5haWxQdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVR5cGUpO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgYXNzZXRcbiAgICAgIHJldHVybiBwdWJsaXNoKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSk7XG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiAncHVibGlzaCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgZGF0YSAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgY2xhaW1JZDogcmVzdWx0LmNsYWltX2lkLFxuICAgICAgICAgIHVybCAgICA6IGAke2hvc3R9LyR7cmVzdWx0LmNsYWltX2lkfS8ke25hbWV9YCxcbiAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdwdWJsaXNoJywgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUHVibGlzaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUHVibGlzaC5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRoZW50aWNhdGVVc2VyIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpIHtcbiAgICAvLyBjYXNlOiBubyBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCAoYW5vbnltb3VzKSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVzZXIgdG9rZW4gaXMgcHJvdmlkZWRcbiAgICBpZiAoIWNoYW5uZWxOYW1lICYmICFjaGFubmVsSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiBudWxsLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggdXNlciB0b2tlblxuICAgIGlmICh1c2VyKSB7XG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbE5hbWUgIT09IHVzZXIuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBuYW1lIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFubmVsSWQgJiYgY2hhbm5lbElkICE9PSB1c2VyLmNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgaWQgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiB1c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCBwYXNzd29yZCBpbnN0ZWFkIG9mIHVzZXIgdG9rZW5cbiAgICBpZiAoIWNoYW5uZWxQYXNzd29yZCkgdGhyb3cgbmV3IEVycm9yKCdubyBjaGFubmVsIHBhc3N3b3JkIHByb3ZpZGVkJyk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyhjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQpO1xuICB9LFxuICBhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIHVzZXJQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBob2lzdGVkIHZhcmlhYmxlc1xuICAgICAgbGV0IGNoYW5uZWxEYXRhO1xuICAgICAgLy8gYnVpbGQgdGhlIHBhcmFtcyBmb3IgZmluZGluZyB0aGUgY2hhbm5lbFxuICAgICAgbGV0IGNoYW5uZWxGaW5kUGFyYW1zID0ge307XG4gICAgICBpZiAoY2hhbm5lbE5hbWUpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICBpZiAoY2hhbm5lbElkKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxJZDtcbiAgICAgIC8vIGZpbmQgdGhlIGNoYW5uZWxcbiAgICAgIGRiLkNoYW5uZWxcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiBjaGFubmVsRmluZFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIGNoYW5uZWwgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGFubmVsRGF0YSA9IGNoYW5uZWwuZ2V0KCk7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIGRhdGE6JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAgIHJldHVybiBkYi5Vc2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgdXNlck5hbWU6IGNoYW5uZWxEYXRhLmNoYW5uZWxOYW1lLnN1YnN0cmluZygxKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZCh1c2VyUGFzc3dvcmQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCcuLi5wYXNzd29yZCB3YXMgYSBtYXRjaC4uLicpO1xuICAgICAgICAgIHJlc29sdmUoY2hhbm5lbERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgeyByZXNvbHZlVXJpIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1SZXNvbHZlID0gKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIHJlc29sdmVVcmkoYCR7cGFyYW1zLm5hbWV9IyR7cGFyYW1zLmNsYWltSWR9YClcbiAgICAudGhlbihyZXNvbHZlZFVyaSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVJlc29sdmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVJlc29sdmUuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcblxuKi9cblxuY29uc3QgY2xhaW1TaG9ydElkID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVNob3J0SWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVNob3J0SWQuanMiLCJjb25zdCB7IGdldENsYWltTGlzdCB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBsaXN0IG9mIGNsYWltc1xuXG4qL1xuXG5jb25zdCBjbGFpbUxpc3QgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZ2V0Q2xhaW1MaXN0KHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKGNsYWltc0xpc3QgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcblxuKi9cblxuY29uc3QgZmlsZUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgZGIuRmlsZVxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGNsYWltSWQsXG4gICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiB0cnVlfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGVBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9maWxlQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgbXVsdGlwYXJ0ID0gcmVxdWlyZSgnY29ubmVjdC1tdWx0aXBhcnR5Jyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgdXBsb2FkRGlyZWN0b3J5IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSBtdWx0aXBhcnQoe3VwbG9hZERpcjogdXBsb2FkRGlyZWN0b3J5fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbXVsdGlwYXJ0TWlkZGxld2FyZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW11bHRpcGFydHlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIlxuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgaGFuZGxlUGFnZVJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRSZWFjdEFwcCcpO1xuY29uc3QgaGFuZGxlRW1iZWRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kRW1iZWRQYWdlJyk7XG5jb25zdCByZWRpcmVjdCA9IHJlcXVpcmUoJy4vcmVkaXJlY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIGFwcC5nZXQoJy8nLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9sb2dpbicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2Fib3V0JywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvdHJlbmRpbmcnLCByZWRpcmVjdCgnL3BvcHVsYXInKSk7XG4gIGFwcC5nZXQoJy9wb3B1bGFyJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbmV3JywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvZW1iZWQvOmNsYWltSWQvOm5hbWUnLCBoYW5kbGVFbWJlZFJlcXVlc3QpOyAgLy8gcm91dGUgdG8gc2VuZCBlbWJlZGFibGUgdmlkZW8gcGxheWVyIChmb3IgdHdpdHRlcilcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL2luZGV4LmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcblxuY29uc3Qgc2VuZFJlYWN0QXBwID0gKHJlcSwgcmVzKSA9PiB7XG4gIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUmVhY3RBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRSZWFjdEFwcC5qcyIsImNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qgc2VuZEVtYmVkUGFnZSA9ICh7IHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIC8vIGdldCBhbmQgcmVuZGVyIHRoZSBjb250ZW50XG4gIHJlcy5zdGF0dXMoMjAwKS5yZW5kZXIoJ2VtYmVkJywgeyBsYXlvdXQ6ICdlbWJlZCcsIGhvc3QsIGNsYWltSWQsIG5hbWUgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRFbWJlZFBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRFbWJlZFBhZ2UuanMiLCJjb25zdCByZWRpcmVjdCA9IChyb3V0ZSkgPT4ge1xuICByZXR1cm4gKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KHJvdXRlKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVkaXJlY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3JlZGlyZWN0LmpzIiwiY29uc3Qgc2VydmVBc3NldEJ5Q2xhaW0gPSByZXF1aXJlKCcuL3NlcnZlQXNzZXRCeUNsYWltJyk7XG5jb25zdCBzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0gPSByZXF1aXJlKCcuL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHAsIGRiKSA9PiB7XG4gIGFwcC5nZXQoJy86aWRlbnRpZmllci86Y2xhaW0nLCBzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0pO1xuICBhcHAuZ2V0KCcvOmNsYWltJywgc2VydmVBc3NldEJ5Q2xhaW0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL2luZGV4LmpzIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3QgeyBkZXRlcm1pbmVSZXNwb25zZVR5cGUsIGxvZ1JlcXVlc3REYXRhLCBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCB9ID0gcmVxdWlyZSgnaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VydmUgYW4gYXNzZXQgb3IgdGhlIHJlYWN0IGFwcCB2aWEgdGhlIGNsYWltIG5hbWUgb25seVxuXG4qL1xuXG5jb25zdCBzZXJ2ZXJBc3NldEJ5Q2xhaW0gPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICB9XG4gIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gIC8vIHBhcnNlIHRoZSBjbGFpbVxuICBsZXQgY2xhaW1OYW1lO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgbnVsbCwgbnVsbCk7XG4gIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KG51bGwsIG51bGwsIGNsYWltTmFtZSwgbnVsbCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJBc3NldEJ5Q2xhaW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlDbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCJcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2EvZWZmZWN0c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7XG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSxcbiAgbG9nUmVxdWVzdERhdGEsXG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0LFxufSA9IHJlcXVpcmUoJ2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VydmUgYW4gYXNzZXQgb3IgdGhlIHJlYWN0IGFwcCB2aWEgdGhlIGNsYWltIG5hbWUgYW5kIGFuIGlkZW50aWZpZXJcblxuKi9cblxuY29uc3Qgc2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSA9IChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gIH1cbiAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgLy8gcGFyc2UgdGhlIGNsYWltXG4gIGxldCBjbGFpbU5hbWU7XG4gIHRyeSB7XG4gICAgKHsgY2xhaW1OYW1lIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIHBhcnNlIHRoZSBpZGVudGlmaWVyXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIocGFyYW1zLmlkZW50aWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgaWYgKCFpc0NoYW5uZWwpIHtcbiAgICBbY2xhaW1JZCwgY2xhaW1OYW1lXSA9IGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkoY2xhaW1JZCwgY2xhaW1OYW1lKTtcbiAgfVxuICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCk7XG4gIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0uanMiLCJjb25zdCBoYW5kbGVQYWdlUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZFJlYWN0QXBwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAuZ2V0KCcqJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svaW5kZXguanMiLCJjb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5jb25zdCBzZW5kUmVhY3RBcHAgPSAocmVxLCByZXMpID0+IHtcbiAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRSZWFjdEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==