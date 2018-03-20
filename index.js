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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sequelize = __webpack_require__(30);
var logger = __webpack_require__(1);

console.log('exporting sequelize models');

var _require = __webpack_require__(27),
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
var Certificate = __webpack_require__(67);
var Channel = __webpack_require__(68);
var Claim = __webpack_require__(69);
var File = __webpack_require__(70);
var Request = __webpack_require__(71);
var User = __webpack_require__(72);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = request;

__webpack_require__(90);

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Parses the status returned by a network request
 *
 * @param  {object} response   A response from a network request
 * @param  {object} response   The parsed JSON from the network request
 *
 * @return {object | undefined} Returns object with status and statusText, or undefined
 */
function checkStatus(response, jsonResponse) {
  if (response.status >= 200 && response.status < 300) {
    return jsonResponse;
  }
  var error = new Error(jsonResponse.message);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

function request(url, options) {
  return fetch(url, options).then(function (response) {
    return Promise.all([response, parseJSON(response)]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        response = _ref2[0],
        jsonResponse = _ref2[1];

    return checkStatus(response, jsonResponse);
  });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onHandleShowPageUri = onHandleShowPageUri;
exports.onRequestError = onRequestError;
exports.onNewChannelRequest = onNewChannelRequest;
exports.onNewAssetRequest = onNewAssetRequest;
exports.onRequestUpdate = onRequestUpdate;
exports.addRequestToRequestList = addRequestToRequestList;
exports.addAssetToAssetList = addAssetToAssetList;
exports.addNewChannelToChannelList = addNewChannelToChannelList;
exports.onUpdateChannelClaims = onUpdateChannelClaims;
exports.updateChannelClaims = updateChannelClaims;
exports.fileRequested = fileRequested;
exports.updateFileAvailability = updateFileAvailability;
exports.updateDisplayAssetError = updateDisplayAssetError;

var _show_action_types = __webpack_require__(9);

var actions = _interopRequireWildcard(_show_action_types);

var _show_request_types = __webpack_require__(47);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// basic request parsing
function onHandleShowPageUri(params) {
  return {
    type: actions.HANDLE_SHOW_URI,
    data: params
  };
};

function onRequestError(error) {
  return {
    type: actions.REQUEST_ERROR,
    data: error
  };
};

function onNewChannelRequest(channelName, channelId) {
  var requestType = _show_request_types.CHANNEL;
  var requestId = 'cr#' + channelName + '#' + channelId;
  return {
    type: actions.CHANNEL_REQUEST_NEW,
    data: { requestType: requestType, requestId: requestId, channelName: channelName, channelId: channelId }
  };
};

function onNewAssetRequest(name, id, channelName, channelId, extension) {
  var requestType = extension ? _show_request_types.ASSET_LITE : _show_request_types.ASSET_DETAILS;
  var requestId = 'ar#' + name + '#' + id + '#' + channelName + '#' + channelId;
  return {
    type: actions.ASSET_REQUEST_NEW,
    data: {
      requestType: requestType,
      requestId: requestId,
      name: name,
      modifier: {
        id: id,
        channel: {
          name: channelName,
          id: channelId
        }
      }
    }
  };
};

function onRequestUpdate(requestType, requestId) {
  return {
    type: actions.REQUEST_UPDATE,
    data: {
      requestType: requestType,
      requestId: requestId
    }
  };
};

function addRequestToRequestList(id, error, key) {
  return {
    type: actions.REQUEST_LIST_ADD,
    data: { id: id, error: error, key: key }
  };
};

// asset actions

function addAssetToAssetList(id, error, name, claimId, shortId, claimData) {
  return {
    type: actions.ASSET_ADD,
    data: { id: id, error: error, name: name, claimId: claimId, shortId: shortId, claimData: claimData }
  };
}

// channel actions

function addNewChannelToChannelList(id, name, shortId, longId, claimsData) {
  return {
    type: actions.CHANNEL_ADD,
    data: { id: id, name: name, shortId: shortId, longId: longId, claimsData: claimsData }
  };
};

function onUpdateChannelClaims(channelKey, name, longId, page) {
  return {
    type: actions.CHANNEL_CLAIMS_UPDATE_ASYNC,
    data: { channelKey: channelKey, name: name, longId: longId, page: page }
  };
};

function updateChannelClaims(channelListId, claimsData) {
  return {
    type: actions.CHANNEL_CLAIMS_UPDATE_SUCCESS,
    data: { channelListId: channelListId, claimsData: claimsData }
  };
};

// display a file

function fileRequested(name, claimId) {
  return {
    type: actions.FILE_REQUESTED,
    data: { name: name, claimId: claimId }
  };
};

function updateFileAvailability(status) {
  return {
    type: actions.FILE_AVAILABILITY_UPDATE,
    data: status
  };
};

function updateDisplayAssetError(error) {
  return {
    type: actions.DISPLAY_ASSET_ERROR,
    data: error
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _channel = __webpack_require__(22);

var _publish = __webpack_require__(23);

var _view = __webpack_require__(92);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var channel = _ref.channel,
      site = _ref.site;

  return {
    channelName: channel.loggedInChannel.name,
    channelShortId: channel.loggedInChannel.shortId,
    channelLongId: channel.loggedInChannel.longId,
    siteDescription: site.description
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onChannelLogin: function onChannelLogin(name, shortId, longId) {
      dispatch((0, _channel.updateLoggedInChannel)(name, shortId, longId));
      dispatch((0, _publish.updateSelectedChannel)(name));
    },
    onChannelLogout: function onChannelLogout() {
      dispatch((0, _channel.updateLoggedInChannel)(null, null, null));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// request actions
var HANDLE_SHOW_URI = exports.HANDLE_SHOW_URI = 'HANDLE_SHOW_URI';
var REQUEST_ERROR = exports.REQUEST_ERROR = 'REQUEST_ERROR';
var REQUEST_UPDATE = exports.REQUEST_UPDATE = 'REQUEST_UPDATE';
var ASSET_REQUEST_NEW = exports.ASSET_REQUEST_NEW = 'ASSET_REQUEST_NEW';
var CHANNEL_REQUEST_NEW = exports.CHANNEL_REQUEST_NEW = 'CHANNEL_REQUEST_NEW';
var REQUEST_LIST_ADD = exports.REQUEST_LIST_ADD = 'REQUEST_LIST_ADD';

// asset actions
var ASSET_ADD = exports.ASSET_ADD = 'ASSET_ADD';

// channel actions
var CHANNEL_ADD = exports.CHANNEL_ADD = 'CHANNEL_ADD';

var CHANNEL_CLAIMS_UPDATE_ASYNC = exports.CHANNEL_CLAIMS_UPDATE_ASYNC = 'CHANNEL_CLAIMS_UPDATE_ASYNC';
var CHANNEL_CLAIMS_UPDATE_SUCCESS = exports.CHANNEL_CLAIMS_UPDATE_SUCCESS = 'CHANNEL_CLAIMS_UPDATE_SUCCESS';

// asset/file display actions
var FILE_REQUESTED = exports.FILE_REQUESTED = 'FILE_REQUESTED';
var FILE_AVAILABILITY_UPDATE = exports.FILE_AVAILABILITY_UPDATE = 'FILE_AVAILABILITY_UPDATE';
var DISPLAY_ASSET_ERROR = exports.DISPLAY_ASSET_ERROR = 'DISPLAY_ASSET_ERROR';

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(95);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var site = _ref.site;
  var defaultDescription = site.defaultDescription,
      defaultThumbnail = site.defaultThumbnail,
      siteDescription = site.description,
      siteHost = site.host,
      siteTitle = site.title,
      siteTwitter = site.twitter;

  return {
    defaultDescription: defaultDescription,
    defaultThumbnail: defaultThumbnail,
    siteDescription: siteDescription,
    siteHost: siteHost,
    siteTitle: siteTitle,
    siteTwitter: siteTwitter
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var selectAsset = exports.selectAsset = function selectAsset(show) {
  var request = show.requestList[show.request.id];
  var assetKey = request.key;
  return show.assetList[assetKey];
};

var selectShowState = exports.selectShowState = function selectShowState(state) {
  return state.show;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(64);
var logger = __webpack_require__(1);

var _require = __webpack_require__(65),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(15),
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);
var ua = __webpack_require__(66);

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
/* 16 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = __webpack_require__(3),
    componentsConfig = _require.componentsConfig;

function getDeepestChildValue(parent, childrenKeys) {
  var childKey = childrenKeys.shift(); // .shift() retrieves the first element of array and removes it from array
  var child = parent[childKey];
  if (childrenKeys.length >= 1) {
    return getDeepestChildValue(child, childrenKeys);
  }
  return child;
}

var dynamicImport = exports.dynamicImport = function dynamicImport(filePath) {
  // validate inputs
  if (!filePath) {
    throw new Error('no file path provided to dynamicImport()');
  }
  if (filePath.typeof !== 'string') {
    throw new Error('file path provided to dynamicImport() must be a string');
  }
  // split out the file folders  // filter out any empty or white-space-only strings
  var folders = filePath.split('/').filter(function (folderName) {
    return folderName.replace(/\s/g, '').length;
  });
  // check for the component corresponding to file path in the site config object
  // i.e. componentsConfig[folders[0]][folders[2][...][folders[n]]
  var customComponent = getDeepestChildValue(componentsConfig, folders);
  if (customComponent) {
    return customComponent; // return custom component
  } else {
    return __webpack_require__(89)("" + filePath);
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createBasicCanonicalLink = function createBasicCanonicalLink(page, siteHost) {
  return siteHost + "/" + page;
};

var createAssetCanonicalLink = function createAssetCanonicalLink(asset, siteHost) {
  var channelName = void 0,
      certificateId = void 0,
      name = void 0,
      claimId = void 0;
  if (asset.claimData) {
    var _asset$claimData = asset.claimData;
    channelName = _asset$claimData.channelName;
    certificateId = _asset$claimData.certificateId;
    name = _asset$claimData.name;
    claimId = _asset$claimData.claimId;
  };
  if (channelName) {
    return siteHost + "/" + channelName + ":" + certificateId + "/" + name;
  };
  return siteHost + "/" + claimId + "/" + name;
};

var createChannelCanonicalLink = function createChannelCanonicalLink(channel, siteHost) {
  var name = channel.name,
      longId = channel.longId;

  return siteHost + "/" + name + ":" + longId;
};

var createCanonicalLink = exports.createCanonicalLink = function createCanonicalLink(asset, channel, page, siteHost) {
  if (asset) {
    return createAssetCanonicalLink(asset, siteHost);
  }
  if (channel) {
    return createChannelCanonicalLink(channel, siteHost);
  }
  return createBasicCanonicalLink(page, siteHost);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
        modifier = _componentsRegex$exec2[3];

    // Validate and process name


    if (!value) {
      throw new Error('Check your URL.  No channel name provided before "' + modifierSeperator + '"');
    }
    var isChannel = value.startsWith(module.exports.CHANNEL_CHAR);
    var channelName = isChannel ? value : null;
    var claimId = void 0;
    if (isChannel) {
      if (!channelName) {
        throw new Error('Check your URL.  No channel name after "@".');
      }
      var nameBadChars = channelName.match(module.exports.REGEXP_INVALID_CHANNEL);
      if (nameBadChars) {
        throw new Error('Check your URL.  Invalid characters in channel name: "' + nameBadChars.join(', ') + '".');
      }
    } else {
      claimId = value;
    }

    // Validate and process modifier
    var channelClaimId = void 0;
    if (modifierSeperator) {
      if (!modifier) {
        throw new Error('Check your URL.  No modifier provided after separator "' + modifierSeperator + '"');
      }

      if (modifierSeperator === ':') {
        channelClaimId = modifier;
      } else {
        throw new Error('Check your URL.  The "' + modifierSeperator + '" modifier is not currently supported');
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
        extension = _componentsRegex$exec4[3];

    // Validate and process name


    if (!claimName) {
      throw new Error('Check your URL.  No claim name provided before "."');
    }
    var nameBadChars = claimName.match(module.exports.REGEXP_INVALID_CLAIM);
    if (nameBadChars) {
      throw new Error('Check your URL.  Invalid characters in claim name: "' + nameBadChars.join(', ') + '".');
    }
    // Validate and process extension
    if (extensionSeperator) {
      if (!extension) {
        throw new Error('Check your URL.  No file extension provided after separator "' + extensionSeperator + '".');
      }
      if (extensionSeperator !== '.') {
        throw new Error('Check your URL.  The "' + extensionSeperator + '" separator is not supported in the claim name.');
      }
    }
    return {
      claimName: claimName,
      extension: extension || null
    };
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var determineOgThumbnailContentType = function determineOgThumbnailContentType(thumbnail) {
  if (thumbnail) {
    var fileExt = thumbnail.substring(thumbnail.lastIndexOf('.'));
    switch (fileExt) {
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
  }
  return '';
};

var createBasicMetaTags = function createBasicMetaTags(siteHost, siteDescription, siteTitle, siteTwitter) {
  return [{ property: 'og:title', content: siteTitle }, { property: 'og:url', content: siteHost }, { property: 'og:site_name', content: siteTitle }, { property: 'og:description', content: siteDescription }, { property: 'twitter:site', content: siteTwitter }, { property: 'twitter:card', content: 'summary' }];
};

var createChannelMetaTags = function createChannelMetaTags(siteTitle, siteHost, siteTwitter, channel) {
  var name = channel.name,
      longId = channel.longId;

  return [{ property: 'og:title', content: name + ' on ' + siteTitle }, { property: 'og:url', content: siteHost + '/' + name + ':' + longId }, { property: 'og:site_name', content: siteTitle }, { property: 'og:description', content: name + ', a channel on ' + siteTitle }, { property: 'twitter:site', content: siteTwitter }, { property: 'twitter:card', content: 'summary' }];
};

var createAssetMetaTags = function createAssetMetaTags(siteHost, siteTitle, siteTwitter, asset, defaultDescription, defaultThumbnail) {
  var claimData = asset.claimData;
  var contentType = claimData.contentType;

  var embedUrl = siteHost + '/' + claimData.claimId + '/' + claimData.name;
  var showUrl = siteHost + '/' + claimData.claimId + '/' + claimData.name;
  var source = siteHost + '/' + claimData.claimId + '/' + claimData.name + '.' + claimData.fileExt;
  var ogTitle = claimData.title || claimData.name;
  var ogDescription = claimData.description || defaultDescription;
  var ogThumbnailContentType = determineOgThumbnailContentType(claimData.thumbnail);
  var ogThumbnail = claimData.thumbnail || defaultThumbnail;
  var metaTags = [{ property: 'og:title', content: ogTitle }, { property: 'og:url', content: showUrl }, { property: 'og:site_name', content: siteTitle }, { property: 'og:description', content: ogDescription }, { property: 'og:image:width', content: 600 }, { property: 'og:image:height', content: 315 }, { property: 'twitter:site', content: siteTwitter }];
  if (contentType === 'video/mp4' || contentType === 'video/webm') {
    metaTags.push({ property: 'og:video', content: source });
    metaTags.push({ property: 'og:video:secure_url', content: source });
    metaTags.push({ property: 'og:video:type', content: contentType });
    metaTags.push({ property: 'og:image', content: ogThumbnail });
    metaTags.push({ property: 'og:image:type', content: ogThumbnailContentType });
    metaTags.push({ property: 'og:type', content: 'video' });
    metaTags.push({ property: 'twitter:card', content: 'player' });
    metaTags.push({ property: 'twitter:player', content: embedUrl });
    metaTags.push({ property: 'twitter:player:width', content: 600 });
    metaTags.push({ property: 'twitter:text:player_width', content: 600 });
    metaTags.push({ property: 'twitter:player:height', content: 337 });
    metaTags.push({ property: 'twitter:player:stream', content: source });
    metaTags.push({ property: 'twitter:player:stream:content_type', content: contentType });
  } else {
    metaTags.push({ property: 'og:image', content: source });
    metaTags.push({ property: 'og:image:type', content: contentType });
    metaTags.push({ property: 'og:type', content: 'article' });
    metaTags.push({ property: 'twitter:card', content: 'summary_large_image' });
  }
  return metaTags;
};

var createMetaTags = exports.createMetaTags = function createMetaTags(siteDescription, siteHost, siteTitle, siteTwitter, asset, channel, defaultDescription, defaultThumbnail) {
  if (asset) {
    return createAssetMetaTags(siteHost, siteTitle, siteTwitter, asset, defaultDescription, defaultThumbnail);
  };
  if (channel) {
    return createChannelMetaTags(siteHost, siteTitle, siteTwitter, channel);
  };
  return createBasicMetaTags(siteDescription, siteHost, siteTitle, siteTwitter);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createPageTitle = exports.createPageTitle = function createPageTitle(siteTitle, pageTitle) {
  if (!pageTitle) {
    return "" + siteTitle;
  }
  return siteTitle + " - " + pageTitle;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoggedInChannel = updateLoggedInChannel;

var _channel_action_types = __webpack_require__(39);

var actions = _interopRequireWildcard(_channel_action_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// export action creators

function updateLoggedInChannel(name, shortId, longId) {
  return {
    type: actions.CHANNEL_UPDATE,
    data: {
      name: name,
      shortId: shortId,
      longId: longId
    }
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectFile = selectFile;
exports.clearFile = clearFile;
exports.updateMetadata = updateMetadata;
exports.updateClaim = updateClaim;
exports.setPublishInChannel = setPublishInChannel;
exports.updatePublishStatus = updatePublishStatus;
exports.updateError = updateError;
exports.updateSelectedChannel = updateSelectedChannel;
exports.toggleMetadataInputs = toggleMetadataInputs;
exports.onNewThumbnail = onNewThumbnail;
exports.startPublish = startPublish;

var _publish_action_types = __webpack_require__(38);

var actions = _interopRequireWildcard(_publish_action_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// export action creators
function selectFile(file) {
  return {
    type: actions.FILE_SELECTED,
    data: file
  };
};

function clearFile() {
  return {
    type: actions.FILE_CLEAR
  };
};

function updateMetadata(name, value) {
  return {
    type: actions.METADATA_UPDATE,
    data: {
      name: name,
      value: value
    }
  };
};

function updateClaim(value) {
  return {
    type: actions.CLAIM_UPDATE,
    data: value
  };
};

function setPublishInChannel(channel) {
  return {
    type: actions.SET_PUBLISH_IN_CHANNEL,
    channel: channel
  };
};

function updatePublishStatus(status, message) {
  return {
    type: actions.PUBLISH_STATUS_UPDATE,
    data: {
      status: status,
      message: message
    }
  };
};

function updateError(name, value) {
  return {
    type: actions.ERROR_UPDATE,
    data: {
      name: name,
      value: value
    }
  };
};

function updateSelectedChannel(channelName) {
  return {
    type: actions.SELECTED_CHANNEL_UPDATE,
    data: channelName
  };
};

function toggleMetadataInputs(showMetadataInputs) {
  return {
    type: actions.TOGGLE_METADATA_INPUTS,
    data: showMetadataInputs
  };
};

function onNewThumbnail(file) {
  return {
    type: actions.THUMBNAIL_NEW,
    data: file
  };
};

function startPublish(history) {
  return {
    type: actions.PUBLISH_START,
    data: { history: history }
  };
}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(24);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorPage = function (_React$Component) {
  _inherits(ErrorPage, _React$Component);

  function ErrorPage() {
    _classCallCheck(this, ErrorPage);

    return _possibleConstructorReturn(this, (ErrorPage.__proto__ || Object.getPrototypeOf(ErrorPage)).apply(this, arguments));
  }

  _createClass(ErrorPage, [{
    key: 'render',
    value: function render() {
      var error = this.props.error;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_NavBar2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'row row--padded' },
          _react2.default.createElement(
            'p',
            null,
            error
          )
        )
      );
    }
  }]);

  return ErrorPage;
}(_react2.default.Component);

;

ErrorPage.propTypes = {
  error: _propTypes2.default.string.isRequired
};

exports.default = ErrorPage;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function MysqlConfig() {
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

module.exports = new MysqlConfig();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function SlackConfig() {
  var _this = this;

  this.slackWebHook = 'default';
  this.slackErrorChannel = 'default';
  this.slackInfoChannel = 'default';
  this.configure = function (config) {
    if (!config) {
      return console.log('No slack config received.');
    }
    var slackWebHook = config.slackWebHook,
        slackErrorChannel = config.slackErrorChannel,
        slackInfoChannel = config.slackInfoChannel;

    _this.slackWebHook = slackWebHook;
    _this.slackErrorChannel = slackErrorChannel;
    _this.slackInfoChannel = slackInfoChannel;
  };
};

module.exports = new SlackConfig();

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);
var fs = __webpack_require__(79);

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(1);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(5);
var logger = __webpack_require__(1);

var _require = __webpack_require__(81),
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(36);

var _redux = __webpack_require__(16);

var _index = __webpack_require__(37);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _index3 = __webpack_require__(41);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(42);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(49);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(12);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  var context = {};

  // create a new Redux store instance
  var store = (0, _redux.createStore)(_index2.default);

  // render component to a string
  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(
        _index4.default,
        null,
        _react2.default.createElement(_app2.default, null)
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
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(16);

var _publish = __webpack_require__(83);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(85);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(86);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(87);

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  channel: _channel2.default,
  publish: _publish2.default,
  show: _show2.default,
  site: _site2.default
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FILE_SELECTED = exports.FILE_SELECTED = 'FILE_SELECTED';
var FILE_CLEAR = exports.FILE_CLEAR = 'FILE_CLEAR';
var METADATA_UPDATE = exports.METADATA_UPDATE = 'METADATA_UPDATE';
var CLAIM_UPDATE = exports.CLAIM_UPDATE = 'CLAIM_UPDATE';
var SET_PUBLISH_IN_CHANNEL = exports.SET_PUBLISH_IN_CHANNEL = 'SET_PUBLISH_IN_CHANNEL';
var PUBLISH_STATUS_UPDATE = exports.PUBLISH_STATUS_UPDATE = 'PUBLISH_STATUS_UPDATE';
var ERROR_UPDATE = exports.ERROR_UPDATE = 'ERROR_UPDATE';
var SELECTED_CHANNEL_UPDATE = exports.SELECTED_CHANNEL_UPDATE = 'SELECTED_CHANNEL_UPDATE';
var TOGGLE_METADATA_INPUTS = exports.TOGGLE_METADATA_INPUTS = 'TOGGLE_METADATA_INPUTS';
var THUMBNAIL_NEW = exports.THUMBNAIL_NEW = 'THUMBNAIL_NEW';
var PUBLISH_START = exports.PUBLISH_START = 'PUBLISH_START';

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL_UPDATE = exports.CHANNEL_UPDATE = 'CHANNEL_UPDATE';

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOCAL_CHECK = exports.LOCAL_CHECK = 'LOCAL_CHECK';
var UNAVAILABLE = exports.UNAVAILABLE = 'UNAVAILABLE';
var ERROR = exports.ERROR = 'ERROR';
var AVAILABLE = exports.AVAILABLE = 'AVAILABLE';

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactGa = __webpack_require__(88);

var _reactGa2 = _interopRequireDefault(_reactGa);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(3),
    googleId = _require.analytics.googleId;

_reactGa2.default.initialize(googleId);

var GAListener = function (_React$Component) {
  _inherits(GAListener, _React$Component);

  function GAListener() {
    _classCallCheck(this, GAListener);

    return _possibleConstructorReturn(this, (GAListener.__proto__ || Object.getPrototypeOf(GAListener)).apply(this, arguments));
  }

  _createClass(GAListener, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.sendPageView(this.props.history.location);
      this.props.history.listen(this.sendPageView);
    }
  }, {
    key: 'sendPageView',
    value: function sendPageView(location) {
      _reactGa2.default.set({ page: location.pathname });
      _reactGa2.default.pageview(location.pathname);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return GAListener;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(GAListener);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _dynamicImport = __webpack_require__(17);

var _AboutPage = __webpack_require__(91);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _LoginPage = __webpack_require__(96);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(104);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(121);

var _FourOhFourPage2 = _interopRequireDefault(_FourOhFourPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomePage = (0, _dynamicImport.dynamicImport)('pages/HomePage'); // or use the provided local homepage

var App = function App() {
  return _react2.default.createElement(
    _reactRouterDom.Switch,
    null,
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: HomePage }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/about', component: _AboutPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: _LoginPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:identifier/:claim', component: _ShowPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:claim', component: _ShowPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { component: _FourOhFourPage2.default })
  );
};

exports.default = App;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  validateFile: function validateFile(file) {
    if (!file) {
      throw new Error('no file provided');
    }
    if (/'/.test(file.name)) {
      throw new Error('apostrophes are not allowed in the file name');
    }
    // validate size and type
    switch (file.type) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        if (file.size > 10000000) {
          throw new Error('Sorry, images are limited to 10 megabytes.');
        }
        break;
      case 'image/gif':
        if (file.size > 50000000) {
          throw new Error('Sorry, GIFs are limited to 50 megabytes.');
        }
        break;
      case 'video/mp4':
        if (file.size > 50000000) {
          throw new Error('Sorry, videos are limited to 50 megabytes.');
        }
        break;
      default:
        throw new Error(file.type + ' is not a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
    }
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createPublishMetadata = exports.createPublishMetadata = function createPublishMetadata(claim, _ref, _ref2, publishInChannel, selectedChannel) {
  var type = _ref.type;
  var title = _ref2.title,
      description = _ref2.description,
      license = _ref2.license,
      nsfw = _ref2.nsfw;

  var metadata = {
    name: claim,
    title: title,
    description: description,
    license: license,
    nsfw: nsfw,
    type: type
  };
  if (publishInChannel) {
    metadata['channelName'] = selectedChannel;
  }
  return metadata;
};

var createPublishFormData = exports.createPublishFormData = function createPublishFormData(file, thumbnail, metadata) {
  var fd = new FormData();
  // append file
  fd.append('file', file);
  // append thumbnail
  if (thumbnail) {
    fd.append('thumbnail', thumbnail);
  }
  // append metadata
  for (var key in metadata) {
    if (metadata.hasOwnProperty(key)) {
      fd.append(key, metadata[key]);
    }
  }
  return fd;
};

var createThumbnailUrl = exports.createThumbnailUrl = function createThumbnailUrl(channel, channelId, claim, host) {
  return host + '/' + channel + ':' + channelId + '/' + claim + '-thumb.png';
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var validateChannelSelection = exports.validateChannelSelection = function validateChannelSelection(publishInChannel, selectedChannel, loggedInChannel) {
  if (publishInChannel && selectedChannel !== loggedInChannel.name) {
    throw new Error('Log in to a channel or select Anonymous');
  }
};

var validatePublishParams = exports.validatePublishParams = function validatePublishParams(file, claim, urlError) {
  if (!file) {
    throw new Error('Please choose a file');
  }
  if (!claim) {
    throw new Error('Please enter a URL');
  }
  if (urlError) {
    throw new Error('Fix the url');
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(24);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveStatusBar = __webpack_require__(102);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(103);

var _InactiveStatusBar2 = _interopRequireDefault(_InactiveStatusBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar(props) {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));

    _this.state = {
      bars: [],
      index: 0,
      incrementer: 1
    };
    _this.createBars = _this.createBars.bind(_this);
    _this.startProgressBar = _this.startProgressBar.bind(_this);
    _this.updateProgressBar = _this.updateProgressBar.bind(_this);
    _this.stopProgressBar = _this.stopProgressBar.bind(_this);
    return _this;
  }

  _createClass(ProgressBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.createBars();
      this.startProgressBar();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopProgressBar();
    }
  }, {
    key: 'createBars',
    value: function createBars() {
      var bars = [];
      for (var i = 0; i <= this.props.size; i++) {
        bars.push({ isActive: false });
      }
      this.setState({ bars: bars });
    }
  }, {
    key: 'startProgressBar',
    value: function startProgressBar() {
      this.updateInterval = setInterval(this.updateProgressBar.bind(this), 300);
    }
  }, {
    key: 'updateProgressBar',
    value: function updateProgressBar() {
      var index = this.state.index;
      var incrementer = this.state.incrementer;
      var bars = this.state.bars;
      // flip incrementer if necessary, to stay in bounds
      if (index < 0 || index > this.props.size) {
        incrementer = incrementer * -1;
        index += incrementer;
      }
      // update the indexed bar
      if (incrementer > 0) {
        bars[index].isActive = true;
      } else {
        bars[index].isActive = false;
      };
      // increment index
      index += incrementer;
      // update state
      this.setState({
        bars: bars,
        incrementer: incrementer,
        index: index
      });
    }
  }, {
    key: 'stopProgressBar',
    value: function stopProgressBar() {
      clearInterval(this.updateInterval);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.bars.map(function (bar, index) {
          return bar.isActive ? _react2.default.createElement(_ActiveStatusBar2.default, { key: index }) : _react2.default.createElement(_InactiveStatusBar2.default, { key: index });
        })
      );
    }
  }]);

  return ProgressBar;
}(_react2.default.Component);

;

ProgressBar.propTypes = {
  size: _propTypes2.default.number.isRequired
};

exports.default = ProgressBar;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL = exports.CHANNEL = 'CHANNEL';
var ASSET_LITE = exports.ASSET_LITE = 'ASSET_LITE';
var ASSET_DETAILS = exports.ASSET_DETAILS = 'ASSET_DETAILS';

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(108);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(7);

var _show2 = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;

  // select error and status
  var error = show.displayAsset.error;
  var status = show.displayAsset.status;
  // select asset
  var asset = (0, _show2.selectAsset)(show);
  //  return props
  return {
    error: error,
    status: status,
    asset: asset
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onFileRequest: function onFileRequest(name, claimId) {
      dispatch((0, _show.fileRequested)(name, claimId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helmet, html, preloadedState) {
    // take the html and preloadedState and return the full page
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var selectSiteState = exports.selectSiteState = function selectSiteState(state) {
  return state.site;
};

var selectSiteHost = exports.selectSiteHost = function selectSiteHost(state) {
  return state.site.host;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
__webpack_require__(53);
module.exports = __webpack_require__(54);


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(55);
var bodyParser = __webpack_require__(56);
var expressHandlebars = __webpack_require__(57);
var Handlebars = __webpack_require__(58);
var helmet = __webpack_require__(59);
var passport = __webpack_require__(26);

var _require = __webpack_require__(60),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

var cookieSession = __webpack_require__(61);
var http = __webpack_require__(62);
// logging dependencies
var logger = __webpack_require__(1);

function SpeechServer() {
  var _this = this;

  this.configureMysql = function (mysqlConfig) {
    __webpack_require__(27).configure(mysqlConfig);
  };
  this.configureSite = function (siteConfig) {
    __webpack_require__(3).configure(siteConfig);
    console.log(__webpack_require__(3));
    _this.sessionKey = siteConfig.auth.sessionKey;
    _this.PORT = siteConfig.details.port;
  };
  this.configureSlack = function (slackConfig) {
    __webpack_require__(28).configure(slackConfig);
  };
  this.createApp = function () {
    // create an Express application
    var app = express();

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
    var localSignupStrategy = __webpack_require__(63);
    var localLoginStrategy = __webpack_require__(74);
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
    // initialize passport
    app.use(cookieSession({
      name: 'session',
      keys: [_this.sessionKey],
      maxAge: 24 * 60 * 60 * 1000 // i.e. 24 hours
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // configure handlebars & register it with express app
    var hbs = expressHandlebars.create({
      defaultLayout: 'embed',
      handlebars: Handlebars
    });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // set the routes on the app
    __webpack_require__(75)(app);
    __webpack_require__(76)(app);
    __webpack_require__(82)(app);
    __webpack_require__(123)(app);
    __webpack_require__(133)(app);

    _this.app = app;
  };
  this.initialize = function () {
    __webpack_require__(134)(logger);
    __webpack_require__(136)(logger);
    _this.createApp();
    _this.server = http.Server(_this.app);
  };
  this.start = function () {
    var db = __webpack_require__(5);
    // sync sequelize
    db.sequelize.sync()
    // start the server
    .then(function () {
      _this.server.listen(_this.PORT, function () {
        logger.info('Server is listening on PORT ' + _this.PORT);
      });
    }).catch(function (error) {
      logger.error('Startup Error:', error);
    });
  };
};

module.exports = SpeechServer;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

module.exports = {
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
/* 61 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(29).Strategy;
var lbryApi = __webpack_require__(14);
var logger = __webpack_require__(1);
var db = __webpack_require__(5);

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
/* 64 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 65 */
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
/* 66 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(31),
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
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(31),
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
/* 70 */
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
/* 71 */
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(73);
var logger = __webpack_require__(1);

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
/* 73 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(29).Strategy;
var logger = __webpack_require__(1);
var db = __webpack_require__(5);

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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);
var passport = __webpack_require__(26);

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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(1);
var multipart = __webpack_require__(77);

var _require = __webpack_require__(3),
    uploadDirectory = _require.publishing.uploadDirectory,
    host = _require.details.host;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });
var db = __webpack_require__(5);

var _require2 = __webpack_require__(78),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    checkChannelAvailability = _require2.checkChannelAvailability,
    publish = _require2.publish;

var _require3 = __webpack_require__(14),
    getClaimList = _require3.getClaimList,
    resolveUri = _require3.resolveUri,
    getClaim = _require3.getClaim;

var _require4 = __webpack_require__(32),
    addGetResultsToFileData = _require4.addGetResultsToFileData,
    createBasicPublishParams = _require4.createBasicPublishParams,
    createThumbnailPublishParams = _require4.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require4.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require4.parsePublishApiRequestFiles,
    createFileData = _require4.createFileData;

var errorHandlers = __webpack_require__(33);

var _require5 = __webpack_require__(15),
    sendGATimingEvent = _require5.sendGATimingEvent;

var _require6 = __webpack_require__(80),
    authenticateUser = _require6.authenticateUser;

var _require7 = __webpack_require__(34),
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
        name = _ref.params.name;

    var gaStartTime = Date.now();
    checkChannelAvailability(name).then(function (availableName) {
      res.status(200).json(availableName);
      sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
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
        name = _ref11.params.name;

    var gaStartTime = Date.now();
    claimNameIsAvailable(name).then(function (result) {
      res.status(200).json(result);
      sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
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
  });
  // route to get a short claim id from long claim Id
  app.get('/api/claim/short-id/:longId/:name', function (_ref16, res) {
    var ip = _ref16.ip,
        originalUrl = _ref16.originalUrl,
        body = _ref16.body,
        params = _ref16.params;

    db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name).then(function (shortId) {
      res.status(200).json({ success: true, data: shortId });
    }).catch(function (error) {
      errorHandlers.handleErrorResponse(originalUrl, ip, error, res);
    });
  });
  app.post('/api/claim/long-id', function (_ref17, res) {
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
  });
  app.get('/api/claim/data/:claimName/:claimId', function (_ref18, res) {
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
  });
  // route to see if asset is available locally
  app.get('/api/file/availability/:name/:claimId', function (_ref19, res) {
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
  });
};

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(1);
var db = __webpack_require__(5);
var lbryApi = __webpack_require__(14);
var publishHelpers = __webpack_require__(32);

var _require = __webpack_require__(3),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(30);
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
/* 79 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(5);
var logger = __webpack_require__(1);

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
/* 81 */
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    host = _require.details;

var handlePageRender = __webpack_require__(35);

module.exports = function (app) {
  // route for the home page
  app.get('/', function (req, res) {
    handlePageRender(req, res);
  });
  // route to display login page
  app.get('/login', function (req, res) {
    handlePageRender(req, res);
  });
  // route to show 'about' page
  app.get('/about', function (req, res) {
    handlePageRender(req, res);
  });
  // route to display a list of the trending images
  app.get('/trending', function (req, res) {
    res.status(301).redirect('/popular');
  });
  app.get('/popular', function (req, res) {
    handlePageRender(req, res);
  });
  // route to display a list of the trending images
  app.get('/new', function (req, res) {
    handlePageRender(req, res);
  });
  // route to send embedable video player (for twitter)
  app.get('/embed/:claimId/:name', function (_ref, res) {
    var params = _ref.params;

    var claimId = params.claimId;
    var name = params.name;
    // get and render the content
    res.status(200).render('embed', { layout: 'embed', host: host, claimId: claimId, name: name });
  });
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actions.FILE_SELECTED:
      return Object.assign({}, initialState, { // note: clears to initial state
        file: action.data
      });
    case actions.FILE_CLEAR:
      return initialState;
    case actions.METADATA_UPDATE:
      return Object.assign({}, state, {
        metadata: Object.assign({}, state.metadata, _defineProperty({}, action.data.name, action.data.value))
      });
    case actions.CLAIM_UPDATE:
      return Object.assign({}, state, {
        claim: action.data
      });
    case actions.SET_PUBLISH_IN_CHANNEL:
      return Object.assign({}, state, {
        publishInChannel: action.channel
      });
    case actions.PUBLISH_STATUS_UPDATE:
      return Object.assign({}, state, {
        status: action.data
      });
    case actions.ERROR_UPDATE:
      return Object.assign({}, state, {
        error: Object.assign({}, state.error, _defineProperty({}, action.data.name, action.data.value))
      });
    case actions.SELECTED_CHANNEL_UPDATE:
      return Object.assign({}, state, {
        selectedChannel: action.data
      });
    case actions.TOGGLE_METADATA_INPUTS:
      return Object.assign({}, state, {
        showMetadataInputs: action.data
      });
    case actions.THUMBNAIL_NEW:
      return Object.assign({}, state, {
        thumbnail: action.data
      });
    default:
      return state;
  }
};

var _publish_action_types = __webpack_require__(38);

var actions = _interopRequireWildcard(_publish_action_types);

var _publish_channel_select_states = __webpack_require__(84);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(3),
    publishing = _require.publishing;

var initialState = {
  disabled: publishing.disabled,
  disabledMessage: publishing.disabledMessage,
  publishInChannel: false,
  selectedChannel: _publish_channel_select_states.LOGIN,
  showMetadataInputs: false,
  status: {
    status: null,
    message: null
  },
  error: {
    file: null,
    url: null,
    channel: null,
    publishSubmit: null
  },
  file: null,
  claim: '',
  metadata: {
    title: '',
    description: '',
    license: '',
    nsfw: false
  },
  thumbnail: null
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = exports.LOGIN = 'Existing';
var CREATE = exports.CREATE = 'New';

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actions.CHANNEL_UPDATE:
      return Object.assign({}, state, {
        loggedInChannel: action.data
      });
    default:
      return state;
  }
};

var _channel_action_types = __webpack_require__(39);

var actions = _interopRequireWildcard(_channel_action_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
  loggedInChannel: {
    name: null,
    shortId: null,
    longId: null
  }
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    // handle request
    case actions.REQUEST_ERROR:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          error: action.data
        })
      });
    case actions.REQUEST_UPDATE:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, {
          type: action.data.requestType,
          id: action.data.requestId
        })
      });
    // store requests
    case actions.REQUEST_LIST_ADD:
      return Object.assign({}, state, {
        requestList: Object.assign({}, state.requestList, _defineProperty({}, action.data.id, {
          error: action.data.error,
          key: action.data.key
        }))
      });
    // asset data
    case actions.ASSET_ADD:
      return Object.assign({}, state, {
        assetList: Object.assign({}, state.assetList, _defineProperty({}, action.data.id, {
          error: action.data.error,
          name: action.data.name,
          claimId: action.data.claimId,
          shortId: action.data.shortId,
          claimData: action.data.claimData
        }))
      });
    // channel data
    case actions.CHANNEL_ADD:
      return Object.assign({}, state, {
        channelList: Object.assign({}, state.channelList, _defineProperty({}, action.data.id, {
          name: action.data.name,
          longId: action.data.longId,
          shortId: action.data.shortId,
          claimsData: action.data.claimsData
        }))
      });
    case actions.CHANNEL_CLAIMS_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        channelList: Object.assign({}, state.channelList, _defineProperty({}, action.data.channelListId, Object.assign({}, state.channelList[action.data.channelListId], {
          claimsData: action.data.claimsData
        })))
      });
    // display an asset
    case actions.FILE_AVAILABILITY_UPDATE:
      return Object.assign({}, state, {
        displayAsset: Object.assign({}, state.displayAsset, {
          status: action.data
        })
      });
    case actions.DISPLAY_ASSET_ERROR:
      return Object.assign({}, state, {
        displayAsset: Object.assign({}, state.displayAsset, {
          error: action.data,
          status: _asset_display_states.ERROR
        })
      });
    default:
      return state;
  }
};

