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
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

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
  this.update = function (config) {
    if (!config) {
      return logger.warn('No site config received.');
    }
    var analytics = config.analytics,
        assetDefaults = config.assetDefaults,
        auth = config.auth,
        customComponents = config.customComponents,
        details = config.details,
        publishing = config.publishing;

    logger.info('Configuring site details...');
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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

function mysql() {
  var _this = this;

  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.update = function (config) {
    if (!config) {
      return logger.warn('No MySQL config received.');
    }
    // configure credentials
    logger.info('configuring mysql...');
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(25);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(116);

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

var _show_action_types = __webpack_require__(16);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var ua = __webpack_require__(71);

var _require = __webpack_require__(4),
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Certificate = __webpack_require__(85);
var Channel = __webpack_require__(86);
var Claim = __webpack_require__(87);
var File = __webpack_require__(88);
var Request = __webpack_require__(89);
var User = __webpack_require__(90);

var Sequelize = __webpack_require__(29);
var logger = __webpack_require__(2);

var _require = __webpack_require__(7),
    database = _require.database,
    username = _require.username,
    password = _require.password;

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
  logger.error('Sequelize was unable to connect to the database:', err);
});

// manually add each model to the db object (note: make this dynamic)
var db = {};
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

module.exports = db;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(112);

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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = request;

__webpack_require__(119);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(69);
var logger = __webpack_require__(2);

var _require = __webpack_require__(70),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(10),
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(7),
    db = _require.db;

var logger = __webpack_require__(2);

var _require2 = __webpack_require__(82),
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
/* 19 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(66);
var localLoginStrategy = __webpack_require__(67);
var localSignupStrategy = __webpack_require__(68);

var _require = __webpack_require__(72),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

passport.deserializeUser(deserializeSpeechUser);
passport.serializeUser(serializeSpeechUser);
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

module.exports = passport;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(2);

var _require = __webpack_require__(7),
    db = _require.db;

var lbryApi = __webpack_require__(15);
var publishHelpers = __webpack_require__(23);

var _require2 = __webpack_require__(4),
    _require2$publishing = _require2.publishing,
    primaryClaimAddress = _require2$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require2$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(29);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var fs = __webpack_require__(80);

var _require = __webpack_require__(4),
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
/* 24 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveStatusBar = __webpack_require__(141);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(142);

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

var _propTypes = __webpack_require__(13);

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

module.exports = require("passport-local");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(32);

var _redux = __webpack_require__(24);

var _reducers = __webpack_require__(33);

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(5);

var _GAListener = __webpack_require__(38);

var _GAListener2 = _interopRequireDefault(_GAListener);

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(45);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(19);

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

var _redux = __webpack_require__(24);

var _publish = __webpack_require__(106);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(107);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(108);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(109);

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

var _reactGa = __webpack_require__(110);

var _reactGa2 = _interopRequireDefault(_reactGa);

var _reactRouterDom = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(4),
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _HomePage = __webpack_require__(111);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _AboutPage = __webpack_require__(148);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _LoginPage = __webpack_require__(149);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(151);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(168);

var _FourOhFourPage2 = _interopRequireDefault(_FourOhFourPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { dynamicImport } from 'utils/dynamicImport';
// const HomePage = dynamicImport('pages/HomePage'); // or use the provided local homepage

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

var _publish = __webpack_require__(6);

var _view = __webpack_require__(122);

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

var _channel = __webpack_require__(25);

var _view = __webpack_require__(139);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(6);

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

var _channel = __webpack_require__(25);

var _view = __webpack_require__(140);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(6);

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

var _view = __webpack_require__(155);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(9);

var _show2 = __webpack_require__(17);

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

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(18),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(3),
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
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(32);

var _redux = __webpack_require__(24);

var _index = __webpack_require__(33);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(5);

var _index3 = __webpack_require__(38);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(45);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(174);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(20);

var _show_uri = __webpack_require__(175);

var _show = __webpack_require__(9);

var _reactHelmet = __webpack_require__(19);

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
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(52);
module.exports = __webpack_require__(53);


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Server = __webpack_require__(54);

var _exports = {
  Server: Server
};

module.exports = _exports;

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
var cookieSession = __webpack_require__(60);
var http = __webpack_require__(61);
var logger = __webpack_require__(2);
var requestLogger = __webpack_require__(62);

var loggerConfig = __webpack_require__(63);
var mysqlConfig = __webpack_require__(7);
var siteConfig = __webpack_require__(4);
var slackConfig = __webpack_require__(64);

function Server() {
  var _this = this;

  this.configureLogger = function (userConfig) {
    loggerConfig.update(userConfig);
  };
  this.configureMysql = function (userConfig) {
    mysqlConfig.update(userConfig);
  };
  this.configureSiteDetails = function (userConfig) {
    siteConfig.update(userConfig);
  };
  this.configureSlack = function (userConfig) {
    slackConfig.update(userConfig);
  };
  this.configureClientBundle = function () {
    logger.debug('configure the client here by passing in the bundle and configuring it, or better yet: taking in the components to use dynamically from here.');
  };
  this.configureModels = function () {
    logger.debug('here is where you could add/overwrite the default models');
  };
  this.configureRoutes = function () {
    logger.debug('here is where you could add/overwrite the default routes');
  };
  this.createApp = function () {
    // create an Express application
    var app = express();

    // trust the proxy to get ip address for us
    app.enable('trust proxy');

    // add middleware
    app.use(helmet()); // set HTTP headers to protect against well-known web vulnerabilties
    app.use(express.static(__dirname + '/public')); // 'express.static' to serve static files from public directory
    // note: take in a different public folder, so it can serve it's own bundle from there?
    app.use(bodyParser.json()); // 'body parser' for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // 'body parser' for parsing application/x-www-form-urlencoded

    // add custom middleware (note: build out to accept dynamically use what is in server/middleware/
    app.use(requestLogger);

    // configure passport
    var speechPassport = __webpack_require__(21);
    // initialize passport
    var sessionKey = siteConfig.auth.sessionKey;
    app.use(cookieSession({
      name: 'session',
      keys: [sessionKey],
      maxAge: 24 * 60 * 60 * 1000 // i.e. 24 hours
    }));
    app.use(speechPassport.initialize());
    app.use(speechPassport.session());

    // configure handlebars & register it with express app
    var hbs = expressHandlebars.create({
      defaultLayout: 'embed',
      handlebars: Handlebars
    });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // set the routes on the app
    __webpack_require__(73)(app);
    __webpack_require__(78)(app);
    __webpack_require__(104)(app);
    __webpack_require__(172)(app);
    __webpack_require__(182)(app);

    _this.app = app;
  };
  this.initialize = function () {
    _this.createApp();
    _this.server = http.Server(_this.app);
  };
  this.start = function () {
    var db = __webpack_require__(11);
    var PORT = siteConfig.details.port;
    // sync sequelize
    db.sequelize.sync()
    // start the server
    .then(function () {
      _this.server.listen(PORT, function () {
        logger.info('Server is listening on PORT ' + PORT);
      });
    }).catch(function (error) {
      logger.error('Startup Error:', error);
    });
  };
};

module.exports = Server;

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
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var requestLogger = function requestLogger(req, res, next) {
  // custom logging middleware to log all incoming http requests
  logger.verbose('Request on ' + req.originalUrl + ' from ' + req.ip);
  next();
};

module.exports = requestLogger;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

function LoggerConfig() {
  var _this = this;

  this.logLevel = 'debug';
  this.update = function (config) {
    if (!config) {
      return logger.warn('No logger config received.');
    }
    logger.info('configuring winston logger...');
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
    logger.info('testing winston log levels...');
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(65).SlackWebHook;
var winston = __webpack_require__(2);

function SlackConfig() {
  var _this = this;

  this.slackWebHook = 'default';
  this.slackErrorChannel = 'default';
  this.slackInfoChannel = 'default';
  this.update = function (config) {
    if (!config) {
      return winston.warn('No slack config received');
    }
    // update variables
    winston.info('configuring slack logger...');
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
      winston.info('testing slack logger...');
      winston.error('Slack "error" logging is online.');
      winston.info('Slack "info" logging is online.');
    } else {
      winston.warn('Slack logging is not enabled because no slackWebHook config var provided.');
    }
  };
};

module.exports = new SlackConfig();

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(28).Strategy;
var logger = __webpack_require__(2);

var _require = __webpack_require__(7),
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(28).Strategy;
var lbryApi = __webpack_require__(15);
var logger = __webpack_require__(2);

var _require = __webpack_require__(7),
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
/* 69 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 70 */
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
/* 71 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 72 */
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

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(21);
var handleSignupRequest = __webpack_require__(74);
var handleLoginRequest = __webpack_require__(75);
var handleLogoutRequest = __webpack_require__(76);
var handleUserRequest = __webpack_require__(77);

module.exports = function (app) {
  app.post('/signup', speechPassport.authenticate('local-signup'), handleSignupRequest);
  app.post('/login', handleLoginRequest);
  app.get('/logout', handleLogoutRequest);
  app.get('/user', handleUserRequest);
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var signup = function signup(req, res) {
  res.status(200).json({
    success: true,
    channelName: req.user.channelName,
    channelClaimId: req.user.channelClaimId,
    shortChannelId: req.user.shortChannelId
  });
};

module.exports = signup;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(21);

var login = function login(req, res, next) {
  speechPassport.authenticate('local-login', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message
      });
    }
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
};

module.exports = login;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logout = function logout(req, res) {
  req.logout();
  res.status(200).json({ success: true, message: 'you successfully logged out' });
};

module.exports = logout;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var user = function user(req, res) {
  if (req.user) {
    res.status(200).json({ success: true, data: req.user });
  } else {
    res.status(401).json({ success: false, message: 'user is not logged in' });
  }
};

module.exports = user;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var channelAvailability = __webpack_require__(79);
var channelClaims = __webpack_require__(81);
var channelData = __webpack_require__(83);
var channelShortId = __webpack_require__(84);
var claimAvailability = __webpack_require__(92);
var claimData = __webpack_require__(93);
var claimGet = __webpack_require__(94);
var claimLongId = __webpack_require__(95);
var claimPublish = __webpack_require__(96);
var claimResolve = __webpack_require__(98);
var claimShortId = __webpack_require__(99);
var claimList = __webpack_require__(100);
var fileAvailability = __webpack_require__(101);

var multipartMiddleware = __webpack_require__(102);

