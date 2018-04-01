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


var Certificate = __webpack_require__(45);
var Channel = __webpack_require__(46);
var Claim = __webpack_require__(47);
var File = __webpack_require__(48);
var Request = __webpack_require__(49);
var User = __webpack_require__(50);

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
var ua = __webpack_require__(55);

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


var axios = __webpack_require__(53);
var logger = __webpack_require__(0);

var _require = __webpack_require__(54),
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

var _require = __webpack_require__(66),
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


var passport = __webpack_require__(43);
var localLoginStrategy = __webpack_require__(44);
var localSignupStrategy = __webpack_require__(52);

var _require = __webpack_require__(56),
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
var fs = __webpack_require__(64);

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
  var CustomizedReducers = (0, _spee.Reducers)(siteConfig);
  var CustomizedApp = (0, _spee.App)(siteConfig);

  // create a new Redux store instance
  var store = (0, _redux.createStore)(CustomizedReducers);

  // render component to a string
  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(
        _spee.GAListener,
        null,
        _react2.default.createElement(CustomizedApp, null)
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

var _reduxSaga = __webpack_require__(87);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(88);

var _spee = __webpack_require__(20);

var _reactHelmet = __webpack_require__(22);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// configure the reducers by passing initial state configs
var siteConfig = __webpack_require__(3);
/*
  ^ note: to do this right, maybe
  these should be passed in from the implementation (www.spee.ch) itself,
  so that there are no conflicts between the SSR here and
  the bundle sent to the server?
  there might also be issues if this package uses a different version of spee.ch-components than www.spee.ch does?
*/

var CustomizedReducers = (0, _spee.Reducers)(siteConfig);
var CustomizedApp = (0, _spee.App)(siteConfig);

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

  // create and apply middleware
  var sagaMiddleware = (0, _reduxSaga2.default)();
  var middleware = (0, _redux.applyMiddleware)(sagaMiddleware);

  // create a new Redux store instance
  var store = (0, _redux.createStore)(CustomizedReducers, middleware);

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
          _spee.GAListener,
          null,
          _react2.default.createElement(CustomizedApp, null)
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


var Server = __webpack_require__(30);

var _exports = {
  Server: Server
};

module.exports = _exports;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(31);
var bodyParser = __webpack_require__(32);
var expressHandlebars = __webpack_require__(33);
var Handlebars = __webpack_require__(34);
var helmet = __webpack_require__(35);
var cookieSession = __webpack_require__(36);
var http = __webpack_require__(37);
var logger = __webpack_require__(0);
var requestLogger = __webpack_require__(38);
var Path = __webpack_require__(39);
var loggerConfig = __webpack_require__(40);
var mysqlConfig = __webpack_require__(10);
var siteConfig = __webpack_require__(3);
var slackConfig = __webpack_require__(41);

function Server() {
  var _this = this;

  this.configureLogger = function (userConfig) {
    loggerConfig.update(userConfig);
  };
  this.configureMysql = function (userConfig) {
    mysqlConfig.update(userConfig);
  };
  this.configureSiteDetails = function (userConfig) {
    siteConfig.update(userConfig);
  };
  this.configureSlack = function (userConfig) {
    slackConfig.update(userConfig);
  };
  this.configureClientBundle = function () {
    logger.debug('configure the client here by passing in the bundle and configuring it, or better yet: taking in the components to use dynamically from here.');
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
    __webpack_require__(57)(app);
    __webpack_require__(62)(app);
    __webpack_require__(81)(app);
    __webpack_require__(85)(app);
    __webpack_require__(90)(app);

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
/* 31 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 38 */
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
/* 39 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(42).SlackWebHook;
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
/* 42 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 44 */
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
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(51);
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
/* 51 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 54 */
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
/* 55 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(7);
var handleSignupRequest = __webpack_require__(58);
var handleLoginRequest = __webpack_require__(59);
var handleLogoutRequest = __webpack_require__(60);
var handleUserRequest = __webpack_require__(61);

module.exports = function (app) {
  app.post('/signup', speechPassport.authenticate('local-signup'), handleSignupRequest);
  app.post('/login', handleLoginRequest);
  app.get('/logout', handleLogoutRequest);
  app.get('/user', handleUserRequest);
};

/***/ }),
/* 58 */
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
/* 59 */
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logout = function logout(req, res) {
  req.logout();
  res.status(200).json({ success: true, message: 'you successfully logged out' });
};

module.exports = logout;

/***/ }),
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var channelAvailability = __webpack_require__(63);
var channelClaims = __webpack_require__(65);
var channelData = __webpack_require__(67);
var channelShortId = __webpack_require__(68);
var claimAvailability = __webpack_require__(69);
var claimData = __webpack_require__(70);
var claimGet = __webpack_require__(71);
var claimLongId = __webpack_require__(72);
var claimPublish = __webpack_require__(73);
var claimResolve = __webpack_require__(75);
var claimShortId = __webpack_require__(76);
var claimList = __webpack_require__(77);
var fileAvailability = __webpack_require__(78);

var multipartMiddleware = __webpack_require__(79);

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
/* 63 */
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
/* 64 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 65 */
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
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
/* 70 */
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
/* 71 */
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
/* 72 */
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
/* 73 */
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

var _require3 = __webpack_require__(74),
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var multipart = __webpack_require__(80);

var _require = __webpack_require__(3),
    uploadDirectory = _require.publishing.uploadDirectory;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });

module.exports = multipartMiddleware;

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(82);
var handleEmbedRequest = __webpack_require__(83);
var redirect = __webpack_require__(84);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(14);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ }),
/* 83 */
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redirect = function redirect(route) {
  return function (req, res) {
    res.status(301).redirect(route);
  };
};

module.exports = redirect;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var serveAssetByClaim = __webpack_require__(86);
var serveAssetByIdentifierAndClaim = __webpack_require__(89);

module.exports = function (app, db) {
  app.get('/:identifier/:claim', serveAssetByIdentifierAndClaim);
  app.get('/:claim', serveAssetByClaim);
};

/***/ }),
/* 86 */
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
/* 87 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 89 */
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(91);

