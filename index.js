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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Server = __webpack_require__(4);

var _exports = {
  Server: Server
};

module.exports = _exports;

/***/ }),
/* 4 */
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
var logger = __webpack_require__(7);
var requestLogger = __webpack_require__(62);
var Path = __webpack_require__(63);
var loggerConfig = __webpack_require__(64);
var mysqlConfig = __webpack_require__(32);
var siteConfig = __webpack_require__(9);
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
    if (siteConfig.routes.public) {
      // take in a different public folder, so it can serve it's own bundle if needed
      var publicFolder = siteConfig.routes.publicFolder;

      app.use(express.static(publicFolder));
      logger.info('serving static files from custom path:', publicFolder);
    } else {
      var publicPath = Path.resolve(__dirname, 'public');
      app.use(express.static(publicPath));
      logger.info('serving static files from default path:', publicPath);
    };
    // 'body parser' for parsing application/json
    app.use(bodyParser.json());
    // 'body parser' for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // add custom middleware (note: build out to accept dynamically use what is in server/middleware/
    app.use(requestLogger);

    // configure passport
    var speechPassport = __webpack_require__(25);
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
    var db = __webpack_require__(10);
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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(7);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Certificate = __webpack_require__(69);
var Channel = __webpack_require__(70);
var Claim = __webpack_require__(71);
var File = __webpack_require__(72);
var Request = __webpack_require__(73);
var User = __webpack_require__(74);

var Sequelize = __webpack_require__(35);
var logger = __webpack_require__(7);

var _require = __webpack_require__(32),
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
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 12 */
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

var _publish_action_types = __webpack_require__(39);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(6);

var _channel = __webpack_require__(29);

var _publish = __webpack_require__(12);

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
/* 14 */
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

var _show_action_types = __webpack_require__(20);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(7);
var ua = __webpack_require__(79);

var _require = __webpack_require__(9),
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(6);

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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(77);
var logger = __webpack_require__(7);

var _require = __webpack_require__(78),
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(10);
var logger = __webpack_require__(7);

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
/* 23 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(7);
var db = __webpack_require__(10);
var lbryApi = __webpack_require__(19);
var publishHelpers = __webpack_require__(27);

var _require = __webpack_require__(9),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(35);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(7);
var fs = __webpack_require__(88);

var _require = __webpack_require__(9),
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
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(17);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(17);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NavBar = __webpack_require__(13);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(7);

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
/* 33 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 34 */
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
/* 35 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(37);

var _redux = __webpack_require__(28);

var _reducers = __webpack_require__(38);

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRedux = __webpack_require__(6);

var _reactRouterDom = __webpack_require__(11);

var _GAListener = __webpack_require__(43);

var _GAListener2 = _interopRequireDefault(_GAListener);

var _app = __webpack_require__(44);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(50);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(23);

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
/* 37 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(28);

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
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = exports.LOGIN = 'Existing';
var CREATE = exports.CREATE = 'New';

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactGa = __webpack_require__(111);

var _reactGa2 = _interopRequireDefault(_reactGa);

var _reactRouterDom = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(9),
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(6);

var _publish = __webpack_require__(12);

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(6);

var _channel = __webpack_require__(29);

var _view = __webpack_require__(140);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(12);

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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(6);

var _channel = __webpack_require__(29);

var _view = __webpack_require__(141);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(12);

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

var _reactRedux = __webpack_require__(6);

var _view = __webpack_require__(156);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(14);

var _show2 = __webpack_require__(21);

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


var logger = __webpack_require__(7);

var _require = __webpack_require__(22),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(8),
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(7);

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(37);

var _redux = __webpack_require__(28);

var _index = __webpack_require__(38);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(6);

var _reactRouterDom = __webpack_require__(11);

var _index3 = __webpack_require__(43);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(44);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(50);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(175);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(24);

var _show_uri = __webpack_require__(176);

var _show = __webpack_require__(14);

var _reactHelmet = __webpack_require__(23);

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
/* 54 */
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


var logger = __webpack_require__(7);

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


var logger = __webpack_require__(7);

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
var winston = __webpack_require__(7);

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


var PassportLocalStrategy = __webpack_require__(33).Strategy;
var logger = __webpack_require__(7);
var db = __webpack_require__(10);

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


var logger = __webpack_require__(7);

var _require = __webpack_require__(34),
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


var logger = __webpack_require__(7);

var _require = __webpack_require__(34),
    returnShortId = _require.returnShortId;

var _require2 = __webpack_require__(9),
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
var logger = __webpack_require__(7);

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

var PassportLocalStrategy = __webpack_require__(33).Strategy;
var lbryApi = __webpack_require__(19);
var logger = __webpack_require__(7);
var db = __webpack_require__(10);

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


var speechPassport = __webpack_require__(25);
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


var speechPassport = __webpack_require__(25);

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


var _require = __webpack_require__(26),
    checkChannelAvailability = _require.checkChannelAvailability;

var _require2 = __webpack_require__(15),
    sendGATimingEvent = _require2.sendGATimingEvent;

var _require3 = __webpack_require__(8),
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


var _require = __webpack_require__(22),
    getChannelClaims = _require.getChannelClaims;

var _require2 = __webpack_require__(8),
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


var _require = __webpack_require__(22),
    getChannelData = _require.getChannelData;

var _require2 = __webpack_require__(8),
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


var _require = __webpack_require__(8),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(10);

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


var _require = __webpack_require__(26),
    claimNameIsAvailable = _require.claimNameIsAvailable;

var _require2 = __webpack_require__(15),
    sendGATimingEvent = _require2.sendGATimingEvent;

var _require3 = __webpack_require__(8),
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


var _require = __webpack_require__(8),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(10);

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

var _require = __webpack_require__(19),
    getClaim = _require.getClaim;

var _require2 = __webpack_require__(27),
    addGetResultsToFileData = _require2.addGetResultsToFileData,
    createFileData = _require2.createFileData;

var _require3 = __webpack_require__(8),
    handleErrorResponse = _require3.handleErrorResponse;

var db = __webpack_require__(10);

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


var _require = __webpack_require__(22),
    getClaimId = _require.getClaimId;

var _require2 = __webpack_require__(8),
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

var _require = __webpack_require__(27),
    createBasicPublishParams = _require.createBasicPublishParams,
    createThumbnailPublishParams = _require.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require.parsePublishApiRequestFiles;

var _require2 = __webpack_require__(26),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    publish = _require2.publish;

var _require3 = __webpack_require__(98),
    authenticateUser = _require3.authenticateUser;

var _require4 = __webpack_require__(15),
    sendGATimingEvent = _require4.sendGATimingEvent;

var _require5 = __webpack_require__(8),
    handleErrorResponse = _require5.handleErrorResponse;

var _require6 = __webpack_require__(9),
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


var db = __webpack_require__(10);
var logger = __webpack_require__(7);

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


var _require = __webpack_require__(19),
    resolveUri = _require.resolveUri;

var _require2 = __webpack_require__(8),
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


var _require = __webpack_require__(8),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(10);

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


var _require = __webpack_require__(19),
    getClaimList = _require.getClaimList;

var _require2 = __webpack_require__(8),
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


var _require = __webpack_require__(8),
    handleErrorResponse = _require.handleErrorResponse;

var db = __webpack_require__(10);

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

var _require = __webpack_require__(9),
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


var handlePageRender = __webpack_require__(36);

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

var _publish_action_types = __webpack_require__(39);

var actions = _interopRequireWildcard(_publish_action_types);

var _publish_channel_select_states = __webpack_require__(40);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(9),
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

var _show_action_types = __webpack_require__(20);

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

var siteConfig = __webpack_require__(9);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(16);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(13);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(23);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _propTypes = __webpack_require__(17);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

var _Logo = __webpack_require__(118);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(119);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _request = __webpack_require__(18);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

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

var _react = __webpack_require__(5);

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

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _Dropzone = __webpack_require__(45);

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

var _react = __webpack_require__(5);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(17);

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

var _reactRedux = __webpack_require__(6);

var _publish = __webpack_require__(12);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

var _Dropzone = __webpack_require__(45);

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

var _reactRedux = __webpack_require__(6);

var _publish = __webpack_require__(12);

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

var _react = __webpack_require__(5);

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

var _publish = __webpack_require__(12);

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(18);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(17);

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

var _reactRedux = __webpack_require__(6);

var _publish = __webpack_require__(12);

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

var _react = __webpack_require__(5);

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

var _reactRedux = __webpack_require__(6);

var _publish = __webpack_require__(12);

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

var _react = __webpack_require__(5);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(17);

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

var _reactRedux = __webpack_require__(6);

var _publish = __webpack_require__(12);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _ChannelLoginForm = __webpack_require__(46);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(47);

var _ChannelCreateForm2 = _interopRequireDefault(_ChannelCreateForm);

var _publish_channel_select_states = __webpack_require__(40);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(18);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(30);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _request = __webpack_require__(18);

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

var _react = __webpack_require__(5);

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

var _react = __webpack_require__(5);

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

var _reactRedux = __webpack_require__(6);

var _publish = __webpack_require__(12);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(30);

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

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _NavBar = __webpack_require__(13);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _SEO = __webpack_require__(16);

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

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

var _SEO = __webpack_require__(16);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(13);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelLoginForm = __webpack_require__(46);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(47);

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

var _reactRedux = __webpack_require__(6);

var _show = __webpack_require__(14);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = __webpack_require__(31);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _ShowAssetLite = __webpack_require__(154);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(157);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(163);

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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(16);

var _SEO2 = _interopRequireDefault(_SEO);

var _reactRouterDom = __webpack_require__(11);

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
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(30);

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
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(16);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(13);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ErrorPage = __webpack_require__(31);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(159);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(49);

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

var _reactRedux = __webpack_require__(6);

var _view = __webpack_require__(160);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(21);

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

var _react = __webpack_require__(5);

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

var _reactRedux = __webpack_require__(6);

var _view = __webpack_require__(162);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(21);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

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

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(16);

var _SEO2 = _interopRequireDefault(_SEO);

var _ErrorPage = __webpack_require__(31);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(13);

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

var _reactRedux = __webpack_require__(6);

var _show = __webpack_require__(14);

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

var _react = __webpack_require__(5);

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

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

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

var _reactRedux = __webpack_require__(6);

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

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _NavBar = __webpack_require__(13);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _reactHelmet = __webpack_require__(23);

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


var _require = __webpack_require__(9),
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


var _require = __webpack_require__(15),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(51),
    determineResponseType = _require2.determineResponseType,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(52);
var handleShowRender = __webpack_require__(53);
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

var _effects = __webpack_require__(24);

var _show_action_types = __webpack_require__(20);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(14);

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

var _effects = __webpack_require__(24);

var _show_action_types = __webpack_require__(20);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(14);

var _assetApi = __webpack_require__(178);

var _show2 = __webpack_require__(21);

var _site = __webpack_require__(54);

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

var _request = __webpack_require__(18);

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

var _effects = __webpack_require__(24);

var _show_action_types = __webpack_require__(20);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(14);

var _channelApi = __webpack_require__(180);

var _show2 = __webpack_require__(21);

var _site = __webpack_require__(54);

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

var _request = __webpack_require__(18);

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

var _require = __webpack_require__(15),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(51),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(52);
var handleShowRender = __webpack_require__(53);

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


