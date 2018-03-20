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
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
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


var Sequelize = __webpack_require__(25);
var logger = __webpack_require__(1);

console.log('exporting sequelize models');

var _require = __webpack_require__(22),
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
var Certificate = __webpack_require__(59);
var Channel = __webpack_require__(60);
var Claim = __webpack_require__(61);
var File = __webpack_require__(62);
var Request = __webpack_require__(63);
var User = __webpack_require__(64);
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

var _show_action_types = __webpack_require__(8);

var actions = _interopRequireWildcard(_show_action_types);

var _show_request_types = __webpack_require__(39);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _channel = __webpack_require__(17);

var _publish = __webpack_require__(18);

var _view = __webpack_require__(84);

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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = request;

__webpack_require__(87);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(88);

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


var axios = __webpack_require__(56);
var logger = __webpack_require__(1);

var _require = __webpack_require__(57),
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
var ua = __webpack_require__(58);

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
exports.updateLoggedInChannel = updateLoggedInChannel;

var _channel_action_types = __webpack_require__(34);

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
/* 18 */
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

var _publish_action_types = __webpack_require__(33);

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
/* 19 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(19);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NavBar = __webpack_require__(7);

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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);
var fs = __webpack_require__(71);

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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(5);
var logger = __webpack_require__(1);

var _require = __webpack_require__(73),
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


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(31);

var _redux = __webpack_require__(16);

var _index = __webpack_require__(32);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _index3 = __webpack_require__(36);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(37);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(41);

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
/* 31 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(16);

var _publish = __webpack_require__(75);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(77);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(78);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(79);

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  channel: _channel2.default,
  publish: _publish2.default,
  show: _show2.default,
  site: _site2.default
});

/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL_UPDATE = exports.CHANNEL_UPDATE = 'CHANNEL_UPDATE';

/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactGa = __webpack_require__(80);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _dynamicImport = __webpack_require__(81);

var _AboutPage = __webpack_require__(83);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _LoginPage = __webpack_require__(92);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(100);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(117);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(19);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveStatusBar = __webpack_require__(98);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(99);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL = exports.CHANNEL = 'CHANNEL';
var ASSET_LITE = exports.ASSET_LITE = 'ASSET_LITE';
var ASSET_DETAILS = exports.ASSET_DETAILS = 'ASSET_DETAILS';

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(104);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(6);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helmet, html, preloadedState) {
    // take the html and preloadedState and return the full page
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(45);
module.exports = __webpack_require__(46);


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(47);
var bodyParser = __webpack_require__(48);
var expressHandlebars = __webpack_require__(49);
var Handlebars = __webpack_require__(50);
var helmet = __webpack_require__(51);
var passport = __webpack_require__(21);

var _require = __webpack_require__(52),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

var cookieSession = __webpack_require__(53);
var http = __webpack_require__(54);
// logging dependencies
var logger = __webpack_require__(1);

function SpeechServer() {
  var _this = this;

  this.configureMysql = function (mysqlConfig) {
    __webpack_require__(22).configure(mysqlConfig);
  };
  this.configureSite = function (siteConfig) {
    __webpack_require__(3).configure(siteConfig);
    console.log(__webpack_require__(3));
    _this.sessionKey = siteConfig.auth.sessionKey;
    _this.PORT = siteConfig.details.port;
  };
  this.configureSlack = function (slackConfig) {
    __webpack_require__(23).configure(slackConfig);
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
    var localSignupStrategy = __webpack_require__(55);
    var localLoginStrategy = __webpack_require__(66);
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
    __webpack_require__(67)(app);
    __webpack_require__(68)(app);
    __webpack_require__(74)(app);
    __webpack_require__(119)(app);
    __webpack_require__(130)(app);

    _this.app = app;
  };
  this.initialize = function () {
    __webpack_require__(131)(logger);
    __webpack_require__(133)(logger);
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
/* 47 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(24).Strategy;
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
/* 56 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 57 */
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
/* 58 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(26),
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
/* 60 */
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(26),
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
/* 62 */
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
/* 63 */
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(65);
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
/* 65 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(24).Strategy;
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);
var passport = __webpack_require__(21);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(1);
var multipart = __webpack_require__(69);

var _require = __webpack_require__(3),
    uploadDirectory = _require.publishing.uploadDirectory,
    host = _require.details.host;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });
var db = __webpack_require__(5);

var _require2 = __webpack_require__(70),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    checkChannelAvailability = _require2.checkChannelAvailability,
    publish = _require2.publish;

var _require3 = __webpack_require__(14),
    getClaimList = _require3.getClaimList,
    resolveUri = _require3.resolveUri,
    getClaim = _require3.getClaim;

var _require4 = __webpack_require__(27),
    addGetResultsToFileData = _require4.addGetResultsToFileData,
    createBasicPublishParams = _require4.createBasicPublishParams,
    createThumbnailPublishParams = _require4.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require4.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require4.parsePublishApiRequestFiles,
    createFileData = _require4.createFileData;

var errorHandlers = __webpack_require__(28);

var _require5 = __webpack_require__(15),
    sendGATimingEvent = _require5.sendGATimingEvent;

var _require6 = __webpack_require__(72),
    authenticateUser = _require6.authenticateUser;

var _require7 = __webpack_require__(29),
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
/* 69 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(1);
var db = __webpack_require__(5);
var lbryApi = __webpack_require__(14);
var publishHelpers = __webpack_require__(27);

var _require = __webpack_require__(3),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(25);
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
/* 71 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 72 */
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
/* 73 */
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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    host = _require.details;

var handlePageRender = __webpack_require__(30);

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
/* 75 */
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

var _publish_action_types = __webpack_require__(33);

var actions = _interopRequireWildcard(_publish_action_types);

var _publish_channel_select_states = __webpack_require__(76);

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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = exports.LOGIN = 'Existing';
var CREATE = exports.CREATE = 'New';

/***/ }),
/* 77 */
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

var _channel_action_types = __webpack_require__(34);

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
/* 78 */
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

var _show_action_types = __webpack_require__(8);

var actions = _interopRequireWildcard(_show_action_types);

var _asset_display_states = __webpack_require__(35);

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
/* 79 */
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
/* 80 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

/***/ }),
/* 81 */
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

var dynamicImport = function dynamicImport(filePath) {
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
    return !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()); // return default component
  }
};

exports.default = dynamicImport;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 82;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NavBar = __webpack_require__(7);

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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Logo = __webpack_require__(85);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(86);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _request = __webpack_require__(9);

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
/* 85 */
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
/* 86 */
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
/* 87 */
/***/ (function(module, exports) {

module.exports = require("cross-fetch/polyfill");

/***/ }),
/* 88 */
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

var _propTypes = __webpack_require__(19);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageTitle = __webpack_require__(89);

var _metaTags = __webpack_require__(90);

var _canonicalLink = __webpack_require__(91);

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
/* 89 */
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
/* 90 */
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
/* 91 */
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(93);

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
/* 93 */
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

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelLoginForm = __webpack_require__(94);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(96);

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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _channel = __webpack_require__(17);

var _view = __webpack_require__(95);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(18);

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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(9);

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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _channel = __webpack_require__(17);

var _view = __webpack_require__(97);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(18);

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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(38);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _request = __webpack_require__(9);

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
/* 98 */
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
/* 99 */
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _show = __webpack_require__(6);

var _view = __webpack_require__(101);

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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = __webpack_require__(20);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _ShowAssetLite = __webpack_require__(102);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(105);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(111);

var _ShowChannel2 = _interopRequireDefault(_ShowChannel);

var _show_request_types = __webpack_require__(39);

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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(103);

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
/* 103 */
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

var _AssetDisplay = __webpack_require__(40);

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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(38);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _asset_display_states = __webpack_require__(35);

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
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(106);

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
/* 106 */
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

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ErrorPage = __webpack_require__(20);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(107);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(40);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(109);

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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(108);

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
/* 108 */
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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(110);

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
/* 110 */
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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(112);

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
/* 112 */
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

var _ErrorPage = __webpack_require__(20);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelClaimsDisplay = __webpack_require__(113);

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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _show = __webpack_require__(6);

