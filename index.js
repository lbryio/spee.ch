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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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


var Sequelize = __webpack_require__(4);
var logger = __webpack_require__(0);

logger.info('exporting sequelize models');
var mysqlConfig = __webpack_require__(5);
var database = mysqlConfig.database,
    username = mysqlConfig.username,
    password = mysqlConfig.password;


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

// establish mysql connection
sequelize.authenticate().then(function () {
  logger.info('Sequelize has established mysql connection successfully.');
}).catch(function (err) {
  logger.error('Sequelize was unable to connect to the database:', err);
});

// manually add each model to the db object
var Certificate = __webpack_require__(15);
var Channel = __webpack_require__(16);
var Claim = __webpack_require__(17);
var File = __webpack_require__(18);
var Request = __webpack_require__(19);
var User = __webpack_require__(20);
db['Certificate'] = sequelize.import('Certificate', Certificate);
db['Channel'] = sequelize.import('Channel', Channel);
db['Claim'] = sequelize.import('Claim', Claim);
db['File'] = sequelize.import('File', File);
db['Request'] = sequelize.import('Request', Request);
db['User'] = sequelize.import('User', User);

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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(23);
var logger = __webpack_require__(0);

var _require = __webpack_require__(24),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(7),
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function mysql() {
  var _this = this;

  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.configure = function (config) {
    if (!config) {
      return console.log('No MySQL config received.');
    }
    console.log('configuring mysql credentials...');
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var ua = __webpack_require__(25);

var _require = __webpack_require__(2),
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var fs = __webpack_require__(26);

var _require = __webpack_require__(2),
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
/* 9 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
__webpack_require__(12);
module.exports = __webpack_require__(13);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const Server = require('./server/server.js');
// const Components = require('./client/components');
// const Containers = require('./client/containers');
// const Pages = require('./client/pages');
var apiRoutes = __webpack_require__(14);
var logger = __webpack_require__(31);
var mysql = __webpack_require__(5);
var slack = __webpack_require__(32);
var database = __webpack_require__(1);
var localLoginStrategy = __webpack_require__(34);
var localSignupStrategy = __webpack_require__(35);

var _exports = {
  // Server,
  // Components,
  // Containers,
  // Pages,
  apiRoutes: apiRoutes,
  config: {
    logger: logger,
    mysql: mysql,
    slack: slack
  },
  database: database,
  passport: {
    localLoginStrategy: localLoginStrategy,
    localSignupStrategy: localSignupStrategy
  }
};

module.exports = _exports;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(0);

var _require = __webpack_require__(2),
    host = _require.details.host;

var db = __webpack_require__(1);

var _require2 = __webpack_require__(22),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    checkChannelAvailability = _require2.checkChannelAvailability,
    publish = _require2.publish;

var _require3 = __webpack_require__(3),
    getClaimList = _require3.getClaimList,
    resolveUri = _require3.resolveUri,
    getClaim = _require3.getClaim;

var _require4 = __webpack_require__(8),
    addGetResultsToFileData = _require4.addGetResultsToFileData,
    createBasicPublishParams = _require4.createBasicPublishParams,
    createThumbnailPublishParams = _require4.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require4.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require4.parsePublishApiRequestFiles,
    createFileData = _require4.createFileData;

var errorHandlers = __webpack_require__(27);

var _require5 = __webpack_require__(7),
    sendGATimingEvent = _require5.sendGATimingEvent;

var _require6 = __webpack_require__(28),
    authenticateUser = _require6.authenticateUser;

var _require7 = __webpack_require__(29),
    getChannelData = _require7.getChannelData,
    getChannelClaims = _require7.getChannelClaims,
    getClaimId = _require7.getClaimId;

var NO_CHANNEL = 'NO_CHANNEL';
var NO_CLAIM = 'NO_CLAIM';

module.exports = {
  // route to check whether site has published to a channel
  channelAvailabilityRoute: function channelAvailabilityRoute(_ref, res) {
    var ip = _ref.ip,
        originalUrl = _ref.originalUrl,
        name = _ref.params.name;

    var gaStartTime = Date.now();
    checkChannelAvailability(name).then(function (availableName) {
      res.status(200).json(availableName);
      sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  },

  // route to get a short channel id from long channel Id
  channelShortIdRoute: function channelShortIdRoute(_ref2, res) {
    var ip = _ref2.ip,
        originalUrl = _ref2.originalUrl,
        params = _ref2.params;

    db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name).then(function (shortId) {
      res.status(200).json(shortId);
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  },
  channelDataRoute: function channelDataRoute(_ref3, res) {
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
  },
  channelClaimsRoute: function channelClaimsRoute(_ref4, res) {
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
  },

  // route to run a claim_list request on the daemon
  claimListRoute: function claimListRoute(_ref5, res) {
    var ip = _ref5.ip,
        originalUrl = _ref5.originalUrl,
        params = _ref5.params;

    getClaimList(params.name).then(function (claimsList) {
      res.status(200).json(claimsList);
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  },

  // route to get an asset
  claimGetRoute: function claimGetRoute(_ref6, res) {
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
  },

  // route to check whether this site published to a claim
  claimAvailabilityRoute: function claimAvailabilityRoute(_ref11, res) {
    var ip = _ref11.ip,
        originalUrl = _ref11.originalUrl,
        name = _ref11.params.name;

    var gaStartTime = Date.now();
    claimNameIsAvailable(name).then(function (result) {
      res.status(200).json(result);
      sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  },

  // route to run a resolve request on the daemon
  claimResolveRoute: function claimResolveRoute(_ref12, res) {
    var headers = _ref12.headers,
        ip = _ref12.ip,
        originalUrl = _ref12.originalUrl,
        params = _ref12.params;

    resolveUri(params.name + '#' + params.claimId).then(function (resolvedUri) {
      res.status(200).json(resolvedUri);
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  },

  // route to run a publish request on the daemon
  claimPublishRoute: function claimPublishRoute(_ref13, res) {
    var body = _ref13.body,
        files = _ref13.files,
        headers = _ref13.headers,
        ip = _ref13.ip,
        originalUrl = _ref13.originalUrl,
        user = _ref13.user;

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
    Promise.all([authenticateUser(channelName, channelId, channelPassword, user), claimNameIsAvailable(name), createBasicPublishParams(filePath, name, title, description, license, nsfw, thumbnail), createThumbnailPublishParams(thumbnailFilePath, name, license, nsfw)]).then(function (_ref14) {
      var _ref15 = _slicedToArray(_ref14, 4),
          _ref15$ = _ref15[0],
          channelName = _ref15$.channelName,
          channelClaimId = _ref15$.channelClaimId,
          validatedClaimName = _ref15[1],
          publishParams = _ref15[2],
          thumbnailPublishParams = _ref15[3];

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
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  },

  // route to get a short claim id from long claim Id
  claimShortIdRoute: function claimShortIdRoute(_ref16, res) {
    var ip = _ref16.ip,
        originalUrl = _ref16.originalUrl,
        body = _ref16.body,
        params = _ref16.params;

    db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name).then(function (shortId) {
      res.status(200).json({ success: true, data: shortId });
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  },
  claimLongIdRoute: function claimLongIdRoute(_ref17, res) {
    var ip = _ref17.ip,
        originalUrl = _ref17.originalUrl,
        body = _ref17.body,
        params = _ref17.params;

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
  },
  claimDataRoute: function claimDataRoute(_ref18, res) {
    var ip = _ref18.ip,
        originalUrl = _ref18.originalUrl,
        body = _ref18.body,
        params = _ref18.params;

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
  },

  // route to see if asset is available locally
  fileAvailabilityRoute: function fileAvailabilityRoute(_ref19, res) {
    var ip = _ref19.ip,
        originalUrl = _ref19.originalUrl,
        params = _ref19.params;

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
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(6),
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(6),
    returnShortId = _require.returnShortId;

var _require2 = __webpack_require__(2),
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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(21);
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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(0);
var db = __webpack_require__(1);
var lbryApi = __webpack_require__(3);
var publishHelpers = __webpack_require__(8);

var _require = __webpack_require__(2),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(4);
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
/* 23 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 24 */
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
/* 25 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(1);
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(1);
var logger = __webpack_require__(0);

var _require = __webpack_require__(30),
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
/* 30 */
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
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(33).SlackWebHook;
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
/* 33 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(9).Strategy;
var logger = __webpack_require__(0);
var db = __webpack_require__(1);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(9).Strategy;
var lbryApi = __webpack_require__(3);
var logger = __webpack_require__(0);
var db = __webpack_require__(1);

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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzUwNTZiNjBmN2QxN2M3MDExNDciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3RvblwiIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL3NpdGVDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiIiwid2VicGFjazovLy8uL3NwZWVjaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaVJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyJdLCJuYW1lcyI6WyJTZXF1ZWxpemUiLCJyZXF1aXJlIiwibG9nZ2VyIiwiaW5mbyIsIm15c3FsQ29uZmlnIiwiZGF0YWJhc2UiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZGIiLCJzZXF1ZWxpemUiLCJob3N0IiwiZGlhbGVjdCIsImRpYWxlY3RPcHRpb25zIiwiZGVjaW1hbE51bWJlcnMiLCJsb2dnaW5nIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJhY3F1aXJlIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImNhdGNoIiwiZXJyb3IiLCJlcnIiLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsImltcG9ydCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibW9kZWxOYW1lIiwiYXNzb2NpYXRlIiwidXBzZXJ0IiwiTW9kZWwiLCJ2YWx1ZXMiLCJjb25kaXRpb24iLCJ0YWJsZU5hbWUiLCJmaW5kT25lIiwid2hlcmUiLCJvYmoiLCJkZWJ1ZyIsInVwZGF0ZSIsImNyZWF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJTaXRlQ29uZmlnIiwiYW5hbHl0aWNzIiwiZ29vZ2xlSWQiLCJhc3NldERlZmF1bHRzIiwiZGVzY3JpcHRpb24iLCJ0aHVtYm5haWwiLCJ0aXRsZSIsImF1dGgiLCJzZXNzaW9uS2V5IiwiY3VzdG9tQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJjb250YWluZXJzIiwicGFnZXMiLCJkZXRhaWxzIiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsImNvbmZpZ3VyZSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsInNlbmRHQVRpbWluZ0V2ZW50IiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJyZXN1bHQiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwibmFtZSIsImdhU3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsIlByb21pc2UiLCJwb3N0IiwibWV0aG9kIiwicGFyYW1zIiwicmVzcG9uc2UiLCJnZXRDbGFpbSIsInVyaSIsInRpbWVvdXQiLCJnZXRDbGFpbUxpc3QiLCJjbGFpbU5hbWUiLCJyZXNvbHZlVXJpIiwiZ2V0RG93bmxvYWREaXJlY3RvcnkiLCJkb3dubG9hZF9kaXJlY3RvcnkiLCJjcmVhdGVDaGFubmVsIiwiY2hhbm5lbF9uYW1lIiwiYW1vdW50IiwibXlzcWwiLCJyZXR1cm5TaG9ydElkIiwiY2xhaW1zQXJyYXkiLCJsb25nSWQiLCJjbGFpbUluZGV4Iiwic2hvcnRJZCIsInN1YnN0cmluZyIsInNob3J0SWRMZW5ndGgiLCJmaW5kSW5kZXgiLCJlbGVtZW50IiwiY2xhaW1JZCIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwibGVuZ3RoIiwiZmlsdGVyIiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImlwIiwib3JpZ2luYWxVcmwiLCJldmVudENhdGVnb3J5IiwiZXZlbnRBY3Rpb24iLCJldmVudExhYmVsIiwiaXBPdmVycmlkZSIsInVzZXJBZ2VudE92ZXJyaWRlIiwiY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIiwiY2F0ZWdvcnkiLCJ2YXJpYWJsZSIsImxhYmVsIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImR1cmF0aW9uIiwidXNlclRpbWluZ0NhdGVnb3J5IiwidXNlclRpbWluZ1ZhcmlhYmxlTmFtZSIsInVzZXJUaW1pbmdUaW1lIiwidXNlclRpbWluZ0xhYmVsIiwic2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IiwidmlzaXRvcklkIiwicmVwbGFjZSIsInZpc2l0b3IiLCJzdHJpY3RDaWRGb3JtYXQiLCJodHRwcyIsImV2ZW50Iiwic2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyIsInRpbWluZyIsInNlbmRHQVNlcnZlRXZlbnQiLCJjaGFubmVsTmFtZSIsImNoYW5uZWxJZCIsImNoYW5uZWxfaWQiLCJmcyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5IiwibnNmdyIsImxpY2Vuc2UiLCJpbnZhbGlkTmFtZUNoYXJhY3RlcnMiLCJleGVjIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwiZmlsZSIsInBhdGgiLCJ0eXBlIiwic2l6ZSIsInRlc3QiLCJ2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSIsImZpbGVOYW1lIiwiZmlsZVBhdGgiLCJmaWxlVHlwZSIsInRodW1ibmFpbEZpbGVOYW1lIiwidGh1bWJuYWlsRmlsZVBhdGgiLCJ0aHVtYm5haWxGaWxlVHlwZSIsImNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyIsInRyaW0iLCJmaWxlX3BhdGgiLCJiaWQiLCJtZXRhZGF0YSIsImF1dGhvciIsImxhbmd1YWdlIiwiY2xhaW1fYWRkcmVzcyIsImNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJkZWxldGVUZW1wb3JhcnlGaWxlIiwidW5saW5rIiwiYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEiLCJmaWxlSW5mbyIsImdldFJlc3VsdCIsImZpbGVfbmFtZSIsImRvd25sb2FkX3BhdGgiLCJjcmVhdGVGaWxlRGF0YSIsIm91dHBvaW50IiwiaGVpZ2h0IiwiYWRkcmVzcyIsImNvbnRlbnRUeXBlIiwiYXBpUm91dGVzIiwic2xhY2siLCJsb2NhbExvZ2luU3RyYXRlZ3kiLCJsb2NhbFNpZ251cFN0cmF0ZWd5IiwicGFzc3BvcnQiLCJjbGFpbU5hbWVJc0F2YWlsYWJsZSIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsInB1Ymxpc2giLCJlcnJvckhhbmRsZXJzIiwiYXV0aGVudGljYXRlVXNlciIsImdldENoYW5uZWxEYXRhIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldENsYWltSWQiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJjaGFubmVsQXZhaWxhYmlsaXR5Um91dGUiLCJyZXMiLCJzdGF0dXMiLCJqc29uIiwiYXZhaWxhYmxlTmFtZSIsImhhbmRsZUVycm9yUmVzcG9uc2UiLCJjaGFubmVsU2hvcnRJZFJvdXRlIiwiZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCIsImNoYW5uZWxEYXRhUm91dGUiLCJib2R5IiwiY2hhbm5lbENsYWltSWQiLCJzdWNjZXNzIiwibWVzc2FnZSIsImNoYW5uZWxDbGFpbXNSb3V0ZSIsInBhZ2UiLCJjbGFpbUxpc3RSb3V0ZSIsImNsYWltc0xpc3QiLCJjbGFpbUdldFJvdXRlIiwicmVzb2x2ZUNsYWltIiwicmVzb2x2ZVJlc3VsdCIsImZpbGVEYXRhIiwiYWxsIiwiZmlsZVJlY29yZCIsImNvbXBsZXRlZCIsImNsYWltQXZhaWxhYmlsaXR5Um91dGUiLCJjbGFpbVJlc29sdmVSb3V0ZSIsInJlc29sdmVkVXJpIiwiY2xhaW1QdWJsaXNoUm91dGUiLCJmaWxlcyIsInVzZXIiLCJjaGFubmVsUGFzc3dvcmQiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwiY2xhaW1faWQiLCJ1cmwiLCJsYnJ5VHgiLCJjbGFpbVNob3J0SWRSb3V0ZSIsImdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCIsImNsYWltTG9uZ0lkUm91dGUiLCJjbGFpbURhdGFSb3V0ZSIsImNsYWltSW5mbyIsImZpbGVBdmFpbGFiaWxpdHlSb3V0ZSIsIlNUUklORyIsIkJPT0xFQU4iLCJJTlRFR0VSIiwiVEVYVCIsIkRFQ0lNQUwiLCJkZWZpbmUiLCJkZWZhdWx0IiwiY2xhaW1TZXF1ZW5jZSIsImRlY29kZWRDbGFpbSIsImRlcHRoIiwiZWZmZWN0aXZlQW1vdW50IiwiaGFzU2lnbmF0dXJlIiwiaGV4Iiwibm91dCIsInR4aWQiLCJ2YWxpZEF0SGVpZ2h0IiwidmFsdWVWZXJzaW9uIiwiY2xhaW1UeXBlIiwiY2VydGlmaWNhdGVWZXJzaW9uIiwia2V5VHlwZSIsInB1YmxpY0tleSIsImZyZWV6ZVRhYmxlTmFtZSIsImJlbG9uZ3NUbyIsImZvcmVpZ25LZXkiLCJhbGxvd051bGwiLCJsb25nQ2hhbm5lbElkIiwiZmluZEFsbCIsIm9yZGVyIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCIsIiRsaWtlIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSIsInZhbGlkYXRlTG9uZ0NoYW5uZWxJZCIsImdldExvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZWZhdWx0VGh1bWJuYWlsIiwiZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSIsImRldGVybWluZVRodW1ibmFpbCIsInN0b3JlZFRodW1ibmFpbCIsInByZXBhcmVDbGFpbURhdGEiLCJjbGFpbSIsImNlcnRpZmljYXRlSWQiLCJsaWNlbnNlVXJsIiwicHJldmlldyIsIm1ldGFkYXRhVmVyc2lvbiIsInNvdXJjZSIsInNvdXJjZVR5cGUiLCJzb3VyY2VWZXJzaW9uIiwic3RyZWFtVmVyc2lvbiIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJyYXciLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJnZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkIiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsImRhdGFWYWx1ZXMiLCJ2YWxpZGF0ZUxvbmdDbGFpbUlkIiwiZ2V0TG9uZ0NsYWltSWQiLCJjbGFpbUFycmF5IiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImFjdGlvbiIsImlwQWRkcmVzcyIsImJjcnlwdCIsInVzZXJOYW1lIiwicHJvdG90eXBlIiwiY29tcGFyZVBhc3N3b3JkIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwib3B0aW9ucyIsImxicnlBcGkiLCJwdWJsaXNoSGVscGVycyIsIk9wIiwicHVibGlzaFJlc3VsdHMiLCJ0eCIsImNoYW5uZWwiLCJjbGFpbVJlY29yZCIsInVwc2VydENyaXRlcmlhIiwic2V0Q2xhaW0iLCJzZXRGaWxlIiwiY2xhaW1BZGRyZXNzZXMiLCJwdXNoIiwiYXR0cmlidXRlcyIsIm9yIiwibGJyeUNvbmZpZyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsImNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIiwiY29kZSIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImtleSIsImF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyIsInVzZXJQYXNzd29yZCIsImNoYW5uZWxEYXRhIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJnZXQiLCJpc01hdGNoIiwicmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyIsIk5PX0ZJTEUiLCJnZXRDbGFpbUlkQnlDaGFubmVsIiwiZ2V0Q2xhaW1JZEJ5Q2xhaW0iLCJsb25nQ2xhaW1JZCIsImxvbmdDaGFubmVsQ2xhaW1JZCIsInNob3J0Q2hhbm5lbENsYWltSWQiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJDTEFJTVNfUEVSX1BBR0UiLCJjbGFpbXMiLCJ0b3RhbFBhZ2VzIiwiZGV0ZXJtaW5lVG90YWxQYWdlcyIsInBhZ2luYXRpb25QYWdlIiwiZ2V0UGFnZUZyb21RdWVyeSIsInZpZXdEYXRhIiwiZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIiwicHJldmlvdXNQYWdlIiwiZGV0ZXJtaW5lUHJldmlvdXNQYWdlIiwiY3VycmVudFBhZ2UiLCJuZXh0UGFnZSIsImRldGVybWluZU5leHRQYWdlIiwidG90YWxSZXN1bHRzIiwiZGV0ZXJtaW5lVG90YWxDbGFpbXMiLCJwYXJzZUludCIsInBhZ2VOdW1iZXIiLCJjbGFpbVN0YXJ0SW5kZXgiLCJjbGFpbUVuZEluZGV4IiwicGFnZU9mQ2xhaW1zIiwidG90YWxDbGFpbXMiLCJmdWxsUGFnZXMiLCJNYXRoIiwiZmxvb3IiLCJyZW1haW5kZXIiLCJMb2dnZXJDb25maWciLCJsb2dMZXZlbCIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwibGV2ZWwiLCJ0aW1lc3RhbXAiLCJjb2xvcml6ZSIsInByZXR0eVByaW50IiwiaGFuZGxlRXhjZXB0aW9ucyIsImh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb24iLCJ3YXJuIiwidmVyYm9zZSIsInNpbGx5Iiwid2luc3RvblNsYWNrV2ViSG9vayIsIlNsYWNrV2ViSG9vayIsIndpbnN0b24iLCJTbGFja0NvbmZpZyIsInNsYWNrV2ViSG9vayIsInNsYWNrRXJyb3JDaGFubmVsIiwic2xhY2tJbmZvQ2hhbm5lbCIsImFkZCIsIndlYmhvb2tVcmwiLCJpY29uRW1vamkiLCJQYXNzcG9ydExvY2FsU3RyYXRlZ3kiLCJTdHJhdGVneSIsInJldHVyblVzZXJBbmRDaGFubmVsSW5mbyIsInVzZXJJbnN0YW5jZSIsInVzZXJJbmZvIiwiaWQiLCJnZXRDaGFubmVsIiwic2hvcnRDaGFubmVsSWQiLCJ1c2VybmFtZUZpZWxkIiwicGFzc3dvcmRGaWVsZCIsImRvbmUiLCJ1c2VyRGF0YSIsImNlcnRpZmljYXRlRGF0YSIsIm5ld1VzZXIiLCJuZXdDaGFubmVsIiwibmV3Q2VydGlmaWNhdGUiLCJzZXRDaGFubmVsIiwic2V0VXNlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxvQzs7Ozs7Ozs7O0FDQUEsSUFBTUEsWUFBWSxtQkFBQUMsQ0FBUSxDQUFSLENBQWxCO0FBQ0EsSUFBTUMsU0FBUyxtQkFBQUQsQ0FBUSxDQUFSLENBQWY7O0FBRUFDLE9B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QWVDLFVBQWYsQ0FBMEJGLFVBQTFCLENBQUQsRUFBd0NBLFdBQVdHLE9BQVgsQ0FBbUJKLE9BQW5CLENBQXhDLENBQVosQ0FBUDtBQUNELEdBakNJLEVBa0NKamEsSUFsQ0ksQ0FrQ0MsWUFBTTtBQUNWbkIsV0FBTzJaLE9BQVAsQ0FBZSw4Q0FBZjtBQUNBLFdBQU9yWixHQUFHaUIsV0FBSCxDQUFleU0sa0NBQWYsQ0FBa0QyTSxTQUFTeE0sY0FBM0QsRUFBMkV3TSxTQUFTNVEsV0FBcEYsQ0FBUDtBQUNELEdBckNJLEVBc0NKNUksSUF0Q0ksQ0FzQ0MsMEJBQWtCO0FBQ3RCd1osYUFBUyxnQkFBVCxJQUE2QkcsY0FBN0I7QUFDQSxXQUFPRyxLQUFLLElBQUwsRUFBV04sUUFBWCxDQUFQO0FBQ0QsR0F6Q0ksRUEwQ0p2WixLQTFDSSxDQTBDRSxpQkFBUztBQUNkcEIsV0FBT3FCLEtBQVAsQ0FBYSxjQUFiLEVBQTZCQSxLQUE3QjtBQUNBLFdBQU80WixLQUFLNVosS0FBTCxDQUFQO0FBQ0QsR0E3Q0ksQ0FBUDtBQThDRCxDQXpEYyxDQUFqQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NTA1NmI2MGY3ZDE3YzcwMTE0NyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmxvZ2dlci5pbmZvKCdleHBvcnRpbmcgc2VxdWVsaXplIG1vZGVscycpO1xuY29uc3QgbXlzcWxDb25maWcgPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbXlzcWxDb25maWcnKTtcbmNvbnN0IHsgZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gbXlzcWxDb25maWc7XG5cbmNvbnN0IGRiID0ge307XG4vLyBzZXQgc2VxdWVsaXplIG9wdGlvbnNcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICBob3N0ICAgICAgICAgIDogJ2xvY2FsaG9zdCcsXG4gIGRpYWxlY3QgICAgICAgOiAnbXlzcWwnLFxuICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSwgLy8gZml4IHRvIGVuc3VyZSBERUNJTUFMIHdpbGwgbm90IGJlIHN0b3JlZCBhcyBhIHN0cmluZ1xuICBsb2dnaW5nICAgICAgIDogZmFsc2UsXG4gIHBvb2wgICAgICAgICAgOiB7XG4gICAgbWF4ICAgIDogNSxcbiAgICBtaW4gICAgOiAwLFxuICAgIGlkbGUgICA6IDEwMDAwLFxuICAgIGFjcXVpcmU6IDEwMDAwLFxuICB9LFxufSk7XG5cbi8vIGVzdGFibGlzaCBteXNxbCBjb25uZWN0aW9uXG5zZXF1ZWxpemVcbiAgLmF1dGhlbnRpY2F0ZSgpXG4gIC50aGVuKCgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VxdWVsaXplIGhhcyBlc3RhYmxpc2hlZCBteXNxbCBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKCdTZXF1ZWxpemUgd2FzIHVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZTonLCBlcnIpO1xuICB9KTtcblxuLy8gbWFudWFsbHkgYWRkIGVhY2ggbW9kZWwgdG8gdGhlIGRiIG9iamVjdFxuY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCcuL2NlcnRpZmljYXRlLmpzJyk7XG5jb25zdCBDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJy4vY2xhaW0uanMnKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCcuL2ZpbGUuanMnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL3VzZXIuanMnKTtcbmRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG5kYlsnQ2hhbm5lbCddID0gc2VxdWVsaXplLmltcG9ydCgnQ2hhbm5lbCcsIENoYW5uZWwpO1xuZGJbJ0NsYWltJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDbGFpbScsIENsYWltKTtcbmRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG5kYlsnUmVxdWVzdCddID0gc2VxdWVsaXplLmltcG9ydCgnUmVxdWVzdCcsIFJlcXVlc3QpO1xuZGJbJ1VzZXInXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1VzZXInLCBVc2VyKTtcblxuLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4gIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgIGxvZ2dlci5pbmZvKCdBc3NvY2lhdGluZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbiAgfVxufSk7XG5cbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcblxuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwiZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7XG4gICAgY29tcG9uZW50czoge30sXG4gICAgY29udGFpbmVyczoge30sXG4gICAgcGFnZXMgICAgIDoge30sXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGN1c3RvbUNvbXBvbmVudHMsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgYXBpOiB7IGFwaUhvc3QsIGFwaVBvcnQgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL2xicnlDb25maWcuanMnKTtcbmNvbnN0IGxicnlBcGlVcmkgPSAnaHR0cDovLycgKyBhcGlIb3N0ICsgJzonICsgYXBpUG9ydDtcbmNvbnN0IHsgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsLCBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi9nb29nbGVBbmFseXRpY3MuanMnKTtcblxuY29uc3QgaGFuZGxlTGJyeW5ldFJlc3BvbnNlID0gKHsgZGF0YSB9LCByZXNvbHZlLCByZWplY3QpID0+IHtcbiAgbG9nZ2VyLmRlYnVnKCdsYnJ5IGFwaSBkYXRhOicsIGRhdGEpO1xuICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAvLyBjaGVjayBmb3IgYW4gZXJyb3JcbiAgICBpZiAoZGF0YS5yZXN1bHQuZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnTGJyeW5ldCBhcGkgZXJyb3I6JywgZGF0YS5yZXN1bHQuZXJyb3IpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihkYXRhLnJlc3VsdC5lcnJvcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGZhbGxiYWNrIGluIGNhc2UgaXQganVzdCB0aW1lZCBvdXRcbiAgcmVqZWN0KEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoQ2xhaW0gKHB1Ymxpc2hQYXJhbXMpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUHVibGlzaGluZyBjbGFpbSB0byBcIiR7cHVibGlzaFBhcmFtcy5uYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncHVibGlzaCcsXG4gICAgICAgICAgcGFyYW1zOiBwdWJsaXNoUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncHVibGlzaCcsIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbChwdWJsaXNoUGFyYW1zKSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW0gKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIENsYWltIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpLCB0aW1lb3V0OiAyMCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW0nLCAnR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1MaXN0IChjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBjbGFpbV9saXN0IGZvciBcIiR7Y2xhaW1OYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2xhaW1fbGlzdCcsXG4gICAgICAgICAgcGFyYW1zOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW1MaXN0JywgJ0NMQUlNX0xJU1QnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZXNvbHZlVXJpICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUmVzb2x2aW5nIFVSSSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3Jlc29sdmUnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncmVzb2x2ZVVyaScsICdSRVNPTFZFJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdFt1cmldLmVycm9yKSB7ICAvLyBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgICAgICByZWplY3QoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHsgIC8vIGlmIG5vIGVycm9ycywgcmVzb2x2ZVxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdFt1cmldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldERvd25sb2FkRGlyZWN0b3J5ICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ2xicnlBcGkgPj4gUmV0cmlldmluZyB0aGUgZG93bmxvYWQgZGlyZWN0b3J5IHBhdGggZnJvbSBsYnJ5IGRhZW1vbi4uLicpO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3NldHRpbmdzX2dldCcsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldERvd25sb2FkRGlyZWN0b3J5JywgJ1NFVFRJTkdTX0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQuZG93bmxvYWRfZGlyZWN0b3J5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byBsYnJ5IGRhZW1vbiwgYnV0IHVuYWJsZSB0byByZXRyaWV2ZSB0aGUgZG93bmxvYWQgZGlyZWN0b3J5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0xicnluZXQgRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUoJy9ob21lL2xicnkvRG93bmxvYWRzLycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlQ2hhbm5lbCAobmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBDcmVhdGluZyBjaGFubmVsIGZvciAke25hbWV9Li4uYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2hhbm5lbF9uZXcnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgY2hhbm5lbF9uYW1lOiBuYW1lLFxuICAgICAgICAgICAgYW1vdW50ICAgICAgOiAwLjEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2NyZWF0ZUNoYW5uZWwnLCAnQ0hBTk5FTF9ORVcnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBteXNxbCAoKSB7XG4gIHRoaXMuZGF0YWJhc2UgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXNlcm5hbWUgPSAnZGVmYXVsdCc7XG4gIHRoaXMucGFzc3dvcmQgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIE15U1FMIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2NvbmZpZ3VyaW5nIG15c3FsIGNyZWRlbnRpYWxzLi4uJyk7XG4gICAgY29uc3Qge2RhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmR9ID0gY29uZmlnO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgbXlzcWwoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoYXR3Zy1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBjb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuL3NlcnZlci9zZXJ2ZXIuanMnKTtcbi8vIGNvbnN0IENvbXBvbmVudHMgPSByZXF1aXJlKCcuL2NsaWVudC9jb21wb25lbnRzJyk7XG4vLyBjb25zdCBDb250YWluZXJzID0gcmVxdWlyZSgnLi9jbGllbnQvY29udGFpbmVycycpO1xuLy8gY29uc3QgUGFnZXMgPSByZXF1aXJlKCcuL2NsaWVudC9wYWdlcycpO1xuY29uc3QgYXBpUm91dGVzID0gcmVxdWlyZSgnLi9zZXJ2ZXIvcm91dGVzL2FwaVJvdXRlcy5qcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzJyk7XG5jb25zdCBteXNxbCA9IHJlcXVpcmUoJy4vY29uZmlnL215c3FsQ29uZmlnLmpzJyk7XG5jb25zdCBzbGFjayA9IHJlcXVpcmUoJy4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJyk7XG5jb25zdCBkYXRhYmFzZSA9IHJlcXVpcmUoJy4vc2VydmVyL21vZGVscycpO1xuY29uc3QgbG9jYWxMb2dpblN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtbG9naW4uanMnKTtcbmNvbnN0IGxvY2FsU2lnbnVwU3RyYXRlZ3kgPSByZXF1aXJlKCcuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMnKTtcblxuY29uc3QgZXhwb3J0cyA9IHtcbiAgLy8gU2VydmVyLFxuICAvLyBDb21wb25lbnRzLFxuICAvLyBDb250YWluZXJzLFxuICAvLyBQYWdlcyxcbiAgYXBpUm91dGVzLFxuICBjb25maWc6IHtcbiAgICBsb2dnZXIsXG4gICAgbXlzcWwsXG4gICAgc2xhY2ssXG4gIH0sXG4gIGRhdGFiYXNlLFxuICBwYXNzcG9ydDoge1xuICAgIGxvY2FsTG9naW5TdHJhdGVneSxcbiAgICBsb2NhbFNpZ251cFN0cmF0ZWd5LFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3BlZWNoLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzJyk7XG5jb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlLCBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHksIHB1Ymxpc2ggfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGdldENsYWltTGlzdCwgcmVzb2x2ZVVyaSwgZ2V0Q2xhaW0gfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSwgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zLCBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zLCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSwgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzLCBjcmVhdGVGaWxlRGF0YSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgZXJyb3JIYW5kbGVycyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgYXV0aGVudGljYXRlVXNlciB9ID0gcmVxdWlyZSgnLi4vYXV0aC9hdXRoZW50aWNhdGlvbi5qcycpO1xuY29uc3QgeyBnZXRDaGFubmVsRGF0YSwgZ2V0Q2hhbm5lbENsYWltcywgZ2V0Q2xhaW1JZCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHNpdGUgaGFzIHB1Ymxpc2hlZCB0byBhIGNoYW5uZWxcbiAgY2hhbm5lbEF2YWlsYWJpbGl0eVJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpIHtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5KG5hbWUpXG4gICAgICAudGhlbihhdmFpbGFibGVOYW1lID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYXZhaWxhYmxlTmFtZSk7XG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vIHJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcbiAgY2hhbm5lbFNob3J0SWRSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpIHtcbiAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNob3J0SWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIGNoYW5uZWxEYXRhUm91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gICAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgY2hhbm5lbENsYWltc1JvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykge1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICAgIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICAgIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vIHJvdXRlIHRvIHJ1biBhIGNsYWltX2xpc3QgcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGNsYWltTGlzdFJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykge1xuICAgIGdldENsYWltTGlzdChwYXJhbXMubmFtZSlcbiAgICAgIC50aGVuKGNsYWltc0xpc3QgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjbGFpbXNMaXN0KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBnZXQgYW4gYXNzZXRcbiAgY2xhaW1HZXRSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpIHtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAgIC8vIHJlc29sdmUgdGhlIGNsYWltXG4gICAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKG5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihyZXNvbHZlUmVzdWx0ID0+IHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIGEgY2xhaW0gYWN0dWFsbHkgZXhpc3RzIGF0IHRoYXQgdXJpXG4gICAgICAgIGlmICghcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWF0Y2hpbmcgdXJpIGZvdW5kIGluIENsYWltIHRhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZpbGVEYXRhID0gY3JlYXRlRmlsZURhdGEocmVzb2x2ZVJlc3VsdCk7XG4gICAgICAgIC8vIGdldCB0aGUgY2xhaW1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlRGF0YSwgZ2V0Q2xhaW0oYCR7bmFtZX0jJHtjbGFpbUlkfWApXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFsgZmlsZURhdGEsIGdldFJlc3VsdCBdKSA9PiB7XG4gICAgICAgIGZpbGVEYXRhID0gYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEoZmlsZURhdGEsIGdldFJlc3VsdCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVEYXRhLCB7bmFtZSwgY2xhaW1JZH0sICdGaWxlJyksIGdldFJlc3VsdF0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbIGZpbGVSZWNvcmQsIHttZXNzYWdlLCBjb21wbGV0ZWR9IF0pID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlLCBjb21wbGV0ZWQgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cbiAgY2xhaW1BdmFpbGFiaWxpdHlSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBydW4gYSByZXNvbHZlIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBjbGFpbVJlc29sdmVSb3V0ZSAoeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpIHtcbiAgICByZXNvbHZlVXJpKGAke3BhcmFtcy5uYW1lfSMke3BhcmFtcy5jbGFpbUlkfWApXG4gICAgICAudGhlbihyZXNvbHZlZFVyaSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc29sdmVkVXJpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBydW4gYSBwdWJsaXNoIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBjbGFpbVB1Ymxpc2hSb3V0ZSAoeyBib2R5LCBmaWxlcywgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCB1c2VyIH0sIHJlcykge1xuICAgIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAgIC8vIHJlY29yZCB0aGUgc3RhcnQgdGltZSBvZiB0aGUgcmVxdWVzdFxuICAgIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgICB0cnkge1xuICAgICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAgICh7ZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZX0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMoZmlsZXMpKTtcbiAgICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIGF1dGhlbnRpY2F0ZVVzZXIoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSxcbiAgICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpLFxuICAgICAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCksXG4gICAgICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zKHRodW1ibmFpbEZpbGVQYXRoLCBuYW1lLCBsaWNlbnNlLCBuc2Z3KSxcbiAgICBdKVxuICAgICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICAgIHB1Ymxpc2godGh1bWJuYWlsUHVibGlzaFBhcmFtcywgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgICByZXR1cm4gcHVibGlzaChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICAgIGRhdGEgICA6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgICB1cmwgICAgOiBgJHtob3N0fS8ke3Jlc3VsdC5jbGFpbV9pZH0vJHtuYW1lfWAsXG4gICAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vIHJvdXRlIHRvIGdldCBhIHNob3J0IGNsYWltIGlkIGZyb20gbG9uZyBjbGFpbSBJZFxuICBjbGFpbVNob3J0SWRSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpIHtcbiAgICBkYi5DbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHNob3J0SWR9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICBjbGFpbUxvbmdJZFJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykge1xuICAgIGxvZ2dlci5kZWJ1ZygnYm9keTonLCBib2R5KTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGJvZHkuY2hhbm5lbE5hbWU7XG4gICAgY29uc3QgY2hhbm5lbENsYWltSWQgPSBib2R5LmNoYW5uZWxDbGFpbUlkO1xuICAgIGNvbnN0IGNsYWltTmFtZSA9IGJvZHkuY2xhaW1OYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBib2R5LmNsYWltSWQ7XG4gICAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0ID09PSBOT19DTEFJTSkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0fSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgY2xhaW1EYXRhUm91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgY29uc3QgY2xhaW1OYW1lID0gcGFyYW1zLmNsYWltTmFtZTtcbiAgICBsZXQgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAgIGlmIChjbGFpbUlkID09PSAnbm9uZScpIGNsYWltSWQgPSBudWxsO1xuICAgIGRiLkNsYWltLnJlc29sdmVDbGFpbShjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihjbGFpbUluZm8gPT4ge1xuICAgICAgICBpZiAoIWNsYWltSW5mbykge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBjbGFpbSBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogY2xhaW1JbmZvfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgLy8gcm91dGUgdG8gc2VlIGlmIGFzc2V0IGlzIGF2YWlsYWJsZSBsb2NhbGx5XG4gIGZpbGVBdmFpbGFiaWxpdHlSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpIHtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAgIGRiLkZpbGUuZmluZE9uZSh7d2hlcmU6IHtuYW1lLCBjbGFpbUlkfX0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGZhbHNlfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaVJvdXRlcy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDZXJ0aWZpY2F0ZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NlcnRpZmljYXRlJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAga2V5VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHVibGljS2V5OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENlcnRpZmljYXRlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDZXJ0aWZpY2F0ZS5iZWxvbmdzVG8oZGIuQ2hhbm5lbCwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobG9uZ0NoYW5uZWxJZCwgY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgJHtjaGFubmVsTmFtZX06JHtsb25nQ2hhbm5lbElkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge25hbWU6IGNoYW5uZWxOYW1lfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsKHMpIGZvdW5kIHdpdGggdGhhdCBjaGFubmVsIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBsb25nQ2hhbm5lbElkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7Y2hhbm5lbENsYWltSWR9JWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSgke2NoYW5uZWxOYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2hhbm5lbE5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUudmFsaWRhdGVMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYHZhbGlkYXRlTG9uZ0NoYW5uZWxJZCgke25hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgJiYgKGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ2xhaW1JZCAmJiBjaGFubmVsQ2xhaW1JZC5sZW5ndGggPCA0MCkgeyAgLy8gaWYgYSBzaG9ydCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoY2hhbm5lbE5hbWUpOyAgLy8gaWYgbm8gY2hhbm5lbCBpZCBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQ2VydGlmaWNhdGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBDaGFubmVsID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2hhbm5lbCcsXG4gICAge1xuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDaGFubmVsLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDaGFubmVsLmJlbG9uZ3NUbyhkYi5Vc2VyKTtcbiAgICBDaGFubmVsLmhhc09uZShkYi5DZXJ0aWZpY2F0ZSk7XG4gIH07XG5cbiAgcmV0dXJuIENoYW5uZWw7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcbmNvbnN0IHsgYXNzZXREZWZhdWx0czogeyB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlKSB7XG4gIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgcmV0dXJuICdqcGVnJztcbiAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgcmV0dXJuICdwbmcnO1xuICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICByZXR1cm4gJ2dpZic7XG4gICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgIHJldHVybiAnbXA0JztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmRlYnVnKCdzZXR0aW5nIHVua25vd24gZmlsZSB0eXBlIGFzIGZpbGUgZXh0ZW5zaW9uIGpwZWcnKTtcbiAgICAgIHJldHVybiAnanBlZyc7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRldGVybWluZVRodW1ibmFpbCAoc3RvcmVkVGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKSB7XG4gIGlmIChzdG9yZWRUaHVtYm5haWwgPT09ICcnKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRUaHVtYm5haWw7XG4gIH1cbiAgcmV0dXJuIHN0b3JlZFRodW1ibmFpbDtcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFpbURhdGEgKGNsYWltKSB7XG4gIC8vIGxvZ2dlci5kZWJ1ZygncHJlcGFyaW5nIGNsYWltIGRhdGEgYmFzZWQgb24gcmVzb2x2ZWQgZGF0YTonLCBjbGFpbSk7XG4gIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gIGNsYWltWydob3N0J10gPSBob3N0O1xuICByZXR1cm4gY2xhaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2xhaW0gPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDbGFpbScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVJZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2VVcmw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBtZXRhZGF0YVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNvbnRlbnRUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2xhaW0uYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENsYWltLmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIGZvciAke2NsYWltTmFtZX0jJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbShzKSBmb3VuZCB3aXRoIHRoYXQgY2xhaW0gbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgY2xhaW1JZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zIGZvciAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICAgIHJhdyAgOiB0cnVlLCAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiBvbmx5IGRhdGEsIG5vdCBhbiBhcnJheSBvZiBpbnN0YW5jZXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbENsYWltc0FycmF5ID0+IHtcbiAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ2NoYW5uZWxjbGFpbXNhcnJheSBsZW5ndGg6JywgY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgY2hhbm5lbENsYWltc0FycmF5LmZvckVhY2goY2xhaW0gPT4ge1xuICAgICAgICAgICAgICAgIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgICAgICAgICAgICAgICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhaW07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShjaGFubmVsQ2xhaW1zQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGZpbmRpbmcgY2xhaW0gaWQgZm9yIGNsYWltICR7Y2xhaW1OYW1lfSBmcm9tIGNoYW5uZWwgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lLCBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydpZCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYCR7cmVzdWx0Lmxlbmd0aH0gcmVjb3JkcyBmb3VuZCBmb3IgXCIke2NsYWltTmFtZX1cIiBpbiBjaGFubmVsIFwiJHtjaGFubmVsQ2xhaW1JZH1cImApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBzaG9ydElkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7c2hvcnRJZH0lYCxcbiAgICAgICAgICAgIH19LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSwgIC8vIG5vdGU6IG1heWJlIGhlaWdodCBhbmQgZWZmZWN0aXZlIGFtb3VudCBuZWVkIHRvIHN3aXRjaD9cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2xlbmd0aCBvZiByZXN1bHQnLCByZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uZGF0YVZhbHVlcy5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0udmFsaWRhdGVMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2xhaW1JZCgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgaWYgKGNsYWltSWQgJiYgKGNsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2xhaW1JZCAmJiBjbGFpbUlkLmxlbmd0aCA8IDQwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTsgIC8vIGlmIGEgc2hvcnQgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZShjbGFpbU5hbWUpOyAgLy8gaWYgbm8gY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgQ2xhaW0ucmVzb2x2ZUNsYWltID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLnJlc29sdmVDbGFpbTogJHtuYW1lfSAke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2xhaW1BcnJheSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjbGFpbUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgbW9yZSB0aGFuIG9uZSByZWNvcmQgbWF0Y2hlcyAke25hbWV9IyR7Y2xhaW1JZH0gaW4gZGIuQ2xhaW1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIENsYWltO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSIH0pID0+IHtcbiAgY29uc3QgRmlsZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0ZpbGUnLFxuICAgIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgICA6IElOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHQgIDogMCxcbiAgICAgIH0sXG4gICAgICBmaWxlTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlUGF0aDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlVHlwZToge1xuICAgICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdHJlbmRpbmdFbGlnaWJsZToge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIEZpbGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIEZpbGUuaGFzTWFueShkYi5SZXF1ZXN0KTtcbiAgICBGaWxlLmhhc09uZShkYi5DbGFpbSk7XG4gIH07XG5cbiAgRmlsZS5nZXRSZWNlbnRDbGFpbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7XG4gICAgICB3aGVyZTogeyBuc2Z3OiBmYWxzZSwgdHJlbmRpbmdFbGlnaWJsZTogdHJ1ZSB9LFxuICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgbGltaXQ6IDI1LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBGaWxlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIFRFWFQgfSkgPT4ge1xuICBjb25zdCBSZXF1ZXN0ID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnUmVxdWVzdCcsXG4gICAge1xuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpcEFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgUmVxdWVzdC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgUmVxdWVzdC5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSZXF1ZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgVXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1VzZXInLFxuICAgIHtcbiAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgVXNlci5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgVXNlci5oYXNPbmUoZGIuQ2hhbm5lbCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY29tcGFyZVBhc3N3b3JkID0gZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChuZXdQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKG5ld1Bhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGN1cnJlbnQgcGFzc3dvcmQgd2l0aCB0aGUgbmV3IGhhc2hcbiAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAudXBkYXRlKHtwYXNzd29yZDogaGFzaH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gcHJlLXNhdmUgaG9vayBtZXRob2QgdG8gaGFzaCB0aGUgdXNlcidzIHBhc3N3b3JkIGJlZm9yZSB0aGUgdXNlcidzIGluZm8gaXMgc2F2ZWQgdG8gdGhlIGRiLlxuICBVc2VyLmhvb2soJ2JlZm9yZUNyZWF0ZScsICh1c2VyLCBvcHRpb25zKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdVc2VyLmJlZm9yZUNyZWF0ZSBob29rLi4uJyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBwYXNzd29yZCBzdHJpbmcgd2l0aCB0aGUgaGFzaCBwYXNzd29yZCB2YWx1ZVxuICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBoYXNoO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFVzZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy91c2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmNyeXB0XCJcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzJyk7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBwdWJsaXNoSGVscGVycyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyBwcmltYXJ5Q2xhaW1BZGRyZXNzLCBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgT3AgPSBTZXF1ZWxpemUuT3A7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoIChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHB1Ymxpc2hSZXN1bHRzLCBjZXJ0aWZpY2F0ZUlkLCBjaGFubmVsTmFtZTtcbiAgICAgIC8vIHB1Ymxpc2ggdGhlIGZpbGVcbiAgICAgIHJldHVybiBsYnJ5QXBpLnB1Ymxpc2hDbGFpbShwdWJsaXNoUGFyYW1zKVxuICAgICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFN1Y2Nlc3NmdWxseSBwdWJsaXNoZWQgJHtwdWJsaXNoUGFyYW1zLm5hbWV9ICR7ZmlsZU5hbWV9YCwgdHgpO1xuICAgICAgICAgIHB1Ymxpc2hSZXN1bHRzID0gdHg7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgaWYgKHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYHRoaXMgY2xhaW0gd2FzIHB1Ymxpc2hlZCBpbiBjaGFubmVsOiAke3B1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGRiLkNoYW5uZWwuZmluZE9uZSh7d2hlcmU6IHtjaGFubmVsTmFtZTogcHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWV9fSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygndGhpcyBjbGFpbSB3YXMgbm90IHB1Ymxpc2hlZCBpbiBhIGNoYW5uZWwnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgIC8vIHNldCBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgY2VydGlmaWNhdGVJZCA9IG51bGw7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgPSBudWxsO1xuICAgICAgICAgIGlmIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gY2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lID0gY2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKGBjZXJ0aWZpY2F0ZUlkOiAke2NlcnRpZmljYXRlSWR9YCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBGaWxlIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGZpbGVSZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgZmlsZVBhdGggICA6IHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoLFxuICAgICAgICAgICAgZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gY3JlYXRlIHRoZSBDbGFpbSByZWNvcmRcbiAgICAgICAgICBjb25zdCBjbGFpbVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIHRodW1ibmFpbCAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRodW1ibmFpbCxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICAgIGFtb3VudCAgICAgOiBwdWJsaXNoUGFyYW1zLmJpZCxcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQsXG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCBjcml0ZXJpYVxuICAgICAgICAgIGNvbnN0IHVwc2VydENyaXRlcmlhID0ge1xuICAgICAgICAgICAgbmFtZSAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgdGhlIHJlY29yZHNcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0ZpbGUnKSwgZGIudXBzZXJ0KGRiLkNsYWltLCBjbGFpbVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdDbGFpbScpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbZmlsZSwgY2xhaW1dKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlLnNldENsYWltKGNsYWltKSwgY2xhaW0uc2V0RmlsZShmaWxlKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgICAgcmVzb2x2ZShwdWJsaXNoUmVzdWx0cyk7IC8vIHJlc29sdmUgdGhlIHByb21pc2Ugd2l0aCB0aGUgcmVzdWx0IGZyb20gbGJyeUFwaS5wdWJsaXNoQ2xhaW07XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdQVUJMSVNIIEVSUk9SJywgZXJyb3IpO1xuICAgICAgICAgIHB1Ymxpc2hIZWxwZXJzLmRlbGV0ZVRlbXBvcmFyeUZpbGUocHVibGlzaFBhcmFtcy5maWxlX3BhdGgpOyAvLyBkZWxldGUgdGhlIGxvY2FsIGZpbGVcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUgKG5hbWUpIHtcbiAgICBjb25zdCBjbGFpbUFkZHJlc3NlcyA9IGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB8fCBbXTtcbiAgICBjbGFpbUFkZHJlc3Nlcy5wdXNoKHByaW1hcnlDbGFpbUFkZHJlc3MpO1xuICAgIC8vIGZpbmQgYW55IHJlY29yZHMgd2hlcmUgdGhlIG5hbWUgaXMgdXNlZFxuICAgIHJldHVybiBkYi5DbGFpbVxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbJ2FkZHJlc3MnXSxcbiAgICAgICAgd2hlcmUgICAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWRkcmVzczoge1xuICAgICAgICAgICAgW09wLm9yXTogY2xhaW1BZGRyZXNzZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNsYWltIGlzIGFscmVhZHkgaW4gdXNlJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSAobmFtZSkge1xuICAgIHJldHVybiBkYi5DaGFubmVsXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IGNoYW5uZWxOYW1lOiBuYW1lIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjaGFubmVsIGhhcyBhbHJlYWR5IGJlZW4gY2xhaW1lZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFuZGxlRXJyb3JSZXNwb25zZTogZnVuY3Rpb24gKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcykge1xuICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igb24gJHtvcmlnaW5hbFVybH1gLCBtb2R1bGUuZXhwb3J0cy51c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMoZXJyb3IpKTtcbiAgICBjb25zdCBbc3RhdHVzLCBtZXNzYWdlXSA9IG1vZHVsZS5leHBvcnRzLnJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyhlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKHN0YXR1cylcbiAgICAgIC5qc29uKG1vZHVsZS5leHBvcnRzLmNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkKHN0YXR1cywgbWVzc2FnZSkpO1xuICB9LFxuICByZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGxldCBzdGF0dXMsIG1lc3NhZ2U7XG4gICAgLy8gY2hlY2sgZm9yIGRhZW1vbiBiZWluZyB0dXJuZWQgb2ZmXG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICBzdGF0dXMgPSA1MDM7XG4gICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gcmVmdXNlZC4gIFRoZSBkYWVtb24gbWF5IG5vdCBiZSBydW5uaW5nLic7XG4gICAgICAvLyBmYWxsYmFjayBmb3IgZXZlcnl0aGluZyBlbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IDQwMDtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBbc3RhdHVzLCBtZXNzYWdlXTtcbiAgfSxcbiAgdXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID09PSAwKSB7XG4gICAgICBsZXQgbmV3RXJyb3JPYmplY3QgPSB7fTtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIG5ld0Vycm9yT2JqZWN0W2tleV0gPSBlcnJba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0Vycm9yT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9LFxuICBjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJjb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aGVudGljYXRlVXNlciAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSB7XG4gICAgLy8gY2FzZTogbm8gY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgKGFub255bW91cyksIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB1c2VyIHRva2VuIGlzIHByb3ZpZGVkXG4gICAgaWYgKCFjaGFubmVsTmFtZSAmJiAhY2hhbm5lbElkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogbnVsbCxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHVzZXIgdG9rZW5cbiAgICBpZiAodXNlcikge1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxOYW1lICE9PSB1c2VyLmNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgbmFtZSBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbm5lbElkICYmIGNoYW5uZWxJZCAhPT0gdXNlci5jaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIGlkIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiB1c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogdXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggcGFzc3dvcmQgaW5zdGVhZCBvZiB1c2VyIHRva2VuXG4gICAgaWYgKCFjaGFubmVsUGFzc3dvcmQpIHRocm93IG5ldyBFcnJvcignbm8gY2hhbm5lbCBwYXNzd29yZCBwcm92aWRlZCcpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5hdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkKTtcbiAgfSxcbiAgYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCB1c2VyUGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gaG9pc3RlZCB2YXJpYWJsZXNcbiAgICAgIGxldCBjaGFubmVsRGF0YTtcbiAgICAgIC8vIGJ1aWxkIHRoZSBwYXJhbXMgZm9yIGZpbmRpbmcgdGhlIGNoYW5uZWxcbiAgICAgIGxldCBjaGFubmVsRmluZFBhcmFtcyA9IHt9O1xuICAgICAgaWYgKGNoYW5uZWxOYW1lKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgaWYgKGNoYW5uZWxJZCkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsSWQ7XG4gICAgICAvLyBmaW5kIHRoZSBjaGFubmVsXG4gICAgICBkYi5DaGFubmVsXG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogY2hhbm5lbEZpbmRQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyBjaGFubmVsIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hhbm5lbERhdGEgPSBjaGFubmVsLmdldCgpO1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBkYXRhOicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGIuVXNlci5maW5kT25lKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IHVzZXJOYW1lOiBjaGFubmVsRGF0YS5jaGFubmVsTmFtZS5zdWJzdHJpbmcoMSkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQodXNlclBhc3N3b3JkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnLi4ucGFzc3dvcmQgd2FzIGEgbWF0Y2guLi4nKTtcbiAgICAgICAgICByZXNvbHZlKGNoYW5uZWxEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvYXV0aC9hdXRoZW50aWNhdGlvbi5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsImNvbnN0IENMQUlNU19QRVJfUEFHRSA9IDEyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2xhaW1zLCBwYWdlKSB7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsUGFnZXMoY2xhaW1zKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uUGFnZSA9IG1vZHVsZS5leHBvcnRzLmdldFBhZ2VGcm9tUXVlcnkocGFnZSk7XG4gICAgY29uc3Qgdmlld0RhdGEgPSB7XG4gICAgICBjaGFubmVsTmFtZSAgICAgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbXMgICAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmV4dHJhY3RQYWdlRnJvbUNsYWltcyhjbGFpbXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHByZXZpb3VzUGFnZSAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lUHJldmlvdXNQYWdlKHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlICAgICAgIDogcGFnaW5hdGlvblBhZ2UsXG4gICAgICBuZXh0UGFnZSAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZU5leHRQYWdlKHRvdGFsUGFnZXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHRvdGFsUGFnZXMgICAgICAgIDogdG90YWxQYWdlcyxcbiAgICAgIHRvdGFsUmVzdWx0cyAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxDbGFpbXMoY2xhaW1zKSxcbiAgICB9O1xuICAgIHJldHVybiB2aWV3RGF0YTtcbiAgfSxcbiAgZ2V0UGFnZUZyb21RdWVyeSAocGFnZSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFnZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9LFxuICBleHRyYWN0UGFnZUZyb21DbGFpbXMgKGNsYWltcywgcGFnZU51bWJlcikge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gW107ICAvLyBpZiBubyBjbGFpbXMsIHJldHVybiB0aGlzIGRlZmF1bHRcbiAgICB9XG4gICAgLy8gbG9nZ2VyLmRlYnVnKCdjbGFpbXMgaXMgYXJyYXk/JywgQXJyYXkuaXNBcnJheShjbGFpbXMpKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoYHBhZ2VOdW1iZXIgJHtwYWdlTnVtYmVyfSBpcyBudW1iZXI/YCwgTnVtYmVyLmlzSW50ZWdlcihwYWdlTnVtYmVyKSk7XG4gICAgY29uc3QgY2xhaW1TdGFydEluZGV4ID0gKHBhZ2VOdW1iZXIgLSAxKSAqIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBjbGFpbUVuZEluZGV4ID0gY2xhaW1TdGFydEluZGV4ICsgQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IHBhZ2VPZkNsYWltcyA9IGNsYWltcy5zbGljZShjbGFpbVN0YXJ0SW5kZXgsIGNsYWltRW5kSW5kZXgpO1xuICAgIHJldHVybiBwYWdlT2ZDbGFpbXM7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsUGFnZXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG90YWxDbGFpbXMgPSBjbGFpbXMubGVuZ3RoO1xuICAgICAgaWYgKHRvdGFsQ2xhaW1zIDwgQ0xBSU1TX1BFUl9QQUdFKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgY29uc3QgZnVsbFBhZ2VzID0gTWF0aC5mbG9vcih0b3RhbENsYWltcyAvIENMQUlNU19QRVJfUEFHRSk7XG4gICAgICBjb25zdCByZW1haW5kZXIgPSB0b3RhbENsYWltcyAlIENMQUlNU19QRVJfUEFHRTtcbiAgICAgIGlmIChyZW1haW5kZXIgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZ1bGxQYWdlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdWxsUGFnZXMgKyAxO1xuICAgIH1cbiAgfSxcbiAgZGV0ZXJtaW5lUHJldmlvdXNQYWdlIChjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSAtIDE7XG4gIH0sXG4gIGRldGVybWluZU5leHRQYWdlICh0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gdG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSArIDE7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsQ2xhaW1zIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBjbGFpbXMubGVuZ3RoO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBMb2dnZXJDb25maWcgKCkge1xuICB0aGlzLmxvZ0xldmVsID0gJ2RlYnVnJztcbiAgdGhpcy5jb25maWd1cmUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gbG9nZ2VyIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2NvbmZpZ3VyaW5nIHdpbnN0b24gbG9nZ2VyLi4uJyk7XG4gICAgLy8gdXBkYXRlIHZhbHVlcyB3aXRoIGxvY2FsIGNvbmZpZyBwYXJhbXNcbiAgICBjb25zdCB7bG9nTGV2ZWx9ID0gY29uZmlnO1xuICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcbiAgICAvLyBjb25maWd1cmUgdGhlIHdpbnN0b24gbG9nZ2VyXG4gICAgbG9nZ2VyLmNvbmZpZ3VyZSh7XG4gICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgIG5ldyAobG9nZ2VyLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubG9nTGV2ZWwsXG4gICAgICAgICAgdGltZXN0YW1wICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBwcmV0dHlQcmludCAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnMgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIC8vIHRlc3QgYWxsIHRoZSBsb2cgbGV2ZWxzXG4gICAgY29uc29sZS5sb2coJ3Rlc3Rpbmcgd2luc3RvbiBsb2cgbGV2ZWxzLi4uJyk7XG4gICAgbG9nZ2VyLmVycm9yKCdMZXZlbCAwJyk7XG4gICAgbG9nZ2VyLndhcm4oJ0xldmVsIDEnKTtcbiAgICBsb2dnZXIuaW5mbygnTGV2ZWwgMicpO1xuICAgIGxvZ2dlci52ZXJib3NlKCdMZXZlbCAzJyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdMZXZlbCA0Jyk7XG4gICAgbG9nZ2VyLnNpbGx5KCdMZXZlbCA1Jyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb2dnZXJDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJjb25zdCB3aW5zdG9uU2xhY2tXZWJIb29rID0gcmVxdWlyZSgnd2luc3Rvbi1zbGFjay13ZWJob29rJykuU2xhY2tXZWJIb29rO1xuY29uc3Qgd2luc3RvbiA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU2xhY2tDb25maWcgKCkge1xuICB0aGlzLnNsYWNrV2ViSG9vayAgICAgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdubyBzbGFjayBjb25maWcgcmVjZWl2ZWQnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlc1xuICAgIGNvbnNvbGUubG9nKCdjb25maWd1cmluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICBjb25zdCB7c2xhY2tXZWJIb29rLCBzbGFja0Vycm9yQ2hhbm5lbCwgc2xhY2tJbmZvQ2hhbm5lbH0gPSBjb25maWc7XG4gICAgdGhpcy5zbGFja1dlYkhvb2sgPSBzbGFja1dlYkhvb2s7XG4gICAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9IHNsYWNrRXJyb3JDaGFubmVsO1xuICAgIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCA9IHNsYWNrSW5mb0NoYW5uZWw7XG4gICAgLy8gdXBkYXRlIHNsYWNrIHdlYmhvb2sgc2V0dGluZ3NcbiAgICBpZiAodGhpcy5zbGFja1dlYkhvb2spIHtcbiAgICAgIC8vIGFkZCBhIHRyYW5zcG9ydCBmb3IgZXJyb3JzIHRvIHNsYWNrXG4gICAgICBpZiAodGhpcy5zbGFja0Vycm9yQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICd3YXJuJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrRXJyb3JDaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOmZhY2Vfd2l0aF9oZWFkX2JhbmRhZ2U6JyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgaWYgKHNsYWNrSW5mb0NoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ2luZm8nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpuZXJkX2ZhY2U6JyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgLy8gc2VuZCB0ZXN0IG1lc3NhZ2VzXG4gICAgICBjb25zb2xlLmxvZygndGVzdGluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICAgIHdpbnN0b24uZXJyb3IoJ1NsYWNrIFwiZXJyb3JcIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbnN0b24ud2FybignU2xhY2sgbG9nZ2luZyBpcyBub3QgZW5hYmxlZCBiZWNhdXNlIG5vIHNsYWNrV2ViSG9vayBjb25maWcgdmFyIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNsYWNrQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIlxuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzJyk7XG5cbmNvbnN0IHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyA9ICh1c2VySW5zdGFuY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICB1c2VySW5mb1snaWQnXSA9IHVzZXJJbnN0YW5jZS5pZDtcbiAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IHVzZXJJbnN0YW5jZS51c2VyTmFtZTtcbiAgICB1c2VySW5zdGFuY2VcbiAgICAgIC5nZXRDaGFubmVsKClcbiAgICAgIC50aGVuKCh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSkgPT4ge1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChjaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIHJldHVybiBkYi5Vc2VyXG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7dXNlck5hbWU6IHVzZXJuYW1lfSxcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZChwYXNzd29yZClcbiAgICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1Bhc3N3b3JkIHdhcyBhIG1hdGNoLCByZXR1cm5pbmcgVXNlcicpO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyh1c2VyKVxuICAgICAgICAgICAgICAudGhlbih1c2VySW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9LFxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiXSwic291cmNlUm9vdCI6IiJ9