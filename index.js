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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("winston");

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
        details = config.details,
        publishing = config.publishing;

    _this.analytics = analytics;
    _this.assetDefaults = assetDefaults;
    _this.auth = auth;
    _this.details = details;
    _this.publishing = publishing;
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

var _publish_action_types = __webpack_require__(34);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sequelize = __webpack_require__(26);
var logger = __webpack_require__(2);

console.log('exporting sequelize models');

var _require = __webpack_require__(23),
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
var Certificate = __webpack_require__(66);
var Channel = __webpack_require__(67);
var Claim = __webpack_require__(68);
var File = __webpack_require__(69);
var Request = __webpack_require__(70);
var User = __webpack_require__(71);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(19);

var _view = __webpack_require__(92);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var channel = _ref.channel;

  return {
    channelName: channel.loggedInChannel.name,
    channelShortId: channel.loggedInChannel.shortId,
    channelLongId: channel.loggedInChannel.longId
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

var _show_action_types = __webpack_require__(12);

var actions = _interopRequireWildcard(_show_action_types);

var _show_request_types = __webpack_require__(43);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = request;

__webpack_require__(95);

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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(63);
var logger = __webpack_require__(2);

var _require = __webpack_require__(64),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(17),
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var ua = __webpack_require__(65);

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
/* 18 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoggedInChannel = updateLoggedInChannel;

var _channel_action_types = __webpack_require__(36);

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
/* 20 */
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

var _ActiveStatusBar = __webpack_require__(117);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(118);

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
/* 21 */
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
/* 22 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var fs = __webpack_require__(78);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(2);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(6);
var logger = __webpack_require__(2);

var _require = __webpack_require__(80),
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(32);

var _redux = __webpack_require__(18);

var _reducers = __webpack_require__(33);

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

var _GAListener = __webpack_require__(38);

var _GAListener2 = _interopRequireDefault(_GAListener);

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(45);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(14);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  var context = {};

  // create a new Redux store instance
  var store = (0, _redux.createStore)(_reducers2.default);

  // render component to a string
  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(
        _GAListener2.default,
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
/* 32 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(18);

var _publish = __webpack_require__(82);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(83);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(84);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(85);

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  channel: _channel2.default,
  publish: _publish2.default,
  show: _show2.default,
  site: _site2.default
});

/***/ }),
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = exports.LOGIN = 'Existing';
var CREATE = exports.CREATE = 'New';

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL_UPDATE = exports.CHANNEL_UPDATE = 'CHANNEL_UPDATE';

/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactGa = __webpack_require__(86);

var _reactGa2 = _interopRequireDefault(_reactGa);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_reactGa2.default.initialize('test');

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _HomePage = __webpack_require__(87);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _AboutPage = __webpack_require__(124);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _LoginPage = __webpack_require__(125);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(127);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(144);

var _FourOhFourPage2 = _interopRequireDefault(_FourOhFourPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(
    _reactRouterDom.Switch,
    null,
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _HomePage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/about', component: _AboutPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: _LoginPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:identifier/:claim', component: _ShowPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:claim', component: _ShowPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { component: _FourOhFourPage2.default })
  );
};

exports.default = App;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(98);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var publish = _ref.publish;

  return {
    file: publish.file,
    thumbnail: publish.thumbnail,
    fileError: publish.error.file
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    selectFile: function selectFile(file) {
      dispatch((0, _publish.selectFile)(file));
    },
    setFileError: function setFileError(value) {
      dispatch((0, _publish.clearFile)());
      dispatch((0, _publish.updateError)('file', value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(19);

var _view = __webpack_require__(115);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(5);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(19);

var _view = __webpack_require__(116);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(5);

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL = exports.CHANNEL = 'CHANNEL';
var ASSET_LITE = exports.ASSET_LITE = 'ASSET_LITE';
var ASSET_DETAILS = exports.ASSET_DETAILS = 'ASSET_DETAILS';

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(131);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(8);

var _show2 = __webpack_require__(13);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helmet, html, preloadedState) {
    // take the html and preloadedState and return the full page
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(48);
module.exports = __webpack_require__(49);


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(50);
var bodyParser = __webpack_require__(51);
var expressHandlebars = __webpack_require__(52);
var Handlebars = __webpack_require__(53);
var helmet = __webpack_require__(54);
var passport = __webpack_require__(22);

var _require = __webpack_require__(55),
    populateLocalsDotUser = _require.populateLocalsDotUser,
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

var cookieSession = __webpack_require__(56);
var http = __webpack_require__(57);
// logging dependencies
var logger = __webpack_require__(2);

function SpeechServer(_ref) {
  var _this = this;

  var mysqlConfig = _ref.mysqlConfig,
      siteConfig = _ref.siteConfig,
      slackConfig = _ref.slackConfig;

  this.start = function () {
    _this.configureConfigFiles();
    _this.configureLogging();
    _this.configureApp();
    _this.configureServer();
    _this.startServer();
  };
  this.configureConfigFiles = function () {
    var mysqlAppConfig = __webpack_require__(23);
    mysqlAppConfig.configure(mysqlConfig);
    var siteAppConfig = __webpack_require__(3);
    siteAppConfig.configure(siteConfig);
    _this.PORT = siteAppConfig.details.port;
    var slackAppConfig = __webpack_require__(24);
    slackAppConfig.configure(slackConfig);
  };
  this.configureLogging = function () {
    __webpack_require__(58)(logger);
    __webpack_require__(60)(logger);
  };
  this.configureApp = function () {
    var app = express(); // create an Express application

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
    var localSignupStrategy = __webpack_require__(62);
    var localLoginStrategy = __webpack_require__(73);
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
    // initialize passport
    app.use(cookieSession({
      name: 'session',
      keys: [siteConfig.auth.sessionKey],
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

    // middleware to pass user info back to client (for handlebars access), if user is logged in
    app.use(populateLocalsDotUser); // note: I don't think I need this any more?

    // set the routes on the app
    __webpack_require__(74)(app);
    __webpack_require__(75)(app);
    __webpack_require__(81)(app);
    __webpack_require__(146)(app);
    __webpack_require__(157)(app);

    _this.app = app;
  };
  this.configureServer = function () {
    _this.server = http.Server(_this.app);
  };
  this.startServer = function () {
    var db = __webpack_require__(6);
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
/* 50 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

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
/* 56 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(59),
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loggerConfig = {
  logLevel: 'debug' // options: silly, debug, verbose, info
};

module.exports = loggerConfig;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(61).SlackWebHook;
var slackConfig = __webpack_require__(24);

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
/* 61 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(25).Strategy;
var lbryApi = __webpack_require__(16);
var logger = __webpack_require__(2);
var db = __webpack_require__(6);

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
/* 63 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 64 */
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
/* 65 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(27),
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
/* 67 */
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(27),
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
/* 69 */
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
/* 70 */
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(72);
var logger = __webpack_require__(2);

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
/* 72 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(25).Strategy;
var logger = __webpack_require__(2);
var db = __webpack_require__(6);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var passport = __webpack_require__(22);

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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(2);
var multipart = __webpack_require__(76);

var _require = __webpack_require__(3),
    uploadDirectory = _require.publishing.uploadDirectory,
    host = _require.details.host;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });
var db = __webpack_require__(6);

var _require2 = __webpack_require__(77),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    checkChannelAvailability = _require2.checkChannelAvailability,
    publish = _require2.publish;

var _require3 = __webpack_require__(16),
    getClaimList = _require3.getClaimList,
    resolveUri = _require3.resolveUri,
    getClaim = _require3.getClaim;

var _require4 = __webpack_require__(28),
    addGetResultsToFileData = _require4.addGetResultsToFileData,
    createBasicPublishParams = _require4.createBasicPublishParams,
    createThumbnailPublishParams = _require4.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require4.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require4.parsePublishApiRequestFiles,
    createFileData = _require4.createFileData;

var errorHandlers = __webpack_require__(29);

var _require5 = __webpack_require__(17),
    sendGATimingEvent = _require5.sendGATimingEvent;

var _require6 = __webpack_require__(79),
    authenticateUser = _require6.authenticateUser;

var _require7 = __webpack_require__(30),
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
/* 76 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(2);
var db = __webpack_require__(6);
var lbryApi = __webpack_require__(16);
var publishHelpers = __webpack_require__(28);

var _require = __webpack_require__(3),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(26);
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
/* 78 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(6);
var logger = __webpack_require__(2);

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
/* 80 */
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    host = _require.details;

var handlePageRender = __webpack_require__(31);

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
/* 82 */
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

var _publish_action_types = __webpack_require__(34);

var actions = _interopRequireWildcard(_publish_action_types);

var _publish_channel_select_states = __webpack_require__(35);

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
    case actions.CHANNEL_UPDATE:
      return Object.assign({}, state, {
        loggedInChannel: action.data
      });
    default:
      return state;
  }
};

var _channel_action_types = __webpack_require__(36);

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

var _show_action_types = __webpack_require__(12);

var actions = _interopRequireWildcard(_show_action_types);

var _asset_display_states = __webpack_require__(37);

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
/* 86 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

/***/ }),
/* 87 */
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

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _PublishTool = __webpack_require__(96);

var _PublishTool2 = _interopRequireDefault(_PublishTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_React$Component) {
  _inherits(HomePage, _React$Component);

  function HomePage() {
    _classCallCheck(this, HomePage);

    return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).apply(this, arguments));
  }

  _createClass(HomePage, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row row--tall flex-container--column' },
        _react2.default.createElement(_SEO2.default, null),
        _react2.default.createElement(_NavBar2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'row row--tall row--padded flex-container--column' },
          _react2.default.createElement(_PublishTool2.default, null)
        )
      );
    }
  }]);

  return HomePage;
}(_react2.default.Component);

;

exports.default = HomePage;

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

var _reactHelmet = __webpack_require__(14);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _propTypes = __webpack_require__(10);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Logo = __webpack_require__(93);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(94);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _request = __webpack_require__(11);

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
              'Open-source, decentralized image and video sharing.'
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
/***/ (function(module, exports) {

module.exports = require("cross-fetch/polyfill");

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(97);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var publish = _ref.publish;

  return {
    disabled: publish.disabled,
    file: publish.file,
    status: publish.status.status
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

var _Dropzone = __webpack_require__(40);

var _Dropzone2 = _interopRequireDefault(_Dropzone);

var _PublishDetails = __webpack_require__(101);

var _PublishDetails2 = _interopRequireDefault(_PublishDetails);

var _PublishStatus = __webpack_require__(119);

var _PublishStatus2 = _interopRequireDefault(_PublishStatus);

var _PublishDisabledMessage = __webpack_require__(122);

var _PublishDisabledMessage2 = _interopRequireDefault(_PublishDisabledMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishTool = function (_React$Component) {
  _inherits(PublishTool, _React$Component);

  function PublishTool() {
    _classCallCheck(this, PublishTool);

    return _possibleConstructorReturn(this, (PublishTool.__proto__ || Object.getPrototypeOf(PublishTool)).apply(this, arguments));
  }

  _createClass(PublishTool, [{
    key: 'render',
    value: function render() {
      if (this.props.disabled) {
        console.log('publish is disabled');
        return _react2.default.createElement(_PublishDisabledMessage2.default, null);
      } else {
        console.log('publish is not disabled');
        if (this.props.file) {
          if (this.props.status) {
            return _react2.default.createElement(_PublishStatus2.default, null);
          } else {
            return _react2.default.createElement(_PublishDetails2.default, null);
          }
        }
        return _react2.default.createElement(_Dropzone2.default, null);
      }
    }
  }]);

  return PublishTool;
}(_react2.default.Component);

;

exports.default = PublishTool;

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

var _file = __webpack_require__(99);

var _PublishPreview = __webpack_require__(100);

var _PublishPreview2 = _interopRequireDefault(_PublishPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropzone = function (_React$Component) {
  _inherits(Dropzone, _React$Component);

  function Dropzone(props) {
    _classCallCheck(this, Dropzone);

    var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this, props));

    _this.state = {
      dragOver: false,
      mouseOver: false,
      dimPreview: false
    };
    _this.handleDrop = _this.handleDrop.bind(_this);
    _this.handleDragOver = _this.handleDragOver.bind(_this);
    _this.handleDragEnd = _this.handleDragEnd.bind(_this);
    _this.handleDragEnter = _this.handleDragEnter.bind(_this);
    _this.handleDragLeave = _this.handleDragLeave.bind(_this);
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleFileInput = _this.handleFileInput.bind(_this);
    _this.chooseFile = _this.chooseFile.bind(_this);
    return _this;
  }

  _createClass(Dropzone, [{
    key: 'handleDrop',
    value: function handleDrop(event) {
      event.preventDefault();
      this.setState({ dragOver: false });
      // if dropped items aren't files, reject them
      var dt = event.dataTransfer;
      if (dt.items) {
        if (dt.items[0].kind === 'file') {
          var droppedFile = dt.items[0].getAsFile();
          this.chooseFile(droppedFile);
        }
      }
    }
  }, {
    key: 'handleDragOver',
    value: function handleDragOver(event) {
      event.preventDefault();
    }
  }, {
    key: 'handleDragEnd',
    value: function handleDragEnd(event) {
      var dt = event.dataTransfer;
      if (dt.items) {
        for (var i = 0; i < dt.items.length; i++) {
          dt.items.remove(i);
        }
      } else {
        event.dataTransfer.clearData();
      }
    }
  }, {
    key: 'handleDragEnter',
    value: function handleDragEnter() {
      this.setState({ dragOver: true, dimPreview: true });
    }
  }, {
    key: 'handleDragLeave',
    value: function handleDragLeave() {
      this.setState({ dragOver: false, dimPreview: false });
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({ mouseOver: true, dimPreview: true });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ mouseOver: false, dimPreview: false });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      document.getElementById('file_input').click();
    }
  }, {
    key: 'handleFileInput',
    value: function handleFileInput(event) {
      event.preventDefault();
      var fileList = event.target.files;
      this.chooseFile(fileList[0]);
    }
  }, {
    key: 'chooseFile',
    value: function chooseFile(file) {
      if (file) {
        try {
          (0, _file.validateFile)(file); // validate the file's name, type, and size
        } catch (error) {
          return this.props.setFileError(error.message);
        }
        // stage it so it will be ready when the publish button is clicked
        this.props.selectFile(file);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row row--tall flex-container--column' },
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement('input', { className: 'input-file', type: 'file', id: 'file_input', name: 'file_input', accept: 'video/*,image/*', onChange: this.handleFileInput, encType: 'multipart/form-data' })
        ),
        _react2.default.createElement(
          'div',
          { id: 'preview-dropzone', className: 'row row--padded row--tall dropzone' + (this.state.dragOver ? ' dropzone--drag-over' : ''), onDrop: this.handleDrop, onDragOver: this.handleDragOver, onDragEnd: this.handleDragEnd, onDragEnter: this.handleDragEnter, onDragLeave: this.handleDragLeave, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onClick: this.handleClick },
          this.props.file ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_PublishPreview2.default, {
              dimPreview: this.state.dimPreview,
              file: this.props.file,
              thumbnail: this.props.thumbnail
            }),
            _react2.default.createElement(
              'div',
              { id: 'dropzone-text-holder', className: 'flex-container--column flex-container--center-center' },
              this.state.dragOver ? _react2.default.createElement(
                'div',
                { id: 'dropzone-dragover' },
                _react2.default.createElement(
                  'p',
                  { className: 'blue' },
                  'Drop it.'
                )
              ) : null,
              this.state.mouseOver ? _react2.default.createElement(
                'div',
                { id: 'dropzone-instructions' },
                _react2.default.createElement(
                  'p',
                  { className: 'info-message-placeholder info-message--failure', id: 'input-error-file-selection' },
                  this.props.fileError
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  'Drag & drop image or video here to publish'
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'fine-print' },
                  'OR'
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'blue--underlined' },
                  'CHOOSE FILE'
                )
              ) : null
            )
          ) : _react2.default.createElement(
            'div',
            { id: 'dropzone-text-holder', className: 'flex-container--column flex-container--center-center' },
            this.state.dragOver ? _react2.default.createElement(
              'div',
              { id: 'dropzone-dragover' },
              _react2.default.createElement(
                'p',
                { className: 'blue' },
                'Drop it.'
              )
            ) : _react2.default.createElement(
              'div',
              { id: 'dropzone-instructions' },
              _react2.default.createElement(
                'p',
                { className: 'info-message-placeholder info-message--failure', id: 'input-error-file-selection' },
                this.props.fileError
              ),
              _react2.default.createElement(
                'p',
                null,
                'Drag & drop image or video here to publish'
              ),
              _react2.default.createElement(
                'p',
                { className: 'fine-print' },
                'OR'
              ),
              _react2.default.createElement(
                'p',
                { className: 'blue--underlined' },
                'CHOOSE FILE'
              )
            )
          )
        )
      );
    }
  }]);

  return Dropzone;
}(_react2.default.Component);

;

exports.default = Dropzone;

/***/ }),
/* 99 */
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
/* 100 */
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(102);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var channel = _ref.channel,
      publish = _ref.publish;

  return {
    file: publish.file
  };
};

