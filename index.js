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
  this.routes = {};
  this.update = function (config) {
    if (!config) {
      return console.log('No site config received.');
    }
    var analytics = config.analytics,
        assetDefaults = config.assetDefaults,
        auth = config.auth,
        customComponents = config.customComponents,
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

var siteConfig = __webpack_require__(3);

module.exports = function (req, res) {
  var context = {};

  // customize the reducer by passing in intial state configs
  var customizedReducers = (0, _spee.Reducers)(siteConfig);

  // create a new Redux store instance
  var store = (0, _redux.createStore)(customizedReducers);

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
        _react2.default.createElement(_spee.App, null)
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
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/static/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/static/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/static/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/static/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
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
var customizedReducers = (0, _spee.Reducers)(siteConfig);

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
  var store = (0, _redux.createStore)(customizedReducers, middleware);

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
          _react2.default.createElement(_spee.App, null)
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
      app.use('/static', express.static(publicFolder));
      logger.info('serving static files from custom path:', publicFolder);
    } else {
      var publicPath = Path.resolve(__dirname, 'public');
      app.use('/static', express.static(publicPath));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODJlYmYyY2EzMDEyOTg0OWU0ZWYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3RvblwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNwZWUuY2gtY29tcG9uZW50c1wiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2hhdHdnLWZldGNoXCIiLCJ3ZWJwYWNrOi8vLy4vc3BlZWNoLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLWhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xicnlDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvc2lnbnVwLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9nb3V0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC91c2VyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxBdmFpbGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQ2xhaW1zLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxEYXRhLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxTaG9ydElkLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsIm9yaWdpbmFsVXJsIiwiaXAiLCJlcnJvciIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJqc29uIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwiZXJyIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJrZXkiLCJzdWNjZXNzIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJTZXF1ZWxpemUiLCJkYXRhYmFzZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJzZXF1ZWxpemUiLCJob3N0IiwiZGlhbGVjdCIsImRpYWxlY3RPcHRpb25zIiwiZGVjaW1hbE51bWJlcnMiLCJsb2dnaW5nIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJhY3F1aXJlIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImluZm8iLCJjYXRjaCIsImRiIiwiaW1wb3J0IiwibW9kZWxOYW1lIiwiYXNzb2NpYXRlIiwidXBzZXJ0IiwiTW9kZWwiLCJ2YWx1ZXMiLCJjb25kaXRpb24iLCJ0YWJsZU5hbWUiLCJmaW5kT25lIiwid2hlcmUiLCJvYmoiLCJkZWJ1ZyIsInVwZGF0ZSIsImNyZWF0ZSIsIlNpdGVDb25maWciLCJhbmFseXRpY3MiLCJnb29nbGVJZCIsImFzc2V0RGVmYXVsdHMiLCJkZXNjcmlwdGlvbiIsInRodW1ibmFpbCIsInRpdGxlIiwiYXV0aCIsInNlc3Npb25LZXkiLCJjdXN0b21Db21wb25lbnRzIiwiY29tcG9uZW50cyIsImNvbnRhaW5lcnMiLCJwYWdlcyIsImRldGFpbHMiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5Iiwicm91dGVzIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsInVhIiwiY3JlYXRlU2VydmVFdmVudFBhcmFtcyIsImhlYWRlcnMiLCJldmVudENhdGVnb3J5IiwiZXZlbnRBY3Rpb24iLCJldmVudExhYmVsIiwiaXBPdmVycmlkZSIsInVzZXJBZ2VudE92ZXJyaWRlIiwiY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIiwiY2F0ZWdvcnkiLCJ2YXJpYWJsZSIsImxhYmVsIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImR1cmF0aW9uIiwidXNlclRpbWluZ0NhdGVnb3J5IiwidXNlclRpbWluZ1ZhcmlhYmxlTmFtZSIsInVzZXJUaW1pbmdUaW1lIiwidXNlclRpbWluZ0xhYmVsIiwic2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IiwicGFyYW1zIiwidmlzaXRvcklkIiwicmVwbGFjZSIsInZpc2l0b3IiLCJzdHJpY3RDaWRGb3JtYXQiLCJodHRwcyIsImV2ZW50Iiwic2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyIsInRpbWluZyIsInNlbmRHQVNlcnZlRXZlbnQiLCJzZW5kR0FUaW1pbmdFdmVudCIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsImNoYW5uZWxOYW1lIiwiY2hhbm5lbF9uYW1lIiwiY2hhbm5lbElkIiwiY2hhbm5lbF9pZCIsImF4aW9zIiwiYXBpIiwiYXBpSG9zdCIsImFwaVBvcnQiLCJsYnJ5QXBpVXJpIiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJyZXN1bHQiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwibmFtZSIsImdhU3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsIlByb21pc2UiLCJwb3N0IiwibWV0aG9kIiwicmVzcG9uc2UiLCJnZXRDbGFpbSIsInVyaSIsInRpbWVvdXQiLCJnZXRDbGFpbUxpc3QiLCJjbGFpbU5hbWUiLCJyZXNvbHZlVXJpIiwiZ2V0RG93bmxvYWREaXJlY3RvcnkiLCJkb3dubG9hZF9kaXJlY3RvcnkiLCJjcmVhdGVDaGFubmVsIiwiYW1vdW50IiwicmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyIsIk5PX0NIQU5ORUwiLCJOT19DTEFJTSIsIk5PX0ZJTEUiLCJnZXRDbGFpbUlkIiwiY2hhbm5lbENsYWltSWQiLCJjbGFpbUlkIiwiZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCIsImdldENsYWltSWRCeUNsYWltIiwiZ2V0TG9uZ0NsYWltSWQiLCJsb25nQ2xhaW1JZCIsImdldExvbmdDaGFubmVsSWQiLCJsb25nQ2hhbm5lbElkIiwiYWxsIiwiZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCIsImdldENoYW5uZWxEYXRhIiwicGFnZSIsImxvbmdDaGFubmVsQ2xhaW1JZCIsImdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQiLCJzaG9ydENoYW5uZWxDbGFpbUlkIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJmaWxlIiwiZGF0YVZhbHVlcyIsInBhc3Nwb3J0IiwibG9jYWxMb2dpblN0cmF0ZWd5IiwibG9jYWxTaWdudXBTdHJhdGVneSIsInNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJkZXNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJkZXNlcmlhbGl6ZVVzZXIiLCJzZXJpYWxpemVVc2VyIiwidXNlIiwibGJyeUFwaSIsInB1Ymxpc2hIZWxwZXJzIiwiT3AiLCJwdWJsaXNoIiwiZmlsZU5hbWUiLCJmaWxlVHlwZSIsInB1Ymxpc2hSZXN1bHRzIiwiY2VydGlmaWNhdGVJZCIsInR4IiwiY2hhbm5lbCIsImZpbGVSZWNvcmQiLCJjbGFpbV9pZCIsIm1ldGFkYXRhIiwiYWRkcmVzcyIsImNsYWltX2FkZHJlc3MiLCJvdXRwb2ludCIsInR4aWQiLCJub3V0IiwiaGVpZ2h0IiwiZmlsZVBhdGgiLCJmaWxlX3BhdGgiLCJuc2Z3IiwiY2xhaW1SZWNvcmQiLCJjb250ZW50VHlwZSIsImJpZCIsInVwc2VydENyaXRlcmlhIiwiY2xhaW0iLCJzZXRDbGFpbSIsInNldEZpbGUiLCJkZWxldGVUZW1wb3JhcnlGaWxlIiwiY2xhaW1OYW1lSXNBdmFpbGFibGUiLCJjbGFpbUFkZHJlc3NlcyIsInB1c2giLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsIm9yIiwiY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IiwiZnMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSIsImxpY2Vuc2UiLCJpbnZhbGlkTmFtZUNoYXJhY3RlcnMiLCJleGVjIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwicGF0aCIsInR5cGUiLCJzaXplIiwidGVzdCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImF1dGhvciIsImxhbmd1YWdlIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsInVubGluayIsImFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIiwiZmlsZUluZm8iLCJnZXRSZXN1bHQiLCJmaWxlX25hbWUiLCJkb3dubG9hZF9wYXRoIiwiY3JlYXRlRmlsZURhdGEiLCJteXNxbCIsIndhcm4iLCJyZXR1cm5TaG9ydElkIiwiY2xhaW1zQXJyYXkiLCJsb25nSWQiLCJjbGFpbUluZGV4Iiwic2hvcnRJZCIsInN1YnN0cmluZyIsInNob3J0SWRMZW5ndGgiLCJmaW5kSW5kZXgiLCJlbGVtZW50IiwicG9zc2libGVNYXRjaGVzIiwic2xpY2UiLCJmaWx0ZXIiLCJzaXRlQ29uZmlnIiwicmVxIiwiY29udGV4dCIsImN1c3RvbWl6ZWRSZWR1Y2VycyIsInN0b3JlIiwiaHRtbCIsInVybCIsImhlbG1ldCIsInJlbmRlclN0YXRpYyIsInJlZGlyZWN0IiwicHJlbG9hZGVkU3RhdGUiLCJnZXRTdGF0ZSIsInNlbmQiLCJ0b1N0cmluZyIsIm1ldGEiLCJsaW5rIiwiU0VSVkUiLCJTSE9XIiwiY2xpZW50QWNjZXB0c0h0bWwiLCJhY2NlcHQiLCJtYXRjaCIsInJlcXVlc3RJc0Zyb21Ccm93c2VyIiwiY2xpZW50V2FudHNBc3NldCIsInJhbmdlIiwiaW1hZ2VJc1dhbnRlZCIsInZpZGVvSXNXYW50ZWQiLCJpc1ZhbGlkQ2xhaW1JZCIsImlzVmFsaWRTaG9ydElkIiwiaXNWYWxpZFNob3J0SWRPckNsYWltSWQiLCJpbnB1dCIsInNlcnZlQXNzZXRUb0NsaWVudCIsInZlcmJvc2UiLCJzZW5kRmlsZU9wdGlvbnMiLCJzZW5kRmlsZSIsImdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IiwiZnVsbENsYWltSWQiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicmVzcG9uc2VUeXBlIiwiZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSIsImlkZW50aWZpZXIiLCJ0ZW1wTmFtZSIsImxvZ1JlcXVlc3REYXRhIiwiUkVHRVhQX0lOVkFMSURfQ0xBSU0iLCJSRUdFWFBfSU5WQUxJRF9DSEFOTkVMIiwiUkVHRVhQX0FERFJFU1MiLCJDSEFOTkVMX0NIQVIiLCJwYXJzZUlkZW50aWZpZXIiLCJjb21wb25lbnRzUmVnZXgiLCJSZWdFeHAiLCJtYXAiLCJwcm90byIsInZhbHVlIiwibW9kaWZpZXJTZXBlcmF0b3IiLCJtb2RpZmllciIsImlzQ2hhbm5lbCIsInN0YXJ0c1dpdGgiLCJuYW1lQmFkQ2hhcnMiLCJqb2luIiwicGFyc2VDbGFpbSIsInBhcnNlTW9kaWZpZXIiLCJyZXR1cm5TYWdhV2l0aFBhcmFtcyIsInNhZ2EiLCJzYWdhTWlkZGxld2FyZSIsIm1pZGRsZXdhcmUiLCJhY3Rpb24iLCJvbkhhbmRsZVNob3dQYWdlVXJpIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJydW4iLCJkb25lIiwiU2VydmVyIiwiZXhwcmVzcyIsImJvZHlQYXJzZXIiLCJleHByZXNzSGFuZGxlYmFycyIsIkhhbmRsZWJhcnMiLCJjb29raWVTZXNzaW9uIiwiaHR0cCIsInJlcXVlc3RMb2dnZXIiLCJQYXRoIiwibG9nZ2VyQ29uZmlnIiwibXlzcWxDb25maWciLCJzbGFja0NvbmZpZyIsImNvbmZpZ3VyZUxvZ2dlciIsInVzZXJDb25maWciLCJjb25maWd1cmVNeXNxbCIsImNvbmZpZ3VyZVNpdGVEZXRhaWxzIiwiY29uZmlndXJlU2xhY2siLCJjb25maWd1cmVDbGllbnRCdW5kbGUiLCJjb25maWd1cmVNb2RlbHMiLCJjb25maWd1cmVSb3V0ZXMiLCJjcmVhdGVBcHAiLCJhcHAiLCJlbmFibGUiLCJwdWJsaWNGb2xkZXIiLCJwcm9jZXNzIiwiY3dkIiwic3RhdGljIiwicHVibGljUGF0aCIsIl9fZGlybmFtZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNwZWVjaFBhc3Nwb3J0IiwibWF4QWdlIiwiaW5pdGlhbGl6ZSIsInNlc3Npb24iLCJoYnMiLCJkZWZhdWx0TGF5b3V0IiwiaGFuZGxlYmFycyIsImVuZ2luZSIsInNldCIsInNlcnZlciIsInN0YXJ0IiwiUE9SVCIsInN5bmMiLCJsaXN0ZW4iLCJuZXh0IiwiTG9nZ2VyQ29uZmlnIiwibG9nTGV2ZWwiLCJjb25maWd1cmUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwidXNlckluZm8iLCJpZCIsInVzZXJOYW1lIiwiZ2V0Q2hhbm5lbCIsInNob3J0Q2hhbm5lbElkIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VyIiwiY29tcGFyZVBhc3N3b3JkIiwiaXNNYXRjaCIsIlNUUklORyIsIkJPT0xFQU4iLCJJTlRFR0VSIiwiVEVYVCIsIkRFQ0lNQUwiLCJkZWZpbmUiLCJkZWZhdWx0IiwiY2xhaW1TZXF1ZW5jZSIsImRlY29kZWRDbGFpbSIsImRlcHRoIiwiZWZmZWN0aXZlQW1vdW50IiwiaGFzU2lnbmF0dXJlIiwiaGV4IiwidmFsaWRBdEhlaWdodCIsInZhbHVlVmVyc2lvbiIsImNsYWltVHlwZSIsImNlcnRpZmljYXRlVmVyc2lvbiIsImtleVR5cGUiLCJwdWJsaWNLZXkiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJmb3JlaWduS2V5IiwiYWxsb3dOdWxsIiwib3JkZXIiLCJnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkIiwiJGxpa2UiLCJnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lIiwidmFsaWRhdGVMb25nQ2hhbm5lbElkIiwiaGFzT25lIiwiZGVmYXVsdFRodW1ibmFpbCIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2UiLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwib3B0aW9ucyIsInVzZXJEYXRhIiwiY2hhbm5lbERhdGEiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiaGFuZGxlU2lnbnVwUmVxdWVzdCIsImhhbmRsZUxvZ2luUmVxdWVzdCIsImhhbmRsZUxvZ291dFJlcXVlc3QiLCJoYW5kbGVVc2VyUmVxdWVzdCIsImdldCIsInNpZ251cCIsImxvZ2luIiwibG9nSW4iLCJsb2dvdXQiLCJjaGFubmVsQXZhaWxhYmlsaXR5IiwiY2hhbm5lbENsYWltcyIsImNoYW5uZWxTaG9ydElkIiwiY2xhaW1BdmFpbGFiaWxpdHkiLCJjbGFpbURhdGEiLCJjbGFpbUdldCIsImNsYWltTG9uZ0lkIiwiY2xhaW1QdWJsaXNoIiwiY2xhaW1SZXNvbHZlIiwiY2xhaW1TaG9ydElkIiwiY2xhaW1MaXN0IiwiZmlsZUF2YWlsYWJpbGl0eSIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJhdmFpbGFibGVOYW1lIiwiYm9keSIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsImNoYW5uZWxTaG9ydElkUm91dGUiLCJjbGFpbUluZm8iLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJjb21wbGV0ZWQiLCJhdXRoZW50aWNhdGVVc2VyIiwiZmlsZXMiLCJjaGFubmVsUGFzc3dvcmQiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJyZXNvbHZlZFVyaSIsImNsYWltc0xpc3QiLCJtdWx0aXBhcnQiLCJ1cGxvYWREaXIiLCJoYW5kbGVQYWdlUmVxdWVzdCIsImhhbmRsZUVtYmVkUmVxdWVzdCIsImhhbmRsZVBhZ2VSZW5kZXIiLCJzZW5kUmVhY3RBcHAiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwic2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxJQUFNQSxTQUFTLG1CQUFBQyxDQUFRLENBQVIsQ0FBZjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyx1QkFBcUIsNkJBQVVDLFdBQVYsRUFBdUJDLEVBQXZCLEVBQTJCQyxLQUEzQixFQUFrQ0MsR0FBbEMsRUFB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bW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgyZWJmMmNhMzAxMjk4NDllNGVmIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVFcnJvclJlc3BvbnNlOiBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBvbiAke29yaWdpbmFsVXJsfWAsIG1vZHVsZS5leHBvcnRzLnVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyhlcnJvcikpO1xuICAgIGNvbnN0IFtzdGF0dXMsIG1lc3NhZ2VdID0gbW9kdWxlLmV4cG9ydHMucmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoc3RhdHVzKVxuICAgICAgLmpzb24obW9kdWxlLmV4cG9ydHMuY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQoc3RhdHVzLCBtZXNzYWdlKSk7XG4gIH0sXG4gIHJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1czogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgbGV0IHN0YXR1cywgbWVzc2FnZTtcbiAgICAvLyBjaGVjayBmb3IgZGFlbW9uIGJlaW5nIHR1cm5lZCBvZmZcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHN0YXR1cyA9IDUwMztcbiAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiByZWZ1c2VkLiAgVGhlIGRhZW1vbiBtYXkgbm90IGJlIHJ1bm5pbmcuJztcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gNDAwO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFtzdGF0dXMsIG1lc3NhZ2VdO1xuICB9LFxuICB1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXM6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBuZXdFcnJvck9iamVjdCA9IHt9O1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbmV3RXJyb3JPYmplY3Rba2V5XSA9IGVycltrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3RXJyb3JPYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH0sXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsImNvbnN0IENlcnRpZmljYXRlID0gcmVxdWlyZSgnbW9kZWxzL2NlcnRpZmljYXRlLmpzJyk7XG5jb25zdCBDaGFubmVsID0gcmVxdWlyZSgnbW9kZWxzL2NoYW5uZWwuanMnKTtcbmNvbnN0IENsYWltID0gcmVxdWlyZSgnbW9kZWxzL2NsYWltLmpzJyk7XG5jb25zdCBGaWxlID0gcmVxdWlyZSgnbW9kZWxzL2ZpbGUuanMnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCdtb2RlbHMvcmVxdWVzdC5qcycpO1xuY29uc3QgVXNlciA9IHJlcXVpcmUoJ21vZGVscy91c2VyLmpzJyk7XG5cbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5jb25zdCB7ZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZH0gPSByZXF1aXJlKCdteXNxbENvbmZpZy5qcycpO1xuXG4vLyBzZXQgc2VxdWVsaXplIG9wdGlvbnNcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICBob3N0ICAgICAgICAgIDogJ2xvY2FsaG9zdCcsXG4gIGRpYWxlY3QgICAgICAgOiAnbXlzcWwnLFxuICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSxcbiAgbG9nZ2luZyAgICAgICA6IGZhbHNlLFxuICBwb29sICAgICAgICAgIDoge1xuICAgIG1heCAgICA6IDUsXG4gICAgbWluICAgIDogMCxcbiAgICBpZGxlICAgOiAxMDAwMCxcbiAgICBhY3F1aXJlOiAxMDAwMCxcbiAgfSxcbn0pO1xuXG4vLyBlc3RhYmxpc2ggbXlzcWwgY29ubmVjdGlvblxuc2VxdWVsaXplXG4gIC5hdXRoZW50aWNhdGUoKVxuICAudGhlbigoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ1NlcXVlbGl6ZSBoYXMgZXN0YWJsaXNoZWQgbXlzcWwgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkuJyk7XG4gIH0pXG4gIC5jYXRjaChlcnIgPT4ge1xuICAgIGxvZ2dlci5lcnJvcignU2VxdWVsaXplIHdhcyB1bmFibGUgdG8gY29ubmVjdCB0byB0aGUgZGF0YWJhc2U6JywgZXJyKTtcbiAgfSk7XG5cbi8vIG1hbnVhbGx5IGFkZCBlYWNoIG1vZGVsIHRvIHRoZSBkYiBvYmplY3QgKG5vdGU6IG1ha2UgdGhpcyBkeW5hbWljKVxuY29uc3QgZGIgPSB7fTtcbmRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG5kYlsnQ2hhbm5lbCddID0gc2VxdWVsaXplLmltcG9ydCgnQ2hhbm5lbCcsIENoYW5uZWwpO1xuZGJbJ0NsYWltJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDbGFpbScsIENsYWltKTtcbmRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG5kYlsnUmVxdWVzdCddID0gc2VxdWVsaXplLmltcG9ydCgnUmVxdWVzdCcsIFJlcXVlc3QpO1xuZGJbJ1VzZXInXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1VzZXInLCBVc2VyKTtcblxuLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbmxvZ2dlci5pbmZvKCdhc3NvY2lhdGluZyBkYiBtb2RlbHMuLi4nKTtcbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4gIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgIGxvZ2dlci5pbmZvKCdBc3NvY2lhdGluZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbiAgfVxufSk7XG5cbi8vIGFkZCBzZXF1ZWxpemUvU2VxdWVsaXplIHRvIGRiXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG4vLyBhZGQgYW4gJ3Vwc2VydCcgbWV0aG9kIHRvIHRoZSBkYiBvYmplY3RcbmRiLnVwc2VydCA9IChNb2RlbCwgdmFsdWVzLCBjb25kaXRpb24sIHRhYmxlTmFtZSkgPT4ge1xuICByZXR1cm4gTW9kZWxcbiAgICAuZmluZE9uZSh7XG4gICAgICB3aGVyZTogY29uZGl0aW9uLFxuICAgIH0pXG4gICAgLnRoZW4ob2JqID0+IHtcbiAgICAgIGlmIChvYmopIHsgIC8vIHVwZGF0ZVxuICAgICAgICBsb2dnZXIuZGVidWcoYHVwZGF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIG9iai51cGRhdGUodmFsdWVzKTtcbiAgICAgIH0gZWxzZSB7ICAvLyBpbnNlcnRcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBjcmVhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBNb2RlbC5jcmVhdGUodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgJHt0YWJsZU5hbWV9LnVwc2VydCBlcnJvcmAsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJmdW5jdGlvbiBTaXRlQ29uZmlnICgpIHtcbiAgdGhpcy5hbmFseXRpY3MgPSB7XG4gICAgZ29vZ2xlSWQ6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5hc3NldERlZmF1bHRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQW4gYXNzZXQgcHVibGlzaGVkIG9uIFNwZWUuY2gnLFxuICAgIHRodW1ibmFpbCAgOiAnaHR0cHM6Ly9zcGVlLmNoL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gIH07XG4gIHRoaXMuYXV0aCA9IHtcbiAgICBzZXNzaW9uS2V5OiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IHtcbiAgICBjb21wb25lbnRzOiB7fSxcbiAgICBjb250YWluZXJzOiB7fSxcbiAgICBwYWdlcyAgICAgOiB7fSxcbiAgfTtcbiAgdGhpcy5kZXRhaWxzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT3Blbi1zb3VyY2UsIGRlY2VudHJhbGl6ZWQgaW1hZ2UgYW5kIHZpZGVvIHNoYXJpbmcuJyxcbiAgICBob3N0ICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHBvcnQgICAgICAgOiAzMDAwLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gICAgdHdpdHRlciAgICA6ICdAc3BlZV9jaCcsXG4gIH07XG4gIHRoaXMucHVibGlzaGluZyA9IHtcbiAgICBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXM6IFtdLFxuICAgIGRpc2FibGVkICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgZGlzYWJsZWRNZXNzYWdlICAgICAgICAgOiAnUGxlYXNlIGNoZWNrIGJhY2sgc29vbi4nLFxuICAgIHByaW1hcnlDbGFpbUFkZHJlc3MgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWwgICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWxJZCAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHVwbG9hZERpcmVjdG9yeSAgICAgICAgIDogJy9ob21lL2xicnkvVXBsb2FkcycsXG4gIH07XG4gIHRoaXMucm91dGVzID0ge307XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNpdGUgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7IGFuYWx5dGljcywgYXNzZXREZWZhdWx0cywgYXV0aCwgY3VzdG9tQ29tcG9uZW50cywgZGV0YWlscywgcHVibGlzaGluZywgcm91dGVzIH0gPSBjb25maWc7XG4gICAgY29uc29sZS5sb2coJ0NvbmZpZ3VyaW5nIHNpdGUgZGV0YWlscy4uLicpO1xuICAgIHRoaXMuYW5hbHl0aWNzID0gYW5hbHl0aWNzO1xuICAgIHRoaXMuYXNzZXREZWZhdWx0cyA9IGFzc2V0RGVmYXVsdHM7XG4gICAgdGhpcy5hdXRoID0gYXV0aDtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIHRoaXMucHVibGlzaGluZyA9IHB1Ymxpc2hpbmc7XG4gICAgdGhpcy5jdXN0b21Db21wb25lbnRzID0gY3VzdG9tQ29tcG9uZW50cztcbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNpdGVDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgdWEgPSByZXF1aXJlKCd1bml2ZXJzYWwtYW5hbHl0aWNzJyk7XG5jb25zdCB7IGFuYWx5dGljcyA6IHsgZ29vZ2xlSWQgfSwgZGV0YWlsczogeyB0aXRsZSB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICBldmVudENhdGVnb3J5ICAgIDogJ2NsaWVudCByZXF1ZXN0cycsXG4gICAgZXZlbnRBY3Rpb24gICAgICA6ICdzZXJ2ZSByZXF1ZXN0JyxcbiAgICBldmVudExhYmVsICAgICAgIDogb3JpZ2luYWxVcmwsXG4gICAgaXBPdmVycmlkZSAgICAgICA6IGlwLFxuICAgIHVzZXJBZ2VudE92ZXJyaWRlOiBoZWFkZXJzWyd1c2VyLWFnZW50J10sXG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICBjb25zdCBkdXJhdGlvbiA9IGVuZFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiB7XG4gICAgdXNlclRpbWluZ0NhdGVnb3J5ICAgIDogY2F0ZWdvcnksXG4gICAgdXNlclRpbWluZ1ZhcmlhYmxlTmFtZTogdmFyaWFibGUsXG4gICAgdXNlclRpbWluZ1RpbWUgICAgICAgIDogZHVyYXRpb24sXG4gICAgdXNlclRpbWluZ0xhYmVsICAgICAgIDogbGFiZWwsXG4gIH07XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQgKGlwLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvcklkID0gaXAucmVwbGFjZSgvXFwuL2csICctJyk7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLmV2ZW50KHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcgKHZpc2l0b3JJZCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLnRpbWluZyhwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYFRpbWluZyBldmVudCBzdWNjZXNzZnVsbHkgc2VudCB0byBnb29nbGUgYW5hbHl0aWNzYCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlbmRHQVNlcnZlRXZlbnQgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQoaXAsIHBhcmFtcyk7XG4gIH0sXG4gIHNlbmRHQVRpbWluZ0V2ZW50IChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nKHRpdGxlLCBwYXJhbXMpO1xuICB9LFxuICBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwgKHsgY2hhbm5lbF9uYW1lOiBjaGFubmVsTmFtZSwgY2hhbm5lbF9pZDogY2hhbm5lbElkIH0pIHtcbiAgICByZXR1cm4gKGNoYW5uZWxOYW1lIHx8IGNoYW5uZWxJZCA/ICdQVUJMSVNIX0lOX0NIQU5ORUxfQ0xBSU0nIDogJ1BVQkxJU0hfQU5PTllNT1VTX0NMQUlNJyk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsImNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcbmNvbnN0IGxvY2FsTG9naW5TdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtbG9naW4uanMnKTtcbmNvbnN0IGxvY2FsU2lnbnVwU3RyYXRlZ3kgPSByZXF1aXJlKCcuL2xvY2FsLXNpZ251cC5qcycpO1xuY29uc3QgeyBzZXJpYWxpemVTcGVlY2hVc2VyLCBkZXNlcmlhbGl6ZVNwZWVjaFVzZXIgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvYXV0aEhlbHBlcnMuanMnKTtcblxucGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGRlc2VyaWFsaXplU3BlZWNoVXNlcik7XG5wYXNzcG9ydC5zZXJpYWxpemVVc2VyKHNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xucGFzc3BvcnQudXNlKCdsb2NhbC1sb2dpbicsIGxvY2FsTG9naW5TdHJhdGVneSk7XG5wYXNzcG9ydC51c2UoJ2xvY2FsLXNpZ251cCcsIGxvY2FsU2lnbnVwU3RyYXRlZ3kpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhc3Nwb3J0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2luZGV4LmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHB1Ymxpc2hIZWxwZXJzID0gcmVxdWlyZSgnaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHByaW1hcnlDbGFpbUFkZHJlc3MsIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe1xuICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lOiBwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gbXlzcWwgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIC8vIGNvbmZpZ3VyZSBjcmVkZW50aWFsc1xuICAgIGxvZ2dlci5pbmZvKCdjb25maWd1cmluZyBteXNxbC4uLicpO1xuICAgIGNvbnN0IHsgZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gY29uZmlnO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgbXlzcWwoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblNob3J0SWQ6IGZ1bmN0aW9uIChjbGFpbXNBcnJheSwgbG9uZ0lkKSB7XG4gICAgbGV0IGNsYWltSW5kZXg7XG4gICAgbGV0IHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIDEpOyAvLyBkZWZhdWx0IHNob3J0IGlkIGlzIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICBsZXQgc2hvcnRJZExlbmd0aCA9IDA7XG4gICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhpcyBjbGFpbSBpZFxuICAgIGNsYWltSW5kZXggPSBjbGFpbXNBcnJheS5maW5kSW5kZXgoZWxlbWVudCA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFpbUlkID09PSBsb25nSWQ7XG4gICAgfSk7XG4gICAgaWYgKGNsYWltSW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsYWltIGlkIG5vdCBmb3VuZCBpbiBjbGFpbXMgbGlzdCcpO1xuICAgIH1cbiAgICAvLyBnZXQgYW4gYXJyYXkgb2YgYWxsIGNsYWltcyB3aXRoIGxvd2VyIGhlaWdodFxuICAgIGxldCBwb3NzaWJsZU1hdGNoZXMgPSBjbGFpbXNBcnJheS5zbGljZSgwLCBjbGFpbUluZGV4KTtcbiAgICAvLyByZW1vdmUgY2VydGlmaWNhdGVzIHdpdGggdGhlIHNhbWUgcHJlZml4ZXMgdW50aWwgbm9uZSBhcmUgbGVmdC5cbiAgICB3aGlsZSAocG9zc2libGVNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNob3J0SWRMZW5ndGggKz0gMTtcbiAgICAgIHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpO1xuICAgICAgcG9zc2libGVNYXRjaGVzID0gcG9zc2libGVNYXRjaGVzLmZpbHRlcihlbGVtZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50LmNsYWltSWQgJiYgKGVsZW1lbnQuY2xhaW1JZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCkgPT09IHNob3J0SWQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hvcnRJZDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgUmVkdWNlcnMsIEdBTGlzdGVuZXIsIEFwcCB9IGZyb20gJ3NwZWUuY2gtY29tcG9uZW50cyc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZS5qcyc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3VzdG9taXplIHRoZSByZWR1Y2VyIGJ5IHBhc3NpbmcgaW4gaW50aWFsIHN0YXRlIGNvbmZpZ3NcbiAgY29uc3QgY3VzdG9taXplZFJlZHVjZXJzID0gUmVkdWNlcnMoc2l0ZUNvbmZpZyk7XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoY3VzdG9taXplZFJlZHVjZXJzKTtcblxuICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICA8QXBwIC8+XG4gICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG5cbiAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgLy8gU29tZXdoZXJlIGEgYDxSZWRpcmVjdD5gIHdhcyByZW5kZXJlZFxuICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UncmUgZ29vZCwgc2VuZCB0aGUgcmVzcG9uc2VcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xuXG4gIGNvbnNvbGUubG9nKCdoZWxsbyBmcm9tIHNwZWUuY2ggaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNwZWUuY2gtY29tcG9uZW50c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNwZWUuY2gtY29tcG9uZW50c1wiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL3N0YXRpYy9hc3NldHMvY3NzL3Jlc2V0LmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvc3RhdGljL2Fzc2V0cy9jc3MvZ2VuZXJhbC5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL3N0YXRpYy9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvc3RhdGljL2J1bmRsZS9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGdldENsYWltSWQsIGdldExvY2FsRmlsZVJlY29yZCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJy4vZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5jb25zdCBTSE9XID0gJ1NIT1cnO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbmZ1bmN0aW9uIGNsaWVudEFjY2VwdHNIdG1sICh7YWNjZXB0fSkge1xuICByZXR1cm4gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKTtcbn07XG5cbmZ1bmN0aW9uIHJlcXVlc3RJc0Zyb21Ccm93c2VyIChoZWFkZXJzKSB7XG4gIHJldHVybiBoZWFkZXJzWyd1c2VyLWFnZW50J10gJiYgaGVhZGVyc1sndXNlci1hZ2VudCddLm1hdGNoKC9Nb3ppbGxhLyk7XG59O1xuXG5mdW5jdGlvbiBjbGllbnRXYW50c0Fzc2V0ICh7YWNjZXB0LCByYW5nZX0pIHtcbiAgY29uc3QgaW1hZ2VJc1dhbnRlZCA9IGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL2ltYWdlXFwvLiovKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9cXCovKTtcbiAgY29uc3QgdmlkZW9Jc1dhbnRlZCA9IGFjY2VwdCAmJiByYW5nZTtcbiAgcmV0dXJuIGltYWdlSXNXYW50ZWQgfHwgdmlkZW9Jc1dhbnRlZDtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRDbGFpbUlkIChjbGFpbUlkKSB7XG4gIHJldHVybiAoKGNsYWltSWQubGVuZ3RoID09PSA0MCkgJiYgIS9bXkEtWmEtejAtOV0vZy50ZXN0KGNsYWltSWQpKTtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkIChjbGFpbUlkKSB7XG4gIHJldHVybiBjbGFpbUlkLmxlbmd0aCA9PT0gMTsgIC8vIGl0IHNob3VsZCByZWFsbHkgZXZhbHVhdGUgdGhlIHNob3J0IHVybCBpdHNlbGZcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIChpbnB1dCkge1xuICByZXR1cm4gKGlzVmFsaWRDbGFpbUlkKGlucHV0KSB8fCBpc1ZhbGlkU2hvcnRJZChpbnB1dCkpO1xufTtcblxuZnVuY3Rpb24gc2VydmVBc3NldFRvQ2xpZW50IChjbGFpbUlkLCBuYW1lLCByZXMpIHtcbiAgcmV0dXJuIGdldExvY2FsRmlsZVJlY29yZChjbGFpbUlkLCBuYW1lKVxuICAgIC50aGVuKGZpbGVSZWNvcmQgPT4ge1xuICAgICAgLy8gY2hlY2sgdGhhdCBhIGxvY2FsIHJlY29yZCB3YXMgZm91bmRcbiAgICAgIGlmIChmaWxlUmVjb3JkID09PSBOT19GSUxFKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDMwNykucmVkaXJlY3QoYC9hcGkvY2xhaW0vZ2V0LyR7bmFtZX0vJHtjbGFpbUlkfWApO1xuICAgICAgfVxuICAgICAgLy8gc2VydmUgdGhlIGZpbGVcbiAgICAgIGNvbnN0IHtmaWxlUGF0aCwgZmlsZVR5cGV9ID0gZmlsZVJlY29yZDtcbiAgICAgIGxvZ2dlci52ZXJib3NlKGBzZXJ2aW5nIGZpbGU6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICBjb25zdCBzZW5kRmlsZU9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICAgICAgICA6IGZpbGVUeXBlIHx8ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZEZpbGUoZmlsZVBhdGgsIHNlbmRGaWxlT3B0aW9ucyk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcykge1xuICAgIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gICAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKGZ1bGxDbGFpbUlkID0+IHtcbiAgICAgICAgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DTEFJTSkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjaGFubmVsIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZlQXNzZXRUb0NsaWVudChmdWxsQ2xhaW1JZCwgY2xhaW1OYW1lLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ3N1Y2Nlc3MnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnZmFpbCcpO1xuICAgICAgfSk7XG4gIH0sXG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSAoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZVR5cGU7XG4gICAgaWYgKGhhc0ZpbGVFeHRlbnNpb24pIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFOyAgLy8gYXNzdW1lIGEgc2VydmUgcmVxdWVzdCBpZiBmaWxlIGV4dGVuc2lvbiBpcyBwcmVzZW50XG4gICAgICBpZiAoY2xpZW50QWNjZXB0c0h0bWwoaGVhZGVycykpIHsgIC8vIGlmIHRoZSByZXF1ZXN0IGNvbWVzIGZyb20gYSBicm93c2VyLCBjaGFuZ2UgaXQgdG8gYSBzaG93IHJlcXVlc3RcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIGlmIChjbGllbnRXYW50c0Fzc2V0KGhlYWRlcnMpICYmIHJlcXVlc3RJc0Zyb21Ccm93c2VyKGhlYWRlcnMpKSB7ICAvLyB0aGlzIGlzIGluIGNhc2Ugc29tZW9uZSBlbWJlZHMgYSBzaG93IHVybFxuICAgICAgICBsb2dnZXIuZGVidWcoJ1Nob3cgcmVxdWVzdCBjYW1lIGZyb20gYnJvd3NlciBidXQgd2FudHMgYW4gaW1hZ2UvdmlkZW8uIENoYW5naW5nIHJlc3BvbnNlIHRvIHNlcnZlLi4uJyk7XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VUeXBlO1xuICB9LFxuICBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IChpZGVudGlmaWVyLCBuYW1lKSB7XG4gICAgLy8gdGhpcyBpcyBhIHBhdGNoIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSB3aXRoICcvbmFtZS9jbGFpbV9pZCcgdXJsIGZvcm1hdFxuICAgIGlmIChpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChuYW1lKSAmJiAhaXNWYWxpZFNob3J0SWRPckNsYWltSWQoaWRlbnRpZmllcikpIHtcbiAgICAgIGNvbnN0IHRlbXBOYW1lID0gbmFtZTtcbiAgICAgIG5hbWUgPSBpZGVudGlmaWVyO1xuICAgICAgaWRlbnRpZmllciA9IHRlbXBOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gW2lkZW50aWZpZXIsIG5hbWVdO1xuICB9LFxuICBsb2dSZXF1ZXN0RGF0YSAocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdyZXNwb25zZVR5cGUgPT09JywgcmVzcG9uc2VUeXBlKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIG5hbWUgPT09ICcsIGNsYWltTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIG5hbWUgPT09JywgY2hhbm5lbE5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gaWQgPT09JywgY2xhaW1JZCk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIGlkZW50aWZpZXI6JywgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke3ZhbHVlfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIHVybC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbCBuYW1lIGFmdGVyIEAuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1JZCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbmFtZTonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSAuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgJHttb2RpZmllclNlcGVyYXRvcn0uYCk7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke21vZGlmaWVyU2VwZXJhdG9yfSBtb2RpZmllciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lYCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICB9O1xuICB9LFxuICBwYXJzZU1vZGlmaWVyOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbW9kaWZpZXI6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeVVyaS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZSc7XG5pbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUgZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBjYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7IFJlZHVjZXJzLCBHQUxpc3RlbmVyLCBBcHAsIFNhZ2FzLCBBY3Rpb25zIH0gZnJvbSAnc3BlZS5jaC1jb21wb25lbnRzJztcblxuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG4vLyBjb25maWd1cmUgdGhlIHJlZHVjZXJzIGJ5IHBhc3NpbmcgaW5pdGlhbCBzdGF0ZSBjb25maWdzXG5jb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgY3VzdG9taXplZFJlZHVjZXJzID0gUmVkdWNlcnMoc2l0ZUNvbmZpZyk7XG5cbmNvbnN0IHJldHVyblNhZ2FXaXRoUGFyYW1zID0gKHNhZ2EsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKiAoKSB7XG4gICAgeWllbGQgY2FsbChzYWdhLCBwYXJhbXMpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShjdXN0b21pemVkUmVkdWNlcnMsIG1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBzYWdhXG4gIGNvbnN0IGFjdGlvbiA9IEFjdGlvbnMub25IYW5kbGVTaG93UGFnZVVyaShyZXEucGFyYW1zKTtcbiAgY29uc3Qgc2FnYSA9IHJldHVyblNhZ2FXaXRoUGFyYW1zKFNhZ2FzLmhhbmRsZVNob3dQYWdlVXJpLCBhY3Rpb24pO1xuXG4gIC8vIHJ1biB0aGUgc2FnYSBtaWRkbGV3YXJlXG4gIHNhZ2FNaWRkbGV3YXJlXG4gICAgLnJ1bihzYWdhKVxuICAgIC5kb25lXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICAgICAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgICAgICA8QXBwIC8+XG4gICAgICAgICAgICA8L0dBTGlzdGVuZXI+XG4gICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICApO1xuXG4gICAgICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gICAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgICAgIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gICAgICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gICAgICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICAgIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gICAgICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG4gICAgfSk7XG5cbiAgY29uc29sZS5sb2coJ2hlbGxvIGZyb20gc3BlZS5jaCBoYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VydmVyID0gcmVxdWlyZSgnLi9zZXJ2ZXInKTtcblxuY29uc3QgZXhwb3J0cyA9IHtcbiAgU2VydmVyLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3BlZWNoLmpzIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IGNvb2tpZVNlc3Npb24gPSByZXF1aXJlKCdjb29raWUtc2Vzc2lvbicpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSByZXF1aXJlKCdtaWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMnKTtcbmNvbnN0IFBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBsb2dnZXJDb25maWcgPSByZXF1aXJlKCdsb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsQ29uZmlnID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcbmNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJ3NsYWNrQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIFNlcnZlciAoKSB7XG4gIHRoaXMuY29uZmlndXJlTG9nZ2VyID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBsb2dnZXJDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBteXNxbENvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2l0ZURldGFpbHMgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNpdGVDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNsYWNrID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBzbGFja0NvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQ2xpZW50QnVuZGxlID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnY29uZmlndXJlIHRoZSBjbGllbnQgaGVyZSBieSBwYXNzaW5nIGluIHRoZSBidW5kbGUgYW5kIGNvbmZpZ3VyaW5nIGl0LCBvciBiZXR0ZXIgeWV0OiB0YWtpbmcgaW4gdGhlIGNvbXBvbmVudHMgdG8gdXNlIGR5bmFtaWNhbGx5IGZyb20gaGVyZS4nKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVNb2RlbHMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdoZXJlIGlzIHdoZXJlIHlvdSBjb3VsZCBhZGQvb3ZlcndyaXRlIHRoZSBkZWZhdWx0IG1vZGVscycpXG4gIH07XG4gIHRoaXMuY29uZmlndXJlUm91dGVzID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCByb3V0ZXMnKVxuICB9O1xuICB0aGlzLmNyZWF0ZUFwcCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgYW4gRXhwcmVzcyBhcHBsaWNhdGlvblxuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuICAgIC8vIHRydXN0IHRoZSBwcm94eSB0byBnZXQgaXAgYWRkcmVzcyBmb3IgdXNcbiAgICBhcHAuZW5hYmxlKCd0cnVzdCBwcm94eScpO1xuXG4gICAgLyogYWRkIG1pZGRsZXdhcmUgKi9cbiAgICAvLyBzZXQgSFRUUCBoZWFkZXJzIHRvIHByb3RlY3QgYWdhaW5zdCB3ZWxsLWtub3duIHdlYiB2dWxuZXJhYmlsdGllc1xuICAgIGFwcC51c2UoaGVsbWV0KCkpO1xuICAgIC8vICdleHByZXNzLnN0YXRpYycgdG8gc2VydmUgc3RhdGljIGZpbGVzIGZyb20gcHVibGljIGRpcmVjdG9yeVxuICAgIGlmIChzaXRlQ29uZmlnLnJvdXRlcy5wdWJsaWNGb2xkZXIpIHtcbiAgICAgIC8vIHRha2UgaW4gYSBkaWZmZXJlbnQgcHVibGljIGZvbGRlciwgc28gaXQgY2FuIHNlcnZlIGl0J3Mgb3duIGJ1bmRsZSBpZiBuZWVkZWRcbiAgICAgIGNvbnN0IHB1YmxpY0ZvbGRlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBzaXRlQ29uZmlnLnJvdXRlcy5wdWJsaWNGb2xkZXIpO1xuICAgICAgYXBwLnVzZSgnL3N0YXRpYycsIGV4cHJlc3Muc3RhdGljKHB1YmxpY0ZvbGRlcikpO1xuICAgICAgbG9nZ2VyLmluZm8oJ3NlcnZpbmcgc3RhdGljIGZpbGVzIGZyb20gY3VzdG9tIHBhdGg6JywgcHVibGljRm9sZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHVibGljUGF0aCA9IFBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKTtcbiAgICAgIGFwcC51c2UoJy9zdGF0aWMnLCBleHByZXNzLnN0YXRpYyhwdWJsaWNQYXRoKSk7XG4gICAgICBsb2dnZXIuaW5mbygnc2VydmluZyBzdGF0aWMgZmlsZXMgZnJvbSBkZWZhdWx0IHBhdGg6JywgcHVibGljUGF0aCk7XG4gICAgfTtcbiAgICAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL2pzb25cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuXG4gICAgLy8gYWRkIGN1c3RvbSBtaWRkbGV3YXJlIChub3RlOiBidWlsZCBvdXQgdG8gYWNjZXB0IGR5bmFtaWNhbGx5IHVzZSB3aGF0IGlzIGluIHNlcnZlci9taWRkbGV3YXJlL1xuICAgIGFwcC51c2UocmVxdWVzdExvZ2dlcik7XG5cbiAgICAvLyBjb25maWd1cmUgcGFzc3BvcnRcbiAgICBjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG4gICAgLy8gaW5pdGlhbGl6ZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNlc3Npb25LZXkgPSBzaXRlQ29uZmlnLmF1dGguc2Vzc2lvbktleTtcbiAgICBhcHAudXNlKGNvb2tpZVNlc3Npb24oe1xuICAgICAgbmFtZSAgOiAnc2Vzc2lvbicsXG4gICAgICBrZXlzICA6IFtzZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShzcGVlY2hQYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2VzLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXNzZXRzLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvZmFsbGJhY2svJykoYXBwKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9O1xuICB0aGlzLmluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgdGhpcy5jcmVhdGVBcHAoKTtcbiAgICB0aGlzLnNlcnZlciA9IGh0dHAuU2VydmVyKHRoaXMuYXBwKTtcbiAgfTtcbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuICAgIGNvbnN0IFBPUlQgPSBzaXRlQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgICAvLyBzeW5jIHNlcXVlbGl6ZVxuICAgIGRiLnNlcXVlbGl6ZS5zeW5jKClcbiAgICAvLyBzdGFydCB0aGUgc2VydmVyXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VydmVyLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZlciBpcyBsaXN0ZW5pbmcgb24gUE9SVCAke1BPUlR9YCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBTdGFydHVwIEVycm9yOmAsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtaGFuZGxlYmFyc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXNlc3Npb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cFwiXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSAocmVxLCByZXMsIG5leHQpID0+IHsgIC8vIGN1c3RvbSBsb2dnaW5nIG1pZGRsZXdhcmUgdG8gbG9nIGFsbCBpbmNvbWluZyBodHRwIHJlcXVlc3RzXG4gIGxvZ2dlci52ZXJib3NlKGBSZXF1ZXN0IG9uICR7cmVxLm9yaWdpbmFsVXJsfSBmcm9tICR7cmVxLmlwfWApO1xuICBuZXh0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3RMb2dnZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbWlkZGxld2FyZS9yZXF1ZXN0TG9nZ2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBMb2dnZXJDb25maWcgKCkge1xuICB0aGlzLmxvZ0xldmVsID0gJ2RlYnVnJztcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBsb2dnZXIud2FybignTm8gbG9nZ2VyIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIHdpbnN0b24gbG9nZ2VyLi4uJyk7XG4gICAgLy8gdXBkYXRlIHZhbHVlcyB3aXRoIGxvY2FsIGNvbmZpZyBwYXJhbXNcbiAgICBjb25zdCB7bG9nTGV2ZWx9ID0gY29uZmlnO1xuICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcbiAgICAvLyBjb25maWd1cmUgdGhlIHdpbnN0b24gbG9nZ2VyXG4gICAgbG9nZ2VyLmNvbmZpZ3VyZSh7XG4gICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgIG5ldyAobG9nZ2VyLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubG9nTGV2ZWwsXG4gICAgICAgICAgdGltZXN0YW1wICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBwcmV0dHlQcmludCAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnMgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIC8vIHRlc3QgYWxsIHRoZSBsb2cgbGV2ZWxzXG4gICAgbG9nZ2VyLmluZm8oJ3Rlc3Rpbmcgd2luc3RvbiBsb2cgbGV2ZWxzLi4uJyk7XG4gICAgbG9nZ2VyLmVycm9yKCdMZXZlbCAwJyk7XG4gICAgbG9nZ2VyLndhcm4oJ0xldmVsIDEnKTtcbiAgICBsb2dnZXIuaW5mbygnTGV2ZWwgMicpO1xuICAgIGxvZ2dlci52ZXJib3NlKCdMZXZlbCAzJyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdMZXZlbCA0Jyk7XG4gICAgbG9nZ2VyLnNpbGx5KCdMZXZlbCA1Jyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb2dnZXJDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJjb25zdCB3aW5zdG9uU2xhY2tXZWJIb29rID0gcmVxdWlyZSgnd2luc3Rvbi1zbGFjay13ZWJob29rJykuU2xhY2tXZWJIb29rO1xuY29uc3Qgd2luc3RvbiA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU2xhY2tDb25maWcgKCkge1xuICB0aGlzLnNsYWNrV2ViSG9vayAgICAgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIHdpbnN0b24ud2FybignTm8gc2xhY2sgY29uZmlnIHJlY2VpdmVkJyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB2YXJpYWJsZXNcbiAgICB3aW5zdG9uLmluZm8oJ2NvbmZpZ3VyaW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLnNsYWNrV2ViSG9vayA9IHNsYWNrV2ViSG9vaztcbiAgICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gc2xhY2tFcnJvckNoYW5uZWw7XG4gICAgdGhpcy5zbGFja0luZm9DaGFubmVsID0gc2xhY2tJbmZvQ2hhbm5lbDtcbiAgICAvLyB1cGRhdGUgc2xhY2sgd2ViaG9vayBzZXR0aW5nc1xuICAgIGlmICh0aGlzLnNsYWNrV2ViSG9vaykge1xuICAgICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICAgIGlmICh0aGlzLnNsYWNrRXJyb3JDaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2stZXJyb3JzLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ3dhcm4nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6ZmFjZV93aXRoX2hlYWRfYmFuZGFnZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBpZiAoc2xhY2tJbmZvQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWluZm8tdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnaW5mbycsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0luZm9DaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOm5lcmRfZmFjZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICAvLyBzZW5kIHRlc3QgbWVzc2FnZXNcbiAgICAgIHdpbnN0b24uaW5mbygndGVzdGluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICAgIHdpbnN0b24uZXJyb3IoJ1NsYWNrIFwiZXJyb3JcIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbnN0b24ud2FybignU2xhY2sgbG9nZ2luZyBpcyBub3QgZW5hYmxlZCBiZWNhdXNlIG5vIHNsYWNrV2ViSG9vayBjb25maWcgdmFyIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNsYWNrQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIlxuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydFwiXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENlcnRpZmljYXRlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2VydGlmaWNhdGUnLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBrZXlUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwdWJsaWNLZXk6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2VydGlmaWNhdGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENlcnRpZmljYXRlLmJlbG9uZ3NUbyhkYi5DaGFubmVsLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChsb25nQ2hhbm5lbElkLCBjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCAke2NoYW5uZWxOYW1lfToke2xvbmdDaGFubmVsSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7bmFtZTogY2hhbm5lbE5hbWV9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwocykgZm91bmQgd2l0aCB0aGF0IGNoYW5uZWwgbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGxvbmdDaGFubmVsSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSAgIDogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtjaGFubmVsQ2xhaW1JZH0lYCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKCR7Y2hhbm5lbE5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjaGFubmVsTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS52YWxpZGF0ZUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgdmFsaWRhdGVMb25nQ2hhbm5lbElkKCR7bmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCAmJiAoY2hhbm5lbENsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDbGFpbUlkICYmIGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA8IDQwKSB7ICAvLyBpZiBhIHNob3J0IGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZShjaGFubmVsTmFtZSk7ICAvLyBpZiBubyBjaGFubmVsIGlkIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDZXJ0aWZpY2F0ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IENoYW5uZWwgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDaGFubmVsJyxcbiAgICB7XG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsQ2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENoYW5uZWwuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENoYW5uZWwuYmVsb25nc1RvKGRiLlVzZXIpO1xuICAgIENoYW5uZWwuaGFzT25lKGRiLkNlcnRpZmljYXRlKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIgfSkgPT4ge1xuICBjb25zdCBGaWxlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnRmlsZScsXG4gICAge1xuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICAgIDogSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdCAgOiAwLFxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVQYXRoOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVUeXBlOiB7XG4gICAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB0cmVuZGluZ0VsaWdpYmxlOiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgRmlsZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgRmlsZS5oYXNNYW55KGRiLlJlcXVlc3QpO1xuICAgIEZpbGUuaGFzT25lKGRiLkNsYWltKTtcbiAgfTtcblxuICBGaWxlLmdldFJlY2VudENsYWltcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWxsKHtcbiAgICAgIHdoZXJlOiB7IG5zZnc6IGZhbHNlLCB0cmVuZGluZ0VsaWdpYmxlOiB0cnVlIH0sXG4gICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICBsaW1pdDogMjUsXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEZpbGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9maWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgVEVYVCB9KSA9PiB7XG4gIGNvbnN0IFJlcXVlc3QgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdSZXF1ZXN0JyxcbiAgICB7XG4gICAgICBhY3Rpb246IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdXJsOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGlwQWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICB0eXBlICAgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBSZXF1ZXN0LmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBSZXF1ZXN0LmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJlcXVlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiY3J5cHRcIlxuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBuZXcgY2hhbm5lbCBzaWdudXAgcmVxdWVzdC4gdXNlcjogJHt1c2VybmFtZX0gcGFzczogJHtwYXNzd29yZH0gLmApO1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIC8vIHNlcnZlci1zaWRlIHZhbGlkYXRvbiBvZiBpbnB1dHMgKHVzZXJuYW1lLCBwYXNzd29yZClcblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhbm5lbCBhbmQgcmV0cmlldmUgdGhlIG1ldGFkYXRhXG4gICAgcmV0dXJuIGxicnlBcGkuY3JlYXRlQ2hhbm5lbChgQCR7dXNlcm5hbWV9YClcbiAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgIHVzZXJOYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyRGF0YSA+JywgdXNlckRhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgY2hhbm5lbERhdGEgPSB7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIGNoYW5uZWxDbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NoYW5uZWxEYXRhID4nLCBjaGFubmVsRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSBjZXJ0aWZpY2F0ZSByZWNvcmRcbiAgICAgICAgY29uc3QgY2VydGlmaWNhdGVEYXRhID0ge1xuICAgICAgICAgIGNsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICAgIG5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIC8vIGFkZHJlc3MsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjZXJ0aWZpY2F0ZURhdGEgPicsIGNlcnRpZmljYXRlRGF0YSk7XG4gICAgICAgIC8vIHNhdmUgdXNlciBhbmQgY2VydGlmaWNhdGUgdG8gZGJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi5Vc2VyLmNyZWF0ZSh1c2VyRGF0YSksIGRiLkNoYW5uZWwuY3JlYXRlKGNoYW5uZWxEYXRhKSwgZGIuQ2VydGlmaWNhdGUuY3JlYXRlKGNlcnRpZmljYXRlRGF0YSldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoW25ld1VzZXIsIG5ld0NoYW5uZWwsIG5ld0NlcnRpZmljYXRlXSkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgLy8gc3RvcmUgdGhlIHJlbGV2YW50IG5ld1VzZXIgaW5mbyB0byBiZSBwYXNzZWQgYmFjayBmb3IgcmVxLlVzZXJcbiAgICAgICAgdXNlckluZm9bJ2lkJ10gPSBuZXdVc2VyLmlkO1xuICAgICAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IG5ld1VzZXIudXNlck5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gbmV3Q2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAvLyBhc3NvY2lhdGUgdGhlIGluc3RhbmNlc1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld0NlcnRpZmljYXRlLnNldENoYW5uZWwobmV3Q2hhbm5lbCksIG5ld0NoYW5uZWwuc2V0VXNlcihuZXdVc2VyKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHVzZXJJbmZvLmNoYW5uZWxDbGFpbUlkLCB1c2VySW5mby5jaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdzaWdudXAgZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gcmV0dXJucyB1c2VyIGRhdGEgdG8gYmUgc2VyaWFsaXplZCBpbnRvIHNlc3Npb25cbiAgICBjb25zb2xlLmxvZygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBjb25zb2xlLmxvZygnZGVzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbmNvbnN0IGhhbmRsZVNpZ251cFJlcXVlc3QgPSByZXF1aXJlKCcuL3NpZ251cCcpO1xuY29uc3QgaGFuZGxlTG9naW5SZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dpbicpO1xuY29uc3QgaGFuZGxlTG9nb3V0UmVxdWVzdCA9IHJlcXVpcmUoJy4vbG9nb3V0Jyk7XG5jb25zdCBoYW5kbGVVc2VyUmVxdWVzdCA9IHJlcXVpcmUoJy4vdXNlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLnBvc3QoJy9zaWdudXAnLCBzcGVlY2hQYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLXNpZ251cCcpLCBoYW5kbGVTaWdudXBSZXF1ZXN0KTtcbiAgYXBwLnBvc3QoJy9sb2dpbicsIGhhbmRsZUxvZ2luUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9sb2dvdXQnLCBoYW5kbGVMb2dvdXRSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3VzZXInLCBoYW5kbGVVc2VyUmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2luZGV4LmpzIiwiY29uc3Qgc2lnbnVwID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZ251cDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9zaWdudXAuanMiLCJjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG5cbmNvbnN0IGxvZ2luID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtbG9naW4nLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICB9XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcS5sb2dJbih1c2VyLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KShyZXEsIHJlcywgbmV4dCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ2luLmpzIiwiY29uc3QgbG9nb3V0ID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcS5sb2dvdXQoKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICd5b3Ugc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dvdXQuanMiLCJjb25zdCB1c2VyID0gKHJlcSwgcmVzKSA9PiB7XG4gIGlmIChyZXEudXNlcikge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEudXNlcn0pO1xuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbid9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1c2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3VzZXIuanMiLCJjb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9jaGFubmVsQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjaGFubmVsQ2xhaW1zID0gcmVxdWlyZSgnLi9jaGFubmVsQ2xhaW1zJyk7XG5jb25zdCBjaGFubmVsRGF0YSA9IHJlcXVpcmUoJy4vY2hhbm5lbERhdGEnKTtcbmNvbnN0IGNoYW5uZWxTaG9ydElkID0gcmVxdWlyZSgnLi9jaGFubmVsU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NsYWltQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjbGFpbURhdGEgPSByZXF1aXJlKCcuL2NsYWltRGF0YScpO1xuY29uc3QgY2xhaW1HZXQgPSByZXF1aXJlKCcuL2NsYWltR2V0Jyk7XG5jb25zdCBjbGFpbUxvbmdJZCA9IHJlcXVpcmUoJy4vY2xhaW1Mb25nSWQnKTtcbmNvbnN0IGNsYWltUHVibGlzaCA9IHJlcXVpcmUoJy4vY2xhaW1QdWJsaXNoJyk7XG5jb25zdCBjbGFpbVJlc29sdmUgPSByZXF1aXJlKCcuL2NsYWltUmVzb2x2ZScpO1xuY29uc3QgY2xhaW1TaG9ydElkID0gcmVxdWlyZSgnLi9jbGFpbVNob3J0SWQnKTtcbmNvbnN0IGNsYWltTGlzdCA9IHJlcXVpcmUoJy4vY2xhaW1MaXN0Jyk7XG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9maWxlQXZhaWxhYmlsaXR5Jyk7XG5cbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSByZXF1aXJlKCdoZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIGNoYW5uZWwgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjaGFubmVsQXZhaWxhYmlsaXR5KTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjaGFubmVsU2hvcnRJZCk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9kYXRhLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQnLCBjaGFubmVsRGF0YSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsIGNoYW5uZWxDbGFpbXMpO1xuICAvLyBjbGFpbSByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9saXN0LzpuYW1lJywgY2xhaW1MaXN0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9nZXQvOm5hbWUvOmNsYWltSWQnLCBjbGFpbUdldCk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LzpuYW1lJywgY2xhaW1BdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Jlc29sdmUvOm5hbWUvOmNsYWltSWQnLCBjbGFpbVJlc29sdmUpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9wdWJsaXNoJywgbXVsdGlwYXJ0TWlkZGxld2FyZSwgY2xhaW1QdWJsaXNoKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgY2xhaW1TaG9ydElkKTtcbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vbG9uZy1pZCcsIGNsYWltTG9uZ0lkKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9kYXRhLzpjbGFpbU5hbWUvOmNsYWltSWQnLCBjbGFpbURhdGEpO1xuICAvLyBmaWxlIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2ZpbGUvYXZhaWxhYmlsaXR5LzpuYW1lLzpjbGFpbUlkJywgZmlsZUF2YWlsYWJpbGl0eSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvaW5kZXguanMiLCJjb25zdCB7IGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYXZhaWxhYmxlTmFtZSk7XG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IGdldENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgYWxsIGNsYWltcyBmb3IgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQ2xhaW1zID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgZ2V0Q2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbENsYWltcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxDbGFpbXMuanMiLCJjb25zdCBDTEFJTVNfUEVSX1BBR0UgPSAxMjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNsYWltcywgcGFnZSkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbFBhZ2VzKGNsYWltcyk7XG4gICAgY29uc3QgcGFnaW5hdGlvblBhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRQYWdlRnJvbVF1ZXJ5KHBhZ2UpO1xuICAgIGNvbnN0IHZpZXdEYXRhID0ge1xuICAgICAgY2hhbm5lbE5hbWUgICAgICAgOiBjaGFubmVsTmFtZSxcbiAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1zICAgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5leHRyYWN0UGFnZUZyb21DbGFpbXMoY2xhaW1zLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICBwcmV2aW91c1BhZ2UgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVByZXZpb3VzUGFnZShwYWdpbmF0aW9uUGFnZSksXG4gICAgICBjdXJyZW50UGFnZSAgICAgICA6IHBhZ2luYXRpb25QYWdlLFxuICAgICAgbmV4dFBhZ2UgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVOZXh0UGFnZSh0b3RhbFBhZ2VzLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICB0b3RhbFBhZ2VzICAgICAgICA6IHRvdGFsUGFnZXMsXG4gICAgICB0b3RhbFJlc3VsdHMgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsQ2xhaW1zKGNsYWltcyksXG4gICAgfTtcbiAgICByZXR1cm4gdmlld0RhdGE7XG4gIH0sXG4gIGdldFBhZ2VGcm9tUXVlcnkgKHBhZ2UpIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIChjbGFpbXMsIHBhZ2VOdW1iZXIpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIFtdOyAgLy8gaWYgbm8gY2xhaW1zLCByZXR1cm4gdGhpcyBkZWZhdWx0XG4gICAgfVxuICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2xhaW1zIGlzIGFycmF5PycsIEFycmF5LmlzQXJyYXkoY2xhaW1zKSk7XG4gICAgLy8gbG9nZ2VyLmRlYnVnKGBwYWdlTnVtYmVyICR7cGFnZU51bWJlcn0gaXMgbnVtYmVyP2AsIE51bWJlci5pc0ludGVnZXIocGFnZU51bWJlcikpO1xuICAgIGNvbnN0IGNsYWltU3RhcnRJbmRleCA9IChwYWdlTnVtYmVyIC0gMSkgKiBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgY2xhaW1FbmRJbmRleCA9IGNsYWltU3RhcnRJbmRleCArIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBwYWdlT2ZDbGFpbXMgPSBjbGFpbXMuc2xpY2UoY2xhaW1TdGFydEluZGV4LCBjbGFpbUVuZEluZGV4KTtcbiAgICByZXR1cm4gcGFnZU9mQ2xhaW1zO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbFBhZ2VzIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvdGFsQ2xhaW1zID0gY2xhaW1zLmxlbmd0aDtcbiAgICAgIGlmICh0b3RhbENsYWltcyA8IENMQUlNU19QRVJfUEFHRSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZ1bGxQYWdlcyA9IE1hdGguZmxvb3IodG90YWxDbGFpbXMgLyBDTEFJTVNfUEVSX1BBR0UpO1xuICAgICAgY29uc3QgcmVtYWluZGVyID0gdG90YWxDbGFpbXMgJSBDTEFJTVNfUEVSX1BBR0U7XG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmdWxsUGFnZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVsbFBhZ2VzICsgMTtcbiAgICB9XG4gIH0sXG4gIGRldGVybWluZVByZXZpb3VzUGFnZSAoY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgLSAxO1xuICB9LFxuICBkZXRlcm1pbmVOZXh0UGFnZSAodG90YWxQYWdlcywgY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgKyAxO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbENsYWltcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY2xhaW1zLmxlbmd0aDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IHsgZ2V0Q2hhbm5lbERhdGEgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgZGF0YSBmb3IgYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxEYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gIGdldENoYW5uZWxEYXRhKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgMClcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsRGF0YTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxEYXRhLmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbnJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcblxuKi9cblxuY29uc3QgY2hhbm5lbFNob3J0SWRSb3V0ZSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oc2hvcnRJZCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsU2hvcnRJZFJvdXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbFNob3J0SWQuanMiLCJjb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1BdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUF2YWlsYWJpbGl0eS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHJldHVybiBkYXRhIGZvciBhIGNsYWltXG5cbiovXG5cbmNvbnN0IGNsYWltRGF0YSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjbGFpbU5hbWUgPSBwYXJhbXMuY2xhaW1OYW1lO1xuICBsZXQgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAudGhlbihjbGFpbUluZm8gPT4ge1xuICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIGNsYWltIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1EYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1EYXRhLmpzIiwiY29uc3QgeyBnZXRDbGFpbSB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhLCBjcmVhdGVGaWxlRGF0YSB9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1HZXQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIC8vIHJlc29sdmUgdGhlIGNsYWltXG4gIGRiLkNsYWltLnJlc29sdmVDbGFpbShuYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgLy8gbWFrZSBzdXJlIGEgY2xhaW0gYWN0dWFsbHkgZXhpc3RzIGF0IHRoYXQgdXJpXG4gICAgICBpZiAoIXJlc29sdmVSZXN1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgIH1cbiAgICAgIGxldCBmaWxlRGF0YSA9IGNyZWF0ZUZpbGVEYXRhKHJlc29sdmVSZXN1bHQpO1xuICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlRGF0YSwgZ2V0Q2xhaW0oYCR7bmFtZX0jJHtjbGFpbUlkfWApXSk7XG4gICAgfSlcbiAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgIGZpbGVEYXRhID0gYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEoZmlsZURhdGEsIGdldFJlc3VsdCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlRGF0YSwge25hbWUsIGNsYWltSWR9LCAnRmlsZScpLCBnZXRSZXN1bHRdKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVSZWNvcmQsIHttZXNzYWdlLCBjb21wbGV0ZWR9IF0pID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZSwgY29tcGxldGVkIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1HZXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1JZCB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIGxvbmcgY2xhaW0gaWRcblxuKi9cblxuY29uc3QgY2xhaW1Mb25nSWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICBjb25zdCBjaGFubmVsQ2xhaW1JZCA9IGJvZHkuY2hhbm5lbENsYWltSWQ7XG4gIGNvbnN0IGNsYWltTmFtZSA9IGJvZHkuY2xhaW1OYW1lO1xuICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1Mb25nSWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsImNvbnN0IHsgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zLCBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zLCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSwgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIH0gPSByZXF1aXJlKCdoZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlLCBwdWJsaXNoIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCdhdXRoL2F1dGhlbnRpY2F0aW9uLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBwdWJsaXNoIGEgY2xhaW0gdGhyb3VnaCB0aGUgZGFlbW9uXG5cbiovXG5cbmNvbnN0IGNsYWltUHVibGlzaCA9ICh7IGJvZHksIGZpbGVzLCBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHVzZXIgfSwgcmVzKSA9PiB7XG4gIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgbGV0ICBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIGRlc2NyaXB0aW9uLCBmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgbGljZW5zZSwgbmFtZSwgbnNmdywgdGh1bWJuYWlsLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlLCB0aXRsZTtcbiAgLy8gcmVjb3JkIHRoZSBzdGFydCB0aW1lIG9mIHRoZSByZXF1ZXN0XG4gIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgLy8gdmFsaWRhdGUgdGhlIGJvZHkgYW5kIGZpbGVzIG9mIHRoZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keShib2R5KSk7XG4gICAgKHtmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyhmaWxlcykpO1xuICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBjaGVjayBjaGFubmVsIGF1dGhvcml6YXRpb25cbiAgUHJvbWlzZVxuICAgIC5hbGwoW1xuICAgICAgYXV0aGVudGljYXRlVXNlcihjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpLFxuICAgICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSksXG4gICAgICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSxcbiAgICAgIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXModGh1bWJuYWlsRmlsZVBhdGgsIG5hbWUsIGxpY2Vuc2UsIG5zZncpLFxuICAgIF0pXG4gICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgLy8gYWRkIGNoYW5uZWwgZGV0YWlscyB0byB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX2lkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgIH1cbiAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgaWYgKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMpIHtcbiAgICAgICAgcHVibGlzaCh0aHVtYm5haWxQdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVR5cGUpO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgYXNzZXRcbiAgICAgIHJldHVybiBwdWJsaXNoKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSk7XG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiAncHVibGlzaCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgZGF0YSAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgY2xhaW1JZDogcmVzdWx0LmNsYWltX2lkLFxuICAgICAgICAgIHVybCAgICA6IGAke2hvc3R9LyR7cmVzdWx0LmNsYWltX2lkfS8ke25hbWV9YCxcbiAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdwdWJsaXNoJywgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUHVibGlzaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUHVibGlzaC5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRoZW50aWNhdGVVc2VyIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpIHtcbiAgICAvLyBjYXNlOiBubyBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCAoYW5vbnltb3VzKSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVzZXIgdG9rZW4gaXMgcHJvdmlkZWRcbiAgICBpZiAoIWNoYW5uZWxOYW1lICYmICFjaGFubmVsSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiBudWxsLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggdXNlciB0b2tlblxuICAgIGlmICh1c2VyKSB7XG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbE5hbWUgIT09IHVzZXIuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBuYW1lIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFubmVsSWQgJiYgY2hhbm5lbElkICE9PSB1c2VyLmNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgaWQgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiB1c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCBwYXNzd29yZCBpbnN0ZWFkIG9mIHVzZXIgdG9rZW5cbiAgICBpZiAoIWNoYW5uZWxQYXNzd29yZCkgdGhyb3cgbmV3IEVycm9yKCdubyBjaGFubmVsIHBhc3N3b3JkIHByb3ZpZGVkJyk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyhjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQpO1xuICB9LFxuICBhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIHVzZXJQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBob2lzdGVkIHZhcmlhYmxlc1xuICAgICAgbGV0IGNoYW5uZWxEYXRhO1xuICAgICAgLy8gYnVpbGQgdGhlIHBhcmFtcyBmb3IgZmluZGluZyB0aGUgY2hhbm5lbFxuICAgICAgbGV0IGNoYW5uZWxGaW5kUGFyYW1zID0ge307XG4gICAgICBpZiAoY2hhbm5lbE5hbWUpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICBpZiAoY2hhbm5lbElkKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxJZDtcbiAgICAgIC8vIGZpbmQgdGhlIGNoYW5uZWxcbiAgICAgIGRiLkNoYW5uZWxcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiBjaGFubmVsRmluZFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIGNoYW5uZWwgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGFubmVsRGF0YSA9IGNoYW5uZWwuZ2V0KCk7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIGRhdGE6JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAgIHJldHVybiBkYi5Vc2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgdXNlck5hbWU6IGNoYW5uZWxEYXRhLmNoYW5uZWxOYW1lLnN1YnN0cmluZygxKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZCh1c2VyUGFzc3dvcmQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCcuLi5wYXNzd29yZCB3YXMgYSBtYXRjaC4uLicpO1xuICAgICAgICAgIHJlc29sdmUoY2hhbm5lbERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgeyByZXNvbHZlVXJpIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1SZXNvbHZlID0gKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIHJlc29sdmVVcmkoYCR7cGFyYW1zLm5hbWV9IyR7cGFyYW1zLmNsYWltSWR9YClcbiAgICAudGhlbihyZXNvbHZlZFVyaSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVJlc29sdmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVJlc29sdmUuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcblxuKi9cblxuY29uc3QgY2xhaW1TaG9ydElkID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVNob3J0SWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVNob3J0SWQuanMiLCJjb25zdCB7IGdldENsYWltTGlzdCB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBsaXN0IG9mIGNsYWltc1xuXG4qL1xuXG5jb25zdCBjbGFpbUxpc3QgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZ2V0Q2xhaW1MaXN0KHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKGNsYWltc0xpc3QgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcblxuKi9cblxuY29uc3QgZmlsZUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgZGIuRmlsZVxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGNsYWltSWQsXG4gICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiB0cnVlfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGVBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9maWxlQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgbXVsdGlwYXJ0ID0gcmVxdWlyZSgnY29ubmVjdC1tdWx0aXBhcnR5Jyk7XHJcbmNvbnN0IHsgcHVibGlzaGluZzogeyB1cGxvYWREaXJlY3RvcnkgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xyXG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gbXVsdGlwYXJ0KHt1cGxvYWREaXI6IHVwbG9hZERpcmVjdG9yeX0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBhcnRNaWRkbGV3YXJlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tdWx0aXBhcnR5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCJcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcbmNvbnN0IGhhbmRsZUVtYmVkUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZEVtYmVkUGFnZScpO1xuY29uc3QgcmVkaXJlY3QgPSByZXF1aXJlKCcuL3JlZGlyZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAuZ2V0KCcvJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbG9naW4nLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9hYm91dCcsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgcmVkaXJlY3QoJy9wb3B1bGFyJykpO1xuICBhcHAuZ2V0KCcvcG9wdWxhcicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL25ldycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgaGFuZGxlRW1iZWRSZXF1ZXN0KTsgIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJjb25zdCB7IGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IHNlbmRFbWJlZFBhZ2UgPSAoeyBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAvLyBnZXQgYW5kIHJlbmRlciB0aGUgY29udGVudFxuICByZXMuc3RhdHVzKDIwMCkucmVuZGVyKCdlbWJlZCcsIHsgbGF5b3V0OiAnZW1iZWQnLCBob3N0LCBjbGFpbUlkLCBuYW1lIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kRW1iZWRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwiY29uc3QgcmVkaXJlY3QgPSAocm91dGUpID0+IHtcbiAgcmV0dXJuIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zdGF0dXMoMzAxKS5yZWRpcmVjdChyb3V0ZSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZGlyZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9yZWRpcmVjdC5qcyIsImNvbnN0IHNlcnZlQXNzZXRCeUNsYWltID0gcmVxdWlyZSgnLi9zZXJ2ZUFzc2V0QnlDbGFpbScpO1xuY29uc3Qgc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltID0gcmVxdWlyZSgnLi9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwLCBkYikgPT4ge1xuICBhcHAuZ2V0KCcvOmlkZW50aWZpZXIvOmNsYWltJywgc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltKTtcbiAgYXBwLmdldCgnLzpjbGFpbScsIHNlcnZlQXNzZXRCeUNsYWltKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9pbmRleC5qcyIsImNvbnN0IHsgc2VuZEdBU2VydmVFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MnKTtcbmNvbnN0IHsgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlLCBsb2dSZXF1ZXN0RGF0YSwgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlcnZlIGFuIGFzc2V0IG9yIHRoZSByZWFjdCBhcHAgdmlhIHRoZSBjbGFpbSBuYW1lIG9ubHlcblxuKi9cblxuY29uc3Qgc2VydmVyQXNzZXRCeUNsYWltID0gKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgfVxuICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgbGV0IGNsYWltTmFtZTtcbiAgdHJ5IHtcbiAgICAoe2NsYWltTmFtZX0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIG51bGwsIG51bGwpO1xuICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChudWxsLCBudWxsLCBjbGFpbU5hbWUsIG51bGwsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmVyQXNzZXRCeUNsYWltO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYVwiXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3Qge1xuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUsXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHksXG4gIGxvZ1JlcXVlc3REYXRhLFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCxcbn0gPSByZXF1aXJlKCdoZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlcnZlIGFuIGFzc2V0IG9yIHRoZSByZWFjdCBhcHAgdmlhIHRoZSBjbGFpbSBuYW1lIGFuZCBhbiBpZGVudGlmaWVyXG5cbiovXG5cbmNvbnN0IHNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0gPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICB9XG4gIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gIC8vIHBhcnNlIHRoZSBjbGFpbVxuICBsZXQgY2xhaW1OYW1lO1xuICB0cnkge1xuICAgICh7IGNsYWltTmFtZSB9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBwYXJzZSB0aGUgaWRlbnRpZmllclxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKHBhcmFtcy5pZGVudGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGlmICghaXNDaGFubmVsKSB7XG4gICAgW2NsYWltSWQsIGNsYWltTmFtZV0gPSBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5KGNsYWltSWQsIGNsYWltTmFtZSk7XG4gIH1cbiAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpO1xuICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltLmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRSZWFjdEFwcCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XHJcbiAgYXBwLmdldCgnKicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9zZW5kUmVhY3RBcHAuanMiXSwic291cmNlUm9vdCI6IiJ9