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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
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


var Sequelize = __webpack_require__(32);
var logger = __webpack_require__(1);

console.log('exporting sequelize models');

var _require = __webpack_require__(29),
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
var Certificate = __webpack_require__(74);
var Channel = __webpack_require__(75);
var Claim = __webpack_require__(76);
var File = __webpack_require__(77);
var Request = __webpack_require__(78);
var User = __webpack_require__(79);
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

__webpack_require__(96);

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

var _show_action_types = __webpack_require__(11);

var actions = _interopRequireWildcard(_show_action_types);

var _show_request_types = __webpack_require__(52);

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

var _channel = __webpack_require__(24);

var _publish = __webpack_require__(25);

var _view = __webpack_require__(98);

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

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(99);

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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(71);
var logger = __webpack_require__(1);

var _require = __webpack_require__(72),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(16),
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);
var ua = __webpack_require__(73);

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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactGa = __webpack_require__(95);

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
/* 19 */
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
    return __webpack_require__(44)("" + filePath);
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
    return __webpack_require__(44)("" + filePath);
  }
};

/***/ }),
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoggedInChannel = updateLoggedInChannel;

var _channel_action_types = __webpack_require__(41);

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
/* 25 */
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

var _publish_action_types = __webpack_require__(40);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveStatusBar = __webpack_require__(50);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(51);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

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
/* 28 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 29 */
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
/* 30 */
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
/* 31 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);
var fs = __webpack_require__(86);

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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(5);
var logger = __webpack_require__(1);

var _require = __webpack_require__(88),
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(38);

var _redux = __webpack_require__(17);

var _index = __webpack_require__(39);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _index3 = __webpack_require__(18);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(43);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(55);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(13);

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
/* 38 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(17);

var _publish = __webpack_require__(90);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(92);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(93);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(94);

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  channel: _channel2.default,
  publish: _publish2.default,
  show: _show2.default,
  site: _site2.default
});

/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL_UPDATE = exports.CHANNEL_UPDATE = 'CHANNEL_UPDATE';

/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _dynamicImport = __webpack_require__(19);

var _AboutPage = __webpack_require__(97);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _LoginPage = __webpack_require__(100);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(106);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(122);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./canonicalLink": 20,
	"./canonicalLink.js": 20,
	"./dynamicImport": 19,
	"./dynamicImport.js": 19,
	"./file": 45,
	"./file.js": 45,
	"./lbryUri": 21,
	"./lbryUri.js": 21,
	"./metaTags": 22,
	"./metaTags.js": 22,
	"./pageTitle": 23,
	"./pageTitle.js": 23,
	"./publish": 46,
	"./publish.js": 46,
	"./request": 6,
	"./request.js": 6,
	"./validate": 47,
	"./validate.js": 47
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
webpackContext.id = 44;

/***/ }),
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL = exports.CHANNEL = 'CHANNEL';
var ASSET_LITE = exports.ASSET_LITE = 'ASSET_LITE';
var ASSET_DETAILS = exports.ASSET_DETAILS = 'ASSET_DETAILS';

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(110);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(7);

