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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
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
  this.componentsConfig = {
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
        componentsConfig = config.componentsConfig,
        details = config.details,
        publishing = config.publishing;

    _this.analytics = analytics;
    _this.assetDefaults = assetDefaults;
    _this.auth = auth;
    _this.details = details;
    _this.publishing = publishing;
    _this.componentsConfig = componentsConfig;
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
var Certificate = __webpack_require__(68);
var Channel = __webpack_require__(69);
var Claim = __webpack_require__(70);
var File = __webpack_require__(71);
var Request = __webpack_require__(72);
var User = __webpack_require__(73);
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

var _show_request_types = __webpack_require__(48);

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


var axios = __webpack_require__(65);
var logger = __webpack_require__(1);

var _require = __webpack_require__(66),
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
var ua = __webpack_require__(67);

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
  if (typeof filePath !== 'string') {
    console.log('dynamicImport > filePath:', filePath);
    console.log('dynamicImport > filePath type:', typeof filePath === 'undefined' ? 'undefined' : _typeof(filePath));
    throw new Error('file path provided to dynamicImport() must be a string');
  }
  if (!componentsConfig) {
    console.log('no componentsConfig found in siteConfig.js');
    return __webpack_require__(43)("" + filePath);
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
    return __webpack_require__(43)("" + filePath);
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
var fs = __webpack_require__(80);

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

var _require = __webpack_require__(82),
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

var _renderFullPage = __webpack_require__(50);

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

var _publish = __webpack_require__(84);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(86);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(87);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(88);

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

var _reactGa = __webpack_require__(89);

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

var map = {
	"./canonicalLink": 18,
	"./canonicalLink.js": 18,
	"./dynamicImport": 17,
	"./dynamicImport.js": 17,
	"./file": 44,
	"./file.js": 44,
	"./lbryUri": 19,
	"./lbryUri.js": 19,
	"./metaTags": 20,
	"./metaTags.js": 20,
	"./pageTitle": 21,
	"./pageTitle.js": 21,
	"./publish": 45,
	"./publish.js": 45,
	"./request": 6,
	"./request.js": 6,
	"./validate": 46,
	"./validate.js": 46
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
webpackContext.id = 43;

/***/ }),
/* 44 */
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
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL = exports.CHANNEL = 'CHANNEL';
var ASSET_LITE = exports.ASSET_LITE = 'ASSET_LITE';
var ASSET_DETAILS = exports.ASSET_DETAILS = 'ASSET_DETAILS';

/***/ }),
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helmet, html, preloadedState) {
    // take the html and preloadedState and return the full page
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53);
__webpack_require__(54);
module.exports = __webpack_require__(55);


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(56);
var bodyParser = __webpack_require__(57);
var expressHandlebars = __webpack_require__(58);
var Handlebars = __webpack_require__(59);
var helmet = __webpack_require__(60);
var passport = __webpack_require__(26);

var _require = __webpack_require__(61),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

var cookieSession = __webpack_require__(62);
var http = __webpack_require__(63);
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
    var localSignupStrategy = __webpack_require__(64);
    var localLoginStrategy = __webpack_require__(75);
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
    __webpack_require__(76)(app);
    __webpack_require__(77)(app);
    __webpack_require__(83)(app);
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
/* 56 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 61 */
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
/* 62 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 64 */
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
/* 65 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 66 */
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
/* 67 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 68 */
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
/* 69 */
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
/* 70 */
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
/* 71 */
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
/* 72 */
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(74);
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
/* 74 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 75 */
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
/* 76 */
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(1);
var multipart = __webpack_require__(78);

var _require = __webpack_require__(3),
    uploadDirectory = _require.publishing.uploadDirectory,
    host = _require.details.host;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });
var db = __webpack_require__(5);

var _require2 = __webpack_require__(79),
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

var _require6 = __webpack_require__(81),
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
/* 78 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 79 */
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
/* 80 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 81 */
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
/* 82 */
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
/* 83 */
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
/* 84 */
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

