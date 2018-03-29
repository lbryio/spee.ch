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
  this.configure = function (config) {
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
  this.configure = function (config) {
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

function Server() {
  var _this = this;

  this.configureLogger = function (loggerConfig) {
    __webpack_require__(63).configure(loggerConfig);
  };
  this.configureMysql = function (mysqlConfig) {
    __webpack_require__(7).configure(mysqlConfig);
  };
  this.configureSiteDetails = function (siteConfig) {
    __webpack_require__(4).configure(siteConfig);
    _this.sessionKey = siteConfig.auth.sessionKey;
    _this.PORT = siteConfig.details.port;
  };
  this.configureSlack = function (slackConfig) {
    __webpack_require__(64).configure(slackConfig);
  };
  this.configureClientBundle = function () {
    logger.info('configure the client here by passing in the bundle and configuring it, or better yet: taking in the components to use dynamically from here.');
  };
  this.configureModels = function () {
    logger.info('here is where you could add/overwrite the default models');
  };
  this.configureRoutes = function () {
    logger.info('here is where you could add/overwrite the default routes');
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
    app.use(cookieSession({
      name: 'session',
      keys: [_this.sessionKey],
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
  this.configure = function (config) {
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
  this.configure = function (config) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzJjZmRmMjFjNGE0ZmIwYjgwNTYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiIiwid2VicGFjazovLy8uL3NwZWVjaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZ2FcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvSG9tZVBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoUHJldmlldy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsIm9yaWdpbmFsVXJsIiwiaXAiLCJlcnJvciIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJqc29uIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwiZXJyIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJrZXkiLCJzdWNjZXNzIiwiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiY29udGFpbmVycyIsInBhZ2VzIiwiZGV0YWlscyIsImhvc3QiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwiY29uZmlndXJlIiwiY29uZmlnIiwid2FybiIsImluZm8iLCJzZWxlY3RGaWxlIiwiY2xlYXJGaWxlIiwidXBkYXRlTWV0YWRhdGEiLCJ1cGRhdGVDbGFpbSIsInNldFB1Ymxpc2hJbkNoYW5uZWwiLCJ1cGRhdGVQdWJsaXNoU3RhdHVzIiwidXBkYXRlRXJyb3IiLCJ1cGRhdGVTZWxlY3RlZENoYW5uZWwiLCJ0b2dnbGVNZXRhZGF0YUlucHV0cyIsIm9uTmV3VGh1bWJuYWlsIiwic3RhcnRQdWJsaXNoIiwiYWN0aW9ucyIsImZpbGUiLCJ0eXBlIiwiRklMRV9TRUxFQ1RFRCIsImRhdGEiLCJGSUxFX0NMRUFSIiwibmFtZSIsInZhbHVlIiwiTUVUQURBVEFfVVBEQVRFIiwiQ0xBSU1fVVBEQVRFIiwiY2hhbm5lbCIsIlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwiLCJQVUJMSVNIX1NUQVRVU19VUERBVEUiLCJFUlJPUl9VUERBVEUiLCJjaGFubmVsTmFtZSIsIlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFIiwic2hvd01ldGFkYXRhSW5wdXRzIiwiVE9HR0xFX01FVEFEQVRBX0lOUFVUUyIsIlRIVU1CTkFJTF9ORVciLCJoaXN0b3J5IiwiUFVCTElTSF9TVEFSVCIsIm15c3FsIiwiZGF0YWJhc2UiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibWFwU3RhdGVUb1Byb3BzIiwic2l0ZSIsImxvZ2dlZEluQ2hhbm5lbCIsImNoYW5uZWxTaG9ydElkIiwic2hvcnRJZCIsImNoYW5uZWxMb25nSWQiLCJsb25nSWQiLCJzaXRlRGVzY3JpcHRpb24iLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJvbkNoYW5uZWxMb2dpbiIsImRpc3BhdGNoIiwib25DaGFubmVsTG9nb3V0Iiwib25IYW5kbGVTaG93UGFnZVVyaSIsIm9uUmVxdWVzdEVycm9yIiwib25OZXdDaGFubmVsUmVxdWVzdCIsIm9uTmV3QXNzZXRSZXF1ZXN0Iiwib25SZXF1ZXN0VXBkYXRlIiwiYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QiLCJhZGRBc3NldFRvQXNzZXRMaXN0IiwiYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QiLCJvblVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJ1cGRhdGVDaGFubmVsQ2xhaW1zIiwiZmlsZVJlcXVlc3RlZCIsInVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkiLCJ1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciIsInBhcmFtcyIsIkhBTkRMRV9TSE9XX1VSSSIsIlJFUVVFU1RfRVJST1IiLCJjaGFubmVsSWQiLCJyZXF1ZXN0VHlwZSIsInJlcXVlc3RJZCIsIkNIQU5ORUxfUkVRVUVTVF9ORVciLCJpZCIsImV4dGVuc2lvbiIsIkFTU0VUX1JFUVVFU1RfTkVXIiwibW9kaWZpZXIiLCJSRVFVRVNUX1VQREFURSIsIlJFUVVFU1RfTElTVF9BREQiLCJjbGFpbUlkIiwiY2xhaW1EYXRhIiwiQVNTRVRfQUREIiwiY2xhaW1zRGF0YSIsIkNIQU5ORUxfQUREIiwiY2hhbm5lbEtleSIsInBhZ2UiLCJDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMiLCJjaGFubmVsTGlzdElkIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MiLCJGSUxFX1JFUVVFU1RFRCIsIkZJTEVfQVZBSUxBQklMSVRZX1VQREFURSIsIkRJU1BMQVlfQVNTRVRfRVJST1IiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiZXZlbnRDYXRlZ29yeSIsImV2ZW50QWN0aW9uIiwiZXZlbnRMYWJlbCIsImlwT3ZlcnJpZGUiLCJ1c2VyQWdlbnRPdmVycmlkZSIsImNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyIsImNhdGVnb3J5IiwidmFyaWFibGUiLCJsYWJlbCIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJkdXJhdGlvbiIsInVzZXJUaW1pbmdDYXRlZ29yeSIsInVzZXJUaW1pbmdWYXJpYWJsZU5hbWUiLCJ1c2VyVGltaW5nVGltZSIsInVzZXJUaW1pbmdMYWJlbCIsInNlbmRHb29nbGVBbmFseXRpY3NFdmVudCIsInZpc2l0b3JJZCIsInJlcGxhY2UiLCJ2aXNpdG9yIiwic3RyaWN0Q2lkRm9ybWF0IiwiaHR0cHMiLCJldmVudCIsInNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmciLCJ0aW1pbmciLCJkZWJ1ZyIsInNlbmRHQVNlcnZlRXZlbnQiLCJzZW5kR0FUaW1pbmdFdmVudCIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsImNoYW5uZWxfbmFtZSIsImNoYW5uZWxfaWQiLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsIlNlcXVlbGl6ZSIsInNlcXVlbGl6ZSIsImRpYWxlY3QiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwibG9nZ2luZyIsInBvb2wiLCJtYXgiLCJtaW4iLCJpZGxlIiwiYWNxdWlyZSIsImF1dGhlbnRpY2F0ZSIsInRoZW4iLCJjYXRjaCIsImRiIiwiaW1wb3J0IiwibW9kZWxOYW1lIiwiYXNzb2NpYXRlIiwidXBzZXJ0IiwiTW9kZWwiLCJ2YWx1ZXMiLCJjb25kaXRpb24iLCJ0YWJsZU5hbWUiLCJmaW5kT25lIiwid2hlcmUiLCJvYmoiLCJ1cGRhdGUiLCJjcmVhdGUiLCJkZWZhdWx0RGVzY3JpcHRpb24iLCJkZWZhdWx0VGh1bWJuYWlsIiwic2l0ZUhvc3QiLCJzaXRlVGl0bGUiLCJzaXRlVHdpdHRlciIsInJlcXVlc3QiLCJwYXJzZUpTT04iLCJyZXNwb25zZSIsImNoZWNrU3RhdHVzIiwianNvblJlc3BvbnNlIiwiRXJyb3IiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJQcm9taXNlIiwiYWxsIiwiYXhpb3MiLCJhcGkiLCJhcGlIb3N0IiwiYXBpUG9ydCIsImxicnlBcGlVcmkiLCJoYW5kbGVMYnJ5bmV0UmVzcG9uc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwiSlNPTiIsInN0cmluZ2lmeSIsInB1Ymxpc2hDbGFpbSIsInB1Ymxpc2hQYXJhbXMiLCJnYVN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJwb3N0IiwibWV0aG9kIiwiZ2V0Q2xhaW0iLCJ1cmkiLCJ0aW1lb3V0IiwiZ2V0Q2xhaW1MaXN0IiwiY2xhaW1OYW1lIiwicmVzb2x2ZVVyaSIsImdldERvd25sb2FkRGlyZWN0b3J5IiwiZG93bmxvYWRfZGlyZWN0b3J5IiwiY3JlYXRlQ2hhbm5lbCIsImFtb3VudCIsInNlbGVjdEFzc2V0Iiwic2hvdyIsInJlcXVlc3RMaXN0IiwiYXNzZXRLZXkiLCJhc3NldExpc3QiLCJzZWxlY3RTaG93U3RhdGUiLCJzdGF0ZSIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImNoYW5uZWxDbGFpbUlkIiwiZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCIsImdldENsYWltSWRCeUNsYWltIiwiZ2V0TG9uZ0NsYWltSWQiLCJsb25nQ2xhaW1JZCIsImdldExvbmdDaGFubmVsSWQiLCJsb25nQ2hhbm5lbElkIiwiZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCIsImdldENoYW5uZWxEYXRhIiwibG9uZ0NoYW5uZWxDbGFpbUlkIiwiZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCIsInNob3J0Q2hhbm5lbENsYWltSWQiLCJnZXRDaGFubmVsQ2xhaW1zIiwiZ2V0QWxsQ2hhbm5lbENsYWltcyIsImNoYW5uZWxDbGFpbXNBcnJheSIsInBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSIsImdldExvY2FsRmlsZVJlY29yZCIsImRhdGFWYWx1ZXMiLCJwYXNzcG9ydCIsImxvY2FsTG9naW5TdHJhdGVneSIsImxvY2FsU2lnbnVwU3RyYXRlZ3kiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVVc2VyIiwic2VyaWFsaXplVXNlciIsInVzZSIsImxicnlBcGkiLCJwdWJsaXNoSGVscGVycyIsIk9wIiwicHVibGlzaCIsImZpbGVOYW1lIiwiZmlsZVR5cGUiLCJwdWJsaXNoUmVzdWx0cyIsImNlcnRpZmljYXRlSWQiLCJ0eCIsImZpbGVSZWNvcmQiLCJjbGFpbV9pZCIsIm1ldGFkYXRhIiwiYWRkcmVzcyIsImNsYWltX2FkZHJlc3MiLCJvdXRwb2ludCIsInR4aWQiLCJub3V0IiwiaGVpZ2h0IiwiZmlsZVBhdGgiLCJmaWxlX3BhdGgiLCJuc2Z3IiwiY2xhaW1SZWNvcmQiLCJjb250ZW50VHlwZSIsImJpZCIsInVwc2VydENyaXRlcmlhIiwiY2xhaW0iLCJzZXRDbGFpbSIsInNldEZpbGUiLCJkZWxldGVUZW1wb3JhcnlGaWxlIiwiY2xhaW1OYW1lSXNBdmFpbGFibGUiLCJjbGFpbUFkZHJlc3NlcyIsInB1c2giLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsIm9yIiwiY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IiwiZnMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSIsImxpY2Vuc2UiLCJpbnZhbGlkTmFtZUNoYXJhY3RlcnMiLCJleGVjIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwicGF0aCIsInNpemUiLCJ0ZXN0IiwidmFsaWRhdGVGaWxlVHlwZUFuZFNpemUiLCJ0aHVtYm5haWxGaWxlTmFtZSIsInRodW1ibmFpbEZpbGVQYXRoIiwidGh1bWJuYWlsRmlsZVR5cGUiLCJjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMiLCJ0cmltIiwiYXV0aG9yIiwibGFuZ3VhZ2UiLCJjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zIiwidW5saW5rIiwiYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEiLCJmaWxlSW5mbyIsImdldFJlc3VsdCIsImZpbGVfbmFtZSIsImRvd25sb2FkX3BhdGgiLCJjcmVhdGVGaWxlRGF0YSIsInVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCIsIkNIQU5ORUxfVVBEQVRFIiwiUHJvZ3Jlc3NCYXIiLCJwcm9wcyIsImJhcnMiLCJpbmRleCIsImluY3JlbWVudGVyIiwiY3JlYXRlQmFycyIsImJpbmQiLCJzdGFydFByb2dyZXNzQmFyIiwidXBkYXRlUHJvZ3Jlc3NCYXIiLCJzdG9wUHJvZ3Jlc3NCYXIiLCJpIiwiaXNBY3RpdmUiLCJzZXRTdGF0ZSIsInVwZGF0ZUludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwibWFwIiwiYmFyIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsIkVycm9yUGFnZSIsInN0cmluZyIsInJldHVyblNob3J0SWQiLCJjbGFpbXNBcnJheSIsImNsYWltSW5kZXgiLCJzdWJzdHJpbmciLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwiZWxlbWVudCIsInBvc3NpYmxlTWF0Y2hlcyIsInNsaWNlIiwiZmlsdGVyIiwicmVxIiwiY29udGV4dCIsInN0b3JlIiwiaHRtbCIsImhlbG1ldCIsInJlbmRlclN0YXRpYyIsInJlZGlyZWN0IiwicHJlbG9hZGVkU3RhdGUiLCJnZXRTdGF0ZSIsInNlbmQiLCJMT0dJTiIsIkNSRUFURSIsIkxPQ0FMX0NIRUNLIiwiVU5BVkFJTEFCTEUiLCJFUlJPUiIsIkFWQUlMQUJMRSIsImluaXRpYWxpemUiLCJHQUxpc3RlbmVyIiwic2VuZFBhZ2VWaWV3IiwibG9jYXRpb24iLCJsaXN0ZW4iLCJzZXQiLCJwYXRobmFtZSIsInBhZ2V2aWV3IiwiY2hpbGRyZW4iLCJBcHAiLCJmaWxlRXJyb3IiLCJzZXRGaWxlRXJyb3IiLCJDSEFOTkVMIiwiQVNTRVRfTElURSIsIkFTU0VUX0RFVEFJTFMiLCJkaXNwbGF5QXNzZXQiLCJhc3NldCIsIm9uRmlsZVJlcXVlc3QiLCJ0b1N0cmluZyIsIm1ldGEiLCJsaW5rIiwiU0VSVkUiLCJTSE9XIiwiY2xpZW50QWNjZXB0c0h0bWwiLCJhY2NlcHQiLCJtYXRjaCIsInJlcXVlc3RJc0Zyb21Ccm93c2VyIiwiY2xpZW50V2FudHNBc3NldCIsInJhbmdlIiwiaW1hZ2VJc1dhbnRlZCIsInZpZGVvSXNXYW50ZWQiLCJpc1ZhbGlkQ2xhaW1JZCIsImlzVmFsaWRTaG9ydElkIiwiaXNWYWxpZFNob3J0SWRPckNsYWltSWQiLCJpbnB1dCIsInNlcnZlQXNzZXRUb0NsaWVudCIsInZlcmJvc2UiLCJzZW5kRmlsZU9wdGlvbnMiLCJzZW5kRmlsZSIsImdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IiwiZnVsbENsYWltSWQiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicmVzcG9uc2VUeXBlIiwiZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSIsImlkZW50aWZpZXIiLCJ0ZW1wTmFtZSIsImxvZ1JlcXVlc3REYXRhIiwiUkVHRVhQX0lOVkFMSURfQ0xBSU0iLCJSRUdFWFBfSU5WQUxJRF9DSEFOTkVMIiwiUkVHRVhQX0FERFJFU1MiLCJDSEFOTkVMX0NIQVIiLCJwYXJzZUlkZW50aWZpZXIiLCJjb21wb25lbnRzUmVnZXgiLCJSZWdFeHAiLCJwcm90byIsIm1vZGlmaWVyU2VwZXJhdG9yIiwiaXNDaGFubmVsIiwic3RhcnRzV2l0aCIsIm5hbWVCYWRDaGFycyIsImpvaW4iLCJwYXJzZUNsYWltIiwicGFyc2VNb2RpZmllciIsInJldHVyblNhZ2FXaXRoUGFyYW1zIiwic2FnYSIsInNhZ2FNaWRkbGV3YXJlIiwibWlkZGxld2FyZSIsImFjdGlvbiIsInJ1biIsImRvbmUiLCJzZWxlY3RTaXRlU3RhdGUiLCJzZWxlY3RTaXRlSG9zdCIsIlNlcnZlciIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJyZXF1ZXN0TG9nZ2VyIiwiY29uZmlndXJlTG9nZ2VyIiwibG9nZ2VyQ29uZmlnIiwiY29uZmlndXJlTXlzcWwiLCJteXNxbENvbmZpZyIsImNvbmZpZ3VyZVNpdGVEZXRhaWxzIiwic2l0ZUNvbmZpZyIsIlBPUlQiLCJjb25maWd1cmVTbGFjayIsInNsYWNrQ29uZmlnIiwiY29uZmlndXJlQ2xpZW50QnVuZGxlIiwiY29uZmlndXJlTW9kZWxzIiwiY29uZmlndXJlUm91dGVzIiwiY3JlYXRlQXBwIiwiYXBwIiwiZW5hYmxlIiwic3RhdGljIiwiX19kaXJuYW1lIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwic3BlZWNoUGFzc3BvcnQiLCJtYXhBZ2UiLCJzZXNzaW9uIiwiaGJzIiwiZGVmYXVsdExheW91dCIsImhhbmRsZWJhcnMiLCJlbmdpbmUiLCJzZXJ2ZXIiLCJzdGFydCIsInN5bmMiLCJuZXh0IiwiTG9nZ2VyQ29uZmlnIiwibG9nTGV2ZWwiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwidXNlckluZm8iLCJ1c2VyTmFtZSIsImdldENoYW5uZWwiLCJzaG9ydENoYW5uZWxJZCIsInVzZXJuYW1lRmllbGQiLCJwYXNzd29yZEZpZWxkIiwidXNlciIsImNvbXBhcmVQYXNzd29yZCIsImlzTWF0Y2giLCJ1c2VyRGF0YSIsImNoYW5uZWxEYXRhIiwiY2VydGlmaWNhdGVEYXRhIiwibmV3VXNlciIsIm5ld0NoYW5uZWwiLCJuZXdDZXJ0aWZpY2F0ZSIsInNldENoYW5uZWwiLCJzZXRVc2VyIiwibGJyeUNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTaWdudXBSZXF1ZXN0IiwiaGFuZGxlTG9naW5SZXF1ZXN0IiwiaGFuZGxlTG9nb3V0UmVxdWVzdCIsImhhbmRsZVVzZXJSZXF1ZXN0IiwiZ2V0Iiwic2lnbnVwIiwibG9naW4iLCJsb2dJbiIsImxvZ291dCIsImNoYW5uZWxBdmFpbGFiaWxpdHkiLCJjaGFubmVsQ2xhaW1zIiwiY2xhaW1BdmFpbGFiaWxpdHkiLCJjbGFpbUdldCIsImNsYWltTG9uZ0lkIiwiY2xhaW1QdWJsaXNoIiwiY2xhaW1SZXNvbHZlIiwiY2xhaW1TaG9ydElkIiwiY2xhaW1MaXN0IiwiZmlsZUF2YWlsYWJpbGl0eSIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJhdmFpbGFibGVOYW1lIiwiYm9keSIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsImNoYW5uZWxTaG9ydElkUm91dGUiLCJTVFJJTkciLCJCT09MRUFOIiwiSU5URUdFUiIsIlRFWFQiLCJERUNJTUFMIiwiZGVmaW5lIiwiZGVmYXVsdCIsImNsYWltU2VxdWVuY2UiLCJkZWNvZGVkQ2xhaW0iLCJkZXB0aCIsImVmZmVjdGl2ZUFtb3VudCIsImhhc1NpZ25hdHVyZSIsImhleCIsInZhbGlkQXRIZWlnaHQiLCJ2YWx1ZVZlcnNpb24iLCJjbGFpbVR5cGUiLCJjZXJ0aWZpY2F0ZVZlcnNpb24iLCJrZXlUeXBlIiwicHVibGljS2V5IiwiZnJlZXplVGFibGVOYW1lIiwiYmVsb25nc1RvIiwiZm9yZWlnbktleSIsImFsbG93TnVsbCIsIm9yZGVyIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCIsIiRsaWtlIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSIsInZhbGlkYXRlTG9uZ0NoYW5uZWxJZCIsImhhc09uZSIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2UiLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwiY2xhaW1JbmZvIiwicmVzb2x2ZVJlc3VsdCIsImZpbGVEYXRhIiwiY29tcGxldGVkIiwiYXV0aGVudGljYXRlVXNlciIsImZpbGVzIiwiY2hhbm5lbFBhc3N3b3JkIiwidmFsaWRhdGVkQ2xhaW1OYW1lIiwidGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImxicnlUeCIsImF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyIsInVzZXJQYXNzd29yZCIsImNoYW5uZWxGaW5kUGFyYW1zIiwicmVzb2x2ZWRVcmkiLCJjbGFpbXNMaXN0IiwibXVsdGlwYXJ0IiwidXBsb2FkRGlyIiwiaGFuZGxlUGFnZVJlcXVlc3QiLCJoYW5kbGVFbWJlZFJlcXVlc3QiLCJoYW5kbGVQYWdlUmVuZGVyIiwic2VuZFJlYWN0QXBwIiwiaW5pdGlhbFN0YXRlIiwiYXNzaWduIiwicHVibGlzaEluQ2hhbm5lbCIsInNlbGVjdGVkQ2hhbm5lbCIsInB1Ymxpc2hTdWJtaXQiLCJjaGFubmVsTGlzdCIsImdvb2dsZUFuYWx5dGljc0lkIiwiSG9tZVBhZ2UiLCJTRU8iLCJwYWdlVXJpIiwicGFnZVRpdGxlIiwibWV0YVRhZ3MiLCJjYW5vbmljYWxMaW5rIiwicmVsIiwiaHJlZiIsIm9iamVjdCIsImNyZWF0ZVBhZ2VUaXRsZSIsImRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJmaWxlRXh0IiwibGFzdEluZGV4T2YiLCJjcmVhdGVCYXNpY01ldGFUYWdzIiwicHJvcGVydHkiLCJjb250ZW50IiwiY3JlYXRlQ2hhbm5lbE1ldGFUYWdzIiwiY3JlYXRlQXNzZXRNZXRhVGFncyIsImVtYmVkVXJsIiwic2hvd1VybCIsIm9nVGl0bGUiLCJvZ0Rlc2NyaXB0aW9uIiwib2dUaHVtYm5haWxDb250ZW50VHlwZSIsIm9nVGh1bWJuYWlsIiwiY3JlYXRlTWV0YVRhZ3MiLCJjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsiLCJjcmVhdGVBc3NldENhbm9uaWNhbExpbmsiLCJjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayIsImNyZWF0ZUNhbm9uaWNhbExpbmsiLCJWSUVXIiwiTE9HT1VUIiwiTmF2QmFyIiwiY2hlY2tGb3JMb2dnZWRJblVzZXIiLCJsb2dvdXRVc2VyIiwiaGFuZGxlU2VsZWN0aW9uIiwiY3JlZGVudGlhbHMiLCJ0YXJnZXQiLCJzZWxlY3RlZE9wdGlvbnMiLCJMb2dvIiwiTmF2QmFyQ2hhbm5lbERyb3Bkb3duIiwiZGVmYXVsdFNlbGVjdGlvbiIsIlB1Ymxpc2hUb29sIiwiRHJvcHpvbmUiLCJkcmFnT3ZlciIsIm1vdXNlT3ZlciIsImRpbVByZXZpZXciLCJoYW5kbGVEcm9wIiwiaGFuZGxlRHJhZ092ZXIiLCJoYW5kbGVEcmFnRW5kIiwiaGFuZGxlRHJhZ0VudGVyIiwiaGFuZGxlRHJhZ0xlYXZlIiwiaGFuZGxlTW91c2VFbnRlciIsImhhbmRsZU1vdXNlTGVhdmUiLCJoYW5kbGVDbGljayIsImhhbmRsZUZpbGVJbnB1dCIsImNob29zZUZpbGUiLCJwcmV2ZW50RGVmYXVsdCIsImR0IiwiZGF0YVRyYW5zZmVyIiwiaXRlbXMiLCJraW5kIiwiZHJvcHBlZEZpbGUiLCJnZXRBc0ZpbGUiLCJyZW1vdmUiLCJjbGVhckRhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xpY2siLCJmaWxlTGlzdCIsInZhbGlkYXRlRmlsZSIsIlB1Ymxpc2hQcmV2aWV3IiwiaW1nU291cmNlIiwic2V0UHJldmlld0ltYWdlU291cmNlIiwibmV3UHJvcHMiLCJzZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSIsInByZXZpZXdSZWFkZXIiLCJGaWxlUmVhZGVyIiwicmVhZEFzRGF0YVVSTCIsIm9ubG9hZGVuZCIsImJvb2wiLCJQdWJsaXNoRGV0YWlscyIsIm9uUHVibGlzaFN1Ym1pdCIsIm9uTWV0YWRhdGFDaGFuZ2UiLCJQdWJsaXNoVGl0bGVJbnB1dCIsImhhbmRsZUlucHV0IiwiZSIsImxvZ2dlZEluQ2hhbm5lbE5hbWUiLCJsb2dnZWRJbkNoYW5uZWxTaG9ydElkIiwidXJsRXJyb3IiLCJvbkNsYWltQ2hhbmdlIiwib25VcmxFcnJvciIsIlB1Ymxpc2hVcmxJbnB1dCIsInNldENsYWltTmFtZSIsInZhbGlkYXRlQ2xhaW0iLCJjbGVhbnNlSW5wdXQiLCJmaWxlTmFtZVdpdGhvdXRFbmRpbmciLCJjbGVhbkNsYWltTmFtZSIsIlVybE1pZGRsZSIsImRhdGFVUkl0b0Jsb2IiLCJkYXRhVVJJIiwiYnl0ZVN0cmluZyIsImF0b2IiLCJzcGxpdCIsIm1pbWVTdHJpbmciLCJpYSIsIlVpbnQ4QXJyYXkiLCJjaGFyQ29kZUF0IiwiQmxvYiIsIlB1Ymxpc2hUaHVtYm5haWxJbnB1dCIsInZpZGVvU291cmNlIiwic2xpZGVyTWluUmFuZ2UiLCJzbGlkZXJNYXhSYW5nZSIsInNsaWRlclZhbHVlIiwiaGFuZGxlVmlkZW9Mb2FkZWREYXRhIiwiaGFuZGxlU2xpZGVyQ2hhbmdlIiwiY3JlYXRlVGh1bWJuYWlsIiwic2V0VmlkZW9Tb3VyY2UiLCJuZXh0UHJvcHMiLCJkYXRhVXJpIiwiYmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInRvdGFsTWludXRlcyIsInRvdGFsU2Vjb25kcyIsInZpZGVvIiwiY3VycmVudFRpbWUiLCJjYW52YXMiLCJjcmVhdGVFbGVtZW50Iiwid2lkdGgiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwiZGF0YVVybCIsInRvRGF0YVVSTCIsInNuYXBzaG90IiwiZGlzcGxheSIsIm9uVG9nZ2xlTWV0YWRhdGFJbnB1dHMiLCJQdWJsaXNoTWV0YWRhdGFJbnB1dHMiLCJ0b2dnbGVTaG93SW5wdXRzIiwiaGFuZGxlU2VsZWN0IiwiY2hlY2tlZCIsInNlbGVjdGVkT3B0aW9uIiwibWF4SGVpZ2h0IiwiRXhwYW5kaW5nVGV4dGFyZWEiLCJfaGFuZGxlQ2hhbmdlIiwiYWRqdXN0VGV4dGFyZWEiLCJvbkNoYW5nZSIsImVsIiwic3R5bGUiLCJzY3JvbGxIZWlnaHQiLCJyZXN0IiwieCIsImZ1bmMiLCJjaGFubmVsRXJyb3IiLCJvblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2UiLCJvbkNoYW5uZWxTZWxlY3QiLCJzdGF0ZXMiLCJDaGFubmVsU2VsZWN0IiwidG9nZ2xlQW5vbnltb3VzUHVibGlzaCIsIkNoYW5uZWxMb2dpbkZvcm0iLCJsb2dpblRvQ2hhbm5lbCIsIkhlYWRlcnMiLCJDaGFubmVsQ3JlYXRlRm9ybSIsImhhbmRsZUNoYW5uZWxJbnB1dCIsImNsZWFuc2VDaGFubmVsSW5wdXQiLCJ1cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUiLCJjaGFubmVsV2l0aEF0U3ltYm9sIiwiY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQiLCJjaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSIsIm1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QiLCJBY3RpdmVTdGF0dXNCYXIiLCJJbmFjdGl2ZVN0YXR1c0JhciIsInB1Ymxpc2hTdGF0ZXMiLCJQdWJsaXNoU3RhdHVzIiwiTE9BRF9TVEFSVCIsIkxPQURJTkciLCJQVUJMSVNISU5HIiwiU1VDQ0VTUyIsIkZBSUxFRCIsIlB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UiLCJBYm91dFBhZ2UiLCJMb2dpblBhZ2UiLCJTaG93UGFnZSIsIlNob3dMaXRlIiwiQXNzZXREaXNwbGF5IiwiU2hvd0Fzc2V0RGV0YWlscyIsIkFzc2V0VGl0bGUiLCJBc3NldEluZm8iLCJjb3B5VG9DbGlwYm9hcmQiLCJlbGVtZW50VG9Db3B5IiwiZGF0YXNldCIsImVsZW1lbnR0b2NvcHkiLCJzZWxlY3QiLCJleGVjQ29tbWFuZCIsInByZXZpb3VzUmVxdWVzdCIsIlNob3dDaGFubmVsIiwiQ2hhbm5lbENsYWltc0Rpc3BsYXkiLCJzaG93TmV4dFJlc3VsdHNQYWdlIiwic2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UiLCJzaG93TmV3UGFnZSIsImRlZmF1bHRzIiwiQXNzZXRQcmV2aWV3IiwiZGlyZWN0U291cmNlTGluayIsInNob3dVcmxMaW5rIiwiRm91ck9oRm9yUGFnZSIsInNlbmRFbWJlZFBhZ2UiLCJyZW5kZXIiLCJsYXlvdXQiLCJyb3V0ZSIsInNlcnZlQXNzZXRCeUNsYWltIiwic2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltIiwibGJyeVVyaSIsImhhbmRsZVNob3dSZW5kZXIiLCJzZXJ2ZXJBc3NldEJ5Q2xhaW0iLCJoYW5kbGVTaG93UGFnZVVyaSIsIndhdGNoSGFuZGxlU2hvd1BhZ2VVcmkiLCJwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSIsInBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IiwibmV3QXNzZXRSZXF1ZXN0Iiwid2F0Y2hOZXdBc3NldFJlcXVlc3QiLCJnZXRTaG9ydElkIiwiZ2V0Q2xhaW1EYXRhIiwibmV3Q2hhbm5lbFJlcXVlc3QiLCJ3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hVcGRhdGVDaGFubmVsQ2xhaW1zIiwiZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCIsImV4dGVuc2lvblNlcGVyYXRvciIsInNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FB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LDBCQUF3QjVXLFdBQXhCLEVBQXFDMEwsY0FBckMsRUFBcURsQixTQUFyRCxFQUFnRXZILE9BQWhFLEVBQXlFM0gsV0FBekUsRUFBc0ZDLEVBQXRGLEVBQTBGRSxHQUExRjtBQUNELENBckNEOztBQXVDQU4sT0FBT0MsT0FBUCxHQUFpQjQ1QiwrQkFBakIsQzs7Ozs7Ozs7O0FDekRBLElBQU0vTyxvQkFBb0IsbUJBQUEvcUIsQ0FBUSxHQUFSLENBQTFCOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCLFVBQUM4ZSxHQUFELEVBQVM7QUFDeEJBLE1BQUlrRSxHQUFKLENBQVEsR0FBUixFQUFhNkgsaUJBQWI7QUFDRCxDQUZELEM7Ozs7Ozs7OztBQ0ZBLElBQU1FLG1CQUFtQixtQkFBQWpyQixDQUFRLEVBQVIsQ0FBekI7O0FBRUEsSUFBTWtyQixlQUFlLFNBQWZBLFlBQWUsQ0FBQy9TLEdBQUQsRUFBTTVYLEdBQU4sRUFBYztBQUNqQzBxQixtQkFBaUI5UyxHQUFqQixFQUFzQjVYLEdBQXRCO0FBQ0QsQ0FGRDs7QUFJQU4sT0FBT0MsT0FBUCxHQUFpQmdyQixZQUFqQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MmNmZGYyMWM0YTRmYjBiODA1NiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVFcnJvclJlc3BvbnNlOiBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBvbiAke29yaWdpbmFsVXJsfWAsIG1vZHVsZS5leHBvcnRzLnVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyhlcnJvcikpO1xuICAgIGNvbnN0IFtzdGF0dXMsIG1lc3NhZ2VdID0gbW9kdWxlLmV4cG9ydHMucmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoc3RhdHVzKVxuICAgICAgLmpzb24obW9kdWxlLmV4cG9ydHMuY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQoc3RhdHVzLCBtZXNzYWdlKSk7XG4gIH0sXG4gIHJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1czogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgbGV0IHN0YXR1cywgbWVzc2FnZTtcbiAgICAvLyBjaGVjayBmb3IgZGFlbW9uIGJlaW5nIHR1cm5lZCBvZmZcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHN0YXR1cyA9IDUwMztcbiAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiByZWZ1c2VkLiAgVGhlIGRhZW1vbiBtYXkgbm90IGJlIHJ1bm5pbmcuJztcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gNDAwO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFtzdGF0dXMsIG1lc3NhZ2VdO1xuICB9LFxuICB1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXM6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBuZXdFcnJvck9iamVjdCA9IHt9O1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbmV3RXJyb3JPYmplY3Rba2V5XSA9IGVycltrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3RXJyb3JPYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH0sXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7XG4gICAgY29tcG9uZW50czoge30sXG4gICAgY29udGFpbmVyczoge30sXG4gICAgcGFnZXMgICAgIDoge30sXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGN1c3RvbUNvbXBvbmVudHMsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICBsb2dnZXIuaW5mbygnQ29uZmlndXJpbmcgc2l0ZSBkZXRhaWxzLi4uJyk7XG4gICAgdGhpcy5hbmFseXRpY3MgPSBhbmFseXRpY3M7XG4gICAgdGhpcy5hc3NldERlZmF1bHRzID0gYXNzZXREZWZhdWx0cztcbiAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgdGhpcy5wdWJsaXNoaW5nID0gcHVibGlzaGluZztcbiAgICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSBjdXN0b21Db21wb25lbnRzO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2l0ZUNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NpdGVDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbGUgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfU0VMRUNURUQsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckZpbGUgKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9DTEVBUixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLk1FVEFEQVRBX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDbGFpbSAodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNMQUlNX1VQREFURSxcbiAgICBkYXRhOiB2YWx1ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQdWJsaXNoSW5DaGFubmVsIChjaGFubmVsKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMLFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHVibGlzaFN0YXR1cyAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgc3RhdHVzLFxuICAgICAgbWVzc2FnZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVycm9yIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRVJST1JfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCAoY2hhbm5lbE5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IGNoYW5uZWxOYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1ldGFkYXRhSW5wdXRzIChzaG93TWV0YWRhdGFJbnB1dHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFMsXG4gICAgZGF0YTogc2hvd01ldGFkYXRhSW5wdXRzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3VGh1bWJuYWlsIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5USFVNQk5BSUxfTkVXLFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQdWJsaXNoIChoaXN0b3J5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVJULFxuICAgIGRhdGE6IHsgaGlzdG9yeSB9LFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvcHVibGlzaC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gbXlzcWwgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIC8vIGNvbmZpZ3VyZSBjcmVkZW50aWFsc1xuICAgIGxvZ2dlci5pbmZvKCdjb25maWd1cmluZyBteXNxbC4uLicpO1xuICAgIGNvbnN0IHsgZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gY29uZmlnO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgbXlzcWwoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBzaXRlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsTmFtZSAgIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBjaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBjaGFubmVsTG9uZ0lkIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubG9uZ0lkLFxuICAgIHNpdGVEZXNjcmlwdGlvbjogc2l0ZS5kZXNjcmlwdGlvbixcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICAgIG9uQ2hhbm5lbExvZ291dDogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG51bGwsIG51bGwsIG51bGwpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvaW5kZXguanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5cbmltcG9ydCB7IENIQU5ORUwsIEFTU0VUX0xJVEUsIEFTU0VUX0RFVEFJTFMgfSBmcm9tICdjb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzJztcblxuLy8gYmFzaWMgcmVxdWVzdCBwYXJzaW5nXG5leHBvcnQgZnVuY3Rpb24gb25IYW5kbGVTaG93UGFnZVVyaSAocGFyYW1zKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5IQU5ETEVfU0hPV19VUkksXG4gICAgZGF0YTogcGFyYW1zLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdEVycm9yIChlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9FUlJPUixcbiAgICBkYXRhOiBlcnJvcixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld0NoYW5uZWxSZXF1ZXN0IChjaGFubmVsTmFtZSwgY2hhbm5lbElkKSB7XG4gIGNvbnN0IHJlcXVlc3RUeXBlID0gQ0hBTk5FTDtcbiAgY29uc3QgcmVxdWVzdElkID0gYGNyIyR7Y2hhbm5lbE5hbWV9IyR7Y2hhbm5lbElkfWA7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3QXNzZXRSZXF1ZXN0IChuYW1lLCBpZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgZXh0ZW5zaW9uKSB7XG4gIGNvbnN0IHJlcXVlc3RUeXBlID0gZXh0ZW5zaW9uID8gQVNTRVRfTElURSA6IEFTU0VUX0RFVEFJTFM7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IGBhciMke25hbWV9IyR7aWR9IyR7Y2hhbm5lbE5hbWV9IyR7Y2hhbm5lbElkfWA7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5BU1NFVF9SRVFVRVNUX05FVyxcbiAgICBkYXRhOiB7XG4gICAgICByZXF1ZXN0VHlwZSxcbiAgICAgIHJlcXVlc3RJZCxcbiAgICAgIG5hbWUsXG4gICAgICBtb2RpZmllcjoge1xuICAgICAgICBpZCxcbiAgICAgICAgY2hhbm5lbDoge1xuICAgICAgICAgIG5hbWU6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgIGlkICA6IGNoYW5uZWxJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlcXVlc3RVcGRhdGUgKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QgKGlkLCBlcnJvciwga2V5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0xJU1RfQURELFxuICAgIGRhdGE6IHsgaWQsIGVycm9yLCBrZXkgfSxcbiAgfTtcbn07XG5cbi8vIGFzc2V0IGFjdGlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFzc2V0VG9Bc3NldExpc3QgKGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5BU1NFVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIG5hbWUsIGNsYWltSWQsIHNob3J0SWQsIGNsYWltRGF0YSB9LFxuICB9O1xufVxuXG4vLyBjaGFubmVsIGFjdGlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0IChpZCwgbmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0FERCxcbiAgICBkYXRhOiB7IGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblVwZGF0ZUNoYW5uZWxDbGFpbXMgKGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DLFxuICAgIGRhdGE6IHtjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2V9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNoYW5uZWxDbGFpbXMgKGNoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTLFxuICAgIGRhdGE6IHtjaGFubmVsTGlzdElkLCBjbGFpbXNEYXRhfSxcbiAgfTtcbn07XG5cbi8vIGRpc3BsYXkgYSBmaWxlXG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlUmVxdWVzdGVkIChuYW1lLCBjbGFpbUlkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX1JFUVVFU1RFRCxcbiAgICBkYXRhOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IChzdGF0dXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURSxcbiAgICBkYXRhOiBzdGF0dXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGlzcGxheUFzc2V0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5ESVNQTEFZX0FTU0VUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL3Nob3cuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB1YSA9IHJlcXVpcmUoJ3VuaXZlcnNhbC1hbmFseXRpY3MnKTtcbmNvbnN0IHsgYW5hbHl0aWNzIDogeyBnb29nbGVJZCB9LCBkZXRhaWxzOiB7IHRpdGxlIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICByZXR1cm4ge1xuICAgIGV2ZW50Q2F0ZWdvcnkgICAgOiAnY2xpZW50IHJlcXVlc3RzJyxcbiAgICBldmVudEFjdGlvbiAgICAgIDogJ3NlcnZlIHJlcXVlc3QnLFxuICAgIGV2ZW50TGFiZWwgICAgICAgOiBvcmlnaW5hbFVybCxcbiAgICBpcE92ZXJyaWRlICAgICAgIDogaXAsXG4gICAgdXNlckFnZW50T3ZlcnJpZGU6IGhlYWRlcnNbJ3VzZXItYWdlbnQnXSxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gZW5kVGltZSAtIHN0YXJ0VGltZTtcbiAgcmV0dXJuIHtcbiAgICB1c2VyVGltaW5nQ2F0ZWdvcnkgICAgOiBjYXRlZ29yeSxcbiAgICB1c2VyVGltaW5nVmFyaWFibGVOYW1lOiB2YXJpYWJsZSxcbiAgICB1c2VyVGltaW5nVGltZSAgICAgICAgOiBkdXJhdGlvbixcbiAgICB1c2VyVGltaW5nTGFiZWwgICAgICAgOiBsYWJlbCxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudCAoaXAsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9ySWQgPSBpcC5yZXBsYWNlKC9cXC4vZywgJy0nKTtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IuZXZlbnQocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyAodmlzaXRvcklkLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IudGltaW5nKHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgVGltaW5nIGV2ZW50IHN1Y2Nlc3NmdWxseSBzZW50IHRvIGdvb2dsZSBhbmFseXRpY3NgKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VuZEdBU2VydmVFdmVudCAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlU2VydmVFdmVudFBhcmFtcyhoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudChpcCwgcGFyYW1zKTtcbiAgfSxcbiAgc2VuZEdBVGltaW5nRXZlbnQgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyhjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcodGl0bGUsIHBhcmFtcyk7XG4gIH0sXG4gIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCAoeyBjaGFubmVsX25hbWU6IGNoYW5uZWxOYW1lLCBjaGFubmVsX2lkOiBjaGFubmVsSWQgfSkge1xuICAgIHJldHVybiAoY2hhbm5lbE5hbWUgfHwgY2hhbm5lbElkID8gJ1BVQkxJU0hfSU5fQ0hBTk5FTF9DTEFJTScgOiAnUFVCTElTSF9BTk9OWU1PVVNfQ0xBSU0nKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJjb25zdCBDZXJ0aWZpY2F0ZSA9IHJlcXVpcmUoJ21vZGVscy9jZXJ0aWZpY2F0ZS5qcycpO1xuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJ21vZGVscy9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJ21vZGVscy9jbGFpbS5qcycpO1xuY29uc3QgRmlsZSA9IHJlcXVpcmUoJ21vZGVscy9maWxlLmpzJyk7XG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnbW9kZWxzL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCdtb2RlbHMvdXNlci5qcycpO1xuXG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3Qge2RhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmR9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcblxuLy8gc2V0IHNlcXVlbGl6ZSBvcHRpb25zXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcbiAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0ICAgICAgIDogJ215c3FsJyxcbiAgZGlhbGVjdE9wdGlvbnM6IHtkZWNpbWFsTnVtYmVyczogdHJ1ZX0sXG4gIGxvZ2dpbmcgICAgICAgOiBmYWxzZSxcbiAgcG9vbCAgICAgICAgICA6IHtcbiAgICBtYXggICAgOiA1LFxuICAgIG1pbiAgICA6IDAsXG4gICAgaWRsZSAgIDogMTAwMDAsXG4gICAgYWNxdWlyZTogMTAwMDAsXG4gIH0sXG59KTtcblxuLy8gZXN0YWJsaXNoIG15c3FsIGNvbm5lY3Rpb25cbnNlcXVlbGl6ZVxuICAuYXV0aGVudGljYXRlKClcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKCdTZXF1ZWxpemUgaGFzIGVzdGFibGlzaGVkIG15c3FsIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5LicpO1xuICB9KVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICBsb2dnZXIuZXJyb3IoJ1NlcXVlbGl6ZSB3YXMgdW5hYmxlIHRvIGNvbm5lY3QgdG8gdGhlIGRhdGFiYXNlOicsIGVycik7XG4gIH0pO1xuXG4vLyBtYW51YWxseSBhZGQgZWFjaCBtb2RlbCB0byB0aGUgZGIgb2JqZWN0IChub3RlOiBtYWtlIHRoaXMgZHluYW1pYylcbmNvbnN0IGRiID0ge307XG5kYlsnQ2VydGlmaWNhdGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NlcnRpZmljYXRlJywgQ2VydGlmaWNhdGUpO1xuZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbmRiWydDbGFpbSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2xhaW0nLCBDbGFpbSk7XG5kYlsnRmlsZSddID0gc2VxdWVsaXplLmltcG9ydCgnRmlsZScsIEZpbGUpO1xuZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbmRiWydVc2VyJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdVc2VyJywgVXNlcik7XG5cbi8vIHJ1biBtb2RlbC5hc3NvY2lhdGlvbiBmb3IgZWFjaCBtb2RlbCBpbiB0aGUgZGIgb2JqZWN0IHRoYXQgaGFzIGFuIGFzc29jaWF0aW9uXG5sb2dnZXIuaW5mbygnYXNzb2NpYXRpbmcgZGIgbW9kZWxzLi4uJyk7XG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChtb2RlbE5hbWUgPT4ge1xuICBpZiAoZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUpIHtcbiAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICBkYlttb2RlbE5hbWVdLmFzc29jaWF0ZShkYik7XG4gIH1cbn0pO1xuXG4vLyBhZGQgc2VxdWVsaXplL1NlcXVlbGl6ZSB0byBkYlxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplO1xuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGUgfSkgPT4ge1xuICBjb25zdCB7IGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCwgZGVzY3JpcHRpb246IHNpdGVEZXNjcmlwdGlvbiwgaG9zdDogc2l0ZUhvc3QsIHRpdGxlOiBzaXRlVGl0bGUsIHR3aXR0ZXI6IHNpdGVUd2l0dGVyIH0gPSBzaXRlO1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgICBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIHNpdGVEZXNjcmlwdGlvbixcbiAgICBzaXRlSG9zdCxcbiAgICBzaXRlVGl0bGUsXG4gICAgc2l0ZVR3aXR0ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicHJvcC10eXBlc1wiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJ2Nyb3NzLWZldGNoL3BvbHlmaWxsJztcblxuLyoqXG4gKiBQYXJzZXMgdGhlIEpTT04gcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlIEEgcmVzcG9uc2UgZnJvbSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIHJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gcGFyc2VKU09OIChyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDQgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgc3RhdHVzIHJldHVybmVkIGJ5IGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSAgIEEgcmVzcG9uc2UgZnJvbSBhIG5ldHdvcmsgcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSAgIFRoZSBwYXJzZWQgSlNPTiBmcm9tIHRoZSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3QgfCB1bmRlZmluZWR9IFJldHVybnMgb2JqZWN0IHdpdGggc3RhdHVzIGFuZCBzdGF0dXNUZXh0LCBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gY2hlY2tTdGF0dXMgKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgcmV0dXJuIGpzb25SZXNwb25zZTtcbiAgfVxuICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihqc29uUmVzcG9uc2UubWVzc2FnZSk7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHRocm93IGVycm9yO1xufVxuXG4vKipcbiAqIFJlcXVlc3RzIGEgVVJMLCByZXR1cm5pbmcgYSBwcm9taXNlXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSB1cmwgICAgICAgVGhlIFVSTCB3ZSB3YW50IHRvIHJlcXVlc3RcbiAqIEBwYXJhbSAge29iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIHdlIHdhbnQgdG8gcGFzcyB0byBcImZldGNoXCJcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICBUaGUgcmVzcG9uc2UgZGF0YVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbcmVzcG9uc2UsIHBhcnNlSlNPTihyZXNwb25zZSldKTtcbiAgICB9KVxuICAgIC50aGVuKChbcmVzcG9uc2UsIGpzb25SZXNwb25zZV0pID0+IHtcbiAgICAgIHJldHVybiBjaGVja1N0YXR1cyhyZXNwb25zZSwganNvblJlc3BvbnNlKTtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIi8vIHJlcXVlc3QgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEhBTkRMRV9TSE9XX1VSSSA9ICdIQU5ETEVfU0hPV19VUkknO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfRVJST1IgPSAnUkVRVUVTVF9FUlJPUic7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9VUERBVEUgPSAnUkVRVUVTVF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX1JFUVVFU1RfTkVXID0gJ0FTU0VUX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1JFUVVFU1RfTkVXID0gJ0NIQU5ORUxfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfTElTVF9BREQgPSAnUkVRVUVTVF9MSVNUX0FERCc7XG5cbi8vIGFzc2V0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBBU1NFVF9BREQgPSBgQVNTRVRfQUREYDtcblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9BREQgPSAnQ0hBTk5FTF9BREQnO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MnO1xuXG4vLyBhc3NldC9maWxlIGRpc3BsYXkgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEZJTEVfUkVRVUVTVEVEID0gJ0ZJTEVfUkVRVUVTVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUgPSAnRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBESVNQTEFZX0FTU0VUX0VSUk9SID0gJ0RJU1BMQVlfQVNTRVRfRVJST1InO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RBc3NldCA9IChzaG93KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7XG4gIHJldHVybiBzaG93LmFzc2V0TGlzdFthc3NldEtleV07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hvd1N0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaG93O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsImNvbnN0IHsgZGIgfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xuY29uc3QgbG9jYWxMb2dpblN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1sb2dpbi5qcycpO1xuY29uc3QgbG9jYWxTaWdudXBTdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtc2lnbnVwLmpzJyk7XG5jb25zdCB7IHNlcmlhbGl6ZVNwZWVjaFVzZXIsIGRlc2VyaWFsaXplU3BlZWNoVXNlciB9ID0gcmVxdWlyZSgnaGVscGVycy9hdXRoSGVscGVycy5qcycpO1xuXG5wYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZGVzZXJpYWxpemVTcGVlY2hVc2VyKTtcbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoc2VyaWFsaXplU3BlZWNoVXNlcik7XG5wYXNzcG9ydC51c2UoJ2xvY2FsLWxvZ2luJywgbG9jYWxMb2dpblN0cmF0ZWd5KTtcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtc2lnbnVwJywgbG9jYWxTaWdudXBTdHJhdGVneSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFzc3BvcnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGRiIH0gPSByZXF1aXJlKCdteXNxbENvbmZpZycpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe3doZXJlOiB7Y2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHNob3J0SWQsXG4gICAgICBsb25nSWQsXG4gICAgfSxcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9jaGFubmVsLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQWN0aXZlU3RhdHVzQmFyIGZyb20gJ2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyJztcbmltcG9ydCBJbmFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyJztcblxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGJhcnMgICAgICAgOiBbXSxcbiAgICAgIGluZGV4ICAgICAgOiAwLFxuICAgICAgaW5jcmVtZW50ZXI6IDEsXG4gICAgfTtcbiAgICB0aGlzLmNyZWF0ZUJhcnMgPSB0aGlzLmNyZWF0ZUJhcnMuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIgPSB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyID0gdGhpcy51cGRhdGVQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFByb2dyZXNzQmFyID0gdGhpcy5zdG9wUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5jcmVhdGVCYXJzKCk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyKCk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMuc3RvcFByb2dyZXNzQmFyKCk7XG4gIH1cbiAgY3JlYXRlQmFycyAoKSB7XG4gICAgY29uc3QgYmFycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMucHJvcHMuc2l6ZTsgaSsrKSB7XG4gICAgICBiYXJzLnB1c2goe2lzQWN0aXZlOiBmYWxzZX0pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgYmFycyB9KTtcbiAgfVxuICBzdGFydFByb2dyZXNzQmFyICgpIHtcbiAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVQcm9ncmVzc0Jhci5iaW5kKHRoaXMpLCAzMDApO1xuICB9O1xuICB1cGRhdGVQcm9ncmVzc0JhciAoKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleDtcbiAgICBsZXQgaW5jcmVtZW50ZXIgPSB0aGlzLnN0YXRlLmluY3JlbWVudGVyO1xuICAgIGxldCBiYXJzID0gdGhpcy5zdGF0ZS5iYXJzO1xuICAgIC8vIGZsaXAgaW5jcmVtZW50ZXIgaWYgbmVjZXNzYXJ5LCB0byBzdGF5IGluIGJvdW5kc1xuICAgIGlmICgoaW5kZXggPCAwKSB8fCAoaW5kZXggPiB0aGlzLnByb3BzLnNpemUpKSB7XG4gICAgICBpbmNyZW1lbnRlciA9IGluY3JlbWVudGVyICogLTE7XG4gICAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHRoZSBpbmRleGVkIGJhclxuICAgIGlmIChpbmNyZW1lbnRlciA+IDApIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFyc1tpbmRleF0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICAgIC8vIGluY3JlbWVudCBpbmRleFxuICAgIGluZGV4ICs9IGluY3JlbWVudGVyO1xuICAgIC8vIHVwZGF0ZSBzdGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYmFycyxcbiAgICAgIGluY3JlbWVudGVyLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG4gIHN0b3BQcm9ncmVzc0JhciAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZUludGVydmFsKTtcbiAgfTtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuc3RhdGUuYmFycy5tYXAoKGJhciwgaW5kZXgpID0+IGJhci5pc0FjdGl2ZSA/IDxBY3RpdmVTdGF0dXNCYXIga2V5PXtpbmRleH0gLz4gOiA8SW5hY3RpdmVTdGF0dXNCYXIga2V5PXtpbmRleH0vPil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5Qcm9ncmVzc0Jhci5wcm9wVHlwZXMgPSB7XG4gIHNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcblxuY2xhc3MgRXJyb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxwPntlcnJvcn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuRXJyb3JQYWdlLnByb3BUeXBlcyA9IHtcbiAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9FcnJvclBhZ2UvaW5kZXguanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblNob3J0SWQ6IGZ1bmN0aW9uIChjbGFpbXNBcnJheSwgbG9uZ0lkKSB7XG4gICAgbGV0IGNsYWltSW5kZXg7XG4gICAgbGV0IHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIDEpOyAvLyBkZWZhdWx0IHNob3J0IGlkIGlzIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICBsZXQgc2hvcnRJZExlbmd0aCA9IDA7XG4gICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhpcyBjbGFpbSBpZFxuICAgIGNsYWltSW5kZXggPSBjbGFpbXNBcnJheS5maW5kSW5kZXgoZWxlbWVudCA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFpbUlkID09PSBsb25nSWQ7XG4gICAgfSk7XG4gICAgaWYgKGNsYWltSW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsYWltIGlkIG5vdCBmb3VuZCBpbiBjbGFpbXMgbGlzdCcpO1xuICAgIH1cbiAgICAvLyBnZXQgYW4gYXJyYXkgb2YgYWxsIGNsYWltcyB3aXRoIGxvd2VyIGhlaWdodFxuICAgIGxldCBwb3NzaWJsZU1hdGNoZXMgPSBjbGFpbXNBcnJheS5zbGljZSgwLCBjbGFpbUluZGV4KTtcbiAgICAvLyByZW1vdmUgY2VydGlmaWNhdGVzIHdpdGggdGhlIHNhbWUgcHJlZml4ZXMgdW50aWwgbm9uZSBhcmUgbGVmdC5cbiAgICB3aGlsZSAocG9zc2libGVNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNob3J0SWRMZW5ndGggKz0gMTtcbiAgICAgIHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpO1xuICAgICAgcG9zc2libGVNYXRjaGVzID0gcG9zc2libGVNYXRjaGVzLmZpbHRlcihlbGVtZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50LmNsYWltSWQgJiYgKGVsZW1lbnQuY2xhaW1JZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCkgPT09IHNob3J0SWQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hvcnRJZDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJ2NsaWVudC9yZWR1Y2Vycyc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci8nO1xuaW1wb3J0IEFwcCBmcm9tICdjbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlLmpzJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyKTtcblxuICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICA8QXBwIC8+XG4gICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG5cbiAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgLy8gU29tZXdoZXJlIGEgYDxSZWRpcmVjdD5gIHdhcyByZW5kZXJlZFxuICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UncmUgZ29vZCwgc2VuZCB0aGUgcmVzcG9uc2VcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFB1Ymxpc2hSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3B1Ymxpc2gnO1xuaW1wb3J0IENoYW5uZWxSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL2NoYW5uZWwnO1xuaW1wb3J0IFNob3dSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3Nob3cnO1xuaW1wb3J0IFNpdGVSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3NpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICBjaGFubmVsOiBDaGFubmVsUmVkdWNlcixcbiAgcHVibGlzaDogUHVibGlzaFJlZHVjZXIsXG4gIHNob3cgICA6IFNob3dSZWR1Y2VyLFxuICBzaXRlICAgOiBTaXRlUmVkdWNlcixcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IEZJTEVfU0VMRUNURUQgPSAnRklMRV9TRUxFQ1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9DTEVBUiA9ICdGSUxFX0NMRUFSJztcbmV4cG9ydCBjb25zdCBNRVRBREFUQV9VUERBVEUgPSAnTUVUQURBVEFfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBDTEFJTV9VUERBVEUgPSAnQ0xBSU1fVVBEQVRFJztcbmV4cG9ydCBjb25zdCBTRVRfUFVCTElTSF9JTl9DSEFOTkVMID0gJ1NFVF9QVUJMSVNIX0lOX0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hfU1RBVFVTX1VQREFURSA9ICdQVUJMSVNIX1NUQVRVU19VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEVSUk9SX1VQREFURSA9ICdFUlJPUl9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFID0gJ1NFTEVDVEVEX0NIQU5ORUxfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfTUVUQURBVEFfSU5QVVRTID0gJ1RPR0dMRV9NRVRBREFUQV9JTlBVVFMnO1xuZXhwb3J0IGNvbnN0IFRIVU1CTkFJTF9ORVcgPSAnVEhVTUJOQUlMX05FVyc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFSVCA9ICdQVUJMSVNIX1NUQVJUJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9HSU4gPSAnRXhpc3RpbmcnO1xuZXhwb3J0IGNvbnN0IENSRUFURSA9ICdOZXcnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMX1VQREFURSA9ICdDSEFOTkVMX1VQREFURSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPQ0FMX0NIRUNLID0gJ0xPQ0FMX0NIRUNLJztcbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRSA9ICdVTkFWQUlMQUJMRSc7XG5leHBvcnQgY29uc3QgRVJST1IgPSAnRVJST1InO1xuZXhwb3J0IGNvbnN0IEFWQUlMQUJMRSA9ICdBVkFJTEFCTEUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgR29vZ2xlQW5hbHl0aWNzIGZyb20gJ3JlYWN0LWdhJztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmNvbnN0IHsgYW5hbHl0aWNzOiB7IGdvb2dsZUlkIH0gfSA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbkdvb2dsZUFuYWx5dGljcy5pbml0aWFsaXplKGdvb2dsZUlkKTtcblxuY2xhc3MgR0FMaXN0ZW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnNlbmRQYWdlVmlldyh0aGlzLnByb3BzLmhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5saXN0ZW4odGhpcy5zZW5kUGFnZVZpZXcpO1xuICB9XG5cbiAgc2VuZFBhZ2VWaWV3IChsb2NhdGlvbikge1xuICAgIEdvb2dsZUFuYWx5dGljcy5zZXQoeyBwYWdlOiBsb2NhdGlvbi5wYXRobmFtZSB9KTtcbiAgICBHb29nbGVBbmFseXRpY3MucGFnZXZpZXcobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEdBTGlzdGVuZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEhvbWVQYWdlIGZyb20gJ3BhZ2VzL0hvbWVQYWdlJztcbmltcG9ydCBBYm91dFBhZ2UgZnJvbSAncGFnZXMvQWJvdXRQYWdlJztcbmltcG9ydCBMb2dpblBhZ2UgZnJvbSAncGFnZXMvTG9naW5QYWdlJztcbmltcG9ydCBTaG93UGFnZSBmcm9tICdwYWdlcy9TaG93UGFnZSc7XG5pbXBvcnQgRm91ck9oRm91clBhZ2UgZnJvbSAnY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZSc7XG4vLyBpbXBvcnQgeyBkeW5hbWljSW1wb3J0IH0gZnJvbSAndXRpbHMvZHluYW1pY0ltcG9ydCc7XG4vLyBjb25zdCBIb21lUGFnZSA9IGR5bmFtaWNJbXBvcnQoJ3BhZ2VzL0hvbWVQYWdlJyk7IC8vIG9yIHVzZSB0aGUgcHJvdmlkZWQgbG9jYWwgaG9tZXBhZ2VcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTd2l0Y2g+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXtIb21lUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvYWJvdXQnIGNvbXBvbmVudD17QWJvdXRQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9sb2dpbicgY29tcG9uZW50PXtMb2dpblBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzppZGVudGlmaWVyLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGNvbXBvbmVudD17Rm91ck9oRm91clBhZ2V9IC8+XG4gICAgPC9Td2l0Y2g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBwLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHNlbGVjdEZpbGUsIHVwZGF0ZUVycm9yLCBjbGVhckZpbGUgfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZSAgICAgOiBwdWJsaXNoLmZpbGUsXG4gICAgdGh1bWJuYWlsOiBwdWJsaXNoLnRodW1ibmFpbCxcbiAgICBmaWxlRXJyb3I6IHB1Ymxpc2guZXJyb3IuZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RGaWxlOiAoZmlsZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goc2VsZWN0RmlsZShmaWxlKSk7XG4gICAgfSxcbiAgICBzZXRGaWxlRXJyb3I6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goY2xlYXJGaWxlKCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2ZpbGUnLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJy4uLy4uL2FjdGlvbnMvcHVibGlzaCc7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IENIQU5ORUwgPSAnQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgQVNTRVRfTElURSA9ICdBU1NFVF9MSVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9ERVRBSUxTID0gJ0FTU0VUX0RFVEFJTFMnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IGZpbGVSZXF1ZXN0ZWQgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgZXJyb3IgYW5kIHN0YXR1c1xuICBjb25zdCBlcnJvciAgPSBzaG93LmRpc3BsYXlBc3NldC5lcnJvcjtcbiAgY29uc3Qgc3RhdHVzID0gc2hvdy5kaXNwbGF5QXNzZXQuc3RhdHVzO1xuICAvLyBzZWxlY3QgYXNzZXRcbiAgY29uc3QgYXNzZXQgPSBzZWxlY3RBc3NldChzaG93KTtcbiAgLy8gIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGVycm9yLFxuICAgIHN0YXR1cyxcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkZpbGVSZXF1ZXN0OiAobmFtZSwgY2xhaW1JZCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmlsZVJlcXVlc3RlZChuYW1lLCBjbGFpbUlkKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkgPT4ge1xuICAvLyB0YWtlIHRoZSBodG1sIGFuZCBwcmVsb2FkZWRTdGF0ZSBhbmQgcmV0dXJuIHRoZSBmdWxsIHBhZ2VcbiAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIiBwcmVmaXg9XCJvZzogaHR0cDovL29ncC5tZS9ucyMgZmI6IGh0dHA6Ly9vZ3AubWUvbnMvZmIjXCI+XG4gICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vXCI+XG4gICAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIj5cbiAgICAgICAgICAgIDwhLS1oZWxtZXQtLT5cbiAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5saW5rLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICA8IS0tc3R5bGUgc2hlZXRzLS0+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL3Jlc2V0LmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9nZW5lcmFsLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9tZWRpYVF1ZXJpZXMuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8IS0tZ29vZ2xlIGZvbnQtLT5cbiAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMFwiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keSBpZD1cIm1haW4tYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyZWFjdC1hcHBcIiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPiR7aHRtbH08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNjcmlwdD5cbiAgICAgICAgICAgICAgICB3aW5kb3cuX19QUkVMT0FERURfU1RBVEVfXyA9ICR7SlNPTi5zdHJpbmdpZnkocHJlbG9hZGVkU3RhdGUpLnJlcGxhY2UoLzwvZywgJ1xcXFxcXHUwMDNjJyl9XG4gICAgICAgICAgICA8L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL2J1bmRsZS9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZ2V0Q2xhaW1JZCwgZ2V0TG9jYWxGaWxlUmVjb3JkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnLi9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcbmNvbnN0IFNIT1cgPSAnU0hPVyc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxuZnVuY3Rpb24gY2xpZW50QWNjZXB0c0h0bWwgKHthY2NlcHR9KSB7XG4gIHJldHVybiBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdElzRnJvbUJyb3dzZXIgKGhlYWRlcnMpIHtcbiAgcmV0dXJuIGhlYWRlcnNbJ3VzZXItYWdlbnQnXSAmJiBoZWFkZXJzWyd1c2VyLWFnZW50J10ubWF0Y2goL01vemlsbGEvKTtcbn07XG5cbmZ1bmN0aW9uIGNsaWVudFdhbnRzQXNzZXQgKHthY2NlcHQsIHJhbmdlfSkge1xuICBjb25zdCBpbWFnZUlzV2FudGVkID0gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvaW1hZ2VcXC8uKi8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL1xcKi8pO1xuICBjb25zdCB2aWRlb0lzV2FudGVkID0gYWNjZXB0ICYmIHJhbmdlO1xuICByZXR1cm4gaW1hZ2VJc1dhbnRlZCB8fCB2aWRlb0lzV2FudGVkO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZENsYWltSWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuICgoY2xhaW1JZC5sZW5ndGggPT09IDQwKSAmJiAhL1teQS1aYS16MC05XS9nLnRlc3QoY2xhaW1JZCkpO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuIGNsYWltSWQubGVuZ3RoID09PSAxOyAgLy8gaXQgc2hvdWxkIHJlYWxseSBldmFsdWF0ZSB0aGUgc2hvcnQgdXJsIGl0c2VsZlxufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWRPckNsYWltSWQgKGlucHV0KSB7XG4gIHJldHVybiAoaXNWYWxpZENsYWltSWQoaW5wdXQpIHx8IGlzVmFsaWRTaG9ydElkKGlucHV0KSk7XG59O1xuXG5mdW5jdGlvbiBzZXJ2ZUFzc2V0VG9DbGllbnQgKGNsYWltSWQsIG5hbWUsIHJlcykge1xuICByZXR1cm4gZ2V0TG9jYWxGaWxlUmVjb3JkKGNsYWltSWQsIG5hbWUpXG4gICAgLnRoZW4oZmlsZVJlY29yZCA9PiB7XG4gICAgICAvLyBjaGVjayB0aGF0IGEgbG9jYWwgcmVjb3JkIHdhcyBmb3VuZFxuICAgICAgaWYgKGZpbGVSZWNvcmQgPT09IE5PX0ZJTEUpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMzA3KS5yZWRpcmVjdChgL2FwaS9jbGFpbS9nZXQvJHtuYW1lfS8ke2NsYWltSWR9YCk7XG4gICAgICB9XG4gICAgICAvLyBzZXJ2ZSB0aGUgZmlsZVxuICAgICAgY29uc3Qge2ZpbGVQYXRoLCBmaWxlVHlwZX0gPSBmaWxlUmVjb3JkO1xuICAgICAgbG9nZ2VyLnZlcmJvc2UoYHNlcnZpbmcgZmlsZTogJHtmaWxlUGF0aH1gKTtcbiAgICAgIGNvbnN0IHNlbmRGaWxlT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnICAgICAgICAgIDogZmlsZVR5cGUgfHwgJ2ltYWdlL2pwZWcnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kRmlsZShmaWxlUGF0aCwgc2VuZEZpbGVPcHRpb25zKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKSB7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oZnVsbENsYWltSWQgPT4ge1xuICAgICAgICBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9IGVsc2UgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNoYW5uZWwgaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmVBc3NldFRvQ2xpZW50KGZ1bGxDbGFpbUlkLCBjbGFpbU5hbWUsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnc3VjY2VzcycpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdmYWlsJyk7XG4gICAgICB9KTtcbiAgfSxcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIChoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlVHlwZTtcbiAgICBpZiAoaGFzRmlsZUV4dGVuc2lvbikge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7ICAvLyBhc3N1bWUgYSBzZXJ2ZSByZXF1ZXN0IGlmIGZpbGUgZXh0ZW5zaW9uIGlzIHByZXNlbnRcbiAgICAgIGlmIChjbGllbnRBY2NlcHRzSHRtbChoZWFkZXJzKSkgeyAgLy8gaWYgdGhlIHJlcXVlc3QgY29tZXMgZnJvbSBhIGJyb3dzZXIsIGNoYW5nZSBpdCB0byBhIHNob3cgcmVxdWVzdFxuICAgICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgaWYgKGNsaWVudFdhbnRzQXNzZXQoaGVhZGVycykgJiYgcmVxdWVzdElzRnJvbUJyb3dzZXIoaGVhZGVycykpIHsgIC8vIHRoaXMgaXMgaW4gY2FzZSBzb21lb25lIGVtYmVkcyBhIHNob3cgdXJsXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnU2hvdyByZXF1ZXN0IGNhbWUgZnJvbSBicm93c2VyIGJ1dCB3YW50cyBhbiBpbWFnZS92aWRlby4gQ2hhbmdpbmcgcmVzcG9uc2UgdG8gc2VydmUuLi4nKTtcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZVR5cGU7XG4gIH0sXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkgKGlkZW50aWZpZXIsIG5hbWUpIHtcbiAgICAvLyB0aGlzIGlzIGEgcGF0Y2ggZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5IHdpdGggJy9uYW1lL2NsYWltX2lkJyB1cmwgZm9ybWF0XG4gICAgaWYgKGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKG5hbWUpICYmICFpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChpZGVudGlmaWVyKSkge1xuICAgICAgY29uc3QgdGVtcE5hbWUgPSBuYW1lO1xuICAgICAgbmFtZSA9IGlkZW50aWZpZXI7XG4gICAgICBpZGVudGlmaWVyID0gdGVtcE5hbWU7XG4gICAgfVxuICAgIHJldHVybiBbaWRlbnRpZmllciwgbmFtZV07XG4gIH0sXG4gIGxvZ1JlcXVlc3REYXRhIChyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3Jlc3BvbnNlVHlwZSA9PT0nLCByZXNwb25zZVR5cGUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gbmFtZSA9PT0gJywgY2xhaW1OYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgbmFtZSA9PT0nLCBjaGFubmVsTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBpZCA9PT0nLCBjbGFpbUlkKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgaWRlbnRpZmllcjonLCBpZGVudGlmaWVyKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7dmFsdWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgdXJsLiAgTm8gY2hhbm5lbCBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgaXNDaGFubmVsID0gdmFsdWUuc3RhcnRzV2l0aChtb2R1bGUuZXhwb3J0cy5DSEFOTkVMX0NIQVIpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gaXNDaGFubmVsID8gdmFsdWUgOiBudWxsO1xuICAgIGxldCBjbGFpbUlkO1xuICAgIGlmIChpc0NoYW5uZWwpIHtcbiAgICAgIGlmICghY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsIG5hbWUgYWZ0ZXIgQC4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjaGFubmVsTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCk7XG4gICAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYWltSWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBjaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbUlkLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBuYW1lOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghY2xhaW1OYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIC4nKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNsYWltTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0xBSU0pO1xuICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciAke21vZGlmaWVyU2VwZXJhdG9yfS5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7bW9kaWZpZXJTZXBlcmF0b3J9IG1vZGlmaWVyIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWVgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgY2xhaW1OYW1lLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlTW9kaWZpZXI6IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBtb2RpZmllcjonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uID0gZmFsc2U7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24sXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnLi4vLi4vY2xpZW50L3JlZHVjZXJzL2luZGV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICcuLi8uLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4JztcbmltcG9ydCBBcHAgZnJvbSAnLi4vLi4vY2xpZW50L2FwcCc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZSc7XG5pbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUgZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBjYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7IGhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnLi4vLi4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpJztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvYWN0aW9ucy9zaG93JztcblxuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jb25zdCByZXR1cm5TYWdhV2l0aFBhcmFtcyA9IChzYWdhLCBwYXJhbXMpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uICogKCkge1xuICAgIHlpZWxkIGNhbGwoc2FnYSwgcGFyYW1zKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3JlYXRlIGFuZCBhcHBseSBtaWRkbGV3YXJlXG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgY29uc3QgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZShzYWdhTWlkZGxld2FyZSk7XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoUmVkdWNlciwgbWlkZGxld2FyZSk7XG5cbiAgLy8gY3JlYXRlIHNhZ2FcbiAgY29uc3QgYWN0aW9uID0gb25IYW5kbGVTaG93UGFnZVVyaShyZXEucGFyYW1zKTtcbiAgY29uc3Qgc2FnYSA9IHJldHVyblNhZ2FXaXRoUGFyYW1zKGhhbmRsZVNob3dQYWdlVXJpLCBhY3Rpb24pO1xuXG4gIC8vIHJ1biB0aGUgc2FnYSBtaWRkbGV3YXJlXG4gIHNhZ2FNaWRkbGV3YXJlXG4gICAgLnJ1bihzYWdhKVxuICAgIC5kb25lXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICAgICAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgICAgICA8QXBwIC8+XG4gICAgICAgICAgICA8L0dBTGlzdGVuZXI+XG4gICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICApO1xuXG4gICAgICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gICAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgICAgIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gICAgICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gICAgICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICAgIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gICAgICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG4gICAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJleHBvcnQgY29uc3Qgc2VsZWN0U2l0ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFNpdGVIb3N0ID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlLmhvc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NlbGVjdG9ycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VydmVyID0gcmVxdWlyZSgnLi9zZXJ2ZXInKTtcblxuY29uc3QgZXhwb3J0cyA9IHtcbiAgU2VydmVyLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3BlZWNoLmpzIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IGNvb2tpZVNlc3Npb24gPSByZXF1aXJlKCdjb29raWUtc2Vzc2lvbicpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSByZXF1aXJlKCdtaWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMnKTtcblxuZnVuY3Rpb24gU2VydmVyICgpIHtcbiAgdGhpcy5jb25maWd1cmVMb2dnZXIgPSAobG9nZ2VyQ29uZmlnKSA9PiB7XG4gICAgcmVxdWlyZSgnbG9nZ2VyQ29uZmlnLmpzJykuY29uZmlndXJlKGxvZ2dlckNvbmZpZyk7XG4gIH1cbiAgdGhpcy5jb25maWd1cmVNeXNxbCA9IChteXNxbENvbmZpZykgPT4ge1xuICAgIHJlcXVpcmUoJ215c3FsQ29uZmlnLmpzJykuY29uZmlndXJlKG15c3FsQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTaXRlRGV0YWlscyA9IChzaXRlQ29uZmlnKSA9PiB7XG4gICAgcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpLmNvbmZpZ3VyZShzaXRlQ29uZmlnKTtcbiAgICB0aGlzLnNlc3Npb25LZXkgPSBzaXRlQ29uZmlnLmF1dGguc2Vzc2lvbktleTtcbiAgICB0aGlzLlBPUlQgPSBzaXRlQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTbGFjayA9IChzbGFja0NvbmZpZykgPT4ge1xuICAgIHJlcXVpcmUoJ3NsYWNrQ29uZmlnLmpzJykuY29uZmlndXJlKHNsYWNrQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVDbGllbnRCdW5kbGUgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyZSB0aGUgY2xpZW50IGhlcmUgYnkgcGFzc2luZyBpbiB0aGUgYnVuZGxlIGFuZCBjb25maWd1cmluZyBpdCwgb3IgYmV0dGVyIHlldDogdGFraW5nIGluIHRoZSBjb21wb25lbnRzIHRvIHVzZSBkeW5hbWljYWxseSBmcm9tIGhlcmUuJyk7XG4gIH1cbiAgdGhpcy5jb25maWd1cmVNb2RlbHMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ2hlcmUgaXMgd2hlcmUgeW91IGNvdWxkIGFkZC9vdmVyd3JpdGUgdGhlIGRlZmF1bHQgbW9kZWxzJylcbiAgfVxuICB0aGlzLmNvbmZpZ3VyZVJvdXRlcyA9ICgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCByb3V0ZXMnKVxuICB9XG4gIHRoaXMuY3JlYXRlQXBwID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBhbiBFeHByZXNzIGFwcGxpY2F0aW9uXG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gICAgLy8gdHJ1c3QgdGhlIHByb3h5IHRvIGdldCBpcCBhZGRyZXNzIGZvciB1c1xuICAgIGFwcC5lbmFibGUoJ3RydXN0IHByb3h5Jyk7XG5cbiAgICAvLyBhZGQgbWlkZGxld2FyZVxuICAgIGFwcC51c2UoaGVsbWV0KCkpOyAvLyBzZXQgSFRUUCBoZWFkZXJzIHRvIHByb3RlY3QgYWdhaW5zdCB3ZWxsLWtub3duIHdlYiB2dWxuZXJhYmlsdGllc1xuICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMoYCR7X19kaXJuYW1lfS9wdWJsaWNgKSk7IC8vICdleHByZXNzLnN0YXRpYycgdG8gc2VydmUgc3RhdGljIGZpbGVzIGZyb20gcHVibGljIGRpcmVjdG9yeVxuICAgIC8vIG5vdGU6IHRha2UgaW4gYSBkaWZmZXJlbnQgcHVibGljIGZvbGRlciwgc28gaXQgY2FuIHNlcnZlIGl0J3Mgb3duIGJ1bmRsZSBmcm9tIHRoZXJlP1xuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL2pzb25cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTsgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcblxuICAgIC8vIGFkZCBjdXN0b20gbWlkZGxld2FyZSAobm90ZTogYnVpbGQgb3V0IHRvIGFjY2VwdCBkeW5hbWljYWxseSB1c2Ugd2hhdCBpcyBpbiBzZXJ2ZXIvbWlkZGxld2FyZS9cbiAgICBhcHAudXNlKHJlcXVlc3RMb2dnZXIpO1xuXG4gICAgLy8gY29uZmlndXJlIHBhc3Nwb3J0XG4gICAgY29uc3Qgc3BlZWNoUGFzc3BvcnQgPSByZXF1aXJlKCdzcGVlY2hQYXNzcG9ydCcpO1xuICAgIC8vIGluaXRpYWxpemUgcGFzc3BvcnRcbiAgICBhcHAudXNlKGNvb2tpZVNlc3Npb24oe1xuICAgICAgbmFtZSAgOiAnc2Vzc2lvbicsXG4gICAgICBrZXlzICA6IFt0aGlzLnNlc3Npb25LZXldLFxuICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBpLmUuIDI0IGhvdXJzXG4gICAgfSkpO1xuICAgIGFwcC51c2Uoc3BlZWNoUGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgICAvLyBjb25maWd1cmUgaGFuZGxlYmFycyAmIHJlZ2lzdGVyIGl0IHdpdGggZXhwcmVzcyBhcHBcbiAgICBjb25zdCBoYnMgPSBleHByZXNzSGFuZGxlYmFycy5jcmVhdGUoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2VtYmVkJyxcbiAgICAgIGhhbmRsZWJhcnMgICA6IEhhbmRsZWJhcnMsXG4gICAgfSk7XG4gICAgYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGhicy5lbmdpbmUpO1xuICAgIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuICAgIC8vIHNldCB0aGUgcm91dGVzIG9uIHRoZSBhcHBcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hdXRoLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXBpLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvcGFnZXMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldHMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9mYWxsYmFjay8nKShhcHApO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gIH07XG4gIHRoaXMuaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmNyZWF0ZUFwcCgpO1xuICAgIHRoaXMuc2VydmVyID0gaHR0cC5TZXJ2ZXIodGhpcy5hcHApO1xuICB9O1xuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRiID0gcmVxdWlyZSgnLi9tb2RlbHMvJyk7XG4gICAgLy8gc3luYyBzZXF1ZWxpemVcbiAgICBkYi5zZXF1ZWxpemUuc3luYygpXG4gICAgLy8gc3RhcnQgdGhlIHNlcnZlclxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNlcnZlci5saXN0ZW4odGhpcy5QT1JULCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZlciBpcyBsaXN0ZW5pbmcgb24gUE9SVCAke3RoaXMuUE9SVH1gKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFN0YXJ0dXAgRXJyb3I6YCwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3QgcmVxdWVzdExvZ2dlciA9IChyZXEsIHJlcywgbmV4dCkgPT4geyAgLy8gY3VzdG9tIGxvZ2dpbmcgbWlkZGxld2FyZSB0byBsb2cgYWxsIGluY29taW5nIGh0dHAgcmVxdWVzdHNcbiAgbG9nZ2VyLnZlcmJvc2UoYFJlcXVlc3Qgb24gJHtyZXEub3JpZ2luYWxVcmx9IGZyb20gJHtyZXEuaXB9YCk7XG4gIG5leHQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWVzdExvZ2dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIExvZ2dlckNvbmZpZyAoKSB7XG4gIHRoaXMubG9nTGV2ZWwgPSAnZGVidWcnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBsb2dnZXIgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBsb2dnZXIuaW5mbygnY29uZmlndXJpbmcgd2luc3RvbiBsb2dnZXIuLi4nKTtcbiAgICAvLyB1cGRhdGUgdmFsdWVzIHdpdGggbG9jYWwgY29uZmlnIHBhcmFtc1xuICAgIGNvbnN0IHtsb2dMZXZlbH0gPSBjb25maWc7XG4gICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xuICAgIC8vIGNvbmZpZ3VyZSB0aGUgd2luc3RvbiBsb2dnZXJcbiAgICBsb2dnZXIuY29uZmlndXJlKHtcbiAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IChsb2dnZXIudHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgICAgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5sb2dMZXZlbCxcbiAgICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICBjb2xvcml6ZSAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIHByZXR0eVByaW50ICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgLy8gdGVzdCBhbGwgdGhlIGxvZyBsZXZlbHNcbiAgICBsb2dnZXIuaW5mbygndGVzdGluZyB3aW5zdG9uIGxvZyBsZXZlbHMuLi4nKTtcbiAgICBsb2dnZXIuZXJyb3IoJ0xldmVsIDAnKTtcbiAgICBsb2dnZXIud2FybignTGV2ZWwgMScpO1xuICAgIGxvZ2dlci5pbmZvKCdMZXZlbCAyJyk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoJ0xldmVsIDMnKTtcbiAgICBsb2dnZXIuZGVidWcoJ0xldmVsIDQnKTtcbiAgICBsb2dnZXIuc2lsbHkoJ0xldmVsIDUnKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IExvZ2dlckNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCB3aW5zdG9uID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gd2luc3Rvbi53YXJuKCdObyBzbGFjayBjb25maWcgcmVjZWl2ZWQnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlc1xuICAgIHdpbnN0b24uaW5mbygnY29uZmlndXJpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICAgIC8vIHVwZGF0ZSBzbGFjayB3ZWJob29rIHNldHRpbmdzXG4gICAgaWYgKHRoaXMuc2xhY2tXZWJIb29rKSB7XG4gICAgICAvLyBhZGQgYSB0cmFuc3BvcnQgZm9yIGVycm9ycyB0byBzbGFja1xuICAgICAgaWYgKHRoaXMuc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1lcnJvcnMtdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2staW5mby10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrSW5mb0NoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlc1xuICAgICAgd2luc3Rvbi5pbmZvKCd0ZXN0aW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgICAgd2luc3Rvbi5pbmZvKCdTbGFjayBcImluZm9cIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tc2xhY2std2ViaG9va1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGRiIH0gPSByZXF1aXJlKCdteXNxbENvbmZpZycpO1xuXG5jb25zdCByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8gPSAodXNlckluc3RhbmNlKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgdXNlckluZm9bJ2lkJ10gPSB1c2VySW5zdGFuY2UuaWQ7XG4gICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSB1c2VySW5zdGFuY2UudXNlck5hbWU7XG4gICAgdXNlckluc3RhbmNlXG4gICAgICAuZ2V0Q2hhbm5lbCgpXG4gICAgICAudGhlbigoe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0pID0+IHtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQoY2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJlc29sdmUodXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICByZXR1cm4gZGIuVXNlclxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge3VzZXJOYW1lOiB1c2VybmFtZX0sXG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQocGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdQYXNzd29yZCB3YXMgYSBtYXRjaCwgcmV0dXJuaW5nIFVzZXInKTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8odXNlcilcbiAgICAgICAgICAgICAgLnRoZW4odXNlckluZm8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfSxcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYG5ldyBjaGFubmVsIHNpZ251cCByZXF1ZXN0LiB1c2VyOiAke3VzZXJuYW1lfSBwYXNzOiAke3Bhc3N3b3JkfSAuYCk7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgLy8gc2VydmVyLXNpZGUgdmFsaWRhdG9uIG9mIGlucHV0cyAodXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFubmVsIGFuZCByZXRyaWV2ZSB0aGUgbWV0YWRhdGFcbiAgICByZXR1cm4gbGJyeUFwaS5jcmVhdGVDaGFubmVsKGBAJHt1c2VybmFtZX1gKVxuICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgdXNlck5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXJEYXRhID4nLCB1c2VyRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCBjaGFubmVsRGF0YSA9IHtcbiAgICAgICAgICBjaGFubmVsTmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgY2hhbm5lbENsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2hhbm5lbERhdGEgPicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIGNlcnRpZmljYXRlIHJlY29yZFxuICAgICAgICBjb25zdCBjZXJ0aWZpY2F0ZURhdGEgPSB7XG4gICAgICAgICAgY2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgICAgbmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgLy8gYWRkcmVzcyxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NlcnRpZmljYXRlRGF0YSA+JywgY2VydGlmaWNhdGVEYXRhKTtcbiAgICAgICAgLy8gc2F2ZSB1c2VyIGFuZCBjZXJ0aWZpY2F0ZSB0byBkYlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLlVzZXIuY3JlYXRlKHVzZXJEYXRhKSwgZGIuQ2hhbm5lbC5jcmVhdGUoY2hhbm5lbERhdGEpLCBkYi5DZXJ0aWZpY2F0ZS5jcmVhdGUoY2VydGlmaWNhdGVEYXRhKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbbmV3VXNlciwgbmV3Q2hhbm5lbCwgbmV3Q2VydGlmaWNhdGVdKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAvLyBzdG9yZSB0aGUgcmVsZXZhbnQgbmV3VXNlciBpbmZvIHRvIGJlIHBhc3NlZCBiYWNrIGZvciByZXEuVXNlclxuICAgICAgICB1c2VySW5mb1snaWQnXSA9IG5ld1VzZXIuaWQ7XG4gICAgICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gbmV3VXNlci51c2VyTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIC8vIGFzc29jaWF0ZSB0aGUgaW5zdGFuY2VzXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbmV3Q2VydGlmaWNhdGUuc2V0Q2hhbm5lbChuZXdDaGFubmVsKSwgbmV3Q2hhbm5lbC5zZXRVc2VyKG5ld1VzZXIpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQodXNlckluZm8uY2hhbm5lbENsYWltSWQsIHVzZXJJbmZvLmNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ3NpZ251cCBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGNvbnNvbGUubG9nKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGNvbnNvbGUubG9nKCdkZXNlcmlhbGl6aW5nIHVzZXInKTtcbiAgICBkb25lKG51bGwsIHVzZXIpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwiY29uc3Qgc3BlZWNoUGFzc3BvcnQgPSByZXF1aXJlKCdzcGVlY2hQYXNzcG9ydCcpO1xuY29uc3QgaGFuZGxlU2lnbnVwUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2lnbnVwJyk7XG5jb25zdCBoYW5kbGVMb2dpblJlcXVlc3QgPSByZXF1aXJlKCcuL2xvZ2luJyk7XG5jb25zdCBoYW5kbGVMb2dvdXRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dvdXQnKTtcbmNvbnN0IGhhbmRsZVVzZXJSZXF1ZXN0ID0gcmVxdWlyZSgnLi91c2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAucG9zdCgnL3NpZ251cCcsIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtc2lnbnVwJyksIGhhbmRsZVNpZ251cFJlcXVlc3QpO1xuICBhcHAucG9zdCgnL2xvZ2luJywgaGFuZGxlTG9naW5SZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2xvZ291dCcsIGhhbmRsZUxvZ291dFJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvdXNlcicsIGhhbmRsZVVzZXJSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJjb25zdCBzaWdudXAgPSAocmVxLCByZXMpID0+IHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2lnbnVwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcblxuY29uc3QgbG9naW4gPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgc3BlZWNoUGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1sb2dpbicsIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgIH1cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxLmxvZ0luKHVzZXIsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pKHJlcSwgcmVzLCBuZXh0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJjb25zdCBsb2dvdXQgPSAocmVxLCByZXMpID0+IHtcbiAgcmVxLmxvZ291dCgpO1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3lvdSBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCd9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsImNvbnN0IHVzZXIgPSAocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS51c2VyKSB7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS51c2VyfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAndXNlciBpcyBub3QgbG9nZ2VkIGluJ30pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsImNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NoYW5uZWxBdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSByZXF1aXJlKCcuL2NoYW5uZWxDbGFpbXMnKTtcbmNvbnN0IGNoYW5uZWxEYXRhID0gcmVxdWlyZSgnLi9jaGFubmVsRGF0YScpO1xuY29uc3QgY2hhbm5lbFNob3J0SWQgPSByZXF1aXJlKCcuL2NoYW5uZWxTaG9ydElkJyk7XG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9IHJlcXVpcmUoJy4vY2xhaW1BdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNsYWltRGF0YSA9IHJlcXVpcmUoJy4vY2xhaW1EYXRhJyk7XG5jb25zdCBjbGFpbUdldCA9IHJlcXVpcmUoJy4vY2xhaW1HZXQnKTtcbmNvbnN0IGNsYWltTG9uZ0lkID0gcmVxdWlyZSgnLi9jbGFpbUxvbmdJZCcpO1xuY29uc3QgY2xhaW1QdWJsaXNoID0gcmVxdWlyZSgnLi9jbGFpbVB1Ymxpc2gnKTtcbmNvbnN0IGNsYWltUmVzb2x2ZSA9IHJlcXVpcmUoJy4vY2xhaW1SZXNvbHZlJyk7XG5jb25zdCBjbGFpbVNob3J0SWQgPSByZXF1aXJlKCcuL2NsYWltU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1MaXN0ID0gcmVxdWlyZSgnLi9jbGFpbUxpc3QnKTtcbmNvbnN0IGZpbGVBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2ZpbGVBdmFpbGFiaWxpdHknKTtcblxuY29uc3QgbXVsdGlwYXJ0TWlkZGxld2FyZSA9IHJlcXVpcmUoJ2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gY2hhbm5lbCByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS86bmFtZScsIGNoYW5uZWxBdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsIGNoYW5uZWxTaG9ydElkKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2RhdGEvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZCcsIGNoYW5uZWxEYXRhKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2NsYWltcy86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkLzpwYWdlJywgY2hhbm5lbENsYWltcyk7XG4gIC8vIGNsYWltIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCBjbGFpbUxpc3QpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsIGNsYWltR2V0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjbGFpbUF2YWlsYWJpbGl0eSk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vcmVzb2x2ZS86bmFtZS86Y2xhaW1JZCcsIGNsYWltUmVzb2x2ZSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCBjbGFpbVB1Ymxpc2gpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjbGFpbVNob3J0SWQpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9sb25nLWlkJywgY2xhaW1Mb25nSWQpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsIGNsYWltRGF0YSk7XG4gIC8vIGZpbGUgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvZmlsZS9hdmFpbGFiaWxpdHkvOm5hbWUvOmNsYWltSWQnLCBmaWxlQXZhaWxhYmlsaXR5KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsImNvbnN0IHsgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5KG5hbWUpXG4gICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbEF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxBdmFpbGFiaWxpdHkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgZ2V0Q2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhbGwgY2xhaW1zIGZvciBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlO1xuICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsQ2xhaW1zO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsImNvbnN0IENMQUlNU19QRVJfUEFHRSA9IDEyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2xhaW1zLCBwYWdlKSB7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsUGFnZXMoY2xhaW1zKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uUGFnZSA9IG1vZHVsZS5leHBvcnRzLmdldFBhZ2VGcm9tUXVlcnkocGFnZSk7XG4gICAgY29uc3Qgdmlld0RhdGEgPSB7XG4gICAgICBjaGFubmVsTmFtZSAgICAgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbXMgICAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmV4dHJhY3RQYWdlRnJvbUNsYWltcyhjbGFpbXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHByZXZpb3VzUGFnZSAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lUHJldmlvdXNQYWdlKHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlICAgICAgIDogcGFnaW5hdGlvblBhZ2UsXG4gICAgICBuZXh0UGFnZSAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZU5leHRQYWdlKHRvdGFsUGFnZXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHRvdGFsUGFnZXMgICAgICAgIDogdG90YWxQYWdlcyxcbiAgICAgIHRvdGFsUmVzdWx0cyAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxDbGFpbXMoY2xhaW1zKSxcbiAgICB9O1xuICAgIHJldHVybiB2aWV3RGF0YTtcbiAgfSxcbiAgZ2V0UGFnZUZyb21RdWVyeSAocGFnZSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFnZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9LFxuICBleHRyYWN0UGFnZUZyb21DbGFpbXMgKGNsYWltcywgcGFnZU51bWJlcikge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gW107ICAvLyBpZiBubyBjbGFpbXMsIHJldHVybiB0aGlzIGRlZmF1bHRcbiAgICB9XG4gICAgLy8gbG9nZ2VyLmRlYnVnKCdjbGFpbXMgaXMgYXJyYXk/JywgQXJyYXkuaXNBcnJheShjbGFpbXMpKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoYHBhZ2VOdW1iZXIgJHtwYWdlTnVtYmVyfSBpcyBudW1iZXI/YCwgTnVtYmVyLmlzSW50ZWdlcihwYWdlTnVtYmVyKSk7XG4gICAgY29uc3QgY2xhaW1TdGFydEluZGV4ID0gKHBhZ2VOdW1iZXIgLSAxKSAqIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBjbGFpbUVuZEluZGV4ID0gY2xhaW1TdGFydEluZGV4ICsgQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IHBhZ2VPZkNsYWltcyA9IGNsYWltcy5zbGljZShjbGFpbVN0YXJ0SW5kZXgsIGNsYWltRW5kSW5kZXgpO1xuICAgIHJldHVybiBwYWdlT2ZDbGFpbXM7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsUGFnZXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG90YWxDbGFpbXMgPSBjbGFpbXMubGVuZ3RoO1xuICAgICAgaWYgKHRvdGFsQ2xhaW1zIDwgQ0xBSU1TX1BFUl9QQUdFKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgY29uc3QgZnVsbFBhZ2VzID0gTWF0aC5mbG9vcih0b3RhbENsYWltcyAvIENMQUlNU19QRVJfUEFHRSk7XG4gICAgICBjb25zdCByZW1haW5kZXIgPSB0b3RhbENsYWltcyAlIENMQUlNU19QRVJfUEFHRTtcbiAgICAgIGlmIChyZW1haW5kZXIgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZ1bGxQYWdlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdWxsUGFnZXMgKyAxO1xuICAgIH1cbiAgfSxcbiAgZGV0ZXJtaW5lUHJldmlvdXNQYWdlIChjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSAtIDE7XG4gIH0sXG4gIGRldGVybWluZU5leHRQYWdlICh0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gdG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSArIDE7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsQ2xhaW1zIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBjbGFpbXMubGVuZ3RoO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwiY29uc3QgeyBnZXRDaGFubmVsRGF0YSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBkYXRhIGZvciBhIGNoYW5uZWxcblxuKi9cblxuY29uc3QgY2hhbm5lbERhdGEgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxEYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbERhdGEuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxucm91dGUgdG8gZ2V0IGEgc2hvcnQgY2hhbm5lbCBpZCBmcm9tIGxvbmcgY2hhbm5lbCBJZFxuXG4qL1xuXG5jb25zdCBjaGFubmVsU2hvcnRJZFJvdXRlID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihzaG9ydElkKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxTaG9ydElkUm91dGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDZXJ0aWZpY2F0ZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NlcnRpZmljYXRlJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAga2V5VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHVibGljS2V5OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENlcnRpZmljYXRlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDZXJ0aWZpY2F0ZS5iZWxvbmdzVG8oZGIuQ2hhbm5lbCwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobG9uZ0NoYW5uZWxJZCwgY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgJHtjaGFubmVsTmFtZX06JHtsb25nQ2hhbm5lbElkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge25hbWU6IGNoYW5uZWxOYW1lfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsKHMpIGZvdW5kIHdpdGggdGhhdCBjaGFubmVsIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBsb25nQ2hhbm5lbElkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7Y2hhbm5lbENsYWltSWR9JWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSgke2NoYW5uZWxOYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2hhbm5lbE5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUudmFsaWRhdGVMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYHZhbGlkYXRlTG9uZ0NoYW5uZWxJZCgke25hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgJiYgKGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ2xhaW1JZCAmJiBjaGFubmVsQ2xhaW1JZC5sZW5ndGggPCA0MCkgeyAgLy8gaWYgYSBzaG9ydCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoY2hhbm5lbE5hbWUpOyAgLy8gaWYgbm8gY2hhbm5lbCBpZCBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQ2VydGlmaWNhdGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBDaGFubmVsID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2hhbm5lbCcsXG4gICAge1xuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDaGFubmVsLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDaGFubmVsLmJlbG9uZ3NUbyhkYi5Vc2VyKTtcbiAgICBDaGFubmVsLmhhc09uZShkYi5DZXJ0aWZpY2F0ZSk7XG4gIH07XG5cbiAgcmV0dXJuIENoYW5uZWw7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcbmNvbnN0IHsgYXNzZXREZWZhdWx0czogeyB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlKSB7XG4gIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgcmV0dXJuICdqcGVnJztcbiAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgcmV0dXJuICdwbmcnO1xuICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICByZXR1cm4gJ2dpZic7XG4gICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgIHJldHVybiAnbXA0JztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmRlYnVnKCdzZXR0aW5nIHVua25vd24gZmlsZSB0eXBlIGFzIGZpbGUgZXh0ZW5zaW9uIGpwZWcnKTtcbiAgICAgIHJldHVybiAnanBlZyc7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRldGVybWluZVRodW1ibmFpbCAoc3RvcmVkVGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKSB7XG4gIGlmIChzdG9yZWRUaHVtYm5haWwgPT09ICcnKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRUaHVtYm5haWw7XG4gIH1cbiAgcmV0dXJuIHN0b3JlZFRodW1ibmFpbDtcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFpbURhdGEgKGNsYWltKSB7XG4gIC8vIGxvZ2dlci5kZWJ1ZygncHJlcGFyaW5nIGNsYWltIGRhdGEgYmFzZWQgb24gcmVzb2x2ZWQgZGF0YTonLCBjbGFpbSk7XG4gIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gIGNsYWltWydob3N0J10gPSBob3N0O1xuICByZXR1cm4gY2xhaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2xhaW0gPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDbGFpbScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVJZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2VVcmw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBtZXRhZGF0YVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNvbnRlbnRUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2xhaW0uYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENsYWltLmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIGZvciAke2NsYWltTmFtZX0jJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbShzKSBmb3VuZCB3aXRoIHRoYXQgY2xhaW0gbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgY2xhaW1JZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zIGZvciAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICAgIHJhdyAgOiB0cnVlLCAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiBvbmx5IGRhdGEsIG5vdCBhbiBhcnJheSBvZiBpbnN0YW5jZXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbENsYWltc0FycmF5ID0+IHtcbiAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ2NoYW5uZWxjbGFpbXNhcnJheSBsZW5ndGg6JywgY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgY2hhbm5lbENsYWltc0FycmF5LmZvckVhY2goY2xhaW0gPT4ge1xuICAgICAgICAgICAgICAgIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgICAgICAgICAgICAgICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhaW07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShjaGFubmVsQ2xhaW1zQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGZpbmRpbmcgY2xhaW0gaWQgZm9yIGNsYWltICR7Y2xhaW1OYW1lfSBmcm9tIGNoYW5uZWwgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lLCBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydpZCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYCR7cmVzdWx0Lmxlbmd0aH0gcmVjb3JkcyBmb3VuZCBmb3IgXCIke2NsYWltTmFtZX1cIiBpbiBjaGFubmVsIFwiJHtjaGFubmVsQ2xhaW1JZH1cImApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBzaG9ydElkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7c2hvcnRJZH0lYCxcbiAgICAgICAgICAgIH19LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSwgIC8vIG5vdGU6IG1heWJlIGhlaWdodCBhbmQgZWZmZWN0aXZlIGFtb3VudCBuZWVkIHRvIHN3aXRjaD9cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2xlbmd0aCBvZiByZXN1bHQnLCByZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uZGF0YVZhbHVlcy5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0udmFsaWRhdGVMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2xhaW1JZCgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgaWYgKGNsYWltSWQgJiYgKGNsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2xhaW1JZCAmJiBjbGFpbUlkLmxlbmd0aCA8IDQwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTsgIC8vIGlmIGEgc2hvcnQgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZShjbGFpbU5hbWUpOyAgLy8gaWYgbm8gY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgQ2xhaW0ucmVzb2x2ZUNsYWltID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLnJlc29sdmVDbGFpbTogJHtuYW1lfSAke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2xhaW1BcnJheSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjbGFpbUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgbW9yZSB0aGFuIG9uZSByZWNvcmQgbWF0Y2hlcyAke25hbWV9IyR7Y2xhaW1JZH0gaW4gZGIuQ2xhaW1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIENsYWltO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSIH0pID0+IHtcbiAgY29uc3QgRmlsZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0ZpbGUnLFxuICAgIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgICA6IElOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHQgIDogMCxcbiAgICAgIH0sXG4gICAgICBmaWxlTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlUGF0aDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlVHlwZToge1xuICAgICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdHJlbmRpbmdFbGlnaWJsZToge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIEZpbGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIEZpbGUuaGFzTWFueShkYi5SZXF1ZXN0KTtcbiAgICBGaWxlLmhhc09uZShkYi5DbGFpbSk7XG4gIH07XG5cbiAgRmlsZS5nZXRSZWNlbnRDbGFpbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7XG4gICAgICB3aGVyZTogeyBuc2Z3OiBmYWxzZSwgdHJlbmRpbmdFbGlnaWJsZTogdHJ1ZSB9LFxuICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgbGltaXQ6IDI1LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBGaWxlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIFRFWFQgfSkgPT4ge1xuICBjb25zdCBSZXF1ZXN0ID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnUmVxdWVzdCcsXG4gICAge1xuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpcEFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgUmVxdWVzdC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgUmVxdWVzdC5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSZXF1ZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgVXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1VzZXInLFxuICAgIHtcbiAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgVXNlci5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgVXNlci5oYXNPbmUoZGIuQ2hhbm5lbCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY29tcGFyZVBhc3N3b3JkID0gZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChuZXdQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKG5ld1Bhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGN1cnJlbnQgcGFzc3dvcmQgd2l0aCB0aGUgbmV3IGhhc2hcbiAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAudXBkYXRlKHtwYXNzd29yZDogaGFzaH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gcHJlLXNhdmUgaG9vayBtZXRob2QgdG8gaGFzaCB0aGUgdXNlcidzIHBhc3N3b3JkIGJlZm9yZSB0aGUgdXNlcidzIGluZm8gaXMgc2F2ZWQgdG8gdGhlIGRiLlxuICBVc2VyLmhvb2soJ2JlZm9yZUNyZWF0ZScsICh1c2VyLCBvcHRpb25zKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdVc2VyLmJlZm9yZUNyZWF0ZSBob29rLi4uJyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBwYXNzd29yZCBzdHJpbmcgd2l0aCB0aGUgaGFzaCBwYXNzd29yZCB2YWx1ZVxuICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBoYXNoO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFVzZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy91c2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmNyeXB0XCJcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHRoaXMgc2l0ZSBwdWJsaXNoZWQgdG8gYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcmV0dXJuIGRhdGEgZm9yIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1EYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gIGxldCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGlmIChjbGFpbUlkID09PSAnbm9uZScpIGNsYWltSWQgPSBudWxsO1xuICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKGNsYWltSW5mbyA9PiB7XG4gICAgICBpZiAoIWNsYWltSW5mbykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogY2xhaW1JbmZvfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbURhdGE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbURhdGEuanMiLCJjb25zdCB7IGdldENsYWltIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUdldCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKG5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzb2x2ZVJlc3VsdCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgIGlmICghcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHVyaSBmb3VuZCBpbiBDbGFpbSB0YWJsZScpO1xuICAgICAgfVxuICAgICAgbGV0IGZpbGVEYXRhID0gY3JlYXRlRmlsZURhdGEocmVzb2x2ZVJlc3VsdCk7XG4gICAgICAvLyBnZXQgdGhlIGNsYWltXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVEYXRhLCBnZXRSZXN1bHQgXSkgPT4ge1xuICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVEYXRhLCB7bmFtZSwgY2xhaW1JZH0sICdGaWxlJyksIGdldFJlc3VsdF0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlLCBjb21wbGV0ZWQgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltR2V0LmpzIiwiY29uc3QgeyBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgbG9uZyBjbGFpbSBpZFxuXG4qL1xuXG5jb25zdCBjbGFpbUxvbmdJZCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IGJvZHkuY2hhbm5lbE5hbWU7XG4gIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgY29uc3QgY2xhaW1OYW1lID0gYm9keS5jbGFpbU5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBib2R5LmNsYWltSWQ7XG4gIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DTEFJTSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0fSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxvbmdJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTG9uZ0lkLmpzIiwiY29uc3QgeyBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIHB1Ymxpc2ggfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGF1dGhlbnRpY2F0ZVVzZXIgfSA9IHJlcXVpcmUoJ2F1dGgvYXV0aGVudGljYXRpb24uanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHB1Ymxpc2ggYSBjbGFpbSB0aHJvdWdoIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1QdWJsaXNoID0gKHsgYm9keSwgZmlsZXMsIGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgdXNlciB9LCByZXMpID0+IHtcbiAgLy8gZGVmaW5lIHZhcmlhYmxlc1xuICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAvLyByZWNvcmQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlcXVlc3RcbiAgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICAvLyB2YWxpZGF0ZUFwaVB1Ymxpc2hSZXF1ZXN0KGJvZHksIGZpbGVzKTtcbiAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAoe2ZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGV9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzKGZpbGVzKSk7XG4gICAgKHtjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmR9ID0gYm9keSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICBQcm9taXNlXG4gICAgLmFsbChbXG4gICAgICBhdXRoZW50aWNhdGVVc2VyKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlciksXG4gICAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKSxcbiAgICAgIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyhmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpLFxuICAgICAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyh0aHVtYm5haWxGaWxlUGF0aCwgbmFtZSwgbGljZW5zZSwgbnNmdyksXG4gICAgXSlcbiAgICAudGhlbigoW3tjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9LCB2YWxpZGF0ZWRDbGFpbU5hbWUsIHB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbFB1Ymxpc2hQYXJhbXNdKSA9PiB7XG4gICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfbmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgdGh1bWJuYWlsXG4gICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICBwdWJsaXNoKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlVHlwZSk7XG4gICAgICB9XG4gICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgcmV0dXJuIHB1Ymxpc2gocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKTtcbiAgICB9KVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICBkYXRhICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgdXJsICAgIDogYCR7aG9zdH0vJHtyZXN1bHQuY2xhaW1faWR9LyR7bmFtZX1gLFxuICAgICAgICAgIGxicnlUeCA6IHJlc3VsdCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgLy8gcmVjb3JkIHRoZSBwdWJsaXNoIGVuZCB0aW1lIGFuZCBzZW5kIHRvIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1QdWJsaXNoO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1QdWJsaXNoLmpzIiwiY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhlbnRpY2F0ZVVzZXIgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlcikge1xuICAgIC8vIGNhc2U6IG5vIGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIChhbm9ueW1vdXMpLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXNlciB0b2tlbiBpcyBwcm92aWRlZFxuICAgIGlmICghY2hhbm5lbE5hbWUgJiYgIWNoYW5uZWxJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IG51bGwsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCB1c2VyIHRva2VuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsTmFtZSAhPT0gdXNlci5jaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIG5hbWUgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWxJZCAmJiBjaGFubmVsSWQgIT09IHVzZXIuY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBpZCBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogdXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHBhc3N3b3JkIGluc3RlYWQgb2YgdXNlciB0b2tlblxuICAgIGlmICghY2hhbm5lbFBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ25vIGNoYW5uZWwgcGFzc3dvcmQgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCk7XG4gIH0sXG4gIGF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgdXNlclBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGhvaXN0ZWQgdmFyaWFibGVzXG4gICAgICBsZXQgY2hhbm5lbERhdGE7XG4gICAgICAvLyBidWlsZCB0aGUgcGFyYW1zIGZvciBmaW5kaW5nIHRoZSBjaGFubmVsXG4gICAgICBsZXQgY2hhbm5lbEZpbmRQYXJhbXMgPSB7fTtcbiAgICAgIGlmIChjaGFubmVsTmFtZSkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgIGlmIChjaGFubmVsSWQpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbElkO1xuICAgICAgLy8gZmluZCB0aGUgY2hhbm5lbFxuICAgICAgZGIuQ2hhbm5lbFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IGNoYW5uZWxGaW5kUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gY2hhbm5lbCBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5uZWxEYXRhID0gY2hhbm5lbC5nZXQoKTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgZGF0YTonLCBjaGFubmVsRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRiLlVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyB1c2VyTmFtZTogY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDEpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHVzZXJQYXNzd29yZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoJy4uLnBhc3N3b3JkIHdhcyBhIG1hdGNoLi4uJyk7XG4gICAgICAgICAgcmVzb2x2ZShjaGFubmVsRGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJjb25zdCB7IHJlc29sdmVVcmkgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBydW4gYSByZXNvbHZlIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuXG4qL1xuXG5jb25zdCBjbGFpbVJlc29sdmUgPSAoeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgIC50aGVuKHJlc29sdmVkVXJpID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc29sdmVkVXJpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUmVzb2x2ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUmVzb2x2ZS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIHNob3J0IGNsYWltIGlkIGZyb20gbG9uZyBjbGFpbSBJZFxuXG4qL1xuXG5jb25zdCBjbGFpbVNob3J0SWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHNob3J0SWR9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltU2hvcnRJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1MaXN0IH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGxpc3Qgb2YgY2xhaW1zXG5cbiovXG5cbmNvbnN0IGNsYWltTGlzdCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oY2xhaW1zTGlzdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjbGFpbXNMaXN0KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltTGlzdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTGlzdC5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlZSBpZiBhc3NldCBpcyBhdmFpbGFibGUgbG9jYWxseVxuXG4qL1xuXG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBkYi5GaWxlXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY2xhaW1JZCxcbiAgICAgIH0sXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBmYWxzZX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsZUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2ZpbGVBdmFpbGFiaWxpdHkuanMiLCJjb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcclxuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHVwbG9hZERpcmVjdG9yeSB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XHJcbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSBtdWx0aXBhcnQoe3VwbG9hZERpcjogdXBsb2FkRGlyZWN0b3J5fSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGFydE1pZGRsZXdhcmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW11bHRpcGFydHlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIlxuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcbmNvbnN0IGhhbmRsZUVtYmVkUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZEVtYmVkUGFnZScpO1xuY29uc3QgcmVkaXJlY3QgPSByZXF1aXJlKCcuL3JlZGlyZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAuZ2V0KCcvJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbG9naW4nLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9hYm91dCcsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgcmVkaXJlY3QoJy9wb3B1bGFyJykpO1xuICBhcHAuZ2V0KCcvcG9wdWxhcicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL25ldycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgaGFuZGxlRW1iZWRSZXF1ZXN0KTsgIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0dJTiB9IGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcyc7XG5jb25zdCB7IHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGlzYWJsZWQgICAgICAgICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkLFxuICBkaXNhYmxlZE1lc3NhZ2UgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWRNZXNzYWdlLFxuICBwdWJsaXNoSW5DaGFubmVsICA6IGZhbHNlLFxuICBzZWxlY3RlZENoYW5uZWwgICA6IExPR0lOLFxuICBzaG93TWV0YWRhdGFJbnB1dHM6IGZhbHNlLFxuICBzdGF0dXMgICAgICAgICAgICA6IHtcbiAgICBzdGF0dXMgOiBudWxsLFxuICAgIG1lc3NhZ2U6IG51bGwsXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgZmlsZSAgICAgICAgIDogbnVsbCxcbiAgICB1cmwgICAgICAgICAgOiBudWxsLFxuICAgIGNoYW5uZWwgICAgICA6IG51bGwsXG4gICAgcHVibGlzaFN1Ym1pdDogbnVsbCxcbiAgfSxcbiAgZmlsZSAgICA6IG51bGwsXG4gIGNsYWltICAgOiAnJyxcbiAgbWV0YWRhdGE6IHtcbiAgICB0aXRsZSAgICAgIDogJycsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGxpY2Vuc2UgICAgOiAnJyxcbiAgICBuc2Z3ICAgICAgIDogZmFsc2UsXG4gIH0sXG4gIHRodW1ibmFpbDogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9TRUxFQ1RFRDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpbml0aWFsU3RhdGUsIHsgIC8vIG5vdGU6IGNsZWFycyB0byBpbml0aWFsIHN0YXRlXG4gICAgICAgIGZpbGU6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgYWN0aW9ucy5NRVRBREFUQV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbWV0YWRhdGE6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLm1ldGFkYXRhLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0xBSU1fVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNsYWltOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw6IGFjdGlvbi5jaGFubmVsLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkVSUk9SX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBlcnJvcjogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZXJyb3IsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRUxFQ1RFRF9DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZWxlY3RlZENoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFM6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2hvd01ldGFkYXRhSW5wdXRzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5USFVNQk5BSUxfTkVXOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHRodW1ibmFpbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvcHVibGlzaC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsb2dnZWRJbkNoYW5uZWw6IHtcbiAgICBuYW1lICAgOiBudWxsLFxuICAgIHNob3J0SWQ6IG51bGwsXG4gICAgbG9uZ0lkIDogbnVsbCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9nZ2VkSW5DaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIEVSUk9SIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICByZXF1ZXN0OiB7XG4gICAgZXJyb3I6IG51bGwsXG4gICAgdHlwZSA6IG51bGwsXG4gICAgaWQgICA6IG51bGwsXG4gIH0sXG4gIHJlcXVlc3RMaXN0IDoge30sXG4gIGNoYW5uZWxMaXN0IDoge30sXG4gIGFzc2V0TGlzdCAgIDoge30sXG4gIGRpc3BsYXlBc3NldDoge1xuICAgIGVycm9yIDogbnVsbCxcbiAgICBzdGF0dXM6IExPQ0FMX0NIRUNLLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8vIGhhbmRsZSByZXF1ZXN0XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIHR5cGU6IGFjdGlvbi5kYXRhLnJlcXVlc3RUeXBlLFxuICAgICAgICAgIGlkICA6IGFjdGlvbi5kYXRhLnJlcXVlc3RJZCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBzdG9yZSByZXF1ZXN0c1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0xJU1RfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3RMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIGtleSAgOiBhY3Rpb24uZGF0YS5rZXksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBhc3NldCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkFTU0VUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBhc3NldExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmFzc2V0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yICAgIDogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBuYW1lICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICA6IGFjdGlvbi5kYXRhLmNsYWltSWQsXG4gICAgICAgICAgICBzaG9ydElkICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbURhdGE6IGFjdGlvbi5kYXRhLmNsYWltRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGNoYW5uZWwgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBuYW1lICAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgbG9uZ0lkICAgIDogYWN0aW9uLmRhdGEubG9uZ0lkLFxuICAgICAgICAgICAgc2hvcnRJZCAgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXSwge1xuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBkaXNwbGF5IGFuIGFzc2V0XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBlcnJvciA6IGFjdGlvbi5kYXRhLFxuICAgICAgICAgIHN0YXR1czogRVJST1IsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJjb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qge1xuICBhbmFseXRpY3M6IHtcbiAgICBnb29nbGVJZDogZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIH0sXG4gIGFzc2V0RGVmYXVsdHM6IHtcbiAgICB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwsXG4gICAgZGVzY3JpcHRpb246IGRlZmF1bHREZXNjcmlwdGlvbixcbiAgfSxcbiAgZGV0YWlsczoge1xuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gICAgdHdpdHRlcixcbiAgfSxcbn0gPSBzaXRlQ29uZmlnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRlc2NyaXB0aW9uLFxuICBnb29nbGVBbmFseXRpY3NJZCxcbiAgaG9zdCxcbiAgdGl0bGUsXG4gIHR3aXR0ZXIsXG4gIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgZGVmYXVsdFRodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvc2l0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IFB1Ymxpc2hUb29sIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRvb2wnO1xuXG5jbGFzcyBIb21lUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uJ30+XG4gICAgICAgIDxTRU8gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbid9PlxuICAgICAgICAgIDxQdWJsaXNoVG9vbCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWVQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0hvbWVQYWdlL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBjcmVhdGVQYWdlVGl0bGUgfSBmcm9tICd1dGlscy9wYWdlVGl0bGUnO1xuaW1wb3J0IHsgY3JlYXRlTWV0YVRhZ3MgfSBmcm9tICd1dGlscy9tZXRhVGFncyc7XG5pbXBvcnQgeyBjcmVhdGVDYW5vbmljYWxMaW5rIH0gZnJvbSAndXRpbHMvY2Fub25pY2FsTGluayc7XG5cbmNsYXNzIFNFTyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgLy8gcHJvcHMgZnJvbSBzdGF0ZVxuICAgIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIHByb3BzIGZyb20gcGFyZW50XG4gICAgY29uc3QgeyBhc3NldCwgY2hhbm5lbCwgcGFnZVVyaSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgeyBwYWdlVGl0bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gY3JlYXRlIHBhZ2UgdGl0bGUsIHRhZ3MsIGFuZCBjYW5vbmljYWwgbGlua1xuICAgIHBhZ2VUaXRsZSA9IGNyZWF0ZVBhZ2VUaXRsZShzaXRlVGl0bGUsIHBhZ2VUaXRsZSk7XG4gICAgY29uc3QgbWV0YVRhZ3MgPSBjcmVhdGVNZXRhVGFncyhzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgY2hhbm5lbCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICBjb25zdCBjYW5vbmljYWxMaW5rID0gY3JlYXRlQ2Fub25pY2FsTGluayhhc3NldCwgY2hhbm5lbCwgcGFnZVVyaSwgc2l0ZUhvc3QpO1xuICAgIC8vIHJlbmRlciByZXN1bHRzXG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWxtZXRcbiAgICAgICAgdGl0bGU9e3BhZ2VUaXRsZX1cbiAgICAgICAgbWV0YT17bWV0YVRhZ3N9XG4gICAgICAgIGxpbms9e1t7cmVsOiAnY2Fub25pY2FsJywgaHJlZjogY2Fub25pY2FsTGlua31dfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuXG5TRU8ucHJvcFR5cGVzID0ge1xuICBwYWdlVGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBhZ2VVcmkgIDogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2hhbm5lbCAgOiBQcm9wVHlwZXMub2JqZWN0LFxuICBhc3NldCAgICA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTRU87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9TRU8vdmlldy5qc3giLCJleHBvcnQgY29uc3QgY3JlYXRlUGFnZVRpdGxlID0gKHNpdGVUaXRsZSwgcGFnZVRpdGxlKSA9PiB7XG4gIGlmICghcGFnZVRpdGxlKSB7XG4gICAgcmV0dXJuIGAke3NpdGVUaXRsZX1gO1xuICB9XG4gIHJldHVybiBgJHtzaXRlVGl0bGV9IC0gJHtwYWdlVGl0bGV9YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwiY29uc3QgZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZSA9ICh0aHVtYm5haWwpID0+IHtcbiAgaWYgKHRodW1ibmFpbCkge1xuICAgIGNvbnN0IGZpbGVFeHQgPSB0aHVtYm5haWwuc3Vic3RyaW5nKHRodW1ibmFpbC5sYXN0SW5kZXhPZignLicpKTtcbiAgICBzd2l0Y2ggKGZpbGVFeHQpIHtcbiAgICAgIGNhc2UgJ2pwZWcnOlxuICAgICAgY2FzZSAnanBnJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICAgIGNhc2UgJ3BuZyc6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvcG5nJztcbiAgICAgIGNhc2UgJ2dpZic6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvZ2lmJztcbiAgICAgIGNhc2UgJ21wNCc6XG4gICAgICAgIHJldHVybiAndmlkZW8vbXA0JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvanBlZyc7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn07XG5cbmNvbnN0IGNyZWF0ZUJhc2ljTWV0YVRhZ3MgPSAoc2l0ZUhvc3QsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlcikgPT4ge1xuICByZXR1cm4gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaXRlSG9zdH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHNpdGVEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5J30sXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsTWV0YVRhZ3MgPSAoc2l0ZVRpdGxlLCBzaXRlSG9zdCwgc2l0ZVR3aXR0ZXIsIGNoYW5uZWwpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBsb25nSWQgfSA9IGNoYW5uZWw7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBgJHtuYW1lfSBvbiAke3NpdGVUaXRsZX1gfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBgJHtzaXRlSG9zdH0vJHtuYW1lfToke2xvbmdJZH1gfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogYCR7bmFtZX0sIGEgY2hhbm5lbCBvbiAke3NpdGVUaXRsZX1gfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUFzc2V0TWV0YVRhZ3MgPSAoc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGEgfSA9IGFzc2V0O1xuICBjb25zdCB7IGNvbnRlbnRUeXBlIH0gPSBjbGFpbURhdGE7XG4gIGNvbnN0IGVtYmVkVXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc2hvd1VybCA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfWA7XG4gIGNvbnN0IHNvdXJjZSA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfS4ke2NsYWltRGF0YS5maWxlRXh0fWA7XG4gIGNvbnN0IG9nVGl0bGUgPSBjbGFpbURhdGEudGl0bGUgfHwgY2xhaW1EYXRhLm5hbWU7XG4gIGNvbnN0IG9nRGVzY3JpcHRpb24gPSBjbGFpbURhdGEuZGVzY3JpcHRpb24gfHwgZGVmYXVsdERlc2NyaXB0aW9uO1xuICBjb25zdCBvZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZShjbGFpbURhdGEudGh1bWJuYWlsKTtcbiAgY29uc3Qgb2dUaHVtYm5haWwgPSBjbGFpbURhdGEudGh1bWJuYWlsIHx8IGRlZmF1bHRUaHVtYm5haWw7XG4gIGNvbnN0IG1ldGFUYWdzID0gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogb2dUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogc2hvd1VybH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IG9nRGVzY3JpcHRpb259LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOndpZHRoJywgY29udGVudDogNjAwfSxcbiAgICB7cHJvcGVydHk6ICdvZzppbWFnZTpoZWlnaHQnLCBjb250ZW50OiAzMTV9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgXTtcbiAgaWYgKGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JyB8fCBjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL3dlYm0nKSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbycsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW86c2VjdXJlX3VybCcsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW86dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IG9nVGh1bWJuYWlsfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZTp0eXBlJywgY29udGVudDogb2dUaHVtYm5haWxDb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICd2aWRlbyd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdwbGF5ZXInfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcicsIGNvbnRlbnQ6IGVtYmVkVXJsfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjp3aWR0aCcsIGNvbnRlbnQ6IDYwMH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjp0ZXh0OnBsYXllcl93aWR0aCcsIGNvbnRlbnQ6IDYwMH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6aGVpZ2h0JywgY29udGVudDogMzM3fSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpzdHJlYW0nLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbTpjb250ZW50X3R5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICB9IGVsc2Uge1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICdhcnRpY2xlJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnlfbGFyZ2VfaW1hZ2UnfSk7XG4gIH1cbiAgcmV0dXJuIG1ldGFUYWdzO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1ldGFUYWdzID0gKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0TWV0YVRhZ3Moc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICB9O1xuICBpZiAoY2hhbm5lbCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFubmVsTWV0YVRhZ3Moc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGNoYW5uZWwpO1xuICB9O1xuICByZXR1cm4gY3JlYXRlQmFzaWNNZXRhVGFncyhzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvbWV0YVRhZ3MuanMiLCJjb25zdCBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsgPSAocGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke3BhZ2V9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayA9IChhc3NldCwgc2l0ZUhvc3QpID0+IHtcbiAgbGV0IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkO1xuICBpZiAoYXNzZXQuY2xhaW1EYXRhKSB7XG4gICAgKHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQgfSA9IGFzc2V0LmNsYWltRGF0YSk7XG4gIH07XG4gIGlmIChjaGFubmVsTmFtZSkge1xuICAgIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfS8ke25hbWV9YDtcbiAgfTtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NsYWltSWR9LyR7bmFtZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsgPSAoY2hhbm5lbCwgc2l0ZUhvc3QpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBsb25nSWQgfSA9IGNoYW5uZWw7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtuYW1lfToke2xvbmdJZH1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbm9uaWNhbExpbmsgPSAoYXNzZXQsIGNoYW5uZWwsIHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIGlmIChhc3NldCkge1xuICAgIHJldHVybiBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsoYXNzZXQsIHNpdGVIb3N0KTtcbiAgfVxuICBpZiAoY2hhbm5lbCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayhjaGFubmVsLCBzaXRlSG9zdCk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayhwYWdlLCBzaXRlSG9zdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2TGluaywgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IExvZ28gZnJvbSAnY29tcG9uZW50cy9Mb2dvJztcbmltcG9ydCBOYXZCYXJDaGFubmVsRHJvcGRvd24gZnJvbSAnY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jb25zdCBWSUVXID0gJ1ZJRVcnO1xuY29uc3QgTE9HT1VUID0gJ0xPR09VVCc7XG5cbmNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyID0gdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nb3V0VXNlciA9IHRoaXMubG9nb3V0VXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlcigpO1xuICB9XG4gIGNoZWNrRm9yTG9nZ2VkSW5Vc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL3VzZXInLCBwYXJhbXMpXG4gICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihkYXRhLmNoYW5uZWxOYW1lLCBkYXRhLnNob3J0Q2hhbm5lbElkLCBkYXRhLmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL3VzZXIgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBsb2dvdXRVc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL2xvZ291dCcsIHBhcmFtcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dvdXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL2xvZ291dCBlcnJvcicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIExPR09VVDpcbiAgICAgICAgdGhpcy5sb2dvdXRVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWSUVXOlxuICAgICAgICAvLyByZWRpcmVjdCB0byBjaGFubmVsIHBhZ2VcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC8ke3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9OiR7dGhpcy5wcm9wcy5jaGFubmVsTG9uZ0lkfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc2l0ZURlc2NyaXB0aW9uIH0gPSAgdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgbmF2LWJhcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1zaG9ydCBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcic+XG4gICAgICAgICAgPExvZ28gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tY2VudGVyJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbmF2LWJhci10YWdsaW5lJz57c2l0ZURlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tcmlnaHQnPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvJyBleGFjdD5QdWJsaXNoPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyAgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2Fib3V0Jz5BYm91dDwvTmF2TGluaz5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGFubmVsTmFtZSA/IChcbiAgICAgICAgICAgICAgPE5hdkJhckNoYW5uZWxEcm9wZG93blxuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdGlvbj17dGhpcy5oYW5kbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGlvbj17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBWSUVXPXtWSUVXfVxuICAgICAgICAgICAgICAgIExPR09VVD17TE9HT1VUfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPE5hdkxpbmsgaWQ9J25hdi1iYXItbG9naW4tbGluaycgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvbG9naW4nPkNoYW5uZWw8L05hdkxpbms+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihOYXZCYXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZnVuY3Rpb24gTG9nbyAoKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2ZXJzaW9uPScxLjEnIGlkPSdMYXllcl8xJyB4PScwcHgnIHk9JzBweCcgaGVpZ2h0PScyNHB4JyB2aWV3Qm94PScwIDAgODAgMzEnIGVuYWJsZUJhY2tncm91bmQ9J25ldyAwIDAgODAgMzEnIGNsYXNzTmFtZT0nbmF2LWJhci1sb2dvJz5cbiAgICAgIDxMaW5rIHRvPScvJz5cbiAgICAgICAgPHRpdGxlPkxvZ288L3RpdGxlPlxuICAgICAgICA8ZGVzYz5TcGVlLmNoIGxvZ288L2Rlc2M+XG4gICAgICAgIDxnIGlkPSdBYm91dCc+XG4gICAgICAgICAgPGcgaWQ9J1B1Ymxpc2gtRm9ybS1WMi1feDI4X2ZpbGxlZF94MjlfJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNDIuMDAwMDAwLCAtMjMuMDAwMDAwKSc+XG4gICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQyLjAwMDAwMCwgMjIuMDAwMDAwKSc+XG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT0nbWF0cml4KDEgMCAwIDEgMCAyMCknIGZvbnRTaXplPScyNScgZm9udEZhbWlseT0nUm9ib3RvJz5TcGVlJmx0O2g8L3RleHQ+XG4gICAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDMwLjAwMDAwMCknPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzA5RjkxMScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTAuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5JyBmaWxsPSdub25lJyBzdHJva2U9JyMwMjlENzQnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00xNi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjRTM1QkQ4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMzIuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTMnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzQxNTZDNScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTQ4LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS00JyBmaWxsPSdub25lJyBzdHJva2U9JyM2MzU2ODgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J002NC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9MaW5rPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gTmF2QmFyQ2hhbm5lbERyb3Bkb3duICh7IGNoYW5uZWxOYW1lLCBoYW5kbGVTZWxlY3Rpb24sIGRlZmF1bHRTZWxlY3Rpb24sIFZJRVcsIExPR09VVCB9KSB7XG4gIHJldHVybiAoXG4gICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdyBsaW5rLS1uYXYnIG9uQ2hhbmdlPXtoYW5kbGVTZWxlY3Rpb259IHZhbHVlPXtkZWZhdWx0U2VsZWN0aW9ufT5cbiAgICAgIDxvcHRpb24gaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPntjaGFubmVsTmFtZX08L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e1ZJRVd9PlZpZXc8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e0xPR09VVH0+TG9nb3V0PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZCYXJDaGFubmVsRHJvcGRvd247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gMTE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGlzYWJsZWQ6IHB1Ymxpc2guZGlzYWJsZWQsXG4gICAgZmlsZSAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICBzdGF0dXMgIDogcHVibGlzaC5zdGF0dXMuc3RhdHVzLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2NvbnRhaW5lcnMvRHJvcHpvbmUnO1xuaW1wb3J0IFB1Ymxpc2hEZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMnO1xuaW1wb3J0IFB1Ymxpc2hTdGF0dXMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoU3RhdHVzJztcbmltcG9ydCBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZSc7XG5cbmNsYXNzIFB1Ymxpc2hUb29sIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgY29uc29sZS5sb2coJ3B1Ymxpc2ggaXMgZGlzYWJsZWQnKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygncHVibGlzaCBpcyBub3QgZGlzYWJsZWQnKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQdWJsaXNoU3RhdHVzIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gPFB1Ymxpc2hEZXRhaWxzIC8+O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gPERyb3B6b25lIC8+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRvb2w7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB2YWxpZGF0ZUZpbGUgfSBmcm9tICd1dGlscy9maWxlJztcbmltcG9ydCBQdWJsaXNoUHJldmlldyBmcm9tICdjb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3JztcblxuY2xhc3MgRHJvcHpvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRyYWdPdmVyICA6IGZhbHNlLFxuICAgICAgbW91c2VPdmVyIDogZmFsc2UsXG4gICAgICBkaW1QcmV2aWV3OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlRHJvcCA9IHRoaXMuaGFuZGxlRHJvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ092ZXIgPSB0aGlzLmhhbmRsZURyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnRW5kID0gdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnRW50ZXIgPSB0aGlzLmhhbmRsZURyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0xlYXZlID0gdGhpcy5oYW5kbGVEcmFnTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgPSB0aGlzLmhhbmRsZU1vdXNlRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgPSB0aGlzLmhhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRmlsZUlucHV0ID0gdGhpcy5oYW5kbGVGaWxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNob29zZUZpbGUgPSB0aGlzLmNob29zZUZpbGUuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVEcm9wIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IGZhbHNlfSk7XG4gICAgLy8gaWYgZHJvcHBlZCBpdGVtcyBhcmVuJ3QgZmlsZXMsIHJlamVjdCB0aGVtXG4gICAgY29uc3QgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgaWYgKGR0Lml0ZW1zKSB7XG4gICAgICBpZiAoZHQuaXRlbXNbMF0ua2luZCA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGNvbnN0IGRyb3BwZWRGaWxlID0gZHQuaXRlbXNbMF0uZ2V0QXNGaWxlKCk7XG4gICAgICAgIHRoaXMuY2hvb3NlRmlsZShkcm9wcGVkRmlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGhhbmRsZURyYWdPdmVyIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaGFuZGxlRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICB2YXIgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgaWYgKGR0Lml0ZW1zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGR0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGR0Lml0ZW1zLnJlbW92ZShpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmNsZWFyRGF0YSgpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnRW50ZXIgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiB0cnVlLCBkaW1QcmV2aWV3OiB0cnVlfSk7XG4gIH1cbiAgaGFuZGxlRHJhZ0xlYXZlICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogZmFsc2UsIGRpbVByZXZpZXc6IGZhbHNlfSk7XG4gIH1cbiAgaGFuZGxlTW91c2VFbnRlciAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlLCBkaW1QcmV2aWV3OiB0cnVlfSk7XG4gIH1cbiAgaGFuZGxlTW91c2VMZWF2ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiBmYWxzZSwgZGltUHJldmlldzogZmFsc2V9KTtcbiAgfVxuICBoYW5kbGVDbGljayAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlX2lucHV0JykuY2xpY2soKTtcbiAgfVxuICBoYW5kbGVGaWxlSW5wdXQgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmaWxlTGlzdCA9IGV2ZW50LnRhcmdldC5maWxlcztcbiAgICB0aGlzLmNob29zZUZpbGUoZmlsZUxpc3RbMF0pO1xuICB9XG4gIGNob29zZUZpbGUgKGZpbGUpIHtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsaWRhdGVGaWxlKGZpbGUpOyAvLyB2YWxpZGF0ZSB0aGUgZmlsZSdzIG5hbWUsIHR5cGUsIGFuZCBzaXplXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZXRGaWxlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICAvLyBzdGFnZSBpdCBzbyBpdCB3aWxsIGJlIHJlYWR5IHdoZW4gdGhlIHB1Ymxpc2ggYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0RmlsZShmaWxlKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbic+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J2lucHV0LWZpbGUnIHR5cGU9J2ZpbGUnIGlkPSdmaWxlX2lucHV0JyBuYW1lPSdmaWxlX2lucHV0JyBhY2NlcHQ9J3ZpZGVvLyosaW1hZ2UvKicgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsZUlucHV0fSBlbmNUeXBlPSdtdWx0aXBhcnQvZm9ybS1kYXRhJyAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxkaXYgaWQ9J3ByZXZpZXctZHJvcHpvbmUnIGNsYXNzTmFtZT17J3JvdyByb3ctLXBhZGRlZCByb3ctLXRhbGwgZHJvcHpvbmUnICsgKHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAnIGRyb3B6b25lLS1kcmFnLW92ZXInIDogJycpfSBvbkRyb3A9e3RoaXMuaGFuZGxlRHJvcH0gb25EcmFnT3Zlcj17dGhpcy5oYW5kbGVEcmFnT3Zlcn0gb25EcmFnRW5kPXt0aGlzLmhhbmRsZURyYWdFbmR9IG9uRHJhZ0VudGVyPXt0aGlzLmhhbmRsZURyYWdFbnRlcn0gb25EcmFnTGVhdmU9e3RoaXMuaGFuZGxlRHJhZ0xlYXZlfSBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn0gb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vdXNlTGVhdmV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbGUgPyAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8UHVibGlzaFByZXZpZXdcbiAgICAgICAgICAgICAgICBkaW1QcmV2aWV3PXt0aGlzLnN0YXRlLmRpbVByZXZpZXd9XG4gICAgICAgICAgICAgICAgZmlsZT17dGhpcy5wcm9wcy5maWxlfVxuICAgICAgICAgICAgICAgIHRodW1ibmFpbD17dGhpcy5wcm9wcy50aHVtYm5haWx9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLXRleHQtaG9sZGVyJyBjbGFzc05hbWU9eydmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJ30+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRyYWdPdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtZHJhZ292ZXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPkRyb3AgaXQuPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5tb3VzZU92ZXIgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1pbnN0cnVjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS1wbGFjZWhvbGRlciBpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnIGlkPSdpbnB1dC1lcnJvci1maWxlLXNlbGVjdGlvbic+e3RoaXMucHJvcHMuZmlsZUVycm9yfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+RHJhZyAmIGRyb3AgaW1hZ2Ugb3IgdmlkZW8gaGVyZSB0byBwdWJsaXNoPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPk9SPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUtLXVuZGVybGluZWQnPkNIT09TRSBGSUxFPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS10ZXh0LWhvbGRlcicgY2xhc3NOYW1lPXsnZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcid9PlxuICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtZHJhZ292ZXInPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz5Ecm9wIGl0LjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1pbnN0cnVjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtcGxhY2Vob2xkZXIgaW5mby1tZXNzYWdlLS1mYWlsdXJlJyBpZD0naW5wdXQtZXJyb3ItZmlsZS1zZWxlY3Rpb24nPnt0aGlzLnByb3BzLmZpbGVFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgICA8cD5EcmFnICYgZHJvcCBpbWFnZSBvciB2aWRlbyBoZXJlIHRvIHB1Ymxpc2g8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPk9SPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlLS11bmRlcmxpbmVkJz5DSE9PU0UgRklMRTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcHpvbmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS92aWV3LmpzeCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB2YWxpZGF0ZUZpbGUgKGZpbGUpIHtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwcm92aWRlZCcpO1xuICAgIH1cbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSBzaXplIGFuZCB0eXBlXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBHSUZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZmlsZS50eXBlICsgJyBpcyBub3QgYSBzdXBwb3J0ZWQgZmlsZSB0eXBlLiBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9maWxlLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIFB1Ymxpc2hQcmV2aWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbWdTb3VyY2UgICAgICAgOiAnJyxcbiAgICAgIGRlZmF1bHRUaHVtYm5haWw6ICcvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgfTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2UodGhpcy5wcm9wcy5maWxlKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIGlmIChuZXdQcm9wcy5maWxlICE9PSB0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlKG5ld1Byb3BzLmZpbGUpO1xuICAgIH1cbiAgICBpZiAobmV3UHJvcHMudGh1bWJuYWlsICE9PSB0aGlzLnByb3BzLnRodW1ibmFpbCkge1xuICAgICAgaWYgKG5ld1Byb3BzLnRodW1ibmFpbCkge1xuICAgICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKG5ld1Byb3BzLnRodW1ibmFpbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHRoaXMuc3RhdGUuZGVmYXVsdFRodW1ibmFpbH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSAoZmlsZSkge1xuICAgIGNvbnN0IHByZXZpZXdSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHByZXZpZXdSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICBwcmV2aWV3UmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogcHJldmlld1JlYWRlci5yZXN1bHR9KTtcbiAgICB9O1xuICB9XG4gIHNldFByZXZpZXdJbWFnZVNvdXJjZSAoZmlsZSkge1xuICAgIGlmIChmaWxlLnR5cGUgIT09ICd2aWRlby9tcDQnKSB7XG4gICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKGZpbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy50aHVtYm5haWwpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSh0aGlzLnByb3BzLnRodW1ibmFpbCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHRoaXMuc3RhdGUuZGVmYXVsdFRodW1ibmFpbH0pO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aW1nXG4gICAgICAgIGlkPSdkcm9wem9uZS1wcmV2aWV3J1xuICAgICAgICBzcmM9e3RoaXMuc3RhdGUuaW1nU291cmNlfVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuZGltUHJldmlldyA/ICdkaW0nIDogJyd9XG4gICAgICAgIGFsdD0ncHVibGlzaCBwcmV2aWV3J1xuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuXG5QdWJsaXNoUHJldmlldy5wcm9wVHlwZXMgPSB7XG4gIGRpbVByZXZpZXc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZpbGUgICAgICA6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgdGh1bWJuYWlsIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hQcmV2aWV3O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NsZWFyRmlsZSwgc3RhcnRQdWJsaXNofSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZTogcHVibGlzaC5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBjbGVhckZpbGUsXG4gIHN0YXJ0UHVibGlzaCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2NvbnRhaW5lcnMvRHJvcHpvbmUnO1xuaW1wb3J0IFB1Ymxpc2hUaXRsZUlucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hVcmxJbnB1dCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dCc7XG5pbXBvcnQgUHVibGlzaFRodW1ibmFpbElucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0JztcbmltcG9ydCBQdWJsaXNoTWV0YWRhdGFJbnB1dHMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMnO1xuaW1wb3J0IENoYW5uZWxTZWxlY3QgZnJvbSAnY29udGFpbmVycy9DaGFubmVsU2VsZWN0JztcblxuY2xhc3MgUHVibGlzaERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLm9uUHVibGlzaFN1Ym1pdCA9IHRoaXMub25QdWJsaXNoU3VibWl0LmJpbmQodGhpcyk7XG4gIH1cbiAgb25QdWJsaXNoU3VibWl0ICgpIHtcbiAgICB0aGlzLnByb3BzLnN0YXJ0UHVibGlzaCh0aGlzLnByb3BzLmhpc3RvcnkpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby1ib3R0b20nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgIDxQdWJsaXNoVGl0bGVJbnB1dCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey8qIGxlZnQgY29sdW1uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCcgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPERyb3B6b25lIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogcmlnaHQgY29sdW1uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgPGRpdiBpZD0ncHVibGlzaC1hY3RpdmUtYXJlYScgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8UHVibGlzaFVybElucHV0IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxTZWxlY3QgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyAodGhpcy5wcm9wcy5maWxlLnR5cGUgPT09ICd2aWRlby9tcDQnKSAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlICc+XG4gICAgICAgICAgICAgICAgPFB1Ymxpc2hUaHVtYm5haWxJbnB1dCAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0tbm8tYm90dG9tIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxQdWJsaXNoTWV0YWRhdGFJbnB1dHMgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8YnV0dG9uIGlkPSdwdWJsaXNoLXN1Ym1pdCcgY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS1sYXJnZScgb25DbGljaz17dGhpcy5vblB1Ymxpc2hTdWJtaXR9PlB1Ymxpc2g8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLWJvdHRvbSBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLWNhbmNlbCcgb25DbGljaz17dGhpcy5wcm9wcy5jbGVhckZpbGV9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPkJ5IGNsaWNraW5nICdQdWJsaXNoJywgeW91IGFmZmlybSB0aGF0IHlvdSBoYXZlIHRoZSByaWdodHMgdG8gcHVibGlzaCB0aGlzIGNvbnRlbnQgdG8gdGhlIExCUlkgbmV0d29yaywgYW5kIHRoYXQgeW91IHVuZGVyc3RhbmQgdGhlIHByb3BlcnRpZXMgb2YgcHVibGlzaGluZyBpdCB0byBhIGRlY2VudHJhbGl6ZWQsIHVzZXItY29udHJvbGxlZCBuZXR3b3JrLiA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vbGVhcm4nPlJlYWQgbW9yZS48L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihQdWJsaXNoRGV0YWlscyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGV0YWlscy92aWV3LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHt1cGRhdGVNZXRhZGF0YX0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHRpdGxlOiBwdWJsaXNoLm1ldGFkYXRhLnRpdGxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uTWV0YWRhdGFDaGFuZ2U6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTWV0YWRhdGEobmFtZSwgdmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFB1Ymxpc2hUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGUpIHtcbiAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdwdWJsaXNoLXRpdGxlJyBjbGFzc05hbWU9J2lucHV0LXRleHQgdGV4dC0tbGFyZ2UgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgbmFtZT0ndGl0bGUnIHBsYWNlaG9sZGVyPSdHaXZlIHlvdXIgcG9zdCBhIHRpdGxlLi4uJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gdmFsdWU9e3RoaXMucHJvcHMudGl0bGV9IC8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVGl0bGVJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXcuanN4IiwiaW1wb3J0IHt1cGRhdGVDbGFpbSwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWUgICA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBmaWxlTmFtZSAgICAgICAgICAgICAgOiBwdWJsaXNoLmZpbGUubmFtZSxcbiAgICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBwdWJsaXNoLnB1Ymxpc2hJbkNoYW5uZWwsXG4gICAgc2VsZWN0ZWRDaGFubmVsICAgICAgIDogcHVibGlzaC5zZWxlY3RlZENoYW5uZWwsXG4gICAgY2xhaW0gICAgICAgICAgICAgICAgIDogcHVibGlzaC5jbGFpbSxcbiAgICB1cmxFcnJvciAgICAgICAgICAgICAgOiBwdWJsaXNoLmVycm9yLnVybCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNsYWltQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUNsYWltKHZhbHVlKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcigncHVibGlzaFN1Ym1pdCcsIG51bGwpKTtcbiAgICB9LFxuICAgIG9uVXJsRXJyb3I6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ3VybCcsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuaW1wb3J0IFVybE1pZGRsZSBmcm9tICdjb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5JztcblxuY2xhc3MgUHVibGlzaFVybElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgY2xhaW0sIGZpbGVOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY2xhaW0pIHtcbiAgICAgIHRoaXMuc2V0Q2xhaW1OYW1lKGZpbGVOYW1lKTtcbiAgICB9XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAoeyBjbGFpbSwgZmlsZU5hbWUgfSkge1xuICAgIC8vIGlmIGEgbmV3IGZpbGUgd2FzIGNob3NlbiwgdXBkYXRlIHRoZSBjbGFpbSBuYW1lXG4gICAgaWYgKGZpbGVOYW1lICE9PSB0aGlzLnByb3BzLmZpbGVOYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRDbGFpbU5hbWUoZmlsZU5hbWUpO1xuICAgIH1cbiAgICAvLyBpZiB0aGUgY2xhaW0gaGFzIHVwZGF0ZWQsIGNoZWNrIGl0cyBhdmFpbGFiaWxpdHlcbiAgICBpZiAoY2xhaW0gIT09IHRoaXMucHJvcHMuY2xhaW0pIHtcbiAgICAgIHRoaXMudmFsaWRhdGVDbGFpbShjbGFpbSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUlucHV0KHZhbHVlKTtcbiAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgdGhpcy5wcm9wcy5vbkNsYWltQ2hhbmdlKHZhbHVlKTtcbiAgfVxuICBjbGVhbnNlSW5wdXQgKGlucHV0KSB7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMrL2csICctJyk7IC8vIHJlcGxhY2Ugc3BhY2VzIHdpdGggZGFzaGVzXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOS1dL2csICcnKTsgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgb3IgJy0nXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIHNldENsYWltTmFtZSAoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZVdpdGhvdXRFbmRpbmcgPSBmaWxlTmFtZS5zdWJzdHJpbmcoMCwgZmlsZU5hbWUubGFzdEluZGV4T2YoJy4nKSk7XG4gICAgY29uc3QgY2xlYW5DbGFpbU5hbWUgPSB0aGlzLmNsZWFuc2VJbnB1dChmaWxlTmFtZVdpdGhvdXRFbmRpbmcpO1xuICAgIHRoaXMucHJvcHMub25DbGFpbUNoYW5nZShjbGVhbkNsYWltTmFtZSk7XG4gIH1cbiAgdmFsaWRhdGVDbGFpbSAoY2xhaW0pIHtcbiAgICBpZiAoIWNsYWltKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5vblVybEVycm9yKCdFbnRlciBhIHVybCBhYm92ZScpO1xuICAgIH1cbiAgICByZXF1ZXN0KGAvYXBpL2NsYWltL2F2YWlsYWJpbGl0eS8ke2NsYWltfWApXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25VcmxFcnJvcihudWxsKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25VcmxFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjbGFpbSwgbG9nZ2VkSW5DaGFubmVsTmFtZSwgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZCwgcHVibGlzaEluQ2hhbm5lbCwgc2VsZWN0ZWRDaGFubmVsLCB1cmxFcnJvciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgc3Bhbi0tcmVsYXRpdmUnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSc+c3BlZS5jaCAvIDwvc3Bhbj5cbiAgICAgICAgICA8VXJsTWlkZGxlXG4gICAgICAgICAgICBwdWJsaXNoSW5DaGFubmVsPXtwdWJsaXNoSW5DaGFubmVsfVxuICAgICAgICAgICAgc2VsZWN0ZWRDaGFubmVsPXtzZWxlY3RlZENoYW5uZWx9XG4gICAgICAgICAgICBsb2dnZWRJbkNoYW5uZWxOYW1lPXtsb2dnZWRJbkNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZD17bG9nZ2VkSW5DaGFubmVsU2hvcnRJZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nY2xhaW0tbmFtZS1pbnB1dCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBuYW1lPSdjbGFpbScgcGxhY2Vob2xkZXI9J3lvdXItdXJsLWhlcmUnIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSB2YWx1ZT17Y2xhaW19IC8+XG4gICAgICAgICAgeyAoY2xhaW0gJiYgIXVybEVycm9yKSAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jbGFpbS1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICB7IHVybEVycm9yICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxNid9PC9zcGFuPiB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHsgdXJsRXJyb3IgPyAoXG4gICAgICAgICAgICA8cCBpZD0naW5wdXQtZXJyb3ItY2xhaW0tbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt1cmxFcnJvcn08L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5DaG9vc2UgYSBjdXN0b20gdXJsPC9wPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVXJsSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZnVuY3Rpb24gVXJsTWlkZGxlICh7cHVibGlzaEluQ2hhbm5lbCwgc2VsZWN0ZWRDaGFubmVsLCBsb2dnZWRJbkNoYW5uZWxOYW1lLCBsb2dnZWRJbkNoYW5uZWxTaG9ydElkfSkge1xuICBpZiAocHVibGlzaEluQ2hhbm5lbCkge1xuICAgIGlmIChzZWxlY3RlZENoYW5uZWwgPT09IGxvZ2dlZEluQ2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiA8c3BhbiBpZD0ndXJsLWNoYW5uZWwnIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSc+e2xvZ2dlZEluQ2hhbm5lbE5hbWV9Ontsb2dnZWRJbkNoYW5uZWxTaG9ydElkfSAvPC9zcGFuPjtcbiAgICB9XG4gICAgcmV0dXJuIDxzcGFuIGlkPSd1cmwtY2hhbm5lbC1wbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5IHRvb2x0aXAnPkBjaGFubmVsPHNwYW5cbiAgICAgIGNsYXNzTmFtZT0ndG9vbHRpcC10ZXh0Jz5TZWxlY3QgYSBjaGFubmVsIGJlbG93PC9zcGFuPiAvPC9zcGFuPjtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxzcGFuIGlkPSd1cmwtbm8tY2hhbm5lbC1wbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5IHRvb2x0aXAnPnh5ejxzcGFuIGNsYXNzTmFtZT0ndG9vbHRpcC10ZXh0Jz5UaGlzIHdpbGwgYmUgYSByYW5kb20gaWQ8L3NwYW4+IC88L3NwYW4+XG4gICk7XG59XG5cblVybE1pZGRsZS5wcm9wVHlwZXMgPSB7XG4gIHB1Ymxpc2hJbkNoYW5uZWwgICAgICA6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGxvZ2dlZEluQ2hhbm5lbE5hbWUgICA6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVcmxNaWRkbGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25OZXdUaHVtYm5haWwgfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaDogeyBmaWxlIH0gfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uTmV3VGh1bWJuYWlsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICBsZXQgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICBsZXQgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG4gIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgbGV0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6IG1pbWVTdHJpbmd9KTtcbn1cblxuY2xhc3MgUHVibGlzaFRodW1ibmFpbElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWRlb1NvdXJjZSAgIDogbnVsbCxcbiAgICAgIGVycm9yICAgICAgICAgOiBudWxsLFxuICAgICAgc2xpZGVyTWluUmFuZ2U6IDEsXG4gICAgICBzbGlkZXJNYXhSYW5nZTogbnVsbCxcbiAgICAgIHNsaWRlclZhbHVlICAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGEgPSB0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlID0gdGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNyZWF0ZVRodW1ibmFpbCA9IHRoaXMuY3JlYXRlVGh1bWJuYWlsLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgZmlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFZpZGVvU291cmNlKGZpbGUpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIC8vIGlmIGZpbGUgY2hhbmdlc1xuICAgIGlmIChuZXh0UHJvcHMuZmlsZSAmJiBuZXh0UHJvcHMuZmlsZSAhPT0gdGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICBjb25zdCB7IGZpbGUgfSA9IG5leHRQcm9wcztcbiAgICAgIHRoaXMuc2V0VmlkZW9Tb3VyY2UoZmlsZSk7XG4gICAgfTtcbiAgfVxuICBzZXRWaWRlb1NvdXJjZSAoZmlsZSkge1xuICAgIGNvbnN0IHByZXZpZXdSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHByZXZpZXdSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICBwcmV2aWV3UmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGFVcmkgPSBwcmV2aWV3UmVhZGVyLnJlc3VsdDtcbiAgICAgIGNvbnN0IGJsb2IgPSBkYXRhVVJJdG9CbG9iKGRhdGFVcmkpO1xuICAgICAgY29uc3QgdmlkZW9Tb3VyY2UgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpZGVvU291cmNlIH0pO1xuICAgIH07XG4gIH1cbiAgaGFuZGxlVmlkZW9Mb2FkZWREYXRhIChldmVudCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gZXZlbnQudGFyZ2V0LmR1cmF0aW9uO1xuICAgIGNvbnN0IHRvdGFsTWludXRlcyA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyA2MCk7XG4gICAgY29uc3QgdG90YWxTZWNvbmRzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAlIDYwKTtcbiAgICAvLyBzZXQgdGhlIHNsaWRlclxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2xpZGVyTWF4UmFuZ2U6IGR1cmF0aW9uICogMTAwLFxuICAgICAgc2xpZGVyVmFsdWUgICA6IGR1cmF0aW9uICogMTAwIC8gMixcbiAgICAgIHRvdGFsTWludXRlcyxcbiAgICAgIHRvdGFsU2Vjb25kcyxcbiAgICB9KTtcbiAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgdmlkZW9cbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSBkdXJhdGlvbiAvIDI7XG4gIH1cbiAgaGFuZGxlU2xpZGVyQ2hhbmdlIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAvLyB1cGRhdGUgdGhlIHNsaWRlciB2YWx1ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2xpZGVyVmFsdWU6IHZhbHVlLFxuICAgIH0pO1xuICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlb1xuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IHZhbHVlIC8gMTAwO1xuICB9XG4gIGNyZWF0ZVRodW1ibmFpbCAoKSB7XG4gICAgLy8gdGFrZSBhIHNuYXBzaG90XG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY29uc3QgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICBjb25zdCBibG9iID0gZGF0YVVSSXRvQmxvYihkYXRhVXJsKTtcbiAgICBjb25zdCBzbmFwc2hvdCA9IG5ldyBGaWxlKFtibG9iXSwgYHRodW1ibmFpbC5wbmdgLCB7XG4gICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICB9KTtcbiAgICAvLyBzZXQgdGhlIHRodW1ibmFpbCBpbiByZWR1eCBzdG9yZVxuICAgIGlmIChzbmFwc2hvdCkge1xuICAgICAgdGhpcy5wcm9wcy5vbk5ld1RodW1ibmFpbChzbmFwc2hvdCk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciwgdmlkZW9Tb3VyY2UsIHNsaWRlck1pblJhbmdlLCBzbGlkZXJNYXhSYW5nZSwgc2xpZGVyVmFsdWUsIHRvdGFsTWludXRlcywgdG90YWxTZWNvbmRzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCc+VGh1bWJuYWlsOjwvbGFiZWw+XG4gICAgICAgIDx2aWRlb1xuICAgICAgICAgIGlkPSd2aWRlby10aHVtYi1wbGF5ZXInXG4gICAgICAgICAgcHJlbG9hZD0nbWV0YWRhdGEnXG4gICAgICAgICAgbXV0ZWRcbiAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319XG4gICAgICAgICAgcGxheXNJbmxpbmVcbiAgICAgICAgICBvbkxvYWRlZERhdGE9e3RoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhfVxuICAgICAgICAgIHNyYz17dmlkZW9Tb3VyY2V9XG4gICAgICAgICAgb25TZWVrZWQ9e3RoaXMuY3JlYXRlVGh1bWJuYWlsfVxuICAgICAgICAvPlxuICAgICAgICB7XG4gICAgICAgICAgc2xpZGVyVmFsdWUgPyAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1jZW50ZXInIHN0eWxlPXt7d2lkdGg6ICcxMDAlJ319PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz4wJzAwXCI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPnt0b3RhbE1pbnV0ZXN9J3t0b3RhbFNlY29uZHN9XCI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT0ncmFuZ2UnXG4gICAgICAgICAgICAgICAgICBtaW49e3NsaWRlck1pblJhbmdlfVxuICAgICAgICAgICAgICAgICAgbWF4PXtzbGlkZXJNYXhSYW5nZX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtzbGlkZXJWYWx1ZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nc2xpZGVyJ1xuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJyA+bG9hZGluZy4uLiA8L3A+XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHsgZXJyb3IgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPntlcnJvcn08L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPlVzZSBzbGlkZXIgdG8gc2V0IHRodW1ibmFpbDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRodW1ibmFpbElucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L3ZpZXcuanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhLCB0b2dnbGVNZXRhZGF0YUlucHV0c30gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHNob3dNZXRhZGF0YUlucHV0czogcHVibGlzaC5zaG93TWV0YWRhdGFJbnB1dHMsXG4gICAgZGVzY3JpcHRpb24gICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgIGxpY2Vuc2UgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5saWNlbnNlLFxuICAgIG5zZncgICAgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5uc2Z3LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uTWV0YWRhdGFDaGFuZ2U6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTWV0YWRhdGEobmFtZSwgdmFsdWUpKTtcbiAgICB9LFxuICAgIG9uVG9nZ2xlTWV0YWRhdGFJbnB1dHM6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godG9nZ2xlTWV0YWRhdGFJbnB1dHModmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEV4cGFuZGluZ1RleHRBcmVhIGZyb20gJ2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEnO1xuXG5jbGFzcyBQdWJsaXNoTWV0YWRhdGFJbnB1dHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy50b2dnbGVTaG93SW5wdXRzID0gdGhpcy50b2dnbGVTaG93SW5wdXRzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdCA9IHRoaXMuaGFuZGxlU2VsZWN0LmJpbmQodGhpcyk7XG4gIH1cbiAgdG9nZ2xlU2hvd0lucHV0cyAoKSB7XG4gICAgdGhpcy5wcm9wcy5vblRvZ2dsZU1ldGFkYXRhSW5wdXRzKCF0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcgPyB0YXJnZXQuY2hlY2tlZCA6IHRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBuYW1lID0gdGFyZ2V0Lm5hbWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHZhbHVlKTtcbiAgfVxuICBoYW5kbGVTZWxlY3QgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgc2VsZWN0ZWRPcHRpb24pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J3B1Ymxpc2gtZGV0YWlscycgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAge3RoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzICYmIChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J2xhYmVsJz5EZXNjcmlwdGlvbjo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPEV4cGFuZGluZ1RleHRBcmVhXG4gICAgICAgICAgICAgICAgICBpZD0ncHVibGlzaC1kZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dGFyZWEgdGV4dGFyZWEtLXByaW1hcnkgdGV4dGFyZWEtLWZ1bGwtd2lkdGgnXG4gICAgICAgICAgICAgICAgICByb3dzPXsxfVxuICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsyMDAwfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4SGVpZ2h0OiAyMDAgfX1cbiAgICAgICAgICAgICAgICAgIG5hbWU9J2Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J09wdGlvbmFsIGRlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J2xhYmVsJz5MaWNlbnNlOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHR5cGU9J3RleHQnIG5hbWU9J2xpY2Vuc2UnIGlkPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tcHJpbWFyeScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0fT5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9JyAnPlVuc3BlY2lmaWVkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdQdWJsaWMgRG9tYWluJz5QdWJsaWMgRG9tYWluPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdDcmVhdGl2ZSBDb21tb25zJz5DcmVhdGl2ZSBDb21tb25zPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbnNmdycgY2xhc3NOYW1lPSdsYWJlbCc+TWF0dXJlOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dC1jaGVja2JveCcgdHlwZT0nY2hlY2tib3gnIGlkPSdwdWJsaXNoLW5zZncnIG5hbWU9J25zZncnIHZhbHVlPXt0aGlzLnByb3BzLm5zZnd9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1zZWNvbmRhcnknIG9uQ2xpY2s9e3RoaXMudG9nZ2xlU2hvd0lucHV0c30+e3RoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzID8gJ2xlc3MnIDogJ21vcmUnfTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoTWV0YWRhdGFJbnB1dHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRXhwYW5kaW5nVGV4dGFyZWEgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5faGFuZGxlQ2hhbmdlID0gdGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuYWRqdXN0VGV4dGFyZWEoe30pO1xuICB9XG4gIF9oYW5kbGVDaGFuZ2UgKGV2ZW50KSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKGV2ZW50KTtcbiAgICB0aGlzLmFkanVzdFRleHRhcmVhKGV2ZW50KTtcbiAgfVxuICBhZGp1c3RUZXh0YXJlYSAoeyB0YXJnZXQgPSB0aGlzLmVsIH0pIHtcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0LnNjcm9sbEhlaWdodH1weGA7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IC4uLnJlc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZXh0YXJlYVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgcmVmPXt4ID0+IHRoaXMuZWwgPSB4fVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbkV4cGFuZGluZ1RleHRhcmVhLnByb3BUeXBlcyA9IHtcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwYW5kaW5nVGV4dGFyZWE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7c2V0UHVibGlzaEluQ2hhbm5lbCwgdXBkYXRlU2VsZWN0ZWRDaGFubmVsLCB1cGRhdGVFcnJvcn0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgcHVibGlzaEluQ2hhbm5lbCAgIDogcHVibGlzaC5wdWJsaXNoSW5DaGFubmVsLFxuICAgIHNlbGVjdGVkQ2hhbm5lbCAgICA6IHB1Ymxpc2guc2VsZWN0ZWRDaGFubmVsLFxuICAgIGNoYW5uZWxFcnJvciAgICAgICA6IHB1Ymxpc2guZXJyb3IuY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2NoYW5uZWwnLCBudWxsKSk7XG4gICAgICBkaXNwYXRjaChzZXRQdWJsaXNoSW5DaGFubmVsKHZhbHVlKSk7XG4gICAgfSxcbiAgICBvbkNoYW5uZWxTZWxlY3Q6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2NoYW5uZWwnLCBudWxsKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwodmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5pbXBvcnQgKiBhcyBzdGF0ZXMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzJztcblxuY2xhc3MgQ2hhbm5lbFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2ggPSB0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2guYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbiA9IHRoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gIH1cbiAgdG9nZ2xlQW5vbnltb3VzUHVibGlzaCAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09ICdhbm9ueW1vdXMnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZShmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlKHRydWUpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVTZWxlY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25DaGFubmVsU2VsZWN0KHNlbGVjdGVkT3B0aW9uKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J2Fub255bW91cy1vci1jaGFubmVsJyBpZD0nYW5vbnltb3VzLXJhZGlvJyBjbGFzc05hbWU9J2lucHV0LXJhZGlvJyB2YWx1ZT0nYW5vbnltb3VzJyBjaGVja2VkPXshdGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsfSBvbkNoYW5nZT17dGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNofSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwgbGFiZWwtLXBvaW50ZXInIGh0bWxGb3I9J2Fub255bW91cy1yYWRpbyc+QW5vbnltb3VzPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J2Fub255bW91cy1vci1jaGFubmVsJyBpZD0nY2hhbm5lbC1yYWRpbycgY2xhc3NOYW1lPSdpbnB1dC1yYWRpbycgdmFsdWU9J2luIGEgY2hhbm5lbCcgY2hlY2tlZD17dGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsfSBvbkNoYW5nZT17dGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNofSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwgbGFiZWwtLXBvaW50ZXInIGh0bWxGb3I9J2NoYW5uZWwtcmFkaW8nPkluIGEgY2hhbm5lbDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmNoYW5uZWxFcnJvciA/IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5wcm9wcy5jaGFubmVsRXJyb3J9PC9wPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+UHVibGlzaCBhbm9ueW1vdXNseSBvciBpbiBhIGNoYW5uZWw8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICB7IHRoaXMucHJvcHMucHVibGlzaEluQ2hhbm5lbCAmJiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zJz5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbmFtZS1zZWxlY3QnPkNoYW5uZWw6PC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nY2hhbm5lbC1uYW1lLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdycgdmFsdWU9e3RoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb259PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICYmIDxvcHRpb24gdmFsdWU9e3RoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZX0gaWQ9J3B1Ymxpc2gtY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPnt0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWV9PC9vcHRpb24+IH1cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzdGF0ZXMuTE9HSU59PkV4aXN0aW5nPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c3RhdGVzLkNSRUFURX0+TmV3PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbCA9PT0gc3RhdGVzLkxPR0lOKSAmJiA8Q2hhbm5lbExvZ2luRm9ybSAvPiB9XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbCA9PT0gc3RhdGVzLkNSRUFURSkgJiYgPENoYW5uZWxDcmVhdGVGb3JtIC8+IH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbFNlbGVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxMb2dpbkZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgbmFtZSAgICA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ2luVG9DaGFubmVsID0gdGhpcy5sb2dpblRvQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgbG9naW5Ub0NoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWU6IHRoaXMuc3RhdGUubmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJlcXVlc3QoJ2xvZ2luJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHtzdWNjZXNzLCBjaGFubmVsTmFtZSwgc2hvcnRDaGFubmVsSWQsIGNoYW5uZWxDbGFpbUlkLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbWVzc2FnZX0pO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIGlkPSdjaGFubmVsLWxvZ2luLWZvcm0nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1sb2dpbi1uYW1lLWlucHV0Jz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20nPlxuICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBuYW1lPSduYW1lJyBwbGFjZWhvbGRlcj0nWW91ciBDaGFubmVsIE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxOYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnID5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBpZD0nY2hhbm5lbC1sb2dpbi1wYXNzd29yZC1pbnB1dCcgbmFtZT0ncGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbFBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkVudGVyIHRoZSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5sb2dpblRvQ2hhbm5lbH0+QXV0aGVudGljYXRlPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbExvZ2luRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxDcmVhdGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIGNoYW5uZWwgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgIHN0YXR1cyAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQgPSB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVDaGFubmVsID0gdGhpcy5jcmVhdGVDaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgY2xlYW5zZUNoYW5uZWxJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgaGFuZGxlQ2hhbm5lbElucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUNoYW5uZWxJbnB1dCh2YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2hhbm5lbDogdmFsdWV9KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdQbGVhc2UgZW50ZXIgYSBjaGFubmVsIG5hbWUnfSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgdXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbnVsbH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgfSk7XG4gIH1cbiAgY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXR1cm4gcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YCk7XG4gIH1cbiAgY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQgKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghcGFzc3dvcmQgfHwgcGFzc3dvcmQubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgYSBwYXNzd29yZCcpKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuICBtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0ICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWUsIHBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdCgnL3NpZ251cCcsIHBhcmFtcylcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFVuZm9ydHVuYXRlbHksIHdlIGVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIGNyZWF0aW5nIHlvdXIgY2hhbm5lbC4gUGxlYXNlIGxldCB1cyBrbm93IGluIERpc2NvcmQhICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGNyZWF0ZUNoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNoZWNrSXNQYXNzd29yZFByb3ZpZGVkKHRoaXMuc3RhdGUucGFzc3dvcmQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrSXNDaGFubmVsQXZhaWxhYmxlKHRoaXMuc3RhdGUuY2hhbm5lbCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6ICdXZSBhcmUgcHVibGlzaGluZyB5b3VyIG5ldyBjaGFubmVsLiAgU2l0IHRpZ2h0Li4uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0KHRoaXMuc3RhdGUuY2hhbm5lbCwgdGhpcy5zdGF0ZS5wYXNzd29yZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBudWxsfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4ocmVzdWx0LmNoYW5uZWxOYW1lLCByZXN1bHQuc2hvcnRDaGFubmVsSWQsIHJlc3VsdC5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHsgIXRoaXMuc3RhdGUuc3RhdHVzID8gKFxuICAgICAgICAgIDxmb3JtIGlkPSdwdWJsaXNoLWNoYW5uZWwtZm9ybSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1uYW1lJz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J2NoYW5uZWwnIGlkPSduZXctY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPSdleGFtcGxlQ2hhbm5lbE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICAgIHsgKHRoaXMuc3RhdGUuY2hhbm5lbCAmJiAhdGhpcy5zdGF0ZS5lcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIG5hbWU9J3Bhc3N3b3JkJyBpZD0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmNyZWF0ZUNoYW5uZWx9PkNyZWF0ZSBDaGFubmVsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+e3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENyZWF0ZUZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0tYWN0aXZlJz58IDwvc3Bhbj47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgSW5hY3RpdmVTdGF0dXNCYXIgPSAoKSA9PiB7XG4gIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItLWluYWN0aXZlJz58IDwvc3Bhbj47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGV9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzdGF0dXMgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gICAgbWVzc2FnZTogcHVibGlzaC5zdGF0dXMubWVzc2FnZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCAqIGFzIHB1Ymxpc2hTdGF0ZXMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2xhaW1fc3RhdGVzJztcblxuY2xhc3MgUHVibGlzaFN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIG1lc3NhZ2UsIGNsZWFyRmlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuTE9BRF9TVEFSVCAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5GaWxlIGlzIGxvYWRpbmcgdG8gc2VydmVyPC9wPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+MCU8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuTE9BRElORyAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgPHA+RmlsZSBpcyBsb2FkaW5nIHRvIHNlcnZlcjwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+e21lc3NhZ2V9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLlBVQkxJU0hJTkcgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+VXBsb2FkIGNvbXBsZXRlLiAgWW91ciBmaWxlIGlzIG5vdyBiZWluZyBwdWJsaXNoZWQgb24gdGhlIGJsb2NrY2hhaW4uLi48L3A+XG4gICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDxwPkN1cmlvdXMgd2hhdCBtYWdpYyBpcyBoYXBwZW5pbmcgaGVyZT8gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZmFxL3doYXQtaXMtbGJyeSc+TGVhcm4gbW9yZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLlNVQ0NFU1MgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+WW91ciBwdWJsaXNoIGlzIGNvbXBsZXRlISBZb3UgYXJlIGJlaW5nIHJlZGlyZWN0ZWQgdG8gaXQgbm93LjwvcD5cbiAgICAgICAgICA8cD5JZiB5b3UgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0ZWQsIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e21lc3NhZ2V9PmNsaWNrIGhlcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5GQUlMRUQgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+U29tZXRoaW5nIHdlbnQgd3JvbmcuLi48L3A+XG4gICAgICAgICAgPHA+PHN0cm9uZz57bWVzc2FnZX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgPHA+Rm9yIGhlbHAsIHBvc3QgdGhlIGFib3ZlIGVycm9yIHRleHQgaW4gdGhlICNzcGVlY2ggY2hhbm5lbCBvbiB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUycgdGFyZ2V0PSdfYmxhbmsnPmxicnkgZGlzY29yZDwvYT48L3A+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tc2Vjb25kYXJ5JyBvbkNsaWNrPXtjbGVhckZpbGV9PlJlc2V0PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoU3RhdHVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cy92aWV3LmpzeCIsImV4cG9ydCBjb25zdCBMT0FEX1NUQVJUID0gJ0xPQURfU1RBUlQnO1xuZXhwb3J0IGNvbnN0IExPQURJTkcgPSAnTE9BRElORyc7XG5leHBvcnQgY29uc3QgUFVCTElTSElORyA9ICdQVUJMSVNISU5HJztcbmV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IEZBSUxFRCA9ICdGQUlMRUQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZTogcHVibGlzaC5kaXNhYmxlZE1lc3NhZ2UsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHVibGlzaERpc2FibGVkTWVzc2FnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMucHJvcHMubWVzc2FnZTtcbiAgICBjb25zb2xlLmxvZygndGhpcy5wcm9wcy5tZXNzYWdlOicsIG1lc3NhZ2UpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGRyb3B6b25lLS1kaXNhYmxlZCByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwIGNsYXNzTmFtZT0ndGV4dC0tZGlzYWJsZWQnPlB1Ymxpc2hpbmcgaXMgY3VycmVudGx5IGRpc2FibGVkLjwvcD5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LS1kaXNhYmxlZCc+e21lc3NhZ2V9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuXG5jbGFzcyBBYm91dFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0Fib3V0J30gcGFnZVVyaT17J2Fib3V0J30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0ncHVsbC1xdW90ZSc+U3BlZS5jaCBpcyBhbiBvcGVuLXNvdXJjZSBwcm9qZWN0LiAgUGxlYXNlIGNvbnRyaWJ1dGUgdG8gdGhlIGV4aXN0aW5nIHNpdGUsIG9yIGZvcmsgaXQgYW5kIG1ha2UgeW91ciBvd24uPC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3R3aXR0ZXIuY29tL3NwZWVfY2gnPlRXSVRURVI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPkdJVEhVQjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJz5ESVNDT1JEIENIQU5ORUw8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gvYmxvYi9tYXN0ZXIvUkVBRE1FLm1kJz5ET0NVTUVOVEFUSU9OPC9hPjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIG1lZGlhLWhvc3Rpbmcgc2l0ZSB0aGF0IHJlYWRzIGZyb20gYW5kIHB1Ymxpc2hlcyBjb250ZW50IHRvIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pbyc+TEJSWTwvYT4gYmxvY2tjaGFpbi48L3A+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBob3N0aW5nIHNlcnZpY2UsIGJ1dCB3aXRoIHRoZSBhZGRlZCBiZW5lZml0IHRoYXQgaXQgc3RvcmVzIHlvdXIgY29udGVudCBvbiBhIGRlY2VudHJhbGl6ZWQgbmV0d29yayBvZiBjb21wdXRlcnMgLS0gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2dldCc+TEJSWTwvYT4gbmV0d29yay4gIFRoaXMgbWVhbnMgdGhhdCB5b3VyIGltYWdlcyBhcmUgc3RvcmVkIGluIG11bHRpcGxlIGxvY2F0aW9ucyB3aXRob3V0IGEgc2luZ2xlIHBvaW50IG9mIGZhaWx1cmUuPC9wPlxuICAgICAgICAgICAgICA8aDM+Q29udHJpYnV0ZTwvaDM+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSBoYXZlIGFuIGlkZWEgZm9yIHlvdXIgb3duIHNwZWUuY2gtbGlrZSBzaXRlIG9uIHRvcCBvZiBMQlJZLCBmb3JrIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+Z2l0aHViIHJlcG88L2E+IGFuZCBnbyB0byB0b3duITwvcD5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IHdhbnQgdG8gaW1wcm92ZSBzcGVlLmNoLCBqb2luIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJz5kaXNjb3JkIGNoYW5uZWw8L2E+IG9yIHNvbHZlIG9uZSBvZiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gvaXNzdWVzJz5naXRodWIgaXNzdWVzPC9hPi48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBYm91dFBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvQWJvdXRQYWdlL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZTogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5cbmNsYXNzIExvZ2luUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgLy8gcmUtcm91dGUgdGhlIHVzZXIgdG8gdGhlIGhvbWVwYWdlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICAgIGlmIChuZXdQcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICE9PSB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUpIHtcbiAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvYCk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnTG9naW4nfSBwYWdlVXJpPXsnbG9naW4nfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+Q2hhbm5lbHMgYWxsb3cgeW91IHRvIHB1Ymxpc2ggYW5kIGdyb3VwIGNvbnRlbnQgdW5kZXIgYW4gaWRlbnRpdHkuIFlvdSBjYW4gY3JlYXRlIGEgY2hhbm5lbCBmb3IgeW91cnNlbGYsIG9yIHNoYXJlIG9uZSB3aXRoIGxpa2UtbWluZGVkIGZyaWVuZHMuICBZb3UgY2FuIGNyZWF0ZSAxIGNoYW5uZWwsIG9yIDEwMCwgc28gd2hldGhlciB5b3UncmUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRhbG9uaWEyMDE3OjQzZGNmNDcxNjNjYWEyMWQ4NDA0ZDlmZTliMzBmNzhlZjNlMTQ2YTgnPmRvY3VtZW50aW5nIGltcG9ydGFudCBldmVudHM8L2E+LCBvciBtYWtpbmcgYSBwdWJsaWMgcmVwb3NpdG9yeSBmb3IgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0nL0BjYXRHaWZzJz5jYXQgZ2lmczwvYT4gKHBhc3N3b3JkOiAnMTIzNCcpLCB0cnkgY3JlYXRpbmcgYSBjaGFubmVsIGZvciBpdCE8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkxvZyBpbiB0byBhbiBleGlzdGluZyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsTG9naW5Gb3JtIC8+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9J2gzLS1uby1ib3R0b20nPkNyZWF0ZSBhIGJyYW5kIG5ldyBjaGFubmVsOjwvaDM+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ3JlYXRlRm9ybSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihMb2dpblBhZ2UpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvbkhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGVycm9yICAgICAgOiBzaG93LnJlcXVlc3QuZXJyb3IsXG4gICAgcmVxdWVzdFR5cGU6IHNob3cucmVxdWVzdC50eXBlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvbkhhbmRsZVNob3dQYWdlVXJpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IFNob3dBc3NldExpdGUgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXRMaXRlJztcbmltcG9ydCBTaG93QXNzZXREZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscyc7XG5pbXBvcnQgU2hvd0NoYW5uZWwgZnJvbSAnY29udGFpbmVycy9TaG93Q2hhbm5lbCc7XG5cbmltcG9ydCB7IENIQU5ORUwsIEFTU0VUX0xJVEUsIEFTU0VUX0RFVEFJTFMgfSBmcm9tICdjb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzJztcblxuY2xhc3MgU2hvd1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKHRoaXMucHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLm1hdGNoLnBhcmFtcyAhPT0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25IYW5kbGVTaG93UGFnZVVyaShuZXh0UHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCByZXF1ZXN0VHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFcnJvclBhZ2UgZXJyb3I9e2Vycm9yfSAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgc3dpdGNoIChyZXF1ZXN0VHlwZSkge1xuICAgICAgY2FzZSBDSEFOTkVMOlxuICAgICAgICByZXR1cm4gPFNob3dDaGFubmVsIC8+O1xuICAgICAgY2FzZSBBU1NFVF9MSVRFOlxuICAgICAgICByZXR1cm4gPFNob3dBc3NldExpdGUgLz47XG4gICAgICBjYXNlIEFTU0VUX0RFVEFJTFM6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0RGV0YWlscyAvPjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiA8cD5sb2FkaW5nLi4uPC9wPjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuXG5jbGFzcyBTaG93TGl0ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXNzZXQpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlciBzaG93LWxpdGUtY29udGFpbmVyJz5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxBc3NldERpc3BsYXkgLz5cbiAgICAgICAgICA8TGluayBpZD0nYXNzZXQtYm9pbGVycGF0ZScgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5IGZpbmUtcHJpbnQnIHRvPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfWB9Pmhvc3RlZFxuICAgICAgICAgICAgdmlhIFNwZWUuY2g8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICA8cD5sb2FkaW5nIGFzc2V0IGRhdGEuLi48L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93TGl0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIFVOQVZBSUxBQkxFLCBFUlJPUiwgQVZBSUxBQkxFIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY2xhc3MgQXNzZXREaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25GaWxlUmVxdWVzdChuYW1lLCBjbGFpbUlkKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBlcnJvciwgYXNzZXQ6IHsgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGNvbnRlbnRUeXBlLCBmaWxlRXh0LCB0aHVtYm5haWwgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdhc3NldC1kaXNwbGF5LWNvbXBvbmVudCc+XG4gICAgICAgIHsoc3RhdHVzID09PSBMT0NBTF9DSEVDSykgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5DaGVja2luZyB0byBzZWUgaWYgU3BlZS5jaCBoYXMgeW91ciBhc3NldCBsb2NhbGx5Li4uPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gVU5BVkFJTEFCTEUpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+U2l0IHRpZ2h0LCB3ZSdyZSBzZWFyY2hpbmcgdGhlIExCUlkgYmxvY2tjaGFpbiBmb3IgeW91ciBhc3NldCE8L3A+XG4gICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDxwPkN1cmlvdXMgd2hhdCBtYWdpYyBpcyBoYXBwZW5pbmcgaGVyZT8gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZmFxL3doYXQtaXMtbGJyeSc+TGVhcm4gbW9yZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gRVJST1IpICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+VW5mb3J0dW5hdGVseSwgd2UgY291bGRuJ3QgZG93bmxvYWQgeW91ciBhc3NldCBmcm9tIExCUlkuICBZb3UgY2FuIGhlbHAgdXMgb3V0IGJ5IHNoYXJpbmcgdGhlIGJlbG93IGVycm9yIG1lc3NhZ2UgaW4gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5MQlJZIGRpc2NvcmQ8L2E+LjwvcD5cbiAgICAgICAgICA8aT48cCBpZD0nZXJyb3ItbWVzc2FnZSc+e2Vycm9yfTwvcD48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBBVkFJTEFCTEUpICYmXG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX0gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHZpZGVvIGNsYXNzTmFtZT0nYXNzZXQgdmlkZW8nIGNvbnRyb2xzIHBvc3Rlcj17dGh1bWJuYWlsfT5cbiAgICAgICAgICAgICAgICAgIDxzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8cD5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgPGNvZGU+dmlkZW88L2NvZGU+IGVsZW1lbnQuPC9wPlxuICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPlVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXREaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IEFzc2V0VGl0bGUgZnJvbSAnY29udGFpbmVycy9Bc3NldFRpdGxlJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuaW1wb3J0IEFzc2V0SW5mbyBmcm9tICdjb250YWluZXJzL0Fzc2V0SW5mbyc7XG5cbmNsYXNzIFNob3dBc3NldERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IGNsYWltRGF0YTogeyBuYW1lIH0gfSA9IGFzc2V0O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17YCR7bmFtZX0gLSBkZXRhaWxzYH0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8QXNzZXRUaXRsZSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgc2hvdy1kZXRhaWxzLWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICAgICAgPEFzc2V0SW5mbyAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yUGFnZSBlcnJvcj17J2xvYWRpbmcgYXNzZXQgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0Fzc2V0RGV0YWlscztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGE6IHsgdGl0bGUgfSB9ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQXNzZXRUaXRsZSA9ICh7IHRpdGxlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0LS1sYXJnZSc+e3RpdGxlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0VGl0bGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBBc3NldEluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jb3B5VG9DbGlwYm9hcmQgPSB0aGlzLmNvcHlUb0NsaXBib2FyZC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvcHlUb0NsaXBib2FyZCAoZXZlbnQpIHtcbiAgICB2YXIgZWxlbWVudFRvQ29weSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmVsZW1lbnR0b2NvcHk7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Db3B5KTtcbiAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdPb3BzLCB1bmFibGUgdG8gY29weSd9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IHNob3J0SWQsIGNsYWltRGF0YSA6IHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIGRlc2NyaXB0aW9uLCBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsLCBob3N0IH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2NoYW5uZWxOYW1lICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkNoYW5uZWw6PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+PExpbmsgdG89e2AvJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfWB9PntjaGFubmVsTmFtZX08L0xpbms+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIHtkZXNjcmlwdGlvbiAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz57ZGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hhcmUtYnV0dG9ucyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPlNoYXJlOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20gZmxleC1jb250YWluZXItLXdyYXAnPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHdpdHRlcjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT5mYWNlYm9vazwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cDovL3R1bWJsci5jb20vd2lkZ2V0cy9zaGFyZS90b29sP2Nhbm9uaWNhbFVybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR1bWJscjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zdWJtaXQ/dXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9JnRpdGxlPSR7bmFtZX1gfT5yZWRkaXQ8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LXNob3J0LWxpbmsnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkxpbms6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktc2hvcnQtbGluaycgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3Nob3J0LWxpbmsnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgJHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J3Nob3J0LWxpbmsnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctZW1iZWQtY29kZSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+RW1iZWQ6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktZW1iZWQtdGV4dCcgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7KGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JykgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDx2aWRlbyB3aWR0aD1cIjEwMCVcIiBjb250cm9scyBwb3N0ZXI9XCIke3RodW1ibmFpbH1cIiBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPjwvdmlkZW8+YH0gLz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDxpbWcgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz5gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdlbWJlZC10ZXh0J1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSc+XG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0bz17YC8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9PjxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9J3RleHQnPkRpcmVjdCBMaW5rPC9zcGFuPjwvTGluaz5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9e2Ake2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0gZG93bmxvYWQ9e25hbWV9PkRvd25sb2FkPC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9kbWNhJz5SZXBvcnQ8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldEluZm87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgcmVxdWVzdFxuICBjb25zdCBwcmV2aW91c1JlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgLy8gc2VsZWN0IGNoYW5uZWxcbiAgbGV0IGNoYW5uZWw7XG4gIGlmIChwcmV2aW91c1JlcXVlc3QpIHtcbiAgICBjb25zdCBjaGFubmVsS2V5ID0gcHJldmlvdXNSZXF1ZXN0LmtleTtcbiAgICBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheSc7XG5cbmNsYXNzIFNob3dDaGFubmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbG9uZ0lkLCBzaG9ydElkIH0gPSBjaGFubmVsO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gY2hhbm5lbD17Y2hhbm5lbH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPGgyPmNoYW5uZWwgbmFtZToge25hbWV9PC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PmZ1bGwgY2hhbm5lbCBpZDoge2xvbmdJZH08L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17J2ZpbmUtcHJpbnQnfT5zaG9ydCBjaGFubmVsIGlkOiB7c2hvcnRJZH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ2xhaW1zRGlzcGxheSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBjaGFubmVsIGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dDaGFubmVsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25VcGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgY2hhbm5lbCBrZXlcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3Rbc2hvdy5yZXF1ZXN0LmlkXTtcbiAgY29uc3QgY2hhbm5lbEtleSA9IHJlcXVlc3Qua2V5O1xuICAvLyBzZWxlY3QgY2hhbm5lbCBjbGFpbXNcbiAgY29uc3QgY2hhbm5lbCA9IHNob3cuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0gfHwgbnVsbDtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgY2hhbm5lbEtleSxcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvblVwZGF0ZUNoYW5uZWxDbGFpbXMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBc3NldFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9Bc3NldFByZXZpZXcnO1xuXG5jbGFzcyBDaGFubmVsQ2xhaW1zRGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlID0gdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICB9XG4gIHNob3dQcmV2aW91c1Jlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKHByZXZpb3VzUGFnZSk7XG4gIH1cbiAgc2hvd05leHRSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5leHRQYWdlID0gcGFyc2VJbnQoY3VycmVudFBhZ2UpICsgMTtcbiAgICB0aGlzLnNob3dOZXdQYWdlKG5leHRQYWdlKTtcbiAgfVxuICBzaG93TmV3UGFnZSAocGFnZSkge1xuICAgIGNvbnN0IHsgY2hhbm5lbEtleSwgY2hhbm5lbDogeyBuYW1lLCBsb25nSWQgfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uVXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY2xhaW1zLCBjdXJyZW50UGFnZSwgdG90YWxQYWdlcyB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsJz5cbiAgICAgICAgeyhjbGFpbXMubGVuZ3RoID4gMCkgPyAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHtjbGFpbXMubWFwKChjbGFpbSwgaW5kZXgpID0+IDxBc3NldFByZXZpZXdcbiAgICAgICAgICAgICAgY2xhaW1EYXRhPXtjbGFpbX1cbiAgICAgICAgICAgICAga2V5PXtgJHtjbGFpbS5uYW1lfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAvPil9XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlID4gMSkgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2V9PlByZXZpb3VzIFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7KGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcykgJiZcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9eydidXR0b24tLXNlY29uZGFyeSd9IG9uQ2xpY2s9e3RoaXMuc2hvd05leHRSZXN1bHRzUGFnZX0+TmV4dCBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwPlRoZXJlIGFyZSBubyBjbGFpbXMgaW4gdGhpcyBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENsYWltc0Rpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoe3NpdGU6IHtkZWZhdWx0czogeyBkZWZhdWx0VGh1bWJuYWlsIH19fSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jb25zdCBBc3NldFByZXZpZXcgPSAoeyBkZWZhdWx0VGh1bWJuYWlsLCBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgZmlsZUV4dCwgY29udGVudFR5cGUsIHRodW1ibmFpbCB9IH0pID0+IHtcbiAgY29uc3QgZGlyZWN0U291cmNlTGluayA9IGAke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWA7XG4gIGNvbnN0IHNob3dVcmxMaW5rID0gYC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdhc3NldC1ob2xkZXInPlxuICAgICAgPExpbmsgdG89e3Nob3dVcmxMaW5rfSA+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Fzc2V0LXByZXZpZXcnfVxuICAgICAgICAgICAgICAgICAgc3JjPXtkaXJlY3RTb3VyY2VMaW5rfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Fzc2V0LXByZXZpZXcgdmlkZW8nfVxuICAgICAgICAgICAgICAgICAgc3JjPXt0aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cD51bnN1cHBvcnRlZCBmaWxlIHR5cGU8L3A+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpfVxuICAgICAgPC9MaW5rPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRQcmV2aWV3O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGU6IHsgaG9zdCwgdGl0bGUgfSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9zdCxcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY2xhc3MgRm91ck9oRm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3RpdGxlLCBob3N0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgPHRpdGxlPnt0aXRsZX0gLSA0MDQ8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD0nY2Fub25pY2FsJyBocmVmPXtgJHtob3N0fS80MDRgfSAvPlxuICAgICAgICA8L0hlbG1ldD5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8aDI+NDA0PC9oMj5cbiAgICAgICAgICA8cD5UaGF0IHBhZ2UgZG9lcyBub3QgZXhpc3Q8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRm91ck9oRm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4IiwiY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCBzZW5kRW1iZWRQYWdlID0gKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgLy8gZ2V0IGFuZCByZW5kZXIgdGhlIGNvbnRlbnRcbiAgcmVzLnN0YXR1cygyMDApLnJlbmRlcignZW1iZWQnLCB7IGxheW91dDogJ2VtYmVkJywgaG9zdCwgY2xhaW1JZCwgbmFtZSB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZEVtYmVkUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZEVtYmVkUGFnZS5qcyIsImNvbnN0IHJlZGlyZWN0ID0gKHJvdXRlKSA9PiB7XG4gIHJldHVybiAocmVxLCByZXMpID0+IHtcbiAgICByZXMuc3RhdHVzKDMwMSkucmVkaXJlY3Qocm91dGUpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZWRpcmVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJjb25zdCBzZXJ2ZUFzc2V0QnlDbGFpbSA9IHJlcXVpcmUoJy4vc2VydmVBc3NldEJ5Q2xhaW0nKTtcbmNvbnN0IHNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSA9IHJlcXVpcmUoJy4vc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCwgZGIpID0+IHtcbiAgYXBwLmdldCgnLzppZGVudGlmaWVyLzpjbGFpbScsIHNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSk7XG4gIGFwcC5nZXQoJy86Y2xhaW0nLCBzZXJ2ZUFzc2V0QnlDbGFpbSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7IGRldGVybWluZVJlc3BvbnNlVHlwZSwgbG9nUmVxdWVzdERhdGEsIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IH0gPSByZXF1aXJlKCdoZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxuLypcblxuICByb3V0ZSB0byBzZXJ2ZSBhbiBhc3NldCBvciB0aGUgcmVhY3QgYXBwIHZpYSB0aGUgY2xhaW0gbmFtZSBvbmx5XG5cbiovXG5cbmNvbnN0IHNlcnZlckFzc2V0QnlDbGFpbSA9IChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gIH1cbiAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgLy8gcGFyc2UgdGhlIGNsYWltXG4gIGxldCBjbGFpbU5hbWU7XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWV9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBudWxsLCBudWxsKTtcbiAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQobnVsbCwgbnVsbCwgY2xhaW1OYW1lLCBudWxsLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZlckFzc2V0QnlDbGFpbTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUNsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNhbGwsIHB1dCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBvblJlcXVlc3RFcnJvciwgb25OZXdDaGFubmVsUmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgbmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19hc3NldCc7XG5pbXBvcnQgeyBuZXdDaGFubmVsUmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfY2hhbm5lbCc7XG5pbXBvcnQgbGJyeVVyaSBmcm9tICd1dGlscy9sYnJ5VXJpJztcblxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSAobW9kaWZpZXIsIGNsYWltKSB7XG4gIC8vIHRoaXMgaXMgYSByZXF1ZXN0IGZvciBhbiBhc3NldFxuICAvLyBjbGFpbSB3aWxsIGJlIGFuIGFzc2V0IGNsYWltXG4gIC8vIHRoZSBpZGVudGlmaWVyIGNvdWxkIGJlIGEgY2hhbm5lbCBvciBhIGNsYWltIGlkXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCwgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKG1vZGlmaWVyKSk7XG4gICAgKHsgY2xhaW1OYW1lLCBleHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBleHRlbnNpb24pKTtcbiAgfTtcbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgY2xhaW1JZCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IChjbGFpbSkge1xuICAvLyB0aGlzIGNvdWxkIGJlIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXQgb3IgYSBjaGFubmVsIHBhZ2VcbiAgLy8gY2xhaW0gY291bGQgYmUgYW4gYXNzZXQgY2xhaW0gb3IgYSBjaGFubmVsIGNsYWltXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIoY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICAvLyByZXR1cm4gZWFybHkgaWYgdGhpcyByZXF1ZXN0IGlzIGZvciBhIGNoYW5uZWxcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0NoYW5uZWxSZXF1ZXN0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkpO1xuICB9XG4gIC8vIGlmIG5vdCBmb3IgYSBjaGFubmVsLCBwYXJzZSB0aGUgY2xhaW0gcmVxdWVzdFxuICBsZXQgY2xhaW1OYW1lLCBleHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHtjbGFpbU5hbWUsIGV4dGVuc2lvbn0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogaGFuZGxlU2hvd1BhZ2VVcmkgKGFjdGlvbikge1xuICBjb25zdCB7IGlkZW50aWZpZXIsIGNsYWltIH0gPSBhY3Rpb24uZGF0YTtcbiAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSwgaWRlbnRpZmllciwgY2xhaW0pO1xuICB9XG4gIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVDbGFpbU9ubHksIGNsYWltKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoSGFuZGxlU2hvd1BhZ2VVcmkgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLCBoYW5kbGVTaG93UGFnZVVyaSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpLmpzIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCBzZWxlY3QsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QsIG9uUmVxdWVzdEVycm9yLCBvblJlcXVlc3RVcGRhdGUsIGFkZEFzc2V0VG9Bc3NldExpc3QgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgZ2V0TG9uZ0NsYWltSWQsIGdldFNob3J0SWQsIGdldENsYWltRGF0YSB9IGZyb20gJ2FwaS9hc3NldEFwaSc7XG5pbXBvcnQgeyBzZWxlY3RTaG93U3RhdGUgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RTaXRlSG9zdCB9IGZyb20gJ3NlbGVjdG9ycy9zaXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3QXNzZXRSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBuYW1lLCBtb2RpZmllciB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGxvbmcgaWQgJiYgYWRkIHJlcXVlc3QgdG8gcmVxdWVzdCBsaXN0XG4gIGxldCBsb25nSWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBsb25nSWR9ID0geWllbGQgY2FsbChnZXRMb25nQ2xhaW1JZCwgaG9zdCwgbmFtZSwgbW9kaWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICBjb25zdCBhc3NldEtleSA9IGBhIyR7bmFtZX0jJHtsb25nSWR9YDtcbiAgeWllbGQgcHV0KGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0KHJlcXVlc3RJZCwgbnVsbCwgYXNzZXRLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBhc3NldD9cbiAgLy8gSWYgdGhpcyBhc3NldCBpcyBpbiB0aGUgYXNzZXQgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuYXNzZXRMaXN0W2Fzc2V0S2V5XSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBzaG9ydCBJZFxuICBsZXQgc2hvcnRJZDtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IHNob3J0SWR9ID0geWllbGQgY2FsbChnZXRTaG9ydElkLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBnZXQgYXNzZXQgY2xhaW0gZGF0YVxuICBsZXQgY2xhaW1EYXRhO1xuICB0cnkge1xuICAgICh7ZGF0YTogY2xhaW1EYXRhfSA9IHlpZWxkIGNhbGwoZ2V0Q2xhaW1EYXRhLCBob3N0LCBuYW1lLCBsb25nSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBhZGQgYXNzZXQgdG8gYXNzZXQgbGlzdFxuICB5aWVsZCBwdXQoYWRkQXNzZXRUb0Fzc2V0TGlzdChhc3NldEtleSwgbnVsbCwgbmFtZSwgbG9uZ0lkLCBzaG9ydElkLCBjbGFpbURhdGEpKTtcbiAgLy8gY2xlYXIgYW55IGVycm9ycyBpbiByZXF1ZXN0IGVycm9yXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0Fzc2V0UmVxdWVzdCAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5BU1NFVF9SRVFVRVNUX05FVywgbmV3QXNzZXRSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9uZ0NsYWltSWQgKGhvc3QsIG5hbWUsIG1vZGlmaWVyKSB7XG4gIGxldCBib2R5ID0ge307XG4gIC8vIGNyZWF0ZSByZXF1ZXN0IHBhcmFtc1xuICBpZiAobW9kaWZpZXIpIHtcbiAgICBpZiAobW9kaWZpZXIuaWQpIHtcbiAgICAgIGJvZHlbJ2NsYWltSWQnXSA9IG1vZGlmaWVyLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5WydjaGFubmVsTmFtZSddID0gbW9kaWZpZXIuY2hhbm5lbC5uYW1lO1xuICAgICAgYm9keVsnY2hhbm5lbENsYWltSWQnXSA9IG1vZGlmaWVyLmNoYW5uZWwuaWQ7XG4gICAgfVxuICB9XG4gIGJvZHlbJ2NsYWltTmFtZSddID0gbmFtZTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfTtcbiAgLy8gY3JlYXRlIHVybFxuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vbG9uZy1pZGA7XG4gIC8vIHJldHVybiB0aGUgcmVxdWVzdCBwcm9taXNlXG4gIHJldHVybiBSZXF1ZXN0KHVybCwgcGFyYW1zKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaG9ydElkIChob3N0LCBuYW1lLCBjbGFpbUlkKSB7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9zaG9ydC1pZC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYWltRGF0YSAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vZGF0YS8ke25hbWV9LyR7Y2xhaW1JZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvYXNzZXRBcGkuanMiLCJpbXBvcnQge2NhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QsIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCB1cGRhdGVDaGFubmVsQ2xhaW1zIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldENoYW5uZWxDbGFpbXMsIGdldENoYW5uZWxEYXRhIH0gZnJvbSAnYXBpL2NoYW5uZWxBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0NoYW5uZWxSZXF1ZXN0IChhY3Rpb24pIHtcbiAgY29uc3QgeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0gPSBhY3Rpb24uZGF0YTtcbiAgLy8gcHV0IGFuIGFjdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgaW4gcmVkdXhcbiAgeWllbGQgcHV0KG9uUmVxdWVzdFVwZGF0ZShyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgcmVxdWVzdD9cbiAgLy8gSWYgdGhpcyB1cmkgaXMgaW4gdGhlIHJlcXVlc3QgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBjb25zdCBzdGF0ZSA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaG93U3RhdGUpO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBsb25nIGlkXG4gIGxldCBsb25nSWQsIHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHsgZGF0YToge2xvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0lkLCBzaG9ydENoYW5uZWxDbGFpbUlkOiBzaG9ydElkfSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsRGF0YSwgaG9zdCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHN0b3JlIHRoZSByZXF1ZXN0IGluIHRoZSBjaGFubmVsIHJlcXVlc3RzIGxpc3RcbiAgY29uc3QgY2hhbm5lbEtleSA9IGBjIyR7Y2hhbm5lbE5hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGNoYW5uZWxLZXkpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyBjaGFubmVsP1xuICAvLyBJZiB0aGlzIGNoYW5uZWwgaXMgaW4gdGhlIGNoYW5uZWwgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBpZiAoc3RhdGUuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgY2hhbm5lbCBjbGFpbXMgZGF0YVxuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIGhvc3QsIGxvbmdJZCwgY2hhbm5lbE5hbWUsIDEpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgY2hhbm5lbCBkYXRhIGluIHRoZSBjaGFubmVsIGxpc3RcbiAgeWllbGQgcHV0KGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0KGNoYW5uZWxLZXksIGNoYW5uZWxOYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpKTtcbiAgLy8gY2xlYXIgYW55IHJlcXVlc3QgZXJyb3JzXG4gIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihudWxsKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3Q2hhbm5lbFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVywgbmV3Q2hhbm5lbFJlcXVlc3QpO1xufTtcblxuZnVuY3Rpb24gKiBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsIChhY3Rpb24pIHtcbiAgY29uc3QgeyBjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UgfSA9IGFjdGlvbi5kYXRhO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICB5aWVsZCBwdXQodXBkYXRlQ2hhbm5lbENsYWltcyhjaGFubmVsS2V5LCBjbGFpbXNEYXRhKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsIGdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfY2hhbm5lbC5qcyIsImltcG9ydCBSZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbERhdGEgKGhvc3QsIGlkLCBuYW1lKSB7XG4gIGlmICghaWQpIGlkID0gJ25vbmUnO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9kYXRhLyR7bmFtZX0vJHtpZH1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxDbGFpbXMgKGhvc3QsIGxvbmdJZCwgbmFtZSwgcGFnZSkge1xuICBpZiAoIXBhZ2UpIHBhZ2UgPSAxO1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2hhbm5lbC9jbGFpbXMvJHtuYW1lfS8ke2xvbmdJZH0vJHtwYWdlfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleCAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGNoYW5uZWwgbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ2hhbm5lbCA9IHZhbHVlLnN0YXJ0c1dpdGgobW9kdWxlLmV4cG9ydHMuQ0hBTk5FTF9DSEFSKTtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IGlzQ2hhbm5lbCA/IHZhbHVlIDogbnVsbDtcbiAgICBsZXQgY2xhaW1JZDtcbiAgICBpZiAoaXNDaGFubmVsKSB7XG4gICAgICBpZiAoIWNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgYWZ0ZXIgXCJAXCIuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2hhbm5lbE5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NIQU5ORUwpO1xuICAgICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogXCIke25hbWVCYWRDaGFycy5qb2luKCcsICcpfVwiLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFpbUlkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbW9kaWZpZXJcbiAgICBsZXQgY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZDogY2hhbm5lbENsYWltSWQgfHwgbnVsbCxcbiAgICAgIGNsYWltSWQgICAgICAgOiBjbGFpbUlkIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBleHRlbnNpb24pXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gZXh0ZW5zaW9uIHNlcGFyYXRvciwgZXh0ZW5zaW9uIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIGV4dGVuc2lvblNlcGVyYXRvciwgZXh0ZW5zaW9uXSA9IGNvbXBvbmVudHNSZWdleCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuZXhlYyhuYW1lKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIWNsYWltTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVjayB5b3VyIFVSTC4gIE5vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiLlwiJyk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjbGFpbU5hbWUpLm1hdGNoKG1vZHVsZS5leHBvcnRzLlJFR0VYUF9JTlZBTElEX0NMQUlNKTtcbiAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICB9XG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgZXh0ZW5zaW9uXG4gICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvcikge1xuICAgICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7ZXh0ZW5zaW9uU2VwZXJhdG9yfVwiLmApO1xuICAgICAgfVxuICAgICAgaWYgKGV4dGVuc2lvblNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBUaGUgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIiBzZXBhcmF0b3IgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZS5gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYWltTmFtZSxcbiAgICAgIGV4dGVuc2lvbjogZXh0ZW5zaW9uIHx8IG51bGwsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsImNvbnN0IHsgc2VuZEdBU2VydmVFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MnKTtcbmNvbnN0IHtcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlLFxuICBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5LFxuICBsb2dSZXF1ZXN0RGF0YSxcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQsXG59ID0gcmVxdWlyZSgnaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcblxuLypcblxuICByb3V0ZSB0byBzZXJ2ZSBhbiBhc3NldCBvciB0aGUgcmVhY3QgYXBwIHZpYSB0aGUgY2xhaW0gbmFtZSBhbmQgYW4gaWRlbnRpZmllclxuXG4qL1xuXG5jb25zdCBzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltID0gKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgfVxuICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgbGV0IGNsYWltTmFtZTtcbiAgdHJ5IHtcbiAgICAoeyBjbGFpbU5hbWUgfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gcGFyc2UgdGhlIGlkZW50aWZpZXJcbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihwYXJhbXMuaWRlbnRpZmllcikpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBpZiAoIWlzQ2hhbm5lbCkge1xuICAgIFtjbGFpbUlkLCBjbGFpbU5hbWVdID0gZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eShjbGFpbUlkLCBjbGFpbU5hbWUpO1xuICB9XG4gIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIGNoYW5uZWxOYW1lLCBjbGFpbUlkKTtcbiAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xyXG4gIGFwcC5nZXQoJyonLCBoYW5kbGVQYWdlUmVxdWVzdCk7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svaW5kZXguanMiLCJjb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5jb25zdCBzZW5kUmVhY3RBcHAgPSAocmVxLCByZXMpID0+IHtcbiAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRSZWFjdEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==