var handlePageRender = __webpack_require__(36);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWRiNGJhMTgzZjA2ODE4NTg2YzkiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIiIsIndlYnBhY2s6Ly8vLi9zcGVlY2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9zaG93LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9TRU8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc3BlZWNoUGFzc3BvcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy8uL3NlcnZlci9taWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy8uL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL3NsYWNrQ29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9maWxlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy8uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInVuaXZlcnNhbC1hbmFseXRpY3NcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3NpZ251cC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ291dC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2F1dGgvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbENsYWltcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1HZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1Mb25nSWQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1QdWJsaXNoLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVNob3J0SWQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1MaXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2ZpbGVBdmFpbGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb25uZWN0LW11bHRpcGFydHlcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZFJlYWN0QXBwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaXRlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWdhXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0hvbWVQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9TRU8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3BhZ2VUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvbWV0YVRhZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL2ZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9BYm91dFBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRJbmZvL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZEVtYmVkUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3JlZGlyZWN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUNsYWltLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2FcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd191cmkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9hc3NldEFwaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hcGkvY2hhbm5lbEFwaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvbGJyeVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL3NlbmRSZWFjdEFwcC5qcyJdLCJuYW1lcyI6WyJTZXJ2ZXIiLCJyZXF1aXJlIiwiZXhwb3J0cyIsIm1vZHVsZSIsImV4cHJlc3MiLCJib2R5UGFyc2VyIiwiZXhwcmVzc0hhbmRsZWJhcnMiLCJIYW5kbGViYXJzIiwiaGVsbWV0IiwiY29va2llU2Vzc2lvbiIsImh0dHAiLCJsb2dnZXIiLCJyZXF1ZXN0TG9nZ2VyIiwiUGF0aCIsImxvZ2dlckNvbmZpZyIsIm15c3FsQ29uZmlnIiwic2l0ZUNvbmZpZyIsInNsYWNrQ29uZmlnIiwiY29uZmlndXJlTG9nZ2VyIiwidXNlckNvbmZpZyIsInVwZGF0ZSIsImNvbmZpZ3VyZU15c3FsIiwiY29uZmlndXJlU2l0ZURldGFpbHMiLCJjb25maWd1cmVTbGFjayIsImNvbmZpZ3VyZUNsaWVudEJ1bmRsZSIsImRlYnVnIiwiY29uZmlndXJlTW9kZWxzIiwiY29uZmlndXJlUm91dGVzIiwiY3JlYXRlQXBwIiwiYXBwIiwiZW5hYmxlIiwidXNlIiwicm91dGVzIiwicHVibGljIiwicHVibGljRm9sZGVyIiwic3RhdGljIiwiaW5mbyIsInB1YmxpY1BhdGgiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInNwZWVjaFBhc3Nwb3J0Iiwic2Vzc2lvbktleSIsImF1dGgiLCJuYW1lIiwia2V5cyIsIm1heEFnZSIsImluaXRpYWxpemUiLCJzZXNzaW9uIiwiaGJzIiwiY3JlYXRlIiwiZGVmYXVsdExheW91dCIsImhhbmRsZWJhcnMiLCJlbmdpbmUiLCJzZXQiLCJzZXJ2ZXIiLCJzdGFydCIsImRiIiwiUE9SVCIsImRldGFpbHMiLCJwb3J0Iiwic2VxdWVsaXplIiwic3luYyIsInRoZW4iLCJsaXN0ZW4iLCJjYXRjaCIsImVycm9yIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsIm9yaWdpbmFsVXJsIiwiaXAiLCJyZXMiLCJ1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMiLCJyZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMiLCJzdGF0dXMiLCJtZXNzYWdlIiwiY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQiLCJjb2RlIiwiZXJyIiwiT2JqZWN0IiwibGVuZ3RoIiwibmV3RXJyb3JPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZm9yRWFjaCIsImtleSIsInN1Y2Nlc3MiLCJTaXRlQ29uZmlnIiwiYW5hbHl0aWNzIiwiZ29vZ2xlSWQiLCJhc3NldERlZmF1bHRzIiwiZGVzY3JpcHRpb24iLCJ0aHVtYm5haWwiLCJ0aXRsZSIsImN1c3RvbUNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiY29udGFpbmVycyIsInBhZ2VzIiwiaG9zdCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsIlNlcXVlbGl6ZSIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImRpYWxlY3QiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwibG9nZ2luZyIsInBvb2wiLCJtYXgiLCJtaW4iLCJpZGxlIiwiYWNxdWlyZSIsImF1dGhlbnRpY2F0ZSIsImltcG9ydCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwic2VsZWN0RmlsZSIsImNsZWFyRmlsZSIsInVwZGF0ZU1ldGFkYXRhIiwidXBkYXRlQ2xhaW0iLCJzZXRQdWJsaXNoSW5DaGFubmVsIiwidXBkYXRlUHVibGlzaFN0YXR1cyIsInVwZGF0ZUVycm9yIiwidXBkYXRlU2VsZWN0ZWRDaGFubmVsIiwidG9nZ2xlTWV0YWRhdGFJbnB1dHMiLCJvbk5ld1RodW1ibmFpbCIsInN0YXJ0UHVibGlzaCIsImFjdGlvbnMiLCJmaWxlIiwidHlwZSIsIkZJTEVfU0VMRUNURUQiLCJkYXRhIiwiRklMRV9DTEVBUiIsInZhbHVlIiwiTUVUQURBVEFfVVBEQVRFIiwiQ0xBSU1fVVBEQVRFIiwiY2hhbm5lbCIsIlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwiLCJQVUJMSVNIX1NUQVRVU19VUERBVEUiLCJFUlJPUl9VUERBVEUiLCJjaGFubmVsTmFtZSIsIlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFIiwic2hvd01ldGFkYXRhSW5wdXRzIiwiVE9HR0xFX01FVEFEQVRBX0lOUFVUUyIsIlRIVU1CTkFJTF9ORVciLCJoaXN0b3J5IiwiUFVCTElTSF9TVEFSVCIsIm1hcFN0YXRlVG9Qcm9wcyIsInNpdGUiLCJsb2dnZWRJbkNoYW5uZWwiLCJjaGFubmVsU2hvcnRJZCIsInNob3J0SWQiLCJjaGFubmVsTG9uZ0lkIiwibG9uZ0lkIiwic2l0ZURlc2NyaXB0aW9uIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwib25DaGFubmVsTG9naW4iLCJkaXNwYXRjaCIsIm9uQ2hhbm5lbExvZ291dCIsIm9uSGFuZGxlU2hvd1BhZ2VVcmkiLCJvblJlcXVlc3RFcnJvciIsIm9uTmV3Q2hhbm5lbFJlcXVlc3QiLCJvbk5ld0Fzc2V0UmVxdWVzdCIsIm9uUmVxdWVzdFVwZGF0ZSIsImFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IiwiYWRkQXNzZXRUb0Fzc2V0TGlzdCIsImFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0Iiwib25VcGRhdGVDaGFubmVsQ2xhaW1zIiwidXBkYXRlQ2hhbm5lbENsYWltcyIsImZpbGVSZXF1ZXN0ZWQiLCJ1cGRhdGVGaWxlQXZhaWxhYmlsaXR5IiwidXBkYXRlRGlzcGxheUFzc2V0RXJyb3IiLCJwYXJhbXMiLCJIQU5ETEVfU0hPV19VUkkiLCJSRVFVRVNUX0VSUk9SIiwiY2hhbm5lbElkIiwicmVxdWVzdFR5cGUiLCJyZXF1ZXN0SWQiLCJDSEFOTkVMX1JFUVVFU1RfTkVXIiwiaWQiLCJleHRlbnNpb24iLCJBU1NFVF9SRVFVRVNUX05FVyIsIm1vZGlmaWVyIiwiUkVRVUVTVF9VUERBVEUiLCJSRVFVRVNUX0xJU1RfQUREIiwiY2xhaW1JZCIsImNsYWltRGF0YSIsIkFTU0VUX0FERCIsImNsYWltc0RhdGEiLCJDSEFOTkVMX0FERCIsImNoYW5uZWxLZXkiLCJwYWdlIiwiQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DIiwiY2hhbm5lbExpc3RJZCIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTIiwiRklMRV9SRVFVRVNURUQiLCJGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUiLCJESVNQTEFZX0FTU0VUX0VSUk9SIiwidWEiLCJjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIiwiaGVhZGVycyIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwiZXZlbnQiLCJzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nIiwidGltaW5nIiwic2VuZEdBU2VydmVFdmVudCIsInNlbmRHQVRpbWluZ0V2ZW50IiwiY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsIiwiY2hhbm5lbF9uYW1lIiwiY2hhbm5lbF9pZCIsImRlZmF1bHREZXNjcmlwdGlvbiIsImRlZmF1bHRUaHVtYm5haWwiLCJzaXRlSG9zdCIsInNpdGVUaXRsZSIsInNpdGVUd2l0dGVyIiwicmVxdWVzdCIsInBhcnNlSlNPTiIsInJlc3BvbnNlIiwiY2hlY2tTdGF0dXMiLCJqc29uUmVzcG9uc2UiLCJFcnJvciIsInVybCIsIm9wdGlvbnMiLCJmZXRjaCIsIlByb21pc2UiLCJhbGwiLCJheGlvcyIsImFwaSIsImFwaUhvc3QiLCJhcGlQb3J0IiwibGJyeUFwaVVyaSIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlamVjdCIsInJlc3VsdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJhbW91bnQiLCJzZWxlY3RBc3NldCIsInNob3ciLCJyZXF1ZXN0TGlzdCIsImFzc2V0S2V5IiwiYXNzZXRMaXN0Iiwic2VsZWN0U2hvd1N0YXRlIiwic3RhdGUiLCJyZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIiwiTk9fQ0hBTk5FTCIsIk5PX0NMQUlNIiwiTk9fRklMRSIsImdldENsYWltSWQiLCJjaGFubmVsQ2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsImxvbmdDaGFubmVsQ2xhaW1JZCIsImdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQiLCJzaG9ydENoYW5uZWxDbGFpbUlkIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJkYXRhVmFsdWVzIiwicGFzc3BvcnQiLCJsb2NhbExvZ2luU3RyYXRlZ3kiLCJsb2NhbFNpZ251cFN0cmF0ZWd5Iiwic2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplU3BlZWNoVXNlciIsImRlc2VyaWFsaXplVXNlciIsInNlcmlhbGl6ZVVzZXIiLCJsYnJ5QXBpIiwicHVibGlzaEhlbHBlcnMiLCJPcCIsInB1Ymxpc2giLCJmaWxlTmFtZSIsImZpbGVUeXBlIiwicHVibGlzaFJlc3VsdHMiLCJjZXJ0aWZpY2F0ZUlkIiwidHgiLCJmaWxlUmVjb3JkIiwiY2xhaW1faWQiLCJtZXRhZGF0YSIsImFkZHJlc3MiLCJjbGFpbV9hZGRyZXNzIiwib3V0cG9pbnQiLCJ0eGlkIiwibm91dCIsImhlaWdodCIsImZpbGVQYXRoIiwiZmlsZV9wYXRoIiwibnNmdyIsImNsYWltUmVjb3JkIiwiY29udGVudFR5cGUiLCJiaWQiLCJ1cHNlcnRDcml0ZXJpYSIsImNsYWltIiwic2V0Q2xhaW0iLCJzZXRGaWxlIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2xhaW1BZGRyZXNzZXMiLCJwdXNoIiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJvciIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsImZzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkiLCJsaWNlbnNlIiwiaW52YWxpZE5hbWVDaGFyYWN0ZXJzIiwiZXhlYyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyIsInBhdGgiLCJzaXplIiwidGVzdCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImF1dGhvciIsImxhbmd1YWdlIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsInVubGluayIsImFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIiwiZmlsZUluZm8iLCJnZXRSZXN1bHQiLCJmaWxlX25hbWUiLCJkb3dubG9hZF9wYXRoIiwiY3JlYXRlRmlsZURhdGEiLCJ1cGRhdGVMb2dnZWRJbkNoYW5uZWwiLCJDSEFOTkVMX1VQREFURSIsIlByb2dyZXNzQmFyIiwicHJvcHMiLCJiYXJzIiwiaW5kZXgiLCJpbmNyZW1lbnRlciIsImNyZWF0ZUJhcnMiLCJiaW5kIiwic3RhcnRQcm9ncmVzc0JhciIsInVwZGF0ZVByb2dyZXNzQmFyIiwic3RvcFByb2dyZXNzQmFyIiwiaSIsImlzQWN0aXZlIiwic2V0U3RhdGUiLCJ1cGRhdGVJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm1hcCIsImJhciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJFcnJvclBhZ2UiLCJzdHJpbmciLCJteXNxbCIsIndhcm4iLCJyZXR1cm5TaG9ydElkIiwiY2xhaW1zQXJyYXkiLCJjbGFpbUluZGV4Iiwic3Vic3RyaW5nIiwic2hvcnRJZExlbmd0aCIsImZpbmRJbmRleCIsImVsZW1lbnQiLCJwb3NzaWJsZU1hdGNoZXMiLCJzbGljZSIsImZpbHRlciIsInJlcSIsImNvbnRleHQiLCJzdG9yZSIsImh0bWwiLCJyZW5kZXJTdGF0aWMiLCJyZWRpcmVjdCIsInByZWxvYWRlZFN0YXRlIiwiZ2V0U3RhdGUiLCJzZW5kIiwiTE9HSU4iLCJDUkVBVEUiLCJMT0NBTF9DSEVDSyIsIlVOQVZBSUxBQkxFIiwiRVJST1IiLCJBVkFJTEFCTEUiLCJHQUxpc3RlbmVyIiwic2VuZFBhZ2VWaWV3IiwibG9jYXRpb24iLCJwYXRobmFtZSIsInBhZ2V2aWV3IiwiY2hpbGRyZW4iLCJBcHAiLCJmaWxlRXJyb3IiLCJzZXRGaWxlRXJyb3IiLCJDSEFOTkVMIiwiQVNTRVRfTElURSIsIkFTU0VUX0RFVEFJTFMiLCJkaXNwbGF5QXNzZXQiLCJhc3NldCIsIm9uRmlsZVJlcXVlc3QiLCJ0b1N0cmluZyIsIm1ldGEiLCJsaW5rIiwiU0VSVkUiLCJTSE9XIiwiY2xpZW50QWNjZXB0c0h0bWwiLCJhY2NlcHQiLCJtYXRjaCIsInJlcXVlc3RJc0Zyb21Ccm93c2VyIiwiY2xpZW50V2FudHNBc3NldCIsInJhbmdlIiwiaW1hZ2VJc1dhbnRlZCIsInZpZGVvSXNXYW50ZWQiLCJpc1ZhbGlkQ2xhaW1JZCIsImlzVmFsaWRTaG9ydElkIiwiaXNWYWxpZFNob3J0SWRPckNsYWltSWQiLCJpbnB1dCIsInNlcnZlQXNzZXRUb0NsaWVudCIsInZlcmJvc2UiLCJzZW5kRmlsZU9wdGlvbnMiLCJzZW5kRmlsZSIsImdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IiwiZnVsbENsYWltSWQiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicmVzcG9uc2VUeXBlIiwiZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSIsImlkZW50aWZpZXIiLCJ0ZW1wTmFtZSIsImxvZ1JlcXVlc3REYXRhIiwiUkVHRVhQX0lOVkFMSURfQ0xBSU0iLCJSRUdFWFBfSU5WQUxJRF9DSEFOTkVMIiwiUkVHRVhQX0FERFJFU1MiLCJDSEFOTkVMX0NIQVIiLCJwYXJzZUlkZW50aWZpZXIiLCJjb21wb25lbnRzUmVnZXgiLCJSZWdFeHAiLCJwcm90byIsIm1vZGlmaWVyU2VwZXJhdG9yIiwiaXNDaGFubmVsIiwic3RhcnRzV2l0aCIsIm5hbWVCYWRDaGFycyIsImpvaW4iLCJwYXJzZUNsYWltIiwicGFyc2VNb2RpZmllciIsInJldHVyblNhZ2FXaXRoUGFyYW1zIiwic2FnYSIsInNhZ2FNaWRkbGV3YXJlIiwibWlkZGxld2FyZSIsImFjdGlvbiIsInJ1biIsImRvbmUiLCJzZWxlY3RTaXRlU3RhdGUiLCJzZWxlY3RTaXRlSG9zdCIsIm5leHQiLCJMb2dnZXJDb25maWciLCJsb2dMZXZlbCIsImNvbmZpZ3VyZSIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwibGV2ZWwiLCJ0aW1lc3RhbXAiLCJjb2xvcml6ZSIsInByZXR0eVByaW50IiwiaGFuZGxlRXhjZXB0aW9ucyIsImh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb24iLCJzaWxseSIsIndpbnN0b25TbGFja1dlYkhvb2siLCJTbGFja1dlYkhvb2siLCJ3aW5zdG9uIiwiU2xhY2tDb25maWciLCJzbGFja1dlYkhvb2siLCJzbGFja0Vycm9yQ2hhbm5lbCIsInNsYWNrSW5mb0NoYW5uZWwiLCJhZGQiLCJ3ZWJob29rVXJsIiwiaWNvbkVtb2ppIiwiUGFzc3BvcnRMb2NhbFN0cmF0ZWd5IiwiU3RyYXRlZ3kiLCJyZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8iLCJ1c2VySW5zdGFuY2UiLCJ1c2VySW5mbyIsInVzZXJOYW1lIiwiZ2V0Q2hhbm5lbCIsInNob3J0Q2hhbm5lbElkIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VyIiwiY29tcGFyZVBhc3N3b3JkIiwiaXNNYXRjaCIsIlNUUklORyIsIkJPT0xFQU4iLCJJTlRFR0VSIiwiVEVYVCIsIkRFQ0lNQUwiLCJkZWZpbmUiLCJkZWZhdWx0IiwiY2xhaW1TZXF1ZW5jZSIsImRlY29kZWRDbGFpbSIsImRlcHRoIiwiZWZmZWN0aXZlQW1vdW50IiwiaGFzU2lnbmF0dXJlIiwiaGV4IiwidmFsaWRBdEhlaWdodCIsInZhbHVlVmVyc2lvbiIsImNsYWltVHlwZSIsImNlcnRpZmljYXRlVmVyc2lvbiIsImtleVR5cGUiLCJwdWJsaWNLZXkiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJmb3JlaWduS2V5IiwiYWxsb3dOdWxsIiwib3JkZXIiLCJnZXRMb25nQ2hhbm5lbElkRnJvbVNob3J0Q2hhbm5lbElkIiwiJGxpa2UiLCJnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lIiwidmFsaWRhdGVMb25nQ2hhbm5lbElkIiwiaGFzT25lIiwiZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSIsImRldGVybWluZVRodW1ibmFpbCIsInN0b3JlZFRodW1ibmFpbCIsInByZXBhcmVDbGFpbURhdGEiLCJsaWNlbnNlVXJsIiwicHJldmlldyIsIm1ldGFkYXRhVmVyc2lvbiIsInNvdXJjZSIsInNvdXJjZVR5cGUiLCJzb3VyY2VWZXJzaW9uIiwic3RyZWFtVmVyc2lvbiIsImdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZCIsInJhdyIsImdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZCIsImdldFRvcEZyZWVDbGFpbUlkQnlDbGFpbU5hbWUiLCJ2YWxpZGF0ZUxvbmdDbGFpbUlkIiwicmVzb2x2ZUNsYWltIiwiY2xhaW1BcnJheSIsImRlZmF1bHRWYWx1ZSIsInRyZW5kaW5nRWxpZ2libGUiLCJoYXNNYW55IiwiZ2V0UmVjZW50Q2xhaW1zIiwibGltaXQiLCJpcEFkZHJlc3MiLCJiY3J5cHQiLCJwcm90b3R5cGUiLCJjb21wYXJlIiwiY2hhbmdlUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImdlblNhbHQiLCJzYWx0RXJyb3IiLCJzYWx0IiwiaGFzaCIsImhhc2hFcnJvciIsImhvb2siLCJ1c2VyRGF0YSIsImNoYW5uZWxEYXRhIiwiY2VydGlmaWNhdGVEYXRhIiwibmV3VXNlciIsIm5ld0NoYW5uZWwiLCJuZXdDZXJ0aWZpY2F0ZSIsInNldENoYW5uZWwiLCJzZXRVc2VyIiwibGJyeUNvbmZpZyIsImhhbmRsZVNpZ251cFJlcXVlc3QiLCJoYW5kbGVMb2dpblJlcXVlc3QiLCJoYW5kbGVMb2dvdXRSZXF1ZXN0IiwiaGFuZGxlVXNlclJlcXVlc3QiLCJnZXQiLCJzaWdudXAiLCJsb2dpbiIsImxvZ0luIiwibG9nb3V0IiwiY2hhbm5lbEF2YWlsYWJpbGl0eSIsImNoYW5uZWxDbGFpbXMiLCJjbGFpbUF2YWlsYWJpbGl0eSIsImNsYWltR2V0IiwiY2xhaW1Mb25nSWQiLCJjbGFpbVB1Ymxpc2giLCJjbGFpbVJlc29sdmUiLCJjbGFpbVNob3J0SWQiLCJjbGFpbUxpc3QiLCJmaWxlQXZhaWxhYmlsaXR5IiwibXVsdGlwYXJ0TWlkZGxld2FyZSIsImF2YWlsYWJsZU5hbWUiLCJib2R5IiwiQ0xBSU1TX1BFUl9QQUdFIiwiY2xhaW1zIiwidG90YWxQYWdlcyIsImRldGVybWluZVRvdGFsUGFnZXMiLCJwYWdpbmF0aW9uUGFnZSIsImdldFBhZ2VGcm9tUXVlcnkiLCJ2aWV3RGF0YSIsImV4dHJhY3RQYWdlRnJvbUNsYWltcyIsInByZXZpb3VzUGFnZSIsImRldGVybWluZVByZXZpb3VzUGFnZSIsImN1cnJlbnRQYWdlIiwibmV4dFBhZ2UiLCJkZXRlcm1pbmVOZXh0UGFnZSIsInRvdGFsUmVzdWx0cyIsImRldGVybWluZVRvdGFsQ2xhaW1zIiwicGFyc2VJbnQiLCJwYWdlTnVtYmVyIiwiY2xhaW1TdGFydEluZGV4IiwiY2xhaW1FbmRJbmRleCIsInBhZ2VPZkNsYWltcyIsInRvdGFsQ2xhaW1zIiwiZnVsbFBhZ2VzIiwiTWF0aCIsImZsb29yIiwicmVtYWluZGVyIiwiY2hhbm5lbFNob3J0SWRSb3V0ZSIsImNsYWltSW5mbyIsInJlc29sdmVSZXN1bHQiLCJmaWxlRGF0YSIsImNvbXBsZXRlZCIsImF1dGhlbnRpY2F0ZVVzZXIiLCJmaWxlcyIsImNoYW5uZWxQYXNzd29yZCIsInZhbGlkYXRlZENsYWltTmFtZSIsInRodW1ibmFpbFB1Ymxpc2hQYXJhbXMiLCJsYnJ5VHgiLCJhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMiLCJ1c2VyUGFzc3dvcmQiLCJjaGFubmVsRmluZFBhcmFtcyIsInJlc29sdmVkVXJpIiwiY2xhaW1zTGlzdCIsIm11bHRpcGFydCIsInVwbG9hZERpciIsImhhbmRsZVBhZ2VSZXF1ZXN0IiwiaGFuZGxlRW1iZWRSZXF1ZXN0IiwiaGFuZGxlUGFnZVJlbmRlciIsInNlbmRSZWFjdEFwcCIsImluaXRpYWxTdGF0ZSIsImFzc2lnbiIsInB1Ymxpc2hJbkNoYW5uZWwiLCJzZWxlY3RlZENoYW5uZWwiLCJwdWJsaXNoU3VibWl0IiwiY2hhbm5lbExpc3QiLCJnb29nbGVBbmFseXRpY3NJZCIsIkhvbWVQYWdlIiwiU0VPIiwicGFnZVVyaSIsInBhZ2VUaXRsZSIsIm1ldGFUYWdzIiwiY2Fub25pY2FsTGluayIsInJlbCIsImhyZWYiLCJvYmplY3QiLCJjcmVhdGVQYWdlVGl0bGUiLCJkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwiZmlsZUV4dCIsImxhc3RJbmRleE9mIiwiY3JlYXRlQmFzaWNNZXRhVGFncyIsInByb3BlcnR5IiwiY29udGVudCIsImNyZWF0ZUNoYW5uZWxNZXRhVGFncyIsImNyZWF0ZUFzc2V0TWV0YVRhZ3MiLCJlbWJlZFVybCIsInNob3dVcmwiLCJvZ1RpdGxlIiwib2dEZXNjcmlwdGlvbiIsIm9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJvZ1RodW1ibmFpbCIsImNyZWF0ZU1ldGFUYWdzIiwiY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rIiwiY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsiLCJjcmVhdGVDYW5vbmljYWxMaW5rIiwiVklFVyIsIkxPR09VVCIsIk5hdkJhciIsImNoZWNrRm9yTG9nZ2VkSW5Vc2VyIiwibG9nb3V0VXNlciIsImhhbmRsZVNlbGVjdGlvbiIsImNyZWRlbnRpYWxzIiwidGFyZ2V0Iiwic2VsZWN0ZWRPcHRpb25zIiwiTG9nbyIsIk5hdkJhckNoYW5uZWxEcm9wZG93biIsImRlZmF1bHRTZWxlY3Rpb24iLCJQdWJsaXNoVG9vbCIsIkRyb3B6b25lIiwiZHJhZ092ZXIiLCJtb3VzZU92ZXIiLCJkaW1QcmV2aWV3IiwiaGFuZGxlRHJvcCIsImhhbmRsZURyYWdPdmVyIiwiaGFuZGxlRHJhZ0VuZCIsImhhbmRsZURyYWdFbnRlciIsImhhbmRsZURyYWdMZWF2ZSIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVGaWxlSW5wdXQiLCJjaG9vc2VGaWxlIiwicHJldmVudERlZmF1bHQiLCJkdCIsImRhdGFUcmFuc2ZlciIsIml0ZW1zIiwia2luZCIsImRyb3BwZWRGaWxlIiwiZ2V0QXNGaWxlIiwicmVtb3ZlIiwiY2xlYXJEYXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsaWNrIiwiZmlsZUxpc3QiLCJ2YWxpZGF0ZUZpbGUiLCJQdWJsaXNoUHJldmlldyIsImltZ1NvdXJjZSIsInNldFByZXZpZXdJbWFnZVNvdXJjZSIsIm5ld1Byb3BzIiwic2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUiLCJwcmV2aWV3UmVhZGVyIiwiRmlsZVJlYWRlciIsInJlYWRBc0RhdGFVUkwiLCJvbmxvYWRlbmQiLCJib29sIiwiUHVibGlzaERldGFpbHMiLCJvblB1Ymxpc2hTdWJtaXQiLCJvbk1ldGFkYXRhQ2hhbmdlIiwiUHVibGlzaFRpdGxlSW5wdXQiLCJoYW5kbGVJbnB1dCIsImUiLCJsb2dnZWRJbkNoYW5uZWxOYW1lIiwibG9nZ2VkSW5DaGFubmVsU2hvcnRJZCIsInVybEVycm9yIiwib25DbGFpbUNoYW5nZSIsIm9uVXJsRXJyb3IiLCJQdWJsaXNoVXJsSW5wdXQiLCJzZXRDbGFpbU5hbWUiLCJ2YWxpZGF0ZUNsYWltIiwiY2xlYW5zZUlucHV0IiwiZmlsZU5hbWVXaXRob3V0RW5kaW5nIiwiY2xlYW5DbGFpbU5hbWUiLCJVcmxNaWRkbGUiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiaWEiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsIkJsb2IiLCJQdWJsaXNoVGh1bWJuYWlsSW5wdXQiLCJ2aWRlb1NvdXJjZSIsInNsaWRlck1pblJhbmdlIiwic2xpZGVyTWF4UmFuZ2UiLCJzbGlkZXJWYWx1ZSIsImhhbmRsZVZpZGVvTG9hZGVkRGF0YSIsImhhbmRsZVNsaWRlckNoYW5nZSIsImNyZWF0ZVRodW1ibmFpbCIsInNldFZpZGVvU291cmNlIiwibmV4dFByb3BzIiwiZGF0YVVyaSIsImJsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ0b3RhbE1pbnV0ZXMiLCJ0b3RhbFNlY29uZHMiLCJ2aWRlbyIsImN1cnJlbnRUaW1lIiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsIndpZHRoIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImRhdGFVcmwiLCJ0b0RhdGFVUkwiLCJzbmFwc2hvdCIsImRpc3BsYXkiLCJvblRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwiUHVibGlzaE1ldGFkYXRhSW5wdXRzIiwidG9nZ2xlU2hvd0lucHV0cyIsImhhbmRsZVNlbGVjdCIsImNoZWNrZWQiLCJzZWxlY3RlZE9wdGlvbiIsIm1heEhlaWdodCIsIkV4cGFuZGluZ1RleHRhcmVhIiwiX2hhbmRsZUNoYW5nZSIsImFkanVzdFRleHRhcmVhIiwib25DaGFuZ2UiLCJlbCIsInN0eWxlIiwic2Nyb2xsSGVpZ2h0IiwicmVzdCIsIngiLCJmdW5jIiwiY2hhbm5lbEVycm9yIiwib25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlIiwib25DaGFubmVsU2VsZWN0Iiwic3RhdGVzIiwiQ2hhbm5lbFNlbGVjdCIsInRvZ2dsZUFub255bW91c1B1Ymxpc2giLCJDaGFubmVsTG9naW5Gb3JtIiwibG9naW5Ub0NoYW5uZWwiLCJIZWFkZXJzIiwiQ2hhbm5lbENyZWF0ZUZvcm0iLCJoYW5kbGVDaGFubmVsSW5wdXQiLCJjbGVhbnNlQ2hhbm5lbElucHV0IiwidXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIiwiY2hhbm5lbFdpdGhBdFN5bWJvbCIsImNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIiwiY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUiLCJtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0IiwiQWN0aXZlU3RhdHVzQmFyIiwiSW5hY3RpdmVTdGF0dXNCYXIiLCJwdWJsaXNoU3RhdGVzIiwiUHVibGlzaFN0YXR1cyIsIkxPQURfU1RBUlQiLCJMT0FESU5HIiwiUFVCTElTSElORyIsIlNVQ0NFU1MiLCJGQUlMRUQiLCJQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIiwiQWJvdXRQYWdlIiwiTG9naW5QYWdlIiwiU2hvd1BhZ2UiLCJTaG93TGl0ZSIsIkFzc2V0RGlzcGxheSIsIlNob3dBc3NldERldGFpbHMiLCJBc3NldFRpdGxlIiwiQXNzZXRJbmZvIiwiY29weVRvQ2xpcGJvYXJkIiwiZWxlbWVudFRvQ29weSIsImRhdGFzZXQiLCJlbGVtZW50dG9jb3B5Iiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJwcmV2aW91c1JlcXVlc3QiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwic2hvd05ld1BhZ2UiLCJkZWZhdWx0cyIsIkFzc2V0UHJldmlldyIsImRpcmVjdFNvdXJjZUxpbmsiLCJzaG93VXJsTGluayIsIkZvdXJPaEZvclBhZ2UiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJ3YXRjaEhhbmRsZVNob3dQYWdlVXJpIiwicGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0iLCJwYXJzZUFuZFVwZGF0ZUNsYWltT25seSIsIm5ld0Fzc2V0UmVxdWVzdCIsIndhdGNoTmV3QXNzZXRSZXF1ZXN0IiwiZ2V0U2hvcnRJZCIsImdldENsYWltRGF0YSIsIm5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hOZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyIsImdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwiLCJleHRlbnNpb25TZXBlcmF0b3IiLCJzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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OztBQUVBLElBQU13ckIsZUFBZSxTQUFmQSxZQUFlLENBQUNyUSxHQUFELEVBQU01VyxHQUFOLEVBQWM7QUFDakNnbkIsbUJBQWlCcFEsR0FBakIsRUFBc0I1VyxHQUF0QjtBQUNELENBRkQ7O0FBSUFyRSxPQUFPRCxPQUFQLEdBQWlCdXJCLFlBQWpCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWRiNGJhMTgzZjA2ODE4NTg2YzkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXBvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hhdHdnLWZldGNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2hhdHdnLWZldGNoXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VydmVyID0gcmVxdWlyZSgnLi9zZXJ2ZXInKTtcblxuY29uc3QgZXhwb3J0cyA9IHtcbiAgU2VydmVyLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3BlZWNoLmpzIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IGNvb2tpZVNlc3Npb24gPSByZXF1aXJlKCdjb29raWUtc2Vzc2lvbicpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSByZXF1aXJlKCdtaWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMnKTtcbmNvbnN0IFBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBsb2dnZXJDb25maWcgPSByZXF1aXJlKCdsb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsQ29uZmlnID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcbmNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJ3NsYWNrQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIFNlcnZlciAoKSB7XG4gIHRoaXMuY29uZmlndXJlTG9nZ2VyID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBsb2dnZXJDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBteXNxbENvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2l0ZURldGFpbHMgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNpdGVDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNsYWNrID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBzbGFja0NvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQ2xpZW50QnVuZGxlID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnY29uZmlndXJlIHRoZSBjbGllbnQgaGVyZSBieSBwYXNzaW5nIGluIHRoZSBidW5kbGUgYW5kIGNvbmZpZ3VyaW5nIGl0LCBvciBiZXR0ZXIgeWV0OiB0YWtpbmcgaW4gdGhlIGNvbXBvbmVudHMgdG8gdXNlIGR5bmFtaWNhbGx5IGZyb20gaGVyZS4nKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVNb2RlbHMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdoZXJlIGlzIHdoZXJlIHlvdSBjb3VsZCBhZGQvb3ZlcndyaXRlIHRoZSBkZWZhdWx0IG1vZGVscycpXG4gIH07XG4gIHRoaXMuY29uZmlndXJlUm91dGVzID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCByb3V0ZXMnKVxuICB9O1xuICB0aGlzLmNyZWF0ZUFwcCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgYW4gRXhwcmVzcyBhcHBsaWNhdGlvblxuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuICAgIC8vIHRydXN0IHRoZSBwcm94eSB0byBnZXQgaXAgYWRkcmVzcyBmb3IgdXNcbiAgICBhcHAuZW5hYmxlKCd0cnVzdCBwcm94eScpO1xuXG4gICAgLyogYWRkIG1pZGRsZXdhcmUgKi9cbiAgICAvLyBzZXQgSFRUUCBoZWFkZXJzIHRvIHByb3RlY3QgYWdhaW5zdCB3ZWxsLWtub3duIHdlYiB2dWxuZXJhYmlsdGllc1xuICAgIGFwcC51c2UoaGVsbWV0KCkpO1xuICAgIC8vICdleHByZXNzLnN0YXRpYycgdG8gc2VydmUgc3RhdGljIGZpbGVzIGZyb20gcHVibGljIGRpcmVjdG9yeVxuICAgIGlmIChzaXRlQ29uZmlnLnJvdXRlcy5wdWJsaWMpIHtcbiAgICAgIC8vIHRha2UgaW4gYSBkaWZmZXJlbnQgcHVibGljIGZvbGRlciwgc28gaXQgY2FuIHNlcnZlIGl0J3Mgb3duIGJ1bmRsZSBpZiBuZWVkZWRcbiAgICAgIGNvbnN0IHsgcHVibGljRm9sZGVyIH0gPSBzaXRlQ29uZmlnLnJvdXRlcztcbiAgICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocHVibGljRm9sZGVyKSlcbiAgICAgIGxvZ2dlci5pbmZvKCdzZXJ2aW5nIHN0YXRpYyBmaWxlcyBmcm9tIGN1c3RvbSBwYXRoOicsIHB1YmxpY0ZvbGRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHB1YmxpY1BhdGggPSBQYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJyk7XG4gICAgICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKHB1YmxpY1BhdGgpKTtcbiAgICAgIGxvZ2dlci5pbmZvKCdzZXJ2aW5nIHN0YXRpYyBmaWxlcyBmcm9tIGRlZmF1bHQgcGF0aDonLCBwdWJsaWNQYXRoKTtcbiAgICB9O1xuICAgIC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24vanNvblxuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgIC8vICdib2R5IHBhcnNlcicgZm9yIHBhcnNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5cbiAgICAvLyBhZGQgY3VzdG9tIG1pZGRsZXdhcmUgKG5vdGU6IGJ1aWxkIG91dCB0byBhY2NlcHQgZHluYW1pY2FsbHkgdXNlIHdoYXQgaXMgaW4gc2VydmVyL21pZGRsZXdhcmUvXG4gICAgYXBwLnVzZShyZXF1ZXN0TG9nZ2VyKTtcblxuICAgIC8vIGNvbmZpZ3VyZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbiAgICAvLyBpbml0aWFsaXplIHBhc3Nwb3J0XG4gICAgY29uc3Qgc2Vzc2lvbktleSA9IHNpdGVDb25maWcuYXV0aC5zZXNzaW9uS2V5O1xuICAgIGFwcC51c2UoY29va2llU2Vzc2lvbih7XG4gICAgICBuYW1lICA6ICdzZXNzaW9uJyxcbiAgICAgIGtleXMgIDogW3Nlc3Npb25LZXldLFxuICAgICAgbWF4QWdlOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBpLmUuIDI0IGhvdXJzXG4gICAgfSkpO1xuICAgIGFwcC51c2Uoc3BlZWNoUGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbiAgICAvLyBjb25maWd1cmUgaGFuZGxlYmFycyAmIHJlZ2lzdGVyIGl0IHdpdGggZXhwcmVzcyBhcHBcbiAgICBjb25zdCBoYnMgPSBleHByZXNzSGFuZGxlYmFycy5jcmVhdGUoe1xuICAgICAgZGVmYXVsdExheW91dDogJ2VtYmVkJyxcbiAgICAgIGhhbmRsZWJhcnMgICA6IEhhbmRsZWJhcnMsXG4gICAgfSk7XG4gICAgYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGhicy5lbmdpbmUpO1xuICAgIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuICAgIC8vIHNldCB0aGUgcm91dGVzIG9uIHRoZSBhcHBcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hdXRoLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXBpLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvcGFnZXMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldHMvJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9mYWxsYmFjay8nKShhcHApO1xuXG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gIH07XG4gIHRoaXMuaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmNyZWF0ZUFwcCgpO1xuICAgIHRoaXMuc2VydmVyID0gaHR0cC5TZXJ2ZXIodGhpcy5hcHApO1xuICB9O1xuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG4gICAgY29uc3QgUE9SVCA9IHNpdGVDb25maWcuZGV0YWlscy5wb3J0O1xuICAgIC8vIHN5bmMgc2VxdWVsaXplXG4gICAgZGIuc2VxdWVsaXplLnN5bmMoKVxuICAgIC8vIHN0YXJ0IHRoZSBzZXJ2ZXJcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBQT1JUICR7UE9SVH1gKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYFN0YXJ0dXAgRXJyb3I6YCwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b25cIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVFcnJvclJlc3BvbnNlOiBmdW5jdGlvbiAob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBvbiAke29yaWdpbmFsVXJsfWAsIG1vZHVsZS5leHBvcnRzLnVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyhlcnJvcikpO1xuICAgIGNvbnN0IFtzdGF0dXMsIG1lc3NhZ2VdID0gbW9kdWxlLmV4cG9ydHMucmV0dXJuRXJyb3JNZXNzYWdlQW5kU3RhdHVzKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoc3RhdHVzKVxuICAgICAgLmpzb24obW9kdWxlLmV4cG9ydHMuY3JlYXRlRXJyb3JSZXNwb25zZVBheWxvYWQoc3RhdHVzLCBtZXNzYWdlKSk7XG4gIH0sXG4gIHJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1czogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgbGV0IHN0YXR1cywgbWVzc2FnZTtcbiAgICAvLyBjaGVjayBmb3IgZGFlbW9uIGJlaW5nIHR1cm5lZCBvZmZcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVGVVNFRCcpIHtcbiAgICAgIHN0YXR1cyA9IDUwMztcbiAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiByZWZ1c2VkLiAgVGhlIGRhZW1vbiBtYXkgbm90IGJlIHJ1bm5pbmcuJztcbiAgICAgIC8vIGZhbGxiYWNrIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdHVzID0gNDAwO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFtzdGF0dXMsIG1lc3NhZ2VdO1xuICB9LFxuICB1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXM6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxldCBuZXdFcnJvck9iamVjdCA9IHt9O1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbmV3RXJyb3JPYmplY3Rba2V5XSA9IGVycltrZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3RXJyb3JPYmplY3Q7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH0sXG4gIGNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcyIsImZ1bmN0aW9uIFNpdGVDb25maWcgKCkge1xuICB0aGlzLmFuYWx5dGljcyA9IHtcbiAgICBnb29nbGVJZDogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmFzc2V0RGVmYXVsdHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdBbiBhc3NldCBwdWJsaXNoZWQgb24gU3BlZS5jaCcsXG4gICAgdGh1bWJuYWlsICA6ICdodHRwczovL3NwZWUuY2gvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgfTtcbiAgdGhpcy5hdXRoID0ge1xuICAgIHNlc3Npb25LZXk6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5jdXN0b21Db21wb25lbnRzID0ge1xuICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIGNvbnRhaW5lcnM6IHt9LFxuICAgIHBhZ2VzICAgICA6IHt9LFxuICB9O1xuICB0aGlzLmRldGFpbHMgPSB7XG4gICAgZGVzY3JpcHRpb246ICdPcGVuLXNvdXJjZSwgZGVjZW50cmFsaXplZCBpbWFnZSBhbmQgdmlkZW8gc2hhcmluZy4nLFxuICAgIGhvc3QgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgcG9ydCAgICAgICA6IDMwMDAsXG4gICAgdGl0bGUgICAgICA6ICdTcGVlLmNoJyxcbiAgICB0d2l0dGVyICAgIDogJ0BzcGVlX2NoJyxcbiAgfTtcbiAgdGhpcy5wdWJsaXNoaW5nID0ge1xuICAgIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlczogW10sXG4gICAgZGlzYWJsZWQgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICBkaXNhYmxlZE1lc3NhZ2UgICAgICAgICA6ICdQbGVhc2UgY2hlY2sgYmFjayBzb29uLicsXG4gICAgcHJpbWFyeUNsYWltQWRkcmVzcyAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbCAgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdGh1bWJuYWlsQ2hhbm5lbElkICAgICAgOiAnZGVmYXVsdCcsXG4gICAgdXBsb2FkRGlyZWN0b3J5ICAgICAgICAgOiAnL2hvbWUvbGJyeS9VcGxvYWRzJyxcbiAgfTtcbiAgdGhpcy5yb3V0ZXMgPSB7fTtcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZygnTm8gc2l0ZSBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgYW5hbHl0aWNzLCBhc3NldERlZmF1bHRzLCBhdXRoLCBjdXN0b21Db21wb25lbnRzLCBkZXRhaWxzLCBwdWJsaXNoaW5nLCByb3V0ZXMgfSA9IGNvbmZpZztcbiAgICBjb25zb2xlLmxvZygnQ29uZmlndXJpbmcgc2l0ZSBkZXRhaWxzLi4uJyk7XG4gICAgdGhpcy5hbmFseXRpY3MgPSBhbmFseXRpY3M7XG4gICAgdGhpcy5hc3NldERlZmF1bHRzID0gYXNzZXREZWZhdWx0cztcbiAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgdGhpcy5wdWJsaXNoaW5nID0gcHVibGlzaGluZztcbiAgICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSBjdXN0b21Db21wb25lbnRzO1xuICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2l0ZUNvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NpdGVDb25maWcuanMiLCJjb25zdCBDZXJ0aWZpY2F0ZSA9IHJlcXVpcmUoJ21vZGVscy9jZXJ0aWZpY2F0ZS5qcycpO1xuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJ21vZGVscy9jaGFubmVsLmpzJyk7XG5jb25zdCBDbGFpbSA9IHJlcXVpcmUoJ21vZGVscy9jbGFpbS5qcycpO1xuY29uc3QgRmlsZSA9IHJlcXVpcmUoJ21vZGVscy9maWxlLmpzJyk7XG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnbW9kZWxzL3JlcXVlc3QuanMnKTtcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCdtb2RlbHMvdXNlci5qcycpO1xuXG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuY29uc3Qge2RhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmR9ID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcblxuLy8gc2V0IHNlcXVlbGl6ZSBvcHRpb25zXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcbiAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0ICAgICAgIDogJ215c3FsJyxcbiAgZGlhbGVjdE9wdGlvbnM6IHtkZWNpbWFsTnVtYmVyczogdHJ1ZX0sXG4gIGxvZ2dpbmcgICAgICAgOiBmYWxzZSxcbiAgcG9vbCAgICAgICAgICA6IHtcbiAgICBtYXggICAgOiA1LFxuICAgIG1pbiAgICA6IDAsXG4gICAgaWRsZSAgIDogMTAwMDAsXG4gICAgYWNxdWlyZTogMTAwMDAsXG4gIH0sXG59KTtcblxuLy8gZXN0YWJsaXNoIG15c3FsIGNvbm5lY3Rpb25cbnNlcXVlbGl6ZVxuICAuYXV0aGVudGljYXRlKClcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGxvZ2dlci5pbmZvKCdTZXF1ZWxpemUgaGFzIGVzdGFibGlzaGVkIG15c3FsIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5LicpO1xuICB9KVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICBsb2dnZXIuZXJyb3IoJ1NlcXVlbGl6ZSB3YXMgdW5hYmxlIHRvIGNvbm5lY3QgdG8gdGhlIGRhdGFiYXNlOicsIGVycik7XG4gIH0pO1xuXG4vLyBtYW51YWxseSBhZGQgZWFjaCBtb2RlbCB0byB0aGUgZGIgb2JqZWN0IChub3RlOiBtYWtlIHRoaXMgZHluYW1pYylcbmNvbnN0IGRiID0ge307XG5kYlsnQ2VydGlmaWNhdGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NlcnRpZmljYXRlJywgQ2VydGlmaWNhdGUpO1xuZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbmRiWydDbGFpbSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2xhaW0nLCBDbGFpbSk7XG5kYlsnRmlsZSddID0gc2VxdWVsaXplLmltcG9ydCgnRmlsZScsIEZpbGUpO1xuZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbmRiWydVc2VyJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdVc2VyJywgVXNlcik7XG5cbi8vIHJ1biBtb2RlbC5hc3NvY2lhdGlvbiBmb3IgZWFjaCBtb2RlbCBpbiB0aGUgZGIgb2JqZWN0IHRoYXQgaGFzIGFuIGFzc29jaWF0aW9uXG5sb2dnZXIuaW5mbygnYXNzb2NpYXRpbmcgZGIgbW9kZWxzLi4uJyk7XG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChtb2RlbE5hbWUgPT4ge1xuICBpZiAoZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUpIHtcbiAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICBkYlttb2RlbE5hbWVdLmFzc29jaWF0ZShkYik7XG4gIH1cbn0pO1xuXG4vLyBhZGQgc2VxdWVsaXplL1NlcXVlbGl6ZSB0byBkYlxuZGIuc2VxdWVsaXplID0gc2VxdWVsaXplO1xuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xuLy8gYWRkIGFuICd1cHNlcnQnIG1ldGhvZCB0byB0aGUgZGIgb2JqZWN0XG5kYi51cHNlcnQgPSAoTW9kZWwsIHZhbHVlcywgY29uZGl0aW9uLCB0YWJsZU5hbWUpID0+IHtcbiAgcmV0dXJuIE1vZGVsXG4gICAgLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICB9KVxuICAgIC50aGVuKG9iaiA9PiB7XG4gICAgICBpZiAob2JqKSB7ICAvLyB1cGRhdGVcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1cGRhdGluZyByZWNvcmQgaW4gZGIuJHt0YWJsZU5hbWV9YCk7XG4gICAgICAgIHJldHVybiBvYmoudXBkYXRlKHZhbHVlcyk7XG4gICAgICB9IGVsc2UgeyAgLy8gaW5zZXJ0XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gTW9kZWwuY3JlYXRlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYCR7dGFibGVOYW1lfS51cHNlcnQgZXJyb3JgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIlxuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0RmlsZSAoZmlsZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9TRUxFQ1RFRCxcbiAgICBkYXRhOiBmaWxlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyRmlsZSAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0NMRUFSLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1ldGFkYXRhIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuTUVUQURBVEFfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNsYWltICh2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0xBSU1fVVBEQVRFLFxuICAgIGRhdGE6IHZhbHVlLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFB1Ymxpc2hJbkNoYW5uZWwgKGNoYW5uZWwpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUwsXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQdWJsaXNoU3RhdHVzIChzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBzdGF0dXMsXG4gICAgICBtZXNzYWdlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRXJyb3IgKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5FUlJPUl9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHZhbHVlLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRDaGFubmVsIChjaGFubmVsTmFtZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuU0VMRUNURURfQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YTogY2hhbm5lbE5hbWUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTWV0YWRhdGFJbnB1dHMgKHNob3dNZXRhZGF0YUlucHV0cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUyxcbiAgICBkYXRhOiBzaG93TWV0YWRhdGFJbnB1dHMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdUaHVtYm5haWwgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRIVU1CTkFJTF9ORVcsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFB1Ymxpc2ggKGhpc3RvcnkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlBVQkxJU0hfU1RBUlQsXG4gICAgZGF0YTogeyBoaXN0b3J5IH0sXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHNpdGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxOYW1lICAgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIGNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGNoYW5uZWxMb25nSWQgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5sb25nSWQsXG4gICAgc2l0ZURlc2NyaXB0aW9uOiBzaXRlLmRlc2NyaXB0aW9uLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsTG9nb3V0OiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobnVsbCwgbnVsbCwgbnVsbCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG4vLyBiYXNpYyByZXF1ZXN0IHBhcnNpbmdcbmV4cG9ydCBmdW5jdGlvbiBvbkhhbmRsZVNob3dQYWdlVXJpIChwYXJhbXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSxcbiAgICBkYXRhOiBwYXJhbXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3Q2hhbm5lbFJlcXVlc3QgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBDSEFOTkVMO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgY3IjJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsXG4gICAgZGF0YTogeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdBc3NldFJlcXVlc3QgKG5hbWUsIGlkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBleHRlbnNpb24pIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBleHRlbnNpb24gPyBBU1NFVF9MSVRFIDogQVNTRVRfREVUQUlMUztcbiAgY29uc3QgcmVxdWVzdElkID0gYGFyIyR7bmFtZX0jJHtpZH0jJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgICAgbmFtZSxcbiAgICAgIG1vZGlmaWVyOiB7XG4gICAgICAgIGlkLFxuICAgICAgICBjaGFubmVsOiB7XG4gICAgICAgICAgbmFtZTogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgaWQgIDogY2hhbm5lbElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdFVwZGF0ZSAocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCAoaWQsIGVycm9yLCBrZXkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIGtleSB9LFxuICB9O1xufTtcblxuLy8gYXNzZXQgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZXRUb0Fzc2V0TGlzdCAoaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhIH0sXG4gIH07XG59XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QgKGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQURELFxuICAgIGRhdGE6IHsgaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsXG4gICAgZGF0YToge2NoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZX0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MsXG4gICAgZGF0YToge2NoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGF9LFxuICB9O1xufTtcblxuLy8gZGlzcGxheSBhIGZpbGVcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVSZXF1ZXN0ZWQgKG5hbWUsIGNsYWltSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfUkVRVUVTVEVELFxuICAgIGRhdGE6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkgKHN0YXR1cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFLFxuICAgIGRhdGE6IHN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHVhID0gcmVxdWlyZSgndW5pdmVyc2FsLWFuYWx5dGljcycpO1xuY29uc3QgeyBhbmFseXRpY3MgOiB7IGdvb2dsZUlkIH0sIGRldGFpbHM6IHsgdGl0bGUgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlU2VydmVFdmVudFBhcmFtcyAoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKSB7XG4gIHJldHVybiB7XG4gICAgZXZlbnRDYXRlZ29yeSAgICA6ICdjbGllbnQgcmVxdWVzdHMnLFxuICAgIGV2ZW50QWN0aW9uICAgICAgOiAnc2VydmUgcmVxdWVzdCcsXG4gICAgZXZlbnRMYWJlbCAgICAgICA6IG9yaWdpbmFsVXJsLFxuICAgIGlwT3ZlcnJpZGUgICAgICAgOiBpcCxcbiAgICB1c2VyQWdlbnRPdmVycmlkZTogaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb24gPSBlbmRUaW1lIC0gc3RhcnRUaW1lO1xuICByZXR1cm4ge1xuICAgIHVzZXJUaW1pbmdDYXRlZ29yeSAgICA6IGNhdGVnb3J5LFxuICAgIHVzZXJUaW1pbmdWYXJpYWJsZU5hbWU6IHZhcmlhYmxlLFxuICAgIHVzZXJUaW1pbmdUaW1lICAgICAgICA6IGR1cmF0aW9uLFxuICAgIHVzZXJUaW1pbmdMYWJlbCAgICAgICA6IGxhYmVsLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IChpcCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3JJZCA9IGlwLnJlcGxhY2UoL1xcLi9nLCAnLScpO1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci5ldmVudChwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nICh2aXNpdG9ySWQsIHBhcmFtcykge1xuICBjb25zdCB2aXNpdG9yID0gdWEoZ29vZ2xlSWQsIHZpc2l0b3JJZCwgeyBzdHJpY3RDaWRGb3JtYXQ6IGZhbHNlLCBodHRwczogdHJ1ZSB9KTtcbiAgdmlzaXRvci50aW1pbmcocGFyYW1zLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHb29nbGUgQW5hbHl0aWNzIEV2ZW50IEVycm9yID4+JywgZXJyKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBUaW1pbmcgZXZlbnQgc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gZ29vZ2xlIGFuYWx5dGljc2ApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZW5kR0FTZXJ2ZUV2ZW50IChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50KGlwLCBwYXJhbXMpO1xuICB9LFxuICBzZW5kR0FUaW1pbmdFdmVudCAoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKSB7XG4gICAgY29uc3QgcGFyYW1zID0gY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgc2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyh0aXRsZSwgcGFyYW1zKTtcbiAgfSxcbiAgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsICh7IGNoYW5uZWxfbmFtZTogY2hhbm5lbE5hbWUsIGNoYW5uZWxfaWQ6IGNoYW5uZWxJZCB9KSB7XG4gICAgcmV0dXJuIChjaGFubmVsTmFtZSB8fCBjaGFubmVsSWQgPyAnUFVCTElTSF9JTl9DSEFOTkVMX0NMQUlNJyA6ICdQVUJMSVNIX0FOT05ZTU9VU19DTEFJTScpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaXRlIH0pID0+IHtcbiAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIGRlc2NyaXB0aW9uOiBzaXRlRGVzY3JpcHRpb24sIGhvc3Q6IHNpdGVIb3N0LCB0aXRsZTogc2l0ZVRpdGxlLCB0d2l0dGVyOiBzaXRlVHdpdHRlciB9ID0gc2l0ZTtcbiAgcmV0dXJuIHtcbiAgICBkZWZhdWx0RGVzY3JpcHRpb24sXG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgICBzaXRlRGVzY3JpcHRpb24sXG4gICAgc2l0ZUhvc3QsXG4gICAgc2l0ZVRpdGxlLFxuICAgIHNpdGVUd2l0dGVyLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvU0VPL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInByb3AtdHlwZXNcIlxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICdjcm9zcy1mZXRjaC9wb2x5ZmlsbCc7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBKU09OIHJldHVybmVkIGJ5IGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBwYXJzZWQgSlNPTiBmcm9tIHRoZSByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSlNPTiAocmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0IHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA1KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIHN0YXR1cyByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0IHwgdW5kZWZpbmVkfSBSZXR1cm5zIG9iamVjdCB3aXRoIHN0YXR1cyBhbmQgc3RhdHVzVGV4dCwgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzIChyZXNwb25zZSwganNvblJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgIHJldHVybiBqc29uUmVzcG9uc2U7XG4gIH1cbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoanNvblJlc3BvbnNlLm1lc3NhZ2UpO1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBSZXF1ZXN0cyBhIFVSTCwgcmV0dXJuaW5nIGEgcHJvbWlzZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsICAgICAgIFRoZSBVUkwgd2Ugd2FudCB0byByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyB3ZSB3YW50IHRvIHBhc3MgdG8gXCJmZXRjaFwiXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICAgVGhlIHJlc3BvbnNlIGRhdGFcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0ICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3Jlc3BvbnNlLCBwYXJzZUpTT04ocmVzcG9uc2UpXSk7XG4gICAgfSlcbiAgICAudGhlbigoW3Jlc3BvbnNlLCBqc29uUmVzcG9uc2VdKSA9PiB7XG4gICAgICByZXR1cm4gY2hlY2tTdGF0dXMocmVzcG9uc2UsIGpzb25SZXNwb25zZSk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcmVxdWVzdC5qcyIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgYXBpOiB7IGFwaUhvc3QsIGFwaVBvcnQgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL2xicnlDb25maWcuanMnKTtcbmNvbnN0IGxicnlBcGlVcmkgPSAnaHR0cDovLycgKyBhcGlIb3N0ICsgJzonICsgYXBpUG9ydDtcbmNvbnN0IHsgY2hvb3NlR2FMYnJ5bmV0UHVibGlzaExhYmVsLCBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi9nb29nbGVBbmFseXRpY3MuanMnKTtcblxuY29uc3QgaGFuZGxlTGJyeW5ldFJlc3BvbnNlID0gKHsgZGF0YSB9LCByZXNvbHZlLCByZWplY3QpID0+IHtcbiAgbG9nZ2VyLmRlYnVnKCdsYnJ5IGFwaSBkYXRhOicsIGRhdGEpO1xuICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAvLyBjaGVjayBmb3IgYW4gZXJyb3JcbiAgICBpZiAoZGF0YS5yZXN1bHQuZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnTGJyeW5ldCBhcGkgZXJyb3I6JywgZGF0YS5yZXN1bHQuZXJyb3IpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihkYXRhLnJlc3VsdC5lcnJvcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGZhbGxiYWNrIGluIGNhc2UgaXQganVzdCB0aW1lZCBvdXRcbiAgcmVqZWN0KEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdWJsaXNoQ2xhaW0gKHB1Ymxpc2hQYXJhbXMpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUHVibGlzaGluZyBjbGFpbSB0byBcIiR7cHVibGlzaFBhcmFtcy5uYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAncHVibGlzaCcsXG4gICAgICAgICAgcGFyYW1zOiBwdWJsaXNoUGFyYW1zLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncHVibGlzaCcsIGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbChwdWJsaXNoUGFyYW1zKSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW0gKHVyaSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBHZXR0aW5nIENsYWltIGZvciBcIiR7dXJpfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpLCB0aW1lb3V0OiAyMCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW0nLCAnR0VUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1MaXN0IChjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBjbGFpbV9saXN0IGZvciBcIiR7Y2xhaW1OYW1lfVwiYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2xhaW1fbGlzdCcsXG4gICAgICAgICAgcGFyYW1zOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAnZ2V0Q2xhaW1MaXN0JywgJ0NMQUlNX0xJU1QnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICByZXNvbHZlVXJpICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gUmVzb2x2aW5nIFVSSSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3Jlc29sdmUnLFxuICAgICAgICAgIHBhcmFtczogeyB1cmkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2xicnluZXQnLCAncmVzb2x2ZVVyaScsICdSRVNPTFZFJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGlmIChkYXRhLnJlc3VsdFt1cmldLmVycm9yKSB7ICAvLyBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgICAgICByZWplY3QoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHsgIC8vIGlmIG5vIGVycm9ycywgcmVzb2x2ZVxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdFt1cmldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldERvd25sb2FkRGlyZWN0b3J5ICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ2xicnlBcGkgPj4gUmV0cmlldmluZyB0aGUgZG93bmxvYWQgZGlyZWN0b3J5IHBhdGggZnJvbSBsYnJ5IGRhZW1vbi4uLicpO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3NldHRpbmdzX2dldCcsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldERvd25sb2FkRGlyZWN0b3J5JywgJ1NFVFRJTkdTX0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQuZG93bmxvYWRfZGlyZWN0b3J5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignU3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byBsYnJ5IGRhZW1vbiwgYnV0IHVuYWJsZSB0byByZXRyaWV2ZSB0aGUgZG93bmxvYWQgZGlyZWN0b3J5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0xicnluZXQgRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlc29sdmUoJy9ob21lL2xicnkvRG93bmxvYWRzLycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlQ2hhbm5lbCAobmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgbGJyeUFwaSA+PiBDcmVhdGluZyBjaGFubmVsIGZvciAke25hbWV9Li4uYCk7XG4gICAgY29uc3QgZ2FTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBheGlvc1xuICAgICAgICAucG9zdChsYnJ5QXBpVXJpLCB7XG4gICAgICAgICAgbWV0aG9kOiAnY2hhbm5lbF9uZXcnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgY2hhbm5lbF9uYW1lOiBuYW1lLFxuICAgICAgICAgICAgYW1vdW50ICAgICAgOiAwLjEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2NyZWF0ZUNoYW5uZWwnLCAnQ0hBTk5FTF9ORVcnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaGFuZGxlTGJyeW5ldFJlc3BvbnNlKHJlc3BvbnNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlBcGkuanMiLCIvLyByZXF1ZXN0IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBIQU5ETEVfU0hPV19VUkkgPSAnSEFORExFX1NIT1dfVVJJJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0VSUk9SID0gJ1JFUVVFU1RfRVJST1InO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfVVBEQVRFID0gJ1JFUVVFU1RfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9SRVFVRVNUX05FVyA9ICdBU1NFVF9SRVFVRVNUX05FVyc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9SRVFVRVNUX05FVyA9ICdDSEFOTkVMX1JFUVVFU1RfTkVXJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0xJU1RfQUREID0gJ1JFUVVFU1RfTElTVF9BREQnO1xuXG4vLyBhc3NldCBhY3Rpb25zXG5leHBvcnQgY29uc3QgQVNTRVRfQUREID0gYEFTU0VUX0FERGA7XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQUREID0gJ0NIQU5ORUxfQUREJztcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyA9ICdDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTID0gJ0NIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTJztcblxuLy8gYXNzZXQvZmlsZSBkaXNwbGF5IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBGSUxFX1JFUVVFU1RFRCA9ICdGSUxFX1JFUVVFU1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFID0gJ0ZJTEVfQVZBSUxBQklMSVRZX1VQREFURSc7XG5leHBvcnQgY29uc3QgRElTUExBWV9BU1NFVF9FUlJPUiA9ICdESVNQTEFZX0FTU0VUX0VSUk9SJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3Qgc2VsZWN0QXNzZXQgPSAoc2hvdykgPT4ge1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtzaG93LnJlcXVlc3QuaWRdO1xuICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5O1xuICByZXR1cm4gc2hvdy5hc3NldExpc3RbYXNzZXRLZXldO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFNob3dTdGF0ZSA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4gc3RhdGUuc2hvdztcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJjb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIH0gPSByZXF1aXJlKCdoZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lLCBjbGFpbUlkKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2hhbm5lbChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2xhaW0obmFtZSwgY2xhaW1JZCk7XG4gICAgfVxuICB9LFxuICBnZXRDbGFpbUlkQnlDbGFpbSAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDbGFpbSgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNsYWltLmdldExvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNoYW5uZWwoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9LCAke2NsYWltTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBpZFxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbElkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxJZCwgZGIuQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbElkLCBjbGFpbU5hbWUpXSk7ICAvLyAyLiBnZXQgdGhlIGxvbmcgY2xhaW0gaWRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbElkLCBsb25nQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsRGF0YSAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIHNob3J0Q2hhbm5lbENsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICAgIHNob3J0Q2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zKGxvbmdDaGFubmVsQ2xhaW1JZCldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheV0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIGZvcm1hdCB0aGUgZGF0YSBmb3IgdGhlIHZpZXcsIGluY2x1ZGluZyBwYWdpbmF0aW9uXG4gICAgICAgICAgbGV0IHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSA9IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5LCBwYWdlKTtcbiAgICAgICAgICAvLyA0LiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uIGFuZCBjb250ZW50c1xuICAgICAgICAgIHJlc29sdmUocGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0TG9jYWxGaWxlUmVjb3JkIChjbGFpbUlkLCBuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkZpbGUuZmluZE9uZSh7d2hlcmU6IHtjbGFpbUlkLCBuYW1lfX0pXG4gICAgICAudGhlbihmaWxlID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIE5PX0ZJTEU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGUuZGF0YVZhbHVlcztcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYS9lZmZlY3RzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCJcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcbmNvbnN0IGxvY2FsTG9naW5TdHJhdGVneSA9IHJlcXVpcmUoJy4vbG9jYWwtbG9naW4uanMnKTtcbmNvbnN0IGxvY2FsU2lnbnVwU3RyYXRlZ3kgPSByZXF1aXJlKCcuL2xvY2FsLXNpZ251cC5qcycpO1xuY29uc3QgeyBzZXJpYWxpemVTcGVlY2hVc2VyLCBkZXNlcmlhbGl6ZVNwZWVjaFVzZXIgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvYXV0aEhlbHBlcnMuanMnKTtcblxucGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGRlc2VyaWFsaXplU3BlZWNoVXNlcik7XG5wYXNzcG9ydC5zZXJpYWxpemVVc2VyKHNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xucGFzc3BvcnQudXNlKCdsb2NhbC1sb2dpbicsIGxvY2FsTG9naW5TdHJhdGVneSk7XG5wYXNzcG9ydC51c2UoJ2xvY2FsLXNpZ251cCcsIGxvY2FsU2lnbnVwU3RyYXRlZ3kpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhc3Nwb3J0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2luZGV4LmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHB1Ymxpc2hIZWxwZXJzID0gcmVxdWlyZSgnaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBwdWJsaXNoaW5nOiB7IHByaW1hcnlDbGFpbUFkZHJlc3MsIGFkZGl0aW9uYWxDbGFpbUFkZHJlc3NlcyB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe1xuICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lOiBwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG4vLyBleHBvcnQgYWN0aW9uIGNyZWF0b3JzXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZSxcbiAgICAgIHNob3J0SWQsXG4gICAgICBsb25nSWQsXG4gICAgfSxcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9jaGFubmVsLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQWN0aXZlU3RhdHVzQmFyIGZyb20gJ2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyJztcbmltcG9ydCBJbmFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyJztcblxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGJhcnMgICAgICAgOiBbXSxcbiAgICAgIGluZGV4ICAgICAgOiAwLFxuICAgICAgaW5jcmVtZW50ZXI6IDEsXG4gICAgfTtcbiAgICB0aGlzLmNyZWF0ZUJhcnMgPSB0aGlzLmNyZWF0ZUJhcnMuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIgPSB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyID0gdGhpcy51cGRhdGVQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFByb2dyZXNzQmFyID0gdGhpcy5zdG9wUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5jcmVhdGVCYXJzKCk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyKCk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMuc3RvcFByb2dyZXNzQmFyKCk7XG4gIH1cbiAgY3JlYXRlQmFycyAoKSB7XG4gICAgY29uc3QgYmFycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMucHJvcHMuc2l6ZTsgaSsrKSB7XG4gICAgICBiYXJzLnB1c2goe2lzQWN0aXZlOiBmYWxzZX0pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgYmFycyB9KTtcbiAgfVxuICBzdGFydFByb2dyZXNzQmFyICgpIHtcbiAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVQcm9ncmVzc0Jhci5iaW5kKHRoaXMpLCAzMDApO1xuICB9O1xuICB1cGRhdGVQcm9ncmVzc0JhciAoKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleDtcbiAgICBsZXQgaW5jcmVtZW50ZXIgPSB0aGlzLnN0YXRlLmluY3JlbWVudGVyO1xuICAgIGxldCBiYXJzID0gdGhpcy5zdGF0ZS5iYXJzO1xuICAgIC8vIGZsaXAgaW5jcmVtZW50ZXIgaWYgbmVjZXNzYXJ5LCB0byBzdGF5IGluIGJvdW5kc1xuICAgIGlmICgoaW5kZXggPCAwKSB8fCAoaW5kZXggPiB0aGlzLnByb3BzLnNpemUpKSB7XG4gICAgICBpbmNyZW1lbnRlciA9IGluY3JlbWVudGVyICogLTE7XG4gICAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHRoZSBpbmRleGVkIGJhclxuICAgIGlmIChpbmNyZW1lbnRlciA+IDApIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFyc1tpbmRleF0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICAgIC8vIGluY3JlbWVudCBpbmRleFxuICAgIGluZGV4ICs9IGluY3JlbWVudGVyO1xuICAgIC8vIHVwZGF0ZSBzdGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYmFycyxcbiAgICAgIGluY3JlbWVudGVyLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG4gIHN0b3BQcm9ncmVzc0JhciAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZUludGVydmFsKTtcbiAgfTtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuc3RhdGUuYmFycy5tYXAoKGJhciwgaW5kZXgpID0+IGJhci5pc0FjdGl2ZSA/IDxBY3RpdmVTdGF0dXNCYXIga2V5PXtpbmRleH0gLz4gOiA8SW5hY3RpdmVTdGF0dXNCYXIga2V5PXtpbmRleH0vPil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5Qcm9ncmVzc0Jhci5wcm9wVHlwZXMgPSB7XG4gIHNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcblxuY2xhc3MgRXJyb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxwPntlcnJvcn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuRXJyb3JQYWdlLnByb3BUeXBlcyA9IHtcbiAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9FcnJvclBhZ2UvaW5kZXguanN4IiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBteXNxbCAoKSB7XG4gIHRoaXMuZGF0YWJhc2UgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXNlcm5hbWUgPSAnZGVmYXVsdCc7XG4gIHRoaXMucGFzc3dvcmQgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ05vIE15U1FMIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgLy8gY29uZmlndXJlIGNyZWRlbnRpYWxzXG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIG15c3FsLi4uJyk7XG4gICAgY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBjb25maWc7XG4gICAgdGhpcy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBteXNxbCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuU2hvcnRJZDogZnVuY3Rpb24gKGNsYWltc0FycmF5LCBsb25nSWQpIHtcbiAgICBsZXQgY2xhaW1JbmRleDtcbiAgICBsZXQgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgMSk7IC8vIGRlZmF1bHQgc2hvcnQgaWQgaXMgdGhlIGZpcnN0IGxldHRlclxuICAgIGxldCBzaG9ydElkTGVuZ3RoID0gMDtcbiAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGlzIGNsYWltIGlkXG4gICAgY2xhaW1JbmRleCA9IGNsYWltc0FycmF5LmZpbmRJbmRleChlbGVtZW50ID0+IHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYWltSWQgPT09IGxvbmdJZDtcbiAgICB9KTtcbiAgICBpZiAoY2xhaW1JbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xhaW0gaWQgbm90IGZvdW5kIGluIGNsYWltcyBsaXN0Jyk7XG4gICAgfVxuICAgIC8vIGdldCBhbiBhcnJheSBvZiBhbGwgY2xhaW1zIHdpdGggbG93ZXIgaGVpZ2h0XG4gICAgbGV0IHBvc3NpYmxlTWF0Y2hlcyA9IGNsYWltc0FycmF5LnNsaWNlKDAsIGNsYWltSW5kZXgpO1xuICAgIC8vIHJlbW92ZSBjZXJ0aWZpY2F0ZXMgd2l0aCB0aGUgc2FtZSBwcmVmaXhlcyB1bnRpbCBub25lIGFyZSBsZWZ0LlxuICAgIHdoaWxlIChwb3NzaWJsZU1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2hvcnRJZExlbmd0aCArPSAxO1xuICAgICAgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCk7XG4gICAgICBwb3NzaWJsZU1hdGNoZXMgPSBwb3NzaWJsZU1hdGNoZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQuY2xhaW1JZCAmJiAoZWxlbWVudC5jbGFpbUlkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKSA9PT0gc2hvcnRJZCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzaG9ydElkO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBSZWR1Y2VyIGZyb20gJ2NsaWVudC9yZWR1Y2Vycyc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEdBTGlzdGVuZXIgZnJvbSAnY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci8nO1xuaW1wb3J0IEFwcCBmcm9tICdjbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlLmpzJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyKTtcblxuICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gIGNvbnN0IGh0bWwgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICA8R0FMaXN0ZW5lcj5cbiAgICAgICAgICA8QXBwIC8+XG4gICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgIDwvU3RhdGljUm91dGVyPlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG5cbiAgLy8gZ2V0IGhlYWQgdGFncyBmcm9tIGhlbG1ldFxuICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgaWYgKGNvbnRleHQudXJsKSB7XG4gICAgLy8gU29tZXdoZXJlIGEgYDxSZWRpcmVjdD5gIHdhcyByZW5kZXJlZFxuICAgIHJldHVybiByZXMucmVkaXJlY3QoMzAxLCBjb250ZXh0LnVybCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UncmUgZ29vZCwgc2VuZCB0aGUgcmVzcG9uc2VcbiAgfVxuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIG91ciBSZWR1eCBzdG9yZVxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgcmVzLnNlbmQocmVuZGVyRnVsbFBhZ2UoaGVsbWV0LCBodG1sLCBwcmVsb2FkZWRTdGF0ZSkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFB1Ymxpc2hSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3B1Ymxpc2gnO1xuaW1wb3J0IENoYW5uZWxSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL2NoYW5uZWwnO1xuaW1wb3J0IFNob3dSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3Nob3cnO1xuaW1wb3J0IFNpdGVSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3NpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICBjaGFubmVsOiBDaGFubmVsUmVkdWNlcixcbiAgcHVibGlzaDogUHVibGlzaFJlZHVjZXIsXG4gIHNob3cgICA6IFNob3dSZWR1Y2VyLFxuICBzaXRlICAgOiBTaXRlUmVkdWNlcixcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IEZJTEVfU0VMRUNURUQgPSAnRklMRV9TRUxFQ1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9DTEVBUiA9ICdGSUxFX0NMRUFSJztcbmV4cG9ydCBjb25zdCBNRVRBREFUQV9VUERBVEUgPSAnTUVUQURBVEFfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBDTEFJTV9VUERBVEUgPSAnQ0xBSU1fVVBEQVRFJztcbmV4cG9ydCBjb25zdCBTRVRfUFVCTElTSF9JTl9DSEFOTkVMID0gJ1NFVF9QVUJMSVNIX0lOX0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hfU1RBVFVTX1VQREFURSA9ICdQVUJMSVNIX1NUQVRVU19VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEVSUk9SX1VQREFURSA9ICdFUlJPUl9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFID0gJ1NFTEVDVEVEX0NIQU5ORUxfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfTUVUQURBVEFfSU5QVVRTID0gJ1RPR0dMRV9NRVRBREFUQV9JTlBVVFMnO1xuZXhwb3J0IGNvbnN0IFRIVU1CTkFJTF9ORVcgPSAnVEhVTUJOQUlMX05FVyc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFSVCA9ICdQVUJMSVNIX1NUQVJUJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9HSU4gPSAnRXhpc3RpbmcnO1xuZXhwb3J0IGNvbnN0IENSRUFURSA9ICdOZXcnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMX1VQREFURSA9ICdDSEFOTkVMX1VQREFURSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPQ0FMX0NIRUNLID0gJ0xPQ0FMX0NIRUNLJztcbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRSA9ICdVTkFWQUlMQUJMRSc7XG5leHBvcnQgY29uc3QgRVJST1IgPSAnRVJST1InO1xuZXhwb3J0IGNvbnN0IEFWQUlMQUJMRSA9ICdBVkFJTEFCTEUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgR29vZ2xlQW5hbHl0aWNzIGZyb20gJ3JlYWN0LWdhJztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmNvbnN0IHsgYW5hbHl0aWNzOiB7IGdvb2dsZUlkIH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuR29vZ2xlQW5hbHl0aWNzLmluaXRpYWxpemUoZ29vZ2xlSWQpO1xuXG5jbGFzcyBHQUxpc3RlbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2VuZFBhZ2VWaWV3KHRoaXMucHJvcHMuaGlzdG9yeS5sb2NhdGlvbik7XG4gICAgdGhpcy5wcm9wcy5oaXN0b3J5Lmxpc3Rlbih0aGlzLnNlbmRQYWdlVmlldyk7XG4gIH1cblxuICBzZW5kUGFnZVZpZXcgKGxvY2F0aW9uKSB7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnNldCh7IHBhZ2U6IGxvY2F0aW9uLnBhdGhuYW1lIH0pO1xuICAgIEdvb2dsZUFuYWx5dGljcy5wYWdldmlldyhsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoR0FMaXN0ZW5lcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgSG9tZVBhZ2UgZnJvbSAncGFnZXMvSG9tZVBhZ2UnO1xuaW1wb3J0IEFib3V0UGFnZSBmcm9tICdwYWdlcy9BYm91dFBhZ2UnO1xuaW1wb3J0IExvZ2luUGFnZSBmcm9tICdwYWdlcy9Mb2dpblBhZ2UnO1xuaW1wb3J0IFNob3dQYWdlIGZyb20gJ3BhZ2VzL1Nob3dQYWdlJztcbmltcG9ydCBGb3VyT2hGb3VyUGFnZSBmcm9tICdjb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlJztcbi8vIGltcG9ydCB7IGR5bmFtaWNJbXBvcnQgfSBmcm9tICd1dGlscy9keW5hbWljSW1wb3J0Jztcbi8vIGNvbnN0IEhvbWVQYWdlID0gZHluYW1pY0ltcG9ydCgncGFnZXMvSG9tZVBhZ2UnKTsgLy8gb3IgdXNlIHRoZSBwcm92aWRlZCBsb2NhbCBob21lcGFnZVxuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN3aXRjaD5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9e0hvbWVQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9hYm91dCcgY29tcG9uZW50PXtBYm91dFBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2xvZ2luJyBjb21wb25lbnQ9e0xvZ2luUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmlkZW50aWZpZXIvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy86Y2xhaW0nIGNvbXBvbmVudD17U2hvd1BhZ2V9IC8+XG4gICAgICA8Um91dGUgY29tcG9uZW50PXtGb3VyT2hGb3VyUGFnZX0gLz5cbiAgICA8L1N3aXRjaD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcHAuanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgc2VsZWN0RmlsZSwgdXBkYXRlRXJyb3IsIGNsZWFyRmlsZSB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlICAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICB0aHVtYm5haWw6IHB1Ymxpc2gudGh1bWJuYWlsLFxuICAgIGZpbGVFcnJvcjogcHVibGlzaC5lcnJvci5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIHNlbGVjdEZpbGU6IChmaWxlKSA9PiB7XG4gICAgICBkaXNwYXRjaChzZWxlY3RGaWxlKGZpbGUpKTtcbiAgICB9LFxuICAgIHNldEZpbGVFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaChjbGVhckZpbGUoKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignZmlsZScsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJleHBvcnQgY29uc3QgQ0hBTk5FTCA9ICdDSEFOTkVMJztcbmV4cG9ydCBjb25zdCBBU1NFVF9MSVRFID0gJ0FTU0VUX0xJVEUnO1xuZXhwb3J0IGNvbnN0IEFTU0VUX0RFVEFJTFMgPSAnQVNTRVRfREVUQUlMUyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgZmlsZVJlcXVlc3RlZCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBlcnJvciBhbmQgc3RhdHVzXG4gIGNvbnN0IGVycm9yICA9IHNob3cuZGlzcGxheUFzc2V0LmVycm9yO1xuICBjb25zdCBzdGF0dXMgPSBzaG93LmRpc3BsYXlBc3NldC5zdGF0dXM7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgZXJyb3IsXG4gICAgc3RhdHVzLFxuICAgIGFzc2V0LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uRmlsZVJlcXVlc3Q6IChuYW1lLCBjbGFpbUlkKSA9PiB7XG4gICAgICBkaXNwYXRjaChmaWxlUmVxdWVzdGVkKG5hbWUsIGNsYWltSWQpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL2dlbmVyYWwuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvYnVuZGxlL2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICBgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBnZXRDbGFpbUlkLCBnZXRMb2NhbEZpbGVSZWNvcmQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCcuL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuY29uc3QgU0hPVyA9ICdTSE9XJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5mdW5jdGlvbiBjbGllbnRBY2NlcHRzSHRtbCAoe2FjY2VwdH0pIHtcbiAgcmV0dXJuIGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLyk7XG59O1xuXG5mdW5jdGlvbiByZXF1ZXN0SXNGcm9tQnJvd3NlciAoaGVhZGVycykge1xuICByZXR1cm4gaGVhZGVyc1sndXNlci1hZ2VudCddICYmIGhlYWRlcnNbJ3VzZXItYWdlbnQnXS5tYXRjaCgvTW96aWxsYS8pO1xufTtcblxuZnVuY3Rpb24gY2xpZW50V2FudHNBc3NldCAoe2FjY2VwdCwgcmFuZ2V9KSB7XG4gIGNvbnN0IGltYWdlSXNXYW50ZWQgPSBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC9pbWFnZVxcLy4qLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvXFwqLyk7XG4gIGNvbnN0IHZpZGVvSXNXYW50ZWQgPSBhY2NlcHQgJiYgcmFuZ2U7XG4gIHJldHVybiBpbWFnZUlzV2FudGVkIHx8IHZpZGVvSXNXYW50ZWQ7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2xhaW1JZCAoY2xhaW1JZCkge1xuICByZXR1cm4gKChjbGFpbUlkLmxlbmd0aCA9PT0gNDApICYmICEvW15BLVphLXowLTldL2cudGVzdChjbGFpbUlkKSk7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZCAoY2xhaW1JZCkge1xuICByZXR1cm4gY2xhaW1JZC5sZW5ndGggPT09IDE7ICAvLyBpdCBzaG91bGQgcmVhbGx5IGV2YWx1YXRlIHRoZSBzaG9ydCB1cmwgaXRzZWxmXG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCAoaW5wdXQpIHtcbiAgcmV0dXJuIChpc1ZhbGlkQ2xhaW1JZChpbnB1dCkgfHwgaXNWYWxpZFNob3J0SWQoaW5wdXQpKTtcbn07XG5cbmZ1bmN0aW9uIHNlcnZlQXNzZXRUb0NsaWVudCAoY2xhaW1JZCwgbmFtZSwgcmVzKSB7XG4gIHJldHVybiBnZXRMb2NhbEZpbGVSZWNvcmQoY2xhaW1JZCwgbmFtZSlcbiAgICAudGhlbihmaWxlUmVjb3JkID0+IHtcbiAgICAgIC8vIGNoZWNrIHRoYXQgYSBsb2NhbCByZWNvcmQgd2FzIGZvdW5kXG4gICAgICBpZiAoZmlsZVJlY29yZCA9PT0gTk9fRklMRSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygzMDcpLnJlZGlyZWN0KGAvYXBpL2NsYWltL2dldC8ke25hbWV9LyR7Y2xhaW1JZH1gKTtcbiAgICAgIH1cbiAgICAgIC8vIHNlcnZlIHRoZSBmaWxlXG4gICAgICBjb25zdCB7ZmlsZVBhdGgsIGZpbGVUeXBlfSA9IGZpbGVSZWNvcmQ7XG4gICAgICBsb2dnZXIudmVyYm9zZShgc2VydmluZyBmaWxlOiAke2ZpbGVQYXRofWApO1xuICAgICAgY29uc3Qgc2VuZEZpbGVPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgICAgICAgOiBmaWxlVHlwZSB8fCAnaW1hZ2UvanBlZycsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmRGaWxlKGZpbGVQYXRoLCBzZW5kRmlsZU9wdGlvbnMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpIHtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihmdWxsQ2xhaW1JZCA9PiB7XG4gICAgICAgIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2hhbm5lbCBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2ZUFzc2V0VG9DbGllbnQoZnVsbENsYWltSWQsIGNsYWltTmFtZSwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdzdWNjZXNzJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ2ZhaWwnKTtcbiAgICAgIH0pO1xuICB9LFxuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUgKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2VUeXBlO1xuICAgIGlmIChoYXNGaWxlRXh0ZW5zaW9uKSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTsgIC8vIGFzc3VtZSBhIHNlcnZlIHJlcXVlc3QgaWYgZmlsZSBleHRlbnNpb24gaXMgcHJlc2VudFxuICAgICAgaWYgKGNsaWVudEFjY2VwdHNIdG1sKGhlYWRlcnMpKSB7ICAvLyBpZiB0aGUgcmVxdWVzdCBjb21lcyBmcm9tIGEgYnJvd3NlciwgY2hhbmdlIGl0IHRvIGEgc2hvdyByZXF1ZXN0XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICBpZiAoY2xpZW50V2FudHNBc3NldChoZWFkZXJzKSAmJiByZXF1ZXN0SXNGcm9tQnJvd3NlcihoZWFkZXJzKSkgeyAgLy8gdGhpcyBpcyBpbiBjYXNlIHNvbWVvbmUgZW1iZWRzIGEgc2hvdyB1cmxcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdTaG93IHJlcXVlc3QgY2FtZSBmcm9tIGJyb3dzZXIgYnV0IHdhbnRzIGFuIGltYWdlL3ZpZGVvLiBDaGFuZ2luZyByZXNwb25zZSB0byBzZXJ2ZS4uLicpO1xuICAgICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlVHlwZTtcbiAgfSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSAoaWRlbnRpZmllciwgbmFtZSkge1xuICAgIC8vIHRoaXMgaXMgYSBwYXRjaCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCAnL25hbWUvY2xhaW1faWQnIHVybCBmb3JtYXRcbiAgICBpZiAoaXNWYWxpZFNob3J0SWRPckNsYWltSWQobmFtZSkgJiYgIWlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKGlkZW50aWZpZXIpKSB7XG4gICAgICBjb25zdCB0ZW1wTmFtZSA9IG5hbWU7XG4gICAgICBuYW1lID0gaWRlbnRpZmllcjtcbiAgICAgIGlkZW50aWZpZXIgPSB0ZW1wTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFtpZGVudGlmaWVyLCBuYW1lXTtcbiAgfSxcbiAgbG9nUmVxdWVzdERhdGEgKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZygncmVzcG9uc2VUeXBlID09PScsIHJlc3BvbnNlVHlwZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBuYW1lID09PSAnLCBjbGFpbU5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBuYW1lID09PScsIGNoYW5uZWxOYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIGlkID09PScsIGNsYWltSWQpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBpZGVudGlmaWVyOicsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHt2YWx1ZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciB1cmwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwgbmFtZSBhZnRlciBALicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltSWQsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG5hbWU6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgLicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yICR7bW9kaWZpZXJTZXBlcmF0b3J9LmApO1xuICAgICAgfVxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHttb2RpZmllclNlcGVyYXRvcn0gbW9kaWZpZXIgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZWApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VNb2RpZmllcjogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG1vZGlmaWVyOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb24gPSBmYWxzZTtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbixcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUmVkdWNlciBmcm9tICcuLi8uLi9jbGllbnQvcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXgnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi8uLi9jbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgaGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvc2FnYXMvc2hvd191cmknO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9hY3Rpb25zL3Nob3cnO1xuXG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHJldHVyblNhZ2FXaXRoUGFyYW1zID0gKHNhZ2EsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKiAoKSB7XG4gICAgeWllbGQgY2FsbChzYWdhLCBwYXJhbXMpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBvbkhhbmRsZVNob3dQYWdlVXJpKHJlcS5wYXJhbXMpO1xuICBjb25zdCBzYWdhID0gcmV0dXJuU2FnYVdpdGhQYXJhbXMoaGFuZGxlU2hvd1BhZ2VVcmksIGFjdGlvbik7XG5cbiAgLy8gcnVuIHRoZSBzYWdhIG1pZGRsZXdhcmVcbiAgc2FnYU1pZGRsZXdhcmVcbiAgICAucnVuKHNhZ2EpXG4gICAgLmRvbmVcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsImV4cG9ydCBjb25zdCBzZWxlY3RTaXRlU3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNpdGU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2l0ZUhvc3QgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHN0YXRlLnNpdGUuaG9zdDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2VsZWN0b3JzL3NpdGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtaGFuZGxlYmFyc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXNlc3Npb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cFwiXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSAocmVxLCByZXMsIG5leHQpID0+IHsgIC8vIGN1c3RvbSBsb2dnaW5nIG1pZGRsZXdhcmUgdG8gbG9nIGFsbCBpbmNvbWluZyBodHRwIHJlcXVlc3RzXG4gIGxvZ2dlci52ZXJib3NlKGBSZXF1ZXN0IG9uICR7cmVxLm9yaWdpbmFsVXJsfSBmcm9tICR7cmVxLmlwfWApO1xuICBuZXh0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3RMb2dnZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbWlkZGxld2FyZS9yZXF1ZXN0TG9nZ2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBMb2dnZXJDb25maWcgKCkge1xuICB0aGlzLmxvZ0xldmVsID0gJ2RlYnVnJztcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiBsb2dnZXIud2FybignTm8gbG9nZ2VyIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIHdpbnN0b24gbG9nZ2VyLi4uJyk7XG4gICAgLy8gdXBkYXRlIHZhbHVlcyB3aXRoIGxvY2FsIGNvbmZpZyBwYXJhbXNcbiAgICBjb25zdCB7bG9nTGV2ZWx9ID0gY29uZmlnO1xuICAgIHRoaXMubG9nTGV2ZWwgPSBsb2dMZXZlbDtcbiAgICAvLyBjb25maWd1cmUgdGhlIHdpbnN0b24gbG9nZ2VyXG4gICAgbG9nZ2VyLmNvbmZpZ3VyZSh7XG4gICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgIG5ldyAobG9nZ2VyLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubG9nTGV2ZWwsXG4gICAgICAgICAgdGltZXN0YW1wICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBwcmV0dHlQcmludCAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnMgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pO1xuICAgIC8vIHRlc3QgYWxsIHRoZSBsb2cgbGV2ZWxzXG4gICAgbG9nZ2VyLmluZm8oJ3Rlc3Rpbmcgd2luc3RvbiBsb2cgbGV2ZWxzLi4uJyk7XG4gICAgbG9nZ2VyLmVycm9yKCdMZXZlbCAwJyk7XG4gICAgbG9nZ2VyLndhcm4oJ0xldmVsIDEnKTtcbiAgICBsb2dnZXIuaW5mbygnTGV2ZWwgMicpO1xuICAgIGxvZ2dlci52ZXJib3NlKCdMZXZlbCAzJyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdMZXZlbCA0Jyk7XG4gICAgbG9nZ2VyLnNpbGx5KCdMZXZlbCA1Jyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb2dnZXJDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJjb25zdCB3aW5zdG9uU2xhY2tXZWJIb29rID0gcmVxdWlyZSgnd2luc3Rvbi1zbGFjay13ZWJob29rJykuU2xhY2tXZWJIb29rO1xuY29uc3Qgd2luc3RvbiA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gU2xhY2tDb25maWcgKCkge1xuICB0aGlzLnNsYWNrV2ViSG9vayAgICAgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gJ2RlZmF1bHQnO1xuICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVwZGF0ZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIHdpbnN0b24ud2FybignTm8gc2xhY2sgY29uZmlnIHJlY2VpdmVkJyk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB2YXJpYWJsZXNcbiAgICB3aW5zdG9uLmluZm8oJ2NvbmZpZ3VyaW5nIHNsYWNrIGxvZ2dlci4uLicpO1xuICAgIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLnNsYWNrV2ViSG9vayA9IHNsYWNrV2ViSG9vaztcbiAgICB0aGlzLnNsYWNrRXJyb3JDaGFubmVsID0gc2xhY2tFcnJvckNoYW5uZWw7XG4gICAgdGhpcy5zbGFja0luZm9DaGFubmVsID0gc2xhY2tJbmZvQ2hhbm5lbDtcbiAgICAvLyB1cGRhdGUgc2xhY2sgd2ViaG9vayBzZXR0aW5nc1xuICAgIGlmICh0aGlzLnNsYWNrV2ViSG9vaykge1xuICAgICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICAgIGlmICh0aGlzLnNsYWNrRXJyb3JDaGFubmVsKSB7XG4gICAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgICBuYW1lICAgICAgOiAnc2xhY2stZXJyb3JzLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ3dhcm4nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgICAgdXNlcm5hbWUgIDogJ3NwZWUuY2gnLFxuICAgICAgICAgIGljb25FbW9qaSA6ICc6ZmFjZV93aXRoX2hlYWRfYmFuZGFnZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBpZiAoc2xhY2tJbmZvQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWluZm8tdHJhbnNwb3J0JyxcbiAgICAgICAgICBsZXZlbCAgICAgOiAnaW5mbycsXG4gICAgICAgICAgd2ViaG9va1VybDogdGhpcy5zbGFja1dlYkhvb2ssXG4gICAgICAgICAgY2hhbm5lbCAgIDogdGhpcy5zbGFja0luZm9DaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOm5lcmRfZmFjZTonLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICAvLyBzZW5kIHRlc3QgbWVzc2FnZXNcbiAgICAgIHdpbnN0b24uaW5mbygndGVzdGluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICAgIHdpbnN0b24uZXJyb3IoJ1NsYWNrIFwiZXJyb3JcIiBsb2dnaW5nIGlzIG9ubGluZS4nKTtcbiAgICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbnN0b24ud2FybignU2xhY2sgbG9nZ2luZyBpcyBub3QgZW5hYmxlZCBiZWNhdXNlIG5vIHNsYWNrV2ViSG9vayBjb25maWcgdmFyIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNsYWNrQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2xhY2tDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIlxuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydFwiXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENlcnRpZmljYXRlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2VydGlmaWNhdGUnLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBrZXlUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwdWJsaWNLZXk6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2VydGlmaWNhdGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENlcnRpZmljYXRlLmJlbG9uZ3NUbyhkYi5DaGFubmVsLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChsb25nQ2hhbm5lbElkLCBjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCAke2NoYW5uZWxOYW1lfToke2xvbmdDaGFubmVsSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7bmFtZTogY2hhbm5lbE5hbWV9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwocykgZm91bmQgd2l0aCB0aGF0IGNoYW5uZWwgbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGxvbmdDaGFubmVsSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSAgIDogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtjaGFubmVsQ2xhaW1JZH0lYCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKCR7Y2hhbm5lbE5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjaGFubmVsTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS52YWxpZGF0ZUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgdmFsaWRhdGVMb25nQ2hhbm5lbElkKCR7bmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCAmJiAoY2hhbm5lbENsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDbGFpbUlkICYmIGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA8IDQwKSB7ICAvLyBpZiBhIHNob3J0IGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZShjaGFubmVsTmFtZSk7ICAvLyBpZiBubyBjaGFubmVsIGlkIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDZXJ0aWZpY2F0ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IENoYW5uZWwgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDaGFubmVsJyxcbiAgICB7XG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsQ2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENoYW5uZWwuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENoYW5uZWwuYmVsb25nc1RvKGRiLlVzZXIpO1xuICAgIENoYW5uZWwuaGFzT25lKGRiLkNlcnRpZmljYXRlKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIgfSkgPT4ge1xuICBjb25zdCBGaWxlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnRmlsZScsXG4gICAge1xuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICAgIDogSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdCAgOiAwLFxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVQYXRoOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVUeXBlOiB7XG4gICAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB0cmVuZGluZ0VsaWdpYmxlOiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgRmlsZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgRmlsZS5oYXNNYW55KGRiLlJlcXVlc3QpO1xuICAgIEZpbGUuaGFzT25lKGRiLkNsYWltKTtcbiAgfTtcblxuICBGaWxlLmdldFJlY2VudENsYWltcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWxsKHtcbiAgICAgIHdoZXJlOiB7IG5zZnc6IGZhbHNlLCB0cmVuZGluZ0VsaWdpYmxlOiB0cnVlIH0sXG4gICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICBsaW1pdDogMjUsXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEZpbGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9maWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgVEVYVCB9KSA9PiB7XG4gIGNvbnN0IFJlcXVlc3QgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdSZXF1ZXN0JyxcbiAgICB7XG4gICAgICBhY3Rpb246IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdXJsOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGlwQWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICB0eXBlICAgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBSZXF1ZXN0LmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBSZXF1ZXN0LmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJlcXVlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiY3J5cHRcIlxuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5ID0gcmVxdWlyZSgncGFzc3BvcnQtbG9jYWwnKS5TdHJhdGVneTtcbmNvbnN0IGxicnlBcGkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhc3Nwb3J0TG9jYWxTdHJhdGVneShcbiAge1xuICAgIHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXG4gICAgcGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcbiAgfSxcbiAgKHVzZXJuYW1lLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBuZXcgY2hhbm5lbCBzaWdudXAgcmVxdWVzdC4gdXNlcjogJHt1c2VybmFtZX0gcGFzczogJHtwYXNzd29yZH0gLmApO1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIC8vIHNlcnZlci1zaWRlIHZhbGlkYXRvbiBvZiBpbnB1dHMgKHVzZXJuYW1lLCBwYXNzd29yZClcblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhbm5lbCBhbmQgcmV0cmlldmUgdGhlIG1ldGFkYXRhXG4gICAgcmV0dXJuIGxicnlBcGkuY3JlYXRlQ2hhbm5lbChgQCR7dXNlcm5hbWV9YClcbiAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICAgIHVzZXJOYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyRGF0YSA+JywgdXNlckRhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgY2hhbm5lbERhdGEgPSB7XG4gICAgICAgICAgY2hhbm5lbE5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIGNoYW5uZWxDbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NoYW5uZWxEYXRhID4nLCBjaGFubmVsRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSBjZXJ0aWZpY2F0ZSByZWNvcmRcbiAgICAgICAgY29uc3QgY2VydGlmaWNhdGVEYXRhID0ge1xuICAgICAgICAgIGNsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICAgIG5hbWUgICA6IGBAJHt1c2VybmFtZX1gLFxuICAgICAgICAgIC8vIGFkZHJlc3MsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjZXJ0aWZpY2F0ZURhdGEgPicsIGNlcnRpZmljYXRlRGF0YSk7XG4gICAgICAgIC8vIHNhdmUgdXNlciBhbmQgY2VydGlmaWNhdGUgdG8gZGJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi5Vc2VyLmNyZWF0ZSh1c2VyRGF0YSksIGRiLkNoYW5uZWwuY3JlYXRlKGNoYW5uZWxEYXRhKSwgZGIuQ2VydGlmaWNhdGUuY3JlYXRlKGNlcnRpZmljYXRlRGF0YSldKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoW25ld1VzZXIsIG5ld0NoYW5uZWwsIG5ld0NlcnRpZmljYXRlXSkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgLy8gc3RvcmUgdGhlIHJlbGV2YW50IG5ld1VzZXIgaW5mbyB0byBiZSBwYXNzZWQgYmFjayBmb3IgcmVxLlVzZXJcbiAgICAgICAgdXNlckluZm9bJ2lkJ10gPSBuZXdVc2VyLmlkO1xuICAgICAgICB1c2VySW5mb1sndXNlck5hbWUnXSA9IG5ld1VzZXIudXNlck5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gbmV3Q2hhbm5lbC5jaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAvLyBhc3NvY2lhdGUgdGhlIGluc3RhbmNlc1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW25ld0NlcnRpZmljYXRlLnNldENoYW5uZWwobmV3Q2hhbm5lbCksIG5ld0NoYW5uZWwuc2V0VXNlcihuZXdVc2VyKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBhc3NvY2lhdGVkJyk7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHVzZXJJbmZvLmNoYW5uZWxDbGFpbUlkLCB1c2VySW5mby5jaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdzaWdudXAgZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBkb25lKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLXNpZ251cC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gcmV0dXJucyB1c2VyIGRhdGEgdG8gYmUgc2VyaWFsaXplZCBpbnRvIHNlc3Npb25cbiAgICBjb25zb2xlLmxvZygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBjb25zb2xlLmxvZygnZGVzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbmNvbnN0IGhhbmRsZVNpZ251cFJlcXVlc3QgPSByZXF1aXJlKCcuL3NpZ251cCcpO1xuY29uc3QgaGFuZGxlTG9naW5SZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dpbicpO1xuY29uc3QgaGFuZGxlTG9nb3V0UmVxdWVzdCA9IHJlcXVpcmUoJy4vbG9nb3V0Jyk7XG5jb25zdCBoYW5kbGVVc2VyUmVxdWVzdCA9IHJlcXVpcmUoJy4vdXNlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLnBvc3QoJy9zaWdudXAnLCBzcGVlY2hQYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLXNpZ251cCcpLCBoYW5kbGVTaWdudXBSZXF1ZXN0KTtcbiAgYXBwLnBvc3QoJy9sb2dpbicsIGhhbmRsZUxvZ2luUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9sb2dvdXQnLCBoYW5kbGVMb2dvdXRSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3VzZXInLCBoYW5kbGVVc2VyUmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2luZGV4LmpzIiwiY29uc3Qgc2lnbnVwID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZ251cDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9zaWdudXAuanMiLCJjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG5cbmNvbnN0IGxvZ2luID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtbG9naW4nLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICB9XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcS5sb2dJbih1c2VyLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KShyZXEsIHJlcywgbmV4dCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ2luLmpzIiwiY29uc3QgbG9nb3V0ID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcS5sb2dvdXQoKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICd5b3Ugc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dvdXQuanMiLCJjb25zdCB1c2VyID0gKHJlcSwgcmVzKSA9PiB7XG4gIGlmIChyZXEudXNlcikge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEudXNlcn0pO1xuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbid9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1c2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3VzZXIuanMiLCJjb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9jaGFubmVsQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjaGFubmVsQ2xhaW1zID0gcmVxdWlyZSgnLi9jaGFubmVsQ2xhaW1zJyk7XG5jb25zdCBjaGFubmVsRGF0YSA9IHJlcXVpcmUoJy4vY2hhbm5lbERhdGEnKTtcbmNvbnN0IGNoYW5uZWxTaG9ydElkID0gcmVxdWlyZSgnLi9jaGFubmVsU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NsYWltQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjbGFpbURhdGEgPSByZXF1aXJlKCcuL2NsYWltRGF0YScpO1xuY29uc3QgY2xhaW1HZXQgPSByZXF1aXJlKCcuL2NsYWltR2V0Jyk7XG5jb25zdCBjbGFpbUxvbmdJZCA9IHJlcXVpcmUoJy4vY2xhaW1Mb25nSWQnKTtcbmNvbnN0IGNsYWltUHVibGlzaCA9IHJlcXVpcmUoJy4vY2xhaW1QdWJsaXNoJyk7XG5jb25zdCBjbGFpbVJlc29sdmUgPSByZXF1aXJlKCcuL2NsYWltUmVzb2x2ZScpO1xuY29uc3QgY2xhaW1TaG9ydElkID0gcmVxdWlyZSgnLi9jbGFpbVNob3J0SWQnKTtcbmNvbnN0IGNsYWltTGlzdCA9IHJlcXVpcmUoJy4vY2xhaW1MaXN0Jyk7XG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9maWxlQXZhaWxhYmlsaXR5Jyk7XG5cbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSByZXF1aXJlKCdoZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIGNoYW5uZWwgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjaGFubmVsQXZhaWxhYmlsaXR5KTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjaGFubmVsU2hvcnRJZCk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9kYXRhLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQnLCBjaGFubmVsRGF0YSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsIGNoYW5uZWxDbGFpbXMpO1xuICAvLyBjbGFpbSByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9saXN0LzpuYW1lJywgY2xhaW1MaXN0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9nZXQvOm5hbWUvOmNsYWltSWQnLCBjbGFpbUdldCk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LzpuYW1lJywgY2xhaW1BdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Jlc29sdmUvOm5hbWUvOmNsYWltSWQnLCBjbGFpbVJlc29sdmUpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9wdWJsaXNoJywgbXVsdGlwYXJ0TWlkZGxld2FyZSwgY2xhaW1QdWJsaXNoKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgY2xhaW1TaG9ydElkKTtcbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vbG9uZy1pZCcsIGNsYWltTG9uZ0lkKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9kYXRhLzpjbGFpbU5hbWUvOmNsYWltSWQnLCBjbGFpbURhdGEpO1xuICAvLyBmaWxlIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2ZpbGUvYXZhaWxhYmlsaXR5LzpuYW1lLzpjbGFpbUlkJywgZmlsZUF2YWlsYWJpbGl0eSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvaW5kZXguanMiLCJjb25zdCB7IGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYXZhaWxhYmxlTmFtZSk7XG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IGdldENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgYWxsIGNsYWltcyBmb3IgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQ2xhaW1zID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gIGNvbnN0IHBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgZ2V0Q2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbENsYWltcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxDbGFpbXMuanMiLCJjb25zdCBDTEFJTVNfUEVSX1BBR0UgPSAxMjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBsb25nQ2hhbm5lbENsYWltSWQsIGNsYWltcywgcGFnZSkge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbFBhZ2VzKGNsYWltcyk7XG4gICAgY29uc3QgcGFnaW5hdGlvblBhZ2UgPSBtb2R1bGUuZXhwb3J0cy5nZXRQYWdlRnJvbVF1ZXJ5KHBhZ2UpO1xuICAgIGNvbnN0IHZpZXdEYXRhID0ge1xuICAgICAgY2hhbm5lbE5hbWUgICAgICAgOiBjaGFubmVsTmFtZSxcbiAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZDogbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgY2xhaW1zICAgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5leHRyYWN0UGFnZUZyb21DbGFpbXMoY2xhaW1zLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICBwcmV2aW91c1BhZ2UgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVByZXZpb3VzUGFnZShwYWdpbmF0aW9uUGFnZSksXG4gICAgICBjdXJyZW50UGFnZSAgICAgICA6IHBhZ2luYXRpb25QYWdlLFxuICAgICAgbmV4dFBhZ2UgICAgICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVOZXh0UGFnZSh0b3RhbFBhZ2VzLCBwYWdpbmF0aW9uUGFnZSksXG4gICAgICB0b3RhbFBhZ2VzICAgICAgICA6IHRvdGFsUGFnZXMsXG4gICAgICB0b3RhbFJlc3VsdHMgICAgICA6IG1vZHVsZS5leHBvcnRzLmRldGVybWluZVRvdGFsQ2xhaW1zKGNsYWltcyksXG4gICAgfTtcbiAgICByZXR1cm4gdmlld0RhdGE7XG4gIH0sXG4gIGdldFBhZ2VGcm9tUXVlcnkgKHBhZ2UpIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zIChjbGFpbXMsIHBhZ2VOdW1iZXIpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIFtdOyAgLy8gaWYgbm8gY2xhaW1zLCByZXR1cm4gdGhpcyBkZWZhdWx0XG4gICAgfVxuICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2xhaW1zIGlzIGFycmF5PycsIEFycmF5LmlzQXJyYXkoY2xhaW1zKSk7XG4gICAgLy8gbG9nZ2VyLmRlYnVnKGBwYWdlTnVtYmVyICR7cGFnZU51bWJlcn0gaXMgbnVtYmVyP2AsIE51bWJlci5pc0ludGVnZXIocGFnZU51bWJlcikpO1xuICAgIGNvbnN0IGNsYWltU3RhcnRJbmRleCA9IChwYWdlTnVtYmVyIC0gMSkgKiBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgY2xhaW1FbmRJbmRleCA9IGNsYWltU3RhcnRJbmRleCArIENMQUlNU19QRVJfUEFHRTtcbiAgICBjb25zdCBwYWdlT2ZDbGFpbXMgPSBjbGFpbXMuc2xpY2UoY2xhaW1TdGFydEluZGV4LCBjbGFpbUVuZEluZGV4KTtcbiAgICByZXR1cm4gcGFnZU9mQ2xhaW1zO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbFBhZ2VzIChjbGFpbXMpIHtcbiAgICBpZiAoIWNsYWltcykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvdGFsQ2xhaW1zID0gY2xhaW1zLmxlbmd0aDtcbiAgICAgIGlmICh0b3RhbENsYWltcyA8IENMQUlNU19QRVJfUEFHRSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZ1bGxQYWdlcyA9IE1hdGguZmxvb3IodG90YWxDbGFpbXMgLyBDTEFJTVNfUEVSX1BBR0UpO1xuICAgICAgY29uc3QgcmVtYWluZGVyID0gdG90YWxDbGFpbXMgJSBDTEFJTVNfUEVSX1BBR0U7XG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmdWxsUGFnZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVsbFBhZ2VzICsgMTtcbiAgICB9XG4gIH0sXG4gIGRldGVybWluZVByZXZpb3VzUGFnZSAoY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgLSAxO1xuICB9LFxuICBkZXRlcm1pbmVOZXh0UGFnZSAodG90YWxQYWdlcywgY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IHRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFBhZ2UgKyAxO1xuICB9LFxuICBkZXRlcm1pbmVUb3RhbENsYWltcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY2xhaW1zLmxlbmd0aDtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsImNvbnN0IHsgZ2V0Q2hhbm5lbERhdGEgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgZGF0YSBmb3IgYSBjaGFubmVsXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxEYXRhID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gIGlmIChjaGFubmVsQ2xhaW1JZCA9PT0gJ25vbmUnKSBjaGFubmVsQ2xhaW1JZCA9IG51bGw7XG4gIGdldENoYW5uZWxEYXRhKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgMClcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsRGF0YTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxEYXRhLmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbnJvdXRlIHRvIGdldCBhIHNob3J0IGNoYW5uZWwgaWQgZnJvbSBsb25nIGNoYW5uZWwgSWRcblxuKi9cblxuY29uc3QgY2hhbm5lbFNob3J0SWRSb3V0ZSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKHBhcmFtcy5sb25nSWQsIHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oc2hvcnRJZCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFubmVsU2hvcnRJZFJvdXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbFNob3J0SWQuanMiLCJjb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gY2hlY2sgd2hldGhlciB0aGlzIHNpdGUgcHVibGlzaGVkIHRvIGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtczogeyBuYW1lIH0gfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1BdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUF2YWlsYWJpbGl0eS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHJldHVybiBkYXRhIGZvciBhIGNsYWltXG5cbiovXG5cbmNvbnN0IGNsYWltRGF0YSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjbGFpbU5hbWUgPSBwYXJhbXMuY2xhaW1OYW1lO1xuICBsZXQgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBpZiAoY2xhaW1JZCA9PT0gJ25vbmUnKSBjbGFpbUlkID0gbnVsbDtcbiAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAudGhlbihjbGFpbUluZm8gPT4ge1xuICAgICAgaWYgKCFjbGFpbUluZm8pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIGNsYWltIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGNsYWltSW5mb30pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1EYXRhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1EYXRhLmpzIiwiY29uc3QgeyBnZXRDbGFpbSB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhLCBjcmVhdGVGaWxlRGF0YSB9ID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgY2xhaW1cblxuKi9cblxuY29uc3QgY2xhaW1HZXQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIC8vIHJlc29sdmUgdGhlIGNsYWltXG4gIGRiLkNsYWltLnJlc29sdmVDbGFpbShuYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKHJlc29sdmVSZXN1bHQgPT4ge1xuICAgICAgLy8gbWFrZSBzdXJlIGEgY2xhaW0gYWN0dWFsbHkgZXhpc3RzIGF0IHRoYXQgdXJpXG4gICAgICBpZiAoIXJlc29sdmVSZXN1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtYXRjaGluZyB1cmkgZm91bmQgaW4gQ2xhaW0gdGFibGUnKTtcbiAgICAgIH1cbiAgICAgIGxldCBmaWxlRGF0YSA9IGNyZWF0ZUZpbGVEYXRhKHJlc29sdmVSZXN1bHQpO1xuICAgICAgLy8gZ2V0IHRoZSBjbGFpbVxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlRGF0YSwgZ2V0Q2xhaW0oYCR7bmFtZX0jJHtjbGFpbUlkfWApXSk7XG4gICAgfSlcbiAgICAudGhlbigoWyBmaWxlRGF0YSwgZ2V0UmVzdWx0IF0pID0+IHtcbiAgICAgIGZpbGVEYXRhID0gYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEoZmlsZURhdGEsIGdldFJlc3VsdCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLnVwc2VydChkYi5GaWxlLCBmaWxlRGF0YSwge25hbWUsIGNsYWltSWR9LCAnRmlsZScpLCBnZXRSZXN1bHRdKTtcbiAgICB9KVxuICAgIC50aGVuKChbIGZpbGVSZWNvcmQsIHttZXNzYWdlLCBjb21wbGV0ZWR9IF0pID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZSwgY29tcGxldGVkIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1HZXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsImNvbnN0IHsgZ2V0Q2xhaW1JZCB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIGxvbmcgY2xhaW0gaWRcblxuKi9cblxuY29uc3QgY2xhaW1Mb25nSWQgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2hhbm5lbE5hbWUgPSBib2R5LmNoYW5uZWxOYW1lO1xuICBjb25zdCBjaGFubmVsQ2xhaW1JZCA9IGJvZHkuY2hhbm5lbENsYWltSWQ7XG4gIGNvbnN0IGNsYWltTmFtZSA9IGJvZHkuY2xhaW1OYW1lO1xuICBjb25zdCBjbGFpbUlkID0gYm9keS5jbGFpbUlkO1xuICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0ID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3VsdH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1Mb25nSWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsImNvbnN0IHsgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zLCBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zLCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSwgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIH0gPSByZXF1aXJlKCdoZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlLCBwdWJsaXNoIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBhdXRoZW50aWNhdGVVc2VyIH0gPSByZXF1aXJlKCdhdXRoL2F1dGhlbnRpY2F0aW9uLmpzJyk7XG5jb25zdCB7IHNlbmRHQVRpbWluZ0V2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBwdWJsaXNoIGEgY2xhaW0gdGhyb3VnaCB0aGUgZGFlbW9uXG5cbiovXG5cbmNvbnN0IGNsYWltUHVibGlzaCA9ICh7IGJvZHksIGZpbGVzLCBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHVzZXIgfSwgcmVzKSA9PiB7XG4gIC8vIGRlZmluZSB2YXJpYWJsZXNcbiAgbGV0ICBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIGRlc2NyaXB0aW9uLCBmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgbGljZW5zZSwgbmFtZSwgbnNmdywgdGh1bWJuYWlsLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlLCB0aXRsZTtcbiAgLy8gcmVjb3JkIHRoZSBzdGFydCB0aW1lIG9mIHRoZSByZXF1ZXN0XG4gIGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgLy8gdmFsaWRhdGUgdGhlIGJvZHkgYW5kIGZpbGVzIG9mIHRoZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgLy8gdmFsaWRhdGVBcGlQdWJsaXNoUmVxdWVzdChib2R5LCBmaWxlcyk7XG4gICAgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keShib2R5KSk7XG4gICAgKHtmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlfSA9IHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyhmaWxlcykpO1xuICAgICh7Y2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkfSA9IGJvZHkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBjaGVjayBjaGFubmVsIGF1dGhvcml6YXRpb25cbiAgUHJvbWlzZVxuICAgIC5hbGwoW1xuICAgICAgYXV0aGVudGljYXRlVXNlcihjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpLFxuICAgICAgY2xhaW1OYW1lSXNBdmFpbGFibGUobmFtZSksXG4gICAgICBjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSxcbiAgICAgIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXModGh1bWJuYWlsRmlsZVBhdGgsIG5hbWUsIGxpY2Vuc2UsIG5zZncpLFxuICAgIF0pXG4gICAgLnRoZW4oKFt7Y2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkfSwgdmFsaWRhdGVkQ2xhaW1OYW1lLCBwdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxQdWJsaXNoUGFyYW1zXSkgPT4ge1xuICAgICAgLy8gYWRkIGNoYW5uZWwgZGV0YWlscyB0byB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICAgIGlmIChjaGFubmVsTmFtZSAmJiBjaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX25hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX2lkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgIH1cbiAgICAgIC8vIHB1Ymxpc2ggdGhlIHRodW1ibmFpbFxuICAgICAgaWYgKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMpIHtcbiAgICAgICAgcHVibGlzaCh0aHVtYm5haWxQdWJsaXNoUGFyYW1zLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVR5cGUpO1xuICAgICAgfVxuICAgICAgLy8gcHVibGlzaCB0aGUgYXNzZXRcbiAgICAgIHJldHVybiBwdWJsaXNoKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSk7XG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiAncHVibGlzaCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgZGF0YSAgIDoge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgY2xhaW1JZDogcmVzdWx0LmNsYWltX2lkLFxuICAgICAgICAgIHVybCAgICA6IGAke2hvc3R9LyR7cmVzdWx0LmNsYWltX2lkfS8ke25hbWV9YCxcbiAgICAgICAgICBsYnJ5VHggOiByZXN1bHQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIC8vIHJlY29yZCB0aGUgcHVibGlzaCBlbmQgdGltZSBhbmQgc2VuZCB0byBnb29nbGUgYW5hbHl0aWNzXG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdwdWJsaXNoJywgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltUHVibGlzaDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltUHVibGlzaC5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRoZW50aWNhdGVVc2VyIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpIHtcbiAgICAvLyBjYXNlOiBubyBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCAoYW5vbnltb3VzKSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVzZXIgdG9rZW4gaXMgcHJvdmlkZWRcbiAgICBpZiAoIWNoYW5uZWxOYW1lICYmICFjaGFubmVsSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiBudWxsLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggdXNlciB0b2tlblxuICAgIGlmICh1c2VyKSB7XG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbE5hbWUgIT09IHVzZXIuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBuYW1lIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFubmVsSWQgJiYgY2hhbm5lbElkICE9PSB1c2VyLmNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgaWQgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiB1c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCBwYXNzd29yZCBpbnN0ZWFkIG9mIHVzZXIgdG9rZW5cbiAgICBpZiAoIWNoYW5uZWxQYXNzd29yZCkgdGhyb3cgbmV3IEVycm9yKCdubyBjaGFubmVsIHBhc3N3b3JkIHByb3ZpZGVkJyk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyhjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQpO1xuICB9LFxuICBhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIHVzZXJQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBob2lzdGVkIHZhcmlhYmxlc1xuICAgICAgbGV0IGNoYW5uZWxEYXRhO1xuICAgICAgLy8gYnVpbGQgdGhlIHBhcmFtcyBmb3IgZmluZGluZyB0aGUgY2hhbm5lbFxuICAgICAgbGV0IGNoYW5uZWxGaW5kUGFyYW1zID0ge307XG4gICAgICBpZiAoY2hhbm5lbE5hbWUpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICBpZiAoY2hhbm5lbElkKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxJZDtcbiAgICAgIC8vIGZpbmQgdGhlIGNoYW5uZWxcbiAgICAgIGRiLkNoYW5uZWxcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiBjaGFubmVsRmluZFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIGNoYW5uZWwgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGFubmVsRGF0YSA9IGNoYW5uZWwuZ2V0KCk7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIGRhdGE6JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAgIHJldHVybiBkYi5Vc2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgdXNlck5hbWU6IGNoYW5uZWxEYXRhLmNoYW5uZWxOYW1lLnN1YnN0cmluZygxKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZCh1c2VyUGFzc3dvcmQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCcuLi5wYXNzd29yZCB3YXMgYSBtYXRjaC4uLicpO1xuICAgICAgICAgIHJlc29sdmUoY2hhbm5lbERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgeyByZXNvbHZlVXJpIH0gPSByZXF1aXJlKCdoZWxwZXJzL2xicnlBcGkuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcnVuIGEgcmVzb2x2ZSByZXF1ZXN0IG9uIHRoZSBkYWVtb25cblxuKi9cblxuY29uc3QgY2xhaW1SZXNvbHZlID0gKHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIHJlc29sdmVVcmkoYCR7cGFyYW1zLm5hbWV9IyR7cGFyYW1zLmNsYWltSWR9YClcbiAgICAudGhlbihyZXNvbHZlZFVyaSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNvbHZlZFVyaSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVJlc29sdmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVJlc29sdmUuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBzaG9ydCBjbGFpbSBpZCBmcm9tIGxvbmcgY2xhaW0gSWRcblxuKi9cblxuY29uc3QgY2xhaW1TaG9ydElkID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGRiLkNsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBzaG9ydElkfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVNob3J0SWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVNob3J0SWQuanMiLCJjb25zdCB7IGdldENsYWltTGlzdCB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBsaXN0IG9mIGNsYWltc1xuXG4qL1xuXG5jb25zdCBjbGFpbUxpc3QgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZ2V0Q2xhaW1MaXN0KHBhcmFtcy5uYW1lKVxuICAgIC50aGVuKGNsYWltc0xpc3QgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zTGlzdCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbUxpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byBzZWUgaWYgYXNzZXQgaXMgYXZhaWxhYmxlIGxvY2FsbHlcblxuKi9cblxuY29uc3QgZmlsZUF2YWlsYWJpbGl0eSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgZGIuRmlsZVxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGNsYWltSWQsXG4gICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiB0cnVlfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogZmFsc2V9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGVBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9maWxlQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgbXVsdGlwYXJ0ID0gcmVxdWlyZSgnY29ubmVjdC1tdWx0aXBhcnR5Jyk7XHJcbmNvbnN0IHsgcHVibGlzaGluZzogeyB1cGxvYWREaXJlY3RvcnkgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xyXG5jb25zdCBtdWx0aXBhcnRNaWRkbGV3YXJlID0gbXVsdGlwYXJ0KHt1cGxvYWREaXI6IHVwbG9hZERpcmVjdG9yeX0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBhcnRNaWRkbGV3YXJlO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tdWx0aXBhcnR5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCJcbi8vIG1vZHVsZSBpZCA9IDEwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBoYW5kbGVQYWdlUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZFJlYWN0QXBwJyk7XG5jb25zdCBoYW5kbGVFbWJlZFJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRFbWJlZFBhZ2UnKTtcbmNvbnN0IHJlZGlyZWN0ID0gcmVxdWlyZSgnLi9yZWRpcmVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLmdldCgnLycsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2xvZ2luJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvYWJvdXQnLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy90cmVuZGluZycsIHJlZGlyZWN0KCcvcG9wdWxhcicpKTtcbiAgYXBwLmdldCgnL3BvcHVsYXInLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9uZXcnLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9lbWJlZC86Y2xhaW1JZC86bmFtZScsIGhhbmRsZUVtYmVkUmVxdWVzdCk7ICAvLyByb3V0ZSB0byBzZW5kIGVtYmVkYWJsZSB2aWRlbyBwbGF5ZXIgKGZvciB0d2l0dGVyKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJjb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5jb25zdCBzZW5kUmVhY3RBcHAgPSAocmVxLCByZXMpID0+IHtcbiAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRSZWFjdEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvcGFnZXMvc2VuZFJlYWN0QXBwLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9HSU4gfSBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMnO1xuY29uc3QgeyBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGlzYWJsZWQgICAgICAgICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkLFxuICBkaXNhYmxlZE1lc3NhZ2UgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWRNZXNzYWdlLFxuICBwdWJsaXNoSW5DaGFubmVsICA6IGZhbHNlLFxuICBzZWxlY3RlZENoYW5uZWwgICA6IExPR0lOLFxuICBzaG93TWV0YWRhdGFJbnB1dHM6IGZhbHNlLFxuICBzdGF0dXMgICAgICAgICAgICA6IHtcbiAgICBzdGF0dXMgOiBudWxsLFxuICAgIG1lc3NhZ2U6IG51bGwsXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgZmlsZSAgICAgICAgIDogbnVsbCxcbiAgICB1cmwgICAgICAgICAgOiBudWxsLFxuICAgIGNoYW5uZWwgICAgICA6IG51bGwsXG4gICAgcHVibGlzaFN1Ym1pdDogbnVsbCxcbiAgfSxcbiAgZmlsZSAgICA6IG51bGwsXG4gIGNsYWltICAgOiAnJyxcbiAgbWV0YWRhdGE6IHtcbiAgICB0aXRsZSAgICAgIDogJycsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGxpY2Vuc2UgICAgOiAnJyxcbiAgICBuc2Z3ICAgICAgIDogZmFsc2UsXG4gIH0sXG4gIHRodW1ibmFpbDogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9TRUxFQ1RFRDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpbml0aWFsU3RhdGUsIHsgIC8vIG5vdGU6IGNsZWFycyB0byBpbml0aWFsIHN0YXRlXG4gICAgICAgIGZpbGU6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQ0xFQVI6XG4gICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICAgIGNhc2UgYWN0aW9ucy5NRVRBREFUQV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbWV0YWRhdGE6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLm1ldGFkYXRhLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0xBSU1fVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNsYWltOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw6IGFjdGlvbi5jaGFubmVsLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlBVQkxJU0hfU1RBVFVTX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkVSUk9SX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBlcnJvcjogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZXJyb3IsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5TRUxFQ1RFRF9DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZWxlY3RlZENoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFM6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2hvd01ldGFkYXRhSW5wdXRzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5USFVNQk5BSUxfTkVXOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHRodW1ibmFpbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvcHVibGlzaC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsb2dnZWRJbkNoYW5uZWw6IHtcbiAgICBuYW1lICAgOiBudWxsLFxuICAgIHNob3J0SWQ6IG51bGwsXG4gICAgbG9uZ0lkIDogbnVsbCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9nZ2VkSW5DaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgTE9DQUxfQ0hFQ0ssIEVSUk9SIH0gZnJvbSAnY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICByZXF1ZXN0OiB7XG4gICAgZXJyb3I6IG51bGwsXG4gICAgdHlwZSA6IG51bGwsXG4gICAgaWQgICA6IG51bGwsXG4gIH0sXG4gIHJlcXVlc3RMaXN0IDoge30sXG4gIGNoYW5uZWxMaXN0IDoge30sXG4gIGFzc2V0TGlzdCAgIDoge30sXG4gIGRpc3BsYXlBc3NldDoge1xuICAgIGVycm9yIDogbnVsbCxcbiAgICBzdGF0dXM6IExPQ0FMX0NIRUNLLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIC8vIGhhbmRsZSByZXF1ZXN0XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdCwge1xuICAgICAgICAgIHR5cGU6IGFjdGlvbi5kYXRhLnJlcXVlc3RUeXBlLFxuICAgICAgICAgIGlkICA6IGFjdGlvbi5kYXRhLnJlcXVlc3RJZCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBzdG9yZSByZXF1ZXN0c1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0xJU1RfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3RMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIGtleSAgOiBhY3Rpb24uZGF0YS5rZXksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBhc3NldCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkFTU0VUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBhc3NldExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmFzc2V0TGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIGVycm9yICAgIDogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBuYW1lICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICA6IGFjdGlvbi5kYXRhLmNsYWltSWQsXG4gICAgICAgICAgICBzaG9ydElkICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbURhdGE6IGFjdGlvbi5kYXRhLmNsYWltRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGNoYW5uZWwgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBuYW1lICAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgbG9uZ0lkICAgIDogYWN0aW9uLmRhdGEubG9uZ0lkLFxuICAgICAgICAgICAgc2hvcnRJZCAgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXSwge1xuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBkaXNwbGF5IGFuIGFzc2V0XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfQVZBSUxBQklMSVRZX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBlcnJvciA6IGFjdGlvbi5kYXRhLFxuICAgICAgICAgIHN0YXR1czogRVJST1IsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJjb25zdCBzaXRlQ29uZmlnID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCB7XG4gIGFuYWx5dGljczoge1xuICAgIGdvb2dsZUlkOiBnb29nbGVBbmFseXRpY3NJZCxcbiAgfSxcbiAgYXNzZXREZWZhdWx0czoge1xuICAgIHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCxcbiAgICBkZXNjcmlwdGlvbjogZGVmYXVsdERlc2NyaXB0aW9uLFxuICB9LFxuICBkZXRhaWxzOiB7XG4gICAgZGVzY3JpcHRpb24sXG4gICAgaG9zdCxcbiAgICB0aXRsZSxcbiAgICB0d2l0dGVyLFxuICB9LFxufSA9IHNpdGVDb25maWc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGVzY3JpcHRpb24sXG4gIGdvb2dsZUFuYWx5dGljc0lkLFxuICBob3N0LFxuICB0aXRsZSxcbiAgdHdpdHRlcixcbiAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICBkZWZhdWx0VGh1bWJuYWlsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1nYVwiXG4vLyBtb2R1bGUgaWQgPSAxMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgUHVibGlzaFRvb2wgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVG9vbCc7XG5cbmNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nfT5cbiAgICAgICAgPFNFTyAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCBmbGV4LWNvbnRhaW5lci0tY29sdW1uJ30+XG4gICAgICAgICAgPFB1Ymxpc2hUb29sIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZVBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvSG9tZVBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGNyZWF0ZVBhZ2VUaXRsZSB9IGZyb20gJ3V0aWxzL3BhZ2VUaXRsZSc7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGFncyB9IGZyb20gJ3V0aWxzL21ldGFUYWdzJztcbmltcG9ydCB7IGNyZWF0ZUNhbm9uaWNhbExpbmsgfSBmcm9tICd1dGlscy9jYW5vbmljYWxMaW5rJztcblxuY2xhc3MgU0VPIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICAvLyBwcm9wcyBmcm9tIHN0YXRlXG4gICAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gcHJvcHMgZnJvbSBwYXJlbnRcbiAgICBjb25zdCB7IGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCB7IHBhZ2VUaXRsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjcmVhdGUgcGFnZSB0aXRsZSwgdGFncywgYW5kIGNhbm9uaWNhbCBsaW5rXG4gICAgcGFnZVRpdGxlID0gY3JlYXRlUGFnZVRpdGxlKHNpdGVUaXRsZSwgcGFnZVRpdGxlKTtcbiAgICBjb25zdCBtZXRhVGFncyA9IGNyZWF0ZU1ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgIGNvbnN0IGNhbm9uaWNhbExpbmsgPSBjcmVhdGVDYW5vbmljYWxMaW5rKGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpLCBzaXRlSG9zdCk7XG4gICAgLy8gcmVuZGVyIHJlc3VsdHNcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldFxuICAgICAgICB0aXRsZT17cGFnZVRpdGxlfVxuICAgICAgICBtZXRhPXttZXRhVGFnc31cbiAgICAgICAgbGluaz17W3tyZWw6ICdjYW5vbmljYWwnLCBocmVmOiBjYW5vbmljYWxMaW5rfV19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblNFTy5wcm9wVHlwZXMgPSB7XG4gIHBhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGFnZVVyaSAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGFubmVsICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIGFzc2V0ICAgIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNFTztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsImV4cG9ydCBjb25zdCBjcmVhdGVQYWdlVGl0bGUgPSAoc2l0ZVRpdGxlLCBwYWdlVGl0bGUpID0+IHtcbiAgaWYgKCFwYWdlVGl0bGUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZVRpdGxlfWA7XG4gIH1cbiAgcmV0dXJuIGAke3NpdGVUaXRsZX0gLSAke3BhZ2VUaXRsZX1gO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9wYWdlVGl0bGUuanMiLCJjb25zdCBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gKHRodW1ibmFpbCkgPT4ge1xuICBpZiAodGh1bWJuYWlsKSB7XG4gICAgY29uc3QgZmlsZUV4dCA9IHRodW1ibmFpbC5zdWJzdHJpbmcodGh1bWJuYWlsLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIHN3aXRjaCAoZmlsZUV4dCkge1xuICAgICAgY2FzZSAnanBlZyc6XG4gICAgICBjYXNlICdqcGcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgICAgY2FzZSAncG5nJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9wbmcnO1xuICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9naWYnO1xuICAgICAgY2FzZSAnbXA0JzpcbiAgICAgICAgcmV0dXJuICd2aWRlby9tcDQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuY29uc3QgY3JlYXRlQmFzaWNNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKSA9PiB7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNpdGVIb3N0fSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogc2l0ZURlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxNZXRhVGFncyA9IChzaXRlVGl0bGUsIHNpdGVIb3N0LCBzaXRlVHdpdHRlciwgY2hhbm5lbCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IGAke25hbWV9IG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBgJHtuYW1lfSwgYSBjaGFubmVsIG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YSB9ID0gYXNzZXQ7XG4gIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGNsYWltRGF0YTtcbiAgY29uc3QgZW1iZWRVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzaG93VXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc291cmNlID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9LiR7Y2xhaW1EYXRhLmZpbGVFeHR9YDtcbiAgY29uc3Qgb2dUaXRsZSA9IGNsYWltRGF0YS50aXRsZSB8fCBjbGFpbURhdGEubmFtZTtcbiAgY29uc3Qgb2dEZXNjcmlwdGlvbiA9IGNsYWltRGF0YS5kZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb247XG4gIGNvbnN0IG9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlKGNsYWltRGF0YS50aHVtYm5haWwpO1xuICBjb25zdCBvZ1RodW1ibmFpbCA9IGNsYWltRGF0YS50aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbDtcbiAgY29uc3QgbWV0YVRhZ3MgPSBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBvZ1RpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaG93VXJsfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogb2dEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6d2lkdGgnLCBjb250ZW50OiA2MDB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOmhlaWdodCcsIGNvbnRlbnQ6IDMxNX0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICBdO1xuICBpZiAoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnIHx8IGNvbnRlbnRUeXBlID09PSAndmlkZW8vd2VibScpIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzpzZWN1cmVfdXJsJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogb2dUaHVtYm5haWx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBvZ1RodW1ibmFpbENvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ3ZpZGVvJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3BsYXllcid9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyJywgY29udGVudDogZW1iZWRVcmx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOndpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnRleHQ6cGxheWVyX3dpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpoZWlnaHQnLCBjb250ZW50OiAzMzd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtOmNvbnRlbnRfdHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gIH0gZWxzZSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ2FydGljbGUnfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeV9sYXJnZV9pbWFnZSd9KTtcbiAgfVxuICByZXR1cm4gbWV0YVRhZ3M7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTWV0YVRhZ3MgPSAoc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIH07XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgY2hhbm5lbCk7XG4gIH07XG4gIHJldHVybiBjcmVhdGVCYXNpY01ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsImNvbnN0IGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayA9IChwYWdlLCBzaXRlSG9zdCkgPT4ge1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7cGFnZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rID0gKGFzc2V0LCBzaXRlSG9zdCkgPT4ge1xuICBsZXQgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQ7XG4gIGlmIChhc3NldC5jbGFpbURhdGEpIHtcbiAgICAoeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgbmFtZSwgY2xhaW1JZCB9ID0gYXNzZXQuY2xhaW1EYXRhKTtcbiAgfTtcbiAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9LyR7bmFtZX1gO1xuICB9O1xuICByZXR1cm4gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayA9IChjaGFubmVsLCBzaXRlSG9zdCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWA7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2Fub25pY2FsTGluayA9IChhc3NldCwgY2hhbm5lbCwgcGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayhhc3NldCwgc2l0ZUhvc3QpO1xuICB9XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rKGNoYW5uZWwsIHNpdGVIb3N0KTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rKHBhZ2UsIHNpdGVIb3N0KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOYXZMaW5rLCB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgTG9nbyBmcm9tICdjb21wb25lbnRzL0xvZ28nO1xuaW1wb3J0IE5hdkJhckNoYW5uZWxEcm9wZG93biBmcm9tICdjb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24nO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNvbnN0IFZJRVcgPSAnVklFVyc7XG5jb25zdCBMT0dPVVQgPSAnTE9HT1VUJztcblxuY2xhc3MgTmF2QmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIgPSB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dvdXRVc2VyID0gdGhpcy5sb2dvdXRVc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24gPSB0aGlzLmhhbmRsZVNlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW5cbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyKCk7XG4gIH1cbiAgY2hlY2tGb3JMb2dnZWRJblVzZXIgKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfTtcbiAgICByZXF1ZXN0KCcvdXNlcicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGRhdGEuY2hhbm5lbE5hbWUsIGRhdGEuc2hvcnRDaGFubmVsSWQsIGRhdGEuY2hhbm5lbENsYWltSWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcvdXNlciBlcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIGxvZ291dFVzZXIgKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfTtcbiAgICByZXF1ZXN0KCcvbG9nb3V0JywgcGFyYW1zKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ291dCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcvbG9nb3V0IGVycm9yJywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBoYW5kbGVTZWxlY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgTE9HT1VUOlxuICAgICAgICB0aGlzLmxvZ291dFVzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZJRVc6XG4gICAgICAgIC8vIHJlZGlyZWN0IHRvIGNoYW5uZWwgcGFnZVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgLyR7dGhpcy5wcm9wcy5jaGFubmVsTmFtZX06JHt0aGlzLnByb3BzLmNoYW5uZWxMb25nSWR9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzaXRlRGVzY3JpcHRpb24gfSA9ICB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBuYXYtYmFyJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXNob3J0IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tY2VudGVyJz5cbiAgICAgICAgICA8TG9nbyAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1jZW50ZXInPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSduYXYtYmFyLXRhZ2xpbmUnPntzaXRlRGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1yaWdodCc+XG4gICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy8nIGV4YWN0PlB1Ymxpc2g8L05hdkxpbms+XG4gICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnICBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvYWJvdXQnPkFib3V0PC9OYXZMaW5rPlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoYW5uZWxOYW1lID8gKFxuICAgICAgICAgICAgICA8TmF2QmFyQ2hhbm5lbERyb3Bkb3duXG4gICAgICAgICAgICAgICAgY2hhbm5lbE5hbWU9e3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9XG4gICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0aW9uPXt0aGlzLmhhbmRsZVNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0aW9uPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIFZJRVc9e1ZJRVd9XG4gICAgICAgICAgICAgICAgTE9HT1VUPXtMT0dPVVR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TmF2TGluayBpZD0nbmF2LWJhci1sb2dpbi1saW5rJyBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy9sb2dpbic+Q2hhbm5lbDwvTmF2TGluaz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKE5hdkJhcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5mdW5jdGlvbiBMb2dvICgpIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZlcnNpb249JzEuMScgaWQ9J0xheWVyXzEnIHg9JzBweCcgeT0nMHB4JyBoZWlnaHQ9JzI0cHgnIHZpZXdCb3g9JzAgMCA4MCAzMScgZW5hYmxlQmFja2dyb3VuZD0nbmV3IDAgMCA4MCAzMScgY2xhc3NOYW1lPSduYXYtYmFyLWxvZ28nPlxuICAgICAgPExpbmsgdG89Jy8nPlxuICAgICAgICA8dGl0bGU+TG9nbzwvdGl0bGU+XG4gICAgICAgIDxkZXNjPlNwZWUuY2ggbG9nbzwvZGVzYz5cbiAgICAgICAgPGcgaWQ9J0Fib3V0Jz5cbiAgICAgICAgICA8ZyBpZD0nUHVibGlzaC1Gb3JtLVYyLV94MjhfZmlsbGVkX3gyOV8nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC00Mi4wMDAwMDAsIC0yMy4wMDAwMDApJz5cbiAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNDIuMDAwMDAwLCAyMi4wMDAwMDApJz5cbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPSdtYXRyaXgoMSAwIDAgMSAwIDIwKScgZm9udFNpemU9JzI1JyBmb250RmFtaWx5PSdSb2JvdG8nPlNwZWUmbHQ7aDwvdGV4dD5cbiAgICAgICAgICAgICAgPGcgaWQ9J0dyb3VwLTE2JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMzAuMDAwMDAwKSc+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDlGOTExJyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHknIGZpbGw9J25vbmUnIHN0cm9rZT0nIzAyOUQ3NCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTE2LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS0yJyBmaWxsPSdub25lJyBzdHJva2U9JyNFMzVCRDgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00zMi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMycgZmlsbD0nbm9uZScgc3Ryb2tlPScjNDE1NkM1JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNNDguNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTQnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzYzNTY4OCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTY0LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L0xpbms+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBOYXZCYXJDaGFubmVsRHJvcGRvd24gKHsgY2hhbm5lbE5hbWUsIGhhbmRsZVNlbGVjdGlvbiwgZGVmYXVsdFNlbGVjdGlvbiwgVklFVywgTE9HT1VUIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93IGxpbmstLW5hdicgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdGlvbn0gdmFsdWU9e2RlZmF1bHRTZWxlY3Rpb259PlxuICAgICAgPG9wdGlvbiBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e2NoYW5uZWxOYW1lfTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17VklFV30+Vmlldzwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT17TE9HT1VUfT5Mb2dvdXQ8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkJhckNoYW5uZWxEcm9wZG93bjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSAxMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkaXNhYmxlZDogcHVibGlzaC5kaXNhYmxlZCxcbiAgICBmaWxlICAgIDogcHVibGlzaC5maWxlLFxuICAgIHN0YXR1cyAgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnY29udGFpbmVycy9Ecm9wem9uZSc7XG5pbXBvcnQgUHVibGlzaERldGFpbHMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoRGV0YWlscyc7XG5pbXBvcnQgUHVibGlzaFN0YXR1cyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hTdGF0dXMnO1xuaW1wb3J0IFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlJztcblxuY2xhc3MgUHVibGlzaFRvb2wgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBjb25zb2xlLmxvZygncHVibGlzaCBpcyBkaXNhYmxlZCcpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UgLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwdWJsaXNoIGlzIG5vdCBkaXNhYmxlZCcpO1xuICAgICAgaWYgKHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFB1Ymxpc2hTdGF0dXMgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiA8UHVibGlzaERldGFpbHMgLz47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiA8RHJvcHpvbmUgLz47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVG9vbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUb29sL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHZhbGlkYXRlRmlsZSB9IGZyb20gJ3V0aWxzL2ZpbGUnO1xuaW1wb3J0IFB1Ymxpc2hQcmV2aWV3IGZyb20gJ2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcnO1xuXG5jbGFzcyBEcm9wem9uZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZHJhZ092ZXIgIDogZmFsc2UsXG4gICAgICBtb3VzZU92ZXIgOiBmYWxzZSxcbiAgICAgIGRpbVByZXZpZXc6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVEcm9wID0gdGhpcy5oYW5kbGVEcm9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnT3ZlciA9IHRoaXMuaGFuZGxlRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdFbmQgPSB0aGlzLmhhbmRsZURyYWdFbmQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdFbnRlciA9IHRoaXMuaGFuZGxlRHJhZ0VudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnTGVhdmUgPSB0aGlzLmhhbmRsZURyYWdMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTW91c2VFbnRlciA9IHRoaXMuaGFuZGxlTW91c2VFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSA9IHRoaXMuaGFuZGxlTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVGaWxlSW5wdXQgPSB0aGlzLmhhbmRsZUZpbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hvb3NlRmlsZSA9IHRoaXMuY2hvb3NlRmlsZS5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZURyb3AgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogZmFsc2V9KTtcbiAgICAvLyBpZiBkcm9wcGVkIGl0ZW1zIGFyZW4ndCBmaWxlcywgcmVqZWN0IHRoZW1cbiAgICBjb25zdCBkdCA9IGV2ZW50LmRhdGFUcmFuc2ZlcjtcbiAgICBpZiAoZHQuaXRlbXMpIHtcbiAgICAgIGlmIChkdC5pdGVtc1swXS5raW5kID09PSAnZmlsZScpIHtcbiAgICAgICAgY29uc3QgZHJvcHBlZEZpbGUgPSBkdC5pdGVtc1swXS5nZXRBc0ZpbGUoKTtcbiAgICAgICAgdGhpcy5jaG9vc2VGaWxlKGRyb3BwZWRGaWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZ092ZXIgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBoYW5kbGVEcmFnRW5kIChldmVudCkge1xuICAgIHZhciBkdCA9IGV2ZW50LmRhdGFUcmFuc2ZlcjtcbiAgICBpZiAoZHQuaXRlbXMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZHQuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZHQuaXRlbXMucmVtb3ZlKGkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuY2xlYXJEYXRhKCk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURyYWdFbnRlciAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IHRydWUsIGRpbVByZXZpZXc6IHRydWV9KTtcbiAgfVxuICBoYW5kbGVEcmFnTGVhdmUgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiBmYWxzZSwgZGltUHJldmlldzogZmFsc2V9KTtcbiAgfVxuICBoYW5kbGVNb3VzZUVudGVyICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttb3VzZU92ZXI6IHRydWUsIGRpbVByZXZpZXc6IHRydWV9KTtcbiAgfVxuICBoYW5kbGVNb3VzZUxlYXZlICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttb3VzZU92ZXI6IGZhbHNlLCBkaW1QcmV2aWV3OiBmYWxzZX0pO1xuICB9XG4gIGhhbmRsZUNsaWNrIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVfaW5wdXQnKS5jbGljaygpO1xuICB9XG4gIGhhbmRsZUZpbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZpbGVMaXN0ID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgIHRoaXMuY2hvb3NlRmlsZShmaWxlTGlzdFswXSk7XG4gIH1cbiAgY2hvb3NlRmlsZSAoZmlsZSkge1xuICAgIGlmIChmaWxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YWxpZGF0ZUZpbGUoZmlsZSk7IC8vIHZhbGlkYXRlIHRoZSBmaWxlJ3MgbmFtZSwgdHlwZSwgYW5kIHNpemVcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNldEZpbGVFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIC8vIHN0YWdlIGl0IHNvIGl0IHdpbGwgYmUgcmVhZHkgd2hlbiB0aGUgcHVibGlzaCBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgdGhpcy5wcm9wcy5zZWxlY3RGaWxlKGZpbGUpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uJz5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0naW5wdXQtZmlsZScgdHlwZT0nZmlsZScgaWQ9J2ZpbGVfaW5wdXQnIG5hbWU9J2ZpbGVfaW5wdXQnIGFjY2VwdD0ndmlkZW8vKixpbWFnZS8qJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVGaWxlSW5wdXR9IGVuY1R5cGU9J211bHRpcGFydC9mb3JtLWRhdGEnIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgPGRpdiBpZD0ncHJldmlldy1kcm9wem9uZScgY2xhc3NOYW1lPXsncm93IHJvdy0tcGFkZGVkIHJvdy0tdGFsbCBkcm9wem9uZScgKyAodGhpcy5zdGF0ZS5kcmFnT3ZlciA/ICcgZHJvcHpvbmUtLWRyYWctb3ZlcicgOiAnJyl9IG9uRHJvcD17dGhpcy5oYW5kbGVEcm9wfSBvbkRyYWdPdmVyPXt0aGlzLmhhbmRsZURyYWdPdmVyfSBvbkRyYWdFbmQ9e3RoaXMuaGFuZGxlRHJhZ0VuZH0gb25EcmFnRW50ZXI9e3RoaXMuaGFuZGxlRHJhZ0VudGVyfSBvbkRyYWdMZWF2ZT17dGhpcy5oYW5kbGVEcmFnTGVhdmV9IG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVNb3VzZUVudGVyfSBvbk1vdXNlTGVhdmU9e3RoaXMuaGFuZGxlTW91c2VMZWF2ZX0gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAge3RoaXMucHJvcHMuZmlsZSA/IChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxQdWJsaXNoUHJldmlld1xuICAgICAgICAgICAgICAgIGRpbVByZXZpZXc9e3RoaXMuc3RhdGUuZGltUHJldmlld31cbiAgICAgICAgICAgICAgICBmaWxlPXt0aGlzLnByb3BzLmZpbGV9XG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtdGV4dC1ob2xkZXInIGNsYXNzTmFtZT17J2ZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInfT5cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1kcmFnb3Zlcic+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+RHJvcCBpdC48L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLm1vdXNlT3ZlciA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWluc3RydWN0aW9ucyc+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLXBsYWNlaG9sZGVyIGluZm8tbWVzc2FnZS0tZmFpbHVyZScgaWQ9J2lucHV0LWVycm9yLWZpbGUtc2VsZWN0aW9uJz57dGhpcy5wcm9wcy5maWxlRXJyb3J9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5EcmFnICYgZHJvcCBpbWFnZSBvciB2aWRlbyBoZXJlIHRvIHB1Ymxpc2g8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+T1I8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZS0tdW5kZXJsaW5lZCc+Q0hPT1NFIEZJTEU8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLXRleHQtaG9sZGVyJyBjbGFzc05hbWU9eydmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJ30+XG4gICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5kcmFnT3ZlciA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1kcmFnb3Zlcic+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPkRyb3AgaXQuPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWluc3RydWN0aW9ucyc+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS1wbGFjZWhvbGRlciBpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnIGlkPSdpbnB1dC1lcnJvci1maWxlLXNlbGVjdGlvbic+e3RoaXMucHJvcHMuZmlsZUVycm9yfTwvcD5cbiAgICAgICAgICAgICAgICAgIDxwPkRyYWcgJiBkcm9wIGltYWdlIG9yIHZpZGVvIGhlcmUgdG8gcHVibGlzaDwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+T1I8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUtLXVuZGVybGluZWQnPkNIT09TRSBGSUxFPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wem9uZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL3ZpZXcuanN4IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHZhbGlkYXRlRmlsZSAoZmlsZSkge1xuICAgIGlmICghZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHByb3ZpZGVkJyk7XG4gICAgfVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHNpemUgYW5kIHR5cGVcbiAgICBzd2l0Y2ggKGZpbGUudHlwZSkge1xuICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDEwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgaW1hZ2VzIGFyZSBsaW1pdGVkIHRvIDEwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIEdJRnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgdmlkZW9zIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihmaWxlLnR5cGUgKyAnIGlzIG5vdCBhIHN1cHBvcnRlZCBmaWxlIHR5cGUuIE9ubHksIC5qcGVnLCAucG5nLCAuZ2lmLCBhbmQgLm1wNCBmaWxlcyBhcmUgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2ZpbGUuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgUHVibGlzaFByZXZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGltZ1NvdXJjZSAgICAgICA6ICcnLFxuICAgICAgZGVmYXVsdFRodW1ibmFpbDogJy9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZSh0aGlzLnByb3BzLmZpbGUpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgaWYgKG5ld1Byb3BzLmZpbGUgIT09IHRoaXMucHJvcHMuZmlsZSkge1xuICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2UobmV3UHJvcHMuZmlsZSk7XG4gICAgfVxuICAgIGlmIChuZXdQcm9wcy50aHVtYm5haWwgIT09IHRoaXMucHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICBpZiAobmV3UHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUobmV3UHJvcHMudGh1bWJuYWlsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogdGhpcy5zdGF0ZS5kZWZhdWx0VGh1bWJuYWlsfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlIChmaWxlKSB7XG4gICAgY29uc3QgcHJldmlld1JlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcHJldmlld1JlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIHByZXZpZXdSZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiBwcmV2aWV3UmVhZGVyLnJlc3VsdH0pO1xuICAgIH07XG4gIH1cbiAgc2V0UHJldmlld0ltYWdlU291cmNlIChmaWxlKSB7XG4gICAgaWYgKGZpbGUudHlwZSAhPT0gJ3ZpZGVvL21wNCcpIHtcbiAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUoZmlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnRodW1ibmFpbCkge1xuICAgICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKHRoaXMucHJvcHMudGh1bWJuYWlsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogdGhpcy5zdGF0ZS5kZWZhdWx0VGh1bWJuYWlsfSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbWdcbiAgICAgICAgaWQ9J2Ryb3B6b25lLXByZXZpZXcnXG4gICAgICAgIHNyYz17dGhpcy5zdGF0ZS5pbWdTb3VyY2V9XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5kaW1QcmV2aWV3ID8gJ2RpbScgOiAnJ31cbiAgICAgICAgYWx0PSdwdWJsaXNoIHByZXZpZXcnXG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblB1Ymxpc2hQcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgZGltUHJldmlldzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZmlsZSAgICAgIDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICB0aHVtYm5haWwgOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoUHJldmlldy9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y2xlYXJGaWxlLCBzdGFydFB1Ymxpc2h9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlOiBwdWJsaXNoLmZpbGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIGNsZWFyRmlsZSxcbiAgc3RhcnRQdWJsaXNoLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGV0YWlscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnY29udGFpbmVycy9Ecm9wem9uZSc7XG5pbXBvcnQgUHVibGlzaFRpdGxlSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dCc7XG5pbXBvcnQgUHVibGlzaFVybElucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0JztcbmltcG9ydCBQdWJsaXNoVGh1bWJuYWlsSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hNZXRhZGF0YUlucHV0cyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cyc7XG5pbXBvcnQgQ2hhbm5lbFNlbGVjdCBmcm9tICdjb250YWluZXJzL0NoYW5uZWxTZWxlY3QnO1xuXG5jbGFzcyBQdWJsaXNoRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMub25QdWJsaXNoU3VibWl0ID0gdGhpcy5vblB1Ymxpc2hTdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuICBvblB1Ymxpc2hTdWJtaXQgKCkge1xuICAgIHRoaXMucHJvcHMuc3RhcnRQdWJsaXNoKHRoaXMucHJvcHMuaGlzdG9yeSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLWJvdHRvbSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgPFB1Ymxpc2hUaXRsZUlucHV0IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogbGVmdCBjb2x1bW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwJyA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8RHJvcHpvbmUgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvKiByaWdodCBjb2x1bW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdwdWJsaXNoLWFjdGl2ZS1hcmVhJyBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxQdWJsaXNoVXJsSW5wdXQgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8Q2hhbm5lbFNlbGVjdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLmZpbGUudHlwZSA9PT0gJ3ZpZGVvL21wNCcpICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUgJz5cbiAgICAgICAgICAgICAgICA8UHVibGlzaFRodW1ibmFpbElucHV0IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS1uby1ib3R0b20gcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hNZXRhZGF0YUlucHV0cyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gaWQ9J3B1Ymxpc2gtc3VibWl0JyBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLWxhcmdlJyBvbkNsaWNrPXt0aGlzLm9uUHVibGlzaFN1Ym1pdH0+UHVibGlzaDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tYm90dG9tIGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tY2FuY2VsJyBvbkNsaWNrPXt0aGlzLnByb3BzLmNsZWFyRmlsZX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+QnkgY2xpY2tpbmcgJ1B1Ymxpc2gnLCB5b3UgYWZmaXJtIHRoYXQgeW91IGhhdmUgdGhlIHJpZ2h0cyB0byBwdWJsaXNoIHRoaXMgY29udGVudCB0byB0aGUgTEJSWSBuZXR3b3JrLCBhbmQgdGhhdCB5b3UgdW5kZXJzdGFuZCB0aGUgcHJvcGVydGllcyBvZiBwdWJsaXNoaW5nIGl0IHRvIGEgZGVjZW50cmFsaXplZCwgdXNlci1jb250cm9sbGVkIG5ldHdvcmsuIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9sZWFybic+UmVhZCBtb3JlLjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKFB1Ymxpc2hEZXRhaWxzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL3ZpZXcuanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHB1Ymxpc2gubWV0YWRhdGEudGl0bGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25NZXRhZGF0YUNoYW5nZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVNZXRhZGF0YShuYW1lLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHVibGlzaFRpdGxlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZSkge1xuICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHZhbHVlKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3B1Ymxpc2gtdGl0bGUnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCB0ZXh0LS1sYXJnZSBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyBuYW1lPSd0aXRsZScgcGxhY2Vob2xkZXI9J0dpdmUgeW91ciBwb3N0IGEgdGl0bGUuLi4nIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSB2YWx1ZT17dGhpcy5wcm9wcy50aXRsZX0gLz5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUaXRsZUlucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJpbXBvcnQge3VwZGF0ZUNsYWltLCB1cGRhdGVFcnJvcn0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZSAgIDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGZpbGVOYW1lICAgICAgICAgICAgICA6IHB1Ymxpc2guZmlsZS5uYW1lLFxuICAgIHB1Ymxpc2hJbkNoYW5uZWwgICAgICA6IHB1Ymxpc2gucHVibGlzaEluQ2hhbm5lbCxcbiAgICBzZWxlY3RlZENoYW5uZWwgICAgICAgOiBwdWJsaXNoLnNlbGVjdGVkQ2hhbm5lbCxcbiAgICBjbGFpbSAgICAgICAgICAgICAgICAgOiBwdWJsaXNoLmNsYWltLFxuICAgIHVybEVycm9yICAgICAgICAgICAgICA6IHB1Ymxpc2guZXJyb3IudXJsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2xhaW1DaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlQ2xhaW0odmFsdWUpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdwdWJsaXNoU3VibWl0JywgbnVsbCkpO1xuICAgIH0sXG4gICAgb25VcmxFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcigndXJsJywgdmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5pbXBvcnQgVXJsTWlkZGxlIGZyb20gJ2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXknO1xuXG5jbGFzcyBQdWJsaXNoVXJsSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBjbGFpbSwgZmlsZU5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjbGFpbSkge1xuICAgICAgdGhpcy5zZXRDbGFpbU5hbWUoZmlsZU5hbWUpO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzICh7IGNsYWltLCBmaWxlTmFtZSB9KSB7XG4gICAgLy8gaWYgYSBuZXcgZmlsZSB3YXMgY2hvc2VuLCB1cGRhdGUgdGhlIGNsYWltIG5hbWVcbiAgICBpZiAoZmlsZU5hbWUgIT09IHRoaXMucHJvcHMuZmlsZU5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldENsYWltTmFtZShmaWxlTmFtZSk7XG4gICAgfVxuICAgIC8vIGlmIHRoZSBjbGFpbSBoYXMgdXBkYXRlZCwgY2hlY2sgaXRzIGF2YWlsYWJpbGl0eVxuICAgIGlmIChjbGFpbSAhPT0gdGhpcy5wcm9wcy5jbGFpbSkge1xuICAgICAgdGhpcy52YWxpZGF0ZUNsYWltKGNsYWltKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5jbGVhbnNlSW5wdXQodmFsdWUpO1xuICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICB0aGlzLnByb3BzLm9uQ2xhaW1DaGFuZ2UodmFsdWUpO1xuICB9XG4gIGNsZWFuc2VJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgc2V0Q2xhaW1OYW1lIChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lV2l0aG91dEVuZGluZyA9IGZpbGVOYW1lLnN1YnN0cmluZygwLCBmaWxlTmFtZS5sYXN0SW5kZXhPZignLicpKTtcbiAgICBjb25zdCBjbGVhbkNsYWltTmFtZSA9IHRoaXMuY2xlYW5zZUlucHV0KGZpbGVOYW1lV2l0aG91dEVuZGluZyk7XG4gICAgdGhpcy5wcm9wcy5vbkNsYWltQ2hhbmdlKGNsZWFuQ2xhaW1OYW1lKTtcbiAgfVxuICB2YWxpZGF0ZUNsYWltIChjbGFpbSkge1xuICAgIGlmICghY2xhaW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uVXJsRXJyb3IoJ0VudGVyIGEgdXJsIGFib3ZlJyk7XG4gICAgfVxuICAgIHJlcXVlc3QoYC9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LyR7Y2xhaW19YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVybEVycm9yKG51bGwpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVybEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNsYWltLCBsb2dnZWRJbkNoYW5uZWxOYW1lLCBsb2dnZWRJbkNoYW5uZWxTaG9ydElkLCBwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwsIHVybEVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5Jz5zcGVlLmNoIC8gPC9zcGFuPlxuICAgICAgICAgIDxVcmxNaWRkbGVcbiAgICAgICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw9e3B1Ymxpc2hJbkNoYW5uZWx9XG4gICAgICAgICAgICBzZWxlY3RlZENoYW5uZWw9e3NlbGVjdGVkQ2hhbm5lbH1cbiAgICAgICAgICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU9e2xvZ2dlZEluQ2hhbm5lbE5hbWV9XG4gICAgICAgICAgICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkPXtsb2dnZWRJbkNoYW5uZWxTaG9ydElkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjbGFpbS1uYW1lLWlucHV0JyBjbGFzc05hbWU9J2lucHV0LXRleHQnIG5hbWU9J2NsYWltJyBwbGFjZWhvbGRlcj0neW91ci11cmwtaGVyZScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IHZhbHVlPXtjbGFpbX0gLz5cbiAgICAgICAgICB7IChjbGFpbSAmJiAhdXJsRXJyb3IpICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNsYWltLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1zdWNjZXNzIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTMnfTwvc3Bhbj4gfVxuICAgICAgICAgIHsgdXJsRXJyb3IgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzE2J308L3NwYW4+IH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgeyB1cmxFcnJvciA/IChcbiAgICAgICAgICAgIDxwIGlkPSdpbnB1dC1lcnJvci1jbGFpbS1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3VybEVycm9yfTwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIGN1c3RvbSB1cmw8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hVcmxJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5mdW5jdGlvbiBVcmxNaWRkbGUgKHtwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwsIGxvZ2dlZEluQ2hhbm5lbE5hbWUsIGxvZ2dlZEluQ2hhbm5lbFNob3J0SWR9KSB7XG4gIGlmIChwdWJsaXNoSW5DaGFubmVsKSB7XG4gICAgaWYgKHNlbGVjdGVkQ2hhbm5lbCA9PT0gbG9nZ2VkSW5DaGFubmVsTmFtZSkge1xuICAgICAgcmV0dXJuIDxzcGFuIGlkPSd1cmwtY2hhbm5lbCcgY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5Jz57bG9nZ2VkSW5DaGFubmVsTmFtZX06e2xvZ2dlZEluQ2hhbm5lbFNob3J0SWR9IC88L3NwYW4+O1xuICAgIH1cbiAgICByZXR1cm4gPHNwYW4gaWQ9J3VybC1jaGFubmVsLXBsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnkgdG9vbHRpcCc+QGNoYW5uZWw8c3BhblxuICAgICAgY2xhc3NOYW1lPSd0b29sdGlwLXRleHQnPlNlbGVjdCBhIGNoYW5uZWwgYmVsb3c8L3NwYW4+IC88L3NwYW4+O1xuICB9XG4gIHJldHVybiAoXG4gICAgPHNwYW4gaWQ9J3VybC1uby1jaGFubmVsLXBsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnkgdG9vbHRpcCc+eHl6PHNwYW4gY2xhc3NOYW1lPSd0b29sdGlwLXRleHQnPlRoaXMgd2lsbCBiZSBhIHJhbmRvbSBpZDwvc3Bhbj4gLzwvc3Bhbj5cbiAgKTtcbn1cblxuVXJsTWlkZGxlLnByb3BUeXBlcyA9IHtcbiAgcHVibGlzaEluQ2hhbm5lbCAgICAgIDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbG9nZ2VkSW5DaGFubmVsTmFtZSAgIDogUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZDogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVybE1pZGRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5L2luZGV4LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvbk5ld1RodW1ibmFpbCB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoOiB7IGZpbGUgfSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25OZXdUaHVtYm5haWwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gIGxldCBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gIGxldCBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcbiAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICBsZXQgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTogbWltZVN0cmluZ30pO1xufVxuXG5jbGFzcyBQdWJsaXNoVGh1bWJuYWlsSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZGVvU291cmNlICAgOiBudWxsLFxuICAgICAgZXJyb3IgICAgICAgICA6IG51bGwsXG4gICAgICBzbGlkZXJNaW5SYW5nZTogMSxcbiAgICAgIHNsaWRlck1heFJhbmdlOiBudWxsLFxuICAgICAgc2xpZGVyVmFsdWUgICA6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YSA9IHRoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2UgPSB0aGlzLmhhbmRsZVNsaWRlckNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlsID0gdGhpcy5jcmVhdGVUaHVtYm5haWwuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBmaWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0VmlkZW9Tb3VyY2UoZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgLy8gaWYgZmlsZSBjaGFuZ2VzXG4gICAgaWYgKG5leHRQcm9wcy5maWxlICYmIG5leHRQcm9wcy5maWxlICE9PSB0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgIGNvbnN0IHsgZmlsZSB9ID0gbmV4dFByb3BzO1xuICAgICAgdGhpcy5zZXRWaWRlb1NvdXJjZShmaWxlKTtcbiAgICB9O1xuICB9XG4gIHNldFZpZGVvU291cmNlIChmaWxlKSB7XG4gICAgY29uc3QgcHJldmlld1JlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcHJldmlld1JlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIHByZXZpZXdSZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YVVyaSA9IHByZXZpZXdSZWFkZXIucmVzdWx0O1xuICAgICAgY29uc3QgYmxvYiA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVyaSk7XG4gICAgICBjb25zdCB2aWRlb1NvdXJjZSA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmlkZW9Tb3VyY2UgfSk7XG4gICAgfTtcbiAgfVxuICBoYW5kbGVWaWRlb0xvYWRlZERhdGEgKGV2ZW50KSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBldmVudC50YXJnZXQuZHVyYXRpb247XG4gICAgY29uc3QgdG90YWxNaW51dGVzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIDYwKTtcbiAgICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKGR1cmF0aW9uICUgNjApO1xuICAgIC8vIHNldCB0aGUgc2xpZGVyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzbGlkZXJNYXhSYW5nZTogZHVyYXRpb24gKiAxMDAsXG4gICAgICBzbGlkZXJWYWx1ZSAgIDogZHVyYXRpb24gKiAxMDAgLyAyLFxuICAgICAgdG90YWxNaW51dGVzLFxuICAgICAgdG90YWxTZWNvbmRzLFxuICAgIH0pO1xuICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlb1xuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IGR1cmF0aW9uIC8gMjtcbiAgfVxuICBoYW5kbGVTbGlkZXJDaGFuZ2UgKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpO1xuICAgIC8vIHVwZGF0ZSB0aGUgc2xpZGVyIHZhbHVlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzbGlkZXJWYWx1ZTogdmFsdWUsXG4gICAgfSk7XG4gICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIHZpZGVvXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gdmFsdWUgLyAxMDA7XG4gIH1cbiAgY3JlYXRlVGh1bWJuYWlsICgpIHtcbiAgICAvLyB0YWtlIGEgc25hcHNob3RcbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIGNvbnN0IGJsb2IgPSBkYXRhVVJJdG9CbG9iKGRhdGFVcmwpO1xuICAgIGNvbnN0IHNuYXBzaG90ID0gbmV3IEZpbGUoW2Jsb2JdLCBgdGh1bWJuYWlsLnBuZ2AsIHtcbiAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgIH0pO1xuICAgIC8vIHNldCB0aGUgdGh1bWJuYWlsIGluIHJlZHV4IHN0b3JlXG4gICAgaWYgKHNuYXBzaG90KSB7XG4gICAgICB0aGlzLnByb3BzLm9uTmV3VGh1bWJuYWlsKHNuYXBzaG90KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCB2aWRlb1NvdXJjZSwgc2xpZGVyTWluUmFuZ2UsIHNsaWRlck1heFJhbmdlLCBzbGlkZXJWYWx1ZSwgdG90YWxNaW51dGVzLCB0b3RhbFNlY29uZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJz5UaHVtYm5haWw6PC9sYWJlbD5cbiAgICAgICAgPHZpZGVvXG4gICAgICAgICAgaWQ9J3ZpZGVvLXRodW1iLXBsYXllcidcbiAgICAgICAgICBwcmVsb2FkPSdtZXRhZGF0YSdcbiAgICAgICAgICBtdXRlZFxuICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogJ25vbmUnfX1cbiAgICAgICAgICBwbGF5c0lubGluZVxuICAgICAgICAgIG9uTG9hZGVkRGF0YT17dGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGF9XG4gICAgICAgICAgc3JjPXt2aWRlb1NvdXJjZX1cbiAgICAgICAgICBvblNlZWtlZD17dGhpcy5jcmVhdGVUaHVtYm5haWx9XG4gICAgICAgIC8+XG4gICAgICAgIHtcbiAgICAgICAgICBzbGlkZXJWYWx1ZSA/IChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcicgc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPjAnMDBcIjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+e3RvdGFsTWludXRlc30ne3RvdGFsU2Vjb25kc31cIjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPSdyYW5nZSdcbiAgICAgICAgICAgICAgICAgIG1pbj17c2xpZGVyTWluUmFuZ2V9XG4gICAgICAgICAgICAgICAgICBtYXg9e3NsaWRlck1heFJhbmdlfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NsaWRlclZhbHVlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGlkZXInXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnID5sb2FkaW5nLi4uIDwvcD5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgeyBlcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e2Vycm9yfTwvcD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+VXNlIHNsaWRlciB0byBzZXQgdGh1bWJuYWlsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVGh1bWJuYWlsSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvdmlldy5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7dXBkYXRlTWV0YWRhdGEsIHRvZ2dsZU1ldGFkYXRhSW5wdXRzfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgc2hvd01ldGFkYXRhSW5wdXRzOiBwdWJsaXNoLnNob3dNZXRhZGF0YUlucHV0cyxcbiAgICBkZXNjcmlwdGlvbiAgICAgICA6IHB1Ymxpc2gubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgbGljZW5zZSAgICAgICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLmxpY2Vuc2UsXG4gICAgbnNmdyAgICAgICAgICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLm5zZncsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25NZXRhZGF0YUNoYW5nZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVNZXRhZGF0YShuYW1lLCB2YWx1ZSkpO1xuICAgIH0sXG4gICAgb25Ub2dnbGVNZXRhZGF0YUlucHV0czogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh0b2dnbGVNZXRhZGF0YUlucHV0cyh2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXhwYW5kaW5nVGV4dEFyZWEgZnJvbSAnY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYSc7XG5cbmNsYXNzIFB1Ymxpc2hNZXRhZGF0YUlucHV0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRvZ2dsZVNob3dJbnB1dHMgPSB0aGlzLnRvZ2dsZVNob3dJbnB1dHMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0ID0gdGhpcy5oYW5kbGVTZWxlY3QuYmluZCh0aGlzKTtcbiAgfVxuICB0b2dnbGVTaG93SW5wdXRzICgpIHtcbiAgICB0aGlzLnByb3BzLm9uVG9nZ2xlTWV0YWRhdGFJbnB1dHMoIXRoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgdmFsdWUgPSB0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/IHRhcmdldC5jaGVja2VkIDogdGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQubmFtZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgdmFsdWUpO1xuICB9XG4gIGhhbmRsZVNlbGVjdCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCBzZWxlY3RlZE9wdGlvbik7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0ncHVibGlzaC1kZXRhaWxzJyBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICB7dGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMgJiYgKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nbGFiZWwnPkRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8RXhwYW5kaW5nVGV4dEFyZWFcbiAgICAgICAgICAgICAgICAgIGlkPSdwdWJsaXNoLWRlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd0ZXh0YXJlYSB0ZXh0YXJlYS0tcHJpbWFyeSB0ZXh0YXJlYS0tZnVsbC13aWR0aCdcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezF9XG4gICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezIwMDB9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhIZWlnaHQ6IDIwMCB9fVxuICAgICAgICAgICAgICAgICAgbmFtZT0nZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nT3B0aW9uYWwgZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nbGFiZWwnPkxpY2Vuc2U6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgbmFtZT0nbGljZW5zZScgaWQ9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1wcmltYXJ5JyBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3R9PlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nICc+VW5zcGVjaWZpZWQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J1B1YmxpYyBEb21haW4nPlB1YmxpYyBEb21haW48L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J0NyZWF0aXZlIENvbW1vbnMnPkNyZWF0aXZlIENvbW1vbnM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1uc2Z3JyBjbGFzc05hbWU9J2xhYmVsJz5NYXR1cmU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J2lucHV0LWNoZWNrYm94JyB0eXBlPSdjaGVja2JveCcgaWQ9J3B1Ymxpc2gtbnNmdycgbmFtZT0nbnNmdycgdmFsdWU9e3RoaXMucHJvcHMubnNmd30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXNlY29uZGFyeScgb25DbGljaz17dGhpcy50b2dnbGVTaG93SW5wdXRzfT57dGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMgPyAnbGVzcycgOiAnbW9yZSd9PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hNZXRhZGF0YUlucHV0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy92aWV3LmpzeCIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBFeHBhbmRpbmdUZXh0YXJlYSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLl9oYW5kbGVDaGFuZ2UgPSB0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5hZGp1c3RUZXh0YXJlYSh7fSk7XG4gIH1cbiAgX2hhbmRsZUNoYW5nZSAoZXZlbnQpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UoZXZlbnQpO1xuICAgIHRoaXMuYWRqdXN0VGV4dGFyZWEoZXZlbnQpO1xuICB9XG4gIGFkanVzdFRleHRhcmVhICh7IHRhcmdldCA9IHRoaXMuZWwgfSkge1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBgJHt0YXJnZXQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgLi4ucmVzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPHRleHRhcmVhXG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgICByZWY9e3ggPT4gdGhpcy5lbCA9IHh9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2V9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cblxuRXhwYW5kaW5nVGV4dGFyZWEucHJvcFR5cGVzID0ge1xuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRpbmdUZXh0YXJlYTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtzZXRQdWJsaXNoSW5DaGFubmVsLCB1cGRhdGVTZWxlY3RlZENoYW5uZWwsIHVwZGF0ZUVycm9yfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCwgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZTogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgICBwdWJsaXNoSW5DaGFubmVsICAgOiBwdWJsaXNoLnB1Ymxpc2hJbkNoYW5uZWwsXG4gICAgc2VsZWN0ZWRDaGFubmVsICAgIDogcHVibGlzaC5zZWxlY3RlZENoYW5uZWwsXG4gICAgY2hhbm5lbEVycm9yICAgICAgIDogcHVibGlzaC5lcnJvci5jaGFubmVsLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uUHVibGlzaEluQ2hhbm5lbENoYW5nZTogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignY2hhbm5lbCcsIG51bGwpKTtcbiAgICAgIGRpc3BhdGNoKHNldFB1Ymxpc2hJbkNoYW5uZWwodmFsdWUpKTtcbiAgICB9LFxuICAgIG9uQ2hhbm5lbFNlbGVjdDogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignY2hhbm5lbCcsIG51bGwpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCh2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3QvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENoYW5uZWxMb2dpbkZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtJztcbmltcG9ydCBDaGFubmVsQ3JlYXRlRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtJztcbmltcG9ydCAqIGFzIHN0YXRlcyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMnO1xuXG5jbGFzcyBDaGFubmVsU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaCA9IHRoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICB0b2dnbGVBbm9ueW1vdXNQdWJsaXNoIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gJ2Fub255bW91cycpIHtcbiAgICAgIHRoaXMucHJvcHMub25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2UodHJ1ZSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZVNlbGVjdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxTZWxlY3Qoc2VsZWN0ZWRPcHRpb24pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdyYWRpbycgbmFtZT0nYW5vbnltb3VzLW9yLWNoYW5uZWwnIGlkPSdhbm9ueW1vdXMtcmFkaW8nIGNsYXNzTmFtZT0naW5wdXQtcmFkaW8nIHZhbHVlPSdhbm9ueW1vdXMnIGNoZWNrZWQ9eyF0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2h9IC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCBsYWJlbC0tcG9pbnRlcicgaHRtbEZvcj0nYW5vbnltb3VzLXJhZGlvJz5Bbm9ueW1vdXM8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdyYWRpbycgbmFtZT0nYW5vbnltb3VzLW9yLWNoYW5uZWwnIGlkPSdjaGFubmVsLXJhZGlvJyBjbGFzc05hbWU9J2lucHV0LXJhZGlvJyB2YWx1ZT0naW4gYSBjaGFubmVsJyBjaGVja2VkPXt0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2h9IC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCBsYWJlbC0tcG9pbnRlcicgaHRtbEZvcj0nY2hhbm5lbC1yYWRpbyc+SW4gYSBjaGFubmVsPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7IHRoaXMucHJvcHMuY2hhbm5lbEVycm9yID8gKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnByb3BzLmNoYW5uZWxFcnJvcn08L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5QdWJsaXNoIGFub255bW91c2x5IG9yIGluIGEgY2hhbm5lbDwvcD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsICYmIChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMnPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1uYW1lLXNlbGVjdCc+Q2hhbm5lbDo8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLW5hbWUtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93JyB2YWx1ZT17dGhpcy5wcm9wcy5zZWxlY3RlZENoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUgJiYgPG9wdGlvbiB2YWx1ZT17dGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lfSBpZD0ncHVibGlzaC1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e3RoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZX08L29wdGlvbj4gfVxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3N0YXRlcy5MT0dJTn0+RXhpc3Rpbmc8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzdGF0ZXMuQ1JFQVRFfT5OZXc8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsID09PSBzdGF0ZXMuTE9HSU4pICYmIDxDaGFubmVsTG9naW5Gb3JtIC8+IH1cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsID09PSBzdGF0ZXMuQ1JFQVRFKSAmJiA8Q2hhbm5lbENyZWF0ZUZvcm0gLz4gfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsU2VsZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY2xhc3MgQ2hhbm5lbExvZ2luRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3IgICA6IG51bGwsXG4gICAgICBuYW1lICAgIDogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9naW5Ub0NoYW5uZWwgPSB0aGlzLmxvZ2luVG9DaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1tuYW1lXTogdmFsdWV9KTtcbiAgfVxuICBsb2dpblRvQ2hhbm5lbCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZTogdGhpcy5zdGF0ZS5uYW1lLCBwYXNzd29yZDogdGhpcy5zdGF0ZS5wYXNzd29yZH0pLFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH07XG4gICAgcmVxdWVzdCgnbG9naW4nLCBwYXJhbXMpXG4gICAgICAudGhlbigoe3N1Y2Nlc3MsIGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQsIG1lc3NhZ2V9KSA9PiB7XG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihjaGFubmVsTmFtZSwgc2hvcnRDaGFubmVsSWQsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBtZXNzYWdlfSk7XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3J9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGZvcm0gaWQ9J2NoYW5uZWwtbG9naW4tZm9ybSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSc+XG4gICAgICAgICAgICAgIDxzcGFuPkA8L3NwYW4+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nY2hhbm5lbC1sb2dpbi1uYW1lLWlucHV0JyBjbGFzc05hbWU9J2lucHV0LXRleHQnIG5hbWU9J25hbWUnIHBsYWNlaG9sZGVyPSdZb3VyIENoYW5uZWwgTmFtZScgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbE5hbWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1sb2dpbi1wYXNzd29yZC1pbnB1dCcgPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnknPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIGlkPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyBuYW1lPSdwYXNzd29yZCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBwbGFjZWhvbGRlcj0nJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsUGFzc3dvcmR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7IHRoaXMuc3RhdGUuZXJyb3IgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnN0YXRlLmVycm9yfTwvcD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+RW50ZXIgdGhlIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlJz5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmxvZ2luVG9DaGFubmVsfT5BdXRoZW50aWNhdGU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsTG9naW5Gb3JtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuY2xhc3MgQ2hhbm5lbENyZWF0ZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgY2hhbm5lbCA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgc3RhdHVzICA6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dCA9IHRoaXMuaGFuZGxlQ2hhbm5lbElucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNyZWF0ZUNoYW5uZWwgPSB0aGlzLmNyZWF0ZUNoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBjbGVhbnNlQ2hhbm5lbElucHV0IChpbnB1dCkge1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxzKy9nLCAnLScpOyAvLyByZXBsYWNlIHNwYWNlcyB3aXRoIGRhc2hlc1xuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTktXS9nLCAnJyk7ICAvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksIG9yICctJ1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBoYW5kbGVDaGFubmVsSW5wdXQgKGV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5jbGVhbnNlQ2hhbm5lbElucHV0KHZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtjaGFubmVsOiB2YWx1ZX0pO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ1BsZWFzZSBlbnRlciBhIGNoYW5uZWwgbmFtZSd9KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoe1tuYW1lXTogdmFsdWV9KTtcbiAgfVxuICB1cGRhdGVJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXF1ZXN0KGAvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LyR7Y2hhbm5lbFdpdGhBdFN5bWJvbH1gKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBudWxsfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgICB9KTtcbiAgfVxuICBjaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSAoY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxXaXRoQXRTeW1ib2wgPSBgQCR7Y2hhbm5lbH1gO1xuICAgIHJldHVybiByZXF1ZXN0KGAvYXBpL2NoYW5uZWwvYXZhaWxhYmlsaXR5LyR7Y2hhbm5lbFdpdGhBdFN5bWJvbH1gKTtcbiAgfVxuICBjaGVja0lzUGFzc3dvcmRQcm92aWRlZCAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFwYXNzd29yZCB8fCBwYXNzd29yZC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIHBhc3N3b3JkJykpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG4gIG1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QgKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KHt1c2VybmFtZSwgcGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0KCcvc2lnbnVwJywgcGFyYW1zKVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVW5mb3J0dW5hdGVseSwgd2UgZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgY3JlYXRpbmcgeW91ciBjaGFubmVsLiBQbGVhc2UgbGV0IHVzIGtub3cgaW4gRGlzY29yZCEgJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgY3JlYXRlQ2hhbm5lbCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQodGhpcy5zdGF0ZS5wYXNzd29yZClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUodGhpcy5zdGF0ZS5jaGFubmVsKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogJ1dlIGFyZSBwdWJsaXNoaW5nIHlvdXIgbmV3IGNoYW5uZWwuICBTaXQgdGlnaHQuLi4nfSk7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2VQdWJsaXNoQ2hhbm5lbFJlcXVlc3QodGhpcy5zdGF0ZS5jaGFubmVsLCB0aGlzLnN0YXRlLnBhc3N3b3JkKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihyZXN1bHQuY2hhbm5lbE5hbWUsIHJlc3VsdC5zaG9ydENoYW5uZWxJZCwgcmVzdWx0LmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiBudWxsfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgeyAhdGhpcy5zdGF0ZS5zdGF0dXMgPyAoXG4gICAgICAgICAgPGZvcm0gaWQ9J3B1Ymxpc2gtY2hhbm5lbC1mb3JtJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J25ldy1jaGFubmVsLW5hbWUnPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tIHNwYW4tLXJlbGF0aXZlJz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nY2hhbm5lbCcgaWQ9J25ldy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9J2V4YW1wbGVDaGFubmVsTmFtZScgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbm5lbElucHV0fSAvPlxuICAgICAgICAgICAgICAgICAgeyAodGhpcy5zdGF0ZS5jaGFubmVsICYmICF0aGlzLnN0YXRlLmVycm9yKSAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1zdWNjZXNzIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTMnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxNid9PC9zcGFuPiB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1wYXNzd29yZCc+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgbmFtZT0ncGFzc3dvcmQnIGlkPSduZXctY2hhbm5lbC1wYXNzd29yZCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyAgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgPyAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+Q2hvb3NlIGEgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMuY3JlYXRlQ2hhbm5lbH0+Q3JlYXRlIENoYW5uZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz57dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICAgICAgPFByb2dyZXNzQmFyIHNpemU9ezEyfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ3JlYXRlRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2ZVN0YXR1c0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBJbmFjdGl2ZVN0YXR1c0JhciA9ICgpID0+IHtcbiAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0ncHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0taW5hY3RpdmUnPnwgPC9zcGFuPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluYWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NsZWFyRmlsZX0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHN0YXR1cyA6IHB1Ymxpc2guc3RhdHVzLnN0YXR1cyxcbiAgICBtZXNzYWdlOiBwdWJsaXNoLnN0YXR1cy5tZXNzYWdlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBjbGVhckZpbGUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0ICogYXMgcHVibGlzaFN0YXRlcyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMnO1xuXG5jbGFzcyBQdWJsaXNoU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1cywgbWVzc2FnZSwgY2xlYXJGaWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5MT0FEX1NUQVJUICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPkZpbGUgaXMgbG9hZGluZyB0byBzZXJ2ZXI8L3A+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz4wJTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5MT0FESU5HICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICA8cD5GaWxlIGlzIGxvYWRpbmcgdG8gc2VydmVyPC9wPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz57bWVzc2FnZX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuUFVCTElTSElORyAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5VcGxvYWQgY29tcGxldGUuICBZb3VyIGZpbGUgaXMgbm93IGJlaW5nIHB1Ymxpc2hlZCBvbiB0aGUgYmxvY2tjaGFpbi4uLjwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPHA+Q3VyaW91cyB3aGF0IG1hZ2ljIGlzIGhhcHBlbmluZyBoZXJlPyA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9mYXEvd2hhdC1pcy1sYnJ5Jz5MZWFybiBtb3JlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuU1VDQ0VTUyAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5Zb3VyIHB1Ymxpc2ggaXMgY29tcGxldGUhIFlvdSBhcmUgYmVpbmcgcmVkaXJlY3RlZCB0byBpdCBub3cuPC9wPlxuICAgICAgICAgIDxwPklmIHlvdSBhcmUgbm90IGF1dG9tYXRpY2FsbHkgcmVkaXJlY3RlZCwgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17bWVzc2FnZX0+Y2xpY2sgaGVyZS48L2E+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkZBSUxFRCAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICA8cD5Tb21ldGhpbmcgd2VudCB3cm9uZy4uLjwvcD5cbiAgICAgICAgICA8cD48c3Ryb25nPnttZXNzYWdlfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICA8cD5Gb3IgaGVscCwgcG9zdCB0aGUgYWJvdmUgZXJyb3IgdGV4dCBpbiB0aGUgI3NwZWVjaCBjaGFubmVsIG9uIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJyB0YXJnZXQ9J19ibGFuayc+bGJyeSBkaXNjb3JkPC9hPjwvcD5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1zZWNvbmRhcnknIG9uQ2xpY2s9e2NsZWFyRmlsZX0+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hTdGF0dXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL3ZpZXcuanN4IiwiZXhwb3J0IGNvbnN0IExPQURfU1RBUlQgPSAnTE9BRF9TVEFSVCc7XG5leHBvcnQgY29uc3QgTE9BRElORyA9ICdMT0FESU5HJztcbmV4cG9ydCBjb25zdCBQVUJMSVNISU5HID0gJ1BVQkxJU0hJTkcnO1xuZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgRkFJTEVEID0gJ0ZBSUxFRCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2xhaW1fc3RhdGVzLmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlOiBwdWJsaXNoLmRpc2FibGVkTWVzc2FnZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5wcm9wcy5tZXNzYWdlO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLnByb3BzLm1lc3NhZ2U6JywgbWVzc2FnZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgZHJvcHpvbmUtLWRpc2FibGVkIHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LS1kaXNhYmxlZCc+UHVibGlzaGluZyBpcyBjdXJyZW50bHkgZGlzYWJsZWQuPC9wPlxuICAgICAgICA8cCBjbGFzc05hbWU9J3RleHQtLWRpc2FibGVkJz57bWVzc2FnZX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5cbmNsYXNzIEFib3V0UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnQWJvdXQnfSBwYWdlVXJpPXsnYWJvdXQnfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdwdWxsLXF1b3RlJz5TcGVlLmNoIGlzIGFuIG9wZW4tc291cmNlIHByb2plY3QuICBQbGVhc2UgY29udHJpYnV0ZSB0byB0aGUgZXhpc3Rpbmcgc2l0ZSwgb3IgZm9yayBpdCBhbmQgbWFrZSB5b3VyIG93bi48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vdHdpdHRlci5jb20vc3BlZV9jaCc+VFdJVFRFUjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+R0lUSFVCPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPkRJU0NPUkQgQ0hBTk5FTDwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9ibG9iL21hc3Rlci9SRUFETUUubWQnPkRPQ1VNRU5UQVRJT048L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgbWVkaWEtaG9zdGluZyBzaXRlIHRoYXQgcmVhZHMgZnJvbSBhbmQgcHVibGlzaGVzIGNvbnRlbnQgdG8gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvJz5MQlJZPC9hPiBibG9ja2NoYWluLjwvcD5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIGhvc3Rpbmcgc2VydmljZSwgYnV0IHdpdGggdGhlIGFkZGVkIGJlbmVmaXQgdGhhdCBpdCBzdG9yZXMgeW91ciBjb250ZW50IG9uIGEgZGVjZW50cmFsaXplZCBuZXR3b3JrIG9mIGNvbXB1dGVycyAtLSB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8vZ2V0Jz5MQlJZPC9hPiBuZXR3b3JrLiAgVGhpcyBtZWFucyB0aGF0IHlvdXIgaW1hZ2VzIGFyZSBzdG9yZWQgaW4gbXVsdGlwbGUgbG9jYXRpb25zIHdpdGhvdXQgYSBzaW5nbGUgcG9pbnQgb2YgZmFpbHVyZS48L3A+XG4gICAgICAgICAgICAgIDxoMz5Db250cmlidXRlPC9oMz5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IGhhdmUgYW4gaWRlYSBmb3IgeW91ciBvd24gc3BlZS5jaC1saWtlIHNpdGUgb24gdG9wIG9mIExCUlksIGZvcmsgb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5naXRodWIgcmVwbzwvYT4gYW5kIGdvIHRvIHRvd24hPC9wPlxuICAgICAgICAgICAgICA8cD5JZiB5b3Ugd2FudCB0byBpbXByb3ZlIHNwZWUuY2gsIGpvaW4gb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPmRpc2NvcmQgY2hhbm5lbDwvYT4gb3Igc29sdmUgb25lIG9mIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9pc3N1ZXMnPmdpdGh1YiBpc3N1ZXM8L2E+LjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9BYm91dFBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IENoYW5uZWxMb2dpbkZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtJztcbmltcG9ydCBDaGFubmVsQ3JlYXRlRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtJztcblxuY2xhc3MgTG9naW5QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICAvLyByZS1yb3V0ZSB0aGUgdXNlciB0byB0aGUgaG9tZXBhZ2UgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgaWYgKG5ld1Byb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUgIT09IHRoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSkge1xuICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9gKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydMb2dpbid9IHBhZ2VVcmk9eydsb2dpbid9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5DaGFubmVscyBhbGxvdyB5b3UgdG8gcHVibGlzaCBhbmQgZ3JvdXAgY29udGVudCB1bmRlciBhbiBpZGVudGl0eS4gWW91IGNhbiBjcmVhdGUgYSBjaGFubmVsIGZvciB5b3Vyc2VsZiwgb3Igc2hhcmUgb25lIHdpdGggbGlrZS1taW5kZWQgZnJpZW5kcy4gIFlvdSBjYW4gY3JlYXRlIDEgY2hhbm5lbCwgb3IgMTAwLCBzbyB3aGV0aGVyIHlvdSdyZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPScvQGNhdGFsb25pYTIwMTc6NDNkY2Y0NzE2M2NhYTIxZDg0MDRkOWZlOWIzMGY3OGVmM2UxNDZhOCc+ZG9jdW1lbnRpbmcgaW1wb3J0YW50IGV2ZW50czwvYT4sIG9yIG1ha2luZyBhIHB1YmxpYyByZXBvc2l0b3J5IGZvciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPScvQGNhdEdpZnMnPmNhdCBnaWZzPC9hPiAocGFzc3dvcmQ6ICcxMjM0JyksIHRyeSBjcmVhdGluZyBhIGNoYW5uZWwgZm9yIGl0ITwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0naDMtLW5vLWJvdHRvbSc+TG9nIGluIHRvIGFuIGV4aXN0aW5nIGNoYW5uZWw6PC9oMz5cbiAgICAgICAgICAgICAgPENoYW5uZWxMb2dpbkZvcm0gLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0naDMtLW5vLWJvdHRvbSc+Q3JlYXRlIGEgYnJhbmQgbmV3IGNoYW5uZWw6PC9oMz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDcmVhdGVGb3JtIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKExvZ2luUGFnZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZXJyb3IgICAgICA6IHNob3cucmVxdWVzdC5lcnJvcixcbiAgICByZXF1ZXN0VHlwZTogc2hvdy5yZXF1ZXN0LnR5cGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uSGFuZGxlU2hvd1BhZ2VVcmksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9TaG93UGFnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgU2hvd0Fzc2V0TGl0ZSBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldExpdGUnO1xuaW1wb3J0IFNob3dBc3NldERldGFpbHMgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzJztcbmltcG9ydCBTaG93Q2hhbm5lbCBmcm9tICdjb250YWluZXJzL1Nob3dDaGFubmVsJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG5jbGFzcyBTaG93UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMubWF0Y2gucGFyYW1zICE9PSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcykge1xuICAgICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHJlcXVlc3RUeXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEVycm9yUGFnZSBlcnJvcj17ZXJyb3J9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBzd2l0Y2ggKHJlcXVlc3RUeXBlKSB7XG4gICAgICBjYXNlIENIQU5ORUw6XG4gICAgICAgIHJldHVybiA8U2hvd0NoYW5uZWwgLz47XG4gICAgICBjYXNlIEFTU0VUX0xJVEU6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0TGl0ZSAvPjtcbiAgICAgIGNhc2UgQVNTRVRfREVUQUlMUzpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXREZXRhaWxzIC8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxwPmxvYWRpbmcuLi48L3A+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd1BhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5cbmNsYXNzIFNob3dMaXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGE7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyIHNob3ctbGl0ZS1jb250YWluZXInPlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgIDxMaW5rIGlkPSdhc3NldC1ib2lsZXJwYXRlJyBjbGFzc05hbWU9J2xpbmstLXByaW1hcnkgZmluZS1wcmludCcgdG89e2AvJHtjbGFpbUlkfS8ke25hbWV9YH0+aG9zdGVkXG4gICAgICAgICAgICB2aWEgU3BlZS5jaDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwPmxvYWRpbmcgYXNzZXQgZGF0YS4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dMaXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgeyBMT0NBTF9DSEVDSywgVU5BVkFJTEFCTEUsIEVSUk9SLCBBVkFJTEFCTEUgfSBmcm9tICdjb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMnO1xuXG5jbGFzcyBBc3NldERpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vbkZpbGVSZXF1ZXN0KG5hbWUsIGNsYWltSWQpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIGVycm9yLCBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgY29udGVudFR5cGUsIGZpbGVFeHQsIHRodW1ibmFpbCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J2Fzc2V0LWRpc3BsYXktY29tcG9uZW50Jz5cbiAgICAgICAgeyhzdGF0dXMgPT09IExPQ0FMX0NIRUNLKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPkNoZWNraW5nIHRvIHNlZSBpZiBTcGVlLmNoIGhhcyB5b3VyIGFzc2V0IGxvY2FsbHkuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBVTkFWQUlMQUJMRSkgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5TaXQgdGlnaHQsIHdlJ3JlIHNlYXJjaGluZyB0aGUgTEJSWSBibG9ja2NoYWluIGZvciB5b3VyIGFzc2V0ITwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPHA+Q3VyaW91cyB3aGF0IG1hZ2ljIGlzIGhhcHBlbmluZyBoZXJlPyA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9mYXEvd2hhdC1pcy1sYnJ5Jz5MZWFybiBtb3JlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBFUlJPUikgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5VbmZvcnR1bmF0ZWx5LCB3ZSBjb3VsZG4ndCBkb3dubG9hZCB5b3VyIGFzc2V0IGZyb20gTEJSWS4gIFlvdSBjYW4gaGVscCB1cyBvdXQgYnkgc2hhcmluZyB0aGUgYmVsb3cgZXJyb3IgbWVzc2FnZSBpbiB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUycgdGFyZ2V0PSdfYmxhbmsnPkxCUlkgZGlzY29yZDwvYT4uPC9wPlxuICAgICAgICAgIDxpPjxwIGlkPSdlcnJvci1tZXNzYWdlJz57ZXJyb3J9PC9wPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEFWQUlMQUJMRSkgJiZcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfSAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dmlkZW8gY2xhc3NOYW1lPSdhc3NldCB2aWRlbycgY29udHJvbHMgcG9zdGVyPXt0aHVtYm5haWx9PlxuICAgICAgICAgICAgICAgICAgPHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxwPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT52aWRlbzwvY29kZT4gZWxlbWVudC48L3A+XG4gICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+VW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldERpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgYXNzZXQgaW5mb1xuICBsZXQgYXNzZXQ7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgY29uc3QgYXNzZXRMaXN0ID0gc2hvdy5hc3NldExpc3Q7XG4gIGlmIChyZXF1ZXN0ICYmIGFzc2V0TGlzdCkge1xuICAgIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7ICAvLyBub3RlOiBqdXN0IHN0b3JlIHRoaXMgaW4gdGhlIHJlcXVlc3RcbiAgICBhc3NldCA9IGFzc2V0TGlzdFthc3NldEtleV0gfHwgbnVsbDtcbiAgfTtcbiAgLy8gcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgQXNzZXRUaXRsZSBmcm9tICdjb250YWluZXJzL0Fzc2V0VGl0bGUnO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5pbXBvcnQgQXNzZXRJbmZvIGZyb20gJ2NvbnRhaW5lcnMvQXNzZXRJbmZvJztcblxuY2xhc3MgU2hvd0Fzc2V0RGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoYXNzZXQpIHtcbiAgICAgIGNvbnN0IHsgY2xhaW1EYXRhOiB7IG5hbWUgfSB9ID0gYXNzZXQ7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtgJHtuYW1lfSAtIGRldGFpbHNgfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxBc3NldFRpdGxlIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCBzaG93LWRldGFpbHMtY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICA8QXNzZXREaXNwbGF5IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICAgICAgICA8QXNzZXRJbmZvIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBhc3NldCBkYXRhLi4uJ30gLz5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaG93QXNzZXREZXRhaWxzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YTogeyB0aXRsZSB9IH0gPSBzZWxlY3RBc3NldChzaG93KTtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBc3NldFRpdGxlID0gKHsgdGl0bGUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtLWxhcmdlJz57dGl0bGV9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRUaXRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGFzc2V0XG4gIGNvbnN0IGFzc2V0ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIC8vICByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNsYXNzIEFzc2V0SW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNvcHlUb0NsaXBib2FyZCA9IHRoaXMuY29weVRvQ2xpcGJvYXJkLmJpbmQodGhpcyk7XG4gIH1cbiAgY29weVRvQ2xpcGJvYXJkIChldmVudCkge1xuICAgIHZhciBlbGVtZW50VG9Db3B5ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuZWxlbWVudHRvY29weTtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb0NvcHkpO1xuICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogJ09vcHMsIHVuYWJsZSB0byBjb3B5J30pO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQ6IHsgc2hvcnRJZCwgY2xhaW1EYXRhIDogeyBjaGFubmVsTmFtZSwgY2VydGlmaWNhdGVJZCwgZGVzY3JpcHRpb24sIG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwsIGhvc3QgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7Y2hhbm5lbE5hbWUgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+Q2hhbm5lbDo8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz48TGluayB0bz17YC8ke2NoYW5uZWxOYW1lfToke2NlcnRpZmljYXRlSWR9YH0+e2NoYW5uZWxOYW1lfTwvTGluaz48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAge2Rlc2NyaXB0aW9uICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPntkZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICAgICAgPGRpdiBpZD0nc2hvdy1zaGFyZS1idXR0b25zJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+U2hhcmU6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSBmbGV4LWNvbnRhaW5lci0td3JhcCc+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT50d2l0dGVyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PmZhY2Vib29rPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwOi8vdHVtYmxyLmNvbS93aWRnZXRzL3NoYXJlL3Rvb2w/Y2Fub25pY2FsVXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHVtYmxyPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3d3dy5yZWRkaXQuY29tL3N1Ym1pdD91cmw9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0mdGl0bGU9JHtuYW1lfWB9PnJlZGRpdDwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hvcnQtbGluayc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+TGluazo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1zaG9ydC1saW5rJyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nc2hvcnQtbGluaycgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Ake2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEnIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTInPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLXdpZGUnIGRhdGEtZWxlbWVudHRvY29weT0nc2hvcnQtbGluaydcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jb3B5VG9DbGlwYm9hcmR9PmNvcHlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBpZD0nc2hvdy1lbWJlZC1jb2RlJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5FbWJlZDo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXNob3J0IHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LWVycm9yJyBpZD0naW5wdXQtZXJyb3ItY29weS1lbWJlZC10ZXh0JyBoaWRkZW49J3RydWUnPmVycm9yIGhlcmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHsoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnKSA/IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPHZpZGVvIHdpZHRoPVwiMTAwJVwiIGNvbnRyb2xzIHBvc3Rlcj1cIiR7dGh1bWJuYWlsfVwiIHNyYz1cIiR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1cIi8+PC92aWRlbz5gfSAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdlbWJlZC10ZXh0JyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zZWxlY3R9IHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgPGltZyBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPmB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J2VtYmVkLXRleHQnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tYm90dG9tJz5cbiAgICAgICAgICA8TGluayBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRvPXtgLyR7c2hvcnRJZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0+PHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dCc+RGlyZWN0IExpbms8L3NwYW4+PC9MaW5rPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj17YCR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfSBkb3dubG9hZD17bmFtZX0+RG93bmxvYWQ8L2E+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2RtY2EnPlJlcG9ydDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0SW5mbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCByZXF1ZXN0XG4gIGNvbnN0IHByZXZpb3VzUmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICAvLyBzZWxlY3QgY2hhbm5lbFxuICBsZXQgY2hhbm5lbDtcbiAgaWYgKHByZXZpb3VzUmVxdWVzdCkge1xuICAgIGNvbnN0IGNoYW5uZWxLZXkgPSBwcmV2aW91c1JlcXVlc3Qua2V5O1xuICAgIGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsQ2xhaW1zRGlzcGxheSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5JztcblxuY2xhc3MgU2hvd0NoYW5uZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBsb25nSWQsIHNob3J0SWQgfSA9IGNoYW5uZWw7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBjaGFubmVsPXtjaGFubmVsfSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8aDI+Y2hhbm5lbCBuYW1lOiB7bmFtZX08L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eydmaW5lLXByaW50J30+ZnVsbCBjaGFubmVsIGlkOiB7bG9uZ0lkfTwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PnNob3J0IGNoYW5uZWwgaWQ6IHtzaG9ydElkfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDbGFpbXNEaXNwbGF5IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGNoYW5uZWwgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0NoYW5uZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC92aWV3LmpzeCIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBvblVwZGF0ZUNoYW5uZWxDbGFpbXMgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGtleVxuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtzaG93LnJlcXVlc3QuaWRdO1xuICBjb25zdCBjaGFubmVsS2V5ID0gcmVxdWVzdC5rZXk7XG4gIC8vIHNlbGVjdCBjaGFubmVsIGNsYWltc1xuICBjb25zdCBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBjaGFubmVsS2V5LFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIG9uVXBkYXRlQ2hhbm5lbENsYWltcyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFzc2V0UHJldmlldyBmcm9tICdjb21wb25lbnRzL0Fzc2V0UHJldmlldyc7XG5cbmNsYXNzIENoYW5uZWxDbGFpbXNEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gIH1cbiAgc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgLSAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UocHJldmlvdXNQYWdlKTtcbiAgfVxuICBzaG93TmV4dFJlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgKyAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UobmV4dFBhZ2UpO1xuICB9XG4gIHNob3dOZXdQYWdlIChwYWdlKSB7XG4gICAgY29uc3QgeyBjaGFubmVsS2V5LCBjaGFubmVsOiB7IG5hbWUsIGxvbmdJZCB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25VcGRhdGVDaGFubmVsQ2xhaW1zKGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjbGFpbXMsIGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwnPlxuICAgICAgICB7KGNsYWltcy5sZW5ndGggPiAwKSA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge2NsYWltcy5tYXAoKGNsYWltLCBpbmRleCkgPT4gPEFzc2V0UHJldmlld1xuICAgICAgICAgICAgICBjbGFpbURhdGE9e2NsYWltfVxuICAgICAgICAgICAgICBrZXk9e2Ake2NsYWltLm5hbWV9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgIC8+KX1cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPiAxKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZX0+UHJldmlvdXMgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlfT5OZXh0IFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+VGhlcmUgYXJlIG5vIGNsYWltcyBpbiB0aGlzIGNoYW5uZWw8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ2xhaW1zRGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7c2l0ZToge2RlZmF1bHRzOiB7IGRlZmF1bHRUaHVtYm5haWwgfX19KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNvbnN0IEFzc2V0UHJldmlldyA9ICh7IGRlZmF1bHRUaHVtYm5haWwsIGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsIH0gfSkgPT4ge1xuICBjb25zdCBkaXJlY3RTb3VyY2VMaW5rID0gYCR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YDtcbiAgY29uc3Qgc2hvd1VybExpbmsgPSBgLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2Fzc2V0LWhvbGRlcic+XG4gICAgICA8TGluayB0bz17c2hvd1VybExpbmt9ID5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2dpZic6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e2RpcmVjdFNvdXJjZUxpbmt9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnYXNzZXQtcHJldmlldyB2aWRlbyd9XG4gICAgICAgICAgICAgICAgICBzcmM9e3RodW1ibmFpbCB8fCBkZWZhdWx0VGh1bWJuYWlsfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxwPnVuc3VwcG9ydGVkIGZpbGUgdHlwZTwvcD5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCl9XG4gICAgICA8L0xpbms+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldFByZXZpZXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvdmlldy5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZTogeyBob3N0LCB0aXRsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jbGFzcyBGb3VyT2hGb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7dGl0bGUsIGhvc3R9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfSAtIDQwNDwvdGl0bGU+XG4gICAgICAgICAgPGxpbmsgcmVsPSdjYW5vbmljYWwnIGhyZWY9e2Ake2hvc3R9LzQwNGB9IC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxoMj40MDQ8L2gyPlxuICAgICAgICAgIDxwPlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3VyT2hGb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJjb25zdCB7IGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbmNvbnN0IHNlbmRFbWJlZFBhZ2UgPSAoeyBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAvLyBnZXQgYW5kIHJlbmRlciB0aGUgY29udGVudFxuICByZXMuc3RhdHVzKDIwMCkucmVuZGVyKCdlbWJlZCcsIHsgbGF5b3V0OiAnZW1iZWQnLCBob3N0LCBjbGFpbUlkLCBuYW1lIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kRW1iZWRQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwiY29uc3QgcmVkaXJlY3QgPSAocm91dGUpID0+IHtcbiAgcmV0dXJuIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zdGF0dXMoMzAxKS5yZWRpcmVjdChyb3V0ZSk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZGlyZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlcy9yZWRpcmVjdC5qcyIsImNvbnN0IHNlcnZlQXNzZXRCeUNsYWltID0gcmVxdWlyZSgnLi9zZXJ2ZUFzc2V0QnlDbGFpbScpO1xuY29uc3Qgc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltID0gcmVxdWlyZSgnLi9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwLCBkYikgPT4ge1xuICBhcHAuZ2V0KCcvOmlkZW50aWZpZXIvOmNsYWltJywgc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltKTtcbiAgYXBwLmdldCgnLzpjbGFpbScsIHNlcnZlQXNzZXRCeUNsYWltKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9pbmRleC5qcyIsImNvbnN0IHsgc2VuZEdBU2VydmVFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MnKTtcbmNvbnN0IHsgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlLCBsb2dSZXF1ZXN0RGF0YSwgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlcnZlIGFuIGFzc2V0IG9yIHRoZSByZWFjdCBhcHAgdmlhIHRoZSBjbGFpbSBuYW1lIG9ubHlcblxuKi9cblxuY29uc3Qgc2VydmVyQXNzZXRCeUNsYWltID0gKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSA9IHJlcTtcbiAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gIHRyeSB7XG4gICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICBpZiAocmVzcG9uc2VUeXBlICE9PSBTRVJWRSkge1xuICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgfVxuICAvLyBoYW5kbGUgc2VydmUgcmVxdWVzdFxuICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAvLyBwYXJzZSB0aGUgY2xhaW1cbiAgbGV0IGNsYWltTmFtZTtcbiAgdHJ5IHtcbiAgICAoe2NsYWltTmFtZX0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIGxvZyB0aGUgcmVxdWVzdCBkYXRhIGZvciBkZWJ1Z2dpbmdcbiAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIG51bGwsIG51bGwpO1xuICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChudWxsLCBudWxsLCBjbGFpbU5hbWUsIG51bGwsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VydmVyQXNzZXRCeUNsYWltO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXgtc2FnYVwiXG4vLyBtb2R1bGUgaWQgPSAxNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY2FsbCwgcHV0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IG9uUmVxdWVzdEVycm9yLCBvbk5ld0NoYW5uZWxSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBuZXdBc3NldFJlcXVlc3QgfSBmcm9tICdzYWdhcy9zaG93X2Fzc2V0JztcbmltcG9ydCB7IG5ld0NoYW5uZWxSZXF1ZXN0IH0gZnJvbSAnc2FnYXMvc2hvd19jaGFubmVsJztcbmltcG9ydCBsYnJ5VXJpIGZyb20gJ3V0aWxzL2xicnlVcmknO1xuXG5mdW5jdGlvbiAqIHBhcnNlQW5kVXBkYXRlSWRlbnRpZmllckFuZENsYWltIChtb2RpZmllciwgY2xhaW0pIHtcbiAgLy8gdGhpcyBpcyBhIHJlcXVlc3QgZm9yIGFuIGFzc2V0XG4gIC8vIGNsYWltIHdpbGwgYmUgYW4gYXNzZXQgY2xhaW1cbiAgLy8gdGhlIGlkZW50aWZpZXIgY291bGQgYmUgYSBjaGFubmVsIG9yIGEgY2xhaW0gaWRcbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkLCBjbGFpbU5hbWUsIGV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIobW9kaWZpZXIpKTtcbiAgICAoeyBjbGFpbU5hbWUsIGV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZUNsYWltKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gdHJpZ2dlciBhbiBuZXcgYWN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RvcmVcbiAgaWYgKGlzQ2hhbm5lbCkge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBudWxsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGV4dGVuc2lvbikpO1xuICB9O1xuICB5aWVsZCBjYWxsKG5ld0Fzc2V0UmVxdWVzdCwgb25OZXdBc3NldFJlcXVlc3QoY2xhaW1OYW1lLCBjbGFpbUlkLCBudWxsLCBudWxsLCBleHRlbnNpb24pKTtcbn1cbmZ1bmN0aW9uICogcGFyc2VBbmRVcGRhdGVDbGFpbU9ubHkgKGNsYWltKSB7XG4gIC8vIHRoaXMgY291bGQgYmUgYSByZXF1ZXN0IGZvciBhbiBhc3NldCBvciBhIGNoYW5uZWwgcGFnZVxuICAvLyBjbGFpbSBjb3VsZCBiZSBhbiBhc3NldCBjbGFpbSBvciBhIGNoYW5uZWwgY2xhaW1cbiAgbGV0IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHRyaWdnZXIgYW4gbmV3IGFjdGlvbiB0byB1cGRhdGUgdGhlIHN0b3JlXG4gIC8vIHJldHVybiBlYXJseSBpZiB0aGlzIHJlcXVlc3QgaXMgZm9yIGEgY2hhbm5lbFxuICBpZiAoaXNDaGFubmVsKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwobmV3Q2hhbm5lbFJlcXVlc3QsIG9uTmV3Q2hhbm5lbFJlcXVlc3QoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSk7XG4gIH1cbiAgLy8gaWYgbm90IGZvciBhIGNoYW5uZWwsIHBhcnNlIHRoZSBjbGFpbSByZXF1ZXN0XG4gIGxldCBjbGFpbU5hbWUsIGV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoe2NsYWltTmFtZSwgZXh0ZW5zaW9ufSA9IGxicnlVcmkucGFyc2VDbGFpbShjbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIG51bGwsIG51bGwsIG51bGwsIGV4dGVuc2lvbikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiBoYW5kbGVTaG93UGFnZVVyaSAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgaWRlbnRpZmllciwgY2xhaW0gfSA9IGFjdGlvbi5kYXRhO1xuICBpZiAoaWRlbnRpZmllcikge1xuICAgIHJldHVybiB5aWVsZCBjYWxsKHBhcnNlQW5kVXBkYXRlSWRlbnRpZmllckFuZENsYWltLCBpZGVudGlmaWVyLCBjbGFpbSk7XG4gIH1cbiAgeWllbGQgY2FsbChwYXJzZUFuZFVwZGF0ZUNsYWltT25seSwgY2xhaW0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hIYW5kbGVTaG93UGFnZVVyaSAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5IQU5ETEVfU0hPV19VUkksIGhhbmRsZVNob3dQYWdlVXJpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd191cmkuanMiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgYWRkQXNzZXRUb0Fzc2V0TGlzdCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRMb25nQ2xhaW1JZCwgZ2V0U2hvcnRJZCwgZ2V0Q2xhaW1EYXRhIH0gZnJvbSAnYXBpL2Fzc2V0QXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcbmltcG9ydCB7IHNlbGVjdFNpdGVIb3N0IH0gZnJvbSAnc2VsZWN0b3JzL3NpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdBc3NldFJlcXVlc3QgKGFjdGlvbikge1xuICBjb25zdCB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIG5hbWUsIG1vZGlmaWVyIH0gPSBhY3Rpb24uZGF0YTtcbiAgLy8gcHV0IGFuIGFjdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgaW4gcmVkdXhcbiAgeWllbGQgcHV0KG9uUmVxdWVzdFVwZGF0ZShyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgcmVxdWVzdD9cbiAgLy8gSWYgdGhpcyB1cmkgaXMgaW4gdGhlIHJlcXVlc3QgbGlzdCwgaXQncyBhbHJlYWR5IGJlZW4gZmV0Y2hlZFxuICBjb25zdCBzdGF0ZSA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaG93U3RhdGUpO1xuICBjb25zdCBob3N0ID0geWllbGQgc2VsZWN0KHNlbGVjdFNpdGVIb3N0KTtcbiAgaWYgKHN0YXRlLnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgbG9uZyBpZCAmJiBhZGQgcmVxdWVzdCB0byByZXF1ZXN0IGxpc3RcbiAgbGV0IGxvbmdJZDtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGxvbmdJZH0gPSB5aWVsZCBjYWxsKGdldExvbmdDbGFpbUlkLCBob3N0LCBuYW1lLCBtb2RpZmllcikpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIGNvbnN0IGFzc2V0S2V5ID0gYGEjJHtuYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBhc3NldEtleSkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIGFzc2V0P1xuICAvLyBJZiB0aGlzIGFzc2V0IGlzIGluIHRoZSBhc3NldCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGlmIChzdGF0ZS5hc3NldExpc3RbYXNzZXRLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IHNob3J0IElkXG4gIGxldCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7ZGF0YTogc2hvcnRJZH0gPSB5aWVsZCBjYWxsKGdldFNob3J0SWQsIGhvc3QsIG5hbWUsIGxvbmdJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIGdldCBhc3NldCBjbGFpbSBkYXRhXG4gIGxldCBjbGFpbURhdGE7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBjbGFpbURhdGF9ID0geWllbGQgY2FsbChnZXRDbGFpbURhdGEsIGhvc3QsIG5hbWUsIGxvbmdJZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIGFkZCBhc3NldCB0byBhc3NldCBsaXN0XG4gIHlpZWxkIHB1dChhZGRBc3NldFRvQXNzZXRMaXN0KGFzc2V0S2V5LCBudWxsLCBuYW1lLCBsb25nSWQsIHNob3J0SWQsIGNsYWltRGF0YSkpO1xuICAvLyBjbGVhciBhbnkgZXJyb3JzIGluIHJlcXVlc3QgZXJyb3JcbiAgeWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKG51bGwpKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiAqIHdhdGNoTmV3QXNzZXRSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLCBuZXdBc3NldFJlcXVlc3QpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X2Fzc2V0LmpzIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb25nQ2xhaW1JZCAoaG9zdCwgbmFtZSwgbW9kaWZpZXIpIHtcbiAgbGV0IGJvZHkgPSB7fTtcbiAgLy8gY3JlYXRlIHJlcXVlc3QgcGFyYW1zXG4gIGlmIChtb2RpZmllcikge1xuICAgIGlmIChtb2RpZmllci5pZCkge1xuICAgICAgYm9keVsnY2xhaW1JZCddID0gbW9kaWZpZXIuaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlbJ2NoYW5uZWxOYW1lJ10gPSBtb2RpZmllci5jaGFubmVsLm5hbWU7XG4gICAgICBib2R5WydjaGFubmVsQ2xhaW1JZCddID0gbW9kaWZpZXIuY2hhbm5lbC5pZDtcbiAgICB9XG4gIH1cbiAgYm9keVsnY2xhaW1OYW1lJ10gPSBuYW1lO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHkgICA6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICB9O1xuICAvLyBjcmVhdGUgdXJsXG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9sb25nLWlkYDtcbiAgLy8gcmV0dXJuIHRoZSByZXF1ZXN0IHByb21pc2VcbiAgcmV0dXJuIFJlcXVlc3QodXJsLCBwYXJhbXMpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNob3J0SWQgKGhvc3QsIG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL3Nob3J0LWlkLyR7Y2xhaW1JZH0vJHtuYW1lfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhaW1EYXRhIChob3N0LCBuYW1lLCBjbGFpbUlkKSB7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jbGFpbS9kYXRhLyR7bmFtZX0vJHtjbGFpbUlkfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwaS9hc3NldEFwaS5qcyIsImltcG9ydCB7Y2FsbCwgcHV0LCBzZWxlY3QsIHRha2VMYXRlc3R9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCwgYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QsIG9uUmVxdWVzdEVycm9yLCBvblJlcXVlc3RVcGRhdGUsIHVwZGF0ZUNoYW5uZWxDbGFpbXMgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgZ2V0Q2hhbm5lbENsYWltcywgZ2V0Q2hhbm5lbERhdGEgfSBmcm9tICdhcGkvY2hhbm5lbEFwaSc7XG5pbXBvcnQgeyBzZWxlY3RTaG93U3RhdGUgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RTaXRlSG9zdCB9IGZyb20gJ3NlbGVjdG9ycy9zaXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uICogbmV3Q2hhbm5lbFJlcXVlc3QgKGFjdGlvbikge1xuICBjb25zdCB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQgfSA9IGFjdGlvbi5kYXRhO1xuICAvLyBwdXQgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBpbiByZWR1eFxuICB5aWVsZCBwdXQob25SZXF1ZXN0VXBkYXRlKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyByZXF1ZXN0P1xuICAvLyBJZiB0aGlzIHVyaSBpcyBpbiB0aGUgcmVxdWVzdCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGNvbnN0IHN0YXRlID0geWllbGQgc2VsZWN0KHNlbGVjdFNob3dTdGF0ZSk7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBpZiAoc3RhdGUucmVxdWVzdExpc3RbcmVxdWVzdElkXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBjaGFubmVsIGxvbmcgaWRcbiAgbGV0IGxvbmdJZCwgc2hvcnRJZDtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiB7bG9uZ0NoYW5uZWxDbGFpbUlkOiBsb25nSWQsIHNob3J0Q2hhbm5lbENsYWltSWQ6IHNob3J0SWR9IH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxEYXRhLCBob3N0LCBjaGFubmVsTmFtZSwgY2hhbm5lbElkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gc3RvcmUgdGhlIHJlcXVlc3QgaW4gdGhlIGNoYW5uZWwgcmVxdWVzdHMgbGlzdFxuICBjb25zdCBjaGFubmVsS2V5ID0gYGMjJHtjaGFubmVsTmFtZX0jJHtsb25nSWR9YDtcbiAgeWllbGQgcHV0KGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0KHJlcXVlc3RJZCwgbnVsbCwgY2hhbm5lbEtleSkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIGNoYW5uZWw/XG4gIC8vIElmIHRoaXMgY2hhbm5lbCBpcyBpbiB0aGUgY2hhbm5lbCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGlmIChzdGF0ZS5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBjaGFubmVsIGNsYWltcyBkYXRhXG4gIGxldCBjbGFpbXNEYXRhO1xuICB0cnkge1xuICAgICh7IGRhdGE6IGNsYWltc0RhdGEgfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbENsYWltcywgaG9zdCwgbG9uZ0lkLCBjaGFubmVsTmFtZSwgMSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIC8vIHN0b3JlIHRoZSBjaGFubmVsIGRhdGEgaW4gdGhlIGNoYW5uZWwgbGlzdFxuICB5aWVsZCBwdXQoYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QoY2hhbm5lbEtleSwgY2hhbm5lbE5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSkpO1xuICAvLyBjbGVhciBhbnkgcmVxdWVzdCBlcnJvcnNcbiAgeWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKG51bGwpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hOZXdDaGFubmVsUmVxdWVzdCAoKSB7XG4gIHlpZWxkIHRha2VMYXRlc3QoYWN0aW9ucy5DSEFOTkVMX1JFUVVFU1RfTkVXLCBuZXdDaGFubmVsUmVxdWVzdCk7XG59O1xuXG5mdW5jdGlvbiAqIGdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwgKGFjdGlvbikge1xuICBjb25zdCB7IGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSB9ID0gYWN0aW9uLmRhdGE7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBsZXQgY2xhaW1zRGF0YTtcbiAgdHJ5IHtcbiAgICAoeyBkYXRhOiBjbGFpbXNEYXRhIH0gPSB5aWVsZCBjYWxsKGdldENoYW5uZWxDbGFpbXMsIGhvc3QsIGxvbmdJZCwgbmFtZSwgcGFnZSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IoZXJyb3IubWVzc2FnZSkpO1xuICB9XG4gIHlpZWxkIHB1dCh1cGRhdGVDaGFubmVsQ2xhaW1zKGNoYW5uZWxLZXksIGNsYWltc0RhdGEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hVcGRhdGVDaGFubmVsQ2xhaW1zICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQywgZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc2FnYXMvc2hvd19jaGFubmVsLmpzIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFubmVsRGF0YSAoaG9zdCwgaWQsIG5hbWUpIHtcbiAgaWYgKCFpZCkgaWQgPSAnbm9uZSc7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jaGFubmVsL2RhdGEvJHtuYW1lfS8ke2lkfWA7XG4gIHJldHVybiBSZXF1ZXN0KHVybCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbm5lbENsYWltcyAoaG9zdCwgbG9uZ0lkLCBuYW1lLCBwYWdlKSB7XG4gIGlmICghcGFnZSkgcGFnZSA9IDE7XG4gIGNvbnN0IHVybCA9IGAke2hvc3R9L2FwaS9jaGFubmVsL2NsYWltcy8ke25hbWV9LyR7bG9uZ0lkfS8ke3BhZ2V9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBpL2NoYW5uZWxBcGkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgUkVHRVhQX0lOVkFMSURfQ0xBSU0gIDogL1teQS1aYS16MC05LV0vZyxcbiAgUkVHRVhQX0lOVkFMSURfQ0hBTk5FTDogL1teQS1aYS16MC05LUBdL2csXG4gIFJFR0VYUF9BRERSRVNTICAgICAgICA6IC9eYig/PVteME9JbF17MzIsMzN9KVswLTlBLVphLXpdezMyLDMzfSQvLFxuICBDSEFOTkVMX0NIQVIgICAgICAgICAgOiAnQCcsXG4gIHBhcnNlSWRlbnRpZmllciAgICAgICA6IGZ1bmN0aW9uIChpZGVudGlmaWVyKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvXSopJyArIC8vIHZhbHVlIChzdG9wcyBhdCB0aGUgZmlyc3Qgc2VwYXJhdG9yIG9yIGVuZClcbiAgICAgICcoWzokI10/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIHZhbHVlLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAuZXhlYyhpZGVudGlmaWVyKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgaXNDaGFubmVsID0gdmFsdWUuc3RhcnRzV2l0aChtb2R1bGUuZXhwb3J0cy5DSEFOTkVMX0NIQVIpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gaXNDaGFubmVsID8gdmFsdWUgOiBudWxsO1xuICAgIGxldCBjbGFpbUlkO1xuICAgIGlmIChpc0NoYW5uZWwpIHtcbiAgICAgIGlmICghY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVjayB5b3VyIFVSTC4gIE5vIGNoYW5uZWwgbmFtZSBhZnRlciBcIkBcIi4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjaGFubmVsTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCk7XG4gICAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYWltSWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBjaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBUaGUgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiIG1vZGlmaWVyIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0NoYW5uZWwsXG4gICAgICBjaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiBjaGFubmVsQ2xhaW1JZCB8fCBudWxsLFxuICAgICAgY2xhaW1JZCAgICAgICA6IGNsYWltSWQgfHwgbnVsbCxcbiAgICB9O1xuICB9LFxuICBwYXJzZUNsYWltOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IGV4dGVuc2lvbilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBleHRlbnNpb24gc2VwYXJhdG9yLCBleHRlbnNpb24gKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgZXh0ZW5zaW9uU2VwZXJhdG9yLCBleHRlbnNpb25dID0gY29tcG9uZW50c1JlZ2V4IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKG5hbWUpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghY2xhaW1OYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgXCIuXCInKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNsYWltTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0xBSU0pO1xuICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogXCIke25hbWVCYWRDaGFycy5qb2luKCcsICcpfVwiLmApO1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBleHRlbnNpb25cbiAgICBpZiAoZXh0ZW5zaW9uU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIuYCk7XG4gICAgICB9XG4gICAgICBpZiAoZXh0ZW5zaW9uU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7ZXh0ZW5zaW9uU2VwZXJhdG9yfVwiIHNlcGFyYXRvciBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjbGFpbSBuYW1lLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY2xhaW1OYW1lLFxuICAgICAgZXh0ZW5zaW9uOiBleHRlbnNpb24gfHwgbnVsbCxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3Qge1xuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUsXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHksXG4gIGxvZ1JlcXVlc3REYXRhLFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCxcbn0gPSByZXF1aXJlKCdoZWxwZXJzL3NlcnZlSGVscGVycy5qcycpO1xuY29uc3QgbGJyeVVyaSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeVVyaS5qcycpO1xuY29uc3QgaGFuZGxlU2hvd1JlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3gnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHNlcnZlIGFuIGFzc2V0IG9yIHRoZSByZWFjdCBhcHAgdmlhIHRoZSBjbGFpbSBuYW1lIGFuZCBhbiBpZGVudGlmaWVyXG5cbiovXG5cbmNvbnN0IHNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0gPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICB9XG4gIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gIC8vIHBhcnNlIHRoZSBjbGFpbVxuICBsZXQgY2xhaW1OYW1lO1xuICB0cnkge1xuICAgICh7IGNsYWltTmFtZSB9ID0gbGJyeVVyaS5wYXJzZUNsYWltKHBhcmFtcy5jbGFpbSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgfVxuICAvLyBwYXJzZSB0aGUgaWRlbnRpZmllclxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKHBhcmFtcy5pZGVudGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGlmICghaXNDaGFubmVsKSB7XG4gICAgW2NsYWltSWQsIGNsYWltTmFtZV0gPSBmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5KGNsYWltSWQsIGNsYWltTmFtZSk7XG4gIH1cbiAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpO1xuICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5SWRlbnRpZmllckFuZENsYWltLmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRSZWFjdEFwcCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XHJcbiAgYXBwLmdldCgnKicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9pbmRleC5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbmNvbnN0IHNlbmRSZWFjdEFwcCA9IChyZXEsIHJlcykgPT4ge1xuICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2VuZFJlYWN0QXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay9zZW5kUmVhY3RBcHAuanMiXSwic291cmNlUm9vdCI6IiJ9