var _view = __webpack_require__(114);

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
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(115);

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
  var defaultThumbnail = _ref.site.defaults.defaultThumbnail;

  return {
    defaultThumbnail: defaultThumbnail
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
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(118);

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
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NavBar = __webpack_require__(7);

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
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(15),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(120),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(121);
var handleShowRender = __webpack_require__(122);
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
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(29),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(28),
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
/* 121 */
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
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(31);

var _redux = __webpack_require__(16);

var _index = __webpack_require__(32);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _index3 = __webpack_require__(36);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(37);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(41);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(123);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(13);

var _show_uri = __webpack_require__(124);

var _show = __webpack_require__(6);

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
/* 123 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = __webpack_require__(13);

var _show_action_types = __webpack_require__(8);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(6);

var _show_asset = __webpack_require__(125);

var _show_channel = __webpack_require__(127);

var _lbryUri = __webpack_require__(129);

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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = __webpack_require__(13);

var _show_action_types = __webpack_require__(8);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(6);

var _assetApi = __webpack_require__(126);

var _show2 = __webpack_require__(11);

var _site = __webpack_require__(42);

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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongClaimId = getLongClaimId;
exports.getShortId = getShortId;
exports.getClaimData = getClaimData;

var _request = __webpack_require__(9);

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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = __webpack_require__(13);

var _show_action_types = __webpack_require__(8);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(6);

var _channelApi = __webpack_require__(128);

var _show2 = __webpack_require__(11);

var _site = __webpack_require__(42);

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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelData = getChannelData;
exports.getChannelClaims = getChannelClaims;

var _request = __webpack_require__(9);

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
/* 129 */
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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(30);

module.exports = function (app) {
  // a catch-all route if someone visits a page that does not exist
  app.use('*', function (req, res) {
    // send response
    handlePageRender(req, res);
  });
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(132),
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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loggerConfig = {
  logLevel: 'debug' // options: silly, debug, verbose, info
};

module.exports = loggerConfig;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(134).SlackWebHook;
var slackConfig = __webpack_require__(23);

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
/* 134 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjkxMzAzOTlmOTVhZDBiYTBmNzgiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9FcnJvclBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiIiwid2VicGFjazovLy8uL3NlcnZlci9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvcHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaXRlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWdhXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2R5bmFtaWNJbXBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9BYm91dFBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL05hdkJhci92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Mb2dvL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2stcm91dGVzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiIl0sIm5hbWVzIjpbIlNpdGVDb25maWciLCJhbmFseXRpY3MiLCJnb29nbGVJZCIsImFzc2V0RGVmYXVsdHMiLCJkZXNjcmlwdGlvbiIsInRodW1ibmFpbCIsInRpdGxlIiwiYXV0aCIsInNlc3Npb25LZXkiLCJjdXN0b21Db21wb25lbnRzIiwiY29tcG9uZW50cyIsImNvbnRhaW5lcnMiLCJwYWdlcyIsImRldGFpbHMiLCJob3N0IiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsImNvbmZpZ3VyZSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwiU2VxdWVsaXplIiwicmVxdWlyZSIsImxvZ2dlciIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImRiIiwic2VxdWVsaXplIiwiZGlhbGVjdCIsImRpYWxlY3RPcHRpb25zIiwiZGVjaW1hbE51bWJlcnMiLCJsb2dnaW5nIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJhY3F1aXJlIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImluZm8iLCJjYXRjaCIsImVycm9yIiwiZXJyIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJpbXBvcnQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwiZGVidWciLCJ1cGRhdGUiLCJjcmVhdGUiLCJvbkhhbmRsZVNob3dQYWdlVXJpIiwib25SZXF1ZXN0RXJyb3IiLCJvbk5ld0NoYW5uZWxSZXF1ZXN0Iiwib25OZXdBc3NldFJlcXVlc3QiLCJvblJlcXVlc3RVcGRhdGUiLCJhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCIsImFkZEFzc2V0VG9Bc3NldExpc3QiLCJhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCIsIm9uVXBkYXRlQ2hhbm5lbENsYWltcyIsInVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJmaWxlUmVxdWVzdGVkIiwidXBkYXRlRmlsZUF2YWlsYWJpbGl0eSIsInVwZGF0ZURpc3BsYXlBc3NldEVycm9yIiwiYWN0aW9ucyIsInBhcmFtcyIsInR5cGUiLCJIQU5ETEVfU0hPV19VUkkiLCJkYXRhIiwiUkVRVUVTVF9FUlJPUiIsImNoYW5uZWxOYW1lIiwiY2hhbm5lbElkIiwicmVxdWVzdFR5cGUiLCJyZXF1ZXN0SWQiLCJDSEFOTkVMX1JFUVVFU1RfTkVXIiwibmFtZSIsImlkIiwiZXh0ZW5zaW9uIiwiQVNTRVRfUkVRVUVTVF9ORVciLCJtb2RpZmllciIsImNoYW5uZWwiLCJSRVFVRVNUX1VQREFURSIsImtleSIsIlJFUVVFU1RfTElTVF9BREQiLCJjbGFpbUlkIiwic2hvcnRJZCIsImNsYWltRGF0YSIsIkFTU0VUX0FERCIsImxvbmdJZCIsImNsYWltc0RhdGEiLCJDSEFOTkVMX0FERCIsImNoYW5uZWxLZXkiLCJwYWdlIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DIiwiY2hhbm5lbExpc3RJZCIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTIiwiRklMRV9SRVFVRVNURUQiLCJzdGF0dXMiLCJGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUiLCJESVNQTEFZX0FTU0VUX0VSUk9SIiwibWFwU3RhdGVUb1Byb3BzIiwic2l0ZSIsImxvZ2dlZEluQ2hhbm5lbCIsImNoYW5uZWxTaG9ydElkIiwiY2hhbm5lbExvbmdJZCIsInNpdGVEZXNjcmlwdGlvbiIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIm9uQ2hhbm5lbExvZ2luIiwiZGlzcGF0Y2giLCJvbkNoYW5uZWxMb2dvdXQiLCJyZXF1ZXN0IiwicGFyc2VKU09OIiwicmVzcG9uc2UiLCJqc29uIiwiY2hlY2tTdGF0dXMiLCJqc29uUmVzcG9uc2UiLCJFcnJvciIsIm1lc3NhZ2UiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJQcm9taXNlIiwiYWxsIiwiZGVmYXVsdERlc2NyaXB0aW9uIiwiZGVmYXVsdFRodW1ibmFpbCIsInNpdGVIb3N0Iiwic2l0ZVRpdGxlIiwic2l0ZVR3aXR0ZXIiLCJzZWxlY3RBc3NldCIsInNob3ciLCJyZXF1ZXN0TGlzdCIsImFzc2V0S2V5IiwiYXNzZXRMaXN0Iiwic2VsZWN0U2hvd1N0YXRlIiwic3RhdGUiLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsInNlbmRHQVRpbWluZ0V2ZW50IiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJjaGFubmVsX25hbWUiLCJhbW91bnQiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiaXAiLCJvcmlnaW5hbFVybCIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsImNoYW5uZWxfaWQiLCJ1cGRhdGVMb2dnZWRJbkNoYW5uZWwiLCJDSEFOTkVMX1VQREFURSIsInNlbGVjdEZpbGUiLCJjbGVhckZpbGUiLCJ1cGRhdGVNZXRhZGF0YSIsInVwZGF0ZUNsYWltIiwic2V0UHVibGlzaEluQ2hhbm5lbCIsInVwZGF0ZVB1Ymxpc2hTdGF0dXMiLCJ1cGRhdGVFcnJvciIsInVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCIsInRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwib25OZXdUaHVtYm5haWwiLCJzdGFydFB1Ymxpc2giLCJmaWxlIiwiRklMRV9TRUxFQ1RFRCIsIkZJTEVfQ0xFQVIiLCJ2YWx1ZSIsIk1FVEFEQVRBX1VQREFURSIsIkNMQUlNX1VQREFURSIsIlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwiLCJQVUJMSVNIX1NUQVRVU19VUERBVEUiLCJFUlJPUl9VUERBVEUiLCJTRUxFQ1RFRF9DSEFOTkVMX1VQREFURSIsInNob3dNZXRhZGF0YUlucHV0cyIsIlRPR0dMRV9NRVRBREFUQV9JTlBVVFMiLCJUSFVNQk5BSUxfTkVXIiwiaGlzdG9yeSIsIlBVQkxJU0hfU1RBUlQiLCJFcnJvclBhZ2UiLCJwcm9wcyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJNeXNxbENvbmZpZyIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwicmV0dXJuU2hvcnRJZCIsImNsYWltc0FycmF5IiwiY2xhaW1JbmRleCIsInN1YnN0cmluZyIsInNob3J0SWRMZW5ndGgiLCJmaW5kSW5kZXgiLCJlbGVtZW50IiwicG9zc2libGVNYXRjaGVzIiwic2xpY2UiLCJsZW5ndGgiLCJmaWx0ZXIiLCJmcyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5IiwibnNmdyIsImxpY2Vuc2UiLCJpbnZhbGlkTmFtZUNoYXJhY3RlcnMiLCJleGVjIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwicGF0aCIsInNpemUiLCJ0ZXN0IiwidmFsaWRhdGVGaWxlVHlwZUFuZFNpemUiLCJmaWxlTmFtZSIsImZpbGVQYXRoIiwiZmlsZVR5cGUiLCJ0aHVtYm5haWxGaWxlTmFtZSIsInRodW1ibmFpbEZpbGVQYXRoIiwidGh1bWJuYWlsRmlsZVR5cGUiLCJjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMiLCJ0cmltIiwiZmlsZV9wYXRoIiwiYmlkIiwibWV0YWRhdGEiLCJhdXRob3IiLCJsYW5ndWFnZSIsImNsYWltX2FkZHJlc3MiLCJjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsInVubGluayIsImFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIiwiZmlsZUluZm8iLCJnZXRSZXN1bHQiLCJmaWxlX25hbWUiLCJkb3dubG9hZF9wYXRoIiwiY3JlYXRlRmlsZURhdGEiLCJvdXRwb2ludCIsImhlaWdodCIsImFkZHJlc3MiLCJjb250ZW50VHlwZSIsImhhbmRsZUVycm9yUmVzcG9uc2UiLCJyZXMiLCJ1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMiLCJyZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMiLCJjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCIsImNvZGUiLCJuZXdFcnJvck9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJzdWNjZXNzIiwicmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyIsIk5PX0NIQU5ORUwiLCJOT19DTEFJTSIsIk5PX0ZJTEUiLCJnZXRDbGFpbUlkIiwiY2hhbm5lbENsYWltSWQiLCJnZXRDbGFpbUlkQnlDaGFubmVsIiwiZ2V0Q2xhaW1JZEJ5Q2xhaW0iLCJnZXRMb25nQ2xhaW1JZCIsImxvbmdDbGFpbUlkIiwiZ2V0TG9uZ0NoYW5uZWxJZCIsImxvbmdDaGFubmVsSWQiLCJnZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkIiwiZ2V0Q2hhbm5lbERhdGEiLCJsb25nQ2hhbm5lbENsYWltSWQiLCJnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkIiwic2hvcnRDaGFubmVsQ2xhaW1JZCIsImdldENoYW5uZWxDbGFpbXMiLCJnZXRBbGxDaGFubmVsQ2xhaW1zIiwiY2hhbm5lbENsYWltc0FycmF5IiwicGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhIiwiZ2V0TG9jYWxGaWxlUmVjb3JkIiwiZGF0YVZhbHVlcyIsInJlcSIsImNvbnRleHQiLCJzdG9yZSIsImh0bWwiLCJoZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJyZWRpcmVjdCIsInByZWxvYWRlZFN0YXRlIiwiZ2V0U3RhdGUiLCJzZW5kIiwicHVibGlzaCIsIkxPQ0FMX0NIRUNLIiwiVU5BVkFJTEFCTEUiLCJFUlJPUiIsIkFWQUlMQUJMRSIsImluaXRpYWxpemUiLCJHQUxpc3RlbmVyIiwic2VuZFBhZ2VWaWV3IiwibG9jYXRpb24iLCJsaXN0ZW4iLCJzZXQiLCJwYXRobmFtZSIsInBhZ2V2aWV3IiwiY2hpbGRyZW4iLCJIb21lUGFnZSIsIkFwcCIsIlByb2dyZXNzQmFyIiwiYmFycyIsImluZGV4IiwiaW5jcmVtZW50ZXIiLCJjcmVhdGVCYXJzIiwiYmluZCIsInN0YXJ0UHJvZ3Jlc3NCYXIiLCJ1cGRhdGVQcm9ncmVzc0JhciIsInN0b3BQcm9ncmVzc0JhciIsImkiLCJwdXNoIiwiaXNBY3RpdmUiLCJzZXRTdGF0ZSIsInVwZGF0ZUludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwibWFwIiwiYmFyIiwibnVtYmVyIiwiQ0hBTk5FTCIsIkFTU0VUX0xJVEUiLCJBU1NFVF9ERVRBSUxTIiwiZGlzcGxheUFzc2V0IiwiYXNzZXQiLCJvbkZpbGVSZXF1ZXN0IiwidG9TdHJpbmciLCJtZXRhIiwibGluayIsInNlbGVjdFNpdGVTdGF0ZSIsInNlbGVjdFNpdGVIb3N0IiwiZXhwcmVzcyIsImJvZHlQYXJzZXIiLCJleHByZXNzSGFuZGxlYmFycyIsIkhhbmRsZWJhcnMiLCJwYXNzcG9ydCIsInNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJkZXNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJjb29raWVTZXNzaW9uIiwiaHR0cCIsIlNwZWVjaFNlcnZlciIsImNvbmZpZ3VyZU15c3FsIiwibXlzcWxDb25maWciLCJjb25maWd1cmVTaXRlIiwic2l0ZUNvbmZpZyIsIlBPUlQiLCJjb25maWd1cmVTbGFjayIsInNsYWNrQ29uZmlnIiwiY3JlYXRlQXBwIiwiYXBwIiwiZW5hYmxlIiwidXNlIiwic3RhdGljIiwiX19kaXJuYW1lIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwibmV4dCIsInZlcmJvc2UiLCJzZXJpYWxpemVVc2VyIiwiZGVzZXJpYWxpemVVc2VyIiwibG9jYWxTaWdudXBTdHJhdGVneSIsImxvY2FsTG9naW5TdHJhdGVneSIsIm1heEFnZSIsInNlc3Npb24iLCJoYnMiLCJkZWZhdWx0TGF5b3V0IiwiaGFuZGxlYmFycyIsImVuZ2luZSIsInNlcnZlciIsIlNlcnZlciIsInN0YXJ0Iiwic3luYyIsInVzZXIiLCJkb25lIiwiUGFzc3BvcnRMb2NhbFN0cmF0ZWd5IiwiU3RyYXRlZ3kiLCJsYnJ5QXBpIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VySW5mbyIsInVzZXJEYXRhIiwidXNlck5hbWUiLCJjaGFubmVsRGF0YSIsInR4IiwiY2xhaW1faWQiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJzaG9ydENoYW5uZWxJZCIsImxicnlDb25maWciLCJTVFJJTkciLCJCT09MRUFOIiwiSU5URUdFUiIsIlRFWFQiLCJERUNJTUFMIiwiZGVmaW5lIiwiZGVmYXVsdCIsImNsYWltU2VxdWVuY2UiLCJkZWNvZGVkQ2xhaW0iLCJkZXB0aCIsImVmZmVjdGl2ZUFtb3VudCIsImhhc1NpZ25hdHVyZSIsImhleCIsIm5vdXQiLCJ0eGlkIiwidmFsaWRBdEhlaWdodCIsInZhbHVlVmVyc2lvbiIsImNsYWltVHlwZSIsImNlcnRpZmljYXRlVmVyc2lvbiIsImtleVR5cGUiLCJwdWJsaWNLZXkiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJmb3JlaWduS2V5IiwiYWxsb3dOdWxsIiwiZmluZEFsbCIsIm9yZGVyIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCIsIiRsaWtlIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSIsInZhbGlkYXRlTG9uZ0NoYW5uZWxJZCIsImhhc09uZSIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwiY2xhaW0iLCJjZXJ0aWZpY2F0ZUlkIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2UiLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiYWN0aW9uIiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZVBhc3N3b3JkIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwiZ2V0Q2hhbm5lbCIsImlzTWF0Y2giLCJsb2dJbiIsImdldCIsImxvZ291dCIsIm11bHRpcGFydCIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJ1cGxvYWREaXIiLCJjbGFpbU5hbWVJc0F2YWlsYWJsZSIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsImVycm9ySGFuZGxlcnMiLCJhdXRoZW50aWNhdGVVc2VyIiwiYXZhaWxhYmxlTmFtZSIsImJvZHkiLCJjbGFpbXNMaXN0IiwicmVzb2x2ZVJlc3VsdCIsImZpbGVEYXRhIiwiZmlsZVJlY29yZCIsImNvbXBsZXRlZCIsInJlc29sdmVkVXJpIiwiZmlsZXMiLCJjaGFubmVsUGFzc3dvcmQiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiY2xhaW1JbmZvIiwicHVibGlzaEhlbHBlcnMiLCJPcCIsInB1Ymxpc2hSZXN1bHRzIiwiY2xhaW1SZWNvcmQiLCJ1cHNlcnRDcml0ZXJpYSIsInNldENsYWltIiwic2V0RmlsZSIsImNsYWltQWRkcmVzc2VzIiwiYXR0cmlidXRlcyIsIm9yIiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJDTEFJTVNfUEVSX1BBR0UiLCJjbGFpbXMiLCJ0b3RhbFBhZ2VzIiwiZGV0ZXJtaW5lVG90YWxQYWdlcyIsInBhZ2luYXRpb25QYWdlIiwiZ2V0UGFnZUZyb21RdWVyeSIsInZpZXdEYXRhIiwiZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIiwicHJldmlvdXNQYWdlIiwiZGV0ZXJtaW5lUHJldmlvdXNQYWdlIiwiY3VycmVudFBhZ2UiLCJuZXh0UGFnZSIsImRldGVybWluZU5leHRQYWdlIiwidG90YWxSZXN1bHRzIiwiZGV0ZXJtaW5lVG90YWxDbGFpbXMiLCJwYXJzZUludCIsInBhZ2VOdW1iZXIiLCJjbGFpbVN0YXJ0SW5kZXgiLCJjbGFpbUVuZEluZGV4IiwicGFnZU9mQ2xhaW1zIiwidG90YWxDbGFpbXMiLCJmdWxsUGFnZXMiLCJNYXRoIiwiZmxvb3IiLCJyZW1haW5kZXIiLCJoYW5kbGVQYWdlUmVuZGVyIiwicmVuZGVyIiwibGF5b3V0IiwiaW5pdGlhbFN0YXRlIiwiYXNzaWduIiwicHVibGlzaEluQ2hhbm5lbCIsInNlbGVjdGVkQ2hhbm5lbCIsInB1Ymxpc2hTdWJtaXQiLCJMT0dJTiIsIkNSRUFURSIsImNoYW5uZWxMaXN0IiwiZ29vZ2xlQW5hbHl0aWNzSWQiLCJjb21wb25lbnRzQ29uZmlnIiwiZ2V0RGVlcGVzdENoaWxkVmFsdWUiLCJwYXJlbnQiLCJjaGlsZHJlbktleXMiLCJjaGlsZEtleSIsInNoaWZ0IiwiY2hpbGQiLCJkeW5hbWljSW1wb3J0IiwidHlwZW9mIiwiZm9sZGVycyIsInNwbGl0IiwiZm9sZGVyTmFtZSIsImN1c3RvbUNvbXBvbmVudCIsIkFib3V0UGFnZSIsIlZJRVciLCJMT0dPVVQiLCJOYXZCYXIiLCJjaGVja0ZvckxvZ2dlZEluVXNlciIsImxvZ291dFVzZXIiLCJoYW5kbGVTZWxlY3Rpb24iLCJjcmVkZW50aWFscyIsInRhcmdldCIsInNlbGVjdGVkT3B0aW9ucyIsIkxvZ28iLCJOYXZCYXJDaGFubmVsRHJvcGRvd24iLCJkZWZhdWx0U2VsZWN0aW9uIiwiU0VPIiwicGFnZVVyaSIsInBhZ2VUaXRsZSIsIm1ldGFUYWdzIiwiY2Fub25pY2FsTGluayIsInJlbCIsImhyZWYiLCJvYmplY3QiLCJjcmVhdGVQYWdlVGl0bGUiLCJkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwiZmlsZUV4dCIsImxhc3RJbmRleE9mIiwiY3JlYXRlQmFzaWNNZXRhVGFncyIsInByb3BlcnR5IiwiY29udGVudCIsImNyZWF0ZUNoYW5uZWxNZXRhVGFncyIsImNyZWF0ZUFzc2V0TWV0YVRhZ3MiLCJlbWJlZFVybCIsInNob3dVcmwiLCJvZ1RpdGxlIiwib2dEZXNjcmlwdGlvbiIsIm9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJvZ1RodW1ibmFpbCIsImNyZWF0ZU1ldGFUYWdzIiwiY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rIiwiY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsiLCJjcmVhdGVDYW5vbmljYWxMaW5rIiwibG9nZ2VkSW5DaGFubmVsTmFtZSIsIkxvZ2luUGFnZSIsIm5ld1Byb3BzIiwiQ2hhbm5lbExvZ2luRm9ybSIsImhhbmRsZUlucHV0IiwibG9naW5Ub0NoYW5uZWwiLCJwcmV2ZW50RGVmYXVsdCIsIkhlYWRlcnMiLCJDaGFubmVsQ3JlYXRlRm9ybSIsImhhbmRsZUNoYW5uZWxJbnB1dCIsImlucHV0IiwiY2xlYW5zZUNoYW5uZWxJbnB1dCIsInVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSIsImNoYW5uZWxXaXRoQXRTeW1ib2wiLCJjaGVja0lzUGFzc3dvcmRQcm92aWRlZCIsImNoZWNrSXNDaGFubmVsQXZhaWxhYmxlIiwibWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCIsIkFjdGl2ZVN0YXR1c0JhciIsIkluYWN0aXZlU3RhdHVzQmFyIiwiU2hvd1BhZ2UiLCJtYXRjaCIsIm5leHRQcm9wcyIsIlNob3dMaXRlIiwiQXNzZXREaXNwbGF5IiwiU2hvd0Fzc2V0RGV0YWlscyIsIkFzc2V0VGl0bGUiLCJBc3NldEluZm8iLCJjb3B5VG9DbGlwYm9hcmQiLCJlbGVtZW50VG9Db3B5IiwiZGF0YXNldCIsImVsZW1lbnR0b2NvcHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJwcmV2aW91c1JlcXVlc3QiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwic2hvd05ld1BhZ2UiLCJkZWZhdWx0cyIsIkFzc2V0UHJldmlldyIsImRpcmVjdFNvdXJjZUxpbmsiLCJzaG93VXJsTGluayIsIkZvdXJPaEZvclBhZ2UiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IiwibG9nUmVxdWVzdERhdGEiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwiU0VSVkUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicGFyc2VNb2RpZmllciIsInJlc3BvbnNlVHlwZSIsInBhcnNlQ2xhaW0iLCJpc0NoYW5uZWwiLCJwYXJzZUlkZW50aWZpZXIiLCJpZGVudGlmaWVyIiwiU0hPVyIsImNsaWVudEFjY2VwdHNIdG1sIiwiYWNjZXB0IiwicmVxdWVzdElzRnJvbUJyb3dzZXIiLCJjbGllbnRXYW50c0Fzc2V0IiwicmFuZ2UiLCJpbWFnZUlzV2FudGVkIiwidmlkZW9Jc1dhbnRlZCIsImlzVmFsaWRDbGFpbUlkIiwiaXNWYWxpZFNob3J0SWQiLCJpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCIsInNlcnZlQXNzZXRUb0NsaWVudCIsInNlbmRGaWxlT3B0aW9ucyIsInNlbmRGaWxlIiwiZnVsbENsYWltSWQiLCJ0ZW1wTmFtZSIsIlJFR0VYUF9JTlZBTElEX0NMQUlNIiwiUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCIsIlJFR0VYUF9BRERSRVNTIiwiQ0hBTk5FTF9DSEFSIiwiY29tcG9uZW50c1JlZ2V4IiwiUmVnRXhwIiwicHJvdG8iLCJtb2RpZmllclNlcGVyYXRvciIsInN0YXJ0c1dpdGgiLCJuYW1lQmFkQ2hhcnMiLCJqb2luIiwicmV0dXJuU2FnYVdpdGhQYXJhbXMiLCJzYWdhIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlIiwicnVuIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJ3YXRjaEhhbmRsZVNob3dQYWdlVXJpIiwicGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0iLCJwYXJzZUFuZFVwZGF0ZUNsYWltT25seSIsIm5ld0Fzc2V0UmVxdWVzdCIsIndhdGNoTmV3QXNzZXRSZXF1ZXN0IiwiZ2V0U2hvcnRJZCIsImdldENsYWltRGF0YSIsIm5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hOZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyIsImdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwiLCJleHRlbnNpb25TZXBlcmF0b3IiLCJsb2dMZXZlbCIsIndpbnN0b24iLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwid2FybiIsInNpbGx5IiwibG9nZ2VyQ29uZmlnIiwid2luc3RvblNsYWNrV2ViSG9vayIsIlNsYWNrV2ViSG9vayIsImFkZCIsIndlYmhvb2tVcmwiLCJpY29uRW1vamkiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsa0M7Ozs7OztBQ0FBLG9DOzs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7O0FDQUEsU0FBU0EsVUFBVCxHQUF1QjtBQUFBOztBQUNyQixPQUFLQyxTQUFMLEdBQWlCO0FBQ2ZDLGNBQVU7QUFESyxHQUFqQjtBQUdBLE9BQUtDLGFBQUwsR0FBcUI7QUFDbkJDLGlCQUFhLCtCQURNO0FB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WUFIbUI7QUFJL0IxSixpQkFBWTRKLGdCQUptQjtBQUsvQm5PLGtCQUFZLFNBTG1CO0FBTS9CZ3ZCLG1CQUFZO0FBTm1CLE9BQWpDO0FBUUQ7QUFDRDtBQUNBaEIsWUFBUS9zQixLQUFSLENBQWMsa0NBQWQ7QUFDQStzQixZQUFRanRCLElBQVIsQ0FBYSxpQ0FBYjtBQUNELEdBekJELE1BeUJPO0FBQ0xpdEIsWUFBUVMsSUFBUixDQUFhLDJFQUFiO0FBQ0Q7QUFDRixDQTlCRCxDOzs7Ozs7QUNIQSxrRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0Myk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjkxMzAzOTlmOTVhZDBiYTBmNzgiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7XG4gICAgY29tcG9uZW50czoge30sXG4gICAgY29udGFpbmVyczoge30sXG4gICAgcGFnZXMgICAgIDoge30sXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGN1c3RvbUNvbXBvbmVudHMsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnNvbGUubG9nKCdleHBvcnRpbmcgc2VxdWVsaXplIG1vZGVscycpO1xuY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbXlzcWxDb25maWcnKTtcbmNvbnN0IGRiID0ge307XG4vLyBzZXQgc2VxdWVsaXplIG9wdGlvbnNcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICBob3N0ICAgICAgICAgIDogJ2xvY2FsaG9zdCcsXG4gIGRpYWxlY3QgICAgICAgOiAnbXlzcWwnLFxuICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSwgLy8gZml4IHRvIGVuc3VyZSBERUNJTUFMIHdpbGwgbm90IGJlIHN0b3JlZCBhcyBhIHN0cmluZ1xuICBsb2dnaW5nICAgICAgIDogZmFsc2UsXG4gIHBvb2wgICAgICAgICAgOiB7XG4gICAgbWF4ICAgIDogNSxcbiAgICBtaW4gICAgOiAwLFxuICAgIGlkbGUgICA6IDEwMDAwLFxuICAgIGFjcXVpcmU6IDEwMDAwLFxuICB9LFxufSk7XG5cbi8vIGVzdGFibGlzaCBteXNxbCBjb25uZWN0aW9uXG5zZXF1ZWxpemVcbiAgLmF1dGhlbnRpY2F0ZSgpXG4gIC50aGVuKCgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VxdWVsaXplIGhhcyBlc3RhYmxpc2hlZCBteXNxbCBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKCdTZXF1ZWxpemUgd2FzIHVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZTonLCBlcnIpO1xuICB9KTtcblxuLy8gbWFudWFsbHkgYWRkIGVhY2ggbW9kZWwgdG8gdGhlIGRiIG9iamVjdFxuY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCcuL2NlcnRpZmljYXRlLmpzJyk7XG5jb25zdCBDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJy4vY2xhaW0uanMnKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCcuL2ZpbGUuanMnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL3VzZXIuanMnKTtcbmRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG5kYlsnQ2hhbm5lbCddID0gc2VxdWVsaXplLmltcG9ydCgnQ2hhbm5lbCcsIENoYW5uZWwpO1xuZGJbJ0NsYWltJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDbGFpbScsIENsYWltKTtcbmRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG5kYlsnUmVxdWVzdCddID0gc2VxdWVsaXplLmltcG9ydCgnUmVxdWVzdCcsIFJlcXVlc3QpO1xuZGJbJ1VzZXInXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1VzZXInLCBVc2VyKTtcblxuLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4gIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgIGxvZ2dlci5pbmZvKCdBc3NvY2lhdGluZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbiAgfVxufSk7XG5cbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcblxuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuXG5pbXBvcnQgeyBDSEFOTkVMLCBBU1NFVF9MSVRFLCBBU1NFVF9ERVRBSUxTIH0gZnJvbSAnY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcyc7XG5cbi8vIGJhc2ljIHJlcXVlc3QgcGFyc2luZ1xuZXhwb3J0IGZ1bmN0aW9uIG9uSGFuZGxlU2hvd1BhZ2VVcmkgKHBhcmFtcykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLFxuICAgIGRhdGE6IHBhcmFtcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlcXVlc3RFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdDaGFubmVsUmVxdWVzdCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkge1xuICBjb25zdCByZXF1ZXN0VHlwZSA9IENIQU5ORUw7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IGBjciMke2NoYW5uZWxOYW1lfSMke2NoYW5uZWxJZH1gO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVyxcbiAgICBkYXRhOiB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld0Fzc2V0UmVxdWVzdCAobmFtZSwgaWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGV4dGVuc2lvbikge1xuICBjb25zdCByZXF1ZXN0VHlwZSA9IGV4dGVuc2lvbiA/IEFTU0VUX0xJVEUgOiBBU1NFVF9ERVRBSUxTO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgYXIjJHtuYW1lfSMke2lkfSMke2NoYW5uZWxOYW1lfSMke2NoYW5uZWxJZH1gO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgICBuYW1lLFxuICAgICAgbW9kaWZpZXI6IHtcbiAgICAgICAgaWQsXG4gICAgICAgIGNoYW5uZWw6IHtcbiAgICAgICAgICBuYW1lOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICBpZCAgOiBjaGFubmVsSWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0VXBkYXRlIChyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICByZXF1ZXN0VHlwZSxcbiAgICAgIHJlcXVlc3RJZCxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IChpZCwgZXJyb3IsIGtleSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwga2V5IH0sXG4gIH07XG59O1xuXG4vLyBhc3NldCBhY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBc3NldFRvQXNzZXRMaXN0IChpZCwgZXJyb3IsIG5hbWUsIGNsYWltSWQsIHNob3J0SWQsIGNsYWltRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQVNTRVRfQURELFxuICAgIGRhdGE6IHsgaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEgfSxcbiAgfTtcbn1cblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCAoaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9BREQsXG4gICAgZGF0YTogeyBpZCwgbmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25VcGRhdGVDaGFubmVsQ2xhaW1zIChjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyxcbiAgICBkYXRhOiB7Y2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDaGFubmVsQ2xhaW1zIChjaGFubmVsTGlzdElkLCBjbGFpbXNEYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyxcbiAgICBkYXRhOiB7Y2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YX0sXG4gIH07XG59O1xuXG4vLyBkaXNwbGF5IGEgZmlsZVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZVJlcXVlc3RlZCAobmFtZSwgY2xhaW1JZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9SRVFVRVNURUQsXG4gICAgZGF0YTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRmlsZUF2YWlsYWJpbGl0eSAoc3RhdHVzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEUsXG4gICAgZGF0YTogc3RhdHVzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlBc3NldEVycm9yIChlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRElTUExBWV9BU1NFVF9FUlJPUixcbiAgICBkYXRhOiBlcnJvcixcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9zaG93LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHNpdGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxOYW1lICAgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIGNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGNoYW5uZWxMb25nSWQgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5sb25nSWQsXG4gICAgc2l0ZURlc2NyaXB0aW9uOiBzaXRlLmRlc2NyaXB0aW9uLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsTG9nb3V0OiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobnVsbCwgbnVsbCwgbnVsbCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIi8vIHJlcXVlc3QgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEhBTkRMRV9TSE9XX1VSSSA9ICdIQU5ETEVfU0hPV19VUkknO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfRVJST1IgPSAnUkVRVUVTVF9FUlJPUic7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9VUERBVEUgPSAnUkVRVUVTVF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX1JFUVVFU1RfTkVXID0gJ0FTU0VUX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1JFUVVFU1RfTkVXID0gJ0NIQU5ORUxfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfTElTVF9BREQgPSAnUkVRVUVTVF9MSVNUX0FERCc7XG5cbi8vIGFzc2V0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBBU1NFVF9BREQgPSBgQVNTRVRfQUREYDtcblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9BREQgPSAnQ0hBTk5FTF9BREQnO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MnO1xuXG4vLyBhc3NldC9maWxlIGRpc3BsYXkgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEZJTEVfUkVRVUVTVEVEID0gJ0ZJTEVfUkVRVUVTVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUgPSAnRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBESVNQTEFZX0FTU0VUX0VSUk9SID0gJ0RJU1BMQVlfQVNTRVRfRVJST1InO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsImltcG9ydCAnY3Jvc3MtZmV0Y2gvcG9seWZpbGwnO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgSlNPTiByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBwYXJzZUpTT04gKHJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBzdGF0dXMgcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdCB8IHVuZGVmaW5lZH0gUmV0dXJucyBvYmplY3Qgd2l0aCBzdGF0dXMgYW5kIHN0YXR1c1RleHQsIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjaGVja1N0YXR1cyAocmVzcG9uc2UsIGpzb25SZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xuICB9XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGpzb25SZXNwb25zZS5tZXNzYWdlKTtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgdGhyb3cgZXJyb3I7XG59XG5cbi8qKlxuICogUmVxdWVzdHMgYSBVUkwsIHJldHVybmluZyBhIHByb21pc2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybCAgICAgICBUaGUgVVJMIHdlIHdhbnQgdG8gcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgd2Ugd2FudCB0byBwYXNzIHRvIFwiZmV0Y2hcIlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgIFRoZSByZXNwb25zZSBkYXRhXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXNwb25zZSwgcGFyc2VKU09OKHJlc3BvbnNlKV0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFtyZXNwb25zZSwganNvblJlc3BvbnNlXSkgPT4ge1xuICAgICAgcmV0dXJuIGNoZWNrU3RhdHVzKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3JlcXVlc3QuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZSB9KSA9PiB7XG4gIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBkZXNjcmlwdGlvbjogc2l0ZURlc2NyaXB0aW9uLCBob3N0OiBzaXRlSG9zdCwgdGl0bGU6IHNpdGVUaXRsZSwgdHdpdHRlcjogc2l0ZVR3aXR0ZXIgfSA9IHNpdGU7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gICAgc2l0ZURlc2NyaXB0aW9uLFxuICAgIHNpdGVIb3N0LFxuICAgIHNpdGVUaXRsZSxcbiAgICBzaXRlVHdpdHRlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RBc3NldCA9IChzaG93KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7XG4gIHJldHVybiBzaG93LmFzc2V0TGlzdFthc3NldEtleV07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hvd1N0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaG93O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHNob3J0SWQsXG4gICAgICBsb25nSWQsXG4gICAgfSxcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9jaGFubmVsLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0RmlsZSAoZmlsZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9TRUxFQ1RFRCxcbiAgICBkYXRhOiBmaWxlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyRmlsZSAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0NMRUFSLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1ldGFkYXRhIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuTUVUQURBVEFfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNsYWltICh2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0xBSU1fVVBEQVRFLFxuICAgIGRhdGE6IHZhbHVlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFB1Ymxpc2hJbkNoYW5uZWwgKGNoYW5uZWwpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwsXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQdWJsaXNoU3RhdHVzIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBtZXNzYWdlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRXJyb3IgKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5FUlJPUl9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHZhbHVlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRDaGFubmVsIChjaGFubmVsTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuU0VMRUNURURfQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YTogY2hhbm5lbE5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTWV0YWRhdGFJbnB1dHMgKHNob3dNZXRhZGF0YUlucHV0cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUyxcbiAgICBkYXRhOiBzaG93TWV0YWRhdGFJbnB1dHMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdUaHVtYm5haWwgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRIVU1CTkFJTF9ORVcsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFB1Ymxpc2ggKGhpc3RvcnkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBUlQsXG4gICAgZGF0YTogeyBoaXN0b3J5IH0sXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInByb3AtdHlwZXNcIlxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcblxuY2xhc3MgRXJyb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxwPntlcnJvcn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuRXJyb3JQYWdlLnByb3BUeXBlcyA9IHtcbiAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9FcnJvclBhZ2UvaW5kZXguanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydFwiXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBNeXNxbENvbmZpZyAoKSB7XG4gIHRoaXMuZGF0YWJhc2UgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXNlcm5hbWUgPSAnZGVmYXVsdCc7XG4gIHRoaXMucGFzc3dvcmQgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIE15U1FMIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qge2RhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmR9ID0gY29uZmlnO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTXlzcWxDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsImZ1bmN0aW9uIFNsYWNrQ29uZmlnICgpIHtcbiAgdGhpcy5zbGFja1dlYkhvb2sgICAgICA9ICdkZWZhdWx0JztcbiAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9ICdkZWZhdWx0JztcbiAgdGhpcy5zbGFja0luZm9DaGFubmVsICA9ICdkZWZhdWx0JztcbiAgdGhpcy5jb25maWd1cmUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gc2xhY2sgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7c2xhY2tXZWJIb29rLCBzbGFja0Vycm9yQ2hhbm5lbCwgc2xhY2tJbmZvQ2hhbm5lbH0gPSBjb25maWc7XG4gICAgdGhpcy5zbGFja1dlYkhvb2sgPSBzbGFja1dlYkhvb2s7XG4gICAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9IHNsYWNrRXJyb3JDaGFubmVsO1xuICAgIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCA9IHNsYWNrSW5mb0NoYW5uZWw7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTbGFja0NvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NsYWNrQ29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblNob3J0SWQ6IGZ1bmN0aW9uIChjbGFpbXNBcnJheSwgbG9uZ0lkKSB7XG4gICAgbGV0IGNsYWltSW5kZXg7XG4gICAgbGV0IHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIDEpOyAvLyBkZWZhdWx0IHNob3J0IGlkIGlzIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICBsZXQgc2hvcnRJZExlbmd0aCA9IDA7XG4gICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhpcyBjbGFpbSBpZFxuICAgIGNsYWltSW5kZXggPSBjbGFpbXNBcnJheS5maW5kSW5kZXgoZWxlbWVudCA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFpbUlkID09PSBsb25nSWQ7XG4gICAgfSk7XG4gICAgaWYgKGNsYWltSW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsYWltIGlkIG5vdCBmb3VuZCBpbiBjbGFpbXMgbGlzdCcpO1xuICAgIH1cbiAgICAvLyBnZXQgYW4gYXJyYXkgb2YgYWxsIGNsYWltcyB3aXRoIGxvd2VyIGhlaWdodFxuICAgIGxldCBwb3NzaWJsZU1hdGNoZXMgPSBjbGFpbXNBcnJheS5zbGljZSgwLCBjbGFpbUluZGV4KTtcbiAgICAvLyByZW1vdmUgY2VydGlmaWNhdGVzIHdpdGggdGhlIHNhbWUgcHJlZml4ZXMgdW50aWwgbm9uZSBhcmUgbGVmdC5cbiAgICB3aGlsZSAocG9zc2libGVNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNob3J0SWRMZW5ndGggKz0gMTtcbiAgICAgIHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpO1xuICAgICAgcG9zc2libGVNYXRjaGVzID0gcG9zc2libGVNYXRjaGVzLmZpbHRlcihlbGVtZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50LmNsYWltSWQgJiYgKGVsZW1lbnQuY2xhaW1JZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCkgPT09IHNob3J0SWQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hvcnRJZDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCB7IGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSkge1xuICAgIC8vIHZhbGlkYXRlIG5hbWVcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbmFtZSBmaWVsZCBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWROYW1lQ2hhcmFjdGVycyA9IC9bXkEtWmEtejAtOSwtXS8uZXhlYyhuYW1lKTtcbiAgICBpZiAoaW52YWxpZE5hbWVDaGFyYWN0ZXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjbGFpbSBuYW1lIHlvdSBwcm92aWRlZCBpcyBub3QgYWxsb3dlZC4gIE9ubHkgdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzIGFyZSBhbGxvd2VkOiBBLVosIGEteiwgMC05LCBhbmQgXCItXCInKTtcbiAgICB9XG4gICAgLy8gb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgIG5zZncgPSAobnNmdyA9PT0gJ3RydWUnKTtcbiAgICBsaWNlbnNlID0gbGljZW5zZSB8fCBudWxsO1xuICAgIHRpdGxlID0gdGl0bGUgfHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uIHx8IG51bGw7XG4gICAgdGh1bWJuYWlsID0gdGh1bWJuYWlsIHx8IG51bGw7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIG5zZncsXG4gICAgICBsaWNlbnNlLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHRodW1ibmFpbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgKHtmaWxlLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gbWFrZSBzdXJlIGEgZmlsZSB3YXMgcHJvdmlkZWRcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB3aXRoIGtleSBvZiBbZmlsZV0gZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5zaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZSBuYW1lXG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGVcbiAgICBtb2R1bGUuZXhwb3J0cy52YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZShmaWxlKTtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlTmFtZSAgICAgICAgIDogZmlsZS5uYW1lLFxuICAgICAgZmlsZVBhdGggICAgICAgICA6IGZpbGUucGF0aCxcbiAgICAgIGZpbGVUeXBlICAgICAgICAgOiBmaWxlLnR5cGUsXG4gICAgICB0aHVtYm5haWxGaWxlTmFtZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5uYW1lIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlUGF0aDogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5wYXRoIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlVHlwZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC50eXBlIDogbnVsbCksXG4gICAgfTtcbiAgfSxcbiAgdmFsaWRhdGVGaWxlVHlwZUFuZFNpemUgKGZpbGUpIHtcbiAgICAvLyBjaGVjayBmaWxlIHR5cGUgYW5kIHNpemVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmpwZWcvLmpwZy8ucG5nIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5naWYgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCAuZ2lmcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAubXA0IHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IHVucmVjb2duaXplZCBmaWxlIHR5cGUnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgJyArIGZpbGUudHlwZSArICcgY29udGVudCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuICBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlO1xuICB9LFxuICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMgKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0cyBmb3IgdGl0bGVcbiAgICBpZiAodGl0bGUgPT09IG51bGwgfHwgdGl0bGUudHJpbSgpID09PSAnJykge1xuICAgICAgdGl0bGUgPSBuYW1lO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGRlc2NyaXB0aW9uXG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSBudWxsIHx8IGRlc2NyaXB0aW9uLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gJyc7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgbGljZW5zZVxuICAgIGlmIChsaWNlbnNlID09PSBudWxsIHx8IGxpY2Vuc2UudHJpbSgpID09PSAnJykge1xuICAgICAgbGljZW5zZSA9ICcgJzsgIC8vIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nXG4gICAgfVxuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICBjb25zdCBwdWJsaXNoUGFyYW1zID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGZpbGVfcGF0aDogZmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgIH07XG4gICAgLy8gYWRkIHRodW1ibmFpbCB0byBjaGFubmVsIGlmIHZpZGVvXG4gICAgaWYgKHRodW1ibmFpbCkge1xuICAgICAgcHVibGlzaFBhcmFtc1snbWV0YWRhdGEnXVsndGh1bWJuYWlsJ10gPSB0aHVtYm5haWw7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaXNoUGFyYW1zO1xuICB9LFxuICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zICh0aHVtYm5haWxGaWxlUGF0aCwgY2xhaW1OYW1lLCBsaWNlbnNlLCBuc2Z3KSB7XG4gICAgaWYgKCF0aHVtYm5haWxGaWxlUGF0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFRodW1ibmFpbCBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUgICAgIDogYCR7Y2xhaW1OYW1lfS10aHVtYmAsXG4gICAgICBmaWxlX3BhdGg6IHRodW1ibmFpbEZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIHRpdGxlICAgICAgOiBgJHtjbGFpbU5hbWV9IHRodW1ibmFpbGAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgYSB0aHVtYm5haWwgZm9yICR7Y2xhaW1OYW1lfWAsXG4gICAgICAgIGF1dGhvciAgICAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZSAgIDogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgICBjaGFubmVsX25hbWUgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWwsXG4gICAgICBjaGFubmVsX2lkICAgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWxJZCxcbiAgICB9O1xuICB9LFxuICBkZWxldGVUZW1wb3JhcnlGaWxlIChmaWxlUGF0aCkge1xuICAgIGZzLnVubGluayhmaWxlUGF0aCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBlcnJvciBkZWxldGluZyB0ZW1wb3JhcnkgZmlsZSAke2ZpbGVQYXRofWApO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZGVidWcoYHN1Y2Nlc3NmdWxseSBkZWxldGVkICR7ZmlsZVBhdGh9YCk7XG4gICAgfSk7XG4gIH0sXG4gIGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIChmaWxlSW5mbywgZ2V0UmVzdWx0KSB7XG4gICAgZmlsZUluZm8uZmlsZU5hbWUgPSBnZXRSZXN1bHQuZmlsZV9uYW1lO1xuICAgIGZpbGVJbmZvLmZpbGVQYXRoID0gZ2V0UmVzdWx0LmRvd25sb2FkX3BhdGg7XG4gICAgcmV0dXJuIGZpbGVJbmZvO1xuICB9LFxuICBjcmVhdGVGaWxlRGF0YSAoeyBuYW1lLCBjbGFpbUlkLCBvdXRwb2ludCwgaGVpZ2h0LCBhZGRyZXNzLCBuc2Z3LCBjb250ZW50VHlwZSB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBjbGFpbUlkLFxuICAgICAgb3V0cG9pbnQsXG4gICAgICBoZWlnaHQsXG4gICAgICBhZGRyZXNzLFxuICAgICAgZmlsZU5hbWU6ICcnLFxuICAgICAgZmlsZVBhdGg6ICcnLFxuICAgICAgZmlsZVR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgbnNmdyxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFuZGxlRXJyb3JSZXNwb25zZTogZnVuY3Rpb24gKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcykge1xuICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igb24gJHtvcmlnaW5hbFVybH1gLCBtb2R1bGUuZXhwb3J0cy51c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMoZXJyb3IpKTtcbiAgICBjb25zdCBbc3RhdHVzLCBtZXNzYWdlXSA9IG1vZHVsZS5leHBvcnRzLnJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyhlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKHN0YXR1cylcbiAgICAgIC5qc29uKG1vZHVsZS5leHBvcnRzLmNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkKHN0YXR1cywgbWVzc2FnZSkpO1xuICB9LFxuICByZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGxldCBzdGF0dXMsIG1lc3NhZ2U7XG4gICAgLy8gY2hlY2sgZm9yIGRhZW1vbiBiZWluZyB0dXJuZWQgb2ZmXG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICBzdGF0dXMgPSA1MDM7XG4gICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gcmVmdXNlZC4gIFRoZSBkYWVtb24gbWF5IG5vdCBiZSBydW5uaW5nLic7XG4gICAgICAvLyBmYWxsYmFjayBmb3IgZXZlcnl0aGluZyBlbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IDQwMDtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBbc3RhdHVzLCBtZXNzYWdlXTtcbiAgfSxcbiAgdXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID09PSAwKSB7XG4gICAgICBsZXQgbmV3RXJyb3JPYmplY3QgPSB7fTtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIG5ld0Vycm9yT2JqZWN0W2tleV0gPSBlcnJba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0Vycm9yT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9LFxuICBjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJjb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lLCBjbGFpbUlkKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2hhbm5lbChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2xhaW0obmFtZSwgY2xhaW1JZCk7XG4gICAgfVxuICB9LFxuICBnZXRDbGFpbUlkQnlDbGFpbSAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDbGFpbSgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNsYWltLmdldExvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNoYW5uZWwoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9LCAke2NsYWltTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBpZFxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbElkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxJZCwgZGIuQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbElkLCBjbGFpbU5hbWUpXSk7ICAvLyAyLiBnZXQgdGhlIGxvbmcgY2xhaW0gaWRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbElkLCBsb25nQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsRGF0YSAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIHNob3J0Q2hhbm5lbENsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICAgIHNob3J0Q2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zKGxvbmdDaGFubmVsQ2xhaW1JZCldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheV0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIGZvcm1hdCB0aGUgZGF0YSBmb3IgdGhlIHZpZXcsIGluY2x1ZGluZyBwYWdpbmF0aW9uXG4gICAgICAgICAgbGV0IHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSA9IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5LCBwYWdlKTtcbiAgICAgICAgICAvLyA0LiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uIGFuZCBjb250ZW50c1xuICAgICAgICAgIHJlc29sdmUocGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0TG9jYWxGaWxlUmVjb3JkIChjbGFpbUlkLCBuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkZpbGUuZmluZE9uZSh7d2hlcmU6IHtjbGFpbUlkLCBuYW1lfX0pXG4gICAgICAudGhlbihmaWxlID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIE5PX0ZJTEU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGUuZGF0YVZhbHVlcztcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnLi4vLi4vY2xpZW50L3JlZHVjZXJzL2luZGV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICcuLi8uLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4JztcbmltcG9ydCBBcHAgZnJvbSAnLi4vLi4vY2xpZW50L2FwcCc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZS5qcyc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoUmVkdWNlcik7XG5cbiAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgPEFwcCAvPlxuICAgICAgICA8L0dBTGlzdGVuZXI+XG4gICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xuXG4gIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gIGlmIChjb250ZXh0LnVybCkge1xuICAgIC8vIFNvbWV3aGVyZSBhIGA8UmVkaXJlY3Q+YCB3YXMgcmVuZGVyZWRcbiAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICB9IGVsc2Uge1xuICAgIC8vIHdlJ3JlIGdvb2QsIHNlbmQgdGhlIHJlc3BvbnNlXG4gIH1cblxuICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCJcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBQdWJsaXNoUmVkdWNlciBmcm9tICdyZWR1Y2Vycy9wdWJsaXNoJztcbmltcG9ydCBDaGFubmVsUmVkdWNlciBmcm9tICdyZWR1Y2Vycy9jaGFubmVsJztcbmltcG9ydCBTaG93UmVkdWNlciBmcm9tICdyZWR1Y2Vycy9zaG93JztcbmltcG9ydCBTaXRlUmVkdWNlciBmcm9tICdyZWR1Y2Vycy9zaXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgY2hhbm5lbDogQ2hhbm5lbFJlZHVjZXIsXG4gIHB1Ymxpc2g6IFB1Ymxpc2hSZWR1Y2VyLFxuICBzaG93ICAgOiBTaG93UmVkdWNlcixcbiAgc2l0ZSAgIDogU2l0ZVJlZHVjZXIsXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBGSUxFX1NFTEVDVEVEID0gJ0ZJTEVfU0VMRUNURUQnO1xuZXhwb3J0IGNvbnN0IEZJTEVfQ0xFQVIgPSAnRklMRV9DTEVBUic7XG5leHBvcnQgY29uc3QgTUVUQURBVEFfVVBEQVRFID0gJ01FVEFEQVRBX1VQREFURSc7XG5leHBvcnQgY29uc3QgQ0xBSU1fVVBEQVRFID0gJ0NMQUlNX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCA9ICdTRVRfUFVCTElTSF9JTl9DSEFOTkVMJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVRVU19VUERBVEUgPSAnUFVCTElTSF9TVEFUVVNfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBFUlJPUl9VUERBVEUgPSAnRVJST1JfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RFRF9DSEFOTkVMX1VQREFURSA9ICdTRUxFQ1RFRF9DSEFOTkVMX1VQREFURSc7XG5leHBvcnQgY29uc3QgVE9HR0xFX01FVEFEQVRBX0lOUFVUUyA9ICdUT0dHTEVfTUVUQURBVEFfSU5QVVRTJztcbmV4cG9ydCBjb25zdCBUSFVNQk5BSUxfTkVXID0gJ1RIVU1CTkFJTF9ORVcnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hfU1RBUlQgPSAnUFVCTElTSF9TVEFSVCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IENIQU5ORUxfVVBEQVRFID0gJ0NIQU5ORUxfVVBEQVRFJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9DQUxfQ0hFQ0sgPSAnTE9DQUxfQ0hFQ0snO1xuZXhwb3J0IGNvbnN0IFVOQVZBSUxBQkxFID0gJ1VOQVZBSUxBQkxFJztcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdFUlJPUic7XG5leHBvcnQgY29uc3QgQVZBSUxBQkxFID0gJ0FWQUlMQUJMRSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBHb29nbGVBbmFseXRpY3MgZnJvbSAncmVhY3QtZ2EnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuY29uc3QgeyBhbmFseXRpY3M6IHsgZ29vZ2xlSWQgfSB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuR29vZ2xlQW5hbHl0aWNzLmluaXRpYWxpemUoZ29vZ2xlSWQpO1xuXG5jbGFzcyBHQUxpc3RlbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2VuZFBhZ2VWaWV3KHRoaXMucHJvcHMuaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdGhpcy5wcm9wcy5oaXN0b3J5Lmxpc3Rlbih0aGlzLnNlbmRQYWdlVmlldyk7XG4gIH1cblxuICBzZW5kUGFnZVZpZXcgKGxvY2F0aW9uKSB7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnNldCh7IHBhZ2U6IGxvY2F0aW9uLnBhdGhuYW1lIH0pO1xuICAgIEdvb2dsZUFuYWx5dGljcy5wYWdldmlldyhsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoR0FMaXN0ZW5lcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBkeW5hbWljSW1wb3J0IH0gZnJvbSAndXRpbHMvZHluYW1pY0ltcG9ydCc7XG5pbXBvcnQgQWJvdXRQYWdlIGZyb20gJ3BhZ2VzL0Fib3V0UGFnZSc7XG5pbXBvcnQgTG9naW5QYWdlIGZyb20gJ3BhZ2VzL0xvZ2luUGFnZSc7XG5pbXBvcnQgU2hvd1BhZ2UgZnJvbSAncGFnZXMvU2hvd1BhZ2UnO1xuaW1wb3J0IEZvdXJPaEZvdXJQYWdlIGZyb20gJ2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UnO1xuY29uc3QgSG9tZVBhZ2UgPSBkeW5hbWljSW1wb3J0KCdwYWdlcy9Ib21lUGFnZScpOyAvLyBvciB1c2UgdGhlIHByb3ZpZGVkIGxvY2FsIGhvbWVwYWdlXG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3dpdGNoPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17SG9tZVBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2Fib3V0JyBjb21wb25lbnQ9e0Fib3V0UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvbG9naW4nIGNvbXBvbmVudD17TG9naW5QYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy86aWRlbnRpZmllci86Y2xhaW0nIGNvbXBvbmVudD17U2hvd1BhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBjb21wb25lbnQ9e0ZvdXJPaEZvdXJQYWdlfSAvPlxuICAgIDwvU3dpdGNoPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwcC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhcic7XG5pbXBvcnQgSW5hY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhcic7XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiYXJzICAgICAgIDogW10sXG4gICAgICBpbmRleCAgICAgIDogMCxcbiAgICAgIGluY3JlbWVudGVyOiAxLFxuICAgIH07XG4gICAgdGhpcy5jcmVhdGVCYXJzID0gdGhpcy5jcmVhdGVCYXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyID0gdGhpcy5zdGFydFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhciA9IHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhciA9IHRoaXMuc3RvcFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuY3JlYXRlQmFycygpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNyZWF0ZUJhcnMgKCkge1xuICAgIGNvbnN0IGJhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnByb3BzLnNpemU7IGkrKykge1xuICAgICAgYmFycy5wdXNoKHtpc0FjdGl2ZTogZmFsc2V9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGJhcnMgfSk7XG4gIH1cbiAgc3RhcnRQcm9ncmVzc0JhciAoKSB7XG4gICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKSwgMzAwKTtcbiAgfTtcbiAgdXBkYXRlUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuaW5kZXg7XG4gICAgbGV0IGluY3JlbWVudGVyID0gdGhpcy5zdGF0ZS5pbmNyZW1lbnRlcjtcbiAgICBsZXQgYmFycyA9IHRoaXMuc3RhdGUuYmFycztcbiAgICAvLyBmbGlwIGluY3JlbWVudGVyIGlmIG5lY2Vzc2FyeSwgdG8gc3RheSBpbiBib3VuZHNcbiAgICBpZiAoKGluZGV4IDwgMCkgfHwgKGluZGV4ID4gdGhpcy5wcm9wcy5zaXplKSkge1xuICAgICAgaW5jcmVtZW50ZXIgPSBpbmNyZW1lbnRlciAqIC0xO1xuICAgICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB0aGUgaW5kZXhlZCBiYXJcbiAgICBpZiAoaW5jcmVtZW50ZXIgPiAwKSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgICAvLyBpbmNyZW1lbnQgaW5kZXhcbiAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGJhcnMsXG4gICAgICBpbmNyZW1lbnRlcixcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuICBzdG9wUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gIH07XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnN0YXRlLmJhcnMubWFwKChiYXIsIGluZGV4KSA9PiBiYXIuaXNBY3RpdmUgPyA8QWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9IC8+IDogPEluYWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9Lz4pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuUHJvZ3Jlc3NCYXIucHJvcFR5cGVzID0ge1xuICBzaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzeCIsImV4cG9ydCBjb25zdCBDSEFOTkVMID0gJ0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0xJVEUgPSAnQVNTRVRfTElURSc7XG5leHBvcnQgY29uc3QgQVNTRVRfREVUQUlMUyA9ICdBU1NFVF9ERVRBSUxTJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBmaWxlUmVxdWVzdGVkIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGVycm9yIGFuZCBzdGF0dXNcbiAgY29uc3QgZXJyb3IgID0gc2hvdy5kaXNwbGF5QXNzZXQuZXJyb3I7XG4gIGNvbnN0IHN0YXR1cyA9IHNob3cuZGlzcGxheUFzc2V0LnN0YXR1cztcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBlcnJvcixcbiAgICBzdGF0dXMsXG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25GaWxlUmVxdWVzdDogKG5hbWUsIGNsYWltSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKGZpbGVSZXF1ZXN0ZWQobmFtZSwgY2xhaW1JZCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpID0+IHtcbiAgLy8gdGFrZSB0aGUgaHRtbCBhbmQgcHJlbG9hZGVkU3RhdGUgYW5kIHJldHVybiB0aGUgZnVsbCBwYWdlXG4gIHJldHVybiBgXG4gICAgPCFET0NUWVBFIGh0bWw+XG4gICAgPGh0bWwgbGFuZz1cImVuXCIgcHJlZml4PVwib2c6IGh0dHA6Ly9vZ3AubWUvbnMjIGZiOiBodHRwOi8vb2dwLm1lL25zL2ZiI1wiPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MSwgdXNlci1zY2FsYWJsZT1ub1wiPlxuICAgICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJpZT1lZGdlXCI+XG4gICAgICAgICAgICA8IS0taGVsbWV0LS0+XG4gICAgICAgICAgICAke2hlbG1ldC50aXRsZS50b1N0cmluZygpfVxuICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgJHtoZWxtZXQubGluay50b1N0cmluZygpfVxuICAgICAgICAgICAgPCEtLXN0eWxlIHNoZWV0cy0tPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9yZXNldC5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvZ2VuZXJhbC5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvbWVkaWFRdWVyaWVzLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPCEtLWdvb2dsZSBmb250LS0+XG4gICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzozMDBcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgICAgIDwvaGVhZD5cbiAgICAgICAgPGJvZHkgaWQ9XCJtYWluLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicmVhY3QtYXBwXCIgY2xhc3M9XCJyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW5cIj4ke2h0bWx9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzY3JpcHQ+XG4gICAgICAgICAgICAgICAgd2luZG93Ll9fUFJFTE9BREVEX1NUQVRFX18gPSAke0pTT04uc3RyaW5naWZ5KHByZWxvYWRlZFN0YXRlKS5yZXBsYWNlKC88L2csICdcXFxcXFx1MDAzYycpfVxuICAgICAgICAgICAgPC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cIi9idW5kbGUvYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gIGA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvcmVuZGVyRnVsbFBhZ2UuanMiLCJleHBvcnQgY29uc3Qgc2VsZWN0U2l0ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFNpdGVIb3N0ID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlLmhvc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NlbGVjdG9ycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcbmNvbnN0IHsgc2VyaWFsaXplU3BlZWNoVXNlciwgZGVzZXJpYWxpemVTcGVlY2hVc2VyIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMnKTtcbmNvbnN0IGNvb2tpZVNlc3Npb24gPSByZXF1aXJlKCdjb29raWUtc2Vzc2lvbicpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbi8vIGxvZ2dpbmcgZGVwZW5kZW5jaWVzXG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIFNwZWVjaFNlcnZlciAoKSB7XG4gIHRoaXMuY29uZmlndXJlTXlzcWwgPSAobXlzcWxDb25maWcpID0+IHtcbiAgICByZXF1aXJlKCcuLi9jb25maWcvbXlzcWxDb25maWcuanMnKS5jb25maWd1cmUobXlzcWxDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNpdGUgPSAoc2l0ZUNvbmZpZykgPT4ge1xuICAgIHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJykuY29uZmlndXJlKHNpdGVDb25maWcpO1xuICAgIGNvbnNvbGUubG9nKHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJykpO1xuICAgIHRoaXMuc2Vzc2lvbktleSA9IHNpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5O1xuICAgIHRoaXMuUE9SVCA9IHNpdGVDb25maWcuZGV0YWlscy5wb3J0O1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNsYWNrID0gKHNsYWNrQ29uZmlnKSA9PiB7XG4gICAgcmVxdWlyZSgnLi4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJykuY29uZmlndXJlKHNsYWNrQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jcmVhdGVBcHAgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGFuIEV4cHJlc3MgYXBwbGljYXRpb25cbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbiAgICAvLyB0cnVzdCB0aGUgcHJveHkgdG8gZ2V0IGlwIGFkZHJlc3MgZm9yIHVzXG4gICAgYXBwLmVuYWJsZSgndHJ1c3QgcHJveHknKTtcblxuICAgIC8vIGFkZCBtaWRkbGV3YXJlXG4gICAgYXBwLnVzZShoZWxtZXQoKSk7IC8vIHNldCBIVFRQIGhlYWRlcnMgdG8gcHJvdGVjdCBhZ2FpbnN0IHdlbGwta25vd24gd2ViIHZ1bG5lcmFiaWx0aWVzXG4gICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhgJHtfX2Rpcm5hbWV9L3B1YmxpY2ApKTsgLy8gJ2V4cHJlc3Muc3RhdGljJyB0byBzZXJ2ZSBzdGF0aWMgZmlsZXMgZnJvbSBwdWJsaWMgZGlyZWN0b3J5XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7IC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24vanNvblxuICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpOyAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7ICAvLyBjdXN0b20gbG9nZ2luZyBtaWRkbGV3YXJlIHRvIGxvZyBhbGwgaW5jb21pbmcgaHR0cCByZXF1ZXN0c1xuICAgICAgbG9nZ2VyLnZlcmJvc2UoYFJlcXVlc3Qgb24gJHtyZXEub3JpZ2luYWxVcmx9IGZyb20gJHtyZXEuaXB9YCk7XG4gICAgICBuZXh0KCk7XG4gICAgfSk7XG5cbiAgICAvLyBjb25maWd1cmUgcGFzc3BvcnRcbiAgICBwYXNzcG9ydC5zZXJpYWxpemVVc2VyKHNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xuICAgIHBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihkZXNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xuICAgIGNvbnN0IGxvY2FsU2lnbnVwU3RyYXRlZ3kgPSByZXF1aXJlKCcuL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcycpO1xuICAgIGNvbnN0IGxvY2FsTG9naW5TdHJhdGVneSA9IHJlcXVpcmUoJy4vcGFzc3BvcnQvbG9jYWwtbG9naW4uanMnKTtcbiAgICBwYXNzcG9ydC51c2UoJ2xvY2FsLXNpZ251cCcsIGxvY2FsU2lnbnVwU3RyYXRlZ3kpO1xuICAgIHBhc3Nwb3J0LnVzZSgnbG9jYWwtbG9naW4nLCBsb2NhbExvZ2luU3RyYXRlZ3kpO1xuICAgIC8vIGluaXRpYWxpemUgcGFzc3BvcnRcbiAgICBhcHAudXNlKGNvb2tpZVNlc3Npb24oe1xuICAgICAgbmFtZSAgOiAnc2Vzc2lvbicsXG4gICAgICBrZXlzICA6IFt0aGlzLnNlc3Npb25LZXldLFxuICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBpLmUuIDI0IGhvdXJzXG4gICAgfSkpO1xuICAgIGFwcC51c2UocGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbiAgICBhcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgICAvLyBjb25maWd1cmUgaGFuZGxlYmFycyAmIHJlZ2lzdGVyIGl0IHdpdGggZXhwcmVzcyBhcHBcbiAgICBjb25zdCBoYnMgPSBleHByZXNzSGFuZGxlYmFycy5jcmVhdGUoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2VtYmVkJyxcbiAgICAgIGhhbmRsZWJhcnMgICA6IEhhbmRsZWJhcnMsXG4gICAgfSk7XG4gICAgYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGhicy5lbmdpbmUpO1xuICAgIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuICAgIC8vIHNldCB0aGUgcm91dGVzIG9uIHRoZSBhcHBcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hdXRoLXJvdXRlcy5qcycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXBpLXJvdXRlcy5qcycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvcGFnZS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2Fzc2V0LXJvdXRlcy5qcycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvZmFsbGJhY2stcm91dGVzLmpzJykoYXBwKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9O1xuICB0aGlzLmluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgcmVxdWlyZSgnLi9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcycpKGxvZ2dlcik7XG4gICAgcmVxdWlyZSgnLi9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzJykobG9nZ2VyKTtcbiAgICB0aGlzLmNyZWF0ZUFwcCgpO1xuICAgIHRoaXMuc2VydmVyID0gaHR0cC5TZXJ2ZXIodGhpcy5hcHApO1xuICB9O1xuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRiID0gcmVxdWlyZSgnLi9tb2RlbHMvaW5kZXgnKTtcbiAgICAvLyBzeW5jIHNlcXVlbGl6ZVxuICAgIGRiLnNlcXVlbGl6ZS5zeW5jKClcbiAgICAgIC8vIHN0YXJ0IHRoZSBzZXJ2ZXJcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKHRoaXMuUE9SVCwgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uIFBPUlQgJHt0aGlzLlBPUlR9YCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBTdGFydHVwIEVycm9yOmAsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcGVlY2hTZXJ2ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc2VydmVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzLWhhbmRsZWJhcnNcIlxuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGFuZGxlYmFyc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhhbmRsZWJhcnNcIlxuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlcmlhbGl6ZVNwZWVjaFVzZXIgKHVzZXIsIGRvbmUpIHsgIC8vIHJldHVybnMgdXNlciBkYXRhIHRvIGJlIHNlcmlhbGl6ZWQgaW50byBzZXNzaW9uXG4gICAgbG9nZ2VyLmRlYnVnKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGxvZ2dlci5kZWJ1ZygnZGVzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1zZXNzaW9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXNlc3Npb25cIlxuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImh0dHBcIlxuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBuZXcgY2hhbm5lbCBzaWdudXAgcmVxdWVzdC4gdXNlcjogJHt1c2VybmFtZX0gcGFzczogJHtwYXNzd29yZH0gLmApO1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIC8vIHNlcnZlci1zaWRlIHZhbGlkYXRvbiBvZiBpbnB1dHMgKHVzZXJuYW1lLCBwYXNzd29yZClcblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhbm5lbCBhbmQgcmV0cmlldmUgdGhlIG1ldGFkYXRhXG4gICAgcmV0dXJuIGxicnlBcGkuY3JlYXRlQ2hhbm5lbChgQCR7dXNlcm5hbWV9YClcbiAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgIHVzZXJOYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyRGF0YSA+JywgdXNlckRhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgY2hhbm5lbERhdGEgPSB7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIGNoYW5uZWxDbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NoYW5uZWxEYXRhID4nLCBjaGFubmVsRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSBjZXJ0aWZpY2F0ZSByZWNvcmRcbiAgICAgICAgY29uc3QgY2VydGlmaWNhdGVEYXRhID0ge1xuICAgICAgICAgIGNsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICAgIG5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIC8vIGFkZHJlc3MsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjZXJ0aWZpY2F0ZURhdGEgPicsIGNlcnRpZmljYXRlRGF0YSk7XG4gICAgICAgIC8vIHNhdmUgdXNlciBhbmQgY2VydGlmaWNhdGUgdG8gZGJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi5Vc2VyLmNyZWF0ZSh1c2VyRGF0YSksIGRiLkNoYW5uZWwuY3JlYXRlKGNoYW5uZWxEYXRhKSwgZGIuQ2VydGlmaWNhdGUuY3JlYXRlKGNlcnRpZmljYXRlRGF0YSldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoW25ld1VzZXIsIG5ld0NoYW5uZWwsIG5ld0NlcnRpZmljYXRlXSkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgLy8gc3RvcmUgdGhlIHJlbGV2YW50IG5ld1VzZXIgaW5mbyB0byBiZSBwYXNzZWQgYmFjayBmb3IgcmVxLlVzZXJcbiAgICAgICAgdXNlckluZm9bJ2lkJ10gPSBuZXdVc2VyLmlkO1xuICAgICAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IG5ld1VzZXIudXNlck5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gbmV3Q2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAvLyBhc3NvY2lhdGUgdGhlIGluc3RhbmNlc1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld0NlcnRpZmljYXRlLnNldENoYW5uZWwobmV3Q2hhbm5lbCksIG5ld0NoYW5uZWwuc2V0VXNlcihuZXdVc2VyKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHVzZXJJbmZvLmNoYW5uZWxDbGFpbUlkLCB1c2VySW5mby5jaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdzaWdudXAgZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgQ2hhbm5lbCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NoYW5uZWwnLFxuICAgIHtcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2hhbm5lbC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2hhbm5lbC5iZWxvbmdzVG8oZGIuVXNlcik7XG4gICAgQ2hhbm5lbC5oYXNPbmUoZGIuQ2VydGlmaWNhdGUpO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVsO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGFzc2V0RGVmYXVsdHM6IHsgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsIH0sIGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIChjb250ZW50VHlwZSkge1xuICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIHJldHVybiAnanBlZyc7XG4gICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgIHJldHVybiAncG5nJztcbiAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgcmV0dXJuICdnaWYnO1xuICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICByZXR1cm4gJ21wNCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5kZWJ1Zygnc2V0dGluZyB1bmtub3duIGZpbGUgdHlwZSBhcyBmaWxlIGV4dGVuc2lvbiBqcGVnJyk7XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUaHVtYm5haWwgKHN0b3JlZFRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCkge1xuICBpZiAoc3RvcmVkVGh1bWJuYWlsID09PSAnJykge1xuICAgIHJldHVybiBkZWZhdWx0VGh1bWJuYWlsO1xuICB9XG4gIHJldHVybiBzdG9yZWRUaHVtYm5haWw7XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhaW1EYXRhIChjbGFpbSkge1xuICAvLyBsb2dnZXIuZGVidWcoJ3ByZXBhcmluZyBjbGFpbSBkYXRhIGJhc2VkIG9uIHJlc29sdmVkIGRhdGE6JywgY2xhaW0pO1xuICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICBjbGFpbVsnaG9zdCddID0gaG9zdDtcbiAgcmV0dXJuIGNsYWltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENsYWltID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2xhaW0nLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlVXJsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbWV0YWRhdGFWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjb250ZW50VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzdHJlYW1WZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENsYWltLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDbGFpbS5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCBmb3IgJHtjbGFpbU5hbWV9IyR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0ocykgZm91bmQgd2l0aCB0aGF0IGNsYWltIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGNsYWltSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyBmb3IgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgICByYXcgIDogdHJ1ZSwgIC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb25seSBkYXRhLCBub3QgYW4gYXJyYXkgb2YgaW5zdGFuY2VzXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWxDbGFpbXNBcnJheSA9PiB7XG4gICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdjaGFubmVsY2xhaW1zYXJyYXkgbGVuZ3RoOicsIGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGNoYW5uZWxDbGFpbXNBcnJheS5mb3JFYWNoKGNsYWltID0+IHtcbiAgICAgICAgICAgICAgICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoY2hhbm5lbENsYWltc0FycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBmaW5kaW5nIGNsYWltIGlkIGZvciBjbGFpbSAke2NsYWltTmFtZX0gZnJvbSBjaGFubmVsICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSwgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaWQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGAke3Jlc3VsdC5sZW5ndGh9IHJlY29yZHMgZm91bmQgZm9yIFwiJHtjbGFpbU5hbWV9XCIgaW4gY2hhbm5lbCBcIiR7Y2hhbm5lbENsYWltSWR9XCJgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgc2hvcnRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke3Nob3J0SWR9JWAsXG4gICAgICAgICAgICB9fSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sICAvLyBub3RlOiBtYXliZSBoZWlnaHQgYW5kIGVmZmVjdGl2ZSBhbW91bnQgbmVlZCB0byBzd2l0Y2g/XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdsZW5ndGggb2YgcmVzdWx0JywgcmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmRhdGFWYWx1ZXMuY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLnZhbGlkYXRlTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NsYWltSWQoJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIGlmIChjbGFpbUlkICYmIChjbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNsYWltSWQgJiYgY2xhaW1JZC5sZW5ndGggPCA0MCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7ICAvLyBpZiBhIHNob3J0IGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUoY2xhaW1OYW1lKTsgIC8vIGlmIG5vIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIENsYWltLnJlc29sdmVDbGFpbSA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5yZXNvbHZlQ2xhaW06ICR7bmFtZX0gJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsYWltQXJyYXkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY2xhaW1BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYG1vcmUgdGhhbiBvbmUgcmVjb3JkIG1hdGNoZXMgJHtuYW1lfSMke2NsYWltSWR9IGluIGRiLkNsYWltYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDbGFpbTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBURVhUIH0pID0+IHtcbiAgY29uc3QgUmVxdWVzdCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1JlcXVlc3QnLFxuICAgIHtcbiAgICAgIGFjdGlvbjoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB1cmw6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaXBBZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIHR5cGUgICAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFJlcXVlc3QuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFJlcXVlc3QuYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUmVxdWVzdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IFVzZXIgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdVc2VyJyxcbiAgICB7XG4gICAgICB1c2VyTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFVzZXIuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFVzZXIuaGFzT25lKGRiLkNoYW5uZWwpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNvbXBhcmVQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAobmV3UGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaChuZXdQYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBjdXJyZW50IHBhc3N3b3JkIHdpdGggdGhlIG5ldyBoYXNoXG4gICAgICAgICAgdGhpc1xuICAgICAgICAgICAgLnVwZGF0ZSh7cGFzc3dvcmQ6IGhhc2h9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIHByZS1zYXZlIGhvb2sgbWV0aG9kIHRvIGhhc2ggdGhlIHVzZXIncyBwYXNzd29yZCBiZWZvcmUgdGhlIHVzZXIncyBpbmZvIGlzIHNhdmVkIHRvIHRoZSBkYi5cbiAgVXNlci5ob29rKCdiZWZvcmVDcmVhdGUnLCAodXNlciwgb3B0aW9ucykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnVXNlci5iZWZvcmVDcmVhdGUgaG9vay4uLicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgcGFzc3dvcmQgc3RyaW5nIHdpdGggdGhlIGhhc2ggcGFzc3dvcmQgdmFsdWVcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaDtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBVc2VyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gcm91dGUgZm9yIHNpZ24gdXBcbiAgYXBwLnBvc3QoJy9zaWdudXAnLCBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLXNpZ251cCcpLCAocmVxLCByZXMpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgc3VjY2Vzc2Z1bCBzaWdudXAgZm9yICR7cmVxLnVzZXIuY2hhbm5lbE5hbWV9YCk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgc3VjY2VzcyAgICAgICA6IHRydWUsXG4gICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICBzaG9ydENoYW5uZWxJZDogcmVxLnVzZXIuc2hvcnRDaGFubmVsSWQsXG4gICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSBmb3IgbG9nIGluXG4gIGFwcC5wb3N0KCcvbG9naW4nLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLWxvZ2luJywgKGVyciwgdXNlciwgaW5mbykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgfVxuICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1Zygnc3VjY2Vzc2Z1bCBsb2dpbicpO1xuICAgICAgcmVxLmxvZ0luKHVzZXIsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KShyZXEsIHJlcywgbmV4dCk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBsb2cgb3V0XG4gIGFwcC5nZXQoJy9sb2dvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICByZXEubG9nb3V0KCk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICd5b3Ugc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnfSk7XG4gIH0pO1xuICAvLyBzZWUgaWYgdXNlciBpcyBhdXRoZW50aWNhdGVkLCBhbmQgcmV0dXJuIGNyZWRlbnRpYWxzIGlmIHNvXG4gIGFwcC5nZXQoJy91c2VyJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaWYgKHJlcS51c2VyKSB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLnVzZXJ9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAndXNlciBpcyBub3QgbG9nZ2VkIGluJ30pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoLXJvdXRlcy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IG11bHRpcGFydCA9IHJlcXVpcmUoJ2Nvbm5lY3QtbXVsdGlwYXJ0eScpO1xuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHVwbG9hZERpcmVjdG9yeSB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSBtdWx0aXBhcnQoe3VwbG9hZERpcjogdXBsb2FkRGlyZWN0b3J5fSk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuY29uc3QgeyBjbGFpbU5hbWVJc0F2YWlsYWJsZSwgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5LCBwdWJsaXNoIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBnZXRDbGFpbUxpc3QsIHJlc29sdmVVcmksIGdldENsYWltIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEsIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcywgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcywgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHksIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcywgY3JlYXRlRmlsZURhdGEgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IGVycm9ySGFuZGxlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGF1dGhlbnRpY2F0ZVVzZXIgfSA9IHJlcXVpcmUoJy4uL2F1dGgvYXV0aGVudGljYXRpb24uanMnKTtcbmNvbnN0IHsgZ2V0Q2hhbm5lbERhdGEsIGdldENoYW5uZWxDbGFpbXMsIGdldENsYWltSWQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGF2YWlsYWJsZU5hbWUpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gZ2V0IGEgc2hvcnQgY2hhbm5lbCBpZCBmcm9tIGxvbmcgY2hhbm5lbCBJZFxuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oc2hvcnRJZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9kYXRhLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgICBnZXRDaGFubmVsRGF0YShjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIDApXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2NsYWltcy86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkLzpwYWdlJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gICAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlO1xuICAgIGdldENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHJ1biBhIGNsYWltX2xpc3QgcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vbGlzdC86bmFtZScsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGdldENsYWltTGlzdChwYXJhbXMubmFtZSlcbiAgICAgIC50aGVuKGNsYWltc0xpc3QgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjbGFpbXNMaXN0KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gZ2V0IGFuIGFzc2V0XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vZ2V0LzpuYW1lLzpjbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICAvLyByZXNvbHZlIHRoZSBjbGFpbVxuICAgIGRiLkNsYWltLnJlc29sdmVDbGFpbShuYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4ocmVzb2x2ZVJlc3VsdCA9PiB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBhIGNsYWltIGFjdHVhbGx5IGV4aXN0cyBhdCB0aGF0IHVyaVxuICAgICAgICBpZiAoIXJlc29sdmVSZXN1bHQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHVyaSBmb3VuZCBpbiBDbGFpbSB0YWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmaWxlRGF0YSA9IGNyZWF0ZUZpbGVEYXRhKHJlc29sdmVSZXN1bHQpO1xuICAgICAgICAvLyBnZXQgdGhlIGNsYWltXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZURhdGEsIGdldENsYWltKGAke25hbWV9IyR7Y2xhaW1JZH1gKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbIGZpbGVEYXRhLCBnZXRSZXN1bHQgXSkgPT4ge1xuICAgICAgICBmaWxlRGF0YSA9IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhKGZpbGVEYXRhLCBnZXRSZXN1bHQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlRGF0YSwge25hbWUsIGNsYWltSWR9LCAnRmlsZScpLCBnZXRSZXN1bHRdKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoWyBmaWxlUmVjb3JkLCB7bWVzc2FnZSwgY29tcGxldGVkfSBdKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZSwgY29tcGxldGVkIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHRoaXMgc2l0ZSBwdWJsaXNoZWQgdG8gYSBjbGFpbVxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2F2YWlsYWJpbGl0eS86bmFtZScsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdCk7XG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBydW4gYSByZXNvbHZlIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Jlc29sdmUvOm5hbWUvOmNsYWltSWQnLCAoeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICByZXNvbHZlVXJpKGAke3BhcmFtcy5uYW1lfSMke3BhcmFtcy5jbGFpbUlkfWApXG4gICAgICAudGhlbihyZXNvbHZlZFVyaSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc29sdmVkVXJpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gcnVuIGEgcHVibGlzaCByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vcHVibGlzaCcsIG11bHRpcGFydE1pZGRsZXdhcmUsICh7IGJvZHksIGZpbGVzLCBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHVzZXIgfSwgcmVzKSA9PiB7XG4gICAgLy8gZGVmaW5lIHZhcmlhYmxlc1xuICAgIGxldCAgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCBkZXNjcmlwdGlvbiwgZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIGxpY2Vuc2UsIG5hbWUsIG5zZncsIHRodW1ibmFpbCwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZSwgdGl0bGU7XG4gICAgLy8gcmVjb3JkIHRoZSBzdGFydCB0aW1lIG9mIHRoZSByZXF1ZXN0XG4gICAgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIC8vIHZhbGlkYXRlIHRoZSBib2R5IGFuZCBmaWxlcyBvZiB0aGUgcmVxdWVzdFxuICAgIHRyeSB7XG4gICAgICAvLyB2YWxpZGF0ZUFwaVB1Ymxpc2hSZXF1ZXN0KGJvZHksIGZpbGVzKTtcbiAgICAgICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkoYm9keSkpO1xuICAgICAgKHtmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyhmaWxlcykpO1xuICAgICAgKHtjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmR9ID0gYm9keSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgLy8gY2hlY2sgY2hhbm5lbCBhdXRob3JpemF0aW9uXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgYXV0aGVudGljYXRlVXNlcihjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpLFxuICAgICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSksXG4gICAgICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSxcbiAgICAgIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXModGh1bWJuYWlsRmlsZVBhdGgsIG5hbWUsIGxpY2Vuc2UsIG5zZncpLFxuICAgIF0pXG4gICAgICAudGhlbigoW3tjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9LCB2YWxpZGF0ZWRDbGFpbU5hbWUsIHB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbFB1Ymxpc2hQYXJhbXNdKSA9PiB7XG4gICAgICAgIC8vIGFkZCBjaGFubmVsIGRldGFpbHMgdG8gdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfbmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9pZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHVibGlzaCB0aGUgdGh1bWJuYWlsXG4gICAgICAgIGlmICh0aHVtYm5haWxQdWJsaXNoUGFyYW1zKSB7XG4gICAgICAgICAgcHVibGlzaCh0aHVtYm5haWxQdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIGFzc2V0XG4gICAgICAgIHJldHVybiBwdWJsaXNoKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgbWVzc2FnZTogJ3B1Ymxpc2ggY29tcGxldGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgICAgZGF0YSAgIDoge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHJlc3VsdC5jbGFpbV9pZCxcbiAgICAgICAgICAgIHVybCAgICA6IGAke2hvc3R9LyR7cmVzdWx0LmNsYWltX2lkfS8ke25hbWV9YCxcbiAgICAgICAgICAgIGxicnlUeCA6IHJlc3VsdCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gcmVjb3JkIHRoZSBwdWJsaXNoIGVuZCB0aW1lIGFuZCBzZW5kIHRvIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAncHVibGlzaCcsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhIHNob3J0IGNsYWltIGlkIGZyb20gbG9uZyBjbGFpbSBJZFxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBkYi5DbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHNob3J0SWR9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vbG9uZy1pZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnYm9keTonLCBib2R5KTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGJvZHkuY2hhbm5lbE5hbWU7XG4gICAgY29uc3QgY2hhbm5lbENsYWltSWQgPSBib2R5LmNoYW5uZWxDbGFpbUlkO1xuICAgIGNvbnN0IGNsYWltTmFtZSA9IGJvZHkuY2xhaW1OYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBib2R5LmNsYWltSWQ7XG4gICAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0ID09PSBOT19DTEFJTSkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0fSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vZGF0YS86Y2xhaW1OYW1lLzpjbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY2xhaW1OYW1lID0gcGFyYW1zLmNsYWltTmFtZTtcbiAgICBsZXQgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAgIGlmIChjbGFpbUlkID09PSAnbm9uZScpIGNsYWltSWQgPSBudWxsO1xuICAgIGRiLkNsYWltLnJlc29sdmVDbGFpbShjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihjbGFpbUluZm8gPT4ge1xuICAgICAgICBpZiAoIWNsYWltSW5mbykge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBjbGFpbSBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogY2xhaW1JbmZvfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHNlZSBpZiBhc3NldCBpcyBhdmFpbGFibGUgbG9jYWxseVxuICBhcHAuZ2V0KCcvYXBpL2ZpbGUvYXZhaWxhYmlsaXR5LzpuYW1lLzpjbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7bmFtZSwgY2xhaW1JZH19KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBmYWxzZX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpLXJvdXRlcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbXVsdGlwYXJ0eVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe3doZXJlOiB7Y2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhlbnRpY2F0ZVVzZXIgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlcikge1xuICAgIC8vIGNhc2U6IG5vIGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIChhbm9ueW1vdXMpLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXNlciB0b2tlbiBpcyBwcm92aWRlZFxuICAgIGlmICghY2hhbm5lbE5hbWUgJiYgIWNoYW5uZWxJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IG51bGwsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCB1c2VyIHRva2VuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsTmFtZSAhPT0gdXNlci5jaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIG5hbWUgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWxJZCAmJiBjaGFubmVsSWQgIT09IHVzZXIuY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBpZCBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogdXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHBhc3N3b3JkIGluc3RlYWQgb2YgdXNlciB0b2tlblxuICAgIGlmICghY2hhbm5lbFBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ25vIGNoYW5uZWwgcGFzc3dvcmQgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCk7XG4gIH0sXG4gIGF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgdXNlclBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGhvaXN0ZWQgdmFyaWFibGVzXG4gICAgICBsZXQgY2hhbm5lbERhdGE7XG4gICAgICAvLyBidWlsZCB0aGUgcGFyYW1zIGZvciBmaW5kaW5nIHRoZSBjaGFubmVsXG4gICAgICBsZXQgY2hhbm5lbEZpbmRQYXJhbXMgPSB7fTtcbiAgICAgIGlmIChjaGFubmVsTmFtZSkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgIGlmIChjaGFubmVsSWQpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbElkO1xuICAgICAgLy8gZmluZCB0aGUgY2hhbm5lbFxuICAgICAgZGIuQ2hhbm5lbFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IGNoYW5uZWxGaW5kUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gY2hhbm5lbCBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5uZWxEYXRhID0gY2hhbm5lbC5nZXQoKTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgZGF0YTonLCBjaGFubmVsRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRiLlVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyB1c2VyTmFtZTogY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDEpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHVzZXJQYXNzd29yZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoJy4uLnBhc3N3b3JkIHdhcyBhIG1hdGNoLi4uJyk7XG4gICAgICAgICAgcmVzb2x2ZShjaGFubmVsRGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJjb25zdCBDTEFJTVNfUEVSX1BBR0UgPSAxMjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNsYWltcywgcGFnZSkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbFBhZ2VzKGNsYWltcyk7XG4gICAgY29uc3QgcGFnaW5hdGlvblBhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRQYWdlRnJvbVF1ZXJ5KHBhZ2UpO1xuICAgIGNvbnN0IHZpZXdEYXRhID0ge1xuICAgICAgY2hhbm5lbE5hbWUgICAgICAgOiBjaGFubmVsTmFtZSxcbiAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1zICAgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5leHRyYWN0UGFnZUZyb21DbGFpbXMoY2xhaW1zLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICBwcmV2aW91c1BhZ2UgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVByZXZpb3VzUGFnZShwYWdpbmF0aW9uUGFnZSksXG4gICAgICBjdXJyZW50UGFnZSAgICAgICA6IHBhZ2luYXRpb25QYWdlLFxuICAgICAgbmV4dFBhZ2UgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVOZXh0UGFnZSh0b3RhbFBhZ2VzLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICB0b3RhbFBhZ2VzICAgICAgICA6IHRvdGFsUGFnZXMsXG4gICAgICB0b3RhbFJlc3VsdHMgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsQ2xhaW1zKGNsYWltcyksXG4gICAgfTtcbiAgICByZXR1cm4gdmlld0RhdGE7XG4gIH0sXG4gIGdldFBhZ2VGcm9tUXVlcnkgKHBhZ2UpIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIChjbGFpbXMsIHBhZ2VOdW1iZXIpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIFtdOyAgLy8gaWYgbm8gY2xhaW1zLCByZXR1cm4gdGhpcyBkZWZhdWx0XG4gICAgfVxuICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2xhaW1zIGlzIGFycmF5PycsIEFycmF5LmlzQXJyYXkoY2xhaW1zKSk7XG4gICAgLy8gbG9nZ2VyLmRlYnVnKGBwYWdlTnVtYmVyICR7cGFnZU51bWJlcn0gaXMgbnVtYmVyP2AsIE51bWJlci5pc0ludGVnZXIocGFnZU51bWJlcikpO1xuICAgIGNvbnN0IGNsYWltU3RhcnRJbmRleCA9IChwYWdlTnVtYmVyIC0gMSkgKiBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgY2xhaW1FbmRJbmRleCA9IGNsYWltU3RhcnRJbmRleCArIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBwYWdlT2ZDbGFpbXMgPSBjbGFpbXMuc2xpY2UoY2xhaW1TdGFydEluZGV4LCBjbGFpbUVuZEluZGV4KTtcbiAgICByZXR1cm4gcGFnZU9mQ2xhaW1zO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbFBhZ2VzIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvdGFsQ2xhaW1zID0gY2xhaW1zLmxlbmd0aDtcbiAgICAgIGlmICh0b3RhbENsYWltcyA8IENMQUlNU19QRVJfUEFHRSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZ1bGxQYWdlcyA9IE1hdGguZmxvb3IodG90YWxDbGFpbXMgLyBDTEFJTVNfUEVSX1BBR0UpO1xuICAgICAgY29uc3QgcmVtYWluZGVyID0gdG90YWxDbGFpbXMgJSBDTEFJTVNfUEVSX1BBR0U7XG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmdWxsUGFnZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVsbFBhZ2VzICsgMTtcbiAgICB9XG4gIH0sXG4gIGRldGVybWluZVByZXZpb3VzUGFnZSAoY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgLSAxO1xuICB9LFxuICBkZXRlcm1pbmVOZXh0UGFnZSAodG90YWxQYWdlcywgY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgKyAxO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbENsYWltcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY2xhaW1zLmxlbmd0aDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IHsgZGV0YWlsczogaG9zdCB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSBmb3IgdGhlIGhvbWUgcGFnZVxuICBhcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGxvZ2luIHBhZ2VcbiAgYXBwLmdldCgnL2xvZ2luJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzaG93ICdhYm91dCcgcGFnZVxuICBhcHAuZ2V0KCcvYWJvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB0cmVuZGluZyBpbWFnZXNcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KCcvcG9wdWxhcicpO1xuICB9KTtcbiAgYXBwLmdldCgnL3BvcHVsYXInLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB0cmVuZGluZyBpbWFnZXNcbiAgYXBwLmdldCgnL25ldycsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2VuZCBlbWJlZGFibGUgdmlkZW8gcGxheWVyIChmb3IgdHdpdHRlcilcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgLy8gZ2V0IGFuZCByZW5kZXIgdGhlIGNvbnRlbnRcbiAgICByZXMuc3RhdHVzKDIwMCkucmVuZGVyKCdlbWJlZCcsIHsgbGF5b3V0OiAnZW1iZWQnLCBob3N0LCBjbGFpbUlkLCBuYW1lIH0pO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2Utcm91dGVzLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9HSU4gfSBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMnO1xuY29uc3QgeyBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRpc2FibGVkICAgICAgICAgIDogcHVibGlzaGluZy5kaXNhYmxlZCxcbiAgZGlzYWJsZWRNZXNzYWdlICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkTWVzc2FnZSxcbiAgcHVibGlzaEluQ2hhbm5lbCAgOiBmYWxzZSxcbiAgc2VsZWN0ZWRDaGFubmVsICAgOiBMT0dJTixcbiAgc2hvd01ldGFkYXRhSW5wdXRzOiBmYWxzZSxcbiAgc3RhdHVzICAgICAgICAgICAgOiB7XG4gICAgc3RhdHVzIDogbnVsbCxcbiAgICBtZXNzYWdlOiBudWxsLFxuICB9LFxuICBlcnJvcjoge1xuICAgIGZpbGUgICAgICAgICA6IG51bGwsXG4gICAgdXJsICAgICAgICAgIDogbnVsbCxcbiAgICBjaGFubmVsICAgICAgOiBudWxsLFxuICAgIHB1Ymxpc2hTdWJtaXQ6IG51bGwsXG4gIH0sXG4gIGZpbGUgICAgOiBudWxsLFxuICBjbGFpbSAgIDogJycsXG4gIG1ldGFkYXRhOiB7XG4gICAgdGl0bGUgICAgICA6ICcnLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICBsaWNlbnNlICAgIDogJycsXG4gICAgbnNmdyAgICAgICA6IGZhbHNlLFxuICB9LFxuICB0aHVtYm5haWw6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfU0VMRUNURUQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgaW5pdGlhbFN0YXRlLCB7ICAvLyBub3RlOiBjbGVhcnMgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICBmaWxlOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5GSUxFX0NMRUFSOlxuICAgICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbiAgICBjYXNlIGFjdGlvbnMuTUVUQURBVEFfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIG1ldGFkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5tZXRhZGF0YSwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5uYW1lXTogYWN0aW9uLmRhdGEudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkNMQUlNX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjbGFpbTogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBwdWJsaXNoSW5DaGFubmVsOiBhY3Rpb24uY2hhbm5lbCxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc3RhdHVzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5FUlJPUl9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZXJyb3I6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmVycm9yLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuU0VMRUNURURfQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2VsZWN0ZWRDaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5UT0dHTEVfTUVUQURBVEFfSU5QVVRTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHNob3dNZXRhZGF0YUlucHV0czogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuVEhVTUJOQUlMX05FVzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICB0aHVtYm5haWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJleHBvcnQgY29uc3QgTE9HSU4gPSAnRXhpc3RpbmcnO1xuZXhwb3J0IGNvbnN0IENSRUFURSA9ICdOZXcnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsb2dnZWRJbkNoYW5uZWw6IHtcbiAgICBuYW1lICAgOiBudWxsLFxuICAgIHNob3J0SWQ6IG51bGwsXG4gICAgbG9uZ0lkIDogbnVsbCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9nZ2VkSW5DaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIEVSUk9SIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICByZXF1ZXN0OiB7XG4gICAgZXJyb3I6IG51bGwsXG4gICAgdHlwZSA6IG51bGwsXG4gICAgaWQgICA6IG51bGwsXG4gIH0sXG4gIHJlcXVlc3RMaXN0IDoge30sXG4gIGNoYW5uZWxMaXN0IDoge30sXG4gIGFzc2V0TGlzdCAgIDoge30sXG4gIGRpc3BsYXlBc3NldDoge1xuICAgIGVycm9yIDogbnVsbCxcbiAgICBzdGF0dXM6IExPQ0FMX0NIRUNLLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8vIGhhbmRsZSByZXF1ZXN0XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIHR5cGU6IGFjdGlvbi5kYXRhLnJlcXVlc3RUeXBlLFxuICAgICAgICAgIGlkICA6IGFjdGlvbi5kYXRhLnJlcXVlc3RJZCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBzdG9yZSByZXF1ZXN0c1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0xJU1RfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3RMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIGtleSAgOiBhY3Rpb24uZGF0YS5rZXksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBhc3NldCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkFTU0VUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBhc3NldExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmFzc2V0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yICAgIDogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBuYW1lICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICA6IGFjdGlvbi5kYXRhLmNsYWltSWQsXG4gICAgICAgICAgICBzaG9ydElkICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbURhdGE6IGFjdGlvbi5kYXRhLmNsYWltRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGNoYW5uZWwgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBuYW1lICAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgbG9uZ0lkICAgIDogYWN0aW9uLmRhdGEubG9uZ0lkLFxuICAgICAgICAgICAgc2hvcnRJZCAgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXSwge1xuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBkaXNwbGF5IGFuIGFzc2V0XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBlcnJvciA6IGFjdGlvbi5kYXRhLFxuICAgICAgICAgIHN0YXR1czogRVJST1IsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJjb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qge1xuICBhbmFseXRpY3M6IHtcbiAgICBnb29nbGVJZDogZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIH0sXG4gIGFzc2V0RGVmYXVsdHM6IHtcbiAgICB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwsXG4gICAgZGVzY3JpcHRpb246IGRlZmF1bHREZXNjcmlwdGlvbixcbiAgfSxcbiAgZGV0YWlsczoge1xuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gICAgdHdpdHRlcixcbiAgfSxcbn0gPSBzaXRlQ29uZmlnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRlc2NyaXB0aW9uLFxuICBnb29nbGVBbmFseXRpY3NJZCxcbiAgaG9zdCxcbiAgdGl0bGUsXG4gIHR3aXR0ZXIsXG4gIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgZGVmYXVsdFRodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvc2l0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZ2FcIlxuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBjb21wb25lbnRzQ29uZmlnIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBnZXREZWVwZXN0Q2hpbGRWYWx1ZSAocGFyZW50LCBjaGlsZHJlbktleXMpIHtcbiAgbGV0IGNoaWxkS2V5ID0gY2hpbGRyZW5LZXlzLnNoaWZ0KCk7IC8vIC5zaGlmdCgpIHJldHJpZXZlcyB0aGUgZmlyc3QgZWxlbWVudCBvZiBhcnJheSBhbmQgcmVtb3ZlcyBpdCBmcm9tIGFycmF5XG4gIGxldCBjaGlsZCA9IHBhcmVudFtjaGlsZEtleV07XG4gIGlmIChjaGlsZHJlbktleXMubGVuZ3RoID49IDEpIHtcbiAgICByZXR1cm4gZ2V0RGVlcGVzdENoaWxkVmFsdWUoY2hpbGQsIGNoaWxkcmVuS2V5cyk7XG4gIH1cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG5jb25zdCBkeW5hbWljSW1wb3J0ID0gKGZpbGVQYXRoKSA9PiB7XG4gIC8vIHZhbGlkYXRlIGlucHV0c1xuICBpZiAoIWZpbGVQYXRoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggcHJvdmlkZWQgdG8gZHluYW1pY0ltcG9ydCgpJyk7XG4gIH1cbiAgaWYgKGZpbGVQYXRoLnR5cGVvZiAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZpbGUgcGF0aCBwcm92aWRlZCB0byBkeW5hbWljSW1wb3J0KCkgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG4gIC8vIHNwbGl0IG91dCB0aGUgZmlsZSBmb2xkZXJzICAvLyBmaWx0ZXIgb3V0IGFueSBlbXB0eSBvciB3aGl0ZS1zcGFjZS1vbmx5IHN0cmluZ3NcbiAgY29uc3QgZm9sZGVycyA9IGZpbGVQYXRoLnNwbGl0KCcvJykuZmlsdGVyKGZvbGRlck5hbWUgPT4gZm9sZGVyTmFtZS5yZXBsYWNlKC9cXHMvZywgJycpLmxlbmd0aCk7XG4gIC8vIGNoZWNrIGZvciB0aGUgY29tcG9uZW50IGNvcnJlc3BvbmRpbmcgdG8gZmlsZSBwYXRoIGluIHRoZSBzaXRlIGNvbmZpZyBvYmplY3RcbiAgLy8gaS5lLiBjb21wb25lbnRzQ29uZmlnW2ZvbGRlcnNbMF1dW2ZvbGRlcnNbMl1bLi4uXVtmb2xkZXJzW25dXVxuICBjb25zdCBjdXN0b21Db21wb25lbnQgPSBnZXREZWVwZXN0Q2hpbGRWYWx1ZShjb21wb25lbnRzQ29uZmlnLCBmb2xkZXJzKTtcbiAgaWYgKGN1c3RvbUNvbXBvbmVudCkge1xuICAgIHJldHVybiBjdXN0b21Db21wb25lbnQ7ICAvLyByZXR1cm4gY3VzdG9tIGNvbXBvbmVudFxuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXF1aXJlKGZpbGVQYXRoKTsgIC8vIHJldHVybiBkZWZhdWx0IGNvbXBvbmVudFxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkeW5hbWljSW1wb3J0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2R5bmFtaWNJbXBvcnQuanMiLCJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gW107IH07XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IDgyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2xpZW50L3V0aWxzXG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcblxuY2xhc3MgQWJvdXRQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydBYm91dCd9IHBhZ2VVcmk9eydhYm91dCd9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3B1bGwtcXVvdGUnPlNwZWUuY2ggaXMgYW4gb3Blbi1zb3VyY2UgcHJvamVjdC4gIFBsZWFzZSBjb250cmlidXRlIHRvIHRoZSBleGlzdGluZyBzaXRlLCBvciBmb3JrIGl0IGFuZCBtYWtlIHlvdXIgb3duLjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly90d2l0dGVyLmNvbS9zcGVlX2NoJz5UV0lUVEVSPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5HSVRIVUI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+RElTQ09SRCBDSEFOTkVMPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2Jsb2IvbWFzdGVyL1JFQURNRS5tZCc+RE9DVU1FTlRBVElPTjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBtZWRpYS1ob3N0aW5nIHNpdGUgdGhhdCByZWFkcyBmcm9tIGFuZCBwdWJsaXNoZXMgY29udGVudCB0byB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8nPkxCUlk8L2E+IGJsb2NrY2hhaW4uPC9wPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgaG9zdGluZyBzZXJ2aWNlLCBidXQgd2l0aCB0aGUgYWRkZWQgYmVuZWZpdCB0aGF0IGl0IHN0b3JlcyB5b3VyIGNvbnRlbnQgb24gYSBkZWNlbnRyYWxpemVkIG5ldHdvcmsgb2YgY29tcHV0ZXJzIC0tIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9nZXQnPkxCUlk8L2E+IG5ldHdvcmsuICBUaGlzIG1lYW5zIHRoYXQgeW91ciBpbWFnZXMgYXJlIHN0b3JlZCBpbiBtdWx0aXBsZSBsb2NhdGlvbnMgd2l0aG91dCBhIHNpbmdsZSBwb2ludCBvZiBmYWlsdXJlLjwvcD5cbiAgICAgICAgICAgICAgPGgzPkNvbnRyaWJ1dGU8L2gzPlxuICAgICAgICAgICAgICA8cD5JZiB5b3UgaGF2ZSBhbiBpZGVhIGZvciB5b3VyIG93biBzcGVlLmNoLWxpa2Ugc2l0ZSBvbiB0b3Agb2YgTEJSWSwgZm9yayBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPmdpdGh1YiByZXBvPC9hPiBhbmQgZ28gdG8gdG93biE8L3A+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSB3YW50IHRvIGltcHJvdmUgc3BlZS5jaCwgam9pbiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+ZGlzY29yZCBjaGFubmVsPC9hPiBvciBzb2x2ZSBvbmUgb2Ygb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2lzc3Vlcyc+Z2l0aHViIGlzc3VlczwvYT4uPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQWJvdXRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2TGluaywgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IExvZ28gZnJvbSAnY29tcG9uZW50cy9Mb2dvJztcbmltcG9ydCBOYXZCYXJDaGFubmVsRHJvcGRvd24gZnJvbSAnY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jb25zdCBWSUVXID0gJ1ZJRVcnO1xuY29uc3QgTE9HT1VUID0gJ0xPR09VVCc7XG5cbmNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyID0gdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nb3V0VXNlciA9IHRoaXMubG9nb3V0VXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlcigpO1xuICB9XG4gIGNoZWNrRm9yTG9nZ2VkSW5Vc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL3VzZXInLCBwYXJhbXMpXG4gICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihkYXRhLmNoYW5uZWxOYW1lLCBkYXRhLnNob3J0Q2hhbm5lbElkLCBkYXRhLmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL3VzZXIgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBsb2dvdXRVc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL2xvZ291dCcsIHBhcmFtcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dvdXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL2xvZ291dCBlcnJvcicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIExPR09VVDpcbiAgICAgICAgdGhpcy5sb2dvdXRVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWSUVXOlxuICAgICAgICAvLyByZWRpcmVjdCB0byBjaGFubmVsIHBhZ2VcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC8ke3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9OiR7dGhpcy5wcm9wcy5jaGFubmVsTG9uZ0lkfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc2l0ZURlc2NyaXB0aW9uIH0gPSAgdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgbmF2LWJhcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1zaG9ydCBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcic+XG4gICAgICAgICAgPExvZ28gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tY2VudGVyJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbmF2LWJhci10YWdsaW5lJz57c2l0ZURlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tcmlnaHQnPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvJyBleGFjdD5QdWJsaXNoPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyAgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2Fib3V0Jz5BYm91dDwvTmF2TGluaz5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGFubmVsTmFtZSA/IChcbiAgICAgICAgICAgICAgPE5hdkJhckNoYW5uZWxEcm9wZG93blxuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdGlvbj17dGhpcy5oYW5kbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGlvbj17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBWSUVXPXtWSUVXfVxuICAgICAgICAgICAgICAgIExPR09VVD17TE9HT1VUfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPE5hdkxpbmsgaWQ9J25hdi1iYXItbG9naW4tbGluaycgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvbG9naW4nPkNoYW5uZWw8L05hdkxpbms+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihOYXZCYXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZnVuY3Rpb24gTG9nbyAoKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2ZXJzaW9uPScxLjEnIGlkPSdMYXllcl8xJyB4PScwcHgnIHk9JzBweCcgaGVpZ2h0PScyNHB4JyB2aWV3Qm94PScwIDAgODAgMzEnIGVuYWJsZUJhY2tncm91bmQ9J25ldyAwIDAgODAgMzEnIGNsYXNzTmFtZT0nbmF2LWJhci1sb2dvJz5cbiAgICAgIDxMaW5rIHRvPScvJz5cbiAgICAgICAgPHRpdGxlPkxvZ288L3RpdGxlPlxuICAgICAgICA8ZGVzYz5TcGVlLmNoIGxvZ288L2Rlc2M+XG4gICAgICAgIDxnIGlkPSdBYm91dCc+XG4gICAgICAgICAgPGcgaWQ9J1B1Ymxpc2gtRm9ybS1WMi1feDI4X2ZpbGxlZF94MjlfJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNDIuMDAwMDAwLCAtMjMuMDAwMDAwKSc+XG4gICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQyLjAwMDAwMCwgMjIuMDAwMDAwKSc+XG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT0nbWF0cml4KDEgMCAwIDEgMCAyMCknIGZvbnRTaXplPScyNScgZm9udEZhbWlseT0nUm9ib3RvJz5TcGVlJmx0O2g8L3RleHQ+XG4gICAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDMwLjAwMDAwMCknPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzA5RjkxMScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTAuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5JyBmaWxsPSdub25lJyBzdHJva2U9JyMwMjlENzQnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00xNi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjRTM1QkQ4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMzIuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTMnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzQxNTZDNScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTQ4LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS00JyBmaWxsPSdub25lJyBzdHJva2U9JyM2MzU2ODgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J002NC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9MaW5rPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gTmF2QmFyQ2hhbm5lbERyb3Bkb3duICh7IGNoYW5uZWxOYW1lLCBoYW5kbGVTZWxlY3Rpb24sIGRlZmF1bHRTZWxlY3Rpb24sIFZJRVcsIExPR09VVCB9KSB7XG4gIHJldHVybiAoXG4gICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdyBsaW5rLS1uYXYnIG9uQ2hhbmdlPXtoYW5kbGVTZWxlY3Rpb259IHZhbHVlPXtkZWZhdWx0U2VsZWN0aW9ufT5cbiAgICAgIDxvcHRpb24gaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPntjaGFubmVsTmFtZX08L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e1ZJRVd9PlZpZXc8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e0xPR09VVH0+TG9nb3V0PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZCYXJDaGFubmVsRHJvcGRvd247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGNyZWF0ZVBhZ2VUaXRsZSB9IGZyb20gJ3V0aWxzL3BhZ2VUaXRsZSc7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGFncyB9IGZyb20gJ3V0aWxzL21ldGFUYWdzJztcbmltcG9ydCB7IGNyZWF0ZUNhbm9uaWNhbExpbmsgfSBmcm9tICd1dGlscy9jYW5vbmljYWxMaW5rJztcblxuY2xhc3MgU0VPIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICAvLyBwcm9wcyBmcm9tIHN0YXRlXG4gICAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gcHJvcHMgZnJvbSBwYXJlbnRcbiAgICBjb25zdCB7IGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCB7IHBhZ2VUaXRsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjcmVhdGUgcGFnZSB0aXRsZSwgdGFncywgYW5kIGNhbm9uaWNhbCBsaW5rXG4gICAgcGFnZVRpdGxlID0gY3JlYXRlUGFnZVRpdGxlKHNpdGVUaXRsZSwgcGFnZVRpdGxlKTtcbiAgICBjb25zdCBtZXRhVGFncyA9IGNyZWF0ZU1ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgIGNvbnN0IGNhbm9uaWNhbExpbmsgPSBjcmVhdGVDYW5vbmljYWxMaW5rKGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpLCBzaXRlSG9zdCk7XG4gICAgLy8gcmVuZGVyIHJlc3VsdHNcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldFxuICAgICAgICB0aXRsZT17cGFnZVRpdGxlfVxuICAgICAgICBtZXRhPXttZXRhVGFnc31cbiAgICAgICAgbGluaz17W3tyZWw6ICdjYW5vbmljYWwnLCBocmVmOiBjYW5vbmljYWxMaW5rfV19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblNFTy5wcm9wVHlwZXMgPSB7XG4gIHBhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGFnZVVyaSAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGFubmVsICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIGFzc2V0ICAgIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNFTztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsImV4cG9ydCBjb25zdCBjcmVhdGVQYWdlVGl0bGUgPSAoc2l0ZVRpdGxlLCBwYWdlVGl0bGUpID0+IHtcbiAgaWYgKCFwYWdlVGl0bGUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZVRpdGxlfWA7XG4gIH1cbiAgcmV0dXJuIGAke3NpdGVUaXRsZX0gLSAke3BhZ2VUaXRsZX1gO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9wYWdlVGl0bGUuanMiLCJjb25zdCBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gKHRodW1ibmFpbCkgPT4ge1xuICBpZiAodGh1bWJuYWlsKSB7XG4gICAgY29uc3QgZmlsZUV4dCA9IHRodW1ibmFpbC5zdWJzdHJpbmcodGh1bWJuYWlsLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIHN3aXRjaCAoZmlsZUV4dCkge1xuICAgICAgY2FzZSAnanBlZyc6XG4gICAgICBjYXNlICdqcGcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgICAgY2FzZSAncG5nJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9wbmcnO1xuICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9naWYnO1xuICAgICAgY2FzZSAnbXA0JzpcbiAgICAgICAgcmV0dXJuICd2aWRlby9tcDQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuY29uc3QgY3JlYXRlQmFzaWNNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKSA9PiB7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNpdGVIb3N0fSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogc2l0ZURlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxNZXRhVGFncyA9IChzaXRlVGl0bGUsIHNpdGVIb3N0LCBzaXRlVHdpdHRlciwgY2hhbm5lbCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IGAke25hbWV9IG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBgJHtuYW1lfSwgYSBjaGFubmVsIG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YSB9ID0gYXNzZXQ7XG4gIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGNsYWltRGF0YTtcbiAgY29uc3QgZW1iZWRVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzaG93VXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc291cmNlID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9LiR7Y2xhaW1EYXRhLmZpbGVFeHR9YDtcbiAgY29uc3Qgb2dUaXRsZSA9IGNsYWltRGF0YS50aXRsZSB8fCBjbGFpbURhdGEubmFtZTtcbiAgY29uc3Qgb2dEZXNjcmlwdGlvbiA9IGNsYWltRGF0YS5kZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb247XG4gIGNvbnN0IG9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlKGNsYWltRGF0YS50aHVtYm5haWwpO1xuICBjb25zdCBvZ1RodW1ibmFpbCA9IGNsYWltRGF0YS50aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbDtcbiAgY29uc3QgbWV0YVRhZ3MgPSBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBvZ1RpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaG93VXJsfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogb2dEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6d2lkdGgnLCBjb250ZW50OiA2MDB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOmhlaWdodCcsIGNvbnRlbnQ6IDMxNX0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICBdO1xuICBpZiAoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnIHx8IGNvbnRlbnRUeXBlID09PSAndmlkZW8vd2VibScpIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzpzZWN1cmVfdXJsJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogb2dUaHVtYm5haWx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBvZ1RodW1ibmFpbENvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ3ZpZGVvJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3BsYXllcid9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyJywgY29udGVudDogZW1iZWRVcmx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOndpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnRleHQ6cGxheWVyX3dpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpoZWlnaHQnLCBjb250ZW50OiAzMzd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtOmNvbnRlbnRfdHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gIH0gZWxzZSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ2FydGljbGUnfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeV9sYXJnZV9pbWFnZSd9KTtcbiAgfVxuICByZXR1cm4gbWV0YVRhZ3M7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTWV0YVRhZ3MgPSAoc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIH07XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgY2hhbm5lbCk7XG4gIH07XG4gIHJldHVybiBjcmVhdGVCYXNpY01ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsImNvbnN0IGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayA9IChwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7cGFnZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBzaXRlSG9zdCkgPT4ge1xuICBsZXQgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQ7XG4gIGlmIChhc3NldC5jbGFpbURhdGEpIHtcbiAgICAoeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9LyR7bmFtZX1gO1xuICB9O1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayA9IChjaGFubmVsLCBzaXRlSG9zdCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWA7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2Fub25pY2FsTGluayA9IChhc3NldCwgY2hhbm5lbCwgcGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayhhc3NldCwgc2l0ZUhvc3QpO1xuICB9XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rKGNoYW5uZWwsIHNpdGVIb3N0KTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rKHBhZ2UsIHNpdGVIb3N0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZTogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5cbmNsYXNzIExvZ2luUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgLy8gcmUtcm91dGUgdGhlIHVzZXIgdG8gdGhlIGhvbWVwYWdlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICAgIGlmIChuZXdQcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICE9PSB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUpIHtcbiAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvYCk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnTG9naW4nfSBwYWdlVXJpPXsnbG9naW4nfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+Q2hhbm5lbHMgYWxsb3cgeW91IHRvIHB1Ymxpc2ggYW5kIGdyb3VwIGNvbnRlbnQgdW5kZXIgYW4gaWRlbnRpdHkuIFlvdSBjYW4gY3JlYXRlIGEgY2hhbm5lbCBmb3IgeW91cnNlbGYsIG9yIHNoYXJlIG9uZSB3aXRoIGxpa2UtbWluZGVkIGZyaWVuZHMuICBZb3UgY2FuIGNyZWF0ZSAxIGNoYW5uZWwsIG9yIDEwMCwgc28gd2hldGhlciB5b3UncmUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRhbG9uaWEyMDE3OjQzZGNmNDcxNjNjYWEyMWQ4NDA0ZDlmZTliMzBmNzhlZjNlMTQ2YTgnPmRvY3VtZW50aW5nIGltcG9ydGFudCBldmVudHM8L2E+LCBvciBtYWtpbmcgYSBwdWJsaWMgcmVwb3NpdG9yeSBmb3IgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRHaWZzJz5jYXQgZ2lmczwvYT4gKHBhc3N3b3JkOiAnMTIzNCcpLCB0cnkgY3JlYXRpbmcgYSBjaGFubmVsIGZvciBpdCE8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkxvZyBpbiB0byBhbiBleGlzdGluZyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsTG9naW5Gb3JtIC8+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkNyZWF0ZSBhIGJyYW5kIG5ldyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ3JlYXRlRm9ybSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihMb2dpblBhZ2UpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICcuLi8uLi9hY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxMb2dpbkZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgbmFtZSAgICA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ2luVG9DaGFubmVsID0gdGhpcy5sb2dpblRvQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgbG9naW5Ub0NoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWU6IHRoaXMuc3RhdGUubmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJlcXVlc3QoJ2xvZ2luJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHtzdWNjZXNzLCBjaGFubmVsTmFtZSwgc2hvcnRDaGFubmVsSWQsIGNoYW5uZWxDbGFpbUlkLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbWVzc2FnZX0pO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIGlkPSdjaGFubmVsLWxvZ2luLWZvcm0nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1sb2dpbi1uYW1lLWlucHV0Jz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20nPlxuICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBuYW1lPSduYW1lJyBwbGFjZWhvbGRlcj0nWW91ciBDaGFubmVsIE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxOYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnID5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBpZD0nY2hhbm5lbC1sb2dpbi1wYXNzd29yZC1pbnB1dCcgbmFtZT0ncGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbFBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkVudGVyIHRoZSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5sb2dpblRvQ2hhbm5lbH0+QXV0aGVudGljYXRlPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbExvZ2luRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY2xhc3MgQ2hhbm5lbENyZWF0ZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgY2hhbm5lbCA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgc3RhdHVzICA6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dCA9IHRoaXMuaGFuZGxlQ2hhbm5lbElucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNyZWF0ZUNoYW5uZWwgPSB0aGlzLmNyZWF0ZUNoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBjbGVhbnNlQ2hhbm5lbElucHV0IChpbnB1dCkge1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxzKy9nLCAnLScpOyAvLyByZXBsYWNlIHNwYWNlcyB3aXRoIGRhc2hlc1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTktXS9nLCAnJyk7ICAvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksIG9yICctJ1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBoYW5kbGVDaGFubmVsSW5wdXQgKGV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5jbGVhbnNlQ2hhbm5lbElucHV0KHZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtjaGFubmVsOiB2YWx1ZX0pO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ1BsZWFzZSBlbnRlciBhIGNoYW5uZWwgbmFtZSd9KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1tuYW1lXTogdmFsdWV9KTtcbiAgfVxuICB1cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXF1ZXN0KGAvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LyR7Y2hhbm5lbFdpdGhBdFN5bWJvbH1gKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBudWxsfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICB9KTtcbiAgfVxuICBjaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSAoY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxXaXRoQXRTeW1ib2wgPSBgQCR7Y2hhbm5lbH1gO1xuICAgIHJldHVybiByZXF1ZXN0KGAvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LyR7Y2hhbm5lbFdpdGhBdFN5bWJvbH1gKTtcbiAgfVxuICBjaGVja0lzUGFzc3dvcmRQcm92aWRlZCAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFwYXNzd29yZCB8fCBwYXNzd29yZC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIHBhc3N3b3JkJykpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG4gIG1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QgKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZSwgcGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0KCcvc2lnbnVwJywgcGFyYW1zKVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVW5mb3J0dW5hdGVseSwgd2UgZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgY3JlYXRpbmcgeW91ciBjaGFubmVsLiBQbGVhc2UgbGV0IHVzIGtub3cgaW4gRGlzY29yZCEgJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgY3JlYXRlQ2hhbm5lbCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQodGhpcy5zdGF0ZS5wYXNzd29yZClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUodGhpcy5zdGF0ZS5jaGFubmVsKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogJ1dlIGFyZSBwdWJsaXNoaW5nIHlvdXIgbmV3IGNoYW5uZWwuICBTaXQgdGlnaHQuLi4nfSk7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QodGhpcy5zdGF0ZS5jaGFubmVsLCB0aGlzLnN0YXRlLnBhc3N3b3JkKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihyZXN1bHQuY2hhbm5lbE5hbWUsIHJlc3VsdC5zaG9ydENoYW5uZWxJZCwgcmVzdWx0LmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiBudWxsfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgeyAhdGhpcy5zdGF0ZS5zdGF0dXMgPyAoXG4gICAgICAgICAgPGZvcm0gaWQ9J3B1Ymxpc2gtY2hhbm5lbC1mb3JtJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J25ldy1jaGFubmVsLW5hbWUnPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tIHNwYW4tLXJlbGF0aXZlJz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nY2hhbm5lbCcgaWQ9J25ldy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9J2V4YW1wbGVDaGFubmVsTmFtZScgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbm5lbElucHV0fSAvPlxuICAgICAgICAgICAgICAgICAgeyAodGhpcy5zdGF0ZS5jaGFubmVsICYmICF0aGlzLnN0YXRlLmVycm9yKSAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1zdWNjZXNzIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTMnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxNid9PC9zcGFuPiB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1wYXNzd29yZCc+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgbmFtZT0ncGFzc3dvcmQnIGlkPSduZXctY2hhbm5lbC1wYXNzd29yZCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyAgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgPyAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+Q2hvb3NlIGEgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMuY3JlYXRlQ2hhbm5lbH0+Q3JlYXRlIENoYW5uZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz57dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ3JlYXRlRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJbmFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0taW5hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluYWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZXJyb3IgICAgICA6IHNob3cucmVxdWVzdC5lcnJvcixcbiAgICByZXF1ZXN0VHlwZTogc2hvdy5yZXF1ZXN0LnR5cGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uSGFuZGxlU2hvd1BhZ2VVcmksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgU2hvd0Fzc2V0TGl0ZSBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldExpdGUnO1xuaW1wb3J0IFNob3dBc3NldERldGFpbHMgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzJztcbmltcG9ydCBTaG93Q2hhbm5lbCBmcm9tICdjb250YWluZXJzL1Nob3dDaGFubmVsJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG5jbGFzcyBTaG93UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMubWF0Y2gucGFyYW1zICE9PSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcykge1xuICAgICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHJlcXVlc3RUeXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEVycm9yUGFnZSBlcnJvcj17ZXJyb3J9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBzd2l0Y2ggKHJlcXVlc3RUeXBlKSB7XG4gICAgICBjYXNlIENIQU5ORUw6XG4gICAgICAgIHJldHVybiA8U2hvd0NoYW5uZWwgLz47XG4gICAgICBjYXNlIEFTU0VUX0xJVEU6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0TGl0ZSAvPjtcbiAgICAgIGNhc2UgQVNTRVRfREVUQUlMUzpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXREZXRhaWxzIC8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxwPmxvYWRpbmcuLi48L3A+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd1BhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5cbmNsYXNzIFNob3dMaXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGE7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyIHNob3ctbGl0ZS1jb250YWluZXInPlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgIDxMaW5rIGlkPSdhc3NldC1ib2lsZXJwYXRlJyBjbGFzc05hbWU9J2xpbmstLXByaW1hcnkgZmluZS1wcmludCcgdG89e2AvJHtjbGFpbUlkfS8ke25hbWV9YH0+aG9zdGVkXG4gICAgICAgICAgICB2aWEgU3BlZS5jaDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwPmxvYWRpbmcgYXNzZXQgZGF0YS4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dMaXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgeyBMT0NBTF9DSEVDSywgVU5BVkFJTEFCTEUsIEVSUk9SLCBBVkFJTEFCTEUgfSBmcm9tICdjb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMnO1xuXG5jbGFzcyBBc3NldERpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vbkZpbGVSZXF1ZXN0KG5hbWUsIGNsYWltSWQpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIGVycm9yLCBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgY29udGVudFR5cGUsIGZpbGVFeHQsIHRodW1ibmFpbCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J2Fzc2V0LWRpc3BsYXktY29tcG9uZW50Jz5cbiAgICAgICAgeyhzdGF0dXMgPT09IExPQ0FMX0NIRUNLKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPkNoZWNraW5nIHRvIHNlZSBpZiBTcGVlLmNoIGhhcyB5b3VyIGFzc2V0IGxvY2FsbHkuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBVTkFWQUlMQUJMRSkgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5TaXQgdGlnaHQsIHdlJ3JlIHNlYXJjaGluZyB0aGUgTEJSWSBibG9ja2NoYWluIGZvciB5b3VyIGFzc2V0ITwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPHA+Q3VyaW91cyB3aGF0IG1hZ2ljIGlzIGhhcHBlbmluZyBoZXJlPyA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9mYXEvd2hhdC1pcy1sYnJ5Jz5MZWFybiBtb3JlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBFUlJPUikgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5VbmZvcnR1bmF0ZWx5LCB3ZSBjb3VsZG4ndCBkb3dubG9hZCB5b3VyIGFzc2V0IGZyb20gTEJSWS4gIFlvdSBjYW4gaGVscCB1cyBvdXQgYnkgc2hhcmluZyB0aGUgYmVsb3cgZXJyb3IgbWVzc2FnZSBpbiB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUycgdGFyZ2V0PSdfYmxhbmsnPkxCUlkgZGlzY29yZDwvYT4uPC9wPlxuICAgICAgICAgIDxpPjxwIGlkPSdlcnJvci1tZXNzYWdlJz57ZXJyb3J9PC9wPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEFWQUlMQUJMRSkgJiZcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfSAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dmlkZW8gY2xhc3NOYW1lPSdhc3NldCB2aWRlbycgY29udHJvbHMgcG9zdGVyPXt0aHVtYm5haWx9PlxuICAgICAgICAgICAgICAgICAgPHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxwPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT52aWRlbzwvY29kZT4gZWxlbWVudC48L3A+XG4gICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+VW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldERpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgQXNzZXRUaXRsZSBmcm9tICdjb250YWluZXJzL0Fzc2V0VGl0bGUnO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5pbXBvcnQgQXNzZXRJbmZvIGZyb20gJ2NvbnRhaW5lcnMvQXNzZXRJbmZvJztcblxuY2xhc3MgU2hvd0Fzc2V0RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXNzZXQpIHtcbiAgICAgIGNvbnN0IHsgY2xhaW1EYXRhOiB7IG5hbWUgfSB9ID0gYXNzZXQ7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtgJHtuYW1lfSAtIGRldGFpbHNgfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxBc3NldFRpdGxlIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCBzaG93LWRldGFpbHMtY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICA8QXNzZXREaXNwbGF5IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgICAgICA8QXNzZXRJbmZvIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBhc3NldCBkYXRhLi4uJ30gLz5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93QXNzZXREZXRhaWxzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YTogeyB0aXRsZSB9IH0gPSBzZWxlY3RBc3NldChzaG93KTtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBc3NldFRpdGxlID0gKHsgdGl0bGUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtLWxhcmdlJz57dGl0bGV9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRUaXRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIEFzc2V0SW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNvcHlUb0NsaXBib2FyZCA9IHRoaXMuY29weVRvQ2xpcGJvYXJkLmJpbmQodGhpcyk7XG4gIH1cbiAgY29weVRvQ2xpcGJvYXJkIChldmVudCkge1xuICAgIHZhciBlbGVtZW50VG9Db3B5ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuZWxlbWVudHRvY29weTtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb0NvcHkpO1xuICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ09vcHMsIHVuYWJsZSB0byBjb3B5J30pO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgc2hvcnRJZCwgY2xhaW1EYXRhIDogeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgZGVzY3JpcHRpb24sIG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwsIGhvc3QgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7Y2hhbm5lbE5hbWUgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+Q2hhbm5lbDo8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz48TGluayB0bz17YC8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9YH0+e2NoYW5uZWxOYW1lfTwvTGluaz48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAge2Rlc2NyaXB0aW9uICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPntkZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgPGRpdiBpZD0nc2hvdy1zaGFyZS1idXR0b25zJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSBmbGV4LWNvbnRhaW5lci0td3JhcCc+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT50d2l0dGVyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PmZhY2Vib29rPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwOi8vdHVtYmxyLmNvbS93aWRnZXRzL3NoYXJlL3Rvb2w/Y2Fub25pY2FsVXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHVtYmxyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5yZWRkaXQuY29tL3N1Ym1pdD91cmw9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0mdGl0bGU9JHtuYW1lfWB9PnJlZGRpdDwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hvcnQtbGluayc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+TGluazo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1zaG9ydC1saW5rJyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nc2hvcnQtbGluaycgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Ake2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEnIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTInPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLXdpZGUnIGRhdGEtZWxlbWVudHRvY29weT0nc2hvcnQtbGluaydcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jb3B5VG9DbGlwYm9hcmR9PmNvcHlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBpZD0nc2hvdy1lbWJlZC1jb2RlJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5FbWJlZDo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1lbWJlZC10ZXh0JyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHsoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnKSA/IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPHZpZGVvIHdpZHRoPVwiMTAwJVwiIGNvbnRyb2xzIHBvc3Rlcj1cIiR7dGh1bWJuYWlsfVwiIHNyYz1cIiR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1cIi8+PC92aWRlbz5gfSAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPGltZyBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPmB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J2VtYmVkLXRleHQnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tYm90dG9tJz5cbiAgICAgICAgICA8TGluayBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRvPXtgLyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0+PHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dCc+RGlyZWN0IExpbms8L3NwYW4+PC9MaW5rPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj17YCR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfSBkb3dubG9hZD17bmFtZX0+RG93bmxvYWQ8L2E+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2RtY2EnPlJlcG9ydDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0SW5mbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCByZXF1ZXN0XG4gIGNvbnN0IHByZXZpb3VzUmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICAvLyBzZWxlY3QgY2hhbm5lbFxuICBsZXQgY2hhbm5lbDtcbiAgaWYgKHByZXZpb3VzUmVxdWVzdCkge1xuICAgIGNvbnN0IGNoYW5uZWxLZXkgPSBwcmV2aW91c1JlcXVlc3Qua2V5O1xuICAgIGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsQ2xhaW1zRGlzcGxheSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5JztcblxuY2xhc3MgU2hvd0NoYW5uZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBsb25nSWQsIHNob3J0SWQgfSA9IGNoYW5uZWw7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBjaGFubmVsPXtjaGFubmVsfSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8aDI+Y2hhbm5lbCBuYW1lOiB7bmFtZX08L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eydmaW5lLXByaW50J30+ZnVsbCBjaGFubmVsIGlkOiB7bG9uZ0lkfTwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PnNob3J0IGNoYW5uZWwgaWQ6IHtzaG9ydElkfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDbGFpbXNEaXNwbGF5IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGNoYW5uZWwgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0NoYW5uZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvblVwZGF0ZUNoYW5uZWxDbGFpbXMgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGtleVxuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtzaG93LnJlcXVlc3QuaWRdO1xuICBjb25zdCBjaGFubmVsS2V5ID0gcmVxdWVzdC5rZXk7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGNsYWltc1xuICBjb25zdCBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsS2V5LFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uVXBkYXRlQ2hhbm5lbENsYWltcyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFzc2V0UHJldmlldyBmcm9tICdjb21wb25lbnRzL0Fzc2V0UHJldmlldyc7XG5cbmNsYXNzIENoYW5uZWxDbGFpbXNEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gIH1cbiAgc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgLSAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UocHJldmlvdXNQYWdlKTtcbiAgfVxuICBzaG93TmV4dFJlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgKyAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UobmV4dFBhZ2UpO1xuICB9XG4gIHNob3dOZXdQYWdlIChwYWdlKSB7XG4gICAgY29uc3QgeyBjaGFubmVsS2V5LCBjaGFubmVsOiB7IG5hbWUsIGxvbmdJZCB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25VcGRhdGVDaGFubmVsQ2xhaW1zKGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjbGFpbXMsIGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwnPlxuICAgICAgICB7KGNsYWltcy5sZW5ndGggPiAwKSA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge2NsYWltcy5tYXAoKGNsYWltLCBpbmRleCkgPT4gPEFzc2V0UHJldmlld1xuICAgICAgICAgICAgICBjbGFpbURhdGE9e2NsYWltfVxuICAgICAgICAgICAgICBrZXk9e2Ake2NsYWltLm5hbWV9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgIC8+KX1cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPiAxKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZX0+UHJldmlvdXMgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlfT5OZXh0IFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+VGhlcmUgYXJlIG5vIGNsYWltcyBpbiB0aGlzIGNoYW5uZWw8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ2xhaW1zRGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7c2l0ZToge2RlZmF1bHRzOiB7IGRlZmF1bHRUaHVtYm5haWwgfX19KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNvbnN0IEFzc2V0UHJldmlldyA9ICh7IGRlZmF1bHRUaHVtYm5haWwsIGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsIH0gfSkgPT4ge1xuICBjb25zdCBkaXJlY3RTb3VyY2VMaW5rID0gYCR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YDtcbiAgY29uc3Qgc2hvd1VybExpbmsgPSBgLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2Fzc2V0LWhvbGRlcic+XG4gICAgICA8TGluayB0bz17c2hvd1VybExpbmt9ID5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e2RpcmVjdFNvdXJjZUxpbmt9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyB2aWRlbyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e3RodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPnVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCl9XG4gICAgICA8L0xpbms+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZTogeyBob3N0LCB0aXRsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jbGFzcyBGb3VyT2hGb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7dGl0bGUsIGhvc3R9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfSAtIDQwNDwvdGl0bGU+XG4gICAgICAgICAgPGxpbmsgcmVsPSdjYW5vbmljYWwnIGhyZWY9e2Ake2hvc3R9LzQwNGB9IC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxoMj40MDQ8L2gyPlxuICAgICAgICAgIDxwPlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3VyT2hGb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7IGRldGVybWluZVJlc3BvbnNlVHlwZSwgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSwgbG9nUmVxdWVzdERhdGEsIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIHRvIHNlcnZlIGEgc3BlY2lmaWMgYXNzZXQgdXNpbmcgdGhlIGNoYW5uZWwgb3IgY2xhaW0gaWRcbiAgYXBwLmdldCgnLzppZGVudGlmaWVyLzpjbGFpbScsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICAgIHRyeSB7XG4gICAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICAgIH1cbiAgICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAgIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICAgIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgICBsZXQgY2xhaW1OYW1lO1xuICAgIHRyeSB7XG4gICAgICAoeyBjbGFpbU5hbWUgfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSB0aGUgaWRlbnRpZmllclxuICAgIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZDtcbiAgICB0cnkge1xuICAgICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKHBhcmFtcy5pZGVudGlmaWVyKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgaWYgKCFpc0NoYW5uZWwpIHtcbiAgICAgIFtjbGFpbUlkLCBjbGFpbU5hbWVdID0gZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eShjbGFpbUlkLCBjbGFpbU5hbWUpO1xuICAgIH1cbiAgICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gICAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKTtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzZXJ2ZSB0aGUgd2lubmluZyBhc3NldCBhdCBhIGNsYWltIG9yIGEgY2hhbm5lbCBwYWdlXG4gIGFwcC5nZXQoJy86Y2xhaW0nLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gICAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgICB0cnkge1xuICAgICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gICAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgLy8gcGFyc2UgdGhlIGNsYWltXG4gICAgbGV0IGNsYWltTmFtZTtcbiAgICB0cnkge1xuICAgICAgKHtjbGFpbU5hbWV9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgbnVsbCwgbnVsbCk7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChudWxsLCBudWxsLCBjbGFpbU5hbWUsIG51bGwsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGdldENsYWltSWQsIGdldExvY2FsRmlsZVJlY29yZCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJy4vZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5jb25zdCBTSE9XID0gJ1NIT1cnO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbmZ1bmN0aW9uIGNsaWVudEFjY2VwdHNIdG1sICh7YWNjZXB0fSkge1xuICByZXR1cm4gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKTtcbn07XG5cbmZ1bmN0aW9uIHJlcXVlc3RJc0Zyb21Ccm93c2VyIChoZWFkZXJzKSB7XG4gIHJldHVybiBoZWFkZXJzWyd1c2VyLWFnZW50J10gJiYgaGVhZGVyc1sndXNlci1hZ2VudCddLm1hdGNoKC9Nb3ppbGxhLyk7XG59O1xuXG5mdW5jdGlvbiBjbGllbnRXYW50c0Fzc2V0ICh7YWNjZXB0LCByYW5nZX0pIHtcbiAgY29uc3QgaW1hZ2VJc1dhbnRlZCA9IGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL2ltYWdlXFwvLiovKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9cXCovKTtcbiAgY29uc3QgdmlkZW9Jc1dhbnRlZCA9IGFjY2VwdCAmJiByYW5nZTtcbiAgcmV0dXJuIGltYWdlSXNXYW50ZWQgfHwgdmlkZW9Jc1dhbnRlZDtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRDbGFpbUlkIChjbGFpbUlkKSB7XG4gIHJldHVybiAoKGNsYWltSWQubGVuZ3RoID09PSA0MCkgJiYgIS9bXkEtWmEtejAtOV0vZy50ZXN0KGNsYWltSWQpKTtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkIChjbGFpbUlkKSB7XG4gIHJldHVybiBjbGFpbUlkLmxlbmd0aCA9PT0gMTsgIC8vIGl0IHNob3VsZCByZWFsbHkgZXZhbHVhdGUgdGhlIHNob3J0IHVybCBpdHNlbGZcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIChpbnB1dCkge1xuICByZXR1cm4gKGlzVmFsaWRDbGFpbUlkKGlucHV0KSB8fCBpc1ZhbGlkU2hvcnRJZChpbnB1dCkpO1xufTtcblxuZnVuY3Rpb24gc2VydmVBc3NldFRvQ2xpZW50IChjbGFpbUlkLCBuYW1lLCByZXMpIHtcbiAgcmV0dXJuIGdldExvY2FsRmlsZVJlY29yZChjbGFpbUlkLCBuYW1lKVxuICAgIC50aGVuKGZpbGVSZWNvcmQgPT4ge1xuICAgICAgLy8gY2hlY2sgdGhhdCBhIGxvY2FsIHJlY29yZCB3YXMgZm91bmRcbiAgICAgIGlmIChmaWxlUmVjb3JkID09PSBOT19GSUxFKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDMwNykucmVkaXJlY3QoYC9hcGkvY2xhaW0vZ2V0LyR7bmFtZX0vJHtjbGFpbUlkfWApO1xuICAgICAgfVxuICAgICAgLy8gc2VydmUgdGhlIGZpbGVcbiAgICAgIGNvbnN0IHtmaWxlUGF0aCwgZmlsZVR5cGV9ID0gZmlsZVJlY29yZDtcbiAgICAgIGxvZ2dlci52ZXJib3NlKGBzZXJ2aW5nIGZpbGU6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICBjb25zdCBzZW5kRmlsZU9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICAgICAgICA6IGZpbGVUeXBlIHx8ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZEZpbGUoZmlsZVBhdGgsIHNlbmRGaWxlT3B0aW9ucyk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcykge1xuICAgIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gICAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKGZ1bGxDbGFpbUlkID0+IHtcbiAgICAgICAgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DTEFJTSkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjaGFubmVsIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZlQXNzZXRUb0NsaWVudChmdWxsQ2xhaW1JZCwgY2xhaW1OYW1lLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ3N1Y2Nlc3MnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnZmFpbCcpO1xuICAgICAgfSk7XG4gIH0sXG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSAoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZVR5cGU7XG4gICAgaWYgKGhhc0ZpbGVFeHRlbnNpb24pIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFOyAgLy8gYXNzdW1lIGEgc2VydmUgcmVxdWVzdCBpZiBmaWxlIGV4dGVuc2lvbiBpcyBwcmVzZW50XG4gICAgICBpZiAoY2xpZW50QWNjZXB0c0h0bWwoaGVhZGVycykpIHsgIC8vIGlmIHRoZSByZXF1ZXN0IGNvbWVzIGZyb20gYSBicm93c2VyLCBjaGFuZ2UgaXQgdG8gYSBzaG93IHJlcXVlc3RcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIGlmIChjbGllbnRXYW50c0Fzc2V0KGhlYWRlcnMpICYmIHJlcXVlc3RJc0Zyb21Ccm93c2VyKGhlYWRlcnMpKSB7ICAvLyB0aGlzIGlzIGluIGNhc2Ugc29tZW9uZSBlbWJlZHMgYSBzaG93IHVybFxuICAgICAgICBsb2dnZXIuZGVidWcoJ1Nob3cgcmVxdWVzdCBjYW1lIGZyb20gYnJvd3NlciBidXQgd2FudHMgYW4gaW1hZ2UvdmlkZW8uIENoYW5naW5nIHJlc3BvbnNlIHRvIHNlcnZlLi4uJyk7XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VUeXBlO1xuICB9LFxuICBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IChpZGVudGlmaWVyLCBuYW1lKSB7XG4gICAgLy8gdGhpcyBpcyBhIHBhdGNoIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSB3aXRoICcvbmFtZS9jbGFpbV9pZCcgdXJsIGZvcm1hdFxuICAgIGlmIChpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChuYW1lKSAmJiAhaXNWYWxpZFNob3J0SWRPckNsYWltSWQoaWRlbnRpZmllcikpIHtcbiAgICAgIGNvbnN0IHRlbXBOYW1lID0gbmFtZTtcbiAgICAgIG5hbWUgPSBpZGVudGlmaWVyO1xuICAgICAgaWRlbnRpZmllciA9IHRlbXBOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gW2lkZW50aWZpZXIsIG5hbWVdO1xuICB9LFxuICBsb2dSZXF1ZXN0RGF0YSAocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdyZXNwb25zZVR5cGUgPT09JywgcmVzcG9uc2VUeXBlKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIG5hbWUgPT09ICcsIGNsYWltTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIG5hbWUgPT09JywgY2hhbm5lbE5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gaWQgPT09JywgY2xhaW1JZCk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIGlkZW50aWZpZXI6JywgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke3ZhbHVlfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIHVybC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbCBuYW1lIGFmdGVyIEAuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1JZCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbmFtZTonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSAuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgJHttb2RpZmllclNlcGVyYXRvcn0uYCk7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke21vZGlmaWVyU2VwZXJhdG9yfSBtb2RpZmllciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lYCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICB9O1xuICB9LFxuICBwYXJzZU1vZGlmaWVyOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbW9kaWZpZXI6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeVVyaS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJy4uLy4uL2NsaWVudC9yZWR1Y2Vycy9pbmRleCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnLi4vLi4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleCc7XG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uL2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UnO1xuaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHsgY2FsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBoYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9zYWdhcy9zaG93X3VyaSc7XG5pbXBvcnQgeyBvbkhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnLi4vLi4vY2xpZW50L2FjdGlvbnMvc2hvdyc7XG5cbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY29uc3QgcmV0dXJuU2FnYVdpdGhQYXJhbXMgPSAoc2FnYSwgcGFyYW1zKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAqICgpIHtcbiAgICB5aWVsZCBjYWxsKHNhZ2EsIHBhcmFtcyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhbmQgYXBwbHkgbWlkZGxld2FyZVxuICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XG4gIGNvbnN0IG1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUoc2FnYU1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIsIG1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBzYWdhXG4gIGNvbnN0IGFjdGlvbiA9IG9uSGFuZGxlU2hvd1BhZ2VVcmkocmVxLnBhcmFtcyk7XG4gIGNvbnN0IHNhZ2EgPSByZXR1cm5TYWdhV2l0aFBhcmFtcyhoYW5kbGVTaG93UGFnZVVyaSwgYWN0aW9uKTtcblxuICAvLyBydW4gdGhlIHNhZ2EgbWlkZGxld2FyZVxuICBzYWdhTWlkZGxld2FyZVxuICAgIC5ydW4oc2FnYSlcbiAgICAuZG9uZVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICAgICAgPEFwcCAvPlxuICAgICAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgKTtcblxuICAgICAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICAgICAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gICAgICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICAgICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICAgICAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gICAgICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICAgICAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBvblJlcXVlc3RFcnJvciwgb25OZXdDaGFubmVsUmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgbmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19hc3NldCc7XG5pbXBvcnQgeyBuZXdDaGFubmVsUmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfY2hhbm5lbCc7XG5pbXBvcnQgbGJyeVVyaSBmcm9tICd1dGlscy9sYnJ5VXJpJztcblxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSAobW9kaWZpZXIsIGNsYWltKSB7XG4gIC8vIHRoaXMgaXMgYSByZXF1ZXN0IGZvciBhbiBhc3NldFxuICAvLyBjbGFpbSB3aWxsIGJlIGFuIGFzc2V0IGNsYWltXG4gIC8vIHRoZSBpZGVudGlmaWVyIGNvdWxkIGJlIGEgY2hhbm5lbCBvciBhIGNsYWltIGlkXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCwgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKG1vZGlmaWVyKSk7XG4gICAgKHsgY2xhaW1OYW1lLCBleHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBleHRlbnNpb24pKTtcbiAgfTtcbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgY2xhaW1JZCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IChjbGFpbSkge1xuICAvLyB0aGlzIGNvdWxkIGJlIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXQgb3IgYSBjaGFubmVsIHBhZ2VcbiAgLy8gY2xhaW0gY291bGQgYmUgYW4gYXNzZXQgY2xhaW0gb3IgYSBjaGFubmVsIGNsYWltXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIoY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICAvLyByZXR1cm4gZWFybHkgaWYgdGhpcyByZXF1ZXN0IGlzIGZvciBhIGNoYW5uZWxcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0NoYW5uZWxSZXF1ZXN0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkpO1xuICB9XG4gIC8vIGlmIG5vdCBmb3IgYSBjaGFubmVsLCBwYXJzZSB0aGUgY2xhaW0gcmVxdWVzdFxuICBsZXQgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWUsIGV4dGVuc2lvbn0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogaGFuZGxlU2hvd1BhZ2VVcmkgKGFjdGlvbikge1xuICBjb25zdCB7IGlkZW50aWZpZXIsIGNsYWltIH0gPSBhY3Rpb24uZGF0YTtcbiAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSwgaWRlbnRpZmllciwgY2xhaW0pO1xuICB9XG4gIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVDbGFpbU9ubHksIGNsYWltKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoSGFuZGxlU2hvd1BhZ2VVcmkgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLCBoYW5kbGVTaG93UGFnZVVyaSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpLmpzIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCBzZWxlY3QsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QsIG9uUmVxdWVzdEVycm9yLCBvblJlcXVlc3RVcGRhdGUsIGFkZEFzc2V0VG9Bc3NldExpc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgZ2V0TG9uZ0NsYWltSWQsIGdldFNob3J0SWQsIGdldENsYWltRGF0YSB9IGZyb20gJ2FwaS9hc3NldEFwaSc7XG5pbXBvcnQgeyBzZWxlY3RTaG93U3RhdGUgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RTaXRlSG9zdCB9IGZyb20gJ3NlbGVjdG9ycy9zaXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3QXNzZXRSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBuYW1lLCBtb2RpZmllciB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGxvbmcgaWQgJiYgYWRkIHJlcXVlc3QgdG8gcmVxdWVzdCBsaXN0XG4gIGxldCBsb25nSWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBsb25nSWR9ID0geWllbGQgY2FsbChnZXRMb25nQ2xhaW1JZCwgaG9zdCwgbmFtZSwgbW9kaWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICBjb25zdCBhc3NldEtleSA9IGBhIyR7bmFtZX0jJHtsb25nSWR9YDtcbiAgeWllbGQgcHV0KGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0KHJlcXVlc3RJZCwgbnVsbCwgYXNzZXRLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBhc3NldD9cbiAgLy8gSWYgdGhpcyBhc3NldCBpcyBpbiB0aGUgYXNzZXQgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuYXNzZXRMaXN0W2Fzc2V0S2V5XSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBzaG9ydCBJZFxuICBsZXQgc2hvcnRJZDtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IHNob3J0SWR9ID0geWllbGQgY2FsbChnZXRTaG9ydElkLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBnZXQgYXNzZXQgY2xhaW0gZGF0YVxuICBsZXQgY2xhaW1EYXRhO1xuICB0cnkge1xuICAgICh7ZGF0YTogY2xhaW1EYXRhfSA9IHlpZWxkIGNhbGwoZ2V0Q2xhaW1EYXRhLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBhZGQgYXNzZXQgdG8gYXNzZXQgbGlzdFxuICB5aWVsZCBwdXQoYWRkQXNzZXRUb0Fzc2V0TGlzdChhc3NldEtleSwgbnVsbCwgbmFtZSwgbG9uZ0lkLCBzaG9ydElkLCBjbGFpbURhdGEpKTtcbiAgLy8gY2xlYXIgYW55IGVycm9ycyBpbiByZXF1ZXN0IGVycm9yXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0Fzc2V0UmVxdWVzdCAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5BU1NFVF9SRVFVRVNUX05FVywgbmV3QXNzZXRSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9uZ0NsYWltSWQgKGhvc3QsIG5hbWUsIG1vZGlmaWVyKSB7XG4gIGxldCBib2R5ID0ge307XG4gIC8vIGNyZWF0ZSByZXF1ZXN0IHBhcmFtc1xuICBpZiAobW9kaWZpZXIpIHtcbiAgICBpZiAobW9kaWZpZXIuaWQpIHtcbiAgICAgIGJvZHlbJ2NsYWltSWQnXSA9IG1vZGlmaWVyLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5WydjaGFubmVsTmFtZSddID0gbW9kaWZpZXIuY2hhbm5lbC5uYW1lO1xuICAgICAgYm9keVsnY2hhbm5lbENsYWltSWQnXSA9IG1vZGlmaWVyLmNoYW5uZWwuaWQ7XG4gICAgfVxuICB9XG4gIGJvZHlbJ2NsYWltTmFtZSddID0gbmFtZTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfTtcbiAgLy8gY3JlYXRlIHVybFxuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vbG9uZy1pZGA7XG4gIC8vIHJldHVybiB0aGUgcmVxdWVzdCBwcm9taXNlXG4gIHJldHVybiBSZXF1ZXN0KHVybCwgcGFyYW1zKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaG9ydElkIChob3N0LCBuYW1lLCBjbGFpbUlkKSB7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9zaG9ydC1pZC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYWltRGF0YSAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vZGF0YS8ke25hbWV9LyR7Y2xhaW1JZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvYXNzZXRBcGkuanMiLCJpbXBvcnQge2NhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QsIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCB1cGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldENoYW5uZWxDbGFpbXMsIGdldENoYW5uZWxEYXRhIH0gZnJvbSAnYXBpL2NoYW5uZWxBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0NoYW5uZWxSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0gPSBhY3Rpb24uZGF0YTtcbiAgLy8gcHV0IGFuIGFjdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgaW4gcmVkdXhcbiAgeWllbGQgcHV0KG9uUmVxdWVzdFVwZGF0ZShyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgcmVxdWVzdD9cbiAgLy8gSWYgdGhpcyB1cmkgaXMgaW4gdGhlIHJlcXVlc3QgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBjb25zdCBzdGF0ZSA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaG93U3RhdGUpO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBsb25nIGlkXG4gIGxldCBsb25nSWQsIHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHsgZGF0YToge2xvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0lkLCBzaG9ydENoYW5uZWxDbGFpbUlkOiBzaG9ydElkfSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsRGF0YSwgaG9zdCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHN0b3JlIHRoZSByZXF1ZXN0IGluIHRoZSBjaGFubmVsIHJlcXVlc3RzIGxpc3RcbiAgY29uc3QgY2hhbm5lbEtleSA9IGBjIyR7Y2hhbm5lbE5hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGNoYW5uZWxLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBjaGFubmVsP1xuICAvLyBJZiB0aGlzIGNoYW5uZWwgaXMgaW4gdGhlIGNoYW5uZWwgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBjbGFpbXMgZGF0YVxuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIGhvc3QsIGxvbmdJZCwgY2hhbm5lbE5hbWUsIDEpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgY2hhbm5lbCBkYXRhIGluIHRoZSBjaGFubmVsIGxpc3RcbiAgeWllbGQgcHV0KGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0KGNoYW5uZWxLZXksIGNoYW5uZWxOYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpKTtcbiAgLy8gY2xlYXIgYW55IHJlcXVlc3QgZXJyb3JzXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3Q2hhbm5lbFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVywgbmV3Q2hhbm5lbFJlcXVlc3QpO1xufTtcblxuZnVuY3Rpb24gKiBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsIChhY3Rpb24pIHtcbiAgY29uc3QgeyBjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UgfSA9IGFjdGlvbi5kYXRhO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBwdXQodXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBjbGFpbXNEYXRhKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsIGdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfY2hhbm5lbC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbERhdGEgKGhvc3QsIGlkLCBuYW1lKSB7XG4gIGlmICghaWQpIGlkID0gJ25vbmUnO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9kYXRhLyR7bmFtZX0vJHtpZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxDbGFpbXMgKGhvc3QsIGxvbmdJZCwgbmFtZSwgcGFnZSkge1xuICBpZiAoIXBhZ2UpIHBhZ2UgPSAxO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9jbGFpbXMvJHtuYW1lfS8ke2xvbmdJZH0vJHtwYWdlfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleCAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgYWZ0ZXIgXCJAXCIuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogXCIke25hbWVCYWRDaGFycy5qb2luKCcsICcpfVwiLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZDogY2hhbm5lbENsYWltSWQgfHwgbnVsbCxcbiAgICAgIGNsYWltSWQgICAgICAgOiBjbGFpbUlkIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBleHRlbnNpb24pXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gZXh0ZW5zaW9uIHNlcGFyYXRvciwgZXh0ZW5zaW9uIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIGV4dGVuc2lvblNlcGVyYXRvciwgZXh0ZW5zaW9uXSA9IGNvbXBvbmVudHNSZWdleCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuZXhlYyhuYW1lKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVjayB5b3VyIFVSTC4gIE5vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiLlwiJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgZXh0ZW5zaW9uXG4gICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvcikge1xuICAgICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7ZXh0ZW5zaW9uU2VwZXJhdG9yfVwiLmApO1xuICAgICAgfVxuICAgICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBUaGUgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIiBzZXBhcmF0b3IgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZS5gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICAgIGV4dGVuc2lvbjogZXh0ZW5zaW9uIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwID0+IHtcbiAgLy8gYSBjYXRjaC1hbGwgcm91dGUgaWYgc29tZW9uZSB2aXNpdHMgYSBwYWdlIHRoYXQgZG9lcyBub3QgZXhpc3RcbiAgYXBwLnVzZSgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2VcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay1yb3V0ZXMuanMiLCJjb25zdCB7IGxvZ0xldmVsIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbG9nZ2VyQ29uZmlnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHdpbnN0b24pID0+IHtcbiAgLy8gY29uZmlndXJlXG4gIHdpbnN0b24uY29uZmlndXJlKHtcbiAgICB0cmFuc3BvcnRzOiBbXG4gICAgICBuZXcgKHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxvZ0xldmVsLFxuICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgcHJldHR5UHJpbnQgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuICAvLyB0ZXN0IGFsbCB0aGUgbG9nIGxldmVsc1xuICB3aW5zdG9uLmVycm9yKCdMZXZlbCAwJyk7XG4gIHdpbnN0b24ud2FybignTGV2ZWwgMScpO1xuICB3aW5zdG9uLmluZm8oJ0xldmVsIDInKTtcbiAgd2luc3Rvbi52ZXJib3NlKCdMZXZlbCAzJyk7XG4gIHdpbnN0b24uZGVidWcoJ0xldmVsIDQnKTtcbiAgd2luc3Rvbi5zaWxseSgnTGV2ZWwgNScpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcyIsImNvbnN0IGxvZ2dlckNvbmZpZyA9IHtcbiAgbG9nTGV2ZWw6ICdkZWJ1ZycsICAvLyBvcHRpb25zOiBzaWxseSwgZGVidWcsIHZlcmJvc2UsIGluZm9cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nZ2VyQ29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zbGFja0NvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh3aW5zdG9uKSA9PiB7XG4gIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IHNsYWNrQ29uZmlnO1xuICBpZiAoc2xhY2tXZWJIb29rKSB7XG4gICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICBpZiAoc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgIHdlYmhvb2tVcmw6IHNsYWNrV2ViSG9vayxcbiAgICAgICAgY2hhbm5lbCAgIDogc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgd2ViaG9va1VybDogc2xhY2tXZWJIb29rLFxuICAgICAgICBjaGFubmVsICAgOiBzbGFja0luZm9DaGFubmVsLFxuICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlXG4gICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gIH0gZWxzZSB7XG4gICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jb25maWd1cmVTbGFjay5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tc2xhY2std2ViaG9va1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==