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

var _view = __webpack_require__(93);

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

var _view = __webpack_require__(89);

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

var _ActiveStatusBar = __webpack_require__(118);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(119);

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

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(86);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var googleAnalyticsId = _ref.site.googleAnalyticsId;

  return {
    googleAnalyticsId: googleAnalyticsId
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

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

var _HomePage = __webpack_require__(88);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _AboutPage = __webpack_require__(125);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _LoginPage = __webpack_require__(126);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(128);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(145);

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

var _view = __webpack_require__(99);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(19);

var _view = __webpack_require__(117);

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

var _view = __webpack_require__(132);

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
    __webpack_require__(147)(app);
    __webpack_require__(158)(app);

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactGa = __webpack_require__(87);

var _reactGa2 = _interopRequireDefault(_reactGa);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      // initiate analytics
      var googleAnalyticsId = this.props.googleAnalyticsId;

      _reactGa2.default.initialize(googleAnalyticsId);
      // return children
      return this.props.children;
    }
  }]);

  return GAListener;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(GAListener);

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

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

var _SEO = __webpack_require__(9);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _PublishTool = __webpack_require__(97);

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
/* 89 */
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

var _pageTitle = __webpack_require__(90);

var _metaTags = __webpack_require__(91);

var _canonicalLink = __webpack_require__(92);

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
/* 90 */
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
/* 91 */
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
/* 92 */
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

var _Logo = __webpack_require__(94);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(95);

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
/* 94 */
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
/* 95 */
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

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(98);

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
/* 98 */
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

var _PublishDetails = __webpack_require__(102);

var _PublishDetails2 = _interopRequireDefault(_PublishDetails);

var _PublishStatus = __webpack_require__(120);

var _PublishStatus2 = _interopRequireDefault(_PublishStatus);

var _PublishDisabledMessage = __webpack_require__(123);

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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _file = __webpack_require__(100);

var _PublishPreview = __webpack_require__(101);

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
/* 100 */
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
/* 101 */
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(103);

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
/* 103 */
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

var _PublishTitleInput = __webpack_require__(104);

var _PublishTitleInput2 = _interopRequireDefault(_PublishTitleInput);

var _PublishUrlInput = __webpack_require__(106);

var _PublishUrlInput2 = _interopRequireDefault(_PublishUrlInput);

var _PublishThumbnailInput = __webpack_require__(109);

var _PublishThumbnailInput2 = _interopRequireDefault(_PublishThumbnailInput);

var _PublishMetadataInputs = __webpack_require__(111);

var _PublishMetadataInputs2 = _interopRequireDefault(_PublishMetadataInputs);

var _ChannelSelect = __webpack_require__(114);

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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(105);

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
/* 105 */
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publish = __webpack_require__(5);

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(107);

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
/* 107 */
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

var _PublishUrlMiddleDisplay = __webpack_require__(108);

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
/* 108 */
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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(110);

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
/* 110 */
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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(112);

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
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ExpandingTextArea = __webpack_require__(113);

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
/* 113 */
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
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(115);

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
/* 115 */
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
/* 116 */
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
/* 117 */
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
/* 118 */
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
/* 119 */
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
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(5);

var _view = __webpack_require__(121);

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
/* 121 */
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

var _publish_claim_states = __webpack_require__(122);

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
/* 122 */
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(124);

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
/* 124 */
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
/* 125 */
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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(127);

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
/* 127 */
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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(8);

var _view = __webpack_require__(129);

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
/* 129 */
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

var _ShowAssetLite = __webpack_require__(130);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(133);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(139);

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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(131);

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
/* 131 */
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
/* 132 */
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
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(134);

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
/* 134 */
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

var _AssetTitle = __webpack_require__(135);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(44);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(137);

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
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(136);

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
/* 136 */
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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(138);

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
/* 138 */
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
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(140);

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
/* 140 */
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

var _ChannelClaimsDisplay = __webpack_require__(141);

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
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(8);

var _view = __webpack_require__(142);

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
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(143);

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
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(144);

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
/* 144 */
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
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(146);

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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(7);

var _index2 = _interopRequireDefault(_index);

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
        _react2.default.createElement(_index2.default, null),
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
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(17),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(148),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(149);
var handleShowRender = __webpack_require__(150);
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
/* 148 */
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
/* 149 */
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
/* 150 */
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

var _reduxSaga = __webpack_require__(151);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(15);

var _show_uri = __webpack_require__(152);

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
/* 151 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 152 */
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

var _show_asset = __webpack_require__(153);

var _show_channel = __webpack_require__(155);

var _lbryUri = __webpack_require__(157);

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
/* 153 */
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

var _assetApi = __webpack_require__(154);

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
/* 154 */
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
/* 155 */
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