module.exports = function (app) {
  app.get('*', handlePageRequest);
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(14);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTVmYzIxNDg0ZDVmN2NjZDVjYzIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3RvblwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNwZWUuY2gtY29tcG9uZW50c1wiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2hhdHdnLWZldGNoXCIiLCJ3ZWJwYWNrOi8vLy4vc3BlZWNoLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLWhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xicnlDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvc2lnbnVwLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9nb3V0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC91c2VyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxBdmFpbGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQ2xhaW1zLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxEYXRhLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxTaG9ydElkLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsIm9yaWdpbmFsVXJsIiwiaXAiLCJlcnJvciIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJqc29uIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwiZXJyIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJrZXkiLCJzdWNjZXNzIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJTZXF1ZWxpemUiLCJkYXRhYmFzZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJzZXF1ZWxpemUiLCJob3N0IiwiZGlhbGVjdCIsImRpYWxlY3RPcHRpb25zIiwiZGVjaW1hbE51bWJlcnMiLCJsb2dnaW5nIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJhY3F1aXJlIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImluZm8iLCJjYXRjaCIsImRiIiwiaW1wb3J0IiwibW9kZWxOYW1lIiwiYXNzb2NpYXRlIiwidXBzZXJ0IiwiTW9kZWwiLCJ2YWx1ZXMiLCJjb25kaXRpb24iLCJ0YWJsZU5hbWUiLCJmaW5kT25lIiwid2hlcmUiLCJvYmoiLCJkZWJ1ZyIsInVwZGF0ZSIsImNyZWF0ZSIsIlNpdGVDb25maWciLCJhbmFseXRpY3MiLCJnb29nbGVJZCIsImFzc2V0RGVmYXVsdHMiLCJkZXNjcmlwdGlvbiIsInRodW1ibmFpbCIsInRpdGxlIiwiYXV0aCIsInNlc3Npb25LZXkiLCJjdXN0b21Db21wb25lbnRzIiwiY3VzdG9tQ29udGFpbmVycyIsImN1c3RvbVBhZ2VzIiwiZGV0YWlscyIsInBvcnQiLCJ0d2l0dGVyIiwicHVibGlzaGluZyIsImFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyIsImRpc2FibGVkIiwiZGlzYWJsZWRNZXNzYWdlIiwicHJpbWFyeUNsYWltQWRkcmVzcyIsInRodW1ibmFpbENoYW5uZWwiLCJ0aHVtYm5haWxDaGFubmVsSWQiLCJ1cGxvYWREaXJlY3RvcnkiLCJyb3V0ZXMiLCJjb25maWciLCJjb25zb2xlIiwibG9nIiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJwYXJhbXMiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsInNlbmRHQVRpbWluZ0V2ZW50IiwiY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsIiwiY2hhbm5lbE5hbWUiLCJjaGFubmVsX25hbWUiLCJjaGFubmVsSWQiLCJjaGFubmVsX2lkIiwiYXhpb3MiLCJhcGkiLCJhcGlIb3N0IiwiYXBpUG9ydCIsImxicnlBcGlVcmkiLCJoYW5kbGVMYnJ5bmV0UmVzcG9uc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGF0YSIsInJlc3VsdCIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInB1Ymxpc2hDbGFpbSIsInB1Ymxpc2hQYXJhbXMiLCJuYW1lIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwiUHJvbWlzZSIsInBvc3QiLCJtZXRob2QiLCJyZXNwb25zZSIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJhbW91bnQiLCJyZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIiwiTk9fQ0hBTk5FTCIsIk5PX0NMQUlNIiwiTk9fRklMRSIsImdldENsYWltSWQiLCJjaGFubmVsQ2xhaW1JZCIsImNsYWltSWQiLCJnZXRDbGFpbUlkQnlDaGFubmVsIiwiZ2V0Q2xhaW1JZEJ5Q2xhaW0iLCJnZXRMb25nQ2xhaW1JZCIsImxvbmdDbGFpbUlkIiwiZ2V0TG9uZ0NoYW5uZWxJZCIsImxvbmdDaGFubmVsSWQiLCJhbGwiLCJnZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkIiwiZ2V0Q2hhbm5lbERhdGEiLCJwYWdlIiwibG9uZ0NoYW5uZWxDbGFpbUlkIiwiZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCIsInNob3J0Q2hhbm5lbENsYWltSWQiLCJnZXRDaGFubmVsQ2xhaW1zIiwiZ2V0QWxsQ2hhbm5lbENsYWltcyIsImNoYW5uZWxDbGFpbXNBcnJheSIsInBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSIsImdldExvY2FsRmlsZVJlY29yZCIsImZpbGUiLCJkYXRhVmFsdWVzIiwicGFzc3BvcnQiLCJsb2NhbExvZ2luU3RyYXRlZ3kiLCJsb2NhbFNpZ251cFN0cmF0ZWd5Iiwic2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplVXNlciIsInNlcmlhbGl6ZVVzZXIiLCJ1c2UiLCJsYnJ5QXBpIiwicHVibGlzaEhlbHBlcnMiLCJPcCIsInB1Ymxpc2giLCJmaWxlTmFtZSIsImZpbGVUeXBlIiwicHVibGlzaFJlc3VsdHMiLCJjZXJ0aWZpY2F0ZUlkIiwidHgiLCJjaGFubmVsIiwiZmlsZVJlY29yZCIsImNsYWltX2lkIiwibWV0YWRhdGEiLCJhZGRyZXNzIiwiY2xhaW1fYWRkcmVzcyIsIm91dHBvaW50IiwidHhpZCIsIm5vdXQiLCJoZWlnaHQiLCJmaWxlUGF0aCIsImZpbGVfcGF0aCIsIm5zZnciLCJjbGFpbVJlY29yZCIsImNvbnRlbnRUeXBlIiwiYmlkIiwidXBzZXJ0Q3JpdGVyaWEiLCJjbGFpbSIsInNldENsYWltIiwic2V0RmlsZSIsImRlbGV0ZVRlbXBvcmFyeUZpbGUiLCJjbGFpbU5hbWVJc0F2YWlsYWJsZSIsImNsYWltQWRkcmVzc2VzIiwicHVzaCIsImZpbmRBbGwiLCJhdHRyaWJ1dGVzIiwib3IiLCJjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkiLCJmcyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5IiwibGljZW5zZSIsImludmFsaWROYW1lQ2hhcmFjdGVycyIsImV4ZWMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMiLCJwYXRoIiwidHlwZSIsInNpemUiLCJ0ZXN0IiwidmFsaWRhdGVGaWxlVHlwZUFuZFNpemUiLCJ0aHVtYm5haWxGaWxlTmFtZSIsInRodW1ibmFpbEZpbGVQYXRoIiwidGh1bWJuYWlsRmlsZVR5cGUiLCJjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMiLCJ0cmltIiwiYXV0aG9yIiwibGFuZ3VhZ2UiLCJjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zIiwidW5saW5rIiwiYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEiLCJmaWxlSW5mbyIsImdldFJlc3VsdCIsImZpbGVfbmFtZSIsImRvd25sb2FkX3BhdGgiLCJjcmVhdGVGaWxlRGF0YSIsIm15c3FsIiwid2FybiIsInJldHVyblNob3J0SWQiLCJjbGFpbXNBcnJheSIsImxvbmdJZCIsImNsYWltSW5kZXgiLCJzaG9ydElkIiwic3Vic3RyaW5nIiwic2hvcnRJZExlbmd0aCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJwb3NzaWJsZU1hdGNoZXMiLCJzbGljZSIsImZpbHRlciIsInNpdGVDb25maWciLCJyZXEiLCJjb250ZXh0IiwiQ3VzdG9taXplZFJlZHVjZXJzIiwiQ3VzdG9taXplZEFwcCIsInN0b3JlIiwiaHRtbCIsInVybCIsImhlbG1ldCIsInJlbmRlclN0YXRpYyIsInJlZGlyZWN0IiwicHJlbG9hZGVkU3RhdGUiLCJnZXRTdGF0ZSIsInNlbmQiLCJ0b1N0cmluZyIsIm1ldGEiLCJsaW5rIiwiU0VSVkUiLCJTSE9XIiwiY2xpZW50QWNjZXB0c0h0bWwiLCJhY2NlcHQiLCJtYXRjaCIsInJlcXVlc3RJc0Zyb21Ccm93c2VyIiwiY2xpZW50V2FudHNBc3NldCIsInJhbmdlIiwiaW1hZ2VJc1dhbnRlZCIsInZpZGVvSXNXYW50ZWQiLCJpc1ZhbGlkQ2xhaW1JZCIsImlzVmFsaWRTaG9ydElkIiwiaXNWYWxpZFNob3J0SWRPckNsYWltSWQiLCJpbnB1dCIsInNlcnZlQXNzZXRUb0NsaWVudCIsInZlcmJvc2UiLCJzZW5kRmlsZU9wdGlvbnMiLCJzZW5kRmlsZSIsImdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IiwiZnVsbENsYWltSWQiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicmVzcG9uc2VUeXBlIiwiZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSIsImlkZW50aWZpZXIiLCJ0ZW1wTmFtZSIsImxvZ1JlcXVlc3REYXRhIiwiUkVHRVhQX0lOVkFMSURfQ0xBSU0iLCJSRUdFWFBfSU5WQUxJRF9DSEFOTkVMIiwiUkVHRVhQX0FERFJFU1MiLCJDSEFOTkVMX0NIQVIiLCJwYXJzZUlkZW50aWZpZXIiLCJjb21wb25lbnRzUmVnZXgiLCJSZWdFeHAiLCJtYXAiLCJwcm90byIsInZhbHVlIiwibW9kaWZpZXJTZXBlcmF0b3IiLCJtb2RpZmllciIsImlzQ2hhbm5lbCIsInN0YXJ0c1dpdGgiLCJuYW1lQmFkQ2hhcnMiLCJqb2luIiwicGFyc2VDbGFpbSIsInBhcnNlTW9kaWZpZXIiLCJyZXR1cm5TYWdhV2l0aFBhcmFtcyIsInNhZ2EiLCJzYWdhTWlkZGxld2FyZSIsIm1pZGRsZXdhcmUiLCJhY3Rpb24iLCJvbkhhbmRsZVNob3dQYWdlVXJpIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJydW4iLCJkb25lIiwiU2VydmVyIiwiZXhwcmVzcyIsImJvZHlQYXJzZXIiLCJleHByZXNzSGFuZGxlYmFycyIsIkhhbmRsZWJhcnMiLCJjb29raWVTZXNzaW9uIiwiaHR0cCIsInJlcXVlc3RMb2dnZXIiLCJQYXRoIiwibG9nZ2VyQ29uZmlnIiwibXlzcWxDb25maWciLCJzbGFja0NvbmZpZyIsImNvbmZpZ3VyZUxvZ2dlciIsInVzZXJDb25maWciLCJjb25maWd1cmVNeXNxbCIsImNvbmZpZ3VyZVNpdGVEZXRhaWxzIiwiY29uZmlndXJlU2xhY2siLCJjb25maWd1cmVDbGllbnRCdW5kbGUiLCJjb25maWd1cmVNb2RlbHMiLCJjb25maWd1cmVSb3V0ZXMiLCJjcmVhdGVBcHAiLCJhcHAiLCJlbmFibGUiLCJwdWJsaWNGb2xkZXIiLCJwcm9jZXNzIiwiY3dkIiwic3RhdGljIiwicHVibGljUGF0aCIsIl9fZGlybmFtZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNwZWVjaFBhc3Nwb3J0IiwibWF4QWdlIiwiaW5pdGlhbGl6ZSIsInNlc3Npb24iLCJoYnMiLCJkZWZhdWx0TGF5b3V0IiwiaGFuZGxlYmFycyIsImVuZ2luZSIsInNldCIsInNlcnZlciIsInN0YXJ0IiwiUE9SVCIsInN5bmMiLCJsaXN0ZW4iLCJuZXh0IiwiTG9nZ2VyQ29uZmlnIiwibG9nTGV2ZWwiLCJjb25maWd1cmUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwidXNlckluZm8iLCJpZCIsInVzZXJOYW1lIiwiZ2V0Q2hhbm5lbCIsInNob3J0Q2hhbm5lbElkIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VyIiwiY29tcGFyZVBhc3N3b3JkIiwiaXNNYXRjaCIsIlNUUklORyIsIkJPT0xFQU4iLCJJTlRFR0VSIiwiVEVYVCIsIkRFQ0lNQUwiLCJkZWZpbmUiLCJkZWZhdWx0IiwiY2xhaW1TZXF1ZW5jZSIsImRlY29kZWRDbGFpbSIsImRlcHRoIiwiZWZmZWN0aXZlQW1vdW50IiwiaGFzU2lnbmF0dXJlIiwiaGV4IiwidmFsaWRBdEhlaWdodCIsInZhbHVlVmVyc2lvbiIsImNsYWltVHlwZSIsImNlcnRpZmljYXRlVmVyc2lvbiIsImtleVR5cGUiLCJwdWJsaWNLZXkiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJmb3JlaWduS2V5IiwiYWxsb3dOdWxsIiwib3JkZXIiLCJnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkIiwiJGxpa2UiLCJnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lIiwidmFsaWRhdGVMb25nQ2hhbm5lbElkIiwiaGFzT25lIiwiZGVmYXVsdFRodW1ibmFpbCIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2UiLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwib3B0aW9ucyIsInVzZXJEYXRhIiwiY2hhbm5lbERhdGEiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiaGFuZGxlU2lnbnVwUmVxdWVzdCIsImhhbmRsZUxvZ2luUmVxdWVzdCIsImhhbmRsZUxvZ291dFJlcXVlc3QiLCJoYW5kbGVVc2VyUmVxdWVzdCIsImdldCIsInNpZ251cCIsImxvZ2luIiwibG9nSW4iLCJsb2dvdXQiLCJjaGFubmVsQXZhaWxhYmlsaXR5IiwiY2hhbm5lbENsYWltcyIsImNoYW5uZWxTaG9ydElkIiwiY2xhaW1BdmFpbGFiaWxpdHkiLCJjbGFpbURhdGEiLCJjbGFpbUdldCIsImNsYWltTG9uZ0lkIiwiY2xhaW1QdWJsaXNoIiwiY2xhaW1SZXNvbHZlIiwiY2xhaW1TaG9ydElkIiwiY2xhaW1MaXN0IiwiZmlsZUF2YWlsYWJpbGl0eSIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJhdmFpbGFibGVOYW1lIiwiYm9keSIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsImNoYW5uZWxTaG9ydElkUm91dGUiLCJjbGFpbUluZm8iLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJjb21wbGV0ZWQiLCJhdXRoZW50aWNhdGVVc2VyIiwiZmlsZXMiLCJjaGFubmVsUGFzc3dvcmQiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJyZXNvbHZlZFVyaSIsImNsYWltc0xpc3QiLCJtdWx0aXBhcnQiLCJ1cGxvYWREaXIiLCJoYW5kbGVQYWdlUmVxdWVzdCIsImhhbmRsZUVtYmVkUmVxdWVzdCIsImhhbmRsZVBhZ2VSZW5kZXIiLCJzZW5kUmVhY3RBcHAiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwic2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxJQUFNQSxTQUFTLG1CQUFBQyxDQUFRLENBQVIsQ0FBZjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyx1QkFBcUIsNkJBQVVDLFdBQVYsRUFBdUJDLEVBQXZCLEVBQTJCQyxLQUEzQixF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LGlCQUFiO0FBQ0QsQ0FGRCxDOzs7Ozs7Ozs7QUNGQSxJQUFNRSxtQkFBbUIsbUJBQUF6akIsQ0FBUSxFQUFSLENBQXpCOztBQUVBLElBQU0wakIsZUFBZSxTQUFmQSxZQUFlLENBQUN6UyxHQUFELEVBQU0xUSxHQUFOLEVBQWM7QUFDakNrakIsbUJBQWlCeFMsR0FBakIsRUFBc0IxUSxHQUF0QjtBQUNELENBRkQ7O0FBSUFOLE9BQU9DLE9BQVAsR0FBaUJ3akIsWUFBakIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTVmYzIxNDg0ZDVmN2NjZDVjYzIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3RvblwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhbmRsZUVycm9yUmVzcG9uc2U6IGZ1bmN0aW9uIChvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpIHtcbiAgICBsb2dnZXIuZXJyb3IoYEVycm9yIG9uICR7b3JpZ2luYWxVcmx9YCwgbW9kdWxlLmV4cG9ydHMudXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzKGVycm9yKSk7XG4gICAgY29uc3QgW3N0YXR1cywgbWVzc2FnZV0gPSBtb2R1bGUuZXhwb3J0cy5yZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMoZXJyb3IpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyhzdGF0dXMpXG4gICAgICAuanNvbihtb2R1bGUuZXhwb3J0cy5jcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZChzdGF0dXMsIG1lc3NhZ2UpKTtcbiAgfSxcbiAgcmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBsZXQgc3RhdHVzLCBtZXNzYWdlO1xuICAgIC8vIGNoZWNrIGZvciBkYWVtb24gYmVpbmcgdHVybmVkIG9mZlxuICAgIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJykge1xuICAgICAgc3RhdHVzID0gNTAzO1xuICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHJlZnVzZWQuICBUaGUgZGFlbW9uIG1heSBub3QgYmUgcnVubmluZy4nO1xuICAgICAgLy8gZmFsbGJhY2sgZm9yIGV2ZXJ5dGhpbmcgZWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXMgPSA0MDA7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gW3N0YXR1cywgbWVzc2FnZV07XG4gIH0sXG4gIHVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5czogZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGV0IG5ld0Vycm9yT2JqZWN0ID0ge307XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBuZXdFcnJvck9iamVjdFtrZXldID0gZXJyW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdFcnJvck9iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfSxcbiAgY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQgKHN0YXR1cywgbWVzc2FnZSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCdtb2RlbHMvY2VydGlmaWNhdGUuanMnKTtcbmNvbnN0IENoYW5uZWwgPSByZXF1aXJlKCdtb2RlbHMvY2hhbm5lbC5qcycpO1xuY29uc3QgQ2xhaW0gPSByZXF1aXJlKCdtb2RlbHMvY2xhaW0uanMnKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCdtb2RlbHMvZmlsZS5qcycpO1xuY29uc3QgUmVxdWVzdCA9IHJlcXVpcmUoJ21vZGVscy9yZXF1ZXN0LmpzJyk7XG5jb25zdCBVc2VyID0gcmVxdWlyZSgnbW9kZWxzL3VzZXIuanMnKTtcblxuY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnN0IHtkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnLmpzJyk7XG5cbi8vIHNldCBzZXF1ZWxpemUgb3B0aW9uc1xuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkLCB7XG4gIGhvc3QgICAgICAgICAgOiAnbG9jYWxob3N0JyxcbiAgZGlhbGVjdCAgICAgICA6ICdteXNxbCcsXG4gIGRpYWxlY3RPcHRpb25zOiB7ZGVjaW1hbE51bWJlcnM6IHRydWV9LFxuICBsb2dnaW5nICAgICAgIDogZmFsc2UsXG4gIHBvb2wgICAgICAgICAgOiB7XG4gICAgbWF4ICAgIDogNSxcbiAgICBtaW4gICAgOiAwLFxuICAgIGlkbGUgICA6IDEwMDAwLFxuICAgIGFjcXVpcmU6IDEwMDAwLFxuICB9LFxufSk7XG5cbi8vIGVzdGFibGlzaCBteXNxbCBjb25uZWN0aW9uXG5zZXF1ZWxpemVcbiAgLmF1dGhlbnRpY2F0ZSgpXG4gIC50aGVuKCgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VxdWVsaXplIGhhcyBlc3RhYmxpc2hlZCBteXNxbCBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKCdTZXF1ZWxpemUgd2FzIHVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZTonLCBlcnIpO1xuICB9KTtcblxuLy8gbWFudWFsbHkgYWRkIGVhY2ggbW9kZWwgdG8gdGhlIGRiIG9iamVjdCAobm90ZTogbWFrZSB0aGlzIGR5bmFtaWMpXG5jb25zdCBkYiA9IHt9O1xuZGJbJ0NlcnRpZmljYXRlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDZXJ0aWZpY2F0ZScsIENlcnRpZmljYXRlKTtcbmRiWydDaGFubmVsJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDaGFubmVsJywgQ2hhbm5lbCk7XG5kYlsnQ2xhaW0nXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NsYWltJywgQ2xhaW0pO1xuZGJbJ0ZpbGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0ZpbGUnLCBGaWxlKTtcbmRiWydSZXF1ZXN0J10gPSBzZXF1ZWxpemUuaW1wb3J0KCdSZXF1ZXN0JywgUmVxdWVzdCk7XG5kYlsnVXNlciddID0gc2VxdWVsaXplLmltcG9ydCgnVXNlcicsIFVzZXIpO1xuXG4vLyBydW4gbW9kZWwuYXNzb2NpYXRpb24gZm9yIGVhY2ggbW9kZWwgaW4gdGhlIGRiIG9iamVjdCB0aGF0IGhhcyBhbiBhc3NvY2lhdGlvblxubG9nZ2VyLmluZm8oJ2Fzc29jaWF0aW5nIGRiIG1vZGVscy4uLicpO1xuT2JqZWN0LmtleXMoZGIpLmZvckVhY2gobW9kZWxOYW1lID0+IHtcbiAgaWYgKGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKSB7XG4gICAgbG9nZ2VyLmluZm8oJ0Fzc29jaWF0aW5nIG1vZGVsOicsIG1vZGVsTmFtZSk7XG4gICAgZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUoZGIpO1xuICB9XG59KTtcblxuLy8gYWRkIHNlcXVlbGl6ZS9TZXF1ZWxpemUgdG8gZGJcbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcbi8vIGFkZCBhbiAndXBzZXJ0JyBtZXRob2QgdG8gdGhlIGRiIG9iamVjdFxuZGIudXBzZXJ0ID0gKE1vZGVsLCB2YWx1ZXMsIGNvbmRpdGlvbiwgdGFibGVOYW1lKSA9PiB7XG4gIHJldHVybiBNb2RlbFxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiBjb25kaXRpb24sXG4gICAgfSlcbiAgICAudGhlbihvYmogPT4ge1xuICAgICAgaWYgKG9iaikgeyAgLy8gdXBkYXRlXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgdXBkYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gb2JqLnVwZGF0ZSh2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHsgIC8vIGluc2VydFxuICAgICAgICBsb2dnZXIuZGVidWcoYGNyZWF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIE1vZGVsLmNyZWF0ZSh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGAke3RhYmxlTmFtZX0udXBzZXJ0IGVycm9yYCwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsImZ1bmN0aW9uIFNpdGVDb25maWcgKCkge1xuICB0aGlzLmFuYWx5dGljcyA9IHtcbiAgICBnb29nbGVJZDogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmFzc2V0RGVmYXVsdHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdBbiBhc3NldCBwdWJsaXNoZWQgb24gU3BlZS5jaCcsXG4gICAgdGh1bWJuYWlsICA6ICdodHRwczovL3NwZWUuY2gvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgfTtcbiAgdGhpcy5hdXRoID0ge1xuICAgIHNlc3Npb25LZXk6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5jdXN0b21Db21wb25lbnRzID0ge307XG4gIHRoaXMuY3VzdG9tQ29udGFpbmVycyA9IHt9O1xuICB0aGlzLmN1c3RvbVBhZ2VzID0ge307XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLnJvdXRlcyA9IHt9O1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGN1c3RvbUNvbXBvbmVudHMsIGN1c3RvbUNvbnRhaW5lcnMsIGN1c3RvbVBhZ2VzLCBkZXRhaWxzLCBwdWJsaXNoaW5nLCByb3V0ZXMgfSA9IGNvbmZpZztcbiAgICBjb25zb2xlLmxvZygnQ29uZmlndXJpbmcgc2l0ZSBkZXRhaWxzLi4uJyk7XG4gICAgdGhpcy5hbmFseXRpY3MgPSBhbmFseXRpY3M7XG4gICAgdGhpcy5hc3NldERlZmF1bHRzID0gYXNzZXREZWZhdWx0cztcbiAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgdGhpcy5wdWJsaXNoaW5nID0gcHVibGlzaGluZztcbiAgICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSBjdXN0b21Db21wb25lbnRzO1xuICAgIHRoaXMuY3VzdG9tQ29udGFpbmVycyA9IGN1c3RvbUNvbnRhaW5lcnM7XG4gICAgdGhpcy5jdXN0b21QYWdlcyA9IGN1c3RvbVBhZ2VzO1xuICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2l0ZUNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NpdGVDb25maWcuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB1YSA9IHJlcXVpcmUoJ3VuaXZlcnNhbC1hbmFseXRpY3MnKTtcbmNvbnN0IHsgYW5hbHl0aWNzIDogeyBnb29nbGVJZCB9LCBkZXRhaWxzOiB7IHRpdGxlIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICByZXR1cm4ge1xuICAgIGV2ZW50Q2F0ZWdvcnkgICAgOiAnY2xpZW50IHJlcXVlc3RzJyxcbiAgICBldmVudEFjdGlvbiAgICAgIDogJ3NlcnZlIHJlcXVlc3QnLFxuICAgIGV2ZW50TGFiZWwgICAgICAgOiBvcmlnaW5hbFVybCxcbiAgICBpcE92ZXJyaWRlICAgICAgIDogaXAsXG4gICAgdXNlckFnZW50T3ZlcnJpZGU6IGhlYWRlcnNbJ3VzZXItYWdlbnQnXSxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gZW5kVGltZSAtIHN0YXJ0VGltZTtcbiAgcmV0dXJuIHtcbiAgICB1c2VyVGltaW5nQ2F0ZWdvcnkgICAgOiBjYXRlZ29yeSxcbiAgICB1c2VyVGltaW5nVmFyaWFibGVOYW1lOiB2YXJpYWJsZSxcbiAgICB1c2VyVGltaW5nVGltZSAgICAgICAgOiBkdXJhdGlvbixcbiAgICB1c2VyVGltaW5nTGFiZWwgICAgICAgOiBsYWJlbCxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudCAoaXAsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9ySWQgPSBpcC5yZXBsYWNlKC9cXC4vZywgJy0nKTtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IuZXZlbnQocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyAodmlzaXRvcklkLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IudGltaW5nKHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgVGltaW5nIGV2ZW50IHN1Y2Nlc3NmdWxseSBzZW50IHRvIGdvb2dsZSBhbmFseXRpY3NgKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VuZEdBU2VydmVFdmVudCAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlU2VydmVFdmVudFBhcmFtcyhoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudChpcCwgcGFyYW1zKTtcbiAgfSxcbiAgc2VuZEdBVGltaW5nRXZlbnQgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyhjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcodGl0bGUsIHBhcmFtcyk7XG4gIH0sXG4gIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCAoeyBjaGFubmVsX25hbWU6IGNoYW5uZWxOYW1lLCBjaGFubmVsX2lkOiBjaGFubmVsSWQgfSkge1xuICAgIHJldHVybiAoY2hhbm5lbE5hbWUgfHwgY2hhbm5lbElkID8gJ1BVQkxJU0hfSU5fQ0hBTk5FTF9DTEFJTScgOiAnUFVCTElTSF9BTk9OWU1PVVNfQ0xBSU0nKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGFwaTogeyBhcGlIb3N0LCBhcGlQb3J0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzJyk7XG5jb25zdCBsYnJ5QXBpVXJpID0gJ2h0dHA6Ly8nICsgYXBpSG9zdCArICc6JyArIGFwaVBvcnQ7XG5jb25zdCB7IGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCwgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4vZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5cbmNvbnN0IGhhbmRsZUxicnluZXRSZXNwb25zZSA9ICh7IGRhdGEgfSwgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGxvZ2dlci5kZWJ1ZygnbGJyeSBhcGkgZGF0YTonLCBkYXRhKTtcbiAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgLy8gY2hlY2sgZm9yIGFuIGVycm9yXG4gICAgaWYgKGRhdGEucmVzdWx0LmVycm9yKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0xicnluZXQgYXBpIGVycm9yOicsIGRhdGEucmVzdWx0LmVycm9yKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoZGF0YS5yZXN1bHQuZXJyb3IpKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIHJlc29sdmUoZGF0YS5yZXN1bHQpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBmYWxsYmFjayBpbiBjYXNlIGl0IGp1c3QgdGltZWQgb3V0XG4gIHJlamVjdChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaENsYWltIChwdWJsaXNoUGFyYW1zKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFB1Ymxpc2hpbmcgY2xhaW0gdG8gXCIke3B1Ymxpc2hQYXJhbXMubmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3B1Ymxpc2gnLFxuICAgICAgICAgIHBhcmFtczogcHVibGlzaFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3B1Ymxpc2gnLCBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwocHVibGlzaFBhcmFtcyksIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBDbGFpbSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSwgdGltZW91dDogMjAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltJywgJ0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltTGlzdCAoY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgY2xhaW1fbGlzdCBmb3IgXCIke2NsYWltTmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NsYWltX2xpc3QnLFxuICAgICAgICAgIHBhcmFtczogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltTGlzdCcsICdDTEFJTV9MSVNUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVzb2x2ZVVyaSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFJlc29sdmluZyBVUkkgZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdyZXNvbHZlJyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3Jlc29sdmVVcmknLCAnUkVTT0xWRScsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcikgeyAgLy8gY2hlY2sgZm9yIGVycm9yc1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7ICAvLyBpZiBubyBlcnJvcnMsIHJlc29sdmVcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHRbdXJpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXREb3dubG9hZERpcmVjdG9yeSAoKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdsYnJ5QXBpID4+IFJldHJpZXZpbmcgdGhlIGRvd25sb2FkIGRpcmVjdG9yeSBwYXRoIGZyb20gbGJyeSBkYWVtb24uLi4nKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdzZXR0aW5nc19nZXQnLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXREb3dubG9hZERpcmVjdG9yeScsICdTRVRUSU5HU19HRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0LmRvd25sb2FkX2RpcmVjdG9yeSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gbGJyeSBkYWVtb24sIGJ1dCB1bmFibGUgdG8gcmV0cmlldmUgdGhlIGRvd25sb2FkIGRpcmVjdG9yeS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdMYnJ5bmV0IEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKCcvaG9tZS9sYnJ5L0Rvd25sb2Fkcy8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZUNoYW5uZWwgKG5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gQ3JlYXRpbmcgY2hhbm5lbCBmb3IgJHtuYW1lfS4uLmApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NoYW5uZWxfbmV3JyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGNoYW5uZWxfbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGFtb3VudCAgICAgIDogMC4xLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdjcmVhdGVDaGFubmVsJywgJ0NIQU5ORUxfTkVXJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSwgY2xhaW1JZCkge1xuICAgIGlmIChjaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNoYW5uZWwoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNsYWltKG5hbWUsIGNsYWltSWQpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2xhaW0gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2xhaW0oJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DbGFpbS5nZXRMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltSWRCeUNoYW5uZWwgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDaGFubmVsKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSwgJHtjbGFpbU5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgaWRcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxJZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsSWQsIGRiLkNsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxJZCwgY2xhaW1OYW1lKV0pOyAgLy8gMi4gZ2V0IHRoZSBsb25nIGNsYWltIGlkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxJZCwgbG9uZ0NsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbERhdGEgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBzaG9ydENoYW5uZWxDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgICBzaG9ydENoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyhsb25nQ2hhbm5lbENsYWltSWQpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXldKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiBmb3JtYXQgdGhlIGRhdGEgZm9yIHRoZSB2aWV3LCBpbmNsdWRpbmcgcGFnaW5hdGlvblxuICAgICAgICAgIGxldCBwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEgPSByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheSwgcGFnZSk7XG4gICAgICAgICAgLy8gNC4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvbiBhbmQgY29udGVudHNcbiAgICAgICAgICByZXNvbHZlKHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldExvY2FsRmlsZVJlY29yZCAoY2xhaW1JZCwgbmFtZSkge1xuICAgIHJldHVybiBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7Y2xhaW1JZCwgbmFtZX19KVxuICAgICAgLnRoZW4oZmlsZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIHJldHVybiBOT19GSUxFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlLmRhdGFWYWx1ZXM7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwiY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xuY29uc3QgbG9jYWxMb2dpblN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1sb2dpbi5qcycpO1xuY29uc3QgbG9jYWxTaWdudXBTdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtc2lnbnVwLmpzJyk7XG5jb25zdCB7IHNlcmlhbGl6ZVNwZWVjaFVzZXIsIGRlc2VyaWFsaXplU3BlZWNoVXNlciB9ID0gcmVxdWlyZSgnaGVscGVycy9hdXRoSGVscGVycy5qcycpO1xuXG5wYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZGVzZXJpYWxpemVTcGVlY2hVc2VyKTtcbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoc2VyaWFsaXplU3BlZWNoVXNlcik7XG5wYXNzcG9ydC51c2UoJ2xvY2FsLWxvZ2luJywgbG9jYWxMb2dpblN0cmF0ZWd5KTtcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtc2lnbnVwJywgbG9jYWxTaWdudXBTdHJhdGVneSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFzc3BvcnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCdoZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgT3AgPSBTZXF1ZWxpemUuT3A7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoIChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHB1Ymxpc2hSZXN1bHRzLCBjZXJ0aWZpY2F0ZUlkLCBjaGFubmVsTmFtZTtcbiAgICAgIC8vIHB1Ymxpc2ggdGhlIGZpbGVcbiAgICAgIHJldHVybiBsYnJ5QXBpLnB1Ymxpc2hDbGFpbShwdWJsaXNoUGFyYW1zKVxuICAgICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFN1Y2Nlc3NmdWxseSBwdWJsaXNoZWQgJHtwdWJsaXNoUGFyYW1zLm5hbWV9ICR7ZmlsZU5hbWV9YCwgdHgpO1xuICAgICAgICAgIHB1Ymxpc2hSZXN1bHRzID0gdHg7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgaWYgKHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYHRoaXMgY2xhaW0gd2FzIHB1Ymxpc2hlZCBpbiBjaGFubmVsOiAke3B1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGRiLkNoYW5uZWwuZmluZE9uZSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgY2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygndGhpcyBjbGFpbSB3YXMgbm90IHB1Ymxpc2hlZCBpbiBhIGNoYW5uZWwnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgIC8vIHNldCBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgY2VydGlmaWNhdGVJZCA9IG51bGw7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgPSBudWxsO1xuICAgICAgICAgIGlmIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gY2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lID0gY2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKGBjZXJ0aWZpY2F0ZUlkOiAke2NlcnRpZmljYXRlSWR9YCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBGaWxlIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGZpbGVSZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgZmlsZVBhdGggICA6IHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoLFxuICAgICAgICAgICAgZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gY3JlYXRlIHRoZSBDbGFpbSByZWNvcmRcbiAgICAgICAgICBjb25zdCBjbGFpbVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIHRodW1ibmFpbCAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRodW1ibmFpbCxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICAgIGFtb3VudCAgICAgOiBwdWJsaXNoUGFyYW1zLmJpZCxcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQsXG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCBjcml0ZXJpYVxuICAgICAgICAgIGNvbnN0IHVwc2VydENyaXRlcmlhID0ge1xuICAgICAgICAgICAgbmFtZSAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgdGhlIHJlY29yZHNcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0ZpbGUnKSwgZGIudXBzZXJ0KGRiLkNsYWltLCBjbGFpbVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdDbGFpbScpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbZmlsZSwgY2xhaW1dKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlLnNldENsYWltKGNsYWltKSwgY2xhaW0uc2V0RmlsZShmaWxlKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgICAgcmVzb2x2ZShwdWJsaXNoUmVzdWx0cyk7IC8vIHJlc29sdmUgdGhlIHByb21pc2Ugd2l0aCB0aGUgcmVzdWx0IGZyb20gbGJyeUFwaS5wdWJsaXNoQ2xhaW07XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdQVUJMSVNIIEVSUk9SJywgZXJyb3IpO1xuICAgICAgICAgIHB1Ymxpc2hIZWxwZXJzLmRlbGV0ZVRlbXBvcmFyeUZpbGUocHVibGlzaFBhcmFtcy5maWxlX3BhdGgpOyAvLyBkZWxldGUgdGhlIGxvY2FsIGZpbGVcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUgKG5hbWUpIHtcbiAgICBjb25zdCBjbGFpbUFkZHJlc3NlcyA9IGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB8fCBbXTtcbiAgICBjbGFpbUFkZHJlc3Nlcy5wdXNoKHByaW1hcnlDbGFpbUFkZHJlc3MpO1xuICAgIC8vIGZpbmQgYW55IHJlY29yZHMgd2hlcmUgdGhlIG5hbWUgaXMgdXNlZFxuICAgIHJldHVybiBkYi5DbGFpbVxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbJ2FkZHJlc3MnXSxcbiAgICAgICAgd2hlcmUgICAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWRkcmVzczoge1xuICAgICAgICAgICAgW09wLm9yXTogY2xhaW1BZGRyZXNzZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNsYWltIGlzIGFscmVhZHkgaW4gdXNlJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSAobmFtZSkge1xuICAgIHJldHVybiBkYi5DaGFubmVsXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IGNoYW5uZWxOYW1lOiBuYW1lIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjaGFubmVsIGhhcyBhbHJlYWR5IGJlZW4gY2xhaW1lZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCB7IGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSkge1xuICAgIC8vIHZhbGlkYXRlIG5hbWVcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbmFtZSBmaWVsZCBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWROYW1lQ2hhcmFjdGVycyA9IC9bXkEtWmEtejAtOSwtXS8uZXhlYyhuYW1lKTtcbiAgICBpZiAoaW52YWxpZE5hbWVDaGFyYWN0ZXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjbGFpbSBuYW1lIHlvdSBwcm92aWRlZCBpcyBub3QgYWxsb3dlZC4gIE9ubHkgdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzIGFyZSBhbGxvd2VkOiBBLVosIGEteiwgMC05LCBhbmQgXCItXCInKTtcbiAgICB9XG4gICAgLy8gb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgIG5zZncgPSAobnNmdyA9PT0gJ3RydWUnKTtcbiAgICBsaWNlbnNlID0gbGljZW5zZSB8fCBudWxsO1xuICAgIHRpdGxlID0gdGl0bGUgfHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uIHx8IG51bGw7XG4gICAgdGh1bWJuYWlsID0gdGh1bWJuYWlsIHx8IG51bGw7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIG5zZncsXG4gICAgICBsaWNlbnNlLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHRodW1ibmFpbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgKHtmaWxlLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gbWFrZSBzdXJlIGEgZmlsZSB3YXMgcHJvdmlkZWRcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB3aXRoIGtleSBvZiBbZmlsZV0gZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5zaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZSBuYW1lXG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGVcbiAgICBtb2R1bGUuZXhwb3J0cy52YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZShmaWxlKTtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlTmFtZSAgICAgICAgIDogZmlsZS5uYW1lLFxuICAgICAgZmlsZVBhdGggICAgICAgICA6IGZpbGUucGF0aCxcbiAgICAgIGZpbGVUeXBlICAgICAgICAgOiBmaWxlLnR5cGUsXG4gICAgICB0aHVtYm5haWxGaWxlTmFtZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5uYW1lIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlUGF0aDogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5wYXRoIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlVHlwZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC50eXBlIDogbnVsbCksXG4gICAgfTtcbiAgfSxcbiAgdmFsaWRhdGVGaWxlVHlwZUFuZFNpemUgKGZpbGUpIHtcbiAgICAvLyBjaGVjayBmaWxlIHR5cGUgYW5kIHNpemVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmpwZWcvLmpwZy8ucG5nIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5naWYgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCAuZ2lmcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAubXA0IHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IHVucmVjb2duaXplZCBmaWxlIHR5cGUnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgJyArIGZpbGUudHlwZSArICcgY29udGVudCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuICBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlO1xuICB9LFxuICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMgKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0cyBmb3IgdGl0bGVcbiAgICBpZiAodGl0bGUgPT09IG51bGwgfHwgdGl0bGUudHJpbSgpID09PSAnJykge1xuICAgICAgdGl0bGUgPSBuYW1lO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGRlc2NyaXB0aW9uXG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSBudWxsIHx8IGRlc2NyaXB0aW9uLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gJyc7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgbGljZW5zZVxuICAgIGlmIChsaWNlbnNlID09PSBudWxsIHx8IGxpY2Vuc2UudHJpbSgpID09PSAnJykge1xuICAgICAgbGljZW5zZSA9ICcgJzsgIC8vIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nXG4gICAgfVxuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICBjb25zdCBwdWJsaXNoUGFyYW1zID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGZpbGVfcGF0aDogZmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgIH07XG4gICAgLy8gYWRkIHRodW1ibmFpbCB0byBjaGFubmVsIGlmIHZpZGVvXG4gICAgaWYgKHRodW1ibmFpbCkge1xuICAgICAgcHVibGlzaFBhcmFtc1snbWV0YWRhdGEnXVsndGh1bWJuYWlsJ10gPSB0aHVtYm5haWw7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaXNoUGFyYW1zO1xuICB9LFxuICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zICh0aHVtYm5haWxGaWxlUGF0aCwgY2xhaW1OYW1lLCBsaWNlbnNlLCBuc2Z3KSB7XG4gICAgaWYgKCF0aHVtYm5haWxGaWxlUGF0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFRodW1ibmFpbCBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUgICAgIDogYCR7Y2xhaW1OYW1lfS10aHVtYmAsXG4gICAgICBmaWxlX3BhdGg6IHRodW1ibmFpbEZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIHRpdGxlICAgICAgOiBgJHtjbGFpbU5hbWV9IHRodW1ibmFpbGAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgYSB0aHVtYm5haWwgZm9yICR7Y2xhaW1OYW1lfWAsXG4gICAgICAgIGF1dGhvciAgICAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZSAgIDogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgICBjaGFubmVsX25hbWUgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWwsXG4gICAgICBjaGFubmVsX2lkICAgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWxJZCxcbiAgICB9O1xuICB9LFxuICBkZWxldGVUZW1wb3JhcnlGaWxlIChmaWxlUGF0aCkge1xuICAgIGZzLnVubGluayhmaWxlUGF0aCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBlcnJvciBkZWxldGluZyB0ZW1wb3JhcnkgZmlsZSAke2ZpbGVQYXRofWApO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZGVidWcoYHN1Y2Nlc3NmdWxseSBkZWxldGVkICR7ZmlsZVBhdGh9YCk7XG4gICAgfSk7XG4gIH0sXG4gIGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIChmaWxlSW5mbywgZ2V0UmVzdWx0KSB7XG4gICAgZmlsZUluZm8uZmlsZU5hbWUgPSBnZXRSZXN1bHQuZmlsZV9uYW1lO1xuICAgIGZpbGVJbmZvLmZpbGVQYXRoID0gZ2V0UmVzdWx0LmRvd25sb2FkX3BhdGg7XG4gICAgcmV0dXJuIGZpbGVJbmZvO1xuICB9LFxuICBjcmVhdGVGaWxlRGF0YSAoeyBuYW1lLCBjbGFpbUlkLCBvdXRwb2ludCwgaGVpZ2h0LCBhZGRyZXNzLCBuc2Z3LCBjb250ZW50VHlwZSB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBjbGFpbUlkLFxuICAgICAgb3V0cG9pbnQsXG4gICAgICBoZWlnaHQsXG4gICAgICBhZGRyZXNzLFxuICAgICAgZmlsZU5hbWU6ICcnLFxuICAgICAgZmlsZVBhdGg6ICcnLFxuICAgICAgZmlsZVR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgbnNmdyxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBteXNxbCAoKSB7XG4gIHRoaXMuZGF0YWJhc2UgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXNlcm5hbWUgPSAnZGVmYXVsdCc7XG4gIHRoaXMucGFzc3dvcmQgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ05vIE15U1FMIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgLy8gY29uZmlndXJlIGNyZWRlbnRpYWxzXG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIG15c3FsLi4uJyk7XG4gICAgY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBjb25maWc7XG4gICAgdGhpcy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBteXNxbCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuU2hvcnRJZDogZnVuY3Rpb24gKGNsYWltc0FycmF5LCBsb25nSWQpIHtcbiAgICBsZXQgY2xhaW1JbmRleDtcbiAgICBsZXQgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgMSk7IC8vIGRlZmF1bHQgc2hvcnQgaWQgaXMgdGhlIGZpcnN0IGxldHRlclxuICAgIGxldCBzaG9ydElkTGVuZ3RoID0gMDtcbiAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGlzIGNsYWltIGlkXG4gICAgY2xhaW1JbmRleCA9IGNsYWltc0FycmF5LmZpbmRJbmRleChlbGVtZW50ID0+IHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYWltSWQgPT09IGxvbmdJZDtcbiAgICB9KTtcbiAgICBpZiAoY2xhaW1JbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xhaW0gaWQgbm90IGZvdW5kIGluIGNsYWltcyBsaXN0Jyk7XG4gICAgfVxuICAgIC8vIGdldCBhbiBhcnJheSBvZiBhbGwgY2xhaW1zIHdpdGggbG93ZXIgaGVpZ2h0XG4gICAgbGV0IHBvc3NpYmxlTWF0Y2hlcyA9IGNsYWltc0FycmF5LnNsaWNlKDAsIGNsYWltSW5kZXgpO1xuICAgIC8vIHJlbW92ZSBjZXJ0aWZpY2F0ZXMgd2l0aCB0aGUgc2FtZSBwcmVmaXhlcyB1bnRpbCBub25lIGFyZSBsZWZ0LlxuICAgIHdoaWxlIChwb3NzaWJsZU1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2hvcnRJZExlbmd0aCArPSAxO1xuICAgICAgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCk7XG4gICAgICBwb3NzaWJsZU1hdGNoZXMgPSBwb3NzaWJsZU1hdGNoZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQuY2xhaW1JZCAmJiAoZWxlbWVudC5jbGFpbUlkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKSA9PT0gc2hvcnRJZCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzaG9ydElkO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBSZWR1Y2VycywgR0FMaXN0ZW5lciwgQXBwIH0gZnJvbSAnc3BlZS5jaC1jb21wb25lbnRzJztcbi8qXG4gIF4gbm90ZTogdG8gZG8gdGhpcyByaWdodCwgbWF5YmVcbiAgdGhlc2Ugc2hvdWxkIGJlIHBhc3NlZCBpbiBmcm9tIHRoZSBpbXBsZW1lbnRhdGlvbiAod3d3LnNwZWUuY2gpIGl0c2VsZixcbiAgc28gdGhhdCB0aGVyZSBhcmUgbm8gY29uZmxpY3RzIGJldHdlZW4gdGhlIFNTUiBoZXJlIGFuZFxuICB0aGUgYnVuZGxlIHNlbnQgdG8gdGhlIHNlcnZlcj9cbiAgdGhlcmUgbWlnaHQgYWxzbyBiZSBpc3N1ZXMgaWYgdGhpcyBwYWNrYWdlIHVzZXMgYSBkaWZmZXJlbnQgdmVyc2lvbiBvZiBzcGVlLmNoLWNvbXBvbmVudHMgdGhhbiB3d3cuc3BlZS5jaCBkb2VzP1xuKi9cbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlLmpzJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY29uc3Qgc2l0ZUNvbmZpZyA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjdXN0b21pemUgdGhlIHJlZHVjZXIgYnkgcGFzc2luZyBpbiBpbnRpYWwgc3RhdGUgY29uZmlnc1xuICBjb25zdCBDdXN0b21pemVkUmVkdWNlcnMgPSBSZWR1Y2VycyhzaXRlQ29uZmlnKTtcbiAgY29uc3QgQ3VzdG9taXplZEFwcCA9IEFwcChzaXRlQ29uZmlnKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShDdXN0b21pemVkUmVkdWNlcnMpO1xuXG4gIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgIDxDdXN0b21pemVkQXBwIC8+XG4gICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG5cbiAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgLy8gU29tZXdoZXJlIGEgYDxSZWRpcmVjdD5gIHdhcyByZW5kZXJlZFxuICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UncmUgZ29vZCwgc2VuZCB0aGUgcmVzcG9uc2VcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xuXG4gIGNvbnNvbGUubG9nKCdoZWxsbyBmcm9tIHNwZWUuY2ggaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNwZWUuY2gtY29tcG9uZW50c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNwZWUuY2gtY29tcG9uZW50c1wiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL2dlbmVyYWwuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvYnVuZGxlL2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICBgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZ2V0Q2xhaW1JZCwgZ2V0TG9jYWxGaWxlUmVjb3JkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnLi9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcbmNvbnN0IFNIT1cgPSAnU0hPVyc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxuZnVuY3Rpb24gY2xpZW50QWNjZXB0c0h0bWwgKHthY2NlcHR9KSB7XG4gIHJldHVybiBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdElzRnJvbUJyb3dzZXIgKGhlYWRlcnMpIHtcbiAgcmV0dXJuIGhlYWRlcnNbJ3VzZXItYWdlbnQnXSAmJiBoZWFkZXJzWyd1c2VyLWFnZW50J10ubWF0Y2goL01vemlsbGEvKTtcbn07XG5cbmZ1bmN0aW9uIGNsaWVudFdhbnRzQXNzZXQgKHthY2NlcHQsIHJhbmdlfSkge1xuICBjb25zdCBpbWFnZUlzV2FudGVkID0gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvaW1hZ2VcXC8uKi8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL1xcKi8pO1xuICBjb25zdCB2aWRlb0lzV2FudGVkID0gYWNjZXB0ICYmIHJhbmdlO1xuICByZXR1cm4gaW1hZ2VJc1dhbnRlZCB8fCB2aWRlb0lzV2FudGVkO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZENsYWltSWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuICgoY2xhaW1JZC5sZW5ndGggPT09IDQwKSAmJiAhL1teQS1aYS16MC05XS9nLnRlc3QoY2xhaW1JZCkpO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuIGNsYWltSWQubGVuZ3RoID09PSAxOyAgLy8gaXQgc2hvdWxkIHJlYWxseSBldmFsdWF0ZSB0aGUgc2hvcnQgdXJsIGl0c2VsZlxufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWRPckNsYWltSWQgKGlucHV0KSB7XG4gIHJldHVybiAoaXNWYWxpZENsYWltSWQoaW5wdXQpIHx8IGlzVmFsaWRTaG9ydElkKGlucHV0KSk7XG59O1xuXG5mdW5jdGlvbiBzZXJ2ZUFzc2V0VG9DbGllbnQgKGNsYWltSWQsIG5hbWUsIHJlcykge1xuICByZXR1cm4gZ2V0TG9jYWxGaWxlUmVjb3JkKGNsYWltSWQsIG5hbWUpXG4gICAgLnRoZW4oZmlsZVJlY29yZCA9PiB7XG4gICAgICAvLyBjaGVjayB0aGF0IGEgbG9jYWwgcmVjb3JkIHdhcyBmb3VuZFxuICAgICAgaWYgKGZpbGVSZWNvcmQgPT09IE5PX0ZJTEUpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMzA3KS5yZWRpcmVjdChgL2FwaS9jbGFpbS9nZXQvJHtuYW1lfS8ke2NsYWltSWR9YCk7XG4gICAgICB9XG4gICAgICAvLyBzZXJ2ZSB0aGUgZmlsZVxuICAgICAgY29uc3Qge2ZpbGVQYXRoLCBmaWxlVHlwZX0gPSBmaWxlUmVjb3JkO1xuICAgICAgbG9nZ2VyLnZlcmJvc2UoYHNlcnZpbmcgZmlsZTogJHtmaWxlUGF0aH1gKTtcbiAgICAgIGNvbnN0IHNlbmRGaWxlT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnICAgICAgICAgIDogZmlsZVR5cGUgfHwgJ2ltYWdlL2pwZWcnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kRmlsZShmaWxlUGF0aCwgc2VuZEZpbGVPcHRpb25zKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKSB7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oZnVsbENsYWltSWQgPT4ge1xuICAgICAgICBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9IGVsc2UgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNoYW5uZWwgaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmVBc3NldFRvQ2xpZW50KGZ1bGxDbGFpbUlkLCBjbGFpbU5hbWUsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnc3VjY2VzcycpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdmYWlsJyk7XG4gICAgICB9KTtcbiAgfSxcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIChoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlVHlwZTtcbiAgICBpZiAoaGFzRmlsZUV4dGVuc2lvbikge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7ICAvLyBhc3N1bWUgYSBzZXJ2ZSByZXF1ZXN0IGlmIGZpbGUgZXh0ZW5zaW9uIGlzIHByZXNlbnRcbiAgICAgIGlmIChjbGllbnRBY2NlcHRzSHRtbChoZWFkZXJzKSkgeyAgLy8gaWYgdGhlIHJlcXVlc3QgY29tZXMgZnJvbSBhIGJyb3dzZXIsIGNoYW5nZSBpdCB0byBhIHNob3cgcmVxdWVzdFxuICAgICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgaWYgKGNsaWVudFdhbnRzQXNzZXQoaGVhZGVycykgJiYgcmVxdWVzdElzRnJvbUJyb3dzZXIoaGVhZGVycykpIHsgIC8vIHRoaXMgaXMgaW4gY2FzZSBzb21lb25lIGVtYmVkcyBhIHNob3cgdXJsXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnU2hvdyByZXF1ZXN0IGNhbWUgZnJvbSBicm93c2VyIGJ1dCB3YW50cyBhbiBpbWFnZS92aWRlby4gQ2hhbmdpbmcgcmVzcG9uc2UgdG8gc2VydmUuLi4nKTtcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZVR5cGU7XG4gIH0sXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkgKGlkZW50aWZpZXIsIG5hbWUpIHtcbiAgICAvLyB0aGlzIGlzIGEgcGF0Y2ggZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5IHdpdGggJy9uYW1lL2NsYWltX2lkJyB1cmwgZm9ybWF0XG4gICAgaWYgKGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKG5hbWUpICYmICFpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChpZGVudGlmaWVyKSkge1xuICAgICAgY29uc3QgdGVtcE5hbWUgPSBuYW1lO1xuICAgICAgbmFtZSA9IGlkZW50aWZpZXI7XG4gICAgICBpZGVudGlmaWVyID0gdGVtcE5hbWU7XG4gICAgfVxuICAgIHJldHVybiBbaWRlbnRpZmllciwgbmFtZV07XG4gIH0sXG4gIGxvZ1JlcXVlc3REYXRhIChyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3Jlc3BvbnNlVHlwZSA9PT0nLCByZXNwb25zZVR5cGUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gbmFtZSA9PT0gJywgY2xhaW1OYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgbmFtZSA9PT0nLCBjaGFubmVsTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBpZCA9PT0nLCBjbGFpbUlkKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgaWRlbnRpZmllcjonLCBpZGVudGlmaWVyKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7dmFsdWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgdXJsLiAgTm8gY2hhbm5lbCBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgaXNDaGFubmVsID0gdmFsdWUuc3RhcnRzV2l0aChtb2R1bGUuZXhwb3J0cy5DSEFOTkVMX0NIQVIpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gaXNDaGFubmVsID8gdmFsdWUgOiBudWxsO1xuICAgIGxldCBjbGFpbUlkO1xuICAgIGlmIChpc0NoYW5uZWwpIHtcbiAgICAgIGlmICghY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsIG5hbWUgYWZ0ZXIgQC4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjaGFubmVsTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCk7XG4gICAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYWltSWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBjaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbUlkLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBuYW1lOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghY2xhaW1OYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIC4nKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNsYWltTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0xBSU0pO1xuICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciAke21vZGlmaWVyU2VwZXJhdG9yfS5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7bW9kaWZpZXJTZXBlcmF0b3J9IG1vZGlmaWVyIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWVgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgY2xhaW1OYW1lLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlTW9kaWZpZXI6IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBtb2RpZmllcjonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uID0gZmFsc2U7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24sXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgUmVkdWNlcnMsIEdBTGlzdGVuZXIsIEFwcCwgU2FnYXMsIEFjdGlvbnMgfSBmcm9tICdzcGVlLmNoLWNvbXBvbmVudHMnO1xuLypcbiAgXiBub3RlOiB0byBkbyB0aGlzIHJpZ2h0LCBtYXliZVxuICB0aGVzZSBzaG91bGQgYmUgcGFzc2VkIGluIGZyb20gdGhlIGltcGxlbWVudGF0aW9uICh3d3cuc3BlZS5jaCkgaXRzZWxmLFxuICBzbyB0aGF0IHRoZXJlIGFyZSBubyBjb25mbGljdHMgYmV0d2VlbiB0aGUgU1NSIGhlcmUgYW5kXG4gIHRoZSBidW5kbGUgc2VudCB0byB0aGUgc2VydmVyP1xuICB0aGVyZSBtaWdodCBhbHNvIGJlIGlzc3VlcyBpZiB0aGlzIHBhY2thZ2UgdXNlcyBhIGRpZmZlcmVudCB2ZXJzaW9uIG9mIHNwZWUuY2gtY29tcG9uZW50cyB0aGFuIHd3dy5zcGVlLmNoIGRvZXM/XG4qL1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG4vLyBjb25maWd1cmUgdGhlIHJlZHVjZXJzIGJ5IHBhc3NpbmcgaW5pdGlhbCBzdGF0ZSBjb25maWdzXG5jb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgQ3VzdG9taXplZFJlZHVjZXJzID0gUmVkdWNlcnMoc2l0ZUNvbmZpZyk7XG5jb25zdCBDdXN0b21pemVkQXBwID0gQXBwKHNpdGVDb25maWcpO1xuXG5jb25zdCByZXR1cm5TYWdhV2l0aFBhcmFtcyA9IChzYWdhLCBwYXJhbXMpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uICogKCkge1xuICAgIHlpZWxkIGNhbGwoc2FnYSwgcGFyYW1zKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3JlYXRlIGFuZCBhcHBseSBtaWRkbGV3YXJlXG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgY29uc3QgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZShzYWdhTWlkZGxld2FyZSk7XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoQ3VzdG9taXplZFJlZHVjZXJzLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBBY3Rpb25zLm9uSGFuZGxlU2hvd1BhZ2VVcmkocmVxLnBhcmFtcyk7XG4gIGNvbnN0IHNhZ2EgPSByZXR1cm5TYWdhV2l0aFBhcmFtcyhTYWdhcy5oYW5kbGVTaG93UGFnZVVyaSwgYWN0aW9uKTtcblxuICAvLyBydW4gdGhlIHNhZ2EgbWlkZGxld2FyZVxuICBzYWdhTWlkZGxld2FyZVxuICAgIC5ydW4oc2FnYSlcbiAgICAuZG9uZVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICAgICAgPEN1c3RvbWl6ZWRBcHAgLz5cbiAgICAgICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICB9KTtcblxuICBjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBzcGVlLmNoIGhhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoYXR3Zy1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuL3NlcnZlcicpO1xuXG5jb25zdCBleHBvcnRzID0ge1xuICBTZXJ2ZXIsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcGVlY2guanMiLCIvLyBhcHAgZGVwZW5kZW5jaWVzXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCBleHByZXNzSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2V4cHJlc3MtaGFuZGxlYmFycycpO1xuY29uc3QgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hhbmRsZWJhcnMnKTtcbmNvbnN0IGhlbG1ldCA9IHJlcXVpcmUoJ2hlbG1ldCcpO1xuY29uc3QgY29va2llU2Vzc2lvbiA9IHJlcXVpcmUoJ2Nvb2tpZS1zZXNzaW9uJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgcmVxdWVzdExvZ2dlciA9IHJlcXVpcmUoJ21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcycpO1xuY29uc3QgUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGxvZ2dlckNvbmZpZyA9IHJlcXVpcmUoJ2xvZ2dlckNvbmZpZy5qcycpO1xuY29uc3QgbXlzcWxDb25maWcgPSByZXF1aXJlKCdteXNxbENvbmZpZy5qcycpO1xuY29uc3Qgc2l0ZUNvbmZpZyA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcbmNvbnN0IHNsYWNrQ29uZmlnID0gcmVxdWlyZSgnc2xhY2tDb25maWcuanMnKTtcblxuZnVuY3Rpb24gU2VydmVyICgpIHtcbiAgdGhpcy5jb25maWd1cmVMb2dnZXIgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIGxvZ2dlckNvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlTXlzcWwgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIG15c3FsQ29uZmlnLnVwZGF0ZSh1c2VyQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTaXRlRGV0YWlscyA9ICh1c2VyQ29uZmlnKSA9PiB7XG4gICAgc2l0ZUNvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2xhY2sgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNsYWNrQ29uZmlnLnVwZGF0ZSh1c2VyQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVDbGllbnRCdW5kbGUgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdjb25maWd1cmUgdGhlIGNsaWVudCBoZXJlIGJ5IHBhc3NpbmcgaW4gdGhlIGJ1bmRsZSBhbmQgY29uZmlndXJpbmcgaXQsIG9yIGJldHRlciB5ZXQ6IHRha2luZyBpbiB0aGUgY29tcG9uZW50cyB0byB1c2UgZHluYW1pY2FsbHkgZnJvbSBoZXJlLicpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZU1vZGVscyA9ICgpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2hlcmUgaXMgd2hlcmUgeW91IGNvdWxkIGFkZC9vdmVyd3JpdGUgdGhlIGRlZmF1bHQgbW9kZWxzJylcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVSb3V0ZXMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdoZXJlIGlzIHdoZXJlIHlvdSBjb3VsZCBhZGQvb3ZlcndyaXRlIHRoZSBkZWZhdWx0IHJvdXRlcycpXG4gIH07XG4gIHRoaXMuY3JlYXRlQXBwID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBhbiBFeHByZXNzIGFwcGxpY2F0aW9uXG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gICAgLy8gdHJ1c3QgdGhlIHByb3h5IHRvIGdldCBpcCBhZGRyZXNzIGZvciB1c1xuICAgIGFwcC5lbmFibGUoJ3RydXN0IHByb3h5Jyk7XG5cbiAgICAvKiBhZGQgbWlkZGxld2FyZSAqL1xuICAgIC8vIHNldCBIVFRQIGhlYWRlcnMgdG8gcHJvdGVjdCBhZ2FpbnN0IHdlbGwta25vd24gd2ViIHZ1bG5lcmFiaWx0aWVzXG4gICAgYXBwLnVzZShoZWxtZXQoKSk7XG4gICAgLy8gJ2V4cHJlc3Muc3RhdGljJyB0byBzZXJ2ZSBzdGF0aWMgZmlsZXMgZnJvbSBwdWJsaWMgZGlyZWN0b3J5XG4gICAgaWYgKHNpdGVDb25maWcucm91dGVzLnB1YmxpY0ZvbGRlcikge1xuICAgICAgLy8gdGFrZSBpbiBhIGRpZmZlcmVudCBwdWJsaWMgZm9sZGVyLCBzbyBpdCBjYW4gc2VydmUgaXQncyBvd24gYnVuZGxlIGlmIG5lZWRlZFxuICAgICAgY29uc3QgcHVibGljRm9sZGVyID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHNpdGVDb25maWcucm91dGVzLnB1YmxpY0ZvbGRlcik7XG4gICAgICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKHB1YmxpY0ZvbGRlcikpO1xuICAgICAgbG9nZ2VyLmluZm8oJ3NlcnZpbmcgc3RhdGljIGZpbGVzIGZyb20gY3VzdG9tIHBhdGg6JywgcHVibGljRm9sZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHVibGljUGF0aCA9IFBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKTtcbiAgICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocHVibGljUGF0aCkpO1xuICAgICAgbG9nZ2VyLmluZm8oJ3NlcnZpbmcgc3RhdGljIGZpbGVzIGZyb20gZGVmYXVsdCBwYXRoOicsIHB1YmxpY1BhdGgpO1xuICAgIH07XG4gICAgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi9qc29uXG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gICAgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcblxuICAgIC8vIGFkZCBjdXN0b20gbWlkZGxld2FyZSAobm90ZTogYnVpbGQgb3V0IHRvIGFjY2VwdCBkeW5hbWljYWxseSB1c2Ugd2hhdCBpcyBpbiBzZXJ2ZXIvbWlkZGxld2FyZS9cbiAgICBhcHAudXNlKHJlcXVlc3RMb2dnZXIpO1xuXG4gICAgLy8gY29uZmlndXJlIHBhc3Nwb3J0XG4gICAgY29uc3Qgc3BlZWNoUGFzc3BvcnQgPSByZXF1aXJlKCdzcGVlY2hQYXNzcG9ydCcpO1xuICAgIC8vIGluaXRpYWxpemUgcGFzc3BvcnRcbiAgICBjb25zdCBzZXNzaW9uS2V5ID0gc2l0ZUNvbmZpZy5hdXRoLnNlc3Npb25LZXk7XG4gICAgYXBwLnVzZShjb29raWVTZXNzaW9uKHtcbiAgICAgIG5hbWUgIDogJ3Nlc3Npb24nLFxuICAgICAga2V5cyAgOiBbc2Vzc2lvbktleV0sXG4gICAgICBtYXhBZ2U6IDI0ICogNjAgKiA2MCAqIDEwMDAsIC8vIGkuZS4gMjQgaG91cnNcbiAgICB9KSk7XG4gICAgYXBwLnVzZShzcGVlY2hQYXNzcG9ydC5pbml0aWFsaXplKCkpO1xuICAgIGFwcC51c2Uoc3BlZWNoUGFzc3BvcnQuc2Vzc2lvbigpKTtcblxuICAgIC8vIGNvbmZpZ3VyZSBoYW5kbGViYXJzICYgcmVnaXN0ZXIgaXQgd2l0aCBleHByZXNzIGFwcFxuICAgIGNvbnN0IGhicyA9IGV4cHJlc3NIYW5kbGViYXJzLmNyZWF0ZSh7XG4gICAgICBkZWZhdWx0TGF5b3V0OiAnZW1iZWQnLFxuICAgICAgaGFuZGxlYmFycyAgIDogSGFuZGxlYmFycyxcbiAgICB9KTtcbiAgICBhcHAuZW5naW5lKCdoYW5kbGViYXJzJywgaGJzLmVuZ2luZSk7XG4gICAgYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaGFuZGxlYmFycycpO1xuXG4gICAgLy8gc2V0IHRoZSByb3V0ZXMgb24gdGhlIGFwcFxuICAgIHJlcXVpcmUoJy4vcm91dGVzL2F1dGgvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hcGkvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9wYWdlcy8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2Fzc2V0cy8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2ZhbGxiYWNrLycpKGFwcCk7XG5cbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfTtcbiAgdGhpcy5pbml0aWFsaXplID0gKCkgPT4ge1xuICAgIHRoaXMuY3JlYXRlQXBwKCk7XG4gICAgdGhpcy5zZXJ2ZXIgPSBodHRwLlNlcnZlcih0aGlzLmFwcCk7XG4gIH07XG4gIHRoaXMuc3RhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcbiAgICBjb25zdCBQT1JUID0gc2l0ZUNvbmZpZy5kZXRhaWxzLnBvcnQ7XG4gICAgLy8gc3luYyBzZXF1ZWxpemVcbiAgICBkYi5zZXF1ZWxpemUuc3luYygpXG4gICAgLy8gc3RhcnQgdGhlIHNlcnZlclxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNlcnZlci5saXN0ZW4oUE9SVCwgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uIFBPUlQgJHtQT1JUfWApO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgU3RhcnR1cCBFcnJvcjpgLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VydmVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzLWhhbmRsZWJhcnNcIlxuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGFuZGxlYmFyc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhhbmRsZWJhcnNcIlxuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1zZXNzaW9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXNlc3Npb25cIlxuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImh0dHBcIlxuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5jb25zdCByZXF1ZXN0TG9nZ2VyID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7ICAvLyBjdXN0b20gbG9nZ2luZyBtaWRkbGV3YXJlIHRvIGxvZyBhbGwgaW5jb21pbmcgaHR0cCByZXF1ZXN0c1xuICBsb2dnZXIudmVyYm9zZShgUmVxdWVzdCBvbiAke3JlcS5vcmlnaW5hbFVybH0gZnJvbSAke3JlcS5pcH1gKTtcbiAgbmV4dCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1ZXN0TG9nZ2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gTG9nZ2VyQ29uZmlnICgpIHtcbiAgdGhpcy5sb2dMZXZlbCA9ICdkZWJ1Zyc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ05vIGxvZ2dlciBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGxvZ2dlci5pbmZvKCdjb25maWd1cmluZyB3aW5zdG9uIGxvZ2dlci4uLicpO1xuICAgIC8vIHVwZGF0ZSB2YWx1ZXMgd2l0aCBsb2NhbCBjb25maWcgcGFyYW1zXG4gICAgY29uc3Qge2xvZ0xldmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLmxvZ0xldmVsID0gbG9nTGV2ZWw7XG4gICAgLy8gY29uZmlndXJlIHRoZSB3aW5zdG9uIGxvZ2dlclxuICAgIGxvZ2dlci5jb25maWd1cmUoe1xuICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICBuZXcgKGxvZ2dlci50cmFuc3BvcnRzLkNvbnNvbGUpKHtcbiAgICAgICAgICBsZXZlbCAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmxvZ0xldmVsLFxuICAgICAgICAgIHRpbWVzdGFtcCAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgIGNvbG9yaXplICAgICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgcHJldHR5UHJpbnQgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBoYW5kbGVFeGNlcHRpb25zICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb246IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KTtcbiAgICAvLyB0ZXN0IGFsbCB0aGUgbG9nIGxldmVsc1xuICAgIGxvZ2dlci5pbmZvKCd0ZXN0aW5nIHdpbnN0b24gbG9nIGxldmVscy4uLicpO1xuICAgIGxvZ2dlci5lcnJvcignTGV2ZWwgMCcpO1xuICAgIGxvZ2dlci53YXJuKCdMZXZlbCAxJyk7XG4gICAgbG9nZ2VyLmluZm8oJ0xldmVsIDInKTtcbiAgICBsb2dnZXIudmVyYm9zZSgnTGV2ZWwgMycpO1xuICAgIGxvZ2dlci5kZWJ1ZygnTGV2ZWwgNCcpO1xuICAgIGxvZ2dlci5zaWxseSgnTGV2ZWwgNScpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTG9nZ2VyQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwiY29uc3Qgd2luc3RvblNsYWNrV2ViSG9vayA9IHJlcXVpcmUoJ3dpbnN0b24tc2xhY2std2ViaG9vaycpLlNsYWNrV2ViSG9vaztcbmNvbnN0IHdpbnN0b24gPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIFNsYWNrQ29uZmlnICgpIHtcbiAgdGhpcy5zbGFja1dlYkhvb2sgICAgICA9ICdkZWZhdWx0JztcbiAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9ICdkZWZhdWx0JztcbiAgdGhpcy5zbGFja0luZm9DaGFubmVsICA9ICdkZWZhdWx0JztcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiB3aW5zdG9uLndhcm4oJ05vIHNsYWNrIGNvbmZpZyByZWNlaXZlZCcpO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgdmFyaWFibGVzXG4gICAgd2luc3Rvbi5pbmZvKCdjb25maWd1cmluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICBjb25zdCB7c2xhY2tXZWJIb29rLCBzbGFja0Vycm9yQ2hhbm5lbCwgc2xhY2tJbmZvQ2hhbm5lbH0gPSBjb25maWc7XG4gICAgdGhpcy5zbGFja1dlYkhvb2sgPSBzbGFja1dlYkhvb2s7XG4gICAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9IHNsYWNrRXJyb3JDaGFubmVsO1xuICAgIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCA9IHNsYWNrSW5mb0NoYW5uZWw7XG4gICAgLy8gdXBkYXRlIHNsYWNrIHdlYmhvb2sgc2V0dGluZ3NcbiAgICBpZiAodGhpcy5zbGFja1dlYkhvb2spIHtcbiAgICAgIC8vIGFkZCBhIHRyYW5zcG9ydCBmb3IgZXJyb3JzIHRvIHNsYWNrXG4gICAgICBpZiAodGhpcy5zbGFja0Vycm9yQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICd3YXJuJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrRXJyb3JDaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOmZhY2Vfd2l0aF9oZWFkX2JhbmRhZ2U6JyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgaWYgKHNsYWNrSW5mb0NoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ2luZm8nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpuZXJkX2ZhY2U6JyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgLy8gc2VuZCB0ZXN0IG1lc3NhZ2VzXG4gICAgICB3aW5zdG9uLmluZm8oJ3Rlc3Rpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgICB3aW5zdG9uLmVycm9yKCdTbGFjayBcImVycm9yXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgICB3aW5zdG9uLmluZm8oJ1NsYWNrIFwiaW5mb1wiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5zdG9uLndhcm4oJ1NsYWNrIGxvZ2dpbmcgaXMgbm90IGVuYWJsZWQgYmVjYXVzZSBubyBzbGFja1dlYkhvb2sgY29uZmlnIHZhciBwcm92aWRlZC4nKTtcbiAgICB9XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTbGFja0NvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NsYWNrQ29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCJcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnRcIlxuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbmNvbnN0IHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyA9ICh1c2VySW5zdGFuY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICB1c2VySW5mb1snaWQnXSA9IHVzZXJJbnN0YW5jZS5pZDtcbiAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IHVzZXJJbnN0YW5jZS51c2VyTmFtZTtcbiAgICB1c2VySW5zdGFuY2VcbiAgICAgIC5nZXRDaGFubmVsKClcbiAgICAgIC50aGVuKCh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSkgPT4ge1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChjaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIHJldHVybiBkYi5Vc2VyXG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7dXNlck5hbWU6IHVzZXJuYW1lfSxcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZChwYXNzd29yZClcbiAgICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1Bhc3N3b3JkIHdhcyBhIG1hdGNoLCByZXR1cm5pbmcgVXNlcicpO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyh1c2VyKVxuICAgICAgICAgICAgICAudGhlbih1c2VySW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9LFxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDZXJ0aWZpY2F0ZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NlcnRpZmljYXRlJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAga2V5VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHVibGljS2V5OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENlcnRpZmljYXRlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDZXJ0aWZpY2F0ZS5iZWxvbmdzVG8oZGIuQ2hhbm5lbCwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobG9uZ0NoYW5uZWxJZCwgY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgJHtjaGFubmVsTmFtZX06JHtsb25nQ2hhbm5lbElkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge25hbWU6IGNoYW5uZWxOYW1lfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsKHMpIGZvdW5kIHdpdGggdGhhdCBjaGFubmVsIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBsb25nQ2hhbm5lbElkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7Y2hhbm5lbENsYWltSWR9JWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSgke2NoYW5uZWxOYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2hhbm5lbE5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUudmFsaWRhdGVMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYHZhbGlkYXRlTG9uZ0NoYW5uZWxJZCgke25hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgJiYgKGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ2xhaW1JZCAmJiBjaGFubmVsQ2xhaW1JZC5sZW5ndGggPCA0MCkgeyAgLy8gaWYgYSBzaG9ydCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoY2hhbm5lbE5hbWUpOyAgLy8gaWYgbm8gY2hhbm5lbCBpZCBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQ2VydGlmaWNhdGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBDaGFubmVsID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2hhbm5lbCcsXG4gICAge1xuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDaGFubmVsLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDaGFubmVsLmJlbG9uZ3NUbyhkYi5Vc2VyKTtcbiAgICBDaGFubmVsLmhhc09uZShkYi5DZXJ0aWZpY2F0ZSk7XG4gIH07XG5cbiAgcmV0dXJuIENoYW5uZWw7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcbmNvbnN0IHsgYXNzZXREZWZhdWx0czogeyB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlKSB7XG4gIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgcmV0dXJuICdqcGVnJztcbiAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgcmV0dXJuICdwbmcnO1xuICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICByZXR1cm4gJ2dpZic7XG4gICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgIHJldHVybiAnbXA0JztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmRlYnVnKCdzZXR0aW5nIHVua25vd24gZmlsZSB0eXBlIGFzIGZpbGUgZXh0ZW5zaW9uIGpwZWcnKTtcbiAgICAgIHJldHVybiAnanBlZyc7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRldGVybWluZVRodW1ibmFpbCAoc3RvcmVkVGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKSB7XG4gIGlmIChzdG9yZWRUaHVtYm5haWwgPT09ICcnKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRUaHVtYm5haWw7XG4gIH1cbiAgcmV0dXJuIHN0b3JlZFRodW1ibmFpbDtcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFpbURhdGEgKGNsYWltKSB7XG4gIC8vIGxvZ2dlci5kZWJ1ZygncHJlcGFyaW5nIGNsYWltIGRhdGEgYmFzZWQgb24gcmVzb2x2ZWQgZGF0YTonLCBjbGFpbSk7XG4gIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gIGNsYWltWydob3N0J10gPSBob3N0O1xuICByZXR1cm4gY2xhaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2xhaW0gPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDbGFpbScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVJZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2VVcmw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBtZXRhZGF0YVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNvbnRlbnRUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2xhaW0uYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENsYWltLmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIGZvciAke2NsYWltTmFtZX0jJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbShzKSBmb3VuZCB3aXRoIHRoYXQgY2xhaW0gbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgY2xhaW1JZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zIGZvciAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICAgIHJhdyAgOiB0cnVlLCAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiBvbmx5IGRhdGEsIG5vdCBhbiBhcnJheSBvZiBpbnN0YW5jZXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbENsYWltc0FycmF5ID0+IHtcbiAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ2NoYW5uZWxjbGFpbXNhcnJheSBsZW5ndGg6JywgY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgY2hhbm5lbENsYWltc0FycmF5LmZvckVhY2goY2xhaW0gPT4ge1xuICAgICAgICAgICAgICAgIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgICAgICAgICAgICAgICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhaW07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShjaGFubmVsQ2xhaW1zQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGZpbmRpbmcgY2xhaW0gaWQgZm9yIGNsYWltICR7Y2xhaW1OYW1lfSBmcm9tIGNoYW5uZWwgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lLCBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydpZCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYCR7cmVzdWx0Lmxlbmd0aH0gcmVjb3JkcyBmb3VuZCBmb3IgXCIke2NsYWltTmFtZX1cIiBpbiBjaGFubmVsIFwiJHtjaGFubmVsQ2xhaW1JZH1cImApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBzaG9ydElkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7c2hvcnRJZH0lYCxcbiAgICAgICAgICAgIH19LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSwgIC8vIG5vdGU6IG1heWJlIGhlaWdodCBhbmQgZWZmZWN0aXZlIGFtb3VudCBuZWVkIHRvIHN3aXRjaD9cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2xlbmd0aCBvZiByZXN1bHQnLCByZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uZGF0YVZhbHVlcy5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0udmFsaWRhdGVMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2xhaW1JZCgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgaWYgKGNsYWltSWQgJiYgKGNsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2xhaW1JZCAmJiBjbGFpbUlkLmxlbmd0aCA8IDQwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTsgIC8vIGlmIGEgc2hvcnQgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZShjbGFpbU5hbWUpOyAgLy8gaWYgbm8gY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgQ2xhaW0ucmVzb2x2ZUNsYWltID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLnJlc29sdmVDbGFpbTogJHtuYW1lfSAke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2xhaW1BcnJheSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjbGFpbUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgbW9yZSB0aGFuIG9uZSByZWNvcmQgbWF0Y2hlcyAke25hbWV9IyR7Y2xhaW1JZH0gaW4gZGIuQ2xhaW1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIENsYWltO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSIH0pID0+IHtcbiAgY29uc3QgRmlsZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0ZpbGUnLFxuICAgIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgICA6IElOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHQgIDogMCxcbiAgICAgIH0sXG4gICAgICBmaWxlTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlUGF0aDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlVHlwZToge1xuICAgICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdHJlbmRpbmdFbGlnaWJsZToge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIEZpbGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIEZpbGUuaGFzTWFueShkYi5SZXF1ZXN0KTtcbiAgICBGaWxlLmhhc09uZShkYi5DbGFpbSk7XG4gIH07XG5cbiAgRmlsZS5nZXRSZWNlbnRDbGFpbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7XG4gICAgICB3aGVyZTogeyBuc2Z3OiBmYWxzZSwgdHJlbmRpbmdFbGlnaWJsZTogdHJ1ZSB9LFxuICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgbGltaXQ6IDI1LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBGaWxlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIFRFWFQgfSkgPT4ge1xuICBjb25zdCBSZXF1ZXN0ID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnUmVxdWVzdCcsXG4gICAge1xuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpcEFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgUmVxdWVzdC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgUmVxdWVzdC5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSZXF1ZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgVXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1VzZXInLFxuICAgIHtcbiAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgVXNlci5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgVXNlci5oYXNPbmUoZGIuQ2hhbm5lbCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY29tcGFyZVBhc3N3b3JkID0gZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChuZXdQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKG5ld1Bhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGN1cnJlbnQgcGFzc3dvcmQgd2l0aCB0aGUgbmV3IGhhc2hcbiAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAudXBkYXRlKHtwYXNzd29yZDogaGFzaH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gcHJlLXNhdmUgaG9vayBtZXRob2QgdG8gaGFzaCB0aGUgdXNlcidzIHBhc3N3b3JkIGJlZm9yZSB0aGUgdXNlcidzIGluZm8gaXMgc2F2ZWQgdG8gdGhlIGRiLlxuICBVc2VyLmhvb2soJ2JlZm9yZUNyZWF0ZScsICh1c2VyLCBvcHRpb25zKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdVc2VyLmJlZm9yZUNyZWF0ZSBob29rLi4uJyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBwYXNzd29yZCBzdHJpbmcgd2l0aCB0aGUgaGFzaCBwYXNzd29yZCB2YWx1ZVxuICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBoYXNoO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFVzZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy91c2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmNyeXB0XCJcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImF4aW9zXCJcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxicnlDb25maWcgPSB7XG4gIGFwaToge1xuICAgIGFwaUhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgIGFwaVBvcnQ6ICc1Mjc5JyxcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbGJyeUNvbmZpZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5pdmVyc2FsLWFuYWx5dGljc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIlxuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlcmlhbGl6ZVNwZWVjaFVzZXIgKHVzZXIsIGRvbmUpIHsgIC8vIHJldHVybnMgdXNlciBkYXRhIHRvIGJlIHNlcmlhbGl6ZWQgaW50byBzZXNzaW9uXG4gICAgY29uc29sZS5sb2coJ3NlcmlhbGl6aW5nIHVzZXInKTtcbiAgICBkb25lKG51bGwsIHVzZXIpO1xuICB9LFxuICBkZXNlcmlhbGl6ZVNwZWVjaFVzZXIgKHVzZXIsIGRvbmUpIHsgIC8vIGRlc2VyaWFsaXplcyBzZXNzaW9uIGFuZCBwb3B1bGF0ZXMgYWRkaXRpb25hbCBpbmZvIHRvIHJlcS51c2VyXG4gICAgY29uc29sZS5sb2coJ2Rlc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMiLCJjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG5jb25zdCBoYW5kbGVTaWdudXBSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zaWdudXAnKTtcbmNvbnN0IGhhbmRsZUxvZ2luUmVxdWVzdCA9IHJlcXVpcmUoJy4vbG9naW4nKTtcbmNvbnN0IGhhbmRsZUxvZ291dFJlcXVlc3QgPSByZXF1aXJlKCcuL2xvZ291dCcpO1xuY29uc3QgaGFuZGxlVXNlclJlcXVlc3QgPSByZXF1aXJlKCcuL3VzZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIGFwcC5wb3N0KCcvc2lnbnVwJywgc3BlZWNoUGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1zaWdudXAnKSwgaGFuZGxlU2lnbnVwUmVxdWVzdCk7XG4gIGFwcC5wb3N0KCcvbG9naW4nLCBoYW5kbGVMb2dpblJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbG9nb3V0JywgaGFuZGxlTG9nb3V0UmVxdWVzdCk7XG4gIGFwcC5nZXQoJy91c2VyJywgaGFuZGxlVXNlclJlcXVlc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9pbmRleC5qcyIsImNvbnN0IHNpZ251cCA9IChyZXEsIHJlcykgPT4ge1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgc3VjY2VzcyAgICAgICA6IHRydWUsXG4gICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICBzaG9ydENoYW5uZWxJZDogcmVxLnVzZXIuc2hvcnRDaGFubmVsSWQsXG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaWdudXA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvc2lnbnVwLmpzIiwiY29uc3Qgc3BlZWNoUGFzc3BvcnQgPSByZXF1aXJlKCdzcGVlY2hQYXNzcG9ydCcpO1xuXG5jb25zdCBsb2dpbiA9IChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBzcGVlY2hQYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLWxvZ2luJywgKGVyciwgdXNlciwgaW5mbykgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgfVxuICAgIGlmICghdXNlcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IGluZm8ubWVzc2FnZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXEubG9nSW4odXNlciwgKGVycikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzcyAgICAgICA6IHRydWUsXG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgICBzaG9ydENoYW5uZWxJZDogcmVxLnVzZXIuc2hvcnRDaGFubmVsSWQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSkocmVxLCByZXMsIG5leHQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2dpbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dpbi5qcyIsImNvbnN0IGxvZ291dCA9IChyZXEsIHJlcykgPT4ge1xuICByZXEubG9nb3V0KCk7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiAneW91IHN1Y2Nlc3NmdWxseSBsb2dnZWQgb3V0J30pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2dvdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9nb3V0LmpzIiwiY29uc3QgdXNlciA9IChyZXEsIHJlcykgPT4ge1xuICBpZiAocmVxLnVzZXIpIHtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLnVzZXJ9KTtcbiAgfSBlbHNlIHtcbiAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICd1c2VyIGlzIG5vdCBsb2dnZWQgaW4nfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdXNlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC91c2VyLmpzIiwiY29uc3QgY2hhbm5lbEF2YWlsYWJpbGl0eSA9IHJlcXVpcmUoJy4vY2hhbm5lbEF2YWlsYWJpbGl0eScpO1xuY29uc3QgY2hhbm5lbENsYWltcyA9IHJlcXVpcmUoJy4vY2hhbm5lbENsYWltcycpO1xuY29uc3QgY2hhbm5lbERhdGEgPSByZXF1aXJlKCcuL2NoYW5uZWxEYXRhJyk7XG5jb25zdCBjaGFubmVsU2hvcnRJZCA9IHJlcXVpcmUoJy4vY2hhbm5lbFNob3J0SWQnKTtcbmNvbnN0IGNsYWltQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9jbGFpbUF2YWlsYWJpbGl0eScpO1xuY29uc3QgY2xhaW1EYXRhID0gcmVxdWlyZSgnLi9jbGFpbURhdGEnKTtcbmNvbnN0IGNsYWltR2V0ID0gcmVxdWlyZSgnLi9jbGFpbUdldCcpO1xuY29uc3QgY2xhaW1Mb25nSWQgPSByZXF1aXJlKCcuL2NsYWltTG9uZ0lkJyk7XG5jb25zdCBjbGFpbVB1Ymxpc2ggPSByZXF1aXJlKCcuL2NsYWltUHVibGlzaCcpO1xuY29uc3QgY2xhaW1SZXNvbHZlID0gcmVxdWlyZSgnLi9jbGFpbVJlc29sdmUnKTtcbmNvbnN0IGNsYWltU2hvcnRJZCA9IHJlcXVpcmUoJy4vY2xhaW1TaG9ydElkJyk7XG5jb25zdCBjbGFpbUxpc3QgPSByZXF1aXJlKCcuL2NsYWltTGlzdCcpO1xuY29uc3QgZmlsZUF2YWlsYWJpbGl0eSA9IHJlcXVpcmUoJy4vZmlsZUF2YWlsYWJpbGl0eScpO1xuXG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gcmVxdWlyZSgnaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyBjaGFubmVsIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LzpuYW1lJywgY2hhbm5lbEF2YWlsYWJpbGl0eSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgY2hhbm5lbFNob3J0SWQpO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvZGF0YS86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkJywgY2hhbm5lbERhdGEpO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvY2xhaW1zLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQvOnBhZ2UnLCBjaGFubmVsQ2xhaW1zKTtcbiAgLy8gY2xhaW0gcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vbGlzdC86bmFtZScsIGNsYWltTGlzdCk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vZ2V0LzpuYW1lLzpjbGFpbUlkJywgY2xhaW1HZXQpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2F2YWlsYWJpbGl0eS86bmFtZScsIGNsYWltQXZhaWxhYmlsaXR5KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9yZXNvbHZlLzpuYW1lLzpjbGFpbUlkJywgY2xhaW1SZXNvbHZlKTtcbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vcHVibGlzaCcsIG11bHRpcGFydE1pZGRsZXdhcmUsIGNsYWltUHVibGlzaCk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsIGNsYWltU2hvcnRJZCk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL2xvbmctaWQnLCBjbGFpbUxvbmdJZCk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vZGF0YS86Y2xhaW1OYW1lLzpjbGFpbUlkJywgY2xhaW1EYXRhKTtcbiAgLy8gZmlsZSByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9maWxlL2F2YWlsYWJpbGl0eS86bmFtZS86Y2xhaW1JZCcsIGZpbGVBdmFpbGFiaWxpdHkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2luZGV4LmpzIiwiY29uc3QgeyBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHNpdGUgaGFzIHB1Ymxpc2hlZCB0byBhIGNoYW5uZWxcblxuKi9cblxuY29uc3QgY2hhbm5lbEF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkobmFtZSlcbiAgICAudGhlbihhdmFpbGFibGVOYW1lID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGF2YWlsYWJsZU5hbWUpO1xuICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsQXZhaWxhYmlsaXR5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbEF2YWlsYWJpbGl0eS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBnZXRDaGFubmVsQ2xhaW1zIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGFsbCBjbGFpbXMgZm9yIGNoYW5uZWxcblxuKi9cblxuY29uc3QgY2hhbm5lbENsYWltcyA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICBjb25zdCBwYWdlID0gcGFyYW1zLnBhZ2U7XG4gIGdldENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxDbGFpbXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQ2xhaW1zLmpzIiwiY29uc3QgQ0xBSU1TX1BFUl9QQUdFID0gMTI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjbGFpbXMsIHBhZ2UpIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxQYWdlcyhjbGFpbXMpO1xuICAgIGNvbnN0IHBhZ2luYXRpb25QYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0UGFnZUZyb21RdWVyeShwYWdlKTtcbiAgICBjb25zdCB2aWV3RGF0YSA9IHtcbiAgICAgIGNoYW5uZWxOYW1lICAgICAgIDogY2hhbm5lbE5hbWUsXG4gICAgICBsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltcyAgICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zKGNsYWltcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgcHJldmlvdXNQYWdlICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVQcmV2aW91c1BhZ2UocGFnaW5hdGlvblBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgICAgICAgOiBwYWdpbmF0aW9uUGFnZSxcbiAgICAgIG5leHRQYWdlICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lTmV4dFBhZ2UodG90YWxQYWdlcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgdG90YWxQYWdlcyAgICAgICAgOiB0b3RhbFBhZ2VzLFxuICAgICAgdG90YWxSZXN1bHRzICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbENsYWltcyhjbGFpbXMpLFxuICAgIH07XG4gICAgcmV0dXJuIHZpZXdEYXRhO1xuICB9LFxuICBnZXRQYWdlRnJvbVF1ZXJ5IChwYWdlKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH0sXG4gIGV4dHJhY3RQYWdlRnJvbUNsYWltcyAoY2xhaW1zLCBwYWdlTnVtYmVyKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiBbXTsgIC8vIGlmIG5vIGNsYWltcywgcmV0dXJuIHRoaXMgZGVmYXVsdFxuICAgIH1cbiAgICAvLyBsb2dnZXIuZGVidWcoJ2NsYWltcyBpcyBhcnJheT8nLCBBcnJheS5pc0FycmF5KGNsYWltcykpO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZyhgcGFnZU51bWJlciAke3BhZ2VOdW1iZXJ9IGlzIG51bWJlcj9gLCBOdW1iZXIuaXNJbnRlZ2VyKHBhZ2VOdW1iZXIpKTtcbiAgICBjb25zdCBjbGFpbVN0YXJ0SW5kZXggPSAocGFnZU51bWJlciAtIDEpICogQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IGNsYWltRW5kSW5kZXggPSBjbGFpbVN0YXJ0SW5kZXggKyBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgcGFnZU9mQ2xhaW1zID0gY2xhaW1zLnNsaWNlKGNsYWltU3RhcnRJbmRleCwgY2xhaW1FbmRJbmRleCk7XG4gICAgcmV0dXJuIHBhZ2VPZkNsYWltcztcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxQYWdlcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3RhbENsYWltcyA9IGNsYWltcy5sZW5ndGg7XG4gICAgICBpZiAodG90YWxDbGFpbXMgPCBDTEFJTVNfUEVSX1BBR0UpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBjb25zdCBmdWxsUGFnZXMgPSBNYXRoLmZsb29yKHRvdGFsQ2xhaW1zIC8gQ0xBSU1TX1BFUl9QQUdFKTtcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHRvdGFsQ2xhaW1zICUgQ0xBSU1TX1BFUl9QQUdFO1xuICAgICAgaWYgKHJlbWFpbmRlciA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnVsbFBhZ2VzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bGxQYWdlcyArIDE7XG4gICAgfVxuICB9LFxuICBkZXRlcm1pbmVQcmV2aW91c1BhZ2UgKGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlIC0gMTtcbiAgfSxcbiAgZGV0ZXJtaW5lTmV4dFBhZ2UgKHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlICsgMTtcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxDbGFpbXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGNsYWltcy5sZW5ndGg7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJjb25zdCB7IGdldENoYW5uZWxEYXRhIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGRhdGEgZm9yIGEgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsRGF0YSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICBnZXRDaGFubmVsRGF0YShjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIDApXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbERhdGE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsRGF0YS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG5yb3V0ZSB0byBnZXQgYSBzaG9ydCBjaGFubmVsIGlkIGZyb20gbG9uZyBjaGFubmVsIElkXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxTaG9ydElkUm91dGUgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNob3J0SWQpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbFNob3J0SWRSb3V0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxTaG9ydElkLmpzIiwiY29uc3QgeyBjbGFpbU5hbWVJc0F2YWlsYWJsZSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgdGhpcyBzaXRlIHB1Ymxpc2hlZCB0byBhIGNsYWltXG5cbiovXG5cbmNvbnN0IGNsYWltQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdCk7XG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltQXZhaWxhYmlsaXR5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1BdmFpbGFiaWxpdHkuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byByZXR1cm4gZGF0YSBmb3IgYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbURhdGEgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2xhaW1OYW1lID0gcGFyYW1zLmNsYWltTmFtZTtcbiAgbGV0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgaWYgKGNsYWltSWQgPT09ICdub25lJykgY2xhaW1JZCA9IG51bGw7XG4gIGRiLkNsYWltLnJlc29sdmVDbGFpbShjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4oY2xhaW1JbmZvID0+IHtcbiAgICAgIGlmICghY2xhaW1JbmZvKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBjbGFpbSBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBjbGFpbUluZm99KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltRGF0YTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsImNvbnN0IHsgZ2V0Q2xhaW0gfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSwgY3JlYXRlRmlsZURhdGEgfSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIGNsYWltXG5cbiovXG5cbmNvbnN0IGNsYWltR2V0ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAvLyByZXNvbHZlIHRoZSBjbGFpbVxuICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0obmFtZSwgY2xhaW1JZClcbiAgICAudGhlbihyZXNvbHZlUmVzdWx0ID0+IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSBhIGNsYWltIGFjdHVhbGx5IGV4aXN0cyBhdCB0aGF0IHVyaVxuICAgICAgaWYgKCFyZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWF0Y2hpbmcgdXJpIGZvdW5kIGluIENsYWltIHRhYmxlJyk7XG4gICAgICB9XG4gICAgICBsZXQgZmlsZURhdGEgPSBjcmVhdGVGaWxlRGF0YShyZXNvbHZlUmVzdWx0KTtcbiAgICAgIC8vIGdldCB0aGUgY2xhaW1cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZURhdGEsIGdldENsYWltKGAke25hbWV9IyR7Y2xhaW1JZH1gKV0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFsgZmlsZURhdGEsIGdldFJlc3VsdCBdKSA9PiB7XG4gICAgICBmaWxlRGF0YSA9IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhKGZpbGVEYXRhLCBnZXRSZXN1bHQpO1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZURhdGEsIHtuYW1lLCBjbGFpbUlkfSwgJ0ZpbGUnKSwgZ2V0UmVzdWx0XSk7XG4gICAgfSlcbiAgICAudGhlbigoWyBmaWxlUmVjb3JkLCB7bWVzc2FnZSwgY29tcGxldGVkfSBdKSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2UsIGNvbXBsZXRlZCB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltR2V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1HZXQuanMiLCJjb25zdCB7IGdldENsYWltSWQgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBsb25nIGNsYWltIGlkXG5cbiovXG5cbmNvbnN0IGNsYWltTG9uZ0lkID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gYm9keS5jaGFubmVsTmFtZTtcbiAgY29uc3QgY2hhbm5lbENsYWltSWQgPSBib2R5LmNoYW5uZWxDbGFpbUlkO1xuICBjb25zdCBjbGFpbU5hbWUgPSBib2R5LmNsYWltTmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IGJvZHkuY2xhaW1JZDtcbiAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXN1bHR9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltTG9uZ0lkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1Mb25nSWQuanMiLCJjb25zdCB7IGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcywgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcywgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHksIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyB9ID0gcmVxdWlyZSgnaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBjbGFpbU5hbWVJc0F2YWlsYWJsZSwgcHVibGlzaCB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgYXV0aGVudGljYXRlVXNlciB9ID0gcmVxdWlyZSgnYXV0aC9hdXRoZW50aWNhdGlvbi5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCB7IGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcHVibGlzaCBhIGNsYWltIHRocm91Z2ggdGhlIGRhZW1vblxuXG4qL1xuXG5jb25zdCBjbGFpbVB1Ymxpc2ggPSAoeyBib2R5LCBmaWxlcywgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCB1c2VyIH0sIHJlcykgPT4ge1xuICAvLyBkZWZpbmUgdmFyaWFibGVzXG4gIGxldCAgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCBkZXNjcmlwdGlvbiwgZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIGxpY2Vuc2UsIG5hbWUsIG5zZncsIHRodW1ibmFpbCwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZSwgdGl0bGU7XG4gIC8vIHJlY29yZCB0aGUgc3RhcnQgdGltZSBvZiB0aGUgcmVxdWVzdFxuICBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIC8vIHZhbGlkYXRlIHRoZSBib2R5IGFuZCBmaWxlcyBvZiB0aGUgcmVxdWVzdFxuICB0cnkge1xuICAgIC8vIHZhbGlkYXRlQXBpUHVibGlzaFJlcXVlc3QoYm9keSwgZmlsZXMpO1xuICAgICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkoYm9keSkpO1xuICAgICh7ZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZX0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMoZmlsZXMpKTtcbiAgICAoe2NoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZH0gPSBib2R5KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gY2hlY2sgY2hhbm5lbCBhdXRob3JpemF0aW9uXG4gIFByb21pc2VcbiAgICAuYWxsKFtcbiAgICAgIGF1dGhlbnRpY2F0ZVVzZXIoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSxcbiAgICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpLFxuICAgICAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCksXG4gICAgICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zKHRodW1ibmFpbEZpbGVQYXRoLCBuYW1lLCBsaWNlbnNlLCBuc2Z3KSxcbiAgICBdKVxuICAgIC50aGVuKChbe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0sIHZhbGlkYXRlZENsYWltTmFtZSwgcHVibGlzaFBhcmFtcywgdGh1bWJuYWlsUHVibGlzaFBhcmFtc10pID0+IHtcbiAgICAgIC8vIGFkZCBjaGFubmVsIGRldGFpbHMgdG8gdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9uYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9pZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICB9XG4gICAgICAvLyBwdWJsaXNoIHRoZSB0aHVtYm5haWxcbiAgICAgIGlmICh0aHVtYm5haWxQdWJsaXNoUGFyYW1zKSB7XG4gICAgICAgIHB1Ymxpc2godGh1bWJuYWlsUHVibGlzaFBhcmFtcywgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVUeXBlKTtcbiAgICAgIH1cbiAgICAgIC8vIHB1Ymxpc2ggdGhlIGFzc2V0XG4gICAgICByZXR1cm4gcHVibGlzaChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpO1xuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogJ3B1Ymxpc2ggY29tcGxldGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgIGRhdGEgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGNsYWltSWQ6IHJlc3VsdC5jbGFpbV9pZCxcbiAgICAgICAgICB1cmwgICAgOiBgJHtob3N0fS8ke3Jlc3VsdC5jbGFpbV9pZH0vJHtuYW1lfWAsXG4gICAgICAgICAgbGJyeVR4IDogcmVzdWx0LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICAvLyByZWNvcmQgdGhlIHB1Ymxpc2ggZW5kIHRpbWUgYW5kIHNlbmQgdG8gZ29vZ2xlIGFuYWx5dGljc1xuICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAncHVibGlzaCcsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVB1Ymxpc2g7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJjb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aGVudGljYXRlVXNlciAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSB7XG4gICAgLy8gY2FzZTogbm8gY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgKGFub255bW91cyksIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB1c2VyIHRva2VuIGlzIHByb3ZpZGVkXG4gICAgaWYgKCFjaGFubmVsTmFtZSAmJiAhY2hhbm5lbElkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogbnVsbCxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHVzZXIgdG9rZW5cbiAgICBpZiAodXNlcikge1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxOYW1lICE9PSB1c2VyLmNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgbmFtZSBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbm5lbElkICYmIGNoYW5uZWxJZCAhPT0gdXNlci5jaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIGlkIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiB1c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogdXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggcGFzc3dvcmQgaW5zdGVhZCBvZiB1c2VyIHRva2VuXG4gICAgaWYgKCFjaGFubmVsUGFzc3dvcmQpIHRocm93IG5ldyBFcnJvcignbm8gY2hhbm5lbCBwYXNzd29yZCBwcm92aWRlZCcpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5hdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkKTtcbiAgfSxcbiAgYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCB1c2VyUGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gaG9pc3RlZCB2YXJpYWJsZXNcbiAgICAgIGxldCBjaGFubmVsRGF0YTtcbiAgICAgIC8vIGJ1aWxkIHRoZSBwYXJhbXMgZm9yIGZpbmRpbmcgdGhlIGNoYW5uZWxcbiAgICAgIGxldCBjaGFubmVsRmluZFBhcmFtcyA9IHt9O1xuICAgICAgaWYgKGNoYW5uZWxOYW1lKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgaWYgKGNoYW5uZWxJZCkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsSWQ7XG4gICAgICAvLyBmaW5kIHRoZSBjaGFubmVsXG4gICAgICBkYi5DaGFubmVsXG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogY2hhbm5lbEZpbmRQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyBjaGFubmVsIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hhbm5lbERhdGEgPSBjaGFubmVsLmdldCgpO1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBkYXRhOicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGIuVXNlci5maW5kT25lKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IHVzZXJOYW1lOiBjaGFubmVsRGF0YS5jaGFubmVsTmFtZS5zdWJzdHJpbmcoMSkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQodXNlclBhc3N3b3JkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnLi4ucGFzc3dvcmQgd2FzIGEgbWF0Y2guLi4nKTtcbiAgICAgICAgICByZXNvbHZlKGNoYW5uZWxEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvYXV0aC9hdXRoZW50aWNhdGlvbi5qcyIsImNvbnN0IHsgcmVzb2x2ZVVyaSB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHJ1biBhIHJlc29sdmUgcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG5cbiovXG5cbmNvbnN0IGNsYWltUmVzb2x2ZSA9ICh7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICByZXNvbHZlVXJpKGAke3BhcmFtcy5uYW1lfSMke3BhcmFtcy5jbGFpbUlkfWApXG4gICAgLnRoZW4ocmVzb2x2ZWRVcmkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzb2x2ZWRVcmkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1SZXNvbHZlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgc2hvcnQgY2xhaW0gaWQgZnJvbSBsb25nIGNsYWltIElkXG5cbiovXG5cbmNvbnN0IGNsYWltU2hvcnRJZCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBkYi5DbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogc2hvcnRJZH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1TaG9ydElkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1TaG9ydElkLmpzIiwiY29uc3QgeyBnZXRDbGFpbUxpc3QgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgbGlzdCBvZiBjbGFpbXNcblxuKi9cblxuY29uc3QgY2xhaW1MaXN0ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGdldENsYWltTGlzdChwYXJhbXMubmFtZSlcbiAgICAudGhlbihjbGFpbXNMaXN0ID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGNsYWltc0xpc3QpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1MaXN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1MaXN0LmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VlIGlmIGFzc2V0IGlzIGF2YWlsYWJsZSBsb2NhbGx5XG5cbiovXG5cbmNvbnN0IGZpbGVBdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGRiLkZpbGVcbiAgICAuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBuYW1lLFxuICAgICAgICBjbGFpbUlkLFxuICAgICAgfSxcbiAgICB9KVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogdHJ1ZX0pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGZhbHNlfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaWxlQXZhaWxhYmlsaXR5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsImNvbnN0IG11bHRpcGFydCA9IHJlcXVpcmUoJ2Nvbm5lY3QtbXVsdGlwYXJ0eScpO1xuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHVwbG9hZERpcmVjdG9yeSB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gbXVsdGlwYXJ0KHt1cGxvYWREaXI6IHVwbG9hZERpcmVjdG9yeX0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGFydE1pZGRsZXdhcmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tdWx0aXBhcnR5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCJcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcbmNvbnN0IGhhbmRsZUVtYmVkUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZEVtYmVkUGFnZScpO1xuY29uc3QgcmVkaXJlY3QgPSByZXF1aXJlKCcuL3JlZGlyZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAuZ2V0KCcvJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbG9naW4nLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9hYm91dCcsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgcmVkaXJlY3QoJy9wb3B1bGFyJykpO1xuICBhcHAuZ2V0KCcvcG9wdWxhcicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL25ldycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgaGFuZGxlRW1iZWRSZXF1ZXN0KTsgIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJjb25zdCB7IGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IHNlbmRFbWJlZFBhZ2UgPSAoeyBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAvLyBnZXQgYW5kIHJlbmRlciB0aGUgY29udGVudFxuICByZXMuc3RhdHVzKDIwMCkucmVuZGVyKCdlbWJlZCcsIHsgbGF5b3V0OiAnZW1iZWQnLCBob3N0LCBjbGFpbUlkLCBuYW1lIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kRW1iZWRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwiY29uc3QgcmVkaXJlY3QgPSAocm91dGUpID0+IHtcbiAgcmV0dXJuIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zdGF0dXMoMzAxKS5yZWRpcmVjdChyb3V0ZSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZGlyZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9yZWRpcmVjdC5qcyIsImNvbnN0IHNlcnZlQXNzZXRCeUNsYWltID0gcmVxdWlyZSgnLi9zZXJ2ZUFzc2V0QnlDbGFpbScpO1xuY29uc3Qgc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltID0gcmVxdWlyZSgnLi9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwLCBkYikgPT4ge1xuICBhcHAuZ2V0KCcvOmlkZW50aWZpZXIvOmNsYWltJywgc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltKTtcbiAgYXBwLmdldCgnLzpjbGFpbScsIHNlcnZlQXNzZXRCeUNsYWltKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9pbmRleC5qcyIsImNvbnN0IHsgc2VuZEdBU2VydmVFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MnKTtcbmNvbnN0IHsgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlLCBsb2dSZXF1ZXN0RGF0YSwgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlcnZlIGFuIGFzc2V0IG9yIHRoZSByZWFjdCBhcHAgdmlhIHRoZSBjbGFpbSBuYW1lIG9ubHlcblxuKi9cblxuY29uc3Qgc2VydmVyQXNzZXRCeUNsYWltID0gKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgfVxuICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgbGV0IGNsYWltTmFtZTtcbiAgdHJ5IHtcbiAgICAoe2NsYWltTmFtZX0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIG51bGwsIG51bGwpO1xuICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChudWxsLCBudWxsLCBjbGFpbU5hbWUsIG51bGwsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmVyQXNzZXRCeUNsYWltO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYVwiXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3Qge1xuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUsXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHksXG4gIGxvZ1JlcXVlc3REYXRhLFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCxcbn0gPSByZXF1aXJlKCdoZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlcnZlIGFuIGFzc2V0IG9yIHRoZSByZWFjdCBhcHAgdmlhIHRoZSBjbGFpbSBuYW1lIGFuZCBhbiBpZGVudGlmaWVyXG5cbiovXG5cbmNvbnN0IHNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0gPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICB9XG4gIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gIC8vIHBhcnNlIHRoZSBjbGFpbVxuICBsZXQgY2xhaW1OYW1lO1xuICB0cnkge1xuICAgICh7IGNsYWltTmFtZSB9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBwYXJzZSB0aGUgaWRlbnRpZmllclxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKHBhcmFtcy5pZGVudGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGlmICghaXNDaGFubmVsKSB7XG4gICAgW2NsYWltSWQsIGNsYWltTmFtZV0gPSBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5KGNsYWltSWQsIGNsYWltTmFtZSk7XG4gIH1cbiAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpO1xuICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltLmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRSZWFjdEFwcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLmdldCgnKicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcblxuY29uc3Qgc2VuZFJlYWN0QXBwID0gKHJlcSwgcmVzKSA9PiB7XG4gIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUmVhY3RBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL3NlbmRSZWFjdEFwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=