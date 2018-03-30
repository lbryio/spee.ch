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
  this.routes = {};
  this.update = function (config) {
    if (!config) {
      return console.log('No site config received.');
    }
    var analytics = config.analytics,
        assetDefaults = config.assetDefaults,
        auth = config.auth,
        customComponents = config.customComponents,
        details = config.details,
        publishing = config.publishing,
        routes = config.routes;

    console.log('Configuring site details...');
    _this.analytics = analytics;
    _this.assetDefaults = assetDefaults;
    _this.auth = auth;
    _this.details = details;
    _this.publishing = publishing;
    _this.customComponents = customComponents;
    _this.routes = routes;
  };
};

module.exports = new SiteConfig();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Certificate = __webpack_require__(69);
var Channel = __webpack_require__(70);
var Claim = __webpack_require__(71);
var File = __webpack_require__(72);
var Request = __webpack_require__(73);
var User = __webpack_require__(74);

var Sequelize = __webpack_require__(30);
var logger = __webpack_require__(2);

var _require = __webpack_require__(27),
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(24);

var _publish = __webpack_require__(7);

var _view = __webpack_require__(117);

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

var _show_action_types = __webpack_require__(15);

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
var ua = __webpack_require__(79);

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(113);

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
/* 12 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = request;

__webpack_require__(120);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(77);
var logger = __webpack_require__(2);

var _require = __webpack_require__(78),
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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(5);
var logger = __webpack_require__(2);

var _require = __webpack_require__(90),
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
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(67);
var localLoginStrategy = __webpack_require__(68);
var localSignupStrategy = __webpack_require__(76);

var _require = __webpack_require__(80),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

passport.deserializeUser(deserializeSpeechUser);
passport.serializeUser(serializeSpeechUser);
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

module.exports = passport;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(2);
var db = __webpack_require__(5);
var lbryApi = __webpack_require__(14);
var publishHelpers = __webpack_require__(22);

var _require = __webpack_require__(4),
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var fs = __webpack_require__(88);

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
/* 23 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveStatusBar = __webpack_require__(142);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(143);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

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
/* 27 */
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
/* 28 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 29 */
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
/* 30 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(32);

var _redux = __webpack_require__(23);

var _reducers = __webpack_require__(33);

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _GAListener = __webpack_require__(38);

var _GAListener2 = _interopRequireDefault(_GAListener);

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(45);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(18);

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

var _redux = __webpack_require__(23);

var _publish = __webpack_require__(107);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(108);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(109);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(110);

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

var _reactGa = __webpack_require__(111);

var _reactGa2 = _interopRequireDefault(_reactGa);

var _reactRouterDom = __webpack_require__(6);

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

var _reactRouterDom = __webpack_require__(6);

var _HomePage = __webpack_require__(112);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _AboutPage = __webpack_require__(149);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _LoginPage = __webpack_require__(150);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(152);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(169);

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

var _publish = __webpack_require__(7);

var _view = __webpack_require__(123);

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

var _channel = __webpack_require__(24);

var _view = __webpack_require__(140);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(7);

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

var _channel = __webpack_require__(24);

var _view = __webpack_require__(141);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(7);

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

var _view = __webpack_require__(156);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(9);

var _show2 = __webpack_require__(16);

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
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/static/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/static/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/static/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/static/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(17),
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

var _redux = __webpack_require__(23);

var _index = __webpack_require__(33);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _index3 = __webpack_require__(38);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(39);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(45);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(175);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(19);

var _show_uri = __webpack_require__(176);

var _show = __webpack_require__(9);

var _reactHelmet = __webpack_require__(18);

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
var Path = __webpack_require__(63);
var loggerConfig = __webpack_require__(64);
var mysqlConfig = __webpack_require__(27);
var siteConfig = __webpack_require__(4);
var slackConfig = __webpack_require__(65);

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

    /* add middleware */
    // set HTTP headers to protect against well-known web vulnerabilties
    app.use(helmet());
    // 'express.static' to serve static files from public directory
    if (siteConfig.routes.publicFolder) {
      // take in a different public folder, so it can serve it's own bundle if needed
      var publicFolder = Path.resolve(process.cwd(), siteConfig.routes.publicFolder);
      app.use('/static', express.static(publicFolder));
      logger.info('serving static files from custom path:', publicFolder);
    } else {
      var publicPath = Path.resolve(__dirname, 'public');
      app.use('/static', express.static(publicPath));
      logger.info('serving static files from default path:', publicPath);
    };
    // 'body parser' for parsing application/json
    app.use(bodyParser.json());
    // 'body parser' for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // add custom middleware (note: build out to accept dynamically use what is in server/middleware/
    app.use(requestLogger);

    // configure passport
    var speechPassport = __webpack_require__(20);
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
    __webpack_require__(81)(app);
    __webpack_require__(86)(app);
    __webpack_require__(105)(app);
    __webpack_require__(173)(app);
    __webpack_require__(183)(app);

    _this.app = app;
  };
  this.initialize = function () {
    _this.createApp();
    _this.server = http.Server(_this.app);
  };
  this.start = function () {
    var db = __webpack_require__(5);
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
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 64 */
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(66).SlackWebHook;
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
/* 66 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(28).Strategy;
var logger = __webpack_require__(2);
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(29),
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
/* 70 */
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(29),
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
/* 72 */
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
/* 73 */
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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(75);
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
/* 75 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(28).Strategy;
var lbryApi = __webpack_require__(14);
var logger = __webpack_require__(2);
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
/* 77 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 78 */
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
/* 79 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 80 */
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(20);
var handleSignupRequest = __webpack_require__(82);
var handleLoginRequest = __webpack_require__(83);
var handleLogoutRequest = __webpack_require__(84);
var handleUserRequest = __webpack_require__(85);

module.exports = function (app) {
  app.post('/signup', speechPassport.authenticate('local-signup'), handleSignupRequest);
  app.post('/login', handleLoginRequest);
  app.get('/logout', handleLogoutRequest);
  app.get('/user', handleUserRequest);
};

/***/ }),
/* 82 */
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(20);

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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logout = function logout(req, res) {
  req.logout();
  res.status(200).json({ success: true, message: 'you successfully logged out' });
};

module.exports = logout;

/***/ }),
/* 85 */
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var channelAvailability = __webpack_require__(87);
var channelClaims = __webpack_require__(89);
var channelData = __webpack_require__(91);
var channelShortId = __webpack_require__(92);
var claimAvailability = __webpack_require__(93);
var claimData = __webpack_require__(94);
var claimGet = __webpack_require__(95);
var claimLongId = __webpack_require__(96);
var claimPublish = __webpack_require__(97);
var claimResolve = __webpack_require__(99);
var claimShortId = __webpack_require__(100);
var claimList = __webpack_require__(101);
var fileAvailability = __webpack_require__(102);

var multipartMiddleware = __webpack_require__(103);

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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(21),
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
/* 88 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(17),
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
/* 90 */
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(17),
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(5);

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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(21),
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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(5);

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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(14),
    getClaim = _require.getClaim;

var _require2 = __webpack_require__(22),
    addGetResultsToFileData = _require2.addGetResultsToFileData,
    createFileData = _require2.createFileData;

var _require3 = __webpack_require__(3),
    handleErrorResponse = _require3.handleErrorResponse;

var db = __webpack_require__(5);

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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(17),
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(22),
    createBasicPublishParams = _require.createBasicPublishParams,
    createThumbnailPublishParams = _require.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require.parsePublishApiRequestFiles;

var _require2 = __webpack_require__(21),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    publish = _require2.publish;

var _require3 = __webpack_require__(98),
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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(5);
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(14),
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(5);

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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(14),
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(5);

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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var multipart = __webpack_require__(104);

var _require = __webpack_require__(4),
    uploadDirectory = _require.publishing.uploadDirectory;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });

module.exports = multipartMiddleware;

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(106);
var handleEmbedRequest = __webpack_require__(171);
var redirect = __webpack_require__(172);

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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(31);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

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

var _show_action_types = __webpack_require__(15);

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
/* 110 */
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
/* 111 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

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

var _SEO = __webpack_require__(11);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _PublishTool = __webpack_require__(121);

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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(18);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _propTypes = __webpack_require__(12);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageTitle = __webpack_require__(114);

var _metaTags = __webpack_require__(115);

var _canonicalLink = __webpack_require__(116);

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
/* 114 */
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
/* 115 */
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
/* 116 */
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
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

var _Logo = __webpack_require__(118);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(119);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _request = __webpack_require__(13);

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
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

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
/* 119 */
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
/* 120 */
/***/ (function(module, exports) {

module.exports = require("cross-fetch/polyfill");

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(122);

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
/* 122 */
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

var _PublishDetails = __webpack_require__(126);

var _PublishDetails2 = _interopRequireDefault(_PublishDetails);

var _PublishStatus = __webpack_require__(144);

var _PublishStatus2 = _interopRequireDefault(_PublishStatus);

var _PublishDisabledMessage = __webpack_require__(147);

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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _file = __webpack_require__(124);

var _PublishPreview = __webpack_require__(125);

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
/* 124 */
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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(7);

var _view = __webpack_require__(127);

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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

var _Dropzone = __webpack_require__(40);

var _Dropzone2 = _interopRequireDefault(_Dropzone);

var _PublishTitleInput = __webpack_require__(128);

var _PublishTitleInput2 = _interopRequireDefault(_PublishTitleInput);

var _PublishUrlInput = __webpack_require__(130);

var _PublishUrlInput2 = _interopRequireDefault(_PublishUrlInput);

var _PublishThumbnailInput = __webpack_require__(133);

var _PublishThumbnailInput2 = _interopRequireDefault(_PublishThumbnailInput);

var _PublishMetadataInputs = __webpack_require__(135);

var _PublishMetadataInputs2 = _interopRequireDefault(_PublishMetadataInputs);

var _ChannelSelect = __webpack_require__(138);

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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(7);

var _view = __webpack_require__(129);

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
/* 129 */
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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publish = __webpack_require__(7);

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(131);

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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(13);

var _request2 = _interopRequireDefault(_request);

var _PublishUrlMiddleDisplay = __webpack_require__(132);

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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

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
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(7);

var _view = __webpack_require__(134);

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
/* 134 */
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
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(7);

var _view = __webpack_require__(136);

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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ExpandingTextArea = __webpack_require__(137);

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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(12);

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
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(7);

var _view = __webpack_require__(139);

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
/* 139 */
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
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(13);

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
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(25);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _request = __webpack_require__(13);

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
/* 142 */
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
/* 143 */
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
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(7);

var _view = __webpack_require__(145);

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
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(25);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _publish_claim_states = __webpack_require__(146);

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
/* 146 */
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
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(148);

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
/* 148 */
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
/* 149 */
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

var _SEO = __webpack_require__(11);

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
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(151);

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
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

var _SEO = __webpack_require__(11);

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
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(9);

var _view = __webpack_require__(153);

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
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = __webpack_require__(26);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _ShowAssetLite = __webpack_require__(154);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(157);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(163);

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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(155);

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
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(11);

var _SEO2 = _interopRequireDefault(_SEO);

var _reactRouterDom = __webpack_require__(6);

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
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(25);

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
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(158);

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
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(11);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ErrorPage = __webpack_require__(26);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(159);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(44);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(161);

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
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(160);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(16);

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
/* 160 */
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
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(162);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(16);

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
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

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
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(164);

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
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(11);

var _SEO2 = _interopRequireDefault(_SEO);

var _ErrorPage = __webpack_require__(26);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(8);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelClaimsDisplay = __webpack_require__(165);

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
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(9);

var _view = __webpack_require__(166);

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
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(167);

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
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(168);

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
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

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
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(170);

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
/* 170 */
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

var _reactHelmet = __webpack_require__(18);

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
/* 171 */
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
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redirect = function redirect(route) {
  return function (req, res) {
    res.status(301).redirect(route);
  };
};

module.exports = redirect;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var serveAssetByClaim = __webpack_require__(174);
var serveAssetByIdentifierAndClaim = __webpack_require__(182);

module.exports = function (app, db) {
  app.get('/:identifier/:claim', serveAssetByIdentifierAndClaim);
  app.get('/:claim', serveAssetByClaim);
};

/***/ }),
/* 174 */
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
/* 175 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = __webpack_require__(19);

var _show_action_types = __webpack_require__(15);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(9);

var _show_asset = __webpack_require__(177);

var _show_channel = __webpack_require__(179);

var _lbryUri = __webpack_require__(181);

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
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = __webpack_require__(19);

var _show_action_types = __webpack_require__(15);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(9);

var _assetApi = __webpack_require__(178);

var _show2 = __webpack_require__(16);

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
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongClaimId = getLongClaimId;
exports.getShortId = getShortId;
exports.getClaimData = getClaimData;

var _request = __webpack_require__(13);

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
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = __webpack_require__(19);

var _show_action_types = __webpack_require__(15);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(9);

var _channelApi = __webpack_require__(180);

var _show2 = __webpack_require__(16);

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
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelData = getChannelData;
exports.getChannelClaims = getChannelClaims;

var _request = __webpack_require__(13);

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
/* 181 */
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
/* 182 */
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
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(184);