var mapDispatchToProps = {
  clearFile: _publish.clearFile,
  startPublish: _publish.startPublish
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Dropzone = __webpack_require__(40);

var _Dropzone2 = _interopRequireDefault(_Dropzone);

var _PublishTitleInput = __webpack_require__(103);

var _PublishTitleInput2 = _interopRequireDefault(_PublishTitleInput);

var _PublishUrlInput = __webpack_require__(105);

var _PublishUrlInput2 = _interopRequireDefault(_PublishUrlInput);

var _PublishThumbnailInput = __webpack_require__(108);

var _PublishThumbnailInput2 = _interopRequireDefault(_PublishThumbnailInput);

var _PublishMetadataInputs = __webpack_require__(110);

var _PublishMetadataInputs2 = _interopRequireDefault(_PublishMetadataInputs);

var _ChannelSelect = __webpack_require__(113);

var _ChannelSelect2 = _interopRequireDefault(_ChannelSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishDetails = function (_React$Component) {
  _inherits(PublishDetails, _React$Component);

  function PublishDetails(props) {
    _classCallCheck(this, PublishDetails);

    var _this = _possibleConstructorReturn(this, (PublishDetails.__proto__ || Object.getPrototypeOf(PublishDetails)).call(this, props));

    _this.onPublishSubmit = _this.onPublishSubmit.bind(_this);
    return _this;
  }

  _createClass(PublishDetails, [{
    key: 'onPublishSubmit',
    value: function onPublishSubmit() {
      this.props.startPublish(this.props.history);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row row--no-bottom' },
        _react2.default.createElement(
          'div',
          { className: 'column column--10' },
          _react2.default.createElement(_PublishTitleInput2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'column column--5 column--sml-10' },
          _react2.default.createElement(
            'div',
            { className: 'row row--padded' },
            _react2.default.createElement(_Dropzone2.default, null)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'column column--5 column--sml-10 align-content-top' },
          _react2.default.createElement(
            'div',
            { id: 'publish-active-area', className: 'row row--padded' },
            _react2.default.createElement(
              'div',
              { className: 'row row--padded row--no-top row--wide' },
              _react2.default.createElement(_PublishUrlInput2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'row row--padded row--no-top row--wide' },
              _react2.default.createElement(_ChannelSelect2.default, null)
            ),
            this.props.file.type === 'video/mp4' && _react2.default.createElement(
              'div',
              { className: 'row row--padded row--no-top row--wide ' },
              _react2.default.createElement(_PublishThumbnailInput2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'row row--padded row--no-top row--no-bottom row--wide' },
              _react2.default.createElement(_PublishMetadataInputs2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'row row--wide align-content-center' },
              _react2.default.createElement(
                'button',
                { id: 'publish-submit', className: 'button--primary button--large', onClick: this.onPublishSubmit },
                'Publish'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row row--padded row--no-bottom align-content-center' },
              _react2.default.createElement(
                'button',
                { className: 'button--cancel', onClick: this.props.clearFile },
                'Cancel'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row row--short align-content-center' },
              _react2.default.createElement(
                'p',
                { className: 'fine-print' },
                'By clicking \'Publish\', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. ',
                _react2.default.createElement(
                  'a',
                  { className: 'link--primary', target: '_blank', href: 'https://lbry.io/learn' },
                  'Read more.'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PublishDetails;
}(_react2.default.Component);

;

exports.default = (0, _reactRouterDom.withRouter)(PublishDetails);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(104);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var publish = _ref.publish;

  return {
    title: publish.metadata.title
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onMetadataChange: function onMetadataChange(name, value) {
      dispatch((0, _publish.updateMetadata)(name, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishTitleInput = function (_React$Component) {
  _inherits(PublishTitleInput, _React$Component);

  function PublishTitleInput(props) {
    _classCallCheck(this, PublishTitleInput);

    var _this = _possibleConstructorReturn(this, (PublishTitleInput.__proto__ || Object.getPrototypeOf(PublishTitleInput)).call(this, props));

    _this.handleInput = _this.handleInput.bind(_this);
    return _this;
  }

  _createClass(PublishTitleInput, [{
    key: 'handleInput',
    value: function handleInput(e) {
      var name = e.target.name;
      var value = e.target.value;
      this.props.onMetadataChange(name, value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', { type: 'text', id: 'publish-title', className: 'input-text text--large input-text--full-width', name: 'title', placeholder: 'Give your post a title...', onChange: this.handleInput, value: this.props.title });
    }
  }]);

  return PublishTitleInput;
}(_react2.default.Component);

exports.default = PublishTitleInput;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publish = __webpack_require__(5);

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(106);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var channel = _ref.channel,
      publish = _ref.publish;

  return {
    loggedInChannelName: channel.loggedInChannel.name,
    loggedInChannelShortId: channel.loggedInChannel.shortId,
    fileName: publish.file.name,
    publishInChannel: publish.publishInChannel,
    selectedChannel: publish.selectedChannel,
    claim: publish.claim,
    urlError: publish.error.url
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onClaimChange: function onClaimChange(value) {
      dispatch((0, _publish.updateClaim)(value));
      dispatch((0, _publish.updateError)('publishSubmit', null));
    },
    onUrlError: function onUrlError(value) {
      dispatch((0, _publish.updateError)('url', value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

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

var _request = __webpack_require__(11);

var _request2 = _interopRequireDefault(_request);

var _PublishUrlMiddleDisplay = __webpack_require__(107);

var _PublishUrlMiddleDisplay2 = _interopRequireDefault(_PublishUrlMiddleDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishUrlInput = function (_React$Component) {
  _inherits(PublishUrlInput, _React$Component);

  function PublishUrlInput(props) {
    _classCallCheck(this, PublishUrlInput);

    var _this = _possibleConstructorReturn(this, (PublishUrlInput.__proto__ || Object.getPrototypeOf(PublishUrlInput)).call(this, props));

    _this.handleInput = _this.handleInput.bind(_this);
    return _this;
  }

  _createClass(PublishUrlInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          claim = _props.claim,
          fileName = _props.fileName;

      if (!claim) {
        this.setClaimName(fileName);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var claim = _ref.claim,
          fileName = _ref.fileName;

      // if a new file was chosen, update the claim name
      if (fileName !== this.props.fileName) {
        return this.setClaimName(fileName);
      }
      // if the claim has updated, check its availability
      if (claim !== this.props.claim) {
        this.validateClaim(claim);
      }
    }
  }, {
    key: 'handleInput',
    value: function handleInput(event) {
      var value = event.target.value;
      value = this.cleanseInput(value);
      // update the state
      this.props.onClaimChange(value);
    }
  }, {
    key: 'cleanseInput',
    value: function cleanseInput(input) {
      input = input.replace(/\s+/g, '-'); // replace spaces with dashes
      input = input.replace(/[^A-Za-z0-9-]/g, ''); // remove all characters that are not A-Z, a-z, 0-9, or '-'
      return input;
    }
  }, {
    key: 'setClaimName',
    value: function setClaimName(fileName) {
      var fileNameWithoutEnding = fileName.substring(0, fileName.lastIndexOf('.'));
      var cleanClaimName = this.cleanseInput(fileNameWithoutEnding);
      this.props.onClaimChange(cleanClaimName);
    }
  }, {
    key: 'validateClaim',
    value: function validateClaim(claim) {
      var _this2 = this;

      if (!claim) {
        return this.props.onUrlError('Enter a url above');
      }
      (0, _request2.default)('/api/claim/availability/' + claim).then(function () {
        _this2.props.onUrlError(null);
      }).catch(function (error) {
        _this2.props.onUrlError(error.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          claim = _props2.claim,
          loggedInChannelName = _props2.loggedInChannelName,
          loggedInChannelShortId = _props2.loggedInChannelShortId,
          publishInChannel = _props2.publishInChannel,
          selectedChannel = _props2.selectedChannel,
          urlError = _props2.urlError;

      return _react2.default.createElement(
        'div',
        { className: 'column column--10 column--sml-10' },
        _react2.default.createElement(
          'div',
          { className: 'input-text--primary span--relative' },
          _react2.default.createElement(
            'span',
            { className: 'url-text--secondary' },
            'spee.ch / '
          ),
          _react2.default.createElement(_PublishUrlMiddleDisplay2.default, {
            publishInChannel: publishInChannel,
            selectedChannel: selectedChannel,
            loggedInChannelName: loggedInChannelName,
            loggedInChannelShortId: loggedInChannelShortId
          }),
          _react2.default.createElement('input', { type: 'text', id: 'claim-name-input', className: 'input-text', name: 'claim', placeholder: 'your-url-here', onChange: this.handleInput, value: claim }),
          claim && !urlError && _react2.default.createElement(
            'span',
            { id: 'input-success-claim-name', className: 'info-message--success span--absolute' },
            '\u2713'
          ),
          urlError && _react2.default.createElement(
            'span',
            { id: 'input-success-channel-name', className: 'info-message--failure span--absolute' },
            '\u2716'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          urlError ? _react2.default.createElement(
            'p',
            { id: 'input-error-claim-name', className: 'info-message--failure' },
            urlError
          ) : _react2.default.createElement(
            'p',
            { className: 'info-message' },
            'Choose a custom url'
          )
        )
      );
    }
  }]);

  return PublishUrlInput;
}(_react2.default.Component);

exports.default = PublishUrlInput;

/***/ }),
/* 107 */
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

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(109);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var file = _ref.publish.file;

  return {
    file: file
  };
};

var mapDispatchToProps = {
  onNewThumbnail: _publish.onNewThumbnail
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString = atob(dataURI.split(',')[1]);
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

var PublishThumbnailInput = function (_React$Component) {
  _inherits(PublishThumbnailInput, _React$Component);

  function PublishThumbnailInput(props) {
    _classCallCheck(this, PublishThumbnailInput);

    var _this = _possibleConstructorReturn(this, (PublishThumbnailInput.__proto__ || Object.getPrototypeOf(PublishThumbnailInput)).call(this, props));

    _this.state = {
      videoSource: null,
      error: null,
      sliderMinRange: 1,
      sliderMaxRange: null,
      sliderValue: null
    };
    _this.handleVideoLoadedData = _this.handleVideoLoadedData.bind(_this);
    _this.handleSliderChange = _this.handleSliderChange.bind(_this);
    _this.createThumbnail = _this.createThumbnail.bind(_this);
    return _this;
  }

  _createClass(PublishThumbnailInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var file = this.props.file;

      this.setVideoSource(file);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // if file changes
      if (nextProps.file && nextProps.file !== this.props.file) {
        var file = nextProps.file;

        this.setVideoSource(file);
      };
    }
  }, {
    key: 'setVideoSource',
    value: function setVideoSource(file) {
      var _this2 = this;

      var previewReader = new FileReader();
      previewReader.readAsDataURL(file);
      previewReader.onloadend = function () {
        var dataUri = previewReader.result;
        var blob = dataURItoBlob(dataUri);
        var videoSource = URL.createObjectURL(blob);
        _this2.setState({ videoSource: videoSource });
      };
    }
  }, {
    key: 'handleVideoLoadedData',
    value: function handleVideoLoadedData(event) {
      var duration = event.target.duration;
      var totalMinutes = Math.floor(duration / 60);
      var totalSeconds = Math.floor(duration % 60);
      // set the slider
      this.setState({
        sliderMaxRange: duration * 100,
        sliderValue: duration * 100 / 2,
        totalMinutes: totalMinutes,
        totalSeconds: totalSeconds
      });
      // update the current time of the video
      var video = document.getElementById('video-thumb-player');
      video.currentTime = duration / 2;
    }
  }, {
    key: 'handleSliderChange',
    value: function handleSliderChange(event) {
      var value = parseInt(event.target.value);
      // update the slider value
      this.setState({
        sliderValue: value
      });
      // update the current time of the video
      var video = document.getElementById('video-thumb-player');
      video.currentTime = value / 100;
    }
  }, {
    key: 'createThumbnail',
    value: function createThumbnail() {
      // take a snapshot
      var video = document.getElementById('video-thumb-player');
      var canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      var dataUrl = canvas.toDataURL();
      var blob = dataURItoBlob(dataUrl);
      var snapshot = new File([blob], 'thumbnail.png', {
        type: 'image/png'
      });
      // set the thumbnail in redux store
      if (snapshot) {
        this.props.onNewThumbnail(snapshot);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          error = _state.error,
          videoSource = _state.videoSource,
          sliderMinRange = _state.sliderMinRange,
          sliderMaxRange = _state.sliderMaxRange,
          sliderValue = _state.sliderValue,
          totalMinutes = _state.totalMinutes,
          totalSeconds = _state.totalSeconds;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'label',
          { className: 'label' },
          'Thumbnail:'
        ),
        _react2.default.createElement('video', {
          id: 'video-thumb-player',
          preload: 'metadata',
          muted: true,
          style: { display: 'none' },
          playsInline: true,
          onLoadedData: this.handleVideoLoadedData,
          src: videoSource,
          onSeeked: this.createThumbnail
        }),
        sliderValue ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'flex-container--row flex-container--space-between-center', style: { width: '100%' } },
            _react2.default.createElement(
              'span',
              { className: 'info-message' },
              '0\'00"'
            ),
            _react2.default.createElement(
              'span',
              { className: 'info-message' },
              totalMinutes,
              '\'',
              totalSeconds,
              '"'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', {
              type: 'range',
              min: sliderMinRange,
              max: sliderMaxRange,
              value: sliderValue,
              className: 'slider',
              onChange: this.handleSliderChange
            })
          )
        ) : _react2.default.createElement(
          'p',
          { className: 'info-message' },
          'loading... '
        ),
        error ? _react2.default.createElement(
          'p',
          { className: 'info-message--failure' },
          error
        ) : _react2.default.createElement(
          'p',
          { className: 'info-message' },
          'Use slider to set thumbnail'
        )
      );
    }
  }]);

  return PublishThumbnailInput;
}(_react2.default.Component);

exports.default = PublishThumbnailInput;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(111);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var publish = _ref.publish;

  return {
    showMetadataInputs: publish.showMetadataInputs,
    description: publish.metadata.description,
    license: publish.metadata.license,
    nsfw: publish.metadata.nsfw
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onMetadataChange: function onMetadataChange(name, value) {
      dispatch((0, _publish.updateMetadata)(name, value));
    },
    onToggleMetadataInputs: function onToggleMetadataInputs(value) {
      dispatch((0, _publish.toggleMetadataInputs)(value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_view2.default);

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ExpandingTextArea = __webpack_require__(112);

var _ExpandingTextArea2 = _interopRequireDefault(_ExpandingTextArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishMetadataInputs = function (_React$Component) {
  _inherits(PublishMetadataInputs, _React$Component);

  function PublishMetadataInputs(props) {
    _classCallCheck(this, PublishMetadataInputs);

    var _this = _possibleConstructorReturn(this, (PublishMetadataInputs.__proto__ || Object.getPrototypeOf(PublishMetadataInputs)).call(this, props));

    _this.toggleShowInputs = _this.toggleShowInputs.bind(_this);
    _this.handleInput = _this.handleInput.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  _createClass(PublishMetadataInputs, [{
    key: 'toggleShowInputs',
    value: function toggleShowInputs() {
      this.props.onToggleMetadataInputs(!this.props.showMetadataInputs);
    }
  }, {
    key: 'handleInput',
    value: function handleInput(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      this.props.onMetadataChange(name, value);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(event) {
      var name = event.target.name;
      var selectedOption = event.target.selectedOptions[0].value;
      this.props.onMetadataChange(name, selectedOption);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'publish-details', className: 'row row--padded row--no-top row--wide' },
        this.props.showMetadataInputs && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row row--no-top' },
            _react2.default.createElement(
              'div',
              { className: 'column column--3 column--med-10 align-content-top' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'publish-license', className: 'label' },
                'Description:'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--7 column--sml-10' },
              _react2.default.createElement(_ExpandingTextArea2.default, {
                id: 'publish-description',
                className: 'textarea textarea--primary textarea--full-width',
                rows: 1,
                maxLength: 2000,
                style: { maxHeight: 200 },
                name: 'description',
                placeholder: 'Optional description',
                value: this.props.description,
                onChange: this.handleInput })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row row--no-top' },
            _react2.default.createElement(
              'div',
              { className: 'column column--3 column--med-10' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'publish-license', className: 'label' },
                'License:'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--7 column--sml-10' },
              _react2.default.createElement(
                'select',
                { type: 'text', name: 'license', id: 'publish-license', className: 'select select--primary', onChange: this.handleSelect },
                _react2.default.createElement(
                  'option',
                  { value: ' ' },
                  'Unspecified'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Public Domain' },
                  'Public Domain'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Creative Commons' },
                  'Creative Commons'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row row--no-top' },
            _react2.default.createElement(
              'div',
              { className: 'column column--3' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'publish-nsfw', className: 'label' },
                'Mature:'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'column column--7' },
              _react2.default.createElement('input', { className: 'input-checkbox', type: 'checkbox', id: 'publish-nsfw', name: 'nsfw', value: this.props.nsfw, onChange: this.handleInput })
            )
          )
        ),
        _react2.default.createElement(
          'button',
          { className: 'button--secondary', onClick: this.toggleShowInputs },
          this.props.showMetadataInputs ? 'less' : 'more'
        )
      );
    }
  }]);

  return PublishMetadataInputs;
}(_react2.default.Component);

exports.default = PublishMetadataInputs;

/***/ }),
/* 112 */
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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(114);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var channel = _ref.channel,
      publish = _ref.publish;

  return {
    loggedInChannelName: channel.loggedInChannel.name,
    publishInChannel: publish.publishInChannel,
    selectedChannel: publish.selectedChannel,
    channelError: publish.error.channel
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onPublishInChannelChange: function onPublishInChannelChange(value) {
      dispatch((0, _publish.updateError)('channel', null));
      dispatch((0, _publish.setPublishInChannel)(value));
    },
    onChannelSelect: function onChannelSelect(value) {
      dispatch((0, _publish.updateError)('channel', null));
      dispatch((0, _publish.updateSelectedChannel)(value));
    }
  };
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

var _ChannelLoginForm = __webpack_require__(41);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(42);

var _ChannelCreateForm2 = _interopRequireDefault(_ChannelCreateForm);

var _publish_channel_select_states = __webpack_require__(35);

var states = _interopRequireWildcard(_publish_channel_select_states);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelSelect = function (_React$Component) {
  _inherits(ChannelSelect, _React$Component);

  function ChannelSelect(props) {
    _classCallCheck(this, ChannelSelect);

    var _this = _possibleConstructorReturn(this, (ChannelSelect.__proto__ || Object.getPrototypeOf(ChannelSelect)).call(this, props));

    _this.toggleAnonymousPublish = _this.toggleAnonymousPublish.bind(_this);
    _this.handleSelection = _this.handleSelection.bind(_this);
    return _this;
  }

  _createClass(ChannelSelect, [{
    key: 'toggleAnonymousPublish',
    value: function toggleAnonymousPublish(event) {
      var value = event.target.value;
      if (value === 'anonymous') {
        this.props.onPublishInChannelChange(false);
      } else {
        this.props.onPublishInChannelChange(true);
      }
    }
  }, {
    key: 'handleSelection',
    value: function handleSelection(event) {
      var selectedOption = event.target.selectedOptions[0].value;
      this.props.onChannelSelect(selectedOption);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'div',
            { className: 'column column--3 column--med-10' },
            _react2.default.createElement('input', { type: 'radio', name: 'anonymous-or-channel', id: 'anonymous-radio', className: 'input-radio', value: 'anonymous', checked: !this.props.publishInChannel, onChange: this.toggleAnonymousPublish }),
            _react2.default.createElement(
              'label',
              { className: 'label label--pointer', htmlFor: 'anonymous-radio' },
              'Anonymous'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'column column--7 column--med-10' },
            _react2.default.createElement('input', { type: 'radio', name: 'anonymous-or-channel', id: 'channel-radio', className: 'input-radio', value: 'in a channel', checked: this.props.publishInChannel, onChange: this.toggleAnonymousPublish }),
            _react2.default.createElement(
              'label',
              { className: 'label label--pointer', htmlFor: 'channel-radio' },
              'In a channel'
            )
          ),
          this.props.channelError ? _react2.default.createElement(
            'p',
            { className: 'info-message--failure' },
            this.props.channelError
          ) : _react2.default.createElement(
            'p',
            { className: 'info-message' },
            'Publish anonymously or in a channel'
          )
        ),
        this.props.publishInChannel && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'column column--3' },
            _react2.default.createElement(
              'label',
              { className: 'label', htmlFor: 'channel-name-select' },
              'Channel:'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'column column--7' },
            _react2.default.createElement(
              'select',
              { type: 'text', id: 'channel-name-select', className: 'select select--arrow', value: this.props.selectedChannel, onChange: this.handleSelection },
              this.props.loggedInChannelName && _react2.default.createElement(
                'option',
                { value: this.props.loggedInChannelName, id: 'publish-channel-select-channel-option' },
                this.props.loggedInChannelName
              ),
              _react2.default.createElement(
                'option',
                { value: states.LOGIN },
                'Existing'
              ),
              _react2.default.createElement(
                'option',
                { value: states.CREATE },
                'New'
              )
            )
          ),
          this.props.selectedChannel === states.LOGIN && _react2.default.createElement(_ChannelLoginForm2.default, null),
          this.props.selectedChannel === states.CREATE && _react2.default.createElement(_ChannelCreateForm2.default, null)
        )
      );
    }
  }]);

  return ChannelSelect;
}(_react2.default.Component);

exports.default = ChannelSelect;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(11);

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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(20);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _request = __webpack_require__(11);

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
/* 117 */
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
/* 118 */
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
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(120);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var publish = _ref.publish;

  return {
    status: publish.status.status,
    message: publish.status.message
  };
};

var mapDispatchToProps = {
  clearFile: _publish.clearFile
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

var _ProgressBar = __webpack_require__(20);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _publish_claim_states = __webpack_require__(121);

var publishStates = _interopRequireWildcard(_publish_claim_states);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishStatus = function (_React$Component) {
  _inherits(PublishStatus, _React$Component);

  function PublishStatus() {
    _classCallCheck(this, PublishStatus);

    return _possibleConstructorReturn(this, (PublishStatus.__proto__ || Object.getPrototypeOf(PublishStatus)).apply(this, arguments));
  }

  _createClass(PublishStatus, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          status = _props.status,
          message = _props.message,
          clearFile = _props.clearFile;

      return _react2.default.createElement(
        'div',
        { className: 'row row--tall flex-container--column flex-container--center-center' },
        status === publishStates.LOAD_START && _react2.default.createElement(
          'div',
          { className: 'row align-content-center' },
          _react2.default.createElement(
            'p',
            null,
            'File is loading to server'
          ),
          _react2.default.createElement(
            'p',
            { className: 'blue' },
            '0%'
          )
        ),
        status === publishStates.LOADING && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row align-content-center' },
            _react2.default.createElement(
              'p',
              null,
              'File is loading to server'
            ),
            _react2.default.createElement(
              'p',
              { className: 'blue' },
              message
            )
          )
        ),
        status === publishStates.PUBLISHING && _react2.default.createElement(
          'div',
          { className: 'row align-content-center' },
          _react2.default.createElement(
            'p',
            null,
            'Upload complete.  Your file is now being published on the blockchain...'
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
        status === publishStates.SUCCESS && _react2.default.createElement(
          'div',
          { className: 'row align-content-center' },
          _react2.default.createElement(
            'p',
            null,
            'Your publish is complete! You are being redirected to it now.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'If you are not automatically redirected, ',
            _react2.default.createElement(
              'a',
              { className: 'link--primary', target: '_blank', href: message },
              'click here.'
            )
          )
        ),
        status === publishStates.FAILED && _react2.default.createElement(
          'div',
          { className: 'row align-content-center' },
          _react2.default.createElement(
            'p',
            null,
            'Something went wrong...'
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'strong',
              null,
              message
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            'For help, post the above error text in the #speech channel on the ',
            _react2.default.createElement(
              'a',
              { className: 'link--primary', href: 'https://discord.gg/YjYbwhS', target: '_blank' },
              'lbry discord'
            )
          ),
          _react2.default.createElement(
            'button',
            { className: 'button--secondary', onClick: clearFile },
            'Reset'
          )
        )
      );
    }
  }]);

  return PublishStatus;
}(_react2.default.Component);

;

exports.default = PublishStatus;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD_START = exports.LOAD_START = 'LOAD_START';
var LOADING = exports.LOADING = 'LOADING';
var PUBLISHING = exports.PUBLISHING = 'PUBLISHING';
var SUCCESS = exports.SUCCESS = 'SUCCESS';
var FAILED = exports.FAILED = 'FAILED';

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(123);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var publish = _ref.publish;

  return {
    message: publish.disabledMessage
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublishDisabledMessage = function (_React$Component) {
  _inherits(PublishDisabledMessage, _React$Component);

  function PublishDisabledMessage() {
    _classCallCheck(this, PublishDisabledMessage);

    return _possibleConstructorReturn(this, (PublishDisabledMessage.__proto__ || Object.getPrototypeOf(PublishDisabledMessage)).apply(this, arguments));
  }

  _createClass(PublishDisabledMessage, [{
    key: 'render',
    value: function render() {
      var message = this.props.message;
      console.log('this.props.message:', message);
      return _react2.default.createElement(
        'div',
        { className: 'row dropzone--disabled row--tall flex-container--column flex-container--center-center' },
        _react2.default.createElement(
          'p',
          { className: 'text--disabled' },
          'Publishing is currently disabled.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'text--disabled' },
          message
        )
      );
    }
  }]);

  return PublishDisabledMessage;
}(_react2.default.Component);

exports.default = PublishDisabledMessage;

/***/ }),
/* 124 */
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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(126);

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
/* 126 */
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

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelLoginForm = __webpack_require__(41);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(42);

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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(8);

var _view = __webpack_require__(128);

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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = __webpack_require__(21);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _ShowAssetLite = __webpack_require__(129);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(132);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(138);

var _ShowChannel2 = _interopRequireDefault(_ShowChannel);

var _show_request_types = __webpack_require__(43);

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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(130);

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
/* 130 */
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

var _AssetDisplay = __webpack_require__(44);

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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(20);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _asset_display_states = __webpack_require__(37);

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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(133);

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
/* 133 */
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

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ErrorPage = __webpack_require__(21);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(134);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(44);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(136);

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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(135);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(13);

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
/* 135 */
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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(137);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(13);

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
/* 137 */
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
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(139);

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
/* 139 */
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

var _ErrorPage = __webpack_require__(21);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelClaimsDisplay = __webpack_require__(140);

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
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(8);

var _view = __webpack_require__(141);

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
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(142);

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
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(143);

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
/* 143 */
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
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(145);

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
/* 145 */
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

var _reactHelmet = __webpack_require__(14);

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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(17),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(147),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(148);
var handleShowRender = __webpack_require__(149);
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
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(30),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(29),
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
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(2);

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
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(32);

var _redux = __webpack_require__(18);

var _reducers = __webpack_require__(33);

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

var _GAListener = __webpack_require__(38);

var _GAListener2 = _interopRequireDefault(_GAListener);

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(45);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(150);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(15);

var _show_uri = __webpack_require__(151);

var _show = __webpack_require__(8);

var _reactHelmet = __webpack_require__(14);

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
  var store = (0, _redux.createStore)(_reducers2.default, middleware);

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
          _GAListener2.default,
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
/* 150 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = __webpack_require__(15);

var _show_action_types = __webpack_require__(12);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(8);

var _show_asset = __webpack_require__(152);

var _show_channel = __webpack_require__(154);

var _lbryUri = __webpack_require__(156);

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
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = __webpack_require__(15);

var _show_action_types = __webpack_require__(12);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(8);

var _assetApi = __webpack_require__(153);

var _show2 = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(newAssetRequest),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchNewAssetRequest);

function newAssetRequest(action) {
  var _action$data, requestType, requestId, name, modifier, state, longId, _ref, assetKey, shortId, _ref2, claimData, _ref3;

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

          if (!state.requestList[requestId]) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('return', null);

        case 8:
          // get long id && add request to request list
          longId = void 0;
          _context.prev = 9;
          _context.next = 12;
          return (0, _effects.call)(_assetApi.getLongClaimId, name, modifier);

        case 12:
          _ref = _context.sent;
          longId = _ref.data;
          _context.next = 21;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context['catch'](9);
          _context.next = 20;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t0.message));

        case 20:
          return _context.abrupt('return', _context.sent);

        case 21:
          assetKey = 'a#' + name + '#' + longId;
          _context.next = 24;
          return (0, _effects.put)((0, _show.addRequestToRequestList)(requestId, null, assetKey));

        case 24:
          if (!state.assetList[assetKey]) {
            _context.next = 26;
            break;
          }

          return _context.abrupt('return', null);

        case 26:
          // get short Id
          shortId = void 0;
          _context.prev = 27;
          _context.next = 30;
          return (0, _effects.call)(_assetApi.getShortId, name, longId);

        case 30:
          _ref2 = _context.sent;
          shortId = _ref2.data;
          _context.next = 39;
          break;

        case 34:
          _context.prev = 34;
          _context.t1 = _context['catch'](27);
          _context.next = 38;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t1.message));

        case 38:
          return _context.abrupt('return', _context.sent);

        case 39:
          // get asset claim data
          claimData = void 0;
          _context.prev = 40;
          _context.next = 43;
          return (0, _effects.call)(_assetApi.getClaimData, name, longId);

        case 43:
          _ref3 = _context.sent;
          claimData = _ref3.data;
          _context.next = 52;
          break;

        case 47:
          _context.prev = 47;
          _context.t2 = _context['catch'](40);
          _context.next = 51;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t2.message));

        case 51:
          return _context.abrupt('return', _context.sent);

        case 52:
          _context.next = 54;
          return (0, _effects.put)((0, _show.addAssetToAssetList)(assetKey, null, name, longId, shortId, claimData));

        case 54:
          _context.next = 56;
          return (0, _effects.put)((0, _show.onRequestError)(null));

        case 56:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[9, 16], [27, 34], [40, 47]]);
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
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongClaimId = getLongClaimId;
exports.getShortId = getShortId;
exports.getClaimData = getClaimData;

var _request = __webpack_require__(11);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(3),
    host = _require.details.host;

function getLongClaimId(name, modifier) {
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

function getShortId(name, claimId) {
  var url = host + '/api/claim/short-id/' + claimId + '/' + name;
  return (0, _request2.default)(url);
};

function getClaimData(name, claimId) {
  var url = host + '/api/claim/data/' + name + '/' + claimId;
  return (0, _request2.default)(url);
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = __webpack_require__(15);

var _show_action_types = __webpack_require__(12);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(8);

var _channelApi = __webpack_require__(155);

var _show2 = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(newChannelRequest),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watchNewChannelRequest),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(getNewClaimsAndUpdateChannel),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(watchUpdateChannelClaims);

function newChannelRequest(action) {
  var _action$data, requestType, requestId, channelName, channelId, state, longId, shortId, _ref, _ref$data, channelKey, claimsData, _ref2;

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

          if (!state.requestList[requestId]) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('return', null);

        case 8:
          // get channel long id
          longId = void 0, shortId = void 0;
          _context.prev = 9;
          _context.next = 12;
          return (0, _effects.call)(_channelApi.getChannelData, channelName, channelId);

        case 12:
          _ref = _context.sent;
          _ref$data = _ref.data;
          longId = _ref$data.longChannelClaimId;
          shortId = _ref$data.shortChannelClaimId;
          _context.next = 23;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context['catch'](9);
          _context.next = 22;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t0.message));

        case 22:
          return _context.abrupt('return', _context.sent);

        case 23:
          // store the request in the channel requests list
          channelKey = 'c#' + channelName + '#' + longId;
          _context.next = 26;
          return (0, _effects.put)((0, _show.addRequestToRequestList)(requestId, null, channelKey));

        case 26:
          if (!state.channelList[channelKey]) {
            _context.next = 28;
            break;
          }

          return _context.abrupt('return', null);

        case 28:
          // get channel claims data
          claimsData = void 0;
          _context.prev = 29;
          _context.next = 32;
          return (0, _effects.call)(_channelApi.getChannelClaims, channelName, longId, 1);

        case 32:
          _ref2 = _context.sent;
          claimsData = _ref2.data;
          _context.next = 41;
          break;

        case 36:
          _context.prev = 36;
          _context.t1 = _context['catch'](29);
          _context.next = 40;
          return (0, _effects.put)((0, _show.onRequestError)(_context.t1.message));

        case 40:
          return _context.abrupt('return', _context.sent);

        case 41:
          _context.next = 43;
          return (0, _effects.put)((0, _show.addNewChannelToChannelList)(channelKey, channelName, shortId, longId, claimsData));

        case 43:
          _context.next = 45;
          return (0, _effects.put)((0, _show.onRequestError)(null));

        case 45:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[9, 18], [29, 36]]);
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
  var _action$data2, channelKey, name, longId, page, claimsData, _ref3;

  return regeneratorRuntime.wrap(function getNewClaimsAndUpdateChannel$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _action$data2 = action.data, channelKey = _action$data2.channelKey, name = _action$data2.name, longId = _action$data2.longId, page = _action$data2.page;
          claimsData = void 0;
          _context3.prev = 2;
          _context3.next = 5;
          return (0, _effects.call)(_channelApi.getChannelClaims, name, longId, page);

        case 5:
          _ref3 = _context3.sent;
          claimsData = _ref3.data;
          _context3.next = 14;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3['catch'](2);
          _context3.next = 13;
          return (0, _effects.put)((0, _show.onRequestError)(_context3.t0.message));

        case 13:
          return _context3.abrupt('return', _context3.sent);

        case 14:
          _context3.next = 16;
          return (0, _effects.put)((0, _show.updateChannelClaims)(channelKey, claimsData));

        case 16:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this, [[2, 9]]);
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
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelData = getChannelData;
exports.getChannelClaims = getChannelClaims;

var _request = __webpack_require__(11);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(3),
    host = _require.details.host;

function getChannelData(name, id) {
  if (!id) id = 'none';
  var url = host + '/api/channel/data/' + name + '/' + id;
  return (0, _request2.default)(url);
};

function getChannelClaims(name, longId, page) {
  if (!page) page = 1;
  var url = host + '/api/channel/claims/' + name + '/' + longId + '/' + page;
  return (0, _request2.default)(url);
};

/***/ }),
/* 156 */
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
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(31);

module.exports = function (app) {
  // a catch-all route if someone visits a page that does not exist
  app.use('*', function (req, res) {
    // send response
    handlePageRender(req, res);
  });
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTgzYzcwZTgzMzA4MWFmYjQ2Y2MiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9hY3Rpb25zL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL3JlYWN0L3V0aWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL3JlYWN0L3NlbGVjdG9ycy9zaG93LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwid2VicGFjazovLy8uL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy8uL3JlYWN0L2FjdGlvbnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL3NsYWNrQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9yZWFjdC9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9Ecm9wem9uZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMvcmVuZGVyRnVsbFBhZ2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy8uL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9jb25maWd1cmVMb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiIiwid2VicGFjazovLy8uL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL21vZGVscy9maWxlLmpzIiwid2VicGFjazovLy8uL21vZGVscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwid2VicGFjazovLy8uL3JvdXRlcy9hdXRoLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9yb3V0ZXMvYXBpLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIiIsIndlYnBhY2s6Ly8vLi9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy8uL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9yb3V0ZXMvcGFnZS1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvcmVkdWNlcnMvcHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3JlYWN0L3JlZHVjZXJzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvcmVkdWNlcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1nYVwiIiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvSG9tZVBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvU0VPL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L3V0aWxzL3BhZ2VUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC91dGlscy9tZXRhVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC91dGlscy9jYW5vbmljYWxMaW5rLmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0Ryb3B6b25lL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L3V0aWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9QdWJsaXNoUHJldmlldy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoRGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5L2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvQWJvdXRQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0xvZ2luUGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0xvZ2luUGFnZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1Nob3dQYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvU2hvd1BhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0Fzc2V0VGl0bGUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9TaG93Q2hhbm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1Nob3dDaGFubmVsL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JvdXRlcy9zZXJ2ZS1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL3JlYWN0L3NhZ2FzL3Nob3dfdXJpLmpzIiwid2VicGFjazovLy8uL3JlYWN0L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL3JlYWN0L3NhZ2FzL3Nob3dfY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9hcGkvY2hhbm5lbEFwaS5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC91dGlscy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3JvdXRlcy9mYWxsYmFjay1yb3V0ZXMuanMiXSwibmFtZXMiOlsiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImRldGFpbHMiLCJob3N0IiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsImNvbmZpZ3VyZSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwic2VsZWN0RmlsZSIsImNsZWFyRmlsZSIsInVwZGF0ZU1ldGFkYXRhIiwidXBkYXRlQ2xhaW0iLCJzZXRQdWJsaXNoSW5DaGFubmVsIiwidXBkYXRlUHVibGlzaFN0YXR1cyIsInVwZGF0ZUVycm9yIiwidXBkYXRlU2VsZWN0ZWRDaGFubmVsIiwidG9nZ2xlTWV0YWRhdGFJbnB1dHMiLCJvbk5ld1RodW1ibmFpbCIsInN0YXJ0UHVibGlzaCIsImFjdGlvbnMiLCJmaWxlIiwidHlwZSIsIkZJTEVfU0VMRUNURUQiLCJkYXRhIiwiRklMRV9DTEVBUiIsIm5hbWUiLCJ2YWx1ZSIsIk1FVEFEQVRBX1VQREFURSIsIkNMQUlNX1VQREFURSIsImNoYW5uZWwiLCJTRVRfUFVCTElTSF9JTl9DSEFOTkVMIiwic3RhdHVzIiwibWVzc2FnZSIsIlBVQkxJU0hfU1RBVFVTX1VQREFURSIsIkVSUk9SX1VQREFURSIsImNoYW5uZWxOYW1lIiwiU0VMRUNURURfQ0hBTk5FTF9VUERBVEUiLCJzaG93TWV0YWRhdGFJbnB1dHMiLCJUT0dHTEVfTUVUQURBVEFfSU5QVVRTIiwiVEhVTUJOQUlMX05FVyIsImhpc3RvcnkiLCJQVUJMSVNIX1NUQVJUIiwiU2VxdWVsaXplIiwicmVxdWlyZSIsImxvZ2dlciIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImRiIiwic2VxdWVsaXplIiwiZGlhbGVjdCIsImRpYWxlY3RPcHRpb25zIiwiZGVjaW1hbE51bWJlcnMiLCJsb2dnaW5nIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJhY3F1aXJlIiwiYXV0aGVudGljYXRlIiwidGhlbiIsImluZm8iLCJjYXRjaCIsImVycm9yIiwiZXJyIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJpbXBvcnQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwiZGVidWciLCJ1cGRhdGUiLCJjcmVhdGUiLCJtYXBTdGF0ZVRvUHJvcHMiLCJsb2dnZWRJbkNoYW5uZWwiLCJjaGFubmVsU2hvcnRJZCIsInNob3J0SWQiLCJjaGFubmVsTG9uZ0lkIiwibG9uZ0lkIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwib25DaGFubmVsTG9naW4iLCJkaXNwYXRjaCIsIm9uQ2hhbm5lbExvZ291dCIsIm9uSGFuZGxlU2hvd1BhZ2VVcmkiLCJvblJlcXVlc3RFcnJvciIsIm9uTmV3Q2hhbm5lbFJlcXVlc3QiLCJvbk5ld0Fzc2V0UmVxdWVzdCIsIm9uUmVxdWVzdFVwZGF0ZSIsImFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IiwiYWRkQXNzZXRUb0Fzc2V0TGlzdCIsImFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0Iiwib25VcGRhdGVDaGFubmVsQ2xhaW1zIiwidXBkYXRlQ2hhbm5lbENsYWltcyIsImZpbGVSZXF1ZXN0ZWQiLCJ1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IiwidXBkYXRlRGlzcGxheUFzc2V0RXJyb3IiLCJwYXJhbXMiLCJIQU5ETEVfU0hPV19VUkkiLCJSRVFVRVNUX0VSUk9SIiwiY2hhbm5lbElkIiwicmVxdWVzdFR5cGUiLCJyZXF1ZXN0SWQiLCJDSEFOTkVMX1JFUVVFU1RfTkVXIiwiaWQiLCJleHRlbnNpb24iLCJBU1NFVF9SRVFVRVNUX05FVyIsIm1vZGlmaWVyIiwiUkVRVUVTVF9VUERBVEUiLCJrZXkiLCJSRVFVRVNUX0xJU1RfQUREIiwiY2xhaW1JZCIsImNsYWltRGF0YSIsIkFTU0VUX0FERCIsImNsYWltc0RhdGEiLCJDSEFOTkVMX0FERCIsImNoYW5uZWxLZXkiLCJwYWdlIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DIiwiY2hhbm5lbExpc3RJZCIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTIiwiRklMRV9SRVFVRVNURUQiLCJGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUiLCJESVNQTEFZX0FTU0VUX0VSUk9SIiwic2l0ZSIsImRlZmF1bHREZXNjcmlwdGlvbiIsImRlZmF1bHRUaHVtYm5haWwiLCJzaXRlRGVzY3JpcHRpb24iLCJzaXRlSG9zdCIsInNpdGVUaXRsZSIsInNpdGVUd2l0dGVyIiwicmVxdWVzdCIsInBhcnNlSlNPTiIsInJlc3BvbnNlIiwianNvbiIsImNoZWNrU3RhdHVzIiwianNvblJlc3BvbnNlIiwiRXJyb3IiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJQcm9taXNlIiwiYWxsIiwic2VsZWN0QXNzZXQiLCJzaG93IiwicmVxdWVzdExpc3QiLCJhc3NldEtleSIsImFzc2V0TGlzdCIsInNlbGVjdFNob3dTdGF0ZSIsInN0YXRlIiwiYXhpb3MiLCJhcGkiLCJhcGlIb3N0IiwiYXBpUG9ydCIsImxicnlBcGlVcmkiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJzZW5kR0FUaW1pbmdFdmVudCIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bHQiLCJKU09OIiwic3RyaW5naWZ5IiwicHVibGlzaENsYWltIiwicHVibGlzaFBhcmFtcyIsImdhU3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInBvc3QiLCJtZXRob2QiLCJnZXRDbGFpbSIsInVyaSIsInRpbWVvdXQiLCJnZXRDbGFpbUxpc3QiLCJjbGFpbU5hbWUiLCJyZXNvbHZlVXJpIiwiZ2V0RG93bmxvYWREaXJlY3RvcnkiLCJkb3dubG9hZF9kaXJlY3RvcnkiLCJjcmVhdGVDaGFubmVsIiwiY2hhbm5lbF9uYW1lIiwiYW1vdW50IiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImlwIiwib3JpZ2luYWxVcmwiLCJldmVudENhdGVnb3J5IiwiZXZlbnRBY3Rpb24iLCJldmVudExhYmVsIiwiaXBPdmVycmlkZSIsInVzZXJBZ2VudE92ZXJyaWRlIiwiY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIiwiY2F0ZWdvcnkiLCJ2YXJpYWJsZSIsImxhYmVsIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImR1cmF0aW9uIiwidXNlclRpbWluZ0NhdGVnb3J5IiwidXNlclRpbWluZ1ZhcmlhYmxlTmFtZSIsInVzZXJUaW1pbmdUaW1lIiwidXNlclRpbWluZ0xhYmVsIiwic2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IiwidmlzaXRvcklkIiwicmVwbGFjZSIsInZpc2l0b3IiLCJzdHJpY3RDaWRGb3JtYXQiLCJodHRwcyIsImV2ZW50Iiwic2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyIsInRpbWluZyIsInNlbmRHQVNlcnZlRXZlbnQiLCJjaGFubmVsX2lkIiwidXBkYXRlTG9nZ2VkSW5DaGFubmVsIiwiQ0hBTk5FTF9VUERBVEUiLCJQcm9ncmVzc0JhciIsInByb3BzIiwiYmFycyIsImluZGV4IiwiaW5jcmVtZW50ZXIiLCJjcmVhdGVCYXJzIiwiYmluZCIsInN0YXJ0UHJvZ3Jlc3NCYXIiLCJ1cGRhdGVQcm9ncmVzc0JhciIsInN0b3BQcm9ncmVzc0JhciIsImkiLCJzaXplIiwicHVzaCIsImlzQWN0aXZlIiwic2V0U3RhdGUiLCJ1cGRhdGVJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm1hcCIsImJhciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJFcnJvclBhZ2UiLCJzdHJpbmciLCJNeXNxbENvbmZpZyIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwicmV0dXJuU2hvcnRJZCIsImNsYWltc0FycmF5IiwiY2xhaW1JbmRleCIsInN1YnN0cmluZyIsInNob3J0SWRMZW5ndGgiLCJmaW5kSW5kZXgiLCJlbGVtZW50IiwicG9zc2libGVNYXRjaGVzIiwic2xpY2UiLCJsZW5ndGgiLCJmaWx0ZXIiLCJmcyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5IiwibnNmdyIsImxpY2Vuc2UiLCJpbnZhbGlkTmFtZUNoYXJhY3RlcnMiLCJleGVjIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwicGF0aCIsInRlc3QiLCJ2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSIsImZpbGVOYW1lIiwiZmlsZVBhdGgiLCJmaWxlVHlwZSIsInRodW1ibmFpbEZpbGVOYW1lIiwidGh1bWJuYWlsRmlsZVBhdGgiLCJ0aHVtYm5haWxGaWxlVHlwZSIsImNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyIsInRyaW0iLCJmaWxlX3BhdGgiLCJiaWQiLCJtZXRhZGF0YSIsImF1dGhvciIsImxhbmd1YWdlIiwiY2xhaW1fYWRkcmVzcyIsImNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJkZWxldGVUZW1wb3JhcnlGaWxlIiwidW5saW5rIiwiYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEiLCJmaWxlSW5mbyIsImdldFJlc3VsdCIsImZpbGVfbmFtZSIsImRvd25sb2FkX3BhdGgiLCJjcmVhdGVGaWxlRGF0YSIsIm91dHBvaW50IiwiaGVpZ2h0IiwiYWRkcmVzcyIsImNvbnRlbnRUeXBlIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsImNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIiwiY29kZSIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInN1Y2Nlc3MiLCJyZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIiwiTk9fQ0hBTk5FTCIsIk5PX0NMQUlNIiwiTk9fRklMRSIsImdldENsYWltSWQiLCJjaGFubmVsQ2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsImxvbmdDaGFubmVsQ2xhaW1JZCIsImdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQiLCJzaG9ydENoYW5uZWxDbGFpbUlkIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJkYXRhVmFsdWVzIiwicmVxIiwiY29udGV4dCIsInN0b3JlIiwiaHRtbCIsImhlbG1ldCIsInJlbmRlclN0YXRpYyIsInJlZGlyZWN0IiwicHJlbG9hZGVkU3RhdGUiLCJnZXRTdGF0ZSIsInNlbmQiLCJwdWJsaXNoIiwiTE9HSU4iLCJDUkVBVEUiLCJMT0NBTF9DSEVDSyIsIlVOQVZBSUxBQkxFIiwiRVJST1IiLCJBVkFJTEFCTEUiLCJpbml0aWFsaXplIiwiR0FMaXN0ZW5lciIsInNlbmRQYWdlVmlldyIsImxvY2F0aW9uIiwibGlzdGVuIiwic2V0IiwicGF0aG5hbWUiLCJwYWdldmlldyIsImNoaWxkcmVuIiwiQXBwIiwiZmlsZUVycm9yIiwic2V0RmlsZUVycm9yIiwiQ0hBTk5FTCIsIkFTU0VUX0xJVEUiLCJBU1NFVF9ERVRBSUxTIiwiZGlzcGxheUFzc2V0IiwiYXNzZXQiLCJvbkZpbGVSZXF1ZXN0IiwidG9TdHJpbmciLCJtZXRhIiwibGluayIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwicGFzc3BvcnQiLCJwb3B1bGF0ZUxvY2Fsc0RvdFVzZXIiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJTcGVlY2hTZXJ2ZXIiLCJteXNxbENvbmZpZyIsInNpdGVDb25maWciLCJzbGFja0NvbmZpZyIsInN0YXJ0IiwiY29uZmlndXJlQ29uZmlnRmlsZXMiLCJjb25maWd1cmVMb2dnaW5nIiwiY29uZmlndXJlQXBwIiwiY29uZmlndXJlU2VydmVyIiwic3RhcnRTZXJ2ZXIiLCJteXNxbEFwcENvbmZpZyIsInNpdGVBcHBDb25maWciLCJQT1JUIiwic2xhY2tBcHBDb25maWciLCJhcHAiLCJlbmFibGUiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJuZXh0IiwidmVyYm9zZSIsInNlcmlhbGl6ZVVzZXIiLCJkZXNlcmlhbGl6ZVVzZXIiLCJsb2NhbFNpZ251cFN0cmF0ZWd5IiwibG9jYWxMb2dpblN0cmF0ZWd5IiwibWF4QWdlIiwic2Vzc2lvbiIsImhicyIsImRlZmF1bHRMYXlvdXQiLCJoYW5kbGViYXJzIiwiZW5naW5lIiwic2VydmVyIiwiU2VydmVyIiwic3luYyIsInVzZXIiLCJsb2NhbHMiLCJ1c2VyTmFtZSIsInNob3J0Q2hhbm5lbElkIiwiZG9uZSIsImxvZ0xldmVsIiwid2luc3RvbiIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwibGV2ZWwiLCJ0aW1lc3RhbXAiLCJjb2xvcml6ZSIsInByZXR0eVByaW50IiwiaGFuZGxlRXhjZXB0aW9ucyIsImh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb24iLCJ3YXJuIiwic2lsbHkiLCJsb2dnZXJDb25maWciLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwibGJyeUFwaSIsInVzZXJuYW1lRmllbGQiLCJwYXNzd29yZEZpZWxkIiwidXNlckluZm8iLCJ1c2VyRGF0YSIsImNoYW5uZWxEYXRhIiwidHgiLCJjbGFpbV9pZCIsImNlcnRpZmljYXRlRGF0YSIsIm5ld1VzZXIiLCJuZXdDaGFubmVsIiwibmV3Q2VydGlmaWNhdGUiLCJzZXRDaGFubmVsIiwic2V0VXNlciIsImxicnlDb25maWciLCJTVFJJTkciLCJCT09MRUFOIiwiSU5URUdFUiIsIlRFWFQiLCJERUNJTUFMIiwiZGVmaW5lIiwiZGVmYXVsdCIsImNsYWltU2VxdWVuY2UiLCJkZWNvZGVkQ2xhaW0iLCJkZXB0aCIsImVmZmVjdGl2ZUFtb3VudCIsImhhc1NpZ25hdHVyZSIsImhleCIsIm5vdXQiLCJ0eGlkIiwidmFsaWRBdEhlaWdodCIsInZhbHVlVmVyc2lvbiIsImNsYWltVHlwZSIsImNlcnRpZmljYXRlVmVyc2lvbiIsImtleVR5cGUiLCJwdWJsaWNLZXkiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJmb3JlaWduS2V5IiwiYWxsb3dOdWxsIiwiZmluZEFsbCIsIm9yZGVyIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCIsIiRsaWtlIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSIsInZhbGlkYXRlTG9uZ0NoYW5uZWxJZCIsImhhc09uZSIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwiY2xhaW0iLCJjZXJ0aWZpY2F0ZUlkIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2UiLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiYWN0aW9uIiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZVBhc3N3b3JkIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwiZ2V0Q2hhbm5lbCIsImlzTWF0Y2giLCJsb2dJbiIsImdldCIsImxvZ291dCIsIm11bHRpcGFydCIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJ1cGxvYWREaXIiLCJjbGFpbU5hbWVJc0F2YWlsYWJsZSIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsImVycm9ySGFuZGxlcnMiLCJhdXRoZW50aWNhdGVVc2VyIiwiYXZhaWxhYmxlTmFtZSIsImJvZHkiLCJjbGFpbXNMaXN0IiwicmVzb2x2ZVJlc3VsdCIsImZpbGVEYXRhIiwiZmlsZVJlY29yZCIsImNvbXBsZXRlZCIsInJlc29sdmVkVXJpIiwiZmlsZXMiLCJjaGFubmVsUGFzc3dvcmQiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiY2xhaW1JbmZvIiwicHVibGlzaEhlbHBlcnMiLCJPcCIsInB1Ymxpc2hSZXN1bHRzIiwiY2xhaW1SZWNvcmQiLCJ1cHNlcnRDcml0ZXJpYSIsInNldENsYWltIiwic2V0RmlsZSIsImNsYWltQWRkcmVzc2VzIiwiYXR0cmlidXRlcyIsIm9yIiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJDTEFJTVNfUEVSX1BBR0UiLCJjbGFpbXMiLCJ0b3RhbFBhZ2VzIiwiZGV0ZXJtaW5lVG90YWxQYWdlcyIsInBhZ2luYXRpb25QYWdlIiwiZ2V0UGFnZUZyb21RdWVyeSIsInZpZXdEYXRhIiwiZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIiwicHJldmlvdXNQYWdlIiwiZGV0ZXJtaW5lUHJldmlvdXNQYWdlIiwiY3VycmVudFBhZ2UiLCJuZXh0UGFnZSIsImRldGVybWluZU5leHRQYWdlIiwidG90YWxSZXN1bHRzIiwiZGV0ZXJtaW5lVG90YWxDbGFpbXMiLCJwYXJzZUludCIsInBhZ2VOdW1iZXIiLCJjbGFpbVN0YXJ0SW5kZXgiLCJjbGFpbUVuZEluZGV4IiwicGFnZU9mQ2xhaW1zIiwidG90YWxDbGFpbXMiLCJmdWxsUGFnZXMiLCJNYXRoIiwiZmxvb3IiLCJyZW1haW5kZXIiLCJoYW5kbGVQYWdlUmVuZGVyIiwicmVuZGVyIiwibGF5b3V0IiwiaW5pdGlhbFN0YXRlIiwiYXNzaWduIiwicHVibGlzaEluQ2hhbm5lbCIsInNlbGVjdGVkQ2hhbm5lbCIsInB1Ymxpc2hTdWJtaXQiLCJjaGFubmVsTGlzdCIsImdvb2dsZUFuYWx5dGljc0lkIiwiSG9tZVBhZ2UiLCJTRU8iLCJwYWdlVXJpIiwicGFnZVRpdGxlIiwibWV0YVRhZ3MiLCJjYW5vbmljYWxMaW5rIiwicmVsIiwiaHJlZiIsIm9iamVjdCIsImNyZWF0ZVBhZ2VUaXRsZSIsImRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJmaWxlRXh0IiwibGFzdEluZGV4T2YiLCJjcmVhdGVCYXNpY01ldGFUYWdzIiwicHJvcGVydHkiLCJjb250ZW50IiwiY3JlYXRlQ2hhbm5lbE1ldGFUYWdzIiwiY3JlYXRlQXNzZXRNZXRhVGFncyIsImVtYmVkVXJsIiwic2hvd1VybCIsIm9nVGl0bGUiLCJvZ0Rlc2NyaXB0aW9uIiwib2dUaHVtYm5haWxDb250ZW50VHlwZSIsIm9nVGh1bWJuYWlsIiwiY3JlYXRlTWV0YVRhZ3MiLCJjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsiLCJjcmVhdGVBc3NldENhbm9uaWNhbExpbmsiLCJjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayIsImNyZWF0ZUNhbm9uaWNhbExpbmsiLCJWSUVXIiwiTE9HT1VUIiwiTmF2QmFyIiwiY2hlY2tGb3JMb2dnZWRJblVzZXIiLCJsb2dvdXRVc2VyIiwiaGFuZGxlU2VsZWN0aW9uIiwiY3JlZGVudGlhbHMiLCJ0YXJnZXQiLCJzZWxlY3RlZE9wdGlvbnMiLCJMb2dvIiwiTmF2QmFyQ2hhbm5lbERyb3Bkb3duIiwiZGVmYXVsdFNlbGVjdGlvbiIsIlB1Ymxpc2hUb29sIiwiRHJvcHpvbmUiLCJkcmFnT3ZlciIsIm1vdXNlT3ZlciIsImRpbVByZXZpZXciLCJoYW5kbGVEcm9wIiwiaGFuZGxlRHJhZ092ZXIiLCJoYW5kbGVEcmFnRW5kIiwiaGFuZGxlRHJhZ0VudGVyIiwiaGFuZGxlRHJhZ0xlYXZlIiwiaGFuZGxlTW91c2VFbnRlciIsImhhbmRsZU1vdXNlTGVhdmUiLCJoYW5kbGVDbGljayIsImhhbmRsZUZpbGVJbnB1dCIsImNob29zZUZpbGUiLCJwcmV2ZW50RGVmYXVsdCIsImR0IiwiZGF0YVRyYW5zZmVyIiwiaXRlbXMiLCJraW5kIiwiZHJvcHBlZEZpbGUiLCJnZXRBc0ZpbGUiLCJyZW1vdmUiLCJjbGVhckRhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xpY2siLCJmaWxlTGlzdCIsInZhbGlkYXRlRmlsZSIsIlB1Ymxpc2hQcmV2aWV3IiwiaW1nU291cmNlIiwic2V0UHJldmlld0ltYWdlU291cmNlIiwibmV3UHJvcHMiLCJzZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSIsInByZXZpZXdSZWFkZXIiLCJGaWxlUmVhZGVyIiwicmVhZEFzRGF0YVVSTCIsIm9ubG9hZGVuZCIsImJvb2wiLCJQdWJsaXNoRGV0YWlscyIsIm9uUHVibGlzaFN1Ym1pdCIsIm9uTWV0YWRhdGFDaGFuZ2UiLCJQdWJsaXNoVGl0bGVJbnB1dCIsImhhbmRsZUlucHV0IiwiZSIsImxvZ2dlZEluQ2hhbm5lbE5hbWUiLCJsb2dnZWRJbkNoYW5uZWxTaG9ydElkIiwidXJsRXJyb3IiLCJvbkNsYWltQ2hhbmdlIiwib25VcmxFcnJvciIsIlB1Ymxpc2hVcmxJbnB1dCIsInNldENsYWltTmFtZSIsInZhbGlkYXRlQ2xhaW0iLCJjbGVhbnNlSW5wdXQiLCJpbnB1dCIsImZpbGVOYW1lV2l0aG91dEVuZGluZyIsImNsZWFuQ2xhaW1OYW1lIiwiVXJsTWlkZGxlIiwiZGF0YVVSSXRvQmxvYiIsImRhdGFVUkkiLCJieXRlU3RyaW5nIiwiYXRvYiIsInNwbGl0IiwibWltZVN0cmluZyIsImlhIiwiVWludDhBcnJheSIsImNoYXJDb2RlQXQiLCJCbG9iIiwiUHVibGlzaFRodW1ibmFpbElucHV0IiwidmlkZW9Tb3VyY2UiLCJzbGlkZXJNaW5SYW5nZSIsInNsaWRlck1heFJhbmdlIiwic2xpZGVyVmFsdWUiLCJoYW5kbGVWaWRlb0xvYWRlZERhdGEiLCJoYW5kbGVTbGlkZXJDaGFuZ2UiLCJjcmVhdGVUaHVtYm5haWwiLCJzZXRWaWRlb1NvdXJjZSIsIm5leHRQcm9wcyIsImRhdGFVcmkiLCJibG9iIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwidG90YWxNaW51dGVzIiwidG90YWxTZWNvbmRzIiwidmlkZW8iLCJjdXJyZW50VGltZSIsImNhbnZhcyIsImNyZWF0ZUVsZW1lbnQiLCJ3aWR0aCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsImdldENvbnRleHQiLCJkcmF3SW1hZ2UiLCJkYXRhVXJsIiwidG9EYXRhVVJMIiwic25hcHNob3QiLCJkaXNwbGF5Iiwib25Ub2dnbGVNZXRhZGF0YUlucHV0cyIsIlB1Ymxpc2hNZXRhZGF0YUlucHV0cyIsInRvZ2dsZVNob3dJbnB1dHMiLCJoYW5kbGVTZWxlY3QiLCJjaGVja2VkIiwic2VsZWN0ZWRPcHRpb24iLCJtYXhIZWlnaHQiLCJFeHBhbmRpbmdUZXh0YXJlYSIsIl9oYW5kbGVDaGFuZ2UiLCJhZGp1c3RUZXh0YXJlYSIsIm9uQ2hhbmdlIiwiZWwiLCJzdHlsZSIsInNjcm9sbEhlaWdodCIsInJlc3QiLCJ4IiwiZnVuYyIsImNoYW5uZWxFcnJvciIsIm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZSIsIm9uQ2hhbm5lbFNlbGVjdCIsInN0YXRlcyIsIkNoYW5uZWxTZWxlY3QiLCJ0b2dnbGVBbm9ueW1vdXNQdWJsaXNoIiwiQ2hhbm5lbExvZ2luRm9ybSIsImxvZ2luVG9DaGFubmVsIiwiSGVhZGVycyIsIkNoYW5uZWxDcmVhdGVGb3JtIiwiaGFuZGxlQ2hhbm5lbElucHV0IiwiY2xlYW5zZUNoYW5uZWxJbnB1dCIsInVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSIsImNoYW5uZWxXaXRoQXRTeW1ib2wiLCJjaGVja0lzUGFzc3dvcmRQcm92aWRlZCIsImNoZWNrSXNDaGFubmVsQXZhaWxhYmxlIiwibWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCIsIkFjdGl2ZVN0YXR1c0JhciIsIkluYWN0aXZlU3RhdHVzQmFyIiwicHVibGlzaFN0YXRlcyIsIlB1Ymxpc2hTdGF0dXMiLCJMT0FEX1NUQVJUIiwiTE9BRElORyIsIlBVQkxJU0hJTkciLCJTVUNDRVNTIiwiRkFJTEVEIiwiUHVibGlzaERpc2FibGVkTWVzc2FnZSIsIkFib3V0UGFnZSIsIkxvZ2luUGFnZSIsIlNob3dQYWdlIiwibWF0Y2giLCJTaG93TGl0ZSIsIkFzc2V0RGlzcGxheSIsIlNob3dBc3NldERldGFpbHMiLCJBc3NldFRpdGxlIiwiQXNzZXRJbmZvIiwiY29weVRvQ2xpcGJvYXJkIiwiZWxlbWVudFRvQ29weSIsImRhdGFzZXQiLCJlbGVtZW50dG9jb3B5Iiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJwcmV2aW91c1JlcXVlc3QiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwic2hvd05ld1BhZ2UiLCJkZWZhdWx0cyIsIkFzc2V0UHJldmlldyIsImRpcmVjdFNvdXJjZUxpbmsiLCJzaG93VXJsTGluayIsIkZvdXJPaEZvclBhZ2UiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IiwibG9nUmVxdWVzdERhdGEiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwiU0VSVkUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicGFyc2VNb2RpZmllciIsInJlc3BvbnNlVHlwZSIsInBhcnNlQ2xhaW0iLCJpc0NoYW5uZWwiLCJwYXJzZUlkZW50aWZpZXIiLCJpZGVudGlmaWVyIiwiU0hPVyIsImNsaWVudEFjY2VwdHNIdG1sIiwiYWNjZXB0IiwicmVxdWVzdElzRnJvbUJyb3dzZXIiLCJjbGllbnRXYW50c0Fzc2V0IiwicmFuZ2UiLCJpbWFnZUlzV2FudGVkIiwidmlkZW9Jc1dhbnRlZCIsImlzVmFsaWRDbGFpbUlkIiwiaXNWYWxpZFNob3J0SWQiLCJpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCIsInNlcnZlQXNzZXRUb0NsaWVudCIsInNlbmRGaWxlT3B0aW9ucyIsInNlbmRGaWxlIiwiZnVsbENsYWltSWQiLCJ0ZW1wTmFtZSIsIlJFR0VYUF9JTlZBTElEX0NMQUlNIiwiUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCIsIlJFR0VYUF9BRERSRVNTIiwiQ0hBTk5FTF9DSEFSIiwiY29tcG9uZW50c1JlZ2V4IiwiUmVnRXhwIiwicHJvdG8iLCJtb2RpZmllclNlcGVyYXRvciIsInN0YXJ0c1dpdGgiLCJuYW1lQmFkQ2hhcnMiLCJqb2luIiwicmV0dXJuU2FnYVdpdGhQYXJhbXMiLCJzYWdhIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlIiwicnVuIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJ3YXRjaEhhbmRsZVNob3dQYWdlVXJpIiwicGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0iLCJwYXJzZUFuZFVwZGF0ZUNsYWltT25seSIsIm5ld0Fzc2V0UmVxdWVzdCIsIndhdGNoTmV3QXNzZXRSZXF1ZXN0IiwiZ2V0U2hvcnRJZCIsImdldENsYWltRGF0YSIsIm5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hOZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyIsImdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwiLCJleHRlbnNpb25TZXBlcmF0b3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsa0M7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSxvQzs7Ozs7Ozs7O0FDQUEsU0FBU0EsVUFBVCxHQUF1QjtBQUFBOztBQUNyQixPQUFLQyxTQUFMLEdBQWlCO0FBQ2ZDLGNBQVU7QUFESyxHQUFqQjtBQUdBLE9BQUtDLGFBQUwsR0FBcUI7QUFDbkJDLGlCQUFhLCtCQURNO0FBRW5CQyxlQUFhLG9EQUZNO0FB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LEVBQU0vQixHQUFOLEVBQWM7QUFDekI7QUFDQW9TLHFCQUFpQnJRLEdBQWpCLEVBQXNCL0IsR0FBdEI7QUFDRCxHQUhEO0FBSUQsQ0FORCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQ2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxODNjNzBlODMzMDgxYWZiNDZjYyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTaXRlQ29uZmlnICgpIHtcbiAgdGhpcy5hbmFseXRpY3MgPSB7XG4gICAgZ29vZ2xlSWQ6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5hc3NldERlZmF1bHRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQW4gYXNzZXQgcHVibGlzaGVkIG9uIFNwZWUuY2gnLFxuICAgIHRodW1ibmFpbCAgOiAnaHR0cHM6Ly9zcGVlLmNoL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gIH07XG4gIHRoaXMuYXV0aCA9IHtcbiAgICBzZXNzaW9uS2V5OiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2l0ZUNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NpdGVDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbGUgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfU0VMRUNURUQsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckZpbGUgKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9DTEVBUixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLk1FVEFEQVRBX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDbGFpbSAodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNMQUlNX1VQREFURSxcbiAgICBkYXRhOiB2YWx1ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQdWJsaXNoSW5DaGFubmVsIChjaGFubmVsKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMLFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHVibGlzaFN0YXR1cyAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgc3RhdHVzLFxuICAgICAgbWVzc2FnZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVycm9yIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRVJST1JfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCAoY2hhbm5lbE5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IGNoYW5uZWxOYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1ldGFkYXRhSW5wdXRzIChzaG93TWV0YWRhdGFJbnB1dHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFMsXG4gICAgZGF0YTogc2hvd01ldGFkYXRhSW5wdXRzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3VGh1bWJuYWlsIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5USFVNQk5BSUxfTkVXLFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQdWJsaXNoIChoaXN0b3J5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVJULFxuICAgIGRhdGE6IHsgaGlzdG9yeSB9LFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvYWN0aW9ucy9wdWJsaXNoLmpzIiwiY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnNvbGUubG9nKCdleHBvcnRpbmcgc2VxdWVsaXplIG1vZGVscycpO1xuY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSByZXF1aXJlKCcuLi9jb25maWcvbXlzcWxDb25maWcnKTtcbmNvbnN0IGRiID0ge307XG4vLyBzZXQgc2VxdWVsaXplIG9wdGlvbnNcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICBob3N0ICAgICAgICAgIDogJ2xvY2FsaG9zdCcsXG4gIGRpYWxlY3QgICAgICAgOiAnbXlzcWwnLFxuICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSwgLy8gZml4IHRvIGVuc3VyZSBERUNJTUFMIHdpbGwgbm90IGJlIHN0b3JlZCBhcyBhIHN0cmluZ1xuICBsb2dnaW5nICAgICAgIDogZmFsc2UsXG4gIHBvb2wgICAgICAgICAgOiB7XG4gICAgbWF4ICAgIDogNSxcbiAgICBtaW4gICAgOiAwLFxuICAgIGlkbGUgICA6IDEwMDAwLFxuICAgIGFjcXVpcmU6IDEwMDAwLFxuICB9LFxufSk7XG5cbi8vIGVzdGFibGlzaCBteXNxbCBjb25uZWN0aW9uXG5zZXF1ZWxpemVcbiAgLmF1dGhlbnRpY2F0ZSgpXG4gIC50aGVuKCgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VxdWVsaXplIGhhcyBlc3RhYmxpc2hlZCBteXNxbCBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKCdTZXF1ZWxpemUgd2FzIHVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZTonLCBlcnIpO1xuICB9KTtcblxuLy8gbWFudWFsbHkgYWRkIGVhY2ggbW9kZWwgdG8gdGhlIGRiIG9iamVjdFxuY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCcuL2NlcnRpZmljYXRlLmpzJyk7XG5jb25zdCBDaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJy4vY2xhaW0uanMnKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCcuL2ZpbGUuanMnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL3VzZXIuanMnKTtcbmRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG5kYlsnQ2hhbm5lbCddID0gc2VxdWVsaXplLmltcG9ydCgnQ2hhbm5lbCcsIENoYW5uZWwpO1xuZGJbJ0NsYWltJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDbGFpbScsIENsYWltKTtcbmRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG5kYlsnUmVxdWVzdCddID0gc2VxdWVsaXplLmltcG9ydCgnUmVxdWVzdCcsIFJlcXVlc3QpO1xuZGJbJ1VzZXInXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1VzZXInLCBVc2VyKTtcblxuLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4gIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgIGxvZ2dlci5pbmZvKCdBc3NvY2lhdGluZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbiAgfVxufSk7XG5cbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcblxuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tb2RlbHMvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbE5hbWUgICA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgY2hhbm5lbFNob3J0SWQ6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLnNob3J0SWQsXG4gICAgY2hhbm5lbExvbmdJZCA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLmxvbmdJZCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICAgIG9uQ2hhbm5lbExvZ291dDogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG51bGwsIG51bGwsIG51bGwpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG4vLyBiYXNpYyByZXF1ZXN0IHBhcnNpbmdcbmV4cG9ydCBmdW5jdGlvbiBvbkhhbmRsZVNob3dQYWdlVXJpIChwYXJhbXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSxcbiAgICBkYXRhOiBwYXJhbXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3Q2hhbm5lbFJlcXVlc3QgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBDSEFOTkVMO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgY3IjJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsXG4gICAgZGF0YTogeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdBc3NldFJlcXVlc3QgKG5hbWUsIGlkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBleHRlbnNpb24pIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBleHRlbnNpb24gPyBBU1NFVF9MSVRFIDogQVNTRVRfREVUQUlMUztcbiAgY29uc3QgcmVxdWVzdElkID0gYGFyIyR7bmFtZX0jJHtpZH0jJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgICAgbmFtZSxcbiAgICAgIG1vZGlmaWVyOiB7XG4gICAgICAgIGlkLFxuICAgICAgICBjaGFubmVsOiB7XG4gICAgICAgICAgbmFtZTogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgaWQgIDogY2hhbm5lbElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdFVwZGF0ZSAocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCAoaWQsIGVycm9yLCBrZXkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIGtleSB9LFxuICB9O1xufTtcblxuLy8gYXNzZXQgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZXRUb0Fzc2V0TGlzdCAoaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhIH0sXG4gIH07XG59XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QgKGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQURELFxuICAgIGRhdGE6IHsgaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsXG4gICAgZGF0YToge2NoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZX0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MsXG4gICAgZGF0YToge2NoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGF9LFxuICB9O1xufTtcblxuLy8gZGlzcGxheSBhIGZpbGVcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVSZXF1ZXN0ZWQgKG5hbWUsIGNsYWltSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfUkVRVUVTVEVELFxuICAgIGRhdGE6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkgKHN0YXR1cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFLFxuICAgIGRhdGE6IHN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvYWN0aW9ucy9zaG93LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGUgfSkgPT4ge1xuICBjb25zdCB7IGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCwgZGVzY3JpcHRpb246IHNpdGVEZXNjcmlwdGlvbiwgaG9zdDogc2l0ZUhvc3QsIHRpdGxlOiBzaXRlVGl0bGUsIHR3aXR0ZXI6IHNpdGVUd2l0dGVyIH0gPSBzaXRlO1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgICBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIHNpdGVEZXNjcmlwdGlvbixcbiAgICBzaXRlSG9zdCxcbiAgICBzaXRlVGl0bGUsXG4gICAgc2l0ZVR3aXR0ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCJcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnY3Jvc3MtZmV0Y2gvcG9seWZpbGwnO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgSlNPTiByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBwYXJzZUpTT04gKHJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBzdGF0dXMgcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdCB8IHVuZGVmaW5lZH0gUmV0dXJucyBvYmplY3Qgd2l0aCBzdGF0dXMgYW5kIHN0YXR1c1RleHQsIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjaGVja1N0YXR1cyAocmVzcG9uc2UsIGpzb25SZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xuICB9XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGpzb25SZXNwb25zZS5tZXNzYWdlKTtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgdGhyb3cgZXJyb3I7XG59XG5cbi8qKlxuICogUmVxdWVzdHMgYSBVUkwsIHJldHVybmluZyBhIHByb21pc2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybCAgICAgICBUaGUgVVJMIHdlIHdhbnQgdG8gcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgd2Ugd2FudCB0byBwYXNzIHRvIFwiZmV0Y2hcIlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgIFRoZSByZXNwb25zZSBkYXRhXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXNwb25zZSwgcGFyc2VKU09OKHJlc3BvbnNlKV0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFtyZXNwb25zZSwganNvblJlc3BvbnNlXSkgPT4ge1xuICAgICAgcmV0dXJuIGNoZWNrU3RhdHVzKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvdXRpbHMvcmVxdWVzdC5qcyIsIi8vIHJlcXVlc3QgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEhBTkRMRV9TSE9XX1VSSSA9ICdIQU5ETEVfU0hPV19VUkknO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfRVJST1IgPSAnUkVRVUVTVF9FUlJPUic7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9VUERBVEUgPSAnUkVRVUVTVF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX1JFUVVFU1RfTkVXID0gJ0FTU0VUX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1JFUVVFU1RfTkVXID0gJ0NIQU5ORUxfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfTElTVF9BREQgPSAnUkVRVUVTVF9MSVNUX0FERCc7XG5cbi8vIGFzc2V0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBBU1NFVF9BREQgPSBgQVNTRVRfQUREYDtcblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9BREQgPSAnQ0hBTk5FTF9BREQnO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MnO1xuXG4vLyBhc3NldC9maWxlIGRpc3BsYXkgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEZJTEVfUkVRVUVTVEVEID0gJ0ZJTEVfUkVRVUVTVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUgPSAnRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBESVNQTEFZX0FTU0VUX0VSUk9SID0gJ0RJU1BMQVlfQVNTRVRfRVJST1InO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdEFzc2V0ID0gKHNob3cpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3Rbc2hvdy5yZXF1ZXN0LmlkXTtcbiAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTtcbiAgcmV0dXJuIHNob3cuYXNzZXRMaXN0W2Fzc2V0S2V5XTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RTaG93U3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNob3c7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3Qvc2VsZWN0b3JzL3Nob3cuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYS9lZmZlY3RzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCJcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgYXBpOiB7IGFwaUhvc3QsIGFwaVBvcnQgfSB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL2xicnlDb25maWcuanMnKTtcbmNvbnN0IGxicnlBcGlVcmkgPSAnaHR0cDovLycgKyBhcGlIb3N0ICsgJzonICsgYXBpUG9ydDtcbmNvbnN0IHsgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsLCBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi9nb29nbGVBbmFseXRpY3MuanMnKTtcblxuY29uc3QgaGFuZGxlTGJyeW5ldFJlc3BvbnNlID0gKHsgZGF0YSB9LCByZXNvbHZlLCByZWplY3QpID0+IHtcbiAgbG9nZ2VyLmRlYnVnKCdsYnJ5IGFwaSBkYXRhOicsIGRhdGEpO1xuICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAvLyBjaGVjayBmb3IgYW4gZXJyb3JcbiAgICBpZiAoZGF0YS5yZXN1bHQuZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnTGJyeW5ldCBhcGkgZXJyb3I6JywgZGF0YS5yZXN1bHQuZXJyb3IpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihkYXRhLnJlc3VsdC5lcnJvcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGZhbGxiYWNrIGluIGNhc2UgaXQganVzdCB0aW1lZCBvdXRcbiAgcmVqZWN0KEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoQ2xhaW0gKHB1Ymxpc2hQYXJhbXMpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUHVibGlzaGluZyBjbGFpbSB0byBcIiR7cHVibGlzaFBhcmFtcy5uYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncHVibGlzaCcsXG4gICAgICAgICAgcGFyYW1zOiBwdWJsaXNoUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncHVibGlzaCcsIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbChwdWJsaXNoUGFyYW1zKSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW0gKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIENsYWltIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpLCB0aW1lb3V0OiAyMCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW0nLCAnR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1MaXN0IChjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBjbGFpbV9saXN0IGZvciBcIiR7Y2xhaW1OYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2xhaW1fbGlzdCcsXG4gICAgICAgICAgcGFyYW1zOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW1MaXN0JywgJ0NMQUlNX0xJU1QnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZXNvbHZlVXJpICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUmVzb2x2aW5nIFVSSSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3Jlc29sdmUnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncmVzb2x2ZVVyaScsICdSRVNPTFZFJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdFt1cmldLmVycm9yKSB7ICAvLyBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgICAgICByZWplY3QoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHsgIC8vIGlmIG5vIGVycm9ycywgcmVzb2x2ZVxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdFt1cmldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldERvd25sb2FkRGlyZWN0b3J5ICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ2xicnlBcGkgPj4gUmV0cmlldmluZyB0aGUgZG93bmxvYWQgZGlyZWN0b3J5IHBhdGggZnJvbSBsYnJ5IGRhZW1vbi4uLicpO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3NldHRpbmdzX2dldCcsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldERvd25sb2FkRGlyZWN0b3J5JywgJ1NFVFRJTkdTX0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQuZG93bmxvYWRfZGlyZWN0b3J5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byBsYnJ5IGRhZW1vbiwgYnV0IHVuYWJsZSB0byByZXRyaWV2ZSB0aGUgZG93bmxvYWQgZGlyZWN0b3J5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0xicnluZXQgRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUoJy9ob21lL2xicnkvRG93bmxvYWRzLycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlQ2hhbm5lbCAobmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBDcmVhdGluZyBjaGFubmVsIGZvciAke25hbWV9Li4uYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2hhbm5lbF9uZXcnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgY2hhbm5lbF9uYW1lOiBuYW1lLFxuICAgICAgICAgICAgYW1vdW50ICAgICAgOiAwLjEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2NyZWF0ZUNoYW5uZWwnLCAnQ0hBTk5FTF9ORVcnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvbGJyeUFwaS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbi8vIGV4cG9ydCBhY3Rpb24gY3JlYXRvcnNcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgc2hvcnRJZCxcbiAgICAgIGxvbmdJZCxcbiAgICB9LFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2FjdGlvbnMvY2hhbm5lbC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhcic7XG5pbXBvcnQgSW5hY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhcic7XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiYXJzICAgICAgIDogW10sXG4gICAgICBpbmRleCAgICAgIDogMCxcbiAgICAgIGluY3JlbWVudGVyOiAxLFxuICAgIH07XG4gICAgdGhpcy5jcmVhdGVCYXJzID0gdGhpcy5jcmVhdGVCYXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyID0gdGhpcy5zdGFydFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhciA9IHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhciA9IHRoaXMuc3RvcFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuY3JlYXRlQmFycygpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNyZWF0ZUJhcnMgKCkge1xuICAgIGNvbnN0IGJhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnByb3BzLnNpemU7IGkrKykge1xuICAgICAgYmFycy5wdXNoKHtpc0FjdGl2ZTogZmFsc2V9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGJhcnMgfSk7XG4gIH1cbiAgc3RhcnRQcm9ncmVzc0JhciAoKSB7XG4gICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKSwgMzAwKTtcbiAgfTtcbiAgdXBkYXRlUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuaW5kZXg7XG4gICAgbGV0IGluY3JlbWVudGVyID0gdGhpcy5zdGF0ZS5pbmNyZW1lbnRlcjtcbiAgICBsZXQgYmFycyA9IHRoaXMuc3RhdGUuYmFycztcbiAgICAvLyBmbGlwIGluY3JlbWVudGVyIGlmIG5lY2Vzc2FyeSwgdG8gc3RheSBpbiBib3VuZHNcbiAgICBpZiAoKGluZGV4IDwgMCkgfHwgKGluZGV4ID4gdGhpcy5wcm9wcy5zaXplKSkge1xuICAgICAgaW5jcmVtZW50ZXIgPSBpbmNyZW1lbnRlciAqIC0xO1xuICAgICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB0aGUgaW5kZXhlZCBiYXJcbiAgICBpZiAoaW5jcmVtZW50ZXIgPiAwKSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgICAvLyBpbmNyZW1lbnQgaW5kZXhcbiAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGJhcnMsXG4gICAgICBpbmNyZW1lbnRlcixcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuICBzdG9wUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gIH07XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnN0YXRlLmJhcnMubWFwKChiYXIsIGluZGV4KSA9PiBiYXIuaXNBY3RpdmUgPyA8QWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9IC8+IDogPEluYWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9Lz4pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuUHJvZ3Jlc3NCYXIucHJvcFR5cGVzID0ge1xuICBzaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcblxuY2xhc3MgRXJyb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxwPntlcnJvcn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuRXJyb3JQYWdlLnByb3BUeXBlcyA9IHtcbiAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvRXJyb3JQYWdlL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnRcIlxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gTXlzcWxDb25maWcgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHtkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkfSA9IGNvbmZpZztcbiAgICB0aGlzLmRhdGFiYXNlID0gZGF0YWJhc2U7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IE15c3FsQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJmdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNsYWNrIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCB7IGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSkge1xuICAgIC8vIHZhbGlkYXRlIG5hbWVcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbmFtZSBmaWVsZCBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWROYW1lQ2hhcmFjdGVycyA9IC9bXkEtWmEtejAtOSwtXS8uZXhlYyhuYW1lKTtcbiAgICBpZiAoaW52YWxpZE5hbWVDaGFyYWN0ZXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjbGFpbSBuYW1lIHlvdSBwcm92aWRlZCBpcyBub3QgYWxsb3dlZC4gIE9ubHkgdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzIGFyZSBhbGxvd2VkOiBBLVosIGEteiwgMC05LCBhbmQgXCItXCInKTtcbiAgICB9XG4gICAgLy8gb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgIG5zZncgPSAobnNmdyA9PT0gJ3RydWUnKTtcbiAgICBsaWNlbnNlID0gbGljZW5zZSB8fCBudWxsO1xuICAgIHRpdGxlID0gdGl0bGUgfHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uIHx8IG51bGw7XG4gICAgdGh1bWJuYWlsID0gdGh1bWJuYWlsIHx8IG51bGw7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIG5zZncsXG4gICAgICBsaWNlbnNlLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHRodW1ibmFpbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgKHtmaWxlLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gbWFrZSBzdXJlIGEgZmlsZSB3YXMgcHJvdmlkZWRcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB3aXRoIGtleSBvZiBbZmlsZV0gZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5zaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZSBuYW1lXG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGVcbiAgICBtb2R1bGUuZXhwb3J0cy52YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZShmaWxlKTtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlTmFtZSAgICAgICAgIDogZmlsZS5uYW1lLFxuICAgICAgZmlsZVBhdGggICAgICAgICA6IGZpbGUucGF0aCxcbiAgICAgIGZpbGVUeXBlICAgICAgICAgOiBmaWxlLnR5cGUsXG4gICAgICB0aHVtYm5haWxGaWxlTmFtZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5uYW1lIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlUGF0aDogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5wYXRoIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlVHlwZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC50eXBlIDogbnVsbCksXG4gICAgfTtcbiAgfSxcbiAgdmFsaWRhdGVGaWxlVHlwZUFuZFNpemUgKGZpbGUpIHtcbiAgICAvLyBjaGVjayBmaWxlIHR5cGUgYW5kIHNpemVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmpwZWcvLmpwZy8ucG5nIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5naWYgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCAuZ2lmcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAubXA0IHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IHVucmVjb2duaXplZCBmaWxlIHR5cGUnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgJyArIGZpbGUudHlwZSArICcgY29udGVudCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuICBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlO1xuICB9LFxuICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMgKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0cyBmb3IgdGl0bGVcbiAgICBpZiAodGl0bGUgPT09IG51bGwgfHwgdGl0bGUudHJpbSgpID09PSAnJykge1xuICAgICAgdGl0bGUgPSBuYW1lO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGRlc2NyaXB0aW9uXG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSBudWxsIHx8IGRlc2NyaXB0aW9uLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gJyc7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgbGljZW5zZVxuICAgIGlmIChsaWNlbnNlID09PSBudWxsIHx8IGxpY2Vuc2UudHJpbSgpID09PSAnJykge1xuICAgICAgbGljZW5zZSA9ICcgJzsgIC8vIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nXG4gICAgfVxuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICBjb25zdCBwdWJsaXNoUGFyYW1zID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGZpbGVfcGF0aDogZmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgIH07XG4gICAgLy8gYWRkIHRodW1ibmFpbCB0byBjaGFubmVsIGlmIHZpZGVvXG4gICAgaWYgKHRodW1ibmFpbCkge1xuICAgICAgcHVibGlzaFBhcmFtc1snbWV0YWRhdGEnXVsndGh1bWJuYWlsJ10gPSB0aHVtYm5haWw7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaXNoUGFyYW1zO1xuICB9LFxuICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zICh0aHVtYm5haWxGaWxlUGF0aCwgY2xhaW1OYW1lLCBsaWNlbnNlLCBuc2Z3KSB7XG4gICAgaWYgKCF0aHVtYm5haWxGaWxlUGF0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFRodW1ibmFpbCBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUgICAgIDogYCR7Y2xhaW1OYW1lfS10aHVtYmAsXG4gICAgICBmaWxlX3BhdGg6IHRodW1ibmFpbEZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIHRpdGxlICAgICAgOiBgJHtjbGFpbU5hbWV9IHRodW1ibmFpbGAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgYSB0aHVtYm5haWwgZm9yICR7Y2xhaW1OYW1lfWAsXG4gICAgICAgIGF1dGhvciAgICAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZSAgIDogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgICBjaGFubmVsX25hbWUgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWwsXG4gICAgICBjaGFubmVsX2lkICAgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWxJZCxcbiAgICB9O1xuICB9LFxuICBkZWxldGVUZW1wb3JhcnlGaWxlIChmaWxlUGF0aCkge1xuICAgIGZzLnVubGluayhmaWxlUGF0aCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBlcnJvciBkZWxldGluZyB0ZW1wb3JhcnkgZmlsZSAke2ZpbGVQYXRofWApO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZGVidWcoYHN1Y2Nlc3NmdWxseSBkZWxldGVkICR7ZmlsZVBhdGh9YCk7XG4gICAgfSk7XG4gIH0sXG4gIGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIChmaWxlSW5mbywgZ2V0UmVzdWx0KSB7XG4gICAgZmlsZUluZm8uZmlsZU5hbWUgPSBnZXRSZXN1bHQuZmlsZV9uYW1lO1xuICAgIGZpbGVJbmZvLmZpbGVQYXRoID0gZ2V0UmVzdWx0LmRvd25sb2FkX3BhdGg7XG4gICAgcmV0dXJuIGZpbGVJbmZvO1xuICB9LFxuICBjcmVhdGVGaWxlRGF0YSAoeyBuYW1lLCBjbGFpbUlkLCBvdXRwb2ludCwgaGVpZ2h0LCBhZGRyZXNzLCBuc2Z3LCBjb250ZW50VHlwZSB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBjbGFpbUlkLFxuICAgICAgb3V0cG9pbnQsXG4gICAgICBoZWlnaHQsXG4gICAgICBhZGRyZXNzLFxuICAgICAgZmlsZU5hbWU6ICcnLFxuICAgICAgZmlsZVBhdGg6ICcnLFxuICAgICAgZmlsZVR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgbnNmdyxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVFcnJvclJlc3BvbnNlOiBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBvbiAke29yaWdpbmFsVXJsfWAsIG1vZHVsZS5leHBvcnRzLnVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyhlcnJvcikpO1xuICAgIGNvbnN0IFtzdGF0dXMsIG1lc3NhZ2VdID0gbW9kdWxlLmV4cG9ydHMucmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoc3RhdHVzKVxuICAgICAgLmpzb24obW9kdWxlLmV4cG9ydHMuY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQoc3RhdHVzLCBtZXNzYWdlKSk7XG4gIH0sXG4gIHJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1czogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgbGV0IHN0YXR1cywgbWVzc2FnZTtcbiAgICAvLyBjaGVjayBmb3IgZGFlbW9uIGJlaW5nIHR1cm5lZCBvZmZcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHN0YXR1cyA9IDUwMztcbiAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiByZWZ1c2VkLiAgVGhlIGRhZW1vbiBtYXkgbm90IGJlIHJ1bm5pbmcuJztcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gNDAwO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFtzdGF0dXMsIG1lc3NhZ2VdO1xuICB9LFxuICB1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXM6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBuZXdFcnJvck9iamVjdCA9IHt9O1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbmV3RXJyb3JPYmplY3Rba2V5XSA9IGVycltrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3RXJyb3JPYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH0sXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSwgY2xhaW1JZCkge1xuICAgIGlmIChjaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNoYW5uZWwoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNsYWltKG5hbWUsIGNsYWltSWQpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2xhaW0gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2xhaW0oJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DbGFpbS5nZXRMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltSWRCeUNoYW5uZWwgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDaGFubmVsKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSwgJHtjbGFpbU5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgaWRcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxJZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsSWQsIGRiLkNsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxJZCwgY2xhaW1OYW1lKV0pOyAgLy8gMi4gZ2V0IHRoZSBsb25nIGNsYWltIGlkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxJZCwgbG9uZ0NsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbERhdGEgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBzaG9ydENoYW5uZWxDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgICBzaG9ydENoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyhsb25nQ2hhbm5lbENsYWltSWQpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXldKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiBmb3JtYXQgdGhlIGRhdGEgZm9yIHRoZSB2aWV3LCBpbmNsdWRpbmcgcGFnaW5hdGlvblxuICAgICAgICAgIGxldCBwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEgPSByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheSwgcGFnZSk7XG4gICAgICAgICAgLy8gNC4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvbiBhbmQgY29udGVudHNcbiAgICAgICAgICByZXNvbHZlKHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldExvY2FsRmlsZVJlY29yZCAoY2xhaW1JZCwgbmFtZSkge1xuICAgIHJldHVybiBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7Y2xhaW1JZCwgbmFtZX19KVxuICAgICAgLnRoZW4oZmlsZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIHJldHVybiBOT19GSUxFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlLmRhdGFWYWx1ZXM7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnLi4vcmVhY3QvcmVkdWNlcnMnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uL3JlYWN0L2NvbnRhaW5lcnMvR0FMaXN0ZW5lcic7XG5pbXBvcnQgQXBwIGZyb20gJy4uL3JlYWN0L2FwcCc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZS5qcyc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoUmVkdWNlcik7XG5cbiAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgPEFwcCAvPlxuICAgICAgICA8L0dBTGlzdGVuZXI+XG4gICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xuXG4gIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gIGlmIChjb250ZXh0LnVybCkge1xuICAgIC8vIFNvbWV3aGVyZSBhIGA8UmVkaXJlY3Q+YCB3YXMgcmVuZGVyZWRcbiAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICB9IGVsc2Uge1xuICAgIC8vIHdlJ3JlIGdvb2QsIHNlbmQgdGhlIHJlc3BvbnNlXG4gIH1cblxuICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFB1Ymxpc2hSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3B1Ymxpc2gnO1xuaW1wb3J0IENoYW5uZWxSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL2NoYW5uZWwnO1xuaW1wb3J0IFNob3dSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3Nob3cnO1xuaW1wb3J0IFNpdGVSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3NpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICBjaGFubmVsOiBDaGFubmVsUmVkdWNlcixcbiAgcHVibGlzaDogUHVibGlzaFJlZHVjZXIsXG4gIHNob3cgICA6IFNob3dSZWR1Y2VyLFxuICBzaXRlICAgOiBTaXRlUmVkdWNlcixcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvcmVkdWNlcnMvaW5kZXguanMiLCJleHBvcnQgY29uc3QgRklMRV9TRUxFQ1RFRCA9ICdGSUxFX1NFTEVDVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0NMRUFSID0gJ0ZJTEVfQ0xFQVInO1xuZXhwb3J0IGNvbnN0IE1FVEFEQVRBX1VQREFURSA9ICdNRVRBREFUQV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IENMQUlNX1VQREFURSA9ICdDTEFJTV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFVF9QVUJMSVNIX0lOX0NIQU5ORUwgPSAnU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFUVVNfVVBEQVRFID0gJ1BVQkxJU0hfU1RBVFVTX1VQREFURSc7XG5leHBvcnQgY29uc3QgRVJST1JfVVBEQVRFID0gJ0VSUk9SX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VMRUNURURfQ0hBTk5FTF9VUERBVEUgPSAnU0VMRUNURURfQ0hBTk5FTF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9NRVRBREFUQV9JTlBVVFMgPSAnVE9HR0xFX01FVEFEQVRBX0lOUFVUUyc7XG5leHBvcnQgY29uc3QgVEhVTUJOQUlMX05FVyA9ICdUSFVNQk5BSUxfTkVXJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVJUID0gJ1BVQkxJU0hfU1RBUlQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPR0lOID0gJ0V4aXN0aW5nJztcbmV4cG9ydCBjb25zdCBDUkVBVEUgPSAnTmV3JztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMX1VQREFURSA9ICdDSEFOTkVMX1VQREFURSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9DQUxfQ0hFQ0sgPSAnTE9DQUxfQ0hFQ0snO1xuZXhwb3J0IGNvbnN0IFVOQVZBSUxBQkxFID0gJ1VOQVZBSUxBQkxFJztcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdFUlJPUic7XG5leHBvcnQgY29uc3QgQVZBSUxBQkxFID0gJ0FWQUlMQUJMRSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdvb2dsZUFuYWx5dGljcyBmcm9tICdyZWFjdC1nYSc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbkdvb2dsZUFuYWx5dGljcy5pbml0aWFsaXplKCd0ZXN0Jyk7XG5cbmNsYXNzIEdBTGlzdGVuZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zZW5kUGFnZVZpZXcodGhpcy5wcm9wcy5oaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0aGlzLnByb3BzLmhpc3RvcnkubGlzdGVuKHRoaXMuc2VuZFBhZ2VWaWV3KTtcbiAgfVxuXG4gIHNlbmRQYWdlVmlldyAobG9jYXRpb24pIHtcbiAgICBHb29nbGVBbmFseXRpY3Muc2V0KHsgcGFnZTogbG9jYXRpb24ucGF0aG5hbWUgfSk7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnBhZ2V2aWV3KGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihHQUxpc3RlbmVyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEhvbWVQYWdlIGZyb20gJ2NvbXBvbmVudHMvSG9tZVBhZ2UnO1xuaW1wb3J0IEFib3V0UGFnZSBmcm9tICdjb21wb25lbnRzL0Fib3V0UGFnZSc7XG5pbXBvcnQgTG9naW5QYWdlIGZyb20gJ2NvbnRhaW5lcnMvTG9naW5QYWdlJztcbmltcG9ydCBTaG93UGFnZSBmcm9tICdjb250YWluZXJzL1Nob3dQYWdlJztcbmltcG9ydCBGb3VyT2hGb3VyUGFnZSBmcm9tICdjb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlJztcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTd2l0Y2g+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXtIb21lUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvYWJvdXQnIGNvbXBvbmVudD17QWJvdXRQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9sb2dpbicgY29tcG9uZW50PXtMb2dpblBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzppZGVudGlmaWVyLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGNvbXBvbmVudD17Rm91ck9oRm91clBhZ2V9IC8+XG4gICAgPC9Td2l0Y2g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9hcHAuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgc2VsZWN0RmlsZSwgdXBkYXRlRXJyb3IsIGNsZWFyRmlsZSB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlICAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICB0aHVtYm5haWw6IHB1Ymxpc2gudGh1bWJuYWlsLFxuICAgIGZpbGVFcnJvcjogcHVibGlzaC5lcnJvci5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIHNlbGVjdEZpbGU6IChmaWxlKSA9PiB7XG4gICAgICBkaXNwYXRjaChzZWxlY3RGaWxlKGZpbGUpKTtcbiAgICB9LFxuICAgIHNldEZpbGVFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaChjbGVhckZpbGUoKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignZmlsZScsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Ecm9wem9uZS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICcuLi8uLi9hY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJleHBvcnQgY29uc3QgQ0hBTk5FTCA9ICdDSEFOTkVMJztcbmV4cG9ydCBjb25zdCBBU1NFVF9MSVRFID0gJ0FTU0VUX0xJVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0RFVEFJTFMgPSAnQVNTRVRfREVUQUlMUyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBmaWxlUmVxdWVzdGVkIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGVycm9yIGFuZCBzdGF0dXNcbiAgY29uc3QgZXJyb3IgID0gc2hvdy5kaXNwbGF5QXNzZXQuZXJyb3I7XG4gIGNvbnN0IHN0YXR1cyA9IHNob3cuZGlzcGxheUFzc2V0LnN0YXR1cztcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBlcnJvcixcbiAgICBzdGF0dXMsXG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25GaWxlUmVxdWVzdDogKG5hbWUsIGNsYWltSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKGZpbGVSZXF1ZXN0ZWQobmFtZSwgY2xhaW1JZCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkgPT4ge1xuICAvLyB0YWtlIHRoZSBodG1sIGFuZCBwcmVsb2FkZWRTdGF0ZSBhbmQgcmV0dXJuIHRoZSBmdWxsIHBhZ2VcbiAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIiBwcmVmaXg9XCJvZzogaHR0cDovL29ncC5tZS9ucyMgZmI6IGh0dHA6Ly9vZ3AubWUvbnMvZmIjXCI+XG4gICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vXCI+XG4gICAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIj5cbiAgICAgICAgICAgIDwhLS1oZWxtZXQtLT5cbiAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5saW5rLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICA8IS0tc3R5bGUgc2hlZXRzLS0+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL3Jlc2V0LmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9nZW5lcmFsLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9tZWRpYVF1ZXJpZXMuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8IS0tZ29vZ2xlIGZvbnQtLT5cbiAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMFwiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keSBpZD1cIm1haW4tYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyZWFjdC1hcHBcIiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPiR7aHRtbH08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNjcmlwdD5cbiAgICAgICAgICAgICAgICB3aW5kb3cuX19QUkVMT0FERURfU1RBVEVfXyA9ICR7SlNPTi5zdHJpbmdpZnkocHJlbG9hZGVkU3RhdGUpLnJlcGxhY2UoLzwvZywgJ1xcXFxcXHUwMDNjJyl9XG4gICAgICAgICAgICA8L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL2J1bmRsZS9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcbmNvbnN0IHsgcG9wdWxhdGVMb2NhbHNEb3RVc2VyLCBzZXJpYWxpemVTcGVlY2hVc2VyLCBkZXNlcmlhbGl6ZVNwZWVjaFVzZXIgfSA9IHJlcXVpcmUoJy4vaGVscGVycy9hdXRoSGVscGVycy5qcycpO1xuY29uc3QgY29va2llU2Vzc2lvbiA9IHJlcXVpcmUoJ2Nvb2tpZS1zZXNzaW9uJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuLy8gbG9nZ2luZyBkZXBlbmRlbmNpZXNcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU3BlZWNoU2VydmVyICh7IG15c3FsQ29uZmlnLCBzaXRlQ29uZmlnLCBzbGFja0NvbmZpZyB9KSB7XG4gIHRoaXMuc3RhcnQgPSAoKSA9PiB7XG4gICAgdGhpcy5jb25maWd1cmVDb25maWdGaWxlcygpO1xuICAgIHRoaXMuY29uZmlndXJlTG9nZ2luZygpO1xuICAgIHRoaXMuY29uZmlndXJlQXBwKCk7XG4gICAgdGhpcy5jb25maWd1cmVTZXJ2ZXIoKTtcbiAgICB0aGlzLnN0YXJ0U2VydmVyKCk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQ29uZmlnRmlsZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgbXlzcWxBcHBDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9teXNxbENvbmZpZy5qcycpO1xuICAgIG15c3FsQXBwQ29uZmlnLmNvbmZpZ3VyZShteXNxbENvbmZpZyk7XG4gICAgY29uc3Qgc2l0ZUFwcENvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbiAgICBzaXRlQXBwQ29uZmlnLmNvbmZpZ3VyZShzaXRlQ29uZmlnKTtcbiAgICB0aGlzLlBPUlQgPSBzaXRlQXBwQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgICBjb25zdCBzbGFja0FwcENvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJyk7XG4gICAgc2xhY2tBcHBDb25maWcuY29uZmlndXJlKHNsYWNrQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVMb2dnaW5nID0gKCkgPT4ge1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVMb2dnZXIuanMnKShsb2dnZXIpO1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVTbGFjay5qcycpKGxvZ2dlcik7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQXBwID0gKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTsgLy8gY3JlYXRlIGFuIEV4cHJlc3MgYXBwbGljYXRpb25cblxuICAgIC8vIHRydXN0IHRoZSBwcm94eSB0byBnZXQgaXAgYWRkcmVzcyBmb3IgdXNcbiAgICBhcHAuZW5hYmxlKCd0cnVzdCBwcm94eScpO1xuXG4gICAgLy8gYWRkIG1pZGRsZXdhcmVcbiAgICBhcHAudXNlKGhlbG1ldCgpKTsgLy8gc2V0IEhUVFAgaGVhZGVycyB0byBwcm90ZWN0IGFnYWluc3Qgd2VsbC1rbm93biB3ZWIgdnVsbmVyYWJpbHRpZXNcbiAgICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKGAke19fZGlybmFtZX0vcHVibGljYCkpOyAvLyAnZXhwcmVzcy5zdGF0aWMnIHRvIHNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIHB1YmxpYyBkaXJlY3RvcnlcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi9qc29uXG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7IC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHsgIC8vIGN1c3RvbSBsb2dnaW5nIG1pZGRsZXdhcmUgdG8gbG9nIGFsbCBpbmNvbWluZyBodHRwIHJlcXVlc3RzXG4gICAgICBsb2dnZXIudmVyYm9zZShgUmVxdWVzdCBvbiAke3JlcS5vcmlnaW5hbFVybH0gZnJvbSAke3JlcS5pcH1gKTtcbiAgICAgIG5leHQoKTtcbiAgICB9KTtcblxuICAgIC8vIGNvbmZpZ3VyZSBwYXNzcG9ydFxuICAgIHBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoc2VyaWFsaXplU3BlZWNoVXNlcik7XG4gICAgcGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGRlc2VyaWFsaXplU3BlZWNoVXNlcik7XG4gICAgY29uc3QgbG9jYWxTaWdudXBTdHJhdGVneSA9IHJlcXVpcmUoJy4vcGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzJyk7XG4gICAgY29uc3QgbG9jYWxMb2dpblN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9wYXNzcG9ydC9sb2NhbC1sb2dpbi5qcycpO1xuICAgIHBhc3Nwb3J0LnVzZSgnbG9jYWwtc2lnbnVwJywgbG9jYWxTaWdudXBTdHJhdGVneSk7XG4gICAgcGFzc3BvcnQudXNlKCdsb2NhbC1sb2dpbicsIGxvY2FsTG9naW5TdHJhdGVneSk7XG4gICAgLy8gaW5pdGlhbGl6ZSBwYXNzcG9ydFxuICAgIGFwcC51c2UoY29va2llU2Vzc2lvbih7XG4gICAgICBuYW1lICA6ICdzZXNzaW9uJyxcbiAgICAgIGtleXMgIDogW3NpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBtaWRkbGV3YXJlIHRvIHBhc3MgdXNlciBpbmZvIGJhY2sgdG8gY2xpZW50IChmb3IgaGFuZGxlYmFycyBhY2Nlc3MpLCBpZiB1c2VyIGlzIGxvZ2dlZCBpblxuICAgIGFwcC51c2UocG9wdWxhdGVMb2NhbHNEb3RVc2VyKTsgIC8vIG5vdGU6IEkgZG9uJ3QgdGhpbmsgSSBuZWVkIHRoaXMgYW55IG1vcmU/XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2Utcm91dGVzLmpzJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9zZXJ2ZS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcycpKGFwcCk7XG5cbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTZXJ2ZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBodHRwLlNlcnZlcih0aGlzLmFwcCk7XG4gIH07XG4gIHRoaXMuc3RhcnRTZXJ2ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZGIgPSByZXF1aXJlKCcuL21vZGVscycpO1xuICAgIC8vIHN5bmMgc2VxdWVsaXplXG4gICAgZGIuc2VxdWVsaXplLnN5bmMoKVxuICAgICAgLy8gc3RhcnQgdGhlIHNlcnZlclxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNlcnZlci5saXN0ZW4odGhpcy5QT1JULCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZlciBpcyBsaXN0ZW5pbmcgb24gUE9SVCAke3RoaXMuUE9SVH1gKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFN0YXJ0dXAgRXJyb3I6YCwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwZWVjaFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwb3B1bGF0ZUxvY2Fsc0RvdFVzZXIgKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgaWYgKHJlcS51c2VyKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ3BvcHVsYXRpbmcgcmVzLmxvY2Fscy51c2VyJyk7XG4gICAgICByZXMubG9jYWxzLnVzZXIgPSB7XG4gICAgICAgIGlkICAgICAgICAgICAgOiByZXEudXNlci5pZCxcbiAgICAgICAgdXNlck5hbWUgICAgICA6IHJlcS51c2VyLnVzZXJOYW1lLFxuICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgfTtcbiAgICB9XG4gICAgbmV4dCgpO1xuICB9LFxuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGxvZ2dlci5kZWJ1Zygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBsb2dnZXIuZGVidWcoJ2Rlc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9hdXRoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1zZXNzaW9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXNlc3Npb25cIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImh0dHBcIlxuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBsb2dMZXZlbCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL2xvZ2dlckNvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh3aW5zdG9uKSA9PiB7XG4gIC8vIGNvbmZpZ3VyZVxuICB3aW5zdG9uLmNvbmZpZ3VyZSh7XG4gICAgdHJhbnNwb3J0czogW1xuICAgICAgbmV3ICh3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgICBsZXZlbCAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsb2dMZXZlbCxcbiAgICAgICAgdGltZXN0YW1wICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIGNvbG9yaXplICAgICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgIHByZXR0eVByaW50ICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgIGhhbmRsZUV4Y2VwdGlvbnMgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgIGh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb246IHRydWUsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcbiAgLy8gdGVzdCBhbGwgdGhlIGxvZyBsZXZlbHNcbiAgd2luc3Rvbi5lcnJvcignTGV2ZWwgMCcpO1xuICB3aW5zdG9uLndhcm4oJ0xldmVsIDEnKTtcbiAgd2luc3Rvbi5pbmZvKCdMZXZlbCAyJyk7XG4gIHdpbnN0b24udmVyYm9zZSgnTGV2ZWwgMycpO1xuICB3aW5zdG9uLmRlYnVnKCdMZXZlbCA0Jyk7XG4gIHdpbnN0b24uc2lsbHkoJ0xldmVsIDUnKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcyIsImNvbnN0IGxvZ2dlckNvbmZpZyA9IHtcbiAgbG9nTGV2ZWw6ICdkZWJ1ZycsICAvLyBvcHRpb25zOiBzaWxseSwgZGVidWcsIHZlcmJvc2UsIGluZm9cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nZ2VyQ29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZy9zbGFja0NvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh3aW5zdG9uKSA9PiB7XG4gIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IHNsYWNrQ29uZmlnO1xuICBpZiAoc2xhY2tXZWJIb29rKSB7XG4gICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICBpZiAoc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgIHdlYmhvb2tVcmw6IHNsYWNrV2ViSG9vayxcbiAgICAgICAgY2hhbm5lbCAgIDogc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgd2ViaG9va1VybDogc2xhY2tXZWJIb29rLFxuICAgICAgICBjaGFubmVsICAgOiBzbGFja0luZm9DaGFubmVsLFxuICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlXG4gICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gIH0gZWxzZSB7XG4gICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCJcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBDaGFubmVsID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2hhbm5lbCcsXG4gICAge1xuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDaGFubmVsLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDaGFubmVsLmJlbG9uZ3NUbyhkYi5Vc2VyKTtcbiAgICBDaGFubmVsLmhhc09uZShkYi5DZXJ0aWZpY2F0ZSk7XG4gIH07XG5cbiAgcmV0dXJuIENoYW5uZWw7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tb2RlbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIFRFWFQgfSkgPT4ge1xuICBjb25zdCBSZXF1ZXN0ID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnUmVxdWVzdCcsXG4gICAge1xuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpcEFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgUmVxdWVzdC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgUmVxdWVzdC5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSZXF1ZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSBmb3Igc2lnbiB1cFxuICBhcHAucG9zdCgnL3NpZ251cCcsIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtc2lnbnVwJyksIChyZXEsIHJlcykgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBzdWNjZXNzZnVsIHNpZ251cCBmb3IgJHtyZXEudXNlci5jaGFubmVsTmFtZX1gKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIGZvciBsb2cgaW5cbiAgYXBwLnBvc3QoJy9sb2dpbicsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtbG9naW4nLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgICBsb2dnZXIuZGVidWcoJ2luZm86JywgaW5mbyk7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICB9XG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKCdzdWNjZXNzZnVsIGxvZ2luJyk7XG4gICAgICByZXEubG9nSW4odXNlciwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKHJlcSwgcmVzLCBuZXh0KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGxvZyBvdXRcbiAgYXBwLmdldCgnL2xvZ291dCcsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcS5sb2dvdXQoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3lvdSBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCd9KTtcbiAgfSk7XG4gIC8vIHNlZSBpZiB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQsIGFuZCByZXR1cm4gY3JlZGVudGlhbHMgaWYgc29cbiAgYXBwLmdldCgnL3VzZXInLCAocmVxLCByZXMpID0+IHtcbiAgICBpZiAocmVxLnVzZXIpIHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEudXNlcn0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICd1c2VyIGlzIG5vdCBsb2dnZWQgaW4nfSk7XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyB1cGxvYWREaXJlY3RvcnkgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gbXVsdGlwYXJ0KHt1cGxvYWREaXI6IHVwbG9hZERpcmVjdG9yeX0pO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSwgcHVibGlzaCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgZ2V0Q2xhaW1MaXN0LCByZXNvbHZlVXJpLCBnZXRDbGFpbSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhLCBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCBlcnJvckhhbmRsZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCcuLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzJyk7XG5jb25zdCB7IGdldENoYW5uZWxEYXRhLCBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkobmFtZSlcbiAgICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNob3J0SWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvZGF0YS86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gICAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICAgIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICAgIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBydW4gYSBjbGFpbV9saXN0IHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihjbGFpbXNMaXN0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhbiBhc3NldFxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0obmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgICAgaWYgKCFyZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmlsZURhdGEgPSBjcmVhdGVGaWxlRGF0YShyZXNvbHZlUmVzdWx0KTtcbiAgICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZURhdGEsIHtuYW1lLCBjbGFpbUlkfSwgJ0ZpbGUnKSwgZ2V0UmVzdWx0XSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2UsIGNvbXBsZXRlZCB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9yZXNvbHZlLzpuYW1lLzpjbGFpbUlkJywgKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgICAgLnRoZW4ocmVzb2x2ZWRVcmkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHJ1biBhIHB1Ymxpc2ggcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCAoeyBib2R5LCBmaWxlcywgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCB1c2VyIH0sIHJlcykgPT4ge1xuICAgIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAgIC8vIHJlY29yZCB0aGUgc3RhcnQgdGltZSBvZiB0aGUgcmVxdWVzdFxuICAgIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgICB0cnkge1xuICAgICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAgICh7ZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZX0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMoZmlsZXMpKTtcbiAgICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIGF1dGhlbnRpY2F0ZVVzZXIoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSxcbiAgICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpLFxuICAgICAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCksXG4gICAgICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zKHRodW1ibmFpbEZpbGVQYXRoLCBuYW1lLCBsaWNlbnNlLCBuc2Z3KSxcbiAgICBdKVxuICAgICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICAgIHB1Ymxpc2godGh1bWJuYWlsUHVibGlzaFBhcmFtcywgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgICByZXR1cm4gcHVibGlzaChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICAgIGRhdGEgICA6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgICB1cmwgICAgOiBgJHtob3N0fS8ke3Jlc3VsdC5jbGFpbV9pZH0vJHtuYW1lfWAsXG4gICAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL2xvbmctaWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2JvZHk6JywgYm9keSk7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICAgIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgICBjb25zdCBjbGFpbU5hbWUgPSBib2R5LmNsYWltTmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gICAgbGV0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oY2xhaW1JbmZvID0+IHtcbiAgICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcbiAgYXBwLmdldCgnL2FwaS9maWxlL2F2YWlsYWJpbGl0eS86bmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgZGIuRmlsZS5maW5kT25lKHt3aGVyZToge25hbWUsIGNsYWltSWR9fSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yb3V0ZXMvYXBpLXJvdXRlcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbXVsdGlwYXJ0eVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe3doZXJlOiB7Y2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aGVudGljYXRlVXNlciAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSB7XG4gICAgLy8gY2FzZTogbm8gY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgKGFub255bW91cyksIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB1c2VyIHRva2VuIGlzIHByb3ZpZGVkXG4gICAgaWYgKCFjaGFubmVsTmFtZSAmJiAhY2hhbm5lbElkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogbnVsbCxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHVzZXIgdG9rZW5cbiAgICBpZiAodXNlcikge1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxOYW1lICE9PSB1c2VyLmNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgbmFtZSBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbm5lbElkICYmIGNoYW5uZWxJZCAhPT0gdXNlci5jaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIGlkIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiB1c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogdXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggcGFzc3dvcmQgaW5zdGVhZCBvZiB1c2VyIHRva2VuXG4gICAgaWYgKCFjaGFubmVsUGFzc3dvcmQpIHRocm93IG5ldyBFcnJvcignbm8gY2hhbm5lbCBwYXNzd29yZCBwcm92aWRlZCcpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5hdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkKTtcbiAgfSxcbiAgYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCB1c2VyUGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gaG9pc3RlZCB2YXJpYWJsZXNcbiAgICAgIGxldCBjaGFubmVsRGF0YTtcbiAgICAgIC8vIGJ1aWxkIHRoZSBwYXJhbXMgZm9yIGZpbmRpbmcgdGhlIGNoYW5uZWxcbiAgICAgIGxldCBjaGFubmVsRmluZFBhcmFtcyA9IHt9O1xuICAgICAgaWYgKGNoYW5uZWxOYW1lKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgaWYgKGNoYW5uZWxJZCkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsSWQ7XG4gICAgICAvLyBmaW5kIHRoZSBjaGFubmVsXG4gICAgICBkYi5DaGFubmVsXG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogY2hhbm5lbEZpbmRQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyBjaGFubmVsIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hhbm5lbERhdGEgPSBjaGFubmVsLmdldCgpO1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBkYXRhOicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGIuVXNlci5maW5kT25lKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IHVzZXJOYW1lOiBjaGFubmVsRGF0YS5jaGFubmVsTmFtZS5zdWJzdHJpbmcoMSkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQodXNlclBhc3N3b3JkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnLi4ucGFzc3dvcmQgd2FzIGEgbWF0Y2guLi4nKTtcbiAgICAgICAgICByZXNvbHZlKGNoYW5uZWxEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgQ0xBSU1TX1BFUl9QQUdFID0gMTI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjbGFpbXMsIHBhZ2UpIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxQYWdlcyhjbGFpbXMpO1xuICAgIGNvbnN0IHBhZ2luYXRpb25QYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0UGFnZUZyb21RdWVyeShwYWdlKTtcbiAgICBjb25zdCB2aWV3RGF0YSA9IHtcbiAgICAgIGNoYW5uZWxOYW1lICAgICAgIDogY2hhbm5lbE5hbWUsXG4gICAgICBsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltcyAgICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zKGNsYWltcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgcHJldmlvdXNQYWdlICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVQcmV2aW91c1BhZ2UocGFnaW5hdGlvblBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgICAgICAgOiBwYWdpbmF0aW9uUGFnZSxcbiAgICAgIG5leHRQYWdlICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lTmV4dFBhZ2UodG90YWxQYWdlcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgdG90YWxQYWdlcyAgICAgICAgOiB0b3RhbFBhZ2VzLFxuICAgICAgdG90YWxSZXN1bHRzICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbENsYWltcyhjbGFpbXMpLFxuICAgIH07XG4gICAgcmV0dXJuIHZpZXdEYXRhO1xuICB9LFxuICBnZXRQYWdlRnJvbVF1ZXJ5IChwYWdlKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH0sXG4gIGV4dHJhY3RQYWdlRnJvbUNsYWltcyAoY2xhaW1zLCBwYWdlTnVtYmVyKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiBbXTsgIC8vIGlmIG5vIGNsYWltcywgcmV0dXJuIHRoaXMgZGVmYXVsdFxuICAgIH1cbiAgICAvLyBsb2dnZXIuZGVidWcoJ2NsYWltcyBpcyBhcnJheT8nLCBBcnJheS5pc0FycmF5KGNsYWltcykpO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZyhgcGFnZU51bWJlciAke3BhZ2VOdW1iZXJ9IGlzIG51bWJlcj9gLCBOdW1iZXIuaXNJbnRlZ2VyKHBhZ2VOdW1iZXIpKTtcbiAgICBjb25zdCBjbGFpbVN0YXJ0SW5kZXggPSAocGFnZU51bWJlciAtIDEpICogQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IGNsYWltRW5kSW5kZXggPSBjbGFpbVN0YXJ0SW5kZXggKyBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgcGFnZU9mQ2xhaW1zID0gY2xhaW1zLnNsaWNlKGNsYWltU3RhcnRJbmRleCwgY2xhaW1FbmRJbmRleCk7XG4gICAgcmV0dXJuIHBhZ2VPZkNsYWltcztcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxQYWdlcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3RhbENsYWltcyA9IGNsYWltcy5sZW5ndGg7XG4gICAgICBpZiAodG90YWxDbGFpbXMgPCBDTEFJTVNfUEVSX1BBR0UpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBjb25zdCBmdWxsUGFnZXMgPSBNYXRoLmZsb29yKHRvdGFsQ2xhaW1zIC8gQ0xBSU1TX1BFUl9QQUdFKTtcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHRvdGFsQ2xhaW1zICUgQ0xBSU1TX1BFUl9QQUdFO1xuICAgICAgaWYgKHJlbWFpbmRlciA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnVsbFBhZ2VzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bGxQYWdlcyArIDE7XG4gICAgfVxuICB9LFxuICBkZXRlcm1pbmVQcmV2aW91c1BhZ2UgKGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlIC0gMTtcbiAgfSxcbiAgZGV0ZXJtaW5lTmV4dFBhZ2UgKHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlICsgMTtcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxDbGFpbXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGNsYWltcy5sZW5ndGg7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IHsgZGV0YWlsczogaG9zdCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSBmb3IgdGhlIGhvbWUgcGFnZVxuICBhcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGxvZ2luIHBhZ2VcbiAgYXBwLmdldCgnL2xvZ2luJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzaG93ICdhYm91dCcgcGFnZVxuICBhcHAuZ2V0KCcvYWJvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB0cmVuZGluZyBpbWFnZXNcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KCcvcG9wdWxhcicpO1xuICB9KTtcbiAgYXBwLmdldCgnL3BvcHVsYXInLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB0cmVuZGluZyBpbWFnZXNcbiAgYXBwLmdldCgnL25ldycsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2VuZCBlbWJlZGFibGUgdmlkZW8gcGxheWVyIChmb3IgdHdpdHRlcilcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgLy8gZ2V0IGFuZCByZW5kZXIgdGhlIGNvbnRlbnRcbiAgICByZXMuc3RhdHVzKDIwMCkucmVuZGVyKCdlbWJlZCcsIHsgbGF5b3V0OiAnZW1iZWQnLCBob3N0LCBjbGFpbUlkLCBuYW1lIH0pO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yb3V0ZXMvcGFnZS1yb3V0ZXMuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0dJTiB9IGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcyc7XG5jb25zdCB7IHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGlzYWJsZWQgICAgICAgICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkLFxuICBkaXNhYmxlZE1lc3NhZ2UgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWRNZXNzYWdlLFxuICBwdWJsaXNoSW5DaGFubmVsICA6IGZhbHNlLFxuICBzZWxlY3RlZENoYW5uZWwgICA6IExPR0lOLFxuICBzaG93TWV0YWRhdGFJbnB1dHM6IGZhbHNlLFxuICBzdGF0dXMgICAgICAgICAgICA6IHtcbiAgICBzdGF0dXMgOiBudWxsLFxuICAgIG1lc3NhZ2U6IG51bGwsXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgZmlsZSAgICAgICAgIDogbnVsbCxcbiAgICB1cmwgICAgICAgICAgOiBudWxsLFxuICAgIGNoYW5uZWwgICAgICA6IG51bGwsXG4gICAgcHVibGlzaFN1Ym1pdDogbnVsbCxcbiAgfSxcbiAgZmlsZSAgICA6IG51bGwsXG4gIGNsYWltICAgOiAnJyxcbiAgbWV0YWRhdGE6IHtcbiAgICB0aXRsZSAgICAgIDogJycsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGxpY2Vuc2UgICAgOiAnJyxcbiAgICBuc2Z3ICAgICAgIDogZmFsc2UsXG4gIH0sXG4gIHRodW1ibmFpbDogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9TRUxFQ1RFRDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpbml0aWFsU3RhdGUsIHsgIC8vIG5vdGU6IGNsZWFycyB0byBpbml0aWFsIHN0YXRlXG4gICAgICAgIGZpbGU6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgYWN0aW9ucy5NRVRBREFUQV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbWV0YWRhdGE6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLm1ldGFkYXRhLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0xBSU1fVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNsYWltOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw6IGFjdGlvbi5jaGFubmVsLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkVSUk9SX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBlcnJvcjogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZXJyb3IsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRUxFQ1RFRF9DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZWxlY3RlZENoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFM6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2hvd01ldGFkYXRhSW5wdXRzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5USFVNQk5BSUxfTkVXOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHRodW1ibmFpbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxvZ2dlZEluQ2hhbm5lbDoge1xuICAgIG5hbWUgICA6IG51bGwsXG4gICAgc2hvcnRJZDogbnVsbCxcbiAgICBsb25nSWQgOiBudWxsLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnZWRJbkNoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvcmVkdWNlcnMvY2hhbm5lbC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBFUlJPUiB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcmVxdWVzdDoge1xuICAgIGVycm9yOiBudWxsLFxuICAgIHR5cGUgOiBudWxsLFxuICAgIGlkICAgOiBudWxsLFxuICB9LFxuICByZXF1ZXN0TGlzdCA6IHt9LFxuICBjaGFubmVsTGlzdCA6IHt9LFxuICBhc3NldExpc3QgICA6IHt9LFxuICBkaXNwbGF5QXNzZXQ6IHtcbiAgICBlcnJvciA6IG51bGwsXG4gICAgc3RhdHVzOiBMT0NBTF9DSEVDSyxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvLyBoYW5kbGUgcmVxdWVzdFxuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICB0eXBlOiBhY3Rpb24uZGF0YS5yZXF1ZXN0VHlwZSxcbiAgICAgICAgICBpZCAgOiBhY3Rpb24uZGF0YS5yZXF1ZXN0SWQsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gc3RvcmUgcmVxdWVzdHNcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0TGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBrZXkgIDogYWN0aW9uLmRhdGEua2V5LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gYXNzZXQgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5BU1NFVF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgYXNzZXRMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hc3NldExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvciAgICA6IGFjdGlvbi5kYXRhLmVycm9yLFxuICAgICAgICAgICAgbmFtZSAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgOiBhY3Rpb24uZGF0YS5jbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRJZCAgOiBhY3Rpb24uZGF0YS5zaG9ydElkLFxuICAgICAgICAgICAgY2xhaW1EYXRhOiBhY3Rpb24uZGF0YS5jbGFpbURhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBjaGFubmVsIGRhdGFcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgbmFtZSAgICAgIDogYWN0aW9uLmRhdGEubmFtZSxcbiAgICAgICAgICAgIGxvbmdJZCAgICA6IGFjdGlvbi5kYXRhLmxvbmdJZCxcbiAgICAgICAgICAgIHNob3J0SWQgICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbXNEYXRhOiBhY3Rpb24uZGF0YS5jbGFpbXNEYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNoYW5uZWxMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3RbYWN0aW9uLmRhdGEuY2hhbm5lbExpc3RJZF0sIHtcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gZGlzcGxheSBhbiBhc3NldFxuICAgIGNhc2UgYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5ESVNQTEFZX0FTU0VUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlBc3NldDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGlzcGxheUFzc2V0LCB7XG4gICAgICAgICAgZXJyb3IgOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgICBzdGF0dXM6IEVSUk9SLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L3JlZHVjZXJzL3Nob3cuanMiLCJjb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qge1xuICBhbmFseXRpY3M6IHtcbiAgICBnb29nbGVJZDogZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIH0sXG4gIGFzc2V0RGVmYXVsdHM6IHtcbiAgICB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwsXG4gICAgZGVzY3JpcHRpb246IGRlZmF1bHREZXNjcmlwdGlvbixcbiAgfSxcbiAgZGV0YWlsczoge1xuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gICAgdHdpdHRlcixcbiAgfSxcbn0gPSBzaXRlQ29uZmlnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRlc2NyaXB0aW9uLFxuICBnb29nbGVBbmFseXRpY3NJZCxcbiAgaG9zdCxcbiAgdGl0bGUsXG4gIHR3aXR0ZXIsXG4gIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgZGVmYXVsdFRodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9yZWR1Y2Vycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1nYVwiXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBQdWJsaXNoVG9vbCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hUb29sJztcblxuY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbid9PlxuICAgICAgICA8U0VPIC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nfT5cbiAgICAgICAgICA8UHVibGlzaFRvb2wgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvSG9tZVBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGNyZWF0ZVBhZ2VUaXRsZSB9IGZyb20gJ3V0aWxzL3BhZ2VUaXRsZSc7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGFncyB9IGZyb20gJ3V0aWxzL21ldGFUYWdzJztcbmltcG9ydCB7IGNyZWF0ZUNhbm9uaWNhbExpbmsgfSBmcm9tICd1dGlscy9jYW5vbmljYWxMaW5rJztcblxuY2xhc3MgU0VPIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICAvLyBwcm9wcyBmcm9tIHN0YXRlXG4gICAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gcHJvcHMgZnJvbSBwYXJlbnRcbiAgICBjb25zdCB7IGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCB7IHBhZ2VUaXRsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjcmVhdGUgcGFnZSB0aXRsZSwgdGFncywgYW5kIGNhbm9uaWNhbCBsaW5rXG4gICAgcGFnZVRpdGxlID0gY3JlYXRlUGFnZVRpdGxlKHNpdGVUaXRsZSwgcGFnZVRpdGxlKTtcbiAgICBjb25zdCBtZXRhVGFncyA9IGNyZWF0ZU1ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgIGNvbnN0IGNhbm9uaWNhbExpbmsgPSBjcmVhdGVDYW5vbmljYWxMaW5rKGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpLCBzaXRlSG9zdCk7XG4gICAgLy8gcmVuZGVyIHJlc3VsdHNcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldFxuICAgICAgICB0aXRsZT17cGFnZVRpdGxlfVxuICAgICAgICBtZXRhPXttZXRhVGFnc31cbiAgICAgICAgbGluaz17W3tyZWw6ICdjYW5vbmljYWwnLCBocmVmOiBjYW5vbmljYWxMaW5rfV19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblNFTy5wcm9wVHlwZXMgPSB7XG4gIHBhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGFnZVVyaSAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGFubmVsICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIGFzc2V0ICAgIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNFTztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvU0VPL3ZpZXcuanN4IiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVBhZ2VUaXRsZSA9IChzaXRlVGl0bGUsIHBhZ2VUaXRsZSkgPT4ge1xuICBpZiAoIXBhZ2VUaXRsZSkge1xuICAgIHJldHVybiBgJHtzaXRlVGl0bGV9YDtcbiAgfVxuICByZXR1cm4gYCR7c2l0ZVRpdGxlfSAtICR7cGFnZVRpdGxlfWA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvdXRpbHMvcGFnZVRpdGxlLmpzIiwiY29uc3QgZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZSA9ICh0aHVtYm5haWwpID0+IHtcbiAgaWYgKHRodW1ibmFpbCkge1xuICAgIGNvbnN0IGZpbGVFeHQgPSB0aHVtYm5haWwuc3Vic3RyaW5nKHRodW1ibmFpbC5sYXN0SW5kZXhPZignLicpKTtcbiAgICBzd2l0Y2ggKGZpbGVFeHQpIHtcbiAgICAgIGNhc2UgJ2pwZWcnOlxuICAgICAgY2FzZSAnanBnJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICAgIGNhc2UgJ3BuZyc6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvcG5nJztcbiAgICAgIGNhc2UgJ2dpZic6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvZ2lmJztcbiAgICAgIGNhc2UgJ21wNCc6XG4gICAgICAgIHJldHVybiAndmlkZW8vbXA0JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvanBlZyc7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn07XG5cbmNvbnN0IGNyZWF0ZUJhc2ljTWV0YVRhZ3MgPSAoc2l0ZUhvc3QsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlcikgPT4ge1xuICByZXR1cm4gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaXRlSG9zdH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHNpdGVEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5J30sXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsTWV0YVRhZ3MgPSAoc2l0ZVRpdGxlLCBzaXRlSG9zdCwgc2l0ZVR3aXR0ZXIsIGNoYW5uZWwpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBsb25nSWQgfSA9IGNoYW5uZWw7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBgJHtuYW1lfSBvbiAke3NpdGVUaXRsZX1gfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBgJHtzaXRlSG9zdH0vJHtuYW1lfToke2xvbmdJZH1gfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogYCR7bmFtZX0sIGEgY2hhbm5lbCBvbiAke3NpdGVUaXRsZX1gfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUFzc2V0TWV0YVRhZ3MgPSAoc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGEgfSA9IGFzc2V0O1xuICBjb25zdCB7IGNvbnRlbnRUeXBlIH0gPSBjbGFpbURhdGE7XG4gIGNvbnN0IGVtYmVkVXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc2hvd1VybCA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfWA7XG4gIGNvbnN0IHNvdXJjZSA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfS4ke2NsYWltRGF0YS5maWxlRXh0fWA7XG4gIGNvbnN0IG9nVGl0bGUgPSBjbGFpbURhdGEudGl0bGUgfHwgY2xhaW1EYXRhLm5hbWU7XG4gIGNvbnN0IG9nRGVzY3JpcHRpb24gPSBjbGFpbURhdGEuZGVzY3JpcHRpb24gfHwgZGVmYXVsdERlc2NyaXB0aW9uO1xuICBjb25zdCBvZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZShjbGFpbURhdGEudGh1bWJuYWlsKTtcbiAgY29uc3Qgb2dUaHVtYm5haWwgPSBjbGFpbURhdGEudGh1bWJuYWlsIHx8IGRlZmF1bHRUaHVtYm5haWw7XG4gIGNvbnN0IG1ldGFUYWdzID0gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogb2dUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogc2hvd1VybH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IG9nRGVzY3JpcHRpb259LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOndpZHRoJywgY29udGVudDogNjAwfSxcbiAgICB7cHJvcGVydHk6ICdvZzppbWFnZTpoZWlnaHQnLCBjb250ZW50OiAzMTV9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgXTtcbiAgaWYgKGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JyB8fCBjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL3dlYm0nKSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbycsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW86c2VjdXJlX3VybCcsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW86dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IG9nVGh1bWJuYWlsfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZTp0eXBlJywgY29udGVudDogb2dUaHVtYm5haWxDb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICd2aWRlbyd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdwbGF5ZXInfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcicsIGNvbnRlbnQ6IGVtYmVkVXJsfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjp3aWR0aCcsIGNvbnRlbnQ6IDYwMH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjp0ZXh0OnBsYXllcl93aWR0aCcsIGNvbnRlbnQ6IDYwMH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6aGVpZ2h0JywgY29udGVudDogMzM3fSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpzdHJlYW0nLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbTpjb250ZW50X3R5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICB9IGVsc2Uge1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICdhcnRpY2xlJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnlfbGFyZ2VfaW1hZ2UnfSk7XG4gIH1cbiAgcmV0dXJuIG1ldGFUYWdzO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1ldGFUYWdzID0gKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0TWV0YVRhZ3Moc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICB9O1xuICBpZiAoY2hhbm5lbCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFubmVsTWV0YVRhZ3Moc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGNoYW5uZWwpO1xuICB9O1xuICByZXR1cm4gY3JlYXRlQmFzaWNNZXRhVGFncyhzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC91dGlscy9tZXRhVGFncy5qcyIsImNvbnN0IGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayA9IChwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7cGFnZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBzaXRlSG9zdCkgPT4ge1xuICBsZXQgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQ7XG4gIGlmIChhc3NldC5jbGFpbURhdGEpIHtcbiAgICAoeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9LyR7bmFtZX1gO1xuICB9O1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayA9IChjaGFubmVsLCBzaXRlSG9zdCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWA7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2Fub25pY2FsTGluayA9IChhc3NldCwgY2hhbm5lbCwgcGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayhhc3NldCwgc2l0ZUhvc3QpO1xuICB9XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rKGNoYW5uZWwsIHNpdGVIb3N0KTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rKHBhZ2UsIHNpdGVIb3N0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC91dGlscy9jYW5vbmljYWxMaW5rLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5hdkxpbmssIHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBMb2dvIGZyb20gJ2NvbXBvbmVudHMvTG9nbyc7XG5pbXBvcnQgTmF2QmFyQ2hhbm5lbERyb3Bkb3duIGZyb20gJ2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bic7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY29uc3QgVklFVyA9ICdWSUVXJztcbmNvbnN0IExPR09VVCA9ICdMT0dPVVQnO1xuXG5jbGFzcyBOYXZCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlciA9IHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ291dFVzZXIgPSB0aGlzLmxvZ291dFVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbiA9IHRoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgdXNlciBpcyBhbHJlYWR5IGxvZ2dlZCBpblxuICAgIHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIoKTtcbiAgfVxuICBjaGVja0ZvckxvZ2dlZEluVXNlciAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9O1xuICAgIHJlcXVlc3QoJy91c2VyJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oZGF0YS5jaGFubmVsTmFtZSwgZGF0YS5zaG9ydENoYW5uZWxJZCwgZGF0YS5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJy91c2VyIGVycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgbG9nb3V0VXNlciAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9O1xuICAgIHJlcXVlc3QoJy9sb2dvdXQnLCBwYXJhbXMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9nb3V0KCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJy9sb2dvdXQgZXJyb3InLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIGhhbmRsZVNlbGVjdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBMT0dPVVQ6XG4gICAgICAgIHRoaXMubG9nb3V0VXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVklFVzpcbiAgICAgICAgLy8gcmVkaXJlY3QgdG8gY2hhbm5lbCBwYWdlXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvJHt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfToke3RoaXMucHJvcHMuY2hhbm5lbExvbmdJZH1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgbmF2LWJhcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1zaG9ydCBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcic+XG4gICAgICAgICAgPExvZ28gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tY2VudGVyJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbmF2LWJhci10YWdsaW5lJz5PcGVuLXNvdXJjZSwgZGVjZW50cmFsaXplZCBpbWFnZSBhbmQgdmlkZW8gc2hhcmluZy48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdi1iYXItLXJpZ2h0Jz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nLycgZXhhY3Q+UHVibGlzaDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy9hYm91dCc+QWJvdXQ8L05hdkxpbms+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hhbm5lbE5hbWUgPyAoXG4gICAgICAgICAgICAgIDxOYXZCYXJDaGFubmVsRHJvcGRvd25cbiAgICAgICAgICAgICAgICBjaGFubmVsTmFtZT17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3Rpb249e3RoaXMuaGFuZGxlU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3Rpb249e3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9XG4gICAgICAgICAgICAgICAgVklFVz17VklFV31cbiAgICAgICAgICAgICAgICBMT0dPVVQ9e0xPR09VVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxOYXZMaW5rIGlkPSduYXYtYmFyLWxvZ2luLWxpbmsnIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2xvZ2luJz5DaGFubmVsPC9OYXZMaW5rPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTmF2QmFyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZnVuY3Rpb24gTG9nbyAoKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2ZXJzaW9uPScxLjEnIGlkPSdMYXllcl8xJyB4PScwcHgnIHk9JzBweCcgaGVpZ2h0PScyNHB4JyB2aWV3Qm94PScwIDAgODAgMzEnIGVuYWJsZUJhY2tncm91bmQ9J25ldyAwIDAgODAgMzEnIGNsYXNzTmFtZT0nbmF2LWJhci1sb2dvJz5cbiAgICAgIDxMaW5rIHRvPScvJz5cbiAgICAgICAgPHRpdGxlPkxvZ288L3RpdGxlPlxuICAgICAgICA8ZGVzYz5TcGVlLmNoIGxvZ288L2Rlc2M+XG4gICAgICAgIDxnIGlkPSdBYm91dCc+XG4gICAgICAgICAgPGcgaWQ9J1B1Ymxpc2gtRm9ybS1WMi1feDI4X2ZpbGxlZF94MjlfJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNDIuMDAwMDAwLCAtMjMuMDAwMDAwKSc+XG4gICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQyLjAwMDAwMCwgMjIuMDAwMDAwKSc+XG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT0nbWF0cml4KDEgMCAwIDEgMCAyMCknIGZvbnRTaXplPScyNScgZm9udEZhbWlseT0nUm9ib3RvJz5TcGVlJmx0O2g8L3RleHQ+XG4gICAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDMwLjAwMDAwMCknPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzA5RjkxMScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTAuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5JyBmaWxsPSdub25lJyBzdHJva2U9JyMwMjlENzQnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00xNi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjRTM1QkQ4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMzIuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTMnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzQxNTZDNScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTQ4LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS00JyBmaWxsPSdub25lJyBzdHJva2U9JyM2MzU2ODgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J002NC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9MaW5rPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBOYXZCYXJDaGFubmVsRHJvcGRvd24gKHsgY2hhbm5lbE5hbWUsIGhhbmRsZVNlbGVjdGlvbiwgZGVmYXVsdFNlbGVjdGlvbiwgVklFVywgTE9HT1VUIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93IGxpbmstLW5hdicgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdGlvbn0gdmFsdWU9e2RlZmF1bHRTZWxlY3Rpb259PlxuICAgICAgPG9wdGlvbiBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e2NoYW5uZWxOYW1lfTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17VklFV30+Vmlldzwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17TE9HT1VUfT5Mb2dvdXQ8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkJhckNoYW5uZWxEcm9wZG93bjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGlzYWJsZWQ6IHB1Ymxpc2guZGlzYWJsZWQsXG4gICAgZmlsZSAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICBzdGF0dXMgIDogcHVibGlzaC5zdGF0dXMuc3RhdHVzLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnY29udGFpbmVycy9Ecm9wem9uZSc7XG5pbXBvcnQgUHVibGlzaERldGFpbHMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoRGV0YWlscyc7XG5pbXBvcnQgUHVibGlzaFN0YXR1cyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hTdGF0dXMnO1xuaW1wb3J0IFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlJztcblxuY2xhc3MgUHVibGlzaFRvb2wgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBjb25zb2xlLmxvZygncHVibGlzaCBpcyBkaXNhYmxlZCcpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UgLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwdWJsaXNoIGlzIG5vdCBkaXNhYmxlZCcpO1xuICAgICAgaWYgKHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFB1Ymxpc2hTdGF0dXMgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiA8UHVibGlzaERldGFpbHMgLz47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiA8RHJvcHpvbmUgLz47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVG9vbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdmFsaWRhdGVGaWxlIH0gZnJvbSAndXRpbHMvZmlsZSc7XG5pbXBvcnQgUHVibGlzaFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9QdWJsaXNoUHJldmlldyc7XG5cbmNsYXNzIERyb3B6b25lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcmFnT3ZlciAgOiBmYWxzZSxcbiAgICAgIG1vdXNlT3ZlciA6IGZhbHNlLFxuICAgICAgZGltUHJldmlldzogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZURyb3AgPSB0aGlzLmhhbmRsZURyb3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdPdmVyID0gdGhpcy5oYW5kbGVEcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0VudGVyID0gdGhpcy5oYW5kbGVEcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdMZWF2ZSA9IHRoaXMuaGFuZGxlRHJhZ0xlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUVudGVyID0gdGhpcy5oYW5kbGVNb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUxlYXZlID0gdGhpcy5oYW5kbGVNb3VzZUxlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVJbnB1dCA9IHRoaXMuaGFuZGxlRmlsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jaG9vc2VGaWxlID0gdGhpcy5jaG9vc2VGaWxlLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiBmYWxzZX0pO1xuICAgIC8vIGlmIGRyb3BwZWQgaXRlbXMgYXJlbid0IGZpbGVzLCByZWplY3QgdGhlbVxuICAgIGNvbnN0IGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgIGlmIChkdC5pdGVtcykge1xuICAgICAgaWYgKGR0Lml0ZW1zWzBdLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICBjb25zdCBkcm9wcGVkRmlsZSA9IGR0Lml0ZW1zWzBdLmdldEFzRmlsZSgpO1xuICAgICAgICB0aGlzLmNob29zZUZpbGUoZHJvcHBlZEZpbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnT3ZlciAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGhhbmRsZURyYWdFbmQgKGV2ZW50KSB7XG4gICAgdmFyIGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgIGlmIChkdC5pdGVtcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkdC5pdGVtcy5yZW1vdmUoaSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5jbGVhckRhdGEoKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZ0VudGVyICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogdHJ1ZSwgZGltUHJldmlldzogdHJ1ZX0pO1xuICB9XG4gIGhhbmRsZURyYWdMZWF2ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IGZhbHNlLCBkaW1QcmV2aWV3OiBmYWxzZX0pO1xuICB9XG4gIGhhbmRsZU1vdXNlRW50ZXIgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogdHJ1ZSwgZGltUHJldmlldzogdHJ1ZX0pO1xuICB9XG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogZmFsc2UsIGRpbVByZXZpZXc6IGZhbHNlfSk7XG4gIH1cbiAgaGFuZGxlQ2xpY2sgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZV9pbnB1dCcpLmNsaWNrKCk7XG4gIH1cbiAgaGFuZGxlRmlsZUlucHV0IChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZmlsZUxpc3QgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgdGhpcy5jaG9vc2VGaWxlKGZpbGVMaXN0WzBdKTtcbiAgfVxuICBjaG9vc2VGaWxlIChmaWxlKSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbGlkYXRlRmlsZShmaWxlKTsgLy8gdmFsaWRhdGUgdGhlIGZpbGUncyBuYW1lLCB0eXBlLCBhbmQgc2l6ZVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2V0RmlsZUVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgLy8gc3RhZ2UgaXQgc28gaXQgd2lsbCBiZSByZWFkeSB3aGVuIHRoZSBwdWJsaXNoIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdEZpbGUoZmlsZSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dC1maWxlJyB0eXBlPSdmaWxlJyBpZD0nZmlsZV9pbnB1dCcgbmFtZT0nZmlsZV9pbnB1dCcgYWNjZXB0PSd2aWRlby8qLGltYWdlLyonIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUZpbGVJbnB1dH0gZW5jVHlwZT0nbXVsdGlwYXJ0L2Zvcm0tZGF0YScgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8ZGl2IGlkPSdwcmV2aWV3LWRyb3B6b25lJyBjbGFzc05hbWU9eydyb3cgcm93LS1wYWRkZWQgcm93LS10YWxsIGRyb3B6b25lJyArICh0aGlzLnN0YXRlLmRyYWdPdmVyID8gJyBkcm9wem9uZS0tZHJhZy1vdmVyJyA6ICcnKX0gb25Ecm9wPXt0aGlzLmhhbmRsZURyb3B9IG9uRHJhZ092ZXI9e3RoaXMuaGFuZGxlRHJhZ092ZXJ9IG9uRHJhZ0VuZD17dGhpcy5oYW5kbGVEcmFnRW5kfSBvbkRyYWdFbnRlcj17dGhpcy5oYW5kbGVEcmFnRW50ZXJ9IG9uRHJhZ0xlYXZlPXt0aGlzLmhhbmRsZURyYWdMZWF2ZX0gb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9IG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb3VzZUxlYXZlfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWxlID8gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hQcmV2aWV3XG4gICAgICAgICAgICAgICAgZGltUHJldmlldz17dGhpcy5zdGF0ZS5kaW1QcmV2aWV3fVxuICAgICAgICAgICAgICAgIGZpbGU9e3RoaXMucHJvcHMuZmlsZX1cbiAgICAgICAgICAgICAgICB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS10ZXh0LWhvbGRlcicgY2xhc3NOYW1lPXsnZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcid9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5kcmFnT3ZlciA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWRyYWdvdmVyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz5Ecm9wIGl0LjwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUubW91c2VPdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtaW5zdHJ1Y3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtcGxhY2Vob2xkZXIgaW5mby1tZXNzYWdlLS1mYWlsdXJlJyBpZD0naW5wdXQtZXJyb3ItZmlsZS1zZWxlY3Rpb24nPnt0aGlzLnByb3BzLmZpbGVFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkRyYWcgJiBkcm9wIGltYWdlIG9yIHZpZGVvIGhlcmUgdG8gcHVibGlzaDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5PUjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlLS11bmRlcmxpbmVkJz5DSE9PU0UgRklMRTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtdGV4dC1ob2xkZXInIGNsYXNzTmFtZT17J2ZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInfT5cbiAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRyYWdPdmVyID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWRyYWdvdmVyJz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+RHJvcCBpdC48L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtaW5zdHJ1Y3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLXBsYWNlaG9sZGVyIGluZm8tbWVzc2FnZS0tZmFpbHVyZScgaWQ9J2lucHV0LWVycm9yLWZpbGUtc2VsZWN0aW9uJz57dGhpcy5wcm9wcy5maWxlRXJyb3J9PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+RHJhZyAmIGRyb3AgaW1hZ2Ugb3IgdmlkZW8gaGVyZSB0byBwdWJsaXNoPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5PUjwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZS0tdW5kZXJsaW5lZCc+Q0hPT1NFIEZJTEU8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Ecm9wem9uZS92aWV3LmpzeCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB2YWxpZGF0ZUZpbGUgKGZpbGUpIHtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwcm92aWRlZCcpO1xuICAgIH1cbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSBzaXplIGFuZCB0eXBlXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBHSUZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZmlsZS50eXBlICsgJyBpcyBub3QgYSBzdXBwb3J0ZWQgZmlsZSB0eXBlLiBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L3V0aWxzL2ZpbGUuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgUHVibGlzaFByZXZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGltZ1NvdXJjZSAgICAgICA6ICcnLFxuICAgICAgZGVmYXVsdFRodW1ibmFpbDogJy9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZSh0aGlzLnByb3BzLmZpbGUpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgaWYgKG5ld1Byb3BzLmZpbGUgIT09IHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2UobmV3UHJvcHMuZmlsZSk7XG4gICAgfVxuICAgIGlmIChuZXdQcm9wcy50aHVtYm5haWwgIT09IHRoaXMucHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICBpZiAobmV3UHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUobmV3UHJvcHMudGh1bWJuYWlsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogdGhpcy5zdGF0ZS5kZWZhdWx0VGh1bWJuYWlsfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlIChmaWxlKSB7XG4gICAgY29uc3QgcHJldmlld1JlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcHJldmlld1JlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIHByZXZpZXdSZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiBwcmV2aWV3UmVhZGVyLnJlc3VsdH0pO1xuICAgIH07XG4gIH1cbiAgc2V0UHJldmlld0ltYWdlU291cmNlIChmaWxlKSB7XG4gICAgaWYgKGZpbGUudHlwZSAhPT0gJ3ZpZGVvL21wNCcpIHtcbiAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUoZmlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnRodW1ibmFpbCkge1xuICAgICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKHRoaXMucHJvcHMudGh1bWJuYWlsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogdGhpcy5zdGF0ZS5kZWZhdWx0VGh1bWJuYWlsfSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbWdcbiAgICAgICAgaWQ9J2Ryb3B6b25lLXByZXZpZXcnXG4gICAgICAgIHNyYz17dGhpcy5zdGF0ZS5pbWdTb3VyY2V9XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5kaW1QcmV2aWV3ID8gJ2RpbScgOiAnJ31cbiAgICAgICAgYWx0PSdwdWJsaXNoIHByZXZpZXcnXG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblB1Ymxpc2hQcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgZGltUHJldmlldzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZmlsZSAgICAgIDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICB0aHVtYm5haWwgOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3L2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGUsIHN0YXJ0UHVibGlzaH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGU6IHB1Ymxpc2guZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxuICBzdGFydFB1Ymxpc2gsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2NvbnRhaW5lcnMvRHJvcHpvbmUnO1xuaW1wb3J0IFB1Ymxpc2hUaXRsZUlucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hVcmxJbnB1dCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dCc7XG5pbXBvcnQgUHVibGlzaFRodW1ibmFpbElucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0JztcbmltcG9ydCBQdWJsaXNoTWV0YWRhdGFJbnB1dHMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMnO1xuaW1wb3J0IENoYW5uZWxTZWxlY3QgZnJvbSAnY29udGFpbmVycy9DaGFubmVsU2VsZWN0JztcblxuY2xhc3MgUHVibGlzaERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLm9uUHVibGlzaFN1Ym1pdCA9IHRoaXMub25QdWJsaXNoU3VibWl0LmJpbmQodGhpcyk7XG4gIH1cbiAgb25QdWJsaXNoU3VibWl0ICgpIHtcbiAgICB0aGlzLnByb3BzLnN0YXJ0UHVibGlzaCh0aGlzLnByb3BzLmhpc3RvcnkpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby1ib3R0b20nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgIDxQdWJsaXNoVGl0bGVJbnB1dCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey8qIGxlZnQgY29sdW1uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCcgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPERyb3B6b25lIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogcmlnaHQgY29sdW1uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgPGRpdiBpZD0ncHVibGlzaC1hY3RpdmUtYXJlYScgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8UHVibGlzaFVybElucHV0IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxTZWxlY3QgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyAodGhpcy5wcm9wcy5maWxlLnR5cGUgPT09ICd2aWRlby9tcDQnKSAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlICc+XG4gICAgICAgICAgICAgICAgPFB1Ymxpc2hUaHVtYm5haWxJbnB1dCAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0tbm8tYm90dG9tIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxQdWJsaXNoTWV0YWRhdGFJbnB1dHMgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8YnV0dG9uIGlkPSdwdWJsaXNoLXN1Ym1pdCcgY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS1sYXJnZScgb25DbGljaz17dGhpcy5vblB1Ymxpc2hTdWJtaXR9PlB1Ymxpc2g8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLWJvdHRvbSBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLWNhbmNlbCcgb25DbGljaz17dGhpcy5wcm9wcy5jbGVhckZpbGV9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPkJ5IGNsaWNraW5nICdQdWJsaXNoJywgeW91IGFmZmlybSB0aGF0IHlvdSBoYXZlIHRoZSByaWdodHMgdG8gcHVibGlzaCB0aGlzIGNvbnRlbnQgdG8gdGhlIExCUlkgbmV0d29yaywgYW5kIHRoYXQgeW91IHVuZGVyc3RhbmQgdGhlIHByb3BlcnRpZXMgb2YgcHVibGlzaGluZyBpdCB0byBhIGRlY2VudHJhbGl6ZWQsIHVzZXItY29udHJvbGxlZCBuZXR3b3JrLiA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vbGVhcm4nPlJlYWQgbW9yZS48L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihQdWJsaXNoRGV0YWlscyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL3ZpZXcuanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHB1Ymxpc2gubWV0YWRhdGEudGl0bGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25NZXRhZGF0YUNoYW5nZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVNZXRhZGF0YShuYW1lLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQdWJsaXNoVGl0bGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChlKSB7XG4gICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0ncHVibGlzaC10aXRsZScgY2xhc3NOYW1lPSdpbnB1dC10ZXh0IHRleHQtLWxhcmdlIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIG5hbWU9J3RpdGxlJyBwbGFjZWhvbGRlcj0nR2l2ZSB5b3VyIHBvc3QgYSB0aXRsZS4uLicgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IHZhbHVlPXt0aGlzLnByb3BzLnRpdGxlfSAvPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRpdGxlSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXcuanN4IiwiaW1wb3J0IHt1cGRhdGVDbGFpbSwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWUgICA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBmaWxlTmFtZSAgICAgICAgICAgICAgOiBwdWJsaXNoLmZpbGUubmFtZSxcbiAgICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBwdWJsaXNoLnB1Ymxpc2hJbkNoYW5uZWwsXG4gICAgc2VsZWN0ZWRDaGFubmVsICAgICAgIDogcHVibGlzaC5zZWxlY3RlZENoYW5uZWwsXG4gICAgY2xhaW0gICAgICAgICAgICAgICAgIDogcHVibGlzaC5jbGFpbSxcbiAgICB1cmxFcnJvciAgICAgICAgICAgICAgOiBwdWJsaXNoLmVycm9yLnVybCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNsYWltQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUNsYWltKHZhbHVlKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcigncHVibGlzaFN1Ym1pdCcsIG51bGwpKTtcbiAgICB9LFxuICAgIG9uVXJsRXJyb3I6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ3VybCcsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5pbXBvcnQgVXJsTWlkZGxlIGZyb20gJ2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXknO1xuXG5jbGFzcyBQdWJsaXNoVXJsSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBjbGFpbSwgZmlsZU5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjbGFpbSkge1xuICAgICAgdGhpcy5zZXRDbGFpbU5hbWUoZmlsZU5hbWUpO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzICh7IGNsYWltLCBmaWxlTmFtZSB9KSB7XG4gICAgLy8gaWYgYSBuZXcgZmlsZSB3YXMgY2hvc2VuLCB1cGRhdGUgdGhlIGNsYWltIG5hbWVcbiAgICBpZiAoZmlsZU5hbWUgIT09IHRoaXMucHJvcHMuZmlsZU5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldENsYWltTmFtZShmaWxlTmFtZSk7XG4gICAgfVxuICAgIC8vIGlmIHRoZSBjbGFpbSBoYXMgdXBkYXRlZCwgY2hlY2sgaXRzIGF2YWlsYWJpbGl0eVxuICAgIGlmIChjbGFpbSAhPT0gdGhpcy5wcm9wcy5jbGFpbSkge1xuICAgICAgdGhpcy52YWxpZGF0ZUNsYWltKGNsYWltKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5jbGVhbnNlSW5wdXQodmFsdWUpO1xuICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICB0aGlzLnByb3BzLm9uQ2xhaW1DaGFuZ2UodmFsdWUpO1xuICB9XG4gIGNsZWFuc2VJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgc2V0Q2xhaW1OYW1lIChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lV2l0aG91dEVuZGluZyA9IGZpbGVOYW1lLnN1YnN0cmluZygwLCBmaWxlTmFtZS5sYXN0SW5kZXhPZignLicpKTtcbiAgICBjb25zdCBjbGVhbkNsYWltTmFtZSA9IHRoaXMuY2xlYW5zZUlucHV0KGZpbGVOYW1lV2l0aG91dEVuZGluZyk7XG4gICAgdGhpcy5wcm9wcy5vbkNsYWltQ2hhbmdlKGNsZWFuQ2xhaW1OYW1lKTtcbiAgfVxuICB2YWxpZGF0ZUNsYWltIChjbGFpbSkge1xuICAgIGlmICghY2xhaW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uVXJsRXJyb3IoJ0VudGVyIGEgdXJsIGFib3ZlJyk7XG4gICAgfVxuICAgIHJlcXVlc3QoYC9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LyR7Y2xhaW19YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVybEVycm9yKG51bGwpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVybEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNsYWltLCBsb2dnZWRJbkNoYW5uZWxOYW1lLCBsb2dnZWRJbkNoYW5uZWxTaG9ydElkLCBwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwsIHVybEVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5Jz5zcGVlLmNoIC8gPC9zcGFuPlxuICAgICAgICAgIDxVcmxNaWRkbGVcbiAgICAgICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw9e3B1Ymxpc2hJbkNoYW5uZWx9XG4gICAgICAgICAgICBzZWxlY3RlZENoYW5uZWw9e3NlbGVjdGVkQ2hhbm5lbH1cbiAgICAgICAgICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU9e2xvZ2dlZEluQ2hhbm5lbE5hbWV9XG4gICAgICAgICAgICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkPXtsb2dnZWRJbkNoYW5uZWxTaG9ydElkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjbGFpbS1uYW1lLWlucHV0JyBjbGFzc05hbWU9J2lucHV0LXRleHQnIG5hbWU9J2NsYWltJyBwbGFjZWhvbGRlcj0neW91ci11cmwtaGVyZScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IHZhbHVlPXtjbGFpbX0gLz5cbiAgICAgICAgICB7IChjbGFpbSAmJiAhdXJsRXJyb3IpICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNsYWltLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1zdWNjZXNzIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTMnfTwvc3Bhbj4gfVxuICAgICAgICAgIHsgdXJsRXJyb3IgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzE2J308L3NwYW4+IH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgeyB1cmxFcnJvciA/IChcbiAgICAgICAgICAgIDxwIGlkPSdpbnB1dC1lcnJvci1jbGFpbS1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3VybEVycm9yfTwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIGN1c3RvbSB1cmw8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hVcmxJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmZ1bmN0aW9uIFVybE1pZGRsZSAoe3B1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgbG9nZ2VkSW5DaGFubmVsTmFtZSwgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0pIHtcbiAgaWYgKHB1Ymxpc2hJbkNoYW5uZWwpIHtcbiAgICBpZiAoc2VsZWN0ZWRDaGFubmVsID09PSBsb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gPHNwYW4gaWQ9J3VybC1jaGFubmVsJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnknPntsb2dnZWRJbkNoYW5uZWxOYW1lfTp7bG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0gLzwvc3Bhbj47XG4gICAgfVxuICAgIHJldHVybiA8c3BhbiBpZD0ndXJsLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz5AY2hhbm5lbDxzcGFuXG4gICAgICBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+U2VsZWN0IGEgY2hhbm5lbCBiZWxvdzwvc3Bhbj4gLzwvc3Bhbj47XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8c3BhbiBpZD0ndXJsLW5vLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz54eXo8c3BhbiBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+VGhpcyB3aWxsIGJlIGEgcmFuZG9tIGlkPC9zcGFuPiAvPC9zcGFuPlxuICApO1xufVxuXG5VcmxNaWRkbGUucHJvcFR5cGVzID0ge1xuICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBsb2dnZWRJbkNoYW5uZWxOYW1lICAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXJsTWlkZGxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25OZXdUaHVtYm5haWwgfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaDogeyBmaWxlIH0gfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uTmV3VGh1bWJuYWlsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gIGxldCBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gIGxldCBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcbiAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICBsZXQgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTogbWltZVN0cmluZ30pO1xufVxuXG5jbGFzcyBQdWJsaXNoVGh1bWJuYWlsSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZGVvU291cmNlICAgOiBudWxsLFxuICAgICAgZXJyb3IgICAgICAgICA6IG51bGwsXG4gICAgICBzbGlkZXJNaW5SYW5nZTogMSxcbiAgICAgIHNsaWRlck1heFJhbmdlOiBudWxsLFxuICAgICAgc2xpZGVyVmFsdWUgICA6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YSA9IHRoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2UgPSB0aGlzLmhhbmRsZVNsaWRlckNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlsID0gdGhpcy5jcmVhdGVUaHVtYm5haWwuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBmaWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0VmlkZW9Tb3VyY2UoZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgLy8gaWYgZmlsZSBjaGFuZ2VzXG4gICAgaWYgKG5leHRQcm9wcy5maWxlICYmIG5leHRQcm9wcy5maWxlICE9PSB0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgIGNvbnN0IHsgZmlsZSB9ID0gbmV4dFByb3BzO1xuICAgICAgdGhpcy5zZXRWaWRlb1NvdXJjZShmaWxlKTtcbiAgICB9O1xuICB9XG4gIHNldFZpZGVvU291cmNlIChmaWxlKSB7XG4gICAgY29uc3QgcHJldmlld1JlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcHJldmlld1JlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIHByZXZpZXdSZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YVVyaSA9IHByZXZpZXdSZWFkZXIucmVzdWx0O1xuICAgICAgY29uc3QgYmxvYiA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVyaSk7XG4gICAgICBjb25zdCB2aWRlb1NvdXJjZSA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmlkZW9Tb3VyY2UgfSk7XG4gICAgfTtcbiAgfVxuICBoYW5kbGVWaWRlb0xvYWRlZERhdGEgKGV2ZW50KSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBldmVudC50YXJnZXQuZHVyYXRpb247XG4gICAgY29uc3QgdG90YWxNaW51dGVzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIDYwKTtcbiAgICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKGR1cmF0aW9uICUgNjApO1xuICAgIC8vIHNldCB0aGUgc2xpZGVyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzbGlkZXJNYXhSYW5nZTogZHVyYXRpb24gKiAxMDAsXG4gICAgICBzbGlkZXJWYWx1ZSAgIDogZHVyYXRpb24gKiAxMDAgLyAyLFxuICAgICAgdG90YWxNaW51dGVzLFxuICAgICAgdG90YWxTZWNvbmRzLFxuICAgIH0pO1xuICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlb1xuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IGR1cmF0aW9uIC8gMjtcbiAgfVxuICBoYW5kbGVTbGlkZXJDaGFuZ2UgKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpO1xuICAgIC8vIHVwZGF0ZSB0aGUgc2xpZGVyIHZhbHVlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzbGlkZXJWYWx1ZTogdmFsdWUsXG4gICAgfSk7XG4gICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIHZpZGVvXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gdmFsdWUgLyAxMDA7XG4gIH1cbiAgY3JlYXRlVGh1bWJuYWlsICgpIHtcbiAgICAvLyB0YWtlIGEgc25hcHNob3RcbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIGNvbnN0IGJsb2IgPSBkYXRhVVJJdG9CbG9iKGRhdGFVcmwpO1xuICAgIGNvbnN0IHNuYXBzaG90ID0gbmV3IEZpbGUoW2Jsb2JdLCBgdGh1bWJuYWlsLnBuZ2AsIHtcbiAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgIH0pO1xuICAgIC8vIHNldCB0aGUgdGh1bWJuYWlsIGluIHJlZHV4IHN0b3JlXG4gICAgaWYgKHNuYXBzaG90KSB7XG4gICAgICB0aGlzLnByb3BzLm9uTmV3VGh1bWJuYWlsKHNuYXBzaG90KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCB2aWRlb1NvdXJjZSwgc2xpZGVyTWluUmFuZ2UsIHNsaWRlck1heFJhbmdlLCBzbGlkZXJWYWx1ZSwgdG90YWxNaW51dGVzLCB0b3RhbFNlY29uZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJz5UaHVtYm5haWw6PC9sYWJlbD5cbiAgICAgICAgPHZpZGVvXG4gICAgICAgICAgaWQ9J3ZpZGVvLXRodW1iLXBsYXllcidcbiAgICAgICAgICBwcmVsb2FkPSdtZXRhZGF0YSdcbiAgICAgICAgICBtdXRlZFxuICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogJ25vbmUnfX1cbiAgICAgICAgICBwbGF5c0lubGluZVxuICAgICAgICAgIG9uTG9hZGVkRGF0YT17dGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGF9XG4gICAgICAgICAgc3JjPXt2aWRlb1NvdXJjZX1cbiAgICAgICAgICBvblNlZWtlZD17dGhpcy5jcmVhdGVUaHVtYm5haWx9XG4gICAgICAgIC8+XG4gICAgICAgIHtcbiAgICAgICAgICBzbGlkZXJWYWx1ZSA/IChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcicgc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPjAnMDBcIjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+e3RvdGFsTWludXRlc30ne3RvdGFsU2Vjb25kc31cIjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPSdyYW5nZSdcbiAgICAgICAgICAgICAgICAgIG1pbj17c2xpZGVyTWluUmFuZ2V9XG4gICAgICAgICAgICAgICAgICBtYXg9e3NsaWRlck1heFJhbmdlfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NsaWRlclZhbHVlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGlkZXInXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnID5sb2FkaW5nLi4uIDwvcD5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgeyBlcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e2Vycm9yfTwvcD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+VXNlIHNsaWRlciB0byBzZXQgdGh1bWJuYWlsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVGh1bWJuYWlsSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHt1cGRhdGVNZXRhZGF0YSwgdG9nZ2xlTWV0YWRhdGFJbnB1dHN9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzaG93TWV0YWRhdGFJbnB1dHM6IHB1Ymxpc2guc2hvd01ldGFkYXRhSW5wdXRzLFxuICAgIGRlc2NyaXB0aW9uICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICBsaWNlbnNlICAgICAgICAgICA6IHB1Ymxpc2gubWV0YWRhdGEubGljZW5zZSxcbiAgICBuc2Z3ICAgICAgICAgICAgICA6IHB1Ymxpc2gubWV0YWRhdGEubnNmdyxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbk1ldGFkYXRhQ2hhbmdlOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZU1ldGFkYXRhKG5hbWUsIHZhbHVlKSk7XG4gICAgfSxcbiAgICBvblRvZ2dsZU1ldGFkYXRhSW5wdXRzOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvZ2dsZU1ldGFkYXRhSW5wdXRzKHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEV4cGFuZGluZ1RleHRBcmVhIGZyb20gJ2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEnO1xuXG5jbGFzcyBQdWJsaXNoTWV0YWRhdGFJbnB1dHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy50b2dnbGVTaG93SW5wdXRzID0gdGhpcy50b2dnbGVTaG93SW5wdXRzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdCA9IHRoaXMuaGFuZGxlU2VsZWN0LmJpbmQodGhpcyk7XG4gIH1cbiAgdG9nZ2xlU2hvd0lucHV0cyAoKSB7XG4gICAgdGhpcy5wcm9wcy5vblRvZ2dsZU1ldGFkYXRhSW5wdXRzKCF0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcgPyB0YXJnZXQuY2hlY2tlZCA6IHRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBuYW1lID0gdGFyZ2V0Lm5hbWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHZhbHVlKTtcbiAgfVxuICBoYW5kbGVTZWxlY3QgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgc2VsZWN0ZWRPcHRpb24pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J3B1Ymxpc2gtZGV0YWlscycgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAge3RoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzICYmIChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J2xhYmVsJz5EZXNjcmlwdGlvbjo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPEV4cGFuZGluZ1RleHRBcmVhXG4gICAgICAgICAgICAgICAgICBpZD0ncHVibGlzaC1kZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dGFyZWEgdGV4dGFyZWEtLXByaW1hcnkgdGV4dGFyZWEtLWZ1bGwtd2lkdGgnXG4gICAgICAgICAgICAgICAgICByb3dzPXsxfVxuICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsyMDAwfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4SGVpZ2h0OiAyMDAgfX1cbiAgICAgICAgICAgICAgICAgIG5hbWU9J2Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J09wdGlvbmFsIGRlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J2xhYmVsJz5MaWNlbnNlOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHR5cGU9J3RleHQnIG5hbWU9J2xpY2Vuc2UnIGlkPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tcHJpbWFyeScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0fT5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9JyAnPlVuc3BlY2lmaWVkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdQdWJsaWMgRG9tYWluJz5QdWJsaWMgRG9tYWluPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdDcmVhdGl2ZSBDb21tb25zJz5DcmVhdGl2ZSBDb21tb25zPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbnNmdycgY2xhc3NOYW1lPSdsYWJlbCc+TWF0dXJlOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dC1jaGVja2JveCcgdHlwZT0nY2hlY2tib3gnIGlkPSdwdWJsaXNoLW5zZncnIG5hbWU9J25zZncnIHZhbHVlPXt0aGlzLnByb3BzLm5zZnd9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1zZWNvbmRhcnknIG9uQ2xpY2s9e3RoaXMudG9nZ2xlU2hvd0lucHV0c30+e3RoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzID8gJ2xlc3MnIDogJ21vcmUnfTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoTWV0YWRhdGFJbnB1dHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy92aWV3LmpzeCIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBFeHBhbmRpbmdUZXh0YXJlYSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLl9oYW5kbGVDaGFuZ2UgPSB0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5hZGp1c3RUZXh0YXJlYSh7fSk7XG4gIH1cbiAgX2hhbmRsZUNoYW5nZSAoZXZlbnQpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UoZXZlbnQpO1xuICAgIHRoaXMuYWRqdXN0VGV4dGFyZWEoZXZlbnQpO1xuICB9XG4gIGFkanVzdFRleHRhcmVhICh7IHRhcmdldCA9IHRoaXMuZWwgfSkge1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgLi4ucmVzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPHRleHRhcmVhXG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgICByZWY9e3ggPT4gdGhpcy5lbCA9IHh9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2V9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuRXhwYW5kaW5nVGV4dGFyZWEucHJvcFR5cGVzID0ge1xuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRpbmdUZXh0YXJlYTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3NldFB1Ymxpc2hJbkNoYW5uZWwsIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIHB1Ymxpc2hJbkNoYW5uZWwgICA6IHB1Ymxpc2gucHVibGlzaEluQ2hhbm5lbCxcbiAgICBzZWxlY3RlZENoYW5uZWwgICAgOiBwdWJsaXNoLnNlbGVjdGVkQ2hhbm5lbCxcbiAgICBjaGFubmVsRXJyb3IgICAgICAgOiBwdWJsaXNoLmVycm9yLmNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdjaGFubmVsJywgbnVsbCkpO1xuICAgICAgZGlzcGF0Y2goc2V0UHVibGlzaEluQ2hhbm5lbCh2YWx1ZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsU2VsZWN0OiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdjaGFubmVsJywgbnVsbCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5pbXBvcnQgKiBhcyBzdGF0ZXMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzJztcblxuY2xhc3MgQ2hhbm5lbFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2ggPSB0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2guYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbiA9IHRoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gIH1cbiAgdG9nZ2xlQW5vbnltb3VzUHVibGlzaCAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09ICdhbm9ueW1vdXMnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZShmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlKHRydWUpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVTZWxlY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25DaGFubmVsU2VsZWN0KHNlbGVjdGVkT3B0aW9uKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J2Fub255bW91cy1vci1jaGFubmVsJyBpZD0nYW5vbnltb3VzLXJhZGlvJyBjbGFzc05hbWU9J2lucHV0LXJhZGlvJyB2YWx1ZT0nYW5vbnltb3VzJyBjaGVja2VkPXshdGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsfSBvbkNoYW5nZT17dGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNofSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwgbGFiZWwtLXBvaW50ZXInIGh0bWxGb3I9J2Fub255bW91cy1yYWRpbyc+QW5vbnltb3VzPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J2Fub255bW91cy1vci1jaGFubmVsJyBpZD0nY2hhbm5lbC1yYWRpbycgY2xhc3NOYW1lPSdpbnB1dC1yYWRpbycgdmFsdWU9J2luIGEgY2hhbm5lbCcgY2hlY2tlZD17dGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsfSBvbkNoYW5nZT17dGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNofSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwgbGFiZWwtLXBvaW50ZXInIGh0bWxGb3I9J2NoYW5uZWwtcmFkaW8nPkluIGEgY2hhbm5lbDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmNoYW5uZWxFcnJvciA/IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5wcm9wcy5jaGFubmVsRXJyb3J9PC9wPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+UHVibGlzaCBhbm9ueW1vdXNseSBvciBpbiBhIGNoYW5uZWw8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICB7IHRoaXMucHJvcHMucHVibGlzaEluQ2hhbm5lbCAmJiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zJz5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbmFtZS1zZWxlY3QnPkNoYW5uZWw6PC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nY2hhbm5lbC1uYW1lLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdycgdmFsdWU9e3RoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb259PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICYmIDxvcHRpb24gdmFsdWU9e3RoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZX0gaWQ9J3B1Ymxpc2gtY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPnt0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWV9PC9vcHRpb24+IH1cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzdGF0ZXMuTE9HSU59PkV4aXN0aW5nPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c3RhdGVzLkNSRUFURX0+TmV3PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbCA9PT0gc3RhdGVzLkxPR0lOKSAmJiA8Q2hhbm5lbExvZ2luRm9ybSAvPiB9XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbCA9PT0gc3RhdGVzLkNSRUFURSkgJiYgPENoYW5uZWxDcmVhdGVGb3JtIC8+IH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbFNlbGVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY2xhc3MgQ2hhbm5lbExvZ2luRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3IgICA6IG51bGwsXG4gICAgICBuYW1lICAgIDogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9naW5Ub0NoYW5uZWwgPSB0aGlzLmxvZ2luVG9DaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1tuYW1lXTogdmFsdWV9KTtcbiAgfVxuICBsb2dpblRvQ2hhbm5lbCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZTogdGhpcy5zdGF0ZS5uYW1lLCBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZH0pLFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH07XG4gICAgcmVxdWVzdCgnbG9naW4nLCBwYXJhbXMpXG4gICAgICAudGhlbigoe3N1Y2Nlc3MsIGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihjaGFubmVsTmFtZSwgc2hvcnRDaGFubmVsSWQsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBtZXNzYWdlfSk7XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3J9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGZvcm0gaWQ9J2NoYW5uZWwtbG9naW4tZm9ybSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSc+XG4gICAgICAgICAgICAgIDxzcGFuPkA8L3NwYW4+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nY2hhbm5lbC1sb2dpbi1uYW1lLWlucHV0JyBjbGFzc05hbWU9J2lucHV0LXRleHQnIG5hbWU9J25hbWUnIHBsYWNlaG9sZGVyPSdZb3VyIENoYW5uZWwgTmFtZScgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1sb2dpbi1wYXNzd29yZC1pbnB1dCcgPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnknPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIGlkPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyBuYW1lPSdwYXNzd29yZCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBwbGFjZWhvbGRlcj0nJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsUGFzc3dvcmR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7IHRoaXMuc3RhdGUuZXJyb3IgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnN0YXRlLmVycm9yfTwvcD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+RW50ZXIgdGhlIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlJz5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmxvZ2luVG9DaGFubmVsfT5BdXRoZW50aWNhdGU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsTG9naW5Gb3JtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsQ3JlYXRlRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3IgICA6IG51bGwsXG4gICAgICBjaGFubmVsIDogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgICBzdGF0dXMgIDogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQ2hhbm5lbElucHV0ID0gdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlQ2hhbm5lbCA9IHRoaXMuY3JlYXRlQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGNsZWFuc2VDaGFubmVsSW5wdXQgKGlucHV0KSB7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMrL2csICctJyk7IC8vIHJlcGxhY2Ugc3BhY2VzIHdpdGggZGFzaGVzXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOS1dL2csICcnKTsgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgb3IgJy0nXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIGhhbmRsZUNoYW5uZWxJbnB1dCAoZXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmNsZWFuc2VDaGFubmVsSW5wdXQodmFsdWUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2NoYW5uZWw6IHZhbHVlfSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiAnUGxlYXNlIGVudGVyIGEgY2hhbm5lbCBuYW1lJ30pO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIHVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSAoY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxXaXRoQXRTeW1ib2wgPSBgQCR7Y2hhbm5lbH1gO1xuICAgIHJlcXVlc3QoYC9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvJHtjaGFubmVsV2l0aEF0U3ltYm9sfWApXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG51bGx9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgIH0pO1xuICB9XG4gIGNoZWNrSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmV0dXJuIHJlcXVlc3QoYC9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvJHtjaGFubmVsV2l0aEF0U3ltYm9sfWApO1xuICB9XG4gIGNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIChwYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXBhc3N3b3JkIHx8IHBhc3N3b3JkLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgcGFzc3dvcmQnKSk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbiAgbWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lLCBwYXNzd29yZH0pLFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3QoJy9zaWdudXAnLCBwYXJhbXMpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBVbmZvcnR1bmF0ZWx5LCB3ZSBlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBjcmVhdGluZyB5b3VyIGNoYW5uZWwuIFBsZWFzZSBsZXQgdXMga25vdyBpbiBEaXNjb3JkISAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBjcmVhdGVDaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jaGVja0lzUGFzc3dvcmRQcm92aWRlZCh0aGlzLnN0YXRlLnBhc3N3b3JkKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSh0aGlzLnN0YXRlLmNoYW5uZWwpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiAnV2UgYXJlIHB1Ymxpc2hpbmcgeW91ciBuZXcgY2hhbm5lbC4gIFNpdCB0aWdodC4uLid9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCh0aGlzLnN0YXRlLmNoYW5uZWwsIHRoaXMuc3RhdGUucGFzc3dvcmQpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogbnVsbH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKHJlc3VsdC5jaGFubmVsTmFtZSwgcmVzdWx0LnNob3J0Q2hhbm5lbElkLCByZXN1bHQuY2hhbm5lbENsYWltSWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvciwgc3RhdHVzOiBudWxsfSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7ICF0aGlzLnN0YXRlLnN0YXR1cyA/IChcbiAgICAgICAgICA8Zm9ybSBpZD0ncHVibGlzaC1jaGFubmVsLWZvcm0nPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtbmFtZSc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20gc3Bhbi0tcmVsYXRpdmUnPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBuYW1lPSdjaGFubmVsJyBpZD0nbmV3LWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBwbGFjZWhvbGRlcj0nZXhhbXBsZUNoYW5uZWxOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFubmVsSW5wdXR9IC8+XG4gICAgICAgICAgICAgICAgICB7ICh0aGlzLnN0YXRlLmNoYW5uZWwgJiYgIXRoaXMuc3RhdGUuZXJyb3IpICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLXN1Y2Nlc3Mgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxMyd9PC9zcGFuPiB9XG4gICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZXJyb3IgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzE2J308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J25ldy1jaGFubmVsLXBhc3N3b3JkJz5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnknPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBuYW1lPSdwYXNzd29yZCcgaWQ9J25ldy1jaGFubmVsLXBhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnICBwbGFjZWhvbGRlcj0nJyB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnN0YXRlLmVycm9yfTwvcD5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5DaG9vc2UgYSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5jcmVhdGVDaGFubmVsfT5DcmVhdGUgQ2hhbm5lbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPnt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxDcmVhdGVGb3JtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0tYWN0aXZlJz58IDwvc3Bhbj47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJbmFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0taW5hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluYWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y2xlYXJGaWxlfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzIDogcHVibGlzaC5zdGF0dXMuc3RhdHVzLFxuICAgIG1lc3NhZ2U6IHB1Ymxpc2guc3RhdHVzLm1lc3NhZ2UsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIGNsZWFyRmlsZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCAqIGFzIHB1Ymxpc2hTdGF0ZXMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2xhaW1fc3RhdGVzJztcblxuY2xhc3MgUHVibGlzaFN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIG1lc3NhZ2UsIGNsZWFyRmlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuTE9BRF9TVEFSVCAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5GaWxlIGlzIGxvYWRpbmcgdG8gc2VydmVyPC9wPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+MCU8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuTE9BRElORyAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgPHA+RmlsZSBpcyBsb2FkaW5nIHRvIHNlcnZlcjwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+e21lc3NhZ2V9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLlBVQkxJU0hJTkcgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+VXBsb2FkIGNvbXBsZXRlLiAgWW91ciBmaWxlIGlzIG5vdyBiZWluZyBwdWJsaXNoZWQgb24gdGhlIGJsb2NrY2hhaW4uLi48L3A+XG4gICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDxwPkN1cmlvdXMgd2hhdCBtYWdpYyBpcyBoYXBwZW5pbmcgaGVyZT8gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZmFxL3doYXQtaXMtbGJyeSc+TGVhcm4gbW9yZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLlNVQ0NFU1MgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+WW91ciBwdWJsaXNoIGlzIGNvbXBsZXRlISBZb3UgYXJlIGJlaW5nIHJlZGlyZWN0ZWQgdG8gaXQgbm93LjwvcD5cbiAgICAgICAgICA8cD5JZiB5b3UgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQsIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e21lc3NhZ2V9PmNsaWNrIGhlcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5GQUlMRUQgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+U29tZXRoaW5nIHdlbnQgd3JvbmcuLi48L3A+XG4gICAgICAgICAgPHA+PHN0cm9uZz57bWVzc2FnZX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgPHA+Rm9yIGhlbHAsIHBvc3QgdGhlIGFib3ZlIGVycm9yIHRleHQgaW4gdGhlICNzcGVlY2ggY2hhbm5lbCBvbiB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUycgdGFyZ2V0PSdfYmxhbmsnPmxicnkgZGlzY29yZDwvYT48L3A+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tc2Vjb25kYXJ5JyBvbkNsaWNrPXtjbGVhckZpbGV9PlJlc2V0PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoU3RhdHVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL3ZpZXcuanN4IiwiZXhwb3J0IGNvbnN0IExPQURfU1RBUlQgPSAnTE9BRF9TVEFSVCc7XG5leHBvcnQgY29uc3QgTE9BRElORyA9ICdMT0FESU5HJztcbmV4cG9ydCBjb25zdCBQVUJMSVNISU5HID0gJ1BVQkxJU0hJTkcnO1xuZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgRkFJTEVEID0gJ0ZBSUxFRCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMuanMiLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2U6IHB1Ymxpc2guZGlzYWJsZWRNZXNzYWdlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHVibGlzaERpc2FibGVkTWVzc2FnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMucHJvcHMubWVzc2FnZTtcbiAgICBjb25zb2xlLmxvZygndGhpcy5wcm9wcy5tZXNzYWdlOicsIG1lc3NhZ2UpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGRyb3B6b25lLS1kaXNhYmxlZCByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwIGNsYXNzTmFtZT0ndGV4dC0tZGlzYWJsZWQnPlB1Ymxpc2hpbmcgaXMgY3VycmVudGx5IGRpc2FibGVkLjwvcD5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LS1kaXNhYmxlZCc+e21lc3NhZ2V9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5cbmNsYXNzIEFib3V0UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnQWJvdXQnfSBwYWdlVXJpPXsnYWJvdXQnfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdwdWxsLXF1b3RlJz5TcGVlLmNoIGlzIGFuIG9wZW4tc291cmNlIHByb2plY3QuICBQbGVhc2UgY29udHJpYnV0ZSB0byB0aGUgZXhpc3Rpbmcgc2l0ZSwgb3IgZm9yayBpdCBhbmQgbWFrZSB5b3VyIG93bi48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vdHdpdHRlci5jb20vc3BlZV9jaCc+VFdJVFRFUjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+R0lUSFVCPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPkRJU0NPUkQgQ0hBTk5FTDwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9ibG9iL21hc3Rlci9SRUFETUUubWQnPkRPQ1VNRU5UQVRJT048L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgbWVkaWEtaG9zdGluZyBzaXRlIHRoYXQgcmVhZHMgZnJvbSBhbmQgcHVibGlzaGVzIGNvbnRlbnQgdG8gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvJz5MQlJZPC9hPiBibG9ja2NoYWluLjwvcD5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIGhvc3Rpbmcgc2VydmljZSwgYnV0IHdpdGggdGhlIGFkZGVkIGJlbmVmaXQgdGhhdCBpdCBzdG9yZXMgeW91ciBjb250ZW50IG9uIGEgZGVjZW50cmFsaXplZCBuZXR3b3JrIG9mIGNvbXB1dGVycyAtLSB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8vZ2V0Jz5MQlJZPC9hPiBuZXR3b3JrLiAgVGhpcyBtZWFucyB0aGF0IHlvdXIgaW1hZ2VzIGFyZSBzdG9yZWQgaW4gbXVsdGlwbGUgbG9jYXRpb25zIHdpdGhvdXQgYSBzaW5nbGUgcG9pbnQgb2YgZmFpbHVyZS48L3A+XG4gICAgICAgICAgICAgIDxoMz5Db250cmlidXRlPC9oMz5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IGhhdmUgYW4gaWRlYSBmb3IgeW91ciBvd24gc3BlZS5jaC1saWtlIHNpdGUgb24gdG9wIG9mIExCUlksIGZvcmsgb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5naXRodWIgcmVwbzwvYT4gYW5kIGdvIHRvIHRvd24hPC9wPlxuICAgICAgICAgICAgICA8cD5JZiB5b3Ugd2FudCB0byBpbXByb3ZlIHNwZWUuY2gsIGpvaW4gb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPmRpc2NvcmQgY2hhbm5lbDwvYT4gb3Igc29sdmUgb25lIG9mIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9pc3N1ZXMnPmdpdGh1YiBpc3N1ZXM8L2E+LjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvQWJvdXRQYWdlL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZTogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvTG9naW5QYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbExvZ2luRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0nO1xuaW1wb3J0IENoYW5uZWxDcmVhdGVGb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0nO1xuXG5jbGFzcyBMb2dpblBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIC8vIHJlLXJvdXRlIHRoZSB1c2VyIHRvIHRoZSBob21lcGFnZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICBpZiAobmV3UHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSAhPT0gdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2ApO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0xvZ2luJ30gcGFnZVVyaT17J2xvZ2luJ30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPkNoYW5uZWxzIGFsbG93IHlvdSB0byBwdWJsaXNoIGFuZCBncm91cCBjb250ZW50IHVuZGVyIGFuIGlkZW50aXR5LiBZb3UgY2FuIGNyZWF0ZSBhIGNoYW5uZWwgZm9yIHlvdXJzZWxmLCBvciBzaGFyZSBvbmUgd2l0aCBsaWtlLW1pbmRlZCBmcmllbmRzLiAgWW91IGNhbiBjcmVhdGUgMSBjaGFubmVsLCBvciAxMDAsIHNvIHdoZXRoZXIgeW91J3JlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0YWxvbmlhMjAxNzo0M2RjZjQ3MTYzY2FhMjFkODQwNGQ5ZmU5YjMwZjc4ZWYzZTE0NmE4Jz5kb2N1bWVudGluZyBpbXBvcnRhbnQgZXZlbnRzPC9hPiwgb3IgbWFraW5nIGEgcHVibGljIHJlcG9zaXRvcnkgZm9yIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0R2lmcyc+Y2F0IGdpZnM8L2E+IChwYXNzd29yZDogJzEyMzQnKSwgdHJ5IGNyZWF0aW5nIGEgY2hhbm5lbCBmb3IgaXQhPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5Mb2cgaW4gdG8gYW4gZXhpc3RpbmcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbExvZ2luRm9ybSAvPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5DcmVhdGUgYSBicmFuZCBuZXcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbENyZWF0ZUZvcm0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTG9naW5QYWdlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvTG9naW5QYWdlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZXJyb3IgICAgICA6IHNob3cucmVxdWVzdC5lcnJvcixcbiAgICByZXF1ZXN0VHlwZTogc2hvdy5yZXF1ZXN0LnR5cGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uSGFuZGxlU2hvd1BhZ2VVcmksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvU2hvd1BhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdjb21wb25lbnRzL0Vycm9yUGFnZSc7XG5pbXBvcnQgU2hvd0Fzc2V0TGl0ZSBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldExpdGUnO1xuaW1wb3J0IFNob3dBc3NldERldGFpbHMgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzJztcbmltcG9ydCBTaG93Q2hhbm5lbCBmcm9tICdjb250YWluZXJzL1Nob3dDaGFubmVsJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG5jbGFzcyBTaG93UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMubWF0Y2gucGFyYW1zICE9PSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcykge1xuICAgICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHJlcXVlc3RUeXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEVycm9yUGFnZSBlcnJvcj17ZXJyb3J9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBzd2l0Y2ggKHJlcXVlc3RUeXBlKSB7XG4gICAgICBjYXNlIENIQU5ORUw6XG4gICAgICAgIHJldHVybiA8U2hvd0NoYW5uZWwgLz47XG4gICAgICBjYXNlIEFTU0VUX0xJVEU6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0TGl0ZSAvPjtcbiAgICAgIGNhc2UgQVNTRVRfREVUQUlMUzpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXREZXRhaWxzIC8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxwPmxvYWRpbmcuLi48L3A+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd1BhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1Nob3dQYWdlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5cbmNsYXNzIFNob3dMaXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGE7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyIHNob3ctbGl0ZS1jb250YWluZXInPlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgIDxMaW5rIGlkPSdhc3NldC1ib2lsZXJwYXRlJyBjbGFzc05hbWU9J2xpbmstLXByaW1hcnkgZmluZS1wcmludCcgdG89e2AvJHtjbGFpbUlkfS8ke25hbWV9YH0+aG9zdGVkXG4gICAgICAgICAgICB2aWEgU3BlZS5jaDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwPmxvYWRpbmcgYXNzZXQgZGF0YS4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dMaXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBVTkFWQUlMQUJMRSwgRVJST1IsIEFWQUlMQUJMRSB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNsYXNzIEFzc2V0RGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uRmlsZVJlcXVlc3QobmFtZSwgY2xhaW1JZCk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1cywgZXJyb3IsIGFzc2V0OiB7IGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBjb250ZW50VHlwZSwgZmlsZUV4dCwgdGh1bWJuYWlsIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0nYXNzZXQtZGlzcGxheS1jb21wb25lbnQnPlxuICAgICAgICB7KHN0YXR1cyA9PT0gTE9DQUxfQ0hFQ0spICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+Q2hlY2tpbmcgdG8gc2VlIGlmIFNwZWUuY2ggaGFzIHlvdXIgYXNzZXQgbG9jYWxseS4uLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IFVOQVZBSUxBQkxFKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPlNpdCB0aWdodCwgd2UncmUgc2VhcmNoaW5nIHRoZSBMQlJZIGJsb2NrY2hhaW4gZm9yIHlvdXIgYXNzZXQhPC9wPlxuICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8cD5DdXJpb3VzIHdoYXQgbWFnaWMgaXMgaGFwcGVuaW5nIGhlcmU/IDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2ZhcS93aGF0LWlzLWxicnknPkxlYXJuIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEVSUk9SKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPlVuZm9ydHVuYXRlbHksIHdlIGNvdWxkbid0IGRvd25sb2FkIHlvdXIgYXNzZXQgZnJvbSBMQlJZLiAgWW91IGNhbiBoZWxwIHVzIG91dCBieSBzaGFyaW5nIHRoZSBiZWxvdyBlcnJvciBtZXNzYWdlIGluIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJyB0YXJnZXQ9J19ibGFuayc+TEJSWSBkaXNjb3JkPC9hPi48L3A+XG4gICAgICAgICAgPGk+PHAgaWQ9J2Vycm9yLW1lc3NhZ2UnPntlcnJvcn08L3A+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gQVZBSUxBQkxFKSAmJlxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9IC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx2aWRlbyBjbGFzc05hbWU9J2Fzc2V0IHZpZGVvJyBjb250cm9scyBwb3N0ZXI9e3RodW1ibmFpbH0+XG4gICAgICAgICAgICAgICAgICA8c291cmNlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHA+WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIDxjb2RlPnZpZGVvPC9jb2RlPiBlbGVtZW50LjwvcD5cbiAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cD5VbnN1cHBvcnRlZCBmaWxlIHR5cGU8L3A+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0RGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ2NvbXBvbmVudHMvRXJyb3JQYWdlJztcbmltcG9ydCBBc3NldFRpdGxlIGZyb20gJ2NvbnRhaW5lcnMvQXNzZXRUaXRsZSc7XG5pbXBvcnQgQXNzZXREaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5JztcbmltcG9ydCBBc3NldEluZm8gZnJvbSAnY29udGFpbmVycy9Bc3NldEluZm8nO1xuXG5jbGFzcyBTaG93QXNzZXREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBjbGFpbURhdGE6IHsgbmFtZSB9IH0gPSBhc3NldDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e2Ake25hbWV9IC0gZGV0YWlsc2B9IGFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPEFzc2V0VGl0bGUgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHNob3ctZGV0YWlscy1jb250YWluZXInPlxuICAgICAgICAgICAgICAgIDxBc3NldERpc3BsYXkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgICAgIDxBc3NldEluZm8gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGFzc2V0IGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dBc3NldERldGFpbHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGE6IHsgdGl0bGUgfSB9ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0Fzc2V0VGl0bGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBc3NldFRpdGxlID0gKHsgdGl0bGUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtLWxhcmdlJz57dGl0bGV9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRUaXRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgYXNzZXRcbiAgY29uc3QgYXNzZXQgPSBzZWxlY3RBc3NldChzaG93KTtcbiAgLy8gIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBBc3NldEluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jb3B5VG9DbGlwYm9hcmQgPSB0aGlzLmNvcHlUb0NsaXBib2FyZC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvcHlUb0NsaXBib2FyZCAoZXZlbnQpIHtcbiAgICB2YXIgZWxlbWVudFRvQ29weSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmVsZW1lbnR0b2NvcHk7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Db3B5KTtcbiAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdPb3BzLCB1bmFibGUgdG8gY29weSd9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IHNob3J0SWQsIGNsYWltRGF0YSA6IHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIGRlc2NyaXB0aW9uLCBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsLCBob3N0IH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2NoYW5uZWxOYW1lICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkNoYW5uZWw6PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+PExpbmsgdG89e2AvJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfWB9PntjaGFubmVsTmFtZX08L0xpbms+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIHtkZXNjcmlwdGlvbiAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz57ZGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hhcmUtYnV0dG9ucyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPlNoYXJlOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20gZmxleC1jb250YWluZXItLXdyYXAnPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHdpdHRlcjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT5mYWNlYm9vazwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cDovL3R1bWJsci5jb20vd2lkZ2V0cy9zaGFyZS90b29sP2Nhbm9uaWNhbFVybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR1bWJscjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zdWJtaXQ/dXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9JnRpdGxlPSR7bmFtZX1gfT5yZWRkaXQ8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LXNob3J0LWxpbmsnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkxpbms6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktc2hvcnQtbGluaycgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3Nob3J0LWxpbmsnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgJHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J3Nob3J0LWxpbmsnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctZW1iZWQtY29kZSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+RW1iZWQ6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktZW1iZWQtdGV4dCcgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7KGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JykgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDx2aWRlbyB3aWR0aD1cIjEwMCVcIiBjb250cm9scyBwb3N0ZXI9XCIke3RodW1ibmFpbH1cIiBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPjwvdmlkZW8+YH0gLz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDxpbWcgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz5gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdlbWJlZC10ZXh0J1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSc+XG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0bz17YC8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9PjxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9J3RleHQnPkRpcmVjdCBMaW5rPC9zcGFuPjwvTGluaz5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9e2Ake2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0gZG93bmxvYWQ9e25hbWV9PkRvd25sb2FkPC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9kbWNhJz5SZXBvcnQ8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldEluZm87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0Fzc2V0SW5mby92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCByZXF1ZXN0XG4gIGNvbnN0IHByZXZpb3VzUmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICAvLyBzZWxlY3QgY2hhbm5lbFxuICBsZXQgY2hhbm5lbDtcbiAgaWYgKHByZXZpb3VzUmVxdWVzdCkge1xuICAgIGNvbnN0IGNoYW5uZWxLZXkgPSBwcmV2aW91c1JlcXVlc3Qua2V5O1xuICAgIGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9TaG93Q2hhbm5lbC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAnY29tcG9uZW50cy9FcnJvclBhZ2UnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheSc7XG5cbmNsYXNzIFNob3dDaGFubmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbG9uZ0lkLCBzaG9ydElkIH0gPSBjaGFubmVsO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gY2hhbm5lbD17Y2hhbm5lbH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPGgyPmNoYW5uZWwgbmFtZToge25hbWV9PC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PmZ1bGwgY2hhbm5lbCBpZDoge2xvbmdJZH08L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17J2ZpbmUtcHJpbnQnfT5zaG9ydCBjaGFubmVsIGlkOiB7c2hvcnRJZH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ2xhaW1zRGlzcGxheSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBjaGFubmVsIGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dDaGFubmVsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9TaG93Q2hhbm5lbC92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvblVwZGF0ZUNoYW5uZWxDbGFpbXMgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGtleVxuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtzaG93LnJlcXVlc3QuaWRdO1xuICBjb25zdCBjaGFubmVsS2V5ID0gcmVxdWVzdC5rZXk7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGNsYWltc1xuICBjb25zdCBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsS2V5LFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uVXBkYXRlQ2hhbm5lbENsYWltcyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXNzZXRQcmV2aWV3IGZyb20gJ2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3JztcblxuY2xhc3MgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlID0gdGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgfVxuICBzaG93UHJldmlvdXNSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKSAtIDE7XG4gICAgdGhpcy5zaG93TmV3UGFnZShwcmV2aW91c1BhZ2UpO1xuICB9XG4gIHNob3dOZXh0UmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKSArIDE7XG4gICAgdGhpcy5zaG93TmV3UGFnZShuZXh0UGFnZSk7XG4gIH1cbiAgc2hvd05ld1BhZ2UgKHBhZ2UpIHtcbiAgICBjb25zdCB7IGNoYW5uZWxLZXksIGNoYW5uZWw6IHsgbmFtZSwgbG9uZ0lkIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vblVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGNsYWltcywgY3VycmVudFBhZ2UsIHRvdGFsUGFnZXMgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCc+XG4gICAgICAgIHsoY2xhaW1zLmxlbmd0aCA+IDApID8gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7Y2xhaW1zLm1hcCgoY2xhaW0sIGluZGV4KSA9PiA8QXNzZXRQcmV2aWV3XG4gICAgICAgICAgICAgIGNsYWltRGF0YT17Y2xhaW19XG4gICAgICAgICAgICAgIGtleT17YCR7Y2xhaW0ubmFtZX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgLz4pfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgeyhjdXJyZW50UGFnZSA+IDEpICYmXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnYnV0dG9uLS1zZWNvbmRhcnknfSBvbkNsaWNrPXt0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlfT5QcmV2aW91cyBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgeyhjdXJyZW50UGFnZSA8IHRvdGFsUGFnZXMpICYmXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnYnV0dG9uLS1zZWNvbmRhcnknfSBvbkNsaWNrPXt0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2V9Pk5leHQgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cD5UaGVyZSBhcmUgbm8gY2xhaW1zIGluIHRoaXMgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxDbGFpbXNEaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoe3NpdGU6IHtkZWZhdWx0czogeyBkZWZhdWx0VGh1bWJuYWlsIH19fSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNvbnN0IEFzc2V0UHJldmlldyA9ICh7IGRlZmF1bHRUaHVtYm5haWwsIGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsIH0gfSkgPT4ge1xuICBjb25zdCBkaXJlY3RTb3VyY2VMaW5rID0gYCR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YDtcbiAgY29uc3Qgc2hvd1VybExpbmsgPSBgLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2Fzc2V0LWhvbGRlcic+XG4gICAgICA8TGluayB0bz17c2hvd1VybExpbmt9ID5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e2RpcmVjdFNvdXJjZUxpbmt9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyB2aWRlbyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e3RodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPnVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCl9XG4gICAgICA8L0xpbms+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaXRlOiB7IGhvc3QsIHRpdGxlIH0gfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY2xhc3MgRm91ck9oRm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3RpdGxlLCBob3N0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgPHRpdGxlPnt0aXRsZX0gLSA0MDQ8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD0nY2Fub25pY2FsJyBocmVmPXtgJHtob3N0fS80MDRgfSAvPlxuICAgICAgICA8L0hlbG1ldD5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8aDI+NDA0PC9oMj5cbiAgICAgICAgICA8cD5UaGF0IHBhZ2UgZG9lcyBub3QgZXhpc3Q8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRm91ck9oRm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7IGRldGVybWluZVJlc3BvbnNlVHlwZSwgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSwgbG9nUmVxdWVzdERhdGEsIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIHRvIHNlcnZlIGEgc3BlY2lmaWMgYXNzZXQgdXNpbmcgdGhlIGNoYW5uZWwgb3IgY2xhaW0gaWRcbiAgYXBwLmdldCgnLzppZGVudGlmaWVyLzpjbGFpbScsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICAgIHRyeSB7XG4gICAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICAgIH1cbiAgICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAgIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICAgIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgICBsZXQgY2xhaW1OYW1lO1xuICAgIHRyeSB7XG4gICAgICAoeyBjbGFpbU5hbWUgfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSB0aGUgaWRlbnRpZmllclxuICAgIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZDtcbiAgICB0cnkge1xuICAgICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKHBhcmFtcy5pZGVudGlmaWVyKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgaWYgKCFpc0NoYW5uZWwpIHtcbiAgICAgIFtjbGFpbUlkLCBjbGFpbU5hbWVdID0gZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eShjbGFpbUlkLCBjbGFpbU5hbWUpO1xuICAgIH1cbiAgICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gICAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKTtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzZXJ2ZSB0aGUgd2lubmluZyBhc3NldCBhdCBhIGNsYWltIG9yIGEgY2hhbm5lbCBwYWdlXG4gIGFwcC5nZXQoJy86Y2xhaW0nLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gICAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgICB0cnkge1xuICAgICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gICAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgLy8gcGFyc2UgdGhlIGNsYWltXG4gICAgbGV0IGNsYWltTmFtZTtcbiAgICB0cnkge1xuICAgICAgKHtjbGFpbU5hbWV9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgbnVsbCwgbnVsbCk7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChudWxsLCBudWxsLCBjbGFpbU5hbWUsIG51bGwsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcm91dGVzL3NlcnZlLXJvdXRlcy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZ2V0Q2xhaW1JZCwgZ2V0TG9jYWxGaWxlUmVjb3JkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcbmNvbnN0IFNIT1cgPSAnU0hPVyc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxuZnVuY3Rpb24gY2xpZW50QWNjZXB0c0h0bWwgKHthY2NlcHR9KSB7XG4gIHJldHVybiBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdElzRnJvbUJyb3dzZXIgKGhlYWRlcnMpIHtcbiAgcmV0dXJuIGhlYWRlcnNbJ3VzZXItYWdlbnQnXSAmJiBoZWFkZXJzWyd1c2VyLWFnZW50J10ubWF0Y2goL01vemlsbGEvKTtcbn07XG5cbmZ1bmN0aW9uIGNsaWVudFdhbnRzQXNzZXQgKHthY2NlcHQsIHJhbmdlfSkge1xuICBjb25zdCBpbWFnZUlzV2FudGVkID0gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvaW1hZ2VcXC8uKi8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL1xcKi8pO1xuICBjb25zdCB2aWRlb0lzV2FudGVkID0gYWNjZXB0ICYmIHJhbmdlO1xuICByZXR1cm4gaW1hZ2VJc1dhbnRlZCB8fCB2aWRlb0lzV2FudGVkO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZENsYWltSWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuICgoY2xhaW1JZC5sZW5ndGggPT09IDQwKSAmJiAhL1teQS1aYS16MC05XS9nLnRlc3QoY2xhaW1JZCkpO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuIGNsYWltSWQubGVuZ3RoID09PSAxOyAgLy8gaXQgc2hvdWxkIHJlYWxseSBldmFsdWF0ZSB0aGUgc2hvcnQgdXJsIGl0c2VsZlxufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWRPckNsYWltSWQgKGlucHV0KSB7XG4gIHJldHVybiAoaXNWYWxpZENsYWltSWQoaW5wdXQpIHx8IGlzVmFsaWRTaG9ydElkKGlucHV0KSk7XG59O1xuXG5mdW5jdGlvbiBzZXJ2ZUFzc2V0VG9DbGllbnQgKGNsYWltSWQsIG5hbWUsIHJlcykge1xuICByZXR1cm4gZ2V0TG9jYWxGaWxlUmVjb3JkKGNsYWltSWQsIG5hbWUpXG4gICAgLnRoZW4oZmlsZVJlY29yZCA9PiB7XG4gICAgICAvLyBjaGVjayB0aGF0IGEgbG9jYWwgcmVjb3JkIHdhcyBmb3VuZFxuICAgICAgaWYgKGZpbGVSZWNvcmQgPT09IE5PX0ZJTEUpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMzA3KS5yZWRpcmVjdChgL2FwaS9jbGFpbS9nZXQvJHtuYW1lfS8ke2NsYWltSWR9YCk7XG4gICAgICB9XG4gICAgICAvLyBzZXJ2ZSB0aGUgZmlsZVxuICAgICAgY29uc3Qge2ZpbGVQYXRoLCBmaWxlVHlwZX0gPSBmaWxlUmVjb3JkO1xuICAgICAgbG9nZ2VyLnZlcmJvc2UoYHNlcnZpbmcgZmlsZTogJHtmaWxlUGF0aH1gKTtcbiAgICAgIGNvbnN0IHNlbmRGaWxlT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnICAgICAgICAgIDogZmlsZVR5cGUgfHwgJ2ltYWdlL2pwZWcnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kRmlsZShmaWxlUGF0aCwgc2VuZEZpbGVPcHRpb25zKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKSB7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oZnVsbENsYWltSWQgPT4ge1xuICAgICAgICBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9IGVsc2UgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNoYW5uZWwgaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmVBc3NldFRvQ2xpZW50KGZ1bGxDbGFpbUlkLCBjbGFpbU5hbWUsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnc3VjY2VzcycpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdmYWlsJyk7XG4gICAgICB9KTtcbiAgfSxcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIChoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlVHlwZTtcbiAgICBpZiAoaGFzRmlsZUV4dGVuc2lvbikge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7ICAvLyBhc3N1bWUgYSBzZXJ2ZSByZXF1ZXN0IGlmIGZpbGUgZXh0ZW5zaW9uIGlzIHByZXNlbnRcbiAgICAgIGlmIChjbGllbnRBY2NlcHRzSHRtbChoZWFkZXJzKSkgeyAgLy8gaWYgdGhlIHJlcXVlc3QgY29tZXMgZnJvbSBhIGJyb3dzZXIsIGNoYW5nZSBpdCB0byBhIHNob3cgcmVxdWVzdFxuICAgICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgaWYgKGNsaWVudFdhbnRzQXNzZXQoaGVhZGVycykgJiYgcmVxdWVzdElzRnJvbUJyb3dzZXIoaGVhZGVycykpIHsgIC8vIHRoaXMgaXMgaW4gY2FzZSBzb21lb25lIGVtYmVkcyBhIHNob3cgdXJsXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnU2hvdyByZXF1ZXN0IGNhbWUgZnJvbSBicm93c2VyIGJ1dCB3YW50cyBhbiBpbWFnZS92aWRlby4gQ2hhbmdpbmcgcmVzcG9uc2UgdG8gc2VydmUuLi4nKTtcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZVR5cGU7XG4gIH0sXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkgKGlkZW50aWZpZXIsIG5hbWUpIHtcbiAgICAvLyB0aGlzIGlzIGEgcGF0Y2ggZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5IHdpdGggJy9uYW1lL2NsYWltX2lkJyB1cmwgZm9ybWF0XG4gICAgaWYgKGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKG5hbWUpICYmICFpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChpZGVudGlmaWVyKSkge1xuICAgICAgY29uc3QgdGVtcE5hbWUgPSBuYW1lO1xuICAgICAgbmFtZSA9IGlkZW50aWZpZXI7XG4gICAgICBpZGVudGlmaWVyID0gdGVtcE5hbWU7XG4gICAgfVxuICAgIHJldHVybiBbaWRlbnRpZmllciwgbmFtZV07XG4gIH0sXG4gIGxvZ1JlcXVlc3REYXRhIChyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3Jlc3BvbnNlVHlwZSA9PT0nLCByZXNwb25zZVR5cGUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gbmFtZSA9PT0gJywgY2xhaW1OYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgbmFtZSA9PT0nLCBjaGFubmVsTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBpZCA9PT0nLCBjbGFpbUlkKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBpZGVudGlmaWVyOicsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHt2YWx1ZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciB1cmwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwgbmFtZSBhZnRlciBALicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltSWQsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG5hbWU6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgLicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yICR7bW9kaWZpZXJTZXBlcmF0b3J9LmApO1xuICAgICAgfVxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHttb2RpZmllclNlcGVyYXRvcn0gbW9kaWZpZXIgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZWApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VNb2RpZmllcjogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG1vZGlmaWVyOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb24gPSBmYWxzZTtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbixcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvbGJyeVVyaS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJy4uL3JlYWN0L3JlZHVjZXJzJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICcuLi9yZWFjdC9jb250YWluZXJzL0dBTGlzdGVuZXInO1xuaW1wb3J0IEFwcCBmcm9tICcuLi9yZWFjdC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UnO1xuaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHsgY2FsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBoYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uL3JlYWN0L3NhZ2FzL3Nob3dfdXJpJztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi9yZWFjdC9hY3Rpb25zL3Nob3cnO1xuXG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHJldHVyblNhZ2FXaXRoUGFyYW1zID0gKHNhZ2EsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKiAoKSB7XG4gICAgeWllbGQgY2FsbChzYWdhLCBwYXJhbXMpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBvbkhhbmRsZVNob3dQYWdlVXJpKHJlcS5wYXJhbXMpO1xuICBjb25zdCBzYWdhID0gcmV0dXJuU2FnYVdpdGhQYXJhbXMoaGFuZGxlU2hvd1BhZ2VVcmksIGFjdGlvbik7XG5cbiAgLy8gcnVuIHRoZSBzYWdhIG1pZGRsZXdhcmVcbiAgc2FnYU1pZGRsZXdhcmVcbiAgICAucnVuKHNhZ2EpXG4gICAgLmRvbmVcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBvblJlcXVlc3RFcnJvciwgb25OZXdDaGFubmVsUmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgbmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19hc3NldCc7XG5pbXBvcnQgeyBuZXdDaGFubmVsUmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfY2hhbm5lbCc7XG5pbXBvcnQgbGJyeVVyaSBmcm9tICd1dGlscy9sYnJ5VXJpJztcblxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSAobW9kaWZpZXIsIGNsYWltKSB7XG4gIC8vIHRoaXMgaXMgYSByZXF1ZXN0IGZvciBhbiBhc3NldFxuICAvLyBjbGFpbSB3aWxsIGJlIGFuIGFzc2V0IGNsYWltXG4gIC8vIHRoZSBpZGVudGlmaWVyIGNvdWxkIGJlIGEgY2hhbm5lbCBvciBhIGNsYWltIGlkXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCwgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKG1vZGlmaWVyKSk7XG4gICAgKHsgY2xhaW1OYW1lLCBleHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBleHRlbnNpb24pKTtcbiAgfTtcbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgY2xhaW1JZCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IChjbGFpbSkge1xuICAvLyB0aGlzIGNvdWxkIGJlIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXQgb3IgYSBjaGFubmVsIHBhZ2VcbiAgLy8gY2xhaW0gY291bGQgYmUgYW4gYXNzZXQgY2xhaW0gb3IgYSBjaGFubmVsIGNsYWltXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIoY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICAvLyByZXR1cm4gZWFybHkgaWYgdGhpcyByZXF1ZXN0IGlzIGZvciBhIGNoYW5uZWxcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0NoYW5uZWxSZXF1ZXN0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkpO1xuICB9XG4gIC8vIGlmIG5vdCBmb3IgYSBjaGFubmVsLCBwYXJzZSB0aGUgY2xhaW0gcmVxdWVzdFxuICBsZXQgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWUsIGV4dGVuc2lvbn0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogaGFuZGxlU2hvd1BhZ2VVcmkgKGFjdGlvbikge1xuICBjb25zdCB7IGlkZW50aWZpZXIsIGNsYWltIH0gPSBhY3Rpb24uZGF0YTtcbiAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSwgaWRlbnRpZmllciwgY2xhaW0pO1xuICB9XG4gIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVDbGFpbU9ubHksIGNsYWltKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoSGFuZGxlU2hvd1BhZ2VVcmkgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLCBoYW5kbGVTaG93UGFnZVVyaSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3Qvc2FnYXMvc2hvd191cmkuanMiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgYWRkQXNzZXRUb0Fzc2V0TGlzdCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRMb25nQ2xhaW1JZCwgZ2V0U2hvcnRJZCwgZ2V0Q2xhaW1EYXRhIH0gZnJvbSAnYXBpL2Fzc2V0QXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3QXNzZXRSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBuYW1lLCBtb2RpZmllciB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgbG9uZyBpZCAmJiBhZGQgcmVxdWVzdCB0byByZXF1ZXN0IGxpc3RcbiAgbGV0IGxvbmdJZDtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGxvbmdJZH0gPSB5aWVsZCBjYWxsKGdldExvbmdDbGFpbUlkLCBuYW1lLCBtb2RpZmllcikpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIGNvbnN0IGFzc2V0S2V5ID0gYGEjJHtuYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBhc3NldEtleSkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIGFzc2V0P1xuICAvLyBJZiB0aGlzIGFzc2V0IGlzIGluIHRoZSBhc3NldCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGlmIChzdGF0ZS5hc3NldExpc3RbYXNzZXRLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IHNob3J0IElkXG4gIGxldCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7ZGF0YTogc2hvcnRJZH0gPSB5aWVsZCBjYWxsKGdldFNob3J0SWQsIG5hbWUsIGxvbmdJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIGdldCBhc3NldCBjbGFpbSBkYXRhXG4gIGxldCBjbGFpbURhdGE7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBjbGFpbURhdGF9ID0geWllbGQgY2FsbChnZXRDbGFpbURhdGEsIG5hbWUsIGxvbmdJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIGFkZCBhc3NldCB0byBhc3NldCBsaXN0XG4gIHlpZWxkIHB1dChhZGRBc3NldFRvQXNzZXRMaXN0KGFzc2V0S2V5LCBudWxsLCBuYW1lLCBsb25nSWQsIHNob3J0SWQsIGNsYWltRGF0YSkpO1xuICAvLyBjbGVhciBhbnkgZXJyb3JzIGluIHJlcXVlc3QgZXJyb3JcbiAgeWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKG51bGwpKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3QXNzZXRSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLCBuZXdBc3NldFJlcXVlc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcbmNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb25nQ2xhaW1JZCAobmFtZSwgbW9kaWZpZXIpIHtcbiAgbGV0IGJvZHkgPSB7fTtcbiAgLy8gY3JlYXRlIHJlcXVlc3QgcGFyYW1zXG4gIGlmIChtb2RpZmllcikge1xuICAgIGlmIChtb2RpZmllci5pZCkge1xuICAgICAgYm9keVsnY2xhaW1JZCddID0gbW9kaWZpZXIuaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlbJ2NoYW5uZWxOYW1lJ10gPSBtb2RpZmllci5jaGFubmVsLm5hbWU7XG4gICAgICBib2R5WydjaGFubmVsQ2xhaW1JZCddID0gbW9kaWZpZXIuY2hhbm5lbC5pZDtcbiAgICB9XG4gIH1cbiAgYm9keVsnY2xhaW1OYW1lJ10gPSBuYW1lO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICB9O1xuICAvLyBjcmVhdGUgdXJsXG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9sb25nLWlkYDtcbiAgLy8gcmV0dXJuIHRoZSByZXF1ZXN0IHByb21pc2VcbiAgcmV0dXJuIFJlcXVlc3QodXJsLCBwYXJhbXMpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNob3J0SWQgKG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL3Nob3J0LWlkLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhaW1EYXRhIChuYW1lLCBjbGFpbUlkKSB7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9kYXRhLyR7bmFtZX0vJHtjbGFpbUlkfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvYXBpL2Fzc2V0QXBpLmpzIiwiaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0LCBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgdXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDaGFubmVsRGF0YSB9IGZyb20gJ2FwaS9jaGFubmVsQXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3Q2hhbm5lbFJlcXVlc3QgKGFjdGlvbikge1xuICBjb25zdCB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQgfSA9IGFjdGlvbi5kYXRhO1xuICAvLyBwdXQgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBpbiByZWR1eFxuICB5aWVsZCBwdXQob25SZXF1ZXN0VXBkYXRlKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyByZXF1ZXN0P1xuICAvLyBJZiB0aGlzIHVyaSBpcyBpbiB0aGUgcmVxdWVzdCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGNvbnN0IHN0YXRlID0geWllbGQgc2VsZWN0KHNlbGVjdFNob3dTdGF0ZSk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgbG9uZyBpZFxuICBsZXQgbG9uZ0lkLCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7IGRhdGE6IHtsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdJZCwgc2hvcnRDaGFubmVsQ2xhaW1JZDogc2hvcnRJZH0gfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbERhdGEsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgcmVxdWVzdCBpbiB0aGUgY2hhbm5lbCByZXF1ZXN0cyBsaXN0XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSBgYyMke2NoYW5uZWxOYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBjaGFubmVsS2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgY2hhbm5lbD9cbiAgLy8gSWYgdGhpcyBjaGFubmVsIGlzIGluIHRoZSBjaGFubmVsIGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgY2xhaW1zIGRhdGFcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBjaGFubmVsTmFtZSwgbG9uZ0lkLCAxKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gc3RvcmUgdGhlIGNoYW5uZWwgZGF0YSBpbiB0aGUgY2hhbm5lbCBsaXN0XG4gIHlpZWxkIHB1dChhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdChjaGFubmVsS2V5LCBjaGFubmVsTmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSk7XG4gIC8vIGNsZWFyIGFueSByZXF1ZXN0IGVycm9yc1xuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsIG5ld0NoYW5uZWxSZXF1ZXN0KTtcbn07XG5cbmZ1bmN0aW9uICogZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlIH0gPSBhY3Rpb24uZGF0YTtcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBuYW1lLCBsb25nSWQsIHBhZ2UpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBwdXQodXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBjbGFpbXNEYXRhKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsIGdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3Qvc2FnYXMvc2hvd19jaGFubmVsLmpzIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5jb25zdCB7IGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbERhdGEgKG5hbWUsIGlkKSB7XG4gIGlmICghaWQpIGlkID0gJ25vbmUnO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9kYXRhLyR7bmFtZX0vJHtpZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxDbGFpbXMgKG5hbWUsIGxvbmdJZCwgcGFnZSkge1xuICBpZiAoIXBhZ2UpIHBhZ2UgPSAxO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9jbGFpbXMvJHtuYW1lfS8ke2xvbmdJZH0vJHtwYWdlfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvYXBpL2NoYW5uZWxBcGkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgaXNDaGFubmVsID0gdmFsdWUuc3RhcnRzV2l0aChtb2R1bGUuZXhwb3J0cy5DSEFOTkVMX0NIQVIpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gaXNDaGFubmVsID8gdmFsdWUgOiBudWxsO1xuICAgIGxldCBjbGFpbUlkO1xuICAgIGlmIChpc0NoYW5uZWwpIHtcbiAgICAgIGlmICghY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVjayB5b3VyIFVSTC4gIE5vIGNoYW5uZWwgbmFtZSBhZnRlciBcIkBcIi4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjaGFubmVsTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCk7XG4gICAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYWltSWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBjaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiBjaGFubmVsQ2xhaW1JZCB8fCBudWxsLFxuICAgICAgY2xhaW1JZCAgICAgICA6IGNsYWltSWQgfHwgbnVsbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IGV4dGVuc2lvbilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBleHRlbnNpb24gc2VwYXJhdG9yLCBleHRlbnNpb24gKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgZXh0ZW5zaW9uU2VwZXJhdG9yLCBleHRlbnNpb25dID0gY29tcG9uZW50c1JlZ2V4IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKG5hbWUpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghY2xhaW1OYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIuXCInKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNsYWltTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0xBSU0pO1xuICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogXCIke25hbWVCYWRDaGFycy5qb2luKCcsICcpfVwiLmApO1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBleHRlbnNpb25cbiAgICBpZiAoZXh0ZW5zaW9uU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIuYCk7XG4gICAgICB9XG4gICAgICBpZiAoZXh0ZW5zaW9uU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7ZXh0ZW5zaW9uU2VwZXJhdG9yfVwiIHNlcGFyYXRvciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY2xhaW1OYW1lLFxuICAgICAgZXh0ZW5zaW9uOiBleHRlbnNpb24gfHwgbnVsbCxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L3V0aWxzL2xicnlVcmkuanMiLCJjb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnLi4vaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcCA9PiB7XG4gIC8vIGEgY2F0Y2gtYWxsIHJvdXRlIGlmIHNvbWVvbmUgdmlzaXRzIGEgcGFnZSB0aGF0IGRvZXMgbm90IGV4aXN0XG4gIGFwcC51c2UoJyonLCAocmVxLCByZXMpID0+IHtcbiAgICAvLyBzZW5kIHJlc3BvbnNlXG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JvdXRlcy9mYWxsYmFjay1yb3V0ZXMuanMiXSwic291cmNlUm9vdCI6IiJ9