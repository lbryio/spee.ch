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
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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


module.exports = {
  wallet: {
    lbryClaimAddress: 'bDZ2wPwtULUGxT7GXuNLpQhXmdPRUTUkcL' // choose an address from your lbry wallet
  },
  analytics: {
    googleId: 'UA-60403362-3' // google id for analytics tracking; leave `null` if not applicable
  },
  sql: {
    database: 'lbry', // name of mysql database
    username: 'lbry', // username for mysql
    password: 'yYa5B6f7WuGq1613q9D7UWP3HT' // password for mysql
  },
  logging: {
    logLevel: 'debug', // options: silly, debug, verbose, info
    slackWebHook: 'https://hooks.slack.com/services/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', // enter a webhook if you wish to push logs to slack; otherwise leave as `null`
    slackErrorChannel: null, // enter a slack channel (#example) for errors to be sent to; otherwise leave null
    slackInfoChannel: '#speech-dev1-errors' // enter a slack channel (#info) for info level logs to be sent to otherwise leave null
  },
  session: {
    sessionKey: 'nans$#kfjanwe234rydns' // enter a secret key to be used for session encryption
  },
  files: {
    uploadDirectory: '/home/lbry/Uploads' // enter file path to where uploads/publishes should be stored
  },
  site: {
    title: 'dev1.Spee.ch',
    name: 'dev1.Spee.ch',
    host: 'https://dev1.spee.ch'
  },
  claim: {
    defaultTitle: 'dev1 Spee.ch',
    defaultThumbnail: 'https://spee.ch/assets/img/video_thumb_default.png',
    defaultDescription: 'Open-source, decentralized image and video sharing.'
  },
  testing: {
    testChannel: '@test', // a channel to make test publishes in
    testChannelPassword: '1234' // password for the test channel
  },
  api: {
    apiHost: 'localhost',
    apiPort: '5279'
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var fs = __webpack_require__(5);
var path = __webpack_require__(21);
var Sequelize = __webpack_require__(22);
var basename = path.basename(module.filename);
var logger = __webpack_require__(0);
var config = __webpack_require__(1);
var _config$sql = config.sql,
    database = _config$sql.database,
    username = _config$sql.username,
    password = _config$sql.password;

var db = {};

// set sequelize options
var sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: { decimalNumbers: true }, // fix to ensure DECIMAL will not be stored as a string
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 10000
  }
});

sequelize.authenticate().then(function () {
  logger.info('Sequelize has established mysql connection successfully.');
}).catch(function (err) {
  logger.error('Sequelize was unable to connect to the database:', err);
});

// add each model to the db object
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