module.exports = function (app) {
  app.get('*', handlePageRequest);
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(31);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjlkZWViMDk3M2M4MmQ2NDY4MDgiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvRXJyb3JQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiIiwid2VicGFjazovLy8uL3NwZWVjaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy8uL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL3NsYWNrQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9maWxlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1HZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1Mb25nSWQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1QdWJsaXNoLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVNob3J0SWQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1MaXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2ZpbGVBdmFpbGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZFJlYWN0QXBwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaXRlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWdhXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0hvbWVQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9TRU8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3BhZ2VUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvbWV0YVRhZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9BYm91dFBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRJbmZvL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZEVtYmVkUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3JlZGlyZWN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUNsYWltLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2FcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd191cmkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9hc3NldEFwaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hcGkvY2hhbm5lbEFwaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL3NlbmRSZWFjdEFwcC5qcyJdLCJuYW1lcyI6WyJsb2dnZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsImhhbmRsZUVycm9yUmVzcG9uc2UiLCJvcmlnaW5hbFVybCIsImlwIiwiZXJyb3IiLCJyZXMiLCJ1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMiLCJyZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMiLCJzdGF0dXMiLCJtZXNzYWdlIiwianNvbiIsImNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIiwiY29kZSIsImVyciIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJuZXdFcnJvck9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJmb3JFYWNoIiwia2V5Iiwic3VjY2VzcyIsIlNpdGVDb25maWciLCJhbmFseXRpY3MiLCJnb29nbGVJZCIsImFzc2V0RGVmYXVsdHMiLCJkZXNjcmlwdGlvbiIsInRodW1ibmFpbCIsInRpdGxlIiwiYXV0aCIsInNlc3Npb25LZXkiLCJjdXN0b21Db21wb25lbnRzIiwiY29tcG9uZW50cyIsImNvbnRhaW5lcnMiLCJwYWdlcyIsImRldGFpbHMiLCJob3N0IiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsInJvdXRlcyIsInVwZGF0ZSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsIlNlcXVlbGl6ZSIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInNlcXVlbGl6ZSIsImRpYWxlY3QiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwibG9nZ2luZyIsInBvb2wiLCJtYXgiLCJtaW4iLCJpZGxlIiwiYWNxdWlyZSIsImF1dGhlbnRpY2F0ZSIsInRoZW4iLCJpbmZvIiwiY2F0Y2giLCJkYiIsImltcG9ydCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwiZGVidWciLCJjcmVhdGUiLCJzZWxlY3RGaWxlIiwiY2xlYXJGaWxlIiwidXBkYXRlTWV0YWRhdGEiLCJ1cGRhdGVDbGFpbSIsInNldFB1Ymxpc2hJbkNoYW5uZWwiLCJ1cGRhdGVQdWJsaXNoU3RhdHVzIiwidXBkYXRlRXJyb3IiLCJ1cGRhdGVTZWxlY3RlZENoYW5uZWwiLCJ0b2dnbGVNZXRhZGF0YUlucHV0cyIsIm9uTmV3VGh1bWJuYWlsIiwic3RhcnRQdWJsaXNoIiwiYWN0aW9ucyIsImZpbGUiLCJ0eXBlIiwiRklMRV9TRUxFQ1RFRCIsImRhdGEiLCJGSUxFX0NMRUFSIiwibmFtZSIsInZhbHVlIiwiTUVUQURBVEFfVVBEQVRFIiwiQ0xBSU1fVVBEQVRFIiwiY2hhbm5lbCIsIlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwiLCJQVUJMSVNIX1NUQVRVU19VUERBVEUiLCJFUlJPUl9VUERBVEUiLCJjaGFubmVsTmFtZSIsIlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFIiwic2hvd01ldGFkYXRhSW5wdXRzIiwiVE9HR0xFX01FVEFEQVRBX0lOUFVUUyIsIlRIVU1CTkFJTF9ORVciLCJoaXN0b3J5IiwiUFVCTElTSF9TVEFSVCIsIm1hcFN0YXRlVG9Qcm9wcyIsInNpdGUiLCJsb2dnZWRJbkNoYW5uZWwiLCJjaGFubmVsU2hvcnRJZCIsInNob3J0SWQiLCJjaGFubmVsTG9uZ0lkIiwibG9uZ0lkIiwic2l0ZURlc2NyaXB0aW9uIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwib25DaGFubmVsTG9naW4iLCJkaXNwYXRjaCIsIm9uQ2hhbm5lbExvZ291dCIsIm9uSGFuZGxlU2hvd1BhZ2VVcmkiLCJvblJlcXVlc3RFcnJvciIsIm9uTmV3Q2hhbm5lbFJlcXVlc3QiLCJvbk5ld0Fzc2V0UmVxdWVzdCIsIm9uUmVxdWVzdFVwZGF0ZSIsImFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IiwiYWRkQXNzZXRUb0Fzc2V0TGlzdCIsImFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0Iiwib25VcGRhdGVDaGFubmVsQ2xhaW1zIiwidXBkYXRlQ2hhbm5lbENsYWltcyIsImZpbGVSZXF1ZXN0ZWQiLCJ1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IiwidXBkYXRlRGlzcGxheUFzc2V0RXJyb3IiLCJwYXJhbXMiLCJIQU5ETEVfU0hPV19VUkkiLCJSRVFVRVNUX0VSUk9SIiwiY2hhbm5lbElkIiwicmVxdWVzdFR5cGUiLCJyZXF1ZXN0SWQiLCJDSEFOTkVMX1JFUVVFU1RfTkVXIiwiaWQiLCJleHRlbnNpb24iLCJBU1NFVF9SRVFVRVNUX05FVyIsIm1vZGlmaWVyIiwiUkVRVUVTVF9VUERBVEUiLCJSRVFVRVNUX0xJU1RfQUREIiwiY2xhaW1JZCIsImNsYWltRGF0YSIsIkFTU0VUX0FERCIsImNsYWltc0RhdGEiLCJDSEFOTkVMX0FERCIsImNoYW5uZWxLZXkiLCJwYWdlIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DIiwiY2hhbm5lbExpc3RJZCIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTIiwiRklMRV9SRVFVRVNURUQiLCJGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUiLCJESVNQTEFZX0FTU0VUX0VSUk9SIiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsInNlbmRHQVRpbWluZ0V2ZW50IiwiY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsIiwiY2hhbm5lbF9uYW1lIiwiY2hhbm5lbF9pZCIsImRlZmF1bHREZXNjcmlwdGlvbiIsImRlZmF1bHRUaHVtYm5haWwiLCJzaXRlSG9zdCIsInNpdGVUaXRsZSIsInNpdGVUd2l0dGVyIiwicmVxdWVzdCIsInBhcnNlSlNPTiIsInJlc3BvbnNlIiwiY2hlY2tTdGF0dXMiLCJqc29uUmVzcG9uc2UiLCJFcnJvciIsInVybCIsIm9wdGlvbnMiLCJmZXRjaCIsIlByb21pc2UiLCJhbGwiLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bHQiLCJKU09OIiwic3RyaW5naWZ5IiwicHVibGlzaENsYWltIiwicHVibGlzaFBhcmFtcyIsImdhU3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInBvc3QiLCJtZXRob2QiLCJnZXRDbGFpbSIsInVyaSIsInRpbWVvdXQiLCJnZXRDbGFpbUxpc3QiLCJjbGFpbU5hbWUiLCJyZXNvbHZlVXJpIiwiZ2V0RG93bmxvYWREaXJlY3RvcnkiLCJkb3dubG9hZF9kaXJlY3RvcnkiLCJjcmVhdGVDaGFubmVsIiwiYW1vdW50Iiwic2VsZWN0QXNzZXQiLCJzaG93IiwicmVxdWVzdExpc3QiLCJhc3NldEtleSIsImFzc2V0TGlzdCIsInNlbGVjdFNob3dTdGF0ZSIsInN0YXRlIiwicmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyIsIk5PX0NIQU5ORUwiLCJOT19DTEFJTSIsIk5PX0ZJTEUiLCJnZXRDbGFpbUlkIiwiY2hhbm5lbENsYWltSWQiLCJnZXRDbGFpbUlkQnlDaGFubmVsIiwiZ2V0Q2xhaW1JZEJ5Q2xhaW0iLCJnZXRMb25nQ2xhaW1JZCIsImxvbmdDbGFpbUlkIiwiZ2V0TG9uZ0NoYW5uZWxJZCIsImxvbmdDaGFubmVsSWQiLCJnZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkIiwiZ2V0Q2hhbm5lbERhdGEiLCJsb25nQ2hhbm5lbENsYWltSWQiLCJnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkIiwic2hvcnRDaGFubmVsQ2xhaW1JZCIsImdldENoYW5uZWxDbGFpbXMiLCJnZXRBbGxDaGFubmVsQ2xhaW1zIiwiY2hhbm5lbENsYWltc0FycmF5IiwicGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhIiwiZ2V0TG9jYWxGaWxlUmVjb3JkIiwiZGF0YVZhbHVlcyIsInBhc3Nwb3J0IiwibG9jYWxMb2dpblN0cmF0ZWd5IiwibG9jYWxTaWdudXBTdHJhdGVneSIsInNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJkZXNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJkZXNlcmlhbGl6ZVVzZXIiLCJzZXJpYWxpemVVc2VyIiwidXNlIiwibGJyeUFwaSIsInB1Ymxpc2hIZWxwZXJzIiwiT3AiLCJwdWJsaXNoIiwiZmlsZU5hbWUiLCJmaWxlVHlwZSIsInB1Ymxpc2hSZXN1bHRzIiwiY2VydGlmaWNhdGVJZCIsInR4IiwiZmlsZVJlY29yZCIsImNsYWltX2lkIiwibWV0YWRhdGEiLCJhZGRyZXNzIiwiY2xhaW1fYWRkcmVzcyIsIm91dHBvaW50IiwidHhpZCIsIm5vdXQiLCJoZWlnaHQiLCJmaWxlUGF0aCIsImZpbGVfcGF0aCIsIm5zZnciLCJjbGFpbVJlY29yZCIsImNvbnRlbnRUeXBlIiwiYmlkIiwidXBzZXJ0Q3JpdGVyaWEiLCJjbGFpbSIsInNldENsYWltIiwic2V0RmlsZSIsImRlbGV0ZVRlbXBvcmFyeUZpbGUiLCJjbGFpbU5hbWVJc0F2YWlsYWJsZSIsImNsYWltQWRkcmVzc2VzIiwicHVzaCIsImZpbmRBbGwiLCJhdHRyaWJ1dGVzIiwib3IiLCJjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkiLCJmcyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5IiwibGljZW5zZSIsImludmFsaWROYW1lQ2hhcmFjdGVycyIsImV4ZWMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMiLCJwYXRoIiwic2l6ZSIsInRlc3QiLCJ2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSIsInRodW1ibmFpbEZpbGVOYW1lIiwidGh1bWJuYWlsRmlsZVBhdGgiLCJ0aHVtYm5haWxGaWxlVHlwZSIsImNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyIsInRyaW0iLCJhdXRob3IiLCJsYW5ndWFnZSIsImNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJ1bmxpbmsiLCJhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSIsImZpbGVJbmZvIiwiZ2V0UmVzdWx0IiwiZmlsZV9uYW1lIiwiZG93bmxvYWRfcGF0aCIsImNyZWF0ZUZpbGVEYXRhIiwidXBkYXRlTG9nZ2VkSW5DaGFubmVsIiwiQ0hBTk5FTF9VUERBVEUiLCJQcm9ncmVzc0JhciIsInByb3BzIiwiYmFycyIsImluZGV4IiwiaW5jcmVtZW50ZXIiLCJjcmVhdGVCYXJzIiwiYmluZCIsInN0YXJ0UHJvZ3Jlc3NCYXIiLCJ1cGRhdGVQcm9ncmVzc0JhciIsInN0b3BQcm9ncmVzc0JhciIsImkiLCJpc0FjdGl2ZSIsInNldFN0YXRlIiwidXBkYXRlSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJtYXAiLCJiYXIiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiRXJyb3JQYWdlIiwic3RyaW5nIiwibXlzcWwiLCJ3YXJuIiwicmV0dXJuU2hvcnRJZCIsImNsYWltc0FycmF5IiwiY2xhaW1JbmRleCIsInN1YnN0cmluZyIsInNob3J0SWRMZW5ndGgiLCJmaW5kSW5kZXgiLCJlbGVtZW50IiwicG9zc2libGVNYXRjaGVzIiwic2xpY2UiLCJmaWx0ZXIiLCJyZXEiLCJjb250ZXh0Iiwic3RvcmUiLCJodG1sIiwiaGVsbWV0IiwicmVuZGVyU3RhdGljIiwicmVkaXJlY3QiLCJwcmVsb2FkZWRTdGF0ZSIsImdldFN0YXRlIiwic2VuZCIsIkxPR0lOIiwiQ1JFQVRFIiwiTE9DQUxfQ0hFQ0siLCJVTkFWQUlMQUJMRSIsIkVSUk9SIiwiQVZBSUxBQkxFIiwiaW5pdGlhbGl6ZSIsIkdBTGlzdGVuZXIiLCJzZW5kUGFnZVZpZXciLCJsb2NhdGlvbiIsImxpc3RlbiIsInNldCIsInBhdGhuYW1lIiwicGFnZXZpZXciLCJjaGlsZHJlbiIsIkFwcCIsImZpbGVFcnJvciIsInNldEZpbGVFcnJvciIsIkNIQU5ORUwiLCJBU1NFVF9MSVRFIiwiQVNTRVRfREVUQUlMUyIsImRpc3BsYXlBc3NldCIsImFzc2V0Iiwib25GaWxlUmVxdWVzdCIsInRvU3RyaW5nIiwibWV0YSIsImxpbmsiLCJTRVJWRSIsIlNIT1ciLCJjbGllbnRBY2NlcHRzSHRtbCIsImFjY2VwdCIsIm1hdGNoIiwicmVxdWVzdElzRnJvbUJyb3dzZXIiLCJjbGllbnRXYW50c0Fzc2V0IiwicmFuZ2UiLCJpbWFnZUlzV2FudGVkIiwidmlkZW9Jc1dhbnRlZCIsImlzVmFsaWRDbGFpbUlkIiwiaXNWYWxpZFNob3J0SWQiLCJpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCIsImlucHV0Iiwic2VydmVBc3NldFRvQ2xpZW50IiwidmVyYm9zZSIsInNlbmRGaWxlT3B0aW9ucyIsInNlbmRGaWxlIiwiZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQiLCJmdWxsQ2xhaW1JZCIsImRldGVybWluZVJlc3BvbnNlVHlwZSIsImhhc0ZpbGVFeHRlbnNpb24iLCJyZXNwb25zZVR5cGUiLCJmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IiwiaWRlbnRpZmllciIsInRlbXBOYW1lIiwibG9nUmVxdWVzdERhdGEiLCJSRUdFWFBfSU5WQUxJRF9DTEFJTSIsIlJFR0VYUF9JTlZBTElEX0NIQU5ORUwiLCJSRUdFWFBfQUREUkVTUyIsIkNIQU5ORUxfQ0hBUiIsInBhcnNlSWRlbnRpZmllciIsImNvbXBvbmVudHNSZWdleCIsIlJlZ0V4cCIsInByb3RvIiwibW9kaWZpZXJTZXBlcmF0b3IiLCJpc0NoYW5uZWwiLCJzdGFydHNXaXRoIiwibmFtZUJhZENoYXJzIiwiam9pbiIsInBhcnNlQ2xhaW0iLCJwYXJzZU1vZGlmaWVyIiwicmV0dXJuU2FnYVdpdGhQYXJhbXMiLCJzYWdhIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlIiwiYWN0aW9uIiwicnVuIiwiZG9uZSIsInNlbGVjdFNpdGVTdGF0ZSIsInNlbGVjdFNpdGVIb3N0IiwiU2VydmVyIiwiZXhwcmVzcyIsImJvZHlQYXJzZXIiLCJleHByZXNzSGFuZGxlYmFycyIsIkhhbmRsZWJhcnMiLCJjb29raWVTZXNzaW9uIiwiaHR0cCIsInJlcXVlc3RMb2dnZXIiLCJQYXRoIiwibG9nZ2VyQ29uZmlnIiwibXlzcWxDb25maWciLCJzaXRlQ29uZmlnIiwic2xhY2tDb25maWciLCJjb25maWd1cmVMb2dnZXIiLCJ1c2VyQ29uZmlnIiwiY29uZmlndXJlTXlzcWwiLCJjb25maWd1cmVTaXRlRGV0YWlscyIsImNvbmZpZ3VyZVNsYWNrIiwiY29uZmlndXJlQ2xpZW50QnVuZGxlIiwiY29uZmlndXJlTW9kZWxzIiwiY29uZmlndXJlUm91dGVzIiwiY3JlYXRlQXBwIiwiYXBwIiwiZW5hYmxlIiwicHVibGljRm9sZGVyIiwicHJvY2VzcyIsImN3ZCIsInN0YXRpYyIsInB1YmxpY1BhdGgiLCJfX2Rpcm5hbWUiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJzcGVlY2hQYXNzcG9ydCIsIm1heEFnZSIsInNlc3Npb24iLCJoYnMiLCJkZWZhdWx0TGF5b3V0IiwiaGFuZGxlYmFycyIsImVuZ2luZSIsInNlcnZlciIsInN0YXJ0IiwiUE9SVCIsInN5bmMiLCJuZXh0IiwiTG9nZ2VyQ29uZmlnIiwibG9nTGV2ZWwiLCJjb25maWd1cmUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImxldmVsIiwidGltZXN0YW1wIiwiY29sb3JpemUiLCJwcmV0dHlQcmludCIsImhhbmRsZUV4Y2VwdGlvbnMiLCJodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uIiwic2lsbHkiLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwid2luc3RvbiIsIlNsYWNrQ29uZmlnIiwic2xhY2tXZWJIb29rIiwic2xhY2tFcnJvckNoYW5uZWwiLCJzbGFja0luZm9DaGFubmVsIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSIsIlBhc3Nwb3J0TG9jYWxTdHJhdGVneSIsIlN0cmF0ZWd5IiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwidXNlckluZm8iLCJ1c2VyTmFtZSIsImdldENoYW5uZWwiLCJzaG9ydENoYW5uZWxJZCIsInVzZXJuYW1lRmllbGQiLCJwYXNzd29yZEZpZWxkIiwidXNlciIsImNvbXBhcmVQYXNzd29yZCIsImlzTWF0Y2giLCJTVFJJTkciLCJCT09MRUFOIiwiSU5URUdFUiIsIlRFWFQiLCJERUNJTUFMIiwiZGVmaW5lIiwiZGVmYXVsdCIsImNsYWltU2VxdWVuY2UiLCJkZWNvZGVkQ2xhaW0iLCJkZXB0aCIsImVmZmVjdGl2ZUFtb3VudCIsImhhc1NpZ25hdHVyZSIsImhleCIsInZhbGlkQXRIZWlnaHQiLCJ2YWx1ZVZlcnNpb24iLCJjbGFpbVR5cGUiLCJjZXJ0aWZpY2F0ZVZlcnNpb24iLCJrZXlUeXBlIiwicHVibGljS2V5IiwiZnJlZXplVGFibGVOYW1lIiwiYmVsb25nc1RvIiwiZm9yZWlnbktleSIsImFsbG93TnVsbCIsIm9yZGVyIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCIsIiRsaWtlIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSIsInZhbGlkYXRlTG9uZ0NoYW5uZWxJZCIsImhhc09uZSIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2UiLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwidXNlckRhdGEiLCJjaGFubmVsRGF0YSIsImNlcnRpZmljYXRlRGF0YSIsIm5ld1VzZXIiLCJuZXdDaGFubmVsIiwibmV3Q2VydGlmaWNhdGUiLCJzZXRDaGFubmVsIiwic2V0VXNlciIsImxicnlDb25maWciLCJoYW5kbGVTaWdudXBSZXF1ZXN0IiwiaGFuZGxlTG9naW5SZXF1ZXN0IiwiaGFuZGxlTG9nb3V0UmVxdWVzdCIsImhhbmRsZVVzZXJSZXF1ZXN0IiwiZ2V0Iiwic2lnbnVwIiwibG9naW4iLCJsb2dJbiIsImxvZ291dCIsImNoYW5uZWxBdmFpbGFiaWxpdHkiLCJjaGFubmVsQ2xhaW1zIiwiY2xhaW1BdmFpbGFiaWxpdHkiLCJjbGFpbUdldCIsImNsYWltTG9uZ0lkIiwiY2xhaW1QdWJsaXNoIiwiY2xhaW1SZXNvbHZlIiwiY2xhaW1TaG9ydElkIiwiY2xhaW1MaXN0IiwiZmlsZUF2YWlsYWJpbGl0eSIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJhdmFpbGFibGVOYW1lIiwiYm9keSIsIkNMQUlNU19QRVJfUEFHRSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJwcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJjdXJyZW50UGFnZSIsIm5leHRQYWdlIiwiZGV0ZXJtaW5lTmV4dFBhZ2UiLCJ0b3RhbFJlc3VsdHMiLCJkZXRlcm1pbmVUb3RhbENsYWltcyIsInBhcnNlSW50IiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsIk1hdGgiLCJmbG9vciIsInJlbWFpbmRlciIsImNoYW5uZWxTaG9ydElkUm91dGUiLCJjbGFpbUluZm8iLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJjb21wbGV0ZWQiLCJhdXRoZW50aWNhdGVVc2VyIiwiZmlsZXMiLCJjaGFubmVsUGFzc3dvcmQiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJyZXNvbHZlZFVyaSIsImNsYWltc0xpc3QiLCJtdWx0aXBhcnQiLCJ1cGxvYWREaXIiLCJoYW5kbGVQYWdlUmVxdWVzdCIsImhhbmRsZUVtYmVkUmVxdWVzdCIsImhhbmRsZVBhZ2VSZW5kZXIiLCJzZW5kUmVhY3RBcHAiLCJpbml0aWFsU3RhdGUiLCJhc3NpZ24iLCJwdWJsaXNoSW5DaGFubmVsIiwic2VsZWN0ZWRDaGFubmVsIiwicHVibGlzaFN1Ym1pdCIsImNoYW5uZWxMaXN0IiwiZ29vZ2xlQW5hbHl0aWNzSWQiLCJIb21lUGFnZSIsIlNFTyIsInBhZ2VVcmkiLCJwYWdlVGl0bGUiLCJtZXRhVGFncyIsImNhbm9uaWNhbExpbmsiLCJyZWwiLCJocmVmIiwib2JqZWN0IiwiY3JlYXRlUGFnZVRpdGxlIiwiZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZSIsImZpbGVFeHQiLCJsYXN0SW5kZXhPZiIsImNyZWF0ZUJhc2ljTWV0YVRhZ3MiLCJwcm9wZXJ0eSIsImNvbnRlbnQiLCJjcmVhdGVDaGFubmVsTWV0YVRhZ3MiLCJjcmVhdGVBc3NldE1ldGFUYWdzIiwiZW1iZWRVcmwiLCJzaG93VXJsIiwib2dUaXRsZSIsIm9nRGVzY3JpcHRpb24iLCJvZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwib2dUaHVtYm5haWwiLCJjcmVhdGVNZXRhVGFncyIsImNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayIsImNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayIsImNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2Fub25pY2FsTGluayIsIlZJRVciLCJMT0dPVVQiLCJOYXZCYXIiLCJjaGVja0ZvckxvZ2dlZEluVXNlciIsImxvZ291dFVzZXIiLCJoYW5kbGVTZWxlY3Rpb24iLCJjcmVkZW50aWFscyIsInRhcmdldCIsInNlbGVjdGVkT3B0aW9ucyIsIkxvZ28iLCJOYXZCYXJDaGFubmVsRHJvcGRvd24iLCJkZWZhdWx0U2VsZWN0aW9uIiwiUHVibGlzaFRvb2wiLCJEcm9wem9uZSIsImRyYWdPdmVyIiwibW91c2VPdmVyIiwiZGltUHJldmlldyIsImhhbmRsZURyb3AiLCJoYW5kbGVEcmFnT3ZlciIsImhhbmRsZURyYWdFbmQiLCJoYW5kbGVEcmFnRW50ZXIiLCJoYW5kbGVEcmFnTGVhdmUiLCJoYW5kbGVNb3VzZUVudGVyIiwiaGFuZGxlTW91c2VMZWF2ZSIsImhhbmRsZUNsaWNrIiwiaGFuZGxlRmlsZUlucHV0IiwiY2hvb3NlRmlsZSIsInByZXZlbnREZWZhdWx0IiwiZHQiLCJkYXRhVHJhbnNmZXIiLCJpdGVtcyIsImtpbmQiLCJkcm9wcGVkRmlsZSIsImdldEFzRmlsZSIsInJlbW92ZSIsImNsZWFyRGF0YSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGljayIsImZpbGVMaXN0IiwidmFsaWRhdGVGaWxlIiwiUHVibGlzaFByZXZpZXciLCJpbWdTb3VyY2UiLCJzZXRQcmV2aWV3SW1hZ2VTb3VyY2UiLCJuZXdQcm9wcyIsInNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlIiwicHJldmlld1JlYWRlciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNEYXRhVVJMIiwib25sb2FkZW5kIiwiYm9vbCIsIlB1Ymxpc2hEZXRhaWxzIiwib25QdWJsaXNoU3VibWl0Iiwib25NZXRhZGF0YUNoYW5nZSIsIlB1Ymxpc2hUaXRsZUlucHV0IiwiaGFuZGxlSW5wdXQiLCJlIiwibG9nZ2VkSW5DaGFubmVsTmFtZSIsImxvZ2dlZEluQ2hhbm5lbFNob3J0SWQiLCJ1cmxFcnJvciIsIm9uQ2xhaW1DaGFuZ2UiLCJvblVybEVycm9yIiwiUHVibGlzaFVybElucHV0Iiwic2V0Q2xhaW1OYW1lIiwidmFsaWRhdGVDbGFpbSIsImNsZWFuc2VJbnB1dCIsImZpbGVOYW1lV2l0aG91dEVuZGluZyIsImNsZWFuQ2xhaW1OYW1lIiwiVXJsTWlkZGxlIiwiZGF0YVVSSXRvQmxvYiIsImRhdGFVUkkiLCJieXRlU3RyaW5nIiwiYXRvYiIsInNwbGl0IiwibWltZVN0cmluZyIsImlhIiwiVWludDhBcnJheSIsImNoYXJDb2RlQXQiLCJCbG9iIiwiUHVibGlzaFRodW1ibmFpbElucHV0IiwidmlkZW9Tb3VyY2UiLCJzbGlkZXJNaW5SYW5nZSIsInNsaWRlck1heFJhbmdlIiwic2xpZGVyVmFsdWUiLCJoYW5kbGVWaWRlb0xvYWRlZERhdGEiLCJoYW5kbGVTbGlkZXJDaGFuZ2UiLCJjcmVhdGVUaHVtYm5haWwiLCJzZXRWaWRlb1NvdXJjZSIsIm5leHRQcm9wcyIsImRhdGFVcmkiLCJibG9iIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwidG90YWxNaW51dGVzIiwidG90YWxTZWNvbmRzIiwidmlkZW8iLCJjdXJyZW50VGltZSIsImNhbnZhcyIsImNyZWF0ZUVsZW1lbnQiLCJ3aWR0aCIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsImdldENvbnRleHQiLCJkcmF3SW1hZ2UiLCJkYXRhVXJsIiwidG9EYXRhVVJMIiwic25hcHNob3QiLCJkaXNwbGF5Iiwib25Ub2dnbGVNZXRhZGF0YUlucHV0cyIsIlB1Ymxpc2hNZXRhZGF0YUlucHV0cyIsInRvZ2dsZVNob3dJbnB1dHMiLCJoYW5kbGVTZWxlY3QiLCJjaGVja2VkIiwic2VsZWN0ZWRPcHRpb24iLCJtYXhIZWlnaHQiLCJFeHBhbmRpbmdUZXh0YXJlYSIsIl9oYW5kbGVDaGFuZ2UiLCJhZGp1c3RUZXh0YXJlYSIsIm9uQ2hhbmdlIiwiZWwiLCJzdHlsZSIsInNjcm9sbEhlaWdodCIsInJlc3QiLCJ4IiwiZnVuYyIsImNoYW5uZWxFcnJvciIsIm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZSIsIm9uQ2hhbm5lbFNlbGVjdCIsInN0YXRlcyIsIkNoYW5uZWxTZWxlY3QiLCJ0b2dnbGVBbm9ueW1vdXNQdWJsaXNoIiwiQ2hhbm5lbExvZ2luRm9ybSIsImxvZ2luVG9DaGFubmVsIiwiSGVhZGVycyIsIkNoYW5uZWxDcmVhdGVGb3JtIiwiaGFuZGxlQ2hhbm5lbElucHV0IiwiY2xlYW5zZUNoYW5uZWxJbnB1dCIsInVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSIsImNoYW5uZWxXaXRoQXRTeW1ib2wiLCJjaGVja0lzUGFzc3dvcmRQcm92aWRlZCIsImNoZWNrSXNDaGFubmVsQXZhaWxhYmxlIiwibWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCIsIkFjdGl2ZVN0YXR1c0JhciIsIkluYWN0aXZlU3RhdHVzQmFyIiwicHVibGlzaFN0YXRlcyIsIlB1Ymxpc2hTdGF0dXMiLCJMT0FEX1NUQVJUIiwiTE9BRElORyIsIlBVQkxJU0hJTkciLCJTVUNDRVNTIiwiRkFJTEVEIiwiUHVibGlzaERpc2FibGVkTWVzc2FnZSIsIkFib3V0UGFnZSIsIkxvZ2luUGFnZSIsIlNob3dQYWdlIiwiU2hvd0xpdGUiLCJBc3NldERpc3BsYXkiLCJTaG93QXNzZXREZXRhaWxzIiwiQXNzZXRUaXRsZSIsIkFzc2V0SW5mbyIsImNvcHlUb0NsaXBib2FyZCIsImVsZW1lbnRUb0NvcHkiLCJkYXRhc2V0IiwiZWxlbWVudHRvY29weSIsInNlbGVjdCIsImV4ZWNDb21tYW5kIiwicHJldmlvdXNSZXF1ZXN0IiwiU2hvd0NoYW5uZWwiLCJDaGFubmVsQ2xhaW1zRGlzcGxheSIsInNob3dOZXh0UmVzdWx0c1BhZ2UiLCJzaG93UHJldmlvdXNSZXN1bHRzUGFnZSIsInNob3dOZXdQYWdlIiwiZGVmYXVsdHMiLCJBc3NldFByZXZpZXciLCJkaXJlY3RTb3VyY2VMaW5rIiwic2hvd1VybExpbmsiLCJGb3VyT2hGb3JQYWdlIiwic2VuZEVtYmVkUGFnZSIsInJlbmRlciIsImxheW91dCIsInJvdXRlIiwic2VydmVBc3NldEJ5Q2xhaW0iLCJzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0iLCJsYnJ5VXJpIiwiaGFuZGxlU2hvd1JlbmRlciIsInNlcnZlckFzc2V0QnlDbGFpbSIsImhhbmRsZVNob3dQYWdlVXJpIiwid2F0Y2hIYW5kbGVTaG93UGFnZVVyaSIsInBhcnNlQW5kVXBkYXRlSWRlbnRpZmllckFuZENsYWltIiwicGFyc2VBbmRVcGRhdGVDbGFpbU9ubHkiLCJuZXdBc3NldFJlcXVlc3QiLCJ3YXRjaE5ld0Fzc2V0UmVxdWVzdCIsImdldFNob3J0SWQiLCJnZXRDbGFpbURhdGEiLCJuZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoTmV3Q2hhbm5lbFJlcXVlc3QiLCJ3YXRjaFVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsIiwiZXh0ZW5zaW9uU2VwZXJhdG9yIiwic2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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SUFBTXlyQixlQUFlLFNBQWZBLFlBQWUsQ0FBQ3BULEdBQUQsRUFBTTlYLEdBQU4sRUFBYztBQUNqQ2lyQixtQkFBaUJuVCxHQUFqQixFQUFzQjlYLEdBQXRCO0FBQ0QsQ0FGRDs7QUFJQU4sT0FBT0MsT0FBUCxHQUFpQnVyQixZQUFqQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2OWRlZWIwOTczYzgyZDY0NjgwOCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVFcnJvclJlc3BvbnNlOiBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBvbiAke29yaWdpbmFsVXJsfWAsIG1vZHVsZS5leHBvcnRzLnVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyhlcnJvcikpO1xuICAgIGNvbnN0IFtzdGF0dXMsIG1lc3NhZ2VdID0gbW9kdWxlLmV4cG9ydHMucmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoc3RhdHVzKVxuICAgICAgLmpzb24obW9kdWxlLmV4cG9ydHMuY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQoc3RhdHVzLCBtZXNzYWdlKSk7XG4gIH0sXG4gIHJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1czogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgbGV0IHN0YXR1cywgbWVzc2FnZTtcbiAgICAvLyBjaGVjayBmb3IgZGFlbW9uIGJlaW5nIHR1cm5lZCBvZmZcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHN0YXR1cyA9IDUwMztcbiAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiByZWZ1c2VkLiAgVGhlIGRhZW1vbiBtYXkgbm90IGJlIHJ1bm5pbmcuJztcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gNDAwO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFtzdGF0dXMsIG1lc3NhZ2VdO1xuICB9LFxuICB1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXM6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBuZXdFcnJvck9iamVjdCA9IHt9O1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbmV3RXJyb3JPYmplY3Rba2V5XSA9IGVycltrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3RXJyb3JPYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH0sXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsImZ1bmN0aW9uIFNpdGVDb25maWcgKCkge1xuICB0aGlzLmFuYWx5dGljcyA9IHtcbiAgICBnb29nbGVJZDogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmFzc2V0RGVmYXVsdHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdBbiBhc3NldCBwdWJsaXNoZWQgb24gU3BlZS5jaCcsXG4gICAgdGh1bWJuYWlsICA6ICdodHRwczovL3NwZWUuY2gvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgfTtcbiAgdGhpcy5hdXRoID0ge1xuICAgIHNlc3Npb25LZXk6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5jdXN0b21Db21wb25lbnRzID0ge1xuICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIGNvbnRhaW5lcnM6IHt9LFxuICAgIHBhZ2VzICAgICA6IHt9LFxuICB9O1xuICB0aGlzLmRldGFpbHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPcGVuLXNvdXJjZSwgZGVjZW50cmFsaXplZCBpbWFnZSBhbmQgdmlkZW8gc2hhcmluZy4nLFxuICAgIGhvc3QgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgcG9ydCAgICAgICA6IDMwMDAsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgICB0d2l0dGVyICAgIDogJ0BzcGVlX2NoJyxcbiAgfTtcbiAgdGhpcy5wdWJsaXNoaW5nID0ge1xuICAgIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlczogW10sXG4gICAgZGlzYWJsZWQgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICBkaXNhYmxlZE1lc3NhZ2UgICAgICAgICA6ICdQbGVhc2UgY2hlY2sgYmFjayBzb29uLicsXG4gICAgcHJpbWFyeUNsYWltQWRkcmVzcyAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbCAgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbElkICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdXBsb2FkRGlyZWN0b3J5ICAgICAgICAgOiAnL2hvbWUvbGJyeS9VcGxvYWRzJyxcbiAgfTtcbiAgdGhpcy5yb3V0ZXMgPSB7fTtcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gc2l0ZSBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgYW5hbHl0aWNzLCBhc3NldERlZmF1bHRzLCBhdXRoLCBjdXN0b21Db21wb25lbnRzLCBkZXRhaWxzLCBwdWJsaXNoaW5nLCByb3V0ZXMgfSA9IGNvbmZpZztcbiAgICBjb25zb2xlLmxvZygnQ29uZmlndXJpbmcgc2l0ZSBkZXRhaWxzLi4uJyk7XG4gICAgdGhpcy5hbmFseXRpY3MgPSBhbmFseXRpY3M7XG4gICAgdGhpcy5hc3NldERlZmF1bHRzID0gYXNzZXREZWZhdWx0cztcbiAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgdGhpcy5wdWJsaXNoaW5nID0gcHVibGlzaGluZztcbiAgICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSBjdXN0b21Db21wb25lbnRzO1xuICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2l0ZUNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NpdGVDb25maWcuanMiLCJjb25zdCBDZXJ0aWZpY2F0ZSA9IHJlcXVpcmUoJ21vZGVscy9jZXJ0aWZpY2F0ZS5qcycpO1xuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJ21vZGVscy9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJ21vZGVscy9jbGFpbS5qcycpO1xuY29uc3QgRmlsZSA9IHJlcXVpcmUoJ21vZGVscy9maWxlLmpzJyk7XG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnbW9kZWxzL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCdtb2RlbHMvdXNlci5qcycpO1xuXG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3Qge2RhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmR9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcblxuLy8gc2V0IHNlcXVlbGl6ZSBvcHRpb25zXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcbiAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0ICAgICAgIDogJ215c3FsJyxcbiAgZGlhbGVjdE9wdGlvbnM6IHtkZWNpbWFsTnVtYmVyczogdHJ1ZX0sXG4gIGxvZ2dpbmcgICAgICAgOiBmYWxzZSxcbiAgcG9vbCAgICAgICAgICA6IHtcbiAgICBtYXggICAgOiA1LFxuICAgIG1pbiAgICA6IDAsXG4gICAgaWRsZSAgIDogMTAwMDAsXG4gICAgYWNxdWlyZTogMTAwMDAsXG4gIH0sXG59KTtcblxuLy8gZXN0YWJsaXNoIG15c3FsIGNvbm5lY3Rpb25cbnNlcXVlbGl6ZVxuICAuYXV0aGVudGljYXRlKClcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKCdTZXF1ZWxpemUgaGFzIGVzdGFibGlzaGVkIG15c3FsIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5LicpO1xuICB9KVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICBsb2dnZXIuZXJyb3IoJ1NlcXVlbGl6ZSB3YXMgdW5hYmxlIHRvIGNvbm5lY3QgdG8gdGhlIGRhdGFiYXNlOicsIGVycik7XG4gIH0pO1xuXG4vLyBtYW51YWxseSBhZGQgZWFjaCBtb2RlbCB0byB0aGUgZGIgb2JqZWN0IChub3RlOiBtYWtlIHRoaXMgZHluYW1pYylcbmNvbnN0IGRiID0ge307XG5kYlsnQ2VydGlmaWNhdGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NlcnRpZmljYXRlJywgQ2VydGlmaWNhdGUpO1xuZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbmRiWydDbGFpbSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2xhaW0nLCBDbGFpbSk7XG5kYlsnRmlsZSddID0gc2VxdWVsaXplLmltcG9ydCgnRmlsZScsIEZpbGUpO1xuZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbmRiWydVc2VyJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdVc2VyJywgVXNlcik7XG5cbi8vIHJ1biBtb2RlbC5hc3NvY2lhdGlvbiBmb3IgZWFjaCBtb2RlbCBpbiB0aGUgZGIgb2JqZWN0IHRoYXQgaGFzIGFuIGFzc29jaWF0aW9uXG5sb2dnZXIuaW5mbygnYXNzb2NpYXRpbmcgZGIgbW9kZWxzLi4uJyk7XG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChtb2RlbE5hbWUgPT4ge1xuICBpZiAoZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUpIHtcbiAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICBkYlttb2RlbE5hbWVdLmFzc29jaWF0ZShkYik7XG4gIH1cbn0pO1xuXG4vLyBhZGQgc2VxdWVsaXplL1NlcXVlbGl6ZSB0byBkYlxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplO1xuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcyc7XG5cbi8vIGV4cG9ydCBhY3Rpb24gY3JlYXRvcnNcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RGaWxlIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX1NFTEVDVEVELFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJGaWxlICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfQ0xFQVIsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWV0YWRhdGEgKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5NRVRBREFUQV9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHZhbHVlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2xhaW0gKHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DTEFJTV9VUERBVEUsXG4gICAgZGF0YTogdmFsdWUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0UHVibGlzaEluQ2hhbm5lbCAoY2hhbm5lbCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCxcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVB1Ymxpc2hTdGF0dXMgKHN0YXR1cywgbWVzc2FnZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUFVCTElTSF9TVEFUVVNfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIG1lc3NhZ2UsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVFcnJvciAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkVSUk9SX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZENoYW5uZWwgKGNoYW5uZWxOYW1lKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRUxFQ1RFRF9DSEFOTkVMX1VQREFURSxcbiAgICBkYXRhOiBjaGFubmVsTmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVNZXRhZGF0YUlucHV0cyAoc2hvd01ldGFkYXRhSW5wdXRzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5UT0dHTEVfTUVUQURBVEFfSU5QVVRTLFxuICAgIGRhdGE6IHNob3dNZXRhZGF0YUlucHV0cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld1RodW1ibmFpbCAoZmlsZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuVEhVTUJOQUlMX05FVyxcbiAgICBkYXRhOiBmaWxlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UHVibGlzaCAoaGlzdG9yeSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUFVCTElTSF9TVEFSVCxcbiAgICBkYXRhOiB7IGhpc3RvcnkgfSxcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL3B1Ymxpc2guanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgc2l0ZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbE5hbWUgICA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgY2hhbm5lbFNob3J0SWQ6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLnNob3J0SWQsXG4gICAgY2hhbm5lbExvbmdJZCA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLmxvbmdJZCxcbiAgICBzaXRlRGVzY3JpcHRpb246IHNpdGUuZGVzY3JpcHRpb24sXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgICBvbkNoYW5uZWxMb2dvdXQ6ICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChudWxsLCBudWxsLCBudWxsKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL2luZGV4LmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuXG5pbXBvcnQgeyBDSEFOTkVMLCBBU1NFVF9MSVRFLCBBU1NFVF9ERVRBSUxTIH0gZnJvbSAnY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcyc7XG5cbi8vIGJhc2ljIHJlcXVlc3QgcGFyc2luZ1xuZXhwb3J0IGZ1bmN0aW9uIG9uSGFuZGxlU2hvd1BhZ2VVcmkgKHBhcmFtcykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLFxuICAgIGRhdGE6IHBhcmFtcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlcXVlc3RFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdDaGFubmVsUmVxdWVzdCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkge1xuICBjb25zdCByZXF1ZXN0VHlwZSA9IENIQU5ORUw7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IGBjciMke2NoYW5uZWxOYW1lfSMke2NoYW5uZWxJZH1gO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVyxcbiAgICBkYXRhOiB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld0Fzc2V0UmVxdWVzdCAobmFtZSwgaWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGV4dGVuc2lvbikge1xuICBjb25zdCByZXF1ZXN0VHlwZSA9IGV4dGVuc2lvbiA/IEFTU0VUX0xJVEUgOiBBU1NFVF9ERVRBSUxTO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgYXIjJHtuYW1lfSMke2lkfSMke2NoYW5uZWxOYW1lfSMke2NoYW5uZWxJZH1gO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgICBuYW1lLFxuICAgICAgbW9kaWZpZXI6IHtcbiAgICAgICAgaWQsXG4gICAgICAgIGNoYW5uZWw6IHtcbiAgICAgICAgICBuYW1lOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICBpZCAgOiBjaGFubmVsSWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0VXBkYXRlIChyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICByZXF1ZXN0VHlwZSxcbiAgICAgIHJlcXVlc3RJZCxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IChpZCwgZXJyb3IsIGtleSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwga2V5IH0sXG4gIH07XG59O1xuXG4vLyBhc3NldCBhY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBc3NldFRvQXNzZXRMaXN0IChpZCwgZXJyb3IsIG5hbWUsIGNsYWltSWQsIHNob3J0SWQsIGNsYWltRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQVNTRVRfQURELFxuICAgIGRhdGE6IHsgaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEgfSxcbiAgfTtcbn1cblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCAoaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9BREQsXG4gICAgZGF0YTogeyBpZCwgbmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25VcGRhdGVDaGFubmVsQ2xhaW1zIChjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyxcbiAgICBkYXRhOiB7Y2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDaGFubmVsQ2xhaW1zIChjaGFubmVsTGlzdElkLCBjbGFpbXNEYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyxcbiAgICBkYXRhOiB7Y2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YX0sXG4gIH07XG59O1xuXG4vLyBkaXNwbGF5IGEgZmlsZVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZVJlcXVlc3RlZCAobmFtZSwgY2xhaW1JZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9SRVFVRVNURUQsXG4gICAgZGF0YTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRmlsZUF2YWlsYWJpbGl0eSAoc3RhdHVzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEUsXG4gICAgZGF0YTogc3RhdHVzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlBc3NldEVycm9yIChlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRElTUExBWV9BU1NFVF9FUlJPUixcbiAgICBkYXRhOiBlcnJvcixcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9zaG93LmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgdWEgPSByZXF1aXJlKCd1bml2ZXJzYWwtYW5hbHl0aWNzJyk7XG5jb25zdCB7IGFuYWx5dGljcyA6IHsgZ29vZ2xlSWQgfSwgZGV0YWlsczogeyB0aXRsZSB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICBldmVudENhdGVnb3J5ICAgIDogJ2NsaWVudCByZXF1ZXN0cycsXG4gICAgZXZlbnRBY3Rpb24gICAgICA6ICdzZXJ2ZSByZXF1ZXN0JyxcbiAgICBldmVudExhYmVsICAgICAgIDogb3JpZ2luYWxVcmwsXG4gICAgaXBPdmVycmlkZSAgICAgICA6IGlwLFxuICAgIHVzZXJBZ2VudE92ZXJyaWRlOiBoZWFkZXJzWyd1c2VyLWFnZW50J10sXG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICBjb25zdCBkdXJhdGlvbiA9IGVuZFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiB7XG4gICAgdXNlclRpbWluZ0NhdGVnb3J5ICAgIDogY2F0ZWdvcnksXG4gICAgdXNlclRpbWluZ1ZhcmlhYmxlTmFtZTogdmFyaWFibGUsXG4gICAgdXNlclRpbWluZ1RpbWUgICAgICAgIDogZHVyYXRpb24sXG4gICAgdXNlclRpbWluZ0xhYmVsICAgICAgIDogbGFiZWwsXG4gIH07XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQgKGlwLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvcklkID0gaXAucmVwbGFjZSgvXFwuL2csICctJyk7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLmV2ZW50KHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcgKHZpc2l0b3JJZCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLnRpbWluZyhwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYFRpbWluZyBldmVudCBzdWNjZXNzZnVsbHkgc2VudCB0byBnb29nbGUgYW5hbHl0aWNzYCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlbmRHQVNlcnZlRXZlbnQgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQoaXAsIHBhcmFtcyk7XG4gIH0sXG4gIHNlbmRHQVRpbWluZ0V2ZW50IChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nKHRpdGxlLCBwYXJhbXMpO1xuICB9LFxuICBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwgKHsgY2hhbm5lbF9uYW1lOiBjaGFubmVsTmFtZSwgY2hhbm5lbF9pZDogY2hhbm5lbElkIH0pIHtcbiAgICByZXR1cm4gKGNoYW5uZWxOYW1lIHx8IGNoYW5uZWxJZCA/ICdQVUJMSVNIX0lOX0NIQU5ORUxfQ0xBSU0nIDogJ1BVQkxJU0hfQU5PTllNT1VTX0NMQUlNJyk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNpdGUgfSkgPT4ge1xuICBjb25zdCB7IGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCwgZGVzY3JpcHRpb246IHNpdGVEZXNjcmlwdGlvbiwgaG9zdDogc2l0ZUhvc3QsIHRpdGxlOiBzaXRlVGl0bGUsIHR3aXR0ZXI6IHNpdGVUd2l0dGVyIH0gPSBzaXRlO1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgICBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIHNpdGVEZXNjcmlwdGlvbixcbiAgICBzaXRlSG9zdCxcbiAgICBzaXRlVGl0bGUsXG4gICAgc2l0ZVR3aXR0ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicHJvcC10eXBlc1wiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJ2Nyb3NzLWZldGNoL3BvbHlmaWxsJztcblxuLyoqXG4gKiBQYXJzZXMgdGhlIEpTT04gcmV0dXJuZWQgYnkgYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlc3BvbnNlIEEgcmVzcG9uc2UgZnJvbSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIHBhcnNlZCBKU09OIGZyb20gdGhlIHJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gcGFyc2VKU09OIChyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDQgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgc3RhdHVzIHJldHVybmVkIGJ5IGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSAgIEEgcmVzcG9uc2UgZnJvbSBhIG5ldHdvcmsgcmVxdWVzdFxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSAgIFRoZSBwYXJzZWQgSlNPTiBmcm9tIHRoZSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3QgfCB1bmRlZmluZWR9IFJldHVybnMgb2JqZWN0IHdpdGggc3RhdHVzIGFuZCBzdGF0dXNUZXh0LCBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gY2hlY2tTdGF0dXMgKHJlc3BvbnNlLCBqc29uUmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgcmV0dXJuIGpzb25SZXNwb25zZTtcbiAgfVxuICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihqc29uUmVzcG9uc2UubWVzc2FnZSk7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHRocm93IGVycm9yO1xufVxuXG4vKipcbiAqIFJlcXVlc3RzIGEgVVJMLCByZXR1cm5pbmcgYSBwcm9taXNlXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSB1cmwgICAgICAgVGhlIFVSTCB3ZSB3YW50IHRvIHJlcXVlc3RcbiAqIEBwYXJhbSAge29iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIHdlIHdhbnQgdG8gcGFzcyB0byBcImZldGNoXCJcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICBUaGUgcmVzcG9uc2UgZGF0YVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gZmV0Y2godXJsLCBvcHRpb25zKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbcmVzcG9uc2UsIHBhcnNlSlNPTihyZXNwb25zZSldKTtcbiAgICB9KVxuICAgIC50aGVuKChbcmVzcG9uc2UsIGpzb25SZXNwb25zZV0pID0+IHtcbiAgICAgIHJldHVybiBjaGVja1N0YXR1cyhyZXNwb25zZSwganNvblJlc3BvbnNlKTtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBhcGk6IHsgYXBpSG9zdCwgYXBpUG9ydCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbGJyeUNvbmZpZy5qcycpO1xuY29uc3QgbGJyeUFwaVVyaSA9ICdodHRwOi8vJyArIGFwaUhvc3QgKyAnOicgKyBhcGlQb3J0O1xuY29uc3QgeyBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwsIHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCcuL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuXG5jb25zdCBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UgPSAoeyBkYXRhIH0sIHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBsb2dnZXIuZGVidWcoJ2xicnkgYXBpIGRhdGE6JywgZGF0YSk7XG4gIGlmIChkYXRhLnJlc3VsdCkge1xuICAgIC8vIGNoZWNrIGZvciBhbiBlcnJvclxuICAgIGlmIChkYXRhLnJlc3VsdC5lcnJvcikge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdMYnJ5bmV0IGFwaSBlcnJvcjonLCBkYXRhLnJlc3VsdC5lcnJvcik7XG4gICAgICByZWplY3QobmV3IEVycm9yKGRhdGEucmVzdWx0LmVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZmFsbGJhY2sgaW4gY2FzZSBpdCBqdXN0IHRpbWVkIG91dFxuICByZWplY3QoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2hDbGFpbSAocHVibGlzaFBhcmFtcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBQdWJsaXNoaW5nIGNsYWltIHRvIFwiJHtwdWJsaXNoUGFyYW1zLm5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdwdWJsaXNoJyxcbiAgICAgICAgICBwYXJhbXM6IHB1Ymxpc2hQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdwdWJsaXNoJywgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsKHB1Ymxpc2hQYXJhbXMpLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgQ2xhaW0gZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmksIHRpbWVvdXQ6IDIwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbScsICdHRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUxpc3QgKGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIGNsYWltX2xpc3QgZm9yIFwiJHtjbGFpbU5hbWV9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjbGFpbV9saXN0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXRDbGFpbUxpc3QnLCAnQ0xBSU1fTElTVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHJlc29sdmVVcmkgKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBSZXNvbHZpbmcgVVJJIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncmVzb2x2ZScsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdyZXNvbHZlVXJpJywgJ1JFU09MVkUnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpIHsgIC8vIGNoZWNrIGZvciBlcnJvcnNcbiAgICAgICAgICAgIHJlamVjdChkYXRhLnJlc3VsdFt1cmldLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgeyAgLy8gaWYgbm8gZXJyb3JzLCByZXNvbHZlXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0W3VyaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RG93bmxvYWREaXJlY3RvcnkgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGJyeUFwaSA+PiBSZXRyaWV2aW5nIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkgcGF0aCBmcm9tIGxicnkgZGFlbW9uLi4uJyk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnc2V0dGluZ3NfZ2V0JyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0RG93bmxvYWREaXJlY3RvcnknLCAnU0VUVElOR1NfR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdC5kb3dubG9hZF9kaXJlY3RvcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGxicnkgZGFlbW9uLCBidXQgdW5hYmxlIHRvIHJldHJpZXZlIHRoZSBkb3dubG9hZCBkaXJlY3RvcnkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignTGJyeW5ldCBFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgcmVzb2x2ZSgnL2hvbWUvbGJyeS9Eb3dubG9hZHMvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjcmVhdGVDaGFubmVsIChuYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IENyZWF0aW5nIGNoYW5uZWwgZm9yICR7bmFtZX0uLi5gKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdjaGFubmVsX25ldycsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBjaGFubmVsX25hbWU6IG5hbWUsXG4gICAgICAgICAgICBhbW91bnQgICAgICA6IDAuMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnY3JlYXRlQ2hhbm5lbCcsICdDSEFOTkVMX05FVycsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbGJyeUFwaS5qcyIsIi8vIHJlcXVlc3QgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEhBTkRMRV9TSE9XX1VSSSA9ICdIQU5ETEVfU0hPV19VUkknO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfRVJST1IgPSAnUkVRVUVTVF9FUlJPUic7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9VUERBVEUgPSAnUkVRVUVTVF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX1JFUVVFU1RfTkVXID0gJ0FTU0VUX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1JFUVVFU1RfTkVXID0gJ0NIQU5ORUxfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfTElTVF9BREQgPSAnUkVRVUVTVF9MSVNUX0FERCc7XG5cbi8vIGFzc2V0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBBU1NFVF9BREQgPSBgQVNTRVRfQUREYDtcblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9BREQgPSAnQ0hBTk5FTF9BREQnO1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MnO1xuXG4vLyBhc3NldC9maWxlIGRpc3BsYXkgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEZJTEVfUkVRVUVTVEVEID0gJ0ZJTEVfUkVRVUVTVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUgPSAnRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBESVNQTEFZX0FTU0VUX0VSUk9SID0gJ0RJU1BMQVlfQVNTRVRfRVJST1InO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RBc3NldCA9IChzaG93KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7XG4gIHJldHVybiBzaG93LmFzc2V0TGlzdFthc3NldEtleV07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hvd1N0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaG93O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgcGFzc3BvcnQgPSByZXF1aXJlKCdwYXNzcG9ydCcpO1xuY29uc3QgbG9jYWxMb2dpblN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1sb2dpbi5qcycpO1xuY29uc3QgbG9jYWxTaWdudXBTdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtc2lnbnVwLmpzJyk7XG5jb25zdCB7IHNlcmlhbGl6ZVNwZWVjaFVzZXIsIGRlc2VyaWFsaXplU3BlZWNoVXNlciB9ID0gcmVxdWlyZSgnaGVscGVycy9hdXRoSGVscGVycy5qcycpO1xuXG5wYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZGVzZXJpYWxpemVTcGVlY2hVc2VyKTtcbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoc2VyaWFsaXplU3BlZWNoVXNlcik7XG5wYXNzcG9ydC51c2UoJ2xvY2FsLWxvZ2luJywgbG9jYWxMb2dpblN0cmF0ZWd5KTtcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtc2lnbnVwJywgbG9jYWxTaWdudXBTdHJhdGVneSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFzc3BvcnQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCdoZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcbmNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgT3AgPSBTZXF1ZWxpemUuT3A7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoIChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHB1Ymxpc2hSZXN1bHRzLCBjZXJ0aWZpY2F0ZUlkLCBjaGFubmVsTmFtZTtcbiAgICAgIC8vIHB1Ymxpc2ggdGhlIGZpbGVcbiAgICAgIHJldHVybiBsYnJ5QXBpLnB1Ymxpc2hDbGFpbShwdWJsaXNoUGFyYW1zKVxuICAgICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFN1Y2Nlc3NmdWxseSBwdWJsaXNoZWQgJHtwdWJsaXNoUGFyYW1zLm5hbWV9ICR7ZmlsZU5hbWV9YCwgdHgpO1xuICAgICAgICAgIHB1Ymxpc2hSZXN1bHRzID0gdHg7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgaWYgKHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYHRoaXMgY2xhaW0gd2FzIHB1Ymxpc2hlZCBpbiBjaGFubmVsOiAke3B1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuIGRiLkNoYW5uZWwuZmluZE9uZSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgY2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygndGhpcyBjbGFpbSB3YXMgbm90IHB1Ymxpc2hlZCBpbiBhIGNoYW5uZWwnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgIC8vIHNldCBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgY2VydGlmaWNhdGVJZCA9IG51bGw7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgPSBudWxsO1xuICAgICAgICAgIGlmIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gY2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lID0gY2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKGBjZXJ0aWZpY2F0ZUlkOiAke2NlcnRpZmljYXRlSWR9YCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBGaWxlIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGZpbGVSZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgZmlsZVBhdGggICA6IHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoLFxuICAgICAgICAgICAgZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gY3JlYXRlIHRoZSBDbGFpbSByZWNvcmRcbiAgICAgICAgICBjb25zdCBjbGFpbVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIHRodW1ibmFpbCAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRodW1ibmFpbCxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICAgIGFtb3VudCAgICAgOiBwdWJsaXNoUGFyYW1zLmJpZCxcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQsXG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCBjcml0ZXJpYVxuICAgICAgICAgIGNvbnN0IHVwc2VydENyaXRlcmlhID0ge1xuICAgICAgICAgICAgbmFtZSAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgdGhlIHJlY29yZHNcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0ZpbGUnKSwgZGIudXBzZXJ0KGRiLkNsYWltLCBjbGFpbVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdDbGFpbScpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChbZmlsZSwgY2xhaW1dKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlLnNldENsYWltKGNsYWltKSwgY2xhaW0uc2V0RmlsZShmaWxlKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdGaWxlIGFuZCBDbGFpbSByZWNvcmRzIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgICAgcmVzb2x2ZShwdWJsaXNoUmVzdWx0cyk7IC8vIHJlc29sdmUgdGhlIHByb21pc2Ugd2l0aCB0aGUgcmVzdWx0IGZyb20gbGJyeUFwaS5wdWJsaXNoQ2xhaW07XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdQVUJMSVNIIEVSUk9SJywgZXJyb3IpO1xuICAgICAgICAgIHB1Ymxpc2hIZWxwZXJzLmRlbGV0ZVRlbXBvcmFyeUZpbGUocHVibGlzaFBhcmFtcy5maWxlX3BhdGgpOyAvLyBkZWxldGUgdGhlIGxvY2FsIGZpbGVcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUgKG5hbWUpIHtcbiAgICBjb25zdCBjbGFpbUFkZHJlc3NlcyA9IGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB8fCBbXTtcbiAgICBjbGFpbUFkZHJlc3Nlcy5wdXNoKHByaW1hcnlDbGFpbUFkZHJlc3MpO1xuICAgIC8vIGZpbmQgYW55IHJlY29yZHMgd2hlcmUgdGhlIG5hbWUgaXMgdXNlZFxuICAgIHJldHVybiBkYi5DbGFpbVxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbJ2FkZHJlc3MnXSxcbiAgICAgICAgd2hlcmUgICAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWRkcmVzczoge1xuICAgICAgICAgICAgW09wLm9yXTogY2xhaW1BZGRyZXNzZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNsYWltIGlzIGFscmVhZHkgaW4gdXNlJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSAobmFtZSkge1xuICAgIHJldHVybiBkYi5DaGFubmVsXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IGNoYW5uZWxOYW1lOiBuYW1lIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjaGFubmVsIGhhcyBhbHJlYWR5IGJlZW4gY2xhaW1lZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCB7IGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSkge1xuICAgIC8vIHZhbGlkYXRlIG5hbWVcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbmFtZSBmaWVsZCBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGludmFsaWROYW1lQ2hhcmFjdGVycyA9IC9bXkEtWmEtejAtOSwtXS8uZXhlYyhuYW1lKTtcbiAgICBpZiAoaW52YWxpZE5hbWVDaGFyYWN0ZXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjbGFpbSBuYW1lIHlvdSBwcm92aWRlZCBpcyBub3QgYWxsb3dlZC4gIE9ubHkgdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzIGFyZSBhbGxvd2VkOiBBLVosIGEteiwgMC05LCBhbmQgXCItXCInKTtcbiAgICB9XG4gICAgLy8gb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgIG5zZncgPSAobnNmdyA9PT0gJ3RydWUnKTtcbiAgICBsaWNlbnNlID0gbGljZW5zZSB8fCBudWxsO1xuICAgIHRpdGxlID0gdGl0bGUgfHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uIHx8IG51bGw7XG4gICAgdGh1bWJuYWlsID0gdGh1bWJuYWlsIHx8IG51bGw7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIG5zZncsXG4gICAgICBsaWNlbnNlLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIHRodW1ibmFpbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgKHtmaWxlLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gbWFrZSBzdXJlIGEgZmlsZSB3YXMgcHJvdmlkZWRcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB3aXRoIGtleSBvZiBbZmlsZV0gZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5zaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZSBuYW1lXG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGVcbiAgICBtb2R1bGUuZXhwb3J0cy52YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZShmaWxlKTtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlTmFtZSAgICAgICAgIDogZmlsZS5uYW1lLFxuICAgICAgZmlsZVBhdGggICAgICAgICA6IGZpbGUucGF0aCxcbiAgICAgIGZpbGVUeXBlICAgICAgICAgOiBmaWxlLnR5cGUsXG4gICAgICB0aHVtYm5haWxGaWxlTmFtZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5uYW1lIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlUGF0aDogKHRodW1ibmFpbCA/IHRodW1ibmFpbC5wYXRoIDogbnVsbCksXG4gICAgICB0aHVtYm5haWxGaWxlVHlwZTogKHRodW1ibmFpbCA/IHRodW1ibmFpbC50eXBlIDogbnVsbCksXG4gICAgfTtcbiAgfSxcbiAgdmFsaWRhdGVGaWxlVHlwZUFuZFNpemUgKGZpbGUpIHtcbiAgICAvLyBjaGVjayBmaWxlIHR5cGUgYW5kIHNpemVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmpwZWcvLmpwZy8ucG5nIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5naWYgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCAuZ2lmcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAubXA0IHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IHVucmVjb2duaXplZCBmaWxlIHR5cGUnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgJyArIGZpbGUudHlwZSArICcgY29udGVudCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuICBPbmx5LCAuanBlZywgLnBuZywgLmdpZiwgYW5kIC5tcDQgZmlsZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlO1xuICB9LFxuICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMgKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0cyBmb3IgdGl0bGVcbiAgICBpZiAodGl0bGUgPT09IG51bGwgfHwgdGl0bGUudHJpbSgpID09PSAnJykge1xuICAgICAgdGl0bGUgPSBuYW1lO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGRlc2NyaXB0aW9uXG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSBudWxsIHx8IGRlc2NyaXB0aW9uLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gJyc7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgbGljZW5zZVxuICAgIGlmIChsaWNlbnNlID09PSBudWxsIHx8IGxpY2Vuc2UudHJpbSgpID09PSAnJykge1xuICAgICAgbGljZW5zZSA9ICcgJzsgIC8vIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nXG4gICAgfVxuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICBjb25zdCBwdWJsaXNoUGFyYW1zID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGZpbGVfcGF0aDogZmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgIH07XG4gICAgLy8gYWRkIHRodW1ibmFpbCB0byBjaGFubmVsIGlmIHZpZGVvXG4gICAgaWYgKHRodW1ibmFpbCkge1xuICAgICAgcHVibGlzaFBhcmFtc1snbWV0YWRhdGEnXVsndGh1bWJuYWlsJ10gPSB0aHVtYm5haWw7XG4gICAgfVxuICAgIHJldHVybiBwdWJsaXNoUGFyYW1zO1xuICB9LFxuICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zICh0aHVtYm5haWxGaWxlUGF0aCwgY2xhaW1OYW1lLCBsaWNlbnNlLCBuc2Z3KSB7XG4gICAgaWYgKCF0aHVtYm5haWxGaWxlUGF0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFRodW1ibmFpbCBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUgICAgIDogYCR7Y2xhaW1OYW1lfS10aHVtYmAsXG4gICAgICBmaWxlX3BhdGg6IHRodW1ibmFpbEZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIHRpdGxlICAgICAgOiBgJHtjbGFpbU5hbWV9IHRodW1ibmFpbGAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgYSB0aHVtYm5haWwgZm9yICR7Y2xhaW1OYW1lfWAsXG4gICAgICAgIGF1dGhvciAgICAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZSAgIDogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgICBjaGFubmVsX25hbWUgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWwsXG4gICAgICBjaGFubmVsX2lkICAgOiBwdWJsaXNoaW5nLnRodW1ibmFpbENoYW5uZWxJZCxcbiAgICB9O1xuICB9LFxuICBkZWxldGVUZW1wb3JhcnlGaWxlIChmaWxlUGF0aCkge1xuICAgIGZzLnVubGluayhmaWxlUGF0aCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBlcnJvciBkZWxldGluZyB0ZW1wb3JhcnkgZmlsZSAke2ZpbGVQYXRofWApO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgICBsb2dnZXIuZGVidWcoYHN1Y2Nlc3NmdWxseSBkZWxldGVkICR7ZmlsZVBhdGh9YCk7XG4gICAgfSk7XG4gIH0sXG4gIGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIChmaWxlSW5mbywgZ2V0UmVzdWx0KSB7XG4gICAgZmlsZUluZm8uZmlsZU5hbWUgPSBnZXRSZXN1bHQuZmlsZV9uYW1lO1xuICAgIGZpbGVJbmZvLmZpbGVQYXRoID0gZ2V0UmVzdWx0LmRvd25sb2FkX3BhdGg7XG4gICAgcmV0dXJuIGZpbGVJbmZvO1xuICB9LFxuICBjcmVhdGVGaWxlRGF0YSAoeyBuYW1lLCBjbGFpbUlkLCBvdXRwb2ludCwgaGVpZ2h0LCBhZGRyZXNzLCBuc2Z3LCBjb250ZW50VHlwZSB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBjbGFpbUlkLFxuICAgICAgb3V0cG9pbnQsXG4gICAgICBoZWlnaHQsXG4gICAgICBhZGRyZXNzLFxuICAgICAgZmlsZU5hbWU6ICcnLFxuICAgICAgZmlsZVBhdGg6ICcnLFxuICAgICAgZmlsZVR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgbnNmdyxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbi8vIGV4cG9ydCBhY3Rpb24gY3JlYXRvcnNcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgc2hvcnRJZCxcbiAgICAgIGxvbmdJZCxcbiAgICB9LFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL2NoYW5uZWwuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBBY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXInO1xuaW1wb3J0IEluYWN0aXZlU3RhdHVzQmFyIGZyb20gJ2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXInO1xuXG5jbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYmFycyAgICAgICA6IFtdLFxuICAgICAgaW5kZXggICAgICA6IDAsXG4gICAgICBpbmNyZW1lbnRlcjogMSxcbiAgICB9O1xuICAgIHRoaXMuY3JlYXRlQmFycyA9IHRoaXMuY3JlYXRlQmFycy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhciA9IHRoaXMuc3RhcnRQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIgPSB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdG9wUHJvZ3Jlc3NCYXIgPSB0aGlzLnN0b3BQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmNyZWF0ZUJhcnMoKTtcbiAgICB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIoKTtcbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy5zdG9wUHJvZ3Jlc3NCYXIoKTtcbiAgfVxuICBjcmVhdGVCYXJzICgpIHtcbiAgICBjb25zdCBiYXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5wcm9wcy5zaXplOyBpKyspIHtcbiAgICAgIGJhcnMucHVzaCh7aXNBY3RpdmU6IGZhbHNlfSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBiYXJzIH0pO1xuICB9XG4gIHN0YXJ0UHJvZ3Jlc3NCYXIgKCkge1xuICAgIHRoaXMudXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZVByb2dyZXNzQmFyLmJpbmQodGhpcyksIDMwMCk7XG4gIH07XG4gIHVwZGF0ZVByb2dyZXNzQmFyICgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLnN0YXRlLmluZGV4O1xuICAgIGxldCBpbmNyZW1lbnRlciA9IHRoaXMuc3RhdGUuaW5jcmVtZW50ZXI7XG4gICAgbGV0IGJhcnMgPSB0aGlzLnN0YXRlLmJhcnM7XG4gICAgLy8gZmxpcCBpbmNyZW1lbnRlciBpZiBuZWNlc3NhcnksIHRvIHN0YXkgaW4gYm91bmRzXG4gICAgaWYgKChpbmRleCA8IDApIHx8IChpbmRleCA+IHRoaXMucHJvcHMuc2l6ZSkpIHtcbiAgICAgIGluY3JlbWVudGVyID0gaW5jcmVtZW50ZXIgKiAtMTtcbiAgICAgIGluZGV4ICs9IGluY3JlbWVudGVyO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgdGhlIGluZGV4ZWQgYmFyXG4gICAgaWYgKGluY3JlbWVudGVyID4gMCkge1xuICAgICAgYmFyc1tpbmRleF0uaXNBY3RpdmUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gICAgLy8gaW5jcmVtZW50IGluZGV4XG4gICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgLy8gdXBkYXRlIHN0YXRlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBiYXJzLFxuICAgICAgaW5jcmVtZW50ZXIsXG4gICAgICBpbmRleCxcbiAgICB9KTtcbiAgfTtcbiAgc3RvcFByb2dyZXNzQmFyICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudXBkYXRlSW50ZXJ2YWwpO1xuICB9O1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5zdGF0ZS5iYXJzLm1hcCgoYmFyLCBpbmRleCkgPT4gYmFyLmlzQWN0aXZlID8gPEFjdGl2ZVN0YXR1c0JhciBrZXk9e2luZGV4fSAvPiA6IDxJbmFjdGl2ZVN0YXR1c0JhciBrZXk9e2luZGV4fS8+KX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cblByb2dyZXNzQmFyLnByb3BUeXBlcyA9IHtcbiAgc2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuXG5jbGFzcyBFcnJvclBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPHA+e2Vycm9yfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5FcnJvclBhZ2UucHJvcFR5cGVzID0ge1xuICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIG15c3FsICgpIHtcbiAgdGhpcy5kYXRhYmFzZSA9ICdkZWZhdWx0JztcbiAgdGhpcy51c2VybmFtZSA9ICdkZWZhdWx0JztcbiAgdGhpcy5wYXNzd29yZCA9ICdkZWZhdWx0JztcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBsb2dnZXIud2FybignTm8gTXlTUUwgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICAvLyBjb25maWd1cmUgY3JlZGVudGlhbHNcbiAgICBsb2dnZXIuaW5mbygnY29uZmlndXJpbmcgbXlzcWwuLi4nKTtcbiAgICBjb25zdCB7IGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IGNvbmZpZztcbiAgICB0aGlzLmRhdGFiYXNlID0gZGF0YWJhc2U7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IG15c3FsKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1sb2NhbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCJcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlcXVlbGl6ZVwiXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnY2xpZW50L3JlZHVjZXJzJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICdjbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyLyc7XG5pbXBvcnQgQXBwIGZyb20gJ2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UuanMnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIpO1xuXG4gIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcblxuICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAvLyBTb21ld2hlcmUgYSBgPFJlZGlyZWN0PmAgd2FzIHJlbmRlcmVkXG4gICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB3ZSdyZSBnb29kLCBzZW5kIHRoZSByZXNwb25zZVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUHVibGlzaFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvcHVibGlzaCc7XG5pbXBvcnQgQ2hhbm5lbFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvY2hhbm5lbCc7XG5pbXBvcnQgU2hvd1JlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2hvdyc7XG5pbXBvcnQgU2l0ZVJlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2l0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGNoYW5uZWw6IENoYW5uZWxSZWR1Y2VyLFxuICBwdWJsaXNoOiBQdWJsaXNoUmVkdWNlcixcbiAgc2hvdyAgIDogU2hvd1JlZHVjZXIsXG4gIHNpdGUgICA6IFNpdGVSZWR1Y2VyLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJleHBvcnQgY29uc3QgRklMRV9TRUxFQ1RFRCA9ICdGSUxFX1NFTEVDVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0NMRUFSID0gJ0ZJTEVfQ0xFQVInO1xuZXhwb3J0IGNvbnN0IE1FVEFEQVRBX1VQREFURSA9ICdNRVRBREFUQV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IENMQUlNX1VQREFURSA9ICdDTEFJTV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFVF9QVUJMSVNIX0lOX0NIQU5ORUwgPSAnU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFUVVNfVVBEQVRFID0gJ1BVQkxJU0hfU1RBVFVTX1VQREFURSc7XG5leHBvcnQgY29uc3QgRVJST1JfVVBEQVRFID0gJ0VSUk9SX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VMRUNURURfQ0hBTk5FTF9VUERBVEUgPSAnU0VMRUNURURfQ0hBTk5FTF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9NRVRBREFUQV9JTlBVVFMgPSAnVE9HR0xFX01FVEFEQVRBX0lOUFVUUyc7XG5leHBvcnQgY29uc3QgVEhVTUJOQUlMX05FVyA9ICdUSFVNQk5BSUxfTkVXJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVJUID0gJ1BVQkxJU0hfU1RBUlQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBMT0dJTiA9ICdFeGlzdGluZyc7XG5leHBvcnQgY29uc3QgQ1JFQVRFID0gJ05ldyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwiZXhwb3J0IGNvbnN0IENIQU5ORUxfVVBEQVRFID0gJ0NIQU5ORUxfVVBEQVRFJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9DQUxfQ0hFQ0sgPSAnTE9DQUxfQ0hFQ0snO1xuZXhwb3J0IGNvbnN0IFVOQVZBSUxBQkxFID0gJ1VOQVZBSUxBQkxFJztcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdFUlJPUic7XG5leHBvcnQgY29uc3QgQVZBSUxBQkxFID0gJ0FWQUlMQUJMRSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBHb29nbGVBbmFseXRpY3MgZnJvbSAncmVhY3QtZ2EnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuY29uc3QgeyBhbmFseXRpY3M6IHsgZ29vZ2xlSWQgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5Hb29nbGVBbmFseXRpY3MuaW5pdGlhbGl6ZShnb29nbGVJZCk7XG5cbmNsYXNzIEdBTGlzdGVuZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zZW5kUGFnZVZpZXcodGhpcy5wcm9wcy5oaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0aGlzLnByb3BzLmhpc3RvcnkubGlzdGVuKHRoaXMuc2VuZFBhZ2VWaWV3KTtcbiAgfVxuXG4gIHNlbmRQYWdlVmlldyAobG9jYXRpb24pIHtcbiAgICBHb29nbGVBbmFseXRpY3Muc2V0KHsgcGFnZTogbG9jYXRpb24ucGF0aG5hbWUgfSk7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnBhZ2V2aWV3KGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihHQUxpc3RlbmVyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlLCBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBIb21lUGFnZSBmcm9tICdwYWdlcy9Ib21lUGFnZSc7XG5pbXBvcnQgQWJvdXRQYWdlIGZyb20gJ3BhZ2VzL0Fib3V0UGFnZSc7XG5pbXBvcnQgTG9naW5QYWdlIGZyb20gJ3BhZ2VzL0xvZ2luUGFnZSc7XG5pbXBvcnQgU2hvd1BhZ2UgZnJvbSAncGFnZXMvU2hvd1BhZ2UnO1xuaW1wb3J0IEZvdXJPaEZvdXJQYWdlIGZyb20gJ2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UnO1xuLy8gaW1wb3J0IHsgZHluYW1pY0ltcG9ydCB9IGZyb20gJ3V0aWxzL2R5bmFtaWNJbXBvcnQnO1xuLy8gY29uc3QgSG9tZVBhZ2UgPSBkeW5hbWljSW1wb3J0KCdwYWdlcy9Ib21lUGFnZScpOyAvLyBvciB1c2UgdGhlIHByb3ZpZGVkIGxvY2FsIGhvbWVwYWdlXG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3dpdGNoPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17SG9tZVBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2Fib3V0JyBjb21wb25lbnQ9e0Fib3V0UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvbG9naW4nIGNvbXBvbmVudD17TG9naW5QYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy86aWRlbnRpZmllci86Y2xhaW0nIGNvbXBvbmVudD17U2hvd1BhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBjb21wb25lbnQ9e0ZvdXJPaEZvdXJQYWdlfSAvPlxuICAgIDwvU3dpdGNoPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwcC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBzZWxlY3RGaWxlLCB1cGRhdGVFcnJvciwgY2xlYXJGaWxlIH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGUgICAgIDogcHVibGlzaC5maWxlLFxuICAgIHRodW1ibmFpbDogcHVibGlzaC50aHVtYm5haWwsXG4gICAgZmlsZUVycm9yOiBwdWJsaXNoLmVycm9yLmZpbGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0RmlsZTogKGZpbGUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHNlbGVjdEZpbGUoZmlsZSkpO1xuICAgIH0sXG4gICAgc2V0RmlsZUVycm9yOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKGNsZWFyRmlsZSgpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdmaWxlJywgdmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICcuLi8uLi9hY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMID0gJ0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0xJVEUgPSAnQVNTRVRfTElURSc7XG5leHBvcnQgY29uc3QgQVNTRVRfREVUQUlMUyA9ICdBU1NFVF9ERVRBSUxTJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBmaWxlUmVxdWVzdGVkIH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGVycm9yIGFuZCBzdGF0dXNcbiAgY29uc3QgZXJyb3IgID0gc2hvdy5kaXNwbGF5QXNzZXQuZXJyb3I7XG4gIGNvbnN0IHN0YXR1cyA9IHNob3cuZGlzcGxheUFzc2V0LnN0YXR1cztcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBlcnJvcixcbiAgICBzdGF0dXMsXG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25GaWxlUmVxdWVzdDogKG5hbWUsIGNsYWltSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKGZpbGVSZXF1ZXN0ZWQobmFtZSwgY2xhaW1JZCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpID0+IHtcbiAgLy8gdGFrZSB0aGUgaHRtbCBhbmQgcHJlbG9hZGVkU3RhdGUgYW5kIHJldHVybiB0aGUgZnVsbCBwYWdlXG4gIHJldHVybiBgXG4gICAgPCFET0NUWVBFIGh0bWw+XG4gICAgPGh0bWwgbGFuZz1cImVuXCIgcHJlZml4PVwib2c6IGh0dHA6Ly9vZ3AubWUvbnMjIGZiOiBodHRwOi8vb2dwLm1lL25zL2ZiI1wiPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MSwgdXNlci1zY2FsYWJsZT1ub1wiPlxuICAgICAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJpZT1lZGdlXCI+XG4gICAgICAgICAgICA8IS0taGVsbWV0LS0+XG4gICAgICAgICAgICAke2hlbG1ldC50aXRsZS50b1N0cmluZygpfVxuICAgICAgICAgICAgJHtoZWxtZXQubWV0YS50b1N0cmluZygpfVxuICAgICAgICAgICAgJHtoZWxtZXQubGluay50b1N0cmluZygpfVxuICAgICAgICAgICAgPCEtLXN0eWxlIHNoZWV0cy0tPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvc3RhdGljL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9zdGF0aWMvYXNzZXRzL2Nzcy9nZW5lcmFsLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvc3RhdGljL2Fzc2V0cy9jc3MvbWVkaWFRdWVyaWVzLmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPCEtLWdvb2dsZSBmb250LS0+XG4gICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzozMDBcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgICAgIDwvaGVhZD5cbiAgICAgICAgPGJvZHkgaWQ9XCJtYWluLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicmVhY3QtYXBwXCIgY2xhc3M9XCJyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW5cIj4ke2h0bWx9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzY3JpcHQ+XG4gICAgICAgICAgICAgICAgd2luZG93Ll9fUFJFTE9BREVEX1NUQVRFX18gPSAke0pTT04uc3RyaW5naWZ5KHByZWxvYWRlZFN0YXRlKS5yZXBsYWNlKC88L2csICdcXFxcXFx1MDAzYycpfVxuICAgICAgICAgICAgPC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cIi9zdGF0aWMvYnVuZGxlL2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICBgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBnZXRDbGFpbUlkLCBnZXRMb2NhbEZpbGVSZWNvcmQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCcuL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuY29uc3QgU0hPVyA9ICdTSE9XJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5mdW5jdGlvbiBjbGllbnRBY2NlcHRzSHRtbCAoe2FjY2VwdH0pIHtcbiAgcmV0dXJuIGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLyk7XG59O1xuXG5mdW5jdGlvbiByZXF1ZXN0SXNGcm9tQnJvd3NlciAoaGVhZGVycykge1xuICByZXR1cm4gaGVhZGVyc1sndXNlci1hZ2VudCddICYmIGhlYWRlcnNbJ3VzZXItYWdlbnQnXS5tYXRjaCgvTW96aWxsYS8pO1xufTtcblxuZnVuY3Rpb24gY2xpZW50V2FudHNBc3NldCAoe2FjY2VwdCwgcmFuZ2V9KSB7XG4gIGNvbnN0IGltYWdlSXNXYW50ZWQgPSBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC9pbWFnZVxcLy4qLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvXFwqLyk7XG4gIGNvbnN0IHZpZGVvSXNXYW50ZWQgPSBhY2NlcHQgJiYgcmFuZ2U7XG4gIHJldHVybiBpbWFnZUlzV2FudGVkIHx8IHZpZGVvSXNXYW50ZWQ7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2xhaW1JZCAoY2xhaW1JZCkge1xuICByZXR1cm4gKChjbGFpbUlkLmxlbmd0aCA9PT0gNDApICYmICEvW15BLVphLXowLTldL2cudGVzdChjbGFpbUlkKSk7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZCAoY2xhaW1JZCkge1xuICByZXR1cm4gY2xhaW1JZC5sZW5ndGggPT09IDE7ICAvLyBpdCBzaG91bGQgcmVhbGx5IGV2YWx1YXRlIHRoZSBzaG9ydCB1cmwgaXRzZWxmXG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCAoaW5wdXQpIHtcbiAgcmV0dXJuIChpc1ZhbGlkQ2xhaW1JZChpbnB1dCkgfHwgaXNWYWxpZFNob3J0SWQoaW5wdXQpKTtcbn07XG5cbmZ1bmN0aW9uIHNlcnZlQXNzZXRUb0NsaWVudCAoY2xhaW1JZCwgbmFtZSwgcmVzKSB7XG4gIHJldHVybiBnZXRMb2NhbEZpbGVSZWNvcmQoY2xhaW1JZCwgbmFtZSlcbiAgICAudGhlbihmaWxlUmVjb3JkID0+IHtcbiAgICAgIC8vIGNoZWNrIHRoYXQgYSBsb2NhbCByZWNvcmQgd2FzIGZvdW5kXG4gICAgICBpZiAoZmlsZVJlY29yZCA9PT0gTk9fRklMRSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygzMDcpLnJlZGlyZWN0KGAvYXBpL2NsYWltL2dldC8ke25hbWV9LyR7Y2xhaW1JZH1gKTtcbiAgICAgIH1cbiAgICAgIC8vIHNlcnZlIHRoZSBmaWxlXG4gICAgICBjb25zdCB7ZmlsZVBhdGgsIGZpbGVUeXBlfSA9IGZpbGVSZWNvcmQ7XG4gICAgICBsb2dnZXIudmVyYm9zZShgc2VydmluZyBmaWxlOiAke2ZpbGVQYXRofWApO1xuICAgICAgY29uc3Qgc2VuZEZpbGVPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgICAgICAgOiBmaWxlVHlwZSB8fCAnaW1hZ2UvanBlZycsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmRGaWxlKGZpbGVQYXRoLCBzZW5kRmlsZU9wdGlvbnMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpIHtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihmdWxsQ2xhaW1JZCA9PiB7XG4gICAgICAgIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2hhbm5lbCBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2ZUFzc2V0VG9DbGllbnQoZnVsbENsYWltSWQsIGNsYWltTmFtZSwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdzdWNjZXNzJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ2ZhaWwnKTtcbiAgICAgIH0pO1xuICB9LFxuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUgKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2VUeXBlO1xuICAgIGlmIChoYXNGaWxlRXh0ZW5zaW9uKSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTsgIC8vIGFzc3VtZSBhIHNlcnZlIHJlcXVlc3QgaWYgZmlsZSBleHRlbnNpb24gaXMgcHJlc2VudFxuICAgICAgaWYgKGNsaWVudEFjY2VwdHNIdG1sKGhlYWRlcnMpKSB7ICAvLyBpZiB0aGUgcmVxdWVzdCBjb21lcyBmcm9tIGEgYnJvd3NlciwgY2hhbmdlIGl0IHRvIGEgc2hvdyByZXF1ZXN0XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICBpZiAoY2xpZW50V2FudHNBc3NldChoZWFkZXJzKSAmJiByZXF1ZXN0SXNGcm9tQnJvd3NlcihoZWFkZXJzKSkgeyAgLy8gdGhpcyBpcyBpbiBjYXNlIHNvbWVvbmUgZW1iZWRzIGEgc2hvdyB1cmxcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdTaG93IHJlcXVlc3QgY2FtZSBmcm9tIGJyb3dzZXIgYnV0IHdhbnRzIGFuIGltYWdlL3ZpZGVvLiBDaGFuZ2luZyByZXNwb25zZSB0byBzZXJ2ZS4uLicpO1xuICAgICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlVHlwZTtcbiAgfSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSAoaWRlbnRpZmllciwgbmFtZSkge1xuICAgIC8vIHRoaXMgaXMgYSBwYXRjaCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCAnL25hbWUvY2xhaW1faWQnIHVybCBmb3JtYXRcbiAgICBpZiAoaXNWYWxpZFNob3J0SWRPckNsYWltSWQobmFtZSkgJiYgIWlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKGlkZW50aWZpZXIpKSB7XG4gICAgICBjb25zdCB0ZW1wTmFtZSA9IG5hbWU7XG4gICAgICBuYW1lID0gaWRlbnRpZmllcjtcbiAgICAgIGlkZW50aWZpZXIgPSB0ZW1wTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFtpZGVudGlmaWVyLCBuYW1lXTtcbiAgfSxcbiAgbG9nUmVxdWVzdERhdGEgKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZygncmVzcG9uc2VUeXBlID09PScsIHJlc3BvbnNlVHlwZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBuYW1lID09PSAnLCBjbGFpbU5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBuYW1lID09PScsIGNoYW5uZWxOYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIGlkID09PScsIGNsYWltSWQpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBpZGVudGlmaWVyOicsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHt2YWx1ZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciB1cmwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwgbmFtZSBhZnRlciBALicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltSWQsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG5hbWU6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgLicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yICR7bW9kaWZpZXJTZXBlcmF0b3J9LmApO1xuICAgICAgfVxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHttb2RpZmllclNlcGVyYXRvcn0gbW9kaWZpZXIgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZWApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VNb2RpZmllcjogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG1vZGlmaWVyOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb24gPSBmYWxzZTtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbixcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUmVkdWNlciBmcm9tICcuLi8uLi9jbGllbnQvcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXgnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi8uLi9jbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgaGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvc2FnYXMvc2hvd191cmknO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9hY3Rpb25zL3Nob3cnO1xuXG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHJldHVyblNhZ2FXaXRoUGFyYW1zID0gKHNhZ2EsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKiAoKSB7XG4gICAgeWllbGQgY2FsbChzYWdhLCBwYXJhbXMpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBvbkhhbmRsZVNob3dQYWdlVXJpKHJlcS5wYXJhbXMpO1xuICBjb25zdCBzYWdhID0gcmV0dXJuU2FnYVdpdGhQYXJhbXMoaGFuZGxlU2hvd1BhZ2VVcmksIGFjdGlvbik7XG5cbiAgLy8gcnVuIHRoZSBzYWdhIG1pZGRsZXdhcmVcbiAgc2FnYU1pZGRsZXdhcmVcbiAgICAucnVuKHNhZ2EpXG4gICAgLmRvbmVcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsImV4cG9ydCBjb25zdCBzZWxlY3RTaXRlU3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNpdGU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2l0ZUhvc3QgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNpdGUuaG9zdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2VsZWN0b3JzL3NpdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoYXR3Zy1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuL3NlcnZlcicpO1xuXG5jb25zdCBleHBvcnRzID0ge1xuICBTZXJ2ZXIsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcGVlY2guanMiLCIvLyBhcHAgZGVwZW5kZW5jaWVzXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCBleHByZXNzSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2V4cHJlc3MtaGFuZGxlYmFycycpO1xuY29uc3QgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hhbmRsZWJhcnMnKTtcbmNvbnN0IGhlbG1ldCA9IHJlcXVpcmUoJ2hlbG1ldCcpO1xuY29uc3QgY29va2llU2Vzc2lvbiA9IHJlcXVpcmUoJ2Nvb2tpZS1zZXNzaW9uJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgcmVxdWVzdExvZ2dlciA9IHJlcXVpcmUoJ21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcycpO1xuY29uc3QgUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGxvZ2dlckNvbmZpZyA9IHJlcXVpcmUoJ2xvZ2dlckNvbmZpZy5qcycpO1xuY29uc3QgbXlzcWxDb25maWcgPSByZXF1aXJlKCdteXNxbENvbmZpZy5qcycpO1xuY29uc3Qgc2l0ZUNvbmZpZyA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcbmNvbnN0IHNsYWNrQ29uZmlnID0gcmVxdWlyZSgnc2xhY2tDb25maWcuanMnKTtcblxuZnVuY3Rpb24gU2VydmVyICgpIHtcbiAgdGhpcy5jb25maWd1cmVMb2dnZXIgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIGxvZ2dlckNvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlTXlzcWwgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIG15c3FsQ29uZmlnLnVwZGF0ZSh1c2VyQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTaXRlRGV0YWlscyA9ICh1c2VyQ29uZmlnKSA9PiB7XG4gICAgc2l0ZUNvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2xhY2sgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNsYWNrQ29uZmlnLnVwZGF0ZSh1c2VyQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVDbGllbnRCdW5kbGUgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdjb25maWd1cmUgdGhlIGNsaWVudCBoZXJlIGJ5IHBhc3NpbmcgaW4gdGhlIGJ1bmRsZSBhbmQgY29uZmlndXJpbmcgaXQsIG9yIGJldHRlciB5ZXQ6IHRha2luZyBpbiB0aGUgY29tcG9uZW50cyB0byB1c2UgZHluYW1pY2FsbHkgZnJvbSBoZXJlLicpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZU1vZGVscyA9ICgpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ2hlcmUgaXMgd2hlcmUgeW91IGNvdWxkIGFkZC9vdmVyd3JpdGUgdGhlIGRlZmF1bHQgbW9kZWxzJylcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVSb3V0ZXMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdoZXJlIGlzIHdoZXJlIHlvdSBjb3VsZCBhZGQvb3ZlcndyaXRlIHRoZSBkZWZhdWx0IHJvdXRlcycpXG4gIH07XG4gIHRoaXMuY3JlYXRlQXBwID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBhbiBFeHByZXNzIGFwcGxpY2F0aW9uXG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gICAgLy8gdHJ1c3QgdGhlIHByb3h5IHRvIGdldCBpcCBhZGRyZXNzIGZvciB1c1xuICAgIGFwcC5lbmFibGUoJ3RydXN0IHByb3h5Jyk7XG5cbiAgICAvKiBhZGQgbWlkZGxld2FyZSAqL1xuICAgIC8vIHNldCBIVFRQIGhlYWRlcnMgdG8gcHJvdGVjdCBhZ2FpbnN0IHdlbGwta25vd24gd2ViIHZ1bG5lcmFiaWx0aWVzXG4gICAgYXBwLnVzZShoZWxtZXQoKSk7XG4gICAgLy8gJ2V4cHJlc3Muc3RhdGljJyB0byBzZXJ2ZSBzdGF0aWMgZmlsZXMgZnJvbSBwdWJsaWMgZGlyZWN0b3J5XG4gICAgaWYgKHNpdGVDb25maWcucm91dGVzLnB1YmxpY0ZvbGRlcikge1xuICAgICAgLy8gdGFrZSBpbiBhIGRpZmZlcmVudCBwdWJsaWMgZm9sZGVyLCBzbyBpdCBjYW4gc2VydmUgaXQncyBvd24gYnVuZGxlIGlmIG5lZWRlZFxuICAgICAgY29uc3QgcHVibGljRm9sZGVyID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHNpdGVDb25maWcucm91dGVzLnB1YmxpY0ZvbGRlcik7XG4gICAgICBhcHAudXNlKCcvc3RhdGljJywgZXhwcmVzcy5zdGF0aWMocHVibGljRm9sZGVyKSk7XG4gICAgICBsb2dnZXIuaW5mbygnc2VydmluZyBzdGF0aWMgZmlsZXMgZnJvbSBjdXN0b20gcGF0aDonLCBwdWJsaWNGb2xkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwdWJsaWNQYXRoID0gUGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xuICAgICAgYXBwLnVzZSgnL3N0YXRpYycsIGV4cHJlc3Muc3RhdGljKHB1YmxpY1BhdGgpKTtcbiAgICAgIGxvZ2dlci5pbmZvKCdzZXJ2aW5nIHN0YXRpYyBmaWxlcyBmcm9tIGRlZmF1bHQgcGF0aDonLCBwdWJsaWNQYXRoKTtcbiAgICB9O1xuICAgIC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24vanNvblxuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgIC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5cbiAgICAvLyBhZGQgY3VzdG9tIG1pZGRsZXdhcmUgKG5vdGU6IGJ1aWxkIG91dCB0byBhY2NlcHQgZHluYW1pY2FsbHkgdXNlIHdoYXQgaXMgaW4gc2VydmVyL21pZGRsZXdhcmUvXG4gICAgYXBwLnVzZShyZXF1ZXN0TG9nZ2VyKTtcblxuICAgIC8vIGNvbmZpZ3VyZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbiAgICAvLyBpbml0aWFsaXplIHBhc3Nwb3J0XG4gICAgY29uc3Qgc2Vzc2lvbktleSA9IHNpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5O1xuICAgIGFwcC51c2UoY29va2llU2Vzc2lvbih7XG4gICAgICBuYW1lICA6ICdzZXNzaW9uJyxcbiAgICAgIGtleXMgIDogW3Nlc3Npb25LZXldLFxuICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBpLmUuIDI0IGhvdXJzXG4gICAgfSkpO1xuICAgIGFwcC51c2Uoc3BlZWNoUGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgICAvLyBjb25maWd1cmUgaGFuZGxlYmFycyAmIHJlZ2lzdGVyIGl0IHdpdGggZXhwcmVzcyBhcHBcbiAgICBjb25zdCBoYnMgPSBleHByZXNzSGFuZGxlYmFycy5jcmVhdGUoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2VtYmVkJyxcbiAgICAgIGhhbmRsZWJhcnMgICA6IEhhbmRsZWJhcnMsXG4gICAgfSk7XG4gICAgYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGhicy5lbmdpbmUpO1xuICAgIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuICAgIC8vIHNldCB0aGUgcm91dGVzIG9uIHRoZSBhcHBcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hdXRoLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXBpLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvcGFnZXMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldHMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9mYWxsYmFjay8nKShhcHApO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gIH07XG4gIHRoaXMuaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmNyZWF0ZUFwcCgpO1xuICAgIHRoaXMuc2VydmVyID0gaHR0cC5TZXJ2ZXIodGhpcy5hcHApO1xuICB9O1xuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG4gICAgY29uc3QgUE9SVCA9IHNpdGVDb25maWcuZGV0YWlscy5wb3J0O1xuICAgIC8vIHN5bmMgc2VxdWVsaXplXG4gICAgZGIuc2VxdWVsaXplLnN5bmMoKVxuICAgIC8vIHN0YXJ0IHRoZSBzZXJ2ZXJcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBQT1JUICR7UE9SVH1gKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFN0YXJ0dXAgRXJyb3I6YCwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3QgcmVxdWVzdExvZ2dlciA9IChyZXEsIHJlcywgbmV4dCkgPT4geyAgLy8gY3VzdG9tIGxvZ2dpbmcgbWlkZGxld2FyZSB0byBsb2cgYWxsIGluY29taW5nIGh0dHAgcmVxdWVzdHNcbiAgbG9nZ2VyLnZlcmJvc2UoYFJlcXVlc3Qgb24gJHtyZXEub3JpZ2luYWxVcmx9IGZyb20gJHtyZXEuaXB9YCk7XG4gIG5leHQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWVzdExvZ2dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIExvZ2dlckNvbmZpZyAoKSB7XG4gIHRoaXMubG9nTGV2ZWwgPSAnZGVidWcnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdObyBsb2dnZXIgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBsb2dnZXIuaW5mbygnY29uZmlndXJpbmcgd2luc3RvbiBsb2dnZXIuLi4nKTtcbiAgICAvLyB1cGRhdGUgdmFsdWVzIHdpdGggbG9jYWwgY29uZmlnIHBhcmFtc1xuICAgIGNvbnN0IHtsb2dMZXZlbH0gPSBjb25maWc7XG4gICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xuICAgIC8vIGNvbmZpZ3VyZSB0aGUgd2luc3RvbiBsb2dnZXJcbiAgICBsb2dnZXIuY29uZmlndXJlKHtcbiAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IChsb2dnZXIudHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgICAgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5sb2dMZXZlbCxcbiAgICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICBjb2xvcml6ZSAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIHByZXR0eVByaW50ICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBodW1hblJlYWRhYmxlVW5oYW5kbGVkRXhjZXB0aW9uOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgLy8gdGVzdCBhbGwgdGhlIGxvZyBsZXZlbHNcbiAgICBsb2dnZXIuaW5mbygndGVzdGluZyB3aW5zdG9uIGxvZyBsZXZlbHMuLi4nKTtcbiAgICBsb2dnZXIuZXJyb3IoJ0xldmVsIDAnKTtcbiAgICBsb2dnZXIud2FybignTGV2ZWwgMScpO1xuICAgIGxvZ2dlci5pbmZvKCdMZXZlbCAyJyk7XG4gICAgbG9nZ2VyLnZlcmJvc2UoJ0xldmVsIDMnKTtcbiAgICBsb2dnZXIuZGVidWcoJ0xldmVsIDQnKTtcbiAgICBsb2dnZXIuc2lsbHkoJ0xldmVsIDUnKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IExvZ2dlckNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCB3aW5zdG9uID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gd2luc3Rvbi53YXJuKCdObyBzbGFjayBjb25maWcgcmVjZWl2ZWQnKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlc1xuICAgIHdpbnN0b24uaW5mbygnY29uZmlndXJpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICAgIC8vIHVwZGF0ZSBzbGFjayB3ZWJob29rIHNldHRpbmdzXG4gICAgaWYgKHRoaXMuc2xhY2tXZWJIb29rKSB7XG4gICAgICAvLyBhZGQgYSB0cmFuc3BvcnQgZm9yIGVycm9ycyB0byBzbGFja1xuICAgICAgaWYgKHRoaXMuc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1lcnJvcnMtdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2staW5mby10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrSW5mb0NoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlc1xuICAgICAgd2luc3Rvbi5pbmZvKCd0ZXN0aW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgICAgd2luc3Rvbi5pbmZvKCdTbGFjayBcImluZm9cIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tc2xhY2std2ViaG9va1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG5jb25zdCByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8gPSAodXNlckluc3RhbmNlKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgdXNlckluZm9bJ2lkJ10gPSB1c2VySW5zdGFuY2UuaWQ7XG4gICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSB1c2VySW5zdGFuY2UudXNlck5hbWU7XG4gICAgdXNlckluc3RhbmNlXG4gICAgICAuZ2V0Q2hhbm5lbCgpXG4gICAgICAudGhlbigoe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0pID0+IHtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQoY2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJlc29sdmUodXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICByZXR1cm4gZGIuVXNlclxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge3VzZXJOYW1lOiB1c2VybmFtZX0sXG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQocGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdQYXNzd29yZCB3YXMgYSBtYXRjaCwgcmV0dXJuaW5nIFVzZXInKTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8odXNlcilcbiAgICAgICAgICAgICAgLnRoZW4odXNlckluZm8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfSxcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBJTlRFR0VSLCBURVhULCBERUNJTUFMIH0pID0+IHtcbiAgY29uc3QgQ2VydGlmaWNhdGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDZXJ0aWZpY2F0ZScsXG4gICAge1xuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgYW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltU2VxdWVuY2U6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZWNvZGVkQ2xhaW06IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBkZXB0aDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGVmZmVjdGl2ZUFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoYXNTaWduYXR1cmU6IHtcbiAgICAgICAgdHlwZSAgIDogQk9PTEVBTixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBoZXg6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG5vdXQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0eGlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWxpZEF0SGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbHVlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGtleVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHB1YmxpY0tleToge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDZXJ0aWZpY2F0ZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2VydGlmaWNhdGUuYmVsb25nc1RvKGRiLkNoYW5uZWwsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGxvbmdDaGFubmVsSWQsIGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkICR7Y2hhbm5lbE5hbWV9OiR7bG9uZ0NoYW5uZWxJZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtuYW1lOiBjaGFubmVsTmFtZX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2hhbm5lbChzKSBmb3VuZCB3aXRoIHRoYXQgY2hhbm5lbCBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXR1cm5TaG9ydElkKHJlc3VsdCwgbG9uZ0NoYW5uZWxJZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBuYW1lICAgOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke2NoYW5uZWxDbGFpbUlkfSVgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5vdGUgcmVzdWx0cyBtdXN0IGJlIHNvcnRlZFxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUgPSBmdW5jdGlvbiAoY2hhbm5lbE5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUoJHtjaGFubmVsTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNoYW5uZWxOYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2VmZmVjdGl2ZUFtb3VudCcsICdERVNDJ10sIFsnaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHRbMF0uY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENlcnRpZmljYXRlLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGB2YWxpZGF0ZUxvbmdDaGFubmVsSWQoJHtuYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NoYW5uZWxJZCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0pYCk7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkICYmIChjaGFubmVsQ2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENsYWltSWQgJiYgY2hhbm5lbENsYWltSWQubGVuZ3RoIDwgNDApIHsgIC8vIGlmIGEgc2hvcnQgY2hhbm5lbCBpZCBpcyBwcm92aWRlZFxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKGNoYW5uZWxOYW1lKTsgIC8vIGlmIG5vIGNoYW5uZWwgaWQgcHJvdmlkZWRcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENlcnRpZmljYXRlO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HIH0pID0+IHtcbiAgY29uc3QgQ2hhbm5lbCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NoYW5uZWwnLFxuICAgIHtcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2hhbm5lbC5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2hhbm5lbC5iZWxvbmdzVG8oZGIuVXNlcik7XG4gICAgQ2hhbm5lbC5oYXNPbmUoZGIuQ2VydGlmaWNhdGUpO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVsO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgcmV0dXJuU2hvcnRJZCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXF1ZWxpemVIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGFzc2V0RGVmYXVsdHM6IHsgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsIH0sIGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIChjb250ZW50VHlwZSkge1xuICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIHJldHVybiAnanBlZyc7XG4gICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgIHJldHVybiAncG5nJztcbiAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgcmV0dXJuICdnaWYnO1xuICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICByZXR1cm4gJ21wNCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dlci5kZWJ1Zygnc2V0dGluZyB1bmtub3duIGZpbGUgdHlwZSBhcyBmaWxlIGV4dGVuc2lvbiBqcGVnJyk7XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVUaHVtYm5haWwgKHN0b3JlZFRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCkge1xuICBpZiAoc3RvcmVkVGh1bWJuYWlsID09PSAnJykge1xuICAgIHJldHVybiBkZWZhdWx0VGh1bWJuYWlsO1xuICB9XG4gIHJldHVybiBzdG9yZWRUaHVtYm5haWw7XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhaW1EYXRhIChjbGFpbSkge1xuICAvLyBsb2dnZXIuZGVidWcoJ3ByZXBhcmluZyBjbGFpbSBkYXRhIGJhc2VkIG9uIHJlc29sdmVkIGRhdGE6JywgY2xhaW0pO1xuICBjbGFpbVsndGh1bWJuYWlsJ10gPSBkZXRlcm1pbmVUaHVtYm5haWwoY2xhaW0udGh1bWJuYWlsLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICBjbGFpbVsnaG9zdCddID0gaG9zdDtcbiAgcmV0dXJuIGNsYWltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENsYWltID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2xhaW0nLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlSWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsaWNlbnNlVXJsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgcHJldmlldzoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbWV0YWRhdGFWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjb250ZW50VHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBzdHJlYW1WZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNoYW5uZWxOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENsYWltLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBDbGFpbS5iZWxvbmdzVG8oZGIuRmlsZSwge1xuICAgICAgZm9yZWlnbktleToge1xuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCBmb3IgJHtjbGFpbU5hbWV9IyR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZTogY2xhaW1OYW1lIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0ocykgZm91bmQgd2l0aCB0aGF0IGNsYWltIG5hbWUnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGNsYWltSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0uZ2V0QWxsQ2hhbm5lbENsYWltcyBmb3IgJHtjaGFubmVsQ2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgICByYXcgIDogdHJ1ZSwgIC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb25seSBkYXRhLCBub3QgYW4gYXJyYXkgb2YgaW5zdGFuY2VzXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWxDbGFpbXNBcnJheSA9PiB7XG4gICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdjaGFubmVsY2xhaW1zYXJyYXkgbGVuZ3RoOicsIGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbENsYWltc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGNoYW5uZWxDbGFpbXNBcnJheS5mb3JFYWNoKGNsYWltID0+IHtcbiAgICAgICAgICAgICAgICBjbGFpbVsnZmlsZUV4dCddID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZShjbGFpbS5jb250ZW50VHlwZSk7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYWltO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoY2hhbm5lbENsYWltc0FycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBmaW5kaW5nIGNsYWltIGlkIGZvciBjbGFpbSAke2NsYWltTmFtZX0gZnJvbSBjaGFubmVsICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSwgY2VydGlmaWNhdGVJZDogY2hhbm5lbENsYWltSWQgfSxcbiAgICAgICAgICBvcmRlcjogW1snaWQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGAke3Jlc3VsdC5sZW5ndGh9IHJlY29yZHMgZm91bmQgZm9yIFwiJHtjbGFpbU5hbWV9XCIgaW4gY2hhbm5lbCBcIiR7Y2hhbm5lbENsYWltSWR9XCJgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgc2hvcnRJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgICAgICAgJGxpa2U6IGAke3Nob3J0SWR9JWAsXG4gICAgICAgICAgICB9fSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sICAvLyBub3RlOiBtYXliZSBoZWlnaHQgYW5kIGVmZmVjdGl2ZSBhbW91bnQgbmVlZCB0byBzd2l0Y2g/XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdsZW5ndGggb2YgcmVzdWx0JywgcmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmRhdGFWYWx1ZXMuY2xhaW1JZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLnZhbGlkYXRlTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge25hbWUsIGNsYWltSWR9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKGNsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldExvbmdDbGFpbUlkID0gZnVuY3Rpb24gKGNsYWltTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0TG9uZ0NsYWltSWQoJHtjbGFpbU5hbWV9LCAke2NsYWltSWR9KWApO1xuICAgIGlmIChjbGFpbUlkICYmIChjbGFpbUlkLmxlbmd0aCA9PT0gNDApKSB7ICAvLyBpZiBhIGZ1bGwgY2xhaW0gaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlTG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNsYWltSWQgJiYgY2xhaW1JZC5sZW5ndGggPCA0MCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7ICAvLyBpZiBhIHNob3J0IGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUoY2xhaW1OYW1lKTsgIC8vIGlmIG5vIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIENsYWltLnJlc29sdmVDbGFpbSA9IGZ1bmN0aW9uIChuYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5yZXNvbHZlQ2xhaW06ICR7bmFtZX0gJHtjbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsYWltQXJyYXkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY2xhaW1BcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYG1vcmUgdGhhbiBvbmUgcmVjb3JkIG1hdGNoZXMgJHtuYW1lfSMke2NsYWltSWR9IGluIGRiLkNsYWltYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByZXBhcmVDbGFpbURhdGEoY2xhaW1BcnJheVswXS5kYXRhVmFsdWVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDbGFpbTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiB9KSA9PiB7XG4gIGNvbnN0IEZpbGUgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdGaWxlJyxcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGNsYWltSWQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBJTlRFR0VSLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0ICA6IDAsXG4gICAgICB9LFxuICAgICAgZmlsZU5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVBhdGg6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgZmlsZVR5cGU6IHtcbiAgICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIG5zZnc6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHRyZW5kaW5nRWxpZ2libGU6IHtcbiAgICAgICAgdHlwZSAgICAgICAgOiBCT09MRUFOLFxuICAgICAgICBhbGxvd051bGwgICA6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBGaWxlLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBGaWxlLmhhc01hbnkoZGIuUmVxdWVzdCk7XG4gICAgRmlsZS5oYXNPbmUoZGIuQ2xhaW0pO1xuICB9O1xuXG4gIEZpbGUuZ2V0UmVjZW50Q2xhaW1zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xuICAgICAgd2hlcmU6IHsgbnNmdzogZmFsc2UsIHRyZW5kaW5nRWxpZ2libGU6IHRydWUgfSxcbiAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcbiAgICAgIGxpbWl0OiAyNSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRmlsZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2ZpbGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIHsgU1RSSU5HLCBCT09MRUFOLCBURVhUIH0pID0+IHtcbiAgY29uc3QgUmVxdWVzdCA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ1JlcXVlc3QnLFxuICAgIHtcbiAgICAgIGFjdGlvbjoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB1cmw6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaXBBZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIHR5cGUgICAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBhbGxvd051bGw6IHRydWUsXG4gICAgICAgIGRlZmF1bHQgIDogbnVsbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFJlcXVlc3QuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFJlcXVlc3QuYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUmVxdWVzdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCIndXNlIHN0cmljdCc7XG5jb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IFVzZXIgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdVc2VyJyxcbiAgICB7XG4gICAgICB1c2VyTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIFVzZXIuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIFVzZXIuaGFzT25lKGRiLkNoYW5uZWwpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNvbXBhcmVQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG4gIH07XG5cbiAgVXNlci5wcm90b3R5cGUuY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAobmV3UGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaChuZXdQYXNzd29yZCwgc2FsdCwgKGhhc2hFcnJvciwgaGFzaCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yIHdpdGggdGhlIGhhc2ggZ2VuZXJhdGlvbiByZXR1cm4gdGhlIGVycm9yXG4gICAgICAgICAgaWYgKGhhc2hFcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdoYXNoIGVycm9yJywgaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBjdXJyZW50IHBhc3N3b3JkIHdpdGggdGhlIG5ldyBoYXNoXG4gICAgICAgICAgdGhpc1xuICAgICAgICAgICAgLnVwZGF0ZSh7cGFzc3dvcmQ6IGhhc2h9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIHByZS1zYXZlIGhvb2sgbWV0aG9kIHRvIGhhc2ggdGhlIHVzZXIncyBwYXNzd29yZCBiZWZvcmUgdGhlIHVzZXIncyBpbmZvIGlzIHNhdmVkIHRvIHRoZSBkYi5cbiAgVXNlci5ob29rKCdiZWZvcmVDcmVhdGUnLCAodXNlciwgb3B0aW9ucykgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnVXNlci5iZWZvcmVDcmVhdGUgaG9vay4uLicpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSBhIHNhbHQgc3RyaW5nIHRvIHVzZSBmb3IgaGFzaGluZ1xuICAgICAgYmNyeXB0LmdlblNhbHQoKHNhbHRFcnJvciwgc2FsdCkgPT4ge1xuICAgICAgICBpZiAoc2FsdEVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdzYWx0IGVycm9yJywgc2FsdEVycm9yKTtcbiAgICAgICAgICByZWplY3Qoc2FsdEVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBoYXNoZWQgdmVyc2lvbiBvZiB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgICAgIGJjcnlwdC5oYXNoKHVzZXIucGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgcGFzc3dvcmQgc3RyaW5nIHdpdGggdGhlIGhhc2ggcGFzc3dvcmQgdmFsdWVcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkID0gaGFzaDtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBVc2VyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvdXNlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJjcnlwdFwiXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYG5ldyBjaGFubmVsIHNpZ251cCByZXF1ZXN0LiB1c2VyOiAke3VzZXJuYW1lfSBwYXNzOiAke3Bhc3N3b3JkfSAuYCk7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgLy8gc2VydmVyLXNpZGUgdmFsaWRhdG9uIG9mIGlucHV0cyAodXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFubmVsIGFuZCByZXRyaWV2ZSB0aGUgbWV0YWRhdGFcbiAgICByZXR1cm4gbGJyeUFwaS5jcmVhdGVDaGFubmVsKGBAJHt1c2VybmFtZX1gKVxuICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgdXNlck5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXJEYXRhID4nLCB1c2VyRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCBjaGFubmVsRGF0YSA9IHtcbiAgICAgICAgICBjaGFubmVsTmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgY2hhbm5lbENsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2hhbm5lbERhdGEgPicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIGNlcnRpZmljYXRlIHJlY29yZFxuICAgICAgICBjb25zdCBjZXJ0aWZpY2F0ZURhdGEgPSB7XG4gICAgICAgICAgY2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgICAgbmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgLy8gYWRkcmVzcyxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NlcnRpZmljYXRlRGF0YSA+JywgY2VydGlmaWNhdGVEYXRhKTtcbiAgICAgICAgLy8gc2F2ZSB1c2VyIGFuZCBjZXJ0aWZpY2F0ZSB0byBkYlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLlVzZXIuY3JlYXRlKHVzZXJEYXRhKSwgZGIuQ2hhbm5lbC5jcmVhdGUoY2hhbm5lbERhdGEpLCBkYi5DZXJ0aWZpY2F0ZS5jcmVhdGUoY2VydGlmaWNhdGVEYXRhKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbbmV3VXNlciwgbmV3Q2hhbm5lbCwgbmV3Q2VydGlmaWNhdGVdKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAvLyBzdG9yZSB0aGUgcmVsZXZhbnQgbmV3VXNlciBpbmZvIHRvIGJlIHBhc3NlZCBiYWNrIGZvciByZXEuVXNlclxuICAgICAgICB1c2VySW5mb1snaWQnXSA9IG5ld1VzZXIuaWQ7XG4gICAgICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gbmV3VXNlci51c2VyTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIC8vIGFzc29jaWF0ZSB0aGUgaW5zdGFuY2VzXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbmV3Q2VydGlmaWNhdGUuc2V0Q2hhbm5lbChuZXdDaGFubmVsKSwgbmV3Q2hhbm5lbC5zZXRVc2VyKG5ld1VzZXIpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQodXNlckluZm8uY2hhbm5lbENsYWltSWQsIHVzZXJJbmZvLmNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ3NpZ251cCBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyByZXR1cm5zIHVzZXIgZGF0YSB0byBiZSBzZXJpYWxpemVkIGludG8gc2Vzc2lvblxuICAgIGNvbnNvbGUubG9nKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGNvbnNvbGUubG9nKCdkZXNlcmlhbGl6aW5nIHVzZXInKTtcbiAgICBkb25lKG51bGwsIHVzZXIpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzIiwiY29uc3Qgc3BlZWNoUGFzc3BvcnQgPSByZXF1aXJlKCdzcGVlY2hQYXNzcG9ydCcpO1xuY29uc3QgaGFuZGxlU2lnbnVwUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2lnbnVwJyk7XG5jb25zdCBoYW5kbGVMb2dpblJlcXVlc3QgPSByZXF1aXJlKCcuL2xvZ2luJyk7XG5jb25zdCBoYW5kbGVMb2dvdXRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dvdXQnKTtcbmNvbnN0IGhhbmRsZVVzZXJSZXF1ZXN0ID0gcmVxdWlyZSgnLi91c2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAucG9zdCgnL3NpZ251cCcsIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtc2lnbnVwJyksIGhhbmRsZVNpZ251cFJlcXVlc3QpO1xuICBhcHAucG9zdCgnL2xvZ2luJywgaGFuZGxlTG9naW5SZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2xvZ291dCcsIGhhbmRsZUxvZ291dFJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvdXNlcicsIGhhbmRsZVVzZXJSZXF1ZXN0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJjb25zdCBzaWdudXAgPSAocmVxLCByZXMpID0+IHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2lnbnVwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcblxuY29uc3QgbG9naW4gPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgc3BlZWNoUGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbC1sb2dpbicsIChlcnIsIHVzZXIsIGluZm8pID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gbmV4dChlcnIpO1xuICAgIH1cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxLmxvZ0luKHVzZXIsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pKHJlcSwgcmVzLCBuZXh0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW47XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJjb25zdCBsb2dvdXQgPSAocmVxLCByZXMpID0+IHtcbiAgcmVxLmxvZ291dCgpO1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3lvdSBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCd9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsImNvbnN0IHVzZXIgPSAocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS51c2VyKSB7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS51c2VyfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAndXNlciBpcyBub3QgbG9nZ2VkIGluJ30pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsImNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NoYW5uZWxBdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSByZXF1aXJlKCcuL2NoYW5uZWxDbGFpbXMnKTtcbmNvbnN0IGNoYW5uZWxEYXRhID0gcmVxdWlyZSgnLi9jaGFubmVsRGF0YScpO1xuY29uc3QgY2hhbm5lbFNob3J0SWQgPSByZXF1aXJlKCcuL2NoYW5uZWxTaG9ydElkJyk7XG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9IHJlcXVpcmUoJy4vY2xhaW1BdmFpbGFiaWxpdHknKTtcbmNvbnN0IGNsYWltRGF0YSA9IHJlcXVpcmUoJy4vY2xhaW1EYXRhJyk7XG5jb25zdCBjbGFpbUdldCA9IHJlcXVpcmUoJy4vY2xhaW1HZXQnKTtcbmNvbnN0IGNsYWltTG9uZ0lkID0gcmVxdWlyZSgnLi9jbGFpbUxvbmdJZCcpO1xuY29uc3QgY2xhaW1QdWJsaXNoID0gcmVxdWlyZSgnLi9jbGFpbVB1Ymxpc2gnKTtcbmNvbnN0IGNsYWltUmVzb2x2ZSA9IHJlcXVpcmUoJy4vY2xhaW1SZXNvbHZlJyk7XG5jb25zdCBjbGFpbVNob3J0SWQgPSByZXF1aXJlKCcuL2NsYWltU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1MaXN0ID0gcmVxdWlyZSgnLi9jbGFpbUxpc3QnKTtcbmNvbnN0IGZpbGVBdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2ZpbGVBdmFpbGFiaWxpdHknKTtcblxuY29uc3QgbXVsdGlwYXJ0TWlkZGxld2FyZSA9IHJlcXVpcmUoJ2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gY2hhbm5lbCByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS86bmFtZScsIGNoYW5uZWxBdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsIGNoYW5uZWxTaG9ydElkKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2RhdGEvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZCcsIGNoYW5uZWxEYXRhKTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2NsYWltcy86Y2hhbm5lbE5hbWUvOmNoYW5uZWxDbGFpbUlkLzpwYWdlJywgY2hhbm5lbENsYWltcyk7XG4gIC8vIGNsYWltIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2xpc3QvOm5hbWUnLCBjbGFpbUxpc3QpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2dldC86bmFtZS86Y2xhaW1JZCcsIGNsYWltR2V0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjbGFpbUF2YWlsYWJpbGl0eSk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vcmVzb2x2ZS86bmFtZS86Y2xhaW1JZCcsIGNsYWltUmVzb2x2ZSk7XG4gIGFwcC5wb3N0KCcvYXBpL2NsYWltL3B1Ymxpc2gnLCBtdWx0aXBhcnRNaWRkbGV3YXJlLCBjbGFpbVB1Ymxpc2gpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjbGFpbVNob3J0SWQpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9sb25nLWlkJywgY2xhaW1Mb25nSWQpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL2RhdGEvOmNsYWltTmFtZS86Y2xhaW1JZCcsIGNsYWltRGF0YSk7XG4gIC8vIGZpbGUgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvZmlsZS9hdmFpbGFiaWxpdHkvOm5hbWUvOmNsYWltSWQnLCBmaWxlQXZhaWxhYmlsaXR5KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsImNvbnN0IHsgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciBzaXRlIGhhcyBwdWJsaXNoZWQgdG8gYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxBdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5KG5hbWUpXG4gICAgLnRoZW4oYXZhaWxhYmxlTmFtZSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhdmFpbGFibGVOYW1lKTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbEF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxBdmFpbGFiaWxpdHkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgZ2V0Q2hhbm5lbENsYWltcyB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhbGwgY2xhaW1zIGZvciBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxDbGFpbXMgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgY29uc3QgcGFnZSA9IHBhcmFtcy5wYWdlO1xuICBnZXRDaGFubmVsQ2xhaW1zKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsQ2xhaW1zO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsImNvbnN0IENMQUlNU19QRVJfUEFHRSA9IDEyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2xhaW1zLCBwYWdlKSB7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsUGFnZXMoY2xhaW1zKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uUGFnZSA9IG1vZHVsZS5leHBvcnRzLmdldFBhZ2VGcm9tUXVlcnkocGFnZSk7XG4gICAgY29uc3Qgdmlld0RhdGEgPSB7XG4gICAgICBjaGFubmVsTmFtZSAgICAgICA6IGNoYW5uZWxOYW1lLFxuICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nQ2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbXMgICAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmV4dHJhY3RQYWdlRnJvbUNsYWltcyhjbGFpbXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHByZXZpb3VzUGFnZSAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lUHJldmlvdXNQYWdlKHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlICAgICAgIDogcGFnaW5hdGlvblBhZ2UsXG4gICAgICBuZXh0UGFnZSAgICAgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZU5leHRQYWdlKHRvdGFsUGFnZXMsIHBhZ2luYXRpb25QYWdlKSxcbiAgICAgIHRvdGFsUGFnZXMgICAgICAgIDogdG90YWxQYWdlcyxcbiAgICAgIHRvdGFsUmVzdWx0cyAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxDbGFpbXMoY2xhaW1zKSxcbiAgICB9O1xuICAgIHJldHVybiB2aWV3RGF0YTtcbiAgfSxcbiAgZ2V0UGFnZUZyb21RdWVyeSAocGFnZSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFnZSk7XG4gICAgfVxuICAgIHJldHVybiAxO1xuICB9LFxuICBleHRyYWN0UGFnZUZyb21DbGFpbXMgKGNsYWltcywgcGFnZU51bWJlcikge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gW107ICAvLyBpZiBubyBjbGFpbXMsIHJldHVybiB0aGlzIGRlZmF1bHRcbiAgICB9XG4gICAgLy8gbG9nZ2VyLmRlYnVnKCdjbGFpbXMgaXMgYXJyYXk/JywgQXJyYXkuaXNBcnJheShjbGFpbXMpKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoYHBhZ2VOdW1iZXIgJHtwYWdlTnVtYmVyfSBpcyBudW1iZXI/YCwgTnVtYmVyLmlzSW50ZWdlcihwYWdlTnVtYmVyKSk7XG4gICAgY29uc3QgY2xhaW1TdGFydEluZGV4ID0gKHBhZ2VOdW1iZXIgLSAxKSAqIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBjbGFpbUVuZEluZGV4ID0gY2xhaW1TdGFydEluZGV4ICsgQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IHBhZ2VPZkNsYWltcyA9IGNsYWltcy5zbGljZShjbGFpbVN0YXJ0SW5kZXgsIGNsYWltRW5kSW5kZXgpO1xuICAgIHJldHVybiBwYWdlT2ZDbGFpbXM7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsUGFnZXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG90YWxDbGFpbXMgPSBjbGFpbXMubGVuZ3RoO1xuICAgICAgaWYgKHRvdGFsQ2xhaW1zIDwgQ0xBSU1TX1BFUl9QQUdFKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgY29uc3QgZnVsbFBhZ2VzID0gTWF0aC5mbG9vcih0b3RhbENsYWltcyAvIENMQUlNU19QRVJfUEFHRSk7XG4gICAgICBjb25zdCByZW1haW5kZXIgPSB0b3RhbENsYWltcyAlIENMQUlNU19QRVJfUEFHRTtcbiAgICAgIGlmIChyZW1haW5kZXIgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZ1bGxQYWdlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdWxsUGFnZXMgKyAxO1xuICAgIH1cbiAgfSxcbiAgZGV0ZXJtaW5lUHJldmlvdXNQYWdlIChjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSAtIDE7XG4gIH0sXG4gIGRldGVybWluZU5leHRQYWdlICh0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSkge1xuICAgIGlmIChjdXJyZW50UGFnZSA9PT0gdG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50UGFnZSArIDE7XG4gIH0sXG4gIGRldGVybWluZVRvdGFsQ2xhaW1zIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBjbGFpbXMubGVuZ3RoO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwiY29uc3QgeyBnZXRDaGFubmVsRGF0YSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBkYXRhIGZvciBhIGNoYW5uZWxcblxuKi9cblxuY29uc3QgY2hhbm5lbERhdGEgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBwYXJhbXMuY2hhbm5lbE5hbWU7XG4gIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCAwKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxEYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbERhdGEuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxucm91dGUgdG8gZ2V0IGEgc2hvcnQgY2hhbm5lbCBpZCBmcm9tIGxvbmcgY2hhbm5lbCBJZFxuXG4qL1xuXG5jb25zdCBjaGFubmVsU2hvcnRJZFJvdXRlID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihzaG9ydElkKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxTaG9ydElkUm91dGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsImNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHRoaXMgc2l0ZSBwdWJsaXNoZWQgdG8gYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcmV0dXJuIGRhdGEgZm9yIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1EYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltTmFtZSA9IHBhcmFtcy5jbGFpbU5hbWU7XG4gIGxldCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGlmIChjbGFpbUlkID09PSAnbm9uZScpIGNsYWltSWQgPSBudWxsO1xuICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0oY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKGNsYWltSW5mbyA9PiB7XG4gICAgICBpZiAoIWNsYWltSW5mbykge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gY2xhaW0gY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogY2xhaW1JbmZvfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbURhdGE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbURhdGEuanMiLCJjb25zdCB7IGdldENsYWltIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEsIGNyZWF0ZUZpbGVEYXRhIH0gPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbUdldCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgLy8gcmVzb2x2ZSB0aGUgY2xhaW1cbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKG5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzb2x2ZVJlc3VsdCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgYSBjbGFpbSBhY3R1YWxseSBleGlzdHMgYXQgdGhhdCB1cmlcbiAgICAgIGlmICghcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1hdGNoaW5nIHVyaSBmb3VuZCBpbiBDbGFpbSB0YWJsZScpO1xuICAgICAgfVxuICAgICAgbGV0IGZpbGVEYXRhID0gY3JlYXRlRmlsZURhdGEocmVzb2x2ZVJlc3VsdCk7XG4gICAgICAvLyBnZXQgdGhlIGNsYWltXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGVEYXRhLCBnZXRDbGFpbShgJHtuYW1lfSMke2NsYWltSWR9YCldKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVEYXRhLCBnZXRSZXN1bHQgXSkgPT4ge1xuICAgICAgZmlsZURhdGEgPSBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YShmaWxlRGF0YSwgZ2V0UmVzdWx0KTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVEYXRhLCB7bmFtZSwgY2xhaW1JZH0sICdGaWxlJyksIGdldFJlc3VsdF0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFsgZmlsZVJlY29yZCwge21lc3NhZ2UsIGNvbXBsZXRlZH0gXSkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlLCBjb21wbGV0ZWQgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUdldDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltR2V0LmpzIiwiY29uc3QgeyBnZXRDbGFpbUlkIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgbG9uZyBjbGFpbSBpZFxuXG4qL1xuXG5jb25zdCBjbGFpbUxvbmdJZCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IGJvZHkuY2hhbm5lbE5hbWU7XG4gIGNvbnN0IGNoYW5uZWxDbGFpbUlkID0gYm9keS5jaGFubmVsQ2xhaW1JZDtcbiAgY29uc3QgY2xhaW1OYW1lID0gYm9keS5jbGFpbU5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBib2R5LmNsYWltSWQ7XG4gIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DTEFJTSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0fSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxvbmdJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTG9uZ0lkLmpzIiwiY29uc3QgeyBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMsIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5LCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgY2xhaW1OYW1lSXNBdmFpbGFibGUsIHB1Ymxpc2ggfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGF1dGhlbnRpY2F0ZVVzZXIgfSA9IHJlcXVpcmUoJ2F1dGgvYXV0aGVudGljYXRpb24uanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgeyBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHB1Ymxpc2ggYSBjbGFpbSB0aHJvdWdoIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1QdWJsaXNoID0gKHsgYm9keSwgZmlsZXMsIGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgdXNlciB9LCByZXMpID0+IHtcbiAgLy8gZGVmaW5lIHZhcmlhYmxlc1xuICBsZXQgIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgZGVzY3JpcHRpb24sIGZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBsaWNlbnNlLCBuYW1lLCBuc2Z3LCB0aHVtYm5haWwsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGUsIHRpdGxlO1xuICAvLyByZWNvcmQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlcXVlc3RcbiAgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAvLyB2YWxpZGF0ZSB0aGUgYm9keSBhbmQgZmlsZXMgb2YgdGhlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICAvLyB2YWxpZGF0ZUFwaVB1Ymxpc2hSZXF1ZXN0KGJvZHksIGZpbGVzKTtcbiAgICAoe25hbWUsIG5zZncsIGxpY2Vuc2UsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdGh1bWJuYWlsfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5KGJvZHkpKTtcbiAgICAoe2ZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGV9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzKGZpbGVzKSk7XG4gICAgKHtjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmR9ID0gYm9keSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGNoZWNrIGNoYW5uZWwgYXV0aG9yaXphdGlvblxuICBQcm9taXNlXG4gICAgLmFsbChbXG4gICAgICBhdXRoZW50aWNhdGVVc2VyKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlciksXG4gICAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKSxcbiAgICAgIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyhmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpLFxuICAgICAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyh0aHVtYm5haWxGaWxlUGF0aCwgbmFtZSwgbGljZW5zZSwgbnNmdyksXG4gICAgXSlcbiAgICAudGhlbigoW3tjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9LCB2YWxpZGF0ZWRDbGFpbU5hbWUsIHB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbFB1Ymxpc2hQYXJhbXNdKSA9PiB7XG4gICAgICAvLyBhZGQgY2hhbm5lbCBkZXRhaWxzIHRvIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfbmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHB1Ymxpc2hQYXJhbXNbJ2NoYW5uZWxfaWQnXSA9IGNoYW5uZWxDbGFpbUlkO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgdGh1bWJuYWlsXG4gICAgICBpZiAodGh1bWJuYWlsUHVibGlzaFBhcmFtcykge1xuICAgICAgICBwdWJsaXNoKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlVHlwZSk7XG4gICAgICB9XG4gICAgICAvLyBwdWJsaXNoIHRoZSBhc3NldFxuICAgICAgcmV0dXJuIHB1Ymxpc2gocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKTtcbiAgICB9KVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdwdWJsaXNoIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICBkYXRhICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjbGFpbUlkOiByZXN1bHQuY2xhaW1faWQsXG4gICAgICAgICAgdXJsICAgIDogYCR7aG9zdH0vJHtyZXN1bHQuY2xhaW1faWR9LyR7bmFtZX1gLFxuICAgICAgICAgIGxicnlUeCA6IHJlc3VsdCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgLy8gcmVjb3JkIHRoZSBwdWJsaXNoIGVuZCB0aW1lIGFuZCBzZW5kIHRvIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ3B1Ymxpc2gnLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1QdWJsaXNoO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1QdWJsaXNoLmpzIiwiY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhlbnRpY2F0ZVVzZXIgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlcikge1xuICAgIC8vIGNhc2U6IG5vIGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIChhbm9ueW1vdXMpLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXNlciB0b2tlbiBpcyBwcm92aWRlZFxuICAgIGlmICghY2hhbm5lbE5hbWUgJiYgIWNoYW5uZWxJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IG51bGwsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCB1c2VyIHRva2VuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsTmFtZSAhPT0gdXNlci5jaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIG5hbWUgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5uZWxJZCAmJiBjaGFubmVsSWQgIT09IHVzZXIuY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBpZCBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogdXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IHVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHBhc3N3b3JkIGluc3RlYWQgb2YgdXNlciB0b2tlblxuICAgIGlmICghY2hhbm5lbFBhc3N3b3JkKSB0aHJvdyBuZXcgRXJyb3IoJ25vIGNoYW5uZWwgcGFzc3dvcmQgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCk7XG4gIH0sXG4gIGF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgdXNlclBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGhvaXN0ZWQgdmFyaWFibGVzXG4gICAgICBsZXQgY2hhbm5lbERhdGE7XG4gICAgICAvLyBidWlsZCB0aGUgcGFyYW1zIGZvciBmaW5kaW5nIHRoZSBjaGFubmVsXG4gICAgICBsZXQgY2hhbm5lbEZpbmRQYXJhbXMgPSB7fTtcbiAgICAgIGlmIChjaGFubmVsTmFtZSkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgIGlmIChjaGFubmVsSWQpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbElkO1xuICAgICAgLy8gZmluZCB0aGUgY2hhbm5lbFxuICAgICAgZGIuQ2hhbm5lbFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IGNoYW5uZWxGaW5kUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gY2hhbm5lbCBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNoYW5uZWxEYXRhID0gY2hhbm5lbC5nZXQoKTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgZGF0YTonLCBjaGFubmVsRGF0YSk7XG4gICAgICAgICAgcmV0dXJuIGRiLlVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICB3aGVyZTogeyB1c2VyTmFtZTogY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDEpIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyB1c2VyIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHVzZXJQYXNzd29yZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoJy4uLnBhc3N3b3JkIHdhcyBhIG1hdGNoLi4uJyk7XG4gICAgICAgICAgcmVzb2x2ZShjaGFubmVsRGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJjb25zdCB7IHJlc29sdmVVcmkgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBydW4gYSByZXNvbHZlIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuXG4qL1xuXG5jb25zdCBjbGFpbVJlc29sdmUgPSAoeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgcmVzb2x2ZVVyaShgJHtwYXJhbXMubmFtZX0jJHtwYXJhbXMuY2xhaW1JZH1gKVxuICAgIC50aGVuKHJlc29sdmVkVXJpID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc29sdmVkVXJpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUmVzb2x2ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUmVzb2x2ZS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIHNob3J0IGNsYWltIGlkIGZyb20gbG9uZyBjbGFpbSBJZFxuXG4qL1xuXG5jb25zdCBjbGFpbVNob3J0SWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZGIuQ2xhaW0uZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHNob3J0SWR9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltU2hvcnRJZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1MaXN0IH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGxpc3Qgb2YgY2xhaW1zXG5cbiovXG5cbmNvbnN0IGNsYWltTGlzdCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBnZXRDbGFpbUxpc3QocGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oY2xhaW1zTGlzdCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjbGFpbXNMaXN0KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltTGlzdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltTGlzdC5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlZSBpZiBhc3NldCBpcyBhdmFpbGFibGUgbG9jYWxseVxuXG4qL1xuXG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBkYi5GaWxlXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY2xhaW1JZCxcbiAgICAgIH0sXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHRydWV9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBmYWxzZX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsZUF2YWlsYWJpbGl0eTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2ZpbGVBdmFpbGFiaWxpdHkuanMiLCJjb25zdCBtdWx0aXBhcnQgPSByZXF1aXJlKCdjb25uZWN0LW11bHRpcGFydHknKTtcclxuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHVwbG9hZERpcmVjdG9yeSB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XHJcbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSBtdWx0aXBhcnQoe3VwbG9hZERpcjogdXBsb2FkRGlyZWN0b3J5fSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGFydE1pZGRsZXdhcmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25uZWN0LW11bHRpcGFydHlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIlxuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGhhbmRsZVBhZ2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kUmVhY3RBcHAnKTtcbmNvbnN0IGhhbmRsZUVtYmVkUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZEVtYmVkUGFnZScpO1xuY29uc3QgcmVkaXJlY3QgPSByZXF1aXJlKCcuL3JlZGlyZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICBhcHAuZ2V0KCcvJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbG9naW4nLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9hYm91dCcsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3RyZW5kaW5nJywgcmVkaXJlY3QoJy9wb3B1bGFyJykpO1xuICBhcHAuZ2V0KCcvcG9wdWxhcicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL25ldycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2VtYmVkLzpjbGFpbUlkLzpuYW1lJywgaGFuZGxlRW1iZWRSZXF1ZXN0KTsgIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0dJTiB9IGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcyc7XG5jb25zdCB7IHB1Ymxpc2hpbmcgfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkaXNhYmxlZCAgICAgICAgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWQsXG4gIGRpc2FibGVkTWVzc2FnZSAgIDogcHVibGlzaGluZy5kaXNhYmxlZE1lc3NhZ2UsXG4gIHB1Ymxpc2hJbkNoYW5uZWwgIDogZmFsc2UsXG4gIHNlbGVjdGVkQ2hhbm5lbCAgIDogTE9HSU4sXG4gIHNob3dNZXRhZGF0YUlucHV0czogZmFsc2UsXG4gIHN0YXR1cyAgICAgICAgICAgIDoge1xuICAgIHN0YXR1cyA6IG51bGwsXG4gICAgbWVzc2FnZTogbnVsbCxcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICBmaWxlICAgICAgICAgOiBudWxsLFxuICAgIHVybCAgICAgICAgICA6IG51bGwsXG4gICAgY2hhbm5lbCAgICAgIDogbnVsbCxcbiAgICBwdWJsaXNoU3VibWl0OiBudWxsLFxuICB9LFxuICBmaWxlICAgIDogbnVsbCxcbiAgY2xhaW0gICA6ICcnLFxuICBtZXRhZGF0YToge1xuICAgIHRpdGxlICAgICAgOiAnJyxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgbGljZW5zZSAgICA6ICcnLFxuICAgIG5zZncgICAgICAgOiBmYWxzZSxcbiAgfSxcbiAgdGh1bWJuYWlsOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5GSUxFX1NFTEVDVEVEOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGluaXRpYWxTdGF0ZSwgeyAgLy8gbm90ZTogY2xlYXJzIHRvIGluaXRpYWwgc3RhdGVcbiAgICAgICAgZmlsZTogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9DTEVBUjpcbiAgICAgIHJldHVybiBpbml0aWFsU3RhdGU7XG4gICAgY2FzZSBhY3Rpb25zLk1FVEFEQVRBX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBtZXRhZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubWV0YWRhdGEsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5DTEFJTV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2xhaW06IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUw6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcHVibGlzaEluQ2hhbm5lbDogYWN0aW9uLmNoYW5uZWwsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUFVCTElTSF9TVEFUVVNfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRVJST1JfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGVycm9yOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5lcnJvciwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5uYW1lXTogYWN0aW9uLmRhdGEudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHNlbGVjdGVkQ2hhbm5lbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzaG93TWV0YWRhdGFJbnB1dHM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRIVU1CTkFJTF9ORVc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgdGh1bWJuYWlsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxvZ2dlZEluQ2hhbm5lbDoge1xuICAgIG5hbWUgICA6IG51bGwsXG4gICAgc2hvcnRJZDogbnVsbCxcbiAgICBsb25nSWQgOiBudWxsLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnZWRJbkNoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2NoYW5uZWwuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0NBTF9DSEVDSywgRVJST1IgfSBmcm9tICdjb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHJlcXVlc3Q6IHtcbiAgICBlcnJvcjogbnVsbCxcbiAgICB0eXBlIDogbnVsbCxcbiAgICBpZCAgIDogbnVsbCxcbiAgfSxcbiAgcmVxdWVzdExpc3QgOiB7fSxcbiAgY2hhbm5lbExpc3QgOiB7fSxcbiAgYXNzZXRMaXN0ICAgOiB7fSxcbiAgZGlzcGxheUFzc2V0OiB7XG4gICAgZXJyb3IgOiBudWxsLFxuICAgIHN0YXR1czogTE9DQUxfQ0hFQ0ssXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgLy8gaGFuZGxlIHJlcXVlc3RcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9FUlJPUjpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0LCB7XG4gICAgICAgICAgZXJyb3I6IGFjdGlvbi5kYXRhLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0LCB7XG4gICAgICAgICAgdHlwZTogYWN0aW9uLmRhdGEucmVxdWVzdFR5cGUsXG4gICAgICAgICAgaWQgIDogYWN0aW9uLmRhdGEucmVxdWVzdElkLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIHN0b3JlIHJlcXVlc3RzXG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3RMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgZXJyb3I6IGFjdGlvbi5kYXRhLmVycm9yLFxuICAgICAgICAgICAga2V5ICA6IGFjdGlvbi5kYXRhLmtleSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGFzc2V0IGRhdGFcbiAgICBjYXNlIGFjdGlvbnMuQVNTRVRfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGFzc2V0TGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXNzZXRMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgZXJyb3IgICAgOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIG5hbWUgICAgIDogYWN0aW9uLmRhdGEubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgIDogYWN0aW9uLmRhdGEuY2xhaW1JZCxcbiAgICAgICAgICAgIHNob3J0SWQgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1EYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gY2hhbm5lbCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNoYW5uZWxMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIG5hbWUgICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBsb25nSWQgICAgOiBhY3Rpb24uZGF0YS5sb25nSWQsXG4gICAgICAgICAgICBzaG9ydElkICAgOiBhY3Rpb24uZGF0YS5zaG9ydElkLFxuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuY2hhbm5lbExpc3RJZF06IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0W2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdLCB7XG4gICAgICAgICAgICBjbGFpbXNEYXRhOiBhY3Rpb24uZGF0YS5jbGFpbXNEYXRhLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGRpc3BsYXkgYW4gYXNzZXRcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlBc3NldDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGlzcGxheUFzc2V0LCB7XG4gICAgICAgICAgc3RhdHVzOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRElTUExBWV9BU1NFVF9FUlJPUjpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIGVycm9yIDogYWN0aW9uLmRhdGEsXG4gICAgICAgICAgc3RhdHVzOiBFUlJPUixcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvc2hvdy5qcyIsImNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IHtcbiAgYW5hbHl0aWNzOiB7XG4gICAgZ29vZ2xlSWQ6IGdvb2dsZUFuYWx5dGljc0lkLFxuICB9LFxuICBhc3NldERlZmF1bHRzOiB7XG4gICAgdGh1bWJuYWlsOiBkZWZhdWx0VGh1bWJuYWlsLFxuICAgIGRlc2NyaXB0aW9uOiBkZWZhdWx0RGVzY3JpcHRpb24sXG4gIH0sXG4gIGRldGFpbHM6IHtcbiAgICBkZXNjcmlwdGlvbixcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICAgIHR3aXR0ZXIsXG4gIH0sXG59ID0gc2l0ZUNvbmZpZztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkZXNjcmlwdGlvbixcbiAgZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIGhvc3QsXG4gIHRpdGxlLFxuICB0d2l0dGVyLFxuICBkZWZhdWx0RGVzY3JpcHRpb24sXG4gIGRlZmF1bHRUaHVtYm5haWwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1nYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWdhXCJcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBQdWJsaXNoVG9vbCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hUb29sJztcblxuY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbid9PlxuICAgICAgICA8U0VPIC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nfT5cbiAgICAgICAgICA8UHVibGlzaFRvb2wgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Ib21lUGFnZS9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgY3JlYXRlUGFnZVRpdGxlIH0gZnJvbSAndXRpbHMvcGFnZVRpdGxlJztcbmltcG9ydCB7IGNyZWF0ZU1ldGFUYWdzIH0gZnJvbSAndXRpbHMvbWV0YVRhZ3MnO1xuaW1wb3J0IHsgY3JlYXRlQ2Fub25pY2FsTGluayB9IGZyb20gJ3V0aWxzL2Nhbm9uaWNhbExpbmsnO1xuXG5jbGFzcyBTRU8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIC8vIHByb3BzIGZyb20gc3RhdGVcbiAgICBjb25zdCB7IGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBwcm9wcyBmcm9tIHBhcmVudFxuICAgIGNvbnN0IHsgYXNzZXQsIGNoYW5uZWwsIHBhZ2VVcmkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHsgcGFnZVRpdGxlIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNyZWF0ZSBwYWdlIHRpdGxlLCB0YWdzLCBhbmQgY2Fub25pY2FsIGxpbmtcbiAgICBwYWdlVGl0bGUgPSBjcmVhdGVQYWdlVGl0bGUoc2l0ZVRpdGxlLCBwYWdlVGl0bGUpO1xuICAgIGNvbnN0IG1ldGFUYWdzID0gY3JlYXRlTWV0YVRhZ3Moc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gICAgY29uc3QgY2Fub25pY2FsTGluayA9IGNyZWF0ZUNhbm9uaWNhbExpbmsoYXNzZXQsIGNoYW5uZWwsIHBhZ2VVcmksIHNpdGVIb3N0KTtcbiAgICAvLyByZW5kZXIgcmVzdWx0c1xuICAgIHJldHVybiAoXG4gICAgICA8SGVsbWV0XG4gICAgICAgIHRpdGxlPXtwYWdlVGl0bGV9XG4gICAgICAgIG1ldGE9e21ldGFUYWdzfVxuICAgICAgICBsaW5rPXtbe3JlbDogJ2Nhbm9uaWNhbCcsIGhyZWY6IGNhbm9uaWNhbExpbmt9XX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcblxuU0VPLnByb3BUeXBlcyA9IHtcbiAgcGFnZVRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwYWdlVXJpICA6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoYW5uZWwgIDogUHJvcFR5cGVzLm9iamVjdCxcbiAgYXNzZXQgICAgOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU0VPO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvU0VPL3ZpZXcuanN4IiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVBhZ2VUaXRsZSA9IChzaXRlVGl0bGUsIHBhZ2VUaXRsZSkgPT4ge1xuICBpZiAoIXBhZ2VUaXRsZSkge1xuICAgIHJldHVybiBgJHtzaXRlVGl0bGV9YDtcbiAgfVxuICByZXR1cm4gYCR7c2l0ZVRpdGxlfSAtICR7cGFnZVRpdGxlfWA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3BhZ2VUaXRsZS5qcyIsImNvbnN0IGRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSAodGh1bWJuYWlsKSA9PiB7XG4gIGlmICh0aHVtYm5haWwpIHtcbiAgICBjb25zdCBmaWxlRXh0ID0gdGh1bWJuYWlsLnN1YnN0cmluZyh0aHVtYm5haWwubGFzdEluZGV4T2YoJy4nKSk7XG4gICAgc3dpdGNoIChmaWxlRXh0KSB7XG4gICAgICBjYXNlICdqcGVnJzpcbiAgICAgIGNhc2UgJ2pwZyc6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvanBlZyc7XG4gICAgICBjYXNlICdwbmcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL3BuZyc7XG4gICAgICBjYXNlICdnaWYnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2dpZic7XG4gICAgICBjYXNlICdtcDQnOlxuICAgICAgICByZXR1cm4gJ3ZpZGVvL21wNCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59O1xuXG5jb25zdCBjcmVhdGVCYXNpY01ldGFUYWdzID0gKHNpdGVIb3N0LCBzaXRlRGVzY3JpcHRpb24sIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogc2l0ZUhvc3R9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBzaXRlRGVzY3JpcHRpb259LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQ2hhbm5lbE1ldGFUYWdzID0gKHNpdGVUaXRsZSwgc2l0ZUhvc3QsIHNpdGVUd2l0dGVyLCBjaGFubmVsKSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogYCR7bmFtZX0gb24gJHtzaXRlVGl0bGV9YH0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IGAke25hbWV9LCBhIGNoYW5uZWwgb24gJHtzaXRlVGl0bGV9YH0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5J30sXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldE1ldGFUYWdzID0gKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKSA9PiB7XG4gIGNvbnN0IHsgY2xhaW1EYXRhIH0gPSBhc3NldDtcbiAgY29uc3QgeyBjb250ZW50VHlwZSB9ID0gY2xhaW1EYXRhO1xuICBjb25zdCBlbWJlZFVybCA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfWA7XG4gIGNvbnN0IHNob3dVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzb3VyY2UgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX0uJHtjbGFpbURhdGEuZmlsZUV4dH1gO1xuICBjb25zdCBvZ1RpdGxlID0gY2xhaW1EYXRhLnRpdGxlIHx8IGNsYWltRGF0YS5uYW1lO1xuICBjb25zdCBvZ0Rlc2NyaXB0aW9uID0gY2xhaW1EYXRhLmRlc2NyaXB0aW9uIHx8IGRlZmF1bHREZXNjcmlwdGlvbjtcbiAgY29uc3Qgb2dUaHVtYm5haWxDb250ZW50VHlwZSA9IGRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUoY2xhaW1EYXRhLnRodW1ibmFpbCk7XG4gIGNvbnN0IG9nVGh1bWJuYWlsID0gY2xhaW1EYXRhLnRodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsO1xuICBjb25zdCBtZXRhVGFncyA9IFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IG9nVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNob3dVcmx9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBvZ0Rlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICdvZzppbWFnZTp3aWR0aCcsIGNvbnRlbnQ6IDYwMH0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6aGVpZ2h0JywgY29udGVudDogMzE1fSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gIF07XG4gIGlmIChjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL21wNCcgfHwgY29udGVudFR5cGUgPT09ICd2aWRlby93ZWJtJykge1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW8nLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvOnNlY3VyZV91cmwnLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvOnR5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBvZ1RodW1ibmFpbH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IG9nVGh1bWJuYWlsQ29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAndmlkZW8nfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAncGxheWVyJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXInLCBjb250ZW50OiBlbWJlZFVybH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6d2lkdGgnLCBjb250ZW50OiA2MDB9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6dGV4dDpwbGF5ZXJfd2lkdGgnLCBjb250ZW50OiA2MDB9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOmhlaWdodCcsIGNvbnRlbnQ6IDMzN30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpzdHJlYW06Y29udGVudF90eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgfSBlbHNlIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZTp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAnYXJ0aWNsZSd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5X2xhcmdlX2ltYWdlJ30pO1xuICB9XG4gIHJldHVybiBtZXRhVGFncztcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNZXRhVGFncyA9IChzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgY2hhbm5lbCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKSA9PiB7XG4gIGlmIChhc3NldCkge1xuICAgIHJldHVybiBjcmVhdGVBc3NldE1ldGFUYWdzKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBhc3NldCwgZGVmYXVsdERlc2NyaXB0aW9uLCBkZWZhdWx0VGh1bWJuYWlsKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbE1ldGFUYWdzKHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyLCBjaGFubmVsKTtcbiAgfTtcbiAgcmV0dXJuIGNyZWF0ZUJhc2ljTWV0YVRhZ3Moc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlcik7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL21ldGFUYWdzLmpzIiwiY29uc3QgY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rID0gKHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtwYWdlfWA7XG59O1xuXG5jb25zdCBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsgPSAoYXNzZXQsIHNpdGVIb3N0KSA9PiB7XG4gIGxldCBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZDtcbiAgaWYgKGFzc2V0LmNsYWltRGF0YSkge1xuICAgICh7IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGEpO1xuICB9O1xuICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2hhbm5lbE5hbWV9OiR7Y2VydGlmaWNhdGVJZH0vJHtuYW1lfWA7XG4gIH07XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rID0gKGNoYW5uZWwsIHNpdGVIb3N0KSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgbG9uZ0lkIH0gPSBjaGFubmVsO1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7bmFtZX06JHtsb25nSWR9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBjaGFubmVsLCBwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rKGFzc2V0LCBzaXRlSG9zdCk7XG4gIH1cbiAgaWYgKGNoYW5uZWwpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsoY2hhbm5lbCwgc2l0ZUhvc3QpO1xuICB9XG4gIHJldHVybiBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsocGFnZSwgc2l0ZUhvc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9jYW5vbmljYWxMaW5rLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5hdkxpbmssIHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBMb2dvIGZyb20gJ2NvbXBvbmVudHMvTG9nbyc7XG5pbXBvcnQgTmF2QmFyQ2hhbm5lbERyb3Bkb3duIGZyb20gJ2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bic7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY29uc3QgVklFVyA9ICdWSUVXJztcbmNvbnN0IExPR09VVCA9ICdMT0dPVVQnO1xuXG5jbGFzcyBOYXZCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlciA9IHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ291dFVzZXIgPSB0aGlzLmxvZ291dFVzZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbiA9IHRoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgdXNlciBpcyBhbHJlYWR5IGxvZ2dlZCBpblxuICAgIHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIoKTtcbiAgfVxuICBjaGVja0ZvckxvZ2dlZEluVXNlciAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9O1xuICAgIHJlcXVlc3QoJy91c2VyJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oZGF0YS5jaGFubmVsTmFtZSwgZGF0YS5zaG9ydENoYW5uZWxJZCwgZGF0YS5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJy91c2VyIGVycm9yOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgbG9nb3V0VXNlciAoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9O1xuICAgIHJlcXVlc3QoJy9sb2dvdXQnLCBwYXJhbXMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9nb3V0KCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJy9sb2dvdXQgZXJyb3InLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIGhhbmRsZVNlbGVjdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSBMT0dPVVQ6XG4gICAgICAgIHRoaXMubG9nb3V0VXNlcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVklFVzpcbiAgICAgICAgLy8gcmVkaXJlY3QgdG8gY2hhbm5lbCBwYWdlXG4gICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5wdXNoKGAvJHt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfToke3RoaXMucHJvcHMuY2hhbm5lbExvbmdJZH1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHNpdGVEZXNjcmlwdGlvbiB9ID0gIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIG5hdi1iYXInPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tc2hvcnQgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1jZW50ZXInPlxuICAgICAgICAgIDxMb2dvIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdi1iYXItLWNlbnRlcic+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J25hdi1iYXItdGFnbGluZSc+e3NpdGVEZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdi1iYXItLXJpZ2h0Jz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nLycgZXhhY3Q+UHVibGlzaDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy9hYm91dCc+QWJvdXQ8L05hdkxpbms+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hhbm5lbE5hbWUgPyAoXG4gICAgICAgICAgICAgIDxOYXZCYXJDaGFubmVsRHJvcGRvd25cbiAgICAgICAgICAgICAgICBjaGFubmVsTmFtZT17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3Rpb249e3RoaXMuaGFuZGxlU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3Rpb249e3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9XG4gICAgICAgICAgICAgICAgVklFVz17VklFV31cbiAgICAgICAgICAgICAgICBMT0dPVVQ9e0xPR09VVH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxOYXZMaW5rIGlkPSduYXYtYmFyLWxvZ2luLWxpbmsnIGNsYXNzTmFtZT0nbmF2LWJhci1saW5rIGxpbmstLW5hdicgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2xvZ2luJz5DaGFubmVsPC9OYXZMaW5rPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTmF2QmFyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmZ1bmN0aW9uIExvZ28gKCkge1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmVyc2lvbj0nMS4xJyBpZD0nTGF5ZXJfMScgeD0nMHB4JyB5PScwcHgnIGhlaWdodD0nMjRweCcgdmlld0JveD0nMCAwIDgwIDMxJyBlbmFibGVCYWNrZ3JvdW5kPSduZXcgMCAwIDgwIDMxJyBjbGFzc05hbWU9J25hdi1iYXItbG9nbyc+XG4gICAgICA8TGluayB0bz0nLyc+XG4gICAgICAgIDx0aXRsZT5Mb2dvPC90aXRsZT5cbiAgICAgICAgPGRlc2M+U3BlZS5jaCBsb2dvPC9kZXNjPlxuICAgICAgICA8ZyBpZD0nQWJvdXQnPlxuICAgICAgICAgIDxnIGlkPSdQdWJsaXNoLUZvcm0tVjItX3gyOF9maWxsZWRfeDI5XycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTQyLjAwMDAwMCwgLTIzLjAwMDAwMCknPlxuICAgICAgICAgICAgPGcgaWQ9J0dyb3VwLTE3JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg0Mi4wMDAwMDAsIDIyLjAwMDAwMCknPlxuICAgICAgICAgICAgICA8dGV4dCB0cmFuc2Zvcm09J21hdHJpeCgxIDAgMCAxIDAgMjApJyBmb250U2l6ZT0nMjUnIGZvbnRGYW1pbHk9J1JvYm90byc+U3BlZSZsdDtoPC90ZXh0PlxuICAgICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTYnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAzMC4wMDAwMDApJz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04JyBmaWxsPSdub25lJyBzdHJva2U9JyMwOUY5MTEnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00wLjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weScgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDI5RDc0JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMTYuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTInIGZpbGw9J25vbmUnIHN0cm9rZT0nI0UzNUJEOCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTMyLjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS0zJyBmaWxsPSdub25lJyBzdHJva2U9JyM0MTU2QzUnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J000OC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjNjM1Njg4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNNjQuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvTGluaz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ287XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Mb2dvL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIE5hdkJhckNoYW5uZWxEcm9wZG93biAoeyBjaGFubmVsTmFtZSwgaGFuZGxlU2VsZWN0aW9uLCBkZWZhdWx0U2VsZWN0aW9uLCBWSUVXLCBMT0dPVVQgfSkge1xuICByZXR1cm4gKFxuICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tYXJyb3cgbGluay0tbmF2JyBvbkNoYW5nZT17aGFuZGxlU2VsZWN0aW9ufSB2YWx1ZT17ZGVmYXVsdFNlbGVjdGlvbn0+XG4gICAgICA8b3B0aW9uIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0LWNoYW5uZWwtb3B0aW9uJz57Y2hhbm5lbE5hbWV9PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPXtWSUVXfT5WaWV3PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPXtMT0dPVVR9PkxvZ291dDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2QmFyQ2hhbm5lbERyb3Bkb3duO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRpc2FibGVkOiBwdWJsaXNoLmRpc2FibGVkLFxuICAgIGZpbGUgICAgOiBwdWJsaXNoLmZpbGUsXG4gICAgc3RhdHVzICA6IHB1Ymxpc2guc3RhdHVzLnN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUb29sL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBEcm9wem9uZSBmcm9tICdjb250YWluZXJzL0Ryb3B6b25lJztcbmltcG9ydCBQdWJsaXNoRGV0YWlscyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzJztcbmltcG9ydCBQdWJsaXNoU3RhdHVzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cyc7XG5pbXBvcnQgUHVibGlzaERpc2FibGVkTWVzc2FnZSBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UnO1xuXG5jbGFzcyBQdWJsaXNoVG9vbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwdWJsaXNoIGlzIGRpc2FibGVkJyk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UHVibGlzaERpc2FibGVkTWVzc2FnZSAvPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ3B1Ymxpc2ggaXMgbm90IGRpc2FibGVkJyk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0YXR1cykge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UHVibGlzaFN0YXR1cyAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDxQdWJsaXNoRGV0YWlscyAvPjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIDxEcm9wem9uZSAvPjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUb29sO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdmFsaWRhdGVGaWxlIH0gZnJvbSAndXRpbHMvZmlsZSc7XG5pbXBvcnQgUHVibGlzaFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9QdWJsaXNoUHJldmlldyc7XG5cbmNsYXNzIERyb3B6b25lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcmFnT3ZlciAgOiBmYWxzZSxcbiAgICAgIG1vdXNlT3ZlciA6IGZhbHNlLFxuICAgICAgZGltUHJldmlldzogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZURyb3AgPSB0aGlzLmhhbmRsZURyb3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdPdmVyID0gdGhpcy5oYW5kbGVEcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0VudGVyID0gdGhpcy5oYW5kbGVEcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdMZWF2ZSA9IHRoaXMuaGFuZGxlRHJhZ0xlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUVudGVyID0gdGhpcy5oYW5kbGVNb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUxlYXZlID0gdGhpcy5oYW5kbGVNb3VzZUxlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVJbnB1dCA9IHRoaXMuaGFuZGxlRmlsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jaG9vc2VGaWxlID0gdGhpcy5jaG9vc2VGaWxlLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiBmYWxzZX0pO1xuICAgIC8vIGlmIGRyb3BwZWQgaXRlbXMgYXJlbid0IGZpbGVzLCByZWplY3QgdGhlbVxuICAgIGNvbnN0IGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgIGlmIChkdC5pdGVtcykge1xuICAgICAgaWYgKGR0Lml0ZW1zWzBdLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICBjb25zdCBkcm9wcGVkRmlsZSA9IGR0Lml0ZW1zWzBdLmdldEFzRmlsZSgpO1xuICAgICAgICB0aGlzLmNob29zZUZpbGUoZHJvcHBlZEZpbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnT3ZlciAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGhhbmRsZURyYWdFbmQgKGV2ZW50KSB7XG4gICAgdmFyIGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgIGlmIChkdC5pdGVtcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkdC5pdGVtcy5yZW1vdmUoaSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5jbGVhckRhdGEoKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZ0VudGVyICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogdHJ1ZSwgZGltUHJldmlldzogdHJ1ZX0pO1xuICB9XG4gIGhhbmRsZURyYWdMZWF2ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IGZhbHNlLCBkaW1QcmV2aWV3OiBmYWxzZX0pO1xuICB9XG4gIGhhbmRsZU1vdXNlRW50ZXIgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogdHJ1ZSwgZGltUHJldmlldzogdHJ1ZX0pO1xuICB9XG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogZmFsc2UsIGRpbVByZXZpZXc6IGZhbHNlfSk7XG4gIH1cbiAgaGFuZGxlQ2xpY2sgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZV9pbnB1dCcpLmNsaWNrKCk7XG4gIH1cbiAgaGFuZGxlRmlsZUlucHV0IChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZmlsZUxpc3QgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgdGhpcy5jaG9vc2VGaWxlKGZpbGVMaXN0WzBdKTtcbiAgfVxuICBjaG9vc2VGaWxlIChmaWxlKSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbGlkYXRlRmlsZShmaWxlKTsgLy8gdmFsaWRhdGUgdGhlIGZpbGUncyBuYW1lLCB0eXBlLCBhbmQgc2l6ZVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2V0RmlsZUVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgLy8gc3RhZ2UgaXQgc28gaXQgd2lsbCBiZSByZWFkeSB3aGVuIHRoZSBwdWJsaXNoIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdEZpbGUoZmlsZSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dC1maWxlJyB0eXBlPSdmaWxlJyBpZD0nZmlsZV9pbnB1dCcgbmFtZT0nZmlsZV9pbnB1dCcgYWNjZXB0PSd2aWRlby8qLGltYWdlLyonIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUZpbGVJbnB1dH0gZW5jVHlwZT0nbXVsdGlwYXJ0L2Zvcm0tZGF0YScgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8ZGl2IGlkPSdwcmV2aWV3LWRyb3B6b25lJyBjbGFzc05hbWU9eydyb3cgcm93LS1wYWRkZWQgcm93LS10YWxsIGRyb3B6b25lJyArICh0aGlzLnN0YXRlLmRyYWdPdmVyID8gJyBkcm9wem9uZS0tZHJhZy1vdmVyJyA6ICcnKX0gb25Ecm9wPXt0aGlzLmhhbmRsZURyb3B9IG9uRHJhZ092ZXI9e3RoaXMuaGFuZGxlRHJhZ092ZXJ9IG9uRHJhZ0VuZD17dGhpcy5oYW5kbGVEcmFnRW5kfSBvbkRyYWdFbnRlcj17dGhpcy5oYW5kbGVEcmFnRW50ZXJ9IG9uRHJhZ0xlYXZlPXt0aGlzLmhhbmRsZURyYWdMZWF2ZX0gb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9IG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb3VzZUxlYXZlfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWxlID8gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hQcmV2aWV3XG4gICAgICAgICAgICAgICAgZGltUHJldmlldz17dGhpcy5zdGF0ZS5kaW1QcmV2aWV3fVxuICAgICAgICAgICAgICAgIGZpbGU9e3RoaXMucHJvcHMuZmlsZX1cbiAgICAgICAgICAgICAgICB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS10ZXh0LWhvbGRlcicgY2xhc3NOYW1lPXsnZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcid9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5kcmFnT3ZlciA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWRyYWdvdmVyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz5Ecm9wIGl0LjwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUubW91c2VPdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtaW5zdHJ1Y3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtcGxhY2Vob2xkZXIgaW5mby1tZXNzYWdlLS1mYWlsdXJlJyBpZD0naW5wdXQtZXJyb3ItZmlsZS1zZWxlY3Rpb24nPnt0aGlzLnByb3BzLmZpbGVFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkRyYWcgJiBkcm9wIGltYWdlIG9yIHZpZGVvIGhlcmUgdG8gcHVibGlzaDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5PUjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlLS11bmRlcmxpbmVkJz5DSE9PU0UgRklMRTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtdGV4dC1ob2xkZXInIGNsYXNzTmFtZT17J2ZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInfT5cbiAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRyYWdPdmVyID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWRyYWdvdmVyJz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+RHJvcCBpdC48L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtaW5zdHJ1Y3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLXBsYWNlaG9sZGVyIGluZm8tbWVzc2FnZS0tZmFpbHVyZScgaWQ9J2lucHV0LWVycm9yLWZpbGUtc2VsZWN0aW9uJz57dGhpcy5wcm9wcy5maWxlRXJyb3J9PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+RHJhZyAmIGRyb3AgaW1hZ2Ugb3IgdmlkZW8gaGVyZSB0byBwdWJsaXNoPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5PUjwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZS0tdW5kZXJsaW5lZCc+Q0hPT1NFIEZJTEU8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvdmlldy5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmFsaWRhdGVGaWxlIChmaWxlKSB7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcHJvdmlkZWQnKTtcbiAgICB9XG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgc2l6ZSBhbmQgdHlwZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgR0lGcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZpbGUudHlwZSArICcgaXMgbm90IGEgc3VwcG9ydGVkIGZpbGUgdHlwZS4gT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBQdWJsaXNoUHJldmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaW1nU291cmNlICAgICAgIDogJycsXG4gICAgICBkZWZhdWx0VGh1bWJuYWlsOiAnL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIH07XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlKHRoaXMucHJvcHMuZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICBpZiAobmV3UHJvcHMuZmlsZSAhPT0gdGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZShuZXdQcm9wcy5maWxlKTtcbiAgICB9XG4gICAgaWYgKG5ld1Byb3BzLnRodW1ibmFpbCAhPT0gdGhpcy5wcm9wcy50aHVtYm5haWwpIHtcbiAgICAgIGlmIChuZXdQcm9wcy50aHVtYm5haWwpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShuZXdQcm9wcy50aHVtYm5haWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUgKGZpbGUpIHtcbiAgICBjb25zdCBwcmV2aWV3UmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBwcmV2aWV3UmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgcHJldmlld1JlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHByZXZpZXdSZWFkZXIucmVzdWx0fSk7XG4gICAgfTtcbiAgfVxuICBzZXRQcmV2aWV3SW1hZ2VTb3VyY2UgKGZpbGUpIHtcbiAgICBpZiAoZmlsZS50eXBlICE9PSAndmlkZW8vbXA0Jykge1xuICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShmaWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUodGhpcy5wcm9wcy50aHVtYm5haWwpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGltZ1xuICAgICAgICBpZD0nZHJvcHpvbmUtcHJldmlldydcbiAgICAgICAgc3JjPXt0aGlzLnN0YXRlLmltZ1NvdXJjZX1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmRpbVByZXZpZXcgPyAnZGltJyA6ICcnfVxuICAgICAgICBhbHQ9J3B1Ymxpc2ggcHJldmlldydcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcblxuUHVibGlzaFByZXZpZXcucHJvcFR5cGVzID0ge1xuICBkaW1QcmV2aWV3OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmaWxlICAgICAgOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHRodW1ibmFpbCA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoUHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3L2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGUsIHN0YXJ0UHVibGlzaH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGU6IHB1Ymxpc2guZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxuICBzdGFydFB1Ymxpc2gsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBEcm9wem9uZSBmcm9tICdjb250YWluZXJzL0Ryb3B6b25lJztcbmltcG9ydCBQdWJsaXNoVGl0bGVJbnB1dCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0JztcbmltcG9ydCBQdWJsaXNoVXJsSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hUaHVtYm5haWxJbnB1dCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dCc7XG5pbXBvcnQgUHVibGlzaE1ldGFkYXRhSW5wdXRzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzJztcbmltcG9ydCBDaGFubmVsU2VsZWN0IGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdCc7XG5cbmNsYXNzIFB1Ymxpc2hEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5vblB1Ymxpc2hTdWJtaXQgPSB0aGlzLm9uUHVibGlzaFN1Ym1pdC5iaW5kKHRoaXMpO1xuICB9XG4gIG9uUHVibGlzaFN1Ym1pdCAoKSB7XG4gICAgdGhpcy5wcm9wcy5zdGFydFB1Ymxpc2godGhpcy5wcm9wcy5oaXN0b3J5KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tYm90dG9tJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICA8UHVibGlzaFRpdGxlSW5wdXQgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvKiBsZWZ0IGNvbHVtbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAnID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxEcm9wem9uZSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey8qIHJpZ2h0IGNvbHVtbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgIDxkaXYgaWQ9J3B1Ymxpc2gtYWN0aXZlLWFyZWEnIGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hVcmxJbnB1dCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxDaGFubmVsU2VsZWN0IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuZmlsZS50eXBlID09PSAndmlkZW8vbXA0JykgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSAnPlxuICAgICAgICAgICAgICAgIDxQdWJsaXNoVGh1bWJuYWlsSW5wdXQgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLW5vLWJvdHRvbSByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8UHVibGlzaE1ldGFkYXRhSW5wdXRzIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ncHVibGlzaC1zdWJtaXQnIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0tbGFyZ2UnIG9uQ2xpY2s9e3RoaXMub25QdWJsaXNoU3VibWl0fT5QdWJsaXNoPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby1ib3R0b20gYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1jYW5jZWwnIG9uQ2xpY2s9e3RoaXMucHJvcHMuY2xlYXJGaWxlfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5CeSBjbGlja2luZyAnUHVibGlzaCcsIHlvdSBhZmZpcm0gdGhhdCB5b3UgaGF2ZSB0aGUgcmlnaHRzIHRvIHB1Ymxpc2ggdGhpcyBjb250ZW50IHRvIHRoZSBMQlJZIG5ldHdvcmssIGFuZCB0aGF0IHlvdSB1bmRlcnN0YW5kIHRoZSBwcm9wZXJ0aWVzIG9mIHB1Ymxpc2hpbmcgaXQgdG8gYSBkZWNlbnRyYWxpemVkLCB1c2VyLWNvbnRyb2xsZWQgbmV0d29yay4gPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2xlYXJuJz5SZWFkIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoUHVibGlzaERldGFpbHMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7dXBkYXRlTWV0YWRhdGF9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogcHVibGlzaC5tZXRhZGF0YS50aXRsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbk1ldGFkYXRhQ2hhbmdlOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZU1ldGFkYXRhKG5hbWUsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQdWJsaXNoVGl0bGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChlKSB7XG4gICAgY29uc3QgbmFtZSA9IGUudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0ncHVibGlzaC10aXRsZScgY2xhc3NOYW1lPSdpbnB1dC10ZXh0IHRleHQtLWxhcmdlIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIG5hbWU9J3RpdGxlJyBwbGFjZWhvbGRlcj0nR2l2ZSB5b3VyIHBvc3QgYSB0aXRsZS4uLicgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IHZhbHVlPXt0aGlzLnByb3BzLnRpdGxlfSAvPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRpdGxlSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dC92aWV3LmpzeCIsImltcG9ydCB7dXBkYXRlQ2xhaW0sIHVwZGF0ZUVycm9yfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lICAgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQ6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLnNob3J0SWQsXG4gICAgZmlsZU5hbWUgICAgICAgICAgICAgIDogcHVibGlzaC5maWxlLm5hbWUsXG4gICAgcHVibGlzaEluQ2hhbm5lbCAgICAgIDogcHVibGlzaC5wdWJsaXNoSW5DaGFubmVsLFxuICAgIHNlbGVjdGVkQ2hhbm5lbCAgICAgICA6IHB1Ymxpc2guc2VsZWN0ZWRDaGFubmVsLFxuICAgIGNsYWltICAgICAgICAgICAgICAgICA6IHB1Ymxpc2guY2xhaW0sXG4gICAgdXJsRXJyb3IgICAgICAgICAgICAgIDogcHVibGlzaC5lcnJvci51cmwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DbGFpbUNoYW5nZTogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVDbGFpbSh2YWx1ZSkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ3B1Ymxpc2hTdWJtaXQnLCBudWxsKSk7XG4gICAgfSxcbiAgICBvblVybEVycm9yOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCd1cmwnLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcbmltcG9ydCBVcmxNaWRkbGUgZnJvbSAnY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheSc7XG5cbmNsYXNzIFB1Ymxpc2hVcmxJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGNsYWltLCBmaWxlTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNsYWltKSB7XG4gICAgICB0aGlzLnNldENsYWltTmFtZShmaWxlTmFtZSk7XG4gICAgfVxuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKHsgY2xhaW0sIGZpbGVOYW1lIH0pIHtcbiAgICAvLyBpZiBhIG5ldyBmaWxlIHdhcyBjaG9zZW4sIHVwZGF0ZSB0aGUgY2xhaW0gbmFtZVxuICAgIGlmIChmaWxlTmFtZSAhPT0gdGhpcy5wcm9wcy5maWxlTmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0Q2xhaW1OYW1lKGZpbGVOYW1lKTtcbiAgICB9XG4gICAgLy8gaWYgdGhlIGNsYWltIGhhcyB1cGRhdGVkLCBjaGVjayBpdHMgYXZhaWxhYmlsaXR5XG4gICAgaWYgKGNsYWltICE9PSB0aGlzLnByb3BzLmNsYWltKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlQ2xhaW0oY2xhaW0pO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmNsZWFuc2VJbnB1dCh2YWx1ZSk7XG4gICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgIHRoaXMucHJvcHMub25DbGFpbUNoYW5nZSh2YWx1ZSk7XG4gIH1cbiAgY2xlYW5zZUlucHV0IChpbnB1dCkge1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxzKy9nLCAnLScpOyAvLyByZXBsYWNlIHNwYWNlcyB3aXRoIGRhc2hlc1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTktXS9nLCAnJyk7ICAvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksIG9yICctJ1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBzZXRDbGFpbU5hbWUgKGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZU5hbWVXaXRob3V0RW5kaW5nID0gZmlsZU5hbWUuc3Vic3RyaW5nKDAsIGZpbGVOYW1lLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIGNvbnN0IGNsZWFuQ2xhaW1OYW1lID0gdGhpcy5jbGVhbnNlSW5wdXQoZmlsZU5hbWVXaXRob3V0RW5kaW5nKTtcbiAgICB0aGlzLnByb3BzLm9uQ2xhaW1DaGFuZ2UoY2xlYW5DbGFpbU5hbWUpO1xuICB9XG4gIHZhbGlkYXRlQ2xhaW0gKGNsYWltKSB7XG4gICAgaWYgKCFjbGFpbSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25VcmxFcnJvcignRW50ZXIgYSB1cmwgYWJvdmUnKTtcbiAgICB9XG4gICAgcmVxdWVzdChgL2FwaS9jbGFpbS9hdmFpbGFiaWxpdHkvJHtjbGFpbX1gKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uVXJsRXJyb3IobnVsbCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uVXJsRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2xhaW0sIGxvZ2dlZEluQ2hhbm5lbE5hbWUsIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQsIHB1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgdXJsRXJyb3IgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IHNwYW4tLXJlbGF0aXZlJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnknPnNwZWUuY2ggLyA8L3NwYW4+XG4gICAgICAgICAgPFVybE1pZGRsZVxuICAgICAgICAgICAgcHVibGlzaEluQ2hhbm5lbD17cHVibGlzaEluQ2hhbm5lbH1cbiAgICAgICAgICAgIHNlbGVjdGVkQ2hhbm5lbD17c2VsZWN0ZWRDaGFubmVsfVxuICAgICAgICAgICAgbG9nZ2VkSW5DaGFubmVsTmFtZT17bG9nZ2VkSW5DaGFubmVsTmFtZX1cbiAgICAgICAgICAgIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWQ9e2xvZ2dlZEluQ2hhbm5lbFNob3J0SWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2NsYWltLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nY2xhaW0nIHBsYWNlaG9sZGVyPSd5b3VyLXVybC1oZXJlJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gdmFsdWU9e2NsYWltfSAvPlxuICAgICAgICAgIHsgKGNsYWltICYmICF1cmxFcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2xhaW0tbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLXN1Y2Nlc3Mgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxMyd9PC9zcGFuPiB9XG4gICAgICAgICAgeyB1cmxFcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7IHVybEVycm9yID8gKFxuICAgICAgICAgICAgPHAgaWQ9J2lucHV0LWVycm9yLWNsYWltLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dXJsRXJyb3J9PC9wPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+Q2hvb3NlIGEgY3VzdG9tIHVybDwvcD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFVybElucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmZ1bmN0aW9uIFVybE1pZGRsZSAoe3B1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgbG9nZ2VkSW5DaGFubmVsTmFtZSwgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0pIHtcbiAgaWYgKHB1Ymxpc2hJbkNoYW5uZWwpIHtcbiAgICBpZiAoc2VsZWN0ZWRDaGFubmVsID09PSBsb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gPHNwYW4gaWQ9J3VybC1jaGFubmVsJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnknPntsb2dnZWRJbkNoYW5uZWxOYW1lfTp7bG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0gLzwvc3Bhbj47XG4gICAgfVxuICAgIHJldHVybiA8c3BhbiBpZD0ndXJsLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz5AY2hhbm5lbDxzcGFuXG4gICAgICBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+U2VsZWN0IGEgY2hhbm5lbCBiZWxvdzwvc3Bhbj4gLzwvc3Bhbj47XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8c3BhbiBpZD0ndXJsLW5vLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz54eXo8c3BhbiBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+VGhpcyB3aWxsIGJlIGEgcmFuZG9tIGlkPC9zcGFuPiAvPC9zcGFuPlxuICApO1xufVxuXG5VcmxNaWRkbGUucHJvcFR5cGVzID0ge1xuICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBsb2dnZWRJbkNoYW5uZWxOYW1lICAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXJsTWlkZGxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uTmV3VGh1bWJuYWlsIH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2g6IHsgZmlsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvbk5ld1RodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgbGV0IGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gIC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcbiAgbGV0IG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gIGxldCBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBCbG9iKFtpYV0sIHt0eXBlOiBtaW1lU3RyaW5nfSk7XG59XG5cbmNsYXNzIFB1Ymxpc2hUaHVtYm5haWxJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmlkZW9Tb3VyY2UgICA6IG51bGwsXG4gICAgICBlcnJvciAgICAgICAgIDogbnVsbCxcbiAgICAgIHNsaWRlck1pblJhbmdlOiAxLFxuICAgICAgc2xpZGVyTWF4UmFuZ2U6IG51bGwsXG4gICAgICBzbGlkZXJWYWx1ZSAgIDogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhID0gdGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGEuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNsaWRlckNoYW5nZSA9IHRoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVUaHVtYm5haWwgPSB0aGlzLmNyZWF0ZVRodW1ibmFpbC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGZpbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRWaWRlb1NvdXJjZShmaWxlKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICAvLyBpZiBmaWxlIGNoYW5nZXNcbiAgICBpZiAobmV4dFByb3BzLmZpbGUgJiYgbmV4dFByb3BzLmZpbGUgIT09IHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgY29uc3QgeyBmaWxlIH0gPSBuZXh0UHJvcHM7XG4gICAgICB0aGlzLnNldFZpZGVvU291cmNlKGZpbGUpO1xuICAgIH07XG4gIH1cbiAgc2V0VmlkZW9Tb3VyY2UgKGZpbGUpIHtcbiAgICBjb25zdCBwcmV2aWV3UmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBwcmV2aWV3UmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgcHJldmlld1JlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhVXJpID0gcHJldmlld1JlYWRlci5yZXN1bHQ7XG4gICAgICBjb25zdCBibG9iID0gZGF0YVVSSXRvQmxvYihkYXRhVXJpKTtcbiAgICAgIGNvbnN0IHZpZGVvU291cmNlID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aWRlb1NvdXJjZSB9KTtcbiAgICB9O1xuICB9XG4gIGhhbmRsZVZpZGVvTG9hZGVkRGF0YSAoZXZlbnQpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IGV2ZW50LnRhcmdldC5kdXJhdGlvbjtcbiAgICBjb25zdCB0b3RhbE1pbnV0ZXMgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gNjApO1xuICAgIGNvbnN0IHRvdGFsU2Vjb25kcyA9IE1hdGguZmxvb3IoZHVyYXRpb24gJSA2MCk7XG4gICAgLy8gc2V0IHRoZSBzbGlkZXJcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNsaWRlck1heFJhbmdlOiBkdXJhdGlvbiAqIDEwMCxcbiAgICAgIHNsaWRlclZhbHVlICAgOiBkdXJhdGlvbiAqIDEwMCAvIDIsXG4gICAgICB0b3RhbE1pbnV0ZXMsXG4gICAgICB0b3RhbFNlY29uZHMsXG4gICAgfSk7XG4gICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIHZpZGVvXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gZHVyYXRpb24gLyAyO1xuICB9XG4gIGhhbmRsZVNsaWRlckNoYW5nZSAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgLy8gdXBkYXRlIHRoZSBzbGlkZXIgdmFsdWVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNsaWRlclZhbHVlOiB2YWx1ZSxcbiAgICB9KTtcbiAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgdmlkZW9cbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSB2YWx1ZSAvIDEwMDtcbiAgfVxuICBjcmVhdGVUaHVtYm5haWwgKCkge1xuICAgIC8vIHRha2UgYSBzbmFwc2hvdFxuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgY29uc3QgYmxvYiA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVybCk7XG4gICAgY29uc3Qgc25hcHNob3QgPSBuZXcgRmlsZShbYmxvYl0sIGB0aHVtYm5haWwucG5nYCwge1xuICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgfSk7XG4gICAgLy8gc2V0IHRoZSB0aHVtYm5haWwgaW4gcmVkdXggc3RvcmVcbiAgICBpZiAoc25hcHNob3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25OZXdUaHVtYm5haWwoc25hcHNob3QpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHZpZGVvU291cmNlLCBzbGlkZXJNaW5SYW5nZSwgc2xpZGVyTWF4UmFuZ2UsIHNsaWRlclZhbHVlLCB0b3RhbE1pbnV0ZXMsIHRvdGFsU2Vjb25kcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnPlRodW1ibmFpbDo8L2xhYmVsPlxuICAgICAgICA8dmlkZW9cbiAgICAgICAgICBpZD0ndmlkZW8tdGh1bWItcGxheWVyJ1xuICAgICAgICAgIHByZWxvYWQ9J21ldGFkYXRhJ1xuICAgICAgICAgIG11dGVkXG4gICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiAnbm9uZSd9fVxuICAgICAgICAgIHBsYXlzSW5saW5lXG4gICAgICAgICAgb25Mb2FkZWREYXRhPXt0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YX1cbiAgICAgICAgICBzcmM9e3ZpZGVvU291cmNlfVxuICAgICAgICAgIG9uU2Vla2VkPXt0aGlzLmNyZWF0ZVRodW1ibmFpbH1cbiAgICAgICAgLz5cbiAgICAgICAge1xuICAgICAgICAgIHNsaWRlclZhbHVlID8gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tY2VudGVyJyBzdHlsZT17e3dpZHRoOiAnMTAwJSd9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+MCcwMFwiPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz57dG90YWxNaW51dGVzfSd7dG90YWxTZWNvbmRzfVwiPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9J3JhbmdlJ1xuICAgICAgICAgICAgICAgICAgbWluPXtzbGlkZXJNaW5SYW5nZX1cbiAgICAgICAgICAgICAgICAgIG1heD17c2xpZGVyTWF4UmFuZ2V9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2xpZGVyVmFsdWV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3NsaWRlcidcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNsaWRlckNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZScgPmxvYWRpbmcuLi4gPC9wPlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICB7IGVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57ZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5Vc2Ugc2xpZGVyIHRvIHNldCB0aHVtYm5haWw8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUaHVtYm5haWxJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHt1cGRhdGVNZXRhZGF0YSwgdG9nZ2xlTWV0YWRhdGFJbnB1dHN9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzaG93TWV0YWRhdGFJbnB1dHM6IHB1Ymxpc2guc2hvd01ldGFkYXRhSW5wdXRzLFxuICAgIGRlc2NyaXB0aW9uICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICBsaWNlbnNlICAgICAgICAgICA6IHB1Ymxpc2gubWV0YWRhdGEubGljZW5zZSxcbiAgICBuc2Z3ICAgICAgICAgICAgICA6IHB1Ymxpc2gubWV0YWRhdGEubnNmdyxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbk1ldGFkYXRhQ2hhbmdlOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZU1ldGFkYXRhKG5hbWUsIHZhbHVlKSk7XG4gICAgfSxcbiAgICBvblRvZ2dsZU1ldGFkYXRhSW5wdXRzOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHRvZ2dsZU1ldGFkYXRhSW5wdXRzKHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFeHBhbmRpbmdUZXh0QXJlYSBmcm9tICdjb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhJztcblxuY2xhc3MgUHVibGlzaE1ldGFkYXRhSW5wdXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMudG9nZ2xlU2hvd0lucHV0cyA9IHRoaXMudG9nZ2xlU2hvd0lucHV0cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3QgPSB0aGlzLmhhbmRsZVNlbGVjdC5iaW5kKHRoaXMpO1xuICB9XG4gIHRvZ2dsZVNob3dJbnB1dHMgKCkge1xuICAgIHRoaXMucHJvcHMub25Ub2dnbGVNZXRhZGF0YUlucHV0cyghdGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC50eXBlID09PSAnY2hlY2tib3gnID8gdGFyZ2V0LmNoZWNrZWQgOiB0YXJnZXQudmFsdWU7XG4gICAgY29uc3QgbmFtZSA9IHRhcmdldC5uYW1lO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHNlbGVjdGVkT3B0aW9uKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdwdWJsaXNoLWRldGFpbHMnIGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgIHt0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyAmJiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdsYWJlbCc+RGVzY3JpcHRpb246PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxFeHBhbmRpbmdUZXh0QXJlYVxuICAgICAgICAgICAgICAgICAgaWQ9J3B1Ymxpc2gtZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3RleHRhcmVhIHRleHRhcmVhLS1wcmltYXJ5IHRleHRhcmVhLS1mdWxsLXdpZHRoJ1xuICAgICAgICAgICAgICAgICAgcm93cz17MX1cbiAgICAgICAgICAgICAgICAgIG1heExlbmd0aD17MjAwMH1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heEhlaWdodDogMjAwIH19XG4gICAgICAgICAgICAgICAgICBuYW1lPSdkZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdPcHRpb25hbCBkZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdsYWJlbCc+TGljZW5zZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBuYW1lPSdsaWNlbnNlJyBpZD0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLXByaW1hcnknIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdH0+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPScgJz5VbnNwZWNpZmllZDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nUHVibGljIERvbWFpbic+UHVibGljIERvbWFpbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nQ3JlYXRpdmUgQ29tbW9ucyc+Q3JlYXRpdmUgQ29tbW9uczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLW5zZncnIGNsYXNzTmFtZT0nbGFiZWwnPk1hdHVyZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0naW5wdXQtY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94JyBpZD0ncHVibGlzaC1uc2Z3JyBuYW1lPSduc2Z3JyB2YWx1ZT17dGhpcy5wcm9wcy5uc2Z3fSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tc2Vjb25kYXJ5JyBvbkNsaWNrPXt0aGlzLnRvZ2dsZVNob3dJbnB1dHN9Pnt0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyA/ICdsZXNzJyA6ICdtb3JlJ308L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaE1ldGFkYXRhSW5wdXRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIEV4cGFuZGluZ1RleHRhcmVhIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX2hhbmRsZUNoYW5nZSA9IHRoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmFkanVzdFRleHRhcmVhKHt9KTtcbiAgfVxuICBfaGFuZGxlQ2hhbmdlIChldmVudCkge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShldmVudCk7XG4gICAgdGhpcy5hZGp1c3RUZXh0YXJlYShldmVudCk7XG4gIH1cbiAgYWRqdXN0VGV4dGFyZWEgKHsgdGFyZ2V0ID0gdGhpcy5lbCB9KSB7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyAuLi5yZXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIHJlZj17eCA9PiB0aGlzLmVsID0geH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5FeHBhbmRpbmdUZXh0YXJlYS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGluZ1RleHRhcmVhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3NldFB1Ymxpc2hJbkNoYW5uZWwsIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIHB1Ymxpc2hJbkNoYW5uZWwgICA6IHB1Ymxpc2gucHVibGlzaEluQ2hhbm5lbCxcbiAgICBzZWxlY3RlZENoYW5uZWwgICAgOiBwdWJsaXNoLnNlbGVjdGVkQ2hhbm5lbCxcbiAgICBjaGFubmVsRXJyb3IgICAgICAgOiBwdWJsaXNoLmVycm9yLmNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdjaGFubmVsJywgbnVsbCkpO1xuICAgICAgZGlzcGF0Y2goc2V0UHVibGlzaEluQ2hhbm5lbCh2YWx1ZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsU2VsZWN0OiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdjaGFubmVsJywgbnVsbCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ2hhbm5lbExvZ2luRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0nO1xuaW1wb3J0IENoYW5uZWxDcmVhdGVGb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0nO1xuaW1wb3J0ICogYXMgc3RhdGVzIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcyc7XG5cbmNsYXNzIENoYW5uZWxTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNoID0gdGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNoLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24gPSB0aGlzLmhhbmRsZVNlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICB9XG4gIHRvZ2dsZUFub255bW91c1B1Ymxpc2ggKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgaWYgKHZhbHVlID09PSAnYW5vbnltb3VzJykge1xuICAgICAgdGhpcy5wcm9wcy5vblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2UoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZSh0cnVlKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlU2VsZWN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbFNlbGVjdChzZWxlY3RlZE9wdGlvbik7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3JhZGlvJyBuYW1lPSdhbm9ueW1vdXMtb3ItY2hhbm5lbCcgaWQ9J2Fub255bW91cy1yYWRpbycgY2xhc3NOYW1lPSdpbnB1dC1yYWRpbycgdmFsdWU9J2Fub255bW91cycgY2hlY2tlZD17IXRoaXMucHJvcHMucHVibGlzaEluQ2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaH0gLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsIGxhYmVsLS1wb2ludGVyJyBodG1sRm9yPSdhbm9ueW1vdXMtcmFkaW8nPkFub255bW91czwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3JhZGlvJyBuYW1lPSdhbm9ueW1vdXMtb3ItY2hhbm5lbCcgaWQ9J2NoYW5uZWwtcmFkaW8nIGNsYXNzTmFtZT0naW5wdXQtcmFkaW8nIHZhbHVlPSdpbiBhIGNoYW5uZWwnIGNoZWNrZWQ9e3RoaXMucHJvcHMucHVibGlzaEluQ2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaH0gLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsIGxhYmVsLS1wb2ludGVyJyBodG1sRm9yPSdjaGFubmVsLXJhZGlvJz5JbiBhIGNoYW5uZWw8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGFubmVsRXJyb3IgPyAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMucHJvcHMuY2hhbm5lbEVycm9yfTwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPlB1Ymxpc2ggYW5vbnltb3VzbHkgb3IgaW4gYSBjaGFubmVsPC9wPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgeyB0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWwgJiYgKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyc+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLW5hbWUtc2VsZWN0Jz5DaGFubmVsOjwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgaWQ9J2NoYW5uZWwtbmFtZS1zZWxlY3QnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tYXJyb3cnIHZhbHVlPXt0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9ufT5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSAmJiA8b3B0aW9uIHZhbHVlPXt0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWV9IGlkPSdwdWJsaXNoLWNoYW5uZWwtc2VsZWN0LWNoYW5uZWwtb3B0aW9uJz57dGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lfTwvb3B0aW9uPiB9XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c3RhdGVzLkxPR0lOfT5FeGlzdGluZzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3N0YXRlcy5DUkVBVEV9Pk5ldzwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyAodGhpcy5wcm9wcy5zZWxlY3RlZENoYW5uZWwgPT09IHN0YXRlcy5MT0dJTikgJiYgPENoYW5uZWxMb2dpbkZvcm0gLz4gfVxuICAgICAgICAgICAgeyAodGhpcy5wcm9wcy5zZWxlY3RlZENoYW5uZWwgPT09IHN0YXRlcy5DUkVBVEUpICYmIDxDaGFubmVsQ3JlYXRlRm9ybSAvPiB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxTZWxlY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsTG9naW5Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIG5hbWUgICAgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dpblRvQ2hhbm5lbCA9IHRoaXMubG9naW5Ub0NoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIGxvZ2luVG9DaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXF1ZXN0KCdsb2dpbicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7c3VjY2VzcywgY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCwgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG1lc3NhZ2V9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvcn0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBpZD0nY2hhbm5lbC1sb2dpbi1mb3JtJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tJz5cbiAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nbmFtZScgcGxhY2Vob2xkZXI9J1lvdXIgQ2hhbm5lbCBOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsTmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyA+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgaWQ9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnIG5hbWU9J3Bhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxQYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5FbnRlciB0aGUgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMubG9naW5Ub0NoYW5uZWx9PkF1dGhlbnRpY2F0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxMb2dpbkZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsQ3JlYXRlRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3IgICA6IG51bGwsXG4gICAgICBjaGFubmVsIDogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgICBzdGF0dXMgIDogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQ2hhbm5lbElucHV0ID0gdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlQ2hhbm5lbCA9IHRoaXMuY3JlYXRlQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGNsZWFuc2VDaGFubmVsSW5wdXQgKGlucHV0KSB7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMrL2csICctJyk7IC8vIHJlcGxhY2Ugc3BhY2VzIHdpdGggZGFzaGVzXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOS1dL2csICcnKTsgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgb3IgJy0nXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIGhhbmRsZUNoYW5uZWxJbnB1dCAoZXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmNsZWFuc2VDaGFubmVsSW5wdXQodmFsdWUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2NoYW5uZWw6IHZhbHVlfSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiAnUGxlYXNlIGVudGVyIGEgY2hhbm5lbCBuYW1lJ30pO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIHVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSAoY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxXaXRoQXRTeW1ib2wgPSBgQCR7Y2hhbm5lbH1gO1xuICAgIHJlcXVlc3QoYC9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvJHtjaGFubmVsV2l0aEF0U3ltYm9sfWApXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG51bGx9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgIH0pO1xuICB9XG4gIGNoZWNrSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmV0dXJuIHJlcXVlc3QoYC9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvJHtjaGFubmVsV2l0aEF0U3ltYm9sfWApO1xuICB9XG4gIGNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIChwYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXBhc3N3b3JkIHx8IHBhc3N3b3JkLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgcGFzc3dvcmQnKSk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbiAgbWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lLCBwYXNzd29yZH0pLFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3QoJy9zaWdudXAnLCBwYXJhbXMpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBVbmZvcnR1bmF0ZWx5LCB3ZSBlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBjcmVhdGluZyB5b3VyIGNoYW5uZWwuIFBsZWFzZSBsZXQgdXMga25vdyBpbiBEaXNjb3JkISAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBjcmVhdGVDaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jaGVja0lzUGFzc3dvcmRQcm92aWRlZCh0aGlzLnN0YXRlLnBhc3N3b3JkKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSh0aGlzLnN0YXRlLmNoYW5uZWwpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiAnV2UgYXJlIHB1Ymxpc2hpbmcgeW91ciBuZXcgY2hhbm5lbC4gIFNpdCB0aWdodC4uLid9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCh0aGlzLnN0YXRlLmNoYW5uZWwsIHRoaXMuc3RhdGUucGFzc3dvcmQpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogbnVsbH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKHJlc3VsdC5jaGFubmVsTmFtZSwgcmVzdWx0LnNob3J0Q2hhbm5lbElkLCByZXN1bHQuY2hhbm5lbENsYWltSWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvciwgc3RhdHVzOiBudWxsfSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7ICF0aGlzLnN0YXRlLnN0YXR1cyA/IChcbiAgICAgICAgICA8Zm9ybSBpZD0ncHVibGlzaC1jaGFubmVsLWZvcm0nPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtbmFtZSc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20gc3Bhbi0tcmVsYXRpdmUnPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBuYW1lPSdjaGFubmVsJyBpZD0nbmV3LWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBwbGFjZWhvbGRlcj0nZXhhbXBsZUNoYW5uZWxOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFubmVsSW5wdXR9IC8+XG4gICAgICAgICAgICAgICAgICB7ICh0aGlzLnN0YXRlLmNoYW5uZWwgJiYgIXRoaXMuc3RhdGUuZXJyb3IpICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLXN1Y2Nlc3Mgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxMyd9PC9zcGFuPiB9XG4gICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZXJyb3IgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzE2J308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J25ldy1jaGFubmVsLXBhc3N3b3JkJz5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnknPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBuYW1lPSdwYXNzd29yZCcgaWQ9J25ldy1jaGFubmVsLXBhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnICBwbGFjZWhvbGRlcj0nJyB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnN0YXRlLmVycm9yfTwvcD5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5DaG9vc2UgYSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5jcmVhdGVDaGFubmVsfT5DcmVhdGUgQ2hhbm5lbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPnt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxDcmVhdGVGb3JtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBY3RpdmVTdGF0dXNCYXIgPSAoKSA9PiB7XG4gIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItLWFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEluYWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1pbmFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5hY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y2xlYXJGaWxlfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzIDogcHVibGlzaC5zdGF0dXMuc3RhdHVzLFxuICAgIG1lc3NhZ2U6IHB1Ymxpc2guc3RhdHVzLm1lc3NhZ2UsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIGNsZWFyRmlsZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgKiBhcyBwdWJsaXNoU3RhdGVzIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcyc7XG5cbmNsYXNzIFB1Ymxpc2hTdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBtZXNzYWdlLCBjbGVhckZpbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkxPQURfU1RBUlQgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+RmlsZSBpcyBsb2FkaW5nIHRvIHNlcnZlcjwvcD5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPjAlPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkxPQURJTkcgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgIDxwPkZpbGUgaXMgbG9hZGluZyB0byBzZXJ2ZXI8L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPnttZXNzYWdlfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5QVUJMSVNISU5HICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPlVwbG9hZCBjb21wbGV0ZS4gIFlvdXIgZmlsZSBpcyBub3cgYmVpbmcgcHVibGlzaGVkIG9uIHRoZSBibG9ja2NoYWluLi4uPC9wPlxuICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8cD5DdXJpb3VzIHdoYXQgbWFnaWMgaXMgaGFwcGVuaW5nIGhlcmU/IDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2ZhcS93aGF0LWlzLWxicnknPkxlYXJuIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5TVUNDRVNTICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPllvdXIgcHVibGlzaCBpcyBjb21wbGV0ZSEgWW91IGFyZSBiZWluZyByZWRpcmVjdGVkIHRvIGl0IG5vdy48L3A+XG4gICAgICAgICAgPHA+SWYgeW91IGFyZSBub3QgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLCA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXttZXNzYWdlfT5jbGljayBoZXJlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuRkFJTEVEICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPlNvbWV0aGluZyB3ZW50IHdyb25nLi4uPC9wPlxuICAgICAgICAgIDxwPjxzdHJvbmc+e21lc3NhZ2V9PC9zdHJvbmc+PC9wPlxuICAgICAgICAgIDxwPkZvciBoZWxwLCBwb3N0IHRoZSBhYm92ZSBlcnJvciB0ZXh0IGluIHRoZSAjc3BlZWNoIGNoYW5uZWwgb24gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5sYnJ5IGRpc2NvcmQ8L2E+PC9wPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXNlY29uZGFyeScgb25DbGljaz17Y2xlYXJGaWxlfT5SZXNldDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFN0YXR1cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJleHBvcnQgY29uc3QgTE9BRF9TVEFSVCA9ICdMT0FEX1NUQVJUJztcbmV4cG9ydCBjb25zdCBMT0FESU5HID0gJ0xPQURJTkcnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hJTkcgPSAnUFVCTElTSElORyc7XG5leHBvcnQgY29uc3QgU1VDQ0VTUyA9ICdTVUNDRVNTJztcbmV4cG9ydCBjb25zdCBGQUlMRUQgPSAnRkFJTEVEJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMuanMiLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2U6IHB1Ymxpc2guZGlzYWJsZWRNZXNzYWdlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnByb3BzLm1lc3NhZ2U7XG4gICAgY29uc29sZS5sb2coJ3RoaXMucHJvcHMubWVzc2FnZTonLCBtZXNzYWdlKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBkcm9wem9uZS0tZGlzYWJsZWQgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICA8cCBjbGFzc05hbWU9J3RleHQtLWRpc2FibGVkJz5QdWJsaXNoaW5nIGlzIGN1cnJlbnRseSBkaXNhYmxlZC48L3A+XG4gICAgICAgIDxwIGNsYXNzTmFtZT0ndGV4dC0tZGlzYWJsZWQnPnttZXNzYWdlfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaERpc2FibGVkTWVzc2FnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcblxuY2xhc3MgQWJvdXRQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydBYm91dCd9IHBhZ2VVcmk9eydhYm91dCd9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J3B1bGwtcXVvdGUnPlNwZWUuY2ggaXMgYW4gb3Blbi1zb3VyY2UgcHJvamVjdC4gIFBsZWFzZSBjb250cmlidXRlIHRvIHRoZSBleGlzdGluZyBzaXRlLCBvciBmb3JrIGl0IGFuZCBtYWtlIHlvdXIgb3duLjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly90d2l0dGVyLmNvbS9zcGVlX2NoJz5UV0lUVEVSPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5HSVRIVUI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+RElTQ09SRCBDSEFOTkVMPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2Jsb2IvbWFzdGVyL1JFQURNRS5tZCc+RE9DVU1FTlRBVElPTjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBtZWRpYS1ob3N0aW5nIHNpdGUgdGhhdCByZWFkcyBmcm9tIGFuZCBwdWJsaXNoZXMgY29udGVudCB0byB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8nPkxCUlk8L2E+IGJsb2NrY2hhaW4uPC9wPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgaG9zdGluZyBzZXJ2aWNlLCBidXQgd2l0aCB0aGUgYWRkZWQgYmVuZWZpdCB0aGF0IGl0IHN0b3JlcyB5b3VyIGNvbnRlbnQgb24gYSBkZWNlbnRyYWxpemVkIG5ldHdvcmsgb2YgY29tcHV0ZXJzIC0tIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9nZXQnPkxCUlk8L2E+IG5ldHdvcmsuICBUaGlzIG1lYW5zIHRoYXQgeW91ciBpbWFnZXMgYXJlIHN0b3JlZCBpbiBtdWx0aXBsZSBsb2NhdGlvbnMgd2l0aG91dCBhIHNpbmdsZSBwb2ludCBvZiBmYWlsdXJlLjwvcD5cbiAgICAgICAgICAgICAgPGgzPkNvbnRyaWJ1dGU8L2gzPlxuICAgICAgICAgICAgICA8cD5JZiB5b3UgaGF2ZSBhbiBpZGVhIGZvciB5b3VyIG93biBzcGVlLmNoLWxpa2Ugc2l0ZSBvbiB0b3Agb2YgTEJSWSwgZm9yayBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPmdpdGh1YiByZXBvPC9hPiBhbmQgZ28gdG8gdG93biE8L3A+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSB3YW50IHRvIGltcHJvdmUgc3BlZS5jaCwgam9pbiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUyc+ZGlzY29yZCBjaGFubmVsPC9hPiBvciBzb2x2ZSBvbmUgb2Ygb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoL2lzc3Vlcyc+Z2l0aHViIGlzc3VlczwvYT4uPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQWJvdXRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbExvZ2luRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0nO1xuaW1wb3J0IENoYW5uZWxDcmVhdGVGb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0nO1xuXG5jbGFzcyBMb2dpblBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIC8vIHJlLXJvdXRlIHRoZSB1c2VyIHRvIHRoZSBob21lcGFnZSBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICBpZiAobmV3UHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSAhPT0gdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgL2ApO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0xvZ2luJ30gcGFnZVVyaT17J2xvZ2luJ30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwPkNoYW5uZWxzIGFsbG93IHlvdSB0byBwdWJsaXNoIGFuZCBncm91cCBjb250ZW50IHVuZGVyIGFuIGlkZW50aXR5LiBZb3UgY2FuIGNyZWF0ZSBhIGNoYW5uZWwgZm9yIHlvdXJzZWxmLCBvciBzaGFyZSBvbmUgd2l0aCBsaWtlLW1pbmRlZCBmcmllbmRzLiAgWW91IGNhbiBjcmVhdGUgMSBjaGFubmVsLCBvciAxMDAsIHNvIHdoZXRoZXIgeW91J3JlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0YWxvbmlhMjAxNzo0M2RjZjQ3MTYzY2FhMjFkODQwNGQ5ZmU5YjMwZjc4ZWYzZTE0NmE4Jz5kb2N1bWVudGluZyBpbXBvcnRhbnQgZXZlbnRzPC9hPiwgb3IgbWFraW5nIGEgcHVibGljIHJlcG9zaXRvcnkgZm9yIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy9AY2F0R2lmcyc+Y2F0IGdpZnM8L2E+IChwYXNzd29yZDogJzEyMzQnKSwgdHJ5IGNyZWF0aW5nIGEgY2hhbm5lbCBmb3IgaXQhPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5Mb2cgaW4gdG8gYW4gZXhpc3RpbmcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbExvZ2luRm9ybSAvPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPSdoMy0tbm8tYm90dG9tJz5DcmVhdGUgYSBicmFuZCBuZXcgY2hhbm5lbDo8L2gzPlxuICAgICAgICAgICAgICA8Q2hhbm5lbENyZWF0ZUZvcm0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTG9naW5QYWdlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvciAgICAgIDogc2hvdy5yZXF1ZXN0LmVycm9yLFxuICAgIHJlcXVlc3RUeXBlOiBzaG93LnJlcXVlc3QudHlwZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25IYW5kbGVTaG93UGFnZVVyaSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAncGFnZXMvRXJyb3JQYWdlJztcbmltcG9ydCBTaG93QXNzZXRMaXRlIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZSc7XG5pbXBvcnQgU2hvd0Fzc2V0RGV0YWlscyBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldERldGFpbHMnO1xuaW1wb3J0IFNob3dDaGFubmVsIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwnO1xuXG5pbXBvcnQgeyBDSEFOTkVMLCBBU1NFVF9MSVRFLCBBU1NFVF9ERVRBSUxTIH0gZnJvbSAnY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcyc7XG5cbmNsYXNzIFNob3dQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMucHJvcHMub25IYW5kbGVTaG93UGFnZVVyaSh0aGlzLnByb3BzLm1hdGNoLnBhcmFtcyk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMgIT09IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zKSB7XG4gICAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkobmV4dFByb3BzLm1hdGNoLnBhcmFtcyk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciwgcmVxdWVzdFR5cGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RXJyb3JQYWdlIGVycm9yPXtlcnJvcn0gLz5cbiAgICAgICk7XG4gICAgfVxuICAgIHN3aXRjaCAocmVxdWVzdFR5cGUpIHtcbiAgICAgIGNhc2UgQ0hBTk5FTDpcbiAgICAgICAgcmV0dXJuIDxTaG93Q2hhbm5lbCAvPjtcbiAgICAgIGNhc2UgQVNTRVRfTElURTpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXRMaXRlIC8+O1xuICAgICAgY2FzZSBBU1NFVF9ERVRBSUxTOlxuICAgICAgICByZXR1cm4gPFNob3dBc3NldERldGFpbHMgLz47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gPHA+bG9hZGluZy4uLjwvcD47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9TaG93UGFnZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCBhc3NldCBpbmZvXG4gIGxldCBhc3NldDtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICBjb25zdCBhc3NldExpc3QgPSBzaG93LmFzc2V0TGlzdDtcbiAgaWYgKHJlcXVlc3QgJiYgYXNzZXRMaXN0KSB7XG4gICAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTsgIC8vIG5vdGU6IGp1c3Qgc3RvcmUgdGhpcyBpbiB0aGUgcmVxdWVzdFxuICAgIGFzc2V0ID0gYXNzZXRMaXN0W2Fzc2V0S2V5XSB8fCBudWxsO1xuICB9O1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgQXNzZXREaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5JztcblxuY2xhc3MgU2hvd0xpdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGNsYWltSWQgfSA9IGFzc2V0LmNsYWltRGF0YTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXIgc2hvdy1saXRlLWNvbnRhaW5lcic+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e25hbWV9IGFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICA8QXNzZXREaXNwbGF5IC8+XG4gICAgICAgICAgPExpbmsgaWQ9J2Fzc2V0LWJvaWxlcnBhdGUnIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeSBmaW5lLXByaW50JyB0bz17YC8ke2NsYWltSWR9LyR7bmFtZX1gfT5ob3N0ZWRcbiAgICAgICAgICAgIHZpYSBTcGVlLmNoPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAgPHA+bG9hZGluZyBhc3NldCBkYXRhLi4uPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0xpdGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBVTkFWQUlMQUJMRSwgRVJST1IsIEFWQUlMQUJMRSB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNsYXNzIEFzc2V0RGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uRmlsZVJlcXVlc3QobmFtZSwgY2xhaW1JZCk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1cywgZXJyb3IsIGFzc2V0OiB7IGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBjb250ZW50VHlwZSwgZmlsZUV4dCwgdGh1bWJuYWlsIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0nYXNzZXQtZGlzcGxheS1jb21wb25lbnQnPlxuICAgICAgICB7KHN0YXR1cyA9PT0gTE9DQUxfQ0hFQ0spICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+Q2hlY2tpbmcgdG8gc2VlIGlmIFNwZWUuY2ggaGFzIHlvdXIgYXNzZXQgbG9jYWxseS4uLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IFVOQVZBSUxBQkxFKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPlNpdCB0aWdodCwgd2UncmUgc2VhcmNoaW5nIHRoZSBMQlJZIGJsb2NrY2hhaW4gZm9yIHlvdXIgYXNzZXQhPC9wPlxuICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8cD5DdXJpb3VzIHdoYXQgbWFnaWMgaXMgaGFwcGVuaW5nIGhlcmU/IDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2ZhcS93aGF0LWlzLWxicnknPkxlYXJuIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEVSUk9SKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPlVuZm9ydHVuYXRlbHksIHdlIGNvdWxkbid0IGRvd25sb2FkIHlvdXIgYXNzZXQgZnJvbSBMQlJZLiAgWW91IGNhbiBoZWxwIHVzIG91dCBieSBzaGFyaW5nIHRoZSBiZWxvdyBlcnJvciBtZXNzYWdlIGluIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJyB0YXJnZXQ9J19ibGFuayc+TEJSWSBkaXNjb3JkPC9hPi48L3A+XG4gICAgICAgICAgPGk+PHAgaWQ9J2Vycm9yLW1lc3NhZ2UnPntlcnJvcn08L3A+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gQVZBSUxBQkxFKSAmJlxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9IC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx2aWRlbyBjbGFzc05hbWU9J2Fzc2V0IHZpZGVvJyBjb250cm9scyBwb3N0ZXI9e3RodW1ibmFpbH0+XG4gICAgICAgICAgICAgICAgICA8c291cmNlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHA+WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIDxjb2RlPnZpZGVvPC9jb2RlPiBlbGVtZW50LjwvcD5cbiAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cD5VbnN1cHBvcnRlZCBmaWxlIHR5cGU8L3A+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0RGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCBhc3NldCBpbmZvXG4gIGxldCBhc3NldDtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICBjb25zdCBhc3NldExpc3QgPSBzaG93LmFzc2V0TGlzdDtcbiAgaWYgKHJlcXVlc3QgJiYgYXNzZXRMaXN0KSB7XG4gICAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTsgIC8vIG5vdGU6IGp1c3Qgc3RvcmUgdGhpcyBpbiB0aGUgcmVxdWVzdFxuICAgIGFzc2V0ID0gYXNzZXRMaXN0W2Fzc2V0S2V5XSB8fCBudWxsO1xuICB9O1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAncGFnZXMvRXJyb3JQYWdlJztcbmltcG9ydCBBc3NldFRpdGxlIGZyb20gJ2NvbnRhaW5lcnMvQXNzZXRUaXRsZSc7XG5pbXBvcnQgQXNzZXREaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5JztcbmltcG9ydCBBc3NldEluZm8gZnJvbSAnY29udGFpbmVycy9Bc3NldEluZm8nO1xuXG5jbGFzcyBTaG93QXNzZXREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBjbGFpbURhdGE6IHsgbmFtZSB9IH0gPSBhc3NldDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e2Ake25hbWV9IC0gZGV0YWlsc2B9IGFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPEFzc2V0VGl0bGUgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHNob3ctZGV0YWlscy1jb250YWluZXInPlxuICAgICAgICAgICAgICAgIDxBc3NldERpc3BsYXkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgICAgIDxBc3NldEluZm8gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGFzc2V0IGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dBc3NldERldGFpbHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIGNvbnN0IHsgY2xhaW1EYXRhOiB7IHRpdGxlIH0gfSA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICByZXR1cm4ge1xuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEFzc2V0VGl0bGUgPSAoeyB0aXRsZSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dC0tbGFyZ2UnPnt0aXRsZX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFRpdGxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgYXNzZXRcbiAgY29uc3QgYXNzZXQgPSBzZWxlY3RBc3NldChzaG93KTtcbiAgLy8gIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRJbmZvL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY2xhc3MgQXNzZXRJbmZvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkID0gdGhpcy5jb3B5VG9DbGlwYm9hcmQuYmluZCh0aGlzKTtcbiAgfVxuICBjb3B5VG9DbGlwYm9hcmQgKGV2ZW50KSB7XG4gICAgdmFyIGVsZW1lbnRUb0NvcHkgPSBldmVudC50YXJnZXQuZGF0YXNldC5lbGVtZW50dG9jb3B5O1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvQ29weSk7XG4gICAgZWxlbWVudC5zZWxlY3QoKTtcbiAgICB0cnkge1xuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiAnT29wcywgdW5hYmxlIHRvIGNvcHknfSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldDogeyBzaG9ydElkLCBjbGFpbURhdGEgOiB7IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBkZXNjcmlwdGlvbiwgbmFtZSwgY2xhaW1JZCwgZmlsZUV4dCwgY29udGVudFR5cGUsIHRodW1ibmFpbCwgaG9zdCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHtjaGFubmVsTmFtZSAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5DaGFubmVsOjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPjxMaW5rIHRvPXtgLyR7Y2hhbm5lbE5hbWV9OiR7Y2VydGlmaWNhdGVJZH1gfT57Y2hhbm5lbE5hbWV9PC9MaW5rPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICB7ZGVzY3JpcHRpb24gJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+e2Rlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICA8ZGl2IGlkPSdzaG93LXNoYXJlLWJ1dHRvbnMnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5TaGFyZTo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlIGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tYm90dG9tIGZsZXgtY29udGFpbmVyLS13cmFwJz5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR3aXR0ZXI8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+ZmFjZWJvb2s8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHA6Ly90dW1ibHIuY29tL3dpZGdldHMvc2hhcmUvdG9vbD9jYW5vbmljYWxVcmw9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT50dW1ibHI8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vc3VibWl0P3VybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfSZ0aXRsZT0ke25hbWV9YH0+cmVkZGl0PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPGRpdiBpZD0nc2hvdy1zaG9ydC1saW5rJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5MaW5rOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtZXJyb3InIGlkPSdpbnB1dC1lcnJvci1jb3B5LXNob3J0LWxpbmsnIGhpZGRlbj0ndHJ1ZSc+ZXJyb3IgaGVyZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdzaG9ydC1saW5rJyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgIHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YCR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdzaG9ydC1saW5rJ1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LWVtYmVkLWNvZGUnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkVtYmVkOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtZXJyb3InIGlkPSdpbnB1dC1lcnJvci1jb3B5LWVtYmVkLXRleHQnIGhpZGRlbj0ndHJ1ZSc+ZXJyb3IgaGVyZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgeyhjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL21wNCcpID8gKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2VtYmVkLXRleHQnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2A8dmlkZW8gd2lkdGg9XCIxMDAlXCIgY29udHJvbHMgcG9zdGVyPVwiJHt0aHVtYm5haWx9XCIgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz48L3ZpZGVvPmB9IC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2VtYmVkLXRleHQnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2A8aW1nIHNyYz1cIiR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1cIi8+YH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEnIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTInPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLXdpZGUnIGRhdGEtZWxlbWVudHRvY29weT0nZW1iZWQtdGV4dCdcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jb3B5VG9DbGlwYm9hcmR9PmNvcHlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20nPlxuICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdG89e2AvJHtzaG9ydElkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfT48c3BhblxuICAgICAgICAgICAgY2xhc3NOYW1lPSd0ZXh0Jz5EaXJlY3QgTGluazwvc3Bhbj48L0xpbms+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPXtgJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9IGRvd25sb2FkPXtuYW1lfT5Eb3dubG9hZDwvYT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZG1jYSc+UmVwb3J0PC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRJbmZvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRJbmZvL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IHJlcXVlc3RcbiAgY29uc3QgcHJldmlvdXNSZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIC8vIHNlbGVjdCBjaGFubmVsXG4gIGxldCBjaGFubmVsO1xuICBpZiAocHJldmlvdXNSZXF1ZXN0KSB7XG4gICAgY29uc3QgY2hhbm5lbEtleSA9IHByZXZpb3VzUmVxdWVzdC5rZXk7XG4gICAgY2hhbm5lbCA9IHNob3cuY2hhbm5lbExpc3RbY2hhbm5lbEtleV0gfHwgbnVsbDtcbiAgfVxuICByZXR1cm4ge1xuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAncGFnZXMvRXJyb3JQYWdlJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IENoYW5uZWxDbGFpbXNEaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXknO1xuXG5jbGFzcyBTaG93Q2hhbm5lbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChjaGFubmVsKSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGxvbmdJZCwgc2hvcnRJZCB9ID0gY2hhbm5lbDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e25hbWV9IGNoYW5uZWw9e2NoYW5uZWx9IC8+XG4gICAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxoMj5jaGFubmVsIG5hbWU6IHtuYW1lfTwvaDI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17J2ZpbmUtcHJpbnQnfT5mdWxsIGNoYW5uZWwgaWQ6IHtsb25nSWR9PC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eydmaW5lLXByaW50J30+c2hvcnQgY2hhbm5lbCBpZDoge3Nob3J0SWR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8Q2hhbm5lbENsYWltc0Rpc3BsYXkgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yUGFnZSBlcnJvcj17J2xvYWRpbmcgY2hhbm5lbCBkYXRhLi4uJ30gLz5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93Q2hhbm5lbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uVXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGNoYW5uZWwga2V5XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSByZXF1ZXN0LmtleTtcbiAgLy8gc2VsZWN0IGNoYW5uZWwgY2xhaW1zXG4gIGNvbnN0IGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxLZXksXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25VcGRhdGVDaGFubmVsQ2xhaW1zLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXNzZXRQcmV2aWV3IGZyb20gJ2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3JztcblxuY2xhc3MgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlID0gdGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgfVxuICBzaG93UHJldmlvdXNSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKSAtIDE7XG4gICAgdGhpcy5zaG93TmV3UGFnZShwcmV2aW91c1BhZ2UpO1xuICB9XG4gIHNob3dOZXh0UmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKSArIDE7XG4gICAgdGhpcy5zaG93TmV3UGFnZShuZXh0UGFnZSk7XG4gIH1cbiAgc2hvd05ld1BhZ2UgKHBhZ2UpIHtcbiAgICBjb25zdCB7IGNoYW5uZWxLZXksIGNoYW5uZWw6IHsgbmFtZSwgbG9uZ0lkIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vblVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGNsYWltcywgY3VycmVudFBhZ2UsIHRvdGFsUGFnZXMgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCc+XG4gICAgICAgIHsoY2xhaW1zLmxlbmd0aCA+IDApID8gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7Y2xhaW1zLm1hcCgoY2xhaW0sIGluZGV4KSA9PiA8QXNzZXRQcmV2aWV3XG4gICAgICAgICAgICAgIGNsYWltRGF0YT17Y2xhaW19XG4gICAgICAgICAgICAgIGtleT17YCR7Y2xhaW0ubmFtZX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgLz4pfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgeyhjdXJyZW50UGFnZSA+IDEpICYmXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnYnV0dG9uLS1zZWNvbmRhcnknfSBvbkNsaWNrPXt0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlfT5QcmV2aW91cyBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgeyhjdXJyZW50UGFnZSA8IHRvdGFsUGFnZXMpICYmXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnYnV0dG9uLS1zZWNvbmRhcnknfSBvbkNsaWNrPXt0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2V9Pk5leHQgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cD5UaGVyZSBhcmUgbm8gY2xhaW1zIGluIHRoaXMgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxDbGFpbXNEaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHtzaXRlOiB7ZGVmYXVsdHM6IHsgZGVmYXVsdFRodW1ibmFpbCB9fX0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkZWZhdWx0VGh1bWJuYWlsLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY29uc3QgQXNzZXRQcmV2aWV3ID0gKHsgZGVmYXVsdFRodW1ibmFpbCwgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwgfSB9KSA9PiB7XG4gIGNvbnN0IGRpcmVjdFNvdXJjZUxpbmsgPSBgJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gO1xuICBjb25zdCBzaG93VXJsTGluayA9IGAvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nYXNzZXQtaG9sZGVyJz5cbiAgICAgIDxMaW5rIHRvPXtzaG93VXJsTGlua30gPlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydhc3NldC1wcmV2aWV3J31cbiAgICAgICAgICAgICAgICAgIHNyYz17ZGlyZWN0U291cmNlTGlua31cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydhc3NldC1wcmV2aWV3IHZpZGVvJ31cbiAgICAgICAgICAgICAgICAgIHNyYz17dGh1bWJuYWlsIHx8IGRlZmF1bHRUaHVtYm5haWx9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+dW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKX1cbiAgICAgIDwvTGluaz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0UHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaXRlOiB7IGhvc3QsIHRpdGxlIH0gfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNsYXNzIEZvdXJPaEZvclBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHt0aXRsZSwgaG9zdH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8SGVsbWV0PlxuICAgICAgICAgIDx0aXRsZT57dGl0bGV9IC0gNDA0PC90aXRsZT5cbiAgICAgICAgICA8bGluayByZWw9J2Nhbm9uaWNhbCcgaHJlZj17YCR7aG9zdH0vNDA0YH0gLz5cbiAgICAgICAgPC9IZWxtZXQ+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGgyPjQwNDwvaDI+XG4gICAgICAgICAgPHA+VGhhdCBwYWdlIGRvZXMgbm90IGV4aXN0PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZvdXJPaEZvclBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Gb3VyT2hGb3VyUGFnZS92aWV3LmpzeCIsImNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qgc2VuZEVtYmVkUGFnZSA9ICh7IHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIC8vIGdldCBhbmQgcmVuZGVyIHRoZSBjb250ZW50XG4gIHJlcy5zdGF0dXMoMjAwKS5yZW5kZXIoJ2VtYmVkJywgeyBsYXlvdXQ6ICdlbWJlZCcsIGhvc3QsIGNsYWltSWQsIG5hbWUgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRFbWJlZFBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRFbWJlZFBhZ2UuanMiLCJjb25zdCByZWRpcmVjdCA9IChyb3V0ZSkgPT4ge1xuICByZXR1cm4gKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KHJvdXRlKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVkaXJlY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3JlZGlyZWN0LmpzIiwiY29uc3Qgc2VydmVBc3NldEJ5Q2xhaW0gPSByZXF1aXJlKCcuL3NlcnZlQXNzZXRCeUNsYWltJyk7XG5jb25zdCBzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0gPSByZXF1aXJlKCcuL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHAsIGRiKSA9PiB7XG4gIGFwcC5nZXQoJy86aWRlbnRpZmllci86Y2xhaW0nLCBzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0pO1xuICBhcHAuZ2V0KCcvOmNsYWltJywgc2VydmVBc3NldEJ5Q2xhaW0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL2luZGV4LmpzIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3QgeyBkZXRlcm1pbmVSZXNwb25zZVR5cGUsIGxvZ1JlcXVlc3REYXRhLCBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCB9ID0gcmVxdWlyZSgnaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VydmUgYW4gYXNzZXQgb3IgdGhlIHJlYWN0IGFwcCB2aWEgdGhlIGNsYWltIG5hbWUgb25seVxuXG4qL1xuXG5jb25zdCBzZXJ2ZXJBc3NldEJ5Q2xhaW0gPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICB9XG4gIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gIC8vIHBhcnNlIHRoZSBjbGFpbVxuICBsZXQgY2xhaW1OYW1lO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgbnVsbCwgbnVsbCk7XG4gIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KG51bGwsIG51bGwsIGNsYWltTmFtZSwgbnVsbCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJBc3NldEJ5Q2xhaW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlDbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCJcbi8vIG1vZHVsZSBpZCA9IDE3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgb25SZXF1ZXN0RXJyb3IsIG9uTmV3Q2hhbm5lbFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IG5ld0Fzc2V0UmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfYXNzZXQnO1xuaW1wb3J0IHsgbmV3Q2hhbm5lbFJlcXVlc3QgfSBmcm9tICdzYWdhcy9zaG93X2NoYW5uZWwnO1xuaW1wb3J0IGxicnlVcmkgZnJvbSAndXRpbHMvbGJyeVVyaSc7XG5cbmZ1bmN0aW9uICogcGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0gKG1vZGlmaWVyLCBjbGFpbSkge1xuICAvLyB0aGlzIGlzIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXRcbiAgLy8gY2xhaW0gd2lsbCBiZSBhbiBhc3NldCBjbGFpbVxuICAvLyB0aGUgaWRlbnRpZmllciBjb3VsZCBiZSBhIGNoYW5uZWwgb3IgYSBjbGFpbSBpZFxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQsIGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihtb2RpZmllcikpO1xuICAgICh7IGNsYWltTmFtZSwgZXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICBpZiAoaXNDaGFubmVsKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIG51bGwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgZXh0ZW5zaW9uKSk7XG4gIH07XG4gIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIGNsYWltSWQsIG51bGwsIG51bGwsIGV4dGVuc2lvbikpO1xufVxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUNsYWltT25seSAoY2xhaW0pIHtcbiAgLy8gdGhpcyBjb3VsZCBiZSBhIHJlcXVlc3QgZm9yIGFuIGFzc2V0IG9yIGEgY2hhbm5lbCBwYWdlXG4gIC8vIGNsYWltIGNvdWxkIGJlIGFuIGFzc2V0IGNsYWltIG9yIGEgY2hhbm5lbCBjbGFpbVxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gdHJpZ2dlciBhbiBuZXcgYWN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RvcmVcbiAgLy8gcmV0dXJuIGVhcmx5IGlmIHRoaXMgcmVxdWVzdCBpcyBmb3IgYSBjaGFubmVsXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdDaGFubmVsUmVxdWVzdCwgb25OZXdDaGFubmVsUmVxdWVzdChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpKTtcbiAgfVxuICAvLyBpZiBub3QgZm9yIGEgY2hhbm5lbCwgcGFyc2UgdGhlIGNsYWltIHJlcXVlc3RcbiAgbGV0IGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lLCBleHRlbnNpb259ID0gbGJyeVVyaS5wYXJzZUNsYWltKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIGhhbmRsZVNob3dQYWdlVXJpIChhY3Rpb24pIHtcbiAgY29uc3QgeyBpZGVudGlmaWVyLCBjbGFpbSB9ID0gYWN0aW9uLmRhdGE7XG4gIGlmIChpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0sIGlkZW50aWZpZXIsIGNsYWltKTtcbiAgfVxuICB5aWVsZCBjYWxsKHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5LCBjbGFpbSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaEhhbmRsZVNob3dQYWdlVXJpICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSwgaGFuZGxlU2hvd1BhZ2VVcmkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsImltcG9ydCB7IGNhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCBhZGRBc3NldFRvQXNzZXRMaXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldExvbmdDbGFpbUlkLCBnZXRTaG9ydElkLCBnZXRDbGFpbURhdGEgfSBmcm9tICdhcGkvYXNzZXRBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0Fzc2V0UmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgbmFtZSwgbW9kaWZpZXIgfSA9IGFjdGlvbi5kYXRhO1xuICAvLyBwdXQgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBpbiByZWR1eFxuICB5aWVsZCBwdXQob25SZXF1ZXN0VXBkYXRlKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyByZXF1ZXN0P1xuICAvLyBJZiB0aGlzIHVyaSBpcyBpbiB0aGUgcmVxdWVzdCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGNvbnN0IHN0YXRlID0geWllbGQgc2VsZWN0KHNlbGVjdFNob3dTdGF0ZSk7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBpZiAoc3RhdGUucmVxdWVzdExpc3RbcmVxdWVzdElkXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBsb25nIGlkICYmIGFkZCByZXF1ZXN0IHRvIHJlcXVlc3QgbGlzdFxuICBsZXQgbG9uZ0lkO1xuICB0cnkge1xuICAgICh7ZGF0YTogbG9uZ0lkfSA9IHlpZWxkIGNhbGwoZ2V0TG9uZ0NsYWltSWQsIGhvc3QsIG5hbWUsIG1vZGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgY29uc3QgYXNzZXRLZXkgPSBgYSMke25hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGFzc2V0S2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgYXNzZXQ/XG4gIC8vIElmIHRoaXMgYXNzZXQgaXMgaW4gdGhlIGFzc2V0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmFzc2V0TGlzdFthc3NldEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgc2hvcnQgSWRcbiAgbGV0IHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBzaG9ydElkfSA9IHlpZWxkIGNhbGwoZ2V0U2hvcnRJZCwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gZ2V0IGFzc2V0IGNsYWltIGRhdGFcbiAgbGV0IGNsYWltRGF0YTtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGNsYWltRGF0YX0gPSB5aWVsZCBjYWxsKGdldENsYWltRGF0YSwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gYWRkIGFzc2V0IHRvIGFzc2V0IGxpc3RcbiAgeWllbGQgcHV0KGFkZEFzc2V0VG9Bc3NldExpc3QoYXNzZXRLZXksIG51bGwsIG5hbWUsIGxvbmdJZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSk7XG4gIC8vIGNsZWFyIGFueSBlcnJvcnMgaW4gcmVxdWVzdCBlcnJvclxuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hOZXdBc3NldFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsIG5ld0Fzc2V0UmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvbmdDbGFpbUlkIChob3N0LCBuYW1lLCBtb2RpZmllcikge1xuICBsZXQgYm9keSA9IHt9O1xuICAvLyBjcmVhdGUgcmVxdWVzdCBwYXJhbXNcbiAgaWYgKG1vZGlmaWVyKSB7XG4gICAgaWYgKG1vZGlmaWVyLmlkKSB7XG4gICAgICBib2R5WydjbGFpbUlkJ10gPSBtb2RpZmllci5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keVsnY2hhbm5lbE5hbWUnXSA9IG1vZGlmaWVyLmNoYW5uZWwubmFtZTtcbiAgICAgIGJvZHlbJ2NoYW5uZWxDbGFpbUlkJ10gPSBtb2RpZmllci5jaGFubmVsLmlkO1xuICAgIH1cbiAgfVxuICBib2R5WydjbGFpbU5hbWUnXSA9IG5hbWU7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH07XG4gIC8vIGNyZWF0ZSB1cmxcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2xvbmctaWRgO1xuICAvLyByZXR1cm4gdGhlIHJlcXVlc3QgcHJvbWlzZVxuICByZXR1cm4gUmVxdWVzdCh1cmwsIHBhcmFtcyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnRJZCAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vc2hvcnQtaWQvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFpbURhdGEgKGhvc3QsIG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2RhdGEvJHtuYW1lfS8ke2NsYWltSWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwiaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0LCBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgdXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDaGFubmVsRGF0YSB9IGZyb20gJ2FwaS9jaGFubmVsQXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcbmltcG9ydCB7IHNlbGVjdFNpdGVIb3N0IH0gZnJvbSAnc2VsZWN0b3JzL3NpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdDaGFubmVsUmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgbG9uZyBpZFxuICBsZXQgbG9uZ0lkLCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7IGRhdGE6IHtsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdJZCwgc2hvcnRDaGFubmVsQ2xhaW1JZDogc2hvcnRJZH0gfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbERhdGEsIGhvc3QsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgcmVxdWVzdCBpbiB0aGUgY2hhbm5lbCByZXF1ZXN0cyBsaXN0XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSBgYyMke2NoYW5uZWxOYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBjaGFubmVsS2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgY2hhbm5lbD9cbiAgLy8gSWYgdGhpcyBjaGFubmVsIGlzIGluIHRoZSBjaGFubmVsIGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgY2xhaW1zIGRhdGFcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIGNoYW5uZWxOYW1lLCAxKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gc3RvcmUgdGhlIGNoYW5uZWwgZGF0YSBpbiB0aGUgY2hhbm5lbCBsaXN0XG4gIHlpZWxkIHB1dChhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdChjaGFubmVsS2V5LCBjaGFubmVsTmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSk7XG4gIC8vIGNsZWFyIGFueSByZXF1ZXN0IGVycm9yc1xuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsIG5ld0NoYW5uZWxSZXF1ZXN0KTtcbn07XG5cbmZ1bmN0aW9uICogZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlIH0gPSBhY3Rpb24uZGF0YTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGxldCBjbGFpbXNEYXRhO1xuICB0cnkge1xuICAgICh7IGRhdGE6IGNsYWltc0RhdGEgfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbENsYWltcywgaG9zdCwgbG9uZ0lkLCBuYW1lLCBwYWdlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgcHV0KHVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgY2xhaW1zRGF0YSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaFVwZGF0ZUNoYW5uZWxDbGFpbXMgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DLCBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxEYXRhIChob3N0LCBpZCwgbmFtZSkge1xuICBpZiAoIWlkKSBpZCA9ICdub25lJztcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvZGF0YS8ke25hbWV9LyR7aWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFubmVsQ2xhaW1zIChob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpIHtcbiAgaWYgKCFwYWdlKSBwYWdlID0gMTtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvY2xhaW1zLyR7bmFtZX0vJHtsb25nSWR9LyR7cGFnZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvY2hhbm5lbEFwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXggIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIGFmdGVyIFwiQFwiLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQ6IGNoYW5uZWxDbGFpbUlkIHx8IG51bGwsXG4gICAgICBjbGFpbUlkICAgICAgIDogY2xhaW1JZCB8fCBudWxsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgZXh0ZW5zaW9uKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIGV4dGVuc2lvbiBzZXBhcmF0b3IsIGV4dGVuc2lvbiAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBleHRlbnNpb25TZXBlcmF0b3IsIGV4dGVuc2lvbl0gPSBjb21wb25lbnRzUmVnZXggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMobmFtZSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIi5cIicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIGV4dGVuc2lvblxuICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IpIHtcbiAgICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIi5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIgc2VwYXJhdG9yIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWUuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgICBleHRlbnNpb246IGV4dGVuc2lvbiB8fCBudWxsLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2xicnlVcmkuanMiLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7XG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSxcbiAgbG9nUmVxdWVzdERhdGEsXG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0LFxufSA9IHJlcXVpcmUoJ2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VydmUgYW4gYXNzZXQgb3IgdGhlIHJlYWN0IGFwcCB2aWEgdGhlIGNsYWltIG5hbWUgYW5kIGFuIGlkZW50aWZpZXJcblxuKi9cblxuY29uc3Qgc2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSA9IChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gIH1cbiAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgLy8gcGFyc2UgdGhlIGNsYWltXG4gIGxldCBjbGFpbU5hbWU7XG4gIHRyeSB7XG4gICAgKHsgY2xhaW1OYW1lIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIHBhcnNlIHRoZSBpZGVudGlmaWVyXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIocGFyYW1zLmlkZW50aWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgaWYgKCFpc0NoYW5uZWwpIHtcbiAgICBbY2xhaW1JZCwgY2xhaW1OYW1lXSA9IGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkoY2xhaW1JZCwgY2xhaW1OYW1lKTtcbiAgfVxuICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCk7XG4gIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0uanMiLCJjb25zdCBoYW5kbGVQYWdlUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZFJlYWN0QXBwJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcclxuICBhcHAuZ2V0KCcqJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcblxuY29uc3Qgc2VuZFJlYWN0QXBwID0gKHJlcSwgcmVzKSA9PiB7XG4gIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUmVhY3RBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL3NlbmRSZWFjdEFwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=