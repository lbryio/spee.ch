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
      return console.log('No site config received.');
    }
    var analytics = config.analytics,
        assetDefaults = config.assetDefaults,
        auth = config.auth,
        customComponents = config.customComponents,
        details = config.details,
        publishing = config.publishing;

    console.log('Configuring site details...');
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

var db = __webpack_require__(11);
var logger = __webpack_require__(2);

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
var db = __webpack_require__(11);
var lbryApi = __webpack_require__(15);
var publishHelpers = __webpack_require__(23);

var _require = __webpack_require__(4),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

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
          return db.Channel.findOne({
            where: {
              channelName: publishParams.channel_name
            }
          });
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
var db = __webpack_require__(11);

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
var db = __webpack_require__(11);

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


var db = __webpack_require__(11);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTBhZDkyNGU0YzVkOGJjNzQ1YTQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiIiwid2VicGFjazovLy8uL3NwZWVjaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZ2FcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvSG9tZVBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoUHJldmlldy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsIm9yaWdpbmFsVXJsIiwiaXAiLCJlcnJvciIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJqc29uIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwiZXJyIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJrZXkiLCJzdWNjZXNzIiwiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiY29udGFpbmVycyIsInBhZ2VzIiwiZGV0YWlscyIsImhvc3QiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwidXBkYXRlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsInNlbGVjdEZpbGUiLCJjbGVhckZpbGUiLCJ1cGRhdGVNZXRhZGF0YSIsInVwZGF0ZUNsYWltIiwic2V0UHVibGlzaEluQ2hhbm5lbCIsInVwZGF0ZVB1Ymxpc2hTdGF0dXMiLCJ1cGRhdGVFcnJvciIsInVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCIsInRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwib25OZXdUaHVtYm5haWwiLCJzdGFydFB1Ymxpc2giLCJhY3Rpb25zIiwiZmlsZSIsInR5cGUiLCJGSUxFX1NFTEVDVEVEIiwiZGF0YSIsIkZJTEVfQ0xFQVIiLCJuYW1lIiwidmFsdWUiLCJNRVRBREFUQV9VUERBVEUiLCJDTEFJTV9VUERBVEUiLCJjaGFubmVsIiwiU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCIsIlBVQkxJU0hfU1RBVFVTX1VQREFURSIsIkVSUk9SX1VQREFURSIsImNoYW5uZWxOYW1lIiwiU0VMRUNURURfQ0hBTk5FTF9VUERBVEUiLCJzaG93TWV0YWRhdGFJbnB1dHMiLCJUT0dHTEVfTUVUQURBVEFfSU5QVVRTIiwiVEhVTUJOQUlMX05FVyIsImhpc3RvcnkiLCJQVUJMSVNIX1NUQVJUIiwibXlzcWwiLCJkYXRhYmFzZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ3YXJuIiwiaW5mbyIsIm1hcFN0YXRlVG9Qcm9wcyIsInNpdGUiLCJsb2dnZWRJbkNoYW5uZWwiLCJjaGFubmVsU2hvcnRJZCIsInNob3J0SWQiLCJjaGFubmVsTG9uZ0lkIiwibG9uZ0lkIiwic2l0ZURlc2NyaXB0aW9uIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwib25DaGFubmVsTG9naW4iLCJkaXNwYXRjaCIsIm9uQ2hhbm5lbExvZ291dCIsIm9uSGFuZGxlU2hvd1BhZ2VVcmkiLCJvblJlcXVlc3RFcnJvciIsIm9uTmV3Q2hhbm5lbFJlcXVlc3QiLCJvbk5ld0Fzc2V0UmVxdWVzdCIsIm9uUmVxdWVzdFVwZGF0ZSIsImFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IiwiYWRkQXNzZXRUb0Fzc2V0TGlzdCIsImFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0Iiwib25VcGRhdGVDaGFubmVsQ2xhaW1zIiwidXBkYXRlQ2hhbm5lbENsYWltcyIsImZpbGVSZXF1ZXN0ZWQiLCJ1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IiwidXBkYXRlRGlzcGxheUFzc2V0RXJyb3IiLCJwYXJhbXMiLCJIQU5ETEVfU0hPV19VUkkiLCJSRVFVRVNUX0VSUk9SIiwiY2hhbm5lbElkIiwicmVxdWVzdFR5cGUiLCJyZXF1ZXN0SWQiLCJDSEFOTkVMX1JFUVVFU1RfTkVXIiwiaWQiLCJleHRlbnNpb24iLCJBU1NFVF9SRVFVRVNUX05FVyIsIm1vZGlmaWVyIiwiUkVRVUVTVF9VUERBVEUiLCJSRVFVRVNUX0xJU1RfQUREIiwiY2xhaW1JZCIsImNsYWltRGF0YSIsIkFTU0VUX0FERCIsImNsYWltc0RhdGEiLCJDSEFOTkVMX0FERCIsImNoYW5uZWxLZXkiLCJwYWdlIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DIiwiY2hhbm5lbExpc3RJZCIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTIiwiRklMRV9SRVFVRVNURUQiLCJGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUiLCJESVNQTEFZX0FTU0VUX0VSUk9SIiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwiZGVidWciLCJzZW5kR0FTZXJ2ZUV2ZW50Iiwic2VuZEdBVGltaW5nRXZlbnQiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJjaGFubmVsX25hbWUiLCJjaGFubmVsX2lkIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJTZXF1ZWxpemUiLCJzZXF1ZWxpemUiLCJkaWFsZWN0IiwiZGlhbGVjdE9wdGlvbnMiLCJkZWNpbWFsTnVtYmVycyIsImxvZ2dpbmciLCJwb29sIiwibWF4IiwibWluIiwiaWRsZSIsImFjcXVpcmUiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwiY2F0Y2giLCJkYiIsImltcG9ydCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwiY3JlYXRlIiwiZGVmYXVsdERlc2NyaXB0aW9uIiwiZGVmYXVsdFRodW1ibmFpbCIsInNpdGVIb3N0Iiwic2l0ZVRpdGxlIiwic2l0ZVR3aXR0ZXIiLCJyZXF1ZXN0IiwicGFyc2VKU09OIiwicmVzcG9uc2UiLCJjaGVja1N0YXR1cyIsImpzb25SZXNwb25zZSIsIkVycm9yIiwidXJsIiwib3B0aW9ucyIsImZldGNoIiwiUHJvbWlzZSIsImFsbCIsImF4aW9zIiwiYXBpIiwiYXBpSG9zdCIsImFwaVBvcnQiLCJsYnJ5QXBpVXJpIiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJhbW91bnQiLCJzZWxlY3RBc3NldCIsInNob3ciLCJyZXF1ZXN0TGlzdCIsImFzc2V0S2V5IiwiYXNzZXRMaXN0Iiwic2VsZWN0U2hvd1N0YXRlIiwic3RhdGUiLCJyZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIiwiTk9fQ0hBTk5FTCIsIk5PX0NMQUlNIiwiTk9fRklMRSIsImdldENsYWltSWQiLCJjaGFubmVsQ2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsImxvbmdDaGFubmVsQ2xhaW1JZCIsImdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQiLCJzaG9ydENoYW5uZWxDbGFpbUlkIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJkYXRhVmFsdWVzIiwicGFzc3BvcnQiLCJsb2NhbExvZ2luU3RyYXRlZ3kiLCJsb2NhbFNpZ251cFN0cmF0ZWd5Iiwic2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplVXNlciIsInNlcmlhbGl6ZVVzZXIiLCJ1c2UiLCJsYnJ5QXBpIiwicHVibGlzaEhlbHBlcnMiLCJPcCIsInB1Ymxpc2giLCJmaWxlTmFtZSIsImZpbGVUeXBlIiwicHVibGlzaFJlc3VsdHMiLCJjZXJ0aWZpY2F0ZUlkIiwidHgiLCJmaWxlUmVjb3JkIiwiY2xhaW1faWQiLCJtZXRhZGF0YSIsImFkZHJlc3MiLCJjbGFpbV9hZGRyZXNzIiwib3V0cG9pbnQiLCJ0eGlkIiwibm91dCIsImhlaWdodCIsImZpbGVQYXRoIiwiZmlsZV9wYXRoIiwibnNmdyIsImNsYWltUmVjb3JkIiwiY29udGVudFR5cGUiLCJiaWQiLCJ1cHNlcnRDcml0ZXJpYSIsImNsYWltIiwic2V0Q2xhaW0iLCJzZXRGaWxlIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2xhaW1BZGRyZXNzZXMiLCJwdXNoIiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJvciIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsImZzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkiLCJsaWNlbnNlIiwiaW52YWxpZE5hbWVDaGFyYWN0ZXJzIiwiZXhlYyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyIsInBhdGgiLCJzaXplIiwidGVzdCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImF1dGhvciIsImxhbmd1YWdlIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsInVubGluayIsImFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIiwiZmlsZUluZm8iLCJnZXRSZXN1bHQiLCJmaWxlX25hbWUiLCJkb3dubG9hZF9wYXRoIiwiY3JlYXRlRmlsZURhdGEiLCJ1cGRhdGVMb2dnZWRJbkNoYW5uZWwiLCJDSEFOTkVMX1VQREFURSIsIlByb2dyZXNzQmFyIiwicHJvcHMiLCJiYXJzIiwiaW5kZXgiLCJpbmNyZW1lbnRlciIsImNyZWF0ZUJhcnMiLCJiaW5kIiwic3RhcnRQcm9ncmVzc0JhciIsInVwZGF0ZVByb2dyZXNzQmFyIiwic3RvcFByb2dyZXNzQmFyIiwiaSIsImlzQWN0aXZlIiwic2V0U3RhdGUiLCJ1cGRhdGVJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm1hcCIsImJhciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJFcnJvclBhZ2UiLCJzdHJpbmciLCJyZXR1cm5TaG9ydElkIiwiY2xhaW1zQXJyYXkiLCJjbGFpbUluZGV4Iiwic3Vic3RyaW5nIiwic2hvcnRJZExlbmd0aCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJwb3NzaWJsZU1hdGNoZXMiLCJzbGljZSIsImZpbHRlciIsInJlcSIsImNvbnRleHQiLCJzdG9yZSIsImh0bWwiLCJoZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJyZWRpcmVjdCIsInByZWxvYWRlZFN0YXRlIiwiZ2V0U3RhdGUiLCJzZW5kIiwiTE9HSU4iLCJDUkVBVEUiLCJMT0NBTF9DSEVDSyIsIlVOQVZBSUxBQkxFIiwiRVJST1IiLCJBVkFJTEFCTEUiLCJpbml0aWFsaXplIiwiR0FMaXN0ZW5lciIsInNlbmRQYWdlVmlldyIsImxvY2F0aW9uIiwibGlzdGVuIiwic2V0IiwicGF0aG5hbWUiLCJwYWdldmlldyIsImNoaWxkcmVuIiwiQXBwIiwiZmlsZUVycm9yIiwic2V0RmlsZUVycm9yIiwiQ0hBTk5FTCIsIkFTU0VUX0xJVEUiLCJBU1NFVF9ERVRBSUxTIiwiZGlzcGxheUFzc2V0IiwiYXNzZXQiLCJvbkZpbGVSZXF1ZXN0IiwidG9TdHJpbmciLCJtZXRhIiwibGluayIsIlNFUlZFIiwiU0hPVyIsImNsaWVudEFjY2VwdHNIdG1sIiwiYWNjZXB0IiwibWF0Y2giLCJyZXF1ZXN0SXNGcm9tQnJvd3NlciIsImNsaWVudFdhbnRzQXNzZXQiLCJyYW5nZSIsImltYWdlSXNXYW50ZWQiLCJ2aWRlb0lzV2FudGVkIiwiaXNWYWxpZENsYWltSWQiLCJpc1ZhbGlkU2hvcnRJZCIsImlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIiwiaW5wdXQiLCJzZXJ2ZUFzc2V0VG9DbGllbnQiLCJ2ZXJib3NlIiwic2VuZEZpbGVPcHRpb25zIiwic2VuZEZpbGUiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImZ1bGxDbGFpbUlkIiwiZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIiwiaGFzRmlsZUV4dGVuc2lvbiIsInJlc3BvbnNlVHlwZSIsImZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkiLCJpZGVudGlmaWVyIiwidGVtcE5hbWUiLCJsb2dSZXF1ZXN0RGF0YSIsIlJFR0VYUF9JTlZBTElEX0NMQUlNIiwiUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCIsIlJFR0VYUF9BRERSRVNTIiwiQ0hBTk5FTF9DSEFSIiwicGFyc2VJZGVudGlmaWVyIiwiY29tcG9uZW50c1JlZ2V4IiwiUmVnRXhwIiwicHJvdG8iLCJtb2RpZmllclNlcGVyYXRvciIsImlzQ2hhbm5lbCIsInN0YXJ0c1dpdGgiLCJuYW1lQmFkQ2hhcnMiLCJqb2luIiwicGFyc2VDbGFpbSIsInBhcnNlTW9kaWZpZXIiLCJyZXR1cm5TYWdhV2l0aFBhcmFtcyIsInNhZ2EiLCJzYWdhTWlkZGxld2FyZSIsIm1pZGRsZXdhcmUiLCJhY3Rpb24iLCJydW4iLCJkb25lIiwic2VsZWN0U2l0ZVN0YXRlIiwic2VsZWN0U2l0ZUhvc3QiLCJTZXJ2ZXIiLCJleHByZXNzIiwiYm9keVBhcnNlciIsImV4cHJlc3NIYW5kbGViYXJzIiwiSGFuZGxlYmFycyIsImNvb2tpZVNlc3Npb24iLCJodHRwIiwicmVxdWVzdExvZ2dlciIsImxvZ2dlckNvbmZpZyIsIm15c3FsQ29uZmlnIiwic2l0ZUNvbmZpZyIsInNsYWNrQ29uZmlnIiwiY29uZmlndXJlTG9nZ2VyIiwidXNlckNvbmZpZyIsImNvbmZpZ3VyZU15c3FsIiwiY29uZmlndXJlU2l0ZURldGFpbHMiLCJjb25maWd1cmVTbGFjayIsImNvbmZpZ3VyZUNsaWVudEJ1bmRsZSIsImNvbmZpZ3VyZU1vZGVscyIsImNvbmZpZ3VyZVJvdXRlcyIsImNyZWF0ZUFwcCIsImFwcCIsImVuYWJsZSIsInN0YXRpYyIsIl9fZGlybmFtZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNwZWVjaFBhc3Nwb3J0IiwibWF4QWdlIiwic2Vzc2lvbiIsImhicyIsImRlZmF1bHRMYXlvdXQiLCJoYW5kbGViYXJzIiwiZW5naW5lIiwic2VydmVyIiwic3RhcnQiLCJQT1JUIiwic3luYyIsIm5leHQiLCJMb2dnZXJDb25maWciLCJsb2dMZXZlbCIsImNvbmZpZ3VyZSIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwibGV2ZWwiLCJ0aW1lc3RhbXAiLCJjb2xvcml6ZSIsInByZXR0eVByaW50IiwiaGFuZGxlRXhjZXB0aW9ucyIsImh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb24iLCJzaWxseSIsIndpbnN0b25TbGFja1dlYkhvb2siLCJTbGFja1dlYkhvb2siLCJ3aW5zdG9uIiwiU2xhY2tDb25maWciLCJzbGFja1dlYkhvb2siLCJzbGFja0Vycm9yQ2hhbm5lbCIsInNsYWNrSW5mb0NoYW5uZWwiLCJhZGQiLCJ3ZWJob29rVXJsIiwiaWNvbkVtb2ppIiwiUGFzc3BvcnRMb2NhbFN0cmF0ZWd5IiwiU3RyYXRlZ3kiLCJyZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8iLCJ1c2VySW5zdGFuY2UiLCJ1c2VySW5mbyIsInVzZXJOYW1lIiwiZ2V0Q2hhbm5lbCIsInNob3J0Q2hhbm5lbElkIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VyIiwiY29tcGFyZVBhc3N3b3JkIiwiaXNNYXRjaCIsInVzZXJEYXRhIiwiY2hhbm5lbERhdGEiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiaGFuZGxlU2lnbnVwUmVxdWVzdCIsImhhbmRsZUxvZ2luUmVxdWVzdCIsImhhbmRsZUxvZ291dFJlcXVlc3QiLCJoYW5kbGVVc2VyUmVxdWVzdCIsImdldCIsInNpZ251cCIsImxvZ2luIiwibG9nSW4iLCJsb2dvdXQiLCJjaGFubmVsQXZhaWxhYmlsaXR5IiwiY2hhbm5lbENsYWltcyIsImNsYWltQXZhaWxhYmlsaXR5IiwiY2xhaW1HZXQiLCJjbGFpbUxvbmdJZCIsImNsYWltUHVibGlzaCIsImNsYWltUmVzb2x2ZSIsImNsYWltU2hvcnRJZCIsImNsYWltTGlzdCIsImZpbGVBdmFpbGFiaWxpdHkiLCJtdWx0aXBhcnRNaWRkbGV3YXJlIiwiYXZhaWxhYmxlTmFtZSIsImJvZHkiLCJDTEFJTVNfUEVSX1BBR0UiLCJjbGFpbXMiLCJ0b3RhbFBhZ2VzIiwiZGV0ZXJtaW5lVG90YWxQYWdlcyIsInBhZ2luYXRpb25QYWdlIiwiZ2V0UGFnZUZyb21RdWVyeSIsInZpZXdEYXRhIiwiZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIiwicHJldmlvdXNQYWdlIiwiZGV0ZXJtaW5lUHJldmlvdXNQYWdlIiwiY3VycmVudFBhZ2UiLCJuZXh0UGFnZSIsImRldGVybWluZU5leHRQYWdlIiwidG90YWxSZXN1bHRzIiwiZGV0ZXJtaW5lVG90YWxDbGFpbXMiLCJwYXJzZUludCIsInBhZ2VOdW1iZXIiLCJjbGFpbVN0YXJ0SW5kZXgiLCJjbGFpbUVuZEluZGV4IiwicGFnZU9mQ2xhaW1zIiwidG90YWxDbGFpbXMiLCJmdWxsUGFnZXMiLCJNYXRoIiwiZmxvb3IiLCJyZW1haW5kZXIiLCJjaGFubmVsU2hvcnRJZFJvdXRlIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImRlZmF1bHQiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJ2YWxpZEF0SGVpZ2h0IiwidmFsdWVWZXJzaW9uIiwiY2xhaW1UeXBlIiwiY2VydGlmaWNhdGVWZXJzaW9uIiwia2V5VHlwZSIsInB1YmxpY0tleSIsImZyZWV6ZVRhYmxlTmFtZSIsImJlbG9uZ3NUbyIsImZvcmVpZ25LZXkiLCJhbGxvd051bGwiLCJvcmRlciIsImdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQiLCIkbGlrZSIsImdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUiLCJ2YWxpZGF0ZUxvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwicmF3IiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJyZXNvbHZlQ2xhaW0iLCJjbGFpbUFycmF5IiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImlwQWRkcmVzcyIsImJjcnlwdCIsInByb3RvdHlwZSIsImNvbXBhcmUiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwiZ2VuU2FsdCIsInNhbHRFcnJvciIsInNhbHQiLCJoYXNoIiwiaGFzaEVycm9yIiwiaG9vayIsImNsYWltSW5mbyIsInJlc29sdmVSZXN1bHQiLCJmaWxlRGF0YSIsImNvbXBsZXRlZCIsImF1dGhlbnRpY2F0ZVVzZXIiLCJmaWxlcyIsImNoYW5uZWxQYXNzd29yZCIsInZhbGlkYXRlZENsYWltTmFtZSIsInRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJsYnJ5VHgiLCJhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMiLCJ1c2VyUGFzc3dvcmQiLCJjaGFubmVsRmluZFBhcmFtcyIsInJlc29sdmVkVXJpIiwiY2xhaW1zTGlzdCIsIm11bHRpcGFydCIsInVwbG9hZERpciIsImhhbmRsZVBhZ2VSZXF1ZXN0IiwiaGFuZGxlRW1iZWRSZXF1ZXN0IiwiaGFuZGxlUGFnZVJlbmRlciIsInNlbmRSZWFjdEFwcCIsImluaXRpYWxTdGF0ZSIsImFzc2lnbiIsInB1Ymxpc2hJbkNoYW5uZWwiLCJzZWxlY3RlZENoYW5uZWwiLCJwdWJsaXNoU3VibWl0IiwiY2hhbm5lbExpc3QiLCJnb29nbGVBbmFseXRpY3NJZCIsIkhvbWVQYWdlIiwiU0VPIiwicGFnZVVyaSIsInBhZ2VUaXRsZSIsIm1ldGFUYWdzIiwiY2Fub25pY2FsTGluayIsInJlbCIsImhyZWYiLCJvYmplY3QiLCJjcmVhdGVQYWdlVGl0bGUiLCJkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwiZmlsZUV4dCIsImxhc3RJbmRleE9mIiwiY3JlYXRlQmFzaWNNZXRhVGFncyIsInByb3BlcnR5IiwiY29udGVudCIsImNyZWF0ZUNoYW5uZWxNZXRhVGFncyIsImNyZWF0ZUFzc2V0TWV0YVRhZ3MiLCJlbWJlZFVybCIsInNob3dVcmwiLCJvZ1RpdGxlIiwib2dEZXNjcmlwdGlvbiIsIm9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJvZ1RodW1ibmFpbCIsImNyZWF0ZU1ldGFUYWdzIiwiY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rIiwiY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsiLCJjcmVhdGVDYW5vbmljYWxMaW5rIiwiVklFVyIsIkxPR09VVCIsIk5hdkJhciIsImNoZWNrRm9yTG9nZ2VkSW5Vc2VyIiwibG9nb3V0VXNlciIsImhhbmRsZVNlbGVjdGlvbiIsImNyZWRlbnRpYWxzIiwidGFyZ2V0Iiwic2VsZWN0ZWRPcHRpb25zIiwiTG9nbyIsIk5hdkJhckNoYW5uZWxEcm9wZG93biIsImRlZmF1bHRTZWxlY3Rpb24iLCJQdWJsaXNoVG9vbCIsIkRyb3B6b25lIiwiZHJhZ092ZXIiLCJtb3VzZU92ZXIiLCJkaW1QcmV2aWV3IiwiaGFuZGxlRHJvcCIsImhhbmRsZURyYWdPdmVyIiwiaGFuZGxlRHJhZ0VuZCIsImhhbmRsZURyYWdFbnRlciIsImhhbmRsZURyYWdMZWF2ZSIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVGaWxlSW5wdXQiLCJjaG9vc2VGaWxlIiwicHJldmVudERlZmF1bHQiLCJkdCIsImRhdGFUcmFuc2ZlciIsIml0ZW1zIiwia2luZCIsImRyb3BwZWRGaWxlIiwiZ2V0QXNGaWxlIiwicmVtb3ZlIiwiY2xlYXJEYXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsaWNrIiwiZmlsZUxpc3QiLCJ2YWxpZGF0ZUZpbGUiLCJQdWJsaXNoUHJldmlldyIsImltZ1NvdXJjZSIsInNldFByZXZpZXdJbWFnZVNvdXJjZSIsIm5ld1Byb3BzIiwic2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUiLCJwcmV2aWV3UmVhZGVyIiwiRmlsZVJlYWRlciIsInJlYWRBc0RhdGFVUkwiLCJvbmxvYWRlbmQiLCJib29sIiwiUHVibGlzaERldGFpbHMiLCJvblB1Ymxpc2hTdWJtaXQiLCJvbk1ldGFkYXRhQ2hhbmdlIiwiUHVibGlzaFRpdGxlSW5wdXQiLCJoYW5kbGVJbnB1dCIsImUiLCJsb2dnZWRJbkNoYW5uZWxOYW1lIiwibG9nZ2VkSW5DaGFubmVsU2hvcnRJZCIsInVybEVycm9yIiwib25DbGFpbUNoYW5nZSIsIm9uVXJsRXJyb3IiLCJQdWJsaXNoVXJsSW5wdXQiLCJzZXRDbGFpbU5hbWUiLCJ2YWxpZGF0ZUNsYWltIiwiY2xlYW5zZUlucHV0IiwiZmlsZU5hbWVXaXRob3V0RW5kaW5nIiwiY2xlYW5DbGFpbU5hbWUiLCJVcmxNaWRkbGUiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiaWEiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsIkJsb2IiLCJQdWJsaXNoVGh1bWJuYWlsSW5wdXQiLCJ2aWRlb1NvdXJjZSIsInNsaWRlck1pblJhbmdlIiwic2xpZGVyTWF4UmFuZ2UiLCJzbGlkZXJWYWx1ZSIsImhhbmRsZVZpZGVvTG9hZGVkRGF0YSIsImhhbmRsZVNsaWRlckNoYW5nZSIsImNyZWF0ZVRodW1ibmFpbCIsInNldFZpZGVvU291cmNlIiwibmV4dFByb3BzIiwiZGF0YVVyaSIsImJsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ0b3RhbE1pbnV0ZXMiLCJ0b3RhbFNlY29uZHMiLCJ2aWRlbyIsImN1cnJlbnRUaW1lIiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsIndpZHRoIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImRhdGFVcmwiLCJ0b0RhdGFVUkwiLCJzbmFwc2hvdCIsImRpc3BsYXkiLCJvblRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwiUHVibGlzaE1ldGFkYXRhSW5wdXRzIiwidG9nZ2xlU2hvd0lucHV0cyIsImhhbmRsZVNlbGVjdCIsImNoZWNrZWQiLCJzZWxlY3RlZE9wdGlvbiIsIm1heEhlaWdodCIsIkV4cGFuZGluZ1RleHRhcmVhIiwiX2hhbmRsZUNoYW5nZSIsImFkanVzdFRleHRhcmVhIiwib25DaGFuZ2UiLCJlbCIsInN0eWxlIiwic2Nyb2xsSGVpZ2h0IiwicmVzdCIsIngiLCJmdW5jIiwiY2hhbm5lbEVycm9yIiwib25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlIiwib25DaGFubmVsU2VsZWN0Iiwic3RhdGVzIiwiQ2hhbm5lbFNlbGVjdCIsInRvZ2dsZUFub255bW91c1B1Ymxpc2giLCJDaGFubmVsTG9naW5Gb3JtIiwibG9naW5Ub0NoYW5uZWwiLCJIZWFkZXJzIiwiQ2hhbm5lbENyZWF0ZUZvcm0iLCJoYW5kbGVDaGFubmVsSW5wdXQiLCJjbGVhbnNlQ2hhbm5lbElucHV0IiwidXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIiwiY2hhbm5lbFdpdGhBdFN5bWJvbCIsImNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIiwiY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUiLCJtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0IiwiQWN0aXZlU3RhdHVzQmFyIiwiSW5hY3RpdmVTdGF0dXNCYXIiLCJwdWJsaXNoU3RhdGVzIiwiUHVibGlzaFN0YXR1cyIsIkxPQURfU1RBUlQiLCJMT0FESU5HIiwiUFVCTElTSElORyIsIlNVQ0NFU1MiLCJGQUlMRUQiLCJQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIiwiQWJvdXRQYWdlIiwiTG9naW5QYWdlIiwiU2hvd1BhZ2UiLCJTaG93TGl0ZSIsIkFzc2V0RGlzcGxheSIsIlNob3dBc3NldERldGFpbHMiLCJBc3NldFRpdGxlIiwiQXNzZXRJbmZvIiwiY29weVRvQ2xpcGJvYXJkIiwiZWxlbWVudFRvQ29weSIsImRhdGFzZXQiLCJlbGVtZW50dG9jb3B5Iiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJwcmV2aW91c1JlcXVlc3QiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwic2hvd05ld1BhZ2UiLCJkZWZhdWx0cyIsIkFzc2V0UHJldmlldyIsImRpcmVjdFNvdXJjZUxpbmsiLCJzaG93VXJsTGluayIsIkZvdXJPaEZvclBhZ2UiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJ3YXRjaEhhbmRsZVNob3dQYWdlVXJpIiwicGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0iLCJwYXJzZUFuZFVwZGF0ZUNsYWltT25seSIsIm5ld0Fzc2V0UmVxdWVzdCIsIndhdGNoTmV3QXNzZXRSZXF1ZXN0IiwiZ2V0U2hvcnRJZCIsImdldENsYWltRGF0YSIsIm5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hOZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyIsImdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwiLCJleHRlbnNpb25TZXBlcmF0b3IiLCJzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7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RCxPQUFyRDtBQUNBO0FBQ0EwVCwwQkFBd0I3VyxXQUF4QixFQUFxQzJMLGNBQXJDLEVBQXFEbEIsU0FBckQsRUFBZ0V0SCxPQUFoRSxFQUF5RTdILFdBQXpFLEVBQXNGQyxFQUF0RixFQUEwRkUsR0FBMUY7QUFDRCxDQXJDRDs7QUF1Q0FOLE9BQU9DLE9BQVAsR0FBaUI2NUIsK0JBQWpCLEM7Ozs7Ozs7OztBQ3pEQSxJQUFNL08sb0JBQW9CLG1CQUFBaHJCLENBQVEsR0FBUixDQUExQjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQixVQUFDK2UsR0FBRCxFQUFTO0FBQ3hCQSxNQUFJa0UsR0FBSixDQUFRLEdBQVIsRUFBYTZILGlCQUFiO0FBQ0QsQ0FGRCxDOzs7Ozs7Ozs7QUNGQSxJQUFNRSxtQkFBbUIsbUJBQUFsckIsQ0FBUSxFQUFSLENBQXpCOztBQUVBLElBQU1tckIsZUFBZSxTQUFmQSxZQUFlLENBQUMvUyxHQUFELEVBQU03WCxHQUFOLEVBQWM7QUFDakMycUIsbUJBQWlCOVMsR0FBakIsRUFBc0I3WCxHQUF0QjtBQUNELENBRkQ7O0FBSUFOLE9BQU9DLE9BQVAsR0FBaUJpckIsWUFBakIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1MCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTBhZDkyNGU0YzVkOGJjNzQ1YTQiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFuZGxlRXJyb3JSZXNwb25zZTogZnVuY3Rpb24gKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcykge1xuICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igb24gJHtvcmlnaW5hbFVybH1gLCBtb2R1bGUuZXhwb3J0cy51c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMoZXJyb3IpKTtcbiAgICBjb25zdCBbc3RhdHVzLCBtZXNzYWdlXSA9IG1vZHVsZS5leHBvcnRzLnJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyhlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKHN0YXR1cylcbiAgICAgIC5qc29uKG1vZHVsZS5leHBvcnRzLmNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkKHN0YXR1cywgbWVzc2FnZSkpO1xuICB9LFxuICByZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGxldCBzdGF0dXMsIG1lc3NhZ2U7XG4gICAgLy8gY2hlY2sgZm9yIGRhZW1vbiBiZWluZyB0dXJuZWQgb2ZmXG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICBzdGF0dXMgPSA1MDM7XG4gICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gcmVmdXNlZC4gIFRoZSBkYWVtb24gbWF5IG5vdCBiZSBydW5uaW5nLic7XG4gICAgICAvLyBmYWxsYmFjayBmb3IgZXZlcnl0aGluZyBlbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IDQwMDtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBbc3RhdHVzLCBtZXNzYWdlXTtcbiAgfSxcbiAgdXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID09PSAwKSB7XG4gICAgICBsZXQgbmV3RXJyb3JPYmplY3QgPSB7fTtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIG5ld0Vycm9yT2JqZWN0W2tleV0gPSBlcnJba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0Vycm9yT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9LFxuICBjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJmdW5jdGlvbiBTaXRlQ29uZmlnICgpIHtcbiAgdGhpcy5hbmFseXRpY3MgPSB7XG4gICAgZ29vZ2xlSWQ6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5hc3NldERlZmF1bHRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQW4gYXNzZXQgcHVibGlzaGVkIG9uIFNwZWUuY2gnLFxuICAgIHRodW1ibmFpbCAgOiAnaHR0cHM6Ly9zcGVlLmNoL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gIH07XG4gIHRoaXMuYXV0aCA9IHtcbiAgICBzZXNzaW9uS2V5OiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IHtcbiAgICBjb21wb25lbnRzOiB7fSxcbiAgICBjb250YWluZXJzOiB7fSxcbiAgICBwYWdlcyAgICAgOiB7fSxcbiAgfTtcbiAgdGhpcy5kZXRhaWxzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT3Blbi1zb3VyY2UsIGRlY2VudHJhbGl6ZWQgaW1hZ2UgYW5kIHZpZGVvIHNoYXJpbmcuJyxcbiAgICBob3N0ICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHBvcnQgICAgICAgOiAzMDAwLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gICAgdHdpdHRlciAgICA6ICdAc3BlZV9jaCcsXG4gIH07XG4gIHRoaXMucHVibGlzaGluZyA9IHtcbiAgICBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXM6IFtdLFxuICAgIGRpc2FibGVkICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgZGlzYWJsZWRNZXNzYWdlICAgICAgICAgOiAnUGxlYXNlIGNoZWNrIGJhY2sgc29vbi4nLFxuICAgIHByaW1hcnlDbGFpbUFkZHJlc3MgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWwgICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWxJZCAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHVwbG9hZERpcmVjdG9yeSAgICAgICAgIDogJy9ob21lL2xicnkvVXBsb2FkcycsXG4gIH07XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNpdGUgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7IGFuYWx5dGljcywgYXNzZXREZWZhdWx0cywgYXV0aCwgY3VzdG9tQ29tcG9uZW50cywgZGV0YWlscywgcHVibGlzaGluZyB9ID0gY29uZmlnO1xuICAgIGNvbnNvbGUubG9nKCdDb25maWd1cmluZyBzaXRlIGRldGFpbHMuLi4nKTtcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0RmlsZSAoZmlsZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9TRUxFQ1RFRCxcbiAgICBkYXRhOiBmaWxlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyRmlsZSAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0NMRUFSLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1ldGFkYXRhIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuTUVUQURBVEFfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNsYWltICh2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0xBSU1fVVBEQVRFLFxuICAgIGRhdGE6IHZhbHVlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFB1Ymxpc2hJbkNoYW5uZWwgKGNoYW5uZWwpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwsXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQdWJsaXNoU3RhdHVzIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBtZXNzYWdlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRXJyb3IgKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5FUlJPUl9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHZhbHVlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRDaGFubmVsIChjaGFubmVsTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuU0VMRUNURURfQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YTogY2hhbm5lbE5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTWV0YWRhdGFJbnB1dHMgKHNob3dNZXRhZGF0YUlucHV0cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUyxcbiAgICBkYXRhOiBzaG93TWV0YWRhdGFJbnB1dHMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdUaHVtYm5haWwgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRIVU1CTkFJTF9ORVcsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFB1Ymxpc2ggKGhpc3RvcnkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBUlQsXG4gICAgZGF0YTogeyBoaXN0b3J5IH0sXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBteXNxbCAoKSB7XG4gIHRoaXMuZGF0YWJhc2UgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXNlcm5hbWUgPSAnZGVmYXVsdCc7XG4gIHRoaXMucGFzc3dvcmQgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ05vIE15U1FMIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgLy8gY29uZmlndXJlIGNyZWRlbnRpYWxzXG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIG15c3FsLi4uJyk7XG4gICAgY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBjb25maWc7XG4gICAgdGhpcy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBteXNxbCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHNpdGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxOYW1lICAgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIGNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGNoYW5uZWxMb25nSWQgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5sb25nSWQsXG4gICAgc2l0ZURlc2NyaXB0aW9uOiBzaXRlLmRlc2NyaXB0aW9uLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsTG9nb3V0OiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobnVsbCwgbnVsbCwgbnVsbCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG4vLyBiYXNpYyByZXF1ZXN0IHBhcnNpbmdcbmV4cG9ydCBmdW5jdGlvbiBvbkhhbmRsZVNob3dQYWdlVXJpIChwYXJhbXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSxcbiAgICBkYXRhOiBwYXJhbXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3Q2hhbm5lbFJlcXVlc3QgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBDSEFOTkVMO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgY3IjJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsXG4gICAgZGF0YTogeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdBc3NldFJlcXVlc3QgKG5hbWUsIGlkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBleHRlbnNpb24pIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBleHRlbnNpb24gPyBBU1NFVF9MSVRFIDogQVNTRVRfREVUQUlMUztcbiAgY29uc3QgcmVxdWVzdElkID0gYGFyIyR7bmFtZX0jJHtpZH0jJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgICAgbmFtZSxcbiAgICAgIG1vZGlmaWVyOiB7XG4gICAgICAgIGlkLFxuICAgICAgICBjaGFubmVsOiB7XG4gICAgICAgICAgbmFtZTogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgaWQgIDogY2hhbm5lbElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdFVwZGF0ZSAocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCAoaWQsIGVycm9yLCBrZXkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIGtleSB9LFxuICB9O1xufTtcblxuLy8gYXNzZXQgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZXRUb0Fzc2V0TGlzdCAoaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhIH0sXG4gIH07XG59XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QgKGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQURELFxuICAgIGRhdGE6IHsgaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsXG4gICAgZGF0YToge2NoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZX0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MsXG4gICAgZGF0YToge2NoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGF9LFxuICB9O1xufTtcblxuLy8gZGlzcGxheSBhIGZpbGVcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVSZXF1ZXN0ZWQgKG5hbWUsIGNsYWltSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfUkVRVUVTVEVELFxuICAgIGRhdGE6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkgKHN0YXR1cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFLFxuICAgIGRhdGE6IHN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsImNvbnN0IENlcnRpZmljYXRlID0gcmVxdWlyZSgnbW9kZWxzL2NlcnRpZmljYXRlLmpzJyk7XG5jb25zdCBDaGFubmVsID0gcmVxdWlyZSgnbW9kZWxzL2NoYW5uZWwuanMnKTtcbmNvbnN0IENsYWltID0gcmVxdWlyZSgnbW9kZWxzL2NsYWltLmpzJyk7XG5jb25zdCBGaWxlID0gcmVxdWlyZSgnbW9kZWxzL2ZpbGUuanMnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCdtb2RlbHMvcmVxdWVzdC5qcycpO1xuY29uc3QgVXNlciA9IHJlcXVpcmUoJ21vZGVscy91c2VyLmpzJyk7XG5cbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5jb25zdCB7ZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZH0gPSByZXF1aXJlKCdteXNxbENvbmZpZy5qcycpO1xuXG4vLyBzZXQgc2VxdWVsaXplIG9wdGlvbnNcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCwge1xuICBob3N0ICAgICAgICAgIDogJ2xvY2FsaG9zdCcsXG4gIGRpYWxlY3QgICAgICAgOiAnbXlzcWwnLFxuICBkaWFsZWN0T3B0aW9uczoge2RlY2ltYWxOdW1iZXJzOiB0cnVlfSxcbiAgbG9nZ2luZyAgICAgICA6IGZhbHNlLFxuICBwb29sICAgICAgICAgIDoge1xuICAgIG1heCAgICA6IDUsXG4gICAgbWluICAgIDogMCxcbiAgICBpZGxlICAgOiAxMDAwMCxcbiAgICBhY3F1aXJlOiAxMDAwMCxcbiAgfSxcbn0pO1xuXG4vLyBlc3RhYmxpc2ggbXlzcWwgY29ubmVjdGlvblxuc2VxdWVsaXplXG4gIC5hdXRoZW50aWNhdGUoKVxuICAudGhlbigoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ1NlcXVlbGl6ZSBoYXMgZXN0YWJsaXNoZWQgbXlzcWwgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkuJyk7XG4gIH0pXG4gIC5jYXRjaChlcnIgPT4ge1xuICAgIGxvZ2dlci5lcnJvcignU2VxdWVsaXplIHdhcyB1bmFibGUgdG8gY29ubmVjdCB0byB0aGUgZGF0YWJhc2U6JywgZXJyKTtcbiAgfSk7XG5cbi8vIG1hbnVhbGx5IGFkZCBlYWNoIG1vZGVsIHRvIHRoZSBkYiBvYmplY3QgKG5vdGU6IG1ha2UgdGhpcyBkeW5hbWljKVxuY29uc3QgZGIgPSB7fTtcbmRiWydDZXJ0aWZpY2F0ZSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2VydGlmaWNhdGUnLCBDZXJ0aWZpY2F0ZSk7XG5kYlsnQ2hhbm5lbCddID0gc2VxdWVsaXplLmltcG9ydCgnQ2hhbm5lbCcsIENoYW5uZWwpO1xuZGJbJ0NsYWltJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDbGFpbScsIENsYWltKTtcbmRiWydGaWxlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdGaWxlJywgRmlsZSk7XG5kYlsnUmVxdWVzdCddID0gc2VxdWVsaXplLmltcG9ydCgnUmVxdWVzdCcsIFJlcXVlc3QpO1xuZGJbJ1VzZXInXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1VzZXInLCBVc2VyKTtcblxuLy8gcnVuIG1vZGVsLmFzc29jaWF0aW9uIGZvciBlYWNoIG1vZGVsIGluIHRoZSBkYiBvYmplY3QgdGhhdCBoYXMgYW4gYXNzb2NpYXRpb25cbmxvZ2dlci5pbmZvKCdhc3NvY2lhdGluZyBkYiBtb2RlbHMuLi4nKTtcbk9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4gIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuICAgIGxvZ2dlci5pbmZvKCdBc3NvY2lhdGluZyBtb2RlbDonLCBtb2RlbE5hbWUpO1xuICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbiAgfVxufSk7XG5cbi8vIGFkZCBzZXF1ZWxpemUvU2VxdWVsaXplIHRvIGRiXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG4vLyBhZGQgYW4gJ3Vwc2VydCcgbWV0aG9kIHRvIHRoZSBkYiBvYmplY3RcbmRiLnVwc2VydCA9IChNb2RlbCwgdmFsdWVzLCBjb25kaXRpb24sIHRhYmxlTmFtZSkgPT4ge1xuICByZXR1cm4gTW9kZWxcbiAgICAuZmluZE9uZSh7XG4gICAgICB3aGVyZTogY29uZGl0aW9uLFxuICAgIH0pXG4gICAgLnRoZW4ob2JqID0+IHtcbiAgICAgIGlmIChvYmopIHsgIC8vIHVwZGF0ZVxuICAgICAgICBsb2dnZXIuZGVidWcoYHVwZGF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIG9iai51cGRhdGUodmFsdWVzKTtcbiAgICAgIH0gZWxzZSB7ICAvLyBpbnNlcnRcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBjcmVhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBNb2RlbC5jcmVhdGUodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgJHt0YWJsZU5hbWV9LnVwc2VydCBlcnJvcmAsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZSB9KSA9PiB7XG4gIGNvbnN0IHsgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsLCBkZXNjcmlwdGlvbjogc2l0ZURlc2NyaXB0aW9uLCBob3N0OiBzaXRlSG9zdCwgdGl0bGU6IHNpdGVUaXRsZSwgdHdpdHRlcjogc2l0ZVR3aXR0ZXIgfSA9IHNpdGU7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gICAgc2l0ZURlc2NyaXB0aW9uLFxuICAgIHNpdGVIb3N0LFxuICAgIHNpdGVUaXRsZSxcbiAgICBzaXRlVHdpdHRlcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnY3Jvc3MtZmV0Y2gvcG9seWZpbGwnO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgSlNPTiByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBwYXJzZUpTT04gKHJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBzdGF0dXMgcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgQSByZXNwb25zZSBmcm9tIGEgbmV0d29yayByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdCB8IHVuZGVmaW5lZH0gUmV0dXJucyBvYmplY3Qgd2l0aCBzdGF0dXMgYW5kIHN0YXR1c1RleHQsIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjaGVja1N0YXR1cyAocmVzcG9uc2UsIGpzb25SZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xuICB9XG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGpzb25SZXNwb25zZS5tZXNzYWdlKTtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgdGhyb3cgZXJyb3I7XG59XG5cbi8qKlxuICogUmVxdWVzdHMgYSBVUkwsIHJldHVybmluZyBhIHByb21pc2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybCAgICAgICBUaGUgVVJMIHdlIHdhbnQgdG8gcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgd2Ugd2FudCB0byBwYXNzIHRvIFwiZmV0Y2hcIlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgIFRoZSByZXNwb25zZSBkYXRhXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXNwb25zZSwgcGFyc2VKU09OKHJlc3BvbnNlKV0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFtyZXNwb25zZSwganNvblJlc3BvbnNlXSkgPT4ge1xuICAgICAgcmV0dXJuIGNoZWNrU3RhdHVzKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpO1xuICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3JlcXVlc3QuanMiLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGFwaTogeyBhcGlIb3N0LCBhcGlQb3J0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzJyk7XG5jb25zdCBsYnJ5QXBpVXJpID0gJ2h0dHA6Ly8nICsgYXBpSG9zdCArICc6JyArIGFwaVBvcnQ7XG5jb25zdCB7IGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCwgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4vZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5cbmNvbnN0IGhhbmRsZUxicnluZXRSZXNwb25zZSA9ICh7IGRhdGEgfSwgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGxvZ2dlci5kZWJ1ZygnbGJyeSBhcGkgZGF0YTonLCBkYXRhKTtcbiAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgLy8gY2hlY2sgZm9yIGFuIGVycm9yXG4gICAgaWYgKGRhdGEucmVzdWx0LmVycm9yKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0xicnluZXQgYXBpIGVycm9yOicsIGRhdGEucmVzdWx0LmVycm9yKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoZGF0YS5yZXN1bHQuZXJyb3IpKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIHJlc29sdmUoZGF0YS5yZXN1bHQpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBmYWxsYmFjayBpbiBjYXNlIGl0IGp1c3QgdGltZWQgb3V0XG4gIHJlamVjdChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaENsYWltIChwdWJsaXNoUGFyYW1zKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFB1Ymxpc2hpbmcgY2xhaW0gdG8gXCIke3B1Ymxpc2hQYXJhbXMubmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3B1Ymxpc2gnLFxuICAgICAgICAgIHBhcmFtczogcHVibGlzaFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3B1Ymxpc2gnLCBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwocHVibGlzaFBhcmFtcyksIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBDbGFpbSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSwgdGltZW91dDogMjAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltJywgJ0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltTGlzdCAoY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgY2xhaW1fbGlzdCBmb3IgXCIke2NsYWltTmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NsYWltX2xpc3QnLFxuICAgICAgICAgIHBhcmFtczogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltTGlzdCcsICdDTEFJTV9MSVNUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVzb2x2ZVVyaSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFJlc29sdmluZyBVUkkgZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdyZXNvbHZlJyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3Jlc29sdmVVcmknLCAnUkVTT0xWRScsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcikgeyAgLy8gY2hlY2sgZm9yIGVycm9yc1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7ICAvLyBpZiBubyBlcnJvcnMsIHJlc29sdmVcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHRbdXJpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXREb3dubG9hZERpcmVjdG9yeSAoKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdsYnJ5QXBpID4+IFJldHJpZXZpbmcgdGhlIGRvd25sb2FkIGRpcmVjdG9yeSBwYXRoIGZyb20gbGJyeSBkYWVtb24uLi4nKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdzZXR0aW5nc19nZXQnLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXREb3dubG9hZERpcmVjdG9yeScsICdTRVRUSU5HU19HRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0LmRvd25sb2FkX2RpcmVjdG9yeSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gbGJyeSBkYWVtb24sIGJ1dCB1bmFibGUgdG8gcmV0cmlldmUgdGhlIGRvd25sb2FkIGRpcmVjdG9yeS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdMYnJ5bmV0IEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKCcvaG9tZS9sYnJ5L0Rvd25sb2Fkcy8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZUNoYW5uZWwgKG5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gQ3JlYXRpbmcgY2hhbm5lbCBmb3IgJHtuYW1lfS4uLmApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NoYW5uZWxfbmV3JyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGNoYW5uZWxfbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGFtb3VudCAgICAgIDogMC4xLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdjcmVhdGVDaGFubmVsJywgJ0NIQU5ORUxfTkVXJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwiLy8gcmVxdWVzdCBhY3Rpb25zXG5leHBvcnQgY29uc3QgSEFORExFX1NIT1dfVVJJID0gJ0hBTkRMRV9TSE9XX1VSSSc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9FUlJPUiA9ICdSRVFVRVNUX0VSUk9SJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX1VQREFURSA9ICdSRVFVRVNUX1VQREFURSc7XG5leHBvcnQgY29uc3QgQVNTRVRfUkVRVUVTVF9ORVcgPSAnQVNTRVRfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfUkVRVUVTVF9ORVcgPSAnQ0hBTk5FTF9SRVFVRVNUX05FVyc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9MSVNUX0FERCA9ICdSRVFVRVNUX0xJU1RfQUREJztcblxuLy8gYXNzZXQgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEFTU0VUX0FERCA9IGBBU1NFVF9BRERgO1xuXG4vLyBjaGFubmVsIGFjdGlvbnNcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0FERCA9ICdDSEFOTkVMX0FERCc7XG5cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyA9ICdDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyc7XG5cbi8vIGFzc2V0L2ZpbGUgZGlzcGxheSBhY3Rpb25zXG5leHBvcnQgY29uc3QgRklMRV9SRVFVRVNURUQgPSAnRklMRV9SRVFVRVNURUQnO1xuZXhwb3J0IGNvbnN0IEZJTEVfQVZBSUxBQklMSVRZX1VQREFURSA9ICdGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQVNTRVRfRVJST1IgPSAnRElTUExBWV9BU1NFVF9FUlJPUic7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdEFzc2V0ID0gKHNob3cpID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3Rbc2hvdy5yZXF1ZXN0LmlkXTtcbiAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTtcbiAgcmV0dXJuIHNob3cuYXNzZXRMaXN0W2Fzc2V0S2V5XTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RTaG93U3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNob3c7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NlbGVjdG9ycy9zaG93LmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuY29uc3QgTk9fRklMRSA9ICdOT19GSUxFJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWQgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSwgY2xhaW1JZCkge1xuICAgIGlmIChjaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNoYW5uZWwoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmdldENsYWltSWRCeUNsYWltKG5hbWUsIGNsYWltSWQpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2xhaW0gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2xhaW0oJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DbGFpbS5nZXRMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltSWRCeUNoYW5uZWwgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDaGFubmVsKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSwgJHtjbGFpbU5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgaWRcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxJZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsSWQsIGRiLkNsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxJZCwgY2xhaW1OYW1lKV0pOyAgLy8gMi4gZ2V0IHRoZSBsb25nIGNsYWltIGlkXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxJZCwgbG9uZ0NsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbERhdGEgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbE5hbWUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBzaG9ydENoYW5uZWxDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgICBzaG9ydENoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyhsb25nQ2hhbm5lbENsYWltSWQpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXldKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiBmb3JtYXQgdGhlIGRhdGEgZm9yIHRoZSB2aWV3LCBpbmNsdWRpbmcgcGFnaW5hdGlvblxuICAgICAgICAgIGxldCBwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEgPSByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheSwgcGFnZSk7XG4gICAgICAgICAgLy8gNC4gcmV0dXJuIGFsbCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvbiBhbmQgY29udGVudHNcbiAgICAgICAgICByZXNvbHZlKHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldExvY2FsRmlsZVJlY29yZCAoY2xhaW1JZCwgbmFtZSkge1xuICAgIHJldHVybiBkYi5GaWxlLmZpbmRPbmUoe3doZXJlOiB7Y2xhaW1JZCwgbmFtZX19KVxuICAgICAgLnRoZW4oZmlsZSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIHJldHVybiBOT19GSUxFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlLmRhdGFWYWx1ZXM7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2EvZWZmZWN0c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5jb25zdCBsb2NhbExvZ2luU3RyYXRlZ3kgPSByZXF1aXJlKCcuL2xvY2FsLWxvZ2luLmpzJyk7XG5jb25zdCBsb2NhbFNpZ251cFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1zaWdudXAuanMnKTtcbmNvbnN0IHsgc2VyaWFsaXplU3BlZWNoVXNlciwgZGVzZXJpYWxpemVTcGVlY2hVc2VyIH0gPSByZXF1aXJlKCdoZWxwZXJzL2F1dGhIZWxwZXJzLmpzJyk7XG5cbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihkZXNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xucGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVTcGVlY2hVc2VyKTtcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtbG9naW4nLCBsb2NhbExvZ2luU3RyYXRlZ3kpO1xucGFzc3BvcnQudXNlKCdsb2NhbC1zaWdudXAnLCBsb2NhbFNpZ251cFN0cmF0ZWd5KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXNzcG9ydDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBwdWJsaXNoSGVscGVycyA9IHJlcXVpcmUoJ2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyBwcmltYXJ5Q2xhaW1BZGRyZXNzLCBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBPcCA9IFNlcXVlbGl6ZS5PcDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2ggKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgcHVibGlzaFJlc3VsdHMsIGNlcnRpZmljYXRlSWQsIGNoYW5uZWxOYW1lO1xuICAgICAgLy8gcHVibGlzaCB0aGUgZmlsZVxuICAgICAgcmV0dXJuIGxicnlBcGkucHVibGlzaENsYWltKHB1Ymxpc2hQYXJhbXMpXG4gICAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU3VjY2Vzc2Z1bGx5IHB1Ymxpc2hlZCAke3B1Ymxpc2hQYXJhbXMubmFtZX0gJHtmaWxlTmFtZX1gLCB0eCk7XG4gICAgICAgICAgcHVibGlzaFJlc3VsdHMgPSB0eDtcbiAgICAgICAgICAvLyBnZXQgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBpZiAocHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgdGhpcyBjbGFpbSB3YXMgcHVibGlzaGVkIGluIGNoYW5uZWw6ICR7cHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gZGIuQ2hhbm5lbC5maW5kT25lKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBjaGFubmVsTmFtZTogcHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCd0aGlzIGNsYWltIHdhcyBub3QgcHVibGlzaGVkIGluIGEgY2hhbm5lbCcpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgLy8gc2V0IGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gbnVsbDtcbiAgICAgICAgICBjaGFubmVsTmFtZSA9IG51bGw7XG4gICAgICAgICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBjaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUgPSBjaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoYGNlcnRpZmljYXRlSWQ6ICR7Y2VydGlmaWNhdGVJZH1gKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIEZpbGUgcmVjb3JkXG4gICAgICAgICAgY29uc3QgZmlsZVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICBmaWxlUGF0aCAgIDogcHVibGlzaFBhcmFtcy5maWxlX3BhdGgsXG4gICAgICAgICAgICBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyBjcmVhdGUgdGhlIENsYWltIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGNsYWltUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgdGh1bWJuYWlsICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGh1bWJuYWlsLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgICAgYW1vdW50ICAgICA6IHB1Ymxpc2hQYXJhbXMuYmlkLFxuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCxcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IGNyaXRlcmlhXG4gICAgICAgICAgY29uc3QgdXBzZXJ0Q3JpdGVyaWEgPSB7XG4gICAgICAgICAgICBuYW1lICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCB0aGUgcmVjb3Jkc1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVSZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnRmlsZScpLCBkYi51cHNlcnQoZGIuQ2xhaW0sIGNsYWltUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0NsYWltJyldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtmaWxlLCBjbGFpbV0pID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGUuc2V0Q2xhaW0oY2xhaW0pLCBjbGFpbS5zZXRGaWxlKGZpbGUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgICByZXNvbHZlKHB1Ymxpc2hSZXN1bHRzKTsgLy8gcmVzb2x2ZSB0aGUgcHJvbWlzZSB3aXRoIHRoZSByZXN1bHQgZnJvbSBsYnJ5QXBpLnB1Ymxpc2hDbGFpbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ1BVQkxJU0ggRVJST1InLCBlcnJvcik7XG4gICAgICAgICAgcHVibGlzaEhlbHBlcnMuZGVsZXRlVGVtcG9yYXJ5RmlsZShwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCk7IC8vIGRlbGV0ZSB0aGUgbG9jYWwgZmlsZVxuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjbGFpbU5hbWVJc0F2YWlsYWJsZSAobmFtZSkge1xuICAgIGNvbnN0IGNsYWltQWRkcmVzc2VzID0gYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIHx8IFtdO1xuICAgIGNsYWltQWRkcmVzc2VzLnB1c2gocHJpbWFyeUNsYWltQWRkcmVzcyk7XG4gICAgLy8gZmluZCBhbnkgcmVjb3JkcyB3aGVyZSB0aGUgbmFtZSBpcyB1c2VkXG4gICAgcmV0dXJuIGRiLkNsYWltXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFsnYWRkcmVzcyddLFxuICAgICAgICB3aGVyZSAgICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICBbT3Aub3JdOiBjbGFpbUFkZHJlc3NlcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2xhaW0gaXMgYWxyZWFkeSBpbiB1c2UnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IChuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkNoYW5uZWxcbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgY2hhbm5lbE5hbWU6IG5hbWUgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNoYW5uZWwgaGFzIGFscmVhZHkgYmVlbiBjbGFpbWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHsgZGV0YWlscywgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5ICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gdmFsaWRhdGUgbmFtZVxuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBuYW1lIGZpZWxkIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgY29uc3QgaW52YWxpZE5hbWVDaGFyYWN0ZXJzID0gL1teQS1aYS16MC05LC1dLy5leGVjKG5hbWUpO1xuICAgIGlmIChpbnZhbGlkTmFtZUNoYXJhY3RlcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNsYWltIG5hbWUgeW91IHByb3ZpZGVkIGlzIG5vdCBhbGxvd2VkLiAgT25seSB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnMgYXJlIGFsbG93ZWQ6IEEtWiwgYS16LCAwLTksIGFuZCBcIi1cIicpO1xuICAgIH1cbiAgICAvLyBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgbnNmdyA9IChuc2Z3ID09PSAndHJ1ZScpO1xuICAgIGxpY2Vuc2UgPSBsaWNlbnNlIHx8IG51bGw7XG4gICAgdGl0bGUgPSB0aXRsZSB8fCBudWxsO1xuICAgIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gfHwgbnVsbDtcbiAgICB0aHVtYm5haWwgPSB0aHVtYm5haWwgfHwgbnVsbDtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgbnNmdyxcbiAgICAgIGxpY2Vuc2UsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgdGh1bWJuYWlsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyAoe2ZpbGUsIHRodW1ibmFpbH0pIHtcbiAgICAvLyBtYWtlIHN1cmUgYSBmaWxlIHdhcyBwcm92aWRlZFxuICAgIGlmICghZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHdpdGgga2V5IG9mIFtmaWxlXSBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5wYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcGF0aCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlIG5hbWVcbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZVxuICAgIG1vZHVsZS5leHBvcnRzLnZhbGlkYXRlRmlsZVR5cGVBbmRTaXplKGZpbGUpO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVOYW1lICAgICAgICAgOiBmaWxlLm5hbWUsXG4gICAgICBmaWxlUGF0aCAgICAgICAgIDogZmlsZS5wYXRoLFxuICAgICAgZmlsZVR5cGUgICAgICAgICA6IGZpbGUudHlwZSxcbiAgICAgIHRodW1ibmFpbEZpbGVOYW1lOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLm5hbWUgOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVQYXRoOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnBhdGggOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVUeXBlOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnR5cGUgOiBudWxsKSxcbiAgICB9O1xuICB9LFxuICB2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSAoZmlsZSkge1xuICAgIC8vIGNoZWNrIGZpbGUgdHlwZSBhbmQgc2l6ZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuanBlZy8uanBnLy5wbmcgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmdpZiB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIC5naWZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5tcDQgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gdW5yZWNvZ25pemVkIGZpbGUgdHlwZScpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSAnICsgZmlsZS50eXBlICsgJyBjb250ZW50IHR5cGUgaXMgbm90IHN1cHBvcnRlZC4gIE9ubHksIC5qcGVnLCAucG5nLCAuZ2lmLCBhbmQgLm1wNCBmaWxlcyBhcmUgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGU7XG4gIH0sXG4gIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyAoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBwcm92aWRlIGRlZmF1bHRzIGZvciB0aXRsZVxuICAgIGlmICh0aXRsZSA9PT0gbnVsbCB8fCB0aXRsZS50cmltKCkgPT09ICcnKSB7XG4gICAgICB0aXRsZSA9IG5hbWU7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgZGVzY3JpcHRpb25cbiAgICBpZiAoZGVzY3JpcHRpb24gPT09IG51bGwgfHwgZGVzY3JpcHRpb24udHJpbSgpID09PSAnJykge1xuICAgICAgZGVzY3JpcHRpb24gPSAnJztcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBsaWNlbnNlXG4gICAgaWYgKGxpY2Vuc2UgPT09IG51bGwgfHwgbGljZW5zZS50cmltKCkgPT09ICcnKSB7XG4gICAgICBsaWNlbnNlID0gJyAnOyAgLy8gZGVmYXVsdCB0byBlbXB0eSBzdHJpbmdcbiAgICB9XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIGNvbnN0IHB1Ymxpc2hQYXJhbXMgPSB7XG4gICAgICBuYW1lLFxuICAgICAgZmlsZV9wYXRoOiBmaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvciAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgfTtcbiAgICAvLyBhZGQgdGh1bWJuYWlsIHRvIGNoYW5uZWwgaWYgdmlkZW9cbiAgICBpZiAodGh1bWJuYWlsKSB7XG4gICAgICBwdWJsaXNoUGFyYW1zWydtZXRhZGF0YSddWyd0aHVtYm5haWwnXSA9IHRodW1ibmFpbDtcbiAgICB9XG4gICAgcmV0dXJuIHB1Ymxpc2hQYXJhbXM7XG4gIH0sXG4gIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMgKHRodW1ibmFpbEZpbGVQYXRoLCBjbGFpbU5hbWUsIGxpY2Vuc2UsIG5zZncpIHtcbiAgICBpZiAoIXRodW1ibmFpbEZpbGVQYXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgVGh1bWJuYWlsIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSAgICAgOiBgJHtjbGFpbU5hbWV9LXRodW1iYCxcbiAgICAgIGZpbGVfcGF0aDogdGh1bWJuYWlsRmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgdGl0bGUgICAgICA6IGAke2NsYWltTmFtZX0gdGh1bWJuYWlsYCxcbiAgICAgICAgZGVzY3JpcHRpb246IGBhIHRodW1ibmFpbCBmb3IgJHtjbGFpbU5hbWV9YCxcbiAgICAgICAgYXV0aG9yICAgICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlICAgOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICAgIGNoYW5uZWxfbmFtZSA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxfaWQgICA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbElkLFxuICAgIH07XG4gIH0sXG4gIGRlbGV0ZVRlbXBvcmFyeUZpbGUgKGZpbGVQYXRoKSB7XG4gICAgZnMudW5saW5rKGZpbGVQYXRoLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYGVycm9yIGRlbGV0aW5nIHRlbXBvcmFyeSBmaWxlICR7ZmlsZVBhdGh9YCk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1Zyhgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQgJHtmaWxlUGF0aH1gKTtcbiAgICB9KTtcbiAgfSxcbiAgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEgKGZpbGVJbmZvLCBnZXRSZXN1bHQpIHtcbiAgICBmaWxlSW5mby5maWxlTmFtZSA9IGdldFJlc3VsdC5maWxlX25hbWU7XG4gICAgZmlsZUluZm8uZmlsZVBhdGggPSBnZXRSZXN1bHQuZG93bmxvYWRfcGF0aDtcbiAgICByZXR1cm4gZmlsZUluZm87XG4gIH0sXG4gIGNyZWF0ZUZpbGVEYXRhICh7IG5hbWUsIGNsYWltSWQsIG91dHBvaW50LCBoZWlnaHQsIGFkZHJlc3MsIG5zZncsIGNvbnRlbnRUeXBlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGNsYWltSWQsXG4gICAgICBvdXRwb2ludCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGFkZHJlc3MsXG4gICAgICBmaWxlTmFtZTogJycsXG4gICAgICBmaWxlUGF0aDogJycsXG4gICAgICBmaWxlVHlwZTogY29udGVudFR5cGUsXG4gICAgICBuc2Z3LFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTG9nZ2VkSW5DaGFubmVsIChuYW1lLCBzaG9ydElkLCBsb25nSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICBzaG9ydElkLFxuICAgICAgbG9uZ0lkLFxuICAgIH0sXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhcic7XG5pbXBvcnQgSW5hY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhcic7XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiYXJzICAgICAgIDogW10sXG4gICAgICBpbmRleCAgICAgIDogMCxcbiAgICAgIGluY3JlbWVudGVyOiAxLFxuICAgIH07XG4gICAgdGhpcy5jcmVhdGVCYXJzID0gdGhpcy5jcmVhdGVCYXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyID0gdGhpcy5zdGFydFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhciA9IHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhciA9IHRoaXMuc3RvcFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuY3JlYXRlQmFycygpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNyZWF0ZUJhcnMgKCkge1xuICAgIGNvbnN0IGJhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnByb3BzLnNpemU7IGkrKykge1xuICAgICAgYmFycy5wdXNoKHtpc0FjdGl2ZTogZmFsc2V9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGJhcnMgfSk7XG4gIH1cbiAgc3RhcnRQcm9ncmVzc0JhciAoKSB7XG4gICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKSwgMzAwKTtcbiAgfTtcbiAgdXBkYXRlUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuaW5kZXg7XG4gICAgbGV0IGluY3JlbWVudGVyID0gdGhpcy5zdGF0ZS5pbmNyZW1lbnRlcjtcbiAgICBsZXQgYmFycyA9IHRoaXMuc3RhdGUuYmFycztcbiAgICAvLyBmbGlwIGluY3JlbWVudGVyIGlmIG5lY2Vzc2FyeSwgdG8gc3RheSBpbiBib3VuZHNcbiAgICBpZiAoKGluZGV4IDwgMCkgfHwgKGluZGV4ID4gdGhpcy5wcm9wcy5zaXplKSkge1xuICAgICAgaW5jcmVtZW50ZXIgPSBpbmNyZW1lbnRlciAqIC0xO1xuICAgICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB0aGUgaW5kZXhlZCBiYXJcbiAgICBpZiAoaW5jcmVtZW50ZXIgPiAwKSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgICAvLyBpbmNyZW1lbnQgaW5kZXhcbiAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGJhcnMsXG4gICAgICBpbmNyZW1lbnRlcixcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuICBzdG9wUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gIH07XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnN0YXRlLmJhcnMubWFwKChiYXIsIGluZGV4KSA9PiBiYXIuaXNBY3RpdmUgPyA8QWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9IC8+IDogPEluYWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9Lz4pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuUHJvZ3Jlc3NCYXIucHJvcFR5cGVzID0ge1xuICBzaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5cbmNsYXNzIEVycm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8cD57ZXJyb3J9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbkVycm9yUGFnZS5wcm9wVHlwZXMgPSB7XG4gIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvclBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvRXJyb3JQYWdlL2luZGV4LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUmVkdWNlciBmcm9tICdjbGllbnQvcmVkdWNlcnMnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJ2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvJztcbmltcG9ydCBBcHAgZnJvbSAnY2xpZW50L2FwcCc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZS5qcyc7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoUmVkdWNlcik7XG5cbiAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgPEFwcCAvPlxuICAgICAgICA8L0dBTGlzdGVuZXI+XG4gICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xuXG4gIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgY29uc3QgaGVsbWV0ID0gSGVsbWV0LnJlbmRlclN0YXRpYygpO1xuXG4gIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gIGlmIChjb250ZXh0LnVybCkge1xuICAgIC8vIFNvbWV3aGVyZSBhIGA8UmVkaXJlY3Q+YCB3YXMgcmVuZGVyZWRcbiAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICB9IGVsc2Uge1xuICAgIC8vIHdlJ3JlIGdvb2QsIHNlbmQgdGhlIHJlc3BvbnNlXG4gIH1cblxuICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgY29uc3QgcHJlbG9hZGVkU3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCJcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBQdWJsaXNoUmVkdWNlciBmcm9tICdyZWR1Y2Vycy9wdWJsaXNoJztcbmltcG9ydCBDaGFubmVsUmVkdWNlciBmcm9tICdyZWR1Y2Vycy9jaGFubmVsJztcbmltcG9ydCBTaG93UmVkdWNlciBmcm9tICdyZWR1Y2Vycy9zaG93JztcbmltcG9ydCBTaXRlUmVkdWNlciBmcm9tICdyZWR1Y2Vycy9zaXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgY2hhbm5lbDogQ2hhbm5lbFJlZHVjZXIsXG4gIHB1Ymxpc2g6IFB1Ymxpc2hSZWR1Y2VyLFxuICBzaG93ICAgOiBTaG93UmVkdWNlcixcbiAgc2l0ZSAgIDogU2l0ZVJlZHVjZXIsXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBGSUxFX1NFTEVDVEVEID0gJ0ZJTEVfU0VMRUNURUQnO1xuZXhwb3J0IGNvbnN0IEZJTEVfQ0xFQVIgPSAnRklMRV9DTEVBUic7XG5leHBvcnQgY29uc3QgTUVUQURBVEFfVVBEQVRFID0gJ01FVEFEQVRBX1VQREFURSc7XG5leHBvcnQgY29uc3QgQ0xBSU1fVVBEQVRFID0gJ0NMQUlNX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCA9ICdTRVRfUFVCTElTSF9JTl9DSEFOTkVMJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVRVU19VUERBVEUgPSAnUFVCTElTSF9TVEFUVVNfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBFUlJPUl9VUERBVEUgPSAnRVJST1JfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBTRUxFQ1RFRF9DSEFOTkVMX1VQREFURSA9ICdTRUxFQ1RFRF9DSEFOTkVMX1VQREFURSc7XG5leHBvcnQgY29uc3QgVE9HR0xFX01FVEFEQVRBX0lOUFVUUyA9ICdUT0dHTEVfTUVUQURBVEFfSU5QVVRTJztcbmV4cG9ydCBjb25zdCBUSFVNQk5BSUxfTkVXID0gJ1RIVU1CTkFJTF9ORVcnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hfU1RBUlQgPSAnUFVCTElTSF9TVEFSVCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPR0lOID0gJ0V4aXN0aW5nJztcbmV4cG9ydCBjb25zdCBDUkVBVEUgPSAnTmV3JztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMuanMiLCJleHBvcnQgY29uc3QgQ0hBTk5FTF9VUERBVEUgPSAnQ0hBTk5FTF9VUERBVEUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBMT0NBTF9DSEVDSyA9ICdMT0NBTF9DSEVDSyc7XG5leHBvcnQgY29uc3QgVU5BVkFJTEFCTEUgPSAnVU5BVkFJTEFCTEUnO1xuZXhwb3J0IGNvbnN0IEVSUk9SID0gJ0VSUk9SJztcbmV4cG9ydCBjb25zdCBBVkFJTEFCTEUgPSAnQVZBSUxBQkxFJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdvb2dsZUFuYWx5dGljcyBmcm9tICdyZWFjdC1nYSc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5jb25zdCB7IGFuYWx5dGljczogeyBnb29nbGVJZCB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbkdvb2dsZUFuYWx5dGljcy5pbml0aWFsaXplKGdvb2dsZUlkKTtcblxuY2xhc3MgR0FMaXN0ZW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnNlbmRQYWdlVmlldyh0aGlzLnByb3BzLmhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5saXN0ZW4odGhpcy5zZW5kUGFnZVZpZXcpO1xuICB9XG5cbiAgc2VuZFBhZ2VWaWV3IChsb2NhdGlvbikge1xuICAgIEdvb2dsZUFuYWx5dGljcy5zZXQoeyBwYWdlOiBsb2NhdGlvbi5wYXRobmFtZSB9KTtcbiAgICBHb29nbGVBbmFseXRpY3MucGFnZXZpZXcobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEdBTGlzdGVuZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEhvbWVQYWdlIGZyb20gJ3BhZ2VzL0hvbWVQYWdlJztcbmltcG9ydCBBYm91dFBhZ2UgZnJvbSAncGFnZXMvQWJvdXRQYWdlJztcbmltcG9ydCBMb2dpblBhZ2UgZnJvbSAncGFnZXMvTG9naW5QYWdlJztcbmltcG9ydCBTaG93UGFnZSBmcm9tICdwYWdlcy9TaG93UGFnZSc7XG5pbXBvcnQgRm91ck9oRm91clBhZ2UgZnJvbSAnY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZSc7XG4vLyBpbXBvcnQgeyBkeW5hbWljSW1wb3J0IH0gZnJvbSAndXRpbHMvZHluYW1pY0ltcG9ydCc7XG4vLyBjb25zdCBIb21lUGFnZSA9IGR5bmFtaWNJbXBvcnQoJ3BhZ2VzL0hvbWVQYWdlJyk7IC8vIG9yIHVzZSB0aGUgcHJvdmlkZWQgbG9jYWwgaG9tZXBhZ2VcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTd2l0Y2g+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXtIb21lUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvYWJvdXQnIGNvbXBvbmVudD17QWJvdXRQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9sb2dpbicgY29tcG9uZW50PXtMb2dpblBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzppZGVudGlmaWVyLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGNvbXBvbmVudD17Rm91ck9oRm91clBhZ2V9IC8+XG4gICAgPC9Td2l0Y2g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBwLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHNlbGVjdEZpbGUsIHVwZGF0ZUVycm9yLCBjbGVhckZpbGUgfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZSAgICAgOiBwdWJsaXNoLmZpbGUsXG4gICAgdGh1bWJuYWlsOiBwdWJsaXNoLnRodW1ibmFpbCxcbiAgICBmaWxlRXJyb3I6IHB1Ymxpc2guZXJyb3IuZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RGaWxlOiAoZmlsZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goc2VsZWN0RmlsZShmaWxlKSk7XG4gICAgfSxcbiAgICBzZXRGaWxlRXJyb3I6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goY2xlYXJGaWxlKCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2ZpbGUnLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJy4uLy4uL2FjdGlvbnMvcHVibGlzaCc7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IENIQU5ORUwgPSAnQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgQVNTRVRfTElURSA9ICdBU1NFVF9MSVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9ERVRBSUxTID0gJ0FTU0VUX0RFVEFJTFMnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IGZpbGVSZXF1ZXN0ZWQgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgZXJyb3IgYW5kIHN0YXR1c1xuICBjb25zdCBlcnJvciAgPSBzaG93LmRpc3BsYXlBc3NldC5lcnJvcjtcbiAgY29uc3Qgc3RhdHVzID0gc2hvdy5kaXNwbGF5QXNzZXQuc3RhdHVzO1xuICAvLyBzZWxlY3QgYXNzZXRcbiAgY29uc3QgYXNzZXQgPSBzZWxlY3RBc3NldChzaG93KTtcbiAgLy8gIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGVycm9yLFxuICAgIHN0YXR1cyxcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkZpbGVSZXF1ZXN0OiAobmFtZSwgY2xhaW1JZCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmlsZVJlcXVlc3RlZChuYW1lLCBjbGFpbUlkKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkgPT4ge1xuICAvLyB0YWtlIHRoZSBodG1sIGFuZCBwcmVsb2FkZWRTdGF0ZSBhbmQgcmV0dXJuIHRoZSBmdWxsIHBhZ2VcbiAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIiBwcmVmaXg9XCJvZzogaHR0cDovL29ncC5tZS9ucyMgZmI6IGh0dHA6Ly9vZ3AubWUvbnMvZmIjXCI+XG4gICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCI+XG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vXCI+XG4gICAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cImllPWVkZ2VcIj5cbiAgICAgICAgICAgIDwhLS1oZWxtZXQtLT5cbiAgICAgICAgICAgICR7aGVsbWV0LnRpdGxlLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5tZXRhLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICAke2hlbG1ldC5saW5rLnRvU3RyaW5nKCl9XG4gICAgICAgICAgICA8IS0tc3R5bGUgc2hlZXRzLS0+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL3Jlc2V0LmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9nZW5lcmFsLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9tZWRpYVF1ZXJpZXMuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8IS0tZ29vZ2xlIGZvbnQtLT5cbiAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMFwiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgICAgPC9oZWFkPlxuICAgICAgICA8Ym9keSBpZD1cIm1haW4tYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyZWFjdC1hcHBcIiBjbGFzcz1cInJvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtblwiPiR7aHRtbH08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNjcmlwdD5cbiAgICAgICAgICAgICAgICB3aW5kb3cuX19QUkVMT0FERURfU1RBVEVfXyA9ICR7SlNPTi5zdHJpbmdpZnkocHJlbG9hZGVkU3RhdGUpLnJlcGxhY2UoLzwvZywgJ1xcXFxcXHUwMDNjJyl9XG4gICAgICAgICAgICA8L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL2J1bmRsZS9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZ2V0Q2xhaW1JZCwgZ2V0TG9jYWxGaWxlUmVjb3JkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnLi9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcbmNvbnN0IFNIT1cgPSAnU0hPVyc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxuZnVuY3Rpb24gY2xpZW50QWNjZXB0c0h0bWwgKHthY2NlcHR9KSB7XG4gIHJldHVybiBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdElzRnJvbUJyb3dzZXIgKGhlYWRlcnMpIHtcbiAgcmV0dXJuIGhlYWRlcnNbJ3VzZXItYWdlbnQnXSAmJiBoZWFkZXJzWyd1c2VyLWFnZW50J10ubWF0Y2goL01vemlsbGEvKTtcbn07XG5cbmZ1bmN0aW9uIGNsaWVudFdhbnRzQXNzZXQgKHthY2NlcHQsIHJhbmdlfSkge1xuICBjb25zdCBpbWFnZUlzV2FudGVkID0gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvaW1hZ2VcXC8uKi8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL1xcKi8pO1xuICBjb25zdCB2aWRlb0lzV2FudGVkID0gYWNjZXB0ICYmIHJhbmdlO1xuICByZXR1cm4gaW1hZ2VJc1dhbnRlZCB8fCB2aWRlb0lzV2FudGVkO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZENsYWltSWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuICgoY2xhaW1JZC5sZW5ndGggPT09IDQwKSAmJiAhL1teQS1aYS16MC05XS9nLnRlc3QoY2xhaW1JZCkpO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuIGNsYWltSWQubGVuZ3RoID09PSAxOyAgLy8gaXQgc2hvdWxkIHJlYWxseSBldmFsdWF0ZSB0aGUgc2hvcnQgdXJsIGl0c2VsZlxufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWRPckNsYWltSWQgKGlucHV0KSB7XG4gIHJldHVybiAoaXNWYWxpZENsYWltSWQoaW5wdXQpIHx8IGlzVmFsaWRTaG9ydElkKGlucHV0KSk7XG59O1xuXG5mdW5jdGlvbiBzZXJ2ZUFzc2V0VG9DbGllbnQgKGNsYWltSWQsIG5hbWUsIHJlcykge1xuICByZXR1cm4gZ2V0TG9jYWxGaWxlUmVjb3JkKGNsYWltSWQsIG5hbWUpXG4gICAgLnRoZW4oZmlsZVJlY29yZCA9PiB7XG4gICAgICAvLyBjaGVjayB0aGF0IGEgbG9jYWwgcmVjb3JkIHdhcyBmb3VuZFxuICAgICAgaWYgKGZpbGVSZWNvcmQgPT09IE5PX0ZJTEUpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMzA3KS5yZWRpcmVjdChgL2FwaS9jbGFpbS9nZXQvJHtuYW1lfS8ke2NsYWltSWR9YCk7XG4gICAgICB9XG4gICAgICAvLyBzZXJ2ZSB0aGUgZmlsZVxuICAgICAgY29uc3Qge2ZpbGVQYXRoLCBmaWxlVHlwZX0gPSBmaWxlUmVjb3JkO1xuICAgICAgbG9nZ2VyLnZlcmJvc2UoYHNlcnZpbmcgZmlsZTogJHtmaWxlUGF0aH1gKTtcbiAgICAgIGNvbnN0IHNlbmRGaWxlT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnICAgICAgICAgIDogZmlsZVR5cGUgfHwgJ2ltYWdlL2pwZWcnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kRmlsZShmaWxlUGF0aCwgc2VuZEZpbGVPcHRpb25zKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKSB7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oZnVsbENsYWltSWQgPT4ge1xuICAgICAgICBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9IGVsc2UgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNoYW5uZWwgaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmVBc3NldFRvQ2xpZW50KGZ1bGxDbGFpbUlkLCBjbGFpbU5hbWUsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnc3VjY2VzcycpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdmYWlsJyk7XG4gICAgICB9KTtcbiAgfSxcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIChoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlVHlwZTtcbiAgICBpZiAoaGFzRmlsZUV4dGVuc2lvbikge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7ICAvLyBhc3N1bWUgYSBzZXJ2ZSByZXF1ZXN0IGlmIGZpbGUgZXh0ZW5zaW9uIGlzIHByZXNlbnRcbiAgICAgIGlmIChjbGllbnRBY2NlcHRzSHRtbChoZWFkZXJzKSkgeyAgLy8gaWYgdGhlIHJlcXVlc3QgY29tZXMgZnJvbSBhIGJyb3dzZXIsIGNoYW5nZSBpdCB0byBhIHNob3cgcmVxdWVzdFxuICAgICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgaWYgKGNsaWVudFdhbnRzQXNzZXQoaGVhZGVycykgJiYgcmVxdWVzdElzRnJvbUJyb3dzZXIoaGVhZGVycykpIHsgIC8vIHRoaXMgaXMgaW4gY2FzZSBzb21lb25lIGVtYmVkcyBhIHNob3cgdXJsXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnU2hvdyByZXF1ZXN0IGNhbWUgZnJvbSBicm93c2VyIGJ1dCB3YW50cyBhbiBpbWFnZS92aWRlby4gQ2hhbmdpbmcgcmVzcG9uc2UgdG8gc2VydmUuLi4nKTtcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZVR5cGU7XG4gIH0sXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkgKGlkZW50aWZpZXIsIG5hbWUpIHtcbiAgICAvLyB0aGlzIGlzIGEgcGF0Y2ggZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5IHdpdGggJy9uYW1lL2NsYWltX2lkJyB1cmwgZm9ybWF0XG4gICAgaWYgKGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKG5hbWUpICYmICFpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChpZGVudGlmaWVyKSkge1xuICAgICAgY29uc3QgdGVtcE5hbWUgPSBuYW1lO1xuICAgICAgbmFtZSA9IGlkZW50aWZpZXI7XG4gICAgICBpZGVudGlmaWVyID0gdGVtcE5hbWU7XG4gICAgfVxuICAgIHJldHVybiBbaWRlbnRpZmllciwgbmFtZV07XG4gIH0sXG4gIGxvZ1JlcXVlc3REYXRhIChyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3Jlc3BvbnNlVHlwZSA9PT0nLCByZXNwb25zZVR5cGUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gbmFtZSA9PT0gJywgY2xhaW1OYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgbmFtZSA9PT0nLCBjaGFubmVsTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBpZCA9PT0nLCBjbGFpbUlkKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgaWRlbnRpZmllcjonLCBpZGVudGlmaWVyKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7dmFsdWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgdXJsLiAgTm8gY2hhbm5lbCBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgaXNDaGFubmVsID0gdmFsdWUuc3RhcnRzV2l0aChtb2R1bGUuZXhwb3J0cy5DSEFOTkVMX0NIQVIpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gaXNDaGFubmVsID8gdmFsdWUgOiBudWxsO1xuICAgIGxldCBjbGFpbUlkO1xuICAgIGlmIChpc0NoYW5uZWwpIHtcbiAgICAgIGlmICghY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsIG5hbWUgYWZ0ZXIgQC4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjaGFubmVsTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCk7XG4gICAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYWltSWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBjaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbUlkLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBuYW1lOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghY2xhaW1OYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIC4nKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNsYWltTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0xBSU0pO1xuICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciAke21vZGlmaWVyU2VwZXJhdG9yfS5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7bW9kaWZpZXJTZXBlcmF0b3J9IG1vZGlmaWVyIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWVgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgY2xhaW1OYW1lLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlTW9kaWZpZXI6IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBtb2RpZmllcjonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uID0gZmFsc2U7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24sXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnLi4vLi4vY2xpZW50L3JlZHVjZXJzL2luZGV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICcuLi8uLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4JztcbmltcG9ydCBBcHAgZnJvbSAnLi4vLi4vY2xpZW50L2FwcCc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZSc7XG5pbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUgZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBjYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7IGhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnLi4vLi4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpJztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvYWN0aW9ucy9zaG93JztcblxuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jb25zdCByZXR1cm5TYWdhV2l0aFBhcmFtcyA9IChzYWdhLCBwYXJhbXMpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uICogKCkge1xuICAgIHlpZWxkIGNhbGwoc2FnYSwgcGFyYW1zKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3JlYXRlIGFuZCBhcHBseSBtaWRkbGV3YXJlXG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgY29uc3QgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZShzYWdhTWlkZGxld2FyZSk7XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoUmVkdWNlciwgbWlkZGxld2FyZSk7XG5cbiAgLy8gY3JlYXRlIHNhZ2FcbiAgY29uc3QgYWN0aW9uID0gb25IYW5kbGVTaG93UGFnZVVyaShyZXEucGFyYW1zKTtcbiAgY29uc3Qgc2FnYSA9IHJldHVyblNhZ2FXaXRoUGFyYW1zKGhhbmRsZVNob3dQYWdlVXJpLCBhY3Rpb24pO1xuXG4gIC8vIHJ1biB0aGUgc2FnYSBtaWRkbGV3YXJlXG4gIHNhZ2FNaWRkbGV3YXJlXG4gICAgLnJ1bihzYWdhKVxuICAgIC5kb25lXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICAgICAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgICAgICA8QXBwIC8+XG4gICAgICAgICAgICA8L0dBTGlzdGVuZXI+XG4gICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICApO1xuXG4gICAgICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gICAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgICAgIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gICAgICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gICAgICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICAgIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gICAgICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG4gICAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJleHBvcnQgY29uc3Qgc2VsZWN0U2l0ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFNpdGVIb3N0ID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlLmhvc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NlbGVjdG9ycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGF0d2ctZmV0Y2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIlxuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VydmVyID0gcmVxdWlyZSgnLi9zZXJ2ZXInKTtcblxuY29uc3QgZXhwb3J0cyA9IHtcbiAgU2VydmVyLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3BlZWNoLmpzIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IGNvb2tpZVNlc3Npb24gPSByZXF1aXJlKCdjb29raWUtc2Vzc2lvbicpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSByZXF1aXJlKCdtaWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMnKTtcblxuY29uc3QgbG9nZ2VyQ29uZmlnID0gcmVxdWlyZSgnbG9nZ2VyQ29uZmlnLmpzJyk7XG5jb25zdCBteXNxbENvbmZpZyA9IHJlcXVpcmUoJ215c3FsQ29uZmlnLmpzJyk7XG5jb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuY29uc3Qgc2xhY2tDb25maWcgPSByZXF1aXJlKCdzbGFja0NvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBTZXJ2ZXIgKCkge1xuICB0aGlzLmNvbmZpZ3VyZUxvZ2dlciA9ICh1c2VyQ29uZmlnKSA9PiB7XG4gICAgbG9nZ2VyQ29uZmlnLnVwZGF0ZSh1c2VyQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVNeXNxbCA9ICh1c2VyQ29uZmlnKSA9PiB7XG4gICAgbXlzcWxDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNpdGVEZXRhaWxzID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBzaXRlQ29uZmlnLnVwZGF0ZSh1c2VyQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTbGFjayA9ICh1c2VyQ29uZmlnKSA9PiB7XG4gICAgc2xhY2tDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZUNsaWVudEJ1bmRsZSA9ICgpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2NvbmZpZ3VyZSB0aGUgY2xpZW50IGhlcmUgYnkgcGFzc2luZyBpbiB0aGUgYnVuZGxlIGFuZCBjb25maWd1cmluZyBpdCwgb3IgYmV0dGVyIHlldDogdGFraW5nIGluIHRoZSBjb21wb25lbnRzIHRvIHVzZSBkeW5hbWljYWxseSBmcm9tIGhlcmUuJyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlTW9kZWxzID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCBtb2RlbHMnKVxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVJvdXRlcyA9ICgpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2hlcmUgaXMgd2hlcmUgeW91IGNvdWxkIGFkZC9vdmVyd3JpdGUgdGhlIGRlZmF1bHQgcm91dGVzJylcbiAgfTtcbiAgdGhpcy5jcmVhdGVBcHAgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGFuIEV4cHJlc3MgYXBwbGljYXRpb25cbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbiAgICAvLyB0cnVzdCB0aGUgcHJveHkgdG8gZ2V0IGlwIGFkZHJlc3MgZm9yIHVzXG4gICAgYXBwLmVuYWJsZSgndHJ1c3QgcHJveHknKTtcblxuICAgIC8vIGFkZCBtaWRkbGV3YXJlXG4gICAgYXBwLnVzZShoZWxtZXQoKSk7IC8vIHNldCBIVFRQIGhlYWRlcnMgdG8gcHJvdGVjdCBhZ2FpbnN0IHdlbGwta25vd24gd2ViIHZ1bG5lcmFiaWx0aWVzXG4gICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhgJHtfX2Rpcm5hbWV9L3B1YmxpY2ApKTsgLy8gJ2V4cHJlc3Muc3RhdGljJyB0byBzZXJ2ZSBzdGF0aWMgZmlsZXMgZnJvbSBwdWJsaWMgZGlyZWN0b3J5XG4gICAgLy8gbm90ZTogdGFrZSBpbiBhIGRpZmZlcmVudCBwdWJsaWMgZm9sZGVyLCBzbyBpdCBjYW4gc2VydmUgaXQncyBvd24gYnVuZGxlIGZyb20gdGhlcmU/XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7IC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24vanNvblxuICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpOyAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuXG4gICAgLy8gYWRkIGN1c3RvbSBtaWRkbGV3YXJlIChub3RlOiBidWlsZCBvdXQgdG8gYWNjZXB0IGR5bmFtaWNhbGx5IHVzZSB3aGF0IGlzIGluIHNlcnZlci9taWRkbGV3YXJlL1xuICAgIGFwcC51c2UocmVxdWVzdExvZ2dlcik7XG5cbiAgICAvLyBjb25maWd1cmUgcGFzc3BvcnRcbiAgICBjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG4gICAgLy8gaW5pdGlhbGl6ZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNlc3Npb25LZXkgPSBzaXRlQ29uZmlnLmF1dGguc2Vzc2lvbktleTtcbiAgICBhcHAudXNlKGNvb2tpZVNlc3Npb24oe1xuICAgICAgbmFtZSAgOiAnc2Vzc2lvbicsXG4gICAgICBrZXlzICA6IFtzZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShzcGVlY2hQYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2VzLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXNzZXRzLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvZmFsbGJhY2svJykoYXBwKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9O1xuICB0aGlzLmluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgdGhpcy5jcmVhdGVBcHAoKTtcbiAgICB0aGlzLnNlcnZlciA9IGh0dHAuU2VydmVyKHRoaXMuYXBwKTtcbiAgfTtcbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuICAgIGNvbnN0IFBPUlQgPSBzaXRlQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgICAvLyBzeW5jIHNlcXVlbGl6ZVxuICAgIGRiLnNlcXVlbGl6ZS5zeW5jKClcbiAgICAvLyBzdGFydCB0aGUgc2VydmVyXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VydmVyLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZlciBpcyBsaXN0ZW5pbmcgb24gUE9SVCAke1BPUlR9YCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBTdGFydHVwIEVycm9yOmAsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtaGFuZGxlYmFyc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXNlc3Npb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cFwiXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSAocmVxLCByZXMsIG5leHQpID0+IHsgIC8vIGN1c3RvbSBsb2dnaW5nIG1pZGRsZXdhcmUgdG8gbG9nIGFsbCBpbmNvbWluZyBodHRwIHJlcXVlc3RzXG4gIGxvZ2dlci52ZXJib3NlKGBSZXF1ZXN0IG9uICR7cmVxLm9yaWdpbmFsVXJsfSBmcm9tICR7cmVxLmlwfWApO1xuICBuZXh0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3RMb2dnZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbWlkZGxld2FyZS9yZXF1ZXN0TG9nZ2VyLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBMb2dnZXJDb25maWcgKCkge1xuICB0aGlzLmxvZ0xldmVsID0gJ2RlYnVnJztcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBsb2dnZXIud2FybignTm8gbG9nZ2VyIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIHdpbnN0b24gbG9nZ2VyLi4uJyk7XG4gICAgLy8gdXBkYXRlIHZhbHVlcyB3aXRoIGxvY2FsIGNvbmZpZyBwYXJhbXNcbiAgICBjb25zdCB7bG9nTGV2ZWx9ID0gY29uZmlnO1xuICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcbiAgICAvLyBjb25maWd1cmUgdGhlIHdpbnN0b24gbG9nZ2VyXG4gICAgbG9nZ2VyLmNvbmZpZ3VyZSh7XG4gICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgIG5ldyAobG9nZ2VyLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubG9nTGV2ZWwsXG4gICAgICAgICAgdGltZXN0YW1wICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBwcmV0dHlQcmludCAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnMgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIC8vIHRlc3QgYWxsIHRoZSBsb2cgbGV2ZWxzXG4gICAgbG9nZ2VyLmluZm8oJ3Rlc3Rpbmcgd2luc3RvbiBsb2cgbGV2ZWxzLi4uJyk7XG4gICAgbG9nZ2VyLmVycm9yKCdMZXZlbCAwJyk7XG4gICAgbG9nZ2VyLndhcm4oJ0xldmVsIDEnKTtcbiAgICBsb2dnZXIuaW5mbygnTGV2ZWwgMicpO1xuICAgIGxvZ2dlci52ZXJib3NlKCdMZXZlbCAzJyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdMZXZlbCA0Jyk7XG4gICAgbG9nZ2VyLnNpbGx5KCdMZXZlbCA1Jyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb2dnZXJDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJjb25zdCB3aW5zdG9uU2xhY2tXZWJIb29rID0gcmVxdWlyZSgnd2luc3Rvbi1zbGFjay13ZWJob29rJykuU2xhY2tXZWJIb29rO1xuY29uc3Qgd2luc3RvbiA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU2xhY2tDb25maWcgKCkge1xuICB0aGlzLnNsYWNrV2ViSG9vayAgICAgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIHdpbnN0b24ud2FybignTm8gc2xhY2sgY29uZmlnIHJlY2VpdmVkJyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB2YXJpYWJsZXNcbiAgICB3aW5zdG9uLmluZm8oJ2NvbmZpZ3VyaW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLnNsYWNrV2ViSG9vayA9IHNsYWNrV2ViSG9vaztcbiAgICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gc2xhY2tFcnJvckNoYW5uZWw7XG4gICAgdGhpcy5zbGFja0luZm9DaGFubmVsID0gc2xhY2tJbmZvQ2hhbm5lbDtcbiAgICAvLyB1cGRhdGUgc2xhY2sgd2ViaG9vayBzZXR0aW5nc1xuICAgIGlmICh0aGlzLnNsYWNrV2ViSG9vaykge1xuICAgICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICAgIGlmICh0aGlzLnNsYWNrRXJyb3JDaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2stZXJyb3JzLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ3dhcm4nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6ZmFjZV93aXRoX2hlYWRfYmFuZGFnZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBpZiAoc2xhY2tJbmZvQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWluZm8tdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnaW5mbycsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0luZm9DaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOm5lcmRfZmFjZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICAvLyBzZW5kIHRlc3QgbWVzc2FnZXNcbiAgICAgIHdpbnN0b24uaW5mbygndGVzdGluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICAgIHdpbnN0b24uZXJyb3IoJ1NsYWNrIFwiZXJyb3JcIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbnN0b24ud2FybignU2xhY2sgbG9nZ2luZyBpcyBub3QgZW5hYmxlZCBiZWNhdXNlIG5vIHNsYWNrV2ViSG9vayBjb25maWcgdmFyIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNsYWNrQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIlxuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydFwiXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBuZXcgY2hhbm5lbCBzaWdudXAgcmVxdWVzdC4gdXNlcjogJHt1c2VybmFtZX0gcGFzczogJHtwYXNzd29yZH0gLmApO1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIC8vIHNlcnZlci1zaWRlIHZhbGlkYXRvbiBvZiBpbnB1dHMgKHVzZXJuYW1lLCBwYXNzd29yZClcblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhbm5lbCBhbmQgcmV0cmlldmUgdGhlIG1ldGFkYXRhXG4gICAgcmV0dXJuIGxicnlBcGkuY3JlYXRlQ2hhbm5lbChgQCR7dXNlcm5hbWV9YClcbiAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgIHVzZXJOYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyRGF0YSA+JywgdXNlckRhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgY2hhbm5lbERhdGEgPSB7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIGNoYW5uZWxDbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NoYW5uZWxEYXRhID4nLCBjaGFubmVsRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSBjZXJ0aWZpY2F0ZSByZWNvcmRcbiAgICAgICAgY29uc3QgY2VydGlmaWNhdGVEYXRhID0ge1xuICAgICAgICAgIGNsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICAgIG5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIC8vIGFkZHJlc3MsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjZXJ0aWZpY2F0ZURhdGEgPicsIGNlcnRpZmljYXRlRGF0YSk7XG4gICAgICAgIC8vIHNhdmUgdXNlciBhbmQgY2VydGlmaWNhdGUgdG8gZGJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi5Vc2VyLmNyZWF0ZSh1c2VyRGF0YSksIGRiLkNoYW5uZWwuY3JlYXRlKGNoYW5uZWxEYXRhKSwgZGIuQ2VydGlmaWNhdGUuY3JlYXRlKGNlcnRpZmljYXRlRGF0YSldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoW25ld1VzZXIsIG5ld0NoYW5uZWwsIG5ld0NlcnRpZmljYXRlXSkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgLy8gc3RvcmUgdGhlIHJlbGV2YW50IG5ld1VzZXIgaW5mbyB0byBiZSBwYXNzZWQgYmFjayBmb3IgcmVxLlVzZXJcbiAgICAgICAgdXNlckluZm9bJ2lkJ10gPSBuZXdVc2VyLmlkO1xuICAgICAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IG5ld1VzZXIudXNlck5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gbmV3Q2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAvLyBhc3NvY2lhdGUgdGhlIGluc3RhbmNlc1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld0NlcnRpZmljYXRlLnNldENoYW5uZWwobmV3Q2hhbm5lbCksIG5ld0NoYW5uZWwuc2V0VXNlcihuZXdVc2VyKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHVzZXJJbmZvLmNoYW5uZWxDbGFpbUlkLCB1c2VySW5mby5jaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdzaWdudXAgZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gcmV0dXJucyB1c2VyIGRhdGEgdG8gYmUgc2VyaWFsaXplZCBpbnRvIHNlc3Npb25cbiAgICBjb25zb2xlLmxvZygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBjb25zb2xlLmxvZygnZGVzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbmNvbnN0IGhhbmRsZVNpZ251cFJlcXVlc3QgPSByZXF1aXJlKCcuL3NpZ251cCcpO1xuY29uc3QgaGFuZGxlTG9naW5SZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dpbicpO1xuY29uc3QgaGFuZGxlTG9nb3V0UmVxdWVzdCA9IHJlcXVpcmUoJy4vbG9nb3V0Jyk7XG5jb25zdCBoYW5kbGVVc2VyUmVxdWVzdCA9IHJlcXVpcmUoJy4vdXNlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLnBvc3QoJy9zaWdudXAnLCBzcGVlY2hQYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLXNpZ251cCcpLCBoYW5kbGVTaWdudXBSZXF1ZXN0KTtcbiAgYXBwLnBvc3QoJy9sb2dpbicsIGhhbmRsZUxvZ2luUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9sb2dvdXQnLCBoYW5kbGVMb2dvdXRSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3VzZXInLCBoYW5kbGVVc2VyUmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2luZGV4LmpzIiwiY29uc3Qgc2lnbnVwID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZ251cDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9zaWdudXAuanMiLCJjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG5cbmNvbnN0IGxvZ2luID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtbG9naW4nLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICB9XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcS5sb2dJbih1c2VyLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KShyZXEsIHJlcywgbmV4dCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ2luLmpzIiwiY29uc3QgbG9nb3V0ID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcS5sb2dvdXQoKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICd5b3Ugc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dvdXQuanMiLCJjb25zdCB1c2VyID0gKHJlcSwgcmVzKSA9PiB7XG4gIGlmIChyZXEudXNlcikge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEudXNlcn0pO1xuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbid9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1c2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3VzZXIuanMiLCJjb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9jaGFubmVsQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjaGFubmVsQ2xhaW1zID0gcmVxdWlyZSgnLi9jaGFubmVsQ2xhaW1zJyk7XG5jb25zdCBjaGFubmVsRGF0YSA9IHJlcXVpcmUoJy4vY2hhbm5lbERhdGEnKTtcbmNvbnN0IGNoYW5uZWxTaG9ydElkID0gcmVxdWlyZSgnLi9jaGFubmVsU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NsYWltQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjbGFpbURhdGEgPSByZXF1aXJlKCcuL2NsYWltRGF0YScpO1xuY29uc3QgY2xhaW1HZXQgPSByZXF1aXJlKCcuL2NsYWltR2V0Jyk7XG5jb25zdCBjbGFpbUxvbmdJZCA9IHJlcXVpcmUoJy4vY2xhaW1Mb25nSWQnKTtcbmNvbnN0IGNsYWltUHVibGlzaCA9IHJlcXVpcmUoJy4vY2xhaW1QdWJsaXNoJyk7XG5jb25zdCBjbGFpbVJlc29sdmUgPSByZXF1aXJlKCcuL2NsYWltUmVzb2x2ZScpO1xuY29uc3QgY2xhaW1TaG9ydElkID0gcmVxdWlyZSgnLi9jbGFpbVNob3J0SWQnKTtcbmNvbnN0IGNsYWltTGlzdCA9IHJlcXVpcmUoJy4vY2xhaW1MaXN0Jyk7XG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9maWxlQXZhaWxhYmlsaXR5Jyk7XG5cbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSByZXF1aXJlKCdoZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIGNoYW5uZWwgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjaGFubmVsQXZhaWxhYmlsaXR5KTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjaGFubmVsU2hvcnRJZCk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9kYXRhLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQnLCBjaGFubmVsRGF0YSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsIGNoYW5uZWxDbGFpbXMpO1xuICAvLyBjbGFpbSByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9saXN0LzpuYW1lJywgY2xhaW1MaXN0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9nZXQvOm5hbWUvOmNsYWltSWQnLCBjbGFpbUdldCk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LzpuYW1lJywgY2xhaW1BdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Jlc29sdmUvOm5hbWUvOmNsYWltSWQnLCBjbGFpbVJlc29sdmUpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9wdWJsaXNoJywgbXVsdGlwYXJ0TWlkZGxld2FyZSwgY2xhaW1QdWJsaXNoKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgY2xhaW1TaG9ydElkKTtcbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vbG9uZy1pZCcsIGNsYWltTG9uZ0lkKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9kYXRhLzpjbGFpbU5hbWUvOmNsYWltSWQnLCBjbGFpbURhdGEpO1xuICAvLyBmaWxlIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2ZpbGUvYXZhaWxhYmlsaXR5LzpuYW1lLzpjbGFpbUlkJywgZmlsZUF2YWlsYWJpbGl0eSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvaW5kZXguanMiLCJjb25zdCB7IGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYXZhaWxhYmxlTmFtZSk7XG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IGdldENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgYWxsIGNsYWltcyBmb3IgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQ2xhaW1zID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgZ2V0Q2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbENsYWltcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxDbGFpbXMuanMiLCJjb25zdCBDTEFJTVNfUEVSX1BBR0UgPSAxMjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNsYWltcywgcGFnZSkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbFBhZ2VzKGNsYWltcyk7XG4gICAgY29uc3QgcGFnaW5hdGlvblBhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRQYWdlRnJvbVF1ZXJ5KHBhZ2UpO1xuICAgIGNvbnN0IHZpZXdEYXRhID0ge1xuICAgICAgY2hhbm5lbE5hbWUgICAgICAgOiBjaGFubmVsTmFtZSxcbiAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1zICAgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5leHRyYWN0UGFnZUZyb21DbGFpbXMoY2xhaW1zLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICBwcmV2aW91c1BhZ2UgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVByZXZpb3VzUGFnZShwYWdpbmF0aW9uUGFnZSksXG4gICAgICBjdXJyZW50UGFnZSAgICAgICA6IHBhZ2luYXRpb25QYWdlLFxuICAgICAgbmV4dFBhZ2UgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVOZXh0UGFnZSh0b3RhbFBhZ2VzLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICB0b3RhbFBhZ2VzICAgICAgICA6IHRvdGFsUGFnZXMsXG4gICAgICB0b3RhbFJlc3VsdHMgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsQ2xhaW1zKGNsYWltcyksXG4gICAgfTtcbiAgICByZXR1cm4gdmlld0RhdGE7XG4gIH0sXG4gIGdldFBhZ2VGcm9tUXVlcnkgKHBhZ2UpIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIChjbGFpbXMsIHBhZ2VOdW1iZXIpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIFtdOyAgLy8gaWYgbm8gY2xhaW1zLCByZXR1cm4gdGhpcyBkZWZhdWx0XG4gICAgfVxuICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2xhaW1zIGlzIGFycmF5PycsIEFycmF5LmlzQXJyYXkoY2xhaW1zKSk7XG4gICAgLy8gbG9nZ2VyLmRlYnVnKGBwYWdlTnVtYmVyICR7cGFnZU51bWJlcn0gaXMgbnVtYmVyP2AsIE51bWJlci5pc0ludGVnZXIocGFnZU51bWJlcikpO1xuICAgIGNvbnN0IGNsYWltU3RhcnRJbmRleCA9IChwYWdlTnVtYmVyIC0gMSkgKiBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgY2xhaW1FbmRJbmRleCA9IGNsYWltU3RhcnRJbmRleCArIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBwYWdlT2ZDbGFpbXMgPSBjbGFpbXMuc2xpY2UoY2xhaW1TdGFydEluZGV4LCBjbGFpbUVuZEluZGV4KTtcbiAgICByZXR1cm4gcGFnZU9mQ2xhaW1zO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbFBhZ2VzIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvdGFsQ2xhaW1zID0gY2xhaW1zLmxlbmd0aDtcbiAgICAgIGlmICh0b3RhbENsYWltcyA8IENMQUlNU19QRVJfUEFHRSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZ1bGxQYWdlcyA9IE1hdGguZmxvb3IodG90YWxDbGFpbXMgLyBDTEFJTVNfUEVSX1BBR0UpO1xuICAgICAgY29uc3QgcmVtYWluZGVyID0gdG90YWxDbGFpbXMgJSBDTEFJTVNfUEVSX1BBR0U7XG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmdWxsUGFnZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVsbFBhZ2VzICsgMTtcbiAgICB9XG4gIH0sXG4gIGRldGVybWluZVByZXZpb3VzUGFnZSAoY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgLSAxO1xuICB9LFxuICBkZXRlcm1pbmVOZXh0UGFnZSAodG90YWxQYWdlcywgY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgKyAxO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbENsYWltcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY2xhaW1zLmxlbmd0aDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IHsgZ2V0Q2hhbm5lbERhdGEgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgZGF0YSBmb3IgYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxEYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gIGdldENoYW5uZWxEYXRhKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgMClcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsRGF0YTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxEYXRhLmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbnJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcblxuKi9cblxuY29uc3QgY2hhbm5lbFNob3J0SWRSb3V0ZSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oc2hvcnRJZCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsU2hvcnRJZFJvdXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbFNob3J0SWQuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgQ2hhbm5lbCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NoYW5uZWwnLFxuICAgIHtcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2hhbm5lbC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2hhbm5lbC5iZWxvbmdzVG8oZGIuVXNlcik7XG4gICAgQ2hhbm5lbC5oYXNPbmUoZGIuQ2VydGlmaWNhdGUpO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVsO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGFzc2V0RGVmYXVsdHM6IHsgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsIH0sIGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIChjb250ZW50VHlwZSkge1xuICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIHJldHVybiAnanBlZyc7XG4gICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgIHJldHVybiAncG5nJztcbiAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgcmV0dXJuICdnaWYnO1xuICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICByZXR1cm4gJ21wNCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5kZWJ1Zygnc2V0dGluZyB1bmtub3duIGZpbGUgdHlwZSBhcyBmaWxlIGV4dGVuc2lvbiBqcGVnJyk7XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUaHVtYm5haWwgKHN0b3JlZFRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCkge1xuICBpZiAoc3RvcmVkVGh1bWJuYWlsID09PSAnJykge1xuICAgIHJldHVybiBkZWZhdWx0VGh1bWJuYWlsO1xuICB9XG4gIHJldHVybiBzdG9yZWRUaHVtYm5haWw7XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhaW1EYXRhIChjbGFpbSkge1xuICAvLyBsb2dnZXIuZGVidWcoJ3ByZXBhcmluZyBjbGFpbSBkYXRhIGJhc2VkIG9uIHJlc29sdmVkIGRhdGE6JywgY2xhaW0pO1xuICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICBjbGFpbVsnaG9zdCddID0gaG9zdDtcbiAgcmV0dXJuIGNsYWltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENsYWltID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2xhaW0nLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlVXJsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbWV0YWRhdGFWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjb250ZW50VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzdHJlYW1WZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENsYWltLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDbGFpbS5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCBmb3IgJHtjbGFpbU5hbWV9IyR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0ocykgZm91bmQgd2l0aCB0aGF0IGNsYWltIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGNsYWltSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyBmb3IgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgICByYXcgIDogdHJ1ZSwgIC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb25seSBkYXRhLCBub3QgYW4gYXJyYXkgb2YgaW5zdGFuY2VzXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWxDbGFpbXNBcnJheSA9PiB7XG4gICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdjaGFubmVsY2xhaW1zYXJyYXkgbGVuZ3RoOicsIGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGNoYW5uZWxDbGFpbXNBcnJheS5mb3JFYWNoKGNsYWltID0+IHtcbiAgICAgICAgICAgICAgICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoY2hhbm5lbENsYWltc0FycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBmaW5kaW5nIGNsYWltIGlkIGZvciBjbGFpbSAke2NsYWltTmFtZX0gZnJvbSBjaGFubmVsICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSwgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaWQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGAke3Jlc3VsdC5sZW5ndGh9IHJlY29yZHMgZm91bmQgZm9yIFwiJHtjbGFpbU5hbWV9XCIgaW4gY2hhbm5lbCBcIiR7Y2hhbm5lbENsYWltSWR9XCJgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgc2hvcnRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke3Nob3J0SWR9JWAsXG4gICAgICAgICAgICB9fSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sICAvLyBub3RlOiBtYXliZSBoZWlnaHQgYW5kIGVmZmVjdGl2ZSBhbW91bnQgbmVlZCB0byBzd2l0Y2g/XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdsZW5ndGggb2YgcmVzdWx0JywgcmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmRhdGFWYWx1ZXMuY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLnZhbGlkYXRlTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NsYWltSWQoJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIGlmIChjbGFpbUlkICYmIChjbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNsYWltSWQgJiYgY2xhaW1JZC5sZW5ndGggPCA0MCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7ICAvLyBpZiBhIHNob3J0IGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUoY2xhaW1OYW1lKTsgIC8vIGlmIG5vIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIENsYWltLnJlc29sdmVDbGFpbSA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5yZXNvbHZlQ2xhaW06ICR7bmFtZX0gJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsYWltQXJyYXkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY2xhaW1BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYG1vcmUgdGhhbiBvbmUgcmVjb3JkIG1hdGNoZXMgJHtuYW1lfSMke2NsYWltSWR9IGluIGRiLkNsYWltYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDbGFpbTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBURVhUIH0pID0+IHtcbiAgY29uc3QgUmVxdWVzdCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1JlcXVlc3QnLFxuICAgIHtcbiAgICAgIGFjdGlvbjoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB1cmw6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaXBBZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIHR5cGUgICAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFJlcXVlc3QuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFJlcXVlc3QuYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUmVxdWVzdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IFVzZXIgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdVc2VyJyxcbiAgICB7XG4gICAgICB1c2VyTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFVzZXIuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFVzZXIuaGFzT25lKGRiLkNoYW5uZWwpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNvbXBhcmVQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAobmV3UGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaChuZXdQYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBjdXJyZW50IHBhc3N3b3JkIHdpdGggdGhlIG5ldyBoYXNoXG4gICAgICAgICAgdGhpc1xuICAgICAgICAgICAgLnVwZGF0ZSh7cGFzc3dvcmQ6IGhhc2h9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIHByZS1zYXZlIGhvb2sgbWV0aG9kIHRvIGhhc2ggdGhlIHVzZXIncyBwYXNzd29yZCBiZWZvcmUgdGhlIHVzZXIncyBpbmZvIGlzIHNhdmVkIHRvIHRoZSBkYi5cbiAgVXNlci5ob29rKCdiZWZvcmVDcmVhdGUnLCAodXNlciwgb3B0aW9ucykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnVXNlci5iZWZvcmVDcmVhdGUgaG9vay4uLicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgcGFzc3dvcmQgc3RyaW5nIHdpdGggdGhlIGhhc2ggcGFzc3dvcmQgdmFsdWVcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaDtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBVc2VyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1BdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUF2YWlsYWJpbGl0eS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHJldHVybiBkYXRhIGZvciBhIGNsYWltXG5cbiovXG5cbmNvbnN0IGNsYWltRGF0YSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjbGFpbU5hbWUgPSBwYXJhbXMuY2xhaW1OYW1lO1xuICBsZXQgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAudGhlbihjbGFpbUluZm8gPT4ge1xuICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIGNsYWltIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1EYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1EYXRhLmpzIiwiY29uc3QgeyBnZXRDbGFpbSB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhLCBjcmVhdGVGaWxlRGF0YSB9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1HZXQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIC8vIHJlc29sdmUgdGhlIGNsYWltXG4gIGRiLkNsYWltLnJlc29sdmVDbGFpbShuYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgLy8gbWFrZSBzdXJlIGEgY2xhaW0gYWN0dWFsbHkgZXhpc3RzIGF0IHRoYXQgdXJpXG4gICAgICBpZiAoIXJlc29sdmVSZXN1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgIH1cbiAgICAgIGxldCBmaWxlRGF0YSA9IGNyZWF0ZUZpbGVEYXRhKHJlc29sdmVSZXN1bHQpO1xuICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlRGF0YSwgZ2V0Q2xhaW0oYCR7bmFtZX0jJHtjbGFpbUlkfWApXSk7XG4gICAgfSlcbiAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgIGZpbGVEYXRhID0gYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEoZmlsZURhdGEsIGdldFJlc3VsdCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlRGF0YSwge25hbWUsIGNsYWltSWR9LCAnRmlsZScpLCBnZXRSZXN1bHRdKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVSZWNvcmQsIHttZXNzYWdlLCBjb21wbGV0ZWR9IF0pID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZSwgY29tcGxldGVkIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1HZXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1JZCB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIGxvbmcgY2xhaW0gaWRcblxuKi9cblxuY29uc3QgY2xhaW1Mb25nSWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICBjb25zdCBjaGFubmVsQ2xhaW1JZCA9IGJvZHkuY2hhbm5lbENsYWltSWQ7XG4gIGNvbnN0IGNsYWltTmFtZSA9IGJvZHkuY2xhaW1OYW1lO1xuICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1Mb25nSWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsImNvbnN0IHsgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zLCBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zLCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSwgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIH0gPSByZXF1aXJlKCdoZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlLCBwdWJsaXNoIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCdhdXRoL2F1dGhlbnRpY2F0aW9uLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBwdWJsaXNoIGEgY2xhaW0gdGhyb3VnaCB0aGUgZGFlbW9uXG5cbiovXG5cbmNvbnN0IGNsYWltUHVibGlzaCA9ICh7IGJvZHksIGZpbGVzLCBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHVzZXIgfSwgcmVzKSA9PiB7XG4gIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgbGV0ICBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIGRlc2NyaXB0aW9uLCBmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgbGljZW5zZSwgbmFtZSwgbnNmdywgdGh1bWJuYWlsLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlLCB0aXRsZTtcbiAgLy8gcmVjb3JkIHRoZSBzdGFydCB0aW1lIG9mIHRoZSByZXF1ZXN0XG4gIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgLy8gdmFsaWRhdGUgdGhlIGJvZHkgYW5kIGZpbGVzIG9mIHRoZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keShib2R5KSk7XG4gICAgKHtmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyhmaWxlcykpO1xuICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBjaGVjayBjaGFubmVsIGF1dGhvcml6YXRpb25cbiAgUHJvbWlzZVxuICAgIC5hbGwoW1xuICAgICAgYXV0aGVudGljYXRlVXNlcihjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpLFxuICAgICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSksXG4gICAgICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSxcbiAgICAgIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXModGh1bWJuYWlsRmlsZVBhdGgsIG5hbWUsIGxpY2Vuc2UsIG5zZncpLFxuICAgIF0pXG4gICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgLy8gYWRkIGNoYW5uZWwgZGV0YWlscyB0byB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX2lkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgIH1cbiAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgaWYgKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMpIHtcbiAgICAgICAgcHVibGlzaCh0aHVtYm5haWxQdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVR5cGUpO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgYXNzZXRcbiAgICAgIHJldHVybiBwdWJsaXNoKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSk7XG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiAncHVibGlzaCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgZGF0YSAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgY2xhaW1JZDogcmVzdWx0LmNsYWltX2lkLFxuICAgICAgICAgIHVybCAgICA6IGAke2hvc3R9LyR7cmVzdWx0LmNsYWltX2lkfS8ke25hbWV9YCxcbiAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdwdWJsaXNoJywgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUHVibGlzaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUHVibGlzaC5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRoZW50aWNhdGVVc2VyIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpIHtcbiAgICAvLyBjYXNlOiBubyBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCAoYW5vbnltb3VzKSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVzZXIgdG9rZW4gaXMgcHJvdmlkZWRcbiAgICBpZiAoIWNoYW5uZWxOYW1lICYmICFjaGFubmVsSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiBudWxsLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggdXNlciB0b2tlblxuICAgIGlmICh1c2VyKSB7XG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbE5hbWUgIT09IHVzZXIuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBuYW1lIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFubmVsSWQgJiYgY2hhbm5lbElkICE9PSB1c2VyLmNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgaWQgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiB1c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCBwYXNzd29yZCBpbnN0ZWFkIG9mIHVzZXIgdG9rZW5cbiAgICBpZiAoIWNoYW5uZWxQYXNzd29yZCkgdGhyb3cgbmV3IEVycm9yKCdubyBjaGFubmVsIHBhc3N3b3JkIHByb3ZpZGVkJyk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyhjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQpO1xuICB9LFxuICBhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIHVzZXJQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBob2lzdGVkIHZhcmlhYmxlc1xuICAgICAgbGV0IGNoYW5uZWxEYXRhO1xuICAgICAgLy8gYnVpbGQgdGhlIHBhcmFtcyBmb3IgZmluZGluZyB0aGUgY2hhbm5lbFxuICAgICAgbGV0IGNoYW5uZWxGaW5kUGFyYW1zID0ge307XG4gICAgICBpZiAoY2hhbm5lbE5hbWUpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICBpZiAoY2hhbm5lbElkKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxJZDtcbiAgICAgIC8vIGZpbmQgdGhlIGNoYW5uZWxcbiAgICAgIGRiLkNoYW5uZWxcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiBjaGFubmVsRmluZFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIGNoYW5uZWwgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGFubmVsRGF0YSA9IGNoYW5uZWwuZ2V0KCk7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIGRhdGE6JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAgIHJldHVybiBkYi5Vc2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgdXNlck5hbWU6IGNoYW5uZWxEYXRhLmNoYW5uZWxOYW1lLnN1YnN0cmluZygxKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZCh1c2VyUGFzc3dvcmQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCcuLi5wYXNzd29yZCB3YXMgYSBtYXRjaC4uLicpO1xuICAgICAgICAgIHJlc29sdmUoY2hhbm5lbERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgeyByZXNvbHZlVXJpIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1SZXNvbHZlID0gKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIHJlc29sdmVVcmkoYCR7cGFyYW1zLm5hbWV9IyR7cGFyYW1zLmNsYWltSWR9YClcbiAgICAudGhlbihyZXNvbHZlZFVyaSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVJlc29sdmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVJlc29sdmUuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcblxuKi9cblxuY29uc3QgY2xhaW1TaG9ydElkID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVNob3J0SWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVNob3J0SWQuanMiLCJjb25zdCB7IGdldENsYWltTGlzdCB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBsaXN0IG9mIGNsYWltc1xuXG4qL1xuXG5jb25zdCBjbGFpbUxpc3QgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZ2V0Q2xhaW1MaXN0KHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKGNsYWltc0xpc3QgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcblxuKi9cblxuY29uc3QgZmlsZUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgZGIuRmlsZVxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGNsYWltSWQsXG4gICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiB0cnVlfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGVBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9maWxlQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgbXVsdGlwYXJ0ID0gcmVxdWlyZSgnY29ubmVjdC1tdWx0aXBhcnR5Jyk7XHJcbmNvbnN0IHsgcHVibGlzaGluZzogeyB1cGxvYWREaXJlY3RvcnkgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xyXG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gbXVsdGlwYXJ0KHt1cGxvYWREaXI6IHVwbG9hZERpcmVjdG9yeX0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBhcnRNaWRkbGV3YXJlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tdWx0aXBhcnR5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCJcbi8vIG1vZHVsZSBpZCA9IDEwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBoYW5kbGVQYWdlUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZFJlYWN0QXBwJyk7XG5jb25zdCBoYW5kbGVFbWJlZFJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRFbWJlZFBhZ2UnKTtcbmNvbnN0IHJlZGlyZWN0ID0gcmVxdWlyZSgnLi9yZWRpcmVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLmdldCgnLycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2xvZ2luJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvYWJvdXQnLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy90cmVuZGluZycsIHJlZGlyZWN0KCcvcG9wdWxhcicpKTtcbiAgYXBwLmdldCgnL3BvcHVsYXInLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9uZXcnLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9lbWJlZC86Y2xhaW1JZC86bmFtZScsIGhhbmRsZUVtYmVkUmVxdWVzdCk7ICAvLyByb3V0ZSB0byBzZW5kIGVtYmVkYWJsZSB2aWRlbyBwbGF5ZXIgKGZvciB0d2l0dGVyKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJjb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5jb25zdCBzZW5kUmVhY3RBcHAgPSAocmVxLCByZXMpID0+IHtcbiAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRSZWFjdEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZFJlYWN0QXBwLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9HSU4gfSBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMnO1xuY29uc3QgeyBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGlzYWJsZWQgICAgICAgICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkLFxuICBkaXNhYmxlZE1lc3NhZ2UgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWRNZXNzYWdlLFxuICBwdWJsaXNoSW5DaGFubmVsICA6IGZhbHNlLFxuICBzZWxlY3RlZENoYW5uZWwgICA6IExPR0lOLFxuICBzaG93TWV0YWRhdGFJbnB1dHM6IGZhbHNlLFxuICBzdGF0dXMgICAgICAgICAgICA6IHtcbiAgICBzdGF0dXMgOiBudWxsLFxuICAgIG1lc3NhZ2U6IG51bGwsXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgZmlsZSAgICAgICAgIDogbnVsbCxcbiAgICB1cmwgICAgICAgICAgOiBudWxsLFxuICAgIGNoYW5uZWwgICAgICA6IG51bGwsXG4gICAgcHVibGlzaFN1Ym1pdDogbnVsbCxcbiAgfSxcbiAgZmlsZSAgICA6IG51bGwsXG4gIGNsYWltICAgOiAnJyxcbiAgbWV0YWRhdGE6IHtcbiAgICB0aXRsZSAgICAgIDogJycsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGxpY2Vuc2UgICAgOiAnJyxcbiAgICBuc2Z3ICAgICAgIDogZmFsc2UsXG4gIH0sXG4gIHRodW1ibmFpbDogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9TRUxFQ1RFRDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpbml0aWFsU3RhdGUsIHsgIC8vIG5vdGU6IGNsZWFycyB0byBpbml0aWFsIHN0YXRlXG4gICAgICAgIGZpbGU6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgYWN0aW9ucy5NRVRBREFUQV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbWV0YWRhdGE6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLm1ldGFkYXRhLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0xBSU1fVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNsYWltOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw6IGFjdGlvbi5jaGFubmVsLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkVSUk9SX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBlcnJvcjogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZXJyb3IsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRUxFQ1RFRF9DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZWxlY3RlZENoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFM6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2hvd01ldGFkYXRhSW5wdXRzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5USFVNQk5BSUxfTkVXOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHRodW1ibmFpbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvcHVibGlzaC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsb2dnZWRJbkNoYW5uZWw6IHtcbiAgICBuYW1lICAgOiBudWxsLFxuICAgIHNob3J0SWQ6IG51bGwsXG4gICAgbG9uZ0lkIDogbnVsbCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9nZ2VkSW5DaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIEVSUk9SIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICByZXF1ZXN0OiB7XG4gICAgZXJyb3I6IG51bGwsXG4gICAgdHlwZSA6IG51bGwsXG4gICAgaWQgICA6IG51bGwsXG4gIH0sXG4gIHJlcXVlc3RMaXN0IDoge30sXG4gIGNoYW5uZWxMaXN0IDoge30sXG4gIGFzc2V0TGlzdCAgIDoge30sXG4gIGRpc3BsYXlBc3NldDoge1xuICAgIGVycm9yIDogbnVsbCxcbiAgICBzdGF0dXM6IExPQ0FMX0NIRUNLLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8vIGhhbmRsZSByZXF1ZXN0XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIHR5cGU6IGFjdGlvbi5kYXRhLnJlcXVlc3RUeXBlLFxuICAgICAgICAgIGlkICA6IGFjdGlvbi5kYXRhLnJlcXVlc3RJZCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBzdG9yZSByZXF1ZXN0c1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0xJU1RfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3RMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIGtleSAgOiBhY3Rpb24uZGF0YS5rZXksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBhc3NldCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkFTU0VUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBhc3NldExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmFzc2V0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yICAgIDogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBuYW1lICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICA6IGFjdGlvbi5kYXRhLmNsYWltSWQsXG4gICAgICAgICAgICBzaG9ydElkICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbURhdGE6IGFjdGlvbi5kYXRhLmNsYWltRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGNoYW5uZWwgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBuYW1lICAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgbG9uZ0lkICAgIDogYWN0aW9uLmRhdGEubG9uZ0lkLFxuICAgICAgICAgICAgc2hvcnRJZCAgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXSwge1xuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBkaXNwbGF5IGFuIGFzc2V0XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBlcnJvciA6IGFjdGlvbi5kYXRhLFxuICAgICAgICAgIHN0YXR1czogRVJST1IsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJjb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCB7XG4gIGFuYWx5dGljczoge1xuICAgIGdvb2dsZUlkOiBnb29nbGVBbmFseXRpY3NJZCxcbiAgfSxcbiAgYXNzZXREZWZhdWx0czoge1xuICAgIHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCxcbiAgICBkZXNjcmlwdGlvbjogZGVmYXVsdERlc2NyaXB0aW9uLFxuICB9LFxuICBkZXRhaWxzOiB7XG4gICAgZGVzY3JpcHRpb24sXG4gICAgaG9zdCxcbiAgICB0aXRsZSxcbiAgICB0d2l0dGVyLFxuICB9LFxufSA9IHNpdGVDb25maWc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGVzY3JpcHRpb24sXG4gIGdvb2dsZUFuYWx5dGljc0lkLFxuICBob3N0LFxuICB0aXRsZSxcbiAgdHdpdHRlcixcbiAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICBkZWZhdWx0VGh1bWJuYWlsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1nYVwiXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgUHVibGlzaFRvb2wgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVG9vbCc7XG5cbmNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nfT5cbiAgICAgICAgPFNFTyAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCBmbGV4LWNvbnRhaW5lci0tY29sdW1uJ30+XG4gICAgICAgICAgPFB1Ymxpc2hUb29sIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZVBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvSG9tZVBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGNyZWF0ZVBhZ2VUaXRsZSB9IGZyb20gJ3V0aWxzL3BhZ2VUaXRsZSc7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGFncyB9IGZyb20gJ3V0aWxzL21ldGFUYWdzJztcbmltcG9ydCB7IGNyZWF0ZUNhbm9uaWNhbExpbmsgfSBmcm9tICd1dGlscy9jYW5vbmljYWxMaW5rJztcblxuY2xhc3MgU0VPIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICAvLyBwcm9wcyBmcm9tIHN0YXRlXG4gICAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gcHJvcHMgZnJvbSBwYXJlbnRcbiAgICBjb25zdCB7IGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCB7IHBhZ2VUaXRsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjcmVhdGUgcGFnZSB0aXRsZSwgdGFncywgYW5kIGNhbm9uaWNhbCBsaW5rXG4gICAgcGFnZVRpdGxlID0gY3JlYXRlUGFnZVRpdGxlKHNpdGVUaXRsZSwgcGFnZVRpdGxlKTtcbiAgICBjb25zdCBtZXRhVGFncyA9IGNyZWF0ZU1ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgIGNvbnN0IGNhbm9uaWNhbExpbmsgPSBjcmVhdGVDYW5vbmljYWxMaW5rKGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpLCBzaXRlSG9zdCk7XG4gICAgLy8gcmVuZGVyIHJlc3VsdHNcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldFxuICAgICAgICB0aXRsZT17cGFnZVRpdGxlfVxuICAgICAgICBtZXRhPXttZXRhVGFnc31cbiAgICAgICAgbGluaz17W3tyZWw6ICdjYW5vbmljYWwnLCBocmVmOiBjYW5vbmljYWxMaW5rfV19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblNFTy5wcm9wVHlwZXMgPSB7XG4gIHBhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGFnZVVyaSAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGFubmVsICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIGFzc2V0ICAgIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNFTztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsImV4cG9ydCBjb25zdCBjcmVhdGVQYWdlVGl0bGUgPSAoc2l0ZVRpdGxlLCBwYWdlVGl0bGUpID0+IHtcbiAgaWYgKCFwYWdlVGl0bGUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZVRpdGxlfWA7XG4gIH1cbiAgcmV0dXJuIGAke3NpdGVUaXRsZX0gLSAke3BhZ2VUaXRsZX1gO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9wYWdlVGl0bGUuanMiLCJjb25zdCBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gKHRodW1ibmFpbCkgPT4ge1xuICBpZiAodGh1bWJuYWlsKSB7XG4gICAgY29uc3QgZmlsZUV4dCA9IHRodW1ibmFpbC5zdWJzdHJpbmcodGh1bWJuYWlsLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIHN3aXRjaCAoZmlsZUV4dCkge1xuICAgICAgY2FzZSAnanBlZyc6XG4gICAgICBjYXNlICdqcGcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgICAgY2FzZSAncG5nJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9wbmcnO1xuICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9naWYnO1xuICAgICAgY2FzZSAnbXA0JzpcbiAgICAgICAgcmV0dXJuICd2aWRlby9tcDQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuY29uc3QgY3JlYXRlQmFzaWNNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKSA9PiB7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNpdGVIb3N0fSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogc2l0ZURlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxNZXRhVGFncyA9IChzaXRlVGl0bGUsIHNpdGVIb3N0LCBzaXRlVHdpdHRlciwgY2hhbm5lbCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IGAke25hbWV9IG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBgJHtuYW1lfSwgYSBjaGFubmVsIG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YSB9ID0gYXNzZXQ7XG4gIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGNsYWltRGF0YTtcbiAgY29uc3QgZW1iZWRVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzaG93VXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc291cmNlID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9LiR7Y2xhaW1EYXRhLmZpbGVFeHR9YDtcbiAgY29uc3Qgb2dUaXRsZSA9IGNsYWltRGF0YS50aXRsZSB8fCBjbGFpbURhdGEubmFtZTtcbiAgY29uc3Qgb2dEZXNjcmlwdGlvbiA9IGNsYWltRGF0YS5kZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb247XG4gIGNvbnN0IG9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlKGNsYWltRGF0YS50aHVtYm5haWwpO1xuICBjb25zdCBvZ1RodW1ibmFpbCA9IGNsYWltRGF0YS50aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbDtcbiAgY29uc3QgbWV0YVRhZ3MgPSBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBvZ1RpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaG93VXJsfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogb2dEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6d2lkdGgnLCBjb250ZW50OiA2MDB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOmhlaWdodCcsIGNvbnRlbnQ6IDMxNX0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICBdO1xuICBpZiAoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnIHx8IGNvbnRlbnRUeXBlID09PSAndmlkZW8vd2VibScpIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzpzZWN1cmVfdXJsJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogb2dUaHVtYm5haWx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBvZ1RodW1ibmFpbENvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ3ZpZGVvJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3BsYXllcid9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyJywgY29udGVudDogZW1iZWRVcmx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOndpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnRleHQ6cGxheWVyX3dpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpoZWlnaHQnLCBjb250ZW50OiAzMzd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtOmNvbnRlbnRfdHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gIH0gZWxzZSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ2FydGljbGUnfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeV9sYXJnZV9pbWFnZSd9KTtcbiAgfVxuICByZXR1cm4gbWV0YVRhZ3M7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTWV0YVRhZ3MgPSAoc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIH07XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgY2hhbm5lbCk7XG4gIH07XG4gIHJldHVybiBjcmVhdGVCYXNpY01ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsImNvbnN0IGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayA9IChwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7cGFnZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBzaXRlSG9zdCkgPT4ge1xuICBsZXQgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQ7XG4gIGlmIChhc3NldC5jbGFpbURhdGEpIHtcbiAgICAoeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9LyR7bmFtZX1gO1xuICB9O1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayA9IChjaGFubmVsLCBzaXRlSG9zdCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWA7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2Fub25pY2FsTGluayA9IChhc3NldCwgY2hhbm5lbCwgcGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayhhc3NldCwgc2l0ZUhvc3QpO1xuICB9XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rKGNoYW5uZWwsIHNpdGVIb3N0KTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rKHBhZ2UsIHNpdGVIb3N0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOYXZMaW5rLCB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgTG9nbyBmcm9tICdjb21wb25lbnRzL0xvZ28nO1xuaW1wb3J0IE5hdkJhckNoYW5uZWxEcm9wZG93biBmcm9tICdjb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24nO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNvbnN0IFZJRVcgPSAnVklFVyc7XG5jb25zdCBMT0dPVVQgPSAnTE9HT1VUJztcblxuY2xhc3MgTmF2QmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIgPSB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dvdXRVc2VyID0gdGhpcy5sb2dvdXRVc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24gPSB0aGlzLmhhbmRsZVNlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW5cbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyKCk7XG4gIH1cbiAgY2hlY2tGb3JMb2dnZWRJblVzZXIgKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfTtcbiAgICByZXF1ZXN0KCcvdXNlcicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGRhdGEuY2hhbm5lbE5hbWUsIGRhdGEuc2hvcnRDaGFubmVsSWQsIGRhdGEuY2hhbm5lbENsYWltSWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcvdXNlciBlcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIGxvZ291dFVzZXIgKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfTtcbiAgICByZXF1ZXN0KCcvbG9nb3V0JywgcGFyYW1zKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ291dCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcvbG9nb3V0IGVycm9yJywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBoYW5kbGVTZWxlY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgTE9HT1VUOlxuICAgICAgICB0aGlzLmxvZ291dFVzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZJRVc6XG4gICAgICAgIC8vIHJlZGlyZWN0IHRvIGNoYW5uZWwgcGFnZVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgLyR7dGhpcy5wcm9wcy5jaGFubmVsTmFtZX06JHt0aGlzLnByb3BzLmNoYW5uZWxMb25nSWR9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzaXRlRGVzY3JpcHRpb24gfSA9ICB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBuYXYtYmFyJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXNob3J0IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tY2VudGVyJz5cbiAgICAgICAgICA8TG9nbyAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1jZW50ZXInPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSduYXYtYmFyLXRhZ2xpbmUnPntzaXRlRGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1yaWdodCc+XG4gICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy8nIGV4YWN0PlB1Ymxpc2g8L05hdkxpbms+XG4gICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnICBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvYWJvdXQnPkFib3V0PC9OYXZMaW5rPlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoYW5uZWxOYW1lID8gKFxuICAgICAgICAgICAgICA8TmF2QmFyQ2hhbm5lbERyb3Bkb3duXG4gICAgICAgICAgICAgICAgY2hhbm5lbE5hbWU9e3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9XG4gICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0aW9uPXt0aGlzLmhhbmRsZVNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0aW9uPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIFZJRVc9e1ZJRVd9XG4gICAgICAgICAgICAgICAgTE9HT1VUPXtMT0dPVVR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TmF2TGluayBpZD0nbmF2LWJhci1sb2dpbi1saW5rJyBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy9sb2dpbic+Q2hhbm5lbDwvTmF2TGluaz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKE5hdkJhcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5mdW5jdGlvbiBMb2dvICgpIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZlcnNpb249JzEuMScgaWQ9J0xheWVyXzEnIHg9JzBweCcgeT0nMHB4JyBoZWlnaHQ9JzI0cHgnIHZpZXdCb3g9JzAgMCA4MCAzMScgZW5hYmxlQmFja2dyb3VuZD0nbmV3IDAgMCA4MCAzMScgY2xhc3NOYW1lPSduYXYtYmFyLWxvZ28nPlxuICAgICAgPExpbmsgdG89Jy8nPlxuICAgICAgICA8dGl0bGU+TG9nbzwvdGl0bGU+XG4gICAgICAgIDxkZXNjPlNwZWUuY2ggbG9nbzwvZGVzYz5cbiAgICAgICAgPGcgaWQ9J0Fib3V0Jz5cbiAgICAgICAgICA8ZyBpZD0nUHVibGlzaC1Gb3JtLVYyLV94MjhfZmlsbGVkX3gyOV8nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC00Mi4wMDAwMDAsIC0yMy4wMDAwMDApJz5cbiAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNDIuMDAwMDAwLCAyMi4wMDAwMDApJz5cbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPSdtYXRyaXgoMSAwIDAgMSAwIDIwKScgZm9udFNpemU9JzI1JyBmb250RmFtaWx5PSdSb2JvdG8nPlNwZWUmbHQ7aDwvdGV4dD5cbiAgICAgICAgICAgICAgPGcgaWQ9J0dyb3VwLTE2JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMzAuMDAwMDAwKSc+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDlGOTExJyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHknIGZpbGw9J25vbmUnIHN0cm9rZT0nIzAyOUQ3NCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTE2LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS0yJyBmaWxsPSdub25lJyBzdHJva2U9JyNFMzVCRDgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00zMi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMycgZmlsbD0nbm9uZScgc3Ryb2tlPScjNDE1NkM1JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNNDguNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTQnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzYzNTY4OCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTY0LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L0xpbms+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBOYXZCYXJDaGFubmVsRHJvcGRvd24gKHsgY2hhbm5lbE5hbWUsIGhhbmRsZVNlbGVjdGlvbiwgZGVmYXVsdFNlbGVjdGlvbiwgVklFVywgTE9HT1VUIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93IGxpbmstLW5hdicgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdGlvbn0gdmFsdWU9e2RlZmF1bHRTZWxlY3Rpb259PlxuICAgICAgPG9wdGlvbiBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e2NoYW5uZWxOYW1lfTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17VklFV30+Vmlldzwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17TE9HT1VUfT5Mb2dvdXQ8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkJhckNoYW5uZWxEcm9wZG93bjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSAxMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkaXNhYmxlZDogcHVibGlzaC5kaXNhYmxlZCxcbiAgICBmaWxlICAgIDogcHVibGlzaC5maWxlLFxuICAgIHN0YXR1cyAgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnY29udGFpbmVycy9Ecm9wem9uZSc7XG5pbXBvcnQgUHVibGlzaERldGFpbHMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoRGV0YWlscyc7XG5pbXBvcnQgUHVibGlzaFN0YXR1cyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hTdGF0dXMnO1xuaW1wb3J0IFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlJztcblxuY2xhc3MgUHVibGlzaFRvb2wgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBjb25zb2xlLmxvZygncHVibGlzaCBpcyBkaXNhYmxlZCcpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UgLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwdWJsaXNoIGlzIG5vdCBkaXNhYmxlZCcpO1xuICAgICAgaWYgKHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFB1Ymxpc2hTdGF0dXMgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiA8UHVibGlzaERldGFpbHMgLz47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiA8RHJvcHpvbmUgLz47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVG9vbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUb29sL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHZhbGlkYXRlRmlsZSB9IGZyb20gJ3V0aWxzL2ZpbGUnO1xuaW1wb3J0IFB1Ymxpc2hQcmV2aWV3IGZyb20gJ2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcnO1xuXG5jbGFzcyBEcm9wem9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZHJhZ092ZXIgIDogZmFsc2UsXG4gICAgICBtb3VzZU92ZXIgOiBmYWxzZSxcbiAgICAgIGRpbVByZXZpZXc6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVEcm9wID0gdGhpcy5oYW5kbGVEcm9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnT3ZlciA9IHRoaXMuaGFuZGxlRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdFbmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdFbnRlciA9IHRoaXMuaGFuZGxlRHJhZ0VudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnTGVhdmUgPSB0aGlzLmhhbmRsZURyYWdMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTW91c2VFbnRlciA9IHRoaXMuaGFuZGxlTW91c2VFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA9IHRoaXMuaGFuZGxlTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVGaWxlSW5wdXQgPSB0aGlzLmhhbmRsZUZpbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hvb3NlRmlsZSA9IHRoaXMuY2hvb3NlRmlsZS5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZURyb3AgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogZmFsc2V9KTtcbiAgICAvLyBpZiBkcm9wcGVkIGl0ZW1zIGFyZW4ndCBmaWxlcywgcmVqZWN0IHRoZW1cbiAgICBjb25zdCBkdCA9IGV2ZW50LmRhdGFUcmFuc2ZlcjtcbiAgICBpZiAoZHQuaXRlbXMpIHtcbiAgICAgIGlmIChkdC5pdGVtc1swXS5raW5kID09PSAnZmlsZScpIHtcbiAgICAgICAgY29uc3QgZHJvcHBlZEZpbGUgPSBkdC5pdGVtc1swXS5nZXRBc0ZpbGUoKTtcbiAgICAgICAgdGhpcy5jaG9vc2VGaWxlKGRyb3BwZWRGaWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZ092ZXIgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBoYW5kbGVEcmFnRW5kIChldmVudCkge1xuICAgIHZhciBkdCA9IGV2ZW50LmRhdGFUcmFuc2ZlcjtcbiAgICBpZiAoZHQuaXRlbXMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZHQuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZHQuaXRlbXMucmVtb3ZlKGkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuY2xlYXJEYXRhKCk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyYWdFbnRlciAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IHRydWUsIGRpbVByZXZpZXc6IHRydWV9KTtcbiAgfVxuICBoYW5kbGVEcmFnTGVhdmUgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiBmYWxzZSwgZGltUHJldmlldzogZmFsc2V9KTtcbiAgfVxuICBoYW5kbGVNb3VzZUVudGVyICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttb3VzZU92ZXI6IHRydWUsIGRpbVByZXZpZXc6IHRydWV9KTtcbiAgfVxuICBoYW5kbGVNb3VzZUxlYXZlICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttb3VzZU92ZXI6IGZhbHNlLCBkaW1QcmV2aWV3OiBmYWxzZX0pO1xuICB9XG4gIGhhbmRsZUNsaWNrIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVfaW5wdXQnKS5jbGljaygpO1xuICB9XG4gIGhhbmRsZUZpbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgIHRoaXMuY2hvb3NlRmlsZShmaWxlTGlzdFswXSk7XG4gIH1cbiAgY2hvb3NlRmlsZSAoZmlsZSkge1xuICAgIGlmIChmaWxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YWxpZGF0ZUZpbGUoZmlsZSk7IC8vIHZhbGlkYXRlIHRoZSBmaWxlJ3MgbmFtZSwgdHlwZSwgYW5kIHNpemVcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNldEZpbGVFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIC8vIHN0YWdlIGl0IHNvIGl0IHdpbGwgYmUgcmVhZHkgd2hlbiB0aGUgcHVibGlzaCBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RGaWxlKGZpbGUpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uJz5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0naW5wdXQtZmlsZScgdHlwZT0nZmlsZScgaWQ9J2ZpbGVfaW5wdXQnIG5hbWU9J2ZpbGVfaW5wdXQnIGFjY2VwdD0ndmlkZW8vKixpbWFnZS8qJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVGaWxlSW5wdXR9IGVuY1R5cGU9J211bHRpcGFydC9mb3JtLWRhdGEnIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgPGRpdiBpZD0ncHJldmlldy1kcm9wem9uZScgY2xhc3NOYW1lPXsncm93IHJvdy0tcGFkZGVkIHJvdy0tdGFsbCBkcm9wem9uZScgKyAodGhpcy5zdGF0ZS5kcmFnT3ZlciA/ICcgZHJvcHpvbmUtLWRyYWctb3ZlcicgOiAnJyl9IG9uRHJvcD17dGhpcy5oYW5kbGVEcm9wfSBvbkRyYWdPdmVyPXt0aGlzLmhhbmRsZURyYWdPdmVyfSBvbkRyYWdFbmQ9e3RoaXMuaGFuZGxlRHJhZ0VuZH0gb25EcmFnRW50ZXI9e3RoaXMuaGFuZGxlRHJhZ0VudGVyfSBvbkRyYWdMZWF2ZT17dGhpcy5oYW5kbGVEcmFnTGVhdmV9IG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVNb3VzZUVudGVyfSBvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW91c2VMZWF2ZX0gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAge3RoaXMucHJvcHMuZmlsZSA/IChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxQdWJsaXNoUHJldmlld1xuICAgICAgICAgICAgICAgIGRpbVByZXZpZXc9e3RoaXMuc3RhdGUuZGltUHJldmlld31cbiAgICAgICAgICAgICAgICBmaWxlPXt0aGlzLnByb3BzLmZpbGV9XG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtdGV4dC1ob2xkZXInIGNsYXNzTmFtZT17J2ZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1kcmFnb3Zlcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+RHJvcCBpdC48L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLm1vdXNlT3ZlciA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWluc3RydWN0aW9ucyc+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLXBsYWNlaG9sZGVyIGluZm8tbWVzc2FnZS0tZmFpbHVyZScgaWQ9J2lucHV0LWVycm9yLWZpbGUtc2VsZWN0aW9uJz57dGhpcy5wcm9wcy5maWxlRXJyb3J9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5EcmFnICYgZHJvcCBpbWFnZSBvciB2aWRlbyBoZXJlIHRvIHB1Ymxpc2g8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+T1I8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZS0tdW5kZXJsaW5lZCc+Q0hPT1NFIEZJTEU8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLXRleHQtaG9sZGVyJyBjbGFzc05hbWU9eydmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJ30+XG4gICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5kcmFnT3ZlciA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1kcmFnb3Zlcic+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPkRyb3AgaXQuPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWluc3RydWN0aW9ucyc+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS1wbGFjZWhvbGRlciBpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnIGlkPSdpbnB1dC1lcnJvci1maWxlLXNlbGVjdGlvbic+e3RoaXMucHJvcHMuZmlsZUVycm9yfTwvcD5cbiAgICAgICAgICAgICAgICAgIDxwPkRyYWcgJiBkcm9wIGltYWdlIG9yIHZpZGVvIGhlcmUgdG8gcHVibGlzaDwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+T1I8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUtLXVuZGVybGluZWQnPkNIT09TRSBGSUxFPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wem9uZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL3ZpZXcuanN4IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHZhbGlkYXRlRmlsZSAoZmlsZSkge1xuICAgIGlmICghZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHByb3ZpZGVkJyk7XG4gICAgfVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHNpemUgYW5kIHR5cGVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIEdJRnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihmaWxlLnR5cGUgKyAnIGlzIG5vdCBhIHN1cHBvcnRlZCBmaWxlIHR5cGUuIE9ubHksIC5qcGVnLCAucG5nLCAuZ2lmLCBhbmQgLm1wNCBmaWxlcyBhcmUgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2ZpbGUuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgUHVibGlzaFByZXZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGltZ1NvdXJjZSAgICAgICA6ICcnLFxuICAgICAgZGVmYXVsdFRodW1ibmFpbDogJy9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZSh0aGlzLnByb3BzLmZpbGUpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgaWYgKG5ld1Byb3BzLmZpbGUgIT09IHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2UobmV3UHJvcHMuZmlsZSk7XG4gICAgfVxuICAgIGlmIChuZXdQcm9wcy50aHVtYm5haWwgIT09IHRoaXMucHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICBpZiAobmV3UHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUobmV3UHJvcHMudGh1bWJuYWlsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogdGhpcy5zdGF0ZS5kZWZhdWx0VGh1bWJuYWlsfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlIChmaWxlKSB7XG4gICAgY29uc3QgcHJldmlld1JlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcHJldmlld1JlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIHByZXZpZXdSZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiBwcmV2aWV3UmVhZGVyLnJlc3VsdH0pO1xuICAgIH07XG4gIH1cbiAgc2V0UHJldmlld0ltYWdlU291cmNlIChmaWxlKSB7XG4gICAgaWYgKGZpbGUudHlwZSAhPT0gJ3ZpZGVvL21wNCcpIHtcbiAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUoZmlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnRodW1ibmFpbCkge1xuICAgICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKHRoaXMucHJvcHMudGh1bWJuYWlsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogdGhpcy5zdGF0ZS5kZWZhdWx0VGh1bWJuYWlsfSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbWdcbiAgICAgICAgaWQ9J2Ryb3B6b25lLXByZXZpZXcnXG4gICAgICAgIHNyYz17dGhpcy5zdGF0ZS5pbWdTb3VyY2V9XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5kaW1QcmV2aWV3ID8gJ2RpbScgOiAnJ31cbiAgICAgICAgYWx0PSdwdWJsaXNoIHByZXZpZXcnXG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblB1Ymxpc2hQcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgZGltUHJldmlldzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZmlsZSAgICAgIDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICB0aHVtYm5haWwgOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoUHJldmlldy9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y2xlYXJGaWxlLCBzdGFydFB1Ymxpc2h9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlOiBwdWJsaXNoLmZpbGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIGNsZWFyRmlsZSxcbiAgc3RhcnRQdWJsaXNoLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGV0YWlscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnY29udGFpbmVycy9Ecm9wem9uZSc7XG5pbXBvcnQgUHVibGlzaFRpdGxlSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dCc7XG5pbXBvcnQgUHVibGlzaFVybElucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0JztcbmltcG9ydCBQdWJsaXNoVGh1bWJuYWlsSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hNZXRhZGF0YUlucHV0cyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cyc7XG5pbXBvcnQgQ2hhbm5lbFNlbGVjdCBmcm9tICdjb250YWluZXJzL0NoYW5uZWxTZWxlY3QnO1xuXG5jbGFzcyBQdWJsaXNoRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMub25QdWJsaXNoU3VibWl0ID0gdGhpcy5vblB1Ymxpc2hTdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuICBvblB1Ymxpc2hTdWJtaXQgKCkge1xuICAgIHRoaXMucHJvcHMuc3RhcnRQdWJsaXNoKHRoaXMucHJvcHMuaGlzdG9yeSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLWJvdHRvbSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgPFB1Ymxpc2hUaXRsZUlucHV0IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogbGVmdCBjb2x1bW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwJyA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8RHJvcHpvbmUgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvKiByaWdodCBjb2x1bW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdwdWJsaXNoLWFjdGl2ZS1hcmVhJyBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxQdWJsaXNoVXJsSW5wdXQgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8Q2hhbm5lbFNlbGVjdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLmZpbGUudHlwZSA9PT0gJ3ZpZGVvL21wNCcpICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUgJz5cbiAgICAgICAgICAgICAgICA8UHVibGlzaFRodW1ibmFpbElucHV0IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS1uby1ib3R0b20gcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hNZXRhZGF0YUlucHV0cyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gaWQ9J3B1Ymxpc2gtc3VibWl0JyBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLWxhcmdlJyBvbkNsaWNrPXt0aGlzLm9uUHVibGlzaFN1Ym1pdH0+UHVibGlzaDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tYm90dG9tIGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tY2FuY2VsJyBvbkNsaWNrPXt0aGlzLnByb3BzLmNsZWFyRmlsZX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+QnkgY2xpY2tpbmcgJ1B1Ymxpc2gnLCB5b3UgYWZmaXJtIHRoYXQgeW91IGhhdmUgdGhlIHJpZ2h0cyB0byBwdWJsaXNoIHRoaXMgY29udGVudCB0byB0aGUgTEJSWSBuZXR3b3JrLCBhbmQgdGhhdCB5b3UgdW5kZXJzdGFuZCB0aGUgcHJvcGVydGllcyBvZiBwdWJsaXNoaW5nIGl0IHRvIGEgZGVjZW50cmFsaXplZCwgdXNlci1jb250cm9sbGVkIG5ldHdvcmsuIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9sZWFybic+UmVhZCBtb3JlLjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKFB1Ymxpc2hEZXRhaWxzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL3ZpZXcuanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHB1Ymxpc2gubWV0YWRhdGEudGl0bGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25NZXRhZGF0YUNoYW5nZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVNZXRhZGF0YShuYW1lLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHVibGlzaFRpdGxlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZSkge1xuICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHZhbHVlKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3B1Ymxpc2gtdGl0bGUnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCB0ZXh0LS1sYXJnZSBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyBuYW1lPSd0aXRsZScgcGxhY2Vob2xkZXI9J0dpdmUgeW91ciBwb3N0IGEgdGl0bGUuLi4nIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSB2YWx1ZT17dGhpcy5wcm9wcy50aXRsZX0gLz5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUaXRsZUlucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJpbXBvcnQge3VwZGF0ZUNsYWltLCB1cGRhdGVFcnJvcn0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZSAgIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGZpbGVOYW1lICAgICAgICAgICAgICA6IHB1Ymxpc2guZmlsZS5uYW1lLFxuICAgIHB1Ymxpc2hJbkNoYW5uZWwgICAgICA6IHB1Ymxpc2gucHVibGlzaEluQ2hhbm5lbCxcbiAgICBzZWxlY3RlZENoYW5uZWwgICAgICAgOiBwdWJsaXNoLnNlbGVjdGVkQ2hhbm5lbCxcbiAgICBjbGFpbSAgICAgICAgICAgICAgICAgOiBwdWJsaXNoLmNsYWltLFxuICAgIHVybEVycm9yICAgICAgICAgICAgICA6IHB1Ymxpc2guZXJyb3IudXJsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2xhaW1DaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlQ2xhaW0odmFsdWUpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdwdWJsaXNoU3VibWl0JywgbnVsbCkpO1xuICAgIH0sXG4gICAgb25VcmxFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcigndXJsJywgdmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5pbXBvcnQgVXJsTWlkZGxlIGZyb20gJ2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXknO1xuXG5jbGFzcyBQdWJsaXNoVXJsSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBjbGFpbSwgZmlsZU5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjbGFpbSkge1xuICAgICAgdGhpcy5zZXRDbGFpbU5hbWUoZmlsZU5hbWUpO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzICh7IGNsYWltLCBmaWxlTmFtZSB9KSB7XG4gICAgLy8gaWYgYSBuZXcgZmlsZSB3YXMgY2hvc2VuLCB1cGRhdGUgdGhlIGNsYWltIG5hbWVcbiAgICBpZiAoZmlsZU5hbWUgIT09IHRoaXMucHJvcHMuZmlsZU5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldENsYWltTmFtZShmaWxlTmFtZSk7XG4gICAgfVxuICAgIC8vIGlmIHRoZSBjbGFpbSBoYXMgdXBkYXRlZCwgY2hlY2sgaXRzIGF2YWlsYWJpbGl0eVxuICAgIGlmIChjbGFpbSAhPT0gdGhpcy5wcm9wcy5jbGFpbSkge1xuICAgICAgdGhpcy52YWxpZGF0ZUNsYWltKGNsYWltKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5jbGVhbnNlSW5wdXQodmFsdWUpO1xuICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICB0aGlzLnByb3BzLm9uQ2xhaW1DaGFuZ2UodmFsdWUpO1xuICB9XG4gIGNsZWFuc2VJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgc2V0Q2xhaW1OYW1lIChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lV2l0aG91dEVuZGluZyA9IGZpbGVOYW1lLnN1YnN0cmluZygwLCBmaWxlTmFtZS5sYXN0SW5kZXhPZignLicpKTtcbiAgICBjb25zdCBjbGVhbkNsYWltTmFtZSA9IHRoaXMuY2xlYW5zZUlucHV0KGZpbGVOYW1lV2l0aG91dEVuZGluZyk7XG4gICAgdGhpcy5wcm9wcy5vbkNsYWltQ2hhbmdlKGNsZWFuQ2xhaW1OYW1lKTtcbiAgfVxuICB2YWxpZGF0ZUNsYWltIChjbGFpbSkge1xuICAgIGlmICghY2xhaW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uVXJsRXJyb3IoJ0VudGVyIGEgdXJsIGFib3ZlJyk7XG4gICAgfVxuICAgIHJlcXVlc3QoYC9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LyR7Y2xhaW19YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVybEVycm9yKG51bGwpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVybEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNsYWltLCBsb2dnZWRJbkNoYW5uZWxOYW1lLCBsb2dnZWRJbkNoYW5uZWxTaG9ydElkLCBwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwsIHVybEVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5Jz5zcGVlLmNoIC8gPC9zcGFuPlxuICAgICAgICAgIDxVcmxNaWRkbGVcbiAgICAgICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw9e3B1Ymxpc2hJbkNoYW5uZWx9XG4gICAgICAgICAgICBzZWxlY3RlZENoYW5uZWw9e3NlbGVjdGVkQ2hhbm5lbH1cbiAgICAgICAgICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU9e2xvZ2dlZEluQ2hhbm5lbE5hbWV9XG4gICAgICAgICAgICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkPXtsb2dnZWRJbkNoYW5uZWxTaG9ydElkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjbGFpbS1uYW1lLWlucHV0JyBjbGFzc05hbWU9J2lucHV0LXRleHQnIG5hbWU9J2NsYWltJyBwbGFjZWhvbGRlcj0neW91ci11cmwtaGVyZScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IHZhbHVlPXtjbGFpbX0gLz5cbiAgICAgICAgICB7IChjbGFpbSAmJiAhdXJsRXJyb3IpICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNsYWltLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1zdWNjZXNzIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTMnfTwvc3Bhbj4gfVxuICAgICAgICAgIHsgdXJsRXJyb3IgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzE2J308L3NwYW4+IH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgeyB1cmxFcnJvciA/IChcbiAgICAgICAgICAgIDxwIGlkPSdpbnB1dC1lcnJvci1jbGFpbS1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3VybEVycm9yfTwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIGN1c3RvbSB1cmw8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hVcmxJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5mdW5jdGlvbiBVcmxNaWRkbGUgKHtwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwsIGxvZ2dlZEluQ2hhbm5lbE5hbWUsIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWR9KSB7XG4gIGlmIChwdWJsaXNoSW5DaGFubmVsKSB7XG4gICAgaWYgKHNlbGVjdGVkQ2hhbm5lbCA9PT0gbG9nZ2VkSW5DaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIDxzcGFuIGlkPSd1cmwtY2hhbm5lbCcgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5Jz57bG9nZ2VkSW5DaGFubmVsTmFtZX06e2xvZ2dlZEluQ2hhbm5lbFNob3J0SWR9IC88L3NwYW4+O1xuICAgIH1cbiAgICByZXR1cm4gPHNwYW4gaWQ9J3VybC1jaGFubmVsLXBsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnkgdG9vbHRpcCc+QGNoYW5uZWw8c3BhblxuICAgICAgY2xhc3NOYW1lPSd0b29sdGlwLXRleHQnPlNlbGVjdCBhIGNoYW5uZWwgYmVsb3c8L3NwYW4+IC88L3NwYW4+O1xuICB9XG4gIHJldHVybiAoXG4gICAgPHNwYW4gaWQ9J3VybC1uby1jaGFubmVsLXBsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnkgdG9vbHRpcCc+eHl6PHNwYW4gY2xhc3NOYW1lPSd0b29sdGlwLXRleHQnPlRoaXMgd2lsbCBiZSBhIHJhbmRvbSBpZDwvc3Bhbj4gLzwvc3Bhbj5cbiAgKTtcbn1cblxuVXJsTWlkZGxlLnByb3BUeXBlcyA9IHtcbiAgcHVibGlzaEluQ2hhbm5lbCAgICAgIDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbG9nZ2VkSW5DaGFubmVsTmFtZSAgIDogUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZDogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVybE1pZGRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5L2luZGV4LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvbk5ld1RodW1ibmFpbCB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoOiB7IGZpbGUgfSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25OZXdUaHVtYm5haWwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gIGxldCBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gIGxldCBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcbiAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICBsZXQgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTogbWltZVN0cmluZ30pO1xufVxuXG5jbGFzcyBQdWJsaXNoVGh1bWJuYWlsSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZGVvU291cmNlICAgOiBudWxsLFxuICAgICAgZXJyb3IgICAgICAgICA6IG51bGwsXG4gICAgICBzbGlkZXJNaW5SYW5nZTogMSxcbiAgICAgIHNsaWRlck1heFJhbmdlOiBudWxsLFxuICAgICAgc2xpZGVyVmFsdWUgICA6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YSA9IHRoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2UgPSB0aGlzLmhhbmRsZVNsaWRlckNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlsID0gdGhpcy5jcmVhdGVUaHVtYm5haWwuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBmaWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0VmlkZW9Tb3VyY2UoZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgLy8gaWYgZmlsZSBjaGFuZ2VzXG4gICAgaWYgKG5leHRQcm9wcy5maWxlICYmIG5leHRQcm9wcy5maWxlICE9PSB0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgIGNvbnN0IHsgZmlsZSB9ID0gbmV4dFByb3BzO1xuICAgICAgdGhpcy5zZXRWaWRlb1NvdXJjZShmaWxlKTtcbiAgICB9O1xuICB9XG4gIHNldFZpZGVvU291cmNlIChmaWxlKSB7XG4gICAgY29uc3QgcHJldmlld1JlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcHJldmlld1JlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIHByZXZpZXdSZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YVVyaSA9IHByZXZpZXdSZWFkZXIucmVzdWx0O1xuICAgICAgY29uc3QgYmxvYiA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVyaSk7XG4gICAgICBjb25zdCB2aWRlb1NvdXJjZSA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmlkZW9Tb3VyY2UgfSk7XG4gICAgfTtcbiAgfVxuICBoYW5kbGVWaWRlb0xvYWRlZERhdGEgKGV2ZW50KSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBldmVudC50YXJnZXQuZHVyYXRpb247XG4gICAgY29uc3QgdG90YWxNaW51dGVzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIDYwKTtcbiAgICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKGR1cmF0aW9uICUgNjApO1xuICAgIC8vIHNldCB0aGUgc2xpZGVyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzbGlkZXJNYXhSYW5nZTogZHVyYXRpb24gKiAxMDAsXG4gICAgICBzbGlkZXJWYWx1ZSAgIDogZHVyYXRpb24gKiAxMDAgLyAyLFxuICAgICAgdG90YWxNaW51dGVzLFxuICAgICAgdG90YWxTZWNvbmRzLFxuICAgIH0pO1xuICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlb1xuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IGR1cmF0aW9uIC8gMjtcbiAgfVxuICBoYW5kbGVTbGlkZXJDaGFuZ2UgKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpO1xuICAgIC8vIHVwZGF0ZSB0aGUgc2xpZGVyIHZhbHVlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzbGlkZXJWYWx1ZTogdmFsdWUsXG4gICAgfSk7XG4gICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIHZpZGVvXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gdmFsdWUgLyAxMDA7XG4gIH1cbiAgY3JlYXRlVGh1bWJuYWlsICgpIHtcbiAgICAvLyB0YWtlIGEgc25hcHNob3RcbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIGNvbnN0IGJsb2IgPSBkYXRhVVJJdG9CbG9iKGRhdGFVcmwpO1xuICAgIGNvbnN0IHNuYXBzaG90ID0gbmV3IEZpbGUoW2Jsb2JdLCBgdGh1bWJuYWlsLnBuZ2AsIHtcbiAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgIH0pO1xuICAgIC8vIHNldCB0aGUgdGh1bWJuYWlsIGluIHJlZHV4IHN0b3JlXG4gICAgaWYgKHNuYXBzaG90KSB7XG4gICAgICB0aGlzLnByb3BzLm9uTmV3VGh1bWJuYWlsKHNuYXBzaG90KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCB2aWRlb1NvdXJjZSwgc2xpZGVyTWluUmFuZ2UsIHNsaWRlck1heFJhbmdlLCBzbGlkZXJWYWx1ZSwgdG90YWxNaW51dGVzLCB0b3RhbFNlY29uZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJz5UaHVtYm5haWw6PC9sYWJlbD5cbiAgICAgICAgPHZpZGVvXG4gICAgICAgICAgaWQ9J3ZpZGVvLXRodW1iLXBsYXllcidcbiAgICAgICAgICBwcmVsb2FkPSdtZXRhZGF0YSdcbiAgICAgICAgICBtdXRlZFxuICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogJ25vbmUnfX1cbiAgICAgICAgICBwbGF5c0lubGluZVxuICAgICAgICAgIG9uTG9hZGVkRGF0YT17dGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGF9XG4gICAgICAgICAgc3JjPXt2aWRlb1NvdXJjZX1cbiAgICAgICAgICBvblNlZWtlZD17dGhpcy5jcmVhdGVUaHVtYm5haWx9XG4gICAgICAgIC8+XG4gICAgICAgIHtcbiAgICAgICAgICBzbGlkZXJWYWx1ZSA/IChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcicgc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPjAnMDBcIjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+e3RvdGFsTWludXRlc30ne3RvdGFsU2Vjb25kc31cIjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPSdyYW5nZSdcbiAgICAgICAgICAgICAgICAgIG1pbj17c2xpZGVyTWluUmFuZ2V9XG4gICAgICAgICAgICAgICAgICBtYXg9e3NsaWRlck1heFJhbmdlfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NsaWRlclZhbHVlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGlkZXInXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnID5sb2FkaW5nLi4uIDwvcD5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgeyBlcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e2Vycm9yfTwvcD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+VXNlIHNsaWRlciB0byBzZXQgdGh1bWJuYWlsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVGh1bWJuYWlsSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvdmlldy5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7dXBkYXRlTWV0YWRhdGEsIHRvZ2dsZU1ldGFkYXRhSW5wdXRzfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgc2hvd01ldGFkYXRhSW5wdXRzOiBwdWJsaXNoLnNob3dNZXRhZGF0YUlucHV0cyxcbiAgICBkZXNjcmlwdGlvbiAgICAgICA6IHB1Ymxpc2gubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgbGljZW5zZSAgICAgICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLmxpY2Vuc2UsXG4gICAgbnNmdyAgICAgICAgICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLm5zZncsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25NZXRhZGF0YUNoYW5nZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVNZXRhZGF0YShuYW1lLCB2YWx1ZSkpO1xuICAgIH0sXG4gICAgb25Ub2dnbGVNZXRhZGF0YUlucHV0czogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh0b2dnbGVNZXRhZGF0YUlucHV0cyh2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXhwYW5kaW5nVGV4dEFyZWEgZnJvbSAnY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYSc7XG5cbmNsYXNzIFB1Ymxpc2hNZXRhZGF0YUlucHV0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRvZ2dsZVNob3dJbnB1dHMgPSB0aGlzLnRvZ2dsZVNob3dJbnB1dHMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0ID0gdGhpcy5oYW5kbGVTZWxlY3QuYmluZCh0aGlzKTtcbiAgfVxuICB0b2dnbGVTaG93SW5wdXRzICgpIHtcbiAgICB0aGlzLnByb3BzLm9uVG9nZ2xlTWV0YWRhdGFJbnB1dHMoIXRoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/IHRhcmdldC5jaGVja2VkIDogdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQubmFtZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgdmFsdWUpO1xuICB9XG4gIGhhbmRsZVNlbGVjdCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCBzZWxlY3RlZE9wdGlvbik7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0ncHVibGlzaC1kZXRhaWxzJyBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICB7dGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMgJiYgKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nbGFiZWwnPkRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8RXhwYW5kaW5nVGV4dEFyZWFcbiAgICAgICAgICAgICAgICAgIGlkPSdwdWJsaXNoLWRlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd0ZXh0YXJlYSB0ZXh0YXJlYS0tcHJpbWFyeSB0ZXh0YXJlYS0tZnVsbC13aWR0aCdcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezF9XG4gICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezIwMDB9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhIZWlnaHQ6IDIwMCB9fVxuICAgICAgICAgICAgICAgICAgbmFtZT0nZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nT3B0aW9uYWwgZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nbGFiZWwnPkxpY2Vuc2U6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgbmFtZT0nbGljZW5zZScgaWQ9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1wcmltYXJ5JyBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3R9PlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nICc+VW5zcGVjaWZpZWQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J1B1YmxpYyBEb21haW4nPlB1YmxpYyBEb21haW48L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J0NyZWF0aXZlIENvbW1vbnMnPkNyZWF0aXZlIENvbW1vbnM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1uc2Z3JyBjbGFzc05hbWU9J2xhYmVsJz5NYXR1cmU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J2lucHV0LWNoZWNrYm94JyB0eXBlPSdjaGVja2JveCcgaWQ9J3B1Ymxpc2gtbnNmdycgbmFtZT0nbnNmdycgdmFsdWU9e3RoaXMucHJvcHMubnNmd30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXNlY29uZGFyeScgb25DbGljaz17dGhpcy50b2dnbGVTaG93SW5wdXRzfT57dGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMgPyAnbGVzcycgOiAnbW9yZSd9PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hNZXRhZGF0YUlucHV0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy92aWV3LmpzeCIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBFeHBhbmRpbmdUZXh0YXJlYSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLl9oYW5kbGVDaGFuZ2UgPSB0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5hZGp1c3RUZXh0YXJlYSh7fSk7XG4gIH1cbiAgX2hhbmRsZUNoYW5nZSAoZXZlbnQpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UoZXZlbnQpO1xuICAgIHRoaXMuYWRqdXN0VGV4dGFyZWEoZXZlbnQpO1xuICB9XG4gIGFkanVzdFRleHRhcmVhICh7IHRhcmdldCA9IHRoaXMuZWwgfSkge1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgLi4ucmVzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPHRleHRhcmVhXG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgICByZWY9e3ggPT4gdGhpcy5lbCA9IHh9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2V9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuRXhwYW5kaW5nVGV4dGFyZWEucHJvcFR5cGVzID0ge1xuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRpbmdUZXh0YXJlYTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtzZXRQdWJsaXNoSW5DaGFubmVsLCB1cGRhdGVTZWxlY3RlZENoYW5uZWwsIHVwZGF0ZUVycm9yfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZTogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBwdWJsaXNoSW5DaGFubmVsICAgOiBwdWJsaXNoLnB1Ymxpc2hJbkNoYW5uZWwsXG4gICAgc2VsZWN0ZWRDaGFubmVsICAgIDogcHVibGlzaC5zZWxlY3RlZENoYW5uZWwsXG4gICAgY2hhbm5lbEVycm9yICAgICAgIDogcHVibGlzaC5lcnJvci5jaGFubmVsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uUHVibGlzaEluQ2hhbm5lbENoYW5nZTogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignY2hhbm5lbCcsIG51bGwpKTtcbiAgICAgIGRpc3BhdGNoKHNldFB1Ymxpc2hJbkNoYW5uZWwodmFsdWUpKTtcbiAgICB9LFxuICAgIG9uQ2hhbm5lbFNlbGVjdDogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignY2hhbm5lbCcsIG51bGwpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCh2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3QvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENoYW5uZWxMb2dpbkZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtJztcbmltcG9ydCBDaGFubmVsQ3JlYXRlRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtJztcbmltcG9ydCAqIGFzIHN0YXRlcyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMnO1xuXG5jbGFzcyBDaGFubmVsU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaCA9IHRoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICB0b2dnbGVBbm9ueW1vdXNQdWJsaXNoIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gJ2Fub255bW91cycpIHtcbiAgICAgIHRoaXMucHJvcHMub25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2UodHJ1ZSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZVNlbGVjdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxTZWxlY3Qoc2VsZWN0ZWRPcHRpb24pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdyYWRpbycgbmFtZT0nYW5vbnltb3VzLW9yLWNoYW5uZWwnIGlkPSdhbm9ueW1vdXMtcmFkaW8nIGNsYXNzTmFtZT0naW5wdXQtcmFkaW8nIHZhbHVlPSdhbm9ueW1vdXMnIGNoZWNrZWQ9eyF0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2h9IC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCBsYWJlbC0tcG9pbnRlcicgaHRtbEZvcj0nYW5vbnltb3VzLXJhZGlvJz5Bbm9ueW1vdXM8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdyYWRpbycgbmFtZT0nYW5vbnltb3VzLW9yLWNoYW5uZWwnIGlkPSdjaGFubmVsLXJhZGlvJyBjbGFzc05hbWU9J2lucHV0LXJhZGlvJyB2YWx1ZT0naW4gYSBjaGFubmVsJyBjaGVja2VkPXt0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2h9IC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCBsYWJlbC0tcG9pbnRlcicgaHRtbEZvcj0nY2hhbm5lbC1yYWRpbyc+SW4gYSBjaGFubmVsPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7IHRoaXMucHJvcHMuY2hhbm5lbEVycm9yID8gKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnByb3BzLmNoYW5uZWxFcnJvcn08L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5QdWJsaXNoIGFub255bW91c2x5IG9yIGluIGEgY2hhbm5lbDwvcD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsICYmIChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMnPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1uYW1lLXNlbGVjdCc+Q2hhbm5lbDo8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLW5hbWUtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93JyB2YWx1ZT17dGhpcy5wcm9wcy5zZWxlY3RlZENoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUgJiYgPG9wdGlvbiB2YWx1ZT17dGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lfSBpZD0ncHVibGlzaC1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e3RoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZX08L29wdGlvbj4gfVxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3N0YXRlcy5MT0dJTn0+RXhpc3Rpbmc8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzdGF0ZXMuQ1JFQVRFfT5OZXc8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsID09PSBzdGF0ZXMuTE9HSU4pICYmIDxDaGFubmVsTG9naW5Gb3JtIC8+IH1cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsID09PSBzdGF0ZXMuQ1JFQVRFKSAmJiA8Q2hhbm5lbENyZWF0ZUZvcm0gLz4gfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsU2VsZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY2xhc3MgQ2hhbm5lbExvZ2luRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3IgICA6IG51bGwsXG4gICAgICBuYW1lICAgIDogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9naW5Ub0NoYW5uZWwgPSB0aGlzLmxvZ2luVG9DaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1tuYW1lXTogdmFsdWV9KTtcbiAgfVxuICBsb2dpblRvQ2hhbm5lbCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZTogdGhpcy5zdGF0ZS5uYW1lLCBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZH0pLFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH07XG4gICAgcmVxdWVzdCgnbG9naW4nLCBwYXJhbXMpXG4gICAgICAudGhlbigoe3N1Y2Nlc3MsIGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihjaGFubmVsTmFtZSwgc2hvcnRDaGFubmVsSWQsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBtZXNzYWdlfSk7XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3J9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGZvcm0gaWQ9J2NoYW5uZWwtbG9naW4tZm9ybSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSc+XG4gICAgICAgICAgICAgIDxzcGFuPkA8L3NwYW4+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nY2hhbm5lbC1sb2dpbi1uYW1lLWlucHV0JyBjbGFzc05hbWU9J2lucHV0LXRleHQnIG5hbWU9J25hbWUnIHBsYWNlaG9sZGVyPSdZb3VyIENoYW5uZWwgTmFtZScgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1sb2dpbi1wYXNzd29yZC1pbnB1dCcgPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnknPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIGlkPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyBuYW1lPSdwYXNzd29yZCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBwbGFjZWhvbGRlcj0nJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsUGFzc3dvcmR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7IHRoaXMuc3RhdGUuZXJyb3IgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnN0YXRlLmVycm9yfTwvcD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+RW50ZXIgdGhlIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlJz5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmxvZ2luVG9DaGFubmVsfT5BdXRoZW50aWNhdGU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsTG9naW5Gb3JtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY2xhc3MgQ2hhbm5lbENyZWF0ZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgY2hhbm5lbCA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgc3RhdHVzICA6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dCA9IHRoaXMuaGFuZGxlQ2hhbm5lbElucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNyZWF0ZUNoYW5uZWwgPSB0aGlzLmNyZWF0ZUNoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBjbGVhbnNlQ2hhbm5lbElucHV0IChpbnB1dCkge1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxzKy9nLCAnLScpOyAvLyByZXBsYWNlIHNwYWNlcyB3aXRoIGRhc2hlc1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTktXS9nLCAnJyk7ICAvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksIG9yICctJ1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBoYW5kbGVDaGFubmVsSW5wdXQgKGV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5jbGVhbnNlQ2hhbm5lbElucHV0KHZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtjaGFubmVsOiB2YWx1ZX0pO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ1BsZWFzZSBlbnRlciBhIGNoYW5uZWwgbmFtZSd9KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1tuYW1lXTogdmFsdWV9KTtcbiAgfVxuICB1cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXF1ZXN0KGAvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LyR7Y2hhbm5lbFdpdGhBdFN5bWJvbH1gKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBudWxsfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICB9KTtcbiAgfVxuICBjaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSAoY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxXaXRoQXRTeW1ib2wgPSBgQCR7Y2hhbm5lbH1gO1xuICAgIHJldHVybiByZXF1ZXN0KGAvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LyR7Y2hhbm5lbFdpdGhBdFN5bWJvbH1gKTtcbiAgfVxuICBjaGVja0lzUGFzc3dvcmRQcm92aWRlZCAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFwYXNzd29yZCB8fCBwYXNzd29yZC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIHBhc3N3b3JkJykpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG4gIG1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QgKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZSwgcGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0KCcvc2lnbnVwJywgcGFyYW1zKVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVW5mb3J0dW5hdGVseSwgd2UgZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgY3JlYXRpbmcgeW91ciBjaGFubmVsLiBQbGVhc2UgbGV0IHVzIGtub3cgaW4gRGlzY29yZCEgJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgY3JlYXRlQ2hhbm5lbCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQodGhpcy5zdGF0ZS5wYXNzd29yZClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUodGhpcy5zdGF0ZS5jaGFubmVsKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogJ1dlIGFyZSBwdWJsaXNoaW5nIHlvdXIgbmV3IGNoYW5uZWwuICBTaXQgdGlnaHQuLi4nfSk7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QodGhpcy5zdGF0ZS5jaGFubmVsLCB0aGlzLnN0YXRlLnBhc3N3b3JkKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihyZXN1bHQuY2hhbm5lbE5hbWUsIHJlc3VsdC5zaG9ydENoYW5uZWxJZCwgcmVzdWx0LmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiBudWxsfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgeyAhdGhpcy5zdGF0ZS5zdGF0dXMgPyAoXG4gICAgICAgICAgPGZvcm0gaWQ9J3B1Ymxpc2gtY2hhbm5lbC1mb3JtJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J25ldy1jaGFubmVsLW5hbWUnPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tIHNwYW4tLXJlbGF0aXZlJz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nY2hhbm5lbCcgaWQ9J25ldy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9J2V4YW1wbGVDaGFubmVsTmFtZScgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbm5lbElucHV0fSAvPlxuICAgICAgICAgICAgICAgICAgeyAodGhpcy5zdGF0ZS5jaGFubmVsICYmICF0aGlzLnN0YXRlLmVycm9yKSAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1zdWNjZXNzIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTMnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxNid9PC9zcGFuPiB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1wYXNzd29yZCc+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgbmFtZT0ncGFzc3dvcmQnIGlkPSduZXctY2hhbm5lbC1wYXNzd29yZCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyAgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgPyAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+Q2hvb3NlIGEgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMuY3JlYXRlQ2hhbm5lbH0+Q3JlYXRlIENoYW5uZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz57dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ3JlYXRlRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJbmFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0taW5hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluYWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NsZWFyRmlsZX0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHN0YXR1cyA6IHB1Ymxpc2guc3RhdHVzLnN0YXR1cyxcbiAgICBtZXNzYWdlOiBwdWJsaXNoLnN0YXR1cy5tZXNzYWdlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBjbGVhckZpbGUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0ICogYXMgcHVibGlzaFN0YXRlcyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMnO1xuXG5jbGFzcyBQdWJsaXNoU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1cywgbWVzc2FnZSwgY2xlYXJGaWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5MT0FEX1NUQVJUICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPkZpbGUgaXMgbG9hZGluZyB0byBzZXJ2ZXI8L3A+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz4wJTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5MT0FESU5HICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICA8cD5GaWxlIGlzIGxvYWRpbmcgdG8gc2VydmVyPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz57bWVzc2FnZX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuUFVCTElTSElORyAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5VcGxvYWQgY29tcGxldGUuICBZb3VyIGZpbGUgaXMgbm93IGJlaW5nIHB1Ymxpc2hlZCBvbiB0aGUgYmxvY2tjaGFpbi4uLjwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPHA+Q3VyaW91cyB3aGF0IG1hZ2ljIGlzIGhhcHBlbmluZyBoZXJlPyA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9mYXEvd2hhdC1pcy1sYnJ5Jz5MZWFybiBtb3JlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuU1VDQ0VTUyAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5Zb3VyIHB1Ymxpc2ggaXMgY29tcGxldGUhIFlvdSBhcmUgYmVpbmcgcmVkaXJlY3RlZCB0byBpdCBub3cuPC9wPlxuICAgICAgICAgIDxwPklmIHlvdSBhcmUgbm90IGF1dG9tYXRpY2FsbHkgcmVkaXJlY3RlZCwgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17bWVzc2FnZX0+Y2xpY2sgaGVyZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkZBSUxFRCAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5Tb21ldGhpbmcgd2VudCB3cm9uZy4uLjwvcD5cbiAgICAgICAgICA8cD48c3Ryb25nPnttZXNzYWdlfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICA8cD5Gb3IgaGVscCwgcG9zdCB0aGUgYWJvdmUgZXJyb3IgdGV4dCBpbiB0aGUgI3NwZWVjaCBjaGFubmVsIG9uIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJyB0YXJnZXQ9J19ibGFuayc+bGJyeSBkaXNjb3JkPC9hPjwvcD5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1zZWNvbmRhcnknIG9uQ2xpY2s9e2NsZWFyRmlsZX0+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hTdGF0dXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL3ZpZXcuanN4IiwiZXhwb3J0IGNvbnN0IExPQURfU1RBUlQgPSAnTE9BRF9TVEFSVCc7XG5leHBvcnQgY29uc3QgTE9BRElORyA9ICdMT0FESU5HJztcbmV4cG9ydCBjb25zdCBQVUJMSVNISU5HID0gJ1BVQkxJU0hJTkcnO1xuZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgRkFJTEVEID0gJ0ZBSUxFRCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2xhaW1fc3RhdGVzLmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlOiBwdWJsaXNoLmRpc2FibGVkTWVzc2FnZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5wcm9wcy5tZXNzYWdlO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLnByb3BzLm1lc3NhZ2U6JywgbWVzc2FnZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgZHJvcHpvbmUtLWRpc2FibGVkIHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LS1kaXNhYmxlZCc+UHVibGlzaGluZyBpcyBjdXJyZW50bHkgZGlzYWJsZWQuPC9wPlxuICAgICAgICA8cCBjbGFzc05hbWU9J3RleHQtLWRpc2FibGVkJz57bWVzc2FnZX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5cbmNsYXNzIEFib3V0UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnQWJvdXQnfSBwYWdlVXJpPXsnYWJvdXQnfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdwdWxsLXF1b3RlJz5TcGVlLmNoIGlzIGFuIG9wZW4tc291cmNlIHByb2plY3QuICBQbGVhc2UgY29udHJpYnV0ZSB0byB0aGUgZXhpc3Rpbmcgc2l0ZSwgb3IgZm9yayBpdCBhbmQgbWFrZSB5b3VyIG93bi48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vdHdpdHRlci5jb20vc3BlZV9jaCc+VFdJVFRFUjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+R0lUSFVCPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPkRJU0NPUkQgQ0hBTk5FTDwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9ibG9iL21hc3Rlci9SRUFETUUubWQnPkRPQ1VNRU5UQVRJT048L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgbWVkaWEtaG9zdGluZyBzaXRlIHRoYXQgcmVhZHMgZnJvbSBhbmQgcHVibGlzaGVzIGNvbnRlbnQgdG8gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvJz5MQlJZPC9hPiBibG9ja2NoYWluLjwvcD5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIGhvc3Rpbmcgc2VydmljZSwgYnV0IHdpdGggdGhlIGFkZGVkIGJlbmVmaXQgdGhhdCBpdCBzdG9yZXMgeW91ciBjb250ZW50IG9uIGEgZGVjZW50cmFsaXplZCBuZXR3b3JrIG9mIGNvbXB1dGVycyAtLSB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8vZ2V0Jz5MQlJZPC9hPiBuZXR3b3JrLiAgVGhpcyBtZWFucyB0aGF0IHlvdXIgaW1hZ2VzIGFyZSBzdG9yZWQgaW4gbXVsdGlwbGUgbG9jYXRpb25zIHdpdGhvdXQgYSBzaW5nbGUgcG9pbnQgb2YgZmFpbHVyZS48L3A+XG4gICAgICAgICAgICAgIDxoMz5Db250cmlidXRlPC9oMz5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IGhhdmUgYW4gaWRlYSBmb3IgeW91ciBvd24gc3BlZS5jaC1saWtlIHNpdGUgb24gdG9wIG9mIExCUlksIGZvcmsgb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5naXRodWIgcmVwbzwvYT4gYW5kIGdvIHRvIHRvd24hPC9wPlxuICAgICAgICAgICAgICA8cD5JZiB5b3Ugd2FudCB0byBpbXByb3ZlIHNwZWUuY2gsIGpvaW4gb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPmRpc2NvcmQgY2hhbm5lbDwvYT4gb3Igc29sdmUgb25lIG9mIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9pc3N1ZXMnPmdpdGh1YiBpc3N1ZXM8L2E+LjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9BYm91dFBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IENoYW5uZWxMb2dpbkZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtJztcbmltcG9ydCBDaGFubmVsQ3JlYXRlRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtJztcblxuY2xhc3MgTG9naW5QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICAvLyByZS1yb3V0ZSB0aGUgdXNlciB0byB0aGUgaG9tZXBhZ2UgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgaWYgKG5ld1Byb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUgIT09IHRoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSkge1xuICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9gKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydMb2dpbid9IHBhZ2VVcmk9eydsb2dpbid9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5DaGFubmVscyBhbGxvdyB5b3UgdG8gcHVibGlzaCBhbmQgZ3JvdXAgY29udGVudCB1bmRlciBhbiBpZGVudGl0eS4gWW91IGNhbiBjcmVhdGUgYSBjaGFubmVsIGZvciB5b3Vyc2VsZiwgb3Igc2hhcmUgb25lIHdpdGggbGlrZS1taW5kZWQgZnJpZW5kcy4gIFlvdSBjYW4gY3JlYXRlIDEgY2hhbm5lbCwgb3IgMTAwLCBzbyB3aGV0aGVyIHlvdSdyZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPScvQGNhdGFsb25pYTIwMTc6NDNkY2Y0NzE2M2NhYTIxZDg0MDRkOWZlOWIzMGY3OGVmM2UxNDZhOCc+ZG9jdW1lbnRpbmcgaW1wb3J0YW50IGV2ZW50czwvYT4sIG9yIG1ha2luZyBhIHB1YmxpYyByZXBvc2l0b3J5IGZvciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPScvQGNhdEdpZnMnPmNhdCBnaWZzPC9hPiAocGFzc3dvcmQ6ICcxMjM0JyksIHRyeSBjcmVhdGluZyBhIGNoYW5uZWwgZm9yIGl0ITwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0naDMtLW5vLWJvdHRvbSc+TG9nIGluIHRvIGFuIGV4aXN0aW5nIGNoYW5uZWw6PC9oMz5cbiAgICAgICAgICAgICAgPENoYW5uZWxMb2dpbkZvcm0gLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0naDMtLW5vLWJvdHRvbSc+Q3JlYXRlIGEgYnJhbmQgbmV3IGNoYW5uZWw6PC9oMz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDcmVhdGVGb3JtIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKExvZ2luUGFnZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZXJyb3IgICAgICA6IHNob3cucmVxdWVzdC5lcnJvcixcbiAgICByZXF1ZXN0VHlwZTogc2hvdy5yZXF1ZXN0LnR5cGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uSGFuZGxlU2hvd1BhZ2VVcmksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgU2hvd0Fzc2V0TGl0ZSBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldExpdGUnO1xuaW1wb3J0IFNob3dBc3NldERldGFpbHMgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzJztcbmltcG9ydCBTaG93Q2hhbm5lbCBmcm9tICdjb250YWluZXJzL1Nob3dDaGFubmVsJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG5jbGFzcyBTaG93UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMubWF0Y2gucGFyYW1zICE9PSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcykge1xuICAgICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHJlcXVlc3RUeXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEVycm9yUGFnZSBlcnJvcj17ZXJyb3J9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBzd2l0Y2ggKHJlcXVlc3RUeXBlKSB7XG4gICAgICBjYXNlIENIQU5ORUw6XG4gICAgICAgIHJldHVybiA8U2hvd0NoYW5uZWwgLz47XG4gICAgICBjYXNlIEFTU0VUX0xJVEU6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0TGl0ZSAvPjtcbiAgICAgIGNhc2UgQVNTRVRfREVUQUlMUzpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXREZXRhaWxzIC8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxwPmxvYWRpbmcuLi48L3A+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd1BhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5cbmNsYXNzIFNob3dMaXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGE7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyIHNob3ctbGl0ZS1jb250YWluZXInPlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgIDxMaW5rIGlkPSdhc3NldC1ib2lsZXJwYXRlJyBjbGFzc05hbWU9J2xpbmstLXByaW1hcnkgZmluZS1wcmludCcgdG89e2AvJHtjbGFpbUlkfS8ke25hbWV9YH0+aG9zdGVkXG4gICAgICAgICAgICB2aWEgU3BlZS5jaDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwPmxvYWRpbmcgYXNzZXQgZGF0YS4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dMaXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgeyBMT0NBTF9DSEVDSywgVU5BVkFJTEFCTEUsIEVSUk9SLCBBVkFJTEFCTEUgfSBmcm9tICdjb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMnO1xuXG5jbGFzcyBBc3NldERpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vbkZpbGVSZXF1ZXN0KG5hbWUsIGNsYWltSWQpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIGVycm9yLCBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgY29udGVudFR5cGUsIGZpbGVFeHQsIHRodW1ibmFpbCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J2Fzc2V0LWRpc3BsYXktY29tcG9uZW50Jz5cbiAgICAgICAgeyhzdGF0dXMgPT09IExPQ0FMX0NIRUNLKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPkNoZWNraW5nIHRvIHNlZSBpZiBTcGVlLmNoIGhhcyB5b3VyIGFzc2V0IGxvY2FsbHkuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBVTkFWQUlMQUJMRSkgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5TaXQgdGlnaHQsIHdlJ3JlIHNlYXJjaGluZyB0aGUgTEJSWSBibG9ja2NoYWluIGZvciB5b3VyIGFzc2V0ITwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPHA+Q3VyaW91cyB3aGF0IG1hZ2ljIGlzIGhhcHBlbmluZyBoZXJlPyA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9mYXEvd2hhdC1pcy1sYnJ5Jz5MZWFybiBtb3JlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBFUlJPUikgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5VbmZvcnR1bmF0ZWx5LCB3ZSBjb3VsZG4ndCBkb3dubG9hZCB5b3VyIGFzc2V0IGZyb20gTEJSWS4gIFlvdSBjYW4gaGVscCB1cyBvdXQgYnkgc2hhcmluZyB0aGUgYmVsb3cgZXJyb3IgbWVzc2FnZSBpbiB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUycgdGFyZ2V0PSdfYmxhbmsnPkxCUlkgZGlzY29yZDwvYT4uPC9wPlxuICAgICAgICAgIDxpPjxwIGlkPSdlcnJvci1tZXNzYWdlJz57ZXJyb3J9PC9wPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEFWQUlMQUJMRSkgJiZcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfSAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dmlkZW8gY2xhc3NOYW1lPSdhc3NldCB2aWRlbycgY29udHJvbHMgcG9zdGVyPXt0aHVtYm5haWx9PlxuICAgICAgICAgICAgICAgICAgPHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxwPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT52aWRlbzwvY29kZT4gZWxlbWVudC48L3A+XG4gICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+VW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldERpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgQXNzZXRUaXRsZSBmcm9tICdjb250YWluZXJzL0Fzc2V0VGl0bGUnO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5pbXBvcnQgQXNzZXRJbmZvIGZyb20gJ2NvbnRhaW5lcnMvQXNzZXRJbmZvJztcblxuY2xhc3MgU2hvd0Fzc2V0RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXNzZXQpIHtcbiAgICAgIGNvbnN0IHsgY2xhaW1EYXRhOiB7IG5hbWUgfSB9ID0gYXNzZXQ7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtgJHtuYW1lfSAtIGRldGFpbHNgfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxBc3NldFRpdGxlIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCBzaG93LWRldGFpbHMtY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICA8QXNzZXREaXNwbGF5IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgICAgICA8QXNzZXRJbmZvIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBhc3NldCBkYXRhLi4uJ30gLz5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93QXNzZXREZXRhaWxzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YTogeyB0aXRsZSB9IH0gPSBzZWxlY3RBc3NldChzaG93KTtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBc3NldFRpdGxlID0gKHsgdGl0bGUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtLWxhcmdlJz57dGl0bGV9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRUaXRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIEFzc2V0SW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNvcHlUb0NsaXBib2FyZCA9IHRoaXMuY29weVRvQ2xpcGJvYXJkLmJpbmQodGhpcyk7XG4gIH1cbiAgY29weVRvQ2xpcGJvYXJkIChldmVudCkge1xuICAgIHZhciBlbGVtZW50VG9Db3B5ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuZWxlbWVudHRvY29weTtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb0NvcHkpO1xuICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ09vcHMsIHVuYWJsZSB0byBjb3B5J30pO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgc2hvcnRJZCwgY2xhaW1EYXRhIDogeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgZGVzY3JpcHRpb24sIG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwsIGhvc3QgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7Y2hhbm5lbE5hbWUgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+Q2hhbm5lbDo8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz48TGluayB0bz17YC8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9YH0+e2NoYW5uZWxOYW1lfTwvTGluaz48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAge2Rlc2NyaXB0aW9uICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPntkZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgPGRpdiBpZD0nc2hvdy1zaGFyZS1idXR0b25zJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSBmbGV4LWNvbnRhaW5lci0td3JhcCc+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT50d2l0dGVyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PmZhY2Vib29rPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwOi8vdHVtYmxyLmNvbS93aWRnZXRzL3NoYXJlL3Rvb2w/Y2Fub25pY2FsVXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHVtYmxyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5yZWRkaXQuY29tL3N1Ym1pdD91cmw9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0mdGl0bGU9JHtuYW1lfWB9PnJlZGRpdDwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hvcnQtbGluayc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+TGluazo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1zaG9ydC1saW5rJyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nc2hvcnQtbGluaycgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Ake2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEnIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTInPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLXdpZGUnIGRhdGEtZWxlbWVudHRvY29weT0nc2hvcnQtbGluaydcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jb3B5VG9DbGlwYm9hcmR9PmNvcHlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBpZD0nc2hvdy1lbWJlZC1jb2RlJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5FbWJlZDo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1lbWJlZC10ZXh0JyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHsoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnKSA/IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPHZpZGVvIHdpZHRoPVwiMTAwJVwiIGNvbnRyb2xzIHBvc3Rlcj1cIiR7dGh1bWJuYWlsfVwiIHNyYz1cIiR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1cIi8+PC92aWRlbz5gfSAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPGltZyBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPmB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J2VtYmVkLXRleHQnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tYm90dG9tJz5cbiAgICAgICAgICA8TGluayBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRvPXtgLyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0+PHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dCc+RGlyZWN0IExpbms8L3NwYW4+PC9MaW5rPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj17YCR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfSBkb3dubG9hZD17bmFtZX0+RG93bmxvYWQ8L2E+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2RtY2EnPlJlcG9ydDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0SW5mbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCByZXF1ZXN0XG4gIGNvbnN0IHByZXZpb3VzUmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICAvLyBzZWxlY3QgY2hhbm5lbFxuICBsZXQgY2hhbm5lbDtcbiAgaWYgKHByZXZpb3VzUmVxdWVzdCkge1xuICAgIGNvbnN0IGNoYW5uZWxLZXkgPSBwcmV2aW91c1JlcXVlc3Qua2V5O1xuICAgIGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsQ2xhaW1zRGlzcGxheSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5JztcblxuY2xhc3MgU2hvd0NoYW5uZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBsb25nSWQsIHNob3J0SWQgfSA9IGNoYW5uZWw7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBjaGFubmVsPXtjaGFubmVsfSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8aDI+Y2hhbm5lbCBuYW1lOiB7bmFtZX08L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eydmaW5lLXByaW50J30+ZnVsbCBjaGFubmVsIGlkOiB7bG9uZ0lkfTwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PnNob3J0IGNoYW5uZWwgaWQ6IHtzaG9ydElkfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDbGFpbXNEaXNwbGF5IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGNoYW5uZWwgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0NoYW5uZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvblVwZGF0ZUNoYW5uZWxDbGFpbXMgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGtleVxuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtzaG93LnJlcXVlc3QuaWRdO1xuICBjb25zdCBjaGFubmVsS2V5ID0gcmVxdWVzdC5rZXk7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGNsYWltc1xuICBjb25zdCBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsS2V5LFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uVXBkYXRlQ2hhbm5lbENsYWltcyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFzc2V0UHJldmlldyBmcm9tICdjb21wb25lbnRzL0Fzc2V0UHJldmlldyc7XG5cbmNsYXNzIENoYW5uZWxDbGFpbXNEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gIH1cbiAgc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgLSAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UocHJldmlvdXNQYWdlKTtcbiAgfVxuICBzaG93TmV4dFJlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgKyAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UobmV4dFBhZ2UpO1xuICB9XG4gIHNob3dOZXdQYWdlIChwYWdlKSB7XG4gICAgY29uc3QgeyBjaGFubmVsS2V5LCBjaGFubmVsOiB7IG5hbWUsIGxvbmdJZCB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25VcGRhdGVDaGFubmVsQ2xhaW1zKGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjbGFpbXMsIGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwnPlxuICAgICAgICB7KGNsYWltcy5sZW5ndGggPiAwKSA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge2NsYWltcy5tYXAoKGNsYWltLCBpbmRleCkgPT4gPEFzc2V0UHJldmlld1xuICAgICAgICAgICAgICBjbGFpbURhdGE9e2NsYWltfVxuICAgICAgICAgICAgICBrZXk9e2Ake2NsYWltLm5hbWV9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgIC8+KX1cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPiAxKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZX0+UHJldmlvdXMgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlfT5OZXh0IFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+VGhlcmUgYXJlIG5vIGNsYWltcyBpbiB0aGlzIGNoYW5uZWw8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ2xhaW1zRGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7c2l0ZToge2RlZmF1bHRzOiB7IGRlZmF1bHRUaHVtYm5haWwgfX19KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNvbnN0IEFzc2V0UHJldmlldyA9ICh7IGRlZmF1bHRUaHVtYm5haWwsIGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsIH0gfSkgPT4ge1xuICBjb25zdCBkaXJlY3RTb3VyY2VMaW5rID0gYCR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YDtcbiAgY29uc3Qgc2hvd1VybExpbmsgPSBgLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2Fzc2V0LWhvbGRlcic+XG4gICAgICA8TGluayB0bz17c2hvd1VybExpbmt9ID5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e2RpcmVjdFNvdXJjZUxpbmt9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyB2aWRlbyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e3RodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPnVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCl9XG4gICAgICA8L0xpbms+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZTogeyBob3N0LCB0aXRsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jbGFzcyBGb3VyT2hGb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7dGl0bGUsIGhvc3R9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfSAtIDQwNDwvdGl0bGU+XG4gICAgICAgICAgPGxpbmsgcmVsPSdjYW5vbmljYWwnIGhyZWY9e2Ake2hvc3R9LzQwNGB9IC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxoMj40MDQ8L2gyPlxuICAgICAgICAgIDxwPlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3VyT2hGb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJjb25zdCB7IGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IHNlbmRFbWJlZFBhZ2UgPSAoeyBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAvLyBnZXQgYW5kIHJlbmRlciB0aGUgY29udGVudFxuICByZXMuc3RhdHVzKDIwMCkucmVuZGVyKCdlbWJlZCcsIHsgbGF5b3V0OiAnZW1iZWQnLCBob3N0LCBjbGFpbUlkLCBuYW1lIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kRW1iZWRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwiY29uc3QgcmVkaXJlY3QgPSAocm91dGUpID0+IHtcbiAgcmV0dXJuIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zdGF0dXMoMzAxKS5yZWRpcmVjdChyb3V0ZSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZGlyZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9yZWRpcmVjdC5qcyIsImNvbnN0IHNlcnZlQXNzZXRCeUNsYWltID0gcmVxdWlyZSgnLi9zZXJ2ZUFzc2V0QnlDbGFpbScpO1xuY29uc3Qgc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltID0gcmVxdWlyZSgnLi9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwLCBkYikgPT4ge1xuICBhcHAuZ2V0KCcvOmlkZW50aWZpZXIvOmNsYWltJywgc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltKTtcbiAgYXBwLmdldCgnLzpjbGFpbScsIHNlcnZlQXNzZXRCeUNsYWltKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9pbmRleC5qcyIsImNvbnN0IHsgc2VuZEdBU2VydmVFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MnKTtcbmNvbnN0IHsgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlLCBsb2dSZXF1ZXN0RGF0YSwgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlcnZlIGFuIGFzc2V0IG9yIHRoZSByZWFjdCBhcHAgdmlhIHRoZSBjbGFpbSBuYW1lIG9ubHlcblxuKi9cblxuY29uc3Qgc2VydmVyQXNzZXRCeUNsYWltID0gKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgfVxuICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgbGV0IGNsYWltTmFtZTtcbiAgdHJ5IHtcbiAgICAoe2NsYWltTmFtZX0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIG51bGwsIG51bGwpO1xuICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChudWxsLCBudWxsLCBjbGFpbU5hbWUsIG51bGwsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmVyQXNzZXRCeUNsYWltO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYVwiXG4vLyBtb2R1bGUgaWQgPSAxNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IG9uUmVxdWVzdEVycm9yLCBvbk5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBuZXdBc3NldFJlcXVlc3QgfSBmcm9tICdzYWdhcy9zaG93X2Fzc2V0JztcbmltcG9ydCB7IG5ld0NoYW5uZWxSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19jaGFubmVsJztcbmltcG9ydCBsYnJ5VXJpIGZyb20gJ3V0aWxzL2xicnlVcmknO1xuXG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlSWRlbnRpZmllckFuZENsYWltIChtb2RpZmllciwgY2xhaW0pIHtcbiAgLy8gdGhpcyBpcyBhIHJlcXVlc3QgZm9yIGFuIGFzc2V0XG4gIC8vIGNsYWltIHdpbGwgYmUgYW4gYXNzZXQgY2xhaW1cbiAgLy8gdGhlIGlkZW50aWZpZXIgY291bGQgYmUgYSBjaGFubmVsIG9yIGEgY2xhaW0gaWRcbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkLCBjbGFpbU5hbWUsIGV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIobW9kaWZpZXIpKTtcbiAgICAoeyBjbGFpbU5hbWUsIGV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZUNsYWltKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gdHJpZ2dlciBhbiBuZXcgYWN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RvcmVcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGV4dGVuc2lvbikpO1xuICB9O1xuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBjbGFpbUlkLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cbmZ1bmN0aW9uICogcGFyc2VBbmRVcGRhdGVDbGFpbU9ubHkgKGNsYWltKSB7XG4gIC8vIHRoaXMgY291bGQgYmUgYSByZXF1ZXN0IGZvciBhbiBhc3NldCBvciBhIGNoYW5uZWwgcGFnZVxuICAvLyBjbGFpbSBjb3VsZCBiZSBhbiBhc3NldCBjbGFpbSBvciBhIGNoYW5uZWwgY2xhaW1cbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIC8vIHJldHVybiBlYXJseSBpZiB0aGlzIHJlcXVlc3QgaXMgZm9yIGEgY2hhbm5lbFxuICBpZiAoaXNDaGFubmVsKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwobmV3Q2hhbm5lbFJlcXVlc3QsIG9uTmV3Q2hhbm5lbFJlcXVlc3QoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSk7XG4gIH1cbiAgLy8gaWYgbm90IGZvciBhIGNoYW5uZWwsIHBhcnNlIHRoZSBjbGFpbSByZXF1ZXN0XG4gIGxldCBjbGFpbU5hbWUsIGV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoe2NsYWltTmFtZSwgZXh0ZW5zaW9ufSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIG51bGwsIG51bGwsIG51bGwsIGV4dGVuc2lvbikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiBoYW5kbGVTaG93UGFnZVVyaSAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgaWRlbnRpZmllciwgY2xhaW0gfSA9IGFjdGlvbi5kYXRhO1xuICBpZiAoaWRlbnRpZmllcikge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKHBhcnNlQW5kVXBkYXRlSWRlbnRpZmllckFuZENsYWltLCBpZGVudGlmaWVyLCBjbGFpbSk7XG4gIH1cbiAgeWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUNsYWltT25seSwgY2xhaW0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hIYW5kbGVTaG93UGFnZVVyaSAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5IQU5ETEVfU0hPV19VUkksIGhhbmRsZVNob3dQYWdlVXJpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd191cmkuanMiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgYWRkQXNzZXRUb0Fzc2V0TGlzdCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRMb25nQ2xhaW1JZCwgZ2V0U2hvcnRJZCwgZ2V0Q2xhaW1EYXRhIH0gZnJvbSAnYXBpL2Fzc2V0QXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcbmltcG9ydCB7IHNlbGVjdFNpdGVIb3N0IH0gZnJvbSAnc2VsZWN0b3JzL3NpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdBc3NldFJlcXVlc3QgKGFjdGlvbikge1xuICBjb25zdCB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIG5hbWUsIG1vZGlmaWVyIH0gPSBhY3Rpb24uZGF0YTtcbiAgLy8gcHV0IGFuIGFjdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgaW4gcmVkdXhcbiAgeWllbGQgcHV0KG9uUmVxdWVzdFVwZGF0ZShyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgcmVxdWVzdD9cbiAgLy8gSWYgdGhpcyB1cmkgaXMgaW4gdGhlIHJlcXVlc3QgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBjb25zdCBzdGF0ZSA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaG93U3RhdGUpO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgbG9uZyBpZCAmJiBhZGQgcmVxdWVzdCB0byByZXF1ZXN0IGxpc3RcbiAgbGV0IGxvbmdJZDtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGxvbmdJZH0gPSB5aWVsZCBjYWxsKGdldExvbmdDbGFpbUlkLCBob3N0LCBuYW1lLCBtb2RpZmllcikpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIGNvbnN0IGFzc2V0S2V5ID0gYGEjJHtuYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBhc3NldEtleSkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIGFzc2V0P1xuICAvLyBJZiB0aGlzIGFzc2V0IGlzIGluIHRoZSBhc3NldCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGlmIChzdGF0ZS5hc3NldExpc3RbYXNzZXRLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IHNob3J0IElkXG4gIGxldCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7ZGF0YTogc2hvcnRJZH0gPSB5aWVsZCBjYWxsKGdldFNob3J0SWQsIGhvc3QsIG5hbWUsIGxvbmdJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIGdldCBhc3NldCBjbGFpbSBkYXRhXG4gIGxldCBjbGFpbURhdGE7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBjbGFpbURhdGF9ID0geWllbGQgY2FsbChnZXRDbGFpbURhdGEsIGhvc3QsIG5hbWUsIGxvbmdJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIGFkZCBhc3NldCB0byBhc3NldCBsaXN0XG4gIHlpZWxkIHB1dChhZGRBc3NldFRvQXNzZXRMaXN0KGFzc2V0S2V5LCBudWxsLCBuYW1lLCBsb25nSWQsIHNob3J0SWQsIGNsYWltRGF0YSkpO1xuICAvLyBjbGVhciBhbnkgZXJyb3JzIGluIHJlcXVlc3QgZXJyb3JcbiAgeWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKG51bGwpKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3QXNzZXRSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLCBuZXdBc3NldFJlcXVlc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X2Fzc2V0LmpzIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb25nQ2xhaW1JZCAoaG9zdCwgbmFtZSwgbW9kaWZpZXIpIHtcbiAgbGV0IGJvZHkgPSB7fTtcbiAgLy8gY3JlYXRlIHJlcXVlc3QgcGFyYW1zXG4gIGlmIChtb2RpZmllcikge1xuICAgIGlmIChtb2RpZmllci5pZCkge1xuICAgICAgYm9keVsnY2xhaW1JZCddID0gbW9kaWZpZXIuaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlbJ2NoYW5uZWxOYW1lJ10gPSBtb2RpZmllci5jaGFubmVsLm5hbWU7XG4gICAgICBib2R5WydjaGFubmVsQ2xhaW1JZCddID0gbW9kaWZpZXIuY2hhbm5lbC5pZDtcbiAgICB9XG4gIH1cbiAgYm9keVsnY2xhaW1OYW1lJ10gPSBuYW1lO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICB9O1xuICAvLyBjcmVhdGUgdXJsXG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9sb25nLWlkYDtcbiAgLy8gcmV0dXJuIHRoZSByZXF1ZXN0IHByb21pc2VcbiAgcmV0dXJuIFJlcXVlc3QodXJsLCBwYXJhbXMpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNob3J0SWQgKGhvc3QsIG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL3Nob3J0LWlkLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhaW1EYXRhIChob3N0LCBuYW1lLCBjbGFpbUlkKSB7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9kYXRhLyR7bmFtZX0vJHtjbGFpbUlkfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwaS9hc3NldEFwaS5qcyIsImltcG9ydCB7Y2FsbCwgcHV0LCBzZWxlY3QsIHRha2VMYXRlc3R9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCwgYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QsIG9uUmVxdWVzdEVycm9yLCBvblJlcXVlc3RVcGRhdGUsIHVwZGF0ZUNoYW5uZWxDbGFpbXMgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgZ2V0Q2hhbm5lbENsYWltcywgZ2V0Q2hhbm5lbERhdGEgfSBmcm9tICdhcGkvY2hhbm5lbEFwaSc7XG5pbXBvcnQgeyBzZWxlY3RTaG93U3RhdGUgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RTaXRlSG9zdCB9IGZyb20gJ3NlbGVjdG9ycy9zaXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3Q2hhbm5lbFJlcXVlc3QgKGFjdGlvbikge1xuICBjb25zdCB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQgfSA9IGFjdGlvbi5kYXRhO1xuICAvLyBwdXQgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBpbiByZWR1eFxuICB5aWVsZCBwdXQob25SZXF1ZXN0VXBkYXRlKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyByZXF1ZXN0P1xuICAvLyBJZiB0aGlzIHVyaSBpcyBpbiB0aGUgcmVxdWVzdCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGNvbnN0IHN0YXRlID0geWllbGQgc2VsZWN0KHNlbGVjdFNob3dTdGF0ZSk7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBpZiAoc3RhdGUucmVxdWVzdExpc3RbcmVxdWVzdElkXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBjaGFubmVsIGxvbmcgaWRcbiAgbGV0IGxvbmdJZCwgc2hvcnRJZDtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiB7bG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nSWQsIHNob3J0Q2hhbm5lbENsYWltSWQ6IHNob3J0SWR9IH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxEYXRhLCBob3N0LCBjaGFubmVsTmFtZSwgY2hhbm5lbElkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gc3RvcmUgdGhlIHJlcXVlc3QgaW4gdGhlIGNoYW5uZWwgcmVxdWVzdHMgbGlzdFxuICBjb25zdCBjaGFubmVsS2V5ID0gYGMjJHtjaGFubmVsTmFtZX0jJHtsb25nSWR9YDtcbiAgeWllbGQgcHV0KGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0KHJlcXVlc3RJZCwgbnVsbCwgY2hhbm5lbEtleSkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIGNoYW5uZWw/XG4gIC8vIElmIHRoaXMgY2hhbm5lbCBpcyBpbiB0aGUgY2hhbm5lbCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGlmIChzdGF0ZS5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBjaGFubmVsIGNsYWltcyBkYXRhXG4gIGxldCBjbGFpbXNEYXRhO1xuICB0cnkge1xuICAgICh7IGRhdGE6IGNsYWltc0RhdGEgfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbENsYWltcywgaG9zdCwgbG9uZ0lkLCBjaGFubmVsTmFtZSwgMSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHN0b3JlIHRoZSBjaGFubmVsIGRhdGEgaW4gdGhlIGNoYW5uZWwgbGlzdFxuICB5aWVsZCBwdXQoYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QoY2hhbm5lbEtleSwgY2hhbm5lbE5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSkpO1xuICAvLyBjbGVhciBhbnkgcmVxdWVzdCBlcnJvcnNcbiAgeWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKG51bGwpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hOZXdDaGFubmVsUmVxdWVzdCAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5DSEFOTkVMX1JFUVVFU1RfTkVXLCBuZXdDaGFubmVsUmVxdWVzdCk7XG59O1xuXG5mdW5jdGlvbiAqIGdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwgKGFjdGlvbikge1xuICBjb25zdCB7IGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSB9ID0gYWN0aW9uLmRhdGE7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIGhvc3QsIGxvbmdJZCwgbmFtZSwgcGFnZSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIHlpZWxkIHB1dCh1cGRhdGVDaGFubmVsQ2xhaW1zKGNoYW5uZWxLZXksIGNsYWltc0RhdGEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hVcGRhdGVDaGFubmVsQ2xhaW1zICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQywgZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd19jaGFubmVsLmpzIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFubmVsRGF0YSAoaG9zdCwgaWQsIG5hbWUpIHtcbiAgaWYgKCFpZCkgaWQgPSAnbm9uZSc7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jaGFubmVsL2RhdGEvJHtuYW1lfS8ke2lkfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbENsYWltcyAoaG9zdCwgbG9uZ0lkLCBuYW1lLCBwYWdlKSB7XG4gIGlmICghcGFnZSkgcGFnZSA9IDE7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jaGFubmVsL2NsYWltcy8ke25hbWV9LyR7bG9uZ0lkfS8ke3BhZ2V9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBpL2NoYW5uZWxBcGkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgaXNDaGFubmVsID0gdmFsdWUuc3RhcnRzV2l0aChtb2R1bGUuZXhwb3J0cy5DSEFOTkVMX0NIQVIpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gaXNDaGFubmVsID8gdmFsdWUgOiBudWxsO1xuICAgIGxldCBjbGFpbUlkO1xuICAgIGlmIChpc0NoYW5uZWwpIHtcbiAgICAgIGlmICghY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVjayB5b3VyIFVSTC4gIE5vIGNoYW5uZWwgbmFtZSBhZnRlciBcIkBcIi4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjaGFubmVsTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCk7XG4gICAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYWltSWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBjaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiBjaGFubmVsQ2xhaW1JZCB8fCBudWxsLFxuICAgICAgY2xhaW1JZCAgICAgICA6IGNsYWltSWQgfHwgbnVsbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IGV4dGVuc2lvbilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBleHRlbnNpb24gc2VwYXJhdG9yLCBleHRlbnNpb24gKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgZXh0ZW5zaW9uU2VwZXJhdG9yLCBleHRlbnNpb25dID0gY29tcG9uZW50c1JlZ2V4IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKG5hbWUpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghY2xhaW1OYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIuXCInKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNsYWltTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0xBSU0pO1xuICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogXCIke25hbWVCYWRDaGFycy5qb2luKCcsICcpfVwiLmApO1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBleHRlbnNpb25cbiAgICBpZiAoZXh0ZW5zaW9uU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIuYCk7XG4gICAgICB9XG4gICAgICBpZiAoZXh0ZW5zaW9uU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7ZXh0ZW5zaW9uU2VwZXJhdG9yfVwiIHNlcGFyYXRvciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY2xhaW1OYW1lLFxuICAgICAgZXh0ZW5zaW9uOiBleHRlbnNpb24gfHwgbnVsbCxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3Qge1xuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUsXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHksXG4gIGxvZ1JlcXVlc3REYXRhLFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCxcbn0gPSByZXF1aXJlKCdoZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlcnZlIGFuIGFzc2V0IG9yIHRoZSByZWFjdCBhcHAgdmlhIHRoZSBjbGFpbSBuYW1lIGFuZCBhbiBpZGVudGlmaWVyXG5cbiovXG5cbmNvbnN0IHNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0gPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICB9XG4gIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gIC8vIHBhcnNlIHRoZSBjbGFpbVxuICBsZXQgY2xhaW1OYW1lO1xuICB0cnkge1xuICAgICh7IGNsYWltTmFtZSB9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBwYXJzZSB0aGUgaWRlbnRpZmllclxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKHBhcmFtcy5pZGVudGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGlmICghaXNDaGFubmVsKSB7XG4gICAgW2NsYWltSWQsIGNsYWltTmFtZV0gPSBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5KGNsYWltSWQsIGNsYWltTmFtZSk7XG4gIH1cbiAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpO1xuICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltLmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRSZWFjdEFwcCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XHJcbiAgYXBwLmdldCgnKicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9zZW5kUmVhY3RBcHAuanMiXSwic291cmNlUm9vdCI6IiJ9