var _channelApi = __webpack_require__(156);

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
/* 156 */
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
/* 157 */
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
/* 158 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGRhMzI4Y2I1ZDhkMTUzOTY3M2UiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9hY3Rpb25zL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9TRU8vaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInByb3AtdHlwZXNcIiIsIndlYnBhY2s6Ly8vLi9yZWFjdC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9zZWxlY3RvcnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL2xicnlBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9yZWFjdC9hY3Rpb25zL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9FcnJvclBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy8uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvYXBwLmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvRHJvcHpvbmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2hhdHdnLWZldGNoXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL2hlbHBlcnMvY29uZmlndXJlTG9nZ2VyLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9jb25maWd1cmVTbGFjay5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIiIsIndlYnBhY2s6Ly8vLi9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vLy4vbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL21vZGVscy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL21vZGVscy9jbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vLi9wYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVzL2FwaS1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCIiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVzL3BhZ2Utcm91dGVzLmpzIiwid2VicGFjazovLy8uL3JlYWN0L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvcmVkdWNlcnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9yZWR1Y2Vycy9zaG93LmpzIiwid2VicGFjazovLy8uL3JlYWN0L3JlZHVjZXJzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9HQUxpc3RlbmVyL3ZpZXcuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWdhXCIiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9Ib21lUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9TRU8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvdXRpbHMvcGFnZVRpdGxlLmpzIiwid2VicGFjazovLy8uL3JlYWN0L3V0aWxzL21ldGFUYWdzLmpzIiwid2VicGFjazovLy8uL3JlYWN0L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9Mb2dvL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hUb29sL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvRHJvcHpvbmUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvdXRpbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3L2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29uc3RhbnRzL3B1Ymxpc2hfY2xhaW1fc3RhdGVzLmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29tcG9uZW50cy9BYm91dFBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvTG9naW5QYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvTG9naW5QYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvU2hvd1BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9TaG93UGFnZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0Fzc2V0SW5mby92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlYWN0L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3JlYWN0L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vcm91dGVzL3NlcnZlLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9oZWxwZXJzL2xicnlVcmkuanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCIiLCJ3ZWJwYWNrOi8vLy4vcmVhY3Qvc2FnYXMvc2hvd191cmkuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3Qvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9yZWFjdC9hcGkvYXNzZXRBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vcmVhY3Qvc2FnYXMvc2hvd19jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3JlYWN0L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL3JlYWN0L3V0aWxzL2xicnlVcmkuanMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcyJdLCJuYW1lcyI6WyJTaXRlQ29uZmlnIiwiYW5hbHl0aWNzIiwiZ29vZ2xlSWQiLCJhc3NldERlZmF1bHRzIiwiZGVzY3JpcHRpb24iLCJ0aHVtYm5haWwiLCJ0aXRsZSIsImF1dGgiLCJzZXNzaW9uS2V5IiwiZGV0YWlscyIsImhvc3QiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwiY29uZmlndXJlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJzZWxlY3RGaWxlIiwiY2xlYXJGaWxlIiwidXBkYXRlTWV0YWRhdGEiLCJ1cGRhdGVDbGFpbSIsInNldFB1Ymxpc2hJbkNoYW5uZWwiLCJ1cGRhdGVQdWJsaXNoU3RhdHVzIiwidXBkYXRlRXJyb3IiLCJ1cGRhdGVTZWxlY3RlZENoYW5uZWwiLCJ0b2dnbGVNZXRhZGF0YUlucHV0cyIsIm9uTmV3VGh1bWJuYWlsIiwic3RhcnRQdWJsaXNoIiwiYWN0aW9ucyIsImZpbGUiLCJ0eXBlIiwiRklMRV9TRUxFQ1RFRCIsImRhdGEiLCJGSUxFX0NMRUFSIiwibmFtZSIsInZhbHVlIiwiTUVUQURBVEFfVVBEQVRFIiwiQ0xBSU1fVVBEQVRFIiwiY2hhbm5lbCIsIlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwiLCJzdGF0dXMiLCJtZXNzYWdlIiwiUFVCTElTSF9TVEFUVVNfVVBEQVRFIiwiRVJST1JfVVBEQVRFIiwiY2hhbm5lbE5hbWUiLCJTRUxFQ1RFRF9DSEFOTkVMX1VQREFURSIsInNob3dNZXRhZGF0YUlucHV0cyIsIlRPR0dMRV9NRVRBREFUQV9JTlBVVFMiLCJUSFVNQk5BSUxfTkVXIiwiaGlzdG9yeSIsIlBVQkxJU0hfU1RBUlQiLCJTZXF1ZWxpemUiLCJyZXF1aXJlIiwibG9nZ2VyIiwiZGF0YWJhc2UiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZGIiLCJzZXF1ZWxpemUiLCJkaWFsZWN0IiwiZGlhbGVjdE9wdGlvbnMiLCJkZWNpbWFsTnVtYmVycyIsImxvZ2dpbmciLCJwb29sIiwibWF4IiwibWluIiwiaWRsZSIsImFjcXVpcmUiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwiaW5mbyIsImNhdGNoIiwiZXJyb3IiLCJlcnIiLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsImltcG9ydCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibW9kZWxOYW1lIiwiYXNzb2NpYXRlIiwidXBzZXJ0IiwiTW9kZWwiLCJ2YWx1ZXMiLCJjb25kaXRpb24iLCJ0YWJsZU5hbWUiLCJmaW5kT25lIiwid2hlcmUiLCJvYmoiLCJkZWJ1ZyIsInVwZGF0ZSIsImNyZWF0ZSIsIm1hcFN0YXRlVG9Qcm9wcyIsImxvZ2dlZEluQ2hhbm5lbCIsImNoYW5uZWxTaG9ydElkIiwic2hvcnRJZCIsImNoYW5uZWxMb25nSWQiLCJsb25nSWQiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJvbkNoYW5uZWxMb2dpbiIsImRpc3BhdGNoIiwib25DaGFubmVsTG9nb3V0Iiwib25IYW5kbGVTaG93UGFnZVVyaSIsIm9uUmVxdWVzdEVycm9yIiwib25OZXdDaGFubmVsUmVxdWVzdCIsIm9uTmV3QXNzZXRSZXF1ZXN0Iiwib25SZXF1ZXN0VXBkYXRlIiwiYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QiLCJhZGRBc3NldFRvQXNzZXRMaXN0IiwiYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QiLCJvblVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJ1cGRhdGVDaGFubmVsQ2xhaW1zIiwiZmlsZVJlcXVlc3RlZCIsInVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkiLCJ1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciIsInBhcmFtcyIsIkhBTkRMRV9TSE9XX1VSSSIsIlJFUVVFU1RfRVJST1IiLCJjaGFubmVsSWQiLCJyZXF1ZXN0VHlwZSIsInJlcXVlc3RJZCIsIkNIQU5ORUxfUkVRVUVTVF9ORVciLCJpZCIsImV4dGVuc2lvbiIsIkFTU0VUX1JFUVVFU1RfTkVXIiwibW9kaWZpZXIiLCJSRVFVRVNUX1VQREFURSIsImtleSIsIlJFUVVFU1RfTElTVF9BREQiLCJjbGFpbUlkIiwiY2xhaW1EYXRhIiwiQVNTRVRfQUREIiwiY2xhaW1zRGF0YSIsIkNIQU5ORUxfQUREIiwiY2hhbm5lbEtleSIsInBhZ2UiLCJDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMiLCJjaGFubmVsTGlzdElkIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MiLCJGSUxFX1JFUVVFU1RFRCIsIkZJTEVfQVZBSUxBQklMSVRZX1VQREFURSIsIkRJU1BMQVlfQVNTRVRfRVJST1IiLCJzaXRlIiwiZGVmYXVsdERlc2NyaXB0aW9uIiwiZGVmYXVsdFRodW1ibmFpbCIsInNpdGVEZXNjcmlwdGlvbiIsInNpdGVIb3N0Iiwic2l0ZVRpdGxlIiwic2l0ZVR3aXR0ZXIiLCJyZXF1ZXN0IiwicGFyc2VKU09OIiwicmVzcG9uc2UiLCJqc29uIiwiY2hlY2tTdGF0dXMiLCJqc29uUmVzcG9uc2UiLCJFcnJvciIsInVybCIsIm9wdGlvbnMiLCJmZXRjaCIsIlByb21pc2UiLCJhbGwiLCJzZWxlY3RBc3NldCIsInNob3ciLCJyZXF1ZXN0TGlzdCIsImFzc2V0S2V5IiwiYXNzZXRMaXN0Iiwic2VsZWN0U2hvd1N0YXRlIiwic3RhdGUiLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsInNlbmRHQVRpbWluZ0V2ZW50IiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJjaGFubmVsX25hbWUiLCJhbW91bnQiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiaXAiLCJvcmlnaW5hbFVybCIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsImNoYW5uZWxfaWQiLCJ1cGRhdGVMb2dnZWRJbkNoYW5uZWwiLCJDSEFOTkVMX1VQREFURSIsIlByb2dyZXNzQmFyIiwicHJvcHMiLCJiYXJzIiwiaW5kZXgiLCJpbmNyZW1lbnRlciIsImNyZWF0ZUJhcnMiLCJiaW5kIiwic3RhcnRQcm9ncmVzc0JhciIsInVwZGF0ZVByb2dyZXNzQmFyIiwic3RvcFByb2dyZXNzQmFyIiwiaSIsInNpemUiLCJwdXNoIiwiaXNBY3RpdmUiLCJzZXRTdGF0ZSIsInVwZGF0ZUludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwibWFwIiwiYmFyIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsIkVycm9yUGFnZSIsInN0cmluZyIsIk15c3FsQ29uZmlnIiwiU2xhY2tDb25maWciLCJzbGFja1dlYkhvb2siLCJzbGFja0Vycm9yQ2hhbm5lbCIsInNsYWNrSW5mb0NoYW5uZWwiLCJyZXR1cm5TaG9ydElkIiwiY2xhaW1zQXJyYXkiLCJjbGFpbUluZGV4Iiwic3Vic3RyaW5nIiwic2hvcnRJZExlbmd0aCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJwb3NzaWJsZU1hdGNoZXMiLCJzbGljZSIsImxlbmd0aCIsImZpbHRlciIsImZzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkiLCJuc2Z3IiwibGljZW5zZSIsImludmFsaWROYW1lQ2hhcmFjdGVycyIsImV4ZWMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMiLCJwYXRoIiwidGVzdCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwiZmlsZU5hbWUiLCJmaWxlUGF0aCIsImZpbGVUeXBlIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImZpbGVfcGF0aCIsImJpZCIsIm1ldGFkYXRhIiwiYXV0aG9yIiwibGFuZ3VhZ2UiLCJjbGFpbV9hZGRyZXNzIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImRlbGV0ZVRlbXBvcmFyeUZpbGUiLCJ1bmxpbmsiLCJhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSIsImZpbGVJbmZvIiwiZ2V0UmVzdWx0IiwiZmlsZV9uYW1lIiwiZG93bmxvYWRfcGF0aCIsImNyZWF0ZUZpbGVEYXRhIiwib3V0cG9pbnQiLCJoZWlnaHQiLCJhZGRyZXNzIiwiY29udGVudFR5cGUiLCJoYW5kbGVFcnJvclJlc3BvbnNlIiwicmVzIiwidXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzIiwicmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwibmV3RXJyb3JPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwic3VjY2VzcyIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImNoYW5uZWxDbGFpbUlkIiwiZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCIsImdldENsYWltSWRCeUNsYWltIiwiZ2V0TG9uZ0NsYWltSWQiLCJsb25nQ2xhaW1JZCIsImdldExvbmdDaGFubmVsSWQiLCJsb25nQ2hhbm5lbElkIiwiZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCIsImdldENoYW5uZWxEYXRhIiwibG9uZ0NoYW5uZWxDbGFpbUlkIiwiZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCIsInNob3J0Q2hhbm5lbENsYWltSWQiLCJnZXRDaGFubmVsQ2xhaW1zIiwiZ2V0QWxsQ2hhbm5lbENsYWltcyIsImNoYW5uZWxDbGFpbXNBcnJheSIsInBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSIsImdldExvY2FsRmlsZVJlY29yZCIsImRhdGFWYWx1ZXMiLCJyZXEiLCJjb250ZXh0Iiwic3RvcmUiLCJodG1sIiwiaGVsbWV0IiwicmVuZGVyU3RhdGljIiwicmVkaXJlY3QiLCJwcmVsb2FkZWRTdGF0ZSIsImdldFN0YXRlIiwic2VuZCIsInB1Ymxpc2giLCJMT0dJTiIsIkNSRUFURSIsIkxPQ0FMX0NIRUNLIiwiVU5BVkFJTEFCTEUiLCJFUlJPUiIsIkFWQUlMQUJMRSIsImdvb2dsZUFuYWx5dGljc0lkIiwiQXBwIiwiZmlsZUVycm9yIiwic2V0RmlsZUVycm9yIiwiQ0hBTk5FTCIsIkFTU0VUX0xJVEUiLCJBU1NFVF9ERVRBSUxTIiwiZGlzcGxheUFzc2V0IiwiYXNzZXQiLCJvbkZpbGVSZXF1ZXN0IiwidG9TdHJpbmciLCJtZXRhIiwibGluayIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwicGFzc3BvcnQiLCJwb3B1bGF0ZUxvY2Fsc0RvdFVzZXIiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJTcGVlY2hTZXJ2ZXIiLCJteXNxbENvbmZpZyIsInNpdGVDb25maWciLCJzbGFja0NvbmZpZyIsInN0YXJ0IiwiY29uZmlndXJlQ29uZmlnRmlsZXMiLCJjb25maWd1cmVMb2dnaW5nIiwiY29uZmlndXJlQXBwIiwiY29uZmlndXJlU2VydmVyIiwic3RhcnRTZXJ2ZXIiLCJteXNxbEFwcENvbmZpZyIsInNpdGVBcHBDb25maWciLCJQT1JUIiwic2xhY2tBcHBDb25maWciLCJhcHAiLCJlbmFibGUiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJuZXh0IiwidmVyYm9zZSIsInNlcmlhbGl6ZVVzZXIiLCJkZXNlcmlhbGl6ZVVzZXIiLCJsb2NhbFNpZ251cFN0cmF0ZWd5IiwibG9jYWxMb2dpblN0cmF0ZWd5IiwibWF4QWdlIiwiaW5pdGlhbGl6ZSIsInNlc3Npb24iLCJoYnMiLCJkZWZhdWx0TGF5b3V0IiwiaGFuZGxlYmFycyIsImVuZ2luZSIsInNldCIsInNlcnZlciIsIlNlcnZlciIsInN5bmMiLCJsaXN0ZW4iLCJ1c2VyIiwibG9jYWxzIiwidXNlck5hbWUiLCJzaG9ydENoYW5uZWxJZCIsImRvbmUiLCJsb2dMZXZlbCIsIndpbnN0b24iLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwid2FybiIsInNpbGx5IiwibG9nZ2VyQ29uZmlnIiwid2luc3RvblNsYWNrV2ViSG9vayIsIlNsYWNrV2ViSG9vayIsImFkZCIsIndlYmhvb2tVcmwiLCJpY29uRW1vamkiLCJQYXNzcG9ydExvY2FsU3RyYXRlZ3kiLCJTdHJhdGVneSIsImxicnlBcGkiLCJ1c2VybmFtZUZpZWxkIiwicGFzc3dvcmRGaWVsZCIsInVzZXJJbmZvIiwidXNlckRhdGEiLCJjaGFubmVsRGF0YSIsInR4IiwiY2xhaW1faWQiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImRlZmF1bHQiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJub3V0IiwidHhpZCIsInZhbGlkQXRIZWlnaHQiLCJ2YWx1ZVZlcnNpb24iLCJjbGFpbVR5cGUiLCJjZXJ0aWZpY2F0ZVZlcnNpb24iLCJrZXlUeXBlIiwicHVibGljS2V5IiwiZnJlZXplVGFibGVOYW1lIiwiYmVsb25nc1RvIiwiZm9yZWlnbktleSIsImFsbG93TnVsbCIsImZpbmRBbGwiLCJvcmRlciIsImdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQiLCIkbGlrZSIsImdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUiLCJ2YWxpZGF0ZUxvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImNsYWltIiwiY2VydGlmaWNhdGVJZCIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwicmF3IiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJyZXNvbHZlQ2xhaW0iLCJjbGFpbUFycmF5IiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImFjdGlvbiIsImlwQWRkcmVzcyIsImJjcnlwdCIsInByb3RvdHlwZSIsImNvbXBhcmVQYXNzd29yZCIsImNvbXBhcmUiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwiZ2VuU2FsdCIsInNhbHRFcnJvciIsInNhbHQiLCJoYXNoIiwiaGFzaEVycm9yIiwiaG9vayIsInJldHVyblVzZXJBbmRDaGFubmVsSW5mbyIsInVzZXJJbnN0YW5jZSIsImdldENoYW5uZWwiLCJpc01hdGNoIiwibG9nSW4iLCJnZXQiLCJsb2dvdXQiLCJtdWx0aXBhcnQiLCJtdWx0aXBhcnRNaWRkbGV3YXJlIiwidXBsb2FkRGlyIiwiY2xhaW1OYW1lSXNBdmFpbGFibGUiLCJjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkiLCJlcnJvckhhbmRsZXJzIiwiYXV0aGVudGljYXRlVXNlciIsImF2YWlsYWJsZU5hbWUiLCJib2R5IiwiY2xhaW1zTGlzdCIsInJlc29sdmVSZXN1bHQiLCJmaWxlRGF0YSIsImZpbGVSZWNvcmQiLCJjb21wbGV0ZWQiLCJyZXNvbHZlZFVyaSIsImZpbGVzIiwiY2hhbm5lbFBhc3N3b3JkIiwidmFsaWRhdGVkQ2xhaW1OYW1lIiwidGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImxicnlUeCIsImNsYWltSW5mbyIsInB1Ymxpc2hIZWxwZXJzIiwiT3AiLCJwdWJsaXNoUmVzdWx0cyIsImNsYWltUmVjb3JkIiwidXBzZXJ0Q3JpdGVyaWEiLCJzZXRDbGFpbSIsInNldEZpbGUiLCJjbGFpbUFkZHJlc3NlcyIsImF0dHJpYnV0ZXMiLCJvciIsImF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyIsInVzZXJQYXNzd29yZCIsImNoYW5uZWxGaW5kUGFyYW1zIiwiQ0xBSU1TX1BFUl9QQUdFIiwiY2xhaW1zIiwidG90YWxQYWdlcyIsImRldGVybWluZVRvdGFsUGFnZXMiLCJwYWdpbmF0aW9uUGFnZSIsImdldFBhZ2VGcm9tUXVlcnkiLCJ2aWV3RGF0YSIsImV4dHJhY3RQYWdlRnJvbUNsYWltcyIsInByZXZpb3VzUGFnZSIsImRldGVybWluZVByZXZpb3VzUGFnZSIsImN1cnJlbnRQYWdlIiwibmV4dFBhZ2UiLCJkZXRlcm1pbmVOZXh0UGFnZSIsInRvdGFsUmVzdWx0cyIsImRldGVybWluZVRvdGFsQ2xhaW1zIiwicGFyc2VJbnQiLCJwYWdlTnVtYmVyIiwiY2xhaW1TdGFydEluZGV4IiwiY2xhaW1FbmRJbmRleCIsInBhZ2VPZkNsYWltcyIsInRvdGFsQ2xhaW1zIiwiZnVsbFBhZ2VzIiwiTWF0aCIsImZsb29yIiwicmVtYWluZGVyIiwiaGFuZGxlUGFnZVJlbmRlciIsInJlbmRlciIsImxheW91dCIsImluaXRpYWxTdGF0ZSIsImFzc2lnbiIsInB1Ymxpc2hJbkNoYW5uZWwiLCJzZWxlY3RlZENoYW5uZWwiLCJwdWJsaXNoU3VibWl0IiwiY2hhbm5lbExpc3QiLCJHQUxpc3RlbmVyIiwic2VuZFBhZ2VWaWV3IiwibG9jYXRpb24iLCJwYXRobmFtZSIsInBhZ2V2aWV3IiwiY2hpbGRyZW4iLCJIb21lUGFnZSIsIlNFTyIsInBhZ2VVcmkiLCJwYWdlVGl0bGUiLCJtZXRhVGFncyIsImNhbm9uaWNhbExpbmsiLCJyZWwiLCJocmVmIiwib2JqZWN0IiwiY3JlYXRlUGFnZVRpdGxlIiwiZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZSIsImZpbGVFeHQiLCJsYXN0SW5kZXhPZiIsImNyZWF0ZUJhc2ljTWV0YVRhZ3MiLCJwcm9wZXJ0eSIsImNvbnRlbnQiLCJjcmVhdGVDaGFubmVsTWV0YVRhZ3MiLCJjcmVhdGVBc3NldE1ldGFUYWdzIiwiZW1iZWRVcmwiLCJzaG93VXJsIiwib2dUaXRsZSIsIm9nRGVzY3JpcHRpb24iLCJvZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwib2dUaHVtYm5haWwiLCJjcmVhdGVNZXRhVGFncyIsImNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayIsImNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayIsImNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2Fub25pY2FsTGluayIsIlZJRVciLCJMT0dPVVQiLCJOYXZCYXIiLCJjaGVja0ZvckxvZ2dlZEluVXNlciIsImxvZ291dFVzZXIiLCJoYW5kbGVTZWxlY3Rpb24iLCJjcmVkZW50aWFscyIsInRhcmdldCIsInNlbGVjdGVkT3B0aW9ucyIsIkxvZ28iLCJOYXZCYXJDaGFubmVsRHJvcGRvd24iLCJkZWZhdWx0U2VsZWN0aW9uIiwiUHVibGlzaFRvb2wiLCJEcm9wem9uZSIsImRyYWdPdmVyIiwibW91c2VPdmVyIiwiZGltUHJldmlldyIsImhhbmRsZURyb3AiLCJoYW5kbGVEcmFnT3ZlciIsImhhbmRsZURyYWdFbmQiLCJoYW5kbGVEcmFnRW50ZXIiLCJoYW5kbGVEcmFnTGVhdmUiLCJoYW5kbGVNb3VzZUVudGVyIiwiaGFuZGxlTW91c2VMZWF2ZSIsImhhbmRsZUNsaWNrIiwiaGFuZGxlRmlsZUlucHV0IiwiY2hvb3NlRmlsZSIsInByZXZlbnREZWZhdWx0IiwiZHQiLCJkYXRhVHJhbnNmZXIiLCJpdGVtcyIsImtpbmQiLCJkcm9wcGVkRmlsZSIsImdldEFzRmlsZSIsInJlbW92ZSIsImNsZWFyRGF0YSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGljayIsImZpbGVMaXN0IiwidmFsaWRhdGVGaWxlIiwiUHVibGlzaFByZXZpZXciLCJpbWdTb3VyY2UiLCJzZXRQcmV2aWV3SW1hZ2VTb3VyY2UiLCJuZXdQcm9wcyIsInNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlIiwicHJldmlld1JlYWRlciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNEYXRhVVJMIiwib25sb2FkZW5kIiwiYm9vbCIsIlB1Ymxpc2hEZXRhaWxzIiwib25QdWJsaXNoU3VibWl0Iiwib25NZXRhZGF0YUNoYW5nZSIsIlB1Ymxpc2hUaXRsZUlucHV0IiwiaGFuZGxlSW5wdXQiLCJlIiwibG9nZ2VkSW5DaGFubmVsTmFtZSIsImxvZ2dlZEluQ2hhbm5lbFNob3J0SWQiLCJ1cmxFcnJvciIsIm9uQ2xhaW1DaGFuZ2UiLCJvblVybEVycm9yIiwiUHVibGlzaFVybElucHV0Iiwic2V0Q2xhaW1OYW1lIiwidmFsaWRhdGVDbGFpbSIsImNsZWFuc2VJbnB1dCIsImlucHV0IiwiZmlsZU5hbWVXaXRob3V0RW5kaW5nIiwiY2xlYW5DbGFpbU5hbWUiLCJVcmxNaWRkbGUiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiaWEiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsIkJsb2IiLCJQdWJsaXNoVGh1bWJuYWlsSW5wdXQiLCJ2aWRlb1NvdXJjZSIsInNsaWRlck1pblJhbmdlIiwic2xpZGVyTWF4UmFuZ2UiLCJzbGlkZXJWYWx1ZSIsImhhbmRsZVZpZGVvTG9hZGVkRGF0YSIsImhhbmRsZVNsaWRlckNoYW5nZSIsImNyZWF0ZVRodW1ibmFpbCIsInNldFZpZGVvU291cmNlIiwibmV4dFByb3BzIiwiZGF0YVVyaSIsImJsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ0b3RhbE1pbnV0ZXMiLCJ0b3RhbFNlY29uZHMiLCJ2aWRlbyIsImN1cnJlbnRUaW1lIiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsIndpZHRoIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImRhdGFVcmwiLCJ0b0RhdGFVUkwiLCJzbmFwc2hvdCIsImRpc3BsYXkiLCJvblRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwiUHVibGlzaE1ldGFkYXRhSW5wdXRzIiwidG9nZ2xlU2hvd0lucHV0cyIsImhhbmRsZVNlbGVjdCIsImNoZWNrZWQiLCJzZWxlY3RlZE9wdGlvbiIsIm1heEhlaWdodCIsIkV4cGFuZGluZ1RleHRhcmVhIiwiX2hhbmRsZUNoYW5nZSIsImFkanVzdFRleHRhcmVhIiwib25DaGFuZ2UiLCJlbCIsInN0eWxlIiwic2Nyb2xsSGVpZ2h0IiwicmVzdCIsIngiLCJmdW5jIiwiY2hhbm5lbEVycm9yIiwib25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlIiwib25DaGFubmVsU2VsZWN0Iiwic3RhdGVzIiwiQ2hhbm5lbFNlbGVjdCIsInRvZ2dsZUFub255bW91c1B1Ymxpc2giLCJDaGFubmVsTG9naW5Gb3JtIiwibG9naW5Ub0NoYW5uZWwiLCJIZWFkZXJzIiwiQ2hhbm5lbENyZWF0ZUZvcm0iLCJoYW5kbGVDaGFubmVsSW5wdXQiLCJjbGVhbnNlQ2hhbm5lbElucHV0IiwidXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIiwiY2hhbm5lbFdpdGhBdFN5bWJvbCIsImNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIiwiY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUiLCJtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0IiwiQWN0aXZlU3RhdHVzQmFyIiwiSW5hY3RpdmVTdGF0dXNCYXIiLCJwdWJsaXNoU3RhdGVzIiwiUHVibGlzaFN0YXR1cyIsIkxPQURfU1RBUlQiLCJMT0FESU5HIiwiUFVCTElTSElORyIsIlNVQ0NFU1MiLCJGQUlMRUQiLCJQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIiwiQWJvdXRQYWdlIiwiTG9naW5QYWdlIiwiU2hvd1BhZ2UiLCJtYXRjaCIsIlNob3dMaXRlIiwiQXNzZXREaXNwbGF5IiwiU2hvd0Fzc2V0RGV0YWlscyIsIkFzc2V0VGl0bGUiLCJBc3NldEluZm8iLCJjb3B5VG9DbGlwYm9hcmQiLCJlbGVtZW50VG9Db3B5IiwiZGF0YXNldCIsImVsZW1lbnR0b2NvcHkiLCJzZWxlY3QiLCJleGVjQ29tbWFuZCIsInByZXZpb3VzUmVxdWVzdCIsIlNob3dDaGFubmVsIiwiQ2hhbm5lbENsYWltc0Rpc3BsYXkiLCJzaG93TmV4dFJlc3VsdHNQYWdlIiwic2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UiLCJzaG93TmV3UGFnZSIsImRlZmF1bHRzIiwiQXNzZXRQcmV2aWV3IiwiZGlyZWN0U291cmNlTGluayIsInNob3dVcmxMaW5rIiwiRm91ck9oRm9yUGFnZSIsImRldGVybWluZVJlc3BvbnNlVHlwZSIsImZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkiLCJsb2dSZXF1ZXN0RGF0YSIsImdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IiwibGJyeVVyaSIsImhhbmRsZVNob3dSZW5kZXIiLCJTRVJWRSIsImhhc0ZpbGVFeHRlbnNpb24iLCJwYXJzZU1vZGlmaWVyIiwicmVzcG9uc2VUeXBlIiwicGFyc2VDbGFpbSIsImlzQ2hhbm5lbCIsInBhcnNlSWRlbnRpZmllciIsImlkZW50aWZpZXIiLCJTSE9XIiwiY2xpZW50QWNjZXB0c0h0bWwiLCJhY2NlcHQiLCJyZXF1ZXN0SXNGcm9tQnJvd3NlciIsImNsaWVudFdhbnRzQXNzZXQiLCJyYW5nZSIsImltYWdlSXNXYW50ZWQiLCJ2aWRlb0lzV2FudGVkIiwiaXNWYWxpZENsYWltSWQiLCJpc1ZhbGlkU2hvcnRJZCIsImlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIiwic2VydmVBc3NldFRvQ2xpZW50Iiwic2VuZEZpbGVPcHRpb25zIiwic2VuZEZpbGUiLCJmdWxsQ2xhaW1JZCIsInRlbXBOYW1lIiwiUkVHRVhQX0lOVkFMSURfQ0xBSU0iLCJSRUdFWFBfSU5WQUxJRF9DSEFOTkVMIiwiUkVHRVhQX0FERFJFU1MiLCJDSEFOTkVMX0NIQVIiLCJjb21wb25lbnRzUmVnZXgiLCJSZWdFeHAiLCJwcm90byIsIm1vZGlmaWVyU2VwZXJhdG9yIiwic3RhcnRzV2l0aCIsIm5hbWVCYWRDaGFycyIsImpvaW4iLCJyZXR1cm5TYWdhV2l0aFBhcmFtcyIsInNhZ2EiLCJzYWdhTWlkZGxld2FyZSIsIm1pZGRsZXdhcmUiLCJydW4iLCJoYW5kbGVTaG93UGFnZVVyaSIsIndhdGNoSGFuZGxlU2hvd1BhZ2VVcmkiLCJwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSIsInBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IiwibmV3QXNzZXRSZXF1ZXN0Iiwid2F0Y2hOZXdBc3NldFJlcXVlc3QiLCJnZXRTaG9ydElkIiwiZ2V0Q2xhaW1EYXRhIiwibmV3Q2hhbm5lbFJlcXVlc3QiLCJ3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hVcGRhdGVDaGFubmVsQ2xhaW1zIiwiZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCIsImV4dGVuc2lvblNlcGVyYXRvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxrQzs7Ozs7O0FDQUEsd0M7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7QUNBQSxTQUFTQSxVQUFULEdBQXVCO0FBQUE7O0FBQ3JCLE9BQUtDLFNBQUwsR0FBaUI7QUFDZkMsY0FBVTtBQURLLEdBQWpCO0FBR0EsT0FB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Q0QsVUFBSUEsdUJBQXVCLEdBQTNCLEVBQWdDO0FBQzlCLGNBQU0sSUFBSXR0QixLQUFKLDRCQUFtQ3N0QixrQkFBbkMscURBQU47QUFDRDtBQUNGO0FBQ0QsV0FBTztBQUNManJCLDBCQURLO0FBRUxyRSxpQkFBV0EsYUFBYTtBQUZuQixLQUFQO0FBSUQ7QUFuRmMsQ0FBakIsQzs7Ozs7Ozs7O0FDQUEsSUFBTTZkLG1CQUFtQixtQkFBQXppQixDQUFRLEVBQVIsQ0FBekI7O0FBRUFyQyxPQUFPQyxPQUFQLEdBQWlCLGVBQU87QUFDdEI7QUFDQW1ZLE1BQUlFLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBQ3hELEdBQUQsRUFBTS9CLEdBQU4sRUFBYztBQUN6QjtBQUNBK1IscUJBQWlCaFEsR0FBakIsRUFBc0IvQixHQUF0QjtBQUNELEdBSEQ7QUFJRCxDQU5ELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDBkYTMyOGNiNWQ4ZDE1Mzk2NzNlIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtcmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3RvblwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIFNpdGVDb25maWcgKCkge1xuICB0aGlzLmFuYWx5dGljcyA9IHtcbiAgICBnb29nbGVJZDogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmFzc2V0RGVmYXVsdHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdBbiBhc3NldCBwdWJsaXNoZWQgb24gU3BlZS5jaCcsXG4gICAgdGh1bWJuYWlsICA6ICdodHRwczovL3NwZWUuY2gvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgfTtcbiAgdGhpcy5hdXRoID0ge1xuICAgIHNlc3Npb25LZXk6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5kZXRhaWxzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT3Blbi1zb3VyY2UsIGRlY2VudHJhbGl6ZWQgaW1hZ2UgYW5kIHZpZGVvIHNoYXJpbmcuJyxcbiAgICBob3N0ICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHBvcnQgICAgICAgOiAzMDAwLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gICAgdHdpdHRlciAgICA6ICdAc3BlZV9jaCcsXG4gIH07XG4gIHRoaXMucHVibGlzaGluZyA9IHtcbiAgICBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXM6IFtdLFxuICAgIGRpc2FibGVkICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgZGlzYWJsZWRNZXNzYWdlICAgICAgICAgOiAnUGxlYXNlIGNoZWNrIGJhY2sgc29vbi4nLFxuICAgIHByaW1hcnlDbGFpbUFkZHJlc3MgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWwgICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWxJZCAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHVwbG9hZERpcmVjdG9yeSAgICAgICAgIDogJy9ob21lL2xicnkvVXBsb2FkcycsXG4gIH07XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNpdGUgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7IGFuYWx5dGljcywgYXNzZXREZWZhdWx0cywgYXV0aCwgZGV0YWlscywgcHVibGlzaGluZyB9ID0gY29uZmlnO1xuICAgIHRoaXMuYW5hbHl0aWNzID0gYW5hbHl0aWNzO1xuICAgIHRoaXMuYXNzZXREZWZhdWx0cyA9IGFzc2V0RGVmYXVsdHM7XG4gICAgdGhpcy5hdXRoID0gYXV0aDtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIHRoaXMucHVibGlzaGluZyA9IHB1Ymxpc2hpbmc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0RmlsZSAoZmlsZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9TRUxFQ1RFRCxcbiAgICBkYXRhOiBmaWxlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyRmlsZSAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0NMRUFSLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1ldGFkYXRhIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuTUVUQURBVEFfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNsYWltICh2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0xBSU1fVVBEQVRFLFxuICAgIGRhdGE6IHZhbHVlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFB1Ymxpc2hJbkNoYW5uZWwgKGNoYW5uZWwpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwsXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQdWJsaXNoU3RhdHVzIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBtZXNzYWdlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRXJyb3IgKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5FUlJPUl9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHZhbHVlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRDaGFubmVsIChjaGFubmVsTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuU0VMRUNURURfQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YTogY2hhbm5lbE5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTWV0YWRhdGFJbnB1dHMgKHNob3dNZXRhZGF0YUlucHV0cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUyxcbiAgICBkYXRhOiBzaG93TWV0YWRhdGFJbnB1dHMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdUaHVtYm5haWwgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRIVU1CTkFJTF9ORVcsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFB1Ymxpc2ggKGhpc3RvcnkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBUlQsXG4gICAgZGF0YTogeyBoaXN0b3J5IH0sXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9hY3Rpb25zL3B1Ymxpc2guanMiLCJjb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc29sZS5sb2coJ2V4cG9ydGluZyBzZXF1ZWxpemUgbW9kZWxzJyk7XG5jb25zdCB7IGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZy9teXNxbENvbmZpZycpO1xuY29uc3QgZGIgPSB7fTtcbi8vIHNldCBzZXF1ZWxpemUgb3B0aW9uc1xuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkLCB7XG4gIGhvc3QgICAgICAgICAgOiAnbG9jYWxob3N0JyxcbiAgZGlhbGVjdCAgICAgICA6ICdteXNxbCcsXG4gIGRpYWxlY3RPcHRpb25zOiB7ZGVjaW1hbE51bWJlcnM6IHRydWV9LCAvLyBmaXggdG8gZW5zdXJlIERFQ0lNQUwgd2lsbCBub3QgYmUgc3RvcmVkIGFzIGEgc3RyaW5nXG4gIGxvZ2dpbmcgICAgICAgOiBmYWxzZSxcbiAgcG9vbCAgICAgICAgICA6IHtcbiAgICBtYXggICAgOiA1LFxuICAgIG1pbiAgICA6IDAsXG4gICAgaWRsZSAgIDogMTAwMDAsXG4gICAgYWNxdWlyZTogMTAwMDAsXG4gIH0sXG59KTtcblxuLy8gZXN0YWJsaXNoIG15c3FsIGNvbm5lY3Rpb25cbnNlcXVlbGl6ZVxuICAuYXV0aGVudGljYXRlKClcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKCdTZXF1ZWxpemUgaGFzIGVzdGFibGlzaGVkIG15c3FsIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5LicpO1xuICB9KVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICBsb2dnZXIuZXJyb3IoJ1NlcXVlbGl6ZSB3YXMgdW5hYmxlIHRvIGNvbm5lY3QgdG8gdGhlIGRhdGFiYXNlOicsIGVycik7XG4gIH0pO1xuXG4vLyBtYW51YWxseSBhZGQgZWFjaCBtb2RlbCB0byB0aGUgZGIgb2JqZWN0XG5jb25zdCBDZXJ0aWZpY2F0ZSA9IHJlcXVpcmUoJy4vY2VydGlmaWNhdGUuanMnKTtcbmNvbnN0IENoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWwuanMnKTtcbmNvbnN0IENsYWltID0gcmVxdWlyZSgnLi9jbGFpbS5qcycpO1xuY29uc3QgRmlsZSA9IHJlcXVpcmUoJy4vZmlsZS5qcycpO1xuY29uc3QgUmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdC5qcycpO1xuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4vdXNlci5qcycpO1xuZGJbJ0NlcnRpZmljYXRlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDZXJ0aWZpY2F0ZScsIENlcnRpZmljYXRlKTtcbmRiWydDaGFubmVsJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDaGFubmVsJywgQ2hhbm5lbCk7XG5kYlsnQ2xhaW0nXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NsYWltJywgQ2xhaW0pO1xuZGJbJ0ZpbGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0ZpbGUnLCBGaWxlKTtcbmRiWydSZXF1ZXN0J10gPSBzZXF1ZWxpemUuaW1wb3J0KCdSZXF1ZXN0JywgUmVxdWVzdCk7XG5kYlsnVXNlciddID0gc2VxdWVsaXplLmltcG9ydCgnVXNlcicsIFVzZXIpO1xuXG4vLyBydW4gbW9kZWwuYXNzb2NpYXRpb24gZm9yIGVhY2ggbW9kZWwgaW4gdGhlIGRiIG9iamVjdCB0aGF0IGhhcyBhbiBhc3NvY2lhdGlvblxuT2JqZWN0LmtleXMoZGIpLmZvckVhY2gobW9kZWxOYW1lID0+IHtcbiAgaWYgKGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKSB7XG4gICAgbG9nZ2VyLmluZm8oJ0Fzc29jaWF0aW5nIG1vZGVsOicsIG1vZGVsTmFtZSk7XG4gICAgZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUoZGIpO1xuICB9XG59KTtcblxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplO1xuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuXG4vLyBhZGQgYW4gJ3Vwc2VydCcgbWV0aG9kIHRvIHRoZSBkYiBvYmplY3RcbmRiLnVwc2VydCA9IChNb2RlbCwgdmFsdWVzLCBjb25kaXRpb24sIHRhYmxlTmFtZSkgPT4ge1xuICByZXR1cm4gTW9kZWxcbiAgICAuZmluZE9uZSh7XG4gICAgICB3aGVyZTogY29uZGl0aW9uLFxuICAgIH0pXG4gICAgLnRoZW4ob2JqID0+IHtcbiAgICAgIGlmIChvYmopIHsgIC8vIHVwZGF0ZVxuICAgICAgICBsb2dnZXIuZGVidWcoYHVwZGF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIG9iai51cGRhdGUodmFsdWVzKTtcbiAgICAgIH0gZWxzZSB7ICAvLyBpbnNlcnRcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBjcmVhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBNb2RlbC5jcmVhdGUodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgJHt0YWJsZU5hbWV9LnVwc2VydCBlcnJvcmAsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21vZGVscy9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICcuLi8uLi9hY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsTmFtZSAgIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBjaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBjaGFubmVsTG9uZ0lkIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubG9uZ0lkLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsTG9nb3V0OiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobnVsbCwgbnVsbCwgbnVsbCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvTmF2QmFyL2luZGV4LmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuXG5pbXBvcnQgeyBDSEFOTkVMLCBBU1NFVF9MSVRFLCBBU1NFVF9ERVRBSUxTIH0gZnJvbSAnY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcyc7XG5cbi8vIGJhc2ljIHJlcXVlc3QgcGFyc2luZ1xuZXhwb3J0IGZ1bmN0aW9uIG9uSGFuZGxlU2hvd1BhZ2VVcmkgKHBhcmFtcykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLFxuICAgIGRhdGE6IHBhcmFtcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlcXVlc3RFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdDaGFubmVsUmVxdWVzdCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkge1xuICBjb25zdCByZXF1ZXN0VHlwZSA9IENIQU5ORUw7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IGBjciMke2NoYW5uZWxOYW1lfSMke2NoYW5uZWxJZH1gO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVyxcbiAgICBkYXRhOiB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld0Fzc2V0UmVxdWVzdCAobmFtZSwgaWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGV4dGVuc2lvbikge1xuICBjb25zdCByZXF1ZXN0VHlwZSA9IGV4dGVuc2lvbiA/IEFTU0VUX0xJVEUgOiBBU1NFVF9ERVRBSUxTO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgYXIjJHtuYW1lfSMke2lkfSMke2NoYW5uZWxOYW1lfSMke2NoYW5uZWxJZH1gO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgICBuYW1lLFxuICAgICAgbW9kaWZpZXI6IHtcbiAgICAgICAgaWQsXG4gICAgICAgIGNoYW5uZWw6IHtcbiAgICAgICAgICBuYW1lOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICBpZCAgOiBjaGFubmVsSWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0VXBkYXRlIChyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICByZXF1ZXN0VHlwZSxcbiAgICAgIHJlcXVlc3RJZCxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IChpZCwgZXJyb3IsIGtleSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwga2V5IH0sXG4gIH07XG59O1xuXG4vLyBhc3NldCBhY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBc3NldFRvQXNzZXRMaXN0IChpZCwgZXJyb3IsIG5hbWUsIGNsYWltSWQsIHNob3J0SWQsIGNsYWltRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQVNTRVRfQURELFxuICAgIGRhdGE6IHsgaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEgfSxcbiAgfTtcbn1cblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCAoaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9BREQsXG4gICAgZGF0YTogeyBpZCwgbmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25VcGRhdGVDaGFubmVsQ2xhaW1zIChjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyxcbiAgICBkYXRhOiB7Y2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDaGFubmVsQ2xhaW1zIChjaGFubmVsTGlzdElkLCBjbGFpbXNEYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyxcbiAgICBkYXRhOiB7Y2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YX0sXG4gIH07XG59O1xuXG4vLyBkaXNwbGF5IGEgZmlsZVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZVJlcXVlc3RlZCAobmFtZSwgY2xhaW1JZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9SRVFVRVNURUQsXG4gICAgZGF0YTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRmlsZUF2YWlsYWJpbGl0eSAoc3RhdHVzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEUsXG4gICAgZGF0YTogc3RhdHVzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlBc3NldEVycm9yIChlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRElTUExBWV9BU1NFVF9FUlJPUixcbiAgICBkYXRhOiBlcnJvcixcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9hY3Rpb25zL3Nob3cuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZSB9KSA9PiB7XG4gIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBkZXNjcmlwdGlvbjogc2l0ZURlc2NyaXB0aW9uLCBob3N0OiBzaXRlSG9zdCwgdGl0bGU6IHNpdGVUaXRsZSwgdHdpdHRlcjogc2l0ZVR3aXR0ZXIgfSA9IHNpdGU7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gICAgc2l0ZURlc2NyaXB0aW9uLFxuICAgIHNpdGVIb3N0LFxuICAgIHNpdGVUaXRsZSxcbiAgICBzaXRlVHdpdHRlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvU0VPL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCJcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnY3Jvc3MtZmV0Y2gvcG9seWZpbGwnO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgSlNPTiByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBwYXJzZUpTT04gKHJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBzdGF0dXMgcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdCB8IHVuZGVmaW5lZH0gUmV0dXJucyBvYmplY3Qgd2l0aCBzdGF0dXMgYW5kIHN0YXR1c1RleHQsIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjaGVja1N0YXR1cyAocmVzcG9uc2UsIGpzb25SZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xuICB9XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGpzb25SZXNwb25zZS5tZXNzYWdlKTtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgdGhyb3cgZXJyb3I7XG59XG5cbi8qKlxuICogUmVxdWVzdHMgYSBVUkwsIHJldHVybmluZyBhIHByb21pc2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybCAgICAgICBUaGUgVVJMIHdlIHdhbnQgdG8gcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgd2Ugd2FudCB0byBwYXNzIHRvIFwiZmV0Y2hcIlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgIFRoZSByZXNwb25zZSBkYXRhXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXNwb25zZSwgcGFyc2VKU09OKHJlc3BvbnNlKV0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFtyZXNwb25zZSwganNvblJlc3BvbnNlXSkgPT4ge1xuICAgICAgcmV0dXJuIGNoZWNrU3RhdHVzKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvdXRpbHMvcmVxdWVzdC5qcyIsIi8vIHJlcXVlc3QgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEhBTkRMRV9TSE9XX1VSSSA9ICdIQU5ETEVfU0hPV19VUkknO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfRVJST1IgPSAnUkVRVUVTVF9FUlJPUic7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9VUERBVEUgPSAnUkVRVUVTVF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX1JFUVVFU1RfTkVXID0gJ0FTU0VUX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1JFUVVFU1RfTkVXID0gJ0NIQU5ORUxfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfTElTVF9BREQgPSAnUkVRVUVTVF9MSVNUX0FERCc7XG5cbi8vIGFzc2V0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBBU1NFVF9BREQgPSBgQVNTRVRfQUREYDtcblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9BREQgPSAnQ0hBTk5FTF9BREQnO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MnO1xuXG4vLyBhc3NldC9maWxlIGRpc3BsYXkgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEZJTEVfUkVRVUVTVEVEID0gJ0ZJTEVfUkVRVUVTVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUgPSAnRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBESVNQTEFZX0FTU0VUX0VSUk9SID0gJ0RJU1BMQVlfQVNTRVRfRVJST1InO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdEFzc2V0ID0gKHNob3cpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3Rbc2hvdy5yZXF1ZXN0LmlkXTtcbiAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTtcbiAgcmV0dXJuIHNob3cuYXNzZXRMaXN0W2Fzc2V0S2V5XTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RTaG93U3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNob3c7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3Qvc2VsZWN0b3JzL3Nob3cuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYS9lZmZlY3RzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCJcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgYXBpOiB7IGFwaUhvc3QsIGFwaVBvcnQgfSB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL2xicnlDb25maWcuanMnKTtcbmNvbnN0IGxicnlBcGlVcmkgPSAnaHR0cDovLycgKyBhcGlIb3N0ICsgJzonICsgYXBpUG9ydDtcbmNvbnN0IHsgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsLCBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi9nb29nbGVBbmFseXRpY3MuanMnKTtcblxuY29uc3QgaGFuZGxlTGJyeW5ldFJlc3BvbnNlID0gKHsgZGF0YSB9LCByZXNvbHZlLCByZWplY3QpID0+IHtcbiAgbG9nZ2VyLmRlYnVnKCdsYnJ5IGFwaSBkYXRhOicsIGRhdGEpO1xuICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAvLyBjaGVjayBmb3IgYW4gZXJyb3JcbiAgICBpZiAoZGF0YS5yZXN1bHQuZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnTGJyeW5ldCBhcGkgZXJyb3I6JywgZGF0YS5yZXN1bHQuZXJyb3IpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihkYXRhLnJlc3VsdC5lcnJvcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGZhbGxiYWNrIGluIGNhc2UgaXQganVzdCB0aW1lZCBvdXRcbiAgcmVqZWN0KEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoQ2xhaW0gKHB1Ymxpc2hQYXJhbXMpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUHVibGlzaGluZyBjbGFpbSB0byBcIiR7cHVibGlzaFBhcmFtcy5uYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncHVibGlzaCcsXG4gICAgICAgICAgcGFyYW1zOiBwdWJsaXNoUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncHVibGlzaCcsIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbChwdWJsaXNoUGFyYW1zKSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW0gKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIENsYWltIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpLCB0aW1lb3V0OiAyMCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW0nLCAnR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1MaXN0IChjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBjbGFpbV9saXN0IGZvciBcIiR7Y2xhaW1OYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2xhaW1fbGlzdCcsXG4gICAgICAgICAgcGFyYW1zOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW1MaXN0JywgJ0NMQUlNX0xJU1QnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZXNvbHZlVXJpICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUmVzb2x2aW5nIFVSSSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3Jlc29sdmUnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncmVzb2x2ZVVyaScsICdSRVNPTFZFJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdFt1cmldLmVycm9yKSB7ICAvLyBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgICAgICByZWplY3QoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHsgIC8vIGlmIG5vIGVycm9ycywgcmVzb2x2ZVxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdFt1cmldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldERvd25sb2FkRGlyZWN0b3J5ICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ2xicnlBcGkgPj4gUmV0cmlldmluZyB0aGUgZG93bmxvYWQgZGlyZWN0b3J5IHBhdGggZnJvbSBsYnJ5IGRhZW1vbi4uLicpO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3NldHRpbmdzX2dldCcsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldERvd25sb2FkRGlyZWN0b3J5JywgJ1NFVFRJTkdTX0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQuZG93bmxvYWRfZGlyZWN0b3J5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byBsYnJ5IGRhZW1vbiwgYnV0IHVuYWJsZSB0byByZXRyaWV2ZSB0aGUgZG93bmxvYWQgZGlyZWN0b3J5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0xicnluZXQgRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUoJy9ob21lL2xicnkvRG93bmxvYWRzLycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlQ2hhbm5lbCAobmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBDcmVhdGluZyBjaGFubmVsIGZvciAke25hbWV9Li4uYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2hhbm5lbF9uZXcnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgY2hhbm5lbF9uYW1lOiBuYW1lLFxuICAgICAgICAgICAgYW1vdW50ICAgICAgOiAwLjEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2NyZWF0ZUNoYW5uZWwnLCAnQ0hBTk5FTF9ORVcnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvbGJyeUFwaS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbi8vIGV4cG9ydCBhY3Rpb24gY3JlYXRvcnNcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgc2hvcnRJZCxcbiAgICAgIGxvbmdJZCxcbiAgICB9LFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2FjdGlvbnMvY2hhbm5lbC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhcic7XG5pbXBvcnQgSW5hY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhcic7XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiYXJzICAgICAgIDogW10sXG4gICAgICBpbmRleCAgICAgIDogMCxcbiAgICAgIGluY3JlbWVudGVyOiAxLFxuICAgIH07XG4gICAgdGhpcy5jcmVhdGVCYXJzID0gdGhpcy5jcmVhdGVCYXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyID0gdGhpcy5zdGFydFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhciA9IHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhciA9IHRoaXMuc3RvcFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuY3JlYXRlQmFycygpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNyZWF0ZUJhcnMgKCkge1xuICAgIGNvbnN0IGJhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnByb3BzLnNpemU7IGkrKykge1xuICAgICAgYmFycy5wdXNoKHtpc0FjdGl2ZTogZmFsc2V9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGJhcnMgfSk7XG4gIH1cbiAgc3RhcnRQcm9ncmVzc0JhciAoKSB7XG4gICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKSwgMzAwKTtcbiAgfTtcbiAgdXBkYXRlUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuaW5kZXg7XG4gICAgbGV0IGluY3JlbWVudGVyID0gdGhpcy5zdGF0ZS5pbmNyZW1lbnRlcjtcbiAgICBsZXQgYmFycyA9IHRoaXMuc3RhdGUuYmFycztcbiAgICAvLyBmbGlwIGluY3JlbWVudGVyIGlmIG5lY2Vzc2FyeSwgdG8gc3RheSBpbiBib3VuZHNcbiAgICBpZiAoKGluZGV4IDwgMCkgfHwgKGluZGV4ID4gdGhpcy5wcm9wcy5zaXplKSkge1xuICAgICAgaW5jcmVtZW50ZXIgPSBpbmNyZW1lbnRlciAqIC0xO1xuICAgICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB0aGUgaW5kZXhlZCBiYXJcbiAgICBpZiAoaW5jcmVtZW50ZXIgPiAwKSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgICAvLyBpbmNyZW1lbnQgaW5kZXhcbiAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGJhcnMsXG4gICAgICBpbmNyZW1lbnRlcixcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuICBzdG9wUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gIH07XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnN0YXRlLmJhcnMubWFwKChiYXIsIGluZGV4KSA9PiBiYXIuaXNBY3RpdmUgPyA8QWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9IC8+IDogPEluYWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9Lz4pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuUHJvZ3Jlc3NCYXIucHJvcFR5cGVzID0ge1xuICBzaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcblxuY2xhc3MgRXJyb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxwPntlcnJvcn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuRXJyb3JQYWdlLnByb3BUeXBlcyA9IHtcbiAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvRXJyb3JQYWdlL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnRcIlxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gTXlzcWxDb25maWcgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHtkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkfSA9IGNvbmZpZztcbiAgICB0aGlzLmRhdGFiYXNlID0gZGF0YWJhc2U7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IE15c3FsQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJmdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNsYWNrIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCB7IGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSkge1xuICAgIC8vIHZhbGlkYXRlIG5hbWVcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbmFtZSBmaWVsZCBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWROYW1lQ2hhcmFjdGVycyA9IC9bXkEtWmEtejAtOSwtXS8uZXhlYyhuYW1lKTtcbiAgICBpZiAoaW52YWxpZE5hbWVDaGFyYWN0ZXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjbGFpbSBuYW1lIHlvdSBwcm92aWRlZCBpcyBub3QgYWxsb3dlZC4gIE9ubHkgdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzIGFyZSBhbGxvd2VkOiBBLVosIGEteiwgMC05LCBhbmQgXCItXCInKTtcbiAgICB9XG4gICAgLy8gb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgIG5zZncgPSAobnNmdyA9PT0gJ3RydWUnKTtcbiAgICBsaWNlbnNlID0gbGljZW5zZSB8fCBudWxsO1xuICAgIHRpdGxlID0gdGl0bGUgfHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uIHx8IG51bGw7XG4gICAgdGh1bWJuYWlsID0gdGh1bWJuYWlsIHx8IG51bGw7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIG5zZncsXG4gICAgICBsaWNlbnNlLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHRodW1ibmFpbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgKHtmaWxlLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gbWFrZSBzdXJlIGEgZmlsZSB3YXMgcHJvdmlkZWRcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB3aXRoIGtleSBvZiBbZmlsZV0gZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5zaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZSBuYW1lXG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGVcbiAgICBtb2R1bGUuZXhwb3J0cy52YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZShmaWxlKTtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlTmFtZSAgICAgICAgIDogZmlsZS5uYW1lLFxuICAgICAgZmlsZVBhdGggICAgICAgICA6IGZpbGUucGF0aCxcbiAgICAgIGZpbGVUeXBlICAgICAgICAgOiBmaWxlLnR5cGUsXG4gICAgICB0aHVtYm5haWxGaWxlTmFtZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5uYW1lIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlUGF0aDogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5wYXRoIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlVHlwZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC50eXBlIDogbnVsbCksXG4gICAgfTtcbiAgfSxcbiAgdmFsaWRhdGVGaWxlVHlwZUFuZFNpemUgKGZpbGUpIHtcbiAgICAvLyBjaGVjayBmaWxlIHR5cGUgYW5kIHNpemVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmpwZWcvLmpwZy8ucG5nIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5naWYgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCAuZ2lmcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAubXA0IHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IHVucmVjb2duaXplZCBmaWxlIHR5cGUnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgJyArIGZpbGUudHlwZSArICcgY29udGVudCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuICBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlO1xuICB9LFxuICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMgKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0cyBmb3IgdGl0bGVcbiAgICBpZiAodGl0bGUgPT09IG51bGwgfHwgdGl0bGUudHJpbSgpID09PSAnJykge1xuICAgICAgdGl0bGUgPSBuYW1lO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGRlc2NyaXB0aW9uXG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSBudWxsIHx8IGRlc2NyaXB0aW9uLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gJyc7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgbGljZW5zZVxuICAgIGlmIChsaWNlbnNlID09PSBudWxsIHx8IGxpY2Vuc2UudHJpbSgpID09PSAnJykge1xuICAgICAgbGljZW5zZSA9ICcgJzsgIC8vIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nXG4gICAgfVxuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICBjb25zdCBwdWJsaXNoUGFyYW1zID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGZpbGVfcGF0aDogZmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgIH07XG4gICAgLy8gYWRkIHRodW1ibmFpbCB0byBjaGFubmVsIGlmIHZpZGVvXG4gICAgaWYgKHRodW1ibmFpbCkge1xuICAgICAgcHVibGlzaFBhcmFtc1snbWV0YWRhdGEnXVsndGh1bWJuYWlsJ10gPSB0aHVtYm5haWw7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaXNoUGFyYW1zO1xuICB9LFxuICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zICh0aHVtYm5haWxGaWxlUGF0aCwgY2xhaW1OYW1lLCBsaWNlbnNlLCBuc2Z3KSB7XG4gICAgaWYgKCF0aHVtYm5haWxGaWxlUGF0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFRodW1ibmFpbCBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUgICAgIDogYCR7Y2xhaW1OYW1lfS10aHVtYmAsXG4gICAgICBmaWxlX3BhdGg6IHRodW1ibmFpbEZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIHRpdGxlICAgICAgOiBgJHtjbGFpbU5hbWV9IHRodW1ibmFpbGAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgYSB0aHVtYm5haWwgZm9yICR7Y2xhaW1OYW1lfWAsXG4gICAgICAgIGF1dGhvciAgICAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZSAgIDogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgICBjaGFubmVsX25hbWUgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWwsXG4gICAgICBjaGFubmVsX2lkICAgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWxJZCxcbiAgICB9O1xuICB9LFxuICBkZWxldGVUZW1wb3JhcnlGaWxlIChmaWxlUGF0aCkge1xuICAgIGZzLnVubGluayhmaWxlUGF0aCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBlcnJvciBkZWxldGluZyB0ZW1wb3JhcnkgZmlsZSAke2ZpbGVQYXRofWApO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZGVidWcoYHN1Y2Nlc3NmdWxseSBkZWxldGVkICR7ZmlsZVBhdGh9YCk7XG4gICAgfSk7XG4gIH0sXG4gIGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIChmaWxlSW5mbywgZ2V0UmVzdWx0KSB7XG4gICAgZmlsZUluZm8uZmlsZU5hbWUgPSBnZXRSZXN1bHQuZmlsZV9uYW1lO1xuICAgIGZpbGVJbmZvLmZpbGVQYXRoID0gZ2V0UmVzdWx0LmRvd25sb2FkX3BhdGg7XG4gICAgcmV0dXJuIGZpbGVJbmZvO1xuICB9LFxuICBjcmVhdGVGaWxlRGF0YSAoeyBuYW1lLCBjbGFpbUlkLCBvdXRwb2ludCwgaGVpZ2h0LCBhZGRyZXNzLCBuc2Z3LCBjb250ZW50VHlwZSB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBjbGFpbUlkLFxuICAgICAgb3V0cG9pbnQsXG4gICAgICBoZWlnaHQsXG4gICAgICBhZGRyZXNzLFxuICAgICAgZmlsZU5hbWU6ICcnLFxuICAgICAgZmlsZVBhdGg6ICcnLFxuICAgICAgZmlsZVR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgbnNmdyxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVFcnJvclJlc3BvbnNlOiBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBvbiAke29yaWdpbmFsVXJsfWAsIG1vZHVsZS5leHBvcnRzLnVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyhlcnJvcikpO1xuICAgIGNvbnN0IFtzdGF0dXMsIG1lc3NhZ2VdID0gbW9kdWxlLmV4cG9ydHMucmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoc3RhdHVzKVxuICAgICAgLmpzb24obW9kdWxlLmV4cG9ydHMuY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQoc3RhdHVzLCBtZXNzYWdlKSk7XG4gIH0sXG4gIHJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1czogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgbGV0IHN0YXR1cywgbWVzc2FnZTtcbiAgICAvLyBjaGVjayBmb3IgZGFlbW9uIGJlaW5nIHR1cm5lZCBvZmZcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHN0YXR1cyA9IDUwMztcbiAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiByZWZ1c2VkLiAgVGhlIGRhZW1vbiBtYXkgbm90IGJlIHJ1bm5pbmcuJztcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gNDAwO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFtzdGF0dXMsIG1lc3NhZ2VdO1xuICB9LFxuICB1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXM6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBuZXdFcnJvck9iamVjdCA9IHt9O1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbmV3RXJyb3JPYmplY3Rba2V5XSA9IGVycltrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3RXJyb3JPYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH0sXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSwgY2xhaW1JZCkge1xuICAgIGlmIChjaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNoYW5uZWwoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNsYWltKG5hbWUsIGNsYWltSWQpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2xhaW0gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2xhaW0oJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DbGFpbS5nZXRMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltSWRCeUNoYW5uZWwgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDaGFubmVsKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSwgJHtjbGFpbU5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgaWRcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxJZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsSWQsIGRiLkNsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxJZCwgY2xhaW1OYW1lKV0pOyAgLy8gMi4gZ2V0IHRoZSBsb25nIGNsYWltIGlkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxJZCwgbG9uZ0NsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbERhdGEgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBzaG9ydENoYW5uZWxDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgICBzaG9ydENoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyhsb25nQ2hhbm5lbENsYWltSWQpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXldKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiBmb3JtYXQgdGhlIGRhdGEgZm9yIHRoZSB2aWV3LCBpbmNsdWRpbmcgcGFnaW5hdGlvblxuICAgICAgICAgIGxldCBwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEgPSByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheSwgcGFnZSk7XG4gICAgICAgICAgLy8gNC4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvbiBhbmQgY29udGVudHNcbiAgICAgICAgICByZXNvbHZlKHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldExvY2FsRmlsZVJlY29yZCAoY2xhaW1JZCwgbmFtZSkge1xuICAgIHJldHVybiBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7Y2xhaW1JZCwgbmFtZX19KVxuICAgICAgLnRoZW4oZmlsZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIHJldHVybiBOT19GSUxFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlLmRhdGFWYWx1ZXM7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnLi4vcmVhY3QvcmVkdWNlcnMnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uL3JlYWN0L2NvbnRhaW5lcnMvR0FMaXN0ZW5lcic7XG5pbXBvcnQgQXBwIGZyb20gJy4uL3JlYWN0L2FwcCc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZS5qcyc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoUmVkdWNlcik7XG5cbiAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgPEFwcCAvPlxuICAgICAgICA8L0dBTGlzdGVuZXI+XG4gICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xuXG4gIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gIGlmIChjb250ZXh0LnVybCkge1xuICAgIC8vIFNvbWV3aGVyZSBhIGA8UmVkaXJlY3Q+YCB3YXMgcmVuZGVyZWRcbiAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICB9IGVsc2Uge1xuICAgIC8vIHdlJ3JlIGdvb2QsIHNlbmQgdGhlIHJlc3BvbnNlXG4gIH1cblxuICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFB1Ymxpc2hSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3B1Ymxpc2gnO1xuaW1wb3J0IENoYW5uZWxSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL2NoYW5uZWwnO1xuaW1wb3J0IFNob3dSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3Nob3cnO1xuaW1wb3J0IFNpdGVSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3NpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICBjaGFubmVsOiBDaGFubmVsUmVkdWNlcixcbiAgcHVibGlzaDogUHVibGlzaFJlZHVjZXIsXG4gIHNob3cgICA6IFNob3dSZWR1Y2VyLFxuICBzaXRlICAgOiBTaXRlUmVkdWNlcixcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvcmVkdWNlcnMvaW5kZXguanMiLCJleHBvcnQgY29uc3QgRklMRV9TRUxFQ1RFRCA9ICdGSUxFX1NFTEVDVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0NMRUFSID0gJ0ZJTEVfQ0xFQVInO1xuZXhwb3J0IGNvbnN0IE1FVEFEQVRBX1VQREFURSA9ICdNRVRBREFUQV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IENMQUlNX1VQREFURSA9ICdDTEFJTV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFVF9QVUJMSVNIX0lOX0NIQU5ORUwgPSAnU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFUVVNfVVBEQVRFID0gJ1BVQkxJU0hfU1RBVFVTX1VQREFURSc7XG5leHBvcnQgY29uc3QgRVJST1JfVVBEQVRFID0gJ0VSUk9SX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VMRUNURURfQ0hBTk5FTF9VUERBVEUgPSAnU0VMRUNURURfQ0hBTk5FTF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9NRVRBREFUQV9JTlBVVFMgPSAnVE9HR0xFX01FVEFEQVRBX0lOUFVUUyc7XG5leHBvcnQgY29uc3QgVEhVTUJOQUlMX05FVyA9ICdUSFVNQk5BSUxfTkVXJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVJUID0gJ1BVQkxJU0hfU1RBUlQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPR0lOID0gJ0V4aXN0aW5nJztcbmV4cG9ydCBjb25zdCBDUkVBVEUgPSAnTmV3JztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMX1VQREFURSA9ICdDSEFOTkVMX1VQREFURSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9DQUxfQ0hFQ0sgPSAnTE9DQUxfQ0hFQ0snO1xuZXhwb3J0IGNvbnN0IFVOQVZBSUxBQkxFID0gJ1VOQVZBSUxBQkxFJztcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdFUlJPUic7XG5leHBvcnQgY29uc3QgQVZBSUxBQkxFID0gJ0FWQUlMQUJMRSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZTogeyBnb29nbGVBbmFseXRpY3NJZCB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBnb29nbGVBbmFseXRpY3NJZCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEhvbWVQYWdlIGZyb20gJ2NvbXBvbmVudHMvSG9tZVBhZ2UnO1xuaW1wb3J0IEFib3V0UGFnZSBmcm9tICdjb21wb25lbnRzL0Fib3V0UGFnZSc7XG5pbXBvcnQgTG9naW5QYWdlIGZyb20gJ2NvbnRhaW5lcnMvTG9naW5QYWdlJztcbmltcG9ydCBTaG93UGFnZSBmcm9tICdjb250YWluZXJzL1Nob3dQYWdlJztcbmltcG9ydCBGb3VyT2hGb3VyUGFnZSBmcm9tICdjb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlJztcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTd2l0Y2g+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXtIb21lUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvYWJvdXQnIGNvbXBvbmVudD17QWJvdXRQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9sb2dpbicgY29tcG9uZW50PXtMb2dpblBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzppZGVudGlmaWVyLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGNvbXBvbmVudD17Rm91ck9oRm91clBhZ2V9IC8+XG4gICAgPC9Td2l0Y2g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9hcHAuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgc2VsZWN0RmlsZSwgdXBkYXRlRXJyb3IsIGNsZWFyRmlsZSB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlICAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICB0aHVtYm5haWw6IHB1Ymxpc2gudGh1bWJuYWlsLFxuICAgIGZpbGVFcnJvcjogcHVibGlzaC5lcnJvci5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIHNlbGVjdEZpbGU6IChmaWxlKSA9PiB7XG4gICAgICBkaXNwYXRjaChzZWxlY3RGaWxlKGZpbGUpKTtcbiAgICB9LFxuICAgIHNldEZpbGVFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaChjbGVhckZpbGUoKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignZmlsZScsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Ecm9wem9uZS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICcuLi8uLi9hY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJleHBvcnQgY29uc3QgQ0hBTk5FTCA9ICdDSEFOTkVMJztcbmV4cG9ydCBjb25zdCBBU1NFVF9MSVRFID0gJ0FTU0VUX0xJVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0RFVEFJTFMgPSAnQVNTRVRfREVUQUlMUyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBmaWxlUmVxdWVzdGVkIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGVycm9yIGFuZCBzdGF0dXNcbiAgY29uc3QgZXJyb3IgID0gc2hvdy5kaXNwbGF5QXNzZXQuZXJyb3I7XG4gIGNvbnN0IHN0YXR1cyA9IHNob3cuZGlzcGxheUFzc2V0LnN0YXR1cztcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBlcnJvcixcbiAgICBzdGF0dXMsXG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25GaWxlUmVxdWVzdDogKG5hbWUsIGNsYWltSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKGZpbGVSZXF1ZXN0ZWQobmFtZSwgY2xhaW1JZCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkgPT4ge1xuICAvLyB0YWtlIHRoZSBodG1sIGFuZCBwcmVsb2FkZWRTdGF0ZSBhbmQgcmV0dXJuIHRoZSBmdWxsIHBhZ2VcbiAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIiBwcmVmaXg9XCJvZzogaHR0cDovL29ncC5tZS9ucyMgZmI6IGh0dHA6Ly9vZ3AubWUvbnMvZmIjXCI+XG4gICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vXCI+XG4gICAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIj5cbiAgICAgICAgICAgIDwhLS1oZWxtZXQtLT5cbiAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5saW5rLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICA8IS0tc3R5bGUgc2hlZXRzLS0+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL3Jlc2V0LmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9nZW5lcmFsLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9tZWRpYVF1ZXJpZXMuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8IS0tZ29vZ2xlIGZvbnQtLT5cbiAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMFwiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keSBpZD1cIm1haW4tYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyZWFjdC1hcHBcIiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPiR7aHRtbH08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNjcmlwdD5cbiAgICAgICAgICAgICAgICB3aW5kb3cuX19QUkVMT0FERURfU1RBVEVfXyA9ICR7SlNPTi5zdHJpbmdpZnkocHJlbG9hZGVkU3RhdGUpLnJlcGxhY2UoLzwvZywgJ1xcXFxcXHUwMDNjJyl9XG4gICAgICAgICAgICA8L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL2J1bmRsZS9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcbmNvbnN0IHsgcG9wdWxhdGVMb2NhbHNEb3RVc2VyLCBzZXJpYWxpemVTcGVlY2hVc2VyLCBkZXNlcmlhbGl6ZVNwZWVjaFVzZXIgfSA9IHJlcXVpcmUoJy4vaGVscGVycy9hdXRoSGVscGVycy5qcycpO1xuY29uc3QgY29va2llU2Vzc2lvbiA9IHJlcXVpcmUoJ2Nvb2tpZS1zZXNzaW9uJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuLy8gbG9nZ2luZyBkZXBlbmRlbmNpZXNcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU3BlZWNoU2VydmVyICh7IG15c3FsQ29uZmlnLCBzaXRlQ29uZmlnLCBzbGFja0NvbmZpZyB9KSB7XG4gIHRoaXMuc3RhcnQgPSAoKSA9PiB7XG4gICAgdGhpcy5jb25maWd1cmVDb25maWdGaWxlcygpO1xuICAgIHRoaXMuY29uZmlndXJlTG9nZ2luZygpO1xuICAgIHRoaXMuY29uZmlndXJlQXBwKCk7XG4gICAgdGhpcy5jb25maWd1cmVTZXJ2ZXIoKTtcbiAgICB0aGlzLnN0YXJ0U2VydmVyKCk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQ29uZmlnRmlsZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgbXlzcWxBcHBDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9teXNxbENvbmZpZy5qcycpO1xuICAgIG15c3FsQXBwQ29uZmlnLmNvbmZpZ3VyZShteXNxbENvbmZpZyk7XG4gICAgY29uc3Qgc2l0ZUFwcENvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbiAgICBzaXRlQXBwQ29uZmlnLmNvbmZpZ3VyZShzaXRlQ29uZmlnKTtcbiAgICB0aGlzLlBPUlQgPSBzaXRlQXBwQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgICBjb25zdCBzbGFja0FwcENvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL3NsYWNrQ29uZmlnLmpzJyk7XG4gICAgc2xhY2tBcHBDb25maWcuY29uZmlndXJlKHNsYWNrQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVMb2dnaW5nID0gKCkgPT4ge1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVMb2dnZXIuanMnKShsb2dnZXIpO1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVTbGFjay5qcycpKGxvZ2dlcik7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQXBwID0gKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTsgLy8gY3JlYXRlIGFuIEV4cHJlc3MgYXBwbGljYXRpb25cblxuICAgIC8vIHRydXN0IHRoZSBwcm94eSB0byBnZXQgaXAgYWRkcmVzcyBmb3IgdXNcbiAgICBhcHAuZW5hYmxlKCd0cnVzdCBwcm94eScpO1xuXG4gICAgLy8gYWRkIG1pZGRsZXdhcmVcbiAgICBhcHAudXNlKGhlbG1ldCgpKTsgLy8gc2V0IEhUVFAgaGVhZGVycyB0byBwcm90ZWN0IGFnYWluc3Qgd2VsbC1rbm93biB3ZWIgdnVsbmVyYWJpbHRpZXNcbiAgICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKGAke19fZGlybmFtZX0vcHVibGljYCkpOyAvLyAnZXhwcmVzcy5zdGF0aWMnIHRvIHNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIHB1YmxpYyBkaXJlY3RvcnlcbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi9qc29uXG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7IC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHsgIC8vIGN1c3RvbSBsb2dnaW5nIG1pZGRsZXdhcmUgdG8gbG9nIGFsbCBpbmNvbWluZyBodHRwIHJlcXVlc3RzXG4gICAgICBsb2dnZXIudmVyYm9zZShgUmVxdWVzdCBvbiAke3JlcS5vcmlnaW5hbFVybH0gZnJvbSAke3JlcS5pcH1gKTtcbiAgICAgIG5leHQoKTtcbiAgICB9KTtcblxuICAgIC8vIGNvbmZpZ3VyZSBwYXNzcG9ydFxuICAgIHBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoc2VyaWFsaXplU3BlZWNoVXNlcik7XG4gICAgcGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGRlc2VyaWFsaXplU3BlZWNoVXNlcik7XG4gICAgY29uc3QgbG9jYWxTaWdudXBTdHJhdGVneSA9IHJlcXVpcmUoJy4vcGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzJyk7XG4gICAgY29uc3QgbG9jYWxMb2dpblN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9wYXNzcG9ydC9sb2NhbC1sb2dpbi5qcycpO1xuICAgIHBhc3Nwb3J0LnVzZSgnbG9jYWwtc2lnbnVwJywgbG9jYWxTaWdudXBTdHJhdGVneSk7XG4gICAgcGFzc3BvcnQudXNlKCdsb2NhbC1sb2dpbicsIGxvY2FsTG9naW5TdHJhdGVneSk7XG4gICAgLy8gaW5pdGlhbGl6ZSBwYXNzcG9ydFxuICAgIGFwcC51c2UoY29va2llU2Vzc2lvbih7XG4gICAgICBuYW1lICA6ICdzZXNzaW9uJyxcbiAgICAgIGtleXMgIDogW3NpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBtaWRkbGV3YXJlIHRvIHBhc3MgdXNlciBpbmZvIGJhY2sgdG8gY2xpZW50IChmb3IgaGFuZGxlYmFycyBhY2Nlc3MpLCBpZiB1c2VyIGlzIGxvZ2dlZCBpblxuICAgIGFwcC51c2UocG9wdWxhdGVMb2NhbHNEb3RVc2VyKTsgIC8vIG5vdGU6IEkgZG9uJ3QgdGhpbmsgSSBuZWVkIHRoaXMgYW55IG1vcmU/XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2Utcm91dGVzLmpzJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9zZXJ2ZS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcycpKGFwcCk7XG5cbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTZXJ2ZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBodHRwLlNlcnZlcih0aGlzLmFwcCk7XG4gIH07XG4gIHRoaXMuc3RhcnRTZXJ2ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZGIgPSByZXF1aXJlKCcuL21vZGVscycpO1xuICAgIC8vIHN5bmMgc2VxdWVsaXplXG4gICAgZGIuc2VxdWVsaXplLnN5bmMoKVxuICAgICAgLy8gc3RhcnQgdGhlIHNlcnZlclxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNlcnZlci5saXN0ZW4odGhpcy5QT1JULCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZlciBpcyBsaXN0ZW5pbmcgb24gUE9SVCAke3RoaXMuUE9SVH1gKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFN0YXJ0dXAgRXJyb3I6YCwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwZWVjaFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwb3B1bGF0ZUxvY2Fsc0RvdFVzZXIgKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgaWYgKHJlcS51c2VyKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ3BvcHVsYXRpbmcgcmVzLmxvY2Fscy51c2VyJyk7XG4gICAgICByZXMubG9jYWxzLnVzZXIgPSB7XG4gICAgICAgIGlkICAgICAgICAgICAgOiByZXEudXNlci5pZCxcbiAgICAgICAgdXNlck5hbWUgICAgICA6IHJlcS51c2VyLnVzZXJOYW1lLFxuICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgfTtcbiAgICB9XG4gICAgbmV4dCgpO1xuICB9LFxuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGxvZ2dlci5kZWJ1Zygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBsb2dnZXIuZGVidWcoJ2Rlc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9hdXRoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1zZXNzaW9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXNlc3Npb25cIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImh0dHBcIlxuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBsb2dMZXZlbCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL2xvZ2dlckNvbmZpZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh3aW5zdG9uKSA9PiB7XG4gIC8vIGNvbmZpZ3VyZVxuICB3aW5zdG9uLmNvbmZpZ3VyZSh7XG4gICAgdHJhbnNwb3J0czogW1xuICAgICAgbmV3ICh3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgICBsZXZlbCAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsb2dMZXZlbCxcbiAgICAgICAgdGltZXN0YW1wICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIGNvbG9yaXplICAgICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgIHByZXR0eVByaW50ICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgIGhhbmRsZUV4Y2VwdGlvbnMgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgIGh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb246IHRydWUsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcbiAgLy8gdGVzdCBhbGwgdGhlIGxvZyBsZXZlbHNcbiAgd2luc3Rvbi5lcnJvcignTGV2ZWwgMCcpO1xuICB3aW5zdG9uLndhcm4oJ0xldmVsIDEnKTtcbiAgd2luc3Rvbi5pbmZvKCdMZXZlbCAyJyk7XG4gIHdpbnN0b24udmVyYm9zZSgnTGV2ZWwgMycpO1xuICB3aW5zdG9uLmRlYnVnKCdMZXZlbCA0Jyk7XG4gIHdpbnN0b24uc2lsbHkoJ0xldmVsIDUnKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcyIsImNvbnN0IGxvZ2dlckNvbmZpZyA9IHtcbiAgbG9nTGV2ZWw6ICdkZWJ1ZycsICAvLyBvcHRpb25zOiBzaWxseSwgZGVidWcsIHZlcmJvc2UsIGluZm9cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nZ2VyQ29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZy9zbGFja0NvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh3aW5zdG9uKSA9PiB7XG4gIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IHNsYWNrQ29uZmlnO1xuICBpZiAoc2xhY2tXZWJIb29rKSB7XG4gICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICBpZiAoc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgIHdlYmhvb2tVcmw6IHNsYWNrV2ViSG9vayxcbiAgICAgICAgY2hhbm5lbCAgIDogc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgd2ViaG9va1VybDogc2xhY2tXZWJIb29rLFxuICAgICAgICBjaGFubmVsICAgOiBzbGFja0luZm9DaGFubmVsLFxuICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlXG4gICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gIH0gZWxzZSB7XG4gICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzL2NvbmZpZ3VyZVNsYWNrLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCJcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Bhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBDaGFubmVsID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2hhbm5lbCcsXG4gICAge1xuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDaGFubmVsLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDaGFubmVsLmJlbG9uZ3NUbyhkYi5Vc2VyKTtcbiAgICBDaGFubmVsLmhhc09uZShkYi5DZXJ0aWZpY2F0ZSk7XG4gIH07XG5cbiAgcmV0dXJuIENoYW5uZWw7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tb2RlbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIFRFWFQgfSkgPT4ge1xuICBjb25zdCBSZXF1ZXN0ID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnUmVxdWVzdCcsXG4gICAge1xuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpcEFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgUmVxdWVzdC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgUmVxdWVzdC5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSZXF1ZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSBmb3Igc2lnbiB1cFxuICBhcHAucG9zdCgnL3NpZ251cCcsIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtc2lnbnVwJyksIChyZXEsIHJlcykgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBzdWNjZXNzZnVsIHNpZ251cCBmb3IgJHtyZXEudXNlci5jaGFubmVsTmFtZX1gKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIGZvciBsb2cgaW5cbiAgYXBwLnBvc3QoJy9sb2dpbicsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtbG9naW4nLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgICBsb2dnZXIuZGVidWcoJ2luZm86JywgaW5mbyk7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICB9XG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKCdzdWNjZXNzZnVsIGxvZ2luJyk7XG4gICAgICByZXEubG9nSW4odXNlciwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKHJlcSwgcmVzLCBuZXh0KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGxvZyBvdXRcbiAgYXBwLmdldCgnL2xvZ291dCcsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcS5sb2dvdXQoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3lvdSBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCd9KTtcbiAgfSk7XG4gIC8vIHNlZSBpZiB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQsIGFuZCByZXR1cm4gY3JlZGVudGlhbHMgaWYgc29cbiAgYXBwLmdldCgnL3VzZXInLCAocmVxLCByZXMpID0+IHtcbiAgICBpZiAocmVxLnVzZXIpIHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEudXNlcn0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICd1c2VyIGlzIG5vdCBsb2dnZWQgaW4nfSk7XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyB1cGxvYWREaXJlY3RvcnkgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gbXVsdGlwYXJ0KHt1cGxvYWREaXI6IHVwbG9hZERpcmVjdG9yeX0pO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSwgcHVibGlzaCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgZ2V0Q2xhaW1MaXN0LCByZXNvbHZlVXJpLCBnZXRDbGFpbSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhLCBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCBlcnJvckhhbmRsZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCcuLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzJyk7XG5jb25zdCB7IGdldENoYW5uZWxEYXRhLCBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkobmFtZSlcbiAgICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNob3J0SWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvZGF0YS86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gICAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICAgIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICAgIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBydW4gYSBjbGFpbV9saXN0IHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgICAudGhlbihjbGFpbXNMaXN0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGdldCBhbiBhc3NldFxuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0obmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgICAgaWYgKCFyZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmlsZURhdGEgPSBjcmVhdGVGaWxlRGF0YShyZXNvbHZlUmVzdWx0KTtcbiAgICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZURhdGEsIHtuYW1lLCBjbGFpbUlkfSwgJ0ZpbGUnKSwgZ2V0UmVzdWx0XSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2UsIGNvbXBsZXRlZCB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9yZXNvbHZlLzpuYW1lLzpjbGFpbUlkJywgKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgICAgLnRoZW4ocmVzb2x2ZWRVcmkgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHJ1biBhIHB1Ymxpc2ggcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCAoeyBib2R5LCBmaWxlcywgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCB1c2VyIH0sIHJlcykgPT4ge1xuICAgIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAgIC8vIHJlY29yZCB0aGUgc3RhcnQgdGltZSBvZiB0aGUgcmVxdWVzdFxuICAgIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgICB0cnkge1xuICAgICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAgICh7ZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZX0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMoZmlsZXMpKTtcbiAgICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIGF1dGhlbnRpY2F0ZVVzZXIoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSxcbiAgICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpLFxuICAgICAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCksXG4gICAgICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zKHRodW1ibmFpbEZpbGVQYXRoLCBuYW1lLCBsaWNlbnNlLCBuc2Z3KSxcbiAgICBdKVxuICAgICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICAgIHB1Ymxpc2godGh1bWJuYWlsUHVibGlzaFBhcmFtcywgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgICByZXR1cm4gcHVibGlzaChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICAgIGRhdGEgICA6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgICB1cmwgICAgOiBgJHtob3N0fS8ke3Jlc3VsdC5jbGFpbV9pZH0vJHtuYW1lfWAsXG4gICAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL2xvbmctaWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2JvZHk6JywgYm9keSk7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICAgIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgICBjb25zdCBjbGFpbU5hbWUgPSBib2R5LmNsYWltTmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gICAgbGV0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oY2xhaW1JbmZvID0+IHtcbiAgICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcbiAgYXBwLmdldCgnL2FwaS9maWxlL2F2YWlsYWJpbGl0eS86bmFtZS86Y2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgZGIuRmlsZS5maW5kT25lKHt3aGVyZToge25hbWUsIGNsYWltSWR9fSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yb3V0ZXMvYXBpLXJvdXRlcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbXVsdGlwYXJ0eVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe3doZXJlOiB7Y2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aGVudGljYXRlVXNlciAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSB7XG4gICAgLy8gY2FzZTogbm8gY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgKGFub255bW91cyksIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB1c2VyIHRva2VuIGlzIHByb3ZpZGVkXG4gICAgaWYgKCFjaGFubmVsTmFtZSAmJiAhY2hhbm5lbElkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogbnVsbCxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHVzZXIgdG9rZW5cbiAgICBpZiAodXNlcikge1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxOYW1lICE9PSB1c2VyLmNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgbmFtZSBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbm5lbElkICYmIGNoYW5uZWxJZCAhPT0gdXNlci5jaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIGlkIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiB1c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogdXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggcGFzc3dvcmQgaW5zdGVhZCBvZiB1c2VyIHRva2VuXG4gICAgaWYgKCFjaGFubmVsUGFzc3dvcmQpIHRocm93IG5ldyBFcnJvcignbm8gY2hhbm5lbCBwYXNzd29yZCBwcm92aWRlZCcpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5hdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkKTtcbiAgfSxcbiAgYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCB1c2VyUGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gaG9pc3RlZCB2YXJpYWJsZXNcbiAgICAgIGxldCBjaGFubmVsRGF0YTtcbiAgICAgIC8vIGJ1aWxkIHRoZSBwYXJhbXMgZm9yIGZpbmRpbmcgdGhlIGNoYW5uZWxcbiAgICAgIGxldCBjaGFubmVsRmluZFBhcmFtcyA9IHt9O1xuICAgICAgaWYgKGNoYW5uZWxOYW1lKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgaWYgKGNoYW5uZWxJZCkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsSWQ7XG4gICAgICAvLyBmaW5kIHRoZSBjaGFubmVsXG4gICAgICBkYi5DaGFubmVsXG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogY2hhbm5lbEZpbmRQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyBjaGFubmVsIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hhbm5lbERhdGEgPSBjaGFubmVsLmdldCgpO1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBkYXRhOicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGIuVXNlci5maW5kT25lKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IHVzZXJOYW1lOiBjaGFubmVsRGF0YS5jaGFubmVsTmFtZS5zdWJzdHJpbmcoMSkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQodXNlclBhc3N3b3JkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnLi4ucGFzc3dvcmQgd2FzIGEgbWF0Y2guLi4nKTtcbiAgICAgICAgICByZXNvbHZlKGNoYW5uZWxEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgQ0xBSU1TX1BFUl9QQUdFID0gMTI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjbGFpbXMsIHBhZ2UpIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxQYWdlcyhjbGFpbXMpO1xuICAgIGNvbnN0IHBhZ2luYXRpb25QYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0UGFnZUZyb21RdWVyeShwYWdlKTtcbiAgICBjb25zdCB2aWV3RGF0YSA9IHtcbiAgICAgIGNoYW5uZWxOYW1lICAgICAgIDogY2hhbm5lbE5hbWUsXG4gICAgICBsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltcyAgICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zKGNsYWltcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgcHJldmlvdXNQYWdlICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVQcmV2aW91c1BhZ2UocGFnaW5hdGlvblBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgICAgICAgOiBwYWdpbmF0aW9uUGFnZSxcbiAgICAgIG5leHRQYWdlICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lTmV4dFBhZ2UodG90YWxQYWdlcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgdG90YWxQYWdlcyAgICAgICAgOiB0b3RhbFBhZ2VzLFxuICAgICAgdG90YWxSZXN1bHRzICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbENsYWltcyhjbGFpbXMpLFxuICAgIH07XG4gICAgcmV0dXJuIHZpZXdEYXRhO1xuICB9LFxuICBnZXRQYWdlRnJvbVF1ZXJ5IChwYWdlKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH0sXG4gIGV4dHJhY3RQYWdlRnJvbUNsYWltcyAoY2xhaW1zLCBwYWdlTnVtYmVyKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiBbXTsgIC8vIGlmIG5vIGNsYWltcywgcmV0dXJuIHRoaXMgZGVmYXVsdFxuICAgIH1cbiAgICAvLyBsb2dnZXIuZGVidWcoJ2NsYWltcyBpcyBhcnJheT8nLCBBcnJheS5pc0FycmF5KGNsYWltcykpO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZyhgcGFnZU51bWJlciAke3BhZ2VOdW1iZXJ9IGlzIG51bWJlcj9gLCBOdW1iZXIuaXNJbnRlZ2VyKHBhZ2VOdW1iZXIpKTtcbiAgICBjb25zdCBjbGFpbVN0YXJ0SW5kZXggPSAocGFnZU51bWJlciAtIDEpICogQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IGNsYWltRW5kSW5kZXggPSBjbGFpbVN0YXJ0SW5kZXggKyBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgcGFnZU9mQ2xhaW1zID0gY2xhaW1zLnNsaWNlKGNsYWltU3RhcnRJbmRleCwgY2xhaW1FbmRJbmRleCk7XG4gICAgcmV0dXJuIHBhZ2VPZkNsYWltcztcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxQYWdlcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3RhbENsYWltcyA9IGNsYWltcy5sZW5ndGg7XG4gICAgICBpZiAodG90YWxDbGFpbXMgPCBDTEFJTVNfUEVSX1BBR0UpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBjb25zdCBmdWxsUGFnZXMgPSBNYXRoLmZsb29yKHRvdGFsQ2xhaW1zIC8gQ0xBSU1TX1BFUl9QQUdFKTtcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHRvdGFsQ2xhaW1zICUgQ0xBSU1TX1BFUl9QQUdFO1xuICAgICAgaWYgKHJlbWFpbmRlciA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnVsbFBhZ2VzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bGxQYWdlcyArIDE7XG4gICAgfVxuICB9LFxuICBkZXRlcm1pbmVQcmV2aW91c1BhZ2UgKGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlIC0gMTtcbiAgfSxcbiAgZGV0ZXJtaW5lTmV4dFBhZ2UgKHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlICsgMTtcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxDbGFpbXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGNsYWltcy5sZW5ndGg7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IHsgZGV0YWlsczogaG9zdCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSBmb3IgdGhlIGhvbWUgcGFnZVxuICBhcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGxvZ2luIHBhZ2VcbiAgYXBwLmdldCgnL2xvZ2luJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBzaG93ICdhYm91dCcgcGFnZVxuICBhcHAuZ2V0KCcvYWJvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB0cmVuZGluZyBpbWFnZXNcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KCcvcG9wdWxhcicpO1xuICB9KTtcbiAgYXBwLmdldCgnL3BvcHVsYXInLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB0cmVuZGluZyBpbWFnZXNcbiAgYXBwLmdldCgnL25ldycsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2VuZCBlbWJlZGFibGUgdmlkZW8gcGxheWVyIChmb3IgdHdpdHRlcilcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgLy8gZ2V0IGFuZCByZW5kZXIgdGhlIGNvbnRlbnRcbiAgICByZXMuc3RhdHVzKDIwMCkucmVuZGVyKCdlbWJlZCcsIHsgbGF5b3V0OiAnZW1iZWQnLCBob3N0LCBjbGFpbUlkLCBuYW1lIH0pO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yb3V0ZXMvcGFnZS1yb3V0ZXMuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0dJTiB9IGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcyc7XG5jb25zdCB7IHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGlzYWJsZWQgICAgICAgICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkLFxuICBkaXNhYmxlZE1lc3NhZ2UgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWRNZXNzYWdlLFxuICBwdWJsaXNoSW5DaGFubmVsICA6IGZhbHNlLFxuICBzZWxlY3RlZENoYW5uZWwgICA6IExPR0lOLFxuICBzaG93TWV0YWRhdGFJbnB1dHM6IGZhbHNlLFxuICBzdGF0dXMgICAgICAgICAgICA6IHtcbiAgICBzdGF0dXMgOiBudWxsLFxuICAgIG1lc3NhZ2U6IG51bGwsXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgZmlsZSAgICAgICAgIDogbnVsbCxcbiAgICB1cmwgICAgICAgICAgOiBudWxsLFxuICAgIGNoYW5uZWwgICAgICA6IG51bGwsXG4gICAgcHVibGlzaFN1Ym1pdDogbnVsbCxcbiAgfSxcbiAgZmlsZSAgICA6IG51bGwsXG4gIGNsYWltICAgOiAnJyxcbiAgbWV0YWRhdGE6IHtcbiAgICB0aXRsZSAgICAgIDogJycsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGxpY2Vuc2UgICAgOiAnJyxcbiAgICBuc2Z3ICAgICAgIDogZmFsc2UsXG4gIH0sXG4gIHRodW1ibmFpbDogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9TRUxFQ1RFRDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpbml0aWFsU3RhdGUsIHsgIC8vIG5vdGU6IGNsZWFycyB0byBpbml0aWFsIHN0YXRlXG4gICAgICAgIGZpbGU6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgYWN0aW9ucy5NRVRBREFUQV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbWV0YWRhdGE6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLm1ldGFkYXRhLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0xBSU1fVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNsYWltOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw6IGFjdGlvbi5jaGFubmVsLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkVSUk9SX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBlcnJvcjogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZXJyb3IsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRUxFQ1RFRF9DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZWxlY3RlZENoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFM6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2hvd01ldGFkYXRhSW5wdXRzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5USFVNQk5BSUxfTkVXOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHRodW1ibmFpbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxvZ2dlZEluQ2hhbm5lbDoge1xuICAgIG5hbWUgICA6IG51bGwsXG4gICAgc2hvcnRJZDogbnVsbCxcbiAgICBsb25nSWQgOiBudWxsLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnZWRJbkNoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvcmVkdWNlcnMvY2hhbm5lbC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBFUlJPUiB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcmVxdWVzdDoge1xuICAgIGVycm9yOiBudWxsLFxuICAgIHR5cGUgOiBudWxsLFxuICAgIGlkICAgOiBudWxsLFxuICB9LFxuICByZXF1ZXN0TGlzdCA6IHt9LFxuICBjaGFubmVsTGlzdCA6IHt9LFxuICBhc3NldExpc3QgICA6IHt9LFxuICBkaXNwbGF5QXNzZXQ6IHtcbiAgICBlcnJvciA6IG51bGwsXG4gICAgc3RhdHVzOiBMT0NBTF9DSEVDSyxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvLyBoYW5kbGUgcmVxdWVzdFxuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICB0eXBlOiBhY3Rpb24uZGF0YS5yZXF1ZXN0VHlwZSxcbiAgICAgICAgICBpZCAgOiBhY3Rpb24uZGF0YS5yZXF1ZXN0SWQsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gc3RvcmUgcmVxdWVzdHNcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0TGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBrZXkgIDogYWN0aW9uLmRhdGEua2V5LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gYXNzZXQgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5BU1NFVF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgYXNzZXRMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hc3NldExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvciAgICA6IGFjdGlvbi5kYXRhLmVycm9yLFxuICAgICAgICAgICAgbmFtZSAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgOiBhY3Rpb24uZGF0YS5jbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRJZCAgOiBhY3Rpb24uZGF0YS5zaG9ydElkLFxuICAgICAgICAgICAgY2xhaW1EYXRhOiBhY3Rpb24uZGF0YS5jbGFpbURhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBjaGFubmVsIGRhdGFcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgbmFtZSAgICAgIDogYWN0aW9uLmRhdGEubmFtZSxcbiAgICAgICAgICAgIGxvbmdJZCAgICA6IGFjdGlvbi5kYXRhLmxvbmdJZCxcbiAgICAgICAgICAgIHNob3J0SWQgICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbXNEYXRhOiBhY3Rpb24uZGF0YS5jbGFpbXNEYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNoYW5uZWxMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3RbYWN0aW9uLmRhdGEuY2hhbm5lbExpc3RJZF0sIHtcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gZGlzcGxheSBhbiBhc3NldFxuICAgIGNhc2UgYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5ESVNQTEFZX0FTU0VUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlBc3NldDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGlzcGxheUFzc2V0LCB7XG4gICAgICAgICAgZXJyb3IgOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgICBzdGF0dXM6IEVSUk9SLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L3JlZHVjZXJzL3Nob3cuanMiLCJjb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qge1xuICBhbmFseXRpY3M6IHtcbiAgICBnb29nbGVJZDogZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIH0sXG4gIGFzc2V0RGVmYXVsdHM6IHtcbiAgICB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwsXG4gICAgZGVzY3JpcHRpb246IGRlZmF1bHREZXNjcmlwdGlvbixcbiAgfSxcbiAgZGV0YWlsczoge1xuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gICAgdHdpdHRlcixcbiAgfSxcbn0gPSBzaXRlQ29uZmlnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRlc2NyaXB0aW9uLFxuICBnb29nbGVBbmFseXRpY3NJZCxcbiAgaG9zdCxcbiAgdGl0bGUsXG4gIHR3aXR0ZXIsXG4gIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgZGVmYXVsdFRodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9yZWR1Y2Vycy9zaXRlLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBHb29nbGVBbmFseXRpY3MgZnJvbSAncmVhY3QtZ2EnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBHQUxpc3RlbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2VuZFBhZ2VWaWV3KHRoaXMucHJvcHMuaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdGhpcy5wcm9wcy5oaXN0b3J5Lmxpc3Rlbih0aGlzLnNlbmRQYWdlVmlldyk7XG4gIH1cblxuICBzZW5kUGFnZVZpZXcgKGxvY2F0aW9uKSB7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnNldCh7IHBhZ2U6IGxvY2F0aW9uLnBhdGhuYW1lIH0pO1xuICAgIEdvb2dsZUFuYWx5dGljcy5wYWdldmlldyhsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIC8vIGluaXRpYXRlIGFuYWx5dGljc1xuICAgIGNvbnN0IHsgZ29vZ2xlQW5hbHl0aWNzSWQgfSA9IHRoaXMucHJvcHM7XG4gICAgR29vZ2xlQW5hbHl0aWNzLmluaXRpYWxpemUoZ29vZ2xlQW5hbHl0aWNzSWQpO1xuICAgIC8vIHJldHVybiBjaGlsZHJlblxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoR0FMaXN0ZW5lcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0dBTGlzdGVuZXIvdmlldy5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1nYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWdhXCJcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IFB1Ymxpc2hUb29sIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRvb2wnO1xuXG5jbGFzcyBIb21lUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uJ30+XG4gICAgICAgIDxTRU8gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbid9PlxuICAgICAgICAgIDxQdWJsaXNoVG9vbCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWVQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29tcG9uZW50cy9Ib21lUGFnZS9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgY3JlYXRlUGFnZVRpdGxlIH0gZnJvbSAndXRpbHMvcGFnZVRpdGxlJztcbmltcG9ydCB7IGNyZWF0ZU1ldGFUYWdzIH0gZnJvbSAndXRpbHMvbWV0YVRhZ3MnO1xuaW1wb3J0IHsgY3JlYXRlQ2Fub25pY2FsTGluayB9IGZyb20gJ3V0aWxzL2Nhbm9uaWNhbExpbmsnO1xuXG5jbGFzcyBTRU8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIC8vIHByb3BzIGZyb20gc3RhdGVcbiAgICBjb25zdCB7IGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBwcm9wcyBmcm9tIHBhcmVudFxuICAgIGNvbnN0IHsgYXNzZXQsIGNoYW5uZWwsIHBhZ2VVcmkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHsgcGFnZVRpdGxlIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNyZWF0ZSBwYWdlIHRpdGxlLCB0YWdzLCBhbmQgY2Fub25pY2FsIGxpbmtcbiAgICBwYWdlVGl0bGUgPSBjcmVhdGVQYWdlVGl0bGUoc2l0ZVRpdGxlLCBwYWdlVGl0bGUpO1xuICAgIGNvbnN0IG1ldGFUYWdzID0gY3JlYXRlTWV0YVRhZ3Moc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgY29uc3QgY2Fub25pY2FsTGluayA9IGNyZWF0ZUNhbm9uaWNhbExpbmsoYXNzZXQsIGNoYW5uZWwsIHBhZ2VVcmksIHNpdGVIb3N0KTtcbiAgICAvLyByZW5kZXIgcmVzdWx0c1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0XG4gICAgICAgIHRpdGxlPXtwYWdlVGl0bGV9XG4gICAgICAgIG1ldGE9e21ldGFUYWdzfVxuICAgICAgICBsaW5rPXtbe3JlbDogJ2Nhbm9uaWNhbCcsIGhyZWY6IGNhbm9uaWNhbExpbmt9XX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcblxuU0VPLnByb3BUeXBlcyA9IHtcbiAgcGFnZVRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwYWdlVXJpICA6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoYW5uZWwgIDogUHJvcFR5cGVzLm9iamVjdCxcbiAgYXNzZXQgICAgOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU0VPO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29tcG9uZW50cy9TRU8vdmlldy5qc3giLCJleHBvcnQgY29uc3QgY3JlYXRlUGFnZVRpdGxlID0gKHNpdGVUaXRsZSwgcGFnZVRpdGxlKSA9PiB7XG4gIGlmICghcGFnZVRpdGxlKSB7XG4gICAgcmV0dXJuIGAke3NpdGVUaXRsZX1gO1xuICB9XG4gIHJldHVybiBgJHtzaXRlVGl0bGV9IC0gJHtwYWdlVGl0bGV9YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC91dGlscy9wYWdlVGl0bGUuanMiLCJjb25zdCBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gKHRodW1ibmFpbCkgPT4ge1xuICBpZiAodGh1bWJuYWlsKSB7XG4gICAgY29uc3QgZmlsZUV4dCA9IHRodW1ibmFpbC5zdWJzdHJpbmcodGh1bWJuYWlsLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIHN3aXRjaCAoZmlsZUV4dCkge1xuICAgICAgY2FzZSAnanBlZyc6XG4gICAgICBjYXNlICdqcGcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgICAgY2FzZSAncG5nJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9wbmcnO1xuICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9naWYnO1xuICAgICAgY2FzZSAnbXA0JzpcbiAgICAgICAgcmV0dXJuICd2aWRlby9tcDQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuY29uc3QgY3JlYXRlQmFzaWNNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKSA9PiB7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNpdGVIb3N0fSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogc2l0ZURlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxNZXRhVGFncyA9IChzaXRlVGl0bGUsIHNpdGVIb3N0LCBzaXRlVHdpdHRlciwgY2hhbm5lbCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IGAke25hbWV9IG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBgJHtuYW1lfSwgYSBjaGFubmVsIG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YSB9ID0gYXNzZXQ7XG4gIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGNsYWltRGF0YTtcbiAgY29uc3QgZW1iZWRVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzaG93VXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc291cmNlID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9LiR7Y2xhaW1EYXRhLmZpbGVFeHR9YDtcbiAgY29uc3Qgb2dUaXRsZSA9IGNsYWltRGF0YS50aXRsZSB8fCBjbGFpbURhdGEubmFtZTtcbiAgY29uc3Qgb2dEZXNjcmlwdGlvbiA9IGNsYWltRGF0YS5kZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb247XG4gIGNvbnN0IG9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlKGNsYWltRGF0YS50aHVtYm5haWwpO1xuICBjb25zdCBvZ1RodW1ibmFpbCA9IGNsYWltRGF0YS50aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbDtcbiAgY29uc3QgbWV0YVRhZ3MgPSBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBvZ1RpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaG93VXJsfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogb2dEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6d2lkdGgnLCBjb250ZW50OiA2MDB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOmhlaWdodCcsIGNvbnRlbnQ6IDMxNX0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICBdO1xuICBpZiAoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnIHx8IGNvbnRlbnRUeXBlID09PSAndmlkZW8vd2VibScpIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzpzZWN1cmVfdXJsJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogb2dUaHVtYm5haWx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBvZ1RodW1ibmFpbENvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ3ZpZGVvJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3BsYXllcid9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyJywgY29udGVudDogZW1iZWRVcmx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOndpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnRleHQ6cGxheWVyX3dpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpoZWlnaHQnLCBjb250ZW50OiAzMzd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtOmNvbnRlbnRfdHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gIH0gZWxzZSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ2FydGljbGUnfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeV9sYXJnZV9pbWFnZSd9KTtcbiAgfVxuICByZXR1cm4gbWV0YVRhZ3M7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTWV0YVRhZ3MgPSAoc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIH07XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgY2hhbm5lbCk7XG4gIH07XG4gIHJldHVybiBjcmVhdGVCYXNpY01ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L3V0aWxzL21ldGFUYWdzLmpzIiwiY29uc3QgY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rID0gKHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtwYWdlfWA7XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsgPSAoYXNzZXQsIHNpdGVIb3N0KSA9PiB7XG4gIGxldCBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZDtcbiAgaWYgKGFzc2V0LmNsYWltRGF0YSkge1xuICAgICh7IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGEpO1xuICB9O1xuICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2hhbm5lbE5hbWV9OiR7Y2VydGlmaWNhdGVJZH0vJHtuYW1lfWA7XG4gIH07XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rID0gKGNoYW5uZWwsIHNpdGVIb3N0KSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBjaGFubmVsLCBwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rKGFzc2V0LCBzaXRlSG9zdCk7XG4gIH1cbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsoY2hhbm5lbCwgc2l0ZUhvc3QpO1xuICB9XG4gIHJldHVybiBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsocGFnZSwgc2l0ZUhvc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2TGluaywgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IExvZ28gZnJvbSAnY29tcG9uZW50cy9Mb2dvJztcbmltcG9ydCBOYXZCYXJDaGFubmVsRHJvcGRvd24gZnJvbSAnY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jb25zdCBWSUVXID0gJ1ZJRVcnO1xuY29uc3QgTE9HT1VUID0gJ0xPR09VVCc7XG5cbmNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyID0gdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nb3V0VXNlciA9IHRoaXMubG9nb3V0VXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlcigpO1xuICB9XG4gIGNoZWNrRm9yTG9nZ2VkSW5Vc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL3VzZXInLCBwYXJhbXMpXG4gICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihkYXRhLmNoYW5uZWxOYW1lLCBkYXRhLnNob3J0Q2hhbm5lbElkLCBkYXRhLmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL3VzZXIgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBsb2dvdXRVc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL2xvZ291dCcsIHBhcmFtcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dvdXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL2xvZ291dCBlcnJvcicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIExPR09VVDpcbiAgICAgICAgdGhpcy5sb2dvdXRVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWSUVXOlxuICAgICAgICAvLyByZWRpcmVjdCB0byBjaGFubmVsIHBhZ2VcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC8ke3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9OiR7dGhpcy5wcm9wcy5jaGFubmVsTG9uZ0lkfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBuYXYtYmFyJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXNob3J0IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tY2VudGVyJz5cbiAgICAgICAgICA8TG9nbyAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1jZW50ZXInPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSduYXYtYmFyLXRhZ2xpbmUnPk9wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tcmlnaHQnPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvJyBleGFjdD5QdWJsaXNoPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyAgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2Fib3V0Jz5BYm91dDwvTmF2TGluaz5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGFubmVsTmFtZSA/IChcbiAgICAgICAgICAgICAgPE5hdkJhckNoYW5uZWxEcm9wZG93blxuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdGlvbj17dGhpcy5oYW5kbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGlvbj17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBWSUVXPXtWSUVXfVxuICAgICAgICAgICAgICAgIExPR09VVD17TE9HT1VUfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPE5hdkxpbmsgaWQ9J25hdi1iYXItbG9naW4tbGluaycgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvbG9naW4nPkNoYW5uZWw8L05hdkxpbms+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihOYXZCYXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5mdW5jdGlvbiBMb2dvICgpIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZlcnNpb249JzEuMScgaWQ9J0xheWVyXzEnIHg9JzBweCcgeT0nMHB4JyBoZWlnaHQ9JzI0cHgnIHZpZXdCb3g9JzAgMCA4MCAzMScgZW5hYmxlQmFja2dyb3VuZD0nbmV3IDAgMCA4MCAzMScgY2xhc3NOYW1lPSduYXYtYmFyLWxvZ28nPlxuICAgICAgPExpbmsgdG89Jy8nPlxuICAgICAgICA8dGl0bGU+TG9nbzwvdGl0bGU+XG4gICAgICAgIDxkZXNjPlNwZWUuY2ggbG9nbzwvZGVzYz5cbiAgICAgICAgPGcgaWQ9J0Fib3V0Jz5cbiAgICAgICAgICA8ZyBpZD0nUHVibGlzaC1Gb3JtLVYyLV94MjhfZmlsbGVkX3gyOV8nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC00Mi4wMDAwMDAsIC0yMy4wMDAwMDApJz5cbiAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNDIuMDAwMDAwLCAyMi4wMDAwMDApJz5cbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPSdtYXRyaXgoMSAwIDAgMSAwIDIwKScgZm9udFNpemU9JzI1JyBmb250RmFtaWx5PSdSb2JvdG8nPlNwZWUmbHQ7aDwvdGV4dD5cbiAgICAgICAgICAgICAgPGcgaWQ9J0dyb3VwLTE2JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMzAuMDAwMDAwKSc+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDlGOTExJyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHknIGZpbGw9J25vbmUnIHN0cm9rZT0nIzAyOUQ3NCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTE2LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS0yJyBmaWxsPSdub25lJyBzdHJva2U9JyNFMzVCRDgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00zMi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMycgZmlsbD0nbm9uZScgc3Ryb2tlPScjNDE1NkM1JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNNDguNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTQnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzYzNTY4OCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTY0LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L0xpbms+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29tcG9uZW50cy9Mb2dvL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIE5hdkJhckNoYW5uZWxEcm9wZG93biAoeyBjaGFubmVsTmFtZSwgaGFuZGxlU2VsZWN0aW9uLCBkZWZhdWx0U2VsZWN0aW9uLCBWSUVXLCBMT0dPVVQgfSkge1xuICByZXR1cm4gKFxuICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tYXJyb3cgbGluay0tbmF2JyBvbkNoYW5nZT17aGFuZGxlU2VsZWN0aW9ufSB2YWx1ZT17ZGVmYXVsdFNlbGVjdGlvbn0+XG4gICAgICA8b3B0aW9uIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0LWNoYW5uZWwtb3B0aW9uJz57Y2hhbm5lbE5hbWV9PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPXtWSUVXfT5WaWV3PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPXtMT0dPVVR9PkxvZ291dDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2QmFyQ2hhbm5lbERyb3Bkb3duO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkaXNhYmxlZDogcHVibGlzaC5kaXNhYmxlZCxcbiAgICBmaWxlICAgIDogcHVibGlzaC5maWxlLFxuICAgIHN0YXR1cyAgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hUb29sL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBEcm9wem9uZSBmcm9tICdjb250YWluZXJzL0Ryb3B6b25lJztcbmltcG9ydCBQdWJsaXNoRGV0YWlscyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzJztcbmltcG9ydCBQdWJsaXNoU3RhdHVzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cyc7XG5pbXBvcnQgUHVibGlzaERpc2FibGVkTWVzc2FnZSBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UnO1xuXG5jbGFzcyBQdWJsaXNoVG9vbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwdWJsaXNoIGlzIGRpc2FibGVkJyk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UHVibGlzaERpc2FibGVkTWVzc2FnZSAvPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ3B1Ymxpc2ggaXMgbm90IGRpc2FibGVkJyk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0YXR1cykge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UHVibGlzaFN0YXR1cyAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDxQdWJsaXNoRGV0YWlscyAvPjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIDxEcm9wem9uZSAvPjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUb29sO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB2YWxpZGF0ZUZpbGUgfSBmcm9tICd1dGlscy9maWxlJztcbmltcG9ydCBQdWJsaXNoUHJldmlldyBmcm9tICdjb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3JztcblxuY2xhc3MgRHJvcHpvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRyYWdPdmVyICA6IGZhbHNlLFxuICAgICAgbW91c2VPdmVyIDogZmFsc2UsXG4gICAgICBkaW1QcmV2aWV3OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlRHJvcCA9IHRoaXMuaGFuZGxlRHJvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ092ZXIgPSB0aGlzLmhhbmRsZURyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnRW5kID0gdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnRW50ZXIgPSB0aGlzLmhhbmRsZURyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0xlYXZlID0gdGhpcy5oYW5kbGVEcmFnTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgPSB0aGlzLmhhbmRsZU1vdXNlRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgPSB0aGlzLmhhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRmlsZUlucHV0ID0gdGhpcy5oYW5kbGVGaWxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNob29zZUZpbGUgPSB0aGlzLmNob29zZUZpbGUuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVEcm9wIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IGZhbHNlfSk7XG4gICAgLy8gaWYgZHJvcHBlZCBpdGVtcyBhcmVuJ3QgZmlsZXMsIHJlamVjdCB0aGVtXG4gICAgY29uc3QgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgaWYgKGR0Lml0ZW1zKSB7XG4gICAgICBpZiAoZHQuaXRlbXNbMF0ua2luZCA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGNvbnN0IGRyb3BwZWRGaWxlID0gZHQuaXRlbXNbMF0uZ2V0QXNGaWxlKCk7XG4gICAgICAgIHRoaXMuY2hvb3NlRmlsZShkcm9wcGVkRmlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGhhbmRsZURyYWdPdmVyIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaGFuZGxlRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICB2YXIgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgaWYgKGR0Lml0ZW1zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGR0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGR0Lml0ZW1zLnJlbW92ZShpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmNsZWFyRGF0YSgpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnRW50ZXIgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiB0cnVlLCBkaW1QcmV2aWV3OiB0cnVlfSk7XG4gIH1cbiAgaGFuZGxlRHJhZ0xlYXZlICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogZmFsc2UsIGRpbVByZXZpZXc6IGZhbHNlfSk7XG4gIH1cbiAgaGFuZGxlTW91c2VFbnRlciAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlLCBkaW1QcmV2aWV3OiB0cnVlfSk7XG4gIH1cbiAgaGFuZGxlTW91c2VMZWF2ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiBmYWxzZSwgZGltUHJldmlldzogZmFsc2V9KTtcbiAgfVxuICBoYW5kbGVDbGljayAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlX2lucHV0JykuY2xpY2soKTtcbiAgfVxuICBoYW5kbGVGaWxlSW5wdXQgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmaWxlTGlzdCA9IGV2ZW50LnRhcmdldC5maWxlcztcbiAgICB0aGlzLmNob29zZUZpbGUoZmlsZUxpc3RbMF0pO1xuICB9XG4gIGNob29zZUZpbGUgKGZpbGUpIHtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsaWRhdGVGaWxlKGZpbGUpOyAvLyB2YWxpZGF0ZSB0aGUgZmlsZSdzIG5hbWUsIHR5cGUsIGFuZCBzaXplXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZXRGaWxlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICAvLyBzdGFnZSBpdCBzbyBpdCB3aWxsIGJlIHJlYWR5IHdoZW4gdGhlIHB1Ymxpc2ggYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0RmlsZShmaWxlKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbic+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J2lucHV0LWZpbGUnIHR5cGU9J2ZpbGUnIGlkPSdmaWxlX2lucHV0JyBuYW1lPSdmaWxlX2lucHV0JyBhY2NlcHQ9J3ZpZGVvLyosaW1hZ2UvKicgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsZUlucHV0fSBlbmNUeXBlPSdtdWx0aXBhcnQvZm9ybS1kYXRhJyAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxkaXYgaWQ9J3ByZXZpZXctZHJvcHpvbmUnIGNsYXNzTmFtZT17J3JvdyByb3ctLXBhZGRlZCByb3ctLXRhbGwgZHJvcHpvbmUnICsgKHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAnIGRyb3B6b25lLS1kcmFnLW92ZXInIDogJycpfSBvbkRyb3A9e3RoaXMuaGFuZGxlRHJvcH0gb25EcmFnT3Zlcj17dGhpcy5oYW5kbGVEcmFnT3Zlcn0gb25EcmFnRW5kPXt0aGlzLmhhbmRsZURyYWdFbmR9IG9uRHJhZ0VudGVyPXt0aGlzLmhhbmRsZURyYWdFbnRlcn0gb25EcmFnTGVhdmU9e3RoaXMuaGFuZGxlRHJhZ0xlYXZlfSBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn0gb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vdXNlTGVhdmV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbGUgPyAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8UHVibGlzaFByZXZpZXdcbiAgICAgICAgICAgICAgICBkaW1QcmV2aWV3PXt0aGlzLnN0YXRlLmRpbVByZXZpZXd9XG4gICAgICAgICAgICAgICAgZmlsZT17dGhpcy5wcm9wcy5maWxlfVxuICAgICAgICAgICAgICAgIHRodW1ibmFpbD17dGhpcy5wcm9wcy50aHVtYm5haWx9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLXRleHQtaG9sZGVyJyBjbGFzc05hbWU9eydmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJ30+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRyYWdPdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtZHJhZ292ZXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPkRyb3AgaXQuPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5tb3VzZU92ZXIgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1pbnN0cnVjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS1wbGFjZWhvbGRlciBpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnIGlkPSdpbnB1dC1lcnJvci1maWxlLXNlbGVjdGlvbic+e3RoaXMucHJvcHMuZmlsZUVycm9yfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+RHJhZyAmIGRyb3AgaW1hZ2Ugb3IgdmlkZW8gaGVyZSB0byBwdWJsaXNoPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPk9SPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUtLXVuZGVybGluZWQnPkNIT09TRSBGSUxFPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS10ZXh0LWhvbGRlcicgY2xhc3NOYW1lPXsnZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcid9PlxuICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtZHJhZ292ZXInPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz5Ecm9wIGl0LjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1pbnN0cnVjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtcGxhY2Vob2xkZXIgaW5mby1tZXNzYWdlLS1mYWlsdXJlJyBpZD0naW5wdXQtZXJyb3ItZmlsZS1zZWxlY3Rpb24nPnt0aGlzLnByb3BzLmZpbGVFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgICA8cD5EcmFnICYgZHJvcCBpbWFnZSBvciB2aWRlbyBoZXJlIHRvIHB1Ymxpc2g8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPk9SPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlLS11bmRlcmxpbmVkJz5DSE9PU0UgRklMRTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcHpvbmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0Ryb3B6b25lL3ZpZXcuanN4IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHZhbGlkYXRlRmlsZSAoZmlsZSkge1xuICAgIGlmICghZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHByb3ZpZGVkJyk7XG4gICAgfVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHNpemUgYW5kIHR5cGVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIEdJRnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihmaWxlLnR5cGUgKyAnIGlzIG5vdCBhIHN1cHBvcnRlZCBmaWxlIHR5cGUuIE9ubHksIC5qcGVnLCAucG5nLCAuZ2lmLCBhbmQgLm1wNCBmaWxlcyBhcmUgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvdXRpbHMvZmlsZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBQdWJsaXNoUHJldmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaW1nU291cmNlICAgICAgIDogJycsXG4gICAgICBkZWZhdWx0VGh1bWJuYWlsOiAnL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIH07XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlKHRoaXMucHJvcHMuZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICBpZiAobmV3UHJvcHMuZmlsZSAhPT0gdGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZShuZXdQcm9wcy5maWxlKTtcbiAgICB9XG4gICAgaWYgKG5ld1Byb3BzLnRodW1ibmFpbCAhPT0gdGhpcy5wcm9wcy50aHVtYm5haWwpIHtcbiAgICAgIGlmIChuZXdQcm9wcy50aHVtYm5haWwpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShuZXdQcm9wcy50aHVtYm5haWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUgKGZpbGUpIHtcbiAgICBjb25zdCBwcmV2aWV3UmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBwcmV2aWV3UmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgcHJldmlld1JlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHByZXZpZXdSZWFkZXIucmVzdWx0fSk7XG4gICAgfTtcbiAgfVxuICBzZXRQcmV2aWV3SW1hZ2VTb3VyY2UgKGZpbGUpIHtcbiAgICBpZiAoZmlsZS50eXBlICE9PSAndmlkZW8vbXA0Jykge1xuICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShmaWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUodGhpcy5wcm9wcy50aHVtYm5haWwpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGltZ1xuICAgICAgICBpZD0nZHJvcHpvbmUtcHJldmlldydcbiAgICAgICAgc3JjPXt0aGlzLnN0YXRlLmltZ1NvdXJjZX1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmRpbVByZXZpZXcgPyAnZGltJyA6ICcnfVxuICAgICAgICBhbHQ9J3B1Ymxpc2ggcHJldmlldydcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcblxuUHVibGlzaFByZXZpZXcucHJvcFR5cGVzID0ge1xuICBkaW1QcmV2aWV3OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmaWxlICAgICAgOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHRodW1ibmFpbCA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoUHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NsZWFyRmlsZSwgc3RhcnRQdWJsaXNofSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZTogcHVibGlzaC5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBjbGVhckZpbGUsXG4gIHN0YXJ0UHVibGlzaCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoRGV0YWlscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnY29udGFpbmVycy9Ecm9wem9uZSc7XG5pbXBvcnQgUHVibGlzaFRpdGxlSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dCc7XG5pbXBvcnQgUHVibGlzaFVybElucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0JztcbmltcG9ydCBQdWJsaXNoVGh1bWJuYWlsSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hNZXRhZGF0YUlucHV0cyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cyc7XG5pbXBvcnQgQ2hhbm5lbFNlbGVjdCBmcm9tICdjb250YWluZXJzL0NoYW5uZWxTZWxlY3QnO1xuXG5jbGFzcyBQdWJsaXNoRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMub25QdWJsaXNoU3VibWl0ID0gdGhpcy5vblB1Ymxpc2hTdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuICBvblB1Ymxpc2hTdWJtaXQgKCkge1xuICAgIHRoaXMucHJvcHMuc3RhcnRQdWJsaXNoKHRoaXMucHJvcHMuaGlzdG9yeSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLWJvdHRvbSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgPFB1Ymxpc2hUaXRsZUlucHV0IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogbGVmdCBjb2x1bW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwJyA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8RHJvcHpvbmUgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvKiByaWdodCBjb2x1bW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdwdWJsaXNoLWFjdGl2ZS1hcmVhJyBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxQdWJsaXNoVXJsSW5wdXQgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8Q2hhbm5lbFNlbGVjdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLmZpbGUudHlwZSA9PT0gJ3ZpZGVvL21wNCcpICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUgJz5cbiAgICAgICAgICAgICAgICA8UHVibGlzaFRodW1ibmFpbElucHV0IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS1uby1ib3R0b20gcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hNZXRhZGF0YUlucHV0cyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gaWQ9J3B1Ymxpc2gtc3VibWl0JyBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLWxhcmdlJyBvbkNsaWNrPXt0aGlzLm9uUHVibGlzaFN1Ym1pdH0+UHVibGlzaDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tYm90dG9tIGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tY2FuY2VsJyBvbkNsaWNrPXt0aGlzLnByb3BzLmNsZWFyRmlsZX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+QnkgY2xpY2tpbmcgJ1B1Ymxpc2gnLCB5b3UgYWZmaXJtIHRoYXQgeW91IGhhdmUgdGhlIHJpZ2h0cyB0byBwdWJsaXNoIHRoaXMgY29udGVudCB0byB0aGUgTEJSWSBuZXR3b3JrLCBhbmQgdGhhdCB5b3UgdW5kZXJzdGFuZCB0aGUgcHJvcGVydGllcyBvZiBwdWJsaXNoaW5nIGl0IHRvIGEgZGVjZW50cmFsaXplZCwgdXNlci1jb250cm9sbGVkIG5ldHdvcmsuIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9sZWFybic+UmVhZCBtb3JlLjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKFB1Ymxpc2hEZXRhaWxzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7dXBkYXRlTWV0YWRhdGF9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogcHVibGlzaC5tZXRhZGF0YS50aXRsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbk1ldGFkYXRhQ2hhbmdlOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZU1ldGFkYXRhKG5hbWUsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFB1Ymxpc2hUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGUpIHtcbiAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdwdWJsaXNoLXRpdGxlJyBjbGFzc05hbWU9J2lucHV0LXRleHQgdGV4dC0tbGFyZ2UgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgbmFtZT0ndGl0bGUnIHBsYWNlaG9sZGVyPSdHaXZlIHlvdXIgcG9zdCBhIHRpdGxlLi4uJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gdmFsdWU9e3RoaXMucHJvcHMudGl0bGV9IC8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVGl0bGVJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJpbXBvcnQge3VwZGF0ZUNsYWltLCB1cGRhdGVFcnJvcn0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZSAgIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGZpbGVOYW1lICAgICAgICAgICAgICA6IHB1Ymxpc2guZmlsZS5uYW1lLFxuICAgIHB1Ymxpc2hJbkNoYW5uZWwgICAgICA6IHB1Ymxpc2gucHVibGlzaEluQ2hhbm5lbCxcbiAgICBzZWxlY3RlZENoYW5uZWwgICAgICAgOiBwdWJsaXNoLnNlbGVjdGVkQ2hhbm5lbCxcbiAgICBjbGFpbSAgICAgICAgICAgICAgICAgOiBwdWJsaXNoLmNsYWltLFxuICAgIHVybEVycm9yICAgICAgICAgICAgICA6IHB1Ymxpc2guZXJyb3IudXJsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2xhaW1DaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlQ2xhaW0odmFsdWUpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdwdWJsaXNoU3VibWl0JywgbnVsbCkpO1xuICAgIH0sXG4gICAgb25VcmxFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcigndXJsJywgdmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcbmltcG9ydCBVcmxNaWRkbGUgZnJvbSAnY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheSc7XG5cbmNsYXNzIFB1Ymxpc2hVcmxJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGNsYWltLCBmaWxlTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNsYWltKSB7XG4gICAgICB0aGlzLnNldENsYWltTmFtZShmaWxlTmFtZSk7XG4gICAgfVxuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKHsgY2xhaW0sIGZpbGVOYW1lIH0pIHtcbiAgICAvLyBpZiBhIG5ldyBmaWxlIHdhcyBjaG9zZW4sIHVwZGF0ZSB0aGUgY2xhaW0gbmFtZVxuICAgIGlmIChmaWxlTmFtZSAhPT0gdGhpcy5wcm9wcy5maWxlTmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0Q2xhaW1OYW1lKGZpbGVOYW1lKTtcbiAgICB9XG4gICAgLy8gaWYgdGhlIGNsYWltIGhhcyB1cGRhdGVkLCBjaGVjayBpdHMgYXZhaWxhYmlsaXR5XG4gICAgaWYgKGNsYWltICE9PSB0aGlzLnByb3BzLmNsYWltKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlQ2xhaW0oY2xhaW0pO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmNsZWFuc2VJbnB1dCh2YWx1ZSk7XG4gICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgIHRoaXMucHJvcHMub25DbGFpbUNoYW5nZSh2YWx1ZSk7XG4gIH1cbiAgY2xlYW5zZUlucHV0IChpbnB1dCkge1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxzKy9nLCAnLScpOyAvLyByZXBsYWNlIHNwYWNlcyB3aXRoIGRhc2hlc1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTktXS9nLCAnJyk7ICAvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksIG9yICctJ1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBzZXRDbGFpbU5hbWUgKGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVXaXRob3V0RW5kaW5nID0gZmlsZU5hbWUuc3Vic3RyaW5nKDAsIGZpbGVOYW1lLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIGNvbnN0IGNsZWFuQ2xhaW1OYW1lID0gdGhpcy5jbGVhbnNlSW5wdXQoZmlsZU5hbWVXaXRob3V0RW5kaW5nKTtcbiAgICB0aGlzLnByb3BzLm9uQ2xhaW1DaGFuZ2UoY2xlYW5DbGFpbU5hbWUpO1xuICB9XG4gIHZhbGlkYXRlQ2xhaW0gKGNsYWltKSB7XG4gICAgaWYgKCFjbGFpbSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25VcmxFcnJvcignRW50ZXIgYSB1cmwgYWJvdmUnKTtcbiAgICB9XG4gICAgcmVxdWVzdChgL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvJHtjbGFpbX1gKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uVXJsRXJyb3IobnVsbCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uVXJsRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2xhaW0sIGxvZ2dlZEluQ2hhbm5lbE5hbWUsIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQsIHB1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgdXJsRXJyb3IgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IHNwYW4tLXJlbGF0aXZlJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnknPnNwZWUuY2ggLyA8L3NwYW4+XG4gICAgICAgICAgPFVybE1pZGRsZVxuICAgICAgICAgICAgcHVibGlzaEluQ2hhbm5lbD17cHVibGlzaEluQ2hhbm5lbH1cbiAgICAgICAgICAgIHNlbGVjdGVkQ2hhbm5lbD17c2VsZWN0ZWRDaGFubmVsfVxuICAgICAgICAgICAgbG9nZ2VkSW5DaGFubmVsTmFtZT17bG9nZ2VkSW5DaGFubmVsTmFtZX1cbiAgICAgICAgICAgIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQ9e2xvZ2dlZEluQ2hhbm5lbFNob3J0SWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2NsYWltLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nY2xhaW0nIHBsYWNlaG9sZGVyPSd5b3VyLXVybC1oZXJlJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gdmFsdWU9e2NsYWltfSAvPlxuICAgICAgICAgIHsgKGNsYWltICYmICF1cmxFcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2xhaW0tbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLXN1Y2Nlc3Mgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxMyd9PC9zcGFuPiB9XG4gICAgICAgICAgeyB1cmxFcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7IHVybEVycm9yID8gKFxuICAgICAgICAgICAgPHAgaWQ9J2lucHV0LWVycm9yLWNsYWltLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dXJsRXJyb3J9PC9wPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+Q2hvb3NlIGEgY3VzdG9tIHVybDwvcD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFVybElucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZnVuY3Rpb24gVXJsTWlkZGxlICh7cHVibGlzaEluQ2hhbm5lbCwgc2VsZWN0ZWRDaGFubmVsLCBsb2dnZWRJbkNoYW5uZWxOYW1lLCBsb2dnZWRJbkNoYW5uZWxTaG9ydElkfSkge1xuICBpZiAocHVibGlzaEluQ2hhbm5lbCkge1xuICAgIGlmIChzZWxlY3RlZENoYW5uZWwgPT09IGxvZ2dlZEluQ2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiA8c3BhbiBpZD0ndXJsLWNoYW5uZWwnIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSc+e2xvZ2dlZEluQ2hhbm5lbE5hbWV9Ontsb2dnZWRJbkNoYW5uZWxTaG9ydElkfSAvPC9zcGFuPjtcbiAgICB9XG4gICAgcmV0dXJuIDxzcGFuIGlkPSd1cmwtY2hhbm5lbC1wbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5IHRvb2x0aXAnPkBjaGFubmVsPHNwYW5cbiAgICAgIGNsYXNzTmFtZT0ndG9vbHRpcC10ZXh0Jz5TZWxlY3QgYSBjaGFubmVsIGJlbG93PC9zcGFuPiAvPC9zcGFuPjtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxzcGFuIGlkPSd1cmwtbm8tY2hhbm5lbC1wbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5IHRvb2x0aXAnPnh5ejxzcGFuIGNsYXNzTmFtZT0ndG9vbHRpcC10ZXh0Jz5UaGlzIHdpbGwgYmUgYSByYW5kb20gaWQ8L3NwYW4+IC88L3NwYW4+XG4gICk7XG59XG5cblVybE1pZGRsZS5wcm9wVHlwZXMgPSB7XG4gIHB1Ymxpc2hJbkNoYW5uZWwgICAgICA6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGxvZ2dlZEluQ2hhbm5lbE5hbWUgICA6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVcmxNaWRkbGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5L2luZGV4LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvbk5ld1RodW1ibmFpbCB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoOiB7IGZpbGUgfSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25OZXdUaHVtYm5haWwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgbGV0IGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgbGV0IG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gIGxldCBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOiBtaW1lU3RyaW5nfSk7XG59XG5cbmNsYXNzIFB1Ymxpc2hUaHVtYm5haWxJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmlkZW9Tb3VyY2UgICA6IG51bGwsXG4gICAgICBlcnJvciAgICAgICAgIDogbnVsbCxcbiAgICAgIHNsaWRlck1pblJhbmdlOiAxLFxuICAgICAgc2xpZGVyTWF4UmFuZ2U6IG51bGwsXG4gICAgICBzbGlkZXJWYWx1ZSAgIDogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhID0gdGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGEuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNsaWRlckNoYW5nZSA9IHRoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVUaHVtYm5haWwgPSB0aGlzLmNyZWF0ZVRodW1ibmFpbC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGZpbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRWaWRlb1NvdXJjZShmaWxlKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICAvLyBpZiBmaWxlIGNoYW5nZXNcbiAgICBpZiAobmV4dFByb3BzLmZpbGUgJiYgbmV4dFByb3BzLmZpbGUgIT09IHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgY29uc3QgeyBmaWxlIH0gPSBuZXh0UHJvcHM7XG4gICAgICB0aGlzLnNldFZpZGVvU291cmNlKGZpbGUpO1xuICAgIH07XG4gIH1cbiAgc2V0VmlkZW9Tb3VyY2UgKGZpbGUpIHtcbiAgICBjb25zdCBwcmV2aWV3UmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBwcmV2aWV3UmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgcHJldmlld1JlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhVXJpID0gcHJldmlld1JlYWRlci5yZXN1bHQ7XG4gICAgICBjb25zdCBibG9iID0gZGF0YVVSSXRvQmxvYihkYXRhVXJpKTtcbiAgICAgIGNvbnN0IHZpZGVvU291cmNlID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aWRlb1NvdXJjZSB9KTtcbiAgICB9O1xuICB9XG4gIGhhbmRsZVZpZGVvTG9hZGVkRGF0YSAoZXZlbnQpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IGV2ZW50LnRhcmdldC5kdXJhdGlvbjtcbiAgICBjb25zdCB0b3RhbE1pbnV0ZXMgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gNjApO1xuICAgIGNvbnN0IHRvdGFsU2Vjb25kcyA9IE1hdGguZmxvb3IoZHVyYXRpb24gJSA2MCk7XG4gICAgLy8gc2V0IHRoZSBzbGlkZXJcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNsaWRlck1heFJhbmdlOiBkdXJhdGlvbiAqIDEwMCxcbiAgICAgIHNsaWRlclZhbHVlICAgOiBkdXJhdGlvbiAqIDEwMCAvIDIsXG4gICAgICB0b3RhbE1pbnV0ZXMsXG4gICAgICB0b3RhbFNlY29uZHMsXG4gICAgfSk7XG4gICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIHZpZGVvXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gZHVyYXRpb24gLyAyO1xuICB9XG4gIGhhbmRsZVNsaWRlckNoYW5nZSAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgLy8gdXBkYXRlIHRoZSBzbGlkZXIgdmFsdWVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNsaWRlclZhbHVlOiB2YWx1ZSxcbiAgICB9KTtcbiAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgdmlkZW9cbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSB2YWx1ZSAvIDEwMDtcbiAgfVxuICBjcmVhdGVUaHVtYm5haWwgKCkge1xuICAgIC8vIHRha2UgYSBzbmFwc2hvdFxuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgY29uc3QgYmxvYiA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVybCk7XG4gICAgY29uc3Qgc25hcHNob3QgPSBuZXcgRmlsZShbYmxvYl0sIGB0aHVtYm5haWwucG5nYCwge1xuICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgfSk7XG4gICAgLy8gc2V0IHRoZSB0aHVtYm5haWwgaW4gcmVkdXggc3RvcmVcbiAgICBpZiAoc25hcHNob3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25OZXdUaHVtYm5haWwoc25hcHNob3QpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHZpZGVvU291cmNlLCBzbGlkZXJNaW5SYW5nZSwgc2xpZGVyTWF4UmFuZ2UsIHNsaWRlclZhbHVlLCB0b3RhbE1pbnV0ZXMsIHRvdGFsU2Vjb25kcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnPlRodW1ibmFpbDo8L2xhYmVsPlxuICAgICAgICA8dmlkZW9cbiAgICAgICAgICBpZD0ndmlkZW8tdGh1bWItcGxheWVyJ1xuICAgICAgICAgIHByZWxvYWQ9J21ldGFkYXRhJ1xuICAgICAgICAgIG11dGVkXG4gICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiAnbm9uZSd9fVxuICAgICAgICAgIHBsYXlzSW5saW5lXG4gICAgICAgICAgb25Mb2FkZWREYXRhPXt0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YX1cbiAgICAgICAgICBzcmM9e3ZpZGVvU291cmNlfVxuICAgICAgICAgIG9uU2Vla2VkPXt0aGlzLmNyZWF0ZVRodW1ibmFpbH1cbiAgICAgICAgLz5cbiAgICAgICAge1xuICAgICAgICAgIHNsaWRlclZhbHVlID8gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tY2VudGVyJyBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+MCcwMFwiPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz57dG90YWxNaW51dGVzfSd7dG90YWxTZWNvbmRzfVwiPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9J3JhbmdlJ1xuICAgICAgICAgICAgICAgICAgbWluPXtzbGlkZXJNaW5SYW5nZX1cbiAgICAgICAgICAgICAgICAgIG1heD17c2xpZGVyTWF4UmFuZ2V9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2xpZGVyVmFsdWV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3NsaWRlcidcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNsaWRlckNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZScgPmxvYWRpbmcuLi4gPC9wPlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICB7IGVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57ZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5Vc2Ugc2xpZGVyIHRvIHNldCB0aHVtYm5haWw8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUaHVtYm5haWxJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L3ZpZXcuanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhLCB0b2dnbGVNZXRhZGF0YUlucHV0c30gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHNob3dNZXRhZGF0YUlucHV0czogcHVibGlzaC5zaG93TWV0YWRhdGFJbnB1dHMsXG4gICAgZGVzY3JpcHRpb24gICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgIGxpY2Vuc2UgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5saWNlbnNlLFxuICAgIG5zZncgICAgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5uc2Z3LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uTWV0YWRhdGFDaGFuZ2U6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTWV0YWRhdGEobmFtZSwgdmFsdWUpKTtcbiAgICB9LFxuICAgIG9uVG9nZ2xlTWV0YWRhdGFJbnB1dHM6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godG9nZ2xlTWV0YWRhdGFJbnB1dHModmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXhwYW5kaW5nVGV4dEFyZWEgZnJvbSAnY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYSc7XG5cbmNsYXNzIFB1Ymxpc2hNZXRhZGF0YUlucHV0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRvZ2dsZVNob3dJbnB1dHMgPSB0aGlzLnRvZ2dsZVNob3dJbnB1dHMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0ID0gdGhpcy5oYW5kbGVTZWxlY3QuYmluZCh0aGlzKTtcbiAgfVxuICB0b2dnbGVTaG93SW5wdXRzICgpIHtcbiAgICB0aGlzLnByb3BzLm9uVG9nZ2xlTWV0YWRhdGFJbnB1dHMoIXRoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/IHRhcmdldC5jaGVja2VkIDogdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQubmFtZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgdmFsdWUpO1xuICB9XG4gIGhhbmRsZVNlbGVjdCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCBzZWxlY3RlZE9wdGlvbik7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0ncHVibGlzaC1kZXRhaWxzJyBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICB7dGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMgJiYgKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nbGFiZWwnPkRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8RXhwYW5kaW5nVGV4dEFyZWFcbiAgICAgICAgICAgICAgICAgIGlkPSdwdWJsaXNoLWRlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd0ZXh0YXJlYSB0ZXh0YXJlYS0tcHJpbWFyeSB0ZXh0YXJlYS0tZnVsbC13aWR0aCdcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezF9XG4gICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezIwMDB9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhIZWlnaHQ6IDIwMCB9fVxuICAgICAgICAgICAgICAgICAgbmFtZT0nZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nT3B0aW9uYWwgZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nbGFiZWwnPkxpY2Vuc2U6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgbmFtZT0nbGljZW5zZScgaWQ9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1wcmltYXJ5JyBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3R9PlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nICc+VW5zcGVjaWZpZWQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J1B1YmxpYyBEb21haW4nPlB1YmxpYyBEb21haW48L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J0NyZWF0aXZlIENvbW1vbnMnPkNyZWF0aXZlIENvbW1vbnM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1uc2Z3JyBjbGFzc05hbWU9J2xhYmVsJz5NYXR1cmU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J2lucHV0LWNoZWNrYm94JyB0eXBlPSdjaGVja2JveCcgaWQ9J3B1Ymxpc2gtbnNmdycgbmFtZT0nbnNmdycgdmFsdWU9e3RoaXMucHJvcHMubnNmd30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXNlY29uZGFyeScgb25DbGljaz17dGhpcy50b2dnbGVTaG93SW5wdXRzfT57dGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMgPyAnbGVzcycgOiAnbW9yZSd9PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hNZXRhZGF0YUlucHV0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIEV4cGFuZGluZ1RleHRhcmVhIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX2hhbmRsZUNoYW5nZSA9IHRoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmFkanVzdFRleHRhcmVhKHt9KTtcbiAgfVxuICBfaGFuZGxlQ2hhbmdlIChldmVudCkge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShldmVudCk7XG4gICAgdGhpcy5hZGp1c3RUZXh0YXJlYShldmVudCk7XG4gIH1cbiAgYWRqdXN0VGV4dGFyZWEgKHsgdGFyZ2V0ID0gdGhpcy5lbCB9KSB7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyAuLi5yZXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIHJlZj17eCA9PiB0aGlzLmVsID0geH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5FeHBhbmRpbmdUZXh0YXJlYS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGluZ1RleHRhcmVhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7c2V0UHVibGlzaEluQ2hhbm5lbCwgdXBkYXRlU2VsZWN0ZWRDaGFubmVsLCB1cGRhdGVFcnJvcn0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgcHVibGlzaEluQ2hhbm5lbCAgIDogcHVibGlzaC5wdWJsaXNoSW5DaGFubmVsLFxuICAgIHNlbGVjdGVkQ2hhbm5lbCAgICA6IHB1Ymxpc2guc2VsZWN0ZWRDaGFubmVsLFxuICAgIGNoYW5uZWxFcnJvciAgICAgICA6IHB1Ymxpc2guZXJyb3IuY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2NoYW5uZWwnLCBudWxsKSk7XG4gICAgICBkaXNwYXRjaChzZXRQdWJsaXNoSW5DaGFubmVsKHZhbHVlKSk7XG4gICAgfSxcbiAgICBvbkNoYW5uZWxTZWxlY3Q6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2NoYW5uZWwnLCBudWxsKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwodmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3QvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENoYW5uZWxMb2dpbkZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtJztcbmltcG9ydCBDaGFubmVsQ3JlYXRlRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtJztcbmltcG9ydCAqIGFzIHN0YXRlcyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMnO1xuXG5jbGFzcyBDaGFubmVsU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaCA9IHRoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICB0b2dnbGVBbm9ueW1vdXNQdWJsaXNoIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gJ2Fub255bW91cycpIHtcbiAgICAgIHRoaXMucHJvcHMub25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2UodHJ1ZSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZVNlbGVjdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxTZWxlY3Qoc2VsZWN0ZWRPcHRpb24pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdyYWRpbycgbmFtZT0nYW5vbnltb3VzLW9yLWNoYW5uZWwnIGlkPSdhbm9ueW1vdXMtcmFkaW8nIGNsYXNzTmFtZT0naW5wdXQtcmFkaW8nIHZhbHVlPSdhbm9ueW1vdXMnIGNoZWNrZWQ9eyF0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2h9IC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCBsYWJlbC0tcG9pbnRlcicgaHRtbEZvcj0nYW5vbnltb3VzLXJhZGlvJz5Bbm9ueW1vdXM8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdyYWRpbycgbmFtZT0nYW5vbnltb3VzLW9yLWNoYW5uZWwnIGlkPSdjaGFubmVsLXJhZGlvJyBjbGFzc05hbWU9J2lucHV0LXJhZGlvJyB2YWx1ZT0naW4gYSBjaGFubmVsJyBjaGVja2VkPXt0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2h9IC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCBsYWJlbC0tcG9pbnRlcicgaHRtbEZvcj0nY2hhbm5lbC1yYWRpbyc+SW4gYSBjaGFubmVsPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7IHRoaXMucHJvcHMuY2hhbm5lbEVycm9yID8gKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnByb3BzLmNoYW5uZWxFcnJvcn08L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5QdWJsaXNoIGFub255bW91c2x5IG9yIGluIGEgY2hhbm5lbDwvcD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsICYmIChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMnPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1uYW1lLXNlbGVjdCc+Q2hhbm5lbDo8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLW5hbWUtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93JyB2YWx1ZT17dGhpcy5wcm9wcy5zZWxlY3RlZENoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUgJiYgPG9wdGlvbiB2YWx1ZT17dGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lfSBpZD0ncHVibGlzaC1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e3RoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZX08L29wdGlvbj4gfVxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3N0YXRlcy5MT0dJTn0+RXhpc3Rpbmc8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzdGF0ZXMuQ1JFQVRFfT5OZXc8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsID09PSBzdGF0ZXMuTE9HSU4pICYmIDxDaGFubmVsTG9naW5Gb3JtIC8+IH1cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsID09PSBzdGF0ZXMuQ1JFQVRFKSAmJiA8Q2hhbm5lbENyZWF0ZUZvcm0gLz4gfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsU2VsZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsTG9naW5Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIG5hbWUgICAgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dpblRvQ2hhbm5lbCA9IHRoaXMubG9naW5Ub0NoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIGxvZ2luVG9DaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXF1ZXN0KCdsb2dpbicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7c3VjY2VzcywgY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCwgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG1lc3NhZ2V9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvcn0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBpZD0nY2hhbm5lbC1sb2dpbi1mb3JtJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tJz5cbiAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nbmFtZScgcGxhY2Vob2xkZXI9J1lvdXIgQ2hhbm5lbCBOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsTmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyA+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgaWQ9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnIG5hbWU9J3Bhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxQYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5FbnRlciB0aGUgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMubG9naW5Ub0NoYW5uZWx9PkF1dGhlbnRpY2F0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxMb2dpbkZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxDcmVhdGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIGNoYW5uZWwgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgIHN0YXR1cyAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQgPSB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVDaGFubmVsID0gdGhpcy5jcmVhdGVDaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgY2xlYW5zZUNoYW5uZWxJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgaGFuZGxlQ2hhbm5lbElucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUNoYW5uZWxJbnB1dCh2YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2hhbm5lbDogdmFsdWV9KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdQbGVhc2UgZW50ZXIgYSBjaGFubmVsIG5hbWUnfSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgdXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbnVsbH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgfSk7XG4gIH1cbiAgY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXR1cm4gcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YCk7XG4gIH1cbiAgY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQgKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghcGFzc3dvcmQgfHwgcGFzc3dvcmQubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgYSBwYXNzd29yZCcpKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuICBtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0ICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWUsIHBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdCgnL3NpZ251cCcsIHBhcmFtcylcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFVuZm9ydHVuYXRlbHksIHdlIGVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIGNyZWF0aW5nIHlvdXIgY2hhbm5lbC4gUGxlYXNlIGxldCB1cyBrbm93IGluIERpc2NvcmQhICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGNyZWF0ZUNoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNoZWNrSXNQYXNzd29yZFByb3ZpZGVkKHRoaXMuc3RhdGUucGFzc3dvcmQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrSXNDaGFubmVsQXZhaWxhYmxlKHRoaXMuc3RhdGUuY2hhbm5lbCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6ICdXZSBhcmUgcHVibGlzaGluZyB5b3VyIG5ldyBjaGFubmVsLiAgU2l0IHRpZ2h0Li4uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0KHRoaXMuc3RhdGUuY2hhbm5lbCwgdGhpcy5zdGF0ZS5wYXNzd29yZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBudWxsfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4ocmVzdWx0LmNoYW5uZWxOYW1lLCByZXN1bHQuc2hvcnRDaGFubmVsSWQsIHJlc3VsdC5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHsgIXRoaXMuc3RhdGUuc3RhdHVzID8gKFxuICAgICAgICAgIDxmb3JtIGlkPSdwdWJsaXNoLWNoYW5uZWwtZm9ybSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1uYW1lJz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J2NoYW5uZWwnIGlkPSduZXctY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPSdleGFtcGxlQ2hhbm5lbE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICAgIHsgKHRoaXMuc3RhdGUuY2hhbm5lbCAmJiAhdGhpcy5zdGF0ZS5lcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIG5hbWU9J3Bhc3N3b3JkJyBpZD0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmNyZWF0ZUNoYW5uZWx9PkNyZWF0ZSBDaGFubmVsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+e3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENyZWF0ZUZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEluYWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1pbmFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5hY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGV9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzdGF0dXMgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gICAgbWVzc2FnZTogcHVibGlzaC5zdGF0dXMubWVzc2FnZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0ICogYXMgcHVibGlzaFN0YXRlcyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMnO1xuXG5jbGFzcyBQdWJsaXNoU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1cywgbWVzc2FnZSwgY2xlYXJGaWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5MT0FEX1NUQVJUICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPkZpbGUgaXMgbG9hZGluZyB0byBzZXJ2ZXI8L3A+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz4wJTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5MT0FESU5HICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICA8cD5GaWxlIGlzIGxvYWRpbmcgdG8gc2VydmVyPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz57bWVzc2FnZX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuUFVCTElTSElORyAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5VcGxvYWQgY29tcGxldGUuICBZb3VyIGZpbGUgaXMgbm93IGJlaW5nIHB1Ymxpc2hlZCBvbiB0aGUgYmxvY2tjaGFpbi4uLjwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPHA+Q3VyaW91cyB3aGF0IG1hZ2ljIGlzIGhhcHBlbmluZyBoZXJlPyA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9mYXEvd2hhdC1pcy1sYnJ5Jz5MZWFybiBtb3JlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuU1VDQ0VTUyAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5Zb3VyIHB1Ymxpc2ggaXMgY29tcGxldGUhIFlvdSBhcmUgYmVpbmcgcmVkaXJlY3RlZCB0byBpdCBub3cuPC9wPlxuICAgICAgICAgIDxwPklmIHlvdSBhcmUgbm90IGF1dG9tYXRpY2FsbHkgcmVkaXJlY3RlZCwgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17bWVzc2FnZX0+Y2xpY2sgaGVyZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkZBSUxFRCAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5Tb21ldGhpbmcgd2VudCB3cm9uZy4uLjwvcD5cbiAgICAgICAgICA8cD48c3Ryb25nPnttZXNzYWdlfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICA8cD5Gb3IgaGVscCwgcG9zdCB0aGUgYWJvdmUgZXJyb3IgdGV4dCBpbiB0aGUgI3NwZWVjaCBjaGFubmVsIG9uIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJyB0YXJnZXQ9J19ibGFuayc+bGJyeSBkaXNjb3JkPC9hPjwvcD5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1zZWNvbmRhcnknIG9uQ2xpY2s9e2NsZWFyRmlsZX0+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hTdGF0dXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJleHBvcnQgY29uc3QgTE9BRF9TVEFSVCA9ICdMT0FEX1NUQVJUJztcbmV4cG9ydCBjb25zdCBMT0FESU5HID0gJ0xPQURJTkcnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hJTkcgPSAnUFVCTElTSElORyc7XG5leHBvcnQgY29uc3QgU1VDQ0VTUyA9ICdTVUNDRVNTJztcbmV4cG9ydCBjb25zdCBGQUlMRUQgPSAnRkFJTEVEJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZTogcHVibGlzaC5kaXNhYmxlZE1lc3NhZ2UsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5wcm9wcy5tZXNzYWdlO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLnByb3BzLm1lc3NhZ2U6JywgbWVzc2FnZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgZHJvcHpvbmUtLWRpc2FibGVkIHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LS1kaXNhYmxlZCc+UHVibGlzaGluZyBpcyBjdXJyZW50bHkgZGlzYWJsZWQuPC9wPlxuICAgICAgICA8cCBjbGFzc05hbWU9J3RleHQtLWRpc2FibGVkJz57bWVzc2FnZX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcblxuY2xhc3MgQWJvdXRQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydBYm91dCd9IHBhZ2VVcmk9eydhYm91dCd9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3B1bGwtcXVvdGUnPlNwZWUuY2ggaXMgYW4gb3Blbi1zb3VyY2UgcHJvamVjdC4gIFBsZWFzZSBjb250cmlidXRlIHRvIHRoZSBleGlzdGluZyBzaXRlLCBvciBmb3JrIGl0IGFuZCBtYWtlIHlvdXIgb3duLjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly90d2l0dGVyLmNvbS9zcGVlX2NoJz5UV0lUVEVSPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5HSVRIVUI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+RElTQ09SRCBDSEFOTkVMPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2Jsb2IvbWFzdGVyL1JFQURNRS5tZCc+RE9DVU1FTlRBVElPTjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBtZWRpYS1ob3N0aW5nIHNpdGUgdGhhdCByZWFkcyBmcm9tIGFuZCBwdWJsaXNoZXMgY29udGVudCB0byB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8nPkxCUlk8L2E+IGJsb2NrY2hhaW4uPC9wPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgaG9zdGluZyBzZXJ2aWNlLCBidXQgd2l0aCB0aGUgYWRkZWQgYmVuZWZpdCB0aGF0IGl0IHN0b3JlcyB5b3VyIGNvbnRlbnQgb24gYSBkZWNlbnRyYWxpemVkIG5ldHdvcmsgb2YgY29tcHV0ZXJzIC0tIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9nZXQnPkxCUlk8L2E+IG5ldHdvcmsuICBUaGlzIG1lYW5zIHRoYXQgeW91ciBpbWFnZXMgYXJlIHN0b3JlZCBpbiBtdWx0aXBsZSBsb2NhdGlvbnMgd2l0aG91dCBhIHNpbmdsZSBwb2ludCBvZiBmYWlsdXJlLjwvcD5cbiAgICAgICAgICAgICAgPGgzPkNvbnRyaWJ1dGU8L2gzPlxuICAgICAgICAgICAgICA8cD5JZiB5b3UgaGF2ZSBhbiBpZGVhIGZvciB5b3VyIG93biBzcGVlLmNoLWxpa2Ugc2l0ZSBvbiB0b3Agb2YgTEJSWSwgZm9yayBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPmdpdGh1YiByZXBvPC9hPiBhbmQgZ28gdG8gdG93biE8L3A+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSB3YW50IHRvIGltcHJvdmUgc3BlZS5jaCwgam9pbiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+ZGlzY29yZCBjaGFubmVsPC9hPiBvciBzb2x2ZSBvbmUgb2Ygb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2lzc3Vlcyc+Z2l0aHViIGlzc3VlczwvYT4uPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQWJvdXRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29tcG9uZW50cy9BYm91dFBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Mb2dpblBhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5cbmNsYXNzIExvZ2luUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgLy8gcmUtcm91dGUgdGhlIHVzZXIgdG8gdGhlIGhvbWVwYWdlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICAgIGlmIChuZXdQcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICE9PSB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUpIHtcbiAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvYCk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnTG9naW4nfSBwYWdlVXJpPXsnbG9naW4nfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+Q2hhbm5lbHMgYWxsb3cgeW91IHRvIHB1Ymxpc2ggYW5kIGdyb3VwIGNvbnRlbnQgdW5kZXIgYW4gaWRlbnRpdHkuIFlvdSBjYW4gY3JlYXRlIGEgY2hhbm5lbCBmb3IgeW91cnNlbGYsIG9yIHNoYXJlIG9uZSB3aXRoIGxpa2UtbWluZGVkIGZyaWVuZHMuICBZb3UgY2FuIGNyZWF0ZSAxIGNoYW5uZWwsIG9yIDEwMCwgc28gd2hldGhlciB5b3UncmUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRhbG9uaWEyMDE3OjQzZGNmNDcxNjNjYWEyMWQ4NDA0ZDlmZTliMzBmNzhlZjNlMTQ2YTgnPmRvY3VtZW50aW5nIGltcG9ydGFudCBldmVudHM8L2E+LCBvciBtYWtpbmcgYSBwdWJsaWMgcmVwb3NpdG9yeSBmb3IgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRHaWZzJz5jYXQgZ2lmczwvYT4gKHBhc3N3b3JkOiAnMTIzNCcpLCB0cnkgY3JlYXRpbmcgYSBjaGFubmVsIGZvciBpdCE8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkxvZyBpbiB0byBhbiBleGlzdGluZyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsTG9naW5Gb3JtIC8+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkNyZWF0ZSBhIGJyYW5kIG5ldyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ3JlYXRlRm9ybSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihMb2dpblBhZ2UpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvciAgICAgIDogc2hvdy5yZXF1ZXN0LmVycm9yLFxuICAgIHJlcXVlc3RUeXBlOiBzaG93LnJlcXVlc3QudHlwZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25IYW5kbGVTaG93UGFnZVVyaSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9TaG93UGFnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ2NvbXBvbmVudHMvRXJyb3JQYWdlJztcbmltcG9ydCBTaG93QXNzZXRMaXRlIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZSc7XG5pbXBvcnQgU2hvd0Fzc2V0RGV0YWlscyBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldERldGFpbHMnO1xuaW1wb3J0IFNob3dDaGFubmVsIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwnO1xuXG5pbXBvcnQgeyBDSEFOTkVMLCBBU1NFVF9MSVRFLCBBU1NFVF9ERVRBSUxTIH0gZnJvbSAnY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcyc7XG5cbmNsYXNzIFNob3dQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMucHJvcHMub25IYW5kbGVTaG93UGFnZVVyaSh0aGlzLnByb3BzLm1hdGNoLnBhcmFtcyk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMgIT09IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zKSB7XG4gICAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkobmV4dFByb3BzLm1hdGNoLnBhcmFtcyk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciwgcmVxdWVzdFR5cGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RXJyb3JQYWdlIGVycm9yPXtlcnJvcn0gLz5cbiAgICAgICk7XG4gICAgfVxuICAgIHN3aXRjaCAocmVxdWVzdFR5cGUpIHtcbiAgICAgIGNhc2UgQ0hBTk5FTDpcbiAgICAgICAgcmV0dXJuIDxTaG93Q2hhbm5lbCAvPjtcbiAgICAgIGNhc2UgQVNTRVRfTElURTpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXRMaXRlIC8+O1xuICAgICAgY2FzZSBBU1NFVF9ERVRBSUxTOlxuICAgICAgICByZXR1cm4gPFNob3dBc3NldERldGFpbHMgLz47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gPHA+bG9hZGluZy4uLjwvcD47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvU2hvd1BhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgQXNzZXREaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5JztcblxuY2xhc3MgU2hvd0xpdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGNsYWltSWQgfSA9IGFzc2V0LmNsYWltRGF0YTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXIgc2hvdy1saXRlLWNvbnRhaW5lcic+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e25hbWV9IGFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICA8QXNzZXREaXNwbGF5IC8+XG4gICAgICAgICAgPExpbmsgaWQ9J2Fzc2V0LWJvaWxlcnBhdGUnIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeSBmaW5lLXByaW50JyB0bz17YC8ke2NsYWltSWR9LyR7bmFtZX1gfT5ob3N0ZWRcbiAgICAgICAgICAgIHZpYSBTcGVlLmNoPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAgPHA+bG9hZGluZyBhc3NldCBkYXRhLi4uPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0xpdGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIFVOQVZBSUxBQkxFLCBFUlJPUiwgQVZBSUxBQkxFIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY2xhc3MgQXNzZXREaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25GaWxlUmVxdWVzdChuYW1lLCBjbGFpbUlkKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBlcnJvciwgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGNvbnRlbnRUeXBlLCBmaWxlRXh0LCB0aHVtYm5haWwgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdhc3NldC1kaXNwbGF5LWNvbXBvbmVudCc+XG4gICAgICAgIHsoc3RhdHVzID09PSBMT0NBTF9DSEVDSykgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5DaGVja2luZyB0byBzZWUgaWYgU3BlZS5jaCBoYXMgeW91ciBhc3NldCBsb2NhbGx5Li4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gVU5BVkFJTEFCTEUpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+U2l0IHRpZ2h0LCB3ZSdyZSBzZWFyY2hpbmcgdGhlIExCUlkgYmxvY2tjaGFpbiBmb3IgeW91ciBhc3NldCE8L3A+XG4gICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDxwPkN1cmlvdXMgd2hhdCBtYWdpYyBpcyBoYXBwZW5pbmcgaGVyZT8gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZmFxL3doYXQtaXMtbGJyeSc+TGVhcm4gbW9yZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gRVJST1IpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+VW5mb3J0dW5hdGVseSwgd2UgY291bGRuJ3QgZG93bmxvYWQgeW91ciBhc3NldCBmcm9tIExCUlkuICBZb3UgY2FuIGhlbHAgdXMgb3V0IGJ5IHNoYXJpbmcgdGhlIGJlbG93IGVycm9yIG1lc3NhZ2UgaW4gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5MQlJZIGRpc2NvcmQ8L2E+LjwvcD5cbiAgICAgICAgICA8aT48cCBpZD0nZXJyb3ItbWVzc2FnZSc+e2Vycm9yfTwvcD48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBBVkFJTEFCTEUpICYmXG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX0gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHZpZGVvIGNsYXNzTmFtZT0nYXNzZXQgdmlkZW8nIGNvbnRyb2xzIHBvc3Rlcj17dGh1bWJuYWlsfT5cbiAgICAgICAgICAgICAgICAgIDxzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8cD5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgPGNvZGU+dmlkZW88L2NvZGU+IGVsZW1lbnQuPC9wPlxuICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPlVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXREaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Bc3NldERpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAnY29tcG9uZW50cy9FcnJvclBhZ2UnO1xuaW1wb3J0IEFzc2V0VGl0bGUgZnJvbSAnY29udGFpbmVycy9Bc3NldFRpdGxlJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuaW1wb3J0IEFzc2V0SW5mbyBmcm9tICdjb250YWluZXJzL0Fzc2V0SW5mbyc7XG5cbmNsYXNzIFNob3dBc3NldERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IGNsYWltRGF0YTogeyBuYW1lIH0gfSA9IGFzc2V0O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17YCR7bmFtZX0gLSBkZXRhaWxzYH0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8QXNzZXRUaXRsZSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgc2hvdy1kZXRhaWxzLWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICAgICAgPEFzc2V0SW5mbyAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yUGFnZSBlcnJvcj17J2xvYWRpbmcgYXNzZXQgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0Fzc2V0RGV0YWlscztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YTogeyB0aXRsZSB9IH0gPSBzZWxlY3RBc3NldChzaG93KTtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEFzc2V0VGl0bGUgPSAoeyB0aXRsZSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dC0tbGFyZ2UnPnt0aXRsZX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFRpdGxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIEFzc2V0SW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNvcHlUb0NsaXBib2FyZCA9IHRoaXMuY29weVRvQ2xpcGJvYXJkLmJpbmQodGhpcyk7XG4gIH1cbiAgY29weVRvQ2xpcGJvYXJkIChldmVudCkge1xuICAgIHZhciBlbGVtZW50VG9Db3B5ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuZWxlbWVudHRvY29weTtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb0NvcHkpO1xuICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ09vcHMsIHVuYWJsZSB0byBjb3B5J30pO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgc2hvcnRJZCwgY2xhaW1EYXRhIDogeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgZGVzY3JpcHRpb24sIG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwsIGhvc3QgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7Y2hhbm5lbE5hbWUgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+Q2hhbm5lbDo8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz48TGluayB0bz17YC8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9YH0+e2NoYW5uZWxOYW1lfTwvTGluaz48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAge2Rlc2NyaXB0aW9uICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPntkZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgPGRpdiBpZD0nc2hvdy1zaGFyZS1idXR0b25zJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSBmbGV4LWNvbnRhaW5lci0td3JhcCc+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT50d2l0dGVyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PmZhY2Vib29rPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwOi8vdHVtYmxyLmNvbS93aWRnZXRzL3NoYXJlL3Rvb2w/Y2Fub25pY2FsVXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHVtYmxyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5yZWRkaXQuY29tL3N1Ym1pdD91cmw9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0mdGl0bGU9JHtuYW1lfWB9PnJlZGRpdDwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hvcnQtbGluayc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+TGluazo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1zaG9ydC1saW5rJyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nc2hvcnQtbGluaycgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Ake2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEnIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTInPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLXdpZGUnIGRhdGEtZWxlbWVudHRvY29weT0nc2hvcnQtbGluaydcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jb3B5VG9DbGlwYm9hcmR9PmNvcHlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBpZD0nc2hvdy1lbWJlZC1jb2RlJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5FbWJlZDo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1lbWJlZC10ZXh0JyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHsoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnKSA/IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPHZpZGVvIHdpZHRoPVwiMTAwJVwiIGNvbnRyb2xzIHBvc3Rlcj1cIiR7dGh1bWJuYWlsfVwiIHNyYz1cIiR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1cIi8+PC92aWRlbz5gfSAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPGltZyBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPmB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J2VtYmVkLXRleHQnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tYm90dG9tJz5cbiAgICAgICAgICA8TGluayBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRvPXtgLyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0+PHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dCc+RGlyZWN0IExpbms8L3NwYW4+PC9MaW5rPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj17YCR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfSBkb3dubG9hZD17bmFtZX0+RG93bmxvYWQ8L2E+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2RtY2EnPlJlcG9ydDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0SW5mbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvQXNzZXRJbmZvL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IHJlcXVlc3RcbiAgY29uc3QgcHJldmlvdXNSZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIC8vIHNlbGVjdCBjaGFubmVsXG4gIGxldCBjaGFubmVsO1xuICBpZiAocHJldmlvdXNSZXF1ZXN0KSB7XG4gICAgY29uc3QgY2hhbm5lbEtleSA9IHByZXZpb3VzUmVxdWVzdC5rZXk7XG4gICAgY2hhbm5lbCA9IHNob3cuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0gfHwgbnVsbDtcbiAgfVxuICByZXR1cm4ge1xuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdjb21wb25lbnRzL0Vycm9yUGFnZSc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsQ2xhaW1zRGlzcGxheSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5JztcblxuY2xhc3MgU2hvd0NoYW5uZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBsb25nSWQsIHNob3J0SWQgfSA9IGNoYW5uZWw7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBjaGFubmVsPXtjaGFubmVsfSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8aDI+Y2hhbm5lbCBuYW1lOiB7bmFtZX08L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eydmaW5lLXByaW50J30+ZnVsbCBjaGFubmVsIGlkOiB7bG9uZ0lkfTwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PnNob3J0IGNoYW5uZWwgaWQ6IHtzaG9ydElkfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDbGFpbXNEaXNwbGF5IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGNoYW5uZWwgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0NoYW5uZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL1Nob3dDaGFubmVsL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uVXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGNoYW5uZWwga2V5XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSByZXF1ZXN0LmtleTtcbiAgLy8gc2VsZWN0IGNoYW5uZWwgY2xhaW1zXG4gIGNvbnN0IGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxLZXksXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25VcGRhdGVDaGFubmVsQ2xhaW1zLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBc3NldFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9Bc3NldFByZXZpZXcnO1xuXG5jbGFzcyBDaGFubmVsQ2xhaW1zRGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlID0gdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICB9XG4gIHNob3dQcmV2aW91c1Jlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKHByZXZpb3VzUGFnZSk7XG4gIH1cbiAgc2hvd05leHRSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5leHRQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpICsgMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKG5leHRQYWdlKTtcbiAgfVxuICBzaG93TmV3UGFnZSAocGFnZSkge1xuICAgIGNvbnN0IHsgY2hhbm5lbEtleSwgY2hhbm5lbDogeyBuYW1lLCBsb25nSWQgfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uVXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY2xhaW1zLCBjdXJyZW50UGFnZSwgdG90YWxQYWdlcyB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsJz5cbiAgICAgICAgeyhjbGFpbXMubGVuZ3RoID4gMCkgPyAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHtjbGFpbXMubWFwKChjbGFpbSwgaW5kZXgpID0+IDxBc3NldFByZXZpZXdcbiAgICAgICAgICAgICAgY2xhaW1EYXRhPXtjbGFpbX1cbiAgICAgICAgICAgICAga2V5PXtgJHtjbGFpbS5uYW1lfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAvPil9XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlID4gMSkgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2V9PlByZXZpb3VzIFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcykgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd05leHRSZXN1bHRzUGFnZX0+TmV4dCBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwPlRoZXJlIGFyZSBubyBjbGFpbXMgaW4gdGhpcyBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENsYWltc0Rpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7c2l0ZToge2RlZmF1bHRzOiB7IGRlZmF1bHRUaHVtYm5haWwgfX19KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY29uc3QgQXNzZXRQcmV2aWV3ID0gKHsgZGVmYXVsdFRodW1ibmFpbCwgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwgfSB9KSA9PiB7XG4gIGNvbnN0IGRpcmVjdFNvdXJjZUxpbmsgPSBgJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gO1xuICBjb25zdCBzaG93VXJsTGluayA9IGAvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nYXNzZXQtaG9sZGVyJz5cbiAgICAgIDxMaW5rIHRvPXtzaG93VXJsTGlua30gPlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydhc3NldC1wcmV2aWV3J31cbiAgICAgICAgICAgICAgICAgIHNyYz17ZGlyZWN0U291cmNlTGlua31cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydhc3NldC1wcmV2aWV3IHZpZGVvJ31cbiAgICAgICAgICAgICAgICAgIHNyYz17dGh1bWJuYWlsIHx8IGRlZmF1bHRUaHVtYm5haWx9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+dW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKX1cbiAgICAgIDwvTGluaz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0UHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGU6IHsgaG9zdCwgdGl0bGUgfSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9zdCxcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlYWN0L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXIvaW5kZXgnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jbGFzcyBGb3VyT2hGb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7dGl0bGUsIGhvc3R9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfSAtIDQwNDwvdGl0bGU+XG4gICAgICAgICAgPGxpbmsgcmVsPSdjYW5vbmljYWwnIGhyZWY9e2Ake2hvc3R9LzQwNGB9IC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxoMj40MDQ8L2gyPlxuICAgICAgICAgIDxwPlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3VyT2hGb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS92aWV3LmpzeCIsImNvbnN0IHsgc2VuZEdBU2VydmVFdmVudCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9nb29nbGVBbmFseXRpY3MnKTtcbmNvbnN0IHsgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlLCBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5LCBsb2dSZXF1ZXN0RGF0YSwgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnLi4vaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gcm91dGUgdG8gc2VydmUgYSBzcGVjaWZpYyBhc3NldCB1c2luZyB0aGUgY2hhbm5lbCBvciBjbGFpbSBpZFxuICBhcHAuZ2V0KCcvOmlkZW50aWZpZXIvOmNsYWltJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAgIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gICAgdHJ5IHtcbiAgICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICAgIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gICAgfVxuICAgIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gICAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gICAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAgIC8vIHBhcnNlIHRoZSBjbGFpbVxuICAgIGxldCBjbGFpbU5hbWU7XG4gICAgdHJ5IHtcbiAgICAgICh7IGNsYWltTmFtZSB9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIC8vIHBhcnNlIHRoZSBpZGVudGlmaWVyXG4gICAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkO1xuICAgIHRyeSB7XG4gICAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIocGFyYW1zLmlkZW50aWZpZXIpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICBpZiAoIWlzQ2hhbm5lbCkge1xuICAgICAgW2NsYWltSWQsIGNsYWltTmFtZV0gPSBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5KGNsYWltSWQsIGNsYWltTmFtZSk7XG4gICAgfVxuICAgIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpO1xuICAgIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gICAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHNlcnZlIHRoZSB3aW5uaW5nIGFzc2V0IGF0IGEgY2xhaW0gb3IgYSBjaGFubmVsIHBhZ2VcbiAgYXBwLmdldCgnLzpjbGFpbScsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICAgIHRyeSB7XG4gICAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICAgIH1cbiAgICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAgIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICAgIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgICBsZXQgY2xhaW1OYW1lO1xuICAgIHRyeSB7XG4gICAgICAoe2NsYWltTmFtZX0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICAgIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBudWxsLCBudWxsKTtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KG51bGwsIG51bGwsIGNsYWltTmFtZSwgbnVsbCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yb3V0ZXMvc2VydmUtcm91dGVzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBnZXRDbGFpbUlkLCBnZXRMb2NhbEZpbGVSZWNvcmQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuY29uc3QgU0hPVyA9ICdTSE9XJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5mdW5jdGlvbiBjbGllbnRBY2NlcHRzSHRtbCAoe2FjY2VwdH0pIHtcbiAgcmV0dXJuIGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLyk7XG59O1xuXG5mdW5jdGlvbiByZXF1ZXN0SXNGcm9tQnJvd3NlciAoaGVhZGVycykge1xuICByZXR1cm4gaGVhZGVyc1sndXNlci1hZ2VudCddICYmIGhlYWRlcnNbJ3VzZXItYWdlbnQnXS5tYXRjaCgvTW96aWxsYS8pO1xufTtcblxuZnVuY3Rpb24gY2xpZW50V2FudHNBc3NldCAoe2FjY2VwdCwgcmFuZ2V9KSB7XG4gIGNvbnN0IGltYWdlSXNXYW50ZWQgPSBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC9pbWFnZVxcLy4qLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvXFwqLyk7XG4gIGNvbnN0IHZpZGVvSXNXYW50ZWQgPSBhY2NlcHQgJiYgcmFuZ2U7XG4gIHJldHVybiBpbWFnZUlzV2FudGVkIHx8IHZpZGVvSXNXYW50ZWQ7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2xhaW1JZCAoY2xhaW1JZCkge1xuICByZXR1cm4gKChjbGFpbUlkLmxlbmd0aCA9PT0gNDApICYmICEvW15BLVphLXowLTldL2cudGVzdChjbGFpbUlkKSk7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZCAoY2xhaW1JZCkge1xuICByZXR1cm4gY2xhaW1JZC5sZW5ndGggPT09IDE7ICAvLyBpdCBzaG91bGQgcmVhbGx5IGV2YWx1YXRlIHRoZSBzaG9ydCB1cmwgaXRzZWxmXG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCAoaW5wdXQpIHtcbiAgcmV0dXJuIChpc1ZhbGlkQ2xhaW1JZChpbnB1dCkgfHwgaXNWYWxpZFNob3J0SWQoaW5wdXQpKTtcbn07XG5cbmZ1bmN0aW9uIHNlcnZlQXNzZXRUb0NsaWVudCAoY2xhaW1JZCwgbmFtZSwgcmVzKSB7XG4gIHJldHVybiBnZXRMb2NhbEZpbGVSZWNvcmQoY2xhaW1JZCwgbmFtZSlcbiAgICAudGhlbihmaWxlUmVjb3JkID0+IHtcbiAgICAgIC8vIGNoZWNrIHRoYXQgYSBsb2NhbCByZWNvcmQgd2FzIGZvdW5kXG4gICAgICBpZiAoZmlsZVJlY29yZCA9PT0gTk9fRklMRSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygzMDcpLnJlZGlyZWN0KGAvYXBpL2NsYWltL2dldC8ke25hbWV9LyR7Y2xhaW1JZH1gKTtcbiAgICAgIH1cbiAgICAgIC8vIHNlcnZlIHRoZSBmaWxlXG4gICAgICBjb25zdCB7ZmlsZVBhdGgsIGZpbGVUeXBlfSA9IGZpbGVSZWNvcmQ7XG4gICAgICBsb2dnZXIudmVyYm9zZShgc2VydmluZyBmaWxlOiAke2ZpbGVQYXRofWApO1xuICAgICAgY29uc3Qgc2VuZEZpbGVPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgICAgICAgOiBmaWxlVHlwZSB8fCAnaW1hZ2UvanBlZycsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmRGaWxlKGZpbGVQYXRoLCBzZW5kRmlsZU9wdGlvbnMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpIHtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihmdWxsQ2xhaW1JZCA9PiB7XG4gICAgICAgIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2hhbm5lbCBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2ZUFzc2V0VG9DbGllbnQoZnVsbENsYWltSWQsIGNsYWltTmFtZSwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdzdWNjZXNzJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ2ZhaWwnKTtcbiAgICAgIH0pO1xuICB9LFxuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUgKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2VUeXBlO1xuICAgIGlmIChoYXNGaWxlRXh0ZW5zaW9uKSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTsgIC8vIGFzc3VtZSBhIHNlcnZlIHJlcXVlc3QgaWYgZmlsZSBleHRlbnNpb24gaXMgcHJlc2VudFxuICAgICAgaWYgKGNsaWVudEFjY2VwdHNIdG1sKGhlYWRlcnMpKSB7ICAvLyBpZiB0aGUgcmVxdWVzdCBjb21lcyBmcm9tIGEgYnJvd3NlciwgY2hhbmdlIGl0IHRvIGEgc2hvdyByZXF1ZXN0XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICBpZiAoY2xpZW50V2FudHNBc3NldChoZWFkZXJzKSAmJiByZXF1ZXN0SXNGcm9tQnJvd3NlcihoZWFkZXJzKSkgeyAgLy8gdGhpcyBpcyBpbiBjYXNlIHNvbWVvbmUgZW1iZWRzIGEgc2hvdyB1cmxcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdTaG93IHJlcXVlc3QgY2FtZSBmcm9tIGJyb3dzZXIgYnV0IHdhbnRzIGFuIGltYWdlL3ZpZGVvLiBDaGFuZ2luZyByZXNwb25zZSB0byBzZXJ2ZS4uLicpO1xuICAgICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlVHlwZTtcbiAgfSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSAoaWRlbnRpZmllciwgbmFtZSkge1xuICAgIC8vIHRoaXMgaXMgYSBwYXRjaCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCAnL25hbWUvY2xhaW1faWQnIHVybCBmb3JtYXRcbiAgICBpZiAoaXNWYWxpZFNob3J0SWRPckNsYWltSWQobmFtZSkgJiYgIWlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKGlkZW50aWZpZXIpKSB7XG4gICAgICBjb25zdCB0ZW1wTmFtZSA9IG5hbWU7XG4gICAgICBuYW1lID0gaWRlbnRpZmllcjtcbiAgICAgIGlkZW50aWZpZXIgPSB0ZW1wTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFtpZGVudGlmaWVyLCBuYW1lXTtcbiAgfSxcbiAgbG9nUmVxdWVzdERhdGEgKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZygncmVzcG9uc2VUeXBlID09PScsIHJlc3BvbnNlVHlwZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBuYW1lID09PSAnLCBjbGFpbU5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBuYW1lID09PScsIGNoYW5uZWxOYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIGlkID09PScsIGNsYWltSWQpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIGlkZW50aWZpZXI6JywgaWRlbnRpZmllcik7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke3ZhbHVlfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIHVybC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbCBuYW1lIGFmdGVyIEAuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1JZCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbmFtZTonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSAuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgJHttb2RpZmllclNlcGVyYXRvcn0uYCk7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAke21vZGlmaWVyU2VwZXJhdG9yfSBtb2RpZmllciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lYCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICB9O1xuICB9LFxuICBwYXJzZU1vZGlmaWVyOiBmdW5jdGlvbiAoY2xhaW0pIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgbW9kaWZpZXI6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy9sYnJ5VXJpLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnLi4vcmVhY3QvcmVkdWNlcnMnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uL3JlYWN0L2NvbnRhaW5lcnMvR0FMaXN0ZW5lcic7XG5pbXBvcnQgQXBwIGZyb20gJy4uL3JlYWN0L2FwcCc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZSc7XG5pbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUgZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBjYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7IGhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnLi4vcmVhY3Qvc2FnYXMvc2hvd191cmknO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uL3JlYWN0L2FjdGlvbnMvc2hvdyc7XG5cbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY29uc3QgcmV0dXJuU2FnYVdpdGhQYXJhbXMgPSAoc2FnYSwgcGFyYW1zKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiAqICgpIHtcbiAgICB5aWVsZCBjYWxsKHNhZ2EsIHBhcmFtcyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhbmQgYXBwbHkgbWlkZGxld2FyZVxuICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XG4gIGNvbnN0IG1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUoc2FnYU1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIsIG1pZGRsZXdhcmUpO1xuXG4gIC8vIGNyZWF0ZSBzYWdhXG4gIGNvbnN0IGFjdGlvbiA9IG9uSGFuZGxlU2hvd1BhZ2VVcmkocmVxLnBhcmFtcyk7XG4gIGNvbnN0IHNhZ2EgPSByZXR1cm5TYWdhV2l0aFBhcmFtcyhoYW5kbGVTaG93UGFnZVVyaSwgYWN0aW9uKTtcblxuICAvLyBydW4gdGhlIHNhZ2EgbWlkZGxld2FyZVxuICBzYWdhTWlkZGxld2FyZVxuICAgIC5ydW4oc2FnYSlcbiAgICAuZG9uZVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgICAgIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICAgICAgPEFwcCAvPlxuICAgICAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgKTtcblxuICAgICAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICAgICAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gICAgICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICAgICAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICAgICAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gICAgICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICAgICAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYVwiXG4vLyBtb2R1bGUgaWQgPSAxNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IG9uUmVxdWVzdEVycm9yLCBvbk5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBuZXdBc3NldFJlcXVlc3QgfSBmcm9tICdzYWdhcy9zaG93X2Fzc2V0JztcbmltcG9ydCB7IG5ld0NoYW5uZWxSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19jaGFubmVsJztcbmltcG9ydCBsYnJ5VXJpIGZyb20gJ3V0aWxzL2xicnlVcmknO1xuXG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlSWRlbnRpZmllckFuZENsYWltIChtb2RpZmllciwgY2xhaW0pIHtcbiAgLy8gdGhpcyBpcyBhIHJlcXVlc3QgZm9yIGFuIGFzc2V0XG4gIC8vIGNsYWltIHdpbGwgYmUgYW4gYXNzZXQgY2xhaW1cbiAgLy8gdGhlIGlkZW50aWZpZXIgY291bGQgYmUgYSBjaGFubmVsIG9yIGEgY2xhaW0gaWRcbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkLCBjbGFpbU5hbWUsIGV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIobW9kaWZpZXIpKTtcbiAgICAoeyBjbGFpbU5hbWUsIGV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZUNsYWltKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gdHJpZ2dlciBhbiBuZXcgYWN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RvcmVcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGV4dGVuc2lvbikpO1xuICB9O1xuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBjbGFpbUlkLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cbmZ1bmN0aW9uICogcGFyc2VBbmRVcGRhdGVDbGFpbU9ubHkgKGNsYWltKSB7XG4gIC8vIHRoaXMgY291bGQgYmUgYSByZXF1ZXN0IGZvciBhbiBhc3NldCBvciBhIGNoYW5uZWwgcGFnZVxuICAvLyBjbGFpbSBjb3VsZCBiZSBhbiBhc3NldCBjbGFpbSBvciBhIGNoYW5uZWwgY2xhaW1cbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIC8vIHJldHVybiBlYXJseSBpZiB0aGlzIHJlcXVlc3QgaXMgZm9yIGEgY2hhbm5lbFxuICBpZiAoaXNDaGFubmVsKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwobmV3Q2hhbm5lbFJlcXVlc3QsIG9uTmV3Q2hhbm5lbFJlcXVlc3QoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSk7XG4gIH1cbiAgLy8gaWYgbm90IGZvciBhIGNoYW5uZWwsIHBhcnNlIHRoZSBjbGFpbSByZXF1ZXN0XG4gIGxldCBjbGFpbU5hbWUsIGV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoe2NsYWltTmFtZSwgZXh0ZW5zaW9ufSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIG51bGwsIG51bGwsIG51bGwsIGV4dGVuc2lvbikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiBoYW5kbGVTaG93UGFnZVVyaSAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgaWRlbnRpZmllciwgY2xhaW0gfSA9IGFjdGlvbi5kYXRhO1xuICBpZiAoaWRlbnRpZmllcikge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKHBhcnNlQW5kVXBkYXRlSWRlbnRpZmllckFuZENsYWltLCBpZGVudGlmaWVyLCBjbGFpbSk7XG4gIH1cbiAgeWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUNsYWltT25seSwgY2xhaW0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hIYW5kbGVTaG93UGFnZVVyaSAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5IQU5ETEVfU0hPV19VUkksIGhhbmRsZVNob3dQYWdlVXJpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9zYWdhcy9zaG93X3VyaS5qcyIsImltcG9ydCB7IGNhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCBhZGRBc3NldFRvQXNzZXRMaXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldExvbmdDbGFpbUlkLCBnZXRTaG9ydElkLCBnZXRDbGFpbURhdGEgfSBmcm9tICdhcGkvYXNzZXRBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdBc3NldFJlcXVlc3QgKGFjdGlvbikge1xuICBjb25zdCB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIG5hbWUsIG1vZGlmaWVyIH0gPSBhY3Rpb24uZGF0YTtcbiAgLy8gcHV0IGFuIGFjdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgaW4gcmVkdXhcbiAgeWllbGQgcHV0KG9uUmVxdWVzdFVwZGF0ZShyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgcmVxdWVzdD9cbiAgLy8gSWYgdGhpcyB1cmkgaXMgaW4gdGhlIHJlcXVlc3QgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBjb25zdCBzdGF0ZSA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaG93U3RhdGUpO1xuICBpZiAoc3RhdGUucmVxdWVzdExpc3RbcmVxdWVzdElkXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBsb25nIGlkICYmIGFkZCByZXF1ZXN0IHRvIHJlcXVlc3QgbGlzdFxuICBsZXQgbG9uZ0lkO1xuICB0cnkge1xuICAgICh7ZGF0YTogbG9uZ0lkfSA9IHlpZWxkIGNhbGwoZ2V0TG9uZ0NsYWltSWQsIG5hbWUsIG1vZGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgY29uc3QgYXNzZXRLZXkgPSBgYSMke25hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGFzc2V0S2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgYXNzZXQ/XG4gIC8vIElmIHRoaXMgYXNzZXQgaXMgaW4gdGhlIGFzc2V0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmFzc2V0TGlzdFthc3NldEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgc2hvcnQgSWRcbiAgbGV0IHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBzaG9ydElkfSA9IHlpZWxkIGNhbGwoZ2V0U2hvcnRJZCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gZ2V0IGFzc2V0IGNsYWltIGRhdGFcbiAgbGV0IGNsYWltRGF0YTtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGNsYWltRGF0YX0gPSB5aWVsZCBjYWxsKGdldENsYWltRGF0YSwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gYWRkIGFzc2V0IHRvIGFzc2V0IGxpc3RcbiAgeWllbGQgcHV0KGFkZEFzc2V0VG9Bc3NldExpc3QoYXNzZXRLZXksIG51bGwsIG5hbWUsIGxvbmdJZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSk7XG4gIC8vIGNsZWFyIGFueSBlcnJvcnMgaW4gcmVxdWVzdCBlcnJvclxuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hOZXdBc3NldFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsIG5ld0Fzc2V0UmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3Qvc2FnYXMvc2hvd19hc3NldC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvbmdDbGFpbUlkIChuYW1lLCBtb2RpZmllcikge1xuICBsZXQgYm9keSA9IHt9O1xuICAvLyBjcmVhdGUgcmVxdWVzdCBwYXJhbXNcbiAgaWYgKG1vZGlmaWVyKSB7XG4gICAgaWYgKG1vZGlmaWVyLmlkKSB7XG4gICAgICBib2R5WydjbGFpbUlkJ10gPSBtb2RpZmllci5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keVsnY2hhbm5lbE5hbWUnXSA9IG1vZGlmaWVyLmNoYW5uZWwubmFtZTtcbiAgICAgIGJvZHlbJ2NoYW5uZWxDbGFpbUlkJ10gPSBtb2RpZmllci5jaGFubmVsLmlkO1xuICAgIH1cbiAgfVxuICBib2R5WydjbGFpbU5hbWUnXSA9IG5hbWU7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH07XG4gIC8vIGNyZWF0ZSB1cmxcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2xvbmctaWRgO1xuICAvLyByZXR1cm4gdGhlIHJlcXVlc3QgcHJvbWlzZVxuICByZXR1cm4gUmVxdWVzdCh1cmwsIHBhcmFtcyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnRJZCAobmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vc2hvcnQtaWQvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFpbURhdGEgKG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2RhdGEvJHtuYW1lfS8ke2NsYWltSWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9hcGkvYXNzZXRBcGkuanMiLCJpbXBvcnQge2NhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QsIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCB1cGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldENoYW5uZWxDbGFpbXMsIGdldENoYW5uZWxEYXRhIH0gZnJvbSAnYXBpL2NoYW5uZWxBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdDaGFubmVsUmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBsb25nIGlkXG4gIGxldCBsb25nSWQsIHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHsgZGF0YToge2xvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0lkLCBzaG9ydENoYW5uZWxDbGFpbUlkOiBzaG9ydElkfSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsRGF0YSwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHN0b3JlIHRoZSByZXF1ZXN0IGluIHRoZSBjaGFubmVsIHJlcXVlc3RzIGxpc3RcbiAgY29uc3QgY2hhbm5lbEtleSA9IGBjIyR7Y2hhbm5lbE5hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGNoYW5uZWxLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBjaGFubmVsP1xuICAvLyBJZiB0aGlzIGNoYW5uZWwgaXMgaW4gdGhlIGNoYW5uZWwgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBjbGFpbXMgZGF0YVxuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIGNoYW5uZWxOYW1lLCBsb25nSWQsIDEpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgY2hhbm5lbCBkYXRhIGluIHRoZSBjaGFubmVsIGxpc3RcbiAgeWllbGQgcHV0KGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0KGNoYW5uZWxLZXksIGNoYW5uZWxOYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpKTtcbiAgLy8gY2xlYXIgYW55IHJlcXVlc3QgZXJyb3JzXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3Q2hhbm5lbFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVywgbmV3Q2hhbm5lbFJlcXVlc3QpO1xufTtcblxuZnVuY3Rpb24gKiBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsIChhY3Rpb24pIHtcbiAgY29uc3QgeyBjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UgfSA9IGFjdGlvbi5kYXRhO1xuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIG5hbWUsIGxvbmdJZCwgcGFnZSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIHlpZWxkIHB1dCh1cGRhdGVDaGFubmVsQ2xhaW1zKGNoYW5uZWxLZXksIGNsYWltc0RhdGEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hVcGRhdGVDaGFubmVsQ2xhaW1zICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQywgZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcbmNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFubmVsRGF0YSAobmFtZSwgaWQpIHtcbiAgaWYgKCFpZCkgaWQgPSAnbm9uZSc7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jaGFubmVsL2RhdGEvJHtuYW1lfS8ke2lkfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbENsYWltcyAobmFtZSwgbG9uZ0lkLCBwYWdlKSB7XG4gIGlmICghcGFnZSkgcGFnZSA9IDE7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jaGFubmVsL2NsYWltcy8ke25hbWV9LyR7bG9uZ0lkfS8ke3BhZ2V9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWFjdC9hcGkvY2hhbm5lbEFwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXggIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIGFmdGVyIFwiQFwiLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQ6IGNoYW5uZWxDbGFpbUlkIHx8IG51bGwsXG4gICAgICBjbGFpbUlkICAgICAgIDogY2xhaW1JZCB8fCBudWxsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgZXh0ZW5zaW9uKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIGV4dGVuc2lvbiBzZXBhcmF0b3IsIGV4dGVuc2lvbiAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBleHRlbnNpb25TZXBlcmF0b3IsIGV4dGVuc2lvbl0gPSBjb21wb25lbnRzUmVnZXggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMobmFtZSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIi5cIicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIGV4dGVuc2lvblxuICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IpIHtcbiAgICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIi5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIgc2VwYXJhdG9yIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWUuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgICBleHRlbnNpb246IGV4dGVuc2lvbiB8fCBudWxsLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVhY3QvdXRpbHMvbGJyeVVyaS5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwID0+IHtcbiAgLy8gYSBjYXRjaC1hbGwgcm91dGUgaWYgc29tZW9uZSB2aXNpdHMgYSBwYWdlIHRoYXQgZG9lcyBub3QgZXhpc3RcbiAgYXBwLnVzZSgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2VcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=