var _show_action_types = __webpack_require__(9);

var actions = _interopRequireWildcard(_show_action_types);

var _asset_display_states = __webpack_require__(40);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  request: {
    error: null,
    type: null,
    id: null
  },
  requestList: {},
  channelList: {},
  assetList: {},
  displayAsset: {
    error: null,
    status: _asset_display_states.LOCAL_CHECK
  }
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    default:
      return state;
  }
};

var siteConfig = __webpack_require__(3);

var googleAnalyticsId = siteConfig.analytics.googleId,
    _siteConfig$assetDefa = siteConfig.assetDefaults,
    defaultThumbnail = _siteConfig$assetDefa.thumbnail,
    defaultDescription = _siteConfig$assetDefa.description,
    _siteConfig$details = siteConfig.details,
    description = _siteConfig$details.description,
    host = _siteConfig$details.host,
    title = _siteConfig$details.title,
    twitter = _siteConfig$details.twitter;


var initialState = {
  description: description,
  googleAnalyticsId: googleAnalyticsId,
  host: host,
  title: title,
  twitter: twitter,
  defaultDescription: defaultDescription,
  defaultThumbnail: defaultThumbnail
};

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./canonicalLink": 18,
	"./canonicalLink.js": 18,
	"./dynamicImport": 17,
	"./dynamicImport.js": 17,
	"./file": 43,
	"./file.js": 43,
	"./lbryUri": 19,
	"./lbryUri.js": 19,
	"./metaTags": 20,
	"./metaTags.js": 20,
	"./pageTitle": 21,
	"./pageTitle.js": 21,
	"./publish": 44,
	"./publish.js": 44,
	"./request": 6,
	"./request.js": 6,
	"./validate": 45,
	"./validate.js": 45
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 89;

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("cross-fetch/polyfill");

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _SEO = __webpack_require__(10);

var _SEO2 = _interopRequireDefault(_SEO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AboutPage = function (_React$Component) {
  _inherits(AboutPage, _React$Component);

  function AboutPage() {
    _classCallCheck(this, AboutPage);

    return _possibleConstructorReturn(this, (AboutPage.__proto__ || Object.getPrototypeOf(AboutPage)).apply(this, arguments));
  }

  _createClass(AboutPage, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_SEO2.default, { pageTitle: 'About', pageUri: 'about' }),
        _react2.default.createElement(_NavBar2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'row row--padded' },
          _react2.default.createElement(
            'div',
            { className: 'column column--5 column--med-10 align-content-top' },
            _react2.default.createElement(
              'div',
              { className: 'column column--8 column--med-10' },
              _react2.default.createElement(
                'p',
                { className: 'pull-quote' },
                'Spee.ch is an open-source project.  Please contribute to the existing site, or fork it and make your own.'
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'https://twitter.com/spee_ch' },
                  'TWITTER'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'https://github.com/lbryio/spee.ch' },
                  'GITHUB'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'https://discord.gg/YjYbwhS' },
                  'DISCORD CHANNEL'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'https://github.com/lbryio/spee.ch/blob/master/README.md' },
                  'DOCUMENTATION'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'column column--5 column--med-10 align-content-top' },
            _react2.default.createElement(
              'div',
              { className: 'column column--8 column--med-10' },
              _react2.default.createElement(
                'p',
                null,
                'Spee.ch is a media-hosting site that reads from and publishes content to the ',
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', href: 'https://lbry.io' },
                  'LBRY'
                ),
                ' blockchain.'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Spee.ch is a hosting service, but with the added benefit that it stores your content on a decentralized network of computers -- the ',
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', href: 'https://lbry.io/get' },
                  'LBRY'
                ),
                ' network.  This means that your images are stored in multiple locations without a single point of failure.'
              ),
              _react2.default.createElement(
                'h3',
                null,
                'Contribute'
              ),
              _react2.default.createElement(
                'p',
                null,
                'If you have an idea for your own spee.ch-like site on top of LBRY, fork our ',
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', href: 'https://github.com/lbryio/spee.ch' },
                  'github repo'
                ),
                ' and go to town!'
              ),
              _react2.default.createElement(
                'p',
                null,
                'If you want to improve spee.ch, join our ',
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', href: 'https://discord.gg/YjYbwhS' },
                  'discord channel'
                ),
                ' or solve one of our ',
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', href: 'https://github.com/lbryio/spee.ch/issues' },
                  'github issues'
                ),
                '.'
              )
            )
          )
        )
      );
    }
  }]);

  return AboutPage;
}(_react2.default.Component);

;

exports.default = AboutPage;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Logo = __webpack_require__(93);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(94);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _request = __webpack_require__(6);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VIEW = 'VIEW';
var LOGOUT = 'LOGOUT';

var NavBar = function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar(props) {
    _classCallCheck(this, NavBar);

    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _this.checkForLoggedInUser = _this.checkForLoggedInUser.bind(_this);
    _this.logoutUser = _this.logoutUser.bind(_this);
    _this.handleSelection = _this.handleSelection.bind(_this);
    return _this;
  }

  _createClass(NavBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // check to see if the user is already logged in
      this.checkForLoggedInUser();
    }
  }, {
    key: 'checkForLoggedInUser',
    value: function checkForLoggedInUser() {
      var _this2 = this;

      var params = { credentials: 'include' };
      (0, _request2.default)('/user', params).then(function (_ref) {
        var data = _ref.data;

        _this2.props.onChannelLogin(data.channelName, data.shortChannelId, data.channelClaimId);
      }).catch(function (error) {
        console.log('/user error:', error.message);
      });
    }
  }, {
    key: 'logoutUser',
    value: function logoutUser() {
      var _this3 = this;

      var params = { credentials: 'include' };
      (0, _request2.default)('/logout', params).then(function () {
        _this3.props.onChannelLogout();
      }).catch(function (error) {
        console.log('/logout error', error.message);
      });
    }
  }, {
    key: 'handleSelection',
    value: function handleSelection(event) {
      var value = event.target.selectedOptions[0].value;
      switch (value) {
        case LOGOUT:
          this.logoutUser();
          break;
        case VIEW:
          // redirect to channel page
          this.props.history.push('/' + this.props.channelName + ':' + this.props.channelLongId);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var siteDescription = this.props.siteDescription;

      return _react2.default.createElement(
        'div',
        { className: 'row row--wide nav-bar' },
        _react2.default.createElement(
          'div',
          { className: 'row row--padded row--short flex-container--row flex-container--space-between-center' },
          _react2.default.createElement(_Logo2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'nav-bar--center' },
            _react2.default.createElement(
              'span',
              { className: 'nav-bar-tagline' },
              siteDescription
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'nav-bar--right' },
            _react2.default.createElement(
              _reactRouterDom.NavLink,
              { className: 'nav-bar-link link--nav', activeClassName: 'link--nav-active', to: '/', exact: true },
              'Publish'
            ),
            _react2.default.createElement(
              _reactRouterDom.NavLink,
              { className: 'nav-bar-link link--nav', activeClassName: 'link--nav-active', to: '/about' },
              'About'
            ),
            this.props.channelName ? _react2.default.createElement(_NavBarChannelOptionsDropdown2.default, {
              channelName: this.props.channelName,
              handleSelection: this.handleSelection,
              defaultSelection: this.props.channelName,
              VIEW: VIEW,
              LOGOUT: LOGOUT
            }) : _react2.default.createElement(
              _reactRouterDom.NavLink,
              { id: 'nav-bar-login-link', className: 'nav-bar-link link--nav', activeClassName: 'link--nav-active', to: '/login' },
              'Channel'
            )
          )
        )
      );
    }
  }]);

  return NavBar;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(NavBar);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Logo() {
  return _react2.default.createElement(
    'svg',
    { version: '1.1', id: 'Layer_1', x: '0px', y: '0px', height: '24px', viewBox: '0 0 80 31', enableBackground: 'new 0 0 80 31', className: 'nav-bar-logo' },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/' },
      _react2.default.createElement(
        'title',
        null,
        'Logo'
      ),
      _react2.default.createElement(
        'desc',
        null,
        'Spee.ch logo'
      ),
      _react2.default.createElement(
        'g',
        { id: 'About' },
        _react2.default.createElement(
          'g',
          { id: 'Publish-Form-V2-_x28_filled_x29_', transform: 'translate(-42.000000, -23.000000)' },
          _react2.default.createElement(
            'g',
            { id: 'Group-17', transform: 'translate(42.000000, 22.000000)' },
            _react2.default.createElement(
              'text',
              { transform: 'matrix(1 0 0 1 0 20)', fontSize: '25', fontFamily: 'Roboto' },
              'Spee<h'
            ),
            _react2.default.createElement(
              'g',
              { id: 'Group-16', transform: 'translate(0.000000, 30.000000)' },
              _react2.default.createElement('path', { id: 'Line-8', fill: 'none', stroke: '#09F911', strokeWidth: '1', strokeLinecap: 'square', d: 'M0.5,1.5h15' }),
              _react2.default.createElement('path', { id: 'Line-8-Copy', fill: 'none', stroke: '#029D74', strokeWidth: '1', strokeLinecap: 'square', d: 'M16.5,1.5h15' }),
              _react2.default.createElement('path', { id: 'Line-8-Copy-2', fill: 'none', stroke: '#E35BD8', strokeWidth: '1', strokeLinecap: 'square', d: 'M32.5,1.5h15' }),
              _react2.default.createElement('path', { id: 'Line-8-Copy-3', fill: 'none', stroke: '#4156C5', strokeWidth: '1', strokeLinecap: 'square', d: 'M48.5,1.5h15' }),
              _react2.default.createElement('path', { id: 'Line-8-Copy-4', fill: 'none', stroke: '#635688', strokeWidth: '1', strokeLinecap: 'square', d: 'M64.5,1.5h15' })
            )
          )
        )
      )
    )
  );
};

exports.default = Logo;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavBarChannelDropdown(_ref) {
  var channelName = _ref.channelName,
      handleSelection = _ref.handleSelection,
      defaultSelection = _ref.defaultSelection,
      VIEW = _ref.VIEW,
      LOGOUT = _ref.LOGOUT;

  return _react2.default.createElement(
    'select',
    { type: 'text', id: 'nav-bar-channel-select', className: 'select select--arrow link--nav', onChange: handleSelection, value: defaultSelection },
    _react2.default.createElement(
      'option',
      { id: 'nav-bar-channel-select-channel-option' },
      channelName
    ),
    _react2.default.createElement(
      'option',
      { value: VIEW },
      'View'
    ),
    _react2.default.createElement(
      'option',
      { value: LOGOUT },
      'Logout'
    )
  );
};

exports.default = NavBarChannelDropdown;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(12);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _propTypes = __webpack_require__(24);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageTitle = __webpack_require__(21);

var _metaTags = __webpack_require__(20);

var _canonicalLink = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEO = function (_React$Component) {
  _inherits(SEO, _React$Component);

  function SEO() {
    _classCallCheck(this, SEO);

    return _possibleConstructorReturn(this, (SEO.__proto__ || Object.getPrototypeOf(SEO)).apply(this, arguments));
  }

  _createClass(SEO, [{
    key: 'render',
    value: function render() {
      // props from state
      var _props = this.props,
          defaultDescription = _props.defaultDescription,
          defaultThumbnail = _props.defaultThumbnail,
          siteDescription = _props.siteDescription,
          siteHost = _props.siteHost,
          siteTitle = _props.siteTitle,
          siteTwitter = _props.siteTwitter;
      // props from parent

      var _props2 = this.props,
          asset = _props2.asset,
          channel = _props2.channel,
          pageUri = _props2.pageUri;
      var pageTitle = this.props.pageTitle;
      // create page title, tags, and canonical link

      pageTitle = (0, _pageTitle.createPageTitle)(siteTitle, pageTitle);
      var metaTags = (0, _metaTags.createMetaTags)(siteDescription, siteHost, siteTitle, siteTwitter, asset, channel, defaultDescription, defaultThumbnail);
      var canonicalLink = (0, _canonicalLink.createCanonicalLink)(asset, channel, pageUri, siteHost);
      // render results
      return _react2.default.createElement(_reactHelmet2.default, {
        title: pageTitle,
        meta: metaTags,
        link: [{ rel: 'canonical', href: canonicalLink }]
      });
    }
  }]);

  return SEO;
}(_react2.default.Component);

;

SEO.propTypes = {
  pageTitle: _propTypes2.default.string,
  pageUri: _propTypes2.default.string,
  channel: _propTypes2.default.object,
  asset: _propTypes2.default.object
};

exports.default = SEO;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(97);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var channel = _ref.channel;

  return {
    loggedInChannelName: channel.loggedInChannel.name
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _SEO = __webpack_require__(10);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelLoginForm = __webpack_require__(98);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(100);

var _ChannelCreateForm2 = _interopRequireDefault(_ChannelCreateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPage = function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage() {
    _classCallCheck(this, LoginPage);

    return _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).apply(this, arguments));
  }

  _createClass(LoginPage, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // re-route the user to the homepage if the user is logged in
      if (newProps.loggedInChannelName !== this.props.loggedInChannelName) {
        this.props.history.push('/');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_SEO2.default, { pageTitle: 'Login', pageUri: 'login' }),
        _react2.default.createElement(_NavBar2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'row row--padded' },
          _react2.default.createElement(
            'div',
            { className: 'column column--5 column--med-10 align-content-top' },
            _react2.default.createElement(
              'div',
              { className: 'column column--8 column--med-10' },
              _react2.default.createElement(
                'p',
                null,
                'Channels allow you to publish and group content under an identity. You can create a channel for yourself, or share one with like-minded friends.  You can create 1 channel, or 100, so whether you\'re ',
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: '/@catalonia2017:43dcf47163caa21d8404d9fe9b30f78ef3e146a8' },
                  'documenting important events'
                ),
                ', or making a public repository for ',
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: '/@catGifs' },
                  'cat gifs'
                ),
                ' (password: \'1234\'), try creating a channel for it!'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'column column--5 column--med-10 align-content-top' },
            _react2.default.createElement(
              'div',
              { className: 'column column--8 column--med-10' },
              _react2.default.createElement(
                'h3',
                { className: 'h3--no-bottom' },
                'Log in to an existing channel:'
              ),
              _react2.default.createElement(_ChannelLoginForm2.default, null),
              _react2.default.createElement(
                'h3',
                { className: 'h3--no-bottom' },
                'Create a brand new channel:'
              ),
              _react2.default.createElement(_ChannelCreateForm2.default, null)
            )
          )
        )
      );
    }
  }]);

  return LoginPage;
}(_react2.default.Component);

;

exports.default = (0, _reactRouterDom.withRouter)(LoginPage);

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _channel = __webpack_require__(22);