module.exports = function (app) {
  // channel routes
  app.get('/api/channel/availability/:name', channelAvailability);
  app.get('/api/channel/short-id/:longId/:name', channelShortId);
  app.get('/api/channel/data/:channelName/:channelClaimId', channelData);
  app.get('/api/channel/claims/:channelName/:channelClaimId/:page', channelClaims);
  // claim routes
  app.get('/api/claim/list/:name', claimList);
  app.get('/api/claim/get/:name/:claimId', claimGet);
  app.get('/api/claim/availability/:name', claimAvailability);
  app.get('/api/claim/resolve/:name/:claimId', claimResolve);
  app.post('/api/claim/publish', multipartMiddleware, claimPublish);
  app.get('/api/claim/short-id/:longId/:name', claimShortId);
  app.post('/api/claim/long-id', claimLongId);
  app.get('/api/claim/data/:claimName/:claimId', claimData);
  // file routes
  app.get('/api/file/availability/:name/:claimId', fileAvailability);
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(22),
    checkChannelAvailability = _require.checkChannelAvailability;

var _require2 = __webpack_require__(10),
    sendGATimingEvent = _require2.sendGATimingEvent;

var _require3 = __webpack_require__(3),
    handleErrorResponse = _require3.handleErrorResponse;

/*

  route to check whether site has published to a channel

*/

var channelAvailability = function channelAvailability(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      name = _ref.params.name;

  var gaStartTime = Date.now();
  checkChannelAvailability(name).then(function (availableName) {
    res.status(200).json(availableName);
    sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = channelAvailability;

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(18),
    getChannelClaims = _require.getChannelClaims;

var _require2 = __webpack_require__(3),
    handleErrorResponse = _require2.handleErrorResponse;

var NO_CHANNEL = 'NO_CHANNEL';

/*

  route to get all claims for channel

*/

var channelClaims = function channelClaims(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

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
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = channelClaims;

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


var _require = __webpack_require__(18),
    getChannelData = _require.getChannelData;

var _require2 = __webpack_require__(3),
    handleErrorResponse = _require2.handleErrorResponse;

var NO_CHANNEL = 'NO_CHANNEL';

/*

  route to get data for a channel

*/

var channelData = function channelData(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

  var channelName = params.channelName;
  var channelClaimId = params.channelClaimId;
  if (channelClaimId === 'none') channelClaimId = null;
  getChannelData(channelName, channelClaimId, 0).then(function (data) {
    if (data === NO_CHANNEL) {
      return res.status(404).json({ success: false, message: 'No matching channel was found' });
    }
    res.status(200).json({ success: true, data: data });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = channelData;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(11);

/*

route to get a short channel id from long channel Id

*/

var channelShortIdRoute = function channelShortIdRoute(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name).then(function (shortId) {
    res.status(200).json(shortId);
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = channelShortIdRoute;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(30),
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
/* 86 */
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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(30),
    returnShortId = _require.returnShortId;

var _require2 = __webpack_require__(4),
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
/* 88 */
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
/* 89 */
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(91);
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
/* 91 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(22),
    claimNameIsAvailable = _require.claimNameIsAvailable;

var _require2 = __webpack_require__(10),
    sendGATimingEvent = _require2.sendGATimingEvent;

var _require3 = __webpack_require__(3),
    handleErrorResponse = _require3.handleErrorResponse;

/*

  route to check whether this site published to a claim

*/

var claimAvailability = function claimAvailability(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      name = _ref.params.name;

  var gaStartTime = Date.now();
  claimNameIsAvailable(name).then(function (result) {
    res.status(200).json(result);
    sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimAvailability;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(11);

/*

  route to return data for a claim

*/

var claimData = function claimData(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

  var claimName = params.claimName;
  var claimId = params.claimId;
  if (claimId === 'none') claimId = null;
  db.Claim.resolveClaim(claimName, claimId).then(function (claimInfo) {
    if (!claimInfo) {
      return res.status(404).json({ success: false, message: 'No claim could be found' });
    }
    res.status(200).json({ success: true, data: claimInfo });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimData;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(15),
    getClaim = _require.getClaim;

var _require2 = __webpack_require__(23),
    addGetResultsToFileData = _require2.addGetResultsToFileData,
    createFileData = _require2.createFileData;

var _require3 = __webpack_require__(3),
    handleErrorResponse = _require3.handleErrorResponse;

var db = __webpack_require__(11);

/*

  route to get a claim

*/

var claimGet = function claimGet(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

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
  }).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        fileData = _ref3[0],
        getResult = _ref3[1];

    fileData = addGetResultsToFileData(fileData, getResult);
    return Promise.all([db.upsert(db.File, fileData, { name: name, claimId: claimId }, 'File'), getResult]);
  }).then(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        fileRecord = _ref5[0],
        _ref5$ = _ref5[1],
        message = _ref5$.message,
        completed = _ref5$.completed;

    res.status(200).json({ success: true, message: message, completed: completed });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimGet;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(18),
    getClaimId = _require.getClaimId;

var _require2 = __webpack_require__(3),
    handleErrorResponse = _require2.handleErrorResponse;

var NO_CHANNEL = 'NO_CHANNEL';
var NO_CLAIM = 'NO_CLAIM';

/*

  route to get a long claim id

*/

var claimLongId = function claimLongId(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

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
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimLongId;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(23),
    createBasicPublishParams = _require.createBasicPublishParams,
    createThumbnailPublishParams = _require.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require.parsePublishApiRequestFiles;

var _require2 = __webpack_require__(22),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    publish = _require2.publish;

var _require3 = __webpack_require__(97),
    authenticateUser = _require3.authenticateUser;

var _require4 = __webpack_require__(10),
    sendGATimingEvent = _require4.sendGATimingEvent;

var _require5 = __webpack_require__(3),
    handleErrorResponse = _require5.handleErrorResponse;

var _require6 = __webpack_require__(4),
    host = _require6.details.host;

/*

  route to publish a claim through the daemon

*/

var claimPublish = function claimPublish(_ref, res) {
  var body = _ref.body,
      files = _ref.files,
      headers = _ref.headers,
      ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      user = _ref.user;

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
  Promise.all([authenticateUser(channelName, channelId, channelPassword, user), claimNameIsAvailable(name), createBasicPublishParams(filePath, name, title, description, license, nsfw, thumbnail), createThumbnailPublishParams(thumbnailFilePath, name, license, nsfw)]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 4),
        _ref3$ = _ref3[0],
        channelName = _ref3$.channelName,
        channelClaimId = _ref3$.channelClaimId,
        validatedClaimName = _ref3[1],
        publishParams = _ref3[2],
        thumbnailPublishParams = _ref3[3];

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
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimPublish;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(7),
    db = _require.db;

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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(15),
    resolveUri = _require.resolveUri;

var _require2 = __webpack_require__(3),
    handleErrorResponse = _require2.handleErrorResponse;

/*

  route to run a resolve request on the daemon

*/

var claimResolve = function claimResolve(_ref, res) {
  var headers = _ref.headers,
      ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  resolveUri(params.name + '#' + params.claimId).then(function (resolvedUri) {
    res.status(200).json(resolvedUri);
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimResolve;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(11);

/*

  route to get a short claim id from long claim Id

*/

var claimShortId = function claimShortId(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      body = _ref.body,
      params = _ref.params;

  db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name).then(function (shortId) {
    res.status(200).json({ success: true, data: shortId });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimShortId;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(15),
    getClaimList = _require.getClaimList;

var _require2 = __webpack_require__(3),
    handleErrorResponse = _require2.handleErrorResponse;

/*

  route to get list of claims

*/

var claimList = function claimList(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  getClaimList(params.name).then(function (claimsList) {
    res.status(200).json(claimsList);
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = claimList;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(11);

/*

  route to see if asset is available locally

*/

var fileAvailability = function fileAvailability(_ref, res) {
  var ip = _ref.ip,
      originalUrl = _ref.originalUrl,
      params = _ref.params;

  var name = params.name;
  var claimId = params.claimId;
  db.File.findOne({
    where: {
      name: name,
      claimId: claimId
    }
  }).then(function (result) {
    if (result) {
      return res.status(200).json({ success: true, data: true });
    }
    res.status(200).json({ success: true, data: false });
  }).catch(function (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = fileAvailability;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var multipart = __webpack_require__(103);

var _require = __webpack_require__(4),
    uploadDirectory = _require.publishing.uploadDirectory;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });

module.exports = multipartMiddleware;

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(105);
var handleEmbedRequest = __webpack_require__(170);
var redirect = __webpack_require__(171);

module.exports = function (app) {
  app.get('/', handlePageRequest);
  app.get('/login', handlePageRequest);
  app.get('/about', handlePageRequest);
  app.get('/trending', redirect('/popular'));
  app.get('/popular', handlePageRequest);
  app.get('/new', handlePageRequest);
  app.get('/embed/:claimId/:name', handleEmbedRequest); // route to send embedable video player (for twitter)
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(31);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ }),
/* 106 */
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

var _require = __webpack_require__(4),
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
/* 107 */
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
/* 108 */
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

var _show_action_types = __webpack_require__(16);

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
/* 109 */
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

var siteConfig = __webpack_require__(4);

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
/* 110 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

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

var _SEO = __webpack_require__(12);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _PublishTool = __webpack_require__(120);

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
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(19);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageTitle = __webpack_require__(113);

var _metaTags = __webpack_require__(114);

var _canonicalLink = __webpack_require__(115);

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
/* 113 */
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
/* 114 */
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
/* 115 */
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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _Logo = __webpack_require__(117);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(118);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _request = __webpack_require__(14);

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
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

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
/* 118 */
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
/* 119 */
/***/ (function(module, exports) {

module.exports = require("cross-fetch/polyfill");

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(121);

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
/* 121 */
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

var _PublishDetails = __webpack_require__(125);

var _PublishDetails2 = _interopRequireDefault(_PublishDetails);

var _PublishStatus = __webpack_require__(143);

var _PublishStatus2 = _interopRequireDefault(_PublishStatus);

var _PublishDisabledMessage = __webpack_require__(146);

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
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _file = __webpack_require__(123);

var _PublishPreview = __webpack_require__(124);

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
/* 123 */
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(126);

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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _Dropzone = __webpack_require__(40);

var _Dropzone2 = _interopRequireDefault(_Dropzone);

var _PublishTitleInput = __webpack_require__(127);

var _PublishTitleInput2 = _interopRequireDefault(_PublishTitleInput);

var _PublishUrlInput = __webpack_require__(129);

var _PublishUrlInput2 = _interopRequireDefault(_PublishUrlInput);

var _PublishThumbnailInput = __webpack_require__(132);

var _PublishThumbnailInput2 = _interopRequireDefault(_PublishThumbnailInput);

var _PublishMetadataInputs = __webpack_require__(134);

var _PublishMetadataInputs2 = _interopRequireDefault(_PublishMetadataInputs);

var _ChannelSelect = __webpack_require__(137);

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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(128);

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
/* 128 */
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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publish = __webpack_require__(6);

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(130);

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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(14);

var _request2 = _interopRequireDefault(_request);

var _PublishUrlMiddleDisplay = __webpack_require__(131);

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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(133);

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
/* 133 */
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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(135);

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
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ExpandingTextArea = __webpack_require__(136);

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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(138);

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
/* 138 */
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
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(14);

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
/* 140 */
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

var _request = __webpack_require__(14);

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
/* 141 */
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
/* 142 */
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
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(144);

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
/* 144 */
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

var _publish_claim_states = __webpack_require__(145);

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
/* 145 */
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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(147);

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
/* 147 */
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
/* 148 */
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

var _SEO = __webpack_require__(12);

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
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(150);

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
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _SEO = __webpack_require__(12);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

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
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(9);

var _view = __webpack_require__(152);

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
/* 152 */
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

var _ShowAssetLite = __webpack_require__(153);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(156);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(162);

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
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(154);

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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(12);

var _SEO2 = _interopRequireDefault(_SEO);

var _reactRouterDom = __webpack_require__(5);

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
/* 155 */
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
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(157);

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
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(12);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ErrorPage = __webpack_require__(27);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(158);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(44);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(160);

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
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(159);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(17);

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
/* 159 */
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
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(161);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(17);

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
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

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
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(163);

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
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(12);

var _SEO2 = _interopRequireDefault(_SEO);

var _ErrorPage = __webpack_require__(27);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelClaimsDisplay = __webpack_require__(164);

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
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(9);

var _view = __webpack_require__(165);

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
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(166);

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
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(167);

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
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

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
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(169);

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
/* 169 */
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

var _reactHelmet = __webpack_require__(19);

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
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(4),
    host = _require.details.host;

var sendEmbedPage = function sendEmbedPage(_ref, res) {
  var params = _ref.params;

  var claimId = params.claimId;
  var name = params.name;
  // get and render the content
  res.status(200).render('embed', { layout: 'embed', host: host, claimId: claimId, name: name });
};

module.exports = sendEmbedPage;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redirect = function redirect(route) {
  return function (req, res) {
    res.status(301).redirect(route);
  };
};

module.exports = redirect;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var serveAssetByClaim = __webpack_require__(173);
var serveAssetByIdentifierAndClaim = __webpack_require__(181);

module.exports = function (app, db) {
  app.get('/:identifier/:claim', serveAssetByIdentifierAndClaim);
  app.get('/:claim', serveAssetByClaim);
};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(10),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(46),
    determineResponseType = _require2.determineResponseType,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(47);
var handleShowRender = __webpack_require__(48);
var SERVE = 'SERVE';

/*

  route to serve an asset or the react app via the claim name only

*/

var serverAssetByClaim = function serverAssetByClaim(req, res) {
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
  // log the request data for debugging
  logRequestData(responseType, claimName, null, null);
  // get the claim Id and then serve the asset
  getClaimIdAndServeAsset(null, null, claimName, null, originalUrl, ip, res);
};

module.exports = serverAssetByClaim;

/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = __webpack_require__(20);

var _show_action_types = __webpack_require__(16);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(9);

var _show_asset = __webpack_require__(176);

var _show_channel = __webpack_require__(178);

var _lbryUri = __webpack_require__(180);

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
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = __webpack_require__(20);

var _show_action_types = __webpack_require__(16);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(9);

var _assetApi = __webpack_require__(177);

var _show2 = __webpack_require__(17);

var _site = __webpack_require__(49);

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
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongClaimId = getLongClaimId;
exports.getShortId = getShortId;
exports.getClaimData = getClaimData;

var _request = __webpack_require__(14);

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
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = __webpack_require__(20);

var _show_action_types = __webpack_require__(16);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(9);

var _channelApi = __webpack_require__(179);

var _show2 = __webpack_require__(17);

var _site = __webpack_require__(49);

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
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelData = getChannelData;
exports.getChannelClaims = getChannelClaims;

var _request = __webpack_require__(14);

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
/* 180 */
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
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(10),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(46),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(47);
var handleShowRender = __webpack_require__(48);

var SERVE = 'SERVE';

/*

  route to serve an asset or the react app via the claim name and an identifier

*/

var serverAssetByIdentifierAndClaim = function serverAssetByIdentifierAndClaim(req, res) {
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
};

module.exports = serverAssetByIdentifierAndClaim;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(183);

module.exports = function (app) {
  app.get('*', handlePageRequest);
};

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(31);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2I4YWFlMmM0OTVlNWJlODJlOTkiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiIiwid2VicGFjazovLy8uL3NwZWVjaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZ2FcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvSG9tZVBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoUHJldmlldy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsIm9yaWdpbmFsVXJsIiwiaXAiLCJlcnJvciIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJqc29uIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwiZXJyIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJrZXkiLCJzdWNjZXNzIiwiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiY29udGFpbmVycyIsInBhZ2VzIiwiZGV0YWlscyIsImhvc3QiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwidXBkYXRlIiwiY29uZmlnIiwid2FybiIsImluZm8iLCJzZWxlY3RGaWxlIiwiY2xlYXJGaWxlIiwidXBkYXRlTWV0YWRhdGEiLCJ1cGRhdGVDbGFpbSIsInNldFB1Ymxpc2hJbkNoYW5uZWwiLCJ1cGRhdGVQdWJsaXNoU3RhdHVzIiwidXBkYXRlRXJyb3IiLCJ1cGRhdGVTZWxlY3RlZENoYW5uZWwiLCJ0b2dnbGVNZXRhZGF0YUlucHV0cyIsIm9uTmV3VGh1bWJuYWlsIiwic3RhcnRQdWJsaXNoIiwiYWN0aW9ucyIsImZpbGUiLCJ0eXBlIiwiRklMRV9TRUxFQ1RFRCIsImRhdGEiLCJGSUxFX0NMRUFSIiwibmFtZSIsInZhbHVlIiwiTUVUQURBVEFfVVBEQVRFIiwiQ0xBSU1fVVBEQVRFIiwiY2hhbm5lbCIsIlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwiLCJQVUJMSVNIX1NUQVRVU19VUERBVEUiLCJFUlJPUl9VUERBVEUiLCJjaGFubmVsTmFtZSIsIlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFIiwic2hvd01ldGFkYXRhSW5wdXRzIiwiVE9HR0xFX01FVEFEQVRBX0lOUFVUUyIsIlRIVU1CTkFJTF9ORVciLCJoaXN0b3J5IiwiUFVCTElTSF9TVEFSVCIsIm15c3FsIiwiZGF0YWJhc2UiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibWFwU3RhdGVUb1Byb3BzIiwic2l0ZSIsImxvZ2dlZEluQ2hhbm5lbCIsImNoYW5uZWxTaG9ydElkIiwic2hvcnRJZCIsImNoYW5uZWxMb25nSWQiLCJsb25nSWQiLCJzaXRlRGVzY3JpcHRpb24iLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJvbkNoYW5uZWxMb2dpbiIsImRpc3BhdGNoIiwib25DaGFubmVsTG9nb3V0Iiwib25IYW5kbGVTaG93UGFnZVVyaSIsIm9uUmVxdWVzdEVycm9yIiwib25OZXdDaGFubmVsUmVxdWVzdCIsIm9uTmV3QXNzZXRSZXF1ZXN0Iiwib25SZXF1ZXN0VXBkYXRlIiwiYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QiLCJhZGRBc3NldFRvQXNzZXRMaXN0IiwiYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QiLCJvblVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJ1cGRhdGVDaGFubmVsQ2xhaW1zIiwiZmlsZVJlcXVlc3RlZCIsInVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkiLCJ1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciIsInBhcmFtcyIsIkhBTkRMRV9TSE9XX1VSSSIsIlJFUVVFU1RfRVJST1IiLCJjaGFubmVsSWQiLCJyZXF1ZXN0VHlwZSIsInJlcXVlc3RJZCIsIkNIQU5ORUxfUkVRVUVTVF9ORVciLCJpZCIsImV4dGVuc2lvbiIsIkFTU0VUX1JFUVVFU1RfTkVXIiwibW9kaWZpZXIiLCJSRVFVRVNUX1VQREFURSIsIlJFUVVFU1RfTElTVF9BREQiLCJjbGFpbUlkIiwiY2xhaW1EYXRhIiwiQVNTRVRfQUREIiwiY2xhaW1zRGF0YSIsIkNIQU5ORUxfQUREIiwiY2hhbm5lbEtleSIsInBhZ2UiLCJDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMiLCJjaGFubmVsTGlzdElkIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MiLCJGSUxFX1JFUVVFU1RFRCIsIkZJTEVfQVZBSUxBQklMSVRZX1VQREFURSIsIkRJU1BMQVlfQVNTRVRfRVJST1IiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiZXZlbnRDYXRlZ29yeSIsImV2ZW50QWN0aW9uIiwiZXZlbnRMYWJlbCIsImlwT3ZlcnJpZGUiLCJ1c2VyQWdlbnRPdmVycmlkZSIsImNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyIsImNhdGVnb3J5IiwidmFyaWFibGUiLCJsYWJlbCIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkdXJhdGlvbiIsInVzZXJUaW1pbmdDYXRlZ29yeSIsInVzZXJUaW1pbmdWYXJpYWJsZU5hbWUiLCJ1c2VyVGltaW5nVGltZSIsInVzZXJUaW1pbmdMYWJlbCIsInNlbmRHb29nbGVBbmFseXRpY3NFdmVudCIsInZpc2l0b3JJZCIsInJlcGxhY2UiLCJ2aXNpdG9yIiwic3RyaWN0Q2lkRm9ybWF0IiwiaHR0cHMiLCJldmVudCIsInNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmciLCJ0aW1pbmciLCJkZWJ1ZyIsInNlbmRHQVNlcnZlRXZlbnQiLCJzZW5kR0FUaW1pbmdFdmVudCIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsImNoYW5uZWxfbmFtZSIsImNoYW5uZWxfaWQiLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsIlNlcXVlbGl6ZSIsInNlcXVlbGl6ZSIsImRpYWxlY3QiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwibG9nZ2luZyIsInBvb2wiLCJtYXgiLCJtaW4iLCJpZGxlIiwiYWNxdWlyZSIsImF1dGhlbnRpY2F0ZSIsInRoZW4iLCJjYXRjaCIsImRiIiwiaW1wb3J0IiwibW9kZWxOYW1lIiwiYXNzb2NpYXRlIiwidXBzZXJ0IiwiTW9kZWwiLCJ2YWx1ZXMiLCJjb25kaXRpb24iLCJ0YWJsZU5hbWUiLCJmaW5kT25lIiwid2hlcmUiLCJvYmoiLCJjcmVhdGUiLCJkZWZhdWx0RGVzY3JpcHRpb24iLCJkZWZhdWx0VGh1bWJuYWlsIiwic2l0ZUhvc3QiLCJzaXRlVGl0bGUiLCJzaXRlVHdpdHRlciIsInJlcXVlc3QiLCJwYXJzZUpTT04iLCJyZXNwb25zZSIsImNoZWNrU3RhdHVzIiwianNvblJlc3BvbnNlIiwiRXJyb3IiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJQcm9taXNlIiwiYWxsIiwiYXhpb3MiLCJhcGkiLCJhcGlIb3N0IiwiYXBpUG9ydCIsImxicnlBcGlVcmkiLCJoYW5kbGVMYnJ5bmV0UmVzcG9uc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInB1Ymxpc2hDbGFpbSIsInB1Ymxpc2hQYXJhbXMiLCJnYVN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJwb3N0IiwibWV0aG9kIiwiZ2V0Q2xhaW0iLCJ1cmkiLCJ0aW1lb3V0IiwiZ2V0Q2xhaW1MaXN0IiwiY2xhaW1OYW1lIiwicmVzb2x2ZVVyaSIsImdldERvd25sb2FkRGlyZWN0b3J5IiwiZG93bmxvYWRfZGlyZWN0b3J5IiwiY3JlYXRlQ2hhbm5lbCIsImFtb3VudCIsInNlbGVjdEFzc2V0Iiwic2hvdyIsInJlcXVlc3RMaXN0IiwiYXNzZXRLZXkiLCJhc3NldExpc3QiLCJzZWxlY3RTaG93U3RhdGUiLCJzdGF0ZSIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImNoYW5uZWxDbGFpbUlkIiwiZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCIsImdldENsYWltSWRCeUNsYWltIiwiZ2V0TG9uZ0NsYWltSWQiLCJsb25nQ2xhaW1JZCIsImdldExvbmdDaGFubmVsSWQiLCJsb25nQ2hhbm5lbElkIiwiZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCIsImdldENoYW5uZWxEYXRhIiwibG9uZ0NoYW5uZWxDbGFpbUlkIiwiZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCIsInNob3J0Q2hhbm5lbENsYWltSWQiLCJnZXRDaGFubmVsQ2xhaW1zIiwiZ2V0QWxsQ2hhbm5lbENsYWltcyIsImNoYW5uZWxDbGFpbXNBcnJheSIsInBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSIsImdldExvY2FsRmlsZVJlY29yZCIsImRhdGFWYWx1ZXMiLCJwYXNzcG9ydCIsImxvY2FsTG9naW5TdHJhdGVneSIsImxvY2FsU2lnbnVwU3RyYXRlZ3kiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVVc2VyIiwic2VyaWFsaXplVXNlciIsInVzZSIsImxicnlBcGkiLCJwdWJsaXNoSGVscGVycyIsIk9wIiwicHVibGlzaCIsImZpbGVOYW1lIiwiZmlsZVR5cGUiLCJwdWJsaXNoUmVzdWx0cyIsImNlcnRpZmljYXRlSWQiLCJ0eCIsImZpbGVSZWNvcmQiLCJjbGFpbV9pZCIsIm1ldGFkYXRhIiwiYWRkcmVzcyIsImNsYWltX2FkZHJlc3MiLCJvdXRwb2ludCIsInR4aWQiLCJub3V0IiwiaGVpZ2h0IiwiZmlsZVBhdGgiLCJmaWxlX3BhdGgiLCJuc2Z3IiwiY2xhaW1SZWNvcmQiLCJjb250ZW50VHlwZSIsImJpZCIsInVwc2VydENyaXRlcmlhIiwiY2xhaW0iLCJzZXRDbGFpbSIsInNldEZpbGUiLCJkZWxldGVUZW1wb3JhcnlGaWxlIiwiY2xhaW1OYW1lSXNBdmFpbGFibGUiLCJjbGFpbUFkZHJlc3NlcyIsInB1c2giLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsIm9yIiwiY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IiwiZnMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSIsImxpY2Vuc2UiLCJpbnZhbGlkTmFtZUNoYXJhY3RlcnMiLCJleGVjIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwicGF0aCIsInNpemUiLCJ0ZXN0IiwidmFsaWRhdGVGaWxlVHlwZUFuZFNpemUiLCJ0aHVtYm5haWxGaWxlTmFtZSIsInRodW1ibmFpbEZpbGVQYXRoIiwidGh1bWJuYWlsRmlsZVR5cGUiLCJjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMiLCJ0cmltIiwiYXV0aG9yIiwibGFuZ3VhZ2UiLCJjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zIiwidW5saW5rIiwiYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEiLCJmaWxlSW5mbyIsImdldFJlc3VsdCIsImZpbGVfbmFtZSIsImRvd25sb2FkX3BhdGgiLCJjcmVhdGVGaWxlRGF0YSIsInVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCIsIkNIQU5ORUxfVVBEQVRFIiwiUHJvZ3Jlc3NCYXIiLCJwcm9wcyIsImJhcnMiLCJpbmRleCIsImluY3JlbWVudGVyIiwiY3JlYXRlQmFycyIsImJpbmQiLCJzdGFydFByb2dyZXNzQmFyIiwidXBkYXRlUHJvZ3Jlc3NCYXIiLCJzdG9wUHJvZ3Jlc3NCYXIiLCJpIiwiaXNBY3RpdmUiLCJzZXRTdGF0ZSIsInVwZGF0ZUludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwibWFwIiwiYmFyIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsIkVycm9yUGFnZSIsInN0cmluZyIsInJldHVyblNob3J0SWQiLCJjbGFpbXNBcnJheSIsImNsYWltSW5kZXgiLCJzdWJzdHJpbmciLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwiZWxlbWVudCIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwiZmlsdGVyIiwicmVxIiwiY29udGV4dCIsInN0b3JlIiwiaHRtbCIsImhlbG1ldCIsInJlbmRlclN0YXRpYyIsInJlZGlyZWN0IiwicHJlbG9hZGVkU3RhdGUiLCJnZXRTdGF0ZSIsInNlbmQiLCJMT0dJTiIsIkNSRUFURSIsIkxPQ0FMX0NIRUNLIiwiVU5BVkFJTEFCTEUiLCJFUlJPUiIsIkFWQUlMQUJMRSIsImluaXRpYWxpemUiLCJHQUxpc3RlbmVyIiwic2VuZFBhZ2VWaWV3IiwibG9jYXRpb24iLCJsaXN0ZW4iLCJzZXQiLCJwYXRobmFtZSIsInBhZ2V2aWV3IiwiY2hpbGRyZW4iLCJBcHAiLCJmaWxlRXJyb3IiLCJzZXRGaWxlRXJyb3IiLCJDSEFOTkVMIiwiQVNTRVRfTElURSIsIkFTU0VUX0RFVEFJTFMiLCJkaXNwbGF5QXNzZXQiLCJhc3NldCIsIm9uRmlsZVJlcXVlc3QiLCJ0b1N0cmluZyIsIm1ldGEiLCJsaW5rIiwiU0VSVkUiLCJTSE9XIiwiY2xpZW50QWNjZXB0c0h0bWwiLCJhY2NlcHQiLCJtYXRjaCIsInJlcXVlc3RJc0Zyb21Ccm93c2VyIiwiY2xpZW50V2FudHNBc3NldCIsInJhbmdlIiwiaW1hZ2VJc1dhbnRlZCIsInZpZGVvSXNXYW50ZWQiLCJpc1ZhbGlkQ2xhaW1JZCIsImlzVmFsaWRTaG9ydElkIiwiaXNWYWxpZFNob3J0SWRPckNsYWltSWQiLCJpbnB1dCIsInNlcnZlQXNzZXRUb0NsaWVudCIsInZlcmJvc2UiLCJzZW5kRmlsZU9wdGlvbnMiLCJzZW5kRmlsZSIsImdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IiwiZnVsbENsYWltSWQiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicmVzcG9uc2VUeXBlIiwiZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSIsImlkZW50aWZpZXIiLCJ0ZW1wTmFtZSIsImxvZ1JlcXVlc3REYXRhIiwiUkVHRVhQX0lOVkFMSURfQ0xBSU0iLCJSRUdFWFBfSU5WQUxJRF9DSEFOTkVMIiwiUkVHRVhQX0FERFJFU1MiLCJDSEFOTkVMX0NIQVIiLCJwYXJzZUlkZW50aWZpZXIiLCJjb21wb25lbnRzUmVnZXgiLCJSZWdFeHAiLCJwcm90byIsIm1vZGlmaWVyU2VwZXJhdG9yIiwiaXNDaGFubmVsIiwic3RhcnRzV2l0aCIsIm5hbWVCYWRDaGFycyIsImpvaW4iLCJwYXJzZUNsYWltIiwicGFyc2VNb2RpZmllciIsInJldHVyblNhZ2FXaXRoUGFyYW1zIiwic2FnYSIsInNhZ2FNaWRkbGV3YXJlIiwibWlkZGxld2FyZSIsImFjdGlvbiIsInJ1biIsImRvbmUiLCJzZWxlY3RTaXRlU3RhdGUiLCJzZWxlY3RTaXRlSG9zdCIsIlNlcnZlciIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJyZXF1ZXN0TG9nZ2VyIiwibG9nZ2VyQ29uZmlnIiwibXlzcWxDb25maWciLCJzaXRlQ29uZmlnIiwic2xhY2tDb25maWciLCJjb25maWd1cmVMb2dnZXIiLCJ1c2VyQ29uZmlnIiwiY29uZmlndXJlTXlzcWwiLCJjb25maWd1cmVTaXRlRGV0YWlscyIsImNvbmZpZ3VyZVNsYWNrIiwiY29uZmlndXJlQ2xpZW50QnVuZGxlIiwiY29uZmlndXJlTW9kZWxzIiwiY29uZmlndXJlUm91dGVzIiwiY3JlYXRlQXBwIiwiYXBwIiwiZW5hYmxlIiwic3RhdGljIiwiX19kaXJuYW1lIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwic3BlZWNoUGFzc3BvcnQiLCJtYXhBZ2UiLCJzZXNzaW9uIiwiaGJzIiwiZGVmYXVsdExheW91dCIsImhhbmRsZWJhcnMiLCJlbmdpbmUiLCJzZXJ2ZXIiLCJzdGFydCIsIlBPUlQiLCJzeW5jIiwibmV4dCIsIkxvZ2dlckNvbmZpZyIsImxvZ0xldmVsIiwiY29uZmlndXJlIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJsZXZlbCIsInRpbWVzdGFtcCIsImNvbG9yaXplIiwicHJldHR5UHJpbnQiLCJoYW5kbGVFeGNlcHRpb25zIiwiaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbiIsInNpbGx5Iiwid2luc3RvblNsYWNrV2ViSG9vayIsIlNsYWNrV2ViSG9vayIsIndpbnN0b24iLCJTbGFja0NvbmZpZyIsInNsYWNrV2ViSG9vayIsInNsYWNrRXJyb3JDaGFubmVsIiwic2xhY2tJbmZvQ2hhbm5lbCIsImFkZCIsIndlYmhvb2tVcmwiLCJpY29uRW1vamkiLCJQYXNzcG9ydExvY2FsU3RyYXRlZ3kiLCJTdHJhdGVneSIsInJldHVyblVzZXJBbmRDaGFubmVsSW5mbyIsInVzZXJJbnN0YW5jZSIsInVzZXJJbmZvIiwidXNlck5hbWUiLCJnZXRDaGFubmVsIiwic2hvcnRDaGFubmVsSWQiLCJ1c2VybmFtZUZpZWxkIiwicGFzc3dvcmRGaWVsZCIsInVzZXIiLCJjb21wYXJlUGFzc3dvcmQiLCJpc01hdGNoIiwidXNlckRhdGEiLCJjaGFubmVsRGF0YSIsImNlcnRpZmljYXRlRGF0YSIsIm5ld1VzZXIiLCJuZXdDaGFubmVsIiwibmV3Q2VydGlmaWNhdGUiLCJzZXRDaGFubmVsIiwic2V0VXNlciIsImxicnlDb25maWciLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlU2lnbnVwUmVxdWVzdCIsImhhbmRsZUxvZ2luUmVxdWVzdCIsImhhbmRsZUxvZ291dFJlcXVlc3QiLCJoYW5kbGVVc2VyUmVxdWVzdCIsImdldCIsInNpZ251cCIsImxvZ2luIiwibG9nSW4iLCJsb2dvdXQiLCJjaGFubmVsQXZhaWxhYmlsaXR5IiwiY2hhbm5lbENsYWltcyIsImNsYWltQXZhaWxhYmlsaXR5IiwiY2xhaW1HZXQiLCJjbGFpbUxvbmdJZCIsImNsYWltUHVibGlzaCIsImNsYWltUmVzb2x2ZSIsImNsYWltU2hvcnRJZCIsImNsYWltTGlzdCIsImZpbGVBdmFpbGFiaWxpdHkiLCJtdWx0aXBhcnRNaWRkbGV3YXJlIiwiYXZhaWxhYmxlTmFtZSIsImJvZHkiLCJDTEFJTVNfUEVSX1BBR0UiLCJjbGFpbXMiLCJ0b3RhbFBhZ2VzIiwiZGV0ZXJtaW5lVG90YWxQYWdlcyIsInBhZ2luYXRpb25QYWdlIiwiZ2V0UGFnZUZyb21RdWVyeSIsInZpZXdEYXRhIiwiZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIiwicHJldmlvdXNQYWdlIiwiZGV0ZXJtaW5lUHJldmlvdXNQYWdlIiwiY3VycmVudFBhZ2UiLCJuZXh0UGFnZSIsImRldGVybWluZU5leHRQYWdlIiwidG90YWxSZXN1bHRzIiwiZGV0ZXJtaW5lVG90YWxDbGFpbXMiLCJwYXJzZUludCIsInBhZ2VOdW1iZXIiLCJjbGFpbVN0YXJ0SW5kZXgiLCJjbGFpbUVuZEluZGV4IiwicGFnZU9mQ2xhaW1zIiwidG90YWxDbGFpbXMiLCJmdWxsUGFnZXMiLCJNYXRoIiwiZmxvb3IiLCJyZW1haW5kZXIiLCJjaGFubmVsU2hvcnRJZFJvdXRlIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImRlZmF1bHQiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJ2YWxpZEF0SGVpZ2h0IiwidmFsdWVWZXJzaW9uIiwiY2xhaW1UeXBlIiwiY2VydGlmaWNhdGVWZXJzaW9uIiwia2V5VHlwZSIsInB1YmxpY0tleSIsImZyZWV6ZVRhYmxlTmFtZSIsImJlbG9uZ3NUbyIsImZvcmVpZ25LZXkiLCJhbGxvd051bGwiLCJvcmRlciIsImdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQiLCIkbGlrZSIsImdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUiLCJ2YWxpZGF0ZUxvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwicmF3IiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJyZXNvbHZlQ2xhaW0iLCJjbGFpbUFycmF5IiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImlwQWRkcmVzcyIsImJjcnlwdCIsInByb3RvdHlwZSIsImNvbXBhcmUiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwiZ2VuU2FsdCIsInNhbHRFcnJvciIsInNhbHQiLCJoYXNoIiwiaGFzaEVycm9yIiwiaG9vayIsImNsYWltSW5mbyIsInJlc29sdmVSZXN1bHQiLCJmaWxlRGF0YSIsImNvbXBsZXRlZCIsImF1dGhlbnRpY2F0ZVVzZXIiLCJmaWxlcyIsImNoYW5uZWxQYXNzd29yZCIsInZhbGlkYXRlZENsYWltTmFtZSIsInRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJsYnJ5VHgiLCJhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMiLCJ1c2VyUGFzc3dvcmQiLCJjaGFubmVsRmluZFBhcmFtcyIsInJlc29sdmVkVXJpIiwiY2xhaW1zTGlzdCIsIm11bHRpcGFydCIsInVwbG9hZERpciIsImhhbmRsZVBhZ2VSZXF1ZXN0IiwiaGFuZGxlRW1iZWRSZXF1ZXN0IiwiaGFuZGxlUGFnZVJlbmRlciIsInNlbmRSZWFjdEFwcCIsImluaXRpYWxTdGF0ZSIsImFzc2lnbiIsInB1Ymxpc2hJbkNoYW5uZWwiLCJzZWxlY3RlZENoYW5uZWwiLCJwdWJsaXNoU3VibWl0IiwiY2hhbm5lbExpc3QiLCJnb29nbGVBbmFseXRpY3NJZCIsIkhvbWVQYWdlIiwiU0VPIiwicGFnZVVyaSIsInBhZ2VUaXRsZSIsIm1ldGFUYWdzIiwiY2Fub25pY2FsTGluayIsInJlbCIsImhyZWYiLCJvYmplY3QiLCJjcmVhdGVQYWdlVGl0bGUiLCJkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwiZmlsZUV4dCIsImxhc3RJbmRleE9mIiwiY3JlYXRlQmFzaWNNZXRhVGFncyIsInByb3BlcnR5IiwiY29udGVudCIsImNyZWF0ZUNoYW5uZWxNZXRhVGFncyIsImNyZWF0ZUFzc2V0TWV0YVRhZ3MiLCJlbWJlZFVybCIsInNob3dVcmwiLCJvZ1RpdGxlIiwib2dEZXNjcmlwdGlvbiIsIm9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJvZ1RodW1ibmFpbCIsImNyZWF0ZU1ldGFUYWdzIiwiY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rIiwiY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsiLCJjcmVhdGVDYW5vbmljYWxMaW5rIiwiVklFVyIsIkxPR09VVCIsIk5hdkJhciIsImNoZWNrRm9yTG9nZ2VkSW5Vc2VyIiwibG9nb3V0VXNlciIsImhhbmRsZVNlbGVjdGlvbiIsImNyZWRlbnRpYWxzIiwidGFyZ2V0Iiwic2VsZWN0ZWRPcHRpb25zIiwiTG9nbyIsIk5hdkJhckNoYW5uZWxEcm9wZG93biIsImRlZmF1bHRTZWxlY3Rpb24iLCJQdWJsaXNoVG9vbCIsIkRyb3B6b25lIiwiZHJhZ092ZXIiLCJtb3VzZU92ZXIiLCJkaW1QcmV2aWV3IiwiaGFuZGxlRHJvcCIsImhhbmRsZURyYWdPdmVyIiwiaGFuZGxlRHJhZ0VuZCIsImhhbmRsZURyYWdFbnRlciIsImhhbmRsZURyYWdMZWF2ZSIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVGaWxlSW5wdXQiLCJjaG9vc2VGaWxlIiwicHJldmVudERlZmF1bHQiLCJkdCIsImRhdGFUcmFuc2ZlciIsIml0ZW1zIiwia2luZCIsImRyb3BwZWRGaWxlIiwiZ2V0QXNGaWxlIiwicmVtb3ZlIiwiY2xlYXJEYXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsaWNrIiwiZmlsZUxpc3QiLCJ2YWxpZGF0ZUZpbGUiLCJQdWJsaXNoUHJldmlldyIsImltZ1NvdXJjZSIsInNldFByZXZpZXdJbWFnZVNvdXJjZSIsIm5ld1Byb3BzIiwic2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUiLCJwcmV2aWV3UmVhZGVyIiwiRmlsZVJlYWRlciIsInJlYWRBc0RhdGFVUkwiLCJvbmxvYWRlbmQiLCJib29sIiwiUHVibGlzaERldGFpbHMiLCJvblB1Ymxpc2hTdWJtaXQiLCJvbk1ldGFkYXRhQ2hhbmdlIiwiUHVibGlzaFRpdGxlSW5wdXQiLCJoYW5kbGVJbnB1dCIsImUiLCJsb2dnZWRJbkNoYW5uZWxOYW1lIiwibG9nZ2VkSW5DaGFubmVsU2hvcnRJZCIsInVybEVycm9yIiwib25DbGFpbUNoYW5nZSIsIm9uVXJsRXJyb3IiLCJQdWJsaXNoVXJsSW5wdXQiLCJzZXRDbGFpbU5hbWUiLCJ2YWxpZGF0ZUNsYWltIiwiY2xlYW5zZUlucHV0IiwiZmlsZU5hbWVXaXRob3V0RW5kaW5nIiwiY2xlYW5DbGFpbU5hbWUiLCJVcmxNaWRkbGUiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiaWEiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsIkJsb2IiLCJQdWJsaXNoVGh1bWJuYWlsSW5wdXQiLCJ2aWRlb1NvdXJjZSIsInNsaWRlck1pblJhbmdlIiwic2xpZGVyTWF4UmFuZ2UiLCJzbGlkZXJWYWx1ZSIsImhhbmRsZVZpZGVvTG9hZGVkRGF0YSIsImhhbmRsZVNsaWRlckNoYW5nZSIsImNyZWF0ZVRodW1ibmFpbCIsInNldFZpZGVvU291cmNlIiwibmV4dFByb3BzIiwiZGF0YVVyaSIsImJsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ0b3RhbE1pbnV0ZXMiLCJ0b3RhbFNlY29uZHMiLCJ2aWRlbyIsImN1cnJlbnRUaW1lIiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsIndpZHRoIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImRhdGFVcmwiLCJ0b0RhdGFVUkwiLCJzbmFwc2hvdCIsImRpc3BsYXkiLCJvblRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwiUHVibGlzaE1ldGFkYXRhSW5wdXRzIiwidG9nZ2xlU2hvd0lucHV0cyIsImhhbmRsZVNlbGVjdCIsImNoZWNrZWQiLCJzZWxlY3RlZE9wdGlvbiIsIm1heEhlaWdodCIsIkV4cGFuZGluZ1RleHRhcmVhIiwiX2hhbmRsZUNoYW5nZSIsImFkanVzdFRleHRhcmVhIiwib25DaGFuZ2UiLCJlbCIsInN0eWxlIiwic2Nyb2xsSGVpZ2h0IiwicmVzdCIsIngiLCJmdW5jIiwiY2hhbm5lbEVycm9yIiwib25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlIiwib25DaGFubmVsU2VsZWN0Iiwic3RhdGVzIiwiQ2hhbm5lbFNlbGVjdCIsInRvZ2dsZUFub255bW91c1B1Ymxpc2giLCJDaGFubmVsTG9naW5Gb3JtIiwibG9naW5Ub0NoYW5uZWwiLCJIZWFkZXJzIiwiQ2hhbm5lbENyZWF0ZUZvcm0iLCJoYW5kbGVDaGFubmVsSW5wdXQiLCJjbGVhbnNlQ2hhbm5lbElucHV0IiwidXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIiwiY2hhbm5lbFdpdGhBdFN5bWJvbCIsImNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIiwiY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUiLCJtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0IiwiQWN0aXZlU3RhdHVzQmFyIiwiSW5hY3RpdmVTdGF0dXNCYXIiLCJwdWJsaXNoU3RhdGVzIiwiUHVibGlzaFN0YXR1cyIsIkxPQURfU1RBUlQiLCJMT0FESU5HIiwiUFVCTElTSElORyIsIlNVQ0NFU1MiLCJGQUlMRUQiLCJQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIiwiQWJvdXRQYWdlIiwiTG9naW5QYWdlIiwiU2hvd1BhZ2UiLCJTaG93TGl0ZSIsIkFzc2V0RGlzcGxheSIsIlNob3dBc3NldERldGFpbHMiLCJBc3NldFRpdGxlIiwiQXNzZXRJbmZvIiwiY29weVRvQ2xpcGJvYXJkIiwiZWxlbWVudFRvQ29weSIsImRhdGFzZXQiLCJlbGVtZW50dG9jb3B5Iiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJwcmV2aW91c1JlcXVlc3QiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwic2hvd05ld1BhZ2UiLCJkZWZhdWx0cyIsIkFzc2V0UHJldmlldyIsImRpcmVjdFNvdXJjZUxpbmsiLCJzaG93VXJsTGluayIsIkZvdXJPaEZvclBhZ2UiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJ3YXRjaEhhbmRsZVNob3dQYWdlVXJpIiwicGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0iLCJwYXJzZUFuZFVwZGF0ZUNsYWltT25seSIsIm5ld0Fzc2V0UmVxdWVzdCIsIndhdGNoTmV3QXNzZXRSZXF1ZXN0IiwiZ2V0U2hvcnRJZCIsImdldENsYWltRGF0YSIsIm5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hOZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyIsImdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwiLCJleHRlbnNpb25TZXBlcmF0b3IiLCJzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7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QUFDRDtBQUNBNE0saUJBQWVKLFlBQWYsRUFBNkJ4TSxTQUE3QixFQUF3Q3ZLLFdBQXhDLEVBQXFEaUQsT0FBckQ7QUFDQTtBQUNBMFQsMEJBQXdCM1csV0FBeEIsRUFBcUN5TCxjQUFyQyxFQUFxRGxCLFNBQXJELEVBQWdFdEgsT0FBaEUsRUFBeUUzSCxXQUF6RSxFQUFzRkMsRUFBdEYsRUFBMEZFLEdBQTFGO0FBQ0QsQ0FyQ0Q7O0FBdUNBTixPQUFPQyxPQUFQLEdBQWlCNjVCLCtCQUFqQixDOzs7Ozs7Ozs7QUN6REEsSUFBTS9PLG9CQUFvQixtQkFBQWhyQixDQUFRLEdBQVIsQ0FBMUI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUIsVUFBQzZlLEdBQUQsRUFBUztBQUN4QkEsTUFBSW9FLEdBQUosQ0FBUSxHQUFSLEVBQWE2SCxpQkFBYjtBQUNELENBRkQsQzs7Ozs7Ozs7O0FDRkEsSUFBTUUsbUJBQW1CLG1CQUFBbHJCLENBQVEsRUFBUixDQUF6Qjs7QUFFQSxJQUFNbXJCLGVBQWUsU0FBZkEsWUFBZSxDQUFDalQsR0FBRCxFQUFNM1gsR0FBTixFQUFjO0FBQ2pDMnFCLG1CQUFpQmhULEdBQWpCLEVBQXNCM1gsR0FBdEI7QUFDRCxDQUZEOztBQUlBTixPQUFPQyxPQUFQLEdBQWlCaXJCLFlBQWpCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNiOGFhZTJjNDk1ZTViZTgyZTk5IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtcmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3RvblwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhbmRsZUVycm9yUmVzcG9uc2U6IGZ1bmN0aW9uIChvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpIHtcbiAgICBsb2dnZXIuZXJyb3IoYEVycm9yIG9uICR7b3JpZ2luYWxVcmx9YCwgbW9kdWxlLmV4cG9ydHMudXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzKGVycm9yKSk7XG4gICAgY29uc3QgW3N0YXR1cywgbWVzc2FnZV0gPSBtb2R1bGUuZXhwb3J0cy5yZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMoZXJyb3IpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyhzdGF0dXMpXG4gICAgICAuanNvbihtb2R1bGUuZXhwb3J0cy5jcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZChzdGF0dXMsIG1lc3NhZ2UpKTtcbiAgfSxcbiAgcmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBsZXQgc3RhdHVzLCBtZXNzYWdlO1xuICAgIC8vIGNoZWNrIGZvciBkYWVtb24gYmVpbmcgdHVybmVkIG9mZlxuICAgIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJykge1xuICAgICAgc3RhdHVzID0gNTAzO1xuICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHJlZnVzZWQuICBUaGUgZGFlbW9uIG1heSBub3QgYmUgcnVubmluZy4nO1xuICAgICAgLy8gZmFsbGJhY2sgZm9yIGV2ZXJ5dGhpbmcgZWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXMgPSA0MDA7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gW3N0YXR1cywgbWVzc2FnZV07XG4gIH0sXG4gIHVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5czogZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGV0IG5ld0Vycm9yT2JqZWN0ID0ge307XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBuZXdFcnJvck9iamVjdFtrZXldID0gZXJyW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdFcnJvck9iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfSxcbiAgY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQgKHN0YXR1cywgbWVzc2FnZSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTaXRlQ29uZmlnICgpIHtcbiAgdGhpcy5hbmFseXRpY3MgPSB7XG4gICAgZ29vZ2xlSWQ6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5hc3NldERlZmF1bHRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQW4gYXNzZXQgcHVibGlzaGVkIG9uIFNwZWUuY2gnLFxuICAgIHRodW1ibmFpbCAgOiAnaHR0cHM6Ly9zcGVlLmNoL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gIH07XG4gIHRoaXMuYXV0aCA9IHtcbiAgICBzZXNzaW9uS2V5OiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IHtcbiAgICBjb21wb25lbnRzOiB7fSxcbiAgICBjb250YWluZXJzOiB7fSxcbiAgICBwYWdlcyAgICAgOiB7fSxcbiAgfTtcbiAgdGhpcy5kZXRhaWxzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT3Blbi1zb3VyY2UsIGRlY2VudHJhbGl6ZWQgaW1hZ2UgYW5kIHZpZGVvIHNoYXJpbmcuJyxcbiAgICBob3N0ICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHBvcnQgICAgICAgOiAzMDAwLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gICAgdHdpdHRlciAgICA6ICdAc3BlZV9jaCcsXG4gIH07XG4gIHRoaXMucHVibGlzaGluZyA9IHtcbiAgICBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXM6IFtdLFxuICAgIGRpc2FibGVkICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgZGlzYWJsZWRNZXNzYWdlICAgICAgICAgOiAnUGxlYXNlIGNoZWNrIGJhY2sgc29vbi4nLFxuICAgIHByaW1hcnlDbGFpbUFkZHJlc3MgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWwgICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWxJZCAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHVwbG9hZERpcmVjdG9yeSAgICAgICAgIDogJy9ob21lL2xicnkvVXBsb2FkcycsXG4gIH07XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ05vIHNpdGUgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7IGFuYWx5dGljcywgYXNzZXREZWZhdWx0cywgYXV0aCwgY3VzdG9tQ29tcG9uZW50cywgZGV0YWlscywgcHVibGlzaGluZyB9ID0gY29uZmlnO1xuICAgIGxvZ2dlci5pbmZvKCdDb25maWd1cmluZyBzaXRlIGRldGFpbHMuLi4nKTtcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0RmlsZSAoZmlsZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9TRUxFQ1RFRCxcbiAgICBkYXRhOiBmaWxlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyRmlsZSAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0NMRUFSLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1ldGFkYXRhIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuTUVUQURBVEFfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNsYWltICh2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0xBSU1fVVBEQVRFLFxuICAgIGRhdGE6IHZhbHVlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFB1Ymxpc2hJbkNoYW5uZWwgKGNoYW5uZWwpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwsXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQdWJsaXNoU3RhdHVzIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBtZXNzYWdlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRXJyb3IgKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5FUlJPUl9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHZhbHVlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRDaGFubmVsIChjaGFubmVsTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuU0VMRUNURURfQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YTogY2hhbm5lbE5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTWV0YWRhdGFJbnB1dHMgKHNob3dNZXRhZGF0YUlucHV0cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUyxcbiAgICBkYXRhOiBzaG93TWV0YWRhdGFJbnB1dHMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdUaHVtYm5haWwgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRIVU1CTkFJTF9ORVcsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFB1Ymxpc2ggKGhpc3RvcnkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBUlQsXG4gICAgZGF0YTogeyBoaXN0b3J5IH0sXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBteXNxbCAoKSB7XG4gIHRoaXMuZGF0YWJhc2UgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXNlcm5hbWUgPSAnZGVmYXVsdCc7XG4gIHRoaXMucGFzc3dvcmQgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ05vIE15U1FMIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgLy8gY29uZmlndXJlIGNyZWRlbnRpYWxzXG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIG15c3FsLi4uJyk7XG4gICAgY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBjb25maWc7XG4gICAgdGhpcy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBteXNxbCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHNpdGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxOYW1lICAgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIGNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGNoYW5uZWxMb25nSWQgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5sb25nSWQsXG4gICAgc2l0ZURlc2NyaXB0aW9uOiBzaXRlLmRlc2NyaXB0aW9uLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsTG9nb3V0OiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobnVsbCwgbnVsbCwgbnVsbCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG4vLyBiYXNpYyByZXF1ZXN0IHBhcnNpbmdcbmV4cG9ydCBmdW5jdGlvbiBvbkhhbmRsZVNob3dQYWdlVXJpIChwYXJhbXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSxcbiAgICBkYXRhOiBwYXJhbXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3Q2hhbm5lbFJlcXVlc3QgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBDSEFOTkVMO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgY3IjJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsXG4gICAgZGF0YTogeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdBc3NldFJlcXVlc3QgKG5hbWUsIGlkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBleHRlbnNpb24pIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBleHRlbnNpb24gPyBBU1NFVF9MSVRFIDogQVNTRVRfREVUQUlMUztcbiAgY29uc3QgcmVxdWVzdElkID0gYGFyIyR7bmFtZX0jJHtpZH0jJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgICAgbmFtZSxcbiAgICAgIG1vZGlmaWVyOiB7XG4gICAgICAgIGlkLFxuICAgICAgICBjaGFubmVsOiB7XG4gICAgICAgICAgbmFtZTogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgaWQgIDogY2hhbm5lbElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdFVwZGF0ZSAocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCAoaWQsIGVycm9yLCBrZXkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIGtleSB9LFxuICB9O1xufTtcblxuLy8gYXNzZXQgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZXRUb0Fzc2V0TGlzdCAoaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhIH0sXG4gIH07XG59XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QgKGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQURELFxuICAgIGRhdGE6IHsgaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsXG4gICAgZGF0YToge2NoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZX0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MsXG4gICAgZGF0YToge2NoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGF9LFxuICB9O1xufTtcblxuLy8gZGlzcGxheSBhIGZpbGVcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVSZXF1ZXN0ZWQgKG5hbWUsIGNsYWltSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfUkVRVUVTVEVELFxuICAgIGRhdGE6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkgKHN0YXR1cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFLFxuICAgIGRhdGE6IHN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsImNvbnN0IENlcnRpZmljYXRlID0gcmVxdWlyZSgnbW9kZWxzL2NlcnRpZmljYXRlLmpzJyk7XG5jb25zdCBDaGFubmVsID0gcmVxdWlyZSgnbW9kZWxzL2NoYW5uZWwuanMnKTtcbmNvbnN0IENsYWltID0gcmVxdWlyZSgnbW9kZWxzL2NsYWltLmpzJyk7XG5jb25zdCBGaWxlID0gcmVxdWlyZSgnbW9kZWxzL2ZpbGUuanMnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCdtb2RlbHMvcmVxdWVzdC5qcycpO1xuY29uc3QgVXNlciA9IHJlcXVpcmUoJ21vZGVscy91c2VyLmpzJyk7XG5cbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5jb25zdCB7ZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZH0gPSByZXF1aXJlKCdteXNxbENvbmZpZy5qcycpO1xuXG4vLyBzZXQgc2VxdWVsaXplIG9wdGlvbnNcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICBob3N0ICAgICAgICAgIDogJ2xvY2FsaG9zdCcsXG4gIGRpYWxlY3QgICAgICAgOiAnbXlzcWwnLFxuICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSxcbiAgbG9nZ2luZyAgICAgICA6IGZhbHNlLFxuICBwb29sICAgICAgICAgIDoge1xuICAgIG1heCAgICA6IDUsXG4gICAgbWluICAgIDogMCxcbiAgICBpZGxlICAgOiAxMDAwMCxcbiAgICBhY3F1aXJlOiAxMDAwMCxcbiAgfSxcbn0pO1xuXG4vLyBlc3RhYmxpc2ggbXlzcWwgY29ubmVjdGlvblxuc2VxdWVsaXplXG4gIC5hdXRoZW50aWNhdGUoKVxuICAudGhlbigoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ1NlcXVlbGl6ZSBoYXMgZXN0YWJsaXNoZWQgbXlzcWwgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkuJyk7XG4gIH0pXG4gIC5jYXRjaChlcnIgPT4ge1xuICAgIGxvZ2dlci5lcnJvcignU2VxdWVsaXplIHdhcyB1bmFibGUgdG8gY29ubmVjdCB0byB0aGUgZGF0YWJhc2U6JywgZXJyKTtcbiAgfSk7XG5cbi8vIG1hbnVhbGx5IGFkZCBlYWNoIG1vZGVsIHRvIHRoZSBkYiBvYmplY3QgKG5vdGU6IG1ha2UgdGhpcyBkeW5hbWljKVxuY29uc3QgZGIgPSB7fTtcbmRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG5kYlsnQ2hhbm5lbCddID0gc2VxdWVsaXplLmltcG9ydCgnQ2hhbm5lbCcsIENoYW5uZWwpO1xuZGJbJ0NsYWltJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDbGFpbScsIENsYWltKTtcbmRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG5kYlsnUmVxdWVzdCddID0gc2VxdWVsaXplLmltcG9ydCgnUmVxdWVzdCcsIFJlcXVlc3QpO1xuZGJbJ1VzZXInXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1VzZXInLCBVc2VyKTtcblxuLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbmxvZ2dlci5pbmZvKCdhc3NvY2lhdGluZyBkYiBtb2RlbHMuLi4nKTtcbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4gIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgIGxvZ2dlci5pbmZvKCdBc3NvY2lhdGluZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbiAgfVxufSk7XG5cbi8vIGFkZCBzZXF1ZWxpemUvU2VxdWVsaXplIHRvIGRiXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG4vLyBhZGQgYW4gJ3Vwc2VydCcgbWV0aG9kIHRvIHRoZSBkYiBvYmplY3RcbmRiLnVwc2VydCA9IChNb2RlbCwgdmFsdWVzLCBjb25kaXRpb24sIHRhYmxlTmFtZSkgPT4ge1xuICByZXR1cm4gTW9kZWxcbiAgICAuZmluZE9uZSh7XG4gICAgICB3aGVyZTogY29uZGl0aW9uLFxuICAgIH0pXG4gICAgLnRoZW4ob2JqID0+IHtcbiAgICAgIGlmIChvYmopIHsgIC8vIHVwZGF0ZVxuICAgICAgICBsb2dnZXIuZGVidWcoYHVwZGF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIG9iai51cGRhdGUodmFsdWVzKTtcbiAgICAgIH0gZWxzZSB7ICAvLyBpbnNlcnRcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBjcmVhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBNb2RlbC5jcmVhdGUodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgJHt0YWJsZU5hbWV9LnVwc2VydCBlcnJvcmAsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZSB9KSA9PiB7XG4gIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBkZXNjcmlwdGlvbjogc2l0ZURlc2NyaXB0aW9uLCBob3N0OiBzaXRlSG9zdCwgdGl0bGU6IHNpdGVUaXRsZSwgdHdpdHRlcjogc2l0ZVR3aXR0ZXIgfSA9IHNpdGU7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gICAgc2l0ZURlc2NyaXB0aW9uLFxuICAgIHNpdGVIb3N0LFxuICAgIHNpdGVUaXRsZSxcbiAgICBzaXRlVHdpdHRlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnY3Jvc3MtZmV0Y2gvcG9seWZpbGwnO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgSlNPTiByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBwYXJzZUpTT04gKHJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBzdGF0dXMgcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdCB8IHVuZGVmaW5lZH0gUmV0dXJucyBvYmplY3Qgd2l0aCBzdGF0dXMgYW5kIHN0YXR1c1RleHQsIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjaGVja1N0YXR1cyAocmVzcG9uc2UsIGpzb25SZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xuICB9XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGpzb25SZXNwb25zZS5tZXNzYWdlKTtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgdGhyb3cgZXJyb3I7XG59XG5cbi8qKlxuICogUmVxdWVzdHMgYSBVUkwsIHJldHVybmluZyBhIHByb21pc2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybCAgICAgICBUaGUgVVJMIHdlIHdhbnQgdG8gcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgd2Ugd2FudCB0byBwYXNzIHRvIFwiZmV0Y2hcIlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgIFRoZSByZXNwb25zZSBkYXRhXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXNwb25zZSwgcGFyc2VKU09OKHJlc3BvbnNlKV0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFtyZXNwb25zZSwganNvblJlc3BvbnNlXSkgPT4ge1xuICAgICAgcmV0dXJuIGNoZWNrU3RhdHVzKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3JlcXVlc3QuanMiLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGFwaTogeyBhcGlIb3N0LCBhcGlQb3J0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzJyk7XG5jb25zdCBsYnJ5QXBpVXJpID0gJ2h0dHA6Ly8nICsgYXBpSG9zdCArICc6JyArIGFwaVBvcnQ7XG5jb25zdCB7IGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCwgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4vZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5cbmNvbnN0IGhhbmRsZUxicnluZXRSZXNwb25zZSA9ICh7IGRhdGEgfSwgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGxvZ2dlci5kZWJ1ZygnbGJyeSBhcGkgZGF0YTonLCBkYXRhKTtcbiAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgLy8gY2hlY2sgZm9yIGFuIGVycm9yXG4gICAgaWYgKGRhdGEucmVzdWx0LmVycm9yKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0xicnluZXQgYXBpIGVycm9yOicsIGRhdGEucmVzdWx0LmVycm9yKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoZGF0YS5yZXN1bHQuZXJyb3IpKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIHJlc29sdmUoZGF0YS5yZXN1bHQpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBmYWxsYmFjayBpbiBjYXNlIGl0IGp1c3QgdGltZWQgb3V0XG4gIHJlamVjdChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaENsYWltIChwdWJsaXNoUGFyYW1zKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFB1Ymxpc2hpbmcgY2xhaW0gdG8gXCIke3B1Ymxpc2hQYXJhbXMubmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3B1Ymxpc2gnLFxuICAgICAgICAgIHBhcmFtczogcHVibGlzaFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3B1Ymxpc2gnLCBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwocHVibGlzaFBhcmFtcyksIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBDbGFpbSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSwgdGltZW91dDogMjAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltJywgJ0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltTGlzdCAoY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgY2xhaW1fbGlzdCBmb3IgXCIke2NsYWltTmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NsYWltX2xpc3QnLFxuICAgICAgICAgIHBhcmFtczogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltTGlzdCcsICdDTEFJTV9MSVNUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVzb2x2ZVVyaSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFJlc29sdmluZyBVUkkgZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdyZXNvbHZlJyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3Jlc29sdmVVcmknLCAnUkVTT0xWRScsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcikgeyAgLy8gY2hlY2sgZm9yIGVycm9yc1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7ICAvLyBpZiBubyBlcnJvcnMsIHJlc29sdmVcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHRbdXJpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXREb3dubG9hZERpcmVjdG9yeSAoKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdsYnJ5QXBpID4+IFJldHJpZXZpbmcgdGhlIGRvd25sb2FkIGRpcmVjdG9yeSBwYXRoIGZyb20gbGJyeSBkYWVtb24uLi4nKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdzZXR0aW5nc19nZXQnLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXREb3dubG9hZERpcmVjdG9yeScsICdTRVRUSU5HU19HRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0LmRvd25sb2FkX2RpcmVjdG9yeSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gbGJyeSBkYWVtb24sIGJ1dCB1bmFibGUgdG8gcmV0cmlldmUgdGhlIGRvd25sb2FkIGRpcmVjdG9yeS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdMYnJ5bmV0IEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKCcvaG9tZS9sYnJ5L0Rvd25sb2Fkcy8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZUNoYW5uZWwgKG5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gQ3JlYXRpbmcgY2hhbm5lbCBmb3IgJHtuYW1lfS4uLmApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NoYW5uZWxfbmV3JyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGNoYW5uZWxfbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGFtb3VudCAgICAgIDogMC4xLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdjcmVhdGVDaGFubmVsJywgJ0NIQU5ORUxfTkVXJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwiLy8gcmVxdWVzdCBhY3Rpb25zXG5leHBvcnQgY29uc3QgSEFORExFX1NIT1dfVVJJID0gJ0hBTkRMRV9TSE9XX1VSSSc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9FUlJPUiA9ICdSRVFVRVNUX0VSUk9SJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX1VQREFURSA9ICdSRVFVRVNUX1VQREFURSc7XG5leHBvcnQgY29uc3QgQVNTRVRfUkVRVUVTVF9ORVcgPSAnQVNTRVRfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfUkVRVUVTVF9ORVcgPSAnQ0hBTk5FTF9SRVFVRVNUX05FVyc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9MSVNUX0FERCA9ICdSRVFVRVNUX0xJU1RfQUREJztcblxuLy8gYXNzZXQgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEFTU0VUX0FERCA9IGBBU1NFVF9BRERgO1xuXG4vLyBjaGFubmVsIGFjdGlvbnNcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0FERCA9ICdDSEFOTkVMX0FERCc7XG5cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyA9ICdDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyc7XG5cbi8vIGFzc2V0L2ZpbGUgZGlzcGxheSBhY3Rpb25zXG5leHBvcnQgY29uc3QgRklMRV9SRVFVRVNURUQgPSAnRklMRV9SRVFVRVNURUQnO1xuZXhwb3J0IGNvbnN0IEZJTEVfQVZBSUxBQklMSVRZX1VQREFURSA9ICdGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQVNTRVRfRVJST1IgPSAnRElTUExBWV9BU1NFVF9FUlJPUic7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdEFzc2V0ID0gKHNob3cpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3Rbc2hvdy5yZXF1ZXN0LmlkXTtcbiAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTtcbiAgcmV0dXJuIHNob3cuYXNzZXRMaXN0W2Fzc2V0S2V5XTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RTaG93U3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNob3c7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NlbGVjdG9ycy9zaG93LmpzIiwiY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSwgY2xhaW1JZCkge1xuICAgIGlmIChjaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNoYW5uZWwoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNsYWltKG5hbWUsIGNsYWltSWQpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2xhaW0gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2xhaW0oJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DbGFpbS5nZXRMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltSWRCeUNoYW5uZWwgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDaGFubmVsKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSwgJHtjbGFpbU5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgaWRcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxJZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsSWQsIGRiLkNsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxJZCwgY2xhaW1OYW1lKV0pOyAgLy8gMi4gZ2V0IHRoZSBsb25nIGNsYWltIGlkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxJZCwgbG9uZ0NsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbERhdGEgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBzaG9ydENoYW5uZWxDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgICBzaG9ydENoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyhsb25nQ2hhbm5lbENsYWltSWQpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXldKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiBmb3JtYXQgdGhlIGRhdGEgZm9yIHRoZSB2aWV3LCBpbmNsdWRpbmcgcGFnaW5hdGlvblxuICAgICAgICAgIGxldCBwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEgPSByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheSwgcGFnZSk7XG4gICAgICAgICAgLy8gNC4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvbiBhbmQgY29udGVudHNcbiAgICAgICAgICByZXNvbHZlKHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldExvY2FsRmlsZVJlY29yZCAoY2xhaW1JZCwgbmFtZSkge1xuICAgIHJldHVybiBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7Y2xhaW1JZCwgbmFtZX19KVxuICAgICAgLnRoZW4oZmlsZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIHJldHVybiBOT19GSUxFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlLmRhdGFWYWx1ZXM7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2EvZWZmZWN0c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5jb25zdCBsb2NhbExvZ2luU3RyYXRlZ3kgPSByZXF1aXJlKCcuL2xvY2FsLWxvZ2luLmpzJyk7XG5jb25zdCBsb2NhbFNpZ251cFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1zaWdudXAuanMnKTtcbmNvbnN0IHsgc2VyaWFsaXplU3BlZWNoVXNlciwgZGVzZXJpYWxpemVTcGVlY2hVc2VyIH0gPSByZXF1aXJlKCdoZWxwZXJzL2F1dGhIZWxwZXJzLmpzJyk7XG5cbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihkZXNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xucGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVTcGVlY2hVc2VyKTtcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtbG9naW4nLCBsb2NhbExvZ2luU3RyYXRlZ3kpO1xucGFzc3BvcnQudXNlKCdsb2NhbC1zaWdudXAnLCBsb2NhbFNpZ251cFN0cmF0ZWd5KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXNzcG9ydDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZGIgfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnJyk7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBwdWJsaXNoSGVscGVycyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyBwcmltYXJ5Q2xhaW1BZGRyZXNzLCBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgT3AgPSBTZXF1ZWxpemUuT3A7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoIChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHB1Ymxpc2hSZXN1bHRzLCBjZXJ0aWZpY2F0ZUlkLCBjaGFubmVsTmFtZTtcbiAgICAgIC8vIHB1Ymxpc2ggdGhlIGZpbGVcbiAgICAgIHJldHVybiBsYnJ5QXBpLnB1Ymxpc2hDbGFpbShwdWJsaXNoUGFyYW1zKVxuICAgICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFN1Y2Nlc3NmdWxseSBwdWJsaXNoZWQgJHtwdWJsaXNoUGFyYW1zLm5hbWV9ICR7ZmlsZU5hbWV9YCwgdHgpO1xuICAgICAgICAgIHB1Ymxpc2hSZXN1bHRzID0gdHg7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgaWYgKHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYHRoaXMgY2xhaW0gd2FzIHB1Ymxpc2hlZCBpbiBjaGFubmVsOiAke3B1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGRiLkNoYW5uZWwuZmluZE9uZSh7d2hlcmU6IHtjaGFubmVsTmFtZTogcHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWV9fSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygndGhpcyBjbGFpbSB3YXMgbm90IHB1Ymxpc2hlZCBpbiBhIGNoYW5uZWwnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgIC8vIHNldCBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgY2VydGlmaWNhdGVJZCA9IG51bGw7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgPSBudWxsO1xuICAgICAgICAgIGlmIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gY2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lID0gY2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKGBjZXJ0aWZpY2F0ZUlkOiAke2NlcnRpZmljYXRlSWR9YCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBGaWxlIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGZpbGVSZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgZmlsZVBhdGggICA6IHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoLFxuICAgICAgICAgICAgZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gY3JlYXRlIHRoZSBDbGFpbSByZWNvcmRcbiAgICAgICAgICBjb25zdCBjbGFpbVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIHRodW1ibmFpbCAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRodW1ibmFpbCxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICAgIGFtb3VudCAgICAgOiBwdWJsaXNoUGFyYW1zLmJpZCxcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQsXG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCBjcml0ZXJpYVxuICAgICAgICAgIGNvbnN0IHVwc2VydENyaXRlcmlhID0ge1xuICAgICAgICAgICAgbmFtZSAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgdGhlIHJlY29yZHNcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0ZpbGUnKSwgZGIudXBzZXJ0KGRiLkNsYWltLCBjbGFpbVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdDbGFpbScpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbZmlsZSwgY2xhaW1dKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlLnNldENsYWltKGNsYWltKSwgY2xhaW0uc2V0RmlsZShmaWxlKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgICAgcmVzb2x2ZShwdWJsaXNoUmVzdWx0cyk7IC8vIHJlc29sdmUgdGhlIHByb21pc2Ugd2l0aCB0aGUgcmVzdWx0IGZyb20gbGJyeUFwaS5wdWJsaXNoQ2xhaW07XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdQVUJMSVNIIEVSUk9SJywgZXJyb3IpO1xuICAgICAgICAgIHB1Ymxpc2hIZWxwZXJzLmRlbGV0ZVRlbXBvcmFyeUZpbGUocHVibGlzaFBhcmFtcy5maWxlX3BhdGgpOyAvLyBkZWxldGUgdGhlIGxvY2FsIGZpbGVcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUgKG5hbWUpIHtcbiAgICBjb25zdCBjbGFpbUFkZHJlc3NlcyA9IGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB8fCBbXTtcbiAgICBjbGFpbUFkZHJlc3Nlcy5wdXNoKHByaW1hcnlDbGFpbUFkZHJlc3MpO1xuICAgIC8vIGZpbmQgYW55IHJlY29yZHMgd2hlcmUgdGhlIG5hbWUgaXMgdXNlZFxuICAgIHJldHVybiBkYi5DbGFpbVxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbJ2FkZHJlc3MnXSxcbiAgICAgICAgd2hlcmUgICAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWRkcmVzczoge1xuICAgICAgICAgICAgW09wLm9yXTogY2xhaW1BZGRyZXNzZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNsYWltIGlzIGFscmVhZHkgaW4gdXNlJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSAobmFtZSkge1xuICAgIHJldHVybiBkYi5DaGFubmVsXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IGNoYW5uZWxOYW1lOiBuYW1lIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjaGFubmVsIGhhcyBhbHJlYWR5IGJlZW4gY2xhaW1lZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCB7IGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSkge1xuICAgIC8vIHZhbGlkYXRlIG5hbWVcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbmFtZSBmaWVsZCBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWROYW1lQ2hhcmFjdGVycyA9IC9bXkEtWmEtejAtOSwtXS8uZXhlYyhuYW1lKTtcbiAgICBpZiAoaW52YWxpZE5hbWVDaGFyYWN0ZXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjbGFpbSBuYW1lIHlvdSBwcm92aWRlZCBpcyBub3QgYWxsb3dlZC4gIE9ubHkgdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzIGFyZSBhbGxvd2VkOiBBLVosIGEteiwgMC05LCBhbmQgXCItXCInKTtcbiAgICB9XG4gICAgLy8gb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgIG5zZncgPSAobnNmdyA9PT0gJ3RydWUnKTtcbiAgICBsaWNlbnNlID0gbGljZW5zZSB8fCBudWxsO1xuICAgIHRpdGxlID0gdGl0bGUgfHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uIHx8IG51bGw7XG4gICAgdGh1bWJuYWlsID0gdGh1bWJuYWlsIHx8IG51bGw7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIG5zZncsXG4gICAgICBsaWNlbnNlLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHRodW1ibmFpbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgKHtmaWxlLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gbWFrZSBzdXJlIGEgZmlsZSB3YXMgcHJvdmlkZWRcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB3aXRoIGtleSBvZiBbZmlsZV0gZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5zaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZSBuYW1lXG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGVcbiAgICBtb2R1bGUuZXhwb3J0cy52YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZShmaWxlKTtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlTmFtZSAgICAgICAgIDogZmlsZS5uYW1lLFxuICAgICAgZmlsZVBhdGggICAgICAgICA6IGZpbGUucGF0aCxcbiAgICAgIGZpbGVUeXBlICAgICAgICAgOiBmaWxlLnR5cGUsXG4gICAgICB0aHVtYm5haWxGaWxlTmFtZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5uYW1lIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlUGF0aDogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5wYXRoIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlVHlwZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC50eXBlIDogbnVsbCksXG4gICAgfTtcbiAgfSxcbiAgdmFsaWRhdGVGaWxlVHlwZUFuZFNpemUgKGZpbGUpIHtcbiAgICAvLyBjaGVjayBmaWxlIHR5cGUgYW5kIHNpemVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmpwZWcvLmpwZy8ucG5nIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5naWYgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCAuZ2lmcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAubXA0IHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IHVucmVjb2duaXplZCBmaWxlIHR5cGUnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgJyArIGZpbGUudHlwZSArICcgY29udGVudCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuICBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlO1xuICB9LFxuICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMgKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0cyBmb3IgdGl0bGVcbiAgICBpZiAodGl0bGUgPT09IG51bGwgfHwgdGl0bGUudHJpbSgpID09PSAnJykge1xuICAgICAgdGl0bGUgPSBuYW1lO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGRlc2NyaXB0aW9uXG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSBudWxsIHx8IGRlc2NyaXB0aW9uLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gJyc7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgbGljZW5zZVxuICAgIGlmIChsaWNlbnNlID09PSBudWxsIHx8IGxpY2Vuc2UudHJpbSgpID09PSAnJykge1xuICAgICAgbGljZW5zZSA9ICcgJzsgIC8vIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nXG4gICAgfVxuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICBjb25zdCBwdWJsaXNoUGFyYW1zID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGZpbGVfcGF0aDogZmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgIH07XG4gICAgLy8gYWRkIHRodW1ibmFpbCB0byBjaGFubmVsIGlmIHZpZGVvXG4gICAgaWYgKHRodW1ibmFpbCkge1xuICAgICAgcHVibGlzaFBhcmFtc1snbWV0YWRhdGEnXVsndGh1bWJuYWlsJ10gPSB0aHVtYm5haWw7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaXNoUGFyYW1zO1xuICB9LFxuICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zICh0aHVtYm5haWxGaWxlUGF0aCwgY2xhaW1OYW1lLCBsaWNlbnNlLCBuc2Z3KSB7XG4gICAgaWYgKCF0aHVtYm5haWxGaWxlUGF0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFRodW1ibmFpbCBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUgICAgIDogYCR7Y2xhaW1OYW1lfS10aHVtYmAsXG4gICAgICBmaWxlX3BhdGg6IHRodW1ibmFpbEZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIHRpdGxlICAgICAgOiBgJHtjbGFpbU5hbWV9IHRodW1ibmFpbGAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgYSB0aHVtYm5haWwgZm9yICR7Y2xhaW1OYW1lfWAsXG4gICAgICAgIGF1dGhvciAgICAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZSAgIDogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgICBjaGFubmVsX25hbWUgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWwsXG4gICAgICBjaGFubmVsX2lkICAgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWxJZCxcbiAgICB9O1xuICB9LFxuICBkZWxldGVUZW1wb3JhcnlGaWxlIChmaWxlUGF0aCkge1xuICAgIGZzLnVubGluayhmaWxlUGF0aCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBlcnJvciBkZWxldGluZyB0ZW1wb3JhcnkgZmlsZSAke2ZpbGVQYXRofWApO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZGVidWcoYHN1Y2Nlc3NmdWxseSBkZWxldGVkICR7ZmlsZVBhdGh9YCk7XG4gICAgfSk7XG4gIH0sXG4gIGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIChmaWxlSW5mbywgZ2V0UmVzdWx0KSB7XG4gICAgZmlsZUluZm8uZmlsZU5hbWUgPSBnZXRSZXN1bHQuZmlsZV9uYW1lO1xuICAgIGZpbGVJbmZvLmZpbGVQYXRoID0gZ2V0UmVzdWx0LmRvd25sb2FkX3BhdGg7XG4gICAgcmV0dXJuIGZpbGVJbmZvO1xuICB9LFxuICBjcmVhdGVGaWxlRGF0YSAoeyBuYW1lLCBjbGFpbUlkLCBvdXRwb2ludCwgaGVpZ2h0LCBhZGRyZXNzLCBuc2Z3LCBjb250ZW50VHlwZSB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBjbGFpbUlkLFxuICAgICAgb3V0cG9pbnQsXG4gICAgICBoZWlnaHQsXG4gICAgICBhZGRyZXNzLFxuICAgICAgZmlsZU5hbWU6ICcnLFxuICAgICAgZmlsZVBhdGg6ICcnLFxuICAgICAgZmlsZVR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgbnNmdyxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbi8vIGV4cG9ydCBhY3Rpb24gY3JlYXRvcnNcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgc2hvcnRJZCxcbiAgICAgIGxvbmdJZCxcbiAgICB9LFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL2NoYW5uZWwuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBBY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXInO1xuaW1wb3J0IEluYWN0aXZlU3RhdHVzQmFyIGZyb20gJ2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXInO1xuXG5jbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYmFycyAgICAgICA6IFtdLFxuICAgICAgaW5kZXggICAgICA6IDAsXG4gICAgICBpbmNyZW1lbnRlcjogMSxcbiAgICB9O1xuICAgIHRoaXMuY3JlYXRlQmFycyA9IHRoaXMuY3JlYXRlQmFycy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhciA9IHRoaXMuc3RhcnRQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIgPSB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdG9wUHJvZ3Jlc3NCYXIgPSB0aGlzLnN0b3BQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmNyZWF0ZUJhcnMoKTtcbiAgICB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIoKTtcbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy5zdG9wUHJvZ3Jlc3NCYXIoKTtcbiAgfVxuICBjcmVhdGVCYXJzICgpIHtcbiAgICBjb25zdCBiYXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5wcm9wcy5zaXplOyBpKyspIHtcbiAgICAgIGJhcnMucHVzaCh7aXNBY3RpdmU6IGZhbHNlfSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBiYXJzIH0pO1xuICB9XG4gIHN0YXJ0UHJvZ3Jlc3NCYXIgKCkge1xuICAgIHRoaXMudXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZVByb2dyZXNzQmFyLmJpbmQodGhpcyksIDMwMCk7XG4gIH07XG4gIHVwZGF0ZVByb2dyZXNzQmFyICgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLnN0YXRlLmluZGV4O1xuICAgIGxldCBpbmNyZW1lbnRlciA9IHRoaXMuc3RhdGUuaW5jcmVtZW50ZXI7XG4gICAgbGV0IGJhcnMgPSB0aGlzLnN0YXRlLmJhcnM7XG4gICAgLy8gZmxpcCBpbmNyZW1lbnRlciBpZiBuZWNlc3NhcnksIHRvIHN0YXkgaW4gYm91bmRzXG4gICAgaWYgKChpbmRleCA8IDApIHx8IChpbmRleCA+IHRoaXMucHJvcHMuc2l6ZSkpIHtcbiAgICAgIGluY3JlbWVudGVyID0gaW5jcmVtZW50ZXIgKiAtMTtcbiAgICAgIGluZGV4ICs9IGluY3JlbWVudGVyO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgdGhlIGluZGV4ZWQgYmFyXG4gICAgaWYgKGluY3JlbWVudGVyID4gMCkge1xuICAgICAgYmFyc1tpbmRleF0uaXNBY3RpdmUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gICAgLy8gaW5jcmVtZW50IGluZGV4XG4gICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgLy8gdXBkYXRlIHN0YXRlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBiYXJzLFxuICAgICAgaW5jcmVtZW50ZXIsXG4gICAgICBpbmRleCxcbiAgICB9KTtcbiAgfTtcbiAgc3RvcFByb2dyZXNzQmFyICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudXBkYXRlSW50ZXJ2YWwpO1xuICB9O1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5zdGF0ZS5iYXJzLm1hcCgoYmFyLCBpbmRleCkgPT4gYmFyLmlzQWN0aXZlID8gPEFjdGl2ZVN0YXR1c0JhciBrZXk9e2luZGV4fSAvPiA6IDxJbmFjdGl2ZVN0YXR1c0JhciBrZXk9e2luZGV4fS8+KX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cblByb2dyZXNzQmFyLnByb3BUeXBlcyA9IHtcbiAgc2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuXG5jbGFzcyBFcnJvclBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPHA+e2Vycm9yfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5FcnJvclBhZ2UucHJvcFR5cGVzID0ge1xuICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1sb2NhbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCJcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlcXVlbGl6ZVwiXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuU2hvcnRJZDogZnVuY3Rpb24gKGNsYWltc0FycmF5LCBsb25nSWQpIHtcbiAgICBsZXQgY2xhaW1JbmRleDtcbiAgICBsZXQgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgMSk7IC8vIGRlZmF1bHQgc2hvcnQgaWQgaXMgdGhlIGZpcnN0IGxldHRlclxuICAgIGxldCBzaG9ydElkTGVuZ3RoID0gMDtcbiAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGlzIGNsYWltIGlkXG4gICAgY2xhaW1JbmRleCA9IGNsYWltc0FycmF5LmZpbmRJbmRleChlbGVtZW50ID0+IHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYWltSWQgPT09IGxvbmdJZDtcbiAgICB9KTtcbiAgICBpZiAoY2xhaW1JbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xhaW0gaWQgbm90IGZvdW5kIGluIGNsYWltcyBsaXN0Jyk7XG4gICAgfVxuICAgIC8vIGdldCBhbiBhcnJheSBvZiBhbGwgY2xhaW1zIHdpdGggbG93ZXIgaGVpZ2h0XG4gICAgbGV0IHBvc3NpYmxlTWF0Y2hlcyA9IGNsYWltc0FycmF5LnNsaWNlKDAsIGNsYWltSW5kZXgpO1xuICAgIC8vIHJlbW92ZSBjZXJ0aWZpY2F0ZXMgd2l0aCB0aGUgc2FtZSBwcmVmaXhlcyB1bnRpbCBub25lIGFyZSBsZWZ0LlxuICAgIHdoaWxlIChwb3NzaWJsZU1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2hvcnRJZExlbmd0aCArPSAxO1xuICAgICAgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCk7XG4gICAgICBwb3NzaWJsZU1hdGNoZXMgPSBwb3NzaWJsZU1hdGNoZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQuY2xhaW1JZCAmJiAoZWxlbWVudC5jbGFpbUlkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKSA9PT0gc2hvcnRJZCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzaG9ydElkO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnY2xpZW50L3JlZHVjZXJzJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICdjbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyLyc7XG5pbXBvcnQgQXBwIGZyb20gJ2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UuanMnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIpO1xuXG4gIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcblxuICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAvLyBTb21ld2hlcmUgYSBgPFJlZGlyZWN0PmAgd2FzIHJlbmRlcmVkXG4gICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB3ZSdyZSBnb29kLCBzZW5kIHRoZSByZXNwb25zZVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUHVibGlzaFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvcHVibGlzaCc7XG5pbXBvcnQgQ2hhbm5lbFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvY2hhbm5lbCc7XG5pbXBvcnQgU2hvd1JlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2hvdyc7XG5pbXBvcnQgU2l0ZVJlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2l0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGNoYW5uZWw6IENoYW5uZWxSZWR1Y2VyLFxuICBwdWJsaXNoOiBQdWJsaXNoUmVkdWNlcixcbiAgc2hvdyAgIDogU2hvd1JlZHVjZXIsXG4gIHNpdGUgICA6IFNpdGVSZWR1Y2VyLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJleHBvcnQgY29uc3QgRklMRV9TRUxFQ1RFRCA9ICdGSUxFX1NFTEVDVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0NMRUFSID0gJ0ZJTEVfQ0xFQVInO1xuZXhwb3J0IGNvbnN0IE1FVEFEQVRBX1VQREFURSA9ICdNRVRBREFUQV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IENMQUlNX1VQREFURSA9ICdDTEFJTV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFVF9QVUJMSVNIX0lOX0NIQU5ORUwgPSAnU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFUVVNfVVBEQVRFID0gJ1BVQkxJU0hfU1RBVFVTX1VQREFURSc7XG5leHBvcnQgY29uc3QgRVJST1JfVVBEQVRFID0gJ0VSUk9SX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VMRUNURURfQ0hBTk5FTF9VUERBVEUgPSAnU0VMRUNURURfQ0hBTk5FTF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9NRVRBREFUQV9JTlBVVFMgPSAnVE9HR0xFX01FVEFEQVRBX0lOUFVUUyc7XG5leHBvcnQgY29uc3QgVEhVTUJOQUlMX05FVyA9ICdUSFVNQk5BSUxfTkVXJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVJUID0gJ1BVQkxJU0hfU1RBUlQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBMT0dJTiA9ICdFeGlzdGluZyc7XG5leHBvcnQgY29uc3QgQ1JFQVRFID0gJ05ldyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwiZXhwb3J0IGNvbnN0IENIQU5ORUxfVVBEQVRFID0gJ0NIQU5ORUxfVVBEQVRFJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9DQUxfQ0hFQ0sgPSAnTE9DQUxfQ0hFQ0snO1xuZXhwb3J0IGNvbnN0IFVOQVZBSUxBQkxFID0gJ1VOQVZBSUxBQkxFJztcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdFUlJPUic7XG5leHBvcnQgY29uc3QgQVZBSUxBQkxFID0gJ0FWQUlMQUJMRSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBHb29nbGVBbmFseXRpY3MgZnJvbSAncmVhY3QtZ2EnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuY29uc3QgeyBhbmFseXRpY3M6IHsgZ29vZ2xlSWQgfSB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuR29vZ2xlQW5hbHl0aWNzLmluaXRpYWxpemUoZ29vZ2xlSWQpO1xuXG5jbGFzcyBHQUxpc3RlbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2VuZFBhZ2VWaWV3KHRoaXMucHJvcHMuaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdGhpcy5wcm9wcy5oaXN0b3J5Lmxpc3Rlbih0aGlzLnNlbmRQYWdlVmlldyk7XG4gIH1cblxuICBzZW5kUGFnZVZpZXcgKGxvY2F0aW9uKSB7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnNldCh7IHBhZ2U6IGxvY2F0aW9uLnBhdGhuYW1lIH0pO1xuICAgIEdvb2dsZUFuYWx5dGljcy5wYWdldmlldyhsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoR0FMaXN0ZW5lcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgSG9tZVBhZ2UgZnJvbSAncGFnZXMvSG9tZVBhZ2UnO1xuaW1wb3J0IEFib3V0UGFnZSBmcm9tICdwYWdlcy9BYm91dFBhZ2UnO1xuaW1wb3J0IExvZ2luUGFnZSBmcm9tICdwYWdlcy9Mb2dpblBhZ2UnO1xuaW1wb3J0IFNob3dQYWdlIGZyb20gJ3BhZ2VzL1Nob3dQYWdlJztcbmltcG9ydCBGb3VyT2hGb3VyUGFnZSBmcm9tICdjb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlJztcbi8vIGltcG9ydCB7IGR5bmFtaWNJbXBvcnQgfSBmcm9tICd1dGlscy9keW5hbWljSW1wb3J0Jztcbi8vIGNvbnN0IEhvbWVQYWdlID0gZHluYW1pY0ltcG9ydCgncGFnZXMvSG9tZVBhZ2UnKTsgLy8gb3IgdXNlIHRoZSBwcm92aWRlZCBsb2NhbCBob21lcGFnZVxuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN3aXRjaD5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9e0hvbWVQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9hYm91dCcgY29tcG9uZW50PXtBYm91dFBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2xvZ2luJyBjb21wb25lbnQ9e0xvZ2luUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmlkZW50aWZpZXIvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy86Y2xhaW0nIGNvbXBvbmVudD17U2hvd1BhZ2V9IC8+XG4gICAgICA8Um91dGUgY29tcG9uZW50PXtGb3VyT2hGb3VyUGFnZX0gLz5cbiAgICA8L1N3aXRjaD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcHAuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgc2VsZWN0RmlsZSwgdXBkYXRlRXJyb3IsIGNsZWFyRmlsZSB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlICAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICB0aHVtYm5haWw6IHB1Ymxpc2gudGh1bWJuYWlsLFxuICAgIGZpbGVFcnJvcjogcHVibGlzaC5lcnJvci5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIHNlbGVjdEZpbGU6IChmaWxlKSA9PiB7XG4gICAgICBkaXNwYXRjaChzZWxlY3RGaWxlKGZpbGUpKTtcbiAgICB9LFxuICAgIHNldEZpbGVFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaChjbGVhckZpbGUoKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignZmlsZScsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJleHBvcnQgY29uc3QgQ0hBTk5FTCA9ICdDSEFOTkVMJztcbmV4cG9ydCBjb25zdCBBU1NFVF9MSVRFID0gJ0FTU0VUX0xJVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0RFVEFJTFMgPSAnQVNTRVRfREVUQUlMUyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgZmlsZVJlcXVlc3RlZCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBlcnJvciBhbmQgc3RhdHVzXG4gIGNvbnN0IGVycm9yICA9IHNob3cuZGlzcGxheUFzc2V0LmVycm9yO1xuICBjb25zdCBzdGF0dXMgPSBzaG93LmRpc3BsYXlBc3NldC5zdGF0dXM7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgZXJyb3IsXG4gICAgc3RhdHVzLFxuICAgIGFzc2V0LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uRmlsZVJlcXVlc3Q6IChuYW1lLCBjbGFpbUlkKSA9PiB7XG4gICAgICBkaXNwYXRjaChmaWxlUmVxdWVzdGVkKG5hbWUsIGNsYWltSWQpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL2dlbmVyYWwuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvYnVuZGxlL2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICBgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBnZXRDbGFpbUlkLCBnZXRMb2NhbEZpbGVSZWNvcmQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCcuL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuY29uc3QgU0hPVyA9ICdTSE9XJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5mdW5jdGlvbiBjbGllbnRBY2NlcHRzSHRtbCAoe2FjY2VwdH0pIHtcbiAgcmV0dXJuIGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLyk7XG59O1xuXG5mdW5jdGlvbiByZXF1ZXN0SXNGcm9tQnJvd3NlciAoaGVhZGVycykge1xuICByZXR1cm4gaGVhZGVyc1sndXNlci1hZ2VudCddICYmIGhlYWRlcnNbJ3VzZXItYWdlbnQnXS5tYXRjaCgvTW96aWxsYS8pO1xufTtcblxuZnVuY3Rpb24gY2xpZW50V2FudHNBc3NldCAoe2FjY2VwdCwgcmFuZ2V9KSB7XG4gIGNvbnN0IGltYWdlSXNXYW50ZWQgPSBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC9pbWFnZVxcLy4qLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvXFwqLyk7XG4gIGNvbnN0IHZpZGVvSXNXYW50ZWQgPSBhY2NlcHQgJiYgcmFuZ2U7XG4gIHJldHVybiBpbWFnZUlzV2FudGVkIHx8IHZpZGVvSXNXYW50ZWQ7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2xhaW1JZCAoY2xhaW1JZCkge1xuICByZXR1cm4gKChjbGFpbUlkLmxlbmd0aCA9PT0gNDApICYmICEvW15BLVphLXowLTldL2cudGVzdChjbGFpbUlkKSk7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZCAoY2xhaW1JZCkge1xuICByZXR1cm4gY2xhaW1JZC5sZW5ndGggPT09IDE7ICAvLyBpdCBzaG91bGQgcmVhbGx5IGV2YWx1YXRlIHRoZSBzaG9ydCB1cmwgaXRzZWxmXG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCAoaW5wdXQpIHtcbiAgcmV0dXJuIChpc1ZhbGlkQ2xhaW1JZChpbnB1dCkgfHwgaXNWYWxpZFNob3J0SWQoaW5wdXQpKTtcbn07XG5cbmZ1bmN0aW9uIHNlcnZlQXNzZXRUb0NsaWVudCAoY2xhaW1JZCwgbmFtZSwgcmVzKSB7XG4gIHJldHVybiBnZXRMb2NhbEZpbGVSZWNvcmQoY2xhaW1JZCwgbmFtZSlcbiAgICAudGhlbihmaWxlUmVjb3JkID0+IHtcbiAgICAgIC8vIGNoZWNrIHRoYXQgYSBsb2NhbCByZWNvcmQgd2FzIGZvdW5kXG4gICAgICBpZiAoZmlsZVJlY29yZCA9PT0gTk9fRklMRSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygzMDcpLnJlZGlyZWN0KGAvYXBpL2NsYWltL2dldC8ke25hbWV9LyR7Y2xhaW1JZH1gKTtcbiAgICAgIH1cbiAgICAgIC8vIHNlcnZlIHRoZSBmaWxlXG4gICAgICBjb25zdCB7ZmlsZVBhdGgsIGZpbGVUeXBlfSA9IGZpbGVSZWNvcmQ7XG4gICAgICBsb2dnZXIudmVyYm9zZShgc2VydmluZyBmaWxlOiAke2ZpbGVQYXRofWApO1xuICAgICAgY29uc3Qgc2VuZEZpbGVPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgICAgICAgOiBmaWxlVHlwZSB8fCAnaW1hZ2UvanBlZycsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmRGaWxlKGZpbGVQYXRoLCBzZW5kRmlsZU9wdGlvbnMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpIHtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihmdWxsQ2xhaW1JZCA9PiB7XG4gICAgICAgIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2hhbm5lbCBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2ZUFzc2V0VG9DbGllbnQoZnVsbENsYWltSWQsIGNsYWltTmFtZSwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdzdWNjZXNzJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ2ZhaWwnKTtcbiAgICAgIH0pO1xuICB9LFxuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUgKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2VUeXBlO1xuICAgIGlmIChoYXNGaWxlRXh0ZW5zaW9uKSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTsgIC8vIGFzc3VtZSBhIHNlcnZlIHJlcXVlc3QgaWYgZmlsZSBleHRlbnNpb24gaXMgcHJlc2VudFxuICAgICAgaWYgKGNsaWVudEFjY2VwdHNIdG1sKGhlYWRlcnMpKSB7ICAvLyBpZiB0aGUgcmVxdWVzdCBjb21lcyBmcm9tIGEgYnJvd3NlciwgY2hhbmdlIGl0IHRvIGEgc2hvdyByZXF1ZXN0XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICBpZiAoY2xpZW50V2FudHNBc3NldChoZWFkZXJzKSAmJiByZXF1ZXN0SXNGcm9tQnJvd3NlcihoZWFkZXJzKSkgeyAgLy8gdGhpcyBpcyBpbiBjYXNlIHNvbWVvbmUgZW1iZWRzIGEgc2hvdyB1cmxcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdTaG93IHJlcXVlc3QgY2FtZSBmcm9tIGJyb3dzZXIgYnV0IHdhbnRzIGFuIGltYWdlL3ZpZGVvLiBDaGFuZ2luZyByZXNwb25zZSB0byBzZXJ2ZS4uLicpO1xuICAgICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlVHlwZTtcbiAgfSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSAoaWRlbnRpZmllciwgbmFtZSkge1xuICAgIC8vIHRoaXMgaXMgYSBwYXRjaCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCAnL25hbWUvY2xhaW1faWQnIHVybCBmb3JtYXRcbiAgICBpZiAoaXNWYWxpZFNob3J0SWRPckNsYWltSWQobmFtZSkgJiYgIWlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKGlkZW50aWZpZXIpKSB7XG4gICAgICBjb25zdCB0ZW1wTmFtZSA9IG5hbWU7XG4gICAgICBuYW1lID0gaWRlbnRpZmllcjtcbiAgICAgIGlkZW50aWZpZXIgPSB0ZW1wTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFtpZGVudGlmaWVyLCBuYW1lXTtcbiAgfSxcbiAgbG9nUmVxdWVzdERhdGEgKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZygncmVzcG9uc2VUeXBlID09PScsIHJlc3BvbnNlVHlwZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBuYW1lID09PSAnLCBjbGFpbU5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBuYW1lID09PScsIGNoYW5uZWxOYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIGlkID09PScsIGNsYWltSWQpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBpZGVudGlmaWVyOicsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHt2YWx1ZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciB1cmwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwgbmFtZSBhZnRlciBALicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltSWQsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG5hbWU6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgLicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yICR7bW9kaWZpZXJTZXBlcmF0b3J9LmApO1xuICAgICAgfVxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHttb2RpZmllclNlcGVyYXRvcn0gbW9kaWZpZXIgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZWApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VNb2RpZmllcjogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG1vZGlmaWVyOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb24gPSBmYWxzZTtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbixcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUmVkdWNlciBmcm9tICcuLi8uLi9jbGllbnQvcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXgnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi8uLi9jbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgaGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvc2FnYXMvc2hvd191cmknO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9hY3Rpb25zL3Nob3cnO1xuXG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHJldHVyblNhZ2FXaXRoUGFyYW1zID0gKHNhZ2EsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKiAoKSB7XG4gICAgeWllbGQgY2FsbChzYWdhLCBwYXJhbXMpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBvbkhhbmRsZVNob3dQYWdlVXJpKHJlcS5wYXJhbXMpO1xuICBjb25zdCBzYWdhID0gcmV0dXJuU2FnYVdpdGhQYXJhbXMoaGFuZGxlU2hvd1BhZ2VVcmksIGFjdGlvbik7XG5cbiAgLy8gcnVuIHRoZSBzYWdhIG1pZGRsZXdhcmVcbiAgc2FnYU1pZGRsZXdhcmVcbiAgICAucnVuKHNhZ2EpXG4gICAgLmRvbmVcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsImV4cG9ydCBjb25zdCBzZWxlY3RTaXRlU3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNpdGU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2l0ZUhvc3QgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNpdGUuaG9zdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2VsZWN0b3JzL3NpdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoYXR3Zy1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuL3NlcnZlcicpO1xuXG5jb25zdCBleHBvcnRzID0ge1xuICBTZXJ2ZXIsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcGVlY2guanMiLCIvLyBhcHAgZGVwZW5kZW5jaWVzXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCBleHByZXNzSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2V4cHJlc3MtaGFuZGxlYmFycycpO1xuY29uc3QgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hhbmRsZWJhcnMnKTtcbmNvbnN0IGhlbG1ldCA9IHJlcXVpcmUoJ2hlbG1ldCcpO1xuY29uc3QgY29va2llU2Vzc2lvbiA9IHJlcXVpcmUoJ2Nvb2tpZS1zZXNzaW9uJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgcmVxdWVzdExvZ2dlciA9IHJlcXVpcmUoJ21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcycpO1xuXG5jb25zdCBsb2dnZXJDb25maWcgPSByZXF1aXJlKCdsb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsQ29uZmlnID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcbmNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJ3NsYWNrQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIFNlcnZlciAoKSB7XG4gIHRoaXMuY29uZmlndXJlTG9nZ2VyID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBsb2dnZXJDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBteXNxbENvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2l0ZURldGFpbHMgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNpdGVDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNsYWNrID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBzbGFja0NvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQ2xpZW50QnVuZGxlID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnY29uZmlndXJlIHRoZSBjbGllbnQgaGVyZSBieSBwYXNzaW5nIGluIHRoZSBidW5kbGUgYW5kIGNvbmZpZ3VyaW5nIGl0LCBvciBiZXR0ZXIgeWV0OiB0YWtpbmcgaW4gdGhlIGNvbXBvbmVudHMgdG8gdXNlIGR5bmFtaWNhbGx5IGZyb20gaGVyZS4nKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVNb2RlbHMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdoZXJlIGlzIHdoZXJlIHlvdSBjb3VsZCBhZGQvb3ZlcndyaXRlIHRoZSBkZWZhdWx0IG1vZGVscycpXG4gIH07XG4gIHRoaXMuY29uZmlndXJlUm91dGVzID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCByb3V0ZXMnKVxuICB9O1xuICB0aGlzLmNyZWF0ZUFwcCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgYW4gRXhwcmVzcyBhcHBsaWNhdGlvblxuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuICAgIC8vIHRydXN0IHRoZSBwcm94eSB0byBnZXQgaXAgYWRkcmVzcyBmb3IgdXNcbiAgICBhcHAuZW5hYmxlKCd0cnVzdCBwcm94eScpO1xuXG4gICAgLy8gYWRkIG1pZGRsZXdhcmVcbiAgICBhcHAudXNlKGhlbG1ldCgpKTsgLy8gc2V0IEhUVFAgaGVhZGVycyB0byBwcm90ZWN0IGFnYWluc3Qgd2VsbC1rbm93biB3ZWIgdnVsbmVyYWJpbHRpZXNcbiAgICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKGAke19fZGlybmFtZX0vcHVibGljYCkpOyAvLyAnZXhwcmVzcy5zdGF0aWMnIHRvIHNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIHB1YmxpYyBkaXJlY3RvcnlcbiAgICAvLyBub3RlOiB0YWtlIGluIGEgZGlmZmVyZW50IHB1YmxpYyBmb2xkZXIsIHNvIGl0IGNhbiBzZXJ2ZSBpdCdzIG93biBidW5kbGUgZnJvbSB0aGVyZT9cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi9qc29uXG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7IC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG5cbiAgICAvLyBhZGQgY3VzdG9tIG1pZGRsZXdhcmUgKG5vdGU6IGJ1aWxkIG91dCB0byBhY2NlcHQgZHluYW1pY2FsbHkgdXNlIHdoYXQgaXMgaW4gc2VydmVyL21pZGRsZXdhcmUvXG4gICAgYXBwLnVzZShyZXF1ZXN0TG9nZ2VyKTtcblxuICAgIC8vIGNvbmZpZ3VyZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbiAgICAvLyBpbml0aWFsaXplIHBhc3Nwb3J0XG4gICAgY29uc3Qgc2Vzc2lvbktleSA9IHNpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5O1xuICAgIGFwcC51c2UoY29va2llU2Vzc2lvbih7XG4gICAgICBuYW1lICA6ICdzZXNzaW9uJyxcbiAgICAgIGtleXMgIDogW3Nlc3Npb25LZXldLFxuICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBpLmUuIDI0IGhvdXJzXG4gICAgfSkpO1xuICAgIGFwcC51c2Uoc3BlZWNoUGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgICAvLyBjb25maWd1cmUgaGFuZGxlYmFycyAmIHJlZ2lzdGVyIGl0IHdpdGggZXhwcmVzcyBhcHBcbiAgICBjb25zdCBoYnMgPSBleHByZXNzSGFuZGxlYmFycy5jcmVhdGUoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2VtYmVkJyxcbiAgICAgIGhhbmRsZWJhcnMgICA6IEhhbmRsZWJhcnMsXG4gICAgfSk7XG4gICAgYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGhicy5lbmdpbmUpO1xuICAgIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuICAgIC8vIHNldCB0aGUgcm91dGVzIG9uIHRoZSBhcHBcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hdXRoLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXBpLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvcGFnZXMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldHMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9mYWxsYmFjay8nKShhcHApO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gIH07XG4gIHRoaXMuaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmNyZWF0ZUFwcCgpO1xuICAgIHRoaXMuc2VydmVyID0gaHR0cC5TZXJ2ZXIodGhpcy5hcHApO1xuICB9O1xuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRiID0gcmVxdWlyZSgnLi9tb2RlbHMvJyk7XG4gICAgY29uc3QgUE9SVCA9IHNpdGVDb25maWcuZGV0YWlscy5wb3J0O1xuICAgIC8vIHN5bmMgc2VxdWVsaXplXG4gICAgZGIuc2VxdWVsaXplLnN5bmMoKVxuICAgIC8vIHN0YXJ0IHRoZSBzZXJ2ZXJcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBQT1JUICR7UE9SVH1gKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFN0YXJ0dXAgRXJyb3I6YCwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3QgcmVxdWVzdExvZ2dlciA9IChyZXEsIHJlcywgbmV4dCkgPT4geyAgLy8gY3VzdG9tIGxvZ2dpbmcgbWlkZGxld2FyZSB0byBsb2cgYWxsIGluY29taW5nIGh0dHAgcmVxdWVzdHNcbiAgbG9nZ2VyLnZlcmJvc2UoYFJlcXVlc3Qgb24gJHtyZXEub3JpZ2luYWxVcmx9IGZyb20gJHtyZXEuaXB9YCk7XG4gIG5leHQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWVzdExvZ2dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIExvZ2dlckNvbmZpZyAoKSB7XG4gIHRoaXMubG9nTGV2ZWwgPSAnZGVidWcnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBsb2dnZXIgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBsb2dnZXIuaW5mbygnY29uZmlndXJpbmcgd2luc3RvbiBsb2dnZXIuLi4nKTtcbiAgICAvLyB1cGRhdGUgdmFsdWVzIHdpdGggbG9jYWwgY29uZmlnIHBhcmFtc1xuICAgIGNvbnN0IHtsb2dMZXZlbH0gPSBjb25maWc7XG4gICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xuICAgIC8vIGNvbmZpZ3VyZSB0aGUgd2luc3RvbiBsb2dnZXJcbiAgICBsb2dnZXIuY29uZmlndXJlKHtcbiAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IChsb2dnZXIudHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgICAgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5sb2dMZXZlbCxcbiAgICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICBjb2xvcml6ZSAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIHByZXR0eVByaW50ICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgLy8gdGVzdCBhbGwgdGhlIGxvZyBsZXZlbHNcbiAgICBsb2dnZXIuaW5mbygndGVzdGluZyB3aW5zdG9uIGxvZyBsZXZlbHMuLi4nKTtcbiAgICBsb2dnZXIuZXJyb3IoJ0xldmVsIDAnKTtcbiAgICBsb2dnZXIud2FybignTGV2ZWwgMScpO1xuICAgIGxvZ2dlci5pbmZvKCdMZXZlbCAyJyk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoJ0xldmVsIDMnKTtcbiAgICBsb2dnZXIuZGVidWcoJ0xldmVsIDQnKTtcbiAgICBsb2dnZXIuc2lsbHkoJ0xldmVsIDUnKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IExvZ2dlckNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCB3aW5zdG9uID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gd2luc3Rvbi53YXJuKCdObyBzbGFjayBjb25maWcgcmVjZWl2ZWQnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlc1xuICAgIHdpbnN0b24uaW5mbygnY29uZmlndXJpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICAgIC8vIHVwZGF0ZSBzbGFjayB3ZWJob29rIHNldHRpbmdzXG4gICAgaWYgKHRoaXMuc2xhY2tXZWJIb29rKSB7XG4gICAgICAvLyBhZGQgYSB0cmFuc3BvcnQgZm9yIGVycm9ycyB0byBzbGFja1xuICAgICAgaWYgKHRoaXMuc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1lcnJvcnMtdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2staW5mby10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrSW5mb0NoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlc1xuICAgICAgd2luc3Rvbi5pbmZvKCd0ZXN0aW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgICAgd2luc3Rvbi5pbmZvKCdTbGFjayBcImluZm9cIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tc2xhY2std2ViaG9va1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGRiIH0gPSByZXF1aXJlKCdteXNxbENvbmZpZycpO1xuXG5jb25zdCByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8gPSAodXNlckluc3RhbmNlKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgdXNlckluZm9bJ2lkJ10gPSB1c2VySW5zdGFuY2UuaWQ7XG4gICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSB1c2VySW5zdGFuY2UudXNlck5hbWU7XG4gICAgdXNlckluc3RhbmNlXG4gICAgICAuZ2V0Q2hhbm5lbCgpXG4gICAgICAudGhlbigoe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0pID0+IHtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQoY2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJlc29sdmUodXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICByZXR1cm4gZGIuVXNlclxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge3VzZXJOYW1lOiB1c2VybmFtZX0sXG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQocGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdQYXNzd29yZCB3YXMgYSBtYXRjaCwgcmV0dXJuaW5nIFVzZXInKTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8odXNlcilcbiAgICAgICAgICAgICAgLnRoZW4odXNlckluZm8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfSxcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYG5ldyBjaGFubmVsIHNpZ251cCByZXF1ZXN0LiB1c2VyOiAke3VzZXJuYW1lfSBwYXNzOiAke3Bhc3N3b3JkfSAuYCk7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgLy8gc2VydmVyLXNpZGUgdmFsaWRhdG9uIG9mIGlucHV0cyAodXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFubmVsIGFuZCByZXRyaWV2ZSB0aGUgbWV0YWRhdGFcbiAgICByZXR1cm4gbGJyeUFwaS5jcmVhdGVDaGFubmVsKGBAJHt1c2VybmFtZX1gKVxuICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgdXNlck5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXJEYXRhID4nLCB1c2VyRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCBjaGFubmVsRGF0YSA9IHtcbiAgICAgICAgICBjaGFubmVsTmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgY2hhbm5lbENsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2hhbm5lbERhdGEgPicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIGNlcnRpZmljYXRlIHJlY29yZFxuICAgICAgICBjb25zdCBjZXJ0aWZpY2F0ZURhdGEgPSB7XG4gICAgICAgICAgY2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgICAgbmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgLy8gYWRkcmVzcyxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NlcnRpZmljYXRlRGF0YSA+JywgY2VydGlmaWNhdGVEYXRhKTtcbiAgICAgICAgLy8gc2F2ZSB1c2VyIGFuZCBjZXJ0aWZpY2F0ZSB0byBkYlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLlVzZXIuY3JlYXRlKHVzZXJEYXRhKSwgZGIuQ2hhbm5lbC5jcmVhdGUoY2hhbm5lbERhdGEpLCBkYi5DZXJ0aWZpY2F0ZS5jcmVhdGUoY2VydGlmaWNhdGVEYXRhKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbbmV3VXNlciwgbmV3Q2hhbm5lbCwgbmV3Q2VydGlmaWNhdGVdKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAvLyBzdG9yZSB0aGUgcmVsZXZhbnQgbmV3VXNlciBpbmZvIHRvIGJlIHBhc3NlZCBiYWNrIGZvciByZXEuVXNlclxuICAgICAgICB1c2VySW5mb1snaWQnXSA9IG5ld1VzZXIuaWQ7XG4gICAgICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gbmV3VXNlci51c2VyTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIC8vIGFzc29jaWF0ZSB0aGUgaW5zdGFuY2VzXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbmV3Q2VydGlmaWNhdGUuc2V0Q2hhbm5lbChuZXdDaGFubmVsKSwgbmV3Q2hhbm5lbC5zZXRVc2VyKG5ld1VzZXIpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQodXNlckluZm8uY2hhbm5lbENsYWltSWQsIHVzZXJJbmZvLmNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ3NpZ251cCBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGNvbnNvbGUubG9nKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGNvbnNvbGUubG9nKCdkZXNlcmlhbGl6aW5nIHVzZXInKTtcbiAgICBkb25lKG51bGwsIHVzZXIpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwiY29uc3Qgc3BlZWNoUGFzc3BvcnQgPSByZXF1aXJlKCdzcGVlY2hQYXNzcG9ydCcpO1xuY29uc3QgaGFuZGxlU2lnbnVwUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2lnbnVwJyk7XG5jb25zdCBoYW5kbGVMb2dpblJlcXVlc3QgPSByZXF1aXJlKCcuL2xvZ2luJyk7XG5jb25zdCBoYW5kbGVMb2dvdXRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dvdXQnKTtcbmNvbnN0IGhhbmRsZVVzZXJSZXF1ZXN0ID0gcmVxdWlyZSgnLi91c2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAucG9zdCgnL3NpZ251cCcsIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtc2lnbnVwJyksIGhhbmRsZVNpZ251cFJlcXVlc3QpO1xuICBhcHAucG9zdCgnL2xvZ2luJywgaGFuZGxlTG9naW5SZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2xvZ291dCcsIGhhbmRsZUxvZ291dFJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvdXNlcicsIGhhbmRsZVVzZXJSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJjb25zdCBzaWdudXAgPSAocmVxLCByZXMpID0+IHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2lnbnVwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcblxuY29uc3QgbG9naW4gPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgc3BlZWNoUGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1sb2dpbicsIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgIH1cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxLmxvZ0luKHVzZXIsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pKHJlcSwgcmVzLCBuZXh0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJjb25zdCBsb2dvdXQgPSAocmVxLCByZXMpID0+IHtcbiAgcmVxLmxvZ291dCgpO1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3lvdSBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCd9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsImNvbnN0IHVzZXIgPSAocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS51c2VyKSB7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS51c2VyfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAndXNlciBpcyBub3QgbG9nZ2VkIGluJ30pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsImNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NoYW5uZWxBdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSByZXF1aXJlKCcuL2NoYW5uZWxDbGFpbXMnKTtcbmNvbnN0IGNoYW5uZWxEYXRhID0gcmVxdWlyZSgnLi9jaGFubmVsRGF0YScpO1xuY29uc3QgY2hhbm5lbFNob3J0SWQgPSByZXF1aXJlKCcuL2NoYW5uZWxTaG9ydElkJyk7XG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9IHJlcXVpcmUoJy4vY2xhaW1BdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNsYWltRGF0YSA9IHJlcXVpcmUoJy4vY2xhaW1EYXRhJyk7XG5jb25zdCBjbGFpbUdldCA9IHJlcXVpcmUoJy4vY2xhaW1HZXQnKTtcbmNvbnN0IGNsYWltTG9uZ0lkID0gcmVxdWlyZSgnLi9jbGFpbUxvbmdJZCcpO1xuY29uc3QgY2xhaW1QdWJsaXNoID0gcmVxdWlyZSgnLi9jbGFpbVB1Ymxpc2gnKTtcbmNvbnN0IGNsYWltUmVzb2x2ZSA9IHJlcXVpcmUoJy4vY2xhaW1SZXNvbHZlJyk7XG5jb25zdCBjbGFpbVNob3J0SWQgPSByZXF1aXJlKCcuL2NsYWltU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1MaXN0ID0gcmVxdWlyZSgnLi9jbGFpbUxpc3QnKTtcbmNvbnN0IGZpbGVBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2ZpbGVBdmFpbGFiaWxpdHknKTtcblxuY29uc3QgbXVsdGlwYXJ0TWlkZGxld2FyZSA9IHJlcXVpcmUoJ2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gY2hhbm5lbCByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS86bmFtZScsIGNoYW5uZWxBdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsIGNoYW5uZWxTaG9ydElkKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2RhdGEvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZCcsIGNoYW5uZWxEYXRhKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2NsYWltcy86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkLzpwYWdlJywgY2hhbm5lbENsYWltcyk7XG4gIC8vIGNsYWltIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCBjbGFpbUxpc3QpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsIGNsYWltR2V0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjbGFpbUF2YWlsYWJpbGl0eSk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vcmVzb2x2ZS86bmFtZS86Y2xhaW1JZCcsIGNsYWltUmVzb2x2ZSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCBjbGFpbVB1Ymxpc2gpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjbGFpbVNob3J0SWQpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9sb25nLWlkJywgY2xhaW1Mb25nSWQpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsIGNsYWltRGF0YSk7XG4gIC8vIGZpbGUgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvZmlsZS9hdmFpbGFiaWxpdHkvOm5hbWUvOmNsYWltSWQnLCBmaWxlQXZhaWxhYmlsaXR5KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsImNvbnN0IHsgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5KG5hbWUpXG4gICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbEF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxBdmFpbGFiaWxpdHkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgZ2V0Q2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhbGwgY2xhaW1zIGZvciBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlO1xuICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsQ2xhaW1zO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsImNvbnN0IENMQUlNU19QRVJfUEFHRSA9IDEyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2xhaW1zLCBwYWdlKSB7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsUGFnZXMoY2xhaW1zKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uUGFnZSA9IG1vZHVsZS5leHBvcnRzLmdldFBhZ2VGcm9tUXVlcnkocGFnZSk7XG4gICAgY29uc3Qgdmlld0RhdGEgPSB7XG4gICAgICBjaGFubmVsTmFtZSAgICAgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbXMgICAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmV4dHJhY3RQYWdlRnJvbUNsYWltcyhjbGFpbXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHByZXZpb3VzUGFnZSAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lUHJldmlvdXNQYWdlKHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlICAgICAgIDogcGFnaW5hdGlvblBhZ2UsXG4gICAgICBuZXh0UGFnZSAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZU5leHRQYWdlKHRvdGFsUGFnZXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHRvdGFsUGFnZXMgICAgICAgIDogdG90YWxQYWdlcyxcbiAgICAgIHRvdGFsUmVzdWx0cyAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxDbGFpbXMoY2xhaW1zKSxcbiAgICB9O1xuICAgIHJldHVybiB2aWV3RGF0YTtcbiAgfSxcbiAgZ2V0UGFnZUZyb21RdWVyeSAocGFnZSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFnZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9LFxuICBleHRyYWN0UGFnZUZyb21DbGFpbXMgKGNsYWltcywgcGFnZU51bWJlcikge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gW107ICAvLyBpZiBubyBjbGFpbXMsIHJldHVybiB0aGlzIGRlZmF1bHRcbiAgICB9XG4gICAgLy8gbG9nZ2VyLmRlYnVnKCdjbGFpbXMgaXMgYXJyYXk/JywgQXJyYXkuaXNBcnJheShjbGFpbXMpKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoYHBhZ2VOdW1iZXIgJHtwYWdlTnVtYmVyfSBpcyBudW1iZXI/YCwgTnVtYmVyLmlzSW50ZWdlcihwYWdlTnVtYmVyKSk7XG4gICAgY29uc3QgY2xhaW1TdGFydEluZGV4ID0gKHBhZ2VOdW1iZXIgLSAxKSAqIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBjbGFpbUVuZEluZGV4ID0gY2xhaW1TdGFydEluZGV4ICsgQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IHBhZ2VPZkNsYWltcyA9IGNsYWltcy5zbGljZShjbGFpbVN0YXJ0SW5kZXgsIGNsYWltRW5kSW5kZXgpO1xuICAgIHJldHVybiBwYWdlT2ZDbGFpbXM7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsUGFnZXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG90YWxDbGFpbXMgPSBjbGFpbXMubGVuZ3RoO1xuICAgICAgaWYgKHRvdGFsQ2xhaW1zIDwgQ0xBSU1TX1BFUl9QQUdFKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgY29uc3QgZnVsbFBhZ2VzID0gTWF0aC5mbG9vcih0b3RhbENsYWltcyAvIENMQUlNU19QRVJfUEFHRSk7XG4gICAgICBjb25zdCByZW1haW5kZXIgPSB0b3RhbENsYWltcyAlIENMQUlNU19QRVJfUEFHRTtcbiAgICAgIGlmIChyZW1haW5kZXIgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZ1bGxQYWdlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdWxsUGFnZXMgKyAxO1xuICAgIH1cbiAgfSxcbiAgZGV0ZXJtaW5lUHJldmlvdXNQYWdlIChjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSAtIDE7XG4gIH0sXG4gIGRldGVybWluZU5leHRQYWdlICh0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gdG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSArIDE7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsQ2xhaW1zIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBjbGFpbXMubGVuZ3RoO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwiY29uc3QgeyBnZXRDaGFubmVsRGF0YSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBkYXRhIGZvciBhIGNoYW5uZWxcblxuKi9cblxuY29uc3QgY2hhbm5lbERhdGEgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxEYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbERhdGEuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxucm91dGUgdG8gZ2V0IGEgc2hvcnQgY2hhbm5lbCBpZCBmcm9tIGxvbmcgY2hhbm5lbCBJZFxuXG4qL1xuXG5jb25zdCBjaGFubmVsU2hvcnRJZFJvdXRlID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihzaG9ydElkKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxTaG9ydElkUm91dGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDZXJ0aWZpY2F0ZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NlcnRpZmljYXRlJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAga2V5VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHVibGljS2V5OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENlcnRpZmljYXRlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDZXJ0aWZpY2F0ZS5iZWxvbmdzVG8oZGIuQ2hhbm5lbCwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobG9uZ0NoYW5uZWxJZCwgY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgJHtjaGFubmVsTmFtZX06JHtsb25nQ2hhbm5lbElkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge25hbWU6IGNoYW5uZWxOYW1lfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsKHMpIGZvdW5kIHdpdGggdGhhdCBjaGFubmVsIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBsb25nQ2hhbm5lbElkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7Y2hhbm5lbENsYWltSWR9JWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSgke2NoYW5uZWxOYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2hhbm5lbE5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUudmFsaWRhdGVMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYHZhbGlkYXRlTG9uZ0NoYW5uZWxJZCgke25hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgJiYgKGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ2xhaW1JZCAmJiBjaGFubmVsQ2xhaW1JZC5sZW5ndGggPCA0MCkgeyAgLy8gaWYgYSBzaG9ydCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoY2hhbm5lbE5hbWUpOyAgLy8gaWYgbm8gY2hhbm5lbCBpZCBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQ2VydGlmaWNhdGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBDaGFubmVsID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2hhbm5lbCcsXG4gICAge1xuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDaGFubmVsLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDaGFubmVsLmJlbG9uZ3NUbyhkYi5Vc2VyKTtcbiAgICBDaGFubmVsLmhhc09uZShkYi5DZXJ0aWZpY2F0ZSk7XG4gIH07XG5cbiAgcmV0dXJuIENoYW5uZWw7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcbmNvbnN0IHsgYXNzZXREZWZhdWx0czogeyB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlKSB7XG4gIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgcmV0dXJuICdqcGVnJztcbiAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgcmV0dXJuICdwbmcnO1xuICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICByZXR1cm4gJ2dpZic7XG4gICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgIHJldHVybiAnbXA0JztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmRlYnVnKCdzZXR0aW5nIHVua25vd24gZmlsZSB0eXBlIGFzIGZpbGUgZXh0ZW5zaW9uIGpwZWcnKTtcbiAgICAgIHJldHVybiAnanBlZyc7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRldGVybWluZVRodW1ibmFpbCAoc3RvcmVkVGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKSB7XG4gIGlmIChzdG9yZWRUaHVtYm5haWwgPT09ICcnKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRUaHVtYm5haWw7XG4gIH1cbiAgcmV0dXJuIHN0b3JlZFRodW1ibmFpbDtcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFpbURhdGEgKGNsYWltKSB7XG4gIC8vIGxvZ2dlci5kZWJ1ZygncHJlcGFyaW5nIGNsYWltIGRhdGEgYmFzZWQgb24gcmVzb2x2ZWQgZGF0YTonLCBjbGFpbSk7XG4gIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gIGNsYWltWydob3N0J10gPSBob3N0O1xuICByZXR1cm4gY2xhaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2xhaW0gPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDbGFpbScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVJZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2VVcmw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBtZXRhZGF0YVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNvbnRlbnRUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2xhaW0uYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENsYWltLmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIGZvciAke2NsYWltTmFtZX0jJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbShzKSBmb3VuZCB3aXRoIHRoYXQgY2xhaW0gbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgY2xhaW1JZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zIGZvciAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICAgIHJhdyAgOiB0cnVlLCAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiBvbmx5IGRhdGEsIG5vdCBhbiBhcnJheSBvZiBpbnN0YW5jZXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbENsYWltc0FycmF5ID0+IHtcbiAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ2NoYW5uZWxjbGFpbXNhcnJheSBsZW5ndGg6JywgY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgY2hhbm5lbENsYWltc0FycmF5LmZvckVhY2goY2xhaW0gPT4ge1xuICAgICAgICAgICAgICAgIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgICAgICAgICAgICAgICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhaW07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShjaGFubmVsQ2xhaW1zQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGZpbmRpbmcgY2xhaW0gaWQgZm9yIGNsYWltICR7Y2xhaW1OYW1lfSBmcm9tIGNoYW5uZWwgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lLCBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydpZCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYCR7cmVzdWx0Lmxlbmd0aH0gcmVjb3JkcyBmb3VuZCBmb3IgXCIke2NsYWltTmFtZX1cIiBpbiBjaGFubmVsIFwiJHtjaGFubmVsQ2xhaW1JZH1cImApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBzaG9ydElkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7c2hvcnRJZH0lYCxcbiAgICAgICAgICAgIH19LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSwgIC8vIG5vdGU6IG1heWJlIGhlaWdodCBhbmQgZWZmZWN0aXZlIGFtb3VudCBuZWVkIHRvIHN3aXRjaD9cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2xlbmd0aCBvZiByZXN1bHQnLCByZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uZGF0YVZhbHVlcy5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0udmFsaWRhdGVMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2xhaW1JZCgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgaWYgKGNsYWltSWQgJiYgKGNsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2xhaW1JZCAmJiBjbGFpbUlkLmxlbmd0aCA8IDQwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTsgIC8vIGlmIGEgc2hvcnQgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZShjbGFpbU5hbWUpOyAgLy8gaWYgbm8gY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgQ2xhaW0ucmVzb2x2ZUNsYWltID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLnJlc29sdmVDbGFpbTogJHtuYW1lfSAke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2xhaW1BcnJheSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjbGFpbUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgbW9yZSB0aGFuIG9uZSByZWNvcmQgbWF0Y2hlcyAke25hbWV9IyR7Y2xhaW1JZH0gaW4gZGIuQ2xhaW1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIENsYWltO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSIH0pID0+IHtcbiAgY29uc3QgRmlsZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0ZpbGUnLFxuICAgIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgICA6IElOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHQgIDogMCxcbiAgICAgIH0sXG4gICAgICBmaWxlTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlUGF0aDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlVHlwZToge1xuICAgICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdHJlbmRpbmdFbGlnaWJsZToge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIEZpbGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIEZpbGUuaGFzTWFueShkYi5SZXF1ZXN0KTtcbiAgICBGaWxlLmhhc09uZShkYi5DbGFpbSk7XG4gIH07XG5cbiAgRmlsZS5nZXRSZWNlbnRDbGFpbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7XG4gICAgICB3aGVyZTogeyBuc2Z3OiBmYWxzZSwgdHJlbmRpbmdFbGlnaWJsZTogdHJ1ZSB9LFxuICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgbGltaXQ6IDI1LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBGaWxlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIFRFWFQgfSkgPT4ge1xuICBjb25zdCBSZXF1ZXN0ID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnUmVxdWVzdCcsXG4gICAge1xuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpcEFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgUmVxdWVzdC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgUmVxdWVzdC5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSZXF1ZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgVXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1VzZXInLFxuICAgIHtcbiAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgVXNlci5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgVXNlci5oYXNPbmUoZGIuQ2hhbm5lbCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY29tcGFyZVBhc3N3b3JkID0gZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChuZXdQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKG5ld1Bhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGN1cnJlbnQgcGFzc3dvcmQgd2l0aCB0aGUgbmV3IGhhc2hcbiAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAudXBkYXRlKHtwYXNzd29yZDogaGFzaH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gcHJlLXNhdmUgaG9vayBtZXRob2QgdG8gaGFzaCB0aGUgdXNlcidzIHBhc3N3b3JkIGJlZm9yZSB0aGUgdXNlcidzIGluZm8gaXMgc2F2ZWQgdG8gdGhlIGRiLlxuICBVc2VyLmhvb2soJ2JlZm9yZUNyZWF0ZScsICh1c2VyLCBvcHRpb25zKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdVc2VyLmJlZm9yZUNyZWF0ZSBob29rLi4uJyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBwYXNzd29yZCBzdHJpbmcgd2l0aCB0aGUgaGFzaCBwYXNzd29yZCB2YWx1ZVxuICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBoYXNoO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFVzZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy91c2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmNyeXB0XCJcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHRoaXMgc2l0ZSBwdWJsaXNoZWQgdG8gYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcmV0dXJuIGRhdGEgZm9yIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1EYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gIGxldCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGlmIChjbGFpbUlkID09PSAnbm9uZScpIGNsYWltSWQgPSBudWxsO1xuICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKGNsYWltSW5mbyA9PiB7XG4gICAgICBpZiAoIWNsYWltSW5mbykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogY2xhaW1JbmZvfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbURhdGE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbURhdGEuanMiLCJjb25zdCB7IGdldENsYWltIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUdldCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKG5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzb2x2ZVJlc3VsdCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgIGlmICghcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHVyaSBmb3VuZCBpbiBDbGFpbSB0YWJsZScpO1xuICAgICAgfVxuICAgICAgbGV0IGZpbGVEYXRhID0gY3JlYXRlRmlsZURhdGEocmVzb2x2ZVJlc3VsdCk7XG4gICAgICAvLyBnZXQgdGhlIGNsYWltXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVEYXRhLCBnZXRSZXN1bHQgXSkgPT4ge1xuICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVEYXRhLCB7bmFtZSwgY2xhaW1JZH0sICdGaWxlJyksIGdldFJlc3VsdF0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlLCBjb21wbGV0ZWQgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltR2V0LmpzIiwiY29uc3QgeyBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgbG9uZyBjbGFpbSBpZFxuXG4qL1xuXG5jb25zdCBjbGFpbUxvbmdJZCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IGJvZHkuY2hhbm5lbE5hbWU7XG4gIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgY29uc3QgY2xhaW1OYW1lID0gYm9keS5jbGFpbU5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBib2R5LmNsYWltSWQ7XG4gIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DTEFJTSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0fSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxvbmdJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTG9uZ0lkLmpzIiwiY29uc3QgeyBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIHB1Ymxpc2ggfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGF1dGhlbnRpY2F0ZVVzZXIgfSA9IHJlcXVpcmUoJ2F1dGgvYXV0aGVudGljYXRpb24uanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHB1Ymxpc2ggYSBjbGFpbSB0aHJvdWdoIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1QdWJsaXNoID0gKHsgYm9keSwgZmlsZXMsIGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgdXNlciB9LCByZXMpID0+IHtcbiAgLy8gZGVmaW5lIHZhcmlhYmxlc1xuICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAvLyByZWNvcmQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlcXVlc3RcbiAgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICAvLyB2YWxpZGF0ZUFwaVB1Ymxpc2hSZXF1ZXN0KGJvZHksIGZpbGVzKTtcbiAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAoe2ZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGV9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzKGZpbGVzKSk7XG4gICAgKHtjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmR9ID0gYm9keSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICBQcm9taXNlXG4gICAgLmFsbChbXG4gICAgICBhdXRoZW50aWNhdGVVc2VyKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlciksXG4gICAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKSxcbiAgICAgIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyhmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpLFxuICAgICAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyh0aHVtYm5haWxGaWxlUGF0aCwgbmFtZSwgbGljZW5zZSwgbnNmdyksXG4gICAgXSlcbiAgICAudGhlbigoW3tjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9LCB2YWxpZGF0ZWRDbGFpbU5hbWUsIHB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbFB1Ymxpc2hQYXJhbXNdKSA9PiB7XG4gICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfbmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgdGh1bWJuYWlsXG4gICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICBwdWJsaXNoKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlVHlwZSk7XG4gICAgICB9XG4gICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgcmV0dXJuIHB1Ymxpc2gocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKTtcbiAgICB9KVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICBkYXRhICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgdXJsICAgIDogYCR7aG9zdH0vJHtyZXN1bHQuY2xhaW1faWR9LyR7bmFtZX1gLFxuICAgICAgICAgIGxicnlUeCA6IHJlc3VsdCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgLy8gcmVjb3JkIHRoZSBwdWJsaXNoIGVuZCB0aW1lIGFuZCBzZW5kIHRvIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1QdWJsaXNoO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1QdWJsaXNoLmpzIiwiY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhlbnRpY2F0ZVVzZXIgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlcikge1xuICAgIC8vIGNhc2U6IG5vIGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIChhbm9ueW1vdXMpLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXNlciB0b2tlbiBpcyBwcm92aWRlZFxuICAgIGlmICghY2hhbm5lbE5hbWUgJiYgIWNoYW5uZWxJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IG51bGwsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCB1c2VyIHRva2VuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsTmFtZSAhPT0gdXNlci5jaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIG5hbWUgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWxJZCAmJiBjaGFubmVsSWQgIT09IHVzZXIuY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBpZCBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogdXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHBhc3N3b3JkIGluc3RlYWQgb2YgdXNlciB0b2tlblxuICAgIGlmICghY2hhbm5lbFBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ25vIGNoYW5uZWwgcGFzc3dvcmQgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCk7XG4gIH0sXG4gIGF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgdXNlclBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGhvaXN0ZWQgdmFyaWFibGVzXG4gICAgICBsZXQgY2hhbm5lbERhdGE7XG4gICAgICAvLyBidWlsZCB0aGUgcGFyYW1zIGZvciBmaW5kaW5nIHRoZSBjaGFubmVsXG4gICAgICBsZXQgY2hhbm5lbEZpbmRQYXJhbXMgPSB7fTtcbiAgICAgIGlmIChjaGFubmVsTmFtZSkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgIGlmIChjaGFubmVsSWQpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbElkO1xuICAgICAgLy8gZmluZCB0aGUgY2hhbm5lbFxuICAgICAgZGIuQ2hhbm5lbFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IGNoYW5uZWxGaW5kUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gY2hhbm5lbCBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5uZWxEYXRhID0gY2hhbm5lbC5nZXQoKTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgZGF0YTonLCBjaGFubmVsRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRiLlVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyB1c2VyTmFtZTogY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDEpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHVzZXJQYXNzd29yZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoJy4uLnBhc3N3b3JkIHdhcyBhIG1hdGNoLi4uJyk7XG4gICAgICAgICAgcmVzb2x2ZShjaGFubmVsRGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJjb25zdCB7IHJlc29sdmVVcmkgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBydW4gYSByZXNvbHZlIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuXG4qL1xuXG5jb25zdCBjbGFpbVJlc29sdmUgPSAoeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgIC50aGVuKHJlc29sdmVkVXJpID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc29sdmVkVXJpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUmVzb2x2ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUmVzb2x2ZS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIHNob3J0IGNsYWltIGlkIGZyb20gbG9uZyBjbGFpbSBJZFxuXG4qL1xuXG5jb25zdCBjbGFpbVNob3J0SWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHNob3J0SWR9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltU2hvcnRJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1MaXN0IH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGxpc3Qgb2YgY2xhaW1zXG5cbiovXG5cbmNvbnN0IGNsYWltTGlzdCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oY2xhaW1zTGlzdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjbGFpbXNMaXN0KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltTGlzdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTGlzdC5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlZSBpZiBhc3NldCBpcyBhdmFpbGFibGUgbG9jYWxseVxuXG4qL1xuXG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBkYi5GaWxlXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY2xhaW1JZCxcbiAgICAgIH0sXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBmYWxzZX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsZUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2ZpbGVBdmFpbGFiaWxpdHkuanMiLCJjb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcclxuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHVwbG9hZERpcmVjdG9yeSB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XHJcbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSBtdWx0aXBhcnQoe3VwbG9hZERpcjogdXBsb2FkRGlyZWN0b3J5fSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGFydE1pZGRsZXdhcmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW11bHRpcGFydHlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIlxuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcbmNvbnN0IGhhbmRsZUVtYmVkUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZEVtYmVkUGFnZScpO1xuY29uc3QgcmVkaXJlY3QgPSByZXF1aXJlKCcuL3JlZGlyZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAuZ2V0KCcvJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbG9naW4nLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9hYm91dCcsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgcmVkaXJlY3QoJy9wb3B1bGFyJykpO1xuICBhcHAuZ2V0KCcvcG9wdWxhcicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL25ldycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgaGFuZGxlRW1iZWRSZXF1ZXN0KTsgIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0dJTiB9IGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcyc7XG5jb25zdCB7IHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGlzYWJsZWQgICAgICAgICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkLFxuICBkaXNhYmxlZE1lc3NhZ2UgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWRNZXNzYWdlLFxuICBwdWJsaXNoSW5DaGFubmVsICA6IGZhbHNlLFxuICBzZWxlY3RlZENoYW5uZWwgICA6IExPR0lOLFxuICBzaG93TWV0YWRhdGFJbnB1dHM6IGZhbHNlLFxuICBzdGF0dXMgICAgICAgICAgICA6IHtcbiAgICBzdGF0dXMgOiBudWxsLFxuICAgIG1lc3NhZ2U6IG51bGwsXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgZmlsZSAgICAgICAgIDogbnVsbCxcbiAgICB1cmwgICAgICAgICAgOiBudWxsLFxuICAgIGNoYW5uZWwgICAgICA6IG51bGwsXG4gICAgcHVibGlzaFN1Ym1pdDogbnVsbCxcbiAgfSxcbiAgZmlsZSAgICA6IG51bGwsXG4gIGNsYWltICAgOiAnJyxcbiAgbWV0YWRhdGE6IHtcbiAgICB0aXRsZSAgICAgIDogJycsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGxpY2Vuc2UgICAgOiAnJyxcbiAgICBuc2Z3ICAgICAgIDogZmFsc2UsXG4gIH0sXG4gIHRodW1ibmFpbDogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9TRUxFQ1RFRDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpbml0aWFsU3RhdGUsIHsgIC8vIG5vdGU6IGNsZWFycyB0byBpbml0aWFsIHN0YXRlXG4gICAgICAgIGZpbGU6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgYWN0aW9ucy5NRVRBREFUQV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbWV0YWRhdGE6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLm1ldGFkYXRhLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0xBSU1fVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNsYWltOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw6IGFjdGlvbi5jaGFubmVsLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkVSUk9SX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBlcnJvcjogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZXJyb3IsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRUxFQ1RFRF9DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZWxlY3RlZENoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFM6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2hvd01ldGFkYXRhSW5wdXRzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5USFVNQk5BSUxfTkVXOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHRodW1ibmFpbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvcHVibGlzaC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsb2dnZWRJbkNoYW5uZWw6IHtcbiAgICBuYW1lICAgOiBudWxsLFxuICAgIHNob3J0SWQ6IG51bGwsXG4gICAgbG9uZ0lkIDogbnVsbCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9nZ2VkSW5DaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIEVSUk9SIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICByZXF1ZXN0OiB7XG4gICAgZXJyb3I6IG51bGwsXG4gICAgdHlwZSA6IG51bGwsXG4gICAgaWQgICA6IG51bGwsXG4gIH0sXG4gIHJlcXVlc3RMaXN0IDoge30sXG4gIGNoYW5uZWxMaXN0IDoge30sXG4gIGFzc2V0TGlzdCAgIDoge30sXG4gIGRpc3BsYXlBc3NldDoge1xuICAgIGVycm9yIDogbnVsbCxcbiAgICBzdGF0dXM6IExPQ0FMX0NIRUNLLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8vIGhhbmRsZSByZXF1ZXN0XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIHR5cGU6IGFjdGlvbi5kYXRhLnJlcXVlc3RUeXBlLFxuICAgICAgICAgIGlkICA6IGFjdGlvbi5kYXRhLnJlcXVlc3RJZCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBzdG9yZSByZXF1ZXN0c1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0xJU1RfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3RMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIGtleSAgOiBhY3Rpb24uZGF0YS5rZXksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBhc3NldCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkFTU0VUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBhc3NldExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmFzc2V0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yICAgIDogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBuYW1lICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICA6IGFjdGlvbi5kYXRhLmNsYWltSWQsXG4gICAgICAgICAgICBzaG9ydElkICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbURhdGE6IGFjdGlvbi5kYXRhLmNsYWltRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGNoYW5uZWwgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBuYW1lICAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgbG9uZ0lkICAgIDogYWN0aW9uLmRhdGEubG9uZ0lkLFxuICAgICAgICAgICAgc2hvcnRJZCAgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXSwge1xuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBkaXNwbGF5IGFuIGFzc2V0XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBlcnJvciA6IGFjdGlvbi5kYXRhLFxuICAgICAgICAgIHN0YXR1czogRVJST1IsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJjb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qge1xuICBhbmFseXRpY3M6IHtcbiAgICBnb29nbGVJZDogZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIH0sXG4gIGFzc2V0RGVmYXVsdHM6IHtcbiAgICB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwsXG4gICAgZGVzY3JpcHRpb246IGRlZmF1bHREZXNjcmlwdGlvbixcbiAgfSxcbiAgZGV0YWlsczoge1xuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gICAgdHdpdHRlcixcbiAgfSxcbn0gPSBzaXRlQ29uZmlnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRlc2NyaXB0aW9uLFxuICBnb29nbGVBbmFseXRpY3NJZCxcbiAgaG9zdCxcbiAgdGl0bGUsXG4gIHR3aXR0ZXIsXG4gIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgZGVmYXVsdFRodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvc2l0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IFB1Ymxpc2hUb29sIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRvb2wnO1xuXG5jbGFzcyBIb21lUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uJ30+XG4gICAgICAgIDxTRU8gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbid9PlxuICAgICAgICAgIDxQdWJsaXNoVG9vbCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWVQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0hvbWVQYWdlL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBjcmVhdGVQYWdlVGl0bGUgfSBmcm9tICd1dGlscy9wYWdlVGl0bGUnO1xuaW1wb3J0IHsgY3JlYXRlTWV0YVRhZ3MgfSBmcm9tICd1dGlscy9tZXRhVGFncyc7XG5pbXBvcnQgeyBjcmVhdGVDYW5vbmljYWxMaW5rIH0gZnJvbSAndXRpbHMvY2Fub25pY2FsTGluayc7XG5cbmNsYXNzIFNFTyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgLy8gcHJvcHMgZnJvbSBzdGF0ZVxuICAgIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIHByb3BzIGZyb20gcGFyZW50XG4gICAgY29uc3QgeyBhc3NldCwgY2hhbm5lbCwgcGFnZVVyaSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgeyBwYWdlVGl0bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gY3JlYXRlIHBhZ2UgdGl0bGUsIHRhZ3MsIGFuZCBjYW5vbmljYWwgbGlua1xuICAgIHBhZ2VUaXRsZSA9IGNyZWF0ZVBhZ2VUaXRsZShzaXRlVGl0bGUsIHBhZ2VUaXRsZSk7XG4gICAgY29uc3QgbWV0YVRhZ3MgPSBjcmVhdGVNZXRhVGFncyhzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgY2hhbm5lbCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICBjb25zdCBjYW5vbmljYWxMaW5rID0gY3JlYXRlQ2Fub25pY2FsTGluayhhc3NldCwgY2hhbm5lbCwgcGFnZVVyaSwgc2l0ZUhvc3QpO1xuICAgIC8vIHJlbmRlciByZXN1bHRzXG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXRcbiAgICAgICAgdGl0bGU9e3BhZ2VUaXRsZX1cbiAgICAgICAgbWV0YT17bWV0YVRhZ3N9XG4gICAgICAgIGxpbms9e1t7cmVsOiAnY2Fub25pY2FsJywgaHJlZjogY2Fub25pY2FsTGlua31dfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuXG5TRU8ucHJvcFR5cGVzID0ge1xuICBwYWdlVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBhZ2VVcmkgIDogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2hhbm5lbCAgOiBQcm9wVHlwZXMub2JqZWN0LFxuICBhc3NldCAgICA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTRU87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9TRU8vdmlldy5qc3giLCJleHBvcnQgY29uc3QgY3JlYXRlUGFnZVRpdGxlID0gKHNpdGVUaXRsZSwgcGFnZVRpdGxlKSA9PiB7XG4gIGlmICghcGFnZVRpdGxlKSB7XG4gICAgcmV0dXJuIGAke3NpdGVUaXRsZX1gO1xuICB9XG4gIHJldHVybiBgJHtzaXRlVGl0bGV9IC0gJHtwYWdlVGl0bGV9YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwiY29uc3QgZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZSA9ICh0aHVtYm5haWwpID0+IHtcbiAgaWYgKHRodW1ibmFpbCkge1xuICAgIGNvbnN0IGZpbGVFeHQgPSB0aHVtYm5haWwuc3Vic3RyaW5nKHRodW1ibmFpbC5sYXN0SW5kZXhPZignLicpKTtcbiAgICBzd2l0Y2ggKGZpbGVFeHQpIHtcbiAgICAgIGNhc2UgJ2pwZWcnOlxuICAgICAgY2FzZSAnanBnJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICAgIGNhc2UgJ3BuZyc6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvcG5nJztcbiAgICAgIGNhc2UgJ2dpZic6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvZ2lmJztcbiAgICAgIGNhc2UgJ21wNCc6XG4gICAgICAgIHJldHVybiAndmlkZW8vbXA0JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvanBlZyc7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn07XG5cbmNvbnN0IGNyZWF0ZUJhc2ljTWV0YVRhZ3MgPSAoc2l0ZUhvc3QsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlcikgPT4ge1xuICByZXR1cm4gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaXRlSG9zdH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHNpdGVEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5J30sXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsTWV0YVRhZ3MgPSAoc2l0ZVRpdGxlLCBzaXRlSG9zdCwgc2l0ZVR3aXR0ZXIsIGNoYW5uZWwpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBsb25nSWQgfSA9IGNoYW5uZWw7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBgJHtuYW1lfSBvbiAke3NpdGVUaXRsZX1gfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBgJHtzaXRlSG9zdH0vJHtuYW1lfToke2xvbmdJZH1gfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogYCR7bmFtZX0sIGEgY2hhbm5lbCBvbiAke3NpdGVUaXRsZX1gfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUFzc2V0TWV0YVRhZ3MgPSAoc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGEgfSA9IGFzc2V0O1xuICBjb25zdCB7IGNvbnRlbnRUeXBlIH0gPSBjbGFpbURhdGE7XG4gIGNvbnN0IGVtYmVkVXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc2hvd1VybCA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfWA7XG4gIGNvbnN0IHNvdXJjZSA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfS4ke2NsYWltRGF0YS5maWxlRXh0fWA7XG4gIGNvbnN0IG9nVGl0bGUgPSBjbGFpbURhdGEudGl0bGUgfHwgY2xhaW1EYXRhLm5hbWU7XG4gIGNvbnN0IG9nRGVzY3JpcHRpb24gPSBjbGFpbURhdGEuZGVzY3JpcHRpb24gfHwgZGVmYXVsdERlc2NyaXB0aW9uO1xuICBjb25zdCBvZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZShjbGFpbURhdGEudGh1bWJuYWlsKTtcbiAgY29uc3Qgb2dUaHVtYm5haWwgPSBjbGFpbURhdGEudGh1bWJuYWlsIHx8IGRlZmF1bHRUaHVtYm5haWw7XG4gIGNvbnN0IG1ldGFUYWdzID0gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogb2dUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogc2hvd1VybH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IG9nRGVzY3JpcHRpb259LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOndpZHRoJywgY29udGVudDogNjAwfSxcbiAgICB7cHJvcGVydHk6ICdvZzppbWFnZTpoZWlnaHQnLCBjb250ZW50OiAzMTV9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgXTtcbiAgaWYgKGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JyB8fCBjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL3dlYm0nKSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbycsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW86c2VjdXJlX3VybCcsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW86dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IG9nVGh1bWJuYWlsfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZTp0eXBlJywgY29udGVudDogb2dUaHVtYm5haWxDb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICd2aWRlbyd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdwbGF5ZXInfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcicsIGNvbnRlbnQ6IGVtYmVkVXJsfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjp3aWR0aCcsIGNvbnRlbnQ6IDYwMH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjp0ZXh0OnBsYXllcl93aWR0aCcsIGNvbnRlbnQ6IDYwMH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6aGVpZ2h0JywgY29udGVudDogMzM3fSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpzdHJlYW0nLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbTpjb250ZW50X3R5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICB9IGVsc2Uge1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICdhcnRpY2xlJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnlfbGFyZ2VfaW1hZ2UnfSk7XG4gIH1cbiAgcmV0dXJuIG1ldGFUYWdzO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1ldGFUYWdzID0gKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0TWV0YVRhZ3Moc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICB9O1xuICBpZiAoY2hhbm5lbCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFubmVsTWV0YVRhZ3Moc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGNoYW5uZWwpO1xuICB9O1xuICByZXR1cm4gY3JlYXRlQmFzaWNNZXRhVGFncyhzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvbWV0YVRhZ3MuanMiLCJjb25zdCBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsgPSAocGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke3BhZ2V9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayA9IChhc3NldCwgc2l0ZUhvc3QpID0+IHtcbiAgbGV0IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkO1xuICBpZiAoYXNzZXQuY2xhaW1EYXRhKSB7XG4gICAgKHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQgfSA9IGFzc2V0LmNsYWltRGF0YSk7XG4gIH07XG4gIGlmIChjaGFubmVsTmFtZSkge1xuICAgIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfS8ke25hbWV9YDtcbiAgfTtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NsYWltSWR9LyR7bmFtZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsgPSAoY2hhbm5lbCwgc2l0ZUhvc3QpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBsb25nSWQgfSA9IGNoYW5uZWw7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtuYW1lfToke2xvbmdJZH1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbm9uaWNhbExpbmsgPSAoYXNzZXQsIGNoYW5uZWwsIHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIGlmIChhc3NldCkge1xuICAgIHJldHVybiBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsoYXNzZXQsIHNpdGVIb3N0KTtcbiAgfVxuICBpZiAoY2hhbm5lbCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayhjaGFubmVsLCBzaXRlSG9zdCk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayhwYWdlLCBzaXRlSG9zdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2TGluaywgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IExvZ28gZnJvbSAnY29tcG9uZW50cy9Mb2dvJztcbmltcG9ydCBOYXZCYXJDaGFubmVsRHJvcGRvd24gZnJvbSAnY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jb25zdCBWSUVXID0gJ1ZJRVcnO1xuY29uc3QgTE9HT1VUID0gJ0xPR09VVCc7XG5cbmNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyID0gdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nb3V0VXNlciA9IHRoaXMubG9nb3V0VXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlcigpO1xuICB9XG4gIGNoZWNrRm9yTG9nZ2VkSW5Vc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL3VzZXInLCBwYXJhbXMpXG4gICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihkYXRhLmNoYW5uZWxOYW1lLCBkYXRhLnNob3J0Q2hhbm5lbElkLCBkYXRhLmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL3VzZXIgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBsb2dvdXRVc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL2xvZ291dCcsIHBhcmFtcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dvdXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL2xvZ291dCBlcnJvcicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIExPR09VVDpcbiAgICAgICAgdGhpcy5sb2dvdXRVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWSUVXOlxuICAgICAgICAvLyByZWRpcmVjdCB0byBjaGFubmVsIHBhZ2VcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC8ke3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9OiR7dGhpcy5wcm9wcy5jaGFubmVsTG9uZ0lkfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc2l0ZURlc2NyaXB0aW9uIH0gPSAgdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgbmF2LWJhcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1zaG9ydCBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcic+XG4gICAgICAgICAgPExvZ28gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tY2VudGVyJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbmF2LWJhci10YWdsaW5lJz57c2l0ZURlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tcmlnaHQnPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvJyBleGFjdD5QdWJsaXNoPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyAgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2Fib3V0Jz5BYm91dDwvTmF2TGluaz5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGFubmVsTmFtZSA/IChcbiAgICAgICAgICAgICAgPE5hdkJhckNoYW5uZWxEcm9wZG93blxuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdGlvbj17dGhpcy5oYW5kbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGlvbj17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBWSUVXPXtWSUVXfVxuICAgICAgICAgICAgICAgIExPR09VVD17TE9HT1VUfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPE5hdkxpbmsgaWQ9J25hdi1iYXItbG9naW4tbGluaycgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvbG9naW4nPkNoYW5uZWw8L05hdkxpbms+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihOYXZCYXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZnVuY3Rpb24gTG9nbyAoKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2ZXJzaW9uPScxLjEnIGlkPSdMYXllcl8xJyB4PScwcHgnIHk9JzBweCcgaGVpZ2h0PScyNHB4JyB2aWV3Qm94PScwIDAgODAgMzEnIGVuYWJsZUJhY2tncm91bmQ9J25ldyAwIDAgODAgMzEnIGNsYXNzTmFtZT0nbmF2LWJhci1sb2dvJz5cbiAgICAgIDxMaW5rIHRvPScvJz5cbiAgICAgICAgPHRpdGxlPkxvZ288L3RpdGxlPlxuICAgICAgICA8ZGVzYz5TcGVlLmNoIGxvZ288L2Rlc2M+XG4gICAgICAgIDxnIGlkPSdBYm91dCc+XG4gICAgICAgICAgPGcgaWQ9J1B1Ymxpc2gtRm9ybS1WMi1feDI4X2ZpbGxlZF94MjlfJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNDIuMDAwMDAwLCAtMjMuMDAwMDAwKSc+XG4gICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQyLjAwMDAwMCwgMjIuMDAwMDAwKSc+XG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT0nbWF0cml4KDEgMCAwIDEgMCAyMCknIGZvbnRTaXplPScyNScgZm9udEZhbWlseT0nUm9ib3RvJz5TcGVlJmx0O2g8L3RleHQ+XG4gICAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDMwLjAwMDAwMCknPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzA5RjkxMScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTAuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5JyBmaWxsPSdub25lJyBzdHJva2U9JyMwMjlENzQnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00xNi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjRTM1QkQ4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMzIuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTMnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzQxNTZDNScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTQ4LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS00JyBmaWxsPSdub25lJyBzdHJva2U9JyM2MzU2ODgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J002NC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9MaW5rPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gTmF2QmFyQ2hhbm5lbERyb3Bkb3duICh7IGNoYW5uZWxOYW1lLCBoYW5kbGVTZWxlY3Rpb24sIGRlZmF1bHRTZWxlY3Rpb24sIFZJRVcsIExPR09VVCB9KSB7XG4gIHJldHVybiAoXG4gICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdyBsaW5rLS1uYXYnIG9uQ2hhbmdlPXtoYW5kbGVTZWxlY3Rpb259IHZhbHVlPXtkZWZhdWx0U2VsZWN0aW9ufT5cbiAgICAgIDxvcHRpb24gaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPntjaGFubmVsTmFtZX08L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e1ZJRVd9PlZpZXc8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e0xPR09VVH0+TG9nb3V0PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZCYXJDaGFubmVsRHJvcGRvd247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gMTE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGlzYWJsZWQ6IHB1Ymxpc2guZGlzYWJsZWQsXG4gICAgZmlsZSAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICBzdGF0dXMgIDogcHVibGlzaC5zdGF0dXMuc3RhdHVzLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2NvbnRhaW5lcnMvRHJvcHpvbmUnO1xuaW1wb3J0IFB1Ymxpc2hEZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMnO1xuaW1wb3J0IFB1Ymxpc2hTdGF0dXMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoU3RhdHVzJztcbmltcG9ydCBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZSc7XG5cbmNsYXNzIFB1Ymxpc2hUb29sIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgY29uc29sZS5sb2coJ3B1Ymxpc2ggaXMgZGlzYWJsZWQnKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygncHVibGlzaCBpcyBub3QgZGlzYWJsZWQnKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQdWJsaXNoU3RhdHVzIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gPFB1Ymxpc2hEZXRhaWxzIC8+O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gPERyb3B6b25lIC8+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRvb2w7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB2YWxpZGF0ZUZpbGUgfSBmcm9tICd1dGlscy9maWxlJztcbmltcG9ydCBQdWJsaXNoUHJldmlldyBmcm9tICdjb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3JztcblxuY2xhc3MgRHJvcHpvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRyYWdPdmVyICA6IGZhbHNlLFxuICAgICAgbW91c2VPdmVyIDogZmFsc2UsXG4gICAgICBkaW1QcmV2aWV3OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlRHJvcCA9IHRoaXMuaGFuZGxlRHJvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ092ZXIgPSB0aGlzLmhhbmRsZURyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnRW5kID0gdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnRW50ZXIgPSB0aGlzLmhhbmRsZURyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0xlYXZlID0gdGhpcy5oYW5kbGVEcmFnTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgPSB0aGlzLmhhbmRsZU1vdXNlRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgPSB0aGlzLmhhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRmlsZUlucHV0ID0gdGhpcy5oYW5kbGVGaWxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNob29zZUZpbGUgPSB0aGlzLmNob29zZUZpbGUuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVEcm9wIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IGZhbHNlfSk7XG4gICAgLy8gaWYgZHJvcHBlZCBpdGVtcyBhcmVuJ3QgZmlsZXMsIHJlamVjdCB0aGVtXG4gICAgY29uc3QgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgaWYgKGR0Lml0ZW1zKSB7XG4gICAgICBpZiAoZHQuaXRlbXNbMF0ua2luZCA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGNvbnN0IGRyb3BwZWRGaWxlID0gZHQuaXRlbXNbMF0uZ2V0QXNGaWxlKCk7XG4gICAgICAgIHRoaXMuY2hvb3NlRmlsZShkcm9wcGVkRmlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGhhbmRsZURyYWdPdmVyIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaGFuZGxlRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICB2YXIgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgaWYgKGR0Lml0ZW1zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGR0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGR0Lml0ZW1zLnJlbW92ZShpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmNsZWFyRGF0YSgpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnRW50ZXIgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiB0cnVlLCBkaW1QcmV2aWV3OiB0cnVlfSk7XG4gIH1cbiAgaGFuZGxlRHJhZ0xlYXZlICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogZmFsc2UsIGRpbVByZXZpZXc6IGZhbHNlfSk7XG4gIH1cbiAgaGFuZGxlTW91c2VFbnRlciAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlLCBkaW1QcmV2aWV3OiB0cnVlfSk7XG4gIH1cbiAgaGFuZGxlTW91c2VMZWF2ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiBmYWxzZSwgZGltUHJldmlldzogZmFsc2V9KTtcbiAgfVxuICBoYW5kbGVDbGljayAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlX2lucHV0JykuY2xpY2soKTtcbiAgfVxuICBoYW5kbGVGaWxlSW5wdXQgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmaWxlTGlzdCA9IGV2ZW50LnRhcmdldC5maWxlcztcbiAgICB0aGlzLmNob29zZUZpbGUoZmlsZUxpc3RbMF0pO1xuICB9XG4gIGNob29zZUZpbGUgKGZpbGUpIHtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsaWRhdGVGaWxlKGZpbGUpOyAvLyB2YWxpZGF0ZSB0aGUgZmlsZSdzIG5hbWUsIHR5cGUsIGFuZCBzaXplXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZXRGaWxlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICAvLyBzdGFnZSBpdCBzbyBpdCB3aWxsIGJlIHJlYWR5IHdoZW4gdGhlIHB1Ymxpc2ggYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0RmlsZShmaWxlKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbic+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J2lucHV0LWZpbGUnIHR5cGU9J2ZpbGUnIGlkPSdmaWxlX2lucHV0JyBuYW1lPSdmaWxlX2lucHV0JyBhY2NlcHQ9J3ZpZGVvLyosaW1hZ2UvKicgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsZUlucHV0fSBlbmNUeXBlPSdtdWx0aXBhcnQvZm9ybS1kYXRhJyAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxkaXYgaWQ9J3ByZXZpZXctZHJvcHpvbmUnIGNsYXNzTmFtZT17J3JvdyByb3ctLXBhZGRlZCByb3ctLXRhbGwgZHJvcHpvbmUnICsgKHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAnIGRyb3B6b25lLS1kcmFnLW92ZXInIDogJycpfSBvbkRyb3A9e3RoaXMuaGFuZGxlRHJvcH0gb25EcmFnT3Zlcj17dGhpcy5oYW5kbGVEcmFnT3Zlcn0gb25EcmFnRW5kPXt0aGlzLmhhbmRsZURyYWdFbmR9IG9uRHJhZ0VudGVyPXt0aGlzLmhhbmRsZURyYWdFbnRlcn0gb25EcmFnTGVhdmU9e3RoaXMuaGFuZGxlRHJhZ0xlYXZlfSBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn0gb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vdXNlTGVhdmV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbGUgPyAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8UHVibGlzaFByZXZpZXdcbiAgICAgICAgICAgICAgICBkaW1QcmV2aWV3PXt0aGlzLnN0YXRlLmRpbVByZXZpZXd9XG4gICAgICAgICAgICAgICAgZmlsZT17dGhpcy5wcm9wcy5maWxlfVxuICAgICAgICAgICAgICAgIHRodW1ibmFpbD17dGhpcy5wcm9wcy50aHVtYm5haWx9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLXRleHQtaG9sZGVyJyBjbGFzc05hbWU9eydmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJ30+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRyYWdPdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtZHJhZ292ZXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPkRyb3AgaXQuPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5tb3VzZU92ZXIgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1pbnN0cnVjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS1wbGFjZWhvbGRlciBpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnIGlkPSdpbnB1dC1lcnJvci1maWxlLXNlbGVjdGlvbic+e3RoaXMucHJvcHMuZmlsZUVycm9yfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+RHJhZyAmIGRyb3AgaW1hZ2Ugb3IgdmlkZW8gaGVyZSB0byBwdWJsaXNoPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPk9SPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUtLXVuZGVybGluZWQnPkNIT09TRSBGSUxFPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS10ZXh0LWhvbGRlcicgY2xhc3NOYW1lPXsnZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcid9PlxuICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtZHJhZ292ZXInPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz5Ecm9wIGl0LjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1pbnN0cnVjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtcGxhY2Vob2xkZXIgaW5mby1tZXNzYWdlLS1mYWlsdXJlJyBpZD0naW5wdXQtZXJyb3ItZmlsZS1zZWxlY3Rpb24nPnt0aGlzLnByb3BzLmZpbGVFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgICA8cD5EcmFnICYgZHJvcCBpbWFnZSBvciB2aWRlbyBoZXJlIHRvIHB1Ymxpc2g8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPk9SPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlLS11bmRlcmxpbmVkJz5DSE9PU0UgRklMRTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcHpvbmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS92aWV3LmpzeCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB2YWxpZGF0ZUZpbGUgKGZpbGUpIHtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwcm92aWRlZCcpO1xuICAgIH1cbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSBzaXplIGFuZCB0eXBlXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBHSUZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZmlsZS50eXBlICsgJyBpcyBub3QgYSBzdXBwb3J0ZWQgZmlsZSB0eXBlLiBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9maWxlLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIFB1Ymxpc2hQcmV2aWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbWdTb3VyY2UgICAgICAgOiAnJyxcbiAgICAgIGRlZmF1bHRUaHVtYm5haWw6ICcvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgfTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2UodGhpcy5wcm9wcy5maWxlKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIGlmIChuZXdQcm9wcy5maWxlICE9PSB0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlKG5ld1Byb3BzLmZpbGUpO1xuICAgIH1cbiAgICBpZiAobmV3UHJvcHMudGh1bWJuYWlsICE9PSB0aGlzLnByb3BzLnRodW1ibmFpbCkge1xuICAgICAgaWYgKG5ld1Byb3BzLnRodW1ibmFpbCkge1xuICAgICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKG5ld1Byb3BzLnRodW1ibmFpbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHRoaXMuc3RhdGUuZGVmYXVsdFRodW1ibmFpbH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSAoZmlsZSkge1xuICAgIGNvbnN0IHByZXZpZXdSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHByZXZpZXdSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICBwcmV2aWV3UmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogcHJldmlld1JlYWRlci5yZXN1bHR9KTtcbiAgICB9O1xuICB9XG4gIHNldFByZXZpZXdJbWFnZVNvdXJjZSAoZmlsZSkge1xuICAgIGlmIChmaWxlLnR5cGUgIT09ICd2aWRlby9tcDQnKSB7XG4gICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKGZpbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy50aHVtYm5haWwpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSh0aGlzLnByb3BzLnRodW1ibmFpbCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHRoaXMuc3RhdGUuZGVmYXVsdFRodW1ibmFpbH0pO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aW1nXG4gICAgICAgIGlkPSdkcm9wem9uZS1wcmV2aWV3J1xuICAgICAgICBzcmM9e3RoaXMuc3RhdGUuaW1nU291cmNlfVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuZGltUHJldmlldyA/ICdkaW0nIDogJyd9XG4gICAgICAgIGFsdD0ncHVibGlzaCBwcmV2aWV3J1xuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuXG5QdWJsaXNoUHJldmlldy5wcm9wVHlwZXMgPSB7XG4gIGRpbVByZXZpZXc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZpbGUgICAgICA6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgdGh1bWJuYWlsIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hQcmV2aWV3O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NsZWFyRmlsZSwgc3RhcnRQdWJsaXNofSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZTogcHVibGlzaC5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBjbGVhckZpbGUsXG4gIHN0YXJ0UHVibGlzaCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2NvbnRhaW5lcnMvRHJvcHpvbmUnO1xuaW1wb3J0IFB1Ymxpc2hUaXRsZUlucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hVcmxJbnB1dCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dCc7XG5pbXBvcnQgUHVibGlzaFRodW1ibmFpbElucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0JztcbmltcG9ydCBQdWJsaXNoTWV0YWRhdGFJbnB1dHMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMnO1xuaW1wb3J0IENoYW5uZWxTZWxlY3QgZnJvbSAnY29udGFpbmVycy9DaGFubmVsU2VsZWN0JztcblxuY2xhc3MgUHVibGlzaERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLm9uUHVibGlzaFN1Ym1pdCA9IHRoaXMub25QdWJsaXNoU3VibWl0LmJpbmQodGhpcyk7XG4gIH1cbiAgb25QdWJsaXNoU3VibWl0ICgpIHtcbiAgICB0aGlzLnByb3BzLnN0YXJ0UHVibGlzaCh0aGlzLnByb3BzLmhpc3RvcnkpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby1ib3R0b20nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgIDxQdWJsaXNoVGl0bGVJbnB1dCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey8qIGxlZnQgY29sdW1uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCcgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPERyb3B6b25lIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogcmlnaHQgY29sdW1uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgPGRpdiBpZD0ncHVibGlzaC1hY3RpdmUtYXJlYScgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8UHVibGlzaFVybElucHV0IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxTZWxlY3QgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyAodGhpcy5wcm9wcy5maWxlLnR5cGUgPT09ICd2aWRlby9tcDQnKSAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlICc+XG4gICAgICAgICAgICAgICAgPFB1Ymxpc2hUaHVtYm5haWxJbnB1dCAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0tbm8tYm90dG9tIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxQdWJsaXNoTWV0YWRhdGFJbnB1dHMgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8YnV0dG9uIGlkPSdwdWJsaXNoLXN1Ym1pdCcgY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS1sYXJnZScgb25DbGljaz17dGhpcy5vblB1Ymxpc2hTdWJtaXR9PlB1Ymxpc2g8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLWJvdHRvbSBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLWNhbmNlbCcgb25DbGljaz17dGhpcy5wcm9wcy5jbGVhckZpbGV9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPkJ5IGNsaWNraW5nICdQdWJsaXNoJywgeW91IGFmZmlybSB0aGF0IHlvdSBoYXZlIHRoZSByaWdodHMgdG8gcHVibGlzaCB0aGlzIGNvbnRlbnQgdG8gdGhlIExCUlkgbmV0d29yaywgYW5kIHRoYXQgeW91IHVuZGVyc3RhbmQgdGhlIHByb3BlcnRpZXMgb2YgcHVibGlzaGluZyBpdCB0byBhIGRlY2VudHJhbGl6ZWQsIHVzZXItY29udHJvbGxlZCBuZXR3b3JrLiA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vbGVhcm4nPlJlYWQgbW9yZS48L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihQdWJsaXNoRGV0YWlscyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGV0YWlscy92aWV3LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHt1cGRhdGVNZXRhZGF0YX0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHRpdGxlOiBwdWJsaXNoLm1ldGFkYXRhLnRpdGxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uTWV0YWRhdGFDaGFuZ2U6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTWV0YWRhdGEobmFtZSwgdmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFB1Ymxpc2hUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGUpIHtcbiAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdwdWJsaXNoLXRpdGxlJyBjbGFzc05hbWU9J2lucHV0LXRleHQgdGV4dC0tbGFyZ2UgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgbmFtZT0ndGl0bGUnIHBsYWNlaG9sZGVyPSdHaXZlIHlvdXIgcG9zdCBhIHRpdGxlLi4uJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gdmFsdWU9e3RoaXMucHJvcHMudGl0bGV9IC8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVGl0bGVJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXcuanN4IiwiaW1wb3J0IHt1cGRhdGVDbGFpbSwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWUgICA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBmaWxlTmFtZSAgICAgICAgICAgICAgOiBwdWJsaXNoLmZpbGUubmFtZSxcbiAgICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBwdWJsaXNoLnB1Ymxpc2hJbkNoYW5uZWwsXG4gICAgc2VsZWN0ZWRDaGFubmVsICAgICAgIDogcHVibGlzaC5zZWxlY3RlZENoYW5uZWwsXG4gICAgY2xhaW0gICAgICAgICAgICAgICAgIDogcHVibGlzaC5jbGFpbSxcbiAgICB1cmxFcnJvciAgICAgICAgICAgICAgOiBwdWJsaXNoLmVycm9yLnVybCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNsYWltQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUNsYWltKHZhbHVlKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcigncHVibGlzaFN1Ym1pdCcsIG51bGwpKTtcbiAgICB9LFxuICAgIG9uVXJsRXJyb3I6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ3VybCcsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuaW1wb3J0IFVybE1pZGRsZSBmcm9tICdjb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5JztcblxuY2xhc3MgUHVibGlzaFVybElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgY2xhaW0sIGZpbGVOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY2xhaW0pIHtcbiAgICAgIHRoaXMuc2V0Q2xhaW1OYW1lKGZpbGVOYW1lKTtcbiAgICB9XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAoeyBjbGFpbSwgZmlsZU5hbWUgfSkge1xuICAgIC8vIGlmIGEgbmV3IGZpbGUgd2FzIGNob3NlbiwgdXBkYXRlIHRoZSBjbGFpbSBuYW1lXG4gICAgaWYgKGZpbGVOYW1lICE9PSB0aGlzLnByb3BzLmZpbGVOYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRDbGFpbU5hbWUoZmlsZU5hbWUpO1xuICAgIH1cbiAgICAvLyBpZiB0aGUgY2xhaW0gaGFzIHVwZGF0ZWQsIGNoZWNrIGl0cyBhdmFpbGFiaWxpdHlcbiAgICBpZiAoY2xhaW0gIT09IHRoaXMucHJvcHMuY2xhaW0pIHtcbiAgICAgIHRoaXMudmFsaWRhdGVDbGFpbShjbGFpbSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUlucHV0KHZhbHVlKTtcbiAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgdGhpcy5wcm9wcy5vbkNsYWltQ2hhbmdlKHZhbHVlKTtcbiAgfVxuICBjbGVhbnNlSW5wdXQgKGlucHV0KSB7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMrL2csICctJyk7IC8vIHJlcGxhY2Ugc3BhY2VzIHdpdGggZGFzaGVzXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOS1dL2csICcnKTsgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgb3IgJy0nXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIHNldENsYWltTmFtZSAoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZVdpdGhvdXRFbmRpbmcgPSBmaWxlTmFtZS5zdWJzdHJpbmcoMCwgZmlsZU5hbWUubGFzdEluZGV4T2YoJy4nKSk7XG4gICAgY29uc3QgY2xlYW5DbGFpbU5hbWUgPSB0aGlzLmNsZWFuc2VJbnB1dChmaWxlTmFtZVdpdGhvdXRFbmRpbmcpO1xuICAgIHRoaXMucHJvcHMub25DbGFpbUNoYW5nZShjbGVhbkNsYWltTmFtZSk7XG4gIH1cbiAgdmFsaWRhdGVDbGFpbSAoY2xhaW0pIHtcbiAgICBpZiAoIWNsYWltKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5vblVybEVycm9yKCdFbnRlciBhIHVybCBhYm92ZScpO1xuICAgIH1cbiAgICByZXF1ZXN0KGAvYXBpL2NsYWltL2F2YWlsYWJpbGl0eS8ke2NsYWltfWApXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25VcmxFcnJvcihudWxsKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25VcmxFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjbGFpbSwgbG9nZ2VkSW5DaGFubmVsTmFtZSwgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZCwgcHVibGlzaEluQ2hhbm5lbCwgc2VsZWN0ZWRDaGFubmVsLCB1cmxFcnJvciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgc3Bhbi0tcmVsYXRpdmUnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSc+c3BlZS5jaCAvIDwvc3Bhbj5cbiAgICAgICAgICA8VXJsTWlkZGxlXG4gICAgICAgICAgICBwdWJsaXNoSW5DaGFubmVsPXtwdWJsaXNoSW5DaGFubmVsfVxuICAgICAgICAgICAgc2VsZWN0ZWRDaGFubmVsPXtzZWxlY3RlZENoYW5uZWx9XG4gICAgICAgICAgICBsb2dnZWRJbkNoYW5uZWxOYW1lPXtsb2dnZWRJbkNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZD17bG9nZ2VkSW5DaGFubmVsU2hvcnRJZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nY2xhaW0tbmFtZS1pbnB1dCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBuYW1lPSdjbGFpbScgcGxhY2Vob2xkZXI9J3lvdXItdXJsLWhlcmUnIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSB2YWx1ZT17Y2xhaW19IC8+XG4gICAgICAgICAgeyAoY2xhaW0gJiYgIXVybEVycm9yKSAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jbGFpbS1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICB7IHVybEVycm9yICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxNid9PC9zcGFuPiB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHsgdXJsRXJyb3IgPyAoXG4gICAgICAgICAgICA8cCBpZD0naW5wdXQtZXJyb3ItY2xhaW0tbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt1cmxFcnJvcn08L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5DaG9vc2UgYSBjdXN0b20gdXJsPC9wPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVXJsSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZnVuY3Rpb24gVXJsTWlkZGxlICh7cHVibGlzaEluQ2hhbm5lbCwgc2VsZWN0ZWRDaGFubmVsLCBsb2dnZWRJbkNoYW5uZWxOYW1lLCBsb2dnZWRJbkNoYW5uZWxTaG9ydElkfSkge1xuICBpZiAocHVibGlzaEluQ2hhbm5lbCkge1xuICAgIGlmIChzZWxlY3RlZENoYW5uZWwgPT09IGxvZ2dlZEluQ2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiA8c3BhbiBpZD0ndXJsLWNoYW5uZWwnIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSc+e2xvZ2dlZEluQ2hhbm5lbE5hbWV9Ontsb2dnZWRJbkNoYW5uZWxTaG9ydElkfSAvPC9zcGFuPjtcbiAgICB9XG4gICAgcmV0dXJuIDxzcGFuIGlkPSd1cmwtY2hhbm5lbC1wbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5IHRvb2x0aXAnPkBjaGFubmVsPHNwYW5cbiAgICAgIGNsYXNzTmFtZT0ndG9vbHRpcC10ZXh0Jz5TZWxlY3QgYSBjaGFubmVsIGJlbG93PC9zcGFuPiAvPC9zcGFuPjtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxzcGFuIGlkPSd1cmwtbm8tY2hhbm5lbC1wbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5IHRvb2x0aXAnPnh5ejxzcGFuIGNsYXNzTmFtZT0ndG9vbHRpcC10ZXh0Jz5UaGlzIHdpbGwgYmUgYSByYW5kb20gaWQ8L3NwYW4+IC88L3NwYW4+XG4gICk7XG59XG5cblVybE1pZGRsZS5wcm9wVHlwZXMgPSB7XG4gIHB1Ymxpc2hJbkNoYW5uZWwgICAgICA6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGxvZ2dlZEluQ2hhbm5lbE5hbWUgICA6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVcmxNaWRkbGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25OZXdUaHVtYm5haWwgfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaDogeyBmaWxlIH0gfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uTmV3VGh1bWJuYWlsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICBsZXQgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICBsZXQgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG4gIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgbGV0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6IG1pbWVTdHJpbmd9KTtcbn1cblxuY2xhc3MgUHVibGlzaFRodW1ibmFpbElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWRlb1NvdXJjZSAgIDogbnVsbCxcbiAgICAgIGVycm9yICAgICAgICAgOiBudWxsLFxuICAgICAgc2xpZGVyTWluUmFuZ2U6IDEsXG4gICAgICBzbGlkZXJNYXhSYW5nZTogbnVsbCxcbiAgICAgIHNsaWRlclZhbHVlICAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGEgPSB0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlID0gdGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNyZWF0ZVRodW1ibmFpbCA9IHRoaXMuY3JlYXRlVGh1bWJuYWlsLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgZmlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFZpZGVvU291cmNlKGZpbGUpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIC8vIGlmIGZpbGUgY2hhbmdlc1xuICAgIGlmIChuZXh0UHJvcHMuZmlsZSAmJiBuZXh0UHJvcHMuZmlsZSAhPT0gdGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICBjb25zdCB7IGZpbGUgfSA9IG5leHRQcm9wcztcbiAgICAgIHRoaXMuc2V0VmlkZW9Tb3VyY2UoZmlsZSk7XG4gICAgfTtcbiAgfVxuICBzZXRWaWRlb1NvdXJjZSAoZmlsZSkge1xuICAgIGNvbnN0IHByZXZpZXdSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHByZXZpZXdSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICBwcmV2aWV3UmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGFVcmkgPSBwcmV2aWV3UmVhZGVyLnJlc3VsdDtcbiAgICAgIGNvbnN0IGJsb2IgPSBkYXRhVVJJdG9CbG9iKGRhdGFVcmkpO1xuICAgICAgY29uc3QgdmlkZW9Tb3VyY2UgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpZGVvU291cmNlIH0pO1xuICAgIH07XG4gIH1cbiAgaGFuZGxlVmlkZW9Mb2FkZWREYXRhIChldmVudCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gZXZlbnQudGFyZ2V0LmR1cmF0aW9uO1xuICAgIGNvbnN0IHRvdGFsTWludXRlcyA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyA2MCk7XG4gICAgY29uc3QgdG90YWxTZWNvbmRzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAlIDYwKTtcbiAgICAvLyBzZXQgdGhlIHNsaWRlclxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2xpZGVyTWF4UmFuZ2U6IGR1cmF0aW9uICogMTAwLFxuICAgICAgc2xpZGVyVmFsdWUgICA6IGR1cmF0aW9uICogMTAwIC8gMixcbiAgICAgIHRvdGFsTWludXRlcyxcbiAgICAgIHRvdGFsU2Vjb25kcyxcbiAgICB9KTtcbiAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgdmlkZW9cbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSBkdXJhdGlvbiAvIDI7XG4gIH1cbiAgaGFuZGxlU2xpZGVyQ2hhbmdlIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAvLyB1cGRhdGUgdGhlIHNsaWRlciB2YWx1ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2xpZGVyVmFsdWU6IHZhbHVlLFxuICAgIH0pO1xuICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlb1xuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IHZhbHVlIC8gMTAwO1xuICB9XG4gIGNyZWF0ZVRodW1ibmFpbCAoKSB7XG4gICAgLy8gdGFrZSBhIHNuYXBzaG90XG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY29uc3QgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICBjb25zdCBibG9iID0gZGF0YVVSSXRvQmxvYihkYXRhVXJsKTtcbiAgICBjb25zdCBzbmFwc2hvdCA9IG5ldyBGaWxlKFtibG9iXSwgYHRodW1ibmFpbC5wbmdgLCB7XG4gICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICB9KTtcbiAgICAvLyBzZXQgdGhlIHRodW1ibmFpbCBpbiByZWR1eCBzdG9yZVxuICAgIGlmIChzbmFwc2hvdCkge1xuICAgICAgdGhpcy5wcm9wcy5vbk5ld1RodW1ibmFpbChzbmFwc2hvdCk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciwgdmlkZW9Tb3VyY2UsIHNsaWRlck1pblJhbmdlLCBzbGlkZXJNYXhSYW5nZSwgc2xpZGVyVmFsdWUsIHRvdGFsTWludXRlcywgdG90YWxTZWNvbmRzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCc+VGh1bWJuYWlsOjwvbGFiZWw+XG4gICAgICAgIDx2aWRlb1xuICAgICAgICAgIGlkPSd2aWRlby10aHVtYi1wbGF5ZXInXG4gICAgICAgICAgcHJlbG9hZD0nbWV0YWRhdGEnXG4gICAgICAgICAgbXV0ZWRcbiAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319XG4gICAgICAgICAgcGxheXNJbmxpbmVcbiAgICAgICAgICBvbkxvYWRlZERhdGE9e3RoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhfVxuICAgICAgICAgIHNyYz17dmlkZW9Tb3VyY2V9XG4gICAgICAgICAgb25TZWVrZWQ9e3RoaXMuY3JlYXRlVGh1bWJuYWlsfVxuICAgICAgICAvPlxuICAgICAgICB7XG4gICAgICAgICAgc2xpZGVyVmFsdWUgPyAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1jZW50ZXInIHN0eWxlPXt7d2lkdGg6ICcxMDAlJ319PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz4wJzAwXCI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPnt0b3RhbE1pbnV0ZXN9J3t0b3RhbFNlY29uZHN9XCI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT0ncmFuZ2UnXG4gICAgICAgICAgICAgICAgICBtaW49e3NsaWRlck1pblJhbmdlfVxuICAgICAgICAgICAgICAgICAgbWF4PXtzbGlkZXJNYXhSYW5nZX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtzbGlkZXJWYWx1ZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nc2xpZGVyJ1xuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJyA+bG9hZGluZy4uLiA8L3A+XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHsgZXJyb3IgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPntlcnJvcn08L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPlVzZSBzbGlkZXIgdG8gc2V0IHRodW1ibmFpbDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRodW1ibmFpbElucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L3ZpZXcuanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhLCB0b2dnbGVNZXRhZGF0YUlucHV0c30gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHNob3dNZXRhZGF0YUlucHV0czogcHVibGlzaC5zaG93TWV0YWRhdGFJbnB1dHMsXG4gICAgZGVzY3JpcHRpb24gICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgIGxpY2Vuc2UgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5saWNlbnNlLFxuICAgIG5zZncgICAgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5uc2Z3LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uTWV0YWRhdGFDaGFuZ2U6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTWV0YWRhdGEobmFtZSwgdmFsdWUpKTtcbiAgICB9LFxuICAgIG9uVG9nZ2xlTWV0YWRhdGFJbnB1dHM6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godG9nZ2xlTWV0YWRhdGFJbnB1dHModmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEV4cGFuZGluZ1RleHRBcmVhIGZyb20gJ2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEnO1xuXG5jbGFzcyBQdWJsaXNoTWV0YWRhdGFJbnB1dHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy50b2dnbGVTaG93SW5wdXRzID0gdGhpcy50b2dnbGVTaG93SW5wdXRzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdCA9IHRoaXMuaGFuZGxlU2VsZWN0LmJpbmQodGhpcyk7XG4gIH1cbiAgdG9nZ2xlU2hvd0lucHV0cyAoKSB7XG4gICAgdGhpcy5wcm9wcy5vblRvZ2dsZU1ldGFkYXRhSW5wdXRzKCF0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcgPyB0YXJnZXQuY2hlY2tlZCA6IHRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBuYW1lID0gdGFyZ2V0Lm5hbWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHZhbHVlKTtcbiAgfVxuICBoYW5kbGVTZWxlY3QgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgc2VsZWN0ZWRPcHRpb24pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J3B1Ymxpc2gtZGV0YWlscycgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAge3RoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzICYmIChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J2xhYmVsJz5EZXNjcmlwdGlvbjo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPEV4cGFuZGluZ1RleHRBcmVhXG4gICAgICAgICAgICAgICAgICBpZD0ncHVibGlzaC1kZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dGFyZWEgdGV4dGFyZWEtLXByaW1hcnkgdGV4dGFyZWEtLWZ1bGwtd2lkdGgnXG4gICAgICAgICAgICAgICAgICByb3dzPXsxfVxuICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsyMDAwfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4SGVpZ2h0OiAyMDAgfX1cbiAgICAgICAgICAgICAgICAgIG5hbWU9J2Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J09wdGlvbmFsIGRlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J2xhYmVsJz5MaWNlbnNlOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHR5cGU9J3RleHQnIG5hbWU9J2xpY2Vuc2UnIGlkPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tcHJpbWFyeScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0fT5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9JyAnPlVuc3BlY2lmaWVkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdQdWJsaWMgRG9tYWluJz5QdWJsaWMgRG9tYWluPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdDcmVhdGl2ZSBDb21tb25zJz5DcmVhdGl2ZSBDb21tb25zPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbnNmdycgY2xhc3NOYW1lPSdsYWJlbCc+TWF0dXJlOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dC1jaGVja2JveCcgdHlwZT0nY2hlY2tib3gnIGlkPSdwdWJsaXNoLW5zZncnIG5hbWU9J25zZncnIHZhbHVlPXt0aGlzLnByb3BzLm5zZnd9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1zZWNvbmRhcnknIG9uQ2xpY2s9e3RoaXMudG9nZ2xlU2hvd0lucHV0c30+e3RoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzID8gJ2xlc3MnIDogJ21vcmUnfTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoTWV0YWRhdGFJbnB1dHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRXhwYW5kaW5nVGV4dGFyZWEgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5faGFuZGxlQ2hhbmdlID0gdGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuYWRqdXN0VGV4dGFyZWEoe30pO1xuICB9XG4gIF9oYW5kbGVDaGFuZ2UgKGV2ZW50KSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKGV2ZW50KTtcbiAgICB0aGlzLmFkanVzdFRleHRhcmVhKGV2ZW50KTtcbiAgfVxuICBhZGp1c3RUZXh0YXJlYSAoeyB0YXJnZXQgPSB0aGlzLmVsIH0pIHtcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0LnNjcm9sbEhlaWdodH1weGA7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IC4uLnJlc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZXh0YXJlYVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgcmVmPXt4ID0+IHRoaXMuZWwgPSB4fVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbkV4cGFuZGluZ1RleHRhcmVhLnByb3BUeXBlcyA9IHtcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwYW5kaW5nVGV4dGFyZWE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7c2V0UHVibGlzaEluQ2hhbm5lbCwgdXBkYXRlU2VsZWN0ZWRDaGFubmVsLCB1cGRhdGVFcnJvcn0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgcHVibGlzaEluQ2hhbm5lbCAgIDogcHVibGlzaC5wdWJsaXNoSW5DaGFubmVsLFxuICAgIHNlbGVjdGVkQ2hhbm5lbCAgICA6IHB1Ymxpc2guc2VsZWN0ZWRDaGFubmVsLFxuICAgIGNoYW5uZWxFcnJvciAgICAgICA6IHB1Ymxpc2guZXJyb3IuY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2NoYW5uZWwnLCBudWxsKSk7XG4gICAgICBkaXNwYXRjaChzZXRQdWJsaXNoSW5DaGFubmVsKHZhbHVlKSk7XG4gICAgfSxcbiAgICBvbkNoYW5uZWxTZWxlY3Q6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2NoYW5uZWwnLCBudWxsKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwodmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5pbXBvcnQgKiBhcyBzdGF0ZXMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzJztcblxuY2xhc3MgQ2hhbm5lbFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2ggPSB0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2guYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbiA9IHRoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gIH1cbiAgdG9nZ2xlQW5vbnltb3VzUHVibGlzaCAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09ICdhbm9ueW1vdXMnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZShmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlKHRydWUpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVTZWxlY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25DaGFubmVsU2VsZWN0KHNlbGVjdGVkT3B0aW9uKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J2Fub255bW91cy1vci1jaGFubmVsJyBpZD0nYW5vbnltb3VzLXJhZGlvJyBjbGFzc05hbWU9J2lucHV0LXJhZGlvJyB2YWx1ZT0nYW5vbnltb3VzJyBjaGVja2VkPXshdGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsfSBvbkNoYW5nZT17dGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNofSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwgbGFiZWwtLXBvaW50ZXInIGh0bWxGb3I9J2Fub255bW91cy1yYWRpbyc+QW5vbnltb3VzPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J2Fub255bW91cy1vci1jaGFubmVsJyBpZD0nY2hhbm5lbC1yYWRpbycgY2xhc3NOYW1lPSdpbnB1dC1yYWRpbycgdmFsdWU9J2luIGEgY2hhbm5lbCcgY2hlY2tlZD17dGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsfSBvbkNoYW5nZT17dGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNofSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwgbGFiZWwtLXBvaW50ZXInIGh0bWxGb3I9J2NoYW5uZWwtcmFkaW8nPkluIGEgY2hhbm5lbDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmNoYW5uZWxFcnJvciA/IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5wcm9wcy5jaGFubmVsRXJyb3J9PC9wPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+UHVibGlzaCBhbm9ueW1vdXNseSBvciBpbiBhIGNoYW5uZWw8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICB7IHRoaXMucHJvcHMucHVibGlzaEluQ2hhbm5lbCAmJiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zJz5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbmFtZS1zZWxlY3QnPkNoYW5uZWw6PC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nY2hhbm5lbC1uYW1lLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdycgdmFsdWU9e3RoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb259PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICYmIDxvcHRpb24gdmFsdWU9e3RoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZX0gaWQ9J3B1Ymxpc2gtY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPnt0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWV9PC9vcHRpb24+IH1cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzdGF0ZXMuTE9HSU59PkV4aXN0aW5nPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c3RhdGVzLkNSRUFURX0+TmV3PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbCA9PT0gc3RhdGVzLkxPR0lOKSAmJiA8Q2hhbm5lbExvZ2luRm9ybSAvPiB9XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbCA9PT0gc3RhdGVzLkNSRUFURSkgJiYgPENoYW5uZWxDcmVhdGVGb3JtIC8+IH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbFNlbGVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxMb2dpbkZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgbmFtZSAgICA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ2luVG9DaGFubmVsID0gdGhpcy5sb2dpblRvQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgbG9naW5Ub0NoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWU6IHRoaXMuc3RhdGUubmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJlcXVlc3QoJ2xvZ2luJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHtzdWNjZXNzLCBjaGFubmVsTmFtZSwgc2hvcnRDaGFubmVsSWQsIGNoYW5uZWxDbGFpbUlkLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbWVzc2FnZX0pO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIGlkPSdjaGFubmVsLWxvZ2luLWZvcm0nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1sb2dpbi1uYW1lLWlucHV0Jz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20nPlxuICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBuYW1lPSduYW1lJyBwbGFjZWhvbGRlcj0nWW91ciBDaGFubmVsIE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxOYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnID5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBpZD0nY2hhbm5lbC1sb2dpbi1wYXNzd29yZC1pbnB1dCcgbmFtZT0ncGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbFBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkVudGVyIHRoZSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5sb2dpblRvQ2hhbm5lbH0+QXV0aGVudGljYXRlPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbExvZ2luRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxDcmVhdGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIGNoYW5uZWwgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgIHN0YXR1cyAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQgPSB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVDaGFubmVsID0gdGhpcy5jcmVhdGVDaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgY2xlYW5zZUNoYW5uZWxJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgaGFuZGxlQ2hhbm5lbElucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUNoYW5uZWxJbnB1dCh2YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2hhbm5lbDogdmFsdWV9KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdQbGVhc2UgZW50ZXIgYSBjaGFubmVsIG5hbWUnfSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgdXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbnVsbH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgfSk7XG4gIH1cbiAgY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXR1cm4gcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YCk7XG4gIH1cbiAgY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQgKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghcGFzc3dvcmQgfHwgcGFzc3dvcmQubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgYSBwYXNzd29yZCcpKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuICBtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0ICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWUsIHBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdCgnL3NpZ251cCcsIHBhcmFtcylcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFVuZm9ydHVuYXRlbHksIHdlIGVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIGNyZWF0aW5nIHlvdXIgY2hhbm5lbC4gUGxlYXNlIGxldCB1cyBrbm93IGluIERpc2NvcmQhICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGNyZWF0ZUNoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNoZWNrSXNQYXNzd29yZFByb3ZpZGVkKHRoaXMuc3RhdGUucGFzc3dvcmQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrSXNDaGFubmVsQXZhaWxhYmxlKHRoaXMuc3RhdGUuY2hhbm5lbCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6ICdXZSBhcmUgcHVibGlzaGluZyB5b3VyIG5ldyBjaGFubmVsLiAgU2l0IHRpZ2h0Li4uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0KHRoaXMuc3RhdGUuY2hhbm5lbCwgdGhpcy5zdGF0ZS5wYXNzd29yZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBudWxsfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4ocmVzdWx0LmNoYW5uZWxOYW1lLCByZXN1bHQuc2hvcnRDaGFubmVsSWQsIHJlc3VsdC5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHsgIXRoaXMuc3RhdGUuc3RhdHVzID8gKFxuICAgICAgICAgIDxmb3JtIGlkPSdwdWJsaXNoLWNoYW5uZWwtZm9ybSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1uYW1lJz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J2NoYW5uZWwnIGlkPSduZXctY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPSdleGFtcGxlQ2hhbm5lbE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICAgIHsgKHRoaXMuc3RhdGUuY2hhbm5lbCAmJiAhdGhpcy5zdGF0ZS5lcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIG5hbWU9J3Bhc3N3b3JkJyBpZD0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmNyZWF0ZUNoYW5uZWx9PkNyZWF0ZSBDaGFubmVsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+e3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENyZWF0ZUZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0tYWN0aXZlJz58IDwvc3Bhbj47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgSW5hY3RpdmVTdGF0dXNCYXIgPSAoKSA9PiB7XG4gIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItLWluYWN0aXZlJz58IDwvc3Bhbj47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGV9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzdGF0dXMgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gICAgbWVzc2FnZTogcHVibGlzaC5zdGF0dXMubWVzc2FnZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCAqIGFzIHB1Ymxpc2hTdGF0ZXMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2xhaW1fc3RhdGVzJztcblxuY2xhc3MgUHVibGlzaFN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIG1lc3NhZ2UsIGNsZWFyRmlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuTE9BRF9TVEFSVCAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5GaWxlIGlzIGxvYWRpbmcgdG8gc2VydmVyPC9wPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+MCU8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuTE9BRElORyAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgPHA+RmlsZSBpcyBsb2FkaW5nIHRvIHNlcnZlcjwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+e21lc3NhZ2V9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLlBVQkxJU0hJTkcgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+VXBsb2FkIGNvbXBsZXRlLiAgWW91ciBmaWxlIGlzIG5vdyBiZWluZyBwdWJsaXNoZWQgb24gdGhlIGJsb2NrY2hhaW4uLi48L3A+XG4gICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDxwPkN1cmlvdXMgd2hhdCBtYWdpYyBpcyBoYXBwZW5pbmcgaGVyZT8gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZmFxL3doYXQtaXMtbGJyeSc+TGVhcm4gbW9yZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLlNVQ0NFU1MgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+WW91ciBwdWJsaXNoIGlzIGNvbXBsZXRlISBZb3UgYXJlIGJlaW5nIHJlZGlyZWN0ZWQgdG8gaXQgbm93LjwvcD5cbiAgICAgICAgICA8cD5JZiB5b3UgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQsIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e21lc3NhZ2V9PmNsaWNrIGhlcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5GQUlMRUQgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+U29tZXRoaW5nIHdlbnQgd3JvbmcuLi48L3A+XG4gICAgICAgICAgPHA+PHN0cm9uZz57bWVzc2FnZX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgPHA+Rm9yIGhlbHAsIHBvc3QgdGhlIGFib3ZlIGVycm9yIHRleHQgaW4gdGhlICNzcGVlY2ggY2hhbm5lbCBvbiB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUycgdGFyZ2V0PSdfYmxhbmsnPmxicnkgZGlzY29yZDwvYT48L3A+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tc2Vjb25kYXJ5JyBvbkNsaWNrPXtjbGVhckZpbGV9PlJlc2V0PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoU3RhdHVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cy92aWV3LmpzeCIsImV4cG9ydCBjb25zdCBMT0FEX1NUQVJUID0gJ0xPQURfU1RBUlQnO1xuZXhwb3J0IGNvbnN0IExPQURJTkcgPSAnTE9BRElORyc7XG5leHBvcnQgY29uc3QgUFVCTElTSElORyA9ICdQVUJMSVNISU5HJztcbmV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IEZBSUxFRCA9ICdGQUlMRUQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZTogcHVibGlzaC5kaXNhYmxlZE1lc3NhZ2UsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHVibGlzaERpc2FibGVkTWVzc2FnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMucHJvcHMubWVzc2FnZTtcbiAgICBjb25zb2xlLmxvZygndGhpcy5wcm9wcy5tZXNzYWdlOicsIG1lc3NhZ2UpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGRyb3B6b25lLS1kaXNhYmxlZCByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwIGNsYXNzTmFtZT0ndGV4dC0tZGlzYWJsZWQnPlB1Ymxpc2hpbmcgaXMgY3VycmVudGx5IGRpc2FibGVkLjwvcD5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LS1kaXNhYmxlZCc+e21lc3NhZ2V9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuXG5jbGFzcyBBYm91dFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0Fib3V0J30gcGFnZVVyaT17J2Fib3V0J30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0ncHVsbC1xdW90ZSc+U3BlZS5jaCBpcyBhbiBvcGVuLXNvdXJjZSBwcm9qZWN0LiAgUGxlYXNlIGNvbnRyaWJ1dGUgdG8gdGhlIGV4aXN0aW5nIHNpdGUsIG9yIGZvcmsgaXQgYW5kIG1ha2UgeW91ciBvd24uPC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3R3aXR0ZXIuY29tL3NwZWVfY2gnPlRXSVRURVI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPkdJVEhVQjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJz5ESVNDT1JEIENIQU5ORUw8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gvYmxvYi9tYXN0ZXIvUkVBRE1FLm1kJz5ET0NVTUVOVEFUSU9OPC9hPjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIG1lZGlhLWhvc3Rpbmcgc2l0ZSB0aGF0IHJlYWRzIGZyb20gYW5kIHB1Ymxpc2hlcyBjb250ZW50IHRvIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pbyc+TEJSWTwvYT4gYmxvY2tjaGFpbi48L3A+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBob3N0aW5nIHNlcnZpY2UsIGJ1dCB3aXRoIHRoZSBhZGRlZCBiZW5lZml0IHRoYXQgaXQgc3RvcmVzIHlvdXIgY29udGVudCBvbiBhIGRlY2VudHJhbGl6ZWQgbmV0d29yayBvZiBjb21wdXRlcnMgLS0gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2dldCc+TEJSWTwvYT4gbmV0d29yay4gIFRoaXMgbWVhbnMgdGhhdCB5b3VyIGltYWdlcyBhcmUgc3RvcmVkIGluIG11bHRpcGxlIGxvY2F0aW9ucyB3aXRob3V0IGEgc2luZ2xlIHBvaW50IG9mIGZhaWx1cmUuPC9wPlxuICAgICAgICAgICAgICA8aDM+Q29udHJpYnV0ZTwvaDM+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSBoYXZlIGFuIGlkZWEgZm9yIHlvdXIgb3duIHNwZWUuY2gtbGlrZSBzaXRlIG9uIHRvcCBvZiBMQlJZLCBmb3JrIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+Z2l0aHViIHJlcG88L2E+IGFuZCBnbyB0byB0b3duITwvcD5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IHdhbnQgdG8gaW1wcm92ZSBzcGVlLmNoLCBqb2luIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJz5kaXNjb3JkIGNoYW5uZWw8L2E+IG9yIHNvbHZlIG9uZSBvZiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gvaXNzdWVzJz5naXRodWIgaXNzdWVzPC9hPi48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBYm91dFBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvQWJvdXRQYWdlL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZTogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5cbmNsYXNzIExvZ2luUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgLy8gcmUtcm91dGUgdGhlIHVzZXIgdG8gdGhlIGhvbWVwYWdlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICAgIGlmIChuZXdQcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICE9PSB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUpIHtcbiAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvYCk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnTG9naW4nfSBwYWdlVXJpPXsnbG9naW4nfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+Q2hhbm5lbHMgYWxsb3cgeW91IHRvIHB1Ymxpc2ggYW5kIGdyb3VwIGNvbnRlbnQgdW5kZXIgYW4gaWRlbnRpdHkuIFlvdSBjYW4gY3JlYXRlIGEgY2hhbm5lbCBmb3IgeW91cnNlbGYsIG9yIHNoYXJlIG9uZSB3aXRoIGxpa2UtbWluZGVkIGZyaWVuZHMuICBZb3UgY2FuIGNyZWF0ZSAxIGNoYW5uZWwsIG9yIDEwMCwgc28gd2hldGhlciB5b3UncmUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRhbG9uaWEyMDE3OjQzZGNmNDcxNjNjYWEyMWQ4NDA0ZDlmZTliMzBmNzhlZjNlMTQ2YTgnPmRvY3VtZW50aW5nIGltcG9ydGFudCBldmVudHM8L2E+LCBvciBtYWtpbmcgYSBwdWJsaWMgcmVwb3NpdG9yeSBmb3IgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRHaWZzJz5jYXQgZ2lmczwvYT4gKHBhc3N3b3JkOiAnMTIzNCcpLCB0cnkgY3JlYXRpbmcgYSBjaGFubmVsIGZvciBpdCE8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkxvZyBpbiB0byBhbiBleGlzdGluZyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsTG9naW5Gb3JtIC8+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkNyZWF0ZSBhIGJyYW5kIG5ldyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ3JlYXRlRm9ybSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihMb2dpblBhZ2UpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvbkhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGVycm9yICAgICAgOiBzaG93LnJlcXVlc3QuZXJyb3IsXG4gICAgcmVxdWVzdFR5cGU6IHNob3cucmVxdWVzdC50eXBlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvbkhhbmRsZVNob3dQYWdlVXJpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IFNob3dBc3NldExpdGUgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXRMaXRlJztcbmltcG9ydCBTaG93QXNzZXREZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscyc7XG5pbXBvcnQgU2hvd0NoYW5uZWwgZnJvbSAnY29udGFpbmVycy9TaG93Q2hhbm5lbCc7XG5cbmltcG9ydCB7IENIQU5ORUwsIEFTU0VUX0xJVEUsIEFTU0VUX0RFVEFJTFMgfSBmcm9tICdjb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzJztcblxuY2xhc3MgU2hvd1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKHRoaXMucHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLm1hdGNoLnBhcmFtcyAhPT0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25IYW5kbGVTaG93UGFnZVVyaShuZXh0UHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCByZXF1ZXN0VHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFcnJvclBhZ2UgZXJyb3I9e2Vycm9yfSAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgc3dpdGNoIChyZXF1ZXN0VHlwZSkge1xuICAgICAgY2FzZSBDSEFOTkVMOlxuICAgICAgICByZXR1cm4gPFNob3dDaGFubmVsIC8+O1xuICAgICAgY2FzZSBBU1NFVF9MSVRFOlxuICAgICAgICByZXR1cm4gPFNob3dBc3NldExpdGUgLz47XG4gICAgICBjYXNlIEFTU0VUX0RFVEFJTFM6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0RGV0YWlscyAvPjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiA8cD5sb2FkaW5nLi4uPC9wPjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuXG5jbGFzcyBTaG93TGl0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXNzZXQpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlciBzaG93LWxpdGUtY29udGFpbmVyJz5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxBc3NldERpc3BsYXkgLz5cbiAgICAgICAgICA8TGluayBpZD0nYXNzZXQtYm9pbGVycGF0ZScgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5IGZpbmUtcHJpbnQnIHRvPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfWB9Pmhvc3RlZFxuICAgICAgICAgICAgdmlhIFNwZWUuY2g8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICA8cD5sb2FkaW5nIGFzc2V0IGRhdGEuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93TGl0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIFVOQVZBSUxBQkxFLCBFUlJPUiwgQVZBSUxBQkxFIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY2xhc3MgQXNzZXREaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25GaWxlUmVxdWVzdChuYW1lLCBjbGFpbUlkKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBlcnJvciwgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGNvbnRlbnRUeXBlLCBmaWxlRXh0LCB0aHVtYm5haWwgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdhc3NldC1kaXNwbGF5LWNvbXBvbmVudCc+XG4gICAgICAgIHsoc3RhdHVzID09PSBMT0NBTF9DSEVDSykgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5DaGVja2luZyB0byBzZWUgaWYgU3BlZS5jaCBoYXMgeW91ciBhc3NldCBsb2NhbGx5Li4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gVU5BVkFJTEFCTEUpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+U2l0IHRpZ2h0LCB3ZSdyZSBzZWFyY2hpbmcgdGhlIExCUlkgYmxvY2tjaGFpbiBmb3IgeW91ciBhc3NldCE8L3A+XG4gICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDxwPkN1cmlvdXMgd2hhdCBtYWdpYyBpcyBoYXBwZW5pbmcgaGVyZT8gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZmFxL3doYXQtaXMtbGJyeSc+TGVhcm4gbW9yZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gRVJST1IpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+VW5mb3J0dW5hdGVseSwgd2UgY291bGRuJ3QgZG93bmxvYWQgeW91ciBhc3NldCBmcm9tIExCUlkuICBZb3UgY2FuIGhlbHAgdXMgb3V0IGJ5IHNoYXJpbmcgdGhlIGJlbG93IGVycm9yIG1lc3NhZ2UgaW4gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5MQlJZIGRpc2NvcmQ8L2E+LjwvcD5cbiAgICAgICAgICA8aT48cCBpZD0nZXJyb3ItbWVzc2FnZSc+e2Vycm9yfTwvcD48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBBVkFJTEFCTEUpICYmXG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX0gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHZpZGVvIGNsYXNzTmFtZT0nYXNzZXQgdmlkZW8nIGNvbnRyb2xzIHBvc3Rlcj17dGh1bWJuYWlsfT5cbiAgICAgICAgICAgICAgICAgIDxzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8cD5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgPGNvZGU+dmlkZW88L2NvZGU+IGVsZW1lbnQuPC9wPlxuICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPlVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXREaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IEFzc2V0VGl0bGUgZnJvbSAnY29udGFpbmVycy9Bc3NldFRpdGxlJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuaW1wb3J0IEFzc2V0SW5mbyBmcm9tICdjb250YWluZXJzL0Fzc2V0SW5mbyc7XG5cbmNsYXNzIFNob3dBc3NldERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IGNsYWltRGF0YTogeyBuYW1lIH0gfSA9IGFzc2V0O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17YCR7bmFtZX0gLSBkZXRhaWxzYH0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8QXNzZXRUaXRsZSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgc2hvdy1kZXRhaWxzLWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICAgICAgPEFzc2V0SW5mbyAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yUGFnZSBlcnJvcj17J2xvYWRpbmcgYXNzZXQgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0Fzc2V0RGV0YWlscztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGE6IHsgdGl0bGUgfSB9ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQXNzZXRUaXRsZSA9ICh7IHRpdGxlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0LS1sYXJnZSc+e3RpdGxlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0VGl0bGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBBc3NldEluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jb3B5VG9DbGlwYm9hcmQgPSB0aGlzLmNvcHlUb0NsaXBib2FyZC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvcHlUb0NsaXBib2FyZCAoZXZlbnQpIHtcbiAgICB2YXIgZWxlbWVudFRvQ29weSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmVsZW1lbnR0b2NvcHk7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Db3B5KTtcbiAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdPb3BzLCB1bmFibGUgdG8gY29weSd9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IHNob3J0SWQsIGNsYWltRGF0YSA6IHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIGRlc2NyaXB0aW9uLCBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsLCBob3N0IH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2NoYW5uZWxOYW1lICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkNoYW5uZWw6PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+PExpbmsgdG89e2AvJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfWB9PntjaGFubmVsTmFtZX08L0xpbms+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIHtkZXNjcmlwdGlvbiAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz57ZGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hhcmUtYnV0dG9ucyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPlNoYXJlOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20gZmxleC1jb250YWluZXItLXdyYXAnPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHdpdHRlcjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT5mYWNlYm9vazwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cDovL3R1bWJsci5jb20vd2lkZ2V0cy9zaGFyZS90b29sP2Nhbm9uaWNhbFVybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR1bWJscjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zdWJtaXQ/dXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9JnRpdGxlPSR7bmFtZX1gfT5yZWRkaXQ8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LXNob3J0LWxpbmsnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkxpbms6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktc2hvcnQtbGluaycgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3Nob3J0LWxpbmsnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgJHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J3Nob3J0LWxpbmsnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctZW1iZWQtY29kZSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+RW1iZWQ6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktZW1iZWQtdGV4dCcgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7KGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JykgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDx2aWRlbyB3aWR0aD1cIjEwMCVcIiBjb250cm9scyBwb3N0ZXI9XCIke3RodW1ibmFpbH1cIiBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPjwvdmlkZW8+YH0gLz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDxpbWcgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz5gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdlbWJlZC10ZXh0J1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSc+XG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0bz17YC8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9PjxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9J3RleHQnPkRpcmVjdCBMaW5rPC9zcGFuPjwvTGluaz5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9e2Ake2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0gZG93bmxvYWQ9e25hbWV9PkRvd25sb2FkPC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9kbWNhJz5SZXBvcnQ8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldEluZm87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgcmVxdWVzdFxuICBjb25zdCBwcmV2aW91c1JlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgLy8gc2VsZWN0IGNoYW5uZWxcbiAgbGV0IGNoYW5uZWw7XG4gIGlmIChwcmV2aW91c1JlcXVlc3QpIHtcbiAgICBjb25zdCBjaGFubmVsS2V5ID0gcHJldmlvdXNSZXF1ZXN0LmtleTtcbiAgICBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheSc7XG5cbmNsYXNzIFNob3dDaGFubmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbG9uZ0lkLCBzaG9ydElkIH0gPSBjaGFubmVsO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gY2hhbm5lbD17Y2hhbm5lbH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPGgyPmNoYW5uZWwgbmFtZToge25hbWV9PC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PmZ1bGwgY2hhbm5lbCBpZDoge2xvbmdJZH08L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17J2ZpbmUtcHJpbnQnfT5zaG9ydCBjaGFubmVsIGlkOiB7c2hvcnRJZH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ2xhaW1zRGlzcGxheSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBjaGFubmVsIGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dDaGFubmVsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25VcGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgY2hhbm5lbCBrZXlcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3Rbc2hvdy5yZXF1ZXN0LmlkXTtcbiAgY29uc3QgY2hhbm5lbEtleSA9IHJlcXVlc3Qua2V5O1xuICAvLyBzZWxlY3QgY2hhbm5lbCBjbGFpbXNcbiAgY29uc3QgY2hhbm5lbCA9IHNob3cuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0gfHwgbnVsbDtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgY2hhbm5lbEtleSxcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvblVwZGF0ZUNoYW5uZWxDbGFpbXMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBc3NldFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9Bc3NldFByZXZpZXcnO1xuXG5jbGFzcyBDaGFubmVsQ2xhaW1zRGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlID0gdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICB9XG4gIHNob3dQcmV2aW91c1Jlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKHByZXZpb3VzUGFnZSk7XG4gIH1cbiAgc2hvd05leHRSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5leHRQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpICsgMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKG5leHRQYWdlKTtcbiAgfVxuICBzaG93TmV3UGFnZSAocGFnZSkge1xuICAgIGNvbnN0IHsgY2hhbm5lbEtleSwgY2hhbm5lbDogeyBuYW1lLCBsb25nSWQgfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uVXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY2xhaW1zLCBjdXJyZW50UGFnZSwgdG90YWxQYWdlcyB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsJz5cbiAgICAgICAgeyhjbGFpbXMubGVuZ3RoID4gMCkgPyAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHtjbGFpbXMubWFwKChjbGFpbSwgaW5kZXgpID0+IDxBc3NldFByZXZpZXdcbiAgICAgICAgICAgICAgY2xhaW1EYXRhPXtjbGFpbX1cbiAgICAgICAgICAgICAga2V5PXtgJHtjbGFpbS5uYW1lfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAvPil9XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlID4gMSkgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2V9PlByZXZpb3VzIFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcykgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd05leHRSZXN1bHRzUGFnZX0+TmV4dCBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwPlRoZXJlIGFyZSBubyBjbGFpbXMgaW4gdGhpcyBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENsYWltc0Rpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoe3NpdGU6IHtkZWZhdWx0czogeyBkZWZhdWx0VGh1bWJuYWlsIH19fSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jb25zdCBBc3NldFByZXZpZXcgPSAoeyBkZWZhdWx0VGh1bWJuYWlsLCBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgZmlsZUV4dCwgY29udGVudFR5cGUsIHRodW1ibmFpbCB9IH0pID0+IHtcbiAgY29uc3QgZGlyZWN0U291cmNlTGluayA9IGAke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWA7XG4gIGNvbnN0IHNob3dVcmxMaW5rID0gYC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdhc3NldC1ob2xkZXInPlxuICAgICAgPExpbmsgdG89e3Nob3dVcmxMaW5rfSA+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Fzc2V0LXByZXZpZXcnfVxuICAgICAgICAgICAgICAgICAgc3JjPXtkaXJlY3RTb3VyY2VMaW5rfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Fzc2V0LXByZXZpZXcgdmlkZW8nfVxuICAgICAgICAgICAgICAgICAgc3JjPXt0aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cD51bnN1cHBvcnRlZCBmaWxlIHR5cGU8L3A+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpfVxuICAgICAgPC9MaW5rPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRQcmV2aWV3O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGU6IHsgaG9zdCwgdGl0bGUgfSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9zdCxcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY2xhc3MgRm91ck9oRm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3RpdGxlLCBob3N0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgPHRpdGxlPnt0aXRsZX0gLSA0MDQ8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD0nY2Fub25pY2FsJyBocmVmPXtgJHtob3N0fS80MDRgfSAvPlxuICAgICAgICA8L0hlbG1ldD5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8aDI+NDA0PC9oMj5cbiAgICAgICAgICA8cD5UaGF0IHBhZ2UgZG9lcyBub3QgZXhpc3Q8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRm91ck9oRm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4IiwiY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCBzZW5kRW1iZWRQYWdlID0gKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgLy8gZ2V0IGFuZCByZW5kZXIgdGhlIGNvbnRlbnRcbiAgcmVzLnN0YXR1cygyMDApLnJlbmRlcignZW1iZWQnLCB7IGxheW91dDogJ2VtYmVkJywgaG9zdCwgY2xhaW1JZCwgbmFtZSB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZEVtYmVkUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZEVtYmVkUGFnZS5qcyIsImNvbnN0IHJlZGlyZWN0ID0gKHJvdXRlKSA9PiB7XG4gIHJldHVybiAocmVxLCByZXMpID0+IHtcbiAgICByZXMuc3RhdHVzKDMwMSkucmVkaXJlY3Qocm91dGUpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZWRpcmVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJjb25zdCBzZXJ2ZUFzc2V0QnlDbGFpbSA9IHJlcXVpcmUoJy4vc2VydmVBc3NldEJ5Q2xhaW0nKTtcbmNvbnN0IHNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSA9IHJlcXVpcmUoJy4vc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCwgZGIpID0+IHtcbiAgYXBwLmdldCgnLzppZGVudGlmaWVyLzpjbGFpbScsIHNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSk7XG4gIGFwcC5nZXQoJy86Y2xhaW0nLCBzZXJ2ZUFzc2V0QnlDbGFpbSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7IGRldGVybWluZVJlc3BvbnNlVHlwZSwgbG9nUmVxdWVzdERhdGEsIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IH0gPSByZXF1aXJlKCdoZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxuLypcblxuICByb3V0ZSB0byBzZXJ2ZSBhbiBhc3NldCBvciB0aGUgcmVhY3QgYXBwIHZpYSB0aGUgY2xhaW0gbmFtZSBvbmx5XG5cbiovXG5cbmNvbnN0IHNlcnZlckFzc2V0QnlDbGFpbSA9IChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gIH1cbiAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgLy8gcGFyc2UgdGhlIGNsYWltXG4gIGxldCBjbGFpbU5hbWU7XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWV9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBudWxsLCBudWxsKTtcbiAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQobnVsbCwgbnVsbCwgY2xhaW1OYW1lLCBudWxsLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZlckFzc2V0QnlDbGFpbTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUNsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBvblJlcXVlc3RFcnJvciwgb25OZXdDaGFubmVsUmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgbmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19hc3NldCc7XG5pbXBvcnQgeyBuZXdDaGFubmVsUmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfY2hhbm5lbCc7XG5pbXBvcnQgbGJyeVVyaSBmcm9tICd1dGlscy9sYnJ5VXJpJztcblxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSAobW9kaWZpZXIsIGNsYWltKSB7XG4gIC8vIHRoaXMgaXMgYSByZXF1ZXN0IGZvciBhbiBhc3NldFxuICAvLyBjbGFpbSB3aWxsIGJlIGFuIGFzc2V0IGNsYWltXG4gIC8vIHRoZSBpZGVudGlmaWVyIGNvdWxkIGJlIGEgY2hhbm5lbCBvciBhIGNsYWltIGlkXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCwgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKG1vZGlmaWVyKSk7XG4gICAgKHsgY2xhaW1OYW1lLCBleHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBleHRlbnNpb24pKTtcbiAgfTtcbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgY2xhaW1JZCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IChjbGFpbSkge1xuICAvLyB0aGlzIGNvdWxkIGJlIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXQgb3IgYSBjaGFubmVsIHBhZ2VcbiAgLy8gY2xhaW0gY291bGQgYmUgYW4gYXNzZXQgY2xhaW0gb3IgYSBjaGFubmVsIGNsYWltXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIoY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICAvLyByZXR1cm4gZWFybHkgaWYgdGhpcyByZXF1ZXN0IGlzIGZvciBhIGNoYW5uZWxcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0NoYW5uZWxSZXF1ZXN0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkpO1xuICB9XG4gIC8vIGlmIG5vdCBmb3IgYSBjaGFubmVsLCBwYXJzZSB0aGUgY2xhaW0gcmVxdWVzdFxuICBsZXQgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWUsIGV4dGVuc2lvbn0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogaGFuZGxlU2hvd1BhZ2VVcmkgKGFjdGlvbikge1xuICBjb25zdCB7IGlkZW50aWZpZXIsIGNsYWltIH0gPSBhY3Rpb24uZGF0YTtcbiAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSwgaWRlbnRpZmllciwgY2xhaW0pO1xuICB9XG4gIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVDbGFpbU9ubHksIGNsYWltKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoSGFuZGxlU2hvd1BhZ2VVcmkgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLCBoYW5kbGVTaG93UGFnZVVyaSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpLmpzIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCBzZWxlY3QsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QsIG9uUmVxdWVzdEVycm9yLCBvblJlcXVlc3RVcGRhdGUsIGFkZEFzc2V0VG9Bc3NldExpc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgZ2V0TG9uZ0NsYWltSWQsIGdldFNob3J0SWQsIGdldENsYWltRGF0YSB9IGZyb20gJ2FwaS9hc3NldEFwaSc7XG5pbXBvcnQgeyBzZWxlY3RTaG93U3RhdGUgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RTaXRlSG9zdCB9IGZyb20gJ3NlbGVjdG9ycy9zaXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3QXNzZXRSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBuYW1lLCBtb2RpZmllciB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGxvbmcgaWQgJiYgYWRkIHJlcXVlc3QgdG8gcmVxdWVzdCBsaXN0XG4gIGxldCBsb25nSWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBsb25nSWR9ID0geWllbGQgY2FsbChnZXRMb25nQ2xhaW1JZCwgaG9zdCwgbmFtZSwgbW9kaWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICBjb25zdCBhc3NldEtleSA9IGBhIyR7bmFtZX0jJHtsb25nSWR9YDtcbiAgeWllbGQgcHV0KGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0KHJlcXVlc3RJZCwgbnVsbCwgYXNzZXRLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBhc3NldD9cbiAgLy8gSWYgdGhpcyBhc3NldCBpcyBpbiB0aGUgYXNzZXQgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuYXNzZXRMaXN0W2Fzc2V0S2V5XSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBzaG9ydCBJZFxuICBsZXQgc2hvcnRJZDtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IHNob3J0SWR9ID0geWllbGQgY2FsbChnZXRTaG9ydElkLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBnZXQgYXNzZXQgY2xhaW0gZGF0YVxuICBsZXQgY2xhaW1EYXRhO1xuICB0cnkge1xuICAgICh7ZGF0YTogY2xhaW1EYXRhfSA9IHlpZWxkIGNhbGwoZ2V0Q2xhaW1EYXRhLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBhZGQgYXNzZXQgdG8gYXNzZXQgbGlzdFxuICB5aWVsZCBwdXQoYWRkQXNzZXRUb0Fzc2V0TGlzdChhc3NldEtleSwgbnVsbCwgbmFtZSwgbG9uZ0lkLCBzaG9ydElkLCBjbGFpbURhdGEpKTtcbiAgLy8gY2xlYXIgYW55IGVycm9ycyBpbiByZXF1ZXN0IGVycm9yXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0Fzc2V0UmVxdWVzdCAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5BU1NFVF9SRVFVRVNUX05FVywgbmV3QXNzZXRSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9uZ0NsYWltSWQgKGhvc3QsIG5hbWUsIG1vZGlmaWVyKSB7XG4gIGxldCBib2R5ID0ge307XG4gIC8vIGNyZWF0ZSByZXF1ZXN0IHBhcmFtc1xuICBpZiAobW9kaWZpZXIpIHtcbiAgICBpZiAobW9kaWZpZXIuaWQpIHtcbiAgICAgIGJvZHlbJ2NsYWltSWQnXSA9IG1vZGlmaWVyLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5WydjaGFubmVsTmFtZSddID0gbW9kaWZpZXIuY2hhbm5lbC5uYW1lO1xuICAgICAgYm9keVsnY2hhbm5lbENsYWltSWQnXSA9IG1vZGlmaWVyLmNoYW5uZWwuaWQ7XG4gICAgfVxuICB9XG4gIGJvZHlbJ2NsYWltTmFtZSddID0gbmFtZTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfTtcbiAgLy8gY3JlYXRlIHVybFxuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vbG9uZy1pZGA7XG4gIC8vIHJldHVybiB0aGUgcmVxdWVzdCBwcm9taXNlXG4gIHJldHVybiBSZXF1ZXN0KHVybCwgcGFyYW1zKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaG9ydElkIChob3N0LCBuYW1lLCBjbGFpbUlkKSB7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9zaG9ydC1pZC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYWltRGF0YSAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vZGF0YS8ke25hbWV9LyR7Y2xhaW1JZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvYXNzZXRBcGkuanMiLCJpbXBvcnQge2NhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QsIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCB1cGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldENoYW5uZWxDbGFpbXMsIGdldENoYW5uZWxEYXRhIH0gZnJvbSAnYXBpL2NoYW5uZWxBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0NoYW5uZWxSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0gPSBhY3Rpb24uZGF0YTtcbiAgLy8gcHV0IGFuIGFjdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgaW4gcmVkdXhcbiAgeWllbGQgcHV0KG9uUmVxdWVzdFVwZGF0ZShyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgcmVxdWVzdD9cbiAgLy8gSWYgdGhpcyB1cmkgaXMgaW4gdGhlIHJlcXVlc3QgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBjb25zdCBzdGF0ZSA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaG93U3RhdGUpO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBsb25nIGlkXG4gIGxldCBsb25nSWQsIHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHsgZGF0YToge2xvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0lkLCBzaG9ydENoYW5uZWxDbGFpbUlkOiBzaG9ydElkfSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsRGF0YSwgaG9zdCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHN0b3JlIHRoZSByZXF1ZXN0IGluIHRoZSBjaGFubmVsIHJlcXVlc3RzIGxpc3RcbiAgY29uc3QgY2hhbm5lbEtleSA9IGBjIyR7Y2hhbm5lbE5hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGNoYW5uZWxLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBjaGFubmVsP1xuICAvLyBJZiB0aGlzIGNoYW5uZWwgaXMgaW4gdGhlIGNoYW5uZWwgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBjbGFpbXMgZGF0YVxuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIGhvc3QsIGxvbmdJZCwgY2hhbm5lbE5hbWUsIDEpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgY2hhbm5lbCBkYXRhIGluIHRoZSBjaGFubmVsIGxpc3RcbiAgeWllbGQgcHV0KGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0KGNoYW5uZWxLZXksIGNoYW5uZWxOYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpKTtcbiAgLy8gY2xlYXIgYW55IHJlcXVlc3QgZXJyb3JzXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3Q2hhbm5lbFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVywgbmV3Q2hhbm5lbFJlcXVlc3QpO1xufTtcblxuZnVuY3Rpb24gKiBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsIChhY3Rpb24pIHtcbiAgY29uc3QgeyBjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UgfSA9IGFjdGlvbi5kYXRhO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBwdXQodXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBjbGFpbXNEYXRhKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsIGdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfY2hhbm5lbC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbERhdGEgKGhvc3QsIGlkLCBuYW1lKSB7XG4gIGlmICghaWQpIGlkID0gJ25vbmUnO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9kYXRhLyR7bmFtZX0vJHtpZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxDbGFpbXMgKGhvc3QsIGxvbmdJZCwgbmFtZSwgcGFnZSkge1xuICBpZiAoIXBhZ2UpIHBhZ2UgPSAxO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9jbGFpbXMvJHtuYW1lfS8ke2xvbmdJZH0vJHtwYWdlfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleCAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgYWZ0ZXIgXCJAXCIuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogXCIke25hbWVCYWRDaGFycy5qb2luKCcsICcpfVwiLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZDogY2hhbm5lbENsYWltSWQgfHwgbnVsbCxcbiAgICAgIGNsYWltSWQgICAgICAgOiBjbGFpbUlkIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBleHRlbnNpb24pXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gZXh0ZW5zaW9uIHNlcGFyYXRvciwgZXh0ZW5zaW9uIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIGV4dGVuc2lvblNlcGVyYXRvciwgZXh0ZW5zaW9uXSA9IGNvbXBvbmVudHNSZWdleCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuZXhlYyhuYW1lKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVjayB5b3VyIFVSTC4gIE5vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiLlwiJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgZXh0ZW5zaW9uXG4gICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvcikge1xuICAgICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7ZXh0ZW5zaW9uU2VwZXJhdG9yfVwiLmApO1xuICAgICAgfVxuICAgICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBUaGUgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIiBzZXBhcmF0b3IgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZS5gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICAgIGV4dGVuc2lvbjogZXh0ZW5zaW9uIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsImNvbnN0IHsgc2VuZEdBU2VydmVFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MnKTtcbmNvbnN0IHtcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlLFxuICBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5LFxuICBsb2dSZXF1ZXN0RGF0YSxcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQsXG59ID0gcmVxdWlyZSgnaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxuLypcblxuICByb3V0ZSB0byBzZXJ2ZSBhbiBhc3NldCBvciB0aGUgcmVhY3QgYXBwIHZpYSB0aGUgY2xhaW0gbmFtZSBhbmQgYW4gaWRlbnRpZmllclxuXG4qL1xuXG5jb25zdCBzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltID0gKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgfVxuICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgbGV0IGNsYWltTmFtZTtcbiAgdHJ5IHtcbiAgICAoeyBjbGFpbU5hbWUgfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gcGFyc2UgdGhlIGlkZW50aWZpZXJcbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihwYXJhbXMuaWRlbnRpZmllcikpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBpZiAoIWlzQ2hhbm5lbCkge1xuICAgIFtjbGFpbUlkLCBjbGFpbU5hbWVdID0gZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eShjbGFpbUlkLCBjbGFpbU5hbWUpO1xuICB9XG4gIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKTtcbiAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xyXG4gIGFwcC5nZXQoJyonLCBoYW5kbGVQYWdlUmVxdWVzdCk7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svaW5kZXguanMiLCJjb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5jb25zdCBzZW5kUmVhY3RBcHAgPSAocmVxLCByZXMpID0+IHtcbiAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRSZWFjdEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==