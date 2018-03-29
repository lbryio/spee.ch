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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjMxNDdhOWM0MTc0YTZiOWVkNDQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiIiwid2VicGFjazovLy8uL3NwZWVjaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZ2FcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvSG9tZVBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoUHJldmlldy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsIm9yaWdpbmFsVXJsIiwiaXAiLCJlcnJvciIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJqc29uIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwiZXJyIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJrZXkiLCJzdWNjZXNzIiwiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiY29udGFpbmVycyIsInBhZ2VzIiwiZGV0YWlscyIsImhvc3QiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwidXBkYXRlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsInNlbGVjdEZpbGUiLCJjbGVhckZpbGUiLCJ1cGRhdGVNZXRhZGF0YSIsInVwZGF0ZUNsYWltIiwic2V0UHVibGlzaEluQ2hhbm5lbCIsInVwZGF0ZVB1Ymxpc2hTdGF0dXMiLCJ1cGRhdGVFcnJvciIsInVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCIsInRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwib25OZXdUaHVtYm5haWwiLCJzdGFydFB1Ymxpc2giLCJhY3Rpb25zIiwiZmlsZSIsInR5cGUiLCJGSUxFX1NFTEVDVEVEIiwiZGF0YSIsIkZJTEVfQ0xFQVIiLCJuYW1lIiwidmFsdWUiLCJNRVRBREFUQV9VUERBVEUiLCJDTEFJTV9VUERBVEUiLCJjaGFubmVsIiwiU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCIsIlBVQkxJU0hfU1RBVFVTX1VQREFURSIsIkVSUk9SX1VQREFURSIsImNoYW5uZWxOYW1lIiwiU0VMRUNURURfQ0hBTk5FTF9VUERBVEUiLCJzaG93TWV0YWRhdGFJbnB1dHMiLCJUT0dHTEVfTUVUQURBVEFfSU5QVVRTIiwiVEhVTUJOQUlMX05FVyIsImhpc3RvcnkiLCJQVUJMSVNIX1NUQVJUIiwibXlzcWwiLCJkYXRhYmFzZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ3YXJuIiwiaW5mbyIsIm1hcFN0YXRlVG9Qcm9wcyIsInNpdGUiLCJsb2dnZWRJbkNoYW5uZWwiLCJjaGFubmVsU2hvcnRJZCIsInNob3J0SWQiLCJjaGFubmVsTG9uZ0lkIiwibG9uZ0lkIiwic2l0ZURlc2NyaXB0aW9uIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwib25DaGFubmVsTG9naW4iLCJkaXNwYXRjaCIsIm9uQ2hhbm5lbExvZ291dCIsIm9uSGFuZGxlU2hvd1BhZ2VVcmkiLCJvblJlcXVlc3RFcnJvciIsIm9uTmV3Q2hhbm5lbFJlcXVlc3QiLCJvbk5ld0Fzc2V0UmVxdWVzdCIsIm9uUmVxdWVzdFVwZGF0ZSIsImFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IiwiYWRkQXNzZXRUb0Fzc2V0TGlzdCIsImFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0Iiwib25VcGRhdGVDaGFubmVsQ2xhaW1zIiwidXBkYXRlQ2hhbm5lbENsYWltcyIsImZpbGVSZXF1ZXN0ZWQiLCJ1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IiwidXBkYXRlRGlzcGxheUFzc2V0RXJyb3IiLCJwYXJhbXMiLCJIQU5ETEVfU0hPV19VUkkiLCJSRVFVRVNUX0VSUk9SIiwiY2hhbm5lbElkIiwicmVxdWVzdFR5cGUiLCJyZXF1ZXN0SWQiLCJDSEFOTkVMX1JFUVVFU1RfTkVXIiwiaWQiLCJleHRlbnNpb24iLCJBU1NFVF9SRVFVRVNUX05FVyIsIm1vZGlmaWVyIiwiUkVRVUVTVF9VUERBVEUiLCJSRVFVRVNUX0xJU1RfQUREIiwiY2xhaW1JZCIsImNsYWltRGF0YSIsIkFTU0VUX0FERCIsImNsYWltc0RhdGEiLCJDSEFOTkVMX0FERCIsImNoYW5uZWxLZXkiLCJwYWdlIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DIiwiY2hhbm5lbExpc3RJZCIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTIiwiRklMRV9SRVFVRVNURUQiLCJGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUiLCJESVNQTEFZX0FTU0VUX0VSUk9SIiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwiZGVidWciLCJzZW5kR0FTZXJ2ZUV2ZW50Iiwic2VuZEdBVGltaW5nRXZlbnQiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJjaGFubmVsX25hbWUiLCJjaGFubmVsX2lkIiwiQ2VydGlmaWNhdGUiLCJDaGFubmVsIiwiQ2xhaW0iLCJGaWxlIiwiUmVxdWVzdCIsIlVzZXIiLCJTZXF1ZWxpemUiLCJzZXF1ZWxpemUiLCJkaWFsZWN0IiwiZGlhbGVjdE9wdGlvbnMiLCJkZWNpbWFsTnVtYmVycyIsImxvZ2dpbmciLCJwb29sIiwibWF4IiwibWluIiwiaWRsZSIsImFjcXVpcmUiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwiY2F0Y2giLCJkYiIsImltcG9ydCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwiY3JlYXRlIiwiZGVmYXVsdERlc2NyaXB0aW9uIiwiZGVmYXVsdFRodW1ibmFpbCIsInNpdGVIb3N0Iiwic2l0ZVRpdGxlIiwic2l0ZVR3aXR0ZXIiLCJyZXF1ZXN0IiwicGFyc2VKU09OIiwicmVzcG9uc2UiLCJjaGVja1N0YXR1cyIsImpzb25SZXNwb25zZSIsIkVycm9yIiwidXJsIiwib3B0aW9ucyIsImZldGNoIiwiUHJvbWlzZSIsImFsbCIsImF4aW9zIiwiYXBpIiwiYXBpSG9zdCIsImFwaVBvcnQiLCJsYnJ5QXBpVXJpIiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJhbW91bnQiLCJzZWxlY3RBc3NldCIsInNob3ciLCJyZXF1ZXN0TGlzdCIsImFzc2V0S2V5IiwiYXNzZXRMaXN0Iiwic2VsZWN0U2hvd1N0YXRlIiwic3RhdGUiLCJyZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIiwiTk9fQ0hBTk5FTCIsIk5PX0NMQUlNIiwiTk9fRklMRSIsImdldENsYWltSWQiLCJjaGFubmVsQ2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsImxvbmdDaGFubmVsQ2xhaW1JZCIsImdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQiLCJzaG9ydENoYW5uZWxDbGFpbUlkIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJkYXRhVmFsdWVzIiwicGFzc3BvcnQiLCJsb2NhbExvZ2luU3RyYXRlZ3kiLCJsb2NhbFNpZ251cFN0cmF0ZWd5Iiwic2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplVXNlciIsInNlcmlhbGl6ZVVzZXIiLCJ1c2UiLCJsYnJ5QXBpIiwicHVibGlzaEhlbHBlcnMiLCJPcCIsInB1Ymxpc2giLCJmaWxlTmFtZSIsImZpbGVUeXBlIiwicHVibGlzaFJlc3VsdHMiLCJjZXJ0aWZpY2F0ZUlkIiwidHgiLCJmaWxlUmVjb3JkIiwiY2xhaW1faWQiLCJtZXRhZGF0YSIsImFkZHJlc3MiLCJjbGFpbV9hZGRyZXNzIiwib3V0cG9pbnQiLCJ0eGlkIiwibm91dCIsImhlaWdodCIsImZpbGVQYXRoIiwiZmlsZV9wYXRoIiwibnNmdyIsImNsYWltUmVjb3JkIiwiY29udGVudFR5cGUiLCJiaWQiLCJ1cHNlcnRDcml0ZXJpYSIsImNsYWltIiwic2V0Q2xhaW0iLCJzZXRGaWxlIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2xhaW1BZGRyZXNzZXMiLCJwdXNoIiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJvciIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsImZzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkiLCJsaWNlbnNlIiwiaW52YWxpZE5hbWVDaGFyYWN0ZXJzIiwiZXhlYyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyIsInBhdGgiLCJzaXplIiwidGVzdCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImF1dGhvciIsImxhbmd1YWdlIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsInVubGluayIsImFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIiwiZmlsZUluZm8iLCJnZXRSZXN1bHQiLCJmaWxlX25hbWUiLCJkb3dubG9hZF9wYXRoIiwiY3JlYXRlRmlsZURhdGEiLCJ1cGRhdGVMb2dnZWRJbkNoYW5uZWwiLCJDSEFOTkVMX1VQREFURSIsIlByb2dyZXNzQmFyIiwicHJvcHMiLCJiYXJzIiwiaW5kZXgiLCJpbmNyZW1lbnRlciIsImNyZWF0ZUJhcnMiLCJiaW5kIiwic3RhcnRQcm9ncmVzc0JhciIsInVwZGF0ZVByb2dyZXNzQmFyIiwic3RvcFByb2dyZXNzQmFyIiwiaSIsImlzQWN0aXZlIiwic2V0U3RhdGUiLCJ1cGRhdGVJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm1hcCIsImJhciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJFcnJvclBhZ2UiLCJzdHJpbmciLCJyZXR1cm5TaG9ydElkIiwiY2xhaW1zQXJyYXkiLCJjbGFpbUluZGV4Iiwic3Vic3RyaW5nIiwic2hvcnRJZExlbmd0aCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJwb3NzaWJsZU1hdGNoZXMiLCJzbGljZSIsImZpbHRlciIsInJlcSIsImNvbnRleHQiLCJzdG9yZSIsImh0bWwiLCJoZWxtZXQiLCJyZW5kZXJTdGF0aWMiLCJyZWRpcmVjdCIsInByZWxvYWRlZFN0YXRlIiwiZ2V0U3RhdGUiLCJzZW5kIiwiTE9HSU4iLCJDUkVBVEUiLCJMT0NBTF9DSEVDSyIsIlVOQVZBSUxBQkxFIiwiRVJST1IiLCJBVkFJTEFCTEUiLCJpbml0aWFsaXplIiwiR0FMaXN0ZW5lciIsInNlbmRQYWdlVmlldyIsImxvY2F0aW9uIiwibGlzdGVuIiwic2V0IiwicGF0aG5hbWUiLCJwYWdldmlldyIsImNoaWxkcmVuIiwiQXBwIiwiZmlsZUVycm9yIiwic2V0RmlsZUVycm9yIiwiQ0hBTk5FTCIsIkFTU0VUX0xJVEUiLCJBU1NFVF9ERVRBSUxTIiwiZGlzcGxheUFzc2V0IiwiYXNzZXQiLCJvbkZpbGVSZXF1ZXN0IiwidG9TdHJpbmciLCJtZXRhIiwibGluayIsIlNFUlZFIiwiU0hPVyIsImNsaWVudEFjY2VwdHNIdG1sIiwiYWNjZXB0IiwibWF0Y2giLCJyZXF1ZXN0SXNGcm9tQnJvd3NlciIsImNsaWVudFdhbnRzQXNzZXQiLCJyYW5nZSIsImltYWdlSXNXYW50ZWQiLCJ2aWRlb0lzV2FudGVkIiwiaXNWYWxpZENsYWltSWQiLCJpc1ZhbGlkU2hvcnRJZCIsImlzVmFsaWRTaG9ydElkT3JDbGFpbUlkIiwiaW5wdXQiLCJzZXJ2ZUFzc2V0VG9DbGllbnQiLCJ2ZXJib3NlIiwic2VuZEZpbGVPcHRpb25zIiwic2VuZEZpbGUiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImZ1bGxDbGFpbUlkIiwiZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIiwiaGFzRmlsZUV4dGVuc2lvbiIsInJlc3BvbnNlVHlwZSIsImZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkiLCJpZGVudGlmaWVyIiwidGVtcE5hbWUiLCJsb2dSZXF1ZXN0RGF0YSIsIlJFR0VYUF9JTlZBTElEX0NMQUlNIiwiUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCIsIlJFR0VYUF9BRERSRVNTIiwiQ0hBTk5FTF9DSEFSIiwicGFyc2VJZGVudGlmaWVyIiwiY29tcG9uZW50c1JlZ2V4IiwiUmVnRXhwIiwicHJvdG8iLCJtb2RpZmllclNlcGVyYXRvciIsImlzQ2hhbm5lbCIsInN0YXJ0c1dpdGgiLCJuYW1lQmFkQ2hhcnMiLCJqb2luIiwicGFyc2VDbGFpbSIsInBhcnNlTW9kaWZpZXIiLCJyZXR1cm5TYWdhV2l0aFBhcmFtcyIsInNhZ2EiLCJzYWdhTWlkZGxld2FyZSIsIm1pZGRsZXdhcmUiLCJhY3Rpb24iLCJydW4iLCJkb25lIiwic2VsZWN0U2l0ZVN0YXRlIiwic2VsZWN0U2l0ZUhvc3QiLCJTZXJ2ZXIiLCJleHByZXNzIiwiYm9keVBhcnNlciIsImV4cHJlc3NIYW5kbGViYXJzIiwiSGFuZGxlYmFycyIsImNvb2tpZVNlc3Npb24iLCJodHRwIiwicmVxdWVzdExvZ2dlciIsImxvZ2dlckNvbmZpZyIsIm15c3FsQ29uZmlnIiwic2l0ZUNvbmZpZyIsInNsYWNrQ29uZmlnIiwiY29uZmlndXJlTG9nZ2VyIiwidXNlckNvbmZpZyIsImNvbmZpZ3VyZU15c3FsIiwiY29uZmlndXJlU2l0ZURldGFpbHMiLCJjb25maWd1cmVTbGFjayIsImNvbmZpZ3VyZUNsaWVudEJ1bmRsZSIsImNvbmZpZ3VyZU1vZGVscyIsImNvbmZpZ3VyZVJvdXRlcyIsImNyZWF0ZUFwcCIsImFwcCIsImVuYWJsZSIsInN0YXRpYyIsIl9fZGlybmFtZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNwZWVjaFBhc3Nwb3J0IiwibWF4QWdlIiwic2Vzc2lvbiIsImhicyIsImRlZmF1bHRMYXlvdXQiLCJoYW5kbGViYXJzIiwiZW5naW5lIiwic2VydmVyIiwic3RhcnQiLCJQT1JUIiwic3luYyIsIm5leHQiLCJMb2dnZXJDb25maWciLCJsb2dMZXZlbCIsImNvbmZpZ3VyZSIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwibGV2ZWwiLCJ0aW1lc3RhbXAiLCJjb2xvcml6ZSIsInByZXR0eVByaW50IiwiaGFuZGxlRXhjZXB0aW9ucyIsImh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb24iLCJzaWxseSIsIndpbnN0b25TbGFja1dlYkhvb2siLCJTbGFja1dlYkhvb2siLCJ3aW5zdG9uIiwiU2xhY2tDb25maWciLCJzbGFja1dlYkhvb2siLCJzbGFja0Vycm9yQ2hhbm5lbCIsInNsYWNrSW5mb0NoYW5uZWwiLCJhZGQiLCJ3ZWJob29rVXJsIiwiaWNvbkVtb2ppIiwiUGFzc3BvcnRMb2NhbFN0cmF0ZWd5IiwiU3RyYXRlZ3kiLCJyZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8iLCJ1c2VySW5zdGFuY2UiLCJ1c2VySW5mbyIsInVzZXJOYW1lIiwiZ2V0Q2hhbm5lbCIsInNob3J0Q2hhbm5lbElkIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VyIiwiY29tcGFyZVBhc3N3b3JkIiwiaXNNYXRjaCIsInVzZXJEYXRhIiwiY2hhbm5lbERhdGEiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiaGFuZGxlU2lnbnVwUmVxdWVzdCIsImhhbmRsZUxvZ2luUmVxdWVzdCIsImhhbmRsZUxvZ291dFJlcXVlc3QiLCJoYW5kbGVVc2VyUmVxdWVzdCIsImdldCIsInNpZ251cCIsImxvZ2luIiwibG9nSW4iLCJsb2dvdXQiLCJjaGFubmVsQXZhaWxhYmlsaXR5IiwiY2hhbm5lbENsYWltcyIsImNsYWltQXZhaWxhYmlsaXR5IiwiY2xhaW1HZXQiLCJjbGFpbUxvbmdJZCIsImNsYWltUHVibGlzaCIsImNsYWltUmVzb2x2ZSIsImNsYWltU2hvcnRJZCIsImNsYWltTGlzdCIsImZpbGVBdmFpbGFiaWxpdHkiLCJtdWx0aXBhcnRNaWRkbGV3YXJlIiwiYXZhaWxhYmxlTmFtZSIsImJvZHkiLCJDTEFJTVNfUEVSX1BBR0UiLCJjbGFpbXMiLCJ0b3RhbFBhZ2VzIiwiZGV0ZXJtaW5lVG90YWxQYWdlcyIsInBhZ2luYXRpb25QYWdlIiwiZ2V0UGFnZUZyb21RdWVyeSIsInZpZXdEYXRhIiwiZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIiwicHJldmlvdXNQYWdlIiwiZGV0ZXJtaW5lUHJldmlvdXNQYWdlIiwiY3VycmVudFBhZ2UiLCJuZXh0UGFnZSIsImRldGVybWluZU5leHRQYWdlIiwidG90YWxSZXN1bHRzIiwiZGV0ZXJtaW5lVG90YWxDbGFpbXMiLCJwYXJzZUludCIsInBhZ2VOdW1iZXIiLCJjbGFpbVN0YXJ0SW5kZXgiLCJjbGFpbUVuZEluZGV4IiwicGFnZU9mQ2xhaW1zIiwidG90YWxDbGFpbXMiLCJmdWxsUGFnZXMiLCJNYXRoIiwiZmxvb3IiLCJyZW1haW5kZXIiLCJjaGFubmVsU2hvcnRJZFJvdXRlIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImRlZmF1bHQiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJ2YWxpZEF0SGVpZ2h0IiwidmFsdWVWZXJzaW9uIiwiY2xhaW1UeXBlIiwiY2VydGlmaWNhdGVWZXJzaW9uIiwia2V5VHlwZSIsInB1YmxpY0tleSIsImZyZWV6ZVRhYmxlTmFtZSIsImJlbG9uZ3NUbyIsImZvcmVpZ25LZXkiLCJhbGxvd051bGwiLCJvcmRlciIsImdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQiLCIkbGlrZSIsImdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUiLCJ2YWxpZGF0ZUxvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwicmF3IiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJyZXNvbHZlQ2xhaW0iLCJjbGFpbUFycmF5IiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImlwQWRkcmVzcyIsImJjcnlwdCIsInByb3RvdHlwZSIsImNvbXBhcmUiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwiZ2VuU2FsdCIsInNhbHRFcnJvciIsInNhbHQiLCJoYXNoIiwiaGFzaEVycm9yIiwiaG9vayIsImNsYWltSW5mbyIsInJlc29sdmVSZXN1bHQiLCJmaWxlRGF0YSIsImNvbXBsZXRlZCIsImF1dGhlbnRpY2F0ZVVzZXIiLCJmaWxlcyIsImNoYW5uZWxQYXNzd29yZCIsInZhbGlkYXRlZENsYWltTmFtZSIsInRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJsYnJ5VHgiLCJhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMiLCJ1c2VyUGFzc3dvcmQiLCJjaGFubmVsRmluZFBhcmFtcyIsInJlc29sdmVkVXJpIiwiY2xhaW1zTGlzdCIsIm11bHRpcGFydCIsInVwbG9hZERpciIsImhhbmRsZVBhZ2VSZXF1ZXN0IiwiaGFuZGxlRW1iZWRSZXF1ZXN0IiwiaGFuZGxlUGFnZVJlbmRlciIsInNlbmRSZWFjdEFwcCIsImluaXRpYWxTdGF0ZSIsImFzc2lnbiIsInB1Ymxpc2hJbkNoYW5uZWwiLCJzZWxlY3RlZENoYW5uZWwiLCJwdWJsaXNoU3VibWl0IiwiY2hhbm5lbExpc3QiLCJnb29nbGVBbmFseXRpY3NJZCIsIkhvbWVQYWdlIiwiU0VPIiwicGFnZVVyaSIsInBhZ2VUaXRsZSIsIm1ldGFUYWdzIiwiY2Fub25pY2FsTGluayIsInJlbCIsImhyZWYiLCJvYmplY3QiLCJjcmVhdGVQYWdlVGl0bGUiLCJkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwiZmlsZUV4dCIsImxhc3RJbmRleE9mIiwiY3JlYXRlQmFzaWNNZXRhVGFncyIsInByb3BlcnR5IiwiY29udGVudCIsImNyZWF0ZUNoYW5uZWxNZXRhVGFncyIsImNyZWF0ZUFzc2V0TWV0YVRhZ3MiLCJlbWJlZFVybCIsInNob3dVcmwiLCJvZ1RpdGxlIiwib2dEZXNjcmlwdGlvbiIsIm9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJvZ1RodW1ibmFpbCIsImNyZWF0ZU1ldGFUYWdzIiwiY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rIiwiY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsiLCJjcmVhdGVDYW5vbmljYWxMaW5rIiwiVklFVyIsIkxPR09VVCIsIk5hdkJhciIsImNoZWNrRm9yTG9nZ2VkSW5Vc2VyIiwibG9nb3V0VXNlciIsImhhbmRsZVNlbGVjdGlvbiIsImNyZWRlbnRpYWxzIiwidGFyZ2V0Iiwic2VsZWN0ZWRPcHRpb25zIiwiTG9nbyIsIk5hdkJhckNoYW5uZWxEcm9wZG93biIsImRlZmF1bHRTZWxlY3Rpb24iLCJQdWJsaXNoVG9vbCIsIkRyb3B6b25lIiwiZHJhZ092ZXIiLCJtb3VzZU92ZXIiLCJkaW1QcmV2aWV3IiwiaGFuZGxlRHJvcCIsImhhbmRsZURyYWdPdmVyIiwiaGFuZGxlRHJhZ0VuZCIsImhhbmRsZURyYWdFbnRlciIsImhhbmRsZURyYWdMZWF2ZSIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVGaWxlSW5wdXQiLCJjaG9vc2VGaWxlIiwicHJldmVudERlZmF1bHQiLCJkdCIsImRhdGFUcmFuc2ZlciIsIml0ZW1zIiwia2luZCIsImRyb3BwZWRGaWxlIiwiZ2V0QXNGaWxlIiwicmVtb3ZlIiwiY2xlYXJEYXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsaWNrIiwiZmlsZUxpc3QiLCJ2YWxpZGF0ZUZpbGUiLCJQdWJsaXNoUHJldmlldyIsImltZ1NvdXJjZSIsInNldFByZXZpZXdJbWFnZVNvdXJjZSIsIm5ld1Byb3BzIiwic2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUiLCJwcmV2aWV3UmVhZGVyIiwiRmlsZVJlYWRlciIsInJlYWRBc0RhdGFVUkwiLCJvbmxvYWRlbmQiLCJib29sIiwiUHVibGlzaERldGFpbHMiLCJvblB1Ymxpc2hTdWJtaXQiLCJvbk1ldGFkYXRhQ2hhbmdlIiwiUHVibGlzaFRpdGxlSW5wdXQiLCJoYW5kbGVJbnB1dCIsImUiLCJsb2dnZWRJbkNoYW5uZWxOYW1lIiwibG9nZ2VkSW5DaGFubmVsU2hvcnRJZCIsInVybEVycm9yIiwib25DbGFpbUNoYW5nZSIsIm9uVXJsRXJyb3IiLCJQdWJsaXNoVXJsSW5wdXQiLCJzZXRDbGFpbU5hbWUiLCJ2YWxpZGF0ZUNsYWltIiwiY2xlYW5zZUlucHV0IiwiZmlsZU5hbWVXaXRob3V0RW5kaW5nIiwiY2xlYW5DbGFpbU5hbWUiLCJVcmxNaWRkbGUiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiaWEiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsIkJsb2IiLCJQdWJsaXNoVGh1bWJuYWlsSW5wdXQiLCJ2aWRlb1NvdXJjZSIsInNsaWRlck1pblJhbmdlIiwic2xpZGVyTWF4UmFuZ2UiLCJzbGlkZXJWYWx1ZSIsImhhbmRsZVZpZGVvTG9hZGVkRGF0YSIsImhhbmRsZVNsaWRlckNoYW5nZSIsImNyZWF0ZVRodW1ibmFpbCIsInNldFZpZGVvU291cmNlIiwibmV4dFByb3BzIiwiZGF0YVVyaSIsImJsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ0b3RhbE1pbnV0ZXMiLCJ0b3RhbFNlY29uZHMiLCJ2aWRlbyIsImN1cnJlbnRUaW1lIiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsIndpZHRoIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImRhdGFVcmwiLCJ0b0RhdGFVUkwiLCJzbmFwc2hvdCIsImRpc3BsYXkiLCJvblRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwiUHVibGlzaE1ldGFkYXRhSW5wdXRzIiwidG9nZ2xlU2hvd0lucHV0cyIsImhhbmRsZVNlbGVjdCIsImNoZWNrZWQiLCJzZWxlY3RlZE9wdGlvbiIsIm1heEhlaWdodCIsIkV4cGFuZGluZ1RleHRhcmVhIiwiX2hhbmRsZUNoYW5nZSIsImFkanVzdFRleHRhcmVhIiwib25DaGFuZ2UiLCJlbCIsInN0eWxlIiwic2Nyb2xsSGVpZ2h0IiwicmVzdCIsIngiLCJmdW5jIiwiY2hhbm5lbEVycm9yIiwib25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlIiwib25DaGFubmVsU2VsZWN0Iiwic3RhdGVzIiwiQ2hhbm5lbFNlbGVjdCIsInRvZ2dsZUFub255bW91c1B1Ymxpc2giLCJDaGFubmVsTG9naW5Gb3JtIiwibG9naW5Ub0NoYW5uZWwiLCJIZWFkZXJzIiwiQ2hhbm5lbENyZWF0ZUZvcm0iLCJoYW5kbGVDaGFubmVsSW5wdXQiLCJjbGVhbnNlQ2hhbm5lbElucHV0IiwidXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIiwiY2hhbm5lbFdpdGhBdFN5bWJvbCIsImNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIiwiY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUiLCJtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0IiwiQWN0aXZlU3RhdHVzQmFyIiwiSW5hY3RpdmVTdGF0dXNCYXIiLCJwdWJsaXNoU3RhdGVzIiwiUHVibGlzaFN0YXR1cyIsIkxPQURfU1RBUlQiLCJMT0FESU5HIiwiUFVCTElTSElORyIsIlNVQ0NFU1MiLCJGQUlMRUQiLCJQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIiwiQWJvdXRQYWdlIiwiTG9naW5QYWdlIiwiU2hvd1BhZ2UiLCJTaG93TGl0ZSIsIkFzc2V0RGlzcGxheSIsIlNob3dBc3NldERldGFpbHMiLCJBc3NldFRpdGxlIiwiQXNzZXRJbmZvIiwiY29weVRvQ2xpcGJvYXJkIiwiZWxlbWVudFRvQ29weSIsImRhdGFzZXQiLCJlbGVtZW50dG9jb3B5Iiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJwcmV2aW91c1JlcXVlc3QiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwic2hvd05ld1BhZ2UiLCJkZWZhdWx0cyIsIkFzc2V0UHJldmlldyIsImRpcmVjdFNvdXJjZUxpbmsiLCJzaG93VXJsTGluayIsIkZvdXJPaEZvclBhZ2UiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJ3YXRjaEhhbmRsZVNob3dQYWdlVXJpIiwicGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0iLCJwYXJzZUFuZFVwZGF0ZUNsYWltT25seSIsIm5ld0Fzc2V0UmVxdWVzdCIsIndhdGNoTmV3QXNzZXRSZXF1ZXN0IiwiZ2V0U2hvcnRJZCIsImdldENsYWltRGF0YSIsIm5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hOZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyIsImdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwiLCJleHRlbnNpb25TZXBlcmF0b3IiLCJzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7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QXhDLEVBQXFEbUQsT0FBckQ7QUFDQTtBQUNBMFQsMEJBQXdCN1csV0FBeEIsRUFBcUMyTCxjQUFyQyxFQUFxRGxCLFNBQXJELEVBQWdFdEgsT0FBaEUsRUFBeUU3SCxXQUF6RSxFQUFzRkMsRUFBdEYsRUFBMEZFLEdBQTFGO0FBQ0QsQ0FyQ0Q7O0FBdUNBTixPQUFPQyxPQUFQLEdBQWlCNjVCLCtCQUFqQixDOzs7Ozs7Ozs7QUN6REEsSUFBTS9PLG9CQUFvQixtQkFBQWhyQixDQUFRLEdBQVIsQ0FBMUI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUIsVUFBQytlLEdBQUQsRUFBUztBQUN4QkEsTUFBSWtFLEdBQUosQ0FBUSxHQUFSLEVBQWE2SCxpQkFBYjtBQUNELENBRkQsQzs7Ozs7Ozs7O0FDRkEsSUFBTUUsbUJBQW1CLG1CQUFBbHJCLENBQVEsRUFBUixDQUF6Qjs7QUFFQSxJQUFNbXJCLGVBQWUsU0FBZkEsWUFBZSxDQUFDL1MsR0FBRCxFQUFNN1gsR0FBTixFQUFjO0FBQ2pDMnFCLG1CQUFpQjlTLEdBQWpCLEVBQXNCN1gsR0FBdEI7QUFDRCxDQUZEOztBQUlBTixPQUFPQyxPQUFQLEdBQWlCaXJCLFlBQWpCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGIzMTQ3YTljNDE3NGE2YjllZDQ0IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtcmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3RvblwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhhbmRsZUVycm9yUmVzcG9uc2U6IGZ1bmN0aW9uIChvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpIHtcbiAgICBsb2dnZXIuZXJyb3IoYEVycm9yIG9uICR7b3JpZ2luYWxVcmx9YCwgbW9kdWxlLmV4cG9ydHMudXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzKGVycm9yKSk7XG4gICAgY29uc3QgW3N0YXR1cywgbWVzc2FnZV0gPSBtb2R1bGUuZXhwb3J0cy5yZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMoZXJyb3IpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyhzdGF0dXMpXG4gICAgICAuanNvbihtb2R1bGUuZXhwb3J0cy5jcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZChzdGF0dXMsIG1lc3NhZ2UpKTtcbiAgfSxcbiAgcmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBsZXQgc3RhdHVzLCBtZXNzYWdlO1xuICAgIC8vIGNoZWNrIGZvciBkYWVtb24gYmVpbmcgdHVybmVkIG9mZlxuICAgIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5SRUZVU0VEJykge1xuICAgICAgc3RhdHVzID0gNTAzO1xuICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHJlZnVzZWQuICBUaGUgZGFlbW9uIG1heSBub3QgYmUgcnVubmluZy4nO1xuICAgICAgLy8gZmFsbGJhY2sgZm9yIGV2ZXJ5dGhpbmcgZWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXMgPSA0MDA7XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gW3N0YXR1cywgbWVzc2FnZV07XG4gIH0sXG4gIHVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5czogZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbGV0IG5ld0Vycm9yT2JqZWN0ID0ge307XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBuZXdFcnJvck9iamVjdFtrZXldID0gZXJyW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdFcnJvck9iamVjdDtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfSxcbiAgY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQgKHN0YXR1cywgbWVzc2FnZSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwiZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7XG4gICAgY29tcG9uZW50czoge30sXG4gICAgY29udGFpbmVyczoge30sXG4gICAgcGFnZXMgICAgIDoge30sXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGN1c3RvbUNvbXBvbmVudHMsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICBjb25zb2xlLmxvZygnQ29uZmlndXJpbmcgc2l0ZSBkZXRhaWxzLi4uJyk7XG4gICAgdGhpcy5hbmFseXRpY3MgPSBhbmFseXRpY3M7XG4gICAgdGhpcy5hc3NldERlZmF1bHRzID0gYXNzZXREZWZhdWx0cztcbiAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgdGhpcy5wdWJsaXNoaW5nID0gcHVibGlzaGluZztcbiAgICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSBjdXN0b21Db21wb25lbnRzO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2l0ZUNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NpdGVDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbGUgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfU0VMRUNURUQsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckZpbGUgKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9DTEVBUixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLk1FVEFEQVRBX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDbGFpbSAodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNMQUlNX1VQREFURSxcbiAgICBkYXRhOiB2YWx1ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQdWJsaXNoSW5DaGFubmVsIChjaGFubmVsKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMLFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHVibGlzaFN0YXR1cyAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgc3RhdHVzLFxuICAgICAgbWVzc2FnZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVycm9yIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRVJST1JfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCAoY2hhbm5lbE5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IGNoYW5uZWxOYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1ldGFkYXRhSW5wdXRzIChzaG93TWV0YWRhdGFJbnB1dHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFMsXG4gICAgZGF0YTogc2hvd01ldGFkYXRhSW5wdXRzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3VGh1bWJuYWlsIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5USFVNQk5BSUxfTkVXLFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQdWJsaXNoIChoaXN0b3J5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVJULFxuICAgIGRhdGE6IHsgaGlzdG9yeSB9LFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvcHVibGlzaC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gbXlzcWwgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIC8vIGNvbmZpZ3VyZSBjcmVkZW50aWFsc1xuICAgIGxvZ2dlci5pbmZvKCdjb25maWd1cmluZyBteXNxbC4uLicpO1xuICAgIGNvbnN0IHsgZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gY29uZmlnO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgbXlzcWwoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBzaXRlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsTmFtZSAgIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBjaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBjaGFubmVsTG9uZ0lkIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubG9uZ0lkLFxuICAgIHNpdGVEZXNjcmlwdGlvbjogc2l0ZS5kZXNjcmlwdGlvbixcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICAgIG9uQ2hhbm5lbExvZ291dDogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG51bGwsIG51bGwsIG51bGwpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvaW5kZXguanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5cbmltcG9ydCB7IENIQU5ORUwsIEFTU0VUX0xJVEUsIEFTU0VUX0RFVEFJTFMgfSBmcm9tICdjb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzJztcblxuLy8gYmFzaWMgcmVxdWVzdCBwYXJzaW5nXG5leHBvcnQgZnVuY3Rpb24gb25IYW5kbGVTaG93UGFnZVVyaSAocGFyYW1zKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5IQU5ETEVfU0hPV19VUkksXG4gICAgZGF0YTogcGFyYW1zLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdEVycm9yIChlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9FUlJPUixcbiAgICBkYXRhOiBlcnJvcixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld0NoYW5uZWxSZXF1ZXN0IChjaGFubmVsTmFtZSwgY2hhbm5lbElkKSB7XG4gIGNvbnN0IHJlcXVlc3RUeXBlID0gQ0hBTk5FTDtcbiAgY29uc3QgcmVxdWVzdElkID0gYGNyIyR7Y2hhbm5lbE5hbWV9IyR7Y2hhbm5lbElkfWA7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3QXNzZXRSZXF1ZXN0IChuYW1lLCBpZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgZXh0ZW5zaW9uKSB7XG4gIGNvbnN0IHJlcXVlc3RUeXBlID0gZXh0ZW5zaW9uID8gQVNTRVRfTElURSA6IEFTU0VUX0RFVEFJTFM7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IGBhciMke25hbWV9IyR7aWR9IyR7Y2hhbm5lbE5hbWV9IyR7Y2hhbm5lbElkfWA7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5BU1NFVF9SRVFVRVNUX05FVyxcbiAgICBkYXRhOiB7XG4gICAgICByZXF1ZXN0VHlwZSxcbiAgICAgIHJlcXVlc3RJZCxcbiAgICAgIG5hbWUsXG4gICAgICBtb2RpZmllcjoge1xuICAgICAgICBpZCxcbiAgICAgICAgY2hhbm5lbDoge1xuICAgICAgICAgIG5hbWU6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgIGlkICA6IGNoYW5uZWxJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlcXVlc3RVcGRhdGUgKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QgKGlkLCBlcnJvciwga2V5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0xJU1RfQURELFxuICAgIGRhdGE6IHsgaWQsIGVycm9yLCBrZXkgfSxcbiAgfTtcbn07XG5cbi8vIGFzc2V0IGFjdGlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFzc2V0VG9Bc3NldExpc3QgKGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5BU1NFVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIG5hbWUsIGNsYWltSWQsIHNob3J0SWQsIGNsYWltRGF0YSB9LFxuICB9O1xufVxuXG4vLyBjaGFubmVsIGFjdGlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0IChpZCwgbmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0FERCxcbiAgICBkYXRhOiB7IGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblVwZGF0ZUNoYW5uZWxDbGFpbXMgKGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DLFxuICAgIGRhdGE6IHtjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2V9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNoYW5uZWxDbGFpbXMgKGNoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTLFxuICAgIGRhdGE6IHtjaGFubmVsTGlzdElkLCBjbGFpbXNEYXRhfSxcbiAgfTtcbn07XG5cbi8vIGRpc3BsYXkgYSBmaWxlXG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlUmVxdWVzdGVkIChuYW1lLCBjbGFpbUlkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX1JFUVVFU1RFRCxcbiAgICBkYXRhOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IChzdGF0dXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURSxcbiAgICBkYXRhOiBzdGF0dXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRGlzcGxheUFzc2V0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5ESVNQTEFZX0FTU0VUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL3Nob3cuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB1YSA9IHJlcXVpcmUoJ3VuaXZlcnNhbC1hbmFseXRpY3MnKTtcbmNvbnN0IHsgYW5hbHl0aWNzIDogeyBnb29nbGVJZCB9LCBkZXRhaWxzOiB7IHRpdGxlIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICByZXR1cm4ge1xuICAgIGV2ZW50Q2F0ZWdvcnkgICAgOiAnY2xpZW50IHJlcXVlc3RzJyxcbiAgICBldmVudEFjdGlvbiAgICAgIDogJ3NlcnZlIHJlcXVlc3QnLFxuICAgIGV2ZW50TGFiZWwgICAgICAgOiBvcmlnaW5hbFVybCxcbiAgICBpcE92ZXJyaWRlICAgICAgIDogaXAsXG4gICAgdXNlckFnZW50T3ZlcnJpZGU6IGhlYWRlcnNbJ3VzZXItYWdlbnQnXSxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gIGNvbnN0IGR1cmF0aW9uID0gZW5kVGltZSAtIHN0YXJ0VGltZTtcbiAgcmV0dXJuIHtcbiAgICB1c2VyVGltaW5nQ2F0ZWdvcnkgICAgOiBjYXRlZ29yeSxcbiAgICB1c2VyVGltaW5nVmFyaWFibGVOYW1lOiB2YXJpYWJsZSxcbiAgICB1c2VyVGltaW5nVGltZSAgICAgICAgOiBkdXJhdGlvbixcbiAgICB1c2VyVGltaW5nTGFiZWwgICAgICAgOiBsYWJlbCxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudCAoaXAsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9ySWQgPSBpcC5yZXBsYWNlKC9cXC4vZywgJy0nKTtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IuZXZlbnQocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyAodmlzaXRvcklkLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvciA9IHVhKGdvb2dsZUlkLCB2aXNpdG9ySWQsIHsgc3RyaWN0Q2lkRm9ybWF0OiBmYWxzZSwgaHR0cHM6IHRydWUgfSk7XG4gIHZpc2l0b3IudGltaW5nKHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgVGltaW5nIGV2ZW50IHN1Y2Nlc3NmdWxseSBzZW50IHRvIGdvb2dsZSBhbmFseXRpY3NgKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VuZEdBU2VydmVFdmVudCAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlU2VydmVFdmVudFBhcmFtcyhoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NFdmVudChpcCwgcGFyYW1zKTtcbiAgfSxcbiAgc2VuZEdBVGltaW5nRXZlbnQgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVB1Ymxpc2hUaW1pbmdFdmVudFBhcmFtcyhjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuICAgIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcodGl0bGUsIHBhcmFtcyk7XG4gIH0sXG4gIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCAoeyBjaGFubmVsX25hbWU6IGNoYW5uZWxOYW1lLCBjaGFubmVsX2lkOiBjaGFubmVsSWQgfSkge1xuICAgIHJldHVybiAoY2hhbm5lbE5hbWUgfHwgY2hhbm5lbElkID8gJ1BVQkxJU0hfSU5fQ0hBTk5FTF9DTEFJTScgOiAnUFVCTElTSF9BTk9OWU1PVVNfQ0xBSU0nKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJjb25zdCBDZXJ0aWZpY2F0ZSA9IHJlcXVpcmUoJ21vZGVscy9jZXJ0aWZpY2F0ZS5qcycpO1xuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJ21vZGVscy9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJ21vZGVscy9jbGFpbS5qcycpO1xuY29uc3QgRmlsZSA9IHJlcXVpcmUoJ21vZGVscy9maWxlLmpzJyk7XG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnbW9kZWxzL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCdtb2RlbHMvdXNlci5qcycpO1xuXG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3Qge2RhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmR9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcblxuLy8gc2V0IHNlcXVlbGl6ZSBvcHRpb25zXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcbiAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0ICAgICAgIDogJ215c3FsJyxcbiAgZGlhbGVjdE9wdGlvbnM6IHtkZWNpbWFsTnVtYmVyczogdHJ1ZX0sXG4gIGxvZ2dpbmcgICAgICAgOiBmYWxzZSxcbiAgcG9vbCAgICAgICAgICA6IHtcbiAgICBtYXggICAgOiA1LFxuICAgIG1pbiAgICA6IDAsXG4gICAgaWRsZSAgIDogMTAwMDAsXG4gICAgYWNxdWlyZTogMTAwMDAsXG4gIH0sXG59KTtcblxuLy8gZXN0YWJsaXNoIG15c3FsIGNvbm5lY3Rpb25cbnNlcXVlbGl6ZVxuICAuYXV0aGVudGljYXRlKClcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKCdTZXF1ZWxpemUgaGFzIGVzdGFibGlzaGVkIG15c3FsIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5LicpO1xuICB9KVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICBsb2dnZXIuZXJyb3IoJ1NlcXVlbGl6ZSB3YXMgdW5hYmxlIHRvIGNvbm5lY3QgdG8gdGhlIGRhdGFiYXNlOicsIGVycik7XG4gIH0pO1xuXG4vLyBtYW51YWxseSBhZGQgZWFjaCBtb2RlbCB0byB0aGUgZGIgb2JqZWN0IChub3RlOiBtYWtlIHRoaXMgZHluYW1pYylcbmNvbnN0IGRiID0ge307XG5kYlsnQ2VydGlmaWNhdGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NlcnRpZmljYXRlJywgQ2VydGlmaWNhdGUpO1xuZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbmRiWydDbGFpbSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2xhaW0nLCBDbGFpbSk7XG5kYlsnRmlsZSddID0gc2VxdWVsaXplLmltcG9ydCgnRmlsZScsIEZpbGUpO1xuZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbmRiWydVc2VyJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdVc2VyJywgVXNlcik7XG5cbi8vIHJ1biBtb2RlbC5hc3NvY2lhdGlvbiBmb3IgZWFjaCBtb2RlbCBpbiB0aGUgZGIgb2JqZWN0IHRoYXQgaGFzIGFuIGFzc29jaWF0aW9uXG5sb2dnZXIuaW5mbygnYXNzb2NpYXRpbmcgZGIgbW9kZWxzLi4uJyk7XG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChtb2RlbE5hbWUgPT4ge1xuICBpZiAoZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUpIHtcbiAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICBkYlttb2RlbE5hbWVdLmFzc29jaWF0ZShkYik7XG4gIH1cbn0pO1xuXG4vLyBhZGQgc2VxdWVsaXplL1NlcXVlbGl6ZSB0byBkYlxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplO1xuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGUgfSkgPT4ge1xuICBjb25zdCB7IGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCwgZGVzY3JpcHRpb246IHNpdGVEZXNjcmlwdGlvbiwgaG9zdDogc2l0ZUhvc3QsIHRpdGxlOiBzaXRlVGl0bGUsIHR3aXR0ZXI6IHNpdGVUd2l0dGVyIH0gPSBzaXRlO1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgICBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIHNpdGVEZXNjcmlwdGlvbixcbiAgICBzaXRlSG9zdCxcbiAgICBzaXRlVGl0bGUsXG4gICAgc2l0ZVR3aXR0ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicHJvcC10eXBlc1wiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJ2Nyb3NzLWZldGNoL3BvbHlmaWxsJztcblxuLyoqXG4gKiBQYXJzZXMgdGhlIEpTT04gcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlIEEgcmVzcG9uc2UgZnJvbSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIHJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gcGFyc2VKU09OIChyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDQgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgc3RhdHVzIHJldHVybmVkIGJ5IGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSAgIEEgcmVzcG9uc2UgZnJvbSBhIG5ldHdvcmsgcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSAgIFRoZSBwYXJzZWQgSlNPTiBmcm9tIHRoZSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3QgfCB1bmRlZmluZWR9IFJldHVybnMgb2JqZWN0IHdpdGggc3RhdHVzIGFuZCBzdGF0dXNUZXh0LCBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gY2hlY2tTdGF0dXMgKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgcmV0dXJuIGpzb25SZXNwb25zZTtcbiAgfVxuICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihqc29uUmVzcG9uc2UubWVzc2FnZSk7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHRocm93IGVycm9yO1xufVxuXG4vKipcbiAqIFJlcXVlc3RzIGEgVVJMLCByZXR1cm5pbmcgYSBwcm9taXNlXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSB1cmwgICAgICAgVGhlIFVSTCB3ZSB3YW50IHRvIHJlcXVlc3RcbiAqIEBwYXJhbSAge29iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIHdlIHdhbnQgdG8gcGFzcyB0byBcImZldGNoXCJcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICBUaGUgcmVzcG9uc2UgZGF0YVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbcmVzcG9uc2UsIHBhcnNlSlNPTihyZXNwb25zZSldKTtcbiAgICB9KVxuICAgIC50aGVuKChbcmVzcG9uc2UsIGpzb25SZXNwb25zZV0pID0+IHtcbiAgICAgIHJldHVybiBjaGVja1N0YXR1cyhyZXNwb25zZSwganNvblJlc3BvbnNlKTtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIi8vIHJlcXVlc3QgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEhBTkRMRV9TSE9XX1VSSSA9ICdIQU5ETEVfU0hPV19VUkknO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfRVJST1IgPSAnUkVRVUVTVF9FUlJPUic7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9VUERBVEUgPSAnUkVRVUVTVF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX1JFUVVFU1RfTkVXID0gJ0FTU0VUX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1JFUVVFU1RfTkVXID0gJ0NIQU5ORUxfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfTElTVF9BREQgPSAnUkVRVUVTVF9MSVNUX0FERCc7XG5cbi8vIGFzc2V0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBBU1NFVF9BREQgPSBgQVNTRVRfQUREYDtcblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9BREQgPSAnQ0hBTk5FTF9BREQnO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MnO1xuXG4vLyBhc3NldC9maWxlIGRpc3BsYXkgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEZJTEVfUkVRVUVTVEVEID0gJ0ZJTEVfUkVRVUVTVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUgPSAnRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBESVNQTEFZX0FTU0VUX0VSUk9SID0gJ0RJU1BMQVlfQVNTRVRfRVJST1InO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RBc3NldCA9IChzaG93KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7XG4gIHJldHVybiBzaG93LmFzc2V0TGlzdFthc3NldEtleV07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hvd1N0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaG93O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsImNvbnN0IHsgZGIgfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xuY29uc3QgbG9jYWxMb2dpblN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1sb2dpbi5qcycpO1xuY29uc3QgbG9jYWxTaWdudXBTdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtc2lnbnVwLmpzJyk7XG5jb25zdCB7IHNlcmlhbGl6ZVNwZWVjaFVzZXIsIGRlc2VyaWFsaXplU3BlZWNoVXNlciB9ID0gcmVxdWlyZSgnaGVscGVycy9hdXRoSGVscGVycy5qcycpO1xuXG5wYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZGVzZXJpYWxpemVTcGVlY2hVc2VyKTtcbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoc2VyaWFsaXplU3BlZWNoVXNlcik7XG5wYXNzcG9ydC51c2UoJ2xvY2FsLWxvZ2luJywgbG9jYWxMb2dpblN0cmF0ZWd5KTtcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtc2lnbnVwJywgbG9jYWxTaWdudXBTdHJhdGVneSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFzc3BvcnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGRiIH0gPSByZXF1aXJlKCdteXNxbENvbmZpZycpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe3doZXJlOiB7Y2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHNob3J0SWQsXG4gICAgICBsb25nSWQsXG4gICAgfSxcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9jaGFubmVsLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQWN0aXZlU3RhdHVzQmFyIGZyb20gJ2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyJztcbmltcG9ydCBJbmFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyJztcblxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGJhcnMgICAgICAgOiBbXSxcbiAgICAgIGluZGV4ICAgICAgOiAwLFxuICAgICAgaW5jcmVtZW50ZXI6IDEsXG4gICAgfTtcbiAgICB0aGlzLmNyZWF0ZUJhcnMgPSB0aGlzLmNyZWF0ZUJhcnMuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIgPSB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyID0gdGhpcy51cGRhdGVQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFByb2dyZXNzQmFyID0gdGhpcy5zdG9wUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5jcmVhdGVCYXJzKCk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyKCk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMuc3RvcFByb2dyZXNzQmFyKCk7XG4gIH1cbiAgY3JlYXRlQmFycyAoKSB7XG4gICAgY29uc3QgYmFycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMucHJvcHMuc2l6ZTsgaSsrKSB7XG4gICAgICBiYXJzLnB1c2goe2lzQWN0aXZlOiBmYWxzZX0pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgYmFycyB9KTtcbiAgfVxuICBzdGFydFByb2dyZXNzQmFyICgpIHtcbiAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVQcm9ncmVzc0Jhci5iaW5kKHRoaXMpLCAzMDApO1xuICB9O1xuICB1cGRhdGVQcm9ncmVzc0JhciAoKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleDtcbiAgICBsZXQgaW5jcmVtZW50ZXIgPSB0aGlzLnN0YXRlLmluY3JlbWVudGVyO1xuICAgIGxldCBiYXJzID0gdGhpcy5zdGF0ZS5iYXJzO1xuICAgIC8vIGZsaXAgaW5jcmVtZW50ZXIgaWYgbmVjZXNzYXJ5LCB0byBzdGF5IGluIGJvdW5kc1xuICAgIGlmICgoaW5kZXggPCAwKSB8fCAoaW5kZXggPiB0aGlzLnByb3BzLnNpemUpKSB7XG4gICAgICBpbmNyZW1lbnRlciA9IGluY3JlbWVudGVyICogLTE7XG4gICAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHRoZSBpbmRleGVkIGJhclxuICAgIGlmIChpbmNyZW1lbnRlciA+IDApIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFyc1tpbmRleF0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICAgIC8vIGluY3JlbWVudCBpbmRleFxuICAgIGluZGV4ICs9IGluY3JlbWVudGVyO1xuICAgIC8vIHVwZGF0ZSBzdGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYmFycyxcbiAgICAgIGluY3JlbWVudGVyLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG4gIHN0b3BQcm9ncmVzc0JhciAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZUludGVydmFsKTtcbiAgfTtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuc3RhdGUuYmFycy5tYXAoKGJhciwgaW5kZXgpID0+IGJhci5pc0FjdGl2ZSA/IDxBY3RpdmVTdGF0dXNCYXIga2V5PXtpbmRleH0gLz4gOiA8SW5hY3RpdmVTdGF0dXNCYXIga2V5PXtpbmRleH0vPil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5Qcm9ncmVzc0Jhci5wcm9wVHlwZXMgPSB7XG4gIHNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcblxuY2xhc3MgRXJyb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxwPntlcnJvcn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuRXJyb3JQYWdlLnByb3BUeXBlcyA9IHtcbiAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9FcnJvclBhZ2UvaW5kZXguanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblNob3J0SWQ6IGZ1bmN0aW9uIChjbGFpbXNBcnJheSwgbG9uZ0lkKSB7XG4gICAgbGV0IGNsYWltSW5kZXg7XG4gICAgbGV0IHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIDEpOyAvLyBkZWZhdWx0IHNob3J0IGlkIGlzIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICBsZXQgc2hvcnRJZExlbmd0aCA9IDA7XG4gICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhpcyBjbGFpbSBpZFxuICAgIGNsYWltSW5kZXggPSBjbGFpbXNBcnJheS5maW5kSW5kZXgoZWxlbWVudCA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFpbUlkID09PSBsb25nSWQ7XG4gICAgfSk7XG4gICAgaWYgKGNsYWltSW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsYWltIGlkIG5vdCBmb3VuZCBpbiBjbGFpbXMgbGlzdCcpO1xuICAgIH1cbiAgICAvLyBnZXQgYW4gYXJyYXkgb2YgYWxsIGNsYWltcyB3aXRoIGxvd2VyIGhlaWdodFxuICAgIGxldCBwb3NzaWJsZU1hdGNoZXMgPSBjbGFpbXNBcnJheS5zbGljZSgwLCBjbGFpbUluZGV4KTtcbiAgICAvLyByZW1vdmUgY2VydGlmaWNhdGVzIHdpdGggdGhlIHNhbWUgcHJlZml4ZXMgdW50aWwgbm9uZSBhcmUgbGVmdC5cbiAgICB3aGlsZSAocG9zc2libGVNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNob3J0SWRMZW5ndGggKz0gMTtcbiAgICAgIHNob3J0SWQgPSBsb25nSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpO1xuICAgICAgcG9zc2libGVNYXRjaGVzID0gcG9zc2libGVNYXRjaGVzLmZpbHRlcihlbGVtZW50ID0+IHtcbiAgICAgICAgcmV0dXJuIChlbGVtZW50LmNsYWltSWQgJiYgKGVsZW1lbnQuY2xhaW1JZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCkgPT09IHNob3J0SWQpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hvcnRJZDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJ2NsaWVudC9yZWR1Y2Vycyc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci8nO1xuaW1wb3J0IEFwcCBmcm9tICdjbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlLmpzJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyKTtcblxuICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICA8QXBwIC8+XG4gICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG5cbiAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgLy8gU29tZXdoZXJlIGEgYDxSZWRpcmVjdD5gIHdhcyByZW5kZXJlZFxuICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UncmUgZ29vZCwgc2VuZCB0aGUgcmVzcG9uc2VcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFB1Ymxpc2hSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3B1Ymxpc2gnO1xuaW1wb3J0IENoYW5uZWxSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL2NoYW5uZWwnO1xuaW1wb3J0IFNob3dSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3Nob3cnO1xuaW1wb3J0IFNpdGVSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3NpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICBjaGFubmVsOiBDaGFubmVsUmVkdWNlcixcbiAgcHVibGlzaDogUHVibGlzaFJlZHVjZXIsXG4gIHNob3cgICA6IFNob3dSZWR1Y2VyLFxuICBzaXRlICAgOiBTaXRlUmVkdWNlcixcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IEZJTEVfU0VMRUNURUQgPSAnRklMRV9TRUxFQ1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9DTEVBUiA9ICdGSUxFX0NMRUFSJztcbmV4cG9ydCBjb25zdCBNRVRBREFUQV9VUERBVEUgPSAnTUVUQURBVEFfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBDTEFJTV9VUERBVEUgPSAnQ0xBSU1fVVBEQVRFJztcbmV4cG9ydCBjb25zdCBTRVRfUFVCTElTSF9JTl9DSEFOTkVMID0gJ1NFVF9QVUJMSVNIX0lOX0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hfU1RBVFVTX1VQREFURSA9ICdQVUJMSVNIX1NUQVRVU19VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEVSUk9SX1VQREFURSA9ICdFUlJPUl9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFID0gJ1NFTEVDVEVEX0NIQU5ORUxfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfTUVUQURBVEFfSU5QVVRTID0gJ1RPR0dMRV9NRVRBREFUQV9JTlBVVFMnO1xuZXhwb3J0IGNvbnN0IFRIVU1CTkFJTF9ORVcgPSAnVEhVTUJOQUlMX05FVyc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFSVCA9ICdQVUJMSVNIX1NUQVJUJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9HSU4gPSAnRXhpc3RpbmcnO1xuZXhwb3J0IGNvbnN0IENSRUFURSA9ICdOZXcnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMX1VQREFURSA9ICdDSEFOTkVMX1VQREFURSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPQ0FMX0NIRUNLID0gJ0xPQ0FMX0NIRUNLJztcbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRSA9ICdVTkFWQUlMQUJMRSc7XG5leHBvcnQgY29uc3QgRVJST1IgPSAnRVJST1InO1xuZXhwb3J0IGNvbnN0IEFWQUlMQUJMRSA9ICdBVkFJTEFCTEUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgR29vZ2xlQW5hbHl0aWNzIGZyb20gJ3JlYWN0LWdhJztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmNvbnN0IHsgYW5hbHl0aWNzOiB7IGdvb2dsZUlkIH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuR29vZ2xlQW5hbHl0aWNzLmluaXRpYWxpemUoZ29vZ2xlSWQpO1xuXG5jbGFzcyBHQUxpc3RlbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2VuZFBhZ2VWaWV3KHRoaXMucHJvcHMuaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdGhpcy5wcm9wcy5oaXN0b3J5Lmxpc3Rlbih0aGlzLnNlbmRQYWdlVmlldyk7XG4gIH1cblxuICBzZW5kUGFnZVZpZXcgKGxvY2F0aW9uKSB7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnNldCh7IHBhZ2U6IGxvY2F0aW9uLnBhdGhuYW1lIH0pO1xuICAgIEdvb2dsZUFuYWx5dGljcy5wYWdldmlldyhsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoR0FMaXN0ZW5lcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgSG9tZVBhZ2UgZnJvbSAncGFnZXMvSG9tZVBhZ2UnO1xuaW1wb3J0IEFib3V0UGFnZSBmcm9tICdwYWdlcy9BYm91dFBhZ2UnO1xuaW1wb3J0IExvZ2luUGFnZSBmcm9tICdwYWdlcy9Mb2dpblBhZ2UnO1xuaW1wb3J0IFNob3dQYWdlIGZyb20gJ3BhZ2VzL1Nob3dQYWdlJztcbmltcG9ydCBGb3VyT2hGb3VyUGFnZSBmcm9tICdjb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlJztcbi8vIGltcG9ydCB7IGR5bmFtaWNJbXBvcnQgfSBmcm9tICd1dGlscy9keW5hbWljSW1wb3J0Jztcbi8vIGNvbnN0IEhvbWVQYWdlID0gZHluYW1pY0ltcG9ydCgncGFnZXMvSG9tZVBhZ2UnKTsgLy8gb3IgdXNlIHRoZSBwcm92aWRlZCBsb2NhbCBob21lcGFnZVxuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN3aXRjaD5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9e0hvbWVQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9hYm91dCcgY29tcG9uZW50PXtBYm91dFBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2xvZ2luJyBjb21wb25lbnQ9e0xvZ2luUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmlkZW50aWZpZXIvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy86Y2xhaW0nIGNvbXBvbmVudD17U2hvd1BhZ2V9IC8+XG4gICAgICA8Um91dGUgY29tcG9uZW50PXtGb3VyT2hGb3VyUGFnZX0gLz5cbiAgICA8L1N3aXRjaD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcHAuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgc2VsZWN0RmlsZSwgdXBkYXRlRXJyb3IsIGNsZWFyRmlsZSB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlICAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICB0aHVtYm5haWw6IHB1Ymxpc2gudGh1bWJuYWlsLFxuICAgIGZpbGVFcnJvcjogcHVibGlzaC5lcnJvci5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIHNlbGVjdEZpbGU6IChmaWxlKSA9PiB7XG4gICAgICBkaXNwYXRjaChzZWxlY3RGaWxlKGZpbGUpKTtcbiAgICB9LFxuICAgIHNldEZpbGVFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaChjbGVhckZpbGUoKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignZmlsZScsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJleHBvcnQgY29uc3QgQ0hBTk5FTCA9ICdDSEFOTkVMJztcbmV4cG9ydCBjb25zdCBBU1NFVF9MSVRFID0gJ0FTU0VUX0xJVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0RFVEFJTFMgPSAnQVNTRVRfREVUQUlMUyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgZmlsZVJlcXVlc3RlZCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBlcnJvciBhbmQgc3RhdHVzXG4gIGNvbnN0IGVycm9yICA9IHNob3cuZGlzcGxheUFzc2V0LmVycm9yO1xuICBjb25zdCBzdGF0dXMgPSBzaG93LmRpc3BsYXlBc3NldC5zdGF0dXM7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgZXJyb3IsXG4gICAgc3RhdHVzLFxuICAgIGFzc2V0LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uRmlsZVJlcXVlc3Q6IChuYW1lLCBjbGFpbUlkKSA9PiB7XG4gICAgICBkaXNwYXRjaChmaWxlUmVxdWVzdGVkKG5hbWUsIGNsYWltSWQpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL2dlbmVyYWwuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvYnVuZGxlL2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICBgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBnZXRDbGFpbUlkLCBnZXRMb2NhbEZpbGVSZWNvcmQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCcuL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuY29uc3QgU0hPVyA9ICdTSE9XJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5mdW5jdGlvbiBjbGllbnRBY2NlcHRzSHRtbCAoe2FjY2VwdH0pIHtcbiAgcmV0dXJuIGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLyk7XG59O1xuXG5mdW5jdGlvbiByZXF1ZXN0SXNGcm9tQnJvd3NlciAoaGVhZGVycykge1xuICByZXR1cm4gaGVhZGVyc1sndXNlci1hZ2VudCddICYmIGhlYWRlcnNbJ3VzZXItYWdlbnQnXS5tYXRjaCgvTW96aWxsYS8pO1xufTtcblxuZnVuY3Rpb24gY2xpZW50V2FudHNBc3NldCAoe2FjY2VwdCwgcmFuZ2V9KSB7XG4gIGNvbnN0IGltYWdlSXNXYW50ZWQgPSBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC9pbWFnZVxcLy4qLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvXFwqLyk7XG4gIGNvbnN0IHZpZGVvSXNXYW50ZWQgPSBhY2NlcHQgJiYgcmFuZ2U7XG4gIHJldHVybiBpbWFnZUlzV2FudGVkIHx8IHZpZGVvSXNXYW50ZWQ7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2xhaW1JZCAoY2xhaW1JZCkge1xuICByZXR1cm4gKChjbGFpbUlkLmxlbmd0aCA9PT0gNDApICYmICEvW15BLVphLXowLTldL2cudGVzdChjbGFpbUlkKSk7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZCAoY2xhaW1JZCkge1xuICByZXR1cm4gY2xhaW1JZC5sZW5ndGggPT09IDE7ICAvLyBpdCBzaG91bGQgcmVhbGx5IGV2YWx1YXRlIHRoZSBzaG9ydCB1cmwgaXRzZWxmXG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCAoaW5wdXQpIHtcbiAgcmV0dXJuIChpc1ZhbGlkQ2xhaW1JZChpbnB1dCkgfHwgaXNWYWxpZFNob3J0SWQoaW5wdXQpKTtcbn07XG5cbmZ1bmN0aW9uIHNlcnZlQXNzZXRUb0NsaWVudCAoY2xhaW1JZCwgbmFtZSwgcmVzKSB7XG4gIHJldHVybiBnZXRMb2NhbEZpbGVSZWNvcmQoY2xhaW1JZCwgbmFtZSlcbiAgICAudGhlbihmaWxlUmVjb3JkID0+IHtcbiAgICAgIC8vIGNoZWNrIHRoYXQgYSBsb2NhbCByZWNvcmQgd2FzIGZvdW5kXG4gICAgICBpZiAoZmlsZVJlY29yZCA9PT0gTk9fRklMRSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygzMDcpLnJlZGlyZWN0KGAvYXBpL2NsYWltL2dldC8ke25hbWV9LyR7Y2xhaW1JZH1gKTtcbiAgICAgIH1cbiAgICAgIC8vIHNlcnZlIHRoZSBmaWxlXG4gICAgICBjb25zdCB7ZmlsZVBhdGgsIGZpbGVUeXBlfSA9IGZpbGVSZWNvcmQ7XG4gICAgICBsb2dnZXIudmVyYm9zZShgc2VydmluZyBmaWxlOiAke2ZpbGVQYXRofWApO1xuICAgICAgY29uc3Qgc2VuZEZpbGVPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgICAgICAgOiBmaWxlVHlwZSB8fCAnaW1hZ2UvanBlZycsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmRGaWxlKGZpbGVQYXRoLCBzZW5kRmlsZU9wdGlvbnMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpIHtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihmdWxsQ2xhaW1JZCA9PiB7XG4gICAgICAgIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2hhbm5lbCBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2ZUFzc2V0VG9DbGllbnQoZnVsbENsYWltSWQsIGNsYWltTmFtZSwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdzdWNjZXNzJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ2ZhaWwnKTtcbiAgICAgIH0pO1xuICB9LFxuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUgKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2VUeXBlO1xuICAgIGlmIChoYXNGaWxlRXh0ZW5zaW9uKSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTsgIC8vIGFzc3VtZSBhIHNlcnZlIHJlcXVlc3QgaWYgZmlsZSBleHRlbnNpb24gaXMgcHJlc2VudFxuICAgICAgaWYgKGNsaWVudEFjY2VwdHNIdG1sKGhlYWRlcnMpKSB7ICAvLyBpZiB0aGUgcmVxdWVzdCBjb21lcyBmcm9tIGEgYnJvd3NlciwgY2hhbmdlIGl0IHRvIGEgc2hvdyByZXF1ZXN0XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICBpZiAoY2xpZW50V2FudHNBc3NldChoZWFkZXJzKSAmJiByZXF1ZXN0SXNGcm9tQnJvd3NlcihoZWFkZXJzKSkgeyAgLy8gdGhpcyBpcyBpbiBjYXNlIHNvbWVvbmUgZW1iZWRzIGEgc2hvdyB1cmxcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdTaG93IHJlcXVlc3QgY2FtZSBmcm9tIGJyb3dzZXIgYnV0IHdhbnRzIGFuIGltYWdlL3ZpZGVvLiBDaGFuZ2luZyByZXNwb25zZSB0byBzZXJ2ZS4uLicpO1xuICAgICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlVHlwZTtcbiAgfSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSAoaWRlbnRpZmllciwgbmFtZSkge1xuICAgIC8vIHRoaXMgaXMgYSBwYXRjaCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCAnL25hbWUvY2xhaW1faWQnIHVybCBmb3JtYXRcbiAgICBpZiAoaXNWYWxpZFNob3J0SWRPckNsYWltSWQobmFtZSkgJiYgIWlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKGlkZW50aWZpZXIpKSB7XG4gICAgICBjb25zdCB0ZW1wTmFtZSA9IG5hbWU7XG4gICAgICBuYW1lID0gaWRlbnRpZmllcjtcbiAgICAgIGlkZW50aWZpZXIgPSB0ZW1wTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFtpZGVudGlmaWVyLCBuYW1lXTtcbiAgfSxcbiAgbG9nUmVxdWVzdERhdGEgKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZygncmVzcG9uc2VUeXBlID09PScsIHJlc3BvbnNlVHlwZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBuYW1lID09PSAnLCBjbGFpbU5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBuYW1lID09PScsIGNoYW5uZWxOYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIGlkID09PScsIGNsYWltSWQpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBpZGVudGlmaWVyOicsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHt2YWx1ZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciB1cmwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwgbmFtZSBhZnRlciBALicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltSWQsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG5hbWU6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgLicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yICR7bW9kaWZpZXJTZXBlcmF0b3J9LmApO1xuICAgICAgfVxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHttb2RpZmllclNlcGVyYXRvcn0gbW9kaWZpZXIgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZWApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VNb2RpZmllcjogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG1vZGlmaWVyOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb24gPSBmYWxzZTtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbixcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUmVkdWNlciBmcm9tICcuLi8uLi9jbGllbnQvcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXgnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi8uLi9jbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgaGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvc2FnYXMvc2hvd191cmknO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9hY3Rpb25zL3Nob3cnO1xuXG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHJldHVyblNhZ2FXaXRoUGFyYW1zID0gKHNhZ2EsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKiAoKSB7XG4gICAgeWllbGQgY2FsbChzYWdhLCBwYXJhbXMpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBvbkhhbmRsZVNob3dQYWdlVXJpKHJlcS5wYXJhbXMpO1xuICBjb25zdCBzYWdhID0gcmV0dXJuU2FnYVdpdGhQYXJhbXMoaGFuZGxlU2hvd1BhZ2VVcmksIGFjdGlvbik7XG5cbiAgLy8gcnVuIHRoZSBzYWdhIG1pZGRsZXdhcmVcbiAgc2FnYU1pZGRsZXdhcmVcbiAgICAucnVuKHNhZ2EpXG4gICAgLmRvbmVcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsImV4cG9ydCBjb25zdCBzZWxlY3RTaXRlU3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNpdGU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2l0ZUhvc3QgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNpdGUuaG9zdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2VsZWN0b3JzL3NpdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoYXR3Zy1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuL3NlcnZlcicpO1xuXG5jb25zdCBleHBvcnRzID0ge1xuICBTZXJ2ZXIsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcGVlY2guanMiLCIvLyBhcHAgZGVwZW5kZW5jaWVzXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCBleHByZXNzSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2V4cHJlc3MtaGFuZGxlYmFycycpO1xuY29uc3QgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hhbmRsZWJhcnMnKTtcbmNvbnN0IGhlbG1ldCA9IHJlcXVpcmUoJ2hlbG1ldCcpO1xuY29uc3QgY29va2llU2Vzc2lvbiA9IHJlcXVpcmUoJ2Nvb2tpZS1zZXNzaW9uJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgcmVxdWVzdExvZ2dlciA9IHJlcXVpcmUoJ21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcycpO1xuXG5jb25zdCBsb2dnZXJDb25maWcgPSByZXF1aXJlKCdsb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsQ29uZmlnID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcbmNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJ3NsYWNrQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIFNlcnZlciAoKSB7XG4gIHRoaXMuY29uZmlndXJlTG9nZ2VyID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBsb2dnZXJDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBteXNxbENvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2l0ZURldGFpbHMgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNpdGVDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNsYWNrID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBzbGFja0NvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQ2xpZW50QnVuZGxlID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnY29uZmlndXJlIHRoZSBjbGllbnQgaGVyZSBieSBwYXNzaW5nIGluIHRoZSBidW5kbGUgYW5kIGNvbmZpZ3VyaW5nIGl0LCBvciBiZXR0ZXIgeWV0OiB0YWtpbmcgaW4gdGhlIGNvbXBvbmVudHMgdG8gdXNlIGR5bmFtaWNhbGx5IGZyb20gaGVyZS4nKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVNb2RlbHMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdoZXJlIGlzIHdoZXJlIHlvdSBjb3VsZCBhZGQvb3ZlcndyaXRlIHRoZSBkZWZhdWx0IG1vZGVscycpXG4gIH07XG4gIHRoaXMuY29uZmlndXJlUm91dGVzID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCByb3V0ZXMnKVxuICB9O1xuICB0aGlzLmNyZWF0ZUFwcCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgYW4gRXhwcmVzcyBhcHBsaWNhdGlvblxuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuICAgIC8vIHRydXN0IHRoZSBwcm94eSB0byBnZXQgaXAgYWRkcmVzcyBmb3IgdXNcbiAgICBhcHAuZW5hYmxlKCd0cnVzdCBwcm94eScpO1xuXG4gICAgLy8gYWRkIG1pZGRsZXdhcmVcbiAgICBhcHAudXNlKGhlbG1ldCgpKTsgLy8gc2V0IEhUVFAgaGVhZGVycyB0byBwcm90ZWN0IGFnYWluc3Qgd2VsbC1rbm93biB3ZWIgdnVsbmVyYWJpbHRpZXNcbiAgICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKGAke19fZGlybmFtZX0vcHVibGljYCkpOyAvLyAnZXhwcmVzcy5zdGF0aWMnIHRvIHNlcnZlIHN0YXRpYyBmaWxlcyBmcm9tIHB1YmxpYyBkaXJlY3RvcnlcbiAgICAvLyBub3RlOiB0YWtlIGluIGEgZGlmZmVyZW50IHB1YmxpYyBmb2xkZXIsIHNvIGl0IGNhbiBzZXJ2ZSBpdCdzIG93biBidW5kbGUgZnJvbSB0aGVyZT9cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi9qc29uXG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7IC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG5cbiAgICAvLyBhZGQgY3VzdG9tIG1pZGRsZXdhcmUgKG5vdGU6IGJ1aWxkIG91dCB0byBhY2NlcHQgZHluYW1pY2FsbHkgdXNlIHdoYXQgaXMgaW4gc2VydmVyL21pZGRsZXdhcmUvXG4gICAgYXBwLnVzZShyZXF1ZXN0TG9nZ2VyKTtcblxuICAgIC8vIGNvbmZpZ3VyZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbiAgICAvLyBpbml0aWFsaXplIHBhc3Nwb3J0XG4gICAgY29uc3Qgc2Vzc2lvbktleSA9IHNpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5O1xuICAgIGFwcC51c2UoY29va2llU2Vzc2lvbih7XG4gICAgICBuYW1lICA6ICdzZXNzaW9uJyxcbiAgICAgIGtleXMgIDogW3Nlc3Npb25LZXldLFxuICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBpLmUuIDI0IGhvdXJzXG4gICAgfSkpO1xuICAgIGFwcC51c2Uoc3BlZWNoUGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgICAvLyBjb25maWd1cmUgaGFuZGxlYmFycyAmIHJlZ2lzdGVyIGl0IHdpdGggZXhwcmVzcyBhcHBcbiAgICBjb25zdCBoYnMgPSBleHByZXNzSGFuZGxlYmFycy5jcmVhdGUoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2VtYmVkJyxcbiAgICAgIGhhbmRsZWJhcnMgICA6IEhhbmRsZWJhcnMsXG4gICAgfSk7XG4gICAgYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGhicy5lbmdpbmUpO1xuICAgIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuICAgIC8vIHNldCB0aGUgcm91dGVzIG9uIHRoZSBhcHBcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hdXRoLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXBpLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvcGFnZXMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldHMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9mYWxsYmFjay8nKShhcHApO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gIH07XG4gIHRoaXMuaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmNyZWF0ZUFwcCgpO1xuICAgIHRoaXMuc2VydmVyID0gaHR0cC5TZXJ2ZXIodGhpcy5hcHApO1xuICB9O1xuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRiID0gcmVxdWlyZSgnLi9tb2RlbHMvJyk7XG4gICAgY29uc3QgUE9SVCA9IHNpdGVDb25maWcuZGV0YWlscy5wb3J0O1xuICAgIC8vIHN5bmMgc2VxdWVsaXplXG4gICAgZGIuc2VxdWVsaXplLnN5bmMoKVxuICAgIC8vIHN0YXJ0IHRoZSBzZXJ2ZXJcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBQT1JUICR7UE9SVH1gKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFN0YXJ0dXAgRXJyb3I6YCwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3QgcmVxdWVzdExvZ2dlciA9IChyZXEsIHJlcywgbmV4dCkgPT4geyAgLy8gY3VzdG9tIGxvZ2dpbmcgbWlkZGxld2FyZSB0byBsb2cgYWxsIGluY29taW5nIGh0dHAgcmVxdWVzdHNcbiAgbG9nZ2VyLnZlcmJvc2UoYFJlcXVlc3Qgb24gJHtyZXEub3JpZ2luYWxVcmx9IGZyb20gJHtyZXEuaXB9YCk7XG4gIG5leHQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWVzdExvZ2dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIExvZ2dlckNvbmZpZyAoKSB7XG4gIHRoaXMubG9nTGV2ZWwgPSAnZGVidWcnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBsb2dnZXIgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBsb2dnZXIuaW5mbygnY29uZmlndXJpbmcgd2luc3RvbiBsb2dnZXIuLi4nKTtcbiAgICAvLyB1cGRhdGUgdmFsdWVzIHdpdGggbG9jYWwgY29uZmlnIHBhcmFtc1xuICAgIGNvbnN0IHtsb2dMZXZlbH0gPSBjb25maWc7XG4gICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xuICAgIC8vIGNvbmZpZ3VyZSB0aGUgd2luc3RvbiBsb2dnZXJcbiAgICBsb2dnZXIuY29uZmlndXJlKHtcbiAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IChsb2dnZXIudHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgICAgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5sb2dMZXZlbCxcbiAgICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICBjb2xvcml6ZSAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIHByZXR0eVByaW50ICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgLy8gdGVzdCBhbGwgdGhlIGxvZyBsZXZlbHNcbiAgICBsb2dnZXIuaW5mbygndGVzdGluZyB3aW5zdG9uIGxvZyBsZXZlbHMuLi4nKTtcbiAgICBsb2dnZXIuZXJyb3IoJ0xldmVsIDAnKTtcbiAgICBsb2dnZXIud2FybignTGV2ZWwgMScpO1xuICAgIGxvZ2dlci5pbmZvKCdMZXZlbCAyJyk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoJ0xldmVsIDMnKTtcbiAgICBsb2dnZXIuZGVidWcoJ0xldmVsIDQnKTtcbiAgICBsb2dnZXIuc2lsbHkoJ0xldmVsIDUnKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IExvZ2dlckNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCB3aW5zdG9uID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gd2luc3Rvbi53YXJuKCdObyBzbGFjayBjb25maWcgcmVjZWl2ZWQnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlc1xuICAgIHdpbnN0b24uaW5mbygnY29uZmlndXJpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICAgIC8vIHVwZGF0ZSBzbGFjayB3ZWJob29rIHNldHRpbmdzXG4gICAgaWYgKHRoaXMuc2xhY2tXZWJIb29rKSB7XG4gICAgICAvLyBhZGQgYSB0cmFuc3BvcnQgZm9yIGVycm9ycyB0byBzbGFja1xuICAgICAgaWYgKHRoaXMuc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1lcnJvcnMtdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2staW5mby10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrSW5mb0NoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlc1xuICAgICAgd2luc3Rvbi5pbmZvKCd0ZXN0aW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgICAgd2luc3Rvbi5pbmZvKCdTbGFjayBcImluZm9cIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tc2xhY2std2ViaG9va1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGRiIH0gPSByZXF1aXJlKCdteXNxbENvbmZpZycpO1xuXG5jb25zdCByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8gPSAodXNlckluc3RhbmNlKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgdXNlckluZm9bJ2lkJ10gPSB1c2VySW5zdGFuY2UuaWQ7XG4gICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSB1c2VySW5zdGFuY2UudXNlck5hbWU7XG4gICAgdXNlckluc3RhbmNlXG4gICAgICAuZ2V0Q2hhbm5lbCgpXG4gICAgICAudGhlbigoe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0pID0+IHtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQoY2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJlc29sdmUodXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICByZXR1cm4gZGIuVXNlclxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge3VzZXJOYW1lOiB1c2VybmFtZX0sXG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQocGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdQYXNzd29yZCB3YXMgYSBtYXRjaCwgcmV0dXJuaW5nIFVzZXInKTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8odXNlcilcbiAgICAgICAgICAgICAgLnRoZW4odXNlckluZm8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfSxcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYG5ldyBjaGFubmVsIHNpZ251cCByZXF1ZXN0LiB1c2VyOiAke3VzZXJuYW1lfSBwYXNzOiAke3Bhc3N3b3JkfSAuYCk7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgLy8gc2VydmVyLXNpZGUgdmFsaWRhdG9uIG9mIGlucHV0cyAodXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFubmVsIGFuZCByZXRyaWV2ZSB0aGUgbWV0YWRhdGFcbiAgICByZXR1cm4gbGJyeUFwaS5jcmVhdGVDaGFubmVsKGBAJHt1c2VybmFtZX1gKVxuICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgdXNlck5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXJEYXRhID4nLCB1c2VyRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCBjaGFubmVsRGF0YSA9IHtcbiAgICAgICAgICBjaGFubmVsTmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgY2hhbm5lbENsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2hhbm5lbERhdGEgPicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIGNlcnRpZmljYXRlIHJlY29yZFxuICAgICAgICBjb25zdCBjZXJ0aWZpY2F0ZURhdGEgPSB7XG4gICAgICAgICAgY2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgICAgbmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgLy8gYWRkcmVzcyxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NlcnRpZmljYXRlRGF0YSA+JywgY2VydGlmaWNhdGVEYXRhKTtcbiAgICAgICAgLy8gc2F2ZSB1c2VyIGFuZCBjZXJ0aWZpY2F0ZSB0byBkYlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLlVzZXIuY3JlYXRlKHVzZXJEYXRhKSwgZGIuQ2hhbm5lbC5jcmVhdGUoY2hhbm5lbERhdGEpLCBkYi5DZXJ0aWZpY2F0ZS5jcmVhdGUoY2VydGlmaWNhdGVEYXRhKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbbmV3VXNlciwgbmV3Q2hhbm5lbCwgbmV3Q2VydGlmaWNhdGVdKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAvLyBzdG9yZSB0aGUgcmVsZXZhbnQgbmV3VXNlciBpbmZvIHRvIGJlIHBhc3NlZCBiYWNrIGZvciByZXEuVXNlclxuICAgICAgICB1c2VySW5mb1snaWQnXSA9IG5ld1VzZXIuaWQ7XG4gICAgICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gbmV3VXNlci51c2VyTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIC8vIGFzc29jaWF0ZSB0aGUgaW5zdGFuY2VzXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbmV3Q2VydGlmaWNhdGUuc2V0Q2hhbm5lbChuZXdDaGFubmVsKSwgbmV3Q2hhbm5lbC5zZXRVc2VyKG5ld1VzZXIpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQodXNlckluZm8uY2hhbm5lbENsYWltSWQsIHVzZXJJbmZvLmNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ3NpZ251cCBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGNvbnNvbGUubG9nKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGNvbnNvbGUubG9nKCdkZXNlcmlhbGl6aW5nIHVzZXInKTtcbiAgICBkb25lKG51bGwsIHVzZXIpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwiY29uc3Qgc3BlZWNoUGFzc3BvcnQgPSByZXF1aXJlKCdzcGVlY2hQYXNzcG9ydCcpO1xuY29uc3QgaGFuZGxlU2lnbnVwUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2lnbnVwJyk7XG5jb25zdCBoYW5kbGVMb2dpblJlcXVlc3QgPSByZXF1aXJlKCcuL2xvZ2luJyk7XG5jb25zdCBoYW5kbGVMb2dvdXRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dvdXQnKTtcbmNvbnN0IGhhbmRsZVVzZXJSZXF1ZXN0ID0gcmVxdWlyZSgnLi91c2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAucG9zdCgnL3NpZ251cCcsIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtc2lnbnVwJyksIGhhbmRsZVNpZ251cFJlcXVlc3QpO1xuICBhcHAucG9zdCgnL2xvZ2luJywgaGFuZGxlTG9naW5SZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2xvZ291dCcsIGhhbmRsZUxvZ291dFJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvdXNlcicsIGhhbmRsZVVzZXJSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJjb25zdCBzaWdudXAgPSAocmVxLCByZXMpID0+IHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2lnbnVwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcblxuY29uc3QgbG9naW4gPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgc3BlZWNoUGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1sb2dpbicsIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgIH1cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxLmxvZ0luKHVzZXIsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pKHJlcSwgcmVzLCBuZXh0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJjb25zdCBsb2dvdXQgPSAocmVxLCByZXMpID0+IHtcbiAgcmVxLmxvZ291dCgpO1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3lvdSBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCd9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsImNvbnN0IHVzZXIgPSAocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS51c2VyKSB7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS51c2VyfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAndXNlciBpcyBub3QgbG9nZ2VkIGluJ30pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsImNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NoYW5uZWxBdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSByZXF1aXJlKCcuL2NoYW5uZWxDbGFpbXMnKTtcbmNvbnN0IGNoYW5uZWxEYXRhID0gcmVxdWlyZSgnLi9jaGFubmVsRGF0YScpO1xuY29uc3QgY2hhbm5lbFNob3J0SWQgPSByZXF1aXJlKCcuL2NoYW5uZWxTaG9ydElkJyk7XG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9IHJlcXVpcmUoJy4vY2xhaW1BdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNsYWltRGF0YSA9IHJlcXVpcmUoJy4vY2xhaW1EYXRhJyk7XG5jb25zdCBjbGFpbUdldCA9IHJlcXVpcmUoJy4vY2xhaW1HZXQnKTtcbmNvbnN0IGNsYWltTG9uZ0lkID0gcmVxdWlyZSgnLi9jbGFpbUxvbmdJZCcpO1xuY29uc3QgY2xhaW1QdWJsaXNoID0gcmVxdWlyZSgnLi9jbGFpbVB1Ymxpc2gnKTtcbmNvbnN0IGNsYWltUmVzb2x2ZSA9IHJlcXVpcmUoJy4vY2xhaW1SZXNvbHZlJyk7XG5jb25zdCBjbGFpbVNob3J0SWQgPSByZXF1aXJlKCcuL2NsYWltU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1MaXN0ID0gcmVxdWlyZSgnLi9jbGFpbUxpc3QnKTtcbmNvbnN0IGZpbGVBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2ZpbGVBdmFpbGFiaWxpdHknKTtcblxuY29uc3QgbXVsdGlwYXJ0TWlkZGxld2FyZSA9IHJlcXVpcmUoJ2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gY2hhbm5lbCByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS86bmFtZScsIGNoYW5uZWxBdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsIGNoYW5uZWxTaG9ydElkKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2RhdGEvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZCcsIGNoYW5uZWxEYXRhKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2NsYWltcy86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkLzpwYWdlJywgY2hhbm5lbENsYWltcyk7XG4gIC8vIGNsYWltIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCBjbGFpbUxpc3QpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsIGNsYWltR2V0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjbGFpbUF2YWlsYWJpbGl0eSk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vcmVzb2x2ZS86bmFtZS86Y2xhaW1JZCcsIGNsYWltUmVzb2x2ZSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCBjbGFpbVB1Ymxpc2gpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjbGFpbVNob3J0SWQpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9sb25nLWlkJywgY2xhaW1Mb25nSWQpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsIGNsYWltRGF0YSk7XG4gIC8vIGZpbGUgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvZmlsZS9hdmFpbGFiaWxpdHkvOm5hbWUvOmNsYWltSWQnLCBmaWxlQXZhaWxhYmlsaXR5KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsImNvbnN0IHsgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5KG5hbWUpXG4gICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbEF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxBdmFpbGFiaWxpdHkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgZ2V0Q2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhbGwgY2xhaW1zIGZvciBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlO1xuICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsQ2xhaW1zO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsImNvbnN0IENMQUlNU19QRVJfUEFHRSA9IDEyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2xhaW1zLCBwYWdlKSB7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsUGFnZXMoY2xhaW1zKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uUGFnZSA9IG1vZHVsZS5leHBvcnRzLmdldFBhZ2VGcm9tUXVlcnkocGFnZSk7XG4gICAgY29uc3Qgdmlld0RhdGEgPSB7XG4gICAgICBjaGFubmVsTmFtZSAgICAgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbXMgICAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmV4dHJhY3RQYWdlRnJvbUNsYWltcyhjbGFpbXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHByZXZpb3VzUGFnZSAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lUHJldmlvdXNQYWdlKHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlICAgICAgIDogcGFnaW5hdGlvblBhZ2UsXG4gICAgICBuZXh0UGFnZSAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZU5leHRQYWdlKHRvdGFsUGFnZXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHRvdGFsUGFnZXMgICAgICAgIDogdG90YWxQYWdlcyxcbiAgICAgIHRvdGFsUmVzdWx0cyAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxDbGFpbXMoY2xhaW1zKSxcbiAgICB9O1xuICAgIHJldHVybiB2aWV3RGF0YTtcbiAgfSxcbiAgZ2V0UGFnZUZyb21RdWVyeSAocGFnZSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFnZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9LFxuICBleHRyYWN0UGFnZUZyb21DbGFpbXMgKGNsYWltcywgcGFnZU51bWJlcikge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gW107ICAvLyBpZiBubyBjbGFpbXMsIHJldHVybiB0aGlzIGRlZmF1bHRcbiAgICB9XG4gICAgLy8gbG9nZ2VyLmRlYnVnKCdjbGFpbXMgaXMgYXJyYXk/JywgQXJyYXkuaXNBcnJheShjbGFpbXMpKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoYHBhZ2VOdW1iZXIgJHtwYWdlTnVtYmVyfSBpcyBudW1iZXI/YCwgTnVtYmVyLmlzSW50ZWdlcihwYWdlTnVtYmVyKSk7XG4gICAgY29uc3QgY2xhaW1TdGFydEluZGV4ID0gKHBhZ2VOdW1iZXIgLSAxKSAqIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBjbGFpbUVuZEluZGV4ID0gY2xhaW1TdGFydEluZGV4ICsgQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IHBhZ2VPZkNsYWltcyA9IGNsYWltcy5zbGljZShjbGFpbVN0YXJ0SW5kZXgsIGNsYWltRW5kSW5kZXgpO1xuICAgIHJldHVybiBwYWdlT2ZDbGFpbXM7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsUGFnZXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG90YWxDbGFpbXMgPSBjbGFpbXMubGVuZ3RoO1xuICAgICAgaWYgKHRvdGFsQ2xhaW1zIDwgQ0xBSU1TX1BFUl9QQUdFKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgY29uc3QgZnVsbFBhZ2VzID0gTWF0aC5mbG9vcih0b3RhbENsYWltcyAvIENMQUlNU19QRVJfUEFHRSk7XG4gICAgICBjb25zdCByZW1haW5kZXIgPSB0b3RhbENsYWltcyAlIENMQUlNU19QRVJfUEFHRTtcbiAgICAgIGlmIChyZW1haW5kZXIgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZ1bGxQYWdlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdWxsUGFnZXMgKyAxO1xuICAgIH1cbiAgfSxcbiAgZGV0ZXJtaW5lUHJldmlvdXNQYWdlIChjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSAtIDE7XG4gIH0sXG4gIGRldGVybWluZU5leHRQYWdlICh0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gdG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSArIDE7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsQ2xhaW1zIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBjbGFpbXMubGVuZ3RoO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwiY29uc3QgeyBnZXRDaGFubmVsRGF0YSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBkYXRhIGZvciBhIGNoYW5uZWxcblxuKi9cblxuY29uc3QgY2hhbm5lbERhdGEgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxEYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbERhdGEuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxucm91dGUgdG8gZ2V0IGEgc2hvcnQgY2hhbm5lbCBpZCBmcm9tIGxvbmcgY2hhbm5lbCBJZFxuXG4qL1xuXG5jb25zdCBjaGFubmVsU2hvcnRJZFJvdXRlID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihzaG9ydElkKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxTaG9ydElkUm91dGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDZXJ0aWZpY2F0ZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NlcnRpZmljYXRlJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAga2V5VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHVibGljS2V5OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENlcnRpZmljYXRlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDZXJ0aWZpY2F0ZS5iZWxvbmdzVG8oZGIuQ2hhbm5lbCwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobG9uZ0NoYW5uZWxJZCwgY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQgJHtjaGFubmVsTmFtZX06JHtsb25nQ2hhbm5lbElkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge25hbWU6IGNoYW5uZWxOYW1lfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsKHMpIGZvdW5kIHdpdGggdGhhdCBjaGFubmVsIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBsb25nQ2hhbm5lbElkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7Y2hhbm5lbENsYWltSWR9JWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSgke2NoYW5uZWxOYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2hhbm5lbE5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUudmFsaWRhdGVMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYHZhbGlkYXRlTG9uZ0NoYW5uZWxJZCgke25hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkKCR7Y2hhbm5lbE5hbWV9LCAke2NoYW5uZWxDbGFpbUlkfSlgKTtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgJiYgKGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ2xhaW1JZCAmJiBjaGFubmVsQ2xhaW1JZC5sZW5ndGggPCA0MCkgeyAgLy8gaWYgYSBzaG9ydCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoY2hhbm5lbE5hbWUpOyAgLy8gaWYgbm8gY2hhbm5lbCBpZCBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQ2VydGlmaWNhdGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jZXJ0aWZpY2F0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBDaGFubmVsID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2hhbm5lbCcsXG4gICAge1xuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbENsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDaGFubmVsLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDaGFubmVsLmJlbG9uZ3NUbyhkYi5Vc2VyKTtcbiAgICBDaGFubmVsLmhhc09uZShkYi5DZXJ0aWZpY2F0ZSk7XG4gIH07XG5cbiAgcmV0dXJuIENoYW5uZWw7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcbmNvbnN0IHsgYXNzZXREZWZhdWx0czogeyB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwgfSwgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlKSB7XG4gIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgcmV0dXJuICdqcGVnJztcbiAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgcmV0dXJuICdwbmcnO1xuICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICByZXR1cm4gJ2dpZic7XG4gICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgIHJldHVybiAnbXA0JztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2VyLmRlYnVnKCdzZXR0aW5nIHVua25vd24gZmlsZSB0eXBlIGFzIGZpbGUgZXh0ZW5zaW9uIGpwZWcnKTtcbiAgICAgIHJldHVybiAnanBlZyc7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGRldGVybWluZVRodW1ibmFpbCAoc3RvcmVkVGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKSB7XG4gIGlmIChzdG9yZWRUaHVtYm5haWwgPT09ICcnKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRUaHVtYm5haWw7XG4gIH1cbiAgcmV0dXJuIHN0b3JlZFRodW1ibmFpbDtcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFpbURhdGEgKGNsYWltKSB7XG4gIC8vIGxvZ2dlci5kZWJ1ZygncHJlcGFyaW5nIGNsYWltIGRhdGEgYmFzZWQgb24gcmVzb2x2ZWQgZGF0YTonLCBjbGFpbSk7XG4gIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gIGNsYWltWydob3N0J10gPSBob3N0O1xuICByZXR1cm4gY2xhaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2xhaW0gPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDbGFpbScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVJZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxpY2Vuc2VVcmw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwcmV2aWV3OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBtZXRhZGF0YVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNvbnRlbnRUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2hhbm5lbE5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2xhaW0uYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENsYWltLmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIGZvciAke2NsYWltTmFtZX0jJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjbGFpbShzKSBmb3VuZCB3aXRoIHRoYXQgY2xhaW0gbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgY2xhaW1JZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zIGZvciAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICAgIHJhdyAgOiB0cnVlLCAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiBvbmx5IGRhdGEsIG5vdCBhbiBhcnJheSBvZiBpbnN0YW5jZXNcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbENsYWltc0FycmF5ID0+IHtcbiAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ2NoYW5uZWxjbGFpbXNhcnJheSBsZW5ndGg6JywgY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgY2hhbm5lbENsYWltc0FycmF5LmZvckVhY2goY2xhaW0gPT4ge1xuICAgICAgICAgICAgICAgIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgICAgICAgICAgICAgICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xhaW07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShjaGFubmVsQ2xhaW1zQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGZpbmRpbmcgY2xhaW0gaWQgZm9yIGNsYWltICR7Y2xhaW1OYW1lfSBmcm9tIGNoYW5uZWwgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lLCBjZXJ0aWZpY2F0ZUlkOiBjaGFubmVsQ2xhaW1JZCB9LFxuICAgICAgICAgIG9yZGVyOiBbWydpZCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYCR7cmVzdWx0Lmxlbmd0aH0gcmVjb3JkcyBmb3VuZCBmb3IgXCIke2NsYWltTmFtZX1cIiBpbiBjaGFubmVsIFwiJHtjaGFubmVsQ2xhaW1JZH1cImApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBzaG9ydElkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDoge1xuICAgICAgICAgICAgICAkbGlrZTogYCR7c2hvcnRJZH0lYCxcbiAgICAgICAgICAgIH19LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSwgIC8vIG5vdGU6IG1heWJlIGhlaWdodCBhbmQgZWZmZWN0aXZlIGFtb3VudCBuZWVkIHRvIHN3aXRjaD9cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2xlbmd0aCBvZiByZXN1bHQnLCByZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uZGF0YVZhbHVlcy5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0udmFsaWRhdGVMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2xhaW1JZCgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgaWYgKGNsYWltSWQgJiYgKGNsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVMb25nQ2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2xhaW1JZCAmJiBjbGFpbUlkLmxlbmd0aCA8IDQwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTsgIC8vIGlmIGEgc2hvcnQgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZShjbGFpbU5hbWUpOyAgLy8gaWYgbm8gY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgQ2xhaW0ucmVzb2x2ZUNsYWltID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLnJlc29sdmVDbGFpbTogJHtuYW1lfSAke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUsIGNsYWltSWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2xhaW1BcnJheSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjbGFpbUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgbW9yZSB0aGFuIG9uZSByZWNvcmQgbWF0Y2hlcyAke25hbWV9IyR7Y2xhaW1JZH0gaW4gZGIuQ2xhaW1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocHJlcGFyZUNsYWltRGF0YShjbGFpbUFycmF5WzBdLmRhdGFWYWx1ZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIENsYWltO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSIH0pID0+IHtcbiAgY29uc3QgRmlsZSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0ZpbGUnLFxuICAgIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgICA6IElOVEVHRVIsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHQgIDogMCxcbiAgICAgIH0sXG4gICAgICBmaWxlTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlUGF0aDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaWxlVHlwZToge1xuICAgICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdHJlbmRpbmdFbGlnaWJsZToge1xuICAgICAgICB0eXBlICAgICAgICA6IEJPT0xFQU4sXG4gICAgICAgIGFsbG93TnVsbCAgIDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIEZpbGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIEZpbGUuaGFzTWFueShkYi5SZXF1ZXN0KTtcbiAgICBGaWxlLmhhc09uZShkYi5DbGFpbSk7XG4gIH07XG5cbiAgRmlsZS5nZXRSZWNlbnRDbGFpbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7XG4gICAgICB3aGVyZTogeyBuc2Z3OiBmYWxzZSwgdHJlbmRpbmdFbGlnaWJsZTogdHJ1ZSB9LFxuICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxuICAgICAgbGltaXQ6IDI1LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBGaWxlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIFRFWFQgfSkgPT4ge1xuICBjb25zdCBSZXF1ZXN0ID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnUmVxdWVzdCcsXG4gICAge1xuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBpcEFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdCAgOiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgUmVxdWVzdC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgUmVxdWVzdC5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBSZXF1ZXN0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgVXNlciA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1VzZXInLFxuICAgIHtcbiAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgVXNlci5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgVXNlci5oYXNPbmUoZGIuQ2hhbm5lbCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY29tcGFyZVBhc3N3b3JkID0gZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChuZXdQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKG5ld1Bhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGN1cnJlbnQgcGFzc3dvcmQgd2l0aCB0aGUgbmV3IGhhc2hcbiAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAudXBkYXRlKHtwYXNzd29yZDogaGFzaH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gcHJlLXNhdmUgaG9vayBtZXRob2QgdG8gaGFzaCB0aGUgdXNlcidzIHBhc3N3b3JkIGJlZm9yZSB0aGUgdXNlcidzIGluZm8gaXMgc2F2ZWQgdG8gdGhlIGRiLlxuICBVc2VyLmhvb2soJ2JlZm9yZUNyZWF0ZScsICh1c2VyLCBvcHRpb25zKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdVc2VyLmJlZm9yZUNyZWF0ZSBob29rLi4uJyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2godXNlci5wYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBwYXNzd29yZCBzdHJpbmcgd2l0aCB0aGUgaGFzaCBwYXNzd29yZCB2YWx1ZVxuICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBoYXNoO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIFVzZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy91c2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmNyeXB0XCJcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHRoaXMgc2l0ZSBwdWJsaXNoZWQgdG8gYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcmV0dXJuIGRhdGEgZm9yIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1EYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gIGxldCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGlmIChjbGFpbUlkID09PSAnbm9uZScpIGNsYWltSWQgPSBudWxsO1xuICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKGNsYWltSW5mbyA9PiB7XG4gICAgICBpZiAoIWNsYWltSW5mbykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogY2xhaW1JbmZvfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbURhdGE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbURhdGEuanMiLCJjb25zdCB7IGdldENsYWltIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUdldCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKG5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzb2x2ZVJlc3VsdCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgIGlmICghcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHVyaSBmb3VuZCBpbiBDbGFpbSB0YWJsZScpO1xuICAgICAgfVxuICAgICAgbGV0IGZpbGVEYXRhID0gY3JlYXRlRmlsZURhdGEocmVzb2x2ZVJlc3VsdCk7XG4gICAgICAvLyBnZXQgdGhlIGNsYWltXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVEYXRhLCBnZXRSZXN1bHQgXSkgPT4ge1xuICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVEYXRhLCB7bmFtZSwgY2xhaW1JZH0sICdGaWxlJyksIGdldFJlc3VsdF0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlLCBjb21wbGV0ZWQgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltR2V0LmpzIiwiY29uc3QgeyBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgbG9uZyBjbGFpbSBpZFxuXG4qL1xuXG5jb25zdCBjbGFpbUxvbmdJZCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IGJvZHkuY2hhbm5lbE5hbWU7XG4gIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgY29uc3QgY2xhaW1OYW1lID0gYm9keS5jbGFpbU5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBib2R5LmNsYWltSWQ7XG4gIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DTEFJTSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0fSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxvbmdJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTG9uZ0lkLmpzIiwiY29uc3QgeyBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIHB1Ymxpc2ggfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGF1dGhlbnRpY2F0ZVVzZXIgfSA9IHJlcXVpcmUoJ2F1dGgvYXV0aGVudGljYXRpb24uanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHB1Ymxpc2ggYSBjbGFpbSB0aHJvdWdoIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1QdWJsaXNoID0gKHsgYm9keSwgZmlsZXMsIGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgdXNlciB9LCByZXMpID0+IHtcbiAgLy8gZGVmaW5lIHZhcmlhYmxlc1xuICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAvLyByZWNvcmQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlcXVlc3RcbiAgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICAvLyB2YWxpZGF0ZUFwaVB1Ymxpc2hSZXF1ZXN0KGJvZHksIGZpbGVzKTtcbiAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAoe2ZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGV9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzKGZpbGVzKSk7XG4gICAgKHtjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmR9ID0gYm9keSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICBQcm9taXNlXG4gICAgLmFsbChbXG4gICAgICBhdXRoZW50aWNhdGVVc2VyKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlciksXG4gICAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKSxcbiAgICAgIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyhmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpLFxuICAgICAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyh0aHVtYm5haWxGaWxlUGF0aCwgbmFtZSwgbGljZW5zZSwgbnNmdyksXG4gICAgXSlcbiAgICAudGhlbigoW3tjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9LCB2YWxpZGF0ZWRDbGFpbU5hbWUsIHB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbFB1Ymxpc2hQYXJhbXNdKSA9PiB7XG4gICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfbmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgdGh1bWJuYWlsXG4gICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICBwdWJsaXNoKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlVHlwZSk7XG4gICAgICB9XG4gICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgcmV0dXJuIHB1Ymxpc2gocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKTtcbiAgICB9KVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICBkYXRhICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgdXJsICAgIDogYCR7aG9zdH0vJHtyZXN1bHQuY2xhaW1faWR9LyR7bmFtZX1gLFxuICAgICAgICAgIGxicnlUeCA6IHJlc3VsdCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgLy8gcmVjb3JkIHRoZSBwdWJsaXNoIGVuZCB0aW1lIGFuZCBzZW5kIHRvIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1QdWJsaXNoO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1QdWJsaXNoLmpzIiwiY29uc3QgeyBkYiB9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhlbnRpY2F0ZVVzZXIgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlcikge1xuICAgIC8vIGNhc2U6IG5vIGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIChhbm9ueW1vdXMpLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXNlciB0b2tlbiBpcyBwcm92aWRlZFxuICAgIGlmICghY2hhbm5lbE5hbWUgJiYgIWNoYW5uZWxJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IG51bGwsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCB1c2VyIHRva2VuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsTmFtZSAhPT0gdXNlci5jaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIG5hbWUgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWxJZCAmJiBjaGFubmVsSWQgIT09IHVzZXIuY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBpZCBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogdXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHBhc3N3b3JkIGluc3RlYWQgb2YgdXNlciB0b2tlblxuICAgIGlmICghY2hhbm5lbFBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ25vIGNoYW5uZWwgcGFzc3dvcmQgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCk7XG4gIH0sXG4gIGF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgdXNlclBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGhvaXN0ZWQgdmFyaWFibGVzXG4gICAgICBsZXQgY2hhbm5lbERhdGE7XG4gICAgICAvLyBidWlsZCB0aGUgcGFyYW1zIGZvciBmaW5kaW5nIHRoZSBjaGFubmVsXG4gICAgICBsZXQgY2hhbm5lbEZpbmRQYXJhbXMgPSB7fTtcbiAgICAgIGlmIChjaGFubmVsTmFtZSkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgIGlmIChjaGFubmVsSWQpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbElkO1xuICAgICAgLy8gZmluZCB0aGUgY2hhbm5lbFxuICAgICAgZGIuQ2hhbm5lbFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IGNoYW5uZWxGaW5kUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gY2hhbm5lbCBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5uZWxEYXRhID0gY2hhbm5lbC5nZXQoKTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgZGF0YTonLCBjaGFubmVsRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRiLlVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyB1c2VyTmFtZTogY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDEpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHVzZXJQYXNzd29yZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoJy4uLnBhc3N3b3JkIHdhcyBhIG1hdGNoLi4uJyk7XG4gICAgICAgICAgcmVzb2x2ZShjaGFubmVsRGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJjb25zdCB7IHJlc29sdmVVcmkgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBydW4gYSByZXNvbHZlIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuXG4qL1xuXG5jb25zdCBjbGFpbVJlc29sdmUgPSAoeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgIC50aGVuKHJlc29sdmVkVXJpID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc29sdmVkVXJpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUmVzb2x2ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUmVzb2x2ZS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIHNob3J0IGNsYWltIGlkIGZyb20gbG9uZyBjbGFpbSBJZFxuXG4qL1xuXG5jb25zdCBjbGFpbVNob3J0SWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHNob3J0SWR9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltU2hvcnRJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1MaXN0IH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGxpc3Qgb2YgY2xhaW1zXG5cbiovXG5cbmNvbnN0IGNsYWltTGlzdCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oY2xhaW1zTGlzdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjbGFpbXNMaXN0KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltTGlzdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTGlzdC5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlZSBpZiBhc3NldCBpcyBhdmFpbGFibGUgbG9jYWxseVxuXG4qL1xuXG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBkYi5GaWxlXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY2xhaW1JZCxcbiAgICAgIH0sXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBmYWxzZX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsZUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2ZpbGVBdmFpbGFiaWxpdHkuanMiLCJjb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcclxuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHVwbG9hZERpcmVjdG9yeSB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XHJcbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSBtdWx0aXBhcnQoe3VwbG9hZERpcjogdXBsb2FkRGlyZWN0b3J5fSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGFydE1pZGRsZXdhcmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW11bHRpcGFydHlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIlxuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcbmNvbnN0IGhhbmRsZUVtYmVkUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZEVtYmVkUGFnZScpO1xuY29uc3QgcmVkaXJlY3QgPSByZXF1aXJlKCcuL3JlZGlyZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAuZ2V0KCcvJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbG9naW4nLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9hYm91dCcsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgcmVkaXJlY3QoJy9wb3B1bGFyJykpO1xuICBhcHAuZ2V0KCcvcG9wdWxhcicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL25ldycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgaGFuZGxlRW1iZWRSZXF1ZXN0KTsgIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0dJTiB9IGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcyc7XG5jb25zdCB7IHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkaXNhYmxlZCAgICAgICAgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWQsXG4gIGRpc2FibGVkTWVzc2FnZSAgIDogcHVibGlzaGluZy5kaXNhYmxlZE1lc3NhZ2UsXG4gIHB1Ymxpc2hJbkNoYW5uZWwgIDogZmFsc2UsXG4gIHNlbGVjdGVkQ2hhbm5lbCAgIDogTE9HSU4sXG4gIHNob3dNZXRhZGF0YUlucHV0czogZmFsc2UsXG4gIHN0YXR1cyAgICAgICAgICAgIDoge1xuICAgIHN0YXR1cyA6IG51bGwsXG4gICAgbWVzc2FnZTogbnVsbCxcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICBmaWxlICAgICAgICAgOiBudWxsLFxuICAgIHVybCAgICAgICAgICA6IG51bGwsXG4gICAgY2hhbm5lbCAgICAgIDogbnVsbCxcbiAgICBwdWJsaXNoU3VibWl0OiBudWxsLFxuICB9LFxuICBmaWxlICAgIDogbnVsbCxcbiAgY2xhaW0gICA6ICcnLFxuICBtZXRhZGF0YToge1xuICAgIHRpdGxlICAgICAgOiAnJyxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgbGljZW5zZSAgICA6ICcnLFxuICAgIG5zZncgICAgICAgOiBmYWxzZSxcbiAgfSxcbiAgdGh1bWJuYWlsOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5GSUxFX1NFTEVDVEVEOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGluaXRpYWxTdGF0ZSwgeyAgLy8gbm90ZTogY2xlYXJzIHRvIGluaXRpYWwgc3RhdGVcbiAgICAgICAgZmlsZTogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9DTEVBUjpcbiAgICAgIHJldHVybiBpbml0aWFsU3RhdGU7XG4gICAgY2FzZSBhY3Rpb25zLk1FVEFEQVRBX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBtZXRhZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubWV0YWRhdGEsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5DTEFJTV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2xhaW06IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUw6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcHVibGlzaEluQ2hhbm5lbDogYWN0aW9uLmNoYW5uZWwsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUFVCTElTSF9TVEFUVVNfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRVJST1JfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGVycm9yOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5lcnJvciwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5uYW1lXTogYWN0aW9uLmRhdGEudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHNlbGVjdGVkQ2hhbm5lbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzaG93TWV0YWRhdGFJbnB1dHM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRIVU1CTkFJTF9ORVc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgdGh1bWJuYWlsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxvZ2dlZEluQ2hhbm5lbDoge1xuICAgIG5hbWUgICA6IG51bGwsXG4gICAgc2hvcnRJZDogbnVsbCxcbiAgICBsb25nSWQgOiBudWxsLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnZWRJbkNoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2NoYW5uZWwuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0NBTF9DSEVDSywgRVJST1IgfSBmcm9tICdjb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHJlcXVlc3Q6IHtcbiAgICBlcnJvcjogbnVsbCxcbiAgICB0eXBlIDogbnVsbCxcbiAgICBpZCAgIDogbnVsbCxcbiAgfSxcbiAgcmVxdWVzdExpc3QgOiB7fSxcbiAgY2hhbm5lbExpc3QgOiB7fSxcbiAgYXNzZXRMaXN0ICAgOiB7fSxcbiAgZGlzcGxheUFzc2V0OiB7XG4gICAgZXJyb3IgOiBudWxsLFxuICAgIHN0YXR1czogTE9DQUxfQ0hFQ0ssXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgLy8gaGFuZGxlIHJlcXVlc3RcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9FUlJPUjpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0LCB7XG4gICAgICAgICAgZXJyb3I6IGFjdGlvbi5kYXRhLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0LCB7XG4gICAgICAgICAgdHlwZTogYWN0aW9uLmRhdGEucmVxdWVzdFR5cGUsXG4gICAgICAgICAgaWQgIDogYWN0aW9uLmRhdGEucmVxdWVzdElkLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIHN0b3JlIHJlcXVlc3RzXG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3RMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgZXJyb3I6IGFjdGlvbi5kYXRhLmVycm9yLFxuICAgICAgICAgICAga2V5ICA6IGFjdGlvbi5kYXRhLmtleSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGFzc2V0IGRhdGFcbiAgICBjYXNlIGFjdGlvbnMuQVNTRVRfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGFzc2V0TGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXNzZXRMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgZXJyb3IgICAgOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIG5hbWUgICAgIDogYWN0aW9uLmRhdGEubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgIDogYWN0aW9uLmRhdGEuY2xhaW1JZCxcbiAgICAgICAgICAgIHNob3J0SWQgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1EYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gY2hhbm5lbCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNoYW5uZWxMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIG5hbWUgICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBsb25nSWQgICAgOiBhY3Rpb24uZGF0YS5sb25nSWQsXG4gICAgICAgICAgICBzaG9ydElkICAgOiBhY3Rpb24uZGF0YS5zaG9ydElkLFxuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuY2hhbm5lbExpc3RJZF06IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0W2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdLCB7XG4gICAgICAgICAgICBjbGFpbXNEYXRhOiBhY3Rpb24uZGF0YS5jbGFpbXNEYXRhLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGRpc3BsYXkgYW4gYXNzZXRcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlBc3NldDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGlzcGxheUFzc2V0LCB7XG4gICAgICAgICAgc3RhdHVzOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRElTUExBWV9BU1NFVF9FUlJPUjpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIGVycm9yIDogYWN0aW9uLmRhdGEsXG4gICAgICAgICAgc3RhdHVzOiBFUlJPUixcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvc2hvdy5qcyIsImNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IHtcbiAgYW5hbHl0aWNzOiB7XG4gICAgZ29vZ2xlSWQ6IGdvb2dsZUFuYWx5dGljc0lkLFxuICB9LFxuICBhc3NldERlZmF1bHRzOiB7XG4gICAgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIGRlc2NyaXB0aW9uOiBkZWZhdWx0RGVzY3JpcHRpb24sXG4gIH0sXG4gIGRldGFpbHM6IHtcbiAgICBkZXNjcmlwdGlvbixcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICAgIHR3aXR0ZXIsXG4gIH0sXG59ID0gc2l0ZUNvbmZpZztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkZXNjcmlwdGlvbixcbiAgZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIGhvc3QsXG4gIHRpdGxlLFxuICB0d2l0dGVyLFxuICBkZWZhdWx0RGVzY3JpcHRpb24sXG4gIGRlZmF1bHRUaHVtYm5haWwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1nYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWdhXCJcbi8vIG1vZHVsZSBpZCA9IDExMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBQdWJsaXNoVG9vbCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hUb29sJztcblxuY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbid9PlxuICAgICAgICA8U0VPIC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nfT5cbiAgICAgICAgICA8UHVibGlzaFRvb2wgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Ib21lUGFnZS9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgY3JlYXRlUGFnZVRpdGxlIH0gZnJvbSAndXRpbHMvcGFnZVRpdGxlJztcbmltcG9ydCB7IGNyZWF0ZU1ldGFUYWdzIH0gZnJvbSAndXRpbHMvbWV0YVRhZ3MnO1xuaW1wb3J0IHsgY3JlYXRlQ2Fub25pY2FsTGluayB9IGZyb20gJ3V0aWxzL2Nhbm9uaWNhbExpbmsnO1xuXG5jbGFzcyBTRU8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIC8vIHByb3BzIGZyb20gc3RhdGVcbiAgICBjb25zdCB7IGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBwcm9wcyBmcm9tIHBhcmVudFxuICAgIGNvbnN0IHsgYXNzZXQsIGNoYW5uZWwsIHBhZ2VVcmkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHsgcGFnZVRpdGxlIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNyZWF0ZSBwYWdlIHRpdGxlLCB0YWdzLCBhbmQgY2Fub25pY2FsIGxpbmtcbiAgICBwYWdlVGl0bGUgPSBjcmVhdGVQYWdlVGl0bGUoc2l0ZVRpdGxlLCBwYWdlVGl0bGUpO1xuICAgIGNvbnN0IG1ldGFUYWdzID0gY3JlYXRlTWV0YVRhZ3Moc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgY29uc3QgY2Fub25pY2FsTGluayA9IGNyZWF0ZUNhbm9uaWNhbExpbmsoYXNzZXQsIGNoYW5uZWwsIHBhZ2VVcmksIHNpdGVIb3N0KTtcbiAgICAvLyByZW5kZXIgcmVzdWx0c1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0XG4gICAgICAgIHRpdGxlPXtwYWdlVGl0bGV9XG4gICAgICAgIG1ldGE9e21ldGFUYWdzfVxuICAgICAgICBsaW5rPXtbe3JlbDogJ2Nhbm9uaWNhbCcsIGhyZWY6IGNhbm9uaWNhbExpbmt9XX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcblxuU0VPLnByb3BUeXBlcyA9IHtcbiAgcGFnZVRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwYWdlVXJpICA6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoYW5uZWwgIDogUHJvcFR5cGVzLm9iamVjdCxcbiAgYXNzZXQgICAgOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU0VPO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvU0VPL3ZpZXcuanN4IiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVBhZ2VUaXRsZSA9IChzaXRlVGl0bGUsIHBhZ2VUaXRsZSkgPT4ge1xuICBpZiAoIXBhZ2VUaXRsZSkge1xuICAgIHJldHVybiBgJHtzaXRlVGl0bGV9YDtcbiAgfVxuICByZXR1cm4gYCR7c2l0ZVRpdGxlfSAtICR7cGFnZVRpdGxlfWA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3BhZ2VUaXRsZS5qcyIsImNvbnN0IGRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSAodGh1bWJuYWlsKSA9PiB7XG4gIGlmICh0aHVtYm5haWwpIHtcbiAgICBjb25zdCBmaWxlRXh0ID0gdGh1bWJuYWlsLnN1YnN0cmluZyh0aHVtYm5haWwubGFzdEluZGV4T2YoJy4nKSk7XG4gICAgc3dpdGNoIChmaWxlRXh0KSB7XG4gICAgICBjYXNlICdqcGVnJzpcbiAgICAgIGNhc2UgJ2pwZyc6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvanBlZyc7XG4gICAgICBjYXNlICdwbmcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL3BuZyc7XG4gICAgICBjYXNlICdnaWYnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2dpZic7XG4gICAgICBjYXNlICdtcDQnOlxuICAgICAgICByZXR1cm4gJ3ZpZGVvL21wNCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59O1xuXG5jb25zdCBjcmVhdGVCYXNpY01ldGFUYWdzID0gKHNpdGVIb3N0LCBzaXRlRGVzY3JpcHRpb24sIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogc2l0ZUhvc3R9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBzaXRlRGVzY3JpcHRpb259LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQ2hhbm5lbE1ldGFUYWdzID0gKHNpdGVUaXRsZSwgc2l0ZUhvc3QsIHNpdGVUd2l0dGVyLCBjaGFubmVsKSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogYCR7bmFtZX0gb24gJHtzaXRlVGl0bGV9YH0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IGAke25hbWV9LCBhIGNoYW5uZWwgb24gJHtzaXRlVGl0bGV9YH0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5J30sXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldE1ldGFUYWdzID0gKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKSA9PiB7XG4gIGNvbnN0IHsgY2xhaW1EYXRhIH0gPSBhc3NldDtcbiAgY29uc3QgeyBjb250ZW50VHlwZSB9ID0gY2xhaW1EYXRhO1xuICBjb25zdCBlbWJlZFVybCA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfWA7XG4gIGNvbnN0IHNob3dVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzb3VyY2UgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX0uJHtjbGFpbURhdGEuZmlsZUV4dH1gO1xuICBjb25zdCBvZ1RpdGxlID0gY2xhaW1EYXRhLnRpdGxlIHx8IGNsYWltRGF0YS5uYW1lO1xuICBjb25zdCBvZ0Rlc2NyaXB0aW9uID0gY2xhaW1EYXRhLmRlc2NyaXB0aW9uIHx8IGRlZmF1bHREZXNjcmlwdGlvbjtcbiAgY29uc3Qgb2dUaHVtYm5haWxDb250ZW50VHlwZSA9IGRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUoY2xhaW1EYXRhLnRodW1ibmFpbCk7XG4gIGNvbnN0IG9nVGh1bWJuYWlsID0gY2xhaW1EYXRhLnRodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsO1xuICBjb25zdCBtZXRhVGFncyA9IFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IG9nVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNob3dVcmx9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBvZ0Rlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICdvZzppbWFnZTp3aWR0aCcsIGNvbnRlbnQ6IDYwMH0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6aGVpZ2h0JywgY29udGVudDogMzE1fSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gIF07XG4gIGlmIChjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL21wNCcgfHwgY29udGVudFR5cGUgPT09ICd2aWRlby93ZWJtJykge1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW8nLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvOnNlY3VyZV91cmwnLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvOnR5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBvZ1RodW1ibmFpbH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IG9nVGh1bWJuYWlsQ29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAndmlkZW8nfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAncGxheWVyJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXInLCBjb250ZW50OiBlbWJlZFVybH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6d2lkdGgnLCBjb250ZW50OiA2MDB9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6dGV4dDpwbGF5ZXJfd2lkdGgnLCBjb250ZW50OiA2MDB9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOmhlaWdodCcsIGNvbnRlbnQ6IDMzN30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpzdHJlYW06Y29udGVudF90eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgfSBlbHNlIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZTp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAnYXJ0aWNsZSd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5X2xhcmdlX2ltYWdlJ30pO1xuICB9XG4gIHJldHVybiBtZXRhVGFncztcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNZXRhVGFncyA9IChzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgY2hhbm5lbCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKSA9PiB7XG4gIGlmIChhc3NldCkge1xuICAgIHJldHVybiBjcmVhdGVBc3NldE1ldGFUYWdzKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbE1ldGFUYWdzKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBjaGFubmVsKTtcbiAgfTtcbiAgcmV0dXJuIGNyZWF0ZUJhc2ljTWV0YVRhZ3Moc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlcik7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL21ldGFUYWdzLmpzIiwiY29uc3QgY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rID0gKHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtwYWdlfWA7XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsgPSAoYXNzZXQsIHNpdGVIb3N0KSA9PiB7XG4gIGxldCBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZDtcbiAgaWYgKGFzc2V0LmNsYWltRGF0YSkge1xuICAgICh7IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGEpO1xuICB9O1xuICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2hhbm5lbE5hbWV9OiR7Y2VydGlmaWNhdGVJZH0vJHtuYW1lfWA7XG4gIH07XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rID0gKGNoYW5uZWwsIHNpdGVIb3N0KSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBjaGFubmVsLCBwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rKGFzc2V0LCBzaXRlSG9zdCk7XG4gIH1cbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsoY2hhbm5lbCwgc2l0ZUhvc3QpO1xuICB9XG4gIHJldHVybiBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsocGFnZSwgc2l0ZUhvc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9jYW5vbmljYWxMaW5rLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5hdkxpbmssIHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBMb2dvIGZyb20gJ2NvbXBvbmVudHMvTG9nbyc7XG5pbXBvcnQgTmF2QmFyQ2hhbm5lbERyb3Bkb3duIGZyb20gJ2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bic7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY29uc3QgVklFVyA9ICdWSUVXJztcbmNvbnN0IExPR09VVCA9ICdMT0dPVVQnO1xuXG5jbGFzcyBOYXZCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlciA9IHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ291dFVzZXIgPSB0aGlzLmxvZ291dFVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbiA9IHRoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgdXNlciBpcyBhbHJlYWR5IGxvZ2dlZCBpblxuICAgIHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIoKTtcbiAgfVxuICBjaGVja0ZvckxvZ2dlZEluVXNlciAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9O1xuICAgIHJlcXVlc3QoJy91c2VyJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oZGF0YS5jaGFubmVsTmFtZSwgZGF0YS5zaG9ydENoYW5uZWxJZCwgZGF0YS5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJy91c2VyIGVycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgbG9nb3V0VXNlciAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9O1xuICAgIHJlcXVlc3QoJy9sb2dvdXQnLCBwYXJhbXMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9nb3V0KCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJy9sb2dvdXQgZXJyb3InLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIGhhbmRsZVNlbGVjdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBMT0dPVVQ6XG4gICAgICAgIHRoaXMubG9nb3V0VXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVklFVzpcbiAgICAgICAgLy8gcmVkaXJlY3QgdG8gY2hhbm5lbCBwYWdlXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvJHt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfToke3RoaXMucHJvcHMuY2hhbm5lbExvbmdJZH1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHNpdGVEZXNjcmlwdGlvbiB9ID0gIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIG5hdi1iYXInPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tc2hvcnQgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1jZW50ZXInPlxuICAgICAgICAgIDxMb2dvIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdi1iYXItLWNlbnRlcic+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J25hdi1iYXItdGFnbGluZSc+e3NpdGVEZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdi1iYXItLXJpZ2h0Jz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nLycgZXhhY3Q+UHVibGlzaDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy9hYm91dCc+QWJvdXQ8L05hdkxpbms+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hhbm5lbE5hbWUgPyAoXG4gICAgICAgICAgICAgIDxOYXZCYXJDaGFubmVsRHJvcGRvd25cbiAgICAgICAgICAgICAgICBjaGFubmVsTmFtZT17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3Rpb249e3RoaXMuaGFuZGxlU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3Rpb249e3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9XG4gICAgICAgICAgICAgICAgVklFVz17VklFV31cbiAgICAgICAgICAgICAgICBMT0dPVVQ9e0xPR09VVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxOYXZMaW5rIGlkPSduYXYtYmFyLWxvZ2luLWxpbmsnIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2xvZ2luJz5DaGFubmVsPC9OYXZMaW5rPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTmF2QmFyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmZ1bmN0aW9uIExvZ28gKCkge1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmVyc2lvbj0nMS4xJyBpZD0nTGF5ZXJfMScgeD0nMHB4JyB5PScwcHgnIGhlaWdodD0nMjRweCcgdmlld0JveD0nMCAwIDgwIDMxJyBlbmFibGVCYWNrZ3JvdW5kPSduZXcgMCAwIDgwIDMxJyBjbGFzc05hbWU9J25hdi1iYXItbG9nbyc+XG4gICAgICA8TGluayB0bz0nLyc+XG4gICAgICAgIDx0aXRsZT5Mb2dvPC90aXRsZT5cbiAgICAgICAgPGRlc2M+U3BlZS5jaCBsb2dvPC9kZXNjPlxuICAgICAgICA8ZyBpZD0nQWJvdXQnPlxuICAgICAgICAgIDxnIGlkPSdQdWJsaXNoLUZvcm0tVjItX3gyOF9maWxsZWRfeDI5XycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTQyLjAwMDAwMCwgLTIzLjAwMDAwMCknPlxuICAgICAgICAgICAgPGcgaWQ9J0dyb3VwLTE3JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg0Mi4wMDAwMDAsIDIyLjAwMDAwMCknPlxuICAgICAgICAgICAgICA8dGV4dCB0cmFuc2Zvcm09J21hdHJpeCgxIDAgMCAxIDAgMjApJyBmb250U2l6ZT0nMjUnIGZvbnRGYW1pbHk9J1JvYm90byc+U3BlZSZsdDtoPC90ZXh0PlxuICAgICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTYnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAzMC4wMDAwMDApJz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04JyBmaWxsPSdub25lJyBzdHJva2U9JyMwOUY5MTEnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00wLjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weScgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDI5RDc0JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMTYuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTInIGZpbGw9J25vbmUnIHN0cm9rZT0nI0UzNUJEOCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTMyLjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS0zJyBmaWxsPSdub25lJyBzdHJva2U9JyM0MTU2QzUnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J000OC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjNjM1Njg4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNNjQuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvTGluaz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ287XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Mb2dvL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIE5hdkJhckNoYW5uZWxEcm9wZG93biAoeyBjaGFubmVsTmFtZSwgaGFuZGxlU2VsZWN0aW9uLCBkZWZhdWx0U2VsZWN0aW9uLCBWSUVXLCBMT0dPVVQgfSkge1xuICByZXR1cm4gKFxuICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tYXJyb3cgbGluay0tbmF2JyBvbkNoYW5nZT17aGFuZGxlU2VsZWN0aW9ufSB2YWx1ZT17ZGVmYXVsdFNlbGVjdGlvbn0+XG4gICAgICA8b3B0aW9uIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0LWNoYW5uZWwtb3B0aW9uJz57Y2hhbm5lbE5hbWV9PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPXtWSUVXfT5WaWV3PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPXtMT0dPVVR9PkxvZ291dDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2QmFyQ2hhbm5lbERyb3Bkb3duO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRpc2FibGVkOiBwdWJsaXNoLmRpc2FibGVkLFxuICAgIGZpbGUgICAgOiBwdWJsaXNoLmZpbGUsXG4gICAgc3RhdHVzICA6IHB1Ymxpc2guc3RhdHVzLnN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUb29sL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBEcm9wem9uZSBmcm9tICdjb250YWluZXJzL0Ryb3B6b25lJztcbmltcG9ydCBQdWJsaXNoRGV0YWlscyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzJztcbmltcG9ydCBQdWJsaXNoU3RhdHVzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cyc7XG5pbXBvcnQgUHVibGlzaERpc2FibGVkTWVzc2FnZSBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UnO1xuXG5jbGFzcyBQdWJsaXNoVG9vbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwdWJsaXNoIGlzIGRpc2FibGVkJyk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UHVibGlzaERpc2FibGVkTWVzc2FnZSAvPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ3B1Ymxpc2ggaXMgbm90IGRpc2FibGVkJyk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0YXR1cykge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UHVibGlzaFN0YXR1cyAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDxQdWJsaXNoRGV0YWlscyAvPjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIDxEcm9wem9uZSAvPjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUb29sO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdmFsaWRhdGVGaWxlIH0gZnJvbSAndXRpbHMvZmlsZSc7XG5pbXBvcnQgUHVibGlzaFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9QdWJsaXNoUHJldmlldyc7XG5cbmNsYXNzIERyb3B6b25lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcmFnT3ZlciAgOiBmYWxzZSxcbiAgICAgIG1vdXNlT3ZlciA6IGZhbHNlLFxuICAgICAgZGltUHJldmlldzogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZURyb3AgPSB0aGlzLmhhbmRsZURyb3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdPdmVyID0gdGhpcy5oYW5kbGVEcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0VudGVyID0gdGhpcy5oYW5kbGVEcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdMZWF2ZSA9IHRoaXMuaGFuZGxlRHJhZ0xlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUVudGVyID0gdGhpcy5oYW5kbGVNb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUxlYXZlID0gdGhpcy5oYW5kbGVNb3VzZUxlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVJbnB1dCA9IHRoaXMuaGFuZGxlRmlsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jaG9vc2VGaWxlID0gdGhpcy5jaG9vc2VGaWxlLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiBmYWxzZX0pO1xuICAgIC8vIGlmIGRyb3BwZWQgaXRlbXMgYXJlbid0IGZpbGVzLCByZWplY3QgdGhlbVxuICAgIGNvbnN0IGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgIGlmIChkdC5pdGVtcykge1xuICAgICAgaWYgKGR0Lml0ZW1zWzBdLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICBjb25zdCBkcm9wcGVkRmlsZSA9IGR0Lml0ZW1zWzBdLmdldEFzRmlsZSgpO1xuICAgICAgICB0aGlzLmNob29zZUZpbGUoZHJvcHBlZEZpbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnT3ZlciAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGhhbmRsZURyYWdFbmQgKGV2ZW50KSB7XG4gICAgdmFyIGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgIGlmIChkdC5pdGVtcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkdC5pdGVtcy5yZW1vdmUoaSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5jbGVhckRhdGEoKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZ0VudGVyICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogdHJ1ZSwgZGltUHJldmlldzogdHJ1ZX0pO1xuICB9XG4gIGhhbmRsZURyYWdMZWF2ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IGZhbHNlLCBkaW1QcmV2aWV3OiBmYWxzZX0pO1xuICB9XG4gIGhhbmRsZU1vdXNlRW50ZXIgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogdHJ1ZSwgZGltUHJldmlldzogdHJ1ZX0pO1xuICB9XG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogZmFsc2UsIGRpbVByZXZpZXc6IGZhbHNlfSk7XG4gIH1cbiAgaGFuZGxlQ2xpY2sgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZV9pbnB1dCcpLmNsaWNrKCk7XG4gIH1cbiAgaGFuZGxlRmlsZUlucHV0IChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZmlsZUxpc3QgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgdGhpcy5jaG9vc2VGaWxlKGZpbGVMaXN0WzBdKTtcbiAgfVxuICBjaG9vc2VGaWxlIChmaWxlKSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbGlkYXRlRmlsZShmaWxlKTsgLy8gdmFsaWRhdGUgdGhlIGZpbGUncyBuYW1lLCB0eXBlLCBhbmQgc2l6ZVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2V0RmlsZUVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgLy8gc3RhZ2UgaXQgc28gaXQgd2lsbCBiZSByZWFkeSB3aGVuIHRoZSBwdWJsaXNoIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdEZpbGUoZmlsZSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dC1maWxlJyB0eXBlPSdmaWxlJyBpZD0nZmlsZV9pbnB1dCcgbmFtZT0nZmlsZV9pbnB1dCcgYWNjZXB0PSd2aWRlby8qLGltYWdlLyonIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUZpbGVJbnB1dH0gZW5jVHlwZT0nbXVsdGlwYXJ0L2Zvcm0tZGF0YScgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8ZGl2IGlkPSdwcmV2aWV3LWRyb3B6b25lJyBjbGFzc05hbWU9eydyb3cgcm93LS1wYWRkZWQgcm93LS10YWxsIGRyb3B6b25lJyArICh0aGlzLnN0YXRlLmRyYWdPdmVyID8gJyBkcm9wem9uZS0tZHJhZy1vdmVyJyA6ICcnKX0gb25Ecm9wPXt0aGlzLmhhbmRsZURyb3B9IG9uRHJhZ092ZXI9e3RoaXMuaGFuZGxlRHJhZ092ZXJ9IG9uRHJhZ0VuZD17dGhpcy5oYW5kbGVEcmFnRW5kfSBvbkRyYWdFbnRlcj17dGhpcy5oYW5kbGVEcmFnRW50ZXJ9IG9uRHJhZ0xlYXZlPXt0aGlzLmhhbmRsZURyYWdMZWF2ZX0gb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9IG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb3VzZUxlYXZlfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWxlID8gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hQcmV2aWV3XG4gICAgICAgICAgICAgICAgZGltUHJldmlldz17dGhpcy5zdGF0ZS5kaW1QcmV2aWV3fVxuICAgICAgICAgICAgICAgIGZpbGU9e3RoaXMucHJvcHMuZmlsZX1cbiAgICAgICAgICAgICAgICB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS10ZXh0LWhvbGRlcicgY2xhc3NOYW1lPXsnZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcid9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5kcmFnT3ZlciA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWRyYWdvdmVyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz5Ecm9wIGl0LjwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUubW91c2VPdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtaW5zdHJ1Y3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtcGxhY2Vob2xkZXIgaW5mby1tZXNzYWdlLS1mYWlsdXJlJyBpZD0naW5wdXQtZXJyb3ItZmlsZS1zZWxlY3Rpb24nPnt0aGlzLnByb3BzLmZpbGVFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkRyYWcgJiBkcm9wIGltYWdlIG9yIHZpZGVvIGhlcmUgdG8gcHVibGlzaDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5PUjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlLS11bmRlcmxpbmVkJz5DSE9PU0UgRklMRTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtdGV4dC1ob2xkZXInIGNsYXNzTmFtZT17J2ZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInfT5cbiAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRyYWdPdmVyID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWRyYWdvdmVyJz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+RHJvcCBpdC48L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtaW5zdHJ1Y3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLXBsYWNlaG9sZGVyIGluZm8tbWVzc2FnZS0tZmFpbHVyZScgaWQ9J2lucHV0LWVycm9yLWZpbGUtc2VsZWN0aW9uJz57dGhpcy5wcm9wcy5maWxlRXJyb3J9PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+RHJhZyAmIGRyb3AgaW1hZ2Ugb3IgdmlkZW8gaGVyZSB0byBwdWJsaXNoPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5PUjwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZS0tdW5kZXJsaW5lZCc+Q0hPT1NFIEZJTEU8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvdmlldy5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmFsaWRhdGVGaWxlIChmaWxlKSB7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcHJvdmlkZWQnKTtcbiAgICB9XG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgc2l6ZSBhbmQgdHlwZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgR0lGcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZpbGUudHlwZSArICcgaXMgbm90IGEgc3VwcG9ydGVkIGZpbGUgdHlwZS4gT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBQdWJsaXNoUHJldmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaW1nU291cmNlICAgICAgIDogJycsXG4gICAgICBkZWZhdWx0VGh1bWJuYWlsOiAnL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIH07XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlKHRoaXMucHJvcHMuZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICBpZiAobmV3UHJvcHMuZmlsZSAhPT0gdGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZShuZXdQcm9wcy5maWxlKTtcbiAgICB9XG4gICAgaWYgKG5ld1Byb3BzLnRodW1ibmFpbCAhPT0gdGhpcy5wcm9wcy50aHVtYm5haWwpIHtcbiAgICAgIGlmIChuZXdQcm9wcy50aHVtYm5haWwpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShuZXdQcm9wcy50aHVtYm5haWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUgKGZpbGUpIHtcbiAgICBjb25zdCBwcmV2aWV3UmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBwcmV2aWV3UmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgcHJldmlld1JlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHByZXZpZXdSZWFkZXIucmVzdWx0fSk7XG4gICAgfTtcbiAgfVxuICBzZXRQcmV2aWV3SW1hZ2VTb3VyY2UgKGZpbGUpIHtcbiAgICBpZiAoZmlsZS50eXBlICE9PSAndmlkZW8vbXA0Jykge1xuICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShmaWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUodGhpcy5wcm9wcy50aHVtYm5haWwpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGltZ1xuICAgICAgICBpZD0nZHJvcHpvbmUtcHJldmlldydcbiAgICAgICAgc3JjPXt0aGlzLnN0YXRlLmltZ1NvdXJjZX1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmRpbVByZXZpZXcgPyAnZGltJyA6ICcnfVxuICAgICAgICBhbHQ9J3B1Ymxpc2ggcHJldmlldydcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcblxuUHVibGlzaFByZXZpZXcucHJvcFR5cGVzID0ge1xuICBkaW1QcmV2aWV3OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmaWxlICAgICAgOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHRodW1ibmFpbCA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoUHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3L2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGUsIHN0YXJ0UHVibGlzaH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGU6IHB1Ymxpc2guZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxuICBzdGFydFB1Ymxpc2gsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBEcm9wem9uZSBmcm9tICdjb250YWluZXJzL0Ryb3B6b25lJztcbmltcG9ydCBQdWJsaXNoVGl0bGVJbnB1dCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0JztcbmltcG9ydCBQdWJsaXNoVXJsSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hUaHVtYm5haWxJbnB1dCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dCc7XG5pbXBvcnQgUHVibGlzaE1ldGFkYXRhSW5wdXRzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzJztcbmltcG9ydCBDaGFubmVsU2VsZWN0IGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdCc7XG5cbmNsYXNzIFB1Ymxpc2hEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5vblB1Ymxpc2hTdWJtaXQgPSB0aGlzLm9uUHVibGlzaFN1Ym1pdC5iaW5kKHRoaXMpO1xuICB9XG4gIG9uUHVibGlzaFN1Ym1pdCAoKSB7XG4gICAgdGhpcy5wcm9wcy5zdGFydFB1Ymxpc2godGhpcy5wcm9wcy5oaXN0b3J5KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tYm90dG9tJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICA8UHVibGlzaFRpdGxlSW5wdXQgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvKiBsZWZ0IGNvbHVtbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAnID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxEcm9wem9uZSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey8qIHJpZ2h0IGNvbHVtbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgIDxkaXYgaWQ9J3B1Ymxpc2gtYWN0aXZlLWFyZWEnIGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hVcmxJbnB1dCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxDaGFubmVsU2VsZWN0IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuZmlsZS50eXBlID09PSAndmlkZW8vbXA0JykgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSAnPlxuICAgICAgICAgICAgICAgIDxQdWJsaXNoVGh1bWJuYWlsSW5wdXQgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLW5vLWJvdHRvbSByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8UHVibGlzaE1ldGFkYXRhSW5wdXRzIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ncHVibGlzaC1zdWJtaXQnIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0tbGFyZ2UnIG9uQ2xpY2s9e3RoaXMub25QdWJsaXNoU3VibWl0fT5QdWJsaXNoPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby1ib3R0b20gYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1jYW5jZWwnIG9uQ2xpY2s9e3RoaXMucHJvcHMuY2xlYXJGaWxlfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5CeSBjbGlja2luZyAnUHVibGlzaCcsIHlvdSBhZmZpcm0gdGhhdCB5b3UgaGF2ZSB0aGUgcmlnaHRzIHRvIHB1Ymxpc2ggdGhpcyBjb250ZW50IHRvIHRoZSBMQlJZIG5ldHdvcmssIGFuZCB0aGF0IHlvdSB1bmRlcnN0YW5kIHRoZSBwcm9wZXJ0aWVzIG9mIHB1Ymxpc2hpbmcgaXQgdG8gYSBkZWNlbnRyYWxpemVkLCB1c2VyLWNvbnRyb2xsZWQgbmV0d29yay4gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2xlYXJuJz5SZWFkIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoUHVibGlzaERldGFpbHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7dXBkYXRlTWV0YWRhdGF9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogcHVibGlzaC5tZXRhZGF0YS50aXRsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbk1ldGFkYXRhQ2hhbmdlOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZU1ldGFkYXRhKG5hbWUsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQdWJsaXNoVGl0bGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChlKSB7XG4gICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0ncHVibGlzaC10aXRsZScgY2xhc3NOYW1lPSdpbnB1dC10ZXh0IHRleHQtLWxhcmdlIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIG5hbWU9J3RpdGxlJyBwbGFjZWhvbGRlcj0nR2l2ZSB5b3VyIHBvc3QgYSB0aXRsZS4uLicgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IHZhbHVlPXt0aGlzLnByb3BzLnRpdGxlfSAvPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRpdGxlSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dC92aWV3LmpzeCIsImltcG9ydCB7dXBkYXRlQ2xhaW0sIHVwZGF0ZUVycm9yfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lICAgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQ6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLnNob3J0SWQsXG4gICAgZmlsZU5hbWUgICAgICAgICAgICAgIDogcHVibGlzaC5maWxlLm5hbWUsXG4gICAgcHVibGlzaEluQ2hhbm5lbCAgICAgIDogcHVibGlzaC5wdWJsaXNoSW5DaGFubmVsLFxuICAgIHNlbGVjdGVkQ2hhbm5lbCAgICAgICA6IHB1Ymxpc2guc2VsZWN0ZWRDaGFubmVsLFxuICAgIGNsYWltICAgICAgICAgICAgICAgICA6IHB1Ymxpc2guY2xhaW0sXG4gICAgdXJsRXJyb3IgICAgICAgICAgICAgIDogcHVibGlzaC5lcnJvci51cmwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DbGFpbUNoYW5nZTogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVDbGFpbSh2YWx1ZSkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ3B1Ymxpc2hTdWJtaXQnLCBudWxsKSk7XG4gICAgfSxcbiAgICBvblVybEVycm9yOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCd1cmwnLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcbmltcG9ydCBVcmxNaWRkbGUgZnJvbSAnY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheSc7XG5cbmNsYXNzIFB1Ymxpc2hVcmxJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGNsYWltLCBmaWxlTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNsYWltKSB7XG4gICAgICB0aGlzLnNldENsYWltTmFtZShmaWxlTmFtZSk7XG4gICAgfVxuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKHsgY2xhaW0sIGZpbGVOYW1lIH0pIHtcbiAgICAvLyBpZiBhIG5ldyBmaWxlIHdhcyBjaG9zZW4sIHVwZGF0ZSB0aGUgY2xhaW0gbmFtZVxuICAgIGlmIChmaWxlTmFtZSAhPT0gdGhpcy5wcm9wcy5maWxlTmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0Q2xhaW1OYW1lKGZpbGVOYW1lKTtcbiAgICB9XG4gICAgLy8gaWYgdGhlIGNsYWltIGhhcyB1cGRhdGVkLCBjaGVjayBpdHMgYXZhaWxhYmlsaXR5XG4gICAgaWYgKGNsYWltICE9PSB0aGlzLnByb3BzLmNsYWltKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlQ2xhaW0oY2xhaW0pO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmNsZWFuc2VJbnB1dCh2YWx1ZSk7XG4gICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgIHRoaXMucHJvcHMub25DbGFpbUNoYW5nZSh2YWx1ZSk7XG4gIH1cbiAgY2xlYW5zZUlucHV0IChpbnB1dCkge1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxzKy9nLCAnLScpOyAvLyByZXBsYWNlIHNwYWNlcyB3aXRoIGRhc2hlc1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTktXS9nLCAnJyk7ICAvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksIG9yICctJ1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBzZXRDbGFpbU5hbWUgKGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVXaXRob3V0RW5kaW5nID0gZmlsZU5hbWUuc3Vic3RyaW5nKDAsIGZpbGVOYW1lLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIGNvbnN0IGNsZWFuQ2xhaW1OYW1lID0gdGhpcy5jbGVhbnNlSW5wdXQoZmlsZU5hbWVXaXRob3V0RW5kaW5nKTtcbiAgICB0aGlzLnByb3BzLm9uQ2xhaW1DaGFuZ2UoY2xlYW5DbGFpbU5hbWUpO1xuICB9XG4gIHZhbGlkYXRlQ2xhaW0gKGNsYWltKSB7XG4gICAgaWYgKCFjbGFpbSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25VcmxFcnJvcignRW50ZXIgYSB1cmwgYWJvdmUnKTtcbiAgICB9XG4gICAgcmVxdWVzdChgL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvJHtjbGFpbX1gKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uVXJsRXJyb3IobnVsbCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uVXJsRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2xhaW0sIGxvZ2dlZEluQ2hhbm5lbE5hbWUsIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQsIHB1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgdXJsRXJyb3IgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IHNwYW4tLXJlbGF0aXZlJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnknPnNwZWUuY2ggLyA8L3NwYW4+XG4gICAgICAgICAgPFVybE1pZGRsZVxuICAgICAgICAgICAgcHVibGlzaEluQ2hhbm5lbD17cHVibGlzaEluQ2hhbm5lbH1cbiAgICAgICAgICAgIHNlbGVjdGVkQ2hhbm5lbD17c2VsZWN0ZWRDaGFubmVsfVxuICAgICAgICAgICAgbG9nZ2VkSW5DaGFubmVsTmFtZT17bG9nZ2VkSW5DaGFubmVsTmFtZX1cbiAgICAgICAgICAgIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQ9e2xvZ2dlZEluQ2hhbm5lbFNob3J0SWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2NsYWltLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nY2xhaW0nIHBsYWNlaG9sZGVyPSd5b3VyLXVybC1oZXJlJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gdmFsdWU9e2NsYWltfSAvPlxuICAgICAgICAgIHsgKGNsYWltICYmICF1cmxFcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2xhaW0tbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLXN1Y2Nlc3Mgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxMyd9PC9zcGFuPiB9XG4gICAgICAgICAgeyB1cmxFcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7IHVybEVycm9yID8gKFxuICAgICAgICAgICAgPHAgaWQ9J2lucHV0LWVycm9yLWNsYWltLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dXJsRXJyb3J9PC9wPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+Q2hvb3NlIGEgY3VzdG9tIHVybDwvcD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFVybElucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmZ1bmN0aW9uIFVybE1pZGRsZSAoe3B1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgbG9nZ2VkSW5DaGFubmVsTmFtZSwgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0pIHtcbiAgaWYgKHB1Ymxpc2hJbkNoYW5uZWwpIHtcbiAgICBpZiAoc2VsZWN0ZWRDaGFubmVsID09PSBsb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gPHNwYW4gaWQ9J3VybC1jaGFubmVsJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnknPntsb2dnZWRJbkNoYW5uZWxOYW1lfTp7bG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0gLzwvc3Bhbj47XG4gICAgfVxuICAgIHJldHVybiA8c3BhbiBpZD0ndXJsLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz5AY2hhbm5lbDxzcGFuXG4gICAgICBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+U2VsZWN0IGEgY2hhbm5lbCBiZWxvdzwvc3Bhbj4gLzwvc3Bhbj47XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8c3BhbiBpZD0ndXJsLW5vLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz54eXo8c3BhbiBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+VGhpcyB3aWxsIGJlIGEgcmFuZG9tIGlkPC9zcGFuPiAvPC9zcGFuPlxuICApO1xufVxuXG5VcmxNaWRkbGUucHJvcFR5cGVzID0ge1xuICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBsb2dnZWRJbkNoYW5uZWxOYW1lICAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXJsTWlkZGxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uTmV3VGh1bWJuYWlsIH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2g6IHsgZmlsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvbk5ld1RodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgbGV0IGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgbGV0IG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gIGxldCBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOiBtaW1lU3RyaW5nfSk7XG59XG5cbmNsYXNzIFB1Ymxpc2hUaHVtYm5haWxJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmlkZW9Tb3VyY2UgICA6IG51bGwsXG4gICAgICBlcnJvciAgICAgICAgIDogbnVsbCxcbiAgICAgIHNsaWRlck1pblJhbmdlOiAxLFxuICAgICAgc2xpZGVyTWF4UmFuZ2U6IG51bGwsXG4gICAgICBzbGlkZXJWYWx1ZSAgIDogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhID0gdGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGEuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNsaWRlckNoYW5nZSA9IHRoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVUaHVtYm5haWwgPSB0aGlzLmNyZWF0ZVRodW1ibmFpbC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGZpbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRWaWRlb1NvdXJjZShmaWxlKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICAvLyBpZiBmaWxlIGNoYW5nZXNcbiAgICBpZiAobmV4dFByb3BzLmZpbGUgJiYgbmV4dFByb3BzLmZpbGUgIT09IHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgY29uc3QgeyBmaWxlIH0gPSBuZXh0UHJvcHM7XG4gICAgICB0aGlzLnNldFZpZGVvU291cmNlKGZpbGUpO1xuICAgIH07XG4gIH1cbiAgc2V0VmlkZW9Tb3VyY2UgKGZpbGUpIHtcbiAgICBjb25zdCBwcmV2aWV3UmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBwcmV2aWV3UmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgcHJldmlld1JlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhVXJpID0gcHJldmlld1JlYWRlci5yZXN1bHQ7XG4gICAgICBjb25zdCBibG9iID0gZGF0YVVSSXRvQmxvYihkYXRhVXJpKTtcbiAgICAgIGNvbnN0IHZpZGVvU291cmNlID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aWRlb1NvdXJjZSB9KTtcbiAgICB9O1xuICB9XG4gIGhhbmRsZVZpZGVvTG9hZGVkRGF0YSAoZXZlbnQpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IGV2ZW50LnRhcmdldC5kdXJhdGlvbjtcbiAgICBjb25zdCB0b3RhbE1pbnV0ZXMgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gNjApO1xuICAgIGNvbnN0IHRvdGFsU2Vjb25kcyA9IE1hdGguZmxvb3IoZHVyYXRpb24gJSA2MCk7XG4gICAgLy8gc2V0IHRoZSBzbGlkZXJcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNsaWRlck1heFJhbmdlOiBkdXJhdGlvbiAqIDEwMCxcbiAgICAgIHNsaWRlclZhbHVlICAgOiBkdXJhdGlvbiAqIDEwMCAvIDIsXG4gICAgICB0b3RhbE1pbnV0ZXMsXG4gICAgICB0b3RhbFNlY29uZHMsXG4gICAgfSk7XG4gICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIHZpZGVvXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gZHVyYXRpb24gLyAyO1xuICB9XG4gIGhhbmRsZVNsaWRlckNoYW5nZSAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgLy8gdXBkYXRlIHRoZSBzbGlkZXIgdmFsdWVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNsaWRlclZhbHVlOiB2YWx1ZSxcbiAgICB9KTtcbiAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgdmlkZW9cbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSB2YWx1ZSAvIDEwMDtcbiAgfVxuICBjcmVhdGVUaHVtYm5haWwgKCkge1xuICAgIC8vIHRha2UgYSBzbmFwc2hvdFxuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgY29uc3QgYmxvYiA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVybCk7XG4gICAgY29uc3Qgc25hcHNob3QgPSBuZXcgRmlsZShbYmxvYl0sIGB0aHVtYm5haWwucG5nYCwge1xuICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgfSk7XG4gICAgLy8gc2V0IHRoZSB0aHVtYm5haWwgaW4gcmVkdXggc3RvcmVcbiAgICBpZiAoc25hcHNob3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25OZXdUaHVtYm5haWwoc25hcHNob3QpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHZpZGVvU291cmNlLCBzbGlkZXJNaW5SYW5nZSwgc2xpZGVyTWF4UmFuZ2UsIHNsaWRlclZhbHVlLCB0b3RhbE1pbnV0ZXMsIHRvdGFsU2Vjb25kcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnPlRodW1ibmFpbDo8L2xhYmVsPlxuICAgICAgICA8dmlkZW9cbiAgICAgICAgICBpZD0ndmlkZW8tdGh1bWItcGxheWVyJ1xuICAgICAgICAgIHByZWxvYWQ9J21ldGFkYXRhJ1xuICAgICAgICAgIG11dGVkXG4gICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiAnbm9uZSd9fVxuICAgICAgICAgIHBsYXlzSW5saW5lXG4gICAgICAgICAgb25Mb2FkZWREYXRhPXt0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YX1cbiAgICAgICAgICBzcmM9e3ZpZGVvU291cmNlfVxuICAgICAgICAgIG9uU2Vla2VkPXt0aGlzLmNyZWF0ZVRodW1ibmFpbH1cbiAgICAgICAgLz5cbiAgICAgICAge1xuICAgICAgICAgIHNsaWRlclZhbHVlID8gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tY2VudGVyJyBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+MCcwMFwiPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz57dG90YWxNaW51dGVzfSd7dG90YWxTZWNvbmRzfVwiPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9J3JhbmdlJ1xuICAgICAgICAgICAgICAgICAgbWluPXtzbGlkZXJNaW5SYW5nZX1cbiAgICAgICAgICAgICAgICAgIG1heD17c2xpZGVyTWF4UmFuZ2V9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2xpZGVyVmFsdWV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3NsaWRlcidcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNsaWRlckNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZScgPmxvYWRpbmcuLi4gPC9wPlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICB7IGVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57ZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5Vc2Ugc2xpZGVyIHRvIHNldCB0aHVtYm5haWw8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUaHVtYm5haWxJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHt1cGRhdGVNZXRhZGF0YSwgdG9nZ2xlTWV0YWRhdGFJbnB1dHN9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzaG93TWV0YWRhdGFJbnB1dHM6IHB1Ymxpc2guc2hvd01ldGFkYXRhSW5wdXRzLFxuICAgIGRlc2NyaXB0aW9uICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICBsaWNlbnNlICAgICAgICAgICA6IHB1Ymxpc2gubWV0YWRhdGEubGljZW5zZSxcbiAgICBuc2Z3ICAgICAgICAgICAgICA6IHB1Ymxpc2gubWV0YWRhdGEubnNmdyxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbk1ldGFkYXRhQ2hhbmdlOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZU1ldGFkYXRhKG5hbWUsIHZhbHVlKSk7XG4gICAgfSxcbiAgICBvblRvZ2dsZU1ldGFkYXRhSW5wdXRzOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvZ2dsZU1ldGFkYXRhSW5wdXRzKHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFeHBhbmRpbmdUZXh0QXJlYSBmcm9tICdjb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhJztcblxuY2xhc3MgUHVibGlzaE1ldGFkYXRhSW5wdXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMudG9nZ2xlU2hvd0lucHV0cyA9IHRoaXMudG9nZ2xlU2hvd0lucHV0cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3QgPSB0aGlzLmhhbmRsZVNlbGVjdC5iaW5kKHRoaXMpO1xuICB9XG4gIHRvZ2dsZVNob3dJbnB1dHMgKCkge1xuICAgIHRoaXMucHJvcHMub25Ub2dnbGVNZXRhZGF0YUlucHV0cyghdGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC50eXBlID09PSAnY2hlY2tib3gnID8gdGFyZ2V0LmNoZWNrZWQgOiB0YXJnZXQudmFsdWU7XG4gICAgY29uc3QgbmFtZSA9IHRhcmdldC5uYW1lO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHNlbGVjdGVkT3B0aW9uKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdwdWJsaXNoLWRldGFpbHMnIGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgIHt0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyAmJiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdsYWJlbCc+RGVzY3JpcHRpb246PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxFeHBhbmRpbmdUZXh0QXJlYVxuICAgICAgICAgICAgICAgICAgaWQ9J3B1Ymxpc2gtZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3RleHRhcmVhIHRleHRhcmVhLS1wcmltYXJ5IHRleHRhcmVhLS1mdWxsLXdpZHRoJ1xuICAgICAgICAgICAgICAgICAgcm93cz17MX1cbiAgICAgICAgICAgICAgICAgIG1heExlbmd0aD17MjAwMH1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heEhlaWdodDogMjAwIH19XG4gICAgICAgICAgICAgICAgICBuYW1lPSdkZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdPcHRpb25hbCBkZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdsYWJlbCc+TGljZW5zZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBuYW1lPSdsaWNlbnNlJyBpZD0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLXByaW1hcnknIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdH0+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPScgJz5VbnNwZWNpZmllZDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nUHVibGljIERvbWFpbic+UHVibGljIERvbWFpbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nQ3JlYXRpdmUgQ29tbW9ucyc+Q3JlYXRpdmUgQ29tbW9uczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLW5zZncnIGNsYXNzTmFtZT0nbGFiZWwnPk1hdHVyZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0naW5wdXQtY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94JyBpZD0ncHVibGlzaC1uc2Z3JyBuYW1lPSduc2Z3JyB2YWx1ZT17dGhpcy5wcm9wcy5uc2Z3fSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tc2Vjb25kYXJ5JyBvbkNsaWNrPXt0aGlzLnRvZ2dsZVNob3dJbnB1dHN9Pnt0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyA/ICdsZXNzJyA6ICdtb3JlJ308L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaE1ldGFkYXRhSW5wdXRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIEV4cGFuZGluZ1RleHRhcmVhIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX2hhbmRsZUNoYW5nZSA9IHRoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmFkanVzdFRleHRhcmVhKHt9KTtcbiAgfVxuICBfaGFuZGxlQ2hhbmdlIChldmVudCkge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShldmVudCk7XG4gICAgdGhpcy5hZGp1c3RUZXh0YXJlYShldmVudCk7XG4gIH1cbiAgYWRqdXN0VGV4dGFyZWEgKHsgdGFyZ2V0ID0gdGhpcy5lbCB9KSB7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyAuLi5yZXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIHJlZj17eCA9PiB0aGlzLmVsID0geH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5FeHBhbmRpbmdUZXh0YXJlYS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGluZ1RleHRhcmVhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3NldFB1Ymxpc2hJbkNoYW5uZWwsIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIHB1Ymxpc2hJbkNoYW5uZWwgICA6IHB1Ymxpc2gucHVibGlzaEluQ2hhbm5lbCxcbiAgICBzZWxlY3RlZENoYW5uZWwgICAgOiBwdWJsaXNoLnNlbGVjdGVkQ2hhbm5lbCxcbiAgICBjaGFubmVsRXJyb3IgICAgICAgOiBwdWJsaXNoLmVycm9yLmNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdjaGFubmVsJywgbnVsbCkpO1xuICAgICAgZGlzcGF0Y2goc2V0UHVibGlzaEluQ2hhbm5lbCh2YWx1ZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsU2VsZWN0OiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdjaGFubmVsJywgbnVsbCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ2hhbm5lbExvZ2luRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0nO1xuaW1wb3J0IENoYW5uZWxDcmVhdGVGb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0nO1xuaW1wb3J0ICogYXMgc3RhdGVzIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcyc7XG5cbmNsYXNzIENoYW5uZWxTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNoID0gdGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNoLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24gPSB0aGlzLmhhbmRsZVNlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICB9XG4gIHRvZ2dsZUFub255bW91c1B1Ymxpc2ggKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgaWYgKHZhbHVlID09PSAnYW5vbnltb3VzJykge1xuICAgICAgdGhpcy5wcm9wcy5vblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2UoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZSh0cnVlKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlU2VsZWN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbFNlbGVjdChzZWxlY3RlZE9wdGlvbik7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3JhZGlvJyBuYW1lPSdhbm9ueW1vdXMtb3ItY2hhbm5lbCcgaWQ9J2Fub255bW91cy1yYWRpbycgY2xhc3NOYW1lPSdpbnB1dC1yYWRpbycgdmFsdWU9J2Fub255bW91cycgY2hlY2tlZD17IXRoaXMucHJvcHMucHVibGlzaEluQ2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaH0gLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsIGxhYmVsLS1wb2ludGVyJyBodG1sRm9yPSdhbm9ueW1vdXMtcmFkaW8nPkFub255bW91czwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3JhZGlvJyBuYW1lPSdhbm9ueW1vdXMtb3ItY2hhbm5lbCcgaWQ9J2NoYW5uZWwtcmFkaW8nIGNsYXNzTmFtZT0naW5wdXQtcmFkaW8nIHZhbHVlPSdpbiBhIGNoYW5uZWwnIGNoZWNrZWQ9e3RoaXMucHJvcHMucHVibGlzaEluQ2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaH0gLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsIGxhYmVsLS1wb2ludGVyJyBodG1sRm9yPSdjaGFubmVsLXJhZGlvJz5JbiBhIGNoYW5uZWw8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGFubmVsRXJyb3IgPyAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMucHJvcHMuY2hhbm5lbEVycm9yfTwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPlB1Ymxpc2ggYW5vbnltb3VzbHkgb3IgaW4gYSBjaGFubmVsPC9wPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgeyB0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWwgJiYgKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyc+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLW5hbWUtc2VsZWN0Jz5DaGFubmVsOjwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgaWQ9J2NoYW5uZWwtbmFtZS1zZWxlY3QnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tYXJyb3cnIHZhbHVlPXt0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9ufT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSAmJiA8b3B0aW9uIHZhbHVlPXt0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWV9IGlkPSdwdWJsaXNoLWNoYW5uZWwtc2VsZWN0LWNoYW5uZWwtb3B0aW9uJz57dGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lfTwvb3B0aW9uPiB9XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c3RhdGVzLkxPR0lOfT5FeGlzdGluZzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3N0YXRlcy5DUkVBVEV9Pk5ldzwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyAodGhpcy5wcm9wcy5zZWxlY3RlZENoYW5uZWwgPT09IHN0YXRlcy5MT0dJTikgJiYgPENoYW5uZWxMb2dpbkZvcm0gLz4gfVxuICAgICAgICAgICAgeyAodGhpcy5wcm9wcy5zZWxlY3RlZENoYW5uZWwgPT09IHN0YXRlcy5DUkVBVEUpICYmIDxDaGFubmVsQ3JlYXRlRm9ybSAvPiB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxTZWxlY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsTG9naW5Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIG5hbWUgICAgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dpblRvQ2hhbm5lbCA9IHRoaXMubG9naW5Ub0NoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIGxvZ2luVG9DaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXF1ZXN0KCdsb2dpbicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7c3VjY2VzcywgY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCwgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG1lc3NhZ2V9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvcn0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBpZD0nY2hhbm5lbC1sb2dpbi1mb3JtJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tJz5cbiAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nbmFtZScgcGxhY2Vob2xkZXI9J1lvdXIgQ2hhbm5lbCBOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsTmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyA+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgaWQ9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnIG5hbWU9J3Bhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxQYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5FbnRlciB0aGUgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMubG9naW5Ub0NoYW5uZWx9PkF1dGhlbnRpY2F0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxMb2dpbkZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsQ3JlYXRlRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3IgICA6IG51bGwsXG4gICAgICBjaGFubmVsIDogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgICBzdGF0dXMgIDogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQ2hhbm5lbElucHV0ID0gdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlQ2hhbm5lbCA9IHRoaXMuY3JlYXRlQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGNsZWFuc2VDaGFubmVsSW5wdXQgKGlucHV0KSB7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMrL2csICctJyk7IC8vIHJlcGxhY2Ugc3BhY2VzIHdpdGggZGFzaGVzXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOS1dL2csICcnKTsgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgb3IgJy0nXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIGhhbmRsZUNoYW5uZWxJbnB1dCAoZXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmNsZWFuc2VDaGFubmVsSW5wdXQodmFsdWUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2NoYW5uZWw6IHZhbHVlfSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiAnUGxlYXNlIGVudGVyIGEgY2hhbm5lbCBuYW1lJ30pO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIHVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSAoY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxXaXRoQXRTeW1ib2wgPSBgQCR7Y2hhbm5lbH1gO1xuICAgIHJlcXVlc3QoYC9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvJHtjaGFubmVsV2l0aEF0U3ltYm9sfWApXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG51bGx9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgIH0pO1xuICB9XG4gIGNoZWNrSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmV0dXJuIHJlcXVlc3QoYC9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvJHtjaGFubmVsV2l0aEF0U3ltYm9sfWApO1xuICB9XG4gIGNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIChwYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXBhc3N3b3JkIHx8IHBhc3N3b3JkLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgcGFzc3dvcmQnKSk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbiAgbWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lLCBwYXNzd29yZH0pLFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3QoJy9zaWdudXAnLCBwYXJhbXMpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBVbmZvcnR1bmF0ZWx5LCB3ZSBlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBjcmVhdGluZyB5b3VyIGNoYW5uZWwuIFBsZWFzZSBsZXQgdXMga25vdyBpbiBEaXNjb3JkISAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBjcmVhdGVDaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jaGVja0lzUGFzc3dvcmRQcm92aWRlZCh0aGlzLnN0YXRlLnBhc3N3b3JkKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSh0aGlzLnN0YXRlLmNoYW5uZWwpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiAnV2UgYXJlIHB1Ymxpc2hpbmcgeW91ciBuZXcgY2hhbm5lbC4gIFNpdCB0aWdodC4uLid9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCh0aGlzLnN0YXRlLmNoYW5uZWwsIHRoaXMuc3RhdGUucGFzc3dvcmQpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogbnVsbH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKHJlc3VsdC5jaGFubmVsTmFtZSwgcmVzdWx0LnNob3J0Q2hhbm5lbElkLCByZXN1bHQuY2hhbm5lbENsYWltSWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvciwgc3RhdHVzOiBudWxsfSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7ICF0aGlzLnN0YXRlLnN0YXR1cyA/IChcbiAgICAgICAgICA8Zm9ybSBpZD0ncHVibGlzaC1jaGFubmVsLWZvcm0nPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtbmFtZSc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20gc3Bhbi0tcmVsYXRpdmUnPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBuYW1lPSdjaGFubmVsJyBpZD0nbmV3LWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBwbGFjZWhvbGRlcj0nZXhhbXBsZUNoYW5uZWxOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFubmVsSW5wdXR9IC8+XG4gICAgICAgICAgICAgICAgICB7ICh0aGlzLnN0YXRlLmNoYW5uZWwgJiYgIXRoaXMuc3RhdGUuZXJyb3IpICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLXN1Y2Nlc3Mgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxMyd9PC9zcGFuPiB9XG4gICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZXJyb3IgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzE2J308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J25ldy1jaGFubmVsLXBhc3N3b3JkJz5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnknPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBuYW1lPSdwYXNzd29yZCcgaWQ9J25ldy1jaGFubmVsLXBhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnICBwbGFjZWhvbGRlcj0nJyB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnN0YXRlLmVycm9yfTwvcD5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5DaG9vc2UgYSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5jcmVhdGVDaGFubmVsfT5DcmVhdGUgQ2hhbm5lbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPnt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxDcmVhdGVGb3JtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBY3RpdmVTdGF0dXNCYXIgPSAoKSA9PiB7XG4gIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItLWFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEluYWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1pbmFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5hY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y2xlYXJGaWxlfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzIDogcHVibGlzaC5zdGF0dXMuc3RhdHVzLFxuICAgIG1lc3NhZ2U6IHB1Ymxpc2guc3RhdHVzLm1lc3NhZ2UsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIGNsZWFyRmlsZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgKiBhcyBwdWJsaXNoU3RhdGVzIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcyc7XG5cbmNsYXNzIFB1Ymxpc2hTdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBtZXNzYWdlLCBjbGVhckZpbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkxPQURfU1RBUlQgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+RmlsZSBpcyBsb2FkaW5nIHRvIHNlcnZlcjwvcD5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPjAlPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkxPQURJTkcgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgIDxwPkZpbGUgaXMgbG9hZGluZyB0byBzZXJ2ZXI8L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPnttZXNzYWdlfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5QVUJMSVNISU5HICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPlVwbG9hZCBjb21wbGV0ZS4gIFlvdXIgZmlsZSBpcyBub3cgYmVpbmcgcHVibGlzaGVkIG9uIHRoZSBibG9ja2NoYWluLi4uPC9wPlxuICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8cD5DdXJpb3VzIHdoYXQgbWFnaWMgaXMgaGFwcGVuaW5nIGhlcmU/IDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2ZhcS93aGF0LWlzLWxicnknPkxlYXJuIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5TVUNDRVNTICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPllvdXIgcHVibGlzaCBpcyBjb21wbGV0ZSEgWW91IGFyZSBiZWluZyByZWRpcmVjdGVkIHRvIGl0IG5vdy48L3A+XG4gICAgICAgICAgPHA+SWYgeW91IGFyZSBub3QgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLCA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXttZXNzYWdlfT5jbGljayBoZXJlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuRkFJTEVEICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPlNvbWV0aGluZyB3ZW50IHdyb25nLi4uPC9wPlxuICAgICAgICAgIDxwPjxzdHJvbmc+e21lc3NhZ2V9PC9zdHJvbmc+PC9wPlxuICAgICAgICAgIDxwPkZvciBoZWxwLCBwb3N0IHRoZSBhYm92ZSBlcnJvciB0ZXh0IGluIHRoZSAjc3BlZWNoIGNoYW5uZWwgb24gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5sYnJ5IGRpc2NvcmQ8L2E+PC9wPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXNlY29uZGFyeScgb25DbGljaz17Y2xlYXJGaWxlfT5SZXNldDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFN0YXR1cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJleHBvcnQgY29uc3QgTE9BRF9TVEFSVCA9ICdMT0FEX1NUQVJUJztcbmV4cG9ydCBjb25zdCBMT0FESU5HID0gJ0xPQURJTkcnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hJTkcgPSAnUFVCTElTSElORyc7XG5leHBvcnQgY29uc3QgU1VDQ0VTUyA9ICdTVUNDRVNTJztcbmV4cG9ydCBjb25zdCBGQUlMRUQgPSAnRkFJTEVEJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMuanMiLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2U6IHB1Ymxpc2guZGlzYWJsZWRNZXNzYWdlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnByb3BzLm1lc3NhZ2U7XG4gICAgY29uc29sZS5sb2coJ3RoaXMucHJvcHMubWVzc2FnZTonLCBtZXNzYWdlKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBkcm9wem9uZS0tZGlzYWJsZWQgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICA8cCBjbGFzc05hbWU9J3RleHQtLWRpc2FibGVkJz5QdWJsaXNoaW5nIGlzIGN1cnJlbnRseSBkaXNhYmxlZC48L3A+XG4gICAgICAgIDxwIGNsYXNzTmFtZT0ndGV4dC0tZGlzYWJsZWQnPnttZXNzYWdlfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaERpc2FibGVkTWVzc2FnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcblxuY2xhc3MgQWJvdXRQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydBYm91dCd9IHBhZ2VVcmk9eydhYm91dCd9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3B1bGwtcXVvdGUnPlNwZWUuY2ggaXMgYW4gb3Blbi1zb3VyY2UgcHJvamVjdC4gIFBsZWFzZSBjb250cmlidXRlIHRvIHRoZSBleGlzdGluZyBzaXRlLCBvciBmb3JrIGl0IGFuZCBtYWtlIHlvdXIgb3duLjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly90d2l0dGVyLmNvbS9zcGVlX2NoJz5UV0lUVEVSPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5HSVRIVUI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+RElTQ09SRCBDSEFOTkVMPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2Jsb2IvbWFzdGVyL1JFQURNRS5tZCc+RE9DVU1FTlRBVElPTjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBtZWRpYS1ob3N0aW5nIHNpdGUgdGhhdCByZWFkcyBmcm9tIGFuZCBwdWJsaXNoZXMgY29udGVudCB0byB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8nPkxCUlk8L2E+IGJsb2NrY2hhaW4uPC9wPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgaG9zdGluZyBzZXJ2aWNlLCBidXQgd2l0aCB0aGUgYWRkZWQgYmVuZWZpdCB0aGF0IGl0IHN0b3JlcyB5b3VyIGNvbnRlbnQgb24gYSBkZWNlbnRyYWxpemVkIG5ldHdvcmsgb2YgY29tcHV0ZXJzIC0tIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9nZXQnPkxCUlk8L2E+IG5ldHdvcmsuICBUaGlzIG1lYW5zIHRoYXQgeW91ciBpbWFnZXMgYXJlIHN0b3JlZCBpbiBtdWx0aXBsZSBsb2NhdGlvbnMgd2l0aG91dCBhIHNpbmdsZSBwb2ludCBvZiBmYWlsdXJlLjwvcD5cbiAgICAgICAgICAgICAgPGgzPkNvbnRyaWJ1dGU8L2gzPlxuICAgICAgICAgICAgICA8cD5JZiB5b3UgaGF2ZSBhbiBpZGVhIGZvciB5b3VyIG93biBzcGVlLmNoLWxpa2Ugc2l0ZSBvbiB0b3Agb2YgTEJSWSwgZm9yayBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPmdpdGh1YiByZXBvPC9hPiBhbmQgZ28gdG8gdG93biE8L3A+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSB3YW50IHRvIGltcHJvdmUgc3BlZS5jaCwgam9pbiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+ZGlzY29yZCBjaGFubmVsPC9hPiBvciBzb2x2ZSBvbmUgb2Ygb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2lzc3Vlcyc+Z2l0aHViIGlzc3VlczwvYT4uPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQWJvdXRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbExvZ2luRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0nO1xuaW1wb3J0IENoYW5uZWxDcmVhdGVGb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0nO1xuXG5jbGFzcyBMb2dpblBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIC8vIHJlLXJvdXRlIHRoZSB1c2VyIHRvIHRoZSBob21lcGFnZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICBpZiAobmV3UHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSAhPT0gdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2ApO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0xvZ2luJ30gcGFnZVVyaT17J2xvZ2luJ30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPkNoYW5uZWxzIGFsbG93IHlvdSB0byBwdWJsaXNoIGFuZCBncm91cCBjb250ZW50IHVuZGVyIGFuIGlkZW50aXR5LiBZb3UgY2FuIGNyZWF0ZSBhIGNoYW5uZWwgZm9yIHlvdXJzZWxmLCBvciBzaGFyZSBvbmUgd2l0aCBsaWtlLW1pbmRlZCBmcmllbmRzLiAgWW91IGNhbiBjcmVhdGUgMSBjaGFubmVsLCBvciAxMDAsIHNvIHdoZXRoZXIgeW91J3JlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0YWxvbmlhMjAxNzo0M2RjZjQ3MTYzY2FhMjFkODQwNGQ5ZmU5YjMwZjc4ZWYzZTE0NmE4Jz5kb2N1bWVudGluZyBpbXBvcnRhbnQgZXZlbnRzPC9hPiwgb3IgbWFraW5nIGEgcHVibGljIHJlcG9zaXRvcnkgZm9yIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0R2lmcyc+Y2F0IGdpZnM8L2E+IChwYXNzd29yZDogJzEyMzQnKSwgdHJ5IGNyZWF0aW5nIGEgY2hhbm5lbCBmb3IgaXQhPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5Mb2cgaW4gdG8gYW4gZXhpc3RpbmcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbExvZ2luRm9ybSAvPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5DcmVhdGUgYSBicmFuZCBuZXcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbENyZWF0ZUZvcm0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTG9naW5QYWdlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvciAgICAgIDogc2hvdy5yZXF1ZXN0LmVycm9yLFxuICAgIHJlcXVlc3RUeXBlOiBzaG93LnJlcXVlc3QudHlwZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25IYW5kbGVTaG93UGFnZVVyaSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAncGFnZXMvRXJyb3JQYWdlJztcbmltcG9ydCBTaG93QXNzZXRMaXRlIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZSc7XG5pbXBvcnQgU2hvd0Fzc2V0RGV0YWlscyBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldERldGFpbHMnO1xuaW1wb3J0IFNob3dDaGFubmVsIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwnO1xuXG5pbXBvcnQgeyBDSEFOTkVMLCBBU1NFVF9MSVRFLCBBU1NFVF9ERVRBSUxTIH0gZnJvbSAnY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcyc7XG5cbmNsYXNzIFNob3dQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMucHJvcHMub25IYW5kbGVTaG93UGFnZVVyaSh0aGlzLnByb3BzLm1hdGNoLnBhcmFtcyk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMgIT09IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zKSB7XG4gICAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkobmV4dFByb3BzLm1hdGNoLnBhcmFtcyk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciwgcmVxdWVzdFR5cGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RXJyb3JQYWdlIGVycm9yPXtlcnJvcn0gLz5cbiAgICAgICk7XG4gICAgfVxuICAgIHN3aXRjaCAocmVxdWVzdFR5cGUpIHtcbiAgICAgIGNhc2UgQ0hBTk5FTDpcbiAgICAgICAgcmV0dXJuIDxTaG93Q2hhbm5lbCAvPjtcbiAgICAgIGNhc2UgQVNTRVRfTElURTpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXRMaXRlIC8+O1xuICAgICAgY2FzZSBBU1NFVF9ERVRBSUxTOlxuICAgICAgICByZXR1cm4gPFNob3dBc3NldERldGFpbHMgLz47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gPHA+bG9hZGluZy4uLjwvcD47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9TaG93UGFnZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCBhc3NldCBpbmZvXG4gIGxldCBhc3NldDtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICBjb25zdCBhc3NldExpc3QgPSBzaG93LmFzc2V0TGlzdDtcbiAgaWYgKHJlcXVlc3QgJiYgYXNzZXRMaXN0KSB7XG4gICAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTsgIC8vIG5vdGU6IGp1c3Qgc3RvcmUgdGhpcyBpbiB0aGUgcmVxdWVzdFxuICAgIGFzc2V0ID0gYXNzZXRMaXN0W2Fzc2V0S2V5XSB8fCBudWxsO1xuICB9O1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgQXNzZXREaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5JztcblxuY2xhc3MgU2hvd0xpdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGNsYWltSWQgfSA9IGFzc2V0LmNsYWltRGF0YTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXIgc2hvdy1saXRlLWNvbnRhaW5lcic+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e25hbWV9IGFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICA8QXNzZXREaXNwbGF5IC8+XG4gICAgICAgICAgPExpbmsgaWQ9J2Fzc2V0LWJvaWxlcnBhdGUnIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeSBmaW5lLXByaW50JyB0bz17YC8ke2NsYWltSWR9LyR7bmFtZX1gfT5ob3N0ZWRcbiAgICAgICAgICAgIHZpYSBTcGVlLmNoPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAgPHA+bG9hZGluZyBhc3NldCBkYXRhLi4uPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0xpdGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBVTkFWQUlMQUJMRSwgRVJST1IsIEFWQUlMQUJMRSB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNsYXNzIEFzc2V0RGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uRmlsZVJlcXVlc3QobmFtZSwgY2xhaW1JZCk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1cywgZXJyb3IsIGFzc2V0OiB7IGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBjb250ZW50VHlwZSwgZmlsZUV4dCwgdGh1bWJuYWlsIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0nYXNzZXQtZGlzcGxheS1jb21wb25lbnQnPlxuICAgICAgICB7KHN0YXR1cyA9PT0gTE9DQUxfQ0hFQ0spICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+Q2hlY2tpbmcgdG8gc2VlIGlmIFNwZWUuY2ggaGFzIHlvdXIgYXNzZXQgbG9jYWxseS4uLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IFVOQVZBSUxBQkxFKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPlNpdCB0aWdodCwgd2UncmUgc2VhcmNoaW5nIHRoZSBMQlJZIGJsb2NrY2hhaW4gZm9yIHlvdXIgYXNzZXQhPC9wPlxuICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8cD5DdXJpb3VzIHdoYXQgbWFnaWMgaXMgaGFwcGVuaW5nIGhlcmU/IDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2ZhcS93aGF0LWlzLWxicnknPkxlYXJuIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEVSUk9SKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPlVuZm9ydHVuYXRlbHksIHdlIGNvdWxkbid0IGRvd25sb2FkIHlvdXIgYXNzZXQgZnJvbSBMQlJZLiAgWW91IGNhbiBoZWxwIHVzIG91dCBieSBzaGFyaW5nIHRoZSBiZWxvdyBlcnJvciBtZXNzYWdlIGluIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJyB0YXJnZXQ9J19ibGFuayc+TEJSWSBkaXNjb3JkPC9hPi48L3A+XG4gICAgICAgICAgPGk+PHAgaWQ9J2Vycm9yLW1lc3NhZ2UnPntlcnJvcn08L3A+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gQVZBSUxBQkxFKSAmJlxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9IC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx2aWRlbyBjbGFzc05hbWU9J2Fzc2V0IHZpZGVvJyBjb250cm9scyBwb3N0ZXI9e3RodW1ibmFpbH0+XG4gICAgICAgICAgICAgICAgICA8c291cmNlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHA+WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIDxjb2RlPnZpZGVvPC9jb2RlPiBlbGVtZW50LjwvcD5cbiAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cD5VbnN1cHBvcnRlZCBmaWxlIHR5cGU8L3A+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0RGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCBhc3NldCBpbmZvXG4gIGxldCBhc3NldDtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICBjb25zdCBhc3NldExpc3QgPSBzaG93LmFzc2V0TGlzdDtcbiAgaWYgKHJlcXVlc3QgJiYgYXNzZXRMaXN0KSB7XG4gICAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTsgIC8vIG5vdGU6IGp1c3Qgc3RvcmUgdGhpcyBpbiB0aGUgcmVxdWVzdFxuICAgIGFzc2V0ID0gYXNzZXRMaXN0W2Fzc2V0S2V5XSB8fCBudWxsO1xuICB9O1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAncGFnZXMvRXJyb3JQYWdlJztcbmltcG9ydCBBc3NldFRpdGxlIGZyb20gJ2NvbnRhaW5lcnMvQXNzZXRUaXRsZSc7XG5pbXBvcnQgQXNzZXREaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5JztcbmltcG9ydCBBc3NldEluZm8gZnJvbSAnY29udGFpbmVycy9Bc3NldEluZm8nO1xuXG5jbGFzcyBTaG93QXNzZXREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBjbGFpbURhdGE6IHsgbmFtZSB9IH0gPSBhc3NldDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e2Ake25hbWV9IC0gZGV0YWlsc2B9IGFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPEFzc2V0VGl0bGUgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHNob3ctZGV0YWlscy1jb250YWluZXInPlxuICAgICAgICAgICAgICAgIDxBc3NldERpc3BsYXkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgICAgIDxBc3NldEluZm8gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGFzc2V0IGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dBc3NldERldGFpbHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIGNvbnN0IHsgY2xhaW1EYXRhOiB7IHRpdGxlIH0gfSA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICByZXR1cm4ge1xuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEFzc2V0VGl0bGUgPSAoeyB0aXRsZSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dC0tbGFyZ2UnPnt0aXRsZX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFRpdGxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgYXNzZXRcbiAgY29uc3QgYXNzZXQgPSBzZWxlY3RBc3NldChzaG93KTtcbiAgLy8gIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRJbmZvL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY2xhc3MgQXNzZXRJbmZvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkID0gdGhpcy5jb3B5VG9DbGlwYm9hcmQuYmluZCh0aGlzKTtcbiAgfVxuICBjb3B5VG9DbGlwYm9hcmQgKGV2ZW50KSB7XG4gICAgdmFyIGVsZW1lbnRUb0NvcHkgPSBldmVudC50YXJnZXQuZGF0YXNldC5lbGVtZW50dG9jb3B5O1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvQ29weSk7XG4gICAgZWxlbWVudC5zZWxlY3QoKTtcbiAgICB0cnkge1xuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiAnT29wcywgdW5hYmxlIHRvIGNvcHknfSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldDogeyBzaG9ydElkLCBjbGFpbURhdGEgOiB7IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBkZXNjcmlwdGlvbiwgbmFtZSwgY2xhaW1JZCwgZmlsZUV4dCwgY29udGVudFR5cGUsIHRodW1ibmFpbCwgaG9zdCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHtjaGFubmVsTmFtZSAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5DaGFubmVsOjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPjxMaW5rIHRvPXtgLyR7Y2hhbm5lbE5hbWV9OiR7Y2VydGlmaWNhdGVJZH1gfT57Y2hhbm5lbE5hbWV9PC9MaW5rPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICB7ZGVzY3JpcHRpb24gJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+e2Rlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICA8ZGl2IGlkPSdzaG93LXNoYXJlLWJ1dHRvbnMnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5TaGFyZTo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlIGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tYm90dG9tIGZsZXgtY29udGFpbmVyLS13cmFwJz5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR3aXR0ZXI8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+ZmFjZWJvb2s8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHA6Ly90dW1ibHIuY29tL3dpZGdldHMvc2hhcmUvdG9vbD9jYW5vbmljYWxVcmw9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT50dW1ibHI8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vc3VibWl0P3VybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfSZ0aXRsZT0ke25hbWV9YH0+cmVkZGl0PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPGRpdiBpZD0nc2hvdy1zaG9ydC1saW5rJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5MaW5rOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtZXJyb3InIGlkPSdpbnB1dC1lcnJvci1jb3B5LXNob3J0LWxpbmsnIGhpZGRlbj0ndHJ1ZSc+ZXJyb3IgaGVyZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdzaG9ydC1saW5rJyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgIHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YCR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdzaG9ydC1saW5rJ1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LWVtYmVkLWNvZGUnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkVtYmVkOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtZXJyb3InIGlkPSdpbnB1dC1lcnJvci1jb3B5LWVtYmVkLXRleHQnIGhpZGRlbj0ndHJ1ZSc+ZXJyb3IgaGVyZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgeyhjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL21wNCcpID8gKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2VtYmVkLXRleHQnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2A8dmlkZW8gd2lkdGg9XCIxMDAlXCIgY29udHJvbHMgcG9zdGVyPVwiJHt0aHVtYm5haWx9XCIgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz48L3ZpZGVvPmB9IC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2VtYmVkLXRleHQnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2A8aW1nIHNyYz1cIiR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1cIi8+YH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEnIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTInPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLXdpZGUnIGRhdGEtZWxlbWVudHRvY29weT0nZW1iZWQtdGV4dCdcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jb3B5VG9DbGlwYm9hcmR9PmNvcHlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20nPlxuICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdG89e2AvJHtzaG9ydElkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfT48c3BhblxuICAgICAgICAgICAgY2xhc3NOYW1lPSd0ZXh0Jz5EaXJlY3QgTGluazwvc3Bhbj48L0xpbms+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPXtgJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9IGRvd25sb2FkPXtuYW1lfT5Eb3dubG9hZDwvYT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZG1jYSc+UmVwb3J0PC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRJbmZvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRJbmZvL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IHJlcXVlc3RcbiAgY29uc3QgcHJldmlvdXNSZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIC8vIHNlbGVjdCBjaGFubmVsXG4gIGxldCBjaGFubmVsO1xuICBpZiAocHJldmlvdXNSZXF1ZXN0KSB7XG4gICAgY29uc3QgY2hhbm5lbEtleSA9IHByZXZpb3VzUmVxdWVzdC5rZXk7XG4gICAgY2hhbm5lbCA9IHNob3cuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0gfHwgbnVsbDtcbiAgfVxuICByZXR1cm4ge1xuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAncGFnZXMvRXJyb3JQYWdlJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IENoYW5uZWxDbGFpbXNEaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXknO1xuXG5jbGFzcyBTaG93Q2hhbm5lbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChjaGFubmVsKSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGxvbmdJZCwgc2hvcnRJZCB9ID0gY2hhbm5lbDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e25hbWV9IGNoYW5uZWw9e2NoYW5uZWx9IC8+XG4gICAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxoMj5jaGFubmVsIG5hbWU6IHtuYW1lfTwvaDI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17J2ZpbmUtcHJpbnQnfT5mdWxsIGNoYW5uZWwgaWQ6IHtsb25nSWR9PC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eydmaW5lLXByaW50J30+c2hvcnQgY2hhbm5lbCBpZDoge3Nob3J0SWR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8Q2hhbm5lbENsYWltc0Rpc3BsYXkgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yUGFnZSBlcnJvcj17J2xvYWRpbmcgY2hhbm5lbCBkYXRhLi4uJ30gLz5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93Q2hhbm5lbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uVXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGNoYW5uZWwga2V5XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSByZXF1ZXN0LmtleTtcbiAgLy8gc2VsZWN0IGNoYW5uZWwgY2xhaW1zXG4gIGNvbnN0IGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxLZXksXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25VcGRhdGVDaGFubmVsQ2xhaW1zLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXNzZXRQcmV2aWV3IGZyb20gJ2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3JztcblxuY2xhc3MgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlID0gdGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgfVxuICBzaG93UHJldmlvdXNSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKSAtIDE7XG4gICAgdGhpcy5zaG93TmV3UGFnZShwcmV2aW91c1BhZ2UpO1xuICB9XG4gIHNob3dOZXh0UmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKSArIDE7XG4gICAgdGhpcy5zaG93TmV3UGFnZShuZXh0UGFnZSk7XG4gIH1cbiAgc2hvd05ld1BhZ2UgKHBhZ2UpIHtcbiAgICBjb25zdCB7IGNoYW5uZWxLZXksIGNoYW5uZWw6IHsgbmFtZSwgbG9uZ0lkIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vblVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGNsYWltcywgY3VycmVudFBhZ2UsIHRvdGFsUGFnZXMgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCc+XG4gICAgICAgIHsoY2xhaW1zLmxlbmd0aCA+IDApID8gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7Y2xhaW1zLm1hcCgoY2xhaW0sIGluZGV4KSA9PiA8QXNzZXRQcmV2aWV3XG4gICAgICAgICAgICAgIGNsYWltRGF0YT17Y2xhaW19XG4gICAgICAgICAgICAgIGtleT17YCR7Y2xhaW0ubmFtZX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgLz4pfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgeyhjdXJyZW50UGFnZSA+IDEpICYmXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnYnV0dG9uLS1zZWNvbmRhcnknfSBvbkNsaWNrPXt0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlfT5QcmV2aW91cyBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgeyhjdXJyZW50UGFnZSA8IHRvdGFsUGFnZXMpICYmXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnYnV0dG9uLS1zZWNvbmRhcnknfSBvbkNsaWNrPXt0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2V9Pk5leHQgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cD5UaGVyZSBhcmUgbm8gY2xhaW1zIGluIHRoaXMgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxDbGFpbXNEaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHtzaXRlOiB7ZGVmYXVsdHM6IHsgZGVmYXVsdFRodW1ibmFpbCB9fX0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkZWZhdWx0VGh1bWJuYWlsLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY29uc3QgQXNzZXRQcmV2aWV3ID0gKHsgZGVmYXVsdFRodW1ibmFpbCwgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwgfSB9KSA9PiB7XG4gIGNvbnN0IGRpcmVjdFNvdXJjZUxpbmsgPSBgJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gO1xuICBjb25zdCBzaG93VXJsTGluayA9IGAvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nYXNzZXQtaG9sZGVyJz5cbiAgICAgIDxMaW5rIHRvPXtzaG93VXJsTGlua30gPlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydhc3NldC1wcmV2aWV3J31cbiAgICAgICAgICAgICAgICAgIHNyYz17ZGlyZWN0U291cmNlTGlua31cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydhc3NldC1wcmV2aWV3IHZpZGVvJ31cbiAgICAgICAgICAgICAgICAgIHNyYz17dGh1bWJuYWlsIHx8IGRlZmF1bHRUaHVtYm5haWx9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+dW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKX1cbiAgICAgIDwvTGluaz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0UHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaXRlOiB7IGhvc3QsIHRpdGxlIH0gfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNsYXNzIEZvdXJPaEZvclBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHt0aXRsZSwgaG9zdH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8SGVsbWV0PlxuICAgICAgICAgIDx0aXRsZT57dGl0bGV9IC0gNDA0PC90aXRsZT5cbiAgICAgICAgICA8bGluayByZWw9J2Nhbm9uaWNhbCcgaHJlZj17YCR7aG9zdH0vNDA0YH0gLz5cbiAgICAgICAgPC9IZWxtZXQ+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGgyPjQwNDwvaDI+XG4gICAgICAgICAgPHA+VGhhdCBwYWdlIGRvZXMgbm90IGV4aXN0PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZvdXJPaEZvclBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS92aWV3LmpzeCIsImNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qgc2VuZEVtYmVkUGFnZSA9ICh7IHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIC8vIGdldCBhbmQgcmVuZGVyIHRoZSBjb250ZW50XG4gIHJlcy5zdGF0dXMoMjAwKS5yZW5kZXIoJ2VtYmVkJywgeyBsYXlvdXQ6ICdlbWJlZCcsIGhvc3QsIGNsYWltSWQsIG5hbWUgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRFbWJlZFBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRFbWJlZFBhZ2UuanMiLCJjb25zdCByZWRpcmVjdCA9IChyb3V0ZSkgPT4ge1xuICByZXR1cm4gKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KHJvdXRlKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVkaXJlY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3JlZGlyZWN0LmpzIiwiY29uc3Qgc2VydmVBc3NldEJ5Q2xhaW0gPSByZXF1aXJlKCcuL3NlcnZlQXNzZXRCeUNsYWltJyk7XG5jb25zdCBzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0gPSByZXF1aXJlKCcuL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHAsIGRiKSA9PiB7XG4gIGFwcC5nZXQoJy86aWRlbnRpZmllci86Y2xhaW0nLCBzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0pO1xuICBhcHAuZ2V0KCcvOmNsYWltJywgc2VydmVBc3NldEJ5Q2xhaW0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL2luZGV4LmpzIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3QgeyBkZXRlcm1pbmVSZXNwb25zZVR5cGUsIGxvZ1JlcXVlc3REYXRhLCBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCB9ID0gcmVxdWlyZSgnaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VydmUgYW4gYXNzZXQgb3IgdGhlIHJlYWN0IGFwcCB2aWEgdGhlIGNsYWltIG5hbWUgb25seVxuXG4qL1xuXG5jb25zdCBzZXJ2ZXJBc3NldEJ5Q2xhaW0gPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICB9XG4gIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gIC8vIHBhcnNlIHRoZSBjbGFpbVxuICBsZXQgY2xhaW1OYW1lO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgbnVsbCwgbnVsbCk7XG4gIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KG51bGwsIG51bGwsIGNsYWltTmFtZSwgbnVsbCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJBc3NldEJ5Q2xhaW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlDbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCJcbi8vIG1vZHVsZSBpZCA9IDE3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgb25SZXF1ZXN0RXJyb3IsIG9uTmV3Q2hhbm5lbFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IG5ld0Fzc2V0UmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfYXNzZXQnO1xuaW1wb3J0IHsgbmV3Q2hhbm5lbFJlcXVlc3QgfSBmcm9tICdzYWdhcy9zaG93X2NoYW5uZWwnO1xuaW1wb3J0IGxicnlVcmkgZnJvbSAndXRpbHMvbGJyeVVyaSc7XG5cbmZ1bmN0aW9uICogcGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0gKG1vZGlmaWVyLCBjbGFpbSkge1xuICAvLyB0aGlzIGlzIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXRcbiAgLy8gY2xhaW0gd2lsbCBiZSBhbiBhc3NldCBjbGFpbVxuICAvLyB0aGUgaWRlbnRpZmllciBjb3VsZCBiZSBhIGNoYW5uZWwgb3IgYSBjbGFpbSBpZFxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQsIGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihtb2RpZmllcikpO1xuICAgICh7IGNsYWltTmFtZSwgZXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICBpZiAoaXNDaGFubmVsKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIG51bGwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgZXh0ZW5zaW9uKSk7XG4gIH07XG4gIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIGNsYWltSWQsIG51bGwsIG51bGwsIGV4dGVuc2lvbikpO1xufVxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUNsYWltT25seSAoY2xhaW0pIHtcbiAgLy8gdGhpcyBjb3VsZCBiZSBhIHJlcXVlc3QgZm9yIGFuIGFzc2V0IG9yIGEgY2hhbm5lbCBwYWdlXG4gIC8vIGNsYWltIGNvdWxkIGJlIGFuIGFzc2V0IGNsYWltIG9yIGEgY2hhbm5lbCBjbGFpbVxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gdHJpZ2dlciBhbiBuZXcgYWN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RvcmVcbiAgLy8gcmV0dXJuIGVhcmx5IGlmIHRoaXMgcmVxdWVzdCBpcyBmb3IgYSBjaGFubmVsXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdDaGFubmVsUmVxdWVzdCwgb25OZXdDaGFubmVsUmVxdWVzdChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpKTtcbiAgfVxuICAvLyBpZiBub3QgZm9yIGEgY2hhbm5lbCwgcGFyc2UgdGhlIGNsYWltIHJlcXVlc3RcbiAgbGV0IGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lLCBleHRlbnNpb259ID0gbGJyeVVyaS5wYXJzZUNsYWltKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIGhhbmRsZVNob3dQYWdlVXJpIChhY3Rpb24pIHtcbiAgY29uc3QgeyBpZGVudGlmaWVyLCBjbGFpbSB9ID0gYWN0aW9uLmRhdGE7XG4gIGlmIChpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0sIGlkZW50aWZpZXIsIGNsYWltKTtcbiAgfVxuICB5aWVsZCBjYWxsKHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5LCBjbGFpbSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaEhhbmRsZVNob3dQYWdlVXJpICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSwgaGFuZGxlU2hvd1BhZ2VVcmkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsImltcG9ydCB7IGNhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCBhZGRBc3NldFRvQXNzZXRMaXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldExvbmdDbGFpbUlkLCBnZXRTaG9ydElkLCBnZXRDbGFpbURhdGEgfSBmcm9tICdhcGkvYXNzZXRBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0Fzc2V0UmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgbmFtZSwgbW9kaWZpZXIgfSA9IGFjdGlvbi5kYXRhO1xuICAvLyBwdXQgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBpbiByZWR1eFxuICB5aWVsZCBwdXQob25SZXF1ZXN0VXBkYXRlKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyByZXF1ZXN0P1xuICAvLyBJZiB0aGlzIHVyaSBpcyBpbiB0aGUgcmVxdWVzdCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGNvbnN0IHN0YXRlID0geWllbGQgc2VsZWN0KHNlbGVjdFNob3dTdGF0ZSk7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBpZiAoc3RhdGUucmVxdWVzdExpc3RbcmVxdWVzdElkXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBsb25nIGlkICYmIGFkZCByZXF1ZXN0IHRvIHJlcXVlc3QgbGlzdFxuICBsZXQgbG9uZ0lkO1xuICB0cnkge1xuICAgICh7ZGF0YTogbG9uZ0lkfSA9IHlpZWxkIGNhbGwoZ2V0TG9uZ0NsYWltSWQsIGhvc3QsIG5hbWUsIG1vZGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgY29uc3QgYXNzZXRLZXkgPSBgYSMke25hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGFzc2V0S2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgYXNzZXQ/XG4gIC8vIElmIHRoaXMgYXNzZXQgaXMgaW4gdGhlIGFzc2V0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmFzc2V0TGlzdFthc3NldEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgc2hvcnQgSWRcbiAgbGV0IHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBzaG9ydElkfSA9IHlpZWxkIGNhbGwoZ2V0U2hvcnRJZCwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gZ2V0IGFzc2V0IGNsYWltIGRhdGFcbiAgbGV0IGNsYWltRGF0YTtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGNsYWltRGF0YX0gPSB5aWVsZCBjYWxsKGdldENsYWltRGF0YSwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gYWRkIGFzc2V0IHRvIGFzc2V0IGxpc3RcbiAgeWllbGQgcHV0KGFkZEFzc2V0VG9Bc3NldExpc3QoYXNzZXRLZXksIG51bGwsIG5hbWUsIGxvbmdJZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSk7XG4gIC8vIGNsZWFyIGFueSBlcnJvcnMgaW4gcmVxdWVzdCBlcnJvclxuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hOZXdBc3NldFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsIG5ld0Fzc2V0UmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvbmdDbGFpbUlkIChob3N0LCBuYW1lLCBtb2RpZmllcikge1xuICBsZXQgYm9keSA9IHt9O1xuICAvLyBjcmVhdGUgcmVxdWVzdCBwYXJhbXNcbiAgaWYgKG1vZGlmaWVyKSB7XG4gICAgaWYgKG1vZGlmaWVyLmlkKSB7XG4gICAgICBib2R5WydjbGFpbUlkJ10gPSBtb2RpZmllci5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keVsnY2hhbm5lbE5hbWUnXSA9IG1vZGlmaWVyLmNoYW5uZWwubmFtZTtcbiAgICAgIGJvZHlbJ2NoYW5uZWxDbGFpbUlkJ10gPSBtb2RpZmllci5jaGFubmVsLmlkO1xuICAgIH1cbiAgfVxuICBib2R5WydjbGFpbU5hbWUnXSA9IG5hbWU7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH07XG4gIC8vIGNyZWF0ZSB1cmxcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2xvbmctaWRgO1xuICAvLyByZXR1cm4gdGhlIHJlcXVlc3QgcHJvbWlzZVxuICByZXR1cm4gUmVxdWVzdCh1cmwsIHBhcmFtcyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnRJZCAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vc2hvcnQtaWQvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFpbURhdGEgKGhvc3QsIG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2RhdGEvJHtuYW1lfS8ke2NsYWltSWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwiaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0LCBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgdXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDaGFubmVsRGF0YSB9IGZyb20gJ2FwaS9jaGFubmVsQXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcbmltcG9ydCB7IHNlbGVjdFNpdGVIb3N0IH0gZnJvbSAnc2VsZWN0b3JzL3NpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdDaGFubmVsUmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgbG9uZyBpZFxuICBsZXQgbG9uZ0lkLCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7IGRhdGE6IHtsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdJZCwgc2hvcnRDaGFubmVsQ2xhaW1JZDogc2hvcnRJZH0gfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbERhdGEsIGhvc3QsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgcmVxdWVzdCBpbiB0aGUgY2hhbm5lbCByZXF1ZXN0cyBsaXN0XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSBgYyMke2NoYW5uZWxOYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBjaGFubmVsS2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgY2hhbm5lbD9cbiAgLy8gSWYgdGhpcyBjaGFubmVsIGlzIGluIHRoZSBjaGFubmVsIGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgY2xhaW1zIGRhdGFcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIGNoYW5uZWxOYW1lLCAxKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gc3RvcmUgdGhlIGNoYW5uZWwgZGF0YSBpbiB0aGUgY2hhbm5lbCBsaXN0XG4gIHlpZWxkIHB1dChhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdChjaGFubmVsS2V5LCBjaGFubmVsTmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSk7XG4gIC8vIGNsZWFyIGFueSByZXF1ZXN0IGVycm9yc1xuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsIG5ld0NoYW5uZWxSZXF1ZXN0KTtcbn07XG5cbmZ1bmN0aW9uICogZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlIH0gPSBhY3Rpb24uZGF0YTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGxldCBjbGFpbXNEYXRhO1xuICB0cnkge1xuICAgICh7IGRhdGE6IGNsYWltc0RhdGEgfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbENsYWltcywgaG9zdCwgbG9uZ0lkLCBuYW1lLCBwYWdlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgcHV0KHVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgY2xhaW1zRGF0YSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaFVwZGF0ZUNoYW5uZWxDbGFpbXMgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DLCBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxEYXRhIChob3N0LCBpZCwgbmFtZSkge1xuICBpZiAoIWlkKSBpZCA9ICdub25lJztcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvZGF0YS8ke25hbWV9LyR7aWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFubmVsQ2xhaW1zIChob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpIHtcbiAgaWYgKCFwYWdlKSBwYWdlID0gMTtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvY2xhaW1zLyR7bmFtZX0vJHtsb25nSWR9LyR7cGFnZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvY2hhbm5lbEFwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXggIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIGFmdGVyIFwiQFwiLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQ6IGNoYW5uZWxDbGFpbUlkIHx8IG51bGwsXG4gICAgICBjbGFpbUlkICAgICAgIDogY2xhaW1JZCB8fCBudWxsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgZXh0ZW5zaW9uKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIGV4dGVuc2lvbiBzZXBhcmF0b3IsIGV4dGVuc2lvbiAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBleHRlbnNpb25TZXBlcmF0b3IsIGV4dGVuc2lvbl0gPSBjb21wb25lbnRzUmVnZXggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMobmFtZSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIi5cIicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIGV4dGVuc2lvblxuICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IpIHtcbiAgICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIi5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIgc2VwYXJhdG9yIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWUuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgICBleHRlbnNpb246IGV4dGVuc2lvbiB8fCBudWxsLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2xicnlVcmkuanMiLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7XG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSxcbiAgbG9nUmVxdWVzdERhdGEsXG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0LFxufSA9IHJlcXVpcmUoJ2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VydmUgYW4gYXNzZXQgb3IgdGhlIHJlYWN0IGFwcCB2aWEgdGhlIGNsYWltIG5hbWUgYW5kIGFuIGlkZW50aWZpZXJcblxuKi9cblxuY29uc3Qgc2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSA9IChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gIH1cbiAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgLy8gcGFyc2UgdGhlIGNsYWltXG4gIGxldCBjbGFpbU5hbWU7XG4gIHRyeSB7XG4gICAgKHsgY2xhaW1OYW1lIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIHBhcnNlIHRoZSBpZGVudGlmaWVyXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIocGFyYW1zLmlkZW50aWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgaWYgKCFpc0NoYW5uZWwpIHtcbiAgICBbY2xhaW1JZCwgY2xhaW1OYW1lXSA9IGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkoY2xhaW1JZCwgY2xhaW1OYW1lKTtcbiAgfVxuICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCk7XG4gIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0uanMiLCJjb25zdCBoYW5kbGVQYWdlUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZFJlYWN0QXBwJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcclxuICBhcHAuZ2V0KCcqJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcblxuY29uc3Qgc2VuZFJlYWN0QXBwID0gKHJlcSwgcmVzKSA9PiB7XG4gIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUmVhY3RBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL3NlbmRSZWFjdEFwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=