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


var Sequelize = __webpack_require__(4);
var logger = __webpack_require__(0);

function mysql() {
  var _this = this;

  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.db = {};
  this.configure = function (config) {
    if (!config) {
      return console.log('No MySQL config received.');
    }
    // configure credentials
    console.log('configuring mysql credentials...');
    var database = config.database,
        username = config.username,
        password = config.password;

    _this.database = database;
    _this.username = username;
    _this.password = password;
    // configure db
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
      logger.debug('mysqlconfig', { database: database, username: username, password: password });
      logger.error('Sequelize was unable to connect to the database:', err);
    });

    // manually add each model to the db object (note: make this dynamic)
    var db = {};
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
    _this.db = db;
  };
};

module.exports = new mysql();

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


var axios = __webpack_require__(22);
var logger = __webpack_require__(0);

var _require = __webpack_require__(23),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(6),
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


var logger = __webpack_require__(0);
var ua = __webpack_require__(24);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(0);
var fs = __webpack_require__(25);

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
/* 8 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

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


// const Components = require('./client/components');
// const Containers = require('./client/containers');
// const Pages = require('./client/pages');
var apiRoutes = __webpack_require__(13);
var logger = __webpack_require__(30);
var mysql = __webpack_require__(1);
var site = __webpack_require__(2);
var slack = __webpack_require__(31);
var passport = __webpack_require__(35);

var _exports = {
  // Components,
  // Containers,
  // Pages,
  apiRoutes: apiRoutes,
  logger: logger,
  mysql: mysql,
  site: site,
  slack: slack,
  passport: passport
};

module.exports = _exports;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(0);

var _require = __webpack_require__(2),
    host = _require.details.host;

var _require2 = __webpack_require__(1),
    db = _require2.db;

var _require3 = __webpack_require__(21),
    claimNameIsAvailable = _require3.claimNameIsAvailable,
    checkChannelAvailability = _require3.checkChannelAvailability,
    publish = _require3.publish;

var _require4 = __webpack_require__(3),
    getClaimList = _require4.getClaimList,
    resolveUri = _require4.resolveUri,
    getClaim = _require4.getClaim;

var _require5 = __webpack_require__(7),
    addGetResultsToFileData = _require5.addGetResultsToFileData,
    createBasicPublishParams = _require5.createBasicPublishParams,
    createThumbnailPublishParams = _require5.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require5.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require5.parsePublishApiRequestFiles,
    createFileData = _require5.createFileData;

var errorHandlers = __webpack_require__(26);

var _require6 = __webpack_require__(6),
    sendGATimingEvent = _require6.sendGATimingEvent;

var _require7 = __webpack_require__(27),
    authenticateUser = _require7.authenticateUser;

var _require8 = __webpack_require__(28),
    getChannelData = _require8.getChannelData,
    getChannelClaims = _require8.getChannelClaims,
    getClaimId = _require8.getClaimId;

var NO_CHANNEL = 'NO_CHANNEL';
var NO_CLAIM = 'NO_CLAIM';

var apiRoutes = {
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

    console.log('hello');
    logger.debug('host:', host);
    logger.debug('db:', db);
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

module.exports = apiRoutes;

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

var _require = __webpack_require__(1),
    db = _require.db;

var lbryApi = __webpack_require__(3);
var publishHelpers = __webpack_require__(7);

var _require2 = __webpack_require__(2),
    _require2$publishing = _require2.publishing,
    primaryClaimAddress = _require2$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require2$publishing.additionalClaimAddresses;

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


var _require = __webpack_require__(1),
    db = _require.db;

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

var _require = __webpack_require__(1),
    db = _require.db;

var logger = __webpack_require__(0);

var _require2 = __webpack_require__(29),
    returnPaginatedChannelClaims = _require2.returnPaginatedChannelClaims;

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
/* 32 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(8).Strategy;
var logger = __webpack_require__(0);

var _require = __webpack_require__(1),
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(8).Strategy;
var lbryApi = __webpack_require__(3);
var logger = __webpack_require__(0);

var _require = __webpack_require__(1),
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(36);
var localLoginStrategy = __webpack_require__(33);
var localSignupStrategy = __webpack_require__(34);

var _require = __webpack_require__(37),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

passport.deserializeUser(deserializeSpeechUser);
passport.serializeUser(serializeSpeechUser);
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

module.exports = passport;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 37 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmQ0YjhkZGY3YWU4ODRmZTM3MGYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3RvblwiIiwid2VicGFjazovLy8uL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIiIsIndlYnBhY2s6Ly8vLi9zcGVlY2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGlSb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3Bhc3Nwb3J0L2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMiXSwibmFtZXMiOlsiU2VxdWVsaXplIiwicmVxdWlyZSIsImxvZ2dlciIsIm15c3FsIiwiZGF0YWJhc2UiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZGIiLCJjb25maWd1cmUiLCJjb25maWciLCJjb25zb2xlIiwibG9nIiwic2VxdWVsaXplIiwiaG9zdCIsImRpYWxlY3QiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwibG9nZ2luZyIsInBvb2wiLCJtYXgiLCJtaW4iLCJpZGxlIiwiYWNxdWlyZSIsImF1dGhlbnRpY2F0ZSIsInRoZW4iLCJpbmZvIiwiY2F0Y2giLCJkZWJ1ZyIsImVycm9yIiwiZXJyIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJpbXBvcnQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwidXBkYXRlIiwiY3JlYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsIlNpdGVDb25maWciLCJhbmFseXRpY3MiLCJnb29nbGVJZCIsImFzc2V0RGVmYXVsdHMiLCJkZXNjcmlwdGlvbiIsInRodW1ibmFpbCIsInRpdGxlIiwiYXV0aCIsInNlc3Npb25LZXkiLCJjdXN0b21Db21wb25lbnRzIiwiY29tcG9uZW50cyIsImNvbnRhaW5lcnMiLCJwYWdlcyIsImRldGFpbHMiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwiYXhpb3MiLCJhcGkiLCJhcGlIb3N0IiwiYXBpUG9ydCIsImxicnlBcGlVcmkiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJzZW5kR0FUaW1pbmdFdmVudCIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJkYXRhIiwicmVzdWx0IiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwicHVibGlzaENsYWltIiwicHVibGlzaFBhcmFtcyIsIm5hbWUiLCJnYVN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJQcm9taXNlIiwicG9zdCIsIm1ldGhvZCIsInBhcmFtcyIsInJlc3BvbnNlIiwiZ2V0Q2xhaW0iLCJ1cmkiLCJ0aW1lb3V0IiwiZ2V0Q2xhaW1MaXN0IiwiY2xhaW1OYW1lIiwicmVzb2x2ZVVyaSIsImdldERvd25sb2FkRGlyZWN0b3J5IiwiZG93bmxvYWRfZGlyZWN0b3J5IiwiY3JlYXRlQ2hhbm5lbCIsImNoYW5uZWxfbmFtZSIsImFtb3VudCIsInJldHVyblNob3J0SWQiLCJjbGFpbXNBcnJheSIsImxvbmdJZCIsImNsYWltSW5kZXgiLCJzaG9ydElkIiwic3Vic3RyaW5nIiwic2hvcnRJZExlbmd0aCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJjbGFpbUlkIiwicG9zc2libGVNYXRjaGVzIiwic2xpY2UiLCJsZW5ndGgiLCJmaWx0ZXIiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiaXAiLCJvcmlnaW5hbFVybCIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsImNoYW5uZWxOYW1lIiwiY2hhbm5lbElkIiwiY2hhbm5lbF9pZCIsImZzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkiLCJuc2Z3IiwibGljZW5zZSIsImludmFsaWROYW1lQ2hhcmFjdGVycyIsImV4ZWMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMiLCJmaWxlIiwicGF0aCIsInR5cGUiLCJzaXplIiwidGVzdCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwiZmlsZU5hbWUiLCJmaWxlUGF0aCIsImZpbGVUeXBlIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImZpbGVfcGF0aCIsImJpZCIsIm1ldGFkYXRhIiwiYXV0aG9yIiwibGFuZ3VhZ2UiLCJjbGFpbV9hZGRyZXNzIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImRlbGV0ZVRlbXBvcmFyeUZpbGUiLCJ1bmxpbmsiLCJhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSIsImZpbGVJbmZvIiwiZ2V0UmVzdWx0IiwiZmlsZV9uYW1lIiwiZG93bmxvYWRfcGF0aCIsImNyZWF0ZUZpbGVEYXRhIiwib3V0cG9pbnQiLCJoZWlnaHQiLCJhZGRyZXNzIiwiY29udGVudFR5cGUiLCJhcGlSb3V0ZXMiLCJzaXRlIiwic2xhY2siLCJwYXNzcG9ydCIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IiwicHVibGlzaCIsImVycm9ySGFuZGxlcnMiLCJhdXRoZW50aWNhdGVVc2VyIiwiZ2V0Q2hhbm5lbERhdGEiLCJnZXRDaGFubmVsQ2xhaW1zIiwiZ2V0Q2xhaW1JZCIsIk5PX0NIQU5ORUwiLCJOT19DTEFJTSIsImNoYW5uZWxBdmFpbGFiaWxpdHlSb3V0ZSIsInJlcyIsInN0YXR1cyIsImpzb24iLCJhdmFpbGFibGVOYW1lIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsImNoYW5uZWxTaG9ydElkUm91dGUiLCJnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkIiwiY2hhbm5lbERhdGFSb3V0ZSIsImJvZHkiLCJjaGFubmVsQ2xhaW1JZCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiY2hhbm5lbENsYWltc1JvdXRlIiwicGFnZSIsImNsYWltTGlzdFJvdXRlIiwiY2xhaW1zTGlzdCIsImNsYWltR2V0Um91dGUiLCJyZXNvbHZlQ2xhaW0iLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJhbGwiLCJmaWxlUmVjb3JkIiwiY29tcGxldGVkIiwiY2xhaW1BdmFpbGFiaWxpdHlSb3V0ZSIsImNsYWltUmVzb2x2ZVJvdXRlIiwicmVzb2x2ZWRVcmkiLCJjbGFpbVB1Ymxpc2hSb3V0ZSIsImZpbGVzIiwidXNlciIsImNoYW5uZWxQYXNzd29yZCIsInZhbGlkYXRlZENsYWltTmFtZSIsInRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJjbGFpbV9pZCIsInVybCIsImxicnlUeCIsImNsYWltU2hvcnRJZFJvdXRlIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwiY2xhaW1Mb25nSWRSb3V0ZSIsImNsYWltRGF0YVJvdXRlIiwiY2xhaW1JbmZvIiwiZmlsZUF2YWlsYWJpbGl0eVJvdXRlIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImRlZmF1bHQiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJub3V0IiwidHhpZCIsInZhbGlkQXRIZWlnaHQiLCJ2YWx1ZVZlcnNpb24iLCJjbGFpbVR5cGUiLCJjZXJ0aWZpY2F0ZVZlcnNpb24iLCJrZXlUeXBlIiwicHVibGljS2V5IiwiZnJlZXplVGFibGVOYW1lIiwiYmVsb25nc1RvIiwiZm9yZWlnbktleSIsImFsbG93TnVsbCIsImxvbmdDaGFubmVsSWQiLCJmaW5kQWxsIiwib3JkZXIiLCJnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkIiwiJGxpa2UiLCJnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lIiwidmFsaWRhdGVMb25nQ2hhbm5lbElkIiwiZ2V0TG9uZ0NoYW5uZWxJZCIsImhhc09uZSIsImRlZmF1bHRUaHVtYm5haWwiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImNsYWltIiwiY2VydGlmaWNhdGVJZCIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0QWxsQ2hhbm5lbENsYWltcyIsInJhdyIsImNoYW5uZWxDbGFpbXNBcnJheSIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwiZGF0YVZhbHVlcyIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJnZXRMb25nQ2xhaW1JZCIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiYWN0aW9uIiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwidXNlck5hbWUiLCJwcm90b3R5cGUiLCJjb21wYXJlUGFzc3dvcmQiLCJjb21wYXJlIiwiY2hhbmdlUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImdlblNhbHQiLCJzYWx0RXJyb3IiLCJzYWx0IiwiaGFzaCIsImhhc2hFcnJvciIsImhvb2siLCJvcHRpb25zIiwibGJyeUFwaSIsInB1Ymxpc2hIZWxwZXJzIiwiT3AiLCJwdWJsaXNoUmVzdWx0cyIsInR4IiwiY2hhbm5lbCIsImNsYWltUmVjb3JkIiwidXBzZXJ0Q3JpdGVyaWEiLCJzZXRDbGFpbSIsInNldEZpbGUiLCJjbGFpbUFkZHJlc3NlcyIsInB1c2giLCJhdHRyaWJ1dGVzIiwib3IiLCJsYnJ5Q29uZmlnIiwidXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzIiwicmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwibmV3RXJyb3JPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwia2V5IiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbERhdGEiLCJjaGFubmVsRmluZFBhcmFtcyIsImdldCIsImlzTWF0Y2giLCJyZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIiwiTk9fRklMRSIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImxvbmdDbGFpbUlkIiwibG9uZ0NoYW5uZWxDbGFpbUlkIiwic2hvcnRDaGFubmVsQ2xhaW1JZCIsInBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSIsImdldExvY2FsRmlsZVJlY29yZCIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsIkxvZ2dlckNvbmZpZyIsImxvZ0xldmVsIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJsZXZlbCIsInRpbWVzdGFtcCIsImNvbG9yaXplIiwicHJldHR5UHJpbnQiLCJoYW5kbGVFeGNlcHRpb25zIiwiaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbiIsIndhcm4iLCJ2ZXJib3NlIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwidXNlckluZm8iLCJpZCIsImdldENoYW5uZWwiLCJzaG9ydENoYW5uZWxJZCIsInVzZXJuYW1lRmllbGQiLCJwYXNzd29yZEZpZWxkIiwiZG9uZSIsInVzZXJEYXRhIiwiY2VydGlmaWNhdGVEYXRhIiwibmV3VXNlciIsIm5ld0NoYW5uZWwiLCJuZXdDZXJ0aWZpY2F0ZSIsInNldENoYW5uZWwiLCJzZXRVc2VyIiwibG9jYWxMb2dpblN0cmF0ZWd5IiwibG9jYWxTaWdudXBTdHJhdGVneSIsInNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJkZXNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJkZXNlcmlhbGl6ZVVzZXIiLCJzZXJpYWxpemVVc2VyIiwidXNlIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtB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O0FBRTdCOU8sU0FBUytPLGVBQVQsQ0FBeUJELHFCQUF6QjtBQUNBOU8sU0FBU2dQLGFBQVQsQ0FBdUJILG1CQUF2QjtBQUNBN08sU0FBU2lQLEdBQVQsQ0FBYSxhQUFiLEVBQTRCTixrQkFBNUI7QUFDQTNPLFNBQVNpUCxHQUFULENBQWEsY0FBYixFQUE2QkwsbUJBQTdCOztBQUVBdFksT0FBT0MsT0FBUCxHQUFpQnlKLFFBQWpCLEM7Ozs7OztBQ1ZBLHFDOzs7Ozs7Ozs7QUNBQTFKLE9BQU9DLE9BQVAsR0FBaUI7QUFDZnNZLHFCQURlLCtCQUNNck0sSUFETixFQUNZMkwsSUFEWixFQUNrQjtBQUFHO0FBQ2xDdmEsWUFBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0FzYSxTQUFLLElBQUwsRUFBVzNMLElBQVg7QUFDRCxHQUpjO0FBS2ZzTSx1QkFMZSxpQ0FLUXRNLElBTFIsRUFLYzJMLElBTGQsRUFLb0I7QUFBRztBQUNwQ3ZhLFlBQVFDLEdBQVIsQ0FBWSxvQkFBWjtBQUNBc2EsU0FBSyxJQUFMLEVBQVczTCxJQUFYO0FBQ0Q7QUFSYyxDQUFqQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZkNGI4ZGRmN2FlODg0ZmUzNzBmIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gbXlzcWwgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLmRiID0ge307XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIE15U1FMIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgLy8gY29uZmlndXJlIGNyZWRlbnRpYWxzXG4gICAgY29uc29sZS5sb2coJ2NvbmZpZ3VyaW5nIG15c3FsIGNyZWRlbnRpYWxzLi4uJyk7XG4gICAgY29uc3Qge2RhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmR9ID0gY29uZmlnO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgIC8vIGNvbmZpZ3VyZSBkYlxuICAgIC8vIHNldCBzZXF1ZWxpemUgb3B0aW9uc1xuICAgIGNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICAgICAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICAgICAgZGlhbGVjdCAgICAgICA6ICdteXNxbCcsXG4gICAgICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSxcbiAgICAgIGxvZ2dpbmcgICAgICAgOiBmYWxzZSxcbiAgICAgIHBvb2wgICAgICAgICAgOiB7XG4gICAgICAgIG1heCAgICA6IDUsXG4gICAgICAgIG1pbiAgICA6IDAsXG4gICAgICAgIGlkbGUgICA6IDEwMDAwLFxuICAgICAgICBhY3F1aXJlOiAxMDAwMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBlc3RhYmxpc2ggbXlzcWwgY29ubmVjdGlvblxuICAgIHNlcXVlbGl6ZVxuICAgICAgLmF1dGhlbnRpY2F0ZSgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci5pbmZvKCdTZXF1ZWxpemUgaGFzIGVzdGFibGlzaGVkIG15c3FsIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBsb2dnZXIuZGVidWcoJ215c3FsY29uZmlnJywgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0pO1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ1NlcXVlbGl6ZSB3YXMgdW5hYmxlIHRvIGNvbm5lY3QgdG8gdGhlIGRhdGFiYXNlOicsIGVycik7XG4gICAgICB9KTtcblxuICAgIC8vIG1hbnVhbGx5IGFkZCBlYWNoIG1vZGVsIHRvIHRoZSBkYiBvYmplY3QgKG5vdGU6IG1ha2UgdGhpcyBkeW5hbWljKVxuICAgIGNvbnN0IGRiID0ge307XG4gICAgY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCdtb2RlbHMvY2VydGlmaWNhdGUuanMnKTtcbiAgICBjb25zdCBDaGFubmVsID0gcmVxdWlyZSgnbW9kZWxzL2NoYW5uZWwuanMnKTtcbiAgICBjb25zdCBDbGFpbSA9IHJlcXVpcmUoJ21vZGVscy9jbGFpbS5qcycpO1xuICAgIGNvbnN0IEZpbGUgPSByZXF1aXJlKCdtb2RlbHMvZmlsZS5qcycpO1xuICAgIGNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCdtb2RlbHMvcmVxdWVzdC5qcycpO1xuICAgIGNvbnN0IFVzZXIgPSByZXF1aXJlKCdtb2RlbHMvdXNlci5qcycpO1xuICAgIGRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG4gICAgZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbiAgICBkYlsnQ2xhaW0nXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NsYWltJywgQ2xhaW0pO1xuICAgIGRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG4gICAgZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbiAgICBkYlsnVXNlciddID0gc2VxdWVsaXplLmltcG9ydCgnVXNlcicsIFVzZXIpO1xuXG4gICAgLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbiAgICBsb2dnZXIuaW5mbygnYXNzb2NpYXRpbmcgZGIgbW9kZWxzLi4uJyk7XG4gICAgT2JqZWN0LmtleXMoZGIpLmZvckVhY2gobW9kZWxOYW1lID0+IHtcbiAgICAgIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgICAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICAgICAgZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUoZGIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYWRkIHNlcXVlbGl6ZS9TZXF1ZWxpemUgdG8gZGJcbiAgICBkYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG4gICAgZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuICAgIC8vIGFkZCBhbiAndXBzZXJ0JyBtZXRob2QgdG8gdGhlIGRiIG9iamVjdFxuICAgIGRiLnVwc2VydCA9IChNb2RlbCwgdmFsdWVzLCBjb25kaXRpb24sIHRhYmxlTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIE1vZGVsXG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogY29uZGl0aW9uLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihvYmogPT4ge1xuICAgICAgICAgIGlmIChvYmopIHsgIC8vIHVwZGF0ZVxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gb2JqLnVwZGF0ZSh2YWx1ZXMpO1xuICAgICAgICAgIH0gZWxzZSB7ICAvLyBpbnNlcnRcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIE1vZGVsLmNyZWF0ZSh2YWx1ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHt0YWJsZU5hbWV9LnVwc2VydCBlcnJvcmAsIGVycm9yKTtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLmRiID0gZGI7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBteXNxbCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwiZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7XG4gICAgY29tcG9uZW50czoge30sXG4gICAgY29udGFpbmVyczoge30sXG4gICAgcGFnZXMgICAgIDoge30sXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGN1c3RvbUNvbXBvbmVudHMsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgYXBpOiB7IGFwaUhvc3QsIGFwaVBvcnQgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL2xicnlDb25maWcuanMnKTtcbmNvbnN0IGxicnlBcGlVcmkgPSAnaHR0cDovLycgKyBhcGlIb3N0ICsgJzonICsgYXBpUG9ydDtcbmNvbnN0IHsgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsLCBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi9nb29nbGVBbmFseXRpY3MuanMnKTtcblxuY29uc3QgaGFuZGxlTGJyeW5ldFJlc3BvbnNlID0gKHsgZGF0YSB9LCByZXNvbHZlLCByZWplY3QpID0+IHtcbiAgbG9nZ2VyLmRlYnVnKCdsYnJ5IGFwaSBkYXRhOicsIGRhdGEpO1xuICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAvLyBjaGVjayBmb3IgYW4gZXJyb3JcbiAgICBpZiAoZGF0YS5yZXN1bHQuZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnTGJyeW5ldCBhcGkgZXJyb3I6JywgZGF0YS5yZXN1bHQuZXJyb3IpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihkYXRhLnJlc3VsdC5lcnJvcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGZhbGxiYWNrIGluIGNhc2UgaXQganVzdCB0aW1lZCBvdXRcbiAgcmVqZWN0KEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoQ2xhaW0gKHB1Ymxpc2hQYXJhbXMpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUHVibGlzaGluZyBjbGFpbSB0byBcIiR7cHVibGlzaFBhcmFtcy5uYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncHVibGlzaCcsXG4gICAgICAgICAgcGFyYW1zOiBwdWJsaXNoUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncHVibGlzaCcsIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbChwdWJsaXNoUGFyYW1zKSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW0gKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIENsYWltIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpLCB0aW1lb3V0OiAyMCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW0nLCAnR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1MaXN0IChjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBjbGFpbV9saXN0IGZvciBcIiR7Y2xhaW1OYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2xhaW1fbGlzdCcsXG4gICAgICAgICAgcGFyYW1zOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW1MaXN0JywgJ0NMQUlNX0xJU1QnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZXNvbHZlVXJpICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUmVzb2x2aW5nIFVSSSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3Jlc29sdmUnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncmVzb2x2ZVVyaScsICdSRVNPTFZFJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdFt1cmldLmVycm9yKSB7ICAvLyBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgICAgICByZWplY3QoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHsgIC8vIGlmIG5vIGVycm9ycywgcmVzb2x2ZVxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdFt1cmldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldERvd25sb2FkRGlyZWN0b3J5ICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ2xicnlBcGkgPj4gUmV0cmlldmluZyB0aGUgZG93bmxvYWQgZGlyZWN0b3J5IHBhdGggZnJvbSBsYnJ5IGRhZW1vbi4uLicpO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3NldHRpbmdzX2dldCcsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldERvd25sb2FkRGlyZWN0b3J5JywgJ1NFVFRJTkdTX0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQuZG93bmxvYWRfZGlyZWN0b3J5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byBsYnJ5IGRhZW1vbiwgYnV0IHVuYWJsZSB0byByZXRyaWV2ZSB0aGUgZG93bmxvYWQgZGlyZWN0b3J5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0xicnluZXQgRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUoJy9ob21lL2xicnkvRG93bmxvYWRzLycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlQ2hhbm5lbCAobmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBDcmVhdGluZyBjaGFubmVsIGZvciAke25hbWV9Li4uYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2hhbm5lbF9uZXcnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgY2hhbm5lbF9uYW1lOiBuYW1lLFxuICAgICAgICAgICAgYW1vdW50ICAgICAgOiAwLjEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2NyZWF0ZUNoYW5uZWwnLCAnQ0hBTk5FTF9ORVcnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuU2hvcnRJZDogZnVuY3Rpb24gKGNsYWltc0FycmF5LCBsb25nSWQpIHtcbiAgICBsZXQgY2xhaW1JbmRleDtcbiAgICBsZXQgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgMSk7IC8vIGRlZmF1bHQgc2hvcnQgaWQgaXMgdGhlIGZpcnN0IGxldHRlclxuICAgIGxldCBzaG9ydElkTGVuZ3RoID0gMDtcbiAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGlzIGNsYWltIGlkXG4gICAgY2xhaW1JbmRleCA9IGNsYWltc0FycmF5LmZpbmRJbmRleChlbGVtZW50ID0+IHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYWltSWQgPT09IGxvbmdJZDtcbiAgICB9KTtcbiAgICBpZiAoY2xhaW1JbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xhaW0gaWQgbm90IGZvdW5kIGluIGNsYWltcyBsaXN0Jyk7XG4gICAgfVxuICAgIC8vIGdldCBhbiBhcnJheSBvZiBhbGwgY2xhaW1zIHdpdGggbG93ZXIgaGVpZ2h0XG4gICAgbGV0IHBvc3NpYmxlTWF0Y2hlcyA9IGNsYWltc0FycmF5LnNsaWNlKDAsIGNsYWltSW5kZXgpO1xuICAgIC8vIHJlbW92ZSBjZXJ0aWZpY2F0ZXMgd2l0aCB0aGUgc2FtZSBwcmVmaXhlcyB1bnRpbCBub25lIGFyZSBsZWZ0LlxuICAgIHdoaWxlIChwb3NzaWJsZU1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2hvcnRJZExlbmd0aCArPSAxO1xuICAgICAgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCk7XG4gICAgICBwb3NzaWJsZU1hdGNoZXMgPSBwb3NzaWJsZU1hdGNoZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQuY2xhaW1JZCAmJiAoZWxlbWVudC5jbGFpbUlkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKSA9PT0gc2hvcnRJZCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzaG9ydElkO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB1YSA9IHJlcXVpcmUoJ3VuaXZlcnNhbC1hbmFseXRpY3MnKTtcbmNvbnN0IHsgYW5hbHl0aWNzIDogeyBnb29nbGVJZCB9LCBkZXRhaWxzOiB7IHRpdGxlIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICByZXR1cm4ge1xuICAgIGV2ZW50Q2F0ZWdvcnkgICAgOiAnY2xpZW50IHJlcXVlc3RzJyxcbiAgICBldmVudEFjdGlvbiAgICAgIDogJ3NlcnZlIHJlcXVlc3QnLFxuICAgIGV2ZW50TGFiZWwgICAgICAgOiBvcmlnaW5hbFVybCxcbiAgICBpcE92ZXJyaWRlICAgICAgIDogaXAsXG4gICAgdXNlckFnZW50T3ZlcnJpZGU6IGhlYWRlcnNbJ3VzZXItYWdlbnQnXSxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gZW5kVGltZSAtIHN0YXJ0VGltZTtcbiAgcmV0dXJuIHtcbiAgICB1c2VyVGltaW5nQ2F0ZWdvcnkgICAgOiBjYXRlZ29yeSxcbiAgICB1c2VyVGltaW5nVmFyaWFibGVOYW1lOiB2YXJpYWJsZSxcbiAgICB1c2VyVGltaW5nVGltZSAgICAgICAgOiBkdXJhdGlvbixcbiAgICB1c2VyVGltaW5nTGFiZWwgICAgICAgOiBsYWJlbCxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudCAoaXAsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9ySWQgPSBpcC5yZXBsYWNlKC9cXC4vZywgJy0nKTtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IuZXZlbnQocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyAodmlzaXRvcklkLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IudGltaW5nKHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgVGltaW5nIGV2ZW50IHN1Y2Nlc3NmdWxseSBzZW50IHRvIGdvb2dsZSBhbmFseXRpY3NgKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VuZEdBU2VydmVFdmVudCAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlU2VydmVFdmVudFBhcmFtcyhoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudChpcCwgcGFyYW1zKTtcbiAgfSxcbiAgc2VuZEdBVGltaW5nRXZlbnQgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyhjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcodGl0bGUsIHBhcmFtcyk7XG4gIH0sXG4gIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCAoeyBjaGFubmVsX25hbWU6IGNoYW5uZWxOYW1lLCBjaGFubmVsX2lkOiBjaGFubmVsSWQgfSkge1xuICAgIHJldHVybiAoY2hhbm5lbE5hbWUgfHwgY2hhbm5lbElkID8gJ1BVQkxJU0hfSU5fQ0hBTk5FTF9DTEFJTScgOiAnUFVCTElTSF9BTk9OWU1PVVNfQ0xBSU0nKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHsgZGV0YWlscywgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5ICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gdmFsaWRhdGUgbmFtZVxuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBuYW1lIGZpZWxkIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgY29uc3QgaW52YWxpZE5hbWVDaGFyYWN0ZXJzID0gL1teQS1aYS16MC05LC1dLy5leGVjKG5hbWUpO1xuICAgIGlmIChpbnZhbGlkTmFtZUNoYXJhY3RlcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNsYWltIG5hbWUgeW91IHByb3ZpZGVkIGlzIG5vdCBhbGxvd2VkLiAgT25seSB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnMgYXJlIGFsbG93ZWQ6IEEtWiwgYS16LCAwLTksIGFuZCBcIi1cIicpO1xuICAgIH1cbiAgICAvLyBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgbnNmdyA9IChuc2Z3ID09PSAndHJ1ZScpO1xuICAgIGxpY2Vuc2UgPSBsaWNlbnNlIHx8IG51bGw7XG4gICAgdGl0bGUgPSB0aXRsZSB8fCBudWxsO1xuICAgIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gfHwgbnVsbDtcbiAgICB0aHVtYm5haWwgPSB0aHVtYm5haWwgfHwgbnVsbDtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgbnNmdyxcbiAgICAgIGxpY2Vuc2UsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgdGh1bWJuYWlsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyAoe2ZpbGUsIHRodW1ibmFpbH0pIHtcbiAgICAvLyBtYWtlIHN1cmUgYSBmaWxlIHdhcyBwcm92aWRlZFxuICAgIGlmICghZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHdpdGgga2V5IG9mIFtmaWxlXSBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5wYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcGF0aCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlIG5hbWVcbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZVxuICAgIG1vZHVsZS5leHBvcnRzLnZhbGlkYXRlRmlsZVR5cGVBbmRTaXplKGZpbGUpO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVOYW1lICAgICAgICAgOiBmaWxlLm5hbWUsXG4gICAgICBmaWxlUGF0aCAgICAgICAgIDogZmlsZS5wYXRoLFxuICAgICAgZmlsZVR5cGUgICAgICAgICA6IGZpbGUudHlwZSxcbiAgICAgIHRodW1ibmFpbEZpbGVOYW1lOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLm5hbWUgOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVQYXRoOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnBhdGggOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVUeXBlOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnR5cGUgOiBudWxsKSxcbiAgICB9O1xuICB9LFxuICB2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSAoZmlsZSkge1xuICAgIC8vIGNoZWNrIGZpbGUgdHlwZSBhbmQgc2l6ZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuanBlZy8uanBnLy5wbmcgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmdpZiB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIC5naWZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5tcDQgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gdW5yZWNvZ25pemVkIGZpbGUgdHlwZScpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSAnICsgZmlsZS50eXBlICsgJyBjb250ZW50IHR5cGUgaXMgbm90IHN1cHBvcnRlZC4gIE9ubHksIC5qcGVnLCAucG5nLCAuZ2lmLCBhbmQgLm1wNCBmaWxlcyBhcmUgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGU7XG4gIH0sXG4gIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyAoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBwcm92aWRlIGRlZmF1bHRzIGZvciB0aXRsZVxuICAgIGlmICh0aXRsZSA9PT0gbnVsbCB8fCB0aXRsZS50cmltKCkgPT09ICcnKSB7XG4gICAgICB0aXRsZSA9IG5hbWU7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgZGVzY3JpcHRpb25cbiAgICBpZiAoZGVzY3JpcHRpb24gPT09IG51bGwgfHwgZGVzY3JpcHRpb24udHJpbSgpID09PSAnJykge1xuICAgICAgZGVzY3JpcHRpb24gPSAnJztcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBsaWNlbnNlXG4gICAgaWYgKGxpY2Vuc2UgPT09IG51bGwgfHwgbGljZW5zZS50cmltKCkgPT09ICcnKSB7XG4gICAgICBsaWNlbnNlID0gJyAnOyAgLy8gZGVmYXVsdCB0byBlbXB0eSBzdHJpbmdcbiAgICB9XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIGNvbnN0IHB1Ymxpc2hQYXJhbXMgPSB7XG4gICAgICBuYW1lLFxuICAgICAgZmlsZV9wYXRoOiBmaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvciAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgfTtcbiAgICAvLyBhZGQgdGh1bWJuYWlsIHRvIGNoYW5uZWwgaWYgdmlkZW9cbiAgICBpZiAodGh1bWJuYWlsKSB7XG4gICAgICBwdWJsaXNoUGFyYW1zWydtZXRhZGF0YSddWyd0aHVtYm5haWwnXSA9IHRodW1ibmFpbDtcbiAgICB9XG4gICAgcmV0dXJuIHB1Ymxpc2hQYXJhbXM7XG4gIH0sXG4gIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMgKHRodW1ibmFpbEZpbGVQYXRoLCBjbGFpbU5hbWUsIGxpY2Vuc2UsIG5zZncpIHtcbiAgICBpZiAoIXRodW1ibmFpbEZpbGVQYXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgVGh1bWJuYWlsIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSAgICAgOiBgJHtjbGFpbU5hbWV9LXRodW1iYCxcbiAgICAgIGZpbGVfcGF0aDogdGh1bWJuYWlsRmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgdGl0bGUgICAgICA6IGAke2NsYWltTmFtZX0gdGh1bWJuYWlsYCxcbiAgICAgICAgZGVzY3JpcHRpb246IGBhIHRodW1ibmFpbCBmb3IgJHtjbGFpbU5hbWV9YCxcbiAgICAgICAgYXV0aG9yICAgICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlICAgOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICAgIGNoYW5uZWxfbmFtZSA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxfaWQgICA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbElkLFxuICAgIH07XG4gIH0sXG4gIGRlbGV0ZVRlbXBvcmFyeUZpbGUgKGZpbGVQYXRoKSB7XG4gICAgZnMudW5saW5rKGZpbGVQYXRoLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYGVycm9yIGRlbGV0aW5nIHRlbXBvcmFyeSBmaWxlICR7ZmlsZVBhdGh9YCk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1Zyhgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQgJHtmaWxlUGF0aH1gKTtcbiAgICB9KTtcbiAgfSxcbiAgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEgKGZpbGVJbmZvLCBnZXRSZXN1bHQpIHtcbiAgICBmaWxlSW5mby5maWxlTmFtZSA9IGdldFJlc3VsdC5maWxlX25hbWU7XG4gICAgZmlsZUluZm8uZmlsZVBhdGggPSBnZXRSZXN1bHQuZG93bmxvYWRfcGF0aDtcbiAgICByZXR1cm4gZmlsZUluZm87XG4gIH0sXG4gIGNyZWF0ZUZpbGVEYXRhICh7IG5hbWUsIGNsYWltSWQsIG91dHBvaW50LCBoZWlnaHQsIGFkZHJlc3MsIG5zZncsIGNvbnRlbnRUeXBlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGNsYWltSWQsXG4gICAgICBvdXRwb2ludCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGFkZHJlc3MsXG4gICAgICBmaWxlTmFtZTogJycsXG4gICAgICBmaWxlUGF0aDogJycsXG4gICAgICBmaWxlVHlwZTogY29udGVudFR5cGUsXG4gICAgICBuc2Z3LFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1sb2NhbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gY29uc3QgQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY2xpZW50L2NvbXBvbmVudHMnKTtcbi8vIGNvbnN0IENvbnRhaW5lcnMgPSByZXF1aXJlKCcuL2NsaWVudC9jb250YWluZXJzJyk7XG4vLyBjb25zdCBQYWdlcyA9IHJlcXVpcmUoJy4vY2xpZW50L3BhZ2VzJyk7XG5jb25zdCBhcGlSb3V0ZXMgPSByZXF1aXJlKCcuL3NlcnZlci9yb3V0ZXMvYXBpUm91dGVzLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCcuL2NvbmZpZy9sb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsID0gcmVxdWlyZSgnLi9jb25maWcvbXlzcWxDb25maWcnKTtcbmNvbnN0IHNpdGUgPSByZXF1aXJlKCcuL2NvbmZpZy9zaXRlQ29uZmlnJyk7XG5jb25zdCBzbGFjayA9IHJlcXVpcmUoJy4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJy4vc2VydmVyL3Bhc3Nwb3J0LycpO1xuXG5jb25zdCBleHBvcnRzID0ge1xuICAvLyBDb21wb25lbnRzLFxuICAvLyBDb250YWluZXJzLFxuICAvLyBQYWdlcyxcbiAgYXBpUm91dGVzLFxuICBsb2dnZXIsXG4gIG15c3FsLFxuICBzaXRlLFxuICBzbGFjayxcbiAgcGFzc3BvcnQsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcGVlY2guanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL215c3FsQ29uZmlnLmpzJyk7XG5jb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlLCBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHksIHB1Ymxpc2ggfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGdldENsYWltTGlzdCwgcmVzb2x2ZVVyaSwgZ2V0Q2xhaW0gfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSwgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zLCBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zLCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSwgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzLCBjcmVhdGVGaWxlRGF0YSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgZXJyb3JIYW5kbGVycyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgYXV0aGVudGljYXRlVXNlciB9ID0gcmVxdWlyZSgnLi4vYXV0aC9hdXRoZW50aWNhdGlvbi5qcycpO1xuY29uc3QgeyBnZXRDaGFubmVsRGF0YSwgZ2V0Q2hhbm5lbENsYWltcywgZ2V0Q2xhaW1JZCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbmNvbnN0IGFwaVJvdXRlcyA9IHtcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG4gIGNoYW5uZWxBdmFpbGFiaWxpdHlSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGF2YWlsYWJsZU5hbWUpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBnZXQgYSBzaG9ydCBjaGFubmVsIGlkIGZyb20gbG9uZyBjaGFubmVsIElkXG4gIGNoYW5uZWxTaG9ydElkUm91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgY29uc29sZS5sb2coJ2hlbGxvJyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdob3N0OicsIGhvc3QpO1xuICAgIGxvZ2dlci5kZWJ1ZygnZGI6JywgZGIpO1xuICAgIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oc2hvcnRJZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgY2hhbm5lbERhdGFSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpIHtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgICBnZXRDaGFubmVsRGF0YShjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIDApXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICBjaGFubmVsQ2xhaW1zUm91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gICAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlO1xuICAgIGdldENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgLy8gcm91dGUgdG8gcnVuIGEgY2xhaW1fbGlzdCByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgY2xhaW1MaXN0Um91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgZ2V0Q2xhaW1MaXN0KHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oY2xhaW1zTGlzdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGNsYWltc0xpc3QpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vIHJvdXRlIHRvIGdldCBhbiBhc3NldFxuICBjbGFpbUdldFJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0obmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgICAgaWYgKCFyZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmlsZURhdGEgPSBjcmVhdGVGaWxlRGF0YShyZXNvbHZlUmVzdWx0KTtcbiAgICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZURhdGEsIHtuYW1lLCBjbGFpbUlkfSwgJ0ZpbGUnKSwgZ2V0UmVzdWx0XSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2UsIGNvbXBsZXRlZCB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHRoaXMgc2l0ZSBwdWJsaXNoZWQgdG8gYSBjbGFpbVxuICBjbGFpbUF2YWlsYWJpbGl0eVJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpIHtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdCk7XG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vIHJvdXRlIHRvIHJ1biBhIHJlc29sdmUgcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGNsYWltUmVzb2x2ZVJvdXRlICh7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykge1xuICAgIHJlc29sdmVVcmkoYCR7cGFyYW1zLm5hbWV9IyR7cGFyYW1zLmNsYWltSWR9YClcbiAgICAgIC50aGVuKHJlc29sdmVkVXJpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzb2x2ZWRVcmkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vIHJvdXRlIHRvIHJ1biBhIHB1Ymxpc2ggcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGNsYWltUHVibGlzaFJvdXRlICh7IGJvZHksIGZpbGVzLCBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHVzZXIgfSwgcmVzKSB7XG4gICAgLy8gZGVmaW5lIHZhcmlhYmxlc1xuICAgIGxldCAgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCBkZXNjcmlwdGlvbiwgZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIGxpY2Vuc2UsIG5hbWUsIG5zZncsIHRodW1ibmFpbCwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZSwgdGl0bGU7XG4gICAgLy8gcmVjb3JkIHRoZSBzdGFydCB0aW1lIG9mIHRoZSByZXF1ZXN0XG4gICAgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIC8vIHZhbGlkYXRlIHRoZSBib2R5IGFuZCBmaWxlcyBvZiB0aGUgcmVxdWVzdFxuICAgIHRyeSB7XG4gICAgICAvLyB2YWxpZGF0ZUFwaVB1Ymxpc2hSZXF1ZXN0KGJvZHksIGZpbGVzKTtcbiAgICAgICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkoYm9keSkpO1xuICAgICAgKHtmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyhmaWxlcykpO1xuICAgICAgKHtjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmR9ID0gYm9keSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgLy8gY2hlY2sgY2hhbm5lbCBhdXRob3JpemF0aW9uXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgYXV0aGVudGljYXRlVXNlcihjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpLFxuICAgICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSksXG4gICAgICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSxcbiAgICAgIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXModGh1bWJuYWlsRmlsZVBhdGgsIG5hbWUsIGxpY2Vuc2UsIG5zZncpLFxuICAgIF0pXG4gICAgICAudGhlbigoW3tjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9LCB2YWxpZGF0ZWRDbGFpbU5hbWUsIHB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbFB1Ymxpc2hQYXJhbXNdKSA9PiB7XG4gICAgICAgIC8vIGFkZCBjaGFubmVsIGRldGFpbHMgdG8gdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfbmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9pZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHVibGlzaCB0aGUgdGh1bWJuYWlsXG4gICAgICAgIGlmICh0aHVtYm5haWxQdWJsaXNoUGFyYW1zKSB7XG4gICAgICAgICAgcHVibGlzaCh0aHVtYm5haWxQdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIGFzc2V0XG4gICAgICAgIHJldHVybiBwdWJsaXNoKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgbWVzc2FnZTogJ3B1Ymxpc2ggY29tcGxldGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgZGF0YSAgIDoge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHJlc3VsdC5jbGFpbV9pZCxcbiAgICAgICAgICAgIHVybCAgICA6IGAke2hvc3R9LyR7cmVzdWx0LmNsYWltX2lkfS8ke25hbWV9YCxcbiAgICAgICAgICAgIGxicnlUeCA6IHJlc3VsdCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gcmVjb3JkIHRoZSBwdWJsaXNoIGVuZCB0aW1lIGFuZCBzZW5kIHRvIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAncHVibGlzaCcsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSxcbiAgLy8gcm91dGUgdG8gZ2V0IGEgc2hvcnQgY2xhaW0gaWQgZnJvbSBsb25nIGNsYWltIElkXG4gIGNsYWltU2hvcnRJZFJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykge1xuICAgIGRiLkNsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogc2hvcnRJZH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0sXG4gIGNsYWltTG9uZ0lkUm91dGUgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdib2R5OicsIGJvZHkpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gYm9keS5jaGFubmVsTmFtZTtcbiAgICBjb25zdCBjaGFubmVsQ2xhaW1JZCA9IGJvZHkuY2hhbm5lbENsYWltSWQ7XG4gICAgY29uc3QgY2xhaW1OYW1lID0gYm9keS5jbGFpbU5hbWU7XG4gICAgY29uc3QgY2xhaW1JZCA9IGJvZHkuY2xhaW1JZDtcbiAgICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXN1bHR9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICBjbGFpbURhdGFSb3V0ZSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpIHtcbiAgICBjb25zdCBjbGFpbU5hbWUgPSBwYXJhbXMuY2xhaW1OYW1lO1xuICAgIGxldCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgaWYgKGNsYWltSWQgPT09ICdub25lJykgY2xhaW1JZCA9IG51bGw7XG4gICAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKGNsYWltSW5mbyA9PiB7XG4gICAgICAgIGlmICghY2xhaW1JbmZvKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIGNsYWltIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBjbGFpbUluZm99KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxuICAvLyByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcbiAgZmlsZUF2YWlsYWJpbGl0eVJvdXRlICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgZGIuRmlsZS5maW5kT25lKHt3aGVyZToge25hbWUsIGNsYWltSWR9fSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcGlSb3V0ZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaVJvdXRlcy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDZXJ0aWZpY2F0ZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NlcnRpZmljYXRlJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAga2V5VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHVibGljS2V5OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENlcnRpZmljYXRlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDZXJ0aWZpY2F0ZS5iZWxvbmdzVG8oZGIuQ2hhbm5lbCwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobG9uZ0NoYW5uZWxJZCwgY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgJHtjaGFubmVsTmFtZX06JHtsb25nQ2hhbm5lbElkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge25hbWU6IGNoYW5uZWxOYW1lfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsKHMpIGZvdW5kIHdpdGggdGhhdCBjaGFubmVsIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBsb25nQ2hhbm5lbElkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7Y2hhbm5lbENsYWltSWR9JWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSgke2NoYW5uZWxOYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2hhbm5lbE5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUudmFsaWRhdGVMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYHZhbGlkYXRlTG9uZ0NoYW5uZWxJZCgke25hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgJiYgKGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ2xhaW1JZCAmJiBjaGFubmVsQ2xhaW1JZC5sZW5ndGggPCA0MCkgeyAgLy8gaWYgYSBzaG9ydCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoY2hhbm5lbE5hbWUpOyAgLy8gaWYgbm8gY2hhbm5lbCBpZCBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQ2VydGlmaWNhdGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBDaGFubmVsID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2hhbm5lbCcsXG4gICAge1xuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDaGFubmVsLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDaGFubmVsLmJlbG9uZ3NUbyhkYi5Vc2VyKTtcbiAgICBDaGFubmVsLmhhc09uZShkYi5DZXJ0aWZpY2F0ZSk7XG4gIH07XG5cbiAgcmV0dXJuIENoYW5uZWw7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcbmNvbnN0IHsgYXNzZXREZWZhdWx0czogeyB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlKSB7XG4gIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgcmV0dXJuICdqcGVnJztcbiAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgcmV0dXJuICdwbmcnO1xuICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICByZXR1cm4gJ2dpZic7XG4gICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgIHJldHVybiAnbXA0JztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmRlYnVnKCdzZXR0aW5nIHVua25vd24gZmlsZSB0eXBlIGFzIGZpbGUgZXh0ZW5zaW9uIGpwZWcnKTtcbiAgICAgIHJldHVybiAnanBlZyc7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRldGVybWluZVRodW1ibmFpbCAoc3RvcmVkVGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKSB7XG4gIGlmIChzdG9yZWRUaHVtYm5haWwgPT09ICcnKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRUaHVtYm5haWw7XG4gIH1cbiAgcmV0dXJuIHN0b3JlZFRodW1ibmFpbDtcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFpbURhdGEgKGNsYWltKSB7XG4gIC8vIGxvZ2dlci5kZWJ1ZygncHJlcGFyaW5nIGNsYWltIGRhdGEgYmFzZWQgb24gcmVzb2x2ZWQgZGF0YTonLCBjbGFpbSk7XG4gIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gIGNsYWltWydob3N0J10gPSBob3N0O1xuICByZXR1cm4gY2xhaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2xhaW0gPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDbGFpbScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVJZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2VVcmw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBtZXRhZGF0YVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNvbnRlbnRUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2xhaW0uYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENsYWltLmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIGZvciAke2NsYWltTmFtZX0jJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbShzKSBmb3VuZCB3aXRoIHRoYXQgY2xhaW0gbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgY2xhaW1JZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zIGZvciAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICAgIHJhdyAgOiB0cnVlLCAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiBvbmx5IGRhdGEsIG5vdCBhbiBhcnJheSBvZiBpbnN0YW5jZXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbENsYWltc0FycmF5ID0+IHtcbiAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ2NoYW5uZWxjbGFpbXNhcnJheSBsZW5ndGg6JywgY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgY2hhbm5lbENsYWltc0FycmF5LmZvckVhY2goY2xhaW0gPT4ge1xuICAgICAgICAgICAgICAgIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgICAgICAgICAgICAgICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhaW07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShjaGFubmVsQ2xhaW1zQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGZpbmRpbmcgY2xhaW0gaWQgZm9yIGNsYWltICR7Y2xhaW1OYW1lfSBmcm9tIGNoYW5uZWwgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lLCBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydpZCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYCR7cmVzdWx0Lmxlbmd0aH0gcmVjb3JkcyBmb3VuZCBmb3IgXCIke2NsYWltTmFtZX1cIiBpbiBjaGFubmVsIFwiJHtjaGFubmVsQ2xhaW1JZH1cImApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBzaG9ydElkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7c2hvcnRJZH0lYCxcbiAgICAgICAgICAgIH19LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSwgIC8vIG5vdGU6IG1heWJlIGhlaWdodCBhbmQgZWZmZWN0aXZlIGFtb3VudCBuZWVkIHRvIHN3aXRjaD9cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2xlbmd0aCBvZiByZXN1bHQnLCByZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uZGF0YVZhbHVlcy5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0udmFsaWRhdGVMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2xhaW1JZCgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgaWYgKGNsYWltSWQgJiYgKGNsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2xhaW1JZCAmJiBjbGFpbUlkLmxlbmd0aCA8IDQwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTsgIC8vIGlmIGEgc2hvcnQgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZShjbGFpbU5hbWUpOyAgLy8gaWYgbm8gY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgQ2xhaW0ucmVzb2x2ZUNsYWltID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLnJlc29sdmVDbGFpbTogJHtuYW1lfSAke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2xhaW1BcnJheSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjbGFpbUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgbW9yZSB0aGFuIG9uZSByZWNvcmQgbWF0Y2hlcyAke25hbWV9IyR7Y2xhaW1JZH0gaW4gZGIuQ2xhaW1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIENsYWltO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSIH0pID0+IHtcbiAgY29uc3QgRmlsZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0ZpbGUnLFxuICAgIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgICA6IElOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHQgIDogMCxcbiAgICAgIH0sXG4gICAgICBmaWxlTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlUGF0aDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlVHlwZToge1xuICAgICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdHJlbmRpbmdFbGlnaWJsZToge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIEZpbGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIEZpbGUuaGFzTWFueShkYi5SZXF1ZXN0KTtcbiAgICBGaWxlLmhhc09uZShkYi5DbGFpbSk7XG4gIH07XG5cbiAgRmlsZS5nZXRSZWNlbnRDbGFpbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7XG4gICAgICB3aGVyZTogeyBuc2Z3OiBmYWxzZSwgdHJlbmRpbmdFbGlnaWJsZTogdHJ1ZSB9LFxuICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgbGltaXQ6IDI1LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBGaWxlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIFRFWFQgfSkgPT4ge1xuICBjb25zdCBSZXF1ZXN0ID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnUmVxdWVzdCcsXG4gICAge1xuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpcEFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgUmVxdWVzdC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgUmVxdWVzdC5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSZXF1ZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgVXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1VzZXInLFxuICAgIHtcbiAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgVXNlci5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgVXNlci5oYXNPbmUoZGIuQ2hhbm5lbCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY29tcGFyZVBhc3N3b3JkID0gZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChuZXdQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKG5ld1Bhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGN1cnJlbnQgcGFzc3dvcmQgd2l0aCB0aGUgbmV3IGhhc2hcbiAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAudXBkYXRlKHtwYXNzd29yZDogaGFzaH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gcHJlLXNhdmUgaG9vayBtZXRob2QgdG8gaGFzaCB0aGUgdXNlcidzIHBhc3N3b3JkIGJlZm9yZSB0aGUgdXNlcidzIGluZm8gaXMgc2F2ZWQgdG8gdGhlIGRiLlxuICBVc2VyLmhvb2soJ2JlZm9yZUNyZWF0ZScsICh1c2VyLCBvcHRpb25zKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdVc2VyLmJlZm9yZUNyZWF0ZSBob29rLi4uJyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBwYXNzd29yZCBzdHJpbmcgd2l0aCB0aGUgaGFzaCBwYXNzd29yZCB2YWx1ZVxuICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBoYXNoO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFVzZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy91c2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmNyeXB0XCJcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZGIgfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnJyk7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBwdWJsaXNoSGVscGVycyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyBwcmltYXJ5Q2xhaW1BZGRyZXNzLCBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgT3AgPSBTZXF1ZWxpemUuT3A7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoIChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHB1Ymxpc2hSZXN1bHRzLCBjZXJ0aWZpY2F0ZUlkLCBjaGFubmVsTmFtZTtcbiAgICAgIC8vIHB1Ymxpc2ggdGhlIGZpbGVcbiAgICAgIHJldHVybiBsYnJ5QXBpLnB1Ymxpc2hDbGFpbShwdWJsaXNoUGFyYW1zKVxuICAgICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFN1Y2Nlc3NmdWxseSBwdWJsaXNoZWQgJHtwdWJsaXNoUGFyYW1zLm5hbWV9ICR7ZmlsZU5hbWV9YCwgdHgpO1xuICAgICAgICAgIHB1Ymxpc2hSZXN1bHRzID0gdHg7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgaWYgKHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYHRoaXMgY2xhaW0gd2FzIHB1Ymxpc2hlZCBpbiBjaGFubmVsOiAke3B1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGRiLkNoYW5uZWwuZmluZE9uZSh7d2hlcmU6IHtjaGFubmVsTmFtZTogcHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWV9fSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygndGhpcyBjbGFpbSB3YXMgbm90IHB1Ymxpc2hlZCBpbiBhIGNoYW5uZWwnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgIC8vIHNldCBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgY2VydGlmaWNhdGVJZCA9IG51bGw7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgPSBudWxsO1xuICAgICAgICAgIGlmIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gY2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lID0gY2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKGBjZXJ0aWZpY2F0ZUlkOiAke2NlcnRpZmljYXRlSWR9YCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBGaWxlIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGZpbGVSZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgZmlsZVBhdGggICA6IHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoLFxuICAgICAgICAgICAgZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gY3JlYXRlIHRoZSBDbGFpbSByZWNvcmRcbiAgICAgICAgICBjb25zdCBjbGFpbVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIHRodW1ibmFpbCAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRodW1ibmFpbCxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICAgIGFtb3VudCAgICAgOiBwdWJsaXNoUGFyYW1zLmJpZCxcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQsXG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCBjcml0ZXJpYVxuICAgICAgICAgIGNvbnN0IHVwc2VydENyaXRlcmlhID0ge1xuICAgICAgICAgICAgbmFtZSAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgdGhlIHJlY29yZHNcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0ZpbGUnKSwgZGIudXBzZXJ0KGRiLkNsYWltLCBjbGFpbVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdDbGFpbScpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbZmlsZSwgY2xhaW1dKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlLnNldENsYWltKGNsYWltKSwgY2xhaW0uc2V0RmlsZShmaWxlKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgICAgcmVzb2x2ZShwdWJsaXNoUmVzdWx0cyk7IC8vIHJlc29sdmUgdGhlIHByb21pc2Ugd2l0aCB0aGUgcmVzdWx0IGZyb20gbGJyeUFwaS5wdWJsaXNoQ2xhaW07XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdQVUJMSVNIIEVSUk9SJywgZXJyb3IpO1xuICAgICAgICAgIHB1Ymxpc2hIZWxwZXJzLmRlbGV0ZVRlbXBvcmFyeUZpbGUocHVibGlzaFBhcmFtcy5maWxlX3BhdGgpOyAvLyBkZWxldGUgdGhlIGxvY2FsIGZpbGVcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUgKG5hbWUpIHtcbiAgICBjb25zdCBjbGFpbUFkZHJlc3NlcyA9IGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB8fCBbXTtcbiAgICBjbGFpbUFkZHJlc3Nlcy5wdXNoKHByaW1hcnlDbGFpbUFkZHJlc3MpO1xuICAgIC8vIGZpbmQgYW55IHJlY29yZHMgd2hlcmUgdGhlIG5hbWUgaXMgdXNlZFxuICAgIHJldHVybiBkYi5DbGFpbVxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbJ2FkZHJlc3MnXSxcbiAgICAgICAgd2hlcmUgICAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWRkcmVzczoge1xuICAgICAgICAgICAgW09wLm9yXTogY2xhaW1BZGRyZXNzZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNsYWltIGlzIGFscmVhZHkgaW4gdXNlJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSAobmFtZSkge1xuICAgIHJldHVybiBkYi5DaGFubmVsXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IGNoYW5uZWxOYW1lOiBuYW1lIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjaGFubmVsIGhhcyBhbHJlYWR5IGJlZW4gY2xhaW1lZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFuZGxlRXJyb3JSZXNwb25zZTogZnVuY3Rpb24gKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcykge1xuICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igb24gJHtvcmlnaW5hbFVybH1gLCBtb2R1bGUuZXhwb3J0cy51c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMoZXJyb3IpKTtcbiAgICBjb25zdCBbc3RhdHVzLCBtZXNzYWdlXSA9IG1vZHVsZS5leHBvcnRzLnJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyhlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKHN0YXR1cylcbiAgICAgIC5qc29uKG1vZHVsZS5leHBvcnRzLmNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkKHN0YXR1cywgbWVzc2FnZSkpO1xuICB9LFxuICByZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGxldCBzdGF0dXMsIG1lc3NhZ2U7XG4gICAgLy8gY2hlY2sgZm9yIGRhZW1vbiBiZWluZyB0dXJuZWQgb2ZmXG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICBzdGF0dXMgPSA1MDM7XG4gICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gcmVmdXNlZC4gIFRoZSBkYWVtb24gbWF5IG5vdCBiZSBydW5uaW5nLic7XG4gICAgICAvLyBmYWxsYmFjayBmb3IgZXZlcnl0aGluZyBlbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IDQwMDtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBbc3RhdHVzLCBtZXNzYWdlXTtcbiAgfSxcbiAgdXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID09PSAwKSB7XG4gICAgICBsZXQgbmV3RXJyb3JPYmplY3QgPSB7fTtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIG5ld0Vycm9yT2JqZWN0W2tleV0gPSBlcnJba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0Vycm9yT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9LFxuICBjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJjb25zdCB7IGRiIH0gPSByZXF1aXJlKCdteXNxbENvbmZpZycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aGVudGljYXRlVXNlciAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSB7XG4gICAgLy8gY2FzZTogbm8gY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgKGFub255bW91cyksIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB1c2VyIHRva2VuIGlzIHByb3ZpZGVkXG4gICAgaWYgKCFjaGFubmVsTmFtZSAmJiAhY2hhbm5lbElkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogbnVsbCxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHVzZXIgdG9rZW5cbiAgICBpZiAodXNlcikge1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxOYW1lICE9PSB1c2VyLmNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgbmFtZSBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbm5lbElkICYmIGNoYW5uZWxJZCAhPT0gdXNlci5jaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIGlkIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiB1c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogdXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggcGFzc3dvcmQgaW5zdGVhZCBvZiB1c2VyIHRva2VuXG4gICAgaWYgKCFjaGFubmVsUGFzc3dvcmQpIHRocm93IG5ldyBFcnJvcignbm8gY2hhbm5lbCBwYXNzd29yZCBwcm92aWRlZCcpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5hdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkKTtcbiAgfSxcbiAgYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCB1c2VyUGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gaG9pc3RlZCB2YXJpYWJsZXNcbiAgICAgIGxldCBjaGFubmVsRGF0YTtcbiAgICAgIC8vIGJ1aWxkIHRoZSBwYXJhbXMgZm9yIGZpbmRpbmcgdGhlIGNoYW5uZWxcbiAgICAgIGxldCBjaGFubmVsRmluZFBhcmFtcyA9IHt9O1xuICAgICAgaWYgKGNoYW5uZWxOYW1lKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgaWYgKGNoYW5uZWxJZCkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsSWQ7XG4gICAgICAvLyBmaW5kIHRoZSBjaGFubmVsXG4gICAgICBkYi5DaGFubmVsXG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogY2hhbm5lbEZpbmRQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyBjaGFubmVsIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hhbm5lbERhdGEgPSBjaGFubmVsLmdldCgpO1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBkYXRhOicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGIuVXNlci5maW5kT25lKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IHVzZXJOYW1lOiBjaGFubmVsRGF0YS5jaGFubmVsTmFtZS5zdWJzdHJpbmcoMSkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQodXNlclBhc3N3b3JkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnLi4ucGFzc3dvcmQgd2FzIGEgbWF0Y2guLi4nKTtcbiAgICAgICAgICByZXNvbHZlKGNoYW5uZWxEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvYXV0aC9hdXRoZW50aWNhdGlvbi5qcyIsImNvbnN0IHsgZGIgfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsImNvbnN0IENMQUlNU19QRVJfUEFHRSA9IDEyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2xhaW1zLCBwYWdlKSB7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsUGFnZXMoY2xhaW1zKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uUGFnZSA9IG1vZHVsZS5leHBvcnRzLmdldFBhZ2VGcm9tUXVlcnkocGFnZSk7XG4gICAgY29uc3Qgdmlld0RhdGEgPSB7XG4gICAgICBjaGFubmVsTmFtZSAgICAgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbXMgICAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmV4dHJhY3RQYWdlRnJvbUNsYWltcyhjbGFpbXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHByZXZpb3VzUGFnZSAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lUHJldmlvdXNQYWdlKHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlICAgICAgIDogcGFnaW5hdGlvblBhZ2UsXG4gICAgICBuZXh0UGFnZSAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZU5leHRQYWdlKHRvdGFsUGFnZXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHRvdGFsUGFnZXMgICAgICAgIDogdG90YWxQYWdlcyxcbiAgICAgIHRvdGFsUmVzdWx0cyAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxDbGFpbXMoY2xhaW1zKSxcbiAgICB9O1xuICAgIHJldHVybiB2aWV3RGF0YTtcbiAgfSxcbiAgZ2V0UGFnZUZyb21RdWVyeSAocGFnZSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFnZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9LFxuICBleHRyYWN0UGFnZUZyb21DbGFpbXMgKGNsYWltcywgcGFnZU51bWJlcikge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gW107ICAvLyBpZiBubyBjbGFpbXMsIHJldHVybiB0aGlzIGRlZmF1bHRcbiAgICB9XG4gICAgLy8gbG9nZ2VyLmRlYnVnKCdjbGFpbXMgaXMgYXJyYXk/JywgQXJyYXkuaXNBcnJheShjbGFpbXMpKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoYHBhZ2VOdW1iZXIgJHtwYWdlTnVtYmVyfSBpcyBudW1iZXI/YCwgTnVtYmVyLmlzSW50ZWdlcihwYWdlTnVtYmVyKSk7XG4gICAgY29uc3QgY2xhaW1TdGFydEluZGV4ID0gKHBhZ2VOdW1iZXIgLSAxKSAqIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBjbGFpbUVuZEluZGV4ID0gY2xhaW1TdGFydEluZGV4ICsgQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IHBhZ2VPZkNsYWltcyA9IGNsYWltcy5zbGljZShjbGFpbVN0YXJ0SW5kZXgsIGNsYWltRW5kSW5kZXgpO1xuICAgIHJldHVybiBwYWdlT2ZDbGFpbXM7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsUGFnZXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG90YWxDbGFpbXMgPSBjbGFpbXMubGVuZ3RoO1xuICAgICAgaWYgKHRvdGFsQ2xhaW1zIDwgQ0xBSU1TX1BFUl9QQUdFKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgY29uc3QgZnVsbFBhZ2VzID0gTWF0aC5mbG9vcih0b3RhbENsYWltcyAvIENMQUlNU19QRVJfUEFHRSk7XG4gICAgICBjb25zdCByZW1haW5kZXIgPSB0b3RhbENsYWltcyAlIENMQUlNU19QRVJfUEFHRTtcbiAgICAgIGlmIChyZW1haW5kZXIgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZ1bGxQYWdlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdWxsUGFnZXMgKyAxO1xuICAgIH1cbiAgfSxcbiAgZGV0ZXJtaW5lUHJldmlvdXNQYWdlIChjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSAtIDE7XG4gIH0sXG4gIGRldGVybWluZU5leHRQYWdlICh0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gdG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSArIDE7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsQ2xhaW1zIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBjbGFpbXMubGVuZ3RoO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBMb2dnZXJDb25maWcgKCkge1xuICB0aGlzLmxvZ0xldmVsID0gJ2RlYnVnJztcbiAgdGhpcy5jb25maWd1cmUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gbG9nZ2VyIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2NvbmZpZ3VyaW5nIHdpbnN0b24gbG9nZ2VyLi4uJyk7XG4gICAgLy8gdXBkYXRlIHZhbHVlcyB3aXRoIGxvY2FsIGNvbmZpZyBwYXJhbXNcbiAgICBjb25zdCB7bG9nTGV2ZWx9ID0gY29uZmlnO1xuICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcbiAgICAvLyBjb25maWd1cmUgdGhlIHdpbnN0b24gbG9nZ2VyXG4gICAgbG9nZ2VyLmNvbmZpZ3VyZSh7XG4gICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgIG5ldyAobG9nZ2VyLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubG9nTGV2ZWwsXG4gICAgICAgICAgdGltZXN0YW1wICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBwcmV0dHlQcmludCAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnMgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIC8vIHRlc3QgYWxsIHRoZSBsb2cgbGV2ZWxzXG4gICAgY29uc29sZS5sb2coJ3Rlc3Rpbmcgd2luc3RvbiBsb2cgbGV2ZWxzLi4uJyk7XG4gICAgbG9nZ2VyLmVycm9yKCdMZXZlbCAwJyk7XG4gICAgbG9nZ2VyLndhcm4oJ0xldmVsIDEnKTtcbiAgICBsb2dnZXIuaW5mbygnTGV2ZWwgMicpO1xuICAgIGxvZ2dlci52ZXJib3NlKCdMZXZlbCAzJyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdMZXZlbCA0Jyk7XG4gICAgbG9nZ2VyLnNpbGx5KCdMZXZlbCA1Jyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb2dnZXJDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJjb25zdCB3aW5zdG9uU2xhY2tXZWJIb29rID0gcmVxdWlyZSgnd2luc3Rvbi1zbGFjay13ZWJob29rJykuU2xhY2tXZWJIb29rO1xuY29uc3Qgd2luc3RvbiA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU2xhY2tDb25maWcgKCkge1xuICB0aGlzLnNsYWNrV2ViSG9vayAgICAgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdubyBzbGFjayBjb25maWcgcmVjZWl2ZWQnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlc1xuICAgIGNvbnNvbGUubG9nKCdjb25maWd1cmluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICBjb25zdCB7c2xhY2tXZWJIb29rLCBzbGFja0Vycm9yQ2hhbm5lbCwgc2xhY2tJbmZvQ2hhbm5lbH0gPSBjb25maWc7XG4gICAgdGhpcy5zbGFja1dlYkhvb2sgPSBzbGFja1dlYkhvb2s7XG4gICAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9IHNsYWNrRXJyb3JDaGFubmVsO1xuICAgIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCA9IHNsYWNrSW5mb0NoYW5uZWw7XG4gICAgLy8gdXBkYXRlIHNsYWNrIHdlYmhvb2sgc2V0dGluZ3NcbiAgICBpZiAodGhpcy5zbGFja1dlYkhvb2spIHtcbiAgICAgIC8vIGFkZCBhIHRyYW5zcG9ydCBmb3IgZXJyb3JzIHRvIHNsYWNrXG4gICAgICBpZiAodGhpcy5zbGFja0Vycm9yQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICd3YXJuJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrRXJyb3JDaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOmZhY2Vfd2l0aF9oZWFkX2JhbmRhZ2U6JyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgaWYgKHNsYWNrSW5mb0NoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ2luZm8nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpuZXJkX2ZhY2U6JyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgLy8gc2VuZCB0ZXN0IG1lc3NhZ2VzXG4gICAgICBjb25zb2xlLmxvZygndGVzdGluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICAgIHdpbnN0b24uZXJyb3IoJ1NsYWNrIFwiZXJyb3JcIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbnN0b24ud2FybignU2xhY2sgbG9nZ2luZyBpcyBub3QgZW5hYmxlZCBiZWNhdXNlIG5vIHNsYWNrV2ViSG9vayBjb25maWcgdmFyIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNsYWNrQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZGIgfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnJyk7XG5cbmNvbnN0IHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyA9ICh1c2VySW5zdGFuY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICB1c2VySW5mb1snaWQnXSA9IHVzZXJJbnN0YW5jZS5pZDtcbiAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IHVzZXJJbnN0YW5jZS51c2VyTmFtZTtcbiAgICB1c2VySW5zdGFuY2VcbiAgICAgIC5nZXRDaGFubmVsKClcbiAgICAgIC50aGVuKCh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSkgPT4ge1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChjaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIHJldHVybiBkYi5Vc2VyXG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7dXNlck5hbWU6IHVzZXJuYW1lfSxcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZChwYXNzd29yZClcbiAgICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1Bhc3N3b3JkIHdhcyBhIG1hdGNoLCByZXR1cm5pbmcgVXNlcicpO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyh1c2VyKVxuICAgICAgICAgICAgICAudGhlbih1c2VySW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9LFxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGRiIH0gPSByZXF1aXJlKCdteXNxbENvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJjb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XHJcbmNvbnN0IGxvY2FsTG9naW5TdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtbG9naW4uanMnKTtcclxuY29uc3QgbG9jYWxTaWdudXBTdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtc2lnbnVwLmpzJyk7XHJcbmNvbnN0IHsgc2VyaWFsaXplU3BlZWNoVXNlciwgZGVzZXJpYWxpemVTcGVlY2hVc2VyIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzJyk7XHJcblxyXG5wYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZGVzZXJpYWxpemVTcGVlY2hVc2VyKTtcclxucGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVTcGVlY2hVc2VyKTtcclxucGFzc3BvcnQudXNlKCdsb2NhbC1sb2dpbicsIGxvY2FsTG9naW5TdHJhdGVneSk7XHJcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtc2lnbnVwJywgbG9jYWxTaWdudXBTdHJhdGVneSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHBhc3Nwb3J0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcGFzc3BvcnQvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGNvbnNvbGUubG9nKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGNvbnNvbGUubG9nKCdkZXNlcmlhbGl6aW5nIHVzZXInKTtcbiAgICBkb25lKG51bGwsIHVzZXIpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==