var _view = __webpack_require__(99);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onChannelLogin: function onChannelLogin(name, shortId, longId) {
      dispatch((0, _channel.updateLoggedInChannel)(name, shortId, longId));
      dispatch((0, _publish.updateSelectedChannel)(name));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(_view2.default);

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(6);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelLoginForm = function (_React$Component) {
  _inherits(ChannelLoginForm, _React$Component);

  function ChannelLoginForm(props) {
    _classCallCheck(this, ChannelLoginForm);

    var _this = _possibleConstructorReturn(this, (ChannelLoginForm.__proto__ || Object.getPrototypeOf(ChannelLoginForm)).call(this, props));

    _this.state = {
      error: null,
      name: '',
      password: ''
    };
    _this.handleInput = _this.handleInput.bind(_this);
    _this.loginToChannel = _this.loginToChannel.bind(_this);
    return _this;
  }

  _createClass(ChannelLoginForm, [{
    key: 'handleInput',
    value: function handleInput(event) {
      var name = event.target.name;
      var value = event.target.value;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'loginToChannel',
    value: function loginToChannel(event) {
      var _this2 = this;

      event.preventDefault();
      var params = {
        method: 'POST',
        body: JSON.stringify({ username: this.state.name, password: this.state.password }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        credentials: 'include'
      };
      (0, _request2.default)('login', params).then(function (_ref) {
        var success = _ref.success,
            channelName = _ref.channelName,
            shortChannelId = _ref.shortChannelId,
            channelClaimId = _ref.channelClaimId,
            message = _ref.message;

        if (success) {
          _this2.props.onChannelLogin(channelName, shortChannelId, channelClaimId);
        } else {
          _this2.setState({ 'error': message });
        };
      }).catch(function (error) {
        if (error.message) {
          _this2.setState({ 'error': error.message });
        } else {
          _this2.setState({ 'error': error });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { id: 'channel-login-form' },
        _react2.default.createElement(
          'div',
          { className: 'row row--wide row--short' },
          _react2.default.createElement(
            'div',
            { className: 'column column--3 column--sml-10' },
            _react2.default.createElement(
              'label',
              { className: 'label', htmlFor: 'channel-login-name-input' },
              'Name:'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'column column--6 column--sml-10' },
            _react2.default.createElement(
              'div',
              { className: 'input-text--primary flex-container--row flex-container--left-bottom' },
              _react2.default.createElement(
                'span',
                null,
                '@'
              ),
              _react2.default.createElement('input', { type: 'text', id: 'channel-login-name-input', className: 'input-text', name: 'name', placeholder: 'Your Channel Name', value: this.state.channelName, onChange: this.handleInput })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row row--wide row--short' },
          _react2.default.createElement(
            'div',
            { className: 'column column--3 column--sml-10' },
            _react2.default.createElement(
              'label',
              { className: 'label', htmlFor: 'channel-login-password-input' },
              'Password:'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'column column--6 column--sml-10' },
            _react2.default.createElement(
              'div',
              { className: 'input-text--primary' },
              _react2.default.createElement('input', { type: 'password', id: 'channel-login-password-input', name: 'password', className: 'input-text', placeholder: '', value: this.state.channelPassword, onChange: this.handleInput })
            )
          )
        ),
        this.state.error ? _react2.default.createElement(
          'p',
          { className: 'info-message--failure' },
          this.state.error
        ) : _react2.default.createElement(
          'p',
          { className: 'info-message' },
          'Enter the name and password for your channel'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row row--wide' },
          _react2.default.createElement(
            'button',
            { className: 'button--primary', onClick: this.loginToChannel },
            'Authenticate'
          )
        )
      );
    }
  }]);

  return ChannelLoginForm;
}(_react2.default.Component);

exports.default = ChannelLoginForm;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _channel = __webpack_require__(22);

var _view = __webpack_require__(101);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onChannelLogin: function onChannelLogin(name, shortId, longId) {
      dispatch((0, _channel.updateLoggedInChannel)(name, shortId, longId));
      dispatch((0, _publish.updateSelectedChannel)(name));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(_view2.default);

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(46);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _request = __webpack_require__(6);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelCreateForm = function (_React$Component) {
  _inherits(ChannelCreateForm, _React$Component);

  function ChannelCreateForm(props) {
    _classCallCheck(this, ChannelCreateForm);

    var _this = _possibleConstructorReturn(this, (ChannelCreateForm.__proto__ || Object.getPrototypeOf(ChannelCreateForm)).call(this, props));

    _this.state = {
      error: null,
      channel: '',
      password: '',
      status: null
    };
    _this.handleChannelInput = _this.handleChannelInput.bind(_this);
    _this.handleInput = _this.handleInput.bind(_this);
    _this.createChannel = _this.createChannel.bind(_this);
    return _this;
  }

  _createClass(ChannelCreateForm, [{
    key: 'cleanseChannelInput',
    value: function cleanseChannelInput(input) {
      input = input.replace(/\s+/g, '-'); // replace spaces with dashes
      input = input.replace(/[^A-Za-z0-9-]/g, ''); // remove all characters that are not A-Z, a-z, 0-9, or '-'
      return input;
    }
  }, {
    key: 'handleChannelInput',
    value: function handleChannelInput(event) {
      var value = event.target.value;
      value = this.cleanseChannelInput(value);
      this.setState({ channel: value });
      if (value) {
        this.updateIsChannelAvailable(value);
      } else {
        this.setState({ error: 'Please enter a channel name' });
      }
    }
  }, {
    key: 'handleInput',
    value: function handleInput(event) {
      var name = event.target.name;
      var value = event.target.value;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'updateIsChannelAvailable',
    value: function updateIsChannelAvailable(channel) {
      var _this2 = this;

      var channelWithAtSymbol = '@' + channel;
      (0, _request2.default)('/api/channel/availability/' + channelWithAtSymbol).then(function () {
        _this2.setState({ 'error': null });
      }).catch(function (error) {
        _this2.setState({ 'error': error.message });
      });
    }
  }, {
    key: 'checkIsChannelAvailable',
    value: function checkIsChannelAvailable(channel) {
      var channelWithAtSymbol = '@' + channel;
      return (0, _request2.default)('/api/channel/availability/' + channelWithAtSymbol);
    }
  }, {
    key: 'checkIsPasswordProvided',
    value: function checkIsPasswordProvided(password) {
      return new Promise(function (resolve, reject) {
        if (!password || password.length < 1) {
          return reject(new Error('Please provide a password'));
        }
        resolve();
      });
    }
  }, {
    key: 'makePublishChannelRequest',
    value: function makePublishChannelRequest(username, password) {
      var params = {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        credentials: 'include'
      };
      return new Promise(function (resolve, reject) {
        (0, _request2.default)('/signup', params).then(function (result) {
          return resolve(result);
        }).catch(function (error) {
          reject(new Error('Unfortunately, we encountered an error while creating your channel. Please let us know in Discord! ' + error.message));
        });
      });
    }
  }, {
    key: 'createChannel',
    value: function createChannel(event) {
      var _this3 = this;

      event.preventDefault();
      this.checkIsPasswordProvided(this.state.password).then(function () {
        return _this3.checkIsChannelAvailable(_this3.state.channel);
      }).then(function () {
        _this3.setState({ status: 'We are publishing your new channel.  Sit tight...' });
        return _this3.makePublishChannelRequest(_this3.state.channel, _this3.state.password);
      }).then(function (result) {
        _this3.setState({ status: null });
        _this3.props.onChannelLogin(result.channelName, result.shortChannelId, result.channelClaimId);
      }).catch(function (error) {
        if (error.message) {
          _this3.setState({ 'error': error.message, status: null });
        } else {
          _this3.setState({ 'error': error, status: null });
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        !this.state.status ? _react2.default.createElement(
          'form',
          { id: 'publish-channel-form' },
          _react2.default.createElement(
            'div',
            { className: 'row row--wide row--short' },
            _react2.default.createElement(
              'div',
              { className: 'column column--3 column--sml-10' },
              _react2.default.createElement(
                'label',
                { className: 'label', htmlFor: 'new-channel-name' },
                'Name:'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--6 column--sml-10' },
              _react2.default.createElement(
                'div',
                { className: 'input-text--primary flex-container--row flex-container--left-bottom span--relative' },
                _react2.default.createElement(
                  'span',
                  null,
                  '@'
                ),
                _react2.default.createElement('input', { type: 'text', name: 'channel', id: 'new-channel-name', className: 'input-text', placeholder: 'exampleChannelName', value: this.state.channel, onChange: this.handleChannelInput }),
                this.state.channel && !this.state.error && _react2.default.createElement(
                  'span',
                  { id: 'input-success-channel-name', className: 'info-message--success span--absolute' },
                  '\u2713'
                ),
                this.state.error && _react2.default.createElement(
                  'span',
                  { id: 'input-success-channel-name', className: 'info-message--failure span--absolute' },
                  '\u2716'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row row--wide row--short' },
            _react2.default.createElement(
              'div',
              { className: 'column column--3 column--sml-10' },
              _react2.default.createElement(
                'label',
                { className: 'label', htmlFor: 'new-channel-password' },
                'Password:'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--6 column--sml-10' },
              _react2.default.createElement(
                'div',
                { className: 'input-text--primary' },
                _react2.default.createElement('input', { type: 'password', name: 'password', id: 'new-channel-password', className: 'input-text', placeholder: '', value: this.state.password, onChange: this.handleInput })
              )
            )
          ),
          this.state.error ? _react2.default.createElement(
            'p',
            { className: 'info-message--failure' },
            this.state.error
          ) : _react2.default.createElement(
            'p',
            { className: 'info-message' },
            'Choose a name and password for your channel'
          ),
          _react2.default.createElement(
            'div',
            { className: 'row row--wide' },
            _react2.default.createElement(
              'button',
              { className: 'button--primary', onClick: this.createChannel },
              'Create Channel'
            )
          )
        ) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { className: 'fine-print' },
            this.state.status
          ),
          _react2.default.createElement(_ProgressBar2.default, { size: 12 })
        )
      );
    }
  }]);

  return ChannelCreateForm;
}(_react2.default.Component);

exports.default = ChannelCreateForm;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveStatusBar = function ActiveStatusBar() {
  return _react2.default.createElement(
    'span',
    { className: 'progress-bar progress-bar--active' },
    '| '
  );
};

exports.default = ActiveStatusBar;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InactiveStatusBar = function InactiveStatusBar() {
  return _react2.default.createElement(
    'span',
    { className: 'progress-bar progress-bar--inactive' },
    '| '
  );
};

exports.default = InactiveStatusBar;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _show = __webpack_require__(7);

var _view = __webpack_require__(105);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;

  return {
    error: show.request.error,
    requestType: show.request.type
  };
};

var mapDispatchToProps = {
  onHandleShowPageUri: _show.onHandleShowPageUri
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = __webpack_require__(25);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _ShowAssetLite = __webpack_require__(106);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(109);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(115);

var _ShowChannel2 = _interopRequireDefault(_ShowChannel);

var _show_request_types = __webpack_require__(47);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowPage = function (_React$Component) {
  _inherits(ShowPage, _React$Component);

  function ShowPage() {
    _classCallCheck(this, ShowPage);

    return _possibleConstructorReturn(this, (ShowPage.__proto__ || Object.getPrototypeOf(ShowPage)).apply(this, arguments));
  }

  _createClass(ShowPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onHandleShowPageUri(this.props.match.params);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.match.params !== this.props.match.params) {
        this.props.onHandleShowPageUri(nextProps.match.params);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          error = _props.error,
          requestType = _props.requestType;

      if (error) {
        return _react2.default.createElement(_ErrorPage2.default, { error: error });
      }
      switch (requestType) {
        case _show_request_types.CHANNEL:
          return _react2.default.createElement(_ShowChannel2.default, null);
        case _show_request_types.ASSET_LITE:
          return _react2.default.createElement(_ShowAssetLite2.default, null);
        case _show_request_types.ASSET_DETAILS:
          return _react2.default.createElement(_ShowAssetDetails2.default, null);
        default:
          return _react2.default.createElement(
            'p',
            null,
            'loading...'
          );
      }
    }
  }]);

  return ShowPage;
}(_react2.default.Component);

;

exports.default = ShowPage;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(107);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;

  // select request info
  var requestId = show.request.id;
  // select asset info
  var asset = void 0;
  var request = show.requestList[requestId] || null;
  var assetList = show.assetList;
  if (request && assetList) {
    var assetKey = request.key; // note: just store this in the request
    asset = assetList[assetKey] || null;
  };
  // return props
  return {
    asset: asset
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(10);

var _SEO2 = _interopRequireDefault(_SEO);

var _reactRouterDom = __webpack_require__(4);

var _AssetDisplay = __webpack_require__(48);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowLite = function (_React$Component) {
  _inherits(ShowLite, _React$Component);

  function ShowLite() {
    _classCallCheck(this, ShowLite);

    return _possibleConstructorReturn(this, (ShowLite.__proto__ || Object.getPrototypeOf(ShowLite)).apply(this, arguments));
  }

  _createClass(ShowLite, [{
    key: 'render',
    value: function render() {
      var asset = this.props.asset;

      if (asset) {
        var _asset$claimData = asset.claimData,
            name = _asset$claimData.name,
            claimId = _asset$claimData.claimId;

        return _react2.default.createElement(
          'div',
          { className: 'row row--tall flex-container--column flex-container--center-center show-lite-container' },
          _react2.default.createElement(_SEO2.default, { pageTitle: name, asset: asset }),
          _react2.default.createElement(_AssetDisplay2.default, null),
          _react2.default.createElement(
            _reactRouterDom.Link,
            { id: 'asset-boilerpate', className: 'link--primary fine-print', to: '/' + claimId + '/' + name },
            'hosted via Spee.ch'
          )
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'row row--tall row--padded flex-container--column flex-container--center-center' },
        _react2.default.createElement(
          'p',
          null,
          'loading asset data...'
        )
      );
    }
  }]);

  return ShowLite;
}(_react2.default.Component);

;

exports.default = ShowLite;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(46);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _asset_display_states = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssetDisplay = function (_React$Component) {
  _inherits(AssetDisplay, _React$Component);

  function AssetDisplay() {
    _classCallCheck(this, AssetDisplay);

    return _possibleConstructorReturn(this, (AssetDisplay.__proto__ || Object.getPrototypeOf(AssetDisplay)).apply(this, arguments));
  }

  _createClass(AssetDisplay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props$asset$claimDat = this.props.asset.claimData,
          name = _props$asset$claimDat.name,
          claimId = _props$asset$claimDat.claimId;

      this.props.onFileRequest(name, claimId);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          status = _props.status,
          error = _props.error,
          _props$asset$claimDat2 = _props.asset.claimData,
          name = _props$asset$claimDat2.name,
          claimId = _props$asset$claimDat2.claimId,
          contentType = _props$asset$claimDat2.contentType,
          fileExt = _props$asset$claimDat2.fileExt,
          thumbnail = _props$asset$claimDat2.thumbnail;

      return _react2.default.createElement(
        'div',
        { id: 'asset-display-component' },
        status === _asset_display_states.LOCAL_CHECK && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            'Checking to see if Spee.ch has your asset locally...'
          )
        ),
        status === _asset_display_states.UNAVAILABLE && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            'Sit tight, we\'re searching the LBRY blockchain for your asset!'
          ),
          _react2.default.createElement(_ProgressBar2.default, { size: 12 }),
          _react2.default.createElement(
            'p',
            null,
            'Curious what magic is happening here? ',
            _react2.default.createElement(
              'a',
              { className: 'link--primary', target: 'blank', href: 'https://lbry.io/faq/what-is-lbry' },
              'Learn more.'
            )
          )
        ),
        status === _asset_display_states.ERROR && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            'Unfortunately, we couldn\'t download your asset from LBRY.  You can help us out by sharing the below error message in the ',
            _react2.default.createElement(
              'a',
              { className: 'link--primary', href: 'https://discord.gg/YjYbwhS', target: '_blank' },
              'LBRY discord'
            ),
            '.'
          ),
          _react2.default.createElement(
            'i',
            null,
            _react2.default.createElement(
              'p',
              { id: 'error-message' },
              error
            )
          )
        ),
        status === _asset_display_states.AVAILABLE && function () {
          switch (contentType) {
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
              return _react2.default.createElement('img', {
                className: 'asset',
                src: '/' + claimId + '/' + name + '.' + fileExt,
                alt: name });
            case 'image/gif':
              return _react2.default.createElement('img', {
                className: 'asset',
                src: '/' + claimId + '/' + name + '.' + fileExt,
                alt: name
              });
            case 'video/mp4':
              return _react2.default.createElement(
                'video',
                { className: 'asset video', controls: true, poster: thumbnail },
                _react2.default.createElement('source', {
                  src: '/' + claimId + '/' + name + '.' + fileExt
                }),
                _react2.default.createElement(
                  'p',
                  null,
                  'Your browser does not support the ',
                  _react2.default.createElement(
                    'code',
                    null,
                    'video'
                  ),
                  ' element.'
                )
              );
            default:
              return _react2.default.createElement(
                'p',
                null,
                'Unsupported file type'
              );
          }
        }()
      );
    }
  }]);

  return AssetDisplay;
}(_react2.default.Component);

;

exports.default = AssetDisplay;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(110);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;

  // select request info
  var requestId = show.request.id;
  // select asset info
  var asset = void 0;
  var request = show.requestList[requestId] || null;
  var assetList = show.assetList;
  if (request && assetList) {
    var assetKey = request.key; // note: just store this in the request
    asset = assetList[assetKey] || null;
  };
  // return props
  return {
    asset: asset
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(10);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ErrorPage = __webpack_require__(25);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(111);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(48);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(113);

var _AssetInfo2 = _interopRequireDefault(_AssetInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowAssetDetails = function (_React$Component) {
  _inherits(ShowAssetDetails, _React$Component);

  function ShowAssetDetails() {
    _classCallCheck(this, ShowAssetDetails);

    return _possibleConstructorReturn(this, (ShowAssetDetails.__proto__ || Object.getPrototypeOf(ShowAssetDetails)).apply(this, arguments));
  }

  _createClass(ShowAssetDetails, [{
    key: 'render',
    value: function render() {
      var asset = this.props.asset;

      if (asset) {
        var name = asset.claimData.name;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_SEO2.default, { pageTitle: name + ' - details', asset: asset }),
          _react2.default.createElement(_NavBar2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'row row--tall row--padded' },
            _react2.default.createElement(
              'div',
              { className: 'column column--10' },
              _react2.default.createElement(_AssetTitle2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--5 column--sml-10 align-content-top' },
              _react2.default.createElement(
                'div',
                { className: 'row row--padded show-details-container' },
                _react2.default.createElement(_AssetDisplay2.default, null)
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--5 column--sml-10 align-content-top' },
              _react2.default.createElement(
                'div',
                { className: 'row row--padded' },
                _react2.default.createElement(_AssetInfo2.default, null)
              )
            )
          )
        );
      };
      return _react2.default.createElement(_ErrorPage2.default, { error: 'loading asset data...' });
    }
  }]);

  return ShowAssetDetails;
}(_react2.default.Component);

;

exports.default = ShowAssetDetails;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(112);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;

  var _selectAsset = (0, _show.selectAsset)(show),
      title = _selectAsset.claimData.title;

  return {
    title: title
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetTitle = function AssetTitle(_ref) {
  var title = _ref.title;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      { className: 'text--large' },
      title
    )
  );
};

exports.default = AssetTitle;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(114);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;

  // select asset
  var asset = (0, _show.selectAsset)(show);
  //  return props
  return {
    asset: asset
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssetInfo = function (_React$Component) {
  _inherits(AssetInfo, _React$Component);

  function AssetInfo(props) {
    _classCallCheck(this, AssetInfo);

    var _this = _possibleConstructorReturn(this, (AssetInfo.__proto__ || Object.getPrototypeOf(AssetInfo)).call(this, props));

    _this.copyToClipboard = _this.copyToClipboard.bind(_this);
    return _this;
  }

  _createClass(AssetInfo, [{
    key: 'copyToClipboard',
    value: function copyToClipboard(event) {
      var elementToCopy = event.target.dataset.elementtocopy;
      var element = document.getElementById(elementToCopy);
      element.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        this.setState({ error: 'Oops, unable to copy' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$asset = this.props.asset,
          shortId = _props$asset.shortId,
          _props$asset$claimDat = _props$asset.claimData,
          channelName = _props$asset$claimDat.channelName,
          certificateId = _props$asset$claimDat.certificateId,
          description = _props$asset$claimDat.description,
          name = _props$asset$claimDat.name,
          claimId = _props$asset$claimDat.claimId,
          fileExt = _props$asset$claimDat.fileExt,
          contentType = _props$asset$claimDat.contentType,
          thumbnail = _props$asset$claimDat.thumbnail,
          host = _props$asset$claimDat.host;

      return _react2.default.createElement(
        'div',
        null,
        channelName && _react2.default.createElement(
          'div',
          { className: 'row row--padded row--wide row--no-top' },
          _react2.default.createElement(
            'div',
            { className: 'column column--2 column--med-10' },
            _react2.default.createElement(
              'span',
              { className: 'text' },
              'Channel:'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'column column--8 column--med-10' },
            _react2.default.createElement(
              'span',
              { className: 'text' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/' + channelName + ':' + certificateId },
                channelName
              )
            )
          )
        ),
        description && _react2.default.createElement(
          'div',
          { className: 'row row--padded row--wide row--no-top' },
          _react2.default.createElement(
            'span',
            { className: 'text' },
            description
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'show-share-buttons' },
          _react2.default.createElement(
            'div',
            { className: 'row row--padded row--wide row--no-top' },
            _react2.default.createElement(
              'div',
              { className: 'column column--2 column--med-10' },
              _react2.default.createElement(
                'span',
                { className: 'text' },
                'Share:'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--8 column--med-10' },
              _react2.default.createElement(
                'div',
                {
                  className: 'row row--short row--wide flex-container--row flex-container--space-between-bottom flex-container--wrap' },
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'https://twitter.com/intent/tweet?text=' + host + '/' + shortId + '/' + name },
                  'twitter'
                ),
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'https://www.facebook.com/sharer/sharer.php?u=' + host + '/' + shortId + '/' + name },
                  'facebook'
                ),
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'http://tumblr.com/widgets/share/tool?canonicalUrl=' + host + '/' + shortId + '/' + name },
                  'tumblr'
                ),
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'https://www.reddit.com/submit?url=' + host + '/' + shortId + '/' + name + '&title=' + name },
                  'reddit'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row row--padded row--wide row--no-top' },
          _react2.default.createElement(
            'div',
            { id: 'show-short-link' },
            _react2.default.createElement(
              'div',
              { className: 'column column--2 column--med-10' },
              _react2.default.createElement(
                'span',
                { className: 'text' },
                'Link:'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--8 column--med-10' },
              _react2.default.createElement(
                'div',
                { className: 'row row--short row--wide' },
                _react2.default.createElement(
                  'div',
                  { className: 'column column--7' },
                  _react2.default.createElement(
                    'div',
                    { className: 'input-error', id: 'input-error-copy-short-link', hidden: 'true' },
                    'error here'
                  ),
                  _react2.default.createElement('input', { type: 'text', id: 'short-link', className: 'input-disabled input-text--full-width', readOnly: true,
                    spellCheck: 'false',
                    value: host + '/' + shortId + '/' + name + '.' + fileExt,
                    onClick: this.select })
                ),
                _react2.default.createElement('div', { className: 'column column--1' }),
                _react2.default.createElement(
                  'div',
                  { className: 'column column--2' },
                  _react2.default.createElement(
                    'button',
                    { className: 'button--primary button--wide', 'data-elementtocopy': 'short-link',
                      onClick: this.copyToClipboard },
                    'copy'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { id: 'show-embed-code' },
            _react2.default.createElement(
              'div',
              { className: 'column column--2 column--med-10' },
              _react2.default.createElement(
                'span',
                { className: 'text' },
                'Embed:'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--8 column--med-10' },
              _react2.default.createElement(
                'div',
                { className: 'row row--short row--wide' },
                _react2.default.createElement(
                  'div',
                  { className: 'column column--7' },
                  _react2.default.createElement(
                    'div',
                    { className: 'input-error', id: 'input-error-copy-embed-text', hidden: 'true' },
                    'error here'
                  ),
                  contentType === 'video/mp4' ? _react2.default.createElement('input', { type: 'text', id: 'embed-text', className: 'input-disabled input-text--full-width', readOnly: true,
                    onClick: this.select, spellCheck: 'false',
                    value: '<video width="100%" controls poster="' + thumbnail + '" src="' + host + '/' + claimId + '/' + name + '.' + fileExt + '"/></video>' }) : _react2.default.createElement('input', { type: 'text', id: 'embed-text', className: 'input-disabled input-text--full-width', readOnly: true,
                    onClick: this.select, spellCheck: 'false',
                    value: '<img src="' + host + '/' + claimId + '/' + name + '.' + fileExt + '"/>'
                  })
                ),
                _react2.default.createElement('div', { className: 'column column--1' }),
                _react2.default.createElement(
                  'div',
                  { className: 'column column--2' },
                  _react2.default.createElement(
                    'button',
                    { className: 'button--primary button--wide', 'data-elementtocopy': 'embed-text',
                      onClick: this.copyToClipboard },
                    'copy'
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'flex-container--row flex-container--space-between-bottom' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { className: 'link--primary', to: '/' + shortId + '/' + name + '.' + fileExt },
            _react2.default.createElement(
              'span',
              {
                className: 'text' },
              'Direct Link'
            )
          ),
          _react2.default.createElement(
            'a',
            { className: 'link--primary', href: host + '/' + claimId + '/' + name + '.' + fileExt, download: name },
            'Download'
          ),
          _react2.default.createElement(
            'a',
            { className: 'link--primary', target: '_blank', href: 'https://lbry.io/dmca' },
            'Report'
          )
        )
      );
    }
  }]);

  return AssetInfo;
}(_react2.default.Component);

;

exports.default = AssetInfo;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(116);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;

  // select request info
  var requestId = show.request.id;
  // select request
  var previousRequest = show.requestList[requestId] || null;
  // select channel
  var channel = void 0;
  if (previousRequest) {
    var channelKey = previousRequest.key;
    channel = show.channelList[channelKey] || null;
  }
  return {
    channel: channel
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(10);

var _SEO2 = _interopRequireDefault(_SEO);

var _ErrorPage = __webpack_require__(25);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelClaimsDisplay = __webpack_require__(117);

var _ChannelClaimsDisplay2 = _interopRequireDefault(_ChannelClaimsDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowChannel = function (_React$Component) {
  _inherits(ShowChannel, _React$Component);

  function ShowChannel() {
    _classCallCheck(this, ShowChannel);

    return _possibleConstructorReturn(this, (ShowChannel.__proto__ || Object.getPrototypeOf(ShowChannel)).apply(this, arguments));
  }

  _createClass(ShowChannel, [{
    key: 'render',
    value: function render() {
      var channel = this.props.channel;

      if (channel) {
        var name = channel.name,
            longId = channel.longId,
            shortId = channel.shortId;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_SEO2.default, { pageTitle: name, channel: channel }),
          _react2.default.createElement(_NavBar2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'row row--tall row--padded' },
            _react2.default.createElement(
              'div',
              { className: 'column column--10' },
              _react2.default.createElement(
                'h2',
                null,
                'channel name: ',
                name
              ),
              _react2.default.createElement(
                'p',
                { className: 'fine-print' },
                'full channel id: ',
                longId
              ),
              _react2.default.createElement(
                'p',
                { className: 'fine-print' },
                'short channel id: ',
                shortId
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--10' },
              _react2.default.createElement(_ChannelClaimsDisplay2.default, null)
            )
          )
        );
      };
      return _react2.default.createElement(_ErrorPage2.default, { error: 'loading channel data...' });
    }
  }]);

  return ShowChannel;
}(_react2.default.Component);

;

exports.default = ShowChannel;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _show = __webpack_require__(7);

var _view = __webpack_require__(118);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var show = _ref.show;

  // select channel key
  var request = show.requestList[show.request.id];
  var channelKey = request.key;
  // select channel claims
  var channel = show.channelList[channelKey] || null;
  // return props
  return {
    channelKey: channelKey,
    channel: channel
  };
};

var mapDispatchToProps = {
  onUpdateChannelClaims: _show.onUpdateChannelClaims
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(119);

var _AssetPreview2 = _interopRequireDefault(_AssetPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelClaimsDisplay = function (_React$Component) {
  _inherits(ChannelClaimsDisplay, _React$Component);

  function ChannelClaimsDisplay(props) {
    _classCallCheck(this, ChannelClaimsDisplay);

    var _this = _possibleConstructorReturn(this, (ChannelClaimsDisplay.__proto__ || Object.getPrototypeOf(ChannelClaimsDisplay)).call(this, props));

    _this.showNextResultsPage = _this.showNextResultsPage.bind(_this);
    _this.showPreviousResultsPage = _this.showPreviousResultsPage.bind(_this);
    return _this;
  }

  _createClass(ChannelClaimsDisplay, [{
    key: 'showPreviousResultsPage',
    value: function showPreviousResultsPage() {
      var currentPage = this.props.channel.claimsData.currentPage;

      var previousPage = parseInt(currentPage) - 1;
      this.showNewPage(previousPage);
    }
  }, {
    key: 'showNextResultsPage',
    value: function showNextResultsPage() {
      var currentPage = this.props.channel.claimsData.currentPage;

      var nextPage = parseInt(currentPage) + 1;
      this.showNewPage(nextPage);
    }
  }, {
    key: 'showNewPage',
    value: function showNewPage(page) {
      var _props = this.props,
          channelKey = _props.channelKey,
          _props$channel = _props.channel,
          name = _props$channel.name,
          longId = _props$channel.longId;

      this.props.onUpdateChannelClaims(channelKey, name, longId, page);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$channel$claims = this.props.channel.claimsData,
          claims = _props$channel$claims.claims,
          currentPage = _props$channel$claims.currentPage,
          totalPages = _props$channel$claims.totalPages;

      return _react2.default.createElement(
        'div',
        { className: 'row row--tall' },
        claims.length > 0 ? _react2.default.createElement(
          'div',
          null,
          claims.map(function (claim, index) {
            return _react2.default.createElement(_AssetPreview2.default, {
              claimData: claim,
              key: claim.name + '-' + index
            });
          }),
          _react2.default.createElement(
            'div',
            null,
            currentPage > 1 && _react2.default.createElement(
              'button',
              { className: 'button--secondary', onClick: this.showPreviousResultsPage },
              'Previous Page'
            ),
            currentPage < totalPages && _react2.default.createElement(
              'button',
              { className: 'button--secondary', onClick: this.showNextResultsPage },
              'Next Page'
            )
          )
        ) : _react2.default.createElement(
          'p',
          null,
          'There are no claims in this channel'
        )
      );
    }
  }]);

  return ChannelClaimsDisplay;
}(_react2.default.Component);

;

exports.default = ChannelClaimsDisplay;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(120);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var defaultThumbnail = _ref.site.defaults.defaultThumbnail;

  return {
    defaultThumbnail: defaultThumbnail
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetPreview = function AssetPreview(_ref) {
  var defaultThumbnail = _ref.defaultThumbnail,
      _ref$claimData = _ref.claimData,
      name = _ref$claimData.name,
      claimId = _ref$claimData.claimId,
      fileExt = _ref$claimData.fileExt,
      contentType = _ref$claimData.contentType,
      thumbnail = _ref$claimData.thumbnail;

  var directSourceLink = claimId + '/' + name + '.' + fileExt;
  var showUrlLink = '/' + claimId + '/' + name;
  return _react2.default.createElement(
    'div',
    { className: 'asset-holder' },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: showUrlLink },
      function () {
        switch (contentType) {
          case 'image/jpeg':
          case 'image/jpg':
          case 'image/png':
          case 'image/gif':
            return _react2.default.createElement('img', {
              className: 'asset-preview',
              src: directSourceLink,
              alt: name
            });
          case 'video/mp4':
            return _react2.default.createElement('img', {
              className: 'asset-preview video',
              src: thumbnail || defaultThumbnail,
              alt: name
            });
          default:
            return _react2.default.createElement(
              'p',
              null,
              'unsupported file type'
            );
        }
      }()
    )
  );
};

exports.default = AssetPreview;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(122);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var _ref$site = _ref.site,
      host = _ref$site.host,
      title = _ref$site.title;

  return {
    host: host,
    title: title
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _reactHelmet = __webpack_require__(12);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FourOhForPage = function (_React$Component) {
  _inherits(FourOhForPage, _React$Component);

  function FourOhForPage() {
    _classCallCheck(this, FourOhForPage);

    return _possibleConstructorReturn(this, (FourOhForPage.__proto__ || Object.getPrototypeOf(FourOhForPage)).apply(this, arguments));
  }

  _createClass(FourOhForPage, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          host = _props.host;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            title,
            ' - 404'
          ),
          _react2.default.createElement('link', { rel: 'canonical', href: host + '/404' })
        ),
        _react2.default.createElement(_NavBar2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'row row--padded' },
          _react2.default.createElement(
            'h2',
            null,
            '404'
          ),
          _react2.default.createElement(
            'p',
            null,
            'That page does not exist'
          )
        )
      );
    }
  }]);

  return FourOhForPage;
}(_react2.default.Component);

;

exports.default = FourOhForPage;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(15),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(124),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(125);
var handleShowRender = __webpack_require__(126);
var SERVE = 'SERVE';

module.exports = function (app) {
  // route to serve a specific asset using the channel or claim id
  app.get('/:identifier/:claim', function (req, res) {
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
  });
  // route to serve the winning asset at a claim or a channel page
  app.get('/:claim', function (req, res) {
    var headers = req.headers,
        ip = req.ip,
        originalUrl = req.originalUrl,
        params = req.params;
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
      return handleShowRender(req, res);
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(34),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(33),
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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(1);

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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(36);

var _redux = __webpack_require__(16);

var _index = __webpack_require__(37);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _index3 = __webpack_require__(41);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(42);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(49);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(127);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(13);

var _show_uri = __webpack_require__(128);

var _show = __webpack_require__(7);

var _reactHelmet = __webpack_require__(12);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var store = (0, _redux.createStore)(_index2.default, middleware);

  // create saga
  var action = (0, _show.onHandleShowPageUri)(req.params);
  var saga = returnSagaWithParams(_show_uri.handleShowPageUri, action);

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
          _index4.default,
          null,
          _react2.default.createElement(_app2.default, null)
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
};

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = __webpack_require__(13);

var _show_action_types = __webpack_require__(9);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(7);

var _show_asset = __webpack_require__(129);

var _show_channel = __webpack_require__(131);

var _lbryUri = __webpack_require__(19);

var _lbryUri2 = _interopRequireDefault(_lbryUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(parseAndUpdateIdentifierAndClaim),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(parseAndUpdateClaimOnly),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(handleShowPageUri),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(watchHandleShowPageUri);

function parseAndUpdateIdentifierAndClaim(modifier, claim) {
  var isChannel, channelName, channelClaimId, claimId, claimName, extension, _lbryUri$parseIdentif, _lbryUri$parseClaim;

  return regeneratorRuntime.wrap(function parseAndUpdateIdentifierAndClaim$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // this is a request for an asset
          // claim will be an asset claim
          // the identifier could be a channel or a claim id
          isChannel = void 0, channelName = void 0, channelClaimId = void 0, claimId = void 0, claimName = void 0, extension = void 0;
          _context.prev = 1;
          _lbryUri$parseIdentif = _lbryUri2.default.parseIdentifier(modifier);
          isChannel = _lbryUri$parseIdentif.isChannel;
          channelName = _lbryUri$parseIdentif.channelName;
          channelClaimId = _lbryUri$parseIdentif.channelClaimId;
          claimId = _lbryUri$parseIdentif.claimId;
          _lbryUri$parseClaim = _lbryUri2.default.parseClaim(claim);
          claimName = _lbryUri$parseClaim.claimName;
          extension = _lbryUri$parseClaim.extension;
          _context.next = 17;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context['catch'](1);
          _context.next = 16;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t0.message));

        case 16:
          return _context.abrupt('return', _context.sent);

        case 17:
          if (!isChannel) {
            _context.next = 21;
            break;
          }

          _context.next = 20;
          return (0, _effects.call)(_show_asset.newAssetRequest, (0, _show.onNewAssetRequest)(claimName, null, channelName, channelClaimId, extension));

        case 20:
          return _context.abrupt('return', _context.sent);

        case 21:
          ;
          _context.next = 24;
          return (0, _effects.call)(_show_asset.newAssetRequest, (0, _show.onNewAssetRequest)(claimName, claimId, null, null, extension));

        case 24:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[1, 12]]);
}
function parseAndUpdateClaimOnly(claim) {
  var isChannel, channelName, channelClaimId, _lbryUri$parseIdentif2, claimName, extension, _lbryUri$parseClaim2;

  return regeneratorRuntime.wrap(function parseAndUpdateClaimOnly$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // this could be a request for an asset or a channel page
          // claim could be an asset claim or a channel claim
          isChannel = void 0, channelName = void 0, channelClaimId = void 0;
          _context2.prev = 1;
          _lbryUri$parseIdentif2 = _lbryUri2.default.parseIdentifier(claim);
          isChannel = _lbryUri$parseIdentif2.isChannel;
          channelName = _lbryUri$parseIdentif2.channelName;
          channelClaimId = _lbryUri$parseIdentif2.channelClaimId;
          _context2.next = 13;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](1);
          _context2.next = 12;
          return (0, _effects.put)((0, _show.onRequestError)(_context2.t0.message));

        case 12:
          return _context2.abrupt('return', _context2.sent);

        case 13:
          if (!isChannel) {
            _context2.next = 17;
            break;
          }

          _context2.next = 16;
          return (0, _effects.call)(_show_channel.newChannelRequest, (0, _show.onNewChannelRequest)(channelName, channelClaimId));

        case 16:
          return _context2.abrupt('return', _context2.sent);

        case 17:
          // if not for a channel, parse the claim request
          claimName = void 0, extension = void 0;
          _context2.prev = 18;
          _lbryUri$parseClaim2 = _lbryUri2.default.parseClaim(claim);
          claimName = _lbryUri$parseClaim2.claimName;
          extension = _lbryUri$parseClaim2.extension;
          _context2.next = 29;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t1 = _context2['catch'](18);
          _context2.next = 28;
          return (0, _effects.put)((0, _show.onRequestError)(_context2.t1.message));

        case 28:
          return _context2.abrupt('return', _context2.sent);

        case 29:
          _context2.next = 31;
          return (0, _effects.call)(_show_asset.newAssetRequest, (0, _show.onNewAssetRequest)(claimName, null, null, null, extension));

        case 31:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[1, 8], [18, 24]]);
}

function handleShowPageUri(action) {
  var _action$data, identifier, claim;

  return regeneratorRuntime.wrap(function handleShowPageUri$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _action$data = action.data, identifier = _action$data.identifier, claim = _action$data.claim;

          if (!identifier) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return (0, _effects.call)(parseAndUpdateIdentifierAndClaim, identifier, claim);

        case 4:
          return _context3.abrupt('return', _context3.sent);

        case 5:
          _context3.next = 7;
          return (0, _effects.call)(parseAndUpdateClaimOnly, claim);

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
};

function watchHandleShowPageUri() {
  return regeneratorRuntime.wrap(function watchHandleShowPageUri$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeLatest)(actions.HANDLE_SHOW_URI, handleShowPageUri);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = __webpack_require__(13);

var _show_action_types = __webpack_require__(9);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(7);

var _assetApi = __webpack_require__(130);

var _show2 = __webpack_require__(11);

var _site = __webpack_require__(50);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(newAssetRequest),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchNewAssetRequest);

function newAssetRequest(action) {
  var _action$data, requestType, requestId, name, modifier, state, host, longId, _ref, assetKey, shortId, _ref2, claimData, _ref3;

  return regeneratorRuntime.wrap(function newAssetRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _action$data = action.data, requestType = _action$data.requestType, requestId = _action$data.requestId, name = _action$data.name, modifier = _action$data.modifier;
          // put an action to update the request in redux

          _context.next = 3;
          return (0, _effects.put)((0, _show.onRequestUpdate)(requestType, requestId));

        case 3:
          _context.next = 5;
          return (0, _effects.select)(_show2.selectShowState);

        case 5:
          state = _context.sent;
          _context.next = 8;
          return (0, _effects.select)(_site.selectSiteHost);

        case 8:
          host = _context.sent;

          if (!state.requestList[requestId]) {
            _context.next = 11;
            break;
          }

          return _context.abrupt('return', null);

        case 11:
          // get long id && add request to request list
          longId = void 0;
          _context.prev = 12;
          _context.next = 15;
          return (0, _effects.call)(_assetApi.getLongClaimId, host, name, modifier);

        case 15:
          _ref = _context.sent;
          longId = _ref.data;
          _context.next = 24;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context['catch'](12);
          _context.next = 23;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t0.message));

        case 23:
          return _context.abrupt('return', _context.sent);

        case 24:
          assetKey = 'a#' + name + '#' + longId;
          _context.next = 27;
          return (0, _effects.put)((0, _show.addRequestToRequestList)(requestId, null, assetKey));

        case 27:
          if (!state.assetList[assetKey]) {
            _context.next = 29;
            break;
          }

          return _context.abrupt('return', null);

        case 29:
          // get short Id
          shortId = void 0;
          _context.prev = 30;
          _context.next = 33;
          return (0, _effects.call)(_assetApi.getShortId, host, name, longId);

        case 33:
          _ref2 = _context.sent;
          shortId = _ref2.data;
          _context.next = 42;
          break;

        case 37:
          _context.prev = 37;
          _context.t1 = _context['catch'](30);
          _context.next = 41;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t1.message));

        case 41:
          return _context.abrupt('return', _context.sent);

        case 42:
          // get asset claim data
          claimData = void 0;
          _context.prev = 43;
          _context.next = 46;
          return (0, _effects.call)(_assetApi.getClaimData, host, name, longId);

        case 46:
          _ref3 = _context.sent;
          claimData = _ref3.data;
          _context.next = 55;
          break;

        case 50:
          _context.prev = 50;
          _context.t2 = _context['catch'](43);
          _context.next = 54;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t2.message));

        case 54:
          return _context.abrupt('return', _context.sent);

        case 55:
          _context.next = 57;
          return (0, _effects.put)((0, _show.addAssetToAssetList)(assetKey, null, name, longId, shortId, claimData));

        case 57:
          _context.next = 59;
          return (0, _effects.put)((0, _show.onRequestError)(null));

        case 59:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[12, 19], [30, 37], [43, 50]]);
};

