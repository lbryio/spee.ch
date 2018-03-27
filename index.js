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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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


var Sequelize = __webpack_require__(3);
var logger = __webpack_require__(0);

logger.info('exporting sequelize models');

var _require = __webpack_require__(4),
    database = _require.database,
    username = _require.username,
    password = _require.password;

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
var Certificate = __webpack_require__(14);
var Channel = __webpack_require__(15);
var Claim = __webpack_require__(16);
var File = __webpack_require__(17);
var Request = __webpack_require__(18);
var User = __webpack_require__(19);
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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(22);
var logger = __webpack_require__(0);

var _require = __webpack_require__(23),
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var ua = __webpack_require__(24);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var fs = __webpack_require__(25);

var _require = __webpack_require__(1),
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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(10);
__webpack_require__(11);
module.exports = __webpack_require__(12);


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const Server = require('./server/server.js');
// const Components = require('./client/components');
// const Containers = require('./client/containers');
// const Pages = require('./client/pages');
var apiRoutes = __webpack_require__(13);
var logger = __webpack_require__(30);
var mysql = __webpack_require__(4);
var slack = __webpack_require__(31);
var database = __webpack_require__(2);

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
  database: database
};

module.exports = _exports;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(0);

var _require = __webpack_require__(1),
    host = _require.details.host;

var db = __webpack_require__(2);

var _require2 = __webpack_require__(21),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    checkChannelAvailability = _require2.checkChannelAvailability,
    publish = _require2.publish;

var _require3 = __webpack_require__(6),
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

var errorHandlers = __webpack_require__(26);

var _require5 = __webpack_require__(7),
    sendGATimingEvent = _require5.sendGATimingEvent;

var _require6 = __webpack_require__(27),
    authenticateUser = _require6.authenticateUser;

var _require7 = __webpack_require__(28),
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(5),
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);

var _require = __webpack_require__(5),
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(20);
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
/* 20 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(0);
var db = __webpack_require__(2);
var lbryApi = __webpack_require__(6);
var publishHelpers = __webpack_require__(8);

var _require = __webpack_require__(1),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(3);
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
/* 22 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(2);
var logger = __webpack_require__(0);

var _require = __webpack_require__(29),
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
/* 29 */
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
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(32).SlackWebHook;
var winston = __webpack_require__(0);

function SlackConfig() {
  var _this = this;

  this.slackWebHook = 'default';
  this.slackErrorChannel = 'default';
  this.slackInfoChannel = 'default';
  this.configure = function (config) {
    if (!config) {
      return console.log('No slack config received.');
    }
    // update variables
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
      winston.error('Slack "error" logging is online.');
      winston.info('Slack "info" logging is online.');
    } else {
      winston.warn('Slack logging is not enabled because no slackWebHook config var provided.');
    }
  };
};