var _publish_channel_select_states = __webpack_require__(85);

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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = exports.LOGIN = 'Existing';
var CREATE = exports.CREATE = 'New';

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
/* 88 */
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
/* 89 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

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

var _ProgressBar = __webpack_require__(47);

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

var _show_request_types = __webpack_require__(48);

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

var _AssetDisplay = __webpack_require__(49);

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

var _ProgressBar = __webpack_require__(47);

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

var _AssetDisplay = __webpack_require__(49);

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

var _renderFullPage = __webpack_require__(50);

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

var _site = __webpack_require__(51);

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

var _site = __webpack_require__(51);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjg5ZDM1ZjNjYWI5NWM3YzdmMGMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZHluYW1pY0ltcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvbWV0YVRhZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3BhZ2VUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9FcnJvclBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMgXi4qJCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xicnlDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9maWxlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGktcm91dGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZS1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1nYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2stcm91dGVzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiIl0sIm5hbWVzIjpbIlNpdGVDb25maWciLCJhbmFseXRpY3MiLCJnb29nbGVJZCIsImFzc2V0RGVmYXVsdHMiLCJkZXNjcmlwdGlvbiIsInRodW1ibmFpbCIsInRpdGxlIiwiYXV0aCIsInNlc3Npb25LZXkiLCJjb21wb25lbnRzQ29uZmlnIiwiY29tcG9uZW50cyIsImNvbnRhaW5lcnMiLCJwYWdlcyIsImRldGFpbHMiLCJob3N0IiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsImNvbmZpZ3VyZSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwiU2VxdWVsaXplIiwicmVxdWlyZSIsImxvZ2dlciIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImRiIiwic2VxdWVsaXplIiwiZGlhbGVjdCIsImRpYWxlY3RPcHRpb25zIiwiZGVjaW1hbE51bWJlcnMiLCJsb2dnaW5nIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJhY3F1aXJlIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImluZm8iLCJjYXRjaCIsImVycm9yIiwiZXJyIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJpbXBvcnQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwiZGVidWciLCJ1cGRhdGUiLCJjcmVhdGUiLCJyZXF1ZXN0IiwicGFyc2VKU09OIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJqc29uIiwiY2hlY2tTdGF0dXMiLCJqc29uUmVzcG9uc2UiLCJFcnJvciIsIm1lc3NhZ2UiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJQcm9taXNlIiwiYWxsIiwib25IYW5kbGVTaG93UGFnZVVyaSIsIm9uUmVxdWVzdEVycm9yIiwib25OZXdDaGFubmVsUmVxdWVzdCIsIm9uTmV3QXNzZXRSZXF1ZXN0Iiwib25SZXF1ZXN0VXBkYXRlIiwiYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QiLCJhZGRBc3NldFRvQXNzZXRMaXN0IiwiYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QiLCJvblVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJ1cGRhdGVDaGFubmVsQ2xhaW1zIiwiZmlsZVJlcXVlc3RlZCIsInVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkiLCJ1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciIsImFjdGlvbnMiLCJwYXJhbXMiLCJ0eXBlIiwiSEFORExFX1NIT1dfVVJJIiwiZGF0YSIsIlJFUVVFU1RfRVJST1IiLCJjaGFubmVsTmFtZSIsImNoYW5uZWxJZCIsInJlcXVlc3RUeXBlIiwicmVxdWVzdElkIiwiQ0hBTk5FTF9SRVFVRVNUX05FVyIsIm5hbWUiLCJpZCIsImV4dGVuc2lvbiIsIkFTU0VUX1JFUVVFU1RfTkVXIiwibW9kaWZpZXIiLCJjaGFubmVsIiwiUkVRVUVTVF9VUERBVEUiLCJrZXkiLCJSRVFVRVNUX0xJU1RfQUREIiwiY2xhaW1JZCIsInNob3J0SWQiLCJjbGFpbURhdGEiLCJBU1NFVF9BREQiLCJsb25nSWQiLCJjbGFpbXNEYXRhIiwiQ0hBTk5FTF9BREQiLCJjaGFubmVsS2V5IiwicGFnZSIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyIsImNoYW5uZWxMaXN0SWQiLCJDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyIsIkZJTEVfUkVRVUVTVEVEIiwiRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFIiwiRElTUExBWV9BU1NFVF9FUlJPUiIsIm1hcFN0YXRlVG9Qcm9wcyIsInNpdGUiLCJsb2dnZWRJbkNoYW5uZWwiLCJjaGFubmVsU2hvcnRJZCIsImNoYW5uZWxMb25nSWQiLCJzaXRlRGVzY3JpcHRpb24iLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJvbkNoYW5uZWxMb2dpbiIsImRpc3BhdGNoIiwib25DaGFubmVsTG9nb3V0IiwiZGVmYXVsdERlc2NyaXB0aW9uIiwiZGVmYXVsdFRodW1ibmFpbCIsInNpdGVIb3N0Iiwic2l0ZVRpdGxlIiwic2l0ZVR3aXR0ZXIiLCJzZWxlY3RBc3NldCIsInNob3ciLCJyZXF1ZXN0TGlzdCIsImFzc2V0S2V5IiwiYXNzZXRMaXN0Iiwic2VsZWN0U2hvd1N0YXRlIiwic3RhdGUiLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsInNlbmRHQVRpbWluZ0V2ZW50IiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJjaGFubmVsX25hbWUiLCJhbW91bnQiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiaXAiLCJvcmlnaW5hbFVybCIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsImNoYW5uZWxfaWQiLCJnZXREZWVwZXN0Q2hpbGRWYWx1ZSIsInBhcmVudCIsImNoaWxkcmVuS2V5cyIsImNoaWxkS2V5Iiwic2hpZnQiLCJjaGlsZCIsImxlbmd0aCIsImR5bmFtaWNJbXBvcnQiLCJmaWxlUGF0aCIsImZvbGRlcnMiLCJzcGxpdCIsImZpbHRlciIsImZvbGRlck5hbWUiLCJjdXN0b21Db21wb25lbnQiLCJjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsiLCJjcmVhdGVBc3NldENhbm9uaWNhbExpbmsiLCJhc3NldCIsImNlcnRpZmljYXRlSWQiLCJjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayIsImNyZWF0ZUNhbm9uaWNhbExpbmsiLCJSRUdFWFBfSU5WQUxJRF9DTEFJTSIsIlJFR0VYUF9JTlZBTElEX0NIQU5ORUwiLCJSRUdFWFBfQUREUkVTUyIsIkNIQU5ORUxfQ0hBUiIsInBhcnNlSWRlbnRpZmllciIsImlkZW50aWZpZXIiLCJjb21wb25lbnRzUmVnZXgiLCJSZWdFeHAiLCJleGVjIiwibWFwIiwibWF0Y2giLCJwcm90byIsInZhbHVlIiwibW9kaWZpZXJTZXBlcmF0b3IiLCJpc0NoYW5uZWwiLCJzdGFydHNXaXRoIiwibmFtZUJhZENoYXJzIiwiam9pbiIsImNoYW5uZWxDbGFpbUlkIiwicGFyc2VDbGFpbSIsImV4dGVuc2lvblNlcGVyYXRvciIsImRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJmaWxlRXh0Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJjcmVhdGVCYXNpY01ldGFUYWdzIiwicHJvcGVydHkiLCJjb250ZW50IiwiY3JlYXRlQ2hhbm5lbE1ldGFUYWdzIiwiY3JlYXRlQXNzZXRNZXRhVGFncyIsImNvbnRlbnRUeXBlIiwiZW1iZWRVcmwiLCJzaG93VXJsIiwic291cmNlIiwib2dUaXRsZSIsIm9nRGVzY3JpcHRpb24iLCJvZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwib2dUaHVtYm5haWwiLCJtZXRhVGFncyIsInB1c2giLCJjcmVhdGVNZXRhVGFncyIsImNyZWF0ZVBhZ2VUaXRsZSIsInBhZ2VUaXRsZSIsInVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCIsIkNIQU5ORUxfVVBEQVRFIiwic2VsZWN0RmlsZSIsImNsZWFyRmlsZSIsInVwZGF0ZU1ldGFkYXRhIiwidXBkYXRlQ2xhaW0iLCJzZXRQdWJsaXNoSW5DaGFubmVsIiwidXBkYXRlUHVibGlzaFN0YXR1cyIsInVwZGF0ZUVycm9yIiwidXBkYXRlU2VsZWN0ZWRDaGFubmVsIiwidG9nZ2xlTWV0YWRhdGFJbnB1dHMiLCJvbk5ld1RodW1ibmFpbCIsInN0YXJ0UHVibGlzaCIsImZpbGUiLCJGSUxFX1NFTEVDVEVEIiwiRklMRV9DTEVBUiIsIk1FVEFEQVRBX1VQREFURSIsIkNMQUlNX1VQREFURSIsIlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwiLCJQVUJMSVNIX1NUQVRVU19VUERBVEUiLCJFUlJPUl9VUERBVEUiLCJTRUxFQ1RFRF9DSEFOTkVMX1VQREFURSIsInNob3dNZXRhZGF0YUlucHV0cyIsIlRPR0dMRV9NRVRBREFUQV9JTlBVVFMiLCJUSFVNQk5BSUxfTkVXIiwiaGlzdG9yeSIsIlBVQkxJU0hfU1RBUlQiLCJFcnJvclBhZ2UiLCJwcm9wcyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJNeXNxbENvbmZpZyIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwicmV0dXJuU2hvcnRJZCIsImNsYWltc0FycmF5IiwiY2xhaW1JbmRleCIsInNob3J0SWRMZW5ndGgiLCJmaW5kSW5kZXgiLCJlbGVtZW50IiwicG9zc2libGVNYXRjaGVzIiwic2xpY2UiLCJmcyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5IiwibnNmdyIsImxpY2Vuc2UiLCJpbnZhbGlkTmFtZUNoYXJhY3RlcnMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMiLCJwYXRoIiwic2l6ZSIsInRlc3QiLCJ2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSIsImZpbGVOYW1lIiwiZmlsZVR5cGUiLCJ0aHVtYm5haWxGaWxlTmFtZSIsInRodW1ibmFpbEZpbGVQYXRoIiwidGh1bWJuYWlsRmlsZVR5cGUiLCJjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMiLCJ0cmltIiwiZmlsZV9wYXRoIiwiYmlkIiwibWV0YWRhdGEiLCJhdXRob3IiLCJsYW5ndWFnZSIsImNsYWltX2FkZHJlc3MiLCJjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsInVubGluayIsImFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIiwiZmlsZUluZm8iLCJnZXRSZXN1bHQiLCJmaWxlX25hbWUiLCJkb3dubG9hZF9wYXRoIiwiY3JlYXRlRmlsZURhdGEiLCJvdXRwb2ludCIsImhlaWdodCIsImFkZHJlc3MiLCJoYW5kbGVFcnJvclJlc3BvbnNlIiwicmVzIiwidXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzIiwicmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwibmV3RXJyb3JPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwic3VjY2VzcyIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsImxvbmdDaGFubmVsQ2xhaW1JZCIsImdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQiLCJzaG9ydENoYW5uZWxDbGFpbUlkIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJkYXRhVmFsdWVzIiwicmVxIiwiY29udGV4dCIsInN0b3JlIiwiaHRtbCIsImhlbG1ldCIsInJlbmRlclN0YXRpYyIsInJlZGlyZWN0IiwicHJlbG9hZGVkU3RhdGUiLCJnZXRTdGF0ZSIsInNlbmQiLCJwdWJsaXNoIiwiTE9DQUxfQ0hFQ0siLCJVTkFWQUlMQUJMRSIsIkVSUk9SIiwiQVZBSUxBQkxFIiwiaW5pdGlhbGl6ZSIsIkdBTGlzdGVuZXIiLCJzZW5kUGFnZVZpZXciLCJsb2NhdGlvbiIsImxpc3RlbiIsInNldCIsInBhdGhuYW1lIiwicGFnZXZpZXciLCJjaGlsZHJlbiIsIkhvbWVQYWdlIiwiQXBwIiwidmFsaWRhdGVGaWxlIiwiY3JlYXRlUHVibGlzaE1ldGFkYXRhIiwiY2xhaW0iLCJwdWJsaXNoSW5DaGFubmVsIiwic2VsZWN0ZWRDaGFubmVsIiwiY3JlYXRlUHVibGlzaEZvcm1EYXRhIiwiZmQiLCJGb3JtRGF0YSIsImFwcGVuZCIsImhhc093blByb3BlcnR5IiwiY3JlYXRlVGh1bWJuYWlsVXJsIiwidmFsaWRhdGVDaGFubmVsU2VsZWN0aW9uIiwidmFsaWRhdGVQdWJsaXNoUGFyYW1zIiwidXJsRXJyb3IiLCJQcm9ncmVzc0JhciIsImJhcnMiLCJpbmRleCIsImluY3JlbWVudGVyIiwiY3JlYXRlQmFycyIsImJpbmQiLCJzdGFydFByb2dyZXNzQmFyIiwidXBkYXRlUHJvZ3Jlc3NCYXIiLCJzdG9wUHJvZ3Jlc3NCYXIiLCJpIiwiaXNBY3RpdmUiLCJzZXRTdGF0ZSIsInVwZGF0ZUludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiYmFyIiwibnVtYmVyIiwiQ0hBTk5FTCIsIkFTU0VUX0xJVEUiLCJBU1NFVF9ERVRBSUxTIiwiZGlzcGxheUFzc2V0Iiwib25GaWxlUmVxdWVzdCIsInRvU3RyaW5nIiwibWV0YSIsImxpbmsiLCJzZWxlY3RTaXRlU3RhdGUiLCJzZWxlY3RTaXRlSG9zdCIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwicGFzc3BvcnQiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJTcGVlY2hTZXJ2ZXIiLCJjb25maWd1cmVNeXNxbCIsIm15c3FsQ29uZmlnIiwiY29uZmlndXJlU2l0ZSIsInNpdGVDb25maWciLCJQT1JUIiwiY29uZmlndXJlU2xhY2siLCJzbGFja0NvbmZpZyIsImNyZWF0ZUFwcCIsImFwcCIsImVuYWJsZSIsInVzZSIsInN0YXRpYyIsIl9fZGlybmFtZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsIm5leHQiLCJ2ZXJib3NlIiwic2VyaWFsaXplVXNlciIsImRlc2VyaWFsaXplVXNlciIsImxvY2FsU2lnbnVwU3RyYXRlZ3kiLCJsb2NhbExvZ2luU3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZXNzaW9uIiwiaGJzIiwiZGVmYXVsdExheW91dCIsImhhbmRsZWJhcnMiLCJlbmdpbmUiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJzdGFydCIsInN5bmMiLCJ1c2VyIiwiZG9uZSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwibGJyeUFwaSIsInVzZXJuYW1lRmllbGQiLCJwYXNzd29yZEZpZWxkIiwidXNlckluZm8iLCJ1c2VyRGF0YSIsInVzZXJOYW1lIiwiY2hhbm5lbERhdGEiLCJ0eCIsImNsYWltX2lkIiwiY2VydGlmaWNhdGVEYXRhIiwibmV3VXNlciIsIm5ld0NoYW5uZWwiLCJuZXdDZXJ0aWZpY2F0ZSIsInNldENoYW5uZWwiLCJzZXRVc2VyIiwic2hvcnRDaGFubmVsSWQiLCJsYnJ5Q29uZmlnIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImRlZmF1bHQiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJub3V0IiwidHhpZCIsInZhbGlkQXRIZWlnaHQiLCJ2YWx1ZVZlcnNpb24iLCJjbGFpbVR5cGUiLCJjZXJ0aWZpY2F0ZVZlcnNpb24iLCJrZXlUeXBlIiwicHVibGljS2V5IiwiZnJlZXplVGFibGVOYW1lIiwiYmVsb25nc1RvIiwiZm9yZWlnbktleSIsImFsbG93TnVsbCIsImZpbmRBbGwiLCJvcmRlciIsImdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQiLCIkbGlrZSIsImdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUiLCJ2YWxpZGF0ZUxvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwicmF3IiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJyZXNvbHZlQ2xhaW0iLCJjbGFpbUFycmF5IiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImFjdGlvbiIsImlwQWRkcmVzcyIsImJjcnlwdCIsInByb3RvdHlwZSIsImNvbXBhcmVQYXNzd29yZCIsImNvbXBhcmUiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwiZ2VuU2FsdCIsInNhbHRFcnJvciIsInNhbHQiLCJoYXNoIiwiaGFzaEVycm9yIiwiaG9vayIsInJldHVyblVzZXJBbmRDaGFubmVsSW5mbyIsInVzZXJJbnN0YW5jZSIsImdldENoYW5uZWwiLCJpc01hdGNoIiwibG9nSW4iLCJnZXQiLCJsb2dvdXQiLCJtdWx0aXBhcnQiLCJtdWx0aXBhcnRNaWRkbGV3YXJlIiwidXBsb2FkRGlyIiwiY2xhaW1OYW1lSXNBdmFpbGFibGUiLCJjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkiLCJlcnJvckhhbmRsZXJzIiwiYXV0aGVudGljYXRlVXNlciIsImF2YWlsYWJsZU5hbWUiLCJib2R5IiwiY2xhaW1zTGlzdCIsInJlc29sdmVSZXN1bHQiLCJmaWxlRGF0YSIsImZpbGVSZWNvcmQiLCJjb21wbGV0ZWQiLCJyZXNvbHZlZFVyaSIsImZpbGVzIiwiY2hhbm5lbFBhc3N3b3JkIiwidmFsaWRhdGVkQ2xhaW1OYW1lIiwidGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImxicnlUeCIsImNsYWltSW5mbyIsInB1Ymxpc2hIZWxwZXJzIiwiT3AiLCJwdWJsaXNoUmVzdWx0cyIsImNsYWltUmVjb3JkIiwidXBzZXJ0Q3JpdGVyaWEiLCJzZXRDbGFpbSIsInNldEZpbGUiLCJjbGFpbUFkZHJlc3NlcyIsImF0dHJpYnV0ZXMiLCJvciIsImF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyIsInVzZXJQYXNzd29yZCIsImNoYW5uZWxGaW5kUGFyYW1zIiwiQ0xBSU1TX1BFUl9QQUdFIiwiY2xhaW1zIiwidG90YWxQYWdlcyIsImRldGVybWluZVRvdGFsUGFnZXMiLCJwYWdpbmF0aW9uUGFnZSIsImdldFBhZ2VGcm9tUXVlcnkiLCJ2aWV3RGF0YSIsImV4dHJhY3RQYWdlRnJvbUNsYWltcyIsInByZXZpb3VzUGFnZSIsImRldGVybWluZVByZXZpb3VzUGFnZSIsImN1cnJlbnRQYWdlIiwibmV4dFBhZ2UiLCJkZXRlcm1pbmVOZXh0UGFnZSIsInRvdGFsUmVzdWx0cyIsImRldGVybWluZVRvdGFsQ2xhaW1zIiwicGFyc2VJbnQiLCJwYWdlTnVtYmVyIiwiY2xhaW1TdGFydEluZGV4IiwiY2xhaW1FbmRJbmRleCIsInBhZ2VPZkNsYWltcyIsInRvdGFsQ2xhaW1zIiwiZnVsbFBhZ2VzIiwiTWF0aCIsImZsb29yIiwicmVtYWluZGVyIiwiaGFuZGxlUGFnZVJlbmRlciIsInJlbmRlciIsImxheW91dCIsImluaXRpYWxTdGF0ZSIsImFzc2lnbiIsInB1Ymxpc2hTdWJtaXQiLCJMT0dJTiIsIkNSRUFURSIsImNoYW5uZWxMaXN0IiwiZ29vZ2xlQW5hbHl0aWNzSWQiLCJBYm91dFBhZ2UiLCJWSUVXIiwiTE9HT1VUIiwiTmF2QmFyIiwiY2hlY2tGb3JMb2dnZWRJblVzZXIiLCJsb2dvdXRVc2VyIiwiaGFuZGxlU2VsZWN0aW9uIiwiY3JlZGVudGlhbHMiLCJ0YXJnZXQiLCJzZWxlY3RlZE9wdGlvbnMiLCJMb2dvIiwiTmF2QmFyQ2hhbm5lbERyb3Bkb3duIiwiZGVmYXVsdFNlbGVjdGlvbiIsIlNFTyIsInBhZ2VVcmkiLCJjYW5vbmljYWxMaW5rIiwicmVsIiwiaHJlZiIsIm9iamVjdCIsImxvZ2dlZEluQ2hhbm5lbE5hbWUiLCJMb2dpblBhZ2UiLCJuZXdQcm9wcyIsIkNoYW5uZWxMb2dpbkZvcm0iLCJoYW5kbGVJbnB1dCIsImxvZ2luVG9DaGFubmVsIiwicHJldmVudERlZmF1bHQiLCJIZWFkZXJzIiwiQ2hhbm5lbENyZWF0ZUZvcm0iLCJoYW5kbGVDaGFubmVsSW5wdXQiLCJpbnB1dCIsImNsZWFuc2VDaGFubmVsSW5wdXQiLCJ1cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUiLCJjaGFubmVsV2l0aEF0U3ltYm9sIiwiY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQiLCJjaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSIsIm1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QiLCJBY3RpdmVTdGF0dXNCYXIiLCJJbmFjdGl2ZVN0YXR1c0JhciIsIlNob3dQYWdlIiwibmV4dFByb3BzIiwiU2hvd0xpdGUiLCJBc3NldERpc3BsYXkiLCJTaG93QXNzZXREZXRhaWxzIiwiQXNzZXRUaXRsZSIsIkFzc2V0SW5mbyIsImNvcHlUb0NsaXBib2FyZCIsImVsZW1lbnRUb0NvcHkiLCJkYXRhc2V0IiwiZWxlbWVudHRvY29weSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3QiLCJleGVjQ29tbWFuZCIsInByZXZpb3VzUmVxdWVzdCIsIlNob3dDaGFubmVsIiwiQ2hhbm5lbENsYWltc0Rpc3BsYXkiLCJzaG93TmV4dFJlc3VsdHNQYWdlIiwic2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UiLCJzaG93TmV3UGFnZSIsImRlZmF1bHRzIiwiQXNzZXRQcmV2aWV3IiwiZGlyZWN0U291cmNlTGluayIsInNob3dVcmxMaW5rIiwiRm91ck9oRm9yUGFnZSIsImRldGVybWluZVJlc3BvbnNlVHlwZSIsImZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkiLCJsb2dSZXF1ZXN0RGF0YSIsImdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IiwibGJyeVVyaSIsImhhbmRsZVNob3dSZW5kZXIiLCJTRVJWRSIsImhhc0ZpbGVFeHRlbnNpb24iLCJwYXJzZU1vZGlmaWVyIiwicmVzcG9uc2VUeXBlIiwiU0hPVyIsImNsaWVudEFjY2VwdHNIdG1sIiwiYWNjZXB0IiwicmVxdWVzdElzRnJvbUJyb3dzZXIiLCJjbGllbnRXYW50c0Fzc2V0IiwicmFuZ2UiLCJpbWFnZUlzV2FudGVkIiwidmlkZW9Jc1dhbnRlZCIsImlzVmFsaWRDbGFpbUlkIiwiaXNWYWxpZFNob3J0SWQiLCJpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCIsInNlcnZlQXNzZXRUb0NsaWVudCIsInNlbmRGaWxlT3B0aW9ucyIsInNlbmRGaWxlIiwiZnVsbENsYWltSWQiLCJ0ZW1wTmFtZSIsInJldHVyblNhZ2FXaXRoUGFyYW1zIiwic2FnYSIsInNhZ2FNaWRkbGV3YXJlIiwibWlkZGxld2FyZSIsInJ1biIsImhhbmRsZVNob3dQYWdlVXJpIiwid2F0Y2hIYW5kbGVTaG93UGFnZVVyaSIsInBhcnNlQW5kVXBkYXRlSWRlbnRpZmllckFuZENsYWltIiwicGFyc2VBbmRVcGRhdGVDbGFpbU9ubHkiLCJuZXdBc3NldFJlcXVlc3QiLCJ3YXRjaE5ld0Fzc2V0UmVxdWVzdCIsImdldFNob3J0SWQiLCJnZXRDbGFpbURhdGEiLCJuZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoTmV3Q2hhbm5lbFJlcXVlc3QiLCJ3YXRjaFVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsIiwibG9nTGV2ZWwiLCJ3aW5zdG9uIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJsZXZlbCIsInRpbWVzdGFtcCIsImNvbG9yaXplIiwicHJldHR5UHJpbnQiLCJoYW5kbGVFeGNlcHRpb25zIiwiaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbiIsIndhcm4iLCJzaWxseSIsImxvZ2dlckNvbmZpZyIsIndpbnN0b25TbGFja1dlYkhvb2siLCJTbGFja1dlYkhvb2siLCJhZGQiLCJ3ZWJob29rVXJsIiwiaWNvbkVtb2ppIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtB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TG1CO0FBTS9CeXZCLG1CQUFZO0FBTm1CLE9BQWpDO0FBUUQ7QUFDRDtBQUNBaEIsWUFBUXh0QixLQUFSLENBQWMsa0NBQWQ7QUFDQXd0QixZQUFRMXRCLElBQVIsQ0FBYSxpQ0FBYjtBQUNELEdBekJELE1BeUJPO0FBQ0wwdEIsWUFBUVMsSUFBUixDQUFhLDJFQUFiO0FBQ0Q7QUFDRixDQTlCRCxDOzs7Ozs7QUNIQSxrRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1Mik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjg5ZDM1ZjNjYWI5NWM3YzdmMGMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmNvbXBvbmVudHNDb25maWcgPSB7XG4gICAgY29tcG9uZW50czoge30sXG4gICAgY29udGFpbmVyczoge30sXG4gICAgcGFnZXMgICAgIDoge30sXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGNvbXBvbmVudHNDb25maWcsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY29tcG9uZW50c0NvbmZpZyA9IGNvbXBvbmVudHNDb25maWc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnNvbGUubG9nKCdleHBvcnRpbmcgc2VxdWVsaXplIG1vZGVscycpO1xuY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbXlzcWxDb25maWcnKTtcbmNvbnN0IGRiID0ge307XG4vLyBzZXQgc2VxdWVsaXplIG9wdGlvbnNcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICBob3N0ICAgICAgICAgIDogJ2xvY2FsaG9zdCcsXG4gIGRpYWxlY3QgICAgICAgOiAnbXlzcWwnLFxuICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSwgLy8gZml4IHRvIGVuc3VyZSBERUNJTUFMIHdpbGwgbm90IGJlIHN0b3JlZCBhcyBhIHN0cmluZ1xuICBsb2dnaW5nICAgICAgIDogZmFsc2UsXG4gIHBvb2wgICAgICAgICAgOiB7XG4gICAgbWF4ICAgIDogNSxcbiAgICBtaW4gICAgOiAwLFxuICAgIGlkbGUgICA6IDEwMDAwLFxuICAgIGFjcXVpcmU6IDEwMDAwLFxuICB9LFxufSk7XG5cbi8vIGVzdGFibGlzaCBteXNxbCBjb25uZWN0aW9uXG5zZXF1ZWxpemVcbiAgLmF1dGhlbnRpY2F0ZSgpXG4gIC50aGVuKCgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VxdWVsaXplIGhhcyBlc3RhYmxpc2hlZCBteXNxbCBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKCdTZXF1ZWxpemUgd2FzIHVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZTonLCBlcnIpO1xuICB9KTtcblxuLy8gbWFudWFsbHkgYWRkIGVhY2ggbW9kZWwgdG8gdGhlIGRiIG9iamVjdFxuY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCcuL2NlcnRpZmljYXRlLmpzJyk7XG5jb25zdCBDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJy4vY2xhaW0uanMnKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCcuL2ZpbGUuanMnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL3VzZXIuanMnKTtcbmRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG5kYlsnQ2hhbm5lbCddID0gc2VxdWVsaXplLmltcG9ydCgnQ2hhbm5lbCcsIENoYW5uZWwpO1xuZGJbJ0NsYWltJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDbGFpbScsIENsYWltKTtcbmRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG5kYlsnUmVxdWVzdCddID0gc2VxdWVsaXplLmltcG9ydCgnUmVxdWVzdCcsIFJlcXVlc3QpO1xuZGJbJ1VzZXInXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1VzZXInLCBVc2VyKTtcblxuLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4gIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgIGxvZ2dlci5pbmZvKCdBc3NvY2lhdGluZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbiAgfVxufSk7XG5cbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcblxuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwiaW1wb3J0ICdjcm9zcy1mZXRjaC9wb2x5ZmlsbCc7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBKU09OIHJldHVybmVkIGJ5IGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBwYXJzZWQgSlNPTiBmcm9tIHRoZSByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSlNPTiAocmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0IHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA1KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIHN0YXR1cyByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0IHwgdW5kZWZpbmVkfSBSZXR1cm5zIG9iamVjdCB3aXRoIHN0YXR1cyBhbmQgc3RhdHVzVGV4dCwgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzIChyZXNwb25zZSwganNvblJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgIHJldHVybiBqc29uUmVzcG9uc2U7XG4gIH1cbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoanNvblJlc3BvbnNlLm1lc3NhZ2UpO1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBSZXF1ZXN0cyBhIFVSTCwgcmV0dXJuaW5nIGEgcHJvbWlzZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsICAgICAgIFRoZSBVUkwgd2Ugd2FudCB0byByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyB3ZSB3YW50IHRvIHBhc3MgdG8gXCJmZXRjaFwiXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICAgVGhlIHJlc3BvbnNlIGRhdGFcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0ICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3Jlc3BvbnNlLCBwYXJzZUpTT04ocmVzcG9uc2UpXSk7XG4gICAgfSlcbiAgICAudGhlbigoW3Jlc3BvbnNlLCBqc29uUmVzcG9uc2VdKSA9PiB7XG4gICAgICByZXR1cm4gY2hlY2tTdGF0dXMocmVzcG9uc2UsIGpzb25SZXNwb25zZSk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcmVxdWVzdC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG4vLyBiYXNpYyByZXF1ZXN0IHBhcnNpbmdcbmV4cG9ydCBmdW5jdGlvbiBvbkhhbmRsZVNob3dQYWdlVXJpIChwYXJhbXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSxcbiAgICBkYXRhOiBwYXJhbXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3Q2hhbm5lbFJlcXVlc3QgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBDSEFOTkVMO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgY3IjJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsXG4gICAgZGF0YTogeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdBc3NldFJlcXVlc3QgKG5hbWUsIGlkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBleHRlbnNpb24pIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBleHRlbnNpb24gPyBBU1NFVF9MSVRFIDogQVNTRVRfREVUQUlMUztcbiAgY29uc3QgcmVxdWVzdElkID0gYGFyIyR7bmFtZX0jJHtpZH0jJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgICAgbmFtZSxcbiAgICAgIG1vZGlmaWVyOiB7XG4gICAgICAgIGlkLFxuICAgICAgICBjaGFubmVsOiB7XG4gICAgICAgICAgbmFtZTogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgaWQgIDogY2hhbm5lbElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdFVwZGF0ZSAocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCAoaWQsIGVycm9yLCBrZXkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIGtleSB9LFxuICB9O1xufTtcblxuLy8gYXNzZXQgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZXRUb0Fzc2V0TGlzdCAoaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhIH0sXG4gIH07XG59XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QgKGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQURELFxuICAgIGRhdGE6IHsgaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsXG4gICAgZGF0YToge2NoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZX0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MsXG4gICAgZGF0YToge2NoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGF9LFxuICB9O1xufTtcblxuLy8gZGlzcGxheSBhIGZpbGVcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVSZXF1ZXN0ZWQgKG5hbWUsIGNsYWltSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfUkVRVUVTVEVELFxuICAgIGRhdGE6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkgKHN0YXR1cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFLFxuICAgIGRhdGE6IHN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBzaXRlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsTmFtZSAgIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBjaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBjaGFubmVsTG9uZ0lkIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubG9uZ0lkLFxuICAgIHNpdGVEZXNjcmlwdGlvbjogc2l0ZS5kZXNjcmlwdGlvbixcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICAgIG9uQ2hhbm5lbExvZ291dDogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG51bGwsIG51bGwsIG51bGwpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvaW5kZXguanMiLCIvLyByZXF1ZXN0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBIQU5ETEVfU0hPV19VUkkgPSAnSEFORExFX1NIT1dfVVJJJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0VSUk9SID0gJ1JFUVVFU1RfRVJST1InO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfVVBEQVRFID0gJ1JFUVVFU1RfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9SRVFVRVNUX05FVyA9ICdBU1NFVF9SRVFVRVNUX05FVyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9SRVFVRVNUX05FVyA9ICdDSEFOTkVMX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0xJU1RfQUREID0gJ1JFUVVFU1RfTElTVF9BREQnO1xuXG4vLyBhc3NldCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQVNTRVRfQUREID0gYEFTU0VUX0FERGA7XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQUREID0gJ0NIQU5ORUxfQUREJztcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyA9ICdDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTJztcblxuLy8gYXNzZXQvZmlsZSBkaXNwbGF5IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBGSUxFX1JFUVVFU1RFRCA9ICdGSUxFX1JFUVVFU1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFID0gJ0ZJTEVfQVZBSUxBQklMSVRZX1VQREFURSc7XG5leHBvcnQgY29uc3QgRElTUExBWV9BU1NFVF9FUlJPUiA9ICdESVNQTEFZX0FTU0VUX0VSUk9SJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZSB9KSA9PiB7XG4gIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBkZXNjcmlwdGlvbjogc2l0ZURlc2NyaXB0aW9uLCBob3N0OiBzaXRlSG9zdCwgdGl0bGU6IHNpdGVUaXRsZSwgdHdpdHRlcjogc2l0ZVR3aXR0ZXIgfSA9IHNpdGU7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gICAgc2l0ZURlc2NyaXB0aW9uLFxuICAgIHNpdGVIb3N0LFxuICAgIHNpdGVUaXRsZSxcbiAgICBzaXRlVHdpdHRlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RBc3NldCA9IChzaG93KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7XG4gIHJldHVybiBzaG93LmFzc2V0TGlzdFthc3NldEtleV07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hvd1N0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaG93O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBjb21wb25lbnRzQ29uZmlnIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBnZXREZWVwZXN0Q2hpbGRWYWx1ZSAocGFyZW50LCBjaGlsZHJlbktleXMpIHtcbiAgbGV0IGNoaWxkS2V5ID0gY2hpbGRyZW5LZXlzLnNoaWZ0KCk7IC8vIC5zaGlmdCgpIHJldHJpZXZlcyB0aGUgZmlyc3QgZWxlbWVudCBvZiBhcnJheSBhbmQgcmVtb3ZlcyBpdCBmcm9tIGFycmF5XG4gIGxldCBjaGlsZCA9IHBhcmVudFtjaGlsZEtleV07XG4gIGlmIChjaGlsZHJlbktleXMubGVuZ3RoID49IDEpIHtcbiAgICByZXR1cm4gZ2V0RGVlcGVzdENoaWxkVmFsdWUoY2hpbGQsIGNoaWxkcmVuS2V5cyk7XG4gIH1cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG5leHBvcnQgY29uc3QgZHluYW1pY0ltcG9ydCA9IChmaWxlUGF0aCkgPT4ge1xuICAvLyB2YWxpZGF0ZSBpbnB1dHNcbiAgaWYgKCFmaWxlUGF0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIHByb3ZpZGVkIHRvIGR5bmFtaWNJbXBvcnQoKScpO1xuICB9XG4gIGlmICh0eXBlb2YgZmlsZVBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgY29uc29sZS5sb2coJ2R5bmFtaWNJbXBvcnQgPiBmaWxlUGF0aDonLCBmaWxlUGF0aCk7XG4gICAgY29uc29sZS5sb2coJ2R5bmFtaWNJbXBvcnQgPiBmaWxlUGF0aCB0eXBlOicsIHR5cGVvZiBmaWxlUGF0aCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmaWxlIHBhdGggcHJvdmlkZWQgdG8gZHluYW1pY0ltcG9ydCgpIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgfVxuICBpZiAoIWNvbXBvbmVudHNDb25maWcpIHtcbiAgICBjb25zb2xlLmxvZygnbm8gY29tcG9uZW50c0NvbmZpZyBmb3VuZCBpbiBzaXRlQ29uZmlnLmpzJyk7XG4gICAgcmV0dXJuIHJlcXVpcmUoYCR7ZmlsZVBhdGh9YCk7XG4gIH1cbiAgLy8gc3BsaXQgb3V0IHRoZSBmaWxlIGZvbGRlcnMgIC8vIGZpbHRlciBvdXQgYW55IGVtcHR5IG9yIHdoaXRlLXNwYWNlLW9ubHkgc3RyaW5nc1xuICBjb25zdCBmb2xkZXJzID0gZmlsZVBhdGguc3BsaXQoJy8nKS5maWx0ZXIoZm9sZGVyTmFtZSA9PiBmb2xkZXJOYW1lLnJlcGxhY2UoL1xccy9nLCAnJykubGVuZ3RoKTtcbiAgLy8gY2hlY2sgZm9yIHRoZSBjb21wb25lbnQgY29ycmVzcG9uZGluZyB0byBmaWxlIHBhdGggaW4gdGhlIHNpdGUgY29uZmlnIG9iamVjdFxuICAvLyBpLmUuIGNvbXBvbmVudHNDb25maWdbZm9sZGVyc1swXV1bZm9sZGVyc1syXVsuLi5dW2ZvbGRlcnNbbl1dXG4gIGNvbnN0IGN1c3RvbUNvbXBvbmVudCA9IGdldERlZXBlc3RDaGlsZFZhbHVlKGNvbXBvbmVudHNDb25maWcsIGZvbGRlcnMpO1xuICBpZiAoY3VzdG9tQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGN1c3RvbUNvbXBvbmVudDsgIC8vIHJldHVybiBjdXN0b20gY29tcG9uZW50XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoYCR7ZmlsZVBhdGh9YCk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvZHluYW1pY0ltcG9ydC5qcyIsImNvbnN0IGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayA9IChwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7cGFnZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBzaXRlSG9zdCkgPT4ge1xuICBsZXQgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQ7XG4gIGlmIChhc3NldC5jbGFpbURhdGEpIHtcbiAgICAoeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9LyR7bmFtZX1gO1xuICB9O1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayA9IChjaGFubmVsLCBzaXRlSG9zdCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWA7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2Fub25pY2FsTGluayA9IChhc3NldCwgY2hhbm5lbCwgcGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayhhc3NldCwgc2l0ZUhvc3QpO1xuICB9XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rKGNoYW5uZWwsIHNpdGVIb3N0KTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rKHBhZ2UsIHNpdGVIb3N0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXggIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIGFmdGVyIFwiQFwiLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQ6IGNoYW5uZWxDbGFpbUlkIHx8IG51bGwsXG4gICAgICBjbGFpbUlkICAgICAgIDogY2xhaW1JZCB8fCBudWxsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgZXh0ZW5zaW9uKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIGV4dGVuc2lvbiBzZXBhcmF0b3IsIGV4dGVuc2lvbiAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBleHRlbnNpb25TZXBlcmF0b3IsIGV4dGVuc2lvbl0gPSBjb21wb25lbnRzUmVnZXggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMobmFtZSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIi5cIicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIGV4dGVuc2lvblxuICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IpIHtcbiAgICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIi5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIgc2VwYXJhdG9yIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWUuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgICBleHRlbnNpb246IGV4dGVuc2lvbiB8fCBudWxsLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2xicnlVcmkuanMiLCJjb25zdCBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gKHRodW1ibmFpbCkgPT4ge1xuICBpZiAodGh1bWJuYWlsKSB7XG4gICAgY29uc3QgZmlsZUV4dCA9IHRodW1ibmFpbC5zdWJzdHJpbmcodGh1bWJuYWlsLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIHN3aXRjaCAoZmlsZUV4dCkge1xuICAgICAgY2FzZSAnanBlZyc6XG4gICAgICBjYXNlICdqcGcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgICAgY2FzZSAncG5nJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9wbmcnO1xuICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9naWYnO1xuICAgICAgY2FzZSAnbXA0JzpcbiAgICAgICAgcmV0dXJuICd2aWRlby9tcDQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuY29uc3QgY3JlYXRlQmFzaWNNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKSA9PiB7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNpdGVIb3N0fSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogc2l0ZURlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxNZXRhVGFncyA9IChzaXRlVGl0bGUsIHNpdGVIb3N0LCBzaXRlVHdpdHRlciwgY2hhbm5lbCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IGAke25hbWV9IG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBgJHtuYW1lfSwgYSBjaGFubmVsIG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YSB9ID0gYXNzZXQ7XG4gIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGNsYWltRGF0YTtcbiAgY29uc3QgZW1iZWRVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzaG93VXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc291cmNlID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9LiR7Y2xhaW1EYXRhLmZpbGVFeHR9YDtcbiAgY29uc3Qgb2dUaXRsZSA9IGNsYWltRGF0YS50aXRsZSB8fCBjbGFpbURhdGEubmFtZTtcbiAgY29uc3Qgb2dEZXNjcmlwdGlvbiA9IGNsYWltRGF0YS5kZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb247XG4gIGNvbnN0IG9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlKGNsYWltRGF0YS50aHVtYm5haWwpO1xuICBjb25zdCBvZ1RodW1ibmFpbCA9IGNsYWltRGF0YS50aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbDtcbiAgY29uc3QgbWV0YVRhZ3MgPSBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBvZ1RpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaG93VXJsfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogb2dEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6d2lkdGgnLCBjb250ZW50OiA2MDB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOmhlaWdodCcsIGNvbnRlbnQ6IDMxNX0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICBdO1xuICBpZiAoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnIHx8IGNvbnRlbnRUeXBlID09PSAndmlkZW8vd2VibScpIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzpzZWN1cmVfdXJsJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogb2dUaHVtYm5haWx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBvZ1RodW1ibmFpbENvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ3ZpZGVvJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3BsYXllcid9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyJywgY29udGVudDogZW1iZWRVcmx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOndpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnRleHQ6cGxheWVyX3dpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpoZWlnaHQnLCBjb250ZW50OiAzMzd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtOmNvbnRlbnRfdHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gIH0gZWxzZSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ2FydGljbGUnfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeV9sYXJnZV9pbWFnZSd9KTtcbiAgfVxuICByZXR1cm4gbWV0YVRhZ3M7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTWV0YVRhZ3MgPSAoc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIH07XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgY2hhbm5lbCk7XG4gIH07XG4gIHJldHVybiBjcmVhdGVCYXNpY01ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsImV4cG9ydCBjb25zdCBjcmVhdGVQYWdlVGl0bGUgPSAoc2l0ZVRpdGxlLCBwYWdlVGl0bGUpID0+IHtcbiAgaWYgKCFwYWdlVGl0bGUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZVRpdGxlfWA7XG4gIH1cbiAgcmV0dXJuIGAke3NpdGVUaXRsZX0gLSAke3BhZ2VUaXRsZX1gO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9wYWdlVGl0bGUuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbi8vIGV4cG9ydCBhY3Rpb24gY3JlYXRvcnNcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgc2hvcnRJZCxcbiAgICAgIGxvbmdJZCxcbiAgICB9LFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL2NoYW5uZWwuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcyc7XG5cbi8vIGV4cG9ydCBhY3Rpb24gY3JlYXRvcnNcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RGaWxlIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX1NFTEVDVEVELFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJGaWxlICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfQ0xFQVIsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWV0YWRhdGEgKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5NRVRBREFUQV9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHZhbHVlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2xhaW0gKHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DTEFJTV9VUERBVEUsXG4gICAgZGF0YTogdmFsdWUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0UHVibGlzaEluQ2hhbm5lbCAoY2hhbm5lbCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCxcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVB1Ymxpc2hTdGF0dXMgKHN0YXR1cywgbWVzc2FnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUFVCTElTSF9TVEFUVVNfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVFcnJvciAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkVSUk9SX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZENoYW5uZWwgKGNoYW5uZWxOYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRUxFQ1RFRF9DSEFOTkVMX1VQREFURSxcbiAgICBkYXRhOiBjaGFubmVsTmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVNZXRhZGF0YUlucHV0cyAoc2hvd01ldGFkYXRhSW5wdXRzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5UT0dHTEVfTUVUQURBVEFfSU5QVVRTLFxuICAgIGRhdGE6IHNob3dNZXRhZGF0YUlucHV0cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld1RodW1ibmFpbCAoZmlsZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuVEhVTUJOQUlMX05FVyxcbiAgICBkYXRhOiBmaWxlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UHVibGlzaCAoaGlzdG9yeSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUFVCTElTSF9TVEFSVCxcbiAgICBkYXRhOiB7IGhpc3RvcnkgfSxcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL3B1Ymxpc2guanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicHJvcC10eXBlc1wiXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuXG5jbGFzcyBFcnJvclBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPHA+e2Vycm9yfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5FcnJvclBhZ2UucHJvcFR5cGVzID0ge1xuICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIE15c3FsQ29uZmlnICgpIHtcbiAgdGhpcy5kYXRhYmFzZSA9ICdkZWZhdWx0JztcbiAgdGhpcy51c2VybmFtZSA9ICdkZWZhdWx0JztcbiAgdGhpcy5wYXNzd29yZCA9ICdkZWZhdWx0JztcbiAgdGhpcy5jb25maWd1cmUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gTXlTUUwgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7ZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZH0gPSBjb25maWc7XG4gICAgdGhpcy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBNeXNxbENvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwiZnVuY3Rpb24gU2xhY2tDb25maWcgKCkge1xuICB0aGlzLnNsYWNrV2ViSG9vayAgICAgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzbGFjayBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLnNsYWNrV2ViSG9vayA9IHNsYWNrV2ViSG9vaztcbiAgICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gc2xhY2tFcnJvckNoYW5uZWw7XG4gICAgdGhpcy5zbGFja0luZm9DaGFubmVsID0gc2xhY2tJbmZvQ2hhbm5lbDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNsYWNrQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1sb2NhbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCJcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlcXVlbGl6ZVwiXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuU2hvcnRJZDogZnVuY3Rpb24gKGNsYWltc0FycmF5LCBsb25nSWQpIHtcbiAgICBsZXQgY2xhaW1JbmRleDtcbiAgICBsZXQgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgMSk7IC8vIGRlZmF1bHQgc2hvcnQgaWQgaXMgdGhlIGZpcnN0IGxldHRlclxuICAgIGxldCBzaG9ydElkTGVuZ3RoID0gMDtcbiAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGlzIGNsYWltIGlkXG4gICAgY2xhaW1JbmRleCA9IGNsYWltc0FycmF5LmZpbmRJbmRleChlbGVtZW50ID0+IHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYWltSWQgPT09IGxvbmdJZDtcbiAgICB9KTtcbiAgICBpZiAoY2xhaW1JbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xhaW0gaWQgbm90IGZvdW5kIGluIGNsYWltcyBsaXN0Jyk7XG4gICAgfVxuICAgIC8vIGdldCBhbiBhcnJheSBvZiBhbGwgY2xhaW1zIHdpdGggbG93ZXIgaGVpZ2h0XG4gICAgbGV0IHBvc3NpYmxlTWF0Y2hlcyA9IGNsYWltc0FycmF5LnNsaWNlKDAsIGNsYWltSW5kZXgpO1xuICAgIC8vIHJlbW92ZSBjZXJ0aWZpY2F0ZXMgd2l0aCB0aGUgc2FtZSBwcmVmaXhlcyB1bnRpbCBub25lIGFyZSBsZWZ0LlxuICAgIHdoaWxlIChwb3NzaWJsZU1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2hvcnRJZExlbmd0aCArPSAxO1xuICAgICAgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCk7XG4gICAgICBwb3NzaWJsZU1hdGNoZXMgPSBwb3NzaWJsZU1hdGNoZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQuY2xhaW1JZCAmJiAoZWxlbWVudC5jbGFpbUlkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKSA9PT0gc2hvcnRJZCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzaG9ydElkO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHsgZGV0YWlscywgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5ICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gdmFsaWRhdGUgbmFtZVxuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBuYW1lIGZpZWxkIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgY29uc3QgaW52YWxpZE5hbWVDaGFyYWN0ZXJzID0gL1teQS1aYS16MC05LC1dLy5leGVjKG5hbWUpO1xuICAgIGlmIChpbnZhbGlkTmFtZUNoYXJhY3RlcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNsYWltIG5hbWUgeW91IHByb3ZpZGVkIGlzIG5vdCBhbGxvd2VkLiAgT25seSB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnMgYXJlIGFsbG93ZWQ6IEEtWiwgYS16LCAwLTksIGFuZCBcIi1cIicpO1xuICAgIH1cbiAgICAvLyBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgbnNmdyA9IChuc2Z3ID09PSAndHJ1ZScpO1xuICAgIGxpY2Vuc2UgPSBsaWNlbnNlIHx8IG51bGw7XG4gICAgdGl0bGUgPSB0aXRsZSB8fCBudWxsO1xuICAgIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gfHwgbnVsbDtcbiAgICB0aHVtYm5haWwgPSB0aHVtYm5haWwgfHwgbnVsbDtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgbnNmdyxcbiAgICAgIGxpY2Vuc2UsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgdGh1bWJuYWlsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyAoe2ZpbGUsIHRodW1ibmFpbH0pIHtcbiAgICAvLyBtYWtlIHN1cmUgYSBmaWxlIHdhcyBwcm92aWRlZFxuICAgIGlmICghZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHdpdGgga2V5IG9mIFtmaWxlXSBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5wYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcGF0aCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlIG5hbWVcbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZVxuICAgIG1vZHVsZS5leHBvcnRzLnZhbGlkYXRlRmlsZVR5cGVBbmRTaXplKGZpbGUpO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVOYW1lICAgICAgICAgOiBmaWxlLm5hbWUsXG4gICAgICBmaWxlUGF0aCAgICAgICAgIDogZmlsZS5wYXRoLFxuICAgICAgZmlsZVR5cGUgICAgICAgICA6IGZpbGUudHlwZSxcbiAgICAgIHRodW1ibmFpbEZpbGVOYW1lOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLm5hbWUgOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVQYXRoOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnBhdGggOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVUeXBlOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnR5cGUgOiBudWxsKSxcbiAgICB9O1xuICB9LFxuICB2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSAoZmlsZSkge1xuICAgIC8vIGNoZWNrIGZpbGUgdHlwZSBhbmQgc2l6ZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuanBlZy8uanBnLy5wbmcgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmdpZiB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIC5naWZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5tcDQgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gdW5yZWNvZ25pemVkIGZpbGUgdHlwZScpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSAnICsgZmlsZS50eXBlICsgJyBjb250ZW50IHR5cGUgaXMgbm90IHN1cHBvcnRlZC4gIE9ubHksIC5qcGVnLCAucG5nLCAuZ2lmLCBhbmQgLm1wNCBmaWxlcyBhcmUgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGU7XG4gIH0sXG4gIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyAoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBwcm92aWRlIGRlZmF1bHRzIGZvciB0aXRsZVxuICAgIGlmICh0aXRsZSA9PT0gbnVsbCB8fCB0aXRsZS50cmltKCkgPT09ICcnKSB7XG4gICAgICB0aXRsZSA9IG5hbWU7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgZGVzY3JpcHRpb25cbiAgICBpZiAoZGVzY3JpcHRpb24gPT09IG51bGwgfHwgZGVzY3JpcHRpb24udHJpbSgpID09PSAnJykge1xuICAgICAgZGVzY3JpcHRpb24gPSAnJztcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBsaWNlbnNlXG4gICAgaWYgKGxpY2Vuc2UgPT09IG51bGwgfHwgbGljZW5zZS50cmltKCkgPT09ICcnKSB7XG4gICAgICBsaWNlbnNlID0gJyAnOyAgLy8gZGVmYXVsdCB0byBlbXB0eSBzdHJpbmdcbiAgICB9XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIGNvbnN0IHB1Ymxpc2hQYXJhbXMgPSB7XG4gICAgICBuYW1lLFxuICAgICAgZmlsZV9wYXRoOiBmaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvciAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgfTtcbiAgICAvLyBhZGQgdGh1bWJuYWlsIHRvIGNoYW5uZWwgaWYgdmlkZW9cbiAgICBpZiAodGh1bWJuYWlsKSB7XG4gICAgICBwdWJsaXNoUGFyYW1zWydtZXRhZGF0YSddWyd0aHVtYm5haWwnXSA9IHRodW1ibmFpbDtcbiAgICB9XG4gICAgcmV0dXJuIHB1Ymxpc2hQYXJhbXM7XG4gIH0sXG4gIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMgKHRodW1ibmFpbEZpbGVQYXRoLCBjbGFpbU5hbWUsIGxpY2Vuc2UsIG5zZncpIHtcbiAgICBpZiAoIXRodW1ibmFpbEZpbGVQYXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgVGh1bWJuYWlsIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSAgICAgOiBgJHtjbGFpbU5hbWV9LXRodW1iYCxcbiAgICAgIGZpbGVfcGF0aDogdGh1bWJuYWlsRmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgdGl0bGUgICAgICA6IGAke2NsYWltTmFtZX0gdGh1bWJuYWlsYCxcbiAgICAgICAgZGVzY3JpcHRpb246IGBhIHRodW1ibmFpbCBmb3IgJHtjbGFpbU5hbWV9YCxcbiAgICAgICAgYXV0aG9yICAgICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlICAgOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICAgIGNoYW5uZWxfbmFtZSA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxfaWQgICA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbElkLFxuICAgIH07XG4gIH0sXG4gIGRlbGV0ZVRlbXBvcmFyeUZpbGUgKGZpbGVQYXRoKSB7XG4gICAgZnMudW5saW5rKGZpbGVQYXRoLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYGVycm9yIGRlbGV0aW5nIHRlbXBvcmFyeSBmaWxlICR7ZmlsZVBhdGh9YCk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1Zyhgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQgJHtmaWxlUGF0aH1gKTtcbiAgICB9KTtcbiAgfSxcbiAgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEgKGZpbGVJbmZvLCBnZXRSZXN1bHQpIHtcbiAgICBmaWxlSW5mby5maWxlTmFtZSA9IGdldFJlc3VsdC5maWxlX25hbWU7XG4gICAgZmlsZUluZm8uZmlsZVBhdGggPSBnZXRSZXN1bHQuZG93bmxvYWRfcGF0aDtcbiAgICByZXR1cm4gZmlsZUluZm87XG4gIH0sXG4gIGNyZWF0ZUZpbGVEYXRhICh7IG5hbWUsIGNsYWltSWQsIG91dHBvaW50LCBoZWlnaHQsIGFkZHJlc3MsIG5zZncsIGNvbnRlbnRUeXBlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGNsYWltSWQsXG4gICAgICBvdXRwb2ludCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGFkZHJlc3MsXG4gICAgICBmaWxlTmFtZTogJycsXG4gICAgICBmaWxlUGF0aDogJycsXG4gICAgICBmaWxlVHlwZTogY29udGVudFR5cGUsXG4gICAgICBuc2Z3LFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVFcnJvclJlc3BvbnNlOiBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBvbiAke29yaWdpbmFsVXJsfWAsIG1vZHVsZS5leHBvcnRzLnVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyhlcnJvcikpO1xuICAgIGNvbnN0IFtzdGF0dXMsIG1lc3NhZ2VdID0gbW9kdWxlLmV4cG9ydHMucmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoc3RhdHVzKVxuICAgICAgLmpzb24obW9kdWxlLmV4cG9ydHMuY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQoc3RhdHVzLCBtZXNzYWdlKSk7XG4gIH0sXG4gIHJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1czogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgbGV0IHN0YXR1cywgbWVzc2FnZTtcbiAgICAvLyBjaGVjayBmb3IgZGFlbW9uIGJlaW5nIHR1cm5lZCBvZmZcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHN0YXR1cyA9IDUwMztcbiAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiByZWZ1c2VkLiAgVGhlIGRhZW1vbiBtYXkgbm90IGJlIHJ1bm5pbmcuJztcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gNDAwO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFtzdGF0dXMsIG1lc3NhZ2VdO1xuICB9LFxuICB1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXM6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBuZXdFcnJvck9iamVjdCA9IHt9O1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbmV3RXJyb3JPYmplY3Rba2V5XSA9IGVycltrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3RXJyb3JPYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH0sXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUmVkdWNlciBmcm9tICcuLi8uLi9jbGllbnQvcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXgnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi8uLi9jbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlLmpzJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyKTtcblxuICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICA8QXBwIC8+XG4gICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG5cbiAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgLy8gU29tZXdoZXJlIGEgYDxSZWRpcmVjdD5gIHdhcyByZW5kZXJlZFxuICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UncmUgZ29vZCwgc2VuZCB0aGUgcmVzcG9uc2VcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFB1Ymxpc2hSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3B1Ymxpc2gnO1xuaW1wb3J0IENoYW5uZWxSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL2NoYW5uZWwnO1xuaW1wb3J0IFNob3dSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3Nob3cnO1xuaW1wb3J0IFNpdGVSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3NpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICBjaGFubmVsOiBDaGFubmVsUmVkdWNlcixcbiAgcHVibGlzaDogUHVibGlzaFJlZHVjZXIsXG4gIHNob3cgICA6IFNob3dSZWR1Y2VyLFxuICBzaXRlICAgOiBTaXRlUmVkdWNlcixcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IEZJTEVfU0VMRUNURUQgPSAnRklMRV9TRUxFQ1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9DTEVBUiA9ICdGSUxFX0NMRUFSJztcbmV4cG9ydCBjb25zdCBNRVRBREFUQV9VUERBVEUgPSAnTUVUQURBVEFfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBDTEFJTV9VUERBVEUgPSAnQ0xBSU1fVVBEQVRFJztcbmV4cG9ydCBjb25zdCBTRVRfUFVCTElTSF9JTl9DSEFOTkVMID0gJ1NFVF9QVUJMSVNIX0lOX0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hfU1RBVFVTX1VQREFURSA9ICdQVUJMSVNIX1NUQVRVU19VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEVSUk9SX1VQREFURSA9ICdFUlJPUl9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFID0gJ1NFTEVDVEVEX0NIQU5ORUxfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfTUVUQURBVEFfSU5QVVRTID0gJ1RPR0dMRV9NRVRBREFUQV9JTlBVVFMnO1xuZXhwb3J0IGNvbnN0IFRIVU1CTkFJTF9ORVcgPSAnVEhVTUJOQUlMX05FVyc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFSVCA9ICdQVUJMSVNIX1NUQVJUJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgQ0hBTk5FTF9VUERBVEUgPSAnQ0hBTk5FTF9VUERBVEUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBMT0NBTF9DSEVDSyA9ICdMT0NBTF9DSEVDSyc7XG5leHBvcnQgY29uc3QgVU5BVkFJTEFCTEUgPSAnVU5BVkFJTEFCTEUnO1xuZXhwb3J0IGNvbnN0IEVSUk9SID0gJ0VSUk9SJztcbmV4cG9ydCBjb25zdCBBVkFJTEFCTEUgPSAnQVZBSUxBQkxFJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdvb2dsZUFuYWx5dGljcyBmcm9tICdyZWFjdC1nYSc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5jb25zdCB7IGFuYWx5dGljczogeyBnb29nbGVJZCB9IH0gPSByZXF1aXJlKCcuLi8uLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5Hb29nbGVBbmFseXRpY3MuaW5pdGlhbGl6ZShnb29nbGVJZCk7XG5cbmNsYXNzIEdBTGlzdGVuZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zZW5kUGFnZVZpZXcodGhpcy5wcm9wcy5oaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0aGlzLnByb3BzLmhpc3RvcnkubGlzdGVuKHRoaXMuc2VuZFBhZ2VWaWV3KTtcbiAgfVxuXG4gIHNlbmRQYWdlVmlldyAobG9jYXRpb24pIHtcbiAgICBHb29nbGVBbmFseXRpY3Muc2V0KHsgcGFnZTogbG9jYXRpb24ucGF0aG5hbWUgfSk7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnBhZ2V2aWV3KGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihHQUxpc3RlbmVyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlLCBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IGR5bmFtaWNJbXBvcnQgfSBmcm9tICd1dGlscy9keW5hbWljSW1wb3J0JztcbmltcG9ydCBBYm91dFBhZ2UgZnJvbSAncGFnZXMvQWJvdXRQYWdlJztcbmltcG9ydCBMb2dpblBhZ2UgZnJvbSAncGFnZXMvTG9naW5QYWdlJztcbmltcG9ydCBTaG93UGFnZSBmcm9tICdwYWdlcy9TaG93UGFnZSc7XG5pbXBvcnQgRm91ck9oRm91clBhZ2UgZnJvbSAnY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZSc7XG5jb25zdCBIb21lUGFnZSA9IGR5bmFtaWNJbXBvcnQoJ3BhZ2VzL0hvbWVQYWdlJyk7IC8vIG9yIHVzZSB0aGUgcHJvdmlkZWQgbG9jYWwgaG9tZXBhZ2VcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTd2l0Y2g+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXtIb21lUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvYWJvdXQnIGNvbXBvbmVudD17QWJvdXRQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9sb2dpbicgY29tcG9uZW50PXtMb2dpblBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzppZGVudGlmaWVyLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGNvbXBvbmVudD17Rm91ck9oRm91clBhZ2V9IC8+XG4gICAgPC9Td2l0Y2g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBwLmpzIiwidmFyIG1hcCA9IHtcblx0XCIuL2Nhbm9uaWNhbExpbmtcIjogMTgsXG5cdFwiLi9jYW5vbmljYWxMaW5rLmpzXCI6IDE4LFxuXHRcIi4vZHluYW1pY0ltcG9ydFwiOiAxNyxcblx0XCIuL2R5bmFtaWNJbXBvcnQuanNcIjogMTcsXG5cdFwiLi9maWxlXCI6IDQ0LFxuXHRcIi4vZmlsZS5qc1wiOiA0NCxcblx0XCIuL2xicnlVcmlcIjogMTksXG5cdFwiLi9sYnJ5VXJpLmpzXCI6IDE5LFxuXHRcIi4vbWV0YVRhZ3NcIjogMjAsXG5cdFwiLi9tZXRhVGFncy5qc1wiOiAyMCxcblx0XCIuL3BhZ2VUaXRsZVwiOiAyMSxcblx0XCIuL3BhZ2VUaXRsZS5qc1wiOiAyMSxcblx0XCIuL3B1Ymxpc2hcIjogNDUsXG5cdFwiLi9wdWJsaXNoLmpzXCI6IDQ1LFxuXHRcIi4vcmVxdWVzdFwiOiA2LFxuXHRcIi4vcmVxdWVzdC5qc1wiOiA2LFxuXHRcIi4vdmFsaWRhdGVcIjogNDYsXG5cdFwiLi92YWxpZGF0ZS5qc1wiOiA0NlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDQzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2xpZW50L3V0aWxzIF4uKiRcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB2YWxpZGF0ZUZpbGUgKGZpbGUpIHtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwcm92aWRlZCcpO1xuICAgIH1cbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSBzaXplIGFuZCB0eXBlXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBHSUZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZmlsZS50eXBlICsgJyBpcyBub3QgYSBzdXBwb3J0ZWQgZmlsZSB0eXBlLiBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9maWxlLmpzIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVB1Ymxpc2hNZXRhZGF0YSA9IChjbGFpbSwgeyB0eXBlIH0sIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3IH0sIHB1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCkgPT4ge1xuICBsZXQgbWV0YWRhdGEgPSB7XG4gICAgbmFtZTogY2xhaW0sXG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgbGljZW5zZSxcbiAgICBuc2Z3LFxuICAgIHR5cGUsXG4gIH07XG4gIGlmIChwdWJsaXNoSW5DaGFubmVsKSB7XG4gICAgbWV0YWRhdGFbJ2NoYW5uZWxOYW1lJ10gPSBzZWxlY3RlZENoYW5uZWw7XG4gIH1cbiAgcmV0dXJuIG1ldGFkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVB1Ymxpc2hGb3JtRGF0YSA9IChmaWxlLCB0aHVtYm5haWwsIG1ldGFkYXRhKSA9PiB7XG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuICAvLyBhcHBlbmQgZmlsZVxuICBmZC5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcbiAgLy8gYXBwZW5kIHRodW1ibmFpbFxuICBpZiAodGh1bWJuYWlsKSB7XG4gICAgZmQuYXBwZW5kKCd0aHVtYm5haWwnLCB0aHVtYm5haWwpO1xuICB9XG4gIC8vIGFwcGVuZCBtZXRhZGF0YVxuICBmb3IgKGxldCBrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICBpZiAobWV0YWRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgZmQuYXBwZW5kKGtleSwgbWV0YWRhdGFba2V5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmZDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVUaHVtYm5haWxVcmwgPSAoY2hhbm5lbCwgY2hhbm5lbElkLCBjbGFpbSwgaG9zdCkgPT4ge1xuICByZXR1cm4gYCR7aG9zdH0vJHtjaGFubmVsfToke2NoYW5uZWxJZH0vJHtjbGFpbX0tdGh1bWIucG5nYDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcHVibGlzaC5qcyIsImV4cG9ydCBjb25zdCB2YWxpZGF0ZUNoYW5uZWxTZWxlY3Rpb24gPSAocHVibGlzaEluQ2hhbm5lbCwgc2VsZWN0ZWRDaGFubmVsLCBsb2dnZWRJbkNoYW5uZWwpID0+IHtcbiAgaWYgKHB1Ymxpc2hJbkNoYW5uZWwgJiYgKHNlbGVjdGVkQ2hhbm5lbCAhPT0gbG9nZ2VkSW5DaGFubmVsLm5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdMb2cgaW4gdG8gYSBjaGFubmVsIG9yIHNlbGVjdCBBbm9ueW1vdXMnKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlUHVibGlzaFBhcmFtcyA9IChmaWxlLCBjbGFpbSwgdXJsRXJyb3IpID0+IHtcbiAgaWYgKCFmaWxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgY2hvb3NlIGEgZmlsZScpO1xuICB9XG4gIGlmICghY2xhaW0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBlbnRlciBhIFVSTCcpO1xuICB9XG4gIGlmICh1cmxFcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignRml4IHRoZSB1cmwnKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy92YWxpZGF0ZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhcic7XG5pbXBvcnQgSW5hY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhcic7XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiYXJzICAgICAgIDogW10sXG4gICAgICBpbmRleCAgICAgIDogMCxcbiAgICAgIGluY3JlbWVudGVyOiAxLFxuICAgIH07XG4gICAgdGhpcy5jcmVhdGVCYXJzID0gdGhpcy5jcmVhdGVCYXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyID0gdGhpcy5zdGFydFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhciA9IHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhciA9IHRoaXMuc3RvcFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuY3JlYXRlQmFycygpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNyZWF0ZUJhcnMgKCkge1xuICAgIGNvbnN0IGJhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnByb3BzLnNpemU7IGkrKykge1xuICAgICAgYmFycy5wdXNoKHtpc0FjdGl2ZTogZmFsc2V9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGJhcnMgfSk7XG4gIH1cbiAgc3RhcnRQcm9ncmVzc0JhciAoKSB7XG4gICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKSwgMzAwKTtcbiAgfTtcbiAgdXBkYXRlUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuaW5kZXg7XG4gICAgbGV0IGluY3JlbWVudGVyID0gdGhpcy5zdGF0ZS5pbmNyZW1lbnRlcjtcbiAgICBsZXQgYmFycyA9IHRoaXMuc3RhdGUuYmFycztcbiAgICAvLyBmbGlwIGluY3JlbWVudGVyIGlmIG5lY2Vzc2FyeSwgdG8gc3RheSBpbiBib3VuZHNcbiAgICBpZiAoKGluZGV4IDwgMCkgfHwgKGluZGV4ID4gdGhpcy5wcm9wcy5zaXplKSkge1xuICAgICAgaW5jcmVtZW50ZXIgPSBpbmNyZW1lbnRlciAqIC0xO1xuICAgICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB0aGUgaW5kZXhlZCBiYXJcbiAgICBpZiAoaW5jcmVtZW50ZXIgPiAwKSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgICAvLyBpbmNyZW1lbnQgaW5kZXhcbiAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGJhcnMsXG4gICAgICBpbmNyZW1lbnRlcixcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuICBzdG9wUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gIH07XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnN0YXRlLmJhcnMubWFwKChiYXIsIGluZGV4KSA9PiBiYXIuaXNBY3RpdmUgPyA8QWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9IC8+IDogPEluYWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9Lz4pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuUHJvZ3Jlc3NCYXIucHJvcFR5cGVzID0ge1xuICBzaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzeCIsImV4cG9ydCBjb25zdCBDSEFOTkVMID0gJ0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0xJVEUgPSAnQVNTRVRfTElURSc7XG5leHBvcnQgY29uc3QgQVNTRVRfREVUQUlMUyA9ICdBU1NFVF9ERVRBSUxTJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBmaWxlUmVxdWVzdGVkIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGVycm9yIGFuZCBzdGF0dXNcbiAgY29uc3QgZXJyb3IgID0gc2hvdy5kaXNwbGF5QXNzZXQuZXJyb3I7XG4gIGNvbnN0IHN0YXR1cyA9IHNob3cuZGlzcGxheUFzc2V0LnN0YXR1cztcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBlcnJvcixcbiAgICBzdGF0dXMsXG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25GaWxlUmVxdWVzdDogKG5hbWUsIGNsYWltSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKGZpbGVSZXF1ZXN0ZWQobmFtZSwgY2xhaW1JZCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpID0+IHtcbiAgLy8gdGFrZSB0aGUgaHRtbCBhbmQgcHJlbG9hZGVkU3RhdGUgYW5kIHJldHVybiB0aGUgZnVsbCBwYWdlXG4gIHJldHVybiBgXG4gICAgPCFET0NUWVBFIGh0bWw+XG4gICAgPGh0bWwgbGFuZz1cImVuXCIgcHJlZml4PVwib2c6IGh0dHA6Ly9vZ3AubWUvbnMjIGZiOiBodHRwOi8vb2dwLm1lL25zL2ZiI1wiPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MSwgdXNlci1zY2FsYWJsZT1ub1wiPlxuICAgICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJpZT1lZGdlXCI+XG4gICAgICAgICAgICA8IS0taGVsbWV0LS0+XG4gICAgICAgICAgICAke2hlbG1ldC50aXRsZS50b1N0cmluZygpfVxuICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgJHtoZWxtZXQubGluay50b1N0cmluZygpfVxuICAgICAgICAgICAgPCEtLXN0eWxlIHNoZWV0cy0tPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9yZXNldC5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvZ2VuZXJhbC5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvbWVkaWFRdWVyaWVzLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPCEtLWdvb2dsZSBmb250LS0+XG4gICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzozMDBcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgICAgIDwvaGVhZD5cbiAgICAgICAgPGJvZHkgaWQ9XCJtYWluLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicmVhY3QtYXBwXCIgY2xhc3M9XCJyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW5cIj4ke2h0bWx9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzY3JpcHQ+XG4gICAgICAgICAgICAgICAgd2luZG93Ll9fUFJFTE9BREVEX1NUQVRFX18gPSAke0pTT04uc3RyaW5naWZ5KHByZWxvYWRlZFN0YXRlKS5yZXBsYWNlKC88L2csICdcXFxcXFx1MDAzYycpfVxuICAgICAgICAgICAgPC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cIi9idW5kbGUvYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gIGA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvcmVuZGVyRnVsbFBhZ2UuanMiLCJleHBvcnQgY29uc3Qgc2VsZWN0U2l0ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFNpdGVIb3N0ID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlLmhvc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NlbGVjdG9ycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcbmNvbnN0IHsgc2VyaWFsaXplU3BlZWNoVXNlciwgZGVzZXJpYWxpemVTcGVlY2hVc2VyIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMnKTtcbmNvbnN0IGNvb2tpZVNlc3Npb24gPSByZXF1aXJlKCdjb29raWUtc2Vzc2lvbicpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbi8vIGxvZ2dpbmcgZGVwZW5kZW5jaWVzXG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIFNwZWVjaFNlcnZlciAoKSB7XG4gIHRoaXMuY29uZmlndXJlTXlzcWwgPSAobXlzcWxDb25maWcpID0+IHtcbiAgICByZXF1aXJlKCcuLi9jb25maWcvbXlzcWxDb25maWcuanMnKS5jb25maWd1cmUobXlzcWxDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNpdGUgPSAoc2l0ZUNvbmZpZykgPT4ge1xuICAgIHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJykuY29uZmlndXJlKHNpdGVDb25maWcpO1xuICAgIGNvbnNvbGUubG9nKHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJykpO1xuICAgIHRoaXMuc2Vzc2lvbktleSA9IHNpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5O1xuICAgIHRoaXMuUE9SVCA9IHNpdGVDb25maWcuZGV0YWlscy5wb3J0O1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNsYWNrID0gKHNsYWNrQ29uZmlnKSA9PiB7XG4gICAgcmVxdWlyZSgnLi4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJykuY29uZmlndXJlKHNsYWNrQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jcmVhdGVBcHAgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGFuIEV4cHJlc3MgYXBwbGljYXRpb25cbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbiAgICAvLyB0cnVzdCB0aGUgcHJveHkgdG8gZ2V0IGlwIGFkZHJlc3MgZm9yIHVzXG4gICAgYXBwLmVuYWJsZSgndHJ1c3QgcHJveHknKTtcblxuICAgIC8vIGFkZCBtaWRkbGV3YXJlXG4gICAgYXBwLnVzZShoZWxtZXQoKSk7IC8vIHNldCBIVFRQIGhlYWRlcnMgdG8gcHJvdGVjdCBhZ2FpbnN0IHdlbGwta25vd24gd2ViIHZ1bG5lcmFiaWx0aWVzXG4gICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhgJHtfX2Rpcm5hbWV9L3B1YmxpY2ApKTsgLy8gJ2V4cHJlc3Muc3RhdGljJyB0byBzZXJ2ZSBzdGF0aWMgZmlsZXMgZnJvbSBwdWJsaWMgZGlyZWN0b3J5XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7IC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24vanNvblxuICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpOyAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7ICAvLyBjdXN0b20gbG9nZ2luZyBtaWRkbGV3YXJlIHRvIGxvZyBhbGwgaW5jb21pbmcgaHR0cCByZXF1ZXN0c1xuICAgICAgbG9nZ2VyLnZlcmJvc2UoYFJlcXVlc3Qgb24gJHtyZXEub3JpZ2luYWxVcmx9IGZyb20gJHtyZXEuaXB9YCk7XG4gICAgICBuZXh0KCk7XG4gICAgfSk7XG5cbiAgICAvLyBjb25maWd1cmUgcGFzc3BvcnRcbiAgICBwYXNzcG9ydC5zZXJpYWxpemVVc2VyKHNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xuICAgIHBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihkZXNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xuICAgIGNvbnN0IGxvY2FsU2lnbnVwU3RyYXRlZ3kgPSByZXF1aXJlKCcuL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcycpO1xuICAgIGNvbnN0IGxvY2FsTG9naW5TdHJhdGVneSA9IHJlcXVpcmUoJy4vcGFzc3BvcnQvbG9jYWwtbG9naW4uanMnKTtcbiAgICBwYXNzcG9ydC51c2UoJ2xvY2FsLXNpZ251cCcsIGxvY2FsU2lnbnVwU3RyYXRlZ3kpO1xuICAgIHBhc3Nwb3J0LnVzZSgnbG9jYWwtbG9naW4nLCBsb2NhbExvZ2luU3RyYXRlZ3kpO1xuICAgIC8vIGluaXRpYWxpemUgcGFzc3BvcnRcbiAgICBhcHAudXNlKGNvb2tpZVNlc3Npb24oe1xuICAgICAgbmFtZSAgOiAnc2Vzc2lvbicsXG4gICAgICBrZXlzICA6IFt0aGlzLnNlc3Npb25LZXldLFxuICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBpLmUuIDI0IGhvdXJzXG4gICAgfSkpO1xuICAgIGFwcC51c2UocGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbiAgICBhcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgICAvLyBjb25maWd1cmUgaGFuZGxlYmFycyAmIHJlZ2lzdGVyIGl0IHdpdGggZXhwcmVzcyBhcHBcbiAgICBjb25zdCBoYnMgPSBleHByZXNzSGFuZGxlYmFycy5jcmVhdGUoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2VtYmVkJyxcbiAgICAgIGhhbmRsZWJhcnMgICA6IEhhbmRsZWJhcnMsXG4gICAgfSk7XG4gICAgYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGhicy5lbmdpbmUpO1xuICAgIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuICAgIC8vIHNldCB0aGUgcm91dGVzIG9uIHRoZSBhcHBcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hdXRoLXJvdXRlcy5qcycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXBpLXJvdXRlcy5qcycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvcGFnZS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2Fzc2V0LXJvdXRlcy5qcycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvZmFsbGJhY2stcm91dGVzLmpzJykoYXBwKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9O1xuICB0aGlzLmluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgcmVxdWlyZSgnLi9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcycpKGxvZ2dlcik7XG4gICAgcmVxdWlyZSgnLi9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzJykobG9nZ2VyKTtcbiAgICB0aGlzLmNyZWF0ZUFwcCgpO1xuICAgIHRoaXMuc2VydmVyID0gaHR0cC5TZXJ2ZXIodGhpcy5hcHApO1xuICB9O1xuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRiID0gcmVxdWlyZSgnLi9tb2RlbHMvaW5kZXgnKTtcbiAgICAvLyBzeW5jIHNlcXVlbGl6ZVxuICAgIGRiLnNlcXVlbGl6ZS5zeW5jKClcbiAgICAgIC8vIHN0YXJ0IHRoZSBzZXJ2ZXJcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKHRoaXMuUE9SVCwgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uIFBPUlQgJHt0aGlzLlBPUlR9YCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBTdGFydHVwIEVycm9yOmAsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcGVlY2hTZXJ2ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc2VydmVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzLWhhbmRsZWJhcnNcIlxuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGFuZGxlYmFyc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhhbmRsZWJhcnNcIlxuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlcmlhbGl6ZVNwZWVjaFVzZXIgKHVzZXIsIGRvbmUpIHsgIC8vIHJldHVybnMgdXNlciBkYXRhIHRvIGJlIHNlcmlhbGl6ZWQgaW50byBzZXNzaW9uXG4gICAgbG9nZ2VyLmRlYnVnKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGxvZ2dlci5kZWJ1ZygnZGVzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1zZXNzaW9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXNlc3Npb25cIlxuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImh0dHBcIlxuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBuZXcgY2hhbm5lbCBzaWdudXAgcmVxdWVzdC4gdXNlcjogJHt1c2VybmFtZX0gcGFzczogJHtwYXNzd29yZH0gLmApO1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIC8vIHNlcnZlci1zaWRlIHZhbGlkYXRvbiBvZiBpbnB1dHMgKHVzZXJuYW1lLCBwYXNzd29yZClcblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhbm5lbCBhbmQgcmV0cmlldmUgdGhlIG1ldGFkYXRhXG4gICAgcmV0dXJuIGxicnlBcGkuY3JlYXRlQ2hhbm5lbChgQCR7dXNlcm5hbWV9YClcbiAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgIHVzZXJOYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyRGF0YSA+JywgdXNlckRhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgY2hhbm5lbERhdGEgPSB7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIGNoYW5uZWxDbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NoYW5uZWxEYXRhID4nLCBjaGFubmVsRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSBjZXJ0aWZpY2F0ZSByZWNvcmRcbiAgICAgICAgY29uc3QgY2VydGlmaWNhdGVEYXRhID0ge1xuICAgICAgICAgIGNsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICAgIG5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIC8vIGFkZHJlc3MsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjZXJ0aWZpY2F0ZURhdGEgPicsIGNlcnRpZmljYXRlRGF0YSk7XG4gICAgICAgIC8vIHNhdmUgdXNlciBhbmQgY2VydGlmaWNhdGUgdG8gZGJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi5Vc2VyLmNyZWF0ZSh1c2VyRGF0YSksIGRiLkNoYW5uZWwuY3JlYXRlKGNoYW5uZWxEYXRhKSwgZGIuQ2VydGlmaWNhdGUuY3JlYXRlKGNlcnRpZmljYXRlRGF0YSldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoW25ld1VzZXIsIG5ld0NoYW5uZWwsIG5ld0NlcnRpZmljYXRlXSkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgLy8gc3RvcmUgdGhlIHJlbGV2YW50IG5ld1VzZXIgaW5mbyB0byBiZSBwYXNzZWQgYmFjayBmb3IgcmVxLlVzZXJcbiAgICAgICAgdXNlckluZm9bJ2lkJ10gPSBuZXdVc2VyLmlkO1xuICAgICAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IG5ld1VzZXIudXNlck5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gbmV3Q2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAvLyBhc3NvY2lhdGUgdGhlIGluc3RhbmNlc1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld0NlcnRpZmljYXRlLnNldENoYW5uZWwobmV3Q2hhbm5lbCksIG5ld0NoYW5uZWwuc2V0VXNlcihuZXdVc2VyKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHVzZXJJbmZvLmNoYW5uZWxDbGFpbUlkLCB1c2VySW5mby5jaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdzaWdudXAgZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgQ2hhbm5lbCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NoYW5uZWwnLFxuICAgIHtcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2hhbm5lbC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2hhbm5lbC5iZWxvbmdzVG8oZGIuVXNlcik7XG4gICAgQ2hhbm5lbC5oYXNPbmUoZGIuQ2VydGlmaWNhdGUpO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVsO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGFzc2V0RGVmYXVsdHM6IHsgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsIH0sIGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIChjb250ZW50VHlwZSkge1xuICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIHJldHVybiAnanBlZyc7XG4gICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgIHJldHVybiAncG5nJztcbiAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgcmV0dXJuICdnaWYnO1xuICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICByZXR1cm4gJ21wNCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5kZWJ1Zygnc2V0dGluZyB1bmtub3duIGZpbGUgdHlwZSBhcyBmaWxlIGV4dGVuc2lvbiBqcGVnJyk7XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUaHVtYm5haWwgKHN0b3JlZFRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCkge1xuICBpZiAoc3RvcmVkVGh1bWJuYWlsID09PSAnJykge1xuICAgIHJldHVybiBkZWZhdWx0VGh1bWJuYWlsO1xuICB9XG4gIHJldHVybiBzdG9yZWRUaHVtYm5haWw7XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhaW1EYXRhIChjbGFpbSkge1xuICAvLyBsb2dnZXIuZGVidWcoJ3ByZXBhcmluZyBjbGFpbSBkYXRhIGJhc2VkIG9uIHJlc29sdmVkIGRhdGE6JywgY2xhaW0pO1xuICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICBjbGFpbVsnaG9zdCddID0gaG9zdDtcbiAgcmV0dXJuIGNsYWltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENsYWltID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2xhaW0nLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlVXJsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbWV0YWRhdGFWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjb250ZW50VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzdHJlYW1WZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENsYWltLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDbGFpbS5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCBmb3IgJHtjbGFpbU5hbWV9IyR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0ocykgZm91bmQgd2l0aCB0aGF0IGNsYWltIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGNsYWltSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyBmb3IgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgICByYXcgIDogdHJ1ZSwgIC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb25seSBkYXRhLCBub3QgYW4gYXJyYXkgb2YgaW5zdGFuY2VzXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWxDbGFpbXNBcnJheSA9PiB7XG4gICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdjaGFubmVsY2xhaW1zYXJyYXkgbGVuZ3RoOicsIGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGNoYW5uZWxDbGFpbXNBcnJheS5mb3JFYWNoKGNsYWltID0+IHtcbiAgICAgICAgICAgICAgICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoY2hhbm5lbENsYWltc0FycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBmaW5kaW5nIGNsYWltIGlkIGZvciBjbGFpbSAke2NsYWltTmFtZX0gZnJvbSBjaGFubmVsICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSwgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaWQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGAke3Jlc3VsdC5sZW5ndGh9IHJlY29yZHMgZm91bmQgZm9yIFwiJHtjbGFpbU5hbWV9XCIgaW4gY2hhbm5lbCBcIiR7Y2hhbm5lbENsYWltSWR9XCJgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgc2hvcnRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke3Nob3J0SWR9JWAsXG4gICAgICAgICAgICB9fSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sICAvLyBub3RlOiBtYXliZSBoZWlnaHQgYW5kIGVmZmVjdGl2ZSBhbW91bnQgbmVlZCB0byBzd2l0Y2g/XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdsZW5ndGggb2YgcmVzdWx0JywgcmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmRhdGFWYWx1ZXMuY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLnZhbGlkYXRlTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NsYWltSWQoJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIGlmIChjbGFpbUlkICYmIChjbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNsYWltSWQgJiYgY2xhaW1JZC5sZW5ndGggPCA0MCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7ICAvLyBpZiBhIHNob3J0IGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUoY2xhaW1OYW1lKTsgIC8vIGlmIG5vIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIENsYWltLnJlc29sdmVDbGFpbSA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5yZXNvbHZlQ2xhaW06ICR7bmFtZX0gJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsYWltQXJyYXkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY2xhaW1BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYG1vcmUgdGhhbiBvbmUgcmVjb3JkIG1hdGNoZXMgJHtuYW1lfSMke2NsYWltSWR9IGluIGRiLkNsYWltYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDbGFpbTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBURVhUIH0pID0+IHtcbiAgY29uc3QgUmVxdWVzdCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1JlcXVlc3QnLFxuICAgIHtcbiAgICAgIGFjdGlvbjoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB1cmw6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaXBBZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIHR5cGUgICAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFJlcXVlc3QuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFJlcXVlc3QuYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUmVxdWVzdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IFVzZXIgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdVc2VyJyxcbiAgICB7XG4gICAgICB1c2VyTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFVzZXIuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFVzZXIuaGFzT25lKGRiLkNoYW5uZWwpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNvbXBhcmVQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAobmV3UGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaChuZXdQYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBjdXJyZW50IHBhc3N3b3JkIHdpdGggdGhlIG5ldyBoYXNoXG4gICAgICAgICAgdGhpc1xuICAgICAgICAgICAgLnVwZGF0ZSh7cGFzc3dvcmQ6IGhhc2h9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIHByZS1zYXZlIGhvb2sgbWV0aG9kIHRvIGhhc2ggdGhlIHVzZXIncyBwYXNzd29yZCBiZWZvcmUgdGhlIHVzZXIncyBpbmZvIGlzIHNhdmVkIHRvIHRoZSBkYi5cbiAgVXNlci5ob29rKCdiZWZvcmVDcmVhdGUnLCAodXNlciwgb3B0aW9ucykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnVXNlci5iZWZvcmVDcmVhdGUgaG9vay4uLicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgcGFzc3dvcmQgc3RyaW5nIHdpdGggdGhlIGhhc2ggcGFzc3dvcmQgdmFsdWVcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaDtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBVc2VyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gcm91dGUgZm9yIHNpZ24gdXBcbiAgYXBwLnBvc3QoJy9zaWdudXAnLCBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLXNpZ251cCcpLCAocmVxLCByZXMpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgc3VjY2Vzc2Z1bCBzaWdudXAgZm9yICR7cmVxLnVzZXIuY2hhbm5lbE5hbWV9YCk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgc3VjY2VzcyAgICAgICA6IHRydWUsXG4gICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICBzaG9ydENoYW5uZWxJZDogcmVxLnVzZXIuc2hvcnRDaGFubmVsSWQsXG4gICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSBmb3IgbG9nIGluXG4gIGFwcC5wb3N0KCcvbG9naW4nLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLWxvZ2luJywgKGVyciwgdXNlciwgaW5mbykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgfVxuICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1Zygnc3VjY2Vzc2Z1bCBsb2dpbicpO1xuICAgICAgcmVxLmxvZ0luKHVzZXIsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KShyZXEsIHJlcywgbmV4dCk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBsb2cgb3V0XG4gIGFwcC5nZXQoJy9sb2dvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICByZXEubG9nb3V0KCk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICd5b3Ugc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnfSk7XG4gIH0pO1xuICAvLyBzZWUgaWYgdXNlciBpcyBhdXRoZW50aWNhdGVkLCBhbmQgcmV0dXJuIGNyZWRlbnRpYWxzIGlmIHNvXG4gIGFwcC5nZXQoJy91c2VyJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaWYgKHJlcS51c2VyKSB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLnVzZXJ9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAndXNlciBpcyBub3QgbG9nZ2VkIGluJ30pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoLXJvdXRlcy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IG11bHRpcGFydCA9IHJlcXVpcmUoJ2Nvbm5lY3QtbXVsdGlwYXJ0eScpO1xuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHVwbG9hZERpcmVjdG9yeSB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSBtdWx0aXBhcnQoe3VwbG9hZERpcjogdXBsb2FkRGlyZWN0b3J5fSk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuY29uc3QgeyBjbGFpbU5hbWVJc0F2YWlsYWJsZSwgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5LCBwdWJsaXNoIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBnZXRDbGFpbUxpc3QsIHJlc29sdmVVcmksIGdldENsYWltIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEsIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcywgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcywgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHksIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcywgY3JlYXRlRmlsZURhdGEgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IGVycm9ySGFuZGxlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGF1dGhlbnRpY2F0ZVVzZXIgfSA9IHJlcXVpcmUoJy4uL2F1dGgvYXV0aGVudGljYXRpb24uanMnKTtcbmNvbnN0IHsgZ2V0Q2hhbm5lbERhdGEsIGdldENoYW5uZWxDbGFpbXMsIGdldENsYWltSWQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGF2YWlsYWJsZU5hbWUpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gZ2V0IGEgc2hvcnQgY2hhbm5lbCBpZCBmcm9tIGxvbmcgY2hhbm5lbCBJZFxuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oc2hvcnRJZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9kYXRhLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgICBnZXRDaGFubmVsRGF0YShjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIDApXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2NsYWltcy86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkLzpwYWdlJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gICAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlO1xuICAgIGdldENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHJ1biBhIGNsYWltX2xpc3QgcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vbGlzdC86bmFtZScsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGdldENsYWltTGlzdChwYXJhbXMubmFtZSlcbiAgICAgIC50aGVuKGNsYWltc0xpc3QgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjbGFpbXNMaXN0KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gZ2V0IGFuIGFzc2V0XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vZ2V0LzpuYW1lLzpjbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICAvLyByZXNvbHZlIHRoZSBjbGFpbVxuICAgIGRiLkNsYWltLnJlc29sdmVDbGFpbShuYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4ocmVzb2x2ZVJlc3VsdCA9PiB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBhIGNsYWltIGFjdHVhbGx5IGV4aXN0cyBhdCB0aGF0IHVyaVxuICAgICAgICBpZiAoIXJlc29sdmVSZXN1bHQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHVyaSBmb3VuZCBpbiBDbGFpbSB0YWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmaWxlRGF0YSA9IGNyZWF0ZUZpbGVEYXRhKHJlc29sdmVSZXN1bHQpO1xuICAgICAgICAvLyBnZXQgdGhlIGNsYWltXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZURhdGEsIGdldENsYWltKGAke25hbWV9IyR7Y2xhaW1JZH1gKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbIGZpbGVEYXRhLCBnZXRSZXN1bHQgXSkgPT4ge1xuICAgICAgICBmaWxlRGF0YSA9IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhKGZpbGVEYXRhLCBnZXRSZXN1bHQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlRGF0YSwge25hbWUsIGNsYWltSWR9LCAnRmlsZScpLCBnZXRSZXN1bHRdKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoWyBmaWxlUmVjb3JkLCB7bWVzc2FnZSwgY29tcGxldGVkfSBdKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZSwgY29tcGxldGVkIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHRoaXMgc2l0ZSBwdWJsaXNoZWQgdG8gYSBjbGFpbVxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2F2YWlsYWJpbGl0eS86bmFtZScsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdCk7XG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBydW4gYSByZXNvbHZlIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Jlc29sdmUvOm5hbWUvOmNsYWltSWQnLCAoeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICByZXNvbHZlVXJpKGAke3BhcmFtcy5uYW1lfSMke3BhcmFtcy5jbGFpbUlkfWApXG4gICAgICAudGhlbihyZXNvbHZlZFVyaSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc29sdmVkVXJpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gcnVuIGEgcHVibGlzaCByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vcHVibGlzaCcsIG11bHRpcGFydE1pZGRsZXdhcmUsICh7IGJvZHksIGZpbGVzLCBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHVzZXIgfSwgcmVzKSA9PiB7XG4gICAgLy8gZGVmaW5lIHZhcmlhYmxlc1xuICAgIGxldCAgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCBkZXNjcmlwdGlvbiwgZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIGxpY2Vuc2UsIG5hbWUsIG5zZncsIHRodW1ibmFpbCwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZSwgdGl0bGU7XG4gICAgLy8gcmVjb3JkIHRoZSBzdGFydCB0aW1lIG9mIHRoZSByZXF1ZXN0XG4gICAgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIC8vIHZhbGlkYXRlIHRoZSBib2R5IGFuZCBmaWxlcyBvZiB0aGUgcmVxdWVzdFxuICAgIHRyeSB7XG4gICAgICAvLyB2YWxpZGF0ZUFwaVB1Ymxpc2hSZXF1ZXN0KGJvZHksIGZpbGVzKTtcbiAgICAgICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkoYm9keSkpO1xuICAgICAgKHtmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyhmaWxlcykpO1xuICAgICAgKHtjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmR9ID0gYm9keSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgLy8gY2hlY2sgY2hhbm5lbCBhdXRob3JpemF0aW9uXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgYXV0aGVudGljYXRlVXNlcihjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpLFxuICAgICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSksXG4gICAgICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSxcbiAgICAgIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXModGh1bWJuYWlsRmlsZVBhdGgsIG5hbWUsIGxpY2Vuc2UsIG5zZncpLFxuICAgIF0pXG4gICAgICAudGhlbigoW3tjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9LCB2YWxpZGF0ZWRDbGFpbU5hbWUsIHB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbFB1Ymxpc2hQYXJhbXNdKSA9PiB7XG4gICAgICAgIC8vIGFkZCBjaGFubmVsIGRldGFpbHMgdG8gdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfbmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9pZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHVibGlzaCB0aGUgdGh1bWJuYWlsXG4gICAgICAgIGlmICh0aHVtYm5haWxQdWJsaXNoUGFyYW1zKSB7XG4gICAgICAgICAgcHVibGlzaCh0aHVtYm5haWxQdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIGFzc2V0XG4gICAgICAgIHJldHVybiBwdWJsaXNoKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgbWVzc2FnZTogJ3B1Ymxpc2ggY29tcGxldGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgZGF0YSAgIDoge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHJlc3VsdC5jbGFpbV9pZCxcbiAgICAgICAgICAgIHVybCAgICA6IGAke2hvc3R9LyR7cmVzdWx0LmNsYWltX2lkfS8ke25hbWV9YCxcbiAgICAgICAgICAgIGxicnlUeCA6IHJlc3VsdCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gcmVjb3JkIHRoZSBwdWJsaXNoIGVuZCB0aW1lIGFuZCBzZW5kIHRvIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAncHVibGlzaCcsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhIHNob3J0IGNsYWltIGlkIGZyb20gbG9uZyBjbGFpbSBJZFxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBkYi5DbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHNob3J0SWR9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vbG9uZy1pZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnYm9keTonLCBib2R5KTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGJvZHkuY2hhbm5lbE5hbWU7XG4gICAgY29uc3QgY2hhbm5lbENsYWltSWQgPSBib2R5LmNoYW5uZWxDbGFpbUlkO1xuICAgIGNvbnN0IGNsYWltTmFtZSA9IGJvZHkuY2xhaW1OYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBib2R5LmNsYWltSWQ7XG4gICAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0ID09PSBOT19DTEFJTSkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0fSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vZGF0YS86Y2xhaW1OYW1lLzpjbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY2xhaW1OYW1lID0gcGFyYW1zLmNsYWltTmFtZTtcbiAgICBsZXQgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAgIGlmIChjbGFpbUlkID09PSAnbm9uZScpIGNsYWltSWQgPSBudWxsO1xuICAgIGRiLkNsYWltLnJlc29sdmVDbGFpbShjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihjbGFpbUluZm8gPT4ge1xuICAgICAgICBpZiAoIWNsYWltSW5mbykge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBjbGFpbSBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogY2xhaW1JbmZvfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHNlZSBpZiBhc3NldCBpcyBhdmFpbGFibGUgbG9jYWxseVxuICBhcHAuZ2V0KCcvYXBpL2ZpbGUvYXZhaWxhYmlsaXR5LzpuYW1lLzpjbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7bmFtZSwgY2xhaW1JZH19KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBmYWxzZX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpLXJvdXRlcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbXVsdGlwYXJ0eVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe3doZXJlOiB7Y2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhlbnRpY2F0ZVVzZXIgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlcikge1xuICAgIC8vIGNhc2U6IG5vIGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIChhbm9ueW1vdXMpLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXNlciB0b2tlbiBpcyBwcm92aWRlZFxuICAgIGlmICghY2hhbm5lbE5hbWUgJiYgIWNoYW5uZWxJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IG51bGwsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCB1c2VyIHRva2VuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsTmFtZSAhPT0gdXNlci5jaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIG5hbWUgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWxJZCAmJiBjaGFubmVsSWQgIT09IHVzZXIuY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBpZCBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogdXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHBhc3N3b3JkIGluc3RlYWQgb2YgdXNlciB0b2tlblxuICAgIGlmICghY2hhbm5lbFBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ25vIGNoYW5uZWwgcGFzc3dvcmQgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCk7XG4gIH0sXG4gIGF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgdXNlclBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGhvaXN0ZWQgdmFyaWFibGVzXG4gICAgICBsZXQgY2hhbm5lbERhdGE7XG4gICAgICAvLyBidWlsZCB0aGUgcGFyYW1zIGZvciBmaW5kaW5nIHRoZSBjaGFubmVsXG4gICAgICBsZXQgY2hhbm5lbEZpbmRQYXJhbXMgPSB7fTtcbiAgICAgIGlmIChjaGFubmVsTmFtZSkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgIGlmIChjaGFubmVsSWQpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbElkO1xuICAgICAgLy8gZmluZCB0aGUgY2hhbm5lbFxuICAgICAgZGIuQ2hhbm5lbFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IGNoYW5uZWxGaW5kUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gY2hhbm5lbCBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5uZWxEYXRhID0gY2hhbm5lbC5nZXQoKTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgZGF0YTonLCBjaGFubmVsRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRiLlVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyB1c2VyTmFtZTogY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDEpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHVzZXJQYXNzd29yZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoJy4uLnBhc3N3b3JkIHdhcyBhIG1hdGNoLi4uJyk7XG4gICAgICAgICAgcmVzb2x2ZShjaGFubmVsRGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJjb25zdCBDTEFJTVNfUEVSX1BBR0UgPSAxMjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNsYWltcywgcGFnZSkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbFBhZ2VzKGNsYWltcyk7XG4gICAgY29uc3QgcGFnaW5hdGlvblBhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRQYWdlRnJvbVF1ZXJ5KHBhZ2UpO1xuICAgIGNvbnN0IHZpZXdEYXRhID0ge1xuICAgICAgY2hhbm5lbE5hbWUgICAgICAgOiBjaGFubmVsTmFtZSxcbiAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1zICAgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5leHRyYWN0UGFnZUZyb21DbGFpbXMoY2xhaW1zLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICBwcmV2aW91c1BhZ2UgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVByZXZpb3VzUGFnZShwYWdpbmF0aW9uUGFnZSksXG4gICAgICBjdXJyZW50UGFnZSAgICAgICA6IHBhZ2luYXRpb25QYWdlLFxuICAgICAgbmV4dFBhZ2UgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVOZXh0UGFnZSh0b3RhbFBhZ2VzLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICB0b3RhbFBhZ2VzICAgICAgICA6IHRvdGFsUGFnZXMsXG4gICAgICB0b3RhbFJlc3VsdHMgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsQ2xhaW1zKGNsYWltcyksXG4gICAgfTtcbiAgICByZXR1cm4gdmlld0RhdGE7XG4gIH0sXG4gIGdldFBhZ2VGcm9tUXVlcnkgKHBhZ2UpIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIChjbGFpbXMsIHBhZ2VOdW1iZXIpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIFtdOyAgLy8gaWYgbm8gY2xhaW1zLCByZXR1cm4gdGhpcyBkZWZhdWx0XG4gICAgfVxuICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2xhaW1zIGlzIGFycmF5PycsIEFycmF5LmlzQXJyYXkoY2xhaW1zKSk7XG4gICAgLy8gbG9nZ2VyLmRlYnVnKGBwYWdlTnVtYmVyICR7cGFnZU51bWJlcn0gaXMgbnVtYmVyP2AsIE51bWJlci5pc0ludGVnZXIocGFnZU51bWJlcikpO1xuICAgIGNvbnN0IGNsYWltU3RhcnRJbmRleCA9IChwYWdlTnVtYmVyIC0gMSkgKiBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgY2xhaW1FbmRJbmRleCA9IGNsYWltU3RhcnRJbmRleCArIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBwYWdlT2ZDbGFpbXMgPSBjbGFpbXMuc2xpY2UoY2xhaW1TdGFydEluZGV4LCBjbGFpbUVuZEluZGV4KTtcbiAgICByZXR1cm4gcGFnZU9mQ2xhaW1zO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbFBhZ2VzIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvdGFsQ2xhaW1zID0gY2xhaW1zLmxlbmd0aDtcbiAgICAgIGlmICh0b3RhbENsYWltcyA8IENMQUlNU19QRVJfUEFHRSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZ1bGxQYWdlcyA9IE1hdGguZmxvb3IodG90YWxDbGFpbXMgLyBDTEFJTVNfUEVSX1BBR0UpO1xuICAgICAgY29uc3QgcmVtYWluZGVyID0gdG90YWxDbGFpbXMgJSBDTEFJTVNfUEVSX1BBR0U7XG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmdWxsUGFnZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVsbFBhZ2VzICsgMTtcbiAgICB9XG4gIH0sXG4gIGRldGVybWluZVByZXZpb3VzUGFnZSAoY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgLSAxO1xuICB9LFxuICBkZXRlcm1pbmVOZXh0UGFnZSAodG90YWxQYWdlcywgY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgKyAxO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbENsYWltcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY2xhaW1zLmxlbmd0aDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IHsgZGV0YWlsczogaG9zdCB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSBmb3IgdGhlIGhvbWUgcGFnZVxuICBhcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGxvZ2luIHBhZ2VcbiAgYXBwLmdldCgnL2xvZ2luJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzaG93ICdhYm91dCcgcGFnZVxuICBhcHAuZ2V0KCcvYWJvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB0cmVuZGluZyBpbWFnZXNcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KCcvcG9wdWxhcicpO1xuICB9KTtcbiAgYXBwLmdldCgnL3BvcHVsYXInLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB0cmVuZGluZyBpbWFnZXNcbiAgYXBwLmdldCgnL25ldycsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2VuZCBlbWJlZGFibGUgdmlkZW8gcGxheWVyIChmb3IgdHdpdHRlcilcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgLy8gZ2V0IGFuZCByZW5kZXIgdGhlIGNvbnRlbnRcbiAgICByZXMuc3RhdHVzKDIwMCkucmVuZGVyKCdlbWJlZCcsIHsgbGF5b3V0OiAnZW1iZWQnLCBob3N0LCBjbGFpbUlkLCBuYW1lIH0pO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2Utcm91dGVzLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9HSU4gfSBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMnO1xuY29uc3QgeyBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRpc2FibGVkICAgICAgICAgIDogcHVibGlzaGluZy5kaXNhYmxlZCxcbiAgZGlzYWJsZWRNZXNzYWdlICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkTWVzc2FnZSxcbiAgcHVibGlzaEluQ2hhbm5lbCAgOiBmYWxzZSxcbiAgc2VsZWN0ZWRDaGFubmVsICAgOiBMT0dJTixcbiAgc2hvd01ldGFkYXRhSW5wdXRzOiBmYWxzZSxcbiAgc3RhdHVzICAgICAgICAgICAgOiB7XG4gICAgc3RhdHVzIDogbnVsbCxcbiAgICBtZXNzYWdlOiBudWxsLFxuICB9LFxuICBlcnJvcjoge1xuICAgIGZpbGUgICAgICAgICA6IG51bGwsXG4gICAgdXJsICAgICAgICAgIDogbnVsbCxcbiAgICBjaGFubmVsICAgICAgOiBudWxsLFxuICAgIHB1Ymxpc2hTdWJtaXQ6IG51bGwsXG4gIH0sXG4gIGZpbGUgICAgOiBudWxsLFxuICBjbGFpbSAgIDogJycsXG4gIG1ldGFkYXRhOiB7XG4gICAgdGl0bGUgICAgICA6ICcnLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICBsaWNlbnNlICAgIDogJycsXG4gICAgbnNmdyAgICAgICA6IGZhbHNlLFxuICB9LFxuICB0aHVtYm5haWw6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfU0VMRUNURUQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgaW5pdGlhbFN0YXRlLCB7ICAvLyBub3RlOiBjbGVhcnMgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICBmaWxlOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5GSUxFX0NMRUFSOlxuICAgICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbiAgICBjYXNlIGFjdGlvbnMuTUVUQURBVEFfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIG1ldGFkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5tZXRhZGF0YSwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5uYW1lXTogYWN0aW9uLmRhdGEudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkNMQUlNX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjbGFpbTogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBwdWJsaXNoSW5DaGFubmVsOiBhY3Rpb24uY2hhbm5lbCxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc3RhdHVzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5FUlJPUl9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZXJyb3I6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmVycm9yLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuU0VMRUNURURfQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2VsZWN0ZWRDaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5UT0dHTEVfTUVUQURBVEFfSU5QVVRTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHNob3dNZXRhZGF0YUlucHV0czogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuVEhVTUJOQUlMX05FVzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICB0aHVtYm5haWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJleHBvcnQgY29uc3QgTE9HSU4gPSAnRXhpc3RpbmcnO1xuZXhwb3J0IGNvbnN0IENSRUFURSA9ICdOZXcnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsb2dnZWRJbkNoYW5uZWw6IHtcbiAgICBuYW1lICAgOiBudWxsLFxuICAgIHNob3J0SWQ6IG51bGwsXG4gICAgbG9uZ0lkIDogbnVsbCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9nZ2VkSW5DaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIEVSUk9SIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICByZXF1ZXN0OiB7XG4gICAgZXJyb3I6IG51bGwsXG4gICAgdHlwZSA6IG51bGwsXG4gICAgaWQgICA6IG51bGwsXG4gIH0sXG4gIHJlcXVlc3RMaXN0IDoge30sXG4gIGNoYW5uZWxMaXN0IDoge30sXG4gIGFzc2V0TGlzdCAgIDoge30sXG4gIGRpc3BsYXlBc3NldDoge1xuICAgIGVycm9yIDogbnVsbCxcbiAgICBzdGF0dXM6IExPQ0FMX0NIRUNLLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8vIGhhbmRsZSByZXF1ZXN0XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIHR5cGU6IGFjdGlvbi5kYXRhLnJlcXVlc3RUeXBlLFxuICAgICAgICAgIGlkICA6IGFjdGlvbi5kYXRhLnJlcXVlc3RJZCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBzdG9yZSByZXF1ZXN0c1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0xJU1RfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3RMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIGtleSAgOiBhY3Rpb24uZGF0YS5rZXksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBhc3NldCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkFTU0VUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBhc3NldExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmFzc2V0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yICAgIDogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBuYW1lICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICA6IGFjdGlvbi5kYXRhLmNsYWltSWQsXG4gICAgICAgICAgICBzaG9ydElkICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbURhdGE6IGFjdGlvbi5kYXRhLmNsYWltRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGNoYW5uZWwgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBuYW1lICAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgbG9uZ0lkICAgIDogYWN0aW9uLmRhdGEubG9uZ0lkLFxuICAgICAgICAgICAgc2hvcnRJZCAgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXSwge1xuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBkaXNwbGF5IGFuIGFzc2V0XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBlcnJvciA6IGFjdGlvbi5kYXRhLFxuICAgICAgICAgIHN0YXR1czogRVJST1IsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJjb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qge1xuICBhbmFseXRpY3M6IHtcbiAgICBnb29nbGVJZDogZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIH0sXG4gIGFzc2V0RGVmYXVsdHM6IHtcbiAgICB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwsXG4gICAgZGVzY3JpcHRpb246IGRlZmF1bHREZXNjcmlwdGlvbixcbiAgfSxcbiAgZGV0YWlsczoge1xuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gICAgdHdpdHRlcixcbiAgfSxcbn0gPSBzaXRlQ29uZmlnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRlc2NyaXB0aW9uLFxuICBnb29nbGVBbmFseXRpY3NJZCxcbiAgaG9zdCxcbiAgdGl0bGUsXG4gIHR3aXR0ZXIsXG4gIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgZGVmYXVsdFRodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvc2l0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZ2FcIlxuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcblxuY2xhc3MgQWJvdXRQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydBYm91dCd9IHBhZ2VVcmk9eydhYm91dCd9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3B1bGwtcXVvdGUnPlNwZWUuY2ggaXMgYW4gb3Blbi1zb3VyY2UgcHJvamVjdC4gIFBsZWFzZSBjb250cmlidXRlIHRvIHRoZSBleGlzdGluZyBzaXRlLCBvciBmb3JrIGl0IGFuZCBtYWtlIHlvdXIgb3duLjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly90d2l0dGVyLmNvbS9zcGVlX2NoJz5UV0lUVEVSPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5HSVRIVUI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+RElTQ09SRCBDSEFOTkVMPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2Jsb2IvbWFzdGVyL1JFQURNRS5tZCc+RE9DVU1FTlRBVElPTjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBtZWRpYS1ob3N0aW5nIHNpdGUgdGhhdCByZWFkcyBmcm9tIGFuZCBwdWJsaXNoZXMgY29udGVudCB0byB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8nPkxCUlk8L2E+IGJsb2NrY2hhaW4uPC9wPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgaG9zdGluZyBzZXJ2aWNlLCBidXQgd2l0aCB0aGUgYWRkZWQgYmVuZWZpdCB0aGF0IGl0IHN0b3JlcyB5b3VyIGNvbnRlbnQgb24gYSBkZWNlbnRyYWxpemVkIG5ldHdvcmsgb2YgY29tcHV0ZXJzIC0tIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9nZXQnPkxCUlk8L2E+IG5ldHdvcmsuICBUaGlzIG1lYW5zIHRoYXQgeW91ciBpbWFnZXMgYXJlIHN0b3JlZCBpbiBtdWx0aXBsZSBsb2NhdGlvbnMgd2l0aG91dCBhIHNpbmdsZSBwb2ludCBvZiBmYWlsdXJlLjwvcD5cbiAgICAgICAgICAgICAgPGgzPkNvbnRyaWJ1dGU8L2gzPlxuICAgICAgICAgICAgICA8cD5JZiB5b3UgaGF2ZSBhbiBpZGVhIGZvciB5b3VyIG93biBzcGVlLmNoLWxpa2Ugc2l0ZSBvbiB0b3Agb2YgTEJSWSwgZm9yayBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPmdpdGh1YiByZXBvPC9hPiBhbmQgZ28gdG8gdG93biE8L3A+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSB3YW50IHRvIGltcHJvdmUgc3BlZS5jaCwgam9pbiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+ZGlzY29yZCBjaGFubmVsPC9hPiBvciBzb2x2ZSBvbmUgb2Ygb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2lzc3Vlcyc+Z2l0aHViIGlzc3VlczwvYT4uPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQWJvdXRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2TGluaywgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IExvZ28gZnJvbSAnY29tcG9uZW50cy9Mb2dvJztcbmltcG9ydCBOYXZCYXJDaGFubmVsRHJvcGRvd24gZnJvbSAnY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jb25zdCBWSUVXID0gJ1ZJRVcnO1xuY29uc3QgTE9HT1VUID0gJ0xPR09VVCc7XG5cbmNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyID0gdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nb3V0VXNlciA9IHRoaXMubG9nb3V0VXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlcigpO1xuICB9XG4gIGNoZWNrRm9yTG9nZ2VkSW5Vc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL3VzZXInLCBwYXJhbXMpXG4gICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihkYXRhLmNoYW5uZWxOYW1lLCBkYXRhLnNob3J0Q2hhbm5lbElkLCBkYXRhLmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL3VzZXIgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBsb2dvdXRVc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL2xvZ291dCcsIHBhcmFtcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dvdXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL2xvZ291dCBlcnJvcicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIExPR09VVDpcbiAgICAgICAgdGhpcy5sb2dvdXRVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWSUVXOlxuICAgICAgICAvLyByZWRpcmVjdCB0byBjaGFubmVsIHBhZ2VcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC8ke3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9OiR7dGhpcy5wcm9wcy5jaGFubmVsTG9uZ0lkfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc2l0ZURlc2NyaXB0aW9uIH0gPSAgdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgbmF2LWJhcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1zaG9ydCBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcic+XG4gICAgICAgICAgPExvZ28gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tY2VudGVyJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbmF2LWJhci10YWdsaW5lJz57c2l0ZURlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tcmlnaHQnPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvJyBleGFjdD5QdWJsaXNoPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyAgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2Fib3V0Jz5BYm91dDwvTmF2TGluaz5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGFubmVsTmFtZSA/IChcbiAgICAgICAgICAgICAgPE5hdkJhckNoYW5uZWxEcm9wZG93blxuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdGlvbj17dGhpcy5oYW5kbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGlvbj17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBWSUVXPXtWSUVXfVxuICAgICAgICAgICAgICAgIExPR09VVD17TE9HT1VUfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPE5hdkxpbmsgaWQ9J25hdi1iYXItbG9naW4tbGluaycgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvbG9naW4nPkNoYW5uZWw8L05hdkxpbms+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihOYXZCYXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZnVuY3Rpb24gTG9nbyAoKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2ZXJzaW9uPScxLjEnIGlkPSdMYXllcl8xJyB4PScwcHgnIHk9JzBweCcgaGVpZ2h0PScyNHB4JyB2aWV3Qm94PScwIDAgODAgMzEnIGVuYWJsZUJhY2tncm91bmQ9J25ldyAwIDAgODAgMzEnIGNsYXNzTmFtZT0nbmF2LWJhci1sb2dvJz5cbiAgICAgIDxMaW5rIHRvPScvJz5cbiAgICAgICAgPHRpdGxlPkxvZ288L3RpdGxlPlxuICAgICAgICA8ZGVzYz5TcGVlLmNoIGxvZ288L2Rlc2M+XG4gICAgICAgIDxnIGlkPSdBYm91dCc+XG4gICAgICAgICAgPGcgaWQ9J1B1Ymxpc2gtRm9ybS1WMi1feDI4X2ZpbGxlZF94MjlfJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNDIuMDAwMDAwLCAtMjMuMDAwMDAwKSc+XG4gICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQyLjAwMDAwMCwgMjIuMDAwMDAwKSc+XG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT0nbWF0cml4KDEgMCAwIDEgMCAyMCknIGZvbnRTaXplPScyNScgZm9udEZhbWlseT0nUm9ib3RvJz5TcGVlJmx0O2g8L3RleHQ+XG4gICAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDMwLjAwMDAwMCknPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzA5RjkxMScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTAuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5JyBmaWxsPSdub25lJyBzdHJva2U9JyMwMjlENzQnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00xNi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjRTM1QkQ4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMzIuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTMnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzQxNTZDNScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTQ4LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS00JyBmaWxsPSdub25lJyBzdHJva2U9JyM2MzU2ODgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J002NC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9MaW5rPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gTmF2QmFyQ2hhbm5lbERyb3Bkb3duICh7IGNoYW5uZWxOYW1lLCBoYW5kbGVTZWxlY3Rpb24sIGRlZmF1bHRTZWxlY3Rpb24sIFZJRVcsIExPR09VVCB9KSB7XG4gIHJldHVybiAoXG4gICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdyBsaW5rLS1uYXYnIG9uQ2hhbmdlPXtoYW5kbGVTZWxlY3Rpb259IHZhbHVlPXtkZWZhdWx0U2VsZWN0aW9ufT5cbiAgICAgIDxvcHRpb24gaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPntjaGFubmVsTmFtZX08L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e1ZJRVd9PlZpZXc8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e0xPR09VVH0+TG9nb3V0PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZCYXJDaGFubmVsRHJvcGRvd247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBjcmVhdGVQYWdlVGl0bGUgfSBmcm9tICd1dGlscy9wYWdlVGl0bGUnO1xuaW1wb3J0IHsgY3JlYXRlTWV0YVRhZ3MgfSBmcm9tICd1dGlscy9tZXRhVGFncyc7XG5pbXBvcnQgeyBjcmVhdGVDYW5vbmljYWxMaW5rIH0gZnJvbSAndXRpbHMvY2Fub25pY2FsTGluayc7XG5cbmNsYXNzIFNFTyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgLy8gcHJvcHMgZnJvbSBzdGF0ZVxuICAgIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIHByb3BzIGZyb20gcGFyZW50XG4gICAgY29uc3QgeyBhc3NldCwgY2hhbm5lbCwgcGFnZVVyaSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgeyBwYWdlVGl0bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gY3JlYXRlIHBhZ2UgdGl0bGUsIHRhZ3MsIGFuZCBjYW5vbmljYWwgbGlua1xuICAgIHBhZ2VUaXRsZSA9IGNyZWF0ZVBhZ2VUaXRsZShzaXRlVGl0bGUsIHBhZ2VUaXRsZSk7XG4gICAgY29uc3QgbWV0YVRhZ3MgPSBjcmVhdGVNZXRhVGFncyhzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgY2hhbm5lbCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICBjb25zdCBjYW5vbmljYWxMaW5rID0gY3JlYXRlQ2Fub25pY2FsTGluayhhc3NldCwgY2hhbm5lbCwgcGFnZVVyaSwgc2l0ZUhvc3QpO1xuICAgIC8vIHJlbmRlciByZXN1bHRzXG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXRcbiAgICAgICAgdGl0bGU9e3BhZ2VUaXRsZX1cbiAgICAgICAgbWV0YT17bWV0YVRhZ3N9XG4gICAgICAgIGxpbms9e1t7cmVsOiAnY2Fub25pY2FsJywgaHJlZjogY2Fub25pY2FsTGlua31dfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuXG5TRU8ucHJvcFR5cGVzID0ge1xuICBwYWdlVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBhZ2VVcmkgIDogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2hhbm5lbCAgOiBQcm9wVHlwZXMub2JqZWN0LFxuICBhc3NldCAgICA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTRU87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9TRU8vdmlldy5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbExvZ2luRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0nO1xuaW1wb3J0IENoYW5uZWxDcmVhdGVGb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0nO1xuXG5jbGFzcyBMb2dpblBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIC8vIHJlLXJvdXRlIHRoZSB1c2VyIHRvIHRoZSBob21lcGFnZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICBpZiAobmV3UHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSAhPT0gdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2ApO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0xvZ2luJ30gcGFnZVVyaT17J2xvZ2luJ30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPkNoYW5uZWxzIGFsbG93IHlvdSB0byBwdWJsaXNoIGFuZCBncm91cCBjb250ZW50IHVuZGVyIGFuIGlkZW50aXR5LiBZb3UgY2FuIGNyZWF0ZSBhIGNoYW5uZWwgZm9yIHlvdXJzZWxmLCBvciBzaGFyZSBvbmUgd2l0aCBsaWtlLW1pbmRlZCBmcmllbmRzLiAgWW91IGNhbiBjcmVhdGUgMSBjaGFubmVsLCBvciAxMDAsIHNvIHdoZXRoZXIgeW91J3JlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0YWxvbmlhMjAxNzo0M2RjZjQ3MTYzY2FhMjFkODQwNGQ5ZmU5YjMwZjc4ZWYzZTE0NmE4Jz5kb2N1bWVudGluZyBpbXBvcnRhbnQgZXZlbnRzPC9hPiwgb3IgbWFraW5nIGEgcHVibGljIHJlcG9zaXRvcnkgZm9yIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0R2lmcyc+Y2F0IGdpZnM8L2E+IChwYXNzd29yZDogJzEyMzQnKSwgdHJ5IGNyZWF0aW5nIGEgY2hhbm5lbCBmb3IgaXQhPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5Mb2cgaW4gdG8gYW4gZXhpc3RpbmcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbExvZ2luRm9ybSAvPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5DcmVhdGUgYSBicmFuZCBuZXcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbENyZWF0ZUZvcm0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTG9naW5QYWdlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsTG9naW5Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIG5hbWUgICAgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dpblRvQ2hhbm5lbCA9IHRoaXMubG9naW5Ub0NoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIGxvZ2luVG9DaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXF1ZXN0KCdsb2dpbicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7c3VjY2VzcywgY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCwgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG1lc3NhZ2V9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvcn0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBpZD0nY2hhbm5lbC1sb2dpbi1mb3JtJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tJz5cbiAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nbmFtZScgcGxhY2Vob2xkZXI9J1lvdXIgQ2hhbm5lbCBOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsTmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyA+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgaWQ9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnIG5hbWU9J3Bhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxQYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5FbnRlciB0aGUgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMubG9naW5Ub0NoYW5uZWx9PkF1dGhlbnRpY2F0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxMb2dpbkZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxDcmVhdGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIGNoYW5uZWwgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgIHN0YXR1cyAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQgPSB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVDaGFubmVsID0gdGhpcy5jcmVhdGVDaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgY2xlYW5zZUNoYW5uZWxJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgaGFuZGxlQ2hhbm5lbElucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUNoYW5uZWxJbnB1dCh2YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2hhbm5lbDogdmFsdWV9KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdQbGVhc2UgZW50ZXIgYSBjaGFubmVsIG5hbWUnfSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgdXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbnVsbH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgfSk7XG4gIH1cbiAgY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXR1cm4gcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YCk7XG4gIH1cbiAgY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQgKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghcGFzc3dvcmQgfHwgcGFzc3dvcmQubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgYSBwYXNzd29yZCcpKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuICBtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0ICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWUsIHBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdCgnL3NpZ251cCcsIHBhcmFtcylcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFVuZm9ydHVuYXRlbHksIHdlIGVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIGNyZWF0aW5nIHlvdXIgY2hhbm5lbC4gUGxlYXNlIGxldCB1cyBrbm93IGluIERpc2NvcmQhICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGNyZWF0ZUNoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNoZWNrSXNQYXNzd29yZFByb3ZpZGVkKHRoaXMuc3RhdGUucGFzc3dvcmQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrSXNDaGFubmVsQXZhaWxhYmxlKHRoaXMuc3RhdGUuY2hhbm5lbCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6ICdXZSBhcmUgcHVibGlzaGluZyB5b3VyIG5ldyBjaGFubmVsLiAgU2l0IHRpZ2h0Li4uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0KHRoaXMuc3RhdGUuY2hhbm5lbCwgdGhpcy5zdGF0ZS5wYXNzd29yZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBudWxsfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4ocmVzdWx0LmNoYW5uZWxOYW1lLCByZXN1bHQuc2hvcnRDaGFubmVsSWQsIHJlc3VsdC5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHsgIXRoaXMuc3RhdGUuc3RhdHVzID8gKFxuICAgICAgICAgIDxmb3JtIGlkPSdwdWJsaXNoLWNoYW5uZWwtZm9ybSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1uYW1lJz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J2NoYW5uZWwnIGlkPSduZXctY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPSdleGFtcGxlQ2hhbm5lbE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICAgIHsgKHRoaXMuc3RhdGUuY2hhbm5lbCAmJiAhdGhpcy5zdGF0ZS5lcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIG5hbWU9J3Bhc3N3b3JkJyBpZD0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmNyZWF0ZUNoYW5uZWx9PkNyZWF0ZSBDaGFubmVsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+e3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENyZWF0ZUZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0tYWN0aXZlJz58IDwvc3Bhbj47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgSW5hY3RpdmVTdGF0dXNCYXIgPSAoKSA9PiB7XG4gIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItLWluYWN0aXZlJz58IDwvc3Bhbj47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvbkhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGVycm9yICAgICAgOiBzaG93LnJlcXVlc3QuZXJyb3IsXG4gICAgcmVxdWVzdFR5cGU6IHNob3cucmVxdWVzdC50eXBlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvbkhhbmRsZVNob3dQYWdlVXJpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IFNob3dBc3NldExpdGUgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXRMaXRlJztcbmltcG9ydCBTaG93QXNzZXREZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscyc7XG5pbXBvcnQgU2hvd0NoYW5uZWwgZnJvbSAnY29udGFpbmVycy9TaG93Q2hhbm5lbCc7XG5cbmltcG9ydCB7IENIQU5ORUwsIEFTU0VUX0xJVEUsIEFTU0VUX0RFVEFJTFMgfSBmcm9tICdjb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzJztcblxuY2xhc3MgU2hvd1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKHRoaXMucHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLm1hdGNoLnBhcmFtcyAhPT0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25IYW5kbGVTaG93UGFnZVVyaShuZXh0UHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCByZXF1ZXN0VHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFcnJvclBhZ2UgZXJyb3I9e2Vycm9yfSAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgc3dpdGNoIChyZXF1ZXN0VHlwZSkge1xuICAgICAgY2FzZSBDSEFOTkVMOlxuICAgICAgICByZXR1cm4gPFNob3dDaGFubmVsIC8+O1xuICAgICAgY2FzZSBBU1NFVF9MSVRFOlxuICAgICAgICByZXR1cm4gPFNob3dBc3NldExpdGUgLz47XG4gICAgICBjYXNlIEFTU0VUX0RFVEFJTFM6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0RGV0YWlscyAvPjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiA8cD5sb2FkaW5nLi4uPC9wPjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuXG5jbGFzcyBTaG93TGl0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXNzZXQpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlciBzaG93LWxpdGUtY29udGFpbmVyJz5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxBc3NldERpc3BsYXkgLz5cbiAgICAgICAgICA8TGluayBpZD0nYXNzZXQtYm9pbGVycGF0ZScgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5IGZpbmUtcHJpbnQnIHRvPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfWB9Pmhvc3RlZFxuICAgICAgICAgICAgdmlhIFNwZWUuY2g8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICA8cD5sb2FkaW5nIGFzc2V0IGRhdGEuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93TGl0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIFVOQVZBSUxBQkxFLCBFUlJPUiwgQVZBSUxBQkxFIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY2xhc3MgQXNzZXREaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25GaWxlUmVxdWVzdChuYW1lLCBjbGFpbUlkKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBlcnJvciwgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGNvbnRlbnRUeXBlLCBmaWxlRXh0LCB0aHVtYm5haWwgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdhc3NldC1kaXNwbGF5LWNvbXBvbmVudCc+XG4gICAgICAgIHsoc3RhdHVzID09PSBMT0NBTF9DSEVDSykgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5DaGVja2luZyB0byBzZWUgaWYgU3BlZS5jaCBoYXMgeW91ciBhc3NldCBsb2NhbGx5Li4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gVU5BVkFJTEFCTEUpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+U2l0IHRpZ2h0LCB3ZSdyZSBzZWFyY2hpbmcgdGhlIExCUlkgYmxvY2tjaGFpbiBmb3IgeW91ciBhc3NldCE8L3A+XG4gICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDxwPkN1cmlvdXMgd2hhdCBtYWdpYyBpcyBoYXBwZW5pbmcgaGVyZT8gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZmFxL3doYXQtaXMtbGJyeSc+TGVhcm4gbW9yZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gRVJST1IpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+VW5mb3J0dW5hdGVseSwgd2UgY291bGRuJ3QgZG93bmxvYWQgeW91ciBhc3NldCBmcm9tIExCUlkuICBZb3UgY2FuIGhlbHAgdXMgb3V0IGJ5IHNoYXJpbmcgdGhlIGJlbG93IGVycm9yIG1lc3NhZ2UgaW4gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5MQlJZIGRpc2NvcmQ8L2E+LjwvcD5cbiAgICAgICAgICA8aT48cCBpZD0nZXJyb3ItbWVzc2FnZSc+e2Vycm9yfTwvcD48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBBVkFJTEFCTEUpICYmXG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX0gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHZpZGVvIGNsYXNzTmFtZT0nYXNzZXQgdmlkZW8nIGNvbnRyb2xzIHBvc3Rlcj17dGh1bWJuYWlsfT5cbiAgICAgICAgICAgICAgICAgIDxzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8cD5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgPGNvZGU+dmlkZW88L2NvZGU+IGVsZW1lbnQuPC9wPlxuICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPlVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXREaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IEFzc2V0VGl0bGUgZnJvbSAnY29udGFpbmVycy9Bc3NldFRpdGxlJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuaW1wb3J0IEFzc2V0SW5mbyBmcm9tICdjb250YWluZXJzL0Fzc2V0SW5mbyc7XG5cbmNsYXNzIFNob3dBc3NldERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IGNsYWltRGF0YTogeyBuYW1lIH0gfSA9IGFzc2V0O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17YCR7bmFtZX0gLSBkZXRhaWxzYH0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8QXNzZXRUaXRsZSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgc2hvdy1kZXRhaWxzLWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICAgICAgPEFzc2V0SW5mbyAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yUGFnZSBlcnJvcj17J2xvYWRpbmcgYXNzZXQgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0Fzc2V0RGV0YWlscztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGE6IHsgdGl0bGUgfSB9ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQXNzZXRUaXRsZSA9ICh7IHRpdGxlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0LS1sYXJnZSc+e3RpdGxlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0VGl0bGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBBc3NldEluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jb3B5VG9DbGlwYm9hcmQgPSB0aGlzLmNvcHlUb0NsaXBib2FyZC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvcHlUb0NsaXBib2FyZCAoZXZlbnQpIHtcbiAgICB2YXIgZWxlbWVudFRvQ29weSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmVsZW1lbnR0b2NvcHk7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Db3B5KTtcbiAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdPb3BzLCB1bmFibGUgdG8gY29weSd9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IHNob3J0SWQsIGNsYWltRGF0YSA6IHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIGRlc2NyaXB0aW9uLCBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsLCBob3N0IH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2NoYW5uZWxOYW1lICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkNoYW5uZWw6PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+PExpbmsgdG89e2AvJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfWB9PntjaGFubmVsTmFtZX08L0xpbms+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIHtkZXNjcmlwdGlvbiAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz57ZGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hhcmUtYnV0dG9ucyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPlNoYXJlOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20gZmxleC1jb250YWluZXItLXdyYXAnPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHdpdHRlcjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT5mYWNlYm9vazwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cDovL3R1bWJsci5jb20vd2lkZ2V0cy9zaGFyZS90b29sP2Nhbm9uaWNhbFVybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR1bWJscjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zdWJtaXQ/dXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9JnRpdGxlPSR7bmFtZX1gfT5yZWRkaXQ8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LXNob3J0LWxpbmsnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkxpbms6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktc2hvcnQtbGluaycgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3Nob3J0LWxpbmsnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgJHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J3Nob3J0LWxpbmsnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctZW1iZWQtY29kZSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+RW1iZWQ6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktZW1iZWQtdGV4dCcgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7KGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JykgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDx2aWRlbyB3aWR0aD1cIjEwMCVcIiBjb250cm9scyBwb3N0ZXI9XCIke3RodW1ibmFpbH1cIiBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPjwvdmlkZW8+YH0gLz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDxpbWcgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz5gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdlbWJlZC10ZXh0J1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSc+XG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0bz17YC8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9PjxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9J3RleHQnPkRpcmVjdCBMaW5rPC9zcGFuPjwvTGluaz5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9e2Ake2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0gZG93bmxvYWQ9e25hbWV9PkRvd25sb2FkPC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9kbWNhJz5SZXBvcnQ8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldEluZm87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgcmVxdWVzdFxuICBjb25zdCBwcmV2aW91c1JlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgLy8gc2VsZWN0IGNoYW5uZWxcbiAgbGV0IGNoYW5uZWw7XG4gIGlmIChwcmV2aW91c1JlcXVlc3QpIHtcbiAgICBjb25zdCBjaGFubmVsS2V5ID0gcHJldmlvdXNSZXF1ZXN0LmtleTtcbiAgICBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheSc7XG5cbmNsYXNzIFNob3dDaGFubmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbG9uZ0lkLCBzaG9ydElkIH0gPSBjaGFubmVsO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gY2hhbm5lbD17Y2hhbm5lbH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPGgyPmNoYW5uZWwgbmFtZToge25hbWV9PC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PmZ1bGwgY2hhbm5lbCBpZDoge2xvbmdJZH08L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17J2ZpbmUtcHJpbnQnfT5zaG9ydCBjaGFubmVsIGlkOiB7c2hvcnRJZH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ2xhaW1zRGlzcGxheSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBjaGFubmVsIGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dDaGFubmVsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25VcGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgY2hhbm5lbCBrZXlcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3Rbc2hvdy5yZXF1ZXN0LmlkXTtcbiAgY29uc3QgY2hhbm5lbEtleSA9IHJlcXVlc3Qua2V5O1xuICAvLyBzZWxlY3QgY2hhbm5lbCBjbGFpbXNcbiAgY29uc3QgY2hhbm5lbCA9IHNob3cuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0gfHwgbnVsbDtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgY2hhbm5lbEtleSxcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvblVwZGF0ZUNoYW5uZWxDbGFpbXMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBc3NldFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9Bc3NldFByZXZpZXcnO1xuXG5jbGFzcyBDaGFubmVsQ2xhaW1zRGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlID0gdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICB9XG4gIHNob3dQcmV2aW91c1Jlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKHByZXZpb3VzUGFnZSk7XG4gIH1cbiAgc2hvd05leHRSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5leHRQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpICsgMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKG5leHRQYWdlKTtcbiAgfVxuICBzaG93TmV3UGFnZSAocGFnZSkge1xuICAgIGNvbnN0IHsgY2hhbm5lbEtleSwgY2hhbm5lbDogeyBuYW1lLCBsb25nSWQgfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uVXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY2xhaW1zLCBjdXJyZW50UGFnZSwgdG90YWxQYWdlcyB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsJz5cbiAgICAgICAgeyhjbGFpbXMubGVuZ3RoID4gMCkgPyAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHtjbGFpbXMubWFwKChjbGFpbSwgaW5kZXgpID0+IDxBc3NldFByZXZpZXdcbiAgICAgICAgICAgICAgY2xhaW1EYXRhPXtjbGFpbX1cbiAgICAgICAgICAgICAga2V5PXtgJHtjbGFpbS5uYW1lfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAvPil9XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlID4gMSkgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2V9PlByZXZpb3VzIFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcykgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd05leHRSZXN1bHRzUGFnZX0+TmV4dCBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwPlRoZXJlIGFyZSBubyBjbGFpbXMgaW4gdGhpcyBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENsYWltc0Rpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoe3NpdGU6IHtkZWZhdWx0czogeyBkZWZhdWx0VGh1bWJuYWlsIH19fSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jb25zdCBBc3NldFByZXZpZXcgPSAoeyBkZWZhdWx0VGh1bWJuYWlsLCBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgZmlsZUV4dCwgY29udGVudFR5cGUsIHRodW1ibmFpbCB9IH0pID0+IHtcbiAgY29uc3QgZGlyZWN0U291cmNlTGluayA9IGAke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWA7XG4gIGNvbnN0IHNob3dVcmxMaW5rID0gYC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdhc3NldC1ob2xkZXInPlxuICAgICAgPExpbmsgdG89e3Nob3dVcmxMaW5rfSA+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Fzc2V0LXByZXZpZXcnfVxuICAgICAgICAgICAgICAgICAgc3JjPXtkaXJlY3RTb3VyY2VMaW5rfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Fzc2V0LXByZXZpZXcgdmlkZW8nfVxuICAgICAgICAgICAgICAgICAgc3JjPXt0aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cD51bnN1cHBvcnRlZCBmaWxlIHR5cGU8L3A+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpfVxuICAgICAgPC9MaW5rPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRQcmV2aWV3O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGU6IHsgaG9zdCwgdGl0bGUgfSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9zdCxcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY2xhc3MgRm91ck9oRm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3RpdGxlLCBob3N0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgPHRpdGxlPnt0aXRsZX0gLSA0MDQ8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD0nY2Fub25pY2FsJyBocmVmPXtgJHtob3N0fS80MDRgfSAvPlxuICAgICAgICA8L0hlbG1ldD5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8aDI+NDA0PC9oMj5cbiAgICAgICAgICA8cD5UaGF0IHBhZ2UgZG9lcyBub3QgZXhpc3Q8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRm91ck9oRm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4IiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3QgeyBkZXRlcm1pbmVSZXNwb25zZVR5cGUsIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHksIGxvZ1JlcXVlc3REYXRhLCBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSB0byBzZXJ2ZSBhIHNwZWNpZmljIGFzc2V0IHVzaW5nIHRoZSBjaGFubmVsIG9yIGNsYWltIGlkXG4gIGFwcC5nZXQoJy86aWRlbnRpZmllci86Y2xhaW0nLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gICAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgICB0cnkge1xuICAgICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gICAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgLy8gcGFyc2UgdGhlIGNsYWltXG4gICAgbGV0IGNsYWltTmFtZTtcbiAgICB0cnkge1xuICAgICAgKHsgY2xhaW1OYW1lIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgLy8gcGFyc2UgdGhlIGlkZW50aWZpZXJcbiAgICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQ7XG4gICAgdHJ5IHtcbiAgICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihwYXJhbXMuaWRlbnRpZmllcikpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIGlmICghaXNDaGFubmVsKSB7XG4gICAgICBbY2xhaW1JZCwgY2xhaW1OYW1lXSA9IGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkoY2xhaW1JZCwgY2xhaW1OYW1lKTtcbiAgICB9XG4gICAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICAgIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCk7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2VydmUgdGhlIHdpbm5pbmcgYXNzZXQgYXQgYSBjbGFpbSBvciBhIGNoYW5uZWwgcGFnZVxuICBhcHAuZ2V0KCcvOmNsYWltJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAgIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gICAgdHJ5IHtcbiAgICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICAgIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gICAgfVxuICAgIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gICAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gICAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAgIC8vIHBhcnNlIHRoZSBjbGFpbVxuICAgIGxldCBjbGFpbU5hbWU7XG4gICAgdHJ5IHtcbiAgICAgICh7Y2xhaW1OYW1lfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gICAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIG51bGwsIG51bGwpO1xuICAgIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gICAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQobnVsbCwgbnVsbCwgY2xhaW1OYW1lLCBudWxsLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXQtcm91dGVzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBnZXRDbGFpbUlkLCBnZXRMb2NhbEZpbGVSZWNvcmQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCcuL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuY29uc3QgU0hPVyA9ICdTSE9XJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5mdW5jdGlvbiBjbGllbnRBY2NlcHRzSHRtbCAoe2FjY2VwdH0pIHtcbiAgcmV0dXJuIGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLyk7XG59O1xuXG5mdW5jdGlvbiByZXF1ZXN0SXNGcm9tQnJvd3NlciAoaGVhZGVycykge1xuICByZXR1cm4gaGVhZGVyc1sndXNlci1hZ2VudCddICYmIGhlYWRlcnNbJ3VzZXItYWdlbnQnXS5tYXRjaCgvTW96aWxsYS8pO1xufTtcblxuZnVuY3Rpb24gY2xpZW50V2FudHNBc3NldCAoe2FjY2VwdCwgcmFuZ2V9KSB7XG4gIGNvbnN0IGltYWdlSXNXYW50ZWQgPSBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC9pbWFnZVxcLy4qLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvXFwqLyk7XG4gIGNvbnN0IHZpZGVvSXNXYW50ZWQgPSBhY2NlcHQgJiYgcmFuZ2U7XG4gIHJldHVybiBpbWFnZUlzV2FudGVkIHx8IHZpZGVvSXNXYW50ZWQ7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2xhaW1JZCAoY2xhaW1JZCkge1xuICByZXR1cm4gKChjbGFpbUlkLmxlbmd0aCA9PT0gNDApICYmICEvW15BLVphLXowLTldL2cudGVzdChjbGFpbUlkKSk7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZCAoY2xhaW1JZCkge1xuICByZXR1cm4gY2xhaW1JZC5sZW5ndGggPT09IDE7ICAvLyBpdCBzaG91bGQgcmVhbGx5IGV2YWx1YXRlIHRoZSBzaG9ydCB1cmwgaXRzZWxmXG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCAoaW5wdXQpIHtcbiAgcmV0dXJuIChpc1ZhbGlkQ2xhaW1JZChpbnB1dCkgfHwgaXNWYWxpZFNob3J0SWQoaW5wdXQpKTtcbn07XG5cbmZ1bmN0aW9uIHNlcnZlQXNzZXRUb0NsaWVudCAoY2xhaW1JZCwgbmFtZSwgcmVzKSB7XG4gIHJldHVybiBnZXRMb2NhbEZpbGVSZWNvcmQoY2xhaW1JZCwgbmFtZSlcbiAgICAudGhlbihmaWxlUmVjb3JkID0+IHtcbiAgICAgIC8vIGNoZWNrIHRoYXQgYSBsb2NhbCByZWNvcmQgd2FzIGZvdW5kXG4gICAgICBpZiAoZmlsZVJlY29yZCA9PT0gTk9fRklMRSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygzMDcpLnJlZGlyZWN0KGAvYXBpL2NsYWltL2dldC8ke25hbWV9LyR7Y2xhaW1JZH1gKTtcbiAgICAgIH1cbiAgICAgIC8vIHNlcnZlIHRoZSBmaWxlXG4gICAgICBjb25zdCB7ZmlsZVBhdGgsIGZpbGVUeXBlfSA9IGZpbGVSZWNvcmQ7XG4gICAgICBsb2dnZXIudmVyYm9zZShgc2VydmluZyBmaWxlOiAke2ZpbGVQYXRofWApO1xuICAgICAgY29uc3Qgc2VuZEZpbGVPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgICAgICAgOiBmaWxlVHlwZSB8fCAnaW1hZ2UvanBlZycsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmRGaWxlKGZpbGVQYXRoLCBzZW5kRmlsZU9wdGlvbnMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpIHtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihmdWxsQ2xhaW1JZCA9PiB7XG4gICAgICAgIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2hhbm5lbCBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2ZUFzc2V0VG9DbGllbnQoZnVsbENsYWltSWQsIGNsYWltTmFtZSwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdzdWNjZXNzJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ2ZhaWwnKTtcbiAgICAgIH0pO1xuICB9LFxuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUgKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2VUeXBlO1xuICAgIGlmIChoYXNGaWxlRXh0ZW5zaW9uKSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTsgIC8vIGFzc3VtZSBhIHNlcnZlIHJlcXVlc3QgaWYgZmlsZSBleHRlbnNpb24gaXMgcHJlc2VudFxuICAgICAgaWYgKGNsaWVudEFjY2VwdHNIdG1sKGhlYWRlcnMpKSB7ICAvLyBpZiB0aGUgcmVxdWVzdCBjb21lcyBmcm9tIGEgYnJvd3NlciwgY2hhbmdlIGl0IHRvIGEgc2hvdyByZXF1ZXN0XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICBpZiAoY2xpZW50V2FudHNBc3NldChoZWFkZXJzKSAmJiByZXF1ZXN0SXNGcm9tQnJvd3NlcihoZWFkZXJzKSkgeyAgLy8gdGhpcyBpcyBpbiBjYXNlIHNvbWVvbmUgZW1iZWRzIGEgc2hvdyB1cmxcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdTaG93IHJlcXVlc3QgY2FtZSBmcm9tIGJyb3dzZXIgYnV0IHdhbnRzIGFuIGltYWdlL3ZpZGVvLiBDaGFuZ2luZyByZXNwb25zZSB0byBzZXJ2ZS4uLicpO1xuICAgICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlVHlwZTtcbiAgfSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSAoaWRlbnRpZmllciwgbmFtZSkge1xuICAgIC8vIHRoaXMgaXMgYSBwYXRjaCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCAnL25hbWUvY2xhaW1faWQnIHVybCBmb3JtYXRcbiAgICBpZiAoaXNWYWxpZFNob3J0SWRPckNsYWltSWQobmFtZSkgJiYgIWlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKGlkZW50aWZpZXIpKSB7XG4gICAgICBjb25zdCB0ZW1wTmFtZSA9IG5hbWU7XG4gICAgICBuYW1lID0gaWRlbnRpZmllcjtcbiAgICAgIGlkZW50aWZpZXIgPSB0ZW1wTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFtpZGVudGlmaWVyLCBuYW1lXTtcbiAgfSxcbiAgbG9nUmVxdWVzdERhdGEgKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZygncmVzcG9uc2VUeXBlID09PScsIHJlc3BvbnNlVHlwZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBuYW1lID09PSAnLCBjbGFpbU5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBuYW1lID09PScsIGNoYW5uZWxOYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIGlkID09PScsIGNsYWltSWQpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBpZGVudGlmaWVyOicsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHt2YWx1ZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciB1cmwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwgbmFtZSBhZnRlciBALicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltSWQsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG5hbWU6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgLicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yICR7bW9kaWZpZXJTZXBlcmF0b3J9LmApO1xuICAgICAgfVxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHttb2RpZmllclNlcGVyYXRvcn0gbW9kaWZpZXIgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZWApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VNb2RpZmllcjogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG1vZGlmaWVyOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb24gPSBmYWxzZTtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbixcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUmVkdWNlciBmcm9tICcuLi8uLi9jbGllbnQvcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXgnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi8uLi9jbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgaGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvc2FnYXMvc2hvd191cmknO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9hY3Rpb25zL3Nob3cnO1xuXG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHJldHVyblNhZ2FXaXRoUGFyYW1zID0gKHNhZ2EsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKiAoKSB7XG4gICAgeWllbGQgY2FsbChzYWdhLCBwYXJhbXMpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBvbkhhbmRsZVNob3dQYWdlVXJpKHJlcS5wYXJhbXMpO1xuICBjb25zdCBzYWdhID0gcmV0dXJuU2FnYVdpdGhQYXJhbXMoaGFuZGxlU2hvd1BhZ2VVcmksIGFjdGlvbik7XG5cbiAgLy8gcnVuIHRoZSBzYWdhIG1pZGRsZXdhcmVcbiAgc2FnYU1pZGRsZXdhcmVcbiAgICAucnVuKHNhZ2EpXG4gICAgLmRvbmVcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCJcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgb25SZXF1ZXN0RXJyb3IsIG9uTmV3Q2hhbm5lbFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IG5ld0Fzc2V0UmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfYXNzZXQnO1xuaW1wb3J0IHsgbmV3Q2hhbm5lbFJlcXVlc3QgfSBmcm9tICdzYWdhcy9zaG93X2NoYW5uZWwnO1xuaW1wb3J0IGxicnlVcmkgZnJvbSAndXRpbHMvbGJyeVVyaSc7XG5cbmZ1bmN0aW9uICogcGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0gKG1vZGlmaWVyLCBjbGFpbSkge1xuICAvLyB0aGlzIGlzIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXRcbiAgLy8gY2xhaW0gd2lsbCBiZSBhbiBhc3NldCBjbGFpbVxuICAvLyB0aGUgaWRlbnRpZmllciBjb3VsZCBiZSBhIGNoYW5uZWwgb3IgYSBjbGFpbSBpZFxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQsIGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihtb2RpZmllcikpO1xuICAgICh7IGNsYWltTmFtZSwgZXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICBpZiAoaXNDaGFubmVsKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIG51bGwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgZXh0ZW5zaW9uKSk7XG4gIH07XG4gIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIGNsYWltSWQsIG51bGwsIG51bGwsIGV4dGVuc2lvbikpO1xufVxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUNsYWltT25seSAoY2xhaW0pIHtcbiAgLy8gdGhpcyBjb3VsZCBiZSBhIHJlcXVlc3QgZm9yIGFuIGFzc2V0IG9yIGEgY2hhbm5lbCBwYWdlXG4gIC8vIGNsYWltIGNvdWxkIGJlIGFuIGFzc2V0IGNsYWltIG9yIGEgY2hhbm5lbCBjbGFpbVxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gdHJpZ2dlciBhbiBuZXcgYWN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RvcmVcbiAgLy8gcmV0dXJuIGVhcmx5IGlmIHRoaXMgcmVxdWVzdCBpcyBmb3IgYSBjaGFubmVsXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdDaGFubmVsUmVxdWVzdCwgb25OZXdDaGFubmVsUmVxdWVzdChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpKTtcbiAgfVxuICAvLyBpZiBub3QgZm9yIGEgY2hhbm5lbCwgcGFyc2UgdGhlIGNsYWltIHJlcXVlc3RcbiAgbGV0IGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lLCBleHRlbnNpb259ID0gbGJyeVVyaS5wYXJzZUNsYWltKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIGhhbmRsZVNob3dQYWdlVXJpIChhY3Rpb24pIHtcbiAgY29uc3QgeyBpZGVudGlmaWVyLCBjbGFpbSB9ID0gYWN0aW9uLmRhdGE7XG4gIGlmIChpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0sIGlkZW50aWZpZXIsIGNsYWltKTtcbiAgfVxuICB5aWVsZCBjYWxsKHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5LCBjbGFpbSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaEhhbmRsZVNob3dQYWdlVXJpICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSwgaGFuZGxlU2hvd1BhZ2VVcmkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsImltcG9ydCB7IGNhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCBhZGRBc3NldFRvQXNzZXRMaXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldExvbmdDbGFpbUlkLCBnZXRTaG9ydElkLCBnZXRDbGFpbURhdGEgfSBmcm9tICdhcGkvYXNzZXRBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0Fzc2V0UmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgbmFtZSwgbW9kaWZpZXIgfSA9IGFjdGlvbi5kYXRhO1xuICAvLyBwdXQgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBpbiByZWR1eFxuICB5aWVsZCBwdXQob25SZXF1ZXN0VXBkYXRlKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyByZXF1ZXN0P1xuICAvLyBJZiB0aGlzIHVyaSBpcyBpbiB0aGUgcmVxdWVzdCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGNvbnN0IHN0YXRlID0geWllbGQgc2VsZWN0KHNlbGVjdFNob3dTdGF0ZSk7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBpZiAoc3RhdGUucmVxdWVzdExpc3RbcmVxdWVzdElkXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBsb25nIGlkICYmIGFkZCByZXF1ZXN0IHRvIHJlcXVlc3QgbGlzdFxuICBsZXQgbG9uZ0lkO1xuICB0cnkge1xuICAgICh7ZGF0YTogbG9uZ0lkfSA9IHlpZWxkIGNhbGwoZ2V0TG9uZ0NsYWltSWQsIGhvc3QsIG5hbWUsIG1vZGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgY29uc3QgYXNzZXRLZXkgPSBgYSMke25hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGFzc2V0S2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgYXNzZXQ/XG4gIC8vIElmIHRoaXMgYXNzZXQgaXMgaW4gdGhlIGFzc2V0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmFzc2V0TGlzdFthc3NldEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgc2hvcnQgSWRcbiAgbGV0IHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBzaG9ydElkfSA9IHlpZWxkIGNhbGwoZ2V0U2hvcnRJZCwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gZ2V0IGFzc2V0IGNsYWltIGRhdGFcbiAgbGV0IGNsYWltRGF0YTtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGNsYWltRGF0YX0gPSB5aWVsZCBjYWxsKGdldENsYWltRGF0YSwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gYWRkIGFzc2V0IHRvIGFzc2V0IGxpc3RcbiAgeWllbGQgcHV0KGFkZEFzc2V0VG9Bc3NldExpc3QoYXNzZXRLZXksIG51bGwsIG5hbWUsIGxvbmdJZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSk7XG4gIC8vIGNsZWFyIGFueSBlcnJvcnMgaW4gcmVxdWVzdCBlcnJvclxuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hOZXdBc3NldFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsIG5ld0Fzc2V0UmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvbmdDbGFpbUlkIChob3N0LCBuYW1lLCBtb2RpZmllcikge1xuICBsZXQgYm9keSA9IHt9O1xuICAvLyBjcmVhdGUgcmVxdWVzdCBwYXJhbXNcbiAgaWYgKG1vZGlmaWVyKSB7XG4gICAgaWYgKG1vZGlmaWVyLmlkKSB7XG4gICAgICBib2R5WydjbGFpbUlkJ10gPSBtb2RpZmllci5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keVsnY2hhbm5lbE5hbWUnXSA9IG1vZGlmaWVyLmNoYW5uZWwubmFtZTtcbiAgICAgIGJvZHlbJ2NoYW5uZWxDbGFpbUlkJ10gPSBtb2RpZmllci5jaGFubmVsLmlkO1xuICAgIH1cbiAgfVxuICBib2R5WydjbGFpbU5hbWUnXSA9IG5hbWU7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH07XG4gIC8vIGNyZWF0ZSB1cmxcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2xvbmctaWRgO1xuICAvLyByZXR1cm4gdGhlIHJlcXVlc3QgcHJvbWlzZVxuICByZXR1cm4gUmVxdWVzdCh1cmwsIHBhcmFtcyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnRJZCAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vc2hvcnQtaWQvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFpbURhdGEgKGhvc3QsIG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2RhdGEvJHtuYW1lfS8ke2NsYWltSWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwiaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0LCBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgdXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDaGFubmVsRGF0YSB9IGZyb20gJ2FwaS9jaGFubmVsQXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcbmltcG9ydCB7IHNlbGVjdFNpdGVIb3N0IH0gZnJvbSAnc2VsZWN0b3JzL3NpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdDaGFubmVsUmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgbG9uZyBpZFxuICBsZXQgbG9uZ0lkLCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7IGRhdGE6IHtsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdJZCwgc2hvcnRDaGFubmVsQ2xhaW1JZDogc2hvcnRJZH0gfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbERhdGEsIGhvc3QsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgcmVxdWVzdCBpbiB0aGUgY2hhbm5lbCByZXF1ZXN0cyBsaXN0XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSBgYyMke2NoYW5uZWxOYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBjaGFubmVsS2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgY2hhbm5lbD9cbiAgLy8gSWYgdGhpcyBjaGFubmVsIGlzIGluIHRoZSBjaGFubmVsIGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgY2xhaW1zIGRhdGFcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIGNoYW5uZWxOYW1lLCAxKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gc3RvcmUgdGhlIGNoYW5uZWwgZGF0YSBpbiB0aGUgY2hhbm5lbCBsaXN0XG4gIHlpZWxkIHB1dChhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdChjaGFubmVsS2V5LCBjaGFubmVsTmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSk7XG4gIC8vIGNsZWFyIGFueSByZXF1ZXN0IGVycm9yc1xuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsIG5ld0NoYW5uZWxSZXF1ZXN0KTtcbn07XG5cbmZ1bmN0aW9uICogZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlIH0gPSBhY3Rpb24uZGF0YTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGxldCBjbGFpbXNEYXRhO1xuICB0cnkge1xuICAgICh7IGRhdGE6IGNsYWltc0RhdGEgfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbENsYWltcywgaG9zdCwgbG9uZ0lkLCBuYW1lLCBwYWdlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgcHV0KHVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgY2xhaW1zRGF0YSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaFVwZGF0ZUNoYW5uZWxDbGFpbXMgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DLCBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxEYXRhIChob3N0LCBpZCwgbmFtZSkge1xuICBpZiAoIWlkKSBpZCA9ICdub25lJztcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvZGF0YS8ke25hbWV9LyR7aWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFubmVsQ2xhaW1zIChob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpIHtcbiAgaWYgKCFwYWdlKSBwYWdlID0gMTtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvY2xhaW1zLyR7bmFtZX0vJHtsb25nSWR9LyR7cGFnZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvY2hhbm5lbEFwaS5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwID0+IHtcbiAgLy8gYSBjYXRjaC1hbGwgcm91dGUgaWYgc29tZW9uZSB2aXNpdHMgYSBwYWdlIHRoYXQgZG9lcyBub3QgZXhpc3RcbiAgYXBwLnVzZSgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2VcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay1yb3V0ZXMuanMiLCJjb25zdCB7IGxvZ0xldmVsIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbG9nZ2VyQ29uZmlnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHdpbnN0b24pID0+IHtcbiAgLy8gY29uZmlndXJlXG4gIHdpbnN0b24uY29uZmlndXJlKHtcbiAgICB0cmFuc3BvcnRzOiBbXG4gICAgICBuZXcgKHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxvZ0xldmVsLFxuICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgcHJldHR5UHJpbnQgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuICAvLyB0ZXN0IGFsbCB0aGUgbG9nIGxldmVsc1xuICB3aW5zdG9uLmVycm9yKCdMZXZlbCAwJyk7XG4gIHdpbnN0b24ud2FybignTGV2ZWwgMScpO1xuICB3aW5zdG9uLmluZm8oJ0xldmVsIDInKTtcbiAgd2luc3Rvbi52ZXJib3NlKCdMZXZlbCAzJyk7XG4gIHdpbnN0b24uZGVidWcoJ0xldmVsIDQnKTtcbiAgd2luc3Rvbi5zaWxseSgnTGV2ZWwgNScpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcyIsImNvbnN0IGxvZ2dlckNvbmZpZyA9IHtcbiAgbG9nTGV2ZWw6ICdkZWJ1ZycsICAvLyBvcHRpb25zOiBzaWxseSwgZGVidWcsIHZlcmJvc2UsIGluZm9cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nZ2VyQ29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zbGFja0NvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh3aW5zdG9uKSA9PiB7XG4gIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IHNsYWNrQ29uZmlnO1xuICBpZiAoc2xhY2tXZWJIb29rKSB7XG4gICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICBpZiAoc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgIHdlYmhvb2tVcmw6IHNsYWNrV2ViSG9vayxcbiAgICAgICAgY2hhbm5lbCAgIDogc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgd2ViaG9va1VybDogc2xhY2tXZWJIb29rLFxuICAgICAgICBjaGFubmVsICAgOiBzbGFja0luZm9DaGFubmVsLFxuICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlXG4gICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gIH0gZWxzZSB7XG4gICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jb25maWd1cmVTbGFjay5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tc2xhY2std2ViaG9va1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==