function watchNewAssetRequest() {
  return regeneratorRuntime.wrap(function watchNewAssetRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(actions.ASSET_REQUEST_NEW, newAssetRequest);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongClaimId = getLongClaimId;
exports.getShortId = getShortId;
exports.getClaimData = getClaimData;

var _request = __webpack_require__(6);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLongClaimId(host, name, modifier) {
  var body = {};
  // create request params
  if (modifier) {
    if (modifier.id) {
      body['claimId'] = modifier.id;
    } else {
      body['channelName'] = modifier.channel.name;
      body['channelClaimId'] = modifier.channel.id;
    }
  }
  body['claimName'] = name;
  var params = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  // create url
  var url = host + '/api/claim/long-id';
  // return the request promise
  return (0, _request2.default)(url, params);
};

function getShortId(host, name, claimId) {
  var url = host + '/api/claim/short-id/' + claimId + '/' + name;
  return (0, _request2.default)(url);
};

function getClaimData(host, name, claimId) {
  var url = host + '/api/claim/data/' + name + '/' + claimId;
  return (0, _request2.default)(url);
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = __webpack_require__(13);

var _show_action_types = __webpack_require__(9);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(7);

var _channelApi = __webpack_require__(132);

var _show2 = __webpack_require__(11);

var _site = __webpack_require__(50);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(newChannelRequest),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchNewChannelRequest),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(getNewClaimsAndUpdateChannel),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(watchUpdateChannelClaims);

function newChannelRequest(action) {
  var _action$data, requestType, requestId, channelName, channelId, state, host, longId, shortId, _ref, _ref$data, channelKey, claimsData, _ref2;

  return regeneratorRuntime.wrap(function newChannelRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _action$data = action.data, requestType = _action$data.requestType, requestId = _action$data.requestId, channelName = _action$data.channelName, channelId = _action$data.channelId;
          // put an action to update the request in redux

          _context.next = 3;
          return (0, _effects.put)((0, _show.onRequestUpdate)(requestType, requestId));

        case 3:
          _context.next = 5;
          return (0, _effects.select)(_show2.selectShowState);

        case 5:
          state = _context.sent;
          _context.next = 8;
          return (0, _effects.select)(_site.selectSiteHost);

        case 8:
          host = _context.sent;

          if (!state.requestList[requestId]) {
            _context.next = 11;
            break;
          }

          return _context.abrupt('return', null);

        case 11:
          // get channel long id
          longId = void 0, shortId = void 0;
          _context.prev = 12;
          _context.next = 15;
          return (0, _effects.call)(_channelApi.getChannelData, host, channelName, channelId);

        case 15:
          _ref = _context.sent;
          _ref$data = _ref.data;
          longId = _ref$data.longChannelClaimId;
          shortId = _ref$data.shortChannelClaimId;
          _context.next = 26;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context['catch'](12);
          _context.next = 25;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t0.message));

        case 25:
          return _context.abrupt('return', _context.sent);

        case 26:
          // store the request in the channel requests list
          channelKey = 'c#' + channelName + '#' + longId;
          _context.next = 29;
          return (0, _effects.put)((0, _show.addRequestToRequestList)(requestId, null, channelKey));

        case 29:
          if (!state.channelList[channelKey]) {
            _context.next = 31;
            break;
          }

          return _context.abrupt('return', null);

        case 31:
          // get channel claims data
          claimsData = void 0;
          _context.prev = 32;
          _context.next = 35;
          return (0, _effects.call)(_channelApi.getChannelClaims, host, longId, channelName, 1);

        case 35:
          _ref2 = _context.sent;
          claimsData = _ref2.data;
          _context.next = 44;
          break;

        case 39:
          _context.prev = 39;
          _context.t1 = _context['catch'](32);
          _context.next = 43;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t1.message));

        case 43:
          return _context.abrupt('return', _context.sent);

        case 44:
          _context.next = 46;
          return (0, _effects.put)((0, _show.addNewChannelToChannelList)(channelKey, channelName, shortId, longId, claimsData));

        case 46:
          _context.next = 48;
          return (0, _effects.put)((0, _show.onRequestError)(null));

        case 48:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[12, 21], [32, 39]]);
}