module.exports = new SlackConfig();

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTA2YjIwZjZmZmVhNmNhMzgyMTUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3RvblwiIiwid2VicGFjazovLy8uL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIiIsIndlYnBhY2s6Ly8vLi9zcGVlY2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGlSb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiXSwibmFtZXMiOlsiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiY29udGFpbmVycyIsInBhZ2VzIiwiZGV0YWlscyIsImhvc3QiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwiY29uZmlndXJlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJTZXF1ZWxpemUiLCJyZXF1aXJlIiwibG9nZ2VyIiwiaW5mbyIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImRiIiwic2VxdWVsaXplIiwiZGlhbGVjdCIsImRpYWxlY3RPcHRpb25zIiwiZGVjaW1hbE51bWJlcnMiLCJsb2dnaW5nIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJhY3F1aXJlIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImNhdGNoIiwiZXJyb3IiLCJlcnIiLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsImltcG9ydCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibW9kZWxOYW1lIiwiYXNzb2NpYXRlIiwidXBzZXJ0IiwiTW9kZWwiLCJ2YWx1ZXMiLCJjb25kaXRpb24iLCJ0YWJsZU5hbWUiLCJmaW5kT25lIiwid2hlcmUiLCJvYmoiLCJkZWJ1ZyIsInVwZGF0ZSIsImNyZWF0ZSIsIm15c3FsIiwicmV0dXJuU2hvcnRJZCIsImNsYWltc0FycmF5IiwibG9uZ0lkIiwiY2xhaW1JbmRleCIsInNob3J0SWQiLCJzdWJzdHJpbmciLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwiZWxlbWVudCIsImNsYWltSWQiLCJFcnJvciIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwibGVuZ3RoIiwiZmlsdGVyIiwiYXhpb3MiLCJhcGkiLCJhcGlIb3N0IiwiYXBpUG9ydCIsImxicnlBcGlVcmkiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJzZW5kR0FUaW1pbmdFdmVudCIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJkYXRhIiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInB1Ymxpc2hDbGFpbSIsInB1Ymxpc2hQYXJhbXMiLCJuYW1lIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwiUHJvbWlzZSIsInBvc3QiLCJtZXRob2QiLCJwYXJhbXMiLCJyZXNwb25zZSIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJjaGFubmVsX25hbWUiLCJhbW91bnQiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiaXAiLCJvcmlnaW5hbFVybCIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsImNoYW5uZWxOYW1lIiwiY2hhbm5lbElkIiwiY2hhbm5lbF9pZCIsImZzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkiLCJuc2Z3IiwibGljZW5zZSIsImludmFsaWROYW1lQ2hhcmFjdGVycyIsImV4ZWMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMiLCJmaWxlIiwicGF0aCIsInR5cGUiLCJzaXplIiwidGVzdCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwiZmlsZU5hbWUiLCJmaWxlUGF0aCIsImZpbGVUeXBlIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImZpbGVfcGF0aCIsImJpZCIsIm1ldGFkYXRhIiwiYXV0aG9yIiwibGFuZ3VhZ2UiLCJjbGFpbV9hZGRyZXNzIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImRlbGV0ZVRlbXBvcmFyeUZpbGUiLCJ1bmxpbmsiLCJhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSIsImZpbGVJbmZvIiwiZ2V0UmVzdWx0IiwiZmlsZV9uYW1lIiwiZG93bmxvYWRfcGF0aCIsImNyZWF0ZUZpbGVEYXRhIiwib3V0cG9pbnQiLCJoZWlnaHQiLCJhZGRyZXNzIiwiY29udGVudFR5cGUiLCJhcGlSb3V0ZXMiLCJzbGFjayIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IiwicHVibGlzaCIsImVycm9ySGFuZGxlcnMiLCJhdXRoZW50aWNhdGVVc2VyIiwiZ2V0Q2hhbm5lbERhdGEiLCJnZXRDaGFubmVsQ2xhaW1zIiwiZ2V0Q2xhaW1JZCIsIk5PX0NIQU5ORUwiLCJOT19DTEFJTSIsImNoYW5uZWxBdmFpbGFiaWxpdHlSb3V0ZSIsInJlcyIsInN0YXR1cyIsImpzb24iLCJhdmFpbGFibGVOYW1lIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsImNoYW5uZWxTaG9ydElkUm91dGUiLCJnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkIiwiY2hhbm5lbERhdGFSb3V0ZSIsImJvZHkiLCJjaGFubmVsQ2xhaW1JZCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiY2hhbm5lbENsYWltc1JvdXRlIiwicGFnZSIsImNsYWltTGlzdFJvdXRlIiwiY2xhaW1zTGlzdCIsImNsYWltR2V0Um91dGUiLCJyZXNvbHZlQ2xhaW0iLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJhbGwiLCJmaWxlUmVjb3JkIiwiY29tcGxldGVkIiwiY2xhaW1BdmFpbGFiaWxpdHlSb3V0ZSIsImNsYWltUmVzb2x2ZVJvdXRlIiwicmVzb2x2ZWRVcmkiLCJjbGFpbVB1Ymxpc2hSb3V0ZSIsImZpbGVzIiwidXNlciIsImNoYW5uZWxQYXNzd29yZCIsInZhbGlkYXRlZENsYWltTmFtZSIsInRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJjbGFpbV9pZCIsInVybCIsImxicnlUeCIsImNsYWltU2hvcnRJZFJvdXRlIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwiY2xhaW1Mb25nSWRSb3V0ZSIsImNsYWltRGF0YVJvdXRlIiwiY2xhaW1JbmZvIiwiZmlsZUF2YWlsYWJpbGl0eVJvdXRlIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImRlZmF1bHQiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJub3V0IiwidHhpZCIsInZhbGlkQXRIZWlnaHQiLCJ2YWx1ZVZlcnNpb24iLCJjbGFpbVR5cGUiLCJjZXJ0aWZpY2F0ZVZlcnNpb24iLCJrZXlUeXBlIiwicHVibGljS2V5IiwiZnJlZXplVGFibGVOYW1lIiwiYmVsb25nc1RvIiwiZm9yZWlnbktleSIsImFsbG93TnVsbCIsImxvbmdDaGFubmVsSWQiLCJmaW5kQWxsIiwib3JkZXIiLCJnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkIiwiJGxpa2UiLCJnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lIiwidmFsaWRhdGVMb25nQ2hhbm5lbElkIiwiZ2V0TG9uZ0NoYW5uZWxJZCIsImhhc09uZSIsImRlZmF1bHRUaHVtYm5haWwiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImNsYWltIiwiY2VydGlmaWNhdGVJZCIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0QWxsQ2hhbm5lbENsYWltcyIsInJhdyIsImNoYW5uZWxDbGFpbXNBcnJheSIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwiZGF0YVZhbHVlcyIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJnZXRMb25nQ2xhaW1JZCIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiYWN0aW9uIiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwidXNlck5hbWUiLCJwcm90b3R5cGUiLCJjb21wYXJlUGFzc3dvcmQiLCJjb21wYXJlIiwiY2hhbmdlUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImdlblNhbHQiLCJzYWx0RXJyb3IiLCJzYWx0IiwiaGFzaCIsImhhc2hFcnJvciIsImhvb2siLCJvcHRpb25zIiwibGJyeUFwaSIsInB1Ymxpc2hIZWxwZXJzIiwiT3AiLCJwdWJsaXNoUmVzdWx0cyIsInR4IiwiY2hhbm5lbCIsImNsYWltUmVjb3JkIiwidXBzZXJ0Q3JpdGVyaWEiLCJzZXRDbGFpbSIsInNldEZpbGUiLCJjbGFpbUFkZHJlc3NlcyIsInB1c2giLCJhdHRyaWJ1dGVzIiwib3IiLCJsYnJ5Q29uZmlnIiwidXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzIiwicmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwibmV3RXJyb3JPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwia2V5IiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbERhdGEiLCJjaGFubmVsRmluZFBhcmFtcyIsImdldCIsImlzTWF0Y2giLCJyZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIiwiTk9fRklMRSIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImxvbmdDbGFpbUlkIiwibG9uZ0NoYW5uZWxDbGFpbUlkIiwic2hvcnRDaGFubmVsQ2xhaW1JZCIsInBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSIsImdldExvY2FsRmlsZVJlY29yZCIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsIkxvZ2dlckNvbmZpZyIsImxvZ0xldmVsIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJsZXZlbCIsInRpbWVzdGFtcCIsImNvbG9yaXplIiwicHJldHR5UHJpbnQiLCJoYW5kbGVFeGNlcHRpb25zIiwiaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbiIsIndhcm4iLCJ2ZXJib3NlIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImlj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QUNBLFVBQUtDLGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDQTtBQUNBLFFBQUksTUFBS0YsWUFBVCxFQUF1QjtBQUNyQjtBQUNBLFVBQUksTUFBS0MsaUJBQVQsRUFBNEI7QUFDMUJILGdCQUFRSyxHQUFSLENBQVlQLG1CQUFaLEVBQWlDO0FBQy9COVMsZ0JBQVksd0JBRG1CO0FBRS9CcVMsaUJBQVksTUFGbUI7QUFHL0JpQixzQkFBWSxNQUFLSixZQUhjO0FBSS9CMUUsbUJBQVksTUFBSzJFLGlCQUpjO0FBSy9CNVgsb0JBQVksU0FMbUI7QUFNL0JnWSxxQkFBWTtBQU5tQixTQUFqQztBQVFEO0FBQ0QsVUFBSUgsZ0JBQUosRUFBc0I7QUFDcEJKLGdCQUFRSyxHQUFSLENBQVlQLG1CQUFaLEVBQWlDO0FBQy9COVMsZ0JBQVksc0JBRG1CO0FBRS9CcVMsaUJBQVksTUFGbUI7QUFHL0JpQixzQkFBWSxNQUFLSixZQUhjO0FBSS9CMUUsbUJBQVksTUFBSzRFLGdCQUpjO0FBSy9CN1gsb0JBQVksU0FMbUI7QUFNL0JnWSxxQkFBWTtBQU5tQixTQUFqQztBQVFEO0FBQ0Q7QUFDQVAsY0FBUXpXLEtBQVIsQ0FBYyxrQ0FBZDtBQUNBeVcsY0FBUTNYLElBQVIsQ0FBYSxpQ0FBYjtBQUNELEtBekJELE1BeUJPO0FBQ0wyWCxjQUFRTCxJQUFSLENBQWEsMkVBQWI7QUFDRDtBQUNGLEdBdENEO0FBdUNEOztBQUVEM1gsT0FBT0MsT0FBUCxHQUFpQixJQUFJZ1ksV0FBSixFQUFqQixDOzs7Ozs7QUNoREEsa0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTA2YjIwZjZmZmVhNmNhMzgyMTUiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3RvblwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIFNpdGVDb25maWcgKCkge1xuICB0aGlzLmFuYWx5dGljcyA9IHtcbiAgICBnb29nbGVJZDogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmFzc2V0RGVmYXVsdHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdBbiBhc3NldCBwdWJsaXNoZWQgb24gU3BlZS5jaCcsXG4gICAgdGh1bWJuYWlsICA6ICdodHRwczovL3NwZWUuY2gvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgfTtcbiAgdGhpcy5hdXRoID0ge1xuICAgIHNlc3Npb25LZXk6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5jdXN0b21Db21wb25lbnRzID0ge1xuICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIGNvbnRhaW5lcnM6IHt9LFxuICAgIHBhZ2VzICAgICA6IHt9LFxuICB9O1xuICB0aGlzLmRldGFpbHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPcGVuLXNvdXJjZSwgZGVjZW50cmFsaXplZCBpbWFnZSBhbmQgdmlkZW8gc2hhcmluZy4nLFxuICAgIGhvc3QgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgcG9ydCAgICAgICA6IDMwMDAsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgICB0d2l0dGVyICAgIDogJ0BzcGVlX2NoJyxcbiAgfTtcbiAgdGhpcy5wdWJsaXNoaW5nID0ge1xuICAgIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlczogW10sXG4gICAgZGlzYWJsZWQgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICBkaXNhYmxlZE1lc3NhZ2UgICAgICAgICA6ICdQbGVhc2UgY2hlY2sgYmFjayBzb29uLicsXG4gICAgcHJpbWFyeUNsYWltQWRkcmVzcyAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbCAgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbElkICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdXBsb2FkRGlyZWN0b3J5ICAgICAgICAgOiAnL2hvbWUvbGJyeS9VcGxvYWRzJyxcbiAgfTtcbiAgdGhpcy5jb25maWd1cmUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gc2l0ZSBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgYW5hbHl0aWNzLCBhc3NldERlZmF1bHRzLCBhdXRoLCBjdXN0b21Db21wb25lbnRzLCBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSBjb25maWc7XG4gICAgdGhpcy5hbmFseXRpY3MgPSBhbmFseXRpY3M7XG4gICAgdGhpcy5hc3NldERlZmF1bHRzID0gYXNzZXREZWZhdWx0cztcbiAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgdGhpcy5wdWJsaXNoaW5nID0gcHVibGlzaGluZztcbiAgICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSBjdXN0b21Db21wb25lbnRzO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2l0ZUNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NpdGVDb25maWcuanMiLCJjb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubG9nZ2VyLmluZm8oJ2V4cG9ydGluZyBzZXF1ZWxpemUgbW9kZWxzJyk7XG5jb25zdCB7IGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9teXNxbENvbmZpZycpO1xuXG5jb25zdCBkYiA9IHt9O1xuLy8gc2V0IHNlcXVlbGl6ZSBvcHRpb25zXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcbiAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0ICAgICAgIDogJ215c3FsJyxcbiAgZGlhbGVjdE9wdGlvbnM6IHtkZWNpbWFsTnVtYmVyczogdHJ1ZX0sIC8vIGZpeCB0byBlbnN1cmUgREVDSU1BTCB3aWxsIG5vdCBiZSBzdG9yZWQgYXMgYSBzdHJpbmdcbiAgbG9nZ2luZyAgICAgICA6IGZhbHNlLFxuICBwb29sICAgICAgICAgIDoge1xuICAgIG1heCAgICA6IDUsXG4gICAgbWluICAgIDogMCxcbiAgICBpZGxlICAgOiAxMDAwMCxcbiAgICBhY3F1aXJlOiAxMDAwMCxcbiAgfSxcbn0pO1xuXG4vLyBlc3RhYmxpc2ggbXlzcWwgY29ubmVjdGlvblxuc2VxdWVsaXplXG4gIC5hdXRoZW50aWNhdGUoKVxuICAudGhlbigoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ1NlcXVlbGl6ZSBoYXMgZXN0YWJsaXNoZWQgbXlzcWwgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkuJyk7XG4gIH0pXG4gIC5jYXRjaChlcnIgPT4ge1xuICAgIGxvZ2dlci5lcnJvcignU2VxdWVsaXplIHdhcyB1bmFibGUgdG8gY29ubmVjdCB0byB0aGUgZGF0YWJhc2U6JywgZXJyKTtcbiAgfSk7XG5cbi8vIG1hbnVhbGx5IGFkZCBlYWNoIG1vZGVsIHRvIHRoZSBkYiBvYmplY3RcbmNvbnN0IENlcnRpZmljYXRlID0gcmVxdWlyZSgnLi9jZXJ0aWZpY2F0ZS5qcycpO1xuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbC5qcycpO1xuY29uc3QgQ2xhaW0gPSByZXF1aXJlKCcuL2NsYWltLmpzJyk7XG5jb25zdCBGaWxlID0gcmVxdWlyZSgnLi9maWxlLmpzJyk7XG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0LmpzJyk7XG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi91c2VyLmpzJyk7XG5kYlsnQ2VydGlmaWNhdGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NlcnRpZmljYXRlJywgQ2VydGlmaWNhdGUpO1xuZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbmRiWydDbGFpbSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2xhaW0nLCBDbGFpbSk7XG5kYlsnRmlsZSddID0gc2VxdWVsaXplLmltcG9ydCgnRmlsZScsIEZpbGUpO1xuZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbmRiWydVc2VyJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdVc2VyJywgVXNlcik7XG5cbi8vIHJ1biBtb2RlbC5hc3NvY2lhdGlvbiBmb3IgZWFjaCBtb2RlbCBpbiB0aGUgZGIgb2JqZWN0IHRoYXQgaGFzIGFuIGFzc29jaWF0aW9uXG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChtb2RlbE5hbWUgPT4ge1xuICBpZiAoZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUpIHtcbiAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICBkYlttb2RlbE5hbWVdLmFzc29jaWF0ZShkYik7XG4gIH1cbn0pO1xuXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG5cbi8vIGFkZCBhbiAndXBzZXJ0JyBtZXRob2QgdG8gdGhlIGRiIG9iamVjdFxuZGIudXBzZXJ0ID0gKE1vZGVsLCB2YWx1ZXMsIGNvbmRpdGlvbiwgdGFibGVOYW1lKSA9PiB7XG4gIHJldHVybiBNb2RlbFxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiBjb25kaXRpb24sXG4gICAgfSlcbiAgICAudGhlbihvYmogPT4ge1xuICAgICAgaWYgKG9iaikgeyAgLy8gdXBkYXRlXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgdXBkYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gb2JqLnVwZGF0ZSh2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHsgIC8vIGluc2VydFxuICAgICAgICBsb2dnZXIuZGVidWcoYGNyZWF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIE1vZGVsLmNyZWF0ZSh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGAke3RhYmxlTmFtZX0udXBzZXJ0IGVycm9yYCwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlcXVlbGl6ZVwiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIG15c3FsICgpIHtcbiAgdGhpcy5kYXRhYmFzZSA9ICdkZWZhdWx0JztcbiAgdGhpcy51c2VybmFtZSA9ICdkZWZhdWx0JztcbiAgdGhpcy5wYXNzd29yZCA9ICdkZWZhdWx0JztcbiAgdGhpcy5jb25maWd1cmUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gTXlTUUwgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7ZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZH0gPSBjb25maWc7XG4gICAgdGhpcy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBteXNxbCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblNob3J0SWQ6IGZ1bmN0aW9uIChjbGFpbXNBcnJheSwgbG9uZ0lkKSB7XG4gICAgbGV0IGNsYWltSW5kZXg7XG4gICAgbGV0IHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIDEpOyAvLyBkZWZhdWx0IHNob3J0IGlkIGlzIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICBsZXQgc2hvcnRJZExlbmd0aCA9IDA7XG4gICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhpcyBjbGFpbSBpZFxuICAgIGNsYWltSW5kZXggPSBjbGFpbXNBcnJheS5maW5kSW5kZXgoZWxlbWVudCA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFpbUlkID09PSBsb25nSWQ7XG4gICAgfSk7XG4gICAgaWYgKGNsYWltSW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsYWltIGlkIG5vdCBmb3VuZCBpbiBjbGFpbXMgbGlzdCcpO1xuICAgIH1cbiAgICAvLyBnZXQgYW4gYXJyYXkgb2YgYWxsIGNsYWltcyB3aXRoIGxvd2VyIGhlaWdodFxuICAgIGxldCBwb3NzaWJsZU1hdGNoZXMgPSBjbGFpbXNBcnJheS5zbGljZSgwLCBjbGFpbUluZGV4KTtcbiAgICAvLyByZW1vdmUgY2VydGlmaWNhdGVzIHdpdGggdGhlIHNhbWUgcHJlZml4ZXMgdW50aWwgbm9uZSBhcmUgbGVmdC5cbiAgICB3aGlsZSAocG9zc2libGVNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNob3J0SWRMZW5ndGggKz0gMTtcbiAgICAgIHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpO1xuICAgICAgcG9zc2libGVNYXRjaGVzID0gcG9zc2libGVNYXRjaGVzLmZpbHRlcihlbGVtZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50LmNsYWltSWQgJiYgKGVsZW1lbnQuY2xhaW1JZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCkgPT09IHNob3J0SWQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hvcnRJZDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hhdHdnLWZldGNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2hhdHdnLWZldGNoXCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNvbnN0IFNlcnZlciA9IHJlcXVpcmUoJy4vc2VydmVyL3NlcnZlci5qcycpO1xuLy8gY29uc3QgQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY2xpZW50L2NvbXBvbmVudHMnKTtcbi8vIGNvbnN0IENvbnRhaW5lcnMgPSByZXF1aXJlKCcuL2NsaWVudC9jb250YWluZXJzJyk7XG4vLyBjb25zdCBQYWdlcyA9IHJlcXVpcmUoJy4vY2xpZW50L3BhZ2VzJyk7XG5jb25zdCBhcGlSb3V0ZXMgPSByZXF1aXJlKCcuL3NlcnZlci9yb3V0ZXMvYXBpUm91dGVzLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCcuL2NvbmZpZy9sb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsID0gcmVxdWlyZSgnLi9jb25maWcvbXlzcWxDb25maWcuanMnKTtcbmNvbnN0IHNsYWNrID0gcmVxdWlyZSgnLi9jb25maWcvc2xhY2tDb25maWcuanMnKTtcbmNvbnN0IGRhdGFiYXNlID0gcmVxdWlyZSgnLi9zZXJ2ZXIvbW9kZWxzJyk7XG5cbmNvbnN0IGV4cG9ydHMgPSB7XG4gIC8vIFNlcnZlcixcbiAgLy8gQ29tcG9uZW50cyxcbiAgLy8gQ29udGFpbmVycyxcbiAgLy8gUGFnZXMsXG4gIGFwaVJvdXRlcyxcbiAgY29uZmlnOiB7XG4gICAgbG9nZ2VyLFxuICAgIG15c3FsLFxuICAgIHNsYWNrLFxuICB9LFxuICBkYXRhYmFzZSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NwZWVjaC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuY29uc3QgeyBjbGFpbU5hbWVJc0F2YWlsYWJsZSwgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5LCBwdWJsaXNoIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBnZXRDbGFpbUxpc3QsIHJlc29sdmVVcmksIGdldENsYWltIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEsIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcywgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcywgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHksIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcywgY3JlYXRlRmlsZURhdGEgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IGVycm9ySGFuZGxlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGF1dGhlbnRpY2F0ZVVzZXIgfSA9IHJlcXVpcmUoJy4uL2F1dGgvYXV0aGVudGljYXRpb24uanMnKTtcbmNvbnN0IHsgZ2V0Q2hhbm5lbERhdGEsIGdldENoYW5uZWxDbGFpbXMsIGdldENsYWltSWQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG4gIGNoYW5uZWxBdmFpbGFiaWxpdHlSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGF2YWlsYWJsZU5hbWUpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBnZXQgYSBzaG9ydCBjaGFubmVsIGlkIGZyb20gbG9uZyBjaGFubmVsIElkXG4gIGNoYW5uZWxTaG9ydElkUm91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihzaG9ydElkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICBjaGFubmVsRGF0YVJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykge1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICAgIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICAgIGdldENoYW5uZWxEYXRhKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgMClcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIGNoYW5uZWxDbGFpbXNSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpIHtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgICBjb25zdCBwYWdlID0gcGFyYW1zLnBhZ2U7XG4gICAgZ2V0Q2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBydW4gYSBjbGFpbV9saXN0IHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBjbGFpbUxpc3RSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpIHtcbiAgICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihjbGFpbXNMaXN0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgLy8gcm91dGUgdG8gZ2V0IGFuIGFzc2V0XG4gIGNsYWltR2V0Um91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICAvLyByZXNvbHZlIHRoZSBjbGFpbVxuICAgIGRiLkNsYWltLnJlc29sdmVDbGFpbShuYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4ocmVzb2x2ZVJlc3VsdCA9PiB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBhIGNsYWltIGFjdHVhbGx5IGV4aXN0cyBhdCB0aGF0IHVyaVxuICAgICAgICBpZiAoIXJlc29sdmVSZXN1bHQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHVyaSBmb3VuZCBpbiBDbGFpbSB0YWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmaWxlRGF0YSA9IGNyZWF0ZUZpbGVEYXRhKHJlc29sdmVSZXN1bHQpO1xuICAgICAgICAvLyBnZXQgdGhlIGNsYWltXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZURhdGEsIGdldENsYWltKGAke25hbWV9IyR7Y2xhaW1JZH1gKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbIGZpbGVEYXRhLCBnZXRSZXN1bHQgXSkgPT4ge1xuICAgICAgICBmaWxlRGF0YSA9IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhKGZpbGVEYXRhLCBnZXRSZXN1bHQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlRGF0YSwge25hbWUsIGNsYWltSWR9LCAnRmlsZScpLCBnZXRSZXN1bHRdKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoWyBmaWxlUmVjb3JkLCB7bWVzc2FnZSwgY29tcGxldGVkfSBdKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZSwgY29tcGxldGVkIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgdGhpcyBzaXRlIHB1Ymxpc2hlZCB0byBhIGNsYWltXG4gIGNsYWltQXZhaWxhYmlsaXR5Um91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykge1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgLy8gcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgY2xhaW1SZXNvbHZlUm91dGUgKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgICAgLnRoZW4ocmVzb2x2ZWRVcmkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgLy8gcm91dGUgdG8gcnVuIGEgcHVibGlzaCByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgY2xhaW1QdWJsaXNoUm91dGUgKHsgYm9keSwgZmlsZXMsIGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgdXNlciB9LCByZXMpIHtcbiAgICAvLyBkZWZpbmUgdmFyaWFibGVzXG4gICAgbGV0ICBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIGRlc2NyaXB0aW9uLCBmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgbGljZW5zZSwgbmFtZSwgbnNmdywgdGh1bWJuYWlsLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlLCB0aXRsZTtcbiAgICAvLyByZWNvcmQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlcXVlc3RcbiAgICBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgLy8gdmFsaWRhdGUgdGhlIGJvZHkgYW5kIGZpbGVzIG9mIHRoZSByZXF1ZXN0XG4gICAgdHJ5IHtcbiAgICAgIC8vIHZhbGlkYXRlQXBpUHVibGlzaFJlcXVlc3QoYm9keSwgZmlsZXMpO1xuICAgICAgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keShib2R5KSk7XG4gICAgICAoe2ZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGV9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzKGZpbGVzKSk7XG4gICAgICAoe2NoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZH0gPSBib2R5KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICAvLyBjaGVjayBjaGFubmVsIGF1dGhvcml6YXRpb25cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBhdXRoZW50aWNhdGVVc2VyKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlciksXG4gICAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKSxcbiAgICAgIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyhmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpLFxuICAgICAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyh0aHVtYm5haWxGaWxlUGF0aCwgbmFtZSwgbGljZW5zZSwgbnNmdyksXG4gICAgXSlcbiAgICAgIC50aGVuKChbe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0sIHZhbGlkYXRlZENsYWltTmFtZSwgcHVibGlzaFBhcmFtcywgdGh1bWJuYWlsUHVibGlzaFBhcmFtc10pID0+IHtcbiAgICAgICAgLy8gYWRkIGNoYW5uZWwgZGV0YWlscyB0byB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9uYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX2lkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBwdWJsaXNoIHRoZSB0aHVtYm5haWxcbiAgICAgICAgaWYgKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMpIHtcbiAgICAgICAgICBwdWJsaXNoKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHVibGlzaCB0aGUgYXNzZXRcbiAgICAgICAgcmV0dXJuIHB1Ymxpc2gocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICBtZXNzYWdlOiAncHVibGlzaCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICBkYXRhICAgOiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDogcmVzdWx0LmNsYWltX2lkLFxuICAgICAgICAgICAgdXJsICAgIDogYCR7aG9zdH0vJHtyZXN1bHQuY2xhaW1faWR9LyR7bmFtZX1gLFxuICAgICAgICAgICAgbGJyeVR4IDogcmVzdWx0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAvLyByZWNvcmQgdGhlIHB1Ymxpc2ggZW5kIHRpbWUgYW5kIHNlbmQgdG8gZ29vZ2xlIGFuYWx5dGljc1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdwdWJsaXNoJywgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcbiAgY2xhaW1TaG9ydElkUm91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgY2xhaW1Mb25nSWRSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpIHtcbiAgICBsb2dnZXIuZGVidWcoJ2JvZHk6JywgYm9keSk7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICAgIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgICBjb25zdCBjbGFpbU5hbWUgPSBib2R5LmNsYWltTmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIGNsYWltRGF0YVJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykge1xuICAgIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gICAgbGV0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oY2xhaW1JbmZvID0+IHtcbiAgICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vIHJvdXRlIHRvIHNlZSBpZiBhc3NldCBpcyBhdmFpbGFibGUgbG9jYWxseVxuICBmaWxlQXZhaWxhYmlsaXR5Um91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7bmFtZSwgY2xhaW1JZH19KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBmYWxzZX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGlSb3V0ZXMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgQ2hhbm5lbCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NoYW5uZWwnLFxuICAgIHtcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2hhbm5lbC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2hhbm5lbC5iZWxvbmdzVG8oZGIuVXNlcik7XG4gICAgQ2hhbm5lbC5oYXNPbmUoZGIuQ2VydGlmaWNhdGUpO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVsO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGFzc2V0RGVmYXVsdHM6IHsgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsIH0sIGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIChjb250ZW50VHlwZSkge1xuICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIHJldHVybiAnanBlZyc7XG4gICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgIHJldHVybiAncG5nJztcbiAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgcmV0dXJuICdnaWYnO1xuICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICByZXR1cm4gJ21wNCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5kZWJ1Zygnc2V0dGluZyB1bmtub3duIGZpbGUgdHlwZSBhcyBmaWxlIGV4dGVuc2lvbiBqcGVnJyk7XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUaHVtYm5haWwgKHN0b3JlZFRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCkge1xuICBpZiAoc3RvcmVkVGh1bWJuYWlsID09PSAnJykge1xuICAgIHJldHVybiBkZWZhdWx0VGh1bWJuYWlsO1xuICB9XG4gIHJldHVybiBzdG9yZWRUaHVtYm5haWw7XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhaW1EYXRhIChjbGFpbSkge1xuICAvLyBsb2dnZXIuZGVidWcoJ3ByZXBhcmluZyBjbGFpbSBkYXRhIGJhc2VkIG9uIHJlc29sdmVkIGRhdGE6JywgY2xhaW0pO1xuICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICBjbGFpbVsnaG9zdCddID0gaG9zdDtcbiAgcmV0dXJuIGNsYWltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENsYWltID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2xhaW0nLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlVXJsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbWV0YWRhdGFWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjb250ZW50VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzdHJlYW1WZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENsYWltLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDbGFpbS5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCBmb3IgJHtjbGFpbU5hbWV9IyR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0ocykgZm91bmQgd2l0aCB0aGF0IGNsYWltIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGNsYWltSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyBmb3IgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgICByYXcgIDogdHJ1ZSwgIC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb25seSBkYXRhLCBub3QgYW4gYXJyYXkgb2YgaW5zdGFuY2VzXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWxDbGFpbXNBcnJheSA9PiB7XG4gICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdjaGFubmVsY2xhaW1zYXJyYXkgbGVuZ3RoOicsIGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGNoYW5uZWxDbGFpbXNBcnJheS5mb3JFYWNoKGNsYWltID0+IHtcbiAgICAgICAgICAgICAgICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoY2hhbm5lbENsYWltc0FycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBmaW5kaW5nIGNsYWltIGlkIGZvciBjbGFpbSAke2NsYWltTmFtZX0gZnJvbSBjaGFubmVsICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSwgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaWQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGAke3Jlc3VsdC5sZW5ndGh9IHJlY29yZHMgZm91bmQgZm9yIFwiJHtjbGFpbU5hbWV9XCIgaW4gY2hhbm5lbCBcIiR7Y2hhbm5lbENsYWltSWR9XCJgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgc2hvcnRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke3Nob3J0SWR9JWAsXG4gICAgICAgICAgICB9fSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sICAvLyBub3RlOiBtYXliZSBoZWlnaHQgYW5kIGVmZmVjdGl2ZSBhbW91bnQgbmVlZCB0byBzd2l0Y2g/XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdsZW5ndGggb2YgcmVzdWx0JywgcmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmRhdGFWYWx1ZXMuY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLnZhbGlkYXRlTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NsYWltSWQoJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIGlmIChjbGFpbUlkICYmIChjbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNsYWltSWQgJiYgY2xhaW1JZC5sZW5ndGggPCA0MCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7ICAvLyBpZiBhIHNob3J0IGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUoY2xhaW1OYW1lKTsgIC8vIGlmIG5vIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIENsYWltLnJlc29sdmVDbGFpbSA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5yZXNvbHZlQ2xhaW06ICR7bmFtZX0gJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsYWltQXJyYXkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY2xhaW1BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYG1vcmUgdGhhbiBvbmUgcmVjb3JkIG1hdGNoZXMgJHtuYW1lfSMke2NsYWltSWR9IGluIGRiLkNsYWltYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDbGFpbTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBURVhUIH0pID0+IHtcbiAgY29uc3QgUmVxdWVzdCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1JlcXVlc3QnLFxuICAgIHtcbiAgICAgIGFjdGlvbjoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB1cmw6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaXBBZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIHR5cGUgICAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFJlcXVlc3QuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFJlcXVlc3QuYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUmVxdWVzdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IFVzZXIgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdVc2VyJyxcbiAgICB7XG4gICAgICB1c2VyTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFVzZXIuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFVzZXIuaGFzT25lKGRiLkNoYW5uZWwpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNvbXBhcmVQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAobmV3UGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaChuZXdQYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBjdXJyZW50IHBhc3N3b3JkIHdpdGggdGhlIG5ldyBoYXNoXG4gICAgICAgICAgdGhpc1xuICAgICAgICAgICAgLnVwZGF0ZSh7cGFzc3dvcmQ6IGhhc2h9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIHByZS1zYXZlIGhvb2sgbWV0aG9kIHRvIGhhc2ggdGhlIHVzZXIncyBwYXNzd29yZCBiZWZvcmUgdGhlIHVzZXIncyBpbmZvIGlzIHNhdmVkIHRvIHRoZSBkYi5cbiAgVXNlci5ob29rKCdiZWZvcmVDcmVhdGUnLCAodXNlciwgb3B0aW9ucykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnVXNlci5iZWZvcmVDcmVhdGUgaG9vay4uLicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgcGFzc3dvcmQgc3RyaW5nIHdpdGggdGhlIGhhc2ggcGFzc3dvcmQgdmFsdWVcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaDtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBVc2VyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe3doZXJlOiB7Y2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhbmRsZUVycm9yUmVzcG9uc2U6IGZ1bmN0aW9uIChvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpIHtcbiAgICBsb2dnZXIuZXJyb3IoYEVycm9yIG9uICR7b3JpZ2luYWxVcmx9YCwgbW9kdWxlLmV4cG9ydHMudXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzKGVycm9yKSk7XG4gICAgY29uc3QgW3N0YXR1cywgbWVzc2FnZV0gPSBtb2R1bGUuZXhwb3J0cy5yZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMoZXJyb3IpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyhzdGF0dXMpXG4gICAgICAuanNvbihtb2R1bGUuZXhwb3J0cy5jcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZChzdGF0dXMsIG1lc3NhZ2UpKTtcbiAgfSxcbiAgcmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBsZXQgc3RhdHVzLCBtZXNzYWdlO1xuICAgIC8vIGNoZWNrIGZvciBkYWVtb24gYmVpbmcgdHVybmVkIG9mZlxuICAgIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJykge1xuICAgICAgc3RhdHVzID0gNTAzO1xuICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHJlZnVzZWQuICBUaGUgZGFlbW9uIG1heSBub3QgYmUgcnVubmluZy4nO1xuICAgICAgLy8gZmFsbGJhY2sgZm9yIGV2ZXJ5dGhpbmcgZWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXMgPSA0MDA7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gW3N0YXR1cywgbWVzc2FnZV07XG4gIH0sXG4gIHVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5czogZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGV0IG5ld0Vycm9yT2JqZWN0ID0ge307XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBuZXdFcnJvck9iamVjdFtrZXldID0gZXJyW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdFcnJvck9iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfSxcbiAgY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQgKHN0YXR1cywgbWVzc2FnZSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhlbnRpY2F0ZVVzZXIgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlcikge1xuICAgIC8vIGNhc2U6IG5vIGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIChhbm9ueW1vdXMpLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXNlciB0b2tlbiBpcyBwcm92aWRlZFxuICAgIGlmICghY2hhbm5lbE5hbWUgJiYgIWNoYW5uZWxJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IG51bGwsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCB1c2VyIHRva2VuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsTmFtZSAhPT0gdXNlci5jaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIG5hbWUgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWxJZCAmJiBjaGFubmVsSWQgIT09IHVzZXIuY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBpZCBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogdXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHBhc3N3b3JkIGluc3RlYWQgb2YgdXNlciB0b2tlblxuICAgIGlmICghY2hhbm5lbFBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ25vIGNoYW5uZWwgcGFzc3dvcmQgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCk7XG4gIH0sXG4gIGF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgdXNlclBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGhvaXN0ZWQgdmFyaWFibGVzXG4gICAgICBsZXQgY2hhbm5lbERhdGE7XG4gICAgICAvLyBidWlsZCB0aGUgcGFyYW1zIGZvciBmaW5kaW5nIHRoZSBjaGFubmVsXG4gICAgICBsZXQgY2hhbm5lbEZpbmRQYXJhbXMgPSB7fTtcbiAgICAgIGlmIChjaGFubmVsTmFtZSkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgIGlmIChjaGFubmVsSWQpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbElkO1xuICAgICAgLy8gZmluZCB0aGUgY2hhbm5lbFxuICAgICAgZGIuQ2hhbm5lbFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IGNoYW5uZWxGaW5kUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gY2hhbm5lbCBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5uZWxEYXRhID0gY2hhbm5lbC5nZXQoKTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgZGF0YTonLCBjaGFubmVsRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRiLlVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyB1c2VyTmFtZTogY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDEpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHVzZXJQYXNzd29yZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoJy4uLnBhc3N3b3JkIHdhcyBhIG1hdGNoLi4uJyk7XG4gICAgICAgICAgcmVzb2x2ZShjaGFubmVsRGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJjb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lLCBjbGFpbUlkKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2hhbm5lbChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2xhaW0obmFtZSwgY2xhaW1JZCk7XG4gICAgfVxuICB9LFxuICBnZXRDbGFpbUlkQnlDbGFpbSAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDbGFpbSgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNsYWltLmdldExvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNoYW5uZWwoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9LCAke2NsYWltTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBpZFxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbElkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxJZCwgZGIuQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbElkLCBjbGFpbU5hbWUpXSk7ICAvLyAyLiBnZXQgdGhlIGxvbmcgY2xhaW0gaWRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbElkLCBsb25nQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsRGF0YSAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIHNob3J0Q2hhbm5lbENsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICAgIHNob3J0Q2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zKGxvbmdDaGFubmVsQ2xhaW1JZCldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheV0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIGZvcm1hdCB0aGUgZGF0YSBmb3IgdGhlIHZpZXcsIGluY2x1ZGluZyBwYWdpbmF0aW9uXG4gICAgICAgICAgbGV0IHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSA9IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5LCBwYWdlKTtcbiAgICAgICAgICAvLyA0LiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uIGFuZCBjb250ZW50c1xuICAgICAgICAgIHJlc29sdmUocGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0TG9jYWxGaWxlUmVjb3JkIChjbGFpbUlkLCBuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkZpbGUuZmluZE9uZSh7d2hlcmU6IHtjbGFpbUlkLCBuYW1lfX0pXG4gICAgICAudGhlbihmaWxlID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIE5PX0ZJTEU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGUuZGF0YVZhbHVlcztcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJjb25zdCBDTEFJTVNfUEVSX1BBR0UgPSAxMjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNsYWltcywgcGFnZSkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbFBhZ2VzKGNsYWltcyk7XG4gICAgY29uc3QgcGFnaW5hdGlvblBhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRQYWdlRnJvbVF1ZXJ5KHBhZ2UpO1xuICAgIGNvbnN0IHZpZXdEYXRhID0ge1xuICAgICAgY2hhbm5lbE5hbWUgICAgICAgOiBjaGFubmVsTmFtZSxcbiAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1zICAgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5leHRyYWN0UGFnZUZyb21DbGFpbXMoY2xhaW1zLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICBwcmV2aW91c1BhZ2UgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVByZXZpb3VzUGFnZShwYWdpbmF0aW9uUGFnZSksXG4gICAgICBjdXJyZW50UGFnZSAgICAgICA6IHBhZ2luYXRpb25QYWdlLFxuICAgICAgbmV4dFBhZ2UgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVOZXh0UGFnZSh0b3RhbFBhZ2VzLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICB0b3RhbFBhZ2VzICAgICAgICA6IHRvdGFsUGFnZXMsXG4gICAgICB0b3RhbFJlc3VsdHMgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsQ2xhaW1zKGNsYWltcyksXG4gICAgfTtcbiAgICByZXR1cm4gdmlld0RhdGE7XG4gIH0sXG4gIGdldFBhZ2VGcm9tUXVlcnkgKHBhZ2UpIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIChjbGFpbXMsIHBhZ2VOdW1iZXIpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIFtdOyAgLy8gaWYgbm8gY2xhaW1zLCByZXR1cm4gdGhpcyBkZWZhdWx0XG4gICAgfVxuICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2xhaW1zIGlzIGFycmF5PycsIEFycmF5LmlzQXJyYXkoY2xhaW1zKSk7XG4gICAgLy8gbG9nZ2VyLmRlYnVnKGBwYWdlTnVtYmVyICR7cGFnZU51bWJlcn0gaXMgbnVtYmVyP2AsIE51bWJlci5pc0ludGVnZXIocGFnZU51bWJlcikpO1xuICAgIGNvbnN0IGNsYWltU3RhcnRJbmRleCA9IChwYWdlTnVtYmVyIC0gMSkgKiBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgY2xhaW1FbmRJbmRleCA9IGNsYWltU3RhcnRJbmRleCArIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBwYWdlT2ZDbGFpbXMgPSBjbGFpbXMuc2xpY2UoY2xhaW1TdGFydEluZGV4LCBjbGFpbUVuZEluZGV4KTtcbiAgICByZXR1cm4gcGFnZU9mQ2xhaW1zO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbFBhZ2VzIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvdGFsQ2xhaW1zID0gY2xhaW1zLmxlbmd0aDtcbiAgICAgIGlmICh0b3RhbENsYWltcyA8IENMQUlNU19QRVJfUEFHRSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZ1bGxQYWdlcyA9IE1hdGguZmxvb3IodG90YWxDbGFpbXMgLyBDTEFJTVNfUEVSX1BBR0UpO1xuICAgICAgY29uc3QgcmVtYWluZGVyID0gdG90YWxDbGFpbXMgJSBDTEFJTVNfUEVSX1BBR0U7XG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmdWxsUGFnZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVsbFBhZ2VzICsgMTtcbiAgICB9XG4gIH0sXG4gIGRldGVybWluZVByZXZpb3VzUGFnZSAoY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgLSAxO1xuICB9LFxuICBkZXRlcm1pbmVOZXh0UGFnZSAodG90YWxQYWdlcywgY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgKyAxO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbENsYWltcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY2xhaW1zLmxlbmd0aDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmZ1bmN0aW9uIExvZ2dlckNvbmZpZyAoKSB7XG4gIHRoaXMubG9nTGV2ZWwgPSAnZGVidWcnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBsb2dnZXIgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgdmFsdWVzIHdpdGggbG9jYWwgY29uZmlnIHBhcmFtc1xuICAgIGNvbnN0IHtsb2dMZXZlbH0gPSBjb25maWc7XG4gICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xuICAgIC8vIGNvbmZpZ3VyZSB0aGUgd2luc3RvbiBsb2dnZXJcbiAgICBsb2dnZXIuY29uZmlndXJlKHtcbiAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IChsb2dnZXIudHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgICAgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5sb2dMZXZlbCxcbiAgICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICBjb2xvcml6ZSAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIHByZXR0eVByaW50ICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgLy8gdGVzdCBhbGwgdGhlIGxvZyBsZXZlbHNcbiAgICBsb2dnZXIuZXJyb3IoJ0xldmVsIDAnKTtcbiAgICBsb2dnZXIud2FybignTGV2ZWwgMScpO1xuICAgIGxvZ2dlci5pbmZvKCdMZXZlbCAyJyk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoJ0xldmVsIDMnKTtcbiAgICBsb2dnZXIuZGVidWcoJ0xldmVsIDQnKTtcbiAgICBsb2dnZXIuc2lsbHkoJ0xldmVsIDUnKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IExvZ2dlckNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCB3aW5zdG9uID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNsYWNrIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlc1xuICAgIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLnNsYWNrV2ViSG9vayA9IHNsYWNrV2ViSG9vaztcbiAgICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gc2xhY2tFcnJvckNoYW5uZWw7XG4gICAgdGhpcy5zbGFja0luZm9DaGFubmVsID0gc2xhY2tJbmZvQ2hhbm5lbDtcbiAgICAvLyB1cGRhdGUgc2xhY2sgd2ViaG9vayBzZXR0aW5nc1xuICAgIGlmICh0aGlzLnNsYWNrV2ViSG9vaykge1xuICAgICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICAgIGlmICh0aGlzLnNsYWNrRXJyb3JDaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2stZXJyb3JzLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ3dhcm4nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6ZmFjZV93aXRoX2hlYWRfYmFuZGFnZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBpZiAoc2xhY2tJbmZvQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWluZm8tdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnaW5mbycsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0luZm9DaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOm5lcmRfZmFjZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICAvLyBzZW5kIHRlc3QgbWVzc2FnZXNcbiAgICAgIHdpbnN0b24uZXJyb3IoJ1NsYWNrIFwiZXJyb3JcIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbnN0b24ud2FybignU2xhY2sgbG9nZ2luZyBpcyBub3QgZW5hYmxlZCBiZWNhdXNlIG5vIHNsYWNrV2ViSG9vayBjb25maWcgdmFyIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNsYWNrQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==