// run model.association for each model in the db object that has an association
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    logger.info('Associating model:', modelName);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// add an 'upsert' method to the db object
db.upsert = function (Model, values, condition, tableName) {
  return Model.findOne({ where: condition }).then(function (obj) {
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

// add a 'getTrendingFiles' method to the db object.  note: change this to get claims directly.  might need new association between Request and Claim
db.getTrendingFiles = function (startDate) {
  return db.sequelize.query('SELECT COUNT(*), File.* FROM Request LEFT JOIN File ON Request.FileId = File.id WHERE FileId IS NOT NULL AND nsfw != 1 AND trendingEligible = 1 AND Request.createdAt > "' + startDate + '" GROUP BY FileId ORDER BY COUNT(*) DESC LIMIT 25;', { type: db.sequelize.QueryTypes.SELECT });
};

module.exports = db;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(29);
var logger = __webpack_require__(0);
var config = __webpack_require__(1);
var _config$api = config.api,
    apiHost = _config$api.apiHost,
    apiPort = _config$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

function handleLbrynetResponse(_ref, resolve, reject) {
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
}

module.exports = {
  publishClaim: function publishClaim(publishParams) {
    logger.debug('lbryApi >> Publishing claim to "' + publishParams.name + '"');
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'publish',
        params: publishParams
      }).then(function (response) {
        handleLbrynetResponse(response, resolve, reject);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getClaim: function getClaim(uri) {
    logger.debug('lbryApi >> Getting Claim for "' + uri + '"');
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'get',
        params: { uri: uri, timeout: 20 }
      }).then(function (response) {
        handleLbrynetResponse(response, resolve, reject);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  getClaimList: function getClaimList(claimName) {
    logger.debug('lbryApi >> Getting claim_list for "' + claimName + '"');
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'claim_list',
        params: { name: claimName }
      }).then(function (response) {
        handleLbrynetResponse(response, resolve, reject);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  resolveUri: function resolveUri(uri) {
    logger.debug('lbryApi >> Resolving URI for "' + uri + '"');
    // console.log('resolving uri', uri);
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'resolve',
        params: { uri: uri }
      }).then(function (_ref2) {
        var data = _ref2.data;

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
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'settings_get'
      }).then(function (_ref3) {
        var data = _ref3.data;

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
    return new Promise(function (resolve, reject) {
      axios.post(lbryApiUri, {
        method: 'channel_new',
        params: {
          channel_name: name,
          amount: 0.1
        }
      }).then(function (response) {
        logger.verbose('createChannel response:', response);
        handleLbrynetResponse(response, resolve, reject);
      }).catch(function (error) {
        logger.error('createChannel error:', error);
        reject(error);
      });
    });
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var fs = __webpack_require__(5);

var _require = __webpack_require__(1),
    site = _require.site,
    wallet = _require.wallet;

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
    var file = _ref2.file;

    logger.debug('file', file);
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
      logger.debug('publish > file validation > file name had apostrophe in it');
      throw new Error('apostrophes are not allowed in the file name');
    }
    // validate the file
    module.exports.validateFileTypeAndSize(file);
    // return results
    return {
      fileName: file.name,
      filePath: file.path,
      fileType: file.type
    };
  },
  parsePublishApiChannel: function parsePublishApiChannel(_ref3, user) {
    var channelName = _ref3.channelName,
        channelPassword = _ref3.channelPassword;

    logger.debug('publish api parser input:', { channelName: channelName, channelPassword: channelPassword, user: user });
    // if anonymous or '' provided, publish will be anonymous (even if client is logged in)
    // if a channel name is provided...
    if (channelName) {
      // make sure a password was provided if no user token is provided
      if (!user && !channelPassword) {
        throw new Error('Unauthenticated channel name provided without password');
      }
      // if request comes from the client with a token
      // ensure this publish uses that channel name
      if (user) {
        channelName = user.channelName;
      };
      // add the @ if the channel name is missing it
      if (channelName.indexOf('@') !== 0) {
        channelName = '@' + channelName;
      }
    }
    return {
      channelName: channelName,
      channelPassword: channelPassword
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
  createPublishParams: function createPublishParams(filePath, name, title, description, license, nsfw, thumbnail, channelName) {
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
        author: site.title,
        language: 'en',
        license: license,
        nsfw: nsfw
      },
      claim_address: wallet.lbryClaimAddress
    };
    // add thumbnail to channel if video
    if (thumbnail !== null) {
      publishParams['metadata']['thumbnail'] = thumbnail;
    }
    // add channel to params, if applicable
    if (channelName) {
      publishParams['channel_name'] = channelName;
    }
    return publishParams;
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
  createFileData: function createFileData(_ref4) {
    var name = _ref4.name,
        claimId = _ref4.claimId,
        outpoint = _ref4.outpoint,
        height = _ref4.height,
        address = _ref4.address,
        nsfw = _ref4.nsfw,
        contentType = _ref4.contentType;

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var ua = __webpack_require__(35);
var config = __webpack_require__(1);
var googleApiKey = config.analytics.googleId;

function createServeEventParams(headers, ip, originalUrl) {
  return {
    eventCategory: 'client requests',
    eventAction: 'serve request',
    eventLabel: originalUrl,
    ipOverride: ip,
    userAgentOverride: headers['user-agent']
  };
};

function createPublishTimingEventParams(label, startTime, endTime, ip, headers) {
  var durration = endTime - startTime;
  return {
    userTimingCategory: 'lbrynet',
    userTimingVariableName: 'publish',
    userTimingTime: durration,
    userTimingLabel: label,
    uip: ip,
    userAgentOverride: headers['user-agent']
  };
};

function sendGoogleAnalyticsEvent(ip, params) {
  var visitorId = ip.replace(/\./g, '-');
  var visitor = ua(googleApiKey, visitorId, { strictCidFormat: false, https: true });
  visitor.event(params, function (err) {
    if (err) {
      logger.error('Google Analytics Event Error >>', err);
    }
  });
};

function sendGoogleAnalyticsTiming(ip, params) {
  var visitorId = ip.replace(/\./g, '-');
  var visitor = ua(googleApiKey, visitorId, { strictCidFormat: false, https: true });
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
  sendGAAnonymousPublishTiming: function sendGAAnonymousPublishTiming(headers, ip, originalUrl, startTime, endTime) {
    var params = createPublishTimingEventParams('anonymous', startTime, endTime, ip, headers);
    sendGoogleAnalyticsTiming(ip, params);
  },
  sendGAChannelPublishTiming: function sendGAChannelPublishTiming(headers, ip, originalUrl, startTime, endTime) {
    var params = createPublishTimingEventParams('anonymous', startTime, endTime, ip, headers);
    sendGoogleAnalyticsTiming(ip, params);
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(2);
var logger = __webpack_require__(0);

var _require = __webpack_require__(37),
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// load dependencies
var express = __webpack_require__(14);
var bodyParser = __webpack_require__(15);
var expressHandlebars = __webpack_require__(16);
var Handlebars = __webpack_require__(4);
var handlebarsHelpers = __webpack_require__(17);

var _require = __webpack_require__(18),
    populateLocalsDotUser = _require.populateLocalsDotUser,
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

var config = __webpack_require__(1);
var logger = __webpack_require__(0);
var helmet = __webpack_require__(19);
var PORT = 3000; // set port
var app = express(); // create an Express application
var db = __webpack_require__(2); // require our models for syncing
var passport = __webpack_require__(6);
var cookieSession = __webpack_require__(23);

// configure logging
var logLevel = config.logging.logLevel;
__webpack_require__(24)(logger, logLevel);
__webpack_require__(25)(logger);

// check for global config variables
__webpack_require__(27)();

// trust the proxy to get ip address for us
app.enable('trust proxy');

// add middleware
app.use(helmet()); // set HTTP headers to protect against well-known web vulnerabilties
app.use(express.static(__dirname + '/public')); // 'express.static' to serve static files from public directory
app.use(bodyParser.json()); // 'body parser' for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // 'body parser' for parsing application/x-www-form-urlencoded
app.use(function (req, res, next) {
  // custom logging middleware to log all incoming http requests
  logger.verbose('Request on ' + req.originalUrl + ' from ' + req.ip);
  next();
});

// configure passport
passport.serializeUser(serializeSpeechUser);
passport.deserializeUser(deserializeSpeechUser);
var localSignupStrategy = __webpack_require__(28);
var localLoginStrategy = __webpack_require__(30);
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
// initialize passport
app.use(cookieSession({
  name: 'session',
  keys: [config.session.sessionKey],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

// configure handlebars & register it with express app
var hbs = expressHandlebars.create({
  defaultLayout: 'main', // sets the default layout
  handlebars: Handlebars, // includes basic handlebars for access to that library
  helpers: handlebarsHelpers // custom defined helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware to pass user info back to client (for handlebars access), if user is logged in
app.use(populateLocalsDotUser);

// start the server
db.sequelize.sync() // sync sequelize
.then(function () {
  // require routes
  __webpack_require__(31)(app);
  __webpack_require__(32)(app);
  __webpack_require__(38)(app);
  __webpack_require__(39)(app);
  __webpack_require__(42)(app);
  var http = __webpack_require__(43);
  return http.Server(app);
}).then(function (server) {
  // start the server
  server.listen(PORT, function () {
    logger.info('Trusting proxy?', app.get('trust proxy'));
    logger.info('Server is listening on PORT ' + PORT);
  });
}).catch(function (error) {
  logger.error('Startup Error >> ' + error.message, error);
});

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Handlebars = __webpack_require__(4);

var _require = __webpack_require__(1),
    site = _require.site,
    claimDefaults = _require.claim;

function determineOgTitle(storedTitle, defaultTitle) {
  return ifEmptyReturnOther(storedTitle, defaultTitle);
};

function determineOgDescription(storedDescription, defaultDescription) {
  var length = 200;
  var description = ifEmptyReturnOther(storedDescription, defaultDescription);
  if (description.length >= length) {
    description = description.substring(0, length) + '...';
  };
  return description;
};

function ifEmptyReturnOther(value, replacement) {
  if (value === '') {
    return replacement;
  }
  return value;
}

function determineContentTypeFromFileExtension(fileExtension) {
  switch (fileExtension) {
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'mp4':
      return 'video/mp4';
    default:
      return 'image/jpeg';
  }
};

function determineOgThumbnailContentType(thumbnail) {
  if (thumbnail) {
    if (thumbnail.lastIndexOf('.') !== -1) {
      return determineContentTypeFromFileExtension(thumbnail.substring(thumbnail.lastIndexOf('.')));
    }
  }
  return '';
}

function createOpenGraphDataFromClaim(claim, defaultTitle, defaultDescription) {
  var openGraphData = {};
  openGraphData['embedUrl'] = site.host + '/' + claim.claimId + '/' + claim.name;
  openGraphData['showUrl'] = site.host + '/' + claim.claimId + '/' + claim.name;
  openGraphData['source'] = site.host + '/' + claim.claimId + '/' + claim.name + '.' + claim.fileExt;
  openGraphData['directFileUrl'] = site.host + '/' + claim.claimId + '/' + claim.name + '.' + claim.fileExt;
  openGraphData['ogTitle'] = determineOgTitle(claim.title, defaultTitle);
  openGraphData['ogDescription'] = determineOgDescription(claim.description, defaultDescription);
  openGraphData['ogThumbnailContentType'] = determineOgThumbnailContentType(claim.thumbnail);
  return openGraphData;
};

module.exports = {
  placeCommonHeaderTags: function placeCommonHeaderTags() {
    var headerBoilerplate = '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>' + site.title + '</title><link rel="stylesheet" href="/assets/css/reset.css" type="text/css"><link rel="stylesheet" href="/assets/css/general.css" type="text/css"><link rel="stylesheet" href="/assets/css/mediaQueries.css" type="text/css">';
    return new Handlebars.SafeString(headerBoilerplate);
  },
  addOpenGraph: function addOpenGraph(claim) {
    var _createOpenGraphDataF = createOpenGraphDataFromClaim(claim, claimDefaults.defaultTitle, claimDefaults.defaultDescription),
        ogTitle = _createOpenGraphDataF.ogTitle,
        ogDescription = _createOpenGraphDataF.ogDescription,
        showUrl = _createOpenGraphDataF.showUrl,
        source = _createOpenGraphDataF.source,
        ogThumbnailContentType = _createOpenGraphDataF.ogThumbnailContentType;

    var thumbnail = claim.thumbnail;
    var contentType = claim.contentType;
    var ogTitleTag = '<meta property="og:title" content="' + ogTitle + '" />';
    var ogUrlTag = '<meta property="og:url" content="' + showUrl + '" />';
    var ogSiteNameTag = '<meta property="og:site_name" content="' + site.title + '" />';
    var ogDescriptionTag = '<meta property="og:description" content="' + ogDescription + '" />';
    var ogImageWidthTag = '<meta property="og:image:width" content="600" />';
    var ogImageHeightTag = '<meta property="og:image:height" content="315" />';
    var basicTags = ogTitleTag + ' ' + ogUrlTag + ' ' + ogSiteNameTag + ' ' + ogDescriptionTag + ' ' + ogImageWidthTag + ' ' + ogImageHeightTag;
    var ogImageTag = '<meta property="og:image" content="' + source + '" />';
    var ogImageTypeTag = '<meta property="og:image:type" content="' + contentType + '" />';
    var ogTypeTag = '<meta property="og:type" content="article" />';
    if (contentType === 'video/mp4') {
      var ogVideoTag = '<meta property="og:video" content="' + source + '" />';
      var ogVideoSecureUrlTag = '<meta property="og:video:secure_url" content="' + source + '" />';
      var ogVideoTypeTag = '<meta property="og:video:type" content="' + contentType + '" />';
      ogImageTag = '<meta property="og:image" content="' + thumbnail + '" />';
      ogImageTypeTag = '<meta property="og:image:type" content="' + ogThumbnailContentType + '" />';
      ogTypeTag = '<meta property="og:type" content="video" />';
      return new Handlebars.SafeString(basicTags + ' ' + ogImageTag + ' ' + ogImageTypeTag + ' ' + ogTypeTag + ' ' + ogVideoTag + ' ' + ogVideoSecureUrlTag + ' ' + ogVideoTypeTag);
    } else {
      if (contentType === 'image/gif') {
        ogTypeTag = '<meta property="og:type" content="video.other" />';
      };
      return new Handlebars.SafeString(basicTags + ' ' + ogImageTag + ' ' + ogImageTypeTag + ' ' + ogTypeTag);
    }
  },
  addTwitterCard: function addTwitterCard(claim) {
    var _createOpenGraphDataF2 = createOpenGraphDataFromClaim(claim, claimDefaults.defaultTitle, claimDefaults.defaultDescription),
        embedUrl = _createOpenGraphDataF2.embedUrl,
        directFileUrl = _createOpenGraphDataF2.directFileUrl;

    var basicTwitterTags = '<meta name="twitter:site" content="@spee_ch" >';
    var contentType = claim.contentType;
    if (contentType === 'video/mp4') {
      var twitterName = '<meta name="twitter:card" content="player" >';
      var twitterPlayer = '<meta name="twitter:player" content="' + embedUrl + '" >';
      var twitterPlayerWidth = '<meta name="twitter:player:width" content="600" >';
      var twitterTextPlayerWidth = '<meta name="twitter:text:player_width" content="600" >';
      var twitterPlayerHeight = '<meta name="twitter:player:height" content="337" >';
      var twitterPlayerStream = '<meta name="twitter:player:stream" content="' + directFileUrl + '" >';
      var twitterPlayerStreamContentType = '<meta name="twitter:player:stream:content_type" content="video/mp4" >';
      return new Handlebars.SafeString(basicTwitterTags + ' ' + twitterName + ' ' + twitterPlayer + ' ' + twitterPlayerWidth + ' ' + twitterTextPlayerWidth + ' ' + twitterPlayerHeight + ' ' + twitterPlayerStream + ' ' + twitterPlayerStreamContentType);
    } else {
      var twitterCard = '<meta name="twitter:card" content="summary_large_image" >';
      return new Handlebars.SafeString(basicTwitterTags + ' ' + twitterCard);
    }
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const db = require('../models'); // require our models for syncing
var logger = __webpack_require__(0);

module.exports = {
  populateLocalsDotUser: function populateLocalsDotUser(req, res, next) {
    if (req.user) {
      logger.debug('populating res.locals.user');
      res.locals.user = {
        id: req.user.id,
        userName: req.user.userName,
        channelName: req.user.channelName,
        channelClaimId: req.user.channelClaimId,
        shortChannelId: req.user.shortChannelId
      };
    }
    next();
  },
  serializeSpeechUser: function serializeSpeechUser(user, done) {
    // returns user data to be serialized into session
    logger.debug('serializing user');
    done(null, user);
  },
  deserializeSpeechUser: function deserializeSpeechUser(user, done) {
    // deserializes session and populates additional info to req.user
    logger.debug('deserializing user');
    done(null, user);
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (winston, logLevel) {
  winston.configure({
    transports: [new winston.transports.Console({
      level: logLevel,
      timestamp: false,
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    })]
  });

  winston.error('Level 0');
  winston.warn('Level 1');
  winston.info('Level 2');
  winston.verbose('Level 3');
  winston.debug('Level 4');
  winston.silly('Level 5');
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    logging = _require.logging;

var slackWebHook = logging.slackWebHook,
    slackErrorChannel = logging.slackErrorChannel,
    slackInfoChannel = logging.slackInfoChannel;

var winstonSlackWebHook = __webpack_require__(26).SlackWebHook;

module.exports = function (winston) {
  if (slackWebHook) {
    // add a transport for errors to slack
    if (slackErrorChannel) {
      winston.add(winstonSlackWebHook, {
        name: 'slack-errors-transport',
        level: 'warn',
        webhookUrl: slackWebHook,
        channel: slackErrorChannel,
        username: 'spee.ch',
        iconEmoji: ':face_with_head_bandage:'
      });
    };
    if (slackInfoChannel) {
      winston.add(winstonSlackWebHook, {
        name: 'slack-info-transport',
        level: 'info',
        webhookUrl: slackWebHook,
        channel: slackInfoChannel,
        username: 'spee.ch',
        iconEmoji: ':nerd_face:'
      });
    };
    // send test message
    winston.error('Slack "error" logging is online.');
    winston.info('Slack "info" logging is online.');
  } else {
    winston.warn('Slack logging is not enabled because no slackWebHook config var provided.');
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(1);
var logger = __webpack_require__(0);

module.exports = function () {
  // get the config file

  for (var configCategoryKey in config) {
    if (config.hasOwnProperty(configCategoryKey)) {
      // get the final variables for each config category
      var configVariables = config[configCategoryKey];
      for (var configVarKey in configVariables) {
        if (configVariables.hasOwnProperty(configVarKey)) {
          // print each variable
          logger.debug('CONFIG CHECK: ' + configCategoryKey + '.' + configVarKey + ' === ' + configVariables[configVarKey]);
        }
      }
    }
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(2);
var PassportLocalStrategy = __webpack_require__(7).Strategy;
var lbryApi = __webpack_require__(3);
var logger = __webpack_require__(0);

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
/* 29 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(7).Strategy;
var db = __webpack_require__(2);
var logger = __webpack_require__(0);

function returnUserAndChannelInfo(userInstance) {
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
}

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, done) {
  logger.debug('logging user in');
  return db.User.findOne({ where: { userName: username } }).then(function (user) {
    if (!user) {
      // logger.debug('no user found');
      return done(null, false, { message: 'Incorrect username or password' });
    }
    user.comparePassword(password, function (passwordErr, isMatch) {
      if (passwordErr) {
        logger.error('passwordErr:', passwordErr);
        return done(null, false, { message: passwordErr });
      }
      if (!isMatch) {
        // logger.debug('incorrect password');
        return done(null, false, { message: 'Incorrect username or password' });
      }
      logger.debug('Password was a match, returning User');
      return returnUserAndChannelInfo(user).then(function (userInfo) {
        return done(null, userInfo);
      }).catch(function (error) {
        return done(error);
      });
    });
  }).catch(function (error) {
    return done(error);
  });
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var passport = __webpack_require__(6);

module.exports = function (app) {
  // route for sign up
  app.post('/signup', passport.authenticate('local-signup'), function (req, res) {
    logger.verbose('successful signup for ' + req.user.channelName);
    res.status(200).json({
      success: true,
      channelName: req.user.channelName,
      channelClaimId: req.user.channelClaimId,
      shortChannelId: req.user.shortChannelId
    });
  });
  // route for log in
  app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      logger.debug('info:', info);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({
          success: false,
          message: info.message
        });
      }
      logger.debug('successful login');
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
  });
  // route to log out
  app.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({ success: true, message: 'you successfully logged out' });
  });
  // see if user is authenticated, and return credentials if so
  app.get('/user', function (req, res) {
    if (req.user) {
      res.status(200).json({ success: true, data: req.user });
    } else {
      res.status(401).json({ success: false, message: 'user is not logged in' });
    }
  });
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(0);
var multipart = __webpack_require__(33);

var _require = __webpack_require__(1),
    files = _require.files,
    site = _require.site;

var multipartMiddleware = multipart({ uploadDir: files.uploadDirectory });
var db = __webpack_require__(2);

var _require2 = __webpack_require__(34),
    checkClaimNameAvailability = _require2.checkClaimNameAvailability,
    checkChannelAvailability = _require2.checkChannelAvailability,
    publish = _require2.publish;

var _require3 = __webpack_require__(3),
    getClaimList = _require3.getClaimList,
    resolveUri = _require3.resolveUri,
    getClaim = _require3.getClaim;

var _require4 = __webpack_require__(8),
    createPublishParams = _require4.createPublishParams,
    parsePublishApiRequestBody = _require4.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require4.parsePublishApiRequestFiles,
    parsePublishApiChannel = _require4.parsePublishApiChannel,
    addGetResultsToFileData = _require4.addGetResultsToFileData,
    createFileData = _require4.createFileData;

var errorHandlers = __webpack_require__(9);

var _require5 = __webpack_require__(10),
    sendGAAnonymousPublishTiming = _require5.sendGAAnonymousPublishTiming,
    sendGAChannelPublishTiming = _require5.sendGAChannelPublishTiming;

var _require6 = __webpack_require__(36),
    authenticateIfNoUserToken = _require6.authenticateIfNoUserToken;

var _require7 = __webpack_require__(11),
    getChannelData = _require7.getChannelData,
    getChannelClaims = _require7.getChannelClaims,
    getClaimId = _require7.getClaimId;

var NO_CHANNEL = 'NO_CHANNEL';
var NO_CLAIM = 'NO_CLAIM';

module.exports = function (app) {
  // route to check whether site has published to a channel
  app.get('/api/channel/availability/:name', function (_ref, res) {
    var ip = _ref.ip,
        originalUrl = _ref.originalUrl,
        params = _ref.params;

    checkChannelAvailability(params.name).then(function (result) {
      if (result === true) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  // route to get a short channel id from long channel Id
  app.get('/api/channel/short-id/:longId/:name', function (_ref2, res) {
    var ip = _ref2.ip,
        originalUrl = _ref2.originalUrl,
        params = _ref2.params;

    db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name).then(function (shortId) {
      res.status(200).json(shortId);
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  app.get('/api/channel/data/:channelName/:channelClaimId', function (_ref3, res) {
    var ip = _ref3.ip,
        originalUrl = _ref3.originalUrl,
        body = _ref3.body,
        params = _ref3.params;

    var channelName = params.channelName;
    var channelClaimId = params.channelClaimId;
    if (channelClaimId === 'none') channelClaimId = null;
    getChannelData(channelName, channelClaimId, 0).then(function (data) {
      if (data === NO_CHANNEL) {
        return res.status(404).json({ success: false, message: 'No matching channel was found' });
      }
      res.status(200).json({ success: true, data: data });
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  app.get('/api/channel/claims/:channelName/:channelClaimId/:page', function (_ref4, res) {
    var ip = _ref4.ip,
        originalUrl = _ref4.originalUrl,
        body = _ref4.body,
        params = _ref4.params;

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
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  // route to run a claim_list request on the daemon
  app.get('/api/claim/list/:name', function (_ref5, res) {
    var ip = _ref5.ip,
        originalUrl = _ref5.originalUrl,
        params = _ref5.params;

    getClaimList(params.name).then(function (claimsList) {
      res.status(200).json(claimsList);
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  // route to get an asset
  app.get('/api/claim/get/:name/:claimId', function (_ref6, res) {
    var ip = _ref6.ip,
        originalUrl = _ref6.originalUrl,
        params = _ref6.params;

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
    }).then(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          fileData = _ref8[0],
          getResult = _ref8[1];

      fileData = addGetResultsToFileData(fileData, getResult);
      return Promise.all([db.upsert(db.File, fileData, { name: name, claimId: claimId }, 'File'), getResult]);
    }).then(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          fileRecord = _ref10[0],
          _ref10$ = _ref10[1],
          message = _ref10$.message,
          completed = _ref10$.completed;

      res.status(200).json({ success: true, message: message, completed: completed });
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  // route to check whether this site published to a claim
  app.get('/api/claim/availability/:name', function (_ref11, res) {
    var ip = _ref11.ip,
        originalUrl = _ref11.originalUrl,
        params = _ref11.params;

    checkClaimNameAvailability(params.name).then(function (result) {
      if (result === true) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  // route to run a resolve request on the daemon
  app.get('/api/claim/resolve/:name/:claimId', function (_ref12, res) {
    var headers = _ref12.headers,
        ip = _ref12.ip,
        originalUrl = _ref12.originalUrl,
        params = _ref12.params;

    resolveUri(params.name + '#' + params.claimId).then(function (resolvedUri) {
      res.status(200).json(resolvedUri);
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  // route to run a publish request on the daemon
  app.post('/api/claim/publish', multipartMiddleware, function (_ref13, res) {
    var body = _ref13.body,
        files = _ref13.files,
        headers = _ref13.headers,
        ip = _ref13.ip,
        originalUrl = _ref13.originalUrl,
        user = _ref13.user;

    logger.debug('api/claim-publish body:', body);
    logger.debug('api/claim-publish files:', files);
    // define variables
    var name = void 0,
        fileName = void 0,
        filePath = void 0,
        fileType = void 0,
        nsfw = void 0,
        license = void 0,
        title = void 0,
        description = void 0,
        thumbnail = void 0,
        channelName = void 0,
        channelPassword = void 0;
    // record the start time of the request
    var publishStartTime = Date.now();
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

      var _parsePublishApiChann = parsePublishApiChannel(body, user);

      channelName = _parsePublishApiChann.channelName;
      channelPassword = _parsePublishApiChann.channelPassword;
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    // check channel authorization
    authenticateIfNoUserToken(channelName, channelPassword, user).then(function (authenticated) {
      if (!authenticated) {
        throw new Error('Authentication failed, you do not have access to that channel');
      }
      // make sure the claim name is available
      return checkClaimNameAvailability(name);
    }).then(function (result) {
      if (!result) {
        throw new Error('That name is already claimed by another user.');
      }
      // create publish parameters object
      return createPublishParams(filePath, name, title, description, license, nsfw, thumbnail, channelName);
    }).then(function (publishParams) {
      // publish the asset
      return publish(publishParams, fileName, fileType);
    }).then(function (result) {
      res.status(200).json({
        success: true,
        message: 'publish completed successfully',
        data: {
          name: name,
          claimId: result.claim_id,
          url: site.host + '/' + result.claim_id + '/' + name,
          lbryTx: result
        }
      });
      // record the publish end time and send to google analytics
      var publishEndTime = Date.now();
      if (channelName) {
        sendGAChannelPublishTiming(headers, ip, originalUrl, publishStartTime, publishEndTime);
      } else {
        sendGAAnonymousPublishTiming(headers, ip, originalUrl, publishStartTime, publishEndTime);
      }
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  // route to get a short claim id from long claim Id
  app.get('/api/claim/short-id/:longId/:name', function (_ref14, res) {
    var ip = _ref14.ip,
        originalUrl = _ref14.originalUrl,
        body = _ref14.body,
        params = _ref14.params;

    db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name).then(function (shortId) {
      res.status(200).json({ success: true, data: shortId });
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  app.post('/api/claim/long-id', function (_ref15, res) {
    var ip = _ref15.ip,
        originalUrl = _ref15.originalUrl,
        body = _ref15.body,
        params = _ref15.params;

    logger.debug('body:', body);
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
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  app.get('/api/claim/data/:claimName/:claimId', function (_ref16, res) {
    var ip = _ref16.ip,
        originalUrl = _ref16.originalUrl,
        body = _ref16.body,
        params = _ref16.params;

    var claimName = params.claimName;
    var claimId = params.claimId;
    if (claimId === 'none') claimId = null;
    db.Claim.resolveClaim(claimName, claimId).then(function (claimInfo) {
      if (!claimInfo) {
        return res.status(404).json({ success: false, message: 'No claim could be found' });
      }
      res.status(200).json({ success: true, data: claimInfo });
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  // route to see if asset is available locally
  app.get('/api/file/availability/:name/:claimId', function (_ref17, res) {
    var ip = _ref17.ip,
        originalUrl = _ref17.originalUrl,
        params = _ref17.params;

    var name = params.name;
    var claimId = params.claimId;
    db.File.findOne({ where: { name: name, claimId: claimId } }).then(function (result) {
      if (result) {
        return res.status(200).json({ success: true, data: true });
      }
      res.status(200).json({ success: true, data: false });
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(0);
var db = __webpack_require__(2);
var lbryApi = __webpack_require__(3);
var publishHelpers = __webpack_require__(8);
var config = __webpack_require__(1);

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
          return db.Channel.findOne({ where: { channelName: publishParams.channel_name } });
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
  checkClaimNameAvailability: function checkClaimNameAvailability(name) {
    return new Promise(function (resolve, reject) {
      // find any records where the name is used
      db.File.findAll({ where: { name: name } }).then(function (result) {
        if (result.length >= 1) {
          var claimAddress = config.wallet.lbryClaimAddress;
          // filter out any results that were not published from spee.ch's wallet address
          var filteredResult = result.filter(function (claim) {
            return claim.address === claimAddress;
          });
          // return based on whether any non-spee.ch claims were left
          if (filteredResult.length >= 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  checkChannelAvailability: function checkChannelAvailability(name) {
    return new Promise(function (resolve, reject) {
      // find any records where the name is used
      db.Channel.findAll({ where: { channelName: name } }).then(function (result) {
        if (result.length >= 1) {
          return resolve(false);
        }
        resolve(true);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(2);
var logger = __webpack_require__(0);

module.exports = {
  authenticateChannelCredentials: function authenticateChannelCredentials(channelName, userPassword) {
    return new Promise(function (resolve, reject) {
      var userName = channelName.substring(1);
      logger.debug('authenticateChannelCredentials > channelName: ' + channelName + ' username: ' + userName + ' pass: ' + userPassword);
      db.User.findOne({ where: { userName: userName } }).then(function (user) {
        if (!user) {
          logger.debug('no user found');
          resolve(false);
          return;
        }
        return user.comparePassword(userPassword, function (passwordErr, isMatch) {
          if (passwordErr) {
            logger.error('comparePassword error:', passwordErr);
            resolve(false);
            return;
          }
          if (!isMatch) {
            logger.debug('incorrect password');
            resolve(false);
            return;
          }
          logger.debug('...password was a match...');
          resolve(true);
        });
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  authenticateIfNoUserToken: function authenticateIfNoUserToken(channelName, channelPassword, user) {
    return new Promise(function (resolve, reject) {
      if (user || !channelName) {
        return resolve(true);
      }
      return resolve(module.exports.authenticateChannelCredentials(channelName, channelPassword));
    });
  }
};

/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    site = _require.site;
// const handleRender = require('../helpers/handleRender.jsx');

module.exports = function (app) {
  // route for the home page
  app.get('/', function (req, res) {
    res.status(200).render('index');
  });
  // route to display login page
  app.get('/login', function (req, res) {
    res.status(200).render('index');
  });
  // route to show 'about' page
  app.get('/about', function (req, res) {
    res.status(200).render('index');
  });
  // route to display a list of the trending images
  app.get('/trending', function (req, res) {
    res.status(301).redirect('/popular');
  });
  app.get('/popular', function (_ref, res) {
    var ip = _ref.ip,
        originalUrl = _ref.originalUrl;

    res.status(200).render('index');
  });
  // route to display a list of the trending images
  app.get('/new', function (_ref2, res) {
    var ip = _ref2.ip,
        originalUrl = _ref2.originalUrl;

    res.status(200).render('index');
  });
  // route to send embedable video player (for twitter)
  app.get('/embed/:claimId/:name', function (_ref3, res) {
    var params = _ref3.params;

    var claimId = params.claimId;
    var name = params.name;
    var host = site.host;
    // get and render the content
    res.status(200).render('embed', { layout: 'embed', host: host, claimId: claimId, name: name });
  });
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(10),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(40),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(41);

var SERVE = 'SERVE';

module.exports = function (app) {
  // route to serve a specific asset using the channel or claim id
  app.get('/:identifier/:claim', function (_ref, res) {
    var headers = _ref.headers,
        ip = _ref.ip,
        originalUrl = _ref.originalUrl,
        params = _ref.params;

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
      return res.status(200).render('index');
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
  });
  // route to serve the winning asset at a claim or a channel page
  app.get('/:claim', function (_ref2, res) {
    var headers = _ref2.headers,
        ip = _ref2.ip,
        originalUrl = _ref2.originalUrl,
        params = _ref2.params,
        query = _ref2.query;

    // decide if this is a show request
    var hasFileExtension = void 0;
    try {
      var _lbryUri$parseModifie2 = lbryUri.parseModifier(params.claim);

      hasFileExtension = _lbryUri$parseModifie2.hasFileExtension;
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    var responseType = determineResponseType(hasFileExtension, headers);
    if (responseType !== SERVE) {
      return res.status(200).render('index');
    }
    // handle serve request
    // send google analytics
    sendGAServeEvent(headers, ip, originalUrl);
    // parse the claim
    var claimName = void 0;
    try {
      var _lbryUri$parseClaim2 = lbryUri.parseClaim(params.claim);

      claimName = _lbryUri$parseClaim2.claimName;
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    // log the request data for debugging
    logRequestData(responseType, claimName, null, null);
    // get the claim Id and then serve the asset
    getClaimIdAndServeAsset(null, null, claimName, null, originalUrl, ip, res);
  });
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(11),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(9),
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
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {
  // a catch-all route if someone visits a page that does not exist
  app.use('*', function (_ref, res) {
    var originalUrl = _ref.originalUrl,
        ip = _ref.ip;

    // send response
    res.status(404).render('404');
  });
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })
/******/ ]);