function watchNewChannelRequest() {
  return regeneratorRuntime.wrap(function watchNewChannelRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(actions.CHANNEL_REQUEST_NEW, newChannelRequest);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
};

function getNewClaimsAndUpdateChannel(action) {
  var _action$data2, channelKey, name, longId, page, host, claimsData, _ref3;

  return regeneratorRuntime.wrap(function getNewClaimsAndUpdateChannel$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _action$data2 = action.data, channelKey = _action$data2.channelKey, name = _action$data2.name, longId = _action$data2.longId, page = _action$data2.page;
          _context3.next = 3;
          return (0, _effects.select)(_site.selectSiteHost);

        case 3:
          host = _context3.sent;
          claimsData = void 0;
          _context3.prev = 5;
          _context3.next = 8;
          return (0, _effects.call)(_channelApi.getChannelClaims, host, longId, name, page);

        case 8:
          _ref3 = _context3.sent;
          claimsData = _ref3.data;
          _context3.next = 17;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3['catch'](5);
          _context3.next = 16;
          return (0, _effects.put)((0, _show.onRequestError)(_context3.t0.message));

        case 16:
          return _context3.abrupt('return', _context3.sent);

        case 17:
          _context3.next = 19;
          return (0, _effects.put)((0, _show.updateChannelClaims)(channelKey, claimsData));

        case 19:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this, [[5, 12]]);
}

function watchUpdateChannelClaims() {
  return regeneratorRuntime.wrap(function watchUpdateChannelClaims$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeLatest)(actions.CHANNEL_CLAIMS_UPDATE_ASYNC, getNewClaimsAndUpdateChannel);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelData = getChannelData;
exports.getChannelClaims = getChannelClaims;

var _request = __webpack_require__(6);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChannelData(host, id, name) {
  if (!id) id = 'none';
  var url = host + '/api/channel/data/' + name + '/' + id;
  return (0, _request2.default)(url);
};

function getChannelClaims(host, longId, name, page) {
  if (!page) page = 1;
  var url = host + '/api/channel/claims/' + name + '/' + longId + '/' + page;
  return (0, _request2.default)(url);
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(35);

module.exports = function (app) {
  // a catch-all route if someone visits a page that does not exist
  app.use('*', function (req, res) {
    // send response
    handlePageRender(req, res);
  });
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(135),
    logLevel = _require.logLevel;

module.exports = function (winston) {
  // configure
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
  // test all the log levels
  winston.error('Level 0');
  winston.warn('Level 1');
  winston.info('Level 2');
  winston.verbose('Level 3');
  winston.debug('Level 4');
  winston.silly('Level 5');
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loggerConfig = {
  logLevel: 'debug' // options: silly, debug, verbose, info
};

module.exports = loggerConfig;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(137).SlackWebHook;
var slackConfig = __webpack_require__(28);

module.exports = function (winston) {
  var slackWebHook = slackConfig.slackWebHook,
      slackErrorChannel = slackConfig.slackErrorChannel,
      slackInfoChannel = slackConfig.slackInfoChannel;

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
/* 137 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDJlMzg2YjNiNTI5MTcyMGQ5NTIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZHluYW1pY0ltcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvbWV0YVRhZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3BhZ2VUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9FcnJvclBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xicnlDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9maWxlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGktcm91dGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZS1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1nYVwiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscyBeLiokIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2stcm91dGVzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiIl0sIm5hbWVzIjpbIlNpdGVDb25maWciLCJhbmFseXRpY3MiLCJnb29nbGVJZCIsImFzc2V0RGVmYXVsdHMiLCJkZXNjcmlwdGlvbiIsInRodW1ibmFpbCIsInRpdGxlIiwiYXV0aCIsInNlc3Npb25LZXkiLCJjdXN0b21Db21wb25lbnRzIiwiY29tcG9uZW50cyIsImNvbnRhaW5lcnMiLCJwYWdlcyIsImRldGFpbHMiLCJob3N0IiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsImNvbmZpZ3VyZSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwiU2VxdWVsaXplIiwicmVxdWlyZSIsImxvZ2dlciIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImRiIiwic2VxdWVsaXplIiwiZGlhbGVjdCIsImRpYWxlY3RPcHRpb25zIiwiZGVjaW1hbE51bWJlcnMiLCJsb2dnaW5nIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJhY3F1aXJlIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImluZm8iLCJjYXRjaCIsImVycm9yIiwiZXJyIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJpbXBvcnQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwiZGVidWciLCJ1cGRhdGUiLCJjcmVhdGUiLCJyZXF1ZXN0IiwicGFyc2VKU09OIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJqc29uIiwiY2hlY2tTdGF0dXMiLCJqc29uUmVzcG9uc2UiLCJFcnJvciIsIm1lc3NhZ2UiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJQcm9taXNlIiwiYWxsIiwib25IYW5kbGVTaG93UGFnZVVyaSIsIm9uUmVxdWVzdEVycm9yIiwib25OZXdDaGFubmVsUmVxdWVzdCIsIm9uTmV3QXNzZXRSZXF1ZXN0Iiwib25SZXF1ZXN0VXBkYXRlIiwiYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QiLCJhZGRBc3NldFRvQXNzZXRMaXN0IiwiYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QiLCJvblVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJ1cGRhdGVDaGFubmVsQ2xhaW1zIiwiZmlsZVJlcXVlc3RlZCIsInVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkiLCJ1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciIsImFjdGlvbnMiLCJwYXJhbXMiLCJ0eXBlIiwiSEFORExFX1NIT1dfVVJJIiwiZGF0YSIsIlJFUVVFU1RfRVJST1IiLCJjaGFubmVsTmFtZSIsImNoYW5uZWxJZCIsInJlcXVlc3RUeXBlIiwicmVxdWVzdElkIiwiQ0hBTk5FTF9SRVFVRVNUX05FVyIsIm5hbWUiLCJpZCIsImV4dGVuc2lvbiIsIkFTU0VUX1JFUVVFU1RfTkVXIiwibW9kaWZpZXIiLCJjaGFubmVsIiwiUkVRVUVTVF9VUERBVEUiLCJrZXkiLCJSRVFVRVNUX0xJU1RfQUREIiwiY2xhaW1JZCIsInNob3J0SWQiLCJjbGFpbURhdGEiLCJBU1NFVF9BREQiLCJsb25nSWQiLCJjbGFpbXNEYXRhIiwiQ0hBTk5FTF9BREQiLCJjaGFubmVsS2V5IiwicGFnZSIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyIsImNoYW5uZWxMaXN0SWQiLCJDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyIsIkZJTEVfUkVRVUVTVEVEIiwiRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFIiwiRElTUExBWV9BU1NFVF9FUlJPUiIsIm1hcFN0YXRlVG9Qcm9wcyIsInNpdGUiLCJsb2dnZWRJbkNoYW5uZWwiLCJjaGFubmVsU2hvcnRJZCIsImNoYW5uZWxMb25nSWQiLCJzaXRlRGVzY3JpcHRpb24iLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJvbkNoYW5uZWxMb2dpbiIsImRpc3BhdGNoIiwib25DaGFubmVsTG9nb3V0IiwiZGVmYXVsdERlc2NyaXB0aW9uIiwiZGVmYXVsdFRodW1ibmFpbCIsInNpdGVIb3N0Iiwic2l0ZVRpdGxlIiwic2l0ZVR3aXR0ZXIiLCJzZWxlY3RBc3NldCIsInNob3ciLCJyZXF1ZXN0TGlzdCIsImFzc2V0S2V5IiwiYXNzZXRMaXN0Iiwic2VsZWN0U2hvd1N0YXRlIiwic3RhdGUiLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsInNlbmRHQVRpbWluZ0V2ZW50IiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJjaGFubmVsX25hbWUiLCJhbW91bnQiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiaXAiLCJvcmlnaW5hbFVybCIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsImNoYW5uZWxfaWQiLCJjb21wb25lbnRzQ29uZmlnIiwiZ2V0RGVlcGVzdENoaWxkVmFsdWUiLCJwYXJlbnQiLCJjaGlsZHJlbktleXMiLCJjaGlsZEtleSIsInNoaWZ0IiwiY2hpbGQiLCJsZW5ndGgiLCJkeW5hbWljSW1wb3J0IiwiZmlsZVBhdGgiLCJ0eXBlb2YiLCJmb2xkZXJzIiwic3BsaXQiLCJmaWx0ZXIiLCJmb2xkZXJOYW1lIiwiY3VzdG9tQ29tcG9uZW50IiwiY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rIiwiY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rIiwiYXNzZXQiLCJjZXJ0aWZpY2F0ZUlkIiwiY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsiLCJjcmVhdGVDYW5vbmljYWxMaW5rIiwiUkVHRVhQX0lOVkFMSURfQ0xBSU0iLCJSRUdFWFBfSU5WQUxJRF9DSEFOTkVMIiwiUkVHRVhQX0FERFJFU1MiLCJDSEFOTkVMX0NIQVIiLCJwYXJzZUlkZW50aWZpZXIiLCJpZGVudGlmaWVyIiwiY29tcG9uZW50c1JlZ2V4IiwiUmVnRXhwIiwiZXhlYyIsIm1hcCIsIm1hdGNoIiwicHJvdG8iLCJ2YWx1ZSIsIm1vZGlmaWVyU2VwZXJhdG9yIiwiaXNDaGFubmVsIiwic3RhcnRzV2l0aCIsIm5hbWVCYWRDaGFycyIsImpvaW4iLCJjaGFubmVsQ2xhaW1JZCIsInBhcnNlQ2xhaW0iLCJleHRlbnNpb25TZXBlcmF0b3IiLCJkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwiZmlsZUV4dCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwiY3JlYXRlQmFzaWNNZXRhVGFncyIsInByb3BlcnR5IiwiY29udGVudCIsImNyZWF0ZUNoYW5uZWxNZXRhVGFncyIsImNyZWF0ZUFzc2V0TWV0YVRhZ3MiLCJjb250ZW50VHlwZSIsImVtYmVkVXJsIiwic2hvd1VybCIsInNvdXJjZSIsIm9nVGl0bGUiLCJvZ0Rlc2NyaXB0aW9uIiwib2dUaHVtYm5haWxDb250ZW50VHlwZSIsIm9nVGh1bWJuYWlsIiwibWV0YVRhZ3MiLCJwdXNoIiwiY3JlYXRlTWV0YVRhZ3MiLCJjcmVhdGVQYWdlVGl0bGUiLCJwYWdlVGl0bGUiLCJ1cGRhdGVMb2dnZWRJbkNoYW5uZWwiLCJDSEFOTkVMX1VQREFURSIsInNlbGVjdEZpbGUiLCJjbGVhckZpbGUiLCJ1cGRhdGVNZXRhZGF0YSIsInVwZGF0ZUNsYWltIiwic2V0UHVibGlzaEluQ2hhbm5lbCIsInVwZGF0ZVB1Ymxpc2hTdGF0dXMiLCJ1cGRhdGVFcnJvciIsInVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCIsInRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwib25OZXdUaHVtYm5haWwiLCJzdGFydFB1Ymxpc2giLCJmaWxlIiwiRklMRV9TRUxFQ1RFRCIsIkZJTEVfQ0xFQVIiLCJNRVRBREFUQV9VUERBVEUiLCJDTEFJTV9VUERBVEUiLCJTRVRfUFVCTElTSF9JTl9DSEFOTkVMIiwiUFVCTElTSF9TVEFUVVNfVVBEQVRFIiwiRVJST1JfVVBEQVRFIiwiU0VMRUNURURfQ0hBTk5FTF9VUERBVEUiLCJzaG93TWV0YWRhdGFJbnB1dHMiLCJUT0dHTEVfTUVUQURBVEFfSU5QVVRTIiwiVEhVTUJOQUlMX05FVyIsImhpc3RvcnkiLCJQVUJMSVNIX1NUQVJUIiwiRXJyb3JQYWdlIiwicHJvcHMiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiTXlzcWxDb25maWciLCJTbGFja0NvbmZpZyIsInNsYWNrV2ViSG9vayIsInNsYWNrRXJyb3JDaGFubmVsIiwic2xhY2tJbmZvQ2hhbm5lbCIsInJldHVyblNob3J0SWQiLCJjbGFpbXNBcnJheSIsImNsYWltSW5kZXgiLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwiZWxlbWVudCIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwiZnMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSIsIm5zZnciLCJsaWNlbnNlIiwiaW52YWxpZE5hbWVDaGFyYWN0ZXJzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwicGF0aCIsInNpemUiLCJ0ZXN0IiwidmFsaWRhdGVGaWxlVHlwZUFuZFNpemUiLCJmaWxlTmFtZSIsImZpbGVUeXBlIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImZpbGVfcGF0aCIsImJpZCIsIm1ldGFkYXRhIiwiYXV0aG9yIiwibGFuZ3VhZ2UiLCJjbGFpbV9hZGRyZXNzIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImRlbGV0ZVRlbXBvcmFyeUZpbGUiLCJ1bmxpbmsiLCJhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSIsImZpbGVJbmZvIiwiZ2V0UmVzdWx0IiwiZmlsZV9uYW1lIiwiZG93bmxvYWRfcGF0aCIsImNyZWF0ZUZpbGVEYXRhIiwib3V0cG9pbnQiLCJoZWlnaHQiLCJhZGRyZXNzIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsImNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIiwiY29kZSIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInN1Y2Nlc3MiLCJyZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIiwiTk9fQ0hBTk5FTCIsIk5PX0NMQUlNIiwiTk9fRklMRSIsImdldENsYWltSWQiLCJnZXRDbGFpbUlkQnlDaGFubmVsIiwiZ2V0Q2xhaW1JZEJ5Q2xhaW0iLCJnZXRMb25nQ2xhaW1JZCIsImxvbmdDbGFpbUlkIiwiZ2V0TG9uZ0NoYW5uZWxJZCIsImxvbmdDaGFubmVsSWQiLCJnZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkIiwiZ2V0Q2hhbm5lbERhdGEiLCJsb25nQ2hhbm5lbENsYWltSWQiLCJnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkIiwic2hvcnRDaGFubmVsQ2xhaW1JZCIsImdldENoYW5uZWxDbGFpbXMiLCJnZXRBbGxDaGFubmVsQ2xhaW1zIiwiY2hhbm5lbENsYWltc0FycmF5IiwicGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhIiwiZ2V0TG9jYWxGaWxlUmVjb3JkIiwiZGF0YVZhbHVlcyIsInJlcSIsImNvbnRleHQiLCJzdG9yZSIsImh0bWwiLCJoZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJyZWRpcmVjdCIsInByZWxvYWRlZFN0YXRlIiwiZ2V0U3RhdGUiLCJzZW5kIiwicHVibGlzaCIsIkxPQ0FMX0NIRUNLIiwiVU5BVkFJTEFCTEUiLCJFUlJPUiIsIkFWQUlMQUJMRSIsImluaXRpYWxpemUiLCJHQUxpc3RlbmVyIiwic2VuZFBhZ2VWaWV3IiwibG9jYXRpb24iLCJsaXN0ZW4iLCJzZXQiLCJwYXRobmFtZSIsInBhZ2V2aWV3IiwiY2hpbGRyZW4iLCJIb21lUGFnZSIsIkFwcCIsInZhbGlkYXRlRmlsZSIsImNyZWF0ZVB1Ymxpc2hNZXRhZGF0YSIsImNsYWltIiwicHVibGlzaEluQ2hhbm5lbCIsInNlbGVjdGVkQ2hhbm5lbCIsImNyZWF0ZVB1Ymxpc2hGb3JtRGF0YSIsImZkIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJoYXNPd25Qcm9wZXJ0eSIsImNyZWF0ZVRodW1ibmFpbFVybCIsInZhbGlkYXRlQ2hhbm5lbFNlbGVjdGlvbiIsInZhbGlkYXRlUHVibGlzaFBhcmFtcyIsInVybEVycm9yIiwiUHJvZ3Jlc3NCYXIiLCJiYXJzIiwiaW5kZXgiLCJpbmNyZW1lbnRlciIsImNyZWF0ZUJhcnMiLCJiaW5kIiwic3RhcnRQcm9ncmVzc0JhciIsInVwZGF0ZVByb2dyZXNzQmFyIiwic3RvcFByb2dyZXNzQmFyIiwiaSIsImlzQWN0aXZlIiwic2V0U3RhdGUiLCJ1cGRhdGVJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImJhciIsIm51bWJlciIsIkNIQU5ORUwiLCJBU1NFVF9MSVRFIiwiQVNTRVRfREVUQUlMUyIsImRpc3BsYXlBc3NldCIsIm9uRmlsZVJlcXVlc3QiLCJ0b1N0cmluZyIsIm1ldGEiLCJsaW5rIiwic2VsZWN0U2l0ZVN0YXRlIiwic2VsZWN0U2l0ZUhvc3QiLCJleHByZXNzIiwiYm9keVBhcnNlciIsImV4cHJlc3NIYW5kbGViYXJzIiwiSGFuZGxlYmFycyIsInBhc3Nwb3J0Iiwic2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplU3BlZWNoVXNlciIsImNvb2tpZVNlc3Npb24iLCJodHRwIiwiU3BlZWNoU2VydmVyIiwiY29uZmlndXJlTXlzcWwiLCJteXNxbENvbmZpZyIsImNvbmZpZ3VyZVNpdGUiLCJzaXRlQ29uZmlnIiwiUE9SVCIsImNvbmZpZ3VyZVNsYWNrIiwic2xhY2tDb25maWciLCJjcmVhdGVBcHAiLCJhcHAiLCJlbmFibGUiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJuZXh0IiwidmVyYm9zZSIsInNlcmlhbGl6ZVVzZXIiLCJkZXNlcmlhbGl6ZVVzZXIiLCJsb2NhbFNpZ251cFN0cmF0ZWd5IiwibG9jYWxMb2dpblN0cmF0ZWd5IiwibWF4QWdlIiwic2Vzc2lvbiIsImhicyIsImRlZmF1bHRMYXlvdXQiLCJoYW5kbGViYXJzIiwiZW5naW5lIiwic2VydmVyIiwiU2VydmVyIiwic3RhcnQiLCJzeW5jIiwidXNlciIsImRvbmUiLCJQYXNzcG9ydExvY2FsU3RyYXRlZ3kiLCJTdHJhdGVneSIsImxicnlBcGkiLCJ1c2VybmFtZUZpZWxkIiwicGFzc3dvcmRGaWVsZCIsInVzZXJJbmZvIiwidXNlckRhdGEiLCJ1c2VyTmFtZSIsImNoYW5uZWxEYXRhIiwidHgiLCJjbGFpbV9pZCIsImNlcnRpZmljYXRlRGF0YSIsIm5ld1VzZXIiLCJuZXdDaGFubmVsIiwibmV3Q2VydGlmaWNhdGUiLCJzZXRDaGFubmVsIiwic2V0VXNlciIsInNob3J0Q2hhbm5lbElkIiwibGJyeUNvbmZpZyIsIlNUUklORyIsIkJPT0xFQU4iLCJJTlRFR0VSIiwiVEVYVCIsIkRFQ0lNQUwiLCJkZWZpbmUiLCJkZWZhdWx0IiwiY2xhaW1TZXF1ZW5jZSIsImRlY29kZWRDbGFpbSIsImRlcHRoIiwiZWZmZWN0aXZlQW1vdW50IiwiaGFzU2lnbmF0dXJlIiwiaGV4Iiwibm91dCIsInR4aWQiLCJ2YWxpZEF0SGVpZ2h0IiwidmFsdWVWZXJzaW9uIiwiY2xhaW1UeXBlIiwiY2VydGlmaWNhdGVWZXJzaW9uIiwia2V5VHlwZSIsInB1YmxpY0tleSIsImZyZWV6ZVRhYmxlTmFtZSIsImJlbG9uZ3NUbyIsImZvcmVpZ25LZXkiLCJhbGxvd051bGwiLCJmaW5kQWxsIiwib3JkZXIiLCJnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkIiwiJGxpa2UiLCJnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lIiwidmFsaWRhdGVMb25nQ2hhbm5lbElkIiwiaGFzT25lIiwiZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSIsImRldGVybWluZVRodW1ibmFpbCIsInN0b3JlZFRodW1ibmFpbCIsInByZXBhcmVDbGFpbURhdGEiLCJsaWNlbnNlVXJsIiwicHJldmlldyIsIm1ldGFkYXRhVmVyc2lvbiIsInNvdXJjZVR5cGUiLCJzb3VyY2VWZXJzaW9uIiwic3RyZWFtVmVyc2lvbiIsImdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCIsInJhdyIsImdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZCIsImdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUiLCJ2YWxpZGF0ZUxvbmdDbGFpbUlkIiwicmVzb2x2ZUNsYWltIiwiY2xhaW1BcnJheSIsImRlZmF1bHRWYWx1ZSIsInRyZW5kaW5nRWxpZ2libGUiLCJoYXNNYW55IiwiZ2V0UmVjZW50Q2xhaW1zIiwibGltaXQiLCJhY3Rpb24iLCJpcEFkZHJlc3MiLCJiY3J5cHQiLCJwcm90b3R5cGUiLCJjb21wYXJlUGFzc3dvcmQiLCJjb21wYXJlIiwiY2hhbmdlUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImdlblNhbHQiLCJzYWx0RXJyb3IiLCJzYWx0IiwiaGFzaCIsImhhc2hFcnJvciIsImhvb2siLCJyZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8iLCJ1c2VySW5zdGFuY2UiLCJnZXRDaGFubmVsIiwiaXNNYXRjaCIsImxvZ0luIiwiZ2V0IiwibG9nb3V0IiwibXVsdGlwYXJ0IiwibXVsdGlwYXJ0TWlkZGxld2FyZSIsInVwbG9hZERpciIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IiwiZXJyb3JIYW5kbGVycyIsImF1dGhlbnRpY2F0ZVVzZXIiLCJhdmFpbGFibGVOYW1lIiwiYm9keSIsImNsYWltc0xpc3QiLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJmaWxlUmVjb3JkIiwiY29tcGxldGVkIiwicmVzb2x2ZWRVcmkiLCJmaWxlcyIsImNoYW5uZWxQYXNzd29yZCIsInZhbGlkYXRlZENsYWltTmFtZSIsInRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJsYnJ5VHgiLCJjbGFpbUluZm8iLCJwdWJsaXNoSGVscGVycyIsIk9wIiwicHVibGlzaFJlc3VsdHMiLCJjbGFpbVJlY29yZCIsInVwc2VydENyaXRlcmlhIiwic2V0Q2xhaW0iLCJzZXRGaWxlIiwiY2xhaW1BZGRyZXNzZXMiLCJhdHRyaWJ1dGVzIiwib3IiLCJhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMiLCJ1c2VyUGFzc3dvcmQiLCJjaGFubmVsRmluZFBhcmFtcyIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsImhhbmRsZVBhZ2VSZW5kZXIiLCJyZW5kZXIiLCJsYXlvdXQiLCJpbml0aWFsU3RhdGUiLCJhc3NpZ24iLCJwdWJsaXNoU3VibWl0IiwiTE9HSU4iLCJDUkVBVEUiLCJjaGFubmVsTGlzdCIsImdvb2dsZUFuYWx5dGljc0lkIiwiQWJvdXRQYWdlIiwiVklFVyIsIkxPR09VVCIsIk5hdkJhciIsImNoZWNrRm9yTG9nZ2VkSW5Vc2VyIiwibG9nb3V0VXNlciIsImhhbmRsZVNlbGVjdGlvbiIsImNyZWRlbnRpYWxzIiwidGFyZ2V0Iiwic2VsZWN0ZWRPcHRpb25zIiwiTG9nbyIsIk5hdkJhckNoYW5uZWxEcm9wZG93biIsImRlZmF1bHRTZWxlY3Rpb24iLCJTRU8iLCJwYWdlVXJpIiwiY2Fub25pY2FsTGluayIsInJlbCIsImhyZWYiLCJvYmplY3QiLCJsb2dnZWRJbkNoYW5uZWxOYW1lIiwiTG9naW5QYWdlIiwibmV3UHJvcHMiLCJDaGFubmVsTG9naW5Gb3JtIiwiaGFuZGxlSW5wdXQiLCJsb2dpblRvQ2hhbm5lbCIsInByZXZlbnREZWZhdWx0IiwiSGVhZGVycyIsIkNoYW5uZWxDcmVhdGVGb3JtIiwiaGFuZGxlQ2hhbm5lbElucHV0IiwiaW5wdXQiLCJjbGVhbnNlQ2hhbm5lbElucHV0IiwidXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIiwiY2hhbm5lbFdpdGhBdFN5bWJvbCIsImNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIiwiY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUiLCJtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0IiwiQWN0aXZlU3RhdHVzQmFyIiwiSW5hY3RpdmVTdGF0dXNCYXIiLCJTaG93UGFnZSIsIm5leHRQcm9wcyIsIlNob3dMaXRlIiwiQXNzZXREaXNwbGF5IiwiU2hvd0Fzc2V0RGV0YWlscyIsIkFzc2V0VGl0bGUiLCJBc3NldEluZm8iLCJjb3B5VG9DbGlwYm9hcmQiLCJlbGVtZW50VG9Db3B5IiwiZGF0YXNldCIsImVsZW1lbnR0b2NvcHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJwcmV2aW91c1JlcXVlc3QiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwic2hvd05ld1BhZ2UiLCJkZWZhdWx0cyIsIkFzc2V0UHJldmlldyIsImRpcmVjdFNvdXJjZUxpbmsiLCJzaG93VXJsTGluayIsIkZvdXJPaEZvclBhZ2UiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IiwibG9nUmVxdWVzdERhdGEiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwiU0VSVkUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicGFyc2VNb2RpZmllciIsInJlc3BvbnNlVHlwZSIsIlNIT1ciLCJjbGllbnRBY2NlcHRzSHRtbCIsImFjY2VwdCIsInJlcXVlc3RJc0Zyb21Ccm93c2VyIiwiY2xpZW50V2FudHNBc3NldCIsInJhbmdlIiwiaW1hZ2VJc1dhbnRlZCIsInZpZGVvSXNXYW50ZWQiLCJpc1ZhbGlkQ2xhaW1JZCIsImlzVmFsaWRTaG9ydElkIiwiaXNWYWxpZFNob3J0SWRPckNsYWltSWQiLCJzZXJ2ZUFzc2V0VG9DbGllbnQiLCJzZW5kRmlsZU9wdGlvbnMiLCJzZW5kRmlsZSIsImZ1bGxDbGFpbUlkIiwidGVtcE5hbWUiLCJyZXR1cm5TYWdhV2l0aFBhcmFtcyIsInNhZ2EiLCJzYWdhTWlkZGxld2FyZSIsIm1pZGRsZXdhcmUiLCJydW4iLCJoYW5kbGVTaG93UGFnZVVyaSIsIndhdGNoSGFuZGxlU2hvd1BhZ2VVcmkiLCJwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSIsInBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IiwibmV3QXNzZXRSZXF1ZXN0Iiwid2F0Y2hOZXdBc3NldFJlcXVlc3QiLCJnZXRTaG9ydElkIiwiZ2V0Q2xhaW1EYXRhIiwibmV3Q2hhbm5lbFJlcXVlc3QiLCJ3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hVcGRhdGVDaGFubmVsQ2xhaW1zIiwiZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCIsImxvZ0xldmVsIiwid2luc3RvbiIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwibGV2ZWwiLCJ0aW1lc3RhbXAiLCJjb2xvcml6ZSIsInByZXR0eVByaW50IiwiaGFuZGxlRXhjZXB0aW9ucyIsImh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb24iLCJ3YXJuIiwic2lsbHkiLCJsb2dnZXJDb25maWciLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTlCRCxDOzs7Ozs7QUNIQSxrRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1MSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDJlMzg2YjNiNTI5MTcyMGQ5NTIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7XG4gICAgY29tcG9uZW50czoge30sXG4gICAgY29udGFpbmVyczoge30sXG4gICAgcGFnZXMgICAgIDoge30sXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGN1c3RvbUNvbXBvbmVudHMsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnNvbGUubG9nKCdleHBvcnRpbmcgc2VxdWVsaXplIG1vZGVscycpO1xuY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbXlzcWxDb25maWcnKTtcbmNvbnN0IGRiID0ge307XG4vLyBzZXQgc2VxdWVsaXplIG9wdGlvbnNcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICBob3N0ICAgICAgICAgIDogJ2xvY2FsaG9zdCcsXG4gIGRpYWxlY3QgICAgICAgOiAnbXlzcWwnLFxuICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSwgLy8gZml4IHRvIGVuc3VyZSBERUNJTUFMIHdpbGwgbm90IGJlIHN0b3JlZCBhcyBhIHN0cmluZ1xuICBsb2dnaW5nICAgICAgIDogZmFsc2UsXG4gIHBvb2wgICAgICAgICAgOiB7XG4gICAgbWF4ICAgIDogNSxcbiAgICBtaW4gICAgOiAwLFxuICAgIGlkbGUgICA6IDEwMDAwLFxuICAgIGFjcXVpcmU6IDEwMDAwLFxuICB9LFxufSk7XG5cbi8vIGVzdGFibGlzaCBteXNxbCBjb25uZWN0aW9uXG5zZXF1ZWxpemVcbiAgLmF1dGhlbnRpY2F0ZSgpXG4gIC50aGVuKCgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VxdWVsaXplIGhhcyBlc3RhYmxpc2hlZCBteXNxbCBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKCdTZXF1ZWxpemUgd2FzIHVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZTonLCBlcnIpO1xuICB9KTtcblxuLy8gbWFudWFsbHkgYWRkIGVhY2ggbW9kZWwgdG8gdGhlIGRiIG9iamVjdFxuY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCcuL2NlcnRpZmljYXRlLmpzJyk7XG5jb25zdCBDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJy4vY2xhaW0uanMnKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCcuL2ZpbGUuanMnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL3VzZXIuanMnKTtcbmRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG5kYlsnQ2hhbm5lbCddID0gc2VxdWVsaXplLmltcG9ydCgnQ2hhbm5lbCcsIENoYW5uZWwpO1xuZGJbJ0NsYWltJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDbGFpbScsIENsYWltKTtcbmRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG5kYlsnUmVxdWVzdCddID0gc2VxdWVsaXplLmltcG9ydCgnUmVxdWVzdCcsIFJlcXVlc3QpO1xuZGJbJ1VzZXInXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1VzZXInLCBVc2VyKTtcblxuLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4gIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgIGxvZ2dlci5pbmZvKCdBc3NvY2lhdGluZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbiAgfVxufSk7XG5cbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcblxuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwiaW1wb3J0ICdjcm9zcy1mZXRjaC9wb2x5ZmlsbCc7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBKU09OIHJldHVybmVkIGJ5IGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBwYXJzZWQgSlNPTiBmcm9tIHRoZSByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSlNPTiAocmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0IHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA1KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIHN0YXR1cyByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0IHwgdW5kZWZpbmVkfSBSZXR1cm5zIG9iamVjdCB3aXRoIHN0YXR1cyBhbmQgc3RhdHVzVGV4dCwgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzIChyZXNwb25zZSwganNvblJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgIHJldHVybiBqc29uUmVzcG9uc2U7XG4gIH1cbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoanNvblJlc3BvbnNlLm1lc3NhZ2UpO1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBSZXF1ZXN0cyBhIFVSTCwgcmV0dXJuaW5nIGEgcHJvbWlzZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsICAgICAgIFRoZSBVUkwgd2Ugd2FudCB0byByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyB3ZSB3YW50IHRvIHBhc3MgdG8gXCJmZXRjaFwiXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICAgVGhlIHJlc3BvbnNlIGRhdGFcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0ICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3Jlc3BvbnNlLCBwYXJzZUpTT04ocmVzcG9uc2UpXSk7XG4gICAgfSlcbiAgICAudGhlbigoW3Jlc3BvbnNlLCBqc29uUmVzcG9uc2VdKSA9PiB7XG4gICAgICByZXR1cm4gY2hlY2tTdGF0dXMocmVzcG9uc2UsIGpzb25SZXNwb25zZSk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcmVxdWVzdC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG4vLyBiYXNpYyByZXF1ZXN0IHBhcnNpbmdcbmV4cG9ydCBmdW5jdGlvbiBvbkhhbmRsZVNob3dQYWdlVXJpIChwYXJhbXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSxcbiAgICBkYXRhOiBwYXJhbXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3Q2hhbm5lbFJlcXVlc3QgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBDSEFOTkVMO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgY3IjJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsXG4gICAgZGF0YTogeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdBc3NldFJlcXVlc3QgKG5hbWUsIGlkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBleHRlbnNpb24pIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBleHRlbnNpb24gPyBBU1NFVF9MSVRFIDogQVNTRVRfREVUQUlMUztcbiAgY29uc3QgcmVxdWVzdElkID0gYGFyIyR7bmFtZX0jJHtpZH0jJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgICAgbmFtZSxcbiAgICAgIG1vZGlmaWVyOiB7XG4gICAgICAgIGlkLFxuICAgICAgICBjaGFubmVsOiB7XG4gICAgICAgICAgbmFtZTogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgaWQgIDogY2hhbm5lbElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdFVwZGF0ZSAocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCAoaWQsIGVycm9yLCBrZXkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIGtleSB9LFxuICB9O1xufTtcblxuLy8gYXNzZXQgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZXRUb0Fzc2V0TGlzdCAoaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhIH0sXG4gIH07XG59XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QgKGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQURELFxuICAgIGRhdGE6IHsgaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsXG4gICAgZGF0YToge2NoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZX0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MsXG4gICAgZGF0YToge2NoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGF9LFxuICB9O1xufTtcblxuLy8gZGlzcGxheSBhIGZpbGVcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVSZXF1ZXN0ZWQgKG5hbWUsIGNsYWltSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfUkVRVUVTVEVELFxuICAgIGRhdGE6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkgKHN0YXR1cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFLFxuICAgIGRhdGE6IHN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBzaXRlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsTmFtZSAgIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBjaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBjaGFubmVsTG9uZ0lkIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubG9uZ0lkLFxuICAgIHNpdGVEZXNjcmlwdGlvbjogc2l0ZS5kZXNjcmlwdGlvbixcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICAgIG9uQ2hhbm5lbExvZ291dDogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG51bGwsIG51bGwsIG51bGwpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvaW5kZXguanMiLCIvLyByZXF1ZXN0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBIQU5ETEVfU0hPV19VUkkgPSAnSEFORExFX1NIT1dfVVJJJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0VSUk9SID0gJ1JFUVVFU1RfRVJST1InO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfVVBEQVRFID0gJ1JFUVVFU1RfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9SRVFVRVNUX05FVyA9ICdBU1NFVF9SRVFVRVNUX05FVyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9SRVFVRVNUX05FVyA9ICdDSEFOTkVMX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0xJU1RfQUREID0gJ1JFUVVFU1RfTElTVF9BREQnO1xuXG4vLyBhc3NldCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQVNTRVRfQUREID0gYEFTU0VUX0FERGA7XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQUREID0gJ0NIQU5ORUxfQUREJztcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyA9ICdDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTJztcblxuLy8gYXNzZXQvZmlsZSBkaXNwbGF5IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBGSUxFX1JFUVVFU1RFRCA9ICdGSUxFX1JFUVVFU1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFID0gJ0ZJTEVfQVZBSUxBQklMSVRZX1VQREFURSc7XG5leHBvcnQgY29uc3QgRElTUExBWV9BU1NFVF9FUlJPUiA9ICdESVNQTEFZX0FTU0VUX0VSUk9SJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZSB9KSA9PiB7XG4gIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBkZXNjcmlwdGlvbjogc2l0ZURlc2NyaXB0aW9uLCBob3N0OiBzaXRlSG9zdCwgdGl0bGU6IHNpdGVUaXRsZSwgdHdpdHRlcjogc2l0ZVR3aXR0ZXIgfSA9IHNpdGU7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gICAgc2l0ZURlc2NyaXB0aW9uLFxuICAgIHNpdGVIb3N0LFxuICAgIHNpdGVUaXRsZSxcbiAgICBzaXRlVHdpdHRlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RBc3NldCA9IChzaG93KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7XG4gIHJldHVybiBzaG93LmFzc2V0TGlzdFthc3NldEtleV07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hvd1N0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaG93O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBjb21wb25lbnRzQ29uZmlnIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBnZXREZWVwZXN0Q2hpbGRWYWx1ZSAocGFyZW50LCBjaGlsZHJlbktleXMpIHtcbiAgbGV0IGNoaWxkS2V5ID0gY2hpbGRyZW5LZXlzLnNoaWZ0KCk7IC8vIC5zaGlmdCgpIHJldHJpZXZlcyB0aGUgZmlyc3QgZWxlbWVudCBvZiBhcnJheSBhbmQgcmVtb3ZlcyBpdCBmcm9tIGFycmF5XG4gIGxldCBjaGlsZCA9IHBhcmVudFtjaGlsZEtleV07XG4gIGlmIChjaGlsZHJlbktleXMubGVuZ3RoID49IDEpIHtcbiAgICByZXR1cm4gZ2V0RGVlcGVzdENoaWxkVmFsdWUoY2hpbGQsIGNoaWxkcmVuS2V5cyk7XG4gIH1cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG5leHBvcnQgY29uc3QgZHluYW1pY0ltcG9ydCA9IChmaWxlUGF0aCkgPT4ge1xuICAvLyB2YWxpZGF0ZSBpbnB1dHNcbiAgaWYgKCFmaWxlUGF0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIHByb3ZpZGVkIHRvIGR5bmFtaWNJbXBvcnQoKScpO1xuICB9XG4gIGlmIChmaWxlUGF0aC50eXBlb2YgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmaWxlIHBhdGggcHJvdmlkZWQgdG8gZHluYW1pY0ltcG9ydCgpIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgfVxuICAvLyBzcGxpdCBvdXQgdGhlIGZpbGUgZm9sZGVycyAgLy8gZmlsdGVyIG91dCBhbnkgZW1wdHkgb3Igd2hpdGUtc3BhY2Utb25seSBzdHJpbmdzXG4gIGNvbnN0IGZvbGRlcnMgPSBmaWxlUGF0aC5zcGxpdCgnLycpLmZpbHRlcihmb2xkZXJOYW1lID0+IGZvbGRlck5hbWUucmVwbGFjZSgvXFxzL2csICcnKS5sZW5ndGgpO1xuICAvLyBjaGVjayBmb3IgdGhlIGNvbXBvbmVudCBjb3JyZXNwb25kaW5nIHRvIGZpbGUgcGF0aCBpbiB0aGUgc2l0ZSBjb25maWcgb2JqZWN0XG4gIC8vIGkuZS4gY29tcG9uZW50c0NvbmZpZ1tmb2xkZXJzWzBdXVtmb2xkZXJzWzJdWy4uLl1bZm9sZGVyc1tuXV1cbiAgY29uc3QgY3VzdG9tQ29tcG9uZW50ID0gZ2V0RGVlcGVzdENoaWxkVmFsdWUoY29tcG9uZW50c0NvbmZpZywgZm9sZGVycyk7XG4gIGlmIChjdXN0b21Db21wb25lbnQpIHtcbiAgICByZXR1cm4gY3VzdG9tQ29tcG9uZW50OyAgLy8gcmV0dXJuIGN1c3RvbSBjb21wb25lbnRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVxdWlyZShgJHtmaWxlUGF0aH1gKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9keW5hbWljSW1wb3J0LmpzIiwiY29uc3QgY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rID0gKHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtwYWdlfWA7XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsgPSAoYXNzZXQsIHNpdGVIb3N0KSA9PiB7XG4gIGxldCBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZDtcbiAgaWYgKGFzc2V0LmNsYWltRGF0YSkge1xuICAgICh7IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGEpO1xuICB9O1xuICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2hhbm5lbE5hbWV9OiR7Y2VydGlmaWNhdGVJZH0vJHtuYW1lfWA7XG4gIH07XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rID0gKGNoYW5uZWwsIHNpdGVIb3N0KSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBjaGFubmVsLCBwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rKGFzc2V0LCBzaXRlSG9zdCk7XG4gIH1cbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsoY2hhbm5lbCwgc2l0ZUhvc3QpO1xuICB9XG4gIHJldHVybiBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsocGFnZSwgc2l0ZUhvc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9jYW5vbmljYWxMaW5rLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleCAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgYWZ0ZXIgXCJAXCIuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogXCIke25hbWVCYWRDaGFycy5qb2luKCcsICcpfVwiLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZDogY2hhbm5lbENsYWltSWQgfHwgbnVsbCxcbiAgICAgIGNsYWltSWQgICAgICAgOiBjbGFpbUlkIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBleHRlbnNpb24pXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gZXh0ZW5zaW9uIHNlcGFyYXRvciwgZXh0ZW5zaW9uIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIGV4dGVuc2lvblNlcGVyYXRvciwgZXh0ZW5zaW9uXSA9IGNvbXBvbmVudHNSZWdleCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuZXhlYyhuYW1lKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVjayB5b3VyIFVSTC4gIE5vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiLlwiJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgZXh0ZW5zaW9uXG4gICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvcikge1xuICAgICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7ZXh0ZW5zaW9uU2VwZXJhdG9yfVwiLmApO1xuICAgICAgfVxuICAgICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBUaGUgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIiBzZXBhcmF0b3IgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZS5gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICAgIGV4dGVuc2lvbjogZXh0ZW5zaW9uIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsImNvbnN0IGRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSAodGh1bWJuYWlsKSA9PiB7XG4gIGlmICh0aHVtYm5haWwpIHtcbiAgICBjb25zdCBmaWxlRXh0ID0gdGh1bWJuYWlsLnN1YnN0cmluZyh0aHVtYm5haWwubGFzdEluZGV4T2YoJy4nKSk7XG4gICAgc3dpdGNoIChmaWxlRXh0KSB7XG4gICAgICBjYXNlICdqcGVnJzpcbiAgICAgIGNhc2UgJ2pwZyc6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvanBlZyc7XG4gICAgICBjYXNlICdwbmcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL3BuZyc7XG4gICAgICBjYXNlICdnaWYnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2dpZic7XG4gICAgICBjYXNlICdtcDQnOlxuICAgICAgICByZXR1cm4gJ3ZpZGVvL21wNCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59O1xuXG5jb25zdCBjcmVhdGVCYXNpY01ldGFUYWdzID0gKHNpdGVIb3N0LCBzaXRlRGVzY3JpcHRpb24sIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogc2l0ZUhvc3R9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBzaXRlRGVzY3JpcHRpb259LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQ2hhbm5lbE1ldGFUYWdzID0gKHNpdGVUaXRsZSwgc2l0ZUhvc3QsIHNpdGVUd2l0dGVyLCBjaGFubmVsKSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogYCR7bmFtZX0gb24gJHtzaXRlVGl0bGV9YH0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IGAke25hbWV9LCBhIGNoYW5uZWwgb24gJHtzaXRlVGl0bGV9YH0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5J30sXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldE1ldGFUYWdzID0gKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKSA9PiB7XG4gIGNvbnN0IHsgY2xhaW1EYXRhIH0gPSBhc3NldDtcbiAgY29uc3QgeyBjb250ZW50VHlwZSB9ID0gY2xhaW1EYXRhO1xuICBjb25zdCBlbWJlZFVybCA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfWA7XG4gIGNvbnN0IHNob3dVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzb3VyY2UgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX0uJHtjbGFpbURhdGEuZmlsZUV4dH1gO1xuICBjb25zdCBvZ1RpdGxlID0gY2xhaW1EYXRhLnRpdGxlIHx8IGNsYWltRGF0YS5uYW1lO1xuICBjb25zdCBvZ0Rlc2NyaXB0aW9uID0gY2xhaW1EYXRhLmRlc2NyaXB0aW9uIHx8IGRlZmF1bHREZXNjcmlwdGlvbjtcbiAgY29uc3Qgb2dUaHVtYm5haWxDb250ZW50VHlwZSA9IGRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUoY2xhaW1EYXRhLnRodW1ibmFpbCk7XG4gIGNvbnN0IG9nVGh1bWJuYWlsID0gY2xhaW1EYXRhLnRodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsO1xuICBjb25zdCBtZXRhVGFncyA9IFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IG9nVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNob3dVcmx9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBvZ0Rlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICdvZzppbWFnZTp3aWR0aCcsIGNvbnRlbnQ6IDYwMH0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6aGVpZ2h0JywgY29udGVudDogMzE1fSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gIF07XG4gIGlmIChjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL21wNCcgfHwgY29udGVudFR5cGUgPT09ICd2aWRlby93ZWJtJykge1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW8nLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvOnNlY3VyZV91cmwnLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvOnR5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBvZ1RodW1ibmFpbH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IG9nVGh1bWJuYWlsQ29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAndmlkZW8nfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAncGxheWVyJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXInLCBjb250ZW50OiBlbWJlZFVybH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6d2lkdGgnLCBjb250ZW50OiA2MDB9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6dGV4dDpwbGF5ZXJfd2lkdGgnLCBjb250ZW50OiA2MDB9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOmhlaWdodCcsIGNvbnRlbnQ6IDMzN30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpzdHJlYW06Y29udGVudF90eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgfSBlbHNlIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZTp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAnYXJ0aWNsZSd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5X2xhcmdlX2ltYWdlJ30pO1xuICB9XG4gIHJldHVybiBtZXRhVGFncztcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNZXRhVGFncyA9IChzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgY2hhbm5lbCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKSA9PiB7XG4gIGlmIChhc3NldCkge1xuICAgIHJldHVybiBjcmVhdGVBc3NldE1ldGFUYWdzKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbE1ldGFUYWdzKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBjaGFubmVsKTtcbiAgfTtcbiAgcmV0dXJuIGNyZWF0ZUJhc2ljTWV0YVRhZ3Moc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlcik7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL21ldGFUYWdzLmpzIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVBhZ2VUaXRsZSA9IChzaXRlVGl0bGUsIHBhZ2VUaXRsZSkgPT4ge1xuICBpZiAoIXBhZ2VUaXRsZSkge1xuICAgIHJldHVybiBgJHtzaXRlVGl0bGV9YDtcbiAgfVxuICByZXR1cm4gYCR7c2l0ZVRpdGxlfSAtICR7cGFnZVRpdGxlfWA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3BhZ2VUaXRsZS5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTG9nZ2VkSW5DaGFubmVsIChuYW1lLCBzaG9ydElkLCBsb25nSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICBzaG9ydElkLFxuICAgICAgbG9uZ0lkLFxuICAgIH0sXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbGUgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfU0VMRUNURUQsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckZpbGUgKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9DTEVBUixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLk1FVEFEQVRBX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDbGFpbSAodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNMQUlNX1VQREFURSxcbiAgICBkYXRhOiB2YWx1ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQdWJsaXNoSW5DaGFubmVsIChjaGFubmVsKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMLFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHVibGlzaFN0YXR1cyAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgc3RhdHVzLFxuICAgICAgbWVzc2FnZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVycm9yIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRVJST1JfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCAoY2hhbm5lbE5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IGNoYW5uZWxOYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1ldGFkYXRhSW5wdXRzIChzaG93TWV0YWRhdGFJbnB1dHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFMsXG4gICAgZGF0YTogc2hvd01ldGFkYXRhSW5wdXRzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3VGh1bWJuYWlsIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5USFVNQk5BSUxfTkVXLFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQdWJsaXNoIChoaXN0b3J5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVJULFxuICAgIGRhdGE6IHsgaGlzdG9yeSB9LFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvcHVibGlzaC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCJcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5cbmNsYXNzIEVycm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8cD57ZXJyb3J9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbkVycm9yUGFnZS5wcm9wVHlwZXMgPSB7XG4gIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvclBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvRXJyb3JQYWdlL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnRcIlxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gTXlzcWxDb25maWcgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHtkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkfSA9IGNvbmZpZztcbiAgICB0aGlzLmRhdGFiYXNlID0gZGF0YWJhc2U7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IE15c3FsQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJmdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNsYWNrIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhbmRsZUVycm9yUmVzcG9uc2U6IGZ1bmN0aW9uIChvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpIHtcbiAgICBsb2dnZXIuZXJyb3IoYEVycm9yIG9uICR7b3JpZ2luYWxVcmx9YCwgbW9kdWxlLmV4cG9ydHMudXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzKGVycm9yKSk7XG4gICAgY29uc3QgW3N0YXR1cywgbWVzc2FnZV0gPSBtb2R1bGUuZXhwb3J0cy5yZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMoZXJyb3IpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyhzdGF0dXMpXG4gICAgICAuanNvbihtb2R1bGUuZXhwb3J0cy5jcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZChzdGF0dXMsIG1lc3NhZ2UpKTtcbiAgfSxcbiAgcmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBsZXQgc3RhdHVzLCBtZXNzYWdlO1xuICAgIC8vIGNoZWNrIGZvciBkYWVtb24gYmVpbmcgdHVybmVkIG9mZlxuICAgIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJykge1xuICAgICAgc3RhdHVzID0gNTAzO1xuICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHJlZnVzZWQuICBUaGUgZGFlbW9uIG1heSBub3QgYmUgcnVubmluZy4nO1xuICAgICAgLy8gZmFsbGJhY2sgZm9yIGV2ZXJ5dGhpbmcgZWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXMgPSA0MDA7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gW3N0YXR1cywgbWVzc2FnZV07XG4gIH0sXG4gIHVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5czogZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGV0IG5ld0Vycm9yT2JqZWN0ID0ge307XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBuZXdFcnJvck9iamVjdFtrZXldID0gZXJyW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdFcnJvck9iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfSxcbiAgY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQgKHN0YXR1cywgbWVzc2FnZSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSwgY2xhaW1JZCkge1xuICAgIGlmIChjaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNoYW5uZWwoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNsYWltKG5hbWUsIGNsYWltSWQpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2xhaW0gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2xhaW0oJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DbGFpbS5nZXRMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltSWRCeUNoYW5uZWwgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDaGFubmVsKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSwgJHtjbGFpbU5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgaWRcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxJZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsSWQsIGRiLkNsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxJZCwgY2xhaW1OYW1lKV0pOyAgLy8gMi4gZ2V0IHRoZSBsb25nIGNsYWltIGlkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxJZCwgbG9uZ0NsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbERhdGEgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBzaG9ydENoYW5uZWxDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgICBzaG9ydENoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyhsb25nQ2hhbm5lbENsYWltSWQpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXldKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiBmb3JtYXQgdGhlIGRhdGEgZm9yIHRoZSB2aWV3LCBpbmNsdWRpbmcgcGFnaW5hdGlvblxuICAgICAgICAgIGxldCBwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEgPSByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheSwgcGFnZSk7XG4gICAgICAgICAgLy8gNC4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvbiBhbmQgY29udGVudHNcbiAgICAgICAgICByZXNvbHZlKHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldExvY2FsRmlsZVJlY29yZCAoY2xhaW1JZCwgbmFtZSkge1xuICAgIHJldHVybiBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7Y2xhaW1JZCwgbmFtZX19KVxuICAgICAgLnRoZW4oZmlsZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIHJldHVybiBOT19GSUxFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlLmRhdGFWYWx1ZXM7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJy4uLy4uL2NsaWVudC9yZWR1Y2Vycy9pbmRleCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnLi4vLi4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleCc7XG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uL2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UuanMnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIpO1xuXG4gIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcblxuICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAvLyBTb21ld2hlcmUgYSBgPFJlZGlyZWN0PmAgd2FzIHJlbmRlcmVkXG4gICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB3ZSdyZSBnb29kLCBzZW5kIHRoZSByZXNwb25zZVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUHVibGlzaFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvcHVibGlzaCc7XG5pbXBvcnQgQ2hhbm5lbFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvY2hhbm5lbCc7XG5pbXBvcnQgU2hvd1JlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2hvdyc7XG5pbXBvcnQgU2l0ZVJlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2l0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGNoYW5uZWw6IENoYW5uZWxSZWR1Y2VyLFxuICBwdWJsaXNoOiBQdWJsaXNoUmVkdWNlcixcbiAgc2hvdyAgIDogU2hvd1JlZHVjZXIsXG4gIHNpdGUgICA6IFNpdGVSZWR1Y2VyLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJleHBvcnQgY29uc3QgRklMRV9TRUxFQ1RFRCA9ICdGSUxFX1NFTEVDVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0NMRUFSID0gJ0ZJTEVfQ0xFQVInO1xuZXhwb3J0IGNvbnN0IE1FVEFEQVRBX1VQREFURSA9ICdNRVRBREFUQV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IENMQUlNX1VQREFURSA9ICdDTEFJTV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFVF9QVUJMSVNIX0lOX0NIQU5ORUwgPSAnU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFUVVNfVVBEQVRFID0gJ1BVQkxJU0hfU1RBVFVTX1VQREFURSc7XG5leHBvcnQgY29uc3QgRVJST1JfVVBEQVRFID0gJ0VSUk9SX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VMRUNURURfQ0hBTk5FTF9VUERBVEUgPSAnU0VMRUNURURfQ0hBTk5FTF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9NRVRBREFUQV9JTlBVVFMgPSAnVE9HR0xFX01FVEFEQVRBX0lOUFVUUyc7XG5leHBvcnQgY29uc3QgVEhVTUJOQUlMX05FVyA9ICdUSFVNQk5BSUxfTkVXJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVJUID0gJ1BVQkxJU0hfU1RBUlQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMX1VQREFURSA9ICdDSEFOTkVMX1VQREFURSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPQ0FMX0NIRUNLID0gJ0xPQ0FMX0NIRUNLJztcbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRSA9ICdVTkFWQUlMQUJMRSc7XG5leHBvcnQgY29uc3QgRVJST1IgPSAnRVJST1InO1xuZXhwb3J0IGNvbnN0IEFWQUlMQUJMRSA9ICdBVkFJTEFCTEUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgR29vZ2xlQW5hbHl0aWNzIGZyb20gJ3JlYWN0LWdhJztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmNvbnN0IHsgYW5hbHl0aWNzOiB7IGdvb2dsZUlkIH0gfSA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbkdvb2dsZUFuYWx5dGljcy5pbml0aWFsaXplKGdvb2dsZUlkKTtcblxuY2xhc3MgR0FMaXN0ZW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnNlbmRQYWdlVmlldyh0aGlzLnByb3BzLmhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5saXN0ZW4odGhpcy5zZW5kUGFnZVZpZXcpO1xuICB9XG5cbiAgc2VuZFBhZ2VWaWV3IChsb2NhdGlvbikge1xuICAgIEdvb2dsZUFuYWx5dGljcy5zZXQoeyBwYWdlOiBsb2NhdGlvbi5wYXRobmFtZSB9KTtcbiAgICBHb29nbGVBbmFseXRpY3MucGFnZXZpZXcobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEdBTGlzdGVuZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgZHluYW1pY0ltcG9ydCB9IGZyb20gJ3V0aWxzL2R5bmFtaWNJbXBvcnQnO1xuaW1wb3J0IEFib3V0UGFnZSBmcm9tICdwYWdlcy9BYm91dFBhZ2UnO1xuaW1wb3J0IExvZ2luUGFnZSBmcm9tICdwYWdlcy9Mb2dpblBhZ2UnO1xuaW1wb3J0IFNob3dQYWdlIGZyb20gJ3BhZ2VzL1Nob3dQYWdlJztcbmltcG9ydCBGb3VyT2hGb3VyUGFnZSBmcm9tICdjb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlJztcbmNvbnN0IEhvbWVQYWdlID0gZHluYW1pY0ltcG9ydCgncGFnZXMvSG9tZVBhZ2UnKTsgLy8gb3IgdXNlIHRoZSBwcm92aWRlZCBsb2NhbCBob21lcGFnZVxuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN3aXRjaD5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9e0hvbWVQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9hYm91dCcgY29tcG9uZW50PXtBYm91dFBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2xvZ2luJyBjb21wb25lbnQ9e0xvZ2luUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmlkZW50aWZpZXIvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy86Y2xhaW0nIGNvbXBvbmVudD17U2hvd1BhZ2V9IC8+XG4gICAgICA8Um91dGUgY29tcG9uZW50PXtGb3VyT2hGb3VyUGFnZX0gLz5cbiAgICA8L1N3aXRjaD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcHAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmFsaWRhdGVGaWxlIChmaWxlKSB7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcHJvdmlkZWQnKTtcbiAgICB9XG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgc2l6ZSBhbmQgdHlwZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgR0lGcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZpbGUudHlwZSArICcgaXMgbm90IGEgc3VwcG9ydGVkIGZpbGUgdHlwZS4gT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsImV4cG9ydCBjb25zdCBjcmVhdGVQdWJsaXNoTWV0YWRhdGEgPSAoY2xhaW0sIHsgdHlwZSB9LCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdyB9LCBwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwpID0+IHtcbiAgbGV0IG1ldGFkYXRhID0ge1xuICAgIG5hbWU6IGNsYWltLFxuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGxpY2Vuc2UsXG4gICAgbnNmdyxcbiAgICB0eXBlLFxuICB9O1xuICBpZiAocHVibGlzaEluQ2hhbm5lbCkge1xuICAgIG1ldGFkYXRhWydjaGFubmVsTmFtZSddID0gc2VsZWN0ZWRDaGFubmVsO1xuICB9XG4gIHJldHVybiBtZXRhZGF0YTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQdWJsaXNoRm9ybURhdGEgPSAoZmlsZSwgdGh1bWJuYWlsLCBtZXRhZGF0YSkgPT4ge1xuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcbiAgLy8gYXBwZW5kIGZpbGVcbiAgZmQuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG4gIC8vIGFwcGVuZCB0aHVtYm5haWxcbiAgaWYgKHRodW1ibmFpbCkge1xuICAgIGZkLmFwcGVuZCgndGh1bWJuYWlsJywgdGh1bWJuYWlsKTtcbiAgfVxuICAvLyBhcHBlbmQgbWV0YWRhdGFcbiAgZm9yIChsZXQga2V5IGluIG1ldGFkYXRhKSB7XG4gICAgaWYgKG1ldGFkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGZkLmFwcGVuZChrZXksIG1ldGFkYXRhW2tleV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVGh1bWJuYWlsVXJsID0gKGNoYW5uZWwsIGNoYW5uZWxJZCwgY2xhaW0sIGhvc3QpID0+IHtcbiAgcmV0dXJuIGAke2hvc3R9LyR7Y2hhbm5lbH06JHtjaGFubmVsSWR9LyR7Y2xhaW19LXRodW1iLnBuZ2A7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3B1Ymxpc2guanMiLCJleHBvcnQgY29uc3QgdmFsaWRhdGVDaGFubmVsU2VsZWN0aW9uID0gKHB1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgbG9nZ2VkSW5DaGFubmVsKSA9PiB7XG4gIGlmIChwdWJsaXNoSW5DaGFubmVsICYmIChzZWxlY3RlZENoYW5uZWwgIT09IGxvZ2dlZEluQ2hhbm5lbC5uYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTG9nIGluIHRvIGEgY2hhbm5lbCBvciBzZWxlY3QgQW5vbnltb3VzJyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVB1Ymxpc2hQYXJhbXMgPSAoZmlsZSwgY2xhaW0sIHVybEVycm9yKSA9PiB7XG4gIGlmICghZmlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGNob29zZSBhIGZpbGUnKTtcbiAgfVxuICBpZiAoIWNsYWltKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgZW50ZXIgYSBVUkwnKTtcbiAgfVxuICBpZiAodXJsRXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpeCB0aGUgdXJsJyk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvdmFsaWRhdGUuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBBY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXInO1xuaW1wb3J0IEluYWN0aXZlU3RhdHVzQmFyIGZyb20gJ2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXInO1xuXG5jbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYmFycyAgICAgICA6IFtdLFxuICAgICAgaW5kZXggICAgICA6IDAsXG4gICAgICBpbmNyZW1lbnRlcjogMSxcbiAgICB9O1xuICAgIHRoaXMuY3JlYXRlQmFycyA9IHRoaXMuY3JlYXRlQmFycy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhciA9IHRoaXMuc3RhcnRQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIgPSB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdG9wUHJvZ3Jlc3NCYXIgPSB0aGlzLnN0b3BQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmNyZWF0ZUJhcnMoKTtcbiAgICB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIoKTtcbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy5zdG9wUHJvZ3Jlc3NCYXIoKTtcbiAgfVxuICBjcmVhdGVCYXJzICgpIHtcbiAgICBjb25zdCBiYXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5wcm9wcy5zaXplOyBpKyspIHtcbiAgICAgIGJhcnMucHVzaCh7aXNBY3RpdmU6IGZhbHNlfSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBiYXJzIH0pO1xuICB9XG4gIHN0YXJ0UHJvZ3Jlc3NCYXIgKCkge1xuICAgIHRoaXMudXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZVByb2dyZXNzQmFyLmJpbmQodGhpcyksIDMwMCk7XG4gIH07XG4gIHVwZGF0ZVByb2dyZXNzQmFyICgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLnN0YXRlLmluZGV4O1xuICAgIGxldCBpbmNyZW1lbnRlciA9IHRoaXMuc3RhdGUuaW5jcmVtZW50ZXI7XG4gICAgbGV0IGJhcnMgPSB0aGlzLnN0YXRlLmJhcnM7XG4gICAgLy8gZmxpcCBpbmNyZW1lbnRlciBpZiBuZWNlc3NhcnksIHRvIHN0YXkgaW4gYm91bmRzXG4gICAgaWYgKChpbmRleCA8IDApIHx8IChpbmRleCA+IHRoaXMucHJvcHMuc2l6ZSkpIHtcbiAgICAgIGluY3JlbWVudGVyID0gaW5jcmVtZW50ZXIgKiAtMTtcbiAgICAgIGluZGV4ICs9IGluY3JlbWVudGVyO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgdGhlIGluZGV4ZWQgYmFyXG4gICAgaWYgKGluY3JlbWVudGVyID4gMCkge1xuICAgICAgYmFyc1tpbmRleF0uaXNBY3RpdmUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gICAgLy8gaW5jcmVtZW50IGluZGV4XG4gICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgLy8gdXBkYXRlIHN0YXRlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBiYXJzLFxuICAgICAgaW5jcmVtZW50ZXIsXG4gICAgICBpbmRleCxcbiAgICB9KTtcbiAgfTtcbiAgc3RvcFByb2dyZXNzQmFyICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudXBkYXRlSW50ZXJ2YWwpO1xuICB9O1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5zdGF0ZS5iYXJzLm1hcCgoYmFyLCBpbmRleCkgPT4gYmFyLmlzQWN0aXZlID8gPEFjdGl2ZVN0YXR1c0JhciBrZXk9e2luZGV4fSAvPiA6IDxJbmFjdGl2ZVN0YXR1c0JhciBrZXk9e2luZGV4fS8+KX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cblByb2dyZXNzQmFyLnByb3BUeXBlcyA9IHtcbiAgc2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJleHBvcnQgY29uc3QgQ0hBTk5FTCA9ICdDSEFOTkVMJztcbmV4cG9ydCBjb25zdCBBU1NFVF9MSVRFID0gJ0FTU0VUX0xJVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0RFVEFJTFMgPSAnQVNTRVRfREVUQUlMUyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgZmlsZVJlcXVlc3RlZCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBlcnJvciBhbmQgc3RhdHVzXG4gIGNvbnN0IGVycm9yICA9IHNob3cuZGlzcGxheUFzc2V0LmVycm9yO1xuICBjb25zdCBzdGF0dXMgPSBzaG93LmRpc3BsYXlBc3NldC5zdGF0dXM7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgZXJyb3IsXG4gICAgc3RhdHVzLFxuICAgIGFzc2V0LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uRmlsZVJlcXVlc3Q6IChuYW1lLCBjbGFpbUlkKSA9PiB7XG4gICAgICBkaXNwYXRjaChmaWxlUmVxdWVzdGVkKG5hbWUsIGNsYWltSWQpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL2dlbmVyYWwuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvYnVuZGxlL2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICBgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdFNpdGVTdGF0ZSA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4gc3RhdGUuc2l0ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RTaXRlSG9zdCA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4gc3RhdGUuc2l0ZS5ob3N0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hhdHdnLWZldGNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2hhdHdnLWZldGNoXCJcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGFwcCBkZXBlbmRlbmNpZXNcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IGV4cHJlc3NIYW5kbGViYXJzID0gcmVxdWlyZSgnZXhwcmVzcy1oYW5kbGViYXJzJyk7XG5jb25zdCBIYW5kbGViYXJzID0gcmVxdWlyZSgnaGFuZGxlYmFycycpO1xuY29uc3QgaGVsbWV0ID0gcmVxdWlyZSgnaGVsbWV0Jyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5jb25zdCB7IHNlcmlhbGl6ZVNwZWVjaFVzZXIsIGRlc2VyaWFsaXplU3BlZWNoVXNlciB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzJyk7XG5jb25zdCBjb29raWVTZXNzaW9uID0gcmVxdWlyZSgnY29va2llLXNlc3Npb24nKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG4vLyBsb2dnaW5nIGRlcGVuZGVuY2llc1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTcGVlY2hTZXJ2ZXIgKCkge1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKG15c3FsQ29uZmlnKSA9PiB7XG4gICAgcmVxdWlyZSgnLi4vY29uZmlnL215c3FsQ29uZmlnLmpzJykuY29uZmlndXJlKG15c3FsQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTaXRlID0gKHNpdGVDb25maWcpID0+IHtcbiAgICByZXF1aXJlKCcuLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpLmNvbmZpZ3VyZShzaXRlQ29uZmlnKTtcbiAgICBjb25zb2xlLmxvZyhyZXF1aXJlKCcuLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpKTtcbiAgICB0aGlzLnNlc3Npb25LZXkgPSBzaXRlQ29uZmlnLmF1dGguc2Vzc2lvbktleTtcbiAgICB0aGlzLlBPUlQgPSBzaXRlQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTbGFjayA9IChzbGFja0NvbmZpZykgPT4ge1xuICAgIHJlcXVpcmUoJy4uL2NvbmZpZy9zbGFja0NvbmZpZy5qcycpLmNvbmZpZ3VyZShzbGFja0NvbmZpZyk7XG4gIH07XG4gIHRoaXMuY3JlYXRlQXBwID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBhbiBFeHByZXNzIGFwcGxpY2F0aW9uXG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gICAgLy8gdHJ1c3QgdGhlIHByb3h5IHRvIGdldCBpcCBhZGRyZXNzIGZvciB1c1xuICAgIGFwcC5lbmFibGUoJ3RydXN0IHByb3h5Jyk7XG5cbiAgICAvLyBhZGQgbWlkZGxld2FyZVxuICAgIGFwcC51c2UoaGVsbWV0KCkpOyAvLyBzZXQgSFRUUCBoZWFkZXJzIHRvIHByb3RlY3QgYWdhaW5zdCB3ZWxsLWtub3duIHdlYiB2dWxuZXJhYmlsdGllc1xuICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMoYCR7X19kaXJuYW1lfS9wdWJsaWNgKSk7IC8vICdleHByZXNzLnN0YXRpYycgdG8gc2VydmUgc3RhdGljIGZpbGVzIGZyb20gcHVibGljIGRpcmVjdG9yeVxuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL2pzb25cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTsgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4geyAgLy8gY3VzdG9tIGxvZ2dpbmcgbWlkZGxld2FyZSB0byBsb2cgYWxsIGluY29taW5nIGh0dHAgcmVxdWVzdHNcbiAgICAgIGxvZ2dlci52ZXJib3NlKGBSZXF1ZXN0IG9uICR7cmVxLm9yaWdpbmFsVXJsfSBmcm9tICR7cmVxLmlwfWApO1xuICAgICAgbmV4dCgpO1xuICAgIH0pO1xuXG4gICAgLy8gY29uZmlndXJlIHBhc3Nwb3J0XG4gICAgcGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVTcGVlY2hVc2VyKTtcbiAgICBwYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZGVzZXJpYWxpemVTcGVlY2hVc2VyKTtcbiAgICBjb25zdCBsb2NhbFNpZ251cFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMnKTtcbiAgICBjb25zdCBsb2NhbExvZ2luU3RyYXRlZ3kgPSByZXF1aXJlKCcuL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzJyk7XG4gICAgcGFzc3BvcnQudXNlKCdsb2NhbC1zaWdudXAnLCBsb2NhbFNpZ251cFN0cmF0ZWd5KTtcbiAgICBwYXNzcG9ydC51c2UoJ2xvY2FsLWxvZ2luJywgbG9jYWxMb2dpblN0cmF0ZWd5KTtcbiAgICAvLyBpbml0aWFsaXplIHBhc3Nwb3J0XG4gICAgYXBwLnVzZShjb29raWVTZXNzaW9uKHtcbiAgICAgIG5hbWUgIDogJ3Nlc3Npb24nLFxuICAgICAga2V5cyAgOiBbdGhpcy5zZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2Utcm91dGVzLmpzJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcycpKGFwcCk7XG5cbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfTtcbiAgdGhpcy5pbml0aWFsaXplID0gKCkgPT4ge1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVMb2dnZXIuanMnKShsb2dnZXIpO1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVTbGFjay5qcycpKGxvZ2dlcik7XG4gICAgdGhpcy5jcmVhdGVBcHAoKTtcbiAgICB0aGlzLnNlcnZlciA9IGh0dHAuU2VydmVyKHRoaXMuYXBwKTtcbiAgfTtcbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCBkYiA9IHJlcXVpcmUoJy4vbW9kZWxzL2luZGV4Jyk7XG4gICAgLy8gc3luYyBzZXF1ZWxpemVcbiAgICBkYi5zZXF1ZWxpemUuc3luYygpXG4gICAgICAvLyBzdGFydCB0aGUgc2VydmVyXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VydmVyLmxpc3Rlbih0aGlzLlBPUlQsICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBQT1JUICR7dGhpcy5QT1JUfWApO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgU3RhcnR1cCBFcnJvcjpgLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3BlZWNoU2VydmVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGxvZ2dlci5kZWJ1Zygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBsb2dnZXIuZGVidWcoJ2Rlc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImF4aW9zXCJcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxicnlDb25maWcgPSB7XG4gIGFwaToge1xuICAgIGFwaUhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgIGFwaVBvcnQ6ICc1Mjc5JyxcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbGJyeUNvbmZpZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5pdmVyc2FsLWFuYWx5dGljc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIlxuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENlcnRpZmljYXRlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2VydGlmaWNhdGUnLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBrZXlUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwdWJsaWNLZXk6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2VydGlmaWNhdGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENlcnRpZmljYXRlLmJlbG9uZ3NUbyhkYi5DaGFubmVsLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChsb25nQ2hhbm5lbElkLCBjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCAke2NoYW5uZWxOYW1lfToke2xvbmdDaGFubmVsSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7bmFtZTogY2hhbm5lbE5hbWV9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwocykgZm91bmQgd2l0aCB0aGF0IGNoYW5uZWwgbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGxvbmdDaGFubmVsSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSAgIDogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtjaGFubmVsQ2xhaW1JZH0lYCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKCR7Y2hhbm5lbE5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjaGFubmVsTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS52YWxpZGF0ZUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgdmFsaWRhdGVMb25nQ2hhbm5lbElkKCR7bmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCAmJiAoY2hhbm5lbENsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDbGFpbUlkICYmIGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA8IDQwKSB7ICAvLyBpZiBhIHNob3J0IGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZShjaGFubmVsTmFtZSk7ICAvLyBpZiBubyBjaGFubmVsIGlkIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDZXJ0aWZpY2F0ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IENoYW5uZWwgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDaGFubmVsJyxcbiAgICB7XG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsQ2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENoYW5uZWwuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENoYW5uZWwuYmVsb25nc1RvKGRiLlVzZXIpO1xuICAgIENoYW5uZWwuaGFzT25lKGRiLkNlcnRpZmljYXRlKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIgfSkgPT4ge1xuICBjb25zdCBGaWxlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnRmlsZScsXG4gICAge1xuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICAgIDogSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdCAgOiAwLFxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVQYXRoOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVUeXBlOiB7XG4gICAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB0cmVuZGluZ0VsaWdpYmxlOiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgRmlsZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgRmlsZS5oYXNNYW55KGRiLlJlcXVlc3QpO1xuICAgIEZpbGUuaGFzT25lKGRiLkNsYWltKTtcbiAgfTtcblxuICBGaWxlLmdldFJlY2VudENsYWltcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWxsKHtcbiAgICAgIHdoZXJlOiB7IG5zZnc6IGZhbHNlLCB0cmVuZGluZ0VsaWdpYmxlOiB0cnVlIH0sXG4gICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICBsaW1pdDogMjUsXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEZpbGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9maWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgVEVYVCB9KSA9PiB7XG4gIGNvbnN0IFJlcXVlc3QgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdSZXF1ZXN0JyxcbiAgICB7XG4gICAgICBhY3Rpb246IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdXJsOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGlwQWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICB0eXBlICAgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBSZXF1ZXN0LmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBSZXF1ZXN0LmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJlcXVlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiY3J5cHRcIlxuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5cbmNvbnN0IHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyA9ICh1c2VySW5zdGFuY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICB1c2VySW5mb1snaWQnXSA9IHVzZXJJbnN0YW5jZS5pZDtcbiAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IHVzZXJJbnN0YW5jZS51c2VyTmFtZTtcbiAgICB1c2VySW5zdGFuY2VcbiAgICAgIC5nZXRDaGFubmVsKClcbiAgICAgIC50aGVuKCh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSkgPT4ge1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChjaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIHJldHVybiBkYi5Vc2VyXG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7dXNlck5hbWU6IHVzZXJuYW1lfSxcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZChwYXNzd29yZClcbiAgICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1Bhc3N3b3JkIHdhcyBhIG1hdGNoLCByZXR1cm5pbmcgVXNlcicpO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyh1c2VyKVxuICAgICAgICAgICAgICAudGhlbih1c2VySW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9LFxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIGZvciBzaWduIHVwXG4gIGFwcC5wb3N0KCcvc2lnbnVwJywgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1zaWdudXAnKSwgKHJlcSwgcmVzKSA9PiB7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYHN1Y2Nlc3NmdWwgc2lnbnVwIGZvciAke3JlcS51c2VyLmNoYW5uZWxOYW1lfWApO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgZm9yIGxvZyBpblxuICBhcHAucG9zdCgnL2xvZ2luJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1sb2dpbicsIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgIH1cbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2U6IGluZm8ubWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZGVidWcoJ3N1Y2Nlc3NmdWwgbG9naW4nKTtcbiAgICAgIHJlcS5sb2dJbih1c2VyLCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgc3VjY2VzcyAgICAgICA6IHRydWUsXG4gICAgICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICBzaG9ydENoYW5uZWxJZDogcmVxLnVzZXIuc2hvcnRDaGFubmVsSWQsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSkocmVxLCByZXMsIG5leHQpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gbG9nIG91dFxuICBhcHAuZ2V0KCcvbG9nb3V0JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVxLmxvZ291dCgpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiAneW91IHN1Y2Nlc3NmdWxseSBsb2dnZWQgb3V0J30pO1xuICB9KTtcbiAgLy8gc2VlIGlmIHVzZXIgaXMgYXV0aGVudGljYXRlZCwgYW5kIHJldHVybiBjcmVkZW50aWFscyBpZiBzb1xuICBhcHAuZ2V0KCcvdXNlcicsIChyZXEsIHJlcykgPT4ge1xuICAgIGlmIChyZXEudXNlcikge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS51c2VyfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbid9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyB1cGxvYWREaXJlY3RvcnkgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gbXVsdGlwYXJ0KHt1cGxvYWREaXI6IHVwbG9hZERpcmVjdG9yeX0pO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSwgcHVibGlzaCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgZ2V0Q2xhaW1MaXN0LCByZXNvbHZlVXJpLCBnZXRDbGFpbSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhLCBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCBlcnJvckhhbmRsZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCcuLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzJyk7XG5jb25zdCB7IGdldENoYW5uZWxEYXRhLCBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkobmFtZSlcbiAgICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNob3J0SWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvZGF0YS86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gICAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICAgIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICAgIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBydW4gYSBjbGFpbV9saXN0IHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihjbGFpbXNMaXN0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhbiBhc3NldFxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0obmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgICAgaWYgKCFyZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmlsZURhdGEgPSBjcmVhdGVGaWxlRGF0YShyZXNvbHZlUmVzdWx0KTtcbiAgICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZURhdGEsIHtuYW1lLCBjbGFpbUlkfSwgJ0ZpbGUnKSwgZ2V0UmVzdWx0XSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2UsIGNvbXBsZXRlZCB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9yZXNvbHZlLzpuYW1lLzpjbGFpbUlkJywgKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgICAgLnRoZW4ocmVzb2x2ZWRVcmkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHJ1biBhIHB1Ymxpc2ggcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCAoeyBib2R5LCBmaWxlcywgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCB1c2VyIH0sIHJlcykgPT4ge1xuICAgIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAgIC8vIHJlY29yZCB0aGUgc3RhcnQgdGltZSBvZiB0aGUgcmVxdWVzdFxuICAgIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgICB0cnkge1xuICAgICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAgICh7ZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZX0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMoZmlsZXMpKTtcbiAgICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIGF1dGhlbnRpY2F0ZVVzZXIoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSxcbiAgICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpLFxuICAgICAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCksXG4gICAgICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zKHRodW1ibmFpbEZpbGVQYXRoLCBuYW1lLCBsaWNlbnNlLCBuc2Z3KSxcbiAgICBdKVxuICAgICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICAgIHB1Ymxpc2godGh1bWJuYWlsUHVibGlzaFBhcmFtcywgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgICByZXR1cm4gcHVibGlzaChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICAgIGRhdGEgICA6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgICB1cmwgICAgOiBgJHtob3N0fS8ke3Jlc3VsdC5jbGFpbV9pZH0vJHtuYW1lfWAsXG4gICAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL2xvbmctaWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2JvZHk6JywgYm9keSk7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICAgIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgICBjb25zdCBjbGFpbU5hbWUgPSBib2R5LmNsYWltTmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gICAgbGV0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oY2xhaW1JbmZvID0+IHtcbiAgICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcbiAgYXBwLmdldCgnL2FwaS9maWxlL2F2YWlsYWJpbGl0eS86bmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgZGIuRmlsZS5maW5kT25lKHt3aGVyZToge25hbWUsIGNsYWltSWR9fSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS1yb3V0ZXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW11bHRpcGFydHlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIlxuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHB1Ymxpc2hIZWxwZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHByaW1hcnlDbGFpbUFkZHJlc3MsIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBPcCA9IFNlcXVlbGl6ZS5PcDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2ggKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgcHVibGlzaFJlc3VsdHMsIGNlcnRpZmljYXRlSWQsIGNoYW5uZWxOYW1lO1xuICAgICAgLy8gcHVibGlzaCB0aGUgZmlsZVxuICAgICAgcmV0dXJuIGxicnlBcGkucHVibGlzaENsYWltKHB1Ymxpc2hQYXJhbXMpXG4gICAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU3VjY2Vzc2Z1bGx5IHB1Ymxpc2hlZCAke3B1Ymxpc2hQYXJhbXMubmFtZX0gJHtmaWxlTmFtZX1gLCB0eCk7XG4gICAgICAgICAgcHVibGlzaFJlc3VsdHMgPSB0eDtcbiAgICAgICAgICAvLyBnZXQgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBpZiAocHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgdGhpcyBjbGFpbSB3YXMgcHVibGlzaGVkIGluIGNoYW5uZWw6ICR7cHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gZGIuQ2hhbm5lbC5maW5kT25lKHt3aGVyZToge2NoYW5uZWxOYW1lOiBwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX19KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCd0aGlzIGNsYWltIHdhcyBub3QgcHVibGlzaGVkIGluIGEgY2hhbm5lbCcpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgLy8gc2V0IGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gbnVsbDtcbiAgICAgICAgICBjaGFubmVsTmFtZSA9IG51bGw7XG4gICAgICAgICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBjaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUgPSBjaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoYGNlcnRpZmljYXRlSWQ6ICR7Y2VydGlmaWNhdGVJZH1gKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIEZpbGUgcmVjb3JkXG4gICAgICAgICAgY29uc3QgZmlsZVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICBmaWxlUGF0aCAgIDogcHVibGlzaFBhcmFtcy5maWxlX3BhdGgsXG4gICAgICAgICAgICBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyBjcmVhdGUgdGhlIENsYWltIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGNsYWltUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgdGh1bWJuYWlsICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGh1bWJuYWlsLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgICAgYW1vdW50ICAgICA6IHB1Ymxpc2hQYXJhbXMuYmlkLFxuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCxcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IGNyaXRlcmlhXG4gICAgICAgICAgY29uc3QgdXBzZXJ0Q3JpdGVyaWEgPSB7XG4gICAgICAgICAgICBuYW1lICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCB0aGUgcmVjb3Jkc1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVSZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnRmlsZScpLCBkYi51cHNlcnQoZGIuQ2xhaW0sIGNsYWltUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0NsYWltJyldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtmaWxlLCBjbGFpbV0pID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGUuc2V0Q2xhaW0oY2xhaW0pLCBjbGFpbS5zZXRGaWxlKGZpbGUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgICByZXNvbHZlKHB1Ymxpc2hSZXN1bHRzKTsgLy8gcmVzb2x2ZSB0aGUgcHJvbWlzZSB3aXRoIHRoZSByZXN1bHQgZnJvbSBsYnJ5QXBpLnB1Ymxpc2hDbGFpbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ1BVQkxJU0ggRVJST1InLCBlcnJvcik7XG4gICAgICAgICAgcHVibGlzaEhlbHBlcnMuZGVsZXRlVGVtcG9yYXJ5RmlsZShwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCk7IC8vIGRlbGV0ZSB0aGUgbG9jYWwgZmlsZVxuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjbGFpbU5hbWVJc0F2YWlsYWJsZSAobmFtZSkge1xuICAgIGNvbnN0IGNsYWltQWRkcmVzc2VzID0gYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIHx8IFtdO1xuICAgIGNsYWltQWRkcmVzc2VzLnB1c2gocHJpbWFyeUNsYWltQWRkcmVzcyk7XG4gICAgLy8gZmluZCBhbnkgcmVjb3JkcyB3aGVyZSB0aGUgbmFtZSBpcyB1c2VkXG4gICAgcmV0dXJuIGRiLkNsYWltXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFsnYWRkcmVzcyddLFxuICAgICAgICB3aGVyZSAgICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICBbT3Aub3JdOiBjbGFpbUFkZHJlc3NlcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2xhaW0gaXMgYWxyZWFkeSBpbiB1c2UnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IChuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkNoYW5uZWxcbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgY2hhbm5lbE5hbWU6IG5hbWUgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNoYW5uZWwgaGFzIGFscmVhZHkgYmVlbiBjbGFpbWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRoZW50aWNhdGVVc2VyIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpIHtcbiAgICAvLyBjYXNlOiBubyBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCAoYW5vbnltb3VzKSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVzZXIgdG9rZW4gaXMgcHJvdmlkZWRcbiAgICBpZiAoIWNoYW5uZWxOYW1lICYmICFjaGFubmVsSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiBudWxsLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggdXNlciB0b2tlblxuICAgIGlmICh1c2VyKSB7XG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbE5hbWUgIT09IHVzZXIuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBuYW1lIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFubmVsSWQgJiYgY2hhbm5lbElkICE9PSB1c2VyLmNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgaWQgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiB1c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCBwYXNzd29yZCBpbnN0ZWFkIG9mIHVzZXIgdG9rZW5cbiAgICBpZiAoIWNoYW5uZWxQYXNzd29yZCkgdGhyb3cgbmV3IEVycm9yKCdubyBjaGFubmVsIHBhc3N3b3JkIHByb3ZpZGVkJyk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyhjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQpO1xuICB9LFxuICBhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIHVzZXJQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBob2lzdGVkIHZhcmlhYmxlc1xuICAgICAgbGV0IGNoYW5uZWxEYXRhO1xuICAgICAgLy8gYnVpbGQgdGhlIHBhcmFtcyBmb3IgZmluZGluZyB0aGUgY2hhbm5lbFxuICAgICAgbGV0IGNoYW5uZWxGaW5kUGFyYW1zID0ge307XG4gICAgICBpZiAoY2hhbm5lbE5hbWUpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICBpZiAoY2hhbm5lbElkKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxJZDtcbiAgICAgIC8vIGZpbmQgdGhlIGNoYW5uZWxcbiAgICAgIGRiLkNoYW5uZWxcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiBjaGFubmVsRmluZFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIGNoYW5uZWwgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGFubmVsRGF0YSA9IGNoYW5uZWwuZ2V0KCk7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIGRhdGE6JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAgIHJldHVybiBkYi5Vc2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgdXNlck5hbWU6IGNoYW5uZWxEYXRhLmNoYW5uZWxOYW1lLnN1YnN0cmluZygxKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZCh1c2VyUGFzc3dvcmQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCcuLi5wYXNzd29yZCB3YXMgYSBtYXRjaC4uLicpO1xuICAgICAgICAgIHJlc29sdmUoY2hhbm5lbERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgQ0xBSU1TX1BFUl9QQUdFID0gMTI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjbGFpbXMsIHBhZ2UpIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxQYWdlcyhjbGFpbXMpO1xuICAgIGNvbnN0IHBhZ2luYXRpb25QYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0UGFnZUZyb21RdWVyeShwYWdlKTtcbiAgICBjb25zdCB2aWV3RGF0YSA9IHtcbiAgICAgIGNoYW5uZWxOYW1lICAgICAgIDogY2hhbm5lbE5hbWUsXG4gICAgICBsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltcyAgICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zKGNsYWltcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgcHJldmlvdXNQYWdlICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVQcmV2aW91c1BhZ2UocGFnaW5hdGlvblBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgICAgICAgOiBwYWdpbmF0aW9uUGFnZSxcbiAgICAgIG5leHRQYWdlICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lTmV4dFBhZ2UodG90YWxQYWdlcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgdG90YWxQYWdlcyAgICAgICAgOiB0b3RhbFBhZ2VzLFxuICAgICAgdG90YWxSZXN1bHRzICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbENsYWltcyhjbGFpbXMpLFxuICAgIH07XG4gICAgcmV0dXJuIHZpZXdEYXRhO1xuICB9LFxuICBnZXRQYWdlRnJvbVF1ZXJ5IChwYWdlKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH0sXG4gIGV4dHJhY3RQYWdlRnJvbUNsYWltcyAoY2xhaW1zLCBwYWdlTnVtYmVyKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiBbXTsgIC8vIGlmIG5vIGNsYWltcywgcmV0dXJuIHRoaXMgZGVmYXVsdFxuICAgIH1cbiAgICAvLyBsb2dnZXIuZGVidWcoJ2NsYWltcyBpcyBhcnJheT8nLCBBcnJheS5pc0FycmF5KGNsYWltcykpO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZyhgcGFnZU51bWJlciAke3BhZ2VOdW1iZXJ9IGlzIG51bWJlcj9gLCBOdW1iZXIuaXNJbnRlZ2VyKHBhZ2VOdW1iZXIpKTtcbiAgICBjb25zdCBjbGFpbVN0YXJ0SW5kZXggPSAocGFnZU51bWJlciAtIDEpICogQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IGNsYWltRW5kSW5kZXggPSBjbGFpbVN0YXJ0SW5kZXggKyBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgcGFnZU9mQ2xhaW1zID0gY2xhaW1zLnNsaWNlKGNsYWltU3RhcnRJbmRleCwgY2xhaW1FbmRJbmRleCk7XG4gICAgcmV0dXJuIHBhZ2VPZkNsYWltcztcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxQYWdlcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3RhbENsYWltcyA9IGNsYWltcy5sZW5ndGg7XG4gICAgICBpZiAodG90YWxDbGFpbXMgPCBDTEFJTVNfUEVSX1BBR0UpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBjb25zdCBmdWxsUGFnZXMgPSBNYXRoLmZsb29yKHRvdGFsQ2xhaW1zIC8gQ0xBSU1TX1BFUl9QQUdFKTtcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHRvdGFsQ2xhaW1zICUgQ0xBSU1TX1BFUl9QQUdFO1xuICAgICAgaWYgKHJlbWFpbmRlciA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnVsbFBhZ2VzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bGxQYWdlcyArIDE7XG4gICAgfVxuICB9LFxuICBkZXRlcm1pbmVQcmV2aW91c1BhZ2UgKGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlIC0gMTtcbiAgfSxcbiAgZGV0ZXJtaW5lTmV4dFBhZ2UgKHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlICsgMTtcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxDbGFpbXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGNsYWltcy5sZW5ndGg7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJjb25zdCB7IGRldGFpbHM6IGhvc3QgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnLi4vaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gcm91dGUgZm9yIHRoZSBob21lIHBhZ2VcbiAgYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gZGlzcGxheSBsb2dpbiBwYWdlXG4gIGFwcC5nZXQoJy9sb2dpbicsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2hvdyAnYWJvdXQnIHBhZ2VcbiAgYXBwLmdldCgnL2Fib3V0JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgdHJlbmRpbmcgaW1hZ2VzXG4gIGFwcC5nZXQoJy90cmVuZGluZycsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zdGF0dXMoMzAxKS5yZWRpcmVjdCgnL3BvcHVsYXInKTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9wb3B1bGFyJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgdHJlbmRpbmcgaW1hZ2VzXG4gIGFwcC5nZXQoJy9uZXcnLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG4gIGFwcC5nZXQoJy9lbWJlZC86Y2xhaW1JZC86bmFtZScsICh7IHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIC8vIGdldCBhbmQgcmVuZGVyIHRoZSBjb250ZW50XG4gICAgcmVzLnN0YXR1cygyMDApLnJlbmRlcignZW1iZWQnLCB7IGxheW91dDogJ2VtYmVkJywgaG9zdCwgY2xhaW1JZCwgbmFtZSB9KTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlLXJvdXRlcy5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPR0lOIH0gZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzJztcbmNvbnN0IHsgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkaXNhYmxlZCAgICAgICAgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWQsXG4gIGRpc2FibGVkTWVzc2FnZSAgIDogcHVibGlzaGluZy5kaXNhYmxlZE1lc3NhZ2UsXG4gIHB1Ymxpc2hJbkNoYW5uZWwgIDogZmFsc2UsXG4gIHNlbGVjdGVkQ2hhbm5lbCAgIDogTE9HSU4sXG4gIHNob3dNZXRhZGF0YUlucHV0czogZmFsc2UsXG4gIHN0YXR1cyAgICAgICAgICAgIDoge1xuICAgIHN0YXR1cyA6IG51bGwsXG4gICAgbWVzc2FnZTogbnVsbCxcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICBmaWxlICAgICAgICAgOiBudWxsLFxuICAgIHVybCAgICAgICAgICA6IG51bGwsXG4gICAgY2hhbm5lbCAgICAgIDogbnVsbCxcbiAgICBwdWJsaXNoU3VibWl0OiBudWxsLFxuICB9LFxuICBmaWxlICAgIDogbnVsbCxcbiAgY2xhaW0gICA6ICcnLFxuICBtZXRhZGF0YToge1xuICAgIHRpdGxlICAgICAgOiAnJyxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgbGljZW5zZSAgICA6ICcnLFxuICAgIG5zZncgICAgICAgOiBmYWxzZSxcbiAgfSxcbiAgdGh1bWJuYWlsOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5GSUxFX1NFTEVDVEVEOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGluaXRpYWxTdGF0ZSwgeyAgLy8gbm90ZTogY2xlYXJzIHRvIGluaXRpYWwgc3RhdGVcbiAgICAgICAgZmlsZTogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9DTEVBUjpcbiAgICAgIHJldHVybiBpbml0aWFsU3RhdGU7XG4gICAgY2FzZSBhY3Rpb25zLk1FVEFEQVRBX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBtZXRhZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubWV0YWRhdGEsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5DTEFJTV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2xhaW06IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUw6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcHVibGlzaEluQ2hhbm5lbDogYWN0aW9uLmNoYW5uZWwsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUFVCTElTSF9TVEFUVVNfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRVJST1JfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGVycm9yOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5lcnJvciwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5uYW1lXTogYWN0aW9uLmRhdGEudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHNlbGVjdGVkQ2hhbm5lbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzaG93TWV0YWRhdGFJbnB1dHM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRIVU1CTkFJTF9ORVc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgdGh1bWJuYWlsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwiZXhwb3J0IGNvbnN0IExPR0lOID0gJ0V4aXN0aW5nJztcbmV4cG9ydCBjb25zdCBDUkVBVEUgPSAnTmV3JztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbG9nZ2VkSW5DaGFubmVsOiB7XG4gICAgbmFtZSAgIDogbnVsbCxcbiAgICBzaG9ydElkOiBudWxsLFxuICAgIGxvbmdJZCA6IG51bGwsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGxvZ2dlZEluQ2hhbm5lbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvY2hhbm5lbC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBFUlJPUiB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcmVxdWVzdDoge1xuICAgIGVycm9yOiBudWxsLFxuICAgIHR5cGUgOiBudWxsLFxuICAgIGlkICAgOiBudWxsLFxuICB9LFxuICByZXF1ZXN0TGlzdCA6IHt9LFxuICBjaGFubmVsTGlzdCA6IHt9LFxuICBhc3NldExpc3QgICA6IHt9LFxuICBkaXNwbGF5QXNzZXQ6IHtcbiAgICBlcnJvciA6IG51bGwsXG4gICAgc3RhdHVzOiBMT0NBTF9DSEVDSyxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvLyBoYW5kbGUgcmVxdWVzdFxuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICB0eXBlOiBhY3Rpb24uZGF0YS5yZXF1ZXN0VHlwZSxcbiAgICAgICAgICBpZCAgOiBhY3Rpb24uZGF0YS5yZXF1ZXN0SWQsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gc3RvcmUgcmVxdWVzdHNcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0TGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBrZXkgIDogYWN0aW9uLmRhdGEua2V5LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gYXNzZXQgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5BU1NFVF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgYXNzZXRMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hc3NldExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvciAgICA6IGFjdGlvbi5kYXRhLmVycm9yLFxuICAgICAgICAgICAgbmFtZSAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgOiBhY3Rpb24uZGF0YS5jbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRJZCAgOiBhY3Rpb24uZGF0YS5zaG9ydElkLFxuICAgICAgICAgICAgY2xhaW1EYXRhOiBhY3Rpb24uZGF0YS5jbGFpbURhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBjaGFubmVsIGRhdGFcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgbmFtZSAgICAgIDogYWN0aW9uLmRhdGEubmFtZSxcbiAgICAgICAgICAgIGxvbmdJZCAgICA6IGFjdGlvbi5kYXRhLmxvbmdJZCxcbiAgICAgICAgICAgIHNob3J0SWQgICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbXNEYXRhOiBhY3Rpb24uZGF0YS5jbGFpbXNEYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNoYW5uZWxMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3RbYWN0aW9uLmRhdGEuY2hhbm5lbExpc3RJZF0sIHtcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gZGlzcGxheSBhbiBhc3NldFxuICAgIGNhc2UgYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5ESVNQTEFZX0FTU0VUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlBc3NldDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGlzcGxheUFzc2V0LCB7XG4gICAgICAgICAgZXJyb3IgOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgICBzdGF0dXM6IEVSUk9SLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9zaG93LmpzIiwiY29uc3Qgc2l0ZUNvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IHtcbiAgYW5hbHl0aWNzOiB7XG4gICAgZ29vZ2xlSWQ6IGdvb2dsZUFuYWx5dGljc0lkLFxuICB9LFxuICBhc3NldERlZmF1bHRzOiB7XG4gICAgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIGRlc2NyaXB0aW9uOiBkZWZhdWx0RGVzY3JpcHRpb24sXG4gIH0sXG4gIGRldGFpbHM6IHtcbiAgICBkZXNjcmlwdGlvbixcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICAgIHR3aXR0ZXIsXG4gIH0sXG59ID0gc2l0ZUNvbmZpZztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkZXNjcmlwdGlvbixcbiAgZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIGhvc3QsXG4gIHRpdGxlLFxuICB0d2l0dGVyLFxuICBkZWZhdWx0RGVzY3JpcHRpb24sXG4gIGRlZmF1bHRUaHVtYm5haWwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1nYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWdhXCJcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9jYW5vbmljYWxMaW5rXCI6IDE4LFxuXHRcIi4vY2Fub25pY2FsTGluay5qc1wiOiAxOCxcblx0XCIuL2R5bmFtaWNJbXBvcnRcIjogMTcsXG5cdFwiLi9keW5hbWljSW1wb3J0LmpzXCI6IDE3LFxuXHRcIi4vZmlsZVwiOiA0Myxcblx0XCIuL2ZpbGUuanNcIjogNDMsXG5cdFwiLi9sYnJ5VXJpXCI6IDE5LFxuXHRcIi4vbGJyeVVyaS5qc1wiOiAxOSxcblx0XCIuL21ldGFUYWdzXCI6IDIwLFxuXHRcIi4vbWV0YVRhZ3MuanNcIjogMjAsXG5cdFwiLi9wYWdlVGl0bGVcIjogMjEsXG5cdFwiLi9wYWdlVGl0bGUuanNcIjogMjEsXG5cdFwiLi9wdWJsaXNoXCI6IDQ0LFxuXHRcIi4vcHVibGlzaC5qc1wiOiA0NCxcblx0XCIuL3JlcXVlc3RcIjogNixcblx0XCIuL3JlcXVlc3QuanNcIjogNixcblx0XCIuL3ZhbGlkYXRlXCI6IDQ1LFxuXHRcIi4vdmFsaWRhdGUuanNcIjogNDVcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA4OTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NsaWVudC91dGlscyBeLiokXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuXG5jbGFzcyBBYm91dFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0Fib3V0J30gcGFnZVVyaT17J2Fib3V0J30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0ncHVsbC1xdW90ZSc+U3BlZS5jaCBpcyBhbiBvcGVuLXNvdXJjZSBwcm9qZWN0LiAgUGxlYXNlIGNvbnRyaWJ1dGUgdG8gdGhlIGV4aXN0aW5nIHNpdGUsIG9yIGZvcmsgaXQgYW5kIG1ha2UgeW91ciBvd24uPC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3R3aXR0ZXIuY29tL3NwZWVfY2gnPlRXSVRURVI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPkdJVEhVQjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJz5ESVNDT1JEIENIQU5ORUw8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gvYmxvYi9tYXN0ZXIvUkVBRE1FLm1kJz5ET0NVTUVOVEFUSU9OPC9hPjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIG1lZGlhLWhvc3Rpbmcgc2l0ZSB0aGF0IHJlYWRzIGZyb20gYW5kIHB1Ymxpc2hlcyBjb250ZW50IHRvIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pbyc+TEJSWTwvYT4gYmxvY2tjaGFpbi48L3A+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBob3N0aW5nIHNlcnZpY2UsIGJ1dCB3aXRoIHRoZSBhZGRlZCBiZW5lZml0IHRoYXQgaXQgc3RvcmVzIHlvdXIgY29udGVudCBvbiBhIGRlY2VudHJhbGl6ZWQgbmV0d29yayBvZiBjb21wdXRlcnMgLS0gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2dldCc+TEJSWTwvYT4gbmV0d29yay4gIFRoaXMgbWVhbnMgdGhhdCB5b3VyIGltYWdlcyBhcmUgc3RvcmVkIGluIG11bHRpcGxlIGxvY2F0aW9ucyB3aXRob3V0IGEgc2luZ2xlIHBvaW50IG9mIGZhaWx1cmUuPC9wPlxuICAgICAgICAgICAgICA8aDM+Q29udHJpYnV0ZTwvaDM+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSBoYXZlIGFuIGlkZWEgZm9yIHlvdXIgb3duIHNwZWUuY2gtbGlrZSBzaXRlIG9uIHRvcCBvZiBMQlJZLCBmb3JrIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+Z2l0aHViIHJlcG88L2E+IGFuZCBnbyB0byB0b3duITwvcD5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IHdhbnQgdG8gaW1wcm92ZSBzcGVlLmNoLCBqb2luIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJz5kaXNjb3JkIGNoYW5uZWw8L2E+IG9yIHNvbHZlIG9uZSBvZiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gvaXNzdWVzJz5naXRodWIgaXNzdWVzPC9hPi48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBYm91dFBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvQWJvdXRQYWdlL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOYXZMaW5rLCB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgTG9nbyBmcm9tICdjb21wb25lbnRzL0xvZ28nO1xuaW1wb3J0IE5hdkJhckNoYW5uZWxEcm9wZG93biBmcm9tICdjb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24nO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNvbnN0IFZJRVcgPSAnVklFVyc7XG5jb25zdCBMT0dPVVQgPSAnTE9HT1VUJztcblxuY2xhc3MgTmF2QmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIgPSB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dvdXRVc2VyID0gdGhpcy5sb2dvdXRVc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24gPSB0aGlzLmhhbmRsZVNlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW5cbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyKCk7XG4gIH1cbiAgY2hlY2tGb3JMb2dnZWRJblVzZXIgKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfTtcbiAgICByZXF1ZXN0KCcvdXNlcicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGRhdGEuY2hhbm5lbE5hbWUsIGRhdGEuc2hvcnRDaGFubmVsSWQsIGRhdGEuY2hhbm5lbENsYWltSWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcvdXNlciBlcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIGxvZ291dFVzZXIgKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfTtcbiAgICByZXF1ZXN0KCcvbG9nb3V0JywgcGFyYW1zKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ291dCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcvbG9nb3V0IGVycm9yJywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBoYW5kbGVTZWxlY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgTE9HT1VUOlxuICAgICAgICB0aGlzLmxvZ291dFVzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZJRVc6XG4gICAgICAgIC8vIHJlZGlyZWN0IHRvIGNoYW5uZWwgcGFnZVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgLyR7dGhpcy5wcm9wcy5jaGFubmVsTmFtZX06JHt0aGlzLnByb3BzLmNoYW5uZWxMb25nSWR9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzaXRlRGVzY3JpcHRpb24gfSA9ICB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBuYXYtYmFyJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXNob3J0IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tY2VudGVyJz5cbiAgICAgICAgICA8TG9nbyAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1jZW50ZXInPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSduYXYtYmFyLXRhZ2xpbmUnPntzaXRlRGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1yaWdodCc+XG4gICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy8nIGV4YWN0PlB1Ymxpc2g8L05hdkxpbms+XG4gICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnICBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvYWJvdXQnPkFib3V0PC9OYXZMaW5rPlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoYW5uZWxOYW1lID8gKFxuICAgICAgICAgICAgICA8TmF2QmFyQ2hhbm5lbERyb3Bkb3duXG4gICAgICAgICAgICAgICAgY2hhbm5lbE5hbWU9e3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9XG4gICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0aW9uPXt0aGlzLmhhbmRsZVNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0aW9uPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIFZJRVc9e1ZJRVd9XG4gICAgICAgICAgICAgICAgTE9HT1VUPXtMT0dPVVR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TmF2TGluayBpZD0nbmF2LWJhci1sb2dpbi1saW5rJyBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy9sb2dpbic+Q2hhbm5lbDwvTmF2TGluaz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKE5hdkJhcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5mdW5jdGlvbiBMb2dvICgpIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZlcnNpb249JzEuMScgaWQ9J0xheWVyXzEnIHg9JzBweCcgeT0nMHB4JyBoZWlnaHQ9JzI0cHgnIHZpZXdCb3g9JzAgMCA4MCAzMScgZW5hYmxlQmFja2dyb3VuZD0nbmV3IDAgMCA4MCAzMScgY2xhc3NOYW1lPSduYXYtYmFyLWxvZ28nPlxuICAgICAgPExpbmsgdG89Jy8nPlxuICAgICAgICA8dGl0bGU+TG9nbzwvdGl0bGU+XG4gICAgICAgIDxkZXNjPlNwZWUuY2ggbG9nbzwvZGVzYz5cbiAgICAgICAgPGcgaWQ9J0Fib3V0Jz5cbiAgICAgICAgICA8ZyBpZD0nUHVibGlzaC1Gb3JtLVYyLV94MjhfZmlsbGVkX3gyOV8nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC00Mi4wMDAwMDAsIC0yMy4wMDAwMDApJz5cbiAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNDIuMDAwMDAwLCAyMi4wMDAwMDApJz5cbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPSdtYXRyaXgoMSAwIDAgMSAwIDIwKScgZm9udFNpemU9JzI1JyBmb250RmFtaWx5PSdSb2JvdG8nPlNwZWUmbHQ7aDwvdGV4dD5cbiAgICAgICAgICAgICAgPGcgaWQ9J0dyb3VwLTE2JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMzAuMDAwMDAwKSc+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDlGOTExJyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHknIGZpbGw9J25vbmUnIHN0cm9rZT0nIzAyOUQ3NCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTE2LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS0yJyBmaWxsPSdub25lJyBzdHJva2U9JyNFMzVCRDgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00zMi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMycgZmlsbD0nbm9uZScgc3Ryb2tlPScjNDE1NkM1JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNNDguNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTQnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzYzNTY4OCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTY0LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L0xpbms+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBOYXZCYXJDaGFubmVsRHJvcGRvd24gKHsgY2hhbm5lbE5hbWUsIGhhbmRsZVNlbGVjdGlvbiwgZGVmYXVsdFNlbGVjdGlvbiwgVklFVywgTE9HT1VUIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93IGxpbmstLW5hdicgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdGlvbn0gdmFsdWU9e2RlZmF1bHRTZWxlY3Rpb259PlxuICAgICAgPG9wdGlvbiBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e2NoYW5uZWxOYW1lfTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17VklFV30+Vmlldzwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17TE9HT1VUfT5Mb2dvdXQ8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkJhckNoYW5uZWxEcm9wZG93bjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGNyZWF0ZVBhZ2VUaXRsZSB9IGZyb20gJ3V0aWxzL3BhZ2VUaXRsZSc7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGFncyB9IGZyb20gJ3V0aWxzL21ldGFUYWdzJztcbmltcG9ydCB7IGNyZWF0ZUNhbm9uaWNhbExpbmsgfSBmcm9tICd1dGlscy9jYW5vbmljYWxMaW5rJztcblxuY2xhc3MgU0VPIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICAvLyBwcm9wcyBmcm9tIHN0YXRlXG4gICAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gcHJvcHMgZnJvbSBwYXJlbnRcbiAgICBjb25zdCB7IGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCB7IHBhZ2VUaXRsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjcmVhdGUgcGFnZSB0aXRsZSwgdGFncywgYW5kIGNhbm9uaWNhbCBsaW5rXG4gICAgcGFnZVRpdGxlID0gY3JlYXRlUGFnZVRpdGxlKHNpdGVUaXRsZSwgcGFnZVRpdGxlKTtcbiAgICBjb25zdCBtZXRhVGFncyA9IGNyZWF0ZU1ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgIGNvbnN0IGNhbm9uaWNhbExpbmsgPSBjcmVhdGVDYW5vbmljYWxMaW5rKGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpLCBzaXRlSG9zdCk7XG4gICAgLy8gcmVuZGVyIHJlc3VsdHNcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldFxuICAgICAgICB0aXRsZT17cGFnZVRpdGxlfVxuICAgICAgICBtZXRhPXttZXRhVGFnc31cbiAgICAgICAgbGluaz17W3tyZWw6ICdjYW5vbmljYWwnLCBocmVmOiBjYW5vbmljYWxMaW5rfV19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblNFTy5wcm9wVHlwZXMgPSB7XG4gIHBhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGFnZVVyaSAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGFubmVsICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIGFzc2V0ICAgIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNFTztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZTogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5cbmNsYXNzIExvZ2luUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgLy8gcmUtcm91dGUgdGhlIHVzZXIgdG8gdGhlIGhvbWVwYWdlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICAgIGlmIChuZXdQcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICE9PSB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUpIHtcbiAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvYCk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnTG9naW4nfSBwYWdlVXJpPXsnbG9naW4nfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+Q2hhbm5lbHMgYWxsb3cgeW91IHRvIHB1Ymxpc2ggYW5kIGdyb3VwIGNvbnRlbnQgdW5kZXIgYW4gaWRlbnRpdHkuIFlvdSBjYW4gY3JlYXRlIGEgY2hhbm5lbCBmb3IgeW91cnNlbGYsIG9yIHNoYXJlIG9uZSB3aXRoIGxpa2UtbWluZGVkIGZyaWVuZHMuICBZb3UgY2FuIGNyZWF0ZSAxIGNoYW5uZWwsIG9yIDEwMCwgc28gd2hldGhlciB5b3UncmUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRhbG9uaWEyMDE3OjQzZGNmNDcxNjNjYWEyMWQ4NDA0ZDlmZTliMzBmNzhlZjNlMTQ2YTgnPmRvY3VtZW50aW5nIGltcG9ydGFudCBldmVudHM8L2E+LCBvciBtYWtpbmcgYSBwdWJsaWMgcmVwb3NpdG9yeSBmb3IgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRHaWZzJz5jYXQgZ2lmczwvYT4gKHBhc3N3b3JkOiAnMTIzNCcpLCB0cnkgY3JlYXRpbmcgYSBjaGFubmVsIGZvciBpdCE8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkxvZyBpbiB0byBhbiBleGlzdGluZyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsTG9naW5Gb3JtIC8+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkNyZWF0ZSBhIGJyYW5kIG5ldyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ3JlYXRlRm9ybSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihMb2dpblBhZ2UpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICcuLi8uLi9hY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxMb2dpbkZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgbmFtZSAgICA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ2luVG9DaGFubmVsID0gdGhpcy5sb2dpblRvQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgbG9naW5Ub0NoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWU6IHRoaXMuc3RhdGUubmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJlcXVlc3QoJ2xvZ2luJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHtzdWNjZXNzLCBjaGFubmVsTmFtZSwgc2hvcnRDaGFubmVsSWQsIGNoYW5uZWxDbGFpbUlkLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbWVzc2FnZX0pO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIGlkPSdjaGFubmVsLWxvZ2luLWZvcm0nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1sb2dpbi1uYW1lLWlucHV0Jz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20nPlxuICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBuYW1lPSduYW1lJyBwbGFjZWhvbGRlcj0nWW91ciBDaGFubmVsIE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxOYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnID5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBpZD0nY2hhbm5lbC1sb2dpbi1wYXNzd29yZC1pbnB1dCcgbmFtZT0ncGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbFBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkVudGVyIHRoZSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5sb2dpblRvQ2hhbm5lbH0+QXV0aGVudGljYXRlPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbExvZ2luRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY2xhc3MgQ2hhbm5lbENyZWF0ZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgY2hhbm5lbCA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgc3RhdHVzICA6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dCA9IHRoaXMuaGFuZGxlQ2hhbm5lbElucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNyZWF0ZUNoYW5uZWwgPSB0aGlzLmNyZWF0ZUNoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBjbGVhbnNlQ2hhbm5lbElucHV0IChpbnB1dCkge1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxzKy9nLCAnLScpOyAvLyByZXBsYWNlIHNwYWNlcyB3aXRoIGRhc2hlc1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTktXS9nLCAnJyk7ICAvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksIG9yICctJ1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBoYW5kbGVDaGFubmVsSW5wdXQgKGV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5jbGVhbnNlQ2hhbm5lbElucHV0KHZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtjaGFubmVsOiB2YWx1ZX0pO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ1BsZWFzZSBlbnRlciBhIGNoYW5uZWwgbmFtZSd9KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1tuYW1lXTogdmFsdWV9KTtcbiAgfVxuICB1cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXF1ZXN0KGAvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LyR7Y2hhbm5lbFdpdGhBdFN5bWJvbH1gKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBudWxsfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICB9KTtcbiAgfVxuICBjaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSAoY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxXaXRoQXRTeW1ib2wgPSBgQCR7Y2hhbm5lbH1gO1xuICAgIHJldHVybiByZXF1ZXN0KGAvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LyR7Y2hhbm5lbFdpdGhBdFN5bWJvbH1gKTtcbiAgfVxuICBjaGVja0lzUGFzc3dvcmRQcm92aWRlZCAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFwYXNzd29yZCB8fCBwYXNzd29yZC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIHBhc3N3b3JkJykpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG4gIG1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QgKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZSwgcGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0KCcvc2lnbnVwJywgcGFyYW1zKVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVW5mb3J0dW5hdGVseSwgd2UgZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgY3JlYXRpbmcgeW91ciBjaGFubmVsLiBQbGVhc2UgbGV0IHVzIGtub3cgaW4gRGlzY29yZCEgJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgY3JlYXRlQ2hhbm5lbCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQodGhpcy5zdGF0ZS5wYXNzd29yZClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUodGhpcy5zdGF0ZS5jaGFubmVsKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogJ1dlIGFyZSBwdWJsaXNoaW5nIHlvdXIgbmV3IGNoYW5uZWwuICBTaXQgdGlnaHQuLi4nfSk7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QodGhpcy5zdGF0ZS5jaGFubmVsLCB0aGlzLnN0YXRlLnBhc3N3b3JkKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihyZXN1bHQuY2hhbm5lbE5hbWUsIHJlc3VsdC5zaG9ydENoYW5uZWxJZCwgcmVzdWx0LmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiBudWxsfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgeyAhdGhpcy5zdGF0ZS5zdGF0dXMgPyAoXG4gICAgICAgICAgPGZvcm0gaWQ9J3B1Ymxpc2gtY2hhbm5lbC1mb3JtJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J25ldy1jaGFubmVsLW5hbWUnPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tIHNwYW4tLXJlbGF0aXZlJz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nY2hhbm5lbCcgaWQ9J25ldy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9J2V4YW1wbGVDaGFubmVsTmFtZScgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbm5lbElucHV0fSAvPlxuICAgICAgICAgICAgICAgICAgeyAodGhpcy5zdGF0ZS5jaGFubmVsICYmICF0aGlzLnN0YXRlLmVycm9yKSAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1zdWNjZXNzIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTMnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxNid9PC9zcGFuPiB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1wYXNzd29yZCc+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgbmFtZT0ncGFzc3dvcmQnIGlkPSduZXctY2hhbm5lbC1wYXNzd29yZCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyAgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgPyAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+Q2hvb3NlIGEgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMuY3JlYXRlQ2hhbm5lbH0+Q3JlYXRlIENoYW5uZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz57dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ3JlYXRlRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJbmFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0taW5hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluYWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZXJyb3IgICAgICA6IHNob3cucmVxdWVzdC5lcnJvcixcbiAgICByZXF1ZXN0VHlwZTogc2hvdy5yZXF1ZXN0LnR5cGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uSGFuZGxlU2hvd1BhZ2VVcmksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgU2hvd0Fzc2V0TGl0ZSBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldExpdGUnO1xuaW1wb3J0IFNob3dBc3NldERldGFpbHMgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzJztcbmltcG9ydCBTaG93Q2hhbm5lbCBmcm9tICdjb250YWluZXJzL1Nob3dDaGFubmVsJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG5jbGFzcyBTaG93UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMubWF0Y2gucGFyYW1zICE9PSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcykge1xuICAgICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHJlcXVlc3RUeXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEVycm9yUGFnZSBlcnJvcj17ZXJyb3J9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBzd2l0Y2ggKHJlcXVlc3RUeXBlKSB7XG4gICAgICBjYXNlIENIQU5ORUw6XG4gICAgICAgIHJldHVybiA8U2hvd0NoYW5uZWwgLz47XG4gICAgICBjYXNlIEFTU0VUX0xJVEU6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0TGl0ZSAvPjtcbiAgICAgIGNhc2UgQVNTRVRfREVUQUlMUzpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXREZXRhaWxzIC8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxwPmxvYWRpbmcuLi48L3A+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd1BhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5cbmNsYXNzIFNob3dMaXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGE7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyIHNob3ctbGl0ZS1jb250YWluZXInPlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgIDxMaW5rIGlkPSdhc3NldC1ib2lsZXJwYXRlJyBjbGFzc05hbWU9J2xpbmstLXByaW1hcnkgZmluZS1wcmludCcgdG89e2AvJHtjbGFpbUlkfS8ke25hbWV9YH0+aG9zdGVkXG4gICAgICAgICAgICB2aWEgU3BlZS5jaDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwPmxvYWRpbmcgYXNzZXQgZGF0YS4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dMaXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgeyBMT0NBTF9DSEVDSywgVU5BVkFJTEFCTEUsIEVSUk9SLCBBVkFJTEFCTEUgfSBmcm9tICdjb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMnO1xuXG5jbGFzcyBBc3NldERpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vbkZpbGVSZXF1ZXN0KG5hbWUsIGNsYWltSWQpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIGVycm9yLCBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgY29udGVudFR5cGUsIGZpbGVFeHQsIHRodW1ibmFpbCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J2Fzc2V0LWRpc3BsYXktY29tcG9uZW50Jz5cbiAgICAgICAgeyhzdGF0dXMgPT09IExPQ0FMX0NIRUNLKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPkNoZWNraW5nIHRvIHNlZSBpZiBTcGVlLmNoIGhhcyB5b3VyIGFzc2V0IGxvY2FsbHkuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBVTkFWQUlMQUJMRSkgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5TaXQgdGlnaHQsIHdlJ3JlIHNlYXJjaGluZyB0aGUgTEJSWSBibG9ja2NoYWluIGZvciB5b3VyIGFzc2V0ITwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPHA+Q3VyaW91cyB3aGF0IG1hZ2ljIGlzIGhhcHBlbmluZyBoZXJlPyA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9mYXEvd2hhdC1pcy1sYnJ5Jz5MZWFybiBtb3JlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBFUlJPUikgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5VbmZvcnR1bmF0ZWx5LCB3ZSBjb3VsZG4ndCBkb3dubG9hZCB5b3VyIGFzc2V0IGZyb20gTEJSWS4gIFlvdSBjYW4gaGVscCB1cyBvdXQgYnkgc2hhcmluZyB0aGUgYmVsb3cgZXJyb3IgbWVzc2FnZSBpbiB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUycgdGFyZ2V0PSdfYmxhbmsnPkxCUlkgZGlzY29yZDwvYT4uPC9wPlxuICAgICAgICAgIDxpPjxwIGlkPSdlcnJvci1tZXNzYWdlJz57ZXJyb3J9PC9wPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEFWQUlMQUJMRSkgJiZcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfSAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dmlkZW8gY2xhc3NOYW1lPSdhc3NldCB2aWRlbycgY29udHJvbHMgcG9zdGVyPXt0aHVtYm5haWx9PlxuICAgICAgICAgICAgICAgICAgPHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxwPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT52aWRlbzwvY29kZT4gZWxlbWVudC48L3A+XG4gICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+VW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldERpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgQXNzZXRUaXRsZSBmcm9tICdjb250YWluZXJzL0Fzc2V0VGl0bGUnO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5pbXBvcnQgQXNzZXRJbmZvIGZyb20gJ2NvbnRhaW5lcnMvQXNzZXRJbmZvJztcblxuY2xhc3MgU2hvd0Fzc2V0RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXNzZXQpIHtcbiAgICAgIGNvbnN0IHsgY2xhaW1EYXRhOiB7IG5hbWUgfSB9ID0gYXNzZXQ7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtgJHtuYW1lfSAtIGRldGFpbHNgfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxBc3NldFRpdGxlIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCBzaG93LWRldGFpbHMtY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICA8QXNzZXREaXNwbGF5IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgICAgICA8QXNzZXRJbmZvIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBhc3NldCBkYXRhLi4uJ30gLz5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93QXNzZXREZXRhaWxzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YTogeyB0aXRsZSB9IH0gPSBzZWxlY3RBc3NldChzaG93KTtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBc3NldFRpdGxlID0gKHsgdGl0bGUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtLWxhcmdlJz57dGl0bGV9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRUaXRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIEFzc2V0SW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNvcHlUb0NsaXBib2FyZCA9IHRoaXMuY29weVRvQ2xpcGJvYXJkLmJpbmQodGhpcyk7XG4gIH1cbiAgY29weVRvQ2xpcGJvYXJkIChldmVudCkge1xuICAgIHZhciBlbGVtZW50VG9Db3B5ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuZWxlbWVudHRvY29weTtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb0NvcHkpO1xuICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ09vcHMsIHVuYWJsZSB0byBjb3B5J30pO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgc2hvcnRJZCwgY2xhaW1EYXRhIDogeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgZGVzY3JpcHRpb24sIG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwsIGhvc3QgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7Y2hhbm5lbE5hbWUgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+Q2hhbm5lbDo8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz48TGluayB0bz17YC8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9YH0+e2NoYW5uZWxOYW1lfTwvTGluaz48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAge2Rlc2NyaXB0aW9uICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPntkZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgPGRpdiBpZD0nc2hvdy1zaGFyZS1idXR0b25zJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSBmbGV4LWNvbnRhaW5lci0td3JhcCc+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT50d2l0dGVyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PmZhY2Vib29rPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwOi8vdHVtYmxyLmNvbS93aWRnZXRzL3NoYXJlL3Rvb2w/Y2Fub25pY2FsVXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHVtYmxyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5yZWRkaXQuY29tL3N1Ym1pdD91cmw9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0mdGl0bGU9JHtuYW1lfWB9PnJlZGRpdDwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hvcnQtbGluayc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+TGluazo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1zaG9ydC1saW5rJyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nc2hvcnQtbGluaycgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Ake2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEnIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTInPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLXdpZGUnIGRhdGEtZWxlbWVudHRvY29weT0nc2hvcnQtbGluaydcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jb3B5VG9DbGlwYm9hcmR9PmNvcHlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBpZD0nc2hvdy1lbWJlZC1jb2RlJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5FbWJlZDo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1lbWJlZC10ZXh0JyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHsoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnKSA/IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPHZpZGVvIHdpZHRoPVwiMTAwJVwiIGNvbnRyb2xzIHBvc3Rlcj1cIiR7dGh1bWJuYWlsfVwiIHNyYz1cIiR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1cIi8+PC92aWRlbz5gfSAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPGltZyBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPmB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J2VtYmVkLXRleHQnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tYm90dG9tJz5cbiAgICAgICAgICA8TGluayBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRvPXtgLyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0+PHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dCc+RGlyZWN0IExpbms8L3NwYW4+PC9MaW5rPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj17YCR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfSBkb3dubG9hZD17bmFtZX0+RG93bmxvYWQ8L2E+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2RtY2EnPlJlcG9ydDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0SW5mbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCByZXF1ZXN0XG4gIGNvbnN0IHByZXZpb3VzUmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICAvLyBzZWxlY3QgY2hhbm5lbFxuICBsZXQgY2hhbm5lbDtcbiAgaWYgKHByZXZpb3VzUmVxdWVzdCkge1xuICAgIGNvbnN0IGNoYW5uZWxLZXkgPSBwcmV2aW91c1JlcXVlc3Qua2V5O1xuICAgIGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsQ2xhaW1zRGlzcGxheSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5JztcblxuY2xhc3MgU2hvd0NoYW5uZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBsb25nSWQsIHNob3J0SWQgfSA9IGNoYW5uZWw7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBjaGFubmVsPXtjaGFubmVsfSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8aDI+Y2hhbm5lbCBuYW1lOiB7bmFtZX08L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eydmaW5lLXByaW50J30+ZnVsbCBjaGFubmVsIGlkOiB7bG9uZ0lkfTwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PnNob3J0IGNoYW5uZWwgaWQ6IHtzaG9ydElkfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDbGFpbXNEaXNwbGF5IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGNoYW5uZWwgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0NoYW5uZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvblVwZGF0ZUNoYW5uZWxDbGFpbXMgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGtleVxuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtzaG93LnJlcXVlc3QuaWRdO1xuICBjb25zdCBjaGFubmVsS2V5ID0gcmVxdWVzdC5rZXk7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGNsYWltc1xuICBjb25zdCBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsS2V5LFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uVXBkYXRlQ2hhbm5lbENsYWltcyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFzc2V0UHJldmlldyBmcm9tICdjb21wb25lbnRzL0Fzc2V0UHJldmlldyc7XG5cbmNsYXNzIENoYW5uZWxDbGFpbXNEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gIH1cbiAgc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgLSAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UocHJldmlvdXNQYWdlKTtcbiAgfVxuICBzaG93TmV4dFJlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgKyAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UobmV4dFBhZ2UpO1xuICB9XG4gIHNob3dOZXdQYWdlIChwYWdlKSB7XG4gICAgY29uc3QgeyBjaGFubmVsS2V5LCBjaGFubmVsOiB7IG5hbWUsIGxvbmdJZCB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25VcGRhdGVDaGFubmVsQ2xhaW1zKGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjbGFpbXMsIGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwnPlxuICAgICAgICB7KGNsYWltcy5sZW5ndGggPiAwKSA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge2NsYWltcy5tYXAoKGNsYWltLCBpbmRleCkgPT4gPEFzc2V0UHJldmlld1xuICAgICAgICAgICAgICBjbGFpbURhdGE9e2NsYWltfVxuICAgICAgICAgICAgICBrZXk9e2Ake2NsYWltLm5hbWV9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgIC8+KX1cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPiAxKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZX0+UHJldmlvdXMgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlfT5OZXh0IFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+VGhlcmUgYXJlIG5vIGNsYWltcyBpbiB0aGlzIGNoYW5uZWw8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ2xhaW1zRGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7c2l0ZToge2RlZmF1bHRzOiB7IGRlZmF1bHRUaHVtYm5haWwgfX19KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNvbnN0IEFzc2V0UHJldmlldyA9ICh7IGRlZmF1bHRUaHVtYm5haWwsIGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsIH0gfSkgPT4ge1xuICBjb25zdCBkaXJlY3RTb3VyY2VMaW5rID0gYCR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YDtcbiAgY29uc3Qgc2hvd1VybExpbmsgPSBgLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2Fzc2V0LWhvbGRlcic+XG4gICAgICA8TGluayB0bz17c2hvd1VybExpbmt9ID5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e2RpcmVjdFNvdXJjZUxpbmt9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyB2aWRlbyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e3RodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPnVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCl9XG4gICAgICA8L0xpbms+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZTogeyBob3N0LCB0aXRsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jbGFzcyBGb3VyT2hGb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7dGl0bGUsIGhvc3R9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfSAtIDQwNDwvdGl0bGU+XG4gICAgICAgICAgPGxpbmsgcmVsPSdjYW5vbmljYWwnIGhyZWY9e2Ake2hvc3R9LzQwNGB9IC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxoMj40MDQ8L2gyPlxuICAgICAgICAgIDxwPlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3VyT2hGb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7IGRldGVybWluZVJlc3BvbnNlVHlwZSwgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSwgbG9nUmVxdWVzdERhdGEsIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIHRvIHNlcnZlIGEgc3BlY2lmaWMgYXNzZXQgdXNpbmcgdGhlIGNoYW5uZWwgb3IgY2xhaW0gaWRcbiAgYXBwLmdldCgnLzppZGVudGlmaWVyLzpjbGFpbScsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICAgIHRyeSB7XG4gICAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICAgIH1cbiAgICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAgIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICAgIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgICBsZXQgY2xhaW1OYW1lO1xuICAgIHRyeSB7XG4gICAgICAoeyBjbGFpbU5hbWUgfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSB0aGUgaWRlbnRpZmllclxuICAgIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZDtcbiAgICB0cnkge1xuICAgICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKHBhcmFtcy5pZGVudGlmaWVyKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgaWYgKCFpc0NoYW5uZWwpIHtcbiAgICAgIFtjbGFpbUlkLCBjbGFpbU5hbWVdID0gZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eShjbGFpbUlkLCBjbGFpbU5hbWUpO1xuICAgIH1cbiAgICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gICAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKTtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzZXJ2ZSB0aGUgd2lubmluZyBhc3NldCBhdCBhIGNsYWltIG9yIGEgY2hhbm5lbCBwYWdlXG4gIGFwcC5nZXQoJy86Y2xhaW0nLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gICAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgICB0cnkge1xuICAgICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gICAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgLy8gcGFyc2UgdGhlIGNsYWltXG4gICAgbGV0IGNsYWltTmFtZTtcbiAgICB0cnkge1xuICAgICAgKHtjbGFpbU5hbWV9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgbnVsbCwgbnVsbCk7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChudWxsLCBudWxsLCBjbGFpbU5hbWUsIG51bGwsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGdldENsYWltSWQsIGdldExvY2FsRmlsZVJlY29yZCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJy4vZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5jb25zdCBTSE9XID0gJ1NIT1cnO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbmZ1bmN0aW9uIGNsaWVudEFjY2VwdHNIdG1sICh7YWNjZXB0fSkge1xuICByZXR1cm4gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKTtcbn07XG5cbmZ1bmN0aW9uIHJlcXVlc3RJc0Zyb21Ccm93c2VyIChoZWFkZXJzKSB7XG4gIHJldHVybiBoZWFkZXJzWyd1c2VyLWFnZW50J10gJiYgaGVhZGVyc1sndXNlci1hZ2VudCddLm1hdGNoKC9Nb3ppbGxhLyk7XG59O1xuXG5mdW5jdGlvbiBjbGllbnRXYW50c0Fzc2V0ICh7YWNjZXB0LCByYW5nZX0pIHtcbiAgY29uc3QgaW1hZ2VJc1dhbnRlZCA9IGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL2ltYWdlXFwvLiovKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9cXCovKTtcbiAgY29uc3QgdmlkZW9Jc1dhbnRlZCA9IGFjY2VwdCAmJiByYW5nZTtcbiAgcmV0dXJuIGltYWdlSXNXYW50ZWQgfHwgdmlkZW9Jc1dhbnRlZDtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRDbGFpbUlkIChjbGFpbUlkKSB7XG4gIHJldHVybiAoKGNsYWltSWQubGVuZ3RoID09PSA0MCkgJiYgIS9bXkEtWmEtejAtOV0vZy50ZXN0KGNsYWltSWQpKTtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkIChjbGFpbUlkKSB7XG4gIHJldHVybiBjbGFpbUlkLmxlbmd0aCA9PT0gMTsgIC8vIGl0IHNob3VsZCByZWFsbHkgZXZhbHVhdGUgdGhlIHNob3J0IHVybCBpdHNlbGZcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIChpbnB1dCkge1xuICByZXR1cm4gKGlzVmFsaWRDbGFpbUlkKGlucHV0KSB8fCBpc1ZhbGlkU2hvcnRJZChpbnB1dCkpO1xufTtcblxuZnVuY3Rpb24gc2VydmVBc3NldFRvQ2xpZW50IChjbGFpbUlkLCBuYW1lLCByZXMpIHtcbiAgcmV0dXJuIGdldExvY2FsRmlsZVJlY29yZChjbGFpbUlkLCBuYW1lKVxuICAgIC50aGVuKGZpbGVSZWNvcmQgPT4ge1xuICAgICAgLy8gY2hlY2sgdGhhdCBhIGxvY2FsIHJlY29yZCB3YXMgZm91bmRcbiAgICAgIGlmIChmaWxlUmVjb3JkID09PSBOT19GSUxFKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDMwNykucmVkaXJlY3QoYC9hcGkvY2xhaW0vZ2V0LyR7bmFtZX0vJHtjbGFpbUlkfWApO1xuICAgICAgfVxuICAgICAgLy8gc2VydmUgdGhlIGZpbGVcbiAgICAgIGNvbnN0IHtmaWxlUGF0aCwgZmlsZVR5cGV9ID0gZmlsZVJlY29yZDtcbiAgICAgIGxvZ2dlci52ZXJib3NlKGBzZXJ2aW5nIGZpbGU6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICBjb25zdCBzZW5kRmlsZU9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICAgICAgICA6IGZpbGVUeXBlIHx8ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZEZpbGUoZmlsZVBhdGgsIHNlbmRGaWxlT3B0aW9ucyk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcykge1xuICAgIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gICAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKGZ1bGxDbGFpbUlkID0+IHtcbiAgICAgICAgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DTEFJTSkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjaGFubmVsIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZlQXNzZXRUb0NsaWVudChmdWxsQ2xhaW1JZCwgY2xhaW1OYW1lLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ3N1Y2Nlc3MnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnZmFpbCcpO1xuICAgICAgfSk7XG4gIH0sXG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSAoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZVR5cGU7XG4gICAgaWYgKGhhc0ZpbGVFeHRlbnNpb24pIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFOyAgLy8gYXNzdW1lIGEgc2VydmUgcmVxdWVzdCBpZiBmaWxlIGV4dGVuc2lvbiBpcyBwcmVzZW50XG4gICAgICBpZiAoY2xpZW50QWNjZXB0c0h0bWwoaGVhZGVycykpIHsgIC8vIGlmIHRoZSByZXF1ZXN0IGNvbWVzIGZyb20gYSBicm93c2VyLCBjaGFuZ2UgaXQgdG8gYSBzaG93IHJlcXVlc3RcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIGlmIChjbGllbnRXYW50c0Fzc2V0KGhlYWRlcnMpICYmIHJlcXVlc3RJc0Zyb21Ccm93c2VyKGhlYWRlcnMpKSB7ICAvLyB0aGlzIGlzIGluIGNhc2Ugc29tZW9uZSBlbWJlZHMgYSBzaG93IHVybFxuICAgICAgICBsb2dnZXIuZGVidWcoJ1Nob3cgcmVxdWVzdCBjYW1lIGZyb20gYnJvd3NlciBidXQgd2FudHMgYW4gaW1hZ2UvdmlkZW8uIENoYW5naW5nIHJlc3BvbnNlIHRvIHNlcnZlLi4uJyk7XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VUeXBlO1xuICB9LFxuICBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IChpZGVudGlmaWVyLCBuYW1lKSB7XG4gICAgLy8gdGhpcyBpcyBhIHBhdGNoIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSB3aXRoICcvbmFtZS9jbGFpbV9pZCcgdXJsIGZvcm1hdFxuICAgIGlmIChpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChuYW1lKSAmJiAhaXNWYWxpZFNob3J0SWRPckNsYWltSWQoaWRlbnRpZmllcikpIHtcbiAgICAgIGNvbnN0IHRlbXBOYW1lID0gbmFtZTtcbiAgICAgIG5hbWUgPSBpZGVudGlmaWVyO1xuICAgICAgaWRlbnRpZmllciA9IHRlbXBOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gW2lkZW50aWZpZXIsIG5hbWVdO1xuICB9LFxuICBsb2dSZXF1ZXN0RGF0YSAocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdyZXNwb25zZVR5cGUgPT09JywgcmVzcG9uc2VUeXBlKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIG5hbWUgPT09ICcsIGNsYWltTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIG5hbWUgPT09JywgY2hhbm5lbE5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gaWQgPT09JywgY2xhaW1JZCk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIGlkZW50aWZpZXI6JywgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke3ZhbHVlfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIHVybC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbCBuYW1lIGFmdGVyIEAuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1JZCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbmFtZTonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSAuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgJHttb2RpZmllclNlcGVyYXRvcn0uYCk7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke21vZGlmaWVyU2VwZXJhdG9yfSBtb2RpZmllciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lYCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICB9O1xuICB9LFxuICBwYXJzZU1vZGlmaWVyOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbW9kaWZpZXI6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeVVyaS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJy4uLy4uL2NsaWVudC9yZWR1Y2Vycy9pbmRleCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnLi4vLi4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleCc7XG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uL2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UnO1xuaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHsgY2FsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBoYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9zYWdhcy9zaG93X3VyaSc7XG5pbXBvcnQgeyBvbkhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnLi4vLi4vY2xpZW50L2FjdGlvbnMvc2hvdyc7XG5cbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY29uc3QgcmV0dXJuU2FnYVdpdGhQYXJhbXMgPSAoc2FnYSwgcGFyYW1zKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAqICgpIHtcbiAgICB5aWVsZCBjYWxsKHNhZ2EsIHBhcmFtcyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhbmQgYXBwbHkgbWlkZGxld2FyZVxuICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XG4gIGNvbnN0IG1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUoc2FnYU1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIsIG1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBzYWdhXG4gIGNvbnN0IGFjdGlvbiA9IG9uSGFuZGxlU2hvd1BhZ2VVcmkocmVxLnBhcmFtcyk7XG4gIGNvbnN0IHNhZ2EgPSByZXR1cm5TYWdhV2l0aFBhcmFtcyhoYW5kbGVTaG93UGFnZVVyaSwgYWN0aW9uKTtcblxuICAvLyBydW4gdGhlIHNhZ2EgbWlkZGxld2FyZVxuICBzYWdhTWlkZGxld2FyZVxuICAgIC5ydW4oc2FnYSlcbiAgICAuZG9uZVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICAgICAgPEFwcCAvPlxuICAgICAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgKTtcblxuICAgICAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICAgICAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gICAgICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICAgICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICAgICAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gICAgICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICAgICAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBvblJlcXVlc3RFcnJvciwgb25OZXdDaGFubmVsUmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgbmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19hc3NldCc7XG5pbXBvcnQgeyBuZXdDaGFubmVsUmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfY2hhbm5lbCc7XG5pbXBvcnQgbGJyeVVyaSBmcm9tICd1dGlscy9sYnJ5VXJpJztcblxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSAobW9kaWZpZXIsIGNsYWltKSB7XG4gIC8vIHRoaXMgaXMgYSByZXF1ZXN0IGZvciBhbiBhc3NldFxuICAvLyBjbGFpbSB3aWxsIGJlIGFuIGFzc2V0IGNsYWltXG4gIC8vIHRoZSBpZGVudGlmaWVyIGNvdWxkIGJlIGEgY2hhbm5lbCBvciBhIGNsYWltIGlkXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCwgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKG1vZGlmaWVyKSk7XG4gICAgKHsgY2xhaW1OYW1lLCBleHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBleHRlbnNpb24pKTtcbiAgfTtcbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgY2xhaW1JZCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IChjbGFpbSkge1xuICAvLyB0aGlzIGNvdWxkIGJlIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXQgb3IgYSBjaGFubmVsIHBhZ2VcbiAgLy8gY2xhaW0gY291bGQgYmUgYW4gYXNzZXQgY2xhaW0gb3IgYSBjaGFubmVsIGNsYWltXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIoY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICAvLyByZXR1cm4gZWFybHkgaWYgdGhpcyByZXF1ZXN0IGlzIGZvciBhIGNoYW5uZWxcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0NoYW5uZWxSZXF1ZXN0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkpO1xuICB9XG4gIC8vIGlmIG5vdCBmb3IgYSBjaGFubmVsLCBwYXJzZSB0aGUgY2xhaW0gcmVxdWVzdFxuICBsZXQgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWUsIGV4dGVuc2lvbn0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogaGFuZGxlU2hvd1BhZ2VVcmkgKGFjdGlvbikge1xuICBjb25zdCB7IGlkZW50aWZpZXIsIGNsYWltIH0gPSBhY3Rpb24uZGF0YTtcbiAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSwgaWRlbnRpZmllciwgY2xhaW0pO1xuICB9XG4gIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVDbGFpbU9ubHksIGNsYWltKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoSGFuZGxlU2hvd1BhZ2VVcmkgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLCBoYW5kbGVTaG93UGFnZVVyaSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpLmpzIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCBzZWxlY3QsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QsIG9uUmVxdWVzdEVycm9yLCBvblJlcXVlc3RVcGRhdGUsIGFkZEFzc2V0VG9Bc3NldExpc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgZ2V0TG9uZ0NsYWltSWQsIGdldFNob3J0SWQsIGdldENsYWltRGF0YSB9IGZyb20gJ2FwaS9hc3NldEFwaSc7XG5pbXBvcnQgeyBzZWxlY3RTaG93U3RhdGUgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RTaXRlSG9zdCB9IGZyb20gJ3NlbGVjdG9ycy9zaXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3QXNzZXRSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBuYW1lLCBtb2RpZmllciB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGxvbmcgaWQgJiYgYWRkIHJlcXVlc3QgdG8gcmVxdWVzdCBsaXN0XG4gIGxldCBsb25nSWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBsb25nSWR9ID0geWllbGQgY2FsbChnZXRMb25nQ2xhaW1JZCwgaG9zdCwgbmFtZSwgbW9kaWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICBjb25zdCBhc3NldEtleSA9IGBhIyR7bmFtZX0jJHtsb25nSWR9YDtcbiAgeWllbGQgcHV0KGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0KHJlcXVlc3RJZCwgbnVsbCwgYXNzZXRLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBhc3NldD9cbiAgLy8gSWYgdGhpcyBhc3NldCBpcyBpbiB0aGUgYXNzZXQgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuYXNzZXRMaXN0W2Fzc2V0S2V5XSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBzaG9ydCBJZFxuICBsZXQgc2hvcnRJZDtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IHNob3J0SWR9ID0geWllbGQgY2FsbChnZXRTaG9ydElkLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBnZXQgYXNzZXQgY2xhaW0gZGF0YVxuICBsZXQgY2xhaW1EYXRhO1xuICB0cnkge1xuICAgICh7ZGF0YTogY2xhaW1EYXRhfSA9IHlpZWxkIGNhbGwoZ2V0Q2xhaW1EYXRhLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBhZGQgYXNzZXQgdG8gYXNzZXQgbGlzdFxuICB5aWVsZCBwdXQoYWRkQXNzZXRUb0Fzc2V0TGlzdChhc3NldEtleSwgbnVsbCwgbmFtZSwgbG9uZ0lkLCBzaG9ydElkLCBjbGFpbURhdGEpKTtcbiAgLy8gY2xlYXIgYW55IGVycm9ycyBpbiByZXF1ZXN0IGVycm9yXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0Fzc2V0UmVxdWVzdCAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5BU1NFVF9SRVFVRVNUX05FVywgbmV3QXNzZXRSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9uZ0NsYWltSWQgKGhvc3QsIG5hbWUsIG1vZGlmaWVyKSB7XG4gIGxldCBib2R5ID0ge307XG4gIC8vIGNyZWF0ZSByZXF1ZXN0IHBhcmFtc1xuICBpZiAobW9kaWZpZXIpIHtcbiAgICBpZiAobW9kaWZpZXIuaWQpIHtcbiAgICAgIGJvZHlbJ2NsYWltSWQnXSA9IG1vZGlmaWVyLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5WydjaGFubmVsTmFtZSddID0gbW9kaWZpZXIuY2hhbm5lbC5uYW1lO1xuICAgICAgYm9keVsnY2hhbm5lbENsYWltSWQnXSA9IG1vZGlmaWVyLmNoYW5uZWwuaWQ7XG4gICAgfVxuICB9XG4gIGJvZHlbJ2NsYWltTmFtZSddID0gbmFtZTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfTtcbiAgLy8gY3JlYXRlIHVybFxuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vbG9uZy1pZGA7XG4gIC8vIHJldHVybiB0aGUgcmVxdWVzdCBwcm9taXNlXG4gIHJldHVybiBSZXF1ZXN0KHVybCwgcGFyYW1zKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaG9ydElkIChob3N0LCBuYW1lLCBjbGFpbUlkKSB7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9zaG9ydC1pZC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYWltRGF0YSAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vZGF0YS8ke25hbWV9LyR7Y2xhaW1JZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvYXNzZXRBcGkuanMiLCJpbXBvcnQge2NhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QsIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCB1cGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldENoYW5uZWxDbGFpbXMsIGdldENoYW5uZWxEYXRhIH0gZnJvbSAnYXBpL2NoYW5uZWxBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0NoYW5uZWxSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0gPSBhY3Rpb24uZGF0YTtcbiAgLy8gcHV0IGFuIGFjdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgaW4gcmVkdXhcbiAgeWllbGQgcHV0KG9uUmVxdWVzdFVwZGF0ZShyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgcmVxdWVzdD9cbiAgLy8gSWYgdGhpcyB1cmkgaXMgaW4gdGhlIHJlcXVlc3QgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBjb25zdCBzdGF0ZSA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaG93U3RhdGUpO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBsb25nIGlkXG4gIGxldCBsb25nSWQsIHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHsgZGF0YToge2xvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0lkLCBzaG9ydENoYW5uZWxDbGFpbUlkOiBzaG9ydElkfSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsRGF0YSwgaG9zdCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHN0b3JlIHRoZSByZXF1ZXN0IGluIHRoZSBjaGFubmVsIHJlcXVlc3RzIGxpc3RcbiAgY29uc3QgY2hhbm5lbEtleSA9IGBjIyR7Y2hhbm5lbE5hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGNoYW5uZWxLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBjaGFubmVsP1xuICAvLyBJZiB0aGlzIGNoYW5uZWwgaXMgaW4gdGhlIGNoYW5uZWwgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBjbGFpbXMgZGF0YVxuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIGhvc3QsIGxvbmdJZCwgY2hhbm5lbE5hbWUsIDEpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgY2hhbm5lbCBkYXRhIGluIHRoZSBjaGFubmVsIGxpc3RcbiAgeWllbGQgcHV0KGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0KGNoYW5uZWxLZXksIGNoYW5uZWxOYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpKTtcbiAgLy8gY2xlYXIgYW55IHJlcXVlc3QgZXJyb3JzXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3Q2hhbm5lbFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVywgbmV3Q2hhbm5lbFJlcXVlc3QpO1xufTtcblxuZnVuY3Rpb24gKiBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsIChhY3Rpb24pIHtcbiAgY29uc3QgeyBjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UgfSA9IGFjdGlvbi5kYXRhO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBwdXQodXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBjbGFpbXNEYXRhKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsIGdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfY2hhbm5lbC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbERhdGEgKGhvc3QsIGlkLCBuYW1lKSB7XG4gIGlmICghaWQpIGlkID0gJ25vbmUnO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9kYXRhLyR7bmFtZX0vJHtpZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxDbGFpbXMgKGhvc3QsIGxvbmdJZCwgbmFtZSwgcGFnZSkge1xuICBpZiAoIXBhZ2UpIHBhZ2UgPSAxO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9jbGFpbXMvJHtuYW1lfS8ke2xvbmdJZH0vJHtwYWdlfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlbmRlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHAgPT4ge1xuICAvLyBhIGNhdGNoLWFsbCByb3V0ZSBpZiBzb21lb25lIHZpc2l0cyBhIHBhZ2UgdGhhdCBkb2VzIG5vdCBleGlzdFxuICBhcHAudXNlKCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgLy8gc2VuZCByZXNwb25zZVxuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcyIsImNvbnN0IHsgbG9nTGV2ZWwgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9sb2dnZXJDb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAod2luc3RvbikgPT4ge1xuICAvLyBjb25maWd1cmVcbiAgd2luc3Rvbi5jb25maWd1cmUoe1xuICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgIG5ldyAod2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUpKHtcbiAgICAgICAgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgICAgIDogbG9nTGV2ZWwsXG4gICAgICAgIHRpbWVzdGFtcCAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBjb2xvcml6ZSAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICBwcmV0dHlQcmludCAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICBoYW5kbGVFeGNlcHRpb25zICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICBodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG4gIC8vIHRlc3QgYWxsIHRoZSBsb2cgbGV2ZWxzXG4gIHdpbnN0b24uZXJyb3IoJ0xldmVsIDAnKTtcbiAgd2luc3Rvbi53YXJuKCdMZXZlbCAxJyk7XG4gIHdpbnN0b24uaW5mbygnTGV2ZWwgMicpO1xuICB3aW5zdG9uLnZlcmJvc2UoJ0xldmVsIDMnKTtcbiAgd2luc3Rvbi5kZWJ1ZygnTGV2ZWwgNCcpO1xuICB3aW5zdG9uLnNpbGx5KCdMZXZlbCA1Jyk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvY29uZmlndXJlTG9nZ2VyLmpzIiwiY29uc3QgbG9nZ2VyQ29uZmlnID0ge1xuICBsb2dMZXZlbDogJ2RlYnVnJywgIC8vIG9wdGlvbnM6IHNpbGx5LCBkZWJ1ZywgdmVyYm9zZSwgaW5mb1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2dnZXJDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwiY29uc3Qgd2luc3RvblNsYWNrV2ViSG9vayA9IHJlcXVpcmUoJ3dpbnN0b24tc2xhY2std2ViaG9vaycpLlNsYWNrV2ViSG9vaztcbmNvbnN0IHNsYWNrQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHdpbnN0b24pID0+IHtcbiAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gc2xhY2tDb25maWc7XG4gIGlmIChzbGFja1dlYkhvb2spIHtcbiAgICAvLyBhZGQgYSB0cmFuc3BvcnQgZm9yIGVycm9ycyB0byBzbGFja1xuICAgIGlmIChzbGFja0Vycm9yQ2hhbm5lbCkge1xuICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICBuYW1lICAgICAgOiAnc2xhY2stZXJyb3JzLXRyYW5zcG9ydCcsXG4gICAgICAgIGxldmVsICAgICA6ICd3YXJuJyxcbiAgICAgICAgd2ViaG9va1VybDogc2xhY2tXZWJIb29rLFxuICAgICAgICBjaGFubmVsICAgOiBzbGFja0Vycm9yQ2hhbm5lbCxcbiAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICBpY29uRW1vamkgOiAnOmZhY2Vfd2l0aF9oZWFkX2JhbmRhZ2U6JyxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgaWYgKHNsYWNrSW5mb0NoYW5uZWwpIHtcbiAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWluZm8tdHJhbnNwb3J0JyxcbiAgICAgICAgbGV2ZWwgICAgIDogJ2luZm8nLFxuICAgICAgICB3ZWJob29rVXJsOiBzbGFja1dlYkhvb2ssXG4gICAgICAgIGNoYW5uZWwgICA6IHNsYWNrSW5mb0NoYW5uZWwsXG4gICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgaWNvbkVtb2ppIDogJzpuZXJkX2ZhY2U6JyxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gc2VuZCB0ZXN0IG1lc3NhZ2VcbiAgICB3aW5zdG9uLmVycm9yKCdTbGFjayBcImVycm9yXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgd2luc3Rvbi5pbmZvKCdTbGFjayBcImluZm9cIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5zdG9uLndhcm4oJ1NsYWNrIGxvZ2dpbmcgaXMgbm90IGVuYWJsZWQgYmVjYXVzZSBubyBzbGFja1dlYkhvb2sgY29uZmlnIHZhciBwcm92aWRlZC4nKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCJcbi8vIG1vZHVsZSBpZCA9IDEzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9