var _show2 = __webpack_require__(12);

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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(121);

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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helmet, html, preloadedState) {
    // take the html and preloadedState and return the full page
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
__webpack_require__(59);
module.exports = __webpack_require__(60);


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Server = __webpack_require__(61);
var Components = __webpack_require__(139);
// const containers = require('client/containers');
// const pages = require('client/pages');

var _exports = {
  Server: Server,
  Components: Components
  // containers,
  // pages,
};

module.exports = _exports;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(62);
var bodyParser = __webpack_require__(63);
var expressHandlebars = __webpack_require__(64);
var Handlebars = __webpack_require__(65);
var helmet = __webpack_require__(66);
var passport = __webpack_require__(28);

var _require = __webpack_require__(67),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

var cookieSession = __webpack_require__(68);
var http = __webpack_require__(69);
// logging dependencies
var logger = __webpack_require__(1);

function Server() {
  var _this = this;

  this.configureMysql = function (mysqlConfig) {
    __webpack_require__(29).configure(mysqlConfig);
  };
  this.configureSite = function (siteConfig) {
    __webpack_require__(3).configure(siteConfig);
    console.log(__webpack_require__(3));
    _this.sessionKey = siteConfig.auth.sessionKey;
    _this.PORT = siteConfig.details.port;
  };
  this.configureSlack = function (slackConfig) {
    __webpack_require__(30).configure(slackConfig);
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
    var localSignupStrategy = __webpack_require__(70);
    var localLoginStrategy = __webpack_require__(81);
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
    __webpack_require__(82)(app);
    __webpack_require__(83)(app);
    __webpack_require__(89)(app);
    __webpack_require__(124)(app);
    __webpack_require__(134)(app);

    _this.app = app;
  };
  this.initialize = function () {
    __webpack_require__(135)(logger);
    __webpack_require__(137)(logger);
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

module.exports = Server;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 67 */
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
/* 68 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(31).Strategy;
var lbryApi = __webpack_require__(15);
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
/* 71 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 72 */
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
/* 73 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(33),
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
/* 75 */
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(33),
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
/* 77 */
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
/* 78 */
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(80);
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
/* 80 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(31).Strategy;
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);
var passport = __webpack_require__(28);

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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(1);
var multipart = __webpack_require__(84);

var _require = __webpack_require__(3),
    uploadDirectory = _require.publishing.uploadDirectory,
    host = _require.details.host;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });
var db = __webpack_require__(5);

var _require2 = __webpack_require__(85),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    checkChannelAvailability = _require2.checkChannelAvailability,
    publish = _require2.publish;

var _require3 = __webpack_require__(15),
    getClaimList = _require3.getClaimList,
    resolveUri = _require3.resolveUri,
    getClaim = _require3.getClaim;

var _require4 = __webpack_require__(34),
    addGetResultsToFileData = _require4.addGetResultsToFileData,
    createBasicPublishParams = _require4.createBasicPublishParams,
    createThumbnailPublishParams = _require4.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require4.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require4.parsePublishApiRequestFiles,
    createFileData = _require4.createFileData;

var errorHandlers = __webpack_require__(35);

var _require5 = __webpack_require__(16),
    sendGATimingEvent = _require5.sendGATimingEvent;

var _require6 = __webpack_require__(87),
    authenticateUser = _require6.authenticateUser;

var _require7 = __webpack_require__(36),
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
/* 84 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(1);
var db = __webpack_require__(5);
var lbryApi = __webpack_require__(15);
var publishHelpers = __webpack_require__(34);

var _require = __webpack_require__(3),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(32);
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
/* 86 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 87 */
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
/* 88 */
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    host = _require.details;

var handlePageRender = __webpack_require__(37);

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
/* 90 */
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

var _publish_action_types = __webpack_require__(40);

var actions = _interopRequireWildcard(_publish_action_types);

var _publish_channel_select_states = __webpack_require__(91);

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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = exports.LOGIN = 'Existing';
var CREATE = exports.CREATE = 'New';

/***/ }),
/* 92 */
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

var _channel_action_types = __webpack_require__(41);

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
/* 93 */
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

var _show_action_types = __webpack_require__(11);

var actions = _interopRequireWildcard(_show_action_types);

var _asset_display_states = __webpack_require__(42);

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
/* 94 */
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
/* 95 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = require("cross-fetch/polyfill");

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

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _SEO = __webpack_require__(9);

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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Logo = __webpack_require__(48);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(49);

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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(13);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageTitle = __webpack_require__(23);

var _metaTags = __webpack_require__(22);

var _canonicalLink = __webpack_require__(20);

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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(101);

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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _SEO = __webpack_require__(9);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelLoginForm = __webpack_require__(102);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(104);

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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _channel = __webpack_require__(24);

var _view = __webpack_require__(103);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(25);

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
/* 103 */
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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _channel = __webpack_require__(24);

var _view = __webpack_require__(105);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(25);

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
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(26);

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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _show = __webpack_require__(7);

var _view = __webpack_require__(107);

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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = __webpack_require__(27);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _ShowAssetLite = __webpack_require__(108);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(111);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(117);

var _ShowChannel2 = _interopRequireDefault(_ShowChannel);

var _show_request_types = __webpack_require__(52);

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
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(109);

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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(9);

var _SEO2 = _interopRequireDefault(_SEO);

var _reactRouterDom = __webpack_require__(4);

var _AssetDisplay = __webpack_require__(53);

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
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(26);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _asset_display_states = __webpack_require__(42);

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
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(9);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ErrorPage = __webpack_require__(27);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(113);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(53);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(115);

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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(114);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(12);

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
/* 114 */
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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(116);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(12);

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
/* 116 */
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
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(9);

var _SEO2 = _interopRequireDefault(_SEO);

var _ErrorPage = __webpack_require__(27);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelClaimsDisplay = __webpack_require__(119);

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
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _show = __webpack_require__(7);

var _view = __webpack_require__(120);

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
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(54);

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
/* 121 */
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
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(2);

var _view = __webpack_require__(123);

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
/* 123 */
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

var _reactHelmet = __webpack_require__(13);

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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(16),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(125),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(126);
var handleShowRender = __webpack_require__(127);
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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(1);

var _require = __webpack_require__(36),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(35),
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
/* 126 */
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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(38);

var _redux = __webpack_require__(17);

var _index = __webpack_require__(39);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _index3 = __webpack_require__(18);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(43);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(55);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(128);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(14);

var _show_uri = __webpack_require__(129);

var _show = __webpack_require__(7);

var _reactHelmet = __webpack_require__(13);

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
/* 128 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = __webpack_require__(14);

var _show_action_types = __webpack_require__(11);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(7);

var _show_asset = __webpack_require__(130);

var _show_channel = __webpack_require__(132);

var _lbryUri = __webpack_require__(21);

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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = __webpack_require__(14);

var _show_action_types = __webpack_require__(11);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(7);

var _assetApi = __webpack_require__(131);

var _show2 = __webpack_require__(12);

var _site = __webpack_require__(56);

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
/* 131 */
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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = __webpack_require__(14);

var _show_action_types = __webpack_require__(11);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(7);

var _channelApi = __webpack_require__(133);

var _show2 = __webpack_require__(12);

var _site = __webpack_require__(56);

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
/* 133 */
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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(37);

module.exports = function (app) {
  // a catch-all route if someone visits a page that does not exist
  app.use('*', function (req, res) {
    // send response
    handlePageRender(req, res);
  });
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(136),
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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loggerConfig = {
  logLevel: 'debug' // options: silly, debug, verbose, info
};

module.exports = loggerConfig;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(138).SlackWebHook;
var slackConfig = __webpack_require__(30);

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
/* 138 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ActiveStatusBar = __webpack_require__(50);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _AssetPreview = __webpack_require__(54);

var _AssetPreview2 = _interopRequireDefault(_AssetPreview);

var _ExpandingTextArea = __webpack_require__(140);

var _ExpandingTextArea2 = _interopRequireDefault(_ExpandingTextArea);

var _GAListener = __webpack_require__(18);

var _GAListener2 = _interopRequireDefault(_GAListener);

var _InactiveStatusBar = __webpack_require__(51);

var _InactiveStatusBar2 = _interopRequireDefault(_InactiveStatusBar);

var _Logo = __webpack_require__(48);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(49);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _ProgressBar = __webpack_require__(26);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _PublishPreview = __webpack_require__(141);

var _PublishPreview2 = _interopRequireDefault(_PublishPreview);

var _PublishUrlMiddleDisplay = __webpack_require__(142);

var _PublishUrlMiddleDisplay2 = _interopRequireDefault(_PublishUrlMiddleDisplay);

var _SEO = __webpack_require__(9);

var _SEO2 = _interopRequireDefault(_SEO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ActiveStatusBar: _ActiveStatusBar2.default,
  AssetPreview: _AssetPreview2.default,
  ExpandingTextArea: _ExpandingTextArea2.default,
  GAListener: _GAListener2.default,
  InactiveStatusBar: _InactiveStatusBar2.default,
  Logo: _Logo2.default,
  NavBarChannelOptionsDropdown: _NavBarChannelOptionsDropdown2.default,
  ProgressBar: _ProgressBar2.default,
  PublishPreview: _PublishPreview2.default,
  PublishUrlMiddleDisplay: _PublishUrlMiddleDisplay2.default,
  SEO: _SEO2.default
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpandingTextarea = function (_Component) {
  _inherits(ExpandingTextarea, _Component);

  function ExpandingTextarea(props) {
    _classCallCheck(this, ExpandingTextarea);

    var _this = _possibleConstructorReturn(this, (ExpandingTextarea.__proto__ || Object.getPrototypeOf(ExpandingTextarea)).call(this, props));

    _this._handleChange = _this._handleChange.bind(_this);
    return _this;
  }

  _createClass(ExpandingTextarea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.adjustTextarea({});
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(event) {
      var onChange = this.props.onChange;

      if (onChange) onChange(event);
      this.adjustTextarea(event);
    }
  }, {
    key: 'adjustTextarea',
    value: function adjustTextarea(_ref) {
      var _ref$target = _ref.target,
          target = _ref$target === undefined ? this.el : _ref$target;

      target.style.height = 0;
      target.style.height = target.scrollHeight + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var rest = _objectWithoutProperties(this.props, []);

      return _react2.default.createElement('textarea', _extends({}, rest, {
        ref: function ref(x) {
          return _this2.el = x;
        },
        onChange: this._handleChange
      }));
    }
  }]);

  return ExpandingTextarea;
}(_react.Component);

ExpandingTextarea.propTypes = {
  onChange: _propTypes2.default.func
};

exports.default = ExpandingTextarea;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishPreview = function (_React$Component) {
  _inherits(PublishPreview, _React$Component);

  function PublishPreview(props) {
    _classCallCheck(this, PublishPreview);

    var _this = _possibleConstructorReturn(this, (PublishPreview.__proto__ || Object.getPrototypeOf(PublishPreview)).call(this, props));

    _this.state = {
      imgSource: '',
      defaultThumbnail: '/assets/img/video_thumb_default.png'
    };
    return _this;
  }

  _createClass(PublishPreview, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setPreviewImageSource(this.props.file);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.file !== this.props.file) {
        this.setPreviewImageSource(newProps.file);
      }
      if (newProps.thumbnail !== this.props.thumbnail) {
        if (newProps.thumbnail) {
          this.setPreviewImageSourceFromFile(newProps.thumbnail);
        } else {
          this.setState({ imgSource: this.state.defaultThumbnail });
        }
      }
    }
  }, {
    key: 'setPreviewImageSourceFromFile',
    value: function setPreviewImageSourceFromFile(file) {
      var _this2 = this;

      var previewReader = new FileReader();
      previewReader.readAsDataURL(file);
      previewReader.onloadend = function () {
        _this2.setState({ imgSource: previewReader.result });
      };
    }
  }, {
    key: 'setPreviewImageSource',
    value: function setPreviewImageSource(file) {
      if (file.type !== 'video/mp4') {
        this.setPreviewImageSourceFromFile(file);
      } else {
        if (this.props.thumbnail) {
          this.setPreviewImageSourceFromFile(this.props.thumbnail);
        }
        this.setState({ imgSource: this.state.defaultThumbnail });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('img', {
        id: 'dropzone-preview',
        src: this.state.imgSource,
        className: this.props.dimPreview ? 'dim' : '',
        alt: 'publish preview'
      });
    }
  }]);

  return PublishPreview;
}(_react2.default.Component);

;

PublishPreview.propTypes = {
  dimPreview: _propTypes2.default.bool.isRequired,
  file: _propTypes2.default.object.isRequired,
  thumbnail: _propTypes2.default.object
};

exports.default = PublishPreview;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UrlMiddle(_ref) {
  var publishInChannel = _ref.publishInChannel,
      selectedChannel = _ref.selectedChannel,
      loggedInChannelName = _ref.loggedInChannelName,
      loggedInChannelShortId = _ref.loggedInChannelShortId;

  if (publishInChannel) {
    if (selectedChannel === loggedInChannelName) {
      return _react2.default.createElement(
        'span',
        { id: 'url-channel', className: 'url-text--secondary' },
        loggedInChannelName,
        ':',
        loggedInChannelShortId,
        ' /'
      );
    }
    return _react2.default.createElement(
      'span',
      { id: 'url-channel-placeholder', className: 'url-text--secondary tooltip' },
      '@channel',
      _react2.default.createElement(
        'span',
        {
          className: 'tooltip-text' },
        'Select a channel below'
      ),
      ' /'
    );
  }
  return _react2.default.createElement(
    'span',
    { id: 'url-no-channel-placeholder', className: 'url-text--secondary tooltip' },
    'xyz',
    _react2.default.createElement(
      'span',
      { className: 'tooltip-text' },
      'This will be a random id'
    ),
    ' /'
  );
}

UrlMiddle.propTypes = {
  publishInChannel: _propTypes2.default.bool.isRequired,
  loggedInChannelName: _propTypes2.default.string,
  loggedInChannelShortId: _propTypes2.default.string
};

exports.default = UrlMiddle;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWUxN2Q0NzI0MDkyZjczMjk2ZDciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NlbGVjdG9ycy9zaG93LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2R5bmFtaWNJbXBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2xicnlVcmkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL21ldGFUYWdzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9wYWdlVGl0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvRXJyb3JQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwid2VicGFjazovLy8uL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzIF4uKiQiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3ZhbGlkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcmVuZGVyRnVsbFBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NlbGVjdG9ycy9zaXRlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2hhdHdnLWZldGNoXCIiLCJ3ZWJwYWNrOi8vLy4vc3BlZWNoLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvcHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaXRlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWdhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvQWJvdXRQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvU0VPL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9TaG93UGFnZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRJbmZvL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXQtcm91dGVzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2FcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd191cmkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9hc3NldEFwaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hcGkvY2hhbm5lbEFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jb25maWd1cmVMb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jb25maWd1cmVTbGFjay5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5L2luZGV4LmpzeCJdLCJuYW1lcyI6WyJTaXRlQ29uZmlnIiwiYW5hbHl0aWNzIiwiZ29vZ2xlSWQiLCJhc3NldERlZmF1bHRzIiwiZGVzY3JpcHRpb24iLCJ0aHVtYm5haWwiLCJ0aXRsZSIsImF1dGgiLCJzZXNzaW9uS2V5IiwiY29tcG9uZW50c0NvbmZpZyIsImNvbXBvbmVudHMiLCJjb250YWluZXJzIiwicGFnZXMiLCJkZXRhaWxzIiwiaG9zdCIsInBvcnQiLCJ0d2l0dGVyIiwicHVibGlzaGluZyIsImFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyIsImRpc2FibGVkIiwiZGlzYWJsZWRNZXNzYWdlIiwicHJpbWFyeUNsYWltQWRkcmVzcyIsInRodW1ibmFpbENoYW5uZWwiLCJ0aHVtYm5haWxDaGFubmVsSWQiLCJ1cGxvYWREaXJlY3RvcnkiLCJjb25maWd1cmUiLCJjb25maWciLCJjb25zb2xlIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsIlNlcXVlbGl6ZSIsInJlcXVpcmUiLCJsb2dnZXIiLCJkYXRhYmFzZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJkYiIsInNlcXVlbGl6ZSIsImRpYWxlY3QiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwibG9nZ2luZyIsInBvb2wiLCJtYXgiLCJtaW4iLCJpZGxlIiwiYWNxdWlyZSIsImF1dGhlbnRpY2F0ZSIsInRoZW4iLCJpbmZvIiwiY2F0Y2giLCJlcnJvciIsImVyciIsIkNlcnRpZmljYXRlIiwiQ2hhbm5lbCIsIkNsYWltIiwiRmlsZSIsIlJlcXVlc3QiLCJVc2VyIiwiaW1wb3J0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJtb2RlbE5hbWUiLCJhc3NvY2lhdGUiLCJ1cHNlcnQiLCJNb2RlbCIsInZhbHVlcyIsImNvbmRpdGlvbiIsInRhYmxlTmFtZSIsImZpbmRPbmUiLCJ3aGVyZSIsIm9iaiIsImRlYnVnIiwidXBkYXRlIiwiY3JlYXRlIiwicmVxdWVzdCIsInBhcnNlSlNPTiIsInJlc3BvbnNlIiwic3RhdHVzIiwianNvbiIsImNoZWNrU3RhdHVzIiwianNvblJlc3BvbnNlIiwiRXJyb3IiLCJtZXNzYWdlIiwidXJsIiwib3B0aW9ucyIsImZldGNoIiwiUHJvbWlzZSIsImFsbCIsIm9uSGFuZGxlU2hvd1BhZ2VVcmkiLCJvblJlcXVlc3RFcnJvciIsIm9uTmV3Q2hhbm5lbFJlcXVlc3QiLCJvbk5ld0Fzc2V0UmVxdWVzdCIsIm9uUmVxdWVzdFVwZGF0ZSIsImFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IiwiYWRkQXNzZXRUb0Fzc2V0TGlzdCIsImFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0Iiwib25VcGRhdGVDaGFubmVsQ2xhaW1zIiwidXBkYXRlQ2hhbm5lbENsYWltcyIsImZpbGVSZXF1ZXN0ZWQiLCJ1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IiwidXBkYXRlRGlzcGxheUFzc2V0RXJyb3IiLCJhY3Rpb25zIiwicGFyYW1zIiwidHlwZSIsIkhBTkRMRV9TSE9XX1VSSSIsImRhdGEiLCJSRVFVRVNUX0VSUk9SIiwiY2hhbm5lbE5hbWUiLCJjaGFubmVsSWQiLCJyZXF1ZXN0VHlwZSIsInJlcXVlc3RJZCIsIkNIQU5ORUxfUkVRVUVTVF9ORVciLCJuYW1lIiwiaWQiLCJleHRlbnNpb24iLCJBU1NFVF9SRVFVRVNUX05FVyIsIm1vZGlmaWVyIiwiY2hhbm5lbCIsIlJFUVVFU1RfVVBEQVRFIiwia2V5IiwiUkVRVUVTVF9MSVNUX0FERCIsImNsYWltSWQiLCJzaG9ydElkIiwiY2xhaW1EYXRhIiwiQVNTRVRfQUREIiwibG9uZ0lkIiwiY2xhaW1zRGF0YSIsIkNIQU5ORUxfQUREIiwiY2hhbm5lbEtleSIsInBhZ2UiLCJDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMiLCJjaGFubmVsTGlzdElkIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MiLCJGSUxFX1JFUVVFU1RFRCIsIkZJTEVfQVZBSUxBQklMSVRZX1VQREFURSIsIkRJU1BMQVlfQVNTRVRfRVJST1IiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzaXRlIiwibG9nZ2VkSW5DaGFubmVsIiwiY2hhbm5lbFNob3J0SWQiLCJjaGFubmVsTG9uZ0lkIiwic2l0ZURlc2NyaXB0aW9uIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwib25DaGFubmVsTG9naW4iLCJkaXNwYXRjaCIsIm9uQ2hhbm5lbExvZ291dCIsImRlZmF1bHREZXNjcmlwdGlvbiIsImRlZmF1bHRUaHVtYm5haWwiLCJzaXRlSG9zdCIsInNpdGVUaXRsZSIsInNpdGVUd2l0dGVyIiwic2VsZWN0QXNzZXQiLCJzaG93IiwicmVxdWVzdExpc3QiLCJhc3NldEtleSIsImFzc2V0TGlzdCIsInNlbGVjdFNob3dTdGF0ZSIsInN0YXRlIiwiYXhpb3MiLCJhcGkiLCJhcGlIb3N0IiwiYXBpUG9ydCIsImxicnlBcGlVcmkiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJzZW5kR0FUaW1pbmdFdmVudCIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bHQiLCJKU09OIiwic3RyaW5naWZ5IiwicHVibGlzaENsYWltIiwicHVibGlzaFBhcmFtcyIsImdhU3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInBvc3QiLCJtZXRob2QiLCJnZXRDbGFpbSIsInVyaSIsInRpbWVvdXQiLCJnZXRDbGFpbUxpc3QiLCJjbGFpbU5hbWUiLCJyZXNvbHZlVXJpIiwiZ2V0RG93bmxvYWREaXJlY3RvcnkiLCJkb3dubG9hZF9kaXJlY3RvcnkiLCJjcmVhdGVDaGFubmVsIiwiY2hhbm5lbF9uYW1lIiwiYW1vdW50IiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImlwIiwib3JpZ2luYWxVcmwiLCJldmVudENhdGVnb3J5IiwiZXZlbnRBY3Rpb24iLCJldmVudExhYmVsIiwiaXBPdmVycmlkZSIsInVzZXJBZ2VudE92ZXJyaWRlIiwiY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIiwiY2F0ZWdvcnkiLCJ2YXJpYWJsZSIsImxhYmVsIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImR1cmF0aW9uIiwidXNlclRpbWluZ0NhdGVnb3J5IiwidXNlclRpbWluZ1ZhcmlhYmxlTmFtZSIsInVzZXJUaW1pbmdUaW1lIiwidXNlclRpbWluZ0xhYmVsIiwic2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IiwidmlzaXRvcklkIiwicmVwbGFjZSIsInZpc2l0b3IiLCJzdHJpY3RDaWRGb3JtYXQiLCJodHRwcyIsImV2ZW50Iiwic2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyIsInRpbWluZyIsInNlbmRHQVNlcnZlRXZlbnQiLCJjaGFubmVsX2lkIiwiaW5pdGlhbGl6ZSIsIkdBTGlzdGVuZXIiLCJzZW5kUGFnZVZpZXciLCJwcm9wcyIsImhpc3RvcnkiLCJsb2NhdGlvbiIsImxpc3RlbiIsInNldCIsInBhdGhuYW1lIiwicGFnZXZpZXciLCJjaGlsZHJlbiIsIkNvbXBvbmVudCIsImdldERlZXBlc3RDaGlsZFZhbHVlIiwicGFyZW50IiwiY2hpbGRyZW5LZXlzIiwiY2hpbGRLZXkiLCJzaGlmdCIsImNoaWxkIiwibGVuZ3RoIiwiZHluYW1pY0ltcG9ydCIsImZpbGVQYXRoIiwiZm9sZGVycyIsInNwbGl0IiwiZmlsdGVyIiwiZm9sZGVyTmFtZSIsImN1c3RvbUNvbXBvbmVudCIsImNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayIsImNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayIsImFzc2V0IiwiY2VydGlmaWNhdGVJZCIsImNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2Fub25pY2FsTGluayIsIlJFR0VYUF9JTlZBTElEX0NMQUlNIiwiUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCIsIlJFR0VYUF9BRERSRVNTIiwiQ0hBTk5FTF9DSEFSIiwicGFyc2VJZGVudGlmaWVyIiwiaWRlbnRpZmllciIsImNvbXBvbmVudHNSZWdleCIsIlJlZ0V4cCIsImV4ZWMiLCJtYXAiLCJtYXRjaCIsInByb3RvIiwidmFsdWUiLCJtb2RpZmllclNlcGVyYXRvciIsImlzQ2hhbm5lbCIsInN0YXJ0c1dpdGgiLCJuYW1lQmFkQ2hhcnMiLCJqb2luIiwiY2hhbm5lbENsYWltSWQiLCJwYXJzZUNsYWltIiwiZXh0ZW5zaW9uU2VwZXJhdG9yIiwiZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZSIsImZpbGVFeHQiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsImNyZWF0ZUJhc2ljTWV0YVRhZ3MiLCJwcm9wZXJ0eSIsImNvbnRlbnQiLCJjcmVhdGVDaGFubmVsTWV0YVRhZ3MiLCJjcmVhdGVBc3NldE1ldGFUYWdzIiwiY29udGVudFR5cGUiLCJlbWJlZFVybCIsInNob3dVcmwiLCJzb3VyY2UiLCJvZ1RpdGxlIiwib2dEZXNjcmlwdGlvbiIsIm9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJvZ1RodW1ibmFpbCIsIm1ldGFUYWdzIiwicHVzaCIsImNyZWF0ZU1ldGFUYWdzIiwiY3JlYXRlUGFnZVRpdGxlIiwicGFnZVRpdGxlIiwidXBkYXRlTG9nZ2VkSW5DaGFubmVsIiwiQ0hBTk5FTF9VUERBVEUiLCJzZWxlY3RGaWxlIiwiY2xlYXJGaWxlIiwidXBkYXRlTWV0YWRhdGEiLCJ1cGRhdGVDbGFpbSIsInNldFB1Ymxpc2hJbkNoYW5uZWwiLCJ1cGRhdGVQdWJsaXNoU3RhdHVzIiwidXBkYXRlRXJyb3IiLCJ1cGRhdGVTZWxlY3RlZENoYW5uZWwiLCJ0b2dnbGVNZXRhZGF0YUlucHV0cyIsIm9uTmV3VGh1bWJuYWlsIiwic3RhcnRQdWJsaXNoIiwiZmlsZSIsIkZJTEVfU0VMRUNURUQiLCJGSUxFX0NMRUFSIiwiTUVUQURBVEFfVVBEQVRFIiwiQ0xBSU1fVVBEQVRFIiwiU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCIsIlBVQkxJU0hfU1RBVFVTX1VQREFURSIsIkVSUk9SX1VQREFURSIsIlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFIiwic2hvd01ldGFkYXRhSW5wdXRzIiwiVE9HR0xFX01FVEFEQVRBX0lOUFVUUyIsIlRIVU1CTkFJTF9ORVciLCJQVUJMSVNIX1NUQVJUIiwiUHJvZ3Jlc3NCYXIiLCJiYXJzIiwiaW5kZXgiLCJpbmNyZW1lbnRlciIsImNyZWF0ZUJhcnMiLCJiaW5kIiwic3RhcnRQcm9ncmVzc0JhciIsInVwZGF0ZVByb2dyZXNzQmFyIiwic3RvcFByb2dyZXNzQmFyIiwiaSIsInNpemUiLCJpc0FjdGl2ZSIsInNldFN0YXRlIiwidXBkYXRlSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJiYXIiLCJwcm9wVHlwZXMiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiRXJyb3JQYWdlIiwic3RyaW5nIiwiTXlzcWxDb25maWciLCJTbGFja0NvbmZpZyIsInNsYWNrV2ViSG9vayIsInNsYWNrRXJyb3JDaGFubmVsIiwic2xhY2tJbmZvQ2hhbm5lbCIsInJldHVyblNob3J0SWQiLCJjbGFpbXNBcnJheSIsImNsYWltSW5kZXgiLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwiZWxlbWVudCIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwiZnMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSIsIm5zZnciLCJsaWNlbnNlIiwiaW52YWxpZE5hbWVDaGFyYWN0ZXJzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwicGF0aCIsInRlc3QiLCJ2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSIsImZpbGVOYW1lIiwiZmlsZVR5cGUiLCJ0aHVtYm5haWxGaWxlTmFtZSIsInRodW1ibmFpbEZpbGVQYXRoIiwidGh1bWJuYWlsRmlsZVR5cGUiLCJjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMiLCJ0cmltIiwiZmlsZV9wYXRoIiwiYmlkIiwibWV0YWRhdGEiLCJhdXRob3IiLCJsYW5ndWFnZSIsImNsYWltX2FkZHJlc3MiLCJjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsInVubGluayIsImFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIiwiZmlsZUluZm8iLCJnZXRSZXN1bHQiLCJmaWxlX25hbWUiLCJkb3dubG9hZF9wYXRoIiwiY3JlYXRlRmlsZURhdGEiLCJvdXRwb2ludCIsImhlaWdodCIsImFkZHJlc3MiLCJoYW5kbGVFcnJvclJlc3BvbnNlIiwicmVzIiwidXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzIiwicmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwibmV3RXJyb3JPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwic3VjY2VzcyIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsImxvbmdDaGFubmVsQ2xhaW1JZCIsImdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQiLCJzaG9ydENoYW5uZWxDbGFpbUlkIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJkYXRhVmFsdWVzIiwicmVxIiwiY29udGV4dCIsInN0b3JlIiwiaHRtbCIsImhlbG1ldCIsInJlbmRlclN0YXRpYyIsInJlZGlyZWN0IiwicHJlbG9hZGVkU3RhdGUiLCJnZXRTdGF0ZSIsInNlbmQiLCJwdWJsaXNoIiwiTE9DQUxfQ0hFQ0siLCJVTkFWQUlMQUJMRSIsIkVSUk9SIiwiQVZBSUxBQkxFIiwiSG9tZVBhZ2UiLCJBcHAiLCJ2YWxpZGF0ZUZpbGUiLCJjcmVhdGVQdWJsaXNoTWV0YWRhdGEiLCJjbGFpbSIsInB1Ymxpc2hJbkNoYW5uZWwiLCJzZWxlY3RlZENoYW5uZWwiLCJjcmVhdGVQdWJsaXNoRm9ybURhdGEiLCJmZCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiaGFzT3duUHJvcGVydHkiLCJjcmVhdGVUaHVtYm5haWxVcmwiLCJ2YWxpZGF0ZUNoYW5uZWxTZWxlY3Rpb24iLCJ2YWxpZGF0ZVB1Ymxpc2hQYXJhbXMiLCJ1cmxFcnJvciIsIkxvZ28iLCJOYXZCYXJDaGFubmVsRHJvcGRvd24iLCJoYW5kbGVTZWxlY3Rpb24iLCJkZWZhdWx0U2VsZWN0aW9uIiwiVklFVyIsIkxPR09VVCIsIkFjdGl2ZVN0YXR1c0JhciIsIkluYWN0aXZlU3RhdHVzQmFyIiwiQ0hBTk5FTCIsIkFTU0VUX0xJVEUiLCJBU1NFVF9ERVRBSUxTIiwiZGlzcGxheUFzc2V0Iiwib25GaWxlUmVxdWVzdCIsImRlZmF1bHRzIiwidG9TdHJpbmciLCJtZXRhIiwibGluayIsInNlbGVjdFNpdGVTdGF0ZSIsInNlbGVjdFNpdGVIb3N0IiwiU2VydmVyIiwiQ29tcG9uZW50cyIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwicGFzc3BvcnQiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJjb25maWd1cmVNeXNxbCIsIm15c3FsQ29uZmlnIiwiY29uZmlndXJlU2l0ZSIsInNpdGVDb25maWciLCJQT1JUIiwiY29uZmlndXJlU2xhY2siLCJzbGFja0NvbmZpZyIsImNyZWF0ZUFwcCIsImFwcCIsImVuYWJsZSIsInVzZSIsInN0YXRpYyIsIl9fZGlybmFtZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsIm5leHQiLCJ2ZXJib3NlIiwic2VyaWFsaXplVXNlciIsImRlc2VyaWFsaXplVXNlciIsImxvY2FsU2lnbnVwU3RyYXRlZ3kiLCJsb2NhbExvZ2luU3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZXNzaW9uIiwiaGJzIiwiZGVmYXVsdExheW91dCIsImhhbmRsZWJhcnMiLCJlbmdpbmUiLCJzZXJ2ZXIiLCJzdGFydCIsInN5bmMiLCJ1c2VyIiwiZG9uZSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwibGJyeUFwaSIsInVzZXJuYW1lRmllbGQiLCJwYXNzd29yZEZpZWxkIiwidXNlckluZm8iLCJ1c2VyRGF0YSIsInVzZXJOYW1lIiwiY2hhbm5lbERhdGEiLCJ0eCIsImNsYWltX2lkIiwiY2VydGlmaWNhdGVEYXRhIiwibmV3VXNlciIsIm5ld0NoYW5uZWwiLCJuZXdDZXJ0aWZpY2F0ZSIsInNldENoYW5uZWwiLCJzZXRVc2VyIiwic2hvcnRDaGFubmVsSWQiLCJsYnJ5Q29uZmlnIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImRlZmF1bHQiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJub3V0IiwidHhpZCIsInZhbGlkQXRIZWlnaHQiLCJ2YWx1ZVZlcnNpb24iLCJjbGFpbVR5cGUiLCJjZXJ0aWZpY2F0ZVZlcnNpb24iLCJrZXlUeXBlIiwicHVibGljS2V5IiwiZnJlZXplVGFibGVOYW1lIiwiYmVsb25nc1RvIiwiZm9yZWlnbktleSIsImFsbG93TnVsbCIsImZpbmRBbGwiLCJvcmRlciIsImdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQiLCIkbGlrZSIsImdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUiLCJ2YWxpZGF0ZUxvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwicmF3IiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJyZXNvbHZlQ2xhaW0iLCJjbGFpbUFycmF5IiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImFjdGlvbiIsImlwQWRkcmVzcyIsImJjcnlwdCIsInByb3RvdHlwZSIsImNvbXBhcmVQYXNzd29yZCIsImNvbXBhcmUiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwiZ2VuU2FsdCIsInNhbHRFcnJvciIsInNhbHQiLCJoYXNoIiwiaGFzaEVycm9yIiwiaG9vayIsInJldHVyblVzZXJBbmRDaGFubmVsSW5mbyIsInVzZXJJbnN0YW5jZSIsImdldENoYW5uZWwiLCJpc01hdGNoIiwibG9nSW4iLCJnZXQiLCJsb2dvdXQiLCJtdWx0aXBhcnQiLCJtdWx0aXBhcnRNaWRkbGV3YXJlIiwidXBsb2FkRGlyIiwiY2xhaW1OYW1lSXNBdmFpbGFibGUiLCJjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkiLCJlcnJvckhhbmRsZXJzIiwiYXV0aGVudGljYXRlVXNlciIsImF2YWlsYWJsZU5hbWUiLCJib2R5IiwiY2xhaW1zTGlzdCIsInJlc29sdmVSZXN1bHQiLCJmaWxlRGF0YSIsImZpbGVSZWNvcmQiLCJjb21wbGV0ZWQiLCJyZXNvbHZlZFVyaSIsImZpbGVzIiwiY2hhbm5lbFBhc3N3b3JkIiwidmFsaWRhdGVkQ2xhaW1OYW1lIiwidGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImxicnlUeCIsImNsYWltSW5mbyIsInB1Ymxpc2hIZWxwZXJzIiwiT3AiLCJwdWJsaXNoUmVzdWx0cyIsImNsYWltUmVjb3JkIiwidXBzZXJ0Q3JpdGVyaWEiLCJzZXRDbGFpbSIsInNldEZpbGUiLCJjbGFpbUFkZHJlc3NlcyIsImF0dHJpYnV0ZXMiLCJvciIsImF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyIsInVzZXJQYXNzd29yZCIsImNoYW5uZWxGaW5kUGFyYW1zIiwiQ0xBSU1TX1BFUl9QQUdFIiwiY2xhaW1zIiwidG90YWxQYWdlcyIsImRldGVybWluZVRvdGFsUGFnZXMiLCJwYWdpbmF0aW9uUGFnZSIsImdldFBhZ2VGcm9tUXVlcnkiLCJ2aWV3RGF0YSIsImV4dHJhY3RQYWdlRnJvbUNsYWltcyIsInByZXZpb3VzUGFnZSIsImRldGVybWluZVByZXZpb3VzUGFnZSIsImN1cnJlbnRQYWdlIiwibmV4dFBhZ2UiLCJkZXRlcm1pbmVOZXh0UGFnZSIsInRvdGFsUmVzdWx0cyIsImRldGVybWluZVRvdGFsQ2xhaW1zIiwicGFyc2VJbnQiLCJwYWdlTnVtYmVyIiwiY2xhaW1TdGFydEluZGV4IiwiY2xhaW1FbmRJbmRleCIsInBhZ2VPZkNsYWltcyIsInRvdGFsQ2xhaW1zIiwiZnVsbFBhZ2VzIiwiTWF0aCIsImZsb29yIiwicmVtYWluZGVyIiwiaGFuZGxlUGFnZVJlbmRlciIsInJlbmRlciIsImxheW91dCIsImluaXRpYWxTdGF0ZSIsImFzc2lnbiIsInB1Ymxpc2hTdWJtaXQiLCJMT0dJTiIsIkNSRUFURSIsImNoYW5uZWxMaXN0IiwiZ29vZ2xlQW5hbHl0aWNzSWQiLCJBYm91dFBhZ2UiLCJOYXZCYXIiLCJjaGVja0ZvckxvZ2dlZEluVXNlciIsImxvZ291dFVzZXIiLCJjcmVkZW50aWFscyIsInRhcmdldCIsInNlbGVjdGVkT3B0aW9ucyIsIlNFTyIsInBhZ2VVcmkiLCJjYW5vbmljYWxMaW5rIiwicmVsIiwiaHJlZiIsIm9iamVjdCIsImxvZ2dlZEluQ2hhbm5lbE5hbWUiLCJMb2dpblBhZ2UiLCJuZXdQcm9wcyIsIkNoYW5uZWxMb2dpbkZvcm0iLCJoYW5kbGVJbnB1dCIsImxvZ2luVG9DaGFubmVsIiwicHJldmVudERlZmF1bHQiLCJIZWFkZXJzIiwiQ2hhbm5lbENyZWF0ZUZvcm0iLCJoYW5kbGVDaGFubmVsSW5wdXQiLCJpbnB1dCIsImNsZWFuc2VDaGFubmVsSW5wdXQiLCJ1cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUiLCJjaGFubmVsV2l0aEF0U3ltYm9sIiwiY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQiLCJjaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSIsIm1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QiLCJTaG93UGFnZSIsIm5leHRQcm9wcyIsIlNob3dMaXRlIiwiQXNzZXREaXNwbGF5IiwiU2hvd0Fzc2V0RGV0YWlscyIsIkFzc2V0VGl0bGUiLCJBc3NldEluZm8iLCJjb3B5VG9DbGlwYm9hcmQiLCJlbGVtZW50VG9Db3B5IiwiZGF0YXNldCIsImVsZW1lbnR0b2NvcHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJwcmV2aW91c1JlcXVlc3QiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwic2hvd05ld1BhZ2UiLCJBc3NldFByZXZpZXciLCJkaXJlY3RTb3VyY2VMaW5rIiwic2hvd1VybExpbmsiLCJGb3VyT2hGb3JQYWdlIiwiZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIiwiZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSIsImxvZ1JlcXVlc3REYXRhIiwiZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQiLCJsYnJ5VXJpIiwiaGFuZGxlU2hvd1JlbmRlciIsIlNFUlZFIiwiaGFzRmlsZUV4dGVuc2lvbiIsInBhcnNlTW9kaWZpZXIiLCJyZXNwb25zZVR5cGUiLCJTSE9XIiwiY2xpZW50QWNjZXB0c0h0bWwiLCJhY2NlcHQiLCJyZXF1ZXN0SXNGcm9tQnJvd3NlciIsImNsaWVudFdhbnRzQXNzZXQiLCJyYW5nZSIsImltYWdlSXNXYW50ZWQiLCJ2aWRlb0lzV2FudGVkIiwiaXNWYWxpZENsYWltSWQiLCJpc1ZhbGlkU2hvcnRJZCIsImlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIiwic2VydmVBc3NldFRvQ2xpZW50Iiwic2VuZEZpbGVPcHRpb25zIiwic2VuZEZpbGUiLCJmdWxsQ2xhaW1JZCIsInRlbXBOYW1lIiwicmV0dXJuU2FnYVdpdGhQYXJhbXMiLCJzYWdhIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlIiwicnVuIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJ3YXRjaEhhbmRsZVNob3dQYWdlVXJpIiwicGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0iLCJwYXJzZUFuZFVwZGF0ZUNsYWltT25seSIsIm5ld0Fzc2V0UmVxdWVzdCIsIndhdGNoTmV3QXNzZXRSZXF1ZXN0IiwiZ2V0U2hvcnRJZCIsImdldENsYWltRGF0YSIsIm5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hOZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyIsImdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwiLCJsb2dMZXZlbCIsIndpbnN0b24iLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwid2FybiIsInNpbGx5IiwibG9nZ2VyQ29uZmlnIiwid2luc3RvblNsYWNrV2ViSG9vayIsIlNsYWNrV2ViSG9vayIsImFkZCIsIndlYmhvb2tVcmwiLCJpY29uRW1vamkiLCJFeHBhbmRpbmdUZXh0QXJlYSIsIk5hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24iLCJQdWJsaXNoUHJldmlldyIsIlB1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5IiwiRXhwYW5kaW5nVGV4dGFyZWEiLCJfaGFuZGxlQ2hhbmdlIiwiYWRqdXN0VGV4dGFyZWEiLCJvbkNoYW5nZSIsImVsIiwic3R5bGUiLCJzY3JvbGxIZWlnaHQiLCJyZXN0IiwieCIsImZ1bmMiLCJpbWdTb3VyY2UiLCJzZXRQcmV2aWV3SW1hZ2VTb3VyY2UiLCJzZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSIsInByZXZpZXdSZWFkZXIiLCJGaWxlUmVhZGVyIiwicmVhZEFzRGF0YVVSTCIsIm9ubG9hZGVuZCIsImRpbVByZXZpZXciLCJib29sIiwiVXJsTWlkZGxlIiwibG9nZ2VkSW5DaGFubmVsU2hvcnRJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxrQzs7Ozs7O0FDQUEsb0M7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7QUNBQSxTQUFTQSxVQUFULEdBQXVCO0FBQUE7O0FBQ3JCLE9BQUtDLFNBQUwsR0FBaUI7QUFDZkMsY0FBVTtBQURLLEdBQWpCO0FBR0EsT0FBS0MsYUFBTCxHQUFxQjtBQUNu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QSxlQUErRDtBQUFBLE1BQTlDd1AsbUJBQThDLFFBQTlDQSxtQkFBOEM7QUFBQSxNQUF6QitILHNCQUF5QixRQUF6QkEsc0JBQXlCOztBQUNwRyxNQUFJeFgsZ0JBQUosRUFBc0I7QUFDcEIsUUFBSUMsb0JBQW9Cd1AsbUJBQXhCLEVBQTZDO0FBQzNDLGFBQU87QUFBQTtBQUFBLFVBQU0sSUFBRyxhQUFULEVBQXVCLFdBQVUscUJBQWpDO0FBQXdEQSwyQkFBeEQ7QUFBQTtBQUE4RStILDhCQUE5RTtBQUFBO0FBQUEsT0FBUDtBQUNEO0FBQ0QsV0FBTztBQUFBO0FBQUEsUUFBTSxJQUFHLHlCQUFULEVBQW1DLFdBQVUsNkJBQTdDO0FBQUE7QUFBbUY7QUFBQTtBQUFBO0FBQ3hGLHFCQUFVLGNBRDhFO0FBQUE7QUFBQSxPQUFuRjtBQUFBO0FBQUEsS0FBUDtBQUVEO0FBQ0QsU0FDRTtBQUFBO0FBQUEsTUFBTSxJQUFHLDRCQUFULEVBQXNDLFdBQVUsNkJBQWhEO0FBQUE7QUFBaUY7QUFBQTtBQUFBLFFBQU0sV0FBVSxjQUFoQjtBQUFBO0FBQUEsS0FBakY7QUFBQTtBQUFBLEdBREY7QUFHRDs7QUFFREQsVUFBVTlkLFNBQVYsR0FBc0I7QUFDcEJ1RyxvQkFBd0Isb0JBQVVzWCxJQUFWLENBQWUzZCxVQURuQjtBQUVwQjhWLHVCQUF3QixvQkFBVTVWLE1BRmQ7QUFHcEIyZCwwQkFBd0Isb0JBQVUzZDtBQUhkLENBQXRCOztrQkFNZTBkLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFlMTdkNDcyNDA5MmY3MzI5NmQ3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIFNpdGVDb25maWcgKCkge1xuICB0aGlzLmFuYWx5dGljcyA9IHtcbiAgICBnb29nbGVJZDogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmFzc2V0RGVmYXVsdHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdBbiBhc3NldCBwdWJsaXNoZWQgb24gU3BlZS5jaCcsXG4gICAgdGh1bWJuYWlsICA6ICdodHRwczovL3NwZWUuY2gvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgfTtcbiAgdGhpcy5hdXRoID0ge1xuICAgIHNlc3Npb25LZXk6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5jb21wb25lbnRzQ29uZmlnID0ge1xuICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIGNvbnRhaW5lcnM6IHt9LFxuICAgIHBhZ2VzICAgICA6IHt9LFxuICB9O1xuICB0aGlzLmRldGFpbHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPcGVuLXNvdXJjZSwgZGVjZW50cmFsaXplZCBpbWFnZSBhbmQgdmlkZW8gc2hhcmluZy4nLFxuICAgIGhvc3QgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgcG9ydCAgICAgICA6IDMwMDAsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgICB0d2l0dGVyICAgIDogJ0BzcGVlX2NoJyxcbiAgfTtcbiAgdGhpcy5wdWJsaXNoaW5nID0ge1xuICAgIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlczogW10sXG4gICAgZGlzYWJsZWQgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICBkaXNhYmxlZE1lc3NhZ2UgICAgICAgICA6ICdQbGVhc2UgY2hlY2sgYmFjayBzb29uLicsXG4gICAgcHJpbWFyeUNsYWltQWRkcmVzcyAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbCAgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbElkICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdXBsb2FkRGlyZWN0b3J5ICAgICAgICAgOiAnL2hvbWUvbGJyeS9VcGxvYWRzJyxcbiAgfTtcbiAgdGhpcy5jb25maWd1cmUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gc2l0ZSBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgYW5hbHl0aWNzLCBhc3NldERlZmF1bHRzLCBhdXRoLCBjb21wb25lbnRzQ29uZmlnLCBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSBjb25maWc7XG4gICAgdGhpcy5hbmFseXRpY3MgPSBhbmFseXRpY3M7XG4gICAgdGhpcy5hc3NldERlZmF1bHRzID0gYXNzZXREZWZhdWx0cztcbiAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgdGhpcy5wdWJsaXNoaW5nID0gcHVibGlzaGluZztcbiAgICB0aGlzLmNvbXBvbmVudHNDb25maWcgPSBjb21wb25lbnRzQ29uZmlnO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2l0ZUNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NpdGVDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5jb25zb2xlLmxvZygnZXhwb3J0aW5nIHNlcXVlbGl6ZSBtb2RlbHMnKTtcbmNvbnN0IHsgZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL215c3FsQ29uZmlnJyk7XG5jb25zdCBkYiA9IHt9O1xuLy8gc2V0IHNlcXVlbGl6ZSBvcHRpb25zXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcbiAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0ICAgICAgIDogJ215c3FsJyxcbiAgZGlhbGVjdE9wdGlvbnM6IHtkZWNpbWFsTnVtYmVyczogdHJ1ZX0sIC8vIGZpeCB0byBlbnN1cmUgREVDSU1BTCB3aWxsIG5vdCBiZSBzdG9yZWQgYXMgYSBzdHJpbmdcbiAgbG9nZ2luZyAgICAgICA6IGZhbHNlLFxuICBwb29sICAgICAgICAgIDoge1xuICAgIG1heCAgICA6IDUsXG4gICAgbWluICAgIDogMCxcbiAgICBpZGxlICAgOiAxMDAwMCxcbiAgICBhY3F1aXJlOiAxMDAwMCxcbiAgfSxcbn0pO1xuXG4vLyBlc3RhYmxpc2ggbXlzcWwgY29ubmVjdGlvblxuc2VxdWVsaXplXG4gIC5hdXRoZW50aWNhdGUoKVxuICAudGhlbigoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ1NlcXVlbGl6ZSBoYXMgZXN0YWJsaXNoZWQgbXlzcWwgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkuJyk7XG4gIH0pXG4gIC5jYXRjaChlcnIgPT4ge1xuICAgIGxvZ2dlci5lcnJvcignU2VxdWVsaXplIHdhcyB1bmFibGUgdG8gY29ubmVjdCB0byB0aGUgZGF0YWJhc2U6JywgZXJyKTtcbiAgfSk7XG5cbi8vIG1hbnVhbGx5IGFkZCBlYWNoIG1vZGVsIHRvIHRoZSBkYiBvYmplY3RcbmNvbnN0IENlcnRpZmljYXRlID0gcmVxdWlyZSgnLi9jZXJ0aWZpY2F0ZS5qcycpO1xuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbC5qcycpO1xuY29uc3QgQ2xhaW0gPSByZXF1aXJlKCcuL2NsYWltLmpzJyk7XG5jb25zdCBGaWxlID0gcmVxdWlyZSgnLi9maWxlLmpzJyk7XG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0LmpzJyk7XG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi91c2VyLmpzJyk7XG5kYlsnQ2VydGlmaWNhdGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NlcnRpZmljYXRlJywgQ2VydGlmaWNhdGUpO1xuZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbmRiWydDbGFpbSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2xhaW0nLCBDbGFpbSk7XG5kYlsnRmlsZSddID0gc2VxdWVsaXplLmltcG9ydCgnRmlsZScsIEZpbGUpO1xuZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbmRiWydVc2VyJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdVc2VyJywgVXNlcik7XG5cbi8vIHJ1biBtb2RlbC5hc3NvY2lhdGlvbiBmb3IgZWFjaCBtb2RlbCBpbiB0aGUgZGIgb2JqZWN0IHRoYXQgaGFzIGFuIGFzc29jaWF0aW9uXG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChtb2RlbE5hbWUgPT4ge1xuICBpZiAoZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUpIHtcbiAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICBkYlttb2RlbE5hbWVdLmFzc29jaWF0ZShkYik7XG4gIH1cbn0pO1xuXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG5cbi8vIGFkZCBhbiAndXBzZXJ0JyBtZXRob2QgdG8gdGhlIGRiIG9iamVjdFxuZGIudXBzZXJ0ID0gKE1vZGVsLCB2YWx1ZXMsIGNvbmRpdGlvbiwgdGFibGVOYW1lKSA9PiB7XG4gIHJldHVybiBNb2RlbFxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiBjb25kaXRpb24sXG4gICAgfSlcbiAgICAudGhlbihvYmogPT4ge1xuICAgICAgaWYgKG9iaikgeyAgLy8gdXBkYXRlXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgdXBkYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gb2JqLnVwZGF0ZSh2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHsgIC8vIGluc2VydFxuICAgICAgICBsb2dnZXIuZGVidWcoYGNyZWF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIE1vZGVsLmNyZWF0ZSh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGAke3RhYmxlTmFtZX0udXBzZXJ0IGVycm9yYCwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsImltcG9ydCAnY3Jvc3MtZmV0Y2gvcG9seWZpbGwnO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgSlNPTiByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBwYXJzZUpTT04gKHJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBzdGF0dXMgcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdCB8IHVuZGVmaW5lZH0gUmV0dXJucyBvYmplY3Qgd2l0aCBzdGF0dXMgYW5kIHN0YXR1c1RleHQsIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjaGVja1N0YXR1cyAocmVzcG9uc2UsIGpzb25SZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xuICB9XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGpzb25SZXNwb25zZS5tZXNzYWdlKTtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgdGhyb3cgZXJyb3I7XG59XG5cbi8qKlxuICogUmVxdWVzdHMgYSBVUkwsIHJldHVybmluZyBhIHByb21pc2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybCAgICAgICBUaGUgVVJMIHdlIHdhbnQgdG8gcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgd2Ugd2FudCB0byBwYXNzIHRvIFwiZmV0Y2hcIlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgIFRoZSByZXNwb25zZSBkYXRhXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXNwb25zZSwgcGFyc2VKU09OKHJlc3BvbnNlKV0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFtyZXNwb25zZSwganNvblJlc3BvbnNlXSkgPT4ge1xuICAgICAgcmV0dXJuIGNoZWNrU3RhdHVzKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3JlcXVlc3QuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5cbmltcG9ydCB7IENIQU5ORUwsIEFTU0VUX0xJVEUsIEFTU0VUX0RFVEFJTFMgfSBmcm9tICdjb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzJztcblxuLy8gYmFzaWMgcmVxdWVzdCBwYXJzaW5nXG5leHBvcnQgZnVuY3Rpb24gb25IYW5kbGVTaG93UGFnZVVyaSAocGFyYW1zKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5IQU5ETEVfU0hPV19VUkksXG4gICAgZGF0YTogcGFyYW1zLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdEVycm9yIChlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9FUlJPUixcbiAgICBkYXRhOiBlcnJvcixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld0NoYW5uZWxSZXF1ZXN0IChjaGFubmVsTmFtZSwgY2hhbm5lbElkKSB7XG4gIGNvbnN0IHJlcXVlc3RUeXBlID0gQ0hBTk5FTDtcbiAgY29uc3QgcmVxdWVzdElkID0gYGNyIyR7Y2hhbm5lbE5hbWV9IyR7Y2hhbm5lbElkfWA7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3QXNzZXRSZXF1ZXN0IChuYW1lLCBpZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgZXh0ZW5zaW9uKSB7XG4gIGNvbnN0IHJlcXVlc3RUeXBlID0gZXh0ZW5zaW9uID8gQVNTRVRfTElURSA6IEFTU0VUX0RFVEFJTFM7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IGBhciMke25hbWV9IyR7aWR9IyR7Y2hhbm5lbE5hbWV9IyR7Y2hhbm5lbElkfWA7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5BU1NFVF9SRVFVRVNUX05FVyxcbiAgICBkYXRhOiB7XG4gICAgICByZXF1ZXN0VHlwZSxcbiAgICAgIHJlcXVlc3RJZCxcbiAgICAgIG5hbWUsXG4gICAgICBtb2RpZmllcjoge1xuICAgICAgICBpZCxcbiAgICAgICAgY2hhbm5lbDoge1xuICAgICAgICAgIG5hbWU6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgIGlkICA6IGNoYW5uZWxJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlcXVlc3RVcGRhdGUgKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QgKGlkLCBlcnJvciwga2V5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0xJU1RfQURELFxuICAgIGRhdGE6IHsgaWQsIGVycm9yLCBrZXkgfSxcbiAgfTtcbn07XG5cbi8vIGFzc2V0IGFjdGlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFzc2V0VG9Bc3NldExpc3QgKGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5BU1NFVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIG5hbWUsIGNsYWltSWQsIHNob3J0SWQsIGNsYWltRGF0YSB9LFxuICB9O1xufVxuXG4vLyBjaGFubmVsIGFjdGlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0IChpZCwgbmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0FERCxcbiAgICBkYXRhOiB7IGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblVwZGF0ZUNoYW5uZWxDbGFpbXMgKGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DLFxuICAgIGRhdGE6IHtjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2V9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNoYW5uZWxDbGFpbXMgKGNoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTLFxuICAgIGRhdGE6IHtjaGFubmVsTGlzdElkLCBjbGFpbXNEYXRhfSxcbiAgfTtcbn07XG5cbi8vIGRpc3BsYXkgYSBmaWxlXG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlUmVxdWVzdGVkIChuYW1lLCBjbGFpbUlkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX1JFUVVFU1RFRCxcbiAgICBkYXRhOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IChzdGF0dXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURSxcbiAgICBkYXRhOiBzdGF0dXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGlzcGxheUFzc2V0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5ESVNQTEFZX0FTU0VUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL3Nob3cuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgc2l0ZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbE5hbWUgICA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgY2hhbm5lbFNob3J0SWQ6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLnNob3J0SWQsXG4gICAgY2hhbm5lbExvbmdJZCA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLmxvbmdJZCxcbiAgICBzaXRlRGVzY3JpcHRpb246IHNpdGUuZGVzY3JpcHRpb24sXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgICBvbkNoYW5uZWxMb2dvdXQ6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChudWxsLCBudWxsLCBudWxsKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGUgfSkgPT4ge1xuICBjb25zdCB7IGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCwgZGVzY3JpcHRpb246IHNpdGVEZXNjcmlwdGlvbiwgaG9zdDogc2l0ZUhvc3QsIHRpdGxlOiBzaXRlVGl0bGUsIHR3aXR0ZXI6IHNpdGVUd2l0dGVyIH0gPSBzaXRlO1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgICBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIHNpdGVEZXNjcmlwdGlvbixcbiAgICBzaXRlSG9zdCxcbiAgICBzaXRlVGl0bGUsXG4gICAgc2l0ZVR3aXR0ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicHJvcC10eXBlc1wiXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZXF1ZXN0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBIQU5ETEVfU0hPV19VUkkgPSAnSEFORExFX1NIT1dfVVJJJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0VSUk9SID0gJ1JFUVVFU1RfRVJST1InO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfVVBEQVRFID0gJ1JFUVVFU1RfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9SRVFVRVNUX05FVyA9ICdBU1NFVF9SRVFVRVNUX05FVyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9SRVFVRVNUX05FVyA9ICdDSEFOTkVMX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0xJU1RfQUREID0gJ1JFUVVFU1RfTElTVF9BREQnO1xuXG4vLyBhc3NldCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQVNTRVRfQUREID0gYEFTU0VUX0FERGA7XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQUREID0gJ0NIQU5ORUxfQUREJztcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyA9ICdDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTJztcblxuLy8gYXNzZXQvZmlsZSBkaXNwbGF5IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBGSUxFX1JFUVVFU1RFRCA9ICdGSUxFX1JFUVVFU1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFID0gJ0ZJTEVfQVZBSUxBQklMSVRZX1VQREFURSc7XG5leHBvcnQgY29uc3QgRElTUExBWV9BU1NFVF9FUlJPUiA9ICdESVNQTEFZX0FTU0VUX0VSUk9SJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3Qgc2VsZWN0QXNzZXQgPSAoc2hvdykgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtzaG93LnJlcXVlc3QuaWRdO1xuICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5O1xuICByZXR1cm4gc2hvdy5hc3NldExpc3RbYXNzZXRLZXldO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFNob3dTdGF0ZSA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4gc3RhdGUuc2hvdztcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYS9lZmZlY3RzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCJcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgYXBpOiB7IGFwaUhvc3QsIGFwaVBvcnQgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL2xicnlDb25maWcuanMnKTtcbmNvbnN0IGxicnlBcGlVcmkgPSAnaHR0cDovLycgKyBhcGlIb3N0ICsgJzonICsgYXBpUG9ydDtcbmNvbnN0IHsgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsLCBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi9nb29nbGVBbmFseXRpY3MuanMnKTtcblxuY29uc3QgaGFuZGxlTGJyeW5ldFJlc3BvbnNlID0gKHsgZGF0YSB9LCByZXNvbHZlLCByZWplY3QpID0+IHtcbiAgbG9nZ2VyLmRlYnVnKCdsYnJ5IGFwaSBkYXRhOicsIGRhdGEpO1xuICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAvLyBjaGVjayBmb3IgYW4gZXJyb3JcbiAgICBpZiAoZGF0YS5yZXN1bHQuZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnTGJyeW5ldCBhcGkgZXJyb3I6JywgZGF0YS5yZXN1bHQuZXJyb3IpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihkYXRhLnJlc3VsdC5lcnJvcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGZhbGxiYWNrIGluIGNhc2UgaXQganVzdCB0aW1lZCBvdXRcbiAgcmVqZWN0KEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoQ2xhaW0gKHB1Ymxpc2hQYXJhbXMpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUHVibGlzaGluZyBjbGFpbSB0byBcIiR7cHVibGlzaFBhcmFtcy5uYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncHVibGlzaCcsXG4gICAgICAgICAgcGFyYW1zOiBwdWJsaXNoUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncHVibGlzaCcsIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbChwdWJsaXNoUGFyYW1zKSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW0gKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIENsYWltIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpLCB0aW1lb3V0OiAyMCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW0nLCAnR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1MaXN0IChjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBjbGFpbV9saXN0IGZvciBcIiR7Y2xhaW1OYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2xhaW1fbGlzdCcsXG4gICAgICAgICAgcGFyYW1zOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW1MaXN0JywgJ0NMQUlNX0xJU1QnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZXNvbHZlVXJpICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUmVzb2x2aW5nIFVSSSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3Jlc29sdmUnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncmVzb2x2ZVVyaScsICdSRVNPTFZFJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdFt1cmldLmVycm9yKSB7ICAvLyBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgICAgICByZWplY3QoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHsgIC8vIGlmIG5vIGVycm9ycywgcmVzb2x2ZVxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdFt1cmldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldERvd25sb2FkRGlyZWN0b3J5ICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ2xicnlBcGkgPj4gUmV0cmlldmluZyB0aGUgZG93bmxvYWQgZGlyZWN0b3J5IHBhdGggZnJvbSBsYnJ5IGRhZW1vbi4uLicpO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3NldHRpbmdzX2dldCcsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldERvd25sb2FkRGlyZWN0b3J5JywgJ1NFVFRJTkdTX0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQuZG93bmxvYWRfZGlyZWN0b3J5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byBsYnJ5IGRhZW1vbiwgYnV0IHVuYWJsZSB0byByZXRyaWV2ZSB0aGUgZG93bmxvYWQgZGlyZWN0b3J5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0xicnluZXQgRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUoJy9ob21lL2xicnkvRG93bmxvYWRzLycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlQ2hhbm5lbCAobmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBDcmVhdGluZyBjaGFubmVsIGZvciAke25hbWV9Li4uYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2hhbm5lbF9uZXcnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgY2hhbm5lbF9uYW1lOiBuYW1lLFxuICAgICAgICAgICAgYW1vdW50ICAgICAgOiAwLjEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2NyZWF0ZUNoYW5uZWwnLCAnQ0hBTk5FTF9ORVcnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB1YSA9IHJlcXVpcmUoJ3VuaXZlcnNhbC1hbmFseXRpY3MnKTtcbmNvbnN0IHsgYW5hbHl0aWNzIDogeyBnb29nbGVJZCB9LCBkZXRhaWxzOiB7IHRpdGxlIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICByZXR1cm4ge1xuICAgIGV2ZW50Q2F0ZWdvcnkgICAgOiAnY2xpZW50IHJlcXVlc3RzJyxcbiAgICBldmVudEFjdGlvbiAgICAgIDogJ3NlcnZlIHJlcXVlc3QnLFxuICAgIGV2ZW50TGFiZWwgICAgICAgOiBvcmlnaW5hbFVybCxcbiAgICBpcE92ZXJyaWRlICAgICAgIDogaXAsXG4gICAgdXNlckFnZW50T3ZlcnJpZGU6IGhlYWRlcnNbJ3VzZXItYWdlbnQnXSxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gZW5kVGltZSAtIHN0YXJ0VGltZTtcbiAgcmV0dXJuIHtcbiAgICB1c2VyVGltaW5nQ2F0ZWdvcnkgICAgOiBjYXRlZ29yeSxcbiAgICB1c2VyVGltaW5nVmFyaWFibGVOYW1lOiB2YXJpYWJsZSxcbiAgICB1c2VyVGltaW5nVGltZSAgICAgICAgOiBkdXJhdGlvbixcbiAgICB1c2VyVGltaW5nTGFiZWwgICAgICAgOiBsYWJlbCxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudCAoaXAsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9ySWQgPSBpcC5yZXBsYWNlKC9cXC4vZywgJy0nKTtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IuZXZlbnQocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyAodmlzaXRvcklkLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IudGltaW5nKHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgVGltaW5nIGV2ZW50IHN1Y2Nlc3NmdWxseSBzZW50IHRvIGdvb2dsZSBhbmFseXRpY3NgKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VuZEdBU2VydmVFdmVudCAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlU2VydmVFdmVudFBhcmFtcyhoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudChpcCwgcGFyYW1zKTtcbiAgfSxcbiAgc2VuZEdBVGltaW5nRXZlbnQgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyhjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcodGl0bGUsIHBhcmFtcyk7XG4gIH0sXG4gIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCAoeyBjaGFubmVsX25hbWU6IGNoYW5uZWxOYW1lLCBjaGFubmVsX2lkOiBjaGFubmVsSWQgfSkge1xuICAgIHJldHVybiAoY2hhbm5lbE5hbWUgfHwgY2hhbm5lbElkID8gJ1BVQkxJU0hfSU5fQ0hBTk5FTF9DTEFJTScgOiAnUFVCTElTSF9BTk9OWU1PVVNfQ0xBSU0nKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgR29vZ2xlQW5hbHl0aWNzIGZyb20gJ3JlYWN0LWdhJztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmNvbnN0IHsgYW5hbHl0aWNzOiB7IGdvb2dsZUlkIH0gfSA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbkdvb2dsZUFuYWx5dGljcy5pbml0aWFsaXplKGdvb2dsZUlkKTtcblxuY2xhc3MgR0FMaXN0ZW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnNlbmRQYWdlVmlldyh0aGlzLnByb3BzLmhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5saXN0ZW4odGhpcy5zZW5kUGFnZVZpZXcpO1xuICB9XG5cbiAgc2VuZFBhZ2VWaWV3IChsb2NhdGlvbikge1xuICAgIEdvb2dsZUFuYWx5dGljcy5zZXQoeyBwYWdlOiBsb2NhdGlvbi5wYXRobmFtZSB9KTtcbiAgICBHb29nbGVBbmFseXRpY3MucGFnZXZpZXcobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEdBTGlzdGVuZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJjb25zdCB7IGNvbXBvbmVudHNDb25maWcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGdldERlZXBlc3RDaGlsZFZhbHVlIChwYXJlbnQsIGNoaWxkcmVuS2V5cykge1xuICBsZXQgY2hpbGRLZXkgPSBjaGlsZHJlbktleXMuc2hpZnQoKTsgLy8gLnNoaWZ0KCkgcmV0cmlldmVzIHRoZSBmaXJzdCBlbGVtZW50IG9mIGFycmF5IGFuZCByZW1vdmVzIGl0IGZyb20gYXJyYXlcbiAgbGV0IGNoaWxkID0gcGFyZW50W2NoaWxkS2V5XTtcbiAgaWYgKGNoaWxkcmVuS2V5cy5sZW5ndGggPj0gMSkge1xuICAgIHJldHVybiBnZXREZWVwZXN0Q2hpbGRWYWx1ZShjaGlsZCwgY2hpbGRyZW5LZXlzKTtcbiAgfVxuICByZXR1cm4gY2hpbGQ7XG59XG5cbmV4cG9ydCBjb25zdCBkeW5hbWljSW1wb3J0ID0gKGZpbGVQYXRoKSA9PiB7XG4gIC8vIHZhbGlkYXRlIGlucHV0c1xuICBpZiAoIWZpbGVQYXRoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggcHJvdmlkZWQgdG8gZHluYW1pY0ltcG9ydCgpJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBmaWxlUGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICBjb25zb2xlLmxvZygnZHluYW1pY0ltcG9ydCA+IGZpbGVQYXRoOicsIGZpbGVQYXRoKTtcbiAgICBjb25zb2xlLmxvZygnZHluYW1pY0ltcG9ydCA+IGZpbGVQYXRoIHR5cGU6JywgdHlwZW9mIGZpbGVQYXRoKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZpbGUgcGF0aCBwcm92aWRlZCB0byBkeW5hbWljSW1wb3J0KCkgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG4gIGlmICghY29tcG9uZW50c0NvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKCdubyBjb21wb25lbnRzQ29uZmlnIGZvdW5kIGluIHNpdGVDb25maWcuanMnKTtcbiAgICByZXR1cm4gcmVxdWlyZShgJHtmaWxlUGF0aH1gKTtcbiAgfVxuICAvLyBzcGxpdCBvdXQgdGhlIGZpbGUgZm9sZGVycyAgLy8gZmlsdGVyIG91dCBhbnkgZW1wdHkgb3Igd2hpdGUtc3BhY2Utb25seSBzdHJpbmdzXG4gIGNvbnN0IGZvbGRlcnMgPSBmaWxlUGF0aC5zcGxpdCgnLycpLmZpbHRlcihmb2xkZXJOYW1lID0+IGZvbGRlck5hbWUucmVwbGFjZSgvXFxzL2csICcnKS5sZW5ndGgpO1xuICAvLyBjaGVjayBmb3IgdGhlIGNvbXBvbmVudCBjb3JyZXNwb25kaW5nIHRvIGZpbGUgcGF0aCBpbiB0aGUgc2l0ZSBjb25maWcgb2JqZWN0XG4gIC8vIGkuZS4gY29tcG9uZW50c0NvbmZpZ1tmb2xkZXJzWzBdXVtmb2xkZXJzWzJdWy4uLl1bZm9sZGVyc1tuXV1cbiAgY29uc3QgY3VzdG9tQ29tcG9uZW50ID0gZ2V0RGVlcGVzdENoaWxkVmFsdWUoY29tcG9uZW50c0NvbmZpZywgZm9sZGVycyk7XG4gIGlmIChjdXN0b21Db21wb25lbnQpIHtcbiAgICByZXR1cm4gY3VzdG9tQ29tcG9uZW50OyAgLy8gcmV0dXJuIGN1c3RvbSBjb21wb25lbnRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVxdWlyZShgJHtmaWxlUGF0aH1gKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9keW5hbWljSW1wb3J0LmpzIiwiY29uc3QgY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rID0gKHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtwYWdlfWA7XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsgPSAoYXNzZXQsIHNpdGVIb3N0KSA9PiB7XG4gIGxldCBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZDtcbiAgaWYgKGFzc2V0LmNsYWltRGF0YSkge1xuICAgICh7IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGEpO1xuICB9O1xuICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2hhbm5lbE5hbWV9OiR7Y2VydGlmaWNhdGVJZH0vJHtuYW1lfWA7XG4gIH07XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rID0gKGNoYW5uZWwsIHNpdGVIb3N0KSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBjaGFubmVsLCBwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rKGFzc2V0LCBzaXRlSG9zdCk7XG4gIH1cbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsoY2hhbm5lbCwgc2l0ZUhvc3QpO1xuICB9XG4gIHJldHVybiBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsocGFnZSwgc2l0ZUhvc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9jYW5vbmljYWxMaW5rLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleCAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgYWZ0ZXIgXCJAXCIuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogXCIke25hbWVCYWRDaGFycy5qb2luKCcsICcpfVwiLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZDogY2hhbm5lbENsYWltSWQgfHwgbnVsbCxcbiAgICAgIGNsYWltSWQgICAgICAgOiBjbGFpbUlkIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBleHRlbnNpb24pXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gZXh0ZW5zaW9uIHNlcGFyYXRvciwgZXh0ZW5zaW9uIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIGV4dGVuc2lvblNlcGVyYXRvciwgZXh0ZW5zaW9uXSA9IGNvbXBvbmVudHNSZWdleCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuZXhlYyhuYW1lKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVjayB5b3VyIFVSTC4gIE5vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiLlwiJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgZXh0ZW5zaW9uXG4gICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvcikge1xuICAgICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7ZXh0ZW5zaW9uU2VwZXJhdG9yfVwiLmApO1xuICAgICAgfVxuICAgICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBUaGUgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIiBzZXBhcmF0b3IgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZS5gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICAgIGV4dGVuc2lvbjogZXh0ZW5zaW9uIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsImNvbnN0IGRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSAodGh1bWJuYWlsKSA9PiB7XG4gIGlmICh0aHVtYm5haWwpIHtcbiAgICBjb25zdCBmaWxlRXh0ID0gdGh1bWJuYWlsLnN1YnN0cmluZyh0aHVtYm5haWwubGFzdEluZGV4T2YoJy4nKSk7XG4gICAgc3dpdGNoIChmaWxlRXh0KSB7XG4gICAgICBjYXNlICdqcGVnJzpcbiAgICAgIGNhc2UgJ2pwZyc6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvanBlZyc7XG4gICAgICBjYXNlICdwbmcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL3BuZyc7XG4gICAgICBjYXNlICdnaWYnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2dpZic7XG4gICAgICBjYXNlICdtcDQnOlxuICAgICAgICByZXR1cm4gJ3ZpZGVvL21wNCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59O1xuXG5jb25zdCBjcmVhdGVCYXNpY01ldGFUYWdzID0gKHNpdGVIb3N0LCBzaXRlRGVzY3JpcHRpb24sIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogc2l0ZUhvc3R9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBzaXRlRGVzY3JpcHRpb259LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQ2hhbm5lbE1ldGFUYWdzID0gKHNpdGVUaXRsZSwgc2l0ZUhvc3QsIHNpdGVUd2l0dGVyLCBjaGFubmVsKSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogYCR7bmFtZX0gb24gJHtzaXRlVGl0bGV9YH0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IGAke25hbWV9LCBhIGNoYW5uZWwgb24gJHtzaXRlVGl0bGV9YH0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5J30sXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldE1ldGFUYWdzID0gKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKSA9PiB7XG4gIGNvbnN0IHsgY2xhaW1EYXRhIH0gPSBhc3NldDtcbiAgY29uc3QgeyBjb250ZW50VHlwZSB9ID0gY2xhaW1EYXRhO1xuICBjb25zdCBlbWJlZFVybCA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfWA7XG4gIGNvbnN0IHNob3dVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzb3VyY2UgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX0uJHtjbGFpbURhdGEuZmlsZUV4dH1gO1xuICBjb25zdCBvZ1RpdGxlID0gY2xhaW1EYXRhLnRpdGxlIHx8IGNsYWltRGF0YS5uYW1lO1xuICBjb25zdCBvZ0Rlc2NyaXB0aW9uID0gY2xhaW1EYXRhLmRlc2NyaXB0aW9uIHx8IGRlZmF1bHREZXNjcmlwdGlvbjtcbiAgY29uc3Qgb2dUaHVtYm5haWxDb250ZW50VHlwZSA9IGRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUoY2xhaW1EYXRhLnRodW1ibmFpbCk7XG4gIGNvbnN0IG9nVGh1bWJuYWlsID0gY2xhaW1EYXRhLnRodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsO1xuICBjb25zdCBtZXRhVGFncyA9IFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IG9nVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNob3dVcmx9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBvZ0Rlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICdvZzppbWFnZTp3aWR0aCcsIGNvbnRlbnQ6IDYwMH0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6aGVpZ2h0JywgY29udGVudDogMzE1fSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gIF07XG4gIGlmIChjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL21wNCcgfHwgY29udGVudFR5cGUgPT09ICd2aWRlby93ZWJtJykge1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW8nLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvOnNlY3VyZV91cmwnLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvOnR5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBvZ1RodW1ibmFpbH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IG9nVGh1bWJuYWlsQ29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAndmlkZW8nfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAncGxheWVyJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXInLCBjb250ZW50OiBlbWJlZFVybH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6d2lkdGgnLCBjb250ZW50OiA2MDB9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6dGV4dDpwbGF5ZXJfd2lkdGgnLCBjb250ZW50OiA2MDB9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOmhlaWdodCcsIGNvbnRlbnQ6IDMzN30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpzdHJlYW06Y29udGVudF90eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgfSBlbHNlIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZTp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAnYXJ0aWNsZSd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5X2xhcmdlX2ltYWdlJ30pO1xuICB9XG4gIHJldHVybiBtZXRhVGFncztcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNZXRhVGFncyA9IChzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgY2hhbm5lbCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKSA9PiB7XG4gIGlmIChhc3NldCkge1xuICAgIHJldHVybiBjcmVhdGVBc3NldE1ldGFUYWdzKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbE1ldGFUYWdzKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBjaGFubmVsKTtcbiAgfTtcbiAgcmV0dXJuIGNyZWF0ZUJhc2ljTWV0YVRhZ3Moc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlcik7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL21ldGFUYWdzLmpzIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVBhZ2VUaXRsZSA9IChzaXRlVGl0bGUsIHBhZ2VUaXRsZSkgPT4ge1xuICBpZiAoIXBhZ2VUaXRsZSkge1xuICAgIHJldHVybiBgJHtzaXRlVGl0bGV9YDtcbiAgfVxuICByZXR1cm4gYCR7c2l0ZVRpdGxlfSAtICR7cGFnZVRpdGxlfWA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3BhZ2VUaXRsZS5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTG9nZ2VkSW5DaGFubmVsIChuYW1lLCBzaG9ydElkLCBsb25nSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICBzaG9ydElkLFxuICAgICAgbG9uZ0lkLFxuICAgIH0sXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbGUgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfU0VMRUNURUQsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckZpbGUgKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9DTEVBUixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLk1FVEFEQVRBX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDbGFpbSAodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNMQUlNX1VQREFURSxcbiAgICBkYXRhOiB2YWx1ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQdWJsaXNoSW5DaGFubmVsIChjaGFubmVsKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMLFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHVibGlzaFN0YXR1cyAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgc3RhdHVzLFxuICAgICAgbWVzc2FnZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVycm9yIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRVJST1JfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCAoY2hhbm5lbE5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IGNoYW5uZWxOYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1ldGFkYXRhSW5wdXRzIChzaG93TWV0YWRhdGFJbnB1dHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFMsXG4gICAgZGF0YTogc2hvd01ldGFkYXRhSW5wdXRzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3VGh1bWJuYWlsIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5USFVNQk5BSUxfTkVXLFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQdWJsaXNoIChoaXN0b3J5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVJULFxuICAgIGRhdGE6IHsgaGlzdG9yeSB9LFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvcHVibGlzaC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhcic7XG5pbXBvcnQgSW5hY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhcic7XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiYXJzICAgICAgIDogW10sXG4gICAgICBpbmRleCAgICAgIDogMCxcbiAgICAgIGluY3JlbWVudGVyOiAxLFxuICAgIH07XG4gICAgdGhpcy5jcmVhdGVCYXJzID0gdGhpcy5jcmVhdGVCYXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyID0gdGhpcy5zdGFydFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhciA9IHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhciA9IHRoaXMuc3RvcFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuY3JlYXRlQmFycygpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNyZWF0ZUJhcnMgKCkge1xuICAgIGNvbnN0IGJhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnByb3BzLnNpemU7IGkrKykge1xuICAgICAgYmFycy5wdXNoKHtpc0FjdGl2ZTogZmFsc2V9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGJhcnMgfSk7XG4gIH1cbiAgc3RhcnRQcm9ncmVzc0JhciAoKSB7XG4gICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKSwgMzAwKTtcbiAgfTtcbiAgdXBkYXRlUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuaW5kZXg7XG4gICAgbGV0IGluY3JlbWVudGVyID0gdGhpcy5zdGF0ZS5pbmNyZW1lbnRlcjtcbiAgICBsZXQgYmFycyA9IHRoaXMuc3RhdGUuYmFycztcbiAgICAvLyBmbGlwIGluY3JlbWVudGVyIGlmIG5lY2Vzc2FyeSwgdG8gc3RheSBpbiBib3VuZHNcbiAgICBpZiAoKGluZGV4IDwgMCkgfHwgKGluZGV4ID4gdGhpcy5wcm9wcy5zaXplKSkge1xuICAgICAgaW5jcmVtZW50ZXIgPSBpbmNyZW1lbnRlciAqIC0xO1xuICAgICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB0aGUgaW5kZXhlZCBiYXJcbiAgICBpZiAoaW5jcmVtZW50ZXIgPiAwKSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgICAvLyBpbmNyZW1lbnQgaW5kZXhcbiAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGJhcnMsXG4gICAgICBpbmNyZW1lbnRlcixcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuICBzdG9wUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gIH07XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnN0YXRlLmJhcnMubWFwKChiYXIsIGluZGV4KSA9PiBiYXIuaXNBY3RpdmUgPyA8QWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9IC8+IDogPEluYWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9Lz4pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuUHJvZ3Jlc3NCYXIucHJvcFR5cGVzID0ge1xuICBzaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5cbmNsYXNzIEVycm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8cD57ZXJyb3J9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbkVycm9yUGFnZS5wcm9wVHlwZXMgPSB7XG4gIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvclBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvRXJyb3JQYWdlL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnRcIlxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gTXlzcWxDb25maWcgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHtkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkfSA9IGNvbmZpZztcbiAgICB0aGlzLmRhdGFiYXNlID0gZGF0YWJhc2U7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IE15c3FsQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJmdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNsYWNrIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhbmRsZUVycm9yUmVzcG9uc2U6IGZ1bmN0aW9uIChvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpIHtcbiAgICBsb2dnZXIuZXJyb3IoYEVycm9yIG9uICR7b3JpZ2luYWxVcmx9YCwgbW9kdWxlLmV4cG9ydHMudXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzKGVycm9yKSk7XG4gICAgY29uc3QgW3N0YXR1cywgbWVzc2FnZV0gPSBtb2R1bGUuZXhwb3J0cy5yZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMoZXJyb3IpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyhzdGF0dXMpXG4gICAgICAuanNvbihtb2R1bGUuZXhwb3J0cy5jcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZChzdGF0dXMsIG1lc3NhZ2UpKTtcbiAgfSxcbiAgcmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBsZXQgc3RhdHVzLCBtZXNzYWdlO1xuICAgIC8vIGNoZWNrIGZvciBkYWVtb24gYmVpbmcgdHVybmVkIG9mZlxuICAgIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJykge1xuICAgICAgc3RhdHVzID0gNTAzO1xuICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHJlZnVzZWQuICBUaGUgZGFlbW9uIG1heSBub3QgYmUgcnVubmluZy4nO1xuICAgICAgLy8gZmFsbGJhY2sgZm9yIGV2ZXJ5dGhpbmcgZWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXMgPSA0MDA7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gW3N0YXR1cywgbWVzc2FnZV07XG4gIH0sXG4gIHVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5czogZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGV0IG5ld0Vycm9yT2JqZWN0ID0ge307XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBuZXdFcnJvck9iamVjdFtrZXldID0gZXJyW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdFcnJvck9iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfSxcbiAgY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQgKHN0YXR1cywgbWVzc2FnZSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSwgY2xhaW1JZCkge1xuICAgIGlmIChjaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNoYW5uZWwoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNsYWltKG5hbWUsIGNsYWltSWQpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2xhaW0gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2xhaW0oJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DbGFpbS5nZXRMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltSWRCeUNoYW5uZWwgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDaGFubmVsKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSwgJHtjbGFpbU5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgaWRcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxJZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsSWQsIGRiLkNsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxJZCwgY2xhaW1OYW1lKV0pOyAgLy8gMi4gZ2V0IHRoZSBsb25nIGNsYWltIGlkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxJZCwgbG9uZ0NsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbERhdGEgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBzaG9ydENoYW5uZWxDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgICBzaG9ydENoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyhsb25nQ2hhbm5lbENsYWltSWQpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXldKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiBmb3JtYXQgdGhlIGRhdGEgZm9yIHRoZSB2aWV3LCBpbmNsdWRpbmcgcGFnaW5hdGlvblxuICAgICAgICAgIGxldCBwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEgPSByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheSwgcGFnZSk7XG4gICAgICAgICAgLy8gNC4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvbiBhbmQgY29udGVudHNcbiAgICAgICAgICByZXNvbHZlKHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldExvY2FsRmlsZVJlY29yZCAoY2xhaW1JZCwgbmFtZSkge1xuICAgIHJldHVybiBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7Y2xhaW1JZCwgbmFtZX19KVxuICAgICAgLnRoZW4oZmlsZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIHJldHVybiBOT19GSUxFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlLmRhdGFWYWx1ZXM7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJy4uLy4uL2NsaWVudC9yZWR1Y2Vycy9pbmRleCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnLi4vLi4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleCc7XG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uL2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UuanMnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIpO1xuXG4gIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcblxuICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAvLyBTb21ld2hlcmUgYSBgPFJlZGlyZWN0PmAgd2FzIHJlbmRlcmVkXG4gICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB3ZSdyZSBnb29kLCBzZW5kIHRoZSByZXNwb25zZVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUHVibGlzaFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvcHVibGlzaCc7XG5pbXBvcnQgQ2hhbm5lbFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvY2hhbm5lbCc7XG5pbXBvcnQgU2hvd1JlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2hvdyc7XG5pbXBvcnQgU2l0ZVJlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2l0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGNoYW5uZWw6IENoYW5uZWxSZWR1Y2VyLFxuICBwdWJsaXNoOiBQdWJsaXNoUmVkdWNlcixcbiAgc2hvdyAgIDogU2hvd1JlZHVjZXIsXG4gIHNpdGUgICA6IFNpdGVSZWR1Y2VyLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJleHBvcnQgY29uc3QgRklMRV9TRUxFQ1RFRCA9ICdGSUxFX1NFTEVDVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0NMRUFSID0gJ0ZJTEVfQ0xFQVInO1xuZXhwb3J0IGNvbnN0IE1FVEFEQVRBX1VQREFURSA9ICdNRVRBREFUQV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IENMQUlNX1VQREFURSA9ICdDTEFJTV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFVF9QVUJMSVNIX0lOX0NIQU5ORUwgPSAnU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFUVVNfVVBEQVRFID0gJ1BVQkxJU0hfU1RBVFVTX1VQREFURSc7XG5leHBvcnQgY29uc3QgRVJST1JfVVBEQVRFID0gJ0VSUk9SX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VMRUNURURfQ0hBTk5FTF9VUERBVEUgPSAnU0VMRUNURURfQ0hBTk5FTF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9NRVRBREFUQV9JTlBVVFMgPSAnVE9HR0xFX01FVEFEQVRBX0lOUFVUUyc7XG5leHBvcnQgY29uc3QgVEhVTUJOQUlMX05FVyA9ICdUSFVNQk5BSUxfTkVXJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVJUID0gJ1BVQkxJU0hfU1RBUlQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMX1VQREFURSA9ICdDSEFOTkVMX1VQREFURSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPQ0FMX0NIRUNLID0gJ0xPQ0FMX0NIRUNLJztcbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRSA9ICdVTkFWQUlMQUJMRSc7XG5leHBvcnQgY29uc3QgRVJST1IgPSAnRVJST1InO1xuZXhwb3J0IGNvbnN0IEFWQUlMQUJMRSA9ICdBVkFJTEFCTEUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBkeW5hbWljSW1wb3J0IH0gZnJvbSAndXRpbHMvZHluYW1pY0ltcG9ydCc7XG5pbXBvcnQgQWJvdXRQYWdlIGZyb20gJ3BhZ2VzL0Fib3V0UGFnZSc7XG5pbXBvcnQgTG9naW5QYWdlIGZyb20gJ3BhZ2VzL0xvZ2luUGFnZSc7XG5pbXBvcnQgU2hvd1BhZ2UgZnJvbSAncGFnZXMvU2hvd1BhZ2UnO1xuaW1wb3J0IEZvdXJPaEZvdXJQYWdlIGZyb20gJ2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UnO1xuY29uc3QgSG9tZVBhZ2UgPSBkeW5hbWljSW1wb3J0KCdwYWdlcy9Ib21lUGFnZScpOyAvLyBvciB1c2UgdGhlIHByb3ZpZGVkIGxvY2FsIGhvbWVwYWdlXG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3dpdGNoPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17SG9tZVBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2Fib3V0JyBjb21wb25lbnQ9e0Fib3V0UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvbG9naW4nIGNvbXBvbmVudD17TG9naW5QYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy86aWRlbnRpZmllci86Y2xhaW0nIGNvbXBvbmVudD17U2hvd1BhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBjb21wb25lbnQ9e0ZvdXJPaEZvdXJQYWdlfSAvPlxuICAgIDwvU3dpdGNoPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwcC5qcyIsInZhciBtYXAgPSB7XG5cdFwiLi9jYW5vbmljYWxMaW5rXCI6IDIwLFxuXHRcIi4vY2Fub25pY2FsTGluay5qc1wiOiAyMCxcblx0XCIuL2R5bmFtaWNJbXBvcnRcIjogMTksXG5cdFwiLi9keW5hbWljSW1wb3J0LmpzXCI6IDE5LFxuXHRcIi4vZmlsZVwiOiA0NSxcblx0XCIuL2ZpbGUuanNcIjogNDUsXG5cdFwiLi9sYnJ5VXJpXCI6IDIxLFxuXHRcIi4vbGJyeVVyaS5qc1wiOiAyMSxcblx0XCIuL21ldGFUYWdzXCI6IDIyLFxuXHRcIi4vbWV0YVRhZ3MuanNcIjogMjIsXG5cdFwiLi9wYWdlVGl0bGVcIjogMjMsXG5cdFwiLi9wYWdlVGl0bGUuanNcIjogMjMsXG5cdFwiLi9wdWJsaXNoXCI6IDQ2LFxuXHRcIi4vcHVibGlzaC5qc1wiOiA0Nixcblx0XCIuL3JlcXVlc3RcIjogNixcblx0XCIuL3JlcXVlc3QuanNcIjogNixcblx0XCIuL3ZhbGlkYXRlXCI6IDQ3LFxuXHRcIi4vdmFsaWRhdGUuanNcIjogNDdcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA0NDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NsaWVudC91dGlscyBeLiokXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmFsaWRhdGVGaWxlIChmaWxlKSB7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcHJvdmlkZWQnKTtcbiAgICB9XG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgc2l6ZSBhbmQgdHlwZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgR0lGcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZpbGUudHlwZSArICcgaXMgbm90IGEgc3VwcG9ydGVkIGZpbGUgdHlwZS4gT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsImV4cG9ydCBjb25zdCBjcmVhdGVQdWJsaXNoTWV0YWRhdGEgPSAoY2xhaW0sIHsgdHlwZSB9LCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdyB9LCBwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwpID0+IHtcbiAgbGV0IG1ldGFkYXRhID0ge1xuICAgIG5hbWU6IGNsYWltLFxuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGxpY2Vuc2UsXG4gICAgbnNmdyxcbiAgICB0eXBlLFxuICB9O1xuICBpZiAocHVibGlzaEluQ2hhbm5lbCkge1xuICAgIG1ldGFkYXRhWydjaGFubmVsTmFtZSddID0gc2VsZWN0ZWRDaGFubmVsO1xuICB9XG4gIHJldHVybiBtZXRhZGF0YTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQdWJsaXNoRm9ybURhdGEgPSAoZmlsZSwgdGh1bWJuYWlsLCBtZXRhZGF0YSkgPT4ge1xuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcbiAgLy8gYXBwZW5kIGZpbGVcbiAgZmQuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG4gIC8vIGFwcGVuZCB0aHVtYm5haWxcbiAgaWYgKHRodW1ibmFpbCkge1xuICAgIGZkLmFwcGVuZCgndGh1bWJuYWlsJywgdGh1bWJuYWlsKTtcbiAgfVxuICAvLyBhcHBlbmQgbWV0YWRhdGFcbiAgZm9yIChsZXQga2V5IGluIG1ldGFkYXRhKSB7XG4gICAgaWYgKG1ldGFkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGZkLmFwcGVuZChrZXksIG1ldGFkYXRhW2tleV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVGh1bWJuYWlsVXJsID0gKGNoYW5uZWwsIGNoYW5uZWxJZCwgY2xhaW0sIGhvc3QpID0+IHtcbiAgcmV0dXJuIGAke2hvc3R9LyR7Y2hhbm5lbH06JHtjaGFubmVsSWR9LyR7Y2xhaW19LXRodW1iLnBuZ2A7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3B1Ymxpc2guanMiLCJleHBvcnQgY29uc3QgdmFsaWRhdGVDaGFubmVsU2VsZWN0aW9uID0gKHB1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgbG9nZ2VkSW5DaGFubmVsKSA9PiB7XG4gIGlmIChwdWJsaXNoSW5DaGFubmVsICYmIChzZWxlY3RlZENoYW5uZWwgIT09IGxvZ2dlZEluQ2hhbm5lbC5uYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTG9nIGluIHRvIGEgY2hhbm5lbCBvciBzZWxlY3QgQW5vbnltb3VzJyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVB1Ymxpc2hQYXJhbXMgPSAoZmlsZSwgY2xhaW0sIHVybEVycm9yKSA9PiB7XG4gIGlmICghZmlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGNob29zZSBhIGZpbGUnKTtcbiAgfVxuICBpZiAoIWNsYWltKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgZW50ZXIgYSBVUkwnKTtcbiAgfVxuICBpZiAodXJsRXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpeCB0aGUgdXJsJyk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvdmFsaWRhdGUuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5mdW5jdGlvbiBMb2dvICgpIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZlcnNpb249JzEuMScgaWQ9J0xheWVyXzEnIHg9JzBweCcgeT0nMHB4JyBoZWlnaHQ9JzI0cHgnIHZpZXdCb3g9JzAgMCA4MCAzMScgZW5hYmxlQmFja2dyb3VuZD0nbmV3IDAgMCA4MCAzMScgY2xhc3NOYW1lPSduYXYtYmFyLWxvZ28nPlxuICAgICAgPExpbmsgdG89Jy8nPlxuICAgICAgICA8dGl0bGU+TG9nbzwvdGl0bGU+XG4gICAgICAgIDxkZXNjPlNwZWUuY2ggbG9nbzwvZGVzYz5cbiAgICAgICAgPGcgaWQ9J0Fib3V0Jz5cbiAgICAgICAgICA8ZyBpZD0nUHVibGlzaC1Gb3JtLVYyLV94MjhfZmlsbGVkX3gyOV8nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC00Mi4wMDAwMDAsIC0yMy4wMDAwMDApJz5cbiAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNDIuMDAwMDAwLCAyMi4wMDAwMDApJz5cbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPSdtYXRyaXgoMSAwIDAgMSAwIDIwKScgZm9udFNpemU9JzI1JyBmb250RmFtaWx5PSdSb2JvdG8nPlNwZWUmbHQ7aDwvdGV4dD5cbiAgICAgICAgICAgICAgPGcgaWQ9J0dyb3VwLTE2JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMzAuMDAwMDAwKSc+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDlGOTExJyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHknIGZpbGw9J25vbmUnIHN0cm9rZT0nIzAyOUQ3NCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTE2LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS0yJyBmaWxsPSdub25lJyBzdHJva2U9JyNFMzVCRDgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00zMi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMycgZmlsbD0nbm9uZScgc3Ryb2tlPScjNDE1NkM1JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNNDguNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTQnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzYzNTY4OCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTY0LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L0xpbms+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBOYXZCYXJDaGFubmVsRHJvcGRvd24gKHsgY2hhbm5lbE5hbWUsIGhhbmRsZVNlbGVjdGlvbiwgZGVmYXVsdFNlbGVjdGlvbiwgVklFVywgTE9HT1VUIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93IGxpbmstLW5hdicgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdGlvbn0gdmFsdWU9e2RlZmF1bHRTZWxlY3Rpb259PlxuICAgICAgPG9wdGlvbiBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e2NoYW5uZWxOYW1lfTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17VklFV30+Vmlldzwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17TE9HT1VUfT5Mb2dvdXQ8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkJhckNoYW5uZWxEcm9wZG93bjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJbmFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0taW5hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluYWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4IiwiZXhwb3J0IGNvbnN0IENIQU5ORUwgPSAnQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgQVNTRVRfTElURSA9ICdBU1NFVF9MSVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9ERVRBSUxTID0gJ0FTU0VUX0RFVEFJTFMnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IGZpbGVSZXF1ZXN0ZWQgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgZXJyb3IgYW5kIHN0YXR1c1xuICBjb25zdCBlcnJvciAgPSBzaG93LmRpc3BsYXlBc3NldC5lcnJvcjtcbiAgY29uc3Qgc3RhdHVzID0gc2hvdy5kaXNwbGF5QXNzZXQuc3RhdHVzO1xuICAvLyBzZWxlY3QgYXNzZXRcbiAgY29uc3QgYXNzZXQgPSBzZWxlY3RBc3NldChzaG93KTtcbiAgLy8gIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGVycm9yLFxuICAgIHN0YXR1cyxcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkZpbGVSZXF1ZXN0OiAobmFtZSwgY2xhaW1JZCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmlsZVJlcXVlc3RlZChuYW1lLCBjbGFpbUlkKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7c2l0ZToge2RlZmF1bHRzOiB7IGRlZmF1bHRUaHVtYm5haWwgfX19KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpID0+IHtcbiAgLy8gdGFrZSB0aGUgaHRtbCBhbmQgcHJlbG9hZGVkU3RhdGUgYW5kIHJldHVybiB0aGUgZnVsbCBwYWdlXG4gIHJldHVybiBgXG4gICAgPCFET0NUWVBFIGh0bWw+XG4gICAgPGh0bWwgbGFuZz1cImVuXCIgcHJlZml4PVwib2c6IGh0dHA6Ly9vZ3AubWUvbnMjIGZiOiBodHRwOi8vb2dwLm1lL25zL2ZiI1wiPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MSwgdXNlci1zY2FsYWJsZT1ub1wiPlxuICAgICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJpZT1lZGdlXCI+XG4gICAgICAgICAgICA8IS0taGVsbWV0LS0+XG4gICAgICAgICAgICAke2hlbG1ldC50aXRsZS50b1N0cmluZygpfVxuICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgJHtoZWxtZXQubGluay50b1N0cmluZygpfVxuICAgICAgICAgICAgPCEtLXN0eWxlIHNoZWV0cy0tPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9yZXNldC5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvZ2VuZXJhbC5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvbWVkaWFRdWVyaWVzLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPCEtLWdvb2dsZSBmb250LS0+XG4gICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzozMDBcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgICAgIDwvaGVhZD5cbiAgICAgICAgPGJvZHkgaWQ9XCJtYWluLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicmVhY3QtYXBwXCIgY2xhc3M9XCJyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW5cIj4ke2h0bWx9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzY3JpcHQ+XG4gICAgICAgICAgICAgICAgd2luZG93Ll9fUFJFTE9BREVEX1NUQVRFX18gPSAke0pTT04uc3RyaW5naWZ5KHByZWxvYWRlZFN0YXRlKS5yZXBsYWNlKC88L2csICdcXFxcXFx1MDAzYycpfVxuICAgICAgICAgICAgPC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cIi9idW5kbGUvYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gIGA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvcmVuZGVyRnVsbFBhZ2UuanMiLCJleHBvcnQgY29uc3Qgc2VsZWN0U2l0ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFNpdGVIb3N0ID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlLmhvc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NlbGVjdG9ycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VydmVyID0gcmVxdWlyZSgnc2VydmVyL3NlcnZlci5qcycpO1xyXG5jb25zdCBDb21wb25lbnRzID0gcmVxdWlyZSgnY2xpZW50L2NvbXBvbmVudHMnKTtcclxuLy8gY29uc3QgY29udGFpbmVycyA9IHJlcXVpcmUoJ2NsaWVudC9jb250YWluZXJzJyk7XHJcbi8vIGNvbnN0IHBhZ2VzID0gcmVxdWlyZSgnY2xpZW50L3BhZ2VzJyk7XHJcblxyXG5jb25zdCBleHBvcnRzID0ge1xyXG4gIFNlcnZlcixcclxuICBDb21wb25lbnRzLFxyXG4gIC8vIGNvbnRhaW5lcnMsXHJcbiAgLy8gcGFnZXMsXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NwZWVjaC5qcyIsIi8vIGFwcCBkZXBlbmRlbmNpZXNcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IGV4cHJlc3NIYW5kbGViYXJzID0gcmVxdWlyZSgnZXhwcmVzcy1oYW5kbGViYXJzJyk7XG5jb25zdCBIYW5kbGViYXJzID0gcmVxdWlyZSgnaGFuZGxlYmFycycpO1xuY29uc3QgaGVsbWV0ID0gcmVxdWlyZSgnaGVsbWV0Jyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5jb25zdCB7IHNlcmlhbGl6ZVNwZWVjaFVzZXIsIGRlc2VyaWFsaXplU3BlZWNoVXNlciB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzJyk7XG5jb25zdCBjb29raWVTZXNzaW9uID0gcmVxdWlyZSgnY29va2llLXNlc3Npb24nKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG4vLyBsb2dnaW5nIGRlcGVuZGVuY2llc1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTZXJ2ZXIgKCkge1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKG15c3FsQ29uZmlnKSA9PiB7XG4gICAgcmVxdWlyZSgnLi4vY29uZmlnL215c3FsQ29uZmlnLmpzJykuY29uZmlndXJlKG15c3FsQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTaXRlID0gKHNpdGVDb25maWcpID0+IHtcbiAgICByZXF1aXJlKCcuLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpLmNvbmZpZ3VyZShzaXRlQ29uZmlnKTtcbiAgICBjb25zb2xlLmxvZyhyZXF1aXJlKCcuLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpKTtcbiAgICB0aGlzLnNlc3Npb25LZXkgPSBzaXRlQ29uZmlnLmF1dGguc2Vzc2lvbktleTtcbiAgICB0aGlzLlBPUlQgPSBzaXRlQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTbGFjayA9IChzbGFja0NvbmZpZykgPT4ge1xuICAgIHJlcXVpcmUoJy4uL2NvbmZpZy9zbGFja0NvbmZpZy5qcycpLmNvbmZpZ3VyZShzbGFja0NvbmZpZyk7XG4gIH07XG4gIHRoaXMuY3JlYXRlQXBwID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBhbiBFeHByZXNzIGFwcGxpY2F0aW9uXG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gICAgLy8gdHJ1c3QgdGhlIHByb3h5IHRvIGdldCBpcCBhZGRyZXNzIGZvciB1c1xuICAgIGFwcC5lbmFibGUoJ3RydXN0IHByb3h5Jyk7XG5cbiAgICAvLyBhZGQgbWlkZGxld2FyZVxuICAgIGFwcC51c2UoaGVsbWV0KCkpOyAvLyBzZXQgSFRUUCBoZWFkZXJzIHRvIHByb3RlY3QgYWdhaW5zdCB3ZWxsLWtub3duIHdlYiB2dWxuZXJhYmlsdGllc1xuICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMoYCR7X19kaXJuYW1lfS9wdWJsaWNgKSk7IC8vICdleHByZXNzLnN0YXRpYycgdG8gc2VydmUgc3RhdGljIGZpbGVzIGZyb20gcHVibGljIGRpcmVjdG9yeVxuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL2pzb25cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTsgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4geyAgLy8gY3VzdG9tIGxvZ2dpbmcgbWlkZGxld2FyZSB0byBsb2cgYWxsIGluY29taW5nIGh0dHAgcmVxdWVzdHNcbiAgICAgIGxvZ2dlci52ZXJib3NlKGBSZXF1ZXN0IG9uICR7cmVxLm9yaWdpbmFsVXJsfSBmcm9tICR7cmVxLmlwfWApO1xuICAgICAgbmV4dCgpO1xuICAgIH0pO1xuXG4gICAgLy8gY29uZmlndXJlIHBhc3Nwb3J0XG4gICAgcGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVTcGVlY2hVc2VyKTtcbiAgICBwYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZGVzZXJpYWxpemVTcGVlY2hVc2VyKTtcbiAgICBjb25zdCBsb2NhbFNpZ251cFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMnKTtcbiAgICBjb25zdCBsb2NhbExvZ2luU3RyYXRlZ3kgPSByZXF1aXJlKCcuL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzJyk7XG4gICAgcGFzc3BvcnQudXNlKCdsb2NhbC1zaWdudXAnLCBsb2NhbFNpZ251cFN0cmF0ZWd5KTtcbiAgICBwYXNzcG9ydC51c2UoJ2xvY2FsLWxvZ2luJywgbG9jYWxMb2dpblN0cmF0ZWd5KTtcbiAgICAvLyBpbml0aWFsaXplIHBhc3Nwb3J0XG4gICAgYXBwLnVzZShjb29raWVTZXNzaW9uKHtcbiAgICAgIG5hbWUgIDogJ3Nlc3Npb24nLFxuICAgICAga2V5cyAgOiBbdGhpcy5zZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2Utcm91dGVzLmpzJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcycpKGFwcCk7XG5cbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfTtcbiAgdGhpcy5pbml0aWFsaXplID0gKCkgPT4ge1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVMb2dnZXIuanMnKShsb2dnZXIpO1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVTbGFjay5qcycpKGxvZ2dlcik7XG4gICAgdGhpcy5jcmVhdGVBcHAoKTtcbiAgICB0aGlzLnNlcnZlciA9IGh0dHAuU2VydmVyKHRoaXMuYXBwKTtcbiAgfTtcbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCBkYiA9IHJlcXVpcmUoJy4vbW9kZWxzL2luZGV4Jyk7XG4gICAgLy8gc3luYyBzZXF1ZWxpemVcbiAgICBkYi5zZXF1ZWxpemUuc3luYygpXG4gICAgICAvLyBzdGFydCB0aGUgc2VydmVyXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VydmVyLmxpc3Rlbih0aGlzLlBPUlQsICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBQT1JUICR7dGhpcy5QT1JUfWApO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgU3RhcnR1cCBFcnJvcjpgLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VydmVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGxvZ2dlci5kZWJ1Zygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBsb2dnZXIuZGVidWcoJ2Rlc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImF4aW9zXCJcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxicnlDb25maWcgPSB7XG4gIGFwaToge1xuICAgIGFwaUhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgIGFwaVBvcnQ6ICc1Mjc5JyxcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbGJyeUNvbmZpZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5pdmVyc2FsLWFuYWx5dGljc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIlxuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENlcnRpZmljYXRlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2VydGlmaWNhdGUnLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBrZXlUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwdWJsaWNLZXk6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2VydGlmaWNhdGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENlcnRpZmljYXRlLmJlbG9uZ3NUbyhkYi5DaGFubmVsLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChsb25nQ2hhbm5lbElkLCBjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCAke2NoYW5uZWxOYW1lfToke2xvbmdDaGFubmVsSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7bmFtZTogY2hhbm5lbE5hbWV9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwocykgZm91bmQgd2l0aCB0aGF0IGNoYW5uZWwgbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGxvbmdDaGFubmVsSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSAgIDogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtjaGFubmVsQ2xhaW1JZH0lYCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKCR7Y2hhbm5lbE5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjaGFubmVsTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS52YWxpZGF0ZUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgdmFsaWRhdGVMb25nQ2hhbm5lbElkKCR7bmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCAmJiAoY2hhbm5lbENsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDbGFpbUlkICYmIGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA8IDQwKSB7ICAvLyBpZiBhIHNob3J0IGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZShjaGFubmVsTmFtZSk7ICAvLyBpZiBubyBjaGFubmVsIGlkIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDZXJ0aWZpY2F0ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IENoYW5uZWwgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDaGFubmVsJyxcbiAgICB7XG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsQ2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENoYW5uZWwuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENoYW5uZWwuYmVsb25nc1RvKGRiLlVzZXIpO1xuICAgIENoYW5uZWwuaGFzT25lKGRiLkNlcnRpZmljYXRlKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIgfSkgPT4ge1xuICBjb25zdCBGaWxlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnRmlsZScsXG4gICAge1xuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICAgIDogSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdCAgOiAwLFxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVQYXRoOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVUeXBlOiB7XG4gICAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB0cmVuZGluZ0VsaWdpYmxlOiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgRmlsZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgRmlsZS5oYXNNYW55KGRiLlJlcXVlc3QpO1xuICAgIEZpbGUuaGFzT25lKGRiLkNsYWltKTtcbiAgfTtcblxuICBGaWxlLmdldFJlY2VudENsYWltcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWxsKHtcbiAgICAgIHdoZXJlOiB7IG5zZnc6IGZhbHNlLCB0cmVuZGluZ0VsaWdpYmxlOiB0cnVlIH0sXG4gICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICBsaW1pdDogMjUsXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEZpbGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9maWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgVEVYVCB9KSA9PiB7XG4gIGNvbnN0IFJlcXVlc3QgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdSZXF1ZXN0JyxcbiAgICB7XG4gICAgICBhY3Rpb246IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdXJsOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGlwQWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICB0eXBlICAgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBSZXF1ZXN0LmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBSZXF1ZXN0LmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJlcXVlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiY3J5cHRcIlxuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5cbmNvbnN0IHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyA9ICh1c2VySW5zdGFuY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICB1c2VySW5mb1snaWQnXSA9IHVzZXJJbnN0YW5jZS5pZDtcbiAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IHVzZXJJbnN0YW5jZS51c2VyTmFtZTtcbiAgICB1c2VySW5zdGFuY2VcbiAgICAgIC5nZXRDaGFubmVsKClcbiAgICAgIC50aGVuKCh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSkgPT4ge1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChjaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmVzb2x2ZSh1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIHJldHVybiBkYi5Vc2VyXG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7dXNlck5hbWU6IHVzZXJuYW1lfSxcbiAgICAgIH0pXG4gICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZChwYXNzd29yZClcbiAgICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1Bhc3N3b3JkIHdhcyBhIG1hdGNoLCByZXR1cm5pbmcgVXNlcicpO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblVzZXJBbmRDaGFubmVsSW5mbyh1c2VyKVxuICAgICAgICAgICAgICAudGhlbih1c2VySW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9LFxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9wYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIGZvciBzaWduIHVwXG4gIGFwcC5wb3N0KCcvc2lnbnVwJywgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1zaWdudXAnKSwgKHJlcSwgcmVzKSA9PiB7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYHN1Y2Nlc3NmdWwgc2lnbnVwIGZvciAke3JlcS51c2VyLmNoYW5uZWxOYW1lfWApO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgZm9yIGxvZyBpblxuICBhcHAucG9zdCgnL2xvZ2luJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1sb2dpbicsIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgIH1cbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2U6IGluZm8ubWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZGVidWcoJ3N1Y2Nlc3NmdWwgbG9naW4nKTtcbiAgICAgIHJlcS5sb2dJbih1c2VyLCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgc3VjY2VzcyAgICAgICA6IHRydWUsXG4gICAgICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICBzaG9ydENoYW5uZWxJZDogcmVxLnVzZXIuc2hvcnRDaGFubmVsSWQsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSkocmVxLCByZXMsIG5leHQpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gbG9nIG91dFxuICBhcHAuZ2V0KCcvbG9nb3V0JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVxLmxvZ291dCgpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiAneW91IHN1Y2Nlc3NmdWxseSBsb2dnZWQgb3V0J30pO1xuICB9KTtcbiAgLy8gc2VlIGlmIHVzZXIgaXMgYXV0aGVudGljYXRlZCwgYW5kIHJldHVybiBjcmVkZW50aWFscyBpZiBzb1xuICBhcHAuZ2V0KCcvdXNlcicsIChyZXEsIHJlcykgPT4ge1xuICAgIGlmIChyZXEudXNlcikge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS51c2VyfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbid9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyB1cGxvYWREaXJlY3RvcnkgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gbXVsdGlwYXJ0KHt1cGxvYWREaXI6IHVwbG9hZERpcmVjdG9yeX0pO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSwgcHVibGlzaCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgZ2V0Q2xhaW1MaXN0LCByZXNvbHZlVXJpLCBnZXRDbGFpbSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhLCBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCBlcnJvckhhbmRsZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCcuLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzJyk7XG5jb25zdCB7IGdldENoYW5uZWxEYXRhLCBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkobmFtZSlcbiAgICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNob3J0SWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvZGF0YS86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gICAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICAgIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICAgIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBydW4gYSBjbGFpbV9saXN0IHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihjbGFpbXNMaXN0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhbiBhc3NldFxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0obmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgICAgaWYgKCFyZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmlsZURhdGEgPSBjcmVhdGVGaWxlRGF0YShyZXNvbHZlUmVzdWx0KTtcbiAgICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZURhdGEsIHtuYW1lLCBjbGFpbUlkfSwgJ0ZpbGUnKSwgZ2V0UmVzdWx0XSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2UsIGNvbXBsZXRlZCB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9yZXNvbHZlLzpuYW1lLzpjbGFpbUlkJywgKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgICAgLnRoZW4ocmVzb2x2ZWRVcmkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHJ1biBhIHB1Ymxpc2ggcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCAoeyBib2R5LCBmaWxlcywgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCB1c2VyIH0sIHJlcykgPT4ge1xuICAgIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAgIC8vIHJlY29yZCB0aGUgc3RhcnQgdGltZSBvZiB0aGUgcmVxdWVzdFxuICAgIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgICB0cnkge1xuICAgICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAgICh7ZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZX0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMoZmlsZXMpKTtcbiAgICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIGF1dGhlbnRpY2F0ZVVzZXIoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSxcbiAgICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpLFxuICAgICAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCksXG4gICAgICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zKHRodW1ibmFpbEZpbGVQYXRoLCBuYW1lLCBsaWNlbnNlLCBuc2Z3KSxcbiAgICBdKVxuICAgICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICAgIHB1Ymxpc2godGh1bWJuYWlsUHVibGlzaFBhcmFtcywgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgICByZXR1cm4gcHVibGlzaChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICAgIGRhdGEgICA6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgICB1cmwgICAgOiBgJHtob3N0fS8ke3Jlc3VsdC5jbGFpbV9pZH0vJHtuYW1lfWAsXG4gICAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL2xvbmctaWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2JvZHk6JywgYm9keSk7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICAgIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgICBjb25zdCBjbGFpbU5hbWUgPSBib2R5LmNsYWltTmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gICAgbGV0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oY2xhaW1JbmZvID0+IHtcbiAgICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcbiAgYXBwLmdldCgnL2FwaS9maWxlL2F2YWlsYWJpbGl0eS86bmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgZGIuRmlsZS5maW5kT25lKHt3aGVyZToge25hbWUsIGNsYWltSWR9fSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS1yb3V0ZXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW11bHRpcGFydHlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIlxuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW5kZXgnKTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHB1Ymxpc2hIZWxwZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHByaW1hcnlDbGFpbUFkZHJlc3MsIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBPcCA9IFNlcXVlbGl6ZS5PcDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2ggKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgcHVibGlzaFJlc3VsdHMsIGNlcnRpZmljYXRlSWQsIGNoYW5uZWxOYW1lO1xuICAgICAgLy8gcHVibGlzaCB0aGUgZmlsZVxuICAgICAgcmV0dXJuIGxicnlBcGkucHVibGlzaENsYWltKHB1Ymxpc2hQYXJhbXMpXG4gICAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU3VjY2Vzc2Z1bGx5IHB1Ymxpc2hlZCAke3B1Ymxpc2hQYXJhbXMubmFtZX0gJHtmaWxlTmFtZX1gLCB0eCk7XG4gICAgICAgICAgcHVibGlzaFJlc3VsdHMgPSB0eDtcbiAgICAgICAgICAvLyBnZXQgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBpZiAocHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgdGhpcyBjbGFpbSB3YXMgcHVibGlzaGVkIGluIGNoYW5uZWw6ICR7cHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gZGIuQ2hhbm5lbC5maW5kT25lKHt3aGVyZToge2NoYW5uZWxOYW1lOiBwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX19KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCd0aGlzIGNsYWltIHdhcyBub3QgcHVibGlzaGVkIGluIGEgY2hhbm5lbCcpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgLy8gc2V0IGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gbnVsbDtcbiAgICAgICAgICBjaGFubmVsTmFtZSA9IG51bGw7XG4gICAgICAgICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBjaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUgPSBjaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoYGNlcnRpZmljYXRlSWQ6ICR7Y2VydGlmaWNhdGVJZH1gKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIEZpbGUgcmVjb3JkXG4gICAgICAgICAgY29uc3QgZmlsZVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICBmaWxlUGF0aCAgIDogcHVibGlzaFBhcmFtcy5maWxlX3BhdGgsXG4gICAgICAgICAgICBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyBjcmVhdGUgdGhlIENsYWltIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGNsYWltUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgdGh1bWJuYWlsICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGh1bWJuYWlsLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgICAgYW1vdW50ICAgICA6IHB1Ymxpc2hQYXJhbXMuYmlkLFxuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCxcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IGNyaXRlcmlhXG4gICAgICAgICAgY29uc3QgdXBzZXJ0Q3JpdGVyaWEgPSB7XG4gICAgICAgICAgICBuYW1lICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCB0aGUgcmVjb3Jkc1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVSZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnRmlsZScpLCBkYi51cHNlcnQoZGIuQ2xhaW0sIGNsYWltUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0NsYWltJyldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtmaWxlLCBjbGFpbV0pID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGUuc2V0Q2xhaW0oY2xhaW0pLCBjbGFpbS5zZXRGaWxlKGZpbGUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgICByZXNvbHZlKHB1Ymxpc2hSZXN1bHRzKTsgLy8gcmVzb2x2ZSB0aGUgcHJvbWlzZSB3aXRoIHRoZSByZXN1bHQgZnJvbSBsYnJ5QXBpLnB1Ymxpc2hDbGFpbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ1BVQkxJU0ggRVJST1InLCBlcnJvcik7XG4gICAgICAgICAgcHVibGlzaEhlbHBlcnMuZGVsZXRlVGVtcG9yYXJ5RmlsZShwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCk7IC8vIGRlbGV0ZSB0aGUgbG9jYWwgZmlsZVxuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjbGFpbU5hbWVJc0F2YWlsYWJsZSAobmFtZSkge1xuICAgIGNvbnN0IGNsYWltQWRkcmVzc2VzID0gYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIHx8IFtdO1xuICAgIGNsYWltQWRkcmVzc2VzLnB1c2gocHJpbWFyeUNsYWltQWRkcmVzcyk7XG4gICAgLy8gZmluZCBhbnkgcmVjb3JkcyB3aGVyZSB0aGUgbmFtZSBpcyB1c2VkXG4gICAgcmV0dXJuIGRiLkNsYWltXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFsnYWRkcmVzcyddLFxuICAgICAgICB3aGVyZSAgICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICBbT3Aub3JdOiBjbGFpbUFkZHJlc3NlcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2xhaW0gaXMgYWxyZWFkeSBpbiB1c2UnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IChuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkNoYW5uZWxcbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgY2hhbm5lbE5hbWU6IG5hbWUgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNoYW5uZWwgaGFzIGFscmVhZHkgYmVlbiBjbGFpbWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRoZW50aWNhdGVVc2VyIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpIHtcbiAgICAvLyBjYXNlOiBubyBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCAoYW5vbnltb3VzKSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVzZXIgdG9rZW4gaXMgcHJvdmlkZWRcbiAgICBpZiAoIWNoYW5uZWxOYW1lICYmICFjaGFubmVsSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiBudWxsLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggdXNlciB0b2tlblxuICAgIGlmICh1c2VyKSB7XG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbE5hbWUgIT09IHVzZXIuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBuYW1lIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFubmVsSWQgJiYgY2hhbm5lbElkICE9PSB1c2VyLmNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgaWQgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiB1c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCBwYXNzd29yZCBpbnN0ZWFkIG9mIHVzZXIgdG9rZW5cbiAgICBpZiAoIWNoYW5uZWxQYXNzd29yZCkgdGhyb3cgbmV3IEVycm9yKCdubyBjaGFubmVsIHBhc3N3b3JkIHByb3ZpZGVkJyk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyhjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQpO1xuICB9LFxuICBhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIHVzZXJQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBob2lzdGVkIHZhcmlhYmxlc1xuICAgICAgbGV0IGNoYW5uZWxEYXRhO1xuICAgICAgLy8gYnVpbGQgdGhlIHBhcmFtcyBmb3IgZmluZGluZyB0aGUgY2hhbm5lbFxuICAgICAgbGV0IGNoYW5uZWxGaW5kUGFyYW1zID0ge307XG4gICAgICBpZiAoY2hhbm5lbE5hbWUpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICBpZiAoY2hhbm5lbElkKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxJZDtcbiAgICAgIC8vIGZpbmQgdGhlIGNoYW5uZWxcbiAgICAgIGRiLkNoYW5uZWxcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiBjaGFubmVsRmluZFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIGNoYW5uZWwgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGFubmVsRGF0YSA9IGNoYW5uZWwuZ2V0KCk7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIGRhdGE6JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAgIHJldHVybiBkYi5Vc2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgdXNlck5hbWU6IGNoYW5uZWxEYXRhLmNoYW5uZWxOYW1lLnN1YnN0cmluZygxKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZCh1c2VyUGFzc3dvcmQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCcuLi5wYXNzd29yZCB3YXMgYSBtYXRjaC4uLicpO1xuICAgICAgICAgIHJlc29sdmUoY2hhbm5lbERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgQ0xBSU1TX1BFUl9QQUdFID0gMTI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjbGFpbXMsIHBhZ2UpIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxQYWdlcyhjbGFpbXMpO1xuICAgIGNvbnN0IHBhZ2luYXRpb25QYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0UGFnZUZyb21RdWVyeShwYWdlKTtcbiAgICBjb25zdCB2aWV3RGF0YSA9IHtcbiAgICAgIGNoYW5uZWxOYW1lICAgICAgIDogY2hhbm5lbE5hbWUsXG4gICAgICBsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltcyAgICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zKGNsYWltcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgcHJldmlvdXNQYWdlICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVQcmV2aW91c1BhZ2UocGFnaW5hdGlvblBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgICAgICAgOiBwYWdpbmF0aW9uUGFnZSxcbiAgICAgIG5leHRQYWdlICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lTmV4dFBhZ2UodG90YWxQYWdlcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgdG90YWxQYWdlcyAgICAgICAgOiB0b3RhbFBhZ2VzLFxuICAgICAgdG90YWxSZXN1bHRzICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbENsYWltcyhjbGFpbXMpLFxuICAgIH07XG4gICAgcmV0dXJuIHZpZXdEYXRhO1xuICB9LFxuICBnZXRQYWdlRnJvbVF1ZXJ5IChwYWdlKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH0sXG4gIGV4dHJhY3RQYWdlRnJvbUNsYWltcyAoY2xhaW1zLCBwYWdlTnVtYmVyKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiBbXTsgIC8vIGlmIG5vIGNsYWltcywgcmV0dXJuIHRoaXMgZGVmYXVsdFxuICAgIH1cbiAgICAvLyBsb2dnZXIuZGVidWcoJ2NsYWltcyBpcyBhcnJheT8nLCBBcnJheS5pc0FycmF5KGNsYWltcykpO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZyhgcGFnZU51bWJlciAke3BhZ2VOdW1iZXJ9IGlzIG51bWJlcj9gLCBOdW1iZXIuaXNJbnRlZ2VyKHBhZ2VOdW1iZXIpKTtcbiAgICBjb25zdCBjbGFpbVN0YXJ0SW5kZXggPSAocGFnZU51bWJlciAtIDEpICogQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IGNsYWltRW5kSW5kZXggPSBjbGFpbVN0YXJ0SW5kZXggKyBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgcGFnZU9mQ2xhaW1zID0gY2xhaW1zLnNsaWNlKGNsYWltU3RhcnRJbmRleCwgY2xhaW1FbmRJbmRleCk7XG4gICAgcmV0dXJuIHBhZ2VPZkNsYWltcztcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxQYWdlcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3RhbENsYWltcyA9IGNsYWltcy5sZW5ndGg7XG4gICAgICBpZiAodG90YWxDbGFpbXMgPCBDTEFJTVNfUEVSX1BBR0UpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBjb25zdCBmdWxsUGFnZXMgPSBNYXRoLmZsb29yKHRvdGFsQ2xhaW1zIC8gQ0xBSU1TX1BFUl9QQUdFKTtcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHRvdGFsQ2xhaW1zICUgQ0xBSU1TX1BFUl9QQUdFO1xuICAgICAgaWYgKHJlbWFpbmRlciA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnVsbFBhZ2VzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bGxQYWdlcyArIDE7XG4gICAgfVxuICB9LFxuICBkZXRlcm1pbmVQcmV2aW91c1BhZ2UgKGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlIC0gMTtcbiAgfSxcbiAgZGV0ZXJtaW5lTmV4dFBhZ2UgKHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlICsgMTtcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxDbGFpbXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGNsYWltcy5sZW5ndGg7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJjb25zdCB7IGRldGFpbHM6IGhvc3QgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnLi4vaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gcm91dGUgZm9yIHRoZSBob21lIHBhZ2VcbiAgYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gZGlzcGxheSBsb2dpbiBwYWdlXG4gIGFwcC5nZXQoJy9sb2dpbicsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2hvdyAnYWJvdXQnIHBhZ2VcbiAgYXBwLmdldCgnL2Fib3V0JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgdHJlbmRpbmcgaW1hZ2VzXG4gIGFwcC5nZXQoJy90cmVuZGluZycsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zdGF0dXMoMzAxKS5yZWRpcmVjdCgnL3BvcHVsYXInKTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9wb3B1bGFyJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgdHJlbmRpbmcgaW1hZ2VzXG4gIGFwcC5nZXQoJy9uZXcnLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG4gIGFwcC5nZXQoJy9lbWJlZC86Y2xhaW1JZC86bmFtZScsICh7IHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIC8vIGdldCBhbmQgcmVuZGVyIHRoZSBjb250ZW50XG4gICAgcmVzLnN0YXR1cygyMDApLnJlbmRlcignZW1iZWQnLCB7IGxheW91dDogJ2VtYmVkJywgaG9zdCwgY2xhaW1JZCwgbmFtZSB9KTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlLXJvdXRlcy5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPR0lOIH0gZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzJztcbmNvbnN0IHsgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkaXNhYmxlZCAgICAgICAgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWQsXG4gIGRpc2FibGVkTWVzc2FnZSAgIDogcHVibGlzaGluZy5kaXNhYmxlZE1lc3NhZ2UsXG4gIHB1Ymxpc2hJbkNoYW5uZWwgIDogZmFsc2UsXG4gIHNlbGVjdGVkQ2hhbm5lbCAgIDogTE9HSU4sXG4gIHNob3dNZXRhZGF0YUlucHV0czogZmFsc2UsXG4gIHN0YXR1cyAgICAgICAgICAgIDoge1xuICAgIHN0YXR1cyA6IG51bGwsXG4gICAgbWVzc2FnZTogbnVsbCxcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICBmaWxlICAgICAgICAgOiBudWxsLFxuICAgIHVybCAgICAgICAgICA6IG51bGwsXG4gICAgY2hhbm5lbCAgICAgIDogbnVsbCxcbiAgICBwdWJsaXNoU3VibWl0OiBudWxsLFxuICB9LFxuICBmaWxlICAgIDogbnVsbCxcbiAgY2xhaW0gICA6ICcnLFxuICBtZXRhZGF0YToge1xuICAgIHRpdGxlICAgICAgOiAnJyxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgbGljZW5zZSAgICA6ICcnLFxuICAgIG5zZncgICAgICAgOiBmYWxzZSxcbiAgfSxcbiAgdGh1bWJuYWlsOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5GSUxFX1NFTEVDVEVEOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGluaXRpYWxTdGF0ZSwgeyAgLy8gbm90ZTogY2xlYXJzIHRvIGluaXRpYWwgc3RhdGVcbiAgICAgICAgZmlsZTogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9DTEVBUjpcbiAgICAgIHJldHVybiBpbml0aWFsU3RhdGU7XG4gICAgY2FzZSBhY3Rpb25zLk1FVEFEQVRBX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBtZXRhZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubWV0YWRhdGEsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5DTEFJTV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2xhaW06IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUw6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcHVibGlzaEluQ2hhbm5lbDogYWN0aW9uLmNoYW5uZWwsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUFVCTElTSF9TVEFUVVNfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRVJST1JfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGVycm9yOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5lcnJvciwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5uYW1lXTogYWN0aW9uLmRhdGEudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHNlbGVjdGVkQ2hhbm5lbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzaG93TWV0YWRhdGFJbnB1dHM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRIVU1CTkFJTF9ORVc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgdGh1bWJuYWlsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwiZXhwb3J0IGNvbnN0IExPR0lOID0gJ0V4aXN0aW5nJztcbmV4cG9ydCBjb25zdCBDUkVBVEUgPSAnTmV3JztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbG9nZ2VkSW5DaGFubmVsOiB7XG4gICAgbmFtZSAgIDogbnVsbCxcbiAgICBzaG9ydElkOiBudWxsLFxuICAgIGxvbmdJZCA6IG51bGwsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGxvZ2dlZEluQ2hhbm5lbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvY2hhbm5lbC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBFUlJPUiB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcmVxdWVzdDoge1xuICAgIGVycm9yOiBudWxsLFxuICAgIHR5cGUgOiBudWxsLFxuICAgIGlkICAgOiBudWxsLFxuICB9LFxuICByZXF1ZXN0TGlzdCA6IHt9LFxuICBjaGFubmVsTGlzdCA6IHt9LFxuICBhc3NldExpc3QgICA6IHt9LFxuICBkaXNwbGF5QXNzZXQ6IHtcbiAgICBlcnJvciA6IG51bGwsXG4gICAgc3RhdHVzOiBMT0NBTF9DSEVDSyxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvLyBoYW5kbGUgcmVxdWVzdFxuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICB0eXBlOiBhY3Rpb24uZGF0YS5yZXF1ZXN0VHlwZSxcbiAgICAgICAgICBpZCAgOiBhY3Rpb24uZGF0YS5yZXF1ZXN0SWQsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gc3RvcmUgcmVxdWVzdHNcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0TGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBrZXkgIDogYWN0aW9uLmRhdGEua2V5LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gYXNzZXQgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5BU1NFVF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgYXNzZXRMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hc3NldExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvciAgICA6IGFjdGlvbi5kYXRhLmVycm9yLFxuICAgICAgICAgICAgbmFtZSAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgOiBhY3Rpb24uZGF0YS5jbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRJZCAgOiBhY3Rpb24uZGF0YS5zaG9ydElkLFxuICAgICAgICAgICAgY2xhaW1EYXRhOiBhY3Rpb24uZGF0YS5jbGFpbURhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBjaGFubmVsIGRhdGFcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgbmFtZSAgICAgIDogYWN0aW9uLmRhdGEubmFtZSxcbiAgICAgICAgICAgIGxvbmdJZCAgICA6IGFjdGlvbi5kYXRhLmxvbmdJZCxcbiAgICAgICAgICAgIHNob3J0SWQgICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbXNEYXRhOiBhY3Rpb24uZGF0YS5jbGFpbXNEYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNoYW5uZWxMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3RbYWN0aW9uLmRhdGEuY2hhbm5lbExpc3RJZF0sIHtcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gZGlzcGxheSBhbiBhc3NldFxuICAgIGNhc2UgYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5ESVNQTEFZX0FTU0VUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlBc3NldDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGlzcGxheUFzc2V0LCB7XG4gICAgICAgICAgZXJyb3IgOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgICBzdGF0dXM6IEVSUk9SLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9zaG93LmpzIiwiY29uc3Qgc2l0ZUNvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IHtcbiAgYW5hbHl0aWNzOiB7XG4gICAgZ29vZ2xlSWQ6IGdvb2dsZUFuYWx5dGljc0lkLFxuICB9LFxuICBhc3NldERlZmF1bHRzOiB7XG4gICAgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIGRlc2NyaXB0aW9uOiBkZWZhdWx0RGVzY3JpcHRpb24sXG4gIH0sXG4gIGRldGFpbHM6IHtcbiAgICBkZXNjcmlwdGlvbixcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICAgIHR3aXR0ZXIsXG4gIH0sXG59ID0gc2l0ZUNvbmZpZztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkZXNjcmlwdGlvbixcbiAgZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIGhvc3QsXG4gIHRpdGxlLFxuICB0d2l0dGVyLFxuICBkZWZhdWx0RGVzY3JpcHRpb24sXG4gIGRlZmF1bHRUaHVtYm5haWwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1nYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWdhXCJcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5cbmNsYXNzIEFib3V0UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnQWJvdXQnfSBwYWdlVXJpPXsnYWJvdXQnfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdwdWxsLXF1b3RlJz5TcGVlLmNoIGlzIGFuIG9wZW4tc291cmNlIHByb2plY3QuICBQbGVhc2UgY29udHJpYnV0ZSB0byB0aGUgZXhpc3Rpbmcgc2l0ZSwgb3IgZm9yayBpdCBhbmQgbWFrZSB5b3VyIG93bi48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vdHdpdHRlci5jb20vc3BlZV9jaCc+VFdJVFRFUjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+R0lUSFVCPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPkRJU0NPUkQgQ0hBTk5FTDwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9ibG9iL21hc3Rlci9SRUFETUUubWQnPkRPQ1VNRU5UQVRJT048L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgbWVkaWEtaG9zdGluZyBzaXRlIHRoYXQgcmVhZHMgZnJvbSBhbmQgcHVibGlzaGVzIGNvbnRlbnQgdG8gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvJz5MQlJZPC9hPiBibG9ja2NoYWluLjwvcD5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIGhvc3Rpbmcgc2VydmljZSwgYnV0IHdpdGggdGhlIGFkZGVkIGJlbmVmaXQgdGhhdCBpdCBzdG9yZXMgeW91ciBjb250ZW50IG9uIGEgZGVjZW50cmFsaXplZCBuZXR3b3JrIG9mIGNvbXB1dGVycyAtLSB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8vZ2V0Jz5MQlJZPC9hPiBuZXR3b3JrLiAgVGhpcyBtZWFucyB0aGF0IHlvdXIgaW1hZ2VzIGFyZSBzdG9yZWQgaW4gbXVsdGlwbGUgbG9jYXRpb25zIHdpdGhvdXQgYSBzaW5nbGUgcG9pbnQgb2YgZmFpbHVyZS48L3A+XG4gICAgICAgICAgICAgIDxoMz5Db250cmlidXRlPC9oMz5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IGhhdmUgYW4gaWRlYSBmb3IgeW91ciBvd24gc3BlZS5jaC1saWtlIHNpdGUgb24gdG9wIG9mIExCUlksIGZvcmsgb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5naXRodWIgcmVwbzwvYT4gYW5kIGdvIHRvIHRvd24hPC9wPlxuICAgICAgICAgICAgICA8cD5JZiB5b3Ugd2FudCB0byBpbXByb3ZlIHNwZWUuY2gsIGpvaW4gb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPmRpc2NvcmQgY2hhbm5lbDwvYT4gb3Igc29sdmUgb25lIG9mIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9pc3N1ZXMnPmdpdGh1YiBpc3N1ZXM8L2E+LjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9BYm91dFBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5hdkxpbmssIHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBMb2dvIGZyb20gJ2NvbXBvbmVudHMvTG9nbyc7XG5pbXBvcnQgTmF2QmFyQ2hhbm5lbERyb3Bkb3duIGZyb20gJ2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bic7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY29uc3QgVklFVyA9ICdWSUVXJztcbmNvbnN0IExPR09VVCA9ICdMT0dPVVQnO1xuXG5jbGFzcyBOYXZCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlciA9IHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ291dFVzZXIgPSB0aGlzLmxvZ291dFVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbiA9IHRoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgdXNlciBpcyBhbHJlYWR5IGxvZ2dlZCBpblxuICAgIHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIoKTtcbiAgfVxuICBjaGVja0ZvckxvZ2dlZEluVXNlciAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9O1xuICAgIHJlcXVlc3QoJy91c2VyJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oZGF0YS5jaGFubmVsTmFtZSwgZGF0YS5zaG9ydENoYW5uZWxJZCwgZGF0YS5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJy91c2VyIGVycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgbG9nb3V0VXNlciAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9O1xuICAgIHJlcXVlc3QoJy9sb2dvdXQnLCBwYXJhbXMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9nb3V0KCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJy9sb2dvdXQgZXJyb3InLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIGhhbmRsZVNlbGVjdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBMT0dPVVQ6XG4gICAgICAgIHRoaXMubG9nb3V0VXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVklFVzpcbiAgICAgICAgLy8gcmVkaXJlY3QgdG8gY2hhbm5lbCBwYWdlXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvJHt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfToke3RoaXMucHJvcHMuY2hhbm5lbExvbmdJZH1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHNpdGVEZXNjcmlwdGlvbiB9ID0gIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIG5hdi1iYXInPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tc2hvcnQgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1jZW50ZXInPlxuICAgICAgICAgIDxMb2dvIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdi1iYXItLWNlbnRlcic+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J25hdi1iYXItdGFnbGluZSc+e3NpdGVEZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdi1iYXItLXJpZ2h0Jz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nLycgZXhhY3Q+UHVibGlzaDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy9hYm91dCc+QWJvdXQ8L05hdkxpbms+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hhbm5lbE5hbWUgPyAoXG4gICAgICAgICAgICAgIDxOYXZCYXJDaGFubmVsRHJvcGRvd25cbiAgICAgICAgICAgICAgICBjaGFubmVsTmFtZT17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3Rpb249e3RoaXMuaGFuZGxlU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3Rpb249e3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9XG4gICAgICAgICAgICAgICAgVklFVz17VklFV31cbiAgICAgICAgICAgICAgICBMT0dPVVQ9e0xPR09VVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxOYXZMaW5rIGlkPSduYXYtYmFyLWxvZ2luLWxpbmsnIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2xvZ2luJz5DaGFubmVsPC9OYXZMaW5rPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTmF2QmFyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBjcmVhdGVQYWdlVGl0bGUgfSBmcm9tICd1dGlscy9wYWdlVGl0bGUnO1xuaW1wb3J0IHsgY3JlYXRlTWV0YVRhZ3MgfSBmcm9tICd1dGlscy9tZXRhVGFncyc7XG5pbXBvcnQgeyBjcmVhdGVDYW5vbmljYWxMaW5rIH0gZnJvbSAndXRpbHMvY2Fub25pY2FsTGluayc7XG5cbmNsYXNzIFNFTyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgLy8gcHJvcHMgZnJvbSBzdGF0ZVxuICAgIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIHByb3BzIGZyb20gcGFyZW50XG4gICAgY29uc3QgeyBhc3NldCwgY2hhbm5lbCwgcGFnZVVyaSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgeyBwYWdlVGl0bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gY3JlYXRlIHBhZ2UgdGl0bGUsIHRhZ3MsIGFuZCBjYW5vbmljYWwgbGlua1xuICAgIHBhZ2VUaXRsZSA9IGNyZWF0ZVBhZ2VUaXRsZShzaXRlVGl0bGUsIHBhZ2VUaXRsZSk7XG4gICAgY29uc3QgbWV0YVRhZ3MgPSBjcmVhdGVNZXRhVGFncyhzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgY2hhbm5lbCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICBjb25zdCBjYW5vbmljYWxMaW5rID0gY3JlYXRlQ2Fub25pY2FsTGluayhhc3NldCwgY2hhbm5lbCwgcGFnZVVyaSwgc2l0ZUhvc3QpO1xuICAgIC8vIHJlbmRlciByZXN1bHRzXG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXRcbiAgICAgICAgdGl0bGU9e3BhZ2VUaXRsZX1cbiAgICAgICAgbWV0YT17bWV0YVRhZ3N9XG4gICAgICAgIGxpbms9e1t7cmVsOiAnY2Fub25pY2FsJywgaHJlZjogY2Fub25pY2FsTGlua31dfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuXG5TRU8ucHJvcFR5cGVzID0ge1xuICBwYWdlVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBhZ2VVcmkgIDogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2hhbm5lbCAgOiBQcm9wVHlwZXMub2JqZWN0LFxuICBhc3NldCAgICA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTRU87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9TRU8vdmlldy5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbExvZ2luRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0nO1xuaW1wb3J0IENoYW5uZWxDcmVhdGVGb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0nO1xuXG5jbGFzcyBMb2dpblBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIC8vIHJlLXJvdXRlIHRoZSB1c2VyIHRvIHRoZSBob21lcGFnZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICBpZiAobmV3UHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSAhPT0gdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2ApO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0xvZ2luJ30gcGFnZVVyaT17J2xvZ2luJ30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPkNoYW5uZWxzIGFsbG93IHlvdSB0byBwdWJsaXNoIGFuZCBncm91cCBjb250ZW50IHVuZGVyIGFuIGlkZW50aXR5LiBZb3UgY2FuIGNyZWF0ZSBhIGNoYW5uZWwgZm9yIHlvdXJzZWxmLCBvciBzaGFyZSBvbmUgd2l0aCBsaWtlLW1pbmRlZCBmcmllbmRzLiAgWW91IGNhbiBjcmVhdGUgMSBjaGFubmVsLCBvciAxMDAsIHNvIHdoZXRoZXIgeW91J3JlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0YWxvbmlhMjAxNzo0M2RjZjQ3MTYzY2FhMjFkODQwNGQ5ZmU5YjMwZjc4ZWYzZTE0NmE4Jz5kb2N1bWVudGluZyBpbXBvcnRhbnQgZXZlbnRzPC9hPiwgb3IgbWFraW5nIGEgcHVibGljIHJlcG9zaXRvcnkgZm9yIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0R2lmcyc+Y2F0IGdpZnM8L2E+IChwYXNzd29yZDogJzEyMzQnKSwgdHJ5IGNyZWF0aW5nIGEgY2hhbm5lbCBmb3IgaXQhPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5Mb2cgaW4gdG8gYW4gZXhpc3RpbmcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbExvZ2luRm9ybSAvPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5DcmVhdGUgYSBicmFuZCBuZXcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbENyZWF0ZUZvcm0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTG9naW5QYWdlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsTG9naW5Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIG5hbWUgICAgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dpblRvQ2hhbm5lbCA9IHRoaXMubG9naW5Ub0NoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIGxvZ2luVG9DaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXF1ZXN0KCdsb2dpbicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7c3VjY2VzcywgY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCwgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG1lc3NhZ2V9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvcn0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBpZD0nY2hhbm5lbC1sb2dpbi1mb3JtJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tJz5cbiAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nbmFtZScgcGxhY2Vob2xkZXI9J1lvdXIgQ2hhbm5lbCBOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsTmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyA+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgaWQ9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnIG5hbWU9J3Bhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxQYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5FbnRlciB0aGUgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMubG9naW5Ub0NoYW5uZWx9PkF1dGhlbnRpY2F0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxMb2dpbkZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxDcmVhdGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIGNoYW5uZWwgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgIHN0YXR1cyAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQgPSB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVDaGFubmVsID0gdGhpcy5jcmVhdGVDaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgY2xlYW5zZUNoYW5uZWxJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgaGFuZGxlQ2hhbm5lbElucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUNoYW5uZWxJbnB1dCh2YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2hhbm5lbDogdmFsdWV9KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdQbGVhc2UgZW50ZXIgYSBjaGFubmVsIG5hbWUnfSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgdXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbnVsbH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgfSk7XG4gIH1cbiAgY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXR1cm4gcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YCk7XG4gIH1cbiAgY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQgKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghcGFzc3dvcmQgfHwgcGFzc3dvcmQubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgYSBwYXNzd29yZCcpKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuICBtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0ICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWUsIHBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdCgnL3NpZ251cCcsIHBhcmFtcylcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFVuZm9ydHVuYXRlbHksIHdlIGVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIGNyZWF0aW5nIHlvdXIgY2hhbm5lbC4gUGxlYXNlIGxldCB1cyBrbm93IGluIERpc2NvcmQhICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGNyZWF0ZUNoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNoZWNrSXNQYXNzd29yZFByb3ZpZGVkKHRoaXMuc3RhdGUucGFzc3dvcmQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrSXNDaGFubmVsQXZhaWxhYmxlKHRoaXMuc3RhdGUuY2hhbm5lbCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6ICdXZSBhcmUgcHVibGlzaGluZyB5b3VyIG5ldyBjaGFubmVsLiAgU2l0IHRpZ2h0Li4uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0KHRoaXMuc3RhdGUuY2hhbm5lbCwgdGhpcy5zdGF0ZS5wYXNzd29yZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBudWxsfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4ocmVzdWx0LmNoYW5uZWxOYW1lLCByZXN1bHQuc2hvcnRDaGFubmVsSWQsIHJlc3VsdC5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHsgIXRoaXMuc3RhdGUuc3RhdHVzID8gKFxuICAgICAgICAgIDxmb3JtIGlkPSdwdWJsaXNoLWNoYW5uZWwtZm9ybSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1uYW1lJz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J2NoYW5uZWwnIGlkPSduZXctY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPSdleGFtcGxlQ2hhbm5lbE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICAgIHsgKHRoaXMuc3RhdGUuY2hhbm5lbCAmJiAhdGhpcy5zdGF0ZS5lcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIG5hbWU9J3Bhc3N3b3JkJyBpZD0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmNyZWF0ZUNoYW5uZWx9PkNyZWF0ZSBDaGFubmVsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+e3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENyZWF0ZUZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvbkhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGVycm9yICAgICAgOiBzaG93LnJlcXVlc3QuZXJyb3IsXG4gICAgcmVxdWVzdFR5cGU6IHNob3cucmVxdWVzdC50eXBlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvbkhhbmRsZVNob3dQYWdlVXJpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IFNob3dBc3NldExpdGUgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXRMaXRlJztcbmltcG9ydCBTaG93QXNzZXREZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscyc7XG5pbXBvcnQgU2hvd0NoYW5uZWwgZnJvbSAnY29udGFpbmVycy9TaG93Q2hhbm5lbCc7XG5cbmltcG9ydCB7IENIQU5ORUwsIEFTU0VUX0xJVEUsIEFTU0VUX0RFVEFJTFMgfSBmcm9tICdjb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzJztcblxuY2xhc3MgU2hvd1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKHRoaXMucHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLm1hdGNoLnBhcmFtcyAhPT0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25IYW5kbGVTaG93UGFnZVVyaShuZXh0UHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCByZXF1ZXN0VHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFcnJvclBhZ2UgZXJyb3I9e2Vycm9yfSAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgc3dpdGNoIChyZXF1ZXN0VHlwZSkge1xuICAgICAgY2FzZSBDSEFOTkVMOlxuICAgICAgICByZXR1cm4gPFNob3dDaGFubmVsIC8+O1xuICAgICAgY2FzZSBBU1NFVF9MSVRFOlxuICAgICAgICByZXR1cm4gPFNob3dBc3NldExpdGUgLz47XG4gICAgICBjYXNlIEFTU0VUX0RFVEFJTFM6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0RGV0YWlscyAvPjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiA8cD5sb2FkaW5nLi4uPC9wPjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuXG5jbGFzcyBTaG93TGl0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXNzZXQpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlciBzaG93LWxpdGUtY29udGFpbmVyJz5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxBc3NldERpc3BsYXkgLz5cbiAgICAgICAgICA8TGluayBpZD0nYXNzZXQtYm9pbGVycGF0ZScgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5IGZpbmUtcHJpbnQnIHRvPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfWB9Pmhvc3RlZFxuICAgICAgICAgICAgdmlhIFNwZWUuY2g8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICA8cD5sb2FkaW5nIGFzc2V0IGRhdGEuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93TGl0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIFVOQVZBSUxBQkxFLCBFUlJPUiwgQVZBSUxBQkxFIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY2xhc3MgQXNzZXREaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25GaWxlUmVxdWVzdChuYW1lLCBjbGFpbUlkKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBlcnJvciwgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGNvbnRlbnRUeXBlLCBmaWxlRXh0LCB0aHVtYm5haWwgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdhc3NldC1kaXNwbGF5LWNvbXBvbmVudCc+XG4gICAgICAgIHsoc3RhdHVzID09PSBMT0NBTF9DSEVDSykgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5DaGVja2luZyB0byBzZWUgaWYgU3BlZS5jaCBoYXMgeW91ciBhc3NldCBsb2NhbGx5Li4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gVU5BVkFJTEFCTEUpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+U2l0IHRpZ2h0LCB3ZSdyZSBzZWFyY2hpbmcgdGhlIExCUlkgYmxvY2tjaGFpbiBmb3IgeW91ciBhc3NldCE8L3A+XG4gICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDxwPkN1cmlvdXMgd2hhdCBtYWdpYyBpcyBoYXBwZW5pbmcgaGVyZT8gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZmFxL3doYXQtaXMtbGJyeSc+TGVhcm4gbW9yZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gRVJST1IpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+VW5mb3J0dW5hdGVseSwgd2UgY291bGRuJ3QgZG93bmxvYWQgeW91ciBhc3NldCBmcm9tIExCUlkuICBZb3UgY2FuIGhlbHAgdXMgb3V0IGJ5IHNoYXJpbmcgdGhlIGJlbG93IGVycm9yIG1lc3NhZ2UgaW4gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5MQlJZIGRpc2NvcmQ8L2E+LjwvcD5cbiAgICAgICAgICA8aT48cCBpZD0nZXJyb3ItbWVzc2FnZSc+e2Vycm9yfTwvcD48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBBVkFJTEFCTEUpICYmXG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX0gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHZpZGVvIGNsYXNzTmFtZT0nYXNzZXQgdmlkZW8nIGNvbnRyb2xzIHBvc3Rlcj17dGh1bWJuYWlsfT5cbiAgICAgICAgICAgICAgICAgIDxzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8cD5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgPGNvZGU+dmlkZW88L2NvZGU+IGVsZW1lbnQuPC9wPlxuICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPlVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXREaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IEFzc2V0VGl0bGUgZnJvbSAnY29udGFpbmVycy9Bc3NldFRpdGxlJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuaW1wb3J0IEFzc2V0SW5mbyBmcm9tICdjb250YWluZXJzL0Fzc2V0SW5mbyc7XG5cbmNsYXNzIFNob3dBc3NldERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IGNsYWltRGF0YTogeyBuYW1lIH0gfSA9IGFzc2V0O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17YCR7bmFtZX0gLSBkZXRhaWxzYH0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8QXNzZXRUaXRsZSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgc2hvdy1kZXRhaWxzLWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICAgICAgPEFzc2V0SW5mbyAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yUGFnZSBlcnJvcj17J2xvYWRpbmcgYXNzZXQgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0Fzc2V0RGV0YWlscztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGE6IHsgdGl0bGUgfSB9ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQXNzZXRUaXRsZSA9ICh7IHRpdGxlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0LS1sYXJnZSc+e3RpdGxlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0VGl0bGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBBc3NldEluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jb3B5VG9DbGlwYm9hcmQgPSB0aGlzLmNvcHlUb0NsaXBib2FyZC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvcHlUb0NsaXBib2FyZCAoZXZlbnQpIHtcbiAgICB2YXIgZWxlbWVudFRvQ29weSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmVsZW1lbnR0b2NvcHk7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Db3B5KTtcbiAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdPb3BzLCB1bmFibGUgdG8gY29weSd9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IHNob3J0SWQsIGNsYWltRGF0YSA6IHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIGRlc2NyaXB0aW9uLCBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsLCBob3N0IH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2NoYW5uZWxOYW1lICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkNoYW5uZWw6PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+PExpbmsgdG89e2AvJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfWB9PntjaGFubmVsTmFtZX08L0xpbms+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIHtkZXNjcmlwdGlvbiAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz57ZGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hhcmUtYnV0dG9ucyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPlNoYXJlOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20gZmxleC1jb250YWluZXItLXdyYXAnPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHdpdHRlcjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT5mYWNlYm9vazwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cDovL3R1bWJsci5jb20vd2lkZ2V0cy9zaGFyZS90b29sP2Nhbm9uaWNhbFVybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR1bWJscjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zdWJtaXQ/dXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9JnRpdGxlPSR7bmFtZX1gfT5yZWRkaXQ8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LXNob3J0LWxpbmsnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkxpbms6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktc2hvcnQtbGluaycgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3Nob3J0LWxpbmsnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgJHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J3Nob3J0LWxpbmsnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctZW1iZWQtY29kZSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+RW1iZWQ6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktZW1iZWQtdGV4dCcgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7KGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JykgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDx2aWRlbyB3aWR0aD1cIjEwMCVcIiBjb250cm9scyBwb3N0ZXI9XCIke3RodW1ibmFpbH1cIiBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPjwvdmlkZW8+YH0gLz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDxpbWcgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz5gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdlbWJlZC10ZXh0J1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSc+XG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0bz17YC8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9PjxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9J3RleHQnPkRpcmVjdCBMaW5rPC9zcGFuPjwvTGluaz5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9e2Ake2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0gZG93bmxvYWQ9e25hbWV9PkRvd25sb2FkPC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9kbWNhJz5SZXBvcnQ8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldEluZm87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgcmVxdWVzdFxuICBjb25zdCBwcmV2aW91c1JlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgLy8gc2VsZWN0IGNoYW5uZWxcbiAgbGV0IGNoYW5uZWw7XG4gIGlmIChwcmV2aW91c1JlcXVlc3QpIHtcbiAgICBjb25zdCBjaGFubmVsS2V5ID0gcHJldmlvdXNSZXF1ZXN0LmtleTtcbiAgICBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheSc7XG5cbmNsYXNzIFNob3dDaGFubmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbG9uZ0lkLCBzaG9ydElkIH0gPSBjaGFubmVsO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gY2hhbm5lbD17Y2hhbm5lbH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPGgyPmNoYW5uZWwgbmFtZToge25hbWV9PC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PmZ1bGwgY2hhbm5lbCBpZDoge2xvbmdJZH08L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17J2ZpbmUtcHJpbnQnfT5zaG9ydCBjaGFubmVsIGlkOiB7c2hvcnRJZH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ2xhaW1zRGlzcGxheSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBjaGFubmVsIGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dDaGFubmVsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25VcGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgY2hhbm5lbCBrZXlcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3Rbc2hvdy5yZXF1ZXN0LmlkXTtcbiAgY29uc3QgY2hhbm5lbEtleSA9IHJlcXVlc3Qua2V5O1xuICAvLyBzZWxlY3QgY2hhbm5lbCBjbGFpbXNcbiAgY29uc3QgY2hhbm5lbCA9IHNob3cuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0gfHwgbnVsbDtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgY2hhbm5lbEtleSxcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvblVwZGF0ZUNoYW5uZWxDbGFpbXMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBc3NldFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9Bc3NldFByZXZpZXcnO1xuXG5jbGFzcyBDaGFubmVsQ2xhaW1zRGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlID0gdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICB9XG4gIHNob3dQcmV2aW91c1Jlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKHByZXZpb3VzUGFnZSk7XG4gIH1cbiAgc2hvd05leHRSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5leHRQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpICsgMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKG5leHRQYWdlKTtcbiAgfVxuICBzaG93TmV3UGFnZSAocGFnZSkge1xuICAgIGNvbnN0IHsgY2hhbm5lbEtleSwgY2hhbm5lbDogeyBuYW1lLCBsb25nSWQgfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uVXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY2xhaW1zLCBjdXJyZW50UGFnZSwgdG90YWxQYWdlcyB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsJz5cbiAgICAgICAgeyhjbGFpbXMubGVuZ3RoID4gMCkgPyAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHtjbGFpbXMubWFwKChjbGFpbSwgaW5kZXgpID0+IDxBc3NldFByZXZpZXdcbiAgICAgICAgICAgICAgY2xhaW1EYXRhPXtjbGFpbX1cbiAgICAgICAgICAgICAga2V5PXtgJHtjbGFpbS5uYW1lfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAvPil9XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlID4gMSkgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2V9PlByZXZpb3VzIFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcykgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd05leHRSZXN1bHRzUGFnZX0+TmV4dCBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwPlRoZXJlIGFyZSBubyBjbGFpbXMgaW4gdGhpcyBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENsYWltc0Rpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNvbnN0IEFzc2V0UHJldmlldyA9ICh7IGRlZmF1bHRUaHVtYm5haWwsIGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsIH0gfSkgPT4ge1xuICBjb25zdCBkaXJlY3RTb3VyY2VMaW5rID0gYCR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YDtcbiAgY29uc3Qgc2hvd1VybExpbmsgPSBgLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2Fzc2V0LWhvbGRlcic+XG4gICAgICA8TGluayB0bz17c2hvd1VybExpbmt9ID5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e2RpcmVjdFNvdXJjZUxpbmt9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyB2aWRlbyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e3RodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPnVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCl9XG4gICAgICA8L0xpbms+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZTogeyBob3N0LCB0aXRsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jbGFzcyBGb3VyT2hGb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7dGl0bGUsIGhvc3R9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfSAtIDQwNDwvdGl0bGU+XG4gICAgICAgICAgPGxpbmsgcmVsPSdjYW5vbmljYWwnIGhyZWY9e2Ake2hvc3R9LzQwNGB9IC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxoMj40MDQ8L2gyPlxuICAgICAgICAgIDxwPlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3VyT2hGb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7IGRldGVybWluZVJlc3BvbnNlVHlwZSwgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSwgbG9nUmVxdWVzdERhdGEsIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIHRvIHNlcnZlIGEgc3BlY2lmaWMgYXNzZXQgdXNpbmcgdGhlIGNoYW5uZWwgb3IgY2xhaW0gaWRcbiAgYXBwLmdldCgnLzppZGVudGlmaWVyLzpjbGFpbScsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICAgIHRyeSB7XG4gICAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICAgIH1cbiAgICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAgIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICAgIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgICBsZXQgY2xhaW1OYW1lO1xuICAgIHRyeSB7XG4gICAgICAoeyBjbGFpbU5hbWUgfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSB0aGUgaWRlbnRpZmllclxuICAgIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZDtcbiAgICB0cnkge1xuICAgICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKHBhcmFtcy5pZGVudGlmaWVyKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgaWYgKCFpc0NoYW5uZWwpIHtcbiAgICAgIFtjbGFpbUlkLCBjbGFpbU5hbWVdID0gZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eShjbGFpbUlkLCBjbGFpbU5hbWUpO1xuICAgIH1cbiAgICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gICAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKTtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzZXJ2ZSB0aGUgd2lubmluZyBhc3NldCBhdCBhIGNsYWltIG9yIGEgY2hhbm5lbCBwYWdlXG4gIGFwcC5nZXQoJy86Y2xhaW0nLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gICAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgICB0cnkge1xuICAgICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gICAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgLy8gcGFyc2UgdGhlIGNsYWltXG4gICAgbGV0IGNsYWltTmFtZTtcbiAgICB0cnkge1xuICAgICAgKHtjbGFpbU5hbWV9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgbnVsbCwgbnVsbCk7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChudWxsLCBudWxsLCBjbGFpbU5hbWUsIG51bGwsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGdldENsYWltSWQsIGdldExvY2FsRmlsZVJlY29yZCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJy4vZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5jb25zdCBTSE9XID0gJ1NIT1cnO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbmZ1bmN0aW9uIGNsaWVudEFjY2VwdHNIdG1sICh7YWNjZXB0fSkge1xuICByZXR1cm4gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKTtcbn07XG5cbmZ1bmN0aW9uIHJlcXVlc3RJc0Zyb21Ccm93c2VyIChoZWFkZXJzKSB7XG4gIHJldHVybiBoZWFkZXJzWyd1c2VyLWFnZW50J10gJiYgaGVhZGVyc1sndXNlci1hZ2VudCddLm1hdGNoKC9Nb3ppbGxhLyk7XG59O1xuXG5mdW5jdGlvbiBjbGllbnRXYW50c0Fzc2V0ICh7YWNjZXB0LCByYW5nZX0pIHtcbiAgY29uc3QgaW1hZ2VJc1dhbnRlZCA9IGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL2ltYWdlXFwvLiovKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9cXCovKTtcbiAgY29uc3QgdmlkZW9Jc1dhbnRlZCA9IGFjY2VwdCAmJiByYW5nZTtcbiAgcmV0dXJuIGltYWdlSXNXYW50ZWQgfHwgdmlkZW9Jc1dhbnRlZDtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRDbGFpbUlkIChjbGFpbUlkKSB7XG4gIHJldHVybiAoKGNsYWltSWQubGVuZ3RoID09PSA0MCkgJiYgIS9bXkEtWmEtejAtOV0vZy50ZXN0KGNsYWltSWQpKTtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkIChjbGFpbUlkKSB7XG4gIHJldHVybiBjbGFpbUlkLmxlbmd0aCA9PT0gMTsgIC8vIGl0IHNob3VsZCByZWFsbHkgZXZhbHVhdGUgdGhlIHNob3J0IHVybCBpdHNlbGZcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIChpbnB1dCkge1xuICByZXR1cm4gKGlzVmFsaWRDbGFpbUlkKGlucHV0KSB8fCBpc1ZhbGlkU2hvcnRJZChpbnB1dCkpO1xufTtcblxuZnVuY3Rpb24gc2VydmVBc3NldFRvQ2xpZW50IChjbGFpbUlkLCBuYW1lLCByZXMpIHtcbiAgcmV0dXJuIGdldExvY2FsRmlsZVJlY29yZChjbGFpbUlkLCBuYW1lKVxuICAgIC50aGVuKGZpbGVSZWNvcmQgPT4ge1xuICAgICAgLy8gY2hlY2sgdGhhdCBhIGxvY2FsIHJlY29yZCB3YXMgZm91bmRcbiAgICAgIGlmIChmaWxlUmVjb3JkID09PSBOT19GSUxFKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDMwNykucmVkaXJlY3QoYC9hcGkvY2xhaW0vZ2V0LyR7bmFtZX0vJHtjbGFpbUlkfWApO1xuICAgICAgfVxuICAgICAgLy8gc2VydmUgdGhlIGZpbGVcbiAgICAgIGNvbnN0IHtmaWxlUGF0aCwgZmlsZVR5cGV9ID0gZmlsZVJlY29yZDtcbiAgICAgIGxvZ2dlci52ZXJib3NlKGBzZXJ2aW5nIGZpbGU6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICBjb25zdCBzZW5kRmlsZU9wdGlvbnMgPSB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnWC1Db250ZW50LVR5cGUtT3B0aW9ucyc6ICdub3NuaWZmJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJyAgICAgICAgICA6IGZpbGVUeXBlIHx8ICdpbWFnZS9qcGVnJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZEZpbGUoZmlsZVBhdGgsIHNlbmRGaWxlT3B0aW9ucyk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcykge1xuICAgIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gICAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKGZ1bGxDbGFpbUlkID0+IHtcbiAgICAgICAgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DTEFJTSkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdubyBjaGFubmVsIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHNlcnZlQXNzZXRUb0NsaWVudChmdWxsQ2xhaW1JZCwgY2xhaW1OYW1lLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ3N1Y2Nlc3MnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnZmFpbCcpO1xuICAgICAgfSk7XG4gIH0sXG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSAoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycykge1xuICAgIGxldCByZXNwb25zZVR5cGU7XG4gICAgaWYgKGhhc0ZpbGVFeHRlbnNpb24pIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFOyAgLy8gYXNzdW1lIGEgc2VydmUgcmVxdWVzdCBpZiBmaWxlIGV4dGVuc2lvbiBpcyBwcmVzZW50XG4gICAgICBpZiAoY2xpZW50QWNjZXB0c0h0bWwoaGVhZGVycykpIHsgIC8vIGlmIHRoZSByZXF1ZXN0IGNvbWVzIGZyb20gYSBicm93c2VyLCBjaGFuZ2UgaXQgdG8gYSBzaG93IHJlcXVlc3RcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0hPVztcbiAgICAgIGlmIChjbGllbnRXYW50c0Fzc2V0KGhlYWRlcnMpICYmIHJlcXVlc3RJc0Zyb21Ccm93c2VyKGhlYWRlcnMpKSB7ICAvLyB0aGlzIGlzIGluIGNhc2Ugc29tZW9uZSBlbWJlZHMgYSBzaG93IHVybFxuICAgICAgICBsb2dnZXIuZGVidWcoJ1Nob3cgcmVxdWVzdCBjYW1lIGZyb20gYnJvd3NlciBidXQgd2FudHMgYW4gaW1hZ2UvdmlkZW8uIENoYW5naW5nIHJlc3BvbnNlIHRvIHNlcnZlLi4uJyk7XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNFUlZFO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VUeXBlO1xuICB9LFxuICBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IChpZGVudGlmaWVyLCBuYW1lKSB7XG4gICAgLy8gdGhpcyBpcyBhIHBhdGNoIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eSB3aXRoICcvbmFtZS9jbGFpbV9pZCcgdXJsIGZvcm1hdFxuICAgIGlmIChpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChuYW1lKSAmJiAhaXNWYWxpZFNob3J0SWRPckNsYWltSWQoaWRlbnRpZmllcikpIHtcbiAgICAgIGNvbnN0IHRlbXBOYW1lID0gbmFtZTtcbiAgICAgIG5hbWUgPSBpZGVudGlmaWVyO1xuICAgICAgaWRlbnRpZmllciA9IHRlbXBOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gW2lkZW50aWZpZXIsIG5hbWVdO1xuICB9LFxuICBsb2dSZXF1ZXN0RGF0YSAocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdyZXNwb25zZVR5cGUgPT09JywgcmVzcG9uc2VUeXBlKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIG5hbWUgPT09ICcsIGNsYWltTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIG5hbWUgPT09JywgY2hhbm5lbE5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gaWQgPT09JywgY2xhaW1JZCk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIGlkZW50aWZpZXI6JywgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke3ZhbHVlfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIHVybC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbCBuYW1lIGFmdGVyIEAuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1JZCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbmFtZTonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSAuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgJHttb2RpZmllclNlcGVyYXRvcn0uYCk7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke21vZGlmaWVyU2VwZXJhdG9yfSBtb2RpZmllciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lYCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICB9O1xuICB9LFxuICBwYXJzZU1vZGlmaWVyOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbW9kaWZpZXI6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeVVyaS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJy4uLy4uL2NsaWVudC9yZWR1Y2Vycy9pbmRleCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnLi4vLi4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleCc7XG5pbXBvcnQgQXBwIGZyb20gJy4uLy4uL2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UnO1xuaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHsgY2FsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBoYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9zYWdhcy9zaG93X3VyaSc7XG5pbXBvcnQgeyBvbkhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnLi4vLi4vY2xpZW50L2FjdGlvbnMvc2hvdyc7XG5cbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY29uc3QgcmV0dXJuU2FnYVdpdGhQYXJhbXMgPSAoc2FnYSwgcGFyYW1zKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAqICgpIHtcbiAgICB5aWVsZCBjYWxsKHNhZ2EsIHBhcmFtcyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhbmQgYXBwbHkgbWlkZGxld2FyZVxuICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XG4gIGNvbnN0IG1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUoc2FnYU1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIsIG1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBzYWdhXG4gIGNvbnN0IGFjdGlvbiA9IG9uSGFuZGxlU2hvd1BhZ2VVcmkocmVxLnBhcmFtcyk7XG4gIGNvbnN0IHNhZ2EgPSByZXR1cm5TYWdhV2l0aFBhcmFtcyhoYW5kbGVTaG93UGFnZVVyaSwgYWN0aW9uKTtcblxuICAvLyBydW4gdGhlIHNhZ2EgbWlkZGxld2FyZVxuICBzYWdhTWlkZGxld2FyZVxuICAgIC5ydW4oc2FnYSlcbiAgICAuZG9uZVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICAgICAgPEFwcCAvPlxuICAgICAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgKTtcblxuICAgICAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICAgICAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gICAgICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICAgICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICAgICAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gICAgICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICAgICAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBvblJlcXVlc3RFcnJvciwgb25OZXdDaGFubmVsUmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgbmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19hc3NldCc7XG5pbXBvcnQgeyBuZXdDaGFubmVsUmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfY2hhbm5lbCc7XG5pbXBvcnQgbGJyeVVyaSBmcm9tICd1dGlscy9sYnJ5VXJpJztcblxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSAobW9kaWZpZXIsIGNsYWltKSB7XG4gIC8vIHRoaXMgaXMgYSByZXF1ZXN0IGZvciBhbiBhc3NldFxuICAvLyBjbGFpbSB3aWxsIGJlIGFuIGFzc2V0IGNsYWltXG4gIC8vIHRoZSBpZGVudGlmaWVyIGNvdWxkIGJlIGEgY2hhbm5lbCBvciBhIGNsYWltIGlkXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCwgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKG1vZGlmaWVyKSk7XG4gICAgKHsgY2xhaW1OYW1lLCBleHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBleHRlbnNpb24pKTtcbiAgfTtcbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgY2xhaW1JZCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IChjbGFpbSkge1xuICAvLyB0aGlzIGNvdWxkIGJlIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXQgb3IgYSBjaGFubmVsIHBhZ2VcbiAgLy8gY2xhaW0gY291bGQgYmUgYW4gYXNzZXQgY2xhaW0gb3IgYSBjaGFubmVsIGNsYWltXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIoY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICAvLyByZXR1cm4gZWFybHkgaWYgdGhpcyByZXF1ZXN0IGlzIGZvciBhIGNoYW5uZWxcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0NoYW5uZWxSZXF1ZXN0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkpO1xuICB9XG4gIC8vIGlmIG5vdCBmb3IgYSBjaGFubmVsLCBwYXJzZSB0aGUgY2xhaW0gcmVxdWVzdFxuICBsZXQgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWUsIGV4dGVuc2lvbn0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogaGFuZGxlU2hvd1BhZ2VVcmkgKGFjdGlvbikge1xuICBjb25zdCB7IGlkZW50aWZpZXIsIGNsYWltIH0gPSBhY3Rpb24uZGF0YTtcbiAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSwgaWRlbnRpZmllciwgY2xhaW0pO1xuICB9XG4gIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVDbGFpbU9ubHksIGNsYWltKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoSGFuZGxlU2hvd1BhZ2VVcmkgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLCBoYW5kbGVTaG93UGFnZVVyaSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpLmpzIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCBzZWxlY3QsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QsIG9uUmVxdWVzdEVycm9yLCBvblJlcXVlc3RVcGRhdGUsIGFkZEFzc2V0VG9Bc3NldExpc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgZ2V0TG9uZ0NsYWltSWQsIGdldFNob3J0SWQsIGdldENsYWltRGF0YSB9IGZyb20gJ2FwaS9hc3NldEFwaSc7XG5pbXBvcnQgeyBzZWxlY3RTaG93U3RhdGUgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RTaXRlSG9zdCB9IGZyb20gJ3NlbGVjdG9ycy9zaXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3QXNzZXRSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBuYW1lLCBtb2RpZmllciB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGxvbmcgaWQgJiYgYWRkIHJlcXVlc3QgdG8gcmVxdWVzdCBsaXN0XG4gIGxldCBsb25nSWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBsb25nSWR9ID0geWllbGQgY2FsbChnZXRMb25nQ2xhaW1JZCwgaG9zdCwgbmFtZSwgbW9kaWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICBjb25zdCBhc3NldEtleSA9IGBhIyR7bmFtZX0jJHtsb25nSWR9YDtcbiAgeWllbGQgcHV0KGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0KHJlcXVlc3RJZCwgbnVsbCwgYXNzZXRLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBhc3NldD9cbiAgLy8gSWYgdGhpcyBhc3NldCBpcyBpbiB0aGUgYXNzZXQgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuYXNzZXRMaXN0W2Fzc2V0S2V5XSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBzaG9ydCBJZFxuICBsZXQgc2hvcnRJZDtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IHNob3J0SWR9ID0geWllbGQgY2FsbChnZXRTaG9ydElkLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBnZXQgYXNzZXQgY2xhaW0gZGF0YVxuICBsZXQgY2xhaW1EYXRhO1xuICB0cnkge1xuICAgICh7ZGF0YTogY2xhaW1EYXRhfSA9IHlpZWxkIGNhbGwoZ2V0Q2xhaW1EYXRhLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBhZGQgYXNzZXQgdG8gYXNzZXQgbGlzdFxuICB5aWVsZCBwdXQoYWRkQXNzZXRUb0Fzc2V0TGlzdChhc3NldEtleSwgbnVsbCwgbmFtZSwgbG9uZ0lkLCBzaG9ydElkLCBjbGFpbURhdGEpKTtcbiAgLy8gY2xlYXIgYW55IGVycm9ycyBpbiByZXF1ZXN0IGVycm9yXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0Fzc2V0UmVxdWVzdCAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5BU1NFVF9SRVFVRVNUX05FVywgbmV3QXNzZXRSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9uZ0NsYWltSWQgKGhvc3QsIG5hbWUsIG1vZGlmaWVyKSB7XG4gIGxldCBib2R5ID0ge307XG4gIC8vIGNyZWF0ZSByZXF1ZXN0IHBhcmFtc1xuICBpZiAobW9kaWZpZXIpIHtcbiAgICBpZiAobW9kaWZpZXIuaWQpIHtcbiAgICAgIGJvZHlbJ2NsYWltSWQnXSA9IG1vZGlmaWVyLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5WydjaGFubmVsTmFtZSddID0gbW9kaWZpZXIuY2hhbm5lbC5uYW1lO1xuICAgICAgYm9keVsnY2hhbm5lbENsYWltSWQnXSA9IG1vZGlmaWVyLmNoYW5uZWwuaWQ7XG4gICAgfVxuICB9XG4gIGJvZHlbJ2NsYWltTmFtZSddID0gbmFtZTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfTtcbiAgLy8gY3JlYXRlIHVybFxuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vbG9uZy1pZGA7XG4gIC8vIHJldHVybiB0aGUgcmVxdWVzdCBwcm9taXNlXG4gIHJldHVybiBSZXF1ZXN0KHVybCwgcGFyYW1zKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaG9ydElkIChob3N0LCBuYW1lLCBjbGFpbUlkKSB7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9zaG9ydC1pZC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYWltRGF0YSAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vZGF0YS8ke25hbWV9LyR7Y2xhaW1JZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvYXNzZXRBcGkuanMiLCJpbXBvcnQge2NhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QsIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCB1cGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldENoYW5uZWxDbGFpbXMsIGdldENoYW5uZWxEYXRhIH0gZnJvbSAnYXBpL2NoYW5uZWxBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0NoYW5uZWxSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0gPSBhY3Rpb24uZGF0YTtcbiAgLy8gcHV0IGFuIGFjdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgaW4gcmVkdXhcbiAgeWllbGQgcHV0KG9uUmVxdWVzdFVwZGF0ZShyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgcmVxdWVzdD9cbiAgLy8gSWYgdGhpcyB1cmkgaXMgaW4gdGhlIHJlcXVlc3QgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBjb25zdCBzdGF0ZSA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaG93U3RhdGUpO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBsb25nIGlkXG4gIGxldCBsb25nSWQsIHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHsgZGF0YToge2xvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0lkLCBzaG9ydENoYW5uZWxDbGFpbUlkOiBzaG9ydElkfSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsRGF0YSwgaG9zdCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHN0b3JlIHRoZSByZXF1ZXN0IGluIHRoZSBjaGFubmVsIHJlcXVlc3RzIGxpc3RcbiAgY29uc3QgY2hhbm5lbEtleSA9IGBjIyR7Y2hhbm5lbE5hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGNoYW5uZWxLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBjaGFubmVsP1xuICAvLyBJZiB0aGlzIGNoYW5uZWwgaXMgaW4gdGhlIGNoYW5uZWwgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBjbGFpbXMgZGF0YVxuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIGhvc3QsIGxvbmdJZCwgY2hhbm5lbE5hbWUsIDEpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgY2hhbm5lbCBkYXRhIGluIHRoZSBjaGFubmVsIGxpc3RcbiAgeWllbGQgcHV0KGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0KGNoYW5uZWxLZXksIGNoYW5uZWxOYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpKTtcbiAgLy8gY2xlYXIgYW55IHJlcXVlc3QgZXJyb3JzXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3Q2hhbm5lbFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVywgbmV3Q2hhbm5lbFJlcXVlc3QpO1xufTtcblxuZnVuY3Rpb24gKiBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsIChhY3Rpb24pIHtcbiAgY29uc3QgeyBjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UgfSA9IGFjdGlvbi5kYXRhO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBwdXQodXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBjbGFpbXNEYXRhKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsIGdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfY2hhbm5lbC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbERhdGEgKGhvc3QsIGlkLCBuYW1lKSB7XG4gIGlmICghaWQpIGlkID0gJ25vbmUnO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9kYXRhLyR7bmFtZX0vJHtpZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxDbGFpbXMgKGhvc3QsIGxvbmdJZCwgbmFtZSwgcGFnZSkge1xuICBpZiAoIXBhZ2UpIHBhZ2UgPSAxO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9jbGFpbXMvJHtuYW1lfS8ke2xvbmdJZH0vJHtwYWdlfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlbmRlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHAgPT4ge1xuICAvLyBhIGNhdGNoLWFsbCByb3V0ZSBpZiBzb21lb25lIHZpc2l0cyBhIHBhZ2UgdGhhdCBkb2VzIG5vdCBleGlzdFxuICBhcHAudXNlKCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgLy8gc2VuZCByZXNwb25zZVxuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcyIsImNvbnN0IHsgbG9nTGV2ZWwgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9sb2dnZXJDb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAod2luc3RvbikgPT4ge1xuICAvLyBjb25maWd1cmVcbiAgd2luc3Rvbi5jb25maWd1cmUoe1xuICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgIG5ldyAod2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUpKHtcbiAgICAgICAgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgICAgIDogbG9nTGV2ZWwsXG4gICAgICAgIHRpbWVzdGFtcCAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBjb2xvcml6ZSAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICBwcmV0dHlQcmludCAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICBoYW5kbGVFeGNlcHRpb25zICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICBodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG4gIC8vIHRlc3QgYWxsIHRoZSBsb2cgbGV2ZWxzXG4gIHdpbnN0b24uZXJyb3IoJ0xldmVsIDAnKTtcbiAgd2luc3Rvbi53YXJuKCdMZXZlbCAxJyk7XG4gIHdpbnN0b24uaW5mbygnTGV2ZWwgMicpO1xuICB3aW5zdG9uLnZlcmJvc2UoJ0xldmVsIDMnKTtcbiAgd2luc3Rvbi5kZWJ1ZygnTGV2ZWwgNCcpO1xuICB3aW5zdG9uLnNpbGx5KCdMZXZlbCA1Jyk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvY29uZmlndXJlTG9nZ2VyLmpzIiwiY29uc3QgbG9nZ2VyQ29uZmlnID0ge1xuICBsb2dMZXZlbDogJ2RlYnVnJywgIC8vIG9wdGlvbnM6IHNpbGx5LCBkZWJ1ZywgdmVyYm9zZSwgaW5mb1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2dnZXJDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwiY29uc3Qgd2luc3RvblNsYWNrV2ViSG9vayA9IHJlcXVpcmUoJ3dpbnN0b24tc2xhY2std2ViaG9vaycpLlNsYWNrV2ViSG9vaztcbmNvbnN0IHNsYWNrQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHdpbnN0b24pID0+IHtcbiAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gc2xhY2tDb25maWc7XG4gIGlmIChzbGFja1dlYkhvb2spIHtcbiAgICAvLyBhZGQgYSB0cmFuc3BvcnQgZm9yIGVycm9ycyB0byBzbGFja1xuICAgIGlmIChzbGFja0Vycm9yQ2hhbm5lbCkge1xuICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICBuYW1lICAgICAgOiAnc2xhY2stZXJyb3JzLXRyYW5zcG9ydCcsXG4gICAgICAgIGxldmVsICAgICA6ICd3YXJuJyxcbiAgICAgICAgd2ViaG9va1VybDogc2xhY2tXZWJIb29rLFxuICAgICAgICBjaGFubmVsICAgOiBzbGFja0Vycm9yQ2hhbm5lbCxcbiAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICBpY29uRW1vamkgOiAnOmZhY2Vfd2l0aF9oZWFkX2JhbmRhZ2U6JyxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgaWYgKHNsYWNrSW5mb0NoYW5uZWwpIHtcbiAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWluZm8tdHJhbnNwb3J0JyxcbiAgICAgICAgbGV2ZWwgICAgIDogJ2luZm8nLFxuICAgICAgICB3ZWJob29rVXJsOiBzbGFja1dlYkhvb2ssXG4gICAgICAgIGNoYW5uZWwgICA6IHNsYWNrSW5mb0NoYW5uZWwsXG4gICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgaWNvbkVtb2ppIDogJzpuZXJkX2ZhY2U6JyxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gc2VuZCB0ZXN0IG1lc3NhZ2VcbiAgICB3aW5zdG9uLmVycm9yKCdTbGFjayBcImVycm9yXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgd2luc3Rvbi5pbmZvKCdTbGFjayBcImluZm9cIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5zdG9uLndhcm4oJ1NsYWNrIGxvZ2dpbmcgaXMgbm90IGVuYWJsZWQgYmVjYXVzZSBubyBzbGFja1dlYkhvb2sgY29uZmlnIHZhciBwcm92aWRlZC4nKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCJcbi8vIG1vZHVsZSBpZCA9IDEzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQWN0aXZlU3RhdHVzQmFyIGZyb20gJy4vQWN0aXZlU3RhdHVzQmFyJztcclxuaW1wb3J0IEFzc2V0UHJldmlldyBmcm9tICcuL0Fzc2V0UHJldmlldyc7XHJcbmltcG9ydCBFeHBhbmRpbmdUZXh0QXJlYSBmcm9tICcuL0V4cGFuZGluZ1RleHRBcmVhJztcclxuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnLi9HQUxpc3RlbmVyJztcclxuaW1wb3J0IEluYWN0aXZlU3RhdHVzQmFyIGZyb20gJy4vSW5hY3RpdmVTdGF0dXNCYXInO1xyXG5pbXBvcnQgTG9nbyBmcm9tICcuL0xvZ28nO1xyXG5pbXBvcnQgTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93biBmcm9tICcuL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24nO1xyXG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnLi9Qcm9ncmVzc0Jhcic7XHJcbmltcG9ydCBQdWJsaXNoUHJldmlldyBmcm9tICcuL1B1Ymxpc2hQcmV2aWV3JztcclxuaW1wb3J0IFB1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5IGZyb20gJy4vUHVibGlzaFVybE1pZGRsZURpc3BsYXknO1xyXG5pbXBvcnQgU0VPIGZyb20gJy4vU0VPJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIEFjdGl2ZVN0YXR1c0JhcixcclxuICBBc3NldFByZXZpZXcsXHJcbiAgRXhwYW5kaW5nVGV4dEFyZWEsXHJcbiAgR0FMaXN0ZW5lcixcclxuICBJbmFjdGl2ZVN0YXR1c0JhcixcclxuICBMb2dvLFxyXG4gIE5hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24sXHJcbiAgUHJvZ3Jlc3NCYXIsXHJcbiAgUHVibGlzaFByZXZpZXcsXHJcbiAgUHVibGlzaFVybE1pZGRsZURpc3BsYXksXHJcbiAgU0VPLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBFeHBhbmRpbmdUZXh0YXJlYSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLl9oYW5kbGVDaGFuZ2UgPSB0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5hZGp1c3RUZXh0YXJlYSh7fSk7XG4gIH1cbiAgX2hhbmRsZUNoYW5nZSAoZXZlbnQpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UoZXZlbnQpO1xuICAgIHRoaXMuYWRqdXN0VGV4dGFyZWEoZXZlbnQpO1xuICB9XG4gIGFkanVzdFRleHRhcmVhICh7IHRhcmdldCA9IHRoaXMuZWwgfSkge1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgLi4ucmVzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPHRleHRhcmVhXG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgICByZWY9e3ggPT4gdGhpcy5lbCA9IHh9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2V9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuRXhwYW5kaW5nVGV4dGFyZWEucHJvcFR5cGVzID0ge1xuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRpbmdUZXh0YXJlYTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBQdWJsaXNoUHJldmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaW1nU291cmNlICAgICAgIDogJycsXG4gICAgICBkZWZhdWx0VGh1bWJuYWlsOiAnL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIH07XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlKHRoaXMucHJvcHMuZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICBpZiAobmV3UHJvcHMuZmlsZSAhPT0gdGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZShuZXdQcm9wcy5maWxlKTtcbiAgICB9XG4gICAgaWYgKG5ld1Byb3BzLnRodW1ibmFpbCAhPT0gdGhpcy5wcm9wcy50aHVtYm5haWwpIHtcbiAgICAgIGlmIChuZXdQcm9wcy50aHVtYm5haWwpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShuZXdQcm9wcy50aHVtYm5haWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUgKGZpbGUpIHtcbiAgICBjb25zdCBwcmV2aWV3UmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBwcmV2aWV3UmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgcHJldmlld1JlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHByZXZpZXdSZWFkZXIucmVzdWx0fSk7XG4gICAgfTtcbiAgfVxuICBzZXRQcmV2aWV3SW1hZ2VTb3VyY2UgKGZpbGUpIHtcbiAgICBpZiAoZmlsZS50eXBlICE9PSAndmlkZW8vbXA0Jykge1xuICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShmaWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUodGhpcy5wcm9wcy50aHVtYm5haWwpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGltZ1xuICAgICAgICBpZD0nZHJvcHpvbmUtcHJldmlldydcbiAgICAgICAgc3JjPXt0aGlzLnN0YXRlLmltZ1NvdXJjZX1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmRpbVByZXZpZXcgPyAnZGltJyA6ICcnfVxuICAgICAgICBhbHQ9J3B1Ymxpc2ggcHJldmlldydcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcblxuUHVibGlzaFByZXZpZXcucHJvcFR5cGVzID0ge1xuICBkaW1QcmV2aWV3OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmaWxlICAgICAgOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHRodW1ibmFpbCA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoUHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3L2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5mdW5jdGlvbiBVcmxNaWRkbGUgKHtwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwsIGxvZ2dlZEluQ2hhbm5lbE5hbWUsIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWR9KSB7XG4gIGlmIChwdWJsaXNoSW5DaGFubmVsKSB7XG4gICAgaWYgKHNlbGVjdGVkQ2hhbm5lbCA9PT0gbG9nZ2VkSW5DaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIDxzcGFuIGlkPSd1cmwtY2hhbm5lbCcgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5Jz57bG9nZ2VkSW5DaGFubmVsTmFtZX06e2xvZ2dlZEluQ2hhbm5lbFNob3J0SWR9IC88L3NwYW4+O1xuICAgIH1cbiAgICByZXR1cm4gPHNwYW4gaWQ9J3VybC1jaGFubmVsLXBsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnkgdG9vbHRpcCc+QGNoYW5uZWw8c3BhblxuICAgICAgY2xhc3NOYW1lPSd0b29sdGlwLXRleHQnPlNlbGVjdCBhIGNoYW5uZWwgYmVsb3c8L3NwYW4+IC88L3NwYW4+O1xuICB9XG4gIHJldHVybiAoXG4gICAgPHNwYW4gaWQ9J3VybC1uby1jaGFubmVsLXBsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnkgdG9vbHRpcCc+eHl6PHNwYW4gY2xhc3NOYW1lPSd0b29sdGlwLXRleHQnPlRoaXMgd2lsbCBiZSBhIHJhbmRvbSBpZDwvc3Bhbj4gLzwvc3Bhbj5cbiAgKTtcbn1cblxuVXJsTWlkZGxlLnByb3BUeXBlcyA9IHtcbiAgcHVibGlzaEluQ2hhbm5lbCAgICAgIDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbG9nZ2VkSW5DaGFubmVsTmFtZSAgIDogUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZDogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVybE1pZGRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5L2luZGV4LmpzeCJdLCJzb3VyY2VSb290IjoiIn0=